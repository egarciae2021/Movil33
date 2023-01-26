Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class MDM_Principal
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
    Public Shared Function ListarEmpleados() As List(Of String)
        Dim Empleado As BL_MDM_Empleado = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Empleado = New BL_MDM_Empleado(oUsuario.IdCliente)
            Return Empleado.Listar()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDispositivos() As List(Of String)
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)
            Return Dispositivo.Listar()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ListarModelos() As List(Of String)
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

    <WebMethod()>
    Public Shared Function ActivarAplicacionesPorDispositivo(ByVal IdDispositivo As String) As String
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)

            Dim result As Integer = Dispositivo.DesbloquearAplicaciones(IdDispositivo)
            EnviarNotificacion(IdDispositivo, oUsuario.IdCliente, 1)

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DesactivarAplicacionesPorDispositivo(ByVal IdDispositivo As String) As String
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)

            Dim result As Integer = Dispositivo.BloquearAplicaciones(IdDispositivo)
            EnviarNotificacion(IdDispositivo, oUsuario.IdCliente, 1)

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
        End Try
    End Function

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

    <WebMethod()>
    Public Shared Function GenerarCodigo(ByVal Id As String, ByVal IdTipo As String) As String
        Dim Empleado As BL_MDM_Empleado = Nothing
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer

            If IdTipo.Equals("1") Then
                Empleado = New BL_MDM_Empleado(oUsuario.IdCliente)

                Return Empleado.GenerarCodigo(Id)
            Else
                Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)

                Return Dispositivo.GenerarCodigo(Id)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValidarEquipoAdministrado(ByVal IdDispositivo As String) As String
        Dim Empleado As BL_MDM_Empleado = Nothing
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer

            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)

            Return Dispositivo.ValidarEquipoAdministrado(IdDispositivo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
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
End Class