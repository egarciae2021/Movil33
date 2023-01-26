Imports System.Diagnostics.Eventing.Reader
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Auditoria
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Web.Services
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports UtilitarioWeb
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.Common.Logging
Imports VisualSoft.PCSistelMovil.General.BE
Imports ClosedXML.Excel
Imports System.IO.Compression
Imports Ionic.Zip

Public Class MDM_DispositivosSincronizados
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
                    Dim script As String = ""

                    Dim perfiles As String = ""
                    For index = 0 To oUsuario.Perfiles.Count - 1
                        perfiles += oUsuario.Perfiles(index).CodigoPerfil.ToString() + ","
                    Next
                    hdfPerfiles.Value = perfiles
                    hdfIdDominio.Value = ""
                    hdfIdGateway.Value = ""
                    If Not String.IsNullOrEmpty(oUsuario.IdDominio) Then
                        hdfIdDominio.Value = oUsuario.IdDominio
                    End If
                    If Not String.IsNullOrEmpty(oUsuario.IdGateway) Then
                        hdfIdGateway.Value = oUsuario.IdGateway
                    End If

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            eeListado.Visible = True

            Dim td As New HtmlTableCell
            td.Controls.Add(eeListado)
            trAvanzada.Controls.Add(td)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarDispositivosSincronizados() As List(Of String)
        Dim ModeloDispositivo As BL_MDM_ModeloDispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            ModeloDispositivo = New BL_MDM_ModeloDispositivo(oUsuario.IdCliente)
            Return ModeloDispositivo.ListarDispositivosSincronizados("Listar")

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Function

    Protected Sub eeListado_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eeListado.ObtenerDatosAExportar
        'Dim lstCampo As List(Of ENT_ENT_Campo)
        Dim ModeloDispositivo As BL_MDM_ModeloDispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            ModeloDispositivo = New BL_MDM_ModeloDispositivo(oUsuario.IdCliente)
            Dim dsDetalle As DataTable = ModeloDispositivo.ListarDispositivosSincronizadosReporte("Reporte")
            dsDetalle.TableName = "SincronizaciónDispositivos"
            eeListado.ExportarDatos(dsDetalle, "")
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function SincronizarDispositivo(ByVal IdDispositivo As String, ByVal AuthToken As String) As String
        Dim DispositivoApp As BL_MDM_DispositivoApp = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            DispositivoApp = New BL_MDM_DispositivoApp(oUsuario.IdCliente)

            Dim result = 0
            result = DispositivoApp.SincronizarPorIdDispositivo(IdDispositivo, AuthToken)

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If DispositivoApp IsNot Nothing Then DispositivoApp.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function SincronizarTodos(ByVal IdGateway As String) As String
        Dim DispositivoApp As BL_MDM_DispositivoApp = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            DispositivoApp = New BL_MDM_DispositivoApp(oUsuario.IdCliente)

            Dim result = 0
            result = DispositivoApp.SincronizarTodos((oUsuario.IdCliente).ToString(), IdGateway)

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If DispositivoApp IsNot Nothing Then DispositivoApp.Dispose()
        End Try
    End Function
End Class