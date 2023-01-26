Imports System.Drawing
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.LibreriaJQ
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports UtilitarioWeb
Imports System.Web.Configuration
Imports VisualSoft.PCSistelMovil.ConfigDom.BL
Imports VisualSoft.PCSistel.Utilitarios
Imports BLL
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class Site
    Inherits System.Web.UI.MasterPage

    ' ========================================================================================================
    ' LOAD 
    ' ========================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Dim strUsuario As Object = Request.Form("username")
        'Dim strPassword As String = Request.Form("password")
        'If strUsuario IsNot Nothing AndAlso strUsuario <> "" Then
        '    ValidaAutenticacionTest(strUsuario, strPassword)
        'End If
        Dim Producto As BL_PRO_Producto = Nothing
        Dim Modulo As BL_PRO_Modulo = Nothing
        Dim Opcion As BL_PRO_Opcion = Nothing
        Dim Item As BL_PRO_Item = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim Dashboard As BL_DASH_Dashboard = Nothing
        Dim Alertas As BL_Alerta = Nothing
        Dim Concilia As BL_MOV_Concilia = Nothing
        Try

            If IsNothing(Session("Usuario")) Then

                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then

                    'Dim blConfiguracion As New BL_ConfigDom_Configuracion()
                    Dim miUrl As String

                    Using blConfiguracion As New BL_ConfigDom_Configuracion()
                        miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                    End Using

                    Response.Redirect(miUrl)
                    Me.hdfCodigoDominio.Value = String.Empty
                Else
                    Response.Redirect("login.aspx")
                    hdfCodigoDominio.Value = String.Empty
                End If
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If Not IsPostBack Then


                    hfIdUsuario.Value = oUsuario.P_inCod
                    hfNombreUsuario.Value = oUsuario.vcUsu
                    hfDescripcionUsuario.Value = oUsuario.vcNom
                    hfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hfEsResponsableTI.Value = "0"


                    hdfPeriodoConciliacion.Value = ""
                    Concilia = New BL_MOV_Concilia(oUsuario.IdCliente)
                    hdfPeriodoConciliacion.Value = Concilia.ObtenerValidacionConciliacion_Periodo()

                    For Each mPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                        If mPerfil.vcNom = "Responsable de TI" Then
                            hfEsResponsableTI.Value = "1"
                            Exit For
                        End If
                    Next

                    'Session("IdDominio") = "14100"
                    Me.hdfCodigoDominio.Value = Session("IdDominio").ToString()

                    hfTipoUsuario.Value = "usuario"
                    If Seguridad.EsAdministrador() Then
                        hfTipoUsuario.Value = "administrador"
                        xChatImgUsuario.Visible = True
                    Else
                        xChatImgUsuario.Visible = False
                    End If

                    If Seguridad.EsBASIC_BOLSA Then
                        hdfEsAdministradorBolsaBasic.Value = "1"
                    Else
                        hdfEsAdministradorBolsaBasic.Value = "0"
                    End If

                    xChatImgUsuario.Visible = False

                    Dim script As String = ""
                    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

                    Producto = New BL_PRO_Producto(oUsuario.IdCliente)
                    Modulo = New BL_PRO_Modulo(oUsuario.IdCliente)
                    Opcion = New BL_PRO_Opcion(oUsuario.IdCliente)
                    Item = New BL_PRO_Item(oUsuario.IdCliente)
                    Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)
                    Try
                        oUsuario.inCodReg = oUsuario.Regiones(0).P_inCodReg 'Esta region se obtendra de la pagina de regiones
                    Catch ex As Exception
                        oUsuario.inCodReg = 0
                    End Try

                    oUsuario.CaracteristicaUsuario = Usuario.CaracteristicaUsuario(oUsuario)

                    hdfCodEnlace.Value = oUsuario.Empleado.P_vcCod
                    hfTema.Value = oUsuario.CaracteristicaUsuario.vcTem
                    'Licencia()--comentado porque aun no se genera licencia para movil y la fija no esta incorporada
                    'Try
                    '    Dim dt As DataTable = New BLLMejoras().getOpcionesAbogados(Convert.ToInt32(Session("P_CODUSU").ToString()))
                    '    ValidacionPermisos(dt)
                    'Catch ex As Exception
                    'End Try

                    WebTab_DataBinding(Producto.Listar(oUsuario), Modulo.Listar(oUsuario), Opcion.Listar(oUsuario), Item.Listar(oUsuario), oUsuario.P_inCod)

                    'LoginNombre.ToolTip = oUsuario.vcNom
                    lblNombreUsuario.Text = oUsuario.vcNom
                    lblNombreUsuario.ToolTip = oUsuario.vcUsu

                    ' =======================================================================================
                    '  MODULO DE SEGURIDAD
                    ' =======================================================================================
                    'oUsuario.inIntentos = 3
                    'If oUsuario.CaracteristicaUsuario.vcTem = "blitzer" Then
                    '    lblAcceso.Text = "<div id='dvItentos' style='position:absolute;right:160px;width:250px;'><table id='miTablaSeguridad' style='color: white;' border='0' cellpadding='0' cellspacing='0' style= 'z-index:-1;' ><tr><td align='right' style='color: white;'>Último acceso: " & oUsuario.dtFecUltAcceso & "</td></tr>"
                    'Else
                    '    lblAcceso.Text = "<div id='dvItentos' style='position:absolute;right:160px;width:250px;'><table id='miTablaSeguridad' class='ui-datepicker-title' border='0' cellpadding='0' cellspacing='0' style= 'z-index:-1;' ><tr><td align='right' style='color: white;'>Último acceso: " & oUsuario.dtFecUltAcceso & "</td></tr>"
                    'End If
                    Dim vcFilaTitulo = "<tr><td align='right' style='color: white;'>Último acceso</td></tr>"
                    If oUsuario.CaracteristicaUsuario.vcTem = "blitzer" Then
                        lblAcceso.Text = "<div id='dvItentos' style='position:absolute;right:160px;width:160px;'><table id='miTablaSeguridad' style='color: white;' border='0' cellpadding='0' cellspacing='0' style= 'z-index:-1;' >" + vcFilaTitulo + "<tr><td align='right' style='color: white;'>" & oUsuario.dtFecUltAcceso & "</td></tr>"
                    Else
                        lblAcceso.Text = "<div id='dvItentos' style='position:absolute;right:160px;width:160px;'><table id='miTablaSeguridad' class='ui-datepicker-title' border='0' cellpadding='0' cellspacing='0' style= 'z-index:-1;' >" + vcFilaTitulo + "<tr><td align='right' style='color: white;'>" & oUsuario.dtFecUltAcceso & "</td></tr>"
                    End If



                    If oUsuario.inIntentos > 0 Then
                        lblAcceso.Text &= "<tr><td align='right'>Intentos err&oacute;neos: " & oUsuario.inIntentos.ToString() & "</td></tr>"
                    End If
                    'lblAcceso.Text &= "</table></div>"
                    lblAcceso.Text &= "</table><div style='clear:both;'></div><div id='dvTimer'></div style='color: white;'> </div>"
                    ' =======================================================================================
                    ' =======================================================================================

                    'agregado 13-08-2015 wapumayta
                    Dim Dominio As String = String.Empty
                    If Not IsNothing(Session("IdDominio")) Then Dominio = Session("IdDominio").ToString()

                    'imgUsuario.ImageUrl = "~/Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" & oUsuario.P_inCod
                    imgUsuario.ImageUrl = Page.ResolveClientUrl("~/Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" & oUsuario.P_inCod & "&Dominio=" & Dominio) 'modificado 23-09-2013 wapumayta

                    LogoCliente.ImageUrl = "~/Common/Controladores/ImagenDinamica.ashx?Tipo=Cliente&Dominio=" & Dominio

                    Dim Autenticacion As Integer = VisualSoft.Comun.Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))

                    If Autenticacion = 1 Then 'Autenticacion de windows
                        loginEstado.Visible = False
                        tdLoginEstado.Visible = False
                    End If

                    Dashboard = New BL_DASH_Dashboard(oUsuario.IdCliente)

                    Dim nomberDash As String = String.Empty
                    For Each dash As ENT_DASH_Dashboard In Dashboard.listarDashboard(oUsuario.P_inCod)
                        If dash.Elegido Then
                            nomberDash = dash.Nombre
                            Exit For
                        End If
                    Next

                    If nomberDash.Equals(String.Empty) Then
                        nomberDash = "Dashboard Móvil"
                    End If

                    Me.hdfNombreDash.Value = nomberDash

                    script = "var idCliente = " & oUsuario.IdCliente.ToString() & "; "

                    Dim js As New JavaScriptSerializer()
                    Alertas = New BL_Alerta(oUsuario.IdCliente)
                    'En Proceso
                    Dim vcTipSolTec As String = String.Empty
                    vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
                    '------------

                    'JHERRERA 20408
                    '--------------
                    Dim vcCodIntResp As String = ""
                    If oUsuario.CodIntResp = "" And Seguridad.EsAdministrador Then vcCodIntResp = "000" Else vcCodIntResp = oUsuario.CodIntResp

                    Dim vcTipSolTecTod As String = "0"
                    vcTipSolTecTod = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)

                    Dim vcGrupLee As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudGrupo(1)

                    '-----

                    Dim vcCodEmp As String
                    If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

                    script = script + "var misAlertas = " + js.Serialize(Alertas.ObtenerTodasLasAlertas(oUsuario.P_inCod, _
                                                                         UtilitarioWeb.TipoSolicitud.ObtenerTiposPorUsuario(), _
                                                                         UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion(), vcTipSolTec, _
                                                                         vcCodEmp, vcCodIntResp, vcTipSolTecTod, vcGrupLee)) + ";"


                    script = script + "var IdTemporizador = " & oUsuario.Temporizador.IdTemporizador.ToString() & "; "
                    script = script + "var TiempoTemporizador = " & oUsuario.Temporizador.Tiempo.ToString() & "; "
                    script = script + "var ReinciarTemporizador = " & IIf(oUsuario.Temporizador.ReiniciarConAccion, "true", "false") & "; "
                    'script = script + "var miTotalSegTrans = " & oUsuario.Temporizador.GetSegundosTranscurridos.ToString() & "; "
                    'If oCultura.vcCodCul.ToString.ToLower() = "es-co" Or oCultura.vcCodCul.ToString.ToLower() = "es-bo" Then
                    script = script + "var miTotalSegTrans = " & Math.Round(oUsuario.Temporizador.GetSegundosTranscurridos) & "; "
                    'Else
                    'script = script + "var miTotalSegTrans = 1;" '& oUsuario.Temporizador.GetSegundosTranscurridos.ToString() & "; "
                    'End If
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "keys", script, True)

                    ' ============================================================================================================================
                    '  MODULO DE SEGURIDAD - error 1506
                    ' ============================================================================================================================

                    'If oUsuario.btReinicia And oUsuario.EsAdministrador = False Then
                    'If Usuario.Mostrar(oUsuario.P_inCod).btReinicia And oUsuario.EsAdministrador = False Then
                    If Usuario.Mostrar(oUsuario.P_inCod).btReinicia And oUsuario.P_inCod <> 1 Then
                        ' ============================================================================================================================
                        ' SE ACTIVARA EL PANEL DE CAMBIO DE CLAVE DE FORMA OBLIGATORIA, NO PODRA REALIZAR OTRA FUNCIONALIDAD EN EL SISTEMA HASTA QUE CAMBIE
                        hdf_Reiniciar_Clave.Value = "1"
                    End If


                    ' ============================================================================================================================
                    ' ============================================================================================================================


                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

            End If
        Catch ex As Exception
            Try
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            Catch exC As Exception
            End Try
        Finally
            If Producto IsNot Nothing Then Producto.Dispose()
            If Modulo IsNot Nothing Then Modulo.Dispose()
            If Opcion IsNot Nothing Then Opcion.Dispose()
            If Item IsNot Nothing Then Item.Dispose()
            If Dashboard IsNot Nothing Then Dashboard.Dispose()
            If Concilia IsNot Nothing Then Concilia.Dispose()
        End Try
    End Sub

    Private Function BuscarModulo(ByVal inCodPro As Integer, ByVal oModulo As ENT_PRO_Modulo) As Boolean
        If oModulo.F_inProd = inCodPro Then
            Return True
        Else
            Return False
        End If
    End Function

    Private Sub WebTab_DataBinding(ByVal lstProducto As List(Of ENT_PRO_Producto), ByVal lstModulo As List(Of ENT_PRO_Modulo), ByVal lstOpcion As List(Of ENT_PRO_Opcion), ByVal lstItem As List(Of ENT_PRO_Item), Optional ByVal prIdUsuario As Integer = -1)
        Dim VerPnlSolicitud As Boolean = False
        Dim VerPnlIncidencia As Boolean = False
        Dim VerPnlConsumoDetalle As Boolean = False
        Dim VerPnlConsumoResumen As Boolean = False
        Dim Dashboard As BL_DASH_Dashboard = Nothing
        Try
            Dim blTieneDashboard As Boolean = False
            For Each oProducto As ENT_PRO_Producto In lstProducto
                For Each oModulo As ENT_PRO_Modulo In lstModulo
                    If oModulo.F_inProd = oProducto.P_inCod Then
                        If oModulo.vcNom.ToLower.Contains("dashboard") Then
                            blTieneDashboard = True
                            Exit For
                        End If
                    End If
                Next
            Next

            For Each oProducto As ENT_PRO_Producto In lstProducto
                Dim tab As New ContenedorTabJQ
                Dim NumModulos As Integer
                tab.ID = tbPrincipal.ID & "_TabJQ" & oProducto.P_inCod.ToString()
                tab.Titulo = "<div class='divIcoPro' style='position:absolute;'><img style='border:0; top:-10px;' src='" & oProducto.vcURLIco & "' width= '16px' height= '16px' /></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" & oProducto.vcNom
                tab.Title = oProducto.Title
                ConfiguraTab(tab, 95, False, 100)

                tbPrincipal.ContenedoresTabJQ.Add(tab)

                NumModulos = VerificaModulos(lstModulo, oProducto.P_inCod)

                If oProducto.vcURL <> "" And NumModulos = 0 Then
                    Dim ifProducto As New HtmlGenericControl("iframe")
                    ifProducto.Attributes("class") = "ifPrincipal"
                    ifProducto.Attributes("src") = oProducto.vcURL
                    ifProducto.Attributes("frameborder") = "0"
                    ifProducto.Style("margin-bottom") = "-10px"
                    ifProducto.Style("padding") = "0px"

                    tab.ActivoBotonCerrar = True
                    tab.Controls.Add(ifProducto)
                ElseIf NumModulos > 0 Then
                    Dim splitter As New SplitterJQ
                    Dim splitterContI As New PanelSplitter
                    Dim splitterContD As New PanelSplitter

                    splitterContI.Width = New Unit(217, UnitType.Pixel)
                    splitter.ID = tbPrincipal.ID & "_SplitterJQ" & oProducto.P_inCod.ToString()

                    splitter.PanelSplitters.Add(splitterContI)
                    splitter.PanelSplitters.Add(splitterContD)
                    tab.Controls.Add(splitter)

                    splitterContI.CssClass = "splitterPrincipalI"
                    splitterContD.CssClass = "splitterPrincipalD"

                    Dim webItem As New ExploradorWebJQ

                    ConfiguraAccordion(webItem, tab.ID & "_AccordionProd" & oProducto.P_inCod.ToString(), 220, 500)

                    Dim wtItem As New TabJQ
                    ConfiguraWebTab(wtItem, tab.ID & "_Tab" & oProducto.P_inCod.ToString(), 842, 625, oProducto.vcNom, tab.Title)


                    splitterContI.Controls.Add(webItem)
                    splitterContD.Controls.Add(wtItem)

                    If Not blTieneDashboard Then
                        If oProducto.vcURL = "" Then
                            For Each oModulo As ENT_PRO_Modulo In lstModulo
                                If oProducto.P_inCod = oModulo.F_inProd Then
                                    If Not String.IsNullOrEmpty(oModulo.vcURL) Then
                                        Dim Url As String = oModulo.vcURL
                                        Url = Url & IIf(String.IsNullOrEmpty(oModulo.vcTab), "?", "?vcTab=" & oModulo.vcTab & "&")
                                        Url = Url & "inCod=" & oModulo.P_inCod & "&inTip=2" & "&inTipOri=" & oModulo.inTipOri
                                        Dim tabItem As New ContenedorTabJQ
                                        Dim ifProducto As New HtmlGenericControl("iframe")
                                        tabItem.ID = "tbPrincipal_TabJQ" & oProducto.P_inCod & "_AccordionProd" & oProducto.P_inCod & "_Item0_tab"
                                        tabItem.Titulo = oModulo.vcNom
                                        ifProducto.Attributes("class") = "ifContenido"
                                        ifProducto.Attributes("src") = Url
                                        ifProducto.Attributes("width") = "98%"
                                        ifProducto.Attributes("frameborder") = "0"
                                        ifProducto.Attributes("scrolling") = "no"
                                        tabItem.ActivoBotonCerrar = True
                                        tabItem.Controls.Add(ifProducto)
                                        wtItem.ContenedoresTabJQ.Add(tabItem)
                                        Exit For
                                    End If
                                End If
                            Next
                        End If
                    End If

                    If oProducto.vcURL <> "" Then

                        If Seguridad.EsAdministrador() Then
                            If oProducto.vcTab.Contains("Dashboard") Then
                                Dim tabItem As New ContenedorTabJQ
                                Dim ifProducto As New HtmlGenericControl("iframe")
                                tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
                                tabItem.Titulo = oProducto.vcTab

                                ifProducto.Attributes("class") = "ifContenido"
                                If prIdUsuario <> -1 Then
                                    Dim miUrl As String = ""
                                    Dim oBL_DASH_Dashboard As BL_DASH_Dashboard = Nothing
                                    Try
                                        oBL_DASH_Dashboard = New BL_DASH_Dashboard(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                                        miUrl = oBL_DASH_Dashboard.ObtenerURLdash_porIdUsuario(prIdUsuario)
                                    Catch ex As Exception
                                    Finally
                                        If oBL_DASH_Dashboard IsNot Nothing Then oBL_DASH_Dashboard.Dispose()
                                    End Try

                                    If miUrl <> "-1" Then
                                        ifProducto.Attributes("src") = miUrl
                                    Else
                                        ifProducto.Attributes("src") = oProducto.vcURL
                                    End If
                                Else
                                    ifProducto.Attributes("src") = oProducto.vcURL
                                End If
                                ifProducto.Attributes("width") = "98%"
                                ifProducto.Attributes("frameborder") = "0"
                                ifProducto.Attributes("scrolling") = "no"
                                tabItem.ActivoBotonCerrar = True 'IIf(oProducto.vcTab.ToUpper.Contains("V1"), False, True)
                                tabItem.Controls.Add(ifProducto)

                                wtItem.ContenedoresTabJQ.Add(tabItem)
                            Else
                                Dim tabItem As New ContenedorTabJQ
                                Dim ifProducto As New HtmlGenericControl("iframe")
                                tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
                                tabItem.Titulo = oProducto.vcTab

                                ifProducto.Attributes("class") = "ifContenido"
                                ifProducto.Attributes("src") = oProducto.vcURL
                                ifProducto.Attributes("width") = "98%"
                                ifProducto.Attributes("frameborder") = "0"
                                ifProducto.Attributes("scrolling") = "no"
                                tabItem.ActivoBotonCerrar = True
                                tabItem.Controls.Add(ifProducto)

                                wtItem.ContenedoresTabJQ.Add(tabItem)
                            End If

                        Else
                            If oProducto.vcTab.Contains("Dashboard") Then
                                If Not CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod.Trim = "" Then
                                    Dim tabItem As New ContenedorTabJQ
                                    Dim ifProducto As New HtmlGenericControl("iframe")
                                    tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
                                    tabItem.Titulo = oProducto.vcTab
                                    ifProducto.Attributes("class") = "ifContenido"
                                    If prIdUsuario <> -1 Then
                                        Dashboard = New BL_DASH_Dashboard(0)
                                        Dim miUrl As String = Dashboard.ObtenerURLdash_porIdUsuario(prIdUsuario)
                                        If miUrl <> "-1" Then
                                            ifProducto.Attributes("src") = miUrl
                                        Else
                                            ifProducto.Attributes("src") = oProducto.vcURL
                                        End If
                                    Else
                                        ifProducto.Attributes("src") = oProducto.vcURL
                                    End If
                                    ifProducto.Attributes("width") = "98%"
                                    ifProducto.Attributes("frameborder") = "0"
                                    ifProducto.Attributes("scrolling") = "no"
                                    tabItem.ActivoBotonCerrar = True
                                    tabItem.Controls.Add(ifProducto)

                                    wtItem.ContenedoresTabJQ.Add(tabItem)
                                End If
                            Else
                                Dim tabItem As New ContenedorTabJQ
                                Dim ifProducto As New HtmlGenericControl("iframe")
                                tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
                                tabItem.Titulo = oProducto.vcTab

                                ifProducto.Attributes("class") = "ifContenido"
                                ifProducto.Attributes("src") = oProducto.vcURL
                                ifProducto.Attributes("width") = "98%"
                                ifProducto.Attributes("frameborder") = "0"
                                ifProducto.Attributes("scrolling") = "no"

                                tabItem.ActivoBotonCerrar = False
                                tabItem.Controls.Add(ifProducto)

                                wtItem.ContenedoresTabJQ.Add(tabItem)
                            End If
                        End If
                    End If
                    For Each oModulo As ENT_PRO_Modulo In lstModulo
                        If oProducto.P_inCod = oModulo.F_inProd Then
                            Dim ebgItem As New ExploradorWebItem()
                            ebgItem.Texto = oModulo.vcNom
                            ebgItem.Cabecera = True
                            ebgItem.Fondo = True
                            ebgItem.URLIco = oModulo.vcURLIco
                            ebgItem.Title = oModulo.Title
                            If Not String.IsNullOrEmpty(oModulo.vcURL) Then
                                If oModulo.vcURL.ToString().Contains("P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx") Then VerPnlSolicitud = True
                                Dim Url As String = oModulo.vcURL
                                If Not Url.ToLower().Contains("http:") AndAlso Not Url.ToLower().Contains("https:") Then
                                    Url = Url & IIf(String.IsNullOrEmpty(oModulo.vcTab), "?", "?vcTab=" & oModulo.vcTab & "&")
                                    Url = Url & "inCod=" & oModulo.P_inCod & "&inTip=2" & "&inTipOri=" & oModulo.inTipOri
                                End If
                                Dim TituloTab As String = oModulo.vcNom
                                ebgItem.Titulo = TituloTab
                                ebgItem.href = Url
                                ebgItem.Nombre = IIf(String.IsNullOrEmpty(oModulo.vcTab), TituloTab, oModulo.vcTab)
                                ebgItem.Nombre = ebgItem.Nombre.Replace(" ", "_")
                            End If
                            webItem.ExploradorWebItems.Add(ebgItem)

                            For Each oOpcion As ENT_PRO_Opcion In lstOpcion
                                If oModulo.P_inCod = oOpcion.F_inMod Then
                                    Dim ebiItem As New ExploradorWebItem()
                                    ebiItem.Texto = oOpcion.vcNom
                                    ebiItem.URLIco = oOpcion.vcURLIco
                                    ebiItem.Title = oOpcion.Title
                                    If Not String.IsNullOrEmpty(oOpcion.vcURL) Then
                                        If oOpcion.vcURL.ToString().Contains("P_Movil/SolicitudesAtencion/SOA_Adm_Solicitudes.aspx") Then VerPnlIncidencia = True
                                        Dim Url As String = oOpcion.vcURL
                                        If Not Url.ToLower().Contains("http:") AndAlso Not Url.ToLower().Contains("https:") Then
                                            Url = Url & IIf(String.IsNullOrEmpty(oOpcion.vcTab), "?", "?vcTab=" & oOpcion.vcTab & "&")
                                            Url = Url & "inCod=" & oOpcion.P_inCod & "&inTip=3" & "&inTipOri=" & oOpcion.inTipOri
                                        End If
                                        Dim TituloTab As String = oOpcion.vcNom
                                        ebiItem.Titulo = TituloTab
                                        ebiItem.href = Url
                                        ebiItem.Nombre = IIf(String.IsNullOrEmpty(oOpcion.vcTab), TituloTab, oOpcion.vcTab)
                                        ebiItem.Nombre = ebiItem.Nombre.Replace(" ", "_")
                                    End If
                                    ebgItem.ExploradorWebItems.Add(ebiItem)

                                    For Each oItem As ENT_PRO_Item In lstItem
                                        If oOpcion.P_inCod = oItem.F_inOpc Then
                                            Dim ebiSubItem As New ExploradorWebItem()
                                            ebiSubItem.Texto = oItem.vcNom
                                            ebiSubItem.URLIco = oItem.vcURLIco
                                            ebiSubItem.Title = oItem.Title
                                            If Not String.IsNullOrEmpty(oItem.vcURL) Then
                                                If oItem.vcURL.ToString().Contains("P_Movil/Sumarios/Sum_Navegacion.aspx") Or oItem.vcURL.ToString().Contains("P_Movil/Historico/His_Plantilla.aspx") Or
                                                   oItem.vcURL.ToString().Contains("P_Movil/Consultar/Con_ConsultaPrincipal.aspx") Or oItem.vcURL.ToString().Contains("P_Configuracion/PivotReporte.aspx") Then VerPnlConsumoDetalle = True
                                                Dim Url As String = oItem.vcURL
                                                If Not Url.ToLower().Contains("http:") AndAlso Not Url.ToLower().Contains("https:") Then
                                                    Url = Url & IIf(String.IsNullOrEmpty(oItem.vcTab), "?", "?vcTab=" & oItem.vcTab & "&")
                                                    Url = Url & "inCod=" & oItem.P_inCod & "&inTip=4" & "&inTipOri=" & oItem.inTipOri
                                                End If
                                                Dim TituloTab As String = oItem.vcNom
                                                ebiSubItem.Titulo = TituloTab
                                                ebiSubItem.href = Url
                                                ebiSubItem.Nombre = IIf(String.IsNullOrEmpty(oItem.vcTab), TituloTab, oItem.vcTab)
                                                ebiSubItem.Nombre = ebiSubItem.Nombre.Replace(" ", "_")
                                            End If
                                            ebiItem.ExploradorWebItems.Add(ebiSubItem)
                                        End If
                                    Next
                                End If
                            Next
                        End If
                    Next
                End If
            Next

            'SESSION QUE ME PERMITE MOSTRAR LAS SECCIONES QUE TIENE ACCESO EL USUARIO LOGUEADO EN EL DASHBOARD EMPLEADO - RRAMOS 20151214------------------------------------------
            HttpContext.Current.Session("Ver_Opciones_Dash_Empl") = VerPnlSolicitud & "|" & VerPnlIncidencia & "|" & VerPnlConsumoDetalle & "|" & True
            '----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Catch ex As Exception
            Throw
        Finally
            If Not IsNothing(Dashboard) Then Dashboard.Dispose()
        End Try

    End Sub

    Private Sub ConfiguraAccordion(ByVal Accord As ExploradorWebJQ, ByVal Id As String, ByVal w As Integer, ByVal h As Integer)
        Accord.ID = Id
        Accord.CssClass = "ExploradorWeb"
        Accord.Width = New Unit(w, UnitType.Pixel)
    End Sub

    Private Sub ConfiguraWebTab(ByVal Tab As TabJQ, ByVal Id As String, ByVal w As Integer, ByVal h As Integer, Nombre As String, ByVal title As String)
        Tab.ID = Id
        Tab.ToolTip = title
        Tab.CssClass = "tabschild"
        Tab.Style("margin-top") = "0px"
        Tab.Style("margin-left") = "0px"
        Tab.Style("margin-bottom") = "0px"
        Tab.Style("margin-right") = "0px"
        Tab.Style("padding-top") = "0px"
        Tab.Style("padding-left") = "0px"
        Tab.Style("padding-bottom") = "0px"
        Tab.Style("padding-right") = "0px"


        Dim div2 As New HtmlGenericControl("div")
        div2.ID = "dv_IconoRefresh_" & Id
        div2.Attributes("class") = "Refrescar"
        div2.Attributes("title") = "Volver a cargar página"
        div2.Attributes("width") = "30px"
        div2.Attributes("height") = "20px"

        If Nombre = "Mantenimiento" Then
            div2.Attributes("style") = "height:20px!important;right:30px;top:4px;position:absolute;cursor:hand;cursor:pointer;"
        Else
            div2.Attributes("style") = "height:20px!important;right:30px;top:4px;position:absolute;cursor:hand;cursor:pointer;display:none;"
        End If


        'ImgRefrescar
        Dim img2 As New HtmlImage
        img2.Src = "Common/Images/Mantenimiento/Refresh_22x22.png"
        img2.Alt = Id & "," & Nombre
        img2.Width = 20
        img2.Height = 20
        div2.Controls.Add(img2)

        Dim div As New HtmlGenericControl("div")
        div.ID = "dv_IconoClose_" & Id
        div.Attributes("class") = "CerrarTodosTabs"
        div.Attributes("title") = "Cerrar Tabs"
        div.Attributes("width") = "30px"
        div.Attributes("style") = "height:20px!important;right:5px;top:2px;position:absolute;cursor:hand;cursor:pointer; overflow:hidden;"

        'ImgClose
        Dim img As New HtmlImage
        img.Src = "Common/Images/tab-close.png"
        img.Alt = Id & "," & Nombre
        img.Width = 24
        img.Height = 24

        img.ID = "dv_IconoClose_" & Id
        img.Attributes("title") = "Cerrar Tabs"
        img.Style.Add("float", "right")
        img.Style.Add("margin-top", "-27px")
        img.Style.Add("margin-right", "3px")
        img.Style.Add("cursor", "pointer")
        img.Attributes("class") = "CerrarTodosTabs"

        div.Controls.Add(img)

        '<div class='divIcoPro' style='position:absolute;'><img style='border:0; top:-10px;' src='" & oProducto.vcURLIco & "' width= '16px' height= '16px' /></div>
        Tab.Controls.Add(div2)
        'Tab.Controls.Add(div) 'comentado 06/08/2015 wapumayta (se agrega directamente el control imagen
        Tab.Controls.Add(img)

    End Sub

    Private Sub ConfiguraTab(ByRef tab As ContenedorTabJQ, ByVal h As Integer, ByVal activoCerrar As Boolean, ByVal w As Integer)
        tab.CssClass = "ContenedorTabPrincipal"
        tab.ActivoBotonCerrar = activoCerrar
        'tab.Style("margin-top") = "0px"
        'tab.Style("margin-left") = "0px"
        'tab.Style("margin-bottom") = "0px"
        'tab.Style("margin-right") = "0px"
        'tab.Style("padding-top") = "0px"
        'tab.Style("padding-left") = "0px"
        'tab.Style("padding-bottom") = "0px"
        'tab.Style("padding-right") = "0px"
    End Sub

    Private Function VerificaModulos(ByVal lstModulo As List(Of ENT_PRO_Modulo), ByVal inCodPro As Integer) As Integer
        Dim cont As Integer = 0
        For Each oModulo As ENT_PRO_Modulo In lstModulo
            If oModulo.F_inProd = inCodPro Then
                cont = cont + 1
            End If
        Next
        Return cont
    End Function

    Protected Sub loginEstado_LoggedOut(sender As Object, e As System.EventArgs) Handles loginEstado.LoggedOut
        FormsAuthentication.SignOut()
        'HttpContext.Current.User = New GenericPrincipal(New GenericIdentity(String.Empty), null)
    End Sub

    Private Sub Licencia()
        '********************Componente Licencia************************
        Dim Licencia As New VisualSoft.PCSistel.CompLicencia.BL.CLicencia()

        Dim dtLicencias As New DataTable()
        dtLicencias.Columns.Add("m_blCredito", GetType(Boolean))
        dtLicencias.Columns.Add("m_blInterfaceCentral", GetType(Boolean))
        dtLicencias.Columns.Add("m_blDescuento", GetType(Boolean))
        dtLicencias.Columns.Add("m_blHotelero", GetType(Boolean))
        dtLicencias.Columns.Add("vgInterfaseCTI", GetType(Boolean))
        dtLicencias.Columns.Add("vgClaves", GetType(Boolean))

        Dim m_blCredito As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C01", False)
        Dim m_blInterfaceCentral As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C04", False)
        Dim m_blDescuento As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C06", False)
        Dim m_blHotelero As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C03", False)
        Dim vgInterfaseCTI As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C09", False)
        Dim vgClaves As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C07", False)

        dtLicencias.Rows.Add(m_blCredito, m_blInterfaceCentral, m_blDescuento, m_blHotelero, vgInterfaseCTI, vgClaves)

        Session("dtLicencia") = dtLicencias

        '********************Fin Componente Licencia************************
    End Sub

    Private Sub ValidacionPermisos(dt As DataTable)
        Try
            Dim Validar As Boolean = Convert.ToBoolean(dt.Rows(0)("VALIDA"))
            Dim Ajustes As Boolean = Convert.ToBoolean(dt.Rows(0)("AJUSTES"))
            Dim Reportes As Boolean = Convert.ToBoolean(dt.Rows(0)("REPORTES"))
            Dim Sincronizador As Boolean = Convert.ToBoolean(dt.Rows(0)("SINCRONIZADOR"))
            Dim Abogados As Boolean = Convert.ToBoolean(dt.Rows(0)("VALIDAABOGADO"))
            Dim ListaValida As String = dt.Rows(0)("TIPOLLAMADA").ToString()
            Dim Administrar As Boolean = Convert.ToBoolean(dt.Rows(0)("ADMINISTRADOR"))

            ListaValida = ListaValida.Replace(",", "','")
            ListaValida = (Convert.ToString("'") & ListaValida) + "'"

            Session("ListaAbogados") = ListaValida
            Session("AdminAbogados") = Administrar



            'If Not Validar Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(0).Visible = False
            'End If

            'If Not Ajustes Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(1).Visible = False
            'End If

            'If Not Reportes Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(2).Visible = False
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(3).Visible = False

            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(4).Visible = False
            'End If

            'If Not Sincronizador Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(5).Visible = False
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(6).Visible = False
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(7).Visible = False
            'End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

End Class
