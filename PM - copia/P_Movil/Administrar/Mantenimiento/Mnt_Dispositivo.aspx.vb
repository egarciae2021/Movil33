Imports VisualSoft.Suite80.BL
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Dispositivo
   Inherits System.Web.UI.Page


   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TipoAdquisicion As BL_MOV_TipoAdquisicion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            ttgInfoModeloRed.Mensaje = "El tipo de servicio asociado a la cuenta de la línea no es compatible con el tipo de servicio asociado al modelo"
            ttgInfoLineaRed.Mensaje = "El tipo de servicio asociado al modelo no es compatible con el tipo de servicio asociado a la cuenta de la línea"
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim vcCod As String = Request.QueryString("Cod")
            hdfDispositivo.Value = vcCod
            TipoAdquisicion = New BL_MOV_TipoAdquisicion(oUsuario.IdCliente)
            Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            UtilitarioWeb.Dataddl(ddlTipoAdquisicion, TipoAdquisicion.Listar(-1, "<Seleccionar>"), "vcNom", "P_inCodTipAdq")
            hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
            UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
            LineaTipo.Dispose()

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim Campana As BL_MOV_CAM_Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
            UtilitarioWeb.Dataddl(ddlCampana, Campana.Listar(-1, "<Seleccione>"), "Descripcion", "IdCampana")
            Campana.Dispose()

            If Not IsPostBack Then
                lblMensaje.Text = ""
                Dim MOV_ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
                Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                UtilitarioWeb.Dataddl(ddlModelo, MOV_ModeloDispositivo.Listar(), "vcNom", "P_inCod")
                MOV_ModeloDispositivo.Dispose()
                If Not IsNothing(vcCod) Then

                    GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Dispositivo", tbCamposDinamicos, "", "../../../", "P_vcCodIMEI", vcCod)

                    Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    'Dim oDispositivo As DataTable = Dispositivo.Mostrar(vcCod)
                    Dim oDispositivo As DataSet = Dispositivo.MostrarDispositivo(vcCod)
                    Dispositivo.Dispose()
                    Dim oSerializer As New JavaScriptSerializer

                    hdfIMEI.Value = vcCod
                    txtCodigo.Enabled = False
                    txtCodigo.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("P_vcCodIMEI"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                    hdfCodDispositivos.Value = UtilitarioWeb.ComprobarIntNULL(oDispositivo.Tables(0).Rows(0)("F_inCodModDis"), 0)
                    If IsNumeric(txtCodigo.Text) Then
                        txtCodigo.Style("text-align") = "center"
                    End If
                    txt_Dispositivos.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("vcNom"), "").Trim().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                    ddlTipoAdquisicion.SelectedValue = UtilitarioWeb.ComprobarIntNULL("0" + oDispositivo.Tables(0).Rows(0)("F_inCodTipAdq"), -1).ToString() 'oLinea.dcPerFacIni.ToString()
                    chkEstado.Checked = UtilitarioWeb.ComprobarBoolNULL(oDispositivo.Tables(0).Rows(0)("btVig"), False)
                    hdfEstadoDispositivo.Value = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("btVig"), "")
                    hdfEstadoEmpleado.Value = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("vcEstadoEmp"), "")
                    ddlLineaTipo.SelectedValue = UtilitarioWeb.ComprobarIntNULL(oDispositivo.Tables(0).Rows(0)("F_inCodTip"), 1).ToString()
                    hdfLineaTipoTemp.Value = UtilitarioWeb.ComprobarIntNULL(oDispositivo.Tables(0).Rows(0)("F_inCodTip"), 1).ToString()
                    TxtSerie.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("Serie"), "")
                    TxtMontoDispositivo.Text = UtilitarioWeb.ComprobarDecimalNULL(oDispositivo.Tables(0).Rows(0)("dcMonto"), 0)
                    Dim vLinea As String = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("Linea"), "")
                    hdfLineaActual.Value = vLinea
                    hdfIdTipoLineaActual.Value = UtilitarioWeb.ComprobarIntNULL(oDispositivo.Tables(0).Rows(0)("F_inCodTip"), 1).ToString()
                    If vLinea <> "" Then
                        txtLinea.Text = vLinea.Trim.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfNumLinea.Value = vLinea.Trim
                    Else
                        txtLinea.Text = ""
                        hdfNumLinea.Value = ""
                    End If

                    If (oDispositivo.Tables(0).Rows(0)("FechaAsigDispositivo").ToString() <> "") Then
                        Dim dtFechaEmpleado As Date = oDispositivo.Tables(0).Rows(0)("FechaAsigDispositivo")
                        If oDispositivo.Tables(0).Rows(0)("ObsAsigLinea").ToString().Contains("Desvinculación") Then
                            LblAsignacionDispositivo.Text = "Fecha desvinculación"
                        Else
                            LblAsignacionDispositivo.Text = "Asignación Empleado"
                        End If
                        Dim vcFechaEmpleadoANSI As String = dtFechaEmpleado.Year.ToString() + New String("0", 2 - dtFechaEmpleado.Month.ToString().Length) + dtFechaEmpleado.Month.ToString() + _
                                                    New String("0", 2 - dtFechaEmpleado.Day.ToString().Length) + dtFechaEmpleado.Day.ToString()
                        txtFechaAsignacionLinea.Text = UtilitarioWeb.DevuelveFechaFormateada(vcFechaEmpleadoANSI, oCultura.vcFecCor).ToString()
                        hdfFechaAsignacionLinea.Value = txtFechaAsignacionLinea.Text
                        trFechaAsignacionLinea.Style("display") = ""
                    Else
                        trFechaAsignacionLinea.Style("display") = "none"
                        txtFechaAsignacionLinea.Text = ""
                        hdfFechaAsignacionLinea.Value = ""
                    End If

                    If hdfIdTipoLineaActual.Value = 2 Then
                        trCampana.Style("display") = ""
                    End If
                    ddlCampana.SelectedValue = UtilitarioWeb.ComprobarIntNULL(oDispositivo.Tables(0).Rows(0)("IdCampana"), -1)
                    'Dim lstLinea As List(Of ENT_MOV_Linea) = Linea.ListarDisponiblePorEmpleado(UtilitarioWeb.ComprobarStringNULL(oDispositivo.Rows(0)("F_vcCodEmp"), ""), Convert.ToInt32(UtilitarioWeb.ComprobarIntNULL(oDispositivo.Rows(0)("F_inCodTip"), 1)))
                    'lstLinea.Insert(0, New ENT_MOV_Linea() With {.P_vcNum = "<Sin Linea>"})
                    'Dim vLinea As String = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Rows(0)("Linea"), "")

                    'hdfLineaActual.Value = vLinea
                    'hdfIdTipoLineaActual.Value = UtilitarioWeb.ComprobarIntNULL(oDispositivo.Rows(0)("F_inCodTip"), 1).ToString()

                    'If vLinea <> "" Then
                    '    lstLinea.Insert(1, New ENT_MOV_Linea() With {.P_vcNum = vLinea})
                    'End If

                    'UtilitarioWeb.Dataddl(ddlLinea, lstLinea, "P_vcNum", "P_vcNum")

                    'If vLinea <> "" Then
                    '    ddlLinea.SelectedValue = vLinea
                    'Else
                    '    ddlLinea.SelectedValue = "<Sin Linea>"
                    'End If
                    If UtilitarioWeb.ComprobarBoolNULL(oDispositivo.Tables(0).Rows(0)("btSopLin1"), False) = False Then
                        ddlSopLin.SelectedValue = 0
                        ddlSopLin.Enabled = False
                    Else
                        If UtilitarioWeb.ComprobarBoolNULL(oDispositivo.Tables(0).Rows(0)("btSopLin"), False) = False Then
                            ddlSopLin.SelectedValue = 0
                            trLinea.Style("display") = "none"
                        Else
                            ddlSopLin.SelectedValue = 1
                            'trEmpleado.Style("display") = "none"
                            trLinea.Style("display") = ""
                        End If
                    End If

                    If (oDispositivo.Tables(0).Rows(0)("F_inCodModDis").ToString() <> "" Or oDispositivo.Tables(0).Rows(0)("F_inCodModDis").ToString() <> "-1") And (hdfLineaActual.Value <> "") Then
                        If oDispositivo.Tables(0).Rows(0)("IdTipSerModelo").ToString() <> oDispositivo.Tables(0).Rows(0)("IdTipSerCuenta").ToString() Then
                            dvToolTipRed_l.Style("display") = ""
                            dvToolTipRed_m.Style("display") = ""
                            hdfPermitirGuardarTipSer.Value = "0"
                        Else
                            dvToolTipRed_l.Style("display") = "none"
                            dvToolTipRed_m.Style("display") = "none"
                            hdfPermitirGuardarTipSer.Value = "1"
                        End If
                    End If

                    hdfTipoServicioCuenta.Value = oDispositivo.Tables(0).Rows(0)("IdTipSerCuenta").ToString()
                    hdfTipoServicioModelo.Value = oDispositivo.Tables(0).Rows(0)("IdTipSerModelo").ToString()

                    'txtCodigo.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Rows(0)("P_vcCodIMEI"), "")
                    'txtCodigo.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Rows(0)("P_vcCodIMEI"), "")
                    Dim oLinea As DataTable = Linea.MostrarPorCodIMEI(txtCodigo.Text)
                    If oLinea.Rows.Count <> 0 Then
                        If oLinea.Rows(0)("F_vcCodEmp").ToString.Trim() <> "" Then
                            txtEmpleado.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("vcNomEmp"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            hdfCodEmpleado.Value = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("F_vcCodEmp"), "")
                            lblEmpleado.Visible = True
                            txtEmpleado.Visible = True
                            txtEmpleado.Enabled = False
                            lblMensaje.Text = "" 'El dispositivo ya se encuentra asociado a una línea, para modificar al empleado asociado a este modifíquelo desde el mantenimiento de líneas."
                            ddlSopLin.Enabled = False '11-02-2014 wapumayta
                            trEmpleado.Style("display") = "" '11-02-2014 wapumayta
                        Else
                            lblEmpleado.Visible = True
                            txtEmpleado.Visible = True
                            txtEmpleado.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("vcNomEmp"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            hdfCodEmpleado.Value = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("F_vcCodEmp"), "")
                        End If
                    Else
                        lblEmpleado.Visible = True
                        txtEmpleado.Visible = True
                        txtEmpleado.Text = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("vcNomEmp"), "").Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCodEmpleado.Value = UtilitarioWeb.ComprobarStringNULL(oDispositivo.Tables(0).Rows(0)("F_vcCodEmp"), "")
                    End If
                    If chkEstado.Checked Then
                        trEstado.Style("display") = "none"
                    End If

                    hdfDispositivo.Value = vcCod

                    If chkEstado.Checked Then
                        trEstado.Style("display") = "none"
                    End If
                    txt_Dispositivos.Focus() 'comentado wapumayta 27-11-2013

                    If oDispositivo.Tables(1).Rows.Count > 0 Then
                        Dim lstEmpleadoResponsable As New List(Of ENT_PCS_EMP_OrgaJefatura)
                        For Each dr As DataRow In oDispositivo.Tables(1).Rows
                            Dim oEmpleadoResponsable As New ENT_PCS_EMP_OrgaJefatura()
                            oEmpleadoResponsable.vcCodOrga = UtilitarioWeb.ComprobarStringNULL(dr("vcCodOrg"), "")
                            oEmpleadoResponsable.vcCodInt = UtilitarioWeb.ComprobarStringNULL(dr("vcCodInt"), "")
                            oEmpleadoResponsable.vcArea = UtilitarioWeb.ComprobarStringNULL(dr("vcCodArea"), "")
                            oEmpleadoResponsable.vcCodEmpleado = UtilitarioWeb.ComprobarStringNULL(dr("vcCodEmpl"), "")
                            oEmpleadoResponsable.vcNomEmpleado = UtilitarioWeb.ComprobarStringNULL(dr("vcNomEmpl"), "")
                            oEmpleadoResponsable.vcCorreo = UtilitarioWeb.ComprobarStringNULL(dr("vcCorreo"), "")
                            lstEmpleadoResponsable.Add(oEmpleadoResponsable)
                        Next

                        Dim oSerial As New JavaScriptSerializer
                        LblResponsableTitulo.Text = ""
                        hdfEmplResponsable.Value = oSerial.Serialize(lstEmpleadoResponsable)
                    Else
                        LblResponsableTitulo.Text = "NO SE HA ASIGNADO UNA JEFATURA AL AREA ACTUAL."
                    End If

                    If hdfEstadoDispositivo.Value = "True" And hdfEstadoEmpleado.Value = "False" Then
                        txtEmpleado.Enabled = False
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
                    trSerie.Style("display") = ""
                    'TxtSerie.Enabled = False
                    'Obtiene Valores de Campos Dinamicos...
                    GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("MOV_Dispositivo", Me, oDispositivo.Tables(0))
                Else

                    'Obtiene controles dinámicos...
                    GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Dispositivo", tbCamposDinamicos, "", "../../../", "", "")

                    hdfDispositivo.Value = ""
                    trEstado.Style("display") = "none"
                    txtCodigo.Focus()
                    'lblEmpleado.Visible = True
                    'txtEmpleado.Visible = True
                    'txtEmpleado.Enabled = True
                    'txtEmpleado.Text = ""
                    'hdfCodEmpleado.Value = ""
                    'trSerie.Style("display") = "none"
                    'ddlLinea.Items.Add(New ListItem("<Seleccione un tipo de Linea>", ""))
                    txtLinea.Enabled = False

                    hdfLineaActual.Value = ""
                    hdfIdTipoLineaActual.Value = "-1"
                End If

                'Tipo de Linea - wapumayta - 02-11-2015
                Dim General = New General()
                Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                If hdfCodLinTip_X_User.Value <> 0 Then
                    ddlLineaTipo.Enabled = False
                    ddlLineaTipo.SelectedValue = hdfCodLinTip_X_User.Value
                    txtLinea.Enabled = True
                    InfoTipoLinea.Mensaje = "La Línea debe estar disponible, y el modelo del dispositivo seleccionado debe estar asociado a un plan y/o cuenta."
                    dvInfoTipoLinea.Style("display") = ""
                    If hdfCodLinTip_X_User.Value = 2 Then
                        trCampana.Style("display") = ""
                    End If
                End If

                If Not IsNothing(Request.QueryString("IsLigero")) AndAlso Request.QueryString("IsLigero") = "1" Then
                    hdfTipoLinea.Value = Request.QueryString("inTipoLinea")
                    hdfOcultarCamposLigero.Value = "1"
                    ddlTipoAdquisicion.SelectedIndex = 1
                    ddlSopLin.SelectedIndex = 0
                    ddlLineaTipo.SelectedIndex = hdfTipoLinea.Value

                    ddlTipoAdquisicion.Enabled = False
                    ddlSopLin.Enabled = False
                    ddlLineaTipo.Enabled = False
                End If

                Linea.Dispose()
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(TipoAdquisicion) Then TipoAdquisicion.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal vcCod As String, ByVal vcCamDim As String, ByVal vcNomModDis As String,
                                   ByVal Linea As String, ByVal vcAsignacionAnsiLinea As String,
                                   ByVal vcAsignacionLinea As String, ByVal dcMonto As String,
                                   ByVal vcAdj As String, ByVal vcSerie As String) As Integer

        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Dispositivo As New BL_MOV_Dispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oDispositivo As New ENT_MOV_Dispositivo
            Dim JSS As New JavaScriptSerializer()

            oDispositivo = JSS.Deserialize(Of ENT_MOV_Dispositivo)(vcNomModDis)

            If Linea = "<Sin Linea>" Then
                Linea = ""
            End If

            'Validar Licencia...
            If HttpContext.Current.Session("LicenciaWeb") IsNot Nothing Then
                Dim oLicenciaWeb As LicenciaWeb = CType(HttpContext.Current.Session("LicenciaWeb"), LicenciaWeb)
                Dim inCantidadDispositivosUsados As Integer = Dispositivo.ObtenerCantidadDispositivos()
                If vcCod = "" Then 'Es nuevo
                    inCantidadDispositivosUsados += 1
                End If
                If inCantidadDispositivosUsados > oLicenciaWeb.CantidadDispositivos Then
                    Return -999
                End If
            End If

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
            oAuditoria.Opcion = "Dispositivo"
            oAuditoria.Tabla = "MOV_Dispositivo" 'Constantes.TableNames.DispositivoMovil

            Dim strAntes As String = ""
            If vcCod = "" Then
                Dim IdDispositivo As Integer = Dispositivo.Insertar(oDispositivo, vcCamDim, Linea, vcAsignacionLinea, vcAsignacionAnsiLinea, vcSerie, Convert.ToDecimal(IIf(dcMonto = "", 0, dcMonto)))
                If IdDispositivo = "0" OrElse IdDispositivo = "1" Then

                    oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Dispositivo", "P_vcCodIMEI", oDispositivo.P_vcCodIMEI)

                    oAuditoria.Insertar(New String() {oDispositivo.P_vcCodIMEI})
                End If
                Dispositivo.Dispose()
                Return IdDispositivo
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {oDispositivo.P_vcCodIMEI})
                Dispositivo.Actualizar(oDispositivo, vcCamDim, Linea, vcAsignacionLinea, vcAsignacionAnsiLinea, vcSerie, Convert.ToDecimal(IIf(dcMonto = "", 0, dcMonto)))
                oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Dispositivo", "P_vcCodIMEI", oDispositivo.P_vcCodIMEI)
                oAuditoria.DespuesActualizar(New String() {oDispositivo.P_vcCodIMEI}, strAntes)
                Dispositivo.Dispose()
                Return 0
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarLineasDisponibleTipoLinea(ByVal inMaxFilas As Integer, ByVal vcNumLin As String, ByVal inTipLin As Integer, ByVal inCodEmp As String, _
                                                           ByVal idCliente As String, ByVal inCodMod As Integer, ByVal vcCodIMEI As String) As List(Of ENT_MOV_Linea)
        Dim Linea As BL_MOV_Linea = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(idCliente)
            Dim _return As List(Of ENT_MOV_Linea)
            If (inCodMod = -1) Then
                inCodMod = 0
            End If
            _return = Linea.ListarLineasDisponibleTipoLinea(inMaxFilas, vcNumLin, inCodEmp, inTipLin, inCodMod, vcCodIMEI, oUsuario.F_vcCodInt, oUsuario.P_inCod)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDisponiblePorEmpleado(ByVal IdEmpleado As String, ByVal IdTipoLinea As Integer, ByVal LineaActual As String, ByVal IdTipoLineaActual As Integer) As List(Of ENT_MOV_Linea)
        Try
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim lstLinea As List(Of ENT_MOV_Linea) = Linea.ListarDisponiblePorEmpleado(IdEmpleado, IdTipoLinea)
            Linea.Dispose()
            lstLinea.Insert(0, New ENT_MOV_Linea() With {.P_vcNum = "<Sin Linea>"})

            If LineaActual <> "" And IdTipoLinea = IdTipoLineaActual Then
                lstLinea.Insert(1, New ENT_MOV_Linea() With {.P_vcNum = LineaActual})
            End If

            Return lstLinea
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    'agregado 06/05/2014 wapumayta
    <WebMethod()>
    Public Shared Function ListarEmpleado(ByVal maxFilas As String, ByVal vcNomEmp As String, ByVal incodModDis As String, ByVal idCliente As String) As List(Of ENT_GEN_Empleado)
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(idCliente)
        vcNomEmp = vcNomEmp.Replace("&#39", "''")
        Dim _return As List(Of ENT_GEN_Empleado) = ModeloDispositivo.ListarEmpleadoPorGrupoDeModDis(vcNomEmp, maxFilas, incodModDis)
        ModeloDispositivo.Dispose()
        Return _return
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

End Class
