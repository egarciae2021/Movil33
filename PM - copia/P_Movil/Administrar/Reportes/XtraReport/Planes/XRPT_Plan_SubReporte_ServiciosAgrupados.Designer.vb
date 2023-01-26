<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Public Class XRPT_Plan_SubReporte_ServiciosAgrupados
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
        Me.XrSubreport2 = New DevExpress.XtraReports.UI.XRSubreport()
        Me.xrTable7 = New DevExpress.XtraReports.UI.XRTable()
        Me.xrTableRow9 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.xrTableCell36 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrCantidadDet = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell2 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrMontoDet = New DevExpress.XtraReports.UI.XRTableCell()
        Me.TopMargin = New DevExpress.XtraReports.UI.TopMarginBand()
        Me.BottomMargin = New DevExpress.XtraReports.UI.BottomMarginBand()
        Me.PlanID = New DevExpress.XtraReports.Parameters.Parameter()
        Me.Consultas1 = New Consultas()
        Me.MOV_s_SubPlan_Reporte_ServiciosAgrupadosTableAdapter = New ConsultasTableAdapters.MOV_s_SubPlan_Reporte_ServiciosAgrupadosTableAdapter()
        Me.PageHeader = New DevExpress.XtraReports.UI.PageHeaderBand()
        Me.XrTable1 = New DevExpress.XtraReports.UI.XRTable()
        Me.XrTableRow1 = New DevExpress.XtraReports.UI.XRTableRow()
        Me.XrTableCell6 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell7 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.XrTableCell8 = New DevExpress.XtraReports.UI.XRTableCell()
        Me.xrTituloMontoDeta = New DevExpress.XtraReports.UI.XRTableCell()
        Me.Fila1 = New DevExpress.XtraReports.UI.XRControlStyle()
        Me.Fila2 = New DevExpress.XtraReports.UI.XRControlStyle()
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
        '
        'Detail
        '
        Me.Detail.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrSubreport2, Me.xrTable7})
        Me.Detail.HeightF = 59.2500496!
        Me.Detail.Name = "Detail"
        Me.Detail.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.Detail.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrSubreport2
        '
        Me.XrSubreport2.CanShrink = True
        Me.XrSubreport2.LocationFloat = New DevExpress.Utils.PointFloat(205.020096!, 20.0000095!)
        Me.XrSubreport2.Name = "XrSubreport2"
        Me.XrSubreport2.ReportSource = New XRPT_Plan_SubServicio_ServiciosAgrupados()
        Me.XrSubreport2.SizeF = New System.Drawing.SizeF(355.305389!, 39.2500305!)
        '
        'xrTable7
        '
        Me.xrTable7.BackColor = System.Drawing.Color.Transparent
        Me.xrTable7.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.xrTable7.Name = "xrTable7"
        Me.xrTable7.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTable7.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.xrTableRow9})
        Me.xrTable7.SizeF = New System.Drawing.SizeF(560.325623!, 20.0!)
        Me.xrTable7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'xrTableRow9
        '
        Me.xrTableRow9.Borders = DevExpress.XtraPrinting.BorderSide.Right
        Me.xrTableRow9.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.xrTableCell36, Me.XrCantidadDet, Me.XrTableCell2, Me.XrMontoDet})
        Me.xrTableRow9.Name = "xrTableRow9"
        Me.xrTableRow9.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.xrTableRow9.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        Me.xrTableRow9.Weight = 1.0R
        '
        'xrTableCell36
        '
        Me.xrTableCell36.BackColor = System.Drawing.Color.Transparent
        Me.xrTableCell36.BorderColor = System.Drawing.Color.LightGray
        Me.xrTableCell36.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.xrTableCell36.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_SubPlan_Reporte_ServiciosAgrupados.vcNomSubPla")})
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
        Me.xrTableCell36.Weight = 0.25594642362847475R
        '
        'XrCantidadDet
        '
        Me.XrCantidadDet.BackColor = System.Drawing.Color.Transparent
        Me.XrCantidadDet.BorderColor = System.Drawing.Color.LightGray
        Me.XrCantidadDet.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrCantidadDet.EvenStyleName = "Fila1"
        Me.XrCantidadDet.Font = New System.Drawing.Font("Trebuchet MS", 7.0!)
        Me.XrCantidadDet.Name = "XrCantidadDet"
        Me.XrCantidadDet.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 3, 0, 0, 100.0!)
        Me.XrCantidadDet.StyleName = "Fila2"
        Me.XrCantidadDet.StylePriority.UseBorderColor = False
        Me.XrCantidadDet.StylePriority.UseBorders = False
        Me.XrCantidadDet.StylePriority.UseFont = False
        Me.XrCantidadDet.StylePriority.UsePadding = False
        Me.XrCantidadDet.StylePriority.UseTextAlignment = False
        Me.XrCantidadDet.Text = "XrCantidadDet"
        Me.XrCantidadDet.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleRight
        Me.XrCantidadDet.Weight = 0.14463799023509424R
        '
        'XrTableCell2
        '
        Me.XrTableCell2.BackColor = System.Drawing.Color.Transparent
        Me.XrTableCell2.BorderColor = System.Drawing.Color.LightGray
        Me.XrTableCell2.Borders = CType(((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableCell2.DataBindings.AddRange(New DevExpress.XtraReports.UI.XRBinding() {New DevExpress.XtraReports.UI.XRBinding("Text", Nothing, "MOV_s_SubPlan_Reporte_ServiciosAgrupados.vcNomTipoSer")})
        Me.XrTableCell2.EvenStyleName = "Fila1"
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
        Me.XrTableCell2.Weight = 0.12484641330596966R
        '
        'XrMontoDet
        '
        Me.XrMontoDet.BackColor = System.Drawing.Color.Transparent
        Me.XrMontoDet.BorderColor = System.Drawing.Color.LightGray
        Me.XrMontoDet.Borders = CType((((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Top) _
            Or DevExpress.XtraPrinting.BorderSide.Right) _
            Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrMontoDet.EvenStyleName = "Fila1"
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
        Me.XrMontoDet.Weight = 0.17818844266130965R
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
        'PlanID
        '
        Me.PlanID.Description = "PlanID"
        Me.PlanID.Name = "PlanID"
        Me.PlanID.Type = GetType(Integer)
        Me.PlanID.ValueInfo = "0"
        '
        'Consultas1
        '
        Me.Consultas1.DataSetName = "Consultas"
        Me.Consultas1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'MOV_s_SubPlan_Reporte_ServiciosAgrupadosTableAdapter
        '
        Me.MOV_s_SubPlan_Reporte_ServiciosAgrupadosTableAdapter.ClearBeforeFill = True
        '
        'PageHeader
        '
        Me.PageHeader.Controls.AddRange(New DevExpress.XtraReports.UI.XRControl() {Me.XrTable1})
        Me.PageHeader.HeightF = 23.0!
        Me.PageHeader.Name = "PageHeader"
        '
        'XrTable1
        '
        Me.XrTable1.LocationFloat = New DevExpress.Utils.PointFloat(0.0!, 0.0!)
        Me.XrTable1.Name = "XrTable1"
        Me.XrTable1.Padding = New DevExpress.XtraPrinting.PaddingInfo(0, 0, 0, 0, 100.0!)
        Me.XrTable1.Rows.AddRange(New DevExpress.XtraReports.UI.XRTableRow() {Me.XrTableRow1})
        Me.XrTable1.SizeF = New System.Drawing.SizeF(560.3255!, 23.0!)
        Me.XrTable1.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft
        '
        'XrTableRow1
        '
        Me.XrTableRow1.BackColor = System.Drawing.Color.FromArgb(CType(CType(255, Byte), Integer), CType(CType(167, Byte), Integer), CType(CType(73, Byte), Integer))
        Me.XrTableRow1.BorderColor = System.Drawing.Color.White
        Me.XrTableRow1.Borders = CType((DevExpress.XtraPrinting.BorderSide.Left Or DevExpress.XtraPrinting.BorderSide.Bottom), DevExpress.XtraPrinting.BorderSide)
        Me.XrTableRow1.Cells.AddRange(New DevExpress.XtraReports.UI.XRTableCell() {Me.XrTableCell6, Me.XrTableCell7, Me.XrTableCell8, Me.xrTituloMontoDeta})
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
        Me.XrTableCell6.Text = "Sub Plan" & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10)
        Me.XrTableCell6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell6.Weight = 0.30289507409675692R
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
        Me.XrTableCell7.Text = "Cantidad"
        Me.XrTableCell7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell7.Weight = 0.14314894793273711R
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
        Me.XrTableCell8.Text = "Tipo Servicio"
        Me.XrTableCell8.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter
        Me.XrTableCell8.Weight = 0.17213926986781955R
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
        Me.xrTituloMontoDeta.Weight = 0.20847492397028128R
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
        'XRPT_Plan_SubReporte_ServiciosAgrupados
        '
        Me.Bands.AddRange(New DevExpress.XtraReports.UI.Band() {Me.Detail, Me.TopMargin, Me.BottomMargin, Me.PageHeader})
        Me.DataAdapter = Me.MOV_s_SubPlan_Reporte_ServiciosAgrupadosTableAdapter
        Me.DataMember = "MOV_s_SubPlan_Reporte_ServiciosAgrupados"
        Me.DataSource = Me.Consultas1
        Me.FilterString = "[inCodPla] = ?PlanID"
        Me.Margins = New System.Drawing.Printing.Margins(117, 168, 0, 0)
        Me.Parameters.AddRange(New DevExpress.XtraReports.Parameters.Parameter() {Me.PlanID})
        Me.ScriptLanguage = DevExpress.XtraReports.ScriptLanguage.VisualBasic
        Me.StyleSheet.AddRange(New DevExpress.XtraReports.UI.XRControlStyle() {Me.Fila1, Me.Fila2})
        Me.Version = "12.2"
        CType(Me.xrTable7, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.Consultas1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.XrTable1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

    End Sub
    Friend WithEvents Detail As DevExpress.XtraReports.UI.DetailBand
    Friend WithEvents TopMargin As DevExpress.XtraReports.UI.TopMarginBand
    Friend WithEvents BottomMargin As DevExpress.XtraReports.UI.BottomMarginBand
    Friend WithEvents xrTable7 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents xrTableRow9 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents xrTableCell36 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrCantidadDet As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrMontoDet As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents PlanID As DevExpress.XtraReports.Parameters.Parameter
    Friend WithEvents Consultas1 As Consultas
    Friend WithEvents XrTableCell2 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents MOV_s_SubPlan_Reporte_ServiciosAgrupadosTableAdapter As ConsultasTableAdapters.MOV_s_SubPlan_Reporte_ServiciosAgrupadosTableAdapter
    Friend WithEvents XrSubreport2 As DevExpress.XtraReports.UI.XRSubreport
    Friend WithEvents PageHeader As DevExpress.XtraReports.UI.PageHeaderBand
    Friend WithEvents XrTable1 As DevExpress.XtraReports.UI.XRTable
    Friend WithEvents XrTableRow1 As DevExpress.XtraReports.UI.XRTableRow
    Friend WithEvents XrTableCell6 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell7 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents XrTableCell8 As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents xrTituloMontoDeta As DevExpress.XtraReports.UI.XRTableCell
    Friend WithEvents Fila1 As DevExpress.XtraReports.UI.XRControlStyle
    Friend WithEvents Fila2 As DevExpress.XtraReports.UI.XRControlStyle
End Class
