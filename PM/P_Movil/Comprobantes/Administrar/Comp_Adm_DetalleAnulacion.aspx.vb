Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.Utilitarios

Public Class Comp_Adm_DetalleAnulacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim CronogramaPagoLog As BL_MOV_FAC_CronogramaPago_Log = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim IdCronogramaPago As String = Convert.ToInt32(Request.QueryString("IdCroPag"))

                    CronogramaPagoLog = New BL_MOV_FAC_CronogramaPago_Log(1, oUsuario.IdCliente)
                    Dim ds As DataSet = CronogramaPagoLog.MostrarDetalles(IdCronogramaPago)
                    CargarDatosGenerales(ds.Tables(0)(0))
                    Dim vcScript As String = CargarGrillaLog(ds.Tables(1))

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", vcScript, True)
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub CargarDatosGenerales(ByVal drGeneral As DataRow)
        lblEmpleado.Text = drGeneral("IdEmpleado") + " - " + drGeneral("vcNomEmp")
        lblTipoMotivo.Text = drGeneral("TipoMotivo")
        lblMotivo.Text = drGeneral("Motivo")
        lblLinea.Text = drGeneral("Linea").ToString()
        lblPeriodo.Text = drGeneral("Periodo")
        lblMonto.Text = drGeneral("Monto")
    End Sub

    Private Function CargarGrillaLog(ByVal dtLog As DataTable)
        Dim vcScript As String = "["
        For i As Integer = 0 To dtLog.Rows.Count - 1
            vcScript += "{ vcUsu: '" + dtLog(i)("vcUsu").ToString() + "', vcNom: '" + dtLog(i)("vcNom").ToString() + "', Fecha: '" + dtLog(i)("Fecha").ToString() + "' },"
        Next
        If vcScript.Length > 1 Then vcScript = vcScript.Substring(0, vcScript.Length - 1)
        vcScript += "]"
        vcScript = "var arLog = " + vcScript + ";"

        Return vcScript
    End Function

End Class