Public Class XRPT_Dispositivo_Sub_AgrupadoPorEmpleado

    Private Sub Detail_BeforePrint(sender As Object, e As System.Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim CodigoLinea As String = ""

        If Not IsDBNull(GetCurrentColumnValue("P_vcNum")) Then CodigoLinea = CType(GetCurrentColumnValue("P_vcNum"), String)
        If IsDBNull(GetCurrentColumnValue("P_vcNum")) <> Nothing Then
            CodigoLinea = ""
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