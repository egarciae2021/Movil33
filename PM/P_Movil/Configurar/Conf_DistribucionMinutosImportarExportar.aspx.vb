Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.ImportacionExportacion
Imports CompCorreo
'Imports ExportarExcelGenerico
Imports ClosedXML.Excel
Imports System.IO
Imports ExportarExcelGenerico


Partial Class P_Movil_Configurar_Conf_DistribucionMinutosImportarExportar
    Inherits System.Web.UI.Page

    Private _TipoExcel As TipoExcel
    Public Property oTipoExcel As TipoExcel
        Get
            Return _TipoExcel
        End Get
        Set(value As TipoExcel)
            _TipoExcel = value
        End Set
    End Property

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            If Not IsPostBack Then

                'Dim Tipo As String = Request.QueryString("Tipo")
                Dim SubTipo As String = Request.QueryString("SubTipo")
                Dim vcFiltro As String = Request.QueryString("vcValIli")
                hdfvcPeriodo.Value = Request.QueryString("vcPeriodo")
                hdfvcCuenta.Value = Request.QueryString("vcCuenta")
                hdfvcModo.Value = Request.QueryString("Tipo")
                hdfFlagOmitir.Value = Request.QueryString("p_flagOmitir")

                hdfvcCodInt2.Value = Request.QueryString("p_vcCodInt2")

                hdfEstadoPeriodo.Value = Request.QueryString("p_vcEstado")
                hdf_ddlFil_Per.Value = Request.QueryString("p_ddlFil_Per")
                hdf_vcFil_Per.Value = Request.QueryString("p_vcFil_Per")

                'Dim p_idPeriodo As Integer = Request.QueryString("p_idPeriodo")
                hdfCodBolPer.Value = Request.QueryString("p_idPeriodo")
                hdfGuidNom.Value = Request.QueryString("vcGuidNom")

                Dim FiltroCantidad As Integer = Convert.ToInt32(Request.QueryString("p_inFilCanAsig"))
                Dim FiltroLinExp As String = Request.QueryString("p_FilLinExp")

                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

                Try
                    GenerarDatosExport(oUsuario, SubTipo, hdfvcModo.Value, hdfvcPeriodo.Value, hdfvcCuenta.Value, hdfCodBolPer.Value, vcFiltro, FiltroCantidad, FiltroLinExp)

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                End Try
            End If
        End If
    End Sub

    Private Function Agregar_Campo(ByVal inOrd As Integer, ByVal vcDes As String, ByVal vcAlias As String, Optional ByVal inTipDat As Integer = 0, Optional ByVal vcValVer As String = "", Optional ByVal vcValFal As String = "") As ENT_ENT_Campo

        Dim ent As New ENT_ENT_Campo
        ent.inOrd = inOrd
        ent.vcNomAlias = vcAlias
        ent.vcDes = vcDes
        ent.btVis = True
        ent.btVig = True

        If inTipDat <> 0 Then ent.inTipDat = inTipDat
        If vcValVer <> "" Then ent.vcValVer = vcValVer
        If vcValFal <> "" Then ent.vcValFal = vcValFal
        'ent.inTipDat =
        Return ent

    End Function

    ' =======================================================================================================
    '   CARGAR
    ' =======================================================================================================
    Protected Sub btnCargar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnCargar.Click
        Dim BolsaDistribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/P_Movil/Configurar/Distribucion/"), "/")

            If (Not fuArchivo.PostedFile Is Nothing) And (fuArchivo.PostedFile.ContentLength > 0) Then
                ' NOMBRE ARCHIVO
                Dim RutaCarpeta As String = "P_Movil/Configurar/Distribucion" + CarpetaDominio + "/"
                Dim vcArchivo As String = fuArchivo.PostedFile.FileName
                Dim vcNombre As String = Path.GetFileNameWithoutExtension(vcArchivo)

                'GUARDA ARCHIVO
                Dim vcRuta As String = Server.MapPath("~/" & RutaCarpeta & Path.GetFileNameWithoutExtension(vcArchivo) & Path.GetExtension(vcArchivo))
                fuArchivo.PostedFile.SaveAs(vcRuta)

                oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                BolsaDistribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

                'RECORRE ARCHIVO
                Dim wb As New XLWorkbook(vcRuta)
                Dim vcModo As String = hdfvcModo.Value
                Dim vcPeriodo As String = hdfvcPeriodo.Value
                Dim vcCuenta As String = hdfvcCuenta.Value

                Dim inPosiLinea As Integer = 0
                Dim inPosiCantidad As Integer = 0

                Dim XML As String = "<?xml version=""1.0"" encoding=""iso-8859-1""?><ROOT>"
                Dim vcMensajeLog As String = "<table> <tr> <td>Los siguientes registros no se procesaron : </td> </tr> <tr> <td> </td> </tr>"
                Dim flagMensaje As Boolean = False

                'HOJAS 
                For Each hoja As IXLWorksheet In wb.Worksheets
                    Dim RowsHoja As Integer = hoja.RangeUsed.RowCount
                    Dim ColumnHoja As Integer = hoja.RangeUsed.ColumnCount

                    For x = 1 To RowsHoja
                        'validar que tenga mas de una fila
                        Dim flagValida As Boolean = True

                        If x = 1 Then
                            inPosiLinea = 1
                            If vcModo = "0" Then
                                inPosiCantidad = 8
                            Else
                                inPosiCantidad = 5
                            End If

                        Else
                            'VALORES
                            Dim vcCodigo As String = hoja.Cell(x, inPosiLinea).Value
                            Dim dcCan As String = hoja.Cell(x, inPosiCantidad).Value

                            'VALIDA CODIGO
                            If vcCodigo.Length = 0 Then
                                vcMensajeLog = vcMensajeLog + " <tr> <td>Fila " + x.ToString + ", no tiene código ingresado</td> </tr>"
                                flagValida = False
                            End If

                            If flagValida Then
                                If vcModo <> "1" Then 'no validar codigo numerico para el modo centro de costo
                                    If IsNumeric(vcCodigo) Then
                                        If vcCodigo < 0 And vcCodigo <> -1 And vcCodigo <> -2 Then 'validar codigo -1 como linesa sin empleados asociados,-2 como codigo de agrupacion de baja o inexistente '07-07-2015 wapumayta
                                            vcMensajeLog = vcMensajeLog + " <tr> <td>Fila " + x.ToString + ", el código no puede ser un número negativo </td> </tr>"
                                            flagValida = False
                                        End If
                                    Else
                                        vcMensajeLog = vcMensajeLog + " <tr> <td>Fila " + x.ToString + ", el código no es valor númerico </td> </tr>"
                                        flagValida = False
                                    End If
                                End If
                            End If

                                'VALIDA CANTIDAD
                                If dcCan.Length = 0 Then
                                    vcMensajeLog = vcMensajeLog + " <tr> <td>Fila " + x.ToString + ", no tiene valor ingresado </td> </tr>"
                                    flagValida = False
                                End If

                                If flagValida Then
                                    If IsNumeric(dcCan) Then
                                        If dcCan > 1000000 Then
                                            vcMensajeLog = vcMensajeLog + " <tr> <td>Fila " + x.ToString + ", el valor supero el limite permitido </td> </tr>"
                                            flagValida = False
                                        End If
                                        If dcCan < 0 Then
                                            vcMensajeLog = vcMensajeLog + " <tr> <td>Fila " + x.ToString + ", el valor no puede ser un número negativo </td> </tr>"
                                            flagValida = False
                                        End If
                                    Else
                                        vcMensajeLog = vcMensajeLog + " <tr> <td>Fila " + x.ToString + ", no es valor númerico </td> </tr>"
                                        flagValida = False
                                    End If

                                End If

                                'GUARDA IMPORTACION 
                                If flagValida Then
                                    dcCan = dcCan.ToString.Trim
                                    XML += "<DATA Codigo=""" + vcCodigo + """ Cantidad=""" + dcCan + """ />"
                                Else
                                    flagMensaje = True
                                End If
                            End If

                            'actualizar por bloques (para importaciones de mas de 150 lineas)
                            If (x Mod 150 = 0) Then
                                XML += "</ROOT>"
                                BolsaDistribucion.dt_DistribucionImportacion(hdfCodBolPer.Value, hdfGuidNom.Value, XML, IIf(rbtUpd.Checked, 1, 0), vcModo, oUsuario.P_inCod, hdfvcCodInt2.Value, False)
                                XML = "<?xml version=""1.0"" encoding=""iso-8859-1""?><ROOT>"
                            End If
                    Next x
                    ' End If
                Next

                vcMensajeLog = vcMensajeLog + "</table>"
                XML += "</ROOT>"

                BolsaDistribucion.dt_DistribucionImportacion(hdfCodBolPer.Value, hdfGuidNom.Value, XML, IIf(rbtUpd.Checked, 1, 0), vcModo, oUsuario.P_inCod, hdfvcCodInt2.Value, True)

                Dim script As String = "CerrarCarga();" + IIf(flagMensaje, "window.parent.alerta('" + vcMensajeLog + "');", "")
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If
            'OcultarPanel()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub DescargarArchivo(ByVal carpeta As String, ByVal nombreArchivo As String)
        hdfArchivo.Value = carpeta & "\" & nombreArchivo

        'Dim script As String = "ExportarArchivo(); CerrarCarga();"
        Dim script As String = "CerrarCarga();"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    End Sub

    Private Sub OcultarPanel()
        Dim script As String = "CerrarCarga();"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    End Sub

    'GENERAR DATOS PARA EXPORTAR
    Private Sub GenerarDatosExport(ByVal oUsuario As ENT_SEG_Usuario, ByVal SubTipo As String, ByVal Modo As Integer, ByVal vcPeriodo As String,
                                   ByVal vcCuenta As String, ByVal inCodBolPer As Integer, ByVal vcBus As String, ByVal inFilCantidad As Integer,
                                   ByVal btFilLinExp As String)
        Dim CuentaBolsaDis As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim CuentaBolsaPer As BL_MOV_CuentaBolsaPeriodo = Nothing
        Try
            Dim ds As New DataSet()
            Dim dtDatos As New DataTable()
            Dim vcNombreArchivo As String = String.Empty
            Dim lstCampo As New List(Of ENT_ENT_Campo)
            Dim arIndex As New List(Of Integer)
            Dim CodInt2 As String = String.Empty

            Select Case SubTipo
                Case "1" 'EXPORTAR DETALLE
                    CuentaBolsaDis = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
                    Select Case Modo
                        Case UtilitarioWeb.TipoDistribucionServicios.Linea
                            vcNombreArchivo = "BolsaLinea_" & vcPeriodo.Replace("/", "_")
                            ds = CuentaBolsaDis.DistribucionServicios_Linea_Temp(vcBus, vcCuenta, vcPeriodo, Nothing, Nothing, String.Empty, Nothing, 0, 0, "", "", inFilCantidad, btFilLinExp, inCodBolPer)
                        Case UtilitarioWeb.TipoDistribucionServicios.CentroCosto
                            vcNombreArchivo = "BolsaCentroCosto_" & vcPeriodo.Replace("/", "_")
                            ds = CuentaBolsaDis.dt_DistribucionServicio_Agrup(vcCuenta, vcPeriodo, String.Empty, vcBus, CodInt2, String.Empty, UtilitarioWeb.TipoDistribucionServicios.CentroCosto, inCodBolPer)
                        Case UtilitarioWeb.TipoDistribucionServicios.Organizacion
                            vcNombreArchivo = "BolsaArea_" & vcPeriodo.Replace("/", "_")
                            ds = CuentaBolsaDis.dt_DistribucionServicio_Agrup(vcCuenta, vcPeriodo, String.Empty, vcBus, CodInt2, String.Empty, UtilitarioWeb.TipoDistribucionServicios.Organizacion, inCodBolPer)
                        Case UtilitarioWeb.TipoDistribucionServicios.Nivel
                            vcNombreArchivo = "BolsaNivel_" & vcPeriodo.Replace("/", "_")
                            ds = CuentaBolsaDis.dt_DistribucionServicio_Agrup(vcCuenta, vcPeriodo, String.Empty, vcBus, CodInt2, String.Empty, UtilitarioWeb.TipoDistribucionServicios.Nivel, inCodBolPer)
                        Case UtilitarioWeb.TipoDistribucionServicios.GrupoEmpleados
                            vcNombreArchivo = "BolsaGrupoEmpleado_" & vcPeriodo.Replace("/", "_")
                            ds = CuentaBolsaDis.dt_DistribucionServicio_Agrup(vcCuenta, vcPeriodo, String.Empty, vcBus, CodInt2, String.Empty, UtilitarioWeb.TipoDistribucionServicios.GrupoEmpleados, inCodBolPer)
                    End Select
                    If (Modo = UtilitarioWeb.TipoDistribucionServicios.Linea) Then
                        arIndex.Add(14)
                        arIndex.Add(13)
                        arIndex.Add(10)
                        arIndex.Add(8)
                        arIndex.Add(5)

                        lstCampo.Add(Agregar_Campo(1, "Línea", "p_vcNum"))
                        lstCampo.Add(Agregar_Campo(2, "Código_Empleado", "vcCodEmp"))
                        lstCampo.Add(Agregar_Campo(3, "Empleado", "vcNomEmp"))
                        lstCampo.Add(Agregar_Campo(4, "Código_Dispositivo", "F_vcCodIMEI"))
                        lstCampo.Add(Agregar_Campo(5, "Modelo_Dispositivio", "vcNomModDis"))
                        lstCampo.Add(Agregar_Campo(6, "Sucursal", "vcNomSuc"))
                        lstCampo.Add(Agregar_Campo(7, "Periodo", "vcPeriodo"))
                        lstCampo.Add(Agregar_Campo(8, "Minutos", "dcCan1"))
                        lstCampo.Add(Agregar_Campo(9, "Fec Modificación", "dtFecModif"))
                        lstCampo.Add(Agregar_Campo(10, "Usuario Modificación", "vcUsu"))
                    Else
                        arIndex.Add(9)
                        arIndex.Add(8)
                        arIndex.Add(5)
                        arIndex.Add(4)

                        lstCampo.Add(Agregar_Campo(1, "Código", "vcCodGrup"))
                        lstCampo.Add(Agregar_Campo(1, "Descripción", "vcNomGrup"))
                        lstCampo.Add(Agregar_Campo(1, "Periodo", "vcPeriodo"))
                        lstCampo.Add(Agregar_Campo(1, "Líneas", "inNumLin"))
                        lstCampo.Add(Agregar_Campo(1, "Minutos", "dcCan"))
                        lstCampo.Add(Agregar_Campo(1, "Fec. Modificación", "dtFecModif"))
                    End If

                    Dim count As Integer = 0
                    If hdfFlagOmitir.Value <> "false" Then
                        For Each linea As DataRow In ds.Tables(0).Rows
                            Dim vcNomEmpl As String = String.Empty
                            If (Modo = UtilitarioWeb.TipoDistribucionServicios.Linea) Then
                                vcNomEmpl = linea("vcNomEmp")
                            Else
                                vcNomEmpl = linea("vcNomGrup")
                            End If
                            If vcNomEmpl.Substring(0, 3) = "***" Then
                                count = count + 1
                            End If
                        Next

                        If count > 0 Then
                            For i As Integer = 1 To count
                                ds.Tables(0).Rows.RemoveAt(0)
                            Next
                        End If
                    End If

                    dtDatos = ds.Tables(0)
                Case "2" 'IMPORTAR
                    dvImportar.Style("display") = ""
                Case "3" 'EXPORTAR CABECERA
                    CuentaBolsaPer = New BL_MOV_CuentaBolsaPeriodo(oUsuario.IdCliente)
                    Dim vFecha As DateTime = Date.Now()

                    vcNombreArchivo = "PeriodoBolsa_" + vFecha.Year.ToString + IIf(vFecha.Month < 10, "0", "") + vFecha.Month.ToString + IIf(vFecha.Day < 10, "0", "") + vFecha.Day.ToString + "_" + IIf(hdfEstadoPeriodo.Value = "1", "Activos", IIf(hdfEstadoPeriodo.Value = "0", "Inactivos", "Todos"))

                    dtDatos = CuentaBolsaPer.ListarPeriodo(0, oUsuario.F_vcCodInt,
                                                           IIf(hdf_ddlFil_Per.Value = "1", hdf_vcFil_Per.Value, ""),
                                                           IIf(hdf_ddlFil_Per.Value = "2", hdf_vcFil_Per.Value, ""),
                                                           IIf(hdf_ddlFil_Per.Value = "3", hdf_vcFil_Per.Value, -1),
                                                           IIf(hdf_ddlFil_Per.Value = "4", hdf_vcFil_Per.Value, ""),
                                                           IIf(hdf_ddlFil_Per.Value = "5", hdf_vcFil_Per.Value, ""),
                                                           hdfEstadoPeriodo.Value,
                                                           IIf(hdf_ddlFil_Per.Value = "6", hdf_vcFil_Per.Value, -1))
                    arIndex.Add(25)
                    arIndex.Add(24)
                    arIndex.Add(19)
                    arIndex.Add(16)
                    arIndex.Add(13)
                    arIndex.Add(12)
                    arIndex.Add(11)
                    arIndex.Add(10)
                    arIndex.Add(8)
                    arIndex.Add(7)
                    arIndex.Add(2)
                    arIndex.Add(0)


                    dtDatos.Columns(17).ColumnName = "vcNomTipoDist"


                    lstCampo.Add(Agregar_Campo(1, "Periodo", "vcPeriodo"))
                    lstCampo.Add(Agregar_Campo(2, "Operador", "vcNomOpe"))
                    lstCampo.Add(Agregar_Campo(3, "Código", "f_vcCuenta"))
                    lstCampo.Add(Agregar_Campo(4, "Cuenta", "vcNomCue"))
                    lstCampo.Add(Agregar_Campo(5, "Tipo Distrib.", "vcNomTipoDist"))
                    lstCampo.Add(Agregar_Campo(6, "Líneas", "InLineas"))
                    'lstCampo.Add(Agregar_Campo(6, "Enviado", "btEnviado"))
                    'lstCampo.Add(Agregar_Campo(8, "Mínutos Cuenta Bolsa", "inCanBolsa"))
                    'lstCampo.Add(Agregar_Campo(9, "Minutos Distribución", "inCanUltAsig"))                  


                    lstCampo.Add(Agregar_Campo(13, "Est Proc.", "vcNomEstado"))
                    lstCampo.Add(Agregar_Campo(14, "Tip. Creac", "vcNomTipProc"))
                    lstCampo.Add(Agregar_Campo(15, "Lin. Altas", "inLinAltas"))
                    lstCampo.Add(Agregar_Campo(16, "Lin. Bajas", "inLinBajas"))
                    lstCampo.Add(Agregar_Campo(16, "Lin. Dist Cero", "inLinDistCero"))

                    lstCampo.Add(Agregar_Campo(17, "F. Creado", "dtFecUsuCre"))
                    lstCampo.Add(Agregar_Campo(18, IIf(hdfEstadoPeriodo.Value = "0", "F. Anulación", "F. Actualización"), "dtFecUsuMod"))
                    lstCampo.Add(Agregar_Campo(19, "Estado", "btEst", 6, "Activo", "Desactivo"))

            End Select

            If SubTipo = "1" OrElse SubTipo = "3" Then
                For i = 0 To arIndex.Count - 1
                    dtDatos.Columns.Remove(dtDatos.Columns(arIndex(i)).Caption)
                Next

                Dim Dominio As String = Session("IdDominio").ToString()
                Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()

                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, vcNombreArchivo, lstCampo, True, Dominio, Usuario)
                DescargarArchivo("Distribucion", vcNombreArchivo)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(CuentaBolsaDis) Then CuentaBolsaDis.Dispose()
            If Not IsNothing(CuentaBolsaPer) Then CuentaBolsaPer.Dispose()
        End Try
    End Sub
End Class
