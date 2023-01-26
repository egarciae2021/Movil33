<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Con_Rpt_SumarioPorEmpleado_GeneralSumario
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Con_Rpt_SumarioPorEmpleado_GeneralSumario))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrOrganizacion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNumLlaTot = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrDurLlaTop = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrDcCosLlaTot = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrPorcentaje = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TrFija = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCel = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrDdi = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotal = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrFijaCost = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCelCost = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrDdiCost = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotalCost = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell9 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTituloCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCell21 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell15 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell14 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTituloSegundos = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell18 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell17 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell21 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTituloPromedio = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.DsReporteConsultas1 = New dsReporteConsultas()
        Me.MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumarioTableAdapter1 = New dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumarioTableAdapter()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo3 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo4 = New DevExpress.XtraReports.UI.CalculatedField()
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
        Me.ReportFooter = New DevExpress.XtraReports.UI.ReportFooterBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow3 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotalLlam = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotalDuracion = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotalCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrDetalle})
        Me.Detail.HeightF = 31.33332!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrDetalle
        '
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(1.999982!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(825.9998!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrOrganizacion, Me.XrNumLlaTot, Me.XrDurLlaTop, Me.XrDcCosLlaTot, Me.XrPorcentaje, Me.TrFija, Me.XrCel, Me.XrDdi, Me.XrTotal, Me.XrFijaCost, Me.XrCelCost, Me.XrDdiCost, Me.XrTotalCost})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrOrganizacion
        '
        Me.XrOrganizacion.BackColor = System.Drawing.Color.Transparent
        Me.XrOrganizacion.EvenStyleName = "Fila1"
        Me.XrOrganizacion.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrOrganizacion.Name = "XrOrganizacion"
        Me.XrOrganizacion.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrOrganizacion.StyleName = "Fila2"
        Me.XrOrganizacion.StylePriority.UseFont = False
        Me.XrOrganizacion.StylePriority.UsePadding = False
        Me.XrOrganizacion.StylePriority.UseTextAlignment = False
        Me.XrOrganizacion.Text = "XrOrganizacion"
        Me.XrOrganizacion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrOrganizacion.Weight = 0.10121125674672674R
        '
        'XrNumLlaTot
        '
        Me.XrNumLlaTot.BackColor = System.Drawing.Color.Transparent
        Me.XrNumLlaTot.CanGrow = False
        Me.XrNumLlaTot.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumario.inNumLlaTot")})
        Me.XrNumLlaTot.EvenStyleName = "Fila1"
        Me.XrNumLlaTot.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNumLlaTot.Name = "XrNumLlaTot"
        Me.XrNumLlaTot.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrNumLlaTot.StyleName = "Fila2"
        Me.XrNumLlaTot.StylePriority.UseFont = False
        Me.XrNumLlaTot.StylePriority.UsePadding = False
        Me.XrNumLlaTot.StylePriority.UseTextAlignment = False
        Me.XrNumLlaTot.Text = "XrNumLlaTot"
        Me.XrNumLlaTot.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrNumLlaTot.Weight = 0.0591090507859688R
        '
        'XrDurLlaTop
        '
        Me.XrDurLlaTop.BackColor = System.Drawing.Color.Transparent
        Me.XrDurLlaTop.CanGrow = False
        Me.XrDurLlaTop.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumario.vcDurLlaTot")})
        Me.XrDurLlaTop.EvenStyleName = "Fila1"
        Me.XrDurLlaTop.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrDurLlaTop.Name = "XrDurLlaTop"
        Me.XrDurLlaTop.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrDurLlaTop.StyleName = "Fila2"
        Me.XrDurLlaTop.StylePriority.UseFont = False
        Me.XrDurLlaTop.StylePriority.UsePadding = False
        Me.XrDurLlaTop.StylePriority.UseTextAlignment = False
        Me.XrDurLlaTop.Text = "XrDurLlaTop"
        Me.XrDurLlaTop.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrDurLlaTop.Weight = 0.074355201095629583R
        '
        'XrDcCosLlaTot
        '
        Me.XrDcCosLlaTot.BackColor = System.Drawing.Color.Transparent
        Me.XrDcCosLlaTot.CanGrow = False
        Me.XrDcCosLlaTot.EvenStyleName = "Fila1"
        Me.XrDcCosLlaTot.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrDcCosLlaTot.Name = "XrDcCosLlaTot"
        Me.XrDcCosLlaTot.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrDcCosLlaTot.StyleName = "Fila2"
        Me.XrDcCosLlaTot.StylePriority.UseFont = False
        Me.XrDcCosLlaTot.StylePriority.UsePadding = False
        Me.XrDcCosLlaTot.StylePriority.UseTextAlignment = False
        Me.XrDcCosLlaTot.Text = "XrDcCosLlaTot"
        Me.XrDcCosLlaTot.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrDcCosLlaTot.Weight = 0.057683298398280264R
        '
        'XrPorcentaje
        '
        Me.XrPorcentaje.BackColor = System.Drawing.Color.Transparent
        Me.XrPorcentaje.CanGrow = False
        Me.XrPorcentaje.EvenStyleName = "Fila1"
        Me.XrPorcentaje.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrPorcentaje.Name = "XrPorcentaje"
        Me.XrPorcentaje.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrPorcentaje.StyleName = "Fila2"
        Me.XrPorcentaje.StylePriority.UseFont = False
        Me.XrPorcentaje.StylePriority.UsePadding = False
        Me.XrPorcentaje.StylePriority.UseTextAlignment = False
        Me.XrPorcentaje.Text = "XrPorcentaje"
        Me.XrPorcentaje.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrPorcentaje.Weight = 0.041043412302353068R
        '
        'TrFija
        '
        Me.TrFija.BackColor = System.Drawing.Color.Transparent
        Me.TrFija.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumario.dcDurPromReaLlaLoc")})
        Me.TrFija.EvenStyleName = "Fila1"
        Me.TrFija.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.TrFija.Name = "TrFija"
        Me.TrFija.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.TrFija.StyleName = "Fila2"
        Me.TrFija.StylePriority.UseFont = False
        Me.TrFija.StylePriority.UsePadding = False
        Me.TrFija.StylePriority.UseTextAlignment = False
        Me.TrFija.Text = "TrFija"
        Me.TrFija.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.TrFija.Weight = 0.048441692296638771R
        '
        'XrCel
        '
        Me.XrCel.BackColor = System.Drawing.Color.Transparent
        Me.XrCel.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumario.dcDurPromReaLlaCel")})
        Me.XrCel.EvenStyleName = "Fila1"
        Me.XrCel.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCel.Name = "XrCel"
        Me.XrCel.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCel.StyleName = "Fila2"
        Me.XrCel.StylePriority.UseFont = False
        Me.XrCel.StylePriority.UsePadding = False
        Me.XrCel.StylePriority.UseTextAlignment = False
        Me.XrCel.Text = "XrCel"
        Me.XrCel.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCel.Weight = 0.053942184043352451R
        '
        'XrDdi
        '
        Me.XrDdi.BackColor = System.Drawing.Color.Transparent
        Me.XrDdi.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumario.dcDurPromReaLlaDdi")})
        Me.XrDdi.EvenStyleName = "Fila1"
        Me.XrDdi.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrDdi.Name = "XrDdi"
        Me.XrDdi.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrDdi.StyleName = "Fila2"
        Me.XrDdi.StylePriority.UseFont = False
        Me.XrDdi.StylePriority.UsePadding = False
        Me.XrDdi.StylePriority.UseTextAlignment = False
        Me.XrDdi.Text = "XrDdi"
        Me.XrDdi.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrDdi.Weight = 0.051068212332331664R
        '
        'XrTotal
        '
        Me.XrTotal.BackColor = System.Drawing.Color.Transparent
        Me.XrTotal.EvenStyleName = "Fila1"
        Me.XrTotal.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotal.Name = "XrTotal"
        Me.XrTotal.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotal.StyleName = "Fila2"
        Me.XrTotal.StylePriority.UseFont = False
        Me.XrTotal.StylePriority.UsePadding = False
        Me.XrTotal.StylePriority.UseTextAlignment = False
        Me.XrTotal.Text = "XrTotal"
        Me.XrTotal.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotal.Weight = 0.058379586696727027R
        '
        'XrFijaCost
        '
        Me.XrFijaCost.BackColor = System.Drawing.Color.Transparent
        Me.XrFijaCost.EvenStyleName = "Fila1"
        Me.XrFijaCost.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrFijaCost.Name = "XrFijaCost"
        Me.XrFijaCost.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrFijaCost.StyleName = "Fila2"
        Me.XrFijaCost.StylePriority.UseFont = False
        Me.XrFijaCost.StylePriority.UsePadding = False
        Me.XrFijaCost.StylePriority.UseTextAlignment = False
        Me.XrFijaCost.Text = "XrFijaCost"
        Me.XrFijaCost.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrFijaCost.Weight = 0.0478479071576401R
        '
        'XrCelCost
        '
        Me.XrCelCost.BackColor = System.Drawing.Color.Transparent
        Me.XrCelCost.EvenStyleName = "Fila1"
        Me.XrCelCost.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCelCost.Name = "XrCelCost"
        Me.XrCelCost.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCelCost.StyleName = "Fila2"
        Me.XrCelCost.StylePriority.UseFont = False
        Me.XrCelCost.StylePriority.UsePadding = False
        Me.XrCelCost.StylePriority.UseTextAlignment = False
        Me.XrCelCost.Text = "XrCelCost"
        Me.XrCelCost.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCelCost.Weight = 0.048159278355661715R
        '
        'XrDdiCost
        '
        Me.XrDdiCost.BackColor = System.Drawing.Color.Transparent
        Me.XrDdiCost.EvenStyleName = "Fila1"
        Me.XrDdiCost.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrDdiCost.Name = "XrDdiCost"
        Me.XrDdiCost.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrDdiCost.StyleName = "Fila2"
        Me.XrDdiCost.StylePriority.UseFont = False
        Me.XrDdiCost.StylePriority.UsePadding = False
        Me.XrDdiCost.StylePriority.UseTextAlignment = False
        Me.XrDdiCost.Text = "XrDdiCost"
        Me.XrDdiCost.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrDdiCost.Weight = 0.044507295807131454R
        '
        'XrTotalCost
        '
        Me.XrTotalCost.BackColor = System.Drawing.Color.Transparent
        Me.XrTotalCost.EvenStyleName = "Fila1"
        Me.XrTotalCost.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalCost.Name = "XrTotalCost"
        Me.XrTotalCost.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotalCost.StyleName = "Fila2"
        Me.XrTotalCost.StylePriority.UseFont = False
        Me.XrTotalCost.StylePriority.UsePadding = False
        Me.XrTotalCost.StylePriority.UseTextAlignment = False
        Me.XrTotalCost.Text = "XrTotalCost"
        Me.XrTotalCost.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotalCost.Weight = 0.057687812452196965R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 32.58333!
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
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable2, Me.XrLabel1, Me.XrLabel12, Me.XrLabel10, Me.xrLine1, Me.Titulo2, Me.xrPictureBoxLogo, Me.XrPageBreak1, Me.XrLabel2})
        Me.PageHeader.HeightF = 206.125!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(114.4514!, 158.125!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1, Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(713.5484!, 45.99997!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow1
        '
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell8, Me.XrTableCell9})
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Weight = 0.25842696629213485R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell1.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell1.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell1.ForeColor = System.Drawing.Color.White
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.StylePriority.UseBackColor = False
        Me.XrTableCell1.StylePriority.UseBorderColor = False
        Me.XrTableCell1.StylePriority.UseBorders = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.StylePriority.UseForeColor = False
        Me.XrTableCell1.StylePriority.UseTextAlignment = False
        Me.XrTableCell1.Text = "Total"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell1.Weight = 0.32967970061905927R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell8.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell8.Borders = CType((DevExpress.XtraPrinting.BorderSide.Top Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.ForeColor = System.Drawing.Color.White
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseBorderColor = False
        Me.XrTableCell8.StylePriority.UseBorders = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UseForeColor = False
        Me.XrTableCell8.StylePriority.UseTextAlignment = False
        Me.XrTableCell8.Text = "Promedio Segundos x Llamada"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell8.Weight = 0.30077207033777R
        '
        'XrTableCell9
        '
        Me.XrTableCell9.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell9.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell9.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell9.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell9.ForeColor = System.Drawing.Color.White
        Me.XrTableCell9.Name = "XrTableCell9"
        Me.XrTableCell9.StylePriority.UseBackColor = False
        Me.XrTableCell9.StylePriority.UseBorderColor = False
        Me.XrTableCell9.StylePriority.UseBorders = False
        Me.XrTableCell9.StylePriority.UseFont = False
        Me.XrTableCell9.StylePriority.UseForeColor = False
        Me.XrTableCell9.StylePriority.UseTextAlignment = False
        Me.XrTableCell9.Text = "Promedio Costo por Llamada" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10)
        Me.XrTableCell9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell9.Weight = 0.2814205792970752R
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell3, Me.XrTableCell4, Me.XrTituloCosto, Me.XrTableCell2, Me.XrCell21, Me.XrTableCell15, Me.XrTableCell14, Me.XrTituloSegundos, Me.XrTableCell18, Me.XrTableCell17, Me.XrTableCell21, Me.XrTituloPromedio})
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
        Me.XrTableCell3.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell3.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
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
        Me.XrTableCell3.Text = "Llam."
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.083926802115262447R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell4.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
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
        Me.XrTableCell4.Text = "Duración"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.1055743301929238R
        '
        'XrTituloCosto
        '
        Me.XrTituloCosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTituloCosto.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
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
        Me.XrTituloCosto.Weight = 0.081902456829149151R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell2.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Right Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell2.CanGrow = False
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseBorderColor = False
        Me.XrTableCell2.StylePriority.UseBorders = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UseTextAlignment = False
        Me.XrTableCell2.Text = "%"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 0.058276118957927669R
        '
        'XrCell21
        '
        Me.XrCell21.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrCell21.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
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
        Me.XrCell21.Text = "Fija"
        Me.XrCell21.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrCell21.Weight = 0.068780559377728354R
        '
        'XrTableCell15
        '
        Me.XrTableCell15.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell15.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell15.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell15.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell15.Name = "XrTableCell15"
        Me.XrTableCell15.StylePriority.UseBackColor = False
        Me.XrTableCell15.StylePriority.UseBorderColor = False
        Me.XrTableCell15.StylePriority.UseBorders = False
        Me.XrTableCell15.StylePriority.UseFont = False
        Me.XrTableCell15.StylePriority.UseTextAlignment = False
        Me.XrTableCell15.Text = "Cel"
        Me.XrTableCell15.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell15.Weight = 0.076590589210799642R
        '
        'XrTableCell14
        '
        Me.XrTableCell14.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell14.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell14.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell14.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell14.Name = "XrTableCell14"
        Me.XrTableCell14.StylePriority.UseBackColor = False
        Me.XrTableCell14.StylePriority.UseBorderColor = False
        Me.XrTableCell14.StylePriority.UseBorders = False
        Me.XrTableCell14.StylePriority.UseFont = False
        Me.XrTableCell14.StylePriority.UseTextAlignment = False
        Me.XrTableCell14.Text = "DDI"
        Me.XrTableCell14.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell14.Weight = 0.072510056378099749R
        '
        'XrTituloSegundos
        '
        Me.XrTituloSegundos.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTituloSegundos.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTituloSegundos.Borders = CType((DevExpress.XtraPrinting.BorderSide.Right Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTituloSegundos.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTituloSegundos.Name = "XrTituloSegundos"
        Me.XrTituloSegundos.StylePriority.UseBackColor = False
        Me.XrTituloSegundos.StylePriority.UseBorderColor = False
        Me.XrTituloSegundos.StylePriority.UseBorders = False
        Me.XrTituloSegundos.StylePriority.UseFont = False
        Me.XrTituloSegundos.StylePriority.UseTextAlignment = False
        Me.XrTituloSegundos.Text = "Total"
        Me.XrTituloSegundos.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTituloSegundos.Weight = 0.084222157216250232R
        '
        'XrTableCell18
        '
        Me.XrTableCell18.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell18.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell18.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell18.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell18.Name = "XrTableCell18"
        Me.XrTableCell18.StylePriority.UseBackColor = False
        Me.XrTableCell18.StylePriority.UseBorderColor = False
        Me.XrTableCell18.StylePriority.UseBorders = False
        Me.XrTableCell18.StylePriority.UseFont = False
        Me.XrTableCell18.StylePriority.UseTextAlignment = False
        Me.XrTableCell18.Text = "Fija"
        Me.XrTableCell18.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell18.Weight = 0.066606406667759827R
        '
        'XrTableCell17
        '
        Me.XrTableCell17.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell17.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell17.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell17.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell17.Name = "XrTableCell17"
        Me.XrTableCell17.StylePriority.UseBackColor = False
        Me.XrTableCell17.StylePriority.UseBorderColor = False
        Me.XrTableCell17.StylePriority.UseBorders = False
        Me.XrTableCell17.StylePriority.UseFont = False
        Me.XrTableCell17.StylePriority.UseTextAlignment = False
        Me.XrTableCell17.Text = "Cel"
        Me.XrTableCell17.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell17.Weight = 0.068379561948341855R
        '
        'XrTableCell21
        '
        Me.XrTableCell21.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell21.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTableCell21.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell21.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell21.Name = "XrTableCell21"
        Me.XrTableCell21.StylePriority.UseBackColor = False
        Me.XrTableCell21.StylePriority.UseBorderColor = False
        Me.XrTableCell21.StylePriority.UseBorders = False
        Me.XrTableCell21.StylePriority.UseFont = False
        Me.XrTableCell21.StylePriority.UseTextAlignment = False
        Me.XrTableCell21.Text = "DDI"
        Me.XrTableCell21.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell21.Weight = 0.063194403163966573R
        '
        'XrTituloPromedio
        '
        Me.XrTituloPromedio.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTituloPromedio.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrTituloPromedio.Borders = CType((DevExpress.XtraPrinting.BorderSide.Right Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTituloPromedio.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTituloPromedio.Name = "XrTituloPromedio"
        Me.XrTituloPromedio.StylePriority.UseBackColor = False
        Me.XrTituloPromedio.StylePriority.UseBorderColor = False
        Me.XrTituloPromedio.StylePriority.UseBorders = False
        Me.XrTituloPromedio.StylePriority.UseFont = False
        Me.XrTituloPromedio.StylePriority.UseTextAlignment = False
        Me.XrTituloPromedio.Text = "Total"
        Me.XrTituloPromedio.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTituloPromedio.Weight = 0.081908908195695393R
        '
        'XrLabel1
        '
        Me.XrLabel1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo3")})
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 87.5!)
        Me.XrLabel1.LockedInUserDesigner = True
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(827.9999!, 22.70835!)
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
        'XrLabel10
        '
        Me.XrLabel10.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo4")})
        Me.XrLabel10.Font = New System.Drawing.Font("Trebuchet MS", 9.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel10.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel10.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 116.3855!)
        Me.XrLabel10.LockedInUserDesigner = True
        Me.XrLabel10.Name = "XrLabel10"
        Me.XrLabel10.Padding = New DevExpress.XtraPrinting.PaddingInfo(7, 1, 0, 0, 100.0!)
        Me.XrLabel10.SizeF = New System.Drawing.SizeF(827.9999!, 18.54166!)
        Me.XrLabel10.StylePriority.UseFont = False
        Me.XrLabel10.StylePriority.UseForeColor = False
        Me.XrLabel10.StylePriority.UsePadding = False
        Me.XrLabel10.Text = "XrLabel10"
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 140.1355!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(828.0!, 9.0!)
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 14.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 59.30223!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(827.9999!, 22.70835!)
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
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 10.00001!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.9583!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 204.125!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
        '
        'XrLabel2
        '
        Me.XrLabel2.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLabel2.BorderColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.XrLabel2.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.ForeColor = System.Drawing.Color.White
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(2.000006!, 158.125!)
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(112.4514!, 45.99995!)
        Me.XrLabel2.StylePriority.UseBackColor = False
        Me.XrLabel2.StylePriority.UseBorderColor = False
        Me.XrLabel2.StylePriority.UseBorders = False
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UseForeColor = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "Línea - Empleado"
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'DsReporteConsultas1
        '
        Me.DsReporteConsultas1.DataSetName = "dsReporteConsultas"
        Me.DsReporteConsultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumarioTableAdapter1
        '
        Me.MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumarioTableAdapter1.ClearBeforeFill = True
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
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageInfo2, Me.XrLabel5, Me.XrPageInfo1, Me.LBLUsuario, Me.XrLabel7, Me.LBLEmpresa, Me.XrLabel8, Me.XrLine2})
        Me.PageFooter.HeightF = 91.66666!
        Me.PageFooter.Name = "PageFooter"
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(351.5813!, 31.49996!)
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
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.999982!, 55.87505!)
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
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(736.9053!, 31.49996!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(93.09442!, 23.00001!)
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
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(73.20149!, 55.87505!)
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
        Me.XrLabel7.LocationFloat = New DevExpress.Utils.PointFloat(631.697!, 31.49996!)
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
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(73.20149!, 30.87505!)
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
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(1.999982!, 30.87505!)
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
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(1.999982!, 10.00001!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(828.0!, 9.0!)
        '
        'ReportFooter
        '
        Me.ReportFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.ReportFooter.HeightF = 36.62494!
        Me.ReportFooter.Name = "ReportFooter"
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(1.999966!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow3})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(324.8273!, 25.0!)
        '
        'XrTableRow3
        '
        Me.XrTableRow3.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell7, Me.XrTotalLlam, Me.XrTotalDuracion, Me.XrTotalCosto})
        Me.XrTableRow3.Name = "XrTableRow3"
        Me.XrTableRow3.Weight = 1.0R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTableCell7.BorderColor = System.Drawing.Color.White
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.StylePriority.UseBackColor = False
        Me.XrTableCell7.StylePriority.UseBorderColor = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UseTextAlignment = False
        Me.XrTableCell7.Text = "Total General :"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell7.Weight = 0.91516983102132543R
        '
        'XrTotalLlam
        '
        Me.XrTotalLlam.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalLlam.BorderColor = System.Drawing.Color.White
        Me.XrTotalLlam.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotalLlam.CanGrow = False
        Me.XrTotalLlam.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalLlam.Name = "XrTotalLlam"
        Me.XrTotalLlam.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 3, 0, 0, 100.0!)
        Me.XrTotalLlam.StylePriority.UseBackColor = False
        Me.XrTotalLlam.StylePriority.UseBorderColor = False
        Me.XrTotalLlam.StylePriority.UseBorders = False
        Me.XrTotalLlam.StylePriority.UseBorderWidth = False
        Me.XrTotalLlam.StylePriority.UseFont = False
        Me.XrTotalLlam.StylePriority.UsePadding = False
        Me.XrTotalLlam.StylePriority.UseTextAlignment = False
        Me.XrTotalLlam.Text = "XrTotalLlam"
        Me.XrTotalLlam.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotalLlam.Weight = 0.53447402676297151R
        '
        'XrTotalDuracion
        '
        Me.XrTotalDuracion.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalDuracion.BorderColor = System.Drawing.Color.White
        Me.XrTotalDuracion.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotalDuracion.CanGrow = False
        Me.XrTotalDuracion.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalDuracion.Name = "XrTotalDuracion"
        Me.XrTotalDuracion.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTotalDuracion.StylePriority.UseBackColor = False
        Me.XrTotalDuracion.StylePriority.UseBorderColor = False
        Me.XrTotalDuracion.StylePriority.UseBorders = False
        Me.XrTotalDuracion.StylePriority.UseFont = False
        Me.XrTotalDuracion.StylePriority.UsePadding = False
        Me.XrTotalDuracion.StylePriority.UseTextAlignment = False
        Me.XrTotalDuracion.Text = "XrTotalDuracion"
        Me.XrTotalDuracion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTotalDuracion.Weight = 0.67233258268764451R
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
        Me.XrTotalCosto.Weight = 0.52158252688478512R
        '
        'Fila1
        '
        Me.Fila1.BackColor = System.Drawing.Color.FromArgb(CType(CType(196, Byte), Integer), CType(CType(220, Byte), Integer), CType(CType(255, Byte), Integer))
        Me.Fila1.Name = "Fila1"
        Me.Fila1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'Fila2
        '
        Me.Fila2.BackColor = System.Drawing.Color.White
        Me.Fila2.Name = "Fila2"
        Me.Fila2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'XRPT_Con_Rpt_SumarioPorEmpleado_GeneralSumario
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.PageFooter, Me.ReportFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfTitulo3, Me.cfTitulo4, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumarioTableAdapter1
        Me.DataMember = "MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumario"
        Me.DataSource = Me.DsReporteConsultas1
        Me.Margins = New System.Drawing.Printing.Margins(8, 12, 33, 0)
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1, Me.Fila2})
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents DsReporteConsultas1 As dsReporteConsultas
    Friend WithEvents MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumarioTableAdapter1 As dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_SumarioPorEmpleado_GenSumarioTableAdapter
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo3 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo4 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel7 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell9 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTituloCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCell21 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell15 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell14 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTituloSegundos As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell18 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell17 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell21 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTituloPromedio As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrOrganizacion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNumLlaTot As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrDurLlaTop As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrDcCosLlaTot As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPorcentaje As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalCost As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents TrFija As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCel As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrDdi As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotal As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrFijaCost As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCelCost As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrDdiCost As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents ReportFooter As DevExpress.XtraReports.UI.ReportFooterBand
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow3 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalLlam As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalDuracion As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
End Class
