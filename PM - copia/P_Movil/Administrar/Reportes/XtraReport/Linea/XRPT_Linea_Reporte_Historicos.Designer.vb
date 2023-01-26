<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Linea_Reporte_Historicos
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Linea_Reporte_Historicos))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrLinea = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrEmpleado = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCentro = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrIMEI = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrModelo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrEstado = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrFechaIni = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrFechaFin = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrObs = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.XrLabel8 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel7 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell17 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell10 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell14 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Titulo1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.Consultas1 = New Consultas()
        Me.MOV_s_Linea_Reporte_HistoricosTableAdapter = New ConsultasTableAdapters.MOV_s_Linea_Reporte_HistoricosTableAdapter()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).BeginInit()
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
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(815.625!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrLinea, Me.XrEmpleado, Me.XrCentro, Me.XrIMEI, Me.XrModelo, Me.XrEstado, Me.XrFechaIni, Me.XrFechaFin, Me.XrObs})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrLinea
        '
        Me.XrLinea.BackColor = System.Drawing.Color.Transparent
        Me.XrLinea.BorderColor = System.Drawing.Color.LightGray
        Me.XrLinea.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrLinea.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.F_vcCodEmp")})
        Me.XrLinea.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrLinea.Name = "XrLinea"
        Me.XrLinea.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrLinea.StylePriority.UseBackColor = False
        Me.XrLinea.StylePriority.UseBorderColor = False
        Me.XrLinea.StylePriority.UseBorders = False
        Me.XrLinea.StylePriority.UseFont = False
        Me.XrLinea.StylePriority.UsePadding = False
        Me.XrLinea.StylePriority.UseTextAlignment = False
        Me.XrLinea.Text = "XrTableCell4"
        Me.XrLinea.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrLinea.Weight = 0.034341478761740866R
        '
        'XrEmpleado
        '
        Me.XrEmpleado.BackColor = System.Drawing.Color.Transparent
        Me.XrEmpleado.BorderColor = System.Drawing.Color.LightGray
        Me.XrEmpleado.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrEmpleado.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.EMPL_vcNOMEMP")})
        Me.XrEmpleado.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrEmpleado.Name = "XrEmpleado"
        Me.XrEmpleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrEmpleado.StylePriority.UseBackColor = False
        Me.XrEmpleado.StylePriority.UseBorderColor = False
        Me.XrEmpleado.StylePriority.UseBorders = False
        Me.XrEmpleado.StylePriority.UseFont = False
        Me.XrEmpleado.StylePriority.UsePadding = False
        Me.XrEmpleado.StylePriority.UseTextAlignment = False
        Me.XrEmpleado.Text = "XrEmpleado"
        Me.XrEmpleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrEmpleado.Weight = 0.10228961000658747R
        '
        'XrCentro
        '
        Me.XrCentro.BackColor = System.Drawing.Color.Transparent
        Me.XrCentro.BorderColor = System.Drawing.Color.LightGray
        Me.XrCentro.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrCentro.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.F_inCodEst")})
        Me.XrCentro.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCentro.Name = "XrCentro"
        Me.XrCentro.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrCentro.StylePriority.UseBackColor = False
        Me.XrCentro.StylePriority.UseBorderColor = False
        Me.XrCentro.StylePriority.UseBorders = False
        Me.XrCentro.StylePriority.UseFont = False
        Me.XrCentro.StylePriority.UsePadding = False
        Me.XrCentro.StylePriority.UseTextAlignment = False
        Me.XrCentro.Text = "XrTableCell5"
        Me.XrCentro.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrCentro.Weight = 0.024811728959454996R
        '
        'XrIMEI
        '
        Me.XrIMEI.BackColor = System.Drawing.Color.Transparent
        Me.XrIMEI.BorderColor = System.Drawing.Color.LightGray
        Me.XrIMEI.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrIMEI.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.F_vcCodDis")})
        Me.XrIMEI.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrIMEI.Name = "XrIMEI"
        Me.XrIMEI.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrIMEI.StylePriority.UseBackColor = False
        Me.XrIMEI.StylePriority.UseBorderColor = False
        Me.XrIMEI.StylePriority.UseBorders = False
        Me.XrIMEI.StylePriority.UseFont = False
        Me.XrIMEI.StylePriority.UsePadding = False
        Me.XrIMEI.StylePriority.UseTextAlignment = False
        Me.XrIMEI.Text = "XrTableCell6"
        Me.XrIMEI.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrIMEI.Weight = 0.056511203346664589R
        '
        'XrModelo
        '
        Me.XrModelo.BackColor = System.Drawing.Color.Transparent
        Me.XrModelo.BorderColor = System.Drawing.Color.LightGray
        Me.XrModelo.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrModelo.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.vcNom")})
        Me.XrModelo.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrModelo.Name = "XrModelo"
        Me.XrModelo.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrModelo.StylePriority.UseBackColor = False
        Me.XrModelo.StylePriority.UseBorderColor = False
        Me.XrModelo.StylePriority.UseBorders = False
        Me.XrModelo.StylePriority.UseFont = False
        Me.XrModelo.StylePriority.UsePadding = False
        Me.XrModelo.StylePriority.UseTextAlignment = False
        Me.XrModelo.Text = "XrModelo"
        Me.XrModelo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrModelo.Weight = 0.06599338059005555R
        '
        'XrEstado
        '
        Me.XrEstado.BackColor = System.Drawing.Color.Transparent
        Me.XrEstado.BorderColor = System.Drawing.Color.LightGray
        Me.XrEstado.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrEstado.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.vcNomEst")})
        Me.XrEstado.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrEstado.Name = "XrEstado"
        Me.XrEstado.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrEstado.StylePriority.UseBackColor = False
        Me.XrEstado.StylePriority.UseBorderColor = False
        Me.XrEstado.StylePriority.UseBorders = False
        Me.XrEstado.StylePriority.UseFont = False
        Me.XrEstado.StylePriority.UsePadding = False
        Me.XrEstado.StylePriority.UseTextAlignment = False
        Me.XrEstado.Text = "XrEstado"
        Me.XrEstado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrEstado.Weight = 0.036098996939940522R
        '
        'XrFechaIni
        '
        Me.XrFechaIni.BackColor = System.Drawing.Color.Transparent
        Me.XrFechaIni.BorderColor = System.Drawing.Color.LightGray
        Me.XrFechaIni.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrFechaIni.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.P_dtFecIni")})
        Me.XrFechaIni.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrFechaIni.Name = "XrFechaIni"
        Me.XrFechaIni.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrFechaIni.StylePriority.UseBackColor = False
        Me.XrFechaIni.StylePriority.UseBorderColor = False
        Me.XrFechaIni.StylePriority.UseBorders = False
        Me.XrFechaIni.StylePriority.UseFont = False
        Me.XrFechaIni.StylePriority.UsePadding = False
        Me.XrFechaIni.StylePriority.UseTextAlignment = False
        Me.XrFechaIni.Text = "XrFechaIni"
        Me.XrFechaIni.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrFechaIni.Weight = 0.037628747337202936R
        '
        'XrFechaFin
        '
        Me.XrFechaFin.BackColor = System.Drawing.Color.Transparent
        Me.XrFechaFin.BorderColor = System.Drawing.Color.LightGray
        Me.XrFechaFin.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrFechaFin.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.dtFecFin")})
        Me.XrFechaFin.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrFechaFin.Name = "XrFechaFin"
        Me.XrFechaFin.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrFechaFin.StylePriority.UseBorderColor = False
        Me.XrFechaFin.StylePriority.UseBorders = False
        Me.XrFechaFin.StylePriority.UseFont = False
        Me.XrFechaFin.StylePriority.UsePadding = False
        Me.XrFechaFin.StylePriority.UseTextAlignment = False
        Me.XrFechaFin.Text = "XrFechaFin"
        Me.XrFechaFin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrFechaFin.Weight = 0.038275643774405108R
        '
        'XrObs
        '
        Me.XrObs.BackColor = System.Drawing.Color.Transparent
        Me.XrObs.BorderColor = System.Drawing.Color.LightGray
        Me.XrObs.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrObs.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.vcObs")})
        Me.XrObs.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrObs.Name = "XrObs"
        Me.XrObs.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrObs.StylePriority.UseBackColor = False
        Me.XrObs.StylePriority.UseBorderColor = False
        Me.XrObs.StylePriority.UseBorders = False
        Me.XrObs.StylePriority.UseFont = False
        Me.XrObs.StylePriority.UsePadding = False
        Me.XrObs.StylePriority.UseTextAlignment = False
        Me.XrObs.Text = "XrObs"
        Me.XrObs.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrObs.Weight = 0.10009632360996625R
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
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
        'XrLabel8
        '
        Me.XrLabel8.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel8.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel8.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 18.3333397!)
        Me.XrLabel8.Name = "XrLabel8"
        Me.XrLabel8.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel8.SizeF = New System.Drawing.SizeF(71.2014999!, 22.375!)
        Me.XrLabel8.StylePriority.UseBackColor = False
        Me.XrLabel8.StylePriority.UseFont = False
        Me.XrLabel8.StylePriority.UseForeColor = False
        Me.XrLabel8.StylePriority.UseTextAlignment = False
        Me.XrLabel8.Text = "Empresa:"
        Me.XrLabel8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(379.166687!, 18.3333397!)
        Me.XrPageInfo2.Name = "XrPageInfo2"
        Me.XrPageInfo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo2.SizeF = New System.Drawing.SizeF(119.7658!, 22.3749905!)
        Me.XrPageInfo2.StylePriority.UseBackColor = False
        Me.XrPageInfo2.StylePriority.UseBorderColor = False
        Me.XrPageInfo2.StylePriority.UseBorders = False
        Me.XrPageInfo2.StylePriority.UseFont = False
        Me.XrPageInfo2.StylePriority.UseTextAlignment = False
        Me.XrPageInfo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 5.20833302!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(815.624878!, 9.0!)
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(737.6297!, 18.3333397!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(82.1619263!, 23.0!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(632.421387!, 18.3333397!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(105.208298!, 23.0!)
        Me.XrLabel6.StylePriority.UseBackColor = False
        Me.XrLabel6.StylePriority.UseFont = False
        Me.XrLabel6.StylePriority.UseForeColor = False
        Me.XrLabel6.StylePriority.UseTextAlignment = False
        Me.XrLabel6.Text = "Fecha:"
        Me.XrLabel6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfEmpresa")})
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(75.3681488!, 18.3333397!)
        Me.LBLEmpresa.Name = "LBLEmpresa"
        Me.LBLEmpresa.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.LBLEmpresa.SizeF = New System.Drawing.SizeF(253.625702!, 22.375!)
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
        Me.XrLabel7.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 43.3333397!)
        Me.XrLabel7.Name = "XrLabel7"
        Me.XrLabel7.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel7.SizeF = New System.Drawing.SizeF(71.2014999!, 24.4583302!)
        Me.XrLabel7.StylePriority.UseBackColor = False
        Me.XrLabel7.StylePriority.UseFont = False
        Me.XrLabel7.StylePriority.UseForeColor = False
        Me.XrLabel7.StylePriority.UseTextAlignment = False
        Me.XrLabel7.Text = "Emisor:"
        Me.XrLabel7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfUsuario")})
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(75.3681488!, 43.3333397!)
        Me.LBLUsuario.LockedInUserDesigner = True
        Me.LBLUsuario.Name = "LBLUsuario"
        Me.LBLUsuario.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.LBLUsuario.SizeF = New System.Drawing.SizeF(253.625702!, 24.4583397!)
        Me.LBLUsuario.StylePriority.UseBackColor = False
        Me.LBLUsuario.StylePriority.UseFont = False
        Me.LBLUsuario.StylePriority.UseForeColor = False
        Me.LBLUsuario.StylePriority.UseTextAlignment = False
        Me.LBLUsuario.Text = "LBLUsuario"
        Me.LBLUsuario.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 51.6666718!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(734.634521!, 18.5416698!)
        Me.Titulo2.StylePriority.UseFont = False
        Me.Titulo2.StylePriority.UseForeColor = False
        Me.Titulo2.StylePriority.UsePadding = False
        Me.Titulo2.Text = "Titulo2"
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(4.16668987!, 128.75!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(815.625!, 29.2500992!)
        Me.XrTable1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow1
        '
        Me.XrTableRow1.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow1.BorderColor = System.Drawing.Color.White
        Me.XrTableRow1.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell2, Me.XrTableCell17, Me.XrTableCell4, Me.XrTableCell5, Me.XrTableCell10, Me.XrTableCell3, Me.XrTableCell6, Me.XrTableCell14})
        Me.XrTableRow1.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow1.ForeColor = System.Drawing.Color.White
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow1.Weight = 0.25842696629213485R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell2.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseBorders = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UseTextAlignment = False
        Me.XrTableCell2.Text = "Empleado"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 0.28610711544469269R
        '
        'XrTableCell17
        '
        Me.XrTableCell17.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell17.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell17.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell17.Name = "XrTableCell17"
        Me.XrTableCell17.StylePriority.UseBackColor = False
        Me.XrTableCell17.StylePriority.UseBorders = False
        Me.XrTableCell17.StylePriority.UseFont = False
        Me.XrTableCell17.StylePriority.UseTextAlignment = False
        Me.XrTableCell17.Text = "Cod. Centro Costo"
        Me.XrTableCell17.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell17.Weight = 0.090136312604630231R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell4.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.StylePriority.UseBackColor = False
        Me.XrTableCell4.StylePriority.UseBorders = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.StylePriority.UseTextAlignment = False
        Me.XrTableCell4.Text = "IMEI"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.10704540337796453R
        '
        'XrTableCell5
        '
        Me.XrTableCell5.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell5.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell5.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell5.Name = "XrTableCell5"
        Me.XrTableCell5.StylePriority.UseBackColor = False
        Me.XrTableCell5.StylePriority.UseBorders = False
        Me.XrTableCell5.StylePriority.UseFont = False
        Me.XrTableCell5.StylePriority.UseTextAlignment = False
        Me.XrTableCell5.Text = "Modelo"
        Me.XrTableCell5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell5.Weight = 0.14633302867587766R
        '
        'XrTableCell10
        '
        Me.XrTableCell10.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell10.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell10.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell10.Name = "XrTableCell10"
        Me.XrTableCell10.StylePriority.UseBackColor = False
        Me.XrTableCell10.StylePriority.UseBorders = False
        Me.XrTableCell10.StylePriority.UseFont = False
        Me.XrTableCell10.StylePriority.UseTextAlignment = False
        Me.XrTableCell10.Text = "Estado"
        Me.XrTableCell10.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell10.Weight = 0.080045559992969015R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell3.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseTextAlignment = False
        Me.XrTableCell3.Text = "Fec. Inicio"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.083437567732047857R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell6.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseBorders = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UseTextAlignment = False
        Me.XrTableCell6.Text = "Fec. Fin"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.084871825425146111R
        '
        'XrTableCell14
        '
        Me.XrTableCell14.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell14.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell14.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell14.Name = "XrTableCell14"
        Me.XrTableCell14.StylePriority.UseBackColor = False
        Me.XrTableCell14.StylePriority.UseBorders = False
        Me.XrTableCell14.StylePriority.UseFont = False
        Me.XrTableCell14.StylePriority.UseTextAlignment = False
        Me.XrTableCell14.Text = "Observación"
        Me.XrTableCell14.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell14.Weight = 0.22195256984392411R
        '
        'Titulo1
        '
        Me.Titulo1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.Titulo1.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo1.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 10.0000095!)
        Me.Titulo1.LockedInUserDesigner = True
        Me.Titulo1.Name = "Titulo1"
        Me.Titulo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo1.SizeF = New System.Drawing.SizeF(661.989197!, 37.9999886!)
        Me.Titulo1.StylePriority.UseFont = False
        Me.Titulo1.StylePriority.UseForeColor = False
        Me.Titulo1.StylePriority.UsePadding = False
        Me.Titulo1.StylePriority.UseTextAlignment = False
        Me.Titulo1.Text = "Titulo1"
        Me.Titulo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(670.833313!, 2.70833993!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.958298!, 41.6666489!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 74.5833435!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(815.624878!, 9.0!)
        '
        'GroupHeader1
        '
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("P_F_vcNumLin", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 0.0!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrLabel1
        '
        Me.XrLabel1.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Linea_Reporte_Historicos.P_F_vcNumLin")})
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 9.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel1.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(4.16666698!, 96.2499924!)
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(815.624878!, 22.375!)
        Me.XrLabel1.StylePriority.UseBackColor = False
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.StylePriority.UseForeColor = False
        Me.XrLabel1.StylePriority.UseTextAlignment = False
        Me.XrLabel1.Text = "LBLEmpresa"
        Me.XrLabel1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_Linea_Reporte_HistoricosTableAdapter
        '
        Me.MOV_s_Linea_Reporte_HistoricosTableAdapter.ClearBeforeFill = True
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
        'cfTitulo2
        '
        Me.cfTitulo2.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo2.Name = "cfTitulo2"
        '
        'cfTitulo1
        '
        Me.cfTitulo1.Expression = "''"
        Me.cfTitulo1.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo1.Name = "cfTitulo1"
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.Titulo1, Me.xrPictureBoxLogo, Me.xrLine1, Me.XrTable1, Me.Titulo2, Me.XrLabel1})
        Me.PageHeader.HeightF = 158.000107!
        Me.PageHeader.Name = "PageHeader"
        '
        'GroupFooter1
        '
        Me.GroupFooter1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupFooter1.HeightF = 2.0!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel8, Me.XrLabel7, Me.LBLEmpresa, Me.XrLabel6, Me.XrPageInfo1, Me.XrLine2, Me.XrPageInfo2, Me.LBLUsuario})
        Me.PageFooter.Name = "PageFooter"
        '
        'XRPT_Linea_Reporte_Historicos
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.GroupHeader1, Me.PageHeader, Me.GroupFooter1, Me.PageFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfEmpresa, Me.cfUsuario, Me.cfTitulo2, Me.cfTitulo1})
        Me.DataAdapter = Me.MOV_s_Linea_Reporte_HistoricosTableAdapter
        Me.DataMember = "MOV_s_Linea_Reporte_Historicos"
        Me.DataSource = Me.Consultas1
        Me.Margins = New System.Drawing.Printing.Margins(11, 15, 0, 0)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell17 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell10 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell14 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Titulo1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrEmpleado As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCentro As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrIMEI As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrModelo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrEstado As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrFechaIni As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrFechaFin As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel7 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents MOV_s_Linea_Reporte_HistoricosTableAdapter As ConsultasTableAdapters.MOV_s_Linea_Reporte_HistoricosTableAdapter
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents XrLinea As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrObs As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
End Class
