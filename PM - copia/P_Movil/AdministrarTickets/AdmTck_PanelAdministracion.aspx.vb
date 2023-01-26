Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_AdministrarTickets_AdmTck_PanelAdministracion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1
            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    viIdTecnico = ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)

                    'If viIdTecnico = -1 Then
                    '    Dim script As String = "alert('usted no es tecnico'); window.parent.location.reload();"
                    '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    'End If

                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfIdUsuarioLogeadoNombre.Value = oUsuario.vcNom
                    hdfGuid.Value = Guid.NewGuid().ToString().Replace("-", "")
                    'If viIdTecnico = "-1" Then
                    '    viIdTecnico = "0"
                    'End If
                    'If hdfIdUsuarioLogeado.Value = "1" Then
                    '    viIdTecnico = "-1"
                    'End If
                    hdfIdTecnico.Value = viIdTecnico
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function obtenerTickets(ByVal p_inCod As String, ByVal pCodigoTicket As String, ByVal p_inCodUsuario As String, ByVal p_inCodUsuarioRegistro As String, _
            ByVal p_inCodTecnico As String, ByVal p_inCodEstado As String, ByVal P_inCodMedioContacto As String, ByVal P_inTipificacion As String) As List(Of ENT_INC_Ticket)
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If p_inCodTecnico = "0" Then
                Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, "-1", "'ACT'", P_inCodMedioContacto, P_inTipificacion)
            Else
                Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, "-1", p_inCodTecnico, "'ACT'", P_inCodMedioContacto, P_inTipificacion)
            End If
            'Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, p_inCodTecnico, p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerUnTicket(ByVal p_inCod As String) As List(Of ENT_INC_Ticket)
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return ticket.obtenerTickets(p_inCod, "000000000000", "-1", "-1", "-1", "-1", "-1", "-1")
            'Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, p_inCodTecnico, p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerDetalleTicket(ByVal p_inCod As Integer) As List(Of ENT_INC_DetalleTicket)
        Dim DetalleTicket As BL_INC_DetalleTicket = Nothing

        Try
            DetalleTicket = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return DetalleTicket.obtenerDetalleTicket(p_inCod)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If DetalleTicket IsNot Nothing Then
                DetalleTicket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerTicketsPorUsuario(ByVal idUsuario As Integer) As List(Of ENT_INC_Ticket)
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return ticket.obtenerTickets("-1", "000000000000", idUsuario, "-1", "-1", "'ACT'", "-1", "-1")

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerUsuariosPorTicketAbiertos() As List(Of ENT_SEG_Usuario)
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As String = ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)
            Dim strFechaInicio As String = Now.AddMonths(-6).ToString("yyyyMMdd 00:00:00")
            Dim strFechaFin As String = Now.ToString("yyyyMMdd 23:59:59")
            Return ticket.obtenerUsuariosPorTicketAbiertos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, _
                                                           oUsuario.P_inCod, viIdTecnico, strFechaInicio, strFechaFin)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerUnUsuarioPorTicketAbiertos(idUsuario As Integer) As List(Of ENT_SEG_Usuario)
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return ticket.obtenerUnUsuarioPorTicketAbiertos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, idUsuario)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarDetalleTicket(ByVal P_inCodTicket As Integer, _
                                                  ByVal registradoPor As Integer, _
                                                  ByVal vcDescripcion As String) As Boolean
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Dim ticket As BL_INC_Ticket = Nothing
        Dim _return As String = ""
        Try
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            vcDescripcion = (vcDescripcion.Replace("&lt;", "<")).Replace("&gt;", ">")

            _return = detalle.registrarDetalleTicket(P_inCodTicket, registradoPor, vcDescripcion, Nothing, Nothing, 0, "")

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
        Return _return
    End Function

    <WebMethod()>
    Public Shared Function cambiarEstadoTicket(ByVal p_inCodTicket As Integer, ByVal p_inCodEstado As Integer) As Boolean
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return ticket.cambiarEstadoTicket(p_inCodTicket, p_inCodEstado)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarTicketChat(ByVal pUsuario As Integer, ByVal pUsuarioRegistro As Integer, ByVal pMedioContacto As Integer, ByVal pTipificacion As Integer, _
            ByVal pAsunto As String, ByVal pDescripcion As String, ByVal pEsChat As Boolean, ByVal pMensaje As String, ByVal pTecnicoAsignado As Integer) As ENT_INC_Ticket
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return ticket.registrarTicketChat(pUsuario, pUsuarioRegistro, pMedioContacto, pTipificacion, pAsunto, pDescripcion, pEsChat, pMensaje, pTecnicoAsignado)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    Private Shared Function ObtenerIdTecnicoXIdUsuario(ByVal prIdUsuario As Integer) As Integer
        Dim viTecnico As BL_INC_TecnicoSupervisor = Nothing

        Try
            viTecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return viTecnico.ObtenerIdTecnicoXIdUsuario(prIdUsuario)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If viTecnico IsNot Nothing Then
                viTecnico.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GrabarMensajeNoLeidoParaUsuario(ByVal CodigoTicket As String) As String
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim idTicket As Integer = CInt(CodigoTicket.Replace("TCK", ""))
            Return ticket.ActualizarTicketNoLeido(idTicket)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then

                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CerrarTodosTickets(ByVal CodigoUsuario As String, ByVal p_inCodEstado As String) As String
        Dim ticket As BL_INC_Ticket = Nothing

        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return ticket.cambiarEstadoTicketPorUsuario(CodigoUsuario, p_inCodEstado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function
End Class

