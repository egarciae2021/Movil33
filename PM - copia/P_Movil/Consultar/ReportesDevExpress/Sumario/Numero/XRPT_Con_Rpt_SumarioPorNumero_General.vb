Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorNumero_General
    Inherits DevExpress.XtraReports.UI.XtraReport
    Dim TotLlamada% = 0 : Dim TotDuracion% = 0 : Dim TotalCosto As Decimal = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim Verif% = 0 : Dim CostoTotal As Decimal = 0 : Dim Duracion% = 0 : Dim TotLlam% = 0
        If Not IsDBNull(GetCurrentColumnValue("btEstNum")) Then Verif = CType(GetCurrentColumnValue("btEstNum"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then CostoTotal = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("inDurLla")) Then Duracion = CType(GetCurrentColumnValue("inDurLla"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inNumLla")) Then TotLlam = CType(GetCurrentColumnValue("inNumLla"), Integer)

        If Verif = 1 Then
            XrVerif.Text = "Ok."
        Else
            XrVerif.Text = ""
        End If
        XrCostoTotal.Text = Convert.ToDecimal(CostoTotal).ToString(strForNum)
        TotLlamada += Convert.ToInt32(TotLlam)
        TotDuracion += Convert.ToInt32(Duracion)
        TotalCosto += Convert.ToDecimal(CostoTotal)
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
        XrTotLlamada.Text = TotLlamada.ToString(strForNumEntero)
        XrTotDuracion.Text = Calcular_Hora(TotDuracion)
        XrTotalCosto.Text = TotalCosto.ToString(strForNum)
    End Sub
End Class