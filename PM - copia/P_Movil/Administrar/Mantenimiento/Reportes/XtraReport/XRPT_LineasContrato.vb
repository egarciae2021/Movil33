Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Public Class XRPT_LineasContrato
    Private Sub XRPT_Lineas_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Me.BeforePrint
    End Sub

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim MESESRESTANTES As Decimal = 0
        If Not IsDBNull(GetCurrentColumnValue("MesesRestantes")) Then
            MESESRESTANTES = CType(GetCurrentColumnValue("MesesRestantes"), Decimal)
        End If
        xrMesesPendientes.Text = MESESRESTANTES
        If MESESRESTANTES < 0 Then
            xrMesesPendientes.ForeColor = Drawing.Color.Red
        Else
            xrMesesPendientes.ForeColor = Drawing.Color.Black
        End If

        Dim MESESRESTANTESEQ As Decimal = 0
        If Not IsDBNull(GetCurrentColumnValue("MesesRestantesEq")) Then
            MESESRESTANTESEQ = CType(GetCurrentColumnValue("MesesRestantesEq"), Decimal)
        End If
        xrMesesPendientesEq.Text = MESESRESTANTESEQ
        If MESESRESTANTESEQ < 0 Then
            xrMesesPendientesEq.ForeColor = Drawing.Color.Red
        Else
            xrMesesPendientesEq.ForeColor = Drawing.Color.Black
        End If

    End Sub
End Class