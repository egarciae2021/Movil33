Imports System.Threading
Imports System.Globalization
Imports VisualSoft.PCSistelMovil.General.BE
Public Class XRPT_Linea_SubReporte_DistribucionBolsa
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim Monto As Decimal = 0

        If Not IsDBNull(GetCurrentColumnValue("dcMonAsiLin")) Then Monto = CType(GetCurrentColumnValue("dcMonAsiLin"), Decimal)
        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
    End Sub
End Class