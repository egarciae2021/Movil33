Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports UtilitarioWeb
Imports System.Web.Script.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Campana.BE
Imports VisualSoft.Suite80.BE

Partial Class P_Movil_Administrar_CAM_Cortes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If Not IsPostBack Then
                If (Not IsNothing(Request.QueryString("IdCorte"))) Then
                    ExportarExcel(Convert.ToInt32(Request.QueryString("IdCorte")), Convert.ToBoolean(Request.QueryString("RenovacionConEquipo")))
                End If

                hdfvcTab.Value = Request.QueryString("vcTab")

                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Todos>"), "vcNomOpe", "P_inCodOpe")
                UtilitarioWeb.Dataddl(ddlCampana, Campana.Listar(-1, "<Todos>"), "Descripcion", "IdCampana")
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
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
        End Try
    End Sub

    Private Sub ExportarExcel(ByVal inIdCorte As Integer, ByVal RenovacionConEquipo As Boolean)
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing

        Try
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = CampanaCorte.ListarDetallesParaReporte(inIdCorte, RenovacionConEquipo)

            ExportDataTableToExcel(dsDetalle.Tables(0), dsDetalle.Tables(1))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try
    End Sub

    Public Sub ExportDataTableToExcel(ByVal dtDetalle As DataTable, ByVal dtCampos As DataTable)
        Dim attachment As String = "attachment; filename=" & "Detalle de Corte" & ".xls"

        Dim context As HttpContext = HttpContext.Current

        context.Response.ClearContent()
        context.Response.AddHeader("content-disposition", attachment)
        context.Response.ContentType = "application/vnd.ms-excel"

        Dim tab As String = ""

        context.Response.ContentEncoding = Encoding.Default
        context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Detalle de Corte" + "' style='border-collapse:collapse;'>")
        context.Response.Write(vbLf)

        context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
        context.Response.Write(vbLf + vbTab + vbTab)

        For i = 0 To dtCampos.Rows.Count - 1
            context.Response.Write("<td style='background-color: #66CCFF;'>")
            context.Response.Write(dtCampos.Rows(i)("vcNombre").ToString())
            context.Response.Write("</td>")
        Next
        context.Response.Write(vbLf)
        context.Response.Write(vbTab + "</tr>")
        context.Response.Write(vbLf)

        For Each dr As DataRow In dtDetalle.Rows
            context.Response.Write(vbTab + "<tr>")
            context.Response.Write(vbLf + vbTab + vbTab)
            For i = 0 To dtDetalle.Columns.Count - 1
                context.Response.Write("<td>")
                context.Response.Write(dr(i).ToString().Trim())
                context.Response.Write("</td>")
            Next
            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)
        Next

        context.Response.Write("</table>")
        context.Response.End()
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, _
                                  ByVal inIdCampana As String, ByVal inIdOperador As String) As JQGridJsonResponse
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing

        Try

            If vcOrdCol = "vcNomCam" Then vcOrdCol = "CA.Descripcion"
            If vcOrdCol = "NumeroItem" Then vcOrdCol = "CC.NumeroItem"
            If vcOrdCol = "Fecha" Then vcOrdCol = "CC.Fecha"
            If vcOrdCol = "NumeroPedidos" Then vcOrdCol = "CC.NumeroPedidos"
            If vcOrdCol = "Situacion" Then vcOrdCol = "CC.Situacion"
            If vcOrdCol = "EnvioCorreoUsuario" Then vcOrdCol = "CC.EnvioCorreoUsuario"
            If vcOrdCol = "Estado" Then vcOrdCol = "E.vcNom"
            If vcOrdCol = "Cancelable" Then vcOrdCol = "CC.IdEstado"

            CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = CampanaCorte.ListarPorCampanaPorOperador(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, _
                                                                                Convert.ToInt32(inIdCampana), Convert.ToInt32(inIdOperador))

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim inLen = dsDetalle.Tables(1).Rows.Count
            For i As Integer = 0 To inLen - 1
                dsDetalle.Tables(1).Rows(i)("Fecha") = DevuelveFechaHoraFormateada(dsDetalle.Tables(1).Rows(i)("Fecha").ToString(), oCultura.vcFecCor)
            Next

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 3)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function EnviarCorreoUsuario(ByVal IdCorte As Integer) As String
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
        Dim Cola As BL_MOV_Cola = Nothing

        Try
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor + " " + oCultura.vcHorCor

            Dim pedidosEnCorte As MOV_CAM_CampanaCorte = CampanaCorte.Mostrar(IdCorte, strForNum, strForFec)
            Dim lstPedido As New List(Of MOV_CAM_CampanaPedido)
            Dim Empleados = (From c In pedidosEnCorte.MOV_CAM_CampanaCorteDetallePers
                             Select c.vcCodEmp).Distinct().ToList()

            For s = 0 To Empleados.Count - 1
                Dim oPedido As New MOV_CAM_CampanaPedido
                oPedido.IdEmpleado = Empleados.ElementAt(s)

                Dim Pedidos = (From t In pedidosEnCorte.MOV_CAM_CampanaCorteDetallePers
                               Where t.vcCodEmp = oPedido.IdEmpleado
                               Select t.IdDetallePedido, t.CodigoPedido, t.IdPedido, t.FechaPedido, t.NomMod, t.NomPlan, t.MontoTotalNoServicios, t.MontoTotalServicios, t.MesesContrato, t.Linea).ToList()

                For i = 0 To Pedidos.Count - 1
                    Dim oPedidoDetalle As New MOV_CAM_CampanaPedidoDetalle

                    oPedidoDetalle.IdDetallePedido = Pedidos.ElementAt(i).IdDetallePedido
                    oPedidoDetalle.NumeroPedido = Pedidos.ElementAt(i).CodigoPedido
                    oPedidoDetalle.IdPedido = Pedidos.ElementAt(i).IdPedido
                    oPedidoDetalle.FechaPedido = Pedidos.ElementAt(i).FechaPedido
                    oPedidoDetalle.Linea = Pedidos.ElementAt(i).Linea
                    oPedidoDetalle.ModeloDispositivo = Pedidos.ElementAt(i).NomMod
                    oPedidoDetalle.Plan = Pedidos.ElementAt(i).NomPlan
                    oPedidoDetalle.MontoTotalNoServicios = Pedidos.ElementAt(i).MontoTotalNoServicios
                    oPedidoDetalle.MontoTotalServicios = Pedidos.ElementAt(i).MontoTotalServicios
                    oPedidoDetalle.MesesContrato = Pedidos.ElementAt(i).MesesContrato

                    oPedido.MOV_CAM_CampanaPedidoDetalle.Add(oPedidoDetalle)
                Next
                lstPedido.Add(oPedido)
            Next

            CampanaCorte.EnvioCorreoUsuario(IdCorte)

            For Each oPedido In lstPedido
                Dim tblDetalleItems As String = ""
                Dim cont As Integer = 0
                tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
                tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td><td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Pedido</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td><td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td><td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Mensual</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td></tr>"
                Dim tieneDetalle As Boolean = False
                For Each oPedidoDetalle In oPedido.MOV_CAM_CampanaPedidoDetalle
                    tieneDetalle = True
                    cont += 1
                    tblDetalleItems += "<tr>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & oPedidoDetalle.NumeroPedido & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & oPedidoDetalle.ModeloDispositivo & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & oPedidoDetalle.MontoTotalNoServicios.ToString() & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & oPedidoDetalle.Plan & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & oPedidoDetalle.MontoTotalServicios.ToString() & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & oPedidoDetalle.Linea & "</td>"
                    tblDetalleItems += "</tr>"
                Next

                tblDetalleItems += "</table></center>"

                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                'Insertar Registro de Cola de Correo
                Dim Notificacion As BL_MOV_SolicitudNotificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                Notificacion.Dispose()
                Dim oEmpleado As New ENT_GEN_EmpleadoG
                oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, oPedido.IdEmpleado)
                'mostrar datos por tipo de solicitud

                Dim Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("CorteCorreoUsuario")
                Parametros.Dispose()

                'datos del cuerpo del correo
                Dim textoplantilla As String = UtilitarioWeb.TraeCuerpoCorreo(HttpContext.Current.Server.MapPath(lstParametros(0).Valor))
                Dim destinatario As String = ""
                Dim codigo As String = oPedido.IdEmpleado
                Dim nombre As String = oEmpleado.vcNomEmp
                Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom
                Dim Area As String = oEmpleado.vcNomOrg
                Dim CentroCosto As String = oEmpleado.vcNomCco
                Dim FechaHora As String = Date.Now.ToString()
                Dim cuerpocorreo As String = String.Format(textoplantilla, codigo, nombre, tblDetalleItems, FechaHora)
                'llenado de datos de cola de correos
                Dim oCola As New ENT_MOV_Cola
                oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                oCola.vcAsunto = lstParametros(1).Valor
                oCola.vcDescripcion = cuerpocorreo
                oCola.vcMailTo = oEmpleado.vcCorPer.Trim()
                oCola.vcMailFrom = ""

                'insertar cola
                Cola.Insertar(oCola)
                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Next

            Return ""

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Sub Cancelar(ByVal IdCorte As Integer)
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
        Try
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaCorte.Cancelar(IdCorte, oUsuario.P_inCod, oUsuario.vcUsu)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Sub AbrirReporte(ByVal IdCorte As Integer, ByVal RenovacionConEquipo As Boolean)
        'Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
        Try
            'CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            HttpContext.Current.Session("IdCorte_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod) = IdCorte
            HttpContext.Current.Session("RenovacionConEquipo_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod) = RenovacionConEquipo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub eegReporte_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegReporte.ObtenerDatosAExportar
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(oUsuario.IdCliente)

            Dim IdCorte As Integer = CType(HttpContext.Current.Session("IdCorte_" & oUsuario.P_inCod), Integer)
            Dim RenovacionConEquipo As Boolean = CType(HttpContext.Current.Session("RenovacionConEquipo_" & oUsuario.P_inCod), Boolean)

            Dim dsDetalle As DataSet = CampanaCorte.ListarDetallesParaReporte(IdCorte, RenovacionConEquipo)
            Dim lstCampo As New List(Of ENT_ENT_Campo)

            'ExportDataTableToExcel(dsDetalle.Tables(0), dsDetalle.Tables(1))

            For i As Integer = 0 To dsDetalle.Tables(1).Rows.Count - 1
                Dim oCampo As New ENT_ENT_Campo
                oCampo.vcNomAlias = dsDetalle.Tables(0).Columns(i).ColumnName
                oCampo.vcDes = dsDetalle.Tables(1).Rows(i)("vcNombre").ToString()
                oCampo.btVis = True
                lstCampo.Add(oCampo)
                'actualizar nombres de columna
                dsDetalle.Tables(0).Columns(i).ColumnName = dsDetalle.Tables(1).Rows(i)("vcNombre").ToString()
            Next

            eegReporte.ExportarDatos(dsDetalle.Tables(0), "Cortes", lstCampo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try

    End Sub
End Class
