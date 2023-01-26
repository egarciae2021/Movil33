Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports UtilitarioWeb

Partial Class P_Movil_Administrar_Cam_DespachoVisorStaff
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                txtFechaInicio.Text = DateTime.Now.ToString("01/MM/yyyy")
                txtFechaFin.Text = DateTime.Now.ToString("dd/MM/yyyy")
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarDespacho(ByVal inPagTam As Integer, ByVal inPagAct As Integer,
                                          ByVal vcOrdCol As String, ByVal Filtros As String) As JQGridJsonResponse
        Dim Campana As BL_MOV_CAM_CampanaDespacho = Nothing
        Try
            Filtros = Filtros.Replace("|", "'")
            Campana = New BL_MOV_CAM_CampanaDespacho(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = Campana.ListarDespachoEmpleados(inPagTam, inPagAct, vcOrdCol, Filtros)

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                          Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then Campana.Dispose()
        End Try
    End Function


End Class
