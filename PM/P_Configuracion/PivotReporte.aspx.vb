Imports Microsoft.VisualBasic
Imports System
Imports System.Collections
Imports System.Collections.Generic
Imports System.Data
Imports System.Diagnostics

Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun

Imports System.Data.SqlClient
Imports System.ComponentModel
Imports System.Drawing
Imports System.Drawing.Imaging
Imports System.Web
Imports System.Web.SessionState
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Web.UI.HtmlControls
Imports Microsoft.Win32
Imports System.Reflection
Imports System.Runtime.Serialization
Imports System.IO
Imports System.Web.Routing
Imports System.Web.Compilation
Imports System.Configuration
Imports System.Web.Security
Imports System.Web.UI.WebControls.WebParts
Imports DevExpress.Web.ASPxPivotGrid
Imports DevExpress.XtraCharts
Imports DevExpress.XtraCharts.Web
Imports DevExpress.Web.ASPxPivotGrid.HtmlControls
Imports DevExpress.Utils
Imports DevExpress.WebUtils
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Util
Imports Ionic.Zip

Imports VisualSoft.PCSistelMovil.General.BE
Imports DevExpress.XtraPivotGrid


Partial Class P_Configuracion_Default
    Inherits System.Web.UI.Page


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            UtilitarioWeb.ActualizarCultura(oCultura)

            If IsNothing(oUsuario) Then
                'Dim Sscript As String = "window.parent.location.reload()"
                Dim Sscript As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Sscript, True)
            Else
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try


        ''fieldCODCOST.CellFormat.FormatString = bpage.culturaActualizadaConDecimales(bpage.longitudCortaDecimales)

        If Session.Count = 0 Then
            'Fin sesion...
            Response.Redirect("../login.aspx")
        End If

        hydCodEmp.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
        'Me.hdfCodigoEmpleado.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod


        If Not Page.IsPostBack Then
            Dim dias As Integer = 0
            dias = DateTime.Now.Day - 1
            'Modificacion Realizada por Mauricio Gonzalo Benavides Loli. 20/02/2013
            'txtDiaInicial.Text = DateTime.Now.AddDays(-dias).ToString("dd/MM/yyyy") '.ToString(bpage.obtenerFormatoFecha())

            If DateTime.Now.Month = 1 Then
                txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day - 30).ToString("dd/MM/yyyy") ' primero dia del mes de dic del año anterior al actual
            Else
                txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day + 1 - DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month - 1)).ToString("dd/MM/yyyy") 'primer dia del mea anterior al actual
            End If

            hydCodInt.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt

            '= String.Format("{0:dd/MM/yyyy}", );
            'txtDiaFinal.Text = DateTime.Now.ToString("dd/MM/yyyy") '.ToString(bpage.obtenerFormatoFecha())
            txtDiaFinal.Text = DateTime.Now.AddDays(-DateTime.Now.Day).ToString("dd/MM/yyyy") 'Ultimo dia del mes anterior al actual
            '.Text = String.Format("{0:dd/MM/yyyy}", DateTime.Now);
            'Hasta aqui.
            Dim restrictedTypes As ViewType() = {ViewType.PolarArea, ViewType.PolarLine, ViewType.SideBySideGantt, ViewType.SideBySideRangeBar, ViewType.RangeBar, ViewType.Gantt, _
             ViewType.PolarPoint, ViewType.Stock, ViewType.CandleStick, ViewType.Bubble}
            Dim addCombo As Boolean = True 'agregado 30/07/2014 (quitar los tipo de graficos 3d)
            For Each type As ViewType In System.[Enum].GetValues(GetType(ViewType))
                If Array.IndexOf(Of ViewType)(restrictedTypes, type) >= 0 Then
                    Continue For
                End If
                addCombo = True
                Dim strLabel As String = type.ToString()

                Select Case type.ToString()
                    Case "Bar"
                        strLabel = "Barra"
                        Exit Select
                    Case "StackedBar"
                        strLabel = "Barra Sobrepuesta"
                        Exit Select
                    Case "FullStackedBar"
                        strLabel = "Barra 100% Sobrepuesta"
                        Exit Select
                    Case "SideBySideStackedBar"
                        strLabel = "Barra Sobrepuesta Lado a Lado"
                        Exit Select
                    Case "SideBySideFullStackedBar"
                        strLabel = "Barra 100% Sobrepuesta Lado a Lado"
                        Exit Select
                    Case "Pie"
                        strLabel = "Circular"
                        Exit Select
                    Case "Doughnut"
                        strLabel = "Anillo"
                        Exit Select
                    Case "Funnel"
                        strLabel = "Embudo"
                        Exit Select
                    Case "Point"
                        strLabel = "Punto"
                        Exit Select
                    Case "Line"
                        strLabel = "Línea"
                        Exit Select
                    Case "StackedLine"
                        strLabel = "Línea Sobrepuesta"
                        Exit Select
                    Case "FullStackedLine"
                        strLabel = "Línea 100% Sobrepuesta"
                        Exit Select
                    Case "StepLine"
                        strLabel = "Línea Escalonada"
                        Exit Select
                    Case "Spline"
                        strLabel = "Línea Curva"
                        Exit Select
                    Case "ScatterLine"
                        strLabel = "Dispersión con Línea"
                        Exit Select
                    Case "SwiftPlot"
                        strLabel = "Línea Rápida"
                        Exit Select
                    Case "Area"
                        strLabel = "Área"
                        Exit Select
                    Case "StepArea"
                        strLabel = "Área Escalonada"
                        Exit Select
                    Case "SplineArea"
                        strLabel = "Área Curva"
                        Exit Select
                    Case "StackedArea"
                        strLabel = "Área Sobrepuesta"
                        Exit Select
                    Case "StackedSplineArea"
                        strLabel = "Área Curva Sobrepuesta"
                        Exit Select
                    Case "FullStackedArea"
                        strLabel = "Área 100% Sobrepuesta"
                        Exit Select
                    Case "FullStackedSplineArea"
                        strLabel = "Área Curva 100% Sobrepuesta"
                        Exit Select
                    Case "RangeArea"
                        strLabel = "Área Rango"
                        Exit Select
                    Case "RadarPoint"
                        strLabel = "Radar - Punto"
                        Exit Select
                    Case "RadarLine"
                        strLabel = "Radar - Línea"
                        Exit Select
                    Case "RadarArea"
                        strLabel = "Radar - Área"
                        Exit Select
                    Case "Bar3D"
                        strLabel = "Barra 3D"
                        addCombo = False
                        Exit Select
                    Case "StackedBar3D"
                        strLabel = "Barra Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "FullStackedBar3D"
                        strLabel = "Barra 100% Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "ManhattanBar"
                        strLabel = "Barra Manhattan"
                        addCombo = False
                        Exit Select
                    Case "SideBySideStackedBar3D"
                        strLabel = "Barra Sobrepuesta Lado a Lado 3D"
                        addCombo = False
                        Exit Select
                    Case "SideBySideFullStackedBar3D"
                        strLabel = "Barra 100% Sobrepuesta Lado a Lado 3D"
                        addCombo = False
                        Exit Select
                    Case "Pie3D"
                        strLabel = "Circular 3D"
                        addCombo = False
                        Exit Select
                    Case "Doughnut3D"
                        strLabel = "Anillo 3D"
                        addCombo = False
                        Exit Select
                    Case "Funnel3D"
                        strLabel = "Embudo 3D"
                        addCombo = False
                        Exit Select
                    Case "Line3D"
                        strLabel = "Línea 3D"
                        addCombo = False
                        Exit Select
                    Case "StackedLine3D"
                        strLabel = "Línea Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "FullStackedLine3D"
                        strLabel = "Línea 100% Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "StepLine3D"
                        strLabel = "Línea Escalonada 3D"
                        addCombo = False
                        Exit Select
                    Case "Area3D"
                        strLabel = "Área 3D"
                        addCombo = False
                        Exit Select
                    Case "StackedArea3D"
                        strLabel = "Área Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "FullStackedArea3D"
                        strLabel = "Área 100% Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "StepArea3D"
                        strLabel = "Área Escalonada 3D"
                        addCombo = False
                        Exit Select
                    Case "Spline3D"
                        strLabel = "Línea Curva 3D"
                        addCombo = False
                        Exit Select
                    Case "SplineArea3D"
                        strLabel = "Área Curva 3D"
                        addCombo = False
                        Exit Select
                    Case "StackedSplineArea3D"
                        strLabel = "Área Curva Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "FullStackedSplineArea3D"
                        strLabel = "Área Curva 100% Sobrepuesta 3D"
                        addCombo = False
                        Exit Select
                    Case "RangeArea3D"
                        strLabel = "Área Rango 3D"
                        addCombo = False
                        Exit Select
                End Select
                If addCombo Then ChartType.Items.Add(strLabel, type.ToString())
            Next

            ChartType.SelectedItem = ChartType.Items.FindByValue(ViewType.Line.ToString())
            SetChartType(ChartType.SelectedItem.Value.ToString())

            WebChart.SeriesDataMember = "Series"
            WebChart.SeriesTemplate.ArgumentDataMember = "Arguments"
            WebChart.SeriesTemplate.ValueDataMembers.AddRange(New String() {"Values"})


            ASPxPivotGrid1.OptionsChartDataSource.ProvideDataByColumns = True
            ASPxPivotGrid1.OptionsChartDataSource.ProvideColumnGrandTotals = False
            ASPxPivotGrid1.OptionsChartDataSource.ProvideRowGrandTotals = False
            ASPxPivotGrid1.OptionsChartDataSource.ProvideColumnTotals = False
            ASPxPivotGrid1.OptionsChartDataSource.ProvideRowTotals = False
            ASPxPivotGrid1.CustomizationFieldsVisible = False
            ASPxPivotGrid1.CustomizationFieldsLeft = 1
            ASPxPivotGrid1.CustomizationFieldsLeft = 1
            ASPxPivotGrid1.OptionsCustomization.CustomizationWindowHeight = 350
            ASPxPivotGrid1.OptionsCustomization.CustomizationWindowWidth = 230


            hdTipo.Value = "new"
            lblNombreReporte.Text = " - [Nuevo Reporte]"
            hdCodReporte.Value = ""
            'Valida QueryString....
            If Request.QueryString("codreporte") IsNot Nothing AndAlso Request.QueryString("codreporte").ToString() <> "" Then
                Dim codreporte As Int32 = Convert.ToInt32(Request.QueryString("codreporte").ToString())
                hdTipo.Value = "edit"

                Dim _idUsuario As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod

                'Obtener Datos MiReporte
                Dim oBL_MOV_Reporte As BL_MOV_Reporte = New BL_MOV_Reporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim objReporte As ENT_MOV_Reporte = oBL_MOV_Reporte.GetReporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, _idUsuario, codreporte)
                oBL_MOV_Reporte.Dispose()

                hdCodReporte.Value = codreporte.ToString()
                lblNombreReporte.Text = " - " + objReporte.Nombre
                lblNombreReporte.Visible = True

                Try
                    If objReporte.dtFechaInicio.Trim() <> "" Then
                        'Modificacion Realizada por Mauricio Gonzalo Benavides Loli. 20/02/2013
                        'Hasta aqui.
                        'txtDiaInicial.Text = [String].Format(bpage.obtenerFormatoFecha(), New DateTime(Convert.ToInt32(objReporte.dtFechaInicio.Substring(0, 4)), Convert.ToInt32(objReporte.dtFechaInicio.Substring(4, 2)), Convert.ToInt32(objReporte.dtFechaInicio.Substring(6, 2))))

                        txtDiaInicial.Text = Convert.ToDateTime(objReporte.dtFechaInicio)
                    End If
                Catch ex As Exception
                End Try

                Try
                    If objReporte.dtFechaFin.Trim() <> "" Then
                        'Modificacion Realizada por Mauricio Gonzalo Benavides Loli. 20/02/2013
                        'Hasta aqui.
                        'txtDiaFinal.Text = [String].Format(bpage.obtenerFormatoFecha(), New DateTime(Convert.ToInt32(objReporte.dtFechaFin.Substring(0, 4)), Convert.ToInt32(objReporte.dtFechaFin.Substring(4, 2)), Convert.ToInt32(objReporte.dtFechaFin.Substring(6, 2))))

                        txtDiaFinal.Text = Convert.ToDateTime(objReporte.dtFechaFin)
                        '[String].Format(Convert.ToInt32(objReporte.dtFechaFin))
                    End If
                Catch ex As Exception
                End Try


                CargarReporte(codreporte)

            End If
        Else
            'odsSumario.DataBind()

            'Dim dtDatos As DataTable = VisualSoft.Suite80.BL.BL_MOV_Reporte.GetDSReportesPivot(hydPeriodo.Value, _
            '                                                                                   hydCodEmp.Value, _
            '                                                                                   ddlRegionHacia.SelectedValue, _
            '                                                                                   ddlRegionDesde.SelectedValue, _
            '                                                                                   hydCodInt.Value)


            If Request.Form("__EVENTTARGET") IsNot Nothing AndAlso Request.Form("__EVENTTARGET").ToString() = "grabarreporte" Then
                GrabarNuevoReporte(Request.Form("__EVENTARGUMENT"), 0, True)
            End If
            If Request.Form("__EVENTTARGET") IsNot Nothing AndAlso Request.Form("__EVENTTARGET").ToString() = "grabarreportecomo" Then
                GrabarNuevoReporte(Request.Form("__EVENTARGUMENT"), 0, False)
            End If
            If Request.Form("__EVENTTARGET") IsNot Nothing AndAlso Request.Form("__EVENTTARGET").ToString() = "actualizarreporte" Then
                GrabarNuevoReporte(Request.Form("__EVENTARGUMENT"), Convert.ToInt32(hdCodReporte.Value), True)

            End If
        End If

        CargarPeriodos()

        'esto es una prueba para ingresar las plantillas

        Session("switche") = 0
        'UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Dim script As String = "window.parent.$('#dvCargando').hide();"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    End Sub

    Public Sub CargarReporte(ByVal codreporte As Integer)
        Dim dtDatos As New DataTable()
        'Dim BLReporte As BL_MOV_Reporte = BL_MOV_Reporte.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        dtDatos = BL_MOV_Reporte.GetDSRegistrosReportes(0, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod, codreporte)

        For Each campo As DevExpress.Web.ASPxPivotGrid.PivotGridField In ASPxPivotGrid1.Fields
            Dim drFilas As DataRow() = Nothing

            drFilas = dtDatos.[Select](String.Format(" CAMPO ='{0}' ", campo.FieldName.ToString()))


            If drFilas.Length > 0 Then

                For Each dr As DataRow In drFilas
                    Select Case dr("ubicacion").ToString()

                        Case "Columna"
                            campo.Area = DevExpress.XtraPivotGrid.PivotArea.ColumnArea
                            Exit Select
                        Case "Fila"
                            campo.Area = DevExpress.XtraPivotGrid.PivotArea.RowArea
                            Exit Select
                        Case "Dato"
                            campo.Area = DevExpress.XtraPivotGrid.PivotArea.DataArea
                            Exit Select
                        Case "Filtro"
                            campo.Area = DevExpress.XtraPivotGrid.PivotArea.FilterArea

                            Exit Select
                    End Select

                    Dim objeto As Object() = dr("filtros").ToString().Split(";"c)
                    If (campo.FieldName.ToString() <> "NIVEL") And (campo.FieldName.ToString() <> "YEAR") And (campo.FieldName.ToString() <> "FECHA_LARGA") And (campo.FieldName.ToString() <> "LLAMADAS") And (campo.FieldName.ToString() <> "DURACION") And (campo.FieldName.ToString() <> "COSTO") And (objeto(0) <> "") Then
                        campo.FilterValues.ValuesIncluded = objeto
                    End If

                    campo.Visible = True

                    campo.AreaIndex = Convert.ToInt32(dr("indexado").ToString())

                Next
            ElseIf campo.FieldName = "LLAMADAS" Or campo.FieldName = "DURACION" Or campo.FieldName = "COSTO" Then
                campo.Area = DevExpress.XtraPivotGrid.PivotArea.DataArea

                campo.Visible = False
            Else
                campo.Area = DevExpress.XtraPivotGrid.PivotArea.FilterArea
                campo.Visible = False
            End If
        Next


        'Carga...
        Dim Filtros As New Object()
        Dim objReporte As New ENT_MOV_Reporte()
        dtDatos = New DataTable()

        objReporte.codemp = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
        objReporte.codusuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod

        dtDatos = BL_MOV_Reporte.GetDSRegistrosReportes(objReporte.codemp, objReporte.codusuario, codreporte)
        For Each campo As DevExpress.Web.ASPxPivotGrid.PivotGridField In ASPxPivotGrid1.Fields
            Dim drFilas As DataRow() = Nothing
            drFilas = dtDatos.[Select](" CAMPO ='" + campo.FieldName.ToString() + "'")
            If campo.Visible = True Then
                For Each dr As DataRow In drFilas
                    If drFilas.Length > 0 Then
                        campo.AreaIndex = Convert.ToInt32(dr("indexado").ToString())
                    End If
                Next
            End If
        Next

    End Sub

    Public Sub CargarPeriodos()
        Dim strFecha1 As String = Nothing
        Dim strFecha2 As String = Nothing
        ' Dim bpage As New BasePage()

        'Modificacion Realizada por Mauricio Gonzalo Benavides Loli. 20/02/2013
        'txtDiaInicial.Text = DateTime.Parse(txtDiaInicial.Text).ToString(bpage.obtenerFormatoFecha())
        'txtDiaInicial.Text = DateTime.Parse(txtDiaInicial.Text).ToString(bpage.obtenerFormatoFecha())
        Dim dtpFI As System.DateTime = Convert.ToDateTime(txtDiaInicial.Text)
        Dim dtpFF As System.DateTime = Convert.ToDateTime(txtDiaFinal.Text)
        'Hasta aqui.

        strFecha1 = dtpFI.Year & Genericos.Right("0" & dtpFI.Month, 2) & Genericos.Right("0" & dtpFI.Day, 2)
        strFecha2 = dtpFF.Year & Genericos.Right("0" & dtpFF.Month, 2) & Genericos.Right("0" & dtpFF.Day, 2)

        If Convert.ToDateTime(txtDiaInicial.Text) <= Convert.ToDateTime(txtDiaFinal.Text) Then
            hydPeriodo.Value = " AND (fecha between '" + strFecha1 + " 00:00:00' and '" + strFecha2 + " 23:59:59') "

            lblDatos.Visible = False
        Else

            'Si escogemos una fecha inicio mayor a la final saldra el siguiente label
            lblDatos.Text = "Fecha incorrecta"
            lblDatos.Visible = True
        End If


        'hydPeriodo.Value = Format(CDate(ddlMes.SelectedItem.Value), "MMyyyy")
    End Sub

    Protected Sub ASPxPivotGrid_PreRender(ByVal sender As Object, ByVal e As EventArgs) Handles Me.PreRender
        'SetFilter(fieldCategoryName, 4)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)

        If (Not IsPostBack) Then
        End If
    End Sub

    Private Sub SetFilter(ByVal field As DevExpress.Web.ASPxPivotGrid.PivotGridField, ByVal selectNumber As Integer)
        Dim values As Object() = field.GetUniqueValues()
        Dim includedValues As New List(Of Object)(values.Length / selectNumber)
        For i As Integer = 0 To values.Length - 1
            If i Mod selectNumber = 0 Then
                includedValues.Add(values(i))
            End If
        Next
        field.FilterValues.ValuesIncluded = includedValues.ToArray()
    End Sub

    Protected Sub ChartType_ValueChanged(ByVal sender As Object, ByVal e As EventArgs)
        SetChartType(ChartType.SelectedItem.Value.ToString())
    End Sub

    Private Sub SetChartType(ByVal text As String)
        WebChart.SeriesTemplate.ChangeView(DirectCast(System.[Enum].Parse(GetType(ViewType), text), ViewType))
    End Sub

    Protected Sub ChartDataVertical_CheckedChanged(ByVal sender As Object, ByVal e As EventArgs)
        'If ChartDataVertical.Checked = True Then
        '    ASPxPivotGrid1.OptionsChartDataSource.ChartDataVertical = True
        '    'Response.Redirect(Request.Url.AbsoluteUri)
        'Else
        '    ASPxPivotGrid1.OptionsChartDataSource.ChartDataVertical = False

        'End If
        ASPxPivotGrid1.OptionsChartDataSource.ProvideDataByColumns = ChartDataVertical.Checked
    End Sub

    Protected Sub ASPxPivotGrid_HtmlCellPrepared(ByVal sender As Object, ByVal e As DevExpress.Web.ASPxPivotGrid.PivotHtmlCellPreparedEventArgs)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)

        Dim pvg As ASPxPivotGrid = Nothing
        HydFormato.Value = UtilitarioWeb.DevuelveFormatoNumero_To_Pivot(oCultura, oCultura.dcNumDec)
        Try
            pvg = TryCast(sender, ASPxPivotGrid)
            'Dim bpage As New BasePage()
            'JOBANDO
            '27/02//2012
            'CONVIERTE LAS CELDAS DE DURACION EN 00:00:00
            If e.DataField Is pvg.Fields("DURACION") Then
                Dim Celda As PivotGridHtmlDataCell = Nothing
                Dim strFormato As String = ""
                Celda = TryCast(e.Cell, PivotGridHtmlDataCell)

                If oCultura.dcNumDec = 0 Then
                    strFormato = UtilitarioWeb.DevuelveFormatoNumero_To_Pivot(oCultura, 2)
                End If

                'Celda.Text = Genericos.fnConvDuracionDec_String(Math.Round(Convert.ToDouble(Celda.Text) * 60, 0))
                'Celda.Text = Genericos.fnConvDuracionDec_String(Celda.Text)
                If oCultura.vcCodCul.ToString() = "es-PE" Then
                    Celda.Text = Convert.ToDecimal(Celda.Text).ToString(strFormato.ToString())
                Else
                    Celda.Text = Convert.ToDecimal(Celda.Text.Replace(".", ",")).ToString(strFormato.ToString())
                End If

            ElseIf e.DataField Is pvg.Fields("COSTO") And e.DataField.Caption <> "%" Then
                Dim Celda As PivotGridHtmlDataCell
                Celda = TryCast(e.Cell, PivotGridHtmlDataCell)
                'Celda.Text = Convert.ToDecimal(Celda.Text) '.ToString(bpage.culturaActualizadaConDecimales(bpage.longitudCortaDecimales))
                'Celda.Text = String.Format(HydFormato.Value, Convert.ToDecimal(Celda.Text))
                If oCultura.vcCodCul.ToString() = "es-PE" Then
                    Celda.Text = oCultura.Moneda.vcSimMon.ToString() & " " & Convert.ToDecimal(Celda.Text).ToString(HydFormato.Value)
                Else
                    Celda.Text = oCultura.Moneda.vcSimMon.ToString() & " " & Convert.ToDecimal(Celda.Text.Replace(".", ",")).ToString(HydFormato.Value)
                End If
                'Celda.Text = Convert.ToDecimal(Celda.Text).ToString(HydFormato.Value)

                'String.Format(, )

            ElseIf ReferenceEquals(e.DataField, pvg.Fields("GLOBAL")) Then
                Dim Celda As PivotGridHtmlDataCell = Nothing
                Celda = TryCast(e.Cell, PivotGridHtmlDataCell)
                'Celda.Text = Genericos.fnConvDuracionDec_String(Math.Round(Convert.ToDouble(Celda.Text) * 60, 0))
                'Celda.Text = Genericos.fnConvDuracionDec_String(Celda.Text)

            ElseIf ReferenceEquals(e.DataField, pvg.Fields("fieldNOMCCO")) Then
                Dim Celda As PivotGridHtmlDataCell = Nothing
                Celda = TryCast(e.Cell, PivotGridHtmlDataCell)
                If Not Celda.Text.Equals("&nbsp;") Then
                    Celda.Text = Convert.ToDecimal(Celda.Text) '.ToString(bpage.culturaActualizadaConDecimales(bpage.longitudCortaDecimales))
                End If
            End If
        Catch ex As Exception

        End Try

    End Sub

    Public Sub GrabarNuevoReporte(ByVal nombre As String, ByVal codreporte As Integer, ByVal borrardatos As Boolean)
        'Grabar Plantilla

        Try
            Dim Filtros As Object()
            Dim objReporte As New ENT_MOV_Reporte()

            Dim _idUsuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod

            objReporte.codemp = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            objReporte.codusuario = Convert.ToInt32(_idUsuario)
            objReporte.Nombre = nombre
            objReporte.fecha = DateTime.Now

            'if (codreporte != 0)
            '{ 
            objReporte.dtFechaInicio = VisualSoft.Comun.Util.Genericos.ConvertirFormatoANSI(Convert.ToDateTime(txtDiaInicial.Text), False)
            objReporte.dtFechaFin = VisualSoft.Comun.Util.Genericos.ConvertirFormatoANSI(Convert.ToDateTime(txtDiaFinal.Text), False)
            '}

            objReporte.codreporte = codreporte

            For Each campo As DevExpress.Web.ASPxPivotGrid.PivotGridField In ASPxPivotGrid1.Fields
                If campo.Visible = True Then
                    Select Case campo.Area
                        Case DevExpress.XtraPivotGrid.PivotArea.ColumnArea
                            objReporte.ubicacion = "Columna"
                            Exit Select
                        Case DevExpress.XtraPivotGrid.PivotArea.DataArea
                            objReporte.ubicacion = "Dato"
                            Exit Select
                        Case DevExpress.XtraPivotGrid.PivotArea.FilterArea
                            objReporte.ubicacion = "Filtro"
                            Exit Select
                        Case DevExpress.XtraPivotGrid.PivotArea.RowArea
                            objReporte.ubicacion = "Fila"
                            Exit Select
                    End Select
                    objReporte.campo = campo.FieldName

                    If HttpContext.Current.Session("switche").ToString() = "0" Then
                        insertarReporte(objReporte, borrardatos)
                        objReporte.codreporte = Convert.ToInt32(HttpContext.Current.Session("codigoreporte").ToString())
                    End If

                    objReporte.filtros = ""
                    If campo.FilterValues.ValuesExcluded.Length <> 0 Then
                        If campo.FilterValues.ValuesIncluded.Length <> campo.FilterValues.Count Then
                            Filtros = campo.FilterValues.ValuesIncluded
                            Dim cadena As String = ""
                            For Each d As Object In Filtros
                                cadena = cadena + d.ToString().Trim() + ";"
                            Next
                            objReporte.filtros = Microsoft.VisualBasic.Left(cadena, cadena.Length - 1)
                        End If
                    End If
                    objReporte.indexado = campo.AreaIndex
                    insertarDetalles(objReporte)

                    hdTipo.Value = "edit"
                    hdCodReporte.Value = objReporte.codreporte.ToString()
                    lblNombreReporte.Text = " - " + objReporte.Nombre

                    lblNombreReporte.Visible = True
                End If

                'lblDatos.Text = "Reporte Guardado";
                'lblDatos.Visible = true;

            Next
        Catch ex As Exception
        End Try
        Dim script As String = "window.parent.$('#dvCargando').hide();"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Page.ClientScript.RegisterClientScriptBlock(Me.[GetType](), "mensaje", "Mensaje('<br/><h2>Reporte Grabado.</h2><br/>', document, CerroMensaje);", True)

    End Sub

    Protected Shared Sub insertarReporte(ByVal objReporte As ENT_MOV_Reporte, ByVal borrardatos As Boolean)
        Dim resultado As Integer = 0
        Dim oBL_MOV_Reporte As BL_MOV_Reporte = New BL_MOV_Reporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        resultado = oBL_MOV_Reporte.ReportesInsertar(objReporte, borrardatos, "Llamadas")
        oBL_MOV_Reporte.Dispose()
        HttpContext.Current.Session("codigoreporte") = resultado
        HttpContext.Current.Session("switche") = 1
    End Sub

    Protected Shared Sub insertarDetalles(ByVal objReporte As ENT_MOV_Reporte)
        Dim resultado As Integer = 0
        Dim oBL_MOV_Reporte As BL_MOV_Reporte = New BL_MOV_Reporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        resultado = oBL_MOV_Reporte.RegistrodeReportesInsertar(objReporte)
        oBL_MOV_Reporte.Dispose()
    End Sub

    Protected Sub ASPxButton3_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        Export(True)
    End Sub

    Private Sub Export(ByVal saveAs As Boolean)
        Dim str As String = ""
        Try
            ASPxPivotGridExporter1.OptionsPrint.PrintFilterHeaders = DevExpress.Utils.DefaultBoolean.True
            ASPxPivotGridExporter1.OptionsPrint.PrintColumnHeaders = DevExpress.Utils.DefaultBoolean.True
            ASPxPivotGridExporter1.OptionsPrint.PrintRowHeaders = DevExpress.Utils.DefaultBoolean.True
            ASPxPivotGridExporter1.OptionsPrint.PrintDataHeaders = DevExpress.Utils.DefaultBoolean.True

            Dim name As String = "Mi Reporte"
            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/")

            If Not File.Exists(vcRutaTMP) Then
                Directory.CreateDirectory(vcRutaTMP)
            End If

            For Each file In Directory.GetFiles(vcRutaTMP)
                IO.File.Delete(file)
            Next

            Select Case ddlFormatoExportacion.SelectedValue
                Case "0"
                    'ASPxPivotGridExporter1.ExportXlsxToResponse("Mi Reporte", saveAs)
                    ASPxPivotGridExporter1.ExportToXlsx(vcRutaTMP + name + ".xlsx")
                    Exit Select
                Case "1"
                    'ASPxPivotGridExporter1.ExportXlsToResponse("Mi Reporte", saveAs)
                    ASPxPivotGridExporter1.ExportToXls(vcRutaTMP + name + ".xls")
                    Exit Select
                Case "2"
                    'ASPxPivotGridExporter1.ExportPdfToResponse("Mi Reporte", saveAs)
                    ASPxPivotGridExporter1.ExportToPdf(vcRutaTMP + name + ".pdf")
                    Exit Select
                Case "3"
                    'ASPxPivotGridExporter1.ExportHtmlToResponse("Mi Reporte", "utf-8", "Mi Reporte", True, saveAs)
                    ASPxPivotGridExporter1.ExportToHtml(vcRutaTMP + name + ".html")
                    Exit Select
                Case "4"
                    'ASPxPivotGridExporter1.ExportRtfToResponse("Mi Reporte", saveAs)
                    ASPxPivotGridExporter1.ExportToRtf(vcRutaTMP + name + ".rtf")
                    Exit Select
            End Select

            Using zip As New ZipFile
                zip.AddDirectory(vcRutaTMP)
                zip.Save(vcRutaTMP + "/" & name & ".zip")
            End Using

            Dim destPath As String = String.Empty
            Dim mediaName As String = vcRutaTMP + name + ".zip"
            'destPath = Context.Server.MapPath("~/" + mediaName)

            Dim fi As FileInfo = New FileInfo(mediaName)
            If (fi.Exists) Then
                HttpContext.Current.Response.ClearHeaders()
                HttpContext.Current.Response.ClearContent()
                HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                HttpContext.Current.Response.ContentType = "application/octet-stream"
                HttpContext.Current.Response.TransmitFile(fi.FullName)
                HttpContext.Current.Response.Flush()
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, str.ToString())
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub



    Private Sub WebChart_BoundDataChanged(sender As Object, e As System.EventArgs) Handles WebChart.BoundDataChanged
        Dim chart As WebChartControl = CType(sender, WebChartControl)
        If chart.Series.Count > 0 Then

            If (ChartDataVertical.Checked) Then
                Select Case Me.ddlTipo.SelectedValue
                    Case "0"
                        If (chart.GetSeriesByName("CEL | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | DURACION").Visible = True
                        End If
                        If (chart.GetSeriesByName("LOC | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | DURACION").Visible = True
                        End If

                    Case "1"
                        If (chart.GetSeriesByName("CEL | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | LLAMADAS").Visible = True
                        End If
                        If (chart.GetSeriesByName("CEL | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | DURACION").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | LLAMADAS").Visible = True
                        End If
                        If (chart.GetSeriesByName("LOC | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | DURACION").Visible = False
                        End If
                        'chart.GetSeriesByName("CEL | LLAMADAS").Visible = True
                        'chart.GetSeriesByName("CEL | COSTO").Visible = False
                        'chart.GetSeriesByName("CEL | DURACION").Visible = False
                        'chart.GetSeriesByName("LOC | LLAMADAS").Visible = True
                        'chart.GetSeriesByName("LOC | COSTO").Visible = False
                        'chart.GetSeriesByName("LOC | DURACION").Visible = False
                    Case Else
                        If (chart.GetSeriesByName("CEL | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | COSTO").Visible = True
                        End If
                        If (chart.GetSeriesByName("CEL | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | DURACION").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | COSTO").Visible = True
                        End If
                        If (chart.GetSeriesByName("LOC | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | DURACION").Visible = False
                        End If
                        'chart.GetSeriesByName("CEL | LLAMADAS").Visible = False
                        'chart.GetSeriesByName("CEL | COSTO").Visible = True
                        'chart.GetSeriesByName("CEL | DURACION").Visible = False
                        'chart.GetSeriesByName("LOC | LLAMADAS").Visible = False
                        'chart.GetSeriesByName("LOC | COSTO").Visible = True
                        'chart.GetSeriesByName("LOC | DURACION").Visible = False
                End Select
            Else

                Select Case Me.ddlTipo.SelectedValue
                    Case "0"
                        If (chart.GetSeriesByName("CEL | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | DURACION").Visible = True
                        End If
                        If (chart.GetSeriesByName("LOC | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | DURACION").Visible = True
                        End If

                    Case "1"
                        If (chart.GetSeriesByName("CEL | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | LLAMADAS").Visible = True
                        End If
                        If (chart.GetSeriesByName("CEL | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | DURACION").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | LLAMADAS").Visible = True
                        End If
                        If (chart.GetSeriesByName("LOC | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | COSTO").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | DURACION").Visible = False
                        End If
                        'chart.GetSeriesByName("CEL | LLAMADAS").Visible = True
                        'chart.GetSeriesByName("CEL | COSTO").Visible = False
                        'chart.GetSeriesByName("CEL | DURACION").Visible = False
                        'chart.GetSeriesByName("LOC | LLAMADAS").Visible = True
                        'chart.GetSeriesByName("LOC | COSTO").Visible = False
                        'chart.GetSeriesByName("LOC | DURACION").Visible = False
                    Case Else
                        If (chart.GetSeriesByName("CEL | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("CEL | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | COSTO").Visible = True
                        End If
                        If (chart.GetSeriesByName("CEL | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("CEL | DURACION").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | LLAMADAS") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | LLAMADAS").Visible = False
                        End If
                        If (chart.GetSeriesByName("LOC | COSTO") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | COSTO").Visible = True
                        End If
                        If (chart.GetSeriesByName("LOC | DURACION") IsNot Nothing) Then
                            chart.GetSeriesByName("LOC | DURACION").Visible = False
                        End If
                        'chart.GetSeriesByName("CEL | LLAMADAS").Visible = False
                        'chart.GetSeriesByName("CEL | COSTO").Visible = True
                        'chart.GetSeriesByName("CEL | DURACION").Visible = False
                        'chart.GetSeriesByName("LOC | LLAMADAS").Visible = False
                        'chart.GetSeriesByName("LOC | COSTO").Visible = True
                        'chart.GetSeriesByName("LOC | DURACION").Visible = False
                End Select


            End If





        End If

    End Sub

    Private Sub WebChart_CustomDrawSeries(sender As Object, e As DevExpress.XtraCharts.CustomDrawSeriesEventArgs) Handles WebChart.CustomDrawSeries
        'If TypeOf e.Series.View Is BarSeriesView Then
        '    e.Series.Visible = False
        'End If
    End Sub

    Private Sub WebChart_DataBound(sender As Object, e As System.EventArgs) Handles WebChart.DataBound

        'Dim chart As ChartControl = CType(sender, ChartControl)
        'Dim feb As Series = chart.GetSeriesByName("CEL | LLAMADAS")
        'feb.Visible = False
    End Sub

    Protected Sub ASPxPivotGrid1_PrefilterCriteriaChanged(sender As Object, e As EventArgs) Handles ASPxPivotGrid1.PrefilterCriteriaChanged
        WebChart.RefreshData()
    End Sub
    Protected Sub ASPxPivotGridExporter1_CustomExportCell(sender As Object, e As DevExpress.Web.ASPxPivotGrid.Export.WebCustomExportCellEventArgs) Handles ASPxPivotGridExporter1.CustomExportCell
        If e.DataField.FieldName = "DURACION" Then
            Dim br As DevExpress.XtraPrinting.ITextBrick = TryCast(e.Brick, DevExpress.XtraPrinting.ITextBrick)
            If br IsNot Nothing Then
                br.Text = Genericos.ConvDuracionSeg_Str(Convert.ToDouble(br.Text))
            End If
        End If
    End Sub
End Class
