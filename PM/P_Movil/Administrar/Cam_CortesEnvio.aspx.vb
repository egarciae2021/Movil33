Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports CompCorreo
Imports System.Data
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports System.Data.SqlClient

Partial Class P_Movil_Administrar_Cam_CortesEnvio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                btnEnviar.Style("display") = "none"
                hdfIdCorte.Value = Request.QueryString("IdCorte")
                hdfRenovacionConEquipo.Value = Request.QueryString("RenovacionConEquipo")
                hdfSituacion.Value = Request.QueryString("Situacion")
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub btnEnviar_Click(sender As Object, e As System.EventArgs) Handles btnEnviar.Click
        Try
            'Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = BL_MOV_CAM_CampanaCorte.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim dsDetalle As DataSet = CampanaCorte.ListarDetallesParaReporte(hdfIdCorte.Value)

            'GenerarReporte(dsDetalle.Tables(0), dsDetalle.Tables(1))
            EnviarCorreo(Convert.ToInt32(hdfIdCorte.Value), Convert.ToBoolean(hdfRenovacionConEquipo.Value))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub EnviarCorreo(ByVal inIdCorte As Integer, ByVal RenovacionConEquipo As Boolean)
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Dim Cola As BL_MOV_Cola = Nothing

        Dim strMensaje As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim dsDetalle As DataSet = CampanaCorte.ListarDetallesParaReporte(hdfIdCorte.Value, RenovacionConEquipo)

            Dim nombreArchivo As String = "DetalleCorte" & ".xls"

            System.IO.File.Delete(Server.MapPath("Temporal\" & nombreArchivo))
            GenerarExcel(dsDetalle.Tables(0), dsDetalle.Tables(1), Server.MapPath("Temporal\" & nombreArchivo))

            Dim strfn As String = Server.MapPath("Temporal\" + nombreArchivo)

            Dim m_objCorreo As New CCorreo
            Dim lstAdjunto As New List(Of String)
            Dim listaAdjGuardados As New List(Of String)

            CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'insertar AdjuntoCola
            If File.Exists(strfn) Then
                Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                    Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                    Dim BinaryData(fs.Length - 1) As Byte
                    fs.Read(BinaryData, 0, BinaryData.Length)
                    oArchivoAdjunto.F_vcCodSol = 1
                    oArchivoAdjunto.vcNomAdj = "Detalle de Cortes.xls"
                    oArchivoAdjunto.binData = BinaryData
                    oArchivoAdjunto.vcExtAdj = Path.GetExtension(strfn).Substring(1)
                    Dim cod As Integer = ArchivoAdjunto.Insertar(oArchivoAdjunto)
                    listaAdjGuardados.Add(cod)
                    fs.Flush()
                    fs.Close()
                End Using
                File.Delete(strfn)
            End If

            Dim oCola As New ENT_MOV_Cola
            oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
            oCola.vcAsunto = txtAsunto.Text.Trim()
            oCola.vcDescripcion = txtCuerpo.Text.Trim()
            oCola.vcMailTo = txtCorreo.Text.Trim()
            oCola.vcMailFrom = ""

            'insertar cola
            Dim codigocola As String = Cola.Insertar(oCola)
            'insertar AdjuntoCola
            For Each adjunto As String In listaAdjGuardados
                ArchivoAdjunto.InsertarAdjuntoCola(adjunto, codigocola)
            Next

            ''CampanaCorte.EnvioOperador(inIdCorte)

            strMensaje = "El correo fue agregado a la cola de envíos."
        Catch ex As Exception
            strMensaje = "Error: " & ex.Message
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
            If ArchivoAdjunto IsNot Nothing Then
                ArchivoAdjunto.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
        Dim Script As String = "Mensaje(""<img alt='' src='../../Common/Images/Mantenimiento/Correo32.png' /><br/><h1>" & strMensaje & "</h1>"", document, CerroMensaje); function CerroMensaje(){ window.parent.formulario.dialog('close'); window.parent.ActualizarGrilla(" & inIdCorte.ToString() & ");"
        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
    End Sub

    Public Sub GenerarExcel(ByVal dtDetalle As DataTable, ByVal dtCampos As DataTable, ByVal RutaExcel As String)
        ' Create the Excel Application object
        Dim excelApp As Object = CreateObject("Excel.Application") ' As New Excel.Application()

        Try
            ' Create a new Excel Workbook
            Dim excelWorkbook As Object = excelApp.Workbooks.Add(Type.Missing) 'Excel.Workbook = excelApp.Workbooks.Add(Type.Missing)

            Dim sheetIndex As Integer = 0
            Dim col, row As Integer
            Dim excelSheet As Object 'As Excel.Worksheet
            Dim colAux As String = ""
            Dim nombreHoja As String = ""
            ' Copy each DataTable as a new Sheet
            'For Each dt As System.Data.DataTable In DataSet.Tables

            sheetIndex += 1

            ' Copy the DataTable to an object array
            Dim rawData(dtDetalle.Rows.Count, dtDetalle.Columns.Count - 1) As Object

            ' Copy the column names to the first row of the object array
            For col = 1 To dtCampos.Columns.Count - 1
                rawData(0, col) = dtCampos.Rows(1).Item(col).ToString()
            Next

            ' Copy the values to the object array
            For col = 1 To dtDetalle.Columns.Count - 1
                For row = 0 To dtDetalle.Rows.Count - 1
                    rawData(row + 1, col) = dtDetalle.Rows(row).ItemArray(col)
                Next
            Next

            ' Calculate the final column letter
            Dim finalColLetter As String = String.Empty
            Dim colCharset As String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            Dim colCharsetLen As Integer = colCharset.Length

            finalColLetter = ObtenerNombreColumna(colCharset, colCharsetLen, dtDetalle.Columns.Count)

            ' Create a new Sheet
            excelSheet = excelWorkbook.Sheets.Add(excelWorkbook.Sheets(sheetIndex), Type.Missing, 1, -4167) 'CType(excelWorkbook.Sheets.Add(excelWorkbook.Sheets(sheetIndex), Type.Missing, 1, XlSheetType.xlWorksheet), Excel.Worksheet) '-4167:Excel.XlSheetType.xlWorksheet
            'nombreHoja = dtDetalle.TableName
            nombreHoja = "Pedidos"
            excelSheet.Name = nombreHoja

            excelSheet.Select()

            'Configura el ancho de las columnas
            excelSheet.Columns(1, Type.Missing).ColumnWidth = 10.71
            excelSheet.Columns(2, Type.Missing).ColumnWidth = 18.57
            excelSheet.Columns(3, Type.Missing).ColumnWidth = 27.43
            excelSheet.Columns(4, Type.Missing).ColumnWidth = 16.86
            excelSheet.Columns(5, Type.Missing).ColumnWidth = 23.29
            excelSheet.Columns(6, Type.Missing).ColumnWidth = 14.29
            excelSheet.Columns(7, Type.Missing).ColumnWidth = 19.86
            excelSheet.Columns(8, Type.Missing).ColumnWidth = 16
            excelSheet.Columns(9, Type.Missing).ColumnWidth = 9.29
            'For col = Offset To dtCampos.Columns.Count - 1
            '    Dim ancho As Integer = dtCampos.Rows(1).Item(col).ToString().Length * 9
            '    'colAux = ObtenerNombreColumna(colCharset, colCharsetLen, col + 1)
            '    'excelSheet.Columns(colAux & ":" & colAux).ColumnWidth = ancho
            '    'excelSheet.Columns(col + 1, Type.Missing).ColumnWidth = ancho
            'Next


            'For col = Offset + CamposPorServicio - 1 To dtCampos.Columns.Count - 1 Step CamposPorServicio
            '    colAux = ObtenerNombreColumna(colCharset, colCharsetLen, col + 1)

            '    excelApp.Sheets(nombreHoja).Range(colAux & ":" & colAux).Select()

            '    If dtCampos.Rows(2).Item(col).ToString() = "1" Then
            '        With excelApp.Selection.Validation 'Validacion del tipo de servicio ilimitado
            '            .Delete()
            '            .Add(Type:=3, AlertStyle:=1, Operator:=1, Formula1:=vcValIli.Replace(":", ","))
            '            .IgnoreBlank = True
            '            .InCellDropdown = True
            '            .InputTitle = "Tipo de dato"
            '            .ErrorTitle = "Tipo de dato"
            '            .InputMessage = "" '"Este campo solo puede ser llenado con los valores de la lista desplegable."
            '            .ErrorMessage = "Este campo solo puede ser llenado con los valores de la lista desplegable."
            '            .ShowInput = True
            '            .ShowError = True
            '        End With
            '    ElseIf dtCampos.Rows(2).Item(col).ToString() = "0" Then
            '        With excelApp.Selection.Validation 'Validacion del tipo de servicio con limites
            '            .Delete()
            '            .Add(Type:=1, AlertStyle:=1, Operator:=1, Formula1:="0", Formula2:="9999")
            '            .IgnoreBlank = True
            '            .InCellDropdown = True
            '            .InputTitle = ""
            '            .ErrorTitle = "Tipo de dato"
            '            .InputMessage = ""
            '            .ErrorMessage = "Este campo solo puede ser llenado con valores enteros positivos y menoresa 10,000"
            '            .ShowInput = True
            '            .ShowError = True
            '        End With
            '    End If
            'Next

            excelApp.Sheets(nombreHoja).Range("1:1").Select()

            With excelApp.Selection.Validation 'Validacion del tipo de servicio ilimitado
                .Delete()
            End With

            ' Fast data export to Excel
            Dim excelRange As String = String.Format("A1:{0}{1}", finalColLetter, dtDetalle.Rows.Count + 1)
            excelSheet.Range(excelRange, Type.Missing).Value2 = rawData

            ' Mark the first row as BOLD
            excelSheet.Rows(1, Type.Missing).Font.Bold = True 'CType(excelSheet.Rows(1, Type.Missing), Excel.Range).Font.Bold = True

            ''Bloque edicion de celdas
            'For col = Offset + CamposPorServicio - 1 To dtCampos.Columns.Count - 1 Step CamposPorServicio
            '    colAux = ObtenerNombreColumna(colCharset, colCharsetLen, col + 1)
            '    excelApp.Sheets(nombreHoja).Range(colAux & ":" & colAux).Select()
            '    excelApp.Selection.Locked = False
            '    excelApp.Selection.FormulaHidden = False

            '    'Oculta las columnas de servicios que solo son necesarias para el sistema, el usuario no las debe ver
            '    For i = 1 To CamposPorServicio - 1
            '        'colAux = ObtenerNombreColumna(colCharset, colCharsetLen, col + i + 1)
            '        'excelApp.Sheets(nombreHoja).Range(colAux & ":" & colAux).Activate()
            '        excelSheet.Columns(col - CamposPorServicio + i + 1, Type.Missing).Hidden = True
            '    Next
            'Next
            excelApp.Sheets(nombreHoja).Range("1:1").Select()
            'excelApp.Selection.Locked = True
            excelApp.Selection.FormulaHidden = False
            'excelApp.ActiveSheet.Protect(Password:="v1su@ls0ft", DrawingObjects:=False, Contents:=True, Scenarios:=False)
            excelApp.Sheets(nombreHoja).Range("A1").Select()

            excelSheet = Nothing
            'Next

            ' Save and Close the Workbook
            excelWorkbook.SaveAs(RutaExcel, -4143) '-4143:Excel.XlFileFormat.xlWorkbookNormal

            excelWorkbook.Close(True, Type.Missing, Type.Missing)

            ForzarCierreEXC(excelWorkbook)
        Catch ex As Exception

        Finally
            ' Release the Application object
            excelApp.Quit()           'Cierra Excel
            ForzarCierreEXC(excelApp)

            ' Collect the unreferenced objects
            GC.Collect()
            GC.WaitForPendingFinalizers()
        End Try
    End Sub

    Private Function ObtenerNombreColumna(colCharset As String, colCharsetLen As Integer, columna As Integer) As String
        Dim colAux As String = ""
        If columna > colCharsetLen Then
            colAux = colCharset.Substring((columna - 1) \ colCharsetLen - 1, 1)
        End If

        colAux += colCharset.Substring((columna - 1) Mod colCharsetLen, 1)

        Return colAux
    End Function

    Private Sub ForzarCierreEXC(ByVal o As Object)
        Try
            System.Runtime.InteropServices.Marshal.ReleaseComObject(o)
        Catch ex As Exception
        Finally
            o = Nothing
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function EnvioOperador(ByVal IdCorte As Integer, ByVal Situacion As String) As String
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
        Dim PedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = Nothing
        Dim Solicitud As BL_MOV_FAC_Solicitud = Nothing

        Try
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            PedidoDetalle = New BL_MOV_CAM_CampanaPedidoDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Solicitud = New BL_MOV_FAC_Solicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As New DataTable

            Dim sqlTrans As SqlTransaction = Nothing
            Try
                dt = CampanaCorte.ListarDetallesParaFacturacion(IdCorte, sqlTrans)

                If Situacion <> "Baja" Then
                    For Each dr As DataRow In dt.Rows

                        Dim oSolicitudLinea As New ENT_MOV_FAC_Solicitud
                        oSolicitudLinea.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                        oSolicitudLinea.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcUsu
                        oSolicitudLinea.InTipSol = IIf(Not IsDBNull(dr("InTipSol")), Convert.ToInt32(dr("InTipSol")), -1)  'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitudLinea
                        oSolicitudLinea.DesSolicitud = dr("DescripcionPlan").ToString() 'Descripcion que saldra en el estado de cuenta del usuario
                        oSolicitudLinea.IdEmpleado = dr("IdEmpleado").ToString()
                        oSolicitudLinea.NumCuotas = dr("MesesContrato").ToString() 'Numero de cuotas que se generara el cobro
                        oSolicitudLinea.BiCuotasDefinidas = False 'flag que indica si se va a pagar en cuotas definidas
                        oSolicitudLinea.MesesCuotas = "" 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                        oSolicitudLinea.MontoCuota = IIf(Not IsDBNull(dr("MontoPlan")), Convert.ToDecimal(dr("MontoPlan")), 0)  'monto mensual a cobrar en cada cuota
                        oSolicitudLinea.FechaSolicitud = dr("FechaSolicitud").ToString() 'fecha actual
                        oSolicitudLinea.biPeriodoGracia = False 'flag que indica si tiene periodo de gracia
                        oSolicitudLinea.MesesPeriodoGracia = 0 'los meses de periodo de gracia
                        oSolicitudLinea.biInteres = False 'flag que indica si hay interes
                        oSolicitudLinea.TipoInteres = ""
                        oSolicitudLinea.TasaInteres = 0
                        oSolicitudLinea.biPagoContado = False 'flag que indica si es pago al contado
                        oSolicitudLinea.MesesCuotasDobles = "" 'meses que se cobra cuotas dobles separados por comas
                        oSolicitudLinea.BiCuotasDobles = False 'flag que indica si se hace el cobro en cuotas dobles
                        oSolicitudLinea.P_incodsol = IIf(Not IsDBNull(dr("IdSubDetallePlan")), Convert.ToInt32(dr("IdSubDetallePlan")), 0)
                        oSolicitudLinea.biFraccionar = 0
                        'JHERRERA 20150730: Nuevos campos
                        oSolicitudLinea.IdTipoProducto = 2 '2 = Servicio
                        oSolicitudLinea.IdTipoProceso = 1 '1 = Regular (No es cese)
                        oSolicitudLinea.Linea = dr("Linea").ToString()
                        oSolicitudLinea.IdOperador = Convert.ToInt32(dr("IdOperador").ToString())
                        oSolicitudLinea.IdTipoLinea = 2
                        '------------------------------>>

                        Solicitud.Insertar_Solicitud(oSolicitudLinea, sqlTrans)

                        If dr("TieneEquipo").ToString() = "1" Then
                            Dim oSolicitudEquipo As New ENT_MOV_FAC_Solicitud
                            oSolicitudEquipo.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                            oSolicitudEquipo.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcUsu
                            oSolicitudEquipo.InTipSol = IIf(Not IsDBNull(dr("InTipSol")), Convert.ToInt32(dr("InTipSol")), -1) 'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitudEquipo
                            oSolicitudEquipo.DesSolicitud = dr("DescripcionEquipo").ToString() 'Descripcion que saldra en el estado de cuenta del usuario
                            oSolicitudEquipo.IdEmpleado = dr("IdEmpleado").ToString()
                            oSolicitudEquipo.NumCuotas = Convert.ToInt32("0" + dr("NumCuotas").ToString())  'Numero de cuotas que se generara el cobro
                            oSolicitudEquipo.BiCuotasDefinidas = IIf(Not IsDBNull(dr("BiCuotasDefinidas")), Convert.ToBoolean(dr("BiCuotasDefinidas")), False)  'flag que indica si se va a pagar en cuotas definidas
                            oSolicitudEquipo.MesesCuotas = dr("MesesCuotas").ToString() 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                            oSolicitudEquipo.MontoCuota = IIf(Not IsDBNull(dr("MontoEquipo")), Convert.ToDecimal(dr("MontoEquipo")), 0) 'monto mensual a cobrar en cada cuota
                            oSolicitudEquipo.FechaSolicitud = dr("FechaSolicitud").ToString() 'fecha actual
                            oSolicitudEquipo.biPeriodoGracia = IIf(Not IsDBNull(dr("biPeriodoGracia")), Convert.ToBoolean(dr("biPeriodoGracia")), False) 'flag que indica si tiene periodo de gracia
                            oSolicitudEquipo.MesesPeriodoGracia = IIf(Not IsDBNull(dr("MesesPeriodoGracia")), Convert.ToInt32(dr("MesesPeriodoGracia")), 0)  'los meses de periodo de gracia
                            oSolicitudEquipo.biInteres = IIf(Not IsDBNull(dr("biInteres")), Convert.ToBoolean(dr("biInteres")), False) 'flag que indica si hay interes
                            oSolicitudEquipo.TipoInteres = dr("TipoInteres").ToString()
                            If IsDBNull(dr("TasaInteres")) Then
                                oSolicitudEquipo.TasaInteres = 0
                            Else
                                oSolicitudEquipo.TasaInteres = Convert.ToDecimal(dr("TasaInteres"))
                            End If
                            oSolicitudEquipo.biPagoContado = IIf(Not IsDBNull(dr("biPagoContado")), Convert.ToBoolean(dr("biPagoContado")), False) 'flag que indica si es pago al contado
                            oSolicitudEquipo.MesesCuotasDobles = dr("MesesCuotasDobles").ToString() 'meses que se cobra cuotas dobles separados por comas
                            oSolicitudEquipo.BiCuotasDobles = IIf(Not IsDBNull(dr("BiCuotasDobles")), Convert.ToBoolean(dr("BiCuotasDobles")), False) 'flag que indica si se hace el cobro en cuotas dobles
                            oSolicitudEquipo.P_incodsol = IIf(Not IsDBNull(dr("IdSubDetalleEquipo")), Convert.ToInt32(dr("IdSubDetalleEquipo")), 0)
                            oSolicitudEquipo.biFraccionar = 1

                            'JHERRERA 20150730: Nuevos campos
                            oSolicitudEquipo.IdTipoProducto = 1 '1 = Equipo
                            oSolicitudEquipo.IdTipoProceso = 1 '1 = Regular (No es cese)
                            oSolicitudEquipo.Linea = dr("Linea").ToString()
                            oSolicitudEquipo.IdOperador = Convert.ToInt32(dr("IdOperador").ToString())
                            oSolicitudEquipo.IdTipoLinea = 2
                            '------------------------------>>

                            Solicitud.Insertar_Solicitud(oSolicitudEquipo, sqlTrans)
                        End If

                        'ECONDEÑA   01/07/2016
                        If dr("TieneGastos").ToString() = "1" Then
                            Dim oSolicitudGastosAdm As New ENT_MOV_FAC_Solicitud
                            oSolicitudGastosAdm.IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
                            oSolicitudGastosAdm.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcUsu
                            oSolicitudGastosAdm.InTipSol = IIf(Not IsDBNull(dr("InTipSol")), Convert.ToInt32(dr("InTipSol")), -1)  'indica de que modulo es la solicitud de facturacion se extraera de la tabla MOV_FAC_TipoSolicitudLinea
                            oSolicitudGastosAdm.DesSolicitud = dr("DescripcionGastosAdm").ToString() 'Descripcion que saldra en el estado de cuenta del usuario
                            oSolicitudGastosAdm.IdEmpleado = dr("IdEmpleado").ToString()
                            oSolicitudGastosAdm.NumCuotas = dr("NumMesesGastos").ToString() 'Numero de cuotas que se generara el cobro
                            oSolicitudGastosAdm.BiCuotasDefinidas = False 'flag que indica si se va a pagar en cuotas definidas
                            oSolicitudGastosAdm.MesesCuotas = "" 'si el flag biCuotasDefinidas es true entonces se indica los meses separados por comas del cobro
                            oSolicitudGastosAdm.MontoCuota = IIf(Not IsDBNull(dr("GastoAdministrativo")), Convert.ToDecimal(dr("GastoAdministrativo")), 0)  'monto mensual a cobrar en cada cuota
                            oSolicitudGastosAdm.FechaSolicitud = dr("FechaSolicitud").ToString() 'fecha actual
                            oSolicitudGastosAdm.biPeriodoGracia = False 'flag que indica si tiene periodo de gracia
                            oSolicitudGastosAdm.MesesPeriodoGracia = 0 'los meses de periodo de gracia
                            oSolicitudGastosAdm.biInteres = False 'flag que indica si hay interes
                            oSolicitudGastosAdm.TipoInteres = ""
                            oSolicitudGastosAdm.TasaInteres = 0
                            oSolicitudGastosAdm.biPagoContado = False 'flag que indica si es pago al contado
                            oSolicitudGastosAdm.MesesCuotasDobles = "" 'meses que se cobra cuotas dobles separados por comas
                            oSolicitudGastosAdm.BiCuotasDobles = False 'flag que indica si se hace el cobro en cuotas dobles
                            oSolicitudGastosAdm.P_incodsol = IIf(Not IsDBNull(dr("IdSubDetalleGastoAdm")), Convert.ToInt32(dr("IdSubDetalleGastoAdm")), 0)
                            oSolicitudGastosAdm.biFraccionar = 0
                            oSolicitudGastosAdm.IdTipoProducto = 9 '2 = Gastos Administrativos
                            oSolicitudGastosAdm.IdTipoProceso = 1 '1 = Regular (No es cese)
                            oSolicitudGastosAdm.Linea = dr("Linea").ToString()
                            oSolicitudGastosAdm.IdOperador = Convert.ToInt32(dr("IdOperador").ToString())
                            oSolicitudGastosAdm.IdTipoLinea = 2
                            '------------------------------>>

                            Solicitud.Insertar_Solicitud(oSolicitudGastosAdm, sqlTrans)
                        End If

                    Next
                End If

                CampanaCorte.EnvioOperador(IdCorte, sqlTrans)
                Return ""
            Catch ex As Exception
                If sqlTrans IsNot Nothing Then
                    sqlTrans.Rollback()
                    sqlTrans = Nothing
                End If
                Return "-1"
            Finally
                If sqlTrans IsNot Nothing Then sqlTrans.Commit()
            End Try




        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            Return "-1"
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
            If PedidoDetalle IsNot Nothing Then
                PedidoDetalle.Dispose()
            End If
            If Solicitud IsNot Nothing Then
                Solicitud.Dispose()
            End If
        End Try
    End Function
End Class
