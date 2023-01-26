<%@ WebHandler Language="VB" Class="ImagenDinamica" %>

Imports System
Imports System.Web
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.IO

Public Class ImagenDinamica : Implements IHttpHandler

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim Region As BL_GEN_Regi = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Try
            Dim Tipo As String = context.Request.QueryString("Tipo")
            Dim Dominio As String = context.Request.QueryString("Dominio")

            If Tipo Is Nothing Then Exit Sub
            Dim bytes As Byte() = Nothing
            Select Case Tipo
                Case "Cliente"
                    If Not IsNothing(Dominio) And Dominio <> "" Then
                        Region = New BL_GEN_Regi(Convert.ToInt32(Dominio), Convert.ToInt32(Dominio))
                    Else
                        Region = New BL_GEN_Regi(0)
                    End If
                    bytes = Region.Listar().REGI_imLOGEMP

                Case "Usuario"
                    If Not IsNothing(Dominio) And Dominio <> "" Then
                        Usuario = New BL_SEG_Usuario(Convert.ToInt32(Dominio), 0, Convert.ToInt32(Dominio))
                    Else
                        Usuario = New BL_SEG_Usuario(0)
                    End If
                    Dim IdUsuario As String = context.Request.QueryString("IdUsuario")
                    bytes = Usuario.Mostrar(Val(IdUsuario)).Imagen
                    If bytes Is Nothing Then
                        Try
                            Dim oFileStream As FileStream = New FileStream(System.Web.HttpContext.Current.Server.MapPath("~/Images/user.png"),
                                                                           FileMode.Open, System.IO.FileAccess.Read,
                                                                           System.IO.FileShare.ReadWrite)
                            Dim FileSize As Integer = oFileStream.Length
                            Dim Buffer As Byte() = New Byte(FileSize - 1) {}
                            oFileStream.Read(Buffer, 0, FileSize)
                            oFileStream.Close()
                            bytes = Buffer
                        Catch ex As Exception
                            Console.Write("Error: " & ex.Message)
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
            If Not IsNothing(Region) Then Region.Dispose()
            If Not IsNothing(Usuario) then Usuario.Dispose()
            HttpContext.Current.Response.End()
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
