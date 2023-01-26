<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Facturacion_LineasSinConsumoTotal
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Facturacion_LineasSinConsumoTotal))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.xrTitulo = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrTable_Cabecera_Superior = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow3 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell17 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell18 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell19 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell20 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell21 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell22 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell23 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell24 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.DsReportesFacturacion1 = New dsReportesFacturacion()
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
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        CType(Me.xrTable_Cabecera_Superior, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReportesFacturacion1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.xrTable_Detalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTable_Detalle})
        Me.Detail.HeightF = 16.66667!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 5.208333!
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
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTable_Cabecera_Superior, Me.xrPictureBoxLogo, Me.xrTitulo})
        Me.PageHeader.HeightF = 105.2083!
        Me.PageHeader.Name = "PageHeader"
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel5, Me.XrLabel6, Me.LBLEmpresa, Me.XrPageInfo2, Me.LBLUsuario, Me.XrLabel4, Me.XrPageInfo1})
        Me.PageFooter.HeightF = 106.25!
        Me.PageFooter.Name = "PageFooter"
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(629.6145!, 22.50001!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(134.3855!, 37.99999!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'xrTitulo
        '
        Me.xrTitulo.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.xrTitulo.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.xrTitulo.LocationFloat = New DevExpress.Utils.PointFloat(4.713503!, 22.50001!)
        Me.xrTitulo.Name = "xrTitulo"
        Me.xrTitulo.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.xrTitulo.SizeF = New System.Drawing.SizeF(624.901!, 37.99999!)
        Me.xrTitulo.StylePriority.UseFont = False
        Me.xrTitulo.StylePriority.UseForeColor = False
        Me.xrTitulo.StylePriority.UsePadding = False
        Me.xrTitulo.StylePriority.UseTextAlignment = False
        Me.xrTitulo.Text = "[cfTitulo1]"
        Me.xrTitulo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'xrTable_Cabecera_Superior
        '
        Me.xrTable_Cabecera_Superior.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTable_Cabecera_Superior.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.xrTable_Cabecera_Superior.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 87.5!)
        Me.xrTable_Cabecera_Superior.Name = "xrTable_Cabecera_Superior"
        Me.xrTable_Cabecera_Superior.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow3})
        Me.xrTable_Cabecera_Superior.SizeF = New System.Drawing.SizeF(772.0!, 15.625!)
        Me.xrTable_Cabecera_Superior.StylePriority.UseBorders = False
        Me.xrTable_Cabecera_Superior.StylePriority.UseFont = False
        Me.xrTable_Cabecera_Superior.StylePriority.UseTextAlignment = False
        Me.xrTable_Cabecera_Superior.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrTableRow3
        '
        Me.XrTableRow3.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell17, Me.XrTableCell18, Me.XrTableCell19, Me.XrTableCell20, Me.XrTableCell21, Me.XrTableCell22, Me.XrTableCell23, Me.XrTableCell24})
        Me.XrTableRow3.Name = "XrTableRow3"
        Me.XrTableRow3.Weight = 1.0R
        '
        'XrTableCell17
        '
        Me.XrTableCell17.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell17.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell17.Name = "XrTableCell17"
        Me.XrTableCell17.StylePriority.UseBackColor = False
        Me.XrTableCell17.StylePriority.UseFont = False
        Me.XrTableCell17.Text = "Línea"
        Me.XrTableCell17.Weight = 0.34269547126743349R
        '
        'XrTableCell18
        '
        Me.XrTableCell18.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell18.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell18.Name = "XrTableCell18"
        Me.XrTableCell18.StylePriority.UseBackColor = False
        Me.XrTableCell18.StylePriority.UseFont = False
        Me.XrTableCell18.Text = "Empleado"
        Me.XrTableCell18.Weight = 0.73491010534968215R
        '
        'XrTableCell19
        '
        Me.XrTableCell19.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell19.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell19.Name = "XrTableCell19"
        Me.XrTableCell19.StylePriority.UseBackColor = False
        Me.XrTableCell19.StylePriority.UseFont = False
        Me.XrTableCell19.Text = "Estado Línea"
        Me.XrTableCell19.Weight = 0.27150554715361408R
        '
        'XrTableCell20
        '
        Me.XrTableCell20.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell20.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell20.Name = "XrTableCell20"
        Me.XrTableCell20.StylePriority.UseBackColor = False
        Me.XrTableCell20.StylePriority.UseFont = False
        Me.XrTableCell20.Text = "Cuenta"
        Me.XrTableCell20.Weight = 0.50448903138768486R
        '
        'XrTableCell21
        '
        Me.XrTableCell21.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell21.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell21.Name = "XrTableCell21"
        Me.XrTableCell21.StylePriority.UseBackColor = False
        Me.XrTableCell21.StylePriority.UseFont = False
        Me.XrTableCell21.Text = "Plan"
        Me.XrTableCell21.Weight = 0.6413916598268441R
        '
        'XrTableCell22
        '
        Me.XrTableCell22.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell22.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell22.Name = "XrTableCell22"
        Me.XrTableCell22.StylePriority.UseBackColor = False
        Me.XrTableCell22.StylePriority.UseFont = False
        Me.XrTableCell22.Text = "Monto"
        Me.XrTableCell22.Weight = 0.28073323650082038R
        '
        'XrTableCell23
        '
        Me.XrTableCell23.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell23.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell23.Name = "XrTableCell23"
        Me.XrTableCell23.StylePriority.UseBackColor = False
        Me.XrTableCell23.StylePriority.UseFont = False
        Me.XrTableCell23.Text = "Minutos"
        Me.XrTableCell23.Weight = 0.22842485322948886R
        '
        'XrTableCell24
        '
        Me.XrTableCell24.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell24.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell24.Name = "XrTableCell24"
        Me.XrTableCell24.StylePriority.UseBackColor = False
        Me.XrTableCell24.StylePriority.UseFont = False
        Me.XrTableCell24.Text = "Fecha Fin"
        Me.XrTableCell24.Weight = 0.30549779652840575R
        '
        'DsReportesFacturacion1
        '
        Me.DsReportesFacturacion1.DataSetName = "dsReportesFacturacion"
        Me.DsReportesFacturacion1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'xrTable_Detalle
        '
        Me.xrTable_Detalle.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrTable_Detalle.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.xrTable_Detalle.LocationFloat = New DevExpress.Utils.PointFloat(1.999879!, 0.00000667572!)
        Me.xrTable_Detalle.Name = "xrTable_Detalle"
        Me.xrTable_Detalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow59})
        Me.xrTable_Detalle.SizeF = New System.Drawing.SizeF(770.0001!, 15.625!)
        Me.xrTable_Detalle.StylePriority.UseBorders = False
        Me.xrTable_Detalle.StylePriority.UseFont = False
        Me.xrTable_Detalle.StylePriority.UseTextAlignment = False
        Me.xrTable_Detalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrTableRow59
        '
        Me.XrTableRow59.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell144, Me.XrTableCell7, Me.XrTableCell4, Me.XrTableCell5, Me.XrTableCell9, Me.XrTableCell14, Me.XrTableCell11, Me.XrTableCell15})
        Me.XrTableRow59.Name = "XrTableRow59"
        Me.XrTableRow59.Weight = 1.0R
        '
        'XrTableCell144
        '
        Me.XrTableCell144.BackColor = System.Drawing.Color.White
        Me.XrTableCell144.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Linea")})
        Me.XrTableCell144.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.XrTableCell144.Name = "XrTableCell144"
        Me.XrTableCell144.StylePriority.UseBackColor = False
        Me.XrTableCell144.StylePriority.UseFont = False
        Me.XrTableCell144.Text = "XrTableCell144"
        Me.XrTableCell144.Weight = 0.35185622959674029R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Empleado")})
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.Text = "XrTableCell7"
        Me.XrTableCell7.Weight = 0.75455520427757794R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.EstadoLinea")})
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Text = "XrTableCell4"
        Me.XrTableCell4.Weight = 0.27876330737245658R
        '
        'XrTableCell5
        '
        Me.XrTableCell5.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Cuenta")})
        Me.XrTableCell5.Name = "XrTableCell5"
        Me.XrTableCell5.Text = "XrTableCell5"
        Me.XrTableCell5.Weight = 0.51797492590992933R
        '
        'XrTableCell9
        '
        Me.XrTableCell9.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Plan")})
        Me.XrTableCell9.Name = "XrTableCell9"
        Me.XrTableCell9.Text = "XrTableCell9"
        Me.XrTableCell9.Weight = 0.65853704812232872R
        '
        'XrTableCell14
        '
        Me.XrTableCell14.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Monto", "{0:#,#0.00}")})
        Me.XrTableCell14.Name = "XrTableCell14"
        Me.XrTableCell14.StylePriority.UseTextAlignment = False
        Me.XrTableCell14.Text = "XrTableCell14"
        Me.XrTableCell14.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTableCell14.Weight = 0.28823739564889694R
        '
        'XrTableCell11
        '
        Me.XrTableCell11.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Minutos", "{0:#,#0}")})
        Me.XrTableCell11.Name = "XrTableCell11"
        Me.XrTableCell11.Text = "XrTableCell11"
        Me.XrTableCell11.Weight = 0.24254233092143787R
        '
        'XrTableCell15
        '
        Me.XrTableCell15.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.FechaFinContrato", "{0:d/MM/yyyy}")})
        Me.XrTableCell15.Name = "XrTableCell15"
        Me.XrTableCell15.Text = "XrTableCell15"
        Me.XrTableCell15.Weight = 0.30565335616817818R
        '
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(6.127962!, 23.91666!)
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
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(6.127962!, 47.45833!)
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
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(79.93628!, 23.91666!)
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
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(368.6244!, 23.91669!)
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
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(79.93628!, 47.45833!)
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
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel4.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(582.8458!, 23.91669!)
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
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(690.0541!, 23.91669!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(83.07391!, 23.0!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XRPT_Facturacion_LineasSinConsumoTotal
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter})
        Me.DataMember = "MOV_FAC_REP_LineasSinConsumo"
        Me.DataSource = Me.DsReportesFacturacion1
        Me.Margins = New System.Drawing.Printing.Margins(29, 46, 5, 0)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.Version = "12.2"
        CType(Me.xrTable_Cabecera_Superior, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReportesFacturacion1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.xrTable_Detalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents xrTitulo As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents xrTable_Cabecera_Superior As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow3 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell17 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell18 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell19 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell20 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell21 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell22 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell23 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell24 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents DsReportesFacturacion1 As dsReportesFacturacion
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
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
End Class
