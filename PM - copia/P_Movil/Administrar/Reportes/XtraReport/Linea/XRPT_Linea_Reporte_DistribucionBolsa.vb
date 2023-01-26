Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Linea_Reporte_DistribucionBolsa
    Private Sub XrSubreport1_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrSubreport1.BeforePrint
        Dim xrSubReport As XRSubreport = sender
        xrSubReport.ReportSource.Parameters("P_vcLinea").Value = GetCurrentColumnValue("P_vcNUM").ToString()
    End Sub
End Class