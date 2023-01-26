<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Con_Rpt_DetalleServicioPorEmp
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Con_Rpt_DetalleServicioPorEmp))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrFecha = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrHora = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrSucursal = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTipo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrNumero = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrEmpresa = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrServ = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrConsumo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrByteEnv = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrByteRec = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.Titulo2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell10 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell9 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloCosto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageBreak1 = New DevExpress.XtraReports.UI.XRPageBreak()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.XrTotalEmpleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel8 = New DevExpress.XtraReports.UI.XRLabel()
        Me.DsReporteConsultas1 = New dsReporteConsultas()
        Me.MoV_s_IMP_Llamada_DetalleServicioCelDirTableAdapter1 = New dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_DetalleServicioCelDirTableAdapter()
        Me.cfTitulo1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo2 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfTitulo3 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfEmpresa = New DevExpress.XtraReports.UI.CalculatedField()
        Me.cfUsuario = New DevExpress.XtraReports.UI.CalculatedField()
        Me.PageFooter = New DevExpress.XtraReports.UI.PageFooterBand()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrLabel13 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrTotalGeneral = New DevExpress.XtraReports.UI.XRLabel()
        Me.ReportFooter = New DevExpress.XtraReports.UI.ReportFooterBand()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DsReporteConsultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrDetalle})
        Me.Detail.HeightF = 29.16667!
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
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(829.0416!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrFecha, Me.XrHora, Me.XrSucursal, Me.XrTipo, Me.XrNumero, Me.XrEmpresa, Me.XrServ, Me.XrConsumo, Me.XrCosto, Me.XrByteEnv, Me.XrByteRec})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrFecha
        '
        Me.XrFecha.BackColor = System.Drawing.Color.Transparent
        Me.XrFecha.CanGrow = False
        Me.XrFecha.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcFec")})
        Me.XrFecha.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrFecha.Name = "XrFecha"
        Me.XrFecha.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrFecha.StylePriority.UseBackColor = False
        Me.XrFecha.StylePriority.UseFont = False
        Me.XrFecha.StylePriority.UsePadding = False
        Me.XrFecha.StylePriority.UseTextAlignment = False
        Me.XrFecha.Text = "XrFecha"
        Me.XrFecha.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrFecha.Weight = 0.06103930048308312R
        '
        'XrHora
        '
        Me.XrHora.BackColor = System.Drawing.Color.Transparent
        Me.XrHora.CanGrow = False
        Me.XrHora.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcHor")})
        Me.XrHora.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrHora.Name = "XrHora"
        Me.XrHora.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrHora.StylePriority.UseBackColor = False
        Me.XrHora.StylePriority.UseFont = False
        Me.XrHora.StylePriority.UsePadding = False
        Me.XrHora.StylePriority.UseTextAlignment = False
        Me.XrHora.Text = "XrHora"
        Me.XrHora.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrHora.Weight = 0.067144365804603451R
        '
        'XrSucursal
        '
        Me.XrSucursal.BackColor = System.Drawing.Color.Transparent
        Me.XrSucursal.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcCodSuc")})
        Me.XrSucursal.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrSucursal.Name = "XrSucursal"
        Me.XrSucursal.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrSucursal.StylePriority.UseBackColor = False
        Me.XrSucursal.StylePriority.UseFont = False
        Me.XrSucursal.StylePriority.UsePadding = False
        Me.XrSucursal.StylePriority.UseTextAlignment = False
        Me.XrSucursal.Text = "XrSucursal"
        Me.XrSucursal.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrSucursal.Weight = 0.055312636171711234R
        '
        'XrTipo
        '
        Me.XrTipo.BackColor = System.Drawing.Color.Transparent
        Me.XrTipo.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcNumCel")})
        Me.XrTipo.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTipo.Name = "XrTipo"
        Me.XrTipo.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTipo.StylePriority.UseBackColor = False
        Me.XrTipo.StylePriority.UseFont = False
        Me.XrTipo.StylePriority.UsePadding = False
        Me.XrTipo.StylePriority.UseTextAlignment = False
        Me.XrTipo.Text = "XrTipo"
        Me.XrTipo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTipo.Weight = 0.070538693914024023R
        '
        'XrNumero
        '
        Me.XrNumero.BackColor = System.Drawing.Color.Transparent
        Me.XrNumero.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcNumTel")})
        Me.XrNumero.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrNumero.Name = "XrNumero"
        Me.XrNumero.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrNumero.StylePriority.UseBackColor = False
        Me.XrNumero.StylePriority.UseFont = False
        Me.XrNumero.StylePriority.UsePadding = False
        Me.XrNumero.StylePriority.UseTextAlignment = False
        Me.XrNumero.Text = "XrNumero"
        Me.XrNumero.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrNumero.Weight = 0.077796678922157469R
        '
        'XrEmpresa
        '
        Me.XrEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.XrEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcNomTel")})
        Me.XrEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrEmpresa.Name = "XrEmpresa"
        Me.XrEmpresa.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrEmpresa.StylePriority.UseBackColor = False
        Me.XrEmpresa.StylePriority.UseFont = False
        Me.XrEmpresa.StylePriority.UsePadding = False
        Me.XrEmpresa.StylePriority.UseTextAlignment = False
        Me.XrEmpresa.Text = "XrEmpresa"
        Me.XrEmpresa.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrEmpresa.Weight = 0.091050695346561239R
        '
        'XrServ
        '
        Me.XrServ.BackColor = System.Drawing.Color.Transparent
        Me.XrServ.CanGrow = False
        Me.XrServ.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcGlo")})
        Me.XrServ.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrServ.Name = "XrServ"
        Me.XrServ.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrServ.StylePriority.UseBackColor = False
        Me.XrServ.StylePriority.UseFont = False
        Me.XrServ.StylePriority.UsePadding = False
        Me.XrServ.StylePriority.UseTextAlignment = False
        Me.XrServ.Text = "XrServ"
        Me.XrServ.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrServ.Weight = 0.046216757219153581R
        '
        'XrConsumo
        '
        Me.XrConsumo.BackColor = System.Drawing.Color.Transparent
        Me.XrConsumo.CanGrow = False
        Me.XrConsumo.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.inDurLla")})
        Me.XrConsumo.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrConsumo.Name = "XrConsumo"
        Me.XrConsumo.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 3, 0, 0, 100.0!)
        Me.XrConsumo.StylePriority.UseBackColor = False
        Me.XrConsumo.StylePriority.UseFont = False
        Me.XrConsumo.StylePriority.UsePadding = False
        Me.XrConsumo.StylePriority.UseTextAlignment = False
        Me.XrConsumo.Text = "XrConsumo"
        Me.XrConsumo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrConsumo.Weight = 0.068474179277639657R
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
        Me.XrCosto.Weight = 0.07458031088504101R
        '
        'XrByteEnv
        '
        Me.XrByteEnv.BackColor = System.Drawing.Color.Transparent
        Me.XrByteEnv.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.inBytEnv")})
        Me.XrByteEnv.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrByteEnv.Name = "XrByteEnv"
        Me.XrByteEnv.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrByteEnv.StylePriority.UseBackColor = False
        Me.XrByteEnv.StylePriority.UseFont = False
        Me.XrByteEnv.StylePriority.UsePadding = False
        Me.XrByteEnv.StylePriority.UseTextAlignment = False
        Me.XrByteEnv.Text = "XrByteEnv"
        Me.XrByteEnv.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrByteEnv.Weight = 0.057745777417534713R
        '
        'XrByteRec
        '
        Me.XrByteRec.BackColor = System.Drawing.Color.Transparent
        Me.XrByteRec.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.inBytRec")})
        Me.XrByteRec.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrByteRec.Name = "XrByteRec"
        Me.XrByteRec.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrByteRec.StylePriority.UseBackColor = False
        Me.XrByteRec.StylePriority.UseFont = False
        Me.XrByteRec.StylePriority.UsePadding = False
        Me.XrByteRec.StylePriority.UseTextAlignment = False
        Me.XrByteRec.Text = "XrByteRec"
        Me.XrByteRec.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrByteRec.Weight = 0.062448620527171025R
        '
        'TopMargin
        '
        Me.TopMargin.HeightF = 30.0!
        Me.TopMargin.Name = "TopMargin"
        Me.TopMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.TopMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'BottomMargin
        '
        Me.BottomMargin.HeightF = 9.0!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel12, Me.XrLabel10, Me.xrLine1, Me.Titulo2, Me.xrPictureBoxLogo, Me.XrLabel1, Me.XrTable2})
        Me.PageHeader.HeightF = 209.9583!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrLabel12
        '
        Me.XrLabel12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo1")})
        Me.XrLabel12.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel12.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel12.LocationFloat = New DevExpress.Utils.PointFloat(148.9583!, 10.00001!)
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
        Me.XrLabel10.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 80.4272!)
        Me.XrLabel10.LockedInUserDesigner = True
        Me.XrLabel10.Name = "XrLabel10"
        Me.XrLabel10.Padding = New DevExpress.XtraPrinting.PaddingInfo(1, 1, 0, 0, 100.0!)
        Me.XrLabel10.SizeF = New System.Drawing.SizeF(827.9999!, 18.54167!)
        Me.XrLabel10.StylePriority.UseFont = False
        Me.XrLabel10.StylePriority.UseForeColor = False
        Me.XrLabel10.StylePriority.UsePadding = False
        Me.XrLabel10.Text = "XrLabel10"
        '
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 105.2189!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(828.0!, 9.0!)
        '
        'Titulo2
        '
        Me.Titulo2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfTitulo2")})
        Me.Titulo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.Titulo2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Titulo2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 55.63558!)
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
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 6.333351!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.9583!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'GroupHeader1
        '
        Me.GroupHeader1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageBreak1})
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("vcCodEmp", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.HeightF = 7.874966!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(2.083333!, 158.4167!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(829.0!, 51.54166!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell3, Me.XrTableCell4, Me.XrTableCell8, Me.XrTableCell2, Me.XrTableCell10, Me.XrTableCell7, Me.XrTableCell9, Me.XrTableCell5, Me.xrTituloCosto, Me.XrTableCell1, Me.XrTableCell6})
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
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.Text = "Fecha"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.082969528459394787R
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
        Me.XrTableCell4.Text = "Hora"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.091268025585721807R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell8.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell8.CanGrow = False
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseBorders = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UseTextAlignment = False
        Me.XrTableCell8.Text = "Sucursal"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell8.Weight = 0.0751854399731892R
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
        Me.XrTableCell2.Text = "Tipo #"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell2.Weight = 0.095881887496278R
        '
        'XrTableCell10
        '
        Me.XrTableCell10.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell10.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell10.CanGrow = False
        Me.XrTableCell10.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell10.Name = "XrTableCell10"
        Me.XrTableCell10.StylePriority.UseBackColor = False
        Me.XrTableCell10.StylePriority.UseBorders = False
        Me.XrTableCell10.StylePriority.UseFont = False
        Me.XrTableCell10.StylePriority.UseTextAlignment = False
        Me.XrTableCell10.Text = "Número"
        Me.XrTableCell10.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell10.Weight = 0.10574744665760456R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell7.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell7.CanGrow = False
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.StylePriority.UseBackColor = False
        Me.XrTableCell7.StylePriority.UseBorders = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UseTextAlignment = False
        Me.XrTableCell7.Text = "Empresa / Persona Llamada"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.12376341640716543R
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
        Me.XrTableCell9.Text = "Serv."
        Me.XrTableCell9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell9.Weight = 0.062821711780317965R
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
        Me.XrTableCell5.Weight = 0.093075549162893373R
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
        Me.xrTituloCosto.Weight = 0.10137564200061971R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell1.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell1.CanGrow = False
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.StylePriority.UseBackColor = False
        Me.XrTableCell1.StylePriority.UseBorders = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.StylePriority.UseTextAlignment = False
        Me.XrTableCell1.Text = "Bytes Enviado"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell1.Weight = 0.078492788313894044R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrTableCell6.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell6.CanGrow = False
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseBorders = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UseTextAlignment = False
        Me.XrTableCell6.Text = "Bytes Recibidos"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.084884995726555279R
        '
        'XrLabel1
        '
        Me.XrLabel1.BackColor = System.Drawing.Color.FromArgb(CType(CType(206, Byte), Integer), CType(CType(206, Byte), Integer), CType(CType(206, Byte), Integer))
        Me.XrLabel1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_IMP_Llamada_DetalleServicioCelDir.vcNomEmp")})
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel1.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 124.5833!)
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(827.9584!, 23.0!)
        Me.XrLabel1.StylePriority.UseBackColor = False
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.StylePriority.UseForeColor = False
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
        Me.GroupFooter1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTotalEmpleado, Me.XrLabel8})
        Me.GroupFooter1.HeightF = 25.00001!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'XrTotalEmpleado
        '
        Me.XrTotalEmpleado.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalEmpleado.BorderColor = System.Drawing.Color.White
        Me.XrTotalEmpleado.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrTotalEmpleado.CanGrow = False
        Me.XrTotalEmpleado.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalEmpleado.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalEmpleado.LocationFloat = New DevExpress.Utils.PointFloat(608.5503!, 0.0!)
        Me.XrTotalEmpleado.Name = "XrTotalEmpleado"
        Me.XrTotalEmpleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalEmpleado.SizeF = New System.Drawing.SizeF(84.39276!, 25.00001!)
        Me.XrTotalEmpleado.StylePriority.UseBackColor = False
        Me.XrTotalEmpleado.StylePriority.UseBorderColor = False
        Me.XrTotalEmpleado.StylePriority.UseBorders = False
        Me.XrTotalEmpleado.StylePriority.UseFont = False
        Me.XrTotalEmpleado.StylePriority.UseForeColor = False
        Me.XrTotalEmpleado.StylePriority.UsePadding = False
        Me.XrTotalEmpleado.StylePriority.UseTextAlignment = False
        Me.XrTotalEmpleado.Text = "XrTotalEmpleado"
        Me.XrTotalEmpleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrLabel8
        '
        Me.XrLabel8.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel8.BorderColor = System.Drawing.Color.White
        Me.XrLabel8.Borders = DevExpress.XtraPrinting.BorderSide.Left
        Me.XrLabel8.CanGrow = False
        Me.XrLabel8.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel8.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(429.7119!, 0.0!)
        Me.XrLabel8.Name = "XrLabel8"
        Me.XrLabel8.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLabel8.SizeF = New System.Drawing.SizeF(178.8384!, 25.00001!)
        Me.XrLabel8.StylePriority.UseBackColor = False
        Me.XrLabel8.StylePriority.UseBorderColor = False
        Me.XrLabel8.StylePriority.UseBorders = False
        Me.XrLabel8.StylePriority.UseFont = False
        Me.XrLabel8.StylePriority.UseForeColor = False
        Me.XrLabel8.StylePriority.UsePadding = False
        Me.XrLabel8.StylePriority.UseTextAlignment = False
        Me.XrLabel8.Text = "Total Empleado:"
        Me.XrLabel8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'DsReporteConsultas1
        '
        Me.DsReporteConsultas1.DataSetName = "dsReporteConsultas"
        Me.DsReporteConsultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MoV_s_IMP_Llamada_DetalleServicioCelDirTableAdapter1
        '
        Me.MoV_s_IMP_Llamada_DetalleServicioCelDirTableAdapter1.ClearBeforeFill = True
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
        Me.PageFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrPageInfo2, Me.XrLabel6, Me.XrPageInfo1, Me.LBLUsuario, Me.XrLabel4, Me.LBLEmpresa, Me.XrLabel5, Me.XrLine2})
        Me.PageFooter.Name = "PageFooter"
        '
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(352.7269!, 24.87494!)
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
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.CanGrow = False
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(2.083333!, 49.25003!)
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
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(746.3843!, 24.87494!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(82.61566!, 23.0!)
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
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(73.28484!, 49.25003!)
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
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel4.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(641.176!, 24.87494!)
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
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.CanGrow = False
        Me.LBLEmpresa.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "cfEmpresa")})
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(73.28482!, 24.25003!)
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
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.CanGrow = False
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(2.083333!, 24.25003!)
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
        'XrLine2
        '
        Me.XrLine2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLine2.LineWidth = 2
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(2.083333!, 3.374958!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(825.9166!, 9.0!)
        '
        'XrLabel13
        '
        Me.XrLabel13.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel13.BorderColor = System.Drawing.Color.White
        Me.XrLabel13.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrLabel13.CanGrow = False
        Me.XrLabel13.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel13.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrLabel13.LocationFloat = New DevExpress.Utils.PointFloat(355.047!, 10.00004!)
        Me.XrLabel13.Name = "XrLabel13"
        Me.XrLabel13.Padding = New DevExpress.XtraPrinting.PaddingInfo(10, 2, 0, 0, 100.0!)
        Me.XrLabel13.SizeF = New System.Drawing.SizeF(253.4729!, 22.99997!)
        Me.XrLabel13.StylePriority.UseBackColor = False
        Me.XrLabel13.StylePriority.UseBorderColor = False
        Me.XrLabel13.StylePriority.UseBorders = False
        Me.XrLabel13.StylePriority.UseFont = False
        Me.XrLabel13.StylePriority.UseForeColor = False
        Me.XrLabel13.StylePriority.UsePadding = False
        Me.XrLabel13.StylePriority.UseTextAlignment = False
        Me.XrLabel13.Text = "Total General"
        Me.XrLabel13.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrTotalGeneral
        '
        Me.XrTotalGeneral.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrTotalGeneral.BorderColor = System.Drawing.Color.White
        Me.XrTotalGeneral.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top), DevExpress.XtraPrinting.BorderSide)
        Me.XrTotalGeneral.CanGrow = False
        Me.XrTotalGeneral.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTotalGeneral.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.XrTotalGeneral.LocationFloat = New DevExpress.Utils.PointFloat(608.5503!, 9.999974!)
        Me.XrTotalGeneral.Name = "XrTotalGeneral"
        Me.XrTotalGeneral.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 3, 0, 0, 100.0!)
        Me.XrTotalGeneral.SizeF = New System.Drawing.SizeF(84.42737!, 23.0!)
        Me.XrTotalGeneral.StylePriority.UseBackColor = False
        Me.XrTotalGeneral.StylePriority.UseBorderColor = False
        Me.XrTotalGeneral.StylePriority.UseBorders = False
        Me.XrTotalGeneral.StylePriority.UseFont = False
        Me.XrTotalGeneral.StylePriority.UseForeColor = False
        Me.XrTotalGeneral.StylePriority.UsePadding = False
        Me.XrTotalGeneral.StylePriority.UseTextAlignment = False
        Me.XrTotalGeneral.Text = "XrTotalGeneral"
        Me.XrTotalGeneral.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'ReportFooter
        '
        Me.ReportFooter.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTotalGeneral, Me.XrLabel13})
        Me.ReportFooter.HeightF = 33.00001!
        Me.ReportFooter.Name = "ReportFooter"
        '
        'XRPT_Con_Rpt_DetalleServicioPorEmp
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.GroupHeader1, Me.GroupFooter1, Me.PageFooter, Me.ReportFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.cfTitulo1, Me.cfTitulo2, Me.cfTitulo3, Me.cfEmpresa, Me.cfUsuario})
        Me.DataAdapter = Me.MoV_s_IMP_Llamada_DetalleServicioCelDirTableAdapter1
        Me.DataMember = "MOV_s_IMP_Llamada_DetalleServicioCelDir"
        Me.DataSource = Me.DsReporteConsultas1
        Me.Margins = New System.Drawing.Printing.Margins(8, 9, 30, 9)
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
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents Titulo2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents DsReporteConsultas1 As dsReporteConsultas
    Friend WithEvents MoV_s_IMP_Llamada_DetalleServicioCelDirTableAdapter1 As dsReporteConsultasTableAdapters.MOV_s_IMP_Llamada_DetalleServicioCelDirTableAdapter
    Friend WithEvents cfTitulo1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo2 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfTitulo3 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfEmpresa As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents cfUsuario As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents PageFooter As DevExpress.XtraReports.UI.PageFooterBand
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageBreak1 As DevExpress.XtraReports.UI.XRPageBreak
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrFecha As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrHora As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrConsumo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCosto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTotalEmpleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel13 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrTotalGeneral As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell10 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell9 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrSucursal As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTipo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrNumero As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrEmpresa As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrByteEnv As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrByteRec As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrServ As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents ReportFooter As DevExpress.XtraReports.UI.ReportFooterBand
End Class
