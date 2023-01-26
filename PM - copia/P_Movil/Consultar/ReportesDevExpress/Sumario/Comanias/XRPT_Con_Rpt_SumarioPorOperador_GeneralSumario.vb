Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorOperador_GeneralSumario
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0
    Dim TotOpeLlamada% = 0 : Dim TotOpeDuracion% = 0 : Dim TotOpeCosto As Decimal = 0
    Dim TotSucuLlam% = 0 : Dim TotSucuDur% = 0 : Dim TotSucuCosto As Decimal = 0
    Dim TotLlamada% = 0 : Dim TotDuracion% = 0 : Dim TotalCosto As Decimal = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim Cantidad% = 0 : Dim Consumo% = 0 : Dim Costo As Decimal = 0
        Dim Sucursal$ = "" : Dim CodSucursal$ = "" : Dim Operador$ = "" : Dim CodOperador$ = ""
        'OBTENER NOMBRE GRUPO
        If Not IsDBNull(GetCurrentColumnValue("vcCodSuc")) Then CodSucursal = CType(GetCurrentColumnValue("vcCodSuc"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomSuc")) Then Sucursal = CType(GetCurrentColumnValue("vcNomSuc"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcCodOpe")) Then CodOperador = CType(GetCurrentColumnValue("vcCodOpe"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOpe")) Then Operador = CType(GetCurrentColumnValue("vcNomOpe"), String)
        'SUMAR COLUMNAS
        If Not IsDBNull(GetCurrentColumnValue("inNumLla")) Then Cantidad = CType(GetCurrentColumnValue("inNumLla"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurLla")) Then Consumo = CType(GetCurrentColumnValue("inDurLla"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then Costo = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        XrSucursal.Text = CodSucursal + " - " + Sucursal : XrOperador.Text = CodOperador + " - " + Operador
        XrCosto.Text = Convert.ToDecimal(Costo).ToString(strForNum)
        'SUMANDO OPERADOR
        TotOpeLlamada += Convert.ToInt32(Cantidad) : TotOpeDuracion += Convert.ToInt32(Consumo) : TotOpeCosto += Convert.ToDecimal(Costo)
        'SUMANDO TOTALES
        TotLlamada += Convert.ToInt32(Cantidad) : TotDuracion += Convert.ToInt32(Consumo) : TotalCosto += Convert.ToDecimal(Costo)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrServicio.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNomServicio.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCantidad.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrConsumo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrServicio.BackColor = Drawing.Color.White
            XrNomServicio.BackColor = Drawing.Color.White
            XrCantidad.BackColor = Drawing.Color.White
            XrConsumo.BackColor = Drawing.Color.White
            XrCosto.BackColor = Drawing.Color.White
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
        iContador = 0 : TotOpeLlamada = 0 : TotOpeDuracion = 0 : TotOpeCosto = 0
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrTotOpeLlamada.Text = TotOpeLlamada.ToString(strForNumEntero)
        XrTotOpeDuracion.Text = Calcular_Hora(TotOpeDuracion)
        XrTotOpeCosto.Text = TotOpeCosto.ToString(strForNum)
        'SUMANDO SUCURSAL
        TotSucuLlam += TotOpeLlamada : TotSucuDur += TotOpeDuracion : TotSucuCosto += TotOpeCosto
    End Sub
    Private Sub GroupHeader2_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader2.BeforePrint
        TotSucuLlam = 0 : TotSucuDur = 0 : TotSucuCosto = 0
    End Sub
    Private Sub GroupFooter2_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter2.BeforePrint
        XrTotSucuLlam.Text = TotSucuLlam.ToString(strForNumEntero)
        XrTotSucuDur.Text = Calcular_Hora(TotSucuDur)
        XrTotSucuCosto.Text = TotSucuCosto.ToString(strForNum)
    End Sub
    Private Sub ReportFooter_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles ReportFooter.BeforePrint
        XrTotLlamada.Text = TotLlamada.ToString(strForNumEntero)
        XrTotDuracion.Text = Calcular_Hora(TotDuracion)
        XrTotalCosto.Text = TotalCosto.ToString(strForNum)
    End Sub
End Class