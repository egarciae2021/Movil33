Public Class FinSession
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim strNombreServidor As String = System.Net.Dns.GetHostName
        lblServidor.Text = strNombreServidor
        Session("Usuario") = Nothing
        Session.Clear()
        Session.Abandon()
    End Sub

End Class