Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_Lineas_LineasAgrupados
    Private Sub XRPT_Lineas_LineasAgrupados_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Me.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)
        xrTituloMontoDeta.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
    End Sub

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Monto As Decimal = 0

        If Not IsDBNull(GetCurrentColumnValue("dcMon")) Then Monto = CType(GetCurrentColumnValue("dcMon"), Decimal)
        XrMontoDet.Text = Convert.ToDecimal(Monto).ToString(strForNum)
    End Sub
End Class