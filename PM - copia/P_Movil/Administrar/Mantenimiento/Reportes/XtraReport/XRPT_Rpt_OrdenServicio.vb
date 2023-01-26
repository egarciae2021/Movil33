Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization

Public Class XRPT_Rpt_OrdenServicio
    Private iContador As Integer = 0
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim Monto As Decimal = 0, MontoFactura = 0

        Me.XrLabel15.DataBindings("Text").FormatString = "{0:" + strForNum + "}"
        Me.XrLabel14.DataBindings("Text").FormatString = "{0:" + strForNum + "}"

        iContador += 1

        If iContador Mod 2 <> 0 Then
            XrLabel9.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLabel10.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLabel11.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLabel12.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLabel13.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLabel14.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLabel18.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrLabel9.BackColor = Drawing.Color.White
            XrLabel10.BackColor = Drawing.Color.White
            XrLabel11.BackColor = Drawing.Color.White
            XrLabel12.BackColor = Drawing.Color.White
            XrLabel13.BackColor = Drawing.Color.White
            XrLabel14.BackColor = Drawing.Color.White
            XrLabel18.BackColor = Drawing.Color.White
        End If

    End Sub

    Private Sub GroupHeader1_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
    End Sub

    Private Sub XRPT_Rpt_OrdenServicio_AfterPrint(sender As Object, e As EventArgs) Handles MyBase.AfterPrint

        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)

        'Me.XrLabel15.Summary.FormatString = "{0:" + strForNum + "}"
        'Me.XrLabel14.Summary.FormatString = "{0:" + strForNum + "}"

    End Sub
End Class