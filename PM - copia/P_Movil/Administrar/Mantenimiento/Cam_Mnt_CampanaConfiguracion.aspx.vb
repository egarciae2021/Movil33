Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Services
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Cam_Mnt_CampanaConfiguracion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    CargarDatos()
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub CargarDatos()
        Dim Configuracion As BL_CFG_ConfiguracionGeneral = Nothing
        Try
            Configuracion = New BL_CFG_ConfiguracionGeneral(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral = Configuracion.Listar()

            'PÁGINA INICIAL
            If oConfiguracion.VerLinkWeb = "1" Then
                chkVerLinkWeb.Checked = True
                trTextLinkWeb.Style("display") = ""
                trUrlLinkWeb.Style("display") = ""
            End If
            txtTextLinkWeb.Text = oConfiguracion.TextLinkWeb
            txtUrlLinkWeb.Text = oConfiguracion.UrlLinkWeb

            If oConfiguracion.VerBtnManual = "1" Then
                chkVerBtnManual.Checked = True
                trTextBtnManual.Style("display") = ""
                'trUrlBtnManual.Style("display") = ""
                trDocBtnManual.Style("display") = ""
            End If
            txtTextBtnManual.Text = oConfiguracion.TextBtnManual
            txtUrlBtnManual.Text = oConfiguracion.UrlBtnManual
            txtDocBtnManual.Text = oConfiguracion.DocBtnManual

            'GENERAL
            txtConsideraciones.Text = oConfiguracion.Consideraciones
            txtDscPreventa.Text = oConfiguracion.DscPreventa
            txtMsjMantenerPlan.Text = oConfiguracion.MsjMantenerPlan
            txtMsjCambiarPlan.Text = oConfiguracion.MsjCambiarPlan

            'CHAT
            txtTituloChat.Text = oConfiguracion.TituloChat
            txtSubtituloChat.Text = oConfiguracion.SubtituloChat
            txtLimiteAtencionChat.Text = oConfiguracion.LimiteAtencionChat.ToString()
            txtSinAdministrador.Text = oConfiguracion.SinAdministrador
            txtSinAdministradorDisponible.Text = oConfiguracion.SinAdministradorDisponible
            txtAdministradorSaturado.Text = oConfiguracion.AdministradorSaturado

            'NODE
            txtIpNode.Text = oConfiguracion.IpNode
            txtPuertoNode.Text = oConfiguracion.PuertoNode

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal oConfiguracion As String) _
                            As String
        Dim Configuracion As BL_CFG_ConfiguracionGeneral = Nothing

        Try
            Configuracion = New BL_CFG_ConfiguracionGeneral(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oConfiguracion As ENT_CFG_ConfiguracionGeneral = oSerializer.Deserialize(Of ENT_CFG_ConfiguracionGeneral)(oConfiguracion)

            Return Configuracion.Actualizar(v_oConfiguracion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
        End Try
    End Function

End Class