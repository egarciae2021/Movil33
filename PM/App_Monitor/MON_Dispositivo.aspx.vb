Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE

Public Class MON_Dispositivo
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
    Public Shared Function ListarDispositivos(ByVal IdTipoVista2 As String) As List(Of String)
        Dim Dispositivo As BL_MON_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MON_Dispositivo(oUsuario.IdCliente)
            Return Dispositivo.Listar(IdTipoVista2)

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
    Public Shared Function ValidarEquipoAdministrado(ByVal IdDispositivo As String) As String
        Dim Dispositivo As BL_MON_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer

            Dispositivo = New BL_MON_Dispositivo(oUsuario.IdCliente)

            Return Dispositivo.ValidarEquipoAdministrado(IdDispositivo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GenerarCodigo(ByVal Id As String, ByVal IdTipo As String) As String
        Dim Dispositivo As BL_MON_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer

            Dispositivo = New BL_MON_Dispositivo(oUsuario.IdCliente)
            Return Dispositivo.GenerarCodigo(Id)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
        End Try
    End Function

End Class