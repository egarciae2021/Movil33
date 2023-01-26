Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_AdministrarTickets_AdmTck_Supervisor
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         'If IsNothing(Session("Usuario")) Then
         '    Dim script As String = "window.parent.location.reload()"
         '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         'Else
         If Not IsPostBack Then
            hdfEmpleado.Value = 6
            hdfIdUsuarioLogeado.Value = 6
            hdfAdmin.Value = "0"
         End If
         UtilitarioWeb.AgregarTema(Server, Page.Header, "start")
         'End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function obtenerTecnicosDeSupervisor(ByVal idUsuario As Integer) As List(Of ENT_INC_TecnicoSupervisor)
      Try
         Dim tecnicoSupervisor As BL_INC_TecnicoSupervisor = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_INC_TecnicoSupervisor) = tecnicoSupervisor.obtenerTecnicosDeSupervisor(idUsuario)
         tecnicoSupervisor.Dispose()
         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function asignarTicketTecnico(ByVal p_incodTicket As Integer, ByVal pCodTicket As String, ByVal p_inCodTecnico As Integer) As Boolean
      Try
         Dim ticket As BL_INC_Ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim _return As Boolean = ticket.asignarTicketTecnico(p_incodTicket, pCodTicket, p_inCodTecnico)
         ticket.Dispose()
         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

End Class
