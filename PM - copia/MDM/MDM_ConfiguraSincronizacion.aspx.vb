Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class MDM_ConfiguraSincronizacion
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
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarconfigSincronizados() As List(Of String)
        Dim ModeloDispositivo As BL_MDM_ModeloDispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            ModeloDispositivo = New BL_MDM_ModeloDispositivo(oUsuario.IdCliente)
            Return ModeloDispositivo.ListarConfigSincronizados()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GuardarconfigSincronizados(ByVal tipo As String, ByVal verde As Integer, ByVal amarillo As Integer, ByVal naranja As Integer, ByVal rojo As Integer, ByVal diaenvio As String, ByVal correoenvio As String, ByVal horaenvio As String, ByVal condiciones As String,
                                                      ByVal diasincronizacion As String, ByVal horasincronizacion As String) As String
        Dim ModeloDispositivo As BL_MDM_ModeloDispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            ModeloDispositivo = New BL_MDM_ModeloDispositivo(oUsuario.IdCliente)
            condiciones = condiciones.Replace("|", "'")

            Return ModeloDispositivo.GuardarConfigSincronizacion(tipo, verde, amarillo, naranja, rojo, diaenvio, correoenvio, horaenvio, condiciones, diasincronizacion, horasincronizacion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Function


End Class