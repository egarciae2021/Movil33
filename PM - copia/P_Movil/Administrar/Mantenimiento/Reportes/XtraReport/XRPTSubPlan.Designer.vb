<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPTSubPlan
    Inherits DevExpress.XtraReports.UI.XtraReport

    'XtraReport overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing AndAlso components IsNot Nothing Then
            components.Dispose()
        End If
        MyBase.Dispose(disposing)
    End Sub

    'Required by the Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Designer
    'It can be modified using the Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrTable7 = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow9 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.xrTableCell36 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCantidadDet = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrMontoDet = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.Procedimiento1 = New Procedimiento()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.PlanID = New DevExpress.XtraReports.Parameters.Parameter()
        Me.MoV_s_GEN_ListaSubPlanes_FiltrosTableAdapter1 = New ProcedimientoTableAdapters.MOV_s_GEN_ListaSubPlanes_FiltrosTableAdapter()
        Me.XrTable3 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMontoDeta = New DevExpress.XtraReports.UI.XRTableCell()
        Me.ReportHeader = New DevExpress.XtraReports.UI.ReportHeaderBand()
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTable7})
        Me.Detail.HeightF = 20.0!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTable7
        '
        Me.xrTable7.BackColor = System.Drawing.Color.Transparent
        Me.xrTable7.LocationFloat = New DevExpress.Utils.PointFloat(0.000031789139!, 0.0!)
        Me.xrTable7.Name = "xrTable7"
        Me.xrTable7.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTable7.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow9})
        Me.xrTable7.SizeF = New System.Drawing.SizeF(592.368896!, 20.0!)
        Me.xrTable7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow9
        '
        Me.xrTableRow9.Borders = DevExpress.XtraPrinting.BorderSide.Right
        Me.xrTableRow9.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.xrTableCell36, Me.XrCantidadDet, Me.XrMontoDet})
        Me.xrTableRow9.Name = "xrTableRow9"
        Me.xrTableRow9.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow9.Weight = 1.0R
        '
        'xrTableCell36
        '
        Me.xrTableCell36.BackColor = System.Drawing.Color.White
        Me.xrTableCell36.BorderColor = System.Drawing.Color.LightGray
        Me.xrTableCell36.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableCell36.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaSubPlanes_Filtros.SUB PLAN")})
        Me.xrTableCell36.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.xrTableCell36.Name = "xrTableCell36"
        Me.xrTableCell36.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.xrTableCell36.StyleName = "Fila1"
        Me.xrTableCell36.StylePriority.UseBorderColor = False
        Me.xrTableCell36.StylePriority.UseBorders = False
        Me.xrTableCell36.StylePriority.UseFont = False
        Me.xrTableCell36.StylePriority.UsePadding = False
        Me.xrTableCell36.Text = "xrTableCell36"
        Me.xrTableCell36.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.xrTableCell36.Weight = 0.34841212201321176R
        '
        'XrCantidadDet
        '
        Me.XrCantidadDet.BackColor = System.Drawing.Color.White
        Me.XrCantidadDet.BorderColor = System.Drawing.Color.LightGray
        Me.XrCantidadDet.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrCantidadDet.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCantidadDet.Name = "XrCantidadDet"
        Me.XrCantidadDet.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCantidadDet.StyleName = "Fila1"
        Me.XrCantidadDet.StylePriority.UseBorderColor = False
        Me.XrCantidadDet.StylePriority.UseBorders = False
        Me.XrCantidadDet.StylePriority.UseFont = False
        Me.XrCantidadDet.StylePriority.UsePadding = False
        Me.XrCantidadDet.StylePriority.UseTextAlignment = False
        Me.XrCantidadDet.Text = "XrCantidadDet"
        Me.XrCantidadDet.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCantidadDet.Weight = 0.21337808621933446R
        '
        'XrMontoDet
        '
        Me.XrMontoDet.BackColor = System.Drawing.Color.White
        Me.XrMontoDet.BorderColor = System.Drawing.Color.LightGray
        Me.XrMontoDet.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrMontoDet.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrMontoDet.Name = "XrMontoDet"
        Me.XrMontoDet.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrMontoDet.StyleName = "Fila1"
        Me.XrMontoDet.StylePriority.UseBorderColor = False
        Me.XrMontoDet.StylePriority.UseBorders = False
        Me.XrMontoDet.StylePriority.UseFont = False
        Me.XrMontoDet.StylePriority.UsePadding = False
        Me.XrMontoDet.Text = "XrMontoDet"
        Me.XrMontoDet.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrMontoDet.Weight = 0.14182906159830211R
        Me.XrMontoDet.XlsxFormatString = "$0.0"
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 32.0!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.HeightF = 0.0!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'Procedimiento1
        '
        Me.Procedimiento1.DataSetName = "Procedimiento"
        Me.Procedimiento1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'Fila1
        '
        Me.Fila1.BorderColor = System.Drawing.Color.White
        Me.Fila1.Name = "Fila1"
        Me.Fila1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'PlanID
        '
        Me.PlanID.Description = "PlanID"
        Me.PlanID.Name = "PlanID"
        Me.PlanID.Type = GetType(Integer)
        '
        'MoV_s_GEN_ListaSubPlanes_FiltrosTableAdapter1
        '
        Me.MoV_s_GEN_ListaSubPlanes_FiltrosTableAdapter1.ClearBeforeFill = True
        '
        'XrTable3
        '
        Me.XrTable3.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTable3.BorderColor = System.Drawing.Color.White
        Me.XrTable3.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTable3.ForeColor = System.Drawing.Color.White
        Me.XrTable3.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrTable3.Name = "XrTable3"
        Me.XrTable3.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable3.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable3.SizeF = New System.Drawing.SizeF(592.368896!, 22.0!)
        Me.XrTable3.StylePriority.UseBackColor = False
        Me.XrTable3.StylePriority.UseBorderColor = False
        Me.XrTable3.StylePriority.UseFont = False
        Me.XrTable3.StylePriority.UseForeColor = False
        Me.XrTable3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell4, Me.xrTituloMontoDeta})
        Me.XrTableRow2.Name = "XrTableRow2"
        Me.XrTableRow2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow2.Weight = 1.0R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BorderColor = System.Drawing.Color.Transparent
        Me.XrTableCell1.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell1.StylePriority.UseBorderColor = False
        Me.XrTableCell1.StylePriority.UseBorders = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.Text = "Sub Plan"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell1.Weight = 0.34841209853815236R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BorderColor = System.Drawing.Color.Transparent
        Me.XrTableCell4.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell4.StylePriority.UseBorderColor = False
        Me.XrTableCell4.StylePriority.UseBorders = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.Text = "Cantidad"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.21337810969439386R
        '
        'xrTituloMontoDeta
        '
        Me.xrTituloMontoDeta.BorderColor = System.Drawing.Color.Transparent
        Me.xrTituloMontoDeta.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.xrTituloMontoDeta.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.xrTituloMontoDeta.Name = "xrTituloMontoDeta"
        Me.xrTituloMontoDeta.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.xrTituloMontoDeta.StylePriority.UseBorderColor = False
        Me.xrTituloMontoDeta.StylePriority.UseBorders = False
        Me.xrTituloMontoDeta.StylePriority.UseFont = False
        Me.xrTituloMontoDeta.Text = "Monto"
        Me.xrTituloMontoDeta.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.xrTituloMontoDeta.Weight = 0.14182906159830211R
        '
        'ReportHeader
        '
        Me.ReportHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable3})
        Me.ReportHeader.HeightF = 22.0!
        Me.ReportHeader.Name = "ReportHeader"
        '
        'XRPTSubPlan
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.ReportHeader})
        Me.DataAdapter = Me.MoV_s_GEN_ListaSubPlanes_FiltrosTableAdapter1
        Me.DataMember = "MOV_s_GEN_ListaSubPlanes_Filtros"
        Me.DataSource = Me.Procedimiento1
        Me.FilterString = "[P_inCod] = ?PlanID"
        Me.Margins = New System.Drawing.Printing.Margins(117, 133, 32, 0)
        Me.Parameters.AddRange(New DevExpress.XtraReports.Parameters.Parameter() {Me.PlanID})
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1})
        Me.Version = "11.2"
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents Procedimiento1 As Procedimiento
    Friend WithEvents xrTable7 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow9 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents xrTableCell36 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCantidadDet As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrMontoDet As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents PlanID As DevExpress.XtraReports.Parameters.Parameter
    Friend WithEvents MoV_s_GEN_ListaSubPlanes_FiltrosTableAdapter1 As ProcedimientoTableAdapters.MOV_s_GEN_ListaSubPlanes_FiltrosTableAdapter
    Friend WithEvents XrTable3 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMontoDeta As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents ReportHeader As DevExpress.XtraReports.UI.ReportHeaderBand
End Class
