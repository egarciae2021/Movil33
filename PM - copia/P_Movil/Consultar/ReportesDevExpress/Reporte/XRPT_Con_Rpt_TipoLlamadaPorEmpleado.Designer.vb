<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Con_Rpt_TipoLlamadaPorEmpleado
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Con_Rpt_TipoLlamadaPorEmpleado))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrNumTel = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNomTel = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrVerificar = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrConsumo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNumLla = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrEmpleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrOrganizacion = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrCodEmpleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrCodArea = New DevExpress.XtraReports.UI.XRLabel()
        Me.DsReporteConsultas1 = New dsReporteConsultas()
        Me.MoV_s_IMP_Llamada_TipoPorEmpleadoTableAdapter1 = New dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_TipoPorEmpleadoTableAdapter()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrLabel3 = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupHeader2 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupHeader3 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrSubTotalLlamada = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrSubTotalCosto = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupFooter2 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTotalNomTipLlamadas = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTotalNomtipCosto = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel11 = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupFooter3 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTotalGrupoCosto = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTotalGrupLlamadas = New DevExpress.XtraReports.UI.XRLabel()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo3 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrLabel8 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel7 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrDetalle})
        Me.Detail.HeightF = 32.29167!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrDetalle
        '
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(827.9998!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrNumTel, Me.XrNomTel, Me.XrVerificar, Me.XrConsumo, Me.XrNumLla, Me.XrCosto})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrNumTel
        '
        Me.XrNumTel.BackColor = System.Drawing.Color.Transparent
        Me.XrNumTel.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_TipoPorEmpleado.vcNumTel")})
        Me.XrNumTel.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNumTel.Name = "XrNumTel"
        Me.XrNumTel.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrNumTel.StylePriority.UseBackColor = False
        Me.XrNumTel.StylePriority.UseFont = False
        Me.XrNumTel.StylePriority.UsePadding = False
        Me.XrNumTel.StylePriority.UseTextAlignment = False
        Me.XrNumTel.Text = "XrNumTel"
        Me.XrNumTel.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrNumTel.Weight = 0.098882803501769756R
        '
        'XrNomTel
        '
        Me.XrNomTel.BackColor = System.Drawing.Color.Transparent
        Me.XrNomTel.CanGrow = False
        Me.XrNomTel.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_TipoPorEmpleado.vcNomTel")})
        Me.XrNomTel.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNomTel.Name = "XrNomTel"
        Me.XrNomTel.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrNomTel.StylePriority.UseBackColor = False
        Me.XrNomTel.StylePriority.UseFont = False
        Me.XrNomTel.StylePriority.UsePadding = False
        Me.XrNomTel.StylePriority.UseTextAlignment = False
        Me.XrNomTel.Text = "XrNomTel"
        Me.XrNomTel.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrNomTel.Weight = 0.18750506157977928R
        '
        'XrVerificar
        '
        Me.XrVerificar.BackColor = System.Drawing.Color.Transparent
        Me.XrVerificar.CanGrow = False
        Me.XrVerificar.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrVerificar.Name = "XrVerificar"
        Me.XrVerificar.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrVerificar.StylePriority.UseBackColor = False
        Me.XrVerificar.StylePriority.UseFont = False
        Me.XrVerificar.StylePriority.UsePadding = False
        Me.XrVerificar.StylePriority.UseTextAlignment = False
        Me.XrVerificar.Text = "XrVerificar"
        Me.XrVerificar.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrVerificar.Weight = 0.10092331619763945R
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
        Me.XrConsumo.Weight = 0.13784837103686953R
        '
        'XrNumLla
        '
        Me.XrNumLla.BackColor = System.Drawing.Color.Transparent
        Me.XrNumLla.CanGrow = False
        Me.XrNumLla.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_TipoPorEmpleado.inNumLla")})
        Me.XrNumLla.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNumLla.Name = "XrNumLla"
        Me.XrNumLla.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrNumLla.StylePriority.UseBackColor = False
        Me.XrNumLla.StylePriority.UseFont = False
        Me.XrNumLla.StylePriority.UsePadding = False
        Me.XrNumLla.StylePriority.UseTextAlignment = False
        Me.XrNumLla.Text = "XrNumLla"
        Me.XrNumLla.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrNumLla.Weight = 0.10913831807729027R
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
        Me.XrCosto.Weight = 0.10913831807729027R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 19.0!
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
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrPictureBoxLogo, Me.Titulo2, Me.xrLine1, Me.XrLabel10, Me.XrLabel12, Me.XrEmpleado, Me.XrOrganizacion, Me.XrCodEmpleado, Me.XrCodArea, Me.XrLabel2, Me.XrLabel3, Me.XrTable2})
        Me.PageHeader.HeightF = 266.6667!
        Me.PageHeader.Name = "PageHeader"
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 10.00001!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.9583!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 59.30223!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(827.9999!, 18.54167!)
        Me.Titulo2.StylePriority.UseFont = False
        Me.Titulo2.StylePriority.UseForeColor = False
        Me.Titulo2.StylePriority.UsePadding = False
        Me.Titulo2.StylePriority.UseTextAlignment = False
        Me.Titulo2.Text = "Titulo2"
        Me.Titulo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 108.8855!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(828.0!, 9.0!)
        '
        'XrLabel10
        '
        Me.XrLabel10.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo3")})
        Me.XrLabel10.Font = New System.Drawing.Font("Trebuchet MS", 9.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel10.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel10.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 84.09386!)
        Me.XrLabel10.LockedInUserDesigner = True
        Me.XrLabel10.Name = "XrLabel10"
        Me.XrLabel10.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel10.SizeF = New System.Drawing.SizeF(827.9999!, 18.54167!)
        Me.XrLabel10.StylePriority.UseFont = False
        Me.XrLabel10.StylePriority.UseForeColor = False
        Me.XrLabel10.StylePriority.UsePadding = False
        Me.XrLabel10.Text = "XrLabel10"
        '
        'XrLabel12
        '
        Me.XrLabel12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.XrLabel12.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel12.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel12.LocationFloat = New DevExpress.Utils.PointFloat(148.9583!, 13.66666!)
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
        'XrEmpleado
        '
        Me.XrEmpleado.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrEmpleado.BorderColor = System.Drawing.Color.White
        Me.XrEmpleado.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrEmpleado.CanGrow = False
        Me.XrEmpleado.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrEmpleado.ForeColor = System.Drawing.Color.Navy
        Me.XrEmpleado.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 125.1772!)
        Me.XrEmpleado.Name = "XrEmpleado"
        Me.XrEmpleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrEmpleado.SizeF = New System.Drawing.SizeF(103.4729!, 22.99997!)
        Me.XrEmpleado.StylePriority.UseBackColor = False
        Me.XrEmpleado.StylePriority.UseBorderColor = False
        Me.XrEmpleado.StylePriority.UseBorders = False
        Me.XrEmpleado.StylePriority.UseFont = False
        Me.XrEmpleado.StylePriority.UseForeColor = False
        Me.XrEmpleado.StylePriority.UsePadding = False
        Me.XrEmpleado.StylePriority.UseTextAlignment = False
        Me.XrEmpleado.Text = "Empleado :"
        Me.XrEmpleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrOrganizacion
        '
        Me.XrOrganizacion.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrOrganizacion.BorderColor = System.Drawing.Color.White
        Me.XrOrganizacion.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrOrganizacion.CanGrow = False
        Me.XrOrganizacion.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrOrganizacion.ForeColor = System.Drawing.Color.Navy
        Me.XrOrganizacion.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 148.1772!)
        Me.XrOrganizacion.Name = "XrOrganizacion"
        Me.XrOrganizacion.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrOrganizacion.SizeF = New System.Drawing.SizeF(103.4729!, 22.99997!)
        Me.XrOrganizacion.StylePriority.UseBackColor = False
        Me.XrOrganizacion.StylePriority.UseBorderColor = False
        Me.XrOrganizacion.StylePriority.UseBorders = False
        Me.XrOrganizacion.StylePriority.UseFont = False
        Me.XrOrganizacion.StylePriority.UseForeColor = False
        Me.XrOrganizacion.StylePriority.UsePadding = False
        Me.XrOrganizacion.StylePriority.UseTextAlignment = False
        Me.XrOrganizacion.Text = "Área :"
        Me.XrOrganizacion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrCodEmpleado
        '
        Me.XrCodEmpleado.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrCodEmpleado.BorderColor = System.Drawing.Color.White
        Me.XrCodEmpleado.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrCodEmpleado.CanGrow = False
        Me.XrCodEmpleado.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrCodEmpleado.ForeColor = System.Drawing.Color.Navy
        Me.XrCodEmpleado.LocationFloat = New DevExpress.Utils.PointFloat(103.4729!, 125.1772!)
        Me.XrCodEmpleado.Name = "XrCodEmpleado"
        Me.XrCodEmpleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrCodEmpleado.SizeF = New System.Drawing.SizeF(724.527!, 22.99997!)
        Me.XrCodEmpleado.StylePriority.UseBackColor = False
        Me.XrCodEmpleado.StylePriority.UseBorderColor = False
        Me.XrCodEmpleado.StylePriority.UseBorders = False
        Me.XrCodEmpleado.StylePriority.UseFont = False
        Me.XrCodEmpleado.StylePriority.UseForeColor = False
        Me.XrCodEmpleado.StylePriority.UsePadding = False
        Me.XrCodEmpleado.StylePriority.UseTextAlignment = False
        Me.XrCodEmpleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrCodArea
        '
        Me.XrCodArea.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrCodArea.BorderColor = System.Drawing.Color.White
        Me.XrCodArea.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrCodArea.CanGrow = False
        Me.XrCodArea.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrCodArea.ForeColor = System.Drawing.Color.Navy
        Me.XrCodArea.LocationFloat = New DevExpress.Utils.PointFloat(103.4729!, 148.1771!)
        Me.XrCodArea.Name = "XrCodArea"
        Me.XrCodArea.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrCodArea.SizeF = New System.Drawing.SizeF(724.5269!, 22.99997!)
        Me.XrCodArea.StylePriority.UseBackColor = False
        Me.XrCodArea.StylePriority.UseBorderColor = False
        Me.XrCodArea.StylePriority.UseBorders = False
        Me.XrCodArea.StylePriority.UseFont = False
        Me.XrCodArea.StylePriority.UseForeColor = False
        Me.XrCodArea.StylePriority.UsePadding = False
        Me.XrCodArea.StylePriority.UseTextAlignment = False
        Me.XrCodArea.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'DsReporteConsultas1
        '
        Me.DsReporteConsultas1.DataSetName = "dsReporteConsultas"
        Me.DsReporteConsultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MoV_s_IMP_Llamada_TipoPorEmpleadoTableAdapter1
        '
        Me.MoV_s_IMP_Llamada_TipoPorEmpleadoTableAdapter1.ClearBeforeFill = True
        '
        'GroupHeader1
        '
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("inCodSubTip", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 0.0!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 243.6667!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(828.0!, 22.99998!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell3, Me.XrTableCell4, Me.XrTableCell5, Me.XrTableCell2, Me.xrTituloCosto})
        Me.XrTableRow2.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow2.ForeColor = System.Drawing.Color.White
        Me.XrTableRow2.Name = "XrTableRow2"
        Me.XrTableRow2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow2.Weight = 0.25842696629213485R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.StylePriority.UseBackColor = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.StylePriority.UseTextAlignment = False
        Me.XrTableCell1.Text = "Número Llamada"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell1.Weight = 0.14087427787553153R
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
        Me.XrTableCell3.Text = "Empresa/Persona LLamada"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.26609355769973209R
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
        Me.XrTableCell4.Text = "Verif."
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.14322326466556828R
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
        Me.XrTableCell5.Text = "Consumo"
        Me.XrTableCell5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell5.Weight = 0.19562495652243767R
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
        Me.XrTableCell2.Text = "Llamadas"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 0.15488121486083878R
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
        Me.xrTituloCosto.Weight = 0.15488138906287438R
        '
        'XrLabel3
        '
        Me.XrLabel3.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_TipoPorEmpleado.vcNomSubTip")})
        Me.XrLabel3.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel3.LocationFloat = New DevExpress.Utils.PointFloat(29.45856!, 209.375!)
        Me.XrLabel3.Name = "XrLabel3"
        Me.XrLabel3.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel3.SizeF = New System.Drawing.SizeF(786.3331!, 23.0!)
        Me.XrLabel3.StylePriority.UseFont = False
        Me.XrLabel3.StylePriority.UseTextAlignment = False
        Me.XrLabel3.Text = "XrLabel3"
        Me.XrLabel3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'GroupHeader2
        '
        Me.GroupHeader2.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("inCodTip", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader2.HeightF = 0.0!
        Me.GroupHeader2.Level = 1
        Me.GroupHeader2.Name = "GroupHeader2"
        '
        'XrLabel2
        '
        Me.XrLabel2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_TipoPorEmpleado.vcNomTip")})
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(12.79186!, 179.1667!)
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(804.0415!, 23.0!)
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "XrLabel2"
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'GroupHeader3
        '
        Me.GroupHeader3.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupHeader3.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("vcCodEmp", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader3.HeightF = 2.0!
        Me.GroupHeader3.Level = 2
        Me.GroupHeader3.Name = "GroupHeader3"
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
        '
        'GroupFooter1
        '
        Me.GroupFooter1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel4, Me.XrSubTotalLlamada, Me.XrSubTotalCosto})
        Me.GroupFooter1.HeightF = 34.375!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel4.BorderColor = System.Drawing.Color.White
        Me.XrLabel4.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrLabel4.CanGrow = False
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel4.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(442.8433!, 0.0!)
        Me.XrLabel4.Name = "XrLabel4"
        Me.XrLabel4.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLabel4.SizeF = New System.Drawing.SizeF(149.0858!, 23.00002!)
        Me.XrLabel4.StylePriority.UseBackColor = False
        Me.XrLabel4.StylePriority.UseBorderColor = False
        Me.XrLabel4.StylePriority.UseBorders = False
        Me.XrLabel4.StylePriority.UseFont = False
        Me.XrLabel4.StylePriority.UseForeColor = False
        Me.XrLabel4.StylePriority.UsePadding = False
        Me.XrLabel4.StylePriority.UseTextAlignment = False
        Me.XrLabel4.Text = "Sub Total :"
        Me.XrLabel4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrSubTotalLlamada
        '
        Me.XrSubTotalLlamada.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrSubTotalLlamada.BorderColor = System.Drawing.Color.White
        Me.XrSubTotalLlamada.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrSubTotalLlamada.CanGrow = False
        Me.XrSubTotalLlamada.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSubTotalLlamada.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrSubTotalLlamada.LocationFloat = New DevExpress.Utils.PointFloat(591.9294!, 0.0!)
        Me.XrSubTotalLlamada.Name = "XrSubTotalLlamada"
        Me.XrSubTotalLlamada.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrSubTotalLlamada.SizeF = New System.Drawing.SizeF(118.0353!, 23.0!)
        Me.XrSubTotalLlamada.StylePriority.UseBackColor = False
        Me.XrSubTotalLlamada.StylePriority.UseBorderColor = False
        Me.XrSubTotalLlamada.StylePriority.UseBorders = False
        Me.XrSubTotalLlamada.StylePriority.UseFont = False
        Me.XrSubTotalLlamada.StylePriority.UseForeColor = False
        Me.XrSubTotalLlamada.StylePriority.UsePadding = False
        Me.XrSubTotalLlamada.StylePriority.UseTextAlignment = False
        Me.XrSubTotalLlamada.Text = "XrSubTotalLlamada"
        Me.XrSubTotalLlamada.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrSubTotalCosto
        '
        Me.XrSubTotalCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrSubTotalCosto.BorderColor = System.Drawing.Color.White
        Me.XrSubTotalCosto.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrSubTotalCosto.CanGrow = False
        Me.XrSubTotalCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSubTotalCosto.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrSubTotalCosto.LocationFloat = New DevExpress.Utils.PointFloat(709.9646!, 0.0!)
        Me.XrSubTotalCosto.Name = "XrSubTotalCosto"
        Me.XrSubTotalCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrSubTotalCosto.SizeF = New System.Drawing.SizeF(118.0352!, 23.0!)
        Me.XrSubTotalCosto.StylePriority.UseBackColor = False
        Me.XrSubTotalCosto.StylePriority.UseBorderColor = False
        Me.XrSubTotalCosto.StylePriority.UseBorders = False
        Me.XrSubTotalCosto.StylePriority.UseFont = False
        Me.XrSubTotalCosto.StylePriority.UseForeColor = False
        Me.XrSubTotalCosto.StylePriority.UsePadding = False
        Me.XrSubTotalCosto.StylePriority.UseTextAlignment = False
        Me.XrSubTotalCosto.Text = "XrSubTotalCosto"
        Me.XrSubTotalCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'GroupFooter2
        '
        Me.GroupFooter2.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTotalNomTipLlamadas, Me.XrTotalNomtipCosto, Me.XrLabel11})
        Me.GroupFooter2.HeightF = 35.41667!
        Me.GroupFooter2.Level = 1
        Me.GroupFooter2.Name = "GroupFooter2"
        '
        'XrTotalNomTipLlamadas
        '
        Me.XrTotalNomTipLlamadas.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalNomTipLlamadas.BorderColor = System.Drawing.Color.White
        Me.XrTotalNomTipLlamadas.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalNomTipLlamadas.CanGrow = False
        Me.XrTotalNomTipLlamadas.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalNomTipLlamadas.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalNomTipLlamadas.LocationFloat = New DevExpress.Utils.PointFloat(591.9291!, 0.0!)
        Me.XrTotalNomTipLlamadas.Name = "XrTotalNomTipLlamadas"
        Me.XrTotalNomTipLlamadas.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalNomTipLlamadas.SizeF = New System.Drawing.SizeF(118.0353!, 23.0!)
        Me.XrTotalNomTipLlamadas.StylePriority.UseBackColor = False
        Me.XrTotalNomTipLlamadas.StylePriority.UseBorderColor = False
        Me.XrTotalNomTipLlamadas.StylePriority.UseBorders = False
        Me.XrTotalNomTipLlamadas.StylePriority.UseFont = False
        Me.XrTotalNomTipLlamadas.StylePriority.UseForeColor = False
        Me.XrTotalNomTipLlamadas.StylePriority.UsePadding = False
        Me.XrTotalNomTipLlamadas.StylePriority.UseTextAlignment = False
        Me.XrTotalNomTipLlamadas.Text = "XrTotalNomTipLlamadas"
        Me.XrTotalNomTipLlamadas.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrTotalNomtipCosto
        '
        Me.XrTotalNomtipCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalNomtipCosto.BorderColor = System.Drawing.Color.White
        Me.XrTotalNomtipCosto.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalNomtipCosto.CanGrow = False
        Me.XrTotalNomtipCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalNomtipCosto.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalNomtipCosto.LocationFloat = New DevExpress.Utils.PointFloat(709.9643!, 0.0!)
        Me.XrTotalNomtipCosto.Name = "XrTotalNomtipCosto"
        Me.XrTotalNomtipCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalNomtipCosto.SizeF = New System.Drawing.SizeF(118.0352!, 23.0!)
        Me.XrTotalNomtipCosto.StylePriority.UseBackColor = False
        Me.XrTotalNomtipCosto.StylePriority.UseBorderColor = False
        Me.XrTotalNomtipCosto.StylePriority.UseBorders = False
        Me.XrTotalNomtipCosto.StylePriority.UseFont = False
        Me.XrTotalNomtipCosto.StylePriority.UseForeColor = False
        Me.XrTotalNomtipCosto.StylePriority.UsePadding = False
        Me.XrTotalNomtipCosto.StylePriority.UseTextAlignment = False
        Me.XrTotalNomtipCosto.Text = "XrTotalNomtipCosto"
        Me.XrTotalNomtipCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrLabel11
        '
        Me.XrLabel11.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel11.BorderColor = System.Drawing.Color.White
        Me.XrLabel11.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrLabel11.CanGrow = False
        Me.XrLabel11.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel11.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrLabel11.LocationFloat = New DevExpress.Utils.PointFloat(378.2597!, 0.0!)
        Me.XrLabel11.Name = "XrLabel11"
        Me.XrLabel11.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLabel11.SizeF = New System.Drawing.SizeF(213.6691!, 23.00002!)
        Me.XrLabel11.StylePriority.UseBackColor = False
        Me.XrLabel11.StylePriority.UseBorderColor = False
        Me.XrLabel11.StylePriority.UseBorders = False
        Me.XrLabel11.StylePriority.UseFont = False
        Me.XrLabel11.StylePriority.UseForeColor = False
        Me.XrLabel11.StylePriority.UsePadding = False
        Me.XrLabel11.StylePriority.UseTextAlignment = False
        Me.XrLabel11.Text = "Total Tipo :"
        Me.XrLabel11.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'GroupFooter3
        '
        Me.GroupFooter3.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel6, Me.XrTotalGrupoCosto, Me.XrTotalGrupLlamadas})
        Me.GroupFooter3.HeightF = 36.45833!
        Me.GroupFooter3.Level = 2
        Me.GroupFooter3.Name = "GroupFooter3"
        '
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel6.BorderColor = System.Drawing.Color.White
        Me.XrLabel6.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrLabel6.CanGrow = False
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel6.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(317.843!, 0.0!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(274.0858!, 23.00002!)
        Me.XrLabel6.StylePriority.UseBackColor = False
        Me.XrLabel6.StylePriority.UseBorderColor = False
        Me.XrLabel6.StylePriority.UseBorders = False
        Me.XrLabel6.StylePriority.UseFont = False
        Me.XrLabel6.StylePriority.UseForeColor = False
        Me.XrLabel6.StylePriority.UsePadding = False
        Me.XrLabel6.StylePriority.UseTextAlignment = False
        Me.XrLabel6.Text = "Total por Grupo :"
        Me.XrLabel6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrTotalGrupoCosto
        '
        Me.XrTotalGrupoCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalGrupoCosto.BorderColor = System.Drawing.Color.White
        Me.XrTotalGrupoCosto.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalGrupoCosto.CanGrow = False
        Me.XrTotalGrupoCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalGrupoCosto.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalGrupoCosto.LocationFloat = New DevExpress.Utils.PointFloat(709.9643!, 0.0!)
        Me.XrTotalGrupoCosto.Name = "XrTotalGrupoCosto"
        Me.XrTotalGrupoCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalGrupoCosto.SizeF = New System.Drawing.SizeF(118.0352!, 23.0!)
        Me.XrTotalGrupoCosto.StylePriority.UseBackColor = False
        Me.XrTotalGrupoCosto.StylePriority.UseBorderColor = False
        Me.XrTotalGrupoCosto.StylePriority.UseBorders = False
        Me.XrTotalGrupoCosto.StylePriority.UseFont = False
        Me.XrTotalGrupoCosto.StylePriority.UseForeColor = False
        Me.XrTotalGrupoCosto.StylePriority.UsePadding = False
        Me.XrTotalGrupoCosto.StylePriority.UseTextAlignment = False
        Me.XrTotalGrupoCosto.Text = "XrTotalGrupoCosto"
        Me.XrTotalGrupoCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrTotalGrupLlamadas
        '
        Me.XrTotalGrupLlamadas.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalGrupLlamadas.BorderColor = System.Drawing.Color.White
        Me.XrTotalGrupLlamadas.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalGrupLlamadas.CanGrow = False
        Me.XrTotalGrupLlamadas.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalGrupLlamadas.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalGrupLlamadas.LocationFloat = New DevExpress.Utils.PointFloat(591.9291!, 0.0!)
        Me.XrTotalGrupLlamadas.Name = "XrTotalGrupLlamadas"
        Me.XrTotalGrupLlamadas.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalGrupLlamadas.SizeF = New System.Drawing.SizeF(118.0353!, 23.0!)
        Me.XrTotalGrupLlamadas.StylePriority.UseBackColor = False
        Me.XrTotalGrupLlamadas.StylePriority.UseBorderColor = False
        Me.XrTotalGrupLlamadas.StylePriority.UseBorders = False
        Me.XrTotalGrupLlamadas.StylePriority.UseFont = False
        Me.XrTotalGrupLlamadas.StylePriority.UseForeColor = False
        Me.XrTotalGrupLlamadas.StylePriority.UsePadding = False
        Me.XrTotalGrupLlamadas.StylePriority.UseTextAlignment = False
        Me.XrTotalGrupLlamadas.Text = "XrTotalGrupLlamadas"
        Me.XrTotalGrupLlamadas.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
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
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLine2, Me.XrLabel8, Me.LBLEmpresa, Me.XrLabel7, Me.LBLUsuario, Me.XrPageInfo1, Me.XrLabel5, Me.XrPageInfo2})
        Me.PageFooter.HeightF = 103.125!
        Me.PageFooter.Name = "PageFooter"
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 6.49999!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(828.0!, 9.0!)
        '
        'XrLabel8
        '
        Me.XrLabel8.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel8.CanGrow = False
        Me.XrLabel8.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel8.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 27.37503!)
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
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(71.2015!, 27.37503!)
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
        Me.XrLabel7.LocationFloat = New DevExpress.Utils.PointFloat(629.6971!, 27.99994!)
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
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(71.2015!, 52.37503!)
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
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(734.9054!, 27.99994!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(93.09442!, 23.00001!)
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
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 52.37503!)
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
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(349.5813!, 27.99994!)
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
        'XRPT_Con_Rpt_TipoLlamadaPorEmpleado
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.GroupHeader1, Me.GroupHeader2, Me.GroupHeader3, Me.GroupFooter1, Me.GroupFooter2, Me.GroupFooter3, Me.PageFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfTitulo3, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MoV_s_IMP_Llamada_TipoPorEmpleadoTableAdapter1
        Me.DataMember = "MOV_s_IMP_Llamada_TipoPorEmpleado"
        Me.DataSource = Me.DsReporteConsultas1
        Me.Margins = New System.Drawing.Printing.Margins(9, 10, 19, 1)
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents DsReporteConsultas1 As dsReporteConsultas
    Friend WithEvents MoV_s_IMP_Llamada_TipoPorEmpleadoTableAdapter1 As dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_TipoPorEmpleadoTableAdapter
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupHeader2 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupHeader3 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents GroupFooter2 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents GroupFooter3 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrCodArea As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrCodEmpleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrOrganizacion As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrEmpleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel3 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo3 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrNumTel As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNomTel As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrVerificar As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrConsumo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNumLla As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel7 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrSubTotalCosto As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrSubTotalLlamada As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalNomTipLlamadas As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalNomtipCosto As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel11 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalGrupoCosto As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalGrupLlamadas As DevExpress.XtraReports.UI.XRLabel
End Class
