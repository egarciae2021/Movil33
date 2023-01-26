Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports Utilitario
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria
Imports System.IO
Imports webGestionDatos.Helpers
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq

Partial Class General_Administrar_Mantenimiento_Mnt_Organizacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            ttgInfoResponsableArea.Mensaje = "El responsable de área, también podrá aprobar solicitudes del personal del área respectiva, si la configuración de tipos de solicitudes lo permite."
            If Not Page.IsPostBack Then

                cbeOrganizacion.UbicacionWindow = "window.parent.parent"
                cbeOrganizacion.UrlPagina = "General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod="
                cbeOrganizacion.AltoDialogo = 560
                cbeOrganizacion.AnchoDialogo = 810
                cbeOrganizacion.TituloDialog = "Organización"

                Dim codigo As String = Request.QueryString("Cod")
                Dim blEsLlamadaExterna As Boolean = False
                If Request.QueryString("view") IsNot Nothing Then
                    If Request.QueryString("view") = "1" Then
                        Dim organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        codigo = organizacion.ObtieneOrganizacion(codigo).P_inCodOrg
                        blEsLlamadaExterna = True
                        btnAgregarEmpleado.Visible = False
                        btnQuitarEmpleado.Visible = False
                    End If
                End If
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyLlamadaExterna", "var EsLlamadaExterna = " & IIf(blEsLlamadaExterna, "true", "false") & ";", True)

                hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                hdfEstado.Value = codigo
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                'bpNivel.NombreEntidad = "Nivel"
                'bpNivel.vcTab = "M_NIVE"
                'bpNivel.TipoOrigen = 1
                'bpCentroCosto.NombreEntidad = "Centro de Costo"
                'bpCentroCosto.vcTab = "M_CENT_COST"
                'bpCentroCosto.TipoOrigen = 1
                'bpCentroCosto.Codigo = "CCOS_P_vcCODCCO"

                bpNivel.Visible = False
                bpCentroCosto.Visible = False

                'Obtiene controles dinámicos...



                If Not IsNothing(codigo) Then

                    GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("M_ORGA", tbCamposDinamicos, "", "../../../", "ORGA_P_inCODINT", codigo)

                    Dim organizacion As BL_GEN_OrganizacionG = New BL_GEN_OrganizacionG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim OrganizacionDT As DataTable = organizacion.ListarDT(codigo)
                    Dim oOrganizacion As List(Of ENT_GEN_OrganizacionG) = organizacion.Listar(codigo)

                    If oOrganizacion.Count > 0 Then
                        txt_codorg.Text = oOrganizacion(0).vcCodOrg.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCodInt2.Value = oOrganizacion(0).vcCodInt.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCodInt2Anterior.Value = oOrganizacion(0).vcCodInt.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txt_codorg.Enabled = False
                        txt_nombre.Text = oOrganizacion(0).vcNomOrg.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txt_correo1.Text = oOrganizacion(0).vcCorPer.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txt_correo2.Text = oOrganizacion(0).vcCorJef.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txt_nivelorga.Text = oOrganizacion(0).vcNomNiv.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCodNivOrgBusqueda.Value = oOrganizacion(0).F_inNiv
                        bpNivel.CodigoValor = oOrganizacion(0).F_inNiv
                        bpCentroCosto.CodigoValor = oOrganizacion(0).ORGA_F_vcCODCCO
                        txtCodCCO.Text = oOrganizacion(0).vcNomCCO.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCCOBusqueda.Value = oOrganizacion(0).ORGA_F_vcCODCCO

                        'txt_orga.Text = oOrganizacion(0).orgaSuperiorNombre.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        'hdfCodOrgBusqueda.Value = oOrganizacion(0).orgaSuperiorCod

                        cbeOrganizacion.Descripcion = oOrganizacion(0).orgaSuperiorNombre.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        cbeOrganizacion.Codigo = oOrganizacion(0).orgaSuperiorCod


                        chActivo.Visible = True
                        If oOrganizacion(0).btEst Then
                            chActivo.Checked = True
                            hdfEstadoORGA.Value = 1
                            trEstado.Style("display") = "none"
                        Else
                            chActivo.Checked = False
                            hdfEstadoORGA.Value = 0
                        End If
                        UtilitarioWeb.DataLst(lstEncargado, organizacion.ListarOrgaJefatura(codigo), "EMPL_vcNOMEMP", "vcCodEmp")

                        GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("M_ORGA", Me, OrganizacionDT)

                        'UtilitarioWeb.DataLst(lstAutorizadores, organizacion.ListarOrgaJefatura(codigo, True), "EMPL_vcNOMEMP", "vcCodEmp")

                        'UtilitarioWeb.DataLst(lstEncargado, ())
                    Else
                        Dim script As String = ""
                        script += "alert('No se puede editar este registro porque es parte del Sistema');window.parent.tab.tabs('remove', window.parent.tab.tabs('option', 'selected'));"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    End If
                    organizacion.Dispose()
                Else

                    GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("M_ORGA", tbCamposDinamicos, "", "../../../", "", "")

                    chActivo.Visible = False
                    chActivo.Checked = True
                    hdfEstadoORGA.Value = 1
                    trEstado.Style("display") = "none"
                End If
            End If
        End If
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal CodOrg As String, ByVal NomOrg As String, ByVal Niv As String,
                                  ByVal CorPer As String, ByVal CorJef As String, ByVal CodCCO As String,
                                  ByVal AreaSuperior As String, ByVal inCodEst As String, ByVal estado As String,
                                  ByVal vcCodEmp As String, vcCamDim As String, vcAdj As String, vcCodInt2Ant As String, vcCodInt2 As String, lstAutorizador As String) As String
        Dim oCaracteristica As BL_MOV_Caracteristica = Nothing
        Try
            Dim oSerializer As New JavaScriptSerializer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(vcCodEmp)
            Dim oOrganizacion As New ENT_GEN_OrganizacionG
            Dim Organizacion As BL_GEN_OrganizacionG = New BL_GEN_OrganizacionG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim estadoOrga As Boolean
            Dim resultado As String

            oCaracteristica = New BL_MOV_Caracteristica(oUsuario.IdCliente)

            'ACTUALIZAR WEBGESTIONDATOS
            Dim result_wgd As String = "0"
            Dim SincCental As String = (If(ConfigurationManager.AppSettings("SincronizaCentral") IsNot Nothing, ConfigurationManager.AppSettings("SincronizaCentral").ToString(), "0"))
            Dim Cloud As String = (If(ConfigurationManager.AppSettings("ModoCloud") IsNot Nothing, ConfigurationManager.AppSettings("ModoCloud").ToString(), "0"))

            Dim apih As ApiHelpers = New ApiHelpers()
            Dim objModel As MantenimientoOrga = New MantenimientoOrga()

            estadoOrga = False
            If estado = 1 Then
                estadoOrga = True
            End If

            Dim lstObj As New List(Of Object)
            If (vcAdj <> "") Then
                vcAdj = vcAdj.Substring(0, vcAdj.Length - 1)
                Dim lstAdjuntos As String() = vcAdj.Split(";")
                Dim CarpetaDominioUploads As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento//", "//")
                For i As Integer = 0 To lstAdjuntos.Length - 1
                    Dim row As String() = lstAdjuntos(i).Split(",")
                    If row(1).Trim() <> "" Then 'Hay archivo Adjunto?
                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Mantenimiento/" + CarpetaDominioUploads + "//" + row(1)
                        If File.Exists(vcFilePath) Then
                            Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                            Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                            fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                            fs.Close()
                            Dim dict As New Dictionary(Of String, Object)
                            dict.Add("Campo", row(0))
                            dict.Add("Archivo", byFileData)
                            dict.Add("Nombre", row(1))
                            lstObj.Add(dict)
                        End If
                    End If
                Next
            End If

            oOrganizacion.vcCodOrg = CodOrg
            oOrganizacion.vcNomOrg = NomOrg
            oOrganizacion.F_inNiv = 0
            oOrganizacion.vcCorPer = CorPer
            oOrganizacion.vcCorJef = CorJef
            oOrganizacion.ORGA_F_vcCODCCO = CodCCO
            oOrganizacion.vcCodInt = AreaSuperior
            oOrganizacion.btEst = estadoOrga

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "General"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Organización"
            oAuditoria.Tabla = Constantes.TableNames.Organizacion

            Dim strAntes As String = ""
            If inCodEst = "" Then
                resultado = Organizacion.Insertar(oOrganizacion, v_oCriterio, vcCamDim, lstAutorizador)

                If (Not IsNumeric(resultado)) Then
                    Organizacion.Dispose()
                    Return resultado
                End If

                If resultado = "1" Then

                    'Actualizar adjuntos...
                    oCaracteristica.ActualizarAdjuntos(lstObj, "M_Orga", "ORGA_vcCODORG", oOrganizacion.vcCodOrg)

                    ''ACTUALIZAR WEBGESTIONDATOS
                    If SincCental = "1" AndAlso Cloud = "1" Then
                        Dim dtSeccion As DataTable = New DataTable()
                        Dim lsParametrosCS As List(Of parameter) = New List(Of parameter) From {
                            New parameter With {.Name = "codemp", .value = "0"},
                            New parameter With {.Name = "codorg", .value = objModel.codint_var.ToString()},
                            New parameter With {.Name = "idDominio", .value = objModel.codint_var.ToString()}
                        }

                        Dim rpt = apih.CallApiMethod(True, "post", "GestionDatos/GetSeccionPorCodigo", lsParametrosCS)
                        'dtSeccion = (DataTable)JsonConvert.DeserializeObject(rpt, (typeof(DataTable)));
                        dtSeccion = CType(JsonConvert.DeserializeObject(rpt, GetType(DataTable)), DataTable)

                        If dtSeccion.Rows.Count > 0 Then
                            result_wgd = "2"
                        Else
                            Dim objSeccion As MantenimientoOrga = New MantenimientoOrga()
                            objSeccion.codemp = 0
                            objSeccion.idDominio = IIf(HttpContext.Current.Session("IdDominio").ToString() <> "", Convert.ToInt32(HttpContext.Current.Session("IdDominio")), 0)
                            objSeccion.codorg = CodOrg
                            objSeccion.nomorg = NomOrg
                            objSeccion.correo = CorPer
                            objSeccion.estado = True
                            objSeccion.CodCo = Convert.ToInt32(CodCCO)
                            Dim _codniv As Integer = 0
                            _codniv = ((AreaSuperior.Length) / 3) + 1
                            objSeccion.Codnivel = _codniv
                            objSeccion.codint_var = fnCargaNuevoNivel(AreaSuperior, True)

                            Dim contenBody = New System.Net.Http.StringContent(JsonConvert.SerializeObject(objSeccion), System.Text.Encoding.UTF8, "application/json")
                            Dim Variable = apih.CallApiMethod(True, "post", "GestionDatos/SeccionInsertar", Nothing, contenBody)

                            result_wgd = "1"
                        End If
                    End If
                    ''

                    Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                    oAuditoria.Opcion, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

                    ''oAuditoria.Insertar(New String() {oOrganizacion.vcCodOrg})
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {oOrganizacion.vcCodOrg})
                oOrganizacion.P_inCodInt = Convert.ToInt32(inCodEst)
                resultado = Organizacion.Actualizar(oOrganizacion, v_oCriterio, vcCamDim, lstAutorizador)

                If (Not IsNumeric(resultado)) Then
                    Organizacion.Dispose()
                    Return resultado
                End If

                'ACTUALIZAR WEBGESTIONDATOS
                If SincCental = "1" AndAlso Cloud = "1" Then
                    Dim ActualizaDependientes As Boolean = False
                    ''Web gestiondatos
                    objModel.codemp = 0
                    objModel.idDominio = IIf(HttpContext.Current.Session("IdDominio").ToString() <> "", Convert.ToInt32(HttpContext.Current.Session("IdDominio")), 0)
                    objModel.codorg = CodOrg
                    objModel.correo = CorPer
                    objModel.nomorg = NomOrg
                    objModel.estado = estadoOrga
                    objModel.CodCo = Convert.ToInt32(CodCCO)
                    objModel.codint = Convert.ToInt32(inCodEst)
                    objModel.codint_var = vcCodInt2
                    '

                    If vcCodInt2Ant IsNot Nothing AndAlso vcCodInt2Ant <> "" Then
                        If vcCodInt2.Length > 3 AndAlso AreaSuperior <> vcCodInt2.Substring(0, vcCodInt2.Length - 3) Then
                            ActualizaDependientes = True
                        End If

                    End If

                    If estadoOrga = False Then
                        Dim lsParametrosET As List(Of parameter) = New List(Of parameter) From {
                            New parameter With {.Name = "codemp", .value = "0"},
                            New parameter With {.Name = "codint", .value = inCodEst},
                            New parameter With {.Name = "idDominio", .value = objModel.idDominio.ToString()}
                        }

                        Dim tieneDependientes As Int32 = Convert.ToInt32(apih.CallApiMethod(True, "post", "GestionDatos/SeccionValidarDeshabilitar", lsParametrosET))

                        If tieneDependientes = 1 Then
                            result_wgd = "2"
                        End If

                    End If

                    If result_wgd <> "2" Then
                        Dim contenBody = New System.Net.Http.StringContent(JsonConvert.SerializeObject(objModel), System.Text.Encoding.UTF8, "application/json")
                        Dim Variable = apih.CallApiMethod(True, "post", "GestionDatos/SeccionActualizar", Nothing, contenBody)

                        result_wgd = "1"

                        If ActualizaDependientes Then
                            Dim resultadoTMP As String = ""
                            Dim dsDependientes As DataSet = New DataSet()
                            Dim lsParametrosSN As List(Of parameter) = New List(Of parameter) From {
                                New parameter With {.Name = "codigoEmpresa", .value = "0"},
                                New parameter With {.Name = "codigo_origen", .value = inCodEst},
                                New parameter With {.Name = "codigo_destino", .value = AreaSuperior},
                                New parameter With {.Name = "IdDominio", .value = objModel.idDominio.ToString()}
                            }

                            Dim resultSN As String = apih.CallApiMethod(True, "post", "GestionDatos/ActualizarAreasDependientes", lsParametrosSN)
                            'dsDependietes = (DataSet)JsonConvert.DeserializeObject(resultSN, (typeof(DataSet)))
                            dsDependientes = CType(JsonConvert.DeserializeObject(resultSN, GetType(DataSet)), DataSet)
                        End If

                    End If

                End If
                '

                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla & ". Antes: " & strAntes)

                'Actualizar adjuntos...
                oCaracteristica.ActualizarAdjuntos(lstObj, "M_Orga", "ORGA_P_inCODINT", oOrganizacion.P_inCodInt)

                ''oAuditoria.DespuesActualizar(New String() {oOrganizacion.vcCodOrg}, strAntes)
            End If
            Organizacion.Dispose()
            Return resultado
        Catch ex As Exception
            Return ex.Message
        Finally
            If oCaracteristica IsNot Nothing Then oCaracteristica.Dispose()
        End Try
    End Function

    Public Class MantenimientoOrga
        'Public Property codemp As Int32
        'Public Property idDominio As Int32
        'Public Property codorg As Int32
        'Public Property correo As String
        'Public Property nomorg As String
        'Public Property estado As Boolean
        'Public Property CodCo As Int32
        'Public Property codint As Int32
        'Public Property codint_var As String

        Public Property codemp As Integer
        Public Property codint As Integer
        Public Property codint_var As String
        Public Property codorg As String
        Public Property nomorg As String
        Public Property correo As String
        Public Property estado As Boolean
        Public Property exoneraDesprogramacion As Boolean
        Public Property acumMonto As Double
        Public Property acumMonCreditoLoc As Double
        Public Property acumMonCreditoDdn As Double
        Public Property acumMonCreditoDdi As Double
        Public Property acumMonCreditoCel As Double
        Public Property moncrediteActual As Double
        Public Property monCredito As Double
        Public Property monCreditoLoc As Double
        Public Property monCreditoCel As Double
        Public Property monCreditoDdn As Double
        Public Property monCreditoDdi As Double
        Public Property monCreditoActualCel As Double
        Public Property monCreditoActualLoc As Double
        Public Property monCreditoActualDdn As Double
        Public Property monCreditoActualDdi As Double
        Public Property aviso As Integer
        Public Property avisoLoc As Integer
        Public Property avisoCel As Integer
        Public Property avisoDdi As Integer
        Public Property avisoDdn As Integer
        Public Property CodCo As Integer
        Public Property Codnivel As String
        Public Property idDominio As Integer

    End Class

    Public Shared Function fnCargaNuevoNivel(ByVal pvNivelActual As String, ByVal pbCorrelativo As Boolean) As String
        Dim dtDatos As DataTable = Nothing
        Dim apih As ApiHelpers = New ApiHelpers()
        Dim vValor As String = Nothing
        Dim vultimo As String = Nothing
        Dim _return As String = ""

        Dim idDominio As String = IIf(HttpContext.Current.Session("IdDominio").ToString() <> "", Convert.ToInt32(HttpContext.Current.Session("IdDominio")), 0)

        Try

            If pvNivelActual.Length = 3 Then
                Dim lsParametrosCS As List(Of parameter) = New List(Of parameter) From {
                    New parameter With {.Name = "myTipo", .value = "0"},
                    New parameter With {.Name = "codemp", .value = "0"},
                    New parameter With {.Name = "codint_vc", .value = pvNivelActual},
                    New parameter With {.Name = "idDominio", .value = idDominio}
                }
                Dim rpt = apih.CallApiMethod(True, "post", "GestionDatos/GetOrganizacionCargaNuevoNivel", lsParametrosCS)
                dtDatos = CType(JsonConvert.DeserializeObject(rpt, (GetType(DataTable))), DataTable)

                If (dtDatos IsNot Nothing) Then

                    If dtDatos.Rows.Count = 0 OrElse Not String.IsNullOrEmpty(dtDatos.Rows(0)("codint_vc").ToString()) Then
                        vValor = "" & dtDatos.Rows(0)("codint_vc").ToString()
                        vultimo = vValor.ToString().Substring(vValor.ToString().Length - 3, 3)

                        If vultimo = "9" OrElse vultimo = "09" Then
                            vValor = vValor.ToString().Substring(0, vValor.ToString().Length - 2)
                        Else
                            vValor = vValor.ToString().Substring(0, vValor.ToString().Length - 3)
                        End If

                        vultimo = fnAgregaCeros((Convert.ToInt32(vultimo) + 1).ToString().Trim(), 3)
                        vValor = vValor.ToString() & vultimo.ToString()
                        _return = vValor.ToString()
                    Else
                        _return = pvNivelActual & "001"
                    End If
                End If
            Else
                Dim lsParametrosCS As List(Of parameter) = New List(Of parameter) From {
                    New parameter With {.Name = "myTipo", .value = "0"},
                    New parameter With {.Name = "codemp", .value = "0"},
                    New parameter With {.Name = "codint", .value = pvNivelActual},
                    New parameter With {.Name = "idDominio", .value = idDominio}
                }
                Dim rpt = apih.CallApiMethod(True, "post", "GestionDatos/GetOrganizacionCargaNuevoNivelGeneral", lsParametrosCS)
                dtDatos = CType(JsonConvert.DeserializeObject(rpt, (GetType(DataTable))), DataTable)

                If (dtDatos IsNot Nothing) Then

                    If dtDatos.Rows(0)("codint_vc").ToString() <> "" AndAlso dtDatos.Rows(0)("codint_vc") IsNot Nothing Then
                        vValor = "" & dtDatos.Rows(0)("codint_vc").ToString()
                        vultimo = vValor.ToString().Substring(vValor.ToString().Length - 3, 3)

                        If vultimo = "9" Then
                            vValor = vValor.ToString().Substring(0, vValor.ToString().Length - 2)
                        Else
                            vValor = vValor.ToString().Substring(0, vValor.ToString().Length - 3)
                        End If

                        vultimo = fnAgregaCeros((Convert.ToInt32(vultimo) + 1).ToString().Trim(), 3)
                        vValor = vValor.ToString() & vultimo.ToString()

                        If pbCorrelativo Then
                            _return = vValor.ToString()
                        Else
                            fnCargaNuevoNivel(vValor.ToString(), pbCorrelativo)
                        End If
                    Else
                        _return = pvNivelActual & "001"
                    End If
                End If
            End If

        Catch ex As Exception
        End Try

        Return _return
    End Function

    Public Shared Function fnAgregaCeros(ByVal xTexto As String, ByVal xlongitud As Integer) As String
        While xTexto.Length < xlongitud
            xTexto = "0" & xTexto.Trim()
        End While

        Return xTexto
    End Function

End Class

