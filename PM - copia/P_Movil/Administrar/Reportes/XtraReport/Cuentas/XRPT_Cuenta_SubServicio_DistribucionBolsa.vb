Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_Cuenta_SubServicio_DistribucionBolsa
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Cantidad As Integer = 0

        If GetCurrentColumnValue("dcCanSer") <> "Ilimitado" Then
            Cantidad = CType(GetCurrentColumnValue("dcCanSer"), Integer)
            XrCantidadSubDet.Text = Cantidad.ToString(strForNumEntero)
        Else
            XrCantidadSubDet.Text = "Ilimitado"
        End If
    End Sub
End Class