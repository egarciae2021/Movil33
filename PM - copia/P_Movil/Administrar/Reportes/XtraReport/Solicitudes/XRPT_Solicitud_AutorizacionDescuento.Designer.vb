<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Solicitud_AutorizacionDescuento
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Solicitud_AutorizacionDescuento))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrTabItems = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.xrCRowNumber = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrCFechaCreacion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrCDesSolicitud = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrCNumCuotas = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.Consultas1 = New Consultas()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.xrContenido1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrTitulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrTitulo1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.xrCMontoCuota = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrContenido2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrEmpleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.MoV_s_Solicitud_Reporte_AutorizacionDescuentoTableAdapter1 = New ds_Mantenimiento_ReportesTableAdapters.MOV_s_Solicitud_Reporte_AutorizacionDescuentoTableAdapter()
        CType(Me.xrTabItems, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrEmpleado, Me.XrLabel2, Me.xrContenido2, Me.xrTabItems})
        Me.Detail.HeightF = 134.9583!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTabItems
        '
        Me.xrTabItems.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.xrTabItems.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrTabItems.Name = "xrTabItems"
        Me.xrTabItems.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.xrTabItems.SizeF = New System.Drawing.SizeF(797.0!, 25.0!)
        Me.xrTabItems.StylePriority.UseFont = False
        Me.xrTabItems.StylePriority.UseTextAlignment = False
        Me.xrTabItems.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrTableRow1
        '
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.xrCRowNumber, Me.xrCFechaCreacion, Me.xrCDesSolicitud, Me.xrCNumCuotas, Me.xrCMontoCuota})
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Weight = 1.0R
        '
        'xrCRowNumber
        '
        Me.xrCRowNumber.Name = "xrCRowNumber"
        Me.xrCRowNumber.Text = "xrCRowNumber"
        Me.xrCRowNumber.Weight = 0.24962745267463013R
        '
        'xrCFechaCreacion
        '
        Me.xrCFechaCreacion.Name = "xrCFechaCreacion"
        Me.xrCFechaCreacion.Text = "xrCFechaCreacion"
        Me.xrCFechaCreacion.Weight = 0.52235465693271055R
        '
        'xrCDesSolicitud
        '
        Me.xrCDesSolicitud.Multiline = True
        Me.xrCDesSolicitud.Name = "xrCDesSolicitud"
        Me.xrCDesSolicitud.Text = "xrCDesSolicitud" & Global.Microsoft.VisualBasic.ChrW(13)
        Me.xrCDesSolicitud.Weight = 1.4013783686908632R
        '
        'xrCNumCuotas
        '
        Me.xrCNumCuotas.Name = "xrCNumCuotas"
        Me.xrCNumCuotas.Text = "xrCNumCuotas"
        Me.xrCNumCuotas.Weight = 0.32663952170179605R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 5.0!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.HeightF = 9.916687!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1, Me.xrContenido1, Me.xrTitulo2, Me.xrTitulo1, Me.xrPictureBoxLogo})
        Me.PageHeader.HeightF = 198.0833!
        Me.PageHeader.Name = "PageHeader"
        '
        'xrContenido1
        '
        Me.xrContenido1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.xrContenido1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 72.99998!)
        Me.xrContenido1.Name = "xrContenido1"
        Me.xrContenido1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.xrContenido1.SizeF = New System.Drawing.SizeF(796.9999!, 83.41666!)
        Me.xrContenido1.StylePriority.UseFont = False
        Me.xrContenido1.StylePriority.UseTextAlignment = False
        Me.xrContenido1.Text = "xrContenido1"
        Me.xrContenido1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleJustify
        '
        'xrTitulo2
        '
        Me.xrTitulo2.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.xrTitulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.xrTitulo2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 41.66665!)
        Me.xrTitulo2.Name = "xrTitulo2"
        Me.xrTitulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.xrTitulo2.SizeF = New System.Drawing.SizeF(797.0!, 31.33334!)
        Me.xrTitulo2.StylePriority.UseFont = False
        Me.xrTitulo2.StylePriority.UseForeColor = False
        Me.xrTitulo2.StylePriority.UseTextAlignment = False
        Me.xrTitulo2.Text = "xrTitulo2"
        Me.xrTitulo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'xrTitulo1
        '
        Me.xrTitulo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.xrTitulo1.LocationFloat = New DevExpress.Utils.PointFloat(148.9583!, 0.0!)
        Me.xrTitulo1.Name = "xrTitulo1"
        Me.xrTitulo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.xrTitulo1.SizeF = New System.Drawing.SizeF(648.0417!, 41.66665!)
        Me.xrTitulo1.StylePriority.UseFont = False
        Me.xrTitulo1.StylePriority.UseTextAlignment = False
        Me.xrTitulo1.Text = "xrTitulo1"
        Me.xrTitulo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.9583!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageInfo1, Me.XrLabel4, Me.XrPageInfo2, Me.XrLabel1})
        Me.PageFooter.Font = New System.Drawing.Font("Trebuchet MS", 9.75!)
        Me.PageFooter.HeightF = 46.875!
        Me.PageFooter.Name = "PageFooter"
        Me.PageFooter.StylePriority.UseFont = False
        '
        'xrCMontoCuota
        '
        Me.xrCMontoCuota.Name = "xrCMontoCuota"
        Me.xrCMontoCuota.Text = "xrCMontoCuota"
        Me.xrCMontoCuota.Weight = 0.5R
        '
        'XrTable1
        '
        Me.XrTable1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 173.0833!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(796.9999!, 25.0!)
        Me.XrTable1.StylePriority.UseFont = False
        Me.XrTable1.StylePriority.UseTextAlignment = False
        Me.XrTable1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrTableRow2
        '
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell2, Me.XrTableCell4, Me.XrTableCell5, Me.XrTableCell3})
        Me.XrTableRow2.Name = "XrTableRow2"
        Me.XrTableRow2.Weight = 1.0R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell1.ForeColor = System.Drawing.Color.White
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.StylePriority.UseBackColor = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.StylePriority.UseForeColor = False
        Me.XrTableCell1.Text = "Item"
        Me.XrTableCell1.Weight = 0.24962746863418933R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell2.ForeColor = System.Drawing.Color.White
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UseForeColor = False
        Me.XrTableCell2.Text = "Fecha Creacion"
        Me.XrTableCell2.Weight = 0.52235466305558431R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.ForeColor = System.Drawing.Color.White
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.Text = "Monto Cuota"
        Me.XrTableCell3.Weight = 0.50000021059810862R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell4.ForeColor = System.Drawing.Color.White
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.StylePriority.UseBackColor = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.StylePriority.UseForeColor = False
        Me.XrTableCell4.Text = "Concepto"
        Me.XrTableCell4.Weight = 1.4013785936928198R
        '
        'XrTableCell5
        '
        Me.XrTableCell5.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell5.ForeColor = System.Drawing.Color.White
        Me.XrTableCell5.Name = "XrTableCell5"
        Me.XrTableCell5.StylePriority.UseBackColor = False
        Me.XrTableCell5.StylePriority.UseFont = False
        Me.XrTableCell5.StylePriority.UseForeColor = False
        Me.XrTableCell5.Text = "N° Cuotas"
        Me.XrTableCell5.Weight = 0.32663906401929788R
        '
        'xrContenido2
        '
        Me.xrContenido2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.xrContenido2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 40.58332!)
        Me.xrContenido2.Name = "xrContenido2"
        Me.xrContenido2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 96.0!)
        Me.xrContenido2.SizeF = New System.Drawing.SizeF(797.0!, 51.125!)
        Me.xrContenido2.StylePriority.UseFont = False
        Me.xrContenido2.StylePriority.UseTextAlignment = False
        Me.xrContenido2.Text = "xrContenido2"
        Me.xrContenido2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleJustify
        '
        'XrLabel2
        '
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(534.6812!, 101.9583!)
        Me.XrLabel2.Multiline = True
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 96.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(100.0!, 23.0!)
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "EMPLEADOR" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10)
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'xrEmpleado
        '
        Me.xrEmpleado.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.xrEmpleado.LocationFloat = New DevExpress.Utils.PointFloat(125.9232!, 101.9583!)
        Me.xrEmpleado.Name = "xrEmpleado"
        Me.xrEmpleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 96.0!)
        Me.xrEmpleado.SizeF = New System.Drawing.SizeF(100.0!, 23.0!)
        Me.xrEmpleado.StylePriority.UseFont = False
        Me.xrEmpleado.StylePriority.UseTextAlignment = False
        Me.xrEmpleado.Text = "EMPLEADO"
        Me.xrEmpleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLabel1
        '
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 9.75!)
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(796.9999!, 23.0!)
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.Text = "NOTA: Este documento de autorización debe ser presentado en original y sin enmend" & _
    "aduras o correcciones."
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(713.926!, 22.99999!)
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
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(608.7177!, 22.99999!)
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
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(324.7177!, 22.99999!)
        Me.XrPageInfo2.Name = "XrPageInfo2"
        Me.XrPageInfo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo2.SizeF = New System.Drawing.SizeF(126.2684!, 22.37499!)
        Me.XrPageInfo2.StylePriority.UseBackColor = False
        Me.XrPageInfo2.StylePriority.UseBorderColor = False
        Me.XrPageInfo2.StylePriority.UseBorders = False
        Me.XrPageInfo2.StylePriority.UseFont = False
        Me.XrPageInfo2.StylePriority.UseTextAlignment = False
        Me.XrPageInfo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'MoV_s_Solicitud_Reporte_AutorizacionDescuentoTableAdapter1
        '
        Me.MoV_s_Solicitud_Reporte_AutorizacionDescuentoTableAdapter1.ClearBeforeFill = True
        '
        'XRPT_Solicitud_AutorizacionDescuento
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter})
        Me.DataAdapter = Me.MoV_s_Solicitud_Reporte_AutorizacionDescuentoTableAdapter1
        Me.DataMember = "MOV_s_Servicio_Reporte_ServiciosAgrupados"
        Me.DataSource = Me.Consultas1
        Me.Margins = New System.Drawing.Printing.Margins(27, 26, 5, 10)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.Version = "12.2"
        CType(Me.xrTabItems, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents xrTitulo1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrTitulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrTabItems As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents xrCRowNumber As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrCDesSolicitud As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrCNumCuotas As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents xrCFechaCreacion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrContenido1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrCMontoCuota As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrEmpleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrContenido2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents MoV_s_Solicitud_Reporte_AutorizacionDescuentoTableAdapter1 As ds_Mantenimiento_ReportesTableAdapters.MOV_s_Solicitud_Reporte_AutorizacionDescuentoTableAdapter
End Class
