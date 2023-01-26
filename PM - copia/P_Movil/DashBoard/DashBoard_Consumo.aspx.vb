Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb

Public Class DashBoard_Consumo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oldCI As System.Globalization.CultureInfo = System.Threading.Thread.CurrentThread.CurrentCulture

        If Convert.ToBoolean(Session("IngresoInvalido")) = True Then
            hdfLicencia.Value = "4GVBGsuwXJDBuD3LFODkzQA="
        End If

        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            Dim Cola As BL_MOV_IMP_Cola = Nothing
            Dim Solicitud As BL_MOV_Solicitud = Nothing
            Dim Criterio As BL_MOV_IMP_Criterio = Nothing
            Dim dashboard As BL_DashBoard = Nothing
            'Dim blCultura As BL_GEN_Cultura = Nothing
            Dim blTipoServicio As BL_GEN_TipoServicio = Nothing
            Try
                If Not IsPostBack Then
                    Cola = New BL_MOV_IMP_Cola(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Solicitud = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Criterio = New BL_MOV_IMP_Criterio(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim oCola As ENT_MOV_IMP_Cola = Cola.MostrarInformacion()
                    Dim vcCodEmpl = oUsuario.Empleado.P_vcCod
                    Dim oCriterio As ENT_MOV_IMP_Criterio = Criterio.MostrarInformacion(CType(Session("Usuario"), ENT_SEG_Usuario).P_inCod)

                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfCodUsuario.Value = oUsuario.vcUsu
                    hdfCodOrganizacion.Value = oUsuario.F_vcCodInt
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"
                    hdfCodSucursal.Value = oUsuario.F_vcCodSuc

                    'If Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                    If oUsuario.F_vcCodInt.Trim <> "" Then
                        hdfAdmin.Value = "1"
                    Else
                        hdfAdmin.Value = "0"
                    End If
                    'Tipos de Solicitud por Grupo
                    Dim vcGruTipSol As String = TipoSolicitud.ObtenerTiposPorUsuario()
                    ttgInfoConsumo.Mensaje = "El cálculo de Consumo Total, no incluye los costos por consumos Roaming."


                    Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
                    Dim oNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()
                    Nivel.Dispose()


                    'Código que controla los acceso del usuario por Organizacion...
                    Dim vcCodInt As String = oUsuario.F_vcCodInt
                    If vcCodInt.Length > 3 Then oNivel.Remove(oNivel.Item(0))
                    Dim inNivel As Integer = vcCodInt.Length / 3
                    Dim oUltimoNivel As New ENT_GEN_Nivel
                    For x As Byte = 2 To inNivel
                        If x = inNivel Then oUltimoNivel = oNivel.Item(0)
                        oNivel.Remove(oNivel.Item(0))
                    Next
                    If oNivel.Count = 0 Then oNivel.Add(oUltimoNivel)

                    ddlNivel.DataTextField = "vcNomNiv"
                    ddlNivel.DataValueField = "P_inCodNiv"
                    ddlNivel.DataSource = oNivel
                    ddlNivel.DataBind()

                    ddlNivelNavegacion.DataTextField = "vcNomNiv"
                    ddlNivelNavegacion.DataValueField = "P_inCodNiv"
                    ddlNivelNavegacion.DataSource = oNivel
                    ddlNivelNavegacion.DataBind()

                    ddlNivelMensajes.DataTextField = "vcNomNiv"
                    ddlNivelMensajes.DataValueField = "P_inCodNiv"
                    ddlNivelMensajes.DataSource = oNivel
                    ddlNivelMensajes.DataBind()

                    ddlNivelTotal.DataTextField = "vcNomNiv"
                    ddlNivelTotal.DataValueField = "P_inCodNiv"
                    ddlNivelTotal.DataSource = oNivel
                    ddlNivelTotal.DataBind()

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar("-1", "<Todos>"), "vcNomOpe", "P_inCodOpe")
                    Operador.Dispose()

                    If Len(oUsuario.F_vcCodInt) = 3 Or oUsuario.F_vcCodInt = "" Then
                        If ddlNivel.Items.Count > 1 Then
                            ddlNivel.SelectedIndex = 1
                            ddlNivelNavegacion.SelectedIndex = 1
                            ddlNivelMensajes.SelectedIndex = 1
                            ddlNivelTotal.SelectedIndex = 1
                        Else
                            ddlNivel.SelectedIndex = 0
                            ddlNivelNavegacion.SelectedIndex = 0
                            ddlNivelMensajes.SelectedIndex = 0
                            ddlNivelTotal.SelectedIndex = 0
                        End If
                    End If

                    For index = 0 To 11
                        Dim mes As Date = Date.Now.AddMonths(-index)
                        Select Case mes.Month
                            Case 1
                                ddlPeriodo.Items.Add(New ListItem("Ene " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 2
                                ddlPeriodo.Items.Add(New ListItem("Feb " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 3
                                ddlPeriodo.Items.Add(New ListItem("Mar " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 4
                                ddlPeriodo.Items.Add(New ListItem("Abr " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 5
                                ddlPeriodo.Items.Add(New ListItem("May " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 6
                                ddlPeriodo.Items.Add(New ListItem("Jun " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 7
                                ddlPeriodo.Items.Add(New ListItem("Jul " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 8
                                ddlPeriodo.Items.Add(New ListItem("Ago " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 9
                                ddlPeriodo.Items.Add(New ListItem("Sep " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 10
                                ddlPeriodo.Items.Add(New ListItem("Oct " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 11
                                ddlPeriodo.Items.Add(New ListItem("Nov " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case Else
                                ddlPeriodo.Items.Add(New ListItem("Dic " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                        End Select
                    Next

                    'OBTENEMOS EL TIPO DE LINEA QUE EL USUARIO TIENE ACCESO---------------------------------------------------------------------------------------------------------------------------------
                    Dim vcPerfiles As String = String.Empty
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
                        'ddlTipoLinea.SelectedValue = 0
                        hdfOpcionPrincipal.Value = 0
                    ElseIf vcPerfiles <> "" Then
                        'ddlTipoLinea.SelectedValue = vcPerfiles
                        hdfOpcionPrincipal.Value = vcPerfiles
                    End If

                    hdfOpcionPrincipal.Value = "1"
                    'CARGAMOS EL TIPO DE LINEA QUE EL USUARIO TIENE ACCESO----------------------------------------------------------------------------------------------------------------------------------
                    Dim LineaTipo As New BL_MOV_LineaTipo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlTipoLinea, LineaTipo.Listar(Convert.ToInt32(hdfOpcionPrincipal.Value), 0, "-- Ambos --"), "vcDescripcion", "P_inCod")
                    LineaTipo.Dispose()
                    ddlTipoLinea.SelectedValue = hdfOpcionPrincipal.Value

                    lblTipoLinea.Style.Add("display", "none")
                    ddlTipoLinea.Style.Add("display", "none")

                    '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    If Request.QueryString("pe") IsNot Nothing Then
                        hdfTipoOpcion.Value = "0"
                        ddlPeriodo.SelectedValue = Request.QueryString("pe")
                    Else
                        ddlPeriodo.SelectedValue = DateTime.Now.AddMonths(-1).ToString("MMyy")
                        hdfTipoOpcion.Value = "1"
                    End If

                    If Request.QueryString("Ope") IsNot Nothing Then
                        hdfCodOperador.Value = Request.QueryString("Ope").ToString
                        hdfCodOperador.Value = ("" & hdfCodOperador.Value).Trim()
                        ddlOperador.SelectedValue = ("" & hdfCodOperador.Value).Trim()
                    Else
                        hdfCodOperador.Value = "-1"
                    End If

                    If Request.QueryString("TipLin") IsNot Nothing Then
                        hdfTipLin.Value = Request.QueryString("TipLin").ToString
                    End If

                    If hdfTipLin.Value <> "" Then
                        ddlTipoLinea.SelectedValue = hdfTipLin.Value
                    End If

                    dashboard = New BL_DashBoard(oUsuario.IdCliente)
                    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

                    Dim redimiento As List(Of String) = dashboard.obtenerRendimiento_MultiPais(IIf(hdfCodOrganizacion.Value <> "", oUsuario.F_vcCodInt, oUsuario.Empleado.P_vcCod), "V_SUM_SC_" + ddlPeriodo.SelectedItem.Value, IIf(hdfCodOrganizacion.Value <> "", True, False), hdfCodOperador.Value, hdfCodSucursal.Value, "", ddlTipoLinea.SelectedValue)
                    Dim dvVariacion As Decimal
                    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)
                    hdfTipoMoneda.Value = oCultura.Moneda.vcSimMon

                    lblObjetivo.Text = hdfTipoMoneda.Value.ToString + " " + redimiento(0)
                    lblConsumo.Text = hdfTipoMoneda.Value.ToString + " " + redimiento(1)
                    hdfSepDecimal.Value = oCultura.vcSimDec
                    hdfSepMiles.Value = oCultura.vcSimSepMil
                    hdfNumDecimales.Value = oCultura.dcNumDec

                    ' USAR: dvVariacion

                    ''cGauge1.Scales.Item(0).MajorTickCount = 9
                    ''cGauge1.Scales.Item(0).MaxValue = 200
                    Dim PorcentajeEntero As Integer
                    PorcentajeEntero = CType(Val(dvVariacion), Integer)
                    ''cGauge1.Scales.Item(0).Value = dvVariacion 'redimiento(1)

                    pieDiv_Consumo.Attributes.Add("data-percent", PorcentajeEntero.ToString())
                    pieSpan_Consumo.InnerHtml = PorcentajeEntero.ToString()

                    'Inyectar datos iniciales de historico...                    
                    Dim strAnd As String = ""
                    If hdfAdmin.Value <> "1" Then
                        strAnd = "and codempleado = |" & hdfEmpleado.Value & "|"
                        ddlTipoLinea.Enabled = False
                    Else
                        ddlTipoLinea.Enabled = True
                    End If


                    Dim nomTabla As String = "V_SUM_SC_"
                    'Dim nomTabla As String = "V_ACUM_DET_SC_"
                    'If hdfAdmin.Value <> "1" Then nomTabla = "V_ACUM_DET_SC_"

                    Dim oJavaScriptSerializer As New JavaScriptSerializer
                    'Dim jsonDatosHistorico As List(Of String) = obtenerHistoricoDash(selectServicio.Value, strAnd, lblObjetivo.Text, selectTipo.Value)

                    Dim miPeriodo As String = ddlPeriodo.SelectedItem.Text.Split(" ")(1).ToString() + ddlPeriodo.SelectedValue.Substring(0, 2).ToString()

                    Dim jsonDatosHistorico As List(Of String) = obtenerHistoricoDash_Movil(miPeriodo, 6, selectServicio.Value, strAnd, lblObjetivo.Text, selectTipo.Value, IIf(hdfCodOrganizacion.Value.Trim() = "", 0, 1), _
                                                                                     IIf(hdfCodOrganizacion.Value.Trim() = "", hdfEmpleado.Value.Trim(), hdfCodOrganizacion.Value.Trim()), _
                                                                                     hdfCodUsuario.Value, hdfAdmin.Value, 0, hdfCodOperador.Value, hdfTipoMoneda.Value, hdfSepDecimal.Value, _
                                                                                     hdfSepMiles.Value, hdfNumDecimales.Value, hdfCodSucursal.Value, ddlTipoLinea.SelectedValue)
                    Dim jsonDatosPie As List(Of String) = obtenerPieDash(nomTabla & ddlPeriodo.SelectedValue, IIf(hdfCodOrganizacion.Value <> "", True, False), hdfCodOperador.Value, hdfTipoMoneda.Value, hdfCodSucursal.Value, ddlTipoLinea.SelectedValue)


                    Dim prConsultaArea, prConsultaEmpl As String
                    hdfTipoTopArea.Value = IIf(hdfTipoTopArea.Value = "", "Costo", hdfTipoTopArea.Value)
                    hdfTipoTopEmpleado.Value = IIf(hdfTipoTopEmpleado.Value = "", "Costo", hdfTipoTopEmpleado.Value)

                    If hdfTipoTopArea.Value = "Costo" Then
                        prConsultaArea = "IsNull(Sum(X.COSTOS),0) TOTAL, " 'Sum(IsNull(COSTO, 0)) COSTO"
                    ElseIf hdfTipoTopArea.Value = "Llamadas" Then
                        prConsultaArea = "IsNull(Sum(X.LLAMADAS),0) TOTAL, " 'Sum(IsNull(COSTO, 0)) COSTO"
                    Else
                        prConsultaArea = "IsNull(Sum(X.DURACION),0) TOTAL,  " 'Sum(IsNull(COSTO, 0)) COSTO"
                    End If

                    If hdfTipoTopEmpleado.Value = "Costo" Then
                        prConsultaEmpl = "IsNull(Sum(X.COSTO),0) TOTAL, " 'Sum(IsNull(COSTO, 0)) COSTO"
                    ElseIf hdfTipoTopEmpleado.Value = "Llamadas" Then
                        prConsultaEmpl = "IsNull(Sum(X.LLAMADAS),0) TOTAL, " 'Sum(IsNull(COSTO, 0)) COSTO"
                    Else
                        prConsultaEmpl = "IsNull(Sum(X.DURACION),0) TOTAL,  " 'Sum(IsNull(COSTO, 0)) COSTO"
                    End If

                    'Dim jsonTopTenArea As List(Of String) = obtenerSumarioDashObjetivo("V_ACUM_SC_" & ddlPeriodo.SelectedValue, "M_ORGA", _
                    '                                                           prConsultaArea, "10", ddlNivel.SelectedValue, ddlPeriodo.Text, "Total", "Costo (S/.)", _
                    '                                                           "M_ORGA", "", hdfTipoTopArea.Value)
                    'Dim jsonTopTenEmpleado As List(Of String) = obtenerSumarioDashObjetivo("V_ACUM_SC_" & ddlPeriodo.SelectedValue, "M_EMPL", _
                    '                                                           prConsultaEmpl, "10", "1", ddlPeriodo.Text, "Total", "Costo (S/.)", "M_EMPL", _
                    '                                                            "", hdfTipoTopEmpleado.Value)

                    Dim jsonTopTenArea As List(Of String) = obtenerSumarioDashboardTopTen("V_SUM_SC_" & ddlPeriodo.SelectedValue, "M_ORGA", prConsultaArea, "10", ddlNivel.SelectedValue, ddlPeriodo.Text, "Total", _
                                                                                  "Monto (" & hdfTipoMoneda.Value & ")", "M_ORGA", "", hdfTipoTopArea.Value, 16, hdfCodOperador.Value, selectServicio.Value, hdfTipoMoneda.Value, hdfSepDecimal.Value,
                                                                                  hdfSepMiles.Value, hdfNumDecimales.Value, hdfCodSucursal.Value, ddlTipoLinea.SelectedValue)

                    Dim jsonTopTenEmpleado As List(Of String) = obtenerSumarioDashboardTopTen("V_SUM_SC_" & ddlPeriodo.SelectedValue, "M_EMPL", prConsultaEmpl, "10", ddlNivel.SelectedValue, ddlPeriodo.Text, "Total", _
                                                                                    "Monto (" & hdfTipoMoneda.Value & ")", "M_EMPL", "", hdfTipoTopEmpleado.Value, 16, hdfCodOperador.Value, selectServicio.Value, hdfTipoMoneda.Value, hdfSepDecimal.Value,
                                                                                  hdfSepMiles.Value, hdfNumDecimales.Value, hdfCodSucursal.Value, ddlTipoLinea.SelectedValue)


                    blTipoServicio = New BL_GEN_TipoServicio(oUsuario.IdCliente)
                    Dim sbScript As New StringBuilder
                    sbScript.AppendLine("var jsonDatosHistorico = " & oJavaScriptSerializer.Serialize(jsonDatosHistorico) & ";")
                    sbScript.AppendLine("var jsonDatosPie = " & oJavaScriptSerializer.Serialize(jsonDatosPie) & ";")
                    sbScript.AppendLine("var jsonTopTenArea = " & oJavaScriptSerializer.Serialize(jsonTopTenArea) & ";")
                    sbScript.AppendLine("var jsonTopTenEmpleado = " & oJavaScriptSerializer.Serialize(jsonTopTenEmpleado) & ";")
                    sbScript.AppendLine("var misTiposServicios = " & oJavaScriptSerializer.Serialize(blTipoServicio.ListarParaDash()) & ";")

                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "key_jsonDatosHistorico", sbScript.ToString, True)

                End If

                If ddlOperador.Items.Count = 2 Then
                    ddlOperador.Enabled = False
                    ddlOperador.SelectedIndex = 1
                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            Finally
                If Cola IsNot Nothing Then Cola.Dispose()
                If Solicitud IsNot Nothing Then Solicitud.Dispose()
                If Criterio IsNot Nothing Then Criterio.Dispose()
                If dashboard IsNot Nothing Then dashboard.Dispose()
                'If blCultura IsNot Nothing Then blCultura.Dispose()
                If blTipoServicio IsNot Nothing Then blTipoServicio.Dispose()
            End Try

        End If

    End Sub

    Private Function obtenerSumarioDash(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String _
                                  , ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String, _
                                  ByVal prNombreSumario As String, ByVal prAnd As String) As List(Of String)

        Dim sumario As BL_Sumario = Nothing

        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return sumario.obtenerSumarioDash(prNomtabla, prTipo, prTipoConsulta.Replace("|", "'"), prTop, prNivel, prPeriodo, prServicio, prDescTipo, prNombreSumario, prAnd.Replace("|", "'"), vcCodInt)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
    End Function

    Private Function obtenerSumarioDashObjetivo(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String _
                             , ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String, _
                             ByVal prNombreSumario As String, ByVal prAnd As String, ByVal prTipoObj As String) As List(Of String)
        Dim sumario As BL_Sumario = Nothing

        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return sumario.obtenerSumarioDashObjetivo(prNomtabla, prTipo, prTipoConsulta.Replace("|", "'"), prTop, prNivel, prPeriodo, prServicio, prDescTipo, prNombreSumario, prAnd.Replace("|", "'"), vcCodInt, prTipoObj)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerSumarioDashObjetivo2(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String _
                          , ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String, _
                          ByVal prNombreSumario As String, ByVal prAnd As String, ByVal prTipoObj As String) As List(Of String)
        Dim sumario As BL_Sumario = Nothing

        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return sumario.obtenerSumarioDashObjetivo(prNomtabla, prTipo, prTipoConsulta.Replace("|", "'"), prTop, prNivel, prPeriodo, prServicio, prDescTipo, prNombreSumario, prAnd.Replace("|", "'"), vcCodInt, prTipoObj)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            ' Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
        Return New List(Of String)
    End Function

    <WebMethod()>
    Public Shared Function obtenerHistoricoDash(ByVal prGlobal As String, ByVal prAnd As String, ByVal prObjetivo As String, ByVal Tipo As String, _
                                                ByVal inNivel As Integer, ByVal prValor As String, ByVal prusuario As String, ByVal inAdmin As Integer, _
                                                ByVal inCodTipServ As Integer, ByVal prCodOperador As String, ByVal prAbrevMoneda As String, ByVal prSepDec As String, _
                                                ByVal prSepMil As String, ByVal inNumDec As Integer, ByVal prCodSuc As String) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            prCodOperador = ("" & prCodOperador).Trim()
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim objetivo As String = prObjetivo.Replace("S/.", "").Replace(oCultura.Moneda.vcSimMon, "")
            Dim dtObjetivo As New DataTable
            objetivo = objetivo.Replace(",", "").Trim
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'dtObjetivo = dash.obtenerHistoricoObjetivos(Tipo, inNivel, prValor, IIf(inAdmin = 1, "", prusuario), prCodSuc, inCodTipServ, prCodOperador)
            dtObjetivo = dash.obtenerHistoricoObjetivos(Tipo, inNivel, prValor, prCodSuc, inCodTipServ, prCodOperador)
            Return dash.obtenerHistoricoDash(vcCodInt, prGlobal, prAnd.Replace("|", "'"), dtObjetivo, Tipo, inCodTipServ, prCodOperador, inNivel, prCodSuc, prAbrevMoneda, prSepDec, prSepMil, inNumDec)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerHistoricoDash_Movil(ByVal prPeriodo As String, ByVal prMesesAtras As Integer, ByVal prGlobal As String, ByVal prAnd As String, ByVal prObjetivo As String, ByVal Tipo As String, _
                                                ByVal inNivel As Integer, ByVal prValor As String, ByVal prusuario As String, ByVal inAdmin As Integer, _
                                                ByVal inCodTipServ As Integer, ByVal prCodOperador As String, ByVal prAbrevMoneda As String, ByVal prSepDec As String, _
                                                ByVal prSepMil As String, ByVal inNumDec As Integer, ByVal prCodSuc As String, ByVal inCodTip As Integer) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            prCodOperador = ("" & prCodOperador).Trim()
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dtObjetivo As New DataTable


            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'dtObjetivo = dash.obtenerHistoricoObjetivos(Tipo, inNivel, prValor, IIf(inAdmin = 1, "", prusuario), prCodSuc, inCodTipServ, prCodOperador)
            dtObjetivo = dash.obtenerHistoricoObjetivos_Movil(prPeriodo, prMesesAtras, Tipo, inNivel, prValor, prCodSuc, inCodTipServ, prCodOperador, inCodTip)
            Return dash.obtenerHistoricoDash_Movil(prPeriodo, prMesesAtras, vcCodInt, prGlobal, prAnd.Replace("|", "'"), dtObjetivo, Tipo, inCodTipServ, prCodOperador, inNivel, prCodSuc, prAbrevMoneda, prSepDec, prSepMil, inNumDec, inCodTip)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerPieDash(ByVal prNomTabla As String, ByVal prEsAdmin As String, ByVal prCodOperador As String, ByVal prAbrevMoneda As String, ByVal prCodsuc As String, ByVal inCodTip As Integer) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If Not prEsAdmin = "True" Then
                vcCodInt = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod
            End If

            Return dash.obtenerPieDash(prNomTabla, vcCodInt, prEsAdmin, prCodOperador, prCodsuc, prAbrevMoneda, oCultura, inCodTip)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()

        End Try
    End Function

    Private Function obtenerSumarioDashboardTopTen(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String, _
                                                  ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String, _
                                                  ByVal prNombreSumario As String, ByVal prAnd As String, ByVal prTipoObj As String, ByVal prTipoServ As Integer, _
                                                  ByVal prCodOperador As String, ByVal prcodGlobal As String, ByVal prAbrevMoneda As String, ByVal prSepDec As String, _
                                                  ByVal prSepMil As String, ByVal inNumDec As Integer, ByVal prCodSuc As String, ByVal inCodTipLin As Integer) As List(Of String)
        Dim sumario As BL_Sumario = Nothing

        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return sumario.obtenerSumarioDashboardTopTen(prNomtabla, prTipo, prTipoConsulta.Replace("|", "'"), prTop, prNivel, prPeriodo, prServicio, prDescTipo, prNombreSumario,
                                                         prAnd.Replace("|", "'"), vcCodInt, prTipoObj, prTipoServ, prCodOperador, prcodGlobal, prAbrevMoneda, prCodSuc, prSepDec, prSepMil, inNumDec, inCodTipLin)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerSumarioDashboardTopTenJS(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String, _
                                                           ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String, _
                                                           ByVal prNombreSumario As String, ByVal prAnd As String, ByVal prTipoObj As String, ByVal prTipoServ As Integer, _
                                                           ByVal prCodOperador As String, ByVal prcodGlobal As String, ByVal prAbrevMoneda As String, ByVal prSepDec As String, _
                                                           ByVal prSepMil As String, ByVal inNumDec As Integer, ByVal prCodSuc As String, ByVal TipoLinea As String) As List(Of String)
        Dim sumario As BL_Sumario = Nothing
        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return sumario.obtenerSumarioDashboardTopTen(prNomtabla, prTipo, prTipoConsulta.Replace("|", "'"), prTop, prNivel, prPeriodo, prServicio, prDescTipo, prNombreSumario,
                                                         prAnd.Replace("|", "'"), vcCodInt, prTipoObj, prTipoServ, prCodOperador, prcodGlobal,
                                                         prAbrevMoneda, prCodSuc, prSepDec, prSepMil, inNumDec, TipoLinea)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            ' Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
        Return New List(Of String)
    End Function

End Class