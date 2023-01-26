Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI

Public Class XRPT_Cuenta_Reporte_DistribucionBolsa
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim Monto As Decimal = 0

        If Not IsDBNull(GetCurrentColumnValue("dcMonCue")) Then Monto = CType(GetCurrentColumnValue("dcMonCue"), Decimal)
        'Dim CantidadDias As Integer = CType(GetCurrentColumnValue("dcPerFacIni"), Integer)
        Dim CantidadDias As String = GetCurrentColumnValue("dcPerFacIni").ToString()
        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        'xrDetalleDias.Text = Convert.ToInt32(CantidadDias).ToString(strForNumEntero)
        xrDetalleDias.Text = CantidadDias
    End Sub

    Private Sub XrSubCuenta_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrSubCuenta.BeforePrint
        Dim xrSubReport As XRSubreport = sender
        xrSubReport.ReportSource.Parameters("P_vcCuenta").Value = GetCurrentColumnValue("P_vcCod").ToString()
    End Sub
End Class