Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports Utilitario
Imports System.Web.Script.Services
Imports System.Data

Public Class ATE_TipoPausaVentanilla
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Ventanilla As BL_MOV_ATE_Ventanilla = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Ventanilla = New BL_MOV_ATE_Ventanilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    If (Not IsNothing(Request.QueryString("IdVentanilla"))) Then
                        hdfIdVentanilla.Value = Request.QueryString("IdVentanilla")
                        hdfIdEstado.Value = Request.QueryString("IdEstado")

                        Dim dtTipoPausa As DataTable = Ventanilla.ListarTipoPausa().Tables(0)
                        UtilitarioWeb.Dataddl(ddlTipoPausa, dtTipoPausa, "Descripcion", "IdTipoPausaVentanilla")
                    End If
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Ventanilla IsNot Nothing Then
                Ventanilla.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function CambiarEstado(ByVal IdVentanilla As String, ByVal IdEstado As String, ByVal IdTipoPausa As String) As List(Of Object)
        Dim Ventanilla As BL_MOV_ATE_Ventanilla = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Ventanilla = New BL_MOV_ATE_Ventanilla(oUsuario.IdCliente)
            Dim dt As DataTable

            dt = Ventanilla.CambiarEstado(Convert.ToInt32(IdVentanilla), Convert.ToInt32(IdEstado), Convert.ToInt32(IdTipoPausa), _
                                          oUsuario.Ventanilla.Automatico).Tables(0)
            oUsuario.Ventanilla.IdEstado = Convert.ToInt32(IdEstado)

            HttpContext.Current.Session("Usuario") = oUsuario

            Dim lstObj As New List(Of Object)
            Dim dict1 As New Dictionary(Of String, Object)
            dict1.Add("Automatico", dt.Rows(0)("Automatico").ToString())
            dict1.Add("IdOpcion", dt.Rows(0)("IdOpcion").ToString())
            dict1.Add("IdTipoPausa", dt.Rows(0)("IdTipoPausaVentanilla").ToString())
            lstObj.Add(dict1)

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Ventanilla IsNot Nothing Then Ventanilla.Dispose()
        End Try
    End Function

End Class