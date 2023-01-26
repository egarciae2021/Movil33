Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Dispositivo_AgrupadoPorEmpleado
    Private Sub XrSubreportDispositivo3_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles XrSubreportDispositivo3.BeforePrint
        Dim xrSubReport As XRSubreport = sender
        xrSubReport.ReportSource.Parameters("vcCodDis").Value = GetCurrentColumnValue("P_vcCodIMEI").ToString()
    End Sub

    Private Sub GroupHeader1_BeforePrint(sender As System.Object, e As System.Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        Dim Empleado As String = ""
        Dim Codigo As String = ""
        If Not IsDBNull(GetCurrentColumnValue("vcNomEmp")) Then Empleado = CType(GetCurrentColumnValue("vcNomEmp"), String)
        If Not IsDBNull(GetCurrentColumnValue("F_vcCodEmp")) Then Codigo = CType(GetCurrentColumnValue("F_vcCodEmp"), String)

        If Empleado = Nothing And Codigo = Nothing Then
            XrLBLNomEmp.Text = "SIN EMPLEADO ASIGNADO"
            XrLBLCodEmp.Text = ""
        Else
            XrLBLNomEmp.Text = GetCurrentColumnValue("vcNomEmp").ToString()
            XrLBLCodEmp.Text = GetCurrentColumnValue("F_vcCodEmp").ToString()
        End If
    End Sub
End Class