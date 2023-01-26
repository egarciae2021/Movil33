Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_FacturaResumen
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function ListarServicio(ByVal inOpe As String, ByVal vcLin As String, ByVal vcPer As String) As List(Of ENT_GEN_Servicio)
      Try
         Dim Llamadas As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_GEN_Servicio) = Llamadas.ListarResumenPorLineaPeriodoOperador(Convert.ToInt32(inOpe), vcLin, vcPer)
         Llamadas.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function
End Class