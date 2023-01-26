Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data

Partial Class P_Movil_Administrar_Cam_PedidosVistaPreliminar
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfvcTab.Value = "MOV_CAM_CampanaPedidoSeguimiento"
                    If (Not IsNothing(Request.QueryString("vcTipDes"))) Then
                        hdfinIdCam.Value = Request.QueryString("inIdCam")
                        hdfvcNomSit.Value = Request.QueryString("vcNomSit")
                        hdfvcFecIni.Value = Request.QueryString("vcFecIni")
                        hdfvcFecFin.Value = Request.QueryString("vcFecFin")
                        hdfvcCodEmp.Value = Request.QueryString("vcCodEmp")
                        hdfvcCodAre.Value = Request.QueryString("vcCodAre")
                        hdfvcCodCCO.Value = Request.QueryString("vcCodCCO")
                        hdfvcCodCue.Value = Request.QueryString("vcCodCue")
                        hdfvcIdEst.Value = Request.QueryString("vcIdEst")
                        hdfvcTipDes.Value = Request.QueryString("vcTipDes")
                        hdfvcCodPed.Value = Request.QueryString("vcCodPed")
                    End If


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
