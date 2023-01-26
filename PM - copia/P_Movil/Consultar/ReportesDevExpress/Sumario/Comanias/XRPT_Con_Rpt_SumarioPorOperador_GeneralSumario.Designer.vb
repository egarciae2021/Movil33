<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrServicio = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNomServicio = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCantidad = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrConsumo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrSucursal = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.XrOperador = New DevExpress.XtraReports.UI.XRLabel()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel7 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel8 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.ReportFooter = New DevExpress.XtraReports.UI.ReportFooterBand()
        Me.XrTable4 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow4 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotLlamada = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotDuracion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotalCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCeldA = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCell21 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTituloCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.GroupHeader2 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow3 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotOpeLlamada = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotOpeDuracion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotOpeCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.GroupFooter2 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTable3 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotSucuLlam = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotSucuDur = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotSucuCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.DsReporteConsultas1 = New dsReporteConsultas()
        Me.MoV_s_IMP_Llamada_SumarioPorOper_GenSumarioTableAdapter1 = New dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_SumarioPorOper_GenSumarioTableAdapter()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo3 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo4 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable4, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrDetalle})
        Me.Detail.HeightF = 37.5!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrDetalle
        '
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(1.500177!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(826.4581!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrServicio, Me.XrNomServicio, Me.XrCantidad, Me.XrConsumo, Me.XrCosto})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrServicio
        '
        Me.XrServicio.BackColor = System.Drawing.Color.Transparent
        Me.XrServicio.CanGrow = False
        Me.XrServicio.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorOper_GenSumario.vcNomCorSer")})
        Me.XrServicio.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrServicio.Name = "XrServicio"
        Me.XrServicio.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrServicio.StylePriority.UseFont = False
        Me.XrServicio.StylePriority.UsePadding = False
        Me.XrServicio.StylePriority.UseTextAlignment = False
        Me.XrServicio.Text = "XrServicio"
        Me.XrServicio.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrServicio.Weight = 0.14115226590378122R
        '
        'XrNomServicio
        '
        Me.XrNomServicio.BackColor = System.Drawing.Color.Transparent
        Me.XrNomServicio.CanGrow = False
        Me.XrNomServicio.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorOper_GenSumario.vcNomSer")})
        Me.XrNomServicio.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNomServicio.Name = "XrNomServicio"
        Me.XrNomServicio.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrNomServicio.StylePriority.UseFont = False
        Me.XrNomServicio.StylePriority.UsePadding = False
        Me.XrNomServicio.StylePriority.UseTextAlignment = False
        Me.XrNomServicio.Text = "XrNomServicio"
        Me.XrNomServicio.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrNomServicio.Weight = 0.23817769810351666R
        '
        'XrCantidad
        '
        Me.XrCantidad.BackColor = System.Drawing.Color.Transparent
        Me.XrCantidad.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorOper_GenSumario.inNumLla")})
        Me.XrCantidad.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCantidad.Name = "XrCantidad"
        Me.XrCantidad.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCantidad.StylePriority.UseFont = False
        Me.XrCantidad.StylePriority.UsePadding = False
        Me.XrCantidad.StylePriority.UseTextAlignment = False
        Me.XrCantidad.Text = "XrCantidad"
        Me.XrCantidad.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCantidad.Weight = 0.12673287215905152R
        '
        'XrConsumo
        '
        Me.XrConsumo.BackColor = System.Drawing.Color.Transparent
        Me.XrConsumo.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorOper_GenSumario.vcDurRea")})
        Me.XrConsumo.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrConsumo.Name = "XrConsumo"
        Me.XrConsumo.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrConsumo.StylePriority.UseFont = False
        Me.XrConsumo.StylePriority.UsePadding = False
        Me.XrConsumo.StylePriority.UseTextAlignment = False
        Me.XrConsumo.Text = "XrConsumo"
        Me.XrConsumo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrConsumo.Weight = 0.13517831130929955R
        '
        'XrCosto
        '
        Me.XrCosto.BackColor = System.Drawing.Color.Transparent
        Me.XrCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCosto.Name = "XrCosto"
        Me.XrCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCosto.StylePriority.UseFont = False
        Me.XrCosto.StylePriority.UsePadding = False
        Me.XrCosto.StylePriority.UseTextAlignment = False
        Me.XrCosto.Text = "XrCosto"
        Me.XrCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCosto.Weight = 0.10219504099498965R
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
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrSucursal, Me.XrLabel1, Me.XrLabel12, Me.XrLabel10, Me.xrLine1, Me.Titulo2, Me.xrPictureBoxLogo, Me.XrOperador, Me.XrTable2})
        Me.PageHeader.HeightF = 237.5833!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrSucursal
        '
        Me.XrSucursal.BackColor = System.Drawing.Color.FromArgb(CType(CType(206, Byte), Integer), CType(CType(206, Byte), Integer), CType(CType(206, Byte), Integer))
        Me.XrSucursal.CanGrow = False
        Me.XrSucursal.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrSucursal.ForeColor = System.Drawing.Color.Navy
        Me.XrSucursal.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 148.125!)
        Me.XrSucursal.Name = "XrSucursal"
        Me.XrSucursal.Padding = New DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 100.0!)
        Me.XrSucursal.SizeF = New System.Drawing.SizeF(827.9584!, 23.0!)
        Me.XrSucursal.StylePriority.UseBackColor = False
        Me.XrSucursal.StylePriority.UseFont = False
        Me.XrSucursal.StylePriority.UseForeColor = False
        Me.XrSucursal.StylePriority.UsePadding = False
        Me.XrSucursal.StylePriority.UseTextAlignment = False
        Me.XrSucursal.Text = "XrSucursal"
        Me.XrSucursal.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel1
        '
        Me.XrLabel1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo3")})
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(1.499971!, 77.49999!)
        Me.XrLabel1.LockedInUserDesigner = True
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(826.4584!, 22.70835!)
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.StylePriority.UseForeColor = False
        Me.XrLabel1.StylePriority.UsePadding = False
        Me.XrLabel1.StylePriority.UseTextAlignment = False
        Me.XrLabel1.Text = "XrLabel1"
        Me.XrLabel1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLabel12
        '
        Me.XrLabel12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.XrLabel12.Font = New System.Drawing.Font("Trebuchet MS", 18.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel12.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel12.LocationFloat = New DevExpress.Utils.PointFloat(151.0416!, 3.666651!)
        Me.XrLabel12.LockedInUserDesigner = True
        Me.XrLabel12.Name = "XrLabel12"
        Me.XrLabel12.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel12.SizeF = New System.Drawing.SizeF(524.5726!, 37.99999!)
        Me.XrLabel12.StylePriority.UseFont = False
        Me.XrLabel12.StylePriority.UseForeColor = False
        Me.XrLabel12.StylePriority.UsePadding = False
        Me.XrLabel12.StylePriority.UseTextAlignment = False
        Me.XrLabel12.Text = "Titulo1"
        Me.XrLabel12.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLabel10
        '
        Me.XrLabel10.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo4")})
        Me.XrLabel10.Font = New System.Drawing.Font("Trebuchet MS", 9.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel10.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel10.LocationFloat = New DevExpress.Utils.PointFloat(1.499971!, 106.3855!)
        Me.XrLabel10.LockedInUserDesigner = True
        Me.XrLabel10.Name = "XrLabel10"
        Me.XrLabel10.Padding = New DevExpress.XtraPrinting.PaddingInfo(7, 1, 0, 0, 100.0!)
        Me.XrLabel10.SizeF = New System.Drawing.SizeF(826.4584!, 18.54166!)
        Me.XrLabel10.StylePriority.UseFont = False
        Me.XrLabel10.StylePriority.UseForeColor = False
        Me.XrLabel10.StylePriority.UsePadding = False
        Me.XrLabel10.Text = "XrLabel10"
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(1.499971!, 130.1355!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(826.4584!, 9.000015!)
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 14.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 49.30223!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(827.9584!, 22.70835!)
        Me.Titulo2.StylePriority.UseFont = False
        Me.Titulo2.StylePriority.UseForeColor = False
        Me.Titulo2.StylePriority.UsePadding = False
        Me.Titulo2.StylePriority.UseTextAlignment = False
        Me.Titulo2.Text = "Titulo2"
        Me.Titulo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(151.0416!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'XrOperador
        '
        Me.XrOperador.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrOperador.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrOperador.ForeColor = System.Drawing.Color.Navy
        Me.XrOperador.LocationFloat = New DevExpress.Utils.PointFloat(1.500177!, 181.875!)
        Me.XrOperador.Name = "XrOperador"
        Me.XrOperador.Padding = New DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 100.0!)
        Me.XrOperador.SizeF = New System.Drawing.SizeF(826.4581!, 23.0!)
        Me.XrOperador.StylePriority.UseBackColor = False
        Me.XrOperador.StylePriority.UseFont = False
        Me.XrOperador.StylePriority.UseForeColor = False
        Me.XrOperador.StylePriority.UsePadding = False
        Me.XrOperador.StylePriority.UseTextAlignment = False
        Me.XrOperador.Text = "XrOperador"
        Me.XrOperador.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageInfo2, Me.XrLabel5, Me.XrPageInfo1, Me.LBLUsuario, Me.XrLabel7, Me.LBLEmpresa, Me.XrLabel8, Me.XrLine2})
        Me.PageFooter.Name = "PageFooter"
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(351.0815!, 30.08327!)
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
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.CanGrow = False
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.500154!, 54.45836!)
        Me.XrLabel5.Name = "XrLabel5"
        Me.XrLabel5.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel5.SizeF = New System.Drawing.SizeF(71.2015!, 24.45833!)
        Me.XrLabel5.StylePriority.UseBackColor = False
        Me.XrLabel5.StylePriority.UseFont = False
        Me.XrLabel5.StylePriority.UseForeColor = False
        Me.XrLabel5.StylePriority.UseTextAlignment = False
        Me.XrLabel5.Text = "Emisor:"
        Me.XrLabel5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(736.4054!, 30.08327!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(91.55292!, 23.00001!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.CanGrow = False
        Me.LBLUsuario.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfUsuario")})
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(72.70166!, 54.45836!)
        Me.LBLUsuario.LockedInUserDesigner = True
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
        'XrLabel7
        '
        Me.XrLabel7.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel7.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel7.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel7.LocationFloat = New DevExpress.Utils.PointFloat(631.1971!, 30.08327!)
        Me.XrLabel7.Name = "XrLabel7"
        Me.XrLabel7.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel7.SizeF = New System.Drawing.SizeF(105.2083!, 23.0!)
        Me.XrLabel7.StylePriority.UseBackColor = False
        Me.XrLabel7.StylePriority.UseFont = False
        Me.XrLabel7.StylePriority.UseForeColor = False
        Me.XrLabel7.StylePriority.UseTextAlignment = False
        Me.XrLabel7.Text = "Fecha:"
        Me.XrLabel7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.CanGrow = False
        Me.LBLEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfEmpresa")})
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(72.70166!, 29.45836!)
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
        'XrLabel8
        '
        Me.XrLabel8.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel8.CanGrow = False
        Me.XrLabel8.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel8.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(1.500169!, 29.45836!)
        Me.XrLabel8.Name = "XrLabel8"
        Me.XrLabel8.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel8.SizeF = New System.Drawing.SizeF(71.2015!, 22.375!)
        Me.XrLabel8.StylePriority.UseBackColor = False
        Me.XrLabel8.StylePriority.UseFont = False
        Me.XrLabel8.StylePriority.UseForeColor = False
        Me.XrLabel8.StylePriority.UseTextAlignment = False
        Me.XrLabel8.Text = "Empresa:"
        Me.XrLabel8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(1.500154!, 8.583323!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(826.4583!, 8.999999!)
        '
        'ReportFooter
        '
        Me.ReportFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable4})
        Me.ReportFooter.HeightF = 25.0!
        Me.ReportFooter.Name = "ReportFooter"
        '
        'XrTable4
        '
        Me.XrTable4.LocationFloat = New DevExpress.Utils.PointFloat(120.9153!, 0.0!)
        Me.XrTable4.Name = "XrTable4"
        Me.XrTable4.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow4})
        Me.XrTable4.SizeF = New System.Drawing.SizeF(707.0431!, 25.0!)
        '
        'XrTableRow4
        '
        Me.XrTableRow4.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell2, Me.XrTotLlamada, Me.XrTotDuracion, Me.XrTotalCosto})
        Me.XrTableRow4.Name = "XrTableRow4"
        Me.XrTableRow4.Weight = 1.0R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTableCell2.BorderColor = System.Drawing.Color.White
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.Padding = New DevExpress.XtraPrinting.PaddingInfo(7, 0, 0, 0, 100.0!)
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseBorderColor = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UsePadding = False
        Me.XrTableCell2.StylePriority.UseTextAlignment = False
        Me.XrTableCell2.Text = "Total :"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell2.Weight = 2.1248078282133283R
        '
        'XrTotLlamada
        '
        Me.XrTotLlamada.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotLlamada.BorderColor = System.Drawing.Color.White
        Me.XrTotLlamada.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotLlamada.CanGrow = False
        Me.XrTotLlamada.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotLlamada.Name = "XrTotLlamada"
        Me.XrTotLlamada.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotLlamada.StylePriority.UseBackColor = False
        Me.XrTotLlamada.StylePriority.UseBorderColor = False
        Me.XrTotLlamada.StylePriority.UseBorders = False
        Me.XrTotLlamada.StylePriority.UseBorderWidth = False
        Me.XrTotLlamada.StylePriority.UseFont = False
        Me.XrTotLlamada.StylePriority.UsePadding = False
        Me.XrTotLlamada.StylePriority.UseTextAlignment = False
        Me.XrTotLlamada.Text = "XrTotLlamada"
        Me.XrTotLlamada.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotLlamada.Weight = 0.99033738256415571R
        '
        'XrTotDuracion
        '
        Me.XrTotDuracion.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotDuracion.BorderColor = System.Drawing.Color.White
        Me.XrTotDuracion.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotDuracion.CanGrow = False
        Me.XrTotDuracion.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotDuracion.Name = "XrTotDuracion"
        Me.XrTotDuracion.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTotDuracion.StylePriority.UseBackColor = False
        Me.XrTotDuracion.StylePriority.UseBorderColor = False
        Me.XrTotDuracion.StylePriority.UseBorders = False
        Me.XrTotDuracion.StylePriority.UseFont = False
        Me.XrTotDuracion.StylePriority.UsePadding = False
        Me.XrTotDuracion.StylePriority.UseTextAlignment = False
        Me.XrTotDuracion.Text = "XrTotDuracion"
        Me.XrTotDuracion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTotDuracion.Weight = 1.056331004618533R
        '
        'XrTotalCosto
        '
        Me.XrTotalCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalCosto.BorderColor = System.Drawing.Color.White
        Me.XrTotalCosto.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotalCosto.CanGrow = False
        Me.XrTotalCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalCosto.Name = "XrTotalCosto"
        Me.XrTotalCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotalCosto.StylePriority.UseBackColor = False
        Me.XrTotalCosto.StylePriority.UseBorderColor = False
        Me.XrTotalCosto.StylePriority.UseBorders = False
        Me.XrTotalCosto.StylePriority.UseFont = False
        Me.XrTotalCosto.StylePriority.UsePadding = False
        Me.XrTotalCosto.StylePriority.UseTextAlignment = False
        Me.XrTotalCosto.Text = "XrTotalCosto"
        Me.XrTotalCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotalCosto.Weight = 0.79858883153813542R
        '
        'GroupHeader1
        '
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("inCodOpe", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 0.0!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(1.500169!, 214.5833!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(826.4581!, 22.99997!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell3, Me.XrTableCell4, Me.XrCeldA, Me.XrCell21, Me.XrTituloCosto})
        Me.XrTableRow2.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow2.ForeColor = System.Drawing.Color.White
        Me.XrTableRow2.Name = "XrTableRow2"
        Me.XrTableRow2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow2.Weight = 0.25842696629213485R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell3.BorderColor = System.Drawing.Color.Transparent
        Me.XrTableCell3.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell3.CanGrow = False
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.ForeColor = System.Drawing.Color.White
        Me.XrTableCell3.Multiline = True
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorderColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.Text = "Servicio"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.17313232063873829R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell4.BorderColor = System.Drawing.Color.Transparent
        Me.XrTableCell4.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell4.CanGrow = False
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell4.ForeColor = System.Drawing.Color.White
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell4.StylePriority.UseBackColor = False
        Me.XrTableCell4.StylePriority.UseBorderColor = False
        Me.XrTableCell4.StylePriority.UseBorders = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.StylePriority.UseForeColor = False
        Me.XrTableCell4.StylePriority.UsePadding = False
        Me.XrTableCell4.Text = "Nombre del Servicio"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.29214029360915805R
        '
        'XrCeldA
        '
        Me.XrCeldA.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrCeldA.BorderColor = System.Drawing.Color.Transparent
        Me.XrCeldA.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrCeldA.CanGrow = False
        Me.XrCeldA.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrCeldA.Name = "XrCeldA"
        Me.XrCeldA.StylePriority.UseBackColor = False
        Me.XrCeldA.StylePriority.UseBorderColor = False
        Me.XrCeldA.StylePriority.UseBorders = False
        Me.XrCeldA.StylePriority.UseFont = False
        Me.XrCeldA.StylePriority.UseTextAlignment = False
        Me.XrCeldA.Text = "Cantidad"
        Me.XrCeldA.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrCeldA.Weight = 0.15544611441224224R
        '
        'XrCell21
        '
        Me.XrCell21.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrCell21.BorderColor = System.Drawing.Color.Transparent
        Me.XrCell21.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrCell21.CanGrow = False
        Me.XrCell21.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrCell21.ForeColor = System.Drawing.Color.White
        Me.XrCell21.Name = "XrCell21"
        Me.XrCell21.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrCell21.StylePriority.UseBackColor = False
        Me.XrCell21.StylePriority.UseBorderColor = False
        Me.XrCell21.StylePriority.UseBorders = False
        Me.XrCell21.StylePriority.UseFont = False
        Me.XrCell21.StylePriority.UseForeColor = False
        Me.XrCell21.StylePriority.UsePadding = False
        Me.XrCell21.StylePriority.UseTextAlignment = False
        Me.XrCell21.Text = "Consumo"
        Me.XrCell21.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrCell21.Weight = 0.16580477487797363R
        '
        'XrTituloCosto
        '
        Me.XrTituloCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTituloCosto.BorderColor = System.Drawing.Color.Transparent
        Me.XrTituloCosto.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTituloCosto.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTituloCosto.Name = "XrTituloCosto"
        Me.XrTituloCosto.StylePriority.UseBackColor = False
        Me.XrTituloCosto.StylePriority.UseBorderColor = False
        Me.XrTituloCosto.StylePriority.UseBorders = False
        Me.XrTituloCosto.StylePriority.UseFont = False
        Me.XrTituloCosto.StylePriority.UseTextAlignment = False
        Me.XrTituloCosto.Text = "Costo"
        Me.XrTituloCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTituloCosto.Weight = 0.12534884671579236R
        '
        'GroupHeader2
        '
        Me.GroupHeader2.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupHeader2.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("vcCodSuc", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader2.HeightF = 2.0!
        Me.GroupHeader2.Level = 1
        Me.GroupHeader2.Name = "GroupHeader2"
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
        '
        'GroupFooter1
        '
        Me.GroupFooter1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.GroupFooter1.HeightF = 37.5!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(286.5402!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow3})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(541.4181!, 25.0!)
        '
        'XrTableRow3
        '
        Me.XrTableRow3.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell7, Me.XrTotOpeLlamada, Me.XrTotOpeDuracion, Me.XrTotOpeCosto})
        Me.XrTableRow3.Name = "XrTableRow3"
        Me.XrTableRow3.Weight = 1.0R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTableCell7.BorderColor = System.Drawing.Color.White
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.Padding = New DevExpress.XtraPrinting.PaddingInfo(7, 0, 0, 0, 100.0!)
        Me.XrTableCell7.StylePriority.UseBackColor = False
        Me.XrTableCell7.StylePriority.UseBorderColor = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UsePadding = False
        Me.XrTableCell7.StylePriority.UseTextAlignment = False
        Me.XrTableCell7.Text = "Total por Operador :"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell7.Weight = 1.1121133020285168R
        '
        'XrTotOpeLlamada
        '
        Me.XrTotOpeLlamada.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotOpeLlamada.BorderColor = System.Drawing.Color.White
        Me.XrTotOpeLlamada.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotOpeLlamada.CanGrow = False
        Me.XrTotOpeLlamada.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotOpeLlamada.Name = "XrTotOpeLlamada"
        Me.XrTotOpeLlamada.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotOpeLlamada.StylePriority.UseBackColor = False
        Me.XrTotOpeLlamada.StylePriority.UseBorderColor = False
        Me.XrTotOpeLlamada.StylePriority.UseBorders = False
        Me.XrTotOpeLlamada.StylePriority.UseBorderWidth = False
        Me.XrTotOpeLlamada.StylePriority.UseFont = False
        Me.XrTotOpeLlamada.StylePriority.UsePadding = False
        Me.XrTotOpeLlamada.StylePriority.UseTextAlignment = False
        Me.XrTotOpeLlamada.Text = "XrTotOpeLlamada"
        Me.XrTotOpeLlamada.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotOpeLlamada.Weight = 1.1465767915172695R
        '
        'XrTotOpeDuracion
        '
        Me.XrTotOpeDuracion.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotOpeDuracion.BorderColor = System.Drawing.Color.White
        Me.XrTotOpeDuracion.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotOpeDuracion.CanGrow = False
        Me.XrTotOpeDuracion.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotOpeDuracion.Name = "XrTotOpeDuracion"
        Me.XrTotOpeDuracion.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTotOpeDuracion.StylePriority.UseBackColor = False
        Me.XrTotOpeDuracion.StylePriority.UseBorderColor = False
        Me.XrTotOpeDuracion.StylePriority.UseBorders = False
        Me.XrTotOpeDuracion.StylePriority.UseFont = False
        Me.XrTotOpeDuracion.StylePriority.UsePadding = False
        Me.XrTotOpeDuracion.StylePriority.UseTextAlignment = False
        Me.XrTotOpeDuracion.Text = "XrTotOpeDuracion"
        Me.XrTotOpeDuracion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTotOpeDuracion.Weight = 1.2229831778317375R
        '
        'XrTotOpeCosto
        '
        Me.XrTotOpeCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotOpeCosto.BorderColor = System.Drawing.Color.White
        Me.XrTotOpeCosto.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotOpeCosto.CanGrow = False
        Me.XrTotOpeCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotOpeCosto.Name = "XrTotOpeCosto"
        Me.XrTotOpeCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotOpeCosto.StylePriority.UseBackColor = False
        Me.XrTotOpeCosto.StylePriority.UseBorderColor = False
        Me.XrTotOpeCosto.StylePriority.UseBorders = False
        Me.XrTotOpeCosto.StylePriority.UseFont = False
        Me.XrTotOpeCosto.StylePriority.UsePadding = False
        Me.XrTotOpeCosto.StylePriority.UseTextAlignment = False
        Me.XrTotOpeCosto.Text = "XrTotOpeCosto"
        Me.XrTotOpeCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotOpeCosto.Weight = 0.92457823788292282R
        '
        'GroupFooter2
        '
        Me.GroupFooter2.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable3})
        Me.GroupFooter2.HeightF = 39.58333!
        Me.GroupFooter2.Level = 1
        Me.GroupFooter2.Name = "GroupFooter2"
        '
        'XrTable3
        '
        Me.XrTable3.LocationFloat = New DevExpress.Utils.PointFloat(201.1236!, 0.0!)
        Me.XrTable3.Name = "XrTable3"
        Me.XrTable3.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.XrTable3.SizeF = New System.Drawing.SizeF(626.8348!, 25.0!)
        '
        'XrTableRow1
        '
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTotSucuLlam, Me.XrTotSucuDur, Me.XrTotSucuCosto})
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Weight = 1.0R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTableCell1.BorderColor = System.Drawing.Color.White
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.Padding = New DevExpress.XtraPrinting.PaddingInfo(7, 0, 0, 0, 100.0!)
        Me.XrTableCell1.StylePriority.UseBackColor = False
        Me.XrTableCell1.StylePriority.UseBorderColor = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.StylePriority.UsePadding = False
        Me.XrTableCell1.StylePriority.UseTextAlignment = False
        Me.XrTableCell1.Text = "Total por Sucursal :"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell1.Weight = 1.5609942905396226R
        '
        'XrTotSucuLlam
        '
        Me.XrTotSucuLlam.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotSucuLlam.BorderColor = System.Drawing.Color.White
        Me.XrTotSucuLlam.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotSucuLlam.CanGrow = False
        Me.XrTotSucuLlam.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotSucuLlam.Name = "XrTotSucuLlam"
        Me.XrTotSucuLlam.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotSucuLlam.StylePriority.UseBackColor = False
        Me.XrTotSucuLlam.StylePriority.UseBorderColor = False
        Me.XrTotSucuLlam.StylePriority.UseBorders = False
        Me.XrTotSucuLlam.StylePriority.UseBorderWidth = False
        Me.XrTotSucuLlam.StylePriority.UseFont = False
        Me.XrTotSucuLlam.StylePriority.UsePadding = False
        Me.XrTotSucuLlam.StylePriority.UseTextAlignment = False
        Me.XrTotSucuLlam.Text = "XrTotSucuLlam"
        Me.XrTotSucuLlam.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotSucuLlam.Weight = 0.99033738256415571R
        '
        'XrTotSucuDur
        '
        Me.XrTotSucuDur.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotSucuDur.BorderColor = System.Drawing.Color.White
        Me.XrTotSucuDur.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotSucuDur.CanGrow = False
        Me.XrTotSucuDur.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotSucuDur.Name = "XrTotSucuDur"
        Me.XrTotSucuDur.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTotSucuDur.StylePriority.UseBackColor = False
        Me.XrTotSucuDur.StylePriority.UseBorderColor = False
        Me.XrTotSucuDur.StylePriority.UseBorders = False
        Me.XrTotSucuDur.StylePriority.UseFont = False
        Me.XrTotSucuDur.StylePriority.UsePadding = False
        Me.XrTotSucuDur.StylePriority.UseTextAlignment = False
        Me.XrTotSucuDur.Text = "XrTotSucuDur"
        Me.XrTotSucuDur.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTotSucuDur.Weight = 1.056331004618533R
        '
        'XrTotSucuCosto
        '
        Me.XrTotSucuCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotSucuCosto.BorderColor = System.Drawing.Color.White
        Me.XrTotSucuCosto.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotSucuCosto.CanGrow = False
        Me.XrTotSucuCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotSucuCosto.Name = "XrTotSucuCosto"
        Me.XrTotSucuCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotSucuCosto.StylePriority.UseBackColor = False
        Me.XrTotSucuCosto.StylePriority.UseBorderColor = False
        Me.XrTotSucuCosto.StylePriority.UseBorders = False
        Me.XrTotSucuCosto.StylePriority.UseFont = False
        Me.XrTotSucuCosto.StylePriority.UsePadding = False
        Me.XrTotSucuCosto.StylePriority.UseTextAlignment = False
        Me.XrTotSucuCosto.Text = "XrTotSucuCosto"
        Me.XrTotSucuCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotSucuCosto.Weight = 0.79858883153813542R
        '
        'DsReporteConsultas1
        '
        Me.DsReporteConsultas1.DataSetName = "dsReporteConsultas"
        Me.DsReporteConsultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MoV_s_IMP_Llamada_SumarioPorOper_GenSumarioTableAdapter1
        '
        Me.MoV_s_IMP_Llamada_SumarioPorOper_GenSumarioTableAdapter1.ClearBeforeFill = True
        '
        'cfTitulo1
        '
        Me.cfTitulo1.Expression = "''"
        Me.cfTitulo1.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo1.Name = "cfTitulo1"
        '
        'cfTitulo2
        '
        Me.cfTitulo2.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo2.Name = "cfTitulo2"
        '
        'cfTitulo3
        '
        Me.cfTitulo3.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo3.Name = "cfTitulo3"
        '
        'cfTitulo4
        '
        Me.cfTitulo4.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo4.Name = "cfTitulo4"
        '
        'cfEmpresa
        '
        Me.cfEmpresa.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfEmpresa.Name = "cfEmpresa"
        '
        'cfUsuario
        '
        Me.cfUsuario.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfUsuario.Name = "cfUsuario"
        '
        'XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter, Me.ReportFooter, Me.GroupHeader1, Me.GroupHeader2, Me.GroupFooter1, Me.GroupFooter2})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfTitulo3, Me.cfTitulo4, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MoV_s_IMP_Llamada_SumarioPorOper_GenSumarioTableAdapter1
        Me.DataMember = "MOV_s_IMP_Llamada_SumarioPorOper_GenSumario"
        Me.DataSource = Me.DsReporteConsultas1
        Me.Margins = New System.Drawing.Printing.Margins(8, 11, 0, 0)
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable4, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents ReportFooter As DevExpress.XtraReports.UI.ReportFooterBand
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupHeader2 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents GroupFooter2 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCeldA As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCell21 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTituloCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents XrSucursal As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrServicio As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNomServicio As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCantidad As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrConsumo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrOperador As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents DsReporteConsultas1 As dsReporteConsultas
    Friend WithEvents MoV_s_IMP_Llamada_SumarioPorOper_GenSumarioTableAdapter1 As dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_SumarioPorOper_GenSumarioTableAdapter
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo3 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo4 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow3 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotOpeLlamada As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotOpeDuracion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotOpeCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable3 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotSucuLlam As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotSucuDur As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotSucuCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable4 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow4 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotLlamada As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotDuracion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel7 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
End Class
