Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Collections.Generic
Imports System.Web.Script.Services
Imports System.IO
Imports UtilitarioWeb
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Data
Imports ClosedXML.Excel

'jbalmaceda 20160706 082700 --> BEGIN
Imports VisualSoft.PCSistelMovil.Campana.BL
Imports VisualSoft.PCSistelMovil.Campana.BE

'<----------------------------- END


Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_Campana
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Contrato As BL_MOV_CAM_Contrato = Nothing
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inCodCam As String = Request.QueryString("Cod")
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    hdfIdCampana.Value = inCodCam
                    hdfIdCliente.Value = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente

                    Contrato = New BL_MOV_CAM_Contrato(oUsuario.IdCliente)
                    Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)

                    bpTecnicoResponsable.NombreEntidad = "Grupo Empleado"
                    bpTecnicoResponsable.vcTab = "M_GRUP_ORIG"
                    bpTecnicoResponsable.TipoOrigen = 0
                    bpTecnicoResponsable.Condicion = "GROR_btEst = 1 And GROR_inTipLIN = 2 AND GROR_P_inCODGRUORI NOT IN(SELECT P_F_inCodGru FROM MOV_PoliticaGrupoChat)"
                    bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos"
                    bpTecnicoResponsable.RutaRaiz = "../../../"
                    bpTecnicoResponsable.Contenedor = "dvContenedorTecRes"

                    Dim ListaContrato As New List(Of MOV_CAM_Contrato)
                    ListaContrato.Add(New MOV_CAM_Contrato() With {.IdContrato = "-1", .Descripcion = "--Seleccione--"})
                    ListaContrato.AddRange(Contrato.ListarContrato())
                    UtilitarioWeb.Dataddl(ddlContrato, ListaContrato, "Descripcion", "IdContrato")

                    If Not IsNothing(inCodCam) Then
                        Dim oCampana As MOV_CAM_Campana = Campana.MostrarCampanaMantenimiento(inCodCam)
                        'General
                        chkEstado.Checked = oCampana.Vigente
                        txtCodigo.Text = oCampana.Codigo
                        'hdfCodContrato.Value = oCampana.IdContrato
                        ddlContrato.SelectedValue = oCampana.IdContrato
                        txtCodigoProveedor.Text = oCampana.CodigoProveedor
                        txtDescripcion.Text = oCampana.Descripcion
                        txtFechaInicio.Text = oCampana.FechaInicioAnsi
                        txtHoraIniFechaInicio.Text = oCampana.HoraInicioAnsi
                        txtFechaFin.Text = oCampana.FechaFinAnsi
                        txtHoraFinFechaFin.Text = oCampana.HoraFinAnsi
                        txtHoraFechaInicioPedido.Text = oCampana.HoraInicioPedidoAnsi
                        txtHoraFechaInicioEntrega.Text = oCampana.HoraInicioEntregaAnsi

                        'Acciones
                        chkNuevoProducto.Checked = oCampana.NuevoProducto
                        chkModificaProducto.Checked = oCampana.ModificaProducto
                        chkBajaProducto.Checked = oCampana.BajaProducto
                        chkChat.Checked = oCampana.ActivarChat
                        chkActivarPublicidad.Checked = oCampana.ActivarPublicidad
                        'Preventa
                        If oCampana.FechaPreventa = "01/01/1900 12:00:00am" Then
                            chkPreventa.Checked = True
                            txtFechaPreventa.Text = oCampana.FechaPreventaAnsi
                        End If

                        chkPreventaNotificacionInicio.Checked = oCampana.PreventaNotificacionInicio
                        chkPreventaNotificacionDiario.Checked = oCampana.PreventaNotificacionDiario
                        chkPreventaNotificacionAntesInicio.Checked = oCampana.PreventaNotificacionAntesInicio
                        chkPreventaVisualizarEquipo.Checked = oCampana.PreventaVisualizarEquipo
                        chkPreventaPreseleccionarEquipo.Checked = oCampana.PreventaPreseleccionarEquipo
                        txtFechaInicioPedido.Text = oCampana.FechaInicioPedidoAnsi
                        txtFechaInicioEntrega.Text = oCampana.FechaInicioEntregaAnsi

                        'Configuración Adicional
                        'chkCancelarPedido.Checked = oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedido
                        'txtCancelarPedidoDiasMax.Text = oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedidoDiasMax
                        'txtCancelarPedidoDiasMaxFin.Text = oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedidoDiasMaxFin
                        'chkModificarPedido.Checked = oCampana.MOV_CAM_CampanaConfiguracion.ModificarPedido
                        'chkReservarProducto.Checked = oCampana.MOV_CAM_CampanaConfiguracion.ReservarProducto
                        'txtReservarProductoDiasMax.Text = oCampana.MOV_CAM_CampanaConfiguracion.ReservarProductoDiasMax
                        'txtReservarProductoDiasMaxFin.Text = oCampana.MOV_CAM_CampanaConfiguracion.ReservarProductoDiasMaxFin
                        'chkGeneraCodigo.Checked = oCampana.MOV_CAM_CampanaConfiguracion.GenerarCodigo
                        'txtFormatoCodigo.Text = oCampana.MOV_CAM_CampanaConfiguracion.FormatoCodigo
                        'chkMigrarContrato.Checked = oCampana.MOV_CAM_CampanaConfiguracion.MigrarContrato
                        'rblstLugarEntrega.SelectedValue = oCampana.MOV_CAM_CampanaConfiguracion.LugarEntrega
                        'txtDiasRecojo.Text = oCampana.MOV_CAM_CampanaConfiguracion.DiasRecojo
                        'txtCantidadPedidosxDia.Text = oCampana.MOV_CAM_CampanaConfiguracion.CantidadPedidosxDia

                        'ESTADO ACTUALIZACION
                        Dim pedidos As Integer = Campana.CantidadPedidosPorCampana(oCampana.IdCampana)
                        Dim today As DateTime = DateTime.Now
                        If today > oCampana.FechaInicio Then
                            If today < oCampana.FechaFin Then
                                If pedidos > 0 Then
                                    'solo actualizacion de flat chat (acciones)
                                    lblMensajeValidacion.Text = "Sólo puede actualizar la habilitación del chat"
                                    hdfTipActualizacion.Value = 2
                                    HabilitarActualizar2()
                                Else
                                    'actualizacion exceptos fecha inicio y fin
                                    hdfTipActualizacion.Value = 1
                                    HabilitarActualizar1()
                                End If
                            End If
                        Else
                            'actualizacoin completa
                            hdfTipActualizacion.Value = 0
                            HabilitarActualizar0()
                        End If

                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If

                        If oCampana.btActivo Then
                            hdfActivo.Value = "1"
                        Else
                            hdfActivo.Value = "0"
                            'Dim oCampanaConf As ENT_MOV_CAM_CampanaConf = Campana.obtenerCampanaActivaConf(oUsuario.IdCliente)
                            'If oCampanaConf IsNot Nothing Then
                            '    hdfIdCamAct.Value = oCampanaConf.IdCampana
                            '    hdfNomCamAct.Value = oCampanaConf.Descripcion
                            'End If
                        End If

                        Dim dtCampActivas As DataTable = Campana.ObtenerCampanasActivas(oUsuario.IdCliente)
                        Dim idsCamAct As List(Of String) = New List(Of String)
                        Dim nomCamAct As List(Of String) = New List(Of String)
                        For Each dr As DataRow In dtCampActivas.Rows
                            idsCamAct.Add(dr("IdCampana").ToString())
                            nomCamAct.Add(dr("NombreCampana").ToString())
                        Next
                        hdfIdCamAct.Value = String.Join("|", idsCamAct)
                        hdfNomCamAct.Value = String.Join("|", nomCamAct)
                    Else
                        If ListaContrato.Count > 1 Then
                            Dim IdOperado As Integer = Contrato.Mostrar(ListaContrato.Item(1).IdContrato).IdOperador
                            Dim oCampana As MOV_CAM_Campana = Campana.MostrarCampanaMantenimiento(Campana.MostrarUltimaCampana(IdOperado))

                            If oCampana.Codigo IsNot Nothing Then
                                chkNuevoProducto.Checked = oCampana.NuevoProducto
                                chkModificaProducto.Checked = oCampana.ModificaProducto
                                chkBajaProducto.Checked = oCampana.BajaProducto
                                chkChat.Checked = oCampana.ActivarChat
                                chkActivarPublicidad.Checked = oCampana.ActivarPublicidad
                                'Preventa
                                chkPreventa.Checked = True
                                chkPreventaNotificacionInicio.Checked = oCampana.PreventaNotificacionInicio
                                chkPreventaNotificacionDiario.Checked = oCampana.PreventaNotificacionDiario
                                chkPreventaNotificacionAntesInicio.Checked = oCampana.PreventaNotificacionAntesInicio
                                chkPreventaVisualizarEquipo.Checked = oCampana.PreventaVisualizarEquipo
                                chkPreventaPreseleccionarEquipo.Checked = oCampana.PreventaPreseleccionarEquipo
                                'Configuración Adicional
                                'chkCancelarPedido.Checked = oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedido
                                'txtCancelarPedidoDiasMax.Text = oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedidoDiasMax
                                'txtCancelarPedidoDiasMaxFin.Text = oCampana.MOV_CAM_CampanaConfiguracion.CancelarPedidoDiasMaxFin
                                'chkModificarPedido.Checked = oCampana.MOV_CAM_CampanaConfiguracion.ModificarPedido
                                'chkReservarProducto.Checked = oCampana.MOV_CAM_CampanaConfiguracion.ReservarProducto
                                'txtReservarProductoDiasMax.Text = oCampana.MOV_CAM_CampanaConfiguracion.ReservarProductoDiasMax
                                'txtReservarProductoDiasMaxFin.Text = oCampana.MOV_CAM_CampanaConfiguracion.ReservarProductoDiasMaxFin
                                'chkGeneraCodigo.Checked = oCampana.MOV_CAM_CampanaConfiguracion.GenerarCodigo
                                'txtFormatoCodigo.Text = oCampana.MOV_CAM_CampanaConfiguracion.FormatoCodigo
                                'chkMigrarContrato.Checked = oCampana.MOV_CAM_CampanaConfiguracion.MigrarContrato
                                'rblstLugarEntrega.SelectedValue = oCampana.MOV_CAM_CampanaConfiguracion.LugarEntrega
                                'txtDiasRecojo.Text = oCampana.MOV_CAM_CampanaConfiguracion.DiasRecojo
                                'txtCantidadPedidosxDia.Text = oCampana.MOV_CAM_CampanaConfiguracion.CantidadPedidosxDia
                            End If


                        End If
                    End If
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Contrato IsNot Nothing Then
                Contrato.Dispose()
            End If
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarNegra(ByVal inPagTam As String, ByVal inPagAct As String, ByVal IdCampana As String) As List(Of MOV_CAM_CampanaCreditoListaNegra)
        Dim CampanaCreditoListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing

        Try
            CampanaCreditoListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return CampanaCreditoListaNegra.ListarPorCampana(IdCampana)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCreditoListaNegra IsNot Nothing Then
                CampanaCreditoListaNegra.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal oCampana As String, ByVal IdCampanaAnterior As Integer) As Integer

        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim Configuracion As BL_CFG_ConfiguracionGeneral = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Configuracion = New BL_CFG_ConfiguracionGeneral(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim resultado As Integer = 0
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCampana As MOV_CAM_Campana = oSerializer.Deserialize(Of MOV_CAM_Campana)(oCampana)

            If v_oCampana.IdCampana <> -1 Then

                Dim _return As Integer = Campana.ActualizarCampana(v_oCampana)


                If v_oCampana.btActivo = True Then
                    Dim vcFechaInicioCampana As String = v_oCampana.FechaInicioAnsi.Substring(6, 2) + "/" + v_oCampana.FechaInicioAnsi.Substring(4, 2) + "/" + v_oCampana.FechaInicioAnsi.Substring(0, 4)
                    Dim vcFechaInicioPedido As String = v_oCampana.FechaInicioPedidoAnsi.Substring(6, 2) + "/" + v_oCampana.FechaInicioPedidoAnsi.Substring(4, 2) + "/" + v_oCampana.FechaInicioPedidoAnsi.Substring(0, 4)
                    Dim vcFechaInicioEntrega As String = v_oCampana.FechaInicioEntregaAnsi.Substring(6, 2) + "/" + v_oCampana.FechaInicioEntregaAnsi.Substring(4, 2) + "/" + v_oCampana.FechaInicioEntregaAnsi.Substring(0, 4)
                    Configuracion.ActualizarFechasCampana(vcFechaInicioCampana, vcFechaInicioPedido, vcFechaInicioEntrega)
                End If

                'jbalmaceda 20160706 111500
                'ActualizarCampanaFinanciamiento()

                Return _return
            Else
                Return Campana.InsertarCampana(v_oCampana, IdCampanaAnterior)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then Campana.Dispose()
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
        End Try
    End Function

    'jbalmaceda 20160706 111500
    'Public Shared Function ActualizarCampanaFinanciamiento() As Integer
    '    Dim i As Integer = 0
    '    Dim oBL As BL_MOV_CAM_CampanaFinanciamiento = Nothing
    '    Dim oBE As ENT_MOV_CAM_CampanaFinanciamiento = Nothing

    '    oBE = New ENT_MOV_CAM_CampanaFinanciamiento
    '    oBE.IdCampana = 2
    '    oBE.IdTipoFinanciamiento = 6
    '    oBE.PeriodoGraciaMax = 0
    '    oBE.CuotasDobles = 0
    '    oBE.CuotaQuincena = 0
    '    oBE.TasaInteres = 0
    '    oBE.EsDefault = True
    '    oBE.Categoria = "E"

    '    oBL = New BL_MOV_CAM_CampanaFinanciamiento(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '    Try
    '        i = oBL.Actualizar_MOV_CAM_u_CampanaFinanciamiento(oBE)
    '        Return i
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function









    <WebMethod()>
    Public Shared Function ActivarDesactivarCampana(ByVal IdCampana As String, ByVal Activo As String) As String
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim Configuracion As BL_CFG_ConfiguracionGeneral = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
            Configuracion = New BL_CFG_ConfiguracionGeneral(oUsuario.IdCliente)

            Dim biActivo As Boolean = False
            If Activo = "1" Then biActivo = True

            Campana.ActivarDesactivarCampana(IdCampana, biActivo)

            'Dim oCampanaConf As ENT_MOV_CAM_CampanaConf = Campana.obtenerCampanaActivaConf(oUsuario.IdCliente)
            'Dim vcFechaInicioCampana As String = oCampanaConf.FechaInicio.ToString("dd/MM/yyyy")
            'Dim vcFechaInicioPedido As String = oCampanaConf.FechaInicioPedido.ToString("dd/MM/yyyy")
            'Dim vcFechaInicioEntrega As String = oCampanaConf.FechaInicioEntrega.ToString("dd/MM/yyyy")
            'Configuracion.ActualizarFechasCampana(vcFechaInicioCampana, vcFechaInicioPedido, vcFechaInicioEntrega)

            Return "1"

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then Campana.Dispose()
            If Configuracion IsNot Nothing Then Configuracion.Dispose()
        End Try
    End Function


    Private Sub HabilitarActualizar0()
        txtCodigo.Enabled = False
    End Sub

    Private Sub HabilitarActualizar1()
        txtCodigo.Enabled = False
        txtFechaFin.Enabled = False
        txtFechaFin.Enabled = False
    End Sub

    Private Sub HabilitarActualizar2()
        txtCodigo.Enabled = False
        ddlContrato.Enabled = False
        txtCodigoProveedor.Enabled = False
        'txtDescripcion.Enabled = False
        txtFechaInicio.Enabled = False
        txtFechaFin.Enabled = False
        'Acciones
        'chkMigrarContrato.Disabled = True
        chkNuevoProducto.Disabled = True
        chkModificaProducto.Disabled = True
        chkBajaProducto.Disabled = True
        chkChat.Disabled = False
        'Preventa
        chkPreventa.Disabled = True
        txtFechaPreventa.Enabled = False
        chkPreventaNotificacionInicio.Disabled = True
        chkPreventaNotificacionDiario.Disabled = True
        chkPreventaNotificacionAntesInicio.Disabled = True
        chkPreventaVisualizarEquipo.Disabled = True
        chkPreventaPreseleccionarEquipo.Disabled = True

        txtFechaInicioPedido.Enabled = False
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarPoliticaSolicitudPorGrupo(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcCam As String,
                                                           ByVal vcValBus As String) As JQGridJsonResponse
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = Politica.Listar_PoliticaGrupo_Campana(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcCam, vcValBus)

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function QuitarGrupo(ByVal inCodGru As String) As String
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oGrupo As New ENT_GEN_Grupo

            oGrupo.P_inCod = inCodGru

            Politica.QuitarGrupoCampana(oGrupo)
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GuardarGrupo(ByVal P_inCodGru As String) As String
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oGrupo As New ENT_GEN_Grupo
            oGrupo.P_inCod = P_inCodGru
            Politica.GuardarPoliticaGrupoCampana(oGrupo)

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Politica IsNot Nothing Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarCampanasAnteriores() As List(Of MOV_CAM_Campana)
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim lstCampanas As List(Of MOV_CAM_Campana) = New List(Of MOV_CAM_Campana)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
            lstCampanas = Campana.Listar(0)
            Return lstCampanas
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Campana) Then Campana.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCampanaResumen(ByVal prIdCampana As Integer) As String
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim ds As DataSet
        Try
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/") + "/P_Movil/Administrar/Temporal/", "/")

            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
            ds = Campana.ObtenerCampanaResumen(prIdCampana)

            Dim attachment As String = "Resumen.xlsx"
            Dim ruta As String = HttpContext.Current.Server.MapPath("~/") + "P_Movil/Administrar/Temporal" + CarpetaDominio + "/" + attachment
            Dim rutaExportar As String = "P_Movil/Administrar/Temporal" + CarpetaDominio + "/" + attachment

            'Dim ruta As String = HttpContext.Current.Server.MapPath("~/") + "/P_Movil/Administrar/Temporal/" + attachment
            'Dim rutaExportar As String = "P_Movil/Administrar/Temporal/" + attachment
            'Dim workbook As New XLWorkbook()
            Using workbook As New XLWorkbook()

                For index = 0 To ds.Tables.Count - 1
                    'Dim worksheet As IXLWorksheet = workbook.Worksheets.Add(index.ToString())
                    Using worksheet As IXLWorksheet = workbook.Worksheets.Add(index.ToString())
                        For i = 0 To ds.Tables(index).Columns.Count - 1
                            worksheet.Cell(1, i + 1).Value = ds.Tables(index).Columns(i).ColumnName
                            For k = 0 To ds.Tables(index).Rows.Count - 1
                                worksheet.Cell(k + 2, i + 1).Value = ds.Tables(index).Rows(k)(i).ToString()
                                If ds.Tables(index).Columns(i).ColumnName = "Cod. Empleado" Then
                                    worksheet.Cell(k + 2, i + 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                                End If
                            Next
                            worksheet.Column(i + 1).AdjustToContents()
                        Next
                        worksheet.Range(1, 1, 1, ds.Tables(index).Columns.Count).Style.Font.SetBold().Fill.SetBackgroundColor(XLColor.FromArgb(102, 204, 255)).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    End Using
                Next

                If File.Exists(ruta) Then
                    File.Delete(ruta)
                End If

                workbook.SaveAs(ruta)
            End Using

            Return rutaExportar
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Campana) Then Campana.Dispose()
        End Try
    End Function

    Private Function ExportarDatos(ByVal ds As DataSet, ByVal nombreArchivo As String) As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/") + "/P_Movil/Administrar/Temporal/", "/")

        Dim attachment As String = nombreArchivo + ".xlsx"
        Dim ruta As String = HttpContext.Current.Server.MapPath("~/") + "P_Movil/Administrar/Temporal" + CarpetaDominio + "/" + attachment
        Dim rutaExportar As String = "P_Movil/Administrar/Temporal" + CarpetaDominio + "/" + attachment

        'Dim ruta As String = HttpContext.Current.Server.MapPath("~/") + "/P_Movil/Administrar/Temporal/" + attachment
        'Dim rutaExportar As String = "P_Movil/Administrar/Temporal/" + attachment
        'Dim workbook As New XLWorkbook()
        Using workbook As New XLWorkbook()

            For index = 0 To ds.Tables.Count
                'Dim worksheet As IXLWorksheet = workbook.Worksheets.Add(index.ToString())
                Using worksheet As IXLWorksheet = workbook.Worksheets.Add(index.ToString())
                    For i = 0 To ds.Tables(index).Columns.Count
                        worksheet.Cell(1, i + 1).Value = ds.Tables(index).Columns(i).ColumnName
                        For k = 0 To ds.Tables(index).Rows.Count
                            worksheet.Cell(k + 2, i + 1).Value = ds.Tables(index).Rows(k)(i).ToString()
                        Next
                        worksheet.Column(i + 1).AdjustToContents()
                    Next
                    worksheet.Range(1, 1, 1, ds.Tables(index).Columns.Count).Style.Font.SetBold().Fill.SetBackgroundColor(XLColor.FromArgb(102, 204, 255)).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                End Using
            Next

            If File.Exists(ruta) Then
                File.Delete(ruta)
            End If

            workbook.SaveAs(ruta)
        End Using

        Return rutaExportar

    End Function
End Class
