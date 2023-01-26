Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.PCSistel.Comprobantes.BE
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports DevExpress.Xpo.Helpers
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class Comp_Adm_EmisionComprobante
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim TipoProducto As VisualSoft.PCSistel.Comprobantes.BL.BL_MOV_FAC_TipoProducto = Nothing
        Dim Estado As BL_MOV_FAC_EstadoComprobante = Nothing
        Dim TipoLinea As BL_MOV_LineaTipo = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If Not IsPostBack Then

                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    UtilitarioWeb.Dataddl(dwOperador, Operador.Listar(-1, "<Todos>"), "vcNomOpe", "P_inCodOpe")

                    TipoProducto = New VisualSoft.PCSistel.Comprobantes.BL.BL_MOV_FAC_TipoProducto(oUsuario.IdCliente)
                    UtilitarioWeb.Dataddl(dwTipoProducto, TipoProducto.Listar(-1, "<Todos>"), "Descripcion", "IdTipoProducto")

                    Estado = New BL_MOV_FAC_EstadoComprobante(oUsuario.IdCliente)
                    UtilitarioWeb.Dataddl(dwEstado, Estado.Listar(-1, "<Todos>"), "NombreEstado", "IdEstado")

                    'TipoLinea = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                    'UtilitarioWeb.Dataddl(dwTipoLinea, TipoLinea.Listar(-1, "<< Ambos >>"), "vcDescripcion", "P_inCod")

                    Dim validar As String = String.Empty

                    If oUsuario.Empleado.P_vcCod = "" Then
                        validar = "false"
                    Else
                        For Each entSegPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                            If entSegPerfil.P_inCod = 39 Then
                                validar = "true"
                                Exit For
                            Else
                                validar = "false"
                            End If
                        Next
                    End If
                    Dim script As String = "var validar = " + validar + ";"

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "ScriptKey", script, True)

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If TipoProducto IsNot Nothing Then TipoProducto.Dispose()
            If Estado IsNot Nothing Then Estado.Dispose()
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Buscar(ByVal inPagTam As String, ByVal inPagAct As String, vcOrdCol As String,
                                  vcTipOrdCol As String, p_periodo As String, p_estado As String,
                                  p_idOperador As Integer, p_tipoProducto As Integer) As Object
        Dim bl_Comprobante As BL_MOV_FAC_Comprobante = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_Comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)

            Dim inMeses As Integer
            If p_periodo = "" Then
                inMeses = inPagTam
            Else
                inMeses = 1
                p_periodo = p_periodo.Substring(3, 4) & p_periodo.Substring(0, 2) & "01"
            End If

            Dim dt As DataTable = bl_Comprobante.Listar(p_periodo, p_estado, p_idOperador, p_tipoProducto, 0, inMeses)

            If dt.Rows.Count > 0 Then

                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

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
                    'Return New UtilitarioWeb.JQGridJsonResponse(TotalPaginas, inPagAct, TotalRegistros, dt, 1)
                Else
                    Return Nothing
                End If

            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Comprobante IsNot Nothing Then bl_Comprobante.Dispose()
        End Try
        Return Nothing
    End Function

    <WebMethod()>
    Public Shared Function Generar(p_periodo As String, p_estado As Integer, p_idOperador As Integer, p_tipoProducto As Integer) As Integer
        Dim bl_ComprobanteDetalle As BL_MOV_FAC_ComprobanteDetalle = Nothing
        Dim resultado As Integer
        Dim oCultura As BL_GEN_Cultura = Nothing
        Dim bl_ComprobanteConfiguracion As BL_MOV_FAC_Comprobante_Configuracion = Nothing
        Dim bl_Comprobante As BL_MOV_FAC_Comprobante = Nothing
        Dim bl_CronogramaPago As BL_MOV_FAC_C_CronogramaPago = Nothing
        Dim bl_solicitud As BL_MOV_FAC_Solicitud = Nothing
        Dim bl_Empleado As VisualSoft.Suite80.BL.BL_GEN_Empleado = Nothing
        Dim bl_Cobro As BL_MOV_FAC_Cobro = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ComprobanteConfiguracion = New BL_MOV_FAC_Comprobante_Configuracion(oUsuario.IdCliente)
            Dim band As Integer = bl_ComprobanteConfiguracion.ValidarConfiguracion()
            band = band + bl_ComprobanteConfiguracion.ValidarConfiguracion2()

            If oUsuario.Empleado.P_vcCod <> "" Then

                Dim validarPerfil As Boolean = False
                For Each entSegPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                    If entSegPerfil.P_inCod = 39 Then
                        validarPerfil = True
                        Exit For
                    End If
                Next

                If Not validarPerfil Then
                    Return -5
                End If

                Dim eMovFavConfiguracion As ENT_MOV_FAC_Comprobante_Configuracion = bl_ComprobanteConfiguracion.Mostrar()

                If band = 0 Then
                    bl_Comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
                    bl_ComprobanteDetalle = New BL_MOV_FAC_ComprobanteDetalle(oUsuario.IdCliente)
                    oCultura = New BL_GEN_Cultura(oUsuario.IdCliente)

                    bl_solicitud = New BL_MOV_FAC_Solicitud(oUsuario.IdCliente)
                    bl_Empleado = New VisualSoft.Suite80.BL.BL_GEN_Empleado(oUsuario.IdCliente)

                    Dim p_igv As Decimal = oCultura.Mostrar(0).dcIGV

                    bl_CronogramaPago = New BL_MOV_FAC_C_CronogramaPago(oUsuario.IdCliente)
                    bl_Cobro = New BL_MOV_FAC_Cobro(oUsuario.IdCliente)

                    'p_periodo = p_periodo.Substring(3, 4) & p_periodo.Substring(0, 2) & "01"

                    Dim dt As DataTable = bl_Comprobante.ListarGenerar(p_periodo, p_estado, p_idOperador, p_tipoProducto, 1)

                    If dt.Rows.Count > 0 Then
                        If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                            Dim lstCodEmp As New List(Of String)
                            Dim lstNroDocEmp As New List(Of String)
                            Dim lstNroCuenta As New List(Of String)

                            For Each dr As DataRow In dt.Rows
                                Dim eCronograma As New ENT_MOV_FAC_C_CronogramaPago()
                                eCronograma.IdCronogramaPago = Convert.ToInt32(dr("IdCronogramaPago").ToString())
                                eCronograma = bl_CronogramaPago.ObtenerCronogramaPago(eCronograma.IdCronogramaPago)

                                If eCronograma.NroDocumento <> "" Then
                                    lstNroDocEmp.Add(eCronograma.NroDocumento)
                                Else
                                    Return -3
                                End If

                                If eCronograma.NroCuenta <> "" Then
                                    lstNroCuenta.Add(eCronograma.NroCuenta)
                                Else
                                    Return -4
                                End If

                                lstCodEmp.Add(eCronograma.IdEmpleado)

                            Next

                            If lstNroDocEmp.Any(Function(nroDoc) nroDoc = "") Then
                                Return -3
                            End If

                            If lstNroCuenta.Any(Function(nroCuenta) nroCuenta = "") Then
                                Return -4
                            End If

                            If band = 0 Then

                                Dim nuevaLista As List(Of String) = lstCodEmp.Distinct().ToList()

                                For Each codEmp In nuevaLista

                                    Dim dtAgrupado As DataTable = bl_CronogramaPago.Lista_CronogramaAprupagoEmpleadoPeriodo(p_periodo, codEmp)

                                    For Each fila As DataRow In dtAgrupado.Rows

                                        Dim oComprobante As New ENT_MOV_FAC_Comprobante()
                                        oComprobante.IdEmpleado = fila("idEmpleado").ToString()
                                        oComprobante.IdTipoProceso = Convert.ToInt32(fila("idTipoProceso").ToString())
                                        oComprobante.Periodo = fila("periodo").ToString()
                                        oComprobante.Periodo1 = p_periodo.Substring(0, 6)
                                        oComprobante.IdTipoProducto = Convert.ToInt32(fila("idTipoProducto").ToString())
                                        oComprobante.Nombre = fila("empleado").ToString()
                                        oComprobante.IdTipoLinea = Convert.ToInt32(fila("idTipoLinea").ToString())
                                        oComprobante.IdTipoDocumento = Convert.ToInt32(fila("idTipoDocumento").ToString())
                                        oComprobante.IdComprobanteMod = IIf(fila("NumeroComprobante").ToString() = "", -1, fila("NumeroComprobante").ToString())

                                        Dim dtDetalle As DataTable = bl_CronogramaPago.Lista_CronogramaPorTipoProducto(p_periodo, oComprobante)

                                        Dim subTotal As Decimal = 0
                                        Dim item As Integer = 1
                                        For Each dr As DataRow In dtDetalle.Rows
                                            Dim oDetalleComprobante As New ENT_MOV_FAC_ComprobanteDetalle()
                                            oDetalleComprobante.IdCronogramaPago = Convert.ToInt32(dr("idCronogramaPago").ToString())
                                            oDetalleComprobante.PrecioUnitario = Convert.ToDecimal(dr("montoCuota").ToString())
                                            subTotal = subTotal + oDetalleComprobante.PrecioUnitario

                                            oDetalleComprobante.TotalItem = item
                                            oDetalleComprobante.Cantidad = 1
                                            oDetalleComprobante.LineaAsociada = dr("linea").ToString()
                                            oDetalleComprobante.Descripcion = dr("descripcion").ToString()
                                            oDetalleComprobante.CodigoPedidoSolicitud = dr("codContrato").ToString()

                                            oComprobante.LstComprobanteDetalle.Add(oDetalleComprobante)
                                            item = item + 1
                                        Next
                                        Dim oEmpleado As ENT_GEN_Empleado = bl_Empleado.BuscarEmpleadoxCodigo(oComprobante.IdEmpleado)

                                        oComprobante.TipoDocumentoIdentidad = 1
                                        oComprobante.NumeroDocumentoIdentidad = oEmpleado.NroDocumentoIdentidad
                                        oComprobante.NumeroCuenta = oEmpleado.NroCuenta
                                        oComprobante.ImporteTotal = subTotal
                                        oComprobante.Subtotal = oComprobante.ImporteTotal / (1 + (p_igv / 100))
                                        oComprobante.IGV = oComprobante.ImporteTotal - oComprobante.Subtotal

                                        oComprobante.TipoCambio = 1
                                        oComprobante.EstadoCobro = 1
                                        oComprobante.FechaEmision = DateTime.Now
                                        oComprobante.NumeroCorrelativo = bl_Comprobante.ObtenerNroCorrelativo(oComprobante.IdTipoDocumento)

                                        Select Case oComprobante.IdTipoDocumento
                                            Case 1
                                                oComprobante.NumeroSerie = eMovFavConfiguracion.SerieComprobanteIni
                                            Case 2
                                                oComprobante.NumeroSerie = eMovFavConfiguracion.SerieNotaCreditoIni
                                                oComprobante.IdComprobanteMod = Convert.ToInt64(fila("NumeroComprobante").ToString())
                                        End Select

                                        oComprobante.IdUsuarioEmisor = oUsuario.vcUsu
                                        oComprobante.IdEmpleadoEmisor = oUsuario.Empleado.P_vcCod

                                        Dim lstCobros As List(Of ENT_MOV_FAC_Cobro) = bl_Cobro.ListaCobroAgrupadoxIdEmpleadoPeriodo(oComprobante, p_periodo)

                                        resultado = resultado + bl_Comprobante.Registrar(oComprobante, lstCobros, eMovFavConfiguracion)
                                    Next

                                Next

                            End If

                            Return resultado

                        Else
                            Return -1
                        End If
                    Else
                        Return 0
                    End If
                Else
                    Return -2
                End If

            Else
                Return -5
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oCultura IsNot Nothing Then oCultura.Dispose()
            If bl_ComprobanteConfiguracion IsNot Nothing Then bl_ComprobanteConfiguracion.Dispose()
            If bl_Comprobante IsNot Nothing Then bl_Comprobante.Dispose()
            If bl_ComprobanteDetalle IsNot Nothing Then bl_ComprobanteDetalle.Dispose()
            If bl_CronogramaPago IsNot Nothing Then bl_CronogramaPago.Dispose()
            If bl_solicitud IsNot Nothing Then bl_solicitud.Dispose()
            If bl_Empleado IsNot Nothing Then bl_Empleado.Dispose()
            If bl_Cobro IsNot Nothing Then bl_Cobro.Dispose()
        End Try

    End Function
    
End Class