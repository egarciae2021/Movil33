﻿Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Util

Public Class RestablecerContrasena
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'If Not HttpContext.Current.Request.IsLocal Then
        '    Response.Redirect("Login.aspx")
        'End If

        If Not IsPostBack Then
            Dim Usuario As BL_SEG_Usuario = Nothing
            Dim Parametro As BL_MOV_Parametros = Nothing
            Try
                Dim CodReestablemiento As String = Request.QueryString("c")
                'Dim IdDominio As Integer = UtilitarioWeb.ComprobarIntNULL(Request.QueryString("d"), -1)
                Dim IdDominio As Integer = IIf(Request.QueryString("d") IsNot Nothing, Request.QueryString("d"), -1)
                Dim HorasMinRes As Integer = ConfigurationManager.AppSettings("HorasReestablecimientoPass")

                If String.IsNullOrEmpty(CodReestablemiento) Then
                    dvErrorSolicitud.Style("display") = ""
                    dvReestablecimiento.Style("display") = "none"
                Else
                    If IdDominio = -1 Then
                        Usuario = New BL_SEG_Usuario(0)
                    Else
                        HttpContext.Current.Session("IdDominio") = IdDominio.ToString()
                        Usuario = New BL_SEG_Usuario(0, 1, IdDominio)
                    End If

                    Parametro = New BL_MOV_Parametros(IdDominio)

                    Try
                        hdfSimbNoPermitidosClaveUsu.Value = Parametro.Mostrar("SimbolosNoPermitidosClaveUsuario", "SimbolosNoPermitidosClaveUsuario").Valor
                    Catch ex As Exception
                        hdfSimbNoPermitidosClaveUsu.Value = ""
                    End Try


                    hdfCodReestablecimiento.Value = CodReestablemiento
                    hdfIdDominio.Value = IdDominio.ToString()
                    Dim dtSolicitudRes As DataTable = Usuario.SolicitudRestablecimiento(CodReestablemiento)

                    If dtSolicitudRes.Rows.Count <> 1 Then
                        dvErrorSolicitud.Style("display") = ""
                        dvReestablecimiento.Style("display") = "none"
                    Else
                        Dim HorasSolicitudActiva As Integer = UtilitarioWeb.ComprobarIntNULL(dtSolicitudRes.Rows(0)("HorasActivo"), -1)

                        If dtSolicitudRes.Rows(0)("Estado") = "Inactivo" Then
                            dvErrorSolicitud.Style("display") = ""
                            dvReestablecimiento.Style("display") = "none"
                        ElseIf (HorasSolicitudActiva <> -1 AndAlso HorasSolicitudActiva > HorasMinRes) Or dtSolicitudRes.Rows(0)("Estado") = "Expirado" Then
                            dvCaducado.Style("display") = ""
                            dvReestablecimiento.Style("display") = "none"
                        End If
                    End If
                End If




            Catch ex As Exception
                Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            Finally
                If Usuario IsNot Nothing Then Usuario.Dispose()
            End Try
        End If
    End Sub

    <WebMethod()>
    Public Shared Function RestablecerContrasenaUsuario(ByVal CodigoSolicitud As String, ByVal NuevaContrasena As String, ByVal ConfirmacionContrasena As String, _
                                                        ByVal PaginaLogin As String, ByVal IdDominio As Integer) As String
        Dim Usuario As BL_SEG_Usuario = Nothing
        Try
            Dim strResultado As String
            Dim strErrorCorreo As String
            If NuevaContrasena <> ConfirmacionContrasena Then
                strResultado = "-2"
                Return strResultado
            End If

            If IdDominio = -1 Then
                Usuario = New BL_SEG_Usuario(0)
            Else
                HttpContext.Current.Session("IdDominio") = IdDominio.ToString()
                Usuario = New BL_SEG_Usuario(0, 0, IdDominio)
            End If

            Dim HorasCaducidad As Integer = ConfigurationManager.AppSettings("HorasReestablecimientoPass")
            Dim dsResultado As DataSet = Usuario.CambiarContraseña(CodigoSolicitud, VisualSoft.Comun.Util.Cryptographics.EncryptString(NuevaContrasena), HorasCaducidad)

            If dsResultado.Tables.Count > 0 Then
                strResultado = dsResultado.Tables(0).Rows(0)("CodMsj").ToString()
                If strResultado = "1" Then

                    'enviar correo
                    Dim cCorreo = New CompCorreo.CCorreo

                    Dim CuerpoMensaje As String = String.Empty
                    Dim Destinatario As String = UtilitarioWeb.ComprobarStringNULL(dsResultado.Tables(1).Rows(0)("Correo"), "")
                    Dim Asunto As String = "Confirmación de cambio de contraseña"

                    Dim UbicPlantilla As String = HttpContext.Current.Server.MapPath("~/") & "General\Plantillas\ConfirmacionCambioContrasena.htm"
                    Dim NombreUsuario As String = UtilitarioWeb.ComprobarStringNULL(dsResultado.Tables(1).Rows(0)("NombreUsuario"), "")

                    CuerpoMensaje = String.Format(UtilitarioWeb.TraeCuerpoCorreo(UbicPlantilla), NombreUsuario, PaginaLogin)

                    If Destinatario <> String.Empty And NombreUsuario <> String.Empty Then
                        Try
                            cCorreo.Enviar(False, Destinatario, Asunto, CuerpoMensaje, Nothing, False, "")
                        Catch ex As Exception
                            strErrorCorreo = ex.ToString()
                        End Try
                    Else
                        strResultado = "0"
                    End If
                End If
            Else
                strResultado = "0" 'error en BD
            End If

            Return strResultado
        Catch ex As Exception
            Dim util As New VisualSoft.Comun.Utilitarios.Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Usuario) Then Usuario.Dispose()
        End Try
    End Function
End Class