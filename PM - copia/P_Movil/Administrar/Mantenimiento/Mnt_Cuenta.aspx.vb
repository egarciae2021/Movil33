Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria
Imports System.IO

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Cuenta
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    cbeOrganizacion.UbicacionWindow = "window.top"
                    cbeOrganizacion.UrlPagina = "General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod="
                    cbeOrganizacion.AltoDialogo = 560
                    cbeOrganizacion.AnchoDialogo = 810
                    cbeOrganizacion.TituloDialog = "Organización"


                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                    Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim vcCodCue As String = Request.QueryString("Cod")
                    Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)

                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    hdfAreaFacturacion.Value = oUsuario.AreaFacturacion

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")
                    Operador.Dispose()

                    Dim lstTipoModeloDispositivo As List(Of ENT_MOV_TipoModeloDispositivo) = TipoModeloDispositivo.ListarModeloDispositivo()

                    UtilitarioWeb.Dataddl(ddlDiaInicial, UtilitarioWeb.ListarDias, "", "")
                    UtilitarioWeb.Dataddl(ddlPeriodoFacturacion, Cuenta.Listar_TipoPeriodoFacturacion(-1, "<Seleccionar>"), "vcNom", "P_inCod")
                    ddlPeriodoFacturacion.SelectedValue = "1" ' por defecto/ Por Cuenta
                    UtilitarioWeb.Dataddl(ddlAsignacionCredito, Cuenta.Listar_TipoAsignacionCredito(-1, "<Seleccionar>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlTipoServicio, lstTipoModeloDispositivo, "Descripcion", "IdTipoModeloDispositivo")
                    UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                    '------------------------------------------------------
                    LineaTipo.Dispose()
                    'Obtiene controles dinámicos...


                    'Tipo de Linea - wapumayta - 02-11-2015
                    Dim General = New General()
                    Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                    If hdfCodLinTip_X_User.Value <> 0 Then
                        ddlLineaTipo.Enabled = False
                        ddlLineaTipo.SelectedValue = hdfCodLinTip_X_User.Value
                    End If

                    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                    hdfSepMiles.Value = oCultura.vcSimSepMil
                    'oCultura.vcSimDec
                    hdfFormatoFechaCorta.Value = oCultura.vcFecCor

                    If vcCodCue <> "" Then
                        GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Cuenta", tbCamposDinamicos, "", "../../../", "P_vcCod", vcCodCue)
                        Dim oSerializer As New JavaScriptSerializer
                        Dim Script As String

                        Dim oCuenta As ENT_MOV_Cuenta = Cuenta.Mostrar(vcCodCue, oCultura)

                        If oCuenta.P_vcCod = vcCodCue Then
                            txtCodigo.Text = oCuenta.P_vcCod.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            txtCodigo.Enabled = False
                            txtNombre.Text = oCuenta.vcNom.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            ddlOperador.SelectedValue = oCuenta.Operador.P_inCodOpe.ToString()
                            ddlAsignacionCredito.SelectedValue = oCuenta.TipoAsignacionCredito.P_inCod.ToString()
                            hdfAsignacionCredito.Value = oCuenta.TipoAsignacionCredito.P_inCod.ToString()
                            ddlPeriodoFacturacion.SelectedValue = oCuenta.TipoPeriodoFacturacion.P_inCod.ToString()
                            ddlTipoServicio.SelectedValue = oCuenta.TipoServicio.ToString()
                            'lblMonto.Text = oCuenta.dcMon.ToString()
                            If oCultura.vcCodCul.ToString() = "es-PE" Then
                                lblMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado(oCuenta.dcMon, oCultura)
                            Else
                                lblMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(oCuenta.dcMon, oCultura).ToString()
                            End If
                            ddlLineaTipo.SelectedValue = oCuenta.F_inCodTip.ToString()
                            chkEstado.Checked = oCuenta.btVig
                            If chkEstado.Checked Then
                                trEstado.Style("display") = "none"
                            End If
                            ddlDiaInicial.SelectedValue = oCuenta.dcPerFacIni.ToString()
                            ''lblDiaFinal.Text = oCuenta.dcPerFacFin.ToString()

                            txtAcuerdos.Text = "" & oCuenta.Acuerdos
                            txtFechaInicioContrato.Text = "" & oCuenta.FechaInicioContrato
                            txtFechaFinContrato.Text = "" & oCuenta.FechaFinContrato
                            hdfCuentaAdjuntos.Value = "" & oCuenta.Adjuntos
                            hdfTotalLineas.Value = "" & oCuenta.TotalLineas

                            cbeOrganizacion.Descripcion = oCuenta.Organizacion.vcNomOrg
                            cbeOrganizacion.Codigo = oCuenta.Organizacion.vcCodInt

                            hdfCuenta.Value = vcCodCue
                            Script = " var lstSubCuenta=" & oSerializer.Serialize(oCuenta.SubCuentas) & ";"
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                        Else
                            ''lblDiaFinal.Text = "30"
                            trEstado.Style("display") = "none"
                            Script = " var lstSubCuenta;"
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                            hdfCuenta.Value = "-1"
                        End If

                        GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("MOV_Cuenta", Me, Cuenta.MostrarCuenta(vcCodCue).Tables(0))

                        txtNombre.Focus()
                    Else
                        GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Cuenta", tbCamposDinamicos, "", "../../../", "", "")
                        Dim Script As String
                        hdfCuenta.Value = ""
                        ''lblDiaFinal.Text = "30"
                        trEstado.Style("display") = "none"
                        txtCodigo.Focus()
                        Script = " var lstSubCuenta;"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                    End If
                    Cuenta.Dispose()
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal oCuenta As String, ByVal vcCodCue As String,
                                   ByVal vcCamDim As String, inTipoSer As String, inActualizarOrgaEmpleados As String,
                                   ByVal vcAdj As String) As Integer
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            'UtilitarioWeb.ActualizarCultura(oCultura)
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCuenta As ENT_MOV_Cuenta = oSerializer.Deserialize(Of ENT_MOV_Cuenta)(oCuenta)

            Dim objListAdjuntos As List(Of ENT_MOV_CuentaAdjunto) = New List(Of ENT_MOV_CuentaAdjunto)
            If v_oCuenta.Adjuntos.Length > 0 Then
                Dim mAdjuntos() As String = v_oCuenta.Adjuntos.Split(",")
                For Each strAdj As String In mAdjuntos
                    Dim objAdjunto As New ENT_MOV_CuentaAdjunto
                    objAdjunto.IdCuenta = 0
                    objAdjunto.NombreArchivo = strAdj.Split(":")(0)
                    objAdjunto.TamanoArchivo = strAdj.Split(":")(1)
                    objListAdjuntos.Add(objAdjunto)
                Next
            End If
            v_oCuenta.TipoServicio = Convert.ToInt32(inTipoSer)

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
            oAuditoria.Opcion = "Cuentas"
            oAuditoria.Tabla = Constantes.TableNames.CuentaMovil

            Dim strAntes As String = ""
            vcCodCue.Replace("&#39", "'")
            v_oCuenta.P_vcCod = v_oCuenta.P_vcCod.Replace("&#39", "'")
            v_oCuenta.vcNom = v_oCuenta.vcNom.Replace("&#39", "'")
            For Each oSubCuenta As ENT_MOV_SubCuenta In v_oCuenta.SubCuentas
                oSubCuenta.vcNom = oSubCuenta.vcNom.Replace("&#39", "'")
                oSubCuenta.vcDes = oSubCuenta.vcDes.Replace("&#39", "'")
            Next
            v_oCuenta.Acuerdos = v_oCuenta.Acuerdos.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
            Dim _return As Integer
            If vcCodCue = "" Then
                _return = Cuenta.Insertar(v_oCuenta, objListAdjuntos, vcCamDim)
                If _return <> "-1" Then
                    oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Cuenta", "P_vcCod", v_oCuenta.P_vcCod)
                    oAuditoria.Insertar(New String() {v_oCuenta.P_vcCod})
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {v_oCuenta.P_vcCod})
                Cuenta.Actualizar(v_oCuenta, objListAdjuntos, vcCamDim, inActualizarOrgaEmpleados)
                oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Cuenta", "P_vcCod", v_oCuenta.P_vcCod)
                oAuditoria.DespuesActualizar(New String() {v_oCuenta.P_vcCod}, strAntes)
                _return = 0
            End If
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarMonto_x_Cuenta(ByVal strNumCuenta As String, ByVal inTipoAsigCre As String) As Integer
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As Integer = 0
            Cuenta.ActualizarMonto_x_Cuenta(strNumCuenta, Convert.ToInt32(inTipoAsigCre))
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCantidadLineasAsociadasXSubCuenta(ByVal prvcCodCta As String, ByVal prInCodSubCue As String) As String
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim ds As New DataSet
            Dim vcCantidadLineas As String
            ds = Cuenta.ObtenerCantidadLineasAsociadasXSubCuenta(prvcCodCta, prInCodSubCue)
            If Not ds.Tables(0) Is Nothing Then
                vcCantidadLineas = ds.Tables(0).Rows(0)("Linea").ToString()
            Else
                vcCantidadLineas = 0
            End If
            Return vcCantidadLineas
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
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

End Class
