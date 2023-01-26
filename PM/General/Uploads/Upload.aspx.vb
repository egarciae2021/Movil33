Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios

Partial Class Upload
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            'If Not IsPostBack Then
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            'End If
        End If

    End Sub

    <WebMethod()>
    Public Shared Function ValidarExistenciaArchivo(ByVal File As String, ByVal CarpetaDominio As String) As String
        Try
            Dim resultado As String = String.Empty
            Dim sLocation As String = HttpContext.Current.Server.MapPath("DownloadedFiles" + CarpetaDominio + "/")
            Dim sFile As String = sLocation + File
            If Not System.IO.File.Exists(sFile) Then
                resultado = "No existe archivo"
            End If

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class
