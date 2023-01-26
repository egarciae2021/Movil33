Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports DocumentFormat.OpenXml.Drawing.Diagrams
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.CuentaCobro.BL

Imports VisualSoft.PCSistel.Comprobantes.BE
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class Comp_Adm_EmisionComprobanteDetalle
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim bl_tipoDocumento As BL_MOV_FAC_TipoDocumento = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If Not IsPostBack Then
                    LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
                    'UtilitarioWeb.Dataddl(ddlTipoLinea, LineaTipo.Listar(-1, "<< Ambos >>"), "vcDescripcion", "P_inCod")
                    bl_tipoDocumento = New BL_MOV_FAC_TipoDocumento(oUsuario.IdCliente)
                    UtilitarioWeb.Dataddl(ddlTipoComp, bl_tipoDocumento.Listar(-1, "<Todos>"), "Descripcion", "IdTipoDocumento")

                    Dim vcPeriodo As String = Request.QueryString("vcPeriodo")
                    Dim idOperador As Integer = Convert.ToInt32(Request.QueryString("idOper"))
                    Dim idEstado As Integer = Convert.ToInt32(Request.QueryString("est"))
                    Dim idTipLin As Integer = Convert.ToInt32(Request.QueryString("idTipLin"))
                    Dim idTipProd As Integer = Convert.ToInt32(Request.QueryString("idTipProd"))

                    hdfPeriodo.Value = vcPeriodo
                    hdfCodOperador.Value = idOperador
                    hdfEstado.Value = idEstado
                    hdfTipoLinea.Value = idTipLin
                    hdfTipoProducto.Value = idTipProd

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
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
            If bl_tipoDocumento IsNot Nothing Then bl_tipoDocumento.Dispose()
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, vcOrdCol As String, vcTipOrdCol As String, p_periodo As String, _
                                  p_estado As String, p_idOperador As Integer, p_tipoProducto As Integer, p_idEmpleado As String, p_linea As String, _
                                  p_idTipoProceso As Integer, p_conciliados As Integer, p_tipoDocumento As Integer, p_pagina As String) As List(Of Object)
        Dim bl_ComprobanteDetalle As BL_MOV_FAC_ComprobanteDetalle = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ComprobanteDetalle = New BL_MOV_FAC_ComprobanteDetalle(oUsuario.IdCliente)

            p_periodo = p_periodo.Substring(3, 4) & p_periodo.Substring(0, 2) & "01"

            If p_pagina <> "" And p_pagina <> "-1" And p_idEmpleado = "" Then
                inPagAct = p_pagina
                p_idEmpleado = ""
                p_linea = ""
            ElseIf p_pagina = "-1" Then
                p_idEmpleado = ""
                p_linea = ""
            End If

            HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle") = p_periodo & "|" & p_estado & "|" & p_idOperador & "|" & p_tipoProducto & "|" & p_idEmpleado & "|" & p_linea & "|" _
                                                                    & p_idTipoProceso & "|" & p_conciliados & "|" & p_tipoDocumento & "|"

            Dim listObj As New List(Of Object)
            Dim dt As DataTable = bl_ComprobanteDetalle.Listar(p_periodo, p_estado, p_idOperador, p_tipoProducto, p_idEmpleado, p_linea, p_idTipoProceso, p_conciliados, p_tipoDocumento)

            If dt.Rows.Count > 0 Then

                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim cantSinLinea As Integer = 0
                    For Each dr As DataRow In dt.Rows
                        If dr("linea").ToString = "" Then
                            cantSinLinea = cantSinLinea + 1
                        End If
                    Next
                    
                    If vcOrdCol <> "" Then
                        Dim dvData As New DataView(dt)
                        dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                        dt = dvData.ToTable

                    End If

                    Dim TotalPaginas As Integer
                    Dim TotalRegistros As Integer
                    Dim inResto As Integer
                    TotalRegistros = dt.Rows.Count
                    TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
                    If inResto > 0 Then TotalPaginas = TotalPaginas + 1

                    HttpContext.Current.Session("dtComprobantedetalle") = dt

                    listObj.Add(JQGrid.DatosJSON(dt, inPagTam, inPagAct))
                    listObj.Add(cantSinLinea)

                    Return listObj
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
            If bl_ComprobanteDetalle IsNot Nothing Then bl_ComprobanteDetalle.Dispose()
        End Try
        Return Nothing
    End Function

    '<WebMethod()> _
    'Public Shared Function ListarLineasTipoLinea(ByVal vcNumLin As String, ByVal inTipLin As Integer, ByVal inCodEmp As String) As List(Of ENT_MOV_Linea)
    '    Dim Linea As BL_MOV_Linea = Nothing
    '    Dim oUsuario As ENT_SEG_Usuario = Nothing
    '    Try
    '        oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '        Linea = New BL_MOV_Linea(oUsuario.IdCliente)
    '        Dim _return As List(Of ENT_MOV_Linea)

    '        _return = Linea.ListarLineasTipoLinea(vcNumLin, inCodEmp, inTipLin)
    '        Return _return
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If Not IsNothing(Linea) Then Linea.Dispose()
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Function Generar(lstGenerar As String, p_periodo As String, p_tipoProceso As Integer) As Integer
        Dim bl_comprobante As BL_MOV_FAC_Comprobante = Nothing
        Dim bl_cronogramaPago As BL_MOV_FAC_C_CronogramaPago = Nothing
        Dim bl_solicitud As BL_MOV_FAC_Solicitud = Nothing
        Dim bl_CompConfig As BL_MOV_FAC_Comprobante_Configuracion = Nothing
        Dim bl_Empleado As VisualSoft.Suite80.BL.BL_GEN_Empleado = Nothing
        Dim bl_Cobro As BL_MOV_FAC_Cobro = Nothing
        Dim oCultura As BL_GEN_Cultura = Nothing
        Dim resultado As Integer = 0
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            Dim oSerializer As New JavaScriptSerializer
            Dim lst_Generar As List(Of ENT_MOV_FAC_Comprobante) = oSerializer.Deserialize(Of List(Of ENT_MOV_FAC_Comprobante))(lstGenerar)

            bl_CompConfig = New BL_MOV_FAC_Comprobante_Configuracion(oUsuario.IdCliente)
            Dim eMovFavConfiguracion As ENT_MOV_FAC_Comprobante_Configuracion = bl_CompConfig.Mostrar()
            Dim band As Integer = bl_CompConfig.ValidarConfiguracion()

            band = band + bl_CompConfig.ValidarConfiguracion2()

            oCultura = New BL_GEN_Cultura(oUsuario.IdCliente)
            Dim p_igv As Decimal = oCultura.Mostrar(0).dcIGV

            bl_Empleado = New VisualSoft.Suite80.BL.BL_GEN_Empleado(oUsuario.IdCliente)

            bl_cronogramaPago = New BL_MOV_FAC_C_CronogramaPago(oUsuario.IdCliente)
            bl_comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
            bl_solicitud = New BL_MOV_FAC_Solicitud(oUsuario.IdCliente)
            bl_Cobro = New BL_MOV_FAC_Cobro(oUsuario.IdCliente)

            'p_periodo = p_periodo & "01"

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

                If band = 0 Then

                    '-------------------------------------------------------------
                    Dim nuevaLista As List(Of String) = (From eComprobante In lst_Generar Select eComprobante.IdEmpleado).ToList()
                    Dim listaAux As List(Of String) = nuevaLista.Distinct().ToList()

                    For Each codigoEmp As String In listaAux

                        Dim dtAgrupado As DataTable = bl_cronogramaPago.Lista_CronogramaAprupagoEmpleadoPeriodo(p_periodo, codigoEmp, p_tipoProceso)

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

                            Dim dtDetalle As DataTable = bl_cronogramaPago.Lista_CronogramaPorTipoProducto(p_periodo, oComprobante)

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
                            oComprobante.NumeroCorrelativo = bl_comprobante.ObtenerNroCorrelativo(oComprobante.IdTipoDocumento)

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

                            resultado = resultado + bl_comprobante.Registrar(oComprobante, lstCobros, eMovFavConfiguracion)
                        Next

                    Next


                    Return resultado

                Else
                    resultado = -2
                    Return resultado
                End If
            Else
                Return -5
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_comprobante IsNot Nothing Then bl_comprobante.Dispose()
            If bl_cronogramaPago IsNot Nothing Then bl_cronogramaPago.Dispose()
            If bl_solicitud IsNot Nothing Then bl_solicitud.Dispose()
            If bl_CompConfig IsNot Nothing Then bl_CompConfig.Dispose()
            If bl_Empleado IsNot Nothing Then bl_Empleado.Dispose()
            If oCultura IsNot Nothing Then oCultura.Dispose()
            If bl_Cobro IsNot Nothing Then bl_Cobro.Dispose()
        End Try

    End Function

    Protected Sub eegComprobantes_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegComprobantes.ObtenerDatosAExportar
        Dim bl_ComprobanteDetalle As BL_MOV_FAC_ComprobanteDetalle = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            bl_ComprobanteDetalle = New BL_MOV_FAC_ComprobanteDetalle(oUsuario.IdCliente)
            'Dim p_periodo As String = hdfPeriodo.Value.Substring(3, 4) & hdfPeriodo.Value.Substring(0, 2) & "01"
            'Dim p_estado As String = hdfEstado.Value
            'Dim p_idOperador As String = hdfCodOperador.Value
            'Dim p_tipoProducto As String = hdfTipoProducto.Value
            'Dim p_idEmpleado As String = hdfCodEmpleado.Value
            'Dim p_linea As String = hdfNumLinea.Value
            'Dim p_idTipoProceso As String = hdfTipoProceso.Value
            'Dim p_conciliados As String = hdfConciliados.Value

            Dim p_periodo As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(0)
            Dim p_estado As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(1)
            Dim p_idOperador As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(2)
            Dim p_tipoProducto As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(3)
            Dim p_idEmpleado As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(4)
            Dim p_linea As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(5)
            Dim p_idTipoProceso As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(6)
            Dim p_conciliados As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(7)
            Dim p_tipoDocumento As String = HttpContext.Current.Session("vcFiltro_MOV_FAC_ComprobanteDetalle").ToString().Split("|")(8)

            Dim dt As DataTable = bl_ComprobanteDetalle.Listar(p_periodo, p_estado, p_idOperador, p_tipoProducto, p_idEmpleado, p_linea, p_idTipoProceso, p_conciliados, p_tipoDocumento)
            dt.Columns.Remove("nroCuenta")

            Dim dtExportar As DataTable
            dtExportar = dt.Copy()
            dtExportar.Columns.Remove("nroComprobante2")


            eegComprobantes.ExportarDatos(RenombrarColumnas(dt), "Detalle_Comprobantes_" & p_periodo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_ComprobanteDetalle IsNot Nothing Then bl_ComprobanteDetalle.Dispose()
        End Try
    End Sub

    Private Function RenombrarColumnas(ByVal prData As DataTable) As DataTable
        Try
            Dim contador As Integer = 0
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "id"
                        prData.Columns.Remove("id")
                        contador = contador + 1
                        Continue For
                    Case "registro"
                        prData.Columns.Remove("registro")
                        contador = contador + 1
                        Continue For
                    Case "nroDni"
                        prData.Columns(index - contador).ColumnName = "Nro Documento"
                        Continue For
                    Case "empleado"
                        prData.Columns(index - contador).ColumnName = "Empleado"
                        Continue For
                    Case "idEmpleado"
                        prData.Columns.Remove("idEmpleado")
                        contador = contador + 1
                        Continue For
                    Case "IdOperador"
                        prData.Columns.Remove("IdOperador")
                        contador = contador + 1
                        Continue For
                    Case "nroContrato"
                        prData.Columns(index - contador).ColumnName = "Nro Contrato"
                        Continue For
                    Case "linea"
                        prData.Columns(index - contador).ColumnName = "Línea"
                        Continue For
                    Case "nroCuenta"
                        prData.Columns(index - contador).ColumnName = "Nro Cuenta"
                        Continue For
                    Case "idTipoProceso"
                        prData.Columns.Remove("idTipoProceso")
                        contador = contador + 1
                        Continue For
                    Case "tipoProceso"
                        prData.Columns(index - contador).ColumnName = "Tipo Proceso"
                        Continue For
                    Case "periodo"
                        prData.Columns(index - contador).ColumnName = "Periodo"
                        Continue For
                    Case "motivo"
                        prData.Columns(index - contador).ColumnName = "Motivo"
                        Continue For
                    Case "idTipoProducto"
                        prData.Columns.Remove("idTipoProducto")
                        contador = contador + 1
                        Continue For
                    Case "idCronogramaPago"
                        prData.Columns.Remove("idCronogramaPago")
                        contador = contador + 1
                        Continue For
                    Case "importe"
                        prData.Columns(index - contador).ColumnName = "Importe"
                        Continue For
                    Case "importeOperador"
                        prData.Columns(index - contador).ColumnName = "Importe Operador"
                        Continue For
                    Case "importeOperador2"
                        prData.Columns.Remove("importeOperador2")
                        contador = contador + 1
                        Continue For
                    Case "diferencia"
                        prData.Columns(index - contador).ColumnName = "Diferencia"
                        Continue For
                    Case "estado"
                        prData.Columns(index - contador).ColumnName = "Conciliados"
                        Continue For
                    Case "estadoComprobante"
                        prData.Columns(index - contador).ColumnName = "Estado"
                        Continue For
                    Case "nroComprobante"
                        prData.Columns(index - contador).ColumnName = "Nro Comprobante"
                        Continue For
                    Case "nroComprobante2"
                        prData.Columns.Remove("nroComprobante2")
                        contador = contador + 1
                        Continue For
                    Case "idTipoDocumento"
                        prData.Columns.Remove("idTipoDocumento")
                        contador = contador + 1
                        Continue For
                    Case "tipoDocumento"
                        prData.Columns(index - contador).ColumnName = "Tipo Documento"
                        Continue For
                End Select
            Next
        Catch ex As Exception
        End Try
        Return prData
    End Function

    <WebMethod()>
    Public Shared Function BuscaFilaNumero(ByVal Numero As String, ByVal inPagTam As String) As Integer

        Dim dt As DataTable = CType(HttpContext.Current.Session("dtComprobantedetalle"), DataTable)

        Dim fila As Integer
        Dim pagina As Integer
        Dim inResto As Integer
        Dim strQuery As String = "linea ='" & Numero & "'"

        fila = dt.Rows.IndexOf(dt.Select(strQuery).FirstOrDefault())

        If fila > -1 Then

            pagina = Math.DivRem((fila + 1), Convert.ToInt32(inPagTam), inResto)
            If inResto > 0 Then pagina = pagina + 1

            Return pagina

        Else
            Return -1
        End If


    End Function

    '<WebMethod()>
    'Public Shared Function ListarLineas(ByVal vcNum As String, ByVal inMaxFil As Integer, ByVal inTipLin As Integer) As List(Of String)
    '    Dim Linea As BL_MOV_Linea = Nothing
    '    Try
    '        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '        Linea = New BL_MOV_Linea(oUsuario.IdCliente)

    '        Dim dt As DataTable = Linea.ListarPorNumeroTipoLinea(vcNum, inMaxFil, inTipLin)
    '        Dim lstLinea As New List(Of String)
    '        For Each dr As DataRow In dt.Rows
    '            Dim element As String
    '            element = dr("P_vcNum").ToString() + "-" + dr("EMPL_vcNOMEMP").ToString() + "-" + dr("F_vcCodEmp").ToString()
    '            lstLinea.Add(element)
    '        Next
    '        Return lstLinea
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If Linea IsNot Nothing Then Linea.Dispose()
    '    End Try
    'End Function

End Class