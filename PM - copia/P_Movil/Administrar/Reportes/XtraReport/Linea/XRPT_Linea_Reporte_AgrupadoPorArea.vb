﻿Imports System.Threading
Imports System.Globalization
Public Class XRPT_Linea_Reporte_AgrupadoPorArea
    Private iContador As Integer = 0
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
    End Sub

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        iContador += 1

        If iContador Mod 2 <> 0 Then
            XrLinea.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCodigo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCentro.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrIMEI.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrModelo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrArea.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrEmpleado.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTipo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCentro.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrSucursal.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrLinea.BackColor = Drawing.Color.White
            XrCodigo.BackColor = Drawing.Color.White
            XrCentro.BackColor = Drawing.Color.White
            XrIMEI.BackColor = Drawing.Color.White
            XrModelo.BackColor = Drawing.Color.White
            XrArea.BackColor = Drawing.Color.White
            XrEmpleado.BackColor = Drawing.Color.White
            XrTipo.BackColor = Drawing.Color.White
            XrCentro.BackColor = Drawing.Color.White
            XrSucursal.BackColor = Drawing.Color.White
        End If
    End Sub
End Class