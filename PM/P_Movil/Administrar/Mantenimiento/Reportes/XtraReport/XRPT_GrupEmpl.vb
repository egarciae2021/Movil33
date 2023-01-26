Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_GrupEmpl
    Private Sub XRPT_GrupEmpl_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Me.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)
        xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
    End Sub

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Monto As Decimal = 0

        If Not IsDBNull(GetCurrentColumnValue("MONTO")) Then Monto = CType(GetCurrentColumnValue("MONTO"), Decimal)

        'Dim CantidadEmpleados As Integer = CType(GetCurrentColumnValue("TotalEmpleados"), Integer)
        Dim CantidadDispositivos As Integer = CType(GetCurrentColumnValue("DISPOSITIVO"), Integer)
        Dim CantidadLineas As Integer = CType(GetCurrentColumnValue("LINEAS"), Integer)

        XrMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        'xrDetalleEmpleados.Text = Convert.ToDecimal(CantidadEmpleados).ToString(strForNumEntero)
        xrDetalleDispositivos.Text = Convert.ToDecimal(CantidadDispositivos).ToString(strForNumEntero)
        xrDetalleLineas.Text = Convert.ToDecimal(CantidadLineas).ToString(strForNumEntero)


    End Sub

End Class