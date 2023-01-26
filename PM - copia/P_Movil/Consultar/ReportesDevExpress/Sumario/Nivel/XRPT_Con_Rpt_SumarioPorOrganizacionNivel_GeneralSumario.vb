Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorOrganizacionNivel_GeneralSumario
    Inherits DevExpress.XtraReports.UI.XtraReport
    Dim TotalDuracion As Integer = 0 : Dim TotalCostoProm As Decimal = 0
    Dim TotalLlamada As Decimal = 0 : Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim TotalGrupoCosto As Decimal = 0
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim CostotLla As Decimal = 0 : Dim Porcentaje As Integer = 0 : Dim Total As Decimal = 0 : Dim TotalCosto As Decimal = 0
        Dim Orga As String = "" : Dim CorOrga As String = "" : Dim Llamada As Integer = 0 : Dim Duracion As String = ""
        Dim fija As Decimal = 0 : Dim cel As Decimal = 0 : Dim ddi As Decimal = 0
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaTot")) Then Llamada = CType(GetCurrentColumnValue("inNumLlaTot"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaTot")) Then Duracion = CType(GetCurrentColumnValue("inDurReaLlaTot"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaTot")) Then CostotLla = CType(GetCurrentColumnValue("dcCosLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaTot")) Then Porcentaje = CType(GetCurrentColumnValue("dcCosLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcDurPromReaLlaTot")) Then Total = CType(GetCurrentColumnValue("dcDurPromReaLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaTot")) Then TotalCosto = CType(GetCurrentColumnValue("dcCosPromLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOrg")) Then Orga = CType(GetCurrentColumnValue("vcNomOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcCodOrg")) Then CorOrga = CType(GetCurrentColumnValue("vcCodOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaLoc")) Then fija = CType(GetCurrentColumnValue("dcCosPromLlaLoc1"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaCel")) Then cel = CType(GetCurrentColumnValue("dcCosPromLlaCel"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosPromLlaDdi")) Then ddi = CType(GetCurrentColumnValue("dcCosPromLlaDdi"), Decimal)

        If Porcentaje > 0 Then
            XrPorcentaje.Text = (Porcentaje / Porcentaje) * 100
        Else
            XrPorcentaje.Text = 0
        End If
        XrOrganizacion.Text = CorOrga + " " + Orga
        XrDcCosLlaTot.Text = Convert.ToDecimal(CostotLla).ToString(strForNum)
        XrTotal.Text = Convert.ToDecimal(Total).ToString(strForNum)
        XrTotalCost.Text = Convert.ToDecimal(TotalCosto).ToString(strForNum)
        XrFijaCost.Text = Convert.ToDecimal(fija).ToString(strForNum)
        XrCelCost.Text = Convert.ToDecimal(cel).ToString(strForNum)
        XrDdiCost.Text = Convert.ToDecimal(ddi).ToString(strForNum)
        'TOTAL GENERAL
        TotalLlamada += Convert.ToDouble(Llamada)
        TotalDuracion += Convert.ToInt32(Duracion)
        TotalCostoProm += Convert.ToDouble(CostotLla)
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
End Class