<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Tipo_Modelo_Reporte
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
        Me.XrCos_Equipo = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrPre_Lista = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.Consultas1 = New Consultas()
        Me.MOV_s_Tipo_ModeloDispositivo_ReporteTableAdapter = New ConsultasTableAdapters.MOV_s_Tipo_ModeloDispositivo_ReporteTableAdapter()
        Me.P_inCodMod = New DevExpress.XtraReports.Parameters.Parameter()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.XrTable3 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow3 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell13 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell14 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMontoDeta = New DevExpress.XtraReports.UI.XRTableCell()
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.xrTable7})
        Me.Detail.HeightF = 20.0!
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
        Me.xrTable7.SizeF = New System.Drawing.SizeF(464.2197!, 20.0!)
        Me.xrTable7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow9
        '
        Me.xrTableRow9.Borders = DevExpress.XtraPrinting.BorderSide.Right
        Me.xrTableRow9.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.xrTableCell36, Me.XrCos_Equipo, Me.XrPre_Lista})
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
        Me.xrTableCell36.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_Tipo_ModeloDispositivo_Reporte.vcNomOpe")})
        Me.xrTableCell36.EvenStyleName = "Fila1"
        Me.xrTableCell36.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.xrTableCell36.Name = "xrTableCell36"
        Me.xrTableCell36.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.xrTableCell36.StyleName = "Fila2"
        Me.xrTableCell36.StylePriority.UseBorderColor = False
        Me.xrTableCell36.StylePriority.UseBorders = False
        Me.xrTableCell36.StylePriority.UseFont = False
        Me.xrTableCell36.StylePriority.UsePadding = False
        Me.xrTableCell36.Text = "xrTableCell36"
        Me.xrTableCell36.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleLeft
        Me.xrTableCell36.Weight = 0.23828065119267855R
        '
        'XrCos_Equipo
        '
        Me.XrCos_Equipo.BackColor = System.Drawing.Color.Transparent
        Me.XrCos_Equipo.BorderColor = System.Drawing.Color.LightGray
        Me.XrCos_Equipo.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrCos_Equipo.EvenStyleName = "Fila1"
        Me.XrCos_Equipo.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCos_Equipo.Name = "XrCos_Equipo"
        Me.XrCos_Equipo.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCos_Equipo.StyleName = "Fila2"
        Me.XrCos_Equipo.StylePriority.UseBorderColor = False
        Me.XrCos_Equipo.StylePriority.UseBorders = False
        Me.XrCos_Equipo.StylePriority.UseFont = False
        Me.XrCos_Equipo.StylePriority.UsePadding = False
        Me.XrCos_Equipo.StylePriority.UseTextAlignment = False
        Me.XrCos_Equipo.Text = "XrCos_Equipo"
        Me.XrCos_Equipo.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCos_Equipo.Weight = 0.22042865641254225R
        '
        'XrPre_Lista
        '
        Me.XrPre_Lista.BackColor = System.Drawing.Color.Transparent
        Me.XrPre_Lista.BorderColor = System.Drawing.Color.LightGray
        Me.XrPre_Lista.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrPre_Lista.EvenStyleName = "Fila1"
        Me.XrPre_Lista.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrPre_Lista.Name = "XrPre_Lista"
        Me.XrPre_Lista.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrPre_Lista.StyleName = "Fila2"
        Me.XrPre_Lista.StylePriority.UseBorderColor = False
        Me.XrPre_Lista.StylePriority.UseBorders = False
        Me.XrPre_Lista.StylePriority.UseFont = False
        Me.XrPre_Lista.StylePriority.UsePadding = False
        Me.XrPre_Lista.StylePriority.UseTextAlignment = False
        Me.XrPre_Lista.Text = "XrPre_Lista"
        Me.XrPre_Lista.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrPre_Lista.Weight = 0.24785538063330884R
        Me.XrPre_Lista.XlsxFormatString = "$0.0"
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
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_Tipo_ModeloDispositivo_ReporteTableAdapter
        '
        Me.MOV_s_Tipo_ModeloDispositivo_ReporteTableAdapter.ClearBeforeFill = True
        '
        'P_inCodMod
        '
        Me.P_inCodMod.Description = "P_inCodMod"
        Me.P_inCodMod.Name = "P_inCodMod"
        Me.P_inCodMod.Type = GetType(Integer)
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable3})
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
        'XrTable3
        '
        Me.XrTable3.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrTable3.Name = "XrTable3"
        Me.XrTable3.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable3.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow3})
        Me.XrTable3.SizeF = New System.Drawing.SizeF(464.2197!, 23.0!)
        Me.XrTable3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow3
        '
        Me.XrTableRow3.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow3.BorderColor = System.Drawing.Color.White
        Me.XrTableRow3.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow3.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell13, Me.XrTableCell14, Me.xrTituloMontoDeta})
        Me.XrTableRow3.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableRow3.ForeColor = System.Drawing.Color.White
        Me.XrTableRow3.Name = "XrTableRow3"
        Me.XrTableRow3.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTableRow3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.XrTableRow3.Weight = 0.25842696629213485R
        '
        'XrTableCell13
        '
        Me.XrTableCell13.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell13.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell13.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell13.ForeColor = System.Drawing.Color.White
        Me.XrTableCell13.Multiline = True
        Me.XrTableCell13.Name = "XrTableCell13"
        Me.XrTableCell13.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell13.StylePriority.UseBackColor = False
        Me.XrTableCell13.StylePriority.UseBorders = False
        Me.XrTableCell13.StylePriority.UseFont = False
        Me.XrTableCell13.StylePriority.UseForeColor = False
        Me.XrTableCell13.StylePriority.UsePadding = False
        Me.XrTableCell13.Text = "Operador"
        Me.XrTableCell13.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell13.Weight = 0.29103605896165424R
        '
        'XrTableCell14
        '
        Me.XrTableCell14.BackColor = System.Drawing.Color.FromArgb(CType(CType(244, Byte), Integer), CType(CType(155, Byte), Integer), CType(CType(24, Byte), Integer))
        Me.XrTableCell14.Borders = DevExpress.XtraPrinting.BorderSide.Bottom
        Me.XrTableCell14.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Bold)
        Me.XrTableCell14.ForeColor = System.Drawing.Color.White
        Me.XrTableCell14.Name = "XrTableCell14"
        Me.XrTableCell14.Padding = New DevExpress.XtraPrinting.PaddingInfo(3, 0, 0, 0, 100.0!)
        Me.XrTableCell14.StylePriority.UseBackColor = False
        Me.XrTableCell14.StylePriority.UseBorders = False
        Me.XrTableCell14.StylePriority.UseFont = False
        Me.XrTableCell14.StylePriority.UseForeColor = False
        Me.XrTableCell14.StylePriority.UsePadding = False
        Me.XrTableCell14.Text = "Cos. Equipo"
        Me.XrTableCell14.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell14.Weight = 0.26923167155713762R
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
        Me.xrTituloMontoDeta.Text = "Pre. Lista"
        Me.xrTituloMontoDeta.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.xrTituloMontoDeta.Weight = 0.30273073483246576R
        '
        'XRPT_Tipo_Modelo_Reporte
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader})
        Me.DataAdapter = Me.MOV_s_Tipo_ModeloDispositivo_ReporteTableAdapter
        Me.DataMember = "MOV_s_Tipo_ModeloDispositivo_Reporte"
        Me.DataSource = Me.Consultas1
        Me.FilterString = "[P_inCod] = ?P_inCodMod"
        Me.Margins = New System.Drawing.Printing.Margins(186, 199, 0, 0)
        Me.Parameters.AddRange(New DevExpress.XtraReports.Parameters.Parameter() {Me.P_inCodMod})
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1, Me.Fila2})
        Me.Version = "11.2"
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable3, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents MOV_s_Tipo_ModeloDispositivo_ReporteTableAdapter As ConsultasTableAdapters.MOV_s_Tipo_ModeloDispositivo_ReporteTableAdapter
    Friend WithEvents P_inCodMod As DevExpress.XtraReports.Parameters.Parameter
    Friend WithEvents xrTable7 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow9 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents xrTableCell36 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCos_Equipo As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrPre_Lista As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents XrTable3 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow3 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell13 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell14 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMontoDeta As DevExpress.XtraReports.UI.XRTableCell
End Class
