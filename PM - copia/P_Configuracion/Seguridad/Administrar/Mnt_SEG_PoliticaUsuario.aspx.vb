Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Mnt_SEG_PoliticaUsuario
    Inherits System.Web.UI.Page

    ' =============================================================================================================================
    ' LOAD
    ' =============================================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

    End Sub

    ' =============================================================================================================================
    ' ABRIR ARCHIVO DEL SISTEMA
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Listar_Politica(ByVal prCriterio As String) As List(Of ENT_SEG_Politica)
        Try

            Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            Dim BL_SEG_Politica As BL_SEG_Politica = New BL_SEG_Politica(inCodUsu)

            Dim _return As List(Of ENT_SEG_Politica) = BL_SEG_Politica.Listar(prCriterio)


            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(Utilitario.MensajeError)
            Throw New Exception(ex.Message)
        End Try
    End Function

    ' =============================================================================================================================
    ' ABRIR ARCHIVO DEL SISTEMA
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Actualizar_Politica(ByVal prCriterio1 As String, ByVal prCriterio2 As String) As Integer
        Try

            Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            Dim BL_SEG_Politica As BL_SEG_Politica = New BL_SEG_Politica(inCodUsu)

            Dim ent As ENT_SEG_Politica = New ENT_SEG_Politica

            ent.vcCod = prCriterio1
            ent.vcVal = prCriterio2

            Return BL_SEG_Politica.Grabar(ent)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(Utilitario.MensajeError)
            Throw New Exception(ex.Message)
        End Try
    End Function

End Class