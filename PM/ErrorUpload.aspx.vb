Public Class ErrorUpload
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim carga As String = Request.QueryString("size1").ToString()
            Dim limite As String = ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString()

            spcarga.InnerHtml = carga
            splimite.InnerHtml = limite
        Catch ex As Exception

        End Try
   End Sub

End Class