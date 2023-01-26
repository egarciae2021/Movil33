Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports UtilitarioWeb
Imports System.Web.Script.Services
Imports System.Data
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports System.Data.SqlClient
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Campana.BE
Imports VisualSoft.PCSistelMovil.Solicitudes.BL
Imports VisualSoft.PCSistelMovil.Solicitudes.BE

Partial Class P_Movil_Administrar_Solicitudes_Adm_ProcesarSolicitud
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TipoAdquisicion As BL_MOV_TipoAdquisicion = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim blTipoPausaSolicitud As BL_MOV_TipoPausaSolicitud = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    hdfTituloValeResguardo.Value = "" & ConfigurationManager.AppSettings("TituloValeResguardo")

                    hdfSolicitudesMultipleEspecialista.Value = HttpContext.Current.Session("SolicitudesMultipleEspecialista")

                    hdfConciliacion.Value = "" & Request.QueryString("concilia")
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
                    hdfPlanProcesar.Value = "-1"

                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

                    'licencia
                    hdfLicencia.Value = oUsuario.Empleado.Licencia

                    'propietario
                    'hdfPropie.Value = "0"
                    'If oUsuario.vcUsu = hdfCodEmp.Value Then
                    If oUsuario.Empleado.P_vcCod = hdfCodEmp.Value Then
                        hdfPropie.Value = "1"
                    End If

                    TipoAdquisicion = New BL_MOV_TipoAdquisicion(oUsuario.IdCliente)
                    UtilitarioWeb.Dataddl(ddlTipoAdquisicion, TipoAdquisicion.Listar(-1, "<Todos>"), "vcNom", "P_inCodTipAdq")

                    Dim blTipoCierreSolicitud As BL_MOV_TipoCierreSolicitud = New BL_MOV_TipoCierreSolicitud(oUsuario.IdCliente)
                    Dataddl(ddlTipoCierreSolicitud, blTipoCierreSolicitud.ListarTiposCierreSolicitud(), "Nombre", "Id")

                    blTipoPausaSolicitud = New BL_MOV_TipoPausaSolicitud(oUsuario.IdCliente)
                    Dim optionProcesar As ENT_MOV_TipoPausaSolicitud = New ENT_MOV_TipoPausaSolicitud(-1, "En Proceso", False)
                    Dim listaTipoPausa = New List(Of ENT_MOV_TipoPausaSolicitud)
                    listaTipoPausa.Add(optionProcesar)
                    listaTipoPausa.AddRange(blTipoPausaSolicitud.ListarTipoPausaSolicitud())

                    Dim oSoliciTudPausa As BL_MOV_PausaSolicitud = New BL_MOV_PausaSolicitud(oUsuario.IdCliente)
                    Dim tuplaTipoPausa As (Boolean, ENT_MOV_SolicitudPausa) = oSoliciTudPausa.ListarUltimaPausaSolicitud(Convert.ToInt32(hdfCodSol.Value))

                    If tuplaTipoPausa.Item1 Then
                        Dim elementoRemover = listaTipoPausa.Single(Function(r) r.IdTipoPausa <> tuplaTipoPausa.Item2.IdTipoPausa And r.IdTipoPausa <> -1)
                        listaTipoPausa.Remove(elementoRemover)
                    End If

                    Dataddl(ddlTipoPausa, listaTipoPausa, "Nombre", "IdTipoPausa")
                    hdfEnPausa.Value = tuplaTipoPausa.Item1

                    If (tuplaTipoPausa.Item1) Then
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

                        hdfOperadorDefault.Value = lstOperador(1).P_inCodOpe

                        dvSeleccionOperadorExterno.Style("display") = "none"
                        ddlOperadorEnvioExterno.SelectedIndex = 1
                    End If

                    'escalamiento solo activo si el producto está en modo cloud y el tipo está configurado como SI
                    If (HttpContext.Current.Session("IdDominio").ToString() = "") Then
                        hdfBiEscalamiento.Value = "0"
                    End If

                    hdfEsResponsableTI.Value = "0"
                    For Each oPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                        If oPerfil.CodigoPerfil = "GESSOL" Then hdfEsResponsableTI.Value = "1"
                    Next


                    Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
                    Dim ds As DataSet = Solicitud.MostrarSolicitudSistema(hdfCodSol.Value)


                    hdfFormatoAsignacion_Visible.Value = "0"
                    hdfFormatoAsignacion_Obligatorio.Value = "0"
                    hdfFormatoAsignacion_Editable.Value = "0"
                    hdfOrdenServicio_Visible.Value = "0"
                    hdfValeResguardo_Visible.Value = "0"
                    hdfOrdenServicio_Obligatorio.Value = "0"
                    hdfOrdenServicio_Editable.Value = "0"


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

                    'Permisos de Técnico
                    Dim vcCodIntEmp As String = ds.Tables(0).Rows(0)("vcCodInt").ToString()
                    Dim hayPermTec As Boolean = False
                    Dim vcCrear As String = "False"
                    Dim vcEditar As String = "False"
                    Dim vcEliminar As String = "False"

                    Dim ValidaPermiso As Boolean = False
                    ValidaPermiso = Solicitud.ValidarPermisoCodint_Tecnico(Convert.ToInt32(Session("Usuario").P_inCod), vcCodIntEmp)

                    scriptPermisos += "var PermisosTecnico = ["
                    For Each TipoSolicitud_Usuario As ENT_MOV_TipoSolicitud_Usuario In oUsuario.TipoSolicitudTecnico
                        If TipoSolicitud_Usuario.F_inTipSol = hdfCodTipSol.Value Then
                            'MAMAYA PONER LOGICA DE CODINT PERMITIDOS
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


                    If hdfCodTipSol.Value = "2" Then
                        trCuenta.Style("display") = ""
                    Else
                        trCuenta.Style("display") = "none"
                    End If

                    'datos de la solicitud
                    Dim dtDatosSolicitud As DataTable = ds.Tables(0)
                    Dim dtArchivosAdjuntos As DataTable = ds.Tables(1)
                    Dim dtDatosTablaPersonalisada As DataTable = ds.Tables(2)
                    Dim dtTecnicos As DataTable = ds.Tables(3)
                    Dim dtTipoSolicitud As DataTable = ds.Tables(4)
                    Dim dtEstados As DataTable = ds.Tables(5)
                    'Dim dtSeguimiento As DataTable = ds.Tables(6)
                    Dim dtCapturaDatos As DataTable = ds.Tables(7)
                    Dim dtResumen As DataTable = ds.Tables(8)

                    Dim dtCamposEstadosProceso As DataTable = ds.Tables(9)
                    Dim TablaSolicitud As String = ""

                    If dtTipoSolicitud IsNot Nothing AndAlso dtTipoSolicitud.Rows.Count > 0 Then
                        hdfbiEnviarOperador.Value = IIf(Convert.ToBoolean(dtTipoSolicitud.Rows(0)("biEnviarOperador")), "1", "0")
                        TablaSolicitud = dtTipoSolicitud.Rows(0)("vcTabla").ToString()
                    End If

                    Dim Filas As DataRow()
                    Dim byFileData As Byte()
                    Dim iEstado As String = dtDatosSolicitud.Rows(0)("F_inEstSol").ToString()
                    Dim CarpetaDominio As String = "", vcDiv As String = "", NombreCampoAdjunto As String = "",
                        NombreLabelCampoAdjunto As String = "", vcImagen As String = ""
                    CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento//", "//")


                    If TablaSolicitud = "Nuevo" Then 'Formato de Asignación sólo para Nuevo (para el caso de las personalizadas, es en otro formulario)
                        If dtCamposEstadosProceso IsNot Nothing AndAlso dtCamposEstadosProceso.Rows.Count > 0 Then
                            vcDiv = ""
                            NombreCampoAdjunto = "AdjuntoFormatoAsignacion"
                            NombreLabelCampoAdjunto = Trim("" & dtDatosSolicitud(0)("AdjNom_AdjuntoFormatoAsignacion"))
                            Filas = dtCamposEstadosProceso.Select("Nombre = '" & NombreCampoAdjunto & "' AND IdEstado = " & iEstado)
                            byFileData = IIf(Convert.IsDBNull(dtDatosSolicitud(0)(NombreCampoAdjunto)), Nothing, dtDatosSolicitud(0)(NombreCampoAdjunto))
                            If Filas.Count > 0 Then
                                hdfFormatoAsignacion_Visible.Value = IIf(Filas(0)("Visible").ToString() = "True", "1", "0")
                                hdfFormatoAsignacion_Obligatorio.Value = IIf(Filas(0)("Obligatorio").ToString() = "True", "1", "0")
                                hdfFormatoAsignacion_Editable.Value = IIf(Filas(0)("Editable").ToString() = "True", "1", "0")
                                If byFileData IsNot Nothing AndAlso NombreLabelCampoAdjunto <> "" AndAlso byFileData.Length > 0 Then
                                    If hdfFormatoAsignacion_Visible.Value = "1" Then
                                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento" + CarpetaDominio + "//" + NombreLabelCampoAdjunto
                                        If byFileData.Length > 0 Then
                                            File.WriteAllBytes(vcFilePath, byFileData)
                                            If hdfFormatoAsignacion_Editable.Value = "1" Then
                                                vcImagen = "<img src='../../../Common/Images/remove.png' onclick=""DeleteFileMantenimiento('../Mantenimiento/','" + NombreLabelCampoAdjunto + "','" + NombreCampoAdjunto + "')""/>"
                                            End If
                                        End If
                                    End If
                                    vcDiv += "<div id='upl_" + NombreCampoAdjunto + "' obj='" + NombreCampoAdjunto + "' oblig='" + Convert.ToBoolean(Filas(0)("Obligatorio")).ToString() + "' "
                                    vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='pdf,zip,rar' class='VARBINARY imgButton' style='text-align:left; display: none;' "
                                    vcDiv += "align='center' style='text-align:left;'><table><tr>"
                                    vcDiv += "<td style='text-align:left;'><img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/></td>"
                                    vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                                    vcDiv += "<div style='text-decoration:underline'; id='file_" + NombreCampoAdjunto + "'>"
                                    vcDiv += "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' >" + vcImagen
                                    vcDiv += "<span style='margin-left:5px;' id='span_" + NombreCampoAdjunto + "' style='text-decoration:underline;' nombre='" + NombreLabelCampoAdjunto + "'>"
                                    vcDiv += NombreLabelCampoAdjunto + "</span></div></div>"
                                    UploadDiv_FormatoAsignacion.InnerHtml = vcDiv
                                Else
                                    If hdfFormatoAsignacion_Editable.Value = "0" Then
                                        UploadDiv_FormatoAsignacion.InnerHtml = ""
                                    End If
                                End If
                            End If
                        End If
                    End If

                    vcDiv = ""
                    NombreCampoAdjunto = "AdjuntoOrdenServicio"
                    NombreLabelCampoAdjunto = Trim("" & dtDatosSolicitud(0)("AdjNom_AdjuntoOrdenServicio"))
                    Filas = dtCamposEstadosProceso.Select("Nombre = 'AdjuntoOrdenServicio' AND IdEstado = " & iEstado)
                    byFileData = IIf(Convert.IsDBNull(dtDatosSolicitud(0)(NombreCampoAdjunto)), Nothing, dtDatosSolicitud(0)(NombreCampoAdjunto))
                    If Filas.Count > 0 Then
                        hdfOrdenServicio_Visible.Value = IIf(Filas(0)("Visible").ToString() = "True", "1", "0")
                        hdfOrdenServicio_Obligatorio.Value = IIf(Filas(0)("Obligatorio").ToString() = "True", "1", "0")
                        hdfOrdenServicio_Editable.Value = IIf(Filas(0)("Editable").ToString() = "True", "1", "0")
                        If byFileData IsNot Nothing AndAlso NombreLabelCampoAdjunto <> "" AndAlso byFileData.Length > 0 Then
                            If hdfOrdenServicio_Visible.Value = "1" Then
                                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento" + CarpetaDominio + "//" + NombreLabelCampoAdjunto
                                If byFileData.Length > 0 Then
                                    File.WriteAllBytes(vcFilePath, byFileData)
                                    If hdfOrdenServicio_Editable.Value = "1" Then
                                        vcImagen = "<img src='../../../Common/Images/remove.png' onclick=""DeleteFileMantenimiento('../Mantenimiento/','" + NombreLabelCampoAdjunto + "','" + NombreCampoAdjunto + "')""/>"
                                    End If
                                End If
                            End If
                            vcDiv += "<div id='upl_" + NombreCampoAdjunto + "' obj='" + NombreCampoAdjunto + "' oblig='" + Convert.ToBoolean(Filas(0)("Obligatorio")).ToString() + "' "
                            vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='pdf,zip,rar' class='VARBINARY imgButton' style='text-align:left; display: none;' "
                            vcDiv += "align='center' style='text-align:left;'><table><tr>"
                            vcDiv += "<td style='text-align:left;'><img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/></td>"
                            vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                            vcDiv += "<div style='text-decoration:underline'; id='file_" + NombreCampoAdjunto + "'>"
                            vcDiv += "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' >" + vcImagen
                            vcDiv += "<span style='margin-left:5px;' id='span_" + NombreCampoAdjunto + "' style='text-decoration:underline;' nombre='" + NombreLabelCampoAdjunto + "'>"
                            vcDiv += NombreLabelCampoAdjunto + "</span></div></div>"
                            UploadDiv_OrdenServicio.InnerHtml = vcDiv
                        Else
                            If hdfOrdenServicio_Editable.Value = "0" Then
                                UploadDiv_OrdenServicio.InnerHtml = ""
                            End If
                        End If
                    End If



                    vcDiv = ""
                    NombreCampoAdjunto = "AdjuntoValeResguardo"
                    NombreLabelCampoAdjunto = Trim("" & dtDatosSolicitud(0)("AdjNom_AdjuntoValeResguardo"))
                    Filas = dtCamposEstadosProceso.Select("Nombre = 'AdjuntoValeResguardo' AND IdEstado = " & iEstado)
                    byFileData = IIf(Convert.IsDBNull(dtDatosSolicitud(0)(NombreCampoAdjunto)), Nothing, dtDatosSolicitud(0)(NombreCampoAdjunto))
                    If Filas.Count > 0 Then
                        hdfValeResguardo_Visible.Value = IIf(Filas(0)("Visible").ToString() = "True", "1", "0")
                        hdfValeResguardo_Obligatorio.Value = IIf(Filas(0)("Obligatorio").ToString() = "True", "1", "0")
                        hdfValeResguardo_Editable.Value = IIf(Filas(0)("Editable").ToString() = "True", "1", "0")
                        If byFileData IsNot Nothing AndAlso NombreLabelCampoAdjunto <> "" AndAlso byFileData.Length > 0 Then
                            If hdfValeResguardo_Visible.Value = "1" Then
                                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento" + CarpetaDominio + "//" + NombreLabelCampoAdjunto
                                If byFileData.Length > 0 Then
                                    File.WriteAllBytes(vcFilePath, byFileData)
                                    If hdfValeResguardo_Editable.Value = "1" Then
                                        vcImagen = "<img src='../../../Common/Images/remove.png' onclick=""DeleteFileMantenimiento('../Mantenimiento/','" + NombreLabelCampoAdjunto + "','" + NombreCampoAdjunto + "')""/>"
                                    End If
                                End If
                            End If
                            vcDiv += "<div id='upl_" + NombreCampoAdjunto + "' obj='" + NombreCampoAdjunto + "' oblig='" + Convert.ToBoolean(Filas(0)("Obligatorio")).ToString() + "' "
                            vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='pdf,zip,rar' class='VARBINARY imgButton' style='text-align:left; display: none;' "
                            vcDiv += "align='center' style='text-align:left;'><table><tr>"
                            vcDiv += "<td style='text-align:left;'><img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/></td>"
                            vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                            vcDiv += "<div style='text-decoration:underline'; id='file_" + NombreCampoAdjunto + "'>"
                            vcDiv += "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' >" + vcImagen
                            vcDiv += "<span style='margin-left:5px;' id='span_" + NombreCampoAdjunto + "' style='text-decoration:underline;' nombre='" + NombreLabelCampoAdjunto + "'>"
                            vcDiv += NombreLabelCampoAdjunto + "</span></div></div>"
                            UploadDiv_ValeResguardo.InnerHtml = vcDiv
                        Else
                            If hdfValeResguardo_Editable.Value = "0" Then
                                UploadDiv_ValeResguardo.InnerHtml = ""
                            End If
                        End If
                    End If





                    'Adjunto Final
                    vcDiv = ""
                    vcImagen = ""
                    NombreCampoAdjunto = "ArchivoAdjuntoFinal"
                    NombreLabelCampoAdjunto = "Adjuntar (pdf,zip,rar,xlsx)"
                    Filas = dtArchivosAdjuntos.Select("vcTipo = 'FIJO'")
                    If Filas.Length > 0 Then
                        byFileData = IIf(Convert.IsDBNull(dtArchivosAdjuntos(0)("binData")), Nothing, dtArchivosAdjuntos(0)("binData"))
                        If byFileData IsNot Nothing AndAlso NombreLabelCampoAdjunto <> "" AndAlso byFileData.Length > 0 Then
                            Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento" + CarpetaDominio + "//" + NombreLabelCampoAdjunto
                            If byFileData.Length > 0 Then
                                File.WriteAllBytes(vcFilePath, byFileData)
                                vcImagen = "<img src='../../../Common/Images/remove.png' onclick=""DeleteFileMantenimiento('../Mantenimiento/','" + NombreLabelCampoAdjunto + "','" + NombreCampoAdjunto + "')""/>"
                            End If
                        End If
                        vcDiv += "<div id='upl_" + NombreCampoAdjunto + "' obj='" + NombreCampoAdjunto + "' oblig='false' "
                        vcDiv += "tipDat='VARBINARY(MAX)' vcTipExt='pdf,zip,rar' class='VARBINARY imgButton' style='text-align:left; display: none;' "
                        vcDiv += "align='center' style='text-align:left;'><table><tr>"
                        vcDiv += "<td style='text-align:left;'><img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/></td>"
                        vcDiv += "<td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td></tr></table></div>"
                        vcDiv += "<div style='text-decoration:underline' id='file_" + NombreCampoAdjunto + "'>"
                        vcDiv += "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' >" + vcImagen
                        vcDiv += "<span style='margin-left:5px;' id='span_" + NombreCampoAdjunto + "' style='text-decoration:underline;' nombre='" + dtArchivosAdjuntos(0)("vcNomAdj").ToString().Trim() + "'>"
                        vcDiv += dtArchivosAdjuntos(0)("vcNomAdj") + "</span></div></div>"
                        UploadDiv_ArchivoAdjuntoFinal.InnerHtml = vcDiv
                    End If




                    'captura de datos
                    scriptPermisos += "var CapturaDatos = [];"
                    For Each drCapDat As DataRow In dtCapturaDatos.Rows
                        Dim btAct As String = If(Convert.ToBoolean(drCapDat("btAct")), "1", "0")
                        Dim btCapObl As String = If(Convert.ToBoolean(drCapDat("btCapObl")), "1", "0")
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'] = [];"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].vcNombreTab = '" + drCapDat("vcNombreTab").ToString() + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].btAct = '" + btAct + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].btCapObl = '" + btCapObl + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].inCanTot_Adj = '" + drCapDat("inCanTot_Adj").ToString() + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].vcExtPer_Adj = '" + drCapDat("vcExtPer_Adj").ToString() + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].vcTamTip_Adj = '" + drCapDat("vcTamTip_Adj").ToString() + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].vcTamMed_Adj = '" + drCapDat("vcTamMed_Adj").ToString() + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].dcTamano_Adj = '" + drCapDat("dcTamano_Adj").ToString() + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].vcTamTip_Msj = '" + drCapDat("vcTamTip_Msj").ToString() + "';"
                        scriptPermisos += "CapturaDatos['" + drCapDat("vcNombreTab").ToString() + "'].inTamano_Msj = '" + drCapDat("inTamano_Msj").ToString() + "';"
                    Next

                    'fecha de aprobacion
                    hdfFechaAprobacion.Value = dtDatosSolicitud.Rows(0)("daFechaAprobadaApr").ToString()
                    'titulo de solicitud
                    lblTipoSolicitud.Text = dtTipoSolicitud.Rows(0)("vcNomTipSol").ToString().ToUpper()
                    'tecnico responsable
                    hdfTecnicoResponsable.Value = "0"
                    If (Convert.ToInt32(dtTipoSolicitud.Rows(0)("inTecnicoResponsable")) = oUsuario.P_inCod) Then
                        hdfTecnicoResponsable.Value = "1"
                    End If
                    If ((hdfEstado.Value = "6" Or hdfEstado.Value = "8") AndAlso hdfEstado_Apr.Value = "34") Then
                        If (hdfTecnicoResponsable.Value = "1" Or hdfAdmin.Value = "1") Then
                            trAsignarA.Style("display") = ""
                        End If
                    End If
                    'Fin técnico responsable
                    'JHERRERA - 20150603: Fecha de creación
                    lblFechaCreacion.Text = dtDatosSolicitud.Rows(0)("dtFecSol").ToString()
                    '-->

                    'SOLICITUD EN PROCESO
                    hdfTecnicoAsignado.Value = "0"
                    If (hdfEstado.Value = "8" And hdfEstado_Apr.Value = "34") Then
                        'tecnico asignado
                        If Not IsDBNull(dtDatosSolicitud.Rows(0)("inTecnicoAsignado")) AndAlso
                    (Convert.ToInt32(dtDatosSolicitud.Rows(0)("inTecnicoAsignado")) = oUsuario.P_inCod) Then
                            hdfTecnicoAsignado.Value = "1"
                        End If
                    End If

                    'Control seleccion tecnico a asignar
                    Dim idsTecnicos_TipSol As String = String.Empty
                    For Each dr As DataRow In dtTecnicos.Rows
                        If (idsTecnicos_TipSol = String.Empty) Then
                            idsTecnicos_TipSol = dr("F_inUsu").ToString()
                        Else
                            idsTecnicos_TipSol = idsTecnicos_TipSol + "," + dr("F_inUsu").ToString()
                        End If
                    Next

                    'agregar tecnico asignado y administrador a la busqueda del control
                    Dim inCodUsuTecAsig As String = String.Empty
                    inCodUsuTecAsig = If(dtDatosSolicitud.Rows(0)("inTecnicoAsignado").ToString() = "", "1", "1," + dtDatosSolicitud.Rows(0)("inTecnicoAsignado").ToString())

                    If idsTecnicos_TipSol = String.Empty Then
                        idsTecnicos_TipSol = inCodUsuTecAsig
                    Else
                        idsTecnicos_TipSol = idsTecnicos_TipSol + "," + inCodUsuTecAsig
                    End If
                    bpTecnicoAsignado.NombreEntidad = "Usuario"
                    bpTecnicoAsignado.vcTab = "SEG_Usuario"
                    bpTecnicoAsignado.TipoOrigen = 0
                    bpTecnicoAsignado.Condicion = "btEst = 1 And P_inCod in (" + idsTecnicos_TipSol + ")"
                    bpTecnicoAsignado.FuncionPersonalizada = "fnMostrarTecnico"
                    bpTecnicoAsignado.RutaRaiz = "../../../"
                    bpTecnicoAsignado.Contenedor = "dvTecnicoAsigndo"
                    'If ((hdfEstado.Value = "8" And hdfEstado_Apr.Value = "34") Or (hdfEstado.Value = "7" And hdfEstado_Apr.Value = "34")) Then
                    If (hdfEstado.Value <> "6") Then
                        bpTecnicoAsignado.CodigoValor = dtDatosSolicitud.Rows(0)("inTecnicoAsignado").ToString()
                        bpTecnicoAsignado.Deshabilitado = True
                        trTecnico.Style("display") = ""
                    End If

                    bqPplCuenta.NombreEntidad = "Cuenta"
                    bqPplCuenta.vcTab = "Mov_Cuenta"
                    bqPplCuenta.TipoOrigen = 0
                    bqPplCuenta.Condicion = " Mov_Cuenta.btVig = 1 "
                    bqPplCuenta.FuncionPersonalizada = "fnMostrarCuenta"
                    bqPplCuenta.RutaRaiz = "../../../"
                    bqPplCuenta.Contenedor = "DvCuenta"
                    bqPplCuenta.CodigoValor = dtDatosSolicitud.Rows(0)("F_vcCodCuentaInicial").ToString()
                    bqPplCuenta.AltoDialog = 450

                    bqCambioEquipo_Cuenta.NombreEntidad = "Cuenta"
                    bqCambioEquipo_Cuenta.vcTab = "Mov_Cuenta"
                    bqCambioEquipo_Cuenta.TipoOrigen = 0
                    bqCambioEquipo_Cuenta.Condicion = " Mov_Cuenta.btVig = 1 "
                    bqCambioEquipo_Cuenta.FuncionPersonalizada = "fnMostrarCuenta"
                    bqCambioEquipo_Cuenta.RutaRaiz = "../../../"
                    bqCambioEquipo_Cuenta.Contenedor = "dvCambioEquipo_Cuenta"
                    bqCambioEquipo_Cuenta.CodigoValor = dtDatosSolicitud.Rows(0)("F_vcCodCuentaInicial").ToString()
                    bqCambioEquipo_Cuenta.VariableCondicionJQ = "CondicionJQuery_CambioEquipoCuenta"

                    bqCambioEquipo_Plan.NombreEntidad = "Plan"
                    bqCambioEquipo_Plan.vcTab = "Mov_Plan"
                    bqCambioEquipo_Plan.TipoOrigen = 0
                    bqCambioEquipo_Plan.Condicion = " Mov_Plan.btVig = 1 "
                    bqCambioEquipo_Plan.FuncionPersonalizada = "fnMostrarPlan"
                    bqCambioEquipo_Plan.RutaRaiz = "../../../"
                    bqCambioEquipo_Plan.Descripcion = "vcNom" ''Nombre
                    bqCambioEquipo_Plan.Contenedor = "dvCambioEquipo_Plan"
                    bqCambioEquipo_Plan.CodigoValor = dtDatosSolicitud.Rows(0)("inCodPlan_Fin").ToString()
                    bqCambioEquipo_Plan.VariableCondicionJQ = "CondicionJQuery_CambioEquipoPlan"

                    cboAccionEquipo_Valor.Value = dtDatosSolicitud.Rows(0)("AccionEquipo").ToString()
                    cboAccionCuenta_Valor.Value = dtDatosSolicitud.Rows(0)("AccionCuenta").ToString()
                    cboAccionPlan_Valor.Value = dtDatosSolicitud.Rows(0)("AccionPlan").ToString()
                    bqCambioEquipo_Cuenta_value.Value = dtDatosSolicitud.Rows(0)("F_vcCodCuentaInicial").ToString()
                    bqCambioEquipo_Plan_value.Value = dtDatosSolicitud.Rows(0)("inCodPlan_Fin").ToString()

                    bpTecnicoAsignado.Deshabilitado = True

                    Dim vcTecnicos As String = Session("vcTecnicos")
                    If vcTecnicos <> "" Then bpTecnicoAsignado.Condicion = bpTecnicoAsignado.Condicion + " And P_inCod in (" + vcTecnicos + ")"

                    'Fin control

                    'Array de estados de proceso y aprobacion
                    scriptPermisos += "var Estados = [];"
                    For Each dr As DataRow In dtEstados.Rows
                        If dr("inMod").ToString() = "2" Then
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'] = [];"
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Id = '" + dr("P_inCod").ToString() + "';"
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Nombre = '" + dr("vcNom").ToString() + "';"
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Tipo = '2';"
                        Else
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'] = [];"
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Id = '" + dr("P_inCod").ToString() + "';"
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Nombre = '" + dr("vcNom").ToString() + "';"
                            scriptPermisos += "Estados['" + dr("P_inCod").ToString() + "'].Tipo = '3';"
                        End If
                    Next

                    'Motivo de rechazo o anulación de la solicitud
                    If hdfEstado_Apr.Value = "35" OrElse
                (hdfEstado.Value = "9" And hdfEstado_Apr.Value = "34") OrElse
                hdfEstado.Value = "7" Then

                        '35: Rechazo, 9-34:Anulacion, 7: Cierre

                        tbResumenCierre.Visible = True
                        trMotivoRecAnu.Style("display") = ""
                        lblMotivo.Text = "Motivo"
                        txtTipoCierre.Text = dtDatosSolicitud.Rows(0)("TipoCierre").ToString()
                        txtMotivo.Text = dtDatosSolicitud.Rows(0)("vcObservacion").ToString()
                    End If

                    'valores finales asignados a la sulicitud (solicitud culminada)
                    'If (hdfEstado.Value = "7") Then
                    '    If Not IsDBNull(dtDatosSolicitud.Rows(0)("daFecEnt")) Then
                    '        txtFecha.Text = dtDatosSolicitud.Rows(0)("daFecEnt").ToString()
                    '    End If
                    '    If dtSeguimiento.Rows.Count > 0 Then
                    '        scriptPermisos += "var valActualSeg = '" + dtSeguimiento.Rows(0)("ValorActual").ToString() + "';"
                    '        txtModeloAsignado.Text = dtSeguimiento.Rows(0)("nomModelo").ToString()
                    '        txtIMEIAsignado.Text = dtSeguimiento.Rows(0)("CodIMEI").ToString()
                    '        txtPlanAsignado.Text = dtSeguimiento.Rows(0)("nomPlan").ToString()
                    '        txtLineaAsignada.Text = dtSeguimiento.Rows(0)("CodNumero").ToString()
                    '    End If
                    'End If

                    Dim vcReturn As String
                    vcReturn = MostrarDatos(dtDatosSolicitud, dtArchivosAdjuntos, dtDatosTablaPersonalisada, dtTipoSolicitud)

                    'SEGUIMIENTO VISTO
                    Solicitud.RegistrarSeguimientoVisto(Convert.ToInt32(hdfCodSol.Value), oUsuario.P_inCod, oUsuario.vcUsu)

                    scriptPermisos += "var vcResumen = '" + dtResumen.Rows(0)("vcResumen") + "'; " + vcReturn

                    'usuarios autorizados

                    Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)
                    Dim UsuariosAutorizados As List(Of ENT_SEG_Usuario) = Usuario.ListarUsuariosAutorizados()
                    Dim scriptUsuAut = "var arUsuAct = [ "
                    For Each Usu As ENT_SEG_Usuario In UsuariosAutorizados
                        scriptUsuAut = scriptUsuAut + "{vcUsu:'" + Usu.vcUsu + "',vcNom:'" + Usu.vcNom + "',vcCorreo:'" + Usu.correo + "'},"
                    Next
                    scriptUsuAut = scriptUsuAut.Substring(0, scriptUsuAut.Length - 1)
                    scriptUsuAut = scriptUsuAut + "];"
                    scriptPermisos = scriptPermisos + scriptUsuAut

                    'If hdfLicencia.Value = "STANDARD" Then
                    '    If dtDatosSolicitud.Rows(0)("inNumeroCuotas").ToString() <> "0" Then
                    '        If Convert.ToBoolean(dtTipoSolicitud.Rows(0)("PagoContado")) Then
                    '            lblMesesCuotas.Text = "Pago Al Contado"
                    '            txtMesesCuotas.Visible = False
                    '            lblMesesCuotas.Visible = True
                    '            trFinanciamiento.Style("display") = "none"
                    '        Else
                    '            txtMesesCuotas.Visible = True
                    '            lblMesesCuotas.Visible = False
                    '            trFinanciamiento.Style("display") = ""
                    '        End If
                    '    End If
                    'End If

                    If (Not Convert.ToBoolean(dtTipoSolicitud.Rows(0)("UsaFinanciamiento"))) Then
                        trFinanciamiento.Style("display") = "none"
                    Else
                        trFinanciamiento.Style("display") = ""

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

                        If (Not IsDBNull(dtDatosSolicitud.Rows(0)("IdFinanciamiento"))) Then
                            ddlFinanciamiento.SelectedValue = Convert.ToInt32(dtDatosSolicitud.Rows(0)("IdFinanciamiento"))
                        End If
                    End If

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", scriptPermisos, True)

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(TipoAdquisicion) Then TipoAdquisicion.Dispose()
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
            If Not IsNothing(Operador) Then Operador.Dispose()
            If Not IsNothing(blTipoPausaSolicitud) Then blTipoPausaSolicitud.Dispose()
            If Not IsNothing(Usuario) Then Usuario.Dispose()
            If Not IsNothing(FinanciamientoTipo) Then FinanciamientoTipo.Dispose()

        End Try
    End Sub

    Public Function MostrarDatos(ByVal dtDatosSolicitud As DataTable, ByVal dtArchivosAdjuntos As DataTable, ByVal dtDatosTablaPersonalisada As DataTable, ByVal dtTipoSolicitud As DataTable) As String
        Dim vcReturn As String = ""
        Try
            If dtDatosTablaPersonalisada.Rows.Count < 1 Then
                divSolicitudFallo.Style("display") = ""
                divProcesarSolicitud.Style("display") = "none"
                dvAcciones.Style("display") = "none"
                Return vcReturn
                Exit Function
            End If
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim formatoNumero As String = DevuelveFormatoNumero(oCultura)

            'archivos adjuntos
            hdfNumAdjuntos.Value = dtArchivosAdjuntos.Rows.Count
            If (dtArchivosAdjuntos.Rows.Count = 0) Then
                lblArchivosAdjuntos.Text = "No se ha cargado ningún archivo."
            Else
                If dtArchivosAdjuntos.Rows.Count = 1 Then
                    lblArchivosAdjuntos.Text = dtArchivosAdjuntos.Rows.Count & " archivo adjunto."
                Else
                    lblArchivosAdjuntos.Text = dtArchivosAdjuntos.Rows.Count & " archivos adjuntos."
                End If
            End If

            'Plan
            txtPlanAsignado.Text = dtDatosSolicitud.Rows(0)("vcNomPlanAsignado").ToString()

            'fecha de entrega
            If hdfEstado.Value = "7" Then
                txtFecha.Text = dtDatosSolicitud.Rows(0)("daFecEnt").ToString()
                imgBorrarFechaEntrega.Style("display") = "none"
            End If
            txtDescSol.Text = dtDatosSolicitud.Rows(0)("vcDesSol").ToString()
            lblCodigo.Text = dtDatosSolicitud.Rows(0)("vcCodigo").ToString()
            txtColor.Text = dtDatosSolicitud.Rows(0)("vcColor").ToString()

            ''ddlTipoPlan.Text = dtDatosSolicitud.Rows(0)("vcTipoPlan").ToString()
            ''ddlConexionInternet.Text = IIf(Convert.ToBoolean(dtDatosSolicitud.Rows(0)("btConexionInternet")), "SI", "NO")
            ''ddlNumerosFrecuentes.Text = IIf(Convert.ToBoolean(dtDatosSolicitud.Rows(0)("btNumerosFrecuentes")), "SI", "NO")
            ''ddlPaqueteSMS.Text = IIf(Convert.ToBoolean(dtDatosSolicitud.Rows(0)("btPaqueteSMS")), "SI", "NO")
            ddlSeguro.Text = IIf(Convert.ToBoolean(dtDatosSolicitud.Rows(0)("btSeguro")), "SI", "NO")

            If (dtDatosSolicitud.Rows(0)("dcMontoCIA").ToString() <> "") Then
                If oCultura.vcCodCul.ToString() = "es-PE" Then
                    txtMonto.Text = DevuelveNumeroFormateado(dtDatosSolicitud.Rows(0)("dcMontoCIA").ToString(), formatoNumero)
                Else
                    txtMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(dtDatosSolicitud.Rows(0)("dcMontoCIA"), oCultura).ToString()
                End If

                hdfTipoMonto.Value = "CIA"
            Else
                If oCultura.vcCodCul.ToString() = "es-PE" Then
                    txtMonto.Text = DevuelveNumeroFormateado(IIf(Convert.IsDBNull(dtDatosSolicitud.Rows(0)("dcMonto")), "0", dtDatosSolicitud.Rows(0)("dcMonto").ToString()), formatoNumero)
                Else
                    txtMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(IIf(Convert.IsDBNull(dtDatosSolicitud.Rows(0)("dcMonto")), 0, dtDatosSolicitud.Rows(0)("dcMonto")), oCultura).ToString()
                End If
                hdfTipoMonto.Value = "EMP"
            End If

            'Monto Sugerido (agregado 21-09-2015 wapumayta) (Mostrador para solicitud tipo "Nuevo" en estado "Procesar" para monto tipo "Empleado"
            If hdfCodTipSol.Value = "2" AndAlso hdfTipoMonto.Value = "EMP" AndAlso hdfEstado.Value = "8" Then
                Dim OperadorFin As String = ComprobarStringNULL(dtDatosSolicitud.Rows(0)("vcCodOperFin"), "")
                Dim ModeloFin As String = ComprobarStringNULL(dtDatosSolicitud.Rows(0)("inCodMod_Fin"), "")
                If (OperadorFin <> "" And OperadorFin <> "0") AndAlso (ModeloFin <> "" And ModeloFin <> "0") Then
                    lblMontoSugerido.Text = PrecioModeloXOperador(ModeloFin, OperadorFin, "dePreLis")
                    tdMontoSugerido.Style("display") = ""
                    tdMontoSugeridoMensaje.Style("display") = ""
                End If
            End If

            'JHERRERA - 22/04/2015
            'Cargando información almacenada por el botón "Guardar" (en estado "En Proceso")
            If (Convert.ToBoolean(dtDatosSolicitud.Rows(0)("btIngAlm"))) Then hdfIngAlm.Value = "1" Else hdfIngAlm.Value = "0"
            If hdfEstado.Value = "8" AndAlso dtDatosSolicitud.Rows(0)("daFecEnt").ToString() <> "" Then
                txtFecha.Text = dtDatosSolicitud.Rows(0)("daFecEnt").ToString()
            End If
            If (dtDatosSolicitud.Rows(0)("inCodMod_Fin").ToString() <> "") Then
                vcReturn += "var inModFin = '" + dtDatosSolicitud.Rows(0)("inCodMod_Fin").ToString() + "'; "
            Else
                vcReturn += "var inModFin = ''; "
            End If
            If (dtDatosSolicitud.Rows(0)("vcCodIMEI_Fin").ToString() <> "") Then
                vcReturn += "var vcIMEIFin = '" + dtDatosSolicitud.Rows(0)("vcCodIMEI_Fin").ToString() + "'; "
            Else
                vcReturn += "var vcIMEIFin = ''; "
            End If
            If (dtDatosSolicitud.Rows(0)("vcNumLin_Fin").ToString() <> "") Then
                vcReturn += "var vcLineaFin = '" + dtDatosSolicitud.Rows(0)("vcNumLin_Fin").ToString() + "'; "
            Else
                vcReturn += "var vcLineaFin = ''; "
            End If
            '----------------

            ''JHERRERA - 29/04/2015
            ''----------------------
            If Convert.ToBoolean(dtDatosSolicitud.Rows(0)("btEnOper_Repa")) Then vcReturn += "var btEnOperRepa = '1'; " Else vcReturn += "var btEnOperRepa = '0'; "
            ''----------------------

            hdfUsuarioCreacion.Value = "0"
            If Not IsDBNull(dtDatosTablaPersonalisada.Rows(0)("inUsuarioCreacion")) Then
                If oUsuario.P_inCod = dtDatosTablaPersonalisada.Rows(0)("inUsuarioCreacion").ToString() Then
                    hdfUsuarioCreacion.Value = "1"
                End If
            End If

            'Límite de crédito
            If Not IsDBNull(dtDatosTablaPersonalisada.Rows(0)("dcLimiteCredito")) Then
                If oCultura.vcSimDec.ToString = "," Then
                    txtLimiteCredito.Text = DevuelveNumeroFormateado_MultiPais(dtDatosTablaPersonalisada.Rows(0)("dcLimiteCredito").ToString(), oCultura)
                Else
                    txtLimiteCredito.Text = DevuelveNumeroFormateado(dtDatosTablaPersonalisada.Rows(0)("dcLimiteCredito").ToString(), formatoNumero)
                End If
            End If

            'If (Convert.ToDecimal(dtDatosSolicitud.Rows(0)("dcMonto")) = 0) Then
            '    If (hdfAdmin.Value = "1") Then
            '        txtMonto.Text = ""
            '    Else
            '        txtMonto.Text = "Aún no definido"
            '    End If
            'Else
            '    txtMonto.Text = DevuelveNumeroFormateado(dtDatosSolicitud.Rows(0)("dcMonto").ToString(), formatoNumero)
            'End If

            'numero cuotas
            hdfNumMinCuo.Value = "0"
            hdfNumMaxCuo.Value = "0"
            hdfMinPerGra.Value = "0"
            hdfMaxPerGra.Value = "0"
            hdfCuotas.Value = "0"
            hdfMesesCuotas.Value = ""
            txtMesesCuotas.Text = dtDatosSolicitud.Rows(0)("inNumeroCuotas").ToString()
            lblMesesCuotas.Visible = False

            If dtDatosSolicitud.Rows(0)("inNumeroCuotas").ToString() <> "0" Then
                txtMesesCuotas.Enabled = False
                If Convert.ToBoolean(dtTipoSolicitud.Rows(0)("PagoContado")) Then
                    lblMesesCuotas.Text = "Pago al contado"
                End If
            Else
                trMesesCuotas.Style("display") = "none"
            End If

            If (IsDBNull(dtTipoSolicitud.Rows(0)("MinimoCuotas")) Or Convert.ToInt16(dtTipoSolicitud.Rows(0)("MinimoCuotas").ToString) > 0) And (IsDBNull(dtTipoSolicitud.Rows(0)("MaximoCuotas")) Or Convert.ToInt16(dtTipoSolicitud.Rows(0)("MaximoCuotas").ToString) > 0) Then
                hdfNumMinCuo.Value = dtTipoSolicitud.Rows(0)("MinimoCuotas").ToString()
                hdfNumMaxCuo.Value = dtTipoSolicitud.Rows(0)("MaximoCuotas").ToString()
                lblMesesCuotas.Text = "El número de cuotas debe estar en el rango de " + hdfNumMinCuo.Value + " y " + hdfNumMaxCuo.Value + "."
                hdfisEditCuota.Value = "0"
            ElseIf (IsDBNull(dtTipoSolicitud.Rows(0)("Cuotas")) Or Convert.ToInt16(dtTipoSolicitud.Rows(0)("Cuotas").ToString) > 0) Then
                hdfCuotas.Value = dtTipoSolicitud.Rows(0)("Cuotas").ToString()
                hdfisEditCuota.Value = "1"
            ElseIf IsDBNull(dtTipoSolicitud.Rows(0)("MesesCuotas")) Or dtTipoSolicitud.Rows(0)("MesesCuotas").ToString <> "" Then
                hdfMesesCuotas.Value = dtTipoSolicitud.Rows(0)("MesesCuotas").ToString()
                txtMesesCuotas.Text = ""
                If dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString <> "" Then
                    txtMesesCuotas.Text = dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString().Replace("12", "Dic").Replace("11", "Nov").Replace("10", "Oct").Replace("9", "Set").Replace("8", "Ago").Replace("7", "Jul").Replace("6", "Jun").Replace("5", "May").Replace("4", "Abr").Replace("3", "Mar").Replace("2", "Feb").Replace("1", "Ene") + ","
                End If
                txtMesesCuotas.Enabled = False
                'tamaño de control
                Dim lstMeses As String() = dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString().Split(",")
                txtMesesCuotas.Width = lstMeses.Length * 21
                hdfisEditCuota.Value = "1"
            End If

            'If dtDatosSolicitud.Rows(0)("inNumeroCuotas").ToString() <> "0" Then
            '    txtMesesCuotas.Enabled = False
            '    If Convert.ToBoolean(dtTipoSolicitud.Rows(0)("PagoContado")) Then
            '        lblMesesCuotas.Text = "Pago al contado"
            '    End If
            'End If

            ''ElseIf IsDBNull(dtDatosSolicitud.Rows(0)("vcMesesCuotas")) Or dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString = "" Then
            'If IsDBNull(dtDatosSolicitud.Rows(0)("vcMesesCuotas")) Or dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString = "" Then
            '    hdfNumMinCuo.Value = dtTipoSolicitud.Rows(0)("MinimoCuotas").ToString()
            '    hdfNumMaxCuo.Value = dtTipoSolicitud.Rows(0)("MaximoCuotas").ToString()
            '    lblMesesCuotas.Text = "El número de cuotas debe estar en el rango de " + hdfNumMinCuo.Value + " y " + hdfNumMaxCuo.Value + "."
            'Else
            '    hdfMesesCuotas.Value = dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString()
            '    txtMesesCuotas.Text = ""
            '    txtMesesCuotas.Text = dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString().Replace("12", "Dic").Replace("11", "Nov").Replace("10", "Oct").Replace("9", "Set").Replace("8", "Ago").Replace("7", "Jul").Replace("6", "Jun").Replace("5", "May").Replace("4", "Abr").Replace("3", "Mar").Replace("2", "Feb").Replace("1", "Ene") + ","
            '    txtMesesCuotas.Enabled = False
            '    'tamaño de control
            '    Dim lstMeses As String() = dtDatosSolicitud.Rows(0)("vcMesesCuotas").ToString().Split(",")
            '    txtMesesCuotas.Width = lstMeses.Length * 21
            'End If

            'periodo de gracia
            If Not Convert.ToBoolean(dtTipoSolicitud.Rows(0)("PeriodoGracia")) Then
                'If dtTipoSolicitud.Rows(0)("PeriodoGracia").ToString() = "0" Then
                trPeriodoGracia.Style("display") = "none"
                txtPeriodoGracia.Text = "0"
            Else
                trPeriodoGracia.Style("display") = ""
                txtPeriodoGracia.Text = dtDatosSolicitud.Rows(0)("inMesesPeriodoGracia").ToString()
                If dtTipoSolicitud.Rows(0)("MesesPeriodoGracia").ToString() <> "0" Then
                    txtPeriodoGracia.Enabled = False
                Else
                    hdfMinPerGra.Value = dtTipoSolicitud.Rows(0)("MinimoMesesPeriodoGracia").ToString()
                    hdfMaxPerGra.Value = dtTipoSolicitud.Rows(0)("MaximoMesesPeriodoGracia").ToString()
                    lblPeriodoGracia.Text = "El periodo de gracia debe estar en el rango de " + hdfMinPerGra.Value + " y " + hdfMaxPerGra.Value + "."
                End If
            End If

            'detalle financiamiento
            'lblNombreFinanc.Text = dtTipoSolicitud.Rows(0)("Descripcion").ToString()
            hdfUsaFinanciamiento.Value = dtTipoSolicitud.Rows(0)("UsaFinanciamiento").ToString()
            hdfBiMontoFijo.Value = dtTipoSolicitud.Rows(0)("biMontoFijo").ToString()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
        Return vcReturn
    End Function

    <WebMethod()>
    Public Shared Function ListarPorIds(ByVal prCodIds As String) As List(Of ENT_MOV_Solicitud)
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim lstSolicitud As List(Of ENT_MOV_Solicitud)
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstSolicitud = Solicitud.ListarPorIds(prCodIds)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
        Return lstSolicitud
    End Function

    '<WebMethod()>
    'Public Shared Function ObtenerPlanSolicitado(ByVal inCodModDis As Integer, ByVal vcCodEmp As String) As ENT_MOV_Plan
    '    Try
    '        Dim solicitud As BL_MOV_Solicitud = BL_MOV_Solicitud.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Return solicitud.MostrarPlanSolicitado(inCodModDis, vcCodEmp, 1, 2)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Function ListarParametros(ByVal vcGrupo As String) As List(Of ENT_MOV_Parametros)
        Dim Parametro As BL_MOV_Parametros = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim lstParametros As New List(Of ENT_MOV_Parametros)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'TIPO DE MONTO
            Parametro = New BL_MOV_Parametros(oUsuario.IdCliente)
            lstParametros = Parametro.ListarPorGrupo(vcGrupo)
            Return lstParametros
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Parametro) Then Parametro.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDispositivos(ByVal vcCodEmp As String, ByVal inTipAdq As Integer, ByVal IdSolicitud As String) As List(Of ENT_MOV_Dispositivo)
        Dim Dispositivos As BL_MOV_Dispositivo = Nothing
        Dim lstDispositivo As List(Of ENT_MOV_Dispositivo)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dispositivos = New BL_MOV_Dispositivo(oUsuario.IdCliente)
            lstDispositivo = Dispositivos.ListarDisponiblesPorEmpleadoGrupo(vcCodEmp, inTipAdq, IdSolicitud)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivos) Then Dispositivos.Dispose()
        End Try
        Return lstDispositivo
    End Function

    <WebMethod()>
    Public Shared Function ListarHistoricosPorDispositivo(ByVal vcCodIMEI As String) As List(Of Object)

        Dim Dispositivo As BL_MOV_Dispositivo = Nothing

        Dim lstObj As New List(Of Object)
        Try
            Dispositivo = New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtHistoricos As DataTable
            dtHistoricos = Dispositivo.ListarHistoricosPorDispositivo(vcCodIMEI)
            Dispositivo.Dispose()

            For i As Integer = 0 To dtHistoricos.Rows.Count - 1

                Dim dict As New Dictionary(Of String, Object)
                dict.Add("P_F_vcCodDis", dtHistoricos.Rows(i)("P_F_vcCodDis").ToString())
                dict.Add("P_dtFecIni", dtHistoricos.Rows(i)("P_dtFecIni").ToString())
                dict.Add("dtFecFin", dtHistoricos.Rows(i)("dtFecFin").ToString())
                dict.Add("F_vcNumLin", dtHistoricos.Rows(i)("F_vcNumLin").ToString())
                dict.Add("F_inCodEst", dtHistoricos.Rows(i)("F_inCodEst").ToString())
                dict.Add("vcNomEst", dtHistoricos.Rows(i)("vcNomEst").ToString())
                dict.Add("F_vcCodEmp", dtHistoricos.Rows(i)("F_vcCodEmp").ToString())
                dict.Add("EMPL_vcNOMEMP", dtHistoricos.Rows(i)("EMPL_vcNOMEMP").ToString())
                lstObj.Add(dict)
            Next

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivo) Then Dispositivo.Dispose()
        End Try

        Return lstObj
    End Function

    <WebMethod()>
    Public Shared Function ListarEquiposPorFiltro(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String,
                                 ByVal vcTipOrdCol As String, ByVal vcCam As String, ByVal vcValBus As String,
                                 ByVal vcTab As String, ByVal inTipOri As String, ByVal inFilReg As String, ByVal inTipLin As String, ByVal vcCodEmp As String, ByVal inCodModDis As String, ByVal vcFecIni As String,
                                                  ByVal vcFecFin As String, ByVal inTipAdq As String, ByVal hdfCodTipSol As Int32,
                                                  ByVal chkEquiConLinea As Boolean) As JQGridJsonResponse
        Dim Dispositivo As BL_MOV_Dispositivo = Nothing
        Try
            Dispositivo = New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If inCodModDis.ToLower() = "null" Then inCodModDis = "-1"
            Dim dsDetalle As DataSet = Dispositivo.ListarPorFiltroPaginado(Convert.ToInt32(inPagTam), Convert.ToInt32(inPagAct), vcCodEmp, Convert.ToInt32(inCodModDis), vcFecIni, vcFecFin, Convert.ToInt32(inTipAdq), hdfCodTipSol, chkEquiConLinea)
            'Dim lstDispositivo As List(Of ENT_MOV_Dispositivo) = Dispositivo.ListarPorFiltro(vcCodEmp, Convert.ToInt32(inCodModDis), vcFecIni, vcFecFin, Convert.ToInt32(inTipAdq), hdfCodTipSol, chkEquiConLinea)
            'Return lstDispositivo

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                            Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 0)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivo) Then Dispositivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarLineasLibresPorSolicitud(ByVal inCodModDis As Integer, ByVal inCodSol As Integer) As List(Of ENT_MOV_Linea)
        Dim Linea As BL_MOV_Linea = Nothing
        Dim _return As List(Of ENT_MOV_Linea)
        Try
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            _return = Linea.ListarDisponible_x_ModDisp(inCodModDis, inCodSol)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
        Return _return
    End Function

    <WebMethod()>
    Public Shared Function DatosLinea_ProcSolicitud(ByVal vcNum As String) As ENT_MOV_Linea
        Dim Linea As BL_MOV_Linea = Nothing
        Dim _return As ENT_MOV_Linea
        Try
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            _return = Linea.DatosLinea_ProcSolicitud(vcNum)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
        Return _return
    End Function

    <WebMethod()>
    Public Shared Function ListarServiciosSolicitados(ByVal inCodSol As Integer) As List(Of ENT_MOV_ServicioOperador)
        Dim solicitud As BL_MOV_Solicitud = Nothing
        Dim lstServicios As List(Of ENT_MOV_ServicioOperador)
        Try
            solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            lstServicios = solicitud.MostrarServiciosSolicitados(inCodSol)
            'solicitud.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(solicitud) Then solicitud.Dispose()
        End Try
        Return lstServicios
    End Function

    <WebMethod()>
    Public Shared Function ProcesarSolicitud(ByVal vcCodIMEI As String, ByVal inCodSol As String, ByVal inTipSol As String, ByVal inEstSol As String,
                                         ByVal codNumLim As String, ByVal dtFecEnt As String, ByVal vcObs As String,
                                         ByVal inCodPlan As Integer, ByVal dcMonto As String, ByVal inNumeroCuotas As Integer,
                                         ByVal inMesesPeriodoGracia As Integer, ByVal mesesContratoLinea As Integer,
                                         ByVal montoLinea As Decimal, ByVal XMLDetallePaqAmp As String,
                                         ByVal vcTipoMonto As String, ByVal vcModeloSolicitado As String, ByVal dcLimiteCredito As String,
                                         ByVal vcCodCtaInicial As String,
                                         ByVal vcAdjuntos As String, ByVal vcColor As String, ByVal Seguro As String,
                                         ByVal AccionEquipo As String, ByVal AccionCuenta As String, ByVal AccionPlan As String,
                                         ByVal CambioEquipo_Cuenta As String, ByVal CambioEquipo_Plan As String, ByVal IdFinanciamiento As String, ByVal IdTipoCierreSolicitud As String) As String

        If Not IsNumeric(IdFinanciamiento) Then
            IdFinanciamiento = "-1"
        End If


        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim Fac_Solicitud As BL_MOV_FAC_Solicitud = Nothing
        Dim resultado As String = String.Empty
        Dim resultadoProcesar As String = "Error al procesar la solicitud."
        Dim biCreaPDF As Boolean = False
        Dim vcCodSol As String = ""
        Dim vcCodEmp As String = ""
        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oSolicitud As New ENT_MOV_Solicitud
            Dim daFecEnt As DateTime



            oCaracteristica = New BL_MOV_Caracteristica(oUsuario.IdCliente)
            Dim lstObjAdjuntos As New List(Of Object)
            If (vcAdjuntos <> "") Then
                vcAdjuntos = vcAdjuntos.Substring(0, vcAdjuntos.Length - 1)
                Dim lstAdjuntos As String() = vcAdjuntos.Split(";")
                Dim CarpetaDominioUploads As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento//", "//")
                Dim byFileData As Byte()
                For i As Integer = 0 To lstAdjuntos.Length - 1
                    Dim row As String() = lstAdjuntos(i).Split(",")
                    Dim dict As New Dictionary(Of String, Object)
                    If row(1).Trim() <> "" Then 'Hay archivo Adjunto?
                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento/" + CarpetaDominioUploads + "//" + row(1)
                        Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                        byFileData = New Byte(fs.Length - 1) {}
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                        fs.Close()
                        dict.Add("Nombre", row(1))
                    Else
                        byFileData = New Byte() {}
                        dict.Add("Nombre", "")
                    End If
                    dict.Add("Campo", row(0))
                    dict.Add("Archivo", byFileData)
                    lstObjAdjuntos.Add(dict)
                Next
            End If
            oCaracteristica.ActualizarAdjuntos(lstObjAdjuntos, "MOV_Solicitud", "P_inCodSol", inCodSol)


            oSolicitud.DispositivoNuevo.P_vcCodIMEI = vcCodIMEI.Replace("&#39", "'")
            oSolicitud.P_inCodSol = Integer.Parse(inCodSol)
            oSolicitud.inTipSol = Integer.Parse(inTipSol)
            oSolicitud.Estado.P_inCod = Integer.Parse(inEstSol)
            oSolicitud.vcNumLin = codNumLim
            oSolicitud.vcObs = vcObs

            oSolicitud.IdTipoCierreSolicitud = Integer.Parse(IdTipoCierreSolicitud)

            'convertir dcMonto a decimal sin formato
            Dim dcMontoSinFormat As Decimal = Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto))
            Dim dcLimCreSinFormat As Decimal = Convert.ToDecimal(DevuelveNumeroSinFormato(dcLimiteCredito))
            oSolicitud.Plan.P_inCod = inCodPlan
            oSolicitud.dcMonto = If(vcTipoMonto = "CIA", 0, dcMontoSinFormat)
            oSolicitud.dcMontoCIA = If(vcTipoMonto = "CIA", dcMontoSinFormat, 0)
            oSolicitud.inNumeroCuotas = inNumeroCuotas
            oSolicitud.inMesesPeriodoGracia = inMesesPeriodoGracia

            If (inEstSol = 6 AndAlso dtFecEnt.Trim() <> "") Or inEstSol = 8 Then
                oSolicitud.Estado.P_inCod = 7 'ejecutad
            ElseIf inEstSol = 6 AndAlso dtFecEnt.Trim = "" Then
                oSolicitud.Estado.P_inCod = 8 'en proceso
            End If

            If dtFecEnt.Trim() <> "" Then
                daFecEnt = Convert.ToDateTime(dtFecEnt.ToString)
            Else
                daFecEnt = DateTime.MinValue
            End If


            'AUDITORIA
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.Solicitud

            'AUDITORIA:Actualizar Antes
            oAuditoria.Tabla = Constantes.TableNames.Solicitud
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {inCodSol})
            oAuditoria.Tabla = "MOV_TipoSolicitud_CampoSistema"
            Dim strAntes2 As String = oAuditoria.AntesActualizar(New String() {inCodSol})
            'Se actualizan dato....


            Dim sqlTrans As SqlTransaction = Nothing
            Try
                Dim vcDesFac As String = ""
                Dim vcDesLinFac As String = ""
                'FACTURACION
                'Facturacion para costo del dispositivo (segun los parametros del financiamiento del tipo de solicitud)
                Dim dsDatosFac = Solicitud.DatosFacturacionSolicitud(inCodSol, codNumLim)
                If (dsDatosFac.Tables(0).Rows.Count > 0 And oSolicitud.dcMonto > 0) Then
                    Fac_Solicitud = New BL_MOV_FAC_Solicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oSolicitudFac As New ENT_MOV_FAC_Solicitud
                    Dim dr As DataRow = dsDatosFac.Tables(0).Rows(0)
                    vcCodEmp = dr("F_vcCodEmp").ToString()
                    vcCodSol = dr("vcCodigo").ToString()

                    Dim esDevolucion As Integer = 1
                    If (ComprobarBoolNULL(dr("esDevolucion"), False)) Then
                        esDevolucion = -1
                    End If

                    If oSolicitud.inTipSol = 2 Then 'Nuevo Equipo
                        vcDesFac = dr("vcNomTipSol").ToString() + " (" + dr("vcCodigo").ToString() + "), Equipo: " + vcModeloSolicitado + ""
                    ElseIf oSolicitud.inTipSol = 1 Or oSolicitud.inTipSol = 3 Or oSolicitud.inTipSol = 4 Then
                        vcDesFac = dr("vcNomTipSol").ToString() + " (" + dr("vcCodigo").ToString() + "), Equipo: " + vcModeloSolicitado + ", Línea:" + dr("F_vcNumLin")
                    ElseIf oSolicitud.inTipSol = 6 Or oSolicitud.inTipSol = 7 Then
                        vcDesFac = dr("vcNomTipSol").ToString() + " (" + dr("vcCodigo").ToString() + "), Línea: " + dr("F_vcNumLin")
                    Else
                        vcDesFac = dr("vcNomTipSol").ToString() + " (" + dr("vcCodigo").ToString() + ")"
                    End If

                    oSolicitudFac.Usuario = oUsuario.vcNom
                    oSolicitudFac.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                    oSolicitudFac.InTipSol = 1 'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitud
                    oSolicitudFac.DesSolicitud = vcDesFac 'Descripcion que saldra en el estado de cuenta del usuario
                    oSolicitudFac.IdEmpleado = dr("F_vcCodEmp").ToString()
                    oSolicitudFac.NumCuotas = If(Convert.ToBoolean(dr("PagoContado")), 1, inNumeroCuotas) 'Numero de cuotas que se generara el cobro
                    oSolicitudFac.BiCuotasDefinidas = ComprobarIntNULL(dr("biCuotasDefinidas"), 0) 'flag que indica si se va a pagar en cuotas definidas
                    oSolicitudFac.MesesCuotas = dr("MesesCuotasDefinidas").ToString() 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                    oSolicitudFac.MontoCuota = dcMontoSinFormat * esDevolucion 'monto mensual a cobrar en cada cuota
                    oSolicitudFac.FechaSolicitud = dr("FechaActual").ToString() 'fecha actual
                    oSolicitudFac.biPeriodoGracia = If(ComprobarBoolNULL(dr("PeriodoGracia"), False), 1, 0) 'flag que indica si tiene periodo de gracia
                    oSolicitudFac.MesesPeriodoGracia = inMesesPeriodoGracia 'los meses de periodo de gracia
                    oSolicitudFac.biInteres = If(ComprobarBoolNULL(dr("Interes"), False), 1, 0) 'flag que indica si hay interes
                    oSolicitudFac.TipoInteres = dr("TipoInteres").ToString()
                    oSolicitudFac.TasaInteres = ComprobarDecimalNULL(dr("TasaInteres"), 0)
                    oSolicitudFac.biPagoContado = If(Convert.ToBoolean(dr("PagoContado")), 1, 0) 'flag que indica si es pago al contado
                    oSolicitudFac.MesesCuotasDobles = dr("MesesCuotasDobles").ToString() 'meses que se cobra cuotas dobles separados por comas
                    oSolicitudFac.BiCuotasDobles = If(ComprobarBoolNULL(dr("CuotasDobles"), False), 1, 0) 'flag que indica si se hace el cobro en cuotas dobles
                    oSolicitudFac.P_incodsol = oSolicitud.P_inCodSol
                    'JHERRERA 20150730: Nuevos campos
                    oSolicitudFac.IdTipoProducto = 1 '1 = Equipo
                    oSolicitudFac.IdTipoProceso = 1 '1 = Regular (No es cese)
                    oSolicitudFac.IMEI = vcCodIMEI
                    oSolicitudFac.Linea = If(codNumLim = "", dr("F_vcNumLin").ToString(), codNumLim) 'Si no se entrega línea, entonces grabará el de la inicial
                    oSolicitudFac.IdOperador = Convert.ToInt32(dr("IdOperador").ToString())
                    oSolicitudFac.IdTipoLinea = 1
                    '------------------------------>>


                    Dim MensajeFactLinea As String = ""
                    'If (inTipSol = 1 Or inTipSol = 2) Then 'solicitud de cambio (cobro de equipo solicitado, envio de una facturacion)
                    oSolicitudFac.biFraccionar = True
                    oSolicitud.biFraccionamiento = True
                    'End If

                    If (inTipSol = 2 And montoLinea <> 0) Then 'solicitud de nuevo equipo (cobro de plan de la linea asignada)
                        vcDesLinFac = dr("vcNomTipSol").ToString() + " (" + dr("vcCodigo").ToString() + "), Línea: " + codNumLim

                        Dim oSolicitudFacLinea As New ENT_MOV_FAC_Solicitud
                        oSolicitudFacLinea.Usuario = oUsuario.vcNom
                        oSolicitudFacLinea.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                        oSolicitudFacLinea.InTipSol = 1 'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitud
                        oSolicitudFacLinea.DesSolicitud = vcDesLinFac 'Descripcion que saldra en el estado de cuenta del usuario
                        oSolicitudFacLinea.IdEmpleado = dr("F_vcCodEmp").ToString()
                        oSolicitudFacLinea.NumCuotas = mesesContratoLinea 'Numero de cuotas que se generara el cobro
                        oSolicitudFacLinea.BiCuotasDefinidas = ComprobarIntNULL(dr("biCuotasDefinidas"), 0) 'flag que indica si se va a pagar en cuotas definidas
                        oSolicitudFacLinea.MesesCuotas = dr("MesesCuotasDefinidas").ToString() 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                        oSolicitudFacLinea.MontoCuota = montoLinea 'monto mensual a cobrar en cada cuota
                        oSolicitudFacLinea.FechaSolicitud = dr("FechaActual").ToString() 'fecha actual
                        oSolicitudFacLinea.biPeriodoGracia = 0 'flag que indica si tiene periodo de gracia
                        oSolicitudFacLinea.MesesPeriodoGracia = inMesesPeriodoGracia 'los meses de periodo de gracia
                        oSolicitudFacLinea.biInteres = 0 'flag que indica si hay interes
                        oSolicitudFacLinea.TipoInteres = dr("TipoInteres").ToString()
                        oSolicitudFacLinea.TasaInteres = ComprobarDecimalNULL(dr("TasaInteres"), 0)
                        oSolicitudFacLinea.biPagoContado = 0 'If(Convert.ToBoolean(dr("PagoContado")), 1, 0) 'flag que indica si es pago al contado
                        oSolicitudFacLinea.MesesCuotasDobles = dr("MesesCuotasDobles").ToString() 'meses que se cobra cuotas dobles separados por comas
                        oSolicitudFacLinea.BiCuotasDobles = 0 'flag que indica si se hace el cobro en cuotas dobles
                        oSolicitudFacLinea.P_incodsol = oSolicitud.P_inCodSol
                        oSolicitudFacLinea.biFraccionar = False
                        'JHERRERA 20150730: Nuevos campos
                        oSolicitudFacLinea.IdTipoProducto = 2 '2 = Servicio
                        oSolicitudFacLinea.IdTipoProceso = 1 '1 = Regular (No es cese)
                        oSolicitudFacLinea.IMEI = vcCodIMEI
                        oSolicitudFacLinea.Linea = If(codNumLim = "", dr("F_vcNumLin").ToString(), codNumLim) 'Si no se entrega línea, entonces grabará el de la inicial
                        oSolicitudFacLinea.IdOperador = Convert.ToInt32(dr("IdOperador").ToString())
                        oSolicitudFacLinea.IdTipoLinea = 1
                        '------------------------------>>

                        'MensajeFactLinea = Fac_Solicitud.Insertar_Solicitud(oSolicitudFacLinea, sqlTrans)
                    End If

                    Dim MensajeFactDispositivo As String = ""
                    MensajeFactDispositivo = Fac_Solicitud.Insertar_Solicitud(oSolicitudFac, sqlTrans)
                    'FIN FACTURACION

                    If MensajeFactDispositivo = "" And MensajeFactLinea = "" Then
                        Select Case inTipSol
                            Case 6
                                resultadoProcesar = Solicitud.RespuestaSolicitud_Activacion(oSolicitud, daFecEnt, oUsuario, sqlTrans, IdFinanciamiento)
                            Case 7
                                resultadoProcesar = Solicitud.ProcesarSolicitud_Ampliacion(oSolicitud, oUsuario, XMLDetallePaqAmp, sqlTrans)
                            Case Else
                                resultadoProcesar = Solicitud.RespuestaSolicitud(oSolicitud, daFecEnt, oUsuario, XMLDetallePaqAmp, sqlTrans, dcLimCreSinFormat, vcCodCtaInicial, "", False, "", "", "", "", "", IdFinanciamiento)
                                'resultadoProcesar = ""
                        End Select
                        'resultado = If(resultadoProcesar = "0", "", resultadoProcesar)
                        'If resultado = "" Then biCreaPDF = True
                        If resultadoProcesar = "0" Then
                            resultado = ""
                            biCreaPDF = True
                        Else
                            resultado = resultadoProcesar
                        End If
                    Else
                        If MensajeFactDispositivo <> "" And MensajeFactLinea <> "" Then
                            If MensajeFactDispositivo <> MensajeFactLinea Then
                                resultado = MensajeFactDispositivo + "," + MensajeFactLinea
                            Else
                                resultado = MensajeFactDispositivo
                            End If
                        ElseIf MensajeFactDispositivo <> "" Then
                            resultado = MensajeFactDispositivo
                        Else
                            resultado = MensajeFactLinea
                        End If

                        If sqlTrans IsNot Nothing Then
                            sqlTrans.Rollback()
                            sqlTrans = Nothing
                        End If

                    End If
                Else
                    Select Case inTipSol
                        Case 6
                            resultadoProcesar = Solicitud.RespuestaSolicitud_Activacion(oSolicitud, daFecEnt, oUsuario, sqlTrans, IdFinanciamiento)
                        Case 7
                            resultadoProcesar = Solicitud.ProcesarSolicitud_Ampliacion(oSolicitud, oUsuario, XMLDetallePaqAmp, sqlTrans)
                        Case Else
                            Seguro = IIf(Seguro = "SI", "1", "0")
                            resultadoProcesar = Solicitud.RespuestaSolicitud(oSolicitud, daFecEnt, oUsuario, XMLDetallePaqAmp, sqlTrans,
                                                                             dcLimCreSinFormat, vcCodCtaInicial, vcColor, Seguro,
                                                                             AccionEquipo, AccionCuenta, AccionPlan,
                                                                             CambioEquipo_Cuenta, CambioEquipo_Plan, IdFinanciamiento)
                    End Select
                    resultado = If(resultadoProcesar = "0", "", resultadoProcesar)
                End If

            Catch ex As Exception
                If sqlTrans IsNot Nothing Then
                    sqlTrans.Rollback()
                    sqlTrans = Nothing
                End If
                resultado = "Error al intentar guardar la solicitud. Comuníquese con su administrador"
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
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\P_Movil\Administrar\Solicitudes\AutorizacionDescuento\", "\")

                'Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Solicitudes//AutorizacionDescuento" + CarpetaDominio + "//"
                Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "\P_Movil\Administrar\Solicitudes\AutorizacionDescuento\" + CarpetaDominio + "\"
                'Dim vcRuta As String = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~"), "\P_Movil\Administrar\Solicitudes\AutorizacionDescuento\" + CarpetaDominio + "\")
                Dim vcAutDesPDF As String = Solicitud.Reporte_AutorizacionDescuento(inCodSol, vcCodSol, vcRuta, vcCodEmp, oUsuario.P_inCod, oCultura)
            End If


            If resultado = "" Then
                'AUDITORIA:Actualizar Después
                oAuditoria.Tabla = Constantes.TableNames.Solicitud
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes)

                oAuditoria.Tabla = "MOV_TipoSolicitud_CampoSistema"
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
            If Not IsNothing(Fac_Solicitud) Then Fac_Solicitud.Dispose()
            If Not IsNothing(oCaracteristica) Then oCaracteristica.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ListarDatosAmpliacion(ByVal inCodSol As Integer) As List(Of String)
        Dim solicitud As BL_MOV_Solicitud = Nothing
        Dim oUSuario As ENT_SEG_Usuario = Nothing
        Dim resultado As List(Of String) = New List(Of String)
        Try
            oUSuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            solicitud = New BL_MOV_Solicitud(oUSuario.IdCliente)
            Dim ds As DataSet = New DataSet()
            Dim textPaquetesSol As String = String.Empty
            Dim textTipoAmpliacion As String = String.Empty
            Dim taserv As String = String.Empty
            Dim textAux As String = String.Empty
            Dim oSerial As New JavaScriptSerializer
            ds = solicitud.ListarDatosAmpliacion(inCodSol)
            'TIPO AMPLIACION
            Dim textPlan As String = ds.Tables(0).Rows(0)("codPlan").ToString()
            If textPlan = "0" Then
                textTipoAmpliacion = "Servicios"
                'AMPLIACION POR SERVICIOS
                'Dim lstServicio As New List(Of ENT_GEN_Servicio)
                taserv = "[ "
                For Each dr As DataRow In ds.Tables(1).Rows
                    'Dim oServicio As New ENT_GEN_Servicio()
                    'If dr("F_inCodTipSer") <> 0 Then
                    '    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("F_inCodTipSer"), -1)
                    '    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomTipoSer"), "")
                    '    oServicio.inCodTipDat = 2
                    'Else
                    '    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("F_inCodSer"), -1)
                    '    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomSer"), "")
                    '    oServicio.inCodTipDat = 1
                    'End If
                    'oServicio.dcCan = UtilitarioWeb.ComprobarDecimalNULL(dr("inCant"), 0)
                    'oServicio.dcMon = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCost"), 0)
                    'oServicio.TipoServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("CodigoTipo"), 0)
                    'oServicio.TipoServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("NombreTipo"), "")
                    'oServicio.TipoServicio.vcExpEn = UtilitarioWeb.ComprobarStringNULL(dr("vcexpen"), "")

                    'servicios
                    If dr("F_inCodTipSer") <> 0 Then
                        taserv = taserv + " { ""P_inCod"": """ + UtilitarioWeb.ComprobarStringNULL(dr("F_inCodTipSer"), "-1") + ""","
                        taserv = taserv + """vcNom"": """ + UtilitarioWeb.ComprobarStringNULL(dr("vcNomTipoSer"), "") + ""","
                        taserv = taserv + """inCodTipDat"": ""2"","
                    Else
                        taserv = taserv + " { ""P_inCod"": """ + UtilitarioWeb.ComprobarStringNULL(dr("F_inCodSer"), "-1") + ""","
                        taserv = taserv + """vcNom"": """ + UtilitarioWeb.ComprobarStringNULL(dr("vcNomSer"), "") + ""","
                        taserv = taserv + """inCodTipDat"": ""1"","
                    End If
                    taserv = taserv + """dcCan"": """ + UtilitarioWeb.ComprobarStringNULL(dr("inCant"), "0") + ""","
                    taserv = taserv + """dcMon"": """ + UtilitarioWeb.ComprobarStringNULL(dr("dcCost"), "0") + ""","
                    taserv = taserv + """TipoServicioP_inCod"": """ + UtilitarioWeb.ComprobarStringNULL(dr("CodigoTipo"), "0") + ""","
                    taserv = taserv + """TipoServiciovcNom"": """ + UtilitarioWeb.ComprobarStringNULL(dr("NombreTipo"), "") + ""","
                    taserv = taserv + """TipoServiciovcExpEn"": """ + UtilitarioWeb.ComprobarStringNULL(dr("vcexpen"), "") + ""","

                    taserv = taserv + """btProcesado"":""" + UtilitarioWeb.ComprobarStringNULL(dr("btProcesado"), "") + ""","
                    taserv = taserv + """btEditado"":""" + UtilitarioWeb.ComprobarStringNULL(dr("btEditado"), "") + ""","
                    taserv = taserv + """inCantProc"":""" + UtilitarioWeb.ComprobarStringNULL(dr("inCantProc"), "") + ""","
                    taserv = taserv + """dcCostProc"":""" + UtilitarioWeb.ComprobarStringNULL(dr("dcCostProc"), "0") + ""","
                    taserv = taserv + """btGuardado"":""" + UtilitarioWeb.ComprobarStringNULL(dr("btGuardado"), "") + ""","
                    taserv = taserv + """vcNomPaqAmp"":""" + UtilitarioWeb.ComprobarStringNULL(dr("vcNomPaqAmp"), "Sin Paquete") + ""","
                    taserv = taserv + """inIdPaqAmp"":""" + UtilitarioWeb.ComprobarStringNULL(dr("IdPaqueteAmpliacion"), "0") + ""","
                    taserv = taserv + """inIdPaqAmpProc"":""" + UtilitarioWeb.ComprobarStringNULL(dr("F_inCodPaqAmpProc"), "0") + """},"
                    'lstServicio.Add(oServicio)
                Next
                taserv = taserv.Substring(0, taserv.Length - 1)
                taserv = taserv + "]"
                If ds.Tables(1).Rows.Count > 0 Then
                    textPaquetesSol = taserv
                End If

                'paquetes de ampliacion
                textAux = "[ "
                For Each dr As DataRow In ds.Tables(2).Rows
                    textAux = textAux + "{""F_inTipSer"":" + dr("f_intipser").ToString() + ",""inCantidad"":" + dr("incantidad").ToString() + ",""vcNomTipoSer"":"""
                    textAux = textAux + dr("vcnomtiposer").ToString() + """,""vcExpEn"":""" + dr("vcexpen").ToString() + """,""dcCosto"":" + dr("dccosto").ToString() + ","
                    textAux = textAux + """vcNomPaqAmp"":""" + dr("vcNomPaqAmp").ToString() + """, ""IdPaqAmp"":" + dr("IdPaqueteAmpliacion").ToString() + ", ""F_inSer"":" + dr("F_inSer").ToString() + "},"
                    'textAux = textAux + "btProcesado"":" + dr("btProcesado").ToString() + ",""btEditado"":" + dr("btEditado").ToString() + ",""inCantProc"":" + dr("inCantProc").ToString() + ","
                    'textAux = textAux + "dcCostProc"":" + dr("dcCostProc").ToString() + """},"
                Next
                textAux = textAux.Substring(0, textAux.Length - 1)
                textAux = textAux + "]"
            Else
                textTipoAmpliacion = "Planes"
                'AMPLIACION POR PLANES
                Dim lstPlanes As New List(Of ENT_MOV_Plan)
                For Each dr As DataRow In ds.Tables(1).Rows
                    Dim oPlan As New ENT_MOV_Plan()
                    oPlan.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_inCod"), 0)
                    oPlan.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNom"), "")
                    oPlan.vcDes = UtilitarioWeb.ComprobarStringNULL(dr("Situacion"), "")
                    oPlan.Operador.P_inCodOpe = UtilitarioWeb.ComprobarIntNULL(dr("f_incodope"), 0)
                    oPlan.Operador.vcNomOpe = UtilitarioWeb.ComprobarStringNULL(dr("comp_vcnomcia"), "")
                    oPlan.dcMon = UtilitarioWeb.ComprobarDecimalNULL(dr("dcMon"), 0)
                    oPlan.F_inCodTip = UtilitarioWeb.ComprobarIntNULL(dr("F_inCodTip"), 0)
                    lstPlanes.Add(oPlan)
                Next
                If ds.Tables(1).Rows.Count > 0 Then
                    textPaquetesSol = oSerial.Serialize(lstPlanes)
                End If
            End If
            'solicitud.MostrarServiciosSolicitados(inCodSol)
            resultado.Add(textTipoAmpliacion)
            resultado.Add(textPaquetesSol)
            resultado.Add(textAux)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(solicitud) Then solicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ListarPlanesSeleccion(ByVal inCodOpe As Integer, ByVal inCodMod As Integer, ByVal inTipLin As Integer) As List(Of ENT_MOV_Plan)
        Dim Plan As BL_MOV_Plan = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim lstPlanes As New List(Of ENT_MOV_Plan)
        Dim lstPlanesResult As New List(Of ENT_MOV_Plan)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plan = New BL_MOV_Plan(oUsuario.IdCliente)
            lstPlanes = Plan.ListarPlanesPorModelo(inCodMod)
            For Each oPlan As ENT_MOV_Plan In lstPlanes
                If oPlan.F_inCodOpe = inCodOpe And oPlan.F_inCodTip = inTipLin Then
                    lstPlanesResult.Add(oPlan)
                End If
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plan) Then Plan.Dispose()
        End Try
        Return lstPlanesResult
    End Function

    'ADAPTACION
    <WebMethod()>
    Public Shared Function Guardar(ByVal vcCodEmp As String, ByVal vcAdmin As String, ByVal inCodSol As Integer, ByVal inCodTipSol As Integer,
                                      ByVal vcValAnt As String, ByVal vcUpdPer As String, ByVal inEstInicial As Integer, ByVal inEstFinal As Integer,
                                      ByVal biFraccionamiento As String, ByVal inNumeroCuotas As Integer, ByVal dcMonto As String,
                                      ByVal vcTabla As String, ByVal accion As String, ByVal vcComentario As String,
                                      ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer, ByVal vcDesSol As String,
                                      ByVal vcAdjuntos As String, ByVal vcColor As String, ByVal Seguro As String,
                                      ByVal IdFinanciamiento As String, ByVal IdTipoCierreSolicitud As String) As String

        If Not IsNumeric(IdFinanciamiento) Then
            IdFinanciamiento = "-1"
        End If
        Dim resultado As String = ""


        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim biFrac As Boolean = False
            'If (biFraccionamiento = "1") Then
            '    biFrac = True
            'End If

            oCaracteristica = New BL_MOV_Caracteristica(oUsuario.IdCliente)
            Dim lstObjAdjuntos As New List(Of Object)
            If (vcAdjuntos <> "") Then
                vcAdjuntos = vcAdjuntos.Substring(0, vcAdjuntos.Length - 1)
                Dim lstAdjuntos As String() = vcAdjuntos.Split(";")
                Dim CarpetaDominioUploads As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento//", "//")
                Dim byFileData As Byte()
                For i As Integer = 0 To lstAdjuntos.Length - 1
                    Dim row As String() = lstAdjuntos(i).Split(",")
                    Dim dict As New Dictionary(Of String, Object)
                    If row(1).Trim() <> "" Then 'Hay archivo Adjunto?
                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento/" + CarpetaDominioUploads + "//" + row(1)
                        Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                        byFileData = New Byte(fs.Length - 1) {}
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                        fs.Close()
                        dict.Add("Nombre", row(1))
                    Else
                        byFileData = New Byte() {}
                        dict.Add("Nombre", "")
                    End If
                    dict.Add("Campo", row(0))
                    dict.Add("Archivo", byFileData)
                    lstObjAdjuntos.Add(dict)
                Next
            End If
            oCaracteristica.ActualizarAdjuntos(lstObjAdjuntos, "MOV_Solicitud", "P_inCodSol", inCodSol)


            Dim lstObj As New List(Of Object)

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

            ''ConexionInternet = IIf(ConexionInternet = "SI", "1", "0")
            ''NumerosFrecuentes = IIf(NumerosFrecuentes = "SI", "1", "0")
            ''PaqueteSMS = IIf(PaqueteSMS = "SI", "1", "0")
            Seguro = IIf(Seguro = "SI", "1", "0")

            'resultado = Solicitud.ActualizarPersonalizada(Convert.ToInt32(inCodSol), biFraccionamiento, Convert.ToInt32(vcMesesCuotas), Convert.ToDecimal("0" + dcMonto), _
            'Convert.ToInt32(inFas), vcUpdPer, oUsuario.P_inCod, oUsuario.vcUsu, oUsuario.Mail, oCultura.vcFecCor, oCultura.vcHorCor, vcValAnt, lstObj)
            Select Case (accion)
                Case "Guardar"
                    Solicitud.GuardarPersonalizada(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inEstInicial, inEstFinal, "MOV_TipoSolicitud_CampoSistema",
                                                   biFrac, inNumeroCuotas, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)),
                                                   vcUpdPer, vcValAnt, lstObj, vcMesesCuotas, inMesesPeriodoGracia, vcDesSol, vcColor,
                                                   Seguro, IdFinanciamiento)
                    resultado = ""
                Case "Procesar"
                    'Dim TipSolFact As Integer = 1
                    'If (inCodTipSol = 31) Then
                    '    TipSolFact = 3
                    'End If
                    ''FACTURACION
                    'Dim dsDatosFac = Solicitud.DatosFacturacionSolicitud(inCodSol, "")

                    'If (dsDatosFac.Tables(0).Rows.Count > 0) Then
                    '    Dim Fac_Solicitud As New BL_MOV_FAC_Solicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    '    'Dim oSolicitudFac As New ENT_MOV_FAC_Solicitud
                    '    Dim dr As DataRow = dsDatosFac.Tables(0).Rows(0)
                    '    Dim esDevolucion As Integer = 1
                    '    If (ComprobarBoolNULL(dr("esDevolucion"), False)) Then
                    '        esDevolucion = -1
                    '    End If
                    'oSolicitudFac.Usuario = oUsuario.vcNom
                    'oSolicitudFac.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                    'oSolicitudFac.InTipSol = TipSolFact 'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitud
                    'oSolicitudFac.DesSolicitud = dr("vcCodigo").ToString() + "-" + dr("vcNomTipSol").ToString() 'Descripcion que saldra en el estado de cuenta del usuario
                    'oSolicitudFac.IdEmpleado = dr("F_vcCodEmp").ToString()
                    'oSolicitudFac.NumCuotas = Convert.ToInt32(dr("inNumeroCuotas")) 'Numero de cuotas que se generara el cobro
                    'oSolicitudFac.BiCuotasDefinidas = Convert.ToInt32(dr("biCuotasDefinidas")) 'flag que indica si se va a pagar en cuotas definidas
                    'oSolicitudFac.MesesCuotas = dr("MesesCuotasDefinidas") 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                    'oSolicitudFac.MontoCuota = Convert.ToDecimal(dr("dcMonto")) * esDevolucion 'monto mensual a cobrar en cada cuota
                    'oSolicitudFac.FechaSolicitud = dr("FechaActual").ToString() 'fecha actual
                    'oSolicitudFac.biPeriodoGracia = If(Convert.ToBoolean(dr("PeriodoGracia")), 1, 0) 'flag que indica si tiene periodo de gracia
                    'oSolicitudFac.MesesPeriodoGracia = Convert.ToInt32(dr("MesesPeriodoGracia")) 'los meses de periodo de gracia
                    'oSolicitudFac.biInteres = If(Convert.ToBoolean(dr("Interes")), 1, 0) 'flag que indica si hay interes
                    'oSolicitudFac.TipoInteres = dr("TipoInteres").ToString()
                    'oSolicitudFac.TasaInteres = Convert.ToDecimal(dr("TasaInteres"))
                    'oSolicitudFac.biPagoContado = If(Convert.ToBoolean(dr("PagoContado")), 1, 0) 'flag que indica si es pago al contado
                    'oSolicitudFac.MesesCuotasDobles = dr("MesesCuotasDobles").ToString() 'meses que se cobra cuotas dobles separados por comas
                    'oSolicitudFac.BiCuotasDobles = If(Convert.ToBoolean(dr("CuotasDobles")), 1, 0) 'flag que indica si se hace el cobro en cuotas dobles
                    'oSolicitudFac.P_incodsol = inCodSol

                    'oSolicitudFac.biFraccionar = True
                    'biFrac = True

                    'If oSolicitudFac.NumCuotas > 1 Then
                    '    oSolicitudFac.biFraccionar = True
                    '    biFrac = True
                    'Else
                    '    oSolicitudFac.biFraccionar = False
                    '    biFrac = False
                    'End If


                    '987987
                    ''Dim Mensaje As String = ""
                    ''Mensaje = Fac_Solicitud.Insertar_Solicitud(oSolicitudFac)
                    ''Fac_Solicitud.Dispose()

                    ''If Mensaje = "" Then
                    ''    Solicitud.ProcesarSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inEstInicial, inEstFinal, "MOV_SOL_" + vcTabla, _
                    ''           biFrac, vcMesesCuotas, dcMonto, vcUpdPer, vcValAnt, lstObj)
                    ''    resultado = ""
                    ''Else
                    ''    resultado = Mensaje
                    ''End If

                    'Else
                    '987987
                    ''Solicitud.ProcesarSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inEstInicial, inEstFinal, "MOV_SOL_" + vcTabla, _
                    ''           biFrac, vcMesesCuotas, dcMonto, vcUpdPer, vcValAnt, lstObj)
                    ''resultado = ""

                    'End If
                    'FIN FACTURACION
                Case "Anular_Anular" 'anular solicityd y anular ingreso en almacén
                    Solicitud.AnularSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inEstInicial, inEstFinal, "MOV_TipoSolicitud_CampoSistema",
                                                       biFrac, inNumeroCuotas, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)), vcUpdPer, vcValAnt, lstObj, vcComentario, "anular", Integer.Parse(IdTipoCierreSolicitud))
                    resultado = ""
                Case "Anular_Actualizar" 'anular solicitud y actualizar dispostivo asignado desde almacén a disponible
                    Solicitud.AnularSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inEstInicial, inEstFinal, "MOV_TipoSolicitud_CampoSistema",
                                                       biFrac, inNumeroCuotas, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)), vcUpdPer, vcValAnt, lstObj, vcComentario, "actualizar", Integer.Parse(IdTipoCierreSolicitud))
                    resultado = ""
                Case "Anular" 'solo anular la solicitud
                    Solicitud.AnularSolicitud(inCodSol, inCodTipSol, oUsuario.P_inCod, oUsuario.vcNom, inEstInicial, inEstFinal, "MOV_TipoSolicitud_CampoSistema",
                                                       biFrac, inNumeroCuotas, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)), vcUpdPer, vcValAnt, lstObj, vcComentario, "", Integer.Parse(IdTipoCierreSolicitud))
                    resultado = ""
            End Select


            If resultado = "" Then
                'AUDITORIA:Actualizar Despues
                oAuditoria.Tabla = Constantes.TableNames.Solicitud
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes)

                oAuditoria.Tabla = "MOV_TipoSolicitud_CampoSistema"
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
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
    Public Shared Function ReanudarSolicitud(ByVal idSolicitud As String) As String
        Dim blPausaSolicitud As BL_MOV_PausaSolicitud = Nothing
        Dim resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            blPausaSolicitud = New BL_MOV_PausaSolicitud(oUsuario.IdCliente)

            Dim esAdmin As Boolean = False
            If UtilitarioWeb.TipoSolicitud.EsTecnico() Or UtilitarioWeb.Seguridad.EsAdministrador Then
                esAdmin = True
            End If

            blPausaSolicitud.ReanudarSolicitud(Integer.Parse(idSolicitud), oUsuario.P_inCod, esAdmin)

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

    'ADAPTACION
    <WebMethod()>
    Public Shared Function GuardarAntesDeProcesar(ByVal inCodSol As Integer, ByVal inCodTipSol As Integer, ByVal dcMonto As String, ByVal inNumeroCuotas As Integer,
                                         ByVal inMesesPeriodoGracia As Integer, ByVal vcCodIMEI As String, ByVal codNumLim As String, ByVal dtFecEnt As String,
                                         ByVal inCodPlan As Integer, ByVal XMLDetallePaqAmp As String, ByVal vcTipoMonto As String, ByVal inModeloFinal As Integer,
                                         ByVal btSerLinEdi As Boolean, ByVal dcLimiteCredito As String, ByVal vcCodCtaInicial As String,
                                         ByVal vcAdjuntos As String, ByVal vcColor As String, ByVal Seguro As String,
                                         ByVal AccionEquipo As String, ByVal AccionCuenta As String, ByVal AccionPlan As String,
                                         ByVal CambioEquipo_Cuenta As String, ByVal CambioEquipo_Plan As String,
                                         ByVal IdFinanciamiento As String) As Integer

        If Not IsNumeric(IdFinanciamiento) Then
            IdFinanciamiento = "-1"
        End If

        Dim resultado As Integer = 0

        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim lstObj As New List(Of Object)
            Dim oSolicitud As New ENT_MOV_Solicitud

            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)


            oCaracteristica = New BL_MOV_Caracteristica(oUsuario.IdCliente)
            Dim lstObjAdjuntos As New List(Of Object)
            If (vcAdjuntos <> "") Then
                vcAdjuntos = vcAdjuntos.Substring(0, vcAdjuntos.Length - 1)
                Dim lstAdjuntos As String() = vcAdjuntos.Split(";")
                Dim CarpetaDominioUploads As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento//", "//")
                Dim byFileData As Byte()
                For i As Integer = 0 To lstAdjuntos.Length - 1
                    Dim row As String() = lstAdjuntos(i).Split(",")
                    Dim dict As New Dictionary(Of String, Object)
                    If row(1).Trim() <> "" Then 'Hay archivo Adjunto?
                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento/" + CarpetaDominioUploads + "//" + row(1)
                        Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                        byFileData = New Byte(fs.Length - 1) {}
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                        fs.Close()
                        dict.Add("Nombre", row(1))
                    Else
                        byFileData = New Byte() {}
                        dict.Add("Nombre", "")
                    End If
                    dict.Add("Campo", row(0))
                    dict.Add("Archivo", byFileData)
                    lstObjAdjuntos.Add(dict)
                Next
            End If
            oCaracteristica.ActualizarAdjuntos(lstObjAdjuntos, "MOV_Solicitud", "P_inCodSol", inCodSol)


            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.Solicitud

            'AUDITORIA:Actualizar Antes
            oAuditoria.Tabla = Constantes.TableNames.Solicitud
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {inCodSol})
            oAuditoria.Tabla = "MOV_TipoSolicitud_CampoSistema"
            Dim strAntes2 As String = oAuditoria.AntesActualizar(New String() {inCodSol})
            'Se actualizan dato....

            oSolicitud.P_inCodSol = inCodSol
            oSolicitud.inTipSol = inCodTipSol

            'convertir dcMonto a decimal sin formato
            Dim dcMontoSinFormat As Decimal = Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto))
            Dim dcLimCredSinFormat As Decimal = Convert.ToDecimal(DevuelveNumeroSinFormato(dcLimiteCredito))
            oSolicitud.Plan.P_inCod = inCodPlan
            oSolicitud.dcMonto = If(vcTipoMonto = "CIA", 0, dcMontoSinFormat)
            oSolicitud.dcMontoCIA = If(vcTipoMonto = "CIA", dcMontoSinFormat, 0)
            oSolicitud.inNumeroCuotas = inNumeroCuotas
            oSolicitud.inMesesPeriodoGracia = inMesesPeriodoGracia

            Dim daFecEnt As DateTime
            oSolicitud.DispositivoNuevo.P_vcCodIMEI = vcCodIMEI.Replace("&#39", "'")
            oSolicitud.vcNumLin = codNumLim
            If dtFecEnt.Trim() <> "" Then daFecEnt = Convert.ToDateTime(dtFecEnt.ToString) Else daFecEnt = DateTime.MinValue


            Seguro = IIf(Seguro = "SI", "1", "0")

            resultado = Solicitud.GuardarAntesDeProcesar(oSolicitud, oUsuario, daFecEnt, XMLDetallePaqAmp, inModeloFinal,
                                                         vcTipoMonto, btSerLinEdi, dcLimCredSinFormat, vcCodCtaInicial, vcColor,
                                                         Seguro,
                                                         AccionEquipo, AccionCuenta, AccionPlan, CambioEquipo_Cuenta, CambioEquipo_Plan, IdFinanciamiento)

            If resultado = 1 Then
                'AUDITORIA:Actualizar Despues
                oAuditoria.Tabla = Constantes.TableNames.Solicitud
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes)

                oAuditoria.Tabla = "MOV_TipoSolicitud_CampoSistema"
                oAuditoria.DespuesActualizar(New String() {inCodSol}, strAntes2)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
        End Try

        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ActualizarEnvioOperador(ByVal inCodSol As Integer, ByVal btEstado As Boolean, ByVal vcCodOper As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim resultado = "0"
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            resultado = Solicitud.ActualizaEnvioOperador(inCodSol, btEstado, oUsuario, False, -1, "", -1, "", "", vcCodOper)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ActualizarEnvioOperadorExterno(ByVal inCodSol As Integer, ByVal btEstado As Boolean,
                                                   ByVal pIdTipo As Integer, ByVal pIdDominio As Integer,
                                                   ByVal pDescripcion As String, ByVal pMotivo As String,
                                                   ByVal pBiEscalamiento As String, ByVal pCodigoSolicitud As String, ByVal vcCodOper As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim resultado = "0"
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            resultado = Solicitud.ActualizaEnvioOperador(inCodSol, btEstado, oUsuario, pBiEscalamiento.Equals("1"), pIdTipo, pMotivo, pIdDominio, pCodigoSolicitud, pDescripcion, vcCodOper)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function PrecioModeloXOperador(ByVal CodigoModelo As Integer, ByVal CodigoOperador As Integer, ByVal TipoPrecio As String) As String
        Dim result As String = "0"
        Dim resultado As String = ""
        Dim oCultura As ENT_GEN_Cultura = Nothing
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivoOperador = Nothing
        Try
            oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            ModeloDispositivo = New BL_MOV_ModeloDispositivoOperador(0)
            Dim dtPrecios As DataTable = ModeloDispositivo.Mostrar(CodigoOperador, CodigoModelo)
            If dtPrecios.Rows.Count > 0 Then
                result = Convert.ToDouble(dtPrecios.Rows(0)(TipoPrecio).ToString())
            End If
            'Return DevuelveNumeroFormateado(result, DevuelveFormatoNumero(oCultura))
            resultado = DevuelveNumeroFormateado_MultiPais(result, oCultura)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(ModeloDispositivo) Then ModeloDispositivo.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function ObtenerTiposExternos()
        Dim BLEscalamiento As VisualSoft.PCSistelMovil.Solicitudes.BL.BL_MOV_Escalamiento = Nothing
        Dim tipos As New List(Of VisualSoft.PCSistelMovil.Solicitudes.DA.ServiceDominio.ENT_CSOL_Tipo)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            BLEscalamiento = New VisualSoft.PCSistelMovil.Solicitudes.BL.BL_MOV_Escalamiento()
            Dim pParam As New VisualSoft.PCSistelMovil.Solicitudes.DA.ServiceDominio.PRM_Tipo()
            pParam.EsVigente = "1"
            pParam.IdUsuario = -1
            pParam.IdTipo = -1
            pParam.Nombre = ""
            Dim Licencia As String = oUsuario.Empleado.Licencia

            tipos = BLEscalamiento.ObtenerTipo_Entidad(pParam, Licencia)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(BLEscalamiento) Then BLEscalamiento.Dispose()
        End Try
        Return tipos
    End Function

End Class

