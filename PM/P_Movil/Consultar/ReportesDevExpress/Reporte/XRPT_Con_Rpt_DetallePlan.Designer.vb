<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Con_Rpt_DetallePlan
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Con_Rpt_DetallePlan))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrNomser = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrConsumo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTipoSer = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNumLla = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrLineaEmpleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrLabel8 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel7 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.ReportFooter = New DevExpress.XtraReports.UI.ReportFooterBand()
        Me.XrCostoTotal = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTotalGeneral = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.DsReporteConsultas1 = New dsReporteConsultas()
        Me.MoV_s_IMP_Llamada_DetalleDentroPlanTableAdapter1 = New dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_DetalleDentroPlanTableAdapter()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo3 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrDetalle})
        Me.Detail.HeightF = 23.0!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrDetalle
        '
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(826.9997!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrNomser, Me.XrConsumo, Me.XrTipoSer, Me.XrNumLla, Me.XrCosto})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrNomser
        '
        Me.XrNomser.BackColor = System.Drawing.Color.Transparent
        Me.XrNomser.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleDentroPlan.vcNomSer")})
        Me.XrNomser.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNomser.Name = "XrNomser"
        Me.XrNomser.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrNomser.StylePriority.UseBackColor = False
        Me.XrNomser.StylePriority.UseFont = False
        Me.XrNomser.StylePriority.UsePadding = False
        Me.XrNomser.StylePriority.UseTextAlignment = False
        Me.XrNomser.Text = "XrNomser"
        Me.XrNomser.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrNomser.Weight = 0.13488077436884627R
        '
        'XrConsumo
        '
        Me.XrConsumo.BackColor = System.Drawing.Color.Transparent
        Me.XrConsumo.CanGrow = False
        Me.XrConsumo.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrConsumo.Name = "XrConsumo"
        Me.XrConsumo.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrConsumo.StylePriority.UseBackColor = False
        Me.XrConsumo.StylePriority.UseFont = False
        Me.XrConsumo.StylePriority.UsePadding = False
        Me.XrConsumo.StylePriority.UseTextAlignment = False
        Me.XrConsumo.Text = "XrConsumo"
        Me.XrConsumo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrConsumo.Weight = 0.17863813316018395R
        '
        'XrTipoSer
        '
        Me.XrTipoSer.BackColor = System.Drawing.Color.Transparent
        Me.XrTipoSer.CanGrow = False
        Me.XrTipoSer.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleDentroPlan.vcNomTipSer")})
        Me.XrTipoSer.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTipoSer.Name = "XrTipoSer"
        Me.XrTipoSer.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTipoSer.StylePriority.UseBackColor = False
        Me.XrTipoSer.StylePriority.UseFont = False
        Me.XrTipoSer.StylePriority.UsePadding = False
        Me.XrTipoSer.StylePriority.UseTextAlignment = False
        Me.XrTipoSer.Text = "XrTipoSer"
        Me.XrTipoSer.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTipoSer.Weight = 0.15182342484197653R
        '
        'XrNumLla
        '
        Me.XrNumLla.BackColor = System.Drawing.Color.Transparent
        Me.XrNumLla.CanGrow = False
        Me.XrNumLla.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNumLla.Name = "XrNumLla"
        Me.XrNumLla.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrNumLla.StylePriority.UseBackColor = False
        Me.XrNumLla.StylePriority.UseFont = False
        Me.XrNumLla.StylePriority.UsePadding = False
        Me.XrNumLla.StylePriority.UseTextAlignment = False
        Me.XrNumLla.Text = "XrNumLla"
        Me.XrNumLla.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrNumLla.Weight = 0.14110589057185036R
        '
        'XrCosto
        '
        Me.XrCosto.BackColor = System.Drawing.Color.Transparent
        Me.XrCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCosto.Name = "XrCosto"
        Me.XrCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCosto.StylePriority.UseBackColor = False
        Me.XrCosto.StylePriority.UseFont = False
        Me.XrCosto.StylePriority.UsePadding = False
        Me.XrCosto.StylePriority.UseTextAlignment = False
        Me.XrCosto.Text = "XrCosto"
        Me.XrCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCosto.Weight = 0.13698796552778147R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 36.0!
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
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLineaEmpleado, Me.XrLabel12, Me.XrLabel10, Me.xrLine1, Me.Titulo2, Me.xrPictureBoxLogo, Me.XrTable2})
        Me.PageHeader.HeightF = 191.6667!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrLineaEmpleado
        '
        Me.XrLineaEmpleado.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLineaEmpleado.BorderColor = System.Drawing.Color.White
        Me.XrLineaEmpleado.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrLineaEmpleado.CanGrow = False
        Me.XrLineaEmpleado.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLineaEmpleado.ForeColor = System.Drawing.Color.Navy
        Me.XrLineaEmpleado.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 128.4584!)
        Me.XrLineaEmpleado.Name = "XrLineaEmpleado"
        Me.XrLineaEmpleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLineaEmpleado.SizeF = New System.Drawing.SizeF(826.9997!, 22.99997!)
        Me.XrLineaEmpleado.StylePriority.UseBackColor = False
        Me.XrLineaEmpleado.StylePriority.UseBorderColor = False
        Me.XrLineaEmpleado.StylePriority.UseBorders = False
        Me.XrLineaEmpleado.StylePriority.UseFont = False
        Me.XrLineaEmpleado.StylePriority.UseForeColor = False
        Me.XrLineaEmpleado.StylePriority.UsePadding = False
        Me.XrLineaEmpleado.StylePriority.UseTextAlignment = False
        Me.XrLineaEmpleado.Text = "XrLineaEmpleado"
        Me.XrLineaEmpleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel12
        '
        Me.XrLabel12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.XrLabel12.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel12.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel12.LocationFloat = New DevExpress.Utils.PointFloat(151.0416!, 13.66666!)
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
        Me.XrLabel10.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo3")})
        Me.XrLabel10.Font = New System.Drawing.Font("Trebuchet MS", 9.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel10.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel10.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 84.09389!)
        Me.XrLabel10.LockedInUserDesigner = True
        Me.XrLabel10.Name = "XrLabel10"
        Me.XrLabel10.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel10.SizeF = New System.Drawing.SizeF(826.9998!, 18.54167!)
        Me.XrLabel10.StylePriority.UseFont = False
        Me.XrLabel10.StylePriority.UseForeColor = False
        Me.XrLabel10.StylePriority.UsePadding = False
        Me.XrLabel10.Text = "XrLabel10"
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 108.8856!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(826.9999!, 9.0!)
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 59.30223!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(826.9998!, 18.54167!)
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
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 10.00001!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(150.0416!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLine2, Me.XrLabel8, Me.LBLEmpresa, Me.XrLabel7, Me.LBLUsuario, Me.XrPageInfo1, Me.XrLabel5, Me.XrPageInfo2})
        Me.PageFooter.HeightF = 97.91666!
        Me.PageFooter.Name = "PageFooter"
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 10.00001!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(828.0414!, 9.0!)
        '
        'XrLabel8
        '
        Me.XrLabel8.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel8.CanGrow = False
        Me.XrLabel8.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel8.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 30.87508!)
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
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.CanGrow = False
        Me.LBLEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfEmpresa")})
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(72.20151!, 30.87508!)
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
        'XrLabel7
        '
        Me.XrLabel7.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel7.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel7.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel7.LocationFloat = New DevExpress.Utils.PointFloat(632.3843!, 31.49999!)
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
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.CanGrow = False
        Me.LBLUsuario.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfUsuario")})
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(72.20154!, 55.87508!)
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
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(737.5927!, 31.49999!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(90.40704!, 23.0!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.CanGrow = False
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 55.87508!)
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
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(352.2686!, 31.49999!)
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
        'ReportFooter
        '
        Me.ReportFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrCostoTotal, Me.XrTotalGeneral})
        Me.ReportFooter.HeightF = 33.00003!
        Me.ReportFooter.Name = "ReportFooter"
        '
        'XrCostoTotal
        '
        Me.XrCostoTotal.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrCostoTotal.BorderColor = System.Drawing.Color.White
        Me.XrCostoTotal.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrCostoTotal.CanGrow = False
        Me.XrCostoTotal.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCostoTotal.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrCostoTotal.LocationFloat = New DevExpress.Utils.PointFloat(675.6141!, 10.00001!)
        Me.XrCostoTotal.Name = "XrCostoTotal"
        Me.XrCostoTotal.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrCostoTotal.SizeF = New System.Drawing.SizeF(152.3857!, 23.0!)
        Me.XrCostoTotal.StylePriority.UseBackColor = False
        Me.XrCostoTotal.StylePriority.UseBorderColor = False
        Me.XrCostoTotal.StylePriority.UseBorders = False
        Me.XrCostoTotal.StylePriority.UseFont = False
        Me.XrCostoTotal.StylePriority.UseForeColor = False
        Me.XrCostoTotal.StylePriority.UsePadding = False
        Me.XrCostoTotal.StylePriority.UseTextAlignment = False
        Me.XrCostoTotal.Text = "XrCostoTotal"
        Me.XrCostoTotal.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrTotalGeneral
        '
        Me.XrTotalGeneral.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalGeneral.BorderColor = System.Drawing.Color.White
        Me.XrTotalGeneral.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalGeneral.CanGrow = False
        Me.XrTotalGeneral.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrTotalGeneral.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalGeneral.LocationFloat = New DevExpress.Utils.PointFloat(518.6476!, 10.00001!)
        Me.XrTotalGeneral.Name = "XrTotalGeneral"
        Me.XrTotalGeneral.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrTotalGeneral.SizeF = New System.Drawing.SizeF(156.9664!, 23.00002!)
        Me.XrTotalGeneral.StylePriority.UseBackColor = False
        Me.XrTotalGeneral.StylePriority.UseBorderColor = False
        Me.XrTotalGeneral.StylePriority.UseBorders = False
        Me.XrTotalGeneral.StylePriority.UseFont = False
        Me.XrTotalGeneral.StylePriority.UseForeColor = False
        Me.XrTotalGeneral.StylePriority.UsePadding = False
        Me.XrTotalGeneral.StylePriority.UseTextAlignment = False
        Me.XrTotalGeneral.Text = "Costo Total :"
        Me.XrTotalGeneral.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'GroupHeader1
        '
        Me.GroupHeader1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("vcNumCel", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 2.0!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 162.4167!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(826.9997!, 22.99999!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell3, Me.XrTableCell4, Me.XrTableCell5, Me.XrTableCell2, Me.xrTituloCosto})
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
        Me.XrTableCell3.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell3.CanGrow = False
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.ForeColor = System.Drawing.Color.White
        Me.XrTableCell3.Multiline = True
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.Text = "Servicio"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.204871873840318R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell4.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell4.CanGrow = False
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell4.ForeColor = System.Drawing.Color.White
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell4.StylePriority.UseBackColor = False
        Me.XrTableCell4.StylePriority.UseBorders = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.StylePriority.UseForeColor = False
        Me.XrTableCell4.StylePriority.UsePadding = False
        Me.XrTableCell4.Text = "Consumo"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.24028252917868281R
        '
        'XrTableCell5
        '
        Me.XrTableCell5.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell5.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell5.CanGrow = False
        Me.XrTableCell5.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell5.Name = "XrTableCell5"
        Me.XrTableCell5.StylePriority.UseBackColor = False
        Me.XrTableCell5.StylePriority.UseBorders = False
        Me.XrTableCell5.StylePriority.UseFont = False
        Me.XrTableCell5.StylePriority.UseTextAlignment = False
        Me.XrTableCell5.Text = "Tipo"
        Me.XrTableCell5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell5.Weight = 0.21556857724672757R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell2.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell2.CanGrow = False
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseBorders = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UseTextAlignment = False
        Me.XrTableCell2.Text = "Cantidad"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 0.20035132313482706R
        '
        'xrTituloCosto
        '
        Me.xrTituloCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrTituloCosto.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.xrTituloCosto.CanGrow = False
        Me.xrTituloCosto.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.xrTituloCosto.ForeColor = System.Drawing.Color.White
        Me.xrTituloCosto.Name = "xrTituloCosto"
        Me.xrTituloCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.xrTituloCosto.StylePriority.UseBackColor = False
        Me.xrTituloCosto.StylePriority.UseBorders = False
        Me.xrTituloCosto.StylePriority.UseFont = False
        Me.xrTituloCosto.StylePriority.UseForeColor = False
        Me.xrTituloCosto.StylePriority.UsePadding = False
        Me.xrTituloCosto.StylePriority.UseTextAlignment = False
        Me.xrTituloCosto.Text = "Costo"
        Me.xrTituloCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.xrTituloCosto.Weight = 0.19450435728642734R
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
        '
        'DsReporteConsultas1
        '
        Me.DsReporteConsultas1.DataSetName = "dsReporteConsultas"
        Me.DsReporteConsultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MoV_s_IMP_Llamada_DetalleDentroPlanTableAdapter1
        '
        Me.MoV_s_IMP_Llamada_DetalleDentroPlanTableAdapter1.ClearBeforeFill = True
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
        'XRPT_Con_Rpt_DetallePlan
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter, Me.ReportFooter, Me.GroupHeader1})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfTitulo3, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MoV_s_IMP_Llamada_DetalleDentroPlanTableAdapter1
        Me.DataMember = "MOV_s_IMP_Llamada_DetalleDentroPlan"
        Me.DataSource = Me.DsReporteConsultas1
        Me.Margins = New System.Drawing.Printing.Margins(8, 11, 36, 0)
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel7 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents ReportFooter As DevExpress.XtraReports.UI.ReportFooterBand
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents DsReporteConsultas1 As dsReporteConsultas
    Friend WithEvents MoV_s_IMP_Llamada_DetalleDentroPlanTableAdapter1 As dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_DetalleDentroPlanTableAdapter
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents XrLineaEmpleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrCostoTotal As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalGeneral As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrNomser As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrConsumo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTipoSer As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNumLla As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo3 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
End Class
