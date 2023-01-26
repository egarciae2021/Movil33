<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Facturacion_LineasAgrupadasPorConcepto
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Facturacion_LineasAgrupadasPorConcepto))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrTable_Detalle = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow59 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell144 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell9 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell14 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell11 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell15 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell20 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell21 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell22 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell23 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.xrTitulo = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrTable_Cabecera = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell10 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell12 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell13 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell16 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell17 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell18 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell19 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.DsReportesFacturacion1 = New dsReportesFacturacion()
        Me.XrTableCell24 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell25 = New DevExpress.XtraReports.UI.XRTableCell()
        CType(Me.xrTable_Detalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.xrTable_Cabecera, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReportesFacturacion1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTable_Detalle})
        Me.Detail.HeightF = 15.625!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTable_Detalle
        '
        Me.xrTable_Detalle.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTable_Detalle.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.xrTable_Detalle.LocationFloat = New DevExpress.Utils.PointFloat(0.5000035!, 0.0!)
        Me.xrTable_Detalle.Name = "xrTable_Detalle"
        Me.xrTable_Detalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow59})
        Me.xrTable_Detalle.SizeF = New System.Drawing.SizeF(1024.5!, 15.625!)
        Me.xrTable_Detalle.StylePriority.UseBorders = False
        Me.xrTable_Detalle.StylePriority.UseFont = False
        Me.xrTable_Detalle.StylePriority.UseTextAlignment = False
        Me.xrTable_Detalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrTableRow59
        '
        Me.XrTableRow59.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell144, Me.XrTableCell7, Me.XrTableCell4, Me.XrTableCell25, Me.XrTableCell5, Me.XrTableCell9, Me.XrTableCell14, Me.XrTableCell11, Me.XrTableCell15, Me.XrTableCell20, Me.XrTableCell21, Me.XrTableCell22, Me.XrTableCell23})
        Me.XrTableRow59.Name = "XrTableRow59"
        Me.XrTableRow59.Weight = 1.0R
        '
        'XrTableCell144
        '
        Me.XrTableCell144.BackColor = System.Drawing.Color.White
        Me.XrTableCell144.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Linea")})
        Me.XrTableCell144.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.XrTableCell144.Name = "XrTableCell144"
        Me.XrTableCell144.StylePriority.UseBackColor = False
        Me.XrTableCell144.StylePriority.UseFont = False
        Me.XrTableCell144.Text = "XrTableCell144"
        Me.XrTableCell144.Weight = 0.24786605540450629R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Empleado")})
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.Text = "XrTableCell7"
        Me.XrTableCell7.Weight = 0.53661912194380856R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.EstadoLinea")})
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Text = "XrTableCell4"
        Me.XrTableCell4.Weight = 0.22204249842158824R
        '
        'XrTableCell5
        '
        Me.XrTableCell5.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Cuenta")})
        Me.XrTableCell5.Name = "XrTableCell5"
        Me.XrTableCell5.Text = "XrTableCell5"
        Me.XrTableCell5.Weight = 0.320036691120769R
        '
        'XrTableCell9
        '
        Me.XrTableCell9.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Cargo Fijo", "{0:#,#0.00}")})
        Me.XrTableCell9.Name = "XrTableCell9"
        Me.XrTableCell9.StylePriority.UseTextAlignment = False
        Me.XrTableCell9.Text = "XrTableCell9"
        Me.XrTableCell9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell9.Weight = 0.21512269757408842R
        '
        'XrTableCell14
        '
        Me.XrTableCell14.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Voz", "{0:#,#0.00}")})
        Me.XrTableCell14.Name = "XrTableCell14"
        Me.XrTableCell14.StylePriority.UseTextAlignment = False
        Me.XrTableCell14.Text = "XrTableCell14"
        Me.XrTableCell14.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell14.Weight = 0.19040792335647816R
        '
        'XrTableCell11
        '
        Me.XrTableCell11.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Datos", "{0:#,#0.00}")})
        Me.XrTableCell11.Name = "XrTableCell11"
        Me.XrTableCell11.StylePriority.UseTextAlignment = False
        Me.XrTableCell11.Text = "XrTableCell11"
        Me.XrTableCell11.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell11.Weight = 0.20730358272510219R
        '
        'XrTableCell15
        '
        Me.XrTableCell15.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Mensajes de Texto", "{0:#,#0.00}")})
        Me.XrTableCell15.Name = "XrTableCell15"
        Me.XrTableCell15.StylePriority.UseTextAlignment = False
        Me.XrTableCell15.Text = "XrTableCell15"
        Me.XrTableCell15.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell15.Weight = 0.29015354210808636R
        '
        'XrTableCell20
        '
        Me.XrTableCell20.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Descuentos", "{0:#,#0.00}")})
        Me.XrTableCell20.Name = "XrTableCell20"
        Me.XrTableCell20.StylePriority.UseTextAlignment = False
        Me.XrTableCell20.Text = "XrTableCell20"
        Me.XrTableCell20.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell20.Weight = 0.2197662854441686R
        '
        'XrTableCell21
        '
        Me.XrTableCell21.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Otros", "{0:#,#0.00}")})
        Me.XrTableCell21.Name = "XrTableCell21"
        Me.XrTableCell21.StylePriority.UseTextAlignment = False
        Me.XrTableCell21.Text = "XrTableCell21"
        Me.XrTableCell21.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell21.Weight = 0.2159125190617347R
        '
        'XrTableCell22
        '
        Me.XrTableCell22.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.IVA", "{0:#,#0.00}")})
        Me.XrTableCell22.Name = "XrTableCell22"
        Me.XrTableCell22.StylePriority.UseTextAlignment = False
        Me.XrTableCell22.Text = "XrTableCell22"
        Me.XrTableCell22.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell22.Weight = 0.24615901407448343R
        '
        'XrTableCell23
        '
        Me.XrTableCell23.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Total", "{0:#,#0.00}")})
        Me.XrTableCell23.Name = "XrTableCell23"
        Me.XrTableCell23.StylePriority.UseTextAlignment = False
        Me.XrTableCell23.Text = "XrTableCell23"
        Me.XrTableCell23.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell23.Weight = 0.24270373517431182R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 0.0!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.HeightF = 8.333333!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTitulo, Me.xrTable_Cabecera, Me.xrPictureBoxLogo})
        Me.PageHeader.HeightF = 113.1666!
        Me.PageHeader.Name = "PageHeader"
        '
        'xrTitulo
        '
        Me.xrTitulo.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.xrTitulo.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.xrTitulo.LocationFloat = New DevExpress.Utils.PointFloat(2.499994!, 36.0!)
        Me.xrTitulo.Name = "xrTitulo"
        Me.xrTitulo.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.xrTitulo.SizeF = New System.Drawing.SizeF(878.026!, 37.99998!)
        Me.xrTitulo.StylePriority.UseFont = False
        Me.xrTitulo.StylePriority.UseForeColor = False
        Me.xrTitulo.StylePriority.UsePadding = False
        Me.xrTitulo.StylePriority.UseTextAlignment = False
        Me.xrTitulo.Text = "[cfTitulo1]"
        Me.xrTitulo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'xrTable_Cabecera
        '
        Me.xrTable_Cabecera.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTable_Cabecera.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.xrTable_Cabecera.LocationFloat = New DevExpress.Utils.PointFloat(0.4999956!, 92.99997!)
        Me.xrTable_Cabecera.Name = "xrTable_Cabecera"
        Me.xrTable_Cabecera.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.xrTable_Cabecera.SizeF = New System.Drawing.SizeF(1024.5!, 15.625!)
        Me.xrTable_Cabecera.StylePriority.UseBorders = False
        Me.xrTable_Cabecera.StylePriority.UseFont = False
        Me.xrTable_Cabecera.StylePriority.UseTextAlignment = False
        Me.xrTable_Cabecera.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrTableRow1
        '
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell6, Me.XrTableCell2, Me.XrTableCell24, Me.XrTableCell3, Me.XrTableCell10, Me.XrTableCell12, Me.XrTableCell13, Me.XrTableCell16, Me.XrTableCell17, Me.XrTableCell18, Me.XrTableCell8, Me.XrTableCell19})
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Weight = 1.0R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell1.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.StylePriority.UseBackColor = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.Text = "Línea"
        Me.XrTableCell1.Weight = 0.20886485228974516R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell6.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.Text = "Empleado"
        Me.XrTableCell6.Weight = 0.45218315820981148R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell2.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.Text = "Estado Línea"
        Me.XrTableCell2.Weight = 0.18710459799106727R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell3.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.Text = "Cuenta"
        Me.XrTableCell3.Weight = 0.269679766670369R
        '
        'XrTableCell10
        '
        Me.XrTableCell10.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell10.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell10.Name = "XrTableCell10"
        Me.XrTableCell10.StylePriority.UseBackColor = False
        Me.XrTableCell10.StylePriority.UseFont = False
        Me.XrTableCell10.Text = "Cargo Fijo"
        Me.XrTableCell10.Weight = 0.18127376151346286R
        '
        'XrTableCell12
        '
        Me.XrTableCell12.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell12.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell12.Name = "XrTableCell12"
        Me.XrTableCell12.StylePriority.UseBackColor = False
        Me.XrTableCell12.StylePriority.UseFont = False
        Me.XrTableCell12.Text = "Voz"
        Me.XrTableCell12.Weight = 0.16044727016057292R
        '
        'XrTableCell13
        '
        Me.XrTableCell13.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell13.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell13.Name = "XrTableCell13"
        Me.XrTableCell13.StylePriority.UseBackColor = False
        Me.XrTableCell13.StylePriority.UseFont = False
        Me.XrTableCell13.Text = "Datos"
        Me.XrTableCell13.Weight = 0.17468493136033808R
        '
        'XrTableCell16
        '
        Me.XrTableCell16.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell16.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell16.Name = "XrTableCell16"
        Me.XrTableCell16.StylePriority.UseBackColor = False
        Me.XrTableCell16.StylePriority.UseFont = False
        Me.XrTableCell16.Text = "Mensajes de Texto"
        Me.XrTableCell16.Weight = 0.24449808529094194R
        '
        'XrTableCell17
        '
        Me.XrTableCell17.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell17.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell17.Name = "XrTableCell17"
        Me.XrTableCell17.StylePriority.UseBackColor = False
        Me.XrTableCell17.StylePriority.UseFont = False
        Me.XrTableCell17.Text = "Descuentos"
        Me.XrTableCell17.Weight = 0.18518683478039316R
        '
        'XrTableCell18
        '
        Me.XrTableCell18.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell18.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell18.Name = "XrTableCell18"
        Me.XrTableCell18.StylePriority.UseBackColor = False
        Me.XrTableCell18.StylePriority.UseFont = False
        Me.XrTableCell18.Text = "Otros"
        Me.XrTableCell18.Weight = 0.18193913336787257R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell8.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.Text = "Impuesto"
        Me.XrTableCell8.Weight = 0.20742621564076319R
        '
        'XrTableCell19
        '
        Me.XrTableCell19.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell19.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell19.Name = "XrTableCell19"
        Me.XrTableCell19.StylePriority.UseBackColor = False
        Me.XrTableCell19.StylePriority.UseFont = False
        Me.XrTableCell19.Text = "Total"
        Me.XrTableCell19.Weight = 0.2045147887549309R
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(890.6144!, 36.0!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(134.3855!, 37.99999!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageInfo1, Me.XrLabel4, Me.LBLUsuario, Me.XrPageInfo2, Me.LBLEmpresa, Me.XrLabel6, Me.XrLabel5})
        Me.PageFooter.HeightF = 95.83334!
        Me.PageFooter.Name = "PageFooter"
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(941.926!, 22.00006!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(83.07391!, 23.0!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel4.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(836.7178!, 22.00006!)
        Me.XrLabel4.Name = "XrLabel4"
        Me.XrLabel4.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel4.SizeF = New System.Drawing.SizeF(105.2083!, 23.0!)
        Me.XrLabel4.StylePriority.UseBackColor = False
        Me.XrLabel4.StylePriority.UseFont = False
        Me.XrLabel4.StylePriority.UseForeColor = False
        Me.XrLabel4.StylePriority.UseTextAlignment = False
        Me.XrLabel4.Text = "Fecha:"
        Me.XrLabel4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(75.22919!, 45.5417!)
        Me.LBLUsuario.Name = "LBLUsuario"
        Me.LBLUsuario.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.LBLUsuario.SizeF = New System.Drawing.SizeF(253.6257!, 24.45834!)
        Me.LBLUsuario.StylePriority.UseBackColor = False
        Me.LBLUsuario.StylePriority.UseFont = False
        Me.LBLUsuario.StylePriority.UseForeColor = False
        Me.LBLUsuario.StylePriority.UseTextAlignment = False
        Me.LBLUsuario.Text = "LBLUsuario"
        Me.LBLUsuario.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(474.0177!, 21.99999!)
        Me.XrPageInfo2.Name = "XrPageInfo2"
        Me.XrPageInfo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo2.SizeF = New System.Drawing.SizeF(164.5411!, 22.375!)
        Me.XrPageInfo2.StylePriority.UseBackColor = False
        Me.XrPageInfo2.StylePriority.UseBorderColor = False
        Me.XrPageInfo2.StylePriority.UseBorders = False
        Me.XrPageInfo2.StylePriority.UseFont = False
        Me.XrPageInfo2.StylePriority.UseTextAlignment = False
        Me.XrPageInfo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(75.22919!, 22.0!)
        Me.LBLEmpresa.Name = "LBLEmpresa"
        Me.LBLEmpresa.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.LBLEmpresa.SizeF = New System.Drawing.SizeF(253.6257!, 22.375!)
        Me.LBLEmpresa.StylePriority.UseBackColor = False
        Me.LBLEmpresa.StylePriority.UseFont = False
        Me.LBLEmpresa.StylePriority.UseForeColor = False
        Me.LBLEmpresa.StylePriority.UseTextAlignment = False
        Me.LBLEmpresa.Text = "LBLEmpresa"
        Me.LBLEmpresa.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(1.420883!, 45.5417!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(73.80831!, 24.45833!)
        Me.XrLabel6.StylePriority.UseBackColor = False
        Me.XrLabel6.StylePriority.UseFont = False
        Me.XrLabel6.StylePriority.UseForeColor = False
        Me.XrLabel6.StylePriority.UseTextAlignment = False
        Me.XrLabel6.Text = "Emisor:"
        Me.XrLabel6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.420883!, 22.0!)
        Me.XrLabel5.Name = "XrLabel5"
        Me.XrLabel5.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel5.SizeF = New System.Drawing.SizeF(73.80831!, 22.375!)
        Me.XrLabel5.StylePriority.UseBackColor = False
        Me.XrLabel5.StylePriority.UseFont = False
        Me.XrLabel5.StylePriority.UseForeColor = False
        Me.XrLabel5.StylePriority.UseTextAlignment = False
        Me.XrLabel5.Text = "Empresa:"
        Me.XrLabel5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'DsReportesFacturacion1
        '
        Me.DsReportesFacturacion1.DataSetName = "dsReportesFacturacion"
        Me.DsReportesFacturacion1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'XrTableCell24
        '
        Me.XrTableCell24.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell24.BorderDashStyle = DevExpress.XtraPrinting.BorderDashStyle.Solid
        Me.XrTableCell24.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell24.Name = "XrTableCell24"
        Me.XrTableCell24.StylePriority.UseBackColor = False
        Me.XrTableCell24.StylePriority.UseBorderColor = False
        Me.XrTableCell24.StylePriority.UseBorderDashStyle = False
        Me.XrTableCell24.StylePriority.UseFont = False
        Me.XrTableCell24.Text = "Operador"
        Me.XrTableCell24.Weight = 0.20562885193790867R
        '
        'XrTableCell25
        '
        Me.XrTableCell25.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasAgrupadasPorConcepto.Operador")})
        Me.XrTableCell25.Name = "XrTableCell25"
        Me.XrTableCell25.Text = "XrTableCell25"
        Me.XrTableCell25.Weight = 0.24402613160841985R
        '
        'XRPT_Facturacion_LineasAgrupadasPorConcepto
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter})
        Me.DataMember = "MOV_FAC_REP_LineasAgrupadasPorConcepto"
        Me.DataSource = Me.DsReportesFacturacion1
        Me.Landscape = true
        Me.Margins = New System.Drawing.Printing.Margins(41, 34, 0, 8)
        Me.PageHeight = 850
        Me.PageWidth = 1100
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.Version = "12.2"
        CType(Me.xrTable_Detalle,System.ComponentModel.ISupportInitialize).EndInit
        CType(Me.xrTable_Cabecera,System.ComponentModel.ISupportInitialize).EndInit
        CType(Me.DsReportesFacturacion1,System.ComponentModel.ISupportInitialize).EndInit
        CType(Me,System.ComponentModel.ISupportInitialize).EndInit

End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents xrTitulo As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrTable_Cabecera As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell10 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell12 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell13 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents xrTable_Detalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow59 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell144 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell9 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell14 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell11 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell15 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents DsReportesFacturacion1 As dsReportesFacturacion
    Friend WithEvents XrTableCell16 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell17 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell18 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell19 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell20 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell21 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell22 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell23 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell25 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell24 As DevExpress.XtraReports.UI.XRTableCell
End Class
