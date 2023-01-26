'MPAJUELO_3.0.4_20161104
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Utilitarios
Imports DevExpress.XtraReports.UI
Imports System.IO
Imports UtilitarioWeb
Imports VisualSoft.Common.Logging

Public Class ReporteDevExpress
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim TipoReporte As String = Request.QueryString("Tipo")
        Dim Detalle As String = Request.QueryString("Detalle")
        Dim CargarDataReporte As Boolean = False
        If Not Me.IsPostBack Then
            If TipoReporte IsNot Nothing Then
                Session(TipoReporte & "_Cargo") = False
            End If
        End If
        If Me.IsCallback Then CargarDataReporte = True
        If Session(TipoReporte & "_Cargo") IsNot Nothing AndAlso Session(TipoReporte & "_Cargo") = True Then
            Return
        End If
        If Page.Session("UltimoCodigoReporte") IsNot Nothing Then Page.Session(Page.Session("UltimoCodigoReporte")) = Nothing

        dvReporte.Visible = True
        dvSinDatos.Visible = False
        dvSinDatosLineaContrato.Visible = False
        If TipoReporte IsNot Nothing Then
            Select Case TipoReporte
                Case "ReporteOrganizacional"
                    CrearReporteOrganizacional(CargarDataReporte, Detalle)
                Case "ReporteEmpleado"
                    CrearReporteEmpleado(CargarDataReporte, Detalle)
                Case "ReporteLineaContrato"
                    CrearReporteLineaContrato(CargarDataReporte, Detalle)
                Case "ReporteSolicitud"
                    CrearReporteSolicitudFiltroMultiple(CargarDataReporte, Detalle)
                Case "ReporteOrdenServicio"
                    CrearReporteOrdenServicioFiltroMultiple(CargarDataReporte, Detalle)
            End Select
            If CargarDataReporte Then Session(TipoReporte & "_Cargo") = True
        End If

    End Sub

    Private Sub CrearReporteOrganizacional(ByVal CargarDataReporte As Boolean, ByVal Detalle As String)

        Dim xrptReporte As XRPT_Organizacional = New XRPT_Organizacional
        If Not CargarDataReporte Then
            dxReportViewer.Report = xrptReporte
            dxReportViewer.DataBind()
            Exit Sub
        End If


        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim ReporteOrganizacional As BL_GEN_ReporteOrganizacional = Nothing
        Dim GEN_Cliente As BL_GEN_Cliente = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ReporteOrganizacional = New BL_GEN_ReporteOrganizacional(oUsuario.IdCliente)
            GEN_Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            Dim dtDatosCliente As DataTable = GEN_Cliente.Mostrar(oUsuario.IdCliente)

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)


            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            Else
                listaDatos = Detalle.Split("-").ToList()
            End If
            Dim prNivel As String, prTop As String, prTipoAgrupacion As String, prCampoTipo As String, prFiltro As String
            prTipoAgrupacion = listaDatos(0)
            prNivel = listaDatos(1)
            prTop = listaDatos(2)
            prCampoTipo = listaDatos(3)
            prFiltro = listaDatos(4)


            Dim dtDatosOrganizacion As DataTable = ReporteOrganizacional.ReporteAgrupadoLineaDispositivo(prNivel, prTipoAgrupacion, prCampoTipo, prFiltro, oCultura)

            dtDatosOrganizacion.TableName = "PCS_MOV_s_AgrupadoLineaDispositivo_Reporte"
            xrptReporte.DataSource = dtDatosOrganizacion
            xrptReporte.DataMember = dtDatosOrganizacion.TableName


            Dim dsDatos As New DataSet
            Dim dtDatos As DataTable = dtDatosOrganizacion.Clone
            Dim inLongitudTexto As Integer = 0
            dtDatos.TableName = dtDatosOrganizacion.TableName
            For x As Integer = 1 To 10
                If dtDatosOrganizacion.Rows.Count >= x Then
                    Dim drFila As DataRow = dtDatosOrganizacion.Rows(x - 1)
                    inLongitudTexto = drFila("Descripción").ToString().Length
                    If inLongitudTexto > 10 Then inLongitudTexto = 10
                    'drFila("Descripción") = drFila("Descripción").ToString().Substring(0, inLongitudTexto) & IIf(drFila("Descripción").ToString().Length > 10, "...", "")
                    dtDatos.Rows.Add(drFila.ItemArray())
                End If
            Next
            dsDatos.Tables.Add(dtDatos.Copy)
            xrptReporte.xrchGrafico.DataSource = dsDatos
            xrptReporte.xrchGrafico.DataMember = dtDatos.TableName

            Dim mValores(8, 2) As String
            Dim strTipo As String = ""
            Select Case prCampoTipo.ToUpper
                Case "MONTO" : strTipo = "Monto"
                Case "TOTALEMPLEADOS" : strTipo = "Empleados"
                Case "TOTALLINEAS" : strTipo = "Líneas"
                Case "TOTALDISPOSITIVOS" : strTipo = "Dispositivos"
            End Select

            mValores(0, 0) = "cfTitulo1" : mValores(0, 1) = "CONTROL DEL SERVICIO DE TELEFONÍA"
            mValores(1, 0) = "cfTitulo2" : mValores(1, 1) = "REPORTE CONSOLIDADO AGRUPADO POR " & ReporteOrganizacional.ObtieneTituloTabla(prTipoAgrupacion).ToUpper()
            mValores(2, 0) = "cfTitulo3" : mValores(2, 1) = "(Ordenado por " & strTipo & " en forma descendente)"
            mValores(3, 0) = "cfEmisor" : mValores(3, 1) = oUsuario.vcNom
            mValores(4, 0) = "cfEmpresa" : mValores(4, 1) = dtDatosCliente.Rows(0)("vcNomCli")

            AsignarValoresFormulas(xrptReporte.CalculatedFields, mValores)


            'Actualización de Imagen
            Dim pictureBytes As New MemoryStream(CType({}, Byte()))
            If Not IsDBNull(dtDatosCliente.Rows(0)("vbLogCli")) Then
                pictureBytes = New MemoryStream(CType(dtDatosCliente.Rows(0)("vbLogCli"), Byte()))
            End If
            ''Dim pictureBytes2 As New MemoryStream(CType(dtDatosCliente.Rows(0)("vbLogCli"), Byte()))
            If pictureBytes.Length <> 0 Then
                xrptReporte.xrPictureBoxLogo.Image = System.Drawing.Image.FromStream(pictureBytes)
            Else
                xrptReporte.xrPictureBoxLogo.Image = Nothing
            End If

            xrptReporte.xrchGrafico.Titles(0).Text = "Top " & ReporteOrganizacional.ObtieneTituloTabla(prTipoAgrupacion) & " de Total " & strTipo
            xrptReporte.xrchGrafico.SeriesTemplate.ValueDataMembers(0) = prCampoTipo


            dxReportViewer.Report = xrptReporte
            dxReportViewer.DataBind()
            dxReportToolbar.ReportViewerID = "dxReportViewer"


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ReporteOrganizacional IsNot Nothing Then ReporteOrganizacional.Dispose()
            If GEN_Cliente IsNot Nothing Then GEN_Cliente.Dispose()
        End Try
    End Sub

    Private Sub CrearReporteEmpleado(ByVal CargarDataReporte As Boolean, ByVal Detalle As String)

        Dim myReport As XRPT_GrupEmpl = New XRPT_GrupEmpl()
        If Not CargarDataReporte Then
            dxReportViewer.Report = myReport
            dxReportViewer.DataBind()
            Exit Sub
        End If

        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim NombreModelo As BL_MOV_ModeloDispositivo = Nothing
        Dim ORGA As BL_GEN_Organizacion = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Dim TipoLinea As BL_MOV_LineaTipo = Nothing

        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            End If

            'CrearDocumentoReporte          
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            ORGA = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            NombreModelo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
            TipoLinea = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            For index = 1 To listaDatos.Count
                If listaDatos(index - 1) = "" Then
                    listaDatos(index - 1) = "-1"
                End If
            Next

            Dim p_inCentCost As String = listaDatos(0)
            Dim p_CodInt As String = listaDatos(1)
            Dim p_inSucu As String = listaDatos(2)
            Dim p_mod As String = listaDatos(3)
            Dim p_inLineatipo As String = listaDatos(4)
            Dim p_GrupoEmpleado As String = listaDatos(5)

            Dim tableOrga As DataTable = ORGA.ListarLikeCodint2(p_CodInt)
            Dim NomTipoLinea As DataTable = TipoLinea.Listar_LineaTipo(p_inLineatipo)

            Dim dt As DataTable = Empleado.ListarEmpleadosConFiltros(p_inCentCost, p_CodInt, p_inSucu, p_mod, p_inLineatipo, p_GrupoEmpleado, p_inLineatipo)
            Dim table As DataTable = NombreModelo.Mostrar(p_mod).Tables(0)

            If dt.Rows.Count > 0 Then
                Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)


                myReport.LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                myReport.LBLUsuario.Text = oUsuario.vcNom


                Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Try
                    Dim pictureBytes As New MemoryStream(Regi.Listar().REGI_imLOGEMP)
                    If pictureBytes.Length <> 0 Then
                        myReport.xrPictureBoxLogo.Image = System.Drawing.Image.FromStream(pictureBytes)
                    Else
                        myReport.xrPictureBoxLogo.Image = Nothing
                    End If
                Catch ex As Exception
                    myReport.xrPictureBoxLogo.Image = Nothing
                End Try


                If dt.Rows.Count >= 1 Then

                    myReport.lblTotalRegistros.Text = UtilitarioWeb.DevuelveNumeroFormateado(dt.Rows.Count.ToString(), "#,#")

                    If (p_GrupoEmpleado <> "-1") Then
                        myReport.LBLgrupoempleado.Text = "Grupo Empleado:"
                        myReport.TXTgrupoempleado.Text = dt.Rows(0)("GRUPO EMPLEADO").ToString()

                    End If

                    If (p_inCentCost <> "-1") Then

                        myReport.LBLcentrocosto.Text = "Centro de Costo:"
                        myReport.TXTcentrocosto.Text = dt.Rows(0)("CENTRO COSTO").ToString()

                    End If

                    If (p_CodInt <> "-1") Then

                        myReport.LBLorganizacion.Text = "Organización:"
                        myReport.TXTorganizacion.Text = tableOrga.Rows(0)("ORGA_vcNOMORG").ToString()

                    End If

                    If (p_inSucu <> "-1") Then

                        myReport.LBLsucursal.Text = "Sucursal:"
                        myReport.TXTsucursal.Text = dt.Rows(0)("SUCURSAL").ToString()

                    End If

                    If (p_mod <> "-1") Then

                        myReport.LBLdispositivo.Text = "Modelo:"
                        myReport.TXTdisposivito.Text = table.Rows(0)("vcNom").ToString()

                    End If

                    ''If (p_inLineatipo <> "-1") Then
                    ''    myReport.LBLtipolinea.Visible = True
                    ''    myReport.TXTtipolinea.Visible = True

                    ''    myReport.LBLtipolinea.Text = "Tipo Línea:"
                    ''    myReport.TXTtipolinea.Text = NomTipoLinea.Rows(0)("vcDescripcion").ToString()
                    ''End If

                End If

                Dim mValores(8, 2) As String
                mValores(0, 0) = "cfTitulo1" : mValores(0, 1) = "LISTA DE EMPLEADOS"
                AsignarValoresFormulas(myReport.CalculatedFields, mValores)

                dt.TableName = "MOV_s_GEN_ListaEmpleado_Filtros"
                myReport.DataSource = dt
                myReport.DataMember = dt.TableName

                dxReportViewer.Report = myReport
                dxReportViewer.DataBind()

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If



        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub

    Private Sub CrearReporteLineaContrato(ByVal CargarDataReporte As Boolean, ByVal Detalle As String)

        Dim myReport As XRPT_LineasContrato = New XRPT_LineasContrato()
        If Not CargarDataReporte Then
            dxReportViewer.Report = myReport
            dxReportViewer.DataBind()
            Exit Sub
        End If


        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim ORGA As BL_GEN_Organizacion = Nothing
        Dim Lineatipo As BL_MOV_LineaTipo = Nothing

        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            End If

            'CrearDocumentoReporte
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            ORGA = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Lineatipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            For index = 1 To listaDatos.Count
                If listaDatos(index - 1) = "" Then
                    listaDatos(index - 1) = "-1"
                End If
            Next

            Dim p_vcEmpleado As String = listaDatos(0)
            Dim p_CodInt As String = listaDatos(1)
            Dim p_Linea As Integer = listaDatos(2)
            Dim p_CampoFiltro As String = listaDatos(3)
            Dim p_ValorFiltro As String = listaDatos(4)
            Dim p_TipoMes As String = listaDatos(5)
            Dim p_TipoMesEq As String = listaDatos(6)

            Dim p_NumeroMes As Integer = Convert.ToInt32(listaDatos(7))
            Dim p_NumeroMesEq As Integer = Convert.ToInt32(listaDatos(8))

            Dim p_inLineatipo As String = listaDatos(9)
            Dim p_NombrePlan As String = listaDatos(10)

            Dim strCampoDescripcionFiltro As String = ""

            'Actualizado 06/12/2016 mjaramillo
            'se agrego el listado de la tabla organizacion para setear el campo elegido en la orgazacion y me muestre en la estructura del reporte
            Dim tableOrga As DataTable = ORGA.ListarLikeCodint2(p_CodInt)

            Dim dt As DataTable = Linea.ListarLineasFiltro(p_Linea, p_CodInt, p_vcEmpleado, p_TipoMes, p_NumeroMes, p_CampoFiltro,
                                                           p_ValorFiltro, strCampoDescripcionFiltro, p_inLineatipo, p_NombrePlan,
                                                           p_TipoMesEq, p_NumeroMesEq)

            If dt.Rows.Count > 0 Then
                Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)

                myReport.LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                myReport.LBLUsuario.Text = oUsuario.vcNom

                Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                Try
                    Dim pictureBytes As New MemoryStream(Regi.Listar().REGI_imLOGEMP)
                    If pictureBytes.Length <> 0 Then
                        myReport.xrPictureBoxLogo.Image = System.Drawing.Image.FromStream(pictureBytes)
                    Else
                        myReport.xrPictureBoxLogo.Image = Nothing
                    End If
                Catch ex As Exception
                    myReport.xrPictureBoxLogo.Image = Nothing
                End Try

                If dt.Rows.Count >= 1 Then

                    myReport.lblTotalRegistros.Text = UtilitarioWeb.DevuelveNumeroFormateado(dt.Rows.Count.ToString(), "#,#")

                    If (p_vcEmpleado <> "-1") Then
                        myReport.LBLempleado.Text = "Empleado:"
                        myReport.TXTempleado.Text = dt.Rows(0)("EMPLEADO").ToString()
                    End If

                    If (p_CodInt <> "-1") Then
                        myReport.LBLorganizacion.Text = "Organización:"
                        myReport.TXTorganizacion.Text = tableOrga.Rows(0)("ORGA_vcNOMORG").ToString()
                    End If

                    If (p_Linea <> "-1") Then
                        myReport.lblLinea.Text = "Línea:"
                        myReport.txtLinea.Text = dt.Rows(0)("Linea").ToString()
                    End If

                    If (p_NombrePlan <> "-1") Then
                        myReport.LBLplan.Visible = True
                        myReport.TXTplan.Visible = True

                        myReport.LBLplan.Text = "Plan:"
                        myReport.TXTplan.Text = dt.Rows(0)("NombrePlan").ToString()
                    End If

                    If (p_CampoFiltro <> "-1" AndAlso p_ValorFiltro <> "-1" AndAlso strCampoDescripcionFiltro <> "") Then
                        myReport.lblCampoDinamico.Visible = True
                        myReport.txtValorDinamico.Visible = True

                        myReport.lblCampoDinamico.Text = strCampoDescripcionFiltro & ":"
                        myReport.txtValorDinamico.Text = p_ValorFiltro
                    Else
                        myReport.lblCampoDinamico.Text = "Otros:"
                        myReport.txtValorDinamico.Text = "(TODOS)"
                    End If


                    myReport.LBLtipolinea.Text = "Situación:"
                    If (p_inLineatipo <> "-1") Then
                        myReport.LBLtipolinea.Visible = True
                        myReport.TXTtipolinea.Visible = True
                        myReport.TXTtipolinea.Text = dt.Rows(0)("Estado").ToString()
                    End If

                End If

                Dim mValores(8, 2) As String
                'mjaramillo 07/12/2016
                'se cambio el texto del titulo1
                mValores(0, 0) = "cfTitulo1" : mValores(0, 1) = "LISTA DE LÍNEAS TIPO PLAN SEGÚN FECHA DE VENCIMIENTO"
                AsignarValoresFormulas(myReport.CalculatedFields, mValores)


                myReport.DataSource = dt
                dt.TableName = "MOV_s_GEN_ListaLineasContrato_Filtros"
                myReport.DataSource = dt
                myReport.DataMember = dt.TableName

                dxReportViewer.Report = myReport
                dxReportViewer.DataBind()

                dvReporte.Visible = True
                dvSinDatosLineaContrato.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatosLineaContrato.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub

    Private Sub CrearReporteSolicitudFiltroMultiple(ByVal CargarDataReporte As Boolean, ByVal Detalle As String)

        Dim myReport As XRPT_Solicitudes = New XRPT_Solicitudes()
        If Not CargarDataReporte Then
            dxReportViewer.Report = myReport
            dxReportViewer.DataBind()
            Exit Sub
        End If


        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim oSolicitud As BL_MOV_Solicitud = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim NombreModelo As BL_MOV_ModeloDispositivo = Nothing
        Dim ORGA As BL_GEN_Organizacion = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Dim TipoLinea As BL_MOV_LineaTipo = Nothing

        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            End If

            'CrearDocumentoReporte          
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oSolicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            ORGA = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            NombreModelo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
            TipoLinea = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            For index = 1 To listaDatos.Count
                If listaDatos(index - 1) = "-1" Or listaDatos(index - 1) = "," Then
                    listaDatos(index - 1) = ""
                End If
            Next

            Dim p_vcTipoSolicitud As String = "" 'listaDatos(0)
            Dim LstTipoSolicitudSeleccionados As List(Of String) = listaDatos(0).Split(",").ToList()
            For i = 1 To LstTipoSolicitudSeleccionados.Count
                If LstTipoSolicitudSeleccionados(i - 1) <> "" Then
                    p_vcTipoSolicitud = p_vcTipoSolicitud + IIf(p_vcTipoSolicitud.ToString().Length = 0, "" + LstTipoSolicitudSeleccionados(i - 1) + ",", LstTipoSolicitudSeleccionados(i - 1) + ",")
                End If
            Next
            If p_vcTipoSolicitud.Length > 0 Then
                p_vcTipoSolicitud = p_vcTipoSolicitud.ToString().Substring(0, p_vcTipoSolicitud.Length - 1)
            End If

            Dim p_vcUsuario As String = ""
            listaDatos(1) = listaDatos(1).Replace("'", "")
            Dim LstEmpleadoSeleccionados As List(Of String) = listaDatos(1).Split(",").ToList()
            For i = 1 To LstEmpleadoSeleccionados.Count
                If LstEmpleadoSeleccionados(i - 1) <> "" Then
                    p_vcUsuario = p_vcUsuario + IIf(p_vcUsuario.ToString().Length = 0, "'" + LstEmpleadoSeleccionados(i - 1) + "','", LstEmpleadoSeleccionados(i - 1) + "','")
                End If
            Next
            If p_vcUsuario.Length > 0 Then
                p_vcUsuario = p_vcUsuario.ToString().Substring(0, p_vcUsuario.Length - 2)
            End If

            Dim p_vcEstadoProceso As String = "" 'listaDatos(0)
            Dim LstEstadoProcesoSeleccionados As List(Of String) = listaDatos(2).Split(",").ToList()
            For i = 1 To LstEstadoProcesoSeleccionados.Count
                If LstEstadoProcesoSeleccionados(i - 1) <> "" Then
                    p_vcEstadoProceso = p_vcEstadoProceso + IIf(p_vcEstadoProceso.ToString().Length = 0, "" + LstEstadoProcesoSeleccionados(i - 1) + ",", LstEstadoProcesoSeleccionados(i - 1) + ",")
                End If
            Next
            If p_vcEstadoProceso.Length > 0 Then
                p_vcEstadoProceso = p_vcEstadoProceso.ToString().Substring(0, p_vcEstadoProceso.Length - 1)
            End If

            Dim p_vcEstadoAprobacion As String = "" 'listaDatos(0)
            Dim LstEstadoAprobacionSeleccionados As List(Of String) = listaDatos(3).Split(",").ToList()
            For i = 1 To LstEstadoAprobacionSeleccionados.Count
                If LstEstadoAprobacionSeleccionados(i - 1) <> "" Then
                    p_vcEstadoAprobacion = p_vcEstadoAprobacion + IIf(p_vcEstadoProceso.ToString().Length = 0, "" + LstEstadoAprobacionSeleccionados(i - 1) + ",", LstEstadoAprobacionSeleccionados(i - 1) + ",")
                End If
            Next
            If p_vcEstadoAprobacion.Length > 0 Then
                p_vcEstadoAprobacion = p_vcEstadoAprobacion.ToString().Substring(0, p_vcEstadoAprobacion.Length - 1)
            End If



            'Dim p_vcEstadoAprobacion As String = listaDatos(3)
            Dim p_dtFechaInicio As String = "" 'listaDatos(4)
            Dim LstFechaIni As List(Of String) = listaDatos(4).Split("/").ToList()
            p_dtFechaInicio = LstFechaIni(2).ToString() + LstFechaIni(1).ToString() + LstFechaIni(0).ToString()
            Dim p_dtFechaFin As String = "" 'listaDatos(5)
            Dim LstFechaFin As List(Of String) = listaDatos(5).Split("/").ToList()
            p_dtFechaFin = LstFechaFin(2).ToString() + LstFechaFin(1).ToString() + LstFechaFin(0).ToString()

            Dim p_vcCodOrganizacion As String = listaDatos(6)

            Dim DtDatosFiltros As DataTable = ORGA.TraerDatosFiltroReporteSolicitud(p_vcCodOrganizacion, p_vcUsuario, p_vcTipoSolicitud, p_vcEstadoProceso, p_vcEstadoAprobacion)

            Dim dt As DataTable = oSolicitud.ListarSolicitudFiltroMultiple(p_vcTipoSolicitud, p_vcUsuario, p_vcEstadoProceso, p_vcEstadoAprobacion,
                                                                           p_dtFechaInicio, p_dtFechaFin, p_vcCodOrganizacion)

            If dt.Rows.Count > 0 Then
                Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)

                myReport.LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                myReport.LBLUsuario.Text = oUsuario.vcNom

                Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Try
                    Dim pictureBytes As New MemoryStream(Regi.Listar().REGI_imLOGEMP)
                    If pictureBytes.Length <> 0 Then
                        myReport.xrPictureBoxLogo.Image = System.Drawing.Image.FromStream(pictureBytes)
                    Else
                        myReport.xrPictureBoxLogo.Image = Nothing
                    End If
                Catch ex As Exception
                    myReport.xrPictureBoxLogo.Image = Nothing
                End Try

                If dt.Rows.Count >= 1 Then

                    If (p_vcUsuario <> "-1") Then
                        myReport.LBLempleado.Text = "Empleado(s):"
                        myReport.TXTempleado.Text = DtDatosFiltros.Rows(0)("Dato_EMPL").ToString()
                    End If

                    If (p_vcCodOrganizacion <> "-1") Then
                        myReport.LBLorganizacion.Text = "Organización:"
                        myReport.TXTorganizacion.Text = DtDatosFiltros.Rows(0)("Dato_Orga").ToString()
                    End If

                    If (p_vcTipoSolicitud <> "-1") Then
                        myReport.XrLabel4.Text = "Tipo Solicitud(es):"
                        myReport.TXT_TipoSolicitud.Text = DtDatosFiltros.Rows(0)("Dato_TipoSoli").ToString()
                    End If

                    If (p_vcEstadoProceso <> "-1") Then
                        myReport.XrLabel1.Text = "Estado Proceso(s):"
                        myReport.TXT_EstadoProceso.Text = DtDatosFiltros.Rows(0)("Dato_EstaProc").ToString()
                    End If

                    If (p_vcEstadoProceso <> "-1") Then
                        myReport.LBLestado.Text = "Estado Aprobación(es):"
                        myReport.TXTEstadoApro.Text = DtDatosFiltros.Rows(0)("Dato_EstaApro").ToString()
                    End If

                    myReport.LBLcuenta.Text = "Rango de Fechas:"
                    myReport.TXT_RangoFechas.Text = "De: " & listaDatos(4).ToString() & " - Hasta: " & listaDatos(5).ToString()

                End If

                Dim mValores(8, 2) As String
                'mjaramillo 07/12/2016
                'se cambio el texto del titulo1
                'mValores(0, 0) = "cfTitulo1" : mValores(0, 1) = "LISTA DE SOLICITUDES SEGÚN "
                'AsignarValoresFormulas(myReport.CalculatedFields, mValores)


                ''myReport.DataSource = dt
                dt.TableName = "Mov_s_Listar_Empleados_X_Filtro_Multiples"
                myReport.DataSource = dt
                myReport.DataMember = dt.TableName

                dxReportViewer.Report = myReport
                dxReportViewer.DataBind()

                dvReporte.Visible = True
                dvSinDatosLineaContrato.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatosLineaContrato.Visible = True
            End If





        Catch ex As Exception

        End Try





    End Sub

    Private Sub CrearReporteOrdenServicioFiltroMultiple(ByVal CargarDataReporte As Boolean, ByVal Detalle As String)

        Dim myReport As XRPT_Rpt_OrdenServicio = New XRPT_Rpt_OrdenServicio()
        If Not CargarDataReporte Then
            dxReportViewer.Report = myReport
            dxReportViewer.DataBind()
            Exit Sub
        End If


        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim oSolicitud As BL_MOV_Solicitud = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim NombreModelo As BL_MOV_ModeloDispositivo = Nothing
        Dim ORGA As BL_GEN_Organizacion = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Dim TipoLinea As BL_MOV_LineaTipo = Nothing

        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            End If

            'CrearDocumentoReporte          
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oSolicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            ORGA = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            NombreModelo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
            TipoLinea = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            For index = 1 To listaDatos.Count
                If listaDatos(index - 1) = "-1" Or listaDatos(index - 1) = "," Then
                    listaDatos(index - 1) = ""
                End If
            Next

            Dim p_vcTipoSolicitud As String = "" 'listaDatos(0)
            Dim LstTipoSolicitudSeleccionados As List(Of String) = listaDatos(0).Split(",").ToList()
            For i = 1 To LstTipoSolicitudSeleccionados.Count
                If LstTipoSolicitudSeleccionados(i - 1) <> "" Then
                    p_vcTipoSolicitud = p_vcTipoSolicitud + IIf(p_vcTipoSolicitud.ToString().Length = 0, "" + LstTipoSolicitudSeleccionados(i - 1) + ",", LstTipoSolicitudSeleccionados(i - 1) + ",")
                End If
            Next
            If p_vcTipoSolicitud.Length > 0 Then
                p_vcTipoSolicitud = p_vcTipoSolicitud.ToString().Substring(0, p_vcTipoSolicitud.Length - 1)
            End If

            Dim p_vcUsuario As String = ""
            listaDatos(1) = listaDatos(1).Replace("'", "")
            Dim LstEmpleadoSeleccionados As List(Of String) = listaDatos(1).Split(",").ToList()
            For i = 1 To LstEmpleadoSeleccionados.Count
                If LstEmpleadoSeleccionados(i - 1) <> "" Then
                    p_vcUsuario = p_vcUsuario + IIf(p_vcUsuario.ToString().Length = 0, "'" + LstEmpleadoSeleccionados(i - 1) + "','", LstEmpleadoSeleccionados(i - 1) + "','")
                End If
            Next
            If p_vcUsuario.Length > 0 Then
                p_vcUsuario = p_vcUsuario.ToString().Substring(0, p_vcUsuario.Length - 2)
            End If
            Dim p_dtFechaInicio As String = ""
            Dim LstFechaIni As List(Of String) = listaDatos(2).Split("/").ToList()
            p_dtFechaInicio = LstFechaIni(2).ToString() + LstFechaIni(1).ToString() + LstFechaIni(0).ToString()
            Dim p_dtFechaFin As String = "" 'listaDatos(5)
            Dim LstFechaFin As List(Of String) = listaDatos(3).Split("/").ToList()
            p_dtFechaFin = LstFechaFin(2).ToString() + LstFechaFin(1).ToString() + LstFechaFin(0).ToString()

            Dim p_vcCodOrganizacion As String = listaDatos(4)

            Dim DtDatosFiltros As DataTable = ORGA.TraerDatosFiltroReporteOrdenServicio(p_vcCodOrganizacion, p_vcUsuario, p_vcTipoSolicitud)

            Dim dt As DataTable = oSolicitud.ListarOrdenServicioFiltroMultiple(p_vcTipoSolicitud, p_vcUsuario, p_dtFechaInicio, p_dtFechaFin, p_vcCodOrganizacion)

            If dt.Rows.Count > 0 Then
                Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)

                myReport.LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                myReport.LBLUsuario.Text = oUsuario.vcNom

                Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Try
                    Dim pictureBytes As New MemoryStream(Regi.Listar().REGI_imLOGEMP)
                    If pictureBytes.Length <> 0 Then
                        myReport.xrPictureBoxLogo.Image = System.Drawing.Image.FromStream(pictureBytes)
                    Else
                        myReport.xrPictureBoxLogo.Image = Nothing
                    End If
                Catch ex As Exception
                    myReport.xrPictureBoxLogo.Image = Nothing
                End Try

                If dt.Rows.Count >= 1 Then

                    If (p_vcUsuario <> "-1") Then
                        myReport.LBLempleado.Text = "Empleado(s):"
                        myReport.TXTempleado.Text = DtDatosFiltros.Rows(0)("Dato_EMPL").ToString()
                    End If

                    If (p_vcCodOrganizacion <> "-1") Then
                        myReport.LBLorganizacion.Text = "Organización:"
                        myReport.TXTorganizacion.Text = DtDatosFiltros.Rows(0)("Dato_Orga").ToString()
                    End If

                    If (p_vcTipoSolicitud <> "-1") Then
                        myReport.XrLabel4.Text = "Tipo Solicitud(es):"
                        myReport.TXT_TipoSolicitud.Text = DtDatosFiltros.Rows(0)("Dato_TipoSoli").ToString()
                    End If

                    myReport.LBLcuenta.Text = "Rango de Fechas:"
                    myReport.TXT_RangoFechas.Text = "De: " & listaDatos(2).ToString() & " - Hasta: " & listaDatos(3).ToString()

                End If

                Dim mValores(8, 2) As String

                myReport.DataSource = dt
                dt.TableName = "Mov_s_Listar_OrdenesServicios_X_Filtro_Multiples"
                myReport.DataSource = dt
                myReport.DataMember = dt.TableName

                dxReportViewer.Report = myReport
                dxReportViewer.DataBind()

                dvReporte.Visible = True
                dvSinDatosLineaContrato.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatosLineaContrato.Visible = True
            End If

        Catch ex As Exception

        End Try





    End Sub

    Private Sub AsignarValoresFormulas(ByRef CamposCalculados As CalculatedFieldCollection, mValores(,) As String)
        For x As Integer = 0 To UBound(mValores) - 1
            If mValores(x, 0) IsNot Nothing AndAlso mValores(x, 0) <> "" Then
                For Each calcFiel As CalculatedField In CamposCalculados
                    If calcFiel.Name = mValores(x, 0) Then
                        calcFiel.Expression = "'" & mValores(x, 1) & "'"
                        Exit For
                    End If
                Next
            End If
        Next
    End Sub

    ''Private Sub dxReportViewer_CacheReportDocument(sender As Object, e As DevExpress.XtraReports.Web.CacheReportDocumentEventArgs) Handles dxReportViewer.CacheReportDocument
    ''    e.Key = Guid.NewGuid().ToString()
    ''    Page.Session(e.Key) = e.SaveDocumentToMemoryStream()
    ''End Sub
    ''Private Sub dxReportViewer_RestoreReportDocumentFromCache(sender As Object, e As DevExpress.XtraReports.Web.RestoreReportDocumentFromCacheEventArgs) Handles dxReportViewer.RestoreReportDocumentFromCache
    ''    Dim stream As Stream = TryCast(Page.Session(e.Key), Stream)
    ''    If stream IsNot Nothing Then
    ''        e.RestoreDocumentFromStream(stream)
    ''    End If
    ''End Sub

    Protected Sub ReportViewer1_CacheReportDocument(ByVal sender As Object, ByVal e As DevExpress.XtraReports.Web.CacheReportDocumentEventArgs)
        Try
            e.Key = Guid.NewGuid().ToString()
            Page.Session("UltimoCodigoReporte") = e.Key
            Page.Session(e.Key) = e.SaveDocumentToMemoryStream()
        Catch ex As Exception
        End Try
        
    End Sub
    Protected Sub ReportViewer1_RestoreReportDocumentFromCache(ByVal sender As Object, ByVal e As DevExpress.XtraReports.Web.RestoreReportDocumentFromCacheEventArgs)
        Try
            Dim stream As Stream = TryCast(Page.Session(e.Key), Stream)
            If stream IsNot Nothing Then
                e.RestoreDocumentFromStream(stream)
            End If
        Catch ex As Exception
        End Try
        
    End Sub


End Class