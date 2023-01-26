Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class MDM_ModeloDispositivo
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
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
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
    Public Shared Function Listar() As List(Of String)
        Dim ModeloDispositivo As BL_MDM_ModeloDispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            ModeloDispositivo = New BL_MDM_ModeloDispositivo(oUsuario.IdCliente)
            Return ModeloDispositivo.Listar()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActivarAplicaciones(ByVal IdModelo As String) As String
        Dim ModeloDispositivo As BL_MDM_ModeloDispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            ModeloDispositivo = New BL_MDM_ModeloDispositivo(oUsuario.IdCliente)

            Dim result As Integer = ModeloDispositivo.DesbloquearAplicaciones(IdModelo)
            EnviarNotificacion(IdModelo, oUsuario.IdCliente, 1)

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DesactivarAplicaciones(ByVal IdModelo As String) As String
        Dim ModeloDispositivo As BL_MDM_ModeloDispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            ModeloDispositivo = New BL_MDM_ModeloDispositivo(oUsuario.IdCliente)

            Dim result As Integer = ModeloDispositivo.BloquearAplicaciones(IdModelo)
            EnviarNotificacion(IdModelo, oUsuario.IdCliente, 1)

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
        End Try
    End Function

    Private Shared Sub EnviarNotificacion(ByVal IdFiltro As String, ByVal IdCliente As Integer, ByVal IdTipoFiltro As Integer)
        Dim Firebase As BL_MDM_Firebase = Nothing
        Try
            Firebase = New BL_MDM_Firebase(IdCliente)

            Dim oFirebase As New FirebaseJSON

            oFirebase.priority = "high"
            oFirebase.data.image = ""
            oFirebase.data.is_background = "false"
            oFirebase.data.title = "Backup by admin"
            oFirebase.data.message = "MDMServices Admin"
            oFirebase.data.timestamp = ""
            oFirebase.data.payload.data_param_1 = "block_status"
            oFirebase.data.payload.user_id = "1"
            Firebase.FirebasePushNotification(IdFiltro, oFirebase, IdTipoFiltro)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception("FCM: " & UtilitarioWeb.MensajeError)
        Finally
            If Firebase IsNot Nothing Then Firebase.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function GenerarCodigoMasivo(ByVal IdModelo As String) As String
        Dim Empleado As BL_MDM_Empleado = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Empleado = New BL_MDM_Empleado(oUsuario.IdCliente)

            Return Empleado.GenerarCodigoMasivo(IdModelo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
    End Function
End Class