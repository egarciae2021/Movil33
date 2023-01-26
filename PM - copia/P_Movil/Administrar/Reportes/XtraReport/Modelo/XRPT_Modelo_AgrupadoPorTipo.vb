Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Modelo_AgrupadoPorTipo
    Private Sub XrTipo_ModeloDispositivo_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrTipo_ModeloDispositivo.BeforePrint
        Dim xrSubReport As XRSubreport = sender
        xrSubReport.ReportSource.Parameters("P_inCodMod").Value = Convert.ToInt32(GetCurrentColumnValue("P_inCod"))
    End Sub
End Class