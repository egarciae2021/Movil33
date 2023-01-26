Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI

Public Class XRPT_Cuenta_LineasAgrupados
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim Monto As Decimal = 0

        If Not IsDBNull(GetCurrentColumnValue("dcMonCue")) Then Monto = CType(GetCurrentColumnValue("dcMonCue"), Decimal)
        Dim CantidadDias As Integer = 0
        If Not IsDBNull(GetCurrentColumnValue("dcPerFacIni")) Then CantidadDias = CType(GetCurrentColumnValue("dcPerFacIni"), Integer)

        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        xrDetalleDias.Text = Convert.ToInt32(CantidadDias).ToString(strForNumEntero)
    End Sub

    Private Sub XrCuenta_LineasAgrupados_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrCuenta_LineasAgrupados.BeforePrint
        Dim xrSubReport As XRSubreport = sender
        xrSubReport.ReportSource.Parameters("CuentaID").Value = GetCurrentColumnValue("vcCodCue").ToString()
    End Sub
End Class