<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Facturacion_LineasRoaming
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Facturacion_LineasRoaming))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.xrTitulo = New DevExpress.XtraReports.UI.XRLabel()
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
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        CType(Me.xrTable_Cabecera, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 8.333333!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.HeightF = 5.208333!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTitulo, Me.xrTable_Cabecera, Me.xrPictureBoxLogo})
        Me.PageHeader.Name = "PageHeader"
        '
        'PageFooter
        '
        Me.PageFooter.Name = "PageFooter"
        '
        'xrTitulo
        '
        Me.xrTitulo.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.xrTitulo.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.xrTitulo.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 13.68752!)
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
        'xrTable_Cabecera
        '
        Me.xrTable_Cabecera.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTable_Cabecera.Font = New System.Drawing.Font("Arial", 6.0!)
        Me.xrTable_Cabecera.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 70.68748!)
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
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell6, Me.XrTableCell2, Me.XrTableCell3, Me.XrTableCell8, Me.XrTableCell10, Me.XrTableCell12, Me.XrTableCell13})
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
        Me.XrTableCell3.Weight = 0.50448903138768486R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell8.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.Text = "Plan"
        Me.XrTableCell8.Weight = 0.6413916598268441R
        '
        'XrTableCell10
        '
        Me.XrTableCell10.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell10.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell10.Name = "XrTableCell10"
        Me.XrTableCell10.StylePriority.UseBackColor = False
        Me.XrTableCell10.StylePriority.UseFont = False
        Me.XrTableCell10.Text = "Monto Línea"
        Me.XrTableCell10.Weight = 0.28073323650082038R
        '
        'XrTableCell12
        '
        Me.XrTableCell12.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell12.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell12.Name = "XrTableCell12"
        Me.XrTableCell12.StylePriority.UseBackColor = False
        Me.XrTableCell12.StylePriority.UseFont = False
        Me.XrTableCell12.Text = "Total Factura"
        Me.XrTableCell12.Weight = 0.29541085689622582R
        '
        'XrTableCell13
        '
        Me.XrTableCell13.BackColor = System.Drawing.Color.FromArgb(CType(CType(218, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.XrTableCell13.Font = New System.Drawing.Font("Arial", 7.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell13.Name = "XrTableCell13"
        Me.XrTableCell13.StylePriority.UseBackColor = False
        Me.XrTableCell13.StylePriority.UseFont = False
        Me.XrTableCell13.Text = "Variación"
        Me.XrTableCell13.Weight = 0.23851179286166876R
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(635.1145!, 13.68752!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(134.3855!, 37.99999!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'XRPT_Facturacion_LineasRoaming
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter})
        Me.Margins = New System.Drawing.Printing.Margins(38, 36, 8, 5)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.Version = "12.2"
        CType(Me.xrTable_Cabecera, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
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
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
End Class
