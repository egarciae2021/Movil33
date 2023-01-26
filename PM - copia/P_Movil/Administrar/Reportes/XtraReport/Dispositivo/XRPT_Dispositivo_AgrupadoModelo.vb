Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Dispositivo_AgrupadoModelo
    Private Sub XrSubreportDispositivo_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrSubreportDispositivo.BeforePrint
        Dim xrSubReport As XRSubreport = sender
        xrSubReport.ReportSource.Parameters("P_inCodModDis").Value = Convert.ToInt32(GetCurrentColumnValue("inCodModDis"))
    End Sub
End Class