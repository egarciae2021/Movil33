Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Plan
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Monto As Decimal = 0

        If Not IsDBNull(GetCurrentColumnValue("MONTO")) Then Monto = CType(GetCurrentColumnValue("MONTO"), Decimal)

        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        iContador += 1

        If iContador Mod 2 <> 0 Then
            XrPlan.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrOperador.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTipLinea.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrMinutos.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrMonto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrPlan.BackColor = Drawing.Color.White
            XrOperador.BackColor = Drawing.Color.White
            XrTipLinea.BackColor = Drawing.Color.White
            XrMinutos.BackColor = Drawing.Color.White
            XrMonto.BackColor = Drawing.Color.White
        End If

    End Sub

    Private Sub GroupHeader1_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        Dim Modelo As String = ""
        If Not IsDBNull(GetCurrentColumnValue("vcNom")) Then Modelo = CType(GetCurrentColumnValue("vcNom"), String)

        If Modelo = Nothing Then
            LBLmodelogrupo.Text = "SIN MODELO ASOCIADO"
        Else
            LBLmodelogrupo.Text = GetCurrentColumnValue("vcNom").ToString()
        End If
        iContador = 0
    End Sub
End Class