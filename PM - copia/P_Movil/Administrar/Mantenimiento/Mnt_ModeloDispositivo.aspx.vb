Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria
Imports System.Globalization
Imports System.Threading

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_ModeloDispositivo
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Parametro As BL_MOV_Parametros = Nothing
        Dim TipoServicio As BL_MOV_TipoServicio = Nothing
        Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo = Nothing
        Dim ModeloDispositivoOperador As BL_MOV_ModeloDispositivoOperador = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            Dim P_inCod As String = Request.QueryString("Cod")
            hdfModeloDispositivo.Value = P_inCod
            TipoServicio = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'txtPrecioLista.Attributes.Add("camp", "dePreLis")
            'txtPrecioLista.Attributes.Add("tipDat", "decimal(8,4)")
            'txtPrecioEspecial.Attributes.Add("camp", "dePreEsp")
            'txtPrecioEspecial.Attributes.Add("tipDat", "decimal(8,4)")
            'txtCostoEquipo.Attributes.Add("camp", "deCosRep")
            'txtCostoEquipo.Attributes.Add("tipDat", "decimal(8,4)")
            'txtCostoReposicion.Attributes.Add("camp", "deCosEqu")
            'txtCostoReposicion.Attributes.Add("tipDat", "decimal(8,4)")

            Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(0, "-Seleccione-")
            Operador.Dispose()
            Dim lstTipoModeloDispositivo As List(Of ENT_MOV_TipoModeloDispositivo) = TipoModeloDispositivo.ListarModeloDispositivo()

            UtilitarioWeb.Dataddl(ddlTipo, lstTipoModeloDispositivo, "Descripcion", "IdTipoModeloDispositivo")
            UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")

            If Not IsNothing(P_inCod) Then
                GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_ModeloDispositivo", tbCamposDinamicos, "", "../../../", "P_inCod", P_inCod)
            Else
                GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_ModeloDispositivo", tbCamposDinamicos, "", "../../../", "", "")
            End If
            GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_ModeloDispositivoOperador", tbCamposOperador, "PRECIOS")



            If Not IsPostBack Then



                bpMarca.NombreEntidad = "Marca"
                bpMarca.vcTab = "MOV_Marca"
                bpMarca.TipoOrigen = 0
                bpMarca.Condicion = "btEst = 1"
                bpMarca.FuncionPersonalizada = "fnMostrarMarca"
                bpMarca.RutaRaiz = "../../../"
                bpMarca.EsDinamico = True
                bpMarca.Contenedor = "dvMarca"
                ''If ((hdfEstado.Value = "8" And hdfEstado_Apr.Value = "34") Or (hdfEstado.Value = "7" And hdfEstado_Apr.Value = "34")) Then
                'If (hdfEstado.Value <> "6") Then
                '    bpMarca.CodigoValor = dtDatosSolicitud.Rows(0)("inTecnicoAsignado").ToString()
                '    bpMarca.Deshabilitado = True
                'End If

                hdfArchivo.Value = Guid.NewGuid().ToString()

                'tipo de chip 'agregado 13/08/2014 wapumayta
                Parametro = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                UtilitarioWeb.Dataddl(ddlTipoChip, Parametro.ListarPorGrupo("TipoChip"), "Valor", "Clave")
                ddlTipoChip.Items.Insert(0, New ListItem("-Seleccione-", "-1"))
                'fin tipo de chip

                If Not IsNothing(P_inCod) Then
                    Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    ModeloDispositivoOperador = New BL_MOV_ModeloDispositivoOperador(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim ds As DataSet = ModeloDispositivo.Mostrar(Integer.Parse(P_inCod))
                    Dim oModeloDispositivo As DataTable = ds.Tables(0)
                    Dim tbPlanesPorModelo As DataTable = ds.Tables(1)


                    bpMarca.CodigoValor = oModeloDispositivo.Rows(0)("F_inCodMarca").ToString()

                    Dim CodPlanes As String = ""
                    Dim NomPlanes As String = ""
                    For i As Integer = 0 To tbPlanesPorModelo.Rows.Count - 1
                        CodPlanes += tbPlanesPorModelo.Rows(i)("F_inCodPla") & ","
                        NomPlanes += tbPlanesPorModelo.Rows(i)("vcNom") & "*,"
                    Next
                    hdfCodPlanes.Value = CodPlanes
                    hdfNomPlanes.Value = NomPlanes

                    Dim oModeloDispositivoOperador As DataTable = ModeloDispositivoOperador.Mostrar(Integer.Parse(ddlOperador.SelectedValue), Integer.Parse(P_inCod))

                    Dim lstGrupoAgregado As New List(Of Object)
                    Dim lstGrupoNoAgregado As New List(Of Object)
                    Dim oSerializer As New JavaScriptSerializer

                    For Each oGrupo As ENT_GEN_Grupo In ModeloDispositivo.ListarGrupoSinModelo(Integer.Parse(P_inCod))
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("Codigo", oGrupo.P_inCod)
                        dict.Add("Valor", oGrupo.vcNom)

                        lstGrupoNoAgregado.Add(dict)
                    Next

                    For Each oGrupo As ENT_GEN_Grupo In ModeloDispositivo.ListarGrupoxModelo(Integer.Parse(P_inCod))
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("Codigo", oGrupo.P_inCod)
                        dict.Add("Valor", oGrupo.vcNom)

                        lstGrupoAgregado.Add(dict)
                    Next

                    ModeloDispositivo.Dispose()
                    hdfddlGrupo.Value = oSerializer.Serialize(lstGrupoNoAgregado)
                    hdflstGrupo.Value = oSerializer.Serialize(lstGrupoAgregado)

                    Dim dtModelosPorOperador As DataTable = ModeloDispositivoOperador.Mostrar(0, Integer.Parse(P_inCod))
                    Dim lstOperadorAgregado As New List(Of Object)


                    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

                    For Each oOperador As ENT_GEN_Operador In lstOperador
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("P_F_inCodOpe", oOperador.P_inCodOpe.ToString())
                        dict.Add("dePreLis", "")
                        dict.Add("dePreEsp", "")
                        dict.Add("deCosEqu", "")
                        'dict.Add("deCosRep", "")
                        'dict.Add("daPerRob", "")

                        For i As Integer = 0 To dtModelosPorOperador.Rows.Count - 1
                            If dtModelosPorOperador.Rows(i)("P_F_inCodOpe").ToString() = oOperador.P_inCodOpe.ToString() Then
                                If oCultura.vcCodCul.ToString() = "es-PE" Then
                                    dict.Item("dePreLis") = UtilitarioWeb.DevuelveNumeroFormateado(dtModelosPorOperador.Rows(i)("dePreLis").ToString(), strForNum)
                                    dict.Item("dePreEsp") = UtilitarioWeb.DevuelveNumeroFormateado(dtModelosPorOperador.Rows(i)("dePreEsp").ToString(), strForNum)
                                    dict.Item("deCosEqu") = UtilitarioWeb.DevuelveNumeroFormateado(dtModelosPorOperador.Rows(i)("deCosEqu").ToString(), strForNum)
                                    'dict.Item("deCosRep") = dtModelosPorOperador.Rows(i)("deCosRep").ToString()
                                    'dict.Item("daPerRob") = dtModelosPorOperador.Rows(i)("daPerRob").ToString()
                                Else
                                    Dim ciNuevaCultura As New CultureInfo("es-PE")
                                    Thread.CurrentThread.CurrentCulture = ciNuevaCultura
                                    dict.Item("dePreLis") = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(dtModelosPorOperador.Rows(i)("dePreLis").ToString(), oCultura).ToString()
                                    dict.Item("dePreEsp") = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(dtModelosPorOperador.Rows(i)("dePreEsp").ToString(), oCultura).ToString()
                                    dict.Item("deCosEqu") = UtilitarioWeb.DevuelveNumeroFormateado_MultiPais(dtModelosPorOperador.Rows(i)("deCosEqu").ToString(), oCultura).ToString()
                                    'dict.Item("deCosRep") = dtModelosPorOperador.Rows(i)("deCosRep").ToString()
                                    'dict.Item("daPerRob") = dtModelosPorOperador.Rows(i)("daPerRob").ToString()
                                End If

                            End If
                        Next

                        lstOperadorAgregado.Add(dict)
                    Next

                    'For i As Integer = 0 To dtModelosPorOperador.Rows.Count - 1
                    '    Dim dict As New Dictionary(Of String, Object)

                    '    dict.Add("P_F_inCodOpe", dtModelosPorOperador.Rows(i)("P_F_inCodOpe").ToString())

                    '    For j As Integer = 2 To dtModelosPorOperador.Columns.Count - 1
                    '        dict.Add(dtModelosPorOperador.Columns(j).ColumnName, dtModelosPorOperador.Rows(i)(j).ToString())
                    '    Next

                    '    lstOperadorAgregado.Add(dict)
                    'Next

                    hdfOperadores.Value = oSerializer.Serialize(lstOperadorAgregado)

                    txtNombre.Text = oModeloDispositivo(0)("vcNom").ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                    txtDescripcion.Text = oModeloDispositivo(0)("vcDes").ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")

                    chkEstado.Checked = Convert.ToBoolean(oModeloDispositivo(0)("btVig"))

                    UtilitarioWeb.Dataddl(ddlTipoServicio, TipoServicio.Listar_porIdTipoModeloDispositivo(CInt(IIf(oModeloDispositivo(0)("IdTipoModeloDispositivo").ToString() = "", 1, oModeloDispositivo(0)("IdTipoModeloDispositivo"))), -1, "--Seleccionar--"), "vcNom", "P_inCodTipSer")
                    ddlTipoServicio.SelectedValue = UtilitarioWeb.ComprobarIntNULL("0" + oModeloDispositivo(0)("F_inCodTipSer"), -1).ToString() 'oLinea.dcPerFacIni.ToString()                
                    ddlTipo.SelectedValue = UtilitarioWeb.ComprobarIntNULL("0" + oModeloDispositivo(0)("IdTipoModeloDispositivo"), -1).ToString() 'oLinea.dcPerFacIni.ToString()

                    If chkEstado.Checked Then
                        trEstado.Style("display") = "none"
                    End If

                    'comentado 23-08-2013
                    'If Not IsDBNull(oModeloDispositivo(0)("imIma")) Then
                    '    Dim barrImg As Byte() = CType(oModeloDispositivo(0)("imIma"), Byte())
                    '    Dim archivo As String = oModeloDispositivo(0)("P_inCod").ToString & ".jpg"
                    '    Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/" + archivo)
                    '    Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                    '    fs.Write(barrImg, 0, barrImg.Length)
                    '    fs.Flush()
                    '    fs.Close()
                    '    imgImagen.Src = "../../../Images/ModeloDispositivo/" + archivo
                    '    imgImagen.Alt = oModeloDispositivo(0)("vcNom").ToString
                    '    imgImagen.Width = 150
                    '    imgImagen.Height = 150
                    'Else
                    '    imgImagen.Width = 150
                    '    imgImagen.Height = 150
                    '    imgImagen.Src = "../../../Common/Images/Mantenimiento/NoDisponible.jpg"
                    '    imgImagen.Alt = "Imagen no disponible"
                    'End If

                    'Obtiene Valores de Campos Dinamicos...

                    'tipo de chip
                    ddlTipoChip.SelectedValue = If(IsDBNull(oModeloDispositivo(0)("vcTipoChip")), "-1", oModeloDispositivo(0)("vcTipoChip").ToString())
                    'fin tipo de chip

                    GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("MOV_ModeloDispositivo", Me, oModeloDispositivo)
                    GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("MOV_ModeloDispositivoOperador", Me, oModeloDispositivoOperador)

                Else
                    UtilitarioWeb.Dataddl(ddlTipoServicio, TipoServicio.Listar_porIdTipoModeloDispositivo(lstTipoModeloDispositivo(0).IdTipoModeloDispositivo, -1, "--Seleccionar--"), "vcNom", "P_inCodTipSer")
                    Dim M_GRUP As BL_GEN_Grupo = New BL_GEN_Grupo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstGrupo As New List(Of Object)
                    Dim oSerializer As New JavaScriptSerializer

                    'comentado 23-08-2013
                    'imgImagen.Width = 150
                    'imgImagen.Height = 150
                    'imgImagen.Src = "../../../Common/Images/Mantenimiento/NoDisponible.jpg"
                    'imgImagen.Alt = "Imagen no disponible"
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    For Each oGrupo As ENT_GEN_Grupo In M_GRUP.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value))
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("Codigo", oGrupo.P_inCod)
                        dict.Add("Valor", oGrupo.vcNom)

                        lstGrupo.Add(dict)
                    Next
                    M_GRUP.Dispose()
                    hdfddlGrupo.Value = oSerializer.Serialize(lstGrupo)
                    hdflstGrupo.Value = ""

                    trEstado.Style("display") = "none"
                End If
                txtNombre.Focus()
            End If

            If Not IsNothing(Request.QueryString("IsLigero")) AndAlso Request.QueryString("IsLigero") = "1" Then
                hdfOcultarCamposLigero.Value = "1"
            End If
            hdfTipoLinea.Value = ""
            If Not IsNothing(Request.QueryString("inTipoLinea")) Then
                hdfTipoLinea.Value = Request.QueryString("inTipoLinea")
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(TipoServicio) Then TipoServicio.Dispose()
            If Not IsNothing(ModeloDispositivoOperador) Then ModeloDispositivoOperador.Dispose()
            If Not IsNothing(Parametro) Then Parametro.Dispose()
            If Not IsNothing(TipoModeloDispositivo) Then TipoModeloDispositivo.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function CargarRolesActualizados(ByVal P_inCod As String) As String
        Dim M_GRUP As BL_GEN_Grupo = New BL_GEN_Grupo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstGrupoAct As New List(Of Object)
        Dim oSerializer As New JavaScriptSerializer

        For Each oGrupo As ENT_GEN_Grupo In M_GRUP.Listar(0)
            Dim dict As New Dictionary(Of String, Object)

            dict.Add("Codigo", oGrupo.P_inCod)
            dict.Add("Valor", oGrupo.vcNom)

            lstGrupoAct.Add(dict)
        Next
        M_GRUP.Dispose()
        Return oSerializer.Serialize(lstGrupoAct)
        'hdflstGrupo.Value = ""
    End Function

   <WebMethod()>
   Public Shared Function ObtenerTipoServicio_porIdTipoModeloDispisitivo(ByVal prIdTipoModeloDispositivo As Integer) As List(Of ENT_MOV_TipoServicio)
      Dim TipoServicio As BL_MOV_TipoServicio = Nothing
      Try
         TipoServicio = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Return TipoServicio.Listar_porIdTipoModeloDispositivo(prIdTipoModeloDispositivo, -1, "--Seleccionar--")
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Not IsNothing(TipoServicio) Then TipoServicio.Dispose()
      End Try

      'hdflstGrupo.Value = ""
   End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal inCod As String, ByVal vcNomModDis As String, ByVal Grupos As String, ByVal vcCamDim As String, ByVal vcArc As String,
                              ByVal btVig As String, ByVal inCodTipSer As String, ByVal vcNomCamXML As String, ByVal vcTipDatXML As String,
                              ByVal XMLOperador As String, ByVal vcDesc As String, ByVal vcPlanes As String, ByVal vcTipoChip As String,
                              ByVal vcAdj As String, ByVal F_inCodMarca As String)

        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing
        Try
            Dim resultado As Integer = 0
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oModeloDispositivo As New ENT_MOV_ModeloDispositivo
            Dim oSerializer As New JavaScriptSerializer

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


            If inCod = "" Then
                oModeloDispositivo.P_inCod = 0
            Else
                oModeloDispositivo.P_inCod = Convert.ToInt32(inCod)
            End If
            oModeloDispositivo.vcNom = vcNomModDis

            If btVig = "1" Then
                oModeloDispositivo.btVig = True
            Else
                oModeloDispositivo.btVig = False
            End If
            oModeloDispositivo.F_inCodTipSer = Convert.ToInt32(inCodTipSer)
            oModeloDispositivo.vcDesc = vcDesc
            If F_inCodMarca <> "" Then
                oModeloDispositivo.F_inCodMarca = F_inCodMarca
            Else
                oModeloDispositivo.F_inCodMarca = 0
            End If

            If Grupos <> "" Then
                Grupos = Grupos.Substring(0, Grupos.Length - 1)
            End If

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/ModeloDispositivo/"), "/")

            Dim strfn As String = HttpContext.Current.Server.MapPath("~/Images/ModeloDispositivo" + CarpetaDominio + "/Modelo" & vcArc & ".jpg")
            If File.Exists(strfn) Then
                Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                    Dim imgBinaryData(fs.Length) As Byte
                    fs.Read(imgBinaryData, 0, imgBinaryData.Length)
                    oModeloDispositivo.Imagen = imgBinaryData
                    fs.Flush()
                    fs.Close()
                End Using
                File.Delete(strfn)
            End If

            If vcNomCamXML.Trim().Length > 0 Then
                vcNomCamXML = vcNomCamXML.Substring(0, vcNomCamXML.Length - 1)
            End If

            If vcTipDatXML.Trim().Length > 0 Then
                vcTipDatXML = vcTipDatXML.Substring(0, vcTipDatXML.Length - 1)
            End If

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Móvil"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Modelo Dispositivo"
            oAuditoria.Tabla = "MOV_ModeloDispositivo" 'Constantes.TableNames.ModeloDispositivoMovil

            Dim strAntes As String = ""
            oModeloDispositivo.vcTipoChip = vcTipoChip
            If inCod = "" Then
                resultado = ModeloDispositivo.Insertar(oModeloDispositivo, Grupos, vcCamDim, vcNomCamXML, vcTipDatXML, XMLOperador, vcPlanes)
                If resultado <> 0 Then

                    'Actualizar adjuntos...
                    oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_ModeloDispositivo", "P_inCod", resultado.ToString())

                    oAuditoria.Insertar(New String() {resultado})
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {oModeloDispositivo.P_inCod})
                XMLOperador = XMLOperador.Replace("P_F_inCodModDis=""0""", "P_F_inCodModDis=""" & oModeloDispositivo.P_inCod & """")
                vcTipDatXML = vcTipDatXML.Replace("DATE", "DATETIME") 'ERROR tipo de dato DATE no reconocido por el SQL Server - 28-11-2013 wapumayta
                resultado = ModeloDispositivo.Actualizar(oModeloDispositivo, Grupos, vcCamDim, vcNomCamXML, vcTipDatXML, XMLOperador, vcPlanes)

                'Actualizar adjuntos...
                oCaracteristica.ActualizarAdjuntos(lstObj, "MOV_ModeloDispositivo", "P_inCod", oModeloDispositivo.P_inCod.ToString())

                oAuditoria.DespuesActualizar(New String() {oModeloDispositivo.P_inCod}, strAntes)
            End If
            ModeloDispositivo.Dispose()
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
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