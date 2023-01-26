Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Imaging
Imports System.Drawing.Drawing2D
Imports System.Web.Script.Services
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Seguridad.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria

Partial Class _Mnt_SEG_Usuario
   Inherits System.Web.UI.Page

   ' =============================================================================================================================
   ' BUSCAR HORARIO
   ' =============================================================================================================================
   <WebMethod()>
   Public Shared Function Buscar_HorarioAcceso(ByVal prvcDia As String, ByVal prnuHora As String) As Integer
      Try

         Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente

         Dim BL_Usu As BL_SEG_Usuario = New BL_SEG_Usuario(inCodUsu)

         Dim _return As Integer = BL_Usu.Buscar_HoraAcceso(prvcDia, prnuHora)

         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   ' =============================================================================================================================
   ' LISTAR HORARIO
   ' =============================================================================================================================
   <WebMethod()>
   Public Shared Function Listar_HorarioAcceso(ByVal prCriterio As String) As List(Of ENT_SEG_Usuario)
      Try

         Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente

         Dim BL_Usu As BL_SEG_Usuario = New BL_SEG_Usuario(inCodUsu)

         Dim _return As List(Of ENT_SEG_Usuario) = BL_Usu.Listar_HorarioAcceso(prCriterio)

         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   ' =============================================================================================================================
   ' LOAD
   ' =============================================================================================================================
   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            hdfIdTemporizador.Value = -1
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                ttgInfoArea.Mensaje = "El usuario visualizará desde el área asignada hacia sus niveles inferiores. Detalle de llamadas, históricos, sumarios, estructura organizacional, solicitudes como especialista."
                tpInfoReinicio.Mensaje = "La opción permite que el usuario cambie la contraseña temporal que se le asigna al siguiente ingreso."

                ddlNivelProducto.Items.Add(New ListItem("--Seleccione un registro--", "-1"))
                ddlNivelProducto.Items.Add(New ListItem("Producto", "1"))
                ddlNivelProducto.Items.Add(New ListItem("Modulo", "2"))
                ddlNivelProducto.Items.Add(New ListItem("Opcion", "3"))
                ddlNivelProducto.Items.Add(New ListItem("Item", "4"))

                If Not IsPostBack Then
                    'cbeOrganizacion.UbicacionWindow = "window.parent.parent"
                    'cbeOrganizacion.UrlPagina = "General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod="
                    'cbeOrganizacion.AltoDialogo = 560
                    'cbeOrganizacion.AnchoDialogo = 810
                    'cbeOrganizacion.TituloDialog = "Organización"
                    'cbeOrganizacion.AnchoCaja = 348

                    ' ============================================================================================================================================
                    ' MODULO DE SEGURIDAD - LDAP
                    ' ============================================================================================================================================
                    Dim oUsuarioSession As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

                    If oUsuarioSession.inModoAute <> 0 And oUsuarioSession.inModoAute <> 1 Then
                        hdf_esLDAP.Value = "1"
                    End If
                    ' ============================================================================================================================================


                    Dim P_inCod As String = Request.QueryString("Cod")
                    hdfCodigo.Value = P_inCod

                    If Not IsNothing(P_inCod) Then


                        Dim oTecnicoSupervisor As BL_INC_TecnicoSupervisor = Nothing
                        Try
                            oTecnicoSupervisor = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                            hdfIdTecnicoSupervisor.Value = oTecnicoSupervisor.ObtenerIdTecnicoXIdUsuario(P_inCod)
                        Catch
                        Finally
                            If oTecnicoSupervisor IsNot Nothing Then oTecnicoSupervisor.Dispose()
                        End Try

                        Dim Atencion As BL_MOV_ATE_Atencion = Nothing
                        Try
                            hdIdOperadorAtencion.Value = "0"
                            Atencion = New BL_MOV_ATE_Atencion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                            Dim ds As DataSet = Atencion.ListarConfiguracion(False, 2) 'Tipo Despacho
                            If ds IsNot Nothing AndAlso ds.Tables.Count > 2 AndAlso ds.Tables(2) IsNot Nothing Then
                                Dim dtOperadores As DataTable = ds.Tables(2)
                                Dim dr() As DataRow = dtOperadores.Select("IdUsuario = " & P_inCod.ToString())
                                If dr.Length > 0 Then
                                    chkAtenciones_EsOperador.Checked = True
                                    hdIdOperadorAtencion.Value = "" & dr(0)("IdOperador")
                                End If
                            End If
                        Catch
                        Finally
                            If Atencion IsNot Nothing Then Atencion.Dispose()
                        End Try

                        Dim oBL_SEG_Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim objEntidad As ENT_SEG_Usuario = oBL_SEG_Usuario.Mostrar(P_inCod)

                        '===========================================================
                        'OBTIENE DATOPS DE CONFIGURACION DE PAGINA PRINCIPAL
                        '===========================================================
                        Dim oUsuarioConfiguracion As ENT_SEG_UsuarioConfiguracion
                        oUsuarioConfiguracion = oBL_SEG_Usuario.ObtenerConfiguracionUsuario(P_inCod)
                        If Not (String.IsNullOrEmpty(oUsuarioConfiguracion.TipoNivel)) Then
                            ddlNivelProducto.SelectedValue = oUsuarioConfiguracion.TipoNivel.ToString()
                        End If
                        If Not (String.IsNullOrEmpty(oUsuarioConfiguracion.IdPagina)) Then
                            Dim lstPaginas As List(Of String())
                            lstPaginas = ObtenerDatosPaginaPorNivel(oUsuarioConfiguracion.TipoNivel.ToString())

                            For Each valor As String() In lstPaginas
                                ddlPaginaPrincipal.Items.Add(New ListItem(valor(1), valor(0)))
                            Next
                            ddlPaginaPrincipal.SelectedValue = oUsuarioConfiguracion.IdPagina.ToString()
                        End If



                        hdfIdTemporizador.Value = objEntidad.Temporizador.IdTemporizador
                        hdfIdPerfilTemporizador.Value = objEntidad.Temporizador.IdPerfilOrigen

                        If oBL_SEG_Usuario.VerificarAdministrador(objEntidad.vcUsu, objEntidad.vcPas) = 0 Then
                            hdf_esAdmin.Value = "1"
                        End If

                        hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                        ''txtvcNom.Text = objEntidad.vcNom
                        txtvcUsu.Text = objEntidad.vcUsu
                        txtvcPas.Text = objEntidad.vcPas
                        txtConfirmar.Text = objEntidad.vcPas

                        ' ============================================================================================================================================
                        ' MODULO DE SEGURIDAD
                        ' ============================================================================================================================================

                        If objEntidad.btReinicia Then
                            txtvcPas.Text = objEntidad.vcPas
                            txtConfirmar.Text = objEntidad.vcPas
                        End If
                        ' ============================================================================================================================================
                        lblAcceso.Text = IIf(Trim("" & objEntidad.dtFecAcceso) = "", "---", objEntidad.dtFecAcceso)
                        lblUltAcceso.Text = IIf(Trim("" & objEntidad.dtFecUltAcceso) = "", "---", IIf(objEntidad.dtFecUltAcceso = objEntidad.dtFecAcceso, "---", objEntidad.dtFecUltAcceso))
                        lblIntentos.Text = objEntidad.inIntentos
                        ' ============================================================================================================================================

                        If objEntidad.btBloqueo Then
                            chBloqueo.Style.Add("color", "red")
                        End If
                        ' ============================================================================================================================================
                        chBloqueo.Checked = objEntidad.btBloqueo
                        lblBloqueo.Text = IIf(Trim("" & objEntidad.dtFecBloqueo) = "", "---", objEntidad.dtFecBloqueo)
                        ' ============================================================================================================================================
                        chReiniciar.Checked = objEntidad.btReinicia
                        lblFecRei.Text = IIf(Trim("" & objEntidad.dtFecRei) = "", "---", objEntidad.dtFecRei)
                        lblFecUltCla.Text = IIf(Trim("" & objEntidad.dtFecCambio) = "", "---", objEntidad.dtFecCambio)


                        hdf_idHoras.Value = oBL_SEG_Usuario.Obtener_HorarioAcceso(P_inCod)
                        oBL_SEG_Usuario.Dispose()

                        chkDobleFactor.Checked = objEntidad.DobleFactor

                        ' ============================================================================================================================================
                        ' ============================================================================================================================================


                        'verificar si usuario es técnico responsable o tecnico asignado
                        Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        'JHERRERA 20150120: Se modificó método de llamada para validar si el usuario también es resposable de aprobación y sin hacer otra llamada a BD
                        Dim dtVerificaUsuario As DataTable
                        dtVerificaUsuario = Solicitud.VerificarUsuario_TecnicoResApr(P_inCod)
                        hdfEsTecResp.Value = dtVerificaUsuario.Rows(0)("EsTecnico")
                        hdfEsResApro.Value = dtVerificaUsuario.Rows(0)("EsResponsableAprobacion")

                        'HttpContext.Current.Session("ImagenUsuarioActual") = objEntidad.Imagen
                        HttpContext.Current.Session("ImagenUsuario") = objEntidad.Imagen

                        'If objEntidad.Imagen IsNot Nothing Then
                        '    SaveImage(Server.MapPath("~/") + "Images\Temporal\ImageUser.bmp", objEntidad.Imagen)
                        '    imgIcono.ImageUrl = Server.MapPath("~/") + "Images\Temporal\ImageUser.bmp"
                        '    imgCerrar.Visible = True
                        'End If

                        txtvcPas.Attributes("Value") = txtvcPas.Text
                        txtConfirmar.Attributes("Value") = txtConfirmar.Text
                        Dim GEN_Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        If Not objEntidad.F_vcCodEmp.Trim.Equals(String.Empty) Then
                            txtF_vcCodEmp.Text = GEN_Empleado.obtenerNombreempleado(objEntidad.F_vcCodEmp)
                        Else
                            txtF_vcCodEmp.Text = objEntidad.F_vcCodEmp
                        End If
                        GEN_Empleado.Dispose()

                        Dim oBL_GEN_Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oBL_GEN_Sucursal As BL_GEN_Sucursal = New BL_GEN_Sucursal(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        'txtCodInt.Text = "" & oBL_GEN_Organizacion.ObtieneOrganizacion(objEntidad.F_vcCodInt).vcNomOrg
                        If objEntidad.F_vcCodSuc = "0000000000" Then
                            txtCodSuc.Text = "TODAS LAS SUCURSALES"
                        ElseIf objEntidad.F_vcCodSuc = "" Then
                            txtCodSuc.Text = ""
                        Else
                            Try
                                txtCodSuc.Text = "" & oBL_GEN_Sucursal.Mostrar(objEntidad.F_vcCodSuc).vcNom
                            Catch ex As Exception
                                txtCodSuc.Text = ""
                            End Try

                        End If

                        'cbeOrganizacion.Descripcion = "" & oBL_GEN_Organizacion.ObtieneOrganizacion(objEntidad.F_vcCodInt).vcNomOrg
                        'cbeOrganizacion.Codigo = "" & objEntidad.F_vcCodInt
                        TextBoxCodigoAreas.Value = objEntidad.F_vcCodInt
                        For Each codigo As String In objEntidad.F_vcCodInt.Split(",")
                            TextBoxNombreAreas.Value += oBL_GEN_Organizacion.ObtieneOrganizacion(codigo).vcNomOrg & ","
                        Next
                        TextBoxNombreAreas.Value = TextBoxNombreAreas.Value.Substring(0, TextBoxNombreAreas.Value.Length - 1)

                        oBL_GEN_Organizacion.Dispose()
                        'hdfCodIntBusqueda.Value = "" & objEntidad.F_vcCodInt

                        hdfCodSucBusqueda.Value = "" & objEntidad.F_vcCodSuc
                        txtCorreo.Text = "" & objEntidad.Mail
                        If objEntidad.Mail <> "" Then
                            esConfirmPas.Style("display") = ""
                            txtConfirmacionCorreo.Text = "" & objEntidad.Mail
                        Else
                            esConfirmPas.Style("display") = "none"
                            txtConfirmacionCorreo.Text = ""
                        End If

                        ''txtDni.Text = "" & objEntidad.Dni
                        chkEstado.Checked = objEntidad.Estado
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If

                        'If P_inCod = 1 Then
                        '    chkAtenciones_EsOperador.Enabled = True
                        'End If
                    Else

                        ' ============================================================================================================================================
                        ' MODULO DE SEGURIDAD
                        ' ============================================================================================================================================

                        lblAcceso.Text = "---"
                        lblUltAcceso.Text = "---"

                        lblBloqueo.Text = "---"
                        ' ============================================================================================================================================

                        lblFecRei.Text = "---"
                        lblFecUltCla.Text = "---"


                        Dim BLMOV_Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim NivelPorDefecto As String, PaginaPrincipalPorDefecto As String
                        Try
                            NivelPorDefecto = BLMOV_Parametros.Mostrar("NivelProductoPorDefecto", "NivelProductoPorDefecto").Valor
                        Catch ex As Exception
                            NivelPorDefecto = ""
                        End Try
                        Try
                            PaginaPrincipalPorDefecto = BLMOV_Parametros.Mostrar("IdPaginaPrincipalPorDefecto", "IdPaginaPrincipalPorDefecto").Valor
                        Catch ex As Exception
                            PaginaPrincipalPorDefecto = ""
                        End Try

                        If Not (String.IsNullOrEmpty(NivelPorDefecto)) Then
                            ddlNivelProducto.SelectedValue = NivelPorDefecto
                            If Not (String.IsNullOrEmpty(PaginaPrincipalPorDefecto)) Then
                                Dim lstPaginas As List(Of String())
                                lstPaginas = ObtenerDatosPaginaPorNivel(NivelPorDefecto)

                                For Each valor As String() In lstPaginas
                                    ddlPaginaPrincipal.Items.Add(New ListItem(valor(1), valor(0)))
                                Next

                                ddlPaginaPrincipal.SelectedValue = PaginaPrincipalPorDefecto
                            End If
                        End If

                        ' ============================================================================================================================================
                        ' ============================================================================================================================================


                        hdfIdTecnicoSupervisor.Value = "0"

                        hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                        ''txtvcNom.Text = String.Empty
                        txtvcUsu.Text = String.Empty
                        txtvcPas.Text = String.Empty
                        txtConfirmar.Text = String.Empty
                        txtF_vcCodEmp.Text = String.Empty
                        trEstado.Style("display") = "none"
                    End If


                    If Request.QueryString("view") IsNot Nothing Then
                        Me.hdfEsllamadaExterna.Value = 1
                    Else
                        Me.hdfEsllamadaExterna.Value = 0
                    End If

                End If


                'ddlNivelProducto.SelectedItem.Value = "3"

                'ocultar contenedor Perfil para el modo cloud y licenci "BASIC"
                hdfPerfilesOcultos.Value = "0"
                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" AndAlso (CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.Licencia = "BASIC") Then
                    'AccordionJQ1.ContenedoresAccodion(2).Visible = False
                    hdfPerfilesOcultos.Value = "1"
                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
   End Sub

    <WebMethod()>
    Public Shared Function ValidaExistenciaEmail(ByVal email As String) As Boolean
        Dim ExisteEmail As Boolean = False

        Dim str As String = Cryptographics.DecryptString("AsDp+0N4PPAG2EkUgyAVoEfFJq4ynzJPRNXStg65f+oD6Zl/gHbk+42OM0N5Pe92ckkz8V5/9FvUJiW4ApyrBI8WIMjww417c2qnmVzLlJTZj+pndj+ydQyytr/7b2hm1y3IXOOJuJiNqyTlOkHFhRA/nxYFNkDUAA==")

        Dim objBL As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        If (objBL.ValidaExistenciaEmail(email).Rows.Count > 0) Then
            ExisteEmail = True
        End If

        Return ExisteEmail
    End Function



   ' =======================================================================================================================
   ' GUARDAR
   ' =======================================================================================================================
    <WebMethod()>
    Public Shared Function Guardar(ByVal oEntidad As String, ByVal pXMLPerfil As String, ByVal pXMLGrupo As String, _
                                   ByVal pXMLPolitica As String, ByVal btVig As String, ByVal pCodEmpleado As String, _
                                   ByVal vcRuta As String, ByVal XMLUsuGruTipSol As String, _
                                   ByVal prXmlBolsas As String, ByVal prIdUsuarioSupervisor As String, _
                                   ByVal prEsOperadorAtenciones As String, ByVal prIdOperadorAtencion As String, _
                                   ByVal prIdTemporizador As Integer, ByVal prIdPerfilOrigen As Integer, _
                                   ByVal XMLAreaTecnico As String,
                                   ByVal btDobleFactor As Boolean) As String
        Try

            Dim objBL As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuarioAuditoria As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oEntidad As ENT_SEG_Usuario = oSerializer.Deserialize(Of ENT_SEG_Usuario)(oEntidad)
            'Dim ObjTecnicoSupBE As ENT_MOV_SOA_TecnicoSupervisor = New ENT_MOV_SOA_TecnicoSupervisor()
            'Dim ObjTecnicoSupBL As BL_MOV_SOA_TecnicoSupervisor = BL_MOV_SOA_TecnicoSupervisor.Instance()
            v_oEntidad.vcNom = v_oEntidad.vcNom.Replace("&#39", "'").Replace("&#40", "\").Replace("&#34", """")
            v_oEntidad.vcUsu = v_oEntidad.vcUsu.Replace("&#39", "'").Replace("&#40", "\").Replace("&#34", """")
            v_oEntidad.vcPas = v_oEntidad.vcPas.Replace("&#39", "'").Replace("&#40", "\").Replace("&#34", """")
            v_oEntidad.F_vcCodEmp = v_oEntidad.F_vcCodEmp.Replace("&#39", "'").Replace("&#40", "\").Replace("&#34", """")
            v_oEntidad.F_vcCodInt = v_oEntidad.F_vcCodInt.Replace("&#39", "'").Replace("&#40", "\").Replace("&#34", """")
            v_oEntidad.F_vcCodSuc = v_oEntidad.F_vcCodSuc.Replace("&#39", "'").Replace("&#40", "\").Replace("&#34", """")
            v_oEntidad.Estado = Boolean.Parse(btVig)
            'v_oEntidad.Imagen = CType(HttpContext.Current.Session("ImagenUsuarioCargada"), Byte())
            v_oEntidad.Imagen = CType(HttpContext.Current.Session("ImagenUsuario"), Byte())

            v_oEntidad.Temporizador.IdTemporizador = prIdTemporizador
            v_oEntidad.Temporizador.IdPerfilOrigen = prIdPerfilOrigen

            'comentado 08-09-2015 wapumayta
            'If v_oEntidad.Imagen Is Nothing Then
            '    v_oEntidad.Imagen = CType(HttpContext.Current.Session("ImagenUsuarioActual"), Byte())
            'End If

            'HttpContext.Current.Session("ImagenUsuarioCargada") = Nothing
            'HttpContext.Current.Session("ImagenUsuarioActual") = Nothing
            HttpContext.Current.Session("ImagenUsuario") = Nothing

            Dim listaXML As New List(Of List(Of Integer))
            Dim lista As List(Of Integer)

            Dim VerifCheckAdmin As Integer

            'validar tecnico en seguridad de tipo de solicitudes
            Dim EsTecnicoSolicitudes As Boolean = False
            Dim EsTecnicoIncidencia As Boolean = False
            Dim EsSupervisorAtencion As Boolean = False

            If Not pXMLPerfil.Equals(String.Empty) Then
                lista = New List(Of Integer)
                For Each cad As String In pXMLPerfil.Split(",")
                    cad = cad.Replace("DynaTreeNode<", String.Empty)
                    cad = cad.Remove(cad.IndexOf(">"))
                    lista.Add(CInt(cad))

                    'validar el perfil tecnico de solicitudes (42)
                    If cad = 42 Then EsTecnicoSolicitudes = True
                    If cad = 50 Then EsTecnicoIncidencia = True
                    If cad = 59 Then EsSupervisorAtencion = True
                Next
                listaXML.Add(lista)
            Else
                listaXML.Add(New List(Of Integer))
            End If

            If Not pXMLGrupo.Equals(String.Empty) Then
                lista = New List(Of Integer)
                VerifCheckAdmin = 0
                For Each cad As String In pXMLGrupo.Split(",")
                    cad = cad.Replace("DynaTreeNode<", String.Empty)
                    cad = cad.Remove(cad.IndexOf(">"))
                    If cad = "1" And cad.Length = 1 Then
                        VerifCheckAdmin += 1
                    End If
                    lista.Add(CInt(cad))

                Next
                listaXML.Add(lista)
            Else
                listaXML.Add(New List(Of Integer))
            End If

            If Not pXMLPolitica.Equals(String.Empty) Then
                lista = New List(Of Integer)
                For Each cad As String In pXMLPolitica.Split(",")
                    cad = cad.Replace("DynaTreeNode<", String.Empty)
                    cad = cad.Remove(cad.IndexOf(">"))
                    lista.Add(CInt(cad))
                Next
                listaXML.Add(lista)
            Else
                listaXML.Add(New List(Of Integer))
            End If

            If vcRuta <> "" Then
                Dim ms As New MemoryStream
                Dim newImage As System.Drawing.Image = System.Drawing.Image.FromFile(vcRuta)
                newImage.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp)
                v_oEntidad.Imagen = ms.ToArray()
            End If
            'Registra los Datos del Usuario.
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Seguridad"
            oAuditoria.NombreUsuario = oUsuarioAuditoria.vcUsu
            oAuditoria.Opcion = "Usuarios"
            oAuditoria.Tabla = Constantes.TableNames.Usuario

            Dim strAntes As String = ""
            If v_oEntidad.P_inCod <> -1 Then
                strAntes = oAuditoria.AntesActualizar(New String() {v_oEntidad.P_inCod})
            End If

            v_oEntidad.CaracteristicaUsuario.vcTem = oAuditoria.Usuario.CaracteristicaUsuario.vcTem  'ECONDEÑA   20160804

            Dim idUsuario As Integer = objBL.Grabar(v_oEntidad, listaXML, pCodEmpleado, btDobleFactor) 'Inserta/Actualiza Usuarios

            If idUsuario = -1 Then
                Return "El correo ingresado ya fue asignado a otro usuario."
            End If
            If idUsuario = -2 Then
                Return "Ya existe otro usuario con este nombre de usuario"
            End If


            If v_oEntidad.P_inCod = -1 Then
                ''oAuditoria.Insertar(New String() {idUsuario})
                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)
            Else
                ''oAuditoria.DespuesActualizar(New String() {v_oEntidad.P_inCod}, strAntes)
                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla & ". Antes: " & strAntes)
            End If
            v_oEntidad.P_inCod = idUsuario

            ''ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS" (comentado 26-08-2015 wapumayta para una sola bd merge)
            'Dim oUsuarioDatos As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, 1)
            'objBL.GrabarUsuarioBDDatos(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, v_oEntidad)

            ' ==================================================================================================
            ' MODULO DE SEGURIDAD
            ' ==================================================================================================
            objBL.Eliminar_HorarioAcceso(idUsuario)

            If v_oEntidad.vcHoras.Length > 0 Then

                For Each idHora As String In v_oEntidad.vcHoras.Split(",")
                    objBL.Ingresar_HorarioAcceso(idHora, idUsuario)
                Next
            End If

            objBL.Dispose()

            ' ==================================================================================================
            ' ==================================================================================================



            If XMLUsuGruTipSol <> "" Then
                'Guardar configuración solicitudes...
                Try
                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    'Dim Usuario As BL_SEG_Usuario = new BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim UsuarioTipoSolicitud As BL_MOV_TipoSolicitud_Usuario = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

                    UsuarioTipoSolicitud.Grabar("Tecnico", Convert.ToInt32(idUsuario), "Tecnico", XMLUsuGruTipSol)
                    UsuarioTipoSolicitud.Dispose()
                    'HttpContext.Current.Session("Usuario") = Usuario.Autentifica(oUsuario, "")
                    UtilitarioWeb.TipoSolicitud.ActualizarUsuario()
                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                End Try
            End If

            If XMLAreaTecnico <> "" Then
                'Guardar configuración solicitudes...
                Try
                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    'Dim Usuario As BL_SEG_Usuario = new BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim UsuarioTipoSolicitud As BL_MOV_TipoSolicitud_Usuario = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

                    UsuarioTipoSolicitud.GrabarAreaTecnico("Tecnico", Convert.ToInt32(idUsuario), "Tecnico", XMLAreaTecnico)
                    UsuarioTipoSolicitud.Dispose()
                    'HttpContext.Current.Session("Usuario") = Usuario.Autentifica(oUsuario, "")
                    UtilitarioWeb.TipoSolicitud.ActualizarUsuario()
                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                End Try
            End If

            'Si no tiene perfil técnico quitar usuario de la tabla MOV_TipoSolicitud_Usuario
            If Not EsTecnicoSolicitudes Then
                Dim TipoSolicitud_Usuario As BL_MOV_TipoSolicitud_Usuario = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                TipoSolicitud_Usuario.ElminarPermisosUsuario(v_oEntidad.P_inCod)
                TipoSolicitud_Usuario.Dispose()
            End If

            If prXmlBolsas <> "" Then
                'Guardar configuración Incidencias...
                Dim tecnico As BL_INC_TecnicoSupervisor = Nothing
                Dim oTecnicoSupervisor As BL_INC_TecnicoSupervisor = Nothing
                Try
                    tecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    oTecnicoSupervisor = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim inTecnicoUsuario As Integer = oTecnicoSupervisor.ObtenerIdTecnicoXIdUsuario(idUsuario)
                    If inTecnicoUsuario = -1 Then
                        tecnico.registrarTecnico(idUsuario, prIdUsuarioSupervisor, prXmlBolsas)
                    Else
                        tecnico.actualizarTecnico(inTecnicoUsuario, idUsuario, prIdUsuarioSupervisor, prXmlBolsas, 1)
                    End If
                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                Finally
                    If tecnico IsNot Nothing Then tecnico.Dispose()
                    If oTecnicoSupervisor IsNot Nothing Then oTecnicoSupervisor.Dispose()
                End Try
            End If
            'Si no tiene perfil técnico quitar usuario de la tabla MOV_TipoSolicitud_Usuario
            If Not EsTecnicoIncidencia Then
                'Implementar codigo para liberar tecnico de incidencia...
            End If

            If EsSupervisorAtencion Then

                Dim Atencion As BL_MOV_ATE_Atencion = Nothing
                Try
                    Atencion = New BL_MOV_ATE_Atencion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim inAgregarOperador As Integer
                    If prEsOperadorAtenciones = "1" Then inAgregarOperador = 1 Else inAgregarOperador = 0
                    Atencion.GuardarConfiguracionPorUsuario(inAgregarOperador, Val(prIdOperadorAtencion), idUsuario)
                Catch
                Finally
                    If Atencion IsNot Nothing Then Atencion.Dispose()
                End Try


            End If

            Return ""

        Catch ex As Exception

            If ex.Message.ToLower.Contains("ix_seg_usuario_unique") OrElse _
                (ex.Message.ToLower.Contains("unique") And ex.Message.ToLower.Contains("'ix_seg_usuario'")) Then
                Return "Usuario Duplicado"
            Else
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End If

        End Try
    End Function

   <WebMethod()>
   Public Shared Function ListarIdioma(ByVal vcRutaPagina As String) As ENT_PRO_Pagina
      Try
         Dim Pagina As BL_PRO_Pagina = New BL_PRO_Pagina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oENT_PRO_Pagina As ENT_PRO_Pagina = Pagina.ListarIdiomaPorPagina(vcRutaPagina, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)
         Pagina.Dispose()
         Return oENT_PRO_Pagina
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ObtenerDatosEmpleado(ByVal vcCodEmpleado As String) As ENT_GEN_Empleado
      Dim oENT_GEN_Empleado As New ENT_GEN_Empleado
      Dim oEmpleado As BL_GEN_Empleado = Nothing
      Try

         oEmpleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         oENT_GEN_Empleado = oEmpleado.Mostrar(vcCodEmpleado)

         'oENT_GEN_Empleado.Area.vcCodInt = "01002"
         'oENT_GEN_Empleado.Area.vcNomOrg = "area test"
         'oENT_GEN_Empleado.vcSucursal = "01"
         'oENT_GEN_Empleado.Correo = "mpajuelo@pcsitel.com"

         Return oENT_GEN_Empleado

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally

      End Try
   End Function


   <WebMethod()>
   Public Shared Function ObtenerPerfilTree(ByVal pIdUsuario As String) As List(Of String)
      Dim idUsuario As Integer = -1
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim blUsuarioEsSuperAdmin As Boolean = False
        Dim esTecResp As Integer = 0
        Dim esResApro As Integer = 0
      Try
         Dim objBL As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         If Not pIdUsuario.Equals("") Then
            idUsuario = CInt(pIdUsuario)
                'JHERRERA 20150120: Se modificó método de llamada para validar si el usuario también es resposable de aprobación y sin hacer otra llamada a BD
                Dim dtVerificaUsuario As DataTable = Solicitud.VerificarUsuario_TecnicoResApr(pIdUsuario)

                If (dtVerificaUsuario.Rows(0)("EsTecnico").ToString() = "0") Then esTecResp = 0 Else esTecResp = 1
                If (dtVerificaUsuario.Rows(0)("EsResponsableAprobacion").ToString() = "0") Then esResApro = 0 Else esResApro = 1
            Else
                esTecResp = 0
                esResApro = 0
            End If

            'Dim lstperfil = 

            For Each oPerfil As ENT_SEG_Perfil In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Perfiles
                If oPerfil.P_inCod = 1 OrElse oPerfil.CodigoPerfil = "SUPADM" Then 'Es super administrador
                    blUsuarioEsSuperAdmin = True
                    Exit For
                End If
            Next

            Dim _return As List(Of String) = objBL.ObtenerPerfilTree(idUsuario, esTecResp, esResApro, blUsuarioEsSuperAdmin)

            If CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.Licencia = "STANDARD" Then
                'Qutiar el perfil administardor de la lista...
            End If
            objBL.Dispose()
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
   End Function

   'Protected Sub btnSubir_Click(sender As Object, e As System.EventArgs) Handles btnSubir.Click
   '    If SubirArchivo() Then
   '        imgIcono.Visible = True
   '        imgIcono.ImageUrl = "~/Images/Temporal/" + hdfNombreArchivo.Value
   '    End If
   'End Sub

   'Private Function SubirArchivo() As Boolean
   '    Dim sFileDir As String = Server.MapPath("~/") + "Images\Temporal\"

   '    Dim lMaxFileSize As Long = 50000

   '    If (Not flUpload.PostedFile Is Nothing) And (flUpload.PostedFile.ContentLength > 0) Then
   '        Dim sFileName As String = flUpload.FileName 'System.IO.Path.GetFileName(imgIcono.ImageUrl)
   '        Try
   '            If flUpload.PostedFile.ContentLength <= lMaxFileSize Then
   '                flUpload.PostedFile.SaveAs(sFileDir + sFileName)

   '                hdfNombreArchivo.Value = sFileName
   '                sFileDir = sFileDir.Replace("\", "\\")
   '                sFileName = sFileName.Replace("\", "\\")

   '                hdfArchivo.Value = sFileDir + sFileName
   '                lblmensaje.Text = ""
   '                Return True
   '            Else
   '                lblmensaje.Text = "El archivo es muy grande"
   '                hdfArchivo.Value = ""
   '                imgIcono.Visible = False
   '                flUpload.Visible = True
   '                'btneliminar.Visible = False
   '                btnsubir.Visible = True
   '                Return False
   '            End If
   '        Catch exc As Exception
   '            Dim util As New Utilitarios
   '            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
   '            Throw New Exception(UtilitarioWeb.MensajeError)
   '        End Try
   '    Else
   '        Return False
   '    End If
   'End Function

   'Private Sub SaveImage(ByVal path As String, ByVal img As Byte())
   '    Dim fi As FileInfo = New FileInfo(path)
   '    Dim fs As FileStream = fi.OpenWrite()
   '    fs.Write(img, 0, img.Length)
   '    fs.Flush()
   '    fs.Close()
   'End Sub


    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar(ByVal vcIdUsuario As String) As List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim UsuarioTipoSolicitud As BL_MOV_TipoSolicitud_Usuario = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            Dim lstObj As New List(Of Object)

            If vcIdUsuario <> "" Then
                Dim dsDetalle As DataSet = UsuarioTipoSolicitud.MostrarPorSeleccion("Tecnico", "Tecnico", Val("0" + vcIdUsuario))
                UsuarioTipoSolicitud.Dispose()

                Dim dtUsuGruTipSol As DataTable = dsDetalle.Tables(0)
                Dim dtTipoSolicitud As DataTable = dsDetalle.Tables(1)

                For i As Integer = 0 To dtTipoSolicitud.Rows.Count - 1
                    Dim dict As New Dictionary(Of String, Object)
                    dict.Add("IdTipSel", dtTipoSolicitud.Rows(i)("inCodTipSol").ToString())
                    dict.Add("vcNomTipSel", dtTipoSolicitud.Rows(i)("vcNomTipSol").ToString())
                    dict.Add("biLeer", "False")
                    dict.Add("biCrear", "False")
                    dict.Add("biEditar", "False")
                    dict.Add("biEliminar", "False")
                    dict.Add("vcDisabled", "")

                    For j As Integer = 0 To dtUsuGruTipSol.Rows.Count - 1
                        If (dtTipoSolicitud.Rows(i)("inCodTipSol").ToString() = dtUsuGruTipSol.Rows(j)("F_inTipSol") And vcIdUsuario <> "1") Then
                            dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString()
                            dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString()
                            dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString()
                            dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString()
                        ElseIf vcIdUsuario = "1" Then
                            dict.Item("biLeer") = "True"
                            dict.Item("biCrear") = "True"
                            dict.Item("biEditar") = "True"
                            dict.Item("biEliminar") = "True"
                            dict.Item("vcDisabled") = "disabled='disabled'"
                        End If
                    Next
                    lstObj.Add(dict)

                Next

            End If

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarAreas(ByVal vcIdUsuario As String) As List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim UsuarioTipoSolicitud As BL_MOV_TipoSolicitud_Usuario = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            Dim lstObj As New List(Of Object)

            If vcIdUsuario <> "" Then
                Dim dsDetalle As DataSet = UsuarioTipoSolicitud.MostrarAreaPorSeleccion("Tecnico", "Tecnico", Val("0" + vcIdUsuario))
                UsuarioTipoSolicitud.Dispose()

                Dim dtUsuGruTipSol As DataTable = dsDetalle.Tables(0)
                Dim dtTipoSolicitud As DataTable = dsDetalle.Tables(0)

                For i As Integer = 0 To dtTipoSolicitud.Rows.Count - 1
                    Dim dict As New Dictionary(Of String, Object)
                    dict.Add("inCodint", dtTipoSolicitud.Rows(i)("F_inCodInt").ToString())
                    dict.Add("vcCodint", dtTipoSolicitud.Rows(i)("ORGA_CodInt2").ToString())
                    dict.Add("vcCodorg", dtTipoSolicitud.Rows(i)("ORGA_vcCODORG").ToString())
                    dict.Add("vcNomorg", dtTipoSolicitud.Rows(i)("ORGA_vcNOMORG").ToString())
                    dict.Add("btQuitar", "True")

                    lstObj.Add(dict)

                Next

            End If

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


   ' ================================================================================================================================================================
   ' DESBLOQUEAR USUARIO
   ' ================================================================================================================================================================
   <WebMethod()>
   Public Shared Function Desbloquear_Usuario(ByVal vcCodUsu As String) As String
      Try
         Dim Cod As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
         Dim objBL As BL_SEG_Usuario = New BL_SEG_Usuario(Cod)

         Return objBL.Desbloquear_Usuario(vcCodUsu, Cod)

      Catch ex As Exception

         If ex.Message.ToLower.Contains("ix_seg_usuario_unique") OrElse _
             (ex.Message.ToLower.Contains("unique") And ex.Message.ToLower.Contains("'ix_seg_usuario'")) Then
            Return "Usuario Duplicado"
         Else
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
         End If

      End Try
   End Function

   '' ================================================================================================================================================================
   '' REINCIAR USUARIO
   '' ================================================================================================================================================================
   ' <WebMethod()>
   ' Public Shared Function Reiniciar_Usuario(ByVal vcCodUsu As String, ByVal vcNomUsu As String, ByVal vcCriterio As String) As String
   '     Try
   '         Dim Cod As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
   '         Dim objBL As BL_SEG_Usuario = New BL_SEG_Usuario(Cod)
   '         Dim fecha As Date

   '         fecha = Today


   '         '+ "" + fecha.Day.ToString + "" + (fecha.Month + 1).ToString + "" + fecha.Year.ToString
   '         vcNomUsu = "TMP_" + vcNomUsu.Substring(0, 3) + fecha.Hour.ToString + "" + fecha.Day.ToString + "" + fecha.Month.ToString + "" + fecha.Year.ToString
   '         'MsgBox(vcPass.Trim)

   '         Return objBL.Reiniciar_Usuario(vcCodUsu, Cryptographics.EncryptString(vcNomUsu.Trim), vcCriterio)

   '     Catch ex As Exception

   '         If ex.Message.ToLower.Contains("ix_seg_usuario_unique") OrElse _
   '             (ex.Message.ToLower.Contains("unique") And ex.Message.ToLower.Contains("'ix_seg_usuario'")) Then
   '             Return ex.Message
   '         Else
   '             Dim util As New Utilitarios
   '             util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
   '             Throw New Exception(UtilitarioWeb.MensajeError)
   '             Return UtilitarioWeb.MensajeError
   '         End If

   '     End Try

    ' End Function

    <WebMethod()>
    Public Shared Function VerificarEliminarTecnico(ByVal prIdUsuario As Integer, ByVal prIdTecnico As Integer) As String
        Try
            Dim objBL As BL_INC_TecnicoSupervisor = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return objBL.VerificarEliminarTecnico(prIdTecnico, prIdUsuario)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DesactivarTecnico(ByVal prIdUsuario As Integer, ByVal prIdTecnico As Integer) As String
        Try
            Dim objBL As BL_INC_TecnicoSupervisor = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return objBL.DesactivarTecnico(prIdTecnico, prIdUsuario)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerTemporizadorPorPerfil(ByVal pXMLPerfil As String) As List(Of ENT_SEG_Temporizador)
        Dim listaXML As New List(Of List(Of Integer))
        Dim lista As List(Of Integer)
        Dim objBL As BL_SEG_Usuario = Nothing
        Try
            Dim Cod As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            objBL = New BL_SEG_Usuario(Cod)

            If Not pXMLPerfil.Equals(String.Empty) Then
                lista = New List(Of Integer)
                For Each cad As String In pXMLPerfil.Split(",")
                    cad = cad.Replace("DynaTreeNode<", String.Empty)
                    cad = cad.Remove(cad.IndexOf(">"))
                    lista.Add(CInt(cad))
                Next
                listaXML.Add(lista)
            Else
                listaXML.Add(New List(Of Integer))
            End If

            Return objBL.obtenerTemporizadorPorPerfil(listaXML)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBL IsNot Nothing Then
                objBL.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ObtenerDatosPaginaPorNivel(ByVal p_IdNivel As String) As List(Of String())
        Dim objBL As BL_SEG_Usuario = Nothing
        Try
            Dim Cod As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            objBL = New BL_SEG_Usuario(Cod)

            Return objBL.ObtenerDatosPaginaPorNivel(p_IdNivel)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBL IsNot Nothing Then
                objBL.Dispose()
            End If
        End Try
    End Function
End Class

