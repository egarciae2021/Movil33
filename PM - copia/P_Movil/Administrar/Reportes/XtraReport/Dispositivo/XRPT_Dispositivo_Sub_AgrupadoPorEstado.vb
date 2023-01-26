Public Class XRPT_Dispositivo_Sub_AgrupadoPorEstado

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim CodigoLinea As String = ""

        If GetCurrentColumnValue("P_vcNum") <> Nothing Then
            CodigoLinea = GetCurrentColumnValue("P_vcNum").ToString()
        End If

        If CodigoLinea = "" Then
            XrTable2.Visible = False
            xrDetalle.Visible = False
        Else
            XrTable2.Visible = True
            xrDetalle.Visible = True
        End If
    End Sub
End Class