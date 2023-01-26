Imports System.Web.Services
Imports VisualSoft.PCSistel.Comprobantes.BE
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.ConfigDom.BL
Imports System.IO

Public Class Index
    Inherits System.Web.UI.Page

    Protected Overloads Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim objBlCampana As BL_MOV_CAM_Campana = Nothing
        Dim objBlDash As BL_MOV_CAM_DashboardPedido = Nothing
        Dim ComprobanteConfiguracion As BL_MOV_FAC_Comprobante_Configuracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then

                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then

                    Dim miUrl As String
                    Dim PortalDestino As String = "" & System.Configuration.ConfigurationManager.AppSettings("keyPortal")
                    If PortalDestino IsNot Nothing AndAlso PortalDestino <> "" Then
                        Using blConfiguracion As New BL_ConfigDom_Configuracion()
                            Try
                                miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey(PortalDestino)
                            Catch ex As Exception
                            End Try
                            Dim blConfiguracionDom As New BL_ConfigDom_Configuracion()
                            miUrl = blConfiguracionDom.ObtenerConfiguracionSistemaByKey(PortalDestino)
                            If blConfiguracionDom IsNot Nothing Then blConfiguracionDom.Dispose()
                        End Using
                    Else
                        Using blConfiguracion As New BL_ConfigDom_Configuracion()
                            miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                        End Using
                    End If

                    Dim sbJavascript As New StringBuilder
                    sbJavascript.AppendLine("window.top.location.assign(""" + miUrl + """);")
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", sbJavascript.ToString(), True)
                    Exit Sub
                Else
                    Response.Redirect("login.aspx")
                End If
            Else

                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral = CType(Session("Configuracion"), ENT_CFG_ConfiguracionGeneral)
                If oUsuario Is Nothing Then
                    Dim miUrl As String
                    Dim PortalDestino As String = "" & System.Configuration.ConfigurationManager.AppSettings("keyPortal")
                    If PortalDestino IsNot Nothing AndAlso PortalDestino <> "" Then
                        Using blConfiguracion As New BL_ConfigDom_Configuracion()
                            Try
                                miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey(PortalDestino)
                            Catch ex As Exception
                            End Try
                            Dim blConfiguracionDom As New BL_ConfigDom_Configuracion()
                            miUrl = blConfiguracionDom.ObtenerConfiguracionSistemaByKey(PortalDestino)
                            If blConfiguracionDom IsNot Nothing Then blConfiguracionDom.Dispose()
                        End Using
                    Else
                        Using blConfiguracion As New BL_ConfigDom_Configuracion()
                            miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                        End Using
                    End If

                    Dim sbJavascript As New StringBuilder
                    sbJavascript.AppendLine("window.top.location.assign(""" + miUrl + """);")
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", sbJavascript.ToString(), True)
                    Exit Sub
                    'Response.Redirect("~\Login.aspx")
                    'Exit Sub
                End If

                If Not Page.IsPostBack Then
                    ComprobanteConfiguracion = New BL_MOV_FAC_Comprobante_Configuracion(oUsuario.IdCliente)

                    Me.Title = ConfigurationManager.AppSettings("NombreProducto")

                    ''''''''''''''''ya no usar este''''''''''''''''lblTituloChat.Text = ConfigurationManager.AppSettings("TituloChat")
                    '''''''''''''''''''USAR ESTE'''''''''''''''''''lblTituloChat.Text = oConfiguracion.TituloChat
                    ''''''''''''''''ya no usar este '''''''''''''''lblSubtituloChat.Text = ConfigurationManager.AppSettings("SubtituloChat")
                    '''''''''''''''''''USAR ESTE'''''''''''''''''''lblSubtituloChat.Text = oConfiguracion.SubtituloChat

                    hdfEsSimulacion.Value = ConfigurationManager.AppSettings("EsSimulacion")
                    lblUsuario.Text = oUsuario.vcNom
                    If oUsuario.UltimaVisita.Year <> 1 Then
                        lblUltimaVisita.Text = " - Última visita: " & Microsoft.VisualBasic.Right("0" & oUsuario.UltimaVisita.Day, 2) & " de " & Utilitario.ObtieneNombreMes(oUsuario.UltimaVisita.Month) & " del " & oUsuario.UltimaVisita.Year & " - " & oUsuario.UltimaVisita.ToString("HH:mm:ss")
                    Else
                        lblUltimaVisita.Text = ""
                    End If

                    btnChat.Visible = False
                    lblChat.Visible = False
                    anuncio.Visible = False
                    dvCierreAnuncio.Visible = False
                    objBlCampana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
                    Dim oCampana As MOV_CAM_Campana = objBlCampana.obtenerCampanaActiva(oUsuario.IdCliente)
                    ''If oCampana.IdCampana <> 0 Then
                    ''    If oCampana.ActivarChat = True Then
                    ''        Dim Politica As BL_MOV_Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    ''        If oUsuario.GrupoFam.ToString() <> "" Then
                    ''            If Politica.ValidarPoliticaCampana(oUsuario.GrupoFam) Then
                    ''                btnChat.Visible = True
                    ''                lblChat.Visible = True
                    ''                dvChat.Style("display") = ""
                    ''            End If
                    ''        End If
                    ''    End If
                    ''End If
                    If oCampana.ActivarPublicidad = True AndAlso oCampana.IdPublicidad <> 0 Then
                        anuncio.Visible = True
                        dvCierreAnuncio.Visible = True
                        procCargarPublicidad(oCampana.IdPublicidad)
                    End If

                    'ECONDEÑA   20170718
                    Dim btTieneCorreo = Not (oUsuario.Mail = "" Or oUsuario.Empleado.Correo = "")

                    hfUsuario.Value = oUsuario.vcUsu

                    'Dim CampanaConf As ENT_MOV_CAM_CampanaConf = objBlCampana.obtenerCampanaActivaConf(oUsuario.IdCliente)
                    objBlDash = New BL_MOV_CAM_DashboardPedido(oUsuario.IdCliente)

                    'Dim CreditoUsuario As ENT_MOV_CAM_DashboardPedido = objBlDash.mostrarProductoCreditoAsignado(oUsuario.Empleado.P_vcCod, CampanaConf.IdCampana)

                    'If CampanaConf.IdCampana <> -1 Then
                    '    oUsuario.IdCampana = CampanaConf.IdCampana
                    '    Session("Usuario") = oUsuario
                    'End If

                    Me.hdfIpNode.Value = oConfiguracion.IpNode
                    Me.hdfPuertoNode.Value = oConfiguracion.PuertoNode

                    'Me.hdfIpNode.Value = ConfigurationManager.AppSettings("IpNode")
                    'Me.hdfPuertoNode.Value = ConfigurationManager.AppSettings("PuertoNode")

                    Dim js As New JavaScriptSerializer()
                    'Dim script As String = "var CampanaConf = " + js.Serialize(CampanaConf) + "; "
                    Dim script As String = "var CampanaConf; "
                    'script = script + "var CreditoUsuario = " + js.Serialize(CreditoUsuario) + "; "
                    script = script + "var CreditoUsuario; "
                    script = script + "var strConcideraciones = '" + oConfiguracion.Consideraciones + "'; "
                    'script = script + "var arCampanasActivas = " + CargarVaribleCampanasActivas(objBlCampana.ObtenerCampanasActivas(oUsuario.IdCliente)) + ";"
                    Try
                        script = script + "var arCampanasActivas = " + CargarVaribleCampanasActivas(objBlCampana.ObtenerCampanasActivasPedidos(oUsuario.IdCliente, oUsuario.vcUsu)) + ";"
                    Catch ex As Exception
                        script = script + "var arCampanasActivas = " + CargarVaribleCampanasActivas(objBlCampana.ObtenerCampanasActivas(oUsuario.IdCliente)) + ";"
                    End Try

                    'script = script + "var strConcideraciones = '" + ConfigurationManager.AppSettings("Consideraciones") + "'; "
                    script = script + "var oCulturaUsuario = " + js.Serialize(Session("Cultura")) + "; "

                    script = script + "var btTieneCorreo = " & IIf(btTieneCorreo, "true", "false") & ";"

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                    Dim oComprobanteConfiguracion As ENT_MOV_FAC_Comprobante_Configuracion = ComprobanteConfiguracion.Mostrar()
                    Dim flagVisor As Boolean = oComprobanteConfiguracion.MostrarVisor

                    If flagVisor Then
                        dvComprobantes.Style("display") = "block"
                    End If

                    'datos de login
                    'lblFechaInicioCampana.Text = oConfiguracion.FechaInicioCampana
                    'lblFechaInicioPedido.Text = oConfiguracion.FechaInicioPedido
                    'lblFechaInicioEntrega.Text = oConfiguracion.FechaInicioEntrega

                    Dim htmlDocumentos As String = ""
                    If oConfiguracion.VerLinkWeb = 1 Then
                        htmlDocumentos += "<li style='line-height:30px;'><a href='#' id='descargarMini' title='" + oConfiguracion.TextLinkWeb + "'  BtnUrl = '" + oConfiguracion.UrlBtnManual + "' BtnDoc = '" + oConfiguracion.UrlLinkWeb + "' style='font-size: 12px; color: #0065BA;'><img src='Common/Images/Login/Information.png' />&nbsp;" + oConfiguracion.TextLinkWeb + "</a></li>"
                    End If
                    If oConfiguracion.VerBtnManual = 1 Then
                        htmlDocumentos += "<li style='line-height:30px;'><a href='#' id='descargar' title='" + oConfiguracion.TextBtnManual + "' BtnUrl = '" + oConfiguracion.UrlBtnManual + "' BtnDoc = '" + oConfiguracion.DocBtnManual + "' style='font-size: 12px; color: #0065BA;' ><img src='Common/Images/Login/document2.png' />&nbsp;" + oConfiguracion.TextBtnManual + "</a></li>"
                    End If
                    If oConfiguracion.VerLinkFaq Then
                        htmlDocumentos += "<li style='line-height:30px;'><a href='#' id='descargarFAQ' title='" + oConfiguracion.TextLinkFaq + "' BtnUrl = '" + oConfiguracion.UrlBtnManual + "' BtnDoc = '" + oConfiguracion.UrlLinkFaq + "' style='font-size: 12px; color: #0065BA;' ><img src='Common/Images/FAQ_2.png' />&nbsp;" + oConfiguracion.TextLinkFaq + "</a></li>"
                    End If
                    If Not String.IsNullOrEmpty(htmlDocumentos) Then
                        dvDocumentos.Style("display") = ""
                        ulDocumentos.InnerHtml = htmlDocumentos
                    End If

                    Dim inTipoContrato As Integer = oCampana.TipoContrato   'ECONDEÑA   13/07/2016
                    hdfTipoContrato.Value = inTipoContrato.ToString()
                    If inTipoContrato = 1 Or inTipoContrato = 0 Then
                        dvContrato.Style("display") = "block"
                    End If

                End If

            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If objBlCampana IsNot Nothing Then
                objBlCampana.Dispose()
            End If
            If ComprobanteConfiguracion IsNot Nothing Then
                ComprobanteConfiguracion.Dispose()
            End If
        End Try

    End Sub

    Sub procCargarPublicidad(IdPublicidad As Integer)
        Dim Publicidad As BL_MOV_CAM_Publicidad = Nothing
        Try
            Publicidad = New BL_MOV_CAM_Publicidad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'Leer publicidad desde el otro Site PCSistel Movil Administrador
            'Dim strURLSitePCSistelMovil As String = ConfigurationManager.AppSettings("URLSitePCSistelMovil")
            Dim strURLSitePCSistelMovil As String = ""

            'Obtener lista de imagenes...
            If strURLSitePCSistelMovil <> "" Then

                Dim oPublicidad As MOV_CAM_Publicidad = Publicidad.MostrarPorId(IdPublicidad)
                For Each oDetallePublicidad As MOV_CAM_PublicidadDetalle In oPublicidad.MOV_CAM_PublicidadDetalle
                    Dim lcLI As New HtmlGenericControl("li")
                    Dim objImg As New HtmlImage()
                    objImg.Src = strURLSitePCSistelMovil & "/" & oDetallePublicidad.RutaArchivo.Replace("\", "/").Substring(6)
                    objImg.Height = 115
                    objImg.Width = 512
                    lcLI.Controls.Add(objImg)
                    imgBanner.Controls.Add(lcLI)
                Next

                If oPublicidad.MOV_CAM_PublicidadDetalle.Count = 1 Then
                    Dim Script As String = "$(function () { $('#slider').easySlider({auto: true,continuous: false});$('#slider').show('blind', { direction: 'vertical' }, 0); });"
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "keys", Script, True)
                Else
                    Dim Script As String = "$(function () { $('#slider').easySlider({auto: true,continuous: true});$('#slider').show('blind', { direction: 'vertical' }, 2200); });"
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "keys", Script, True)
                End If

            End If
        Catch ex As Exception
        Finally
            If Publicidad IsNot Nothing Then
                Publicidad.Dispose()
            End If
        End Try

    End Sub

    Private Function CargarVaribleCampanasActivas(ByVal dtCampanasActivas As DataTable) As String
        Dim Resultado As String = String.Empty
        Try
            Dim rutaLogo As String = String.Empty, rutaIcono As String = String.Empty, strfn As String = String.Empty
            Resultado = "["
            If dtCampanasActivas.Rows.Count > 0 Then
                For Each dr As DataRow In dtCampanasActivas.Rows
                    Try
                        Dim logo As Byte() = CType(dr("LogoOperador"), Byte())
                        strfn = Server.MapPath("~/Common/Images/logo_" + dr("NombreOperador").ToString() + ".png")
                        Dim fs_Logo As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs_Logo.Write(logo, 0, logo.Length)
                        fs_Logo.Flush()
                        fs_Logo.Close()
                        rutaLogo = "../Common/Images/logo_" + dr("NombreOperador").ToString() + ".png"

                        Dim icono As Byte() = CType(dr("IconoOperador"), Byte())
                        strfn = Server.MapPath("~/Common/Images/icono_" + dr("NombreOperador").ToString() + ".png")
                        Dim fs_Icono As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs_Icono.Write(icono, 0, icono.Length)
                        fs_Icono.Flush()
                        fs_Icono.Close()
                        rutaIcono = "../Common/Images/icono_" + dr("NombreOperador").ToString() + ".png"
                    Catch ex As Exception
                        rutaLogo = ""
                        rutaIcono = ""
                    End Try
                    Resultado = Resultado + "{ IdCampana: '" + dr("IdCampana").ToString() +
                        "', CodigoCampana: '" + dr("CodigoCampana").ToString() +
                        "', IdOperador: '" + dr("IdOperador").ToString() +
                        "', NombreOperador: '" + dr("NombreOperador").ToString() +
                        "', NombreCampana: '" + dr("NombreCampana").ToString() +
                        "', RutaLogo: '" + rutaLogo +
                        "', RutaIcono: '" + rutaIcono +
                        "' },"
                Next
                Resultado = Resultado.Substring(0, Resultado.Length - 1)
            End If
            Return Resultado + "]"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarCorreo(ByVal vcCorreo As String) As Integer
        Dim bl_Usuario As BL_SEG_Usuario = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            bl_Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)
            Dim actualizar As Integer = bl_Usuario.ActualizarEmail(oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, vcCorreo)
            If actualizar = 1 Then
                CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Mail = vcCorreo
                CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.Correo = vcCorreo
            End If
            Return actualizar

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If bl_Usuario IsNot Nothing Then
                bl_Usuario.Dispose()
            End If
        End Try
    End Function

End Class