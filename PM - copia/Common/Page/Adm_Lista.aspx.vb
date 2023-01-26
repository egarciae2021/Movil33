Imports System.Diagnostics.Eventing.Reader
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Auditoria
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Web.Services
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports UtilitarioWeb
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.Common.Logging
Imports VisualSoft.PCSistelMovil.General.BE
Imports ClosedXML.Excel
Imports System.IO.Compression
Imports Ionic.Zip

Partial Class P_Movil_Administrar_Adm_Lista
    Inherits System.Web.UI.Page
    Shared ruta As String = String.Empty
    Shared flagBorrarString As Boolean = True

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Entidad As BL_ENT_Entidad = Nothing
        Dim Opcion As BL_ENT_Opcion = Nothing
        Dim Campo As BL_ENT_Campo = Nothing
        Dim Nivel As BL_GEN_Nivel = Nothing
        Dim Modulo As BL_PRO_Modulo = Nothing
        Try
            If Session("Usuario") Is Nothing Then Exit Sub
            If Not IsPostBack Then
                Dim vcTab As String = Request.QueryString("vcTab")
                Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                Dim inTip As Integer = Val("" & Request.QueryString("inTip"))
                Dim inNoPer As Integer = Val("" & Request.QueryString("inNoPer"))
                Entidad = New BL_ENT_Entidad(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Opcion = New BL_ENT_Opcion(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Campo = New BL_ENT_Campo(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oEntidad As ENT_ENT_Entidad
                Dim lstOpcion As List(Of ENT_ENT_Opcion)
                Dim lstCampo As List(Of ENT_ENT_Campo)
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)

                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then
                    'If (vcTab = "MOV_Linea") Or (vcTab = "MOV_Dispositivo") Then
                    If Convert.ToBoolean(Session("IngresoInvalido")) = True Then
                        hdfLicencia.Value = "4GVBGsuwXJDBuD3LFODkzQA="
                    End If
                    'Else
                    '    hdfLicencia.Value = ""
                    'End If
                Else
                    hdfLicencia.Value = ""
                End If

                obtenerRuta()
                oEntidad = Entidad.Mostrar(vcTab, oUsuario.P_inCod)

                'lblTituloOpciones.Text = oEntidad.vcDes

                Modulo = New BL_PRO_Modulo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim eModulo As ENT_PRO_Modulo = Modulo.ObtenerModuloXvcTab(inCod, vcTab)

                'Registra auditoria...
                ''Dim oAuditoria As New ProcesaAuditoria
                ''oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                ''oAuditoria.Producto = Constantes.AuditoriaConstantes.Name

                'ECONDEÑA   11/10/2016
                'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
                If eModulo.vcNom Is Nothing Then eModulo.vcNom = CambiarNombreModulo(vcTab)

                ''oAuditoria.Modulo = IIf(eModulo.vcNom = "", Constantes.AuditoriaConstantes.Name, eModulo.vcNom)
                ''oAuditoria.NombreUsuario = oUsuario.vcUsu
                ''oAuditoria.Opcion = oEntidad.vcDes
                ''oAuditoria.Tabla = oEntidad.vcTab
                ''oAuditoria.Especial("Ingreso al listado de " & oEntidad.vcDes)

                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                                        "Ingresó al listado de " & oEntidad.vcDes & " - " & oUsuario.vcUsu,
                                        "",
                                        "USUARIO: " & oUsuario.vcUsu & ". MÓDULO: " & IIf(eModulo.vcNom = "", Constantes.AuditoriaConstantes.Name, eModulo.vcNom) & ".TABLA: " & oEntidad.vcTab)
                ''Logger.WriteLog(Me, LogLevelL4N.DEBUG, "Ingreso al listado de " & oEntidad.vcDes & " - " & oUsuario.vcUsu)

                lstOpcion = Opcion.Listar(vcTab, inTipOri)


                lstCampo = Campo.Listar(vcTab, oUsuario, 0)


                hdfvcTab.Value = vcTab
                hdfinTipOri.Value = inTipOri.ToString()
                hdfCodEntidad.Value = oEntidad.P_inCod

                If flagBorrarString = True Then
                    For index = 0 To lstCampo.Count - 1 Step 1
                        If lstCampo.Item(index).inTipDat = 7 Then
                            lstCampo.Item(index).vcNom = lstCampo.Item(index).vcNom + "Str"
                            lstCampo.Item(index).vcNomAlias = lstCampo.Item(index).vcNomAlias + "Str"
                        End If
                    Next
                    flagBorrarString = False
                End If
                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                Session("Campos" & "_" & vcTab) = lstCampo
                Session("DescripcionEntidad" & "_" & vcTab) = oEntidad.vcDes
                btnAgregar.Attributes("Url") = oEntidad.vcURLMan
                btnEditar.Attributes("Url") = oEntidad.vcURLMan

                If (oEntidad.vcURLMan.Contains("?")) Then
                    btnEditarSimple.Attributes("Url") = oEntidad.vcURLMan + "&EditSimple=1" + "&CodEntidad=" + oEntidad.P_inCod.ToString()
                Else
                    btnEditarSimple.Attributes("Url") = oEntidad.vcURLMan + "?EditSimple=1" + "&CodEntidad=" + oEntidad.P_inCod.ToString()
                End If

                If (oEntidad.vcURLMan.Contains("?")) Then
                    btnVerDetalle.Attributes("Url") = oEntidad.vcURLMan + "&VistaVer=1" + "&CodEntidad=" + oEntidad.P_inCod.ToString()
                Else
                    btnVerDetalle.Attributes("Url") = oEntidad.vcURLMan + "?VistaVer=1" + "&CodEntidad=" + oEntidad.P_inCod.ToString()
                End If

                Session("Origen") = inTipOri

                ConfigurarGrid(lstCampo, oEntidad)
                If inNoPer = 0 Then
                    ConfigurarAcciones(oUsuario, inCod, oEntidad, inTip)
                Else
                    hdfEdicion.Value = "1"
                    btnDownload.Visible = False
                    btnUpload.Visible = False
                    btnLiberacionLinea.Visible = False
                    btnLiberacionDispositivo.Visible = False
                End If

                ConfigurarBusqueda(lstCampo, oEntidad)

                If (vcTab = "MOV_Dispositivo" Or vcTab = "MOV_Linea") Then
                    ConfigurarOpciones(oEntidad, lstOpcion, oUsuario, inCod, inTip, True)
                Else
                    ConfigurarOpciones(oEntidad, lstOpcion, oUsuario, inCod, inTip, False)
                End If

                ConfigurarValoresPorDefecto(lstCampo)
                hdfNumMaxNivel.Value = Convert.ToInt32("0" + ConfigurationManager.AppSettings("NumMaxNivel").ToString())
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Entidad IsNot Nothing Then Entidad.Dispose()
            If Opcion IsNot Nothing Then Opcion.Dispose()
            If Campo IsNot Nothing Then Campo.Dispose()
            If Nivel IsNot Nothing Then Nivel.Dispose()
            If Modulo IsNot Nothing Then Modulo.Dispose()
        End Try
    End Sub

    Private Sub ConfigurarValoresPorDefecto(ByVal lstCampo As List(Of ENT_ENT_Campo))
        Dim strValorPorDefecto As String = ""
        For Each oCampo As ENT_ENT_Campo In lstCampo
            If oCampo.btIdPri Then
                strValorPorDefecto = "" & oCampo.vcValdef
            End If
        Next
        hdfValorPorDefecto.Value = strValorPorDefecto
    End Sub

    'Private Shared Function FiltrosPorTablas(ByVal vcTab As String) As String
    '    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '    Dim _return As String = ""
    '    vcTab = "" & vcTab
    '    Select Case vcTab.ToUpper
    '        Case "PCS_TRF_SERVICIO"
    '            _return = "btUsaImp=1"
    '        Case "M_ORGA"
    '            _return = "ORGA_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%'"
    '        Case "M_EMPL"
    '            If oUsuario.EsAdministrador Or oUsuario.F_vcCodInt.Length = 3 Or oUsuario.F_vcCodInt.Length = 0 Then
    '                _return = "(EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR EMPL_CodInt2 = '0000000000')  "
    '            Else
    '                _return = "EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' "
    '            End If

    '        Case "M_SUCU"
    '            If oUsuario.F_vcCodSuc <> "" And oUsuario.F_vcCodSuc <> "0000000000" Then
    '                _return = "SUCU_P_vcCODSUC = '" & oUsuario.F_vcCodSuc & "'"
    '            End If
    '        Case "MOV_LINEA"
    '            'agregado 06-08-2015 wapumayta (solo muestra información de lineas sin empleado a usuario administrador o usuario asociado al nodo principal
    '            If oUsuario.EsAdministrador Or oUsuario.F_vcCodInt.Length = 3 Or oUsuario.F_vcCodInt.Length = 0 Then
    '                _return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR M_EMPL.EMPL_CodInt2 is NULL OR M_EMPL.EMPL_CodInt2 = '0000000000') "
    '            Else
    '                _return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%') "
    '            End If
    '        Case "MOV_DISPOSITIVO"
    '            'agregado 06-08-2015 wapumayta (solo muestra información de dispositivos sin empleado a usuario administrador o usuario asociado al nodo principal
    '            If oUsuario.EsAdministrador Or oUsuario.F_vcCodInt.Length = 3 Or oUsuario.F_vcCodInt.Length = 0 Then
    '                _return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR M_EMPL.EMPL_CodInt2 is NULL OR M_EMPL.EMPL_CodInt2 = '0000000000') "
    '            Else
    '                _return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%') "
    '            End If
    '    End Select

    '    Return _return
    'End Function

    Private Shared Function FiltrosPorTablas(ByVal vcTab As String, ByVal vcTipLin_X_Perfil As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim _return As String = ""
        vcTab = "" & vcTab
        Dim arrayCodigosArea() As String
        arrayCodigosArea = oUsuario.F_vcCodInt.Split(",")

        Dim filtro As String = ""
        'Usaré OR en lugar de IN porque necesito hacer multipleas consultas like con los codigos de área asignados


        Select Case vcTab.ToUpper
            Case "PCS_TRF_SERVICIO"
                _return = "btUsaImp=1"
            Case "M_ORGA"

                For Each codigo As String In arrayCodigosArea
                    filtro += "ORGA_CodInt2 LIKE '" & codigo & "%' OR "
                Next
                filtro = filtro.Substring(0, filtro.Length - 3)

                '_return = "ORGA_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%'"
                _return = filtro
            Case "M_EMPL"

                For Each codigo As String In arrayCodigosArea
                    filtro += "EMPL_CodInt2 LIKE '" & codigo & "%' OR "
                Next
                filtro = filtro.Substring(0, filtro.Length - 3)

                If oUsuario.EsAdministrador Or oUsuario.F_vcCodInt.Length = 3 Or oUsuario.F_vcCodInt.Length = 0 Then
                    '_return = "(EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR EMPL_CodInt2 = '0000000000') And EMPL_P_vcCODEMP <> '0000000000' "
                    '_return = "(EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR EMPL_CodInt2 = '0000000000') "
                    _return = "(" & filtro & " OR EMPL_CodInt2 = '0000000000') "
                Else
                    '_return = "EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' "
                    _return = filtro
                End If

            Case "M_SUCU"
                If oUsuario.F_vcCodSuc <> "" And oUsuario.F_vcCodSuc <> "0000000000" Then
                    _return = "SUCU_P_vcCODSUC = '" & oUsuario.F_vcCodSuc & "'"
                End If
            Case "MOV_LINEA"

                For Each codigo As String In arrayCodigosArea
                    filtro += "[MOV_Cuenta].CodigoOrganizacion LIKE '" & codigo & "%' OR "
                Next
                filtro = filtro.Substring(0, filtro.Length - 3)

                'agregado 06-08-2015 wapumayta (solo muestra información de lineas sin empleado a usuario administrador o usuario asociado al nodo principal
                If oUsuario.EsAdministrador Or oUsuario.F_vcCodInt.Length = 3 Or oUsuario.F_vcCodInt.Length = 0 Then
                    '_return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR M_EMPL.EMPL_CodInt2 is NULL OR M_EMPL.EMPL_CodInt2 = '0000000000') "
                    _return = " (" & filtro & " OR ISNULL([MOV_Cuenta].CodigoOrganizacion,'') = '' OR [MOV_Cuenta].CodigoOrganizacion = '0000000000') "
                Else
                    '_return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%') "
                    _return = " (" & filtro & ") "
                End If

                If vcTipLin_X_Perfil = 0 Then
                    _return = _return & " AND (MOV_LINEA.F_inCodTip = '" & vcTipLin_X_Perfil & "' OR '" & vcTipLin_X_Perfil & "' = 0)"
                Else
                    _return = _return & " AND MOV_LINEA.F_inCodTip = '" & vcTipLin_X_Perfil & "'"
                End If

            Case "MOV_DISPOSITIVO"

                For Each codigo As String In arrayCodigosArea
                    filtro += "[MOV_Cuenta].[CodigoOrganizacion] LIKE '" & codigo & "%' OR "
                Next
                filtro = filtro.Substring(0, filtro.Length - 3)

                'agregado 06-08-2015 wapumayta (solo muestra información de dispositivos sin empleado a usuario administrador o usuario asociado al nodo principal
                If oUsuario.EsAdministrador Or oUsuario.F_vcCodInt.Length = 3 Or oUsuario.F_vcCodInt.Length = 0 Then
                    '_return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR M_EMPL.EMPL_CodInt2 is NULL OR M_EMPL.EMPL_CodInt2 = '0000000000') "
                    _return = " (" & filtro & " OR [MOV_Cuenta].[CodigoOrganizacion] is NULL OR [MOV_Cuenta].[CodigoOrganizacion] = '0000000000') "
                Else
                    '_return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%') "
                    _return = " (" & filtro & ") "
                End If

            Case "MOV_CUENTA"

                For Each codigo As String In arrayCodigosArea
                    filtro += "MOV_CUENTA.CodigoOrganizacion LIKE '" & codigo & "%' OR "
                Next
                filtro = filtro.Substring(0, filtro.Length - 3)

                '_return = " (MOV_CUENTA.CodigoOrganizacion LIKE '" & oUsuario.F_vcCodInt & "%') "
                _return = " (" & filtro & ") "
                For Each oPerfil As ENT_SEG_Perfil In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Perfiles
                    If oPerfil.P_inCod = 1 OrElse oPerfil.CodigoPerfil = "SUPADM" Then 'Es super administrador
                        _return = ""
                        Exit For
                    End If
                Next

            Case "SEG_PERFIL"
                _return = " SEG_PERFIL.P_inCod <> 1 "
                For Each oPerfil As ENT_SEG_Perfil In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Perfiles
                    If oPerfil.P_inCod = 1 OrElse oPerfil.CodigoPerfil = "SUPADM" Then 'Es super administrador
                        _return = ""
                        Exit For
                    End If
                Next


        End Select

        Return _return
    End Function

    '<WebMethod()>
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, _
    '                             ByVal vcTipOrdCol As String, ByVal vcCam As String, ByVal vcValBus As String,
    '                             ByVal vcTab As String, ByVal inTipOri As String, ByVal inFilReg As String, ByVal inTipLin As String) As JQGridJsonResponse
    '    Dim Campo As BL_ENT_Campo = Nothing
    '    Dim CantidadSQLo As BL_MOV_Linea = Nothing
    '    Dim oModuloSQL As BL_LIC_UsuariosModulos = Nothing
    '    Try
    '        Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
    '        Dim NomId As String = HttpContext.Current.Session("NomId" & "_" & vcTab).ToString()
    '        'Dim inOrdId As Integer  
    '        'For Each oCampo As ENT_ENT_Campo In lstCampo
    '        '    If oCampo.btIdPri Then
    '        '        inOrdId = oCampo.inOrd
    '        '    End If
    '        'Next
    '        HttpContext.Current.Session("vcFiltro_" & vcTab) = vcCam & "," & vcValBus & "|" & inFilReg

    '        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/Temporal/"), "/")

    '        If flagBorrarString = False Then
    '            For index = 0 To lstCampo.Count - 1 Step 1
    '                If lstCampo.Item(index).inTipDat = 7 Then

    '                    lstCampo.Item(index).vcNom = lstCampo.Item(index).vcNom.Substring(0, lstCampo.Item(index).vcNom.Length - 3)
    '                    lstCampo.Item(index).vcNomAlias = lstCampo.Item(index).vcNomAlias.Substring(0, lstCampo.Item(index).vcNomAlias.Length - 3)
    '                End If

    '            Next
    '            flagBorrarString = True
    '        End If

    '        Dim nombreTabla As String = lstCampo.Item(0).vcTab

    '        'Filtros
    '        Dim strFiltros As String = FiltrosPorTablas(lstCampo.Item(0).vcTab)
    '        Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
    '                                                                       vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin))
    '        Campo.Dispose()

    '        For index = 0 To dsDetalle.Tables(1).Columns.Count - 1 Step 1
    '            If dsDetalle.Tables(1).Columns(index).DataType.Name.ToString().Equals("Byte[]") Then
    '                dsDetalle.Tables(1).Columns.Add(dsDetalle.Tables(1).Columns(index).ColumnName + "Str", Type.GetType("System.String"))
    '                Dim contadorFilas As Integer = 0
    '                For Each fila As DataRow In dsDetalle.Tables(1).Rows
    '                    If Not IsDBNull(fila.Item(index)) Then
    '                        Dim rutaLocal As String = ruta
    '                        Dim rutaextra As String = fila.Item(index).Length 'agregado 20-09-2013 wapumayta
    '                        rutaLocal = rutaLocal + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico" 'agregado 20-09-2013 wapumayta
    '                        'rutaLocal = rutaLocal + nombreTabla + "_" + fila.Item(1).ToString() + ".ico"
    '                        Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
    '                        fs.Write(fila.Item(index), 0, fila.Item(index).Length)
    '                        fs.Flush()
    '                        fs.Close()

    '                        'dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal/" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>"
    '                        dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal" + CarpetaDominio + "/" + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>" 'agregado 20-09-2013 wapumayta
    '                    End If
    '                    contadorFilas += 1
    '                Next
    '                dsDetalle.Tables(1).Columns.RemoveAt(index)
    '            Else

    '            End If
    '        Next

    '        Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
    '                                      Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function ObtenerControles(ByVal IdEntidad As String)
        Dim blControl As BL_ENT_ControlEdicion = Nothing
        Try
            Dim inTipOri As String = "1"
            blControl = New BL_ENT_ControlEdicion(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim LstControles As List(Of ENT_ENT_ControlEdicion) = blControl.ListarControlesEditables(IdEntidad)

            Return LstControles
        Catch ex As Exception

        Finally
            If blControl IsNot Nothing Then blControl.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String,
                                 ByVal vcTipOrdCol As String, ByVal vcCam As String, ByVal vcValBus As String,
                                 ByVal vcTab As String, ByVal inTipOri As String, ByVal inFilReg As String, ByVal inTipLin As String) As JQGridJsonResponse
        Dim Campo As BL_ENT_Campo = Nothing
        Dim CantidadSQLo As BL_MOV_Linea = Nothing
        Dim oModuloSQL As BL_LIC_UsuariosModulos = Nothing
        Try
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
            Dim NomId As String = HttpContext.Current.Session("NomId" & "_" & vcTab).ToString()
            'Dim inOrdId As Integer  
            'For Each oCampo As ENT_ENT_Campo In lstCampo
            '    If oCampo.btIdPri Then
            '        inOrdId = oCampo.inOrd
            '    End If
            'Next
            HttpContext.Current.Session("vcFiltro_" & vcTab) = vcCam & "," & vcValBus & "|" & inFilReg


            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/Temporal/"), "/")

            If flagBorrarString = False Then
                For index = 0 To lstCampo.Count - 1 Step 1
                    If lstCampo.Item(index).inTipDat = 7 Then

                        lstCampo.Item(index).vcNom = lstCampo.Item(index).vcNom.Substring(0, lstCampo.Item(index).vcNom.Length - 3)
                        lstCampo.Item(index).vcNomAlias = lstCampo.Item(index).vcNomAlias.Substring(0, lstCampo.Item(index).vcNomAlias.Length - 3)
                    End If

                Next
                flagBorrarString = True
            End If

            Dim nombreTabla As String = ""
            If lstCampo.Count = 1 Then
                nombreTabla = lstCampo.Item(0).vcTab
            Else
                nombreTabla = lstCampo.Item(1).vcTab
            End If


            'Filtros
            Dim strFiltros As String = FiltrosPorTablas(vcTab, inTipLin)
            Dim dsDetalle As DataSet = New DataSet()

            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then

                If ConfigurationManager.AppSettings("UNLICENSED") IsNot Nothing Then
                    dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                   vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin), oUsuario.P_inCod)

                    Campo.Dispose()

                    For index = 0 To dsDetalle.Tables(1).Columns.Count - 1 Step 1
                        If dsDetalle.Tables(1).Columns(index).DataType.Name.ToString().Equals("Byte[]") Then
                            dsDetalle.Tables(1).Columns.Add(dsDetalle.Tables(1).Columns(index).ColumnName + "Str", Type.GetType("System.String"))
                            Dim contadorFilas As Integer = 0
                            For Each fila As DataRow In dsDetalle.Tables(1).Rows
                                If Not IsDBNull(fila.Item(index)) Then
                                    Dim rutaLocal As String = ruta
                                    Dim rutaextra As String = fila.Item(index).Length 'agregado 20-09-2013 wapumayta
                                    rutaLocal = rutaLocal + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico" 'agregado 20-09-2013 wapumayta
                                    'rutaLocal = rutaLocal + nombreTabla + "_" + fila.Item(1).ToString() + ".ico"
                                    Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                                    fs.Write(fila.Item(index), 0, fila.Item(index).Length)
                                    fs.Flush()
                                    fs.Close()

                                    'dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal/" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>"
                                    dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal" + CarpetaDominio + "/" + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>" 'agregado 20-09-2013 wapumayta
                                End If
                                contadorFilas += 1
                            Next
                            dsDetalle.Tables(1).Columns.RemoveAt(index)
                        Else

                        End If
                    Next

                    Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                            Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 0)
                End If

                ' LICENCIAMIENTO

                'If (vcTab = "MOV_Linea") Or (vcTab = "MOV_Dispositivo") Then
                CantidadSQLo = New BL_MOV_Linea(oUsuario.IdCliente)
                oModuloSQL = New BL_LIC_UsuariosModulos(oUsuario.IdCliente)
                'Dim keySQL As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(1)
                Dim keyConfig As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtenerKeyServidor()
                ''Dim keyConfig As String = Cryptographics.EncryptString(oModuloSQL.ObtenerKeyServidor().Rows(0)(0).ToString())
                'Dim TipoExt As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(3)
                'Dim CantidadLineas As Integer = Convert.ToInt32(Base64Decode(CantidadSQLo.ListarCantidadLineas().Rows(0)(0)))
                'Dim CantidadDispositivos As Integer = Convert.ToInt32(Base64Decode(CantidadSQLo.ListarCantidadDispositivos().Rows(0)(0)))
                'Dim Cantidad As Integer = Convert.ToInt32(Cryptographics.DecryptString(IIf(UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(2) = "", 0, UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(2))))
                'Dim CantidadAccess As Integer = 0
                'Dim ComparadorCantidad As Integer = 0
                'Dim KeyPC As String = oModuloSQL.Mensajes_Login().Rows(0)(3).ToString()
                'Dim Licencia As String = Cryptographics.DecryptString(oModuloSQL.Mensajes_Login().Rows(0)(4).ToString())
                'Dim Texto As String = ""
                'Dim valorIp As String
                'valorIp = Dns.GetHostEntry(My.Computer.Name).AddressList.FirstOrDefault(Function(i) i.AddressFamily = Sockets.AddressFamily.InterNetwork).ToString()
                'dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                '                                                        vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin))

                Dim Texto As String = ""
                Dim dtLicenciamiento As DataTable = oModuloSQL.Mensajes_Login()
                Dim KeyPC As String = dtLicenciamiento.Rows(0)(3).ToString()

                If keyConfig = keyConfig Then
                    'If KeyPC <> Cryptographics.EncryptString(Dns.GetHostName() & Replace(valorIp, ".", "")) Then
                    'If KeyPC <> keyConfig Then
                    '    Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                    '                    Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 7)
                    'End If

                    If (vcTab = "MOV_Linea") Or (vcTab = "MOV_Dispositivo") Then

                        Dim CantidadAccess As Integer = 0
                        Dim ComparadorCantidad As Integer = 0
                        Dim TipoExt As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(3)
                        Dim Cantidad As Integer = Convert.ToInt32(Cryptographics.DecryptString(IIf(UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(2) = "", 0, UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(2))))

                        If Cantidad = 0 Then
                            Texto = ""
                        Else

                            Dim dtComparador As DataTable = CantidadSQLo.CompararCantidad(Cryptographics.EncryptString(Cantidad), TipoExt)
                            CantidadAccess = Convert.ToInt32(Cryptographics.DecryptString(dtComparador.Rows(0)(0)))


                            If TipoExt = "61dTbSDAcHMA" Then    'LINEA
                                dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                                            vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin), oUsuario.P_inCod)

                                Dim dtLicenciaLineas As DataTable = CantidadSQLo.ListarCantidadLineas()
                                Dim CantidadLineas As Integer = Convert.ToInt32(Base64Decode(dtLicenciaLineas.Rows(0)(0)))
                                ComparadorCantidad = CantidadLineas

                            ElseIf TipoExt = "aOclIJvM+HIA" Then    'DISPOSTIVO
                                dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                                            vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin), oUsuario.P_inCod)

                                Dim dtLicenciaDispositivo As DataTable = CantidadSQLo.ListarCantidadDispositivos()
                                Dim CantidadDispositivos As Integer = Convert.ToInt32(Base64Decode(dtLicenciaDispositivo.Rows(0)(0)))
                                ComparadorCantidad = CantidadDispositivos

                            End If
                        End If

                        If (ComparadorCantidad > CantidadAccess) Then
                            If TipoExt = "61dTbSDAcHMA" Then
                                Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                            Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 5)
                            ElseIf TipoExt = "aOclIJvM+HIA" Then
                                Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                            Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 6)
                            End If
                        Else

                            If (dsDetalle.Tables.Count <= 0) Then
                                dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                                               vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin), oUsuario.P_inCod)
                            End If
                            'LISTADO
                            Campo.Dispose()

                            'FIN

                            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                            Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 0)
                        End If

                    Else

                        dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                         vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin), oUsuario.P_inCod)

                        Campo.Dispose()

                        If vcTab = "M_NIVE" Then
                            For index = 0 To dsDetalle.Tables(1).Columns.Count - 1 Step 1
                                If dsDetalle.Tables(1).Columns(index).DataType.Name.ToString().Equals("Byte[]") Then
                                    dsDetalle.Tables(1).Columns.Add(dsDetalle.Tables(1).Columns(index).ColumnName + "Str", Type.GetType("System.String"))
                                    Dim contadorFilas As Integer = 0
                                    For Each fila As DataRow In dsDetalle.Tables(1).Rows
                                        If Not IsDBNull(fila.Item(index)) Then
                                            Dim rutaLocal As String = ruta
                                            Dim rutaextra As String = fila.Item(index).Length 'agregado 20-09-2013 wapumayta
                                            rutaLocal = rutaLocal + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico" 'agregado 20-09-2013 wapumayta
                                            'rutaLocal = rutaLocal + nombreTabla + "_" + fila.Item(1).ToString() + ".ico"
                                            Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                                            fs.Write(fila.Item(index), 0, fila.Item(index).Length)
                                            fs.Flush()
                                            fs.Close()

                                            'dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal/" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>"
                                            dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal" + CarpetaDominio + "/" + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>" 'agregado 20-09-2013 wapumayta
                                        End If
                                        contadorFilas += 1
                                    Next
                                    dsDetalle.Tables(1).Columns.RemoveAt(index)
                                Else

                                End If
                            Next
                        End If

                        Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                                     Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 0)

                    End If

                Else
                    Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                        Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 8)
                End If
                'Else
                '    dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                '                                                       vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin))

                '    Campo.Dispose()

                '    For index = 0 To dsDetalle.Tables(1).Columns.Count - 1 Step 1
                '        If dsDetalle.Tables(1).Columns(index).DataType.Name.ToString().Equals("Byte[]") Then
                '            dsDetalle.Tables(1).Columns.Add(dsDetalle.Tables(1).Columns(index).ColumnName + "Str", Type.GetType("System.String"))
                '            Dim contadorFilas As Integer = 0
                '            For Each fila As DataRow In dsDetalle.Tables(1).Rows
                '                If Not IsDBNull(fila.Item(index)) Then
                '                    Dim rutaLocal As String = ruta
                '                    Dim rutaextra As String = fila.Item(index).Length 'agregado 20-09-2013 wapumayta
                '                    rutaLocal = rutaLocal + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico" 'agregado 20-09-2013 wapumayta
                '                    'rutaLocal = rutaLocal + nombreTabla + "_" + fila.Item(1).ToString() + ".ico"
                '                    Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                '                    fs.Write(fila.Item(index), 0, fila.Item(index).Length)
                '                    fs.Flush()
                '                    fs.Close()

                '                    'dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal/" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>"
                '                    dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal" + CarpetaDominio + "/" + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>" 'agregado 20-09-2013 wapumayta
                '                End If
                '                contadorFilas += 1
                '            Next
                '            dsDetalle.Tables(1).Columns.RemoveAt(index)
                '        Else

                '        End If
                '    Next

                '    Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                '                            Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 0)

                'End If

            Else
                dsDetalle = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                                         vcValBus, Integer.Parse(inFilReg), strFiltros, 1, Integer.Parse(inTipLin), oUsuario.P_inCod)

                Campo.Dispose()
                If vcTab = "M_NIVE" Then

                    For index = 0 To dsDetalle.Tables(1).Columns.Count - 1 Step 1
                        If dsDetalle.Tables(1).Columns(index).DataType.Name.ToString().Equals("Byte[]") Then
                            dsDetalle.Tables(1).Columns.Add(dsDetalle.Tables(1).Columns(index).ColumnName + "Str", Type.GetType("System.String"))
                            Dim contadorFilas As Integer = 0
                            For Each fila As DataRow In dsDetalle.Tables(1).Rows
                                If Not IsDBNull(fila.Item(index)) Then
                                    Dim rutaLocal As String = ruta
                                    Dim rutaextra As String = fila.Item(index).Length 'agregado 20-09-2013 wapumayta
                                    rutaLocal = rutaLocal + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico" 'agregado 20-09-2013 wapumayta
                                    'rutaLocal = rutaLocal + nombreTabla + "_" + fila.Item(1).ToString() + ".ico"
                                    Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                                    fs.Write(fila.Item(index), 0, fila.Item(index).Length)
                                    fs.Flush()
                                    fs.Close()

                                    'dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal/" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>"
                                    dsDetalle.Tables(1).Rows(contadorFilas).Item(dsDetalle.Tables(1).Columns.Count - 1) = "<img src='../../Images/Temporal" + CarpetaDominio + "/" + rutaextra + "_" + nombreTabla + "_" + fila.Item(1).ToString() + ".ico' height='35' width='35'/>" 'agregado 20-09-2013 wapumayta
                                End If
                                contadorFilas += 1
                            Next
                            dsDetalle.Tables(1).Columns.RemoveAt(index)
                        Else

                        End If
                    Next
                End If
                Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                             Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1, 0)

            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
            If CantidadSQLo IsNot Nothing Then Campo.Dispose()
            If oModuloSQL IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    Public Shared Function Base64Decode(base64EncodedData As String) As String
        Dim LongitudCodigo As Int16 = Convert.ToInt16(base64EncodedData.Substring(10, 1))
        Dim base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData.Substring(11, LongitudCodigo))
        Return System.Text.Encoding.UTF8.GetString(base64EncodedBytes)
    End Function

    Private Function obtenerRuta() As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/Temporal/"), "/")

        If IsNothing(ruta) Or ruta.Equals(String.Empty) Then
            ruta = Server.MapPath("~/Images/Temporal" + CarpetaDominio + "\")
        End If
        Return ruta
    End Function

    <WebMethod()>
    Public Shared Function EliminarRegistro(ByVal Id As String, ByVal vcPar As String, ByVal vcTab As String, ByVal inTipOri As String, ByVal btTipLog As String) As String
        Dim ServicioTipo As BL_GEN_TipoServicio = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Dim Empleado As BL_GEN_EmpleadoG = Nothing
        Dim Bolsa As BL_SOA_Bolsa = Nothing
        Dim Campo As BL_ENT_Campo = Nothing
        Dim SEG_Usuario As BL_SEG_Usuario = Nothing
        Dim oUsuarioDatos As BL_SEG_Usuario = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), oUsuario.IdCliente)
            'Dim TipoSolicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            'Id = Id.Replace("&#39", "''")
            Id = Id.Replace(",", "").Replace(".", "")
            'If IsNumeric(Id) Then Id = CType(Val(Id), Long)

            Dim IdArray As List(Of String)

            Dim flagOK As Boolean
            Dim flagDep As Boolean
            Dim flagElim As Boolean
            Dim flagvalDef As Boolean
            Dim mensajeOK As String = ""
            Dim mensajeDep As String = ""
            Dim mensajeElim As String = ""
            Dim mensajevalDef As String = ""
            Dim mensaje As String = ""
            Dim elim As Boolean = True
            If vcTab = "PCS_TRF_ServicioTipo" Then
                ServicioTipo = New BL_GEN_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim ArrayIdServTip As List(Of String) = Id.Split("|").ToList()
                For Each idservtip As String In ArrayIdServTip
                    If CInt(idservtip) <= 18 Then
                        elim = False
                        Exit For
                    End If
                    'Dim oServicioTipo As ENT_GEN_TipoServicio = ServicioTipo.Mostrar(idservtip)
                    'If oServicioTipo.vcExpEn.ToLower() = "min" Then
                    '   elim = False
                    'End If
                Next
            End If

            'validacion meses contrato para lineas de tipo familia
            Dim MensajeValContrato As String = String.Empty
            If vcTab = "MOV_Linea" And oUsuario.EsAdministrador = False Then
                Dim dsNumeroCalContrato As New DataSet
                Dim vcNumNoProcesados As String = String.Empty
                Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                dsNumeroCalContrato = Linea.CalcularContratoLinea(Id)
                Dim arNumLIn As List(Of String) = Id.Split("|").ToList()
                Dim valContrato As String = "Tiempo de Contrato"
                If dsNumeroCalContrato.Tables(0).Rows.Count > 0 Then
                    For Each dr As DataRow In dsNumeroCalContrato.Tables(0).Rows
                        arNumLIn.Remove(dr("Numero"))
                        'Id.Replace(dr("Numero").ToString() + "-", "")
                        'Id.Replace("-" + dr("Numero").ToString(), "")
                        If vcNumNoProcesados = String.Empty Then
                            vcNumNoProcesados = dr("Numero").ToString()
                        Else
                            vcNumNoProcesados = vcNumNoProcesados + "," + dr("Numero").ToString()
                        End If
                    Next
                    MensajeValContrato = "Estos registros (<b><span style='color: red;'>" + vcNumNoProcesados + "</span></b>) no fueron procesados por que no han cumplido con el: (<b>" + valContrato + "</b>). "
                    Id = String.Join("|", arNumLIn)
                End If
            End If

            Dim MensajeValEmpleado As String = String.Empty, TextSolicitudes As String = String.Empty, TextDespachos As String = String.Empty
            Dim vcCodEmpleado_SolPen As String = String.Empty, vcCodEmpleado_DisDes As String = String.Empty
            Dim vcCodEmpleado_M_Codi As String = String.Empty, TextTableCodigo As String = String.Empty
            Dim vcCodEmpleado_IncPen As String = String.Empty, MensajeEmpleado_IncPen As String = String.Empty
            If vcTab = "M_EMPL" Then
                Dim dsValidarEliminacion_Empleado As New DataSet
                Empleado = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                dsValidarEliminacion_Empleado = Empleado.ValidarEliminacionEmpleado(Id.ToString(), 1)
                Dim arCodEmpleado_Solicitudes As List(Of String) = Id.Split("|").ToList()
                If dsValidarEliminacion_Empleado.Tables(0).Rows.Count > 0 Then
                    For Each dr As DataRow In dsValidarEliminacion_Empleado.Tables(0).Rows
                        'Validacion para los Empleados que no se pueden Eliminar por tener solicitudes en Proceso.
                        If dr("Resultado").ToString() = "1" Then
                            If vcCodEmpleado_SolPen = String.Empty Then
                                vcCodEmpleado_SolPen = dr("CodEmpleado").ToString()
                            Else
                                vcCodEmpleado_SolPen = vcCodEmpleado_SolPen + "," + dr("CodEmpleado").ToString()
                            End If
                            arCodEmpleado_Solicitudes.Remove(dr("CodEmpleado").ToString())
                            TextSolicitudes = "Estos registros (<b><span style='color: red;'>" + vcCodEmpleado_SolPen + "</span></b>) no fueron procesados por que tienen solicitudes en proceso"
                        End If
                        'Validacion para los Empleados que no se pueden Eliminar por tener Dispositivos por Despachar.
                        If dr("Resultado").ToString() = "2" Then
                            If Not vcCodEmpleado_SolPen.Contains(dr("CodEmpleado").ToString()) Then
                                If vcCodEmpleado_DisDes = String.Empty Then
                                    vcCodEmpleado_DisDes = dr("CodEmpleado").ToString()
                                Else
                                    vcCodEmpleado_DisDes = vcCodEmpleado_DisDes + "," + dr("CodEmpleado").ToString()
                                End If
                                arCodEmpleado_Solicitudes.Remove(dr("CodEmpleado").ToString())
                                TextDespachos = "Estos registros (<b><span style='color: red;'>" + vcCodEmpleado_DisDes + "</span></b>) no fueron procesados por que tienen dispositivos por despachar."
                            End If
                        End If
                    Next
                    Id = String.Join("|", arCodEmpleado_Solicitudes)
                End If
                '-----------------------------------------------------------------
                dsValidarEliminacion_Empleado = Empleado.ValidarEliminacionEmpleado(Id, 2)
                Dim arCodEmpleado_M_CODI As List(Of String) = Id.Split("|").ToList()
                If dsValidarEliminacion_Empleado.Tables(0).Rows.Count > 0 Then
                    For Each dr As DataRow In dsValidarEliminacion_Empleado.Tables(0).Rows
                        If Not vcCodEmpleado_M_Codi.Contains(dr("CodEmpleado").ToString()) Then
                            If vcCodEmpleado_M_Codi = String.Empty Then
                                vcCodEmpleado_M_Codi = dr("CodEmpleado").ToString()
                            Else
                                vcCodEmpleado_M_Codi = vcCodEmpleado_M_Codi + "," + dr("CodEmpleado").ToString()
                            End If
                            arCodEmpleado_M_CODI.Remove(dr("CodEmpleado").ToString())
                            TextTableCodigo = "Estos registros (<b><span style='color: red;'>" + vcCodEmpleado_M_Codi + "</span></b>) no fueron procesados por que estan siendo usado por la Aplicación de telefonía fija (Existen códigos asociados al empleado)."
                        End If
                    Next
                End If
                Id = String.Join("|", arCodEmpleado_M_CODI)
                '-----------------------------------------------------------------

                Dim arCodEmpleado_Incidencias As List(Of String) = Id.Split("|").ToList()
                Bolsa = New BL_SOA_Bolsa(0)
                Dim dtValidacionEliminacion_Empleado_Incidencias As New DataTable()
                dtValidacionEliminacion_Empleado_Incidencias = Bolsa.ValidarEmpleadoIncPend(Id, 3)
                If dtValidacionEliminacion_Empleado_Incidencias.Rows.Count > 0 Then
                    For Each dr As DataRow In dtValidacionEliminacion_Empleado_Incidencias.Rows
                        If Not vcCodEmpleado_IncPen.Contains(dr("CodEmpleado").ToString()) AndAlso dr("Resultado").ToString() = "1" Then
                            If vcCodEmpleado_IncPen = String.Empty Then
                                vcCodEmpleado_IncPen = dr("CodEmpleado").ToString()
                            Else
                                vcCodEmpleado_IncPen = vcCodEmpleado_IncPen + "," + dr("CodEmpleado").ToString()
                            End If
                            arCodEmpleado_Incidencias.Remove(dr("CodEmpleado").ToString())
                        End If
                    Next
                    If vcCodEmpleado_IncPen <> String.Empty Then
                        MensajeEmpleado_IncPen = "Estos registros (<b><span style='color: red;'>" + vcCodEmpleado_IncPen + "</span></b>) no fueron procesados por que tienen incidencias en proceso."
                    End If
                End If
                Id = String.Join("|", arCodEmpleado_Incidencias)
            End If

            If TextTableCodigo <> String.Empty Then
                MensajeValEmpleado = MensajeValEmpleado + "<li>" + TextTableCodigo.Replace(",", ", ") + "</li><br />"
            End If
            If TextSolicitudes <> String.Empty Then
                MensajeValEmpleado = MensajeValEmpleado + "<li>" + TextSolicitudes.Replace(",", ", ") + "</li><br />"
            End If
            If TextDespachos <> String.Empty Then
                MensajeValEmpleado = MensajeValEmpleado + "<li>" + TextDespachos.Replace(",", ", ") + "</li>"
            End If
            If MensajeEmpleado_IncPen <> String.Empty Then
                MensajeValEmpleado = MensajeValEmpleado + "<li>" + MensajeEmpleado_IncPen.Replace(",", ", ") + "</li>"
            End If

            If elim = False Then
                'mensaje = "No se puede eliminar los Tipo Servicios que esten expresados en 'min'."
                mensaje = "No se puede eliminar, es registro de sistema"
                Return mensaje
            Else
                If Id <> "" Then
                    IdArray = Campo.EliminarRegistroTabla(vcTab, Id, vcPar)
                    Campo.Dispose()

                    Dim oAuditoria As New ProcesaAuditoria
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                    oAuditoria.Modulo = "Lista Maestra"
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    oAuditoria.Tabla = If(vcTab = "MOV_CAM_CampanaDespachoOperador", "MOV_CAM_CampanaDespachoOperadorDetalle", vcTab)
                    oAuditoria.Origen = CInt(HttpContext.Current.Session("Origen").ToString())
                    'oAuditoria.EliminarAuditoria(New String() {Id})
                    If vcTab = "MOV_TipoSolicitud" Then TipoSolicitud.ActualizarUsuario()

                    Dim blEliminado As Boolean

                    For Each Codigo As String In IdArray
                        blEliminado = False
                        Dim ParMensaje As String() = Codigo.Split("/"c)
                        If ParMensaje(2) = "O" Then
                            blEliminado = True
                            If ParMensaje(0) <> "0" Then
                                flagOK = False
                                mensajeOK += "Se desactivaron (" + ParMensaje(0) + ") Registro(s) <br />(C&oacute;digo(s): <b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) <br />"
                                If inTipOri <> "0" Then
                                    'AUDITORIA: Desactivacion de Registros
                                    oAuditoria.Opcion = "Desactivar Registros desde Lista Maestra"
                                    Dim Id_Desactivado As String() = ParMensaje(1).Split(";")
                                    For Each id_D As String In Id_Desactivado
                                        Dim strAntes As String = ""
                                        strAntes = oAuditoria.AntesActualizar(New String() {id_D.Trim()}, True, Integer.Parse(inTipOri))

                                        Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                                        oAuditoria.Opcion, "Eliminar", "USUARIO: " & oUsuario.vcUsu & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla + ". Valor anterior: " & strAntes)

                                        ''oAuditoria.EliminarAuditoria(id_D.Trim(), strAntes, False, Integer.Parse(inTipOri))
                                    Next
                                End If
                            Else
                                flagOK = True
                                mensajeOK += "Se desactivaron (" + ParMensaje(0) + ") Registro <br />"
                            End If
                        End If
                        If ParMensaje(2) = "E" Then
                            blEliminado = True
                            If ParMensaje(0) <> "0" Then
                                flagElim = False
                                mensajeElim += "Se eliminaron " + ParMensaje(0) + " Registro(s) <br /> (C&oacute;digo(s): <b><span style='color: red;'>" + ParMensaje(1) + "</span></b>)"
                                If inTipOri <> "0" Then
                                    'AUDITORIA: Eliminacion de Registros
                                    oAuditoria.Opcion = "Eliminar Registros desde Lista Maestra"
                                    Dim Id_Desactivado As String() = ParMensaje(1).Split(";")
                                    For Each id_D As String In Id_Desactivado
                                        Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                                        oAuditoria.Opcion, "Eliminar", "USUARIO: " & oUsuario.vcUsu & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)
                                        ''oAuditoria.EliminarAuditoria(id_D.Trim(), True, Integer.Parse(inTipOri))
                                    Next
                                End If
                            Else
                                flagElim = True
                                mensajeElim += "Se eliminaron " + ParMensaje(0) + " Registro"
                            End If
                        End If
                        If ParMensaje(2) = "D" Then
                            If ParMensaje(1) = "" Then
                                flagDep = True
                            Else
                                flagDep = False
                                mensajeDep += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje(0) + "</span></b>) no fueron procesados porque tiene(n) dependencia(s) con: (<b>" + ParMensaje(1) + "</b>) "
                            End If
                            'End If
                        End If

                        If ParMensaje(2) = "V" Then
                            If ParMensaje(0) = "0" Then
                                flagvalDef = True
                            Else
                                flagvalDef = False
                                mensajevalDef += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) no pueden ser modificados por ser Valores del Sistema."
                            End If
                        End If

                        If vcTab.ToString.Trim.ToUpper() = "M_EMPL" And blEliminado = True And "" & ParMensaje(1) <> "" Then
                            SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                            Dim CodEliBase As String = ParMensaje(1).ToString()
                            Dim CodEliBaseArray As List(Of String) = CodEliBase.Split(";"c).ToList()
                            For Each id_p As String In CodEliBaseArray
                                SEG_Usuario.BajaUsuarioPorEmpleado(id_p)
                            Next

                            SEG_Usuario.Dispose()

                            ''ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"

                            oUsuarioDatos = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1)
                            Dim CodEliDatos As String = ParMensaje(1).ToString()
                            Dim CodEliDatosArray As List(Of String) = CodEliDatos.Split(";"c).ToList()
                            For Each id_p As String In CodEliDatosArray
                                oUsuarioDatos.BajaUsuarioPorEmpleado_Datos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, id_p)
                            Next
                            oUsuarioDatos.Dispose()
                        End If

                        If vcTab.ToString.Trim.ToUpper() = "SEG_USUARIO" And blEliminado = True And "" & ParMensaje(1) <> "" And "" & ParMensaje(2) = "O" Then
                            'ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"
                            oUsuarioDatos = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1)
                            Dim CodEli As String = ParMensaje(1).ToString()
                            Dim CodEliArray As List(Of String) = CodEli.Split(";"c).ToList()
                            For Each id_p As String In CodEliArray
                                oUsuarioDatos.BajaUsuarioPorCodigo_Datos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, id_p, 0)
                            Next
                            oUsuarioDatos.Dispose()
                        End If
                        If vcTab.ToString.Trim.ToUpper() = "SEG_USUARIO" And blEliminado = True And "" & ParMensaje(1) <> "" And "" & ParMensaje(2) = "E" Then
                            oUsuarioDatos = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1)
                            Dim CodEli As String = ParMensaje(1).ToString()
                            Dim CodEliArray As List(Of String) = CodEli.Split(";"c).ToList()
                            For Each id_p As String In CodEliArray
                                oUsuarioDatos.BajaUsuarioPorCodigo_Datos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, id_p, 1)
                            Next
                            oUsuarioDatos.Dispose()
                        End If
                    Next

                    If flagOK = False AndAlso mensajeOK <> "" Then
                        mensaje += "<li>" + mensajeOK + "</li><br />"
                    End If
                    If flagElim = False AndAlso mensajeElim <> "" Then
                        mensaje += "<li>" + mensajeElim + "</li><br />"
                    End If
                    If flagDep = False AndAlso mensajeDep <> "" Then
                        mensaje += "<li>" + mensajeDep + "</li><br />"
                    End If
                    If flagvalDef = False AndAlso mensajevalDef <> "" Then
                        mensaje += "<li>" + mensajevalDef + "</li><br />"
                    End If
                End If

                'agregado 16/07/2014 wapumayta (validacion tiempo de contrato para lineas)
                If MensajeValContrato <> String.Empty Then
                    mensaje += "<li>" + MensajeValContrato.Replace(",", ", ") + "</li><br />"
                End If

                'RRAMOS 20150427
                If MensajeValEmpleado <> String.Empty Then
                    mensaje += MensajeValEmpleado
                End If


                If vcTab.ToString.Trim.ToUpper() = "SEG_USUARIO" Then
                    ''Dim oUsuarioBase As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente) 'CONEXION A BASE
                    ''Dim oUsuarioDatos As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1) 'CONEXION A DATOS
                    ''oUsuarioBase.GrabarUsuariosBDDatos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, oUsuarioDatos.ObtenerNombreBDDatos())
                    ''oUsuarioDatos.Dispose()
                    ''oUsuarioBase.Dispose()
                End If

                Return "<ul>" + mensaje + "</ul>"
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ServicioTipo IsNot Nothing Then ServicioTipo.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
            If Empleado IsNot Nothing Then Empleado.Dispose()
            If Bolsa IsNot Nothing Then Bolsa.Dispose()
            If Campo IsNot Nothing Then Campo.Dispose()
            If SEG_Usuario IsNot Nothing Then SEG_Usuario.Dispose()
            If oUsuarioDatos IsNot Nothing Then oUsuarioDatos.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActivarRegistros(ByVal Ids As String, ByVal vcPar As String, ByVal vcTab As String, ByVal inTipOri As String, ByVal activar As String) As String
        Dim Campo As BL_ENT_Campo = Nothing
        Dim oUsuarioDatos As BL_SEG_Usuario = Nothing
        Try
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdArray As List(Of String)

            Dim flagOK As Boolean
            Dim flagError As Boolean
            Dim flagvalDef As Boolean
            Dim flagValDep As Boolean
            Dim mensajeOK As String = ""
            Dim mensajeError As String = ""
            Dim mensajevalDef As String = ""
            Dim mensajeValDep As String = ""
            Dim mensaje As String = ""
            Ids = Ids.Replace("&#39", "''")

            Ids = Ids.Replace(",", "").Replace(".", "")
            If IsNumeric(Ids) Then
                If Ids.Trim.Length > 0 Then
                    If Ids.Trim.Substring(0, 1) <> "0" Then
                        Ids = Int(Val(Ids))
                    End If
                End If
            End If

            IdArray = Campo.ActivarRegistroTabla(vcTab, Ids, vcPar, Convert.ToBoolean(activar))
            Campo.Dispose()

            For Each Codigo As String In IdArray
                Dim ParMensaje As String() = Codigo.Split("/"c)
                If ParMensaje(2) = "O" Then
                    If ParMensaje(0) <> "0" Then
                        flagOK = False
                        mensajeOK += "Se activaron (" + ParMensaje(0) + ") Registro(s) <br />(<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) <br />"
                    Else
                        flagOK = True
                        mensajeOK += "Se activaron (" + ParMensaje(0) + ") Registro <br />"
                    End If
                End If
                If ParMensaje(2) = "E" Then
                    If ParMensaje(0) <> "0" Then
                        flagError = False
                        mensajeError += "Estos registros (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) no fueron procesados"
                    Else
                        flagError = True
                        mensajeError += "Este registro (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>)  no fueron procesados"
                    End If
                End If
                If ParMensaje(2) = "V" Then
                    If ParMensaje(0) = "0" Then
                        flagvalDef = True
                    Else
                        flagvalDef = False
                        mensajevalDef += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) no pueden ser modificados por ser Valores del Sistema."
                    End If
                End If
                If ParMensaje(2) = "D" Then
                    If ParMensaje(0) = "" Then
                        flagValDep = False
                    Else
                        flagValDep = True
                        mensajeValDep += "Esto(s) registro(s) (<b><span style='color:red;'>" + ParMensaje(0) + "</span></b>) no fueron procesados por tener dependencia deshabilitada en (<b>" + ParMensaje(1) + "</b>)."
                    End If
                End If


                If vcTab.ToString.Trim.ToUpper() = "SEG_USUARIO" And "" & ParMensaje(1) <> "" Then
                    ''ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"
                    oUsuarioDatos = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1)
                    Dim CodEli As String = ParMensaje(1).ToString()
                    Dim CodEliArray As List(Of String) = CodEli.Split(";"c).ToList()
                    For Each id_p As String In CodEliArray
                        oUsuarioDatos.BajaUsuarioPorCodigo_Datos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, id_p, 2)
                    Next
                    oUsuarioDatos.Dispose()
                End If
            Next

            If flagOK = False Then
                mensaje += "<li>" + mensajeOK + "</li><br />"
            End If
            If flagError = False Then
                mensaje += "<li>" + mensajeError + "</li><br />"
            End If
            If flagvalDef = False Then
                mensaje += "<li>" + mensajevalDef + "</li><br />"
            End If
            If flagValDep = True Then
                mensaje += "<li>" + mensajeValDep + "</li><br />"
            End If




            If vcTab.ToString().Trim().ToUpper() = "SEG_USUARIO" Then
                ''Dim oUsuarioBase As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente) 'CONEXION A BASE
                ''Dim oUsuarioDatos As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1) 'CONEXION A DATOS
                ''oUsuarioBase.GrabarUsuariosBDDatos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, oUsuarioDatos.ObtenerNombreBDDatos())
                ''oUsuarioDatos.Dispose()
                ''oUsuarioBase.Dispose()
            End If

            Return "<ul>" + mensaje + "</ul>"

            'Dim _return As String
            'If ds.Tables(0).Rows.Count > 0 Then
            '    _return = 1
            'Else
            'End If

            'Return ds.Tables(0).Rows(0)(0).ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
            If oUsuarioDatos IsNot Nothing Then oUsuarioDatos.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function LiberarLineasMasivo(ByVal Ids As String, ByVal vcPar As String, ByVal vcTab As String, ByVal inTipOri As String, ByVal vcLiberarEmpleado As String, ByVal vcLiberarDispositivo As String) As String
        Dim Campo As BL_ENT_Campo = Nothing
        Try
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdArray As List(Of String)
            Dim mensajeOK As String = ""
            Dim mensajeError As String = ""
            Dim mensajevalDef As String = ""
            Dim mensajeValDep As String = ""
            Dim mensaje As String = ""

            IdArray = Ids.Split("-").ToList()
            mensaje = Campo.LiberarLineas(vcTab, Ids, vcPar, Convert.ToBoolean(vcLiberarEmpleado), Convert.ToBoolean(vcLiberarDispositivo)).ToString()

            Return mensaje
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function LiberarDispositivosMasivo(ByVal Ids As String, ByVal inTipOri As Integer, ByVal vcLiberarEmpleado As Boolean, ByVal vcLiberarLinea As Boolean) As String
        Dim Campo As BL_ENT_Campo = Nothing
        Dim oUsuario As ENT_SEG_Usuario
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim mensaje As String = ""

            mensaje = Campo.LiberarDispositivos(Ids, vcLiberarEmpleado, vcLiberarLinea).ToString()

            Return mensaje
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Campo) Then Campo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Sub GuardarCaracteristicas(ByVal DimensionesCol As String, ByVal OrdenCol As String, ByVal NombreCol As String, ByVal TamanoPagina As String, ByVal vcTab As String, ByVal inTipOri As String)
        Dim Campo As BL_ENT_Campo = Nothing
        Dim Entidad As BL_ENT_Entidad = Nothing
        Try
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Entidad = New BL_ENT_Entidad(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))

            Campo.GuardarPropiedades(lstCampo, vcTab, NombreCol, DimensionesCol, OrdenCol, oUsuario)
            Campo.Dispose()

            Entidad.GuardarPropiedades(vcTab, Integer.Parse(TamanoPagina), oUsuario)
            Entidad.Dispose()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
            If Entidad IsNot Nothing Then Entidad.Dispose()
        End Try
    End Sub

    Private Sub ConfigurarGrid(ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal oEntidad As ENT_ENT_Entidad)
        Dim script As String
        Dim IdPrim As String = ""
        Dim Columna As String = "var columnas=["

        hdfActivo.Value = "Activo"
        hdfDesactivo.Value = "Baja"

        hdfVer.Value = "SI"
        hdfFal.Value = "NO"

        hdfCampBool.Value = ""

        For Each oCampo As ENT_ENT_Campo In lstCampo
            If oCampo.btIdPri Then
                If IdPrim <> "" Then
                    IdPrim &= ","
                End If
                IdPrim &= oCampo.vcNomAlias
            End If

            Columna = Columna & "{ name: '" & oCampo.vcNomAlias & "', index: '" & oCampo.vcNomAlias & "', width: " & oCampo.inLar.ToString & ", label: '" & oCampo.vcDes.Replace("'", "\'") & "'"

            If oCampo.btOrd And oEntidad.btOrd Then
                Columna = Columna & ", sortable: true"
                If oCampo.inTipDat = 2 Or oCampo.inTipDat = 3 Then 'Fecha / Fecha y Hora
                    Columna = Columna & ", sorttype: 'date'"
                ElseIf oCampo.inTipDat = 5 Then 'Número
                    Columna = Columna & ", sorttype: function (cellValue) { return cellValue === null ? -1000 : Number(cellValue);}"
                End If
            Else
                Columna = Columna & ", sortable: false"
            End If

            If oCampo.btVis And oCampo.btVig Then
                Columna = Columna & ", hidden: false"
            Else
                Columna = Columna & ", hidden: true"
            End If

            If oCampo.btEliLog Then
                'hdfElim.Value = oCampo.vcNom ' comentado 01-02-2014 wapumayta
                hdfElim.Value = oCampo.vcNomAlias
                Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfActivo.Value & "'; else return '" & hdfDesactivo.Value & "'; }"
                'If oCampo.vcNomAlias = "btVigEmp" And oEntidad.vcTab = "MOV_Linea" Then
                '    Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfActivo.Value & "'; else return '" & hdfDesactivo.Value & "'; }"
                'End If
                'formatter:'checkbox'"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" & oCampo.vcNom & "': 'Eliminado' });}", True)

            ElseIf oCampo.inTipDat = 6 Then
                If hdfCampBool.Value <> "" Then
                    hdfCampBool.Value &= ","
                End If


                hdfCampBool.Value &= oCampo.vcNom
                hdfVerdadero.Value = oCampo.vcValVer
                hdfFalso.Value = oCampo.vcValFal
                'Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfVerdadero.Value & "'; else return '" & hdfFalso.Value & "'; }" 'formatter:'checkbox'"
                Columna = Columna & ", formatter : function(value, options, rData){ if(value == 'True') return '" & hdfVerdadero.Value & "'; else return '" & hdfFalso.Value & "'; }" 'formatter:'checkbox'"
                If oCampo.vcNomAlias = "btVigEmp" And oEntidad.vcTab = "MOV_Linea" Then
                    Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfActivo.Value & "'; if(value == 'False') return '" & hdfDesactivo.Value & "' ; else return '" & "" & "'; }"
                End If
                If oCampo.vcNomAlias = "btVigEmp" And oEntidad.vcTab = "MOV_Dispositivo" Then
                    Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfActivo.Value & "'; if(value == 'False') return '" & hdfDesactivo.Value & "' ; else return '" & "" & "'; }"
                End If
                If oCampo.vcNomAlias = "btSopLin" And oEntidad.vcTab = "MOV_Dispositivo" Then
                    Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfVer.Value & "'; if(value == 'False') return '" & hdfFal.Value & "' ; else return '" & "" & "'; }"
                End If

                'formatter:'checkbox'"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" & oCampo.vcNom & "': 'Eliminado' });}", True)
                If oCampo.ChAlign = "3" Or oCampo.inTipDat = "2" Then
                    Columna = Columna & ", align: 'Right'"
                ElseIf oCampo.inTipDat = "6" Then
                    Columna = Columna & ", align: 'Center'"
                Else
                    Columna = Columna & ", align: 'Left'"
                End If


            Else
                'Columna = Columna & ", align: 'Left'"
                If oCampo.ChAlign = "3" Then
                    Columna = Columna & ", align: 'Right'"
                ElseIf oCampo.inTipDat = "2" Then
                    Columna = Columna & ", align: 'Right'"
                Else
                    Columna = Columna & ", align: 'Left'"
                End If
            End If
            'nuevo alinear columna moneda
            If oCampo.inTipDat = 4 Or oCampo.inTipDat = 5 Then
                Columna = Columna & ", align: 'Right'"
            ElseIf oCampo.inTipDat = 3 Then
                Columna = Columna & ", align: 'Right'"
                'formatter:'currency', formatoptions:{decimalSeparator:",", thousandsSeparator: ",", decimalPlaces: 2, prefix: "$ "}
                'formatter:'date', formatoptions: {newformat: 'm/d/Y'}
                'datefmt: 'M d h:i'
                'Columna = Columna & ", formatter:'date'" ',datefmt: 'M d h:i'"
            End If
            Columna = Columna & " },"
        Next

        Session("NomId" & "_" & oEntidad.vcTab) = IdPrim

        Columna = Columna.Substring(0, Columna.Length - 1) & "]; "

        Dim TamanoPaginaArray As String() = oEntidad.vcTamPag.Split(",")

        If Not TamanoPaginaArray.Contains(oEntidad.inTamPag.ToString()) Then
            oEntidad.inTamPag = Integer.Parse(TamanoPaginaArray(0))
        End If
        script = "var idTabla = '" & IdPrim & "'; " & Columna & "var titulo = '" & oEntidad.vcDes & "';" & "var TamanoPagina = '" & oEntidad.inTamPag.ToString() & "';" & "var TamanosPaginaSel = [" & oEntidad.vcTamPag & "];"

        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    End Sub

    Private Sub ConfigurarAcciones(ByVal oUsuario As ENT_SEG_Usuario, ByVal inCod As Integer, ByVal oEntidad As ENT_ENT_Entidad, ByVal inTip As Integer)
        Dim ProductoSeguridad As BL_PRO_Producto = Nothing
        Dim ModuloSeguridad As BL_PRO_Modulo = Nothing
        Dim OpcionSeguridad As BL_PRO_Opcion = Nothing
        Dim ItemSeguridad As BL_PRO_Item = Nothing
        Try
            ''Modificado por Mauricio benavides 11/07/2013
            If inCod = -1000 Then 'todos los permisos para mantenimiento dinámicos de fija
                btnAgregar.Visible = True
                btnEditar.Visible = True
                btnEditarSimple.Visible = False
                btnVerDetalle.Visible = True
                btnEliminar.Visible = True
                btnActivar.Visible = True

                ExcelImport.Visible = True
                eeListado.Visible = True

                btnConfigurarFiltroRegistro.Visible = True
                tblAcciones.Visible = True
                tblEstado.Visible = True

                hdfEdicion.Value = "1"
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
                        oModuloSeguridad = ModuloSeguridad.Mostrar(inCod)
                        ModuloSeguridad.Dispose()
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
                If oEntidad.vcTab.ToString().ToUpper() = "M_ORGA" Or oEntidad.vcTab.ToString().ToUpper() = "MOV_LINEA" Or oEntidad.vcTab.ToString().ToUpper() = "MOV_CUENTA" Or oEntidad.vcTab.ToString().ToUpper() = "MOV_PLAN" Then
                    btnDownload.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar And oEntidad.btNue
                    btnUpload.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar And oEntidad.btNue
                Else
                    btnDownload.Visible = False
                    btnUpload.Visible = False
                End If

                If oEntidad.vcTab.ToString().ToUpper() = "MOV_LINEA" Then
                    btnLiberacionLinea.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar And oEntidad.btEdi
                Else
                    btnLiberacionLinea.Visible = False
                End If

                If oEntidad.vcTab.ToString().ToUpper() = "MOV_DISPOSITIVO" Then
                    btnLiberacionDispositivo.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar And oEntidad.btEdi
                Else
                    btnLiberacionDispositivo.Visible = False
                End If

                btnEditar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar And oEntidad.btEdi
                btnEditarSimple.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizarSimple And oEntidad.btEdiSim
                btnEliminar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoEliminar And oEntidad.btEli
                btnVerDetalle.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.VerDetalle And oEntidad.btVer
                btnActivar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar And oEntidad.btAct 'modificado 09-08-2013

                ExcelImport.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoImportar And oEntidad.btImp
                eeListado.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar And oEntidad.btExp

                'btnDesactivar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar And oEntidad.btAct 'modificado 09-08-2013
                btnConfigurarFiltroRegistro.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar And oEntidad.btAct 'agregado 09-08-2013
                tblAcciones.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoAccion And (oEntidad.btNue Or oEntidad.btEdi Or oEntidad.btEdiSim Or oEntidad.btEli Or oEntidad.btVer)
                tblEstado.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoAccion And oEntidad.btAct 'agregado 09-08-2013

                If UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar And oEntidad.btEdi Then
                    hdfEdicion.Value = "1"
                Else
                    hdfEdicion.Value = "0"
                End If
            End If


            If UtilitarioWeb.ObtieneMO360() = "1" Then
                If oEntidad.vcTab = "M_CENT_COST" _
                   OrElse oEntidad.vcTab = "M_EMPL" _
                   OrElse oEntidad.vcTab = "M_ORGA" _
                   OrElse oEntidad.vcTab = "M_NIVE" _
                   OrElse oEntidad.vcTab = "M_CENT_COST" Then
                    hdfEdicion.Value = "0"
                    btnAgregar.Visible = False
                    btnEditar.Visible = False
                    btnEditarSimple.Visible = False
                    btnVerDetalle.Visible = True
                    btnEliminar.Visible = False
                    btnActivar.Visible = False
                End If
            End If
        Catch ex As Exception
            Throw ex
        Finally
            If ProductoSeguridad IsNot Nothing Then ProductoSeguridad.Dispose()
            If ModuloSeguridad IsNot Nothing Then ModuloSeguridad.Dispose()
            If OpcionSeguridad IsNot Nothing Then OpcionSeguridad.Dispose()
            If ItemSeguridad IsNot Nothing Then ItemSeguridad.Dispose()
        End Try
    End Sub

    Private Sub ConfigurarBusqueda(ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal oEntidad As ENT_ENT_Entidad)
        Dim selval As String = ""
        Dim btEstado As Boolean = False
        ddlBusqueda.Items.Clear()
        For Each v_oCampo As ENT_ENT_Campo In lstCampo
            If v_oCampo.btFil And v_oCampo.btVig Then
                'If v_oCampo.vcDes = "Estado" Then
                '    btEstado = True
                'End If
                Dim li As New ListItem
                li.Text = v_oCampo.vcDes
                'li.Value = v_oCampo.vcNomAlias
                li.Value = v_oCampo.inTipDat & "-" & v_oCampo.vcNomAlias 'Agregado por Jcamacho 30/09/2015
                ddlBusqueda.Items.Add(li)
                If v_oCampo.btBusq Then
                    selval = v_oCampo.vcNomAlias
                End If
            End If
        Next
        If ddlBusqueda.Items.Count = 0 Or Not oEntidad.btBus Then
            'btnBuscar.Visible = False 
            'tblFiltroBusqueda.Visible = False 'agregado 09-08-2013
            tblFiltro.Visible = False
        End If
        'If btEstado = False Then
        '    tblFiltroBusqueda.Visible = False
        'End If
        If (selval <> "") Then
            ddlBusqueda.SelectedValue = selval
        End If
    End Sub

    Private Sub ConfigurarOpciones(ByVal oEntidad As ENT_ENT_Entidad, ByVal lstOpcion As List(Of ENT_ENT_Opcion),
                                   ByVal oUsuario As ENT_SEG_Usuario, ByVal inCod As Integer, ByVal inTip As Integer, ByVal VerHistorial As Boolean)
        Dim ProductoSeguridad As BL_PRO_Producto = Nothing
        Dim ModuloSeguridad As BL_PRO_Modulo = Nothing
        Dim OpcionSeguridad As BL_PRO_Opcion = Nothing
        Dim ItemSeguridad As BL_PRO_Item = Nothing
        Try
            'Dim OpcionSeguridad As BL_PRO_Opcion = New BL_PRO_Opcion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim oOpcionSeguridad As New ENT_PRO_Opcion

            'oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod)
            'OpcionSeguridad.Dispose()

            'UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles)

            'Dim objExcelGenerico As New ExportarExcelGenerico()
            'objExcelGenerico.ID = "eegListado"
            'objExcelGenerico.Attributes.Add("runat", "server")

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
                    oModuloSeguridad = ModuloSeguridad.Mostrar(inCod)
                    ModuloSeguridad.Dispose()
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

            Dim td As New HtmlTableCell
            Dim tdExcelImport As New HtmlTableCell
            'eeListado.Visible = True
            'ExcelImport.Visible = True
            td.Controls.Add(eeListado)
            tdExcelImport.Controls.Add(ExcelImport)
            trAvanzada.Controls.Add(td)
            trAvanzada.Controls.Add(tdExcelImport)

            'Dim td1 As New HtmlTableCell
            'td1.Controls.Add(ToolTipGenerico1)
            'trAvanzada.Controls.Add(td1)

            ' wapumayta 2019-03-04 - Solución temporal, reportes deben ser desarrollados en DevExpress
            If (oEntidad.vcTab = "SEG_Usuario") Then
                UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar = False
            End If

            'trAvanzada.Controls.Add(ItemOpcion("btnExportarExcel", "Exportar a Excel", oEntidad.vcURLRep, "ExportarExcel", "../Images/Mantenimiento/Excel16.png", _
            '                                   UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar And oEntidad.btExp))

            'trAvanzada.Controls.Add(ItemOpcion("btnImportar", "Importar", oEntidad.vcURLRep, "ImportarExcel", "../Images/Mantenimiento/Volcar.gif", _
            '                                   UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoImportar And oEntidad.btImp)) GEIG importarexcel

            trAvanzada.Controls.Add(ItemOpcion("btnGuardar", "Guardar", "", "Guardar", "../Images/Mantenimiento/Guardar.png", True))

            trAvanzada.Controls.Add(ItemOpcion("btnRecuperar", "Recuperar", "", "Recuperar", "../Images/Mantenimiento/Actualizar.png", True))

            trAvanzada.Controls.Add(ItemOpcion("btnConfigurarColumnas", "Configurar Columnas", "", "ConfigurarColumnas", "../Images/Mantenimiento/Configurar.png", True))

            '----------------Llena las opciones dinamicas--------------
            trAvanzada.Controls.Add(ItemOpcion("btnReporte", "Reportes", "", "MostrarReportes", "../../Common/Images/Sumario/GEN.png",
                                               UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar And oEntidad.btExp And lstOpcion.Count > 0))
            For Each v_oOpcion As ENT_ENT_Opcion In lstOpcion
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" & v_oOpcion.P_inCod, v_oOpcion.vcDes, v_oOpcion.vcURL, oEntidad.vcTab, v_oOpcion.vcURLIco, ""))
            Next


            '----------------Llena las opciones dinamicas--------------
            'If oEntidad.vcTab = "MOV_Linea" Then
            '    trAvanzada.Controls.Add(ItemOpcion("btnFormatos", "Formatos", "", "MostrarFormatos", "../../Common/Images/pdf.png", True))
            '    ulListaFormatos.Controls.Add(ItemReporte("btnFormato_1", "Vale Resguardo", "", "MOV_Linea", "", "aFormato"))
            '    ulListaFormatos.Controls.Add(ItemReporte("btnFormato_2", "Formato de Asignación", "", "MOV_Linea", "", "aFormato"))
            'End If


            If VerHistorial = True Then
                trAvanzada.Controls.Add(ItemOpcion("btnHistorial", "Ver historial", "", "ConfigurarHistoricos", "../Images/Mantenimiento/BuscarDetalle.gif", True))
            End If
        Catch ex As Exception
            Throw ex
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
        trAvanzada.Controls.Add(td)
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

    'Protected Sub eeListado_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eeListado.ObtenerDatosAExportar
    '    Dim vcTab As String = Request.QueryString("vcTab")
    '    Dim vcFiltro As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(0)
    '    Dim inFilReg As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(1)
    '    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
    '    Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '    Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
    '    Try
    '        'Dim lstCampo2 = (From c In lstCampo Where c.btVig = True Order By c.inOrd Ascending).ToList() '10-07-2015 wapumayta
    '        Dim strFiltros As String = FiltrosPorTablas(lstCampo.Item(0).vcTab)
    '        Dim dsDetalle As DataSet = Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, inFilReg, strFiltros)
    '        Campo.Dispose()
    '        eeListado.ExportarDatos(dsDetalle.Tables(0), Session("DescripcionEntidad" & "_" & vcTab), lstCampo)
    '    Catch
    '    End Try
    'End Sub

    Protected Sub eeListado_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eeListado.ObtenerDatosAExportar
        Dim Campo As BL_ENT_Campo = Nothing
        Try
            Dim vcTab As String = Request.QueryString("vcTab")
            Dim vcFiltro As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(0)
            Dim inFilReg As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(1)
            Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
            'Dim lstCampo2 = (From c In lstCampo Where c.btVig = True Order By c.inOrd Ascending).ToList() '10-07-2015 wapumayta
            Dim strFiltros As String = FiltrosPorTablas(lstCampo.Item(0).vcTab, hdfCodLinTip_X_User.Value)
            Dim dsDetalle As DataSet = Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, inFilReg, strFiltros, oUsuario.P_inCod)
            Campo.Dispose()
            eeListado.ExportarDatos(dsDetalle.Tables(0), Session("DescripcionEntidad" & "_" & vcTab), lstCampo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
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

    'Configuraciones especiales por tabla
    <WebMethod()>
    Public Shared Function VerificarUsuario(ByVal inCodUsu As Integer) As Integer 'agregado 06-05-2014 wapumayta
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim resultado As Integer = 0
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'resultado = Solicitud.VerificarUsuario_Tecnico(inCodUsu)
            'JHERRERA 20150120: Se modificó método de llamada para validar si el usuario también es resposable de aprobación y sin hacer otra llamada a BD
            Dim dtVerificaUsuario As DataTable = Solicitud.VerificarUsuario_TecnicoResApr(inCodUsu)
            If dtVerificaUsuario.Rows(0)("EsResponsableAprobacion").ToString = "0" Then
                resultado = Convert.ToInt32(dtVerificaUsuario.Rows(0)("EsTecnico"))
            Else
                resultado = Convert.ToInt32(dtVerificaUsuario.Rows(0)("EsResponsableAprobacion"))
            End If
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Verificar_LineasRestaurar(ByVal Ids As String) As List(Of Dictionary(Of String, String)) 'agregado 07-30-2014 wapumayta
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim resultado As New List(Of Dictionary(Of String, String))
        Dim dt As New DataTable()
        Try
            Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            dt = Empleado.Listar_LineasRestaurar(Ids)
            For Each dr As DataRow In dt.Rows
                Dim uDict As New Dictionary(Of String, String)
                uDict.Add("Empleado", dr("F_vcCodEmp").ToString())
                uDict.Add("Linea", dr("P_vcNum").ToString())
                uDict.Add("Dispositivo", dr("F_vcCodIMEI").ToString())
                uDict.Add("Situacion", dr("F_inCodEst").ToString())
                uDict.Add("Estado", dr("btVig").ToString())
                uDict.Add("EmpleadoNuevo", dr("F_vcCodEmp").ToString())
                resultado.Add(uDict)
            Next
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Empleado) Then Empleado.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function RestaurarLineasEmpleado(ByVal Ids As String) As Integer
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim resultado As Integer = 0
        Try
            Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            resultado = Empleado.RestaurarLineasEmpleado(Ids)
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Empleado) Then Empleado.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CargarArchivo(pruta As String) As String
        Dim organizacion As BL_GEN_Organizacion = Nothing
        Try
            Dim CarpetaDominio As String = ""
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "/P_Movil/Administrar/Plantillas/", "/")
            Else
                CarpetaDominio = ""
            End If

            'Obtenemos la Ruta del cliente en modo cloud---------------------------------------------------------------------------------------------------------------------------
            Dim strDirectorio As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas/" + CarpetaDominio)
            '----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            'Obtenemos la Ruta y el Nombre del archivo subido temporalmente--------------------------------------------------------------------------------------------------------
            'Dim vcRutaTemporal As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/")
            Dim CarpetaDominioTemp As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/" + CarpetaDominio) & "/"
            Dim vcNombreArchivoTemp As String = Path.GetFileNameWithoutExtension(pruta) & Path.GetExtension(pruta)

            'Validar si el archivo subido es el esperado..
            If Not ValidarIntegridadArchivo(CarpetaDominioTemp & vcNombreArchivoTemp) Then
                Return "-1"
            End If

            '----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            'Obtenemos el Nombre Generico con el cual se va a renombrar------------------------------------------------------------------------------------------------------------
            Dim strNombreArchivo As String = ConfigurationManager.AppSettings("NombreGenericoPlantillaRRHH")
            '----------------------------------------------------------------------------------------------------------------------------------------------------------------------

            Dim strArchivo As String = CarpetaDominioTemp & vcNombreArchivoTemp

            Dim fi As New FileInfo(strArchivo)

            fi.CopyTo(Path.Combine(strDirectorio, strNombreArchivo & Path.GetExtension(pruta)), True)

            Dim eArchivo As New ENT_GEN_Archivo
            eArchivo.byArc = File.ReadAllBytes(strArchivo)
            eArchivo.vcNom = Path.GetFileName(strArchivo)

            'INSERTAMOS LA COLA LUEGO DE HABER CONCLUIDO DE SUBIR LA PLANTILLA RRHH.
            organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            organizacion.LimpiaColaSincronizadorRRHH("movil")
            Dim resultado As Integer = organizacion.ActualizarColaSincronizadorRRHH("AHORA", DBNull.Value.ToString(), "00:00:00", True, "movil", eArchivo)

            Return resultado.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If organizacion IsNot Nothing Then organizacion.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Shared Function CargarArchivoPlantillaImportacion(pruta As String, vcTab As String) As String
        Dim IMP_Proceso As BL_MOV_IMP_Proceso = Nothing
        Try
            Dim oIMP_Proceso As New ENT_MOV_IMP_Proceso
            Dim oArchivo As New ENT_GEN_Archivo
            IMP_Proceso = New BL_MOV_IMP_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim strRutaImportacion As String
            strRutaImportacion = HttpContext.Current.Server.MapPath("~") + "/P_Movil/Importacion/ImportacionLineas/"

            Dim CarpetaDominio As String = ""
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(strRutaImportacion, "/")
            Else
                CarpetaDominio = ""
            End If

            Dim strNombreArchivo As String
            Dim CarpetaDominioTemp As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/" + CarpetaDominio) & "/"
            Dim vcNombreArchivoTemp As String = Path.GetFileNameWithoutExtension(pruta) & Path.GetExtension(pruta)
            Dim daFecha As DateTime = Now
            Dim vcFecha As String = Now.Year.ToString() & New String("0", 2 - daFecha.Month.ToString().Length) + Now.Month.ToString() & New String("0", 2 - daFecha.Day.ToString().Length) + Now.Day.ToString() & "_" & New String("0", 2 - daFecha.Hour.ToString().Length) + Now.Hour.ToString() & New String("0", 2 - daFecha.Minute.ToString().Length) + Now.Minute.ToString()

            'Obtenemos el Nombre Generico con el cual se va a renombrar------------------------------------------------------------------------------------------------------------
            If vcTab = "MOV_Linea" Then
                strNombreArchivo = ConfigurationManager.AppSettings("NombreGenericoPlantillaLinea") & "_P_" & vcFecha
            Else
                strNombreArchivo = ConfigurationManager.AppSettings("NombreGenericoPlantillaPlan") & "_P_" & vcFecha
            End If

            'If Not File.Exists(strRutaImportacion) Then
            '    Directory.CreateDirectory(strRutaImportacion)
            'End If

            Dim fi As New FileInfo(CarpetaDominioTemp & vcNombreArchivoTemp)
            'fi.CopyTo(Path.Combine(strDirectorio, strNombreArchivo & Path.GetExtension(pruta)), True)

            'INSERTAMOS LA COLA LUEGO DE HABER CONCLUIDO DE SUBIR LA PLANTILLA IMPORTACION.
            '-----------------------------------------------------------------------------------------------------------------------------------
            Dim TheSize As Long = Long.Parse(fi.Length)
            oArchivo.vcExt = Path.GetExtension(pruta)
            oArchivo.vcNom = strNombreArchivo & Path.GetExtension(pruta)
            oArchivo.vcRut = oArchivo.vcNom
            oArchivo.byArc = File.ReadAllBytes(CarpetaDominioTemp & vcNombreArchivoTemp)
            oArchivo.vcPass = ""
            If TheSize < 1024 Then
                oArchivo.dcTam = TheSize
                oArchivo.vcUniTam = "B"
            ElseIf TheSize > 1024 AndAlso TheSize < (1024 ^ 2) Then 'KB
                oArchivo.dcTam = Math.Round((TheSize / 1024), 2)
                oArchivo.vcUniTam = "KB"
            ElseIf TheSize > (1024 ^ 2) AndAlso TheSize < (1024 ^ 3) Then 'MB
                oArchivo.dcTam = Math.Round((TheSize / (1024 ^ 2)), 2)
                oArchivo.vcUniTam = "MB"
            ElseIf TheSize > (1024 ^ 3) AndAlso TheSize < (1024 ^ 4) Then 'GB
                oArchivo.dcTam = Math.Round((TheSize / (1024 ^ 3)), 2)
                oArchivo.vcUniTam = "GB"
            ElseIf TheSize > (1024 ^ 4) Then 'TB
                oArchivo.dcTam = Math.Round((TheSize / (1024 ^ 4)), 2)
                oArchivo.vcUniTam = "TB"
            End If
            oIMP_Proceso.Archivos.Add(oArchivo)
            If vcTab = "MOV_Linea" Then
                oIMP_Proceso.inTarCre = Integer.Parse("11")
            Else
                oIMP_Proceso.inTarCre = Integer.Parse("12")
            End If
            oIMP_Proceso.byArchivoImportacion = File.ReadAllBytes(CarpetaDominioTemp & vcNombreArchivoTemp)
            oIMP_Proceso.inPro = Integer.Parse("0")
            oIMP_Proceso.dtFecPro = DateTime.Now
            oIMP_Proceso.Operador.P_inCodOpe = "5201"
            oIMP_Proceso.inCodArc = 3 'Extension Archivo: Excel
            oIMP_Proceso.Plantilla.P_inCodPla = 10 'Nombre Plantilla: PLANTILLA Q15 (POR DEFECTO)
            oIMP_Proceso.inTipTel = 1
            oIMP_Proceso.btUniBitEnvRec = False
            oIMP_Proceso.btBitEnvRec = False
            oIMP_Proceso.EmpleadoPorDefecto.P_vcCod = "0000000000"
            oIMP_Proceso.btVal = False
            oIMP_Proceso.btImp = False
            oIMP_Proceso.dtMesPer = DateTime.Now
            oIMP_Proceso.dcTipCam = 0
            oIMP_Proceso.VcCodCue = ""
            oIMP_Proceso.vcLinTip = ""
            '-----------------------------------------------------------------------------------------------------------------------------------
            IMP_Proceso.Guardar(oIMP_Proceso)
            Return "0"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Proceso IsNot Nothing Then
                IMP_Proceso.Dispose()
            End If
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Shared Function CargarArchivoPlantillaImportacion_Images(pruta As String, prutaImages As String) As String
        Dim IMP_Proceso As BL_MOV_IMP_Proceso = Nothing
        Dim IMP_Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            Dim oIMP_Proceso As New ENT_MOV_IMP_Proceso
            Dim oArchivo As New ENT_GEN_Archivo
            IMP_Proceso = New BL_MOV_IMP_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim strRutaImportacion As String
            strRutaImportacion = HttpContext.Current.Server.MapPath("~") + "/P_Movil/Importacion/ImportacionLineas/"

            Dim CarpetaDominio As String = ""
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(strRutaImportacion, "/")
            Else
                CarpetaDominio = ""
            End If

            Dim strNombreArchivo As String
            Dim CarpetaDominioTemp As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/" + CarpetaDominio) & "/"
            Dim vcNombreArchivoTemp As String = Path.GetFileNameWithoutExtension(pruta) & Path.GetExtension(pruta)
            Dim vcNombreImagesTemp As String = Path.GetFileNameWithoutExtension(prutaImages) & Path.GetExtension(prutaImages)
            Dim daFecha As DateTime = Now
            Dim vcFecha As String = Now.Year.ToString() & New String("0", 2 - daFecha.Month.ToString().Length) + Now.Month.ToString() & New String("0", 2 - daFecha.Day.ToString().Length) + Now.Day.ToString() & "_" & New String("0", 2 - daFecha.Hour.ToString().Length) + Now.Hour.ToString() & New String("0", 2 - daFecha.Minute.ToString().Length) + Now.Minute.ToString()

            Dim P_inCodOpe As String = Nothing
            'P_inCodOpe = IMP_Plantilla.Mostrar(10).Operador.P_inCodOpe.ToString 'Nombre Plantilla: PLANTILLA Q15 (POR DEFECTO) codigo 10
            If P_inCodOpe Is Nothing Then
                P_inCodOpe = "5109"
            End If

            'Obtenemos el Nombre Generico con el cual se va a renombrar------------------------------------------------------------------------------------------------------------
            strNombreArchivo = ConfigurationManager.AppSettings("NombreGenericoPlantillaLinea") & "_P_" & vcFecha

            'If Not File.Exists(strRutaImportacion) Then
            '    Directory.CreateDirectory(strRutaImportacion)
            'End If

            Dim fi As New FileInfo(CarpetaDominioTemp & vcNombreArchivoTemp)
            'Dim fiImages As New FileInfo(CarpetaDominioTemp & vcNombreImagesTemp)
            'fi.CopyTo(Path.Combine(strDirectorio, strNombreArchivo & Path.GetExtension(pruta)), True)

            'INSERTAMOS LA COLA LUEGO DE HABER CONCLUIDO DE SUBIR LA PLANTILLA IMPORTACION.
            '-----------------------------------------------------------------------------------------------------------------------------------
            Dim TheSize As Long = Long.Parse(fi.Length)
            oArchivo.vcExt = Path.GetExtension(pruta)
            oArchivo.vcNom = strNombreArchivo & Path.GetExtension(pruta)
            oArchivo.byArc = File.ReadAllBytes(CarpetaDominioTemp & vcNombreArchivoTemp)
            oArchivo.vcRut = oArchivo.vcNom
            oArchivo.vcPass = ""
            If TheSize < 1024 Then
                oArchivo.dcTam = TheSize
                oArchivo.vcUniTam = "B"
            ElseIf TheSize > 1024 AndAlso TheSize < (1024 ^ 2) Then 'KB
                oArchivo.dcTam = Math.Round((TheSize / 1024), 2)
                oArchivo.vcUniTam = "KB"
            ElseIf TheSize > (1024 ^ 2) AndAlso TheSize < (1024 ^ 3) Then 'MB
                oArchivo.dcTam = Math.Round((TheSize / (1024 ^ 2)), 2)
                oArchivo.vcUniTam = "MB"
            ElseIf TheSize > (1024 ^ 3) AndAlso TheSize < (1024 ^ 4) Then 'GB
                oArchivo.dcTam = Math.Round((TheSize / (1024 ^ 3)), 2)
                oArchivo.vcUniTam = "GB"
            ElseIf TheSize > (1024 ^ 4) Then 'TB
                oArchivo.dcTam = Math.Round((TheSize / (1024 ^ 4)), 2)
                oArchivo.vcUniTam = "TB"
            End If
            oIMP_Proceso.Archivos.Add(oArchivo)
            oIMP_Proceso.vcNombreImages = vcNombreImagesTemp
            oIMP_Proceso.inTarCre = Integer.Parse("11")
            oIMP_Proceso.byArchivoImportacion = File.ReadAllBytes(CarpetaDominioTemp & vcNombreArchivoTemp)
            oIMP_Proceso.byImagesImportacion = File.ReadAllBytes(CarpetaDominioTemp & vcNombreImagesTemp)
            oIMP_Proceso.inPro = Integer.Parse("0")
            oIMP_Proceso.dtFecPro = DateTime.Now
            oIMP_Proceso.Operador.P_inCodOpe = P_inCodOpe
            oIMP_Proceso.inCodArc = 3 'Extension Archivo: Excel
            oIMP_Proceso.Plantilla.P_inCodPla = 10 'Nombre Plantilla: PLANTILLA Q15 (POR DEFECTO)
            oIMP_Proceso.inTipTel = 1
            oIMP_Proceso.btUniBitEnvRec = False
            oIMP_Proceso.btBitEnvRec = False
            oIMP_Proceso.EmpleadoPorDefecto.P_vcCod = "0000000000"
            oIMP_Proceso.btVal = False
            oIMP_Proceso.btImp = False
            oIMP_Proceso.dtMesPer = DateTime.Now
            oIMP_Proceso.dcTipCam = 0
            oIMP_Proceso.VcCodCue = ""
            oIMP_Proceso.vcLinTip = ""
            '-----------------------------------------------------------------------------------------------------------------------------------
            IMP_Proceso.Guardar(oIMP_Proceso)
            Return "0"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Proceso IsNot Nothing Then
                IMP_Proceso.Dispose()
            End If
            If IMP_Plantilla IsNot Nothing Then
                IMP_Plantilla.Dispose()
            End If
        End Try
    End Function

    Private Shared Function ValidarIntegridadArchivo(ArchivoSubido As String) As Boolean
        Dim _return As Boolean = False

        Try

            Dim oxlWorkbook As New XLWorkbook(ArchivoSubido)
            Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)

            Dim Valor1 As String = xlWorksheet1.Cell(5, 2).Value
            Dim Valor2 As String = xlWorksheet1.Cell(5, 23).Value
            Dim Valor3 As String = xlWorksheet1.Cell(5, 16).Value

            Dim Valor4 As String = xlWorksheet1.Cell(4, 2).Value
            Dim Valor5 As String = xlWorksheet1.Cell(4, 23).Value
            Dim Valor6 As String = xlWorksheet1.Cell(4, 16).Value

            If (Valor1 IsNot Nothing AndAlso Valor1 = "Item" AndAlso
                Valor2 IsNot Nothing AndAlso Valor2 = "CodigoEmpleado" AndAlso
                Valor3 IsNot Nothing AndAlso Valor3 = "DescripcionNivel7") OrElse
                (Valor4 IsNot Nothing AndAlso Valor4 = "Item" AndAlso
                Valor5 IsNot Nothing AndAlso Valor5 = "CodigoEmpleado" AndAlso
                Valor6 IsNot Nothing AndAlso Valor6 = "DescripcionNivel7") Then

                _return = True

            End If


            oxlWorkbook.Dispose()


            LiberarObjeto(xlWorksheet1)
            LiberarObjeto(oxlWorkbook)


        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            ''Throw New Exception(UtilitarioWeb.MensajeError)

        End Try

        Return _return
    End Function

    Private Shared Sub LiberarObjeto(ByRef obj As Object)
        Try
            System.Runtime.InteropServices.Marshal.ReleaseComObject(obj)
            obj = Nothing
        Catch ex As Exception
            obj = Nothing
        Finally
            GC.Collect()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function DescargarPlantillaRRHH(ByVal tipDescarga As String, ByVal inNiv As Integer) As String
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Campo As BL_ENT_Campo = Nothing
        Try
            Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Campo = New BL_ENT_Campo(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")
            Dim IdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
            File.Copy(strDirectorioPlantilla & "\Plantilla_RRHH.xlsx", strDirectorioPlantilla & "\PlantillaRRHH.xlsx", True)
            Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & "\PlantillaRRHH.xlsx")
            Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)
            Dim xlWorksheet2 = oxlWorkbook.Worksheet(2)

            'cargar operadores
            Dim dtOperador As DataTable = Operador.ListarOperadorToDatatable()
            xlWorksheet2.Range("A2:A20").Clear()

            'xlWorksheet2.Range("A2").Value = ""
            Dim valCel As Integer = 2
            For Each dr As DataRow In dtOperador.Rows
                xlWorksheet2.Range("A" + valCel.ToString()).Value = dr("vcCodOpe").ToString().Replace("&#39", "'")
                valCel += 1
            Next
            xlWorksheet1.Range("AI6:AI3004").SetDataValidation().Clear()
            Dim dtValidOperador As IXLDataValidation = xlWorksheet1.Range("AI6:AI3004").SetDataValidation()
            If dtOperador.Rows.Count > 0 Then
                dtValidOperador.List(xlWorksheet2.Range("$A$2:$A$" & (valCel - 1).ToString))
            End If

            Dim ColumInicial As Integer = 40, Column As Integer = 40, NomColumna As String

            'CAMPOS ADICIONALES AGREGADOS POR CARACTERISTICAS
            Dim dsCampos As DataSet = New DataSet()
            dsCampos = Campo.ListarCamposToPlantillaRRHH()
            If dsCampos.Tables(0).Rows.Count > 0 Then
                For i As Integer = 0 To dsCampos.Tables(0).Rows.Count - 1
                    NomColumna = dsCampos.Tables(0).Rows(i)(0).ToString
                    xlWorksheet1.Column(Column).InsertColumnsAfter(1)
                    Column = Column + 1
                    xlWorksheet1.Column(Column).Cell(4).Value = NomColumna.ToString()
                    xlWorksheet1.Column(Column).Cell(4).Comment.SetAuthor("GestiónMovil").AddText("Esta información es de acuerdo a la caracteristica agregada en su configuración. *DATO NO OBLIGATORIO.")
                    xlWorksheet1.Column(Column).AdjustToContents()
                Next
                xlWorksheet1.Range(3, ColumInicial + 1, 3, Column).Merge()
                xlWorksheet1.Range(3, ColumInicial + 1, 3, Column).Value = "CARACTERISTICAS ADICIONALES DE ORGANIZACIÓN"
                xlWorksheet1.Range(3, ColumInicial + 1, 3, Column).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                xlWorksheet1.Range(3, ColumInicial + 1, 3, Column).Style.Font.Bold = True
                xlWorksheet1.Range(3, ColumInicial + 1, 3, Column).Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217)
            End If

            xlWorksheet1.Column(29).Width = 20

            If tipDescarga = "1" Then
                If inNiv = 2 Then
                    xlWorksheet1.Column(7).Hide()
                    xlWorksheet1.Column(8).Hide()
                    xlWorksheet1.Column(9).Hide()
                    xlWorksheet1.Column(10).Hide()
                    xlWorksheet1.Column(11).Hide()
                    xlWorksheet1.Column(12).Hide()
                    xlWorksheet1.Column(13).Hide()
                    xlWorksheet1.Column(14).Hide()
                    xlWorksheet1.Column(15).Hide()
                    xlWorksheet1.Column(16).Hide()
                    xlWorksheet1.Column(17).Hide()
                    xlWorksheet1.Column(18).Hide()
                    xlWorksheet1.Column(19).Hide()
                    xlWorksheet1.Column(20).Hide()
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()
                ElseIf inNiv = 3 Then
                    xlWorksheet1.Column(9).Hide()
                    xlWorksheet1.Column(10).Hide()
                    xlWorksheet1.Column(11).Hide()
                    xlWorksheet1.Column(12).Hide()
                    xlWorksheet1.Column(13).Hide()
                    xlWorksheet1.Column(14).Hide()
                    xlWorksheet1.Column(15).Hide()
                    xlWorksheet1.Column(16).Hide()
                    xlWorksheet1.Column(17).Hide()
                    xlWorksheet1.Column(18).Hide()
                    xlWorksheet1.Column(19).Hide()
                    xlWorksheet1.Column(20).Hide()
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()
                ElseIf inNiv = 4 Then
                    xlWorksheet1.Column(11).Hide()
                    xlWorksheet1.Column(12).Hide()
                    xlWorksheet1.Column(13).Hide()
                    xlWorksheet1.Column(14).Hide()
                    xlWorksheet1.Column(15).Hide()
                    xlWorksheet1.Column(16).Hide()
                    xlWorksheet1.Column(17).Hide()
                    xlWorksheet1.Column(18).Hide()
                    xlWorksheet1.Column(19).Hide()
                    xlWorksheet1.Column(20).Hide()
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()
                ElseIf inNiv = 5 Then
                    xlWorksheet1.Column(13).Hide()
                    xlWorksheet1.Column(14).Hide()
                    xlWorksheet1.Column(15).Hide()
                    xlWorksheet1.Column(16).Hide()
                    xlWorksheet1.Column(17).Hide()
                    xlWorksheet1.Column(18).Hide()
                    xlWorksheet1.Column(19).Hide()
                    xlWorksheet1.Column(20).Hide()
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()
                ElseIf inNiv = 6 Then
                    xlWorksheet1.Column(15).Hide()
                    xlWorksheet1.Column(16).Hide()
                    xlWorksheet1.Column(17).Hide()
                    xlWorksheet1.Column(18).Hide()
                    xlWorksheet1.Column(19).Hide()
                    xlWorksheet1.Column(20).Hide()
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()
                ElseIf inNiv = 7 Then
                    xlWorksheet1.Column(17).Hide()
                    xlWorksheet1.Column(18).Hide()
                    xlWorksheet1.Column(19).Hide()
                    xlWorksheet1.Column(20).Hide()
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()

                ElseIf inNiv = 8 Then
                    xlWorksheet1.Column(19).Hide()
                    xlWorksheet1.Column(20).Hide()
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()

                ElseIf inNiv = 9 Then
                    xlWorksheet1.Column(21).Hide()
                    xlWorksheet1.Column(22).Hide()
                End If

            ElseIf tipDescarga = "2" Then
                Dim ds As DataSet = New DataSet()
                ds = Campo.ListarDatosToPlantillaRRHH(IdUsuario)
                xlWorksheet1.Cell(6, 3).InsertData(ds.Tables(0).AsEnumerable())
            End If
            oxlWorkbook.Save()
            oxlWorkbook.Dispose()


            'Para comprimir plantilla RRHH   //Manuel Tenorio 20/01/2016            
            Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim adicionalnombre As String = UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario)

            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + adicionalnombre + "/").ToString()
            Dim name As String = "PlantillaRRHH"

            If Not File.Exists(vcRutaTMP) Then
                Directory.CreateDirectory(vcRutaTMP)
            End If

            For Each file In Directory.GetFiles(vcRutaTMP)
                IO.File.Delete(file)
            Next

            File.Copy(strDirectorioPlantilla & "\PlantillaRRHH.xlsx", vcRutaTMP & "PlantillaRRHH.xlsx", True)

            '=================================================================================================================================
            name = UtilitarioWeb.CorrijeNombreArchivo(name)
            Dim destPath As String = UtilitarioWeb.ComprimeArchivo("", vcRutaTMP, name, name, "xlsx", False)
            '=================================================================================================================================

            Dim respuesta As String = "P_Movil/Administrar/Temporal/" + adicionalnombre + "/PlantillaRRHH.zip"
            Return respuesta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            Return "0"
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DescargarPlantillaLineas(ByVal tipDescarga As String, ByVal inNiv As Integer) As String
        Dim Operador As BL_GEN_Operador = Nothing
        Dim TipoServicio As BL_GEN_TipoServicio = Nothing
        Dim Campo As BL_ENT_Campo = Nothing
        Try
            Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            TipoServicio = New BL_GEN_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Campo = New BL_ENT_Campo(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
            Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")
            If HttpContext.Current.Session("Cultura").F_inCodPai = 52 Then
                File.Copy(strDirectorioPlantilla & "\Plantilla_Lineas_MX.xlsx", strDirectorioPlantilla & "\Lineas.xlsx", True)
            Else
                File.Copy(strDirectorioPlantilla & "\Plantilla_Lineas.xlsx", strDirectorioPlantilla & "\Lineas.xlsx", True)
            End If

            Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & "\Lineas.xlsx")
            Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)
            Dim xlWorksheet2 = oxlWorkbook.Worksheet(2)

            'cargar operadores
            Dim dtOperador As DataTable = Operador.ListarOperadorToDatatable()
            xlWorksheet2.Range("B4:C20").Clear()

            xlWorksheet2.Range("B3").Value = "-1"
            xlWorksheet2.Range("C3").Value = ""
            Dim valCel As Integer = 4
            For Each dr As DataRow In dtOperador.Rows
                xlWorksheet2.Range("B" + valCel.ToString()).Value = dr("P_inCodOpe").ToString()
                xlWorksheet2.Range("C" + valCel.ToString()).Value = dr("vcCodOpe").ToString().Replace("&#39", "'")
                valCel += 1
            Next
            xlWorksheet1.Range("B3:B10000").SetDataValidation().Clear()
            Dim dtValidOperador As IXLDataValidation = xlWorksheet1.Range("B3:B10000").SetDataValidation()
            If dtOperador.Rows.Count > 0 Then
                dtValidOperador.List(xlWorksheet2.Range("$C$3:$C$" & (valCel - 1).ToString))
            Else
                dtValidOperador.List(xlWorksheet2.Range("$C$3:$C$" & (valCel).ToString))
            End If
            dtValidOperador.ShowInputMessage = False
            dtValidOperador.ShowErrorMessage = True
            dtValidOperador.ErrorStyle = XLErrorStyle.Stop
            dtValidOperador.ErrorTitle = "Error - Operador"
            dtValidOperador.ErrorMessage = "Por favor debe ingresar un operador."
            dtValidOperador.AllowedValues = XLAllowedValues.List

            'Cargar Tipo de Servicio
            Dim dtTipoServicio As DataTable = TipoServicio.ListarTipoServicioToDatatable()
            xlWorksheet2.Range("F10:F500").Clear()

            Dim valCelTipoSer As Integer = 10
            For Each dr As DataRow In dtTipoServicio.Rows
                xlWorksheet2.Range("F" + valCelTipoSer.ToString()).Value = dr("TipoServicio").ToString().Replace("&#39", "'")
                valCelTipoSer += 1
            Next
            xlWorksheet1.Range("K3:K10000").SetDataValidation().Clear()
            Dim dtValidTipoServicio As IXLDataValidation = xlWorksheet1.Range("K3:K10000").SetDataValidation()
            If dtTipoServicio.Rows.Count > 0 Then
                dtValidTipoServicio.List(xlWorksheet2.Range("$F$10:$F$" & (valCelTipoSer - 1).ToString))
            Else
                dtValidTipoServicio.List(xlWorksheet2.Range("$F$10:$F$" & (valCelTipoSer).ToString))
            End If
            dtValidTipoServicio.ShowInputMessage = False
            dtValidTipoServicio.ShowErrorMessage = True
            dtValidTipoServicio.ErrorStyle = XLErrorStyle.Stop
            dtValidTipoServicio.ErrorTitle = "Error - Tipo Servicio"
            dtValidTipoServicio.ErrorMessage = "Por favor debe Tipo de Servicio."
            dtValidTipoServicio.AllowedValues = XLAllowedValues.List


            xlWorksheet2.Range("J3").Value = "-1"
            xlWorksheet2.Range("K3").Value = ""
            Dim dtMarca As DataTable = Campo.ListarMarca.Tables(0)
            Dim valCelMarca As Integer = 4
            For Each dr As DataRow In dtMarca.Rows
                xlWorksheet2.Range("J" + valCelMarca.ToString()).Value = dr("P_inCod").ToString()
                xlWorksheet2.Range("K" + valCelMarca.ToString()).Value = dr("vcNom").ToString().Replace("&#39", "'")
                valCelMarca += 1
            Next
            xlWorksheet1.Range("L3:L10000").SetDataValidation().Clear()
            Dim dtValidMarca As IXLDataValidation = xlWorksheet1.Range("L3:L10000").SetDataValidation()
            If dtMarca.Rows.Count > 0 Then
                dtValidMarca.List(xlWorksheet2.Range("$K$3:$K$" & (valCelMarca - 1).ToString))
            Else
                dtValidMarca.List(xlWorksheet2.Range("$K$3:$K$" & (valCelMarca).ToString))
            End If
            dtValidMarca.ShowInputMessage = False
            dtValidMarca.ShowErrorMessage = True
            dtValidMarca.ErrorStyle = XLErrorStyle.Stop
            dtValidMarca.ErrorTitle = "Error - Marca"
            dtValidMarca.ErrorMessage = "Por favor debe ingresar una marca."
            dtValidMarca.AllowedValues = XLAllowedValues.List

            'xlWorksheet1.Column(25).Hide()

            xlWorksheet1.Cell("A1").Comment.SetAuthor("GestiónMovil").AddText("Codigo de Cuenta que se asocia a la línea que se creará. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("B1").Comment.SetAuthor("GestiónMovil").AddText("Codigo de Operador que se asocia a la línea que se creará. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("C1").Comment.SetAuthor("GestiónMovil").AddText("Si la sucursal no existe, lo agrega en 'Sucursales'. *DATOS OBLIGATORIOS")
            xlWorksheet1.Cell("D1").Comment.SetAuthor("GestiónMovil").AddText("Si la celda esta en blanco o el Empleado no existe, importa la línea como 'Disponibe' caso contrario la línea pasará al estado 'Asignado'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("E1").Comment.SetAuthor("GestiónMovil").AddText("Si la 'Cuenta' es de tipo plan, es obligatorio poner el nombre del plan. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("F1").Comment.SetAuthor("GestiónMovil").AddText("Campo donde se especifica el Número de la Línea el cual se crear en 'Líneas'.*DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("G1").Comment.SetAuthor("GestiónMovil").AddText("Si desea ingresar un Numero RPM para la Línea se ingresa caso contrario se deja vacio. *DATOS NO OBLIGATORIO.")
            xlWorksheet1.Cell("H1").Comment.SetAuthor("GestiónMovil").AddText("Se indica solo para las 'CUENTAS' de tipo 'PLAN'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("I1").Comment.SetAuthor("GestiónMovil").AddText("Si no se ingresa el dato se ingresará por defecto la Fecha Actual caso contrario el dato que se especifica en el campo. *DATOS NO OBLIGATORIOS.")

            xlWorksheet1.Cell("J1").Comment.SetAuthor("GestiónMovil").AddText("Meses Contrato")

            xlWorksheet1.Cell("K1").Comment.SetAuthor("GestiónMovil").AddText("Tipo de Servicio")

            xlWorksheet1.Cell("L1").Comment.SetAuthor("GestiónMovil").AddText("Marca")

            xlWorksheet1.Cell("M1").Comment.SetAuthor("GestiónMovil").AddText("Si el modelo no existe, lo agrega en 'Modelo Dispositivo'. *DATOS NO OBLIGATORIOS")

            xlWorksheet1.Cell("N1").Comment.SetAuthor("GestiónMovil").AddText("Si no se ingresa el dato se ingresará por defecto la Fecha Actual caso contrario el dato que se especifica en el campo. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("O1").Comment.SetAuthor("GestiónMovil").AddText("Imagen que irá asociado al modelo dispositivo al momento de crearse. *DATOS NO OBLIGATORIOS")
            xlWorksheet1.Cell("P1").Comment.SetAuthor("GestiónMovil").AddText("Si el equipo no exsite, lo agrega en 'Dispositivos'. *DATOS NO OBLIGATORIOS")
            xlWorksheet1.Cell("Q1").Comment.SetAuthor("GestiónMovil").AddText("Si se ingresa el 'Modelo Dispositivo', el 'Tipo de Adquisición' debera de ser necesario. *DATOS NO OBLIGATORIOS.")

            xlWorksheet1.Cell("R1").Comment.SetAuthor("GestiónMovil").AddText("Si el valor ingresado es 'NO', dará de baja a la línea.")
            xlWorksheet1.Cell("S1").Comment.SetAuthor("GestiónMovil").AddText("Si el valor ingresado es 'NO', dará de baja al equipo.")

            xlWorksheet1.Cell("T1").Comment.SetAuthor("GestiónMovil").AddText("Se define la cantidad y Monto para el servicio MINUTOS VOZ que se le asignará a línea ingresada.")
            xlWorksheet1.Cell("V1").Comment.SetAuthor("GestiónMovil").AddText("Se define la cantidad y Monto para el servicio MINUTOS RPM que se le asignará a línea ingresada.")
            xlWorksheet1.Cell("X1").Comment.SetAuthor("GestiónMovil").AddText("Se define la cantidad y Monto para el servicio DATOS que se le asignará a línea ingresada.")
            xlWorksheet1.Cell("Z1").Comment.SetAuthor("GestiónMovil").AddText("Se define la cantidad y Monto para el servicio MENSAJES(SMS) que se le asignará a línea ingresada.")

            xlWorksheet1.Cell("T2").Comment.SetAuthor("GestiónMovil").AddText("Si la cantidad es '0' dicho servicio no será asociada a la línea ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("U2").Comment.SetAuthor("GestiónMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Minutos Voz'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("V2").Comment.SetAuthor("GestiónMovil").AddText("Si la cantidad es '0' dicho servicio no será asociada a la línea ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("W2").Comment.SetAuthor("GestiónMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Minutos RPM'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("X2").Comment.SetAuthor("GestiónMovil").AddText("Si la cantidad es '0' dicho servicio no será asociada a la línea ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("Y2").Comment.SetAuthor("GestiónMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Datos MB'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("Z2").Comment.SetAuthor("GestiónMovil").AddText("Si la cantidad es '0' dicho servicio no será asociada a la línea ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("AA2").Comment.SetAuthor("GestiónMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Mensajes de Texto'. *DATOS NO OBLIGATORIOS.")

            xlWorksheet1.Column(22).Hide()
            xlWorksheet1.Column(23).Hide()

            Dim ColumInicial As Integer = 19, NomColumna As String

            'CAMPOS ADICIONALES AGREGADOS POR CARACTERISTICAS
            Dim dsCampos As DataSet = New DataSet()
            dsCampos = Campo.ListarCamposToPlantillaLineas()
            For i As Integer = 0 To dsCampos.Tables(0).Rows.Count - 1
                NomColumna = dsCampos.Tables(0).Rows(i)(0).ToString
                xlWorksheet1.Column(ColumInicial).InsertColumnsAfter(1)
                ColumInicial = ColumInicial + 1
                xlWorksheet1.Column(ColumInicial).FirstCell().Value = NomColumna.ToString()
                xlWorksheet1.Column(ColumInicial).FirstCell().Comment.SetAuthor("GestiónMovil").AddText("Esta información es de acuerdo a la caracteristica agregada en su configuración. *DATO NO OBLIGATORIO.")
            Next

            If tipDescarga = "2" Then
                Dim ds As DataSet = New DataSet()
                ds = Campo.ListarDatosToPlantillaLineas(IdUsuario)
                xlWorksheet1.Cell(3, 1).InsertData(ds.Tables(0).AsEnumerable())
            End If

            oxlWorkbook.Save()
            oxlWorkbook.Dispose()

            Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim adicionalnombre As String = UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario)

            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + adicionalnombre + "/").ToString()
            Dim name As String = "Lineas"

            If Not File.Exists(vcRutaTMP) Then
                Directory.CreateDirectory(vcRutaTMP)
            End If

            For Each file In Directory.GetFiles(vcRutaTMP)
                IO.File.Delete(file)
            Next

            File.Copy(strDirectorioPlantilla & "\Lineas.xlsx", vcRutaTMP & "Lineas.xlsx", True)

            '=================================================================================================================================
            name = UtilitarioWeb.CorrijeNombreArchivo(name)
            Dim destPath As String = UtilitarioWeb.ComprimeArchivo("", vcRutaTMP, "PlantillaLinea", name, "xlsx", False)
            '=================================================================================================================================

            Dim respuesta As String = "P_Movil/Administrar/Temporal/" + adicionalnombre + "/PlantillaLinea.zip"
            Return respuesta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            Return "0"
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If TipoServicio IsNot Nothing Then TipoServicio.Dispose()
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DescargarPlantillaCuentas_Planes(ByVal tipDescarga As String, ByVal inNiv As Integer, ByVal strTab As String) As String
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Campo As BL_ENT_Campo = Nothing
        Try
            Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Campo = New BL_ENT_Campo(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")
            If strTab = "MOV_Plan" Then
                If HttpContext.Current.Session("Cultura").F_inCodPai = 52 Then
                    File.Copy(strDirectorioPlantilla & "\Plantilla_Planes_MX.xlsx", strDirectorioPlantilla & "\Planes.xlsx", True)
                Else
                    File.Copy(strDirectorioPlantilla & "\Plantilla_Planes.xlsx", strDirectorioPlantilla & "\Planes.xlsx", True)
                End If

            Else
                If HttpContext.Current.Session("Cultura").F_inCodPai = 52 Then
                    File.Copy(strDirectorioPlantilla & "\Plantilla_Planes_MX.xlsx", strDirectorioPlantilla & "\Cuentas.xlsx", True)
                Else
                    File.Copy(strDirectorioPlantilla & "\Plantilla_Planes.xlsx", strDirectorioPlantilla & "\Cuentas.xlsx", True)
                End If

            End If
            Dim oxlWorkbook As XLWorkbook
            If strTab = "MOV_Plan" Then
                oxlWorkbook = New XLWorkbook(strDirectorioPlantilla & "\Planes.xlsx")
            Else
                oxlWorkbook = New XLWorkbook(strDirectorioPlantilla & "\Cuentas.xlsx")
            End If
            Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)
            Dim xlWorksheet2 = oxlWorkbook.Worksheet(2)

            'cargar operadores
            Dim dtOperador As DataTable = Operador.ListarOperadorToDatatable()
            xlWorksheet2.Range("H4:I20").Clear()

            xlWorksheet2.Range("H3").Value = "-1"
            xlWorksheet2.Range("I3").Value = ""

            Dim valCel As Integer = 4
            For Each dr As DataRow In dtOperador.Rows
                xlWorksheet2.Range("H" + valCel.ToString()).Value = dr("P_inCodOpe").ToString()
                xlWorksheet2.Range("I" + valCel.ToString()).Value = dr("vcCodOpe").ToString().Replace("&#39", "'")
                valCel += 1
            Next

            xlWorksheet1.Range("D3:D500000").SetDataValidation().Clear()
            Dim dtValidOperador As IXLDataValidation = xlWorksheet1.Range("D3:D500000").SetDataValidation()

            If dtOperador.Rows.Count > 0 Then
                dtValidOperador.List(xlWorksheet2.Range("$I$3:$I$" & (valCel - 1).ToString))
            Else
                dtValidOperador.List(xlWorksheet2.Range("$I$3:$I$" & (valCel).ToString))
            End If

            dtValidOperador.ShowInputMessage = False
            dtValidOperador.ShowErrorMessage = True
            dtValidOperador.ErrorStyle = XLErrorStyle.Stop
            dtValidOperador.ErrorTitle = "Error - Operador"
            dtValidOperador.ErrorMessage = "Por favor debe ingresar un operador."
            dtValidOperador.AllowedValues = XLAllowedValues.List

            xlWorksheet1.Column(18).Hide()

            xlWorksheet1.Cell("A1").Comment.SetAuthor("PCSistelMovil").AddText("Si el código de Cuenta ingresada no existe se creará en caso contrario actualiza. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("B1").Comment.SetAuthor("PCSistelMovil").AddText("Campo que permite especificar el 'Nombre' de la Cuenta que se creará o actualizará. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("C1").Comment.SetAuthor("PCSistelMovil").AddText("Tipo de Servicio que se asocia a la cuenta o plan que se creará. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("D1").Comment.SetAuthor("PCSistelMovil").AddText("Código de Operador que se asocia a la cuenta o plan que se creará. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("E1").Comment.SetAuthor("PCSistelMovil").AddText("Campo donde se especifica el 'Tipo de grupo'. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("F1").Comment.SetAuthor("PCSistelMovil").AddText("Campo donde se especifica el 'Periodo Facturación'. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("G1").Comment.SetAuthor("PCSistelMovil").AddText("Valor que se ingresa si el 'Tipo de Cuenta' es por 'DISTRIBUCIÓN BOLSA'.*DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("H1").Comment.SetAuthor("PCSistelMovil").AddText("Campo donde se especifica el 'Tipo Cuenta'. *DATOS OBLIGATORIOS.")
            xlWorksheet1.Cell("I1").Comment.SetAuthor("PCSistelMovil").AddText("Si la 'Cuenta' es de tipo 'PLAN' se debe de especificar el 'Nombre Plan' a crearse de caso contrario no es necesario especificarlo. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("K1").Comment.SetAuthor("PCSistelMovil").AddText("Se define la cantidad y Monto para el servicio MINUTOS VOZ que se le asignará al Plan o Cuenta ingresada.")
            xlWorksheet1.Cell("M1").Comment.SetAuthor("PCSistelMovil").AddText("Se define la cantidad y Monto para el servicio MINUTOS RPM que se le asignará al Plan o Cuenta ingresada.")
            xlWorksheet1.Cell("O1").Comment.SetAuthor("PCSistelMovil").AddText("Se define la cantidad y Monto para el servicio DATOS que se le asignará al Plan o Cuenta ingresada.")
            xlWorksheet1.Cell("Q1").Comment.SetAuthor("PCSistelMovil").AddText("Se define la cantidad y Monto para el servicio MENSAJES(SMS) que se le asignará al Plan o Cuenta ingresada.")
            xlWorksheet1.Cell("J2").Comment.SetAuthor("PCSistelMovil").AddText("Si la cantidad es '0' dicho servicio no será asociada al Plan o Cuenta ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("K2").Comment.SetAuthor("PCSistelMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Minutos Voz'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("L2").Comment.SetAuthor("PCSistelMovil").AddText("Si la cantidad es '0' dicho servicio no será asociada al Plan o Cuenta ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("M2").Comment.SetAuthor("PCSistelMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Minutos RPM'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("N2").Comment.SetAuthor("PCSistelMovil").AddText("Si la cantidad es '0' dicho servicio no será asociada al Plan o Cuenta ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("O2").Comment.SetAuthor("PCSistelMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Datos MB'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("P2").Comment.SetAuthor("PCSistelMovil").AddText("Si la cantidad es '0' dicho servicio no será asociadaal Plan o Cuenta ingresada, ya que se requiere que ingrese una cantidad '>0' o la palabra 'ILIMITADO'. *DATOS NO OBLIGATORIOS.")
            xlWorksheet1.Cell("Q2").Comment.SetAuthor("PCSistelMovil").AddText("Se debe de ingresar el monto correspondiente al servicio 'Mensajes de Texto'. *DATOS NO OBLIGATORIOS.")

            xlWorksheet1.Column(12).Hide()
            xlWorksheet1.Column(13).Hide()

            Dim ColumInicial As Integer = 9, NomColumna As String

            'CAMPOS ADICIONALES AGREGADOS POR CARACTERISTICAS
            Dim dsCampos As DataSet = New DataSet()
            dsCampos = Campo.ListarCamposToPlantillaPlanes()
            For i As Integer = 0 To dsCampos.Tables(0).Rows.Count - 1
                NomColumna = dsCampos.Tables(0).Rows(i)(0).ToString
                xlWorksheet1.Column(ColumInicial).InsertColumnsAfter(1)
                ColumInicial = ColumInicial + 1
                xlWorksheet1.Column(ColumInicial).FirstCell().Value = NomColumna.ToString()
                Dim columnLetter As String = xlWorksheet1.Column(ColumInicial).ColumnLetter()
                Dim rangeColmuns As String = columnLetter & "1:" & columnLetter & "2" 'ejemplo: B1:B2 (esto es para combinar las columnas agregadas)
                xlWorksheet1.Range(rangeColmuns).Merge()
                xlWorksheet1.Column(ColumInicial).FirstCell().Comment.SetAuthor("GestiónMovil").AddText("Esta información es de acuerdo a la caracteristica agregada en su configuración. *DATO NO OBLIGATORIO.")
            Next

            If tipDescarga = "2" Then
                Dim ds As DataSet = New DataSet()
                ds = Campo.ListarDatosToPlantillaPlanes()
                xlWorksheet1.Cell(3, 1).InsertData(ds.Tables(0).AsEnumerable())
            End If

            oxlWorkbook.Save()
            oxlWorkbook.Dispose()

            Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim adicionalnombre As String = UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario)

            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + adicionalnombre + "/").ToString()
            Dim name As String
            If strTab = "MOV_Plan" Then
                name = "Planes"
            Else
                name = "Cuentas"
            End If

            If Not File.Exists(vcRutaTMP) Then
                Directory.CreateDirectory(vcRutaTMP)
            End If

            For Each file In Directory.GetFiles(vcRutaTMP)
                IO.File.Delete(file)
            Next

            If strTab = "MOV_Plan" Then
                File.Copy(strDirectorioPlantilla & "\Planes.xlsx", vcRutaTMP & "Planes.xlsx", True)
            Else
                File.Copy(strDirectorioPlantilla & "\Cuentas.xlsx", vcRutaTMP & "Cuentas.xlsx", True)
            End If

            '=================================================================================================================================
            name = UtilitarioWeb.CorrijeNombreArchivo(name)
            If strTab = "MOV_Plan" Then
                Dim destPath As String = UtilitarioWeb.ComprimeArchivo("", vcRutaTMP, "PlantillaPlan", name, "xlsx", False)
            Else
                Dim destPath As String = UtilitarioWeb.ComprimeArchivo("", vcRutaTMP, "PlantillaCuenta", name, "xlsx", False)
            End If

            '=================================================================================================================================

            Dim respuesta As String = "P_Movil/Administrar/Temporal/" + adicionalnombre + IIf(strTab = "MOV_Plan", "/PlantillaPlan.zip", "/PlantillaCuenta.zip")
            Return respuesta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            Return "0"
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    'ECONDEÑA   11/10/2016
    Private Function CambiarNombreModulo(vcTab As String) As String
        Dim nombreModulo As String
        Select Case vcTab
            Case "MOV_IMP_Ruta", "MOV_IMP_Plantilla", "MOV_IMP_Servicio", "MOV_IMP_Destino"
                nombreModulo = "Configuración Móvil"
            Case Else
                nombreModulo = String.Empty
        End Select
        Return nombreModulo
    End Function
End Class
