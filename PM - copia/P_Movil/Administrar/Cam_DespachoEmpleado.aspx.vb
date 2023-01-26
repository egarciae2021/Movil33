Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.Data
Imports UtilitarioWeb
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.Procesos
Imports VisualSoft.Common.Logging
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Cam_DespachoEmpleado
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        'Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            If Not IsPostBack Then

                hdfTituloValeResguardo.Value = "" & ConfigurationManager.AppSettings("TituloValeResguardo")

                'Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)

                UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)


                Dim lstTipo As List(Of ENT_MOV_LineaTipo) = LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>")
                UtilitarioWeb.Dataddl(ddlLineaTipo, lstTipo, "vcDescripcion", "P_inCod")

                'Tipo de Linea - wapumayta - 02-11-2015
                Dim General = New General()
                hdfTipoLineaPerfil.Value = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                If hdfCodLinTip_X_User.Value <> 0 Then
                    ddlLineaTipo.Enabled = False
                End If
                hdfIdOficinaTemp.Value = "0"

                'UtilitarioWeb.Dataddl(ddlCampana, Campana.Listar(-1, ""), "Descripcion", "IdCampana")
                If Request.QueryString("vcTab") = "O" Then
                    If lstTipo.Count > 2 Then
                        ddlLineaTipo.Items.Remove(ddlLineaTipo.Items.FindByValue("1"))
                    End If
                    dvOficina.Visible = True
                    dvUsuario.Visible = False
                    chkListoDespacho.Checked = True
                    chkYaDespacho.Checked = False
                    chkNoFechaDespacho.Checked = True
                    chkNoEnviadoOperador.Checked = True
                    chkBajaRenovacionSinEquipo.Checked = False

                    bpOficina.NombreEntidad = "Oficina"
                    bpOficina.vcTab = "GEN_EMP_Oficina"
                    bpOficina.TipoOrigen = 0
                    'bpOficina.Condicion = "" '"P_inCod in (Select F_inUsu From seg_perfilusuario Where F_inPer = 42)"
                    bpOficina.FuncionPersonalizada = "fnMostrarOficina"
                    bpOficina.RutaRaiz = "../../"
                    bpOficina.Contenedor = "dvOficinaBusqueda"
                    bpOficina.Condicion = "GEN_EMP_Oficina.Vigente = 1"
                    bpOficina.Codigo = "Codigo"
                    bpOficina.Descripcion = "Descripcion"
                    bpOficina.VariableCondicionJQ = "CondicionJQueryOfi"
                    bpOficina.MuestraMensajeNoDatos = False
                    bpOficina.TipoLinea = hdfCodLinTip_X_User.Value
                Else
                    dvOficina.Visible = False
                    dvUsuario.Visible = True
                    chkListoDespacho.Checked = True
                    chkYaDespacho.Checked = False
                    chkNoFechaDespacho.Checked = False
                    chkNoEnviadoOperador.Checked = False
                    chkBajaRenovacionSinEquipo.Checked = False

                    hdfempleadoAtencion.Value = Request.QueryString("empleado")
                    hdftipoAtencion.Value = Request.QueryString("tipo")
                    hdfidAtencion.Value = Request.QueryString("idAtencion")
                    hdfidCampana.Value = Request.QueryString("idCampana")
                    If hdfidCampana.Value = "0" Then
                        Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
                        Dim oCampana As MOV_CAM_Campana = Campana.obtenerCampanaActiva(oUsuario.IdCliente)
                        If oCampana IsNot Nothing Then hdfidCampana.Value = oCampana.IdCampana
                    End If

                    If hdfempleadoAtencion.Value <> "" Then
                        ddlLineaTipo.Enabled = False
                        ddlTipoSolicitudFamilia.Enabled = False
                        lblEmpleado.Text = Empleado.Mostrar(hdfempleadoAtencion.Value).vcNom
                    End If

                    bpEmpleado.NombreEntidad = "Empleado"
                    bpEmpleado.vcTab = "M_EMPL"
                    bpEmpleado.TipoOrigen = 0
                    bpEmpleado.FuncionPersonalizada = "fnMostrarEmpleado"
                    bpEmpleado.RutaRaiz = "../../"
                    bpEmpleado.Contenedor = "dvEmpleadoBusqueda"
                    'bpEmpleado.Condicion = "EMPL_btEST = 1"
                    bpEmpleado.Condicion = "EMPL_CodInt2 like |" + oUsuario.F_vcCodInt + "%|"
                    bpEmpleado.Codigo = "EMPL_P_vcCODEMP"
                    bpEmpleado.VariableCondicionJQ = "CondicionJQueryEmp"
                    bpEmpleado.MuestraMensajeNoDatos = False
                    bpOficina.TipoLinea = hdfCodLinTip_X_User.Value

                End If
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
            If Campana IsNot Nothing Then Campana.Dispose()
            If Operador IsNot Nothing Then Operador.Dispose()
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function TraerModeloGrilla(ByVal IdEmpleado As String, ByVal IdOficina As String, ByVal IdOperador As Integer, _
                                             ByVal IdCampana As String, ByVal IdTipoLinea As Integer) As List(Of Object) 'Dictionary(Of String, Object)
        Try
            'Pedido = New BL_MOV_CAM_CampanaPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If IdCampana Is Nothing OrElse IdCampana = "null" OrElse IdCampana = "" Then
                IdCampana = "-1"
            End If


            'Dim EquiposDespacho As New DataTable
            Dim oColModelPedido As New List(Of Object)
            'Dim dict As New Dictionary(Of String, Object)
            'Dim lstCampo As New List(Of ENT_ENT_Campo)

            If String.IsNullOrEmpty(IdOficina) Then
                IdOficina = -1
                HttpContext.Current.Session("IdEmpleadoCDE") = IdEmpleado
            Else
                HttpContext.Current.Session("IdOficinaCDE") = IdOficina
            End If

            'HttpContext.Current.Session("IdEmpleadoCDE") = IdEmpleado
            'HttpContext.Current.Session("IdOficinaCDE") = IdOficina
            HttpContext.Current.Session("IdOperadorCDE") = IdOperador
            HttpContext.Current.Session("IdTipoLineaCDE") = IdTipoLinea
            HttpContext.Current.Session("IdCampanaCDE") = IdCampana

            If IdTipoLinea = 1 Or (IdTipoLinea = 2 And IdCampana = "-1") Then 'Solo solicitudes
                Dim OpcionesEdicionCantidad(3) As String

                'EquiposDespacho = Solicitud.ListarPorDespacho(IdEmpleado, Convert.ToInt32(IdOficina), IdOperador, IdTipoLinea, ListoDespacho, YaDespacho)

                oColModelPedido.Add(JQGrid.Columna("IdSolicitud", "IdSolicitud", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("TienePDFAutDes", "TienePDFAutDes", True, True, 60, False, False, ""))
                'oColModelPedido.Add(JQGrid.Columna("CodigoAutDes", "Autorización Descuento", False, True, 70, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
                OpcionesEdicionCantidad(0) = "21" 'size
                OpcionesEdicionCantidad(1) = "18" 'maxlength
                OpcionesEdicionCantidad(2) = "txtAutDes" 'class
                oColModelPedido.Add(JQGrid.Columna("vcCodAutDes", "Autorización Descuento", False, True, 125, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
                oColModelPedido.Add(JQGrid.Columna("vcAutDesPDF", "Autorización PDF", True, False, 5, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("CodigoSolicitud", "Código Solicitud", False, True, 110, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdOficina", "IdOficina", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Oficina", "Oficina", False, True, 200, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Registro", "Registro", False, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Empleado", "Empleado", False, True, 250, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Linea", "Linea", False, True, 75, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IMEI", "IMEI", False, True, 100, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdModeloDispositivo", "IdModeloDispositivo", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("ModeloDispositivo", "Modelo Dispositivo", False, True, 200, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("FechaSolicitud", "Fecha Solicitud", False, True, 120, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("TipoSolicitud", "Tipo Solicitud", False, True, 90, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Despachado", "Despachado", False, True, 70, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("FechaDespacho", "Fecha Despacho", False, True, 130, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("EstadoDipAsig", "EstadoDipAsig", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("DiasRecojo", "DiasRecojo", True, True, 60, False, False, ""))

            ElseIf IdTipoLinea = 2 And IdCampana <> -1 Then ' Solicitudes y Campañas
                'EquiposDespacho = Pedido.ListarDetallePorEmpleadoOficinaPorCampana(IdEmpleado, Convert.ToInt32(IdOficina), IdCampana, ListoDespacho, YaDespacho, _
                '                                                                   NoFechaDespacho, NoEnviadoOperador, BajaRenovacionSinEquipo)
                Dim OpcionesEdicionCantidad(3) As String
                Dim OpcionesEdicionCantidad2(3) As String
                oColModelPedido.Add(JQGrid.Columna("IdDetallePedido", "IdDetallePedido", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdPedido", "IdPedido", True, True, 60, False, False, ""))

                If IdEmpleado = "" Then
                    oColModelPedido.Add(JQGrid.Columna("IdOficina", "IdOficina", True, True, 60, False, False, ""))
                    oColModelPedido.Add(JQGrid.Columna("Oficina", "Oficina", False, True, 200, False, False, ""))
                    oColModelPedido.Add(JQGrid.Columna("IdEmpleado", "Registro", False, True, 60, False, False, ""))
                    oColModelPedido.Add(JQGrid.Columna("Colaborador", "Colaborador", False, True, 200, False, False, ""))
                Else
                    oColModelPedido.Add(JQGrid.Columna("IdOficina", "IdOficina", True, True, 60, False, False, ""))
                    oColModelPedido.Add(JQGrid.Columna("Oficina", "Oficina", True, True, 200, False, False, ""))
                    oColModelPedido.Add(JQGrid.Columna("IdEmpleado", "Registro", True, True, 60, False, False, ""))
                    oColModelPedido.Add(JQGrid.Columna("Colaborador", "Colaborador", True, True, 200, False, False, ""))
                End If

                oColModelPedido.Add(JQGrid.Columna("CodigoPedido", "Código Pedido", False, True, 100, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("NumeroPedido", "Número Pedido", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("NumeroItem", "Item", True, True, 40, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("MontoTotalNoServicios", "MontoTotalNoServicios", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("MontoTotalServicios", "MontoTotalServicios", True, True, 60, False, False, ""))

                'Linea
                oColModelPedido.Add(JQGrid.Columna("IdTipoProducto1", "IdTipoProducto1", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("TipoProducto1", "TipoProducto1", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdProducto1", "IdProducto1", True, True, 60, False, False, ""))
                OpcionesEdicionCantidad(0) = "10" 'size
                OpcionesEdicionCantidad(1) = "10" 'maxlength
                OpcionesEdicionCantidad(2) = "txtLinea" 'class
                oColModelPedido.Add(JQGrid.Columna("Linea", "Línea", False, True, 70, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
                OpcionesEdicionCantidad2(0) = "10" 'size
                OpcionesEdicionCantidad2(1) = "11" 'maxlength
                OpcionesEdicionCantidad2(2) = "txtRPM" 'class
                oColModelPedido.Add(JQGrid.Columna("RPM", "RPM", False, True, 70, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad2))
                oColModelPedido.Add(JQGrid.Columna("Monto1", "Monto1", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Cantidad1", "Cantidad1", True, True, 60, False, False, ""))

                'Equipo
                oColModelPedido.Add(JQGrid.Columna("IdTipoProducto2", "IdTipoProducto2", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("TipoProducto2", "TipoProducto2", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdProducto2", "IdProducto2", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Producto2", "Equipo", False, True, 120, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Monto2", "Monto2", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Cantidad2", "Cantidad2", True, True, 60, False, False, ""))
                OpcionesEdicionCantidad(0) = "20" 'size
                OpcionesEdicionCantidad(1) = "20" 'maxlength
                OpcionesEdicionCantidad(2) = "txtIMEI" 'class
                oColModelPedido.Add(JQGrid.Columna("IMEI", "IMEI", False, True, 120, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))

                'serie
                Dim OpcionesEdicionSerie(3) As String
                OpcionesEdicionSerie(0) = "25" 'size
                OpcionesEdicionSerie(1) = "50" 'maxlength
                OpcionesEdicionSerie(2) = "txtSerie" 'class
                oColModelPedido.Add(JQGrid.Columna("Serie", "Serie", False, False, 150, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionSerie))

                ''estado final (solo para empleados cesados)
                'Dim OpcionesEdicionEstadoFinal(3) As String
                'OpcionesEdicionEstadoFinal(0) = "25"
                'OpcionesEdicionEstadoFinal(2) = ""
                'oColModelPedido.Add(JQGrid.Columna("EstadoFinal", "Estado Final", False, False, 70, True, False, "", "select", {value: "",size:"20"}))

                'Plan
                oColModelPedido.Add(JQGrid.Columna("IdTipoProducto3", "IdTipoProducto3", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("TipoProducto3", "TipoProducto3", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdProducto3", "IdProducto3", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Producto3", "Plan", False, True, 120, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Monto3", "Monto3", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Cantidad3", "Cantidad3", True, True, 60, False, False, ""))


                'If EquiposDespacho.Rows.Count > 0 Then
                '    For i As Integer = 1 To (EquiposDespacho.Columns.Count - 20) / 6
                '        Dim anchoproducto As Integer = 120

                '        If EquiposDespacho(0)("IdTipoProducto" & i.ToString()) = "6" Then 'tipo de producto linea
                '            anchoproducto = 70
                '        ElseIf EquiposDespacho(0)("IdTipoProducto" & i.ToString()) = "1" Then 'tipo de producto modelo de dispositivo
                '            anchoproducto = 170
                '        End If

                '        oColModelPedido.Add(JQGrid.Columna("IdTipoProducto" & i.ToString(), "IdTipoProducto", True, True, 60, False, False, ""))
                '        oColModelPedido.Add(JQGrid.Columna("TipoProducto" & i.ToString(), "Tipo Producto", True, True, 60, False, False, ""))
                '        oColModelPedido.Add(JQGrid.Columna("IdProducto" & i.ToString(), "IdProducto", True, True, 60, False, False, ""))

                '        If EquiposDespacho(0)("IdTipoProducto" & i.ToString()) = "6" Then 'tipo de producto linea
                '            OpcionesEdicionCantidad(0) = "10" 'size
                '            OpcionesEdicionCantidad(1) = "20" 'maxlength
                '            OpcionesEdicionCantidad(2) = "txtLinea" 'class
                '            oColModelPedido.Add(JQGrid.Columna("Producto" & i.ToString(), IIf(IsDBNull(EquiposDespacho(0)("TipoProducto" & i.ToString())), "", EquiposDespacho(0)("TipoProducto" & i.ToString())), False, True, _
                '                                               anchoproducto, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
                '            OpcionesEdicionCantidad2(0) = "10" 'size
                '            OpcionesEdicionCantidad2(1) = "20" 'maxlength
                '            OpcionesEdicionCantidad2(2) = "txtRPM" 'class
                '            oColModelPedido.Add(JQGrid.Columna("RPM", "RPM", False, True, anchoproducto, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad2))
                '        Else
                '            oColModelPedido.Add(JQGrid.Columna("Producto" & i.ToString(), IIf(IsDBNull(EquiposDespacho(0)("TipoProducto" & i.ToString())), "", EquiposDespacho(0)("TipoProducto" & i.ToString())), False, True, _
                '                                               anchoproducto, False, False, ""))
                '        End If

                '        oColModelPedido.Add(JQGrid.Columna("Monto" & i.ToString(), "Monto", True, True, 60, False, False, ""))
                '        oColModelPedido.Add(JQGrid.Columna("Cantidad" & i.ToString(), "Cantidad", True, True, 60, False, False, ""))

                '        If EquiposDespacho(0)("IdTipoProducto" & i.ToString()) = "1" Then 'tipo de producto linea
                '            OpcionesEdicionCantidad(0) = "20" 'size
                '            OpcionesEdicionCantidad(1) = "50" 'maxlength
                '            OpcionesEdicionCantidad(2) = "txtIMEI" 'class
                '            oColModelPedido.Add(JQGrid.Columna("IMEI", "IMEI", False, True, 120, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
                '        End If
                '    Next
                'End If
                oColModelPedido.Add(JQGrid.Columna("MesesContrato", "Meses Contrato", False, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Situacion", "Situación", False, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdEstado", "IdEstado", True, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("Estado", "Estado", False, True, 60, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("EnviadoOperador", "Enviado Operador", False, True, 70, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("FechaPedido", "Fecha Pedido", False, True, 70, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("FechaRecojo", "Fecha Recojo", False, True, 70, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("FechaDespacho", "Fecha Despacho", False, True, 70, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("DiasRecojo", "DiasRecojo", True, True, 130, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("IdCorte", "IdCorte", True, True, 130, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("NumeroCorte", "Corte", False, True, 70, False, False, ""))
                oColModelPedido.Add(JQGrid.Columna("NroCuenta", "Cuenta", True, False, 70, False, False, ""))

            End If

            'dict.Add("lstPedidos", EquiposDespacho)
            'HttpContext.Current.Session("EquiposDespacho_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()) = EquiposDespacho
            'HttpContext.Current.Session("Campos_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()) = lstCampo

            'dict.Add("oColModelPedido", oColModelPedido)
            'Return dict
            Return oColModelPedido
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If Pedido IsNot Nothing Then
            '    Pedido.Dispose()
            'End If
            'If Solicitud IsNot Nothing Then
            '    Solicitud.Dispose()
            'End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function TraerModeloGrillaImportacion(ByVal IdOficinaTemp As String) As List(Of Object) 'Dictionary(Of String, Object)
        Try
            Dim oColModelPedido As New List(Of Object)

            Dim OpcionesEdicionCantidad(3) As String
            Dim OpcionesEdicionCantidad2(3) As String

            oColModelPedido.Add(JQGrid.Columna("IdOficinaDetalleTemp", "IdOficinaDetalleTemp", True, True, 60, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("IdDetallePedido", "IdDetallePedido", True, True, 60, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("CodigoPedido", "Pedido", False, True, 80, False, False, ""))

            oColModelPedido.Add(JQGrid.Columna("IdEmpleado", "Registro", False, True, 60, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("vcEmpleado", "Empleado", False, True, 250, False, False, ""))

            OpcionesEdicionCantidad(0) = "10" 'size
            OpcionesEdicionCantidad(1) = "10" 'maxlength
            OpcionesEdicionCantidad(2) = "txtLinea" 'class
            oColModelPedido.Add(JQGrid.Columna("Linea", "Línea", False, True, 70, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
            OpcionesEdicionCantidad2(0) = "10" 'size
            OpcionesEdicionCantidad2(1) = "11" 'maxlength
            OpcionesEdicionCantidad2(2) = "txtRPM" 'class
            oColModelPedido.Add(JQGrid.Columna("RPM", "RPM", False, True, 70, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad2))
            oColModelPedido.Add(JQGrid.Columna("ModeloDispositivo", "Equipo", False, True, 120, False, False, ""))
            OpcionesEdicionCantidad(0) = "20" 'size
            OpcionesEdicionCantidad(1) = "20" 'maxlength
            OpcionesEdicionCantidad(2) = "txtIMEI" 'class
            oColModelPedido.Add(JQGrid.Columna("IMEI", "IMEI", False, True, 120, True, False, "", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))

            oColModelPedido.Add(JQGrid.Columna("Plan", "Plan", False, True, 120, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("Observacion", "Observación", False, True, 120, False, False, ""))

            oColModelPedido.Add(JQGrid.Columna("MesesContrato", "Meses De Contrato", False, True, 70, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("Situacion", "Situacion", False, True, 80, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("Estado", "Estado", False, True, 90, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("EnviadoOperador", "Enviado Operador", False, True, 70, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("FechaPedido", "FechaPedido", False, True, 100, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("FechaRecojo", "FechaRecojo", False, True, 100, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("FechaDespacho", "FechaDespacho", False, True, 100, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("NumeroCorte", "Corte", False, True, 60, False, False, ""))
            oColModelPedido.Add(JQGrid.Columna("Procesado", "Procesado", False, True, 70, False, False, ""))

            Return oColModelPedido

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            'Finally
            'If Pedido IsNot Nothing Then
            '    Pedido.Dispose()
            'End If
            'If Solicitud IsNot Nothing Then
            '    Solicitud.Dispose()
            'End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarGrilla(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal ListoDespacho As Boolean, ByVal YaDespacho As Boolean,
                                        ByVal NoFechaDespacho As Boolean, ByVal NoEnviadoOperador As Boolean, ByVal BajaRenovacionSinEquipo As Boolean,
                                        ByVal EsEmpleado As Boolean) As Dictionary(Of String, Object)
        Dim Pedido As BL_MOV_CAM_CampanaPedido = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Pedido = New BL_MOV_CAM_CampanaPedido(oUsuario.IdCliente)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)

            HttpContext.Current.Session("IdOficinaTemp_" & oUsuario.P_inCod) = Nothing

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dict As New Dictionary(Of String, Object)
            Dim oCampanaCorte As New MOV_CAM_CampanaCorte()
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor
            Dim strForHor = oCultura.vcHorCor
            Dim Numeros As New List(Of Integer)
            Dim Fechas As New List(Of Integer)
            Dim i As Integer = 0
            Dim inTotReg As Integer = 0
            Dim EquiposDespacho As New DataSet
            Dim IdEmpleado As String
            Dim IdOficina As Integer
            If EsEmpleado Then 'empleado
                IdEmpleado = CType(HttpContext.Current.Session("IdEmpleadoCDE"), String)
                IdOficina = -1
            Else
                IdEmpleado = ""
                IdOficina = CType(HttpContext.Current.Session("IdOficinaCDE"), Integer)
            End If
            Dim IdOperador As Integer = CType(HttpContext.Current.Session("IdOperadorCDE"), Integer)
            Dim IdTipoLinea As Integer = CType(HttpContext.Current.Session("IdTipoLineaCDE"), Integer)
            Dim IdCampana As Integer = CType(HttpContext.Current.Session("IdCampanaCDE"), Integer)

            HttpContext.Current.Session("ListoDespachoCDE") = ListoDespacho
            HttpContext.Current.Session("YaDespachoCDE") = YaDespacho
            HttpContext.Current.Session("NoFechaDespachoCDE") = NoFechaDespacho
            HttpContext.Current.Session("NoEnviadoOperadorCDE") = NoEnviadoOperador
            HttpContext.Current.Session("BajaRenovacionSinEquipoCDE") = BajaRenovacionSinEquipo

            If IdTipoLinea = 1 Or (IdTipoLinea = 2 And IdCampana = -1) Then 'Sólo solicitudes
                EquiposDespacho = Solicitud.ListarPorDespachoPaginado(inPagTam, inPagAct, IdEmpleado, IdOficina, IdOperador, IdTipoLinea, ListoDespacho, YaDespacho, NoFechaDespacho, BajaRenovacionSinEquipo)
            ElseIf IdTipoLinea = 2 And IdCampana <> -1 Then ' Solicitudes y Campañas
                EquiposDespacho = Pedido.ListarDetallePorEmpleadoOficinaPorCampanaPaginado(inPagTam, inPagAct, IdEmpleado, IdOficina, IdCampana, ListoDespacho, YaDespacho, NoFechaDespacho, _
                                                                                   NoEnviadoOperador, BajaRenovacionSinEquipo)
            End If

            If IdEmpleado = "" Then
                For Each col As DataColumn In EquiposDespacho.Tables(1).Columns
                    If col.ColumnName.StartsWith("Monto") Then
                        Numeros.Add(i)
                    ElseIf col.ColumnName.StartsWith("Fecha") Then
                        Fechas.Add(i)
                    End If
                    i = i + 1
                Next
                inTotReg = Convert.ToInt32(EquiposDespacho.Tables(0).Rows(0)("TotalRegistros"))
                Return JQGrid.DatosJSON(EquiposDespacho.Tables(1), inPagTam, inPagAct, inTotReg, strForNum, strForFec, strForHor, Numeros.ToArray(), Fechas.ToArray(), 0)
            Else
                For Each col As DataColumn In EquiposDespacho.Tables(0).Columns
                    If col.ColumnName.StartsWith("Monto") Then
                        Numeros.Add(i)
                    ElseIf col.ColumnName.StartsWith("Fecha") Then
                        Fechas.Add(i)
                    End If
                    i = i + 1
                Next

                Dim myobj As Dictionary(Of String, Object) = JQGrid.DatosJSON(EquiposDespacho.Tables(0), strForNum, strForFec, strForHor, Numeros.ToArray(), Fechas.ToArray(), 0)
                Return myobj
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Pedido IsNot Nothing Then
                Pedido.Dispose()
            End If
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarGrillaImportacion(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal IdOficinaTemp As Integer) As Dictionary(Of String, Object)
        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)

            Dim EquiposDespacho As New DataSet

            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor
            Dim strForHor = oCultura.vcHorCor
            Dim Numeros As New List(Of Integer)
            Dim Fechas As New List(Of Integer)
            Dim i As Integer = 0
            Dim inTotReg As Integer = 0

            EquiposDespacho = CampanaDespacho.ListarDespachoOficina(IdOficinaTemp, inPagTam, inPagAct)

            For Each col As DataColumn In EquiposDespacho.Tables(1).Columns
                If col.ColumnName.StartsWith("Monto") Then
                    Numeros.Add(i)
                ElseIf col.ColumnName.StartsWith("Fecha") Then
                    Fechas.Add(i)
                End If
                i = i + 1
            Next
            inTotReg = Convert.ToInt32(EquiposDespacho.Tables(0).Rows(0)("TotalRegistros"))
            Return JQGrid.DatosJSON(EquiposDespacho.Tables(1), inPagTam, inPagAct, inTotReg, strForNum, strForFec, strForHor, Numeros.ToArray(), Fechas.ToArray(), 0)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaDespacho IsNot Nothing Then CampanaDespacho.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function GrabarImportacion(ByVal IdOficinaTemp As Integer) As String
        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)
            CampanaDespacho.GuardarDespachoOficina(IdOficinaTemp)

            Return "1"

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaDespacho IsNot Nothing Then CampanaDespacho.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function LimpiarOficinaTemp() As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            HttpContext.Current.Session("IdOficinaTemp_" & oUsuario.P_inCod) = "0"
            HttpContext.Current.Session("inFilasOmitidas_" & oUsuario.P_inCod) = "0"
            Return "0"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function VolverAtencion(ByVal IdAtencion As Integer, ByVal IdDespacho As Integer) As Dictionary(Of String, Object)
        Dim Atencion As BL_MOV_ATE_Atencion = Nothing
        Dim Producto As BL_PRO_Producto = Nothing
        Try
            Atencion = New BL_MOV_ATE_Atencion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Producto = New BL_PRO_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dict As New Dictionary(Of String, Object)
            Atencion.CambiarEstado(Convert.ToInt32(IdAtencion), 48, IdDespacho, -1, -1)
            Dim dt As DataTable = Producto.NombreTab("P_Movil/Atenciones/ATE_Listado.aspx")

            dict.Add("Descripcion", dt(0)("Descripcion"))
            dict.Add("RutaAtencion", dt(0)("RutaAtencion"))
            dict.Add("Pagina", "P_Movil/Atenciones/ATE_Listado.aspx")
            Return dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Atencion) Then Atencion.Dispose()
            If Not IsNothing(Producto) Then Producto.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Guardar(ByVal oDespacho As String, ByVal IdEmpleado As String, ByVal IdCampana As String, ByVal NumeroGuia As String, _
                                   ByVal FechaDespacho As String, ByVal DespachoEmpleado As String, ByVal IdAtencion As String, _
                                   ByVal IdOperador As Integer) As Object
        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Dim CorreoConfiguracion As BL_PCS_MOV_CorreoConfiguracion = Nothing

        'CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        'Dim vcRuta1 As String = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Despacho//ConstanciaEntrega//"
        'Dim vcReporte1 As String = CampanaDespacho.Reporte_ConstanciaEntrega(12, IdEmpleado, vcRuta1)
        'vcReporte1 = "P_Movil/Administrar/Despacho/ConstanciaEntrega/" + vcReporte1
        'Dim dict1 As New Dictionary(Of String, String)
        'dict1.Add("ProcesoOK", "1")
        'dict1.Add("ConEntPDF", vcReporte1)
        'Return dict1

        Try
            CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            CorreoConfiguracion = New BL_PCS_MOV_CorreoConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_Despacho As List(Of Dictionary(Of String, Object)) = oSerializer.Deserialize(Of List(Of Dictionary(Of String, Object)))(oDespacho)
            Dim dsResult As New DataSet
            Dim v_IdAtencion As Integer
            Dim v_IdCampana As Integer

            If IdAtencion = "" Then
                v_IdAtencion = -1
            Else
                v_IdAtencion = Convert.ToInt32(IdAtencion)
            End If

            If IdCampana = "" Then
                v_IdCampana = -1
            Else
                v_IdCampana = Convert.ToInt32(IdCampana)
            End If

            'CampanaDespacho.Guardar(v_Despacho, IdEmpleado, Convert.ToInt32(IdCampana))
            dsResult = CampanaDespacho.Guardar(v_Despacho, IdEmpleado, v_IdCampana, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod, _
                                               CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcUsu, NumeroGuia, FechaDespacho, DespachoEmpleado, v_IdAtencion, IdOperador)

            Dim dict As New Dictionary(Of String, String)

            If dsResult.Tables.Count = 1 Then
                If IdEmpleado = "" Then
                    'Return "1"
                    dict.Add("ProcesoOK", "1")
                    dict.Add("ConEntPDF", "")
                    Return dict
                End If

                Dim CarpetaDominio_Ruta As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Despacho//ConstanciaEntrega//", "//")
                Dim CarpetaDominio_Repo As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Despacho/ConstanciaEntrega/"), "/")
                If Not IsNothing(HttpContext.Current.Session("IdDominio")) Then
                    If HttpContext.Current.Session("IdDominio").ToString() <> "" Then
                        CarpetaDominio_Ruta = "//" + HttpContext.Current.Session("IdDominio").ToString()
                        CarpetaDominio_Repo = "/" + HttpContext.Current.Session("IdDominio").ToString()
                    End If
                End If

                'JHERRERA 20140902: EXPORTACIÓN DE CONSTANCIA DE ENTREGA DE EQUIPOS
                Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Despacho//ConstanciaEntrega" + CarpetaDominio_Ruta + "//"
                Dim vcReporte As String = CampanaDespacho.Reporte_ConstanciaEntrega(Convert.ToInt32(dsResult.Tables(0).Rows(0)("IdDespacho")), IdEmpleado, vcRuta)
                vcReporte = "P_Movil/Administrar/Despacho/ConstanciaEntrega" + CarpetaDominio_Repo + "/" + vcReporte

                'llenado de datos de cola de correos 'agregado 13/12/2013 wapumayta
                Dim oCorreoConfiguracion As PCS_MOV_CorreoConfiguracion = CorreoConfiguracion.Mostrar(2)
                Dim tblDetalleItems As String = ""
                Dim cont As Integer = 0
                tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'>"
                If v_IdCampana = -1 Then
                    tblDetalleItems += "<tr><td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Código Solicitud</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Solicitud</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Línea</b></td>"
                    For Each dr As DataRow In dsResult.Tables(0).Rows
                        cont += 1
                        tblDetalleItems += "<tr>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & dr("CodigoProcedencia").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & dr("Solicitud").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & dr("Equipo").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & dr("Linea").ToString() & "</td>"
                        tblDetalleItems += "</tr>"
                    Next
                Else
                    tblDetalleItems += "<tr><td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Pedido</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Situación</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Línea</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
                    tblDetalleItems += "<td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Serie</b></td>"
                    For Each dr As DataRow In dsResult.Tables(0).Rows
                        cont += 1
                        tblDetalleItems += "<tr>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & dr("CodigoProcedencia").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & dr("Situacion").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & dr("Equipo").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & dr("Linea").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & dr("Plan").ToString() & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & dr("Serie").ToString() & "</td>"
                        tblDetalleItems += "</tr>"
                    Next
                End If
                tblDetalleItems += "</table></center>"

                Dim textoplantilla As String = UtilitarioWeb.TraeCuerpoCorreo(HttpContext.Current.Server.MapPath("~/" + oCorreoConfiguracion.RutaPlantilla))
                Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oCola As New ENT_MOV_Cola
                Dim oEmpleadoG As ENT_GEN_EmpleadoG = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, IdEmpleado)
                Dim FechaHora As String = Date.Now.ToString()
                Dim cuerpocorreo As String = String.Format(textoplantilla, IdEmpleado, oEmpleadoG.vcNomEmp, FechaHora, tblDetalleItems)
                oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                oCola.vcAsunto = oCorreoConfiguracion.TituloCorreo
                oCola.vcDescripcion = cuerpocorreo
                oCola.vcMailTo = oEmpleadoG.vcCorPer
                oCola.vcMailFrom = ""

                Dim codigocola As String = Cola.Insertar(oCola)
                If oCorreoConfiguracion.CopiaCorreo <> "" Then
                    Dim oColaCopia As New ENT_MOV_Cola
                    oColaCopia.vcIdUsuario = oCola.vcIdUsuario
                    oColaCopia.vcAsunto = oCola.vcAsunto
                    oColaCopia.vcDescripcion = oCola.vcDescripcion
                    oColaCopia.vcMailTo = oCola.vcMailTo
                    oColaCopia.vcMailFrom = oCola.vcMailFrom

                    Cola.Insertar(oColaCopia)
                End If
                'fin cola
                'Return "1"
                dict.Add("ProcesoOK", "1")
                dict.Add("ConEntPDF", vcReporte)
                Return dict
            Else
                dict.Add("ProcesoOK", "")
                dict.Add("ConEntPDF", "")

                Dim Pedidos As String = String.Empty
                If v_IdCampana = -1 Then
                    For Each dr As DataRow In dsResult.Tables(0).Rows
                        Pedidos = Pedidos & dr("P_inCodSol").ToString & ","
                    Next
                Else
                    For Each dr As DataRow In dsResult.Tables(0).Rows
                        Pedidos = Pedidos & dr("CodigoPedido").ToString & ","
                    Next
                End If

                If (Pedidos <> "") Then
                    dict.Add("Pedidos", Pedidos.Substring(0, Pedidos.Length - 1))
                Else
                    dict.Add("Pedidos", "")
                End If

                Dim Lineas As String = String.Empty
                For Each dr As DataRow In dsResult.Tables(1).Rows
                    Lineas = Lineas & dr("Linea").ToString & ","
                Next
                If (Lineas <> "") Then
                    dict.Add("Lineas", Lineas.Substring(0, Lineas.Length - 1))
                Else
                    dict.Add("Lineas", "")
                End If

                Dim IMEI As String = String.Empty
                For Each dr As DataRow In dsResult.Tables(2).Rows
                    IMEI = IMEI & dr("IMEI").ToString & ","
                Next
                If (IMEI <> "") Then
                    dict.Add("IMEI", IMEI.Substring(0, IMEI.Length - 1))
                Else
                    dict.Add("IMEI", "")
                End If

                Return dict
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CampanaDespacho) Then CampanaDespacho.Dispose()
            If Not IsNothing(Cola) Then Cola.Dispose()
            If Not IsNothing(CorreoConfiguracion) Then CorreoConfiguracion.Dispose()
        End Try
    End Function

    Private Sub eegExportar_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegExportar.ObtenerDatosAExportar
        Dim Pedido As BL_MOV_CAM_CampanaPedido = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = Nothing

        Try
            Pedido = New BL_MOV_CAM_CampanaPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim IdUsuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()
            Dim EquiposDespacho As New DataTable

            Dim vcOficinaTemp As String
            If IsNothing(HttpContext.Current.Session("IdOficinaTemp_" & IdUsuario)) Then
                vcOficinaTemp = "0"
            Else
                vcOficinaTemp = HttpContext.Current.Session("IdOficinaTemp_" & IdUsuario)
            End If

            Dim IdEmpleado As String = IIf(IsNothing(HttpContext.Current.Session("IdEmpleadoCDE")), "", CType(HttpContext.Current.Session("IdEmpleadoCDE"), String))
            Dim IdOficina As Integer = IIf(IsNothing(HttpContext.Current.Session("IdOficinaCDE")), -1, CType(HttpContext.Current.Session("IdOficinaCDE"), Integer))
            Dim IdOperador As Integer = CType(HttpContext.Current.Session("IdOperadorCDE"), Integer)
            Dim IdTipoLinea As Integer = CType(HttpContext.Current.Session("IdTipoLineaCDE"), Integer)
            Dim IdCampana As Integer = CType(HttpContext.Current.Session("IdCampanaCDE"), Integer)
            Dim ListoDespacho As Boolean = CType(HttpContext.Current.Session("ListoDespachoCDE"), Boolean)
            Dim YaDespacho As Boolean = CType(HttpContext.Current.Session("YaDespachoCDE"), Boolean)
            Dim NoFechaDespacho As Boolean = CType(HttpContext.Current.Session("NoFechaDespachoCDE"), Boolean)
            Dim NoEnviadoOperador As Boolean = CType(HttpContext.Current.Session("NoEnviadoOperadorCDE"), Boolean)
            Dim BajaRenovacionSinEquipo As Boolean = CType(HttpContext.Current.Session("BajaRenovacionSinEquipoCDE"), Boolean)
            Dim lstCampo As New List(Of ENT_ENT_Campo)

            If IdTipoLinea = 1 Or (IdTipoLinea = 2 And IdCampana = -1) Then 'Solo solicitudes
                EquiposDespacho = Solicitud.ListarPorDespacho(IdEmpleado, IdOficina, IdOperador, IdTipoLinea, ListoDespacho, YaDespacho)
                'EquiposDespacho = Solicitud.ListarPorDespachoPaginado(1000, 1, IdEmpleado, IdOficina, IdOperador, IdTipoLinea, ListoDespacho, YaDespacho, NoFechaDespacho, BajaRenovacionSinEquipo).Tables(0)

                'lstCampo.Add(New ENT_ENT_Campo("IdSolicitud", "Id Solicitud", "IdSolicitud"))
                'lstCampo.Add(New ENT_ENT_Campo("TienePDFAutDes", "TienePDFAutDes", "TienePDFAutDes"))
                lstCampo.Add(New ENT_ENT_Campo("vcCodAutDes", "Autorización De Descuento", "vcCodAutDes"))
                lstCampo.Add(New ENT_ENT_Campo("CodigoSolicitud", "Código Solicitud", "CodigoSolicitud"))
                lstCampo.Add(New ENT_ENT_Campo("Oficina", "Oficina", "Oficina"))
                lstCampo.Add(New ENT_ENT_Campo("Registro", "Registro", "Registro"))
                lstCampo.Add(New ENT_ENT_Campo("Empleado", "Empleado", "Empleado"))
                lstCampo.Add(New ENT_ENT_Campo("Linea", "Línea", "Linea"))
                lstCampo.Add(New ENT_ENT_Campo("IMEI", "IMEI", "IMEI"))
                lstCampo.Add(New ENT_ENT_Campo("Modelo Dispositivo", "Modelo Dispositivo", "Modelo Dispositivo"))
                lstCampo.Add(New ENT_ENT_Campo("Fecha Solicitud", "Fecha Solicitud", "Fecha Solicitud"))
                lstCampo.Add(New ENT_ENT_Campo("Tipo Solicitud", "Tipo Solicitud", "Tipo Solicitud"))
                lstCampo.Add(New ENT_ENT_Campo("Despachado", "Despachado", "Despachado"))
                lstCampo.Add(New ENT_ENT_Campo("Fecha Despacho", "Fecha Despacho", "Fecha Despacho"))
                lstCampo.Add(New ENT_ENT_Campo("NumeroCorte", "Corte", "NumeroCorte"))

            ElseIf IdTipoLinea = 2 And IdCampana <> -1 Then ' Solicitudes y Campañas

                If vcOficinaTemp = "0" Then
                    EquiposDespacho = Pedido.ListarDetallePorEmpleadoOficinaPorCampana(IdEmpleado, IdOficina, IdCampana, ListoDespacho, YaDespacho, NoFechaDespacho, _
                                                                                       NoEnviadoOperador, BajaRenovacionSinEquipo)
                    lstCampo.Add(New ENT_ENT_Campo("Oficina", "Oficina", "Oficina"))
                    lstCampo.Add(New ENT_ENT_Campo("IdEmpleado", "Registro", "Registro"))
                    lstCampo.Add(New ENT_ENT_Campo("Colaborador", "Colaborador", "Colaborador"))
                    lstCampo.Add(New ENT_ENT_Campo("CodigoPedido", "Código Pedido", "CodigoPedido"))
                    lstCampo.Add(New ENT_ENT_Campo("IdDetallePedido", "IdDetallePedido", "IdDetallePedido"))
                    lstCampo.Add(New ENT_ENT_Campo("Linea", "Línea", "Linea"))
                    lstCampo.Add(New ENT_ENT_Campo("RPM", "RPM", "RPM"))
                    lstCampo.Add(New ENT_ENT_Campo("Equipo", "Equipo", "Equipo"))
                    lstCampo.Add(New ENT_ENT_Campo("IMEI", "IMEI", "IMEI"))
                    lstCampo.Add(New ENT_ENT_Campo("Plan", "Plan", "Plan"))
                    lstCampo.Add(New ENT_ENT_Campo("MesesContrato", "Meses Contrato", "MesesContrato"))
                    lstCampo.Add(New ENT_ENT_Campo("Situacion", "Situación", "Situacion"))
                    lstCampo.Add(New ENT_ENT_Campo("Estado", "Estado", "Estado"))
                    lstCampo.Add(New ENT_ENT_Campo("EnviadoOperador", "Enviado Operador", "EnviadoOperador"))
                    lstCampo.Add(New ENT_ENT_Campo("FechaPedido", "Fecha Pedido", "FechaPedido"))
                    lstCampo.Add(New ENT_ENT_Campo("FechaRecojo", "Fecha Recojo", "FechaRecojo"))
                    lstCampo.Add(New ENT_ENT_Campo("FechaDespacho", "Fecha Despacho", "FechaDespacho"))
                    lstCampo.Add(New ENT_ENT_Campo("NumeroCorte", "Corte", "NumeroCorte"))

                Else
                    EquiposDespacho = CampanaDespacho.ListarDespachoOficina(Convert.ToInt32(vcOficinaTemp), 0, 1).Tables(1)

                    lstCampo.Add(New ENT_ENT_Campo("IdEmpleado", "Registro", "Registro"))
                    lstCampo.Add(New ENT_ENT_Campo("vcEmpleado", "Empleado", "vcEmpleado"))
                    lstCampo.Add(New ENT_ENT_Campo("CodigoPedido", "Código Pedido", "CodigoPedido"))
                    lstCampo.Add(New ENT_ENT_Campo("IdDetallePedido", "IdDetallePedido", "IdDetallePedido"))
                    lstCampo.Add(New ENT_ENT_Campo("Linea", "Línea", "Linea"))
                    lstCampo.Add(New ENT_ENT_Campo("RPM", "RPM", "RPM"))
                    lstCampo.Add(New ENT_ENT_Campo("Equipo", "Equipo", "Equipo"))
                    lstCampo.Add(New ENT_ENT_Campo("IMEI", "IMEI", "IMEI"))
                    lstCampo.Add(New ENT_ENT_Campo("Plan", "Plan", "Plan"))
                    lstCampo.Add(New ENT_ENT_Campo("MesesContrato", "Meses Contrato", "MesesContrato"))
                    lstCampo.Add(New ENT_ENT_Campo("Situacion", "Situación", "Situacion"))
                    lstCampo.Add(New ENT_ENT_Campo("Estado", "Estado", "Estado"))
                    lstCampo.Add(New ENT_ENT_Campo("EnviadoOperador", "Enviado Operador", "EnviadoOperador"))
                    lstCampo.Add(New ENT_ENT_Campo("FechaPedido", "Fecha Pedido", "FechaPedido"))
                    lstCampo.Add(New ENT_ENT_Campo("FechaRecojo", "Fecha Recojo", "FechaRecojo"))
                    lstCampo.Add(New ENT_ENT_Campo("FechaDespacho", "Fecha Despacho", "FechaDespacho"))
                    lstCampo.Add(New ENT_ENT_Campo("NumeroCorte", "Corte", "NumeroCorte"))
                    lstCampo.Add(New ENT_ENT_Campo("Observacion", "Observación", "Observacion"))
                End If

            End If

            For i As Integer = 0 To lstCampo.Count - 1
                lstCampo.Item(i).btVis = True
                lstCampo.Item(i).btVig = True
            Next

            If IdOficina = -1 Then
                eegExportar.ExportarDatos(EquiposDespacho, "Despacho (Empleado)", lstCampo)
            Else
                eegExportar.ExportarDatos(EquiposDespacho, "Despacho (Oficina)", lstCampo)
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Pedido IsNot Nothing Then Pedido.Dispose()
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
            If CampanaDespacho IsNot Nothing Then CampanaDespacho.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function CargarAlmacenIMEI(ByVal Linea As String, ByVal IMEI As String, ByVal Id As Integer) As Dictionary(Of String, Object)
        Dim Despacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Try
            Despacho = New BL_MOV_CAM_CampanaDespacho(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdEmpleado As String = CType(HttpContext.Current.Session("IdEmpleadoCDE"), String)
            Dim IdOficina As Integer = CType(HttpContext.Current.Session("IdOficinaCDE"), Integer)
            Dim IdOperador As Integer = CType(HttpContext.Current.Session("IdOperadorCDE"), Integer)
            Dim IdTipoLinea As Integer = CType(HttpContext.Current.Session("IdTipoLineaCDE"), Integer)
            Dim IdCampana As Integer = CType(HttpContext.Current.Session("IdCampanaCDE"), Integer)
            Dim ListoDespacho As Boolean = CType(HttpContext.Current.Session("ListoDespachoCDE"), Boolean)
            Dim YaDespacho As Boolean = CType(HttpContext.Current.Session("YaDespachoCDE"), Boolean)
            Dim NoFechaDespacho As Boolean = CType(HttpContext.Current.Session("NoFechaDespachoCDE"), Boolean)
            Dim NoEnviadoOperador As Boolean = CType(HttpContext.Current.Session("NoEnviadoOperadorCDE"), Boolean)
            Dim BajaRenovacionSinEquipo As Boolean = CType(HttpContext.Current.Session("BajaRenovacionSinEquipoCDE"), Boolean)
            'Dim dt As DataTable = Despacho.MostrarDatosLinea(Linea, IdOperador, IdTipoLinea)
            Dim dt As DataTable = Despacho.MostrarDatos(Linea, IMEI, IdOperador, IdTipoLinea, Id)
            Dim dict As New Dictionary(Of String, Object)

            If dt.Rows.Count > 0 Then
                dict.Add("IMEI", dt.Rows(0)("IMEI"))
            Else
                dict.Add("IMEI", "")
            End If

            dict.Add("Id", Id)
            dict.Add("Error", dt.Rows(0)("Error"))

            Return dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Despacho) Then Despacho.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function CargarAlmacenLinea(ByVal IMEI As String, ByVal Linea As String, ByVal Id As Integer) As Dictionary(Of String, Object)
        Dim Despacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Try
            Despacho = New BL_MOV_CAM_CampanaDespacho(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdEmpleado As String = CType(HttpContext.Current.Session("IdEmpleadoCDE"), String)
            Dim IdOficina As Integer = CType(HttpContext.Current.Session("IdOficinaCDE"), Integer)
            Dim IdOperador As Integer = CType(HttpContext.Current.Session("IdOperadorCDE"), Integer)
            Dim IdTipoLinea As Integer = CType(HttpContext.Current.Session("IdTipoLineaCDE"), Integer)
            Dim IdCampana As Integer = CType(HttpContext.Current.Session("IdCampanaCDE"), Integer)
            Dim ListoDespacho As Boolean = CType(HttpContext.Current.Session("ListoDespachoCDE"), Boolean)
            Dim YaDespacho As Boolean = CType(HttpContext.Current.Session("YaDespachoCDE"), Boolean)
            Dim NoFechaDespacho As Boolean = CType(HttpContext.Current.Session("NoFechaDespachoCDE"), Boolean)
            Dim NoEnviadoOperador As Boolean = CType(HttpContext.Current.Session("NoEnviadoOperadorCDE"), Boolean)
            Dim BajaRenovacionSinEquipo As Boolean = CType(HttpContext.Current.Session("BajaRenovacionSinEquipoCDE"), Boolean)
            'Dim dt As DataTable = Despacho.MostrarDatosIMEI(IMEI, IdOperador, IdTipoLinea)
            Dim dt As DataTable = Despacho.MostrarDatos(Linea, IMEI, IdOperador, IdTipoLinea, Id)
            Dim dict As New Dictionary(Of String, Object)

            If dt.Rows.Count > 0 Then
                dict.Add("Linea", dt.Rows(0)("Linea"))
            Else
                dict.Add("Linea", "")
            End If

            dict.Add("Id", Id)
            dict.Add("Error", dt.Rows(0)("Error"))

            Return dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Despacho) Then Despacho.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function OperadorPorCampana(ByVal IdCampana As Integer) As Integer
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Campana.OperadorPorCampana(IdCampana)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Campana) Then Campana.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CargarArchivo(Operador As String, Campana As String, pruta As String, LineaTipo As String, IdOficina As Integer) As String
        Dim DespachoOficina As BL_MOV_CAM_CampanaDespacho = Nothing
        Dim vProceso As BL_PCS_IMP_Proceso = Nothing
        Dim vProcesoInformacion As BL_PCS_IMP_ProcesoInformacion = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            DespachoOficina = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)
            vProceso = New BL_PCS_IMP_Proceso(oUsuario.IdCliente)
            vProcesoInformacion = New BL_PCS_IMP_ProcesoInformacion(oUsuario.IdCliente)

            Dim resultado As Boolean = False
            pruta = HttpContext.Current.Server.MapPath("~\" + pruta)

            Dim pidPlantilla As Integer = 21
            Dim ptabla As String = "MOV_CAM_CampanaDespacho_OficinaDetalleTemp"
            Dim Proceso As New ProcesosFunciones

            Dim CodConfigOrigen As Integer = Proceso.Registrar_Configuracion_Origen_Upload(pruta, pidPlantilla)
            Dim CodProceso As Integer = vProceso.Obtener_Codigo_Proceso()
            Dim CodProcesoInformacion As Integer = vProcesoInformacion.Obtener_Codigo_Proceso_Informacion()
            'Dim dtImportacion As DataTable
            Dim inIdDespachoOficina As Integer = 0
            Dim inFilasOmitidas As Integer = 0
            Dim dsOrigen As New DataSet

            If Proceso.Insertar_Proceso(CodConfigOrigen, CodProceso, CodProcesoInformacion) Then
                If Proceso.Registrar_ProcesoInformacion(CodProceso, CodProcesoInformacion) Then

                    Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Debug, "Ingresa Procesando_Origen")

                    dsOrigen = Proceso.Procesando_Origen(CodConfigOrigen, CodProceso, CodProcesoInformacion)
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
            '    '---------------------------------------------------------------------------------------------------------------------------------

            Dim dtResultado As New DataTable()
            If dsOrigen.Tables(0).Rows.Count > 0 Then
                dtResultado = DespachoOficina.GuardarDespachoOficinaTemp(dsOrigen.Tables(0), Operador, LineaTipo, Campana, IdOficina, pruta, oUsuario.P_inCod)
                inIdDespachoOficina = Convert.ToInt32("0" + dtResultado.Rows(0)("IdOficinaTemp").ToString())
                inFilasOmitidas = Convert.ToInt32("0" + dtResultado.Rows(0)("inFilasOmitidas").ToString())
            End If

            HttpContext.Current.Session("IdOficinaTemp_" & oUsuario.P_inCod) = inIdDespachoOficina.ToString()
            HttpContext.Current.Session("inFilasOmitidas_" & oUsuario.P_inCod) = inFilasOmitidas.ToString()

            Return inIdDespachoOficina.ToString() + "---" + inFilasOmitidas.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If DespachoOficina IsNot Nothing Then DespachoOficina.Dispose()
            If vProceso IsNot Nothing Then vProceso.Dispose()
            If vProcesoInformacion IsNot Nothing Then vProcesoInformacion.Dispose()
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
    Public Shared Sub CargarValoresReporte(ListaFechas As String, Tipo As Integer, ByVal IdOficina As Integer)
        HttpContext.Current.Session("ListaFechas") = ListaFechas
        HttpContext.Current.Session("TipoReporte") = Tipo
        HttpContext.Current.Session("IdOficinaReporte") = IdOficina
    End Sub

    <WebMethod()>
    Public Shared Function ListarLugaresEntrega(ByVal IdCampana As Integer) As List(Of MOV_CAM_LugarEntrega)
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)

            Dim lstLugaresEntrega As List(Of MOV_CAM_LugarEntrega) = New List(Of MOV_CAM_LugarEntrega)
            lstLugaresEntrega = Campana.listarLugaresEntrega_porCampana(IdCampana)

            Return lstLugaresEntrega
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then Campana.Dispose()
        End Try
    End Function

    'Private Sub eegReporte_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegReporte.ObtenerDatosAExportar
    '    Dim Fechas As String = HttpContext.Current.Session("ListaFechas")
    '    Dim Tipo As Integer = Convert.ToInt32(HttpContext.Current.Session("TipoReporte"))
    '    Dim NombreHoja As String = "Despachos_Por_Letras"
    '    Dim Despacho As BL_MOV_CAM_CampanaDespacho = Nothing
    '    Try
    '        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '        Despacho = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)
    '        Dim cabecera As New List(Of ENT_ENT_Campo)
    '        Dim ds As DataSet = Despacho.ReporteDespachoLetras(Fechas, Tipo)
    '
    '        For Each col As DataColumn In ds.Tables(0).Columns
    '            cabecera.Add(New ENT_ENT_Campo(col.ColumnName))
    '        Next
    '
    '        eegReporte.ExportarDatos(ds.Tables(0), NombreHoja, cabecera)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If Despacho IsNot Nothing Then Despacho.Dispose()
    '    End Try
    'End Sub

    <WebMethod()>
    Public Shared Function ObtenerDatosResguardo(Numero As String) As List(Of Object)
        Try
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDatos As DataSet = Solicitud.Formato_ResguardoConfiguracion(Numero)
            Dim dtCabecera As DataTable = dsDatos.Tables(0)
            Dim dtLinea As DataTable = dsDatos.Tables(1)
            Solicitud.Dispose()

            Dim lstObj As New List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            For i As Integer = 0 To dtCabecera.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtCabecera.Columns
                    dict.Add(Columna.ColumnName, dtCabecera.Rows(i)(Columna.ColumnName).ToString())
                Next
                If dtLinea.Rows.Count > 0 Then
                    For Each Columna As DataColumn In dtLinea.Columns
                        If Not dict.ContainsKey(Columna.ColumnName) Then
                            If Convert.IsDBNull(dtLinea.Rows(i)(Columna.ColumnName)) Then
                                dict.Add(Columna.ColumnName, "")
                            Else
                                dict.Add(Columna.ColumnName, dtLinea.Rows(i)(Columna.ColumnName).ToString())
                            End If
                        End If
                    Next
                End If
                lstObj.Add(dict)
            Next

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerDatosResguardoIMEI(Numero As String, IMEI As String) As List(Of Object)
        Try
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDatos As DataSet = Solicitud.Formato_ResguardoConfiguracion(Numero, IMEI)
            Dim dtCabecera As DataTable = dsDatos.Tables(0)
            Dim dtLinea As DataTable = dsDatos.Tables(1)
            Solicitud.Dispose()

            Dim lstObj As New List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            For i As Integer = 0 To dtCabecera.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtCabecera.Columns
                    dict.Add(Columna.ColumnName, dtCabecera.Rows(i)(Columna.ColumnName).ToString())
                Next
                If dtLinea.Rows.Count > 0 Then
                    For Each Columna As DataColumn In dtLinea.Columns
                        If Convert.IsDBNull(dtLinea.Rows(i)(Columna.ColumnName)) Then
                            dict.Add(Columna.ColumnName, "")
                        Else
                            dict.Add(Columna.ColumnName, dtLinea.Rows(i)(Columna.ColumnName).ToString())
                        End If
                    Next
                End If
                lstObj.Add(dict)
            Next

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GuardarDatosResguardo(Factura As String, NroConsecutivo As String, TipoServicio As String, Costo As String, _
                                                 Marca As String, Modelo As String, NroServicio As String, IMEI As String, SIM As String, _
                                                 PIN As String, Observaciones As String, Accesorios As String, Responsable As String) As String
        Try
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdResguardo As String = Solicitud.Guardar_Resguardo(NroConsecutivo, TipoServicio, Factura, Costo, Marca, Modelo, NroServicio,
                                                                    IMEI, SIM, PIN, Accesorios, Observaciones, Responsable)
            Solicitud.Dispose()
            Return IdResguardo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function



End Class
