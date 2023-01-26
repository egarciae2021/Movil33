Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria
Imports webGestionDatos.Helpers
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq

Partial Class General_Administrar_Mantenimiento_Mnt_Empleado
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not Page.IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)

                    cbeOrganizacion.UbicacionWindow = "window.parent.parent"
                    cbeOrganizacion.UrlPagina = "General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod="
                    cbeOrganizacion.AltoDialogo = 560
                    cbeOrganizacion.AnchoDialogo = 950
                    cbeOrganizacion.TituloDialog = "Organización"

                    hdfAreaFacturacion.Value = oUsuario.AreaFacturacion.ToString()

                    Dim codigo As String = Request.QueryString("Cod")
                    Dim esInfo As String = Request.QueryString("esInfo")
                    'Dim empleado As BL_GEN_EmpleadoG = new BL_GEN_EmpleadoG(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    lblCodigoEmpleado.Text = "Código"
                    If (oCultura.vcCodCul = "es-MX") Then
                        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim lstCampo As List(Of ENT_ENT_Campo)
                        lstCampo = Campo.Listar("M_EMPL", oUsuario, 1)

                        For Each camp In lstCampo
                            If (camp.vcNom = "EMPL_P_vcCODEMP") Then
                                lblCodigoEmpleado.Text = camp.vcDes
                                Exit For
                            End If
                        Next
                    End If

                    Dim blEsLlamadaExterna As Boolean = False
                    If Request.QueryString("view") IsNot Nothing Then
                        If Request.QueryString("view") = "1" Then
                            hdfView.Value = "1"
                            'Dim organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                            'codigo = organizacion.ObtieneOrganizacion(codigo).P_inCodOrg
                            blEsLlamadaExterna = True
                            cbeOrganizacion.Codigo = "" & Request.QueryString("CodInt")
                            If cbeOrganizacion.Codigo <> "" Then
                                Dim oOrgaBL As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                                Dim oOrgaBE As ENT_GEN_Organizacion = oOrgaBL.ObtieneOrganizacion(cbeOrganizacion.Codigo)
                                If oOrgaBE IsNot Nothing AndAlso oOrgaBE.vcNomOrg <> "" Then
                                    cbeOrganizacion.Descripcion = oOrgaBE.vcNomOrg.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                                    txtNombreArea.Text = cbeOrganizacion.Descripcion
                                    txtOrga.Text = cbeOrganizacion.Descripcion
                                    hdfIdArea.Value = cbeOrganizacion.Codigo

                                    If cbeOrganizacion.Descripcion.Length > 45 Then
                                        cbeOrganizacion.Descripcion = cbeOrganizacion.Descripcion.Substring(0, 45) & "..."
                                    End If

                                End If
                                oOrgaBL.Dispose()
                            End If
                            If IsNothing(codigo) Then
                                cbeOrganizacion.EsClicleabe = False
                            End If
                        End If
                    End If

                    hdfEsSuperAdmin.Value = "0"

                    For Each perfil In oUsuario.Perfiles
                        If (perfil.CodigoPerfil = "SUPADM") Then
                            If oUsuario.esJefeArea OrElse oUsuario.F_vcCodInt <> "" Then
                                hdfEsSuperAdmin.Value = "1"
                            Else
                                hdfEsSuperAdmin.Value = "0"
                            End If
                            Exit For
                        Else
                            hdfEsSuperAdmin.Value = "0"
                        End If
                    Next
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyLlamadaExterna", "var EsLlamadaExterna = " & IIf(blEsLlamadaExterna, "true", "false") & ";", True)

                    If Not IsNothing(Request.QueryString("IsLigero")) AndAlso Request.QueryString("IsLigero") = "1" Then
                        hdfOcultarCamposLigero.Value = "1"
                        hdfTipoLinea.Value = Request.QueryString("inTipoLinea")
                    End If

                    'Obtiene controles dinámicos...
                    GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("M_EMPL", tbCamposDinamicos)

                    hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                    hdfEstado.Value = codigo
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                    'es info / agrergado 10-03-2014 - wapumayta
                    hdfesInfo.Value = "0"
                    If Not IsNothing(esInfo) Then
                        hdfesInfo.Value = "1"
                    End If

                    If Not IsNothing(codigo) Then

                        'dvAutogenerado.InnerHtml = ""
                        'dvAutogenerado.Style("display") = "none"

                        Dim empleado As BL_GEN_EmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oEmpleado As List(Of ENT_GEN_EmpleadoG) = empleado.Listar(codigo)
                        Dim dtEmpleado As DataTable = empleado.ListarDT(codigo)
                        Dim CantLineas As String = empleado.ObtenerCantidadLineasEmpleado(codigo)
                        empleado.Dispose()

                        hdfCantidadLineasEmpleado.Value = CantLineas.ToString()

                        hdfCodEmpleado.Value = oEmpleado(0).vcCodEmp.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtCodigo.Text = oEmpleado(0).vcCodEmp.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtCodigo.Enabled = False
                        cbeOrganizacion.EsClicleabe = True
                        cbeOrganizacion.Descripcion = oEmpleado(0).vcNomOrg.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtNombreArea.Text = cbeOrganizacion.Descripcion

                        Try
                            hdfCodigoOrganizacionCuenta.Value = oEmpleado(0).CodigoOrganizacionCuenta.ToString()
                        Catch ex As Exception
                            hdfCodigoOrganizacionCuenta.Value = ""
                        End Try

                        If cbeOrganizacion.Descripcion.Length > 70 Then
                            cbeOrganizacion.Descripcion = cbeOrganizacion.Descripcion.Substring(0, 70) & "..."
                        End If

                        txtOrga.Text = cbeOrganizacion.Descripcion
                        hdfIdArea.Value = oEmpleado(0).vcCodInt2.ToString

                        cbeOrganizacion.Codigo = oEmpleado(0).vcCodInt2.ToString() 'agregado 22-08-2013
                        'hdfCodAreaBusqueda.Value = oEmpleado(0).F_inCodInt.ToString()
                        txtCodGrupoOrigen.Text = oEmpleado(0).vcNomGru.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCodGruOriBusqueda.Value = oEmpleado(0).F_inCodGruOri.ToString()
                        txtNombre.Text = oEmpleado(0).vcNomEmp.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")

                        Dim Sucursal As BL_GEN_Sucursal = New BL_GEN_Sucursal(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        txtCodSucursal.Text = oEmpleado(0).vcNomSuc.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")


                        'Si solo existe una sola sucursal entonces se seleccionara por defecto y se bloqueara
                        Dim lstSucursal As List(Of ENT_GEN_Sucursal) = Sucursal.ListarCombo("", 0) 'Sucursal por defecto.
                        If lstSucursal IsNot Nothing AndAlso lstSucursal.Count = 1 Then
                            txtCodSucursal.Enabled = False
                        End If


                        hdfCodSucBusqueda.Value = oEmpleado(0).F_vcCodSuc.ToString()
                        hdfCCOBusqueda.Value = oEmpleado(0).F_vcCodCco.ToString()
                        txtCodCCO.Text = hdfCCOBusqueda.Value + "-" + oEmpleado(0).vcNomCco.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtMailPersonal.Text = oEmpleado(0).vcCorPer.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtMailJefe.Text = oEmpleado(0).vcCorJef.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtUbiFis.Text = oEmpleado(0).vcUbiFis.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtInfAdi.Text = oEmpleado(0).vcInfAdi.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtOficina.Text = oEmpleado(0).vcNomOficina.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCodOficinaBusqueda.Value = oEmpleado(0).vcCodOficina.ToString()
                        txtCodGrupoFalmilia.Text = oEmpleado(0).vcNomGrupOriF.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfCodGrupoFalmiliaBusqueda.Value = oEmpleado(0).vcCodGrupOriF.ToString()
                        hdfCodCCOArea.Value = oEmpleado(0).vcCodCCOArea.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        hdfNomCCOArea.Value = oEmpleado(0).vcNomCCOArea.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtDNI.Text = oEmpleado(0).DNI.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtNroCuenta.Text = oEmpleado(0).NroCuenta
                        hdfIdUsuario.Value = oEmpleado(0).IdUsuario

                        chActivo.Visible = True
                        If oEmpleado(0).btEst Then
                            chActivo.Checked = True
                            trEstado.Style("display") = "none"
                        Else
                            chActivo.Checked = False
                        End If

                        'Sincronizacion
                        If oEmpleado(0).blExonerarSinc Then
                            ChkSincronizacion.Checked = True
                        Else
                            ChkSincronizacion.Checked = False
                        End If

                        GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("M_EMPL", Me, dtEmpleado)

                        'txtCodArea.Focus()
                    Else
                        txtCodigo.Enabled = True
                        chActivo.Visible = False
                        chActivo.Checked = True
                        trEstado.Style("display") = "none"

                        'dvAutogenerado.Style("display") = ""

                        'Cargar oficina por defecto...
                        '$("#txtOficina").val((DatosOficina[0].Codigo == "" ? "" : DatosOficina[0].Codigo + " - ") + DatosOficina[0].Descripcion)
                        '$("#hdfCodOficinaBusqueda").val(DatosOficina[0].IdOficina)

                        Dim Oficina As BL_GEN_EMP_Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oOficina As GEN_EMP_Oficina = Oficina.Mostrar(1) 'Oficina General...
                        If oOficina IsNot Nothing Then
                            txtOficina.Text = IIf(oOficina.Codigo = "", "", oOficina.Codigo & " - ") & oOficina.Descripcion
                            hdfCodOficinaBusqueda.Value = oOficina.IdOficina
                        End If
                        Oficina.Dispose()

                        'Grupo Origen por Defecto...
                        Dim GrupoOrigen As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim lstGrupoOrigen As List(Of ENT_GEN_GrupoOrigen) = GrupoOrigen.Listar(1) 'Usuarios...
                        If lstGrupoOrigen IsNot Nothing AndAlso lstGrupoOrigen.Count > 0 Then
                            txtCodGrupoOrigen.Text = lstGrupoOrigen(0).vcNomGru.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            hdfCodGruOriBusqueda.Value = lstGrupoOrigen(0).P_inCodGruOri.ToString()
                        End If
                        GrupoOrigen.Dispose()

                        Dim Sucursal As BL_GEN_Sucursal = New BL_GEN_Sucursal(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        'Si solo existe una sola sucursal entonces se seleccionara por defecto y se bloqueara
                        Dim lstSucursal As List(Of ENT_GEN_Sucursal) = Sucursal.ListarCombo("", 0) 'Sucursal por defecto.
                        If lstSucursal IsNot Nothing AndAlso lstSucursal.Count = 1 Then
                            txtCodSucursal.Text = lstSucursal(0).vcNom.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            hdfCodSucBusqueda.Value = lstSucursal(0).P_vcCod.ToString()
                            txtCodSucursal.Enabled = False
                        Else
                            'Sucursal por Defecto...                        
                            Dim oSucursal As ENT_GEN_Sucursal = Sucursal.Mostrar("01") 'Sucursal por defecto.
                            If oSucursal IsNot Nothing Then
                                If oSucursal.vcNom IsNot Nothing Then
                                    txtCodSucursal.Text = oSucursal.vcNom.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                                    hdfCodSucBusqueda.Value = oSucursal.P_vcCod.ToString()
                                End If
                            End If
                        End If
                        hdfIdUsuario.Value = -1
                        'txtCodigo.Focus()
                    End If

                    'SE AGREGA PARA QUE SOLO SEA VISIBLE PARA EL PERFIL SUPERADMINISTRADOR POR TICKET DE CLIENTE ACTIVACEL.
                    For Each perfil In oUsuario.Perfiles
                        If (perfil.CodigoPerfil = "SUPADM" Or perfil.CodigoPerfil = "ADMIN") Then
                            If oUsuario.esJefeArea OrElse oUsuario.F_vcCodInt <> "" Then
                                BtnIrUsuario.Visible = True
                                ttIrUsuario.Visible = True
                            Else
                                BtnIrUsuario.Visible = False
                                ttIrUsuario.Visible = False
                            End If
                            Exit For
                        Else
                            BtnIrUsuario.Visible = False
                            ttIrUsuario.Visible = False
                        End If
                    Next

                    'Me.ttIrUsuario.Mensaje = "Crear o editar usuario de ingreso al sistema"
                    Me.ttIrUsuario.Mensaje = "Permite la edición de usuarios de ingreso al sistema"
                End If

            End If


            hdfTipoLicencia.Value = ""
            If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                hdfTipoLicencia.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.Licencia
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ListarGrupoOrigen(ByVal intTipoLinea As String, ByVal maxFilas As String, ByVal vcNomGru As String, ByVal idCliente As String) As List(Of ENT_GEN_GrupoOrigen)
        Dim Grupo As BL_GEN_GrupoOrigen = New BL_GEN_GrupoOrigen(idCliente)
        Dim _return As List(Of ENT_GEN_GrupoOrigen) = Grupo.ListarComboAutocomplete(Integer.Parse(intTipoLinea), vcNomGru, Integer.Parse(maxFilas))
        Grupo.Dispose()
        Return _return
    End Function




    <WebMethod()>
    Public Shared Function BuscarId(ByVal nombre As String) As String
        Try
            Dim Empleado As BL_GEN_EmpleadoG
            Empleado = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oEmpleado As String = Empleado.Empleadoid(nombre.Trim())
            Empleado.Dispose()
            Return oEmpleado
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function



    <WebMethod()>
    Public Shared Function Guardar(ByVal Codigo As String, ByVal Area As String, ByVal Nombre As String, ByVal UbiFis As String, ByVal CorPer As String,
                                   ByVal CorJef As String, ByVal CodGruOri As String, ByVal InfAdi As String, ByVal CodSuc As String, ByVal CodCco As String,
                                   ByVal inCodEst As String, ByVal CodIntArea As String, ByVal codGruOriFam As String, ByVal codOficina As String,
                                   ByVal blEstado As String, ByVal DNI As String, ByVal NroCuenta As String, ByVal ExoSinc As String,
                                   ByVal vcCamDim As String) As String
        Try
            Dim oEmpleado As New ENT_GEN_EmpleadoG
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Empleado As BL_GEN_EmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim CentroCosto As BL_GEN_CentroCosto = New BL_GEN_CentroCosto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim codigoGruOri As Integer
            Dim coincidencias As Boolean


            Dim SincCental As String = (If(ConfigurationManager.AppSettings("SincronizaCentral") IsNot Nothing, ConfigurationManager.AppSettings("SincronizaCentral").ToString(), "0"))
            Dim Cloud As String = (If(ConfigurationManager.AppSettings("ModoCloud") IsNot Nothing, ConfigurationManager.AppSettings("ModoCloud").ToString(), "0"))

            If CodGruOri = "" Then
                codigoGruOri = 0
            Else
                codigoGruOri = Convert.ToInt32(CodGruOri)
            End If

            oEmpleado.vcCodEmp = Codigo
            oEmpleado.vcNomEmp = Nombre
            oEmpleado.vcUbiFis = UbiFis
            oEmpleado.vcCorPer = CorPer
            oEmpleado.vcCorJef = CorJef
            oEmpleado.F_inCodGruOri = CodGruOri
            oEmpleado.vcInfAdi = InfAdi
            oEmpleado.F_vcCodSuc = CodSuc
            oEmpleado.F_vcCodCco = CodCco
            oEmpleado.F_inCodCli = 0
            oEmpleado.vcCodInt2 = CodIntArea
            oEmpleado.vcCodGrupOriF = codGruOriFam
            oEmpleado.vcCodOficina = codOficina
            oEmpleado.DNI = DNI
            oEmpleado.NroCuenta = NroCuenta
            oEmpleado.btEst = Convert.ToBoolean(blEstado)
            oEmpleado.blExonerarSinc = Convert.ToBoolean(ExoSinc)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "General"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Empleados"
            oAuditoria.Tabla = Constantes.TableNames.Empleado

            Dim strAntes As String = ""
            If inCodEst = "" Then
                coincidencias = CentroCosto.ExisteCodigo(oEmpleado.vcCodEmp, "M_EMPL", "EMPL_P_vcCODEMP")
                If coincidencias Then
                    Return "El código ingresado ya existe"
                Else
                    Empleado.Insertar(oEmpleado, vcCamDim)
                    ''oAuditoria.Insertar(New String() {oEmpleado.vcCodEmp})
                    If SincCental = "1" AndAlso Cloud = "1" Then
                        Dim apih As ApiHelpers = New ApiHelpers()
                        Dim objModel As MantenimientoEmpleados = New MantenimientoEmpleados()

                        objModel.codint = Convert.ToInt32(CodIntArea)
                        objModel.codcco = Convert.ToInt32(CodCco)
                        objModel.codemp = 0
                        objModel.correo1 = CorPer
                        objModel.correo2 = CorJef
                        objModel.nomempleado = Nombre
                        objModel.codempleado_vc = Codigo
                        objModel.estado = Convert.ToInt32(blEstado)
                        objModel.ExoneraSinc = Convert.ToBoolean(ExoSinc)
                        'objModel.idDominio = IIf(HttpContext.Current.Session("IdDominio").ToString() <> "", Convert.ToInt32(HttpContext.Current.Session("IdDominio")), 0)

                        Dim idDominio As Integer = IIf(HttpContext.Current.Session("IdDominio").ToString() <> "", Convert.ToInt32(HttpContext.Current.Session("IdDominio")), 0)

                        Dim lsParametrosE As List(Of parameter) = New List(Of parameter) From {
                            New parameter With {.Name = "idDominio", .value = idDominio.ToString()}
                        }

                        Dim contenBody = New System.Net.Http.StringContent(JsonConvert.SerializeObject(objModel), System.Text.Encoding.UTF8, "application/json")
                        Dim Variable = apih.CallApiMethod(True, "post", "GestionDatos/EmpleadoInsertar", lsParametrosE, contenBody)

                    End If

                    Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                    oAuditoria.Opcion, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

                End If
            Else
                'oEmpleado.P_inCodEmp = Convert.ToInt32(inCodEst)
                strAntes = oAuditoria.AntesActualizar(New String() {oEmpleado.vcCodEmp})

                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla & ". Antes: " & strAntes)

                Empleado.Actualizar(oEmpleado, vcCamDim)
                ''oAuditoria.DespuesActualizar(New String() {oEmpleado.vcCodEmp}, strAntes)

                'ACTUALIZAR EN WEB GESTION DATOS
                If SincCental = "1" AndAlso Cloud = "1" Then
                    Dim apih As ApiHelpers = New ApiHelpers()
                    Dim objModel As MantenimientoEmpleados = New MantenimientoEmpleados()

                    objModel.codint = Convert.ToInt32(CodIntArea)
                    objModel.codcco = Convert.ToInt32(CodCco)
                    objModel.codemp = 0
                    objModel.correo1 = CorPer
                    objModel.correo2 = CorJef
                    objModel.nomempleado = Nombre
                    objModel.codempleado_vc = Codigo
                    objModel.estado = Convert.ToInt32(blEstado)
                    objModel.ExoneraSinc = Convert.ToBoolean(ExoSinc)
                    'objModel.codempleado = 0
                    'objModel.idDominio = IIf(HttpContext.Current.Session("IdDominio").ToString() <> "", Convert.ToInt32(HttpContext.Current.Session("IdDominio")), 0)

                    Dim idDominio As Integer = IIf(HttpContext.Current.Session("IdDominio").ToString() <> "", Convert.ToInt32(HttpContext.Current.Session("IdDominio")), 0)

                    Dim lsParametrosE As List(Of parameter) = New List(Of parameter) From {
                        New parameter With {.Name = "idDominio", .value = idDominio.ToString()}
                    }

                    Dim contenBody = New System.Net.Http.StringContent(JsonConvert.SerializeObject(objModel), System.Text.Encoding.UTF8, "application/json")
                    Dim Variable = apih.CallApiMethod(True, "post", "GestionDatos/EmpleadoActualizar", lsParametrosE, contenBody)

                End If

                'Actualizar correo usuario...
                Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oUsuarioEmpleado As ENT_SEG_Usuario = Usuario.ObtenerPorCodEmpleado(Codigo)
                If oUsuarioEmpleado IsNot Nothing Then
                    oUsuarioEmpleado.correo = oEmpleado.vcCorPer
                    Usuario.Grabar(oUsuarioEmpleado)

                End If
                Usuario.Dispose()


                ''ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"
                Dim oUsuarioDatos As BL_SEG_Usuario = Nothing
                oUsuarioDatos = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1)
                oUsuarioDatos.CambiarCorreoUsuarioPorEmpleado_Datos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, oEmpleado.vcCodEmp, oEmpleado.vcCorPer)
                oUsuarioDatos.Dispose()
            End If
            CentroCosto.Dispose()
            Empleado.Dispose()
            Return ""
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ObtenerCentroCostoXArea(ByVal vcCodArea As String) As ENT_GEN_EmpleadoG
        Try
            Dim oEmpleado As BL_GEN_EmpleadoG = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As ENT_GEN_EmpleadoG = oEmpleado.ObtenerCentroCostoXArea(vcCodArea)

            oEmpleado.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Public Class MantenimientoEmpleados
        Public Property EstadoResultado As String
        Public Property DescripcionResultado As String
        Public Property NombreFormulario As String
        Public Property NombreMetodo As String
        Public Property codemp As Int32
        Public Property codempleado As Int32
        Public Property codempleado_vc As String
        Public Property nomempleado As String
        Public Property correo1 As String
        Public Property correo2 As String
        Public Property estado As Int32
        Public Property idDominio As Int32
        Public Property codint As Int32
        Public Property codcco As Int32
        Public Property ExoneraSinc As Boolean
    End Class


End Class
