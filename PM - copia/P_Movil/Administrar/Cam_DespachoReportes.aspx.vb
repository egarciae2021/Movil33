Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports System.Data.SqlClient
Imports System.IO
Imports System.Data
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Cam_DespachoReportes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            If Not IsPostBack Then
                Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim lstCampana As New List(Of MOV_CAM_Campana)
                lstCampana = Campana.Listar(-1, "<Seleccionar>")
                lstCampana.RemoveAt(0)
                Dim vcIdCampana As String = "-1"

                If lstCampana.Find(Function(c) c.btActivo = True) IsNot Nothing Then
                    vcIdCampana = lstCampana.Find(Function(c) c.btActivo = True).IdCampana.ToString()
                End If

                'Debe de estar debajo del find porque sino se cae cuando no hay data
                lstCampana.Insert(0, New MOV_CAM_Campana() With {.IdCampana = -1, .Descripcion = "<Seleccionar>"})
                UtilitarioWeb.Dataddl(ddlCampana, lstCampana, "Descripcion", "IdCampana")
                ddlCampana.SelectedValue = vcIdCampana

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Sub

    '<WebMethod()>
    'Public Shared Function ExportarExcel(IdCampana As Integer, TipoExportacion As Integer, Datos As String) As String
    '    Dim CargaStock As New CargaStockOperador()
    '    'Dim xApp As New Excel.Application()
    '    Dim rutaarchivo As String = ""
    '    Try
    '        Dim NombreArchivo As String = ""

    '        Select Case TipoExportacion
    '            Case 1 'Pedidos por Despachar
    '                NombreArchivo = "ReportePorDespachar"
    '            Case 2 'Pedidos Despachados
    '                NombreArchivo = "ReporteDespachado"
    '            Case 3 'Pedidos por Oficina
    '                NombreArchivo = "ReportePorOficina"
    '            Case Else
    '        End Select

    '        Dim ubicacion As String = HttpContext.Current.Server.MapPath("~")
    '        rutaarchivo = "\General\Administrar\Proceso\Archivos\" & NombreArchivo & ".xlsx"
    '        Dim ruta As String = ubicacion & rutaarchivo
    '        Dim wBook As Excel.Workbook
    '        Dim wSheet As Excel.Worksheet
    '        Dim filacab As Integer = 2

    '        wBook = xApp.Workbooks.Add()
    '        wSheet = wBook.Worksheets.Add()
    '        wSheet.Name = "Hoja2" 'lstPlantilla.ElementAt(0).NombreHoja
    '        wSheet.Activate()
    '        wSheet.Range("C1:H1").MergeCells = True

    '        Select Case TipoExportacion
    '            Case 1 'Pedidos por Despachar
    '                wSheet.Range("C1:H1").Value = "Reporte de Pedidos por Despachar"
    '            Case 2 'Pedidos Despachados
    '                wSheet.Range("C1:H1").Value = "Reporte de Pedidos Despachados"
    '            Case 3 'Pedidos por Oficina
    '                wSheet.Range("C1:H1").Value = "Reporte de Pedidos por Oficina"
    '            Case Else
    '        End Select

    '        wSheet.Range("C1:H1").HorizontalAlignment = Excel.XlVAlign.xlVAlignCenter
    '        wSheet.Range("C1:H1").VerticalAlignment = Excel.XlVAlign.xlVAlignCenter
    '        wSheet.Range("C1:H1").Font.FontStyle = "Arial"
    '        wSheet.Range("C1:H1").Font.Bold = True
    '        wSheet.Range("C1:H1").Font.Size = 24

    '        Dim cabecera1 As String() = {"Oficina", "Colaborador", "CodigoPedido", "NumeroPedido", "NumeroItem", "MontoTotalNoServicios", "MontoTotalServicios", "Situacion", "Estado", "FechaPedido", "FechaRecojo", "FechaDespacho", "Linea", "Equipo", "MontoEquipo", "Plan", "MontoPlan", "IMEI", "RPM", "MesesContrato"}
    '        Dim cabecera2 As String() = {"Oficina", "Colaborador", "CodigoPedido", "NumeroPedido", "NumeroItem", "MontoTotalNoServicios", "MontoTotalServicios", "Situacion", "Estado", "FechaPedido", "FechaRecojo", "FechaDespacho", "Linea", "Equipo", "MontoEquipo", "Plan", "MontoPlan", "IMEI", "RPM", "MesesContrato"}
    '        Dim cabecera As String()

    '        Select Case TipoExportacion
    '            Case 1 'Pedidos por Despachar
    '                cabecera = cabecera1
    '            Case 2 'Pedidos Despachados
    '                cabecera = cabecera1
    '            Case 3 'Pedidos por Oficina
    '                cabecera = cabecera2
    '            Case Else
    '        End Select

    '        For i As Integer = 0 To cabecera.Length - 1
    '            wSheet.Cells(filacab, i + 1).Value = cabecera(i)
    '            wSheet.Cells(filacab, i + 1).ColumnWidth = 20
    '            wSheet.Cells(filacab, i + 1).Borders.LineStyle = Excel.XlLineStyle.xlContinuous
    '            wSheet.Cells(filacab, i + 1).Font.FontStyle = "Arial"
    '            wSheet.Cells(filacab, i + 1).Font.Size = 12
    '        Next

    '        Dim filadata As Integer = filacab + 1
    '        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = BL_MOV_CAM_CampanaDespacho.Instance(0)
    '        Dim ds As New DataSet

    '        Select Case TipoExportacion
    '            Case 1 'Pedidos por Despachar
    '                ds = CampanaDespacho.ListarPorDespacharDespachadoPorModelo(IdCampana, False, Datos)
    '            Case 2 'Pedidos Despachados
    '                ds = CampanaDespacho.ListarPorDespacharDespachadoPorModelo(IdCampana, True, Datos)
    '            Case 3 'Pedidos por Oficina
    '                ds = CampanaDespacho.ListarADespacharAgrupadoPorOficina(IdCampana, Datos)
    '            Case Else
    '        End Select

    '        For Each dr As DataRow In ds.Tables(0).Rows
    '            For j As Integer = 0 To cabecera.Length - 1
    '                wSheet.Cells(filadata, j + 1).Value = dr(cabecera(j)).ToString()
    '                wSheet.Cells(filadata, j + 1).ColumnWidth = 20
    '                wSheet.Cells(filadata, j + 1).Borders.LineStyle = Excel.XlLineStyle.xlContinuous
    '                wSheet.Cells(filadata, j + 1).Font.FontStyle = "Arial"
    '                wSheet.Cells(filadata, j + 1).Font.Size = 12
    '            Next
    '            filadata += 1
    '        Next

    '        If File.Exists(ruta) Then
    '            File.Delete(ruta)
    '        End If

    '        wBook.SaveAs(ruta)
    '        xApp.Quit()
    '        xApp = Nothing
    '        System.GC.Collect()
    '        Return rutaarchivo

    '        'Dim xApp As New Excel.Application()
    '        'Dim rutaarchivo As String = ""
    '        'Try
    '        '    Dim cadena As String = String.Empty
    '        '    Dim Plantilla As BL_PCS_IMP_Plantilla = BL_PCS_IMP_Plantilla.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        '    Dim lstPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Entidad(IdEntidad)

    '        '    Dim Campo As BL_PCS_IMP_Campo = BL_PCS_IMP_Campo.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        '    If lstPlantilla.Count <> 0 Then

    '        '        Dim ubicacion As String = HttpContext.Current.Server.MapPath("~")
    '        '        rutaarchivo = "\General\Administrar\Proceso\Archivos\" & "DataExportacion_" & lstPlantilla.ElementAt(0).vcDes.ToString() & ".xlsx"
    '        '        Dim ruta As String = ubicacion & rutaarchivo
    '        '        Dim wBook As Excel.Workbook
    '        '        Dim wSheet As Excel.Worksheet
    '        '        Dim eCampo As New ENT_PCS_IMP_Campo
    '        '        eCampo.IdPlantilla = lstPlantilla.ElementAt(0).IdPlantilla
    '        '        Dim lstCampo As List(Of ENT_PCS_IMP_Campo) = Campo.Listar_x_Plantilla_Uso(eCampo)


    '        '        Dim lstTablas As New List(Of ENT_PCS_IMP_Campo)
    '        '        Dim filacab As Integer = lstPlantilla.ElementAt(0).PosicionFila - 1

    '        '        If lstPlantilla.ElementAt(0).NombreHoja <> "" Then

    '        '            Dim _Campo1 = (From c In lstCampo
    '        '                           Select c.Identificador, c.Tabla).Distinct().ToList()

    '        '            For s = 0 To _Campo1.Count - 1
    '        '                Dim _Campo As New ENT_PCS_IMP_Campo
    '        '                _Campo.Identificador = lstPlantilla.ElementAt(0).NombreHoja
    '        '                _Campo.Tabla = _Campo1.ElementAt(s).Tabla
    '        '                lstTablas.Add(_Campo)
    '        '            Next
    '        '        Else

    '        '            Dim _Campo2 = (From c In lstCampo
    '        '                             Select c.Identificador, c.Tabla).Distinct().ToList()

    '        '            For s = 0 To _Campo2.Count - 1
    '        '                Dim _Campo As New ENT_PCS_IMP_Campo
    '        '                _Campo.Identificador = _Campo2.ElementAt(s).Identificador
    '        '                _Campo.Tabla = _Campo2.ElementAt(s).Tabla
    '        '                lstTablas.Add(_Campo)
    '        '            Next
    '        '        End If

    '        '        wBook = xApp.Workbooks.Add()

    '        '        If lstPlantilla.ElementAt(0).NombreHoja <> "" Then
    '        '            wSheet = wBook.Worksheets.Add()
    '        '            wSheet.Name = lstPlantilla.ElementAt(0).NombreHoja
    '        '            wSheet.Activate()
    '        '        End If

    '        '        For x As Integer = 0 To lstTablas.Count - 1

    '        '            If lstPlantilla.ElementAt(0).NombreHoja = "" Then
    '        '                wSheet = wBook.Worksheets.Add()
    '        '                wSheet.Name = lstTablas.ElementAt(x).Identificador
    '        '                wSheet.Activate()
    '        '            End If

    '        '            If lstPlantilla.ElementAt(0).PosicionFila > 1 Then
    '        '                wSheet.Range("C1:H1").MergeCells = True
    '        '                wSheet.Range("C1:H1").Value = "Plantilla Entidad " & lstPlantilla.ElementAt(0).vcDes.ToString()
    '        '                wSheet.Range("C1:H1").HorizontalAlignment = Excel.XlVAlign.xlVAlignCenter
    '        '                wSheet.Range("C1:H1").VerticalAlignment = Excel.XlVAlign.xlVAlignCenter
    '        '                wSheet.Range("C1:H1").Font.FontStyle = "Arial"
    '        '                wSheet.Range("C1:H1").Font.Bold = True
    '        '                wSheet.Range("C1:H1").Font.Size = 24
    '        '            End If

    '        '            Dim _lstCampo = (From c In lstCampo
    '        '                             Where c.Tabla = lstTablas.ElementAt(x).Tabla
    '        '                             Select c).ToList()

    '        '            cadena += "select "

    '        '            For i = 0 To _lstCampo.Count - 1
    '        '                If Not (_lstCampo.ElementAt(i).Tipo = "image") Then
    '        '                    wSheet.Cells(filacab, _lstCampo.ElementAt(i).PosicionColumna).Value = _lstCampo.ElementAt(i).DescripcionCampo.ToString()
    '        '                    wSheet.Cells(filacab, _lstCampo.ElementAt(i).PosicionColumna).ColumnWidth = 20
    '        '                    wSheet.Cells(filacab, _lstCampo.ElementAt(i).PosicionColumna).Borders.LineStyle = Excel.XlLineStyle.xlContinuous
    '        '                    wSheet.Cells(filacab, _lstCampo.ElementAt(i).PosicionColumna).Font.FontStyle = "Arial"
    '        '                    wSheet.Cells(filacab, _lstCampo.ElementAt(i).PosicionColumna).Font.Size = 12
    '        '                    cadena += _lstCampo.ElementAt(i).NombreCampo.ToString() & ","
    '        '                End If
    '        '            Next

    '        '            cadena = cadena.Substring(0, cadena.Length - 1)
    '        '            cadena += " from  " & lstTablas.ElementAt(x).Tabla

    '        '            If TipoExportacion = 0 Then
    '        '                If ExportacionConData = 1 Then
    '        '                    Dim Parametros As BL_ConsultaParametros = BL_ConsultaParametros.Instance(0)
    '        '                    Dim valor As String = Parametros.ConsultaString("select vcNom from ENT_Campo where vcTab = '" & lstTablas.ElementAt(x).Tabla & "' and btEliLog = 1")
    '        '                    If valor <> "" Then
    '        '                        cadena += "  where " & valor & " = 1"
    '        '                    End If
    '        '                End If

    '        '                Dim dr As SqlDataReader = Plantilla.Obtener_Data_x_Tabla(cadena)

    '        '                Dim filadata As Integer = lstPlantilla.ElementAt(0).PosicionFila

    '        '                If dr.HasRows Then
    '        '                    While dr.Read()
    '        '                        For j = 0 To _lstCampo.Count - 1
    '        '                            If Not (_lstCampo.ElementAt(j).Tipo = "Imagen") Then
    '        '                                wSheet.Cells(filadata, _lstCampo.ElementAt(j).PosicionColumna).Value = dr.GetValue(dr.GetOrdinal(_lstCampo.ElementAt(j).NombreCampo.ToString()))
    '        '                                wSheet.Cells(filadata, _lstCampo.ElementAt(j).PosicionColumna).ColumnWidth = 20
    '        '                                wSheet.Cells(filadata, _lstCampo.ElementAt(j).PosicionColumna).Borders.LineStyle = Excel.XlLineStyle.xlContinuous
    '        '                                wSheet.Cells(filadata, _lstCampo.ElementAt(j).PosicionColumna).Font.FontStyle = "Arial"
    '        '                                wSheet.Cells(filadata, _lstCampo.ElementAt(j).PosicionColumna).Font.Size = 12
    '        '                            End If
    '        '                        Next
    '        '                        filadata += 1
    '        '                    End While
    '        '                End If

    '        '                dr.Close()

    '        '            End If
    '        '            cadena = String.Empty
    '        '        Next


    '        '        If lstPlantilla.ElementAt(0).NombreHoja <> "" Then
    '        '            CType(xApp.ActiveWorkbook.Sheets(2), Excel.Worksheet).Delete()
    '        '        Else
    '        '            CType(xApp.ActiveWorkbook.Sheets(lstTablas.Count + 1), Excel.Worksheet).Delete()
    '        '        End If

    '        '        If File.Exists(ruta) Then
    '        '            File.Delete(ruta)
    '        '        End If

    '        '        wBook.SaveAs(ruta)
    '        '        xApp.Quit()
    '        '        xApp = Nothing
    '        '        System.GC.Collect()
    '        '        Return ruta
    '        '    Else
    '        '        Return ""
    '        '    End If
    '    Catch ex As Exception
    'Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Sub CargarValores(IdCampana As Integer, TipoExportacion As Integer, Datos As String)
        HttpContext.Current.Session("IdCampanaDespachoReporte") = IdCampana
        HttpContext.Current.Session("TipoExportacionDespachoReporte") = TipoExportacion
        HttpContext.Current.Session("DatosDespachoReporte") = Datos
    End Sub

    Private Sub eegReporte_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegReporte.ObtenerDatosAExportar
        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = Nothing

        Try
            CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(0)
            Dim IdCampana As Integer = HttpContext.Current.Session("IdCampanaDespachoReporte")
            Dim TipoExportacion As Integer = HttpContext.Current.Session("TipoExportacionDespachoReporte")
            Dim Datos As String = HttpContext.Current.Session("DatosDespachoReporte").ToString()
            Dim NombreHoja As String = ""
            Dim ds As New DataSet
            Dim cabecera1 As New List(Of ENT_ENT_Campo)
            Dim cabecera2 As New List(Of ENT_ENT_Campo)
            Dim cabecera As New List(Of ENT_ENT_Campo)

            Select Case TipoExportacion
                Case 1 'Pedidos por Despachar
                    NombreHoja = "Por Despachar"
                Case 2 'Pedidos Despachados
                    NombreHoja = "Despachado"
                Case 3 'Pedidos por Oficina
                    NombreHoja = "Por Oficina"
                Case 4 'Pedidos Despachados Con Minutos Adicionales
                    NombreHoja = "Despachado(Minutos Adicionales)"
                Case Else
            End Select

            Select Case TipoExportacion
                Case 1 'Pedidos por Despachar
                    ds = CampanaDespacho.ListarPorDespacharDespachadoPorModelo(IdCampana, False, Datos, False)
                Case 2 'Pedidos Despachados
                    ds = CampanaDespacho.ListarPorDespacharDespachadoPorModelo(IdCampana, True, Datos, False)
                Case 3 'Pedidos por Oficina
                    ds = CampanaDespacho.ListarADespacharAgrupadoPorOficina(IdCampana, Datos)
                Case 4 'Pedidos Despachados Con Minutos Adicionales
                    ds = CampanaDespacho.ListarPorDespacharDespachadoPorModelo(IdCampana, True, Datos, True)

                Case Else
            End Select

            cabecera1.Add(New ENT_ENT_Campo("CodigoOficina", "Cód. Oficina", "CodigoOficina", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Oficina", "Oficina", "Oficina", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Registro", "Registro", "Registro", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Colaborador", "Colaborador", "Colaborador", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("IdEmpleado", "Cód. Empleado", "IdEmpleado", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("CodigoPedido", "Cód. Pedido", "CodigoPedido", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("NumeroPedido", "Nro Pedido", "NumeroPedido", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("NumeroItem", "Nro Ítem", "NumeroItem", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("MontoTotalNoServicios", "Monto Total No Servicios", "MontoTotalNoServicios", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("MontoTotalServicios", "Monto Total Servicios", "MontoTotalServicios", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Situacion", "Situación", "Situacion", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Estado", "Estado", "Estado", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("FechaPedido", "Fec. Pedido", "FechaPedido", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("FechaRecojo", "Fec. Recojo", "FechaRecojo", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("FechaDespacho", "Fecha Despacho", "FechaDespacho", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Linea", "Línea", "Linea", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Equipo", "Equipo", "Equipo", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("MontoEquipo", "Monto de Equipo", "MontoEquipo", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("Plan", "Plan", "Plan", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("MontoPlan", "Monto de Plan", "MontoPlan", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("IMEI", "IMEI", "IMEI", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("RPM", "RPM", "RPM", 1, 1))
            cabecera1.Add(New ENT_ENT_Campo("MesesContrato", "Meses de Contrato", "MesesContrato", 1, 1))

            cabecera2.Add(New ENT_ENT_Campo("CodigoOficina", "Cód. Oficina", "CodigoOficina", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("Oficina", "Oficina", "Oficina", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("Colaborador", "Colaborador", "Colaborador", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("CodigoPedido", "Cód. Pedido", "CodigoPedido", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("NumeroPedido", "Nro Pedido", "NumeroPedido", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("NumeroItem", "Nro Ítem", "NumeroItem", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("MontoTotalNoServicios", "Monto Total No Servicios", "MontoTotalNoServicios", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("MontoTotalServicios", "Monto Total Servicios", "MontoTotalServicios", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("Situacion", "Situación", "Situacion", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("Estado", "Estado", "Estado", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("FechaPedido", "Fec. Pedido", "FechaPedido", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("FechaRecojo", "Fec. Recojo", "FechaRecojo", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("FechaDespacho", "Fecha Despacho", "FechaDespacho", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("Linea", "Línea", "Linea", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("Equipo", "Equipo", "Equipo", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("MontoEquipo", "Monto de Equipo", "MontoEquipo", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("Plan", "Plan", "Plan", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("MontoPlan", "Monto de Plan", "MontoPlan", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("IMEI", "IMEI", "IMEI", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("RPM", "RPM", "RPM", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("MesesContrato", "Meses de Contrato", "MesesContrato", 1, 1))
            cabecera2.Add(New ENT_ENT_Campo("IdEmpleado", "IdEmpleado", "IdEmpleado", 1, 0))

            Select Case TipoExportacion
                Case 1 'Pedidos por Despachar
                    cabecera = cabecera1
                Case 2 'Pedidos Despachados
                    cabecera = cabecera1
                Case 3 'Pedidos por Oficina
                    cabecera = cabecera2
                Case 4
                    cabecera = cabecera1
                Case Else
            End Select

            eegReporte.ExportarDatos(ds.Tables(0), NombreHoja, cabecera)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaDespacho IsNot Nothing Then
                CampanaDespacho.Dispose()
            End If
        End Try
    End Sub
End Class