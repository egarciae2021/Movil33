<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Con_Rpt_ConsumoPorPlan
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Con_Rpt_ConsumoPorPlan))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrNumTel = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNomTel = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNumLla = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrExceso = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.DsReporteConsultas1 = New dsReporteConsultas()
        Me.MoV_s_IMP_Llamada_ConsumoPorPlanTableAdapter1 = New dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_ConsumoPorPlanTableAdapter()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrLabel3 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell9 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.GroupHeader2 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTotalEmpleadoNoConsumido = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTotalEmpleadoExceso = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupFooter2 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTotalPlanExceso = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTotalPlanNoConsumido = New DevExpress.XtraReports.UI.XRLabel()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo3 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel7 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel8 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrDetalle})
        Me.Detail.HeightF = 30.29165!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrDetalle
        '
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(23.54166!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(804.4583!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrNumTel, Me.XrNomTel, Me.XrNumLla, Me.XrExceso})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrNumTel
        '
        Me.XrNumTel.BackColor = System.Drawing.Color.Transparent
        Me.XrNumTel.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_ConsumoPorPlan.vcNumCel")})
        Me.XrNumTel.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNumTel.Name = "XrNumTel"
        Me.XrNumTel.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrNumTel.StylePriority.UseBackColor = False
        Me.XrNumTel.StylePriority.UseFont = False
        Me.XrNumTel.StylePriority.UsePadding = False
        Me.XrNumTel.StylePriority.UseTextAlignment = False
        Me.XrNumTel.Text = "XrNumTel"
        Me.XrNumTel.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrNumTel.Weight = 0.1740646143951953R
        '
        'XrNomTel
        '
        Me.XrNomTel.BackColor = System.Drawing.Color.Transparent
        Me.XrNomTel.CanGrow = False
        Me.XrNomTel.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_ConsumoPorPlan.dcCosLla")})
        Me.XrNomTel.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNomTel.Name = "XrNomTel"
        Me.XrNomTel.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrNomTel.StylePriority.UseBackColor = False
        Me.XrNomTel.StylePriority.UseFont = False
        Me.XrNomTel.StylePriority.UsePadding = False
        Me.XrNomTel.StylePriority.UseTextAlignment = False
        Me.XrNomTel.Text = "XrNomTel"
        Me.XrNomTel.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrNomTel.Weight = 0.19307770435292015R
        '
        'XrNumLla
        '
        Me.XrNumLla.BackColor = System.Drawing.Color.Transparent
        Me.XrNumLla.CanGrow = False
        Me.XrNumLla.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_ConsumoPorPlan.dcMonNoConsumido")})
        Me.XrNumLla.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNumLla.Name = "XrNumLla"
        Me.XrNumLla.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrNumLla.StylePriority.UseBackColor = False
        Me.XrNumLla.StylePriority.UseFont = False
        Me.XrNumLla.StylePriority.UsePadding = False
        Me.XrNumLla.StylePriority.UseTextAlignment = False
        Me.XrNumLla.Text = "XrNumLla"
        Me.XrNumLla.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrNumLla.Weight = 0.2084577331968675R
        '
        'XrExceso
        '
        Me.XrExceso.BackColor = System.Drawing.Color.Transparent
        Me.XrExceso.CanGrow = False
        Me.XrExceso.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_ConsumoPorPlan.dcCosRea")})
        Me.XrExceso.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrExceso.Name = "XrExceso"
        Me.XrExceso.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrExceso.StylePriority.UseBackColor = False
        Me.XrExceso.StylePriority.UseFont = False
        Me.XrExceso.StylePriority.UsePadding = False
        Me.XrExceso.StylePriority.UseTextAlignment = False
        Me.XrExceso.Text = "XrExceso"
        Me.XrExceso.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrExceso.Weight = 0.1678361365256556R
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
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrPictureBoxLogo, Me.Titulo2, Me.xrLine1, Me.XrLabel10, Me.XrLabel12, Me.XrLabel1, Me.XrLabel2, Me.XrLabel3, Me.XrTable1})
        Me.PageHeader.HeightF = 224.375!
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
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 108.8856!)
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
        'DsReporteConsultas1
        '
        Me.DsReporteConsultas1.DataSetName = "dsReporteConsultas"
        Me.DsReporteConsultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MoV_s_IMP_Llamada_ConsumoPorPlanTableAdapter1
        '
        Me.MoV_s_IMP_Llamada_ConsumoPorPlanTableAdapter1.ClearBeforeFill = True
        '
        'GroupHeader1
        '
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("vcCodEmp", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 0.0!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrLabel3
        '
        Me.XrLabel3.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_ConsumoPorPlan.vcNomEmp")})
        Me.XrLabel3.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel3.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 163.5417!)
        Me.XrLabel3.Name = "XrLabel3"
        Me.XrLabel3.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel3.SizeF = New System.Drawing.SizeF(804.4584!, 23.0!)
        Me.XrLabel3.StylePriority.UseFont = False
        Me.XrLabel3.StylePriority.UseTextAlignment = False
        Me.XrLabel3.Text = "XrLabel3"
        Me.XrLabel3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 201.375!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(826.9998!, 22.99999!)
        Me.XrTable1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow1
        '
        Me.XrTableRow1.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow1.BorderColor = System.Drawing.Color.White
        Me.XrTableRow1.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell6, Me.XrTableCell7, Me.XrTableCell8, Me.XrTableCell9})
        Me.XrTableRow1.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow1.ForeColor = System.Drawing.Color.White
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow1.Weight = 0.25842696629213485R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UseTextAlignment = False
        Me.XrTableCell6.Text = "Línea"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.24714814440692845R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell7.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell7.CanGrow = False
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell7.ForeColor = System.Drawing.Color.White
        Me.XrTableCell7.Multiline = True
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell7.StylePriority.UseBackColor = False
        Me.XrTableCell7.StylePriority.UseBorders = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UseForeColor = False
        Me.XrTableCell7.StylePriority.UsePadding = False
        Me.XrTableCell7.Text = "Consumido"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.27414420778368609R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell8.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell8.CanGrow = False
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.ForeColor = System.Drawing.Color.White
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseBorders = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UseForeColor = False
        Me.XrTableCell8.StylePriority.UsePadding = False
        Me.XrTableCell8.Text = "No Consumido"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell8.Weight = 0.29598170971802845R
        '
        'XrTableCell9
        '
        Me.XrTableCell9.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell9.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell9.CanGrow = False
        Me.XrTableCell9.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell9.Name = "XrTableCell9"
        Me.XrTableCell9.StylePriority.UseBackColor = False
        Me.XrTableCell9.StylePriority.UseBorders = False
        Me.XrTableCell9.StylePriority.UseFont = False
        Me.XrTableCell9.StylePriority.UseTextAlignment = False
        Me.XrTableCell9.Text = "Exceso"
        Me.XrTableCell9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell9.Weight = 0.23830459877833976R
        '
        'GroupHeader2
        '
        Me.GroupHeader2.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupHeader2.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("inCodPla", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader2.HeightF = 2.0!
        Me.GroupHeader2.Level = 1
        Me.GroupHeader2.Name = "GroupHeader2"
        '
        'XrLabel2
        '
        Me.XrLabel2.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_ConsumoPorPlan.dcMonPla")})
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(332.2917!, 129.0833!)
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 5, 0, 0, 100.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(100.0!, 23.0!)
        Me.XrLabel2.StylePriority.UseBackColor = False
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UsePadding = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "XrLabel2"
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrLabel1
        '
        Me.XrLabel1.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_ConsumoPorPlan.vcNomPla")})
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 129.0833!)
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(5, 2, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(332.2917!, 23.0!)
        Me.XrLabel1.StylePriority.UseBackColor = False
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.StylePriority.UsePadding = False
        Me.XrLabel1.StylePriority.UseTextAlignment = False
        Me.XrLabel1.Text = "XrLabel1"
        Me.XrLabel1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
        '
        'GroupFooter1
        '
        Me.GroupFooter1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTotalEmpleadoNoConsumido, Me.XrLabel4, Me.XrTotalEmpleadoExceso})
        Me.GroupFooter1.HeightF = 37.5!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'XrTotalEmpleadoNoConsumido
        '
        Me.XrTotalEmpleadoNoConsumido.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalEmpleadoNoConsumido.BorderColor = System.Drawing.Color.White
        Me.XrTotalEmpleadoNoConsumido.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalEmpleadoNoConsumido.CanGrow = False
        Me.XrTotalEmpleadoNoConsumido.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalEmpleadoNoConsumido.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalEmpleadoNoConsumido.LocationFloat = New DevExpress.Utils.PointFloat(420.8194!, 0.0!)
        Me.XrTotalEmpleadoNoConsumido.Name = "XrTotalEmpleadoNoConsumido"
        Me.XrTotalEmpleadoNoConsumido.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalEmpleadoNoConsumido.SizeF = New System.Drawing.SizeF(225.568!, 23.0!)
        Me.XrTotalEmpleadoNoConsumido.StylePriority.UseBackColor = False
        Me.XrTotalEmpleadoNoConsumido.StylePriority.UseBorderColor = False
        Me.XrTotalEmpleadoNoConsumido.StylePriority.UseBorders = False
        Me.XrTotalEmpleadoNoConsumido.StylePriority.UseFont = False
        Me.XrTotalEmpleadoNoConsumido.StylePriority.UseForeColor = False
        Me.XrTotalEmpleadoNoConsumido.StylePriority.UsePadding = False
        Me.XrTotalEmpleadoNoConsumido.StylePriority.UseTextAlignment = False
        Me.XrTotalEmpleadoNoConsumido.Text = "XrTotalEmpleadoNoConsumido"
        Me.XrTotalEmpleadoNoConsumido.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel4.BorderColor = System.Drawing.Color.White
        Me.XrLabel4.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrLabel4.CanGrow = False
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel4.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(211.8937!, 0.0!)
        Me.XrLabel4.Name = "XrLabel4"
        Me.XrLabel4.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLabel4.SizeF = New System.Drawing.SizeF(208.9258!, 23.00002!)
        Me.XrLabel4.StylePriority.UseBackColor = False
        Me.XrLabel4.StylePriority.UseBorderColor = False
        Me.XrLabel4.StylePriority.UseBorders = False
        Me.XrLabel4.StylePriority.UseFont = False
        Me.XrLabel4.StylePriority.UseForeColor = False
        Me.XrLabel4.StylePriority.UsePadding = False
        Me.XrLabel4.StylePriority.UseTextAlignment = False
        Me.XrLabel4.Text = "Total Exceso por Empleados :"
        Me.XrLabel4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrTotalEmpleadoExceso
        '
        Me.XrTotalEmpleadoExceso.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalEmpleadoExceso.BorderColor = System.Drawing.Color.White
        Me.XrTotalEmpleadoExceso.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalEmpleadoExceso.CanGrow = False
        Me.XrTotalEmpleadoExceso.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalEmpleadoExceso.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalEmpleadoExceso.LocationFloat = New DevExpress.Utils.PointFloat(646.3875!, 0.0!)
        Me.XrTotalEmpleadoExceso.Name = "XrTotalEmpleadoExceso"
        Me.XrTotalEmpleadoExceso.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalEmpleadoExceso.SizeF = New System.Drawing.SizeF(181.6123!, 23.0!)
        Me.XrTotalEmpleadoExceso.StylePriority.UseBackColor = False
        Me.XrTotalEmpleadoExceso.StylePriority.UseBorderColor = False
        Me.XrTotalEmpleadoExceso.StylePriority.UseBorders = False
        Me.XrTotalEmpleadoExceso.StylePriority.UseFont = False
        Me.XrTotalEmpleadoExceso.StylePriority.UseForeColor = False
        Me.XrTotalEmpleadoExceso.StylePriority.UsePadding = False
        Me.XrTotalEmpleadoExceso.StylePriority.UseTextAlignment = False
        Me.XrTotalEmpleadoExceso.Text = "XrTotalEmpleadoExceso"
        Me.XrTotalEmpleadoExceso.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'GroupFooter2
        '
        Me.GroupFooter2.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTotalPlanExceso, Me.XrLabel6, Me.XrTotalPlanNoConsumido})
        Me.GroupFooter2.HeightF = 34.375!
        Me.GroupFooter2.Name = "GroupFooter2"
        '
        'XrTotalPlanExceso
        '
        Me.XrTotalPlanExceso.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalPlanExceso.BorderColor = System.Drawing.Color.White
        Me.XrTotalPlanExceso.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalPlanExceso.CanGrow = False
        Me.XrTotalPlanExceso.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalPlanExceso.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalPlanExceso.LocationFloat = New DevExpress.Utils.PointFloat(646.3873!, 0.0!)
        Me.XrTotalPlanExceso.Name = "XrTotalPlanExceso"
        Me.XrTotalPlanExceso.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalPlanExceso.SizeF = New System.Drawing.SizeF(181.6124!, 23.0!)
        Me.XrTotalPlanExceso.StylePriority.UseBackColor = False
        Me.XrTotalPlanExceso.StylePriority.UseBorderColor = False
        Me.XrTotalPlanExceso.StylePriority.UseBorders = False
        Me.XrTotalPlanExceso.StylePriority.UseFont = False
        Me.XrTotalPlanExceso.StylePriority.UseForeColor = False
        Me.XrTotalPlanExceso.StylePriority.UsePadding = False
        Me.XrTotalPlanExceso.StylePriority.UseTextAlignment = False
        Me.XrTotalPlanExceso.Text = "XrTotalPlanExceso"
        Me.XrTotalPlanExceso.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel6.BorderColor = System.Drawing.Color.White
        Me.XrLabel6.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrLabel6.CanGrow = False
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel6.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(148.9583!, 0.0!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(271.861!, 23.00002!)
        Me.XrLabel6.StylePriority.UseBackColor = False
        Me.XrLabel6.StylePriority.UseBorderColor = False
        Me.XrLabel6.StylePriority.UseBorders = False
        Me.XrLabel6.StylePriority.UseFont = False
        Me.XrLabel6.StylePriority.UseForeColor = False
        Me.XrLabel6.StylePriority.UsePadding = False
        Me.XrLabel6.StylePriority.UseTextAlignment = False
        Me.XrLabel6.Text = "Total Exceso por Planes :"
        Me.XrLabel6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrTotalPlanNoConsumido
        '
        Me.XrTotalPlanNoConsumido.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalPlanNoConsumido.BorderColor = System.Drawing.Color.White
        Me.XrTotalPlanNoConsumido.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalPlanNoConsumido.CanGrow = False
        Me.XrTotalPlanNoConsumido.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalPlanNoConsumido.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalPlanNoConsumido.LocationFloat = New DevExpress.Utils.PointFloat(420.8194!, 0.0!)
        Me.XrTotalPlanNoConsumido.Name = "XrTotalPlanNoConsumido"
        Me.XrTotalPlanNoConsumido.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalPlanNoConsumido.SizeF = New System.Drawing.SizeF(225.5679!, 23.0!)
        Me.XrTotalPlanNoConsumido.StylePriority.UseBackColor = False
        Me.XrTotalPlanNoConsumido.StylePriority.UseBorderColor = False
        Me.XrTotalPlanNoConsumido.StylePriority.UseBorders = False
        Me.XrTotalPlanNoConsumido.StylePriority.UseFont = False
        Me.XrTotalPlanNoConsumido.StylePriority.UseForeColor = False
        Me.XrTotalPlanNoConsumido.StylePriority.UsePadding = False
        Me.XrTotalPlanNoConsumido.StylePriority.UseTextAlignment = False
        Me.XrTotalPlanNoConsumido.Text = "XrTotalPlanNoConsumido"
        Me.XrTotalPlanNoConsumido.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
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
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageInfo2, Me.XrLabel5, Me.XrPageInfo1, Me.LBLUsuario, Me.XrLabel7, Me.LBLEmpresa, Me.XrLabel8, Me.XrLine2})
        Me.PageFooter.HeightF = 101.0417!
        Me.PageFooter.Name = "PageFooter"
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(352.2686!, 27.49996!)
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
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 51.87505!)
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
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(737.5927!, 27.49996!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(90.40704!, 23.0!)
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
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(72.20154!, 51.87505!)
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
        Me.XrLabel7.LocationFloat = New DevExpress.Utils.PointFloat(632.3844!, 27.49996!)
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
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(72.20151!, 26.87505!)
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
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(1.000031!, 26.87505!)
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
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 5.999979!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(828.0414!, 9.0!)
        '
        'XRPT_Con_Rpt_ConsumoPorPlan
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.GroupHeader1, Me.GroupHeader2, Me.GroupFooter1, Me.GroupFooter2, Me.PageFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfTitulo3, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MoV_s_IMP_Llamada_ConsumoPorPlanTableAdapter1
        Me.DataMember = "MOV_s_IMP_Llamada_ConsumoPorPlan"
        Me.DataSource = Me.DsReporteConsultas1
        Me.Margins = New System.Drawing.Printing.Margins(9, 11, 0, 0)
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents DsReporteConsultas1 As dsReporteConsultas
    Friend WithEvents MoV_s_IMP_Llamada_ConsumoPorPlanTableAdapter1 As dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_ConsumoPorPlanTableAdapter
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupHeader2 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents GroupFooter2 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel3 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo3 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell9 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrNumTel As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNomTel As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNumLla As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrExceso As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalPlanExceso As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalEmpleadoExceso As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel7 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrTotalEmpleadoNoConsumido As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalPlanNoConsumido As DevExpress.XtraReports.UI.XRLabel
End Class
