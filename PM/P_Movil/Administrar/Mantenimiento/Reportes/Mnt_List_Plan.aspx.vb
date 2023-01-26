Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports Microsoft.VisualBasic
Imports System
Imports System.Web.UI
Imports DevExpress.Web
Imports System.Globalization
Imports System.Web.Services
Public Class Mnt_List_Plan
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
        Dim vcCampoFiltro As String = Request.QueryString("vcCampoFiltro")
        Dim vcDescFiltro As String = Request.QueryString("vcDescFiltro")
        Dim vcTab As String = Request.QueryString("vcTab")
        Dim inEstado As Integer = UtilitarioWeb.ComprobarIntNULL(Request.QueryString("inEstado"), 0)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ModeloDispositivo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)

            hdfIdEstado.Value = inEstado
            hdfCampos.Value = vcCampoFiltro
            hdfFiltro.Value = vcDescFiltro

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    UtilitarioWeb.Dataddl(ddlModelo, ModeloDispositivo.Listar(-1, "<Todos>"), "vcNom", "P_inCod")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Sub

End Class
