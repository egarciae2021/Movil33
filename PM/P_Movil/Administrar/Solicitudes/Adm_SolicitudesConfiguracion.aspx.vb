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
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Solicitudes_Adm_SolicitudesConfiguracion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim CaracteristicaTipoDato As BL_MOV_CaracteristicaTipoDato = Nothing
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim TipoLinea As BL_MOV_LineaTipo = Nothing
        Dim Estado As BL_MOV_Estado = Nothing
        Dim TipoSolicitudCategoria As BL_MOV_TipoSolicitud_Categoria = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        'Dim Parametro As BL_MOV_Parametros = Nothing
        'Dim Parametro As BL_MOV_Parametros = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                ttgInfoNombre.Mensaje = "Nombre interno del sistema, no visible al usuario."
                ttgInfoEstado.Mensaje = "Existe una configuración distinta para cada estado (Pendiente, En proceso, Anulada y Culminada)."

                Dim MensajeParametros = "Debe de habilitar por lo menos un parámetro en la pestaña de PARÁMETROS para que pueda ingresar información dinámica."
                ttgInfoParametro.Mensaje = MensajeParametros
                ttgInfoParametro_Apr.Mensaje = MensajeParametros
                ttgInfoParametros_EnvOper.Mensaje = MensajeParametros

                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

                    CaracteristicaTipoDato = New BL_MOV_CaracteristicaTipoDato(oUsuario.IdCliente)
                    TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
                    TipoLinea = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                    Estado = New BL_MOV_Estado(oUsuario.IdCliente)
                    TipoSolicitudCategoria = New BL_MOV_TipoSolicitud_Categoria(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

                    Dim oAuditoria As New ProcesaAuditoria
                    oAuditoria.Usuario = oUsuario

                    Dim vcCodigo = Request.QueryString("Cod")

                    'operador envio
                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(-1, "<Seleccionar>")
                    UtilitarioWeb.Dataddl(ddlOperadorEnvio, lstOperador, "vcNomOpe", "P_inCodOpe")

                    bpTecnicoResponsable.NombreEntidad = "Usuario"
                    bpTecnicoResponsable.vcTab = "SEG_Usuario"
                    bpTecnicoResponsable.TipoOrigen = 0
                    bpTecnicoResponsable.Condicion = "btEst = 1 And P_inCod in (Select F_inUsu From seg_perfilusuario Where F_inPer = 42)"
                    bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos"
                    bpTecnicoResponsable.RutaRaiz = "../../../"
                    bpTecnicoResponsable.Contenedor = "dvContenedorTecRes"
                    bpTecnicoResponsable.TipoLinea = "1"
                    bpTecnicoResponsable.Descripcion = "vcNom"  'ECONDEÑA   16/08/2016

                    bpTecnicoDirecto.NombreEntidad = "Usuario"
                    bpTecnicoDirecto.vcTab = "SEG_Usuario"
                    bpTecnicoDirecto.TipoOrigen = 0
                    bpTecnicoDirecto.Condicion = "btEst = 1 And P_inCod in (Select F_inUsu From seg_perfilusuario Where F_inPer = 42)"
                    bpTecnicoDirecto.FuncionPersonalizada = "fnTecnicoDirecto"
                    bpTecnicoDirecto.RutaRaiz = "../../../"
                    bpTecnicoDirecto.Contenedor = "dvContenedorTecDir"
                    bpTecnicoDirecto.TipoLinea = "1"
                    bpTecnicoDirecto.Descripcion = "vcNom"

                    bpRespUsuario.NombreEntidad = "Usuario"
                    bpRespUsuario.vcTab = "SEG_Usuario"
                    bpRespUsuario.TipoOrigen = 0
                    bpRespUsuario.Condicion = "btEst = 1"
                    bpRespUsuario.FuncionPersonalizada = "fnActualizarUsuarioEspecifico"
                    bpRespUsuario.RutaRaiz = "../../../"
                    bpRespUsuario.Contenedor = "dvContenedorRespUsuario"
                    bpRespUsuario.Codigo = "P_inCod"
                    bpRespUsuario.Descripcion = "vcNom"     'ECONDEÑA   16/08/2016
                    bpRespUsuario.TipoLinea = "1"

                    hdfCodSolSist.Value = ""
                    hdfPersonalizada.Value = "false"
                    hdfSoportaEdicion.Value = "0"

                    'valores de parametros para combos en editar pestaña
                    'Parametro = New BL_MOV_Parametros(oUsuario.IdCliente)
                    'Dim lstParamMensaje As List(Of ENT_MOV_Parametros)
                    'Dim lstParamAdjunto As List(Of ENT_MOV_Parametros)
                    'lstParamMensaje = Parametro.ListarPorGrupo("ValidAdjuntos_Peso")
                    'lstParamAdjunto = Parametro.ListarPorGrupo("ValidMensaje_Count")
                    'UtilitarioWeb.Dataddl(ddlTipoValidMensaje, lstParamMensaje, "Valor", "Clave")
                    'UtilitarioWeb.Dataddl(ddlTamTip_Adj, lstParamAdjunto, "Valor", "Clave")
                    'ddlTipoValidMensaje.Items.Insert(0, New ListItem("Seleccione...", "-1"))
                    'ddlTamTip_Adj.Items.Insert(0, New ListItem("Ninguno", "-1"))

                    Dim vcNomArcCon As String = ""

                    'preguntar si es personalizado
                    Dim biPers As Boolean = True
                    If (Not IsNothing(vcCodigo)) Then
                        hdfCodSolSist.Value = vcCodigo
                        Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
                        Dim dsDetalles As New DataSet
                        dsDetalles = Solicitud.ListarDetalleCaptura(vcCodigo)
                        Solicitud.Dispose()
                        biPers = Convert.ToInt32(dsDetalles.Tables(0).Rows(0)("biPersonalizado"))
                        vcNomArcCon = dsDetalles.Tables(0).Rows(0)("vcNomArchivo_Dec").ToString()
                        oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.EditarTipoSolicitud
                    Else
                        oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.CrearTipoSolicitud
                    End If

                    'Registra auditoria...
                    oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                    oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu

                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = Constantes.TableNames.Usuario
                    oAuditoria.Acceso()

                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    UtilitarioWeb.Dataddl(ddlLineaTipo, TipoLinea.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), "-1", "Seleccionar"), "vcDescripcion", "P_inCod")

                    UtilitarioWeb.Dataddl(ddlCategoria, TipoSolicitudCategoria.Listar("-1", "Seleccionar"), "Descripcion", "IdTipoSolicitud_Categoria")
                    'Tipo de Linea - wapumayta - 02-11-2015
                    Dim General = New General()
                    Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                    If inTipoLinea <> 0 Then
                        ddlLineaTipo.Enabled = False
                        ddlLineaTipo.SelectedValue = inTipoLinea
                        UtilitarioWeb.Dataddl(ddlFinanciamiento, ListarFinanciamiento(inTipoLinea), "DescripcionCorta", "IdTipoFinanciamiento")
                    End If

                    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)
                    hdfCodTipSol.Value = Request.QueryString("Cod")
                    Dim dtEstados As DataTable = Estado.ListarPorModulo(2, 3)

                    ddlEstadoFinReglaApr.Items.Add(New ListItem("<Ninguno>", "-1"))
                    ddlEstadoFinReglaPro.Items.Add(New ListItem("<Ninguno>", "-1"))
                    For i As Integer = 0 To dtEstados.Rows.Count - 1
                        If dtEstados.Rows(i)("inMod").ToString() = "3" Then
                            ddlEstadoProceso.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                            If biPers Or (Not biPers And dtEstados.Rows(i)("P_inCod") <> "7") Then
                                ddlEstadoFinReglaPro.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                            End If
                        Else
                            ddlEstadoAprobacion.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                            ddlEstadoIniReglaApr.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                            ddlEstadoFinReglaApr.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                        End If
                    Next

                    ddlMedidaUmbral.Items.Add(New ListItem("días", "1"))
                    ddlMedidaUmbral.Items.Add(New ListItem("horas", "2"))
                    ddlMedidaUmbral.Items.Add(New ListItem("minutos", "3"))

                    ddlMedidaUmbral2.Items.Add(New ListItem("días", "1"))
                    ddlMedidaUmbral2.Items.Add(New ListItem("horas", "2"))
                    ddlMedidaUmbral2.Items.Add(New ListItem("minutos", "3"))

                    Dim Script As String = ""
                    Dim ds = New DataSet()
                    ''ds = TipoSolicitud.Mostrar(1)
                    ''Dim dtCampos As DataTable = ds.Tables(3)
                    ''For i As Integer = 0 To dtCampos.Rows.Count - 1
                    ''    Script += "$('#ddlCampoTipSolDestino').append($('<option></option>').val('" + dtCampos.Rows(i)("Nombre").ToString() + "').html('" + dtCampos.Rows(i)("Descripcion").ToString() + "'));"
                    ''Next
                    ''If Script <> "" Then
                    ''    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyXYZ", Script, True)
                    ''End If

                    If biPers = False Then
                        hdfPersonalizada.Value = "false"
                        'dvContenido.Style("display") = "none"
                        'dvSolicitudSistema.Style("display") = ""

                        'NUEVO
                        ''ds = New DataSet()
                        ds = TipoSolicitud.Mostrar(Convert.ToInt32(hdfCodTipSol.Value))
                        hdfNumSolicitudes.Value = ds.Tables(0)(0)(0).ToString()
                        MostrarDatos(ds.Tables(1), ds.Tables(2), ds.Tables(3), ds.Tables(4), ds.Tables(5),
                                     ds.Tables(6), ds.Tables(7), ds.Tables(8), ds.Tables(9), ds.Tables(10),
                                     ds.Tables(11), strForNum, ds.Tables(12), ds.Tables(13), ds.Tables(14), ds.Tables(15))


                        Dim dsRefer As DataSet = TipoSolicitud.ListarEntidadReferencia()
                        UtilitarioWeb.Dataddl(ddlEntidadReferenciaDestino, dsRefer.Tables(0), "vcDes", "P_inCod")
                        ddlEntidadReferenciaDestino.Items.Insert(0, New ListItem("Seleccione", "-1"))

                        Dim vcScript As String = String.Empty

                        vcScript += "var Simbolos = ["
                        For Each drSimb In dsRefer.Tables(1).Rows
                            vcScript += "{ Id: '" + drSimb("IdSimboloCondicion").ToString() + "', Simbolo: '" + drSimb("vcSimbolo").ToString()
                            vcScript += "', Descripcion: '" + drSimb("vcDescSimbolo").ToString() + "', vcTipoDato: '" + drSimb("vcTipoDato").ToString() + "'},"
                        Next
                        vcScript = vcScript.Substring(0, vcScript.Length - 1)
                        vcScript += "];"

                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyX", vcScript, True)

                    Else
                        hdfPersonalizada.Value = "true"
                        hdfSoportaEdicion.Value = "1"
                        Dim lstCaracteristicaTipoDato As List(Of ENT_MOV_CaracteristicaTipoDato)

                        'Referencia (Entidad y Símbolos)
                        Dim vcScript As String = String.Empty
                        Dim dsRefer As DataSet = TipoSolicitud.ListarEntidadReferencia()
                        UtilitarioWeb.Dataddl(ddlEntidadReferencia, dsRefer.Tables(0), "vcDes", "P_inCod")
                        ddlEntidadReferencia.Items.Insert(0, New ListItem("Seleccione", "-1"))

                        UtilitarioWeb.Dataddl(ddlEntidadReferenciaDestino, dsRefer.Tables(0), "vcDes", "P_inCod")
                        ddlEntidadReferenciaDestino.Items.Insert(0, New ListItem("Seleccione", "-1"))

                        'Nombre de archivo de condiciones
                        vcScript += "var vcFileName = '" + vcNomArcCon + "';"

                        'Simbolos
                        vcScript += "var Simbolos = ["
                        For Each drSimb In dsRefer.Tables(1).Rows
                            vcScript += "{ Id: '" + drSimb("IdSimboloCondicion").ToString() + "', Simbolo: '" + drSimb("vcSimbolo").ToString()
                            vcScript += "', Descripcion: '" + drSimb("vcDescSimbolo").ToString() + "', vcTipoDato: '" + drSimb("vcTipoDato").ToString() + "'},"
                        Next
                        vcScript = vcScript.Substring(0, vcScript.Length - 1)
                        vcScript += "];"
                        'Fin Referencia 

                        lstCaracteristicaTipoDato = CaracteristicaTipoDato.Listar("S")
                        UtilitarioWeb.Dataddl(ddlTipoDato, lstCaracteristicaTipoDato, "vcNom", "P_inCod")
                        'ddlTipoDato.Items.RemoveAt(8)

                        For Each oCaracteristicaTipoDato As ENT_MOV_CaracteristicaTipoDato In lstCaracteristicaTipoDato
                            hdfTamano.Value = hdfTamano.Value + oCaracteristicaTipoDato.inLon.ToString + ","
                        Next

                        ds = New DataSet()
                        If (Not IsNothing(vcCodigo)) Then
                            ds = TipoSolicitud.Mostrar(Convert.ToInt32(hdfCodTipSol.Value))
                            hdfNumSolicitudes.Value = ds.Tables(0)(0)(0).ToString()
                            hdfSoportaEdicion.Value = ds.Tables(1)(0)("biSoportaEdicion").ToString()

                            MostrarDatos(ds.Tables(1), ds.Tables(2), ds.Tables(3), ds.Tables(4), ds.Tables(5),
                                         ds.Tables(6), ds.Tables(7), ds.Tables(8), ds.Tables(9), ds.Tables(10),
                                         ds.Tables(11), strForNum, ds.Tables(12), ds.Tables(13), ds.Tables(14), ds.Tables(15))
                        Else
                            vcScript = vcScript & "var arTipSol = new Array(); arTipSol.EstadoProceso = []; arTipSol.EstadoAprobacion = []; arTipSol.Parametros = []; "
                            vcScript = CargarParametrosIniciales(vcScript)
                            vcScript = vcScript & "arTipSol.Umbrales = []; arTipSol.Umbrales.Aprobacion = []; arTipSol.Umbrales.Proceso = [];"
                            vcScript = vcScript & "function CampoReferenciaCondicion(IdCondicion, IdSolicitudTipo, IdEntidad, IdCampo, IdCamEnt, IdSimboloCondicion, IdCampoTipSol, TextoCondicion, NombreCampoTipSol, IdCampoRelacion, ValorCampoRelacion, NombreCampoRelacion) {"
                            vcScript = vcScript & "this.IdCondicion = IdCondicion; this.IdCampo = IdCampo; this.IdCamEnt = IdCamEnt; this.NombreCampoTipSol = NombreCampoTipSol; "
                            vcScript = vcScript & "this.IdSimboloCondicion = IdSimboloCondicion; this.IdCampoTipSol = IdCampoTipSol; this.TextoCondicion = TextoCondicion; "
                            vcScript = vcScript & "this.IdCampoRelacion = IdCampoRelacion; this.ValorCampoRelacion = ValorCampoRelacion; this.NombreCampoRelacion = NombreCampoRelacion; "
                            vcScript = vcScript & "this.IdSolicitudTipo = IdSolicitudTipo; this.IdEntidad = IdEntidad; }"
                            vcScript = vcScript & "var lstCondiciones = new Array();var lstCondicionesDestino = new Array();"
                            vcScript = vcScript & "var arDatosEnvOper = [];"

                        End If

                        TipoSolicitud.Dispose()
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", vcScript, True)
                    End If

                    If oUsuario.Empleado.Licencia.ToUpper() = "STANDARD" Or oUsuario.Empleado.Licencia.ToUpper() = "BASIC" Then
                        ddlFinanciamiento.SelectedValue = 0
                        ddlFinanciamiento.Enabled = False
                        trMontoFijo.Visible = False
                        'trCobroDefecto.Visible = False
                        'ddlCobroDefecto.SelectedValue = 0
                        'ddlCobroDefecto.Enabled = False
                    End If


                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If

            If ddlOperadorEnvio.Items.Count = 2 Then
                ddlOperadorEnvio.Enabled = False
                ddlOperadorEnvio.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CaracteristicaTipoDato IsNot Nothing Then
                CaracteristicaTipoDato.Dispose()
            End If
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
            If TipoLinea IsNot Nothing Then
                TipoLinea.Dispose()
            End If
            If Estado IsNot Nothing Then
                Estado.Dispose()
            End If
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
            If Not IsNothing(Operador) Then Operador.Dispose()
        End Try
    End Sub

    Function CargarParametrosIniciales(ByVal strScript) As String
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Parametros As BL_MOV_TipoSolicitud_Parametros = Nothing
        Dim TipoProducto As BL_MOV_FAC_TipoProducto = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Parametros = New BL_MOV_TipoSolicitud_Parametros(oUsuario.IdCliente)
            TipoProducto = New BL_MOV_FAC_TipoProducto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dtParametros As DataTable = Parametros.ListarParametrosBasicos()
            For i As Integer = 0 To dtParametros.Rows.Count - 1
                strScript += "arTipSol.Parametros['" + dtParametros.Rows(i)("Clave").ToString()
                strScript += "'] = { Clave: '" + dtParametros.Rows(i)("Clave").ToString() + "', IdCampo: '" + dtParametros.Rows(i)("Nombre").ToString()
                strScript += "', vcCampo: '" + dtParametros.Rows(i)("Descripcion").ToString() + "', IdParametro: '" + dtParametros.Rows(i)("IdParametro").ToString()
                strScript += "', Elegido: '" + dtParametros.Rows(i)("Elegido").ToString() + "', DescripcionDetalle: '" + dtParametros.Rows(i)("DescripcionDetalle").ToString() + "'}; "
            Next

            rblTipoProducto.DataSource = TipoProducto.Listar()
            rblTipoProducto.DataTextField = "descripcion"
            rblTipoProducto.DataValueField = "idtipoproducto"
            rblTipoProducto.DataBind()
            rblTipoProducto.Visible = True

            'cblTipoProducto.DataSource = TipoProducto.Listar()
            'cblTipoProducto.DataTextField = "Descripcion"
            'cblTipoProducto.DataValueField = "IdTipoProducto"
            'cblTipoProducto.DataBind()
            'cblTipoProducto.Visible = True
            'cblTipoProducto.Enabled = True


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Parametros IsNot Nothing Then Parametros.Dispose()
            If TipoProducto IsNot Nothing Then TipoProducto.Dispose()
        End Try
        Return strScript
    End Function

    Private Sub MostrarDatos(ByVal dtTipoSolicitud As DataTable, ByVal dtEstadoProcesos As DataTable, ByVal dtCampos As DataTable,
                             ByVal dtCamposPorEstadoProceso As DataTable, ByVal dtMensajes As DataTable, ByVal dtParametros As DataTable,
                             ByVal dtEstadosAprobacion As DataTable, ByVal dtEstadoReglas As DataTable, ByVal dtEstadoUmbrales As DataTable,
                             ByVal dtCamposCondicion As DataTable, ByVal dtTipoProducto As DataTable, ByVal strForNum As String,
                             ByVal dtMensajeOperador As DataTable, ByVal dtCamposDestino As DataTable, ByVal dtCamposCondicionDestino As DataTable, ByVal dtCamposPorEstadoMensajeAdjunto As DataTable)
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Try
            Dim vcVarEnter As String = "_;.-.;_"
            Dim vcVarComil As String = "/*--*/"
            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim script As String = ""
            'Tipo de Solicitud
            txtTabla.Text = dtTipoSolicitud.Rows(0)("vcTabla").ToString()

            'Edgar Garcia 06022023 
            TxtDescripcionsol.Text = dtTipoSolicitud.Rows(0)("vcDescripcionSol")


            txtDescripcionTipo.Text = dtTipoSolicitud.Rows(0)("vcDescripcion").ToString()
            ddlLineaTipo.SelectedValue = dtTipoSolicitud.Rows(0)("inLineaTipo").ToString()
            ddlMosBotRef.SelectedValue = dtTipoSolicitud.Rows(0)("btBotRef").ToString() 'JHERRERA 20150310: Nuevo campo
            ddlCategoria.SelectedValue = dtTipoSolicitud.Rows(0)("intCategoria").ToString()
            Me.ddlEscalar.SelectedValue = IIf(dtTipoSolicitud.Rows(0)("biEscalamiento").ToString() = "True", "1", "0")
            Me.ddlEnviarOperador.SelectedValue = IIf(dtTipoSolicitud.Rows(0)("biEnviarOperador").ToString() = "True", "1", "0")

            If (Convert.ToBoolean(dtTipoSolicitud.Rows(0)("biActivo"))) Then
                trActivo.Style("display") = "none"
                chkActivo.Checked = True
            Else
                trActivo.Style("display") = ""
                chkActivo.Checked = False
            End If

            If hdfPersonalizada.Value = "true" Then
                For i As Integer = 0 To dtTipoProducto.Rows.Count - 1
                    rblTipoProducto.Items.Add(New ListItem(dtTipoProducto.Rows(i)("Descripcion").ToString(), dtTipoProducto.Rows(i)("IdTipoProducto").ToString()))
                    If dtTipoProducto.Rows(i)("IdTipoSolicitud").ToString() <> "" Then rblTipoProducto.Items.FindByValue(dtTipoProducto.Rows(i)("IdTipoProducto")).Selected = True
                Next
                cblTipoProducto.Visible = False
                rblTipoProducto.Visible = True
            Else
                For i As Integer = 0 To dtTipoProducto.Rows.Count - 1
                    cblTipoProducto.Items.Add(New ListItem(dtTipoProducto.Rows(i)("Descripcion").ToString(), dtTipoProducto.Rows(i)("IdTipoProducto").ToString()))
                    If dtTipoProducto.Rows(i)("IdTipoSolicitud").ToString() <> "" Then cblTipoProducto.Items.FindByValue(dtTipoProducto.Rows(i)("IdTipoProducto")).Selected = True
                Next
            End If

            Dim lstFinanciamientoTipo As List(Of MOV_CAM_FinanciamientoTipo)
            lstFinanciamientoTipo = FinanciamientoTipo.ListarPorTipoLinea(Convert.ToInt32(ddlLineaTipo.SelectedValue))
            lstFinanciamientoTipo.Insert(0, New MOV_CAM_FinanciamientoTipo With {.IdTipoFinanciamiento = "0", .Descripcion = "<Ninguno>"})
            UtilitarioWeb.Dataddl(ddlFinanciamiento, lstFinanciamientoTipo, "Descripcion", "IdTipoFinanciamiento")

            'If IsDBNull(dtTipoSolicitud.Rows(0)("inTipoFinanciamiento")) Then
            '    ddlFinanciamiento.SelectedValue = "0"
            '    'ddlFraccionamiento.Enabled = False
            '    chkMontoFijo.Enabled = True
            '    txtMonto.Text = "0.00"
            '    'txtMonto.Enabled = False
            '    If (hdfPersonalizada.Value = "true") Then
            '        trMonto.Style("display") = "none"
            '    End If
            'Else
            '    ddlFinanciamiento.SelectedValue = dtTipoSolicitud.Rows(0)("inTipoFinanciamiento").ToString()
            '    trMontoFijo.Style("display") = ""
            '    'trFraccionamiento.Style("display") = ""
            '    If (hdfPersonalizada.Value = "true") Then
            '        trEsDevolucion.Style("display") = ""
            '    End If
            'End If
            '
            ''esDevolucion 14-03-2014 wapumayta
            'If (Convert.ToBoolean(dtTipoSolicitud.Rows(0)("esDevolucion")) = True And Not IsDBNull(dtTipoSolicitud.Rows(0)("inTipoFinanciamiento"))) Then
            '    chkEsDevolucion.Checked = True
            '    trEsDevolucion.Style("display") = ""
            'End If

            If (dtTipoSolicitud.Rows(0)("UsaFinanciamiento") = "False") Then
                chkUsaFinanciamiento.Checked = False
                chkMontoFijo.Enabled = True
                txtMonto.Text = "0.00"
                If (hdfPersonalizada.Value = "true") Then
                    trMonto.Style("display") = "none"
                End If
            Else
                chkUsaFinanciamiento.Checked = True
                trMontoFijo.Style("display") = ""
                'trCobroDefecto.Style("display") = ""
                If (hdfPersonalizada.Value = "true") Then
                    trEsDevolucion.Style("display") = ""
                End If
            End If

            'esDevolucion 14-03-2014 wapumayta
            If (Convert.ToBoolean(dtTipoSolicitud.Rows(0)("esDevolucion")) = True And Not IsDBNull(dtTipoSolicitud.Rows(0)("inTipoFinanciamiento"))) Then
                chkEsDevolucion.Checked = True
                trEsDevolucion.Style("display") = ""
            End If

            Dim valFrac As Integer = 0
            If Not IsDBNull(dtTipoSolicitud.Rows(0)("biFraccionamiento")) And dtTipoSolicitud.Rows(0)("biFraccionamiento") Then
                valFrac = 1
            End If
            'ddlFraccionamiento.SelectedValue = valFrac
            txtMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado(dtTipoSolicitud.Rows(0)("dcMonto").ToString(), strForNum)

            If (Convert.ToBoolean(dtTipoSolicitud.Rows(0)("biMontoFijo")) = True And Not IsDBNull(dtTipoSolicitud.Rows(0)("inTipoFinanciamiento"))) Then
                chkMontoFijo.Checked = True
                trMonto.Style("display") = ""
            End If

            If (Convert.ToBoolean(dtTipoSolicitud.Rows(0)("biUsaDriver")) = True) Then
                chkUsarDriver.Checked = True
            End If
            txtPrefijo.Text = dtTipoSolicitud.Rows(0)("vcPrefijo").ToString()
            'ddlTipoAprobacion.SelectedValue = dtTipoSolicitud.Rows(0)("inTipoAprobacion").ToString()

            If (IsDBNull(dtTipoSolicitud.Rows(0)("biPropie"))) Then
                chkRespPropietario.Checked = False
            Else
                chkRespPropietario.Checked = Convert.ToBoolean(dtTipoSolicitud.Rows(0)("biPropie"))
            End If
            If (IsDBNull(dtTipoSolicitud.Rows(0)("biUsuEsp"))) Then
                chkRespUsuario.Checked = False
                'chkUsuarioEspecificoCorApr.Enabled = False
                'chkUsuarioEspecificoCorPro.Enabled = False
            Else
                chkRespUsuario.Checked = Convert.ToBoolean(dtTipoSolicitud.Rows(0)("biUsuEsp"))
                'chkUsuarioEspecificoCorApr.Enabled = True
                'chkUsuarioEspecificoCorPro.Enabled = True
            End If
            If (IsDBNull(dtTipoSolicitud.Rows(0)("biResAre"))) Then
                chkRespArea.Checked = False
                'chkAreaCorApr.Enabled = False
                'chkAreaCorPro.Enabled = False
            Else
                chkRespArea.Checked = Convert.ToBoolean(dtTipoSolicitud.Rows(0)("biResAre"))
                'chkAreaCorApr.Enabled = True
                'chkAreaCorPro.Enabled = True
            End If
            If (IsDBNull(dtTipoSolicitud.Rows(0)("inTecnicoResponsable"))) Then
                bpTecnicoResponsable.CodigoValor = ""
                hdfTecnicoResponsable_Act.Value = ""
            Else
                bpTecnicoResponsable.CodigoValor = dtTipoSolicitud.Rows(0)("inTecnicoResponsable")
                hdfTecnicoResponsable_Act.Value = dtTipoSolicitud.Rows(0)("inTecnicoResponsable")
            End If

            ''chkUsaFinanciamiento.Checked = IIf(dtTipoSolicitud.Rows(0)("UsaFinanciamiento") = "True", True, False)
            If (IsDBNull(dtTipoSolicitud.Rows(0)("inTecnicoDirecto"))) Then
                bpTecnicoDirecto.CodigoValor = ""
            Else
                bpTecnicoDirecto.CodigoValor = dtTipoSolicitud.Rows(0)("inTecnicoDirecto")
            End If

            bpRespUsuario.CodigoValor = dtTipoSolicitud.Rows(0)("IdRespUsuario").ToString()
            hdIdRespUsuario.Value = dtTipoSolicitud.Rows(0)("IdRespUsuario").ToString()
            'txtUsuarioEspecifico.Text = dtTipoSolicitud.Rows(0)("vcResponsable").ToString()
            'txtUsuarioEspecifico.ToolTip = dtTipoSolicitud.Rows(0)("vcResponsable").ToString()

            ''Roles
            'script += "var vcListaRoles = ["
            'For Each oPerTipSol As ENT_SEG_PerfilTipoSolicitud In lstPerTipSol
            '    script += "{IdRol: '" + oPerTipSol.F_inPer.ToString() + "', NomRol: '" + oPerTipSol.Perfil.vcNom.ToString() + "', chkLeer: '" + oPerTipSol.biLeer.ToString() + "', chkCrear: '"
            '    script += oPerTipSol.biCrear.ToString() + "', chkEditar: '" + oPerTipSol.biEditar.ToString() + "', chkEliminar: '" + oPerTipSol.biEliminar.ToString() + "'},"
            'Next
            'script = script.Substring(0, script.Length - 1)
            'script += "];"

            'Variable de Nombre de archivo de condiciones vacía
            script += "var vcFileName = ''; debugger;"

            'EstadoProcesos
            script += "var arTipSol = new Array(); arTipSol.EstadoProceso = []; arTipSol.EstadoAprobacion = []; arTipSol.Parametros = []; arTipSol.Umbrales = []; "
            script += "arTipSol.Umbrales.Aprobacion = []; arTipSol.Umbrales.Proceso = [];"
            For i As Integer = 0 To dtEstadoProcesos.Rows.Count - 1

                'Dim vcEstadoProceso As String = dtEstadoProcesos.Rows(i)("Nombre").ToString().Replace(" ", "_")
                Dim vcEstadoProceso As String = dtEstadoProcesos.Rows(i)("Nombre").ToString() '.Replace(" ", "_")

                Dim vcEnviaCorreo = "0"
                If Convert.ToBoolean(dtEstadoProcesos.Rows(i)("EnviaCorreo")) = True Then
                    vcEnviaCorreo = "1"
                End If

                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'] = []; "
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Id = '" + dtEstadoProcesos.Rows(i)("IdEstado").ToString() + "';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].EnviarCorreo = '" + vcEnviaCorreo + "';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdMensaje = '0';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Destinatarios = '';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Asunto = '';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Mensaje = '';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Propietario = '0';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].UsuarioEspecifico = '0';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Responsable = '0';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Tecnico = '0';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdRegla = '0';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].ReglaAutomatica = '0';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdEstadoFinal = '';"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Campos = [];"
                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].CamposAdjunto = [];" 'Agregado 23/12/2021

                script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Orden  = '" + dtEstadoProcesos.Rows(i)("Orden").ToString() + "';"

                'Campos Por EstadoProcesos
                For j As Integer = 0 To dtCamposPorEstadoProceso.Rows.Count - 1
                    Dim vcVisible = "0", vcEditable = "0", vcObligatorio = "0"
                    If Convert.ToBoolean(dtCamposPorEstadoProceso.Rows(j)("Visible").ToString()) = True Then
                        vcVisible = "1"
                    End If
                    If Convert.ToBoolean(dtCamposPorEstadoProceso.Rows(j)("Editable").ToString()) = True Then
                        vcEditable = "1"
                    End If
                    If Convert.ToBoolean(dtCamposPorEstadoProceso.Rows(j)("Obligatorio").ToString()) = True Then
                        vcObligatorio = "1"
                    End If

                    If dtEstadoProcesos.Rows(i)("IdEstado").ToString() = dtCamposPorEstadoProceso.Rows(j)("IdEstado").ToString() Then
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Campos['" + dtCamposPorEstadoProceso.Rows(j)("Nombre").ToString() + "'] = {};"
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Campos['" + dtCamposPorEstadoProceso.Rows(j)("Nombre").ToString() + "'] = { Campo: '"
                        script += dtCamposPorEstadoProceso.Rows(j)("Nombre").ToString() + "', Descripcion: '" + dtCamposPorEstadoProceso.Rows(j)("Descripcion").ToString()
                        script += "', Visible: '" + vcVisible + "', Editable: '" + vcEditable + "', Obligatorio: '" + vcObligatorio + "', IdCampo: '" + dtCamposPorEstadoProceso.Rows(j)("IdCampo").ToString() + "'}; "
                    End If
                Next

                'Mensajes Por EstadoProcesos
                For j As Integer = 0 To dtMensajes.Rows.Count - 1
                    If dtEstadoProcesos.Rows(i)("IdEstado").ToString() = dtMensajes.Rows(j)("IdEstado").ToString() Then
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdMensaje = '" + dtMensajes.Rows(j)("IdMensaje").ToString() + "';"
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Destinatarios = '" + dtMensajes.Rows(j)("Destinatarios").ToString() + "';"
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Asunto = '" + dtMensajes.Rows(j)("Asunto").ToString() + "';"
                        'script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Mensaje = '" + dtMensajes.Rows(j)("Mensaje").ToString().Replace(Chr(10), vcVarEnter) + "';"
                        'script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Mensaje = /" + dtMensajes.Rows(j)("Mensaje").ToString().Replace("<", "&lt;").Replace(">", "&gt;") + "/;"
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Mensaje = '" + dtMensajes.Rows(j)("Mensaje").ToString().Replace("<", "&lt;").Replace(">", "&gt;").Replace("'", "&#39;") + "';"
                        If (Convert.ToBoolean(dtMensajes.Rows(j)("Propietario"))) Then
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Propietario = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(j)("UsuarioEspecifico"))) Then
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].UsuarioEspecifico = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(j)("Responsable"))) Then
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Responsable = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(j)("Tecnico"))) Then
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Tecnico = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(j)("Tecnicos"))) Then
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Tecnicos = '1';"
                        End If
                    End If
                Next

                'Campos Por Mensaje Adjunto 23/12/2021
                If dtCamposPorEstadoMensajeAdjunto IsNot Nothing Then
                    For j As Integer = 0 To dtCamposPorEstadoMensajeAdjunto.Rows.Count - 1
                        Dim vcVisible = "0", vcEditable = "0", vcObligatorio = "0"
                        'If Convert.ToBoolean(dtCamposPorEstadoMensajeAdjunto.Rows(j)("Visible").ToString()) = True Then
                        '    vcVisible = "1"
                        'End If
                        If dtCamposPorEstadoMensajeAdjunto.Rows(j)("Visible").ToString() = "1" Then
                            vcVisible = "1"
                        End If

                        If dtEstadoProcesos.Rows(i)("IdEstado").ToString() = dtCamposPorEstadoMensajeAdjunto.Rows(j)("IdEstado").ToString() Then
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].CamposAdjunto['" + dtCamposPorEstadoMensajeAdjunto.Rows(j)("Nombre").ToString() + "'] = {};"
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].CamposAdjunto['" + dtCamposPorEstadoMensajeAdjunto.Rows(j)("Nombre").ToString() + "'] = { Campo: '"
                            script += dtCamposPorEstadoMensajeAdjunto.Rows(j)("Nombre").ToString() + "', Descripcion: '" + dtCamposPorEstadoMensajeAdjunto.Rows(j)("Descripcion").ToString()
                            script += "', Visible: '" + vcVisible + "',  IdCampo: '" + dtCamposPorEstadoMensajeAdjunto.Rows(j)("IdCampo").ToString() + "'}; "
                        End If
                    Next
                End If


                'Reglas por EstadoProcesos
                For h As Integer = 0 To dtEstadoReglas.Rows.Count - 1
                    If dtEstadoProcesos.Rows(i)("IdEstado").ToString() = dtEstadoReglas.Rows(h)("IdEstadoInicial").ToString() Then
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].ReglaAutomatica = '1';"
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdEstadoFinal = '" + dtEstadoReglas.Rows(h)("IdEstadoFinal").ToString() + "';"
                        script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdRegla = '" + dtEstadoReglas.Rows(h)("IdRegla").ToString() + "';"
                    End If
                Next

                'Umbrales por EstadosProcesos
                If (dtEstadoProcesos.Rows(i)("IdEstado").ToString() <> "6") Then
                    Dim EstIni As String = "0"
                    If dtEstadoProcesos.Rows(i)("IdEstado").ToString() = "7" Or dtEstadoProcesos.Rows(i)("IdEstado").ToString() = "7" Then
                        EstIni = "8"
                    Else
                        EstIni = "6"
                    End If
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'] = [];"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Umbral = '0';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].EstadoInicial = '" + EstIni + "';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].EstadoFinal = arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Id;"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].ValorObjetivo = '';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].ValorMaximo = '';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].EnviarCorreo = '0';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Destinatarios = '';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Asunto = '';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Mensaje = '';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].IdUmbral = '0';"
                    script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].MedidaUmbral = '1';"
                End If

                'CAMBIAR DE ESTADO INICIAL A ESTADO FINAL
                For k As Integer = 0 To dtEstadoUmbrales.Rows.Count - 1
                    If dtEstadoProcesos.Rows(i)("IdEstado").ToString() = dtEstadoUmbrales.Rows(k)("EstadoFinal").ToString() Then
                        'script2 += "arTipSol.Umbrales.Aprobacion." + dtEstadosAprobacion.Rows(j)("vcNom") + " [];"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Umbral = '1';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].EstadoInicial = '" + dtEstadoUmbrales.Rows(k)("EstadoInicial").ToString() + "';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].EstadoFinal = '" + dtEstadoUmbrales.Rows(k)("EstadoFinal").ToString() + "';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].ValorObjetivo = '" + dtEstadoUmbrales.Rows(k)("ValorObjetivoDias").ToString() + "';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].ValorMaximo = '" + dtEstadoUmbrales.Rows(k)("ValorMaximoDias").ToString() + "';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].MedidaUmbral = '" + dtEstadoUmbrales.Rows(k)("MedidaUmbral").ToString() + "';"
                        If dtEstadoUmbrales.Rows(k)("Asunto").ToString <> "" Then
                            script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].EnviarCorreo = '1';"
                        End If
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Destinatarios = '" + dtEstadoUmbrales.Rows(k)("Destinatarios") + "';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Asunto = '" + dtEstadoUmbrales.Rows(k)("Asunto") + "';"
                        'script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Mensaje = '" + dtEstadoUmbrales.Rows(k)("Mensaje").Replace("<", "&lt;").Replace(">", "&gt;") + "';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].Mensaje = '" + dtEstadoUmbrales.Rows(k)("Mensaje").ToString().Replace("<", "&lt;").Replace(">", "&gt;").Replace("'", "&#39;") + "';"
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].IdUmbral = '" + dtEstadoUmbrales.Rows(k)("IdUmbral").ToString() + "';"
                        'Edgar Garcia  21112022
                        script += "arTipSol.Umbrales.Proceso['" + vcEstadoProceso + "'].TiempoAntesEnvio = '" + dtEstadoUmbrales.Rows(k)("TiempoAntesEnvio").ToString() + "';"


                    End If
                Next
            Next

            'Parámetros Por Mensaje
            Dim vcScriptParametros As String = ""
            For k As Integer = 0 To dtParametros.Rows.Count - 1
                script += "arTipSol.Parametros['" + dtParametros.Rows(k)("Clave").ToString()
                script += "'] = { Clave: '" + dtParametros.Rows(k)("Clave").ToString() + "', IdCampo: '" + dtParametros.Rows(k)("Nombre").ToString()
                script += "', vcCampo: '" + dtParametros.Rows(k)("Descripcion").ToString() + "', IdParametro: '" + dtParametros.Rows(k)("IdParametro").ToString()
                script += "', Elegido: '" + dtParametros.Rows(k)("Elegido").ToString() + "', DescripcionDetalle: '" + dtParametros.Rows(k)("DescripcionDetalle").ToString() + "'}; "
            Next
            'vcScriptParametros += "fnSortDropDownListByText('ddlParametrosApr'); fnSortDropDownListByText('ddlParametrosPro');"
            script += vcScriptParametros

            ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            Dim script2 = String.Empty
            'Parametros de aprobacion
            For j As Integer = 0 To dtEstadosAprobacion.Rows.Count - 1
                Dim vcNombreEstadoAprobacion As String = dtEstadosAprobacion.Rows(j)("vcNom") '.ToString().Replace(" ", "_")

                Dim EstApr As Integer = Convert.ToInt32(dtEstadosAprobacion.Rows(j)("P_inCod"))
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'] = [];"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Id = '" + EstApr.ToString() + "';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdRegla = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].ReglaAutomatica = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdEstadoFinal = '';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].EnviarCorreo = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Destinatarios = '';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Asunto = '';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Propietario = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].UsuarioEspecifico = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Responsable = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Tecnico = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdMensaje = '0';"
                script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].CamposAdjunto = [];" 'Agregado 23/12/2021

                'Reglas por EstadoAprobacion
                For i As Integer = 0 To dtEstadoReglas.Rows.Count - 1
                    Dim EstReg As Integer = Convert.ToInt32(dtEstadoReglas.Rows(i)("IdEstadoInicial"))
                    If EstApr = EstReg Then
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].ReglaAutomatica = '1';"
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdEstadoFinal = '" + dtEstadoReglas.Rows(i)("IdEstadoFinal").ToString() + "';"
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdRegla = '" + dtEstadoReglas.Rows(i)("IdRegla").ToString() + "';"
                    End If
                Next

                '23/12/2021
                If dtCamposPorEstadoMensajeAdjunto IsNot Nothing Then
                    For k As Integer = 0 To dtCamposPorEstadoMensajeAdjunto.Rows.Count - 1
                        Dim vcVisible = "0", vcEditable = "0", vcObligatorio = "0"
                        'If Convert.ToBoolean(dtCamposPorEstadoMensajeAdjunto.Rows(k)("Visible").ToString()) = True Then
                        '    vcVisible = "1"
                        'End If
                        If dtCamposPorEstadoMensajeAdjunto.Rows(k)("Visible").ToString() = "1" Then
                            vcVisible = "1"
                        End If

                        If dtEstadosAprobacion.Rows(j)("P_inCod").ToString() = dtCamposPorEstadoMensajeAdjunto.Rows(k)("IdEstado").ToString() Then
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].CamposAdjunto['" + dtCamposPorEstadoMensajeAdjunto.Rows(k)("Nombre").ToString() + "'] = {};"
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].CamposAdjunto['" + dtCamposPorEstadoMensajeAdjunto.Rows(k)("Nombre").ToString() + "'] = { Campo: '"
                            script += dtCamposPorEstadoMensajeAdjunto.Rows(k)("Nombre").ToString() + "', Descripcion: '" + dtCamposPorEstadoMensajeAdjunto.Rows(k)("Descripcion").ToString()
                            script += "', Visible: '" + vcVisible + "',  IdCampo: '" + dtCamposPorEstadoMensajeAdjunto.Rows(k)("IdCampo").ToString() + "'}; "
                        End If
                    Next
                End If

                'Mensajes EstadoAprobacion
                For n As Integer = 0 To dtMensajes.Rows.Count - 1
                    Dim IdEstMsj As Integer = Convert.ToInt32(dtMensajes.Rows(n)("IdEstado"))
                    If EstApr = IdEstMsj Then
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].EnviarCorreo = '1';"
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Destinatarios = '" + dtMensajes.Rows(n)("Destinatarios").ToString() + "';"
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Asunto = '" + dtMensajes.Rows(n)("Asunto").ToString() + "';"
                        'script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '" + dtMensajes.Rows(n)("Mensaje").ToString().Replace(Chr(10), vcVarEnter) + "';"
                        'script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '" + dtMensajes.Rows(n)("Mensaje").ToString().Replace("<", "&lt;").Replace(">", "&gt;") + "';"
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '" + dtMensajes.Rows(n)("Mensaje").ToString().Replace("<", "&lt;").Replace(">", "&gt;").Replace("'", "&#39;") + "';"
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdMensaje = '" + dtMensajes.Rows(n)("IdMensaje").ToString() + "';"
                        If (Convert.ToBoolean(dtMensajes.Rows(n)("Propietario"))) Then
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Propietario = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(n)("UsuarioEspecifico"))) Then
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].UsuarioEspecifico = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(n)("Responsable"))) Then
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Responsable = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(n)("Tecnico"))) Then
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Tecnico = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajes.Rows(n)("Tecnicos"))) Then
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Tecnicos = '1';"
                        End If
                    End If
                Next

                'Umbrales por EstadosAprobacion
                If (EstApr = 34 Or EstApr = 35) Then '34=Aprobada, 35=Rechaza
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'] = [];"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Umbral = '0';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].EstadoInicial = '33';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].EstadoFinal = '" + EstApr.ToString() + "';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].ValorObjetivo = '';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].ValorMaximo = '';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].EnviarCorreo = '0';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Destinatarios = '';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Asunto = '';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].IdUmbral = '0';"
                    script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].MedidaUmbral = '1';"

                    'Edgar Garcia Agregar UmbralAnticipadoAprobación 24112022
                    Try
                        Dim exp As String = "EstadoFinal = " + EstApr.ToString()
                        Dim EnvioAnticipado() As DataRow = dtEstadoUmbrales.Select(exp)
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].TiempoAntesEnvio = '" + EnvioAnticipado(0)("TiempoAntesEnvio").ToString() + "';"
                    Catch ex As Exception
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].TiempoAntesEnvio = '0';"
                    End Try


                End If

                For k As Integer = 0 To dtEstadoUmbrales.Rows.Count - 1
                    Dim EstUmb As Integer = Convert.ToInt32(dtEstadoUmbrales.Rows(k)("EstadoFinal"))
                    If EstApr = EstUmb Then
                        'script2 += "arTipSol.Umbrales.Aprobacion." + dtEstadosAprobacion.Rows(j)("vcNom") + " [];"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Umbral = '1';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].EstadoInicial = '" + dtEstadoUmbrales.Rows(k)("EstadoInicial").ToString() + "';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].EstadoFinal = '" + dtEstadoUmbrales.Rows(k)("EstadoFinal").ToString() + "';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].ValorObjetivo = '" + dtEstadoUmbrales.Rows(k)("ValorObjetivoDias").ToString() + "';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].ValorMaximo = '" + dtEstadoUmbrales.Rows(k)("ValorMaximoDias").ToString() + "';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].MedidaUmbral = '" + dtEstadoUmbrales.Rows(k)("MedidaUmbral").ToString() + "';"
                        If dtEstadoUmbrales.Rows(k)("Asunto").ToString() <> "" Then
                            script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].EnviarCorreo = '1';"
                        End If
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Destinatarios = '" + dtEstadoUmbrales.Rows(k)("Destinatarios") + "';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Asunto = '" + dtEstadoUmbrales.Rows(k)("Asunto") + "';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '" + dtEstadoUmbrales.Rows(k)("Mensaje").Replace(Chr(10), vcVarEnter) + "';"
                        script += "arTipSol.Umbrales.Aprobacion['" + vcNombreEstadoAprobacion + "'].IdUmbral = '" + dtEstadoUmbrales.Rows(k)("IdUmbral").ToString() + "';"
                    End If
                Next
            Next
            ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

            'Grilla Campos
            'EDGAR GARCIA 29122022 SE AGREGA EL CAMPO DESISTEMA
            script += "var dtCampos = [ "
            For i As Integer = 0 To dtCampos.Rows.Count - 1
                'Edgar Garcia 29122022 se comento el if
                'If Convert.ToBoolean(dtCampos.Rows(i)("DeSistema")) = False Then
                script += "{Idd: 'in_" + If((i + 1).ToString().Length = 1, "0" + (i + 1).ToString(), (i + 1).ToString()) + dtCampos.Rows(i)("Nombre").ToString() + "', Campo: '" + dtCampos.Rows(i)("Nombre").ToString() + "', Descripcion: '"
                    script += dtCampos.Rows(i)("Descripcion").ToString() + "', IdTipoDato: '" + dtCampos.Rows(i)("F_inCodTipDat").ToString() + "', TipoDato: '"
                    script += dtCampos.Rows(i)("TipoDato").ToString() + "', Tamano: '" + dtCampos.Rows(i)("Longitud").ToString() + "', LongitudMin: '" + dtCampos.Rows(i)("LongitudMinima").ToString() + "', IdCampo: '"
                    script += dtCampos.Rows(i)("IdCampo").ToString() + "', ValidaTexto: '" + dtCampos.Rows(i)("ValidaTexto").ToString() + "', ValidaNumero: '" + dtCampos.Rows(i)("ValidaNumero").ToString() + "', PermiteAdicionar: '" + dtCampos.Rows(i)("PermiteAdicionar").ToString() + "',"
                    'nuevos campos para referencia
                    script += " IdEntidad: '" + dtCampos.Rows(i)("IdEntidad").ToString() + "', NomEntidad: '" + dtCampos.Rows(i)("NomEntidad").ToString() + "' , IdCamPK: '"
                    script += dtCampos.Rows(i)("IdCamPK").ToString() + "', IdCamDes: '" + dtCampos.Rows(i)("IdCamDes").ToString() + "', NomCamDes: '" + dtCampos.Rows(i)("NomCamDes").ToString() + "',"
                    script += " Activo: '" + dtCampos.Rows(i)("Activo").ToString() + "', ListaActivos: '" + dtCampos.Rows(i)("ListaActivos").ToString() + "', Desistema: '" + dtCampos.Rows(i)("DeSistema").ToString() + "'},"
                'End If
            Next
            script = script.Substring(0, script.Length - 1)
            script += "];"

            script += "var dtCamposDestino = [ "
            For i As Integer = 0 To dtCamposDestino.Rows.Count - 1
                'Edgar Garcia 29122022 se comento el if
                'If Convert.ToBoolean(dtCamposDestino.Rows(i)("DeSistema")) = False Then
                script += "{Idd: 'in_" + If((i + 1).ToString().Length = 1, "0" + (i + 1).ToString(), (i + 1).ToString()) +
                              dtCamposDestino.Rows(i)("Nombre").ToString() + "', Campo: '" + dtCamposDestino.Rows(i)("Nombre").ToString() +
                              "', CampoSolicitud: '" + dtCamposDestino.Rows(i)("CampoSolicitud").ToString() + "', Descripcion: '"
                    script += dtCamposDestino.Rows(i)("Descripcion").ToString() + "', IdTipoDato: '" + dtCamposDestino.Rows(i)("F_inCodTipDat").ToString() + "', TipoDato: '"
                    script += dtCamposDestino.Rows(i)("TipoDato").ToString() + "', Tamano: '" + dtCamposDestino.Rows(i)("Longitud").ToString() + "', IdCampo: '"
                    script += dtCamposDestino.Rows(i)("IdCampo").ToString() + "', ValidaTexto: '" + dtCampos.Rows(i)("ValidaTexto").ToString() + "', ValidaNumero: '" + dtCampos.Rows(i)("ValidaNumero").ToString() + "', PermiteAdicionar: '" + dtCampos.Rows(i)("PermiteAdicionar").ToString() + "',"
                    'nuevos campos para referencia
                    script += " IdEntidad: '" + dtCamposDestino.Rows(i)("IdEntidad").ToString() + "', NomEntidad: '" + dtCamposDestino.Rows(i)("NomEntidad").ToString() + "' , IdCamPK: '"
                    script += dtCamposDestino.Rows(i)("IdCamPK").ToString() + "', IdCamDes: '" + dtCamposDestino.Rows(i)("IdCamDes").ToString() + "', NomCamDes: '" + dtCamposDestino.Rows(i)("NomCamDes").ToString() + "',"
                    script += " Activo: '" + dtCamposDestino.Rows(i)("Activo").ToString() + "', ListaActivos: '" + dtCamposDestino.Rows(i)("ListaActivos").ToString() + "'},"
                'End If
            Next
            script = script.Substring(0, script.Length - 1)
            script += "];"


            'Combo Valor (Parámetros)
            For i As Integer = 0 To dtCampos.Rows.Count - 1
                If Convert.ToBoolean(dtCampos.Rows(i)("DeSistema")) = False And Convert.ToInt32(dtCampos.Rows(i)("F_inCodTipDat")) <> 9 And Convert.ToBoolean(dtCampos.Rows(i)("Activo")) Then
                    'script += "$('#ddlValor').append($('<option></option>').val('" + dtCampos.Rows(i)("Nombre").ToString() + "').html('" + dtCampos.Rows(i)("Descripcion").ToString() + "'));"
                    script += "$('#ddlCampoTipSol').append($('<option></option>').val('" + dtCampos.Rows(i)("Nombre").ToString() + "').html('" + dtCampos.Rows(i)("Descripcion").ToString() + "'));"
                End If
            Next
            ''For i As Integer = 0 To dtCampos.Rows.Count - 1
            ''    'If Convert.ToInt32(dtCampos.Rows(i)("F_inCodTipDat")) <> 9 And Convert.ToBoolean(dtCampos.Rows(i)("Activo")) Then
            ''    'If Convert.ToBoolean(dtCampos.Rows(i)("Activo")) Then
            ''    'script += "$('#ddlValor').append($('<option></option>').val('" + dtCampos.Rows(i)("Nombre").ToString() + "').html('" + dtCampos.Rows(i)("Descripcion").ToString() + "'));"
            ''    script += "$('#ddlCampoTipSolDestino').append($('<option></option>').val('" + dtCampos.Rows(i)("Nombre").ToString() + "').html('" + dtCampos.Rows(i)("Descripcion").ToString() + "'));"
            ''    'End If
            ''Next

            'Grilla CamposEstadoProceso
            script += "var dtCamposEstadoProceso = [ "
            For i As Integer = 0 To dtCampos.Rows.Count - 1
                'Edgar Garcia 30122022 se agrega el tipo de dato al final 
                If (Convert.ToString(dtCampos.Rows(i)("Nombre")).Contains("IdDescripcion") Or Convert.ToString(dtCampos.Rows(i)("Nombre")).Contains("AdjNom_")) = False Then
                    script += "{vcCampo: '" + dtCampos.Rows(i)("Nombre").ToString() + "', vcDescripcion: '" + dtCampos.Rows(i)("Descripcion").ToString()
                    script += "', ddlVisible: '-1', ddlEditable: '-1', ddlObligatorio: '-1', IdCampo: '" + dtCampos.Rows(i)("IdCampo").ToString() + "', Activo: '" + dtCampos.Rows(i)("Activo").ToString() + "', Dato: '" + dtCampos.Rows(i)("F_inCodTipDat").ToString() + "'},"
                End If
            Next
            script = script.Substring(0, script.Length - 1)
            script += "];"

            'Campos Condición
            script += "function CampoReferenciaCondicion(IdCondicion, IdCampo, IdCamEnt, IdSimboloCondicion, IdCampoTipSol, TextoCondicion, NombreCampoTipSol, IdCampoRelacion, ValorCampoRelacion, NombreCampoRelacion) {"
            script += "this.IdCondicion = IdCondicion; this.IdCampo = IdCampo; this.IdCamEnt = IdCamEnt; this.NombreCampoTipSol = NombreCampoTipSol; "
            script += "this.IdSimboloCondicion = IdSimboloCondicion; this.IdCampoTipSol = IdCampoTipSol; this.TextoCondicion = TextoCondicion; "
            script += "this.IdCampoRelacion = IdCampoRelacion; this.ValorCampoRelacion = ValorCampoRelacion; this.NombreCampoRelacion = NombreCampoRelacion; } var lstCondiciones = new Array();var lstCondicionesDestino = new Array();"

            'script += "CampoReferenciaCondicion["
            'For f As Integer = 0 To dtCamposCondicion.Rows.Count - 1
            '    script += "var DatosCondicion = new CampoReferenciaCondicion();"
            '    script += "DatosCondicion = {IdCondicion: '" + dtCamposCondicion.Rows(f)("IdCondicion").ToString() + "', IdCampo: '" + dtCamposCondicion.Rows(f)("IdCampo").ToString()
            '    script += "', IdCamEnt: '" + dtCamposCondicion.Rows(f)("IdCamEnt").ToString() + "', IdSimboloCondicion: '" + dtCamposCondicion.Rows(f)("IdSimboloCondicion").ToString()
            '    script += "', IdCampoTipSol: '" + dtCamposCondicion.Rows(f)("IdCampoTipSol").ToString() + "', TextoCondicion: '" + dtCamposCondicion.Rows(f)("TextoCondicion").ToString()
            '    script += "', NombreCampoTipSol: '" + dtCamposCondicion.Rows(f)("NombreCampoTipSol").ToString() + "'},"
            'Next
            'script = script.Substring(0, script.Length - 1)
            'script += "];"
            For f As Integer = 0 To dtCamposCondicion.Rows.Count - 1
                script += "var DatosCondicion = new CampoReferenciaCondicion();"
                script += "DatosCondicion.IdCondicion = '" + dtCamposCondicion.Rows(f)("IdCondicion").ToString() + "';"
                script += "DatosCondicion.IdCampo = '" + dtCamposCondicion.Rows(f)("IdCampo").ToString() + "';"
                script += "DatosCondicion.IdCamEnt = '" + dtCamposCondicion.Rows(f)("IdCamEnt").ToString() + "';"
                script += "DatosCondicion.IdSimboloCondicion = '" + dtCamposCondicion.Rows(f)("IdSimboloCondicion").ToString() + "';"
                script += "DatosCondicion.IdCampoTipSol = '" + dtCamposCondicion.Rows(f)("IdCampoTipSol").ToString() + "';"
                script += "DatosCondicion.TextoCondicion = '" + dtCamposCondicion.Rows(f)("TextoCondicion").ToString() + "';"
                script += "DatosCondicion.NombreCampoTipSol = '" + dtCamposCondicion.Rows(f)("NombreCampoTipSol").ToString() + "';"
                script += "DatosCondicion.IdCampoRelacion = '" + dtCamposCondicion.Rows(f)("IdCampoRelacion").ToString() + "';"
                script += "DatosCondicion.ValorCampoRelacion = '" + dtCamposCondicion.Rows(f)("ValorCampoRelacion").ToString() + "';"
                script += "DatosCondicion.NombreCampoRelacion = '" + dtCamposCondicion.Rows(f)("NombreCampoRelacion").ToString() + "';"
                script += "lstCondiciones.push(DatosCondicion);"
            Next

            For f As Integer = 0 To dtCamposCondicionDestino.Rows.Count - 1
                script += "var DatosCondicion = new CampoReferenciaCondicion();"
                script += "DatosCondicion.IdCondicion = '" + dtCamposCondicionDestino.Rows(f)("IdCondicion").ToString() + "';"
                script += "DatosCondicion.IdCampo = '" + dtCamposCondicionDestino.Rows(f)("IdCampo").ToString() + "';"
                script += "DatosCondicion.IdSolicitudTipo = '" + dtCamposCondicionDestino.Rows(f)("IdSolicitudTipo").ToString() + "';"
                script += "DatosCondicion.IdEntidad = '" + dtCamposCondicionDestino.Rows(f)("IdEntidad").ToString() + "';"
                script += "DatosCondicion.IdCamEnt = '" + dtCamposCondicionDestino.Rows(f)("IdCamEnt").ToString() + "';"
                script += "DatosCondicion.IdSimboloCondicion = '" + dtCamposCondicionDestino.Rows(f)("IdSimboloCondicion").ToString() + "';"
                script += "DatosCondicion.IdCampoTipSol = '" + dtCamposCondicionDestino.Rows(f)("IdCampoTipSol").ToString() + "';"
                script += "DatosCondicion.TextoCondicion = '" + dtCamposCondicionDestino.Rows(f)("TextoCondicion").ToString() + "';"
                script += "DatosCondicion.NombreCampoTipSol = '" + dtCamposCondicionDestino.Rows(f)("NombreCampoTipSol").ToString() + "';"
                script += "DatosCondicion.IdCampoRelacion = '" + dtCamposCondicionDestino.Rows(f)("IdCampoRelacion").ToString() + "';"
                script += "DatosCondicion.ValorCampoRelacion = '" + dtCamposCondicionDestino.Rows(f)("ValorCampoRelacion").ToString() + "';"
                script += "DatosCondicion.NombreCampoRelacion = '" + dtCamposCondicionDestino.Rows(f)("NombreCampoRelacion").ToString() + "';"
                script += "lstCondicionesDestino.push(DatosCondicion);"
            Next


            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

            'MENSAJES OPERADOR
            script += "var arDatosEnvOper = [];"
            For Each drMsjOper As DataRow In dtMensajeOperador.Rows
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'] = [];"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].IdMensaje = " + drMsjOper("IdMensaje").ToString() + ";"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].IdSolicitudTipo = '" + hdfCodSolSist.Value + "';"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].IdOperador = '" + drMsjOper("IdOperador").ToString() + "';"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].EnviarCorreo = '" + IIf(UtilitarioWeb.ComprobarBoolNULL(drMsjOper("btEnviarCorreo"), False), "1", "0") + "';"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].ModoMensaje = " + drMsjOper("ModoMensaje").ToString() + ";"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].Destinatarios = '" + drMsjOper("Destinatarios").ToString() + "';"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].Asunto = '" + drMsjOper("Asunto").ToString() + "';"
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].Mensaje = '" + drMsjOper("Mensaje").ToString() + "';"
                If IsDBNull(drMsjOper("Archivo")) Or drMsjOper("ModoMensaje").ToString() = "1" Then
                    script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].Archivo = '';"
                    script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].Extensión = '';"
                Else
                    script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].Archivo = '" + drMsjOper("NombreArchivo") + "';"
                    script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].Extension = '" + drMsjOper("Extension").ToString() + "';"

                    Dim PathArchivo = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + drMsjOper("NombreArchivo")
                    File.Delete(PathArchivo)
                    Dim byFileData As Byte() = drMsjOper("Archivo")
                    File.WriteAllBytes(PathArchivo, byFileData)

                End If
                script += "arDatosEnvOper['" + drMsjOper("IdOperador").ToString() + "'].UsuarioLogeado = '" + IIf(UtilitarioWeb.ComprobarBoolNULL(drMsjOper("UsuarioLogeado"), False), "1", "0") + "';"
            Next


            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyDatos", script, True)
            'Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script2, True)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarFinanciamiento(ByVal inTipLin As String) As List(Of MOV_CAM_FinanciamientoTipo)
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Dim lstFinanciamientoTipo As List(Of MOV_CAM_FinanciamientoTipo)

        Try
            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstFinanciamientoTipo = FinanciamientoTipo.ListarPorTipoLinea(Convert.ToInt32(inTipLin))

            Dim vNinguno As New MOV_CAM_FinanciamientoTipo()
            vNinguno.IdTipoFinanciamiento = 0
            vNinguno.DescripcionCorta = "--Ninguno--"
            lstFinanciamientoTipo.Insert(0, vNinguno)

            'Dim lstObj As New List(Of Object)
            'Dim dicNinguno As New Dictionary(Of String, Object)
            'dicNinguno.Add("Id", 0)
            'dicNinguno.Add("DesCor", "--Ninguno--")
            'lstObj.Add(dicNinguno)
            'For Each oFinanciamiento As ENT_MOV_CAM_FinanciamientoTipo In lstFinanciamientoTipo
            '    Dim dict As New Dictionary(Of String, Object)
            '    dict.Add("Id", oFinanciamiento.IdTipoFinanciamiento)
            '    dict.Add("DesCor", oFinanciamiento.DescripcionCorta)
            '    lstObj.Add(dict)
            'Next
            'Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try
        Return lstFinanciamientoTipo
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcNomTip As String, ByVal vcDesTip As String, ByVal vcDesSol As String, ByVal inIdFinanciamiento As String,
                              ByVal biUsaDri As String, ByVal inLinTip As String, ByVal vcPrefijo As String, ByVal vcResApr As String,
                              ByVal XMLCampos As String, ByVal XMLCamposPorEstadoProceso As String, ByVal inNumCam As String, ByVal XMLMensajePorEstado As String,
                              ByVal XMLParametros As String, ByVal vcCodTipsol As String, ByVal biMonFij As String, ByVal dcMonto As String,
                              ByVal biPropie As String, ByVal biUsuEsp As String, ByVal biResAre As String, ByVal XMLUmbralEstado As String,
                              ByVal XMLReglaEstado As String, ByVal inTecnicoResponsable As String, ByVal esDevolucion As String,
                              ByVal XMLCamposCondicion As String, ByVal XMLDetalleCaptura As String, ByVal biActivo As String, ByVal vcNomArcCon As String,
                              ByVal vcLstCodSol As String, ByVal XMLMensajeDevolucion As String, ByVal inEscalar As Integer,
                              ByVal XMLTipoProducto As String, ByVal intCategoria As String, ByVal lstMensajeOperador As String,
                              ByVal XMLCamposDestino As String, ByVal XMLCamposCondicionDestino As String, ByVal EnviarOperador As Integer,
                              ByVal UsaFinanciamiento As Boolean, ByVal inTecnicoDirecto As Integer, ByVal XMLCamposAdjuntosPorEstadoMensaje As String) As String

        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim Perfil As BL_SEG_Perfil = Nothing
        Dim strResultado As String
        Try
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")
            'Dim Usuario As BL_SEG_Usuario = new BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            XMLUmbralEstado = XMLUmbralEstado.Replace("&nbsp;", " ")
            XMLMensajePorEstado = XMLMensajePorEstado.Replace("&nbsp;", " ")

            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            Perfil = New BL_SEG_Perfil(oUsuario.IdCliente)

            Dim oTipoSolicitud As New ENT_MOV_SolicitudTipo
            Dim oSerializer As New JavaScriptSerializer

            Dim lstMensajes As New List(Of ENT_MOV_TipoSolicitud_MensajeOperador)
            If (lstMensajeOperador <> "") Then
                Dim MensajesOperador As New List(Of Dictionary(Of String, String))
                MensajesOperador = oSerializer.Deserialize(Of List(Of Dictionary(Of String, String)))(lstMensajeOperador)

                Dim oMensajeOperador As ENT_MOV_TipoSolicitud_MensajeOperador

                For Each Mensaje As Dictionary(Of String, String) In MensajesOperador
                    If Mensaje("IdMensaje") Is Nothing OrElse Mensaje("IdMensaje").ToString.Trim = "" Then
                        Continue For
                    End If

                    oMensajeOperador = New ENT_MOV_TipoSolicitud_MensajeOperador
                    oMensajeOperador.IdMensaje = Convert.ToInt32(Mensaje("IdMensaje"))
                    oMensajeOperador.IdSolicitudTipo = Convert.ToInt32(Mensaje("IdSolicitudTipo"))
                    oMensajeOperador.IdOperador = Mensaje("IdOperador")
                    oMensajeOperador.btEnviarCorreo = IIf(Mensaje("EnviarCorreo") = "1", True, False)
                    oMensajeOperador.ModoMensaje = Convert.ToInt32(Mensaje("ModoMensaje"))
                    oMensajeOperador.Destinatarios = Mensaje("Destinatarios")
                    oMensajeOperador.Asunto = Mensaje("Asunto")
                    'oMensajeOperador.Mensaje = Mensaje("Mensaje")
                    oMensajeOperador.Mensaje = Mensaje("Mensaje").Replace("'", """")
                    oMensajeOperador.UsuarioLogeado = IIf(Mensaje("UsuarioLogeado") = "1", True, False)
                    If Mensaje("ModoMensaje") = "2" Then
                        Dim PathArchivo = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + Mensaje("Archivo")
                        If File.Exists(PathArchivo) Then
                            Dim fs As New FileStream(PathArchivo, FileMode.Open, FileAccess.Read)
                            Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                            fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                            fs.Close()
                            oMensajeOperador.Archivo = byFileData
                            oMensajeOperador.Extension = Mensaje("Extension")
                            oMensajeOperador.NombreArchivo = Mensaje("Archivo")
                        Else
                            oMensajeOperador.Archivo = Nothing
                            oMensajeOperador.Extension = Nothing
                            oMensajeOperador.NombreArchivo = Nothing
                        End If
                    Else
                        oMensajeOperador.Archivo = Nothing
                        oMensajeOperador.Extension = Nothing
                        oMensajeOperador.NombreArchivo = Nothing
                    End If
                    lstMensajes.Add(oMensajeOperador)
                Next
            End If

            oTipoSolicitud.vcTabla = vcNomTip.Replace(" ", "")
            oTipoSolicitud.vcDescripcion = vcDesTip
            oTipoSolicitud.inTipoFinanciamiento = Convert.ToInt32(inIdFinanciamiento)
            oTipoSolicitud.vcUsuarioCreacion = oUsuario.P_inCod
            oTipoSolicitud.IntCategoria = Convert.ToInt32(intCategoria)
            oTipoSolicitud.inLineaTipo = Convert.ToInt32(inLinTip)
            oTipoSolicitud.vcPrefijo = vcPrefijo
            oTipoSolicitud.dcMonto = Convert.ToDecimal(dcMonto)
            'oTipoSolicitud.inTipoAprobacion = Convert.ToInt32(vcTipApr)
            oTipoSolicitud.vcResponsable = Convert.ToInt32("0" + vcResApr)
            oTipoSolicitud.inTecnicoResponsable = inTecnicoResponsable
            'escalamiento
            oTipoSolicitud.biEscalamiento = inEscalar = 1
            oTipoSolicitud.biEnviarOperador = EnviarOperador = 1
            oTipoSolicitud.UsaFinanciamiento = UsaFinanciamiento
            oTipoSolicitud.inTecnicoDirecto = IIf(inTecnicoDirecto = 0, Nothing, inTecnicoDirecto)
            ''''''''''''

            'esDevolucion 14-03-2014 - wapumayta
            If esDevolucion = "0" Then oTipoSolicitud.biEsDevolucion = False Else oTipoSolicitud.biEsDevolucion = True
            If biPropie = "0" Then oTipoSolicitud.biPropie = False Else oTipoSolicitud.biPropie = True
            If biUsuEsp = "0" Then oTipoSolicitud.biUsuEsp = False Else oTipoSolicitud.biUsuEsp = True
            If biResAre = "0" Then oTipoSolicitud.biResAre = False Else oTipoSolicitud.biResAre = True

            'If biFraccionamiento = "0" Then
            '    oTipoSolicitud.biFraccionamiento = False
            'Else
            '    oTipoSolicitud.biFraccionamiento = True
            'End If

            If biUsaDri = "0" Then oTipoSolicitud.biUsaDriver = False Else oTipoSolicitud.biUsaDriver = True
            If biMonFij = "0" Then oTipoSolicitud.biMontoFijo = False Else oTipoSolicitud.biMontoFijo = True
            If biActivo = "0" Then oTipoSolicitud.biActivo = False Else oTipoSolicitud.biActivo = True

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.TipoSolicitud
            oAuditoria.Tabla = Constantes.TableNames.TipoSolicitud

            Dim intResultado As Integer = 1

            If vcCodTipsol = "" Then
                'JHERRERA 20150120: Actualizando Usuario Específico con Perfil De Responsable De Aprobación
                'If (oTipoSolicitud.biUsuEsp) Then
                '    intResultado = Perfil.AsignarPerfilResponsableAprobacionEmpleado(vcResApr)
                'End If

                'If intResultado = 1 Then
                'EDGAR GARCIA 06022023 se agrego vcDescripcionSol		 
                strResultado = TipoSolicitud.Insertar(oTipoSolicitud, XMLCampos, XMLCamposPorEstadoProceso, Convert.ToInt32(inNumCam), XMLMensajePorEstado,
                                   XMLParametros, XMLReglaEstado, XMLUmbralEstado, XMLCamposCondicion, XMLDetalleCaptura,
                                   XMLTipoProducto, lstMensajes, XMLCamposDestino, XMLCamposCondicionDestino, XMLCamposAdjuntosPorEstadoMensaje, vcDesSol)

                'AUDITORIA:Insertar registro
                oAuditoria.Insertar(New String() {strResultado})
                'Else 'intResultado = -20
                '    strResultado = intResultado
                'End If
            Else
                Dim byArchivo As Byte()
                If vcNomArcCon <> "" Then
                    'Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

                    Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + vcNomArcCon
                    Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                    Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                    fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                    fs.Close()
                    byArchivo = byFileData
                Else
                    byArchivo = Nothing
                End If

                ''JHERRERA 20150120: Actualizando Usuario Específico con Perfil De Responsable De Aprobación
                'If (oTipoSolicitud.biUsuEsp) Then
                '    intResultado = Perfil.AsignarPerfilResponsableAprobacionEmpleado(vcResApr)
                'End If

                'If intResultado = 1 Then
                'AUDITORIA:Actualizar Antes
                Dim strAntes As String = oAuditoria.AntesActualizar(New String() {vcCodTipsol})

                'Se actualizan datos....
                'EDGAR GARCIA 06022023 se agrego vcDescripcionSol		 
                strResultado = TipoSolicitud.Actualizar(oTipoSolicitud, XMLCampos, XMLCamposPorEstadoProceso, Convert.ToInt32(inNumCam), XMLMensajePorEstado,
                                   XMLParametros, Convert.ToInt32(vcCodTipsol), XMLReglaEstado, XMLUmbralEstado,
                                   XMLCamposCondicion, XMLDetalleCaptura, byArchivo, vcLstCodSol, XMLMensajeDevolucion,
                                   XMLTipoProducto, lstMensajes, XMLCamposDestino, XMLCamposCondicionDestino, XMLCamposAdjuntosPorEstadoMensaje, vcDesSol)

                ''AUDITORIA:Actualizar Después
                oAuditoria.DespuesActualizar(New String() {strResultado}, strAntes)
                ''Else 'intResultado = -20
                ''    strResultado = intResultado
                'End If
            End If

            UtilitarioWeb.TipoSolicitud.ActualizarUsuario()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
            If Perfil IsNot Nothing Then
                Perfil.Dispose()
            End If
        End Try

        Return strResultado
    End Function

    <WebMethod()>
    Public Shared Function ListarDetalleCaptura(ByVal inCotTipSol As Integer) As List(Of Dictionary(Of String, String))
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim lstDetalles As New List(Of Dictionary(Of String, String))
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim dsDetCaptura As New DataSet
            dsDetCaptura = Solicitud.ListarDetalleCaptura(inCotTipSol)

            For Each dr As DataRow In dsDetCaptura.Tables(0).Rows
                Dim dict As New Dictionary(Of String, String)
                dict.Add("inCodTipSol", dr("inCodTipSol").ToString())
                dict.Add("vcNomTipSol", dr("vcNomTipSol").ToString())
                dict.Add("biPersonalizado", dr("biPersonalizado").ToString())
                dict.Add("biActivo", dr("biActivo").ToString())
                dict.Add("biSoportaEdicion", dr("biSoportaEdicion").ToString())
                dict.Add("btProObl", dr("btProObl").ToString())
                dict.Add("inCod", dr("inCod").ToString())
                dict.Add("vcTituloTab", dr("vcTituloTab").ToString())
                dict.Add("vcNombreTab", dr("vcNombreTab").ToString())
                dict.Add("btAct", dr("btAct").ToString())
                dict.Add("btCapObl", dr("btCapObl").ToString())
                dict.Add("Descripcion", dr("Descripcion").ToString())
                'nuevo (para configuración) 15-09-2014 wapumayta
                dict.Add("inCanTot_Adj", dr("inCanTot_Adj").ToString())
                dict.Add("vcExtPer_Adj", dr("vcExtPer_Adj").ToString())
                dict.Add("vcTamTip_Adj", dr("vcTamTip_Adj").ToString())
                dict.Add("vcTamMed_Adj", dr("vcTamMed_Adj").ToString())
                dict.Add("dcTamaño_Adj", dr("dcTamaño_Adj").ToString())
                dict.Add("vcTamTip_Msj", dr("vcTamTip_Msj").ToString())
                dict.Add("inTamaño_Msj", dr("inTamaño_Msj").ToString())
                dict.Add("vcNomArchivo_Dec", dr("vcNomArchivo_Dec").ToString())
                dict.Add("btBotRef", dr("btBotRef").ToString())

                If (dr("inCod").ToString() = "4" AndAlso dr("vcNomArchivo_Dec").ToString() <> "" AndAlso dr("byArchivo_Dec") IsNot Nothing) Then
                    'Descargar Adjunto de condiciones
                    Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

                    Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + dr("vcNomArchivo_Dec").ToString()
                    Dim byFileData As Byte() = dr("byArchivo_Dec")
                    File.WriteAllBytes(vcFilePath, byFileData)
                End If
                'dict.Add("vcUbiArchivo_Dec", dr("vcUbiArchivo_Dec").ToString())
                lstDetalles.Add(dict)
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
        Return lstDetalles
    End Function

    <WebMethod()>
    Public Shared Sub ActualizarDetalleCaptura(ByVal inCodTipSol As Integer, ByVal xmlDetalle As String)
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Solicitud.ActualizarDetalleCaptura(inCodTipSol, xmlDetalle)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function MostrarFinanciamiento(ByVal p_IdTipoFinanciamiento As String) As MOV_CAM_FinanciamientoTipo
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Dim oFinanciamientoTipo As MOV_CAM_FinanciamientoTipo = Nothing

        Try
            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            oFinanciamientoTipo = FinanciamientoTipo.Mostrar(Integer.Parse(p_IdTipoFinanciamiento))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try
        Return oFinanciamientoTipo
    End Function

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


    'Tipo de dato referencia
    <WebMethod()>
    Public Shared Function ListarCampoEntidadReferencia(ByVal inCodEnt As Integer) As String
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim resultado As String = String.Empty
        Try
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsCampo As DataSet = TipoSolicitud.ListarCamposPorEntidadReferencia(inCodEnt)

            For Each drCampo As DataRow In dsCampo.Tables(0).Rows
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'] = [];"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].P_inCod = '" + drCampo("P_inCod").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcNom = '" + drCampo("vcNom").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcNomAlias = '" + drCampo("vcNomAlias").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcDes = '" + drCampo("vcDes").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcTab = '" + drCampo("vcTab").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].F_inTipDat = '" + drCampo("F_inTipDat").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcValVer = '" + If(IsDBNull(drCampo("vcValVer")) Or drCampo("vcValVer").ToString() = "", "Verdadero", drCampo("vcValVer").ToString()) + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcValFal = '" + If(IsDBNull(drCampo("vcValFal")) Or drCampo("vcValFal").ToString() = "", "Falso", drCampo("vcValFal").ToString()) + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcForKey = '" + If(IsDBNull(drCampo("vcForKey")), "", drCampo("vcForKey").ToString()) + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcTabFor = '" + If(IsDBNull(drCampo("vcTabFor")), "", drCampo("vcTabFor").ToString()) + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].vcPriKeyFor = '" + If(IsDBNull(drCampo("vcPriKeyFor")), "", drCampo("vcPriKeyFor").ToString()) + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].btIdPri = '" + drCampo("btIdPri").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].inLar = '" + drCampo("inLar").ToString() + "';"
                resultado += "Campos['" + drCampo("P_inCod").ToString() + "'].btBusq = '" + UtilitarioWeb.ComprobarBoolNULL(drCampo("btBusq"), False).ToString() + "';"
            Next

            For Each drEntidadRelacion As DataRow In dsCampo.Tables(1).Rows
                resultado += "EntidadRelacion['" + drEntidadRelacion("vcTab").ToString() + "'] = [];"
                resultado += "EntidadRelacion['" + drEntidadRelacion("vcTab").ToString() + "'].P_inCod = '" + drEntidadRelacion("P_inCod").ToString() + "';"
                resultado += "EntidadRelacion['" + drEntidadRelacion("vcTab").ToString() + "'].vcTab = '" + drEntidadRelacion("vcTab").ToString() + "';"
                resultado += "EntidadRelacion['" + drEntidadRelacion("vcTab").ToString() + "'].vcDes = '" + drEntidadRelacion("vcDes").ToString() + "';"
                Select Case drEntidadRelacion("vcTab").ToString()
                    Case "MOV_Estado"
                        resultado += "EntidadRelacion['" + drEntidadRelacion("vcTab").ToString() + "'].vcFiltroEntidad = ' AND inMod = 1 ';"
                    Case Else
                        resultado += "EntidadRelacion['" + drEntidadRelacion("vcTab").ToString() + "'].vcFiltroEntidad = '';"
                End Select
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
        End Try

        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ListarCampoEntidadReferenciaDestino(ByVal inCodEnt As Integer) As String
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim resultado As String = String.Empty
        Try
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsCampo As DataSet = TipoSolicitud.ListarCamposPorEntidadReferencia(inCodEnt)

            For Each drCampo As DataRow In dsCampo.Tables(0).Rows
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'] = [];"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].P_inCod = '" + drCampo("P_inCod").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcNom = '" + drCampo("vcNom").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcNomAlias = '" + drCampo("vcNomAlias").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcDes = '" + drCampo("vcDes").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcTab = '" + drCampo("vcTab").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].F_inTipDat = '" + drCampo("F_inTipDat").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcValVer = '" + If(IsDBNull(drCampo("vcValVer")) Or drCampo("vcValVer").ToString() = "", "Verdadero", drCampo("vcValVer").ToString()) + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcValFal = '" + If(IsDBNull(drCampo("vcValFal")) Or drCampo("vcValFal").ToString() = "", "Falso", drCampo("vcValFal").ToString()) + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcForKey = '" + If(IsDBNull(drCampo("vcForKey")), "", drCampo("vcForKey").ToString()) + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcTabFor = '" + If(IsDBNull(drCampo("vcTabFor")), "", drCampo("vcTabFor").ToString()) + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].vcPriKeyFor = '" + If(IsDBNull(drCampo("vcPriKeyFor")), "", drCampo("vcPriKeyFor").ToString()) + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].btIdPri = '" + drCampo("btIdPri").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].inLar = '" + drCampo("inLar").ToString() + "';"
                resultado += "CamposDestino['" + drCampo("P_inCod").ToString() + "'].btBusq = '" + UtilitarioWeb.ComprobarBoolNULL(drCampo("btBusq"), False).ToString() + "';"
            Next

            For Each drEntidadRelacion As DataRow In dsCampo.Tables(1).Rows
                resultado += "EntidadRelacionDestino['" + drEntidadRelacion("vcTab").ToString() + "'] = [];"
                resultado += "EntidadRelacionDestino['" + drEntidadRelacion("vcTab").ToString() + "'].P_inCod = '" + drEntidadRelacion("P_inCod").ToString() + "';"
                resultado += "EntidadRelacionDestino['" + drEntidadRelacion("vcTab").ToString() + "'].vcTab = '" + drEntidadRelacion("vcTab").ToString() + "';"
                resultado += "EntidadRelacionDestino['" + drEntidadRelacion("vcTab").ToString() + "'].vcDes = '" + drEntidadRelacion("vcDes").ToString() + "';"
                Select Case drEntidadRelacion("vcTab").ToString()
                    Case "MOV_Estado"
                        resultado += "EntidadRelacionDestino['" + drEntidadRelacion("vcTab").ToString() + "'].vcFiltroEntidad = ' AND inMod = 1 ';"
                    Case Else
                        resultado += "EntidadRelacionDestino['" + drEntidadRelacion("vcTab").ToString() + "'].vcFiltroEntidad = '';"
                End Select
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
        End Try

        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ListarCampoEntidadRelacion(ByVal inCodEnt As Integer) As String
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim resultado As String = String.Empty
        Try
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsCampo As DataSet = TipoSolicitud.ListarCamposPorEntidadReferencia(inCodEnt)


            For Each drCampo As DataRow In dsCampo.Tables(0).Rows
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'] = [];"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].P_inCod = '" + drCampo("P_inCod").ToString() + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].vcNom = '" + drCampo("vcNom").ToString() + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].vcNomAlias = '" + drCampo("vcNomAlias").ToString() + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].vcDes = '" + drCampo("vcDes").ToString() + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].vcTab = '" + drCampo("vcTab").ToString() + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].F_inTipDat = '" + drCampo("F_inTipDat").ToString() + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].vcValVer = '" + If(IsDBNull(drCampo("vcValVer")) Or drCampo("vcValVer").ToString() = "", "Verdadero", drCampo("vcValVer").ToString()) + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].vcValFal = '" + If(IsDBNull(drCampo("vcValFal")) Or drCampo("vcValFal").ToString() = "", "Falso", drCampo("vcValFal").ToString()) + "';"
                resultado += "CamposRelacion['" + drCampo("P_inCod").ToString() + "'].btBusq = '" + UtilitarioWeb.ComprobarBoolNULL(drCampo("btBusq"), False).ToString() + "';"
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
        End Try

        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ListarRegistrosEntidad(ByVal inMaxFil As Integer, ByVal inCodent As Integer, ByVal inCodCam As Integer, _
                                                 ByVal vcValBus As String, ByVal vcFiltroEntidad As String) As List(Of Dictionary(Of String, String))
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim lstReg As New List(Of Dictionary(Of String, String))
        Try
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsRegistrosEntidad As DataSet = TipoSolicitud.ListarRegistrosEntidad(inMaxFil, inCodent, inCodCam, vcValBus, vcFiltroEntidad)

            For Each dr As DataRow In dsRegistrosEntidad.Tables(0).Rows
                Dim dictReg As New Dictionary(Of String, String)
                dictReg.Add("Codigo", dr("Codigo").ToString())
                dictReg.Add("Nombre", dr("Nombre").ToString())
                lstReg.Add(dictReg)
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
        End Try
        Return lstReg
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarSolicitudesEnConflicto_Busqueda(ByVal inCodTipSol As Integer, ByVal XMLCamposPorEstadoProceso As String, _
                                                     ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal paramBusq As String, ByVal XMLCampos As String) As Object
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim oUsuario As ENT_SEG_Usuario
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            Dim dtSolicitudes As New DataTable
            'dtSolicitudes.Columns.Add("P_inCodSol", GetType(Integer))
            'dtSolicitudes.Columns.Add("vcCodigo", GetType(String))
            'dtSolicitudes.Columns.Add("vcNomEmp", GetType(String))
            'dtSolicitudes.Columns.Add("vcCorProp", GetType(String))
            'dtSolicitudes.Columns.Add("vcCampo", GetType(String))
            'dtSolicitudes.Rows.Add(230, "SOPRU0000000004", "U10984 - ZAFERSON V. VICTOR ALEJANDRO", "rramos@pcsistel.com", "Texto_1")
            'dtSolicitudes.Rows.Add(231, "SOPRU0000000005", "U10984 - ZAFERSON V. VICTOR ALEJANDRO", "rramos@pcsistel.com", "Texto_1")

            dtSolicitudes = TipoSolicitud.ListarSolicitudesEnConflicto_Busqueda(XMLCamposPorEstadoProceso, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, paramBusq, XMLCampos)

            Return JQGrid.DatosJSON(dtSolicitudes, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarSolicitudesEnConflicto_Datos(ByVal inCodTipSol As Integer, ByVal XMLCamposPorEstadoProceso As String, _
                                                              ByVal XMLCampos As String) As List(Of String)
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim oUsuario As ENT_SEG_Usuario
        Dim result As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            Dim dsDatos As New DataSet
            dsDatos = TipoSolicitud.ListarSolicitudesEnConflicto_Datos(XMLCamposPorEstadoProceso, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, XMLCampos)
            Dim lstIdsSol As String = String.Empty
            If (dsDatos.Tables(0).Rows(0)(0).ToString() = 0) Then
                result.Add("0")
            Else
                result.Add(dsDatos.Tables(0).Rows.Count.ToString())
                'string con lista de solicitud a devolver

                For Each dr As DataRow In dsDatos.Tables(0).Rows
                    If lstIdsSol = String.Empty Then
                        lstIdsSol = dr("IdSolicitud").ToString()
                    Else
                        lstIdsSol = lstIdsSol + "," + dr("IdSolicitud").ToString()
                    End If
                Next
            End If


            Dim scriptDatos As String = String.Empty
            If dsDatos.Tables.Count = 2 OrElse result(0) <> "0" Then
                For Each dr As DataRow In dsDatos.Tables(1).Rows
                    'destinatarios
                    Select Case dr("TipoDestinatario").ToString()
                        Case "1"
                            scriptDatos += "arDatosDevolucion[1].Destinatarios[0].Valor = " + If(UtilitarioWeb.ComprobarBoolNULL(dr("Propietario"), False), "1", "0") + ";"
                        Case "2"
                            scriptDatos += "arDatosDevolucion[2].Destinatarios[0].Valor = " + If(UtilitarioWeb.ComprobarBoolNULL(dr("RespAprobacion"), False), "1", "0") + ";"
                        Case "3"
                            scriptDatos += "arDatosDevolucion[3].Destinatarios[0].Valor = " + If(UtilitarioWeb.ComprobarBoolNULL(dr("TecAsignado"), False), "1", "0") + ";"
                            scriptDatos += "arDatosDevolucion[3].Destinatarios[1].Valor = " + If(UtilitarioWeb.ComprobarBoolNULL(dr("TecResponsable"), False), "1", "0") + ";"
                            scriptDatos += "arDatosDevolucion[3].Destinatarios[2].Valor = " + If(UtilitarioWeb.ComprobarBoolNULL(dr("Administrador"), False), "1", "0") + ";"
                    End Select
                    scriptDatos += "arDatosDevolucion[" + dr("TipoDestinatario").ToString() + "].IdTipoSolicitud = " + dr("IdSolicitudTipo").ToString() + ";"
                    scriptDatos += "arDatosDevolucion[" + dr("TipoDestinatario").ToString() + "].TipoDestinatario = " + dr("TipoDestinatario").ToString() + ";"
                    'envio
                    scriptDatos += "arDatosDevolucion[" + dr("TipoDestinatario").ToString() + "].EnvioCorreo = " + If(UtilitarioWeb.ComprobarBoolNULL(dr("EnviarCorreo"), False), "1", "0") + ";"
                    'datos mensaje
                    scriptDatos += "arDatosDevolucion[" + dr("TipoDestinatario").ToString() + "].Asunto = '" + dr("Asunto").ToString() + "';"
                    scriptDatos += "arDatosDevolucion[" + dr("TipoDestinatario").ToString() + "].Mensaje = '" + dr("Mensaje").ToString() + "';"
                Next
            End If
            result.Add(scriptDatos)
            result.Add(lstIdsSol)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(TipoSolicitud) Then TipoSolicitud.Dispose()
        End Try
        Return result
    End Function
End Class
