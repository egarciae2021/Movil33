Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_DetallePlan
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0 : Dim CostoTotal As Decimal = 0 
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim SubMonto As Decimal = 0 : Dim Linea As String = "" : Dim Empleado As String = "" : Dim NumLla As Integer = 0
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then SubMonto = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("vcNumCel")) Then Linea = CType(GetCurrentColumnValue("vcNumCel"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomEmp")) Then Empleado = CType(GetCurrentColumnValue("vcNomEmp"), String)
        If Not IsDBNull(GetCurrentColumnValue("inNumLla")) Then NumLla = CType(GetCurrentColumnValue("inNumLla"), Integer)
        XrLineaEmpleado.Text = Linea + " " + Empleado
        XrCosto.Text = Convert.ToDecimal(SubMonto).ToString(strForNum)
        XrConsumo.Text = Calcular_Consumo(Convert.ToInt32(GetCurrentColumnValue("inNumLla")))
        XrNumLla.Text = Convert.ToInt32(NumLla).ToString(strForNumEntero)
        'TOTAL GENERAL
        CostoTotal += Convert.ToDecimal(SubMonto)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrNomser.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrConsumo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTipoSer.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNumLla.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrNomser.BackColor = Drawing.Color.White
            XrConsumo.BackColor = Drawing.Color.White
            XrTipoSer.BackColor = Drawing.Color.White
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
                consumo.Text = Calcular_Byte(num).ToString() + GetCurrentColumnValue("vcRepExpEn")
            Else
                consumo.Text = "(" + Replace(num, ".00", "") + " b)" + Calcular_Byte(num).ToString() + " " + GetCurrentColumnValue("vcRepExpEn")
            End If
        Else
            consumo.Text = Replace(num.ToString() + " " + DirectCast(GetCurrentColumnValue("vcExpEn"), String), ".00", "")
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
    Private Sub ReportFooter_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles ReportFooter.BeforePrint
        XrCostoTotal.Text = Convert.ToDecimal(CostoTotal).ToString(strForNum)
    End Sub
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
    End Sub
End Class