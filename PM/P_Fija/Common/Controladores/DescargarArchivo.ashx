<%@ WebHandler Language="VB" Class="DescargarArchivo" %>

Imports System
Imports System.Web
Imports System.IO

Public Class DescargarArchivo : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim mediaName As String = context.Request.QueryString("archivo")
 
        If (String.IsNullOrEmpty(mediaName)) Then
            Return
        End If
        
        
        '  Dim destPath As String = context.Server.MapPath("~/" + "ResumenAsuntos.xlsx")
        'Dim destPath As String = context.Server.MapPath("~/" + mediaName)
        Dim destPath As String = mediaName
        
        'Check to see if file exist
        Dim fi As FileInfo = New FileInfo(destPath)
 
        'If the file exist on the server then add it to the database
        Try
            If (fi.Exists) Then
                HttpContext.Current.Response.ClearHeaders()
                HttpContext.Current.Response.ClearContent()
                HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name))
                HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                HttpContext.Current.Response.ContentType = "application/octet-stream"
                HttpContext.Current.Response.TransmitFile(fi.FullName)
                HttpContext.Current.Response.Flush()
            End If
        Catch ex As Exception
            HttpContext.Current.Response.ContentType = "text/plain"
            HttpContext.Current.Response.Write(ex.Message)
        Finally
            HttpContext.Current.Response.End()
        End Try
    End Sub
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class