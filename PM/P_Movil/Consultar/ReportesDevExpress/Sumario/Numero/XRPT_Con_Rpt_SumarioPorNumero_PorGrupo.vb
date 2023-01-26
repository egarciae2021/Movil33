Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorNumero_PorGrupo
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0
    Dim SubTotLlamada% = 0 : Dim SubTotDuracion% = 0 : Dim SubTotalCosto As Decimal = 0
    Dim TotLlamada% = 0 : Dim TotDuracion% = 0 : Dim TotalCosto As Decimal = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim Costo As Decimal = 0 : Dim Porcentaje$ = "" : Dim inNumLla% = 0 : Dim Duracion% = 0 : Dim inCodTip% = 0
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then Costo = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("inNumLla")) Then inNumLla = CType(GetCurrentColumnValue("inNumLla"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurLla")) Then Duracion = CType(GetCurrentColumnValue("inDurLla"), Integer)
        XrCosto.Text = Convert.ToDecimal(Costo).ToString(strForNum)
        If Costo > 0 Then XrPorcentaje.Text = Convert.ToDecimal(Costo / (Costo * 100)).ToString(strForNum) Else XrPorcentaje.Text = "0.00"
        SubTotLlamada += Convert.ToInt32(inNumLla) : SubTotDuracion += Convert.ToInt32(Duracion) : SubTotalCosto += Convert.ToDecimal(Costo)
        TotLlamada += Convert.ToInt32(inNumLla) : TotDuracion += Convert.ToInt32(Duracion) : TotalCosto += Convert.ToDecimal(Costo)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrSubTipo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLlamada.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDuracion.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrPorcentaje.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrSubTipo.BackColor = Drawing.Color.White
            XrLlamada.BackColor = Drawing.Color.White
            XrDuracion.BackColor = Drawing.Color.White
            XrCosto.BackColor = Drawing.Color.White
            XrPorcentaje.BackColor = Drawing.Color.White
        End If
    End Sub
    Function Calcular_Hora(ByVal num As Integer)
        Dim hora As Integer = 0, min As Integer = 0, seg As Integer = 0
        Dim consumo As XRTableCell = New XRTableCell()
        hora = Int(num / 3600)
        min = Int((num - hora * 3600) / 60)
        seg = Int(num - (hora * 3600 + min * 60))
        consumo.Text = hora.ToString("00") + ":" + min.ToString("00") + ":" + seg.ToString("00")
        Return consumo.Text
    End Function
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0 : SubTotLlamada = 0 : SubTotDuracion = 0 : SubTotalCosto = 0
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrSubTotLlamada.Text = SubTotLlamada.ToString(strForNumEntero) : XrSubTotDuracion.Text = Calcular_Hora(SubTotDuracion) : XrSubTotalCosto.Text = SubTotalCosto.ToString(strForNum)
    End Sub
    Private Sub ReportFooter_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles ReportFooter.BeforePrint
        XrTotLlamada.Text = TotLlamada.ToString(strForNumEntero) : XrTotDuracion.Text = Calcular_Hora(TotDuracion) : XrTotalCosto.Text = TotalCosto.ToString(strForNum)
    End Sub
End Class