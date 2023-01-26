Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPTSubPlan
    Inherits DevExpress.XtraReports.UI.XtraReport
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
        Dim Cantidad As Integer = CType(GetCurrentColumnValue("CANTIDAD"), Integer)

        XrMontoDet.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        XrCantidadDet.Text = Convert.ToDecimal(Cantidad).ToString(strForNum)

    End Sub

    Private Sub XRPTSubPlan_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Me.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)
        xrTituloMontoDeta.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
    End Sub
End Class