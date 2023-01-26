Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionDetalle
    Inherits DevExpress.XtraReports.UI.XtraReport
    Dim TotLlaFija% = 0 : Dim TotLlaCel% = 0 : Dim TotLlaInt% = 0 : Dim TotDurfija% = 0 : Dim TotDurCell% = 0 : Dim TotDurInt% = 0
    Dim TotCostFija As Decimal = 0 : Dim TotCostCel As Decimal = 0 : Dim TotCostInt As Decimal = 0 : Dim TotCostSRCEL As Decimal = 0 : Dim TotTotalCostSRCEL As Decimal = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim TotalGrupoCosto As Decimal = 0
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura) : Private iContador As Integer = 0 : Dim SubTotalSrcCostTot As Decimal = 0
    Dim SubTotalFijaLlam% = 0 : Dim SubTotalCelLlam% = 0 : Dim SubTotalIntLlam% = 0 : Dim SubTotalFijaDura% = 0 : Dim SubTotalCelDur% = 0 : Dim SubTotalIntdur% = 0
    Dim SubTotalFijaCost As Decimal = 0 : Dim SubTotalCelCost As Decimal = 0 : Dim SubTotalIntCost As Decimal = 0 : Dim SubTotalSrcCost As Decimal = 0
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim LlamadaFija% = 0 : Dim DuracionFija% = 0 : Dim LlamadaCelular% = 0 : Dim DuracionCelular% = 0 : Dim LlamadaInter% = 0 : Dim DuracionInter% = 0
        Dim CostFija As Decimal = 0 : Dim CostCel As Decimal = 0 : Dim CostInt As Decimal = 0 : Dim CostSRCEL As Decimal = 0 : Dim CosTotSRCEL As Decimal = 0
        Dim Orga$ = "" : Dim CorOrga$ = "" : Dim CodLinea$ = "" : Dim NomLinea$ = ""
        'LLENANDO COLUMNAS
        If Not IsDBNull(GetCurrentColumnValue("vcCodEmp")) Then CodLinea = CType(GetCurrentColumnValue("vcCodEmp"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomEmp")) Then NomLinea = CType(GetCurrentColumnValue("vcNomEmp"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcCodOrg")) Then CorOrga = CType(GetCurrentColumnValue("vcCodOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOrg")) Then Orga = CType(GetCurrentColumnValue("vcNomOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaLoc")) Then CostFija = CType(GetCurrentColumnValue("dcCosLlaLoc"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaCel")) Then CostCel = CType(GetCurrentColumnValue("dcCosLlaCel1"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaDdi")) Then CostInt = CType(GetCurrentColumnValue("dcCosLlaDdi"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaSRCel")) Then CostSRCEL = CType(GetCurrentColumnValue("dcCosLlaSRCel"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaTot")) Then CosTotSRCEL = CType(GetCurrentColumnValue("dcCosLlaTot"), Decimal)
        'OBTENIENDO COLUMNAS PARA LOS TOTALES
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaLoc")) Then LlamadaFija = CType(GetCurrentColumnValue("inNumLlaLoc"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaLoc")) Then DuracionFija = CType(GetCurrentColumnValue("inDurReaLlaLoc"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaCel")) Then LlamadaCelular = CType(GetCurrentColumnValue("inNumLlaCel"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaCel")) Then DuracionCelular = CType(GetCurrentColumnValue("inDurReaLlaCel"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaDdi")) Then LlamadaInter = CType(GetCurrentColumnValue("inNumLlaDdi"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaDdi")) Then DuracionInter = CType(GetCurrentColumnValue("inDurReaLlaDdi"), Integer)

        XrOrganizacion.Text = CorOrga + " " + Orga
        XrLinea.Text = CodLinea + " " + NomLinea
        XrCostFija.Text = Convert.ToDecimal(CostFija).ToString(strForNum)
        XrCostCel.Text = Convert.ToDecimal(CostCel).ToString(strForNum)
        XrCostInt.Text = Convert.ToDecimal(CostInt).ToString(strForNum)
        XrCostSRCEL.Text = Convert.ToDecimal(CostSRCEL).ToString(strForNum)
        XrCosTotSRCEL.Text = Convert.ToDecimal(CosTotSRCEL).ToString(strForNum)

        'TOTAL GENERAL
        TotLlaFija += Convert.ToInt32(LlamadaFija) : TotLlaCel += Convert.ToInt32(LlamadaCelular) : TotLlaInt += Convert.ToInt32(LlamadaInter)
        TotDurfija += Convert.ToInt32(DuracionFija) : TotDurCell += Convert.ToInt32(DuracionCelular) : TotDurInt += Convert.ToInt32(DuracionInter)
        TotCostFija += Convert.ToDecimal(CostFija) : TotCostCel += Convert.ToDecimal(CostCel) : TotCostInt += Convert.ToDecimal(CostInt)
        TotCostSRCEL += Convert.ToDecimal(CostSRCEL) : TotTotalCostSRCEL += Convert.ToDecimal(CosTotSRCEL)

        'SUB TOTAL
        SubTotalFijaLlam += Convert.ToInt32(LlamadaFija) : SubTotalCelLlam += Convert.ToInt32(LlamadaCelular) : SubTotalIntLlam += Convert.ToInt32(LlamadaInter)
        SubTotalFijaDura += Convert.ToInt32(DuracionFija) : SubTotalCelDur += Convert.ToInt32(DuracionCelular) : SubTotalIntdur += Convert.ToInt32(DuracionInter)
        SubTotalFijaCost += Convert.ToDecimal(CostFija) : SubTotalCelCost += Convert.ToDecimal(CostCel) : SubTotalIntCost += Convert.ToDecimal(CostInt)
        SubTotalSrcCost += Convert.ToDecimal(CostSRCEL) : SubTotalSrcCostTot += Convert.ToDecimal(CosTotSRCEL)

        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrLinea.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLlamadasFija.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDurFija.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCostFija.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLlaCel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDurCel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCostCel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLlaInt.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDurInt.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCostInt.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCostSRCEL.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosTotSRCEL.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrLinea.BackColor = Drawing.Color.White
            XrLlamadasFija.BackColor = Drawing.Color.White
            XrDurFija.BackColor = Drawing.Color.White
            XrCostFija.BackColor = Drawing.Color.White
            XrLlaCel.BackColor = Drawing.Color.White
            XrDurCel.BackColor = Drawing.Color.White
            XrCostCel.BackColor = Drawing.Color.White
            XrLlaInt.BackColor = Drawing.Color.White
            XrDurInt.BackColor = Drawing.Color.White
            XrCostInt.BackColor = Drawing.Color.White
            XrCostSRCEL.BackColor = Drawing.Color.White
            XrCosTotSRCEL.BackColor = Drawing.Color.White
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
    Private Sub ReportFooter_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles ReportFooter.BeforePrint
        XrTotLlaFija.Text = TotLlaFija.ToString(strForNumEntero) : XrTotDurfija.Text = Calcular_Hora(TotDurfija.ToString(strForNumEntero)) : XrTotCostFija.Text = TotCostFija.ToString(strForNum)
        XrTotLlaCel.Text = TotLlaCel.ToString(strForNumEntero) : XrTotDurCell.Text = Calcular_Hora(TotDurCell.ToString(strForNumEntero)) : XrTotCostCel.Text = TotCostCel.ToString(strForNum)
        XrTotLlaInt.Text = TotLlaInt.ToString(strForNumEntero) : XrTotDurInt.Text = Calcular_Hora(TotDurInt.ToString(strForNumEntero)) : XrTotCostInt.Text = TotCostInt.ToString(strForNum)
        XrTotCostSRCEL.Text = TotCostSRCEL.ToString(strForNum) : XrTotTotalCostSRCEL.Text = TotTotalCostSRCEL.ToString(strForNum)
    End Sub
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
        SubTotalFijaLlam = 0 : SubTotalCelLlam = 0 : SubTotalIntLlam = 0
        SubTotalFijaDura = 0 : SubTotalCelDur = 0 : SubTotalIntdur = 0
        SubTotalFijaCost = 0 : SubTotalCelCost = 0 : SubTotalIntCost = 0
        SubTotalSrcCost = 0 : SubTotalSrcCostTot = 0
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrSubTotalFijaLlam.Text = SubTotalFijaLlam.ToString(strForNumEntero) : XrSubTotalFijaDura.Text = Calcular_Hora(SubTotalFijaDura) : XrSubTotalFijaCost.Text = SubTotalFijaCost.ToString(strForNum)
        XrSubTotalCelLlam.Text = SubTotalCelLlam.ToString(strForNumEntero) : XrSubTotalCelDur.Text = Calcular_Hora(SubTotalCelDur) : XrSubTotalCelCost.Text = SubTotalCelCost.ToString(strForNum)
        XrSubTotalIntLlam.Text = SubTotalIntLlam.ToString(strForNumEntero) : XrSubTotalIntdur.Text = Calcular_Hora(SubTotalIntdur) : XrSubTotalIntCost.Text = SubTotalIntCost.ToString(strForNum)
        XrSubTotalSrcCost.Text = SubTotalSrcCost.ToString(strForNum) : XrSubTotalSrcCostTot.Text = SubTotalSrcCostTot.ToString(strForNum)
    End Sub
End Class