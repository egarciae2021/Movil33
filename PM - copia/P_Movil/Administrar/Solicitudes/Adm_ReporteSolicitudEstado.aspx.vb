Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL

Partial Class P_Movil_Administrar_Solicitudes_Adm_ReporteSolicitudEstado
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            hdfTabSolicitud.Value = "MOV_Solicitud"
            hdfTipoReporte.Value = "2"

            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    txtFechaInicio.Text = String.Format("{0:dd/MM/yyyy}", New DateTime(Now.Year, Now.Month, 1))
                    txtFechaFin.Text = String.Format("{0:dd/MM/yyyy}", Now) '.Year, Now.Month + 1, 1).AddDays(-1))

                    Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim Estado As BL_MOV_Estado = New BL_MOV_Estado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    UtilitarioWeb.Dataddl(ddlTipo, Solicitud.ListarTipo(0, "<Todos>"), "vcNomTipSol", "inCodTipSol")
                    Solicitud.Dispose()
                    UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarPorModulo(2, 3, 0, "<Todos>"), "vcNom", "P_inCod")
                    Estado.Dispose()
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Sub
End Class