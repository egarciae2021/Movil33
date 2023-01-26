Imports System.IO

Partial Class P_Movil_Administrar_Adm_DescargarArchivo
    Inherits System.Web.UI.Page

    Protected Sub form1_Load(sender As Object, e As System.EventArgs) Handles form1.Load
        Dim nombre As String = Request.QueryString("nombre")
        If (String.IsNullOrEmpty(nombre)) Then
            Dim ruta As String = Server.MapPath("Temporal/" & nombre)
            Dim toDownload As System.IO.FileInfo = New System.IO.FileInfo(ruta)
            If (toDownload.Exists) Then
                Response.Clear()
                Response.AddHeader("Content-Disposition", "attachment; filename=Temporal/" & nombre)
                Response.AddHeader("Content-Length", toDownload.Length.ToString())
                Response.ContentType = "application/octet-stream"
                Response.WriteFile("Temporal/" & nombre)
                Response.End()
            End If
        End If
    End Sub
End Class
