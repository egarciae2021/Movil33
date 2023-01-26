Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.IO

Partial Class P_Movil_Administrar_Adm_HistorialCuentasDeCobro
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    hdfinTip.Value = Request.QueryString("inTip")
                    hdfinTipOri.Value = Request.QueryString("inTipOri")
                    hdfinCod.Value = Request.QueryString("inCod")
                    hdfvcTab.Value = Request.QueryString("vcTab")

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

End Class
