Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE
Imports Utilitario
Imports UtilitarioWeb

Public Class Con_ReporteExceso
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    If Request.QueryString("eeg") Is Nothing Then
                        Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                        Operador.Dispose()
                        UtilitarioWeb.Dataddl(ddlAsignacionCredito, Cuenta.Listar_TipoAsignacionCredito(-1, "<Seleccionar>"), "vcNom", "P_inCod")
                        Cuenta.Dispose()
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
            If Not IsNothing(Operador) Then Operador.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String, ByVal inTipoAsignacion As Integer) As List(Of ENT_MOV_Cuenta)
        Dim newResult As List(Of ENT_MOV_Cuenta)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(Convert.ToInt32(inCodOpe))
            newResult = (From c In _return Where c.TipoAsignacionCredito.P_inCod = inTipoAsignacion).ToList()
            Return newResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
        End Try
    End Function


    Protected Sub eegLlamada_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegLlamada.ObtenerDatosAExportar
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Dim data As DataTable
        Try
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim pvcperiodo As String, pvcoperador As String, pvccuenta_plan As String, pintcodasigcred As String, pintidtiposervicio As String
            pvcperiodo = HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto").ToString().Split("|")(0) 'hdfPeriodo.Value
            pvcoperador = HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto").ToString().Split("|")(1) 'hdfCodigoOperador.Value
            pvccuenta_plan = HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto").ToString().Split("|")(2) 'hdfCodigoCuenta_Plan.Value
            pintcodasigcred = HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto").ToString().Split("|")(3) 'hdfAsignacionCredito.Value
            pintidtiposervicio = HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto").ToString().Split("|")(4) 'hdfTipoServicio.Value

            If pintcodasigcred = 2 Then
                data = Llamada.ObtenerListaReporteExceso_X_Minuto_To_Export(pvcperiodo, Convert.ToInt32(pvcoperador), pvccuenta_plan, Convert.ToInt32(pintcodasigcred), Convert.ToInt32(pintidtiposervicio), oCultura, True)
                eegLlamada.ExportarDatos(data, "ReporteExceso")
            End If
            If pintcodasigcred = 1 Then
                data = Llamada.ObtenerLista_Planes_ReporteExceso_X_Minuto(pvcperiodo, Convert.ToInt32(pvcoperador), "", Convert.ToInt32(pintcodasigcred), Convert.ToInt32(pintidtiposervicio), oCultura)
                'data = Llamada.Obtener_Listado_ReporteExceso_To_Export(pvcperiodo, Convert.ToInt32(pvcoperador), "", Convert.ToInt32(pintcodasigcred), Convert.ToInt32(pintidtiposervicio), oCultura)
                ExportarListaDetalle_Planes_ReporteExceso_ToMinuto(data, pvcperiodo, Convert.ToInt32(pvcoperador), Convert.ToInt32(pintcodasigcred), Convert.ToInt32(pintidtiposervicio), oCultura, True)
            End If
        Catch ex As Exception
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub



    Public Sub ExportarListaDetalle_Planes_ReporteExceso_ToMinuto(ByVal dtCabecera As DataTable, ByVal pvcPeriodo As String, ByVal pvcOperador As String, _
                                                                  ByVal pintCodAsigCred As String, ByVal pintIdTipoServicio As String, ByVal oCultura As ENT_GEN_Cultura, ByVal blRenameColumn As Boolean)
        Dim inTotMonNoSer As Integer = 0
        Dim inTotMonSer As Integer = 0
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Dim dtDetalles As DataTable
        'Dim strForNum = DevuelveFormatoNumero(oCultura)
        Dim strForNum = FormatoNumero(oCultura)
        Try

            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim attachment As String = "attachment; filename=" & "ReporteExceso" & ".xls"

            Dim context As HttpContext = HttpContext.Current

            context.Response.ClearContent()
            context.Response.AddHeader("content-disposition", attachment)
            context.Response.ContentType = "application/vnd.ms-excel"

            context.Response.ContentEncoding = Encoding.Default
            context.Response.Write("<style> TD { mso-number-format:\@; } </style>")

            context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + "RepExceso_ToMinuto" + "' style='border-collapse:collapse;'>")
            context.Response.Write(vbLf)

            context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
            context.Response.Write(vbLf + vbTab + vbTab)

            RenombrarColumnas(dtCabecera)

            For i = 0 To dtCabecera.Columns.Count - 1
                If dtCabecera.Columns(i).ColumnName = "Operador" OrElse dtCabecera.Columns(i).ColumnName = "Plan" Then
                    context.Response.Write("<td colspan='2' style='background-color: #C6E0BD; text-align:left;'>")
                Else
                    context.Response.Write("<td style='background-color: #C6E0BD;'>")
                End If
                context.Response.Write(dtCabecera.Columns(i).ColumnName.ToString())
                context.Response.Write("</td>")
            Next
            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)

            For Each dr As DataRow In dtCabecera.Rows
                context.Response.Write(vbTab + "<tr>")
                context.Response.Write(vbLf + vbTab + vbTab)
                For i = 0 To dtCabecera.Columns.Count - 1
                    If dtCabecera.Columns(i).ColumnName = "Operador" OrElse dtCabecera.Columns(i).ColumnName = "Plan" Then
                        context.Response.Write("<td colspan='2' style='background-color: #9BC2E6; text-align:left;'>")
                    ElseIf (dtCabecera.Columns(i).ColumnName = "Min. Contratado" OrElse dtCabecera.Columns(i).ColumnName = "Líneas Asignadas" OrElse dtCabecera.Columns(i).ColumnName = "Consumo Dentro P." OrElse dtCabecera.Columns(i).ColumnName = "Consumo Dentro F.") Then
                        context.Response.Write("<td style='background-color: #9BC2E6; text-align:right;'>")
                    Else
                        context.Response.Write("<td style='background-color: #9BC2E6;'>")
                    End If

                    If dtCabecera.Columns(i).ColumnName = "Min. Contratado" Then
                        If Convert.ToDecimal(dr(i).ToString().Trim()) > 0 Then
                            context.Response.Write(Convert.ToDecimal(dr(i).ToString().Trim()).ToString(strForNum))
                        Else
                            context.Response.Write("Ilimitado")
                        End If
                    Else
                        context.Response.Write(dr(i).ToString().Trim())
                    End If
                    context.Response.Write("</td>")
                Next
                context.Response.Write(vbLf)
                context.Response.Write(vbTab + "</tr>")
                context.Response.Write(vbLf)

                'Detalles
                'dtDetalles = Llamada.Obtener_Listado_ReporteExceso_To_Export(pvcPeriodo, Convert.ToInt32(pvcOperador), dr("IdPlan").ToString(), Convert.ToInt32(pintCodAsigCred), Convert.ToInt32(pintIdTipoServicio), oCultura, True)
                dtDetalles = Llamada.ObtenerListaReporteExceso_X_Minuto_To_Export(pvcPeriodo, Convert.ToInt32(pvcOperador), dr("IdPlan").ToString(), Convert.ToInt32(pintCodAsigCred), Convert.ToInt32(pintIdTipoServicio), oCultura, True)
                If dtDetalles.Rows.Count > 0 Then
                    RenombrarColumnas(dtDetalles)
                    'Columnas
                    context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
                    context.Response.Write(vbLf + vbTab + vbTab)
                    context.Response.Write("<td rowspan='" + (dtDetalles.Rows.Count + 1).ToString() + "' style='border-bottom: none; font-weight:bolder; font-style:italic; background-color: white; vertical-align: middle;'>  Detalles</td>")
                    For i = 0 To dtDetalles.Columns.Count - 1
                        If dtDetalles.Columns(i).ColumnName = "Equipo" OrElse dtDetalles.Columns(i).ColumnName = "Empleado" Then
                            context.Response.Write("<td colspan='2' style='background-color: #BFBFBF; text-align:left;'>")
                        Else
                            context.Response.Write("<td style='background-color: #BFBFBF;'>")
                        End If
                        context.Response.Write(dtDetalles.Columns(i).ColumnName.ToString())
                        context.Response.Write("</td>")
                    Next
                    context.Response.Write(vbLf)
                    context.Response.Write(vbTab + "</tr>")
                    context.Response.Write(vbLf)

                    ''Filas
                    For d = 0 To dtDetalles.Rows.Count - 1
                        context.Response.Write(vbTab + "<tr>")
                        context.Response.Write(vbLf + vbTab + vbTab)
                        'context.Response.Write("<td style='border-bottom: none; font-weight:bolder; background-color: white;'></td>")

                        For x = 0 To dtDetalles.Columns.Count - 1
                            If dtDetalles.Columns(x).ColumnName = "Equipo" OrElse dtDetalles.Columns(x).ColumnName = "Empleado" Then
                                context.Response.Write("<td colspan='2' style='background-color: white; text-align:left;'>")

                                context.Response.Write(dtDetalles.Rows(d)(x).ToString().Trim())

                                context.Response.Write("</td>")
                            ElseIf dtDetalles.Columns(x).ColumnName = "Min. Consumidos" OrElse dtDetalles.Columns(x).ColumnName = "Min. Excedidos" Then
                                context.Response.Write("<td style='background-color: white; text-align:right;'>")

                                context.Response.Write(Convert.ToDecimal(Convert.ToDouble(dtDetalles.Rows(d)(x).ToString().Trim()) / 60).ToString(strForNum))

                                context.Response.Write("</td>")
                            ElseIf dtDetalles.Columns(x).ColumnName = "Min. Asignados" Then
                                context.Response.Write("<td style='background-color: white; text-align:right;'>")
                                If Convert.ToDouble(dtDetalles.Rows(d)(x).ToString().Trim()) > 0 Then
                                    context.Response.Write(Convert.ToDecimal(Convert.ToDouble(dtDetalles.Rows(d)(x).ToString().Trim())).ToString(strForNum))
                                Else
                                    context.Response.Write("Ilimitado")
                                End If
                                context.Response.Write("</td>")
                            Else
                                context.Response.Write("<td style='background-color: white;'>")

                                context.Response.Write(dtDetalles.Rows(d)(x).ToString().Trim())

                                context.Response.Write("</td>")
                            End If
                        Next
                    Next
                End If
            Next

            'Fila de Totales
            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)

            context.Response.Write("</table>")
            context.Response.End()
        Catch ex As Exception

        End Try
    End Sub

    Private Function RenombrarColumnas(ByVal prData As DataTable) As DataTable
        Try

            Dim contador As Integer = 0
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "CodPlan"
                        prData.Columns(index - contador).ColumnName = "IdPlan"
                        Continue For

                    Case "CodCia"
                        prData.Columns(index - contador).ColumnName = "Código Operador"
                        Continue For

                    Case "NomCia"
                        prData.Columns(index - contador).ColumnName = "Operador"
                        Continue For


                    Case "Plan"
                        prData.Columns(index - contador).ColumnName = "Plan"
                        Continue For

                    Case "dcContratado"
                        prData.Columns(index - contador).ColumnName = "Min. Contratado"
                        Continue For

                    Case "LineasAsignadas"
                        prData.Columns(index - contador).ColumnName = "Líneas Asignadas"
                        Continue For

                    Case "Dentro_Plan"
                        prData.Columns(index - contador).ColumnName = "Consumo Dentro Plan"
                        Continue For

                    Case "Fuera_Plan"
                        prData.Columns(index - contador).ColumnName = "Consumo Fuera Plan"
                        Continue For

                    Case "Estado"
                        prData.Columns(index - contador).ColumnName = "Estado Línea"
                        Continue For
                End Select
            Next

        Catch ex As Exception

        End Try
        Return prData
    End Function

    Private Function FormatoNumero(ByVal oCultura As ENT_GEN_Cultura) As String
        ActualizarCultura(oCultura)
        Dim strFormato As String = String.Empty
        strFormato = "###,##0." '"###,##0."
        For i As Integer = 0 To oCultura.dcNumDec - 1
            strFormato = strFormato + "0"
        Next
        Return strFormato
    End Function

End Class