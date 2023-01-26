Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_Plan_SubReporte_LineasAgrupadas
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim Monto As Decimal = 0
        Dim CodigoPlan As String = ""
        Dim Linea As String = ""

        If Not IsDBNull(GetCurrentColumnValue("dcMon")) Then Monto = CType(GetCurrentColumnValue("dcMon"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("P_vcNUM")) Then Linea = CType(GetCurrentColumnValue("P_vcNUM"), String)
        XrMontoDet.Text = Convert.ToDecimal(Monto).ToString(strForNum)

        If Linea <> Nothing Then
            CodigoPlan = GetCurrentColumnValue("P_vcNUM").ToString()
        End If

        If CodigoPlan = "" Then
            XrTable1.Visible = False
            xrTable7.Visible = False
        Else
            XrTable1.Visible = True
            xrTable7.Visible = True
        End If
    End Sub
End Class