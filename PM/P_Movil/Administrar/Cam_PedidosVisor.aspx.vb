Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Cam_PedidosVisor
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                If (Not IsNothing(Request.QueryString("vcTipDes"))) Then
                    ExportarExcel(Request.QueryString("vcTipDes"), Convert.ToInt32(Request.QueryString("inIdCam")), Request.QueryString("vcNomSit"), _
                                    Request.QueryString("vcFecIni"), Request.QueryString("vcFecFin"), Request.QueryString("vcCodEmp"), Request.QueryString("vcCodAre"), _
                                    Request.QueryString("vcCodCCO"), Request.QueryString("vcCodCue"), Request.QueryString("vcIdEst"), Request.QueryString("vcCodPed"))
                Else
                    CargarCombos()
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            'If ddlOperador.Items.Count = 2 Then
            '    ddlOperador.Enabled = False
            '    ddlOperador.SelectedIndex = 1
            'End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub CargarCombos()
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Estado As BL_MOV_Estado = Nothing

        Try
            Operador = New BL_GEN_Operador(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Estado = New BL_MOV_Estado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(-1, "<Seleccione>")
            UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

            Dim lstCampana As New List(Of MOV_CAM_Campana)
            lstCampana = ListarCampanaPorOperador(ddlOperador.SelectedValue)
            UtilitarioWeb.Dataddl(ddlCampana, lstCampana, "Descripcion", "IdCampana")
            If ddlCampana.Items.Count = 0 Then
                ddlCampana.Items.Add(New ListItem("<No hay campañas>", "-1"))
            Else
                If lstCampana.Find(Function(c) c.btActivo = True) IsNot Nothing Then
                    ddlCampana.SelectedValue = lstCampana.Find(Function(c) c.btActivo = True).IdCampana.ToString()
                End If
            End If

            ddlSituacion.Items.Add(New ListItem("<Todos>", "-1"))
            ddlSituacion.Items.Add(New ListItem("Baja", "Baja"))
            ddlSituacion.Items.Add(New ListItem("Nuevo", "Nuevo"))
            ddlSituacion.Items.Add(New ListItem("Renovación", "Renovacion"))

            UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.ListarPorLineaTipo(2, -1, "<Todos>"), "vcNom", "P_vcCod")
            UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarPorModulo(7, 7, -1, "<Todos>"), "vcNom", "P_inCod")
            'ddlEstado.Items.Remove(ddlEstado.Items.FindByValue("27")) 'Se quita el estado entregado porque no es un estado de pedido vigente

            Dim IdCampana As Integer = Campana.MostrarUltimaCampana(ddlOperador.SelectedValue)
            If IdCampana <> -1 Then
                ddlCampana.SelectedValue = IdCampana
            Else
                ddlCampana.SelectedIndex = 0
            End If

            bpOficina.NombreEntidad = "Oficina"
            bpOficina.vcTab = "GEN_EMP_Oficina"
            bpOficina.TipoOrigen = 0
            bpOficina.FuncionPersonalizada = "fnMostrarOficina"
            bpOficina.RutaRaiz = "../../"
            bpOficina.Contenedor = "dvOficinaBusqueda"
            bpOficina.Condicion = "GEN_EMP_Oficina.Vigente = 1"

            bpOficinaCambio.NombreEntidad = "Oficina"
            bpOficinaCambio.vcTab = "GEN_EMP_Oficina"
            bpOficinaCambio.TipoOrigen = 0
            bpOficinaCambio.FuncionPersonalizada = "fnMostrarOficinaCambio"
            bpOficinaCambio.RutaRaiz = "../../"
            bpOficinaCambio.Contenedor = "dvOficinaCambio"
            bpOficinaCambio.Condicion = "GEN_EMP_Oficina.Vigente = 1"

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
            If Cuenta IsNot Nothing Then
                Cuenta.Dispose()
            End If
            If Estado IsNot Nothing Then
                Estado.Dispose()
            End If
        End Try

    End Sub

    Private Sub ExportarExcel(ByVal vcTipDes As String, ByVal inIdCam As Integer, ByVal vcNomSit As String, ByVal vcFecIni As String, ByVal vcFecFin As String, _
                              ByVal vcCodEmp As String, ByVal vcCodAre As String, ByVal vcCodCCO As String, ByVal vcCodCue As String, ByVal vcIdEst As String, _
                              ByVal vcCodPed As String)

        Dim CampanaPedido As BL_MOV_CAM_CampanaPedido = Nothing

        Try
            CampanaPedido = New BL_MOV_CAM_CampanaPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            vcFecIni = If(vcFecIni <> "", vcFecIni.Substring(6, 4) + vcFecIni.Substring(3, 2) + vcFecIni.Substring(0, 2) + " 00:00:00", "")
            vcFecFin = If(vcFecFin <> "", vcFecFin.Substring(6, 4) + vcFecFin.Substring(3, 2) + vcFecFin.Substring(0, 2) + " 23:59:59", "")
            vcCodEmp = If(vcCodEmp = "", "0", vcCodEmp)
            vcCodAre = If(vcCodAre = "", "0", vcCodAre)

            Dim vcHayCue As String = "0"
            If vcCodCue = "-1" Then
                vcCodCue = "''"
            Else
                vcCodCue = vcCodCue.Replace("-1,", "").Replace(vbLf, "").Replace(",", "','")
                vcHayCue = "1"
            End If
            Dim vcHayEst As String = "0"
            If vcIdEst = "-1" Then
                vcIdEst = ""
            Else
                vcIdEst = vcIdEst.Substring(3).Replace(vbLf, "")
                vcHayEst = "1"
            End If
            Dim blnSeg = False
            If vcTipDes.ToUpper = "VISTA DETALLADA" Then
                blnSeg = True
            End If

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Dim dsDetalle As DataSet = CampanaPedido.ListarParaExpSeg(Integer.Parse(inIdCam), vcNomSit, vcFecIni, vcFecFin, vcCodEmp, Convert.ToInt32(vcCodAre), _
                                                                      vcCodCCO, vcCodCue, vcHayCue, vcIdEst, vcHayEst, oCultura, blnSeg, vcCodPed)

            ExportDataTableToExcel(dsDetalle.Tables(0), dsDetalle.Tables(1), dsDetalle.Tables(2), dsDetalle.Tables(3), blnSeg)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedido IsNot Nothing Then
                CampanaPedido.Dispose()
            End If
        End Try

    End Sub

    Public Sub ExportDataTableToExcel(ByVal dtPedidos As DataTable, ByVal dtDetalles As DataTable, ByVal dtPedSeg As DataTable, ByVal dtDetSeg As DataTable, _
                                        ByVal blnSeg As Boolean)
        Dim dtCamPed As DataTable
        Dim dtCamDet As DataTable
        Dim dtCamPedSeg As DataTable
        Dim dtCamDetSeg As DataTable
        dtCamPed = ObtenerColumnas(dtPedidos, "Pedidos")
        dtCamDet = ObtenerColumnas(dtDetalles, "Detalles")
        dtCamPedSeg = ObtenerColumnas(dtPedSeg, "PedidosSeg")
        dtCamDetSeg = ObtenerColumnas(dtDetSeg, "DetallesSeg")

        Dim attachment As String = "attachment; filename=" & "Seguimiento de Pedidos" & ".xls"

        Dim context As HttpContext = HttpContext.Current

        context.Response.ClearContent()
        context.Response.AddHeader("content-disposition", attachment)
        context.Response.ContentType = "application/vnd.ms-excel"

        'Dim tab As String = ""
        Dim inTotMonNoSer As Integer = 0
        Dim inTotMonSer As Integer = 0

        context.Response.ContentEncoding = Encoding.Default
        context.Response.Write("<style> TD { mso-number-format:\@; } </style>")

        context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Detalle de Corte" + "' style='border-collapse:collapse;'>")
        context.Response.Write(vbLf)

        context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
        context.Response.Write(vbLf + vbTab + vbTab)

        For i = 3 To dtCamPed.Rows.Count - 1 'Ids usan las primeras 3 columnas
            If dtCamPed.Rows(i)("vcNombre").ToString() = "Empleado" Then
                context.Response.Write("<td colspan='2' style='background-color: #305496; color: #FFFFFF;'>")
            Else
                context.Response.Write("<td style='background-color: #305496; color: #FFFFFF;'> ")
            End If
            context.Response.Write(dtCamPed.Rows(i)("vcNombre").ToString())
            context.Response.Write("</td>")
        Next
        context.Response.Write(vbLf)
        context.Response.Write(vbTab + "</tr>")
        context.Response.Write(vbLf)

        For Each dr As DataRow In dtPedidos.Rows
            'Pedidos
            context.Response.Write(vbTab + "<tr>")
            context.Response.Write(vbLf + vbTab + vbTab)
            For i = 4 To dtPedidos.Columns.Count - 1
                If dtPedidos.Columns(i).ColumnName = "vcNomEmp" Then
                    context.Response.Write("<td colspan='2' style='background-color: #92D050; text-align:left;'>")
                ElseIf (dtPedidos.Columns(i).ColumnName = "MontoTotalNoServicios" OrElse dtPedidos.Columns(i).ColumnName = "MontoTotalServicios") Then
                    context.Response.Write("<td style='background-color: #92D050; text-align:right;'>")
                    inTotMonNoSer = i
                    'ElseIf (dtPedidos.Columns(i).ColumnName = "MontoTotalServicios") Then
                    '    context.Response.Write("<td style='background-color: #305496; text-align:right;'>")
                    '    inTotMonSer = i
                Else
                    context.Response.Write("<td style='background-color: #92D050;'>")
                End If
                context.Response.Write(dr(i).ToString().Trim())
                context.Response.Write("</td>")
            Next
            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)

            If (blnSeg) Then
                'Seguimiento de Pedidos
                Dim drFilas() As DataRow
                drFilas = dtPedSeg.Select("IdPedido = " & Convert.ToInt32(dr("IdPedido")))
                If drFilas.Length > 0 Then

                    'Cabecera
                    context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
                    context.Response.Write(vbLf + vbTab + vbTab)
                    context.Response.Write("<td style='background-color: #F4B084; border-bottom: none; font-weight:bolder; font-style:italic;'>  Seguimiento</td>")

                    For j = 3 To dtCamPedSeg.Rows.Count - 1 'Ids usan las primeras 3 columnas
                        If dtCamPedSeg.Rows(j)("vcNombre").ToString() = "Comentario" Then
                            context.Response.Write("<td colspan='2' style='background-color: #F4B084;'>")
                        Else
                            context.Response.Write("<td style='background-color: #F4B084;'>")
                        End If

                        context.Response.Write(dtCamPedSeg.Rows(j)("vcNombre").ToString())
                        context.Response.Write("</td>")
                    Next
                    For j = 0 To 3 'Dando background-color a celdas vacías
                        context.Response.Write("<td style='background-color: #FCE4D6; border: none;'></td>")
                    Next

                    context.Response.Write(vbLf)
                    context.Response.Write(vbTab + "</tr>")
                    context.Response.Write(vbLf)

                    'Detalles
                    For Each drPedSeg As DataRow In drFilas
                        context.Response.Write(vbTab + "<tr>")
                        context.Response.Write(vbLf + vbTab + vbTab)
                        context.Response.Write("<td style='background-color: #F4B084; border: none;'></td>")

                        For j = 3 To dtPedSeg.Columns.Count - 1
                            If dtCamPedSeg.Rows(j)("vcNombre").ToString() = "Comentario" Then
                                context.Response.Write("<td colspan='2' style='background-color: #FCE4D6;'>")
                            Else
                                context.Response.Write("<td style='background-color: #FCE4D6;'>")
                            End If

                            context.Response.Write(drPedSeg(j).ToString().Trim())
                            context.Response.Write("</td>")
                        Next
                        For j = 0 To 3 'Dando background-color a celdas vacías
                            context.Response.Write("<td style='background-color: #FCE4D6; border: none;'></td>")
                        Next
                        context.Response.Write(vbLf)
                        context.Response.Write(vbTab + "</tr>")
                        context.Response.Write(vbLf)
                    Next
                End If
            End If

            'Detalles
            Dim drFilas2() As DataRow
            drFilas2 = dtDetalles.Select("IdPedido = " & Convert.ToInt32(dr("IdPedido")))
            If drFilas2.Length > 0 Then

                'Cabecera
                context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
                context.Response.Write(vbLf + vbTab + vbTab)
                context.Response.Write("<td style='border-bottom: none; font-weight:bolder; font-style:italic; background-color: #C6E0B4;'>  Detalles</td>")
                For j = 2 To dtCamDet.Rows.Count - 1 'Ids usan las primeras 3 columnas
                    context.Response.Write("<td style='background-color: #9BC2E6;'>")
                    context.Response.Write(dtCamDet.Rows(j)("vcNombre").ToString())
                    context.Response.Write("</td>")
                Next
                context.Response.Write(vbLf)
                context.Response.Write(vbTab + "</tr>")
                context.Response.Write(vbLf)

                'Detalles
                For Each drDet As DataRow In drFilas2
                    context.Response.Write(vbTab + "<tr>")
                    context.Response.Write(vbLf + vbTab + vbTab)
                    context.Response.Write("<td style='border: none; background-color: #C6E0B4;'></td>")

                    For j = 2 To dtDetalles.Columns.Count - 1
                        If dtDetalles.Columns(j).ColumnName <> "NumeroItem" And dtDetalles.Columns(j).ColumnName <> "IdEstado" And dtDetalles.Columns(j).ColumnName <> "NombreEstado" _
                            And dtDetalles.Columns(j).ColumnName <> "Linea" And dtDetalles.Columns(j).ColumnName <> "DespachoIMEI" Then

                            If (dtDetalles.Columns(j).ColumnName = "MontoTotalNoServicios" Or dtDetalles.Columns(j).ColumnName = "MontoTotalServicios" Or _
                                dtDetalles.Columns(j).ColumnName = "MesesContrato") Then
                                context.Response.Write("<td style='text-align:right; background-color: #CCE2F4;'>") 'DDEBF7
                            Else
                                context.Response.Write("<td style='background-color: #CCE2F4;'>")
                            End If
                            context.Response.Write(drDet(j).ToString().Trim())
                            context.Response.Write("</td>")
                        End If
                    Next
                    context.Response.Write(vbLf)
                    context.Response.Write(vbTab + "</tr>")
                    context.Response.Write(vbLf)

                    If (blnSeg) Then
                        'Seguimiento de Detalles
                        Dim drFilas3() As DataRow
                        drFilas3 = dtDetSeg.Select("IdPedido = " & Convert.ToInt32(drDet("IdPedido")) & " AND IdDetallePedido = " & Convert.ToInt32(drDet("IdDetallePedido")))
                        If drFilas3.Length > 0 Then

                            'Cabecera
                            context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
                            context.Response.Write(vbLf + vbTab + vbTab)
                            context.Response.Write("<td style='background-color: #C6E0B4; border: none;'></td>") 'Primera Columna
                            context.Response.Write("<td style='background-color: #F4B084; border-bottom: none; font-weight:bolder; font-style:italic;'>  Seguimiento</td>") 'Segunda Columna
                            For j = 4 To dtCamDetSeg.Rows.Count - 1 'Ids usan las primeras 3 columnas
                                If dtCamDetSeg.Rows(j)("vcNombre").ToString() = "Comentario" Then
                                    context.Response.Write("<td colspan='2' style='background-color: #F4B084;'>")
                                Else
                                    context.Response.Write("<td style='background-color: #F4B084;'>")
                                End If

                                context.Response.Write(dtCamDetSeg.Rows(j)("vcNombre").ToString())
                                context.Response.Write("</td>")
                            Next
                            For j = 0 To 2 'Dando background-color a celdas vacías
                                context.Response.Write("<td style='background-color: #FCE4D6; border: none;'></td>")
                            Next
                            context.Response.Write(vbLf)
                            context.Response.Write(vbTab + "</tr>")
                            context.Response.Write(vbLf)

                            'Detalles
                            For Each drDetSeg As DataRow In drFilas3
                                context.Response.Write(vbTab + "<tr>")
                                context.Response.Write(vbLf + vbTab + vbTab)
                                context.Response.Write("<td style='background-color: #C6E0B4; border: none;'></td>") 'Primera Columna
                                context.Response.Write("<td style='background-color: #F4B084; border-bottom: none;border-top: none;'></td>") 'Segunda Columna

                                For j = 4 To dtDetSeg.Columns.Count - 1
                                    If dtDetSeg.Columns(j).ColumnName = "Comentario" Then
                                        context.Response.Write("<td colspan='2' style='background-color: #FCE4D6;'>")
                                    Else
                                        context.Response.Write("<td style='background-color: #FCE4D6;'>")
                                    End If

                                    context.Response.Write(drDetSeg(j).ToString().Trim())
                                    context.Response.Write("</td>")
                                Next
                                For j = 0 To 2 'Dando background-color a celdas vacías
                                    context.Response.Write("<td style='background-color: #FCE4D6; border: none;'></td>")
                                Next
                                context.Response.Write(vbLf)
                                context.Response.Write(vbTab + "</tr>")
                                context.Response.Write(vbLf)
                            Next
                        End If
                    End If
                Next
            End If
        Next

        'Fila de Totales
        context.Response.Write(vbTab + "<tr>")
        context.Response.Write(vbLf + vbTab + vbTab)
        context.Response.Write("<td colspan='9' style='background-color: #43CFEB; font-weight:bolder; text-align:center;'>COSTO TOTAL DE EQUIPO Y PLAN</td>")

        For i = 4 To dtPedidos.Columns.Count - 1
            If (dtPedidos.Columns(i).ColumnName = "MontoTotalNoServicios") Then
                context.Response.Write("<td style='background-color: #43CFEB; text-align:right; font-weight:bolder;'>")
                context.Response.Write(CalcularTotal("MontoTotalNoServicios", dtPedidos))
                context.Response.Write("</td>")
            ElseIf (dtPedidos.Columns(i).ColumnName = "MontoTotalServicios") Then
                context.Response.Write("<td style='background-color: #43CFEB; text-align:right; font-weight:bolder;'>")
                context.Response.Write(CalcularTotal("MontoTotalServicios", dtPedidos))
                context.Response.Write("</td>")
            End If
        Next

        context.Response.Write(vbLf)
        context.Response.Write(vbTab + "</tr>")
        context.Response.Write(vbLf)

        context.Response.Write("</table>")
        context.Response.End()
    End Sub

    Function ObtenerColumnas(ByVal dtDetalle As DataTable, ByVal vcTipo As String) As DataTable

        Dim dtCampos As New DataTable
        dtCampos.Columns.Add("vcNombre")

        Select Case (vcTipo)
            Case "Pedidos"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "IdCampana"
                            dtCampos.Rows.Add("IdCampana")
                        Case "IdEmpleado"
                            dtCampos.Rows.Add("IdEmpleado")
                        Case "NumeroPedido"
                            dtCampos.Rows.Add("Código de Pedido")
                        Case "vcNomEmp"
                            dtCampos.Rows.Add("Empleado")
                        Case "vcNomOrg"
                            dtCampos.Rows.Add("Área")
                        Case "vcOficina"
                            dtCampos.Rows.Add("Oficina")
                        Case "vcNomCCO"
                            dtCampos.Rows.Add("Centro de Costo")
                        Case "NumeroItems"
                            dtCampos.Rows.Add("Número de Ítems")
                        Case "FechaPedido"
                            dtCampos.Rows.Add("Fecha de Pedido")
                        Case "vcNomEst"
                            dtCampos.Rows.Add("Estado")
                        Case "MontoTotalNoServicios"
                            dtCampos.Rows.Add("Costo Total Equipo")
                        Case "MontoTotalServicios"
                            dtCampos.Rows.Add("Costo Total Plan")
                    End Select
                Next
            Case "Detalles"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdDetallePedido"
                            dtCampos.Rows.Add("IdDetallePedido")
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "Situacion"
                            dtCampos.Rows.Add("Situación")
                        Case "NomMod"
                            dtCampos.Rows.Add("Modelo")
                        Case "NomPlan"
                            dtCampos.Rows.Add("Plan")
                        Case "MontoTotalNoServicios"
                            dtCampos.Rows.Add("Costo Total Equipo")
                        Case "MontoTotalServicios"
                            dtCampos.Rows.Add("Costo Total Plan")
                        Case "vcCodCue"
                            dtCampos.Rows.Add("Código Cuenta")
                        Case "vcNomCue"
                            dtCampos.Rows.Add("Cuenta")
                        Case "MesesContrato"
                            dtCampos.Rows.Add("Meses de Contrato")
                        Case "DespachoLinea"
                            dtCampos.Rows.Add("Línea")
                        Case "Corte"
                            dtCampos.Rows.Add("Corte")
                    End Select
                Next
            Case "PedidosSeg"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "IdUsuario"
                            dtCampos.Rows.Add("IdUsuario")
                        Case "IdEstado"
                            dtCampos.Rows.Add("IdEstado")
                        Case "vcNomUsu"
                            dtCampos.Rows.Add("Usuario")
                        Case "vcNomEst"
                            dtCampos.Rows.Add("Estado")
                        Case "FechaInicio"
                            dtCampos.Rows.Add("Fecha Inicio")
                        Case "FechaFin"
                            dtCampos.Rows.Add("FechaFin")
                        Case "Comentario"
                            dtCampos.Rows.Add("Comentario")
                    End Select
                Next
            Case "DetallesSeg"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdDetallePedido"
                            dtCampos.Rows.Add("IdDetallePedido")
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "IdUsuario"
                            dtCampos.Rows.Add("IdUsuario")
                        Case "IdEstado"
                            dtCampos.Rows.Add("IdEstado")
                        Case "vcNomUsu"
                            dtCampos.Rows.Add("Usuario")
                        Case "vcNomEst"
                            dtCampos.Rows.Add("Estado")
                        Case "FechaInicio"
                            dtCampos.Rows.Add("Fecha Inicio")
                        Case "FechaFin"
                            dtCampos.Rows.Add("FechaFin")
                        Case "Comentario"
                            dtCampos.Rows.Add("Comentario")
                    End Select
                Next
        End Select

        Return dtCampos

    End Function

    Private Function CalcularTotal(ByVal vcNomCol As String, ByVal dtTabla As DataTable) As String
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim colTotal As DataColumn = New DataColumn("Tot_" + vcNomCol, GetType(System.Int32))
        colTotal.Expression = "Convert([" + vcNomCol + "], 'System.Decimal')"
        dtTabla.Columns.Add(colTotal)

        Dim strForNum = DevuelveFormatoNumero(oCultura)

        If IsDBNull(dtTabla.Compute("Sum(Tot_" + vcNomCol + ")", "")) Then
            Return Convert.ToDecimal(0).ToString(strForNum)
        Else
            Return Convert.ToDecimal(dtTabla.Compute("Sum(Tot_" + vcNomCol + ")", "")).ToString(strForNum)
        End If

    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarPedidos(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String _
                                       , ByVal inIdCampana As String, ByVal vcNomSit As String, ByVal vcFecIni As String, ByVal vcFecFin As String _
                                       , ByVal vcCodEmp As String, ByVal vcCodAre As String, ByVal vcCodCCO As String, ByVal vcCodCue As String _
                                       , ByVal vcIdEst As String, ByVal inIdOfiSel As String, ByVal codigoPedido As String) As JQGridJsonResponse
        Dim CampanaPedido As BL_MOV_CAM_CampanaPedido = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaPedido = New BL_MOV_CAM_CampanaPedido(oUsuario.IdCliente)

            Dim vcOrderBy = vcOrdCol + " " + vcTipOrdCol + " "

            vcFecIni = If(vcFecIni <> "", vcFecIni.Substring(6, 4) + vcFecIni.Substring(3, 2) + vcFecIni.Substring(0, 2) + " 00:00:00", "")
            vcFecFin = If(vcFecFin <> "", vcFecFin.Substring(6, 4) + vcFecFin.Substring(3, 2) + vcFecFin.Substring(0, 2) + " 23:59:59", "")
            vcCodEmp = If(vcCodEmp = "", "0", vcCodEmp)
            vcCodAre = If(vcCodAre = "", "0", vcCodAre)

            Dim vcHayCue As String = "0"
            If vcCodCue = "-1" Then
                vcCodCue = "''"
            Else
                vcCodCue = vcCodCue.Replace("-1,", "").Replace(vbLf, "").Replace(",", "','")
                vcHayCue = "1"
            End If
            Dim vcHayEst As String = "0"
            If vcIdEst = "-1" Then
                vcIdEst = ""
            Else
                vcIdEst = vcIdEst.Replace("-1,", "").Replace(vbLf, "")
                vcHayEst = "1"
            End If

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Dim dsDetalle As DataSet = CampanaPedido.ListarPedidos(inPagTam, inPagAct, vcOrderBy, Integer.Parse(inIdCampana), vcNomSit, vcFecIni, vcFecFin, _
                                                                      vcCodEmp, Convert.ToInt32(vcCodAre), vcCodCCO, vcCodCue, vcHayCue, vcIdEst, vcHayEst, _
                                                                      Convert.ToInt32("0" + inIdOfiSel), oCultura, codigoPedido)

            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim inLen = dsDetalle.Tables(1).Rows.Count
            For i As Integer = 0 To inLen - 1
                dsDetalle.Tables(1).Rows(i)("MontoTotalServicios") = DevuelveNumeroFormateado(dsDetalle.Tables(1).Rows(i)("MontoTotalServicios"), strForNum)
                dsDetalle.Tables(1).Rows(i)("MontoTotalNoServicios") = DevuelveNumeroFormateado(dsDetalle.Tables(1).Rows(i)("MontoTotalNoServicios"), strForNum)
            Next

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedido IsNot Nothing Then
                CampanaPedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCantidadPedidos(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String _
                                       , ByVal inIdCampana As String, ByVal vcNomSit As String, ByVal vcFecIni As String, ByVal vcFecFin As String _
                                       , ByVal vcCodEmp As String, ByVal vcCodAre As String, ByVal vcCodCCO As String, ByVal vcCodCue As String _
                                       , ByVal vcIdEst As String, ByVal inIdOfiSel As String, ByVal codigoPedido As String) As String
        Dim CampanaPedido As BL_MOV_CAM_CampanaPedido = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaPedido = New BL_MOV_CAM_CampanaPedido(oUsuario.IdCliente)

            Dim vcOrderBy = vcOrdCol + " " + vcTipOrdCol + " "
            vcFecIni = If(vcFecIni <> "", vcFecIni.Substring(6, 4) + vcFecIni.Substring(3, 2) + vcFecIni.Substring(0, 2) + " 00:00:00", "")
            vcFecFin = If(vcFecFin <> "", vcFecFin.Substring(6, 4) + vcFecFin.Substring(3, 2) + vcFecFin.Substring(0, 2) + " 23:59:59", "")
            vcCodEmp = If(vcCodEmp = "", "0", vcCodEmp)
            vcCodAre = If(vcCodAre = "", "0", vcCodAre)

            Dim vcHayCue As String = "0"
            If vcCodCue = "-1" Then
                vcCodCue = "''"
            Else
                vcCodCue = vcCodCue.Replace("-1,", "").Replace(vbLf, "").Replace(",", "','")
                vcHayCue = "1"
            End If
            Dim vcHayEst As String = "0"
            If vcIdEst = "-1" Then
                vcIdEst = ""
            Else
                If vcIdEst.Contains("-1,") Then vcIdEst = vcIdEst.Substring(3).Replace(vbLf, "")
                vcHayEst = "1"
            End If

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Dim dsDetalle As DataSet = CampanaPedido.ListarPedidos(inPagTam, inPagAct, vcOrderBy, Integer.Parse(inIdCampana), vcNomSit, vcFecIni, vcFecFin, _
                                                                      vcCodEmp, Convert.ToInt32(vcCodAre), vcCodCCO, vcCodCue, vcHayCue, vcIdEst, vcHayEst,
                                                                      Convert.ToInt32("0" + inIdOfiSel), oCultura, codigoPedido)
            Return dsDetalle.Tables(1).Rows.Count.ToString()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedido IsNot Nothing Then
                CampanaPedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPedidoDetalles(ByVal inIdPedido As String, ByVal vcNomSit As String) As List(Of Object)
        Dim CampanaPedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = Nothing
        Try
            CampanaPedidoDetalle = New BL_MOV_CAM_CampanaPedidoDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dtDetalles As DataTable = (CampanaPedidoDetalle.ListarPedidoDetalles(Integer.Parse(inIdPedido), vcNomSit, False, oCultura, True, "")).Tables(0)
            Dim lstObj As New List(Of Object)

            For i As Integer = 0 To dtDetalles.Rows.Count - 1
                'DespachoLinea,DespachoIMEI
                Dim dict As New Dictionary(Of String, Object)
                dict.Add("IdDetallePedido", dtDetalles.Rows(i)("IdDetallePedido").ToString())
                dict.Add("IdPedido", dtDetalles.Rows(i)("IdPedido").ToString())
                dict.Add("NomMod", dtDetalles.Rows(i)("NomMod").ToString())
                dict.Add("DespachoIMEI", dtDetalles.Rows(i)("DespachoIMEI").ToString())
                dict.Add("DespachoLinea", dtDetalles.Rows(i)("DespachoLinea").ToString())
                dict.Add("NomPlan", dtDetalles.Rows(i)("NomPlan").ToString())
                dict.Add("MontoTotalNoServicios", dtDetalles.Rows(i)("MontoTotalNoServicios").ToString())
                dict.Add("MontoTotalServicios", dtDetalles.Rows(i)("MontoTotalServicios").ToString())
                dict.Add("vcCodCue", dtDetalles.Rows(i)("vcCodCue").ToString())
                dict.Add("vcNomCue", dtDetalles.Rows(i)("vcNomCue").ToString())
                dict.Add("MesesContrato", dtDetalles.Rows(i)("MesesContrato").ToString())
                dict.Add("IdEstado", dtDetalles.Rows(i)("IdEstado").ToString())
                dict.Add("NombreEstado", dtDetalles.Rows(i)("NombreEstado").ToString())
                dict.Add("Corte", dtDetalles.Rows(i)("Corte").ToString())
                lstObj.Add(dict)
            Next
            Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedidoDetalle IsNot Nothing Then
                CampanaPedidoDetalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function QuitarPedidos(ByVal vcIdPedidos As String, ByVal vcComentarios As String) As String
        Dim Pedido As BL_MOV_CAM_Pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim Notificacion As BL_MOV_SolicitudNotificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Cola As BL_MOV_Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oEmpleado As New ENT_GEN_EmpleadoG
        Try


            Dim pedidosCancelados As DataSet = Pedido.CancelarPedidos(vcIdPedidos, vcComentarios)
            Dim contTables As Integer = pedidosCancelados.Tables.Count
            Dim TotalTables As Integer = contTables - 1
            Dim Resultado As String = pedidosCancelados.Tables(TotalTables).Rows(0)("PedidosNoBaja").ToString()
            Dim TipoServicio As ENT_MOV_SolicitudTipo = Cola.MostrarTipoSolicitud(33, 0)
            'If pedidosCancelados.Tables(0).Columns.Contains("PedidosNoBaja") Then
            '    Return pedidosCancelados.Tables(0).Rows(0)("PedidosNoBaja").ToString()
            'End If

            If TotalTables > 0 Then
                For i As Integer = 0 To TotalTables - 1
                    Dim strForNum = DevuelveFormatoNumero(oCultura)
                    Dim tblDetalleItems As String = ""
                    Dim cont As Integer = 0
                    'tblDetalleItems += "<center><table style='width: 90%; border: 2px solid white'><tr>"
                    tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
                    tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td><td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td><td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Mensual</b></td><td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td></tr>"
                    Dim tieneDetalle As Boolean = False
                    Dim prIdEmpleado As String = pedidosCancelados.Tables(i).Rows(0)("IdEmpleado").ToString()
                    For ini As Integer = 0 To pedidosCancelados.Tables(i).Rows.Count - 1
                        tieneDetalle = True
                        cont += 1
                        tblDetalleItems += "<tr>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>" '& pedidosCancelados.Tables(0).Rows(ini)("NumeroItem") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & IIf(pedidosCancelados.Tables(i).Rows(ini)("Equipo").ToString = "", "SIN EQUIPO", pedidosCancelados.Tables(i).Rows(ini)("Equipo")) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosCancelados.Tables(i).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosCancelados.Tables(i).Rows(ini)("Plan") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosCancelados.Tables(i).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosCancelados.Tables(i).Rows(ini)("Numero") & "</td>"
                        tblDetalleItems += "</tr>"
                    Next
                    If tieneDetalle Then
                        tblDetalleItems += "</table></center>"
                        'Insertar Registro de Cola de Correo
                        Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                        'Dim m_objCorreo As New CCorreo

                        oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)
                        'datos del cuerpo del correo
                        Dim textoplantilla As String = TraeCuerpoCorreo(HttpContext.Current.Server.MapPath(TipoServicio.vcRutaPlan))
                        Dim destinatario As String = ""
                        Dim codigo As String = prIdEmpleado
                        Dim nombre As String = oEmpleado.vcNomEmp
                        Dim NumeroPedido As String = pedidosCancelados.Tables(0).Rows(0)("codigopedido").ToString()
                        Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom
                        Dim Area As String = oEmpleado.vcNomOrg
                        Dim CentroCosto As String = oEmpleado.vcNomCco
                        Dim FechaHora As String = Date.Now.ToString()
                        Dim cuerpocorreo As String = String.Format(textoplantilla, codigo, nombre, tblDetalleItems, NumeroPedido, FechaHora)
                        'llenado de datos de cola de correos
                        Dim oCola As New ENT_MOV_Cola
                        oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                        oCola.vcAsunto = TipoServicio.vcCorTitulo
                        oCola.vcDescripcion = cuerpocorreo
                        oCola.vcMailTo = oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
                        oCola.vcMailFrom = ""

                        Dim codigocola As String = Cola.Insertar(oCola)
                    End If
                Next
            End If

            'If pedidosCancelados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("equipos adquiridos") Then
            'End If
            'Next

            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            If Pedido IsNot Nothing Then
                Pedido.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCampanaPorOperador(ByVal IdOperador As String) As List(Of MOV_CAM_Campana)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Campana.ListarPorOperador(Convert.ToInt32(IdOperador))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarOficina(ByVal inIdPedido As String, ByVal inIdOficina As String) As String
        Dim CampanaPedido As BL_MOV_CAM_CampanaPedido = Nothing
        Try
            CampanaPedido = New BL_MOV_CAM_CampanaPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            CampanaPedido.ActualizarOficina(Convert.ToInt32(inIdPedido), Convert.ToInt32(inIdOficina))

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedido IsNot Nothing Then
                CampanaPedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DeshacerDespacho(ByVal IdPedido As String, ByVal IdDetallePedido As Integer, _
                                            ByVal IdCampana As Integer, ByVal vcComentario As String) As Integer
        Dim CampanaPedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = Nothing
        Dim Resultado As Integer = 0
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaPedidoDetalle = New BL_MOV_CAM_CampanaPedidoDetalle(oUsuario.IdCliente)
            Resultado = CampanaPedidoDetalle.DeshacerDespacho(IdPedido, IdDetallePedido, IdCampana, oUsuario.P_inCod, vcComentario)

            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedidoDetalle IsNot Nothing Then
                CampanaPedidoDetalle.Dispose()
            End If
        End Try
    End Function
End Class