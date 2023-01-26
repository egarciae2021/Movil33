Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_Desconocido
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0
    Dim TotLlamCantidad% = 0 : Dim TotLlamConsumo% = 0 : Dim TotMenCantidad% = 0
    Dim TotDatEnviados% = 0 : Dim TotDatRecibidos% = 0 : Dim TotalCosto As Decimal = 0
    Dim DatEnviados$ = "" : Dim DatRecibidos$ = ""
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura) : Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim LlamCantidad% = 0 : Dim LamConsumo% = 0 : Dim MenCantidad% = 0 : Dim inBytEnv% = 0 : Dim inBytRec% = 0
        Dim Costo As Decimal = 0 : Dim CodSuc$ = "" : Dim NomSuc$ = ""
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then Costo = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        If Not IsDBNull(GetCurrentColumnValue("vcExpEn")) Then DatEnviados = CType(GetCurrentColumnValue("vcExpEn"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcExpEn")) Then DatRecibidos = CType(GetCurrentColumnValue("vcExpEn"), String)
        If Not IsDBNull(GetCurrentColumnValue("inBytEnv")) Then inBytEnv = CType(GetCurrentColumnValue("inBytEnv"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inBytRec")) Then inBytRec = CType(GetCurrentColumnValue("inBytRec"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inNumLla")) Then LlamCantidad = CType(GetCurrentColumnValue("inNumLla"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inDurLla")) Then LamConsumo = CType(GetCurrentColumnValue("inDurLla"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("inNumMen")) Then MenCantidad = CType(GetCurrentColumnValue("inNumMen"), Integer)
        If Not IsDBNull(GetCurrentColumnValue("vcCodSuc")) Then CodSuc = CType(GetCurrentColumnValue("vcCodSuc"), String)
        If Not IsDBNull(GetCurrentColumnValue("vcNomSuc")) Then NomSuc = CType(GetCurrentColumnValue("vcNomSuc"), String)
        XrSucursal.Text = CodSuc + " - " + NomSuc
        XrCosto.Text = Convert.ToDecimal(Costo).ToString(strForNum)
        If (DatEnviados = "Mb") Then
            If Calcular_Byte(inBytEnv) > 0 Then
                XrDatEnviados.Text = Calcular_Byte(inBytEnv).ToString() + " " + DatEnviados
            Else
                XrDatEnviados.Text = "(" + Replace(inBytEnv, ".00", "") + " b) " + Calcular_Byte(inBytEnv).ToString() + " " + DatEnviados
            End If
        Else
            XrDatEnviados.Text = "0.00"
        End If

        If (DatRecibidos = "Mb") Then
            If Calcular_Byte(inBytRec) > 0 Then
                XrDatRecibidos.Text = Calcular_Byte(inBytRec).ToString() + " " + DatRecibidos
            Else
                XrDatRecibidos.Text = "(" + Replace(inBytRec, ".00", "") + " b) " + Calcular_Byte(inBytRec).ToString() + " " + DatRecibidos
            End If
        Else
            XrDatRecibidos.Text = "0.00"
        End If
        TotLlamCantidad += Convert.ToInt32(LlamCantidad) : TotLlamConsumo += Convert.ToInt32(LamConsumo) : TotMenCantidad += Convert.ToInt32(MenCantidad%)
        TotDatEnviados += Convert.ToInt32(inBytEnv) : TotDatRecibidos += Convert.ToInt32(inBytRec)
        TotalCosto += Convert.ToDecimal(Costo)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrCelular.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLlamCantidad.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrLamConsumo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrMenCantidad.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDatEnviados.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrDatRecibidos.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrCelular.BackColor = Drawing.Color.White
            XrLlamCantidad.BackColor = Drawing.Color.White
            XrLamConsumo.BackColor = Drawing.Color.White
            XrMenCantidad.BackColor = Drawing.Color.White
            XrDatEnviados.BackColor = Drawing.Color.White
            XrDatRecibidos.BackColor = Drawing.Color.White
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
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        iContador = 0
    End Sub
    Private Sub ReportFooter_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles ReportFooter.BeforePrint
        XrTotLlamCantidad.Text = TotLlamCantidad.ToString(strForNumEntero)
        XrTotLlamConsumo.Text = Calcular_Hora(TotLlamConsumo.ToString(strForNumEntero))
        XrTotMenCantidad.Text = TotMenCantidad.ToString(strForNumEntero)
        If (DatEnviados = "Mb") Then
            If Calcular_Byte(TotDatEnviados) > 0 Then
                XrTotDatEnviados.Text = Calcular_Byte(TotDatEnviados).ToString() + " " + DatEnviados
            Else
                XrTotDatEnviados.Text = "(" + Replace(TotDatEnviados, ".00", "") + " b) " + Calcular_Byte(TotDatEnviados).ToString() + " " + DatEnviados
            End If
        Else
            XrTotDatEnviados.Text = "0.00"
        End If

        If (DatRecibidos = "Mb") Then
            If Calcular_Byte(TotDatRecibidos) > 0 Then
                XrTotDatRecibidos.Text = Calcular_Byte(TotDatRecibidos).ToString() + " " + DatRecibidos
            Else
                XrTotDatRecibidos.Text = "(" + Replace(TotDatRecibidos, ".00", "") + " b) " + Calcular_Byte(TotDatRecibidos).ToString() + " " + DatRecibidos
            End If
        Else
            XrTotDatRecibidos.Text = "0.00"
        End If
        XrTotalCosto.Text = TotalCosto.ToString(strForNum)
    End Sub
End Class