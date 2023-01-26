Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports VisualSoft.Comun.ImportacionExportacion
Imports System.Web.Script.Services
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.Procesos
Imports VisualSoft.Comun.Proceso.BE
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes
Imports System.IO
Imports ClosedXML.Excel
Imports UtilitarioWeb
Imports Ionic.Zip
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Cam_DespachoOperador
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If Not IsPostBack Then
                oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)

                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")

                spRutaLogImportacion.InnerText = ConfigurationManager.AppSettings("RutaLogUplodad").ToString()

                'Tipo de Linea - wapumayta - 02-11-2015
                Dim General = New General()
                hdfTipoLineaPerfil.Value = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                If hdfCodLinTip_X_User.Value <> 0 Then
                    ddlLineaTipo.Enabled = False
                End If

                'Bloqueada pero mostrando STAFF, para Licencia Standard
                If oUsuario.Empleado.Licencia.ToUpper = "STANDARD" Then
                    ddlLineaTipo.Enabled = False
                    ddlLineaTipo.SelectedIndex = 1
                End If

                Dim lstCampana As New List(Of MOV_CAM_Campana)
                lstCampana = ListarCampanaPorOperador(ddlOperador.SelectedValue)
                UtilitarioWeb.Dataddl(ddlCampana, lstCampana, "Descripcion", "IdCampana")

                If lstCampana.Find(Function(c) c.btActivo = True) IsNot Nothing Then
                    ddlCampana.SelectedValue = lstCampana.Find(Function(c) c.btActivo = True).IdCampana.ToString()
                    hdfCampanaActiva.Value = ddlCampana.SelectedValue
                End If
                'Debe de estar debajo del find porque sino se cae cuando no hay data
                lstCampana.Insert(0, New MOV_CAM_Campana() With {.IdCampana = -1, .Descripcion = "<Seleccionar>"})

                Session("GrillaDeImportacion") = Nothing
                Session("GrillaErrores") = Nothing
                Session("GrillaErroresImportacion") = Nothing 'agregado 12-10-2015 wapumayta
                hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente

                Dim oAuditoria As New ProcesaAuditoria
                oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                oAuditoria.Producto = AuditoriaConstantes.Name
                oAuditoria.Modulo = AuditoriaConstantes.ModuloAlmacen.Name
                oAuditoria.NombreUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcUsu
                oAuditoria.Opcion = AuditoriaConstantes.ModuloAlmacen.IngresoAlmacen
                'AUDITORIA : Se inserta el Usuario Logeado
                oAuditoria.Tabla = TableNames.IngresoAlmacen
                oAuditoria.Acceso()
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
            If LineaTipo IsNot Nothing Then
                LineaTipo.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarCampanaPorOperador(ByVal IdOperador As String) As List(Of MOV_CAM_Campana)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Campana.ListarPorOperador(Convert.ToInt32(IdOperador))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CargarArchivo(Operador As String, Campana As String, Situacion As String, pruta As String, LineaTipo As String,
                                         vcNumeroFac As String, dvFechaFac As String, dcMontoFac As String,
                                         vcOrdenServicio As String, nomArch As String) As String
        Dim Despacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Dim vProceso As BL_PCS_IMP_Proceso = Nothing
        Dim vProcesoInformacion As BL_PCS_IMP_ProcesoInformacion = Nothing
        Dim ConfigProceso As BL_PCS_IMP_Config_Proceso = Nothing
        Try

            Dim IdDominio As String = IIf(HttpContext.Current.Session("IdDominio").ToString() = "", "-1", HttpContext.Current.Session("IdDominio").ToString())

            Dim resultado As Boolean = False
            pruta = HttpContext.Current.Server.MapPath("~\" + pruta)

            If Not Path.GetFileName(pruta).Contains("IngresoAlmacen_Plantilla") Then
                Return "archivo inválido"
            End If

            Dim RutaBackupUpload As String = ConfigurationManager.AppSettings("RutaBackupUpload").ToString()
            Dim RutaErrorUpload As String = ConfigurationManager.AppSettings("RutaErrorUpload").ToString()
            Dim RutaLogUplodad As String = ConfigurationManager.AppSettings("RutaLogUplodad").ToString()
            If Not Directory.Exists(RutaBackupUpload) Then
                Directory.CreateDirectory(RutaBackupUpload)
            End If
            If Not Directory.Exists(RutaErrorUpload) Then
                Directory.CreateDirectory(RutaErrorUpload)
            End If
            If Not Directory.Exists(RutaLogUplodad) Then
                Directory.CreateDirectory(RutaLogUplodad)
            End If

            Dim pidPlantilla As Integer = 7
            Dim ptabla As String = "MOV_CAM_CampanaDespachoOperadorDetalle"
            Dim Proceso As New ProcesosFunciones
            Despacho = New BL_MOV_CAM_CampanaDespacho(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            vProceso = New BL_PCS_IMP_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            vProcesoInformacion = New BL_PCS_IMP_ProcesoInformacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ConfigProceso = New BL_PCS_IMP_Config_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim CodConfigOrigen As Integer = Proceso.Registrar_Configuracion_Origen_Upload(pruta, pidPlantilla)
            Dim CodProceso As Integer = vProceso.Obtener_Codigo_Proceso()
            Dim CodProcesoInformacion As Integer = vProcesoInformacion.Obtener_Codigo_Proceso_Informacion()
            'Dim dtImportacion As DataTable
            Dim dsOrigen As New DataSet

            If Proceso.Insertar_Proceso(CodConfigOrigen, CodProceso, CodProcesoInformacion) Then
                If Proceso.Registrar_ProcesoInformacion(CodProceso, CodProcesoInformacion) Then
                    dsOrigen = Proceso.Procesando_Origen(CodConfigOrigen, CodProceso, CodProcesoInformacion, "-1")
                    If dsOrigen.Tables.Count > 0 Then
                        Dim CodConfigDestino As Integer = Proceso.Registrar_Configuracion_Destino_Upload(pidPlantilla, ptabla)
                        Dim estado As Boolean = Proceso.Procesando_Destino(CodConfigDestino, dsOrigen, CodConfigOrigen, CodProceso, CodProcesoInformacion)

                        If estado Then
                            Dim opcion As Boolean = Proceso.Actualizar_Proceso_Conf_Destino(CodProceso, CodConfigDestino)
                            If opcion Then
                                resultado = Proceso.Actualizar_ProcesoInformacion(CodProceso, CodConfigOrigen, pruta, CodProcesoInformacion)
                            End If
                        End If
                    End If
                End If
            End If
            '---------------------------------------------------------------------------------------------------------------------------------
            HttpContext.Current.Session("GrillaDeImportacion") = Nothing
            HttpContext.Current.Session("GrillaErrores") = Nothing

            Dim CarpetaDominio As String = ""
            Dim adjunto As ENT_MOV_CAM_Adjunto = Nothing
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "/P_Movil/Administrar/Plantillas/", "/")
            Else
                CarpetaDominio = ""
            End If
            Dim strDirectorio As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/" + CarpetaDominio) & "/"
            Dim CarpetaDominioTemp As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/" + CarpetaDominio) & "/"
            Dim vcNombreArchivoTemp As String = Path.GetFileNameWithoutExtension(nomArch) & Path.GetExtension(nomArch)

            Dim fi As New FileInfo(CarpetaDominioTemp & vcNombreArchivoTemp)
            Dim strfn As String = fi.FullName.ToString()
            If File.Exists(strfn) Then
                adjunto = New ENT_MOV_CAM_Adjunto()
                Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                    Dim BinaryData(fs.Length - 1) As Byte
                    fs.Read(BinaryData, 0, BinaryData.Length)
                    adjunto.NombreArchivo = vcNombreArchivoTemp
                    adjunto.Archivo = BinaryData

                    fs.Flush()
                    fs.Close()
                End Using

                File.Delete(strfn)
            End If





            Dim countNoProc As Integer = 0
            Dim dsResultadoProceso As New DataSet()
            Dim IdDespachoOperado As Integer = 0
            If dsOrigen.Tables(0).Rows.Count > 0 Then
                dsResultadoProceso = Despacho.GuardarIngresoAlmacen(dsOrigen.Tables(0), Operador, LineaTipo, Campana, Situacion, pruta)
                'IdDespachoOperado = Despacho.GuardarIngresoAlmacen(dsOrigen.Tables(0), Operador, LineaTipo, Campana, Situacion, pruta)
                'dsResultadoProceso = Despacho.GuardarDetalleLineaDispositivo(IdDespachoOperado)
                If dsResultadoProceso.Tables(0).Rows.Count > 0 Then
                    'dtImportacion = EstructuraPlantilla(dsOrigen.Tables(0), CType(HttpContext.Current.Session("GrillaCampos"), List(Of ENT_PCS_IMP_Campo)))
                    HttpContext.Current.Session("GrillaDeImportacion") = dsResultadoProceso.Tables(0)
                End If
                Dim i As Integer = dsResultadoProceso.Tables(1).Rows.Count
                If dsResultadoProceso.Tables(1).Rows.Count > 0 And dsOrigen.Tables(1).Rows.Count = 0 Then
                    HttpContext.Current.Session("GrillaErrores") = dsResultadoProceso.Tables(1)
                ElseIf dsResultadoProceso.Tables(1).Rows.Count > 0 And dsOrigen.Tables(1).Rows.Count > 0 Then
                    dsOrigen.Tables(1).Rows.RemoveAt(dsOrigen.Tables(1).Rows.Count - 1)
                    For Each m As DataRow In dsOrigen.Tables(1).Rows
                        i = i + 1
                        Dim row As DataRow = dsResultadoProceso.Tables(1).NewRow()
                        row("Item") = i
                        row("Linea") = m("Linea").ToString()
                        row("FechaNuevoContrato") = m("FecIniContrato").ToString().Substring(0, 10)
                        row("Penalidad") = ""
                        row("Modelo") = m("ModeloDispositivo").ToString()
                        row("EsRenovacion") = m("EsRenovacion").ToString()
                        row("IMEI") = m("IMEI").ToString()
                        row("NroCuenta") = m("NroCuenta").ToString()
                        row("GUIA") = m("Guia").ToString()
                        row("Obs") = m("Observacion").ToString()
                        row("vcDesMod") = m("vcDesMod").ToString()
                        row("DescError") = RenombrarColumnas(dsOrigen.Tables(1).Columns, m("Tabla").ToString())
                        row("MesesContrato") = m("MesesContrato").ToString()
                        row("PlanLinea") = ""
                        row("Serie") = m("Serie").ToString()
                        dsResultadoProceso.Tables(1).Rows.Add(row)
                    Next
                    HttpContext.Current.Session("GrillaErrores") = dsResultadoProceso.Tables(1)
                ElseIf dsResultadoProceso.Tables(1).Rows.Count = 0 And dsOrigen.Tables(1).Rows.Count > 0 Then
                    dsOrigen.Tables(1).Rows.RemoveAt(dsOrigen.Tables(1).Rows.Count - 1)
                    Dim dtErroresImportacion As New DataTable("ErroresImportacion")
                    For Each m As DataRow In dsOrigen.Tables(1).Rows
                        i = i + 1
                        Dim row As DataRow = dtErroresImportacion.NewRow()
                        row("Item") = i
                        row("Linea") = m("Linea").ToString()
                        row("FechaNuevoContrato") = m("FecIniContrato").ToString().Substring(0, 10)
                        row("Penalidad") = ""
                        row("Modelo") = m("ModeloDispositivo").ToString()
                        row("EsRenovacion") = m("EsRenovacion").ToString()
                        row("IMEI") = m("IMEI").ToString()
                        row("NroCuenta") = m("NroCuenta").ToString()
                        row("GUIA") = m("Guia").ToString()
                        row("Obs") = m("Observacion").ToString()
                        row("vcDesMod") = m("vcDesMod").ToString()
                        row("DescError") = RenombrarColumnas(dsOrigen.Tables(1).Columns, m("Tabla").ToString())
                        row("MesesContrato") = m("MesesContrato").ToString()
                        row("PlanLinea") = ""
                        row("Serie") = m("Serie").ToString()
                        dtErroresImportacion.Rows.Add(row)
                    Next
                    HttpContext.Current.Session("GrillaErrores") = dtErroresImportacion
                End If
            End If

            'File.Delete(pruta)
            If (dsResultadoProceso.Tables.Count > 1) Then
                If dsResultadoProceso.Tables(2).Rows.Count > 0 Then
                    EnviarCorreosRenovacion(dsResultadoProceso.Tables(2))
                End If
            End If
            If (dsResultadoProceso.Tables.Count > 0) Then
                countNoProc = dsResultadoProceso.Tables(1).Rows.Count
            Else
                countNoProc = -1
            End If

            Return countNoProc
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Despacho IsNot Nothing Then
                Despacho.Dispose()
            End If
            If vProceso IsNot Nothing Then
                vProceso.Dispose()
            End If
            If vProcesoInformacion IsNot Nothing Then
                vProcesoInformacion.Dispose()
            End If
            If ConfigProceso IsNot Nothing Then
                ConfigProceso.Dispose()
            End If

        End Try
    End Function

    <WebMethod()>
    Public Shared Function AgregarRegistro(Operador As String, Campana As String, Situacion As String, pruta As String, LineaTipo As String, Linea As String, IdModeloDispositivo As String, _
                                           ModeloDispositivo As String, IMEI As String, Estado As String, Guia As String, Observacion As String, _
                                           EsRenovacion As String, NroCuenta As String, FecIniContrato As String, MesesContrato As Integer, _
                                           IdPlanLinea As String, PlanLinea As String, DescripcionModelo As String, Serie As String, _
                                           NroFactura As String, FecFactura As String, MonFactura As String, OrdenServicio As String,
                                           nomArch As String) As String '(ByVal Situacion As String, ByVal rutaArchivo As String)
        'IncluyeSIMCard As String, SerieSIMCard As String) As Boolean '(ByVal Situacion As String, ByVal rutaArchivo As String)
        Dim Despacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Despacho = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)

            Dim dt As New DataTable()

            Dim ds As New DataSet()
            ds = Despacho.ListarColumnasTabla("MOV_CAM_CampanaDespachoOperadorDetalle")
            For i = 0 To ds.Tables(0).Rows.Count - 1
                dt.Columns.Add(ds.Tables(0).Rows(i)("COLUMN_NAME").ToString())
            Next

            If EsRenovacion = "SI" Then EsRenovacion = "True" Else EsRenovacion = "False"
            'If SerieSIMCard = "" Then
            '    SerieSIMCard = "00"
            '    IncluyeSIMCard = "True"
            'End If


            Dim dr As DataRow = dt.NewRow()
            dr("IdDespachoOperadorDetalle") = ""
            dr("IdDespachoOperador") = ""
            dr("Linea") = If(Linea.ToString().Trim() = "", DBNull.Value, Linea.ToString().Trim())
            dr("IdModeloDispositivo") = If(IdModeloDispositivo.ToString().Trim() = "", DBNull.Value, Convert.ToInt32(IdModeloDispositivo))
            dr("ModeloDispositivo") = If(ModeloDispositivo.ToString().Trim() = "", DBNull.Value, ModeloDispositivo.ToString().Trim())
            dr("IncluyeSIMCard") = If(Linea = "", "False", "True") 'IncluyeSIMCard
            dr("IMEI") = If(IMEI.ToString().Trim() = "", DBNull.Value, IMEI.ToString().Trim())
            dr("SerieSIMCard") = DBNull.Value 'SerieSIMCard
            dr("Estado") = DBNull.Value 'If(Estado.ToString().Trim() = "", DBNull.Value, Convert.ToInt32(Estado))
            dr("Guia") = Guia
            dr("Observacion") = Observacion
            dr("Despachado") = "True"
            dr("EsRenovacion") = EsRenovacion
            dr("NroCuenta") = If(NroCuenta.ToString() = "-1", DBNull.Value, NroCuenta.ToString())
            dr("FecIniContrato") = If(FecIniContrato.ToString() = "", DBNull.Value, FecIniContrato.ToString())
            dr("btEstProc") = "False"
            dr("vcObsProc") = DBNull.Value
            dr("MesesContrato") = If(MesesContrato = -1, DBNull.Value, MesesContrato)
            dr("IdPlanLinea") = If(IdPlanLinea.ToString().Trim() = "", DBNull.Value, Convert.ToInt32(IdPlanLinea))
            dr("PlanLinea") = If(PlanLinea.ToString().Trim() = "", DBNull.Value, PlanLinea.ToString().Trim())
            dr("vcDesMod") = If(DescripcionModelo.ToString().Trim() = "", DBNull.Value, DescripcionModelo.ToString().Trim())
            dr("Serie") = If(Serie.ToString().Trim() = "", DBNull.Value, Serie.ToString().Trim())
            dt.Rows.Add(dr)

            'resultados
            Dim resultado As String = String.Empty
            Dim CarpetaDominio As String = ""
            Dim adjunto As ENT_MOV_CAM_Adjunto = Nothing
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "/P_Movil/Administrar/Plantillas/", "/")
            Else
                CarpetaDominio = ""
            End If
            Dim strDirectorio As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/" + CarpetaDominio) & "/"
            Dim CarpetaDominioTemp As String = HttpContext.Current.Request.MapPath("~/Images/Temporal/" + CarpetaDominio) & "/"
            Dim vcNombreArchivoTemp As String = Path.GetFileNameWithoutExtension(nomArch) & Path.GetExtension(nomArch)

            Dim fi As New FileInfo(CarpetaDominioTemp & vcNombreArchivoTemp)
            Dim strfn As String = fi.FullName.ToString()
            If File.Exists(strfn) Then
                adjunto = New ENT_MOV_CAM_Adjunto()
                Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                    Dim BinaryData(fs.Length - 1) As Byte
                    fs.Read(BinaryData, 0, BinaryData.Length)
                    adjunto.NombreArchivo = vcNombreArchivoTemp
                    adjunto.Archivo = BinaryData

                    fs.Flush()
                    fs.Close()
                End Using

                File.Delete(strfn)
            End If
            If "" & MonFactura = "" Then MonFactura = "0"

            Dim dsResult As New DataSet()
            dsResult = Despacho.GuardarIngresoAlmacen(dt, Operador, LineaTipo, Campana, Situacion, pruta, NroFactura, FecFactura, Convert.ToDecimal(MonFactura), OrdenServicio, adjunto)
            EnviarCorreosRenovacion(dsResult.Tables(2))
            If dsResult.Tables(0).Rows.Count = 0 Then
                resultado = dsResult.Tables(1)(0)("descError").ToString()
            End If

            'Dim IdDespachoOperador As Integer = 0
            'IdDespachoOperador = Despacho.GuardarIngresoAlmacen(dt, Operador, LineaTipo, Campana, Situacion, pruta)
            'resultado = IdDespachoOperador.ToString()

            Return resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Despacho IsNot Nothing Then
                Despacho.Dispose()
            End If
            'If vProceso IsNot Nothing Then
            '    vProceso.Dispose()
            'End If
            'If vProcesoInformacion IsNot Nothing Then
            '    vProcesoInformacion.Dispose()
            'End If
        End Try

    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCarga(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Try
            If Not IsNothing(HttpContext.Current.Session("GrillaDeImportacion")) Then
                Return JQGrid.DatosJSON(CType(HttpContext.Current.Session("GrillaDeImportacion"), DataTable), inPagTam, inPagAct)
            Else
                Return ""
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarCampos() As List(Of Object)
        'Public Shared Function ListarCampos(ByVal Situacion As String) As List(Of Object)
        Dim Campo As BL_PCS_IMP_Campo = Nothing

        Try
            Campo = New BL_PCS_IMP_Campo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim eCampo As New ENT_PCS_IMP_Campo
            eCampo.IdPlantilla = 7
            Dim lstCampo As List(Of ENT_PCS_IMP_Campo) = Campo.Listar_x_Plantilla_Uso(eCampo)
            Dim colmodel As New List(Of Object)

            HttpContext.Current.Session("GrillaCampos") = lstCampo

            For Each oCampo As ENT_PCS_IMP_Campo In lstCampo
                Select Case oCampo.NombreCampo
                    Case "Linea"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 70, False, False, ""))
                    Case "IdModeloDispositivo"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, True, True, 70, False, False, ""))
                    Case "ModeloDispositivo"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 150, False, False, ""))
                        'Case "IncluyeSIMCard"
                        '    colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 100, False, False, ""))
                    Case "IMEI"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 110, False, False, ""))
                        'Case "SerieSIMCard"
                        '    colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 110, False, False, "formatoIncluyeSIMCard"))
                    Case "Estado"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, True, True, 100, False, False, ""))
                    Case "Guia"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 80, False, False, ""))
                    Case "Observacion"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 200, False, False, ""))
                    Case "EsRenovacion"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 100, False, False, "formatoEsRenovacion"))
                    Case "NroCuenta"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 110, False, False, ""))
                    Case "MesesContrato"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 50, False, False, ""))
                    Case "IdPlanLinea"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, True, True, 50, False, False, ""))
                    Case "PlanLinea"
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, True, True, 150, False, False, ""))
                    Case Else
                        colmodel.Add(JQGrid.Columna(oCampo.NombreCampo, oCampo.DescripcionCampo, False, True, 70, False, False, ""))
                End Select
            Next
            Return colmodel
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then
                Campo.Dispose()
            End If
        End Try
    End Function

    Private Shared Function EstructuraPlantilla(ByVal dt As DataTable, ByVal lstCampo As List(Of ENT_PCS_IMP_Campo)) As DataTable
        Dim dtEstructuraPlantilla As DataTable
        Dim Proceso As New ProcesosFunciones
        Dim pidPlantilla As Integer = 7
        Dim QuitaColumna As Boolean
        dtEstructuraPlantilla = dt.Copy()

        Dim tablasInfo = (From c In lstCampo Select c.Tabla).Distinct().ToList()
        Dim oInformacion As List(Of ENT_Information_Schema_Columns) = Proceso.ObtenerInformacion_Tabla_General(tablasInfo)
        Dim lstCampoTotal As List(Of ENT_PCS_IMP_Campo) = Proceso.Relacion_Informacion_PlantCampo(oInformacion, lstCampo, pidPlantilla)
        Dim i As Integer = 0

        For Each oCampoTotal As ENT_PCS_IMP_Campo In lstCampoTotal
            QuitaColumna = True
            For Each oCampo As ENT_PCS_IMP_Campo In lstCampo
                If oCampoTotal.Campo = oCampo.Campo Then
                    QuitaColumna = False
                End If
            Next
            If QuitaColumna Then
                dtEstructuraPlantilla.Columns.Remove(i.ToString())
            End If

            i = i + 1
        Next
        Return dtEstructuraPlantilla
    End Function

    Private Sub eegExportar_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegExportar.ObtenerDatosAExportar
        If Not IsNothing(HttpContext.Current.Session("GrillaDeImportacion")) Then
            Dim dt As DataTable = CType(HttpContext.Current.Session("GrillaDeImportacion"), DataTable)

            If Not IsNothing(HttpContext.Current.Session("GrillaDeImportacion")) Then
                Dim lstCampo As List(Of ENT_ENT_Campo) = HttpContext.Current.Session("GrillaCampos")
                eegExportar.ExportarDatos(dt, "Ingreso Almacen", lstCampo)
            Else
                eegExportar.ExportarDatos(dt, "Ingreso Almacen")
            End If
        End If
    End Sub

    <WebMethod()>
    Public Shared Function ListarCuentas(ByVal codOpe As Integer, ByVal tipLin As Integer) As List(Of ENT_MOV_Cuenta)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCuentasOperador As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(codOpe)
            Dim lstCuentas As List(Of ENT_MOV_Cuenta) = New List(Of ENT_MOV_Cuenta)

            For Each reg As ENT_MOV_Cuenta In lstCuentasOperador
                If reg.F_inCodTip = tipLin Then
                    'lstCuentas.Remove(reg)
                    lstCuentas.Add(reg)
                End If
            Next
            Return lstCuentas
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then
                Cuenta.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPlanesPorModelo(ByVal inCodMod As Integer) As List(Of ENT_MOV_Plan)
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstPlanes As List(Of ENT_MOV_Plan) = Plan.ListarPlanesPorModelo(inCodMod)
            Return lstPlanes
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then
                Plan.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarModelos(ByVal maxFilas As Integer, ByVal inTipLin As Integer, ByVal idCamp As Integer, ByVal vcNomMod As String) As List(Of ENT_MOV_ModeloDispositivo)
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtMod As DataTable = ModeloDispositivo.ListarModelos_Plantilla(inTipLin, idCamp, vcNomMod)

            Dim lstModelos As New List(Of ENT_MOV_ModeloDispositivo)
            Dim index As Integer = 1

            For Each drMod As DataRow In dtMod.Rows
                If index = maxFilas Then Exit For
                Dim oModelo As New ENT_MOV_ModeloDispositivo()
                oModelo.P_inCod = ComprobarIntNULL(drMod("P_inCod"), -1)
                oModelo.vcNom = ComprobarStringNULL(drMod("vcNom"), "")
                oModelo.btSopLin = ComprobarBoolNULL(drMod("btSopLin"), False)
                If oModelo.P_inCod <> -1 Then
                    lstModelos.Add(oModelo)
                End If
                index = index + 1
            Next

            Return lstModelos
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then
                ModeloDispositivo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarOrdenServicio(ByVal maxFilas As Integer, ByVal vcNomMod As String) As List(Of ENT_MOV_ModeloDispositivo)
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtMod As DataTable = ModeloDispositivo.ListarOrdenServicio(vcNomMod)

            Dim lstModelos As New List(Of ENT_MOV_ModeloDispositivo)
            Dim index As Integer = 1

            For Each drMod As DataRow In dtMod.Rows
                If index = maxFilas Then Exit For
                Dim oModelo As New ENT_MOV_ModeloDispositivo()
                oModelo.P_inCod = ComprobarIntNULL(drMod("Codigo"), -1)
                oModelo.vcNom = ComprobarStringNULL(drMod("Numero"), "")
                If oModelo.P_inCod <> -1 Then
                    lstModelos.Add(oModelo)
                End If
                index = index + 1
            Next

            Return lstModelos
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then
                ModeloDispositivo.Dispose()
            End If
        End Try
    End Function




    <WebMethod()>
    Public Shared Function CargarDatosExcel(ByVal inTipLin As Integer, ByVal codOpe As Integer, ByVal idCamp As Integer) As String
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtMod As DataTable = ModeloDispositivo.ListarModelos_Plantilla(inTipLin, idCamp, "")

            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCuentas As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(codOpe)

            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstPlanes As List(Of ENT_MOV_Plan) = Plan.Listar()

            Try
                'ruta movil colud (NOTA: La plantilla original se encuentra en la ruta directa, la plantilla con datos se encuentra en la ruta del cliente)
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas/"), "/")

                Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")
                'Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & "\IngresoAlmacen_Plantilla.xlsx")

                'copiar plantilla original
                File.Copy(strDirectorioPlantilla & "\IngresoAlmacen_Plantilla_Original.xlsx", strDirectorioPlantilla & CarpetaDominio & "\IngresoAlmacen_Plantilla.xlsx", True)
                Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & CarpetaDominio & "\IngresoAlmacen_Plantilla.xlsx")

                Dim xlWorksheet2 = oxlWorkbook.Worksheet(2)
                Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)

                'VALIDACIONES DE INGRESO
                'Numero celular
                xlWorksheet1.Range("C4:C10000").Style.NumberFormat.SetFormat("000000000")
                Dim dtValidNumero As IXLDataValidation = xlWorksheet1.Range("C4:C10000").SetDataValidation()
                dtValidNumero.WholeNumber.Between("100000000", "999999999")
                dtValidNumero.ShowInputMessage = False
                dtValidNumero.ShowErrorMessage = True
                dtValidNumero.ErrorTitle = "PCSistel Movil"
                dtValidNumero.ErrorMessage = "Ingrese solo números, de 9 dígitos"

                'Fecha nuevo contrato
                xlWorksheet1.Range("D1:D10000").SetDataValidation().Clear()
                xlWorksheet1.Range("D1:D10000").Style.DateFormat.Format = "dd-MM-yyyy"
                Dim dtValidFecha As IXLDataValidation = xlWorksheet1.Range("D4:D10000").SetDataValidation()
                dtValidFecha.AllowedValues = XLAllowedValues.Date
                dtValidFecha.ShowInputMessage = False
                dtValidFecha.ShowErrorMessage = True
                dtValidFecha.ErrorTitle = "PCSistel Movil"
                dtValidFecha.ErrorMessage = "Ingrese una fecha valida"

                'aplicar validacion de datos a ingreso de IMEI (max 15 dig)
                xlWorksheet1.Range("H4:H100000").SetDataValidation.Clear()
                Dim dtValidIMEI As IXLDataValidation = xlWorksheet1.Range("H4:H100000").SetDataValidation()
                dtValidIMEI.AllowedValues = XLAllowedValues.TextLength
                dtValidIMEI.MaxValue = "15"
                dtValidIMEI.MinValue = "14"
                dtValidIMEI.ShowInputMessage = False
                dtValidIMEI.ShowErrorMessage = True
                dtValidIMEI.ErrorTitle = "PCSistel Movil"
                dtValidIMEI.ErrorMessage = "IMEI puede contener 14 dígitos como mínimo y 15 dígitos como máximo"

                'CARBA DE DATOS
                'nombre columna segun tipo
                If inTipLin = 1 Then 'staff - es reparación
                    xlWorksheet1.Range("G2:G3").Merge().Value() = "Es Solicitud"
                Else 'familia - es renovación
                    xlWorksheet1.Range("G2:G3").Merge().Value() = "Es Renovación"
                End If

                'cargar modelos
                xlWorksheet2.Range("D3:E1000").Clear()
                Dim valCel As Integer = 3
                For Each dr As DataRow In dtMod.Rows
                    xlWorksheet2.Range("D" + valCel.ToString()).Value = dr("P_inCod").ToString()
                    xlWorksheet2.Range("E" + valCel.ToString()).Value = dr("vcNom").ToString().Replace("&#39", "'")
                    valCel += 1
                Next
                xlWorksheet1.Range("F4:F100000").SetDataValidation().Clear()
                Dim dtValidModelo As IXLDataValidation = xlWorksheet1.Range("F4:F100000").SetDataValidation()

                If dtMod.Rows.Count > 0 Then
                    dtValidModelo.List(xlWorksheet2.Range("$E$3:$E$" & (valCel - 1).ToString))
                Else
                    dtValidModelo.List(xlWorksheet2.Range("$E$3:$E$" & (valCel).ToString))
                End If
                dtValidModelo.ShowInputMessage = False
                dtValidModelo.ShowErrorMessage = True
                dtValidModelo.ErrorStyle = XLErrorStyle.Stop
                dtValidModelo.ErrorTitle = "PCSistel Movil"
                dtValidModelo.ErrorMessage = "Seleccione un Modelo de la lista."
                dtValidModelo.AllowedValues = XLAllowedValues.List

                'cargar cuentas
                xlWorksheet2.Range("G3:H1000").Clear()
                xlWorksheet1.Ranges("I4:I100000").SetDataValidation().Clear()
                Dim valCelCuenta As Integer = 3
                For Each oCuenta As ENT_MOV_Cuenta In lstCuentas
                    If oCuenta.F_inCodTip = inTipLin Then
                        xlWorksheet2.Range("G" + valCelCuenta.ToString()).Value = "'" + oCuenta.P_vcCod
                        xlWorksheet2.Range("H" + valCelCuenta.ToString()).Value = oCuenta.vcNom
                        valCelCuenta += 1
                    End If
                Next
                Dim dtvalidCuenta As IXLDataValidation = xlWorksheet1.Range("I4:I100000").SetDataValidation()

                If lstCuentas.Count > 0 Then
                    dtvalidCuenta.List(xlWorksheet2.Range("$G$3:$G$" & (valCelCuenta - 1).ToString))
                Else
                    dtvalidCuenta.List(xlWorksheet2.Range("$G$3:$G$" & (valCelCuenta).ToString))
                End If
                dtvalidCuenta.ShowInputMessage = False
                dtvalidCuenta.ShowErrorMessage = True
                dtvalidCuenta.ErrorStyle = XLErrorStyle.Stop
                dtvalidCuenta.ErrorTitle = "PCSistel Movil"
                dtvalidCuenta.ErrorMessage = "Seleccion una Cuenta de la lista."
                dtvalidCuenta.AllowedValues = XLAllowedValues.List

                'cargar meses de contrato
                xlWorksheet2.Range("B7:B10").Clear()
                xlWorksheet2.Range("B7").Value = "6"
                xlWorksheet2.Range("B8").Value = "12"
                xlWorksheet2.Range("B9").Value = "18"
                xlWorksheet2.Range("B10").Value = "24"
                xlWorksheet1.Range("L4:L100000").SetDataValidation().Clear()
                Dim dtvalidMesesContrato As IXLDataValidation = xlWorksheet1.Range("L4:L100000").SetDataValidation()
                dtvalidMesesContrato.List(xlWorksheet2.Range("$B$7:$B$10"))
                dtvalidMesesContrato.ShowInputMessage = False
                dtvalidMesesContrato.ShowErrorMessage = True
                dtvalidMesesContrato.ErrorStyle = XLErrorStyle.Stop
                dtvalidMesesContrato.ErrorTitle = "PCSistel Movil"
                dtvalidMesesContrato.ErrorMessage = "Seleccione un valor de la lista."
                dtvalidMesesContrato.AllowedValues = XLAllowedValues.List

                'cargar planes
                'xlWorksheet2.Ranges("J3:K1000").Clear()
                'xlWorksheet1.Ranges("M4:M100000").Clear()
                'Dim valCelPlan As Integer = 3
                'For Each oPlan As ENT_MOV_Plan In lstPlanes
                '    Dim lst As List(Of String) = oPlan.vcNom.Split("-").ToList()
                '    If lst.Count = 2 Then
                '        If lst(1).Trim() = "2014" Then
                '            xlWorksheet2.Range("J" + valCelPlan.ToString()).Value = oPlan.P_inCod
                '            xlWorksheet2.Range("K" + valCelPlan.ToString()).Value = oPlan.vcNom
                '            valCelPlan += 1
                '        End If
                '    End If
                'Next
                ''xlWorksheet1.Ranges("M4:M65000").SetDataValidation.List(xlWorksheet2.Range("$K$3:$K$" & (valCelPlan - 1).ToString))
                'Dim dtValidPlan As IXLDataValidation = xlWorksheet1.Range("M4:M100000").SetDataValidation()
                'dtValidPlan.ShowInputMessage = False
                'dtValidPlan.ShowErrorMessage = True
                'dtValidPlan.ErrorStyle = XLErrorStyle.Stop
                'dtValidPlan.ErrorTitle = "PCSistelMovil"
                'dtValidPlan.ErrorMessage = "Seleccione un Plan de la lista."
                'xlWorksheet1.Columns("M:M").Hide()

                'aplicar formato a valores duplicados (linea, IMEI)
                Dim fmtValidIMEI As IXLConditionalFormat = xlWorksheet1.Range("H4:H100000").AddConditionalFormat
                Dim fmtValidLinea As IXLConditionalFormat = xlWorksheet1.Range("C4:C100000").AddConditionalFormat
                fmtValidIMEI.WhenIsDuplicate.Fill.SetBackgroundColor(XLColor.FromHtml("#FFC8CE"))
                fmtValidIMEI.WhenIsDuplicate.Font.FontColor = XLColor.FromHtml("#9C2D75")
                fmtValidIMEI.WhenIsDuplicate.Font.Bold = True
                fmtValidLinea.WhenIsDuplicate.Fill.SetBackgroundColor(XLColor.FromHtml("#FFC8CE"))
                fmtValidLinea.WhenIsDuplicate.Font.FontColor = XLColor.FromHtml("#9C2D75")
                fmtValidLinea.WhenIsDuplicate.Font.Bold = True

                'Comentarios
                xlWorksheet1.Cell("C2").Comment.SetAuthor("PCSistelMovil").AddText("Número de la línea. Este campo es obligatorio.")
                xlWorksheet1.Cell("D2").Comment.SetAuthor("PCSistelMovil").AddText("Fecha de inicio de contrato del dispositivo y la línea. Este campo es obligatorio.")
                xlWorksheet1.Cell("F2").Comment.SetAuthor("PCSistelMovil").AddText("Seleccione un modelo de la lista. Este campo es obligatorio")
                If inTipLin = 1 Then
                    xlWorksheet1.Cell("G2").Comment.SetAuthor("PCSistelMovil").AddText("Eliga la opción ""SI"" si se está ingresando un modelo para una solicitud de tipo ""Cambio"", ""Reparación"" o ""Reposición"". Este campo es obligatorio.")
                Else
                    xlWorksheet1.Cell("G2").Comment.SetAuthor("PCSistelMovil").AddText("Eliga la opción ""SI"" si se está ingresando un modelo para renovación. Este campo es obligatorio.")
                End If
                xlWorksheet1.Cell("H2").Comment.SetAuthor("PCSistelMovil").AddText("Este campo es obligatorio.")
                xlWorksheet1.Cell("I2").Comment.SetAuthor("PCSistelMovil").AddText("Seleccione una cuenta de la lista. Este campo es obligatorio.")
                xlWorksheet1.Cell("J2").Comment.SetAuthor("PCSistelMovil").AddText("Este campo es obligatorio.")
                xlWorksheet1.Cell("L2").Comment.SetAuthor("PCSistelMovil").AddText("Selecione una opción de la lista. Este campo es obligatorio.")

                'salvar y cerrar
                oxlWorkbook.Save()
                oxlWorkbook.Dispose()


                '=================================================================================
                Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
                Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()

                Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/")
                Dim name As String = "IngresoAlmacen_Plantilla"
                Dim attachment As String = name & ".xlsx"

                If Not File.Exists(vcRutaTMP) Then
                    Directory.CreateDirectory(vcRutaTMP)
                End If

                For Each file In Directory.GetFiles(vcRutaTMP)
                    IO.File.Delete(file)
                Next

                File.Copy(strDirectorioPlantilla & CarpetaDominio & "\IngresoAlmacen_Plantilla.xlsx", vcRutaTMP + "/" + attachment, True)

                Using zip As New ZipFile
                    zip.AddDirectory(vcRutaTMP)
                    zip.Save(vcRutaTMP + "/" & name & ".zip")
                End Using

                Dim mediaName As String = vcRutaTMP & name & ".zip"
                Dim destPath As String = String.Empty
                destPath = HttpContext.Current.Server.MapPath("~/" + mediaName)

                'Dim fi As FileInfo = New FileInfo(destPath)
                'Try
                '    If (fi.Exists) Then
                '        HttpContext.Current.Response.ClearHeaders()
                '        HttpContext.Current.Response.ClearContent()
                '        HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                '        HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                '        HttpContext.Current.Response.ContentType = "application/octet-stream"
                '        HttpContext.Current.Response.TransmitFile(fi.FullName)
                '        HttpContext.Current.Response.Flush()
                '    End If
                'Catch ex As Exception
                '    HttpContext.Current.Response.ContentType = "text/plain"
                '    HttpContext.Current.Response.Write(ex.Message)
                'Finally
                '    'HttpContext.Current.Response.End()
                'End Try
                '=================================================================================

                'RESULTADOS
                '-1: No se han insertado planes para el tipo seleccionado
                '-2: No se han insertado cuentas para el tipo seleccionado
                '-3: No se han insertado modelos para el tipo seleccionado
                Dim resultado As String = If(valCelCuenta = 3, "-2", "")
                Return resultado
            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End Try
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then
                ModeloDispositivo.Dispose()
            End If
            If Cuenta IsNot Nothing Then
                Cuenta.Dispose()
            End If
            If Plan IsNot Nothing Then
                Plan.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ExportarNoProcesados() As String
        Dim dtNoProcesados As New DataTable()
        Dim resultRuta As String = String.Empty
        Try

            'Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas/"), "/")
            Dim CarpetaDominio_1 As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Request.MapPath("~/Images/Temporal/"), "/")

            dtNoProcesados = CType(HttpContext.Current.Session("GrillaErrores"), DataTable)
            'Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas" + CarpetaDominio)
            Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")
            Dim rutaOrigen As String = strDirectorioPlantilla & "\IngresoAlmacen_Plantilla.xlsx"

            Dim fecHor As DateTime = Date.Now
            Dim strDirectorioDestino As String = HttpContext.Current.Request.MapPath("~/Images/Temporal" + CarpetaDominio_1)
            Dim nombreArchivo As String = "Registros_no_procesados-" + fecHor.Year.ToString() + fecHor.Month.ToString() + fecHor.Day.ToString() + fecHor.Hour.ToString() + fecHor.Minute.ToString() + fecHor.Second.ToString() + fecHor.Millisecond.ToString() + ".xlsx"
            'Dim rutaDestino As String = strDirectorioDestino + "\Registros_no_procesados-" + fecHor.Year.ToString() + fecHor.Month.ToString() + fecHor.Day.ToString() + fecHor.Hour.ToString() + fecHor.Minute.ToString() + fecHor.Second.ToString() + fecHor.Millisecond.ToString() + ".xlsx"
            Dim rutaDestino As String = strDirectorioDestino + "\" + nombreArchivo

            File.Delete(rutaDestino)
            FileCopy(rutaOrigen, rutaDestino)
            Dim oxlWorkbook As New XLWorkbook(rutaDestino)
            Dim xlWorksheet = oxlWorkbook.Worksheet(1)
            'xlWorksheet.Range("B4:K65000").Clear()

            'Dim cellFinal As Integer = 3 + dtNoProcesados.Rows.Count
            'xlWorksheet.Range("B4:K" + cellFinal.ToString()).Value() = dtNoProcesados

            xlWorksheet.Range("O2:O3").Merge().Value() = "Descripción Error"
            xlWorksheet.Range("O2:O3").Style.Font.Bold = True
            xlWorksheet.Range("O2:O3").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center
            xlWorksheet.Range("O2:O3").Style.Alignment.Vertical = XLAlignmentVerticalValues.Center
            xlWorksheet.Range("O2:O3").Style.Fill.BackgroundColor = XLColor.Red 'XLColor.FromTheme(XLThemeColor.Accent1)
            xlWorksheet.Columns("O:O").Width = 90

            'formato de texto a columna con numeros
            Dim dataFormatLinea As IXLNumberFormat = xlWorksheet.Range("C4:C10000").Style.NumberFormat()
            Dim dataFormatIMEI As IXLNumberFormat = xlWorksheet.Range("H4:H100000").Style.NumberFormat()
            Dim dataFormatCuenta As IXLNumberFormat = xlWorksheet.Range("I4:I100000").Style.NumberFormat()
            Dim dataFormatGuia As IXLNumberFormat = xlWorksheet.Range("J4:J100000").Style.NumberFormat()
            dataFormatLinea.SetFormat("@")
            dataFormatIMEI.SetFormat("@")
            dataFormatCuenta.SetFormat("@")
            dataFormatGuia.SetFormat("@")

            Dim rowIni As Integer = 4
            For Each drNoProc As DataRow In dtNoProcesados.Rows
                xlWorksheet.Range("B" + rowIni.ToString()).Value() = drNoProc("Item").ToString()
                'xlWorksheet.Range("C" + rowIni.ToString()).Value() = "'" + drNoProc("Linea").ToString()
                xlWorksheet.Range("C" + rowIni.ToString()).Value() = drNoProc("Linea").ToString()
                xlWorksheet.Range("D" + rowIni.ToString()).Value() = drNoProc("FechaNuevoContrato").ToString()
                xlWorksheet.Range("E" + rowIni.ToString()).Value() = drNoProc("Penalidad").ToString()
                xlWorksheet.Range("F" + rowIni.ToString()).Value() = drNoProc("Modelo").ToString()
                xlWorksheet.Range("G" + rowIni.ToString()).Value() = drNoProc("EsRenovacion").ToString()
                'xlWorksheet.Range("H" + rowIni.ToString()).Value() = "'" + drNoProc("IMEI").ToString()
                xlWorksheet.Range("H" + rowIni.ToString()).Value() = drNoProc("IMEI").ToString()
                'xlWorksheet.Range("I" + rowIni.ToString()).Value() = "'" + drNoProc("NroCuenta").ToString()
                xlWorksheet.Range("I" + rowIni.ToString()).Value() = drNoProc("NroCuenta").ToString()
                'xlWorksheet.Range("J" + rowIni.ToString()).Value() = "'" + drNoProc("GUIA").ToString()
                xlWorksheet.Range("J" + rowIni.ToString()).Value() = drNoProc("GUIA").ToString()
                xlWorksheet.Range("K" + rowIni.ToString()).Value() = drNoProc("Obs").ToString()
                xlWorksheet.Range("L" + rowIni.ToString()).Value() = drNoProc("MesesContrato").ToString()
                xlWorksheet.Range("M" + rowIni.ToString()).Value() = drNoProc("PlanLinea").ToString()
                xlWorksheet.Range("N" + rowIni.ToString()).Value() = drNoProc("vcDesMod").ToString()
                xlWorksheet.Range("O" + rowIni.ToString()).Value() = drNoProc("DescError").ToString()

                rowIni = rowIni + 1
            Next
            oxlWorkbook.Save()
            oxlWorkbook.Dispose()
            resultRuta = rutaDestino
            'Return resultRuta
            Return nombreArchivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If ModeloDispositivo IsNot Nothing Then
            '    ModeloDispositivo.Dispose()
            'End If
        End Try
    End Function

    Public Shared Sub EnviarCorreosRenovacion(ByVal dtRenovacionProcesadas As DataTable)
        Dim textoPlantilla As String = String.Empty
        Dim cuerpoCorreo As String = String.Empty
        Dim Cola As BL_MOV_Cola = Nothing
        Try
            If dtRenovacionProcesadas.Rows.Count > 0 Then
                textoPlantilla = TraeCuerpoCorreo(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Plantillas/Solicitud_5_Renovar.htm"))
                Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim dtHoy As DateTime = Date.Now
                For Each dr As DataRow In dtRenovacionProcesadas.Rows
                    cuerpoCorreo = String.Format(textoPlantilla, dr("IdEmpleado").ToString(), dr("EMPL_vcNOMEMP").ToString(), dr("Linea").ToString(),
                                                 dr("CodigoPedido").ToString(), dr("Modelo").ToString(), dr("FechaRecojo").ToString(), dtHoy.ToString())
                    Dim oCola As New ENT_MOV_Cola
                    oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                    oCola.vcAsunto = "Dispositivo de renovación ingresado a almacén"
                    oCola.vcDescripcion = cuerpoCorreo
                    If dr("EMPL_vcCORPER") IsNot Nothing AndAlso dr("EMPL_vcCORPER").ToString() <> "" Then
                        oCola.vcMailTo = dr("EMPL_vcCORPER").Trim()
                        oCola.vcMailFrom = ""
                        Cola.Insertar(oCola)
                    End If
                Next
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Sub

    Public Shared Function RenombrarColumnas(ByVal columns As DataColumnCollection, ByVal vcDesc As String) As String
        Dim Mensaje1 As String = String.Empty
        Dim Mensaje2 As String = String.Empty
        Dim vcIndices As String, vcResultado As String = "Columnas("
        Dim i1 As Integer = vcDesc.IndexOf("Columnas(")
        Mensaje1 = vcDesc.Substring(0, i1)
        vcIndices = vcDesc.Substring(i1 + 9)
        Dim i2 As Integer = vcIndices.IndexOf(")")
        Mensaje2 = vcIndices.Substring(i2 + 1)
        vcIndices = vcIndices.Substring(0, i2)
        Dim lstIndices As List(Of String) = vcIndices.Split(",").ToList()
        For Each ind As Integer In lstIndices
            vcResultado = vcResultado + columns(ind - 1).ColumnName + ","
        Next
        vcResultado = vcResultado.Substring(0, vcResultado.Length - 1) + ")"
        Return Mensaje1 + vcResultado + Mensaje2
    End Function

    <WebMethod()>
    Public Shared Function ListarLineas(ByVal vcNumLin As String, ByVal inTipLin As Integer, ByVal inCodOpe As Integer, ByVal idCampana As Integer) As List(Of ENT_MOV_Linea)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Dim dtResult As DataTable = Linea.ListarDatosLineaConRequerimiento(vcNumLin, inTipLin, inCodOpe, idCampana)
            Dim lstLinea As New List(Of ENT_MOV_Linea)

            For Each dr As DataRow In dtResult.Rows
                Dim oLinea As New ENT_MOV_Linea()
                oLinea.P_vcNum = ComprobarStringNULL(dr("Linea"), "")
                oLinea.Empleado.P_vcCod = ComprobarStringNULL(dr("CodEmpleado"), "")
                oLinea.Empleado.vcNom = ComprobarStringNULL(dr("NomEmpleado"), "")
                oLinea.Dispositivo.ModeloDispositivo.P_inCod = ComprobarIntNULL(dr("CodigoModelo"), 0)
                oLinea.Dispositivo.ModeloDispositivo.vcNom = ComprobarStringNULL(dr("NombreModelo"), "")
                oLinea.Cuenta.P_vcCod = ComprobarStringNULL(dr("CodCuenta"), "")
                oLinea.Cuenta.vcNom = ComprobarStringNULL(dr("NomCuenta"), "")
                oLinea.MesesContrato = ComprobarIntNULL(dr("MesesContrato"), -1)

                oLinea.CCNombre = ComprobarStringNULL(dr("Codigo"), "") 'codigo de la solicitud o del pedido
                oLinea.CCNumero = ComprobarStringNULL(dr("Tipo"), "") 'tipo de solicitud o de pedido

                oLinea.Dispositivo.P_vcCodIMEI = ComprobarStringNULL(dr("IMEI_Fin"), "")

                lstLinea.Add(oLinea)
            Next

            Return lstLinea
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
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

    '<WebMethod()>
    'Public Shared Function CargarDatosExcelAlmacen(ByVal inTipLin As Integer, ByVal codOpe As Integer, ByVal idCamp As Integer) As String

    <WebMethod()>
    Public Shared Function CargarDatosExcelAlmacen(ByVal pinTipLin As String, ByVal pcodOpe As String, ByVal pidCamp As String) As String

        Dim inTipLin As Integer = Convert.ToInt32(pinTipLin)
        Dim codOpe As Integer = Convert.ToInt32(pcodOpe)
        Dim idCamp As Integer = Convert.ToInt32(pidCamp)

        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtMod As DataTable = ModeloDispositivo.ListarModelos_Plantilla(inTipLin, idCamp, "")

            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCuentas As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(codOpe)

            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstPlanes As List(Of ENT_MOV_Plan) = Plan.Listar()

            Try
                'ruta movil colud (NOTA: La plantilla original se encuentra en la ruta directa, la plantilla con datos se encuentra en la ruta del cliente)
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas/"), "/")

                Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")
                'Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & "\IngresoAlmacen_Plantilla.xlsx")

                'ECONDEÑA   10/10/2016
                File.Delete(strDirectorioPlantilla & CarpetaDominio & "\IngresoAlmacen_Plantilla.xlsx")
                'copiar plantilla original
                File.Copy(strDirectorioPlantilla & "\IngresoAlmacen_Plantilla_Original.xlsx", strDirectorioPlantilla & CarpetaDominio & "\IngresoAlmacen_Plantilla.xlsx", True)
                Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & CarpetaDominio & "\IngresoAlmacen_Plantilla.xlsx")

                Dim xlWorksheet2 = oxlWorkbook.Worksheet(2)
                Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)

                'VALIDACIONES DE INGRESO
                'Numero celular
                xlWorksheet1.Range("C4:C10000").Style.NumberFormat.SetFormat("0000000")
                Dim dtValidNumero As IXLDataValidation = xlWorksheet1.Range("C4:C10000").SetDataValidation()
                dtValidNumero.WholeNumber.Between("1000000", "99999999999")
                dtValidNumero.ShowInputMessage = False
                dtValidNumero.ShowErrorMessage = True
                dtValidNumero.ErrorTitle = "PCSistel Móvil"
                'dtValidNumero.ErrorMessage = "Ingrese solo números, de 9 dígitos"
                dtValidNumero.ErrorMessage = "Ingrese números validos, No menores de 7 caracteres"

                'Fecha nuevo contrato
                xlWorksheet1.Range("D1:D10000").SetDataValidation().Clear()
                xlWorksheet1.Range("D1:D10000").Style.DateFormat.Format = "dd-MM-yyyy"
                Dim dtValidFecha As IXLDataValidation = xlWorksheet1.Range("D4:D10000").SetDataValidation()
                dtValidFecha.AllowedValues = XLAllowedValues.Date
                dtValidFecha.ShowInputMessage = False
                dtValidFecha.ShowErrorMessage = True
                dtValidFecha.ErrorTitle = "PCSistel Móvil"
                dtValidFecha.ErrorMessage = "Ingrese una fecha valida"

                'aplicar validacion de datos a ingreso de IMEI (max 15 dig)
                xlWorksheet1.Range("H4:H100000").SetDataValidation.Clear()
                Dim dtValidIMEI As IXLDataValidation = xlWorksheet1.Range("H4:H100000").SetDataValidation()
                dtValidIMEI.AllowedValues = XLAllowedValues.TextLength
                dtValidIMEI.MaxValue = "15"
                dtValidIMEI.MinValue = "14"
                dtValidIMEI.ShowInputMessage = False
                dtValidIMEI.ShowErrorMessage = True
                dtValidIMEI.ErrorTitle = "PCSistel Móvil"
                dtValidIMEI.ErrorMessage = "IMEI puede contener 14 dígitos como mínimo y 15 dígitos como máximo"

                'CARBA DE DATOS
                'nombre columna segun tipo
                If inTipLin = 1 Then 'staff - es reparación
                    xlWorksheet1.Range("G2:G3").Merge().Value() = "Es Solicitud"
                Else 'familia - es renovación
                    xlWorksheet1.Range("G2:G3").Merge().Value() = "Es Renovación"
                End If

                'cargar modelos
                xlWorksheet2.Range("D3:E1000").Clear()
                Dim valCel As Integer = 3
                For Each dr As DataRow In dtMod.Rows
                    xlWorksheet2.Range("D" + valCel.ToString()).Value = dr("P_inCod").ToString()
                    xlWorksheet2.Range("E" + valCel.ToString()).Value = dr("vcNom").ToString().Replace("&#39", "'")
                    valCel += 1
                Next
                xlWorksheet1.Range("F4:F100000").SetDataValidation().Clear()
                Dim dtValidModelo As IXLDataValidation = xlWorksheet1.Range("F4:F100000").SetDataValidation()

                If dtMod.Rows.Count > 0 Then
                    dtValidModelo.List(xlWorksheet2.Range("$E$3:$E$" & (valCel - 1).ToString))
                Else
                    dtValidModelo.List(xlWorksheet2.Range("$E$3:$E$" & (valCel).ToString))
                End If

                dtValidModelo.ShowInputMessage = False
                dtValidModelo.ShowErrorMessage = True
                dtValidModelo.ErrorStyle = XLErrorStyle.Stop
                dtValidModelo.ErrorTitle = "PCSistel Móvil"
                dtValidModelo.ErrorMessage = "Seleccione un Modelo de la lista."
                dtValidModelo.AllowedValues = XLAllowedValues.List

                'cargar cuentas
                xlWorksheet2.Range("G3:H1000").Clear()
                xlWorksheet1.Ranges("I4:I100000").SetDataValidation().Clear()
                Dim valCelCuenta As Integer = 3
                For Each oCuenta As ENT_MOV_Cuenta In lstCuentas
                    If oCuenta.F_inCodTip = inTipLin Then
                        xlWorksheet2.Range("G" + valCelCuenta.ToString()).Value = "'" + oCuenta.P_vcCod
                        xlWorksheet2.Range("H" + valCelCuenta.ToString()).Value = oCuenta.vcNom
                        valCelCuenta += 1
                    End If
                Next
                Dim dtvalidCuenta As IXLDataValidation = xlWorksheet1.Range("I4:I100000").SetDataValidation()

                If lstCuentas.Count > 0 Then
                    dtvalidCuenta.List(xlWorksheet2.Range("$G$3:$G$" & (valCelCuenta - 1).ToString))
                Else
                    dtvalidCuenta.List(xlWorksheet2.Range("$G$3:$G$" & (valCelCuenta).ToString))
                End If


                dtvalidCuenta.ShowInputMessage = False
                dtvalidCuenta.ShowErrorMessage = True
                dtvalidCuenta.ErrorStyle = XLErrorStyle.Stop
                dtvalidCuenta.ErrorTitle = "PCSistel Móvil"
                dtvalidCuenta.ErrorMessage = "Seleccion una Cuenta de la lista."
                dtvalidCuenta.AllowedValues = XLAllowedValues.List

                'cargar meses de contrato
                xlWorksheet2.Range("B7:B10").Clear()
                xlWorksheet2.Range("B7").Value = "6"
                xlWorksheet2.Range("B8").Value = "12"
                xlWorksheet2.Range("B9").Value = "18"
                xlWorksheet2.Range("B10").Value = "24"
                xlWorksheet1.Range("L4:L100000").SetDataValidation().Clear()
                Dim dtvalidMesesContrato As IXLDataValidation = xlWorksheet1.Range("L4:L100000").SetDataValidation()
                dtvalidMesesContrato.List(xlWorksheet2.Range("$B$7:$B$10"))
                dtvalidMesesContrato.ShowInputMessage = False
                dtvalidMesesContrato.ShowErrorMessage = True
                dtvalidMesesContrato.ErrorStyle = XLErrorStyle.Stop
                dtvalidMesesContrato.ErrorTitle = "PCSistel Móvil"
                dtvalidMesesContrato.ErrorMessage = "Seleccione un valor de la lista."
                dtvalidMesesContrato.AllowedValues = XLAllowedValues.List

                'cargar planes
                'xlWorksheet2.Ranges("J3:K1000").Clear()
                'xlWorksheet1.Ranges("M4:M100000").Clear()
                'Dim valCelPlan As Integer = 3
                'For Each oPlan As ENT_MOV_Plan In lstPlanes
                '    Dim lst As List(Of String) = oPlan.vcNom.Split("-").ToList()
                '    If lst.Count = 2 Then
                '        If lst(1).Trim() = "2014" Then
                '            xlWorksheet2.Range("J" + valCelPlan.ToString()).Value = oPlan.P_inCod
                '            xlWorksheet2.Range("K" + valCelPlan.ToString()).Value = oPlan.vcNom
                '            valCelPlan += 1
                '        End If
                '    End If
                'Next
                ''xlWorksheet1.Ranges("M4:M65000").SetDataValidation.List(xlWorksheet2.Range("$K$3:$K$" & (valCelPlan - 1).ToString))
                'Dim dtValidPlan As IXLDataValidation = xlWorksheet1.Range("M4:M100000").SetDataValidation()
                'dtValidPlan.ShowInputMessage = False
                'dtValidPlan.ShowErrorMessage = True
                'dtValidPlan.ErrorStyle = XLErrorStyle.Stop
                'dtValidPlan.ErrorTitle = "PCSistelMovil"
                'dtValidPlan.ErrorMessage = "Seleccione un Plan de la lista."
                'xlWorksheet1.Columns("M:M").Hide()

                'aplicar formato a valores duplicados (linea, IMEI)
                Dim fmtValidIMEI As IXLConditionalFormat = xlWorksheet1.Range("H4:H100000").AddConditionalFormat
                Dim fmtValidLinea As IXLConditionalFormat = xlWorksheet1.Range("C4:C100000").AddConditionalFormat
                fmtValidIMEI.WhenIsDuplicate.Fill.SetBackgroundColor(XLColor.FromHtml("#FFC8CE"))
                fmtValidIMEI.WhenIsDuplicate.Font.FontColor = XLColor.FromHtml("#9C2D75")
                fmtValidIMEI.WhenIsDuplicate.Font.Bold = True
                fmtValidLinea.WhenIsDuplicate.Fill.SetBackgroundColor(XLColor.FromHtml("#FFC8CE"))
                fmtValidLinea.WhenIsDuplicate.Font.FontColor = XLColor.FromHtml("#9C2D75")
                fmtValidLinea.WhenIsDuplicate.Font.Bold = True

                'Comentarios
                xlWorksheet1.Cell("C2").Comment.SetAuthor("PCSistelMovil").AddText("Número de la línea. Este campo es obligatorio.")
                xlWorksheet1.Cell("D2").Comment.SetAuthor("PCSistelMovil").AddText("Fecha de inicio de contrato del dispositivo y la línea. Este campo es obligatorio.")
                xlWorksheet1.Cell("F2").Comment.SetAuthor("PCSistelMovil").AddText("Seleccione un modelo de la lista. Este campo es obligatorio")
                If inTipLin = 1 Then
                    xlWorksheet1.Cell("G2").Comment.SetAuthor("PCSistelMovil").AddText("Eliga la opción ""SI"" si se está ingresando un modelo para una solicitud de tipo ""Cambio"", ""Reparación"" o ""Reposición"". Este campo es obligatorio.")
                Else
                    xlWorksheet1.Cell("G2").Comment.SetAuthor("PCSistelMovil").AddText("Eliga la opción ""SI"" si se está ingresando un modelo para renovación. Este campo es obligatorio.")
                End If
                xlWorksheet1.Cell("H2").Comment.SetAuthor("PCSistelMovil").AddText("Este campo es obligatorio.")
                xlWorksheet1.Cell("I2").Comment.SetAuthor("PCSistelMovil").AddText("Seleccione una cuenta de la lista. Este campo es obligatorio.")
                xlWorksheet1.Cell("J2").Comment.SetAuthor("PCSistelMovil").AddText("Este campo es obligatorio.")
                xlWorksheet1.Cell("L2").Comment.SetAuthor("PCSistelMovil").AddText("Selecione una opción de la lista. Este campo es obligatorio.")

                'salvar y cerrar
                oxlWorkbook.Save()
                oxlWorkbook.Dispose()

                '=================================================================================
                Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
                Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()

                Dim adicionalnombre As String = UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario)
                Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + adicionalnombre + "/")
                Dim name As String = "IngresoAlmacen_Plantilla"
                Dim attachment As String = name & ".xlsx"

                If Not File.Exists(vcRutaTMP) Then
                    Directory.CreateDirectory(vcRutaTMP)
                End If

                For Each file In Directory.GetFiles(vcRutaTMP)
                    IO.File.Delete(file)
                Next

                File.Copy(strDirectorioPlantilla & CarpetaDominio & "\IngresoAlmacen_Plantilla.xlsx", vcRutaTMP + "/" + attachment, True)

                Using zip As New ZipFile
                    zip.AddDirectory(vcRutaTMP)
                    zip.Save(vcRutaTMP + "/" & name & ".zip")
                End Using

                Dim mediaName As String = vcRutaTMP & name & ".zip"
                Dim destPath As String = String.Empty
                destPath = vcRutaTMP

                'Dim fi As FileInfo = New FileInfo(destPath)
                'Try
                '    If (fi.Exists) Then
                '        HttpContext.Current.Response.ClearHeaders()
                '        HttpContext.Current.Response.ClearContent()
                '        HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                '        HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                '        HttpContext.Current.Response.ContentType = "application/octet-stream"
                '        HttpContext.Current.Response.TransmitFile(fi.FullName)
                '        HttpContext.Current.Response.Flush()
                '    End If
                'Catch ex As Exception
                '    HttpContext.Current.Response.ContentType = "text/plain"
                '    HttpContext.Current.Response.Write(ex.Message)
                'Finally
                '    'HttpContext.Current.Response.End()
                'End Try
                '=================================================================================

                'RESULTADOS
                '-1: No se han insertado planes para el tipo seleccionado
                '-2: No se han insertado cuentas para el tipo seleccionado
                '-3: No se han insertado modelos para el tipo seleccionado
                'Dim resultado As String = If(valCelCuenta = 3, "-2", "")

                Dim resultado As String = If(valCelCuenta = 3, "-2", "P_Movil/Administrar/Temporal/" + adicionalnombre + "/IngresoAlmacen_Plantilla.zip")

                Return resultado
            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End Try
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then
                ModeloDispositivo.Dispose()
            End If
            If Cuenta IsNot Nothing Then
                Cuenta.Dispose()
            End If
            If Plan IsNot Nothing Then
                Plan.Dispose()
            End If
        End Try
    End Function
End Class
