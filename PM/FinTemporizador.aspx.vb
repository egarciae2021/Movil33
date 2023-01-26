Public Class FimTemporizador
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        FormsAuthentication.SignOut()
        HttpContext.Current.SkipAuthorization = True
        HttpContext.Current.Response.Clear()
        HttpContext.Current.Response.StatusCode = System.Net.HttpStatusCode.Unauthorized
        HttpContext.Current.Response.Write("Unauthorized")
        HttpContext.Current.Response.End()
    End Sub

End Class