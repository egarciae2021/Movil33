Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_TipoLlamadaPorEmpleado
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0 : Dim SubTotalCosto As Decimal = 0 : Dim SubTotalLlamada As Int64 : Dim TotalTipoLlamada As Int64 = 0 : Dim TotalTipoCosto As Decimal = 0
    Dim TotalGrupoLlamada As Int64 = 0 : Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim TotalGrupoCosto As Decimal = 0
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim SubMonto As Decimal = 0 : Dim Orga As String = "" : Dim CorOrga As String = "" : Dim SubLlamadas As Integer = 0
        Dim CodEmpleado As String = "" : Dim Empleado As String = "" : Dim Estado As Integer = 0
        If Not IsDBNull(GetCurrentColumnValue("btEstNum")) Then Estado = CType(GetCurrentColumnValue("btEstNum"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then SubMonto = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("inNumLla")) Then SubLlamadas = CType(GetCurrentColumnValue("inNumLla"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOrg")) Then Orga = CType(GetCurrentColumnValue("vcNomOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcCodOrg")) Then CorOrga = CType(GetCurrentColumnValue("vcCodOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcCodEmp")) Then CodEmpleado = CType(GetCurrentColumnValue("vcCodEmp"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomEmp")) Then Empleado = CType(GetCurrentColumnValue("vcNomEmp"), String)

        If Estado = 1 Then
            XrVerificar.Text = ".Ok"
        Else
            XrVerificar.Text = ""
        End If

        XrCodArea.Text = CorOrga + " " + Orga
        XrCodEmpleado.Text = CodEmpleado + " " + Empleado
        XrCosto.Text = Convert.ToDecimal(SubMonto).ToString(strForNum)
        XrConsumo.Text = Calcular_Consumo(Convert.ToInt64(GetCurrentColumnValue("inDurLla")))
        'SUB TOTAL COSTO
        SubTotalCosto += Convert.ToDouble(SubMonto)
        'SUB TOTAL LLAMADA
        SubTotalLlamada += SubLlamadas
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrNumTel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNomTel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrVerificar.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrConsumo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNumLla.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrNumTel.BackColor = Drawing.Color.White
            XrNomTel.BackColor = Drawing.Color.White
            XrVerificar.BackColor = Drawing.Color.White
            XrConsumo.BackColor = Drawing.Color.White
            XrNumLla.BackColor = Drawing.Color.White
            XrCosto.BackColor = Drawing.Color.White
        End If
    End Sub
    Function Calcular_Consumo(ByVal num As Integer)
        Dim hora As Integer = 0, min As Integer = 0, seg As Integer = 0
        Dim consumo As XRTableCell = New XRTableCell()
        If GetCurrentColumnValue("vcExpEn") = "min" Then
            hora = Int(num / 3600)
            min = Int((num - hora * 3600) / 60)
            seg = Int(num - (hora * 3600 + min * 60))
            consumo.Text = hora.ToString("00") + ":" + min.ToString("00") + ":" + seg.ToString("00")
        ElseIf GetCurrentColumnValue("vcExpEn") = "Mb" Then
            If Calcular_Byte(num) > 0 Then
                consumo.Text = Calcular_Byte(num).ToString() + GetCurrentColumnValue("vcRepExpEn").ToString()
            Else
                consumo.Text = "(" + Replace(num, ".00", "") + " b)" + Calcular_Byte(num).ToString() + " " + GetCurrentColumnValue("vcRepExpEn").ToString()
            End If
        Else
            consumo.Text = Replace(DirectCast(GetCurrentColumnValue("inNumLla"), Integer).ToString() + " " + DirectCast(GetCurrentColumnValue("vcExpEn"), String), ".00", "")
        End If
        Return consumo.Text
    End Function
    Function Calcular_Byte(ByVal num As Integer) As Integer
        Dim capacidad As Integer = 0
        If GetCurrentColumnValue("vcExpEn") = "Mb" Then
            If GetCurrentColumnValue("vcRepExpEn") = "B" Then
                capacidad = num
            ElseIf GetCurrentColumnValue("vcRepExpEn") = "KB" Then
                capacidad = num / 1024
            ElseIf GetCurrentColumnValue("vcRepExpEn") = "MB" Then
                capacidad = (num / 1024) / 1024
            ElseIf GetCurrentColumnValue("vcRepExpEn") = "GB" Then
                capacidad = ((num / 1024) / 1024) / 1024
            Else
                capacidad = (((num / 1024) / 1024) / 1024) / 1024
            End If
        End If
        Return capacidad
    End Function
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrSubTotalCosto.Text = Convert.ToDecimal(SubTotalCosto).ToString(strForNum)
        XrSubTotalLlamada.Text = SubTotalLlamada.ToString(strForNumEntero)

        'TOTAL TIPO COSTO
        TotalTipoCosto += Convert.ToDecimal(SubTotalCosto)
        'TOTAL TIPO LLAMADA
        TotalTipoLlamada += SubTotalLlamada
    End Sub
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0 : SubTotalCosto = 0 : SubTotalLlamada = 0
    End Sub
    Private Sub GroupHeader2_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader2.BeforePrint
        TotalTipoCosto = 0 : TotalTipoLlamada = 0
    End Sub
    Private Sub GroupFooter2_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter2.BeforePrint
        XrTotalNomtipCosto.Text = Convert.ToDecimal(TotalTipoCosto).ToString(strForNum)
        XrTotalNomTipLlamadas.Text = TotalTipoLlamada.ToString(strForNumEntero)

        'TOTAL GRUPO COSTO
        TotalGrupoCosto += Convert.ToDecimal(TotalTipoCosto)
        'TOTAL GRUPO LLAMADA
        TotalGrupoLlamada += TotalTipoLlamada
    End Sub

    Private Sub GroupFooter3_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter3.BeforePrint
        XrTotalGrupoCosto.Text = Convert.ToDecimal(TotalGrupoCosto).ToString(strForNum)
        XrTotalGrupLlamadas.Text = TotalGrupoLlamada.ToString(strForNumEntero)
    End Sub

    Private Sub GroupHeader3_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader3.BeforePrint
        TotalGrupoCosto = 0 : TotalGrupoLlamada = 0
    End Sub
End Class