<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Con_Rpt_SumarioPorNumero_PorGrupo
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Con_Rpt_SumarioPorNumero_PorGrupo))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrSubTipo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrLlamada = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrDuracion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrPorcentaje = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCeldA = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTituloCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCell21 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow3 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSubTotLlamada = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSubTotDuracion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSubTotalCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.DsReporteConsultas1 = New dsReporteConsultas()
        Me.MoV_s_IMP_Llamada_SumarioPorNumero_PorGrupoTableAdapter1 = New dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupoTableAdapter()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo3 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo4 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        Me.ReportFooter = New DevExpress.XtraReports.UI.ReportFooterBand()
        Me.XrTable3 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotLlamada = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotDuracion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotalCosto = New DevExpress.XtraReports.UI.XRTableCell()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).BeginInit()
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
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(0.9999275!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(826.4998!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrSubTipo, Me.XrLlamada, Me.XrDuracion, Me.XrCosto, Me.XrPorcentaje})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrSubTipo
        '
        Me.XrSubTipo.BackColor = System.Drawing.Color.Transparent
        Me.XrSubTipo.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupo.vcNomSubTip")})
        Me.XrSubTipo.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSubTipo.Name = "XrSubTipo"
        Me.XrSubTipo.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrSubTipo.StylePriority.UseBackColor = False
        Me.XrSubTipo.StylePriority.UseFont = False
        Me.XrSubTipo.StylePriority.UsePadding = False
        Me.XrSubTipo.StylePriority.UseTextAlignment = False
        Me.XrSubTipo.Text = "XrSubTipo"
        Me.XrSubTipo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrSubTipo.Weight = 0.26605044772978326R
        '
        'XrLlamada
        '
        Me.XrLlamada.BackColor = System.Drawing.Color.Transparent
        Me.XrLlamada.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupo.inNumLla")})
        Me.XrLlamada.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrLlamada.Name = "XrLlamada"
        Me.XrLlamada.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrLlamada.StylePriority.UseBackColor = False
        Me.XrLlamada.StylePriority.UseFont = False
        Me.XrLlamada.StylePriority.UsePadding = False
        Me.XrLlamada.StylePriority.UseTextAlignment = False
        Me.XrLlamada.Text = "XrLlamada"
        Me.XrLlamada.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrLlamada.Weight = 0.11038988784097839R
        '
        'XrDuracion
        '
        Me.XrDuracion.BackColor = System.Drawing.Color.Transparent
        Me.XrDuracion.CanGrow = False
        Me.XrDuracion.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupo.vcDurRea")})
        Me.XrDuracion.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrDuracion.Name = "XrDuracion"
        Me.XrDuracion.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 3, 0, 0, 100.0!)
        Me.XrDuracion.StylePriority.UseBackColor = False
        Me.XrDuracion.StylePriority.UseFont = False
        Me.XrDuracion.StylePriority.UsePadding = False
        Me.XrDuracion.StylePriority.UseTextAlignment = False
        Me.XrDuracion.Text = "XrDuracion"
        Me.XrDuracion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrDuracion.Weight = 0.12293392299256597R
        '
        'XrCosto
        '
        Me.XrCosto.BackColor = System.Drawing.Color.Transparent
        Me.XrCosto.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrCosto.CanGrow = False
        Me.XrCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCosto.Name = "XrCosto"
        Me.XrCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCosto.StylePriority.UseBackColor = False
        Me.XrCosto.StylePriority.UseBorders = False
        Me.XrCosto.StylePriority.UseFont = False
        Me.XrCosto.StylePriority.UsePadding = False
        Me.XrCosto.StylePriority.UseTextAlignment = False
        Me.XrCosto.Text = "XrCosto"
        Me.XrCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCosto.Weight = 0.10522238483460128R
        '
        'XrPorcentaje
        '
        Me.XrPorcentaje.BackColor = System.Drawing.Color.Transparent
        Me.XrPorcentaje.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrPorcentaje.Name = "XrPorcentaje"
        Me.XrPorcentaje.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrPorcentaje.StylePriority.UseBackColor = False
        Me.XrPorcentaje.StylePriority.UseFont = False
        Me.XrPorcentaje.StylePriority.UsePadding = False
        Me.XrPorcentaje.StylePriority.UseTextAlignment = False
        Me.XrPorcentaje.Text = "XrPorcentaje"
        Me.XrPorcentaje.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrPorcentaje.Weight = 0.12775137257075153R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 38.0!
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
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel1, Me.XrLabel12, Me.XrLabel10, Me.xrLine1, Me.Titulo2, Me.xrPictureBoxLogo, Me.XrLabel2, Me.XrTable2})
        Me.PageHeader.HeightF = 205.9167!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrLabel1
        '
        Me.XrLabel1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo3")})
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(0.9999245!, 77.49999!)
        Me.XrLabel1.LockedInUserDesigner = True
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(826.4999!, 22.70835!)
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
        Me.XrLabel12.LocationFloat = New DevExpress.Utils.PointFloat(148.9583!, 3.666651!)
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
        Me.XrLabel10.LocationFloat = New DevExpress.Utils.PointFloat(0.9999245!, 106.3855!)
        Me.XrLabel10.LockedInUserDesigner = True
        Me.XrLabel10.Name = "XrLabel10"
        Me.XrLabel10.Padding = New DevExpress.XtraPrinting.PaddingInfo(7, 1, 0, 0, 100.0!)
        Me.XrLabel10.SizeF = New System.Drawing.SizeF(826.4999!, 18.54166!)
        Me.XrLabel10.StylePriority.UseFont = False
        Me.XrLabel10.StylePriority.UseForeColor = False
        Me.XrLabel10.StylePriority.UsePadding = False
        Me.XrLabel10.Text = "XrLabel10"
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(0.9999245!, 130.1355!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(826.5001!, 9.000015!)
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 14.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(0.9999245!, 49.30223!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(826.4999!, 22.70835!)
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
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(0.9999275!, 0.0!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(147.9584!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'GroupHeader1
        '
        Me.GroupHeader1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("inCodTip", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 3.833326!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(1.041635!, 182.9167!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(826.4998!, 22.99998!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell3, Me.XrTableCell4, Me.XrCeldA, Me.XrTituloCosto, Me.XrCell21})
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
        Me.XrTableCell3.Text = "Sub Tipo"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.331268821491543R
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
        Me.XrTableCell4.Text = "Llamadas"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.13745028003543738R
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
        Me.XrCeldA.Text = "Duración"
        Me.XrCeldA.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrCeldA.Weight = 0.15306946405726377R
        '
        'XrTituloCosto
        '
        Me.XrTituloCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTituloCosto.BorderColor = System.Drawing.Color.Transparent
        Me.XrTituloCosto.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTituloCosto.CanGrow = False
        Me.XrTituloCosto.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTituloCosto.Name = "XrTituloCosto"
        Me.XrTituloCosto.StylePriority.UseBackColor = False
        Me.XrTituloCosto.StylePriority.UseBorderColor = False
        Me.XrTituloCosto.StylePriority.UseBorders = False
        Me.XrTituloCosto.StylePriority.UseFont = False
        Me.XrTituloCosto.StylePriority.UseTextAlignment = False
        Me.XrTituloCosto.Text = "Costo"
        Me.XrTituloCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTituloCosto.Weight = 0.13101603517097402R
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
        Me.XrCell21.Text = "Porcentaje"
        Me.XrCell21.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrCell21.Weight = 0.15906774949868641R
        '
        'XrLabel2
        '
        Me.XrLabel2.BackColor = System.Drawing.Color.FromArgb(CType(CType(206, Byte), Integer), CType(CType(206, Byte), Integer), CType(CType(206, Byte), Integer))
        Me.XrLabel2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupo.vcNomTip")})
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(1.041635!, 150.625!)
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 100.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(827.9584!, 23.0!)
        Me.XrLabel2.StylePriority.UseBackColor = False
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UseForeColor = False
        Me.XrLabel2.StylePriority.UsePadding = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "XrLabel2"
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'GroupFooter1
        '
        Me.GroupFooter1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.GroupFooter1.HeightF = 35.00001!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(214.5832!, 10.00001!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow3})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(612.9166!, 25.0!)
        '
        'XrTableRow3
        '
        Me.XrTableRow3.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell7, Me.XrSubTotLlamada, Me.XrSubTotDuracion, Me.XrSubTotalCosto, Me.XrTableCell2})
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
        Me.XrTableCell7.Text = "Total por Tipo :"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell7.Weight = 0.65931330914884667R
        '
        'XrSubTotLlamada
        '
        Me.XrSubTotLlamada.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrSubTotLlamada.BorderColor = System.Drawing.Color.White
        Me.XrSubTotLlamada.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrSubTotLlamada.CanGrow = False
        Me.XrSubTotLlamada.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSubTotLlamada.Name = "XrSubTotLlamada"
        Me.XrSubTotLlamada.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSubTotLlamada.StylePriority.UseBackColor = False
        Me.XrSubTotLlamada.StylePriority.UseBorderColor = False
        Me.XrSubTotLlamada.StylePriority.UseBorders = False
        Me.XrSubTotLlamada.StylePriority.UseBorderWidth = False
        Me.XrSubTotLlamada.StylePriority.UseFont = False
        Me.XrSubTotLlamada.StylePriority.UsePadding = False
        Me.XrSubTotLlamada.StylePriority.UseTextAlignment = False
        Me.XrSubTotLlamada.Text = "XrSubTotLlamada"
        Me.XrSubTotLlamada.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSubTotLlamada.Weight = 0.94770412906244372R
        '
        'XrSubTotDuracion
        '
        Me.XrSubTotDuracion.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrSubTotDuracion.BorderColor = System.Drawing.Color.White
        Me.XrSubTotDuracion.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrSubTotDuracion.CanGrow = False
        Me.XrSubTotDuracion.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSubTotDuracion.Name = "XrSubTotDuracion"
        Me.XrSubTotDuracion.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrSubTotDuracion.StylePriority.UseBackColor = False
        Me.XrSubTotDuracion.StylePriority.UseBorderColor = False
        Me.XrSubTotDuracion.StylePriority.UseBorders = False
        Me.XrSubTotDuracion.StylePriority.UseFont = False
        Me.XrSubTotDuracion.StylePriority.UsePadding = False
        Me.XrSubTotDuracion.StylePriority.UseTextAlignment = False
        Me.XrSubTotDuracion.Text = "XrSubTotDuracion"
        Me.XrSubTotDuracion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrSubTotDuracion.Weight = 1.0553972385474624R
        '
        'XrSubTotalCosto
        '
        Me.XrSubTotalCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrSubTotalCosto.BorderColor = System.Drawing.Color.White
        Me.XrSubTotalCosto.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrSubTotalCosto.CanGrow = False
        Me.XrSubTotalCosto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSubTotalCosto.Name = "XrSubTotalCosto"
        Me.XrSubTotalCosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSubTotalCosto.StylePriority.UseBackColor = False
        Me.XrSubTotalCosto.StylePriority.UseBorderColor = False
        Me.XrSubTotalCosto.StylePriority.UseBorders = False
        Me.XrSubTotalCosto.StylePriority.UseFont = False
        Me.XrSubTotalCosto.StylePriority.UsePadding = False
        Me.XrSubTotalCosto.StylePriority.UseTextAlignment = False
        Me.XrSubTotalCosto.Text = "XrSubTotalCosto"
        Me.XrSubTotalCosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSubTotalCosto.Weight = 0.90334117976993056R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UseTextAlignment = False
        Me.XrTableCell2.Text = "100.00%"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 1.0967540719294164R
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLine2, Me.XrLabel5, Me.LBLEmpresa, Me.XrLabel4, Me.LBLUsuario, Me.XrPageInfo1, Me.XrLabel6, Me.XrPageInfo2})
        Me.PageFooter.HeightF = 114.5833!
        Me.PageFooter.Name = "PageFooter"
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 10.00001!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(827.5001!, 9.000001!)
        '
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.CanGrow = False
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 30.87505!)
        Me.XrLabel5.Name = "XrLabel5"
        Me.XrLabel5.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel5.SizeF = New System.Drawing.SizeF(71.2015!, 22.375!)
        Me.XrLabel5.StylePriority.UseBackColor = False
        Me.XrLabel5.StylePriority.UseFont = False
        Me.XrLabel5.StylePriority.UseForeColor = False
        Me.XrLabel5.StylePriority.UseTextAlignment = False
        Me.XrLabel5.Text = "Empresa:"
        Me.XrLabel5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.CanGrow = False
        Me.LBLEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfEmpresa")})
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(71.2015!, 30.87505!)
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
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel4.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(639.0928!, 31.49996!)
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
        Me.LBLUsuario.CanGrow = False
        Me.LBLUsuario.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfUsuario")})
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(71.20152!, 55.87505!)
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
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(744.301!, 31.49996!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(83.19879!, 23.0!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.CanGrow = False
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 55.87505!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(71.2015!, 24.45833!)
        Me.XrLabel6.StylePriority.UseBackColor = False
        Me.XrLabel6.StylePriority.UseFont = False
        Me.XrLabel6.StylePriority.UseForeColor = False
        Me.XrLabel6.StylePriority.UseTextAlignment = False
        Me.XrLabel6.Text = "Emisor:"
        Me.XrLabel6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(350.6436!, 31.49996!)
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
        'DsReporteConsultas1
        '
        Me.DsReporteConsultas1.DataSetName = "dsReporteConsultas"
        Me.DsReporteConsultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MoV_s_IMP_Llamada_SumarioPorNumero_PorGrupoTableAdapter1
        '
        Me.MoV_s_IMP_Llamada_SumarioPorNumero_PorGrupoTableAdapter1.ClearBeforeFill = True
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
        'ReportFooter
        '
        Me.ReportFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable3})
        Me.ReportFooter.HeightF = 35.00001!
        Me.ReportFooter.Name = "ReportFooter"
        '
        'XrTable3
        '
        Me.XrTable3.LocationFloat = New DevExpress.Utils.PointFloat(138.5416!, 10.00001!)
        Me.XrTable3.Name = "XrTable3"
        Me.XrTable3.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.XrTable3.SizeF = New System.Drawing.SizeF(544.7829!, 25.0!)
        '
        'XrTableRow1
        '
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTotLlamada, Me.XrTotDuracion, Me.XrTotalCosto})
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
        Me.XrTableCell1.Text = "Total :"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell1.Weight = 1.21190726844022R
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
        Me.XrTotLlamada.Weight = 0.92790312687107224R
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
        Me.XrTotDuracion.Weight = 1.0333465273960791R
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
        Me.XrTotalCosto.Weight = 0.88446625316116023R
        '
        'XRPT_Con_Rpt_SumarioPorNumero_PorGrupo
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.GroupHeader1, Me.GroupFooter1, Me.PageFooter, Me.ReportFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfTitulo3, Me.cfTitulo4, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MoV_s_IMP_Llamada_SumarioPorNumero_PorGrupoTableAdapter1
        Me.DataMember = "MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupo"
        Me.DataSource = Me.DsReporteConsultas1
        Me.Margins = New System.Drawing.Printing.Margins(9, 12, 38, 0)
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents DsReporteConsultas1 As dsReporteConsultas
    Friend WithEvents MoV_s_IMP_Llamada_SumarioPorNumero_PorGrupoTableAdapter1 As dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_SumarioPorNumero_PorGrupoTableAdapter
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo3 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo4 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCeldA As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTituloCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCell21 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrSubTipo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrLlamada As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrDuracion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPorcentaje As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow3 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSubTotLlamada As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSubTotDuracion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSubTotalCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents ReportFooter As DevExpress.XtraReports.UI.ReportFooterBand
    Friend WithEvents XrTable3 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotLlamada As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotDuracion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
End Class
