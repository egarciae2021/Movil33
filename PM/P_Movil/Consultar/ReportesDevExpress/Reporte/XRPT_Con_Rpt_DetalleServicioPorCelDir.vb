Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading
Imports System.Globalization
Imports DevExpress.XtraReports.UI
Public Class XRPT_Con_Rpt_DetalleServicioPorCelDir
    Inherits DevExpress.XtraReports.UI.XtraReport
    Private iContador As Integer = 0 : Dim SubTotalLinea As Decimal = 0 : Dim TotalGeneral As Decimal = 0 : Dim SubTotalEmpleado As Decimal = 0
    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
    Public Sub New()
        MyBase.New()
        InitializeComponent()
    End Sub
    Private Sub Detail_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles Detail.BeforePrint
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
        Dim strForNumEntero = UtilitarioWeb.DevuelveFormatoNumeroGenericoEntero(oCultura)
        Dim SubMonto As Decimal = 0
        If Not IsDBNull(GetCurrentColumnValue("dcCosLla")) Then SubMonto = CType(GetCurrentColumnValue("dcCosLla"), Decimal)
        XrCosto.Text = Convert.ToDecimal(SubMonto).ToString(strForNum)
        'SUB TOTAL COSTO
        SubTotalLinea += Convert.ToDouble(SubMonto)
        'TOTAL GENERAL
        TotalGeneral += Convert.ToDecimal(SubMonto)
        Pintar_Filas()
    End Sub
    Sub Pintar_Filas()
        iContador += 1
        If iContador Mod 2 <> 0 Then
            XrFecha.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrHora.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrSucursal.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrTipo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrNumero.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrEmpresa.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrServ.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrConsumo.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrCosto.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrByteEnv.BackColor = Drawing.Color.FromArgb(196, 220, 255)
            XrByteRec.BackColor = Drawing.Color.FromArgb(196, 220, 255)
        Else
            XrFecha.BackColor = Drawing.Color.White
            XrHora.BackColor = Drawing.Color.White
            XrSucursal.BackColor = Drawing.Color.White
            XrTipo.BackColor = Drawing.Color.White
            XrNumero.BackColor = Drawing.Color.White
            XrEmpresa.BackColor = Drawing.Color.White
            XrServ.BackColor = Drawing.Color.White
            XrConsumo.BackColor = Drawing.Color.White
            XrCosto.BackColor = Drawing.Color.White
            XrByteEnv.BackColor = Drawing.Color.White
            XrByteRec.BackColor = Drawing.Color.White
        End If
    End Sub
    Private Sub GroupHeader3_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader3.BeforePrint
        iContador = 0 : SubTotalLinea = 0
    End Sub
    Private Sub XrTotalGeneral_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles XrTotalGeneral.BeforePrint
        XrTotalGeneral.Text = Convert.ToDecimal(TotalGeneral).ToString(strForNum)
    End Sub
    Private Sub GroupFooter3_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter3.BeforePrint
        XrTotalLinea.Text = Convert.ToDecimal(SubTotalLinea).ToString(strForNum)
        SubTotalEmpleado += SubTotalLinea
    End Sub
    Private Sub GroupFooter1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupFooter1.BeforePrint
        XrTotalEmp.Text = Convert.ToDecimal(SubTotalEmpleado).ToString(strForNum)
    End Sub
    Private Sub GroupHeader1_BeforePrint(sender As Object, e As Drawing.Printing.PrintEventArgs) Handles GroupHeader1.BeforePrint
        SubTotalEmpleado = 0
    End Sub
End Class