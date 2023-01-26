Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class MDM_DispositivoApp
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

                    If Not String.IsNullOrEmpty(oUsuario.IdGateway) Then
                        hdfIdGateway.Value = oUsuario.IdGateway
                    End If

                    Dim IdFiltro As String = "0"
                    Dim IdTipoFiltro As String = "0"
                    Dim Token As String = ""
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
                        Token = Request.QueryString("Token").ToString()
                    Catch ex As Exception
                        Token = ""
                    End Try
                    hdfIdFiltro.Value = IdFiltro
                    hdfIdTipoFiltro.Value = IdTipoFiltro
                    hdfToken.Value = Token
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
    Public Shared Function ListarAplicativos(ByVal inIdFiltro As String, ByVal inIdTipoFiltro As String) As List(Of String)
        Dim DispositivoApp As BL_MDM_DispositivoApp = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            DispositivoApp = New BL_MDM_DispositivoApp(oUsuario.IdCliente)

            Dim result = New List(Of String)()
            Select Case inIdTipoFiltro
                Case "1"
                    result = DispositivoApp.ListarPorIdModelo(Integer.Parse(inIdFiltro))
                Case "2"
                    result = DispositivoApp.ListarPorIdDispositivo(inIdFiltro)
                Case Else

            End Select

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
    Public Shared Sub GuardarCambios(ByVal inIdFiltro As String, ByVal inIdTipoFiltro As String, ByVal inListaApp As String)
        Dim DispositivoApp As BL_MDM_DispositivoApp = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            DispositivoApp = New BL_MDM_DispositivoApp(oUsuario.IdCliente)

            Dim lstApp As List(Of BE_MDM_DispositivoApp) = oSerializer.Deserialize(Of List(Of BE_MDM_DispositivoApp))(inListaApp)
            Dim result = 0
            Select Case inIdTipoFiltro
                Case "1"
                    result = DispositivoApp.GuardarPorIdModelo(Integer.Parse(inIdFiltro), lstApp)
                    EnviarNotificacion(inIdFiltro, oUsuario.IdCliente, Integer.Parse(inIdTipoFiltro))
                Case "2"
                    result = DispositivoApp.GuardarPorIdDispositivo(inIdFiltro, lstApp)
                    EnviarNotificacion(inIdFiltro, oUsuario.IdCliente, Integer.Parse(inIdTipoFiltro))
                Case Else

            End Select



        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If DispositivoApp IsNot Nothing Then DispositivoApp.Dispose()
        End Try
    End Sub

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