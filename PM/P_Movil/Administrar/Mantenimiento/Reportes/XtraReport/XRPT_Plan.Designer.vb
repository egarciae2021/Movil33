<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Plan
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Plan))
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrFilaDetalle = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrPlan = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrOperador = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTipLinea = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrMinutos = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrMonto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.SupplierTitle = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.GroupHeader = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.topMarginBand1 = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.LBLdispositivo = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTdisposivito = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMonto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.ProductHeader = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.SupplierInfo = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.OddStyle = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.ProductData = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.EvenStyle = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.LBLmodelogrupo = New DevExpress.XtraReports.UI.XRLabel()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.Procedimiento1 = New Procedimiento()
        Me.MOV_s_GEN_ListaPlanes_FiltrosTableAdapter = New ProcedimientoTableAdapters.MOV_s_GEN_ListaPlanes_FiltrosTableAdapter()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'XrTable1
        '
        Me.XrTable1.BackColor = System.Drawing.Color.SlateBlue
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(1.04166698!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrFilaDetalle})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(820.666809!, 23.8541698!)
        Me.XrTable1.StyleName = "Fila2"
        Me.XrTable1.StylePriority.UseBackColor = False
        '
        'XrFilaDetalle
        '
        Me.XrFilaDetalle.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrPlan, Me.XrOperador, Me.XrTipLinea, Me.XrMinutos, Me.XrMonto})
        Me.XrFilaDetalle.Name = "XrFilaDetalle"
        Me.XrFilaDetalle.Weight = 1.0R
        '
        'XrPlan
        '
        Me.XrPlan.BackColor = System.Drawing.Color.Transparent
        Me.XrPlan.BorderColor = System.Drawing.Color.LightGray
        Me.XrPlan.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrPlan.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaPlanes_Filtros.PLAN")})
        Me.XrPlan.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrPlan.ForeColor = System.Drawing.Color.Black
        Me.XrPlan.Name = "XrPlan"
        Me.XrPlan.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrPlan.StylePriority.UseBorderColor = False
        Me.XrPlan.StylePriority.UseBorders = False
        Me.XrPlan.StylePriority.UseFont = False
        Me.XrPlan.StylePriority.UseForeColor = False
        Me.XrPlan.StylePriority.UsePadding = False
        Me.XrPlan.StylePriority.UseTextAlignment = False
        Me.XrPlan.Text = "XrPlan"
        Me.XrPlan.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrPlan.Weight = 0.94348202119115399R
        '
        'XrOperador
        '
        Me.XrOperador.BackColor = System.Drawing.Color.Transparent
        Me.XrOperador.BorderColor = System.Drawing.Color.LightGray
        Me.XrOperador.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrOperador.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaPlanes_Filtros.OPERADOR")})
        Me.XrOperador.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrOperador.Name = "XrOperador"
        Me.XrOperador.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrOperador.StylePriority.UseBorderColor = False
        Me.XrOperador.StylePriority.UseBorders = False
        Me.XrOperador.StylePriority.UseFont = False
        Me.XrOperador.StylePriority.UsePadding = False
        Me.XrOperador.StylePriority.UseTextAlignment = False
        Me.XrOperador.Text = "XrOperador"
        Me.XrOperador.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrOperador.Weight = 1.0267774294986536R
        '
        'XrTipLinea
        '
        Me.XrTipLinea.BackColor = System.Drawing.Color.Transparent
        Me.XrTipLinea.BorderColor = System.Drawing.Color.LightGray
        Me.XrTipLinea.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTipLinea.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaPlanes_Filtros.TIPO DE LINEA")})
        Me.XrTipLinea.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTipLinea.Name = "XrTipLinea"
        Me.XrTipLinea.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTipLinea.StylePriority.UseBorderColor = False
        Me.XrTipLinea.StylePriority.UseBorders = False
        Me.XrTipLinea.StylePriority.UseFont = False
        Me.XrTipLinea.StylePriority.UsePadding = False
        Me.XrTipLinea.StylePriority.UseTextAlignment = False
        Me.XrTipLinea.Text = "XrTipLinea"
        Me.XrTipLinea.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTipLinea.Weight = 0.3202861158121072R
        '
        'XrMinutos
        '
        Me.XrMinutos.BackColor = System.Drawing.Color.Transparent
        Me.XrMinutos.BorderColor = System.Drawing.Color.LightGray
        Me.XrMinutos.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrMinutos.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaPlanes_Filtros.MINUTOS")})
        Me.XrMinutos.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrMinutos.Name = "XrMinutos"
        Me.XrMinutos.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrMinutos.StylePriority.UseBorderColor = False
        Me.XrMinutos.StylePriority.UseBorders = False
        Me.XrMinutos.StylePriority.UseFont = False
        Me.XrMinutos.StylePriority.UsePadding = False
        Me.XrMinutos.StylePriority.UseTextAlignment = False
        Me.XrMinutos.Text = "XrMinutos"
        Me.XrMinutos.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrMinutos.Weight = 0.48907099143431648R
        '
        'XrMonto
        '
        Me.XrMonto.BackColor = System.Drawing.Color.Transparent
        Me.XrMonto.BorderColor = System.Drawing.Color.LightGray
        Me.XrMonto.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrMonto.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrMonto.Name = "XrMonto"
        Me.XrMonto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrMonto.StylePriority.UseBorderColor = False
        Me.XrMonto.StylePriority.UseBorders = False
        Me.XrMonto.StylePriority.UseFont = False
        Me.XrMonto.StylePriority.UsePadding = False
        Me.XrMonto.Text = "XrMonto"
        Me.XrMonto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrMonto.Weight = 0.61193820095120222R
        '
        'BottomMargin
        '
        Me.BottomMargin.HeightF = 0.0!
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
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(73.2083282!, 47.465641!)
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
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfEmpresa")})
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(73.2083969!, 23.7156506!)
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
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.04166698!, 23.7156506!)
        Me.XrLabel5.Name = "XrLabel5"
        Me.XrLabel5.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel5.SizeF = New System.Drawing.SizeF(72.1666489!, 22.3750095!)
        Me.XrLabel5.StylePriority.UseBackColor = False
        Me.XrLabel5.StylePriority.UseFont = False
        Me.XrLabel5.StylePriority.UseForeColor = False
        Me.XrLabel5.StylePriority.UseTextAlignment = False
        Me.XrLabel5.Text = "Empresa:"
        Me.XrLabel5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(1.04166698!, 47.465641!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(72.1666489!, 24.4583302!)
        Me.XrLabel6.StylePriority.UseBackColor = False
        Me.XrLabel6.StylePriority.UseFont = False
        Me.XrLabel6.StylePriority.UseForeColor = False
        Me.XrLabel6.StylePriority.UseTextAlignment = False
        Me.XrLabel6.Text = "Emisor:"
        Me.XrLabel6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel4.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(633.385315!, 23.7156506!)
        Me.XrLabel4.Name = "XrLabel4"
        Me.XrLabel4.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel4.SizeF = New System.Drawing.SizeF(105.208298!, 23.0!)
        Me.XrLabel4.StylePriority.UseBackColor = False
        Me.XrLabel4.StylePriority.UseFont = False
        Me.XrLabel4.StylePriority.UseForeColor = False
        Me.XrLabel4.StylePriority.UseTextAlignment = False
        Me.XrLabel4.Text = "Fecha:"
        Me.XrLabel4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(738.593628!, 23.7156506!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(83.1147537!, 23.0!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(1.04166698!, 7.29166698!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(820.666809!, 9.0!)
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(354.821686!, 23.7156506!)
        Me.XrPageInfo2.Name = "XrPageInfo2"
        Me.XrPageInfo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo2.SizeF = New System.Drawing.SizeF(136.416107!, 22.375!)
        Me.XrPageInfo2.StylePriority.UseBackColor = False
        Me.XrPageInfo2.StylePriority.UseBorderColor = False
        Me.XrPageInfo2.StylePriority.UseBorders = False
        Me.XrPageInfo2.StylePriority.UseFont = False
        Me.XrPageInfo2.StylePriority.UseTextAlignment = False
        Me.XrPageInfo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'SupplierTitle
        '
        Me.SupplierTitle.BackColor = System.Drawing.Color.Transparent
        Me.SupplierTitle.BorderColor = System.Drawing.Color.FromArgb(CType(CType(0, Byte), Integer), CType(CType(0, Byte), Integer), CType(CType(0, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.SupplierTitle.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.SupplierTitle.BorderWidth = 1
        Me.SupplierTitle.Font = New System.Drawing.Font("Tahoma", 12.0!, System.Drawing.FontStyle.Bold)
        Me.SupplierTitle.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.SupplierTitle.Name = "SupplierTitle"
        '
        'GroupHeader
        '
        Me.GroupHeader.BackColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(243, Byte), Integer), CType(CType(243, Byte), Integer))
        Me.GroupHeader.BorderColor = System.Drawing.Color.White
        Me.GroupHeader.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.GroupHeader.BorderWidth = 1
        Me.GroupHeader.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.GroupHeader.ForeColor = System.Drawing.Color.FromArgb(CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer), CType(CType(139, Byte), Integer))
        Me.GroupHeader.Name = "GroupHeader"
        '
        'topMarginBand1
        '
        Me.topMarginBand1.HeightF = 0.0!
        Me.topMarginBand1.Name = "topMarginBand1"
        '
        'LBLdispositivo
        '
        Me.LBLdispositivo.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLdispositivo.BorderColor = System.Drawing.Color.White
        Me.LBLdispositivo.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLdispositivo.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLdispositivo.ForeColor = System.Drawing.Color.White
        Me.LBLdispositivo.LocationFloat = New DevExpress.Utils.PointFloat(1.04166698!, 82.2916565!)
        Me.LBLdispositivo.Name = "LBLdispositivo"
        Me.LBLdispositivo.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.LBLdispositivo.SizeF = New System.Drawing.SizeF(113.833298!, 25.0000095!)
        Me.LBLdispositivo.StylePriority.UseBackColor = False
        Me.LBLdispositivo.StylePriority.UseBorders = False
        Me.LBLdispositivo.StylePriority.UseFont = False
        Me.LBLdispositivo.StylePriority.UseForeColor = False
        Me.LBLdispositivo.StylePriority.UsePadding = False
        Me.LBLdispositivo.StylePriority.UseTextAlignment = False
        Me.LBLdispositivo.Text = "Modelo Dispositivo:"
        Me.LBLdispositivo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel2
        '
        Me.XrLabel2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(1.04170597!, 3.66665506!)
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(659.905884!, 37.9999886!)
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UseForeColor = False
        Me.XrLabel2.StylePriority.UsePadding = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "XrLabel2"
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXTdisposivito
        '
        Me.TXTdisposivito.BackColor = System.Drawing.Color.Transparent
        Me.TXTdisposivito.BorderColor = System.Drawing.Color.White
        Me.TXTdisposivito.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTdisposivito.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTdisposivito.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTdisposivito.LocationFloat = New DevExpress.Utils.PointFloat(114.875!, 82.2916565!)
        Me.TXTdisposivito.Name = "TXTdisposivito"
        Me.TXTdisposivito.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTdisposivito.SizeF = New System.Drawing.SizeF(183.166702!, 25.0000095!)
        Me.TXTdisposivito.StylePriority.UseBackColor = False
        Me.TXTdisposivito.StylePriority.UseFont = False
        Me.TXTdisposivito.Text = "(TODOS)"
        Me.TXTdisposivito.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(1.04170597!, 67.041687!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(820.66687!, 9.0!)
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(672.75!, 3.66665506!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.958298!, 41.6666489!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(1.04170597!, 149.041702!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(820.666687!, 22.0000095!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell3, Me.XrTableCell4, Me.XrTableCell6, Me.XrTableCell7, Me.xrTituloMonto})
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
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.ForeColor = System.Drawing.Color.White
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.Text = "Plan"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.30725047447161541R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell4.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell4.ForeColor = System.Drawing.Color.White
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell4.StylePriority.UseBackColor = False
        Me.XrTableCell4.StylePriority.UseBorders = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.StylePriority.UseForeColor = False
        Me.XrTableCell4.StylePriority.UsePadding = False
        Me.XrTableCell4.Text = "Operador"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.33285760248856855R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell6.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.ForeColor = System.Drawing.Color.White
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseBorders = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UseForeColor = False
        Me.XrTableCell6.StylePriority.UsePadding = False
        Me.XrTableCell6.Text = "Tipo Línea"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.10337615268611017R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell7.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell7.ForeColor = System.Drawing.Color.White
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell7.StylePriority.UseBackColor = False
        Me.XrTableCell7.StylePriority.UseBorders = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UseForeColor = False
        Me.XrTableCell7.StylePriority.UsePadding = False
        Me.XrTableCell7.Text = "Minutos Adicionales"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.15874669989659018R
        '
        'xrTituloMonto
        '
        Me.xrTituloMonto.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
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
        Me.xrTituloMonto.Weight = 0.1986279499096707R
        '
        'ProductHeader
        '
        Me.ProductHeader.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.ProductHeader.BorderColor = System.Drawing.Color.White
        Me.ProductHeader.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.ProductHeader.BorderWidth = 1
        Me.ProductHeader.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.ProductHeader.ForeColor = System.Drawing.Color.White
        Me.ProductHeader.Name = "ProductHeader"
        '
        'SupplierInfo
        '
        Me.SupplierInfo.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.SupplierInfo.BorderColor = System.Drawing.Color.White
        Me.SupplierInfo.BorderWidth = 1
        Me.SupplierInfo.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.SupplierInfo.ForeColor = System.Drawing.Color.White
        Me.SupplierInfo.Name = "SupplierInfo"
        Me.SupplierInfo.Padding = New DevExpress.XtraPrinting.PaddingInfo(7, 0, 0, 0, 100.0!)
        '
        'OddStyle
        '
        Me.OddStyle.BackColor = System.Drawing.Color.Transparent
        Me.OddStyle.BorderColor = System.Drawing.Color.FromArgb(CType(CType(232, Byte), Integer), CType(CType(205, Byte), Integer), CType(CType(162, Byte), Integer))
        Me.OddStyle.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.OddStyle.BorderWidth = 1
        Me.OddStyle.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.OddStyle.ForeColor = System.Drawing.SystemColors.ControlText
        Me.OddStyle.Name = "OddStyle"
        '
        'ProductData
        '
        Me.ProductData.BackColor = System.Drawing.Color.FromArgb(CType(CType(196, Byte), Integer), CType(CType(220, Byte), Integer), CType(CType(255, Byte), Integer))
        Me.ProductData.BorderColor = System.Drawing.Color.White
        Me.ProductData.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.ProductData.BorderWidth = 1
        Me.ProductData.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.ProductData.ForeColor = System.Drawing.Color.Black
        Me.ProductData.Name = "ProductData"
        '
        'Detail
        '
        Me.Detail.BackColor = System.Drawing.Color.Transparent
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.Detail.Font = New System.Drawing.Font("Verdana", 9.75!)
        Me.Detail.HeightF = 23.8541698!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'EvenStyle
        '
        Me.EvenStyle.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(237, Byte), Integer), CType(CType(196, Byte), Integer))
        Me.EvenStyle.BorderColor = System.Drawing.Color.FromArgb(CType(CType(232, Byte), Integer), CType(CType(205, Byte), Integer), CType(CType(162, Byte), Integer))
        Me.EvenStyle.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.EvenStyle.BorderWidth = 1
        Me.EvenStyle.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.EvenStyle.ForeColor = System.Drawing.SystemColors.ControlText
        Me.EvenStyle.Name = "EvenStyle"
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
        'cfTitulo1
        '
        Me.cfTitulo1.Expression = "''"
        Me.cfTitulo1.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo1.Name = "cfTitulo1"
        '
        'GroupHeader1
        '
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("vcNom", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 0.0!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'LBLmodelogrupo
        '
        Me.LBLmodelogrupo.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.LBLmodelogrupo.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLmodelogrupo.ForeColor = System.Drawing.Color.Navy
        Me.LBLmodelogrupo.LocationFloat = New DevExpress.Utils.PointFloat(2.08329391!, 116.250099!)
        Me.LBLmodelogrupo.Name = "LBLmodelogrupo"
        Me.LBLmodelogrupo.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.LBLmodelogrupo.SizeF = New System.Drawing.SizeF(820.666687!, 22.375!)
        Me.LBLmodelogrupo.StylePriority.UseBackColor = False
        Me.LBLmodelogrupo.StylePriority.UseFont = False
        Me.LBLmodelogrupo.StylePriority.UseForeColor = False
        Me.LBLmodelogrupo.StylePriority.UseTextAlignment = False
        Me.LBLmodelogrupo.Text = "LBLmodelogrupo"
        Me.LBLmodelogrupo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel2, Me.XrTable2, Me.LBLdispositivo, Me.TXTdisposivito, Me.xrLine1, Me.xrPictureBoxLogo, Me.Titulo2, Me.LBLmodelogrupo})
        Me.PageHeader.HeightF = 171.041794!
        Me.PageHeader.Name = "PageHeader"
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(1.04170597!, 43.2916603!)
        Me.Titulo2.LockedInUserDesigner = True
        Me.Titulo2.Name = "Titulo2"
        Me.Titulo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.Titulo2.SizeF = New System.Drawing.SizeF(659.905884!, 18.5416698!)
        Me.Titulo2.StylePriority.UseFont = False
        Me.Titulo2.StylePriority.UseForeColor = False
        Me.Titulo2.StylePriority.UsePadding = False
        Me.Titulo2.Text = "Titulo2"
        '
        'Procedimiento1
        '
        Me.Procedimiento1.DataSetName = "Procedimiento"
        Me.Procedimiento1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_GEN_ListaPlanes_FiltrosTableAdapter
        '
        Me.MOV_s_GEN_ListaPlanes_FiltrosTableAdapter.ClearBeforeFill = True
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
        'GroupFooter1
        '
        Me.GroupFooter1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupFooter1.HeightF = 2.0!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'XrPageBreak1
        '
        Me.XrPageBreak1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrPageBreak1.Name = "XrPageBreak1"
        '
        'PageFooter
        '
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLine2, Me.XrPageInfo2, Me.XrPageInfo1, Me.XrLabel4, Me.XrLabel6, Me.XrLabel5, Me.LBLEmpresa, Me.LBLUsuario})
        Me.PageFooter.Name = "PageFooter"
        '
        'XRPT_Plan
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.BottomMargin, Me.topMarginBand1, Me.GroupHeader1, Me.PageHeader, Me.GroupFooter1, Me.PageFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MOV_s_GEN_ListaPlanes_FiltrosTableAdapter
        Me.DataMember = "MOV_s_GEN_ListaPlanes_Filtros"
        Me.DataSource = Me.Procedimiento1
        Me.DisplayName = "Suppliers"
        Me.Margins = New System.Drawing.Printing.Margins(10, 15, 0, 0)
        Me.PaperKind = System.Drawing.Printing.PaperKind.Custom
        Me.ReportPrintOptions.DetailCountAtDesignTime = 1
        Me.RequestParameters = False
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.ScriptsSource = "" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & "Private Sub Tabla_GetValue(ByVal sender As Object, ByVal e As DevExpress.XtraRe" & _
    "ports.UI.GetValueEventArgs)" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & "End Sub" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10)
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.ProductData, Me.OddStyle, Me.GroupHeader, Me.ProductHeader, Me.SupplierTitle, Me.EvenStyle, Me.SupplierInfo, Me.Fila1, Me.Fila2})
        Me.StyleSheetPath = "..\..\..\Data\\StyleSheetLavender.repss"
        Me.Version = "12.2"
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents SupplierTitle As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents GroupHeader As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents topMarginBand1 As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents ProductHeader As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents SupplierInfo As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents OddStyle As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents ProductData As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents EvenStyle As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents LBLdispositivo As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTdisposivito As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMonto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrFilaDetalle As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrPlan As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrOperador As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTipLinea As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrMinutos As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrMonto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents LBLmodelogrupo As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents Procedimiento1 As Procedimiento
    Friend WithEvents MOV_s_GEN_ListaPlanes_FiltrosTableAdapter As ProcedimientoTableAdapters.MOV_s_GEN_ListaPlanes_FiltrosTableAdapter
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
End Class
