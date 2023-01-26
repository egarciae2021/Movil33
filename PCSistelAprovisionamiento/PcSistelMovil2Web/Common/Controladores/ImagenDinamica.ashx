<%@ WebHandler Language="VB" Class="ImagenDinamica" %>

Imports System
Imports System.Web
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.IO

Public Class ImagenDinamica : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            Dim Tipo As String = context.Request.QueryString("Tipo")
            If Tipo Is Nothing Then Exit Sub
            Dim bytes As Byte() = Nothing
            Select Case Tipo
                Case "Cliente"
                    Dim Region As BL_GEN_Regi = New BL_GEN_Regi(0)
                    bytes = Region.Listar().REGI_imLOGEMP
                    Region.Dispose()
                Case "Usuario"
                    Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(0)
                    Dim IdUsuario As String = context.Request.QueryString("IdUsuario")
                    bytes = Usuario.Mostrar(Val(IdUsuario)).Imagen
                    Usuario.Dispose()
                    If bytes Is Nothing Then
                        Try
                            Dim oFileStream As FileStream = New FileStream(System.Web.HttpContext.Current.Server.MapPath("~/Images/user.gif"), FileMode.Open)
                            Dim FileSize As Integer = oFileStream.Length
                            Dim Buffer As Byte() = New Byte(FileSize - 1) {}
                            oFileStream.Read(Buffer, 0, FileSize)
                            oFileStream.Close()
                            bytes = Buffer
                        Catch
                        End Try
                    End If
            End Select
            If bytes IsNot Nothing Then
                context.Response.BinaryWrite(bytes)
            End If
            context.Response.ContentType = "image/jpg"
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