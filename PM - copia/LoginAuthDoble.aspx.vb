Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Data.SqlClient
Imports System.Security.Principal
Imports System.DirectoryServices
Imports System.Data
Imports VisualSoft.Comun.Auditoria
Imports System.Web.Configuration
Imports VisualSoft.Common.Logging
Imports VisualSoft.Comun.SeguridadWeb
Imports System.Net
Imports VisualSoft.Comun
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.ConfigDom.BL
Imports System.Web.Services
Imports CompCorreo
'NAMESPACE DE FIJA
Imports BLL
Imports VisualSoft.PCSistel.Utilitarios
Imports System.ServiceModel
Imports System.Threading
Imports System.Globalization
Imports System.IO
Imports System.Xml
Imports VisualSoft.Seguridad
Imports System.Threading.Tasks
Imports VisualSoft.PCSistel.LoginAutenticacion

Public Class LoginAuthDoble
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oDobleFactor As New ENT_SEG_DobleFactor
        Dim Usuario As BL_SEG_Usuario = Nothing

        If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
            Dim vIdDominio As Integer = IIf(Session("IdDominio").ToString() <> "", Convert.ToInt32(Session("IdDominio")), 0)
            Usuario = New BL_SEG_Usuario(vIdDominio)
        Else
            Usuario = New BL_SEG_Usuario(0)
        End If

        Dim equipo As New BLEquipoConfianza

        If Not IsPostBack Then
            'HttpContext.Current.Session("TiempoExpirado") = "1"

            Dim NombreProducto As String = "" & ConfigurationManager.AppSettings("NombreProducto")
            If NombreProducto = "" Then NombreProducto = "PCSistel Móvil 3.3"
            'hNombreProducto.InnerHtml = "Verificación de Doble Factor"

            'Genera la clave para guardar en sesión local de navegador
            Dim keystorage As String = ""
            'Genera el key de 6 dígitos
            Dim keyuser As String = ""

            hdfNomBrowser.Value = Request.Browser.Browser()
            hdfNomIp.Value = Request.UserHostAddress

            'Dim sbPages As New StringBuilder
            'sbPages.Append("Configuracion.aspx")

            Me.hdfCaptcha.Value = ConfigurationManager.AppSettings("captcha")
            Me.hdfNocerrarSesion.Value = ConfigurationManager.AppSettings("recordarme")
            Me.hdfUsaDatosConfig.Value = ConfigurationManager.AppSettings("UsaDatosConfig")
            Me.hdfVerLinkWeb.Value = ConfigurationManager.AppSettings("btnVerLinkWeb")
            Me.hdfVerLinkDoc.Value = ConfigurationManager.AppSettings("btnVerLinkDoc")
            Me.hdfVerLinkManual.Value = ConfigurationManager.AppSettings("btnVerLinkManual")
            Me.hdfTextoLinkWeb.Value = ConfigurationManager.AppSettings("btnTextoLinkWeb")
            Me.hdfTextoLinkDoc.Value = ConfigurationManager.AppSettings("btnTextoLinkDoc")
            Me.hdfTextoLinkManual.Value = ConfigurationManager.AppSettings("btnTextoLinkManual")
            Me.hdfUrlLinkWeb.Value = ConfigurationManager.AppSettings("btnUrlLinkWeb")
            Me.hdfNameDocumentoNormas.Value = ConfigurationManager.AppSettings("btnNameDocumentoNormas")
            Me.hdfNameManual.Value = ConfigurationManager.AppSettings("btnNameManual")
            Me.hdfNameManual.Value = ConfigurationManager.AppSettings("btnNameManual")
            Me.hdfVerCarrusel.Value = ConfigurationManager.AppSettings("btnUsarCarrusel")
            Me.hdfEsCloud.Value = ConfigurationManager.AppSettings("ModoCloud")

            If Session("Usuario") IsNot Nothing Then
                hTiempoConteo.Value = "2"
                'hdUser.Value = Cryptographics.EncryptString(Session("Usuario").P_inCod)
                hdUser.Value = Cryptographics.EncryptString(Session("Usuario").vcUsu)

                If Session("KL" & Session("Usuario").P_inCod) IsNot Nothing Then
                    If Session("KL" & Session("Usuario").P_inCod) <> "" Then
                        keystorage = Session("KL" & Session("Usuario").P_inCod)
                    Else
                        keystorage = equipo.GenerateKeyEncrypt(10)
                        HttpContext.Current.Session("KL" & Session("Usuario").P_inCod) = keystorage
                    End If
                Else
                    keystorage = equipo.GenerateKeyEncrypt(10)
                    HttpContext.Current.Session("KL" & Session("Usuario").P_inCod) = keystorage
                End If

                If Session("KU" & Session("Usuario").P_inCod) IsNot Nothing Then
                    If Session("KU" & Session("Usuario").P_inCod) <> "" Then
                        keyuser = Session("KU" & Session("Usuario").P_inCod)
                    Else
                        keyuser = equipo.GenerateKey(6)
                        HttpContext.Current.Session("KU" & Session("Usuario").P_inCod) = keyuser
                    End If
                Else
                    keyuser = equipo.GenerateKey(6)
                    HttpContext.Current.Session("KU" & Session("Usuario").P_inCod) = keyuser
                End If

                hdkstorage.Value = keystorage

                'Armando el objeto
                oDobleFactor.P_inCod = Session("Usuario").P_inCod
                oDobleFactor.keylocal = keystorage
                oDobleFactor.keyuser = keyuser
                oDobleFactor.vcnavegador = Request.Browser.Browser()
                oDobleFactor.recordarSession = 0

                Dim createKey As String = Usuario.GrabarRegistroDobleFactor_User(oDobleFactor)

                Dim datekeylocal = Format(CDate(createKey), "yyyy/MM/dd HH:mm:ss")
                hdFecKey.Value = datekeylocal
                Dim datelocal = Format(CDate(Now), "yyyy/MM/dd HH:mm:ss")
                hdFecLocal.Value = datelocal

                'hUser.InnerHtml = "Usuario: " + Session("Usuario").vcUsu
                If Session("Usuario").Mail <> "" Then
                    Dim email As String = Session("Usuario").Mail
                    Dim longitud As Integer = email.Length
                    If email.Contains("@") Then
                        Dim posicionarr As Integer = InStr(1, email, "@")

                        Dim email_2 As String = email.Substring(0, posicionarr)
                        Dim long_2 As Integer = email_2.Length

                        email_2 = email_2.Substring(0, 3).PadRight(long_2 - 1, "*")
                        email_2 = email_2 + "@" + email.Substring(posicionarr, longitud - long_2)

                        pRevisaCorreo.InnerText = " " + email_2 + " "
                    Else

                    End If
                End If
            End If
        Else
            Dim escena As String = Request.Form("hEscena")
            Dim keylocal_ As String = Session("KL" & Session("Usuario").P_inCod)
            'Dim val_hduser = Cryptographics.EncryptString(Session("Usuario").P_inCod)
            Dim val_hduser = Cryptographics.EncryptString(Session("Usuario").vcUsu)
            hdUser.Value = val_hduser
            hdkstorage.Value = keylocal_

            If escena = "Reenviar" Then
                If Session("Usuario") IsNot Nothing Then
                    Dim keyuser As String = ""

                    Dim presionadoReenviar As String = IIf((Session("PresionarReenviado") IsNot Nothing Or Session("PresionarReenviado") <> ""), Session("PresionarReenviado"), "0")
                    If presionadoReenviar = "1" Then
                        keyuser = equipo.GenerateKey(6)
                        HttpContext.Current.Session("KU" & Session("Usuario").P_inCod) = keyuser
                    Else
                        keyuser = Session("KU" & Session("Usuario").P_inCod)
                    End If

                    oDobleFactor.P_inCod = Session("Usuario").P_inCod
                    oDobleFactor.keylocal = keylocal_
                    oDobleFactor.keyuser = keyuser
                    oDobleFactor.vcnavegador = Request.Browser.Browser()
                    oDobleFactor.recordarSession = 0

                    Dim createKey As String = Usuario.GrabarRegistroDobleFactor_User(oDobleFactor)

                    Dim datekeylocal = Format(CDate(createKey), "yyyy/MM/dd HH:mm:ss")
                    hdFecKey.Value = datekeylocal
                    Dim datelocal = Format(CDate(Now), "yyyy/MM/dd HH:mm:ss")
                    hdFecLocal.Value = datelocal

                    'hUser.InnerHtml = "Usuario: " + Session("Usuario").vcUsu
                    If Session("Usuario").Mail <> "" Then
                        Dim email As String = Session("Usuario").Mail
                        Dim longitud As Integer = email.Length
                        If email.Contains("@") Then
                            Dim posicionarr As Integer = InStr(1, email, "@")

                            Dim email_2 As String = email.Substring(0, posicionarr)
                            Dim long_2 As Integer = email_2.Length

                            email_2 = email_2.Substring(0, 3).PadRight(long_2 - 1, "*")
                            email_2 = email_2 + "@" + email.Substring(posicionarr, longitud - long_2)

                            pRevisaCorreo.InnerHtml = " " + email_2 + " "
                        End If
                    End If

                End If

            Else
                Dim txt1 As String = Request.Form("txtCod1")
                'Dim txt2 As String = Request.Form("txtCod2")
                'Dim txt3 As String = Request.Form("txtCod3")
                'Dim txt4 As String = Request.Form("txtCod4")
                'Dim txt5 As String = Request.Form("txtCod5")
                'Dim txt6 As String = Request.Form("txtCod6")

                'Dim claveIngresada As String = txt1 + txt2 + txt3 + txt4 + txt5 + txt6
                Dim claveIngresada As String = txt1

                oDobleFactor.P_inCod = Session("Usuario").P_inCod
                oDobleFactor.keylocal = keylocal_
                oDobleFactor.keyuser = claveIngresada
                oDobleFactor.vcnavegador = Request.Browser.Browser()
                oDobleFactor.recordarSession = IIf(Request.Form("hchkRecordar").ToString() <> "", Convert.ToInt32(Request.Form("hchkRecordar")), 0)

                Dim respuesta As String = ""


                If Session("TiempoExpirado") = "1" Then
                    respuesta = "NOK2"
                End If

                Dim presionadoReenviar As String = IIf((Session("PresionarReenviado") IsNot Nothing Or Session("PresionarReenviado") <> ""), Session("PresionarReenviado"), "0")

                If presionadoReenviar = "0" Then
                    respuesta = "NOK2"
                End If

                If respuesta <> "NOK2" Then
                    Try
                        respuesta = Usuario.ValidarRegistroDobleFactor_User(oDobleFactor)
                    Catch ex As Exception
                        respuesta = "NOK"
                    End Try
                End If
                

                If respuesta.ToUpper() = "OK" Then
                    'ScriptManager.RegisterClientScriptBlock(Me, GetType(Page), "funRegisterSessionKey", "funRegisterSessionKey();", True)
                    'Dim script As String = "window.onload = function(){ funRegisterSessionKey(); };"
                    'ClientScript.RegisterStartupScript(Me.GetType(), "funRegisterSessionKey", script, True)

                    If oDobleFactor.recordarSession.ToString() = "1" Then
                        hLimpiarStorage.Value = "0"
                    Else
                        hLimpiarStorage.Value = "1"
                    End If

                    Response.Redirect(FormsAuthentication.GetRedirectUrl(Session("Usuario").vcUsu, False))
                Else
                    If respuesta.ToUpper() = "NOK" Then
                        hMensaje.Value = "La clave ingresada es inválida"
                        hLimpiarStorage.Value = "1"
                    End If

                    If respuesta.ToUpper() = "NOK2" Then
                        hLimpiarStorage.Value = "1"
                    End If

                    oDobleFactor.keyuser = Session("KU" & Session("Usuario").P_inCod)
                    Dim createKey As String = Usuario.GrabarRegistroDobleFactor_User(oDobleFactor)

                    Dim datekeylocal = Format(CDate(createKey), "yyyy/MM/dd HH:mm:ss")
                    hdFecKey.Value = datekeylocal
                    Dim datelocal = Format(CDate(Now), "yyyy/MM/dd HH:mm:ss")
                    hdFecLocal.Value = datelocal

                    'hUser.InnerHtml = "Usuario: " + Session("Usuario").vcUsu
                    If Session("Usuario").Mail <> "" Then
                        Dim email As String = Session("Usuario").Mail
                        Dim longitud As Integer = email.Length
                        If email.Contains("@") Then
                            Dim posicionarr As Integer = InStr(1, email, "@")

                            Dim email_2 As String = email.Substring(0, posicionarr)
                            Dim long_2 As Integer = email_2.Length

                            email_2 = email_2.Substring(0, 3).PadRight(long_2 - 1, "*")
                            email_2 = email_2 + "@" + email.Substring(posicionarr, longitud - long_2)

                            pRevisaCorreo.InnerHtml = " " + email_2 + " "
                        End If
                    End If
                End If
            End If
        End If

    End Sub

    <System.Web.Services.WebMethod>
    Public Shared Function setSession(ByVal name As String, ByVal value As String) As String

        If HttpContext.Current.Session("Usuario") IsNot Nothing Then
            HttpContext.Current.Session(name) = value
        End If

        Return "ok"
    End Function

    <System.Web.Services.WebMethod>
    Public Shared Function GetSession(ByVal name As String) As String

        Dim return_ As String = ""
        If HttpContext.Current.Session("Usuario") IsNot Nothing Then
            If name = "SesionUsuario" Then
                return_ = Cryptographics.EncryptString(HttpContext.Current.Session("Usuario").vcUsu())
            End If
        End If

        Return return_
    End Function

End Class