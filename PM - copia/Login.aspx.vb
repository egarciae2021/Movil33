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

Partial Class Login
    Inherits System.Web.UI.Page
    Dim Semaforo As System.Threading.ManualResetEvent = New System.Threading.ManualResetEvent(False)

    Public Debug As Boolean

    ''Private Shared Function GetIPAddress() As String
    ''    Try
    ''        If System.ServiceModel.OperationContext.Current IsNot Nothing Then
    ''            Dim Xendpoint As RemoteEndpoIntegerMessageProperty = OperationContext.Current.IncomingMessageProperties(RemoteEndpoIntegerMessageProperty.Name)
    ''            Return Xendpoint.Address

    ''        End If
    ''        If System.Web.HttpContext.Current IsNot Nothing Then
    ''            ' Check proxied IP address
    ''            If HttpContext.Current.Request.ServerVariables("HTTP_X_FORWARDED_FOR") IsNot Nothing Then
    ''                Return HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"]  & " via " &  HttpContext.Current.Request.UserHostAddress
    ''            Else
    ''                Return HttpContext.Current.Request.UserHostAddress

    ''            End If

    ''        End If
    ''    Catch

    ''    End Try
    ''    Return "Unknown"

    ''End try

    ''End Function

    ' ===================================================================================================================================================
    ' LOAD 
    ' ===================================================================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim cad As String = Cryptographics.DecryptString("BrolMtwr6YcA")
        Try
            ''Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Debug, "Prueba envio")


            'Dim Log As BL_GEN_Log = Nothing
            'Log = New BL_GEN_Log(0)


            If Debugger.IsAttached Then
                Debug = True
            Else
                Debug = False
            End If



            ''Log.GrabarLogLocal("Login 01")


            Dim strRedirect As String = Request("ReturnUrl")
            If strRedirect IsNot Nothing Then
                Response.Redirect("~/Login.aspx", True)
                Exit Sub
            End If


            If HttpContext.Current.Request.IsLocal Or HttpContext.Current.Request.Url.OriginalString.ToLower.Contains("localhost") Then
                dvConfiguracion.Visible = True
            Else
                dvConfiguracion.Visible = False
            End If

            Session("Usuario") = Nothing
            Session("Cultura") = Nothing
            Session("IdDominio") = ""
            Session("LicUsuarioModulo") = Nothing

            'Web GestionDatos
            Session("idEmpresa") = Nothing

            ''Session("Usuario") = "3" 'BORRAR - DELETE
            ''Session("IdDominio") = "8082" 'BORRAR - DELETE


            'ValidaAutenticacion(Nothing, "administrador", "admin")
            'Return

            If Not IsPostBack Then

                Dim NombreProducto As String = "" & ConfigurationManager.AppSettings("NombreProducto")
                Dim IdProducto As String = "" & ConfigurationManager.AppSettings("IdProducto")
                If IdProducto = "" Then IdProducto = "0"

                If NombreProducto = "" Then NombreProducto = "PCSistel Móvil 3.3"
                hNombreProducto.InnerHtml = NombreProducto


                'Enviar javascript al cliente...
                'Dim strPaginaActual As String = System.IO.Path.GetFileName(Request.Url.AbsolutePath)
                'If IO.File.Exists(IO.Path.ChangeExtension(strPaginaActual, ".visualsoftmin.js")) Then

                '    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, strPaginaActual & "Javascript", "")
                '    'If (Request.PhysicalPath & "\"

                'End If

                ' ==================================================================================================================================
                ' MODULOD DE SEGURIDAD
                ' ==================================================================================================================================


                ''Dim msgprops = OperationContext.Current.IncomingMessageProperties
                ''Dim clientprop = msgprops(RemoteEndpoIntegerMessageProperty.Name) 'as RemoteEndpoIntegerMessageProperty
                ''Dim clientip As String = clientprop.Address


                hdfNomBrowser.Value = Request.Browser.Browser()
                hdfNomIp.Value = Request.UserHostAddress
                ' ==================================================================================================================================
                ' ==================================================================================================================================

                Dim sbPages As New StringBuilder
                sbPages.Append("Configuracion.aspx")
                'ValidarAccesoLocation(sbPages.ToString)

                'Dim cadLink As String = ""
                'Dim btnTextoLinkDoc As String = "Manual de Normas"
                'Dim btnNameDocumentoNormas As String = "ConfiguracionPlantillasImportacion.docx"
                'Dim UrlbtnManual As String = "Common/Controladores"
                'cadLink += "<a href='#' id='descargar'   title='" + btnTextoLinkDoc + "' BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + btnNameDocumentoNormas + "' style='font-weight: bold; font-size: 12px; color: black;' ><img src='Common/Images/Login/document2.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;Prueba</a>"
                'dvBotones.InnerHtml = cadLink

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


                Dim misCredenciales As String = Request.Form("porcre")
                If HttpContext.Current.IsDebuggingEnabled Then
                    ''misCredenciales = "XXX"
                End If

                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then

                    If misCredenciales IsNot Nothing AndAlso misCredenciales <> "" Then

                        misCredenciales = misCredenciales.Replace("|", "+")
                        misCredenciales = misCredenciales.Replace("*", "=")
                        misCredenciales = Cryptographics.DecryptString(misCredenciales)
                        misCredenciales = misCredenciales.Replace("Ã±", "ñ")
                        ''misCredenciales = "|admin|admin|11051|"
                        Try
                            Dim DomDonf As New BL_ConfigDom_Configuracion()
                            DomDonf.InstanciarConfiguracion(CInt(misCredenciales.Split("|")(3).ToString()), IdProducto)
                            HttpContext.Current.Session("IdDominio") = misCredenciales.Split("|")(3).ToString()

                        Catch ex As Exception
                            Try
                                ''Vuelve a generar otra instancia para forzar el ingreso
                                Dim DomDonf As New BL_ConfigDom_Configuracion()
                                DomDonf.InstanciarConfiguracion(CInt(misCredenciales.Split("|")(3).ToString()), IdProducto)
                                HttpContext.Current.Session("IdDominio") = misCredenciales.Split("|")(3).ToString()
                            Catch ex1 As Exception
                                ''Log.GrabarLogLocal("Login 07. Error 2: " + ex1.Message)
                            End Try
                        End Try

                        Try
                            If misCredenciales.Split("|").Length >= 6 Then
                                hKeySessionLocal.Value = misCredenciales.Split("|")(4).ToString()
                            End If
                        Catch ex As Exception
                        End Try

                        ValidaAutenticacion(Nothing, misCredenciales.Split("|")(1), misCredenciales.Split("|")(2))

                    Else

                        Dim sbJavascript As New StringBuilder
                        Dim miUrl As String

                        If UtilitarioWeb.ObtieneMO360() = "1" Then
                            miUrl = "" & ConfigurationManager.AppSettings("PublicacionWebMO360")
                            sbJavascript.AppendLine("window.top.location.assign(""" + miUrl + """);")
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", sbJavascript.ToString(), True)
                            Response.Redirect(miUrl)
                        Else

                            Dim PortalDestino As String = "" & System.Configuration.ConfigurationManager.AppSettings("keyPortal")
                            If PortalDestino IsNot Nothing AndAlso PortalDestino <> "" Then
                                'miUrl = PortalDestino
                                Using blConfiguracion As New BL_ConfigDom_Configuracion()
                                    miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey(PortalDestino)
                                End Using
                            Else
                                Using blConfiguracion As New BL_ConfigDom_Configuracion()
                                    miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                                End Using
                            End If
                            sbJavascript.AppendLine("window.top.location.assign(""" + miUrl + """);")
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", sbJavascript.ToString(), True)
                            Response.Redirect(miUrl)
                        End If

                        Exit Sub
                        'Response.Redirect(miUrl)
                    End If
                Else

                    Dim strCadenaConexion As String = Util.ArchivoConfiguracion.ObtenerValorConfiguracion(Server.MapPath("~/web.config"), "accesoSQL")
                    If String.IsNullOrEmpty(strCadenaConexion) Then
                        If HttpContext.Current.Request.IsLocal Then
                            Response.Redirect("Configuracion.aspx")
                        Else
                            ''loginPrincipal.Visible = False
                            ''lblMensaje.Visible = True
                            lblMensaje.Value = ""
                            ''lblMensajesLic.Visible = False
                        End If
                    Else


                        litProductoRelease.Text = "" & ConfigurationManager.AppSettings("ReleaseProducto").ToString()
                        litProductoRelease.Text = litProductoRelease.Text.Replace("(", "").Replace(")", "").Trim()

                        strCadenaConexion = Cryptographics.DecryptString(strCadenaConexion)
                        If Util.ArchivoConfiguracion.VerificaConexionBD(strCadenaConexion) Then

                            Try
                                If (Not Debug) Then
                                    'VALIDACIÓN DE LICENCIA | OMITIR EN DEPURACIÓN
                                    ValidaLicencia()
                                End If

                            Catch ex As Exception
                                lblMensaje.Visible = False
                                lblMensajesLic.Visible = True
                                lblMensajesLic.InnerText = "ERROR (4), OCURRIÓ UN PROBLEMA CON SU LICENCIA, PÓNGASE EN CONTACTO CON SU PROVEEDOR."

                                Dim util As New Utilitarios
                                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))

                            End Try

                            lblMensaje.Value = ""
                            Dim Autenticacion As Integer = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))

                            If Autenticacion = 1 Then 'Autenticacion de windows
                                Dim user As WindowsIdentity = WindowsIdentity.GetCurrent()
                                'LOGUEARSE A LA WEB MEDIANTE EL MODO MOVIL(RRAMOS_20151119)------------------------------------------
                                Dim oUsuario As New ENT_SEG_Usuario
                                oUsuario.vcUsu = user.Name.Substring(user.Name.IndexOf("\") + 1)
                                oUsuario.vcPas = ""
                                ValidaAutenticacion(Nothing, oUsuario.vcUsu, oUsuario.vcPas)
                                '----------------------------------------------------------------------------------------------------
                                'LOGUEARSE A LA WEB MEDIANTE EL MODO FIJA(RRAMOS_20151119)-------------------------------------------
                                ''Dim usuario As String = user.Name.Substring(user.Name.IndexOf("\") + 1)
                                ''Dim dt As DataTable = New BLLLogin().getUsuarioWin(usuario)
                                ''CargarAutenticacionWindows_Fija(dt)
                                ''Mejorar en el siguiente fase (La cadena de conexion no debe traer de "conexion" sino de "accesoSQL"
                                '----------------------------------------------------------------------------------------------------

                            Else

                                ''If Usuario = "" Then
                                ''    Dim pathPortalAdmin As String = "" & System.Configuration.ConfigurationManager.AppSettings("pathPortalAdmin")
                                ''    Dim sbJavascript As New StringBuilder
                                ''    sbJavascript.AppendLine("window.top.location.assign(""" + pathPortalAdmin + """);")
                                ''    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", sbJavascript.ToString(), True)
                                ''    Return
                                ''End If

                                ''Usuario = AES_Seguridad.DesencriptarAES(Usuario)
                                ''Contrasena = AES_Seguridad.DesencriptarAES(Contrasena)
                                ''ValidaAutenticacion(Nothing, Usuario, Contrasena)


                            End If
                        Else
                            If HttpContext.Current.Request.IsLocal Then
                                Response.Redirect("Configuracion.aspx")
                            Else
                                ''loginPrincipal.Visible = False
                                ''lblMensaje.Visible = True
                                ''lblMensajesLic.Visible = False
                            End If
                        End If
                    End If
                End If

            Else

                Dim Usuario As String = Request.Form("txtUserName")
                Dim Contrasena As String = Request.Form("txtPassword")
                Dim TipoDispositivo As String = Request.Form("hdTipoDispositivo")

                Dim equipo As New BLEquipoConfianza
                Dim nombre As String = equipo.GetNombreEquipo()

                If Usuario IsNot Nothing AndAlso Usuario <> "" Then
                    ValidaAutenticacion(Nothing, Usuario, Contrasena)
                End If

            End If


            'Validar autenticacion por WebStress Tool...
            'Dim oData As Object = Request.QueryString("data")

            'Dim strUsuario As Object = Request.Form("username")
            'Dim strPassword As String = Request.Form("password")


            Dim strUsuario As Object = Request.QueryString("username")
            Dim strPassword As String = Request.QueryString("password")

            If strUsuario IsNot Nothing AndAlso strUsuario <> "" Then
                'Dim oAuditoria As New ProcesaAuditoria
                'oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
                'oAuditoria.NombreUsuario = strUsuario + "=" + strPassword
                'oAuditoria.Opcion = "Opcion"
                'oAuditoria.Tabla = "Entrada"
                'oAuditoria.Especial("Ingreso al listado de " & strUsuario)
                ValidaAutenticacion(Nothing, strUsuario, strPassword)
            End If

            ''System.Net.Dns.BeginGetHostByName(Request.UserHostAddress, New AsyncCallback(AddressOf GetHostNameCallBack), Request.UserHostAddress)
            Try
                Semaforo.Reset()
                Dim hostEntry As System.Net.IPHostEntry
                'System.Net.Dns.BeginGetHostEntry(Request.UserHostAddress, AddressOf GetHostNameCallBack, Request.UserHostAddress)
                hostEntry = System.Net.Dns.GetHostEntry(Request.UserHostAddress)
                Session("HostName") = "->" & Request.ServerVariables("HTTP_X-Forwarded-For") 'hostEntry.HostName
                hdfNomDominio.Value = hostEntry.HostName
            Catch
            End Try
        Catch exAbort As System.Threading.ThreadAbortException
        Catch ex As Exception
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then

                'Dim blConfiguracion As New BL_ConfigDom_Configuracion()
                Dim miUrl As String

                Using blConfiguracion As New BL_ConfigDom_Configuracion()
                    miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                End Using

                Response.Redirect(miUrl)
            Else
                If HttpContext.Current.Request.IsLocal Then
                    Response.Redirect("Configuracion.aspx")
                Else
                    ''loginPrincipal.Visible = False
                    ''lblMensaje.Visible = True
                    ''lblMensajesLic.Visible = False
                End If
            End If


            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
    Public Function getIp() As String
        Dim valorIp As String
        valorIp = Dns.GetHostEntry(My.Computer.Name).AddressList.FirstOrDefault(Function(i) i.AddressFamily = Sockets.AddressFamily.InterNetwork).ToString()
        Return valorIp
    End Function

    Public Function ValidaLicencia() As Boolean
        '********Codigo MIler descomentar
        Dim oModuloSQL As BL_LIC_UsuariosModulos = Nothing
        Dim drLicencia As DataTable

        Dim keyConfig As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtenerKeyServidor()

        'Dim KeyPCConfig As String
        'Try
        '    KeyPCConfig = ConfigurationManager.AppSettings("KeyServidor").ToString()
        'Catch ex As Exception
        '    KeyPCConfig = ""
        'End Try

        Try
            oModuloSQL = New BL_LIC_UsuariosModulos(0)
            drLicencia = oModuloSQL.Mensajes_Login()
        Catch ex As Exception
            Response.Redirect("Configuracion.aspx")
        Finally
            If oModuloSQL IsNot Nothing Then oModuloSQL.Dispose()
        End Try
        '***********************************************

        Dim NoLicenciado As Integer = 0
        Dim FechaInicio As String = ""
        Dim FechaFin As String = ""
        Dim KeyPC As String = ""
        Dim TipoLicencia As String = ""
        Dim ipsPC As String = ""

        If drLicencia.Rows.Count > 0 Then
            NoLicenciado = Convert.ToInt32(drLicencia.Rows(0)(2).ToString())
            FechaInicio = Cryptographics.DecryptString(drLicencia.Rows(0)(0).ToString())
            FechaFin = Cryptographics.DecryptString(drLicencia.Rows(0)(1).ToString())
            KeyPC = drLicencia.Rows(0)(3).ToString()
            TipoLicencia = Cryptographics.DecryptString(drLicencia.Rows(0)(4).ToString())
        End If
        lblMensajesLic.Visible = False
        Dim EmpezarLic As New Date
        '01/11/2018

        txtUserName.Enabled = True
        txtPassword.Enabled = True
        btnIngresar.Disabled = False

        If NoLicenciado = 0 Then
            lblMensaje.Visible = False
            lblMensajesLic.Visible = True
            lblMensajesLic.InnerText = "SU SISTEMA NO ESTÁ LICENCIADO POR FAVOR CONTACTE A SU PERSONAL DE SOPORTE."
            txtUserName.Enabled = False
            txtPassword.Enabled = False
            btnIngresar.Disabled = True
        End If


        'SE AGREGA UNA VALIDACIÓN CUANDO TIENE VARIAS TARJETAS DE RED
        For i As Integer = 0 To Dns.GetHostByName(Dns.GetHostName).AddressList.Count - 1
            ipsPC = Dns.GetHostByName(Dns.GetHostName).AddressList(i).ToString
            'Util.Log.GrabaRegistroLog("D:\log.txt", "pcsistel", ipsPC)
            'utili.GrabarLog(ipsPC, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))

            'If KeyPC <> Cryptographics.EncryptString(Dns.GetHostName() & Replace(getIp(), ".", "")) Then
            If ipsPC <> "" Then
                If KeyPC <> Cryptographics.EncryptString(UCase(Dns.GetHostName()) & Replace(ipsPC, ".", "")) Then
                    If NoLicenciado <> 0 Then
                        lblMensaje.Visible = False
                        lblMensajesLic.Visible = True
                        lblMensajesLic.InnerText = "ERROR (1), OCURRIÓ UN PROBLEMA CON SU LICENCIA, PÓNGASE EN CONTACTO CON SU PROVEEDOR."
                        txtUserName.Enabled = False
                        txtPassword.Enabled = False
                        btnIngresar.Disabled = True
                    End If
                Else
                    If NoLicenciado <> 0 Then
                        lblMensaje.Visible = True
                        lblMensajesLic.Visible = False
                        lblMensajesLic.InnerText = ""
                        txtUserName.Enabled = True
                        txtPassword.Enabled = True
                        btnIngresar.Disabled = False
                        Exit For
                    End If
                End If
            Else
                If KeyPC <> Cryptographics.EncryptString(UCase(Dns.GetHostName()) & Replace(getIp(), ".", "")) Then
                    If NoLicenciado <> 0 Then
                        lblMensaje.Visible = False
                        lblMensajesLic.Visible = True
                        lblMensajesLic.InnerText = "ERROR (2), OCURRIÓ UN PROBLEMA CON SU LICENCIA, PÓNGASE EN CONTACTO CON SU PROVEEDOR."
                        txtUserName.Enabled = False
                        txtPassword.Enabled = False
                        btnIngresar.Disabled = True
                    End If
                End If
            End If
        Next

        If KeyPC <> keyConfig Then
            If NoLicenciado <> 0 Then
                lblMensaje.Visible = False
                lblMensajesLic.Visible = True
                lblMensajesLic.InnerText = "ERROR (3), OCURRIÓ UN PROBLEMA CON SU LICENCIA, PÓNGASE EN CONTACTO CON SU PROVEEDOR."
                txtUserName.Enabled = False
                txtPassword.Enabled = False
                btnIngresar.Disabled = True
            End If
        End If

        If TipoLicencia <> "CAPEX" Then
            If Now.Date > Right(IIf(FechaFin = "", "01", FechaFin), 2) & "/" & Right(Left(IIf(FechaFin = "", "01", FechaFin), 6), 2) & "/" & Left(IIf(FechaFin = "", (Now.Year + 1).ToString(), FechaFin), 4) Then
                lblMensaje.Visible = False
                lblMensajesLic.Visible = True
                lblMensajesLic.InnerText = "HA FINALIZADO LA LICENCIA DEL SISTEMA POR FAVOR CONTACTE A SU PERSONAL DE SOPORTE."
                txtUserName.Enabled = False
                txtPassword.Enabled = False
                btnIngresar.Disabled = True
            End If

            If Now.Date < Right(IIf(FechaInicio = "", "01", FechaInicio), 2) & "/" & Right(Left(IIf(FechaInicio = "", "01", FechaInicio), 6), 2) & "/" & Left(IIf(FechaInicio = "", Now.Year.ToString(), FechaInicio), 4) Then
                lblMensajesLic.Visible = True
                lblMensajesLic.InnerText = "SU LICENCIA EMPIEZA EL " & Right(FechaInicio, 2) & "/" & Right(Left(FechaInicio, 6), 2) & "/" & Left(FechaInicio, 4) & "."
                txtUserName.Enabled = False
                txtPassword.Enabled = False
                btnIngresar.Disabled = True
            End If
        End If

    End Function

    'Public Sub GetHostNameCallBack(asyncResult As IAsyncResult)
    '    Dim userHostAddress As String = DirectCast(asyncResult.AsyncState, String)
    '    Dim hostEntry As System.Net.IPHostEntry = System.Net.Dns.EndGetHostByName(asyncResult)
    '    ' tenemos el nombre del equipo cliente en hostEntry.HostName
    '    Session("HostName") = hostEntry.HostName
    'End Sub

    ''Protected Sub loginPrincipal_Authenticate(ByVal sender As Object, ByVal e As AuthenticateEventArgs) Handles loginPrincipal.Authenticate
    ''    ValidaAutenticacion(e)
    ''End Sub


    Private Sub ValidaAutenticacion(ByVal e As AuthenticateEventArgs,
                                    Optional ByVal strUsuario As String = "",
                                    Optional ByVal strPassword As String = "")
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim UsuarioHistorico As BL_SEG_UsuarioHistorico = Nothing
        Dim BL_ConfigGeneral As BL_CFG_ConfiguracionGeneral = Nothing

        Try

            'Validacion de Licencia
            'Utilizado en este metodo para la autenticacion de windows (pasa de forma directa)
            Dim pstrMensaje As String = ""
            'If Not UtilitarioWeb.fnValidaLicenciaPCSistelMovil(pstrMensaje) Then
            '    loginPrincipal.Visible = False
            '    lblMensaje.Text = pstrMensaje
            '    lblMensaje.Visible = True
            '    Exit Sub
            'End If

            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                Dim vIdDominio As Integer = IIf(Session("IdDominio").ToString() <> "", Convert.ToInt32(Session("IdDominio")), 0)
                Usuario = New BL_SEG_Usuario(vIdDominio)
            Else
                Usuario = New BL_SEG_Usuario(0)
            End If

            Dim oUsuario As New ENT_SEG_Usuario
            Dim v_oUsuario As ENT_SEG_Usuario
            strUsuario = strUsuario.Trim
            If strUsuario <> "" Then
                oUsuario.vcUsu = strUsuario
                oUsuario.vcPas = strPassword
            Else
                oUsuario.vcUsu = txtUserName.Text
                oUsuario.vcPas = txtPassword.Text
            End If


            Dim Autenticacion As Integer = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))
            Dim strTipoAutenticacion As String = "AW"
            If Autenticacion = 1 Then
                strTipoAutenticacion = "AW"
            ElseIf Autenticacion = 2 Then
                strTipoAutenticacion = "AD"
            Else
                strTipoAutenticacion = ""
            End If

            ' =============================================================================================================
            ' MODULO DE SEGURIDAD - MENSAJE DE ERROR -VALIDACIONES DEL SISTEMA
            ' =============================================================================================================

            v_oUsuario = Usuario.Autentifica(oUsuario, strTipoAutenticacion)
            ''ValidaAutenticacionFija(Autenticacion, oUsuario.vcUsu, oUsuario.vcPas) 'RRAMOS_20151119

            Dim isDobleFactor As Boolean = False
            If v_oUsuario IsNot Nothing Then
                isDobleFactor = v_oUsuario.DobleFactor
            End If

            'hdUser.Value = Cryptographics.EncryptString(v_oUsuario.vcUsu)

            If v_oUsuario.vcMsgError = "" Then


                v_oUsuario.CaracteristicaUsuario = Usuario.CaracteristicaUsuario(v_oUsuario)

                ' =============================================================================================================
                ' MODO DE AUTENTHICACION
                v_oUsuario.inModoAute = Autenticacion
                ' =============================================================================================================
                'Validar por el codigo del empleado...

                lblMensaje.Value = ""
                Dim esAdmin As Boolean = False


                'Validar por el codigo del empleado...
                For Each oPerfil As ENT_SEG_Perfil In v_oUsuario.Perfiles
                    If oPerfil.vcNom = "Administrador" OrElse oPerfil.vcNom = "Super Administrador" Then
                        esAdmin = True
                    End If
                Next
                ' =============================================================================================================
                ' ES ADMINISTRADOR
                v_oUsuario.EsAdministrador = esAdmin
                If v_oUsuario.F_vcCodSuc = "0000000000" Then v_oUsuario.F_vcCodSuc = ""

                If v_oUsuario.F_vcCodInt Is Nothing OrElse v_oUsuario.F_vcCodInt = "" Then
                    If v_oUsuario.Empleado.btVig = False Then
                        If v_oUsuario.Empleado.P_vcCod = "" And esAdmin = False Then
                            ''loginPrincipal.FailureText = "El usuario no tiene un empleado asociado"
                            ''lblMensaje.Text = ""
                            lblMensaje.Value = "El usuario no tiene un empleado asociado"
                            ''lblMensaje.Visible = True
                            ''lblMensajesLic.Visible = False
                            Exit Sub
                        End If
                    End If
                End If

                If Autenticacion = 2 Then 'AD
                    Try
                        'Actualiza la imagen del usuario segun la imagen del dominio.
                        Dim strPropiedadImagenUsuario As String = ConfigurationManager.AppSettings("PropiedadImagenUsuario")
                        Dim data As Byte() = CType(GetPropertyAD(v_oUsuario.vcUsu, strPropiedadImagenUsuario), Byte())
                        If data IsNot Nothing Then
                            v_oUsuario.Imagen = data
                            Usuario.Grabar(v_oUsuario)
                        End If
                    Catch
                    End Try
                End If

                ' ==========================================================================================================
                ' MODULO DE SEGURIDAD - REGISTRO DE ACCESO AL SISTEMA
                ' ==========================================================================================================
                Dim vcNomIp As String = hdfNomIp.Value
                Dim vcNomDominio As String = hdfNomDominio.Value
                Dim vcNomPc As String = hdfNomPc.Value
                Dim vcNomBrowser As String = hdfNomBrowser.Value
                ' ==========================================================================================================
                UsuarioHistorico = New BL_SEG_UsuarioHistorico(v_oUsuario.IdCliente)
                ' ==========================================================================================================
                UsuarioHistorico.Insertar(v_oUsuario.P_inCod, vcNomDominio, vcNomIp, vcNomBrowser, vcNomPc)
                ' ==========================================================================================================
                UsuarioHistorico.Dispose()
                ' ==========================================================================================================
                ' ==========================================================================================================


                'Actualizar IP Cliente...
                v_oUsuario.IpCliente = "" & Session("HostName") 'GetVisitorIPAddress(True) '"" & HttpContext.Current.Request.ServerVariables("HTTP_X_FORWARDED_FOR") 'Request.ServerVariables("REMOTE_HOST") 'System.Web.HttpContext.Current.Request.UserHostAddress


                'Grabar Log..
                ''Logger.WriteLog(Me, LogLevelL4N.INFO, "Credenciales correctas: " & v_oUsuario.vcUsu)


                ''If IntPtr.Size = 8 Then '64 bit machine
                ''    Logger.WriteLog(Me, LogLevelL4N.INFO, "******************** La aplicación se encuentra en 64 bits ********************")
                ''ElseIf IntPtr.Size = 4 Then '32 bit machine
                ''    Logger.WriteLog(Me, LogLevelL4N.INFO, "******************** La aplicación se encuentra en 32 bits ********************")
                ''End If

                Dim oConfigGeneral As ENT_CFG_ConfiguracionGeneral
                BL_ConfigGeneral = New BL_CFG_ConfiguracionGeneral(v_oUsuario.IdCliente)
                oConfigGeneral = BL_ConfigGeneral.Listar()

                Session("Usuario") = v_oUsuario
                Session("SolicitudesMultipleEspecialista") = oConfigGeneral.SolProcesaMultipleTecnico
                'AsignarCultura(v_oUsuario)
                If v_oUsuario.Cultura Is Nothing Then
                    v_oUsuario.Cultura = New ENT_GEN_Cultura()
                    v_oUsuario.Cultura.vcSimDec = "."
                    v_oUsuario.Cultura.vcSimSepMil = ","
                End If

                Session("Cultura") = v_oUsuario.Cultura


                System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyDecimalSeparator = v_oUsuario.Cultura.vcSimDec.ToString()
                System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyGroupSeparator = v_oUsuario.Cultura.vcSimSepMil.ToString()
                System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = v_oUsuario.Cultura.vcSimDec.ToString()
                System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = v_oUsuario.Cultura.vcSimSepMil.ToString()


                If Not IsNothing(ConfigurationManager.AppSettings("NombreProducto")) Then
                    'Session("NombreProducto") = ConfigurationManager.AppSettings("NombreProducto")
                    Utilitario.NombreSistemaMovil = "WEB PCSISTEL MÓVIL 3.3"
                    'Else
                    '    Session("NombreProducto") = Session("NombreProducto")
                End If

                If e IsNot Nothing Then e.Authenticated = True

                ''COMENTADO PORQUE SÓLO ES BASIC
                UtilitarioWeb.TipoSolicitud.ActualizarUsuario()

                'UtilitarioWeb.Atenciones.ActualizarUsuario()

                Dim strPerfiles As String = ""
                For Each oPerfil As ENT_SEG_Perfil In v_oUsuario.Perfiles
                    strPerfiles &= "," & oPerfil.P_inCod
                Next
                If strPerfiles.Length > 0 Then strPerfiles = strPerfiles.Substring(1)

                'Invoca a componente que se encarga del Cache de los datos
                'en este caso de las páginas a las que el perfil tiene acceso
                Dim oLicenciaWeb As LicenciaWeb = CType(HttpContext.Current.Session("LicenciaWeb"), LicenciaWeb)
                Dim strTipoLicencia As String = ""

                Try
                    strTipoLicencia = Mid(oLicenciaWeb.TipoLicencia, 1, 1)
                Catch ex As Exception
                    strTipoLicencia = "P"
                End Try

                ' Crea un ticket de Autenticacion de forma manual, 
                ' donde guardaremos información que nos interesa
                ' Se guarda el perfil o los perfiles del usuario
                Dim authTicket As New FormsAuthenticationTicket(2, oUsuario.vcUsu,
                                                                DateTime.Now, DateTime.Now.AddMinutes(60), False,
                                                                strPerfiles, FormsAuthentication.FormsCookiePath)
                Dim crypTicket As String = FormsAuthentication.Encrypt(authTicket)
                Dim authCookie As New HttpCookie(FormsAuthentication.FormsCookieName, crypTicket)

                'JHERRERA 20150720: Se agregó la validación porque de lo contrario habrá error al convertir strPerfiles a entero
                If strTipoLicencia <> "" Then
                    strPerfiles = strPerfiles & "|" & strTipoLicencia
                End If
                '-->

                UserCache.AddPaginasToCache(strPerfiles, Perfiles.GetPaginas(strPerfiles,
                                                                             CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente,
                                                                             Mid(oLicenciaWeb.TipoLicencia, 1, 1)), System.Web.HttpContext.Current)

                Response.Cookies.Add(authCookie)

                Dim strRedirect As String = Request("ReturnUrl")
                If strRedirect IsNot Nothing AndAlso strRedirect.ToLower.Contains("signalr/negotiate?clientprotocol") Then
                    ''Response.Redirect("/Index.aspx?p=123456789")
                    Exit Sub
                Else
                    ' Redirecciono al Usuario - Importante!! no usar el RedirectFromLoginPage
                    ' Para que se puedan usar las Cookies de los HttpModules
                    ''Dim util As New Utilitarios
                    ''Dim ex1 As New Exception(FormsAuthentication.GetRedirectUrl(oUsuario.vcUsu, False).ToString)
                    ''util.GrabarLog(ex1, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))

                    Dim oToken As PCSistelMovilLog45.Token
                    'Try

                    ''If (Not Debug) Then
                    ''    Task.Run(Async Function()
                    ''                 oToken = Await PCSistelMovilLog45.Log.GenerarToken("mpajuelo@pcsistel.com", "Aa123456!")
                    ''                 Session("UsuarioToken") = oToken
                    ''             End Function).Wait()
                    ''End If

                    'Catch ex As Exception

                    'End Try

                    If isDobleFactor Then

                        Dim key As String = Request.Form("hKeySessionLocal")

                        If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                            key = hKeySessionLocal.Value.ToString()
                        End If

                        Dim esSeguro As Boolean = False

                        If key <> "" Then
                            For Each oDobleValidacion As ENT_SEG_DobleFactor In v_oUsuario.DispotivosRecordados
                                If oDobleValidacion.keylocal = key Then
                                    esSeguro = True
                                    Exit For
                                End If
                            Next
                        End If


                        If esSeguro Then
                            Response.Redirect(FormsAuthentication.GetRedirectUrl(oUsuario.vcUsu, False))
                        Else
                            Response.Redirect("~/LoginAuthDoble.aspx", False)
                            Context.ApplicationInstance.CompleteRequest()
                        End If

                    Else
                        Response.Redirect(FormsAuthentication.GetRedirectUrl(oUsuario.vcUsu, False))
                    End If



                    'FormsAuthentication.RedirectFromLoginPage(oUsuario.vcUsu, loginPrincipal.RememberMeSet)
                End If



            Else
                ' ==================================================================================
                ' MODULO DE SEGURIDAD
                ' ==================================================================================
                ''loginPrincipal.FailureText = v_oUsuario.vcMsgError
                lblMensaje.Value = v_oUsuario.vcMsgError
                ''lblMensaje.Visible = True
                ''lblMensajesLic.Visible = False
                ' ==================================================================================
                ' ==================================================================================
            End If
        Catch exAbort As System.Threading.ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            ''loginPrincipal.FailureText = UtilitarioWeb.MensajeError
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))

            ''loginPrincipal.FailureText = "Usuario o Contraseña incorrecta"
            ''lblMensaje.Text = "Usuario o Contraseña incorrecta"
            lblMensaje.Value = "Usuario o Contraseña incorrecta"
            ''lblMensaje.Visible = True
            ''lblMensajesLic.Visible = False
            'Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Usuario IsNot Nothing Then
                Usuario.Dispose()
            End If
            If UsuarioHistorico IsNot Nothing Then
                UsuarioHistorico.Dispose()
            End If
            If BL_ConfigGeneral IsNot Nothing Then
                BL_ConfigGeneral.Dispose()
            End If
        End Try
    End Sub

    Private Sub AsignarCultura(v_oUsuario As ENT_SEG_Usuario)
        'Dim Cultura As BL_GEN_Cultura = New BL_GEN_Cultura(v_oUsuario.IdCliente)
        'Session("Cultura") = Cultura.MostrarPorRegion(v_oUsuario.inCodReg)
        'Cultura.Dispose()
        Dim GEN_Cliente As BL_GEN_Cliente = Nothing
        Dim GEN_Cultura As BL_GEN_Cultura = Nothing
        Dim GEN_Region As BL_GEN_Regi = Nothing
        Dim oCultura As ENT_GEN_Cultura
        Try
            GEN_Cultura = New BL_GEN_Cultura(v_oUsuario.IdCliente)
            GEN_Region = New BL_GEN_Regi(v_oUsuario.IdCliente)
            GEN_Cliente = New BL_GEN_Cliente(v_oUsuario.IdCliente)
            Dim dtDatosCliente As DataTable = GEN_Cliente.Mostrar(v_oUsuario.IdCliente)
            If dtDatosCliente IsNot Nothing AndAlso dtDatosCliente.Rows(0)("inIdCultura") <> 0 Then
                oCultura = GEN_Cultura.Mostrar(dtDatosCliente.Rows(0)("inIdCultura"))
            Else
                oCultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
            End If
            If oCultura IsNot Nothing Then
                oCultura.vcTipMon = oCultura.Moneda.vcSimMon
            End If
            Session("Cultura") = oCultura

            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyDecimalSeparator = oCultura.vcSimDec.ToString()
            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyGroupSeparator = oCultura.vcSimSepMil.ToString()
            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec.ToString()
            System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil.ToString()

            ''Try

            ''    Dim exInfo As Exception
            ''    Dim util As New Utilitarios

            ''    exInfo = New Exception("Asignando cultura..")
            ''    util.GrabarLog(exInfo, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))

            ''    exInfo = New Exception("ShortDatePattern: " + Thread.CurrentThread.CurrentCulture.DateTimeFormat.ShortDatePattern)
            ''    util.GrabarLog(exInfo, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))


            ''    Dim ciNuevaCultura As New CultureInfo(oCultura.vcCodCul)
            ''    Thread.CurrentThread.CurrentCulture = ciNuevaCultura
            ''    Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalDigits = Convert.ToInt32(oCultura.dcNumDec)
            ''    Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec
            ''    Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil
            ''    Thread.CurrentThread.CurrentCulture.DateTimeFormat.ShortDatePattern = oCultura.vcFecCor
            ''    Thread.CurrentThread.CurrentCulture.DateTimeFormat.LongDatePattern = oCultura.vcFecLar

            ''    exInfo = New Exception("ShortDatePattern2: " + Thread.CurrentThread.CurrentCulture.DateTimeFormat.ShortDatePattern)
            ''    util.GrabarLog(exInfo, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))


            ''Catch ex As Exception

            ''End Try


        Catch ex As Exception

        Finally
            If GEN_Cliente IsNot Nothing Then GEN_Cliente.Dispose()
            If GEN_Cultura IsNot Nothing Then GEN_Cultura.Dispose()
            If GEN_Region IsNot Nothing Then GEN_Region.Dispose()
        End Try

    End Sub

    Public Function GetPropertyAD(ByVal NombreUsuario As String, ByVal PropertyName As String) As Object
        Dim _return As Object = Nothing
        Dim directory As DirectoryEntry = New DirectoryEntry(ConfigurationManager.AppSettings("RutaLDAP"))
        directory.Username = txtUserName.Text
        directory.Password = txtPassword.Text
        Dim filter As String = "(SAMAccountName=" & NombreUsuario & ")"
        Dim findUser As DirectorySearcher = New DirectorySearcher(directory, filter)
        For Each sResultSet As SearchResult In findUser.FindAll()
            For Each prop As DictionaryEntry In sResultSet.Properties
                For Each individualValue As Object In prop.Value
                    If PropertyName.ToUpper = prop.Key.ToString.ToUpper Then
                        _return = individualValue
                    End If
                Next
            Next
        Next
        Return _return
    End Function

    Sub ValidarAccesoLocation(strPages As String)


        'The path where the web.config file is located
        Dim path As String = "~/Administrator/"

        'Collections of aspx page names separated by a comma. 
        'Example content in a textbox: Default.aspx,Audit.aspx,

        'Dim strPages As String = ""

        'This is string array where we are going to break down all name of aspx pages 
        'contained in strPages variable

        Dim cdrPages As String() = strPages.Split(","c)

        'This is the list where we are going to transfer the names of our aspx pages 
        'for faster searching of existing items

        Dim accesslist As New List(Of String)()


        Try
            '1. Create Role
            System.Web.Security.Roles.CreateRole("General")

            '2. Open the Web Configuration --> make sure that you put the correct folder location of your web.config file
            Dim config As System.Configuration.Configuration = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration(path)

            '3. Get All Specified Locations
            Dim myLocationCollection As ConfigurationLocationCollection = config.Locations

            '4. Transfer the values of string[] strPages to List<string> accessList
            For i As Integer = 0 To strPages.Length - 1
                If strPages(i).ToString() IsNot Nothing AndAlso strPages(i).ToString() <> "" Then
                    accesslist.Add(strPages(i).ToString())
                End If
            Next

            '5. Loop through the LocationCollections
            For Each myLocation As ConfigurationLocation In myLocationCollection
                '6. Checks if myLocation exists in List<string> accessList
                Dim exists As Boolean = accesslist.Exists(Function(element) element = myLocation.Path)

                'If Exists
                If exists Then

                    '7. Open the configuration of myLocation
                    Dim [sub] As System.Configuration.Configuration = myLocation.OpenConfiguration()

                    '8. Get the authorization section of specific location
                    Dim section As AuthorizationSection = DirectCast([sub].GetSection("system.web/authorization"), System.Web.Configuration.AuthorizationSection)

                    '9. Declare the Authorization Rule, in this case, we are allowing a new role to have an access to a specific page
                    Dim autho As AuthorizationRule = New System.Web.Configuration.AuthorizationRule(System.Web.Configuration.AuthorizationRuleAction.Allow)

                    '10. Add the New Role to Authorization Section
                    autho.Roles.Add("General")
                    section.Rules.Add(autho)

                    '11. Save the "sub", or the specific location inside the web.config file.
                    [sub].Save()
                End If
            Next
            'message.InnerHtml = "Role Successfully Added!"
            'message.Attributes.Add("class", "msg_info")
        Catch
            'message.InnerHtml = "Saving Failed"
            'message.Attributes.Add("class", "msg_error")
        End Try


    End Sub

    Sub ActualizaCulturaConfig(ByVal vcCodCultura As String)
        Try
            ' Set the path of the config file.
            Dim configPath As String = ""

            ' Get the Web application configuration object.
            Dim config As System.Configuration.Configuration = WebConfigurationManager.OpenWebConfiguration("~")
            'WebConfigurationManager.OpenWebConfiguration(configPath)

            ' Get the section related object.
            Dim configSection As System.Web.Configuration.GlobalizationSection = CType(config.GetSection("system.web/globalization"), System.Web.Configuration.GlobalizationSection)

            Dim oldCI As System.Globalization.CultureInfo = New System.Globalization.CultureInfo(vcCodCultura)
            System.Threading.Thread.CurrentThread.CurrentCulture = oldCI
            System.Threading.Thread.CurrentThread.CurrentUICulture = oldCI


            ' Set New Culture property.
            configSection.Culture = System.Globalization.CultureInfo.CurrentCulture.ToString()

            ' Set UICulture property.
            configSection.UICulture = System.Globalization.CultureInfo.CurrentUICulture.ToString()

            ' Update if not locked.
            If Not configSection.SectionInformation.IsLocked Then
                config.Save()
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod>
    Public Shared Function VerificaSesion()
        Dim _return As String = ""
        Try
            If HttpContext.Current.Session("Usuario") Is Nothing Then 'Perdio la variable session usuario
                _return = "Perdio sesion"
            End If
        Catch ex As Exception
            _return = ex.Message
            Try
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Catch ex1 As Exception
                _return = "error en util"
            End Try
            'Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
        Return _return
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


    <WebMethod>
    Public Shared Function GetSession2(ByVal name As String) As String

        Return name

    End Function



#Region "Funciones Web Fija"

    Private Sub AsignarCulturaFija()
        'BL_GEN_Cliente GEN_Cliente = null;
        'BL_GEN_Cultura GEN_Cultura = null;
        'BL_GEN_Regi GEN_Region = null;
        'ENT_GEN_Cultura oCultura = default(ENT_GEN_Cultura);
        'try
        '{
        '    GEN_Cultura = new BL_GEN_Cultura();
        '    GEN_Region = new BL_GEN_Regi();
        '    GEN_Cliente = new BL_GEN_Cliente();               
        '    DataTable dtDatosCliente = GEN_Cliente.Mostrar(0);
        '    if (dtDatosCliente != null && Convert.ToInt32(dtDatosCliente.Rows[0]["inIdCultura"].ToString()) != 0)
        '    {
        '        oCultura = GEN_Cultura.Mostrar(Convert.ToInt32(dtDatosCliente.Rows[0]["inIdCultura"].ToString()));
        '    }
        '    else
        '    {
        '        oCultura = GEN_Cultura.MostrarPorPais(Convert.ToInt32((GEN_Region.Listar().REGI_F_vcCODPAI)));
        '    }
        '    if (oCultura != null)
        '    {
        '        oCultura.vcTipMon = oCultura.Moneda.vcSimMon;
        '    }
        '    Session["Cultura"] = oCultura;

        '}
        'catch (Exception ex)
        '{
        '}     
        Try
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
#End Region

    ''Protected Sub loginPrincipal_LoggedIn(sender As Object, e As EventArgs) Handles loginPrincipal.LoggedIn
    ''    Try
    ''        Response.Redirect("Index.aspx")
    ''    Catch
    ''    End Try
    ''End Sub

End Class
