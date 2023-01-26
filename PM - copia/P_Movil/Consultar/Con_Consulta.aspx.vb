Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Consultar_Con_Consulta
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim Servicio As BL_GEN_Servicio = Nothing
        Dim Sucursal As BL_GEN_Sucursal = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim IMP_Llamada As BL_MOV_IMP_Llamada = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Nivel As BL_GEN_Nivel = Nothing
        Dim Pais As BL_GEN_Pais = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim Criterio As BL_MOV_IMP_Criterio = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If Not IsPostBack Then
                    'jherrera 20130507 Creando la instancia
                    '--------------------------------------
                    LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                    '--------------------------------------
                    Servicio = New BL_GEN_Servicio(oUsuario.IdCliente)
                    Sucursal = New BL_GEN_Sucursal(oUsuario.IdCliente)
                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    IMP_Llamada = New BL_MOV_IMP_Llamada(oUsuario.IdCliente)
                    Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
                    Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
                    Pais = New BL_GEN_Pais(oUsuario.IdCliente)

                    Dim inCodCri As String = Request.QueryString("inCodCri")
                    hdfNumCri.Value = Request.QueryString("inNumCri")

                    If (DateTime.Now.Month = 1) Then
                        txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day - 30).ToShortDateString
                    Else
                        txtDiaInicial.Text = DateTime.Now.AddDays(-DateTime.Now.Day + 1 - DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month - 1)).ToShortDateString
                    End If

                    'Dim exInfo As Exception
                    'Dim util As New Utilitarios

                    'exInfo = New Exception("txtDiaInicial.Text: " + txtDiaInicial.Text)
                    'util.GrabarLog(exInfo, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))



                    txtDiaFinal.Text = DateTime.Now.AddDays(-DateTime.Now.Day).ToShortDateString

                    UtilitarioWeb.Dataddl(ddlGlobal, Servicio.ListarGlobal("-1", "<Todos>"), "vcNom", "P_vcCod")
                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Todos>"), "vcNomOpe", "P_inCodOpe")
                    UtilitarioWeb.Dataddl(ddlNivelRanking, Nivel.Listar(-1, "<Seleccionar>"), "vcNomNiv", "P_inCodNiv")
                    UtilitarioWeb.Dataddl(ddlNivelSumario, Nivel.Listar(-1, "<Seleccionar>"), "vcNomNiv", "P_inCodNiv")
                    UtilitarioWeb.Dataddl(ddlPaisSumario, Pais.Listar(-1, "<Seleccionar>"), "vcNomPai", "P_vcCodPai")
                    UtilitarioWeb.DatachkLst(chklstOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")
                    UtilitarioWeb.DatarbLst(rblstTipoLlamada, IMP_Llamada.ListarTipoLlamada(), "vcNom", "P_inCod")
                    UtilitarioWeb.DatarbLst(rblstTelefonia, IMP_Llamada.ListarTipoTelefonia(), "vcNom", "P_inCod")

                    hdfCodOrganizacion.Value = oUsuario.F_vcCodInt
                    If oUsuario.F_vcCodInt.Trim <> "" OrElse oUsuario.vcUsu.ToString() = "administrador" Or oUsuario.vcUsu.ToString() = "super administrador" Then
                        hdfAdmin.Value = "1"
                    Else
                        hdfAdmin.Value = "0"
                    End If
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    'jherrera 20130507 Se llena el ddlTipo
                    '--------------------------------------
                    UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                    '--------------------------------------
                    'Dim vcPerfiles As String = String.Empty
                    'For p As Integer = 0 To oUsuario.Perfiles.Count - 1
                    '    If (vcPerfiles = "") Then
                    '        If oUsuario.Perfiles(p).inCodTip_Consumo.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_Consumo.ToString()) Then
                    '            vcPerfiles = oUsuario.Perfiles(p).inCodTip_Consumo.ToString()
                    '        ElseIf oUsuario.Perfiles(p).inCodTip_Consumo.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_Consumo.ToString()) Then
                    '            vcPerfiles = oUsuario.Perfiles(p).inCodTip_Consumo.ToString()
                    '        End If
                    '    Else
                    '        If oUsuario.Perfiles(p).inCodTip_Consumo.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_Consumo.ToString()) Then
                    '            vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_Consumo.ToString()
                    '        ElseIf oUsuario.Perfiles(p).inCodTip_Consumo.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_Consumo.ToString()) Then
                    '            vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_Consumo.ToString()
                    '        End If
                    '    End If
                    'Next

                    'If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Then
                    '    ddlLineaTipo.SelectedValue = 0
                    'ElseIf vcPerfiles <> "" Then
                    '    ddlLineaTipo.SelectedValue = vcPerfiles
                    'End If

                    If hdfAdmin.Value <> "1" Then
                        ddlLineaTipo.Enabled = False
                    End If

                    'Validar por sucursal...
                    If oUsuario.F_vcCodSuc = "" Or oUsuario.F_vcCodSuc = "0000000000" Then
                        UtilitarioWeb.DatachkLst(chklstSucursalOrigen, Sucursal.Listar, "vcNom", "P_vcCod")
                    Else
                        'Mostrar solo la sucursal con acceso...
                        Try
                            Dim lstSucursal As List(Of ENT_GEN_Sucursal) = New List(Of ENT_GEN_Sucursal)
                            Dim oSucursal As ENT_GEN_Sucursal = Sucursal.Mostrar(oUsuario.F_vcCodSuc)
                            lstSucursal.Add(oSucursal)
                            UtilitarioWeb.DatachkLst(chklstSucursalOrigen, lstSucursal, "vcNom", "P_vcCod")
                            chklstSucursalOrigen.Items(0).Selected = True
                            chklstSucursalOrigen.Enabled = False
                            chkSucursalOrigen.Style.Add("display", "none")
                        Catch
                        End Try
                    End If

                    rblstTipoLlamada.SelectedIndex = 1
                    rblstTelefonia.SelectedIndex = 0

                    Dim grupousuario As Boolean = True
                    If UtilitarioWeb.Seguridad.EsAdministrador Then grupousuario = False

                    If oUsuario.Empleado.P_vcCod <> "" And oUsuario.F_vcCodInt = "" And grupousuario Then
                        btnEmpleado.Style("display") = "none"
                        btnQuitarEmpleado.Style("display") = "none"
                        accordOfiOrg.Visible = False
                        Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
                        Dim oEmpleado As ENT_GEN_Empleado = Empleado.Mostrar(oUsuario.Empleado.P_vcCod)
                        lstEmpleado.Items.Add(New ListItem(oEmpleado.P_vcCod & "=" & oEmpleado.vcNom, oEmpleado.P_vcCod))
                        hdfEmpSel.Value = oUsuario.Empleado.P_vcCod
                    End If

                    If inCodCri <> "" Then
                        Criterio = New BL_MOV_IMP_Criterio(oUsuario.IdCliente)
                        Dim oCriterio As New ENT_MOV_IMP_Criterio

                        oCriterio = Criterio.Mostrar(Integer.Parse(inCodCri))
                        rblstTipoConsulta.SelectedValue = oCriterio.inTipCon
                        ddlLineaTipo.SelectedValue = oCriterio.inLinTip
                        hdfCod.Value = inCodCri
                        hdfCodAre.Value = "-1"
                        Select Case oCriterio.inTipCon
                            Case 2
                                tdCriteriosAdicionales.Style("display") = ""
                                dvSumario.Style("display") = ""
                                ddlTipoSumario.SelectedValue = oCriterio.inTipSum
                                Select Case oCriterio.inTipSum
                                    Case 1
                                        dvCriterioExtra.Style("display") = ""
                                        dvNivelSumario.Style("display") = ""
                                        ddlNivelSumario.SelectedValue = oCriterio.NivelSumario.P_inCodNiv
                                    Case 2
                                        dvCriterioExtra.Style("display") = ""
                                        dvAreaSumario.Style("display") = ""
                                        lblAreaSumario.Text = oCriterio.AreaSumario.P_inCodOrg & "=" & oCriterio.AreaSumario.vcNomOrg
                                        hdfCodAre.Value = oCriterio.AreaSumario.P_inCodOrg.ToString()
                                    Case 10
                                        dvCriterioExtra.Style("display") = ""
                                        dvPaisSumario.Style("display") = ""
                                        ddlPaisSumario.SelectedValue = oCriterio.PaisSumario.P_vcCodPai
                                End Select
                            Case 4
                                tdCriteriosAdicionales.Style("display") = ""
                                dvRanking.Style("display") = ""
                                ddlNivelRanking.SelectedValue = oCriterio.NivelRanking.P_inCodNiv
                        End Select

                        If oUsuario.F_vcCodInt <> "" Then
                            For Each oEmpleado As ENT_GEN_Empleado In oCriterio.Empleados
                                lstEmpleado.Items.Add(New ListItem(oEmpleado.P_vcCod & "=" & oEmpleado.vcNom, oEmpleado.P_vcCod))
                            Next
                        End If

                        For Each oLinea As ENT_MOV_Linea In oCriterio.Lineas
                            lstLinea.Items.Add(New ListItem(oLinea.P_vcNum & "=" & oLinea.Empleado.vcNom, oLinea.P_vcNum))
                        Next

                        ddlOficinaOrganizativa.SelectedValue = oCriterio.inTipOfiOrg

                        For Each oOrganizacion As ENT_GEN_Organizacion In oCriterio.Organizaciones
                            lstOrganizacion.Items.Add(New ListItem(oOrganizacion.P_inCodOrg & "=" & oOrganizacion.vcNomOrg, oOrganizacion.P_inCodOrg))
                        Next
                        For Each oCentroCosto As ENT_GEN_CentroCosto In oCriterio.CentrosCostos
                            lstOrganizacion.Items.Add(New ListItem(oCentroCosto.P_vcCodCenCos & "=" & oCentroCosto.vcNomCenCos, oCentroCosto.P_vcCodCenCos))
                        Next

                        txtDiaInicial.Text = oCriterio.vcPorDiaIni
                        txtDiaFinal.Text = oCriterio.vcPorDiaFin
                        txtHoraInicial.Text = oCriterio.vcPorHorIni
                        txtHoraFinal.Text = oCriterio.vcPorHorFin
                        txtTiempoMayor.Text = oCriterio.vcPorTieIni
                        txtTiempoMenor.Text = oCriterio.vcPorTieFin
                        ddlGlobal.SelectedValue = oCriterio.Global.vcNom

                        UtilitarioWeb.DatachkLst(chklstServicio, Servicio.ListarPorGlobal(oCriterio.Global.P_vcCod), "vcNom", "P_inCod")

                        For Each oServicio As ENT_GEN_Servicio In oCriterio.Servicios

                            For Each chkServicio As ListItem In chklstServicio.Items
                                If chkServicio.Value = oServicio.P_inCod.ToString() Then
                                    chkServicio.Selected = True
                                End If
                            Next
                        Next

                        For Each oNumero As ENT_MOV_Linea In oCriterio.Numeros
                            lstNumeroLlamado.Items.Add(New ListItem(oNumero.P_vcNum, oNumero.P_vcNum))
                        Next

                        For Each oOperador As ENT_GEN_Operador In oCriterio.Operadores
                            For Each chkOperador As ListItem In chklstOperador.Items
                                If chkOperador.Value = oOperador.P_inCodOpe.ToString() Then
                                    chkOperador.Selected = True
                                End If
                            Next
                        Next

                        rblstTipoLlamada.SelectedValue = oCriterio.TipoLlamada.P_inCod
                        rblstTelefonia.SelectedValue = oCriterio.TipoTelefonia.P_inCod

                        For Each oSucursal As ENT_GEN_Sucursal In oCriterio.SucursalesOrigen
                            For Each chkSucursalOrigen As ListItem In chklstSucursalOrigen.Items
                                If chkSucursalOrigen.Value = oSucursal.P_vcCod Then
                                    chkSucursalOrigen.Selected = True
                                End If
                            Next
                        Next

                        ddlOperador.SelectedValue = oCriterio.OperadorCuenta.P_inCodOpe

                        UtilitarioWeb.DatachkLst(chklstCuenta, Cuenta.ListarPorOperador(oCriterio.OperadorCuenta.P_inCodOpe), "vcNom", "P_vcCod")
                        For Each oCuenta As ENT_MOV_Cuenta In oCriterio.Cuentas
                            For Each chkCuenta As ListItem In chklstCuenta.Items
                                If chkCuenta.Value = oCuenta.P_vcCod Then
                                    chkCuenta.Selected = True
                                End If
                            Next
                        Next
                    Else
                        hdfCod.Value = "-1"
                        UtilitarioWeb.DatachkLst(chklstServicio, Servicio.Listar, "vcNom", "P_inCod")
                        UtilitarioWeb.DatachkLst(chklstCuenta, Cuenta.ListarPorOperador("-1"), "vcNom", "P_vcCod")
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

            

            If chklstOperador.Items.Count = 1 Then
                chkOperador.Enabled = False
                chkOperador.Checked = True
                chklstOperador.Items(0).Enabled = False
                chklstOperador.Items(0).Selected = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
            If Servicio IsNot Nothing Then Servicio.Dispose()
            If Sucursal IsNot Nothing Then Sucursal.Dispose()
            If Operador IsNot Nothing Then Operador.Dispose()
            If IMP_Llamada IsNot Nothing Then IMP_Llamada.Dispose()
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If Nivel IsNot Nothing Then Nivel.Dispose()
            If Pais IsNot Nothing Then Pais.Dispose()
            If Empleado IsNot Nothing Then Empleado.Dispose()
            If Criterio IsNot Nothing Then Criterio.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarServicioPorGlobal(ByVal vcCodGlo As String) As List(Of ENT_GEN_Servicio)
        Dim Servicio As BL_GEN_Servicio = Nothing
        Try
            Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarPorGlobal(vcCodGlo)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Servicio.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String) As List(Of ENT_MOV_Cuenta)
        Try
            Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(Integer.Parse(inCodOpe))
            Cuenta.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal oCriterio As String) As String
        Dim Criterio As BL_MOV_IMP_Criterio = Nothing
        Try
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            Criterio = New BL_MOV_IMP_Criterio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            v_oCriterio.Usuario.P_inCod = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
            v_oCriterio.P_inCodCri = Criterio.Guardar(v_oCriterio)
            Return v_oCriterio.P_inCodCri.ToString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Criterio IsNot Nothing Then Criterio.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Sub SeteaValores(ByVal oCriterio As String)
        Try

            'oCriterio = oCriterio.Replace("P_inCodOrg", "")

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            'Dim miDiccionarioCriterio As Dictionary(Of String, IDictionary)

            'miDiccionarioCriterio = HttpContext.Current.Session("MisCriterios")

            'If miDiccionarioCriterio Is Nothing Then
            '    miDiccionarioCriterio = New Dictionary(Of String, IDictionary)

            '    Dim dic As New Dictionary(Of String, Object)
            '    dic.Add(v_oCriterio.vcTab.ToString(), v_oCriterio)
            '    miDiccionarioCriterio.Add(v_oCriterio.inNumCri.ToString(), dic)
            'Else
            '    If miDiccionarioCriterio.ContainsKey(v_oCriterio.inNumCri.ToString()) Then
            '        Dim miDic As IDictionary = miDiccionarioCriterio.Item(v_oCriterio.inNumCri.ToString())

            '        If miDic.Contains(v_oCriterio.vcTab) Then
            '            miDic.Item(v_oCriterio.vcTab) = v_oCriterio
            '        Else
            '            miDic.Add(v_oCriterio.vcTab, v_oCriterio)
            '        End If

            '        miDiccionarioCriterio.Item(v_oCriterio.inNumCri.ToString()) = miDic

            '    Else
            '        Dim dic As New Dictionary(Of String, Object)
            '        dic.Add(v_oCriterio.vcTab.ToString(), v_oCriterio)
            '        miDiccionarioCriterio.Add(v_oCriterio.inNumCri.ToString(), dic)
            '    End If
            'End If
            'HttpContext.Current.Session("MisCriterios") = miDiccionarioCriterio
            HttpContext.Current.Session("MiCriterio") = v_oCriterio

            HttpContext.Current.Session("Criterio" & v_oCriterio.inNumCri.ToString()) = v_oCriterio
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
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
End Class