Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria
Imports System.Globalization
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Linea
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            ttgInfoDispositivo.Mensaje = "Se mostrarán los dispositivos cuyos modelos estén asociados al plan seleccionado "
            ttgInfoDispositivoRed.Mensaje = "El tipo de servicio asociado a la cuenta no es compatible con el tipo de servicio asociado al modelo o al plan."
            ttgInfoCuentaRed.Mensaje = "El tipo de servicio asociado al dispositivo no es compatible con el tipo de servicio asociado a la cuenta o al plan."
            ttgInfoPlanRed.Mensaje = "El tipo de servicio asociado al plan no es compatible con el tipo de servicio asociado a la cuenta o al dispositivo."
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim vcCodLin As String = Request.QueryString("Cod")
                'session usuario
                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                Dim inTipOri As Integer = 1
                Dim Entidad As BL_ENT_Entidad = New BL_ENT_Entidad(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oEntidad As ENT_ENT_Entidad

                hdfLinea.Value = vcCodLin
                'Obtiene controles dinámicos...

                oEntidad = Entidad.Mostrar("M_EMPL", oUsuario.P_inCod)
                ConfigurarAcciones(oUsuario, 35, oEntidad, 4, "M_EMPL")
                oEntidad = Entidad.Mostrar("Mov_Dispositivo", oUsuario.P_inCod)
                ConfigurarAcciones(oUsuario, 201, oEntidad, 3, "MOV_DISPOSITIVO")
                Entidad.Dispose()

                If Not IsPostBack Then
                    'jherrera 20130423 Creando la instancia
                    '--------------------------------------------------------------------------------------------------------------------------------------
                    Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                    '--------------------------------------------------------------------------------------------------------------------------------------
                    Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    Dim SimCard As BL_MOV_SimCard = New BL_MOV_SimCard(oUsuario.IdCliente)
                    Dim oGrupoOrigen As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(oUsuario.IdCliente)
                    Dim Dispositivo As New BL_MOV_Dispositivo(oUsuario.IdCliente)
                    Dim Campana As BL_MOV_CAM_Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)


                    'jpareja para validar el tipo de servicio asociado a una cuenta
                    Dim oparam As BL_MOV_Parametros = New BL_MOV_Parametros(oUsuario.IdCliente)
                    Try
                        hdfValidacionTipoServicio.Value = oparam.Mostrar("ValidacionTipoServicio", "ValidacionTipoServicio").Valor.ToString()
                    Catch ex As Exception
                        hdfValidacionTipoServicio.Value = "0"
                    End Try



                    'Edgar Garcia 23/07/2022
                    Dim CampoSimCard As String
                    Try
                        CampoSimCard = oparam.Mostrar("MostrarCampoSIM", "MostrarCampoSIM").Valor.ToString()
                    Catch ex As Exception
                        CampoSimCard = "1"
                    End Try

                    If (CampoSimCard = "0") Then trSIMVisible.Visible = False





                    hdfCodCliente.Value = oUsuario.IdCliente
                        'jherrera 20130423 Se llena el ddlTipo
                        '--------------------------------------
                        hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                        UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                        LineaTipo.Dispose()

                        'Tipo de Linea - wapumayta - 02-11-2015
                        Dim General = New General()
                        Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)

                        '--------------------------------------
                        UtilitarioWeb.Dataddl(ddlDiaInicial, UtilitarioWeb.ListarDias, "", "")
                        UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")

                        hdfAreaFacturacion.Value = oUsuario.AreaFacturacion.ToString()

                        UtilitarioWeb.Dataddl(ddlSimCard, SimCard.Listar(-1, "<Seleccionar>", 1), "Nombre", "P_vcSimCard")

                        Operador.Dispose()
                        UtilitarioWeb.Dataddl(ddlDispositivo, Dispositivo.ListarLibre(-1, "<Seleccionar>"), "vcNom", "P_vcCodIMEI")
                        Dispositivo.Dispose()
                        UtilitarioWeb.Dataddl(ddlCampana, Campana.Listar(-1, "<Seleccione>"), "Descripcion", "IdCampana")
                        Campana.Dispose()
                        If Not String.IsNullOrEmpty(vcCodLin) Then
                            'UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.Listar(-1, "<Seleccionar>"), "vcNom", "P_vcCod")
                            'Cuenta.Dispose()
                            'UtilitarioWeb.Dataddl(ddlPlan, Plan.Listar(-1, "<Seleccionar>"), "vcNom", "P_inCod")
                            'Plan.Dispose()

                            GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Linea", tbCamposDinamicos, "", "../../../", "P_vcNum", vcCodLin)

                            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(oUsuario.IdCliente)
                            Dim oLinea As DataSet = Linea.Mostrar(vcCodLin)
                            Linea.Dispose()
                            Dim lstGrupoAgregado As New List(Of Object)
                            Dim lstGrupoNoAgregado As New List(Of Object)
                            Dim oSerializer As New JavaScriptSerializer

                            txtNumero.Text = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("P_vcNum"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            If UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodEmp"), "") <> "" Then
                                hdfCodEmpleado.Value = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodEmp"), "")
                                txtEmpleado.Text = hdfCodEmpleado.Value + "-" + UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("vcNomEmp"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            End If
                            If IsNothing(ddlDispositivo.Items.FindByValue(UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodIMEI"), ""))) And
                                                                          UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodIMEI"), "") <> "" Then
                                ddlDispositivo.Items.Add(New ListItem(UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodIMEI"), "") & " - " &
                                                                      UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("vcNomModDis"), ""),
                                                                      UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodIMEI"), "")))
                            End If

                            hdfIdAreaSel.Value = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("Codint2"), "")

                            If UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodIMEI"), "") <> "" Then
                                hdfCodDispositivos.Value = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodIMEI"), "")
                                txt_Dispositivos.Text = hdfCodDispositivos.Value + "-" + UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("vcNomModDis"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            End If

                            Try
                                hdfEsPlanRoaming.Value = oLinea.Tables(0).Rows(0)("RoamingPlan").ToString()
                            Catch ex As Exception
                            End Try


                            If (oLinea.Tables(0).Rows(0)("FechaAsigEmpleado").ToString() <> "") Then
                                Dim dtFechaEmpleado As Date = oLinea.Tables(0).Rows(0)("FechaAsigEmpleado")
                                If oLinea.Tables(0).Rows(0)("ObsAsigEmpleado").ToString().Contains("Desvinculación") Then
                                    LblAsignacionEmpleado.Text = "Fecha desvinculación"
                                Else
                                    LblAsignacionEmpleado.Text = "Asignación Empleado"
                                End If
                                Dim vcFechaEmpleadoANSI As String = dtFechaEmpleado.Year.ToString() + New String("0", 2 - dtFechaEmpleado.Month.ToString().Length) + dtFechaEmpleado.Month.ToString() +
                                                            New String("0", 2 - dtFechaEmpleado.Day.ToString().Length) + dtFechaEmpleado.Day.ToString()
                                txtFechaAsignacionEmpleado.Text = UtilitarioWeb.DevuelveFechaFormateada(vcFechaEmpleadoANSI, oCultura.vcFecCor).ToString()
                                hdfFechaAsignacionEmpleado.Value = txtFechaAsignacionEmpleado.Text
                                trFechaAsignacionEmpleado.Style("display") = ""
                            Else
                                trFechaAsignacionEmpleado.Style("display") = "none"
                                txtFechaAsignacionEmpleado.Text = ""
                                hdfFechaAsignacionEmpleado.Value = ""
                            End If


                            If (oLinea.Tables(0).Rows(0)("FechaAsigDispositivo").ToString() <> "") Then
                                Dim dtFechaDispositivo As Date = oLinea.Tables(0).Rows(0)("FechaAsigDispositivo")
                                If oLinea.Tables(0).Rows(0)("ObsAsigDispositivo").ToString().Contains("Desvinculación") Then
                                    LblAsignacionDispositivo.Text = "Fecha desvinculación"
                                Else
                                    LblAsignacionDispositivo.Text = "Asignación Dispositivo"
                                End If
                                Dim vcFechaDispositivoANSI As String = dtFechaDispositivo.Year.ToString() + New String("0", 2 - dtFechaDispositivo.Month.ToString().Length) + dtFechaDispositivo.Month.ToString() +
                                                            New String("0", 2 - dtFechaDispositivo.Day.ToString().Length) + dtFechaDispositivo.Day.ToString()
                                txtFechaAsignacionDispositivo.Text = UtilitarioWeb.DevuelveFechaFormateada(vcFechaDispositivoANSI, oCultura.vcFecCor).ToString()
                                hdfFechaAsignacionDispositivo.Value = txtFechaAsignacionDispositivo.Text
                                trFechaAsignacionDispositivo.Style("display") = ""
                            Else
                                'If hdfCodDispositivos.Value <> "" Then
                                '    trFechaAsignacionDispositivo.Style("display") = ""
                                'Else
                                trFechaAsignacionDispositivo.Style("display") = "none"
                                'End If

                                txtFechaAsignacionDispositivo.Text = ""
                                hdfFechaAsignacionDispositivo.Value = ""
                            End If

                            lblCentroCosto.Text = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("P_vcCodCenCos"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """") & " - " &
                                                  UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("vcNomCenCos"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            hdfAsigCred.Value = UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodTipAsiCre"), -1).ToString() 'oLinea.Cuenta.TipoAsignacionCredito.P_inCod.ToString()
                            hdfPerFac.Value = UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodTipPerFac"), -1).ToString() 'oLinea.Cuenta.TipoPeriodoFacturacion.P_inCod.ToString()
                            txtSucursal.Text = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("vcNomSuc"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """") 'oLinea.Sucursal.vcNom
                            hdfCodSucursal.Value = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodSuc"), "") 'oLinea.Sucursal.P_vcCod
                            ddlOperador.SelectedValue = UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodOpe"), -1).ToString() 'oLinea.Operador.P_inCodOpe.ToString()

                            Dim sim As String = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcSimCard"), "-1").ToString()
                            If sim <> "-1" Then
                                ddlSimCard.Items.Add(New ListItem(oLinea.Tables(0).Rows(0)("F_vcSimCard"), oLinea.Tables(0).Rows(0)("F_vcSimCard")))
                            End If

                            ddlSimCard.SelectedValue = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcSimCard"), "-1").ToString() 'oLinea.Operador.P_inCodOpe.ToString()


                            hdfOperador.Value = UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodOpe"), -1).ToString() 'oLinea.Operador.P_inCodOpe.ToString()
                            'ddlCuenta.SelectedValue = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("F_vcCodCue"), "") 'oLinea.Cuenta.P_vcCod
                            hdfCodCuenta.Value = oLinea.Tables(0).Rows(0)("F_vcCodCue").ToString
                            hdfCodSuc.Value = oLinea.Tables(0).Rows(0)("F_vcCodSuc").ToString
                            'ddlPlan.SelectedValue = UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodPla"), -1).ToString() 'oLinea.Plan.P_inCod.ToString()
                            hdfCodPlan.Value = oLinea.Tables(0).Rows(0)("F_inCodPla").ToString
                            hdfLineaPlanTemp.Value = oLinea.Tables(0).Rows(0)("F_inCodPla").ToString
                            hdfLineaOperadorTemp.Value = UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodOpe"), -1).ToString()
                            hdfLineaCuentaTemp.Value = oLinea.Tables(0).Rows(0)("F_vcCodCue").ToString
                            ddlDiaInicial.SelectedValue = UtilitarioWeb.ComprobarDecimalNULL(oLinea.Tables(0).Rows(0)("dcPerFacIni"), 1).ToString() 'oLinea.dcPerFacIni.ToString()
                            lblDiaFinal.Text = UtilitarioWeb.ComprobarDecimalNULL(oLinea.Tables(0).Rows(0)("dcPerFacFin"), 30).ToString() 'oLinea.dcPerFacFin.ToString()
                            'txtMonto.Text = UtilitarioWeb.ComprobarDecimalNULL(oLinea.Tables(0).Rows(0)("dcMon"), 0).ToString() 'oLinea.dcMon.ToString()
                            If oCultura.vcCodCul.ToString() = "es-PE" Then
                                txtMonto.Text = UtilitarioWeb.ComprobarDecimalNULL(oLinea.Tables(0).Rows(0)("dcMon"), 0).ToString()
                            Else
                                txtMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(UtilitarioWeb.ComprobarDecimalNULL(oLinea.Tables(0).Rows(0)("dcMon"), 0).ToString(), oCultura).ToString()
                            End If

                            chkEstado.Checked = UtilitarioWeb.ComprobarBoolNULL(oLinea.Tables(0).Rows(0)("btVig"), False) 'oLinea.btVig
                            hdfEstadoLinea.Value = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("btVig"), "")
                            hdfEstadoEmpleado.Value = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("vcEstadoEmp"), "")
                            'jherrera 20130423 Se agrego el ddlLineaTipo
                            '-------------------------------------------
                            ddlLineaTipo.SelectedValue = UtilitarioWeb.ComprobarIntNULL("0" + oLinea.Tables(0).Rows(0)("F_inCodTip"), -1).ToString() 'oLinea.dcPerFacIni.ToString()
                            hdfLineaTipo.Value = UtilitarioWeb.ComprobarIntNULL("0" + oLinea.Tables(0).Rows(0)("F_inCodTip"), -1).ToString() 'oLinea.dcPerFacIni.ToString()
                            hdfLineaTipoTemp.Value = UtilitarioWeb.ComprobarIntNULL("0" + oLinea.Tables(0).Rows(0)("F_inCodTip"), -1).ToString() 'oLinea.dcPerFacIni.ToString()
                            '-------------------------------------------
                            'Situacion de liena
                            trSituacion.Style("display") = ""
                            lblSituacion.Text = oLinea.Tables(0).Rows(0)("vcNomEst").ToString()
                            hdfCodSituacion.Value = UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodEst"), 0)
                            If UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("F_inCodEst"), 0) = 36 Then
                                chkDarBaja.Text = "Dar de alta"
                                hdfSituacion.Value = "0"
                                trInformacionServicios.Style("display") = ""
                            Else
                                chkDarBaja.Text = "Dar de baja"
                                hdfSituacion.Value = "1"
                                trInformacionServicios.Style("display") = "none"
                            End If

                            If (hdfAsigCred.Value = 1) Then
                                If (hdfCodCuenta.Value <> "" Or hdfCodCuenta.Value <> "-1") And
                                    (hdfCodDispositivos.Value <> "" Or hdfCodDispositivos.Value <> "-1") And
                                    (hdfCodPlan.Value <> "" Or hdfCodPlan.Value <> "-1") Then
                                    If (oLinea.Tables(0).Rows(0)("F_vcCodIMEI").ToString() <> "") Then
                                        If oLinea.Tables(0).Rows(0)("IdTipSerModelo").ToString() <> oLinea.Tables(0).Rows(0)("IdTipSerCuenta").ToString() Then
                                            dvToolTipRed_d.Style("display") = ""
                                            dvToolTipRed_c.Style("display") = ""
                                            hdfPermitirGuardarTipSer.Value = "0"
                                        End If
                                        If oLinea.Tables(0).Rows(0)("IdTipSerModelo").ToString() <> oLinea.Tables(0).Rows(0)("IdTipSerPlan").ToString() Then
                                            dvToolTipRed_d.Style("display") = ""
                                            dvToolTipRed_p.Style("display") = ""
                                            hdfPermitirGuardarTipSer.Value = "0"
                                        End If
                                    End If
                                    If oLinea.Tables(0).Rows(0)("IdTipSerPlan").ToString() <> oLinea.Tables(0).Rows(0)("IdTipSerCuenta").ToString() Then
                                        dvToolTipRed_p.Style("display") = ""
                                        dvToolTipRed_c.Style("display") = ""
                                        hdfPermitirGuardarTipSer.Value = "0"
                                    End If
                                End If
                            ElseIf (hdfAsigCred.Value = 2) Then
                                If (oLinea.Tables(0).Rows(0)("F_vcCodCue").ToString() <> "" Or oLinea.Tables(0).Rows(0)("F_vcCodCue").ToString() <> "-1") And
                                    (hdfCodDispositivos.Value <> "" Or hdfCodDispositivos.Value <> "-1") Then
                                    If oLinea.Tables(0).Rows(0)("IdTipSerModelo").ToString() <> oLinea.Tables(0).Rows(0)("IdTipSerCuenta").ToString() Then
                                        dvToolTipRed_d.Style("display") = ""
                                        dvToolTipRed_c.Style("display") = ""
                                        hdfPermitirGuardarTipSer.Value = "0"
                                    Else
                                        dvToolTipRed_d.Style("display") = "none"
                                        dvToolTipRed_c.Style("display") = "none"
                                        hdfPermitirGuardarTipSer.Value = "1"
                                    End If
                                End If
                            End If




                            hdfTipoServicioCuenta.Value = oLinea.Tables(0).Rows(0)("IdTipSerCuenta").ToString()
                            hdfTipoServicioDispositivo.Value = oLinea.Tables(0).Rows(0)("IdTipSerModelo").ToString()
                            hdfTipoServicioPlan.Value = oLinea.Tables(0).Rows(0)("IdTipSerPlan").ToString()

                            ddlCampana.SelectedValue = UtilitarioWeb.ComprobarIntNULL("0" + oLinea.Tables(0).Rows(0)("IdCampana"), -1).ToString()
                            If UtilitarioWeb.ComprobarIntNULL(oLinea.Tables(0).Rows(0)("MesesContrato"), 0) = 0 Then
                                txtFechaInicioContrato.Text = ""
                                'ddlMesesContrato.SelectedValue = "-1"
                                txtMesesContrato.Text = ""
                            Else
                                If oLinea.Tables(0).Rows(0)("FechaInicioContrato").ToString() <> "" Then
                                    Dim dtFecha As Date = oLinea.Tables(0).Rows(0)("FechaInicioContrato")
                                    Dim vcFechaANSI As String = dtFecha.Year.ToString() + New String("0", 2 - dtFecha.Month.ToString().Length) + dtFecha.Month.ToString() +
                                                                New String("0", 2 - dtFecha.Day.ToString().Length) + dtFecha.Day.ToString()
                                    txtFechaInicioContrato.Text = UtilitarioWeb.DevuelveFechaFormateada(vcFechaANSI, oCultura.vcFecCor).ToString()
                                Else
                                    txtFechaInicioContrato.Text = ""
                                End If
                                'ddlMesesContrato.SelectedValue = oLinea.Tables(0).Rows(0)("MesesContrato")
                                txtMesesContrato.Text = oLinea.Tables(0).Rows(0)("MesesContrato")
                            End If
                            LblFechaCampana.Text = UtilitarioWeb.ComprobarStringNULL(oLinea.Tables(0).Rows(0)("FechaCampana"), "")

                            'fecha de alta
                            If (oLinea.Tables(0).Rows(0)("FechaAlta").ToString() <> "") Then
                                Dim dtFechaAlta As Date = oLinea.Tables(0).Rows(0)("FechaAlta")
                                Dim vcFechaAltaANSI As String = dtFechaAlta.Year.ToString() + New String("0", 2 - dtFechaAlta.Month.ToString().Length) + dtFechaAlta.Month.ToString() +
                                                                New String("0", 2 - dtFechaAlta.Day.ToString().Length) + dtFechaAlta.Day.ToString()
                                txtFechaAlta.Text = UtilitarioWeb.DevuelveFechaFormateada(vcFechaAltaANSI, oCultura.vcFecCor).ToString()
                            Else
                                txtFechaAlta.Text = ""
                            End If

                            If hdfCodEmpleado.Value = "" Then
                                trGrupoOrigen.Style("display") = "none"
                                lblGrupoOrigen.Text = ""
                                hdfCodGrupoOrigen.Value = ""
                            Else
                                trGrupoOrigen.Style("display") = ""
                                Dim objEnt_GrupoOrigen As ENT_GEN_GrupoOrigen = oGrupoOrigen.ObtenerGrupoOrigenPorEmpleado(hdfCodEmpleado.Value, hdfLineaTipo.Value)
                                If objEnt_GrupoOrigen.vcNomGru = "" Then
                                    lblGrupoOrigen.Text = "[Sin Grupo Origen Asociado]"
                                    hdfCodGrupoOrigen.Value = 0
                                Else
                                    lblGrupoOrigen.Text = objEnt_GrupoOrigen.vcNomGru
                                    hdfCodGrupoOrigen.Value = objEnt_GrupoOrigen.P_inCodGruOri
                                End If
                            End If

                            Dim lstServicio As New List(Of ENT_GEN_Servicio)
                            Dim lstEmpleadoResponsable As New List(Of ENT_PCS_EMP_OrgaJefatura)

                            For Each dr As DataRow In oLinea.Tables(1).Rows
                                Dim oServicio As New ENT_GEN_Servicio()
                                If dr("P_F_inCodTipSer") <> 0 Then
                                    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodTipSer"), -1)
                                    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomTipoSer"), "")
                                    oServicio.dcMon = UtilitarioWeb.ComprobarDecimalNULL(dr("dcMon"), 0)
                                    oServicio.inTipAsig = UtilitarioWeb.ComprobarIntNULL(dr("InTipoAsig"), 1)
                                    oServicio.dcMonTotalCta = UtilitarioWeb.ComprobarDecimalNULL(dr("dcMonTotCta"), 0)
                                    oServicio.dcCanTotalCta = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCanTotCta"), 0)
                                    oServicio.inCodTipDat = 2
                                Else
                                    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodSer"), -1)
                                    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomSer"), "")
                                    oServicio.dcMon = UtilitarioWeb.ComprobarDecimalNULL(dr("dcMon"), 0)
                                    oServicio.inTipAsig = UtilitarioWeb.ComprobarIntNULL(dr("InTipoAsig"), 1)
                                    oServicio.dcMonTotalCta = UtilitarioWeb.ComprobarDecimalNULL(dr("dcMonTotCta"), 0)
                                    oServicio.dcCanTotalCta = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCanTotCta"), 0)
                                    oServicio.inCodTipDat = 1
                                End If
                                oServicio.dcCan = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCan"), 0)
                                lstServicio.Add(oServicio)
                            Next

                            For Each dr As DataRow In oLinea.Tables(3).Rows
                                Dim oEmpleadoResponsable As New ENT_PCS_EMP_OrgaJefatura()
                                oEmpleadoResponsable.vcCodOrga = UtilitarioWeb.ComprobarStringNULL(dr("vcCodOrg"), "")
                                oEmpleadoResponsable.vcCodInt = UtilitarioWeb.ComprobarStringNULL(dr("vcCodInt"), "")
                                oEmpleadoResponsable.vcArea = UtilitarioWeb.ComprobarStringNULL(dr("vcCodArea"), "")
                                oEmpleadoResponsable.vcCodEmpleado = UtilitarioWeb.ComprobarStringNULL(dr("vcCodEmpl"), "")
                                oEmpleadoResponsable.vcNomEmpleado = UtilitarioWeb.ComprobarStringNULL(dr("vcNomEmpl"), "")
                                oEmpleadoResponsable.vcCorreo = UtilitarioWeb.ComprobarStringNULL(dr("vcCorreo"), "")
                                lstEmpleadoResponsable.Add(oEmpleadoResponsable)
                            Next


                            If hdfLineaTipo.Value <> "0" Then

                                If hdfCodLinTip_X_User.Value <> 0 Then
                                    Dim msgFiltro As String = String.Empty
                                    ddlLineaTipo.Enabled = False
                                    ddlLineaTipo.SelectedValue = hdfCodLinTip_X_User.Value
                                    txt_Dispositivos.Enabled = True
                                    txt_Dispositivos.Style("color") = ""
                                    txt_Dispositivos.Style("font-size") = ""
                                    txt_Dispositivos.Style("font-weight") = ""
                                    txt_Dispositivos.Style("font-style") = ""
                                    '.Text = ""
                                    If hdfCodLinTip_X_User.Value = 1 Then
                                        trCampana.Style("display") = "none"
                                    Else
                                        trCampana.Style("display") = ""
                                    End If
                                    msgFiltro = ddlLineaTipo.SelectedItem.Text
                                    ''lblMsgDispositivos.Text = "(Dispositivos tipo " + msgFiltro + ")"
                                    ''lblMsgCuenta.Text = "(Cuentas tipo " + msgFiltro + ")"
                                    ''lblMsgPlan.Text = "(Planes tipo " + msgFiltro + ")"

                                    lblMsgDispositivos.Text = ""
                                    lblMsgCuenta.Text = ""
                                    lblMsgPlan.Text = ""

                                    'Else
                                    '    txt_Dispositivos.Enabled = False
                                    '    txt_Dispositivos.Style("color") = "grey"
                                    '    txt_Dispositivos.Style("font-size") = "90%"
                                    '    txt_Dispositivos.Style("font-weight") = "bold"
                                    '    txt_Dispositivos.Style("font-style") = "italic"
                                    '    txt_Dispositivos.Text = "Debe seleccionar Tipo de Línea"
                                End If
                            End If

                            If oLinea.Tables(1).Rows.Count > 0 Then
                                Dim oSerial As New JavaScriptSerializer
                                hdfServicio.Value = oSerial.Serialize(lstServicio)
                            End If

                            If oLinea.Tables(3).Rows.Count > 0 Then
                                Dim oSerial As New JavaScriptSerializer
                                LblResponsableTitulo.Text = ""
                                hdfEmplResponsable.Value = oSerial.Serialize(lstEmpleadoResponsable)
                            Else
                                LblResponsableTitulo.Text = "NO SE HA ASIGNADO UNA JEFATURA AL AREA ACTUAL."
                            End If

                            If ddlLineaTipo.SelectedValue = 2 Then
                                trCampana.Style("display") = ""
                            Else
                                trCampana.Style("display") = "none"
                            End If
                            If hdfPerFac.Value = "2" Then 'Por linea
                                trPeriodo.Style("display") = ""
                            Else 'Por cuenta y otros
                                trPeriodo.Style("display") = "none"
                            End If

                            If hdfAsigCred.Value = "1" Then 'Por planes
                                trMonto.Style("display") = ""
                                'dvAsignacion.Style("display") = "none"
                                trPlan.Style("display") = ""
                                dvToolTip.Style("display") = ""
                            ElseIf hdfAsigCred.Value = "2" Then 'Por distribución de bolsa
                                trPlan.Style("display") = "none"
                                dvToolTip.Style("display") = "none"
                                trMonto.Style("display") = ""
                                'dvAsignacion.Style("display") = ""
                            Else 'libre y otros
                                trPlan.Style("display") = "none"
                                dvToolTip.Style("display") = "none"
                                trMonto.Style("display") = "none"
                                'dvAsignacion.Style("display") = "none"
                            End If

                            hdfLinea.Value = vcCodLin
                            txtNumero.Enabled = False

                            If chkEstado.Checked Then
                                trEstado.Style("display") = "none"
                            Else
                                'dvDarBaja.Style("display") = "none"
                            End If

                            If hdfEstadoLinea.Value = "True" And hdfEstadoEmpleado.Value = "False" Then
                                'txtEmpleado.Enabled = False
                                trEmplResponsable.Style("display") = ""
                                If LblResponsableTitulo.Text <> "" Then
                                    trTituloEmplResponsable.Style("display") = ""
                                    trEmplResponsable.Style("display") = "none"
                                Else
                                    trTituloEmplResponsable.Style("display") = "none"
                                    trEmplResponsable.Style("display") = ""
                                End If
                            Else
                                txtEmpleado.Enabled = True
                                trEmplResponsable.Style("display") = "none"
                                trTituloEmplResponsable.Style("display") = "none"
                            End If

                            'validaciones meses de contrato (solo para linea tipo familia, adminstrador puede eliminar siempre)
                            If ddlLineaTipo.SelectedValue = 2 Then 'linea de tipo familia
                                If txtMesesContrato.Text <> "0" And txtFechaInicioContrato.Text <> "" Then
                                    Dim MesesContratoLinea As Integer = txtMesesContrato.Text
                                    Dim FechaInicioContratoLinea As Date = Convert.ToDateTime(txtFechaInicioContrato.Text)
                                    Dim FechaActual As Date = Date.Now
                                    Dim FechaFinContratoLinea As Date = DateAdd(DateInterval.Month, MesesContratoLinea, FechaInicioContratoLinea)
                                    If (FechaActual < FechaFinContratoLinea) Then
                                        lblBajaCon.Text = "No ha cumplido el tiempo de contrato"
                                        If oUsuario.EsAdministrador = False Then 'deshabilita el check si usuario logeado no es admin
                                            chkDarBaja.Enabled = False
                                        End If
                                    End If
                                End If
                            End If

                            'txtMesesContrato.Text = oLinea.Tables(0).Rows(0)("MesesContrato")
                            If Not IsDBNull(oLinea.Tables(0).Rows(0)("MesesContrato")) Then
                                'ddlMesesContrato.SelectedValue = oLinea.Tables(0).Rows(0)("MesesContrato")
                                txtMesesContrato.Text = oLinea.Tables(0).Rows(0)("MesesContrato")
                            End If
                            'txtFechaInicioContrato.Text = oLinea.Tables(0).Rows(0)("FechaInicioContrato")

                            'Obtiene Valores de Campos Dinamicos...
                            GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("MOV_Linea", Me, oLinea.Tables(0))

                            'Validacion de datos relacionados (Plan ModeloDispositivo GrupoOrigenEmpleado)
                            Dim drValidLin As DataRow = oLinea.Tables(2).Rows(0)
                            If (Convert.ToBoolean(drValidLin("Plan-Modelo"))) Then
                                lblMensajeLinea.Text = drValidLin("Mensaje_1").ToString()
                                hdfMensajeLinea.Value = "P"
                            ElseIf (Convert.ToBoolean(drValidLin("Grupo-Modelo"))) Then
                                lblMensajeLinea.Text = drValidLin("Mensaje_2").ToString()
                                hdfMensajeLinea.Value = "G"
                            Else
                                lblMensajeLinea.Text = ""
                                hdfMensajeLinea.Value = ""
                            End If
                        Else

                            GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Linea", tbCamposDinamicos, "", "../../../", "", "")

                            hdfLinea.Value = ""
                            hdfAsigCred.Value = "-1"
                            hdfPerFac.Value = "-1"
                            lblDiaFinal.Text = "30"
                            trEstado.Style("display") = "none"
                            txtNumero.Focus()
                            hdfLineaPlanTemp.Value = "-1"
                            hdfLineaOperadorTemp.Value = "-1"
                            hdfLineaCuentaTemp.Value = "-1"
                            tbAgregarServicios.Style("display") = "none"
                            dvMensajeOperadorXSeleccionar.Style("display") = ""
                            dvMensajeOperadorSeleccionado.Style("display") = ""
                            trMonto.Style("display") = "none"
                            trInformacionServicios.Style("display") = "none"
                            txt_Dispositivos.Enabled = False
                            txt_Dispositivos.Style("color") = "grey"
                            txt_Dispositivos.Style("font-size") = "90%"
                            txt_Dispositivos.Style("font-weight") = "bold"
                            txt_Dispositivos.Style("font-style") = "italic"
                            If ddlLineaTipo.Items.Count > 2 Then
                                txt_Dispositivos.Text = "Debe seleccionar Tipo de Línea"
                            End If
                        End If
                    End If

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

            If ddlLineaTipo.Items.Count = 2 Then
                ddlLineaTipo.Enabled = False
                ddlLineaTipo.SelectedIndex = 1
            End If





        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcLin As String, ByVal vcCamDim As String, ByVal oLinea As String, ByVal vcAsignacionEmpleado As String,
                                   ByVal vcAsignacionDispositivo As String, ByVal vcAsignacionANSIEmpleado As String, ByVal vcAdj As String,
                                   ByVal vcAsignacionANSIDispositivo As String, ByVal vcXMLServAdic As String,
                                   ByVal vcLiberarEmpleado As String, ByVal vcLiberarDispositivo As String) As String
        Dim Linea As BL_MOV_Linea = Nothing
        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oLinea As ENT_MOV_Linea = oSerializer.Deserialize(Of ENT_MOV_Linea)(oLinea)

            v_oLinea.Dispositivo.P_vcCodIMEI = v_oLinea.Dispositivo.P_vcCodIMEI.Replace("&#39", "'")
            v_oLinea.Cuenta.P_vcCod = v_oLinea.Cuenta.P_vcCod.Replace("&#39", "'")
            'jherrera 20130423 Se agrego la validación para el campo F_inCodTip
            '------------------------------------------------------------------
            v_oLinea.F_inCodTip = v_oLinea.F_inCodTip
            '------------------------------------------------------------------
            Dim _return As String = String.Empty

            oCaracteristica = New BL_MOV_Caracteristica(oUsuario.IdCliente)
            Dim lstObj As New List(Of Object)
            If (vcAdj <> "") Then
                vcAdj = vcAdj.Substring(0, vcAdj.Length - 1)
                Dim lstAdjuntos As String() = vcAdj.Split(";")
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
                    lstObj.Add(dict)
                Next
            End If

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Móvil"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Línea"
            oAuditoria.Tabla = Constantes.TableNames.LineasMovil

            Dim strAntes As String = ""
            If vcLin = "" Then
                '_return = Linea.Insertar(v_oLinea, vcCamDim, vcXMLServAdic).ToString()
                _return = Linea.Insertar(v_oLinea, vcCamDim, vcXMLServAdic, vcAsignacionEmpleado, vcAsignacionDispositivo, vcAsignacionANSIEmpleado, vcAsignacionANSIDispositivo).ToString()
                If _return = "0" Then

                    oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Linea", "P_vcNum", v_oLinea.P_vcNum)

                    oAuditoria.Insertar(New String() {v_oLinea.P_vcNum})
                End If
            Else
                'AUDITORIA:Actualizar Antes
                strAntes = oAuditoria.AntesActualizar(New String() {v_oLinea.P_vcNum})
                'Dim ds As DataSet = Linea.Actualizar(v_oLinea, vcCamDim, vcXMLServAdic)
                Dim ds As DataSet = Linea.Actualizar(v_oLinea, vcCamDim, vcXMLServAdic, vcAsignacionEmpleado, vcAsignacionDispositivo, vcAsignacionANSIEmpleado,
                                                     vcAsignacionANSIDispositivo, Convert.ToBoolean(vcLiberarEmpleado),
                                                     Convert.ToBoolean(vcLiberarDispositivo))

                'Actualizar adjuntos...
                oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Linea", "P_vcNum", v_oLinea.P_vcNum)

                Dim lstCod As List(Of String) = New List(Of String)
                Dim lstNom As List(Of String) = New List(Of String)
                If ds.Tables(0).Rows(0)("Resultado").ToString() = "-1" Then
                    For Each dr As DataRow In ds.Tables(0).Rows
                        lstCod.Add(dr("vcCodServ").ToString())
                        lstNom.Add(dr("vcnomser").ToString())
                    Next
                    _return = String.Join(",", lstCod) + "-" + String.Join(",", lstNom)
                ElseIf ds.Tables(0).Rows(0)("Resultado").ToString() = "-2" Then
                    _return = "-2"
                ElseIf ds.Tables(0).Rows(0)("Resultado").ToString() = "-3" Then
                    _return = "-3"
                Else
                    _return = ds.Tables(0).Rows(0)("Resultado").ToString()
                End If

                If _return = "0" Then
                    oAuditoria.DespuesActualizar(New String() {v_oLinea.P_vcNum}, strAntes)
                End If
            End If

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String, ByVal inCodTip As Integer) As List(Of ENT_MOV_Cuenta)
        Dim newResult As List(Of ENT_MOV_Cuenta)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(Convert.ToInt32(inCodOpe), Convert.ToInt32(oUsuario.P_inCod))
            newResult = (From c In _return Where c.F_inCodTip = inCodTip).ToList()
            Return newResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarSucursales() As List(Of ENT_GEN_Sucursal)
        Dim newResult As List(Of ENT_GEN_Sucursal)
        Dim Sucursal As BL_GEN_EmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Try
            newResult = Sucursal.ListaSucursal()
            Return newResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Sucursal) Then Sucursal.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPlanPorOperador(ByVal inCodOpe As String, ByVal CodCuenta As String,
                                                 ByVal Linea As String) As List(Of ENT_MOV_Plan)
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Plan.ListarPorOperador(Convert.ToInt32(inCodOpe), CodCuenta, Linea)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plan) Then Plan.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetalleCuenta(ByVal vcCodCue As String) As ENT_MOV_Cuenta
        Try
            Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim _return As ENT_MOV_Cuenta = Cuenta.Mostrar(vcCodCue.Replace("&#39", "'"), oCultura)
            Cuenta.Dispose()

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetallePlanes(ByVal vcCodPlan As String) As ENT_MOV_Plan
        Try
            Dim Plan As BL_MOV_Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim _return As ENT_MOV_Plan = Plan.Mostrar(vcCodPlan)
            Plan.Dispose()

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicioPorCuenta(ByVal vcCodCue As String) As List(Of ENT_GEN_Servicio)
        Try
            Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarTiposServiciosPorCuenta(vcCodCue.Replace("&#39", "'"))
            Servicio.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicioPorCuentaLineas(ByVal vcCodCue As String, ByVal inCodTipSer As Integer) As List(Of ENT_GEN_Servicio)
        Try
            Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarServicioPorCuentaLineas(vcCodCue.Replace("&#39", "'"), inCodTipSer)
            Servicio.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDispositivosDisponibles_PlanTipLin(ByVal maxFilas As Integer, ByVal vcNomDisp As String, _
                                                                    ByVal idCliente As Integer, ByVal inCodPla As Integer, _
                                                                    ByVal inTipLin As Integer) As List(Of ENT_MOV_Dispositivo)
        Try
            Dim Dispositivo As New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstDispositivo As List(Of ENT_MOV_Dispositivo) = Dispositivo.ListarDisponible_x_TipLin_Plan(vcNomDisp, maxFilas, inCodPla, inTipLin)
            Dispositivo.Dispose()

            Return lstDispositivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDispositivosDisponibles_GrupoOrigenTipLin(ByVal maxFilas As Integer, ByVal vcNomDisp As String, _
                                                                           ByVal idCliente As Integer, ByVal inCodGrupOri As Integer, _
                                                                           ByVal inTipLin As Integer, ByVal vcCodEmp As String, _
                                                                           ByVal inCodPlan As Integer, ByVal vcNumLin As String) As List(Of ENT_MOV_Dispositivo)
        Try
            Dim Dispositivo As New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstDispositivo As List(Of ENT_MOV_Dispositivo) = Dispositivo.ListarDisponible_x_TipLin_GrupoOrigen(vcNomDisp, maxFilas, inCodGrupOri, inTipLin, vcCodEmp, inCodPlan, vcNumLin)
            Dispositivo.Dispose()

            Return lstDispositivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPeriodoCampana(ByVal IdCampana As String) As String
        Try
            Dim Campana As BL_MOV_CAM_Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCampana As New MOV_CAM_Campana
            oCampana = Campana.MostrarCampanaMantenimiento(Convert.ToInt32(IdCampana))
            Campana.Dispose()
            Return oCampana.RangoFechaCampana.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerGrupoOrigenPorEmpleado(ByVal pCodEmpl As String, ByVal pCodGrupOri As String) As ENT_GEN_GrupoOrigen
        Try
            Dim oGrupoOrigen As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As ENT_GEN_GrupoOrigen = oGrupoOrigen.ObtenerGrupoOrigenPorEmpleado(pCodEmpl, pCodGrupOri)

            oGrupoOrigen.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCantidadRestante(ByVal pvcCodCta As String, ByVal pvcCodTipSer As String, ByVal pvcCodSer As String, ByVal vcNumLin As String, ByVal inCodSubCue As Integer) As ENT_GEN_Servicio
        Dim Servicio As BL_GEN_Servicio = Nothing
        Try
            Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As ENT_GEN_Servicio = Servicio.ObtenerCantidadRestante(pvcCodCta, pvcCodTipSer, pvcCodSer, vcNumLin, inCodSubCue)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Servicio) Then Servicio.Dispose()
        End Try
    End Function

    '<WebMethod()>
    'Public Shared Function ObtenerEmpleadoXDispositivo(ByVal pCodEmpl As String, ByVal pCodGrupOri As String, ByVal pCodIMEI As String) As ENT_GEN_EmpleadoG
    '    Try
    '        Dim oEmpleado As BL_GEN_EmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Dim _return As ENT_GEN_EmpleadoG = oEmpleado.ObtenerEmpleadoXDispositivo(pCodEmpl, pCodGrupOri, pCodIMEI)
    '
    '        oEmpleado.Dispose()
    '        Return _return
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ObtenerServiciosAdicionales_Filtros(ByVal strNumLin As String, ByVal strCodOpe As String, ByVal strGrupOri As String, ByVal inPagTam As String, ByVal inPagAct As String) As Object
        Dim oLinea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim ds As DataSet = oLinea.ListarServicios(strNumLin, strCodOpe, Convert.ToInt32(strGrupOri))
            oLinea.Dispose()
            Dim dtServiciosAdicionalesGrilla As DataTable = ds.Tables(0)
            Return JQGrid.DatosJSON(dtServiciosAdicionalesGrilla, Integer.Parse(inPagTam), Integer.Parse(inPagAct))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try
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

    Private Sub ConfigurarAcciones(ByVal oUsuario As ENT_SEG_Usuario, ByVal inCod As Integer, ByVal oEntidad As ENT_ENT_Entidad, ByVal inTip As Integer, ByVal vcTab As String)
        ''Modificado por Mauricio benavides 11/07/2013
        Select Case inTip
            Case 1
                Dim ProductoSeguridad As BL_PRO_Producto = New BL_PRO_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oProductoSeguridad As New ENT_PRO_Producto
                oProductoSeguridad = ProductoSeguridad.Mostrar(inCod)
                ProductoSeguridad.Dispose()
                UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oProductoSeguridad.Perfiles)
            Case 2
                Dim ModuloSeguridad As BL_PRO_Modulo = New BL_PRO_Modulo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oModuloSeguridad As New ENT_PRO_Modulo
                oModuloSeguridad = ModuloSeguridad.Mostrar(inCod)
                ModuloSeguridad.Dispose()
                UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oModuloSeguridad.Perfiles)
            Case 3
                Dim OpcionSeguridad As BL_PRO_Opcion = New BL_PRO_Opcion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oOpcionSeguridad As New ENT_PRO_Opcion
                oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod)
                OpcionSeguridad.Dispose()
                UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles)
            Case 4
                Dim ItemSeguridad As BL_PRO_Item = New BL_PRO_Item(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oItemSeguridad As New ENT_PRO_Item
                oItemSeguridad = ItemSeguridad.Mostrar(oUsuario, inCod)
                ItemSeguridad.Dispose()
                UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oItemSeguridad.Perfiles)
        End Select

        If vcTab.ToString() = "M_EMPL" Then
            hdfAddEmpl.Value = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar And oEntidad.btNue
        ElseIf vcTab.ToString() = "MOV_DISPOSITIVO" Then
            hdfAddDispositivo.Value = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar And oEntidad.btNue
        End If
    End Sub

End Class
