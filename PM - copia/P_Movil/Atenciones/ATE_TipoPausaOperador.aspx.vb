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

Public Class ATE_TipoPausaOperador
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_MOV_ATE_Operador = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Operador = New BL_MOV_ATE_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    If (Not IsNothing(Request.QueryString("IdOperador"))) Then
                        hdfIdOperador.Value = Request.QueryString("IdOperador")
                        hdfIdEstado.Value = Request.QueryString("IdEstado")
                        hdfIdVentanilla.Value = Request.QueryString("IdVentanilla")

                        Dim dtTipoPausa As DataTable = Operador.ListarTipoPausa().Tables(0)
                        UtilitarioWeb.Dataddl(ddlTipoPausa, dtTipoPausa, "Descripcion", "IdTipoPausaOperador")
                    End If
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function CambiarEstado(ByVal IdOperador As String, ByVal IdEstado As String, ByVal IdTipoPausa As String, ByVal IdVentanilla As String) As String
        Dim Operador As BL_MOV_ATE_Operador = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Operador = New BL_MOV_ATE_Operador(oUsuario.IdCliente)

            Operador.CambiarEstado(Convert.ToInt32(IdOperador), Convert.ToInt32(IdEstado), Convert.ToInt32(IdTipoPausa), Convert.ToInt32(IdVentanilla))
            oUsuario.IdEstadoOperador = Convert.ToInt32(IdEstado)

            HttpContext.Current.Session("Usuario") = oUsuario
            Return "1"

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
        End Try
    End Function

End Class