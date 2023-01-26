Imports System.Threading
Imports System.Globalization
Public Class XRPT_Linea_Reporte_AgrupadoPorCCO
    Private iContador As Integer = 0
    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint

        iContador += 1

        If iContador Mod 2 <> 0 Then
            XrTableCell7.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell13.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell8.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell15.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell11.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell12.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell19.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell21.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell22.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell18.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell20.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell9.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrTableCell7.BackColor = Drawing.Color.White
            XrTableCell13.BackColor = Drawing.Color.White
            XrTableCell8.BackColor = Drawing.Color.White
            XrTableCell15.BackColor = Drawing.Color.White
            XrTableCell11.BackColor = Drawing.Color.White
            XrTableCell12.BackColor = Drawing.Color.White
            XrTableCell19.BackColor = Drawing.Color.White
            XrTableCell21.BackColor = Drawing.Color.White
            XrTableCell22.BackColor = Drawing.Color.White
            XrTableCell18.BackColor = Drawing.Color.White
            XrTableCell20.BackColor = Drawing.Color.White
            XrTableCell9.BackColor = Drawing.Color.White
        End If


    End Sub

    Private Sub GroupHeader1_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
    End Sub
End Class