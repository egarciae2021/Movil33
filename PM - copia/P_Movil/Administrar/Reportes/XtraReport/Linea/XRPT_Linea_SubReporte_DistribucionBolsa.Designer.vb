<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Linea_SubReporte_DistribucionBolsa
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
        Me.XrMonto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.XrTable3 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow3 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell16 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMonto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Consultas1 = New Consultas()
        Me.MOV_s_Linea_SubReporte_DistribucionBolsaTableAdapter = New ConsultasTableAdapters.MOV_s_Linea_SubReporte_DistribucionBolsaTableAdapter()
        Me.P_vcLinea = New DevExpress.XtraReports.Parameters.Parameter()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).BeginInit()
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
        Me.xrTable7.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrTable7.Name = "xrTable7"
        Me.xrTable7.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTable7.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow9})
        Me.xrTable7.SizeF = New System.Drawing.SizeF(365.5336!, 20.0!)
        Me.xrTable7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow9
        '
        Me.xrTableRow9.Borders = DevExpress.XtraPrinting.BorderSide.Right
        Me.xrTableRow9.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.xrTableCell36, Me.XrCantidadDet, Me.XrMonto})
        Me.xrTableRow9.Name = "xrTableRow9"
        Me.xrTableRow9.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow9.Weight = 1.0R
        '
        'xrTableCell36
        '
        Me.xrTableCell36.BackColor = System.Drawing.Color.Transparent
        Me.xrTableCell36.BorderColor = System.Drawing.Color.LightGray
        Me.xrTableCell36.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableCell36.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_SubReporte_DistribucionBolsa.vcNomSer")})
        Me.xrTableCell36.EvenStyleName = "Fila1"
        Me.xrTableCell36.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.xrTableCell36.Name = "xrTableCell36"
        Me.xrTableCell36.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.xrTableCell36.StyleName = "Fila2"
        Me.xrTableCell36.StylePriority.UseBorderColor = False
        Me.xrTableCell36.StylePriority.UseBorders = False
        Me.xrTableCell36.StylePriority.UseFont = False
        Me.xrTableCell36.StylePriority.UsePadding = False
        Me.xrTableCell36.Text = "xrTableCell36"
        Me.xrTableCell36.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.xrTableCell36.Weight = 0.19715576502479137R
        '
        'XrCantidadDet
        '
        Me.XrCantidadDet.BackColor = System.Drawing.Color.Transparent
        Me.XrCantidadDet.BorderColor = System.Drawing.Color.LightGray
        Me.XrCantidadDet.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrCantidadDet.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_SubReporte_DistribucionBolsa.dcCanLin")})
        Me.XrCantidadDet.EvenStyleName = "Fila1"
        Me.XrCantidadDet.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCantidadDet.Name = "XrCantidadDet"
        Me.XrCantidadDet.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCantidadDet.StyleName = "Fila2"
        Me.XrCantidadDet.StylePriority.UseBorderColor = False
        Me.XrCantidadDet.StylePriority.UseBorders = False
        Me.XrCantidadDet.StylePriority.UseFont = False
        Me.XrCantidadDet.StylePriority.UsePadding = False
        Me.XrCantidadDet.StylePriority.UseTextAlignment = False
        Me.XrCantidadDet.Text = "XrCantidadDet"
        Me.XrCantidadDet.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrCantidadDet.Weight = 0.15125049438264454R
        '
        'XrMonto
        '
        Me.XrMonto.BackColor = System.Drawing.Color.Transparent
        Me.XrMonto.BorderColor = System.Drawing.Color.LightGray
        Me.XrMonto.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrMonto.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_SubReporte_DistribucionBolsa.dcMonAsiLin")})
        Me.XrMonto.EvenStyleName = "Fila1"
        Me.XrMonto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrMonto.Name = "XrMonto"
        Me.XrMonto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrMonto.StyleName = "Fila2"
        Me.XrMonto.StylePriority.UseBorderColor = False
        Me.XrMonto.StylePriority.UseBorders = False
        Me.XrMonto.StylePriority.UseFont = False
        Me.XrMonto.StylePriority.UsePadding = False
        Me.XrMonto.Text = "XrMonto"
        Me.XrMonto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrMonto.Weight = 0.11252798617869503R
        Me.XrMonto.XlsxFormatString = "$0.0"
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
        Me.BottomMargin.HeightF = 0.0!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTable3
        '
        Me.XrTable3.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrTable3.Name = "XrTable3"
        Me.XrTable3.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable3.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow3})
        Me.XrTable3.SizeF = New System.Drawing.SizeF(365.5336!, 23.0!)
        Me.XrTable3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow3
        '
        Me.XrTableRow3.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow3.BorderColor = System.Drawing.Color.White
        Me.XrTableRow3.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow3.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell6, Me.XrTableCell16, Me.xrTituloMonto})
        Me.XrTableRow3.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow3.ForeColor = System.Drawing.Color.White
        Me.XrTableRow3.Name = "XrTableRow3"
        Me.XrTableRow3.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow3.Weight = 0.25842696629213485R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell6.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.ForeColor = System.Drawing.Color.White
        Me.XrTableCell6.Multiline = True
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseBorders = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UseForeColor = False
        Me.XrTableCell6.StylePriority.UsePadding = False
        Me.XrTableCell6.Text = "Servicio"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.23066595464589867R
        '
        'XrTableCell16
        '
        Me.XrTableCell16.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell16.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell16.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell16.ForeColor = System.Drawing.Color.White
        Me.XrTableCell16.Name = "XrTableCell16"
        Me.XrTableCell16.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell16.StylePriority.UseBackColor = False
        Me.XrTableCell16.StylePriority.UseBorders = False
        Me.XrTableCell16.StylePriority.UseFont = False
        Me.XrTableCell16.StylePriority.UseForeColor = False
        Me.XrTableCell16.StylePriority.UsePadding = False
        Me.XrTableCell16.Text = "Min. Asignados"
        Me.XrTableCell16.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell16.Weight = 0.1769583340111418R
        '
        'xrTituloMonto
        '
        Me.xrTituloMonto.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.xrTituloMonto.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.xrTituloMonto.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.xrTituloMonto.ForeColor = System.Drawing.Color.White
        Me.xrTituloMonto.Name = "xrTituloMonto"
        Me.xrTituloMonto.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.xrTituloMonto.StylePriority.UseBackColor = False
        Me.xrTituloMonto.StylePriority.UseBorders = False
        Me.xrTituloMonto.StylePriority.UseFont = False
        Me.xrTituloMonto.StylePriority.UseForeColor = False
        Me.xrTituloMonto.StylePriority.UsePadding = False
        Me.xrTituloMonto.StylePriority.UseTextAlignment = False
        Me.xrTituloMonto.Text = "Monto"
        Me.xrTituloMonto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.xrTituloMonto.Weight = 0.13165417931147128R
        '
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_Linea_SubReporte_DistribucionBolsaTableAdapter
        '
        Me.MOV_s_Linea_SubReporte_DistribucionBolsaTableAdapter.ClearBeforeFill = True
        '
        'P_vcLinea
        '
        Me.P_vcLinea.Description = "P_vcLinea"
        Me.P_vcLinea.Name = "P_vcLinea"
        Me.P_vcLinea.Value = "''"
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable3})
        Me.PageHeader.HeightF = 23.0!
        Me.PageHeader.Name = "PageHeader"
        '
        'Fila1
        '
        Me.Fila1.BackColor = System.Drawing.Color.FromArgb(CType(CType(253, Byte), Integer), CType(CType(245, Byte), Integer), CType(CType(235, Byte), Integer))
        Me.Fila1.Name = "Fila1"
        Me.Fila1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'Fila2
        '
        Me.Fila2.BackColor = System.Drawing.Color.White
        Me.Fila2.Name = "Fila2"
        Me.Fila2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'XRPT_Linea_SubReporte_DistribucionBolsa
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader})
        Me.DataAdapter = Me.MOV_s_Linea_SubReporte_DistribucionBolsaTableAdapter
        Me.DataMember = "MOV_s_Linea_SubReporte_DistribucionBolsa"
        Me.DataSource = Me.Consultas1
        Me.FilterString = "[P_vcNUM] = ?P_vcLinea"
        Me.Margins = New System.Drawing.Printing.Margins(254, 220, 0, 0)
        Me.Parameters.AddRange(New DevExpress.XtraReports.Parameters.Parameter() {Me.P_vcLinea})
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1, Me.Fila2})
        Me.Version = "11.2"
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents xrTable7 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow9 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents xrTableCell36 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCantidadDet As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrMonto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents MOV_s_Linea_SubReporte_DistribucionBolsaTableAdapter As ConsultasTableAdapters.MOV_s_Linea_SubReporte_DistribucionBolsaTableAdapter
    Friend WithEvents P_vcLinea As DevExpress.XtraReports.Parameters.Parameter
    Friend WithEvents XrTable3 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow3 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell16 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMonto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
End Class
