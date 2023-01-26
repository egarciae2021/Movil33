Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_Plan_SubServicio_ServiciosAgrupados
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)

        Dim Cantidad As Integer = 0
        Dim LineaCant As String = ""

        If Not IsDBNull(GetCurrentColumnValue("dcCanSer")) Then LineaCant = CType(GetCurrentColumnValue("dcCanSer"), String)

        If LineaCant = "Ilimitado" Then
            XrCantidadDet.Text = "Ilimitado"
        ElseIf LineaCant = Nothing Then
            XrCantidadDet.Text = ""
        Else
            Cantidad = CType(GetCurrentColumnValue("dcCanSer"), Integer)
            XrCantidadDet.Text = Convert.ToInt32(Cantidad).ToString(strForNumEntero)
        End If

    End Sub
End Class