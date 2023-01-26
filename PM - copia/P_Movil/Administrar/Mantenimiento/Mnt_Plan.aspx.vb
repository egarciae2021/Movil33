Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria
Imports System.Globalization
Imports System.Threading
Imports System.IO

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Plan
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Plan As BL_MOV_Plan = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo = Nothing
        Try
            If Not IsPostBack Then
                oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                Dim inCodPla As String = Request.QueryString("Cod")
                hdfCodCliente.Value = oUsuario.IdCliente

                Dim lstTipoModeloDispositivo As List(Of ENT_MOV_TipoModeloDispositivo) = TipoModeloDispositivo.ListarModeloDispositivo()

                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                UtilitarioWeb.Dataddl(ddlTipoServicio, lstTipoModeloDispositivo, "Descripcion", "IdTipoModeloDispositivo")
                'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

                Operador.Dispose()
                LineaTipo.Dispose()
                TipoModeloDispositivo.Dispose()
                Dim oldCI As System.Globalization.CultureInfo = System.Threading.Thread.CurrentThread.CurrentCulture
                'Tipo de Linea - wapumayta - 02-11-2015
                Dim General = New General()
                Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                If hdfCodLinTip_X_User.Value <> 0 Then
                    ddlLineaTipo.Enabled = False
                    ddlLineaTipo.SelectedValue = hdfCodLinTip_X_User.Value
                    If hdfCodLinTip_X_User.Value = 1 Then
                        trManientePlan.Style("display") = "none"
                    Else
                        trManientePlan.Style("display") = ""
                    End If
                End If

                '------------------------------------------------------
                hdfImpto.Value = (oCultura.dcIGV / 100.0) + 1

                If inCodPla <> "" Then

                    GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Plan", tbCamposDinamicos, "", "../../../", "P_inCod", "")

                    Dim oSerializer As New JavaScriptSerializer
                    Dim Script As String
                    Plan = New BL_MOV_Plan(oUsuario.IdCliente)
                    Dim oPlan As ENT_MOV_Plan = Plan.Mostrar(Convert.ToInt32(inCodPla))

                    txtPlan.Text = oPlan.vcNom.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                    txtDescripcion.Text = oPlan.vcDes.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                    ddlOperador.SelectedValue = oPlan.F_inCodOpe
                    'lblMonto.Text = oPlan.dcMon
                    'lblMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado(oPlan.dcMon, oCultura)

                    If oCultura.vcCodCul.ToString() = "es-PE" Then
                        lblMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado(oPlan.dcMon, oCultura)
                    Else
                        lblMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(oPlan.dcMon, oCultura).ToString()
                    End If
                    'lblMonto.Text = oPlan.dcMon

                    'lblMonto.Text = UtilitarioWeb.ComprobarDecimalNULL(oPlan.dcMon, 0).ToString() 'oLinea.dcMon.ToString()
                    'lblMonto.Text = oPlan.dcMon
                    hdfSepMiles.Value = oCultura.vcSimSepMil
                    hdfTotalLineas.Value = oPlan.TotalLineas

                    ddlLineaTipo.SelectedValue = oPlan.F_inCodTip.ToString()
                    ddlTipoServicio.SelectedValue = oPlan.TipoServicio.ToString()
                    'validacines tipo 'wapumayta 06/08/2014
                    Dim cantLineas As Integer = 0
                    cantLineas = Plan.ValidarCambioTipo(inCodPla)
                    If cantLineas > 0 Then
                        If cantLineas = 1 Then
                            ttgInfoTipoLinea.Mensaje = "No se puede editar por que ya está siendo usado por " + cantLineas.ToString() + " línea."
                        Else
                            ttgInfoTipoLinea.Mensaje = "No se puede editar por que ya está siendo usado por " + cantLineas.ToString() + " líneas."
                        End If
                        dvTggInfo.Style("display") = ""
                        ddlLineaTipo.Enabled = False
                    End If
                    'fin validacion tipo

                    If oPlan.F_inCodTip.ToString() = "1" Then
                        trManientePlan.Style("display") = "none"
                    Else
                        trManientePlan.Style("display") = ""
                    End If
                    chkEstado.Checked = oPlan.btVig
                    chkMantienePlanCamp.Checked = oPlan.MantienePlanCampana
                    If oPlan.btVig Then
                        trEstado.Style("display") = "none"
                    End If
                    hdfPlan.Value = inCodPla
                    Script = " var lstSubPlan=" & oSerializer.Serialize(oPlan.SubPlanes) & ";"
                    Dim CodModelos As String = ""
                    Dim NomModelos As String = ""
                    For i As Integer = 0 To oPlan.Modelos.Count - 1
                        CodModelos += oPlan.Modelos(i).F_inCodMod & ","
                        NomModelos += oPlan.Modelos(i).NombreModelo & "*,"
                    Next
                    hdfCodDispositivos.Value = CodModelos
                    hdfNomDispositivos.Value = NomModelos

                    chkRoaming.Checked = oPlan.Roaming
                    chkIncImp.Checked = oPlan.IncluyeImpuesto

                    GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("MOV_Plan", Me, Plan.MostrarPlan(inCodPla).Tables(0))

                    'jherrera 20140625
                    txtMinAdi.Text = oPlan.inMinAdi
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                Else

                    GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Plan", tbCamposDinamicos, "", "../../../", "", "")

                    Dim Script As String
                    hdfPlan.Value = ""
                    trEstado.Style("display") = "none"
                    Script = " var lstSubPlan;"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plan) Then Plan.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal oPlan As String, ByVal oModeloPlan As String,
                                   ByVal vcCamDim As String, ByVal vcAdj As String,
                                   ByVal inTipoSer As String) As Integer
        Dim Plan As BL_MOV_Plan = Nothing
        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oPlan As ENT_MOV_Plan = oSerializer.Deserialize(Of ENT_MOV_Plan)(oPlan)

            v_oPlan.vcDes = v_oPlan.vcDes.Replace("&#39", "'")
            v_oPlan.vcNom = v_oPlan.vcNom.Replace("&#39", "'")
            For Each oSubPlan As ENT_MOV_SubPlan In v_oPlan.SubPlanes
                oSubPlan.vcNom = oSubPlan.vcNom.Replace("&#39", "'")
                oSubPlan.vcDes = oSubPlan.vcDes.Replace("&#39", "'")
            Next
            v_oPlan.TipoServicio = Convert.ToInt32(inTipoSer)

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
            oAuditoria.Opcion = "Planes"
            oAuditoria.Tabla = Constantes.TableNames.PlanMovil

            Dim strAntes As String = ""
            Dim P_inCod As Integer = 0
            If v_oPlan.P_inCod < 0 Then
                P_inCod = Plan.Insertar(v_oPlan, oModeloPlan, vcCamDim)
                If P_inCod <> "-1" Then
                    oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Plan", "P_inCod", P_inCod)
                    oAuditoria.Insertar(New String() {P_inCod})
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {v_oPlan.P_inCod})
                Plan.Actualizar(v_oPlan, oModeloPlan, vcCamDim)
                oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_Plan", "P_inCod", v_oPlan.P_inCod)
                oAuditoria.DespuesActualizar(New String() {v_oPlan.P_inCod}, strAntes)
            End If
            Return P_inCod
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plan) Then Plan.Dispose()
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarMonto_x_Plan(ByVal strNumCuenta As String, ByVal inTipoAsigCre As String) As Integer
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As Integer = 0
            Plan.ActualizarMonto_x_Plan(strNumCuenta, Convert.ToInt32(inTipoAsigCre))
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
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