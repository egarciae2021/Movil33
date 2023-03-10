Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data

Partial Class P_Movil_Administrar_Cam_PedidosTipoDescarga
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                If (Not IsNothing(Request.QueryString("vcOpc"))) Then
                    hdfinIdCam.Value = Request.QueryString("inIdCam")
                    hdfvcNomSit.Value = Request.QueryString("vcNomSit")
                    hdfvcFecIni.Value = Request.QueryString("vcFecIni")
                    hdfvcFecFin.Value = Request.QueryString("vcFecFin")
                    hdfvcCodEmp.Value = Request.QueryString("vcCodEmp")
                    hdfvcCodAre.Value = Request.QueryString("vcCodAre")
                    hdfvcCodCCO.Value = Request.QueryString("vcCodCCO")
                    hdfvcCodCue.Value = Request.QueryString("vcCodCue")
                    hdfvcIdEst.Value = Request.QueryString("vcIdEst")
                    hdfvcOpc.Value = Request.QueryString("vcOpc")
                    hdfvcCodPed.Value = Request.QueryString("vcCodPed")
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class
