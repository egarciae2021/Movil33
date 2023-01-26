Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_Ranking
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim TotalGrupoCosto As Decimal = 0
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    'VARIABLES SUBTOTALES
    Dim SubFijaLlam As Integer = 0 : Dim SubFijaDur As Integer = 0 : Dim SubFijaCost As Decimal = 0
    Dim SubCelLlam As Integer = 0 : Dim SubCelDur As Integer = 0 : Dim SubCelCost As Decimal = 0
    Dim SubIntLlam As Integer = 0 : Dim SubIntDur As Integer = 0 : Dim SubIntCost As Decimal = 0
    Dim SubSRCECost As Decimal = 0 : Dim SubCosto As Decimal = 0
    'VARIABLES TOTALES
    Dim TotalFijaLlam As Integer = 0 : Dim TotalFijaDur As Integer = 0 : Dim TotalFijaCost As Decimal = 0
    Dim TotalCelLlam As Integer = 0 : Dim TotalCelDur As Integer = 0 : Dim TotalCelCost As Decimal = 0
    Dim TotalIntLlam As Integer = 0 : Dim TotalIntDur As Integer = 0 : Dim TotalIntCost As Decimal = 0
    Dim TotalSRCELCost As Decimal = 0 : Dim TotalCosto As Decimal = 0
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim FijaLlam As Integer = 0 : Dim CelLlam As Integer = 0 : Dim IntLlam As Integer = 0
        Dim FijaDur As Integer = 0 : Dim CelDur As Integer = 0 : Dim IntDur As Integer = 0
        Dim FijaCost As Decimal = 0 : Dim CelCost As Decimal = 0 : Dim IntCost As Decimal = 0
        Dim SRCELCost As Decimal = 0 : Dim Costo As Decimal = 0
        Dim CodOrg As String = "" : Dim NomOrg As String = ""
        'LLENANDO LABEL
        If Not IsDBNull(GetCurrentColumnValue("vcCodOrg")) Then CodOrg = CType(GetCurrentColumnValue("vcCodOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOrg")) Then NomOrg = CType(GetCurrentColumnValue("vcNomOrg"), String)
        'LLENANDO CAMPOS DEL DETALLE
        If Not IsDBNull(GetCurrentColumnValue("dcCosLoc")) Then FijaCost = CType(GetCurrentColumnValue("dcCosLoc"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosCel")) Then CelCost = CType(GetCurrentColumnValue("dcCosCel"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosDDI")) Then IntCost = CType(GetCurrentColumnValue("dcCosDDI"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosSRCEL")) Then SRCELCost = CType(GetCurrentColumnValue("dcCosSRCEL"), Decimal)
        'LLENANDO CAMPOS PARA LOS SUB TOTALES
        If Not IsDBNull(GetCurrentColumnValue("inLlamLoc")) Then FijaLlam = CType(GetCurrentColumnValue("inLlamLoc"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurLoc")) Then FijaDur = CType(GetCurrentColumnValue("inDurLoc"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inLlamCel")) Then CelLlam = CType(GetCurrentColumnValue("inLlamCel"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurCel")) Then CelDur = CType(GetCurrentColumnValue("inDurCel"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inLlamDDI")) Then IntLlam = CType(GetCurrentColumnValue("inLlamDDI"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurDDI")) Then IntDur = CType(GetCurrentColumnValue("inDurDDI"), Integer)

        XrSucursal.Text = CodOrg + " " + NomOrg
        XrFijaCost.Text = Convert.ToDecimal(FijaCost).ToString(strForNum)
        XrCelCost.Text = Convert.ToDecimal(CelCost).ToString(strForNum)
        XrIntCost.Text = Convert.ToDecimal(IntCost).ToString(strForNum)
        XrSRCELCost.Text = Convert.ToDecimal(SRCELCost).ToString(strForNum)
        XrCosto.Text = Convert.ToDecimal(FijaCost + CelCost + IntCost + SRCELCost).ToString(strForNum)
        'LLENANDO SUBTOTALES
        SubFijaLlam += Convert.ToInt32(FijaLlam) : SubFijaDur += Convert.ToInt32(FijaDur) : SubFijaCost += Convert.ToDecimal(FijaCost)
        SubCelLlam += Convert.ToInt32(CelLlam) : SubCelDur += Convert.ToInt32(CelDur) : SubCelCost += Convert.ToDecimal(CelCost)
        SubIntLlam += Convert.ToInt32(IntLlam) : SubIntDur += Convert.ToInt32(IntDur) : SubIntCost += Convert.ToDecimal(IntCost)
        SubSRCECost += Convert.ToDecimal(SRCELCost)
        SubCosto += Convert.ToDecimal(SubFijaCost + SubCelCost + SubIntCost + SubSRCECost)
        'LLENANDO TOTALES
        TotalFijaLlam += Convert.ToInt32(FijaLlam) : TotalFijaDur += Convert.ToInt32(FijaDur) : TotalFijaCost += Convert.ToDecimal(FijaCost)
        TotalCelLlam += Convert.ToInt32(CelLlam) : TotalCelDur += Convert.ToInt32(CelDur) : TotalCelCost += Convert.ToDecimal(CelCost)
        TotalIntLlam += Convert.ToInt32(IntLlam) : TotalIntDur += Convert.ToInt32(IntDur) : TotalIntCost += Convert.ToDecimal(IntCost)
        TotalSRCELCost += Convert.ToDecimal(SRCELCost) : TotalCosto += Convert.ToDecimal(SubFijaCost + SubCelCost + SubIntCost + SubSRCECost)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrCodigo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrEmpleado.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrFijaLlam.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrFijaDur.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrFijaCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCelLlam.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCelDur.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCelCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrIntLlam.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrIntDur.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrIntCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrSRCELCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrCodigo.BackColor = Drawing.Color.White
            XrEmpleado.BackColor = Drawing.Color.White
            XrFijaLlam.BackColor = Drawing.Color.White
            XrFijaDur.BackColor = Drawing.Color.White
            XrFijaCost.BackColor = Drawing.Color.White
            XrCelLlam.BackColor = Drawing.Color.White
            XrCelDur.BackColor = Drawing.Color.White
            XrCelCost.BackColor = Drawing.Color.White
            XrIntLlam.BackColor = Drawing.Color.White
            XrIntDur.BackColor = Drawing.Color.White
            XrIntCost.BackColor = Drawing.Color.White
            XrSRCELCost.BackColor = Drawing.Color.White
            XrCosto.BackColor = Drawing.Color.White
        End If
    End Sub
    Function Calcular_Hora(ByVal num As Integer)
        Dim hora As Integer = 0, min As Integer = 0, seg As Integer = 0
        Dim consumo As XRTableCell = New XRTableCell()
        hora = Int(num / 3600)
        min = Int((num - hora * 3600) / 60)
        seg = Int(num - (hora * 3600 + min * 60))
        consumo.Text = hora.ToString("00") + ":" + min.ToString("00") + ":" + seg.ToString("00")
        Return consumo.Text
    End Function
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
        SubFijaLlam = 0 : SubFijaDur = 0 : SubFijaCost = 0
        SubCelLlam = 0 : SubCelDur = 0 : SubCelCost = 0
        SubIntLlam = 0 : SubIntDur = 0 : SubIntCost = 0
        SubSRCECost = 0 : SubCosto = 0
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrSubFijaLlam.Text = SubFijaLlam.ToString(strForNumEntero) : XrSubFijaDur.Text = Calcular_Hora(SubFijaDur) : XrSubFijaCost.Text = SubFijaCost.ToString(strForNum)
        XrSubCelLlam.Text = SubCelLlam.ToString(strForNumEntero) : XrSubCelDur.Text = Calcular_Hora(SubCelDur) : XrSubCelCost.Text = SubCelCost.ToString(strForNum)
        XrSubIntLlam.Text = SubIntLlam.ToString(strForNumEntero) : XrSubIntDur.Text = Calcular_Hora(SubIntDur) : XrSubIntCost.Text = SubIntCost.ToString(strForNum)
        XrSubSRCECost.Text = SubSRCECost.ToString(strForNum) : XrSubCosto.Text = SubCosto.ToString(strForNum)
    End Sub
    Private Sub ReportFooter_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles ReportFooter.BeforePrint
        XrTotalFijaLlam.Text = TotalFijaLlam.ToString(strForNumEntero) : XrTotalFijaDur.Text = Calcular_Hora(TotalFijaDur) : XrTotalFijaCost.Text = TotalFijaCost.ToString(strForNum)
        XrTotalCelLlam.Text = TotalCelLlam.ToString(strForNumEntero) : XrTotalCelDur.Text = Calcular_Hora(TotalCelDur) : XrTotalCelCost.Text = TotalCelCost.ToString(strForNum)
        XrTotalIntLlam.Text = TotalIntLlam.ToString(strForNumEntero) : XrTotalIntDur.Text = Calcular_Hora(TotalIntDur) : XrTotalIntCost.Text = TotalIntCost.ToString(strForNum)
        XrTotalSRCELCost.Text = TotalSRCELCost.ToString(strForNum) : XrTotalCosto.Text = TotalCosto.ToString(strForNum)
    End Sub
End Class