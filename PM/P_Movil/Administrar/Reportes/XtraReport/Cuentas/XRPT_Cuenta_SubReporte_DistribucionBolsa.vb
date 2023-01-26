Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Cuenta_SubReporte_DistribucionBolsa
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Monto As Decimal = 0
        Dim Cantidad As Integer = 0
        If Not IsDBNull(GetCurrentColumnValue("dcMonSubCue")) Then Monto = CType(GetCurrentColumnValue("dcMonSubCue"), Decimal)

        If GetCurrentColumnValue("dcCanSubCue") <> "Ilimitado" Then
            Cantidad = CType(GetCurrentColumnValue("dcCanSubCue"), Integer)
            XrCantidadDet.Text = Cantidad.ToString(strForNumEntero)
        Else
            XrCantidadDet.Text = "Ilimitado"
        End If

        XrMontoDet.Text = Convert.ToDecimal(Monto).ToString(strForNum)


    End Sub

    Private Sub XrServicioCuenta_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrServicioCuenta.BeforePrint
        Dim xrServicioReport As XRSubreport = sender
        XrServicioCuenta.ReportSource.Parameters("SubCuentaID").Value = Convert.ToInt32(GetCurrentColumnValue("P_inCodSubCue"))
    End Sub
End Class