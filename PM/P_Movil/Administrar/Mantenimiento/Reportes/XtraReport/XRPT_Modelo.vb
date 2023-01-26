Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_Modelo
    Inherits DevExpress.XtraReports.UI.XtraReport
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub

    Private Sub XRPT_Modelo_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Me.BeforePrint
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

        Dim CantidadLineas As Integer = CType(GetCurrentColumnValue("LINEA"), Integer)
        Dim CantidadAsignado As Integer = CType(GetCurrentColumnValue("ASIGNADO"), Integer)
        Dim CantidadDisponible As Integer = CType(GetCurrentColumnValue("DISPONIBLE"), Integer)
        Dim CantidadReservado As Integer = CType(GetCurrentColumnValue("RESERVADO"), Integer)

        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        XrDetalleLinea.Text = Convert.ToDecimal(CantidadLineas).ToString(strForNumEntero)
        xrDetalleAsignado.Text = Convert.ToDecimal(CantidadAsignado).ToString(strForNumEntero)
        xrDetalleDisponible.Text = Convert.ToDecimal(CantidadDisponible).ToString(strForNumEntero)
        xrDetalleReservado.Text = Convert.ToDecimal(CantidadReservado).ToString(strForNumEntero)
    End Sub
End Class