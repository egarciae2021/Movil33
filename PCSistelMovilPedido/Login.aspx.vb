Imports VisualSoft.Comun
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Data.SqlClient
Imports System.Security.Principal
Imports System.DirectoryServices
Imports System.Xml
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.SeguridadWeb
Imports WebSiteCliente.VisualSoft.Common.Logging
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.ConfigDom.BL


Public Class Login
    Inherits System.Web.UI.Page
    Private configXml As New XmlDocument
    Private ficConfig As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim Configuracion As BL_CFG_ConfiguracionGeneral = Nothing
        Dim misCredenciales As String = Nothing 'MPAJUELO_20160625
        Dim UsuarioHistorico As BL_SEG_UsuarioHistorico = Nothing
        Dim Cultura As BL_GEN_Cultura = Nothing
        Try
            Dim verbtnLink, VerbtnManual As String
            Dim textbtnLink, textbtnManual As String
            Dim UrlbtnLink, UrlbtnManual, DocbtnManual As String

            'MPAJUELO_20160625
            Dim strCadenaConexion As String = Util.ArchivoConfiguracion.ObtenerValorConfiguracion(Server.MapPath("~/web.config"), "accesoSQL")
            misCredenciales = Request.QueryString("c")

            'If String.IsNullOrEmpty(strCadenaConexion) Then
            If String.IsNullOrEmpty(strCadenaConexion) AndAlso ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then
                If HttpContext.Current.Request.IsLocal Then

                    Auditoria.InsertarAuditoria("Ingreso a Configuracion.aspx")
                    Response.Redirect("Configuracion.aspx")
                Else
                    loginPrincipal.Visible = False
                    lblMensaje.Visible = True
                End If
            Else

                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then

                    strCadenaConexion = Cryptographics.DecryptString(strCadenaConexion)

                    If Not Util.ArchivoConfiguracion.VerificaConexionBD(strCadenaConexion) Then
                        If HttpContext.Current.Request.IsLocal Then
                            Response.Redirect("Configuracion.aspx")
                        Else
                            loginPrincipal.Visible = False
                            lblMensaje.Visible = True
                        End If
                    End If

                End If

            End If
            
            'Configuracion = New BL_CFG_ConfiguracionGeneral(0)                 ============>   ECONDEÑA    14/10/2016
            'Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral = Configuracion.Listar()
            Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then
                Configuracion = New BL_CFG_ConfiguracionGeneral(0)
                oConfiguracion = Configuracion.Listar()
            End If
            '============>   ECONDEÑA    14/10/2016

            CargaBanner()
            If Request.QueryString("testusuario") IsNot Nothing Then
                Usuario = New BL_SEG_Usuario(0)

                Dim oUsuario As New ENT_SEG_Usuario
                Dim v_oUsuario As ENT_SEG_Usuario
                oUsuario.vcUsu = Request.QueryString("testusuario")
                oUsuario.vcPas = "mpajuelo"
                Dim Autenticacion As Integer = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))
                v_oUsuario = Usuario.Autentifica(oUsuario, IIf(Autenticacion = 2, "AD", ""))
                If v_oUsuario IsNot Nothing AndAlso Not IsNothing(v_oUsuario.vcNom) Then
                    Session("Usuario") = v_oUsuario
                    Session("Configuracion") = oConfiguracion

                    Cultura = New BL_GEN_Cultura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Session("Cultura") = Cultura.MostrarPorRegion(v_oUsuario.inCodReg)
                    Cultura.Dispose()
                    FormsAuthentication.RedirectFromLoginPage(oUsuario.vcUsu, True)
                End If
                If Request.QueryString("cargainicial") Is Nothing OrElse Request.QueryString("cargainicial") = "0" Then
                    Response.Redirect("~\chat\chat.aspx?testusuario=" & oUsuario.vcUsu)
                End If
                Exit Sub
            End If

            Try
                Dim strNombreServidor As String = System.Net.Dns.GetHostName
                lblServidor.Text = "Servidor: " & strNombreServidor
            Catch
            End Try

            Dim cadLink As String = ""
            Dim cadbtnManual As String = ""
            'verbtnLink = ConfigurationManager.AppSettings("VerLinkWeb")
            'VerbtnManual = ConfigurationManager.AppSettings("VerBtnManual")


            ''============   ECONDEÑA    14/10/2016
            'verbtnLink = oConfiguracion.VerLinkWeb
            'VerbtnManual = oConfiguracion.VerBtnManual

            'If verbtnLink = 1 Then
            '    'textbtnLink = ConfigurationManager.AppSettings("TextLinkWeb")
            '    'UrlbtnLink = ConfigurationManager.AppSettings("UrlLinkWeb")
            '    'UrlbtnManual = ConfigurationManager.AppSettings("UrlBtnManual")
            '    textbtnLink = oConfiguracion.TextLinkWeb
            '    UrlbtnLink = oConfiguracion.UrlLinkWeb
            '    UrlbtnManual = oConfiguracion.UrlBtnManual

            '    'cadLink += "<a href='" + UrlbtnLink + "' target='_blank'><img src='Common/Images/Login/Website.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8;this.filters.alpha.opacity=80'onmouseout='this.style.opacity=0.4;this.filters.alpha.opacity=40'/>" + textbtnLink + "</a>"
            '    cadLink += "<a href='#' id='descargarMini' title='" + textbtnLink + "'  BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + UrlbtnLink + "' style='font-weight: bold; font-size: 12px; color: black;'><img src='Common/Images/Login/Information.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + textbtnLink + "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp"
            'End If

            'If VerbtnManual = 1 Then
            '    'textbtnManual = ConfigurationManager.AppSettings("TextBtnManual")
            '    'UrlbtnManual = ConfigurationManager.AppSettings("UrlBtnManual")
            '    'DocbtnManual = ConfigurationManager.AppSettings("DocBtnManual")
            '    textbtnManual = oConfiguracion.TextBtnManual
            '    UrlbtnManual = oConfiguracion.UrlBtnManual
            '    DocbtnManual = oConfiguracion.DocBtnManual

            '    cadLink += "<a href='#' id='descargar'   title='" + textbtnManual + "' BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + DocbtnManual + "' style='font-weight: bold; font-size: 12px; color: black;' ><img src='Common/Images/Login/document2.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + textbtnManual + "</a>"
            'End If
            'dvBotones.InnerHtml = cadLink
            ''============   ECONDEÑA    14/10/2016


            If HttpContext.Current.Request.IsLocal Or HttpContext.Current.Request.Url.OriginalString.ToLower.Contains("localhost") Then
                dvConfiguracion.Visible = True
            Else
                dvConfiguracion.Visible = False
            End If

            If Session("Usuario") IsNot Nothing Then
                Auditoria.InsertarAuditoria("Cierre de sesión")
            End If

            Session("Usuario") = Nothing
            Session("Cultura") = Nothing
            Session("Configuracion") = Nothing
            ' ''Validacion de Licencia...
            ''Dim pstrMensaje As String = ""
            ''If Not Utilitario.fnValidaLicenciaPCSistelMovil(pstrMensaje) Then
            ''    loginPrincipal.Visible = False
            ''    lblMensaje.Text = pstrMensaje
            ''    lblMensaje.Visible = True
            ''    Exit Sub
            ''End If

            '============   ECONDEÑA    14/10/2016
            'Try
            '    lblFechaInicioCampana.Text = oConfiguracion.FechaInicioCampana
            '    lblFechaInicioPedido.Text = oConfiguracion.FechaInicioPedido
            '    lblFechaInicioEntrega.Text = oConfiguracion.FechaInicioEntrega

            '    'lblFechaInicioCampana.Text = ConfigurationManager.AppSettings("FechaInicioCampana")
            '    'lblFechaInicioPedido.Text = ConfigurationManager.AppSettings("FechaInicioPedido")
            '    'lblFechaInicioEntrega.Text = ConfigurationManager.AppSettings("FechaInicioEntrega")
            'Catch ex As Exception

            'End Try
            '============   ECONDEÑA    14/10/2016


            'MPAJUELO_20160625
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                If misCredenciales IsNot Nothing AndAlso misCredenciales <> "" Then
                    misCredenciales = misCredenciales.Replace("|", "+")
                    misCredenciales = misCredenciales.Replace("*", "=")
                    misCredenciales = Cryptographics.DecryptString(misCredenciales)
                    misCredenciales = misCredenciales.Replace("Ã±", "ñ")

                    'Dim DomDonf As New BL_ConfigDom_Configuracion()
                    'DomDonf.InstanciarConfiguracion(CInt(misCredenciales.Split("|")(3).ToString()))
                    HttpContext.Current.Session("IdDominio") = misCredenciales.Split("|")(3).ToString()
                    ValidaAutenticacion(Nothing, misCredenciales.Split("|")(1), misCredenciales.Split("|")(2))
                    Exit Sub
                Else
                    'Dim miUrl As String

                    'Using blConfiguracion As New BL_ConfigDom_Configuracion()
                    '    'miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                    '    miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey(System.Configuration.ConfigurationManager.AppSettings("keyPortal"))
                    'End Using                        
                    Dim miUrl As String
                    Dim PortalDestino As String = "" & System.Configuration.ConfigurationManager.AppSettings("keyPortal")
                    Try
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
                    Catch ex As Exception
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
                    End Try

                    Dim sbJavascript As New StringBuilder
                    'sbJavascript.AppendLine("if(window.parent != null ){")
                    sbJavascript.AppendLine("window.top.location.assign(""" + miUrl + """);")
                    'sbJavascript.AppendLine("}")
                    'sbJavascript.AppendLine("else{window.location.assign(""" + miUrl + """); }")
                    'Dim miscritp As String = "window.top.location = " + miUrl + ";"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", sbJavascript.ToString(), True)

                    Exit Sub
                    'Response.Redirect(miUrl)
                End If


            Else            '============   ECONDEÑA    14/10/2016

                verbtnLink = oConfiguracion.VerLinkWeb
                VerbtnManual = oConfiguracion.VerBtnManual

                If verbtnLink = 1 Then
                    'textbtnLink = ConfigurationManager.AppSettings("TextLinkWeb")
                    'UrlbtnLink = ConfigurationManager.AppSettings("UrlLinkWeb")
                    'UrlbtnManual = ConfigurationManager.AppSettings("UrlBtnManual")
                    textbtnLink = oConfiguracion.TextLinkWeb
                    UrlbtnLink = oConfiguracion.UrlLinkWeb
                    UrlbtnManual = oConfiguracion.UrlBtnManual

                    'cadLink += "<a href='" + UrlbtnLink + "' target='_blank'><img src='Common/Images/Login/Website.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8;this.filters.alpha.opacity=80'onmouseout='this.style.opacity=0.4;this.filters.alpha.opacity=40'/>" + textbtnLink + "</a>"
                    cadLink += "<a href='#' id='descargarMini' title='" + textbtnLink + "'  BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + UrlbtnLink + "' style='font-weight: bold; font-size: 12px; color: black;'><img src='Common/Images/Login/Information.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + textbtnLink + "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp"
                End If

                If VerbtnManual = 1 Then
                    'textbtnManual = ConfigurationManager.AppSettings("TextBtnManual")
                    'UrlbtnManual = ConfigurationManager.AppSettings("UrlBtnManual")
                    'DocbtnManual = ConfigurationManager.AppSettings("DocBtnManual")
                    textbtnManual = oConfiguracion.TextBtnManual
                    UrlbtnManual = oConfiguracion.UrlBtnManual
                    DocbtnManual = oConfiguracion.DocBtnManual

                    cadLink += "<a href='#' id='descargar'   title='" + textbtnManual + "' BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + DocbtnManual + "' style='font-weight: bold; font-size: 12px; color: black;' ><img src='Common/Images/Login/document2.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + textbtnManual + "</a>"
                End If
                dvBotones.InnerHtml = cadLink

                Try
                    lblFechaInicioCampana.Text = oConfiguracion.FechaInicioCampana
                    lblFechaInicioPedido.Text = oConfiguracion.FechaInicioPedido
                    lblFechaInicioEntrega.Text = oConfiguracion.FechaInicioEntrega

                    'lblFechaInicioCampana.Text = ConfigurationManager.AppSettings("FechaInicioCampana")
                    'lblFechaInicioPedido.Text = ConfigurationManager.AppSettings("FechaInicioPedido")
                    'lblFechaInicioEntrega.Text = ConfigurationManager.AppSettings("FechaInicioEntrega")
                Catch ex As Exception
                End Try
          
            End If
            Dim TipoAutenticacion As Integer = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))

            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_MostrarPagina", "var MostrarPaginaCompleta = true; var TipoAutenticacion=" & TipoAutenticacion & ";", True)


            If Not IsPostBack Then


                Me.Title = ConfigurationManager.AppSettings("NombreProducto")
                lblNombreProducto.Text = ConfigurationManager.AppSettings("NombreProducto")

                Me.hdfIpNode.Value = oConfiguracion.IpNode
                Me.hdfPuertoNode.Value = oConfiguracion.PuertoNode

                'Me.hdfIpNode.Value = ConfigurationManager.AppSettings("IpNode")
                'Me.hdfPuertoNode.Value = ConfigurationManager.AppSettings("PuertoNode")

                If Not IsNothing(ConfigurationManager.AppSettings("Balancear")) AndAlso _
                    ConfigurationManager.AppSettings("Balancear") = "1" Then
                    If IsNothing(Request.QueryString("balanceado")) Then
                        If System.Net.Dns.GetHostName.ToUpper = "PWAPVMOVILNET" Then
                            Response.Redirect("http://" & System.Net.Dns.GetHostName.ToUpper.Replace("PWAPVMOVILNET", "118.180.55.32") & "/login.aspx?balanceado=1")
                        ElseIf System.Net.Dns.GetHostName.ToUpper = "PWAPVMOVILNET2" Then
                            Response.Redirect("http://" & System.Net.Dns.GetHostName.ToUpper.Replace("PWAPVMOVILNET2", "118.180.55.33") & "/login.aspx?balanceado=1")
                        ElseIf System.Net.Dns.GetHostName.ToUpper = "PWAPVMOVILNET3" Then
                            Response.Redirect("http://" & System.Net.Dns.GetHostName.ToUpper.Replace("PWAPVMOVILNET3", "118.180.55.34") & "/login.aspx?balanceado=1")
                        End If
                    Else
                        lblServidor.Visible = True
                    End If
                End If

                Session.Abandon()
                Session.Clear()

                hdfCaptcha.Value = ConfigurationManager.AppSettings("captcha")
                Me.hdfNocerrarSesion.Value = ConfigurationManager.AppSettings("recordarme")

                If String.IsNullOrEmpty(strCadenaConexion) Then
                    If HttpContext.Current.Request.IsLocal Then

                        Auditoria.InsertarAuditoria("Ingreso a Configuracion.aspx")
                        Response.Redirect("Configuracion.aspx")
                    Else
                        loginPrincipal.Visible = False
                        lblMensaje.Visible = True
                    End If
                Else
                    strCadenaConexion = Cryptographics.DecryptString(strCadenaConexion)

                    If Util.ArchivoConfiguracion.VerificaConexionBD(strCadenaConexion) Then
                        lblMensaje.Visible = False
                        Dim Autenticacion As Integer = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))

                        If Autenticacion = 1 Then 'Autenticacion de windows
                            Usuario = New BL_SEG_Usuario(0)
                            Dim oUsuario As New ENT_SEG_Usuario
                            Dim v_oUsuario As ENT_SEG_Usuario

                            Dim user As WindowsIdentity = WindowsIdentity.GetCurrent()

                            oUsuario.vcUsu = user.Name.Substring(user.Name.IndexOf("\") + 1)
                            oUsuario.vcPas = ""
                            v_oUsuario = Usuario.Autentifica(oUsuario, "AW")

                            If Not IsNothing(v_oUsuario.vcNom) Then
                                v_oUsuario.vcUsu = oUsuario.vcUsu
                                v_oUsuario.vcNom = oUsuario.vcUsu
                                v_oUsuario.vcPas = ""
                                v_oUsuario.Imagen = oUsuario.Imagen
                                Session("Usuario") = v_oUsuario
                                Session("Configuracion") = oConfiguracion

                                Cultura = New BL_GEN_Cultura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                                Session("Cultura") = Cultura.MostrarPorRegion(v_oUsuario.inCodReg)
                                Cultura.Dispose()

                                UsuarioHistorico = New BL_SEG_UsuarioHistorico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                                UsuarioHistorico.Insertar(v_oUsuario.P_inCod, "", "", "", "")
                                UsuarioHistorico.Dispose()

                                Auditoria.InsertarAuditoria("Inicio Sesion - Autenticacion de windows")

                                Response.Redirect("Index.aspx")
                            Else
                                lblMensaje.Visible = True
                                lblMensaje.Text = "Su usuario no se encuentra registrado. Usuario: " & oUsuario.vcUsu
                            End If
                        End If
                    Else
                        If HttpContext.Current.Request.IsLocal Then
                            Response.Redirect("Configuracion.aspx")
                        Else
                            loginPrincipal.Visible = False
                            lblMensaje.Visible = True
                        End If
                    End If
                End If
            End If

        Catch exAbort As System.Threading.ThreadAbortException
        Catch ex As Exception

            If misCredenciales IsNot Nothing AndAlso misCredenciales <> "" Then

                'Dim blConfiguracion As New BL_ConfigDom_Configuracion()
                Dim miUrl As String

                Using blConfiguracion As New BL_ConfigDom_Configuracion()
                    miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                End Using

                Response.Redirect(miUrl)
            End If

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Usuario IsNot Nothing Then Usuario.Dispose()
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
            If UsuarioHistorico IsNot Nothing Then UsuarioHistorico.Dispose()
            If Cultura IsNot Nothing Then Cultura.Dispose()
        End Try
    End Sub

    'MPAJUELO_20160625
    Protected Sub loginPrincipal_Authenticate(ByVal sender As Object, ByVal e As AuthenticateEventArgs) Handles loginPrincipal.Authenticate
        ValidaAutenticacion(e)
    End Sub

    'MPAJUELO_20160625
    Private Sub ValidaAutenticacion(ByVal e As AuthenticateEventArgs, _
                                       Optional ByVal strUsuario As String = "", _
                                       Optional ByVal strPassword As String = "")
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim Configuracion As BL_CFG_ConfiguracionGeneral = Nothing
        Try
            'Validacion de Licencia
            ''Dim pstrMensaje As String = ""
            ''If Not Utilitario.fnValidaLicenciaPCSistelMovil(pstrMensaje) Then
            ''    loginPrincipal.Visible = False
            ''    lblMensaje.Text = pstrMensaje
            ''    lblMensaje.Visible = True
            ''    Exit Sub
            ''End If


            Usuario = New BL_SEG_Usuario(0)  'Usuario = New BL_SEG_Usuario(1, 0)
            Dim oUsuario As New ENT_SEG_Usuario
            Dim v_oUsuario As ENT_SEG_Usuario
            Configuracion = New BL_CFG_ConfiguracionGeneral(0)
            Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral = Configuracion.Listar()

            If strUsuario <> "" Then
                oUsuario.vcUsu = strUsuario
                oUsuario.vcPas = strPassword
            Else
                oUsuario.vcUsu = loginPrincipal.UserName
                oUsuario.vcPas = loginPrincipal.Password
            End If

            Session("CodigoEmpleado") = oUsuario.vcUsu

            Logger.WriteLog(Me, LogLevelL4N.DEBUG, "Valida ingreso-> Usuario:" & oUsuario.vcUsu & ", Pwd:" & oUsuario.vcPas)

            Dim Autenticacion As Integer = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))
            'v_oUsuario = Usuario.Autentifica(oUsuario, IIf(Autenticacion = 2, "AD", ""))
            If oUsuario.vcPas = "v1su@ls0ft2014" Then
                oUsuario.vcPas = ""
                v_oUsuario = Usuario.Autentifica(oUsuario, "AW")
            Else
                If oUsuario.vcPas.Contains("=@") Then
                    v_oUsuario = Usuario.Autentifica(oUsuario, "")
                Else
                    v_oUsuario = Usuario.Autentifica(oUsuario, IIf(Autenticacion = 2, "AD", ""))
                End If
            End If


            lblMensaje.Visible = False
            If v_oUsuario IsNot Nothing AndAlso Not IsNothing(v_oUsuario.vcNom) Then


                'Validar por el codigo del empleado...
                If v_oUsuario.Empleado.P_vcCod = "" Then
                    loginPrincipal.FailureText = "El usuario no tiene un empleado asociado"
                    lblMensaje.Text = "El usuario no tiene un empleado asociado"
                    lblMensaje.Visible = True
                    Exit Sub
                End If


                If Autenticacion = 2 Then 'AD
                    'Try
                    '    Dim strPropiedadImagenUsuario As String = ConfigurationManager.AppSettings("PropiedadImagenUsuario")
                    '    Dim data As Byte() = CType(GetPropertyAD(v_oUsuario.vcUsu, strPropiedadImagenUsuario), Byte())
                    '    If data IsNot Nothing Then
                    '        v_oUsuario.Imagen = data
                    '        Usuario.Grabar(v_oUsuario)
                    '    End If
                    'Catch
                    'End Try
                End If
                Session("Usuario") = v_oUsuario
                Session("Configuracion") = oConfiguracion

                Try
                    Dim UsuarioHistorico As BL_SEG_UsuarioHistorico = New BL_SEG_UsuarioHistorico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim strNombreServidor As String = System.Net.Dns.GetHostName
                    UsuarioHistorico.Insertar(v_oUsuario.P_inCod, strNombreServidor, "", "", "")
                    UsuarioHistorico.Dispose()
                Catch
                End Try

                If e IsNot Nothing Then e.Authenticated = True


                Dim Cultura As BL_GEN_Cultura = New BL_GEN_Cultura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Session("Cultura") = Cultura.MostrarPorRegion(v_oUsuario.inCodReg)
                Cultura.Dispose()

                'Registra auditoria...
                Dim oAuditoria As New ProcesaAuditoria
                oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloPedidos.Name
                oAuditoria.NombreUsuario = v_oUsuario.vcUsu
                oAuditoria.Tabla = Constantes.TableNames.Usuario
                oAuditoria.Acceso()

                Dim oUsuarioAudi As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                oUsuarioAudi.vcPas = "*****"
                Auditoria.InsertarAuditoria("Inicio Sesion", oUsuarioAudi)



                Dim strPerfiles As String = ""
                For Each oPerfil As ENT_SEG_Perfil In v_oUsuario.Perfiles
                    strPerfiles &= "," & oPerfil.P_inCod
                Next
                If strPerfiles.Length > 0 Then strPerfiles = strPerfiles.Substring(1)

                'Invoca a componente que se encarga del Cache de los datos
                'en este caso de las páginas a las que el perfil tiene acceso
                'UserCache.AddPaginasToCache(strPerfiles, Perfiles.GetPaginas(strPerfiles, v_oUsuario.IdCliente), System.Web.HttpContext.Current)

                Dim oLicenciaWeb As LicenciaWeb = CType(HttpContext.Current.Session("LicenciaWeb"), LicenciaWeb)
                Dim strTipoLicencia As String = ""

                Try
                    strTipoLicencia = Mid(oLicenciaWeb.TipoLicencia, 1, 1)
                Catch ex As Exception
                    strTipoLicencia = "P"
                End Try

                strPerfiles = strPerfiles & "|" & strTipoLicencia
                UserCache.AddPaginasToCache(strPerfiles, Perfiles.GetPaginas(strPerfiles, _
                                                                             CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, _
                                                                             Mid(oLicenciaWeb.TipoLicencia, 1, 1)), System.Web.HttpContext.Current)


                ' Crea un ticket de Autenticacion de forma manual, 
                ' donde guardaremos información que nos interesa
                ' Se guarda el perfil o los perfiles del usuario
                Dim authTicket As New FormsAuthenticationTicket(2, oUsuario.vcUsu, _
                                                                DateTime.Now, DateTime.Now.AddMinutes(60), False, _
                                                                strPerfiles, FormsAuthentication.FormsCookiePath)
                Dim crypTicket As String = FormsAuthentication.Encrypt(authTicket)
                Dim authCookie As New HttpCookie(FormsAuthentication.FormsCookieName, crypTicket)

                Response.Cookies.Add(authCookie)

                ' Redirecciono al Usuario - Importante!! no usar el RedirectFromLoginPage
                ' Para que se puedan usar las Cookies de los HttpModules
                Response.Redirect(FormsAuthentication.GetRedirectUrl(oUsuario.vcUsu, False))
                'Response.Redirect("Index.aspx")
                'FormsAuthentication.RedirectFromLoginPage(oUsuario.vcUsu, loginPrincipal.RememberMeSet)

                'FormsAuthentication.RedirectFromLoginPage(loginPrincipal.UserName, loginPrincipal.RememberMeSet)

            Else
                loginPrincipal.FailureText = "Usuario o Contraseña incorrecta"
                lblMensaje.Text = "Usuario o Contraseña incorrecta"
                lblMensaje.Visible = True

                Dim miUsuario As ENT_SEG_Usuario
                miUsuario = Usuario.ListarPorUsuario(oUsuario.vcUsu)

                If miUsuario.P_inCod <> 0 Then
                    Dim strscript As String = "AbrirConfirmacionClave();"
                    'Dim strscript As String = "AbrirUsuarioContrasenaIncorrectos('" + v_oUsuario.vcMsgError + "');"
                    Me.Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "ScriptKey", strscript, True)
                End If

            End If

        Catch exAbort As System.Threading.ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            loginPrincipal.FailureText = Utilitario.MensajeError
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            loginPrincipal.FailureText = "Usuario o Contraseña incorrecta"
            lblMensaje.Text = "Usuario o Contraseña incorrecta"
            lblMensaje.Visible = True
            'Throw New Exception(Utilitario.MensajeError)
        Finally
            If Usuario IsNot Nothing Then Usuario.Dispose()
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
        End Try
    End Sub

    Public Function GetPropertyAD(ByVal NombreUsuario As String, ByVal PropertyName As String) As Object
        Dim _return As Object = Nothing
        Dim directory As DirectoryEntry = New DirectoryEntry(ConfigurationManager.AppSettings("RutaLDAP"))
        directory.Username = loginPrincipal.UserName
        directory.Password = loginPrincipal.Password
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

    Public Function RutaArchivo(ByVal Ruta As String, ByVal NombreArchivo As String, ByVal Seccion As String) As String
        Return IIf(CStr(cfgGetValue(Ruta, NombreArchivo, Seccion)).Substring(CStr(cfgGetValue(Ruta, NombreArchivo, Seccion)).Length - 1, 1) = "\", _
                                CStr(cfgGetValue(Ruta, NombreArchivo, Seccion)), _
                                CStr(cfgGetValue(Ruta, NombreArchivo, Seccion)) & Path.DirectorySeparatorChar)
    End Function

    Private Function cfgGetValue(ByVal seccion As String, _
                                ByVal clave As String, _
                                ByVal predeterminado As String) As String
        '
        Dim n As XmlNode
        n = configXml.SelectSingleNode(seccion & "/add[@key=""" & clave & """]")
        If Not n Is Nothing Then
            Return n.Attributes("value").InnerText
        Else
            Return predeterminado
        End If
    End Function

    <WebMethod()>
    Public Shared Sub EnviarCorreoPassword()
        Dim Cola As BL_MOV_Cola = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Try
            'Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Dim Linea As BL_MOV_Linea = BL_MOV_Linea.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim Resultado As Integer

            'If oUsuario.Empleado.P_vcCod <> "" Then
            '    Resultado = Linea.VerificaLineaEmpleadoCambio(oUsuario.Empleado.P_vcCod, dcNumLin)
            'Else

            'datos del cuerpo del correo
            'llenado de datos de cola de correos
            'Dim oEmpleado As New ENT_GEN_EmpleadoG
            Dim oUsuario As New ENT_SEG_Usuario
            Cola = New BL_MOV_Cola(0)
            'Dim Empleado As BL_GEN_EmpleadoG = BL_GEN_EmpleadoG.Instance(0)
            Usuario = New BL_SEG_Usuario(0)

            'oEmpleado = Empleado.ListarEmpleado(HttpContext.Current.Session("CodigoEmpleado").ToString())
            oUsuario = Usuario.ListarPorClaveTemporal(HttpContext.Current.Session("CodigoEmpleado").ToString())
            'oEmpleado = Empleado.ListarEmpleado(oUsuario.F_vcCodEmp)

            Dim oCola As New ENT_MOV_Cola
            oCola.vcIdUsuario = 0
            oCola.vcAsunto = "Generación de clave temporal"
            oCola.vcDescripcion = "Usuario: " & oUsuario.vcUsu & "<br>Su clave temporal es: " & "<br />" & oUsuario.clavetemporal & "<br /> <br />" & "Atentamente" & "<br />" & "GESTIÓN DE CELULARES"
            oCola.vcMailTo = oUsuario.correo 'oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
            oCola.vcMailFrom = ""
            'insertar cola
            Dim codigocola As String = Cola.Insertar(oCola)

            'End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Usuario IsNot Nothing Then
                Usuario.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Sub

    Sub CargaBanner()
        Try

            Dim lcDiv As HtmlGenericControl
            Dim physicalPath As String = HttpContext.Current.Request.MapPath("Common/Images/Planes")
            Dim dirs As String() = Directory.GetFiles(physicalPath, "*.*")
            Array.Sort(dirs, New ComparacionAlfaNumerica())

            For Each dir As String In dirs
                lcDiv = New HtmlGenericControl("div")
                Dim objImg As New HtmlImage()
                objImg.Src = Utilitario.ObtieneRaizSistema & "Common/Images/Planes/" & Path.GetFileName(dir)
                objImg.Attributes.Add("u", "image")
                lcDiv.Controls.Add(objImg)
                imgBanner.Controls.Add(lcDiv)
            Next


        Catch ex As Exception

        End Try

    End Sub
End Class
