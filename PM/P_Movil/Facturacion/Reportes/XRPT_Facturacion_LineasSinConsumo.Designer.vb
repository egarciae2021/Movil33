<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Facturacion_LineasSinConsumo
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Facturacion_LineasSinConsumo))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell16 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.xrTitulo = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrTable_Cabecera = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell10 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell12 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell13 = New DevExpress.XtraReports.UI.XRTableCell()
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
        Me.DsReportesFacturacion1 = New dsReportesFacturacion()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTableCell17 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell18 = New DevExpress.XtraReports.UI.XRTableCell()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.xrTable_Cabecera, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.xrTable_Detalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReportesFacturacion1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.Detail.HeightF = 11.875!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(16.70319!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(608.1978!, 11.875!)
        '
        'XrTableRow2
        '
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell16})
        Me.XrTableRow2.Name = "XrTableRow2"
        Me.XrTableRow2.Weight = 1.0R
        '
        'XrTableCell16
        '
        Me.XrTableCell16.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Concepto")})
        Me.XrTableCell16.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.XrTableCell16.Name = "XrTableCell16"
        Me.XrTableCell16.StylePriority.UseFont = False
        Me.XrTableCell16.Text = "XrTableCell16"
        Me.XrTableCell16.Weight = 1.0R
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
        Me.BottomMargin.HeightF = 1.041667!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTitulo, Me.xrPictureBoxLogo})
        Me.PageHeader.HeightF = 99.45834!
        Me.PageHeader.Name = "PageHeader"
        '
        'xrTitulo
        '
        Me.xrTitulo.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.xrTitulo.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.xrTitulo.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 29.83335!)
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
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(624.9011!, 29.83335!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(134.3855!, 37.99999!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageInfo1, Me.XrLabel4, Me.LBLUsuario, Me.XrPageInfo2, Me.LBLEmpresa, Me.XrLabel6, Me.XrLabel5})
        Me.PageFooter.HeightF = 88.54166!
        Me.PageFooter.Name = "PageFooter"
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(687.926!, 18.00006!)
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
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(582.7177!, 18.00006!)
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
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(75.80821!, 41.5417!)
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
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(364.4964!, 18.00006!)
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
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(75.80821!, 18.0!)
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
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(1.999895!, 41.5417!)
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
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.999895!, 18.0!)
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
        'xrTable_Cabecera
        '
        Me.xrTable_Cabecera.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTable_Cabecera.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.xrTable_Cabecera.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 4.0!)
        Me.xrTable_Cabecera.Name = "xrTable_Cabecera"
        Me.xrTable_Cabecera.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.xrTable_Cabecera.SizeF = New System.Drawing.SizeF(772.0!, 15.625!)
        Me.xrTable_Cabecera.StylePriority.UseBorders = False
        Me.xrTable_Cabecera.StylePriority.UseFont = False
        Me.xrTable_Cabecera.StylePriority.UseTextAlignment = False
        Me.xrTable_Cabecera.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrTableRow1
        '
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell6, Me.XrTableCell2, Me.XrTableCell18, Me.XrTableCell3, Me.XrTableCell8, Me.XrTableCell10, Me.XrTableCell12, Me.XrTableCell13})
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
        Me.XrTableCell1.Weight = 0.34269547126743349R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell6.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.Text = "Empleado"
        Me.XrTableCell6.Weight = 0.73491010534968215R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell2.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.Text = "Estado Línea"
        Me.XrTableCell2.Weight = 0.27150554715361408R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell3.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.Text = "Cuenta"
        Me.XrTableCell3.Weight = 0.32816213697313545R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell8.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.Text = "Plan"
        Me.XrTableCell8.Weight = 0.56547403854755107R
        '
        'XrTableCell10
        '
        Me.XrTableCell10.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell10.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell10.Name = "XrTableCell10"
        Me.XrTableCell10.StylePriority.UseBackColor = False
        Me.XrTableCell10.StylePriority.UseFont = False
        Me.XrTableCell10.Text = "Monto"
        Me.XrTableCell10.Weight = 0.28073323650082038R
        '
        'XrTableCell12
        '
        Me.XrTableCell12.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell12.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell12.Name = "XrTableCell12"
        Me.XrTableCell12.StylePriority.UseBackColor = False
        Me.XrTableCell12.StylePriority.UseFont = False
        Me.XrTableCell12.Text = "Minutos"
        Me.XrTableCell12.Weight = 0.22842485322948886R
        '
        'XrTableCell13
        '
        Me.XrTableCell13.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell13.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell13.Name = "XrTableCell13"
        Me.XrTableCell13.StylePriority.UseBackColor = False
        Me.XrTableCell13.StylePriority.UseFont = False
        Me.XrTableCell13.Text = "Fecha Fin"
        Me.XrTableCell13.Weight = 0.30549779652840575R
        '
        'xrTable_Detalle
        '
        Me.xrTable_Detalle.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrTable_Detalle.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.xrTable_Detalle.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 20.375!)
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
        Me.XrTableRow59.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell144, Me.XrTableCell7, Me.XrTableCell4, Me.XrTableCell17, Me.XrTableCell5, Me.XrTableCell9, Me.XrTableCell14, Me.XrTableCell11, Me.XrTableCell15})
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
        Me.XrTableCell5.Weight = 0.34208004748895215R
        '
        'XrTableCell9
        '
        Me.XrTableCell9.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Plan")})
        Me.XrTableCell9.Name = "XrTableCell9"
        Me.XrTableCell9.Text = "XrTableCell9"
        Me.XrTableCell9.Weight = 0.57544446358834123R
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
        'DsReportesFacturacion1
        '
        Me.DsReportesFacturacion1.DataSetName = "dsReportesFacturacion"
        Me.DsReportesFacturacion1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'XrLabel1
        '
        Me.XrLabel1.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel1.Font = New System.Drawing.Font("Arial", 7.0!, CType((System.Drawing.FontStyle.Bold Or System.Drawing.FontStyle.Underline), System.Drawing.FontStyle))
        Me.XrLabel1.ForeColor = System.Drawing.Color.Black
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(1.999895!, 42.66666!)
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(73.80831!, 13.00002!)
        Me.XrLabel1.StylePriority.UseBackColor = False
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.StylePriority.UseForeColor = False
        Me.XrLabel1.StylePriority.UseTextAlignment = False
        Me.XrLabel1.Text = "Conceptos:"
        Me.XrLabel1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'GroupHeader1
        '
        Me.GroupHeader1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTable_Detalle, Me.XrLabel1, Me.xrTable_Cabecera})
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("Linea", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 55.66669!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'GroupFooter1
        '
        Me.GroupFooter1.HeightF = 9.375!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'XrTableCell17
        '
        Me.XrTableCell17.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_FAC_REP_LineasSinConsumo.Operador")})
        Me.XrTableCell17.Name = "XrTableCell17"
        Me.XrTableCell17.Text = "XrTableCell17"
        Me.XrTableCell17.Weight = 0.25898746295496466R
        '
        'XrTableCell18
        '
        Me.XrTableCell18.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell18.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell18.Name = "XrTableCell18"
        Me.XrTableCell18.StylePriority.UseBackColor = False
        Me.XrTableCell18.StylePriority.UseFont = False
        Me.XrTableCell18.Text = "Operador"
        Me.XrTableCell18.Weight = 0.25224451569384243R
        '
        'XRPT_Facturacion_LineasSinConsumo
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter, Me.GroupHeader1, Me.GroupFooter1})
        Me.DataMember = "MOV_FAC_REP_LineasSinConsumo"
        Me.DataSource = Me.DsReportesFacturacion1
        Me.Margins = New System.Drawing.Printing.Margins(38, 40, 0, 1)
        Me.Version = "12.2"
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.xrTable_Cabecera, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.xrTable_Detalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReportesFacturacion1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

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
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
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
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell16 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents XrTableCell18 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell17 As DevExpress.XtraReports.UI.XRTableCell
End Class
