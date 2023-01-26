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
Imports DevExpress.Web.ASPxPivotGrid.HtmlControls
Imports DevExpress.Utils
Imports DevExpress.WebUtils
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Util
Imports Ionic.Zip
Imports VisualSoft.PCSistelMovil.General.BE

Public Class PivotReporteOrganizacional_General
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Session.Count = 0 Then Exit Sub
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

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

        Try
            hydCodEmp.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            UtilitarioWeb.ActualizarCultura(oCultura)

            If Not Page.IsPostBack Then
                Dim dias As Integer = 0
                dias = DateTime.Now.Day - 1
                'Modificacion Realizada por Mauricio Gonzalo Benavides Loli. 20/02/2013
                'txtDiaInicial.Text = DateTime.Now.AddDays(-dias).ToString("dd/MM/yyyy") '.ToString(bpage.obtenerFormatoFecha())

                hydCodInt.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt

                'Hasta aqui.
                Dim restrictedTypes As ViewType() = {ViewType.PolarArea, ViewType.PolarLine, ViewType.SideBySideGantt, ViewType.SideBySideRangeBar, ViewType.RangeBar, ViewType.Gantt, _
                 ViewType.PolarPoint, ViewType.Stock, ViewType.CandleStick, ViewType.Bubble}
                For Each type As ViewType In System.[Enum].GetValues(GetType(ViewType))
                    If Array.IndexOf(Of ViewType)(restrictedTypes, type) >= 0 Then
                        Continue For
                    End If
                    Dim strLabel As String = type.ToString()
                Next

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
                    CargarReporte(codreporte)
                Else
                    If Request.QueryString("reportenuevo") IsNot Nothing Then
                        CargarReporte(-1)
                    End If
                End If
            Else
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

            'esto es una prueba para ingresar las plantillas
            Session("switche") = 0
            'UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            Dim script As String = "window.parent.$('#dvCargando').hide();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Catch ex As Exception
        End Try

    End Sub

    Public Sub CargarReporte(ByVal codreporte As Integer)
        Try

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            UtilitarioWeb.ActualizarCultura(oCultura)

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
        Catch ex As Exception
        End Try
    End Sub

    'Protected Sub ASPxPivotGrid_PreRender(ByVal sender As Object, ByVal e As EventArgs) Handles Me.PreRender
    '    If (Not IsPostBack) Then
    '    End If
    'End Sub

    Private Sub SetFilter(ByVal field As PivotGridField, ByVal selectNumber As Integer)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)

        Try
            Dim values As Object() = field.GetUniqueValues()
            Dim includedValues As New List(Of Object)(values.Length / selectNumber)
            For i As Integer = 0 To values.Length - 1
                If i Mod selectNumber = 0 Then
                    includedValues.Add(values(i))
                End If
            Next
            field.FilterValues.ValuesIncluded = includedValues.ToArray()
        Catch ex As Exception
        End Try
    End Sub

    Protected Sub ASPxPivotGrid_HtmlCellPrepared(ByVal sender As Object, ByVal e As DevExpress.Web.ASPxPivotGrid.PivotHtmlCellPreparedEventArgs)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)
        ''Dim pvg As ASPxPivotGrid = Nothing
        ''pvg = TryCast(sender, ASPxPivotGrid)
        'Dim bpage As New BasePage()
        'JOBANDO
        '27/02//2012
        'CONVIERTE LAS CELDAS DE DURACION EN 00:00:00
        ''If ReferenceEquals(e.DataField, pvg.Fields("DURACION")) Then
        ''   Dim Celda As PivotGridHtmlDataCell = Nothing
        ''   Celda = TryCast(e.Cell, PivotGridHtmlDataCell)
        ''   Celda.Text = Genericos.fnConvDuracionDec_String(Math.Round(Convert.ToDouble(Celda.Text) * 60, 0))
        ''ElseIf ReferenceEquals(e.DataField, pvg.Fields("COSTO")) Then
        ''   Dim Celda As PivotGridHtmlDataCell = Nothing
        ''   Celda = TryCast(e.Cell, PivotGridHtmlDataCell)

        ''   Celda.Text = Convert.ToDecimal(Celda.Text) '.ToString(bpage.culturaActualizadaConDecimales(bpage.longitudCortaDecimales))
        ''ElseIf ReferenceEquals(e.DataField, pvg.Fields("fieldNOMCCO")) Then
        ''   Dim Celda As PivotGridHtmlDataCell = Nothing
        ''   Celda = TryCast(e.Cell, PivotGridHtmlDataCell)
        ''   If Not Celda.Text.Equals("&nbsp;") Then
        ''      Celda.Text = Convert.ToDecimal(Celda.Text) '.ToString(bpage.culturaActualizadaConDecimales(bpage.longitudCortaDecimales))
        ''   End If
        ''End If
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
        Try
            Dim resultado As Integer = 0
            Dim oBL_MOV_Reporte As BL_MOV_Reporte = New BL_MOV_Reporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            resultado = oBL_MOV_Reporte.ReportesInsertar(objReporte, borrardatos, "Organizacion_General")
            oBL_MOV_Reporte.Dispose()
            HttpContext.Current.Session("codigoreporte") = resultado
            HttpContext.Current.Session("switche") = 1
        Catch ex As Exception
        End Try
    End Sub

    Protected Shared Sub insertarDetalles(ByVal objReporte As ENT_MOV_Reporte)
        Try
            Dim resultado As Integer = 0
            Dim oBL_MOV_Reporte As BL_MOV_Reporte = New BL_MOV_Reporte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            resultado = oBL_MOV_Reporte.RegistrodeReportesInsertar(objReporte)
            oBL_MOV_Reporte.Dispose()
        Catch ex As Exception
        End Try
    End Sub

    Protected Sub ASPxButton3_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        Export(True)
    End Sub

    Private Sub Export(ByVal saveAs As Boolean)

        Dim util As New Utilitarios
        Dim exInfo As Exception

        Try
            ASPxPivotGridExporter1.OptionsPrint.PrintFilterHeaders = DevExpress.Utils.DefaultBoolean.True
            ASPxPivotGridExporter1.OptionsPrint.PrintColumnHeaders = DevExpress.Utils.DefaultBoolean.True
            ASPxPivotGridExporter1.OptionsPrint.PrintRowHeaders = DevExpress.Utils.DefaultBoolean.True
            ASPxPivotGridExporter1.OptionsPrint.PrintDataHeaders = DevExpress.Utils.DefaultBoolean.True
            Dim name As String = "Mi Reporte"
            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/")

            exInfo = New Exception("Ruta: " & vcRutaTMP)
            util.GrabarLog(exInfo, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))

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
            'destPath = HttpContext.Current.Server.MapPath("~/" + mediaName)

            exInfo = New Exception("mediaName: " & mediaName)
            util.GrabarLog(exInfo, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))

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

            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub ASPxPivotGridExporter1_CustomExportCell(ByVal sender As Object, e As DevExpress.Web.ASPxPivotGrid.Export.WebCustomExportCellEventArgs) Handles ASPxPivotGridExporter1.CustomExportCell
        Try
            If e.DataField.FieldName = "DURACION" Then
                Dim br As DevExpress.XtraPrinting.ITextBrick = TryCast(e.Brick, DevExpress.XtraPrinting.ITextBrick)
                If br IsNot Nothing Then
                    br.Text = Genericos.ConvDuracionSeg_Str(Convert.ToDouble(br.Text))
                End If
            End If
        Catch ex As Exception
        End Try
    End Sub

End Class