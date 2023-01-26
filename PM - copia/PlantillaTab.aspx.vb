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

Public Class PlantillaTab
    Inherits System.Web.UI.Page

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


        Dim Log As BL_GEN_Log = Nothing
        Log = New BL_GEN_Log(0)

        Try
            Log.GrabarLogLocal("Entro")

            If IsNothing(Session("Usuario")) Then

                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then

                    'Dim blConfiguracion As New BL_ConfigDom_Configuracion()
                    Dim miUrl As String

                    Using blConfiguracion As New BL_ConfigDom_Configuracion()
                        miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                    End Using

                    Response.Redirect(miUrl)
                Else
                    Response.Redirect("login.aspx")
                End If
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If Not IsPostBack Then

                    Log.GrabarLogLocal("IsPostBack")

                    hfIdProducto.Value = "" & Request.QueryString("idp")

                    Try
                        hdfSimbNoPermitidosClaveUsu.Value = CType(Session("Usuario"), ENT_SEG_Usuario).SimbolosNoPermitidosClaveUsuario
                    Catch ex As Exception
                        hdfSimbNoPermitidosClaveUsu.Value = ""
                    End Try

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

                    WebTab_DataBinding(Producto.Listar(oUsuario), Modulo.Listar(oUsuario), Opcion.Listar(oUsuario), Item.Listar(oUsuario), oUsuario.P_inCod)

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

                    script = script + "var TipoNivelTab;"
                    script = script + "var IdPaginaTab;"
                    script = script + "var TituloTab;"
                    script = script + "var URLTab;"

                    Log.GrabarLogLocal("Script parte 1: " + script)

                    Try
                        For Each datos In oUsuario.ConfiguracionUsuario
                            script = script + "TipoNivelTab='" + datos.TipoNivel.ToString() + "'; "
                            script = script + "IdPaginaTab='" + datos.IdPagina.ToString() + "'; "
                            script = script + "TituloTab='" + datos.Titulo.ToString() + "'; "
                            script = script + "URLTab='" + datos.URL.ToString() + "'; "
                        Next
                    Catch ex As Exception

                    End Try

                    Log.GrabarLogLocal("Script parte 2: " + script)

                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "keys", script, True)

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
            Try
                Log.GrabarLogErrorLocal(ex.Message, ex.StackTrace)
            Catch exC As Exception
            End Try
        Finally
            If Producto IsNot Nothing Then Producto.Dispose()
            If Modulo IsNot Nothing Then Modulo.Dispose()
            If Opcion IsNot Nothing Then Opcion.Dispose()
            If Item IsNot Nothing Then Item.Dispose()
            If Dashboard IsNot Nothing Then Dashboard.Dispose()
        End Try

    End Sub

    <WebMethod()>
    Public Shared Function ObtenerTodasLasAlertas() As List(Of ENT_Alerta)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim Alertas = New BL_Alerta(oUsuario.IdCliente)

        Dim vcCodIntResp As String = ""
        If oUsuario.CodIntResp = "" And Seguridad.EsAdministrador Then vcCodIntResp = "000" Else vcCodIntResp = oUsuario.CodIntResp

        Dim vcTipSolTecTod As String = "0"
        vcTipSolTecTod = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)

        Dim vcGrupLee As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudGrupo(1)

        Dim vcTipSolTec As String = String.Empty
        vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)

        Dim vcCodEmp As String
        If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

        Return Alertas.ObtenerTodasLasAlertas(oUsuario.P_inCod,
                UtilitarioWeb.TipoSolicitud.ObtenerTiposPorUsuario(),
                UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion(), vcTipSolTec,
                vcCodEmp, vcCodIntResp, vcTipSolTecTod, vcGrupLee)
    End Function

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
            Dim wtItem As New TabJQ
            ConfiguraWebTab(wtItem, "tbPrincipalProducto", 842, 625, "", "")
            tabProducto.Controls.Add(wtItem)

            ''For Each oProducto As ENT_PRO_Producto In lstProducto
            ''    Dim wtItem As New TabJQ
            ''    ConfiguraWebTab(wtItem, "tbPrincipal" & "_TabJQ" & oProducto.P_inCod.ToString() & "_Tab" &
            ''                    oProducto.P_inCod.ToString(), 842, 625, oProducto.vcNom, oProducto.Title)
            ''    tabProducto.Controls.Add(wtItem)
            ''    Exit For
            ''Next

            For Each oModulo As ENT_PRO_Modulo In lstModulo
                If oModulo.F_inProd = 3 Then
                    If oModulo.vcURL.ToLower.Contains("adm_listadosolicitudes.aspx") Then
                        VerPnlSolicitud = True
                    End If
                    If oModulo.vcNom.ToLower.Contains("incidencias") Then
                        VerPnlIncidencia = True
                    End If
                    If oModulo.vcNom.ToLower.Contains("consumo") Then
                        VerPnlConsumoDetalle = True
                    End If
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

        ''Dim div3 As New HtmlGenericControl("div")
        ''div3.ID = "dv_IconoRefresh_" & Id
        ''div3.Attributes("class") = "Favorito"
        ''div3.Attributes("title") = "Agregar a Favoritos"
        ''div3.Attributes("width") = "30px"
        ''div3.Attributes("height") = "20px"
        ''div3.Attributes("style") = "height:20px!important;right:60px;top:4px;position:absolute;cursor:hand;cursor:pointer;"
        ''Dim img3 As New HtmlImage
        ''img3.Src = "Common/Images/Mantenimiento/favorite-outline_20_0_f89406_none.png"
        ''img3.Alt = Id & "," & Nombre
        ' ''img3.Width = 20
        ' ''img3.Height = 20
        ''div3.Controls.Add(img3)


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
        img2.Attributes("class") = "Refrescar"
        img2.Style.Add("float", "right")
        img2.Style.Add("margin-top", "-34px")
        img2.Style.Add("margin-right", "38px")
        img2.Style.Add("cursor", "pointer")
        img2.Height = 20
        div2.Controls.Add(img2)

        Dim div As New HtmlGenericControl("div")
        div.ID = "dv_IconoClose_" & Id
        div.Attributes("class") = "CerrarTodosTabs"
        div.Attributes("title") = "Cerrar Tabs"
        div.Attributes("width") = "24px"
        div.Attributes("style") = "height:20px!important;right:5px;top:2px;position:absolute;cursor:hand;cursor:pointer; overflow:hidden;"
        Dim img As New HtmlImage
        img.Src = "Common/Images/tab-close.png"
        img.Alt = Id & "," & Nombre
        img.Width = 24
        img.Height = 24
        img.ID = "dv_IconoClose_" & Id
        img.Attributes("title") = "Cerrar Tabs"
        img.Style.Add("float", "right")
        img.Style.Add("margin-top", "-36px")
        img.Style.Add("margin-right", "3px")
        img.Style.Add("cursor", "pointer")
        img.Attributes("class") = "CerrarTodosTabs"
        div.Controls.Add(img)

        ''Tab.Controls.Add(div3)
        Tab.Controls.Add(img2)
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