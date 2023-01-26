Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI

Public Class XRPT_Plan_Reporte_ServiciosAgrupados
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
            Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
            Dim Monto As Decimal = 0

            If Not IsDBNull(GetCurrentColumnValue("dcMonPla")) Then Monto = CType(GetCurrentColumnValue("dcMonPla"), Decimal)
            XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        Catch ex As Exception
        End Try
        

    End Sub

    Private Sub XrSubreport1_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrSubreport1.BeforePrint
        Try
            Dim xrSubReport As XRSubreport = sender
            xrSubReport.ReportSource.Parameters("PlanID").Value = Convert.ToInt32(GetCurrentColumnValue("inCodPla"))
        Catch ex As Exception
        End Try
        
    End Sub
End Class