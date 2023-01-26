Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorPais_GeneralSumario
    Inherits DevExpress.XtraReports.UI.XtraReport
    Dim TotLlamada% = 0 : Dim TotalCosto As Decimal = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim Costo As Decimal = 0 : Dim TotLlam% = 0 : Dim CodOpe$ = "" : Dim NomOpe$ = ""
        If Not IsDBNull(GetCurrentColumnValue("vcCodOpe")) Then CodOpe = CType(GetCurrentColumnValue("vcCodOpe"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOpe")) Then NomOpe = CType(GetCurrentColumnValue("vcNomOpe"), String)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then Costo = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("inNumLla")) Then TotLlam = CType(GetCurrentColumnValue("inNumLla"), Integer)
        XrOperador.Text = CodOpe + " - " + NomOpe
        XrCosto.Text = Convert.ToDecimal(Costo).ToString(strForNum)
        TotLlamada += Convert.ToInt32(TotLlam) : TotalCosto += Convert.ToDecimal(Costo)
    End Sub
    Private Sub ReportFooter_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles ReportFooter.BeforePrint
        XrTotLlamada.Text = TotLlamada.ToString(strForNumEntero) : XrTotalCosto.Text = TotalCosto.ToString(strForNum)
    End Sub
End Class