Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Imports UtilitarioWeb
Public Class XRPT_Con_Rpt_ResumenServicioPorEmp
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0 : Dim SubTotalCosto As Decimal = 0 : Dim SubTotalConsumo As Int64 : Dim TotalArea As Decimal = 0 : Dim TotalGeneral As Decimal = 0
    Dim TotalEmleado As Decimal = 0 : Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
            Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
            Dim SubMonto As Decimal = 0 : Dim Orga As String = "" : Dim CorOrga As String = ""
            If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then SubMonto = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
            If Not IsDBNull(GetCurrentColumnValue("vcNomOrg")) Then Orga = CType(GetCurrentColumnValue("vcNomOrg"), String)
            If Not IsDBNull(GetCurrentColumnValue("vcCodOrg")) Then CorOrga = CType(GetCurrentColumnValue("vcCodOrg"), String)
            XrOrganizacion.Text = CorOrga + " " + Orga
            XrCosto.Text = Convert.ToDecimal(SubMonto).ToString(strForNum)
            XrConsumo.Text = Calcular_Consumo(Convert.ToInt64(GetCurrentColumnValue("inDuracionLlamada")))
            'SUB TOTAL COSTO
            SubTotalCosto += Convert.ToDouble(SubMonto)
            'SUB TOTAL CONSUMO
            SubTotalConsumo += Convert.ToInt64(GetCurrentColumnValue("inDuracionLlamada"))
            'TOTAL AREA
            TotalArea += Convert.ToDecimal(SubMonto)
            'TOTAL GENERAL
            TotalGeneral += Convert.ToDecimal(SubMonto)
            Pintar_Filas()

        Catch ex As Exception
            'procGeneraLOG("Detail_BeforePrint - ex: " & ex.ToString())
        End Try
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrGlo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNumtel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNomtel.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrConsumo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNumLla.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrGlo.BackColor = Drawing.Color.White
            XrNumtel.BackColor = Drawing.Color.White
            XrNomtel.BackColor = Drawing.Color.White
            XrConsumo.BackColor = Drawing.Color.White
            XrNumLla.BackColor = Drawing.Color.White
            XrCosto.BackColor = Drawing.Color.White
        End If
    End Sub
    Function Calcular_Consumo(ByVal num As Integer)
        Dim hora As Integer = 0, min As Integer = 0, seg As Integer = 0
        Dim consumo As XRTableCell = New XRTableCell()
        Try
            If GetCurrentColumnValue("vcExpEn") = "min" Then
                hora = Int(num / 3600)
                min = Int((num - hora * 3600) / 60)
                seg = Int(num - (hora * 3600 + min * 60))
                consumo.Text = hora.ToString("00") + ":" + min.ToString("00") + ":" + seg.ToString("00")
            ElseIf GetCurrentColumnValue("vcExpEn") = "Mb" Then
                If Calcular_Byte(Convert.ToInt64(GetCurrentColumnValue("inDuracionLlamada"))) > 0 Then
                    consumo.Text = Calcular_Byte(Convert.ToInt64(GetCurrentColumnValue("inDuracionLlamada"))).ToString() + GetCurrentColumnValue("vcRepExpEn")
                Else
                    consumo.Text = "(" + Replace(GetCurrentColumnValue("inDuracionLlamada"), ".00", "") + " b)" + Calcular_Byte(Convert.ToInt64(GetCurrentColumnValue("inDuracionLlamada"))).ToString() + " " + GetCurrentColumnValue("vcRepExpEn").ToString()
                End If
            Else
                consumo.Text = Replace(DirectCast(GetCurrentColumnValue("inNumLla"), Integer).ToString() + " " + DirectCast(GetCurrentColumnValue("vcExpEn"), String), ".00", "")
            End If
        Catch ex As Exception
            'procGeneraLOG("EX-Calcular_Consumo: " & ex.ToString())
        End Try

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
        iContador = 0 : SubTotalCosto = 0 : SubTotalConsumo = 0
    End Sub
    Private Sub XrTotalGeneral_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles XrTotalGeneral.BeforePrint
        XrTotalGeneral.Text = Convert.ToDecimal(TotalGeneral).ToString(strForNum)
    End Sub
    Private Sub GroupHeader4_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader4.BeforePrint
        TotalArea = 0
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrSubCosto.Text = Convert.ToDecimal(SubTotalCosto).ToString(strForNum)
        If GetCurrentColumnValue("vcExpEn") = "msj" Then
            XrSubConsumo.Text = Replace(SubTotalConsumo.ToString() + " " + DirectCast(GetCurrentColumnValue("vcExpEn"), String), ".00", "")
        Else
            XrSubConsumo.Text = DirectCast(Calcular_Consumo(SubTotalConsumo), String)
        End If
        'TOTAL EMPELADO
        TotalEmleado += Convert.ToDecimal(SubTotalCosto)
    End Sub
    Private Sub GroupFooter3_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter3.BeforePrint
        XrTotCosto.Text = Convert.ToDecimal(TotalArea).ToString(strForNum)
    End Sub
    Private Sub GroupFooter2_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter2.BeforePrint
        XrTotEmpleado.Text = Convert.ToDecimal(TotalEmleado).ToString(strForNum)
    End Sub
    Private Sub GroupHeader3_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader3.BeforePrint
        TotalEmleado = 0
    End Sub
End Class