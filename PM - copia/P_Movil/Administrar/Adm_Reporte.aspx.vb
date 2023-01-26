Imports DevExpress.Data.Filtering
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.PCSistel.Comprobantes.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.IO
Imports CompCorreo
Imports System.Web.Services
Imports System.Windows.Forms 'agregado 14-10-2013
Imports VisualSoft.Common.Logging
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Consulta.BE
Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports Ionic.Zip
Imports System.Threading


Partial Class P_Movil_Administrar_Adm_Reporte
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Response.Clear()
        'If Not IsPostBack Then
        Dim Tipo As String = Request.QueryString("Tipo")
        Dim SubTipo As String = Request.QueryString("SubTipo")
        Dim NumCriterio As String = Request.QueryString("NumCriterio")
        Dim Detalle As String = Request.QueryString("Detalle")
        Dim Valor As String = Request.QueryString("Valor")
        Dim vcTab As String = Request.QueryString("vcTab")
        Dim vcTipRep As String = Request.QueryString("vcTipRep")
        Dim inEstado As Integer = UtilitarioWeb.ComprobarIntNULL(Request.QueryString("inEstado"), 0)
        Dim vcCampoFiltro As String = Request.QueryString("vcCampoFiltro")
        Dim vcDescFiltro As String = Request.QueryString("vcDescFiltro")
        Dim vcTipoReporteHistoricos As String = Request.QueryString("vcTipRepHist")
        Dim inFilReg As Integer

        If Not Integer.TryParse(Request.QueryString("inFilReg"), inFilReg) Then
            inFilReg = 2
        End If

        Dim oHistorico As ENT_MOV_Historicos = CType(Session("Historico" & NumCriterio), ENT_MOV_Historicos)

        Dim v_oCriterio As New ENT_MOV_IMP_Criterio

        Try
            Select Case Tipo
                Case 1 'Factura
                    GenerarFactura(Convert.ToInt32(Valor), SubTipo)
            End Select

            If vcTipRep Is Nothing And vcTab <> "MOV_Pago" And vcTab <> "MOV_Facturacion" And vcTab <> "MOV_CAM_CampanaPedidoSeguimiento" Then
                If vcTab <> "" Then
                    If Tipo = "RepHistorico" Then
                        ExportarExcelHistoricos(vcTab, Detalle) 'reporte en excel de Historicos
                    ElseIf Tipo = "RepSumario" Then
                        ExportarExcelSumario(vcTab, Detalle) 'reporte en excel de Sumarios
                    ElseIf Tipo = "RepFacturacionSumario" Then 'MPAJUELO_20161016_SUMARIO_ENTEL
                        ExportarExcelFacturacionSumario(vcTab, Detalle) 'reporte en excel de Facturacion Sumarios
                    ElseIf Tipo = "RepResumen" Then 'Reporte en excel de Resumen de Facturación
                        Dim vcCue As String = Request.QueryString("vcCue")
                        Dim vcPer As String = Request.QueryString("vcPer")
                        Dim vcOpe As String = Request.QueryString("vcOpe")
                        Dim vcLin As String = Request.QueryString("vcLin")
                        Dim oCuenta As New ENT_MOV_Cuenta
                        oCuenta.P_vcCod = vcCue
                        Dim oOperador As New ENT_GEN_Operador
                        oOperador.P_inCodOpe = vcOpe
                        v_oCriterio.Cuentas.Add(oCuenta)
                        v_oCriterio.Operadores.Add(oOperador)
                        v_oCriterio.vcPer = vcPer
                        v_oCriterio.vcTab = vcTab
                        ExportarExcelResumen(v_oCriterio, Detalle, vcLin)

                    ElseIf Tipo = "RepResumenCuenta" Then 'Reporte en excel de Resumen de Facturación
                        Dim vcCue As String = ""
                        Dim vcPer As String = Request.QueryString("vcPer")
                        Dim vcOpe As String = Request.QueryString("vcOpe")
                        Dim oCuenta As New ENT_MOV_Cuenta
                        oCuenta.P_vcCod = vcCue
                        Dim oOperador As New ENT_GEN_Operador
                        oOperador.P_inCodOpe = vcOpe
                        v_oCriterio.Cuentas.Add(oCuenta)
                        v_oCriterio.Operadores.Add(oOperador)
                        v_oCriterio.vcPer = vcPer
                        v_oCriterio.vcTab = vcTab
                        ExportarExcelResumenCuentas(v_oCriterio, Detalle)

                    ElseIf Tipo = "RepResumenFacturacion" Then 'Reporte en excel de Resumen de Facturación
                        Dim vcPer As String = Request.QueryString("vcPer")
                        Dim vcOpe As String = Request.QueryString("vcOpe")
                        Dim oOperador As New ENT_GEN_Operador
                        oOperador.P_inCodOpe = vcOpe
                        v_oCriterio.Operadores.Add(oOperador)
                        v_oCriterio.vcPer = vcPer
                        v_oCriterio.vcTab = vcTab
                        ExportarExcelResumenFacturacion(v_oCriterio)

                    Else
                        ExportarExcel(vcTab, Detalle, Valor, inFilReg)
                    End If
                    'ExportarExcel(vcTab, Detalle, Valor, inFilReg)
                Else

                    'MPAJUELO_20161026_SUMARIO_ENTEL
                    If Tipo = "RepAgrupacionLineaDispositivo" Then
                        ExportarExcelAgrupadoLineaDispositivo(Detalle) 'Reporte Organizacion agrupado por Lineas, Dispositivos
                        Exit Sub
                    End If

                    Dim vcPeriodo As String = Request.QueryString("vcPeriodo")
                    Dim idEmpleado As String = Request.QueryString("idEmp")
                    If Tipo = "RepComprobante" Then
                        'vcPeriodo = vcPeriodo.Substring(3, 4) & vcPeriodo.Substring(0, 2) & "01"
                        Dim inOpe As String = Convert.ToInt32(Request.QueryString("vcOpe"))
                        Dim inEst As String = Convert.ToInt32(Request.QueryString("inEst"))
                        Dim inTipPro As String = Convert.ToInt32(Request.QueryString("inTipProd"))
                        Dim inMeses As String = Convert.ToInt32(Request.QueryString("inMeses"))
                        ExportarComprobanteGenerar(vcPeriodo, inOpe, inEst, inTipPro, inMeses)
                    ElseIf Tipo = "RepVisorComprobante" Then
                        vcPeriodo = vcPeriodo.Substring(3, 4) & vcPeriodo.Substring(0, 2) & "01"
                        Dim inTiPro As Integer = Convert.ToInt32(Request.QueryString("inTiPro"))
                        Dim inTipDoc As Integer = Convert.ToInt32(Request.QueryString("inTipDoc"))
                        Dim inEst As Integer = Convert.ToInt32(Request.QueryString("inEst"))
                        ExportarComprobante(vcPeriodo, idEmpleado, inTiPro, inTipDoc, inEst)
                    ElseIf Tipo = "RepComprobantePdf" Then
                        'vcPeriodo = vcPeriodo.Substring(3, 4) & vcPeriodo.Substring(0, 2) & "01"
                        Dim nroComprobante As String = Request.QueryString("nroComp")
                        GenerarReporteComprobante(nroComprobante)
                    End If
                End If
            Else
                Select Case vcTab
                    Case "MOV_Pago" 'Pago Historico
                        Dim daFecIni As String = Request.QueryString("daFecIni")
                        Dim daFecFin As String = Request.QueryString("daFecFin")
                        Dim vcOpe As String = Request.QueryString("vcOpe")
                        Dim vcEst As String = Request.QueryString("vcEst")

                        If daFecIni <> String.Empty AndAlso daFecIni <> "NaN" Then
                            Dim daFecha As DateTime = Convert.ToDateTime(daFecIni)
                            daFecIni = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
                        Else
                            daFecIni = Now.Year & "0101"
                        End If
                        If daFecFin <> String.Empty AndAlso daFecFin <> "NaN" Then
                            Dim daFecha As DateTime = Convert.ToDateTime(daFecFin)
                            daFecFin = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
                        Else
                            daFecFin = Now.Year & Now.Month.ToString("D2") & Now.Day.ToString("D2")
                        End If
                        If IsNothing(vcOpe) Or vcOpe = "NaN" Or vcOpe = "0" Then
                            vcOpe = ""
                        End If
                        If IsNothing(vcEst) Or vcEst = "NaN" Or vcEst = "0" Then
                            vcEst = ""
                        End If

                        GenerarPagoHistorico(daFecIni, daFecFin, vcOpe.Trim(), vcEst.Trim())

                    Case "MOV_Facturacion" 'Factura Historico
                        Dim daFecIni As String = Request.QueryString("daFecIni")
                        Dim daFecFin As String = Request.QueryString("daFecFin")
                        Dim vcOpe As String = Request.QueryString("vcOpe")
                        Dim vcEst As String = Request.QueryString("vcEst")

                        If daFecIni <> String.Empty AndAlso daFecIni <> "NaN" Then
                            Dim daFecha As DateTime = Convert.ToDateTime(daFecIni)
                            daFecIni = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
                        Else
                            daFecIni = Now.Year & "0101"
                        End If
                        If daFecFin <> String.Empty AndAlso daFecFin <> "NaN" Then
                            Dim daFecha As DateTime = Convert.ToDateTime(daFecFin)
                            daFecFin = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
                        Else
                            daFecFin = Now.Year & Now.Month.ToString("D2") & Now.Day.ToString("D2")
                        End If
                        If IsNothing(vcOpe) Or vcOpe = "NaN" Or vcOpe = "0" Then
                            vcOpe = ""
                        End If
                        If IsNothing(vcEst) Or vcEst = "NaN" Or vcEst = "0" Then
                            vcEst = ""
                        End If

                        GenerarFacturaHistorico(daFecIni, daFecFin, vcOpe.Trim(), vcEst.Trim())
                    Case "MOV_Solicitud" 'Solicitud Historico
                        Select Case vcTipRep
                            Case "1"
                                GenerarSolicitudHistorico()
                            Case "2"
                                GenerarReporteSolicitudPorPeriodoEstadoTipo()
                            Case "6" 'agregado 17-09-2013
                                GenerarReporte_SolcitutdServicioActivacion()
                            Case "7" 'agregado 17-09-2013
                                GenerarReporte_SolcitutdServicioAmpliacion()
                                'Case "8" 'jherrera 20140822 - Agregado
                                'GenerarReporte_Solicitud_AutorizacionDescuento()
                        End Select
                    Case "MOV_ModeloDispositivo"
                        Select Case vcTipRep
                            Case "1"
                                GenerarReporteModeloDispositivoAgrupadoPorTipo(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "2"
                                GenerarReporteModeloDispositivoAgrupadoPorGrupo(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                        End Select
                    Case "MOV_Linea"
                        Select Case vcTipRep
                            Case "1"
                                GenerarReporteLineaAgrupadoPorCCO(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "2"
                                GenerarReporteLineaAgrupadoPorEmpleado(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "3"
                                GenerarReporteLineaAgrupadoPorEstado(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "4"
                                GenerarReporteLineaDistribucionBolsa(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "5"
                                'GenerarReporteLineaHistoricos(oHistorico)
                                GenerarReporteLineaHistoricos(oHistorico, vcTipoReporteHistoricos)
                            Case "6"
                                Dim vcFecIni As String = Request.QueryString("vcFecIni")
                                Dim vcFecFin As String = Request.QueryString("vcFecFin")
                                GenerarReporteLineaComprobante(inEstado, vcFecIni, vcFecFin)
                            Case "7"
                                GenerarReporteLineaAgrupadoPorArea(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)

                        End Select
                    Case "MOV_Cuenta"
                        Select Case vcTipRep
                            Case "1"
                                GenerarReporteCuentaDistribucionBolsa(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "2"
                                GenerarReporteCuentaLineasAgrupadas(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                        End Select
                    Case "MOV_Plan"
                        Select Case vcTipRep
                            Case "1"
                                GenerarReportePlanServiciosAgrupados(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "2"
                                GenerarReportePlanLineasAgrupadas(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                        End Select
                    Case "MOV_SolicitudDespacho"
                        Select Case vcTipRep
                            Case "1"
                                GenerarReporteSolicitudDespachoCargo(Valor)
                        End Select
                    Case "MOV_Dispositivo"
                        Select Case vcTipRep
                            Case "1"
                                GenerarReporteDispositivoAgrupadoPorModelo(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "2"
                                GenerarReporteDispositivoAgrupadoPorEstado(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "3"
                                GenerarReporteDispositivoAgrupadoPorEmpleado(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                            Case "4"
                                'GenerarReporteDispositivosHistoricos(oHistorico)
                                GenerarReporteDispositivosHistoricos(oHistorico, vcTipoReporteHistoricos)

                        End Select
                    Case "MOV_CAM_CampanaPedidoSeguimiento"

                        Dim blnSeg = False
                        If Request.QueryString("vcTipDes").ToUpper = "VISTA DETALLADA" Then
                            blnSeg = True
                        End If

                        Dim inIdCam As Integer = Request.QueryString("inIdCam")
                        Dim vcNomSit As String = Request.QueryString("vcNomSit")
                        Dim vcFecIni As String = Request.QueryString("vcFecIni")
                        Dim vcFecFin As String = Request.QueryString("vcFecFin")
                        Dim vcCodEmp As String = Request.QueryString("vcCodEmp")
                        Dim vcCodAre As String = Request.QueryString("vcCodAre")
                        Dim vcCodCCO As String = Request.QueryString("vcCodCCO")
                        Dim vcCodCue As String = Request.QueryString("vcCodCue")
                        Dim vcIdEst As String = Request.QueryString("vcIdEst")
                        Dim vcCodPed As String = Request.QueryString("vcCodPed")
                        Dim inPosicion As Integer = Request.QueryString("inPosicion")

                        GenerarReportePedido(blnSeg, inIdCam, vcNomSit, vcFecIni, vcFecFin, vcCodEmp, vcCodAre, vcCodCCO, vcCodCue, vcIdEst, vcCodPed, inPosicion)
                    Case "MOV_CAM_CampanaDespachoOperador"
                        If vcTipRep = "1" Then
                            GenerarReporte_Almacen_IngresoPorModelos()
                        End If
                    Case "MOV_CAM_DespachoOperador"
                        If vcTipRep = "ReporteLetras" Then
                            Dim inIdCam As Integer = Request.QueryString("inIdCam")
                            GenerarReporte_Despacho_InicialesEmpleados(inIdCam)
                        End If

                    Case Else
                        If vcTab <> "" Then
                            ExportarExcel(vcTab, Detalle, Valor, inFilReg)
                        End If
                End Select
            End If

        Catch exThread As ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try

    End Sub

    'MOV_Pago
    '--------
    Private Sub GenerarPagoHistorico(ByVal vcFecIni As String, ByVal vcFecFin As String, ByVal vcOpe As String, ByVal vcEst As String)
        Dim Pago As BL_MOV_Pago = Nothing

        Try
            Pago = New BL_MOV_Pago(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim dictCampoFormula As New Dictionary(Of String, String)
            Dim vcReporte As String = "Reportes/Adm_Rpt_PagoHistorico.rpt"
            'Dim vcFecIni As String = "20120101"
            'Dim vcFecFin As String = Now.Year.ToString() & Now.Month.ToString("D2") & Now.Day.ToString("D2")

            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "''")
            dictCampoFormula.Add("titulo", "'Histórico de Pagos'")
            dictCampoFormula.Add("subtitulo2", "''")
            'dictCampoFormula.Add("periodo", "'Desde: " & vcFecIni.Substring(6, 2) & "/" & vcFecIni.Substring(4, 2) & "/" & vcFecIni.Substring(0, 4) & _
            '                                " - Hasta: " & vcFecFin.Substring(6, 2) & "/" & vcFecFin.Substring(4, 2) & "/" & vcFecFin.Substring(0, 4) & "'")
            'dictCampoFormula.Add("tituloperiodo", "'Periodo'")
            dictCampoFormula.Add("titulototalgeneral", "'Total'")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")

            GenerarReporte(vcReporte, Pago.ListarHistorico(vcFecIni, vcFecFin, vcOpe, vcEst), "MOV_s_PagoHistorico", dictCampoFormula, oUsuario)

        Catch ex As Exception
        Finally
            If Pago IsNot Nothing Then Pago.Dispose()
        End Try

    End Sub
    '--------

    'MOV_Facturacion
    '---------------
    Private Sub GenerarFactura(ByVal inCodFac As Integer, ByVal SubTipo As String)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim Factura As BL_MOV_Factura = New BL_MOV_Factura(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Cliente As BL_GEN_Cliente = New BL_GEN_Cliente(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = ""
        Dim vcSubReporte As String = ""
        Dim vcEsquema As String = ""
        Dim vcEsquema1 As String = ""
        Dim vcEsquema2 As String = ""
        Dim vcEsquemaSubReport As String = ""
        Dim dsDatos As New DataSet
        Dim dsDatosSubReporte As New DataSet
        Dim dtCliente As DataTable = Nothing

        vcReporte = "Reportes/Adm_Rpt_Factura.rpt"
        vcSubReporte = "Adm_Rpt_FacturaEmpleado"
        vcEsquema = "GEN_s_Cliente_PorCodigo"
        vcEsquema1 = "MOV_s_Factura"
        vcEsquema2 = "MOV_s_FacturaDetalle"
        vcEsquemaSubReport = "MOV_s_FacturaEmpleado"

        ''.Report.FileName = vcReporte

        Dim ds As DataSet = Factura.ListarReporte(inCodFac)
        Factura.Dispose()
        dtCliente = Cliente.Mostrar(oUsuario.IdCliente)
        Cliente.Dispose()
        dsDatos.Tables.Add(ds.Tables(0).Copy)
        dsDatos.Tables(0).TableName = vcEsquema1
        dsDatos.Tables.Add(ds.Tables(1).Copy)
        dsDatos.Tables(1).TableName = vcEsquema2
        dsDatos.Tables.Add(dtCliente.Copy)
        dsDatos.Tables(2).TableName = vcEsquema

        ''crConsulta.ReportDocument.SetDataSource(dsDatos)

        dsDatosSubReporte.Tables.Add(ds.Tables(2).Copy)
        dsDatosSubReporte.Tables(0).TableName = vcEsquemaSubReport

        ''crConsulta.ReportDocument.Subreports(0).SetDataSource(dsDatosSubReporte)

        If SubTipo = 2 Then
            ''crConsulta.ReportDocument.PrintToPrinter(1, False, 0, 0)
            dvReporte.Style("display") = "none"
        End If

        'If SubTipo = 2 Then
        '    Dim pDialog As PrintDialog = New PrintDialog()
        '    pDialog.AllowCurrentPage = True
        '    pDialog.AllowPrintToFile = False
        '    pDialog.AllowSelection = False
        '    pDialog.AllowSomePages = False
        '    'Dim print As Nullable(Of Boolean) = pDialog.ShowDialog()
        '    'If print = True Then
        '    pDialog.Site.DesignMode.
        '    Dim print As DialogResult = pDialog.ShowDialog()
        '    If print = DialogResult.OK Then
        '        Dim rd As ReportDocument = crConsulta.ReportDocument
        '        Dim printReportOptions As CrystalDecisions.ReportAppServer.Controllers.PrintReportOptions = New CrystalDecisions.ReportAppServer.Controllers.PrintReportOptions
        '        Dim printOutputController As CrystalDecisions.ReportAppServer.Controllers.PrintOutputController = New CrystalDecisions.ReportAppServer.Controllers.PrintOutputController
        '        Dim rptClientDoc As CrystalDecisions.ReportAppServer.ClientDoc.ISCDReportClientDocument
        '        rptClientDoc = rd.ReportClientDocument
        '        printReportOptions.PrinterName = "Factura"
        '        rptClientDoc.PrintOutputController.PrintReport(printReportOptions)
        '    End If
        '    dvReporte.Style("display") = "none"
        'End If
    End Sub

    Private Sub GenerarFacturaHistorico(ByVal vcFecIni As String, ByVal vcFecFin As String, ByVal vcOpe As String, ByVal vcEst As String)
        Dim Factura As BL_MOV_Factura = New BL_MOV_Factura(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_FacturaHistorico.rpt"
        'Dim vcFecIni As String = "20120101"
        'Dim vcFecFin As String = Now.Year.ToString() & Now.Month.ToString("D2") & Now.Day.ToString("D2")

        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "''")
        dictCampoFormula.Add("titulo", "'Histórico de Facturación'")
        dictCampoFormula.Add("subtitulo2", "''")
        'dictCampoFormula.Add("periodo", "'Desde: " & vcFecIni.Substring(6, 2) & "/" & vcFecIni.Substring(4, 2) & "/" & vcFecIni.Substring(0, 4) & _
        '                                " - Hasta: " & vcFecFin.Substring(6, 2) & "/" & vcFecFin.Substring(4, 2) & "/" & vcFecFin.Substring(0, 4) & "'")
        'dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulototalgeneral", "'Total'")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim dsDatos As DataSet = Factura.ListarHistorico(vcFecIni, vcFecFin, vcOpe, vcEst)
        Factura.Dispose()
        GenerarReporte(vcReporte, dsDatos, "MOV_s_FacturaHistorico", dictCampoFormula, oUsuario)
    End Sub
    '---------------

    'MOV_Solicitud
    '-------------
    Private Sub GenerarSolicitudHistorico()

        'Preparando variables
        '--------------------
        Dim daFecIni As String = Request.QueryString("daFecIni")
        Dim daFecFin As String = Request.QueryString("daFecFin")
        Dim vcNumLin = If(IsNothing(Request.QueryString("vcLin")), "", Request.QueryString("vcLin").Trim())
        Dim vcCodIMEI = If(IsNothing(Request.QueryString("vcIMEI")), "", Request.QueryString("vcIMEI").Trim())
        Dim vcMod = If(IsNothing(Request.QueryString("vcMod")), "", Request.QueryString("vcMod").Trim())
        Dim vcEmp = If(IsNothing(Request.QueryString("vcEmp")), "", Request.QueryString("vcEmp").Trim())
        Dim vcEst = If(IsNothing(Request.QueryString("vcEst")), "", Request.QueryString("vcEst").Trim())
        Dim vcTip = If(IsNothing(Request.QueryString("vcTip")), "", Request.QueryString("vcTip").Trim())

        If daFecIni <> String.Empty AndAlso daFecIni <> "NaN" Then
            Dim daFecha As DateTime = Convert.ToDateTime(daFecIni)
            daFecIni = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
        Else
            daFecIni = Now.Year & "0101"
        End If
        If daFecFin <> String.Empty AndAlso daFecFin <> "NaN" Then
            Dim daFecha As DateTime = Convert.ToDateTime(daFecFin)
            daFecFin = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
        Else
            daFecFin = Now.Year & Now.Month.ToString("D2") & Now.Day.ToString("D2")
        End If
        '--------------------

        Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_SolicitudHistorico.rpt"

        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "''")
        dictCampoFormula.Add("titulo", "'Histórico de Solicitudes'")
        dictCampoFormula.Add("subtitulo2", "''")
        'dictCampoFormula.Add("periodo", "'Desde: " & vcFecIni.Substring(6, 2) & "/" & vcFecIni.Substring(4, 2) & "/" & vcFecIni.Substring(0, 4) & _
        '                                " - Hasta: " & vcFecFin.Substring(6, 2) & "/" & vcFecFin.Substring(4, 2) & "/" & vcFecFin.Substring(0, 4) & "'")
        'dictCampoFormula.Add("tituloperiodo", "'Periodo'")
        dictCampoFormula.Add("titulototalgeneral", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        GenerarReporte(vcReporte, Solicitud.ListarHistorico(daFecIni, daFecFin, vcNumLin, vcCodIMEI, vcMod, vcEmp, vcEst, vcTip), "MOV_s_SolicitudHistorico", dictCampoFormula, oUsuario)
        Solicitud.Dispose()
    End Sub

    Private Sub GenerarReporteSolicitudPorPeriodoEstadoTipo()

        'Preparando variables
        '--------------------
        Dim daFecIni As String = Request.QueryString("daFecIni")
        Dim daFecFin As String = Request.QueryString("daFecFin")
        Dim inEst As Integer = Convert.ToInt32(Request.QueryString("inEst"))
        Dim inTipSol As Integer = Convert.ToInt32(Request.QueryString("inTipSol"))

        If daFecIni <> String.Empty AndAlso daFecIni <> "NaN" Then
            Dim daFecha As DateTime = Convert.ToDateTime(daFecIni)
            daFecIni = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
        Else
            daFecIni = Now.Year & "0101"
        End If
        If daFecFin <> String.Empty AndAlso daFecFin <> "NaN" Then
            Dim daFecha As DateTime = Convert.ToDateTime(daFecFin)
            daFecFin = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
        Else
            daFecFin = Now.Year & Now.Month.ToString("D2") & Now.Day.ToString("D2")
        End If
        '--------------------

        Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Solicitud_PorPeriodoEstadoTipo.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Solicitudes'")
        dictCampoFormula.Add("titulo", "'Agrupadas por Estado'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        GenerarReporte(vcReporte, Solicitud.ReportePorPeriodoEstadoTipo(daFecIni, daFecFin, inEst, inTipSol), "MOV_s_Solicitud_Reporte_PorPeriodoEstadoTipo", dictCampoFormula, oUsuario)
        Solicitud.Dispose()
    End Sub

    ''JHERRERA 20140822 - Agregado
    'Private Sub GenerarReporte_Solicitud_AutorizacionDescuento()
    '    'Preparando variables
    '    '--------------------
    '    Dim inIdSolicitud As Integer = Convert.ToInt32("0" + Request.QueryString("inIdSolicitud"))
    '    'Dim daFecIni As String = Request.QueryString("daFecIni")
    '    'Dim daFecFin As String = Request.QueryString("daFecFin")
    '    'Dim inEst As Integer = Convert.ToInt32(Request.QueryString("inEst"))
    '    'Dim inTipSol As Integer = Convert.ToInt32(Request.QueryString("inTipSol"))

    '    'If daFecIni <> String.Empty AndAlso daFecIni <> "NaN" Then
    '    '    Dim daFecha As DateTime = Convert.ToDateTime(daFecIni)
    '    '    daFecIni = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
    '    'Else
    '    '    daFecIni = Now.Year & "0101"
    '    'End If
    '    'If daFecFin <> String.Empty AndAlso daFecFin <> "NaN" Then
    '    '    Dim daFecha As DateTime = Convert.ToDateTime(daFecFin)
    '    '    daFecFin = daFecha.Year & daFecha.Month.ToString("D2") & daFecha.Day.ToString("D2")
    '    'Else
    '    '    daFecFin = Now.Year & Now.Month.ToString("D2") & Now.Day.ToString("D2")
    '    'End If
    '    '--------------------

    '    Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
    '    Dim dictCampoFormula As New Dictionary(Of String, String)
    '    Dim vcReporte As String = "Reportes/Adm_Rpt_Solicitud_AutorizacionDescuento.rpt"

    '    dictCampoFormula.Add("tipotelefonia", "''")
    '    dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
    '    dictCampoFormula.Add("subtitulo1", "'Reporte de Solicitudes'")
    '    dictCampoFormula.Add("titulo", "'Agrupadas por Estado'")
    '    dictCampoFormula.Add("subtitulo2", "''")
    '    dictCampoFormula.Add("periodo", "''")
    '    dictCampoFormula.Add("tituloperiodo", "''")
    '    dictCampoFormula.Add("titulsucursal", "'Sucursal'")
    '    dictCampoFormula.Add("titulototal", "''")
    '    dictCampoFormula.Add("titulohora", "'Hora'")
    '    dictCampoFormula.Add("titulofecha", "'Fecha'")
    '    dictCampoFormula.Add("tituloemisor", "'Emisor'")
    '    dictCampoFormula.Add("tituloempresa", "'Empresa'")

    '    GenerarReporte(vcReporte, Solicitud.Reporte_AutorizacionDescuento(inIdSolicitud), "MOV_s_Solicitud_Reporte_AutorizacionDescuento", dictCampoFormula, oUsuario)
    '    Solicitud.Dispose()

    'End Sub

    '-------------

    'MOV_ModeloDispositivo
    '---------------------
    Private Sub GenerarReporteModeloDispositivoAgrupadoPorTipo(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_ModeloDispositivo_AgrupadoPorTipo.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Modelos Dispositivos'")
        dictCampoFormula.Add("titulo", "'Agrupados por Tipo'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim dsDatos As DataSet = ModeloDispositivo.ReporteAgrupadoPorTipo(vcQuery)
        ModeloDispositivo.Dispose()

        GenerarReporte(vcReporte, dsDatos, "MOV_s_ModeloDispositivo_Reporte_AgrupadoPorTipo", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteModeloDispositivoAgrupadoPorGrupo(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_ModeloDispositivo_AgrupadoPorGrupo.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Modelos'")
        dictCampoFormula.Add("titulo", "'Agrupados por Grupos'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim dsDatos As DataSet = ModeloDispositivo.ReporteAgrupadoPorGrupo(vcQuery)
        ModeloDispositivo.Dispose()

        GenerarReporte(vcReporte, dsDatos, "MOV_s_ModeloDispositivo_Reporte_AgrupadoPorGrupo", dictCampoFormula, oUsuario)
    End Sub
    '---------------------

    'MOV_Linea
    '---------
    Private Sub GenerarReporteLineaAgrupadoPorCCO(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Linea_AgrupadoPorCCO.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Líneas'")
        dictCampoFormula.Add("titulo", "'Agrupados por Centros de Costo'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 0, "", strFiltros)

        Dim dtDatos As DataSet = Linea.ReporteAgrupadoPorCCO(vcQuery)
        Linea.Dispose()

        GenerarReporte(vcReporte, dtDatos, "MOV_s_Linea_Reporte_AgrupadoPorCCO", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteLineaAgrupadoPorEmpleado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Linea_AgrupadoPorEmpleado.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Líneas'")
        dictCampoFormula.Add("titulo", "'Agrupadas por Empleado'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 0, "", strFiltros)

        Dim dtDatos As DataSet = Linea.ReporteAgrupadoPorEmpleado(vcQuery)
        Linea.Dispose()

        GenerarReporte(vcReporte, dtDatos, "MOV_s_Linea_Reporte_AgrupadoPorEmpleado", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteLineaAgrupadoPorEstado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Linea_AgrupadoPorEstado.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Líneas'")
        dictCampoFormula.Add("titulo", "'Agrupadas por Estado'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 0, "", strFiltros)

        Dim dtDatos As DataSet = Linea.ReporteAgrupadoPorEstado(vcQuery)
        Linea.Dispose()

        GenerarReporte(vcReporte, dtDatos, "MOV_s_Linea_Reporte_AgrupadoPorEstado", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteLineaDistribucionBolsa(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Linea_DistribucionBolsa.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Líneas'")
        dictCampoFormula.Add("titulo", "'Distribución de Bolsa'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim dtDatos As DataSet = Linea.ReporteDistribucionBolsa(vcQuery)
        Linea.Dispose()

        GenerarReporte(vcReporte, dtDatos, "MOV_s_Linea_Reporte_DistribucionBolsa", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteLineaHistoricos(ByVal oHistorico As ENT_MOV_Historicos, ByVal vcTipoReporteHistoricos As String)
        Dim Historico As New BL_MOV_Historico(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Linea_Historicos.rpt"

        If vcTipoReporteHistoricos = "1" Then
            dictCampoFormula.Add("tipotelefonia", "''")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "'Reporte de Líneas Historicas'")
            dictCampoFormula.Add("titulo", "'Agrupadas por Líneas'")
            dictCampoFormula.Add("subtitulo2", "''")
            dictCampoFormula.Add("periodo", "''")
            dictCampoFormula.Add("tituloperiodo", "''")
            dictCampoFormula.Add("titulsucursal", "'Sucursal'")
            dictCampoFormula.Add("titulototal", "''")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")
        ElseIf vcTipoReporteHistoricos = "2" Then
            dictCampoFormula.Add("tipotelefonia", "''")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "'Reporte Historicos de Asignaciones '")
            dictCampoFormula.Add("titulo", "'Agrupadas por Líneas'")
            dictCampoFormula.Add("subtitulo2", "''")
            dictCampoFormula.Add("periodo", "''")
            dictCampoFormula.Add("tituloperiodo", "''")
            dictCampoFormula.Add("titulsucursal", "'Sucursal'")
            dictCampoFormula.Add("titulototal", "''")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")
        End If

        'Dim dtDatos As DataSet = Linea.ReporteHistoricos(oHistorico, vcCodInt)
        Dim dtDatos As DataSet = Historico.ReporteLineasHistoricos(oHistorico, vcCodInt, vcTipoReporteHistoricos)
        Linea.Dispose()
        Historico.Dispose()
        GenerarReporte(vcReporte, dtDatos, "MOV_s_Linea_Reporte_Historicos", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteDispositivosHistoricos(ByVal oHistorico As ENT_MOV_Historicos, ByVal vcTipoReporteHistoricos As String)
        Dim Historico As New BL_MOV_Historico(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Dispositivos_Historicos.rpt"

        If vcTipoReporteHistoricos = "1" Then
            dictCampoFormula.Add("tipotelefonia", "''")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "'Reporte de Dispositivos Historicas'")
            dictCampoFormula.Add("titulo", "'Agrupadas por Dispositivos'")
            dictCampoFormula.Add("subtitulo2", "''")
            dictCampoFormula.Add("periodo", "''")
            dictCampoFormula.Add("tituloperiodo", "''")
            dictCampoFormula.Add("titulsucursal", "'Sucursal'")
            dictCampoFormula.Add("titulototal", "''")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")
        ElseIf vcTipoReporteHistoricos = "2" Then
            dictCampoFormula.Add("tipotelefonia", "''")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "'Reporte de Historicos de Asignaciones'")
            dictCampoFormula.Add("titulo", "'Agrupadas por Dispositivos'")
            dictCampoFormula.Add("subtitulo2", "''")
            dictCampoFormula.Add("periodo", "''")
            dictCampoFormula.Add("tituloperiodo", "''")
            dictCampoFormula.Add("titulsucursal", "'Sucursal'")
            dictCampoFormula.Add("titulototal", "''")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")
        End If
        'Dim ds As DataSet = Dispositivo.ReporteHistoricos(oHistorico, vcCodInt)
        Dim ds As DataSet = Historico.ReporteDispositivoHistoricos(oHistorico, vcCodInt, vcTipoReporteHistoricos)
        Dispositivo.Dispose()
        Historico.Dispose()
        GenerarReporte(vcReporte, ds, "MOV_s_Dispositivos_Reporte_Historicos", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteLineaAgrupadoPorArea(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Linea_AgrupadoPorArea.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Líneas'")
        'dictCampoFormula.Add("titulo", "'Agrupados por Centros de Costo'")
        dictCampoFormula.Add("titulo", "'Agrupados por Organización'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportePorArea(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 0, "", strFiltros)

        Dim dtDatos As DataSet = Linea.ReporteAgrupadoPorArea(vcQuery)
        Linea.Dispose()

        GenerarReporte(vcReporte, dtDatos, "MOV_s_Linea_Reporte_AgrupadoPorArea", dictCampoFormula, oUsuario)
    End Sub

    '---------

    'MOV_Cuenta
    '----------
    Private Sub GenerarReporteCuentaDistribucionBolsa(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Cuenta_DistribucionBolsa.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Cuentas'")
        dictCampoFormula.Add("titulo", "'Distribución de Bolsa'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim dsDatos As DataSet = Cuenta.ReporteDistribucionBolsa(vcQuery)
        Cuenta.Dispose()

        GenerarReporte(vcReporte, dsDatos, "MOV_s_Cuenta_Reporte_DistribucionBolsa", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteCuentaLineasAgrupadas(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Cuenta_LineasAgrupadas.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Cuentas'")
        dictCampoFormula.Add("titulo", "'Líneas Agrupadas'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim dsDatos As DataSet = Cuenta.ReporteLineasAgrupadas(vcQuery)
        Cuenta.Dispose()

        GenerarReporte(vcReporte, dsDatos, "MOV_s_Cuenta_Reporte_LineasAgrupadas", dictCampoFormula, oUsuario)
    End Sub
    '----------

    'MOV_Plan
    '--------
    Private Sub GenerarReportePlanServiciosAgrupados(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim dictCampoFormula As New Dictionary(Of String, String)
            Dim vcReporte As String = "Reportes/Adm_Rpt_Plan_ServiciosAgrupados.rpt"

            dictCampoFormula.Add("tipotelefonia", "''")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "'Reporte de Planes'")
            dictCampoFormula.Add("titulo", "'Servicios Agrupados'")
            dictCampoFormula.Add("subtitulo2", "''")
            dictCampoFormula.Add("periodo", "''")
            dictCampoFormula.Add("tituloperiodo", "''")
            dictCampoFormula.Add("titulsucursal", "'Sucursal'")
            dictCampoFormula.Add("titulototal", "''")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")

            Dim strFiltros As String = FiltrosPorTablas(vcTab)
            Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

            GenerarReporte(vcReporte, Plan.ReporteServiciosAgrupados(vcQuery), "MOV_s_Plan_Reporte_ServiciosAgrupados", dictCampoFormula, oUsuario)

        Catch ex As Exception
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
        End Try

    End Sub

    Private Sub GenerarReportePlanLineasAgrupadas(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Plan As BL_MOV_Plan = Nothing

        Try
            Plan = New BL_MOV_Plan(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim dictCampoFormula As New Dictionary(Of String, String)
            Dim vcReporte As String = "Reportes/Adm_Rpt_Plan_LineasAgrupadas.rpt"

            dictCampoFormula.Add("tipotelefonia", "''")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "'Reporte de Planes'")
            dictCampoFormula.Add("titulo", "'Líneas Agrupadas'")
            dictCampoFormula.Add("subtitulo2", "''")
            dictCampoFormula.Add("periodo", "''")
            dictCampoFormula.Add("tituloperiodo", "''")
            dictCampoFormula.Add("titulsucursal", "'Sucursal'")
            dictCampoFormula.Add("titulototal", "''")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")

            Dim strFiltros As String = FiltrosPorTablas(vcTab)
            Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

            GenerarReporte(vcReporte, Plan.ReporteLineasAgrupadas(vcQuery), "MOV_s_Plan_Reporte_LineasAgrupadas", dictCampoFormula, oUsuario)

        Catch ex As Exception
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
        End Try

    End Sub
    '--------

    'MOV_SolicitudDespacho
    '---------------------
    Private Sub GenerarReporteSolicitudDespachoCargo(ByVal Valor As String)

        Dim SolicitudDespacho As BL_MOV_Solicitud = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Parametros As BL_MOV_Parametros = Nothing

        Try


            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            SolicitudDespacho = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Parametros = New BL_MOV_Parametros(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dictCampoFormula As New Dictionary(Of String, String)
            Dim vcReporte As String = ""
            Dim vcEsquema As String = ""
            Dim vcEsquema1 As String = ""
            Dim vcEsquemaSubReport As String = ""
            Dim dsDatos As New DataSet
            Dim dtCliente As DataTable = Nothing

            vcReporte = "Reportes/Adm_Rpt_DespachoCargo.rpt"
            vcEsquema = "GEN_s_Cliente_PorCodigo"
            vcEsquema1 = "MOV_s_SolicitudesDespachoReporte"
            Dim lstParametro As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("SD1")

            ''crConsulta.Report.FileName = vcReporte

            Dim ds As DataSet = SolicitudDespacho.ListarDespachoReporte(Valor)
            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            dsDatos.Tables.Add(ds.Tables(0).Copy)
            dsDatos.Tables(0).TableName = vcEsquema1
            dsDatos.Tables.Add(dtCliente.Copy)
            dsDatos.Tables(1).TableName = vcEsquema

            ''crConsulta.ReportDocument.SetDataSource(dsDatos)

            dictCampoFormula.Add("subtitulo1", "'Cargo de entrega de equipos'")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("titulopersona", "'Sr(a):'")
            dictCampoFormula.Add("textoentrega", "'" & lstParametro.Item(0).Valor & "'")
            dictCampoFormula.Add("tituloentregado", "'Entregado por'")
            dictCampoFormula.Add("titulorecibido", "'Recibido por'")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")
            dictCampoFormula.Add("cuerpomensaje", "'" & lstParametro.Item(1).Valor & "'")

            ''For Each objFormula As FormulaFieldDefinition In crConsulta.ReportDocument.DataDefinition.FormulaFields
            ''    Try
            ''        objFormula.Text = dictCampoFormula(objFormula.Name.ToLower)
            ''    Catch ex As Exception

            ''    End Try
            ''Next
            ''crConsulta.ReportDocument.PrintToPrinter(1, False, 0, 0)
            dvReporte.Style("display") = "none"


        Catch ex As Exception
        Finally
            If SolicitudDespacho IsNot Nothing Then SolicitudDespacho.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Parametros IsNot Nothing Then Parametros.Dispose()
        End Try

    End Sub
    '---------------------

    'MOV_Dispositivo
    '---------------
    Private Sub GenerarReporteDispositivoAgrupadoPorModelo(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Dispositivo_AgrupadoPorModelo.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Dispositivos'")
        dictCampoFormula.Add("titulo", "'Agrupados por Modelo'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim ds As DataSet = Dispositivo.ReporteAgrupadoPorModelo(vcQuery)
        Dispositivo.Dispose()

        GenerarReporte(vcReporte, ds, "MOV_s_Dispositivo_Reporte_AgrupadoPorModelo", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteDispositivoAgrupadoPorEstado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Dispositivo_AgrupadoPorEstado.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Dispositivos'")
        dictCampoFormula.Add("titulo", "'Agrupados por Estado'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim ds As DataSet = Dispositivo.ReporteAgrupadoPorEstado(vcQuery)
        Dispositivo.Dispose()

        GenerarReporte(vcReporte, ds, "MOV_s_Dispositivo_Reporte_AgrupadoPorEstado", dictCampoFormula, oUsuario)
    End Sub

    Private Sub GenerarReporteDispositivoAgrupadoPorEmpleado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = "Reportes/Adm_Rpt_Dispositivo_AgrupadoPorEmpleado.rpt"

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Dispositivos'")
        dictCampoFormula.Add("titulo", "'Agrupados por Empleado'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim ds As DataSet = Dispositivo.ReporteAgrupadoPorEmpleado(vcQuery)
        Dispositivo.Dispose()

        GenerarReporte(vcReporte, ds, "MOV_s_Dispositivo_Reporte_AgrupadoPorEmpleado", dictCampoFormula, oUsuario)
    End Sub
    '---------------

    Private Sub GenerarReporte(ByVal vcNombreReporte As String, ByVal dsDatosReporte As DataSet, ByVal vcEsquema As String, ByVal dictCampoFormula As Dictionary(Of String, String),
                               ByVal oUsuario As ENT_SEG_Usuario)

        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Cultura As BL_GEN_Cultura = Nothing
        Try

            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            Cultura = New BL_GEN_Cultura(oUsuario.IdCliente)

            ''crConsulta.Report.FileName = vcNombreReporte
            Dim dsDatos As New DataSet
            Dim dtCliente As DataTable = Nothing
            Dim dtCultura As DataTable = Cultura.ObtenerCulturaxIdCliente()
            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            If Not IsNothing(dsDatosReporte.Tables(0)) And dsDatosReporte.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables.Add(dsDatosReporte.Tables(0).Copy)
                dsDatos.Tables(0).TableName = vcEsquema
                dsDatos.Tables.Add(dtCliente.Copy)
                dsDatos.Tables(1).TableName = "GEN_s_Cliente_PorCodigo"
                dsDatos.Tables.Add(dtCultura.Copy)
                dsDatos.Tables(2).TableName = "GEN_s_Cultura_x_IdCliente"

                ''crConsulta.ReportDocument.SetDataSource(dsDatos)
                ''For Each objFormula As FormulaFieldDefinition In crConsulta.ReportDocument.DataDefinition.FormulaFields
                ''    Try
                ''        objFormula.Text = dictCampoFormula(objFormula.Name.ToLower)
                ''    Catch ex As Exception

                ''    End Try
                ''Next
            Else
                ''crvConsulta.Visible = False
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
        Finally

            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Cultura IsNot Nothing Then Cultura.Dispose()
        End Try

    End Sub

    Private Sub GenerarReportePedido(ByVal blnSeg As Boolean, ByVal inIdCam As String, ByVal vcNomSit As String, ByVal vcFecIni As String, ByVal vcFecFin As String, _
                                     ByVal vcCodEmp As String, ByVal vcCodAre As String, ByVal vcCodCCO As String, ByVal vcCodCue As String, ByVal vcIdEst As String, _
                                     ByVal vcCodPed As String, ByVal inPosicion As Integer)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporte As String = ""

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Pedidos'")
        If blnSeg Then
            dictCampoFormula.Add("titulo", "'Seguimiento'")
        Else
            dictCampoFormula.Add("titulo", "'Detalles'")
        End If
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        vcFecIni = If(vcFecIni <> "", vcFecIni.Substring(6, 4) + vcFecIni.Substring(3, 2) + vcFecIni.Substring(0, 2) + " 00:00:00", "")
        vcFecFin = If(vcFecFin <> "", vcFecFin.Substring(6, 4) + vcFecFin.Substring(3, 2) + vcFecFin.Substring(0, 2) + " 23:59:59", "")
        vcCodEmp = If(vcCodEmp = "", "0", vcCodEmp)
        vcCodAre = If(vcCodAre = "", "0", vcCodAre)

        Dim vcHayCue As String = "0"
        If vcCodCue = "-1" Then
            vcCodCue = "''"
        Else
            vcCodCue = vcCodCue.Replace("-1,", "").Replace(vbLf, "").Replace(",", "','")
            vcHayCue = "1"
        End If

        Dim vcHayEst As String = "0"
        If vcIdEst = "-1" Then
            vcIdEst = ""
        Else
            If (vcIdEst.Substring(0, 2) = -1) Then
                vcIdEst = vcIdEst.Substring(3)
            End If

            vcIdEst = vcIdEst.Replace(vbLf, "")
            vcHayEst = "1"
        End If

        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim CampanaPedido As BL_MOV_CAM_CampanaPedido = Nothing
        Try
            CampanaPedido = New BL_MOV_CAM_CampanaPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDatosReporte As DataSet = CampanaPedido.ListarParaExpSeg(inIdCam, vcNomSit, vcFecIni, vcFecFin, vcCodEmp, Convert.ToInt32(vcCodAre), _
                                                                            vcCodCCO, vcCodCue, vcHayCue, vcIdEst, vcHayEst, oCultura, blnSeg, vcCodPed)

            If blnSeg Then
                vcReporte = "Reportes/Cam_Rpt_PedidoDetalleSeguimiento.rpt"
                GenerarReportePedidoSeguimiento(dsDatosReporte, vcReporte, oUsuario, dictCampoFormula, inPosicion)
            Else
                vcReporte = "Reportes/Cam_Rpt_PedidoDetalle.rpt"
                GenerarReportePedidoDetalle(dsDatosReporte, vcReporte, oUsuario, dictCampoFormula, inPosicion)
            End If


        Catch ex As Exception
        Finally
            If CampanaPedido IsNot Nothing Then CampanaPedido.Dispose()
        End Try

    End Sub

    Private Sub GenerarReportePedidoSeguimiento(ByVal dsDatosReporte As DataSet, ByVal vcReporte As String, ByVal oUsuario As ENT_SEG_Usuario, ByVal dictCampoFormula As Dictionary(Of String, String), ByVal inPosicion As Integer)

        ''crConsulta.Report.FileName = vcReporte

        Dim Cliente As BL_GEN_Cliente = Nothing

        Try
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            Dim dsDatos As New DataSet
            Dim dtCliente As DataTable = Nothing

            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            If Not IsNothing(dsDatosReporte.Tables(0)) And dsDatosReporte.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables.Add(dsDatosReporte.Tables(0).Copy)
                dsDatos.Tables(0).TableName = "MOV_CAM_s_CampanaPedido"
                dsDatos.Tables.Add(dsDatosReporte.Tables(1).Copy)
                dsDatos.Tables(1).TableName = "MOV_CAM_s_CampanaPedidoDetalle"
                dsDatos.Tables.Add(dsDatosReporte.Tables(2).Copy)
                dsDatos.Tables(2).TableName = "MOV_CAM_s_CampanaPedidoSeguimiento"
                dsDatos.Tables.Add(dsDatosReporte.Tables(3).Copy)
                dsDatos.Tables(3).TableName = "MOV_CAM_s_CampanaPedidoDetalleSeguimiento"
                dsDatos.Tables.Add(dtCliente.Copy)
                dsDatos.Tables(4).TableName = "GEN_s_Cliente_PorCodigo"

                ''crConsulta.ReportDocument.SetDataSource(dsDatos)

                If dsDatos.Tables(0).Rows.Count > 0 Then
                    dictCampoFormula.Add("totser", CalcularTotal("MontoTotalServicios", dsDatos.Tables(0)))
                    dictCampoFormula.Add("totnoser", CalcularTotal("MontoTotalNoServicios", dsDatos.Tables(0)))
                End If

                ''For Each objFormula As FormulaFieldDefinition In crConsulta.ReportDocument.DataDefinition.FormulaFields
                ''    Try
                ''        objFormula.Text = dictCampoFormula(objFormula.Name.ToLower)
                ''    Catch ex As Exception

                ''    End Try
                ''Next
                If inPosicion = 1 Then
                    ''Try
                    ''    crConsulta.ReportDocument.ExportToHttpResponse(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat, Response, True, crConsulta.ClientID.ToString())
                    ''Catch ex As Exception
                    ''End Try
                End If
            Else
                ''crvConsulta.Visible = False
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If



        Catch ex As Exception

        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()

        End Try

    End Sub

    Private Sub GenerarReportePedidoDetalle(ByVal dsDatosReporte As DataSet, ByVal vcReporte As String, ByVal oUsuario As ENT_SEG_Usuario, ByVal dictCampoFormula As Dictionary(Of String, String), ByVal inPosicion As Integer)

        ''crConsulta.Report.FileName = vcReporte
        Dim Cliente As BL_GEN_Cliente = Nothing

        Try

            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)

            Dim dsDatos As New DataSet
            Dim dtCliente As DataTable = Nothing

            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            If Not IsNothing(dsDatosReporte.Tables(0)) And dsDatosReporte.Tables(0).Rows.Count > 0 Then
                dsDatos.Tables.Add(dsDatosReporte.Tables(0).Copy)
                dsDatos.Tables(0).TableName = "MOV_CAM_s_CampanaPedido"
                dsDatos.Tables.Add(dsDatosReporte.Tables(1).Copy)
                dsDatos.Tables(1).TableName = "MOV_CAM_s_CampanaPedidoDetalle"
                dsDatos.Tables.Add(dtCliente.Copy)
                dsDatos.Tables(2).TableName = "GEN_s_Cliente_PorCodigo"


                ''crConsulta.ReportDocument.SetDataSource(dsDatos)

                If dsDatos.Tables(0).Rows.Count > 0 Then
                    dictCampoFormula.Add("totser", CalcularTotal("MontoTotalServicios", dsDatos.Tables(0)))
                    dictCampoFormula.Add("totnoser", CalcularTotal("MontoTotalNoServicios", dsDatos.Tables(0)))
                End If

                ''For Each objFormula As FormulaFieldDefinition In crConsulta.ReportDocument.DataDefinition.FormulaFields
                ''    Try
                ''        objFormula.Text = dictCampoFormula(objFormula.Name.ToLower)
                ''    Catch ex As Exception

                ''    End Try
                ''Next
                ''If inPosicion = 1 Then
                ''    Try
                ''        crConsulta.ReportDocument.ExportToHttpResponse(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat, Response, True, crvConsulta.ClientID.ToString())
                ''    Catch ex As Exception
                ''    End Try
                ''End If


            Else
                ''crvConsulta.Visible = False
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If



        Catch ex As Exception

        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try

    End Sub

    Private Function CalcularTotal(ByVal vcNomCol As String, ByVal dtTabla As DataTable) As String
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim colTotal As DataColumn = New DataColumn("Tot_" + vcNomCol, GetType(System.Int32))
        colTotal.Expression = "Convert([" + vcNomCol + "], 'System.Decimal')"
        dtTabla.Columns.Add(colTotal)

        Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)
        Return "'" + Convert.ToDecimal(dtTabla.Compute("Sum(Tot_" + vcNomCol + ")", "")).ToString(strForNum) + "'"

    End Function

    Private Sub ExportarExcel(ByVal vcTab As String, ByVal vcFiltro As String, ByVal inTipOri As String, ByVal inFilReg As Integer)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))

        Dim dsDetalle As DataSet = Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, inFilReg)
        Campo.Dispose()

        If vcTab = "CFG_LogCorreo" Then
            'Quitar Columna de Mensaje...
            If dsDetalle.Tables(0).Columns.Contains("vcMen") Then
                dsDetalle.Tables(0).Columns.Remove("vcMen")
            End If
            For Each objCampo In lstCampo
                If objCampo.vcDes = "Mensaje" Then
                    lstCampo.Remove(objCampo)
                    Exit For
                End If
            Next
        End If

        ExportDataTableToExcel(dsDetalle.Tables(0), vcTab, lstCampo, 0)
    End Sub

    'Agreagdo 11-11-2014 wapumayta
    Public Sub ExportDataSetToExcel(ByVal dataset As DataSet, ByVal name As String, ByVal lstCampos As List(Of List(Of ENT_ENT_Campo)), ByVal esDuracion As Integer)
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim attachment As String = "attachment; filename=" & name & ".xls"

        Dim context As HttpContext = HttpContext.Current

        'context.Response.ClearContent()
        'context.Response.AddHeader("content-disposition", attachment)
        'context.Response.ContentType = "application/vnd.ms-excel"

        Dim strContenido As New StringBuilder()


        Dim tab As String = ""
        Dim RepFecha As Integer = 0
        'context.Response.ContentEncoding = Encoding.Default
        Dim table As DataTable
        Dim lstCampo As List(Of ENT_ENT_Campo)
        For t = 0 To dataset.Tables.Count - 1
            table = dataset.Tables(t)
            lstCampo = lstCampos(t)

            'context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>")
            strContenido.Append("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>")

            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)

            'NOMBRE DE TABLA
            'context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
            strContenido.Append(vbTab + "<tr style='font-weight:bolder;'>")
            'context.Response.Write("<td colspan='" + lstCampo.Count.ToString() + "' style='background-color: #66CCFF; vertical-align:middle;' align='center'>")
            strContenido.Append("<td colspan='" + lstCampo.Count.ToString() + "' style='background-color: #66CCFF; vertical-align:middle;' align='center'>")
            'context.Response.Write(table.TableName)
            strContenido.Append(table.TableName)
            'context.Response.Write("</td>")
            strContenido.Append("</td>")

            'context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
            strContenido.Append(vbTab + "<tr style='font-weight:bolder;'>")
            'context.Response.Write(vbLf + vbTab + vbTab)
            strContenido.Append(vbLf + vbTab + vbTab)

            For Each oCampo As ENT_ENT_Campo In lstCampo
                'context.Response.Write("<td style='background-color: #66CCFF;'>")
                strContenido.Append("<td style='background-color: #66CCFF;'>")

                If oCampo.vcDes = "Fecha" Then
                    RepFecha = 1
                End If
                'context.Response.Write(oCampo.vcDes)
                strContenido.Append(oCampo.vcDes)
                'context.Response.Write("</td>")
                strContenido.Append("</td>")
            Next
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)
            'context.Response.Write(vbTab + "</tr>")
            strContenido.Append(vbTab + "</tr>")
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)

            For Each dr As DataRow In table.Rows
                'context.Response.Write(vbTab + "<tr>")
                strContenido.Append(vbTab + "<tr>")
                'context.Response.Write(vbLf + vbTab + vbTab)
                strContenido.Append(vbLf + vbTab + vbTab)

                For i = 0 To table.Columns.Count - 1
                    Dim cont As Boolean = False
                    Dim ValVer As String = "", ValFal As String = ""
                    For Each oCampo As ENT_ENT_Campo In lstCampo
                        If (table.Columns(i).ToString() = oCampo.vcNom And oCampo.inTipDat = 6) Then
                            ValVer = oCampo.vcValVer.ToString()
                            ValFal = oCampo.vcValFal.ToString()
                            cont = True
                        End If
                    Next

                    If (cont = True) Then
                        If (ValVer.ToString() = "" And ValFal.ToString() = "") Then
                            'context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            strContenido.Append("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            'context.Response.Write(IIf(dr(i).ToString() = "True", "Activo", "Baja"))
                            strContenido.Append(IIf(dr(i).ToString() = "True", "Activo", "Baja"))
                            'context.Response.Write("</td>")
                            strContenido.Append("</td>")
                        Else
                            'context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            strContenido.Append("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            'context.Response.Write(IIf(dr(i).ToString() = "True", ValVer, ValFal))
                            strContenido.Append(IIf(dr(i).ToString() = "True", ValVer, ValFal))
                            'context.Response.Write("</td>")
                            strContenido.Append("</td>")
                        End If
                    Else
                        If (table.Columns(i).DataType.FullName = "System.Decimal" Or table.Columns(i).DataType.FullName = "System.Int64" Or table.Columns(i).DataType.FullName = "System.Int32") Then
                            'context.Response.Write("<td>")
                            strContenido.Append("<td>")
                        Else
                            'context.Response.Write("<td>&nbsp;")
                            strContenido.Append("<td>&nbsp;")
                        End If

                        If RepFecha = 1 Then
                            If i > 0 Then
                                If esDuracion = 1 Then
                                    'context.Response.Write(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                    strContenido.Append(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                Else
                                    'context.Response.Write(dr(i).ToString())
                                    strContenido.Append(dr(i).ToString())
                                End If
                            Else
                                'context.Response.Write(dr(i).ToString())
                                strContenido.Append(dr(i).ToString())
                            End If
                            'context.Response.Write("</td>")
                            strContenido.Append("</td>")
                        Else
                            If i > 0 Then
                                If esDuracion = 1 Then
                                    If (table.TableName = "SUMARIO") Then
                                        'context.Response.Write(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                        'context.Response.Write(UtilitarioWeb.DevuelveNumeroFormateado((Convert.ToDecimal(dr(i)) / 60).ToString(), oCultura))
                                        If dr(i).ToString.IndexOf(":") <> -1 Then
                                            'context.Response.Write(dr(i).ToString())
                                            strContenido.Append(dr(i).ToString())
                                        Else
                                            'context.Response.Write(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                            strContenido.Append(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                        End If
                                    Else
                                        'context.Response.Write(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                        If dr(i).ToString.IndexOf(":") <> -1 Then
                                            'context.Response.Write(dr(i).ToString())
                                            strContenido.Append(dr(i).ToString())
                                        Else
                                            'context.Response.Write(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                            strContenido.Append(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                        End If
                                    End If
                                Else
                                    If table.Columns(i).DataType.FullName = "System.Decimal" Then
                                        'context.Response.Write(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                        strContenido.Append(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                    Else
                                        'context.Response.Write(dr(i).ToString())
                                        strContenido.Append(dr(i).ToString())
                                    End If
                                End If
                            Else
                                'context.Response.Write(dr(i).ToString())
                                strContenido.Append(dr(i).ToString())
                            End If
                            'context.Response.Write("</td>")
                            strContenido.Append("</td>")
                        End If
                    End If
                Next
                'context.Response.Write(vbLf)
                strContenido.Append(vbLf)
                'context.Response.Write(vbTab + "</tr>")
                strContenido.Append(vbTab + "</tr>")
                'context.Response.Write(vbLf)
                strContenido.Append(vbLf)
            Next
            'context.Response.Write("</table>")
            strContenido.Append("</table>")
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)
            'context.Response.Write("<table><tr><td></td></tr></table>")
            strContenido.Append("<table><tr><td></td></tr></table>")
        Next


        Dim Dominio As String = Session("IdDominio").ToString()
        Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
        Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/").ToString()

        If Not System.IO.Directory.Exists(vcRutaTMP) Then
            System.IO.Directory.CreateDirectory(vcRutaTMP)
        End If

        Dim writer As StreamWriter = File.CreateText(vcRutaTMP & name & ".xls")
        writer.WriteLine(strContenido)
        writer.Close()

        '=================================================================================================================================
        name = UtilitarioWeb.CorrijeNombreArchivo(name)
        Dim destPath As String = UtilitarioWeb.ComprimeArchivo(vcRutaTMP + attachment, vcRutaTMP, name, name, "xlsx", False)
        '=================================================================================================================================

        Dim fi As FileInfo = New FileInfo(destPath)
        If (fi.Exists) Then
            HttpContext.Current.Response.ClearHeaders()
            HttpContext.Current.Response.ClearContent()
            HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
            HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
            HttpContext.Current.Response.ContentType = "application/octet-stream"
            HttpContext.Current.Response.TransmitFile(fi.FullName)
            HttpContext.Current.Response.Flush()
        End If

        'context.Response.End()
    End Sub

    Public Sub ExportDataTableToExcel(ByVal table As DataTable, ByVal name As String, ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal esDuracion As Integer, Optional ByVal formatoDuracion As Integer = 0, Optional ByVal oCultura As ENT_GEN_Cultura = Nothing)
        Try
            Dim attachment As String = "attachment; filename=" & name & ".xls"
            Dim dashboard As BL_DashBoard = Nothing
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim context As HttpContext = HttpContext.Current
            Dim dbContador As Double

            'context.Response.ClearContent()
            'context.Response.AddHeader("content-disposition", attachment)
            'context.Response.ContentType = "application/vnd.ms-excel"

            Dim tab As String = ""
            Dim RepFecha As Integer = 0
            Dim strcontenido As New StringBuilder()

            'context.Response.ContentEncoding = Encoding.Default

            'context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>")
            strcontenido.Append("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>")
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)

            'context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
            strcontenido.Append(vbTab + "<tr style='font-weight:bolder;'>")
            'context.Response.Write(vbLf + vbTab + vbTab)
            strcontenido.Append(vbLf + vbTab + vbTab)

            For Each oCampo As ENT_ENT_Campo In lstCampo
                'context.Response.Write("<td style='background-color: #66CCFF;'>")
                strcontenido.Append("<td style='background-color: #66CCFF;'>")

                If oCampo.vcDes = "Fecha" Then
                    RepFecha = 1
                End If
                'context.Response.Write(oCampo.vcDes)
                strcontenido.Append("&nbsp;" & oCampo.vcDes)
                'context.Response.Write("</td>")
                strcontenido.Append("</td>")
            Next
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)
            'context.Response.Write(vbTab + "</tr>")
            strcontenido.Append(vbTab + "</tr>")
            'context.Response.Write(vbLf)
            strcontenido.Append(vbLf)

            For Each dr As DataRow In table.Rows
                dbContador = 0
                'context.Response.Write(vbTab + "<tr>")
                strcontenido.Append(vbTab + "<tr>")
                'context.Response.Write(vbLf + vbTab + vbTab)
                strcontenido.Append(vbLf + vbTab + vbTab)
                For i = 0 To table.Columns.Count - 1
                    Dim cont As Boolean = False
                    Dim ValVer As String = "", ValFal As String = ""
                    For Each oCampo As ENT_ENT_Campo In lstCampo
                        If (table.Columns(i).ToString() = oCampo.vcNom And oCampo.inTipDat = 6) Then
                            ValVer = oCampo.vcValVer.ToString()
                            ValFal = oCampo.vcValFal.ToString()
                            cont = True
                        End If
                    Next

                    If (cont = True) Then
                        If (ValVer.ToString() = "" And ValFal.ToString() = "") Then
                            'context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            strcontenido.Append("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            'context.Response.Write(IIf(dr(i).ToString() = "True", "Activo", "Baja"))
                            strcontenido.Append(IIf(dr(i).ToString() = "True", "Activo", "Baja"))
                            'context.Response.Write("</td>")
                            strcontenido.Append("</td>")
                        Else
                            'context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            strcontenido.Append("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            'context.Response.Write(IIf(dr(i).ToString() = "True", ValVer, ValFal))
                            strcontenido.Append(IIf(dr(i).ToString() = "True", ValVer, ValFal))
                            'context.Response.Write("</td>")
                            strcontenido.Append("</td>")
                        End If
                    Else
                        'context.Response.Write("<td>&nbsp;")
                        '18/07/2014 - wapumayta (tfs 1516)
                        If (table.Columns(i).DataType.FullName = "System.Decimal" Or table.Columns(i).DataType.FullName = "System.Int64" Or table.Columns(i).DataType.FullName = "System.Int32") Then
                            'context.Response.Write("<td>")
                            strcontenido.Append("<td>")
                        Else
                            'context.Response.Write("<td>&nbsp;")
                            strcontenido.Append("<td>&nbsp;")
                        End If

                        'context.Response.Write(dr(i).ToString())
                        'context.Response.Write("</td>")
                        If RepFecha = 1 Then
                            'context.Response.Write("<td>")
                            If i > 0 Then
                                If esDuracion = 1 Then
                                    If formatoDuracion = 0 Then
                                        'context.Response.Write(dr(i).ToString())
                                        strcontenido.Append(dr(i).ToString())
                                    ElseIf formatoDuracion = 1 Then
                                        'context.Response.Write(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                        strcontenido.Append(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                    ElseIf formatoDuracion = 2 Then
                                        'context.Response.Write(secondToMin(UInteger.Parse(dr(i).ToString()), False))
                                        strcontenido.Append(secondToMin(UInteger.Parse(dr(i).ToString()), False))
                                    ElseIf formatoDuracion = 3 Then
                                        'context.Response.Write(secondToMin(UInteger.Parse(dr(i).ToString()), True))
                                        strcontenido.Append(secondToMin(UInteger.Parse(dr(i).ToString()), True))
                                    End If
                                Else
                                    'context.Response.Write(dr(i).ToString())
                                    strcontenido.Append(dr(i).ToString())
                                End If
                            Else
                                'context.Response.Write(dr(i).ToString())
                                strcontenido.Append(dr(i).ToString())
                            End If
                            'context.Response.Write("</td>")
                            strcontenido.Append("</td>")
                        Else
                            'context.Response.Write("<td>")
                            If i > 1 Then


                                If esDuracion = 1 Then
                                    'context.Response.Write(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                    If formatoDuracion = 0 Then
                                        If table.Columns(i).ToString() = "Total" Then
                                            'context.Response.Write(dbContador.ToString())
                                            strcontenido.Append(dbContador.ToString())
                                        Else
                                            'context.Response.Write(dr(i).ToString())
                                            strcontenido.Append(dr(i).ToString())
                                        End If
                                    ElseIf formatoDuracion = 1 Then
                                        If table.Columns(i).ToString() = "Total" Then
                                            'context.Response.Write(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dbContador.ToString())))))
                                            strcontenido.Append(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dbContador.ToString())))))
                                        Else
                                            'context.Response.Write(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                            strcontenido.Append(secondToTime(UInteger.Parse(Math.Round(Double.Parse(dr(i).ToString())))))
                                        End If
                                    ElseIf formatoDuracion = 2 Then
                                        If table.Columns(i).ToString() = "Total" Then
                                            'context.Response.Write(secondToMin(UInteger.Parse(dbContador.ToString()), False))
                                            strcontenido.Append(secondToMin(UInteger.Parse(dbContador.ToString()), False))
                                        Else
                                            'context.Response.Write(secondToMin(UInteger.Parse(dr(i).ToString()), False))
                                            strcontenido.Append(secondToMin(UInteger.Parse(dr(i).ToString()), False))
                                        End If
                                    ElseIf formatoDuracion = 3 Then
                                        If table.Columns(i).ToString() = "Total" Then
                                            'context.Response.Write(secondToMin(UInteger.Parse(dbContador.ToString()), True))
                                            strcontenido.Append(secondToMin(UInteger.Parse(dbContador.ToString()), True))
                                        Else
                                            'context.Response.Write(secondToMin(UInteger.Parse(dr(i).ToString()), True))
                                            strcontenido.Append(secondToMin(UInteger.Parse(dr(i).ToString()), True))
                                        End If
                                    End If
                                Else
                                    dashboard = New BL_DashBoard(oUsuario.IdCliente)
                                    'context.Response.Write(dr(i).ToString())
                                    '18/07/2014 - wapumayta (tfs 1516)
                                    If table.Columns(i).DataType.FullName = "System.Decimal" Then
                                        If table.Columns(i).ToString() = "Total" Then
                                            'context.Response.Write(UtilitarioWeb.DevuelveNumeroFormateado(dbContador.ToString(), oCultura))
                                            strcontenido.Append(UtilitarioWeb.DevuelveNumeroFormateado(dbContador.ToString(), oCultura))
                                            'strcontenido.Append(dashboard.ObtenerMontoTotalFormateada(dbContador))
                                        Else
                                            'context.Response.Write(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                            strcontenido.Append(UtilitarioWeb.DevuelveNumeroFormateado(dr(i).ToString(), oCultura))
                                            'strcontenido.Append(dr(i).ToString())
                                        End If
                                    Else
                                        If table.Columns(i).ToString() = "Total" Then
                                            'context.Response.Write(dbContador.ToString())
                                            'strcontenido.Append(dashboard.ObtenerMontoTotalFormateada(dbContador))
                                            strcontenido.Append(UtilitarioWeb.DevuelveNumeroFormateado(dbContador.ToString(), oCultura))
                                        Else
                                            'context.Response.Write(dr(i).ToString())
                                            strcontenido.Append(dr(i).ToString())
                                        End If
                                    End If
                                    dashboard.Dispose()
                                End If
                                If table.Columns(i).ToString() <> "Total" Then
                                    If oCultura Is Nothing OrElse oCultura.vcCodCul.ToString() = "es-PE" Then
                                        dbContador += Convert.ToDouble(UtilitarioWeb.DevuelveNumeroSinFormato(dr(i).ToString()))
                                    Else
                                        'dbContador += Convert.ToDouble(UtilitarioWeb.DevuelveNumero_ToDouble_MultiPais(dr(i).ToString(), oCultura))
                                        dbContador += Convert.ToDouble(dr(i).ToString())
                                    End If

                                End If
                            Else
                                'context.Response.Write(dr(i).ToString())
                                strcontenido.Append(dr(i).ToString())
                            End If
                            'context.Response.Write("</td>")
                            strcontenido.Append("</td>")
                        End If
                    End If
                    '----
                    'If RepFecha = 1 Then
                    '    context.Response.Write("<td>")
                    '    If i > 0 Then
                    '        If esDuracion = 1 Then
                    '            context.Response.Write(secondToTime(UInteger.Parse(dr(i).ToString())))
                    '        Else
                    '            context.Response.Write(dr(i).ToString())
                    '        End If
                    '    Else
                    '        context.Response.Write(dr(i).ToString())
                    '    End If
                    '    context.Response.Write("</td>")
                    'Else
                    '    context.Response.Write("<td>")
                    '    If i > 1 Then
                    '        If esDuracion = 1 Then
                    '            context.Response.Write(secondToTime(UInteger.Parse(dr(i).ToString())))
                    '        Else
                    '            context.Response.Write(dr(i).ToString())
                    '        End If
                    '    Else
                    '        context.Response.Write(dr(i).ToString())
                    '    End If
                    '    context.Response.Write("</td>")
                    'End If
                    '----
                Next
                'context.Response.Write(vbLf)
                strcontenido.Append(vbLf)
                'context.Response.Write(vbTab + "</tr>")
                strcontenido.Append(vbTab + "</tr>")
                'context.Response.Write(vbLf)
                strcontenido.Append(vbLf)
            Next

            'context.Response.Write("</table>")
            strcontenido.Append("</table>")

            'context.Response.End()

            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/").ToString()

            'Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
            '                            "1. Dominio: " & Dominio & " | " & "Usuario: " & Usuario & " | " & "vcRutaTMP: " & vcRutaTMP & " | ",
            '                            "",
            '                            "ADM_REPORTE")

            If Not System.IO.Directory.Exists(vcRutaTMP) Then
                System.IO.Directory.CreateDirectory(vcRutaTMP)
            End If

            name = UtilitarioWeb.CorrijeNombreArchivo(name)
            'Dim writer As StreamWriter = File.CreateText(vcRutaTMP & name & ".xls")
            Dim writer As StreamWriter = New StreamWriter(vcRutaTMP & name & ".xls", False, New UTF8Encoding(True)) 'ECONDEÑA   22/08/2016
            'Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
            '                            "2. Dominio: " & Dominio & " | " & "Usuario: " & Usuario & " | " & "vcRutaTMP: " & vcRutaTMP & " | ",
            '                            "",
            '                            "ADM_REPORTE")
            writer.WriteLine(strcontenido)
            writer.Close()

            '=================================================================================================================================
            name = UtilitarioWeb.CorrijeNombreArchivo(name)
            Dim destPath As String = UtilitarioWeb.ComprimeArchivo(vcRutaTMP + attachment, vcRutaTMP, name, name, "xlsx", False)
            '=================================================================================================================================

            Dim fi As FileInfo = New FileInfo(destPath)
            If (fi.Exists) Then
                HttpContext.Current.Response.ClearHeaders()
                HttpContext.Current.Response.ClearContent()
                HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                HttpContext.Current.Response.ContentType = "application/octet-stream"
                HttpContext.Current.Response.TransmitFile(fi.FullName)
                HttpContext.Current.Response.Flush()
            End If
            '======================================================

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    'agregado 16-09-2013 wapumayta
    Private Sub GenerarReporte_SolcitutdServicioAmpliacion()
        Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporteAmp As String = "Reportes/Adm_Rpt_Solicitud_ServicioAmpliacion.rpt"

        Dim FecIni = Request.QueryString("daFecIni")
        Dim FecFin = Request.QueryString("daFecFin")
        Dim est = Request.QueryString("est")
        Dim env = Request.QueryString("env")
        Dim arCodSol = Request.QueryString("arcod")
        Dim dsReporteServicios As DataSet

        dsReporteServicios = Solicitud.ReporteServicios_aEnviarXCorreo(FecIni, FecFin, est, env, arCodSol)
        Solicitud.Dispose()

        Dim dsAmpliacion As New DataSet
        dsAmpliacion.Tables.Add(dsReporteServicios.Tables(1).Copy)

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Solicitudes'")
        dictCampoFormula.Add("titulo", "'Solicitud Servicio Ampliación'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        GenerarReporte(vcReporteAmp, dsAmpliacion, "MOV_s_SolicitudAmpliacion_Reporte", dictCampoFormula, oUsuario)
        GenerarAdjuntos()
    End Sub

    'agregado 17-09-2013 wapumayta
    Private Sub GenerarReporte_SolcitutdServicioActivacion()
        Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim dictCampoFormula As New Dictionary(Of String, String)
        Dim vcReporteAmp As String = "Reportes/Adm_Rpt_Solicitud_ServicioActivacion.rpt"

        Dim FecIni = Request.QueryString("daFecIni")
        Dim FecFin = Request.QueryString("daFecFin")
        Dim est = Request.QueryString("est")
        Dim env = Request.QueryString("env")
        Dim arCodSol = Request.QueryString("arcod")
        Dim dsReporteServicios As DataSet
        dsReporteServicios = Solicitud.ReporteServicios_aEnviarXCorreo(FecIni, FecFin, est, env, arCodSol)
        Solicitud.Dispose()
        Dim dsActivacion As New DataSet
        dsActivacion.Tables.Add(dsReporteServicios.Tables(0).Copy)

        dictCampoFormula.Add("tipotelefonia", "''")
        dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
        dictCampoFormula.Add("subtitulo1", "'Reporte de Solicitudes'")
        dictCampoFormula.Add("titulo", "'Solicitud Servicio Activación'")
        dictCampoFormula.Add("subtitulo2", "''")
        dictCampoFormula.Add("periodo", "''")
        dictCampoFormula.Add("tituloperiodo", "''")
        dictCampoFormula.Add("titulsucursal", "'Sucursal'")
        dictCampoFormula.Add("titulototal", "''")
        dictCampoFormula.Add("titulohora", "'Hora'")
        dictCampoFormula.Add("titulofecha", "'Fecha'")
        dictCampoFormula.Add("tituloemisor", "'Emisor'")
        dictCampoFormula.Add("tituloempresa", "'Empresa'")

        GenerarReporte(vcReporteAmp, dsActivacion, "MOV_s_SolicitudActivacion_Reporte", dictCampoFormula, oUsuario)
        GenerarAdjuntos()
    End Sub

    'agregado 18-09-2013 wapumayta
    Private Sub GenerarAdjuntos()
        ''Dim aleatorio = Guid.NewGuid().ToString()
        ''Dim tipo As String
        ''If (Request.QueryString("vcTipRep") = "6") Then
        ''    tipo = "SolAdj-Activación"
        ''Else
        ''    tipo = "SolAdj-Ampliación"
        ''End If

        ' ''Dim serv As HttpServerUtility
        ''Dim crisrep As CrystalDecisions.Web.CrystalReportSource = crConsulta
        ''Dim s As Stream = crConsulta.ReportDocument.ExportToStream(ExportFormatType.PortableDocFormat)
        ' ''Dim s As Stream = crisrep.ReportDocument.ExportToStream(ExportFormatType.PortableDocFormat)
        ''Dim br As New BinaryReader(s)
        ''Dim bytes As Byte() = br.ReadBytes(s.Length) 'documento en bytes
        ''Dim fileLen As Integer = s.Length 'tamaño del documento en bytes
        ' ''calcular tamaño de archivo
        ''If fileLen < 1024 Then 'BYTE
        ''    hdfTamAdjTemporal.Value = "1 Kb"
        ''ElseIf fileLen >= 1024 And fileLen < 1048576 Then 'KBYTE
        ''    hdfTamAdjTemporal.Value = Decimal.Round(Convert.ToDecimal(fileLen) / 1024, 2) & " Kb"
        ''Else 'MBYTE
        ''    hdfTamAdjTemporal.Value = Decimal.Round(Convert.ToDecimal(fileLen) / 1048576, 2) & " Mb"
        ''End If
        ' ''grabar en carpeta servidor temporal

        ''Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

        ''Dim binairyData(fileLen) As Byte
        ''Dim NombFile As String = tipo & "-" & DateTime.Now.Year & "-" & DateTime.Now.Month & "-" & DateTime.Now.Day & "-(" & aleatorio & ").pdf"
        ''Dim strfn As String = Server.MapPath("~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/" & NombFile)
        ' ''Dim strfn As String = serv.MapPath("~/P_Movil/Administrar/Temporal/File" & NombFile & ".pdf")
        ''Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
        ''fs.Write(bytes, 0, bytes.Length)
        ''fs.Flush()
        ''fs.Close()
        ''hdfNombAdjTemporal.Value = NombFile
    End Sub

    'agregado 05-12-2014 wapumayta
    Private Sub GenerarReporte_Almacen_IngresoPorModelos()
        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)

            Dim dictCampoFormula As New Dictionary(Of String, String)
            Dim vcReporteAlmacen As String = "Reportes/Adm_Rpt_Almacen_IngresosSalidas.rpt"

            Dim FecIni = Request.QueryString("FecIni")
            Dim FecFin = Request.QueryString("FecFin")
            Dim TipLin = Request.QueryString("TipLin")
            Dim IdCamp = Request.QueryString("IdCamp")
            Dim dsResultado As DataSet
            dsResultado = CampanaDespacho.RepAlm_IngresosSalidas_FechaModelos(IdCamp, TipLin, FecIni, FecFin)
            Dim dsReporteAlmacenPorFechaModelo As New DataSet
            dsReporteAlmacenPorFechaModelo.Tables.Add(dsResultado.Tables(0).Copy)

            dictCampoFormula.Add("tipotelefonia", "''")
            dictCampoFormula.Add("emisor", "'" & oUsuario.vcNom & "'")
            dictCampoFormula.Add("subtitulo1", "'Reporte de Almacén'")
            dictCampoFormula.Add("titulo", "'Ingreso y salidas de almacén'")
            dictCampoFormula.Add("subtitulo2", "''")
            dictCampoFormula.Add("periodo", "''")
            dictCampoFormula.Add("tituloperiodo", "''")
            dictCampoFormula.Add("titulsucursal", "'Sucursal'")
            dictCampoFormula.Add("titulototal", "''")
            dictCampoFormula.Add("titulohora", "'Hora'")
            dictCampoFormula.Add("titulofecha", "'Fecha'")
            dictCampoFormula.Add("tituloemisor", "'Emisor'")
            dictCampoFormula.Add("tituloempresa", "'Empresa'")

            GenerarReporte(vcReporteAlmacen, dsReporteAlmacenPorFechaModelo, "MOV_CAM_RPT_DespachoOperador", dictCampoFormula, oUsuario)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CampanaDespacho) Then CampanaDespacho.Dispose()
        End Try
    End Sub

#Region "Historicos - Sumarios"

    'agregado 15-10-2013 wapumayta
    Private Sub ExportarExcelHistoricos(ByVal vcTab As String, ByVal Detalle As String)

        Dim historico As BL_HIS_Generico = Nothing
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Try
            Dim listaDatos As List(Of String) = Detalle.Split(",").ToList()
            Dim granularidad = listaDatos(6)
            Dim servicio = listaDatos(9)
            Dim nombreExp As String = vcTab & "-" & servicio & "-" & granularidad
            Dim Resultado As DataTable
            Dim intDur As Integer = 0
            Dim columnas As New List(Of ENT_ENT_Campo)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            historico = New BL_HIS_Generico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Resultado = historico.obtenerEstadisticasGenericoExportar(listaDatos(0), listaDatos(1), listaDatos(2), listaDatos(3), listaDatos(4), listaDatos(5), listaDatos(6), listaDatos(7), _
                                                         listaDatos(8), listaDatos(9), listaDatos(10), listaDatos(11), vcCodInt, listaDatos(12), _
                                                         CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodSuc, _
                                                         CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod, listaDatos(15))
            If listaDatos(7) <> "COSTO" And listaDatos(7) <> "LLAMADAS" And listaDatos(7) <> "MONTO" Then
                intDur = 1
            End If
            Dim lstColRemov As New List(Of String)
            For Each col As DataColumn In Resultado.Columns
                Dim oCampo As New ENT_ENT_Campo()

                If col.ColumnName = "CODIGO" Or col.ColumnName = "DESCRIPCION" Or col.ColumnName = "Total" Then
                    If col.ColumnName = "CODIGO" Then
                        oCampo.vcDes = Resultado.Rows(0)("NomCodigo") '.ToString().ToUpper() 'col.ColumnName
                    End If
                    If col.ColumnName = "DESCRIPCION" Then
                        oCampo.vcDes = Resultado.Rows(0)("NomNombre") '.ToString().ToUpper() 'col.ColumnName
                    End If
                    If col.ColumnName = "Total" Then
                        oCampo.vcDes = "Total" '.ToString().ToUpper() 'col.ColumnName
                    End If
                    'oCampo.vcDes = col.ColumnName
                    columnas.Add(oCampo)
                ElseIf col.ColumnName.Split("_")(0) = servicio Then
                    oCampo.vcDes = FormatoNombreColumna(col.ColumnName.Split("_")(1), granularidad)
                    'oCampo.vcDes = col.ColumnName
                    columnas.Add(oCampo)
                Else
                    lstColRemov.Add(col.ColumnName)
                End If
            Next
            For Each colRemove As String In lstColRemov
                Resultado.Columns.Remove(colRemove)
            Next

            ExportDataTableToExcel(Resultado, nombreExp, columnas, intDur, listaDatos(16), oCultura)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If historico IsNot Nothing Then historico.Dispose()
        End Try
    End Sub

    'agregado 15-10-2013 wapumayta
    Private Function FormatoNombreColumna(ByVal nombreCol As String, ByVal granularidad As String) As String
        If granularidad = "MONTH" Then
            Dim nmb As List(Of String) = nombreCol.Split("/").ToList()
            Return obtenerMes(nmb(1)) & " " & nmb(0)
        Else
            Return nombreCol
        End If
    End Function

    'agregado 15-10-2013 wapumayta
    Private Function obtenerMes(ByVal param As String) As String
        Select Case param
            Case "1"
                Return "Ene"
            Case "2"
                Return "Feb"
            Case "3"
                Return "Mar"
            Case "4"
                Return "Abr"
            Case "5"
                Return "May"
            Case "6"
                Return "Jun"
            Case "7"
                Return "Jul"
            Case "8"
                Return "Ago"
            Case "9"
                Return "Set"
            Case "10"
                Return "Oct"
            Case "11"
                Return "Nov"
            Case Else
                Return "Dic"
        End Select
    End Function

    'agregado 15-10-2013 wapumayta
    Private Sub ExportarExcelSumario(ByVal vcTab As String, ByVal Detalle As String)

        Dim navegacion As BL_SUM_Navegacion = Nothing
        Dim sumario As BL_Sumario = Nothing
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            Else
                listaDatos = Detalle.Split("-").ToList()
            End If


            Dim nombreExp As String
            Dim Resultado As DataTable
            Dim dsResultado As DataSet = New DataSet()
            'Dim columnas As New List(Of ENT_ENT_Campo)
            Dim lstColumnas As New List(Of List(Of ENT_ENT_Campo))
            Dim lstColRemov As New List(Of String)
            Dim intDur As Integer = 0
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            If listaDatos.Count = 6 Then 'NAVEGACION
                navegacion = New BL_SUM_Navegacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim dtResumen As DataTable = navegacion.dtObtenerResumenPorTipo(prPeriodo, prCodigo, prTipo, prTelefonia)
                Resultado = navegacion.dtObtenerResumenPorTipo(listaDatos(0), listaDatos(1), listaDatos(2), listaDatos(3), listaDatos(4))
                Dim Periodo As String = listaDatos(0)
                Dim Tipo As String = listaDatos(2)
                nombreExp = vcTab & "-" & Periodo & "-" & Tipo

                'agregado 11-11-2014 wapumayta (imprimir mas de una tabla)
                Dim Resultado2 As DataTable = navegacion.dtObtenerDetallePorTipo(listaDatos(0), listaDatos(1), listaDatos(2), listaDatos(3), listaDatos(4), 1)
                If (Resultado2.Columns.Contains("Total_Ord")) Then
                    Resultado2.Columns.Remove("Total_Ord")
                End If
                Resultado2.DefaultView.Sort = "Total desc"
                Resultado2 = Resultado2.DefaultView.ToTable()
                Resultado.TableName = "SUMARIO"
                Resultado2.TableName = "RESUMEN"
                dsResultado.Tables.Add(Resultado.Copy())
                dsResultado.Tables.Add(Resultado2.Copy())
                If listaDatos(2).ToUpper() = "DURACION" Or listaDatos(2).ToUpper() = "DURACIÓN" Then
                    intDur = 1
                End If
            Else
                Dim Periodo As String = listaDatos(5)
                Dim Servicio As String = listaDatos(6)

                nombreExp = vcTab & "-" & Periodo & "-" & Servicio

                sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                Dim oMostrarSumario As New Ent_MostrarSumario()
                oMostrarSumario.Nomtabla = listaDatos(0)
                oMostrarSumario.Tipo = listaDatos(1)
                oMostrarSumario.TipoConsulta = listaDatos(2).Replace("|", "'")
                oMostrarSumario.Top = listaDatos(3)
                oMostrarSumario.Nivel = listaDatos(4)
                oMostrarSumario.Periodo = listaDatos(5)
                oMostrarSumario.Servicio = listaDatos(6)
                oMostrarSumario.DescTipo = listaDatos(7)
                oMostrarSumario.NombreSumario = listaDatos(8)
                oMostrarSumario.And = listaDatos(9).Replace("|", "'")
                oMostrarSumario.VcCodInt = vcCodInt
                oMostrarSumario.VcFiltro = listaDatos(10)

                'PARAMETROS DE SERVICIOS
                oMostrarSumario.TablaConsulta = listaDatos(11)
                oMostrarSumario.P_Codigo = listaDatos(12)
                oMostrarSumario.F_Codigo = listaDatos(13)
                oMostrarSumario.P_Desc = listaDatos(14)
                oMostrarSumario.F_Desc = listaDatos(15)
                oMostrarSumario.CodigoSucursal = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodSuc
                oMostrarSumario.CodigoEmpleado = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod
                oMostrarSumario.ServicioTap = listaDatos(16)
                oMostrarSumario.TipoFuente = listaDatos(17)
                oMostrarSumario.ServicioValue = listaDatos(18)

                oMostrarSumario.IdTipoServicio = CInt(listaDatos(19))

                oMostrarSumario.inTipoLinea = "1" 'Manuel Tenorio
                'Resultado = sumario.obtenerSumarioExportar(listaDatos(0), listaDatos(1), listaDatos(2).Replace("|", "'"), listaDatos(3), listaDatos(4), listaDatos(5), listaDatos(6), listaDatos(7), _
                '                                             listaDatos(8), listaDatos(9).Replace("|", "'"), vcCodInt, listaDatos(10))
                Resultado = sumario.obtenerSumarioExportar(oMostrarSumario)
                'If listaDatos(7).ToUpper() <> "COSTO" And listaDatos(7).ToUpper() <> "LLAMADAS" Then
                If listaDatos(7).ToUpper() = "DURACION" Or listaDatos(7).ToUpper() = "DURACIÓN" Then
                    intDur = 1
                End If
            End If

            If listaDatos.Count = 6 Then 'NAVEGACION 'agregado 11-11-2014 wapumayta
                For Each dt As DataTable In dsResultado.Tables
                    Dim columnas As New List(Of ENT_ENT_Campo)
                    For Each col As DataColumn In dt.Columns
                        If col.ColumnName = "ORGA_CodInt2" Or col.ColumnName = "NomCodigo" Or col.ColumnName = "NomNombre" Or col.ColumnName = "FECHA" Then
                            lstColRemov.Add(col.ColumnName)
                            'Resultado.Columns.Remove(col.ColumnName)
                        Else
                            Dim oCampo As New ENT_ENT_Campo()
                            'oCampo.vcDes = col.ColumnName
                            If col.ColumnName = "CÓDIGO" Then
                                oCampo.vcDes = Resultado.Rows(0)("NomCodigo") '.ToString().ToUpper() 'col.ColumnName
                            ElseIf col.ColumnName = "DESCRIPCIÓN" Then
                                oCampo.vcDes = Resultado.Rows(0)("NomNombre") '.ToString().ToUpper() 'col.ColumnName
                            Else
                                oCampo.vcDes = col.ColumnName
                            End If
                            If (oCampo.vcDes.ToLower() <> "codigo" And oCampo.vcDes.ToLower() <> "código") Then
                                columnas.Add(oCampo)
                            End If
                        End If
                    Next
                    lstColumnas.Add(columnas)
                    dt.Columns.Remove("CODIGO")
                Next

                ExportDataSetToExcel(dsResultado, nombreExp, lstColumnas, intDur)
            Else
                Dim columnas As New List(Of ENT_ENT_Campo)
                For Each col As DataColumn In Resultado.Columns
                    If col.ColumnName = "ORGA_CodInt2" Or col.ColumnName = "NomCodigo" Or col.ColumnName = "NomNombre" Or col.ColumnName = "FECHA" Then
                        lstColRemov.Add(col.ColumnName)
                        'Resultado.Columns.Remove(col.ColumnName)
                    Else
                        Dim oCampo As New ENT_ENT_Campo()
                        'oCampo.vcDes = col.ColumnName
                        If col.ColumnName = "CÓDIGO" Then
                            oCampo.vcDes = Resultado.Rows(0)("NomCodigo") '.ToString().ToUpper() 'col.ColumnName
                        ElseIf col.ColumnName = "DESCRIPCIÓN" Then
                            oCampo.vcDes = Resultado.Rows(0)("NomNombre") '.ToString().ToUpper() 'col.ColumnName
                        Else
                            oCampo.vcDes = col.ColumnName
                        End If
                        columnas.Add(oCampo)
                    End If
                Next

                For Each colRemove As String In lstColRemov
                    Resultado.Columns.Remove(colRemove)
                Next

                ExportDataTableToExcel(Resultado, nombreExp, columnas, intDur, listaDatos(20))
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If navegacion IsNot Nothing Then navegacion.Dispose()
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
    End Sub

    'MPAJUELO_20161016_SUMARIO_ENTEL
    Private Sub ExportarExcelFacturacionSumario(ByVal vcTab As String, ByVal Detalle As String)

        'Dim navegacion As BL_SUM_Navegacion = Nothing
        Dim sumario As BL_MOV_IMP_Sumario = Nothing
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            Else
                listaDatos = Detalle.Split("-").ToList()
            End If


            Dim nombreExp As String

            'Edgar Garcia---15/07

            '-------------------------

            Dim Resultado As DataTable
            Dim dsResultado As DataSet = New DataSet()
            'Dim columnas As New List(Of ENT_ENT_Campo)
            Dim lstColumnas As New List(Of List(Of ENT_ENT_Campo))
            Dim lstColRemov As New List(Of String)
            Dim intDur As Integer = 0
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt


            Dim Periodo As String = listaDatos(5)
            Dim Servicio As String = listaDatos(6)
            Dim NomOpcion As String = ""
            Select Case vcTab
                Case "M_ORGA"
                    NomOpcion = "ORGANIZACION"
                Case "M_EMPL"
                    NomOpcion = "EMPLEADO"
                Case "M_SUCU"
                    NomOpcion = "SUCURSAL"
                Case "M_COMP"
                    NomOpcion = "OPERADOR"
                Case "M_CENT_COST"
                    NomOpcion = "CENT_COSTO"
                Case "MOV_LINEA"
                    NomOpcion = "LINEA"
                Case "MOV_CUENTA"
                    NomOpcion = "CUENTA"
                Case Else
                    NomOpcion = vcTab
            End Select

            nombreExp = "SUM_" & NomOpcion & "_" & Periodo.Replace("/", "") & "_" & Servicio

            sumario = New BL_MOV_IMP_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oMostrarSumario As New ENT_MOV_IMP_MostrarSumario()
            oMostrarSumario.Nomtabla = listaDatos(0)
            oMostrarSumario.Tipo = listaDatos(1)
            oMostrarSumario.TipoConsulta = listaDatos(2).Replace("|", "'")
            oMostrarSumario.Top = listaDatos(3)
            oMostrarSumario.Nivel = listaDatos(4)
            oMostrarSumario.Periodo = listaDatos(5)
            oMostrarSumario.Servicio = listaDatos(6)
            oMostrarSumario.DescTipo = listaDatos(7)
            oMostrarSumario.NombreSumario = listaDatos(8)
            oMostrarSumario.And = listaDatos(9).Replace("|", "'")
            oMostrarSumario.VcCodInt = vcCodInt
            oMostrarSumario.VcFiltro = listaDatos(10)

            'PARAMETROS DE SERVICIOS
            oMostrarSumario.TablaConsulta = listaDatos(11)
            oMostrarSumario.P_Codigo = listaDatos(12)
            oMostrarSumario.F_Codigo = listaDatos(13)
            oMostrarSumario.P_Desc = listaDatos(14).Replace("[", "+' ('+").Replace("]", "+')'")
            oMostrarSumario.F_Desc = listaDatos(15).Replace("[", "+' ('+").Replace("]", "+')'")
            oMostrarSumario.CodigoSucursal = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodSuc
            oMostrarSumario.CodigoEmpleado = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod
            oMostrarSumario.ServicioTap = listaDatos(16)
            oMostrarSumario.TipoFuente = listaDatos(17)
            oMostrarSumario.ServicioValue = listaDatos(18)

            oMostrarSumario.IdTipoServicio = CInt(listaDatos(19))

            oMostrarSumario.inTipoLinea = "1" 'Manuel Tenorio
            'Resultado = sumario.obtenerSumarioExportar(listaDatos(0), listaDatos(1), listaDatos(2).Replace("|", "'"), listaDatos(3), listaDatos(4), listaDatos(5), listaDatos(6), listaDatos(7), _
            '                                             listaDatos(8), listaDatos(9).Replace("|", "'"), vcCodInt, listaDatos(10))

            dsResultado = sumario.obtenerSumarioExportar(oMostrarSumario)
            Resultado = dsResultado.Tables(0)
            'If listaDatos(7).ToUpper() <> "COSTO" And listaDatos(7).ToUpper() <> "LLAMADAS" Then
            If listaDatos(7).ToUpper() = "DURACION" Or listaDatos(7).ToUpper() = "DURACIÓN" Then
                intDur = 1
            End If


            Dim columnas As New List(Of ENT_ENT_Campo)
            For Each col As DataColumn In Resultado.Columns
                If col.ColumnName = "ORGA_CodInt2" Or col.ColumnName = "NomCodigo" Or col.ColumnName = "NomNombre" Or col.ColumnName = "FECHA" Then
                    lstColRemov.Add(col.ColumnName)
                    'Resultado.Columns.Remove(col.ColumnName)
                Else
                    Dim oCampo As New ENT_ENT_Campo()
                    'oCampo.vcDes = col.ColumnName
                    If col.ColumnName = "CÓDIGO" Then
                        oCampo.vcDes = Resultado.Rows(0)("NomCodigo") '.ToString().ToUpper() 'col.ColumnName
                    ElseIf col.ColumnName = "DESCRIPCIÓN" Then
                        oCampo.vcDes = Resultado.Rows(0)("NomNombre") '.ToString().ToUpper() 'col.ColumnName
                    Else
                        oCampo.vcDes = col.ColumnName
                    End If
                    columnas.Add(oCampo)
                End If
            Next

            For Each colRemove As String In lstColRemov
                Resultado.Columns.Remove(colRemove)
            Next

            'ExportDataTableToExcel(Resultado, nombreExp, columnas, intDur, listaDatos(20), oCultura) 'MPAJUELO_20161026_SUMARIO_ENTEL

            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()

            UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(Resultado, nombreExp, columnas, True, Dominio, Usuario)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If navegacion IsNot Nothing Then navegacion.Dispose()
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
    End Sub

    'MPAJUELO_20161026_SUMARIO_ENTEL
    Private Sub ExportarExcelAgrupadoLineaDispositivo(ByVal Detalle As String)

        Dim ReporteOrganizacional As BL_GEN_ReporteOrganizacional = Nothing
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            Else
                listaDatos = Detalle.Split("-").ToList()
            End If


            Dim nombreExp As String = ""
            Dim Resultado As DataTable
            Dim dsResultado As DataSet = New DataSet()
            'Dim columnas As New List(Of ENT_ENT_Campo)
            Dim lstColumnas As New List(Of List(Of ENT_ENT_Campo))
            Dim lstColRemov As New List(Of String)
            Dim intDur As Integer = 0

            ReporteOrganizacional = New BL_GEN_ReporteOrganizacional(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim prNivel As String, prTop As String, prTipoAgrupacion As String, prCampoTipo As String, prFiltro As String
            prTipoAgrupacion = listaDatos(0)
            prNivel = listaDatos(1)
            prTop = listaDatos(2)
            prCampoTipo = listaDatos(3)
            prFiltro = listaDatos(4)

            Resultado = ReporteOrganizacional.ReporteAgrupadoLineaDispositivo(prNivel, prTipoAgrupacion, prCampoTipo, prFiltro, oCultura)


            Dim columnas As New List(Of ENT_ENT_Campo)
            For Each col As DataColumn In Resultado.Columns
                Dim oCampo As New ENT_ENT_Campo()
                If col.ColumnName.ToUpper = "TOTALEMPLEADOS" Then
                    oCampo.vcDes = "EMPLEADOS"
                ElseIf col.ColumnName.ToUpper = "TOTALLINEAS" Then
                    oCampo.vcDes = "LÍNEAS"
                ElseIf col.ColumnName.ToUpper = "TOTALDISPOSITIVOS" Then
                    oCampo.vcDes = "DISPOSITIVOS"
                Else
                    oCampo.vcDes = col.ColumnName.ToUpper
                End If
                columnas.Add(oCampo)
            Next

            ExportDataTableToExcel(Resultado, "ReporteAgrupadoPor" & prTipoAgrupacion, columnas, intDur, "0", oCultura) 'MPAJUELO_20161026_SUMARIO_ENTEL


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ReporteOrganizacional IsNot Nothing Then ReporteOrganizacional.Dispose()
        End Try
    End Sub


    Private Function secondToTime(ByVal segundos As UInteger) As String
        Dim hora As UInteger = segundos \ 3600
        Dim restante As UInteger = segundos Mod 3600
        Dim minutos As UInteger = restante \ 60
        Dim seg As UInteger = restante Mod 60
        Return hora.ToString() & ":" & minutos.ToString().PadLeft(2, "0"c) & ":" & seg.ToString().PadLeft(2, "0"c)
    End Function

    Private Function secondToMin(ByVal segundos As UInteger, ByVal entero As Boolean) As String
        Dim minutos As Decimal = 0
        minutos = Convert.ToDecimal(segundos) / 60
        If entero Then
            minutos = Math.Round(minutos)
        End If
        Return minutos.ToString()
    End Function

#End Region

    Private Function QueryOptimizadoToReportes(ByVal vcTab As String, ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal vcCam As String, ByVal vcCamCodigo As String, ByVal vcVal As String, _
                                               ByVal inFilReg As Integer, ByVal isWhere As Integer, ByVal vcCon As String, ByVal vcConJQ As String) As String
        Dim Query As String = ""
        Dim orderby As String = ""
        Dim Campo As String = ""
        Dim from As String = (Convert.ToString("FROM [") & vcTab) + "] "
        Dim where As String = ""
        Dim leftjoin As String = ""

        Dim lstCampoJoins As New List(Of ENT_ENT_Campo)(lstCampo)

        lstCampoJoins.Sort(Function(oCampo1 As ENT_ENT_Campo, oCampo2 As ENT_ENT_Campo) oCampo1.inOrdFor.CompareTo(oCampo2.inOrdFor))

        For Each oCampo As ENT_ENT_Campo In lstCampoJoins
            If oCampo.vcTabFor <> "" Then
                leftjoin = "LEFT JOIN [" + oCampo.vcTabFor + "] AS [" + oCampo.vcTabForAs + "] ON [" + oCampo.vcTabForAs + "].[" + oCampo.vcPriKeyFor + "] = [" + oCampo.vcTab + "].[" + oCampo.vcForKey + "] "
                If from.Contains(leftjoin) = False Then
                    from += leftjoin
                End If
            End If
            If oCampo.btEliLog AndAlso inFilReg < 2 Then
                If oCampo.vcTab = "MOV_CAM_CampanaDespachoOperador" Then
                    where = "WHERE " + oCampo.vcTabForAs + ".[" + oCampo.vcNom + "] = " + inFilReg.ToString() + " "
                Else
                    where = "WHERE " + oCampo.vcTab + ".[" + oCampo.vcNom + "] = " + inFilReg.ToString() + " "
                End If
            End If
        Next

        Dim CampoLlavePrimary As String = ""
        For Each oCampo As ENT_ENT_Campo In lstCampo
            If vcCam <> "" AndAlso vcVal <> "" AndAlso oCampo.vcNomAlias = vcCam Then
                If String.IsNullOrEmpty(where) Then
                    where = "WHERE "
                Else
                    where += "AND "
                End If

                If oCampo.vcTabFor <> "" Then
                    where += (Convert.ToString("( charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTabForAs + ".[" + oCampo.vcNom + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    If vcCamCodigo <> "" Then
                        where += (Convert.ToString((Convert.ToString(" OR charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTabForAs + ".[") & vcCamCodigo) + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    End If
                    where += ")"
                Else
                    'If oCampo.btIdPri Then
                    'where += (Convert.ToString("(  ('") & vcVal) + "' = CONVERT(VARCHAR(8000), " + oCampo.vcTab + ".[" + oCampo.vcNom + "] ) ) "
                    'Else
                    where += (Convert.ToString("( charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTab + ".[" + oCampo.vcNom + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    'End If

                    If vcCamCodigo <> "" Then
                        where += (Convert.ToString((Convert.ToString(" OR charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTab + ".[") & vcCamCodigo) + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    End If
                    where += ")"
                End If
            End If

            If Not String.IsNullOrEmpty(oCampo.vcConCam) Then
                If String.IsNullOrEmpty(where) Then
                    where = "WHERE "
                Else
                    where += "AND "
                End If

                where += oCampo.vcTabForAs + ".[" + oCampo.vcConCam + "] = " + oCampo.vcConEnt + ".[" + oCampo.vcConCamEnt + "] "
            End If
            If Not String.IsNullOrEmpty(oCampo.vcValFil) Then
                Dim valores As String() = oCampo.vcValFil.Split(","c)

                For Each valor As String In valores
                    Dim operador As String = " = "
                    Dim valorCampo As String = " = "
                    If String.IsNullOrEmpty(where) Then
                        where = "WHERE "
                    Else
                        where += "AND "
                    End If

                    If valor.Substring(0, 2) = "!=" Then
                        operador = "<>"
                    End If

                    valorCampo = "'" + valor.Substring(2, valor.Length - 2) + "' "

                    If oCampo.vcTabFor <> "" Then
                        where += Convert.ToString(Convert.ToString(oCampo.vcTabForAs + ".[" + oCampo.vcNom + "] ") & operador) & valorCampo
                    Else
                        where += Convert.ToString(Convert.ToString(oCampo.vcTab + ".[" + oCampo.vcNom + "] ") & operador) & valorCampo
                    End If
                Next
            End If

            If oCampo.btIdPri Then
                If oCampo.inTipDat = 5 Then
                    CampoLlavePrimary = "convert(int, " + oCampo.vcTab + ".[" + oCampo.vcNom + "]" + ")"
                Else
                    CampoLlavePrimary = oCampo.vcTab + ".[" + oCampo.vcNom + "]"
                End If
            End If
        Next

        Dim vcCondicion As String = ""
        If vcCon <> "" AndAlso vcConJQ = "" Then
            vcCondicion = vcCon
        ElseIf vcCon = "" AndAlso vcConJQ <> "" Then
            vcCondicion = vcConJQ
        ElseIf vcCon <> "" AndAlso vcConJQ <> "" Then
            vcCondicion = Convert.ToString(vcCon & Convert.ToString(" AND ")) & vcConJQ
        End If

        If vcCondicion <> "" Then
            If String.IsNullOrEmpty(where) Then
                where = Convert.ToString("WHERE ") & vcCondicion
            Else
                where += Convert.ToString("AND ") & vcCondicion
            End If
        End If

        If isWhere = 0 Then
            Query = (Convert.ToString(Convert.ToString((Convert.ToString(" ") & from) & where)))
        Else
            Query = (Convert.ToString(Convert.ToString(where)))
        End If

        Return Query
    End Function

    Private Function QueryOptimizadoToReportePorArea(ByVal vcTab As String, ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal vcCam As String, _
                                                     ByVal vcCamCodigo As String, ByVal vcVal As String, ByVal inFilReg As Integer, _
                                                     ByVal isWhere As Integer, ByVal vcCon As String, ByVal vcConJQ As String) As String
        Dim Query As String = ""
        Dim orderby As String = ""
        Dim Campo As String = ""
        Dim from As String = (Convert.ToString("FROM [") & vcTab) + "] "
        Dim where As String = ""
        Dim leftjoin As String = ""

        Dim lstCampoJoins As New List(Of ENT_ENT_Campo)(lstCampo)

        lstCampoJoins.Sort(Function(oCampo1 As ENT_ENT_Campo, oCampo2 As ENT_ENT_Campo) oCampo1.inOrdFor.CompareTo(oCampo2.inOrdFor))

        For Each oCampo As ENT_ENT_Campo In lstCampoJoins
            'If oCampo.vcTabFor <> "" Then
            '    leftjoin = "LEFT JOIN [" + oCampo.vcTabFor + "] AS [" + oCampo.vcTabForAs + "] ON [" + oCampo.vcTabForAs + "].[" + oCampo.vcPriKeyFor + "] = [" + oCampo.vcTab + "].[" + oCampo.vcForKey + "] "
            '    If from.Contains(leftjoin) = False Then
            '        from += leftjoin
            '    End If
            'End If
            If oCampo.btEliLog AndAlso inFilReg < 2 Then
                If oCampo.vcTab = "MOV_CAM_CampanaDespachoOperador" Then
                    where = "WHERE " + oCampo.vcTabForAs + ".[" + oCampo.vcNom + "] = " + inFilReg.ToString() + " "
                Else
                    where = "WHERE " + oCampo.vcTab + ".[" + oCampo.vcNom + "] = " + inFilReg.ToString() + " "
                End If
            End If
        Next

        Dim CampoLlavePrimary As String = ""
        For Each oCampo As ENT_ENT_Campo In lstCampo
            If vcCam <> "" AndAlso vcVal <> "" AndAlso oCampo.vcNomAlias = vcCam Then
                If String.IsNullOrEmpty(where) Then
                    where = "WHERE "
                Else
                    where += "AND "
                End If

                If oCampo.vcTabFor <> "" Then
                    where += (Convert.ToString("( charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTabForAs + ".[" + oCampo.vcNom + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    If vcCamCodigo <> "" Then
                        where += (Convert.ToString((Convert.ToString(" OR charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTabForAs + ".[") & vcCamCodigo) + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    End If
                    where += ")"
                Else
                    'If oCampo.btIdPri Then
                    'where += (Convert.ToString("(  ('") & vcVal) + "' = CONVERT(VARCHAR(8000), " + oCampo.vcTab + ".[" + oCampo.vcNom + "] ) ) "
                    'Else
                    where += (Convert.ToString("( charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTab + ".[" + oCampo.vcNom + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    'End If

                    If vcCamCodigo <> "" Then
                        where += (Convert.ToString((Convert.ToString(" OR charindex('") & vcVal) + "', CONVERT(VARCHAR(8000), " + oCampo.vcTab + ".[") & vcCamCodigo) + "] ) COLLATE Latin1_General_CI_AS) > 0 "
                    End If
                    where += ")"
                End If
            End If

            If Not String.IsNullOrEmpty(oCampo.vcConCam) Then
                If String.IsNullOrEmpty(where) Then
                    where = "WHERE "
                Else
                    where += "AND "
                End If

                where += oCampo.vcTabForAs + ".[" + oCampo.vcConCam + "] = " + oCampo.vcConEnt + ".[" + oCampo.vcConCamEnt + "] "
            End If
            If Not String.IsNullOrEmpty(oCampo.vcValFil) Then
                Dim valores As String() = oCampo.vcValFil.Split(","c)

                For Each valor As String In valores
                    Dim operador As String = " = "
                    Dim valorCampo As String = " = "
                    If String.IsNullOrEmpty(where) Then
                        where = "WHERE "
                    Else
                        where += "AND "
                    End If

                    If valor.Substring(0, 2) = "!=" Then
                        operador = "<>"
                    End If

                    valorCampo = "'" + valor.Substring(2, valor.Length - 2) + "' "

                    If oCampo.vcTabFor <> "" Then
                        where += Convert.ToString(Convert.ToString(oCampo.vcTabForAs + ".[" + oCampo.vcNom + "] ") & operador) & valorCampo
                    Else
                        where += Convert.ToString(Convert.ToString(oCampo.vcTab + ".[" + oCampo.vcNom + "] ") & operador) & valorCampo
                    End If
                Next
            End If

            If oCampo.btIdPri Then
                If oCampo.inTipDat = 5 Then
                    CampoLlavePrimary = "convert(int, " + oCampo.vcTab + ".[" + oCampo.vcNom + "]" + ")"
                Else
                    CampoLlavePrimary = oCampo.vcTab + ".[" + oCampo.vcNom + "]"
                End If
            End If
        Next

        Dim vcCondicion As String = ""
        If vcCon <> "" AndAlso vcConJQ = "" Then
            vcCondicion = vcCon
        ElseIf vcCon = "" AndAlso vcConJQ <> "" Then
            vcCondicion = vcConJQ
        ElseIf vcCon <> "" AndAlso vcConJQ <> "" Then
            vcCondicion = Convert.ToString(vcCon & Convert.ToString(" AND ")) & vcConJQ
        End If

        If vcCondicion <> "" Then
            If String.IsNullOrEmpty(where) Then
                where = Convert.ToString("WHERE ") & vcCondicion
            Else
                where += Convert.ToString("AND ") & vcCondicion
            End If
        End If

        Query = (Convert.ToString(Convert.ToString(where)))

        Return Query
    End Function

    Private Shared Function FiltrosPorTablas(ByVal vcTab As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim _return As String = ""
        vcTab = "" & vcTab
        Select Case vcTab.ToUpper
            Case "PCS_TRF_SERVICIO"
                _return = "btUsaImp=1"
            Case "M_ORGA"
                _return = "ORGA_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%'"
            Case "M_EMPL"
                _return = "EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%'"
            Case "M_SUCU"
                If oUsuario.F_vcCodSuc <> "" And oUsuario.F_vcCodSuc <> "0000000000" Then
                    _return = "SUCU_P_vcCODSUC = '" & oUsuario.F_vcCodSuc & "'"
                End If
            Case "MOV_LINEA"
                _return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR M_EMPL.EMPL_CodInt2 is NULL ) "
            Case "MOV_DISPOSITIVO"
                _return = " (M_EMPL.EMPL_CodInt2 LIKE '" & oUsuario.F_vcCodInt & "%' OR M_EMPL.EMPL_CodInt2 is NULL ) "
        End Select

        Return _return
    End Function

    Private Sub ExportarComprobante(vcPeriodo As String, p_idEmpleado As String, p_idTipoProceso As Integer, p_tipoDocumento As Integer, p_idEstado As Integer)
        Dim bl_comprobante As BL_MOV_FAC_Comprobante = Nothing
        Try
            bl_comprobante = New BL_MOV_FAC_Comprobante(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dt As DataTable = bl_comprobante.ListarComprobantes(vcPeriodo, p_idEmpleado, p_idTipoProceso, p_tipoDocumento, p_idEstado)

            'eegComprobantes.ExportarDatos(RenombrarColumnas(dt), "Comprobantes_" & vcPeriodo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_comprobante IsNot Nothing Then bl_comprobante.Dispose()
        End Try
    End Sub

    Private Sub ExportarComprobanteGenerar(vcPeriodo As String, inOpe As Integer, inEst As Integer, inTipPro As Integer, inMeses As Integer)
        Dim bl_Comprobante As BL_MOV_FAC_Comprobante = Nothing
        Dim dt As DataTable
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            bl_Comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
            dt = bl_Comprobante.Listar(vcPeriodo, inEst, inOpe, inTipPro, 0, inMeses)

            'JHERRERA - 20151002: Se agregó este código para formatear la columna de periodo
            Dim inLen = dt.Rows.Count
            Dim dt2 As DataTable = dt.Clone()
            dt2.Columns("periodo").ReadOnly = False
            dt2.Columns("periodo").DataType = System.Type.GetType("System.String")

            For i As Integer = 0 To inLen - 1
                dt2.ImportRow(dt.Rows(i))
                dt2.Rows(i)("periodo") = Convert.ToDateTime(dt.Rows(i)("periodo")).ToString("MM/yyyy")
            Next

            '--FIN

            'eegComprobantes.ExportarDatos(RenombrarColumnas(dt2), "Comprobantes_(" & dt.Rows.Count.ToString() & ")_" & vcPeriodo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Comprobante IsNot Nothing Then bl_Comprobante.Dispose()
        End Try
    End Sub

    'Exportar en excel Resumen de Facturación
    'Private Sub ExportarExcelResumen(ByVal criterio As ENT_MOV_IMP_Criterio, ByVal Detalle As String, Linea As String)
    '    Dim facturacion As BL_MOV_IMP_Facturacion = Nothing
    '    Dim data As DataTable

    '    Try
    '        facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        Dim vcCodOpe As Integer
    '        If criterio.Operadores.Count > 0 Then
    '            For Each oOperador As ENT_GEN_Operador In criterio.Operadores
    '                vcCodOpe += oOperador.P_inCodOpe
    '            Next
    '        End If
    '        Dim vcCodCue As String = ""
    '        If criterio.Cuentas.Count > 0 Then
    '            For Each oCuenta As ENT_MOV_Cuenta In criterio.Cuentas
    '                vcCodCue += oCuenta.P_vcCod
    '            Next
    '        End If
    '        If Linea Is Nothing Then
    '            Linea = ""
    '        End If

    '        'data = facturacion.ListarResumenPorCuenta(criterio, criterio.vcPer, 9000000, 1, "vcNum", "asc", vcCodOpe, vcCodCue, Linea).Tables(1)
    '        data = facturacion.Listar_Resumen(criterio.vcPer, "resumen_lineasPorCuenta", "", "", "", vcCodOpe, vcCodCue, Linea, "")

    '        Dim Dominio As String = Session("IdDominio").ToString()
    '        Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
    '        UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(RenombrarColumnas(data), "Fact_Lineas_" & criterio.vcPer, Nothing, True, Dominio, Usuario)

    '        'eegResumen.ExportarDatos(RenombrarColumnas(data), "Fact_Lineas_" & criterio.vcPer & "_" & vcCodCue)

    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally

    '    End Try
    'End Sub


    Private Sub ExportarExcelResumen(ByVal criterio As ENT_MOV_IMP_Criterio, ByVal Detalle As String, Linea As String)
        Dim facturacion As BL_MOV_IMP_Facturacion = Nothing
        Dim data As DataTable

        Try
            facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim vcCodOpe As Integer
            If criterio.Operadores.Count > 0 Then
                For Each oOperador As ENT_GEN_Operador In criterio.Operadores
                    vcCodOpe += oOperador.P_inCodOpe
                Next
            End If
            Dim vcCodCue As String = ""
            If criterio.Cuentas.Count > 0 Then
                For Each oCuenta As ENT_MOV_Cuenta In criterio.Cuentas
                    vcCodCue += oCuenta.P_vcCod
                Next
            End If
            If Linea Is Nothing Then
                Linea = ""
            End If
            'data = facturacion.ListarResumenPorCuenta(criterio, criterio.vcPer, 9000000, 1, "vcNum", "asc", vcCodOpe, vcCodCue, Linea).Tables(0)
            data = facturacion.Listar_Resumen(criterio.vcPer, "resumen_lineasPorCuenta", "", "", "", vcCodOpe.ToString(), vcCodCue, Linea, "", -1, -1, -1)

            If data.Columns.Contains("Ver_Detalle") Then
                data.Columns.Remove("Ver_Detalle")
            End If
            If data.Columns.Contains("Cuenta") Then
                data.Columns.Remove("Cuenta")
            End If

            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(RenombrarColumnas(data), "Facturación_Lineas_" & criterio.vcPer, Nothing, True, Dominio, Usuario)


            'eegResumen.ExportarDatos(RenombrarColumnas(data), "Fact_Lineas_" & criterio.vcPer & "_" & vcCodCue)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Sub

    Private Sub ExportarExcelResumenCuentas(ByVal criterio As ENT_MOV_IMP_Criterio, ByVal Detalle As String)
        Dim facturacion As BL_MOV_IMP_Facturacion = Nothing
        Dim data As DataTable

        Try
            facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            Dim vcCodOpe As Integer
            If criterio.Operadores.Count > 0 Then
                For Each oOperador As ENT_GEN_Operador In criterio.Operadores
                    vcCodOpe += oOperador.P_inCodOpe
                Next
            End If
            Dim vcCodCue As String = ""
            If criterio.Cuentas.Count > 0 Then
                For Each oCuenta As ENT_MOV_Cuenta In criterio.Cuentas
                    vcCodCue += oCuenta.P_vcCod
                Next
            End If
            'data = facturacion.ListarResumenPorCuenta(criterio, criterio.vcPer, 9000000, 1, "vcNum", "asc", vcCodOpe, vcCodCue, Linea).Tables(0)

            ''cambio parametro vccriterio -  (resumen_cuentaPorOperador)  JPAREJA
            data = facturacion.Listar_Resumen(criterio.vcPer, "resumen_cuentaPorOperador", "", "", "", vcCodOpe.ToString(), vcCodCue, "", "", -1, -1, oUsuario.P_inCod)

            If data.Columns.Contains("Ver_Detalle") Then
                data.Columns.Remove("Ver_Detalle")
            End If
            If data.Columns.Contains("Cuenta") Then
                data.Columns.Remove("Cuenta")
            End If

            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(RenombrarColumnas(data), "Facturación_Cuentas_" & criterio.vcPer, Nothing, True, Dominio, Usuario)


            'eegResumen.ExportarDatos(RenombrarColumnas(data), "Fact_Lineas_" & criterio.vcPer & "_" & vcCodCue)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Sub

    Private Sub ExportarExcelResumenFacturacion(ByVal criterio As ENT_MOV_IMP_Criterio)
        Dim facturacion As BL_MOV_IMP_Facturacion = Nothing
        Dim data As DataTable

        Try
            facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            Dim FiltroCodSucursalesParaCuentas As String = ""

            If (oUsuario.F_vcCodInt.Trim() <> "") Then

                Dim arrayCodigosAreas As String() = oUsuario.F_vcCodInt.Split(",")

                For Each codigo As String In arrayCodigosAreas
                    'CodigoOrganizacion LIKE @CodInt + '%' OR ISNULL(CodigoOrganizacion,'') = ''
                    FiltroCodSucursalesParaCuentas += "("
                    FiltroCodSucursalesParaCuentas += "C.CodigoOrganizacion LIKE '" & codigo.ToString & "%' OR ISNULL(C.CodigoOrganizacion,'') = ''"
                    FiltroCodSucursalesParaCuentas += ") OR"
                Next
            End If

            If (FiltroCodSucursalesParaCuentas <> "") Then
                FiltroCodSucursalesParaCuentas = FiltroCodSucursalesParaCuentas.Substring(0, FiltroCodSucursalesParaCuentas.Length - 3)
            End If

            Dim vcCodOpe As Integer
            Dim vcNomOpe As String
            If criterio.Operadores.Count > 0 Then
                Dim objOperador = New BL_GEN_Operador(0)
                For Each oOperador As ENT_GEN_Operador In criterio.Operadores
                    vcCodOpe += oOperador.P_inCodOpe
                    vcNomOpe = objOperador.Mostrar(Convert.ToInt32(vcCodOpe)).vcCodOpe
                Next
            End If
            'data = facturacion.ListarResumenPorCuenta(criterio, criterio.vcPer, 9000000, 1, "vcNum", "asc", vcCodOpe, vcCodCue, Linea).Tables(0)
            data = facturacion.Listar_ResumenFacturacion(criterio.vcPer, vcCodOpe.ToString(), FiltroCodSucursalesParaCuentas, oUsuario.P_inCod)

            Try

                For Each col As DataColumn In data.Columns
                    If col.ColumnName = "TOTAL CONSUMO IMPUESTOS " Then
                        data.Columns.Remove("TOTAL CONSUMO IMPUESTOS ")
                    End If
                Next

            Catch ex As Exception

            End Try


            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(RenombrarColumnas(data), "Res_Factura_" & vcNomOpe.ToString() & "_" & criterio.vcPer, Nothing, True, Dominio, Usuario)


            'eegResumen.ExportarDatos(RenombrarColumnas(data), "Fact_Lineas_" & criterio.vcPer & "_" & vcCodCue)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Sub

    Private Function RenombrarColumnas(ByVal prData As DataTable) As DataTable
        Try
            Dim contador As Integer = 0
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "RowNumber"
                        prData.Columns.Remove("RowNumber")
                        contador = contador + 1
                        Continue For
                    Case "vcNum"
                        prData.Columns(index - contador).ColumnName = "Línea"
                        Continue For

                    Case "id"
                        prData.Columns.Remove("id")
                        contador = contador + 1
                        Continue For
                    Case "periodo"
                        prData.Columns(index - contador).ColumnName = "Periodo"
                        Continue For
                    Case "montoOperador"
                        prData.Columns(index - contador).ColumnName = "Cobro Operador"
                        Continue For
                    Case "montoFamilia"
                        prData.Columns(index - contador).ColumnName = "Cobro Plan Familia"
                        Continue For
                    Case "diferencia"
                        prData.Columns(index - contador).ColumnName = "Diferencia"
                        Continue For
                    Case "inNoEmitidos"
                        prData.Columns(index - contador).ColumnName = "No Emitidos"
                        Continue For
                    Case "estado"
                        prData.Columns(index - contador).ColumnName = "Estado"
                        Continue For
                    Case "inSinLinea"
                        prData.Columns(index - contador).ColumnName = "Sin líneas asociadas"
                        Continue For

                    Case "idTipoProceso"
                        prData.Columns.Remove("idTipoProceso")
                        contador = contador + 1
                        Continue For
                    Case "proceso"
                        prData.Columns(index - contador).ColumnName = "Proceso"
                        Continue For
                    Case "idTipoProducto"
                        prData.Columns.Remove("idTipoProducto")
                        contador = contador + 1
                        Continue For
                    Case "tipoMotivo"
                        prData.Columns(index - contador).ColumnName = "Motivo"
                        Continue For
                    Case "fechaEmision"
                        prData.Columns(index - contador).ColumnName = "Fecha Emisión"
                        Continue For
                    Case "idTipoDoc"
                        prData.Columns.Remove("idTipoDoc")
                        contador = contador + 1
                        Continue For
                    Case "tipoDocumento"
                        prData.Columns(index - contador).ColumnName = "Tipo Documento"
                        Continue For
                    Case "nroComprobante"
                        prData.Columns(index - contador).ColumnName = "N° Comprobante"
                        Continue For
                    Case "empleado"
                        prData.Columns(index - contador).ColumnName = "Empleado"
                        Continue For
                    Case "nroComp2"
                        prData.Columns.Remove("nroComp2")
                        contador = contador + 1
                        Continue For
                    Case "idEmpleado"
                        prData.Columns(index - contador).ColumnName = "Cod. Emp."
                        Continue For
                    Case "importeTotal"
                        prData.Columns(index - contador).ColumnName = "Importe Total"
                        Continue For
                    Case "montoCobrado"
                        prData.Columns(index - contador).ColumnName = "Monto Cobrado"
                        Continue For
                    Case "idEstadoCobro"
                        prData.Columns.Remove("idEstadoCobro")
                        contador = contador + 1
                        Continue For
                    Case "estadoCobro"
                        prData.Columns(index - contador).ColumnName = "Estado"
                        Continue For
                    Case "observacion"
                        prData.Columns(index - contador).ColumnName = "Observaciones"
                        Continue For
                    Case "IdCronogramaPago"
                        prData.Columns.Remove("IdCronogramaPago")
                        contador = contador + 1
                        Continue For

                    Case "nroComprobante2"
                        prData.Columns.Remove("nroComprobante2")
                        contador = contador + 1
                        Continue For

                    Case Else

                End Select
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
        Return prData
    End Function

    Private Sub GenerarReporteComprobante(nroComprobante As String)
        Dim bl_comprobante As BL_MOV_FAC_Comprobante = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing

        Dim vcNombreReporte As String

        'vcNombreReporte = Server.MapPath("~\\P_Movil\\Administrar\\Reportes\\Adm_Rpt_Comprobantes.rpt")
        vcNombreReporte = "Reportes/Adm_Rpt_Comprobantes.rpt"

        ''crConsulta.Report.FileName = vcNombreReporte

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            bl_comprobante = New BL_MOV_FAC_Comprobante(oUsuario.IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)

            Dim dtCliente As DataTable = Nothing
            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            Dim dt As DataTable = bl_comprobante.Listar_ComprobantePdf(nroComprobante)
            Dim dsDatos As New DataSet
            If dt.Rows.Count > 0 Then

                dsDatos.Tables.Add(dt.Copy)
                dsDatos.Tables(0).TableName = "MOV_s_FAC_ComprobantePdf"
                dsDatos.Tables.Add(dtCliente.Copy)
                dsDatos.Tables(1).TableName = "GEN_s_Cliente_PorCodigo"
                'crConsulta.ReportDocument.SetDataSource(dt)
                ''crConsulta.ReportDocument.SetDataSource(dsDatos)

                divMsgConfirmacion.Style("display") = "none"

                Dim script As String = "window.parent.fnShowIframe();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                ''crvConsulta.Visible = False
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If

        Catch ex As Exception
        Finally
            If bl_comprobante IsNot Nothing Then bl_comprobante.Dispose()
        End Try
    End Sub

    Private Sub GenerarReporteLineaComprobante(inEstado As Integer, vcFecIni As String, vcFecFin As String)
        Dim bl_Linea As BL_MOV_Linea = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing

        Dim vcNombreReporte As String
        vcNombreReporte = "Reportes/Adm_Rpt_Linea_CambioEstadoxComprobante.rpt"
        ''crConsulta.Report.FileName = vcNombreReporte

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            bl_Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            Dim dtCliente As DataTable = Nothing
            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            Dim dt As DataTable = bl_Linea.ReporteAgrupadoPorCambioEstadoComprobante(inEstado, vcFecIni, vcFecFin)

            Dim dsDatos As New DataSet

            If dt.Rows.Count > 0 Then
                dsDatos.Tables.Add(dt.Copy)
                dsDatos.Tables(0).TableName = "MOV_s_Linea_Reporte_CambioEstado"
                dsDatos.Tables.Add(dtCliente.Copy)
                dsDatos.Tables(1).TableName = "GEN_s_Cliente_PorCodigo"
                'crConsulta.ReportDocument.SetDataSource(dt)
                ''crConsulta.ReportDocument.SetDataSource(dsDatos)

                divMsgConfirmacion.Style("display") = "none"

                Dim script As String = "window.parent.fnShowIframe();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)



                'crConsulta.ReportDocument.SetDataSource(dt)

                'divMsgConfirmacion.Style("display") = "none"
            Else
                ''crvConsulta.Visible = False
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If

        Catch ex As Exception
        Finally
            If bl_Linea IsNot Nothing Then bl_Linea.Dispose()
        End Try
    End Sub

    Private Sub GenerarReporte_Despacho_InicialesEmpleados(ByVal IdCampana As Integer)
        Dim Fechas As String = HttpContext.Current.Session("ListaFechas")
        Dim Tipo As Integer = Convert.ToInt32(HttpContext.Current.Session("TipoReporte"))
        Dim IdOficina As Integer = Convert.ToInt32(HttpContext.Current.Session("IdOficinaReporte"))
        Dim NombreHoja As String = "Despachos_Por_Letras"
        Dim Despacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Despacho = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)
            Dim cabecera As New List(Of ENT_ENT_Campo)
            Dim ds As DataSet = Despacho.ReporteDespachoLetras(Fechas, Tipo, IdCampana, IdOficina)
            ', oUsuario.F_vcCodInt)

            For Each col As DataColumn In ds.Tables(0).Columns
                cabecera.Add(New ENT_ENT_Campo(col.ColumnName, col.ColumnName, col.ColumnName))
            Next

            'eegReporte.ExportarDatos(ds.Tables(0), NombreHoja, cabecera)
            ExportDataTableToExcel(ds.Tables(0), NombreHoja, cabecera, 0)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Despacho IsNot Nothing Then Despacho.Dispose()
        End Try
    End Sub

End Class
