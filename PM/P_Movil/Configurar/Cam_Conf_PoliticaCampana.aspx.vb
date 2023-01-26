Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.Campana.BE
Imports VisualSoft.PCSistelMovil.Campana.BL

Partial Class P_Movil_Configurar_CAM_Conf_PoliticaCampana
    Inherits System.Web.UI.Page

#Region "Métodos"
    Dim oENT_MOV_CAM_Plan As ENT_MOV_CAM_Plan = Nothing
    Dim oBL_MOV_CAM_Plan As BL_MOV_CAM_Plan = Nothing

    Private Sub ListaPlanBase()
        oENT_MOV_CAM_Plan = New ENT_MOV_CAM_Plan
        oBL_MOV_CAM_Plan = New BL_MOV_CAM_Plan
        Try
            ddlPlanBase.DataSource = oBL_MOV_CAM_Plan.obtenerPlanBase(oENT_MOV_CAM_Plan)
            ddlPlanBase.DataValueField = "P_inCod"
            ddlPlanBase.DataTextField = "vcNom"
            ddlPlanBase.DataBind()
        Catch ex As Exception
            ddlPlanBase.Dispose() : ddlPlanBase = Nothing : oENT_MOV_CAM_Plan = Nothing : oBL_MOV_CAM_Plan = Nothing
        End Try
    End Sub
    Private Sub ListaPlanDependiente()
        oENT_MOV_CAM_Plan = New ENT_MOV_CAM_Plan
        oBL_MOV_CAM_Plan = New BL_MOV_CAM_Plan
        Try
            ddlPlanDep.DataSource = oBL_MOV_CAM_Plan.obtenerPlanDependiente(oENT_MOV_CAM_Plan)
            ddlPlanDep.DataValueField = "IdPlanDependiente"
            ddlPlanDep.DataTextField = "vcNom"



            ddlPlanDep.DataBind()
        Catch ex As Exception
            ddlPlanDep.Dispose() : ddlPlanDep = Nothing : ddlPlanDep = Nothing : ddlPlanDep = Nothing
        End Try
    End Sub

    'jbalmaceda 20160720 155000
    <WebMethod()>
    Public Shared Function CargarDatosPlanDependientePorId(ByVal p_Id%)
        Try
            Dim o_ENT_MOV_CAM_Plan = New ENT_MOV_CAM_Plan
            Dim o_BL_MOV_CAM_Plan = New BL_MOV_CAM_Plan
            Dim listaDatos As List(Of ENT_MOV_CAM_Plan) = o_BL_MOV_CAM_Plan.CargarDatosPlanDependientePorId(p_Id)
            Return listaDatos
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
#End Region

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        Dim CampanaConfiguracion As BL_MOV_CAM_CampanaConfiguracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    CampanaConfiguracion = New BL_MOV_CAM_CampanaConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oCampanaConfiguracion As MOV_CAM_CampanaConfiguracion
                    Dim IdCampana As Integer
                    Integer.TryParse(Request.QueryString("IdCampana"), IdCampana)

                    If IdCampana = 0 Then IdCampana = -1

                    hdfIdCampana.Value = IdCampana.ToString()

                    oCampanaConfiguracion = CampanaConfiguracion.MostrarPorCampa(IdCampana)

                    chkCancelarPedido.Checked = oCampanaConfiguracion.CancelarPedido
                    txtCancelarPedidoDiasMax.Text = oCampanaConfiguracion.CancelarPedidoDiasMax.Value.ToString()
                    txtCancelarPedidoDiasMaxFin.Text = oCampanaConfiguracion.CancelarPedidoDiasMaxFin.Value.ToString()
                    chkModificarPedido.Checked = oCampanaConfiguracion.ModificarPedido
                    chkReservarProducto.Checked = oCampanaConfiguracion.ReservarProducto
                    txtReservarProductoDiasMax.Text = oCampanaConfiguracion.ReservarProductoDiasMax.Value.ToString()
                    txtReservarProductoDiasMaxFin.Text = oCampanaConfiguracion.ReservarProductoDiasMaxFin.Value.ToString()
                    chkGeneraCodigo.Checked = oCampanaConfiguracion.GenerarCodigo
                    txtFormatoCodigo.Text = oCampanaConfiguracion.FormatoCodigo
                    chkMigrarContrato.Checked = oCampanaConfiguracion.MigrarContrato
                    rblstLugarEntrega.SelectedValue = oCampanaConfiguracion.LugarEntrega
                    txtDiasRecojo.Text = oCampanaConfiguracion.DiasRecojo.ToString()
                    txtDiasAntiguedad.Text = oCampanaConfiguracion.DiasAntiguedad.ToString()
                    txtCantidadPedidosxDia.Text = oCampanaConfiguracion.CantidadPedidosxDia.ToString()

                    'JBALMACEDA
                    chkElegirLugarEntrega.Checked = oCampanaConfiguracion.ElegirLugarEntrega
                    chkRenovarPlan.Checked = oCampanaConfiguracion.RenovarPlan



                    'JBALMACEDA 20160708 152500
                    chk_gadministrativos.Checked = oCampanaConfiguracion.GastosAdministrativos
                    txt_montogadmin.Text = oCampanaConfiguracion.MontoGastosAdministrativos
                    chk_usarPlanesPend.Checked = oCampanaConfiguracion.UsarPlanesDependientes

                    'actualizar en version 3.1 (7)
                    chkUsarContratoResumen.Checked = oCampanaConfiguracion.UsarContratoResumen
                    txtFechaGenConRes.Text = oCampanaConfiguracion.FechaGenerarContratoResumen
                    chkPortabilidad.Checked = oCampanaConfiguracion.Portabilidad
                    chkPortabilidadPlan.Checked = oCampanaConfiguracion.PortabilidadPlan

                    Call ListaPlanBase()
                    'JBALMACEDA 20160719 174900
                    Call ListaPlanDependiente()

                    Call CargarDatosPlanDependientePorId(2)

                    'Dim oCampanaConfiguracion As MOV_CAM_CampanaConfiguracion = CampanaConfiguracion.Mostrar(0)

                    'If oCampanaConfiguracion.IdCampanaConfiguracion <> 0 Then
                    '    hdfIdCampanaConfiguracion.Value = oCampanaConfiguracion.IdCampanaConfiguracion
                    'End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaConfiguracion IsNot Nothing Then
                CampanaConfiguracion.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdCampanaConfiguracion As String) As MOV_CAM_CampanaConfiguracion
        Dim CampanaConfiguracion As BL_MOV_CAM_CampanaConfiguracion = Nothing

        Try
            CampanaConfiguracion = New BL_MOV_CAM_CampanaConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return CampanaConfiguracion.Mostrar(Integer.Parse(p_IdCampanaConfiguracion))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaConfiguracion IsNot Nothing Then
                CampanaConfiguracion.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oCampanaConfiguracion As String) As Integer
        Dim CampanaConfiguracion As BL_MOV_CAM_CampanaConfiguracion = Nothing

        Try
            CampanaConfiguracion = New BL_MOV_CAM_CampanaConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer

            'Dim oCampanaConfiguracion As MOV_CAM_CampanaConfiguracion = oSerializer.Deserialize(Of MOV_CAM_CampanaConfiguracion)(p_oCampanaConfiguracion)
            Dim oCampanaConfiguracion As MOV_CAM_CampanaConf = oSerializer.Deserialize(Of MOV_CAM_CampanaConf)(p_oCampanaConfiguracion)
            Return CampanaConfiguracion.Guardar(oCampanaConfiguracion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaConfiguracion IsNot Nothing Then
                CampanaConfiguracion.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ListarLugarEntrega() As List(Of Object)
        Try
            Dim lstLugarEntrega As New List(Of Object)

            Dim dict1 As New Dictionary(Of String, Object)
            dict1.Add("texto", "Centros de atención del operador")
            dict1.Add("valor", "C")
            lstLugarEntrega.Add(dict1)
            Dim dict2 As New Dictionary(Of String, Object)
            dict2.Add("texto", "Oficinas propias")
            dict2.Add("valor", "O")
            lstLugarEntrega.Add(dict2)

            Return lstLugarEntrega

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


End Class
