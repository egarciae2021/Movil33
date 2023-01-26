<%@ WebHandler Language="VB" Class="DescargarArchivo" %>

Imports System
Imports System.Web
Imports System.IO
Imports Ionic.Zip

Public Class DescargarArchivo : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            Dim mediaName As String = context.Request.QueryString("archivo")
            Dim remoto As String = context.Request.QueryString("remoto")
        
        
            Dim Dominio As String = context.Request.QueryString("Dominio")
            Dim Usuario As String = context.Request.QueryString("Usuario")
            Dim mediaNameVirtual As String = String.Empty
        
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/")
            Dim name As String = UtilitarioWeb.CorrijeNombreArchivo("ImportadorLineas")
                
            Dim fi As FileInfo
        
            If (String.IsNullOrEmpty(mediaName)) Then
                Return
            End If
        
            Dim destPath As String = String.Empty

            If remoto Is Nothing Then
                If mediaName.Substring(1, 1) <> "~" Then
                    destPath = context.Server.MapPath("~/" + mediaName)
                Else
                    destPath = context.Server.MapPath(mediaName)
                End If
                
                fi = New FileInfo(destPath)
            ElseIf remoto = "2" Then
                vcRutaTMP = HttpContext.Current.Server.MapPath("~/General/Administrar/Importacion/Temporal/Temporal" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/")
                destPath = UtilitarioWeb.ComprimeArchivo(mediaName, vcRutaTMP, name, name, "log")
                fi = New FileInfo(destPath)
            Else
                destPath = mediaName
                fi = New FileInfo(destPath)
            End If

        
            'Check to see if file exist
         
            'If the file exist on the server then add it to the database
            Try
                If (fi.Exists) Then
                    HttpContext.Current.Response.ClearHeaders()
                    HttpContext.Current.Response.ClearContent()
                    HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                    HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                    HttpContext.Current.Response.ContentType = "application/octet-stream"
                    HttpContext.Current.Response.TransmitFile(fi.FullName)
                    HttpContext.Current.Response.Flush()
                End If
            Catch ex As Exception
                HttpContext.Current.Response.ContentType = "text/plain"
                HttpContext.Current.Response.Write(ex.Message)
            Finally
                'HttpContext.Current.Response.End()
            End Try
        Catch ex As Exception
            HttpContext.Current.Response.ContentType = "text/plain"
            HttpContext.Current.Response.Write(ex.Message)
        Finally
            'HttpContext.Current.Response.End()
        End Try
    End Sub
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class