Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization

Public Class XRPT_Organizacional

    Private Sub XRPT_Organizacional_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Me.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        UtilitarioWeb.ActualizarCultura(oCultura)
        xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
    End Sub

    Private Sub Detail_BeforePrint(sender As System.Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint

        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Monto As Decimal = 0
        Dim CantidadEmpleados As Integer = 0
        Dim CantidadLineas As Integer = 0
        Dim CantidadDispositivos As Integer = 0

        If Not IsDBNull(GetCurrentColumnValue("Monto")) Then Monto = CType(GetCurrentColumnValue("Monto"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("TotalEmpleados")) Then CantidadEmpleados = CType(GetCurrentColumnValue("TotalEmpleados"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("TotalLineas")) Then CantidadLineas = CType(GetCurrentColumnValue("TotalLineas"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("TotalDispositivos")) Then CantidadDispositivos = CType(GetCurrentColumnValue("TotalDispositivos"), Integer)

        xrDetalleMonto.Text = Convert.ToDecimal(Monto).ToString(strForNum)
        xrDetalleEmpleados.Text = Convert.ToDecimal(CantidadEmpleados).ToString(strForNumEntero)
        xrDetalleLineas.Text = Convert.ToDecimal(CantidadLineas).ToString(strForNumEntero)
        xrDetalleDispositivos.Text = Convert.ToDecimal(CantidadDispositivos).ToString(strForNumEntero)

    End Sub

    Private Sub xrchGrafico_CustomDrawSeriesPoint(sender As System.Object, e As DevExpress.XtraCharts.CustomDrawSeriesPointEventArgs) Handles xrchGrafico.CustomDrawSeriesPoint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strTipo As String = e.Series.ValueDataMembers(0).ToUpper()
        If strTipo <> "MONTO" Then 'Si no es monto son valores enteros (Cantidad de Empleados, Dispositivos o Líneas)
            oCultura.dcNumDec = 0
        End If
        Dim strForNum As String = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strValor As String = e.LabelText
        If IsNumeric(strValor) AndAlso strTipo = "MONTO" Then
            e.LabelText = oCultura.Moneda.vcSimMon & Convert.ToDecimal(strValor).ToString(strForNum).ToString()
        ElseIf IsNumeric(strValor) Then
            e.LabelText = Convert.ToDecimal(strValor).ToString(strForNum)
        End If
    End Sub

End Class