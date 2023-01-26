<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Lineas_LineasAgrupados
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
        Me.Detail = New DevExpress.XtraReports.UI.DetailBand()
        Me.xrTable7 = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow9 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.xrTableCell36 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCantidadDet = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell1 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell3 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell4 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell12 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrMontoDet = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell5 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell10 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell9 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell11 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMontoDeta = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Consultas1 = New Consultas()
        Me.MOV_s_CuentasLineas_Reporte_LineasAgrupadasTableAdapter = New ConsultasTableAdapters.MOV_s_CuentasLineas_Reporte_LineasAgrupadasTableAdapter()
        Me.CuentaID = New DevExpress.XtraReports.Parameters.Parameter()
        Me.File1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTable7})
        Me.Detail.HeightF = 20.0000095!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTable7
        '
        Me.xrTable7.BackColor = System.Drawing.Color.Transparent
        Me.xrTable7.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrTable7.Name = "xrTable7"
        Me.xrTable7.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTable7.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow9})
        Me.xrTable7.SizeF = New System.Drawing.SizeF(727.409973!, 20.0000095!)
        Me.xrTable7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow9
        '
        Me.xrTableRow9.Borders = DevExpress.XtraPrinting.BorderSide.Right
        Me.xrTableRow9.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.xrTableCell36, Me.XrCantidadDet, Me.XrTableCell2, Me.XrTableCell1, Me.XrTableCell3, Me.XrTableCell4, Me.XrTableCell12, Me.XrMontoDet})
        Me.xrTableRow9.Name = "xrTableRow9"
        Me.xrTableRow9.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow9.Weight = 1.0R
        '
        'xrTableCell36
        '
        Me.xrTableCell36.BackColor = System.Drawing.Color.Transparent
        Me.xrTableCell36.BorderColor = System.Drawing.Color.LightGray
        Me.xrTableCell36.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableCell36.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_CuentasLineas_Reporte_LineasAgrupadas.P_vcNUM")})
        Me.xrTableCell36.EvenStyleName = "File1"
        Me.xrTableCell36.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.xrTableCell36.Name = "xrTableCell36"
        Me.xrTableCell36.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.xrTableCell36.StyleName = "Fila2"
        Me.xrTableCell36.StylePriority.UseBorderColor = False
        Me.xrTableCell36.StylePriority.UseBorders = False
        Me.xrTableCell36.StylePriority.UseFont = False
        Me.xrTableCell36.StylePriority.UsePadding = False
        Me.xrTableCell36.StylePriority.UseTextAlignment = False
        Me.xrTableCell36.Text = "xrTableCell36"
        Me.xrTableCell36.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.xrTableCell36.Weight = 0.050225547627478079R
        '
        'XrCantidadDet
        '
        Me.XrCantidadDet.BackColor = System.Drawing.Color.Transparent
        Me.XrCantidadDet.BorderColor = System.Drawing.Color.LightGray
        Me.XrCantidadDet.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrCantidadDet.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_CuentasLineas_Reporte_LineasAgrupadas.F_vcCodIMEI")})
        Me.XrCantidadDet.EvenStyleName = "File1"
        Me.XrCantidadDet.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCantidadDet.Name = "XrCantidadDet"
        Me.XrCantidadDet.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrCantidadDet.StyleName = "Fila2"
        Me.XrCantidadDet.StylePriority.UseBorderColor = False
        Me.XrCantidadDet.StylePriority.UseBorders = False
        Me.XrCantidadDet.StylePriority.UseFont = False
        Me.XrCantidadDet.StylePriority.UsePadding = False
        Me.XrCantidadDet.StylePriority.UseTextAlignment = False
        Me.XrCantidadDet.Text = "XrCantidadDet"
        Me.XrCantidadDet.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrCantidadDet.Weight = 0.07960990872833576R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell2.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_CuentasLineas_Reporte_LineasAgrupadas.EMPL_vcNOMEMP")})
        Me.XrTableCell2.EvenStyleName = "File1"
        Me.XrTableCell2.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell2.Name = "XrTableCell2"
        Me.XrTableCell2.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell2.StyleName = "Fila2"
        Me.XrTableCell2.StylePriority.UseBorderColor = False
        Me.XrTableCell2.StylePriority.UseBorders = False
        Me.XrTableCell2.StylePriority.UseFont = False
        Me.XrTableCell2.StylePriority.UsePadding = False
        Me.XrTableCell2.StylePriority.UseTextAlignment = False
        Me.XrTableCell2.Text = "XrTableCell2"
        Me.XrTableCell2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell2.Weight = 0.1690737966088911R
        '
        'XrTableCell1
        '
        Me.XrTableCell1.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell1.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell1.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell1.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_CuentasLineas_Reporte_LineasAgrupadas.vcNomPla")})
        Me.XrTableCell1.EvenStyleName = "File1"
        Me.XrTableCell1.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell1.Name = "XrTableCell1"
        Me.XrTableCell1.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell1.StyleName = "Fila2"
        Me.XrTableCell1.StylePriority.UseBorderColor = False
        Me.XrTableCell1.StylePriority.UseBorders = False
        Me.XrTableCell1.StylePriority.UseFont = False
        Me.XrTableCell1.StylePriority.UsePadding = False
        Me.XrTableCell1.StylePriority.UseTextAlignment = False
        Me.XrTableCell1.Text = "XrTableCell1"
        Me.XrTableCell1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell1.Weight = 0.090543254547986798R
        '
        'XrTableCell3
        '
        Me.XrTableCell3.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell3.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell3.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell3.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_CuentasLineas_Reporte_LineasAgrupadas.vcNomEst")})
        Me.XrTableCell3.EvenStyleName = "File1"
        Me.XrTableCell3.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell3.Name = "XrTableCell3"
        Me.XrTableCell3.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell3.StyleName = "Fila2"
        Me.XrTableCell3.StylePriority.UseBorderColor = False
        Me.XrTableCell3.StylePriority.UseBorders = False
        Me.XrTableCell3.StylePriority.UseFont = False
        Me.XrTableCell3.StylePriority.UsePadding = False
        Me.XrTableCell3.StylePriority.UseTextAlignment = False
        Me.XrTableCell3.Text = "Disponible"
        Me.XrTableCell3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell3.Weight = 0.045630974230515695R
        '
        'XrTableCell4
        '
        Me.XrTableCell4.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell4.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell4.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell4.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_CuentasLineas_Reporte_LineasAgrupadas.btVig")})
        Me.XrTableCell4.EvenStyleName = "File1"
        Me.XrTableCell4.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell4.Name = "XrTableCell4"
        Me.XrTableCell4.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell4.StyleName = "Fila2"
        Me.XrTableCell4.StylePriority.UseBorderColor = False
        Me.XrTableCell4.StylePriority.UseBorders = False
        Me.XrTableCell4.StylePriority.UseFont = False
        Me.XrTableCell4.StylePriority.UsePadding = False
        Me.XrTableCell4.StylePriority.UseTextAlignment = False
        Me.XrTableCell4.Text = "XrTableCell4"
        Me.XrTableCell4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell4.Weight = 0.048873775694328658R
        '
        'XrTableCell12
        '
        Me.XrTableCell12.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell12.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell12.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell12.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_CuentasLineas_Reporte_LineasAgrupadas.vcNomLinTip")})
        Me.XrTableCell12.EvenStyleName = "File1"
        Me.XrTableCell12.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell12.Name = "XrTableCell12"
        Me.XrTableCell12.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell12.StyleName = "Fila2"
        Me.XrTableCell12.StylePriority.UseBorderColor = False
        Me.XrTableCell12.StylePriority.UseBorders = False
        Me.XrTableCell12.StylePriority.UseFont = False
        Me.XrTableCell12.StylePriority.UsePadding = False
        Me.XrTableCell12.StylePriority.UseTextAlignment = False
        Me.XrTableCell12.Text = "XrTableCell12"
        Me.XrTableCell12.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell12.Weight = 0.067034767758445635R
        '
        'XrMontoDet
        '
        Me.XrMontoDet.BackColor = System.Drawing.Color.Transparent
        Me.XrMontoDet.BorderColor = System.Drawing.Color.LightGray
        Me.XrMontoDet.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrMontoDet.EvenStyleName = "File1"
        Me.XrMontoDet.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrMontoDet.Name = "XrMontoDet"
        Me.XrMontoDet.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrMontoDet.StyleName = "Fila2"
        Me.XrMontoDet.StylePriority.UseBorderColor = False
        Me.XrMontoDet.StylePriority.UseBorders = False
        Me.XrMontoDet.StylePriority.UseFont = False
        Me.XrMontoDet.StylePriority.UsePadding = False
        Me.XrMontoDet.Text = "XrMontoDet"
        Me.XrMontoDet.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrMontoDet.Weight = 0.075570245682916121R
        Me.XrMontoDet.XlsxFormatString = "$0.0"
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
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(727.409973!, 23.0!)
        Me.XrTable1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow1
        '
        Me.XrTableRow1.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow1.BorderColor = System.Drawing.Color.White
        Me.XrTableRow1.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell6, Me.XrTableCell5, Me.XrTableCell7, Me.XrTableCell10, Me.XrTableCell8, Me.XrTableCell9, Me.XrTableCell11, Me.xrTituloMontoDeta})
        Me.XrTableRow1.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow1.ForeColor = System.Drawing.Color.White
        Me.XrTableRow1.Name = "XrTableRow1"
        Me.XrTableRow1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow1.Weight = 0.25842696629213485R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell6.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell6.ForeColor = System.Drawing.Color.White
        Me.XrTableCell6.Multiline = True
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell6.StylePriority.UseBackColor = False
        Me.XrTableCell6.StylePriority.UseBorders = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UseForeColor = False
        Me.XrTableCell6.StylePriority.UsePadding = False
        Me.XrTableCell6.StylePriority.UseTextAlignment = False
        Me.XrTableCell6.Text = "Líneas"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.057763077168347991R
        '
        'XrTableCell5
        '
        Me.XrTableCell5.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell5.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell5.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell5.Name = "XrTableCell5"
        Me.XrTableCell5.StylePriority.UseBackColor = False
        Me.XrTableCell5.StylePriority.UseBorders = False
        Me.XrTableCell5.StylePriority.UseFont = False
        Me.XrTableCell5.StylePriority.UseTextAlignment = False
        Me.XrTableCell5.Text = "IMEI"
        Me.XrTableCell5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell5.Weight = 0.075520585175329127R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
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
        Me.XrTableCell7.StylePriority.UseTextAlignment = False
        Me.XrTableCell7.Text = "Empleado"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.19990583193524281R
        '
        'XrTableCell10
        '
        Me.XrTableCell10.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell10.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell10.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell10.Name = "XrTableCell10"
        Me.XrTableCell10.StylePriority.UseBackColor = False
        Me.XrTableCell10.StylePriority.UseBorders = False
        Me.XrTableCell10.StylePriority.UseFont = False
        Me.XrTableCell10.StylePriority.UseTextAlignment = False
        Me.XrTableCell10.Text = "Plan"
        Me.XrTableCell10.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell10.Weight = 0.1124741864436124R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell8.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell8.ForeColor = System.Drawing.Color.White
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell8.StylePriority.UseBackColor = False
        Me.XrTableCell8.StylePriority.UseBorders = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UseForeColor = False
        Me.XrTableCell8.StylePriority.UsePadding = False
        Me.XrTableCell8.StylePriority.UseTextAlignment = False
        Me.XrTableCell8.Text = "Estado"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell8.Weight = 0.054714345865699357R
        '
        'XrTableCell9
        '
        Me.XrTableCell9.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell9.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell9.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell9.Name = "XrTableCell9"
        Me.XrTableCell9.StylePriority.UseBackColor = False
        Me.XrTableCell9.StylePriority.UseBorders = False
        Me.XrTableCell9.StylePriority.UseFont = False
        Me.XrTableCell9.StylePriority.UseTextAlignment = False
        Me.XrTableCell9.Text = "Vigencia"
        Me.XrTableCell9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell9.Weight = 0.056208369504223081R
        '
        'XrTableCell11
        '
        Me.XrTableCell11.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell11.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell11.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell11.Name = "XrTableCell11"
        Me.XrTableCell11.StylePriority.UseBackColor = False
        Me.XrTableCell11.StylePriority.UseBorders = False
        Me.XrTableCell11.StylePriority.UseFont = False
        Me.XrTableCell11.StylePriority.UseTextAlignment = False
        Me.XrTableCell11.Text = "Tipo de Línea"
        Me.XrTableCell11.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell11.Weight = 0.07709490272774315R
        '
        'xrTituloMontoDeta
        '
        Me.xrTituloMontoDeta.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.xrTituloMontoDeta.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.xrTituloMontoDeta.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.xrTituloMontoDeta.ForeColor = System.Drawing.Color.White
        Me.xrTituloMontoDeta.Name = "xrTituloMontoDeta"
        Me.xrTituloMontoDeta.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.xrTituloMontoDeta.StylePriority.UseBackColor = False
        Me.xrTituloMontoDeta.StylePriority.UseBorders = False
        Me.xrTituloMontoDeta.StylePriority.UseFont = False
        Me.xrTituloMontoDeta.StylePriority.UseForeColor = False
        Me.xrTituloMontoDeta.StylePriority.UsePadding = False
        Me.xrTituloMontoDeta.StylePriority.UseTextAlignment = False
        Me.xrTituloMontoDeta.Text = "Monto"
        Me.xrTituloMontoDeta.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.xrTituloMontoDeta.Weight = 0.086911338672194957R
        '
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_CuentasLineas_Reporte_LineasAgrupadasTableAdapter
        '
        Me.MOV_s_CuentasLineas_Reporte_LineasAgrupadasTableAdapter.ClearBeforeFill = True
        '
        'CuentaID
        '
        Me.CuentaID.Description = "CuentaID"
        Me.CuentaID.Name = "CuentaID"
        Me.CuentaID.ValueInfo = "''"
        '
        'File1
        '
        Me.File1.BackColor = System.Drawing.Color.FromArgb(CType(CType(253, Byte), Integer), CType(CType(245, Byte), Integer), CType(CType(235, Byte), Integer))
        Me.File1.Name = "File1"
        Me.File1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'Fila2
        '
        Me.Fila2.BackColor = System.Drawing.Color.White
        Me.Fila2.Name = "Fila2"
        Me.Fila2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.PageHeader.HeightF = 23.0!
        Me.PageHeader.Name = "PageHeader"
        '
        'XRPT_Lineas_LineasAgrupados
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader})
        Me.DataAdapter = Me.MOV_s_CuentasLineas_Reporte_LineasAgrupadasTableAdapter
        Me.DataMember = "MOV_s_CuentasLineas_Reporte_LineasAgrupadas"
        Me.DataSource = Me.Consultas1
        Me.FilterString = "[F_vcCodCue] = ?CuentaID"
        Me.Margins = New System.Drawing.Printing.Margins(82, 33, 0, 0)
        Me.Parameters.AddRange(New DevExpress.XtraReports.Parameters.Parameter() {Me.CuentaID})
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.File1, Me.Fila2})
        Me.Version = "12.2"
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell5 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell10 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell9 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMontoDeta As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTable7 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow9 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents xrTableCell36 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCantidadDet As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell1 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell3 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell4 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrMontoDet As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents MOV_s_CuentasLineas_Reporte_LineasAgrupadasTableAdapter As ConsultasTableAdapters.MOV_s_CuentasLineas_Reporte_LineasAgrupadasTableAdapter
    Friend WithEvents CuentaID As DevExpress.XtraReports.Parameters.Parameter
    Friend WithEvents XrTableCell11 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell12 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents File1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
End Class
