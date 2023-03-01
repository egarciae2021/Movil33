Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports UtilitarioWeb
Imports System.Data.SqlClient
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Campana.BE
Imports VisualSoft.PCSistelMovil.Solicitudes.BL
Imports VisualSoft.PCSistelMovil.Solicitudes.BE

Partial Class P_Movil_Administrar_Solicitudes_Adm_EditarSolicitudPersonalizada
    Inherits System.Web.UI.Page
    'Dim strResumen As String = ""

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim Solicitudes As BL_MOV_Solicitud = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim blTipoCierreSolicitud As BL_MOV_TipoCierreSolicitud = Nothing
        Dim blTipoPausaSolicitud As BL_MOV_TipoPausaSolicitud = Nothing
        Dim oSoliciTudPausa As BL_MOV_PausaSolicitud = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Dim BLOrganizacion As BL_GEN_OrganizacionG = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                hdfTituloValeResguardo.Value = "" & ConfigurationManager.AppSettings("TituloValeResguardo")

                hdfSolicitudesMultipleEspecialista.Value = HttpContext.Current.Session("SolicitudesMultipleEspecialista")

                hdfAdmin.Value = Request.QueryString("biAdmin") 'si es administrador
                hdfTecnico.Value = Request.QueryString("biTecnico") 'si es tecnico
                hdfResApr.Value = Request.QueryString("biResApr") 'si es responsable
                hdfCodEmp.Value = Request.QueryString("vcCodEmp")
                hdfEstado.Value = Request.QueryString("inEst") 'proceso
                hdfEstado_Apr.Value = Request.QueryString("inEst_Apr") 'aprobacion
                hdfTabla.Value = Request.QueryString("vcTabla") 'nombre
                hdfCodTipSol.Value = Request.QueryString("inTipSol")
                hdfCodSol.Value = Request.QueryString("Cod")
                Me.hdfBiEscalamiento.Value = Request.QueryString("biEscalamiento")
                hdfBiEscalamiento.Value = Replace("" & hdfBiEscalamiento.Value, "True", "1")
                hdfEsVistaAutorizador.Value = Request.QueryString("esVistaPorAutorizar")



                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                hdfCodUsuarioCreacion.Value = oUsuario.vcUsu
                hdfTecnicoAsignado.Value = "0"
                hdfUsuarioCreacion.Value = "0"
                hdfPropie.Value = "0"
                'If oUsuario.vcUsu = hdfCodEmp.Value Then
                If oUsuario.Empleado.P_vcCod = hdfCodEmp.Value Then
                    hdfPropie.Value = "1"
                End If

                hdfEsResponsableTI.Value = "0"
                For Each oPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                    If oPerfil.CodigoPerfil = "GESSOL" Then hdfEsResponsableTI.Value = "1"
                Next

                blTipoCierreSolicitud = New BL_MOV_TipoCierreSolicitud(oUsuario.IdCliente)
                Dataddl(ddlTipoCierreSolicitud, blTipoCierreSolicitud.ListarTiposCierreSolicitud(), "Nombre", "Id")

                blTipoPausaSolicitud = New BL_MOV_TipoPausaSolicitud(oUsuario.IdCliente)
                Dim optionProcesar As ENT_MOV_TipoPausaSolicitud = New ENT_MOV_TipoPausaSolicitud(-1, "En Proceso", False)
                Dim listaTipoPausa = New List(Of ENT_MOV_TipoPausaSolicitud)
                listaTipoPausa.Add(optionProcesar)
                listaTipoPausa.AddRange(blTipoPausaSolicitud.ListarTipoPausaSolicitud())

                oSoliciTudPausa = New BL_MOV_PausaSolicitud(oUsuario.IdCliente)
                Dim tuplaTipoPausa As (Boolean, ENT_MOV_SolicitudPausa) = oSoliciTudPausa.ListarUltimaPausaSolicitud(Convert.ToInt32(hdfCodSol.Value), oUsuario.P_inCod)

                If tuplaTipoPausa.Item1 Then
                    Dim elementoRemover = listaTipoPausa.Single(Function(r) r.IdTipoPausa <> tuplaTipoPausa.Item2.IdTipoPausa And r.IdTipoPausa <> -1)
                    listaTipoPausa.Remove(elementoRemover)
                End If

                Dataddl(ddlTipoPausa, listaTipoPausa, "Nombre", "IdTipoPausa")
                hdfEnPausa.Value = tuplaTipoPausa.Item1

                If (tuplaTipoPausa.Item1) Then

                    If tuplaTipoPausa.Item2.TieneTiempo Then
                        If tuplaTipoPausa.Item2.TiempoRestante > 0 Then
                            lblTiempoRestante.InnerText = tuplaTipoPausa.Item2.TiempoRestanteTexto
                        End If
                        If tuplaTipoPausa.Item2.HabilitaCombo Then
                            lblHabilitaEdicion.InnerText = "1"
                        Else
                            lblHabilitaEdicion.InnerText = "0"
                        End If
                    End If

                    ddlTipoPausa.SelectedValue = tuplaTipoPausa.Item2.IdTipoPausa.ToString()
                Else
                    ddlTipoPausa.SelectedValue = "-1"
                End If

                If hdfEstado.Value = "9" Or hdfEstado.Value = "7" Then
                    Dim blTipoCierre As BL_MOV_TipoCierreSolicitud = New BL_MOV_TipoCierreSolicitud(oUsuario.IdCliente)
                    Dim tipoCierre = blTipoCierre.ObtenerTipoCierrePorSolicitud(Convert.ToInt32(hdfCodSol.Value))

                    hdfMensajeTipoCierre.Value = "La solicitud fue cerrada con motivo: " & tipoCierre.Nombre

                End If

                'operador envio
                Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(-1, "<Seleccione>")
                UtilitarioWeb.Dataddl(ddlOperadorEnvio, lstOperador, "vcNomOpe", "P_inCodOpe")
                UtilitarioWeb.Dataddl(ddlOperadorEnvioExterno, lstOperador, "vcNomOpe", "P_inCodOpe")
                If lstOperador.Count = 2 Then
                    dvSeleccionOperador.Style("display") = "none"
                    ddlOperadorEnvio.SelectedIndex = 1

                    dvSeleccionOperadorExterno.Style("display") = "none"
                    ddlOperadorEnvioExterno.SelectedIndex = 1
                End If
                'escalamiento solo activo si el producto está en modo cloud y el tipo está configurado como SI
                If (HttpContext.Current.Session("IdDominio").ToString() = "") Then
                    hdfBiEscalamiento.Value = "0"
                End If

                'Registra auditoria...
                Dim oAuditoria As New ProcesaAuditoria
                oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
                oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.EditarSolicitud
                oAuditoria.NombreUsuario = oUsuario.vcUsu

                'AUDITORIA : Se inserta el Usuario Logeado
                oAuditoria.Tabla = Constantes.TableNames.Usuario
                oAuditoria.Acceso()

                TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
                'Dim inOrden As Integer = Convert.ToInt32(ddlFase.SelectedItem.Text.Substring(1, ddlFase.SelectedItem.Text.IndexOf("]") - 1))
                Dim dsCampos As DataSet = TipoSolicitud.ListarCamposConDatos(Convert.ToInt32(hdfCodSol.Value))

                'Control seleccion tecnico a asignar
                Dim idsTecnicos_TipSol As String = String.Empty
                For Each dr As DataRow In dsCampos.Tables(3).Rows
                    If (idsTecnicos_TipSol = String.Empty) Then
                        idsTecnicos_TipSol = dr("F_inUsu").ToString()
                    Else
                        idsTecnicos_TipSol = idsTecnicos_TipSol + "," + dr("F_inUsu").ToString()
                    End If
                Next
                'agregar tecnico asignado y administrador a la busqueda del control
                Dim inCodUsuTecAsig As String = String.Empty
                Dim vcCodIntEmp As String = String.Empty
                For Each dr As DataRow In dsCampos.Tables(1).Rows
                    Select Case dr("Campo")
                        Case "TecnicoAsignado"
                            If (dr("Valor").ToString() <> "") Then
                                inCodUsuTecAsig = "," + dr("Valor").ToString()
                            End If
                        Case "vcCodInt"
                            If (dr("Valor").ToString() <> "") Then
                                vcCodIntEmp = dr("Valor").ToString()
                            End If
                        Case "vcObservacion"
                            If hdfEstado_Apr.Value = "35" Then
                                trMotivoRecAnu.Style("display") = "none"
                                lblMotivo.Text = "Motivo de rechazo"
                                txtMotivo.Text = dr("Valor").ToString()
                            ElseIf hdfEstado.Value = "9" And hdfEstado_Apr.Value = "34" Then
                                trMotivoRecAnu.Style("display") = "none"
                                lblMotivo.Text = "Motivo de anulación"
                                txtMotivo.Text = dr("Valor").ToString()
                            End If
                    End Select
                Next
                If idsTecnicos_TipSol = String.Empty Then
                    idsTecnicos_TipSol = "1" + inCodUsuTecAsig
                Else
                    idsTecnicos_TipSol = idsTecnicos_TipSol + ",1" + inCodUsuTecAsig
                End If
                bpTecnicoAsignado.NombreEntidad = "Usuario"
                bpTecnicoAsignado.vcTab = "SEG_Usuario"
                bpTecnicoAsignado.TipoOrigen = 0
                bpTecnicoAsignado.Condicion = "btEst = 1 And P_inCod in (" + idsTecnicos_TipSol + ")"
                bpTecnicoAsignado.FuncionPersonalizada = "fnMostrarTecnico"
                bpTecnicoAsignado.RutaRaiz = "../../../"
                bpTecnicoAsignado.Contenedor = "dvTecnicoAsigndo"

                Dim vcTecnicos As String = Session("vcTecnicos")
                If vcTecnicos <> "" Then bpTecnicoAsignado.Condicion = bpTecnicoAsignado.Condicion + " And P_inCod in (" + vcTecnicos + ")"

                'Fin control

                Dim scriptPermisos As String = String.Empty
                'Permisos  Aprobación
                Dim hayPermApr As Boolean = False
                hdfResApr.Value = "0"
                scriptPermisos += "var PermisosAprobacion = ["
                For Each SolicitudTipo As ENT_MOV_SolicitudTipo In oUsuario.TipoSolicitudAprobacion
                    If SolicitudTipo.inCodTipSol = hdfCodTipSol.Value Then
                        scriptPermisos += "{ CodTipSol: '" + SolicitudTipo.inCodTipSol.ToString() + "', Nombre: '" + SolicitudTipo.vcNomTipSol.ToString() + "' },"
                        hdfResApr.Value = "1"
                        hayPermApr = True
                    End If
                Next
                If hayPermApr Then
                    scriptPermisos = scriptPermisos.Substring(0, scriptPermisos.Length - 1)
                End If
                scriptPermisos += "];"

                Solicitudes = New BL_MOV_Solicitud(oUsuario.IdCliente)

                Dim ValidaPermiso As Boolean = False
                ValidaPermiso = Solicitudes.ValidarPermisoCodint_Tecnico(Convert.ToInt32(Session("Usuario").P_inCod), vcCodIntEmp)

                'Permisos de Técnico
                Dim hayPermTec As Boolean = False
                Dim vcCrear As String = "False"
                Dim vcEditar As String = "False"
                Dim vcEliminar As String = "False"
                scriptPermisos += "var PermisosTecnico = ["
                For Each TipoSolicitud_Usuario As ENT_MOV_TipoSolicitud_Usuario In oUsuario.TipoSolicitudTecnico
                    If TipoSolicitud_Usuario.F_inTipSol = hdfCodTipSol.Value Then
                        If vcCodIntEmp.StartsWith(oUsuario.F_vcCodInt) Or oUsuario.F_vcCodInt = "" Or ValidaPermiso Then
                            vcCrear = TipoSolicitud_Usuario.biCrear.ToString()
                            vcEditar = TipoSolicitud_Usuario.biEditar.ToString()
                            vcEliminar = TipoSolicitud_Usuario.biEliminar.ToString()
                        Else
                            vcCrear = "False"
                            vcEditar = "False"
                            vcEliminar = "False"
                        End If
                        scriptPermisos += "{ Crear: '" + vcCrear + "', Editar: '" + vcEditar + "', Eliminar: '" + vcEliminar + "', Leer: '" + TipoSolicitud_Usuario.biLeer.ToString() + "' },"
                        hayPermTec = True
                    End If
                Next
                If hayPermTec Then
                    scriptPermisos = scriptPermisos.Substring(0, scriptPermisos.Length - 1)
                End If
                scriptPermisos += "];"

                'Permisos propietario
                Dim hayPermPropie As Boolean = False
                scriptPermisos += "var PermisosPropietario = ["
                For Each TipSolGrupoOrigen As ENT_MOV_TipoSolicitud_GrupoOrigen In oUsuario.TipoSolicitudGrupoOrigen
                    If TipSolGrupoOrigen.F_inTipSol = hdfCodTipSol.Value Then
                        scriptPermisos += "{ Crear: '" + TipSolGrupoOrigen.biCrear.ToString() + "', Editar: '" + TipSolGrupoOrigen.biEditar.ToString()
                        scriptPermisos += "', Eliminar: '" + TipSolGrupoOrigen.biEliminar.ToString() + "', Leer: '" + TipSolGrupoOrigen.biLeer.ToString() + "'},"
                        hayPermPropie = True
                    End If
                Next
                If hayPermPropie Then
                    scriptPermisos = scriptPermisos.Substring(0, scriptPermisos.Length - 1)
                End If
                scriptPermisos += "];"

                'Verificar si usuario es tecnico
                'If UtilitarioWeb.TipoSolicitud.EsTecnico Then hdfTecnico.Value = "1"

                Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
                Dim dsEstadoAprobacion As DataSet = TipoSolicitud.ListarEstadosPersonalizadosPorTipo(2)
                Dim dsEstadoProceso As DataSet = TipoSolicitud.ListarEstadosPersonalizadosPorTipo(3)

                'Array de estados de proceso y aprobacion
                scriptPermisos += "var Estados = [];"
                For Each dr As DataRow In dsEstadoAprobacion.Tables(0).Rows
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'] = [];"
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Id = '" + dr("P_inCod").ToString() + "';"
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Nombre = '" + dr("vcNom").ToString() + "';"
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Tipo = '2';"
                Next
                For Each dr As DataRow In dsEstadoProceso.Tables(0).Rows
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'] = [];"
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Id = '" + dr("P_inCod").ToString() + "';"
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Nombre = '" + dr("vcNom").ToString() + "';"
                    scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Tipo = '3';"
                Next

                'Nombre de tipo de solicitud
                lblNombreTipoSolicitud.Text = dsCampos.Tables(2).Rows(0)("vcNomTipSol").ToString().ToUpper()
                ttgInfoSol.Mensaje = dsCampos.Tables(2).Rows(0)("Descripcion1").ToString() 'edgar garcia 13022023
                ttgInfoSol.Ancho = "200px" 'edgar garcia 15022023
                ttgInfoSol.AnchoBanner = "220px" 'edgar garcia 15022023


                Dim solicitudTerminada As Integer = 0

                'Motivo de rechazo o anulación de la solicitud
                If hdfEstado_Apr.Value = "35" OrElse
                        (hdfEstado.Value = "9" And hdfEstado_Apr.Value = "34") OrElse
                        hdfEstado.Value = "7" Then

                    '35: Rechazo, 9-34:Anulacion, 7: Cierre
                    tbResumenCierre.Visible = True
                    trMotivoRecAnu.Style("display") = "none"
                    lblMotivo.Text = "Motivo"
                    txtTipoCierre.Text = dsCampos.Tables(2).Rows(0)("TipoCierre").ToString()

                    solicitudTerminada = 1

                    TxtMotivoCierre.Text = dsCampos.Tables(2).Rows(0)("vcObservacion").ToString()
                End If


                If dsCampos.Tables(2) IsNot Nothing AndAlso dsCampos.Tables(2).Rows.Count > 0 Then
                    hdfbiEnviarOperador.Value = IIf(Convert.ToBoolean(dsCampos.Tables(2).Rows(0)("biEnviarOperador")), "1", "0")
                End If

                'selección de financiamiento wapumayta 10.11.18
                If dsCampos.Tables(2) IsNot Nothing AndAlso dsCampos.Tables(2).Rows.Count > 0 Then
                    hfdUsaFinanciamiento.Value = dsCampos.Tables(2).Rows(0)("UsaFinanciamiento")
                    If (Not Convert.ToBoolean(hfdUsaFinanciamiento.Value)) Then
                        trFInanciamiento.Style("display") = "none"
                    Else
                        trFInanciamiento.Style("display") = ""

                        'Dim General = New General()
                        'Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                        'If inTipoLinea <> 0 Then
                        '    UtilitarioWeb.Dataddl(ddlFinanciamiento, ListarFinanciamiento(inTipoLinea), "DescripcionCorta", "IdTipoFinanciamiento")
                        'End If

                        Dim lstFinanciamientoTipo As List(Of MOV_CAM_FinanciamientoTipo)
                        FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        lstFinanciamientoTipo = FinanciamientoTipo.ListarPorTipoLinea(1)
                        lstFinanciamientoTipo.Insert(0, New MOV_CAM_FinanciamientoTipo With {.IdTipoFinanciamiento = "0", .Descripcion = "<Ninguno>"})
                        UtilitarioWeb.Dataddl(ddlFinanciamiento, lstFinanciamientoTipo, "Descripcion", "IdTipoFinanciamiento")
                        If (Not IsDBNull(dsCampos.Tables(2).Rows(0)("IdTipoFinanciamiento"))) Then
                            ddlFinanciamiento.SelectedValue = Convert.ToInt32(dsCampos.Tables(2).Rows(0)("IdTipoFinanciamiento"))
                        End If
                    End If
                End If

                If dsCampos.Tables(2) IsNot Nothing AndAlso dsCampos.Tables(2).Rows.Count > 0 Then

                    hfdBiCostoFijo.Value = dsCampos.Tables(2).Rows(0)("biMontoFijo")
                    If (Not Convert.ToBoolean(hfdBiCostoFijo.Value)) Then
                        trMontoFijo.Style("display") = "none"
                    Else
                        trMontoFijo.Style("display") = ""
                    End If
                End If

                'Técnico responsable
                hdfTecnicoResponsable.Value = "0"
                If (dsCampos.Tables(2).Rows(0)("inTecnicoResponsable").ToString() = oUsuario.P_inCod.ToString()) Then
                    hdfTecnicoResponsable.Value = "1"
                End If
                If ((hdfEstado.Value = "6" Or hdfEstado.Value = "8") AndAlso hdfEstado_Apr.Value = "34") Then
                    If (hdfTecnicoResponsable.Value = "1" OrElse hdfAdmin.Value = "1") Then
                        trAsignarA.Style("display") = ""
                    End If
                End If
                'Fin técnico responsable

                Dim blnDesCon As Boolean = False
                If hdfPropie.Value = "1" And hdfAdmin.Value = "0" And Not TienePermisoEdicion() And hdfEstado_Apr.Value = "32" Then
                    blnDesCon = True
                End If


                If (hdfEstado.Value = "7") Then
                    Dim filaArchivoAdjunto As DataRow
                    filaArchivoAdjunto = dsCampos.Tables(0).NewRow()
                    filaArchivoAdjunto("P_inCod") = 0
                    filaArchivoAdjunto("vcNomCam") = "ArchivoAdjuntoFinal"
                    filaArchivoAdjunto("vcDesCam") = "Adjuntar (pdf,zip,rar,xlsx)"
                    filaArchivoAdjunto("dcTipDatSQL") = "VARBINARY"
                    filaArchivoAdjunto("vcLon") = "zip,rar,pdf,xlsx"
                    filaArchivoAdjunto("dcTipDat") = "Archivo Adjunto"
                    filaArchivoAdjunto("F_inCodTipDat") = 9
                    filaArchivoAdjunto("Visible") = True
                    filaArchivoAdjunto("Editable") = True
                    filaArchivoAdjunto("Obligatorio") = False
                    filaArchivoAdjunto("TraerDatosFilabp") = False
                    filaArchivoAdjunto("vcValor") = ""
                    filaArchivoAdjunto("byArchivo") = Nothing
                    If dsCampos.Tables.Count > 5 Then
                        Dim dtAdjuntos As DataTable = dsCampos.Tables(5)
                        If dtAdjuntos.Rows.Count > 0 Then
                            filaArchivoAdjunto("vcValor") = dtAdjuntos.Rows(0)("vcNomAdj")
                            filaArchivoAdjunto("byArchivo") = dtAdjuntos.Rows(0)("binData")
                        End If
                    End If
                    dsCampos.Tables(0).Rows.Add(filaArchivoAdjunto)
                End If

                BLOrganizacion = New BL_GEN_OrganizacionG(oUsuario.IdCliente)
                Try
                    hdfAreaRequiereAutorizacion.Value = BLOrganizacion.ObtenerRequiereAutorizacionAreaPorIdEmpleado(hdfCodEmp.Value).ToString()
                Catch ex As Exception
                    hdfAreaRequiereAutorizacion.Value = "0"
                End Try

                Try
                    hdfSolRequiereAutorizacion.Value = dsCampos.Tables(2).Rows(0)("btRequerirAutorizacion").ToString()
                Catch ex As Exception
                    hdfSolRequiereAutorizacion.Value = "0"
                End Try
                Try
                    hdfSolicitudAutorizada.Value = dsCampos.Tables(2).Rows(0)("btSolAutorizada").ToString()
                Catch ex As Exception
                    hdfSolicitudAutorizada.Value = "0"
                End Try

                Try
                    hdfEsAutorizador.Value = BLOrganizacion.ValidarEsAutorizadorPorIdEmpleado(oUsuario.Empleado.P_vcCod)
                Catch ex As Exception
                    hdfEsAutorizador.Value = "0"
                End Try

                scriptPermisos += GeneralMantenimiento.Instance.CrearControlesSolicitudPersonalizada(dsCampos.Tables(0), dsCampos.Tables(4),
                                                                                                    tbCamposDinamicos,
                                                                                                    hdfCodEmp.Value + "_" + hdfCodSol.Value,
                                                                                                    True, blnDesCon,
                                                                                                    hdfCodTipSol.Value, solicitudTerminada)
                Dim vcReturn As String
                vcReturn = MostrarDatos(dsCampos.Tables(0), dsCampos.Tables(1), dsCampos.Tables(2), oUsuario.P_inCod)
                Solicitud.RegistrarSeguimientoVisto(Convert.ToInt32(hdfCodSol.Value), oUsuario.P_inCod, oUsuario.vcUsu)
                Solicitud.Dispose()

                vcReturn = vcReturn.Replace(Chr(10), "<BR>")

                scriptPermisos += vcReturn '"var vcResumen = '" + strResumen + "';"


                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", scriptPermisos, True)
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then TipoSolicitud.Dispose()
            If Solicitudes IsNot Nothing Then Solicitudes.Dispose()
            If Operador IsNot Nothing Then Operador.Dispose()
            If blTipoCierreSolicitud IsNot Nothing Then blTipoCierreSolicitud.Dispose()
            If blTipoPausaSolicitud IsNot Nothing Then blTipoPausaSolicitud.Dispose()
            If oSoliciTudPausa IsNot Nothing Then oSoliciTudPausa.Dispose()
            If oSoliciTudPausa IsNot Nothing Then oSoliciTudPausa.Dispose()
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
            If FinanciamientoTipo IsNot Nothing Then FinanciamientoTipo.Dispose()
            If BLOrganizacion IsNot Nothing Then BLOrganizacion.Dispose()
            'If Not IsNothing(Operador) Then Operador.Dispose()
        End Try
    End Sub

    Public Function MostrarDatos(ByVal dtCampos As DataTable, ByVal dtCamposBasicos As DataTable, ByVal dtCamposFinanciamiento As DataTable, ByVal CodUsuario As Integer) As String
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        'Dim Usuario As BL_SEG_Usuario = new BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyDecimalSeparator = oCultura.vcSimDec.ToString()
        System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyGroupSeparator = oCultura.vcSimSepMil.ToString()
        System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec.ToString()
        System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil.ToString()

        Dim objControlFinder As New ControlFinder
        Dim Cese As BL_MOV_FAC_Cese = Nothing
        Dim vcReturn As String = ""
        Dim vcDataObject As String = "var valoresInicial = ["

        Try

            For Each dr As DataRow In dtCampos.Rows
                If Not IsDBNull(dr("Visible")) AndAlso Convert.ToBoolean(dr("Visible")) AndAlso dr("vcNomCam").ToString() <> "vcCodigo" Then
                    If Not IsDBNull(dr("vcValor")) Then
                        Dim vcValor As String = dr("vcValor").ToString()
                        If dr("F_inCodTipDat") = "6" Or dr("F_inCodTipDat") = "8" Then 'Lógico y Picklist
                            Dim ddlLista As DropDownList = CType(objControlFinder.FindControlRecursive(Me, "ddl_" + dr("vcNomCam")), DropDownList)
                            ddlLista.SelectedValue = dr("vcValor").ToString()
                        ElseIf dr("F_inCodTipDat") = "11" Then 'Periodo
                            If vcValor.Length > 0 And vcValor <> "19000101 00:00:00" Then
                                vcValor = vcValor.Substring(4, 2) + "/" + vcValor.Substring(0, 4)
                            Else
                                vcValor = ""
                            End If
                            CType(objControlFinder.FindControlRecursive(Me, "txt_" + dr("vcNomCam")), TextBox).Text = vcValor
                        ElseIf dr("F_inCodTipDat") = "2" Then 'Fecha
                            If vcValor.Length > 0 And vcValor <> "19000101 00:00:00" Then
                                vcValor = vcValor.Substring(6, 2) + "/" + vcValor.Substring(4, 2) + "/" + vcValor.Substring(0, 4)
                            Else
                                vcValor = ""
                            End If
                            CType(objControlFinder.FindControlRecursive(Me, "txt_" + dr("vcNomCam")), TextBox).Text = vcValor
                        ElseIf dr("F_inCodTipDat") = "3" Then 'Fecha - Hora
                            If vcValor.Length > 0 And vcValor <> "19000101 00:00:00" Then
                                'vcValor = Utilitario.DevuelveFechaHoraFormateada(vcValor, oCultura.vcFecCor + " " + oCultura.vcHorCor)
                                vcValor = UtilitarioWeb.DevuelveFechaHoraFormateada(vcValor, "dd/MM/yyyy HH:mm:ss")
                            Else
                                If dr("vcNomCam") = "daFechaModificacion" Then
                                    vcValor = DateTime.Now.ToString(oCultura.vcFecCor + " " + oCultura.vcHorCor)
                                End If
                            End If
                            CType(objControlFinder.FindControlRecursive(Me, "txt_" + dr("vcNomCam")), TextBox).Text = vcValor
                        ElseIf dr("F_inCodTipDat") = "9" Then 'Archivo Adjunto

                        ElseIf dr("F_inCodTipDat") = "10" Then 'Referencia

                        Else
                            If dr("vcNomCam") = "inUsuarioModificacion" Then
                                'vcValor = oUsuario.P_inCod & " - " & oUsuario.vcUsu & " - " & oUsuario.vcNom
                                vcValor = oUsuario.vcNom
                            ElseIf dr("vcNomCam") = "inUsuarioCreacion" Then
                                Dim NomUsuCreac As String = dr("vcValor").ToString().Substring(dr("vcValor").ToString().IndexOf("-") + 1)
                                vcValor = NomUsuCreac.Trim()
                            ElseIf dr("vcNomCam") = "F_inEstSol" Then
                                vcValor = ddlEstadoSolicitud.Items.FindByValue(vcValor).Text
                            End If
                            CType(objControlFinder.FindControlRecursive(Me, "txt_" + dr("vcNomCam")), TextBox).Text = vcValor
                        End If

                        vcDataObject += "'" + vcValor + "',"
                    End If
                    If dr("vcNomCam") = "F_vcCodEmp" Then
                        Dim td As New HtmlTableCell
                        td = CType(objControlFinder.FindControlRecursive(Me, "txt_" + dr("vcNomCam")), TextBox).Parent
                        td.ID = "tdCodEmpl"
                    End If
                End If
                If dr("vcNomCam") = "inUsuarioCreacion" Then
                    If dr("vcValor").ToString() = "" Then
                        hdfUsuarioCreacion.Value = "0"
                    Else
                        Dim codUsuCreac As String = dr("vcValor").ToString().Substring(0, dr("vcValor").ToString().IndexOf("-")).Trim()
                        If codUsuCreac = oUsuario.P_inCod Then
                            hdfUsuarioCreacion.Value = "1"
                        End If
                    End If
                End If

                'Solicitud de Cesión
                If hdfCodTipSol.Value = "31" AndAlso dr("vcNomCam") = "inTipoCese" Then
                    Cese = New BL_MOV_FAC_Cese(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

                    Dim lista As New List(Of ENT_MOV_FAC_EstadoCuenta)
                    lista = Cese.Listar_DeudaTotalxCese(hdfCodEmp.Value, Convert.ToInt32(dr("vcValor")))

                    hdfTipoCese.Value = dr("vcValor").ToString()
                    hdfMontoCese.Value = lista.Item(0).MontoPagar.ToString()
                End If
            Next

            vcDataObject = vcDataObject.Substring(0, (vcDataObject.Length - 1))
            vcDataObject += "];"

            Dim NumeroCuotas As Integer = 0
            Dim PeriodoGracia As Integer = 0
            hdfTipoMonto.Value = ""
            For Each dr As DataRow In dtCamposBasicos.Rows
                Select Case dr("Campo")
                    Case "Fraccionamiento"
                        hdfFraccionamiento.Value = dr("Valor").ToString()
                    Case "Fraccionar"
                        ddlFraccionamiento.SelectedValue = dr("Valor").ToString()
                    Case "Monto"
                        If hdfCodTipSol.Value = "31" AndAlso hdfTipoCese.Value = "1" Then
                            txtMonto.Text = hdfMontoCese.Value
                        Else
                            If (Not IsDBNull(dr("Valor"))) Then
                                hdfTipoMonto.Value = "EMP"
                                txtMonto.Text = DevuelveNumeroFormateado(dr("Valor").ToString(), DevuelveFormatoNumeroGenerico(oCultura))
                            End If
                        End If
                        If hdfAdmin.Value = "1" Then
                            txtMonto.Enabled = True
                        End If
                    Case "Codigo"
                        CType(objControlFinder.FindControlRecursive(Me, "Lbl" + dr("Campo")), Label).Text = dr("Valor").ToString()
                    Case "PeriodoGracia"
                        txtPeriodoGracia.Text = dr("Valor").ToString()
                    Case "TecnicoAsignado"
                        If (dr("Valor").ToString() <> "") Then
                            bpTecnicoAsignado.CodigoValor = Convert.ToInt32(dr("Valor"))
                            If (oUsuario.P_inCod = Convert.ToInt32(dr("Valor"))) Then hdfTecnicoAsignado.Value = "1" Else hdfTecnicoAsignado.Value = "0"
                        End If
                    ''Case "vcFinanciamiento"
                    ''    txtNombreFinanc.Text = dr("Valor").ToString()
                    ''Case "inFinanciamiento"
                    ''    hdfIdFInanciamiento.Value = dr("Valor").ToString()
                    ''    If hdfIdFInanciamiento.Value = "0" Then
                    ''        trFInanciamiento.Style("display") = "none"
                    ''    End If
                    Case "btBotRef" 'JHERRERA 20150311: Nueva configuración (botón refrescar)
                        If dr("Valor").ToString() = "0" Then btnRefrescar.Style("display") = "none"
                    Case "vcResumen"
                        'Edgar Garcia 14022023 se agrego el + ,tiene logica y no afecta la declaracion
                        vcReturn = "var vcResumen = '" + dr("Valor").ToString() + "'; "
                    Case "MontoCIA"
                        If (Not IsDBNull(dr("Valor"))) Then
                            hdfTipoMonto.Value = "CIA"
                            txtMonto.Text = DevuelveNumeroFormateado(dr("Valor").ToString(), DevuelveFormatoNumeroGenerico(oCultura))
                        End If
                    Case "btEnOper_Repa"
                        vcReturn += "var btEnOperRepa = '" + dr("Valor").ToString() + "'; "
                    Case "vcTecnicoCierre"
                        lblTecnicoCierre.Text = dr("Valor").ToString()
                       'Edgar Garcia 14022023 se agrego el este case para mostrarlo en el resumen de solicitud  
                    Case "vcResumenIndividual"
                        vcReturn += "var vcResumenIndividual = '" + dr("Valor").ToString() + "'; "
                End Select
            Next

            vcReturn += vcDataObject

            'datos para financiamiento si el tipo de solicitud lo tiene
            If IsDBNull(dtCamposFinanciamiento.Rows(0)("IdTipoFinanciamiento")) Then
                trMesesCuotas.Style("display") = "none"
                txtMesesCuotas.Text = "0"
                trPeriodoGracia.Style("display") = "none"
                trMontoFijo.Style("display") = "none"
            Else
                'NÚMERO DE CUOTAS
                hdfNumMinCuo.Value = "0"
                hdfNumMaxCuo.Value = "0"
                hdfMesesCuotas.Value = ""
                If Convert.ToBoolean(dtCamposFinanciamiento.Rows(0)("PagoContado") Or IsDBNull(dtCamposFinanciamiento.Rows(0)("IdTipoFinanciamiento"))) Then
                    trMesesCuotas.Style("display") = "none"
                    txtMesesCuotas.Text = "0"
                Else
                    trMesesCuotas.Style("display") = ""
                    txtMesesCuotas.Text = dtCamposFinanciamiento.Rows(0)("Cuotas").ToString()
                    If dtCamposFinanciamiento.Rows(0)("MinimoCuotas").ToString() <> "" And dtCamposFinanciamiento.Rows(0)("MaximoCuotas").ToString() <> "" Then 'Rango de número de cuotas
                        'txtMesesCuotas.Text = ""
                        hdfNumMinCuo.Value = dtCamposFinanciamiento.Rows(0)("MinimoCuotas").ToString()
                        hdfNumMaxCuo.Value = dtCamposFinanciamiento.Rows(0)("MaximoCuotas").ToString()
                        lblMesesCuotas.Text = "El número de cuotas debe estar en el rango de " + hdfNumMinCuo.Value + " y " + hdfNumMaxCuo.Value + "."
                    ElseIf dtCamposFinanciamiento.Rows(0)("MesesCuotas").ToString() <> "" Then 'Meses de Financiamiento Predefinido
                        Dim lstMeses As String() = dtCamposFinanciamiento.Rows(0)("MesesCuotas").ToString().Split(",")
                        txtMesesCuotas.Text = ""
                        hdfMesesCuotas.Value = dtCamposFinanciamiento.Rows(0)("MesesCuotas").ToString()
                        txtMesesCuotas.Text += dtCamposFinanciamiento.Rows(0)("MesesCuotas").ToString().Replace("12", "Dic").Replace("11", "Nov").Replace("10", "Oct").Replace("9", "Set").Replace("8", "Ago").Replace("7", "Jul").Replace("6", "Jun").Replace("5", "May").Replace("4", "Abr").Replace("3", "Mar").Replace("2", "Feb").Replace("1", "Ene")
                        'MesCuo = "1"
                        txtMesesCuotas.Enabled = False
                        txtMesesCuotas.Width = lstMeses.Length * 21
                    ElseIf dtCamposFinanciamiento.Rows(0)("Cuotas").ToString() <> "0" Then 'Número de cuotas preestablecido
                        txtMesesCuotas.Text = dtCamposFinanciamiento.Rows(0)("Cuotas").ToString()
                        txtMesesCuotas.Enabled = False
                    End If
                End If

                'PERIODO DE GRACIA
                hdfMinPerGra.Value = "0"
                hdfMaxPerGra.Value = "0"
                If IsDBNull(dtCamposFinanciamiento.Rows(0)("PeriodoGracia")) OrElse Convert.ToBoolean(dtCamposFinanciamiento.Rows(0)("PeriodoGracia")) = False Then
                    trPeriodoGracia.Style("display") = "none"
                    'txtPeriodoGracia.Text = "0"
                Else
                    trPeriodoGracia.Style("display") = ""
                    If dtCamposFinanciamiento.Rows(0)("MinimoMesesPeriodoGracia").ToString() <> "" And dtCamposFinanciamiento.Rows(0)("MaximoMesesPeriodoGracia").ToString() <> "" Then 'Rango de número de cuotas
                        hdfMinPerGra.Value = dtCamposFinanciamiento.Rows(0)("MinimoMesesPeriodoGracia").ToString()
                        hdfMaxPerGra.Value = dtCamposFinanciamiento.Rows(0)("MaximoMesesPeriodoGracia").ToString()
                        lblPeriodoGracia.Text = "El periodo de gracia debe estar en el rango de " + hdfMinPerGra.Value + " y " + hdfMaxPerGra.Value + "."
                    ElseIf dtCamposFinanciamiento.Rows(0)("MesesPeriodoGracia").ToString() <> "0" Then 'Número de meses de periodo de gracia
                        txtPeriodoGracia.Enabled = False
                    End If
                End If

                If hdfCodTipSol.Value = "29" OrElse hdfCodTipSol.Value = "30" Then 'Es devolución
                    trMontoFijo.Style("display") = "none"

                    'actualizar en versión 3.1 (3)
                    If Not IsNothing(objControlFinder.FindControlRecursive(Me, "txt_IGV")) AndAlso Not IsNothing(objControlFinder.FindControlRecursive(Me, "txt_ImporteTotal")) Then
                        hdfIGV.Value = dtCamposFinanciamiento.Rows(0)("dcIGV").ToString()
                        If (hdfEstado.Value = "6" Or hdfEstado.Value = "8") Then
                            'Dim objControlFinder As New ControlFinder
                            CType(objControlFinder.FindControlRecursive(Me, "txt_IGV"), TextBox).ReadOnly = True
                            CType(objControlFinder.FindControlRecursive(Me, "txt_ImporteTotal"), TextBox).ReadOnly = True
                        End If
                    Else
                        hdfIGV.Value = "0"
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try

        Return vcReturn
    End Function

    Private Function TienePermisoEdicion() As Boolean
        Dim blnTienePermiso As Boolean = False
        Dim lstTipos As String() = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudGrupo(3).Split(",")
        For i As Integer = 0 To lstTipos.Length - 1
            If lstTipos(i) = hdfCodTipSol.Value Then
                blnTienePermiso = True
            End If
        Next
        Return blnTienePermiso
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcCodEmp As String, ByVal vcAdmin As String, ByVal inCodSol As Integer, ByVal inCodTipSol As Integer,
                                      ByVal vcValAnt As String, ByVal vcUpdPer As String, ByVal inEstInicial As Integer, ByVal inEstFinal As Integer,
                                      ByVal biFraccionamiento As String, ByVal inNumeroCuotas As Integer, ByVal dcMonto As String,
                                      ByVal vcTabla As String, ByVal accion As String, ByVal vcAdj As String,
                                      ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer, ByVal vcComentario As String,
                                      ByVal vcTipoMonto As String, ByVal inTipoProducto As Integer, ByVal inTipoProceso As Integer,
                                      ByVal vcLinea As String, ByVal vcIMEI As String, ByVal IdFinanciamiento As String, ByVal IdTipoCierreSolicitud As String) As String


        Dim resultado As String = ""
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim Fac_Solicitud As BL_MOV_FAC_Solicitud = Nothing


        Try

            If Not IsNumeric(IdFinanciamiento) Then
                IdFinanciamiento = "-1"
            End If

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim biFrac As Boolean = False
            Dim biCreaPDF As Boolean = False
            Dim vcCodSol As String = ""
            'If (biFraccionamiento = "1") Then
            '    biFrac = True
            'End If

            vcUpdPer = vcUpdPer.Replace("$$$", "'")
            vcValAnt = vcValAnt.Replace("$$$", "'")

            Dim lstObj As New List(Of Object)
            If (vcAdj <> "") Then
                vcAdj = vcAdj.Substring(0, vcAdj.Length - 1)
                Dim lstAdjuntos As String() = vcAdj.Split(";")

                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

                For i As Integer = 0 To lstAdjuntos.Length - 1
                    Dim row As String() = lstAdjuntos(i).Split(",")

                    If row(1).Trim() <> "" Then 'Hay archivo Adjunto?

                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes" + CarpetaDominio + "//" + row(1)
                        Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                        Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                        fs.Close()

                        Dim dict As New Dictionary(Of String, Object)
                        dict.Add("Campo", row(0))
                        dict.Add("Archivo", byFileData)
                        dict.Add("Nombre", row(1))
                        lstObj.Add(dict)
                    End If
                Next
            End If

            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.Solicitud
            oAuditoria.Tabla = Constantes.TableNames.Solicitud

            'AUDITORIA:Actualizar Antes
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {inCodSol})
            'Se actualizan dato....

            'resultado = Solicitud.ActualizarPersonalizada(Convert.ToInt32(inCodSol), biFraccionamiento, Convert.ToInt32(vcMesesCuotas), Convert.ToDecimal("0" + dcMonto), _
            'Convert.ToInt32(inFas), vcUpdPer, oUsuario.P_inCod, oUsuario.vcUsu, oUsuario.Mail, oCultura.vcFecCor, oCultura.vcHorCor, vcValAnt, lstObj)
            Select Case (accion)
                Case "Guardar"
                    Solicitud.GuardarPersonalizada(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcUsu, inEstInicial, inEstFinal, "MOV_SOL_" + vcTabla,
                                                   biFrac, inNumeroCuotas, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)),
                                                   vcUpdPer, vcValAnt, lstObj, vcMesesCuotas, inMesesPeriodoGracia, "", "", False, IdFinanciamiento)
                    resultado = ""
                Case "GuardarAntesProcesar"
                    Solicitud.GuardarPersonalizadaAntesProcesar(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcUsu, "MOV_SOL_" + vcTabla, biFrac, inNumeroCuotas,
                                                                Convert.ToDecimal(DevuelveNumeroSinFormato(IIf(dcMonto = "", 0, dcMonto))), vcUpdPer, lstObj, vcMesesCuotas, inMesesPeriodoGracia, "", vcTipoMonto, IdFinanciamiento)
                Case "Procesar"
                    Dim TipSolFact As Integer = 1
                    If (inCodTipSol = 31) Then
                        TipSolFact = 3
                    End If

                    'TIPO MONTO (EMPLEADO, EMPRESA)
                    Dim dcMontoCia As Decimal = 0
                    Dim dcMontoEmp As Decimal = 0
                    If vcTipoMonto = "CIA" Then
                        dcMontoCia = Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto))
                    Else
                        dcMontoEmp = Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto))
                    End If
                    'FACTURACION
                    Dim dsDatosFac = Solicitud.DatosFacturacionSolicitud(inCodSol, vcLinea)

                    Dim sqlTrans As SqlTransaction = Nothing
                    Try
                        If (dsDatosFac.Tables(0).Rows.Count > 0 And dcMontoEmp > 0) Then
                            'Dim Fac_Solicitud As New BL_MOV_FAC_Solicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                            Fac_Solicitud = New BL_MOV_FAC_Solicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                            Dim oSolicitudFac As New ENT_MOV_FAC_Solicitud
                            Dim dr As DataRow = dsDatosFac.Tables(0).Rows(0)
                            vcCodSol = dr("vcCodigo").ToString()
                            Dim esDevolucion As Integer = 1
                            If (ComprobarBoolNULL(dr("esDevolucion"), False)) Then
                                esDevolucion = -1
                            End If
                            biFrac = If(inCodTipSol = 29 Or inCodTipSol = 30, False, True) 'Para solicitudes de devolución y cobro el flag de fraccionamiento siempre será false.
                            oSolicitudFac.Usuario = oUsuario.vcNom
                            oSolicitudFac.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                            oSolicitudFac.InTipSol = TipSolFact 'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitud
                            oSolicitudFac.DesSolicitud = dr("vcNomTipSol").ToString() + " (" + dr("vcCodigo").ToString() + ")" 'Descripcion que saldra en el estado de cuenta del usuario
                            oSolicitudFac.IdEmpleado = dr("F_vcCodEmp").ToString()
                            oSolicitudFac.NumCuotas = If(Convert.ToBoolean(dr("PagoContado")), 1, inNumeroCuotas) 'Numero de cuotas que se generara el cobro
                            oSolicitudFac.BiCuotasDefinidas = Convert.ToInt32(dr("biCuotasDefinidas")) 'flag que indica si se va a pagar en cuotas definidas
                            oSolicitudFac.MesesCuotas = dr("MesesCuotasDefinidas") 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                            oSolicitudFac.MontoCuota = Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)) * esDevolucion 'monto mensual a cobrar en cada cuota
                            oSolicitudFac.FechaSolicitud = dr("FechaActual").ToString() 'fecha actual
                            oSolicitudFac.biPeriodoGracia = If(Convert.ToBoolean(dr("PeriodoGracia")), 1, 0) 'flag que indica si tiene periodo de gracia
                            oSolicitudFac.MesesPeriodoGracia = inMesesPeriodoGracia 'los meses de periodo de gracia
                            oSolicitudFac.biInteres = If(Convert.ToBoolean(dr("Interes")), 1, 0) 'flag que indica si hay interes
                            oSolicitudFac.TipoInteres = dr("TipoInteres").ToString()
                            oSolicitudFac.TasaInteres = Convert.ToDecimal(dr("TasaInteres"))
                            oSolicitudFac.biPagoContado = If(Convert.ToBoolean(dr("PagoContado")), 1, 0) 'flag que indica si es pago al contado
                            oSolicitudFac.MesesCuotasDobles = dr("MesesCuotasDobles").ToString() 'meses que se cobra cuotas dobles separados por comas
                            oSolicitudFac.BiCuotasDobles = If(Convert.ToBoolean(dr("CuotasDobles")), 1, 0) 'flag que indica si se hace el cobro en cuotas dobles
                            oSolicitudFac.P_incodsol = inCodSol
                            oSolicitudFac.biFraccionar = biFrac
                            'JHERRERA 20150730: Nuevos campos
                            oSolicitudFac.IdTipoProducto = If(inTipoProducto = 1 Or inTipoProducto = 2, inTipoProducto, Val(dr("IdTipoProducto").ToString())) '1 = Equipo ,2 = Servicio
                            If oSolicitudFac.IdTipoProducto = 0 Then oSolicitudFac.IdTipoProducto = 2
                            oSolicitudFac.IdTipoProceso = If(TipSolFact = 3 Or inTipoProceso = 2, 2, 1) '1 = Regular, 2 = No Regular (Cese)
                            oSolicitudFac.IdTipoLinea = Convert.ToInt32(dr("inLineaTipo").ToString()) '1 = Staff, 2 = Familia
                            oSolicitudFac.Linea = vcLinea
                            oSolicitudFac.IMEI = vcIMEI
                            '------------------------------>>

                            Dim Mensaje As String = ""
                            Mensaje = Fac_Solicitud.Insertar_Solicitud(oSolicitudFac, sqlTrans)
                            'Fac_Solicitud.Dispose()

                            If Mensaje = "" Then
                                Solicitud.ProcesarSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcUsu, inEstInicial, inEstFinal, "MOV_SOL_" + vcTabla,
                                    biFrac, inNumeroCuotas, dcMontoEmp, vcUpdPer, vcValAnt, lstObj, dcMontoCia, sqlTrans, vcComentario, IdFinanciamiento, Integer.Parse(IdTipoCierreSolicitud))

                                biCreaPDF = True
                                resultado = ""
                                'Solicitud.AsignaEspecialistaCierreSolicitud(inCodSol, oUsuario.P_inCod, oUsuario.IdCliente)
                            Else
                                resultado = Mensaje
                            End If
                        Else
                            Solicitud.ProcesarSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcUsu, inEstInicial, inEstFinal, "MOV_SOL_" + vcTabla,
                                       biFrac, inNumeroCuotas, dcMontoEmp, vcUpdPer, vcValAnt, lstObj, dcMontoCia, sqlTrans, vcComentario, IdFinanciamiento, Integer.Parse(IdTipoCierreSolicitud))
                            'Solicitud.AsignaEspecialistaCierreSolicitud(inCodSol, oUsuario.P_inCod, oUsuario.IdCliente)
                            resultado = ""
                        End If
                    Catch ex As Exception
                        If sqlTrans IsNot Nothing Then
                            sqlTrans.Rollback()
                            sqlTrans = Nothing
                        End If
                        Dim mensajeError As String = ex.Message
                        If mensajeError.Contains("ERROR|") Then
                            resultado = mensajeError.Split("|")(1)
                        Else
                            resultado = "Error al intentar guardar la solicitud. La nueva línea  ya existe ó la línea anterior no se encuentra asignada (solicitud o pedido pendientes)."
                        End If
                        'resultado = "Error al intentar guardar la solicitud. Comuníquese con su administrador"
                    Finally
                        If sqlTrans IsNot Nothing Then
                            If resultado = "" Then
                                sqlTrans.Commit()
                                Solicitud.AsignaEspecialistaCierreSolicitud(inCodSol, oUsuario.P_inCod, oUsuario.IdCliente)
                            Else
                                sqlTrans.Rollback()
                                sqlTrans = Nothing
                            End If
                        End If
                    End Try

                    If biCreaPDF Then
                        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Solicitudes//AutorizacionDescuento//", "//")

                        Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Solicitudes//AutorizacionDescuento" + CarpetaDominio + "//"
                        Dim vcAutDesPDF As String = Solicitud.Reporte_AutorizacionDescuento(inCodSol, vcCodSol, vcRuta, vcCodEmp, oUsuario.P_inCod, oCultura)
                    End If

                    'FIN FACTURACIÓN
                Case "Anular"
                    Solicitud.AnularSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcUsu, inEstInicial, inEstFinal, "MOV_SOL_" + vcTabla,
                                                       biFrac, inNumeroCuotas, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)), vcUpdPer, vcValAnt, lstObj, vcComentario, "", Integer.Parse(IdTipoCierreSolicitud))
                    resultado = ""
            End Select
            Solicitud.Dispose()

            If resultado = "" Then
                'AUDITORIA:Actualizar Despues
                oAuditoria.Tabla = Constantes.TableNames.Solicitud
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes)

                oAuditoria.Tabla = Constantes.TableNames.SolicitudPersonalizada + vcTabla
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
            If Fac_Solicitud IsNot Nothing Then Fac_Solicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function PausarSolicitud(ByVal idSolicitud As String, ByVal idTipoPausa As String, ByVal mensajePausa As String) As String
        Dim blPausaSolicitud As BL_MOV_PausaSolicitud = Nothing
        Dim resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            blPausaSolicitud = New BL_MOV_PausaSolicitud(oUsuario.IdCliente)

            blPausaSolicitud.PausarSolicitud(Integer.Parse(idSolicitud), Integer.Parse(idTipoPausa), oUsuario.P_inCod, mensajePausa)

            resultado = "La solicitud ha sido pausada."

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blPausaSolicitud IsNot Nothing Then blPausaSolicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ReanudarSolicitud(ByVal idSolicitud As String, ByVal idTipoPausa As String) As String
        Dim blPausaSolicitud As BL_MOV_PausaSolicitud = Nothing
        Dim resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            blPausaSolicitud = New BL_MOV_PausaSolicitud(oUsuario.IdCliente)

            Dim esAdmin As Boolean = False
            If UtilitarioWeb.TipoSolicitud.EsTecnico() Or UtilitarioWeb.Seguridad.EsAdministrador Then
                esAdmin = True
            End If

            blPausaSolicitud.ReanudarSolicitud(Integer.Parse(idSolicitud), oUsuario.P_inCod, esAdmin, Convert.ToInt32(idTipoPausa))

            resultado = "La solicitud ha sido reanudada."

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blPausaSolicitud IsNot Nothing Then blPausaSolicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function AsignarSolicitudA(ByVal vcCodSol As String, ByVal inCodTipSol As Integer, ByVal inUsuAsignado As Integer) As String

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
            resultado = Solicitud.AsignarSolicitudA(vcCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inUsuAsignado)
            Solicitud.Dispose()
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
    Public Shared Function MostrarDatosFInanciamiento(ByVal IdFinanciamiento) As MOV_CAM_FinanciamientoTipo
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Dim Finan As MOV_CAM_FinanciamientoTipo = Nothing
        Try

            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Finan = FinanciamientoTipo.Mostrar(IdFinanciamiento)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try
        Return Finan
    End Function


    <WebMethod()>
    Public Shared Function ActualizarSoilcitudAutorizacionPorEvento(ByVal idSolicitud As String, ByVal idTipoEvento As String) As String
        Dim blSolicitud As BL_MOV_Solicitud = Nothing
        Dim resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            blSolicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            blSolicitud.ActualizarSolicitudAutorizacionPorEvento(Integer.Parse(idSolicitud), Integer.Parse(idTipoEvento), oUsuario.P_inCod)

            resultado = "OK|"

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blSolicitud IsNot Nothing Then blSolicitud.Dispose()
        End Try
        Return resultado
    End Function

End Class
