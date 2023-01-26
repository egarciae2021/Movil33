Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Movil_Configurar_Conf_EnvioCorreo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Parametros As BL_MOV_Parametros = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Parametros = New BL_MOV_Parametros(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim dtParametros As DataTable = (Parametros.MostrarGrupo("EnviarCorreo")).Tables(0)

                    lblCorAdm.Text = dtParametros.Rows(0)("Valor").Replace("&#39", "'").ToString()
                    txtCorAdi.Text = dtParametros.Rows(1)("Valor").Replace("&#39", "'").ToString()
                    txtNumDiaPre.Text = dtParametros.Rows(2)("Valor").ToString()

                    Dim vcDiaPre As String
                    If txtNumDiaPre.Text.Trim() = "" Then
                        vcDiaPre = "n"
                    Else
                        vcDiaPre = txtNumDiaPre.Text
                    End If
                    lblMensaje.Text = "Se enviará una alerta acerca de la Entrega del dispositivo con " + vcDiaPre + " días de anticipación de la fecha de entrega."

                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Parametros) Then Parametros.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcCorAdi As String, ByVal inNumDiaPre As String) As Integer
        Dim Parametros As BL_MOV_Parametros = Nothing
        Try
            Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer

            Parametros.ActualizarEnviarCorreo(vcCorAdi, inNumDiaPre)
            Return 0

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Parametros) Then Parametros.Dispose()
        End Try
    End Function

End Class
