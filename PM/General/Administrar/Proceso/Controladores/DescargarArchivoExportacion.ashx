<%@ WebHandler Language="VB" Class="DescargarArchivoExportacion" %>

Imports System
Imports System.Web
Imports System.IO

Public Class DescargarArchivoExportacion : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim mediaName As String = context.Request.QueryString("archivo")
 
        If (String.IsNullOrEmpty(mediaName)) Then
            Return
        End If
        
        Dim destPath As String = context.Server.MapPath("~/" + mediaName)
        Dim fi As FileInfo = New FileInfo(destPath)
        Try
            If (fi.Exists) Then
                'HttpContext.Current.Response.ClearHeaders()
                'HttpContext.Current.Response.ClearContent()
                'HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + fi.Name)
                'HttpContext.Current.Response.AddHeader("Content-Length", fi.Length.ToString())
                'HttpContext.Current.Response.ContentType = "application/octet-stream"
                'HttpContext.Current.Response.Flush()
                
                
                HttpContext.Current.Response.ContentType = "application/octet-stream"
                HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name))
                'HttpContext.Current.Response.Flush()
                HttpContext.Current.Response.Clear()
                HttpContext.Current.Response.WriteFile(destPath)
                
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