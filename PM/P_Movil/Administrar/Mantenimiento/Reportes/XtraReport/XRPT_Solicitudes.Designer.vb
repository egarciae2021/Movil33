<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Solicitudes
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(XRPT_Solicitudes))
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.XrLabel13 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel12 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel11 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel10 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel9 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel8 = New DevExpress.XtraReports.UI.XRLabel()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.XrLabel3 = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLUsuario = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrPageInfo2 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.LBLEmpresa = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel6 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel5 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLine2 = New DevExpress.XtraReports.UI.XRLine()
        Me.XrPageInfo1 = New DevExpress.XtraReports.UI.XRPageInfo()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrLabel2 = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXT_TipoSolicitud = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel4 = New DevExpress.XtraReports.UI.XRLabel()
        Me.XrLabel1 = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXT_EstadoProceso = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTEstadoApro = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLestado = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLcuenta = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXT_RangoFechas = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLorganizacion = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTorganizacion = New DevExpress.XtraReports.UI.XRLabel()
        Me.TXTempleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.LBLempleado = New DevExpress.XtraReports.UI.XRLabel()
        Me.xrLine1 = New DevExpress.XtraReports.UI.XRLine()
        Me.xrPictureBoxLogo = New DevExpress.XtraReports.UI.XRPictureBox()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMonto = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Procedimiento1 = New Procedimiento()
        Me.MOV_s_ListaEmpleadoTableAdapter = New ProcedimientoTableAdapters.MOV_s_ListaEmpleadoTableAdapter()
        Me.GroupHeader1 = New DevExpress.XtraReports.UI.GroupHeaderBand()
        Me.XrLabel7 = New DevExpress.XtraReports.UI.XRLabel()
        Me.GroupFooter1 = New DevExpress.XtraReports.UI.GroupFooterBand()
        Me.CalculatedField1 = New DevExpress.XtraReports.UI.CalculatedField()
        Me.Mov_s_Listar_Empleados_X_Filtro_MultiplesTableAdapter1 = New ProcedimientoTableAdapters.Mov_s_Listar_Empleados_X_Filtro_MultiplesTableAdapter()
        Me.ReportFooter = New DevExpress.XtraReports.UI.ReportFooterBand()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel13, Me.XrLabel12, Me.XrLabel11, Me.XrLabel10, Me.XrLabel9, Me.XrLabel8})
        Me.Detail.HeightF = 27.08333!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.SortFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("TipoSolicitud", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrLabel13
        '
        Me.XrLabel13.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "Mov_s_Listar_Empleados_X_Filtro_Multiples.Estado_Proceso")})
        Me.XrLabel13.Font = New System.Drawing.Font("Trebuchet MS", 6.75!)
        Me.XrLabel13.LocationFloat = New DevExpress.Utils.PointFloat(665.7465!, 0.0!)
        Me.XrLabel13.Name = "XrLabel13"
        Me.XrLabel13.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel13.SizeF = New System.Drawing.SizeF(100.0!, 23.0!)
        Me.XrLabel13.StylePriority.UseFont = False
        Me.XrLabel13.StylePriority.UseTextAlignment = False
        Me.XrLabel13.Text = "XrLabel13"
        Me.XrLabel13.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLabel12
        '
        Me.XrLabel12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "Mov_s_Listar_Empleados_X_Filtro_Multiples.Monto", "{0:###,##0.00}")})
        Me.XrLabel12.Font = New System.Drawing.Font("Trebuchet MS", 6.75!)
        Me.XrLabel12.LocationFloat = New DevExpress.Utils.PointFloat(766.1055!, 0.0!)
        Me.XrLabel12.Name = "XrLabel12"
        Me.XrLabel12.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel12.SizeF = New System.Drawing.SizeF(66.77112!, 23.0!)
        Me.XrLabel12.StylePriority.UseFont = False
        Me.XrLabel12.StylePriority.UseTextAlignment = False
        Me.XrLabel12.Text = "XrLabel12"
        Me.XrLabel12.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'XrLabel11
        '
        Me.XrLabel11.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "Mov_s_Listar_Empleados_X_Filtro_Multiples.Estado_Aprobacion")})
        Me.XrLabel11.Font = New System.Drawing.Font("Trebuchet MS", 6.75!)
        Me.XrLabel11.LocationFloat = New DevExpress.Utils.PointFloat(539.4968!, 0.0!)
        Me.XrLabel11.Name = "XrLabel11"
        Me.XrLabel11.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel11.SizeF = New System.Drawing.SizeF(126.2498!, 23.0!)
        Me.XrLabel11.StylePriority.UseFont = False
        Me.XrLabel11.StylePriority.UseTextAlignment = False
        Me.XrLabel11.Text = "XrLabel11"
        Me.XrLabel11.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLabel10
        '
        Me.XrLabel10.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "Mov_s_Listar_Empleados_X_Filtro_Multiples.Empleado")})
        Me.XrLabel10.Font = New System.Drawing.Font("Trebuchet MS", 6.75!)
        Me.XrLabel10.LocationFloat = New DevExpress.Utils.PointFloat(218.6465!, 0.333341!)
        Me.XrLabel10.Name = "XrLabel10"
        Me.XrLabel10.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel10.SizeF = New System.Drawing.SizeF(320.8503!, 23.0!)
        Me.XrLabel10.StylePriority.UseFont = False
        Me.XrLabel10.StylePriority.UseTextAlignment = False
        Me.XrLabel10.Text = "XrLabel10"
        Me.XrLabel10.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel9
        '
        Me.XrLabel9.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "Mov_s_Listar_Empleados_X_Filtro_Multiples.FechaCreacion", "{0:dd/MM/yyyy HH:mm}")})
        Me.XrLabel9.Font = New System.Drawing.Font("Trebuchet MS", 6.75!)
        Me.XrLabel9.LocationFloat = New DevExpress.Utils.PointFloat(107.5871!, 0.0!)
        Me.XrLabel9.Name = "XrLabel9"
        Me.XrLabel9.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel9.SizeF = New System.Drawing.SizeF(111.0594!, 23.0!)
        Me.XrLabel9.StylePriority.UseFont = False
        Me.XrLabel9.StylePriority.UseTextAlignment = False
        Me.XrLabel9.Text = "XrLabel9"
        Me.XrLabel9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'XrLabel8
        '
        Me.XrLabel8.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "Mov_s_Listar_Empleados_X_Filtro_Multiples.Codigo")})
        Me.XrLabel8.Font = New System.Drawing.Font("Trebuchet MS", 6.75!)
        Me.XrLabel8.LocationFloat = New DevExpress.Utils.PointFloat(2.123411!, 0.0!)
        Me.XrLabel8.Name = "XrLabel8"
        Me.XrLabel8.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel8.SizeF = New System.Drawing.SizeF(105.4636!, 23.0!)
        Me.XrLabel8.StylePriority.UseFont = False
        Me.XrLabel8.StylePriority.UseTextAlignment = False
        Me.XrLabel8.Text = "XrLabel8"
        Me.XrLabel8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
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
        Me.BottomMargin.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel3, Me.LBLUsuario, Me.XrPageInfo2, Me.LBLEmpresa, Me.XrLabel6, Me.XrLabel5, Me.XrLine2, Me.XrPageInfo1})
        Me.BottomMargin.HeightF = 89.0!
        Me.BottomMargin.Name = "BottomMargin"
        Me.BottomMargin.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.BottomMargin.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrLabel3
        '
        Me.XrLabel3.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel3.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel3.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel3.LocationFloat = New DevExpress.Utils.PointFloat(638.3645!, 25.33334!)
        Me.XrLabel3.Name = "XrLabel3"
        Me.XrLabel3.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel3.SizeF = New System.Drawing.SizeF(105.2083!, 23.0!)
        Me.XrLabel3.StylePriority.UseBackColor = False
        Me.XrLabel3.StylePriority.UseFont = False
        Me.XrLabel3.StylePriority.UseForeColor = False
        Me.XrLabel3.StylePriority.UseTextAlignment = False
        Me.XrLabel3.Text = "Fecha:"
        Me.XrLabel3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        '
        'LBLUsuario
        '
        Me.LBLUsuario.BackColor = System.Drawing.Color.Transparent
        Me.LBLUsuario.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLUsuario.ForeColor = System.Drawing.Color.Navy
        Me.LBLUsuario.LocationFloat = New DevExpress.Utils.PointFloat(71.20152!, 48.87498!)
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
        'XrPageInfo2
        '
        Me.XrPageInfo2.BackColor = System.Drawing.Color.Transparent
        Me.XrPageInfo2.BorderColor = System.Drawing.Color.SteelBlue
        Me.XrPageInfo2.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.XrPageInfo2.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo2.Format = "Página {0} de {1}"
        Me.XrPageInfo2.LocationFloat = New DevExpress.Utils.PointFloat(339.4731!, 25.33334!)
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
        'LBLEmpresa
        '
        Me.LBLEmpresa.BackColor = System.Drawing.Color.Transparent
        Me.LBLEmpresa.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.LBLEmpresa.ForeColor = System.Drawing.Color.Navy
        Me.LBLEmpresa.LocationFloat = New DevExpress.Utils.PointFloat(71.20152!, 25.33328!)
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
        'XrLabel6
        '
        Me.XrLabel6.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel6.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel6.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel6.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 48.87498!)
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
        'XrLabel5
        '
        Me.XrLabel5.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel5.Font = New System.Drawing.Font("Trebuchet MS", 10.0!)
        Me.XrLabel5.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel5.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 25.33328!)
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
        Me.XrLine2.LocationFloat = New DevExpress.Utils.PointFloat(1.036485!, 15.04165!)
        Me.XrLine2.Name = "XrLine2"
        Me.XrLine2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrLine2.SizeF = New System.Drawing.SizeF(829.8332!, 10.29169!)
        '
        'XrPageInfo1
        '
        Me.XrPageInfo1.Font = New System.Drawing.Font("Trebuchet MS", 10.0!, System.Drawing.FontStyle.Bold)
        Me.XrPageInfo1.ForeColor = System.Drawing.Color.Navy
        Me.XrPageInfo1.Format = "{0:dd/MM/yyyy}"
        Me.XrPageInfo1.LocationFloat = New DevExpress.Utils.PointFloat(743.5728!, 25.33334!)
        Me.XrPageInfo1.Name = "XrPageInfo1"
        Me.XrPageInfo1.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrPageInfo1.PageInfo = DevExpress.XtraPrinting.PageInfo.DateTime
        Me.XrPageInfo1.SizeF = New System.Drawing.SizeF(83.07391!, 23.0!)
        Me.XrPageInfo1.StylePriority.UseFont = False
        Me.XrPageInfo1.StylePriority.UseForeColor = False
        Me.XrPageInfo1.StylePriority.UseTextAlignment = False
        Me.XrPageInfo1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel2, Me.TXT_TipoSolicitud, Me.XrLabel4, Me.XrLabel1, Me.TXT_EstadoProceso, Me.TXTEstadoApro, Me.LBLestado, Me.LBLcuenta, Me.TXT_RangoFechas, Me.LBLorganizacion, Me.TXTorganizacion, Me.TXTempleado, Me.LBLempleado, Me.xrLine1, Me.xrPictureBoxLogo})
        Me.PageHeader.HeightF = 165.3749!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrLabel2
        '
        Me.XrLabel2.BackColor = System.Drawing.Color.Transparent
        Me.XrLabel2.BorderColor = System.Drawing.Color.White
        Me.XrLabel2.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrLabel2.Font = New System.Drawing.Font("Trebuchet MS", 16.0!, System.Drawing.FontStyle.Bold)
        Me.XrLabel2.ForeColor = System.Drawing.Color.FromArgb(CType(CType(243, Byte), Integer), CType(CType(120, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.XrLabel2.LocationFloat = New DevExpress.Utils.PointFloat(10.00001!, 6.333351!)
        Me.XrLabel2.Name = "XrLabel2"
        Me.XrLabel2.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.XrLabel2.SizeF = New System.Drawing.SizeF(640.1669!, 41.66665!)
        Me.XrLabel2.StylePriority.UseBackColor = False
        Me.XrLabel2.StylePriority.UseFont = False
        Me.XrLabel2.StylePriority.UseForeColor = False
        Me.XrLabel2.StylePriority.UsePadding = False
        Me.XrLabel2.StylePriority.UseTextAlignment = False
        Me.XrLabel2.Text = "REPORTE DE SOLICITUDES"
        Me.XrLabel2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'TXT_TipoSolicitud
        '
        Me.TXT_TipoSolicitud.BackColor = System.Drawing.Color.Transparent
        Me.TXT_TipoSolicitud.BorderColor = System.Drawing.Color.White
        Me.TXT_TipoSolicitud.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXT_TipoSolicitud.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXT_TipoSolicitud.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXT_TipoSolicitud.LocationFloat = New DevExpress.Utils.PointFloat(548.6881!, 77.75002!)
        Me.TXT_TipoSolicitud.Name = "TXT_TipoSolicitud"
        Me.TXT_TipoSolicitud.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXT_TipoSolicitud.SizeF = New System.Drawing.SizeF(277.9586!, 24.99999!)
        Me.TXT_TipoSolicitud.StylePriority.UseBackColor = False
        Me.TXT_TipoSolicitud.StylePriority.UseFont = False
        Me.TXT_TipoSolicitud.StylePriority.UseForeColor = False
        Me.TXT_TipoSolicitud.StylePriority.UsePadding = False
        Me.TXT_TipoSolicitud.Text = "(TODOS)"
        Me.TXT_TipoSolicitud.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel4
        '
        Me.XrLabel4.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLabel4.BorderColor = System.Drawing.Color.White
        Me.XrLabel4.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrLabel4.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrLabel4.ForeColor = System.Drawing.Color.White
        Me.XrLabel4.LocationFloat = New DevExpress.Utils.PointFloat(434.855!, 77.75008!)
        Me.XrLabel4.Name = "XrLabel4"
        Me.XrLabel4.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.XrLabel4.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.XrLabel4.StylePriority.UseBackColor = False
        Me.XrLabel4.StylePriority.UseBorders = False
        Me.XrLabel4.StylePriority.UseFont = False
        Me.XrLabel4.StylePriority.UseForeColor = False
        Me.XrLabel4.StylePriority.UsePadding = False
        Me.XrLabel4.StylePriority.UseTextAlignment = False
        Me.XrLabel4.Text = "Tipo Solicitud:"
        Me.XrLabel4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'XrLabel1
        '
        Me.XrLabel1.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.XrLabel1.BorderColor = System.Drawing.Color.White
        Me.XrLabel1.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrLabel1.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrLabel1.ForeColor = System.Drawing.Color.White
        Me.XrLabel1.LocationFloat = New DevExpress.Utils.PointFloat(434.8549!, 127.7501!)
        Me.XrLabel1.Name = "XrLabel1"
        Me.XrLabel1.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.XrLabel1.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.XrLabel1.StylePriority.UseBackColor = False
        Me.XrLabel1.StylePriority.UseBorders = False
        Me.XrLabel1.StylePriority.UseFont = False
        Me.XrLabel1.StylePriority.UseForeColor = False
        Me.XrLabel1.StylePriority.UsePadding = False
        Me.XrLabel1.StylePriority.UseTextAlignment = False
        Me.XrLabel1.Text = "Estado Proceso:"
        Me.XrLabel1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXT_EstadoProceso
        '
        Me.TXT_EstadoProceso.BackColor = System.Drawing.Color.Transparent
        Me.TXT_EstadoProceso.BorderColor = System.Drawing.Color.White
        Me.TXT_EstadoProceso.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXT_EstadoProceso.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXT_EstadoProceso.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXT_EstadoProceso.LocationFloat = New DevExpress.Utils.PointFloat(548.6883!, 127.7501!)
        Me.TXT_EstadoProceso.Name = "TXT_EstadoProceso"
        Me.TXT_EstadoProceso.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXT_EstadoProceso.SizeF = New System.Drawing.SizeF(277.9584!, 25.0!)
        Me.TXT_EstadoProceso.StylePriority.UseBackColor = False
        Me.TXT_EstadoProceso.StylePriority.UseFont = False
        Me.TXT_EstadoProceso.StylePriority.UseForeColor = False
        Me.TXT_EstadoProceso.StylePriority.UsePadding = False
        Me.TXT_EstadoProceso.Text = "(TODOS)"
        Me.TXT_EstadoProceso.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXTEstadoApro
        '
        Me.TXTEstadoApro.BackColor = System.Drawing.Color.Transparent
        Me.TXTEstadoApro.BorderColor = System.Drawing.Color.White
        Me.TXTEstadoApro.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTEstadoApro.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTEstadoApro.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTEstadoApro.LocationFloat = New DevExpress.Utils.PointFloat(117.6048!, 127.75!)
        Me.TXTEstadoApro.Name = "TXTEstadoApro"
        Me.TXTEstadoApro.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTEstadoApro.SizeF = New System.Drawing.SizeF(317.2502!, 25.0!)
        Me.TXTEstadoApro.StylePriority.UseBackColor = False
        Me.TXTEstadoApro.StylePriority.UseFont = False
        Me.TXTEstadoApro.StylePriority.UseForeColor = False
        Me.TXTEstadoApro.StylePriority.UsePadding = False
        Me.TXTEstadoApro.Text = "(TODOS)"
        Me.TXTEstadoApro.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLestado
        '
        Me.LBLestado.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLestado.BorderColor = System.Drawing.Color.White
        Me.LBLestado.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLestado.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLestado.ForeColor = System.Drawing.Color.White
        Me.LBLestado.LocationFloat = New DevExpress.Utils.PointFloat(3.7714!, 127.75!)
        Me.LBLestado.Name = "LBLestado"
        Me.LBLestado.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLestado.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLestado.StylePriority.UseBackColor = False
        Me.LBLestado.StylePriority.UseBorders = False
        Me.LBLestado.StylePriority.UseFont = False
        Me.LBLestado.StylePriority.UseForeColor = False
        Me.LBLestado.StylePriority.UsePadding = False
        Me.LBLestado.StylePriority.UseTextAlignment = False
        Me.LBLestado.Text = "Estado Aprobación:"
        Me.LBLestado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLcuenta
        '
        Me.LBLcuenta.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLcuenta.BorderColor = System.Drawing.Color.White
        Me.LBLcuenta.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLcuenta.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLcuenta.ForeColor = System.Drawing.Color.White
        Me.LBLcuenta.LocationFloat = New DevExpress.Utils.PointFloat(434.8549!, 102.7501!)
        Me.LBLcuenta.Name = "LBLcuenta"
        Me.LBLcuenta.Padding = New DevExpress.XtraPrinting.PaddingInfo(8, 0, 0, 0, 100.0!)
        Me.LBLcuenta.SizeF = New System.Drawing.SizeF(113.8333!, 25.0!)
        Me.LBLcuenta.StylePriority.UseBackColor = False
        Me.LBLcuenta.StylePriority.UseBorders = False
        Me.LBLcuenta.StylePriority.UseFont = False
        Me.LBLcuenta.StylePriority.UseForeColor = False
        Me.LBLcuenta.StylePriority.UsePadding = False
        Me.LBLcuenta.StylePriority.UseTextAlignment = False
        Me.LBLcuenta.Text = "Rango de Fechas:"
        Me.LBLcuenta.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXT_RangoFechas
        '
        Me.TXT_RangoFechas.BackColor = System.Drawing.Color.Transparent
        Me.TXT_RangoFechas.BorderColor = System.Drawing.Color.White
        Me.TXT_RangoFechas.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXT_RangoFechas.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXT_RangoFechas.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXT_RangoFechas.LocationFloat = New DevExpress.Utils.PointFloat(548.6882!, 102.7501!)
        Me.TXT_RangoFechas.Name = "TXT_RangoFechas"
        Me.TXT_RangoFechas.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXT_RangoFechas.SizeF = New System.Drawing.SizeF(277.9586!, 24.99999!)
        Me.TXT_RangoFechas.StylePriority.UseBackColor = False
        Me.TXT_RangoFechas.StylePriority.UseFont = False
        Me.TXT_RangoFechas.StylePriority.UseForeColor = False
        Me.TXT_RangoFechas.StylePriority.UsePadding = False
        Me.TXT_RangoFechas.Text = "(TODOS)"
        Me.TXT_RangoFechas.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLorganizacion
        '
        Me.LBLorganizacion.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLorganizacion.BorderColor = System.Drawing.Color.White
        Me.LBLorganizacion.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLorganizacion.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLorganizacion.ForeColor = System.Drawing.Color.White
        Me.LBLorganizacion.LocationFloat = New DevExpress.Utils.PointFloat(3.7714!, 102.7501!)
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
        'TXTorganizacion
        '
        Me.TXTorganizacion.BackColor = System.Drawing.Color.Transparent
        Me.TXTorganizacion.BorderColor = System.Drawing.Color.White
        Me.TXTorganizacion.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTorganizacion.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTorganizacion.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTorganizacion.LocationFloat = New DevExpress.Utils.PointFloat(117.6047!, 102.7501!)
        Me.TXTorganizacion.Name = "TXTorganizacion"
        Me.TXTorganizacion.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTorganizacion.SizeF = New System.Drawing.SizeF(317.2502!, 24.99999!)
        Me.TXTorganizacion.StylePriority.UseBackColor = False
        Me.TXTorganizacion.StylePriority.UseFont = False
        Me.TXTorganizacion.StylePriority.UseForeColor = False
        Me.TXTorganizacion.StylePriority.UsePadding = False
        Me.TXTorganizacion.Text = "(TODOS)"
        Me.TXTorganizacion.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'TXTempleado
        '
        Me.TXTempleado.BackColor = System.Drawing.Color.Transparent
        Me.TXTempleado.BorderColor = System.Drawing.Color.White
        Me.TXTempleado.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.TXTempleado.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TXTempleado.ForeColor = System.Drawing.SystemColors.WindowText
        Me.TXTempleado.LocationFloat = New DevExpress.Utils.PointFloat(117.6047!, 77.75002!)
        Me.TXTempleado.Name = "TXTempleado"
        Me.TXTempleado.Padding = New DevExpress.XtraPrinting.PaddingInfo(6, 0, 0, 0, 100.0!)
        Me.TXTempleado.SizeF = New System.Drawing.SizeF(317.2503!, 25.0!)
        Me.TXTempleado.StylePriority.UseBackColor = False
        Me.TXTempleado.StylePriority.UseFont = False
        Me.TXTempleado.StylePriority.UseForeColor = False
        Me.TXTempleado.StylePriority.UsePadding = False
        Me.TXTempleado.Text = "(TODOS)"
        Me.TXTempleado.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        '
        'LBLempleado
        '
        Me.LBLempleado.BackColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.LBLempleado.BorderColor = System.Drawing.Color.White
        Me.LBLempleado.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.LBLempleado.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.LBLempleado.ForeColor = System.Drawing.Color.White
        Me.LBLempleado.LocationFloat = New DevExpress.Utils.PointFloat(3.7714!, 77.75002!)
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
        'xrLine1
        '
        Me.xrLine1.ForeColor = System.Drawing.Color.FromArgb(CType(CType(84, Byte), Integer), CType(CType(132, Byte), Integer), CType(CType(213, Byte), Integer))
        Me.xrLine1.LineWidth = 2
        Me.xrLine1.LocationFloat = New DevExpress.Utils.PointFloat(2.123413!, 59.375!)
        Me.xrLine1.Name = "xrLine1"
        Me.xrLine1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrLine1.SizeF = New System.Drawing.SizeF(832.8766!, 9.0!)
        '
        'xrPictureBoxLogo
        '
        Me.xrPictureBoxLogo.Borders = DevExpress.XtraPrinting.BorderSide.None
        Me.xrPictureBoxLogo.Image = CType(resources.GetObject("xrPictureBoxLogo.Image"), System.Drawing.Image)
        Me.xrPictureBoxLogo.LocationFloat = New DevExpress.Utils.PointFloat(683.9183!, 6.333351!)
        Me.xrPictureBoxLogo.Name = "xrPictureBoxLogo"
        Me.xrPictureBoxLogo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrPictureBoxLogo.SizeF = New System.Drawing.SizeF(148.9583!, 41.66665!)
        Me.xrPictureBoxLogo.Sizing = DevExpress.XtraPrinting.ImageSizeMode.StretchImage
        Me.xrPictureBoxLogo.StylePriority.UseBorders = False
        '
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(2.123387!, 28.54166!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(830.7532!, 22.99998!)
        Me.XrTable2.StylePriority.UseBackColor = False
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell3, Me.XrTableCell4, Me.XrTableCell5, Me.XrTableCell6, Me.XrTableCell7, Me.xrTituloMonto})
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
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrTableCell3.StylePriority.UseBackColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UseForeColor = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.Text = "Código"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell3.Weight = 0.14303386665671847R
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
        Me.XrTableCell4.Text = "Fecha"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell4.Weight = 0.15398958387391229R
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
        Me.XrTableCell5.Text = "Empleado"
        Me.XrTableCell5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell5.Weight = 0.4351494324646189R
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
        Me.XrTableCell6.Text = "Estado Aprobación"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.17122495706308158R
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
        Me.XrTableCell7.Text = "Estado Proceso"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.13562392641780746R
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
        Me.xrTituloMonto.Weight = 0.087677710286112084R
        '
        'Procedimiento1
        '
        Me.Procedimiento1.DataSetName = "Procedimiento"
        Me.Procedimiento1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_ListaEmpleadoTableAdapter
        '
        Me.MOV_s_ListaEmpleadoTableAdapter.ClearBeforeFill = True
        '
        'GroupHeader1
        '
        Me.GroupHeader1.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrLabel7, Me.XrTable2})
        Me.GroupHeader1.GroupFields.AddRange(New DevExpress.XtraReports.UI.GroupField() {New DevExpress.XtraReports.UI.GroupField("TipoSolicitud", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)})
        Me.GroupHeader1.GroupUnion = DevExpress.XtraReports.UI.GroupUnion.WholePage
        Me.GroupHeader1.HeightF = 51.54164!
        Me.GroupHeader1.Name = "GroupHeader1"
        '
        'XrLabel7
        '
        Me.XrLabel7.BackColor = System.Drawing.Color.FromArgb(CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer), CType(CType(242, Byte), Integer))
        Me.XrLabel7.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "Mov_s_Listar_Empleados_X_Filtro_Multiples.TipoSolicitud")})
        Me.XrLabel7.Font = New System.Drawing.Font("Trebuchet MS", 9.75!, System.Drawing.FontStyle.Bold)
        Me.XrLabel7.ForeColor = System.Drawing.Color.Navy
        Me.XrLabel7.LocationFloat = New DevExpress.Utils.PointFloat(4.771417!, 5.000007!)
        Me.XrLabel7.Name = "XrLabel7"
        Me.XrLabel7.Padding = New DevExpress.XtraPrinting.PaddingInfo(2, 2, 0, 0, 100.0!)
        Me.XrLabel7.SizeF = New System.Drawing.SizeF(822.8752!, 18.0!)
        Me.XrLabel7.StylePriority.UseBackColor = False
        Me.XrLabel7.StylePriority.UseFont = False
        Me.XrLabel7.StylePriority.UseForeColor = False
        Me.XrLabel7.StylePriority.UseTextAlignment = False
        Me.XrLabel7.Text = "XrLabel7"
        Me.XrLabel7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        '
        'GroupFooter1
        '
        Me.GroupFooter1.HeightF = 0.0!
        Me.GroupFooter1.Name = "GroupFooter1"
        '
        'CalculatedField1
        '
        Me.CalculatedField1.Name = "CalculatedField1"
        '
        'Mov_s_Listar_Empleados_X_Filtro_MultiplesTableAdapter1
        '
        Me.Mov_s_Listar_Empleados_X_Filtro_MultiplesTableAdapter1.ClearBeforeFill = True
        '
        'ReportFooter
        '
        Me.ReportFooter.HeightF = 14.58333!
        Me.ReportFooter.Name = "ReportFooter"
        '
        'XRPT_Solicitudes
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader, Me.GroupHeader1, Me.GroupFooter1, Me.ReportFooter})
        Me.CalculatedFields.AddRange(New DevExpress.XtraReports.UI.CalculatedField() {Me.CalculatedField1})
        Me.DataAdapter = Me.Mov_s_Listar_Empleados_X_Filtro_MultiplesTableAdapter1
        Me.DataMember = "Mov_s_Listar_Empleados_X_Filtro_Multiples"
        Me.DataSource = Me.Procedimiento1
        Me.Margins = New System.Drawing.Printing.Margins(5, 10, 0, 89)
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.Version = "12.2"
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Procedimiento1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents xrPictureBoxLogo As DevExpress.XtraReports.UI.XRPictureBox
    Friend WithEvents xrLine1 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents LBLcuenta As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXT_RangoFechas As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLorganizacion As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTorganizacion As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTempleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLempleado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXTEstadoApro As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLestado As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXT_TipoSolicitud As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel4 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel1 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents TXT_EstadoProceso As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel3 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents LBLUsuario As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrPageInfo2 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents LBLEmpresa As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel6 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel5 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLine2 As DevExpress.XtraReports.UI.XRLine
    Friend WithEvents XrPageInfo1 As DevExpress.XtraReports.UI.XRPageInfo
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMonto As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Procedimiento1 As Procedimiento
    Friend WithEvents MOV_s_ListaEmpleadoTableAdapter As ProcedimientoTableAdapters.MOV_s_ListaEmpleadoTableAdapter
    Friend WithEvents XrLabel13 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel12 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel11 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel10 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel9 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents XrLabel8 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents GroupHeader1 As DevExpress.XtraReports.UI.GroupHeaderBand
    Friend WithEvents GroupFooter1 As DevExpress.XtraReports.UI.GroupFooterBand
    Friend WithEvents CalculatedField1 As DevExpress.XtraReports.UI.CalculatedField
    Friend WithEvents XrLabel2 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents Mov_s_Listar_Empleados_X_Filtro_MultiplesTableAdapter1 As ProcedimientoTableAdapters.Mov_s_Listar_Empleados_X_Filtro_MultiplesTableAdapter
    Friend WithEvents XrLabel7 As DevExpress.XtraReports.UI.XRLabel
    Friend WithEvents ReportFooter As DevExpress.XtraReports.UI.ReportFooterBand
End Class
