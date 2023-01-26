Public Class BasePageWebOLD
    Inherits System.Web.UI.Page

    Protected Overridable Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Session.Count = 0 Then
            Server.Transfer("Login.aspx")
            Exit Sub
        End If
        If (Session("Usuario") Is Nothing) Then
            Response.Redirect("Login.aspx")
            Exit Sub
        End If
    End Sub

End Class
