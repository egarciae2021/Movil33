Imports System.Web
Imports System.Web.Services
Imports System.IO

Public Class UploadHandler : Implements System.Web.IHttpHandler

    Public Sub ProcessRequest(context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim strPath As String = HttpContext.Current.Server.MapPath("~") + "P_Movil\Importacion"

        If Not Directory.Exists(strPath) Then
            Directory.CreateDirectory(strPath)
        End If

        'Uploaded File Deletion
        If context.Request.QueryString.Count > 0 Then
            Dim filePath As String = strPath & "\" & context.Request.QueryString(0).ToString()

            If File.Exists(filePath) Then
                If context.Request.QueryString(1).ToString() = "delete" Then
                    File.Delete(filePath)
                Else
                    'download
                    context.Response.ClearContent()
                    context.Response.AddHeader("Content-Disposition", "attachment; filename=" + System.IO.Path.GetFileName(filePath))
                    context.Response.ContentType = "application/octet-stream"
                    'Abarca todo tipo de archivo.
                    context.Response.WriteFile(filePath)
                    context.Response.End()
                End If
            End If
        Else
            'File Upload
            Dim dblTamano As Double = (context.Request.Files(0).ContentLength / 1024.0) / 1024.0
            Dim dblTamMB As Double = Convert.ToDouble("0" + ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString())

            If dblTamano < dblTamMB OrElse dblTamano = dblTamMB Then
                Dim ext = System.IO.Path.GetExtension(context.Request.Files(0).FileName)
                Dim fileName = Path.GetFileName(context.Request.Files(0).FileName)
                If context.Request.Files(0).FileName.LastIndexOf("\") <> -1 Then
                    fileName = context.Request.Files(0).FileName.Remove(0, context.Request.Files(0).FileName.LastIndexOf("\"))
                End If
                fileName = GetUniqueFileName(fileName, strPath, ext)
                Dim location As String = strPath & "\" & fileName + ext

                context.Request.Files(0).SaveAs(location)
                context.Response.Write(fileName + ext)
                context.Response.End()
            End If
        End If
    End Sub

    Public Shared Function GetUniqueFileName(name As String, savePath As String, ext As String) As String
        name = name.Replace(ext, "").Replace(" ", "_")
        name = System.Text.RegularExpressions.Regex.Replace(name, "[^\w\s]", "")
        Dim newName = name
        Dim i = 0
        If System.IO.File.Exists(savePath & "\" & newName & ext) Then
            Do
                File.Delete(savePath & "\" & newName & ext)
                i += 1
                newName = name
            Loop While System.IO.File.Exists(savePath & "\" & newName & ext)
        End If
        Return newName
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class