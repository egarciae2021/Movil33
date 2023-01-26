Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class Theme
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
    End Sub

    <WebMethod()>
    Public Shared Sub GuardarTema(ByVal Tema As String)
        Dim Usuario As BL_SEG_Usuario = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)
            Dim i As Integer = Tema.LastIndexOf("/")

            If i > 0 Then
                Tema = Tema.Substring(i + 1, Tema.Length - (i + 1))
            End If

            Dim strExcelPredefinido As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcExcelPorDefecto
            Usuario.ActualizarTema(Tema, oUsuario.P_inCod, strExcelPredefinido)

            oUsuario.CaracteristicaUsuario.vcTem = Tema
            HttpContext.Current.Session("Usuario") = oUsuario
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Usuario IsNot Nothing Then
                Usuario.Dispose()
            End If
        End Try
    End Sub
End Class
