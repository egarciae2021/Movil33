<%@ WebHandler Language="VB" Class="UploadHandler" %>

Imports System
Imports System.Web
Imports System.IO

Public Class UploadHandler : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            Dim vcSubCarpeta As String = ""
            If Not IsNothing(context.Request.QueryString("vcSubCarpeta")) Then vcSubCarpeta = context.Request.QueryString("vcSubCarpeta")
            
            Select Case context.Request.HttpMethod
                Case "HEAD"
                Case "GET"
                    If GivenFilename(context) Then
                        DeliverFile(context, vcSubCarpeta)
                    End If
                Case "POST"
                    ' ajax calls POST, but it can be a "DELETE" if there is a QueryString on the context
                    If GivenFilename(context) Then
                        DeleteFile(context, vcSubCarpeta)
                    Else
                        Uploadfile(context, vcSubCarpeta)
                    End If
                    Return

                Case "PUT"
                Case "DELETE"
                    DeleteFile(context, vcSubCarpeta)
                    Return

                Case "OPTIONS"
                Case Else
                    context.Response.ClearHeaders()
                    context.Response.StatusCode = 405
                    Return

            End Select
            
        Catch ex As Exception
            Throw
        End Try
        
    End Sub
 
  

    Private Sub Uploadfile(ByVal context As HttpContext, ByVal vcSubCarpeta As String)

        Dim i As Integer
        Dim r As New Generic.LinkedList(Of ViewDataUploadFilesResult)
        Dim files As String()
        Dim savedFileName As String = String.Empty
        Dim js As New Script.Serialization.JavaScriptSerializer
        
        Try
            
            If context.Request.Files.Count >= 1 Then
                
                Dim maximumFileSize As Integer = ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB")
                
                context.Response.ContentType = "text/plain"
                For i = 0 To context.Request.Files.Count - 1
                    Dim hpf As HttpPostedFile
                    Dim FileName As String
                    Dim FileExtension As String
                    hpf = context.Request.Files.Item(i)
            
                    If HttpContext.Current.Request.Browser.Browser.ToUpper = "IE" Then
                        files = hpf.FileName.Split(CChar("\\"))
                        FileName = files(files.Length - 1)
                    Else
                        FileName = hpf.FileName
                    End If
            
                    FileExtension = FileName.Substring(FileName.LastIndexOf("."))
                    'FileName = FileName.Substring(0, FileName.LastIndexOf("."))
                    
                    If hpf.ContentLength >= 0 And (hpf.ContentLength <= maximumFileSize * 1024 * 1024 Or maximumFileSize = 0) Then
                
                        savedFileName = StorageRoot(context, vcSubCarpeta)
                        'FileName = GetUniqueFileName(FileName, savedFileName, FileExtension).ToLower() & FileExtension
                        savedFileName = savedFileName & FileName
                        
                        hpf.SaveAs(savedFileName)
                
                        r.AddLast(New ViewDataUploadFilesResult(FileName, hpf.ContentLength, hpf.ContentType, savedFileName))
                    
                        Dim uploadedFiles = r.Last
                        Dim jsonObj = js.Serialize(uploadedFiles)
                        context.Response.Write(FileName.ToString())
                
                    Else
                        
                        '' File to Big (using IE without ActiveXObject enabled
                        'If hpf.ContentLength > maximumFileSize * 1000 Then
                        '    r.AddLast(New ViewDataUploadFilesResult(FileName, hpf.ContentLength, hpf.ContentType, String.Empty, "maxFileSize"))
                    
                        'End If

                        'Dim uploadedFiles = r.Last
                        'Dim jsonObj = js.Serialize(uploadedFiles)
                        'context.Response.Write(jsonObj.ToString)
                        
                    End If
                Next
                
            End If
            
        Catch ex As Exception
            Throw
        End Try

    End Sub
   
    Private Function GetUniqueFileName(ByVal name As String, ByVal savePath As String, ByVal ext As String) As String
        name = name.Replace(ext, "").Replace(" ", "_")
        name = System.Text.RegularExpressions.Regex.Replace(name, "[^\w\s]", "")
        Dim newName As String = name
        Dim i As Integer = 0
        If System.IO.File.Exists(savePath + newName + ext) Then
            Do While System.IO.File.Exists(savePath + newName + ext)
                i = i + 1
                newName = name & "_" & i
            Loop
        End If
        Return newName
        
    End Function
    
    Private Sub DeleteFile(ByVal context As HttpContext, ByVal vcSubCarpeta As String)
        Try
            Dim path = StorageRoot(context, vcSubCarpeta)
            Dim file = context.Request("file")
            path &= file
            
            If System.IO.File.Exists(path) Then
                System.IO.File.Delete(path)
            End If
            
        Catch ex As Exception
            Throw
        End Try
    End Sub
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

#Region "Generic helpers"
    
    Private Function StorageRoot(ByVal context As HttpContext, ByVal vcSubCarpeta As String) As String
        Try
            'Dim uploadFilesTempBasePath As String = ConfigurationManager.AppSettings("UploadFilesTempBasePath")
            'Dim uploadFilesTempPath As String = ConfigurationManager.AppSettings("UploadFilesTempPath")
            
            If vcSubCarpeta <> "" Then vcSubCarpeta = vcSubCarpeta & "\"
            Dim initPath As String = HttpContext.Current.Server.MapPath("~") & "Temporal\" & vcSubCarpeta
            
            ' Add the Session Unique Folder Name
            'If context.Session("UserFolder") IsNot Nothing Then
            If (initPath.LastIndexOf("\") <> initPath.Length - 1) Then
                initPath &= "\"
            End If
            'initPath &= context.Session("UserFolder")
            'End If
            
            CheckPath(initPath)
            
            Return initPath
        Catch ex As Exception
            Throw
        End Try
    End Function
    
    Private Sub CheckPath(ByRef serverPath As String)
        Dim initPath As String = String.Empty
        Dim tempPath As String = String.Empty
        Dim folders As String()
        
        Try
            
            folders = serverPath.Split(CChar("\\"))

            ' Save file to a server
            If serverPath.Contains("\\") Then
                initPath = "\\"
            Else
                ' Save file to a local folders
            End If
            
            For i As Integer = 0 To folders.Length - 1
                If tempPath.Trim = String.Empty And _
                folders(i) <> String.Empty Then
                    tempPath = initPath & folders(i)
                ElseIf tempPath.Trim <> String.Empty And _
                folders(i).Trim <> String.Empty Then
                    tempPath = tempPath & "\" & folders(i)
                    
                    ' Doesn't check if it's a network connection
                    If Not tempPath.Contains("\\") And _
                    Not folders(i).Contains("$") Then
                        
                        If Not System.IO.Directory.Exists(tempPath) Then
                            System.IO.Directory.CreateDirectory(tempPath)
                        End If
 
                    Else
                        If Not System.IO.Directory.Exists(tempPath) Then
                            System.IO.Directory.CreateDirectory(tempPath)
                        End If
                        
                    End If
                    
                End If

            Next
            
            serverPath = tempPath & "\"
            
        Catch ex As Exception
            Throw
        End Try
    End Sub
    
    Private Function GivenFilename(ByVal context As HttpContext) As Boolean
        Try
            Return Not String.IsNullOrEmpty(context.Request("file"))
        Catch ex As Exception
            Throw
        End Try
    End Function
    
    Private Sub DeliverFile(ByVal context As HttpContext, ByVal vcSubCarpeta As String)
        Try
            Dim file = context.Request("f")
            Dim filePath = StorageRoot(context, vcSubCarpeta) + file
            
            If System.IO.File.Exists(filePath) Then
                context.Response.AddHeader("Content-Disposition", "attachment; filename=" + file)
                context.Response.ContentType = "application/octet-stream"
                context.Response.ClearContent()
                context.Response.WriteFile(filePath)
            Else
                context.Response.StatusCode = 404
            End If
            
        Catch ex As Exception
            Throw
        End Try
    End Sub
    
#End Region

End Class

#Region "local Class"

Public Class ViewDataUploadFilesResult
    Public _name As String
    Public _length As Integer
    Public _type As String
    Public _url As String
    Public delete_url As String
    Public delete_type As String
    Public _errorMSG As String

    Sub New()
        Try

        Catch ex As Exception
            Throw
        End Try
    End Sub

    Sub New(ByVal Name As String, ByVal Length As Integer, ByVal Type As String, ByVal URL As String)
        Try
            _name = Name
            _length = Length
            _type = Type
            _url = "Handler.ashx?f=" + Name
            delete_url = "Handler.ashx?f=" + Name
            delete_type = "POST"
        Catch ex As Exception
            Throw
        End Try
    End Sub
    
    Sub New(ByVal Name As String, ByVal Length As Integer, ByVal Type As String, ByVal URL As String, ByVal errorMSG As String)
        Try
            _name = Name
            _length = Length
            _type = Type
            _url = "Handler.ashx?f=" + Name
            delete_url = "Handler.ashx?f=" + Name
            delete_type = "POST"
            _errorMSG = errorMSG
        Catch ex As Exception
            Throw
        End Try
    End Sub

End Class

#End Region

