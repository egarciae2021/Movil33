Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Configurar_Conf_NotificacionSolicitud
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim SolicitudNotificacion As BL_MOV_SolicitudNotificacion = new BL_MOV_SolicitudNotificacion(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               UtilitarioWeb.Dataddl(ddlNotificacion, SolicitudNotificacion.Listar("-1", "<Seleccione Notificación>"), "vcDes", "P_inCodNot")
               SolicitudNotificacion.Dispose()
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
    Public Shared Function Guardar(ByVal inCodNot As String, ByVal vcCorAdm1 As String, ByVal vcCorAdm2 As String, ByVal vcCorAdm3 As String, ByVal vcTitCorAdm As String, _
                                   ByVal btEnvCorAdm As String, ByVal vcTitCorUsu As String, ByVal btEnvCorUsu As String) As String
        Try
            Dim Notificacion As BL_MOV_SolicitudNotificacion = new BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oNotificacion As New ENT_MOV_SolicitudNotificacion

            oNotificacion.P_inCodNot = Integer.Parse(inCodNot)
            oNotificacion.vcCorAdm1 = vcCorAdm1.Replace("&#39", "'")
            oNotificacion.vcCorAdm2 = vcCorAdm2.Replace("&#39", "'")
            oNotificacion.vcCorAdm3 = vcCorAdm3.Replace("&#39", "'")
            oNotificacion.vcTitCorAdm = vcTitCorAdm.Replace("&#39", "'")
            oNotificacion.btEnvCorAdm = Convert.ToBoolean(btEnvCorAdm)
            oNotificacion.vcTitCorUsu = vcTitCorUsu.Replace("&#39", "'")
            oNotificacion.btEnvCorUsu = Convert.ToBoolean(btEnvCorUsu)

            Notificacion.Actualizar(oNotificacion)
         Notificacion.Dispose()
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Mostrar(ByVal inCodNot As String) As ENT_MOV_SolicitudNotificacion
        Try
            Dim Notificacion As BL_MOV_SolicitudNotificacion = new BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(inCodNot)
         Notificacion.Dispose()
         Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class
