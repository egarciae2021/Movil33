Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class MDM_Dispositivo
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

                    Dim IdFiltro As String = "0"
                    Dim IdTipoFiltro As String = "0"
                    Dim vcTecnico As String = ""
                    Try
                        IdFiltro = Request.QueryString("IdFiltro").ToString()
                    Catch ex As Exception
                        IdFiltro = "0"
                    End Try
                    Try
                        IdTipoFiltro = Request.QueryString("IdTipoFiltro").ToString()
                    Catch ex As Exception
                        IdTipoFiltro = "0"
                    End Try
                    Try
                        vcTecnico = Request.QueryString("vcTecnico").ToString()
                    Catch ex As Exception
                        vcTecnico = ""
                    End Try
                    hdfIdFiltro.Value = IdFiltro
                    hdfIdTipoFiltro.Value = IdTipoFiltro
                    hdfvcTecnico.Value = vcTecnico
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/."), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Listar(ByVal inIdFiltro As String, ByVal inIdTipoFiltro As String, ByVal invcTecnico As String) As List(Of String)
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)

            Dim result = New List(Of String)()
            Select Case inIdTipoFiltro
                Case "1"
                    result = Dispositivo.ListarPorIdModelo(Integer.Parse(inIdFiltro), 0, invcTecnico)
                Case "2"
                    result = Dispositivo.ListarPorIdEmpleado(inIdFiltro, 0)
                Case "3"
                    result = Dispositivo.ListarPorIdModelo(Integer.Parse(inIdFiltro), 3, invcTecnico)
                Case Else
                    result = Dispositivo.Listar()
            End Select


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
    Public Shared Function ActivarAplicaciones(ByVal IdDispositivo As String) As String
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)

            Dim result As Integer = Dispositivo.DesbloquearAplicaciones(IdDispositivo)
            EnviarNotificacion(IdDispositivo, oUsuario.IdCliente, 2)

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
    Public Shared Function DesactivarAplicaciones(ByVal IdDispositivo As String) As String
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)

            Dim result As Integer = Dispositivo.BloquearAplicaciones(IdDispositivo)
            EnviarNotificacion(IdDispositivo, oUsuario.IdCliente, 2)

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
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