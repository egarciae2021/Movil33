<%@ WebHandler Language="VB" Class="ImagenDinamica" %>

Imports System
Imports System.Web
Imports VisualSoft.Suite80.BL
Imports VisualSoft.PCSistel.CompSeguridad.BL
Imports VisualSoft.Suite80.BE
Imports System.IO
Imports System.Data
Imports VisualSoft.PCSistel.Utilitarios

Public Class ImagenDinamica : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            Dim Tipo As String = context.Request.QueryString("Tipo")
            If Tipo Is Nothing Then Exit Sub
            Dim bytes As Byte() = Nothing
            Dim ds As New DataSet
            Select Case Tipo
                Case "Cliente"
                    Dim Region As BL_GEN_Regi = New BL_GEN_Regi()
                    bytes = Region.Listar().REGI_imLOGEMP
                Case "Usuario"
                    Dim Usuario As BL_M_USUA = New BL_M_USUA()
                    Dim IdUsuario As String = context.Request.QueryString("IdUsuario")
                    ds = Usuario.Mostrar(Val(IdUsuario))
                    If ds.Tables(0).Rows(0)("USUA_Imagen").ToString() = "" Then
                        bytes = Nothing
                    Else
                        bytes = DirectCast(ds.Tables(0).Rows(0)("USUA_Imagen"), [Byte]())
                    End If
                    If bytes Is Nothing Then
                        Try
                            Dim oFileStream As FileStream = New FileStream(System.Web.HttpContext.Current.Server.MapPath("~/Images/user.png"), FileMode.Open)
                            Dim FileSize As Integer = oFileStream.Length
                            Dim Buffer As Byte() = New Byte(FileSize - 1) {}
                            oFileStream.Read(Buffer, 0, FileSize)
                            oFileStream.Close()
                            bytes = Buffer
                        Catch ex As Exception
                            Dim util As New ClaseUtilitarios()
                            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
                            Throw New Exception(UtilitarioWeb.MensajeError)
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