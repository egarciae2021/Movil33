Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Auditoria
Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Collections
Imports System.Collections.Generic
Imports System.IO
Imports CompCorreo
Imports UtilitarioWeb
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Serialization
Imports UtilitarioWeb.TipoSolicitud
Imports System.Data.SqlClient
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE

Partial Class P_Movil_Administrar_Adm_NuevaSolicitudMasivo
    Inherits System.Web.UI.Page
    Shared ruta As String = String.Empty

    Protected Sub form1_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles form1.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                'Registra auditoria...
                Dim oAuditoria As New ProcesaAuditoria
                oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
                oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.CrearSolicitud
                oAuditoria.NombreUsuario = oUsuario.vcUsu

                'AUDITORIA : Se inserta el Usuario Logeado
                oAuditoria.Tabla = Constantes.TableNames.Usuario
                ''oAuditoria.Acceso()


                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                hdfAdmin.Value = "0"
                If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                'Es jefe de área
                hdfJefeArea.Value = "0"
                If oUsuario.esJefeArea Then hdfJefeArea.Value = "1"

                'CULTURA
                'Dim GEN_Cultura As BL_GEN_Cultura = BL_GEN_Cultura.Instance
                'Dim GEN_Region As BL_GEN_Regi = new BL_GEN_Regi(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim oCultura As ENT_GEN_Cultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
                'hdfNumDecimales.Value = oCultura.dcNumDec
                'hdfSepDecimal.Value = oCultura.vcSimDec
                'hdfSepMiles.Value = oCultura.vcSimSepMil
                'FIN CULTURA

                If hdfAdmin.Value = "1" Then
                    ''lblEmpleado.Style("display") = "none"
                    ''ddlTipoSolicitud.Enabled = False
                    hdfCodEmpleado.Value = ""
                    hdfCodIntEmp.Value = ""

                ElseIf hdfJefeArea.Value = "1" Or oUsuario.F_vcCodInt <> "" Then 'Responsable de por lo menos un área

                    ''lblEmpleado.Style("display") = "none"
                    ''txtEmpleado.Style("display") = "none"
                    btnBusquedaEmpleado.Style("display") = "none"
                    hdfCodEmpleado.Value = ""
                    hdfCodIntEmp.Value = ""

                    Dim vcWhere = ""
                    If hdfJefeArea.Value = "1" Then 'Responsable de por lo menos un área
                        Dim lstArea = oUsuario.CodIntResp.Split(",")
                        For i As Integer = 0 To lstArea.Length - 1
                            vcWhere = vcWhere + "EMPL_CodInt2 LIKE |" + lstArea(i) + "%| or "
                        Next
                    Else 'Usuario de tipo organización
                        vcWhere = vcWhere + "EMPL_CodInt2 LIKE |" + oUsuario.F_vcCodInt + "%| or "
                    End If

                    If vcWhere.Length > 0 Then
                        vcWhere = vcWhere.Substring(0, vcWhere.Length - 4)
                        vcWhere = "(" + vcWhere + ") AND EMPL_btEst = 1"
                    End If

                    ''bpEmpleado.Visible = True
                    ''bpEmpleado.NombreEntidad = "Empleado"
                    ''bpEmpleado.vcTab = "M_EMPL"
                    ''bpEmpleado.TipoOrigen = 1
                    ' ''bpEmpleado.Condicion = "EMPL_CodInt2 LIKE |" + oUsuario.CodIntResp + "%|"
                    ''bpEmpleado.Condicion = vcWhere
                    ''bpEmpleado.FuncionPersonalizada = "fnMostrarCodEmp"
                    ''bpEmpleado.RutaRaiz = "../../"
                    ''bpEmpleado.Contenedor = "dvContenedorControlBP"
                    ''bpEmpleado.Codigo = "EMPL_P_vcCODEMP"
                    ''bpEmpleado.TipoLinea = hdfCodLinTip_X_User.Value

                    ''ddlTipoSolicitud.Enabled = False

                Else
                    If oUsuario.Empleado.P_vcCod <> "" Then
                        ''Dim Empleado As VisualSoft.Suite80.BL.BL_GEN_Empleado = New VisualSoft.Suite80.BL.BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        ''lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
                        ''Empleado.Dispose()
                        ''txtEmpleado.Style("display") = "none"

                        hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                        hdfCodIntEmp.Value = oUsuario.F_vcCodInt
                    End If

                    ddlTipoSolicitud.Enabled = True

                    tdNombreEmpleado1.Visible = False
                    ''tdNombreEmpleado2.Visible = False
                    tdNombreEmpleado3.Visible = False
                End If

                'Dim Solicitud As BL_MOV_Solicitud = BL_MOV_Solicitud.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                'Dim tipsol As New List(Of Utilitario.Itemlst)
                'Dim item0 As New Utilitario.Itemlst
                'item0.inCod = "-1"
                'item0.vcNom = "--Seleccione--"
                'tipsol.Add(item0)
                'tipsol.AddRange(Utilitario.ListarTipoSolicitud(-1, ""))
                'UtilitarioWeb.Dataddl(ddlTipoSolicitud, tipsol, "vcNom", "inCod")
                Dim script As String = "var arTiposSolicitud = new Array();"
                'Dim TipoSolicitud As BL_MOV_TipoSolicitud = BL_MOV_TipoSolicitud.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoSolicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

                Dim vcGruTipSolCre As String = ""
                For i As Integer = 0 To oUsuario.TipoSolicitudGrupoOrigen.Count - 1
                    If oUsuario.TipoSolicitudGrupoOrigen.Item(i).biCrear Then
                        vcGruTipSolCre += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
                    End If
                Next
                If vcGruTipSolCre.Length > 0 Then
                    vcGruTipSolCre = vcGruTipSolCre.Substring(0, vcGruTipSolCre.Length - 1)
                Else
                    vcGruTipSolCre = "0"
                End If

                ''Permisos creacion por tipo de solicitud
                'script += "var arPermisosTipSol = new Array();"
                'For Each TipSol_GrupOrig As ENT_MOV_TipoSolicitud_GrupoOrigen In oUsuario.TipoSolicitudGrupoOrigen
                '    script += "arPermisosTipSol['es" + TipSol_GrupOrig.F_inTipSol.ToString() + "'] = [];"
                '    script += "arPermisosTipSol['es" + TipSol_GrupOrig.F_inTipSol.ToString() + "'].Crear = '" + TipSol_GrupOrig.biCrear.ToString() + "';"
                '    script += "arPermisosTipSol['es" + TipSol_GrupOrig.F_inTipSol.ToString() + "'].Leer = '" + TipSol_GrupOrig.biLeer.ToString() + "';"
                '    script += "arPermisosTipSol['es" + TipSol_GrupOrig.F_inTipSol.ToString() + "'].Editar = '" + TipSol_GrupOrig.biEditar.ToString() + "';"
                '    script += "arPermisosTipSol['es" + TipSol_GrupOrig.F_inTipSol.ToString() + "'].Eliminar = '" + TipSol_GrupOrig.biEliminar.ToString() + "';"
                'Next

                'Pefiles Usuario logueado
                Dim vcPerfiles As String = String.Empty
                For j As Integer = 0 To oUsuario.Perfiles.Count - 1
                    If (vcPerfiles = "") Then
                        vcPerfiles += oUsuario.Perfiles(j).P_inCod.ToString()
                    Else
                        vcPerfiles += "," + oUsuario.Perfiles(j).P_inCod.ToString()
                    End If
                Next
                hdfPerfilesEmpleado.Value = vcPerfiles
                vcGruTipSolCre = ""
                Dim dtTipos As DataTable = (TipoSolicitud.Listar(vcGruTipSolCre)).Tables(0)


                Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo = Nothing
                Try
                    TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(oUsuario.IdCliente)
                    Dim lstTipo As List(Of ENT_MOV_TipoModeloDispositivo) = TipoModeloDispositivo.ListarModeloDispositivo()
                    ddlTipoServicio.Items.Clear()
                    ddlTipoServicio.Items.Add(New ListItem("(TODOS)", -1))
                    For Each oTipo As ENT_MOV_TipoModeloDispositivo In lstTipo
                        ddlTipoServicio.Items.Add(New ListItem(oTipo.Descripcion, oTipo.IdTipoModeloDispositivo))
                    Next
                Catch ex As Exception
                Finally
                    If TipoModeloDispositivo IsNot Nothing Then TipoModeloDispositivo.Dispose()
                End Try

                If dtTipos.Rows.Count > 0 Then
                    ddlTipoSolicitud.Items.Add(New ListItem("--Seleccione--", "-1"))

                    For i As Integer = 0 To dtTipos.Rows.Count - 1
                        'If dtTipos.Rows(i)("inCodTipSol").ToString() <> "31" And dtTipos.Rows(i)("inCodTipSol").ToString() <> "30" Then

                        If hdfJefeArea.Value <> "1" And oUsuario.F_vcCodInt = "" Then 'si no es Responsable de área
                            If dtTipos.Rows(i)("intCategoria").ToString() <> "2" Then 'si la categoria es diferente de General
                                Continue For
                            End If
                        End If

                        If dtTipos.Rows(i)("inCodTipSol").ToString() <> "31" Then
                            ddlTipoSolicitud.Items.Add(New ListItem(dtTipos.Rows(i)("vcNomTipSol").ToString(), dtTipos.Rows(i)("inCodTipSol").ToString))
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'] = [];"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].vcNomTipSol = '" + dtTipos.Rows(i)("vcNomTipSol").ToString() + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].biPersonalizado = '" + dtTipos.Rows(i)("biPersonalizado").ToString() + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].vcTabla = '" + dtTipos.Rows(i)("vcTabla").ToString() + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].vcResponsable = '" + dtTipos.Rows(i)("vcResponsable").ToString().Replace("'", "") + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].biPropie = '" + dtTipos.Rows(i)("biPropie").ToString() + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].biUsuEsp = '" + dtTipos.Rows(i)("biUsuEsp").ToString() + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].biResAre = '" + dtTipos.Rows(i)("biResAre").ToString() + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].inTipoFinanciamiento = '" + dtTipos.Rows(i)("inTipoFinanciamiento").ToString() + "';"
                            script += "arTiposSolicitud['es" + dtTipos.Rows(i)("inCodTipSol").ToString + "'].inTecnicoResponsable = '" + dtTipos.Rows(i)("inTecnicoResponsable").ToString() + "';"
                        End If
                    Next
                Else
                    ddlTipoSolicitud.Items.Add(New ListItem("Sin permisos", "-1"))
                End If

                ''hdfGaleria.Value = "1"
                obtenerRuta()
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Sub

    'LISTAR DATOS
    <WebMethod()>
    Public Shared Function ListarOperadores() As List(Of ENT_GEN_Operador)
        Try
            Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Operador) = Operador.Listar()
            Operador.Dispose()

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPlanesPorOperador(ByVal inCodOpe As Integer, ByVal vcNombre As String, ByVal vcCodEmp As String) As List(Of ENT_MOV_Plan)
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Plan.ListarPlanAutoComplete(inCodOpe, vcNombre, vcCodEmp)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPlanesPorOperadorPorModelo(ByVal inCodOpe As Integer, ByVal inCodMod As Integer) As List(Of ENT_MOV_Plan)
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Return Plan.ListarPorModelo(inCodMod)
            Return Plan.ListarPlanesPorModelo(inCodMod)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetallePlan(ByVal IdPlan As Integer) As ENT_MOV_Plan
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Plan.Mostrar(IdPlan)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetalleSubPlan(ByVal IdSubPlan As Integer) As ENT_MOV_SubPlan
        Dim Plan As BL_MOV_Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Plan.MostrarSubPlan(IdSubPlan)
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
    Public Shared Function ListarEmpleados(ByVal vcNomEmp As String, ByVal inMaxFil As Integer, ByVal inTipLin As Integer) As List(Of String)
        Try
            Dim Empleado As VisualSoft.Suite80.BL.BL_GEN_Empleado = New VisualSoft.Suite80.BL.BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim vcCodInt As String = oUsuario.F_vcCodInt
            'Dim vcCodInt As String = oUsuario.CodIntResp
            Dim dtEmp As DataTable = Empleado.ListarPorNombrePorTipoLineaGruOri(vcNomEmp, inMaxFil, vcCodInt, inTipLin)
            Empleado.Dispose()
            Dim lstEmp As New List(Of String)
            For Each dr As DataRow In dtEmp.Rows
                Dim element As String
                'element = dr("EMPL_P_vcCODEMP").ToString() + "-" + dr("EMPL_vcNOMEMP").ToString() + "-" + dr("EMPL_F_inCODGRUORI").ToString()
                element = dr("EMPL_P_vcCODEMP").ToString() + "|" + dr("EMPL_vcNOMEMP").ToString() + "|" + dr("EMPL_F_inCODGRUORI").ToString()   'ECONDEÑA   20160801
                lstEmp.Add(element)
            Next
            Return lstEmp
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicios(ByVal codEmp As String, ByVal lin As String) As List(Of String)
        Try
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt

            Dim dtServ As DataTable = Solicitud.ListarServicios(codEmp, lin)
            Solicitud.Dispose()

            Dim lstServ As New List(Of String)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            For Each dr As DataRow In dtServ.Rows
                ' If Convert.ToBoolean(dr("btHab")) = True Then 'Agregado Jcamacho 2015/09/24 solo se visualizan los hábiles
                Dim element As String
                element = dr("vcNom").ToString + "-" + dr("btHab").ToString + "-" + dr("GROR_vcNOMGRU").ToString + "-" + dr("COMP_vcNOMCIA").ToString + "-" + dr("inIdSer").ToString + "-" + dr("vcDesc").ToString + "-" + DevuelveNumeroFormateado(dr("dcCost").ToString, strForNum) + "-" + dr("btActiva").ToString
                lstServ.Add(element)
                '  End If
            Next
            Return lstServ
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDispositivos(ByVal vcCodEmp As String) As List(Of List(Of Object))
        'Public Shared Function ListarDispositivos(ByVal vcCodEmp As String) As List(Of ENT_MOV_Dispositivo)
        Dim Dispositivos As BL_MOV_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dispositivos = New BL_MOV_Dispositivo(oUsuario.IdCliente)
            Dim listaDisp As List(Of List(Of Object)) = Dispositivos.MostrarDatosDispostivosXEmpleado(vcCodEmp)
            'cultura
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = DevuelveFormatoNumero(oCultura)

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/ModeloDispositivo/"), "/")

            For Each obj In listaDisp
                Dim rutaImagen As String = String.Empty
                'If Not IsDBNull(obj(0).ModeloDispositivo.Imagen) Then
                If Not IsNothing(obj(0).ModeloDispositivo.Imagen) Then
                    Dim barrImg As Byte() = obj(0).ModeloDispositivo.Imagen
                    Dim archivo As String = obj(0).ModeloDispositivo.P_inCod & ".jpg"
                    Dim rutaLocal As String = ruta + archivo
                    'Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/" + archivo)
                    If Not File.Exists(rutaLocal) Then 'agregado 13/05/2014 wapumayta
                        Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                        fs.Write(barrImg, 0, barrImg.Length)
                        fs.Flush()
                        fs.Close()
                    End If

                    rutaImagen = "../../Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo
                Else
                    rutaImagen = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
                End If
                obj(0).ModeloDispositivo.vcRutArc = rutaImagen
                'formato de numero de costo de reposición
                If oCultura.vcCodCul.ToString() = "es-PE" Then
                    obj(0).costoReposicion = DevuelveNumeroFormateado(obj(0).costoReposicion.ToString, strForNum)
                Else
                    obj(0).costoReposicion = DevuelveNumeroFormateado_MultiPais(obj(0).costoReposicion.ToString, oCultura)
                End If

                obj(0).ModeloDispositivo.vcNom = obj(0).ModeloDispositivo.vcNom.ToString().Replace("&#39", "'")
            Next
            Return listaDisp
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Dispositivos) Then Dispositivos.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTipoSolicitudXGrupoEmpleado(ByVal vcCodEmp As String, ByVal vcTipLin As String) As List(Of ENT_MOV_SolicitudTipo)
        Try
            Dim Solicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_MOV_SolicitudTipo) = Solicitud.ListarTipoSolicitud_X_GrupoEmpl(vcCodEmp, vcTipLin, -1, 1)
            Solicitud.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
    <WebMethod()>
    Public Shared Function ListarTipoSolicitud(ByVal vcTipLin As String) As List(Of ENT_MOV_SolicitudTipo)
        Try
            Dim Solicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_MOV_SolicitudTipo) = Solicitud.ListarTipoSolicitud(vcTipLin, 1, 1)
            Solicitud.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServiciosLinea(ByVal vcNumLin As String, ByVal vcCodEmp As String, ByVal inCodOpe As Integer) As List(Of String)
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim resultado As List(Of String) = New List(Of String)
        Try
            Dim textServicios As String = String.Empty
            Dim lstServicio As New List(Of ENT_GEN_Servicio)
            Dim textPaquetes As String = String.Empty
            Dim ds As DataSet = New DataSet()
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            ds = Solicitud.ListarServiciosLinea_Paquetes(vcNumLin, inCodOpe, vcCodEmp)
            For Each dr As DataRow In ds.Tables(0).Rows
                Dim oServicio As New ENT_GEN_Servicio()
                If dr("P_F_inCodTipSer") <> 0 Then
                    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodTipSer"), -1)
                    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomTipoSer"), "")
                    oServicio.inCodTipDat = 2
                Else
                    oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodSer"), -1)
                    oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomSer"), "")
                    oServicio.inCodTipDat = 1
                End If
                oServicio.dcCan = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCan"), 0)
                oServicio.TipoServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("CodigoTipo"), 0)
                oServicio.TipoServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("NombreTipo"), "")
                lstServicio.Add(oServicio)
            Next
            If ds.Tables(0).Rows.Count > 0 Then
                Dim oSerial As New JavaScriptSerializer
                textServicios = oSerial.Serialize(lstServicio)
            End If

            'textPaquetes = "{"F_inTipSer":16,"inCantidad":60,"vcNomTipoSer":"LLamadas","vcExpEn":"min","dcCosto":14}"
            textPaquetes = "[ "
            For Each dr As DataRow In ds.Tables(1).Rows
                textPaquetes = textPaquetes + "{""F_inTipSer"":" + dr("f_intipser").ToString() + ",""inCantidad"":" + dr("incantidad").ToString() + ",""vcNomTipoSer"":"""
                textPaquetes = textPaquetes + dr("vcnomtiposer").ToString() + """,""vcExpEn"":""" + dr("vcexpen").ToString() + """,""dcCosto"":" + dr("dccosto").ToString() + ","
                textPaquetes = textPaquetes + """vcNomPaqAmp"":""" + dr("vcNomPaqAmp").ToString() + """, ""IdPaqAmp"":" + dr("IdPaqueteAmpliacion").ToString() + ","
                textPaquetes = textPaquetes + """F_inSer"":" + ComprobarIntNULL(dr("F_inSer"), -1).ToString() + "},"
            Next
            textPaquetes = textPaquetes.Substring(0, textPaquetes.Length - 1)
            textPaquetes = textPaquetes + "]"
            resultado.Add(textServicios)
            resultado.Add(textPaquetes)
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Function

    '<WebMethod()>
    'Public Shared Function ListarServiciosActuales(ByVal vcLinea As String) As List(Of Object)
    '    Try
    '        Dim ServicioOperador As BL_MOV_ServicioOperador = BL_MOV_ServicioOperador.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim listO As New List(Of Object)
    '        Dim DataTable As DataTable = ServicioOperador.MostrarServiciosLinea(vcLinea)
    '        For Each dr As DataRow In DataTable.Rows
    '            Dim dict As New Dictionary(Of String, String)
    '            dict.Add("CodServ", dr("inCodServ"))
    '            dict.Add("Act", dr("btActiva"))
    '            listO.Add(dict)
    '        Next
    '        Return listO
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    Private Function obtenerRuta() As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/ModeloDispositivo/"), "/")
        If IsNothing(ruta) Or ruta.Equals(String.Empty) Then
            ruta = Server.MapPath("~/Images/ModeloDispositivo" + CarpetaDominio + "\")
        End If
        Return ruta
    End Function

    <WebMethod()>
    Public Shared Function MostrarServiciosActuales(ByVal vcLin As String) As List(Of ENT_GEN_Servicio)
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oLineaDS As DataSet = Linea.Mostrar(vcLin)
        Linea.Dispose()
        Dim lstServicio As New List(Of ENT_GEN_Servicio)
        For Each dr As DataRow In oLineaDS.Tables(1).Rows
            Dim oServicio As New ENT_GEN_Servicio()
            If Not IsDBNull(dr("P_F_inCodTipSer")) Then
                oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodTipSer"), -1)
                oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomTipoSer"), "")
                oServicio.inCodTipDat = 2
            Else
                oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodSer"), -1)
                oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomSer"), "")
                oServicio.inCodTipDat = 1
            End If
            oServicio.dcCan = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCan"), 0)
            lstServicio.Add(oServicio)
        Next
        'If oLineaDS.Tables(1).Rows.Count > 0 Then
        '    Dim oSerial As New JavaScriptSerializer
        '    hdfServicio.Value = oSerial.Serialize(lstServicio)
        'End If
        Return lstServicio
    End Function

    <WebMethod()>
    Public Shared Function ListarContenidos(ByVal inTipSol As Integer) As List(Of Dictionary(Of String, String))
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "/P_Movil/Administrar/Temporal/Solicitudes/", "/")

        Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "/P_Movil/Administrar/Temporal/Solicitudes/" + CarpetaDominio + "/"

        Dim dict As List(Of Dictionary(Of String, String)) = Solicitud.ListarContenidoTabs(inTipSol, True, vcFilePath)
        Solicitud.Dispose()
        Return dict
    End Function

    <WebMethod()>
    Public Shared Function VerificaLineaEmpleadoCambio(ByVal dcNumLin As String, ByVal vcCodEmp As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As Integer

            'If oUsuario.Empleado.P_vcCod <> "" Then
            '    Resultado = Linea.VerificaLineaEmpleadoCambio(oUsuario.Empleado.P_vcCod, dcNumLin)
            'Else
            Resultado = Linea.VerificaLineaEmpleadoCambio(vcCodEmp, dcNumLin)
            'End If
            Linea.Dispose()
            Return Resultado.ToString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function VerificaLineaEmpleadoReposicion(ByVal dcNumLin As String, ByVal vcCodEmp As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As Integer

            'If oUsuario.Empleado.P_vcCod <> "" Then
            '    Resultado = Linea.VerificaLineaEmpleadoReposicion(oUsuario.Empleado.P_vcCod, dcNumLin)
            'Else
            Resultado = Linea.VerificaLineaEmpleadoReposicion(vcCodEmp, dcNumLin)
            'End If
            Linea.Dispose()
            Return Resultado.ToString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function VerificaLineaEmpleadoNuevo(ByVal vcCodEmp As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As Integer

            'If oUsuario.Empleado.P_vcCod <> "" Then
            '    Resultado = Linea.VerificaLineaEmpleadoNuevo(oUsuario.Empleado.P_vcCod)
            'Else
            Resultado = Linea.VerificaLineaEmpleadoNuevo(vcCodEmp)
            'End If
            Linea.Dispose()

            Return Resultado.ToString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicios_NoUsados(ByVal CodCue As String, ByVal CodLin As String, ByVal CodTipServ As Integer) As List(Of ENT_GEN_Servicio)
        Try
            Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstServ As List(Of ENT_GEN_Servicio) = Servicio.ListarServicio_NoUtilizados_x_Linea(CodCue, CodLin, CodTipServ)
            Servicio.Dispose()
            Return lstServ
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServiciosTipoNoUsados(ByVal CodCue As String, ByVal CodLin As String) As List(Of ENT_GEN_TipoServicio)
        Try
            Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstServTipo As List(Of ENT_GEN_TipoServicio) = Servicio.ListarServicioTipo_NoUtilizados_x_Linea(CodCue, CodLin)
            Servicio.Dispose()
            Return lstServTipo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDatosFinanciamiento(ByVal inCodTipSol As String) As Dictionary(Of String, String)
        Try
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dict As New Dictionary(Of String, String)
            Dim ds As New DataSet
            ds = Solicitud.DatosFinanciamiento(inCodTipSol)
            Solicitud.Dispose()
            For Each dr As DataRow In ds.Tables(0).Rows
                dict.Add("biMontoFijo", dr("biMontoFijo").ToString())
                dict.Add("dcMonto", UtilitarioWeb.DevuelveNumeroFormateado(dr("dcMonto").ToString(), oCultura))
                'dict.Add("dcMonto", dr("dcMonto").ToString())
                dict.Add("inTipoFinanciamiento", dr("inTipoFinanciamiento").ToString())
                dict.Add("PagoContado", dr("PagoContado").ToString())
                dict.Add("Cuotas", dr("Cuotas").ToString())
                dict.Add("MesesCuotas", dr("MesesCuotas").ToString())
                dict.Add("MinimoCuotas", dr("MinimoCuotas").ToString())
                dict.Add("MaximoCuotas", dr("MaximoCuotas").ToString())
                dict.Add("PeriodoGracia", dr("PeriodoGracia").ToString())
                dict.Add("MesesPeriodoGracia", dr("MesesPeriodoGracia").ToString())
                dict.Add("MinimoMesesPeriodoGracia", dr("MinimoMesesPeriodoGracia").ToString())
                dict.Add("MaximoMesesPeriodoGracia", dr("MaximoMesesPeriodoGracia").ToString())
                dict.Add("DescripcionFinanc", dr("Descripcion").ToString())
                dict.Add("DescripcionCortaFinanc", dr("DescripcionCorta").ToString())
            Next

            Return dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function VerficiarLinea_ActAmp(ByVal vcCodEmp As String, ByVal vcNumLin As String, ByVal inTipSol As Integer) As String
        Dim resultado As String = String.Empty
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            resultado = Linea.VerificaLineaSol_Act_Amp(vcCodEmp, vcNumLin, inTipSol)
            Return resultado.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DetalleSolicitud_Equipo(ByVal vcCodEmp As String, ByVal vcCodIMEI As String, ByVal vcTipSol As String) As List(Of ENT_MOV_Solicitud)
        Dim resultado As New List(Of ENT_MOV_Solicitud)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim dt As New DataTable()
            dt = Solicitud.MostrarPorCodEmpNumLin(vcCodEmp, vcCodIMEI, vcTipSol)
            For Each dr As DataRow In dt.Rows
                Dim oSolicitud As New ENT_MOV_Solicitud()
                oSolicitud.P_inCodSol = ComprobarIntNULL(dr("p_incodsol"), 0)
                oSolicitud.Empleado.P_vcCod = ComprobarStringNULL(dr("f_vccodemp"), "")
                oSolicitud.Empleado.vcNom = ComprobarStringNULL(dr("empl_vcnomemp"), "")
                oSolicitud.vcNumLin = ComprobarStringNULL(dr("f_vcnumlin"), "")
                oSolicitud.Estado.P_inCod = If(ComprobarIntNULL(dr("CodEstPro"), 0) = 34, ComprobarIntNULL(dr("CodEstPro"), 0), ComprobarIntNULL(dr("CodEstPro"), 0))
                oSolicitud.Estado.vcNom = If(ComprobarIntNULL(dr("CodEstPro"), 0) = 34, ComprobarStringNULL(dr("NomEstApr"), ""), ComprobarStringNULL(dr("NomEstPro"), ""))
                oSolicitud.dtFecSol = ComprobarDateTimeNULL(dr("dtfecsol"), New Date())
                oSolicitud.vcCodigo = ComprobarStringNULL(dr("vccodigo"), "")
                oSolicitud.inCodModDis = ComprobarIntNULL(dr("F_inCodModDis"), 0)
                oSolicitud.inTipSol = ComprobarIntNULL(dr("intipsol"), 0)
                oSolicitud.TipoSolicitud.vcNomTipSol = ComprobarStringNULL(dr("vcnomtipsol"), "")
                oSolicitud.TipoSolicitud.biPersonalizado = ComprobarBoolNULL(dr("bipersonalizado"), False)
                oSolicitud.DispositivoNuevo.P_vcCodIMEI = ComprobarStringNULL(dr("f_vccodimei"), "")
                resultado.Add(oSolicitud)
            Next
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Function
    'ENVIO DE SOLICITUDES
    <WebMethod()>
    Public Shared Function EnviarSolicitudCambio(ByVal vcNumLin As String, ByVal codIMEI As String, ByVal inCodModDis As String, ByVal vcCodEmp As String, _
                                                 ByVal vcArchAdj As String, ByVal vcDesSol As String, ByVal inEstApr As Integer, ByVal dcMonto As String, _
                                                 ByVal inNumeroCuotas As Integer, ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oLinea As New ENT_MOV_Linea

            Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"
            'oLinea.P_vcNum = vcNumLin
            oLinea.P_vcNum = vcNumLin
            oLinea.Dispositivo.P_vcCodIMEI = codIMEI
            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(inCodModDis)

            'lista de archivos adjuntados
            Dim listaArchivos As New List(Of ENT_MOV_ArchivoAdjunto)
            Dim listatemporal As List(Of String) = vcArchAdj.Split("|").ToList()
            For Each ubic As String In listatemporal
                Dim ubicc As String = "~/P_Movil/Administrar/Temporal/" + CarpetaDominio + "/File" & ubic
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oArchivoAdjunto.F_vcCodSol = resultado
                        oArchivoAdjunto.vcNomAdj = ubic
                        oArchivoAdjunto.binData = BinaryData
                        oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                        listaArchivos.Add(oArchivoAdjunto)
                        fs.Flush()
                        fs.Close()
                    End Using
                    File.Delete(strfn)
                End If
            Next

            resultado = Solicitud.Insertar(oLinea, vcDesSol, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Cambio), oUsuario, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto.ToString())), inEstApr, listaArchivos, inNumeroCuotas, vcMesesCuotas, inMesesPeriodoGracia)

            If resultado <> 0 Then
                'AUDITORIA AGREGAR
                AuditoriaCrear(resultado, oUsuario, vcTabla)
                'SOLICITUD DE LIENA
                'If vcCodPlan <> "" Then
                '    Solicitud.Insertar(vcCodEmp, vcCodPlan, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.Nuevo), inCodModDis)
                'End If
                'Dim Notificacion As BL_MOV_SolicitudNotificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Notificacion.Dispose()

                'Dim m_objCorreo As New CCorreo
                'Dim oEmpleado As New ENT_GEN_Empleado
                'Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'oEmpleado = Empleado.Mostrar(vcCodEmp)
                'Empleado.Dispose()
                '    Return ""
                'Else
                '    Return "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
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
    Public Shared Function EnviarSolicitudCambioMasivo(ByVal codIMEI As String, ByVal inCodModDis As String, ByVal vcCodEmp As String, _
                                                       ByVal inEstApr As Integer) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try


            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"
            Dim vcDesSol As String = "Solicitud de Cambio de Equipo"



            Dim Empleados As String() = vcCodEmp.Split(",")
            Dim IMEIActual As String() = codIMEI.Split(",")
            Dim Modelos As String() = inCodModDis.Split(",")

            Dim EmpleadosNoProcesados As String = ""
            For x As Integer = 0 To Empleados.Length - 1
                Try
                    Dim oLinea As New ENT_MOV_Linea
                    'oLinea.P_vcNum = vcNumLin
                    oLinea.P_vcNum = ""
                    oLinea.Dispositivo.P_vcCodIMEI = IMEIActual(x)
                    oLinea.Empleado.P_vcCod = Empleados(x)
                    oLinea.Dispositivo.ModeloDispositivo.P_inCod = Modelos(x)

                    resultado = Solicitud.Insertar(oLinea, vcDesSol, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Cambio),
                                                   oUsuario, 0, inEstApr, Nothing, 0, "", 0)

                    If resultado <> 0 Then
                        'AUDITORIA AGREGAR
                        AuditoriaCrear(resultado, oUsuario, vcTabla)
                    Else
                        EmpleadosNoProcesados &= Empleados(x) & ","
                    End If

                Catch ex As Exception
                    EmpleadosNoProcesados &= Empleados(x) & ","
                End Try
            Next
            If EmpleadosNoProcesados <> "" Then
                EmpleadosNoProcesados = EmpleadosNoProcesados.Substring(0, EmpleadosNoProcesados.Length - 1)
            End If

            Return EmpleadosNoProcesados

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudNuevo(ByVal vcNumLin As String, ByVal inCodModDis As String, ByVal vcCodEmp As String, ByVal vcArchAdj As String, _
                                                ByVal vcCodPlan As String, ByVal vcDescSol As String, ByVal inEstApr As Integer, ByVal dcMonto As String, _
                                                 ByVal inNumeroCuotas As Integer, ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer) As String
        Try
            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oLinea As New ENT_MOV_Linea
            Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"

            oLinea.P_vcNum = vcNumLin
            oLinea.Plan.P_inCod = 0
            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(inCodModDis)
            If vcCodPlan <> "" Then
                oLinea.Plan.P_inCod = vcCodPlan
            End If

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

            'lista de archivos adjuntados
            Dim listaArchivos As New List(Of ENT_MOV_ArchivoAdjunto)
            Dim listatemporal As List(Of String) = vcArchAdj.Split("|").ToList()
            For Each ubic As String In listatemporal
                Dim ubicc As String = "~/P_Movil/Administrar/Temporal/" + CarpetaDominio + "/File" & ubic
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oArchivoAdjunto.F_vcCodSol = resultado
                        oArchivoAdjunto.vcNomAdj = ubic
                        oArchivoAdjunto.binData = BinaryData
                        oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                        listaArchivos.Add(oArchivoAdjunto)
                        fs.Flush()
                        fs.Close()
                    End Using
                    File.Delete(strfn)
                End If
            Next

            resultado = Solicitud.Insertar(oLinea, vcDescSol, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Nuevo), oUsuario, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)), inEstApr, listaArchivos, inNumeroCuotas, vcMesesCuotas, inMesesPeriodoGracia)
            Solicitud.Dispose()

            If resultado <> 0 Then
                'AUDITORIA AGREGAR
                AuditoriaCrear(resultado, oUsuario, vcTabla)
                'SOLICITUD DE LINEA
                'If vcCodPlan <> "" Then
                '    Solicitud.Insertar(vcCodEmp, vcCodPlan, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.Nuevo), inCodModDis)
                'End If
                'Dim Notificacion As BL_MOV_SolicitudNotificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(1)
                'Notificacion.Dispose()
                'Dim m_objCorreo As New CCorreo
                'Dim oEmpleado As New ENT_GEN_Empleado
                'Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'oEmpleado = Empleado.Mostrar(vcCodEmp)
                'Empleado.Dispose()

                '    Return ""
                'Else
                '    Return "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
            End If
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    <WebMethod()>
    Public Shared Function EnviarSolicitudNuevoMasivo(ByVal vcCodEmp As String, ByVal inCodModDis As String, ByVal vcCodPlan As String,
                                                      ByVal inEstApr As Integer) As String
        Try


            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim Empleados As String() = vcCodEmp.Split(",")
            Dim Modelos As String() = inCodModDis.Split(",")
            Dim Planes As String() = vcCodPlan.Split(",")

            Dim EmpleadosNoProcesados As String = ""
            For x As Integer = 0 To Empleados.Length - 1
                Try
                    Dim oLinea As New ENT_MOV_Linea
                    Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"

                    oLinea.P_vcNum = ""
                    oLinea.Plan.P_inCod = 0
                    oLinea.Empleado.P_vcCod = Empleados(x)
                    oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(Modelos(x))
                    'If vcCodPlan <> "" Then
                    oLinea.Plan.P_inCod = Planes(x)
                    'End If

                    resultado = Solicitud.Insertar(oLinea, "Solicitud Nuevo Equipo", Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Nuevo),
                                                   oUsuario, 0, inEstApr, Nothing, 0, "", 0)

                    If resultado <> 0 Then
                        AuditoriaCrear(resultado, oUsuario, vcTabla)
                    Else
                        EmpleadosNoProcesados &= Empleados(x) & ","
                    End If
                Catch ex As Exception
                    EmpleadosNoProcesados &= Empleados(x) & ","
                End Try
            Next
            If EmpleadosNoProcesados <> "" Then
                EmpleadosNoProcesados = EmpleadosNoProcesados.Substring(0, EmpleadosNoProcesados.Length - 1)
            End If

            Solicitud.Dispose()

            Return EmpleadosNoProcesados

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    <WebMethod()>
    Public Shared Function EnviarSolicitudReposicion(ByVal vcNumLin As String, ByVal codIMEI As String, ByVal inCodModDis As String, ByVal vcCodEmp As String, _
                                                     ByVal vcArchAdj As String, ByVal vcDescSol As String, ByVal inEstApr As Integer, ByVal dcMonto As String, _
                                                 ByVal inNumeroCuotas As Integer, ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oLinea As New ENT_MOV_Linea

            Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"

            oLinea.P_vcNum = vcNumLin
            oLinea.Dispositivo.P_vcCodIMEI = codIMEI
            oLinea.Plan.P_inCod = 0
            oLinea.Empleado.P_vcCod = vcCodEmp
            oLinea.Dispositivo.ModeloDispositivo.P_inCod = Integer.Parse(inCodModDis)

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

            'lista de archivos adjuntados
            Dim listaArchivos As New List(Of ENT_MOV_ArchivoAdjunto)
            Dim listatemporal As List(Of String) = vcArchAdj.Split("|").ToList()
            For Each ubic As String In listatemporal
                Dim ubicc As String = "~/P_Movil/Administrar/Temporal/" + CarpetaDominio + "/File" & ubic
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oArchivoAdjunto.F_vcCodSol = resultado
                        oArchivoAdjunto.vcNomAdj = ubic
                        oArchivoAdjunto.binData = BinaryData
                        oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                        listaArchivos.Add(oArchivoAdjunto)
                        fs.Flush()
                        fs.Close()
                    End Using
                    File.Delete(strfn)
                End If
            Next

            resultado = Solicitud.Insertar(oLinea, vcDescSol, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Reposicion), oUsuario, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto.ToString())), inEstApr, listaArchivos, inNumeroCuotas, vcMesesCuotas, inMesesPeriodoGracia)

            If resultado <> 0 Then
                'AUDITORIA AGREGAR
                AuditoriaCrear(resultado, oUsuario, vcTabla)

                'Dim Notificacion As BL_MOV_SolicitudNotificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(3)
                'Notificacion.Dispose()
                'Dim m_objCorreo As New CCorreo
                'Dim oEmpleado As New ENT_GEN_Empleado
                'Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'oEmpleado = Empleado.Mostrar(vcCodEmp)
                'Empleado.Dispose()


                'fin grabar archivos
                'Else
                '    resultado = "No hay dispositivos disponible para el modelo seleccionado, por favor elija otro modelo"
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
    Public Shared Function EnviarSolicitudReparacion(ByVal vcNumLin As String, ByVal vcCodEmp As String, ByVal codIMEI As String, _
                                                     ByVal vcDesSol As String, ByVal vcArchAdj As String, ByVal inEstApr As Integer, ByVal dcMonto As String, _
                                                    ByVal inNumeroCuotas As Integer, ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim resultado As Integer
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oDispositivo As New ENT_MOV_Dispositivo

            Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"
            oDispositivo.vcNum = vcNumLin
            oDispositivo.F_vcCodEmp = vcCodEmp
            oDispositivo.P_vcCodIMEI = codIMEI

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

            'lista de archivos adjuntados
            Dim listaArchivos As New List(Of ENT_MOV_ArchivoAdjunto)
            Dim listatemporal As List(Of String) = vcArchAdj.Split("|").ToList()
            For Each ubic As String In listatemporal
                Dim ubicc As String = "~/P_Movil/Administrar/Temporal/" + CarpetaDominio + "/File" & ubic
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oArchivoAdjunto.F_vcCodSol = resultado
                        oArchivoAdjunto.vcNomAdj = ubic
                        oArchivoAdjunto.binData = BinaryData
                        oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                        listaArchivos.Add(oArchivoAdjunto)
                        fs.Flush()
                        fs.Close()
                    End Using
                    File.Delete(strfn)
                End If
            Next

            resultado = Solicitud.Insertar(oDispositivo, vcDesSol, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Reparacion), oUsuario, Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto.ToString())), listaArchivos, inEstApr, inNumeroCuotas,
                                           vcMesesCuotas, inMesesPeriodoGracia)

            If resultado <> 0 Then
                'AUDITORIA AGREGAR
                AuditoriaCrear(resultado, oUsuario, vcTabla)

                'Dim Notificacion As BL_MOV_SolicitudNotificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Notificacion.Dispose()
                'Dim m_objCorreo As New CCorreo
                'Dim oEmpleado As New ENT_GEN_Empleado
                'Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'oEmpleado = Empleado.Mostrar(vcCodEmp)
                'Empleado.Dispose()

                ''Grabar archivos adjuntos agregado 05-09-2013
                'If vcArchAdj <> "" Then
                '    Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                '    Dim listatemporal As List(Of String) = vcArchAdj.Split(",").ToList()
                '    For Each ubic As String In listatemporal
                '        Dim ubicc As String = "~/P_Movil/Administrar/Temporal/File" & ubic
                '        Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                '        If File.Exists(strfn) Then
                '            Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                '                Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                '                Dim BinaryData(fs.Length - 1) As Byte
                '                fs.Read(BinaryData, 0, BinaryData.Length)
                '                oArchivoAdjunto.F_vcCodSol = resultado
                '                oArchivoAdjunto.vcNomAdj = ubic
                '                oArchivoAdjunto.binData = BinaryData
                '                oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                '                ArchivoAdjunto.Insertar(oArchivoAdjunto)
                '                fs.Flush()
                '                fs.Close()
                '            End Using
                '            File.Delete(strfn)
                '        End If
                '    Next
                '    ArchivoAdjunto.Dispose()
                'End If
                ''fin grabar archivos
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
    Public Shared Function EnviarSolicitudActivacion(ByVal vcCodEmp As String, ByVal vcNumLin As String, ByVal xmlDetalle As String, ByVal vcArchAdj As String, _
                                                     ByVal vcDescSol As String, ByVal inEstApr As Integer, ByVal dcMonto As String, _
                                                     ByVal inNumeroCuotas As Integer, ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            Dim resultado = 0
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

            'lista de archivos adjuntados
            Dim listaArchivos As New List(Of ENT_MOV_ArchivoAdjunto)
            Dim listatemporal As List(Of String) = vcArchAdj.Split("|").ToList()
            For Each ubic As String In listatemporal
                Dim ubicc As String = "~/P_Movil/Administrar/Temporal/" + CarpetaDominio + "/File" & ubic
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oArchivoAdjunto.F_vcCodSol = resultado
                        oArchivoAdjunto.vcNomAdj = ubic
                        oArchivoAdjunto.binData = BinaryData
                        oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                        listaArchivos.Add(oArchivoAdjunto)
                        fs.Flush()
                        fs.Close()
                    End Using
                    File.Delete(strfn)
                End If
            Next

            resultado = Solicitud.InsertarActivacion(vcCodEmp, vcNumLin, xmlDetalle, oUsuario, vcDescSol, 6, vcMesesCuotas, inEstApr, dcMonto, inNumeroCuotas, inMesesPeriodoGracia, listaArchivos)
            Solicitud.Dispose()


            If resultado <> 0 Then
                'AUDITORIA AGREGAR
                AuditoriaCrear(resultado, oUsuario, vcTabla)
            End If
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudAmpliacion(ByVal vcCodEmp As String, ByVal vcNumLin As String, ByVal vcArchAdj As String, ByVal CodPlan As String, _
                                                     ByVal vcDescSol As String, ByVal inEstApr As Integer, ByVal dcMonto As String, ByVal xmlDetalleAmp As String, _
                                                     ByVal inNumeroCuotas As Integer, ByVal vcMesesCuotas As String, ByVal inMesesPeriodoGracia As Integer) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim resultado = 0
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim oSolicitud As New ENT_MOV_Solicitud()

            Dim vcTabla As String = "MOV_TipoSolicitud_CampoSistema"

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")
            'lista de archivos adjuntados
            Dim listatemporal As List(Of String) = vcArchAdj.Split("|").ToList()
            For Each ubic As String In listatemporal
                Dim ubicc As String = "~/P_Movil/Administrar/Temporal/" + CarpetaDominio + "/File" & ubic
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oArchivoAdjunto.F_vcCodSol = resultado
                        oArchivoAdjunto.vcNomAdj = ubic
                        oArchivoAdjunto.binData = BinaryData
                        oArchivoAdjunto.vcExtAdj = Path.GetExtension(ubicc).Substring(1)
                        oSolicitud.ArchivosAdjuntos.Add(oArchivoAdjunto)
                        fs.Flush()
                        fs.Close()
                    End Using
                    File.Delete(strfn)
                End If
            Next

            oSolicitud.Empleado.P_vcCod = vcCodEmp
            oSolicitud.Plan.P_inCod = If(CodPlan = "", 0, CodPlan)
            oSolicitud.inTipSol = UtilitarioWeb.TipoSolicitud.TipoSolicitud.Ampliacion
            oSolicitud.dcNumLin = vcNumLin
            oSolicitud.vcDesSol = vcDescSol
            oSolicitud.dcMonto = dcMonto
            oSolicitud.Estado.P_inCod = inEstApr
            oSolicitud.inNumeroCuotas = inNumeroCuotas
            oSolicitud.inMesesPeriodoGracia = inMesesPeriodoGracia

            resultado = Solicitud.InsertarAmpliacion(oUsuario, oSolicitud, xmlDetalleAmp, vcMesesCuotas)

            If resultado <> 0 Then
                'AUDITORIA AGREGAR
                AuditoriaCrear(resultado, oUsuario, vcTabla)
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
    Public Shared Function EnviarSolicitudPersonalizada(ByVal vcCodEmp As String, ByVal inTipSol As String, ByVal vcCamPer As String, ByVal vcValPer As String, ByVal vcAuditoria As String, _
                                                        ByVal biFraccionamiento As String, ByVal vcEsMeses As String, ByVal vcMeses As String, ByVal inPerGra As String, ByVal vcTabla As String, _
                                                        ByVal inEst As Integer, ByVal dcMonto As String, ByVal vcAdj As String) As Integer
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim resultado = 0

            If dcMonto = "Aún no definido" Then
                dcMonto = 0
            End If
            vcValPer = vcValPer.Replace("$$$", "'")
            vcAuditoria = vcAuditoria.Replace("$$$", "'")

            Dim lstObj As New List(Of Object)
            If (vcAdj <> "") Then
                vcAdj = vcAdj.Substring(0, vcAdj.Length - 1)
                Dim lstAdjuntos As String() = vcAdj.Split(";")

                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//")

                For i As Integer = 0 To lstAdjuntos.Length - 1
                    Dim row As String() = lstAdjuntos(i).Split(",")

                    If row(1).Trim() <> "" Then 'Hay archivo Adjunto?

                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes/" + CarpetaDominio + "//" + row(1)
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
                Next
            End If

            'Número de Cuotas
            Dim vcMesesCuotas As String = ""
            Dim inNumeroCuotas As Integer = -1
            If vcEsMeses = "1" Then
                Dim lstMeses = vcMeses.Split(",")
                inNumeroCuotas = lstMeses.Length

                vcMesesCuotas += vcMeses.Replace("Dic", "12").Replace("Nov", "11").Replace("Oct", "10").Replace("Set", "9").Replace("Ago", "8").Replace("Jul", "7").Replace("Jun", "6").Replace("May", "5").Replace("Abr", "4").Replace("Mar", "3").Replace("Feb", "2").Replace("Ene", "1") + ","
                vcMesesCuotas = vcMesesCuotas.Substring(0, vcMesesCuotas.Length - 1)
            Else
                inNumeroCuotas = Convert.ToInt32(vcMeses)
            End If

            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            resultado = Solicitud.InsertarPersonalizada(vcCodEmp, Convert.ToInt32(inTipSol), biFraccionamiento, inNumeroCuotas, vcMesesCuotas, Convert.ToInt32(inPerGra), _
                                                        Convert.ToDecimal("0" + DevuelveNumeroSinFormato(dcMonto)), vcCamPer, vcValPer, oUsuario.P_inCod, oUsuario.vcUsu, oUsuario.Mail, oCultura.vcFecCor, _
                                                        oCultura.vcHorCor, vcAuditoria, inEst, lstObj)
            Solicitud.Dispose()

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.Solicitud

            oAuditoria.Tabla = Constantes.TableNames.Solicitud

            Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
            "Envio masivo de solicitud personalizada: " + vcTabla, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & vcTabla)

            ''oAuditoria.Insertar(New String() {resultado})

            ''oAuditoria.Tabla = Constantes.TableNames.SolicitudPersonalizada + vcTabla
            ''oAuditoria.Insertar(New String() {resultado})

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValidarPermisosCreacionCulminada(ByVal IdTipoSolicitud As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim PuedeAprobar As String = "0", PuedeAsignar As String = "0", PuedeCulminar As String = "0"

            'Validar que el usuario puede aprobar y es técnico que puede asignar y culminar el tipo de solicitud
            If EsResponsableAprobacion(IdTipoSolicitud) Then PuedeAprobar = "1"
            If TecnicoPuedeAsignar(IdTipoSolicitud) Then PuedeAsignar = "1"
            If TecnicoPuedeCulminar(IdTipoSolicitud) Then PuedeCulminar = "1"

            Return PuedeAprobar + "," + PuedeAsignar + "," + PuedeCulminar
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarSolicitudPersonalizadaCulminada(ByVal vcCodEmp As String, ByVal inTipSol As String, ByVal vcCamPer As String, ByVal vcValPer As String, ByVal vcAuditoria As String, _
                                                        ByVal biFraccionamiento As String, ByVal vcEsMeses As String, ByVal vcMeses As String, ByVal inPerGra As String, ByVal vcTabla As String, _
                                                        ByVal inEst As Integer, ByVal dcMonto As String, ByVal vcAdj As String, ByVal inTipoProducto As Integer, ByVal inTipoProceso As Integer) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim resultado As Integer = 0, biCreaPDF As Boolean = False, vcCodSol As String = "0", MensjeFacturacion As String = ""

            'Validar que el usuario puede aprobar y es técnico que puede asignar y culminar el tipo de solicitud
            If EsResponsableAprobacion(inTipSol) = False Then
                resultado = "-1"
            ElseIf TecnicoPuedeAsignar(inTipSol) = False Then
                resultado = "-2"
            ElseIf TecnicoPuedeCulminar(inTipSol) = False Then
                resultado = "-3"
            Else
                If dcMonto = "Aún no definido" Then dcMonto = 0
                vcValPer = vcValPer.Replace("$$$", "'")
                vcAuditoria = vcAuditoria.Replace("$$$", "'")

                Dim lstObj As New List(Of Object)
                If (vcAdj <> "") Then
                    vcAdj = vcAdj.Substring(0, vcAdj.Length - 1)
                    Dim lstAdjuntos As String() = vcAdj.Split(";")

                    For i As Integer = 0 To lstAdjuntos.Length - 1
                        Dim row As String() = lstAdjuntos(i).Split(",")

                        If row(1).Trim() <> "" Then 'Hay archivo Adjunto?


                            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/Solicitudes/"), "/")

                            Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//" + CarpetaDominio + "//" + row(1)
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
                    Next
                End If

                'Número de Cuotas
                Dim vcMesesCuotas As String = ""
                Dim inNumeroCuotas As Integer = -1
                If vcEsMeses = "1" Then
                    Dim lstMeses = vcMeses.Split(",")
                    inNumeroCuotas = lstMeses.Length

                    vcMesesCuotas += vcMeses.Replace("Dic", "12").Replace("Nov", "11").Replace("Oct", "10").Replace("Set", "9").Replace("Ago", "8").Replace("Jul", "7").Replace("Jun", "6").Replace("May", "5").Replace("Abr", "4").Replace("Mar", "3").Replace("Feb", "2").Replace("Ene", "1") + ","
                    vcMesesCuotas = vcMesesCuotas.Substring(0, vcMesesCuotas.Length - 1)
                Else
                    inNumeroCuotas = Convert.ToInt32(vcMeses)
                End If

                Dim dcMontoEmp As Decimal = dcMonto
                Dim dcMontoCIA As Decimal = 0

                Dim sqlTrans As SqlTransaction = Nothing

                'CREAR SOLICITUD
                Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
                Dim dsDatosFac = Solicitud.InsertarPersonalizadaCulminada(vcCodEmp, Convert.ToInt32(inTipSol), biFraccionamiento, inNumeroCuotas, vcMesesCuotas, Convert.ToInt32(inPerGra), _
                                                            Convert.ToDecimal("0" + DevuelveNumeroSinFormato(dcMontoEmp)), dcMontoCIA, vcCamPer, vcValPer, oUsuario.P_inCod, oUsuario.vcUsu, _
                                                            oUsuario.Mail, oCultura.vcFecCor, oCultura.vcHorCor, vcAuditoria, inEst, lstObj, sqlTrans)
                resultado = dsDatosFac.Tables(0).Rows(0)("P_inCodSol")

                Dim TipSolFact As Integer = 1
                If (inTipSol = 31) Then TipSolFact = 3
                'FACTURACION
                'Dim dsDatosFac = Solicitud.DatosFacturacionSolicitud(resultado, "")

                Try
                    If (dsDatosFac.Tables(0).Rows.Count > 0 And dcMontoEmp > 0) Then
                        Dim Fac_Solicitud As New BL_MOV_FAC_Solicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oSolicitudFac As New ENT_MOV_FAC_Solicitud
                        Dim dr As DataRow = dsDatosFac.Tables(0).Rows(0)

                        Dim esDevolucion As Integer = 1, biFrac As Boolean = False
                        vcCodSol = dr("vcCodigo").ToString()
                        If (ComprobarBoolNULL(dr("esDevolucion"), False)) Then esDevolucion = -1

                        oSolicitudFac.Usuario = oUsuario.vcNom
                        oSolicitudFac.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                        oSolicitudFac.InTipSol = TipSolFact 'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitud
                        oSolicitudFac.DesSolicitud = dr("vcNomTipSol").ToString() + " (" + dr("vcCodigo").ToString() + ")" 'Descripcion que saldra en el estado de cuenta del usuario
                        oSolicitudFac.IdEmpleado = dr("F_vcCodEmp").ToString()
                        oSolicitudFac.NumCuotas = If(Convert.ToBoolean(dr("PagoContado")), 1, inNumeroCuotas) 'Numero de cuotas que se generara el cobro
                        oSolicitudFac.BiCuotasDefinidas = Convert.ToInt32(dr("biCuotasDefinidas")) 'flag que indica si se va a pagar en cuotas definidas
                        oSolicitudFac.MesesCuotas = dr("MesesCuotasDefinidas") 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                        oSolicitudFac.MontoCuota = Convert.ToDecimal(DevuelveNumeroSinFormato(dcMonto)) * esDevolucion 'monto mensual a cobrar en cada cuota
                        oSolicitudFac.FechaSolicitud = dr("FechaActual").ToString() 'fecha actual
                        oSolicitudFac.biPeriodoGracia = If(Convert.ToBoolean(dr("PeriodoGracia")), 1, 0) 'flag que indica si tiene periodo de gracia
                        oSolicitudFac.MesesPeriodoGracia = Convert.ToInt32(inPerGra) 'los meses de periodo de gracia
                        oSolicitudFac.biInteres = If(Convert.ToBoolean(dr("Interes")), 1, 0) 'flag que indica si hay interes
                        oSolicitudFac.TipoInteres = dr("TipoInteres").ToString()
                        oSolicitudFac.TasaInteres = Convert.ToDecimal(dr("TasaInteres"))
                        oSolicitudFac.biPagoContado = If(Convert.ToBoolean(dr("PagoContado")), 1, 0) 'flag que indica si es pago al contado
                        oSolicitudFac.MesesCuotasDobles = dr("MesesCuotasDobles").ToString() 'meses que se cobra cuotas dobles separados por comas
                        oSolicitudFac.BiCuotasDobles = If(Convert.ToBoolean(dr("CuotasDobles")), 1, 0) 'flag que indica si se hace el cobro en cuotas dobles
                        oSolicitudFac.P_incodsol = resultado
                        oSolicitudFac.biFraccionar = True

                        oSolicitudFac.IdTipoProducto = If(inTipoProducto = 1 Or inTipoProducto = 2, inTipoProducto, Convert.ToInt32(dr("IdTipoProducto").ToString())) '1 = Equipo ,2 = Servicio
                        oSolicitudFac.IdTipoProceso = If(TipSolFact = 3 Or inTipoProceso = 2, 2, 1) '1 = Regular, 2 = No Regular (Cese)
                        oSolicitudFac.IdTipoLinea = Convert.ToInt32(dr("inLineaTipo").ToString()) '1 = Staff, 2 = Familia
                        biFrac = True

                        If resultado > 0 Then
                            MensjeFacturacion = Fac_Solicitud.Insertar_Solicitud(oSolicitudFac, sqlTrans)
                            Fac_Solicitud.Dispose()
                        End If

                        If MensjeFacturacion = "" Then biCreaPDF = True Else resultado = "-4"

                    Else
                        'If resultado <= 0 Then sqlTrans.Rollback()
                    End If

                Catch ex As Exception
                    If sqlTrans IsNot Nothing Then
                        sqlTrans.Rollback()
                        sqlTrans = Nothing
                    End If
                    resultado = 0 '"Error al intentar guardar la solicitud. Comuníquese con su administrador"
                Finally
                    If sqlTrans IsNot Nothing Then
                        If resultado > 0 AndAlso MensjeFacturacion = "" Then
                            sqlTrans.Commit()
                        Else
                            sqlTrans.Rollback()
                            sqlTrans = Nothing
                        End If
                    End If
                End Try
                ''FIN FACTURACIÓN

                If biCreaPDF Then
                    Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Solicitudes//AutorizacionDescuento//"
                    Dim vcAutDesPDF As String = Solicitud.Reporte_AutorizacionDescuento(resultado, vcCodSol, vcRuta, vcCodEmp, oUsuario.P_inCod, oCultura)

                End If

                Solicitud.Dispose()

                If resultado >= 0 Then
                    Dim oAuditoria As New ProcesaAuditoria
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                    oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.Solicitud

                    oAuditoria.Tabla = Constantes.TableNames.Solicitud

                    Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                    "Envio masivo de solicitud personalizada como culminada: " + vcTabla, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & vcTabla)

                    ''oAuditoria.Insertar(New String() {resultado})

                    ''oAuditoria.Tabla = Constantes.TableNames.SolicitudPersonalizada + vcTabla
                    ''oAuditoria.Insertar(New String() {resultado})
                End If

            End If

            Return resultado.ToString() + "," + vcCodSol + "," + MensjeFacturacion

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Private Shared Sub AuditoriaCrear(ByVal codSol As String, ByVal oUsuario As ENT_SEG_Usuario, ByVal vcTabla As String)
        Dim oAuditoria As New ProcesaAuditoria
        oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
        oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
        oAuditoria.NombreUsuario = oUsuario.vcUsu
        oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.Solicitud

        oAuditoria.Tabla = Constantes.TableNames.Solicitud

        Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
        "Nueva solicitud masiva personalizada: " + vcTabla, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & vcTabla)

        ''oAuditoria.Insertar(New String() {codSol})

        ''oAuditoria.Tabla = vcTabla
        ''oAuditoria.Insertar(New String() {codSol})

    End Sub

    <WebMethod()>
    Public Shared Function ListarServiciosCuenta(ByVal vcCodCue As String) As List(Of Object)
        Dim Paquete As BL_MOV_PaqueteAmpliacion = Nothing
        Dim TipoServicio As BL_GEN_TipoServicio = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Paquete = New BL_MOV_PaqueteAmpliacion(oUsuario.IdCliente)
            TipoServicio = New BL_GEN_TipoServicio(oUsuario.IdCliente)
            Dim lstResult As List(Of Object) = New List(Of Object)
            Dim lstServicio As List(Of ENT_GEN_Servicio) = New List(Of ENT_GEN_Servicio)
            Dim dt As New DataTable()
            dt = Paquete.ServiciosCuenta(vcCodCue)
            For Each dr As DataRow In dt.Rows
                Dim oServicio As New ENT_GEN_Servicio
                oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("nCodigo"), -1)
                oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNom"), "Sin Nombre")
                oServicio.TipoServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("nTipSer"), -1)
                oServicio.inCodTipDat = UtilitarioWeb.ComprobarIntNULL(dr("nTipo"), -1)
                lstServicio.Add(oServicio)
            Next

            Dim lstTipoServicio As List(Of ENT_GEN_TipoServicio) = TipoServicio.Listar(-1, "<Seleccionar>")

            lstResult.Add(lstTipoServicio)
            lstResult.Add(lstServicio)

            Return lstResult
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



    <WebMethod()>
    Public Shared Function ObtenerModelosMasivo(ByVal TipoSolicitud As String, ByVal CodEmpleados As String) As List(Of String)
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Dim Resultado As List(Of String) = Solicitud.ObtenerModelosMasivo(TipoSolicitud, CodEmpleados)
            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Function




    <WebMethod()>
    Public Shared Function EnviarSolicitudMasivoPersonalizado(ByVal TipoSolicitud As String, ByVal IdTipoSolicitud As String, ByVal vcCodEmp As String,
                                                              ByVal vcLineas As String, ByVal vcCodPlan As String, ByVal vcCodCuentas As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim resultado = 0
            Dim vcValPer As String = "", vcAuditoria As String = "", vcCamPer As String, vcTabla As String, CodigoEmpleado As String
            Dim Lineas As String() = vcLineas.Split(",")
            Dim Empleados As String() = vcCodEmp.Split(",")
            Dim Cuentas As String() = vcCodCuentas.Split(",")
            Dim Planes As String() = vcCodPlan.Split(",")
            Dim iContador As Integer = -1

            Dim EmpleadosNoProcesados As String = ""


            For Each Linea As String In Lineas
                iContador += 1
                vcValPer = ""
                vcAuditoria = ""
                vcCamPer = ""
                vcTabla = ""
                CodigoEmpleado = Empleados(iContador)
                Select Case TipoSolicitud
                    Case "Baja"
                        vcValPer = "'" & Linea & "'"
                        vcAuditoria = "[Linea]='" & Linea & "'"
                        vcCamPer = "[Linea]"
                        vcTabla = "Baja"
                    Case "Cambio de Cuenta"
                        vcValPer = "'" & Linea & "','" & Cuentas(iContador) & "'"
                        vcAuditoria = "[Linea]='" & Linea & "',[Cuenta]='" & Cuentas(iContador) & "'"
                        vcCamPer = "[Linea],[Cuenta]"
                        vcTabla = "CambioCuenta"

                        If Cuentas(iContador) Is Nothing OrElse Cuentas(iContador).Trim = "" OrElse Cuentas(iContador).Trim = "-1" Then
                            EmpleadosNoProcesados &= CodigoEmpleado & ","
                            Continue For
                        End If

                    Case "Cambio de Plan"
                        vcValPer = "'" & Linea & "','" & Planes(iContador) & "'"
                        vcAuditoria = "[Linea]='" & Linea & "',[Plan]='" & Planes(iContador) & "'"
                        vcCamPer = "[Linea],[Plan]"
                        vcTabla = "CambioPlan"

                        If Planes(iContador) Is Nothing OrElse Planes(iContador).Trim = "" OrElse Planes(iContador).Trim = "-1" Then
                            EmpleadosNoProcesados &= CodigoEmpleado & ","
                            Continue For
                        End If

                End Select
                If vcValPer <> "" Then
                    Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
                    resultado = Solicitud.InsertarPersonalizada(CodigoEmpleado, Convert.ToInt32(IdTipoSolicitud), 0, 0, "", 0, 0, vcCamPer, vcValPer,
                                                                oUsuario.P_inCod, oUsuario.vcUsu, oUsuario.Mail, oCultura.vcFecCor, _
                                                                oCultura.vcHorCor, vcAuditoria, 34, New List(Of Object))
                    Solicitud.Dispose()
                    Dim oAuditoria As New ProcesaAuditoria
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                    oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloSolicitudes.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloSolicitudes.Solicitud
                    oAuditoria.Tabla = Constantes.TableNames.Solicitud
                    oAuditoria.Insertar(New String() {resultado})
                    oAuditoria.Tabla = Constantes.TableNames.SolicitudPersonalizada + vcTabla
                    oAuditoria.Insertar(New String() {resultado})

                End If
            Next

            If EmpleadosNoProcesados <> "" Then
                EmpleadosNoProcesados = EmpleadosNoProcesados.Substring(0, EmpleadosNoProcesados.Length - 1)
            End If

            Return EmpleadosNoProcesados

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try


    End Function


    '<WebMethod()>
    'Public Shared Function EnviarSolicitudPersonalizada(ByVal vcCodEmp As String, ByVal inTipSol As String, ByVal vcCamPer As String, ByVal vcValPer As String, ByVal vcAuditoria As String, _
    '                                                    ByVal biFraccionamiento As String, ByVal vcEsMeses As String, ByVal vcMeses As String, ByVal inPerGra As String, ByVal vcTabla As String, _
    '                                                    ByVal inEst As Integer, ByVal dcMonto As String, ByVal vcAdj As String) As Integer

    'End Function



End Class
