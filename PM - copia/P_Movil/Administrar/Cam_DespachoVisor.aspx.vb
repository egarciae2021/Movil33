Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services

Partial Class P_Movil_Administrar_Cam_DespachoVisor
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                CargarCombos()
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub CargarCombos()
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Estado As BL_MOV_Estado = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Estado = New BL_MOV_Estado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            UtilitarioWeb.Dataddl(ddlCampana, Campana.Listar(-1, "<Todos>"), "Descripcion", "IdCampana")
            UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.ListarPorLineaTipo(2, -1, "<Todos>"), "vcNom", "P_vcCod")
            UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarPorModulo(7, 7, -1, "<Todos>"), "vcNom", "P_inCod")

            Cuenta.Dispose()
            Estado.Dispose()

            ddlSituacion.Items.Add(New ListItem("<Todos>", "-1"))
            ddlSituacion.Items.Add(New ListItem("Baja", "Baja"))
            ddlSituacion.Items.Add(New ListItem("Nuevo", "Nuevo"))
            ddlSituacion.Items.Add(New ListItem("Renovación", "Renovacion"))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarDespacho(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Try
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarDespachoDetalles(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Try
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class
