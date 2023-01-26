<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Campana_DespachoOperador
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Campana_DespachoOperador))
        Dim XrSummary1 As DevExpress.XtraReports.UI.XRSummary = New DevExpress.XtraReports.UI.XRSummary()
        Dim XrSummary2 As DevExpress.XtraReports.UI.XRSummary = New DevExpress.XtraReports.UI.XRSummary()
        Dim XrSummary3 As DevExpress.XtraReports.UI.XRSummary = New DevExpress.XtraReports.UI.XRSummary()
        Dim XrSummary4 As DevExpress.XtraReports.UI.XRSummary = New DevExpress.XtraReports.UI.XRSummary()
        Dim XrSummary5 As DevExpress.XtraReports.UI.XRSummary = New DevExpress.XtraReports.UI.XRSummary()
        Dim XrSummary6 As DevExpress.XtraReports.UI.XRSummary = New DevExpress.XtraReports.UI.XRSummary()
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrFecha = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrModDisp = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrIngNuevos = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrIngRenov = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotalIng = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrDespNuev = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrDespRenov = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTotDesp = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.Consultas1 = New Consultas()
        Me.MoV_CAM_rpt_DespachoOperadorTableAdapter1 = New ConsultasTableAdapters.MOV_CAM_rpt_DespachoOperadorTableAdapter()
        Me.MoV_CAM_rpt_DespachoOperadorTableAdapter2 = New ConsultasTableAdapters.MOV_CAM_rpt_DespachoOperadorTableAdapter()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTituloTotRev = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTituloDesp = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.Titulo1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTotalesFecha = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSUMIngNuev = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSUMIngRenov = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSUMTotalIng = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSUMDespNuev = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSUMDespRenov = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSUMTotDesp = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrLine3 = New DevExpress.XtraReports.UI.XRLine()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.ReportFooter = New DevExpress.XtraReports.UI.ReportFooterBand()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
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
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(827.9999!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrFecha, Me.XrModDisp, Me.XrIngNuevos, Me.XrIngRenov, Me.XrTotalIng, Me.XrDespNuev, Me.XrDespRenov, Me.XrTotDesp})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrFecha
        '
        Me.XrFecha.BackColor = System.Drawing.Color.Transparent
        Me.XrFecha.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.FechaIngreso")})
        Me.XrFecha.EvenStyleName = "Fila2"
        Me.XrFecha.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrFecha.Name = "XrFecha"
        Me.XrFecha.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrFecha.StyleName = "Fila1"
        Me.XrFecha.StylePriority.UseFont = False
        Me.XrFecha.StylePriority.UsePadding = False
        Me.XrFecha.StylePriority.UseTextAlignment = False
        Me.XrFecha.Text = "XrFecha"
        Me.XrFecha.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrFecha.Weight = 0.07936292119635828R
        '
        'XrModDisp
        '
        Me.XrModDisp.BackColor = System.Drawing.Color.Transparent
        Me.XrModDisp.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.ModeloDispositivo")})
        Me.XrModDisp.EvenStyleName = "Fila2"
        Me.XrModDisp.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrModDisp.Name = "XrModDisp"
        Me.XrModDisp.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrModDisp.StyleName = "Fila1"
        Me.XrModDisp.StylePriority.UseFont = False
        Me.XrModDisp.StylePriority.UsePadding = False
        Me.XrModDisp.StylePriority.UseTextAlignment = False
        Me.XrModDisp.Text = "XrModDisp"
        Me.XrModDisp.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrModDisp.Weight = 0.18829052048218783R
        '
        'XrIngNuevos
        '
        Me.XrIngNuevos.BackColor = System.Drawing.Color.Transparent
        Me.XrIngNuevos.EvenStyleName = "Fila2"
        Me.XrIngNuevos.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrIngNuevos.Name = "XrIngNuevos"
        Me.XrIngNuevos.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrIngNuevos.StyleName = "Fila1"
        Me.XrIngNuevos.StylePriority.UseFont = False
        Me.XrIngNuevos.StylePriority.UsePadding = False
        Me.XrIngNuevos.StylePriority.UseTextAlignment = False
        Me.XrIngNuevos.Text = "XrIngNuevos"
        Me.XrIngNuevos.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrIngNuevos.Weight = 0.0691405881719327R
        '
        'XrIngRenov
        '
        Me.XrIngRenov.BackColor = System.Drawing.Color.Transparent
        Me.XrIngRenov.EvenStyleName = "Fila2"
        Me.XrIngRenov.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrIngRenov.Name = "XrIngRenov"
        Me.XrIngRenov.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrIngRenov.StyleName = "Fila1"
        Me.XrIngRenov.StylePriority.UseFont = False
        Me.XrIngRenov.StylePriority.UsePadding = False
        Me.XrIngRenov.StylePriority.UseTextAlignment = False
        Me.XrIngRenov.Text = "XrIngRenov"
        Me.XrIngRenov.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrIngRenov.Weight = 0.12990008892241861R
        '
        'XrTotalIng
        '
        Me.XrTotalIng.BackColor = System.Drawing.Color.Transparent
        Me.XrTotalIng.EvenStyleName = "Fila2"
        Me.XrTotalIng.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalIng.Name = "XrTotalIng"
        Me.XrTotalIng.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotalIng.StyleName = "Fila1"
        Me.XrTotalIng.StylePriority.UseFont = False
        Me.XrTotalIng.StylePriority.UsePadding = False
        Me.XrTotalIng.StylePriority.UseTextAlignment = False
        Me.XrTotalIng.Text = "XrTotalIng"
        Me.XrTotalIng.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotalIng.Weight = 0.067180479355011036R
        '
        'XrDespNuev
        '
        Me.XrDespNuev.BackColor = System.Drawing.Color.Transparent
        Me.XrDespNuev.EvenStyleName = "Fila2"
        Me.XrDespNuev.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrDespNuev.Name = "XrDespNuev"
        Me.XrDespNuev.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrDespNuev.StyleName = "Fila1"
        Me.XrDespNuev.StylePriority.UseFont = False
        Me.XrDespNuev.StylePriority.UsePadding = False
        Me.XrDespNuev.StylePriority.UseTextAlignment = False
        Me.XrDespNuev.Text = "XrDespNuev"
        Me.XrDespNuev.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrDespNuev.Weight = 0.062813408614273425R
        '
        'XrDespRenov
        '
        Me.XrDespRenov.BackColor = System.Drawing.Color.Transparent
        Me.XrDespRenov.EvenStyleName = "Fila2"
        Me.XrDespRenov.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrDespRenov.Name = "XrDespRenov"
        Me.XrDespRenov.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrDespRenov.StyleName = "Fila1"
        Me.XrDespRenov.StylePriority.UseFont = False
        Me.XrDespRenov.StylePriority.UsePadding = False
        Me.XrDespRenov.StylePriority.UseTextAlignment = False
        Me.XrDespRenov.Text = "XrDespRenov"
        Me.XrDespRenov.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrDespRenov.Weight = 0.14342926174661605R
        '
        'XrTotDesp
        '
        Me.XrTotDesp.BackColor = System.Drawing.Color.Transparent
        Me.XrTotDesp.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotDesp.EvenStyleName = "Fila2"
        Me.XrTotDesp.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotDesp.Name = "XrTotDesp"
        Me.XrTotDesp.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrTotDesp.StyleName = "Fila1"
        Me.XrTotDesp.StylePriority.UseBorders = False
        Me.XrTotDesp.StylePriority.UseFont = False
        Me.XrTotDesp.StylePriority.UsePadding = False
        Me.XrTotDesp.StylePriority.UseTextAlignment = False
        Me.XrTotDesp.Text = "XrTotDesp"
        Me.XrTotDesp.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrTotDesp.Weight = 0.069082318758902625R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 32.0!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.LBLUsuario, Me.XrLine2, Me.LBLEmpresa, Me.XrLabel4, Me.XrLabel5, Me.XrPageInfo1, Me.XrLabel6, Me.XrPageInfo2})
        Me.BottomMargin.HeightF = 96.0!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfUsuario")})
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(71.20148!, 48.60417!)
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
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 11.10417!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(827.9998!, 10.29169!)
        '
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfEmpresa")})
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(71.20145!, 23.60417!)
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
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(639.7176!, 23.60417!)
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
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 23.60417!)
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
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(744.9259!, 23.60417!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(83.07391!, 23.0!)
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
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 48.60417!)
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
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(351.2686!, 24.22918!)
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
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MoV_CAM_rpt_DespachoOperadorTableAdapter1
        '
        Me.MoV_CAM_rpt_DespachoOperadorTableAdapter1.ClearBeforeFill = True
        '
        'MoV_CAM_rpt_DespachoOperadorTableAdapter2
        '
        Me.MoV_CAM_rpt_DespachoOperadorTableAdapter2.ClearBeforeFill = True
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable2, Me.xrLine1, Me.Titulo2, Me.xrPictureBoxLogo, Me.Titulo1})
        Me.PageHeader.HeightF = 113.4689!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 86.30225!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(827.9999!, 23.0!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell6, Me.XrTableCell3, Me.XrTableCell2, Me.XrTableCell7, Me.XrTituloTotRev, Me.XrTableCell5, Me.XrTableCell8, Me.XrTituloDesp})
        Me.XrTableRow2.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow2.ForeColor = System.Drawing.Color.White
        Me.XrTableRow2.Name = "XrTableRow2"
        Me.XrTableRow2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow2.Weight = 0.25842696629213485R
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
        Me.XrTableCell6.Text = "Fecha"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.10865045079080536R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell3.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.ForeColor = System.Drawing.Color.White
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.Text = "Modelo de Dispositivo"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.25777588664262441R
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
        Me.XrTableCell2.Text = "Nuevos"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 0.094655732155432187R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell7.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.StylePriority.UseBackColor = False
        Me.XrTableCell7.StylePriority.UseBorders = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UseTextAlignment = False
        Me.XrTableCell7.Text = "Ingresos Renovación"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.17783748859105503R
        '
        'XrTituloTotRev
        '
        Me.XrTituloTotRev.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTituloTotRev.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTituloTotRev.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTituloTotRev.ForeColor = System.Drawing.Color.White
        Me.XrTituloTotRev.Name = "XrTituloTotRev"
        Me.XrTituloTotRev.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTituloTotRev.StylePriority.UseBackColor = False
        Me.XrTituloTotRev.StylePriority.UseBorders = False
        Me.XrTituloTotRev.StylePriority.UseFont = False
        Me.XrTituloTotRev.StylePriority.UseForeColor = False
        Me.XrTituloTotRev.StylePriority.UsePadding = False
        Me.XrTituloTotRev.Text = "Total"
        Me.XrTituloTotRev.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTituloTotRev.Weight = 0.091972197755998408R
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
        Me.XrTableCell5.Text = "Nuevos"
        Me.XrTableCell5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell5.Weight = 0.085993579947629892R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell8.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseBorders = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UseTextAlignment = False
        Me.XrTableCell8.Text = "Despachos Renovación"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell8.Weight = 0.19635936793131858R
        '
        'XrTituloDesp
        '
        Me.XrTituloDesp.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTituloDesp.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTituloDesp.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTituloDesp.ForeColor = System.Drawing.Color.White
        Me.XrTituloDesp.Name = "XrTituloDesp"
        Me.XrTituloDesp.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTituloDesp.StylePriority.UseBackColor = False
        Me.XrTituloDesp.StylePriority.UseBorders = False
        Me.XrTituloDesp.StylePriority.UseFont = False
        Me.XrTituloDesp.StylePriority.UseForeColor = False
        Me.XrTituloDesp.StylePriority.UsePadding = False
        Me.XrTituloDesp.StylePriority.UseTextAlignment = False
        Me.XrTituloDesp.Text = "Total"
        Me.XrTituloDesp.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTituloDesp.Weight = 0.094575991358385278R
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 72.09393!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(828.0!, 9.0!)
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 50.42725!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(735.1667!, 18.54167!)
        Me.Titulo2.StylePriority.UseFont = False
        Me.Titulo2.StylePriority.UseForeColor = False
        Me.Titulo2.StylePriority.UsePadding = False
        Me.Titulo2.Text = "Titulo2"
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(679.0417!, 4.166667!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.9583!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'Titulo1
        '
        Me.Titulo1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.Titulo1.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 7.833322!)
        Me.Titulo1.LockedInUserDesigner = True
        Me.Titulo1.Name = "Titulo1"
        Me.Titulo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo1.SizeF = New System.Drawing.SizeF(660.9476!, 37.99999!)
        Me.Titulo1.StylePriority.UseFont = False
        Me.Titulo1.StylePriority.UseForeColor = False
        Me.Titulo1.StylePriority.UsePadding = False
        Me.Titulo1.StylePriority.UseTextAlignment = False
        Me.Titulo1.Text = "Titulo1"
        Me.Titulo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(81.20676!, 10.08333!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(746.793!, 25.0!)
        '
        'XrTableRow1
        '
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTotalesFecha, Me.XrSUMIngNuev, Me.XrSUMIngRenov, Me.XrSUMTotalIng, Me.XrSUMDespNuev, Me.XrSUMDespRenov, Me.XrSUMTotDesp})
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Weight = 1.0R
        '
        'XrTotalesFecha
        '
        Me.XrTotalesFecha.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrTotalesFecha.Name = "XrTotalesFecha"
        Me.XrTotalesFecha.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTotalesFecha.StylePriority.UseFont = False
        Me.XrTotalesFecha.StylePriority.UsePadding = False
        Me.XrTotalesFecha.StylePriority.UseTextAlignment = False
        Me.XrTotalesFecha.Text = "Totales por Fecha"
        Me.XrTotalesFecha.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTotalesFecha.Weight = 0.77396972176846357R
        '
        'XrSUMIngNuev
        '
        Me.XrSUMIngNuev.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.IngresosNuevos")})
        Me.XrSUMIngNuev.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSUMIngNuev.Name = "XrSUMIngNuev"
        Me.XrSUMIngNuev.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSUMIngNuev.StylePriority.UseFont = False
        Me.XrSUMIngNuev.StylePriority.UsePadding = False
        Me.XrSUMIngNuev.StylePriority.UseTextAlignment = False
        XrSummary1.FormatString = "{0:#,#}"
        XrSummary1.Running = DevExpress.XtraReports.UI.SummaryRunning.Report
        Me.XrSUMIngNuev.Summary = XrSummary1
        Me.XrSUMIngNuev.Text = "XrSUMIngNuev"
        Me.XrSUMIngNuev.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSUMIngNuev.Weight = 0.28420333523300356R
        '
        'XrSUMIngRenov
        '
        Me.XrSUMIngRenov.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.IngresosRenovacion")})
        Me.XrSUMIngRenov.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSUMIngRenov.Name = "XrSUMIngRenov"
        Me.XrSUMIngRenov.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSUMIngRenov.StylePriority.UseFont = False
        Me.XrSUMIngRenov.StylePriority.UsePadding = False
        Me.XrSUMIngRenov.StylePriority.UseTextAlignment = False
        XrSummary2.FormatString = "{0:#,#}"
        XrSummary2.Running = DevExpress.XtraReports.UI.SummaryRunning.Report
        Me.XrSUMIngRenov.Summary = XrSummary2
        Me.XrSUMIngRenov.Text = "XrSUMIngRenov"
        Me.XrSUMIngRenov.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSUMIngRenov.Weight = 0.53395553083959191R
        '
        'XrSUMTotalIng
        '
        Me.XrSUMTotalIng.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.TotalIngresos")})
        Me.XrSUMTotalIng.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSUMTotalIng.Name = "XrSUMTotalIng"
        Me.XrSUMTotalIng.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSUMTotalIng.StylePriority.UseFont = False
        Me.XrSUMTotalIng.StylePriority.UsePadding = False
        Me.XrSUMTotalIng.StylePriority.UseTextAlignment = False
        XrSummary3.FormatString = "{0:#,#}"
        XrSummary3.Running = DevExpress.XtraReports.UI.SummaryRunning.Report
        Me.XrSUMTotalIng.Summary = XrSummary3
        Me.XrSUMTotalIng.Text = "XrSUMTotalIng"
        Me.XrSUMTotalIng.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSUMTotalIng.Weight = 0.27614574899000505R
        '
        'XrSUMDespNuev
        '
        Me.XrSUMDespNuev.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.DespachosNuevos")})
        Me.XrSUMDespNuev.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSUMDespNuev.Name = "XrSUMDespNuev"
        Me.XrSUMDespNuev.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSUMDespNuev.StylePriority.UseFont = False
        Me.XrSUMDespNuev.StylePriority.UsePadding = False
        Me.XrSUMDespNuev.StylePriority.UseTextAlignment = False
        XrSummary4.FormatString = "{0:#,#}"
        XrSummary4.Running = DevExpress.XtraReports.UI.SummaryRunning.Report
        Me.XrSUMDespNuev.Summary = XrSummary4
        Me.XrSUMDespNuev.Text = "XrSUMDespNuev"
        Me.XrSUMDespNuev.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSUMDespNuev.Weight = 0.25819509132351981R
        '
        'XrSUMDespRenov
        '
        Me.XrSUMDespRenov.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.DespachosRenovacion")})
        Me.XrSUMDespRenov.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSUMDespRenov.Name = "XrSUMDespRenov"
        Me.XrSUMDespRenov.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSUMDespRenov.StylePriority.UseFont = False
        Me.XrSUMDespRenov.StylePriority.UsePadding = False
        Me.XrSUMDespRenov.StylePriority.UseTextAlignment = False
        XrSummary5.FormatString = "{0:#,#}"
        XrSummary5.Running = DevExpress.XtraReports.UI.SummaryRunning.Report
        Me.XrSUMDespRenov.Summary = XrSummary5
        Me.XrSUMDespRenov.Text = "XrSUMDespRenov"
        Me.XrSUMDespRenov.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSUMDespRenov.Weight = 0.58956712855106275R
        '
        'XrSUMTotDesp
        '
        Me.XrSUMTotDesp.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_CAM_rpt_DespachoOperador.TotalDespachos")})
        Me.XrSUMTotDesp.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSUMTotDesp.Name = "XrSUMTotDesp"
        Me.XrSUMTotDesp.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrSUMTotDesp.StylePriority.UseFont = False
        Me.XrSUMTotDesp.StylePriority.UsePadding = False
        Me.XrSUMTotDesp.StylePriority.UseTextAlignment = False
        XrSummary6.FormatString = "{0:#,#}"
        XrSummary6.Running = DevExpress.XtraReports.UI.SummaryRunning.Report
        Me.XrSUMTotDesp.Summary = XrSummary6
        Me.XrSUMTotDesp.Text = "XrSUMTotDesp"
        Me.XrSUMTotDesp.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrSUMTotDesp.Weight = 0.28396344329435341R
        '
        'XrLine3
        '
        Me.XrLine3.LocationFloat = New DevExpress.Utils.PointFloat(81.20676!, 0.0!)
        Me.XrLine3.Name = "XrLine3"
        Me.XrLine3.SizeF = New System.Drawing.SizeF(746.793!, 10.08333!)
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
        'Fila1
        '
        Me.Fila1.BackColor = System.Drawing.Color.White
        Me.Fila1.Name = "Fila1"
        Me.Fila1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'Fila2
        '
        Me.Fila2.BackColor = System.Drawing.Color.FromArgb(CType(CType(196, Byte), Integer), CType(CType(220, Byte), Integer), CType(CType(255, Byte), Integer))
        Me.Fila2.Name = "Fila2"
        Me.Fila2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'ReportFooter
        '
        Me.ReportFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLine3, Me.XrTable1})
        Me.ReportFooter.HeightF = 49.66666!
        Me.ReportFooter.Name = "ReportFooter"
        '
        'XRPT_Campana_DespachoOperador
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.ReportFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MoV_CAM_rpt_DespachoOperadorTableAdapter2
        Me.DataMember = "MOV_CAM_rpt_DespachoOperador"
        Me.DataSource = Me.Consultas1
        Me.Margins = New System.Drawing.Printing.Margins(10, 9, 32, 96)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1, Me.Fila2})
        Me.Version = "12.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents MoV_CAM_rpt_DespachoOperadorTableAdapter1 As ConsultasTableAdapters.MOV_CAM_rpt_DespachoOperadorTableAdapter
    Friend WithEvents MoV_CAM_rpt_DespachoOperadorTableAdapter2 As ConsultasTableAdapters.MOV_CAM_rpt_DespachoOperadorTableAdapter
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTituloTotRev As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTituloDesp As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents Titulo1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrIngRenov As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrDespRenov As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotDesp As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrFecha As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrModDisp As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrIngNuevos As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalIng As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrDespNuev As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTotalesFecha As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSUMIngNuev As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSUMIngRenov As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSUMTotalIng As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSUMDespNuev As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSUMDespRenov As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSUMTotDesp As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents XrLine3 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents ReportFooter As DevExpress.XtraReports.UI.ReportFooterBand
End Class
