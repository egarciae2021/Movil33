<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_LineasContrato
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_LineasContrato))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow4 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell12 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell11 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell10 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell13 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrMesesContrato = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrMesesPendientes = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.lblTotalRegistros = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.TXTtipolinea = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLtipolinea = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.lblCampoDinamico = New DevExpress.XtraReports.UI.XRLabel()
        Me.txtValorDinamico = New DevExpress.XtraReports.UI.XRLabel()
        Me.txtLinea = New DevExpress.XtraReports.UI.XRLabel()
        Me.lblLinea = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTorganizacion = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLorganizacion = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLempleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTempleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTplan = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLplan = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell16 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell17 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Procedimiento1 = New Procedimiento()
        Me.MOV_s_GEN_ListaLineas_FiltrosTableAdapter = New ProcedimientoTableAdapters.MOV_s_GEN_ListaLineas_FiltrosTableAdapter()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.xrMesesPendientesEq = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell9 = New DevExpress.XtraReports.UI.XRTableCell()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.Detail.HeightF = 23.85417!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTable1
        '
        Me.XrTable1.BackColor = System.Drawing.Color.White
        Me.XrTable1.BorderColor = System.Drawing.Color.White
        Me.XrTable1.EvenStyleName = "Fila1"
        Me.XrTable1.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(4.166706!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow4})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(827.7432!, 23.85417!)
        Me.XrTable1.StyleName = "Fila2"
        Me.XrTable1.StylePriority.UseFont = False
        '
        'XrTableRow4
        '
        Me.XrTableRow4.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell8, Me.XrTableCell12, Me.XrTableCell11, Me.XrTableCell10, Me.XrTableCell13, Me.XrTableCell17, Me.xrMesesContrato, Me.xrMesesPendientes, Me.xrMesesPendientesEq})
        Me.XrTableRow4.Name = "XrTableRow4"
        Me.XrTableRow4.Weight = 1.0R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.XrTableCell8.BorderColor = System.Drawing.Color.White
        Me.XrTableCell8.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell8.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.Linea")})
        Me.XrTableCell8.EvenStyleName = "Fila1"
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell8.StyleName = "Fila2"
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UsePadding = False
        Me.XrTableCell8.StylePriority.UseTextAlignment = False
        Me.XrTableCell8.Text = "XrTableCell8"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell8.Weight = 0.29025598252301976R
        '
        'XrTableCell12
        '
        Me.XrTableCell12.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.XrTableCell12.BorderColor = System.Drawing.Color.White
        Me.XrTableCell12.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.CodEmpleado")})
        Me.XrTableCell12.EvenStyleName = "Fila1"
        Me.XrTableCell12.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell12.ForeColor = System.Drawing.Color.Black
        Me.XrTableCell12.Name = "XrTableCell12"
        Me.XrTableCell12.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell12.StyleName = "Fila2"
        Me.XrTableCell12.StylePriority.UseFont = False
        Me.XrTableCell12.StylePriority.UseForeColor = False
        Me.XrTableCell12.StylePriority.UsePadding = False
        Me.XrTableCell12.StylePriority.UseTextAlignment = False
        Me.XrTableCell12.Text = "XrTableCell12"
        Me.XrTableCell12.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell12.Weight = 0.33453587271937579R
        '
        'XrTableCell11
        '
        Me.XrTableCell11.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.XrTableCell11.BorderColor = System.Drawing.Color.White
        Me.XrTableCell11.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell11.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.Empleado")})
        Me.XrTableCell11.EvenStyleName = "Fila1"
        Me.XrTableCell11.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell11.Name = "XrTableCell11"
        Me.XrTableCell11.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell11.StyleName = "Fila2"
        Me.XrTableCell11.StylePriority.UseFont = False
        Me.XrTableCell11.StylePriority.UsePadding = False
        Me.XrTableCell11.StylePriority.UseTextAlignment = False
        Me.XrTableCell11.Text = "XrTableCell11"
        Me.XrTableCell11.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell11.Weight = 0.71803512718629481R
        '
        'XrTableCell10
        '
        Me.XrTableCell10.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.XrTableCell10.BorderColor = System.Drawing.Color.White
        Me.XrTableCell10.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell10.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.NombrePlan")})
        Me.XrTableCell10.EvenStyleName = "Fila1"
        Me.XrTableCell10.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell10.Name = "XrTableCell10"
        Me.XrTableCell10.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell10.StyleName = "Fila2"
        Me.XrTableCell10.StylePriority.UseFont = False
        Me.XrTableCell10.StylePriority.UsePadding = False
        Me.XrTableCell10.StylePriority.UseTextAlignment = False
        Me.XrTableCell10.Text = "[ESTADO]"
        Me.XrTableCell10.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell10.Weight = 0.704376300793373R
        '
        'XrTableCell17
        '
        Me.XrTableCell17.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.XrTableCell17.BorderColor = System.Drawing.Color.White
        Me.XrTableCell17.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell17.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.FechaFinContrato")})
        Me.XrTableCell17.EvenStyleName = "Fila1"
        Me.XrTableCell17.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell17.Name = "XrTableCell17"
        Me.XrTableCell17.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell17.StyleName = "Fila2"
        Me.XrTableCell17.StylePriority.UseFont = False
        Me.XrTableCell17.StylePriority.UsePadding = False
        Me.XrTableCell17.StylePriority.UseTextAlignment = False
        Me.XrTableCell17.Text = "XrTableCell17"
        Me.XrTableCell17.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell17.Weight = 0.31352143636476293R
        '
        'XrTableCell13
        '
        Me.XrTableCell13.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.XrTableCell13.BorderColor = System.Drawing.Color.White
        Me.XrTableCell13.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell13.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.FechaInicioContrato")})
        Me.XrTableCell13.EvenStyleName = "Fila1"
        Me.XrTableCell13.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell13.Name = "XrTableCell13"
        Me.XrTableCell13.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell13.StyleName = "Fila2"
        Me.XrTableCell13.StylePriority.UseFont = False
        Me.XrTableCell13.StylePriority.UsePadding = False
        Me.XrTableCell13.StylePriority.UseTextAlignment = False
        Me.XrTableCell13.Text = "XrTableCell13"
        Me.XrTableCell13.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell13.Weight = 0.31352143636476293R
        '
        'xrMesesContrato
        '
        Me.xrMesesContrato.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrMesesContrato.BorderColor = System.Drawing.Color.White
        Me.xrMesesContrato.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrMesesContrato.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.MesesContrato")})
        Me.xrMesesContrato.EvenStyleName = "Fila1"
        Me.xrMesesContrato.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.xrMesesContrato.Name = "xrMesesContrato"
        Me.xrMesesContrato.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.xrMesesContrato.StyleName = "Fila2"
        Me.xrMesesContrato.StylePriority.UseFont = False
        Me.xrMesesContrato.StylePriority.UsePadding = False
        Me.xrMesesContrato.StylePriority.UseTextAlignment = False
        Me.xrMesesContrato.Text = "xrMesesContrato"
        Me.xrMesesContrato.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.xrMesesContrato.Weight = 0.22177560093472393R
        '
        'xrMesesPendientes
        '
        Me.xrMesesPendientes.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrMesesPendientes.BorderColor = System.Drawing.Color.White
        Me.xrMesesPendientes.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrMesesPendientes.EvenStyleName = "Fila1"
        Me.xrMesesPendientes.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.xrMesesPendientes.Name = "xrMesesPendientes"
        Me.xrMesesPendientes.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.xrMesesPendientes.StyleName = "Fila2"
        Me.xrMesesPendientes.StylePriority.UseFont = False
        Me.xrMesesPendientes.StylePriority.UsePadding = False
        Me.xrMesesPendientes.StylePriority.UseTextAlignment = False
        Me.xrMesesPendientes.Text = "xrMesesPendientes"
        Me.xrMesesPendientes.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.xrMesesPendientes.Weight = 0.39276132461521396R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 78.0!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel1, Me.lblTotalRegistros, Me.XrLine2, Me.XrPageInfo1, Me.XrLabel5, Me.XrLabel4, Me.XrLabel6, Me.LBLEmpresa, Me.XrPageInfo2, Me.LBLUsuario})
        Me.BottomMargin.HeightF = 89.04168!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrLabel1
        '
        Me.XrLabel1.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel1.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(599.3333!, 42.8333!)
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(150.0!, 23.0!)
        Me.XrLabel1.StylePriority.UseBackColor = False
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.StylePriority.UseForeColor = False
        Me.XrLabel1.StylePriority.UseTextAlignment = False
        Me.XrLabel1.Text = "Total de registros:"
        Me.XrLabel1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'lblTotalRegistros
        '
        Me.lblTotalRegistros.BackColor = System.Drawing.Color.Transparent
        Me.lblTotalRegistros.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.lblTotalRegistros.ForeColor = System.Drawing.Color.Navy
        Me.lblTotalRegistros.LocationFloat = New DevExpress.Utils.PointFloat(749.8359!, 42.83333!)
        Me.lblTotalRegistros.Name = "lblTotalRegistros"
        Me.lblTotalRegistros.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.lblTotalRegistros.SizeF = New System.Drawing.SizeF(80.70911!, 24.45834!)
        Me.lblTotalRegistros.StylePriority.UseBackColor = False
        Me.lblTotalRegistros.StylePriority.UseFont = False
        Me.lblTotalRegistros.StylePriority.UseForeColor = False
        Me.lblTotalRegistros.StylePriority.UseTextAlignment = False
        Me.lblTotalRegistros.Text = "LBLTOTALREGISTROS"
        Me.lblTotalRegistros.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(4.166667!, 6.916618!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(829.8332!, 10.29169!)
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(748.8359!, 19.29164!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(83.07397!, 22.99998!)
        Me.XrPageInfo1.StylePriority.UseBackColor = False
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(3.130182!, 19.29162!)
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
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel4.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(643.6276!, 19.29162!)
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
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(3.130182!, 42.83331!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(71.20151!, 24.45832!)
        Me.XrLabel6.StylePriority.UseBackColor = False
        Me.XrLabel6.StylePriority.UseFont = False
        Me.XrLabel6.StylePriority.UseForeColor = False
        Me.XrLabel6.StylePriority.UseTextAlignment = False
        Me.XrLabel6.Text = "Emisor:"
        Me.XrLabel6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(74.33169!, 19.29165!)
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
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(342.6033!, 19.29165!)
        Me.XrPageInfo2.Name = "XrPageInfo2"
        Me.XrPageInfo2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo2.SizeF = New System.Drawing.SizeF(136.4161!, 22.375!)
        Me.XrPageInfo2.StylePriority.UseBackColor = False
        Me.XrPageInfo2.StylePriority.UseBorderColor = False
        Me.XrPageInfo2.StylePriority.UseBorders = False
        Me.XrPageInfo2.StylePriority.UseFont = False
        Me.XrPageInfo2.StylePriority.UseTextAlignment = False
        Me.XrPageInfo2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(74.33169!, 42.83331!)
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
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.TXTtipolinea, Me.LBLtipolinea, Me.XrLabel2, Me.xrPictureBoxLogo, Me.xrLine1, Me.lblCampoDinamico, Me.txtValorDinamico, Me.txtLinea, Me.lblLinea, Me.TXTorganizacion, Me.LBLorganizacion, Me.LBLempleado, Me.TXTempleado, Me.TXTplan, Me.LBLplan, Me.XrTable2})
        Me.PageHeader.HeightF = 209.4583!
        Me.PageHeader.Name = "PageHeader"
        '
        'TXTtipolinea
        '
        Me.TXTtipolinea.BackColor = System.Drawing.Color.Transparent
        Me.TXTtipolinea.BorderColor = System.Drawing.Color.White
        Me.TXTtipolinea.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTtipolinea.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTtipolinea.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTtipolinea.LocationFloat = New DevExpress.Utils.PointFloat(650.8333!, 121.875!)
        Me.TXTtipolinea.Name = "TXTtipolinea"
        Me.TXTtipolinea.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTtipolinea.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.TXTtipolinea.StylePriority.UseBackColor = False
        Me.TXTtipolinea.StylePriority.UseFont = False
        Me.TXTtipolinea.StylePriority.UseForeColor = False
        Me.TXTtipolinea.StylePriority.UsePadding = False
        Me.TXTtipolinea.Text = "(TODOS)"
        Me.TXTtipolinea.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLtipolinea
        '
        Me.LBLtipolinea.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLtipolinea.BorderColor = System.Drawing.Color.White
        Me.LBLtipolinea.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLtipolinea.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLtipolinea.ForeColor = System.Drawing.Color.White
        Me.LBLtipolinea.LocationFloat = New DevExpress.Utils.PointFloat(536.9999!, 121.875!)
        Me.LBLtipolinea.Name = "LBLtipolinea"
        Me.LBLtipolinea.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLtipolinea.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLtipolinea.StylePriority.UseBackColor = False
        Me.LBLtipolinea.StylePriority.UseBorders = False
        Me.LBLtipolinea.StylePriority.UseFont = False
        Me.LBLtipolinea.StylePriority.UseForeColor = False
        Me.LBLtipolinea.StylePriority.UsePadding = False
        Me.LBLtipolinea.StylePriority.UseTextAlignment = False
        Me.LBLtipolinea.Text = "Tipo Línea:"
        Me.LBLtipolinea.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel2
        '
        Me.XrLabel2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(0.5825043!, 21.45834!)
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(660.9478!, 37.99999!)
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UseForeColor = False
        Me.XrLabel2.StylePriority.UsePadding = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "XrLabel2"
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(685.0416!, 10.0!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.9583!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(1.123365!, 59.45835!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(832.8766!, 9.0!)
        '
        'lblCampoDinamico
        '
        Me.lblCampoDinamico.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.lblCampoDinamico.BorderColor = System.Drawing.Color.White
        Me.lblCampoDinamico.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.lblCampoDinamico.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.lblCampoDinamico.ForeColor = System.Drawing.Color.White
        Me.lblCampoDinamico.LocationFloat = New DevExpress.Utils.PointFloat(4.130182!, 121.875!)
        Me.lblCampoDinamico.Name = "lblCampoDinamico"
        Me.lblCampoDinamico.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.lblCampoDinamico.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.lblCampoDinamico.StylePriority.UseBackColor = False
        Me.lblCampoDinamico.StylePriority.UseBorders = False
        Me.lblCampoDinamico.StylePriority.UseFont = False
        Me.lblCampoDinamico.StylePriority.UseForeColor = False
        Me.lblCampoDinamico.StylePriority.UsePadding = False
        Me.lblCampoDinamico.StylePriority.UseTextAlignment = False
        Me.lblCampoDinamico.Text = "Otros:"
        Me.lblCampoDinamico.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'txtValorDinamico
        '
        Me.txtValorDinamico.BackColor = System.Drawing.Color.Transparent
        Me.txtValorDinamico.BorderColor = System.Drawing.Color.White
        Me.txtValorDinamico.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.txtValorDinamico.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtValorDinamico.ForeColor = System.Drawing.SystemColors.WindowText
        Me.txtValorDinamico.LocationFloat = New DevExpress.Utils.PointFloat(119.0!, 121.875!)
        Me.txtValorDinamico.Name = "txtValorDinamico"
        Me.txtValorDinamico.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.txtValorDinamico.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.txtValorDinamico.StylePriority.UseBackColor = False
        Me.txtValorDinamico.StylePriority.UseFont = False
        Me.txtValorDinamico.StylePriority.UseForeColor = False
        Me.txtValorDinamico.StylePriority.UsePadding = False
        Me.txtValorDinamico.Text = "(TODOS)"
        Me.txtValorDinamico.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'txtLinea
        '
        Me.txtLinea.BackColor = System.Drawing.Color.Transparent
        Me.txtLinea.BorderColor = System.Drawing.Color.White
        Me.txtLinea.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.txtLinea.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtLinea.ForeColor = System.Drawing.SystemColors.WindowText
        Me.txtLinea.LocationFloat = New DevExpress.Utils.PointFloat(650.8333!, 96.87503!)
        Me.txtLinea.Name = "txtLinea"
        Me.txtLinea.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.txtLinea.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.txtLinea.StylePriority.UseBackColor = False
        Me.txtLinea.StylePriority.UseFont = False
        Me.txtLinea.StylePriority.UseForeColor = False
        Me.txtLinea.StylePriority.UsePadding = False
        Me.txtLinea.Text = "(TODOS)"
        Me.txtLinea.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'lblLinea
        '
        Me.lblLinea.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.lblLinea.BorderColor = System.Drawing.Color.White
        Me.lblLinea.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.lblLinea.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.lblLinea.ForeColor = System.Drawing.Color.White
        Me.lblLinea.LocationFloat = New DevExpress.Utils.PointFloat(536.9999!, 96.87503!)
        Me.lblLinea.Name = "lblLinea"
        Me.lblLinea.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.lblLinea.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.lblLinea.StylePriority.UseBackColor = False
        Me.lblLinea.StylePriority.UseBorders = False
        Me.lblLinea.StylePriority.UseFont = False
        Me.lblLinea.StylePriority.UseForeColor = False
        Me.lblLinea.StylePriority.UsePadding = False
        Me.lblLinea.StylePriority.UseTextAlignment = False
        Me.lblLinea.Text = "Línea:"
        Me.lblLinea.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXTorganizacion
        '
        Me.TXTorganizacion.BackColor = System.Drawing.Color.Transparent
        Me.TXTorganizacion.BorderColor = System.Drawing.Color.White
        Me.TXTorganizacion.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTorganizacion.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTorganizacion.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTorganizacion.LocationFloat = New DevExpress.Utils.PointFloat(118.0!, 96.87503!)
        Me.TXTorganizacion.Name = "TXTorganizacion"
        Me.TXTorganizacion.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTorganizacion.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.TXTorganizacion.StylePriority.UseBackColor = False
        Me.TXTorganizacion.StylePriority.UseFont = False
        Me.TXTorganizacion.StylePriority.UseForeColor = False
        Me.TXTorganizacion.StylePriority.UsePadding = False
        Me.TXTorganizacion.Text = "(TODOS)"
        Me.TXTorganizacion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLorganizacion
        '
        Me.LBLorganizacion.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLorganizacion.BorderColor = System.Drawing.Color.White
        Me.LBLorganizacion.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLorganizacion.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLorganizacion.ForeColor = System.Drawing.Color.White
        Me.LBLorganizacion.LocationFloat = New DevExpress.Utils.PointFloat(4.166667!, 96.87503!)
        Me.LBLorganizacion.Name = "LBLorganizacion"
        Me.LBLorganizacion.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLorganizacion.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLorganizacion.StylePriority.UseBackColor = False
        Me.LBLorganizacion.StylePriority.UseBorders = False
        Me.LBLorganizacion.StylePriority.UseFont = False
        Me.LBLorganizacion.StylePriority.UseForeColor = False
        Me.LBLorganizacion.StylePriority.UsePadding = False
        Me.LBLorganizacion.StylePriority.UseTextAlignment = False
        Me.LBLorganizacion.Text = "Organización:"
        Me.LBLorganizacion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLempleado
        '
        Me.LBLempleado.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLempleado.BorderColor = System.Drawing.Color.White
        Me.LBLempleado.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLempleado.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLempleado.ForeColor = System.Drawing.Color.White
        Me.LBLempleado.LocationFloat = New DevExpress.Utils.PointFloat(4.166667!, 71.87503!)
        Me.LBLempleado.Name = "LBLempleado"
        Me.LBLempleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLempleado.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLempleado.StylePriority.UseBackColor = False
        Me.LBLempleado.StylePriority.UseBorders = False
        Me.LBLempleado.StylePriority.UseFont = False
        Me.LBLempleado.StylePriority.UseForeColor = False
        Me.LBLempleado.StylePriority.UsePadding = False
        Me.LBLempleado.StylePriority.UseTextAlignment = False
        Me.LBLempleado.Text = "Empleado:"
        Me.LBLempleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXTempleado
        '
        Me.TXTempleado.BackColor = System.Drawing.Color.Transparent
        Me.TXTempleado.BorderColor = System.Drawing.Color.White
        Me.TXTempleado.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTempleado.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTempleado.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTempleado.LocationFloat = New DevExpress.Utils.PointFloat(118.0!, 71.87503!)
        Me.TXTempleado.Name = "TXTempleado"
        Me.TXTempleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTempleado.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.TXTempleado.StylePriority.UseBackColor = False
        Me.TXTempleado.StylePriority.UseFont = False
        Me.TXTempleado.StylePriority.UseForeColor = False
        Me.TXTempleado.StylePriority.UsePadding = False
        Me.TXTempleado.Text = "(TODOS)"
        Me.TXTempleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXTplan
        '
        Me.TXTplan.BackColor = System.Drawing.Color.Transparent
        Me.TXTplan.BorderColor = System.Drawing.Color.White
        Me.TXTplan.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTplan.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTplan.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTplan.LocationFloat = New DevExpress.Utils.PointFloat(650.8333!, 71.87503!)
        Me.TXTplan.Name = "TXTplan"
        Me.TXTplan.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTplan.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.TXTplan.StylePriority.UseBackColor = False
        Me.TXTplan.StylePriority.UseFont = False
        Me.TXTplan.StylePriority.UseForeColor = False
        Me.TXTplan.StylePriority.UsePadding = False
        Me.TXTplan.Text = "(TODOS)"
        Me.TXTplan.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLplan
        '
        Me.LBLplan.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLplan.BorderColor = System.Drawing.Color.White
        Me.LBLplan.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLplan.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLplan.ForeColor = System.Drawing.Color.White
        Me.LBLplan.LocationFloat = New DevExpress.Utils.PointFloat(536.9999!, 71.87503!)
        Me.LBLplan.Name = "LBLplan"
        Me.LBLplan.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLplan.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLplan.StylePriority.UseBackColor = False
        Me.LBLplan.StylePriority.UseBorders = False
        Me.LBLplan.StylePriority.UseFont = False
        Me.LBLplan.StylePriority.UseForeColor = False
        Me.LBLplan.StylePriority.UsePadding = False
        Me.LBLplan.StylePriority.UseTextAlignment = False
        Me.LBLplan.Text = "Plan:"
        Me.LBLplan.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(4.166667!, 163.875!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(827.7433!, 35.58325!)
        Me.XrTable2.StylePriority.UseBackColor = False
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell3, Me.XrTableCell4, Me.XrTableCell5, Me.XrTableCell6, Me.XrTableCell2, Me.XrTableCell7, Me.XrTableCell16, Me.XrTableCell9})
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
        Me.XrTableCell1.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell1.ForeColor = System.Drawing.Color.White
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell1.StylePriority.UseBackColor = False
        Me.XrTableCell1.StylePriority.UseBorders = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.StylePriority.UseForeColor = False
        Me.XrTableCell1.StylePriority.UsePadding = False
        Me.XrTableCell1.Text = "Línea"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell1.Weight = 0.095160500182902133R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell3.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell3.ForeColor = System.Drawing.Color.White
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.Text = "Cod. Empleado"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.10967766654153668R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell4.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell4.ForeColor = System.Drawing.Color.White
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell4.StylePriority.UseBackColor = False
        Me.XrTableCell4.StylePriority.UseBorders = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.StylePriority.UseForeColor = False
        Me.XrTableCell4.StylePriority.UsePadding = False
        Me.XrTableCell4.Text = "Empleado"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.23429924221406428R
        '
        'XrTableCell5
        '
        Me.XrTableCell5.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell5.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell5.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell5.ForeColor = System.Drawing.Color.White
        Me.XrTableCell5.Name = "XrTableCell5"
        Me.XrTableCell5.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell5.StylePriority.UseBackColor = False
        Me.XrTableCell5.StylePriority.UseBorders = False
        Me.XrTableCell5.StylePriority.UseFont = False
        Me.XrTableCell5.StylePriority.UseForeColor = False
        Me.XrTableCell5.StylePriority.UsePadding = False
        Me.XrTableCell5.Text = "Plan"
        Me.XrTableCell5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell5.Weight = 0.2303484020895043R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell2.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell2.ForeColor = System.Drawing.Color.White
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell2.StylePriority.UseBackColor = False
        Me.XrTableCell2.StylePriority.UseBorders = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UseForeColor = False
        Me.XrTableCell2.StylePriority.UsePadding = False
        Me.XrTableCell2.Text = "Fecha Fin"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 0.10252918525209642R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell6.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.ForeColor = System.Drawing.Color.White
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseBorders = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UseForeColor = False
        Me.XrTableCell6.StylePriority.UsePadding = False
        Me.XrTableCell6.Text = "Fecha Inicio"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.10252918525209642R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell7.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell7.ForeColor = System.Drawing.Color.White
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell7.StylePriority.UseBackColor = False
        Me.XrTableCell7.StylePriority.UseBorders = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UseForeColor = False
        Me.XrTableCell7.StylePriority.UsePadding = False
        Me.XrTableCell7.Text = "Meses Contrato"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.0725258895566389R
        '
        'XrTableCell16
        '
        Me.XrTableCell16.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell16.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell16.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell16.ForeColor = System.Drawing.Color.White
        Me.XrTableCell16.Multiline = True
        Me.XrTableCell16.Name = "XrTableCell16"
        Me.XrTableCell16.StylePriority.UseBackColor = False
        Me.XrTableCell16.StylePriority.UseBorders = False
        Me.XrTableCell16.StylePriority.UseFont = False
        Me.XrTableCell16.StylePriority.UseForeColor = False
        Me.XrTableCell16.StylePriority.UsePadding = False
        Me.XrTableCell16.StylePriority.UseTextAlignment = False
        Me.XrTableCell16.Text = "Meses  a Vencer" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & "(Líneas)"
        Me.XrTableCell16.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell16.Weight = 0.12844257907591639R
        '
        'Procedimiento1
        '
        Me.Procedimiento1.DataSetName = "Procedimiento"
        Me.Procedimiento1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_GEN_ListaLineas_FiltrosTableAdapter
        '
        Me.MOV_s_GEN_ListaLineas_FiltrosTableAdapter.ClearBeforeFill = True
        '
        'cfTitulo1
        '
        Me.cfTitulo1.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo1.Name = "cfTitulo1"
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
        'xrMesesPendientesEq
        '
        Me.xrMesesPendientesEq.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaLineasContrato_Filtros.MesesRestantesEq")})
        Me.xrMesesPendientesEq.Name = "xrMesesPendientesEq"
        Me.xrMesesPendientesEq.StylePriority.UseTextAlignment = False
        Me.xrMesesPendientesEq.Text = "xrMesesPendientesEq"
        Me.xrMesesPendientesEq.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.xrMesesPendientesEq.Weight = 0.45756092919288771R
        '
        'XrTableCell9
        '
        Me.XrTableCell9.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell9.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell9.Multiline = True
        Me.XrTableCell9.Name = "XrTableCell9"
        Me.XrTableCell9.StylePriority.UseBackColor = False
        Me.XrTableCell9.StylePriority.UseFont = False
        Me.XrTableCell9.StylePriority.UseTextAlignment = False
        Me.XrTableCell9.Text = "Meses  a Vencer" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & "(Equipos)"
        Me.XrTableCell9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell9.Weight = 0.149633741547992R
        '
        'XRPT_LineasContrato
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1})
        Me.DataMember = "MOV_s_GEN_ListaLineasContrato_Filtros"
        Me.DataSource = Me.Procedimiento1
        Me.Margins = New System.Drawing.Printing.Margins(7, 9, 78, 89)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1, Me.Fila2})
        Me.Version = "12.2"
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents Procedimiento1 As Procedimiento
    Friend WithEvents MOV_s_GEN_ListaLineas_FiltrosTableAdapter As ProcedimientoTableAdapters.MOV_s_GEN_ListaLineas_FiltrosTableAdapter
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell16 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell17 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow4 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell12 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell11 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrMesesPendientes As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents lblCampoDinamico As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents txtValorDinamico As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents txtLinea As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents lblLinea As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTorganizacion As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLorganizacion As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLempleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTempleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTplan As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLplan As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrTableCell10 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell13 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrMesesContrato As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents TXTtipolinea As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLtipolinea As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents lblTotalRegistros As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrMesesPendientesEq As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell9 As DevExpress.XtraReports.UI.XRTableCell
End Class
