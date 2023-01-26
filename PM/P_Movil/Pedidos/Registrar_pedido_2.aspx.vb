Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Pedidos_Registrar_pedido_2
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_Pedidos_Registrar_pedidos_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class
