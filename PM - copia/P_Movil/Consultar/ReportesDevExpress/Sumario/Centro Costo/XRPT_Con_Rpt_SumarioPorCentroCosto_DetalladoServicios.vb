Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_SumarioPorCentroCosto_DetalladoServicios
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim TotalGrupoCosto As Decimal = 0
    Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        Dim LlamadaFija% = 0 : Dim DuracionFija% = 0 : Dim LlamadaCelular% = 0 : Dim DuracionCelular% = 0 : Dim LlamadaInter% = 0 : Dim DuracionInter% = 0
        Dim CostFija As Decimal = 0 : Dim CostCel As Decimal = 0 : Dim CostInt As Decimal = 0 : Dim CostSRCEL As Decimal = 0 : Dim CosTotSRCEL As Decimal = 0
        Dim Orga$ = "" : Dim CorOrga$ = ""
        'LLENANDO COLUMNAS
        If Not IsDBNull(GetCurrentColumnValue("vcCodInt")) Then CorOrga = CType(GetCurrentColumnValue("vcCodInt"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomOrg")) Then Orga = CType(GetCurrentColumnValue("vcNomOrg"), String)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaLoc")) Then CostFija = CType(GetCurrentColumnValue("dcCosLlaLoc"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaCel")) Then CostCel = CType(GetCurrentColumnValue("dcCosLlaCel1"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaDdi")) Then CostInt = CType(GetCurrentColumnValue("dcCosLlaDdi"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaSRCel")) Then CostSRCEL = CType(GetCurrentColumnValue("dcCosLlaSRCel"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaTot")) Then CosTotSRCEL = CType(GetCurrentColumnValue("dcCosLlaTot"), Decimal)
        'OBTENIENDO COLUMNAS PARA LOS TOTALES
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaLoc")) Then LlamadaFija = CType(GetCurrentColumnValue("inNumLlaLoc"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaLoc")) Then DuracionFija = CType(GetCurrentColumnValue("inDurReaLlaLoc"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaCel")) Then LlamadaCelular = CType(GetCurrentColumnValue("inNumLlaCel"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaCel")) Then DuracionCelular = CType(GetCurrentColumnValue("inDurReaLlaCel"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inNumLlaDdi")) Then LlamadaInter = CType(GetCurrentColumnValue("inNumLlaDdi"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurReaLlaDdi")) Then DuracionInter = CType(GetCurrentColumnValue("inDurReaLlaDdi"), Integer)

        XrOrganizacion.Text = CorOrga + " " + Orga
        XrCostFija.Text = Convert.ToDecimal(CostFija).ToString(strForNum)
        XrCostCel.Text = Convert.ToDecimal(CostCel).ToString(strForNum)
        XrCostInt.Text = Convert.ToDecimal(CostInt).ToString(strForNum)
        XrCostSRCEL.Text = Convert.ToDecimal(CostSRCEL).ToString(strForNum)
        XrCosTotSRCEL.Text = Convert.ToDecimal(CosTotSRCEL).ToString(strForNum)
        iContador = 0
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim Consumo$ = "" : Dim CostoTable2 As Decimal = 0 : Dim TotalBytesEnv$ = "" : Dim TotalBytesRec$ = "" : Dim inBytEnv% = 0 : Dim inBytRec% = 0
        'LLENANDO COLUMNAS
        If Not IsDBNull(GetCurrentColumnValue("vcExpEn")) Then Consumo = CType(GetCurrentColumnValue("vcExpEn"), String)
        If Not IsDBNull(GetCurrentColumnValue("dcCosLlaTot")) Then CostoTable2 = CType(GetCurrentColumnValue("dcCosLlaTot"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("vcExpEn")) Then TotalBytesEnv = CType(GetCurrentColumnValue("vcExpEn"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcExpEn")) Then TotalBytesRec = CType(GetCurrentColumnValue("vcExpEn"), String)
        If Not IsDBNull(GetCurrentColumnValue("inBytEnv")) Then inBytEnv = CType(GetCurrentColumnValue("inBytEnv"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inBytRec")) Then inBytRec = CType(GetCurrentColumnValue("inBytRec"), Integer)

        If (Consumo = "Mb") Then
            XrConsumo.Text = Consumo.ToString()
        Else
            XrConsumo.Text = ""
        End If
        XrCostoTable2.Text = CostoTable2.ToString(strForNum)

        If (TotalBytesEnv = "Mb") Then
            If Calcular_Byte(inBytEnv) > 0 Then
                XrTotalBytesEnv.Text = Calcular_Byte(inBytEnv).ToString() + " " + TotalBytesEnv
            Else
                XrTotalBytesEnv.Text = "(" + Replace(inBytEnv, ".00", "") + " b) " + Calcular_Byte(inBytEnv).ToString() + " " + TotalBytesEnv
            End If
        Else
            XrTotalBytesEnv.Text = "0.00"
        End If

        If (TotalBytesRec = "Mb") Then
            If Calcular_Byte(inBytRec) > 0 Then
                XrTotalBytesEnv.Text = Calcular_Byte(inBytRec).ToString() + " " + TotalBytesRec
            Else
                XrTotalBytesRec.Text = "(" + Replace(inBytRec, ".00", "") + " b) " + Calcular_Byte(inBytRec).ToString() + " " + TotalBytesRec
            End If
        Else
            XrTotalBytesRec.Text = "0.00"
        End If


        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrTableCell29.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell30.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTableCell31.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrConsumo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCostoTable2.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTotalBytesEnv.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTotalBytesRec.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrTableCell29.BackColor = Drawing.Color.White
            XrTableCell30.BackColor = Drawing.Color.White
            XrTableCell31.BackColor = Drawing.Color.White
            XrConsumo.BackColor = Drawing.Color.White
            XrCostoTable2.BackColor = Drawing.Color.White
            XrTotalBytesEnv.BackColor = Drawing.Color.White
            XrTotalBytesRec.BackColor = Drawing.Color.White
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
End Class