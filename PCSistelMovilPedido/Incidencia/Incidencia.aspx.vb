Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO

Public Class Incidencia
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1
            If IsNothing(oUsuario) Then
                Dim script As String = "window.parent.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                hfUsuario.Value = oUsuario.vcUsu
                If Not IsPostBack Then

                    Auditoria.InsertarAuditoria("Ingreso a Incidencia.aspx")

                    hdfConfig.Value = ConfigurationManager.AppSettings("AdjuntarArchivo").ToString()
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfIdUsuarioLogeadoNombre.Value = oUsuario.vcNom
                    If viIdTecnico = "-1" Then
                        viIdTecnico = "0"
                    End If
                    If hdfIdUsuarioLogeado.Value = "1" Then
                        viIdTecnico = "-1"
                    End If
                    hdfIdTecnico.Value = viIdTecnico
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function obtenerTicketsAbiertosSinAsignacion() As List(Of ENT_INC_Ticket)
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("obtenerTicketsAbiertosSinAsignacion")

            Return ticket.obtenerTicketsAbiertosSinAsignacion
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function BuscarTicketPorEstado(ByVal p_inCod As String, ByVal pCodigoTicket As String, ByVal p_inCodUsuario As String, ByVal p_inCodUsuarioRegistro As String, _
            ByVal p_inCodTecnico As String, ByVal p_inCodEstado As String, ByVal P_inCodMedioContacto As String, ByVal P_inTipificacion As String) As List(Of ENT_INC_Ticket)
        Dim ticket As BL_INC_Ticket
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'If p_inCodTecnico = "0" Then
            '    Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, "-1", p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)
            'Else
            '    Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, "-1", p_inCodTecnico, p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)
            'End If
            'Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, p_inCodTecnico, p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)

            Auditoria.InsertarAuditoria("BuscarTicketPorEstado")

            Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, "-1", p_inCodEstado.Replace("|", "'"), P_inCodMedioContacto, P_inTipificacion)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function BuscarTicketFiltro(ByVal p_inCod As String, ByVal pCodigoTicket As String, ByVal p_inCodUsuario As String, ByVal p_inCodUsuarioRegistro As String, _
            ByVal p_inCodTecnico As String, ByVal p_inCodEstado As String, ByVal P_inCodMedioContacto As String, ByVal P_inTipificacion As String, ByVal P_inFiltro As Integer, _
            ByVal p_strFiltro As String) As List(Of ENT_INC_Ticket)
        Dim ticket As BL_INC_Ticket
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("BuscarTicketFiltro")

            If p_inCodTecnico = "0" Then
                Return ticket.obtenerTicketFiltro(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, "-1", p_inCodEstado.Replace("|", "'"), P_inCodMedioContacto, P_inTipificacion, P_inFiltro, p_strFiltro)
            Else
                Return ticket.obtenerTicketFiltro(p_inCod, pCodigoTicket, p_inCodUsuario, "-1", p_inCodTecnico, p_inCodEstado.Replace("|", "'"), P_inCodMedioContacto, P_inTipificacion, P_inFiltro, p_strFiltro)
            End If
            'Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, p_inCodTecnico, p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerDetalleTicket(ByVal p_inCod As Integer) As List(Of ENT_INC_DetalleTicket)
        Dim detalle As BL_INC_DetalleTicket
        Try
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("obtenerDetalleTicket - p_inCod: " & p_inCod)

            Return detalle.obtenerDetalleTicket(p_inCod)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function RegistrarMensajeChat(ByVal P_inCodTicket As Integer, ByVal registradoPor As Integer, _
                                                ByVal vcDescripcion As String, ByVal vcFileName As String) As Integer
        Dim detalle As BL_INC_DetalleTicket = Nothing

        Dim vcExtension = ""
        Dim deLength As Decimal = 0
        Dim byFileData As Byte()
        Dim vcName As String
        Try
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If vcFileName <> "" Then
                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//Common//Temporal//Incidencias//" + vcFileName
                vcName = vcFileName.Substring(0, vcFileName.LastIndexOf("."))
                vcExtension = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1)

                Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                deLength = fs.Length / 1024
                byFileData = New Byte(fs.Length - 1) {}
                fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                fs.Close()

            End If

            Auditoria.InsertarAuditoria("RegistrarMensajeChat - P_inCodTicket: " & P_inCodTicket & ", registradoPor: " & registradoPor & ", vcDescripcion: " & vcDescripcion)

            Return detalle.registrarDetalleTicket_yObtenerIdDetalle(P_inCodTicket, registradoPor, vcDescripcion, byFileData, vcName, deLength, vcExtension)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ActualizarTicketsYaLeidos(ByVal IdTicket As Integer) As Integer
        Dim detalle As BL_INC_Ticket
        Try
            detalle = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("ActualizarTicketsYaLeidos - IdTicket: " & IdTicket)

            detalle.ActualizarTicketsYaLeidos(IdTicket)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DescargarArchivoBD(ByVal inIdDet As Integer) As String
        Dim detalle As BL_INC_DetalleTicket = Nothing

        Try

            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dtDetalle As DataTable = detalle.ObtenerArchivoAdjunto(inIdDet)


            Dim vcFilePath = ""

            If Not IsNothing(dtDetalle.Rows(0)("Archivo")) Then
                vcFilePath = HttpContext.Current.Server.MapPath("~") + "//Common//Temporal//Incidencias//" + dtDetalle.Rows(0)("NombreExtencion").ToString()
                Dim byFileData As Byte() = dtDetalle.Rows(0)("Archivo")
                File.WriteAllBytes(vcFilePath, byFileData)
            End If

            Return vcFilePath

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function
End Class