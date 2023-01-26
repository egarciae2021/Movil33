Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Campana_DespachoOperador
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim IngNuevos As Integer = 0 : Dim IngRenov As Integer = 0 : Dim TotalIng As Integer = 0 : Dim DespNuev As Integer = 0
        Dim DespRenov As Integer = 0 : Dim TotDesp As Integer = 0

        If Not IsDBNull(GetCurrentColumnValue("IngresosNuevos")) Then IngNuevos = CType(GetCurrentColumnValue("IngresosNuevos"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("IngresosRenovacion")) Then IngRenov = CType(GetCurrentColumnValue("IngresosRenovacion"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("TotalIngresos")) Then TotalIng = CType(GetCurrentColumnValue("TotalIngresos"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("DespachosNuevos")) Then DespNuev = CType(GetCurrentColumnValue("DespachosNuevos"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("DespachosRenovacion")) Then DespRenov = CType(GetCurrentColumnValue("DespachosRenovacion"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("TotalDespachos")) Then TotDesp = CType(GetCurrentColumnValue("TotalDespachos"), Integer)

        XrIngNuevos.Text = Convert.ToInt32(IngNuevos).ToString(strForNumEntero)
        XrIngRenov.Text = Convert.ToInt32(IngRenov).ToString(strForNumEntero)
        XrTotalIng.Text = Convert.ToInt32(TotalIng).ToString(strForNumEntero)
        XrDespNuev.Text = Convert.ToInt32(DespNuev).ToString(strForNumEntero)
        XrDespRenov.Text = Convert.ToInt32(DespRenov).ToString(strForNumEntero)
        XrTotDesp.Text = Convert.ToInt32(TotDesp).ToString(strForNumEntero)
    End Sub
End Class