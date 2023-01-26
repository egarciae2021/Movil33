Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports UtilitarioWeb
Imports System.Web.Script.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Adm_HistoricoOperador
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfIdSolicitud.Value = Request.QueryString("IdSolicitud")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try

    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar(ByVal IdSolicitud As Integer) As List(Of Object)
        Dim OperadorHistorico As BL_MOV_Solicitud_OperadorHistorico = Nothing
        Dim lstObj As New List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            OperadorHistorico = New BL_MOV_Solicitud_OperadorHistorico(oUsuario.IdCliente)

            Dim dt As DataTable = OperadorHistorico.Listar(IdSolicitud, oCultura.vcFecCor, oCultura.vcHorCor)

            For i As Integer = 0 To dt.Rows.Count - 1
                Dim dict As New Dictionary(Of String, Object)
                dict.Add("daFecIni", dt.Rows(i)("daFecIni").ToString())
                dict.Add("daFecFin", dt.Rows(i)("daFecFin").ToString())
                dict.Add("vcHoras", dt.Rows(i)("vcHoras").ToString())
                lstObj.Add(dict)
            Next


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If OperadorHistorico IsNot Nothing Then OperadorHistorico.Dispose()
        End Try
        Return lstObj
    End Function

End Class