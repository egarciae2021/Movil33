Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE

Partial Class P_Movil_Configurar_Conf_SolicitudDespacho
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load

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

                    Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("SD1")

                    txtTextoEntrega.Text = lstParametros.Item(0).Valor
                    txtTextoEntrega.Attributes("idParametro") = lstParametros(0).IdParametro

                    txtCuerpoMensaje.Text = lstParametros.Item(1).Valor
                    txtCuerpoMensaje.Attributes("idParametro") = lstParametros(1).IdParametro

                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Parametros IsNot Nothing Then Parametros.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal registro As String) As Integer
        Dim Parametros As BL_MOV_Parametros = Nothing
        Try
            Dim serial As New JavaScriptSerializer
            Dim lstRegistro As List(Of ENT_MOV_Parametros) = serial.Deserialize(Of List(Of ENT_MOV_Parametros))(registro)
            Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Parametros.Actualizar(lstRegistro)
            Return ("0")
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Parametros IsNot Nothing Then Parametros.Dispose()
        End Try
    End Function
End Class
