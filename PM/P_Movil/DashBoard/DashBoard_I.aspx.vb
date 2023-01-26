Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
Imports Utilitario
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria
Imports DevExpress.Web.ASPxPivotGrid
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_DashBoard_DashBoard_I
    Inherits System.Web.UI.Page

    Private Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim dash_Solicitudes As BL_DashBoard_Solicitudes = Nothing
        Try

            If Not IsPostBack Then
                ttgInfoEstado.Mensaje = "Este cuadro solo muestra información de solicitudes que cambiaron el estado(Por Aprobar, Aprobadas o Rechazadas) durante el periodo determinado."
                ttginfoHistorico.Mensaje = "Este cuadro solo muestra información de solicitudes que se crearon en el periodo determinado."

                Dim objUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)
                Me.hdfIdUsuarioLogeado.Value = objUsuario.P_inCod
                Me.LlenarDdlMesesAtras(Me.ddlPeriodo, 11)
                Me.LlenarDdlMesesAtras(Me.ddlPeriodoProceso, 11)

                If Request.QueryString("pe") IsNot Nothing Then
                    ddlPeriodo.SelectedValue = Request.QueryString("pe").ToString
                    ddlPeriodoProceso.SelectedValue = Request.QueryString("pe").ToString
                Else
                    ddlPeriodo.SelectedValue = DateTime.Now.AddMonths(-1).ToString("MMyy")
                    ddlPeriodoProceso.SelectedValue = DateTime.Now.AddMonths(-1).ToString("MMyy")
                End If

                If TipoSolicitud.EsResponsableAprobacion() Then hdfIdTipSolAprLeer.Value = TipoSolicitud.ListarTipoSolicitudGrupo(1) Else hdfIdTipSolAprLeer.Value() = "0"

                hdfIdTipSolAprResp.Value = TipoSolicitud.ListarTipoSolicitudAprobacion()
                If UtilitarioWeb.Seguridad.EsAdministrador() Then hdfCodEmp.Value = "-1" Else hdfCodEmp.Value = objUsuario.Empleado.P_vcCod
                If objUsuario.CodIntResp = "" And Seguridad.EsAdministrador Then hdfCodIntRes.Value = "000" Else hdfCodIntRes.Value = objUsuario.CodIntResp

                hdfIdTipSolTecAsi.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
                hdfIdTipSolTecPro.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
                hdfIdTipSolTecCulAnu.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)
                hdfIdTipSolResTec.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnicoResponsable()

                If Seguridad.EsAdministrador() Or (TipoSolicitud.EsTecnico() And TipoSolicitud.EsResponsableAprobacion()) Then
                    hdfTapsMostrar.Value = "1"
                ElseIf TipoSolicitud.EsTecnico() Then
                    hdfTapsMostrar.Value = "2"
                ElseIf TipoSolicitud.EsResponsableAprobacion() Then
                    hdfTapsMostrar.Value = "3"
                End If

                dash_Solicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, objUsuario.IdCliente)

                'Dim solicitudes_Pie As String = dash_Solicitudes.ObtieneCantidadSolicitudes_Pie(Now.Year.ToString + Now.Month.ToString.PadLeft(2, "0"), objUsuario.P_inCod)
                'Dim solicitudes_Pie_proceso As String = dash_Solicitudes.ObtieneCantidadSolicitudes_Pie_proceso(Now.Year.ToString + Now.Month.ToString.PadLeft(2, "0"), objUsuario.P_inCod)
                Dim solicitudes_Pie As String = dash_Solicitudes.ObtieneCantidadSolicitudes_Pie(ddlPeriodo.SelectedValue, objUsuario.P_inCod, hdfIdTipSolAprLeer.Value, _
                                                            hdfIdTipSolAprResp.Value, hdfCodEmp.Value, hdfCodIntRes.Value, oCultura)
                Dim solicitudes_Pie_proceso As String = dash_Solicitudes.ObtieneCantidadSolicitudes_Pie_proceso(ddlPeriodoProceso.SelectedValue, objUsuario.P_inCod, _
                                                            hdfIdTipSolTecAsi.Value, hdfIdTipSolTecPro.Value, hdfIdTipSolTecCulAnu.Value, hdfCodEmp.Value, oCultura)
                Dim solicitudes_Umbrales As String = dash_Solicitudes.ObtieneCantidadUmbralesAprobacion(4)

                Dim script As String = "var Solicitudes_Pie = '" + solicitudes_Pie + "'; "
                script = script + " var Solicitudes_Umbrales = '" + solicitudes_Umbrales + "'; "
                script = script + " var Solicitudes_Pie_Proceso = '" + solicitudes_Pie_proceso + "'; "
                'script = script + " var Incidencias_Tipificacion = '" + incidencias_tipificacion + "'; "
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "ScriptKey", script, True)



            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash_Solicitudes IsNot Nothing Then dash_Solicitudes.Dispose()
        End Try
    End Sub

    Private Sub LlenarDdlMesesAtras(ByRef ddl As DropDownList, ByVal prMesesAtras As Integer)
        For index = 0 To prMesesAtras
            'Dim mes As Date = Date.Now.AddMonths(-index)

            Dim vcFechaActual As String = UtilitarioWeb.ObtieneFechaHoraANSIServidor(False)
            Dim inAnio As Integer = vcFechaActual.Substring(0, 4)
            Dim inMes As Integer = vcFechaActual.Substring(4, 2)
            Dim inDia As Integer = vcFechaActual.Substring(6, 2)
            Dim mes As New DateTime(inAnio, inMes, inDia)
            mes = mes.AddMonths(-index)

            Select Case mes.Month
                Case 1
                    ddl.Items.Add(New ListItem("Ene " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 2
                    ddl.Items.Add(New ListItem("Feb " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 3
                    ddl.Items.Add(New ListItem("Mar " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 4
                    ddl.Items.Add(New ListItem("Abr " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 5
                    ddl.Items.Add(New ListItem("May " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 6
                    ddl.Items.Add(New ListItem("Jun " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 7
                    ddl.Items.Add(New ListItem("Jul " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 8
                    ddl.Items.Add(New ListItem("Ago " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 9
                    ddl.Items.Add(New ListItem("Sep " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 10
                    ddl.Items.Add(New ListItem("Oct " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 11
                    ddl.Items.Add(New ListItem("Nov " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case Else
                    ddl.Items.Add(New ListItem("Dic " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
            End Select
        Next
    End Sub


    <WebMethod()>
    Public Shared Function ActualizarPie(ByVal prPeriodo As String, ByVal prIdUsuario As Integer, ByVal vcTipSolAprLeer As String, ByVal vcTipSolAprResp As String, _
                                         ByVal vcCodEmp As String, ByVal vcCodIntRes As String) As String

        Dim objBlDashSolicitudes As BL_DashBoard_Solicitudes = Nothing
        Try
            objBlDashSolicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return objBlDashSolicitudes.ObtieneCantidadSolicitudes_Pie(prPeriodo, prIdUsuario, vcTipSolAprLeer, vcTipSolAprResp, vcCodEmp, vcCodIntRes)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashSolicitudes IsNot Nothing Then objBlDashSolicitudes.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ActualizarPieProceso(ByVal prPeriodo As String, ByVal prIdUsuario As Integer) As String

        Dim objBlDashSolicitudes As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim objUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcTipSolTecAsi As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
            Dim vcTipSolTecPro As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
            Dim vcTipSolTecCulAnu As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)
            Dim vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = objUsuario.Empleado.P_vcCod
            objBlDashSolicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return objBlDashSolicitudes.ObtieneCantidadSolicitudes_Pie_proceso(prPeriodo, prIdUsuario, vcTipSolTecAsi, vcTipSolTecPro, vcTipSolTecCulAnu, vcCodEmp)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashSolicitudes IsNot Nothing Then objBlDashSolicitudes.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarUmbrales(ByVal prTipoUmbral As Integer) As String

        Dim objBlDashSolicitudes As BL_DashBoard_Solicitudes = Nothing
        Try
            objBlDashSolicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return objBlDashSolicitudes.ObtieneCantidadUmbralesAprobacion(prTipoUmbral)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashSolicitudes IsNot Nothing Then objBlDashSolicitudes.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerUmbralesAprobados(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal prPeriodo As String, ByVal vcTipSolAprLeer As String, _
                                                    ByVal vcTipSolAprResp As String, ByVal vcCodIntRes As String) As Object

        Dim objBlDashSolicitudes As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim objUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = objUsuario.Empleado.P_vcCod

            objBlDashSolicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return JQGrid.DatosJSON(objBlDashSolicitudes.ObtenerUmbralesAprobados(prPeriodo, objUsuario.P_inCod, vcTipSolAprLeer, vcTipSolAprResp, vcCodEmp, vcCodIntRes), inPagTam, inPagAct)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashSolicitudes IsNot Nothing Then objBlDashSolicitudes.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerUmbralesPorAprobar(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcTipSolAprLeer As String, ByVal vcTipSolAprResp As String, _
                                                    ByVal vcCodIntRes As String, ByVal prPeriodo As String) As Object

        Dim objBlDashSolicitudes As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim objUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = objUsuario.Empleado.P_vcCod

            objBlDashSolicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return JQGrid.DatosJSON(objBlDashSolicitudes.ObtenerUmbralesPorAprobar(objUsuario.P_inCod, vcTipSolAprLeer, vcTipSolAprResp, vcCodEmp, vcCodIntRes, prPeriodo), inPagTam, inPagAct)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashSolicitudes IsNot Nothing Then objBlDashSolicitudes.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerUmbrales_deProceso(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object

        Dim objBlDashSolicitudes As BL_DashBoard_Solicitudes = Nothing
        Try
            Dim objUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcTipSolTecAsi As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
            Dim vcTipSolTecPro As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
            Dim vcTipSolTecCulAnu As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)
            Dim vcCodEmp = ""
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = objUsuario.Empleado.P_vcCod

            objBlDashSolicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return JQGrid.DatosJSON(objBlDashSolicitudes.ObtenerUmbrales_deProceso(objUsuario.P_inCod, vcTipSolTecAsi, vcTipSolTecPro, vcTipSolTecCulAnu, vcCodEmp), inPagTam, inPagAct)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashSolicitudes IsNot Nothing Then objBlDashSolicitudes.Dispose()
        End Try
    End Function



    Private Sub ASPxPivotGrid2_DataBound(sender As Object, e As System.EventArgs) Handles ASPxPivotGrid2.DataBound
        ASPxPivotGrid2 = CType(sender, ASPxPivotGrid)

        If (ASPxPivotGrid2.CreateDrillDownDataSource().RowCount > 0) Then
            ASPxPivotGrid2.Visible = True
        Else
            ASPxPivotGrid2.Visible = False
        End If
    End Sub

    Private Sub ASPxPivotGrid1_DataBound(sender As Object, e As System.EventArgs) Handles ASPxPivotGrid1.DataBound
        ASPxPivotGrid1 = CType(sender, ASPxPivotGrid)

        If (ASPxPivotGrid1.CreateDrillDownDataSource().RowCount > 0) Then
            ASPxPivotGrid1.Visible = True
        Else
            ASPxPivotGrid1.Visible = False
        End If
    End Sub

    Private Sub ASPxPivotGrid3_DataBound(sender As Object, e As System.EventArgs) Handles ASPxPivotGrid3.DataBound
        ASPxPivotGrid3 = CType(sender, ASPxPivotGrid)

        If (ASPxPivotGrid3.CreateDrillDownDataSource().RowCount > 0) Then
            ASPxPivotGrid3.Visible = True
        Else
            ASPxPivotGrid3.Visible = False
        End If
    End Sub

    Private Sub DevPivotSolicitudesPeriodo_DataBound(sender As Object, e As System.EventArgs) Handles DevPivotSolicitudesPeriodo.DataBound
        DevPivotSolicitudesPeriodo = CType(sender, ASPxPivotGrid)

        If (DevPivotSolicitudesPeriodo.CreateDrillDownDataSource().RowCount > 0) Then
            DevPivotSolicitudesPeriodo.Visible = True
        Else
            DevPivotSolicitudesPeriodo.Visible = False
        End If
    End Sub

    Private Sub DevPivotSolicitudesResponsable_DataBound(sender As Object, e As System.EventArgs) Handles DevPivotSolicitudesResponsable.DataBound
        DevPivotSolicitudesResponsable = CType(sender, ASPxPivotGrid)

        If (DevPivotSolicitudesResponsable.CreateDrillDownDataSource().RowCount > 0) Then
            DevPivotSolicitudesResponsable.Visible = True
        Else
            DevPivotSolicitudesResponsable.Visible = False
        End If
    End Sub

    Private Sub DevPivotSolicitudesTotalPeriodo_DataBound(sender As Object, e As System.EventArgs) Handles DevPivotSolicitudesTotalPeriodo.DataBound
        DevPivotSolicitudesTotalPeriodo = CType(sender, ASPxPivotGrid)

        If (DevPivotSolicitudesTotalPeriodo.CreateDrillDownDataSource().RowCount > 0) Then
            DevPivotSolicitudesTotalPeriodo.Visible = True
        Else
            DevPivotSolicitudesTotalPeriodo.Visible = False
        End If
    End Sub

    Private Sub ASPxPivotGrid1_FieldValueDisplayText(sender As Object, e As DevExpress.Web.ASPxPivotGrid.PivotFieldDisplayTextEventArgs) Handles ASPxPivotGrid1.FieldValueDisplayText, ASPxPivotGrid2.FieldValueDisplayText, ASPxPivotGrid3.FieldValueDisplayText, DevPivotSolicitudesPeriodo.FieldValueDisplayText, DevPivotSolicitudesResponsable.FieldValueDisplayText, DevPivotSolicitudesTotalPeriodo.FieldValueDisplayText
        If e.ValueType = DevExpress.XtraPivotGrid.PivotGridValueType.GrandTotal Then
            If e.IsColumn Then
                e.DisplayText = "Total General"
            Else
                e.DisplayText = "Total General"
            End If
        End If
    End Sub
End Class
