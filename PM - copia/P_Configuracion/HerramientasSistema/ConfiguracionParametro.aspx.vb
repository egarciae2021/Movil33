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

Public Class ConfiguracionParametro
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
    Public Shared Function Listar_Parametros(ByVal prCriterio As String) As List(Of ENT_MOV_Parametros)
        Try

            Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente


            'Dim BL_SEG_Politica As BL_SEG_Politica = New BL_SEG_Politica(inCodUsu)

            'Dim _return As List(Of ENT_SEG_Politica) = BL_SEG_Politica.Listar(prCriterio)


            Dim BL_MOV_Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(inCodUsu)

            Dim _return As List(Of ENT_MOV_Parametros) = BL_MOV_Parametros.Listar(prCriterio)

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
    Public Shared Function Actualizar_Parametros(ByVal prCriterio1 As String, ByVal prCriterio2 As String, ByVal prCriterio3 As String) As Integer
        Try

            Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente

            Dim BL_MOV_Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(inCodUsu)

            Dim ent As ENT_MOV_Parametros = New ENT_MOV_Parametros

            ent.Clave = prCriterio1
            ent.Valor = prCriterio2
            ent.Descripcion = prCriterio3

            Return BL_MOV_Parametros.Grabar(ent)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(Utilitario.MensajeError)
            Throw New Exception(ex.Message)
        End Try
    End Function

End Class