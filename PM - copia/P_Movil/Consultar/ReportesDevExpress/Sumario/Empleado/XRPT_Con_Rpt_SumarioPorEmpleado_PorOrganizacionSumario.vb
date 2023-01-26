Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorEmpleado_PorOrganizacionSumario
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0 : Dim TotalDuracion As Integer = 0 : Dim TotalCostoProm As Decimal = 0
    Dim TotalLlamada As Integer = 0 : Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim TotalGrupoCosto As Decimal = 0
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Dim SubTotalLlam As Integer = 0 : Dim SubTotalDuracion As Decimal = 0 : Dim SubTotalCosto As Decimal = 0
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim CostotLla As Decimal = 0 : Dim Porcentaje As Integer = 0 : Dim Total As Decimal = 0 : Dim TotalCosto As Decimal = 0
        Dim NomLin$ = "" : Dim CodLin$ = "" : Dim Llamada As Integer = 0 : Dim Duracion As String = ""
        Dim fija As Decimal = 0 : Dim cel As Decimal = 0 : Dim ddi As Decimal = 0 : Dim CodOrg$ = "" : Dim NomOrg$ = ""
        If Not IsDBNull(GetCurrentColumnValue("vcCodOrg")) Then CodOrg = CType(GetCurrentColumnValue("vcCodOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOrg")) Then NomOrg = CType(GetCurrentColumnValue("vcNomOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaTot")) Then Llamada = CType(GetCurrentColumnValue("inNumLlaTot"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaTot")) Then Duracion = CType(GetCurrentColumnValue("inDurReaLlaTot"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaTot")) Then CostotLla = CType(GetCurrentColumnValue("dcCosLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaTot")) Then Porcentaje = CType(GetCurrentColumnValue("dcCosLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcDurPromReaLlaTot")) Then Total = CType(GetCurrentColumnValue("dcDurPromReaLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaTot")) Then TotalCosto = CType(GetCurrentColumnValue("dcCosPromLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("vcNomEmp")) Then NomLin = CType(GetCurrentColumnValue("vcNomEmp"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcCodEmp")) Then CodLin = CType(GetCurrentColumnValue("vcCodEmp"), String)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaLoc")) Then fija = CType(GetCurrentColumnValue("dcCosPromLlaLoc1"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaCel")) Then cel = CType(GetCurrentColumnValue("dcCosPromLlaCel"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaDdi")) Then ddi = CType(GetCurrentColumnValue("dcCosPromLlaDdi"), Decimal)


        XrOrganizacion.Text = CodOrg + " " + NomOrg
        If Porcentaje > 0 Then
            XrPorcentaje.Text = (Porcentaje / Porcentaje) * 100
        Else
            XrPorcentaje.Text = 0
        End If
        XrLinea.Text = CodLin + " " + NomLin
        XrDcCosLlaTot.Text = Convert.ToDecimal(CostotLla).ToString(strForNum)
        XrTotal.Text = Convert.ToDecimal(Total).ToString(strForNum)
        XrTotalCost.Text = Convert.ToDecimal(TotalCosto).ToString(strForNum)
        XrFijaCost.Text = Convert.ToDecimal(fija).ToString(strForNum)
        XrCelCost.Text = Convert.ToDecimal(cel).ToString(strForNum)
        XrDdiCost.Text = Convert.ToDecimal(ddi).ToString(strForNum)
        'SUB TOTAL
        SubTotalLlam += Convert.ToInt32(Llamada)
        SubTotalDuracion += Convert.ToInt32(Duracion)
        SubTotalCosto += Convert.ToDouble(CostotLla)
        'TOTAL GENERAL
        TotalLlamada += Convert.ToInt32(Llamada)
        TotalDuracion += Convert.ToInt32(Duracion)
        TotalCostoProm += Convert.ToDouble(CostotLla)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrLinea.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNumLlaTot.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDurLlaTop.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDcCosLlaTot.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrPorcentaje.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            TrFija.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDdi.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTotal.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrFijaCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCelCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDdiCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTotalCost.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrLinea.BackColor = Drawing.Color.White
            XrNumLlaTot.BackColor = Drawing.Color.White
            XrDurLlaTop.BackColor = Drawing.Color.White
            XrDcCosLlaTot.BackColor = Drawing.Color.White
            XrPorcentaje.BackColor = Drawing.Color.White
            TrFija.BackColor = Drawing.Color.White
            XrCel.BackColor = Drawing.Color.White
            XrDdi.BackColor = Drawing.Color.White
            XrTotal.BackColor = Drawing.Color.White
            XrFijaCost.BackColor = Drawing.Color.White
            XrCelCost.BackColor = Drawing.Color.White
            XrDdiCost.BackColor = Drawing.Color.White
            XrTotalCost.BackColor = Drawing.Color.White
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
        XrTotalLlam.Text = TotalLlamada
        XrTotalDuracion.Text = Calcular_Hora(TotalDuracion)
        XrTotalCosto.Text = TotalCostoProm.ToString(strForNum)
    End Sub
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0 : SubTotalLlam = 0 : SubTotalDuracion = 0 : SubTotalCosto = 0
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrSubTotalLlam.Text = SubTotalLlam.ToString(strForNumEntero)
        XrSubTotalDuracion.Text = Calcular_Hora(SubTotalDuracion)
        XrSubTotalCosto.Text = SubTotalCosto.ToString(strForNum)
    End Sub
End Class