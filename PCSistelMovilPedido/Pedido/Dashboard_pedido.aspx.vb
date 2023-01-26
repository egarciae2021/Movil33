Imports VisualSoft.PCSistelMovil.Campana.BL
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports WebSiteCliente.VisualSoft.Common.Logging
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.IO

Public Class Dashboard_pedido
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oBlEmpleado As BL_GEN_Empleado
        Dim linea As BL_MOV_Linea
        'Dim oBlDashboardPedido As BL_MOV_CAM_DashboardPedido
        'Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim blRestriccion As BL_MOV_CAM_RestriccionCompra = Nothing

        Try
            'Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            'Dim viIdTecnico As Integer = -1
            'If IsNothing(oUsuario) Then
            '    Dim script As String = "window.parent.location.reload()"
            '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            'Else
            
            Dim strNombreServidor As String = System.Net.Dns.GetHostName
            lblServidor.Text = "(" & strNombreServidor & ")"

            hdfGlosaCreditoEquipo.Value = ConfigurationManager.AppSettings("GlosaCreditoEquipo")
            hdfGlosaCreditoServicio.Value = ConfigurationManager.AppSettings("GlosaCreditoServicio")

            If IsNothing(Session("Usuario")) Then
                'Try
                '    Response.Redirect("~\FinSession.aspx")
                'Catch
                'End Try
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                Exit Sub
            End If

            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral = CType(Session("Configuracion"), ENT_CFG_ConfiguracionGeneral)

            'Campana = New BL_MOV_CAM_Campana(0)
            'Dim oCampanaConf As ENT_MOV_CAM_CampanaConf = Campana.obtenerCampanaActivaConf(0)
            'If oCampanaConf IsNot Nothing Then
            '    hdfCampanaActiva.Value = oCampanaConf.IdCampana
            'Else
            '    hdfCampanaActiva.Value = "0"
            'End If
            hdfCampanaActiva.Value = "0"

            lblMsjMantenerPlan.Text = oConfiguracion.MsjMantenerPlan
            lblMsjCambiarPlan.Text = oConfiguracion.MsjCambiarPlan
            'lblMsjMantenerPlan.Text = ConfigurationManager.AppSettings("MsjMantenerPlan").ToString()
            'lblMsjCambiarPlan.Text = ConfigurationManager.AppSettings("MsjCambiarPlan").ToString()

            hfUsuario.Value = oUsuario.vcUsu

            'mostrar renovación plan
            'If oCampanaConf.RenovarPlan Then
            '    btnRenovarPlan.Style("display") = ""
            'End If

            If Not IsPostBack Then
                If IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Common/Images/Usuarios/" + oUsuario.Empleado.P_vcCod + ".jpg")) = False Then
                    imgUser.Src = "../Common/Images/user.png"
                Else
                    imgUser.Src = "../Common/Images/Usuarios/" & oUsuario.Empleado.P_vcCod & ".jpg"
                End If
                'Obtiene Datos Empleado....
                If oUsuario.Empleado.P_vcCod IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then

                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod

                    oBlEmpleado = New BL_GEN_Empleado(oUsuario.IdCliente)
                    Dim oEmpleado As ENT_GEN_Empleado = oBlEmpleado.Mostrar(oUsuario.Empleado.P_vcCod)
                    If oEmpleado IsNot Nothing AndAlso oEmpleado.P_vcCod <> "" Then
                        lblNombreEmpleado.Text = ReemplazarTilder(oEmpleado.vcNom) & "<br>(" & oUsuario.Empleado.P_vcCod & " - " & oUsuario.Empleado.Correo & ")"
                        lblArea.Text = ReemplazarTilder(oEmpleado.Area.vcNomOrg)
                        lblCentroCosto.Text = ReemplazarTilder(oEmpleado.CentroCosto.P_vcCodCenCos + " - " + oEmpleado.CentroCosto.vcNomCenCos)
                        lblCantidadLineas.Text = oEmpleado.TotalLineas


                        lblNombre1.Text = oEmpleado.vcNom
                        lblCorreo1.Text = oUsuario.Empleado.Correo
                    End If
                End If

                'Dim campana As BL_MOV_CAM_Campana = BL_MOV_CAM_Campana.Instance(0)
                'Dim entCampana As MOV_CAM_Campana = campana.obtenerCampanaActiva(0)

                linea = New BL_MOV_Linea(oUsuario.IdCliente)
                Dim lista As List(Of String) = linea.ListarByEmpleadoFamily(oUsuario.Empleado.P_vcCod)

                blRestriccion = New BL_MOV_CAM_RestriccionCompra(oUsuario.IdCliente)
                Dim inRestriccion As Integer = blRestriccion.ObtenerxEmpleado(oUsuario.Empleado.P_vcCod)
                If inRestriccion > 0 Then
                    pBotonesPedido.Visible = False
                End If
                Dim js As New JavaScriptSerializer()
                Dim script As String = "var LineasUsuario = " + js.Serialize(lista) + "; "
                script = script + "var bRestringir = " + IIf(inRestriccion > 0, "true", "false") + ";"

                'oBlDashboardPedido = New BL_MOV_CAM_DashboardPedido(oUsuario.IdCliente)
                'Dim CreditoUsuario As ENT_MOV_CAM_DashboardPedido = oBlDashboardPedido.mostrarProductoCreditoAsignado(oUsuario.Empleado.P_vcCod, oUsuario.IdCampana)
                'script = script + "var CreditoUsuario = " + js.Serialize(CreditoUsuario) + "; "


                'Muestra el link de portabilidad a claro
                If ConfigurationManager.AppSettings("PortabilidadClaro") IsNot Nothing Then
                    If ConfigurationManager.AppSettings("PortabilidadClaro").ToString() = "1" Then
                        hdfPortabilidadClaro.Value = "1"
                    End If
                End If


                hdfFecServidor.Value = Utilitario.ObtieneFechaHoraANSIServidor(False)
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

            End If

            'End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally

            If oBlEmpleado IsNot Nothing Then
                oBlEmpleado.Dispose()
            End If

            If linea IsNot Nothing Then
                linea.Dispose()
            End If

            If blRestriccion IsNot Nothing Then
                blRestriccion.Dispose()
            End If

        End Try
    End Sub

    Private Function ReemplazarTilder(ByVal strValor As String) As String
        strValor = strValor.Replace("Á", "A")
        strValor = strValor.Replace("É", "E")
        strValor = strValor.Replace("Í", "I")
        strValor = strValor.Replace("Ó", "O")
        strValor = strValor.Replace("Ú", "U")
        strValor = strValor.Replace("á", "a")
        strValor = strValor.Replace("é", "e")
        strValor = strValor.Replace("í", "i")
        strValor = strValor.Replace("ó", "o")
        strValor = strValor.Replace("ú", "u")

        Return strValor
    End Function

    <WebMethod()>
    Public Shared Function mostrarProductoCreditoAsignado(ByVal prIdEmpleado As String) As ENT_MOV_CAM_DashboardPedido
        Dim dash As BL_MOV_CAM_DashboardPedido = Nothing
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            dash = New BL_MOV_CAM_DashboardPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return dash.mostrarProductoCreditoAsignado(prIdEmpleado, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCampana)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If dash IsNot Nothing Then
                dash.Dispose()
            End If
        End Try

    End Function

    <WebMethod()>
    Public Shared Function validaListaNegra(ByVal prIdEmpleado As String) As String
        Dim dash As BL_MOV_CAM_CampanaCreditoListaNegra
        Try
            dash = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return IIf(dash.ExisteEmpleadoEnListaNegra(prIdEmpleado) = True, "1", "0")
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If dash IsNot Nothing Then
                dash.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function getFechaCampana() As String
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(0)
            Dim oCampanaConf As ENT_MOV_CAM_CampanaConf = Campana.obtenerCampanaActivaConf(0)
            Dim _return As String = ""

            If oCampanaConf IsNot Nothing Then
                _return = oCampanaConf.FechaInicio.ToString("dd/MM/yyyy HH:mm:ss")
                _return &= "," & oCampanaConf.FechaFin.ToString("dd/MM/yyyy HH:mm:ss")
                _return &= "," & Now.ToString("dd/MM/yyyy HH:mm:ss")
            End If

            'dash = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim IdCampana As String = ConfigurationManager.AppSettings("IdCampana")

            'Dim _return As String
            '_return = dash.MostrarCampanaMantenimiento(IdCampana).FechaInicio.ToString("dd/MM/yyyy HH:mm:ss")
            '_return &= "," & dash.MostrarCampanaMantenimiento(IdCampana).FechaFin.ToString("dd/MM/yyyy HH:mm:ss")
            '_return &= "," & Now.ToString("dd/MM/yyyy HH:mm:ss")

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            'If dash IsNot Nothing Then dash.Dispose() 
            If Campana IsNot Nothing Then Campana.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerTicketNoLeidoPorUsuario() As List(Of ENT_INC_Ticket)
        Dim oBlTicket As BL_INC_Ticket = Nothing
        Try

            'Obtiene Total Tickets no Leidos..
            'Return BL_INC_Ticket.Instance.obtenerTicketNoLeidoPorUsuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
            If HttpContext.Current.Session("Usuario") IsNot Nothing Then
                oBlTicket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Return oBlTicket.obtenerTicketNoLeidoPorUsuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
            Else
                Return New List(Of ENT_INC_Ticket)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If oBlTicket IsNot Nothing Then
                oBlTicket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarByEmpleadoFamily(ByVal prIdEmpleado As String) As List(Of String)
        Dim linea As BL_MOV_Linea = Nothing
        Try
            'Obtiene Total Tickets no Leidos..
            linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return linea.ListarByEmpleadoFamily(prIdEmpleado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If linea IsNot Nothing Then
                linea.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarBajaRenovar(ByVal prIdEmpleado As String, ByVal pIdCampana As Int32, ByVal pAccion As String, ByVal pXmlNumero As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim oBlEmpleadoG As BL_GEN_EmpleadoG = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Try
            Dim dsPedidos As New DataSet
            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("Metodo - registrarBajaRenovar, {prIdEmpleado: " & prIdEmpleado & "},{pIdCampana: " & pIdCampana.ToString & "},{pAccion: " & pAccion & "},{pXmlNumero: " & pXmlNumero & "}")

            dsPedidos = pedido.registrarBajaRenovar(prIdEmpleado, pIdCampana, pAccion, pXmlNumero)

            If dsPedidos.Tables(0).Columns.Count = 1 Then
                Return dsPedidos.Tables(0).Rows(0)(0).ToString
            End If


            If dsPedidos.Tables(0).Rows.Count > 0 Then

                Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                Dim strForNum = Utilitario.DevuelveFormatoNumero(oCultura)

                Dim tblDetalleItems As String = ""
                tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
                tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td><td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td><td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Precio</b></td><td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Precio</b></td></tr>"
                For ini As Integer = 0 To dsPedidos.Tables(0).Rows.Count - 1
                    tblDetalleItems += "<tr>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & dsPedidos.Tables(0).Rows(ini)("Item") + 1 & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & dsPedidos.Tables(0).Rows(ini)("Numero") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & dsPedidos.Tables(0).Rows(ini)("Equipo") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(dsPedidos.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & dsPedidos.Tables(0).Rows(ini)("Plan") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(dsPedidos.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                    tblDetalleItems += "</tr>"
                Next
                tblDetalleItems += "</table></center>"

                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                'Insertar Registro de Cola de Correo
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)

                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As ENT_GEN_EmpleadoG
                oBlEmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                oEmpleado = oBlEmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)

                'mostrar datos por tipo de solicitud
                'Dim Modelo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoServicio As ENT_MOV_SolicitudTipo
                If pAccion = "Baja" Then
                    TipoServicio = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.Baja, oEmpleado.inCodOpe)
                End If
                If pAccion = "Renovacion" Then
                    TipoServicio = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.RenovarLinea, oEmpleado.inCodOpe)
                End If

                'datos del cuerpo del correo
                Dim textoplantilla As String = Utilitario.TraeCuerpoCorreo(HttpContext.Current.Server.MapPath(TipoServicio.vcRutaPlan))
                Dim destinatario As String = ""
                Dim codigo As String = prIdEmpleado
                Dim nombre As String = oEmpleado.vcNomEmp
                Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom
                Dim Area As String = oEmpleado.vcNomOrg
                Dim CentroCosto As String = oEmpleado.vcNomCco
                Dim FechaHora As String = Date.Now.ToString()
                Dim cuerpocorreo As String = String.Format(textoplantilla, codigo, nombre, tblDetalleItems, dsPedidos.Tables(0).Rows(0)("codigoPedido").ToString(), FechaHora)
                'llenado de datos de cola de correos
                Dim oCola As New ENT_MOV_Cola
                oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                oCola.vcAsunto = TipoServicio.vcCorTitulo
                oCola.vcDescripcion = cuerpocorreo
                oCola.vcMailTo = oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
                oCola.vcMailFrom = ""
                'insertar cola

                Auditoria.InsertarAuditoria("Metodo - Inserta Cola de Correo", oCola)

                Dim codigocola As String = Cola.Insertar(oCola)
                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            End If
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
            If Notificacion IsNot Nothing Then
                Notificacion.Dispose()
            End If
            If oBlEmpleadoG IsNot Nothing Then
                oBlEmpleadoG.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If

        End Try
    End Function

    <WebMethod()>
    Public Shared Function getContrato(ByVal prIdPedido As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try
            'Dim pedido As BL_MOV_CAM_Pedido = BL_MOV_CAM_Pedido.Instance(0)
            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim servidor As Page = New Page()
            Dim strRuta = pedido.getRutaContrato(Convert.ToInt64(prIdPedido)).Tables(0).Rows(0)("RutaContrato")
            Auditoria.InsertarAuditoria("Obtener contrato del pedido: " & prIdPedido)

            'validar existencia de archivo
            Dim result As String = String.Empty
            If String.IsNullOrEmpty(strRuta) Then
                result = ""
            ElseIf Not File.Exists(HttpContext.Current.Server.MapPath("~/") + strRuta) Then
                result = "-1"
            Else
                result = strRuta
            End If

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try

    End Function

    <WebMethod()>
    Public Shared Function CargarDatosCampana(ByVal IdCampana) As String
        Dim Resultado As String = String.Empty
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim DashboardPedido As BL_MOV_CAM_DashboardPedido = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            Dim js As New JavaScriptSerializer()
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
            DashboardPedido = New BL_MOV_CAM_DashboardPedido(oUsuario.IdCliente)

            Dim oCampana As MOV_CAM_Campana = Campana.obtenerCampanaActivaPorId(oUsuario.IdCliente, IdCampana)
            Dim CampanaConf As ENT_MOV_CAM_CampanaConf = Campana.obtenerCampanaActivaConfPorId(oUsuario.IdCliente, IdCampana)

            Dim CreditoUsuario As ENT_MOV_CAM_DashboardPedido = DashboardPedido.mostrarProductoCreditoAsignado(oUsuario.Empleado.P_vcCod, CampanaConf.IdCampana)

            'Resultado = "var Campana = " + js.Serialize(Campana) + "; "
            Resultado = Resultado + "window.parent.CampanaConf = " + js.Serialize(CampanaConf) + "; "
            Resultado = Resultado + "window.parent.CreditoUsuario = " + js.Serialize(CreditoUsuario) + "; "
            Resultado = Resultado + "window.parent.fnActualizarFechasCampanas('" + oCampana.FechaInicio.ToString("dd/MM/yyyy") + "','" + Convert.ToDateTime(oCampana.FechaInicioPedido).ToString("dd/MM/yyyy") + "','" + Convert.ToDateTime(oCampana.FechaInicioEntrega).ToString("dd/MM/yyyy") + "');"
            'Resultado = Resultado + "$('#hdfCampanaActiva').val();"

            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Not IsNothing(Campana) Then Campana.Dispose()
            If Not IsNothing(DashboardPedido) Then DashboardPedido.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registraNumeroPortabilidad(ByVal prIdEmpleado As String, ByVal prNombre As String, ByVal prCorreo As String, ByVal prNumero As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim oBlEmpleadoG As BL_GEN_EmpleadoG = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Try
            Dim dsPedidos As New DataSet
            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("Metodo - registraNumeroPortabilidad, {prIdEmpleado: " & prIdEmpleado & "},{prNombre: " & prNombre.ToString & "},{prCorreo: " & prCorreo & "},{prNumero: " & prNumero & "}")

            Dim retorno As Integer = pedido.RegistrarContactoPortabilidad(prIdEmpleado, prNombre, prCorreo, prNumero)

            If retorno = 1 Then
                Return "OK"
            Else
                Return "EXISTE"
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
            If Notificacion IsNot Nothing Then
                Notificacion.Dispose()
            End If
            If oBlEmpleadoG IsNot Nothing Then
                oBlEmpleadoG.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If

        End Try
    End Function

End Class