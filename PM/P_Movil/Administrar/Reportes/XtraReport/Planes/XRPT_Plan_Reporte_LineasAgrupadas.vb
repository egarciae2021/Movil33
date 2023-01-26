Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Plan_Reporte_LineasAgrupadas
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim Monto As Decimal = 0
        If Not IsDBNull(GetCurrentColumnValue("dcMonPla")) Then Monto = CType(GetCurrentColumnValue("dcMonPla"), Decimal)
        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
    End Sub

    Private Sub XrSubreport3_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrSubreport3.BeforePrint
        Dim xrSubReport As XRSubreport = sender
        xrSubReport.ReportSource.Parameters("Plan_Lineas").Value = Convert.ToInt32(GetCurrentColumnValue("inCodPla"))
    End Sub
End Class