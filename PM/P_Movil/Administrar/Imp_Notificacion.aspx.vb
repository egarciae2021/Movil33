Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Imp_Notificacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim IMP_Notificacion As BL_MOV_IMP_Notificacion = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    IMP_Notificacion = New BL_MOV_IMP_Notificacion(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    UtilitarioWeb.Dataddl(ddlNotificacion, IMP_Notificacion.Listar("-1", "<Seleccione Notificación>"), "vcDes", "P_inCodNot")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Notificacion IsNot Nothing Then
                IMP_Notificacion.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal inCodNot As String, ByVal btEnv As String, ByVal vcAsu As String, ByVal vcCor As String, ByVal vcCorAlt As String) As String
        Dim IMP_Notificacion As BL_MOV_IMP_Notificacion = Nothing

        Try
            IMP_Notificacion = New BL_MOV_IMP_Notificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Notificacion As New ENT_MOV_IMP_Notificacion

            oIMP_Notificacion.P_inCodNot = Integer.Parse(inCodNot)
            oIMP_Notificacion.btEnv = Convert.ToBoolean(btEnv)
            If (vcAsu.Trim() <> "") Then
                oIMP_Notificacion.vcAsu = vcAsu.Replace("&#39", "'")
            Else
                If oIMP_Notificacion.P_inCodNot = 1 Then
                    oIMP_Notificacion.vcAsu = "Líneas No Registradas"
                ElseIf oIMP_Notificacion.P_inCodNot = 2 Then
                    oIMP_Notificacion.vcAsu = "Tarea Culminada"
                End If
            End If
            If (vcCor.Trim() <> "") Then
                oIMP_Notificacion.vcCor = vcCor.Replace("&#39", "'")
            Else
                oIMP_Notificacion.vcCor = "persona@miempresa.com"
            End If
            oIMP_Notificacion.vcCorAlt = vcCorAlt.Replace("&#39", "'")

            IMP_Notificacion.Actualizar(oIMP_Notificacion)

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Notificacion IsNot Nothing Then
                IMP_Notificacion.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Mostrar(ByVal inCodNot As String) As ENT_MOV_IMP_Notificacion
        Dim IMP_Notificacion As BL_MOV_IMP_Notificacion = Nothing

        Try
            IMP_Notificacion = New BL_MOV_IMP_Notificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Notificacion As New ENT_MOV_IMP_Notificacion

            oIMP_Notificacion.P_inCodNot = Integer.Parse(inCodNot)

            Return IMP_Notificacion.Mostrar(oIMP_Notificacion)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Notificacion IsNot Nothing Then
                IMP_Notificacion.Dispose()
            End If
        End Try
    End Function
End Class
