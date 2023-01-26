Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria.Constantes
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports System.Web.Script.Services

Partial Class P_Movil_Facturacion_Mantenimiento_Fac_CesesNuevo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim logica As BL_MOV_FAC_Cese = Nothing
        'Dim logica2 As BL_MOV_FAC_TipoCese = Nothing
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing

        Dim ComprobanteConfiguracion As BL_MOV_FAC_Comprobante_Configuracion = Nothing

        Try
            oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                Dim script As String = "window.parent.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))

                    'Dim vcTab As String = Request.QueryString("vcTab")
                    'Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))

                    'Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

                    Dim codigo As String = Request.QueryString("Cod")
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    'oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    oAuditoria.Modulo = "[Facturacion (Ceses de Empleados)]"
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()
                    hdfinTipOri.Value = inTipOri.ToString()

                    'logica2 = New BL_MOV_FAC_TipoCese(Integer.Parse(inTipOri), oUsuario.IdCliente)
                    'UtilitarioWeb.Dataddl(ddlTipoCese, logica2.Listar_TiposdeCese("-1", "<Seleccione>"), "vcDescripcion", "IdTipoCese") 'ECONDEÑA   15/01/2016

                    'ddlTipoCese.DataSource = logica2.Listar_TiposdeCese("-1", "<Seleccione>")
                    'ddlTipoCese.DataTextField = "vcDescripcion"
                    'ddlTipoCese.DataValueField = "IdTipoCese"
                    'ddlTipoCese.DataBind()
                    'logica2.Dispose()

                    'Valida si es perfil de Recursos Humanos -- Jcamacho 21/10/2015
                    Dim PerfilRecursos As Boolean = False
                    If (oUsuario.Perfiles.Where(Function(x) x.P_inCod = 39).Count > 0) Then
                        PerfilRecursos = True
                    End If

                    Dim vcCondicion As String = ""

                    'If codigo = "" Then
                    '    vcCondicion = "EMPL_btEST=1"
                    'Else
                    '    vcCondicion = "EMPL_btEST=0"
                    'End If

                    'vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP NOT IN (Select vcCodEmp From MOV_FAC_CESE where btEstado = 1 )"
                    vcCondicion = vcCondicion + " EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente= 1) and EMPL_P_vcCODEMP not in (select vcCodEmp from MOV_FAC_Cese)"
                    'vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 and IdEmpleado not in (select vcCodEmp from mov_fac_cese where btEstado = 1 ))"



                    If oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then
                        vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
                    Else
                        vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.Empleado.P_vcCod + "|"
                    End If

                    'If oUsuario.F_vcCodInt.ToString() = "" Then
                    '    vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.F_vcCodEmp + "|"
                    'Else
                    '    vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
                    'End If

                    bpTecnicoResponsable.NombreEntidad = "Empleados"
                    bpTecnicoResponsable.vcTab = "M_EMPL"
                    bpTecnicoResponsable.TipoOrigen = 0
                    bpTecnicoResponsable.Condicion = vcCondicion
                    bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos"
                    bpTecnicoResponsable.RutaRaiz = "../../../"
                    bpTecnicoResponsable.Contenedor = "dvContenedorTecRes"
                    bpTecnicoResponsable.Descripcion = "EMPL_vcNOMEMP"
                    bpTecnicoResponsable.Codigo = "EMPL_P_vcCODEMP"
                    'bpTecnicoResponsable.SoloVigentes = False

                    bpTecnicoTransferido.NombreEntidad = "Empleado a transferir la línea"
                    bpTecnicoTransferido.vcTab = "M_EMPL"
                    bpTecnicoTransferido.TipoOrigen = 0
                    bpTecnicoTransferido.Condicion = vcCondicion
                    bpTecnicoTransferido.FuncionPersonalizada = "fnMostrarTecTransf"
                    bpTecnicoTransferido.RutaRaiz = "../../../"
                    bpTecnicoTransferido.Contenedor = "dvContenedorTecTrans"
                    bpTecnicoTransferido.Descripcion = "EMPL_vcNOMEMP"
                    bpTecnicoTransferido.Codigo = "EMPL_P_vcCODEMP"
                    bpTecnicoTransferido.TraerDatosFila = True



                    If Not IsNothing(codigo) Then
                        Dim codigos As String() = codigo.Split(New Char() {"-"c})
                        codigo = Convert.ToString(codigos("0"))
                        hdfCodigo.Value = codigo

                        logica = New BL_MOV_FAC_Cese(Integer.Parse(inTipOri), oUsuario.IdCliente)
                        Dim oCese As ENT_MOV_FAC_Cese = logica.ListarCese_XCodigo(codigo)

                        hdfCodCese.Value = oCese.idCese

                        bpTecnicoResponsable.CodigoValor = oCese.vcCodEmp
                        bpTecnicoResponsable.Deshabilitado = True

                        hdfEmpleado.Value = oCese.vcCodEmp
                        hdfEstado.Value = oCese.btEstado
                        hdfNomEmp.Value = oCese.vcCodEmp + "=" + oCese.NomEmpleado

                        If oCese.btEstado = 1 Then
                            'vcCondicion = "EMPL_btEST IN (1,0)"
                            'vcCondicion = vcCondicion + " EMPL_P_vcCODEMP in (Select distinct IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 )"
                            'bpTecnicoResponsable.Condicion = vcCondicion
                            bpTecnicoResponsable.Condicion = "EMPL_P_vcCODEMP in (Select distinct IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 )"
                        End If


                        hdfTecnicoResponsable.Value = oCese.vcCodEmp
                        'txtEmpleado.Text = oCese.NomEmpleado
                        txtDescripcion.Text = oCese.VcDescripcion
                        txtFechaCese.Text = oCese.FechaCese

                        'ddlTipoCese.SelectedValue = oCese.TipoCese

                        'ddlTipoCese.Enabled = False
                        'hdfTipoCese.Value = oCese.TipoCese

                        txtFechaPago.Text = oCese.FechaCreacion     'txtFechaPago.Text = oCese.FechaPago   'ECONDEÑA 11/01/2016 

                        chkEmitir.Checked = oCese.Emitir

                    Else
                        hdfCodigo.Value = 0
                        hdfEmpleado.Value = ""
                        hdfEmpleado.Value = ""
                        hdfEstado.Value = 0
                        hdfHayResTec.Value = 1
                        hdfHayResApr.Value = 1

                        txtFechaCese.Text = DateTime.Now.ToShortDateString
                        txtFechaPago.Text = DateTime.Now.ToShortDateString

                        'TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
                        'Dim dtTipoSolicitud As DataTable = TipoSolicitud.Mostrar(31).Tables("dtTipoSolicitud")

                        'If dtTipoSolicitud.Rows(0)("inTecnicoResponsable").ToString() = "" Then hdfHayResTec.Value = 0
                        'If dtTipoSolicitud.Rows(0)("biPropie") = False And dtTipoSolicitud.Rows(0)("biUsuEsp") = False And dtTipoSolicitud.Rows(0)("biResAre") = False Then
                        '    hdfHayResApr.Value = 0
                        'End If

                    End If

                    'Dim validar As String = String.Empty
                    'ComprobanteConfiguracion = New BL_MOV_FAC_Comprobante_Configuracion(oUsuario.IdCliente)
                    'Dim band As Integer = ComprobanteConfiguracion.ValidarConfiguracion()
                    'band = band + ComprobanteConfiguracion.ValidarConfiguracion2()
                    'If band <> 0 Then
                    '    validar = "false"
                    'End If
                    'If validar = "" Then
                    '    If oUsuario.Empleado.P_vcCod = "" Then
                    '        validar = "false"
                    '    Else
                    '        For Each entSegPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                    '            If entSegPerfil.P_inCod = 39 Then
                    '                validar = "true"
                    '                Exit For
                    '            Else
                    '                validar = "false"
                    '            End If
                    '        Next
                    '    End If
                    'End If
                    'If validar = "false" Then
                    '    hdfValidaConf.Value = 0
                    'End If
                    hdfValidaConf.Value = 0

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
            'If logica2 IsNot Nothing Then logica2.Dispose()
            If ComprobanteConfiguracion IsNot Nothing Then ComprobanteConfiguracion.dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal emitirComp As Boolean, oCese As String, xmlDatosLineas As String) As String
        Dim Cese As BL_MOV_FAC_Cese = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim mensaje As String = String.Empty
            Dim oSerializer As New JavaScriptSerializer
            Dim eCese As ENT_MOV_FAC_Cese = oSerializer.Deserialize(Of ENT_MOV_FAC_Cese)(oCese)

            Cese = New BL_MOV_FAC_Cese(oUsuario.IdCliente)
            eCese.IdUsuarioCese = oUsuario.Empleado.P_vcCod
            Dim p_IdUsuario As Integer = oUsuario.P_inCod
            Dim p_NomUsu As String = oUsuario.vcUsu
            'eCese, xmlDatosLinea, p_IdUsuario, p_NomUsu, emitirComprobantes
            mensaje = Cese.Guardar(eCese, xmlDatosLineas, p_IdUsuario, p_NomUsu, emitirComp)

            Return mensaje
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try
    End Function

    '<WebMethod()>
    'Public Shared Function Guardar(ByVal IdCese As Integer, ByVal IdEmpleado As String, ByVal fechaCese As String, _
    '                                ByVal descripcion As String, ByVal TipoCese As String, ByVal FechaPago As String, ByVal inTipOri As String) As String
    '    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '    Dim logica As BL_MOV_FAC_Cese = New BL_MOV_FAC_Cese(Integer.Parse(inTipOri), oUsuario.IdCliente)
    '    Try

    '        Dim mensaje As String = ""

    '        Dim oCese As New ENT_MOV_FAC_Cese
    '        oCese.idCese = IdCese

    '        oCese.vcCodEmp = IdEmpleado
    '        oCese.FechaCese = FechaValida(fechaCese, "")
    '        oCese.VcDescripcion = descripcion
    '        oCese.FechaPago = FechaValida(FechaPago, "")
    '        oCese.usuario = oUsuario.vcUsu
    '        'Ruta donde se generara el Estado de Cuenta
    '        oCese.RutaCeseTemporal = HttpContext.Current.Server.MapPath("~/") + "P_Movil\Facturacion\Exportacion\EstadoCuenta\"
    '        oCese.TipoCese = TipoCese
    '        oCese.inUsuario = oUsuario.P_inCod
    '        mensaje = logica.Guardar_Cese(oCese)
    '        logica.Dispose()
    '        Return mensaje

    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        logica.Dispose()
    '    End Try
    'End Function

    Public Shared Function FechaValida(ByVal _fecha As String, ByVal nuevoDia As String) As String
        Dim fecha_registrar_en_SQL, dia, mes, anio As String
        fecha_registrar_en_SQL = ""
        If _fecha <> "" Then

            If _fecha.Length = 9 Then
                anio = _fecha.Substring(5, 4)
                dia = _fecha.Substring(2, 2)
                If nuevoDia <> String.Empty Then

                    dia = nuevoDia.PadLeft(2, "0")
                End If

                mes = "0" + _fecha.Substring(0, 1)
                fecha_registrar_en_SQL = anio + mes + dia

            End If
            If _fecha.Length = 8 Then
                anio = _fecha.Substring(4, 4)
                dia = "0" + _fecha.Substring(2, 1)
                If nuevoDia <> String.Empty Then
                    dia = nuevoDia.PadLeft(2, "0")
                End If
                mes = "0" + _fecha.Substring(0, 1)
                fecha_registrar_en_SQL = anio + mes + dia


            End If

            If _fecha.Length >= 10 Then
                anio = _fecha.Substring(6, 4)
                mes = _fecha.Substring(3, 2)
                dia = _fecha.Substring(0, 2)
                If nuevoDia <> String.Empty Then
                    dia = nuevoDia.PadLeft(2, "0")
                End If
                fecha_registrar_en_SQL = anio + mes + dia


            End If
            Return fecha_registrar_en_SQL
        Else

            Return ""

        End If
    End Function

    <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarDeudas(ByVal IdEmpleado As String, ByVal inTipOri As String, ByVal TipoCese As String) As List(Of ENT_MOV_FAC_EstadoCuenta)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Cese = Nothing

        Try
            logica = New BL_MOV_FAC_Cese(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim lista As New List(Of ENT_MOV_FAC_EstadoCuenta)
            lista = logica.Listar_DeudaTotalxCese(IdEmpleado, TipoCese)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function ListarLineasxEmpleado(ByVal IdEmpleado As String, ByVal inPagTam As String,
                                                 ByVal inPagAct As String, vcOrdCol As String, vcTipOrdCol As String,
                                                 ByVal btOpcion As Boolean) As Object
        Dim Cese As BL_MOV_FAC_Cese = Nothing
        Dim dt As DataTable
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            Cese = New BL_MOV_FAC_Cese(oUsuario.IdCliente)

            If btOpcion Then
                dt = Cese.LineasEmpleadoCesexEmpleado(IdEmpleado)
            Else
                dt = Cese.ListaLineasxEmpleado(IdEmpleado)
            End If

            If dt.Rows.Count > 0 Then

                If vcOrdCol <> "" Then
                    Dim dvData As New DataView(dt)
                    dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                    dt = dvData.ToTable()
                End If
                Dim TotalPaginas As Integer
                Dim TotalRegistros As Integer
                Dim inResto As Integer
                TotalRegistros = dt.Rows.Count
                TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
                If inResto > 0 Then TotalPaginas = TotalPaginas + 1

                Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try
        Return Nothing
    End Function

    <WebMethod()>
    Public Shared Function ListarDeudasxEmpleado(ByVal IdEmpleado As String, ByVal inPagTam As String,
                                                 ByVal inPagAct As String, vcOrdCol As String, vcTipOrdCol As String,
                                                 ByVal btOpcion As Boolean) As Object
        Dim Cese As BL_MOV_FAC_Cese = Nothing
        Try
            Dim dt As DataTable
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            Cese = New BL_MOV_FAC_Cese(oUsuario.IdCliente)
            If btOpcion Then
                dt = Cese.ListaDeudasCesexEmpleado(IdEmpleado)
            Else
                dt = Cese.ListaDeudasxEmpleado(IdEmpleado)
            End If

            If dt.Rows.Count > 0 Then
                If vcOrdCol <> "" Then
                    Dim dvData As New DataView(dt)
                    dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                    dt = dvData.ToTable()
                End If
                Dim TotalPaginas As Integer
                Dim TotalRegistros As Integer
                Dim inResto As Integer
                TotalRegistros = dt.Rows.Count
                TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
                If inResto > 0 Then TotalPaginas = TotalPaginas + 1

                Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try
        Return Nothing
    End Function

    <WebMethod()>
    Public Shared Function ListarEstadosCeses() As List(Of ENT_MOV_FAC_EstadoLinea)
        Dim EstadoLinea As BL_MOV_FAC_EstadoLinea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            EstadoLinea = New BL_MOV_FAC_EstadoLinea(oUsuario.IdCliente)
            Dim lista As List(Of ENT_MOV_FAC_EstadoLinea) = EstadoLinea.Listar("-1", "--Seleccionar--")
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If EstadoLinea IsNot Nothing Then EstadoLinea.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarEstadoCuenta(ByVal IdEmpleado As String) As List(Of ENT_MOV_FAC_EstadoCuenta)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_EstadoCuenta = Nothing
        Try
            logica = New BL_MOV_FAC_EstadoCuenta(oUsuario.IdCliente)
            'Dim linea As BL_MOV_FAC_EstadoCuenta = BL_MOV_FAC_EstadoCuenta.Instance(oUsuario.IdCliente)
            Dim lista As List(Of ENT_MOV_FAC_EstadoCuenta) = logica.Listar_EstadoCuenta(IdEmpleado)
            HttpContext.Current.Session("vcFiltro_ECuenta") = IdEmpleado
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function MostrarResumenDeudaTotal(ByVal IdEmpleado As String, ByVal btOpcion As Boolean) As ENT_MOV_FAC_Cese

        Dim Cese As BL_MOV_FAC_Cese = Nothing
        Dim dt As DataTable
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Cese = New BL_MOV_FAC_Cese(oUsuario.IdCliente)

            dt = Cese.MostrarResumenDeuda(IdEmpleado, btOpcion)

            Dim oCese As New ENT_MOV_FAC_Cese
            If dt.Rows.Count > 0 Then

                oCese.EstadoCuentaAnterior = Convert.ToDecimal(dt(0)("montoECAnterior").ToString())
                oCese.PagosAbonos = Convert.ToDecimal(dt(0)("montoPagoPeriodo").ToString())
                oCese.ConsumosCargos = Convert.ToDecimal(dt(0)("montoCargoPeriodo").ToString())
                oCese.CuotasFinanciadas = Convert.ToDecimal(dt(0)("montoCuotasFuturas").ToString())
                oCese.Penalidades = Convert.ToDecimal(dt(0)("penalidades").ToString())
            End If

            HttpContext.Current.Session("vcFiltro_ECuenta") = IdEmpleado
            Return oCese
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCronogramasCeses(ByVal IdEmpleado As String, ByVal inPagTam As String, ByVal inPagAct As String, _
                                                    ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal inTipoProducto As Integer,
                                                    ByVal inTipoDocumento As Integer, montoPorCobrar As Decimal,
                                                    ByVal strBaja_Lineas As String, ByVal strBaja_Penalidad As String, ByVal strLineas As String,
                                                    ByVal strLineasConEquipo As String, ByVal strIdSolFac As String) As List(Of Object)
        Dim Cese As BL_MOV_FAC_Cese = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            Dim dcPenalidad As Decimal = 0
            Dim listObj As New List(Of Object)

            Cese = New BL_MOV_FAC_Cese(oUsuario.IdCliente)
            Dim dsDetalle As DataSet = Cese.ListarDeudasCronogramas(IdEmpleado, inTipoProducto, inTipoDocumento)

            'Agregando los detalles de comprobante por concepto de penalidad
            Dim lstBaja_Lineas As String() = strBaja_Lineas.Split(",")
            Dim lstBaja_Penalidad As String() = strBaja_Penalidad.Split("|")
            If inTipoDocumento = 1 Then

                Dim vcPeriodoActual = DateTime.Now().ToString("dd/MM/yyyy")

                'Quitando los detalles de comprobantes cuyas deudas serán dadas de baja, transferidas a un empleado o trabsferidas al operador
                Dim lstLineas As String() = strLineas.Split(",")
                Dim lstLineasConEquipo As String() = strLineasConEquipo.Split(",")
                '
                Dim filasEliminar As New List(Of DataRow)
                If lstLineas.Length > 0 Then
                    For i = 0 To lstLineas.Length - 1
                        For Each dr As DataRow In dsDetalle.Tables(0).Rows
                            If dr("Linea").ToString() = lstLineas(i) And dr("inTipSol") <> 1 And dr("TipoMotivo") <> "Equipo" Then
                                filasEliminar.Add(dr)
                            ElseIf dr("Linea").ToString() = lstLineas(i) And dr("inTipSol") <> 1 And dr("TipoMotivo") = "Equipo" And lstLineasConEquipo(i) = "1" Then
                                filasEliminar.Add(dr)
                            End If
                        Next
                    Next
                End If

                For Each dr As DataRow In filasEliminar
                    dsDetalle.Tables(0).Rows.Remove(dr)
                Next

                If inTipoDocumento = 1 AndAlso inTipoProducto = 2 Then
                    'If dsDetalle.Tables(1).Rows.Count > 0 Then
                    For i As Integer = 0 To lstBaja_Lineas.Length - 1
                        If lstBaja_Penalidad(i) <> "" Then
                            If Convert.ToDecimal(lstBaja_Penalidad(i)) > 0 Then
                                dsDetalle.Tables(0).Rows.Add({dsDetalle.Tables(0).Rows.Count + 1, vcPeriodoActual.Substring(3), lstBaja_Lineas(i), "---", "No Regular", "Documentos Autorizados", "Penalidad por cese anticipado de línea: " + lstBaja_Lineas(i), "NO EMITIDO", 1, "Servicio", Convert.ToDecimal(lstBaja_Penalidad(i))})
                                'dsDetalle.Tables(0).Rows.Add({dsDetalle.Tables(0).Rows.Count + 1, "---", lstBaja_Lineas(i), "No Regular", vcPeriodoActual.Substring(3), Convert.ToDecimal(lstBaja_Penalidad(i)), "Documentos Autorizados", "Penalidad por cese anticipado de línea: " + lstBaja_Lineas(i), "NO EMITIDO", "1", "Servicio"})
                                dcPenalidad = dcPenalidad + Convert.ToDecimal(lstBaja_Penalidad(i))
                            End If
                        End If
                    Next
                End If


                'Dim inLen = dsDetalle.Tables(0).Rows.Count
                'dsDetalle.Tables(0).Columns("MontoCuota").ReadOnly = False
                'For i As Integer = 0 To inLen - 1
                '    Dim dr As DataRow = dsDetalle.Tables(0).Rows(i)
                '    dr("MontoCuota") = UtilitarioWeb.DevuelveNumeroFormateado(dr("MontoCuota").ToString(), strForNum)
                'Next

            End If
            If inTipoDocumento = 2 Then
                'Dim lstLineas As String() = strLineas.Split(",")
                Dim filasEliminar As New List(Of DataRow)
                'If lstLineas.Length > 0 Then
                'For i = 0 To lstLineas.Length - 1
                For Each dr As DataRow In dsDetalle.Tables(0).Rows
                    'If (Convert.ToDecimal(dr("MontoCuota").ToString()) <> montoPorCobrar) Then
                    If (dr("IdSolFac").ToString() <> strIdSolFac) Then
                        If Not filasEliminar.Contains(dr) Then
                            filasEliminar.Add(dr)
                        End If
                        'Continue For
                    End If
                    'If lstLineas(i) <> "" Then
                    'If (lstLineas(i) <> "" And dr("Linea").ToString() <> lstLineas(i)) OrElse (Convert.ToDecimal(dr("MontoCuota").ToString()) <> montoPorCobrar) Then
                    '    If Not filasEliminar.Contains(dr) Then
                    '        filasEliminar.Add(dr)
                    '        'Continue For
                    '    End If
                    'End If
                    'End If

                Next
                'Next
                'End If

                For Each dr As DataRow In filasEliminar
                    dsDetalle.Tables(0).Rows.Remove(dr)
                Next
            End If


            Dim inLen = dsDetalle.Tables(0).Rows.Count
            dsDetalle.Tables(0).Columns("MontoCuota").ReadOnly = False
            For i As Integer = 0 To inLen - 1
                Dim dr As DataRow = dsDetalle.Tables(0).Rows(i)
                dr("MontoCuota") = UtilitarioWeb.DevuelveNumeroFormateado(dr("MontoCuota").ToString(), strForNum)
            Next

            Dim dt As DataTable = dsDetalle.Tables(0)
            If vcOrdCol = "Periodo" Then vcOrdCol = "Periodo1"

            If dt.Rows.Count > 0 Then
                If vcOrdCol <> "" Then
                    Dim dvData As New DataView(dt)
                    dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                    dt = dvData.ToTable()
                End If
                Dim TotalPaginas As Integer
                Dim TotalRegistros As Integer
                Dim inResto As Integer
                TotalRegistros = dt.Rows.Count
                TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
                If inResto > 0 Then TotalPaginas = TotalPaginas + 1

                listObj.Add(JQGrid.DatosJSON(dt, inPagTam, inPagAct))
                HttpContext.Current.Session("dtCese_CronogramaDetalle") = dt

                Dim totalDeuda As Decimal = 0D
                For Each dr As DataRow In dt.Rows
                    If IsNumeric(dr("MontoCuota").ToString()) Then
                        totalDeuda = totalDeuda + Convert.ToDecimal(dr("MontoCuota").ToString())
                    End If
                Next
                listObj.Add(totalDeuda)

                listObj.Add(dcPenalidad)

                Return listObj
                'Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
            End If

            'Return New UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
            '                  Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try
        Return Nothing
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function MostrarDeudaxEmpleado(ByVal inPagTam As String, ByVal inPagAct As String, _
                                                    ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal p_idEmpleado As String,
                                                    ByVal p_temp As String, ByVal p_linea As Integer,
                                                    ByVal p_estado As Integer, ByVal p_penalidad As Decimal, ByVal p_idEmpleadoTran As String,
                                                    ByVal p_equipo As Boolean, ByVal p_UsaComprobante As Boolean) As List(Of Object)
        Dim Cese As BL_MOV_FAC_Cese = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            Dim listObj As New List(Of Object)

            Cese = New BL_MOV_FAC_Cese(oUsuario.IdCliente)
            Dim ds As DataSet = Cese.MostrarDeudaxEmpleado(p_idEmpleado, p_temp, p_linea, p_estado, p_penalidad, p_idEmpleadoTran, p_equipo, p_UsaComprobante)

            Dim temp As String = ds.Tables(0).Rows(0)(0).ToString()

            Dim dt As DataTable = ds.Tables(1)

            If dt.Rows.Count > 0 OrElse ds.Tables(2).Rows.Count > 0 OrElse ds.Tables(3).Rows.Count > 0 Then
                If vcOrdCol <> "" Then
                    Dim dvData As New DataView(dt)
                    dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                    dt = dvData.ToTable()
                End If
                Dim TotalPaginas As Integer
                Dim TotalRegistros As Integer
                Dim inResto As Integer
                TotalRegistros = dt.Rows.Count
                TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
                If inResto > 0 Then TotalPaginas = TotalPaginas + 1

                'listObj.Add(New UtilitarioWeb.JQGridJsonResponse(TotalPaginas, inPagAct, TotalRegistros, dt, 1))

                listObj.Add(JQGrid.DatosJSON(dt, inPagTam, inPagAct))


                Dim dtDeudas As DataTable = ds.Tables(2)

                listObj.Add(JQGrid.DatosJSON(dtDeudas))

                listObj.Add(temp)

                Dim dtResumen As DataTable = ds.Tables(3)

                Dim eCese As New ENT_MOV_FAC_Cese
                For Each dr As DataRow In dtResumen.Rows
                    eCese.EstadoCuentaAnterior = Convert.ToDecimal(dr("montoEstCtaAnt").ToString())
                    eCese.PagosAbonos = Convert.ToDecimal(dr("montoPago").ToString())
                    eCese.ConsumosCargos = Convert.ToDecimal(dr("montoCargo").ToString())
                    eCese.CuotasFinanciadas = Convert.ToDecimal(dr("montoCuotas").ToString())
                    eCese.Penalidades = Convert.ToDecimal(dr("totalPenalidad").ToString())
                Next

                listObj.Add(eCese)

                Return listObj
                'Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try
        Return Nothing
    End Function

    <WebMethod()>
    Public Shared Function LimpiarConsulta(ByVal tempConsulta) As String
        Dim Cese As BL_MOV_FAC_Cese = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Cese = New BL_MOV_FAC_Cese(oUsuario.IdCliente)

            Return Cese.LimpiarConsulta(tempConsulta)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cese IsNot Nothing Then Cese.Dispose()
        End Try
    End Function

    Protected Sub eegCronogramas_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegCronogramas.ObtenerDatosAExportar
        Dim negocio As BL_MOV_FAC_Cese = Nothing
        Try
            Dim lstCampo As New List(Of ENT_ENT_Campo)
            lstCampo.Add(New ENT_ENT_Campo("Periodo", "Periodo", "Periodo"))
            lstCampo.Add(New ENT_ENT_Campo("Linea", "Línea", "Linea"))
            lstCampo.Add(New ENT_ENT_Campo("PedidoSolicitud", "Pedido/Solicitud", "PedidoSolicitud"))
            lstCampo.Add(New ENT_ENT_Campo("TipoProceso", "Tipo de Proceso", "TipoProceso"))
            lstCampo.Add(New ENT_ENT_Campo("TipoDocumento", "Tipo de Documento", "TipoDocumento"))
            lstCampo.Add(New ENT_ENT_Campo("Motivo", "Motivo", "Motivo"))
            lstCampo.Add(New ENT_ENT_Campo("EstadoCobro", "Estado Cobro", "EstadoCobro"))
            lstCampo.Add(New ENT_ENT_Campo("TipoMotivo", "Tipo Motivo", "TipoMotivo"))
            lstCampo.Add(New ENT_ENT_Campo("MontoCuota", "Monto", "MontoCuota"))

            Dim dt As DataTable = HttpContext.Current.Session("dtCese_CronogramaDetalle")
            dt.Columns.Remove("RowNumber")
            dt.Columns.Remove("IdTipDoc")
            dt.Columns.Remove("inTipSol")
            dt.Columns.Remove("Periodo1")

            For i As Integer = 0 To lstCampo.Count - 1
                lstCampo.Item(i).btVis = True
                lstCampo.Item(i).btVig = True
            Next

            eegCronogramas.ExportarDatos(dt, "Detalle De Comprobante", lstCampo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Sub
End Class

