<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_CentroCosto
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_CentroCosto))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow4 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell12 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrDetalleEmpleados = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrDetalleLineas = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrDetalleDispositivos = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrMonto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMonto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TXTcentrocosto = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLnivel = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLcentrocosto = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTnivel = New DevExpress.XtraReports.UI.XRLabel()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.XrFila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.XrFila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Procedimiento1 = New Procedimiento()
        Me.MOV_s_GEN_ListaCentroCosto_FiltrosTableAdapter = New ProcedimientoTableAdapters.MOV_s_GEN_ListaCentroCosto_FiltrosTableAdapter()
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
        Me.Detail.StylePriority.UseTextAlignment = False
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(1.751518!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow4})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(817.2485!, 23.85417!)
        '
        'XrTableRow4
        '
        Me.XrTableRow4.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell2, Me.XrTableCell12, Me.xrDetalleEmpleados, Me.xrDetalleLineas, Me.xrDetalleDispositivos, Me.XrMonto})
        Me.XrTableRow4.Name = "XrTableRow4"
        Me.XrTableRow4.Weight = 1.0R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.White
        Me.XrTableCell2.BorderColor = System.Drawing.Color.White
        Me.XrTableCell2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaCentroCosto_Filtros.CODIGO")})
        Me.XrTableCell2.EvenStyleName = "XrFila1"
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 8.0!)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableCell2.StyleName = "XrFila2"
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.Text = "XrTableCell2"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableCell2.Weight = 0.62138361817626364R
        '
        'XrTableCell12
        '
        Me.XrTableCell12.BackColor = System.Drawing.Color.White
        Me.XrTableCell12.BorderColor = System.Drawing.Color.White
        Me.XrTableCell12.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_GEN_ListaCentroCosto_Filtros.CENTRO DE COSTO")})
        Me.XrTableCell12.EvenStyleName = "XrFila1"
        Me.XrTableCell12.Font = New System.Drawing.Font("Trebuchet MS", 8.0!)
        Me.XrTableCell12.ForeColor = System.Drawing.Color.Black
        Me.XrTableCell12.Name = "XrTableCell12"
        Me.XrTableCell12.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableCell12.StyleName = "XrFila2"
        Me.XrTableCell12.StylePriority.UseFont = False
        Me.XrTableCell12.StylePriority.UseForeColor = False
        Me.XrTableCell12.Text = "Monto"
        Me.XrTableCell12.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableCell12.Weight = 1.2440879689920799R
        '
        'xrDetalleEmpleados
        '
        Me.xrDetalleEmpleados.BackColor = System.Drawing.Color.White
        Me.xrDetalleEmpleados.BorderColor = System.Drawing.Color.White
        Me.xrDetalleEmpleados.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrDetalleEmpleados.EvenStyleName = "XrFila1"
        Me.xrDetalleEmpleados.Font = New System.Drawing.Font("Trebuchet MS", 8.0!)
        Me.xrDetalleEmpleados.Name = "xrDetalleEmpleados"
        Me.xrDetalleEmpleados.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalleEmpleados.StyleName = "XrFila2"
        Me.xrDetalleEmpleados.StylePriority.UseFont = False
        Me.xrDetalleEmpleados.StylePriority.UseTextAlignment = False
        Me.xrDetalleEmpleados.Text = "xrDetalleEmpleados"
        Me.xrDetalleEmpleados.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight
        Me.xrDetalleEmpleados.Weight = 0.821315296660912R
        '
        'xrDetalleLineas
        '
        Me.xrDetalleLineas.BackColor = System.Drawing.Color.White
        Me.xrDetalleLineas.BorderColor = System.Drawing.Color.White
        Me.xrDetalleLineas.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrDetalleLineas.EvenStyleName = "XrFila1"
        Me.xrDetalleLineas.Font = New System.Drawing.Font("Trebuchet MS", 8.0!)
        Me.xrDetalleLineas.Name = "xrDetalleLineas"
        Me.xrDetalleLineas.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalleLineas.StyleName = "XrFila2"
        Me.xrDetalleLineas.StylePriority.UseFont = False
        Me.xrDetalleLineas.StylePriority.UseTextAlignment = False
        Me.xrDetalleLineas.Text = "xrDetalleLineas"
        Me.xrDetalleLineas.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight
        Me.xrDetalleLineas.Weight = 0.56926198256542448R
        '
        'xrDetalleDispositivos
        '
        Me.xrDetalleDispositivos.BackColor = System.Drawing.Color.White
        Me.xrDetalleDispositivos.BorderColor = System.Drawing.Color.White
        Me.xrDetalleDispositivos.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrDetalleDispositivos.EvenStyleName = "XrFila1"
        Me.xrDetalleDispositivos.Font = New System.Drawing.Font("Trebuchet MS", 8.0!)
        Me.xrDetalleDispositivos.Name = "xrDetalleDispositivos"
        Me.xrDetalleDispositivos.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalleDispositivos.StyleName = "XrFila2"
        Me.xrDetalleDispositivos.StylePriority.UseFont = False
        Me.xrDetalleDispositivos.StylePriority.UseTextAlignment = False
        Me.xrDetalleDispositivos.Text = "xrDetalleDispositivos"
        Me.xrDetalleDispositivos.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight
        Me.xrDetalleDispositivos.Weight = 0.66089136257345082R
        '
        'XrMonto
        '
        Me.XrMonto.BackColor = System.Drawing.Color.White
        Me.XrMonto.BorderColor = System.Drawing.Color.White
        Me.XrMonto.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrMonto.EvenStyleName = "XrFila1"
        Me.XrMonto.Font = New System.Drawing.Font("Trebuchet MS", 8.0!)
        Me.XrMonto.Name = "XrMonto"
        Me.XrMonto.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrMonto.StyleName = "XrFila2"
        Me.XrMonto.StylePriority.UseFont = False
        Me.XrMonto.StylePriority.UseTextAlignment = False
        Me.XrMonto.Text = "XrMonto"
        Me.XrMonto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight
        Me.XrMonto.Weight = 0.54418880144345838R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 74.0!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel5, Me.XrLabel4, Me.XrLine2, Me.XrPageInfo1, Me.XrPageInfo2, Me.LBLUsuario, Me.XrLabel6, Me.LBLEmpresa})
        Me.BottomMargin.HeightF = 97.0!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(1.751518!, 28.66669!)
        Me.XrLabel5.Name = "XrLabel5"
        Me.XrLabel5.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel5.SizeF = New System.Drawing.SizeF(71.2015!, 22.375!)
        Me.XrLabel5.StylePriority.UseBackColor = False
        Me.XrLabel5.StylePriority.UseFont = False
        Me.XrLabel5.StylePriority.UseForeColor = False
        Me.XrLabel5.StylePriority.UseTextAlignment = False
        Me.XrLabel5.Text = "Empresa :"
        Me.XrLabel5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(713.7917!, 28.66669!)
        Me.XrLabel4.Name = "XrLabel4"
        Me.XrLabel4.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel4.SizeF = New System.Drawing.SizeF(105.2083!, 23.0!)
        Me.XrLabel4.StylePriority.UseBackColor = False
        Me.XrLabel4.StylePriority.UseFont = False
        Me.XrLabel4.StylePriority.UseTextAlignment = False
        Me.XrLabel4.Text = "Fecha :"
        Me.XrLabel4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(1.751518!, 16.16669!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(817.2485!, 10.29169!)
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Black
        Me.XrPageInfo1.Format = "{0:dddd, d' de 'MMMM' de 'yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(524.4677!, 53.66669!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(294.5323!, 22.99999!)
        Me.XrPageInfo1.StylePriority.UseBackColor = False
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Páginas {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(339.2515!, 28.66669!)
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
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(76.75152!, 53.66669!)
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
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(1.751518!, 53.66669!)
        Me.XrLabel6.Name = "XrLabel6"
        Me.XrLabel6.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel6.SizeF = New System.Drawing.SizeF(71.20149!, 24.45833!)
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
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(76.75152!, 28.66669!)
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
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel2, Me.xrPictureBoxLogo, Me.xrLine1, Me.XrTable2, Me.TXTcentrocosto, Me.LBLnivel, Me.LBLcentrocosto, Me.TXTnivel})
        Me.PageHeader.HeightF = 153.2083!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrLabel2
        '
        Me.XrLabel2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(1.041667!, 9.375!)
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
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(670.0417!, 5.70834!)
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
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(1.041667!, 59.375!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(818.9583!, 9.0!)
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(1.041667!, 114.5833!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(817.2485!, 22.99998!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell1, Me.XrTableCell3, Me.XrTableCell6, Me.XrTableCell7, Me.XrTableCell8, Me.xrTituloMonto})
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
        Me.XrTableCell1.Text = "Centro de Costo"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell1.Weight = 0.14428013342698778R
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
        Me.XrTableCell3.Text = "Descripción"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.31548100097256704R
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
        Me.XrTableCell6.Text = "# Empleado"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.20200045936579597R
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
        Me.XrTableCell7.Text = "# Línea"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.14000864662233861R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell8.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.ForeColor = System.Drawing.Color.White
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseBorders = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UseForeColor = False
        Me.XrTableCell8.Text = "# Dispositivo"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell8.Weight = 0.1625444831808692R
        '
        'xrTituloMonto
        '
        Me.xrTituloMonto.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrTituloMonto.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.xrTituloMonto.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.xrTituloMonto.ForeColor = System.Drawing.Color.White
        Me.xrTituloMonto.Name = "xrTituloMonto"
        Me.xrTituloMonto.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.xrTituloMonto.StylePriority.UseBackColor = False
        Me.xrTituloMonto.StylePriority.UseBorders = False
        Me.xrTituloMonto.StylePriority.UseFont = False
        Me.xrTituloMonto.StylePriority.UseForeColor = False
        Me.xrTituloMonto.StylePriority.UsePadding = False
        Me.xrTituloMonto.StylePriority.UseTextAlignment = False
        Me.xrTituloMonto.Text = "Monto"
        Me.xrTituloMonto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.xrTituloMonto.Weight = 0.13288900479362509R
        '
        'TXTcentrocosto
        '
        Me.TXTcentrocosto.BackColor = System.Drawing.Color.Transparent
        Me.TXTcentrocosto.BorderColor = System.Drawing.Color.White
        Me.TXTcentrocosto.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTcentrocosto.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTcentrocosto.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTcentrocosto.LocationFloat = New DevExpress.Utils.PointFloat(115.5848!, 74.62498!)
        Me.TXTcentrocosto.Name = "TXTcentrocosto"
        Me.TXTcentrocosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTcentrocosto.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.TXTcentrocosto.StylePriority.UseBackColor = False
        Me.TXTcentrocosto.StylePriority.UseFont = False
        Me.TXTcentrocosto.Text = "(TODOS)"
        Me.TXTcentrocosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLnivel
        '
        Me.LBLnivel.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLnivel.BorderColor = System.Drawing.Color.White
        Me.LBLnivel.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLnivel.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLnivel.ForeColor = System.Drawing.Color.White
        Me.LBLnivel.LocationFloat = New DevExpress.Utils.PointFloat(522.0!, 74.62498!)
        Me.LBLnivel.Name = "LBLnivel"
        Me.LBLnivel.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLnivel.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLnivel.StylePriority.UseBackColor = False
        Me.LBLnivel.StylePriority.UseBorders = False
        Me.LBLnivel.StylePriority.UseFont = False
        Me.LBLnivel.StylePriority.UseForeColor = False
        Me.LBLnivel.StylePriority.UsePadding = False
        Me.LBLnivel.StylePriority.UseTextAlignment = False
        Me.LBLnivel.Text = "Nivel:"
        Me.LBLnivel.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLcentrocosto
        '
        Me.LBLcentrocosto.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLcentrocosto.BorderColor = System.Drawing.Color.White
        Me.LBLcentrocosto.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLcentrocosto.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLcentrocosto.ForeColor = System.Drawing.Color.White
        Me.LBLcentrocosto.LocationFloat = New DevExpress.Utils.PointFloat(1.751518!, 74.62498!)
        Me.LBLcentrocosto.Name = "LBLcentrocosto"
        Me.LBLcentrocosto.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLcentrocosto.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLcentrocosto.StylePriority.UseBackColor = False
        Me.LBLcentrocosto.StylePriority.UseBorders = False
        Me.LBLcentrocosto.StylePriority.UseFont = False
        Me.LBLcentrocosto.StylePriority.UseForeColor = False
        Me.LBLcentrocosto.StylePriority.UsePadding = False
        Me.LBLcentrocosto.StylePriority.UseTextAlignment = False
        Me.LBLcentrocosto.Text = "Centro de Costo:"
        Me.LBLcentrocosto.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXTnivel
        '
        Me.TXTnivel.BackColor = System.Drawing.Color.Transparent
        Me.TXTnivel.BorderColor = System.Drawing.Color.White
        Me.TXTnivel.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTnivel.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTnivel.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTnivel.LocationFloat = New DevExpress.Utils.PointFloat(635.8333!, 74.62498!)
        Me.TXTnivel.Name = "TXTnivel"
        Me.TXTnivel.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTnivel.SizeF = New System.Drawing.SizeF(183.1667!, 25.0!)
        Me.TXTnivel.StylePriority.UseBackColor = False
        Me.TXTnivel.StylePriority.UseFont = False
        Me.TXTnivel.Text = "(TODOS)"
        Me.TXTnivel.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'cfTitulo1
        '
        Me.cfTitulo1.Expression = "''"
        Me.cfTitulo1.FieldType = DevExpress.XtraReports.UI.FieldType.[String]
        Me.cfTitulo1.Name = "cfTitulo1"
        '
        'XrFila1
        '
        Me.XrFila1.BackColor = System.Drawing.Color.FromArgb(CType(CType(196, Byte), Integer), CType(CType(220, Byte), Integer), CType(CType(255, Byte), Integer))
        Me.XrFila1.Name = "XrFila1"
        Me.XrFila1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'XrFila2
        '
        Me.XrFila2.BackColor = System.Drawing.Color.White
        Me.XrFila2.Name = "XrFila2"
        Me.XrFila2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'Procedimiento1
        '
        Me.Procedimiento1.DataSetName = "Procedimiento"
        Me.Procedimiento1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_GEN_ListaCentroCosto_FiltrosTableAdapter
        '
        Me.MOV_s_GEN_ListaCentroCosto_FiltrosTableAdapter.ClearBeforeFill = True
        '
        'XRPT_CentroCosto
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.BottomMargin, Me.Detail, Me.TopMargin, Me.PageHeader})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1})
        Me.DataAdapter = Me.MOV_s_GEN_ListaCentroCosto_FiltrosTableAdapter
        Me.DataMember = "MOV_s_GEN_ListaCentroCosto_Filtros"
        Me.DataSource = Me.Procedimiento1
        Me.Margins = New System.Drawing.Printing.Margins(15, 15, 74, 97)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.XrFila1, Me.XrFila2})
        Me.Version = "11.2"
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents LBLnivel As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTnivel As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTcentrocosto As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLcentrocosto As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMonto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow4 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell12 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrDetalleEmpleados As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrDetalleLineas As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrDetalleDispositivos As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrMonto As DevExpress.XtraReports.UI.XRTableCell

    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents XrFila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents XrFila2 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Procedimiento1 As Procedimiento
    Friend WithEvents MOV_s_GEN_ListaCentroCosto_FiltrosTableAdapter As ProcedimientoTableAdapters.MOV_s_GEN_ListaCentroCosto_FiltrosTableAdapter
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine

End Class
