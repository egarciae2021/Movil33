<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Dispositivo_Sub_AgrupadoPorEmpleado
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
        Me.xrDetalle = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow5 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.XrTable2 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow2 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell12 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell13 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell14 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Consultas1 = New Consultas()
        Me.MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleadoTableAdapter = New ConsultasTableAdapters.MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleadoTableAdapter()
        Me.vcCodDis = New DevExpress.XtraReports.Parameters.Parameter()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).BeginInit()
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
        Me.xrDetalle.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrDetalle.Name = "xrDetalle"
        Me.xrDetalle.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrDetalle.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow5})
        Me.xrDetalle.SizeF = New System.Drawing.SizeF(404.76651!, 23.0!)
        Me.xrDetalle.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow5
        '
        Me.xrTableRow5.BackColor = System.Drawing.Color.FromArgb(CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer), CType(CType(238, Byte), Integer))
        Me.xrTableRow5.BorderColor = System.Drawing.Color.White
        Me.xrTableRow5.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableRow5.BorderWidth = 1
        Me.xrTableRow5.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell6, Me.XrTableCell7, Me.XrTableCell8})
        Me.xrTableRow5.Font = New System.Drawing.Font("Tahoma", 8.25!)
        Me.xrTableRow5.Name = "xrTableRow5"
        Me.xrTableRow5.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow5.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow5.Weight = 1.0R
        '
        'XrTableCell6
        '
        Me.XrTableCell6.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell6.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell6.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell6.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleado.P_vcNum")})
        Me.XrTableCell6.EvenStyleName = "Fila1"
        Me.XrTableCell6.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell6.Name = "XrTableCell6"
        Me.XrTableCell6.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell6.StyleName = "Fila2"
        Me.XrTableCell6.StylePriority.UseBorderColor = False
        Me.XrTableCell6.StylePriority.UseBorders = False
        Me.XrTableCell6.StylePriority.UseFont = False
        Me.XrTableCell6.StylePriority.UsePadding = False
        Me.XrTableCell6.Text = "[vcNomGru]"
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell6.Weight = 0.21446361655088314R
        '
        'XrTableCell7
        '
        Me.XrTableCell7.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell7.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell7.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell7.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleado.vcNomOpe")})
        Me.XrTableCell7.EvenStyleName = "Fila1"
        Me.XrTableCell7.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell7.Name = "XrTableCell7"
        Me.XrTableCell7.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell7.StyleName = "Fila2"
        Me.XrTableCell7.StylePriority.UseBorderColor = False
        Me.XrTableCell7.StylePriority.UseBorders = False
        Me.XrTableCell7.StylePriority.UseFont = False
        Me.XrTableCell7.StylePriority.UsePadding = False
        Me.XrTableCell7.Text = "XrTableCell4"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell7.Weight = 0.23809790152035132R
        '
        'XrTableCell8
        '
        Me.XrTableCell8.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell8.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell8.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell8.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleado.vcNomEstLinea")})
        Me.XrTableCell8.EvenStyleName = "Fila1"
        Me.XrTableCell8.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrTableCell8.Name = "XrTableCell8"
        Me.XrTableCell8.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell8.StyleName = "Fila2"
        Me.XrTableCell8.StylePriority.UseBorderColor = False
        Me.XrTableCell8.StylePriority.UseBorders = False
        Me.XrTableCell8.StylePriority.UseFont = False
        Me.XrTableCell8.StylePriority.UsePadding = False
        Me.XrTableCell8.Text = "XrTableCell5"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.XrTableCell8.Weight = 0.16319809619005851R
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
        'XrTable2
        '
        Me.XrTable2.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrTable2.Name = "XrTable2"
        Me.XrTable2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable2.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow2})
        Me.XrTable2.SizeF = New System.Drawing.SizeF(404.76651!, 23.0!)
        Me.XrTable2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow2
        '
        Me.XrTableRow2.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow2.BorderColor = System.Drawing.Color.White
        Me.XrTableRow2.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow2.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell12, Me.XrTableCell13, Me.XrTableCell14})
        Me.XrTableRow2.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow2.ForeColor = System.Drawing.Color.White
        Me.XrTableRow2.Name = "XrTableRow2"
        Me.XrTableRow2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow2.Weight = 0.25842696629213485R
        '
        'XrTableCell12
        '
        Me.XrTableCell12.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell12.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell12.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell12.Name = "XrTableCell12"
        Me.XrTableCell12.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell12.StylePriority.UseBackColor = False
        Me.XrTableCell12.StylePriority.UseBorders = False
        Me.XrTableCell12.StylePriority.UseFont = False
        Me.XrTableCell12.StylePriority.UsePadding = False
        Me.XrTableCell12.StylePriority.UseTextAlignment = False
        Me.XrTableCell12.Text = "Línea"
        Me.XrTableCell12.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell12.Weight = 0.19749770905727695R
        '
        'XrTableCell13
        '
        Me.XrTableCell13.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell13.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell13.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell13.Name = "XrTableCell13"
        Me.XrTableCell13.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell13.StylePriority.UseBackColor = False
        Me.XrTableCell13.StylePriority.UseBorders = False
        Me.XrTableCell13.StylePriority.UseFont = False
        Me.XrTableCell13.StylePriority.UsePadding = False
        Me.XrTableCell13.StylePriority.UseTextAlignment = False
        Me.XrTableCell13.Text = "Operador"
        Me.XrTableCell13.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell13.Weight = 0.21926233040781487R
        '
        'XrTableCell14
        '
        Me.XrTableCell14.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell14.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell14.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell14.Name = "XrTableCell14"
        Me.XrTableCell14.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell14.StylePriority.UseBackColor = False
        Me.XrTableCell14.StylePriority.UseBorders = False
        Me.XrTableCell14.StylePriority.UseFont = False
        Me.XrTableCell14.StylePriority.UsePadding = False
        Me.XrTableCell14.StylePriority.UseTextAlignment = False
        Me.XrTableCell14.Text = "Estado"
        Me.XrTableCell14.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell14.Weight = 0.1502877614824969R
        '
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleadoTableAdapter
        '
        Me.MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleadoTableAdapter.ClearBeforeFill = True
        '
        'vcCodDis
        '
        Me.vcCodDis.Description = "vcCodDis"
        Me.vcCodDis.Name = "vcCodDis"
        Me.vcCodDis.Value = "''"
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable2})
        Me.PageHeader.HeightF = 23.0!
        Me.PageHeader.Name = "PageHeader"
        '
        'Fila1
        '
        Me.Fila1.BackColor = System.Drawing.Color.FromArgb(CType(CType(253, Byte), Integer), CType(CType(245, Byte), Integer), CType(CType(235, Byte), Integer))
        Me.Fila1.Name = "Fila1"
        Me.Fila1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'Fila2
        '
        Me.Fila2.BackColor = System.Drawing.Color.White
        Me.Fila2.Name = "Fila2"
        Me.Fila2.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        '
        'XRPT_Dispositivo_Sub_AgrupadoPorEmpleado
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader})
        Me.DataAdapter = Me.MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleadoTableAdapter
        Me.DataMember = "MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleado"
        Me.DataSource = Me.Consultas1
        Me.FilterString = "[P_vcCodIMEI] = ?vcCodDis"
        Me.Margins = New System.Drawing.Printing.Margins(222, 223, 0, 0)
        Me.Parameters.AddRange(New DevExpress.XtraReports.Parameters.Parameter() {Me.vcCodDis})
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1, Me.Fila2})
        Me.Version = "11.2"
        CType(Me.xrDetalle, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents xrDetalle As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow5 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleadoTableAdapter As ConsultasTableAdapters.MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleadoTableAdapter
    Friend WithEvents vcCodDis As DevExpress.XtraReports.Parameters.Parameter
    Friend WithEvents XrTable2 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow2 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell12 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell13 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell14 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
End Class
