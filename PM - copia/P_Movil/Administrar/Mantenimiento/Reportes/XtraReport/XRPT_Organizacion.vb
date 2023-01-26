Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_Organizacion
    Inherits DevExpress.XtraReports.UI.XtraReport
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub

    Private Sub XRPT_Organizacion_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Me.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)
        xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
    End Sub

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim oCulturaEntero As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        oCulturaEntero.dcNumDec = 0

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCulturaEntero)

        Dim Monto As Decimal = 0

        If Not IsDBNull(GetCurrentColumnValue("MONTO")) Then Monto = CType(GetCurrentColumnValue("MONTO"), Decimal)

        Dim CantidadEmpleados As Integer = CType(GetCurrentColumnValue("EMPLEADOS"), Integer)

        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        XrDetalleEmpleados.Text = Convert.ToDecimal(CantidadEmpleados).ToString(strForNumEntero)
    End Sub
End Class