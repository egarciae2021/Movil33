Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Collections.Generic
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.IO
Imports System.Web.Script.Services

Public Class Comp_Conf_Inicial
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim ComprobanteConfiguracion As BL_MOV_FAC_Comprobante_Configuracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    'Dim vcCodigo = Request.QueryString("Cod")

                    ComprobanteConfiguracion = New BL_MOV_FAC_Comprobante_Configuracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim oComprobanteConfiguracion As ENT_MOV_FAC_Comprobante_Configuracion = ComprobanteConfiguracion.Mostrar()

                    hdfIdComprobanteConf.Value = oComprobanteConfiguracion.IdComprobanteConfiguracion
                    txtSerieCP.Text = oComprobanteConfiguracion.SerieComprobanteIni
                    txtCorrelativoCP.Text = oComprobanteConfiguracion.CorrelativoComprobanteIni
                    txtSerieNT.Text = oComprobanteConfiguracion.SerieNotaCreditoIni
                    txtCorrelativoNT.Text = oComprobanteConfiguracion.CorrelativoNotaCreditoIni
                    txtComproEq.Text = oComprobanteConfiguracion.NumCobComprobanteEquipo
                    txtComproSrv.Text = oComprobanteConfiguracion.NumCobComprobanteServicio
                    txtNotaCre.Text = oComprobanteConfiguracion.NumCobNotaCredito
                    txtMargen.Text = oComprobanteConfiguracion.Margen * 100

                    txtDiasEliminacion.Text = oComprobanteConfiguracion.DiasEliminacion

                    chkLunUtil.Checked = oComprobanteConfiguracion.LunesUtil
                    chkMarUtil.Checked = oComprobanteConfiguracion.MartesUtil
                    chkMierUtil.Checked = oComprobanteConfiguracion.MiercolesUtil
                    chkJueUtil.Checked = oComprobanteConfiguracion.JuevesUtil
                    chkVierUtil.Checked = oComprobanteConfiguracion.ViernesUtil
                    chkSabUtil.Checked = oComprobanteConfiguracion.SabadoUtil
                    chkDomUtil.Checked = oComprobanteConfiguracion.DomingoUtil
                    chkFeriadoUtil.Checked = oComprobanteConfiguracion.FeriadoUtil
                    chkLineaBaja.Checked = oComprobanteConfiguracion.RestringirLineaBaja
                    
                    Session("ImagenActualFirma") = oComprobanteConfiguracion.Firma
                    Session("imagenCargadaFirma") = oComprobanteConfiguracion.Firma

                    HttpContext.Current.Session("inCobrosPorDocumento") = oComprobanteConfiguracion.NumCobComprobanteEquipo & "|" & oComprobanteConfiguracion.NumCobComprobanteServicio & "|" & oComprobanteConfiguracion.NumCobNotaCredito

                    Dim validar As Integer = ComprobanteConfiguracion.ValidarOrdenCobros()
                    
                    Dim script As String = ""
                    script = script + " var p_validar = '" + validar.ToString() + "';"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    
                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ComprobanteConfiguracion IsNot Nothing Then ComprobanteConfiguracion.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal oCompobanteConfiguracion As String) As Integer

        Dim ComprobanteConfiguracion As BL_MOV_FAC_Comprobante_Configuracion = Nothing

        Dim _return As Integer = 0
        Try

            ComprobanteConfiguracion = New BL_MOV_FAC_Comprobante_Configuracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oComprobanteConfiguracion As ENT_MOV_FAC_Comprobante_Configuracion = oSerializer.Deserialize(Of ENT_MOV_FAC_Comprobante_Configuracion)(oCompobanteConfiguracion)

            v_oComprobanteConfiguracion.Firma = CType(HttpContext.Current.Session("imagenCargadaFirma"), Byte())

            HttpContext.Current.Session("imagenCargadaFirma") = Nothing
            Dim ComprobanteEquipo As Integer
            Dim ComprobanteServicio As Integer
            Dim NotaCredito As Integer

            Dim validar As Integer = ComprobanteConfiguracion.ValidarOrdenCobros()

            If validar = 0 Then

                ComprobanteEquipo = v_oComprobanteConfiguracion.NumCobComprobanteEquipo
                ComprobanteServicio = v_oComprobanteConfiguracion.NumCobComprobanteServicio
                NotaCredito = v_oComprobanteConfiguracion.NumCobNotaCredito
                Dim Margen As Decimal = v_oComprobanteConfiguracion.Margen

                If ComprobanteEquipo < 1 Or ComprobanteEquipo > 4 Or ComprobanteEquipo.ToString().Length > 1 Then
                    Return 2
                End If

                If ComprobanteServicio < 1 Or ComprobanteServicio > 4 Or ComprobanteServicio.ToString().Length > 1 Then
                    Return 3
                End If

                If NotaCredito < 1 Or NotaCredito > 4 Or NotaCredito.ToString().Length > 1 Then
                    Return 4
                End If

                If Margen < 0 Or Margen > 1 Or Margen.ToString().Length > 7 Then
                    Return 5
                End If

                If v_oComprobanteConfiguracion.Firma Is Nothing Then
                    Return 6
                End If

            Else

                v_oComprobanteConfiguracion.NumCobComprobanteEquipo = CInt(HttpContext.Current.Session("inCobrosPorDocumento").ToString().Split("|")(0))
                v_oComprobanteConfiguracion.NumCobComprobanteServicio = CInt(HttpContext.Current.Session("inCobrosPorDocumento").ToString().Split("|")(1))
                v_oComprobanteConfiguracion.NumCobNotaCredito = CInt(HttpContext.Current.Session("inCobrosPorDocumento").ToString().Split("|")(2))

                If v_oComprobanteConfiguracion.NumCobComprobanteEquipo < 1 Or v_oComprobanteConfiguracion.NumCobComprobanteEquipo > 4 Or v_oComprobanteConfiguracion.NumCobComprobanteEquipo.ToString().Length > 1 Then
                    Return 2
                End If

                If v_oComprobanteConfiguracion.NumCobComprobanteServicio < 1 Or v_oComprobanteConfiguracion.NumCobComprobanteServicio > 4 Or v_oComprobanteConfiguracion.NumCobComprobanteServicio.ToString().Length > 1 Then
                    Return 3
                End If

                If v_oComprobanteConfiguracion.NumCobNotaCredito < 1 Or v_oComprobanteConfiguracion.NumCobNotaCredito > 4 Or v_oComprobanteConfiguracion.NumCobNotaCredito.ToString().Length > 1 Then
                    Return 4
                End If

                Dim Margen As Decimal = v_oComprobanteConfiguracion.Margen
                If Margen < 0 Or Margen > 1 Or Margen.ToString().Length > 7 Then
                    Return 5
                End If

                If v_oComprobanteConfiguracion.Firma Is Nothing Then
                    Return 6
                End If

            End If

            _return = ComprobanteConfiguracion.Actualizar(v_oComprobanteConfiguracion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ComprobanteConfiguracion IsNot Nothing Then
                ComprobanteConfiguracion.Dispose()
            End If
        End Try
        Return _return
    End Function

End Class