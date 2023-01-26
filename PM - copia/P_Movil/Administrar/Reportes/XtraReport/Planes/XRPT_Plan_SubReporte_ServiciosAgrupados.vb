Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Plan_SubReporte_ServiciosAgrupados
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Monto As Decimal = 0
        Dim Cantidad As Integer = 0
        Dim CantidadSTR As String = ""
        If Not IsDBNull(GetCurrentColumnValue("dcMonSubPla")) Then Monto = CType(GetCurrentColumnValue("dcMonSubPla"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCanSubPla")) Then CantidadSTR = CType(GetCurrentColumnValue("dcCanSubPla"), String)

        If CantidadSTR = "Ilimitado" Then
            XrCantidadDet.Text = "Ilimitado"
        ElseIf CantidadSTR = Nothing Then
            XrCantidadDet.Text = ""
        Else
            Cantidad = CType(GetCurrentColumnValue("dcCanSubPla"), Integer)
            XrCantidadDet.Text = Convert.ToInt32(Cantidad).ToString(strForNumEntero)
        End If

        XrMontoDet.Text = Convert.ToDecimal(Monto).ToString(strForNum)

    End Sub

    Private Sub XrSubreport2_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrSubreport2.BeforePrint
        Dim xrServicioReport As XRSubreport = sender
        xrServicioReport.ReportSource.Parameters("SubPlanID").Value = Convert.ToInt32(GetCurrentColumnValue("SubPlan"))
    End Sub
End Class