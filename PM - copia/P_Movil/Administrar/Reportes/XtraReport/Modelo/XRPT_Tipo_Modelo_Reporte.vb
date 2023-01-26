Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_Tipo_Modelo_Reporte
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Cos_Equipo As Decimal = CType(GetCurrentColumnValue("deCosEqu"), Decimal)
        Dim Pre_Lista As Decimal = CType(GetCurrentColumnValue("dePreLis"), Decimal)
        Dim CodLinea As Integer = 0

        If Not IsDBNull(GetCurrentColumnValue("P_inCod")) Then CodLinea = CType(GetCurrentColumnValue("P_inCod"), Integer)

        XrCos_Equipo.Text = Convert.ToDecimal(Cos_Equipo).ToString(strForNum)
        XrPre_Lista.Text = Convert.ToDecimal(Pre_Lista).ToString(strForNum)

        If CodLinea = 0 Then
            XrTable3.Visible = False
            xrTable7.Visible = False
        Else
            XrTable3.Visible = True
            xrTable7.Visible = True
        End If


    End Sub
End Class