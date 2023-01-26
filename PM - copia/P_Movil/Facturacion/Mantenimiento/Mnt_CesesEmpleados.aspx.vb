Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE

Partial Class P_Movil_Facturacion_Mantenimiento_Mnt_CesesEmpleados
    Inherits System.Web.UI.Page
    
    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
        Try
            logica = New BL_MOV_FAC_Configuracion(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.parent.parent.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    'If (Not IsNothing(Request.QueryString("IdCorte"))) Then
                    '    ExportarExcel(Convert.ToInt32(Request.QueryString("IdCorte")))
                    'End If
                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))

                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))
                    hdfinTipOri.Value = inTipOri.ToString()

                    Dim oConf As ENT_MOV_FAC_Configuracion

                    Dim tipo = 1 'Importaciòn de ceses
                    oConf = logica.ListarConfiguracionProcesos(tipo)
                    If oConf.TipoEjecucion = 1 Then
                        hdfImpManual.Value = 1
                    Else
                        hdfImpManual.Value = 0
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    'Private Sub ExportarExcel(ByVal inIdCorte As Integer)
    '    Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
    '    Try
    '        CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim dsDetalle As DataSet = CampanaCorte.ListarDetallesParaReporte(inIdCorte, True)

    '        ExportDataTableToExcel(dsDetalle.Tables(0), dsDetalle.Tables(1))
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If CampanaCorte IsNot Nothing Then CampanaCorte.Dispose()
    '    End Try

    'End Sub

    'Public Sub ExportDataTableToExcel(ByVal dtDetalle As DataTable, ByVal dtCampos As DataTable)
    '    Dim attachment As String = "attachment; filename=" & "Detalle de Corte" & ".xls"

    '    Dim context As HttpContext = HttpContext.Current

    '    context.Response.ClearContent()
    '    context.Response.AddHeader("content-disposition", attachment)
    '    context.Response.ContentType = "application/vnd.ms-excel"

    '    Dim tab As String = ""

    '    context.Response.ContentEncoding = Encoding.Default
    '    context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Detalle de Corte" + "' style='border-collapse:collapse;'>")
    '    context.Response.Write(vbLf)

    '    context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
    '    context.Response.Write(vbLf + vbTab + vbTab)

    '    For i = 1 To dtCampos.Rows.Count - 1
    '        context.Response.Write("<td style='background-color: #66CCFF;'>")
    '        context.Response.Write(dtCampos.Rows(i)("vcNombre").ToString())
    '        context.Response.Write("</td>")
    '    Next
    '    context.Response.Write(vbLf)
    '    context.Response.Write(vbTab + "</tr>")
    '    context.Response.Write(vbLf)

    '    For Each dr As DataRow In dtDetalle.Rows
    '        context.Response.Write(vbTab + "<tr>")
    '        context.Response.Write(vbLf + vbTab + vbTab)
    '        For i = 1 To dtDetalle.Columns.Count - 1
    '            context.Response.Write("<td>")
    '            context.Response.Write(dr(i).ToString().Trim())
    '            context.Response.Write("</td>")
    '        Next
    '        context.Response.Write(vbLf)
    '        context.Response.Write(vbTab + "</tr>")
    '        context.Response.Write(vbLf)
    '    Next

    '    context.Response.Write("</table>")
    '    context.Response.End()
    'End Sub
    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal Filtro As String, ByVal Valor As String, ByVal inTipOri As String, ByVal FechaIni As String, ByVal FechaFin As String) As JQGridJsonResponse
        Dim negocio As BL_MOV_FAC_Cese = Nothing
        Try
            HttpContext.Current.Session("vcFiltro_Cese") = inPagTam & "|" & inPagAct & "|" & Filtro & "|" & Valor & "|" & inTipOri & "|" & FechaIni & "|" & FechaFin
            negocio = New BL_MOV_FAC_Cese(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = negocio.ListarCesesPaginado(Integer.Parse(inPagTam), Integer.Parse(inPagAct), Filtro, Valor, FechaSql(FechaIni), FechaSql(FechaFin))

            'Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            'Dim inLen = dsDetalle.Tables(1).Rows.Count
            'For i As Integer = 0 To inLen - 1
            '    dsDetalle.Tables(1).Rows(i)("FechaCese") = DevuelveFechaHoraFormateada(dsDetalle.Tables(1).Rows(i)("FechaCese").ToString(), oCultura.vcFecCor)
            'Next

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Function


    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Eliminar(ByVal IdCese As String, ByVal inTipOri As String) As String
        Dim negocio As BL_MOV_FAC_Cese = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            negocio = New BL_MOV_FAC_Cese(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim mensaje As String = String.Empty

            Dim oCese As New ENT_MOV_FAC_Cese
            oCese.idCese = IdCese
            oCese.usuario = oUsuario.vcUsu

            mensaje = negocio.Eliminar_Cese(oCese)

            Return mensaje
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Function

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim negocio As BL_MOV_FAC_Cese = Nothing
        Try

            Dim inPagTam As String = HttpContext.Current.Session("vcFiltro_Cese").ToString().Split("|")(0)
            Dim inPagAct As String = HttpContext.Current.Session("vcFiltro_Cese").ToString().Split("|")(1)
            Dim Filtro As String = HttpContext.Current.Session("vcFiltro_Cese").ToString().Split("|")(2)
            Dim Valor As String = HttpContext.Current.Session("vcFiltro_Cese").ToString().Split("|")(3)
            Dim inTipOri As String = HttpContext.Current.Session("vcFiltro_Cese").ToString().Split("|")(4)
            Dim FechaIni As String = HttpContext.Current.Session("vcFiltro_Cese").ToString().Split("|")(5)
            Dim FechaFin As String = HttpContext.Current.Session("vcFiltro_Cese").ToString().Split("|")(6)

            negocio = New BL_MOV_FAC_Cese(Integer.Parse(1), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = negocio.ListarCesesPaginadoExcel(Integer.Parse(inPagTam), Integer.Parse(inPagAct), Filtro, Valor, FechaSql(FechaIni), FechaSql(FechaFin))

            'eegSolicitudes.ExportarDatos(dsDetalle.Tables(1), "Ceses de Empleados")

            ExportDataTableToExcel(dsDetalle.Tables(1))

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Sub

    Shared Function FechaSql(ByVal Fecha As String) As String
        If (String.IsNullOrEmpty(Fecha)) Then
            Return String.Empty
        Else
            Dim dia As String
            Dim mes As String
            Dim anho As String
            dia = Fecha.Substring(0, 2)
            mes = Fecha.Substring(3, 2)
            anho = Fecha.Substring(6, 4)

            Return anho + mes + dia
        End If
    End Function

    Public Sub ExportDataTableToExcel(ByVal dtCeses As DataTable)
      



        Dim attachment As String = "attachment; filename=" & "Ceses de Empleados" & ".xls"

        Dim context As HttpContext = HttpContext.Current

        context.Response.ClearContent()
        context.Response.AddHeader("content-disposition", attachment)
        context.Response.ContentType = "application/vnd.ms-excel"


        context.Response.ContentEncoding = Encoding.Default
        context.Response.Write("<style> TD { mso-number-format:\@; } </style>")

        context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Detalle de Corte" + "' style='border-collapse:collapse;'>")
        context.Response.Write(vbLf)

        context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
        context.Response.Write(vbLf + vbTab + vbTab)

        'Cabeceras

        For i = 0 To 6
            context.Response.Write("<td style='background-color: #305496; color: #FFFFFF;'> ")
            context.Response.Write(dtCeses.Columns(i).ColumnName.ToString())
            context.Response.Write("</td>")
        Next


        context.Response.Write(vbLf)
        context.Response.Write(vbTab + "</tr>")
        context.Response.Write(vbLf)

        Dim idCese As String = ""
        Dim Fila As Integer = 0
        For Each dr As DataRow In dtCeses.Rows

            If idCese = dr(1).ToString().Trim() Then
                Continue For
            End If

            idCese = dr(1).ToString().Trim()
            Fila = Fila + 1

            context.Response.Write(vbTab + "<tr>")
            context.Response.Write(vbLf + vbTab + vbTab)

            'fila de ceses
            For i = 0 To 6
                context.Response.Write("<td style='background-color: #92D050;'>")
                If i = 0 Then
                    context.Response.Write(Fila.ToString())
                Else
                    context.Response.Write(dr(i).ToString().Trim())
                End If

                context.Response.Write("</td>")
            Next


            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)

            'Detalles
            Dim drFilas2() As DataRow
            drFilas2 = dtCeses.Select("Código = '" & dr(1).ToString() & "'")
            If drFilas2.Length > 0 Then

                'Cabecera detalle
                context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
                context.Response.Write(vbLf + vbTab + vbTab)
                context.Response.Write("<td style='border-bottom: none; font-weight:bolder; font-style:italic; background-color: #C6E0B4;'>  Detalles</td>")
                For j = 7 To dtCeses.Columns.Count - 1

                    If j = 11 Then 'si es estado final se hace un merge de columnas
                        context.Response.Write("<td colspan='2' style='background-color: #9BC2E6;'>")
                    Else
                        context.Response.Write("<td style='background-color: #9BC2E6;'>")
                    End If


                    context.Response.Write(dtCeses.Columns(j).ColumnName.ToString())
                    context.Response.Write("</td>")
                Next
                context.Response.Write(vbLf)
                context.Response.Write(vbTab + "</tr>")
                context.Response.Write(vbLf)

                'Detalles fila
                For Each drDet As DataRow In drFilas2
                    context.Response.Write(vbTab + "<tr>")
                    context.Response.Write(vbLf + vbTab + vbTab)
                    context.Response.Write("<td style='border: none; background-color: #C6E0B4;'></td>")

                    For j = 7 To dtCeses.Columns.Count - 1
                        If j = 11 Then 'si es estado final se hace un merge de columnas
                            context.Response.Write("<td colspan='2' style='background-color: #CCE2F4;'>")
                        Else
                            context.Response.Write("<td style='background-color: #CCE2F4;'>")
                        End If

                        context.Response.Write(drDet(j).ToString().Trim())
                        context.Response.Write("</td>")
                    Next
                    context.Response.Write(vbLf)
                    context.Response.Write(vbTab + "</tr>")
                    context.Response.Write(vbLf)

                Next
            End If
        Next

        'Fila de Totales
        'context.Response.Write(vbTab + "<tr>")
        'context.Response.Write(vbLf + vbTab + vbTab)
        'context.Response.Write("<td colspan='9' style='background-color: #43CFEB; font-weight:bolder; text-align:center;'>COSTO TOTAL DE EQUIPO Y PLAN</td>")
        '
        '
        'context.Response.Write(vbLf)
        'context.Response.Write(vbTab + "</tr>")
        'context.Response.Write(vbLf)

        context.Response.Write("</table>")
        context.Response.End()
    End Sub

    Function ObtenerColumnas(ByVal dtDetalle As DataTable, ByVal vcTipo As String) As DataTable

        Dim dtCampos As New DataTable
        dtCampos.Columns.Add("vcNombre")

        Select Case (vcTipo)
            Case "Pedidos"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "IdCampana"
                            dtCampos.Rows.Add("IdCampana")
                        Case "IdEmpleado"
                            dtCampos.Rows.Add("IdEmpleado")
                        Case "NumeroPedido"
                            dtCampos.Rows.Add("Código de Pedido")
                        Case "vcNomEmp"
                            dtCampos.Rows.Add("Empleado")
                        Case "vcNomOrg"
                            dtCampos.Rows.Add("Área")
                        Case "vcOficina"
                            dtCampos.Rows.Add("Oficina")
                        Case "vcNomCCO"
                            dtCampos.Rows.Add("Centro de Costo")
                        Case "NumeroItems"
                            dtCampos.Rows.Add("Número de Ítems")
                        Case "FechaPedido"
                            dtCampos.Rows.Add("Fecha de Pedido")
                        Case "vcNomEst"
                            dtCampos.Rows.Add("Estado")
                        Case "MontoTotalNoServicios"
                            dtCampos.Rows.Add("Costo Total Equipo")
                        Case "MontoTotalServicios"
                            dtCampos.Rows.Add("Costo Total Plan")
                    End Select
                Next
            Case "Detalles"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdDetallePedido"
                            dtCampos.Rows.Add("IdDetallePedido")
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "Situacion"
                            dtCampos.Rows.Add("Situación")
                        Case "NomMod"
                            dtCampos.Rows.Add("Modelo")
                        Case "NomPlan"
                            dtCampos.Rows.Add("Plan")
                        Case "MontoTotalNoServicios"
                            dtCampos.Rows.Add("Costo Total Equipo")
                        Case "MontoTotalServicios"
                            dtCampos.Rows.Add("Costo Total Plan")
                        Case "vcCodCue"
                            dtCampos.Rows.Add("Código Cuenta")
                        Case "vcNomCue"
                            dtCampos.Rows.Add("Cuenta")
                        Case "MesesContrato"
                            dtCampos.Rows.Add("Meses de Contrato")
                        Case "DespachoLinea"
                            dtCampos.Rows.Add("Línea")
                        Case "Corte"
                            dtCampos.Rows.Add("Corte")
                    End Select
                Next
            Case "PedidosSeg"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "IdUsuario"
                            dtCampos.Rows.Add("IdUsuario")
                        Case "IdEstado"
                            dtCampos.Rows.Add("IdEstado")
                        Case "vcNomUsu"
                            dtCampos.Rows.Add("Usuario")
                        Case "vcNomEst"
                            dtCampos.Rows.Add("Estado")
                        Case "FechaInicio"
                            dtCampos.Rows.Add("Fecha Inicio")
                        Case "FechaFin"
                            dtCampos.Rows.Add("FechaFin")
                        Case "Comentario"
                            dtCampos.Rows.Add("Comentario")
                    End Select
                Next
            Case "DetallesSeg"
                For i = 0 To dtDetalle.Columns.Count - 1
                    Select Case (dtDetalle.Columns(i).ColumnName)
                        Case "IdDetallePedido"
                            dtCampos.Rows.Add("IdDetallePedido")
                        Case "IdPedido"
                            dtCampos.Rows.Add("IdPedido")
                        Case "IdUsuario"
                            dtCampos.Rows.Add("IdUsuario")
                        Case "IdEstado"
                            dtCampos.Rows.Add("IdEstado")
                        Case "vcNomUsu"
                            dtCampos.Rows.Add("Usuario")
                        Case "vcNomEst"
                            dtCampos.Rows.Add("Estado")
                        Case "FechaInicio"
                            dtCampos.Rows.Add("Fecha Inicio")
                        Case "FechaFin"
                            dtCampos.Rows.Add("FechaFin")
                        Case "Comentario"
                            dtCampos.Rows.Add("Comentario")
                    End Select
                Next
        End Select

        Return dtCampos

    End Function
End Class
