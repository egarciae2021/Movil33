Imports System.Threading
Imports System.Globalization
Public Class XRPT_Modelo_AgrupadoPorGrupo
    Private iContador As Integer = 0
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
    End Sub

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        iContador += 1

        If iContador Mod 2 <> 0 Then
            XrTableCell4.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell5.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell6.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell2.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrTableCell4.BackColor = Drawing.Color.White
            XrTableCell5.BackColor = Drawing.Color.White
            XrTableCell6.BackColor = Drawing.Color.White
            XrTableCell2.BackColor = Drawing.Color.White
        End If
    End Sub
End Class