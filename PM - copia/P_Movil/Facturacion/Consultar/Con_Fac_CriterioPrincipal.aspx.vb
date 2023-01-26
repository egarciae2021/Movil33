Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class Con_Fac_CriterioPrincipal
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    
                    'JHERRERA 20140807 -- Se usa para validar si se debe mostrar el botón de eliminar
                    hdfIdUsuario.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

End Class