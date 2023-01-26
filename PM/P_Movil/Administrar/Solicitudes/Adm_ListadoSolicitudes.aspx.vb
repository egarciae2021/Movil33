Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports UtilitarioWeb
Imports System.Web.Script.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Adm_ListadoSolicitudes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Entidad As BL_ENT_Entidad = Nothing
        Dim Modulo As BL_PRO_Modulo = Nothing
        Dim BLOrganizacionG As BL_GEN_OrganizacionG = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim vcTab As String = "MOV_Solicitud"
                Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                Dim inTip As Integer = Val("" & Request.QueryString("inTip"))
                Entidad = New BL_ENT_Entidad(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oEntidad As ENT_ENT_Entidad

                hdfSolicitudesMultipleEspecialista.Value = Session("SolicitudesMultipleEspecialista")
                hdfDiaActual.Value = Date.Now.ToString("yyMMdd")
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)


                    'EDGAR GARCIA 11112022 MODULO SOLICITUDES -NOTAS
                    'Edgar Garcia 02122022 correccion multiple perfil
                    Dim sum As Integer
                    Dim btIns As Integer
                    Dim btAct As Integer
                    Dim btEli As Integer
                    Dim btExp As Integer
                    Dim btImp As Integer
                    hdfinsertar.Value = 0
                    hdfactivar.Value = 0
                    hdfeliminar.Value = 0
                    hdfexportar.Value = 0
                    hdfimportar.Value = 0
                    For Each item As ENT_SEG_Perfil In oUsuario.Perfiles
                        sum = 0
                        btIns = 0
                        btAct = 0
                        btEli = 0
                        btExp = 0
                        btImp = 0
                        If item.P_inCod <> 42 Then
                            btIns = Convert.ToInt32(item.btIns)
                            btAct = Convert.ToInt32(item.btAct)
                            btEli = Convert.ToInt32(item.btEli)
                            btExp = Convert.ToInt32(item.btExp)
                            btImp = Convert.ToInt32(item.btImp)
                            sum = btIns + btAct + btEli + btExp + btImp
                            If (sum > 0) Then
                                hdfinsertar.Value = btIns
                                hdfactivar.Value = btAct
                                hdfeliminar.Value = btEli
                                hdfexportar.Value = btExp
                                hdfimportar.Value = btImp
                            End If
                        End If

                    Next



                    hdfTituloValeResguardo.Value = "" & ConfigurationManager.AppSettings("TituloValeResguardo")
                    Modulo = New BL_PRO_Modulo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim eModulo As ENT_PRO_Modulo = Modulo.ObtenerModuloXvcTab(inCod, vcTab)

                    oEntidad = Entidad.Mostrar(vcTab, oUsuario.P_inCod)

                    'este boton será visible o no de acuerdo a lo configurado en el config, ya que en algunos clientes por pais no desean visualizar este boton. 
                    Dim MostrarConstanciaEntrega As Integer = Convert.ToInt32(If(ConfigurationManager.AppSettings("MostrarConstanciaEntrega") IsNot Nothing, ConfigurationManager.AppSettings("MostrarConstanciaEntrega").ToString(), "0"))
                    If (MostrarConstanciaEntrega = 1) Then
                        btnValeResguardo.Visible = True
                    Else
                        btnValeResguardo.Visible = False
                    End If

                    Dim MostrarOrdenServicio As Integer = Convert.ToInt32(If(ConfigurationManager.AppSettings("MostrarOrdenServicio") IsNot Nothing, ConfigurationManager.AppSettings("MostrarOrdenServicio").ToString(), "1"))
                    If (MostrarConstanciaEntrega = 1) Then
                        btnOrdenServicio.Visible = True
                        hdfMostrarOrdenServicio.Value = "1"

                    Else
                        btnOrdenServicio.Visible = False
                        hdfMostrarOrdenServicio.Value = "0"
                    End If

                    'LICENCIAMIENTO POR MÓDULO
                    hdfLicenciaModulo.Value = ""

                    If ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then

                        Dim CodModulo
                        CodModulo = "C02" 'Se coloca el código de Módulo
                        For i As Integer = 0 To oUsuario.LicenciaListadoModulos.Count - 1
                            If oUsuario.LicenciaListadoModulos.Item(i).CodModulo = Cryptographics.EncryptString(CodModulo) Then
                                If Cryptographics.DecryptString(oUsuario.LicenciaListadoModulos.Item(i).Cantidad) <> "1" Then
                                    hdfLicenciaModulo.Value = "4GVBGsuwXJDBuD3LFODkzQA="
                                End If
                            End If
                        Next

                    End If

                    'Registra auditoria...
                    Dim oAuditoria As New ProcesaAuditoria
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                    oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
                    oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.ListarSolicitud
                    oAuditoria.NombreUsuario = oUsuario.vcUsu

                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = Constantes.TableNames.Usuario
                    oAuditoria.Acceso()

                    Dim idLicencia As String
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    hdfvcTab.Value = Request.QueryString("vcTab")
                    If Not IsNothing(Request.QueryString("isAccessAdd")) Then
                        hdfIsAccessAdd.Value = Request.QueryString("isAccessAdd") '"1"
                    End If

                    If Not IsNothing(Request.QueryString("inLic")) Then
                        idLicencia = Request.QueryString("inLic").ToString()
                    Else
                        idLicencia = ""
                    End If

                    If Not IsNothing(Request.QueryString("IdSol")) Then
                        hdfIdSolicitud.Value = Request.QueryString("IdSol")
                        'hdfLicencia.Value = Request.QueryString("vcLic").ToString()
                        If idLicencia = "1" Then
                            hdfLicencia.Value = "BASIC"
                        ElseIf idLicencia = "2" Then
                            hdfLicencia.Value = "PREMIUM"
                        ElseIf idLicencia = "3" Then
                            hdfLicencia.Value = "STANDARD"
                        Else
                            hdfLicencia.Value = ""
                        End If
                    End If

                    If Not IsNothing(Request.QueryString("inFiltro")) Then
                        hdfBusquedaIni.Value = Request.QueryString("inFiltro")
                        chkSolNoVista.Checked = False
                    End If

                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                    If UtilitarioWeb.TipoSolicitud.EsTecnico Or hdfAdmin.Value = "1" Then
                        hdfUsuTipSolCre.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
                        hdfUsuTipSolEdi.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(1)
                        hdfTecnico.Value = "1"
                    Else
                        hdfUsuTipSolCre.Value = "0"
                        hdfUsuTipSolEdi.Value = "0"
                        hdfTecnico.Value = "0"
                    End If
                    If UtilitarioWeb.TipoSolicitud.EsResponsableAprobacion Or hdfAdmin.Value = "1" Then
                        hdfResAprTipSol.Value = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion()
                        hdfResApr.Value = "1"
                    Else
                        hdfResAprTipSol.Value = "0"
                        hdfResApr.Value = "0"
                    End If


                    Dim esResponsableArea As Boolean = TipoSolicitud.EsResponsableAprobacion()
                    If esResponsableArea Then
                        hdfEsResponsableDeArea.Value = "1"
                    Else
                        hdfEsResponsableDeArea.Value = "0"
                    End If

                    'SE AGREGA PARA QUE SOLO SEA VISIBLE APRA EL PERFIL SUPERADMINISTRADOR POR TICKET DE CLIENTE ACTIVACEL.
                    For Each perfil In oUsuario.Perfiles
                        If (perfil.CodigoPerfil = "SUPADM") Then
                            If oUsuario.esJefeArea OrElse oUsuario.F_vcCodInt <> "" Then
                                btnAgregarMasivo.Visible = True
                            Else
                                btnAgregarMasivo.Visible = False
                            End If
                            Exit For
                        Else
                            btnAgregarMasivo.Visible = False
                        End If
                    Next

                    ConfigurarAcciones(oUsuario, inCod, oEntidad, inTip)

                    hdfEsAdministradorSolicitud.Value = "0"
                    hdfEsResponsableTI.Value = "0"
                    hdfEsGestorSolicitudes.Value = "0"
                    For Each oPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                        If oPerfil.CodigoPerfil = "GESSOL" Then
                            hdfEsAdministradorSolicitud.Value = "1"
                            hdfEsResponsableTI.Value = "1"
                            hdfEsGestorSolicitudes.Value = "1"
                        End If
                    Next

                    CargarFiltro(oUsuario)

                    CargarDatosGruposTiposSolicitud(oUsuario)

                    Dim vcTecnicos As String = Session("vcTecnicos")
                    Dim vcResTecTipSol As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnicoResponsable()
                    If vcResTecTipSol = "0" Then hdfTecResSol.Value = "" Else hdfTecResSol.Value = vcResTecTipSol

                    bpTecRes.NombreEntidad = "Técnico"
                    bpTecRes.vcTab = "SEG_Usuario"
                    bpTecRes.TipoOrigen = 0
                    bpTecRes.FuncionPersonalizada = "fnMostrarTecnico"
                    bpTecRes.RutaRaiz = "../../../"
                    bpTecRes.Contenedor = "dvTecRes"
                    bpTecRes.VariableCondicionJQ = "vcConTecResJQ"
                    If vcTecnicos <> "" Then bpTecRes.Condicion = "P_inCod in (" + vcTecnicos + ") and 1 = 1 "


                    'Fecha Hora Servidor
                    Dim vcFechaActual As String = UtilitarioWeb.ObtieneFechaHoraANSIServidor(False)
                    Dim inAnio As Integer = vcFechaActual.Substring(0, 4)
                    Dim inMes As Integer = vcFechaActual.Substring(4, 2)
                    Dim inDia As Integer = vcFechaActual.Substring(6, 2)
                    Dim daFechaIni As New DateTime(inAnio, inMes, inDia)

                    hdfdaFechaIni.Value = daFechaIni.AddMonths(-1).ToString("dd/MM/yyyy")
                    hdfdaFechaFin.Value = DevuelveFechaFormateada(vcFechaActual, "dd/MM/yyyy")
                    'bpTecnicoAsignado.Condicion = "P_inCod in (" + idsTecnicos_TipSol + ")"

                    ''dvFormatos.Controls.Add(ItemOpcion("btnFormatos", "Formatos", "", "MostrarFormatos", "../../../Common/Images/pdf.png", True))
                    ''ulListaFormatos.Controls.Add(ItemReporte("btnFormato_2", "Formato de Asignación", "", "MOV_Linea", "", "aFormato"))
                    ''If hdfEsResponsableTI.Value = "1" OrElse
                    ''    hdfEsGestorSolicitudes.Value = "1" OrElse
                    ''    hdfAdmin.Value = "1" Then
                    ''    ulListaFormatos.Controls.Add(ItemReporte("btnFormato_2", "Orden de Servicio", "", "MOV_Linea", "", "aFormato"))
                    ''End If

                    If hdfEsAdministradorSolicitud.Value = "1" OrElse
                        hdfAdmin.Value = "1" OrElse
                        hdfEsResponsableTI.Value = "1" OrElse
                        hdfEsGestorSolicitudes.Value = "1" Then
                        dvReportes.Controls.Add(ItemOpcion("btnReportes", "Reportes", "", "MostrarReportes", "../../../Common/Images/Sumario/GEN.png", True))
                        ulListaReportes.Controls.Add(ItemReporte("btnReporte_2", "Reporte Solicitudes", "", "MOV_Solicitud", "", "aReporte"))
                        ''ulListaReportes.Controls.Add(ItemReporte("btnReporte_2", "Reporte Orden de Servicio", "", "MOV_Linea", "", "aReporte"))
                    Else
                        dvReportes.Visible = False
                    End If

                    Try
                        BLOrganizacionG = New BL_GEN_OrganizacionG(oUsuario.IdCliente)
                        hdfEsAutorizador.Value = BLOrganizacionG.ValidarEsAutorizadorPorIdEmpleado(oUsuario.Empleado.P_vcCod)
                    Catch ex As Exception
                        hdfEsAutorizador.Value = "0"
                    End Try

                End If

                Dim EsProductoEstandar As String = "" & ConfigurationManager.AppSettings("EsProductoEstandar")
                If EsProductoEstandar = "1" Then
                    tdNoEstandar.Attributes.Add("style", "display:none")
                Else
                    tdNoEstandar.Attributes.Add("style", "display:inline")
                End If

                'QUITADO TEMPORALMENTE, HABRIA QUE VER QUE SE HACE CON ESTE BOTÓN, YA QUE SEGUN SE VERIFICÓ SE DEBERÁ DE DETERMINAR CUANDO SE MOSTRARÁ EL BOTON.
                btnEliminar.Visible = False

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Entidad IsNot Nothing Then Entidad.Dispose()
            If Modulo IsNot Nothing Then Modulo.Dispose()
            If BLOrganizacionG IsNot Nothing Then BLOrganizacionG.Dispose()
        End Try
    End Sub


    Private Sub ConfigurarAcciones(ByVal oUsuario As ENT_SEG_Usuario, ByVal inCod As Integer, ByVal oEntidad As ENT_ENT_Entidad, ByVal inTip As Integer)
        ''Modificado por Mauricio benavides 11/07/2013

        Dim ProductoSeguridad As BL_PRO_Producto = Nothing
        Dim ModuloSeguridad As BL_PRO_Modulo = Nothing
        Dim OpcionSeguridad As BL_PRO_Opcion = Nothing
        Dim ItemSeguridad As BL_PRO_Item = Nothing
        Try

            If inCod = -1000 Then 'todos los permisos para mantenimiento dinámicos de fija
                btnAgregar.Visible = True
            Else
                Select Case inTip
                    Case 1
                        ProductoSeguridad = New BL_PRO_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oProductoSeguridad As New ENT_PRO_Producto
                        oProductoSeguridad = ProductoSeguridad.Mostrar(inCod)
                        ProductoSeguridad.Dispose()
                        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oProductoSeguridad.Perfiles)
                    Case 2
                        ModuloSeguridad = New BL_PRO_Modulo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oModuloSeguridad As New ENT_PRO_Modulo
                        oModuloSeguridad = ModuloSeguridad.Mostrar(oUsuario, inCod)
                        ModuloSeguridad.Dispose()

                        'btnAgregar.Visible = False
                        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oModuloSeguridad.Perfiles)
                    Case 3
                        OpcionSeguridad = New BL_PRO_Opcion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oOpcionSeguridad As New ENT_PRO_Opcion
                        oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod)
                        OpcionSeguridad.Dispose()
                        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles)
                    Case 4
                        ItemSeguridad = New BL_PRO_Item(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oItemSeguridad As New ENT_PRO_Item
                        oItemSeguridad = ItemSeguridad.Mostrar(oUsuario, inCod)
                        ItemSeguridad.Dispose()
                        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oItemSeguridad.Perfiles)
                End Select

                btnAgregar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar And oEntidad.btNue

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ProductoSeguridad IsNot Nothing Then ProductoSeguridad.Dispose()
            If ModuloSeguridad IsNot Nothing Then ModuloSeguridad.Dispose()
            If OpcionSeguridad IsNot Nothing Then OpcionSeguridad.Dispose()
            If ItemSeguridad IsNot Nothing Then ItemSeguridad.Dispose()

        End Try
    End Sub

    Private Function ItemOpcion(ByVal id As String, ByVal titulo As String, ByVal url As String, ByVal EventoClick As String, ByVal URLIcono As String, ByVal visible As Boolean) As Control
        'futuro control
        Dim td As New HtmlTableCell
        Dim div As New HtmlGenericControl("div")
        div.ID = id
        div.Attributes("class") = "btnNormal"
        div.Attributes("runat") = "server"
        div.Attributes("title") = titulo
        div.Attributes("Url") = url
        'div.Attributes("IdOpcion") = IdOpcion
        div.Attributes("click") = EventoClick
        Dim img As New HtmlImage
        img.Src = URLIcono
        img.Width = 16
        img.Height = 16
        td.Visible = visible
        dvFormatos.Controls.Add(td)
        td.Controls.Add(div)
        div.Controls.Add(img)
        Return td
    End Function
    Private Function ItemReporte(ByVal id As String, ByVal descripcion As String, ByVal URL As String, ByVal Tab As String, ByVal URLIcono As String, Clase As String) As Control
        Dim li As New HtmlGenericControl("li")
        Dim a As New HtmlGenericControl("a")

        If Clase = "" Then
            Clase = "aReporte"
        End If

        a.Attributes("idTab") = "Reporte" & id
        a.Attributes("class") = Clase
        a.Attributes("href") = "#"
        a.InnerText = descripcion
        a.Attributes("URL") = URL & "&vcTab=" & Tab
        li.Controls.Add(a)
        Return li
    End Function


    Private Sub CargarFiltro(ByVal oUsuario As ENT_SEG_Usuario)

        Dim dtFiltro As DataTable = New DataTable()
        dtFiltro.Columns.Add("Valor")
        dtFiltro.Columns.Add("Texto")

        dtFiltro.Rows.Add(New Object() {1, "Código"})
        dtFiltro.Rows.Add(New Object() {3, "Empleado"})
        dtFiltro.Rows.Add(New Object() {4, "Estados de Aprobación"})
        dtFiltro.Rows.Add(New Object() {5, "Estados de Proceso"})
        dtFiltro.Rows.Add(New Object() {2, "Rango de Fechas"})
        dtFiltro.Rows.Add(New Object() {6, "Tipo de Solicitud"})
        'dtFiltro.Rows.Add(New Object() {8, "Orden Servicio"})
        'dtFiltro.Rows.Add(New Object() {7, "--Notas Por Revisar--"})

        UtilitarioWeb.Dataddl(ddlFiltro, dtFiltro, "Texto", "Valor")
        Dim dtTipos As DataTable = New DataTable()
        dtTipos.Columns.Add("Valor")
        dtTipos.Columns.Add("Texto")

        ddlTipo.Items.Insert(0, New ListItem("<Todos>", "0"))
        For i As Integer = 0 To oUsuario.TipoSolicitudGrupoOrigen.Count - 1
            dtTipos.Rows.Add(New Object() {oUsuario.TipoSolicitudGrupoOrigen(i).F_inTipSol, oUsuario.TipoSolicitudGrupoOrigen(i).vcNomTipSol})
            'ddlTipo.Items.Add(New ListItem(oUsuario.TipoSolicitudGrupoOrigen(i).vcNomTipSol, oUsuario.TipoSolicitudGrupoOrigen(i).F_inTipSol))
        Next

        ddlTipoTec.Items.Insert(0, New ListItem("<Todos>", "0"))
        For i As Integer = 0 To oUsuario.TipoSolicitudTecnico.Count - 1
            ddlTipoTec.Items.Add(New ListItem(oUsuario.TipoSolicitudTecnico(i).vcNomTipSol, oUsuario.TipoSolicitudTecnico(i).F_inTipSol))
            If hdfTecnico.Value = "1" Then
                Dim biExiste As String = "0"
                For j As Integer = 0 To dtTipos.Rows.Count - 1
                    If dtTipos.Rows(j)("Valor").ToString() = oUsuario.TipoSolicitudTecnico(i).F_inTipSol Then biExiste = "1"
                    'If ddlTipo.Items(j).Value = oUsuario.TipoSolicitudTecnico(j).F_inTipSol Then biExiste = "1"
                Next
                'If biExiste = "0" Then ddlTipo.Items.Add(New ListItem(oUsuario.TipoSolicitudTecnico(i).vcNomTipSol, oUsuario.TipoSolicitudTecnico(i).F_inTipSol))
                If biExiste = "0" Then dtTipos.Rows.Add(New Object() {oUsuario.TipoSolicitudTecnico(i).F_inTipSol, oUsuario.TipoSolicitudTecnico(i).vcNomTipSol})
            End If
        Next

        ddlTipoResApr.Items.Insert(0, New ListItem("<Todos>", "0"))
        For i As Integer = 0 To oUsuario.TipoSolicitudAprobacion.Count - 1
            ddlTipoResApr.Items.Add(New ListItem(oUsuario.TipoSolicitudAprobacion(i).vcNomTipSol, oUsuario.TipoSolicitudAprobacion(i).inCodTipSol))
            If hdfResApr.Value = "1" Then
                Dim biExiste As String = "0"
                For j As Integer = 0 To dtTipos.Rows.Count - 1
                    If dtTipos.Rows(j)("Valor").ToString() = oUsuario.TipoSolicitudAprobacion(i).inCodTipSol Then biExiste = "1"
                Next
                If biExiste = "0" Then dtTipos.Rows.Add(New Object() {oUsuario.TipoSolicitudAprobacion(i).inCodTipSol, oUsuario.TipoSolicitudAprobacion(i).vcNomTipSol})
            End If
        Next
        If dtTipos.Rows.Count = 0 Then
            dtTipos.Rows.Add(New Object() {"-1", "Sin permisos"})
        End If

        Dim dvTipOrd As DataView = New DataView(dtTipos)
        dvTipOrd.Sort = "Texto"
        ddlTipo.DataSource = dvTipOrd
        ddlTipo.DataTextField = "Texto"
        ddlTipo.DataValueField = "Valor"
        ddlTipo.DataBind()

        Dim Estado As BL_MOV_Estado = Nothing
        Try

            Estado = New BL_MOV_Estado(oUsuario.IdCliente)
            Dim dtEstados As DataTable = Estado.ListarPorModulo(2, 3)
            Estado.Dispose()
            ddlEstadoApr.Items.Add(New ListItem("<Todos>", "0"))
            ddlEstadoPro.Items.Add(New ListItem("<Todos>", "0"))
            For i As Integer = 0 To dtEstados.Rows.Count - 1
                If dtEstados.Rows(i)("inMod").ToString() = "3" Then
                    If dtEstados.Rows(i)("P_inCod") = "7" Then
                        ddlEstadoPro.Items.Add(New ListItem("Cerrado (Trámite realizado)", dtEstados.Rows(i)("P_inCod")))
                    Else
                        ddlEstadoPro.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                    End If

                Else
                    ddlEstadoApr.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                End If
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Estado IsNot Nothing Then Estado.Dispose()
        End Try

    End Sub

    Private Sub CargarDatosGruposTiposSolicitud(ByVal oUsuario As ENT_SEG_Usuario)

        'Permisos por Grupos de Usuario (1er Nivel de Seguridad)
        Dim vcGruTipSolLee As String = "", vcGruTipSolEdi As String = "", vcGruTipSolEli As String = ""
        For i As Integer = 0 To oUsuario.TipoSolicitudGrupoOrigen.Count - 1
            If oUsuario.TipoSolicitudGrupoOrigen.Item(i).biLeer Then
                vcGruTipSolLee += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
            End If
            If oUsuario.TipoSolicitudGrupoOrigen.Item(i).biEditar Then
                vcGruTipSolEdi += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
            End If
            If oUsuario.TipoSolicitudGrupoOrigen.Item(i).biEliminar Then
                vcGruTipSolEli += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
            End If
        Next

        If vcGruTipSolLee.Length > 0 Then hdfGruTipSol.Value = vcGruTipSolLee.Substring(0, vcGruTipSolLee.Length - 1) Else hdfGruTipSol.Value = "0"
        If vcGruTipSolEdi.Length > 0 Then hdfGruTipSolEdi.Value = vcGruTipSolEdi.Substring(0, vcGruTipSolEdi.Length - 1)
        If vcGruTipSolEli.Length > 0 Then hdfGruTipSolEli.Value = vcGruTipSolEli.Substring(0, vcGruTipSolEli.Length - 1)

    End Sub

    Private Function ObtenerNombreColumnas(ByVal vcVista As String) As List(Of ENT_ENT_Campo)

        Dim lstCampo As List(Of ENT_ENT_Campo) = New List(Of ENT_ENT_Campo)()
        Dim oCampo As ENT_ENT_Campo

        Select Case (vcVista)
            Case "General"
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcCodigo", .vcDes = "Código", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dtFecSol", .vcDes = "Fecha", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_P_vcCODEMP", .vcDes = "Código Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_vcNOMEMP", .vcDes = "Nombre Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomTipSol", .vcDes = "Tipo de Solicitud", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomEstApr", .vcDes = "Estado de Aprobación", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomEstPro", .vcDes = "Estado de Proceso", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUmbral", .vcDes = "Umbral", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "inDiaTra", .vcDes = "Tiempo Transcurrido", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUsuTec", .vcDes = "Especialista Asignado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dcMonto", .vcDes = "Monto", .btVis = True}
                lstCampo.Add(oCampo)

            Case "Pendiente"
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcCodigo", .vcDes = "Código", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dtFecSol", .vcDes = "Fecha", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomTipSol", .vcDes = "Tipo de Solicitud", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomEstApr", .vcDes = "Estado de Aprobación", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomEstPro", .vcDes = "Estado de Proceso", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUmbral", .vcDes = "Umbral", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "inDiaTra", .vcDes = "Tiempo Transcurrido", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUsuTec", .vcDes = "Especialista Asignado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dcMonto", .vcDes = "Monto", .btVis = True}
                lstCampo.Add(oCampo)

            Case "PorAprobar"
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcCodigo", .vcDes = "Código", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dtFecSol", .vcDes = "Fecha", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_P_vcCODEMP", .vcDes = "Código Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_vcNOMEMP", .vcDes = "Nombre Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomTipSol", .vcDes = "Tipo de Solicitud", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUmbral", .vcDes = "Umbral", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "inDiaTra", .vcDes = "Tiempo Transcurrido", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcDiaTraUmb", .vcDes = "Tiempo Por Aprobar", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dcMonto", .vcDes = "Monto", .btVis = True}
                lstCampo.Add(oCampo)

            Case "PorAsignar"
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcCodigo", .vcDes = "Código", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dtFecSol", .vcDes = "Fecha", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_P_vcCODEMP", .vcDes = "Código Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_vcNOMEMP", .vcDes = "Nombre Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomTipSol", .vcDes = "Tipo de Solicitud", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUmbral", .vcDes = "Umbral", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "inDiaTra", .vcDes = "Tiempo Transcurrido", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcDiaTraUmb", .vcDes = "Tiempo Por Asignar", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dcMonto", .vcDes = "Monto", .btVis = True}
                lstCampo.Add(oCampo)

            Case "EnProceso"
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcCodigo", .vcDes = "Código", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dtFecSol", .vcDes = "Fecha", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_P_vcCODEMP", .vcDes = "Código Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EMPL_vcNOMEMP", .vcDes = "Nombre Empleado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcNomTipSol", .vcDes = "Tipo de Solicitud", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcEnOper", .vcDes = "Enviado a operador", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUmbral", .vcDes = "Umbral", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "inDiaTra", .vcDes = "Tiempo Transcurrido", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcUsuTec", .vcDes = "Especialista Asignado", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "vcDiaTraUmb", .vcDes = "Tiempo En Proceso", .btVis = True}
                lstCampo.Add(oCampo)
                oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "dcMonto", .vcDes = "Monto", .btVis = True}
                lstCampo.Add(oCampo)
        End Select

        Return lstCampo

    End Function

    Private Function ConfiguraTablaParaExportacion(ByVal vcVista As String, ByVal dtDetalle As DataTable) As DataTable

        Select Case (vcVista)
            Case "General"
                dtDetalle.Columns.Remove("RowNumber")
                dtDetalle.Columns.Remove("cod")
                dtDetalle.Columns.Remove("P_inCodSol")
                dtDetalle.Columns.Remove("inTipSol")
                dtDetalle.Columns.Remove("biPersonalizado")
                dtDetalle.Columns.Remove("F_inEstSol_Apr")
                dtDetalle.Columns.Remove("F_inEstSol")
                dtDetalle.Columns.Remove("vcTabla")
                dtDetalle.Columns.Remove("inNueNot")
                dtDetalle.Columns.Remove("vcAutDesPDF")
                dtDetalle.Columns.Remove("vcEnOper")
                dtDetalle.Columns.Remove("vcDiaTraUmb")
                dtDetalle.Columns.Remove("biVisOpeHis")
                dtDetalle.Columns.Remove("ValObjDiaApr")
                dtDetalle.Columns.Remove("ValMaxDiaApr")
                dtDetalle.Columns.Remove("ValObjDiaPro")
                dtDetalle.Columns.Remove("ValMaxDiaPro")
                dtDetalle.Columns.Remove("inLineaTipo")

            Case "Pendiente"
                dtDetalle.Columns.Remove("RowNumber")
                dtDetalle.Columns.Remove("cod")
                dtDetalle.Columns.Remove("P_inCodSol")
                dtDetalle.Columns.Remove("inTipSol")
                dtDetalle.Columns.Remove("biPersonalizado")
                dtDetalle.Columns.Remove("F_inEstSol_Apr")
                dtDetalle.Columns.Remove("F_inEstSol")
                dtDetalle.Columns.Remove("EMPL_P_vcCODEMP")
                dtDetalle.Columns.Remove("EMPL_vcNOMEMP")
                'dtDetalle.Columns.Remove("vcUmbral")
                'dtDetalle.Columns.Remove("inDiaTra")
                dtDetalle.Columns.Remove("vcTabla")
                dtDetalle.Columns.Remove("inNueNot")
                dtDetalle.Columns.Remove("vcAutDesPDF")
                dtDetalle.Columns.Remove("vcEnOper")
                dtDetalle.Columns.Remove("vcDiaTraUmb")
                dtDetalle.Columns.Remove("biVisOpeHis")
                dtDetalle.Columns.Remove("ValObjDiaApr")
                dtDetalle.Columns.Remove("ValMaxDiaApr")
                dtDetalle.Columns.Remove("ValObjDiaPro")
                dtDetalle.Columns.Remove("ValMaxDiaPro")
                dtDetalle.Columns.Remove("inLineaTipo")

            Case "PorAprobar"
                dtDetalle.Columns.Remove("RowNumber")
                dtDetalle.Columns.Remove("cod")
                dtDetalle.Columns.Remove("P_inCodSol")
                dtDetalle.Columns.Remove("inTipSol")
                dtDetalle.Columns.Remove("biPersonalizado")
                dtDetalle.Columns.Remove("F_inEstSol_Apr")
                dtDetalle.Columns.Remove("vcNomEstApr")
                dtDetalle.Columns.Remove("F_inEstSol")
                dtDetalle.Columns.Remove("vcNomEstPro")
                dtDetalle.Columns.Remove("vcUsuTec")
                dtDetalle.Columns.Remove("vcTabla")
                dtDetalle.Columns.Remove("inNueNot")
                dtDetalle.Columns.Remove("vcAutDesPDF")
                dtDetalle.Columns.Remove("vcEnOper")
                'dtDetalle.Columns.Remove("vcDiaTraUmb")
                dtDetalle.Columns.Remove("biVisOpeHis")
                dtDetalle.Columns.Remove("ValObjDiaApr")
                dtDetalle.Columns.Remove("ValMaxDiaApr")
                dtDetalle.Columns.Remove("ValObjDiaPro")
                dtDetalle.Columns.Remove("ValMaxDiaPro")
                dtDetalle.Columns.Remove("inLineaTipo")

            Case "PorAsignar"
                dtDetalle.Columns.Remove("RowNumber")
                dtDetalle.Columns.Remove("cod")
                dtDetalle.Columns.Remove("P_inCodSol")
                dtDetalle.Columns.Remove("inTipSol")
                dtDetalle.Columns.Remove("biPersonalizado")
                dtDetalle.Columns.Remove("F_inEstSol_Apr")
                dtDetalle.Columns.Remove("vcNomEstApr")
                dtDetalle.Columns.Remove("F_inEstSol")
                dtDetalle.Columns.Remove("vcNomEstPro")
                dtDetalle.Columns.Remove("vcUsuTec")
                dtDetalle.Columns.Remove("vcTabla")
                dtDetalle.Columns.Remove("inNueNot")
                dtDetalle.Columns.Remove("vcAutDesPDF")
                dtDetalle.Columns.Remove("vcEnOper")
                'dtDetalle.Columns.Remove("vcDiaTraUmb")
                dtDetalle.Columns.Remove("biVisOpeHis")
                dtDetalle.Columns.Remove("ValObjDiaApr")
                dtDetalle.Columns.Remove("ValMaxDiaApr")
                dtDetalle.Columns.Remove("ValObjDiaPro")
                dtDetalle.Columns.Remove("ValMaxDiaPro")
                dtDetalle.Columns.Remove("inLineaTipo")

            Case "EnProceso"
                dtDetalle.Columns.Remove("RowNumber")
                dtDetalle.Columns.Remove("cod")
                dtDetalle.Columns.Remove("P_inCodSol")
                dtDetalle.Columns.Remove("inTipSol")
                dtDetalle.Columns.Remove("biPersonalizado")
                dtDetalle.Columns.Remove("F_inEstSol_Apr")
                dtDetalle.Columns.Remove("vcNomEstApr")
                dtDetalle.Columns.Remove("F_inEstSol")
                dtDetalle.Columns.Remove("vcNomEstPro")
                dtDetalle.Columns.Remove("vcTabla")
                dtDetalle.Columns.Remove("inNueNot")
                dtDetalle.Columns.Remove("vcAutDesPDF")
                'dtDetalle.Columns.Remove("vcEnOper")
                'dtDetalle.Columns.Remove("vcDiaTraUmb")
                dtDetalle.Columns.Remove("biVisOpeHis")
                dtDetalle.Columns.Remove("ValObjDiaApr")
                dtDetalle.Columns.Remove("ValMaxDiaApr")
                dtDetalle.Columns.Remove("ValObjDiaPro")
                dtDetalle.Columns.Remove("ValMaxDiaPro")
                dtDetalle.Columns.Remove("inLineaTipo")

        End Select

        'Agregado Jcamacho (Oculta Código Empleado y Configura nombre de cabeceras de la tabla a exportar)
        dtDetalle = ConfigurarCabeceraTabla(dtDetalle, vcVista)

        Return dtDetalle

    End Function


    Private Function ConfigurarCabeceraTabla(ByVal dtDetalle As DataTable, ByVal vcVista As String) As DataTable
        Dim RemoverColumna As String = String.Empty
        For i As Integer = 0 To dtDetalle.Columns.Count - 1

            Dim Columna As String = dtDetalle.Columns(i).ColumnName.ToString
            Dim Campo As String = ""

            Select Case (Columna)
                Case "EMPL_P_vcCODEMP"
                    'dtDetalle.Columns.Remove(RemoverColumna) '14-01-2015 wapumayta Remover afecata al indice de las columnas
                    RemoverColumna = "EMPL_P_vcCODEMP"
                Case "vcCodigo"
                    Campo = "Código"
                Case "dtFecSol"
                    Campo = "Fecha"
                Case "EMPL_vcNOMEMP"
                    Campo = "Nombre Empleado"
                Case "vcNomTipSol"
                    Campo = "Tipo de Solicitud"
                Case "vcNomEstApr"
                    Campo = "Estado Aprobación"
                Case "vcNomEstPro"
                    Campo = "Estado Proceso"
                Case "vcNomEstPro"
                    Campo = "Estado Proceso"
                Case "vcUmbral"
                    Campo = "Umbral"
                Case "inDiaTra"
                    Campo = "Tiempo Transc."
                Case "vcDiaTraUmb"
                    If (vcVista = "PorAprobar") Then
                        Campo = "Tiempo Por Aprobar"
                    Else
                        Campo = "Tiempo Por Asignar"
                    End If
                Case "vcUsuTec"
                    Campo = "Especialista Asignado"
                Case "dcMonto"
                    Campo = "Monto"
            End Select
            If (Campo <> "") Then
                dtDetalle.Columns(i).ColumnName = Campo
            End If
        Next

        If RemoverColumna <> "" Then dtDetalle.Columns.Remove(RemoverColumna)

        Return dtDetalle


    End Function

    <WebMethod()>
                                                                            <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Listar(ByVal vcTodos As String, ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String,
                                  ByVal strTipos As String, ByVal intFiltro As Integer, ByVal strFiltro As String, ByVal strFiltro2 As String, ByVal inTipFil As String,
                                  ByVal biSolNoVis As String, ByVal vcVista As String, ByVal strRangFechaIni As String, ByVal strRangFechaFin As String,
                                  ByVal vcResAre As String, ByVal inCodTip As Integer, ByVal biNotasPorRevisar As String) As JQGridJsonResponse
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            Dim bVistaPorAutorizar As Boolean = False

            Dim vcCodEmp As String
            If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod
            'If vcTodos = "1" Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

            Dim biSolNoVista As Boolean = False
            If biSolNoVis = "true" Then biSolNoVista = True

            'Orden de Columnas
            If vcOrdCol = "vcNomEstApr" Then vcOrdCol = "vcNomEstApr" '"ESA.vcNom"
            If vcOrdCol = "vcNomEst" Then vcOrdCol = "vcNomEstPro" '"ESP.vcNom"
            If vcOrdCol = "vcUsuTec" Then vcOrdCol = "vcUsuTec" '"USU.vcUsu"
            If vcOrdCol = "dcMonto" Then vcOrdCol = "dcMonto" '"SO.dcMonto"
            If vcOrdCol = "inDiaTra" Then vcOrdCol = "inDiaTra" '"CASE When SO.F_inEstSol_Apr = 33 Then DATEDIFF(Hour,daFechaPorAprobarApr, getdate()) When SO.F_inEstSol_Apr = 34 And SO.F_inEstSol = 6 Then DATEDIFF(Hour,daFechaAprobadaApr, getdate()) When SO.F_inEstSol = 8 Then DATEDIFF(Hour,daFechaEnProcesoPro,getdate()) END "
            If vcOrdCol = "vcDiaTraUmb" Then vcOrdCol = "vcDiaTraUmb" '"CASE When F_inEstSol_Apr = 33 Then DATEDIFF(Minute,daFechaPorAprobarApr,@v_daGetdate) When F_inEstSol_Apr = 34 And F_inEstSol = 6 Then DATEDIFF(Minute,daFechaAprobadaApr,@v_daGetdate) When F_inEstSol = 8 Then DATEDIFF(Minute,daFechaEnProcesoPro,@v_daGetdate) END"

            Dim vcTipSolTec As String = "0"
            Dim vcTipSolRes As String = "0"
            If vcVista = "General" Then
                vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)
                vcTipSolRes = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion()
            End If

            'If vcVista = "PorAprobar" Then vcTipSolRes = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion()
            If vcVista = "PorAsignar" Then vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
            If vcVista = "EnProceso" Then
                vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
            End If
            If vcVista = "PorAutorizar" Then
                vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)
                vcTipSolRes = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion()
                bVistaPorAutorizar = True
            End If

            Dim vcCodIntResp As String = ""
            If oUsuario.CodIntResp = "" And Seguridad.EsAdministrador Then vcCodIntResp = "000" Else vcCodIntResp = oUsuario.CodIntResp

            HttpContext.Current.Session("vcFiltro_MOV_Solicitud") = vcCodEmp & "|" & intFiltro & "|" & strFiltro & "|" & strFiltro2 & "|" & inTipFil & "|" & vcVista & "|" & biSolNoVista & "|" & vcOrdCol _
            & "|" & vcTipOrdCol & "|" & strTipos & "|" & vcCodIntResp & "|" & strRangFechaIni & "|" & strRangFechaFin & "|"

            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim dsDetalle As DataSet = Solicitud.ListarPorFiltro(vcCodEmp, intFiltro, strFiltro, strFiltro2, Convert.ToInt32(inTipFil), vcVista, biSolNoVista, Convert.ToInt32(inPagTam),
                                                                 Convert.ToInt32(inPagAct), vcOrdCol, vcTipOrdCol, oCultura.vcFecCor, oCultura.vcHorCor, strTipos, oUsuario.P_inCod,
                                                                 vcCodIntResp, vcTipSolTec, strRangFechaIni, strRangFechaFin, vcTipSolRes, Convert.ToBoolean(biNotasPorRevisar), inCodTip, bVistaPorAutorizar)

            dsDetalle.Tables(1).Columns.Add("vcTooltip")
            Dim vcToolTipTit As String = ""
            Dim vcToolTipDes As String = ""

            Dim inLen = dsDetalle.Tables(1).Rows.Count
            dsDetalle.Tables(1).Columns("dcMonto").ReadOnly = False
            For i As Integer = 0 To inLen - 1
                Dim dr As DataRow = dsDetalle.Tables(1).Rows(i)
                Dim vcTipoUmbralApro = ""
                Dim vcTipoUmbralProc = ""
                If (dr("MedidaUmbralApr").length > 0) Then
                    vcTipoUmbralApro = dr("MedidaUmbralApr").substring(0, dr("MedidaUmbralApr").length - 1)
                    vcTipoUmbralApro = Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(vcTipoUmbralApro)
                End If
                If (dr("MedidaUmbralProc").length > 0) Then
                    vcTipoUmbralProc = dr("MedidaUmbralProc").substring(0, dr("MedidaUmbralProc").length - 1)
                    vcTipoUmbralProc = Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(vcTipoUmbralProc)
                End If

                If dr("F_inEstSol_Apr") = 33 Then
                    vcToolTipTit = "Umbral De Aprobación"
                    vcToolTipDes = "Umbral Verde:" + "&#009;" + "# " + vcTipoUmbralApro + "s Solicitud <=" + dr(" ValObjDiaApr").ToString() + " " + vcTipoUmbralApro.ToLower() + "(s)" + "&#013;" + "Umbral Ambar:" + "&#009;" + dr("ValObjDiaApr").ToString() + " " + vcTipoUmbralApro.ToLower() + "(s) < # " + vcTipoUmbralApro.ToLower() + "s Solicitud <="
                    vcToolTipDes += dr(" ValObjDiaApr").ToString() + " " + vcTipoUmbralApro.ToLower() + "(s)" + "&#013;" + "Umbral Rojo:" + "&#009;" + "# " + vcTipoUmbralApro.ToLower() + "s Solicitud > " + dr("ValObjDiaApr").ToString() + " " + vcTipoUmbralApro.ToLower() + "(s)"
                ElseIf dr("F_inEstSol_Apr") = 34 AndAlso (dr("F_inEstSol") = 6 Or dr("F_inEstSol") = 8) Then
                    vcToolTipTit = "Umbral De Asignación"
                    vcToolTipDes = "Umbral Verde:" + "&#009;" + "# " + vcTipoUmbralProc + "s Solicitud <=" + dr("ValObjDiaPro").ToString() + " " + vcTipoUmbralProc.ToLower() + "(s)" + "&#013;" + "Umbral Ambar:" + "&#009;" + dr("ValObjDiaPro").ToString() + " " + vcTipoUmbralProc.ToLower() + "(s) < # " + vcTipoUmbralProc.ToLower() + "s Solicitud <="
                    vcToolTipDes += dr("ValMaxDiaPro").ToString() + " " + vcTipoUmbralProc.ToLower() + "(s)" + "&#013;" + "Umbral Rojo:" + "&#009;" + "# " + vcTipoUmbralProc.ToLower() + "s Solicitud > " + dr("ValMaxDiaPro").ToString() + " " + vcTipoUmbralProc.ToLower() + "(s)"
                End If

                dsDetalle.Tables(1).Rows(i)("vcTooltip") = vcToolTipTit + "&#013;" + vcToolTipDes
                'If oCultura.vcCodCul.ToString() = "es-PE" Then
                '    dr("dcMonto") = UtilitarioWeb.DevuelveNumeroFormateado(dr("dcMonto").ToString(), strForNum)
                'Else
                '    dr("dcMonto") = Convert.ToDecimal(dr("dcMonto").ToString())
                'End If

            Next

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerSeguimiento(ByVal inCodSol As String) As List(Of Object)

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim lstObj As New List(Of Object)
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtSeguimiento As DataTable = Solicitud.ListarSeguimiento(Convert.ToInt32(inCodSol), oCultura.vcFecCor, oCultura.vcHorCor)
            Solicitud.Dispose()

            For i As Integer = 0 To dtSeguimiento.Rows.Count - 1
                Dim dict As New Dictionary(Of String, Object)
                dict.Add("IdSolicitudSeguimiento", dtSeguimiento.Rows(i)("IdSolicitudSeguimiento").ToString())
                dict.Add("Fecha", dtSeguimiento.Rows(i)("Fecha").ToString())
                dict.Add("P_inCodSol", dtSeguimiento.Rows(i)("P_inCodSol").ToString())
                dict.Add("EstadoInicial", dtSeguimiento.Rows(i)("EstadoInicial").ToString())
                dict.Add("EstadoFinal", dtSeguimiento.Rows(i)("EstadoFinal").ToString())
                dict.Add("IdUsuario", dtSeguimiento.Rows(i)("IdUsuario").ToString())
                dict.Add("NomUsuario", dtSeguimiento.Rows(i)("NomUsuario").ToString())
                dict.Add("Comentarios", dtSeguimiento.Rows(i)("Comentarios").ToString())
                dict.Add("vcEstadoInicial", dtSeguimiento.Rows(i)("vcEstadoInicial").ToString())
                dict.Add("vcEstadoFinal", dtSeguimiento.Rows(i)("vcEstadoFinal").ToString())
                lstObj.Add(dict)
            Next

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try

        Return lstObj
    End Function

    '<WebMethod()>
    'Public Shared Function ObtenerDetalle(ByVal inCodSol As String) As List(Of Object)
    '    Try
    '        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

    '        Dim Solicitud As BL_MOV_Solicitud = BL_MOV_Solicitud.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim dtSeguimiento As DataTable = Solicitud.ListarDetalle(Convert.ToInt32(inCodSol), oCultura.vcFecCor, oCultura.vcHorCor)

    '        Dim lstObj As New List(Of Object)
    '        For i As Integer = 0 To dtSeguimiento.Rows.Count - 1
    '            Dim dict As New Dictionary(Of String, Object)
    '            dict.Add("IdSolicitudDetalle", dtSeguimiento.Rows(i)("IdSolicitudDetalle").ToString())
    '            dict.Add("IdSolicitud", dtSeguimiento.Rows(i)("IdSolicitud").ToString())
    '            dict.Add("Detalle", dtSeguimiento.Rows(i)("Detalle").ToString())
    '            dict.Add("Fecha", Utilitario.DevuelveFechaFormateada(dtSeguimiento.Rows(i)("Fecha").ToString(), oCultura.vcFecCor))
    '            dict.Add("Hora", dtSeguimiento.Rows(i)("Hora").ToString())
    '            dict.Add("EsTecnico", dtSeguimiento.Rows(i)("EsTecnico").ToString())
    '            dict.Add("RegistradoPor", dtSeguimiento.Rows(i)("RegistradoPor").ToString())
    '            lstObj.Add(dict)
    '        Next

    '        Return lstObj

    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    '<WebMethod()>
    'Public Shared Function RegistrarDetalle(ByVal inCodSol As Integer, ByVal vcDetalle As String) As String
    '    Try
    '        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '        Dim Detalle As BL_MOV_SolicitudDetalle = BL_MOV_SolicitudDetalle.Instance(oUsuario.IdCliente)

    '        Detalle.Insertar(inCodSol, vcDetalle, False, oUsuario.vcUsu)
    '        Return "1"

    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Function CargarEstados(ByVal inTipSol As String) As List(Of Object)

        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim lstObj As New List(Of Object)
        Try
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtEstados As DataTable = (TipoSolicitud.ListarEstadosPersonalizadosPorTipo(Convert.ToInt32(inTipSol))).Tables(0)
            TipoSolicitud.Dispose()

            For i As Integer = 0 To dtEstados.Rows.Count - 1
                Dim dict As New Dictionary(Of String, Object)
                dict.Add("P_inCod", dtEstados.Rows(i)("IdSolicitudTipoEstado").ToString())
                dict.Add("vcNom", dtEstados.Rows(i)("Nombre").ToString())
                lstObj.Add(dict)
            Next

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then TipoSolicitud.Dispose()
        End Try

        Return lstObj
    End Function

    <WebMethod()>
    Public Shared Function AprobarSolicitud(ByVal vcCodSol As String, ByVal vcFecApro As String) As String

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.AprobarSolicitud
            oAuditoria.Tabla = Constantes.TableNames.Solicitud

            'Fecha de aprobacion - 10-03-2014 - wapumayta
            vcFecApro = vcFecApro.Replace("$$$", "'")

            Dim lstSol = vcCodSol.Split(",")
            Dim lstAnt(lstSol.Length) As String

            'AUDITORIA:Actualizar Antes
            For i As Integer = 0 To lstSol.Length - 1
                lstAnt(i) = oAuditoria.AntesActualizar(New String() {lstSol(i)})
            Next

            Solicitud.AprobarSolicitud(vcCodSol, oUsuario.P_inCod, oUsuario.vcUsu, vcFecApro)

            'AUDITORIA:Actualizar Despues
            For i As Integer = 0 To lstSol.Length - 1
                lstAnt(i) = oAuditoria.AntesActualizar(New String() {lstSol(i)})
                oAuditoria.DespuesActualizar(New String() {lstSol(i)}, lstAnt(i))
            Next

            ''FACTURACION
            'Dim Fac_Solicitud As New BL_MOV_FAC_Solicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim oSolicitudFac As New ENT_MOV_FAC_Solicitud
            'Dim dsDatosFac = Solicitud.DatosFacturacionSolicitud(vcCodSol)
            '
            'oSolicitudFac.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            'oSolicitudFac.InTipSol = 1 'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitud
            'oSolicitudFac.DesSolicitud = dsDatosFac.Tables(0).Rows(0)("vcNomTipSol").ToString() 'Descripcion que saldra en el estado de cuenta del usuario
            'oSolicitudFac.IdEmpleado = dsDatosFac.Tables(0).Rows(0)("F_vcCodEmp").ToString()
            'oSolicitudFac.NumCuotas = dsDatosFac.Tables(0).Rows(0)("inNumeroCuotas").ToString() 'Numero de cuotas que se generara el cobro
            'oSolicitudFac.BiCuotasDefinidas = 0 'flag que indica si se va a pagar en cuotas definidas
            'oSolicitudFac.MesesCuotas = "" 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
            'oSolicitudFac.MontoCuota = dsDatosFac.Tables(0).Rows(0)("dcMonto").ToString() 'monto mensual a cobrar en cada cuota
            'oSolicitudFac.FechaSolicitud = dsDatosFac.Tables(0).Rows(0)("FechaActual").ToString() 'fecha actual
            'oSolicitudFac.biPeriodoGracia = dsDatosFac.Tables(0).Rows(0)("PeriodoGracia").ToString() 'flag que indica si tiene periodo de gracia
            'oSolicitudFac.MesesPeriodoGracia = dsDatosFac.Tables(0).Rows(0)("MesesPeriodoGracia").ToString() 'los meses de periodo de gracia
            'oSolicitudFac.biInteres = dsDatosFac.Tables(0).Rows(0)("Interes").ToString() 'flag que indica si hay interes
            'oSolicitudFac.TipoInteres = dsDatosFac.Tables(0).Rows(0)("TipoInteres").ToString()
            'oSolicitudFac.TasaInteres = dsDatosFac.Tables(0).Rows(0)("TasaInteres").ToString()
            'oSolicitudFac.biPagoContado = dsDatosFac.Tables(0).Rows(0)("PagoContado").ToString() 'flag que indica si es pago al contado
            'oSolicitudFac.MesesCuotasDobles = dsDatosFac.Tables(0).Rows(0)("MesesCuotasDobles").ToString() 'meses que se cobra cuotas dobles separados por comas
            'oSolicitudFac.BiCuotasDobles = dsDatosFac.Tables(0).Rows(0)("CuotasDobles").ToString() 'flag que indica si se hace el cobro en cuotas dobles
            '
            'Fac_Solicitud.Insertar_Solicitud(oSolicitudFac)
            'Fac_Solicitud.Dispose()
            ''FIN FACTURACION

            'Solicitud.Dispose()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
        Return "1"
    End Function

    <WebMethod()>
    Public Shared Function RechazarSolicitud(ByVal vcCodSol As String, ByVal vcComentarios As String) As String

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.RechazarSolicitud
            oAuditoria.Tabla = Constantes.TableNames.Solicitud

            Dim lstSol = vcCodSol.Split(",")
            Dim lstAnt(lstSol.Length) As String

            'AUDITORIA:Actualizar Antes
            For i As Integer = 0 To lstSol.Length - 1
                lstAnt(i) = oAuditoria.AntesActualizar(New String() {lstSol(i)})
            Next

            Solicitud.RechazarSolicitud(vcCodSol, vcComentarios, oUsuario.P_inCod, oUsuario.vcUsu)
            'Solicitud.Dispose()

            'AUDITORIA:Actualizar Despues
            For i As Integer = 0 To lstSol.Length - 1
                oAuditoria.DespuesActualizar(New String() {lstSol(i)}, lstAnt(i))
            Next

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try

        Return "1"
    End Function

    <WebMethod()>
    Public Shared Function EliminarSolicitud(ByVal inCodSol As String, ByVal inTipSol As String) As String

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.EliminarSolicitud
            oAuditoria.Tabla = Constantes.TableNames.Solicitud

            Dim vcAntes As String

            'AUDITORIA:Actualizar Antes
            vcAntes = oAuditoria.AntesActualizar(New String() {inCodSol})

            Solicitud.EliminarSolicitud(Convert.ToInt32(inCodSol), Convert.ToInt32(inTipSol))
            'Solicitud.Dispose()

            'AUDITORIA:Actualizar Despues
            oAuditoria.DespuesActualizar(New String() {inCodSol}, vcAntes)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try

        Return "1"
    End Function

    <WebMethod()>
    Public Shared Function AsignarseSolicitud(ByVal vcCodSol As String) As String

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.AsignarseSolicitud
            oAuditoria.Tabla = Constantes.TableNames.Solicitud

            Dim lstSol = vcCodSol.Split(",")
            Dim lstAnt(lstSol.Length) As String

            'AUDITORIA:Actualizar Antes
            For i As Integer = 0 To lstSol.Length - 1
                lstAnt(i) = oAuditoria.AntesActualizar(New String() {lstSol(i)})
            Next

            Solicitud.AsignarseSolicitud(vcCodSol, oUsuario.P_inCod, oUsuario.vcUsu)
            'Solicitud.Dispose()

            'AUDITORIA:Actualizar Despues
            For i As Integer = 0 To lstSol.Length - 1
                oAuditoria.DespuesActualizar(New String() {lstSol(i)}, lstAnt(i))
            Next

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try

        Return "1"
    End Function

    <WebMethod()>
    Public Shared Function ReasignarSolicitudesA(ByVal vcCodSol As String, ByVal inCodTipSol As Integer, ByVal inUsuAsignado As Integer) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim resultado As String = String.Empty
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.AsignarSolicitudA
            oAuditoria.Tabla = Constantes.TableNames.Solicitud

            'AUDITORIA:Actualizar Antes
            'Dim strAntesAsignar As String = oAuditoria.AntesActualizar(New String() {inCodSol})

            'Asignar
            resultado = Solicitud.ReasignarSolicitudesA(vcCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inUsuAsignado)
            'Solicitud.Dispose()
            'AUDITORIA:Actualizar Despues
            'oAuditoria.Tabla = Constantes.TableNames.Solicitud
            'oAuditoria.DespuesActualizar(New String() {resultado}, strAntesAsignar)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
        Return resultado
    End Function

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim vcCodEmp As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(0)
            Dim intFiltro As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(1)
            Dim strFiltro As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(2)
            Dim strFiltro2 As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(3)
            Dim inTipFil As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(4)
            Dim vcVista As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(5)
            Dim biSolNoVista As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(6)
            Dim vcOrdCol As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(7)
            Dim vcTipOrdCol As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(8)
            Dim strTipos As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(9)
            Dim vcCodIntResp As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(10)
            Dim strRangFechaIni As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(11)
            Dim strRangFechaFin As String = HttpContext.Current.Session("vcFiltro_MOV_Solicitud").ToString().Split("|")(12)

            Dim vcTipSolTec As String = "0"
            Dim vcTipSolRes As String = "0"
            If vcVista = "General" Then
                vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)
                vcTipSolRes = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion()
            End If

            If vcVista = "PorAsignar" Then vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
            If vcVista = "EnProceso" Then
                vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
            End If

            Dim dsDetalle As DataSet = Solicitud.ListarPorFiltro(vcCodEmp, Convert.ToInt32(intFiltro), strFiltro, strFiltro2, Convert.ToInt32(inTipFil), vcVista, Convert.ToBoolean(biSolNoVista),
                                                                 0, 1, vcOrdCol, vcTipOrdCol, oCultura.vcFecCor, oCultura.vcHorCor, strTipos, oUsuario.P_inCod, vcCodIntResp, vcTipSolTec,
                                                                 strRangFechaIni, strRangFechaFin, vcTipSolRes, False)
            'Solicitud.Dispose()

            Dim lstCampo As List(Of ENT_ENT_Campo) = ObtenerNombreColumnas(vcVista)
            Dim dtExcel As DataTable = ConfiguraTablaParaExportacion(vcVista, dsDetalle.Tables(1))


            'Agregado Jcamacho

            eegSolicitudes.ExportarDatos(dtExcel, "Solicitudes", lstCampo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = ""
        For p As Integer = 0 To oUsuario.Perfiles.Count - 1
            If (vcPerfiles = "") Then
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            Else
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            End If
        Next
        '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
            vcPerfil = "0"
        ElseIf vcPerfiles <> "" Then
            vcPerfil = vcPerfiles.ToString()
        End If

        Return vcPerfil

    End Function

    Protected Sub hdfIsAccessAdd_ValueChanged(sender As Object, e As EventArgs) Handles hdfIsAccessAdd.ValueChanged

    End Sub


    <WebMethod()>
    Public Shared Function ObtenerDatosOS(IdTipoSolicitud As String) As List(Of Object)
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim lstObj As New List(Of Object)
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtCabecera As DataTable = (Solicitud.Formato_OrdenServicio(IdTipoSolicitud, "-1")).Tables(0)
            'Solicitud.Dispose()

            Dim dict As Dictionary(Of String, Object)

            For i As Integer = 0 To dtCabecera.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtCabecera.Columns
                    dict.Add(Columna.ColumnName, dtCabecera.Rows(i)(Columna.ColumnName).ToString())
                Next
                lstObj.Add(dict)
            Next

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try

        Return lstObj
    End Function

    <WebMethod()>
    Public Shared Function GuardarDatosOS(CodigoOS As String, TipoOS As String, TipoMovimiento As String, _
                                          Descripcion As String, FechaInicio As String, HoraInicioOS As String, _
                                          IdSolicitudes As String, OrigenSolicitud As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim IdOrden As String = String.Empty
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            IdOrden = Solicitud.Guardar_OrdenServicio(CodigoOS, TipoOS, TipoMovimiento, Descripcion,
                                                                    FechaInicio, IdSolicitudes, OrigenSolicitud, HoraInicioOS, "", "")
            'Solicitud.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
        Return IdOrden
    End Function



    <WebMethod()>
    Public Shared Function procesarSolicitudes(ByVal tipo As String, ids As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim Resultado As String = String.Empty
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Resultado = Solicitud.GrabarSolicitudMasiva(oUsuario.P_inCod, tipo, ids)
            Solicitud.Dispose()
            ''Dim lstObj As New List(Of Object)
            ''For i As Integer = 0 To dtEstados.Rows.Count - 1
            ''    Dim dict As New Dictionary(Of String, Object)
            ''    dict.Add("P_inCod", dtEstados.Rows(i)("IdSolicitudTipoEstado").ToString())
            ''    dict.Add("vcNom", dtEstados.Rows(i)("Nombre").ToString())
            ''    lstObj.Add(dict)
            ''Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
        Return Resultado
    End Function


End Class
