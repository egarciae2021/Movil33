Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_ConsumoPorPlan
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0 : Dim TotalEmpleadoNoConsumido As Decimal = 0 : Dim TotalEmpleadoExceso As Int64 : Dim TotalPlanNoConsumido As Decimal = 0
    Dim TotalPlanExceso As Decimal = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim SubExceso As Decimal = 0 : Dim SubNoConsumido As Decimal = 0
        If Not IsDBNull(GetCurrentColumnValue("dcCosRea")) Then SubExceso = CType(GetCurrentColumnValue("dcCosRea"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcMonNoConsumido")) Then SubNoConsumido = CType(GetCurrentColumnValue("dcMonNoConsumido"), Decimal)
        'TOTAL EMPLEADO EXCESO
        TotalEmpleadoExceso += Convert.ToDouble(SubExceso)
        'TOTAL EMPLEADO NO CONSUMIDO
        TotalEmpleadoNoConsumido += Convert.ToDouble(SubNoConsumido)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrNumTel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNomTel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNumLla.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrExceso.BackColor = Drawing.Color.FromArgb(196, 220, 255)

        Else
            XrNumTel.BackColor = Drawing.Color.White
            XrNomTel.BackColor = Drawing.Color.White
            XrNumLla.BackColor = Drawing.Color.White
            XrExceso.BackColor = Drawing.Color.White
        End If
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrTotalEmpleadoExceso.Text = Convert.ToDecimal(TotalEmpleadoExceso).ToString(strForNum)
        XrTotalEmpleadoNoConsumido.Text = Convert.ToDecimal(TotalEmpleadoNoConsumido).ToString(strForNum)
        TotalPlanNoConsumido += TotalEmpleadoNoConsumido
        TotalPlanExceso += TotalEmpleadoExceso
    End Sub
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0 : TotalEmpleadoExceso = 0 : TotalEmpleadoNoConsumido = 0
    End Sub
    Private Sub GroupHeader2_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader2.BeforePrint
        TotalPlanNoConsumido = 0 : TotalPlanExceso = 0
    End Sub

    Private Sub GroupFooter2_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter2.BeforePrint
        XrTotalPlanNoConsumido.Text = Convert.ToDecimal(TotalPlanNoConsumido).ToString(strForNum)
        XrTotalPlanExceso.Text = Convert.ToDecimal(TotalPlanExceso).ToString(strForNum)
    End Sub
End Class