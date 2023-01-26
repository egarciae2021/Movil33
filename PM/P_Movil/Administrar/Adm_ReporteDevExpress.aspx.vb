Imports System.Threading
Imports System.Globalization
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Utilitarios
Imports DevExpress.XtraReports.UI
Imports System.IO
Imports VisualSoft.Common.Logging
Imports DevExpress.XtraEditors
Imports DevExpress.XtraPrinting.Native
Imports System.Windows.Forms

Public Class Adm_ReporteDevExpress
    Inherits System.Web.UI.Page
    Dim titulo1, titulo2 As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Response.Clear()
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

        Dim oHistorico As ENT_MOV_Historicos = CType(Session("Historico" & NumCriterio), ENT_MOV_Historicos)
        Dim v_oCriterio As New ENT_MOV_IMP_Criterio

        If Not Integer.TryParse(Request.QueryString("inFilReg"), inFilReg) Then
            inFilReg = 2
        End If

        dvReporte.Visible = True
        dvSinDatos.Visible = False

        If vcTipRep IsNot Nothing Then
            Select Case vcTab
                Case "MOV_Plan"
                    Select Case vcTipRep
                        Case "1"
                            GenerarReportePlanServiciosAgrupados(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                        Case "2"
                            GenerarReportePlanLineasAgrupadas(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                        Case "3"
                            GenerarReportePlanPorEquipo(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro, Detalle)
                    End Select
                Case "MOV_Cuenta"
                    Select Case vcTipRep
                        Case "1"
                            GenerarReporteCuentaDistribucionBolsa(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                        Case "2"
                            GenerarReporteCuentaLineasAgrupadas(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                    End Select
                Case "MOV_ModeloDispositivo"
                    Select Case vcTipRep
                        Case "1"
                            GenerarReporteModeloDispositivoAgrupadoPorTipo(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
                        Case "2"
                            GenerarReporteModeloDispositivoAgrupadoPorGrupo(1, vcTab, inEstado, vcCampoFiltro, vcDescFiltro)
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
                Case "MOV_CAM_CampanaDespachoOperador"
                    Select Case vcTipRep
                        Case "1"
                            GenerarReporte_Almacen_IngresoPorModelos()
                    End Select
                Case "MOV_Solicitud"
                    Select Case vcTipRep
                        Case "1"
                            Dim ProductoEstandar As String = "" & ConfigurationManager.AppSettings("EsProductoEstandar")
                            If ProductoEstandar = "0" Then
                                GenerarFormatoSolicitudes()
                            Else
                                GenerarFormatoSolicitudes_Estandar()
                            End If
                        Case "2" 'Resguardo
                            Dim EsProductoEstandar As String = "" & ConfigurationManager.AppSettings("EsProductoEstandar")
                            If EsProductoEstandar = "0" Then
                                GenerarFormatoResguardo()
                            Else
                                GenerarFormatoResguardo_Estandar()
                            End If

                        Case "3" 'Asignacion
                            GenerarFormatoAsignacion()
                    End Select

                Case "FACTURACION"
                    GenerarReporteFacturacion(vcTipRep)

            End Select
        End If
    End Sub
    '---------------------
    'MOV_CAMPANA
    Private Sub GenerarReporte_Almacen_IngresoPorModelos()
        Dim CampanaDespacho As BL_MOV_CAM_CampanaDespacho = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            CampanaDespacho = New BL_MOV_CAM_CampanaDespacho(oUsuario.IdCliente)

            Dim FecIni = Request.QueryString("FecIni")
            Dim FecFin = Request.QueryString("FecFin")
            Dim TipLin = Request.QueryString("TipLin")
            Dim IdCamp = Request.QueryString("IdCamp")

            hdfParent.Value = "1"
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Thread.CurrentThread.CurrentCulture = New CultureInfo(oCultura.vcCodCul)
            If FecIni.Length > 0 Then
                FecIni = DateTime.Parse(FecIni).ToString("yyyyMMdd")
            End If
            If FecFin.Length > 0 Then
                FecFin = DateTime.Parse(FecFin).ToString("yyyyMMdd")
            End If

            Dim dsResultado As DataSet
            dsResultado = CampanaDespacho.RepAlm_IngresosSalidas_FechaModelos(IdCamp, TipLin, FecIni, FecFin)

            If dsResultado.Tables(0).Rows.Count > 0 Then
                titulo1 = "Reporte de Almacén"
                titulo2 = "Ingreso y salidas de almacén"

                dsResultado.Tables(0).TableName = "MOV_CAM_rpt_DespachoOperador"
                Dim myReport As XRPT_Campana_DespachoOperador = New XRPT_Campana_DespachoOperador()

                GenerarReporte(myReport, dsResultado.Tables(0))
                'Dim script As String = "window.parent.fnShowIframe();"
                'Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CampanaDespacho) Then CampanaDespacho.Dispose()
        End Try
    End Sub
    '---------------------
    'MOV_Linea
    Private Sub GenerarReporteLineaComprobante(inEstado As Integer, vcFecIni As String, vcFecFin As String)
        Dim bl_Linea As BL_MOV_Linea = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            bl_Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            Dim dtCliente As DataTable = Nothing
            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            Dim dt As DataTable = bl_Linea.ReporteAgrupadoPorCambioEstadoComprobante(inEstado, vcFecIni, vcFecFin)

            If dt.Rows.Count > 0 Then

                titulo1 = "REPORTE DE LÍNEAS"
                titulo2 = "Cambio de Estado - Comprobantes"

                dt.TableName = "MOV_s_Linea_Reporte_CambioEstado"
                Dim myReport As XRPT_Linea_Reporte_CambioEstado = New XRPT_Linea_Reporte_CambioEstado()

                GenerarReporte(myReport, dt)

                divMsgConfirmacion.Style("display") = "none"

                Dim script As String = "window.parent.fnShowIframe();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                Dim script As String = "SinDatos();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If

        Catch ex As Exception
        Finally
            If bl_Linea IsNot Nothing Then bl_Linea.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteLineaAgrupadoPorArea(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Linea.ReporteAgrupadoPorArea(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE LÍNEAS"
                titulo2 = "Agrupados por Organización"

                dt.Tables(0).TableName = "MOV_s_Linea_Reporte_AgrupadoPorArea"
                Dim myReport As XRPT_Linea_Reporte_AgrupadoPorArea = New XRPT_Linea_Reporte_AgrupadoPorArea()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try

    End Sub
    Private Sub GenerarReporteLineaHistoricos(ByVal oHistorico As ENT_MOV_Historicos, ByVal vcTipoReporteHistoricos As String)
        Dim Historico As New BL_MOV_Historico(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim dictCampoFormula As New Dictionary(Of String, String)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Historico.ReporteLineasHistoricos(oHistorico, vcCodInt, vcTipoReporteHistoricos)

            If dt.Tables(0).Rows.Count > 0 Then
                If vcTipoReporteHistoricos = "1" Then
                    titulo1 = "REPORTE DE LÍNEAS HISTORICAS"
                Else
                    titulo1 = "REPORTE DE HISTORICOS DE ASIGNACIONES"
                End If
                titulo2 = "Agrupadas por Líneas"

                dt.Tables(0).TableName = "MOV_s_Linea_Reporte_Historicos"
                Dim myReport As XRPT_Linea_Reporte_Historicos = New XRPT_Linea_Reporte_Historicos()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If Historico IsNot Nothing Then Historico.Dispose()
        End Try

    End Sub
    Private Sub GenerarReporteLineaDistribucionBolsa(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Linea.ReporteDistribucionBolsa(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE LÍNEAS"
                titulo2 = "Distribución de Bolsa"

                dt.Tables(0).TableName = "MOV_s_Linea_Reporte_DistribucionBolsa"
                Dim myReport As XRPT_Linea_Reporte_DistribucionBolsa = New XRPT_Linea_Reporte_DistribucionBolsa()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteLineaAgrupadoPorEstado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 0, "", strFiltros)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Linea.ReporteAgrupadoPorEstado(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE LÍNEAS"
                titulo2 = "Agrupados por Estado"

                dt.Tables(0).TableName = "MOV_s_Linea_Reporte_AgrupadoPorEstado"
                Dim myReport As XRPT_Linea_Reporte_AgrupadoPorEstado = New XRPT_Linea_Reporte_AgrupadoPorEstado()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteLineaAgrupadoPorEmpleado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 0, "", strFiltros)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Linea.ReporteAgrupadoPorEmpleado(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE LÍNEAS"
                titulo2 = "Agrupados por Empleado"

                dt.Tables(0).TableName = "MOV_s_Linea_Reporte_AgrupadoPorEmpleado"
                Dim myReport As XRPT_Linea_Reporte_AgrupadoPorEmpleado = New XRPT_Linea_Reporte_AgrupadoPorEmpleado()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteLineaAgrupadoPorCCO(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 0, "", strFiltros)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Linea.ReporteAgrupadoPorCCO(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE LÍNEAS"
                titulo2 = "Agrupados por Centro de Costo"

                dt.Tables(0).TableName = "MOV_s_Linea_Reporte_AgrupadoPorCCO"
                Dim myReport As XRPT_Linea_Reporte_AgrupadoPorCCO = New XRPT_Linea_Reporte_AgrupadoPorCCO()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Linea IsNot Nothing Then Linea.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    '---------------------
    'MOV_Dispositivo
    Private Sub GenerarReporteDispositivosHistoricos(ByVal oHistorico As ENT_MOV_Historicos, ByVal vcTipoReporteHistoricos As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Historico As New BL_MOV_Historico(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim vcCodInt As String = oUsuario.F_vcCodInt

            Dim dt As DataSet = Historico.ReporteDispositivoHistoricos(oHistorico, vcCodInt, vcTipoReporteHistoricos)

            If dt.Tables(0).Rows.Count > 0 Then

                If vcTipoReporteHistoricos = "1" Then
                    titulo1 = "REPORTE DE DISPOSITIVOS HISTORICOS"
                Else
                    titulo1 = "REPORTE DE HISTORICOS DE ASIGNACIONES"
                End If
                titulo2 = "Agrupados por Dispositivos"

                dt.Tables(0).TableName = "MOV_s_Dispositivos_Reporte_Historicos"
                Dim myReport As XRPT_Dispositivos_Reporte_Historicos = New XRPT_Dispositivos_Reporte_Historicos()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
            If Historico IsNot Nothing Then Historico.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteDispositivoAgrupadoPorEmpleado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Campo As BL_MOV_Dispositivo = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Campo = New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Campo.ReporteAgrupadoPorEmpleado(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE DISPOSITIVOS"
                titulo2 = "Agrupados por Empleado"

                dt.Tables(0).TableName = "MOV_s_Dispositivo_Reporte_AgrupadoPorEmpleado"
                Dim myReport As XRPT_Dispositivo_AgrupadoPorEmpleado = New XRPT_Dispositivo_AgrupadoPorEmpleado()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If



        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteDispositivoAgrupadoPorEstado(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Campo As BL_MOV_Dispositivo = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try
            Campo = New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Campo.ReporteAgrupadoPorEstado(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE DISPOSITIVOS"
                titulo2 = "Agrupados por Estado"

                dt.Tables(0).TableName = "MOV_s_Dispositivo_Reporte_AgrupadoPorEstado"
                Dim myReport As XRPT_Dispositivo_AgrupadoPorEstado = New XRPT_Dispositivo_AgrupadoPorEstado()

                GenerarReporte(myReport, dt.Tables(0))
                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteDispositivoAgrupadoPorModelo(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Campo As BL_MOV_Dispositivo = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Campo = New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Campo.ReporteAgrupadoPorModelo(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE DISPOSITIVOS"
                titulo2 = "Agrupados por Modelo"

                dt.Tables(0).TableName = "MOV_s_Dispositivo_Reporte_AgrupadoPorModelo"
                Dim myReport As XRPT_Dispositivo_AgrupadoModelo = New XRPT_Dispositivo_AgrupadoModelo()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If



        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    '---------------------
    'MOV_Modelo
    Private Sub GenerarReporteModeloDispositivoAgrupadoPorGrupo(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = ModeloDispositivo.ReporteAgrupadoPorGrupo(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE MODELOS"
                titulo2 = "Agrupados por Grupos"

                dt.Tables(0).TableName = "MOV_s_ModeloDispositivo_Reporte_AgrupadoPorGrupo"
                Dim myReport As XRPT_Modelo_AgrupadoPorGrupo = New XRPT_Modelo_AgrupadoPorGrupo()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteModeloDispositivoAgrupadoPorTipo(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = ModeloDispositivo.ReporteAgrupadoPorTipo(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE MODELOS"
                titulo2 = "Agrupados por Tipo"

                dt.Tables(0).TableName = "MOV_s_ModeloDispositivo_Reporte_AgrupadoPorTipo"
                Dim myReport As XRPT_Modelo_AgrupadoPorTipo = New XRPT_Modelo_AgrupadoPorTipo()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    '---------------------
    '---------------------
    'MOV_Cuenta
    Private Sub GenerarReporteCuentaLineasAgrupadas(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Cuenta = New BL_MOV_Cuenta(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Cuenta.ReporteLineasAgrupadas(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE CUENTAS"
                titulo2 = "Lineas agrupadas por cuenta"

                dt.Tables(0).TableName = "MOV_s_Cuenta_Reporte_LineasAgrupadas"
                Dim myReport As XRPT_Cuenta_LineasAgrupados = New XRPT_Cuenta_LineasAgrupados()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReporteCuentaDistribucionBolsa(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Cuenta = New BL_MOV_Cuenta(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Cuenta.ReporteDistribucionBolsa(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE CUENTAS"
                titulo2 = "Distribución de Bolsa"

                dt.Tables(0).TableName = "MOV_s_Cuenta_Reporte_DistribucionBolsa"
                Dim myReport As XRPT_Cuenta_Reporte_DistribucionBolsa = New XRPT_Cuenta_Reporte_DistribucionBolsa()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    '---------------------
    '---------------------
    'MOV_Plan
    Private Sub GenerarReportePlanServiciosAgrupados(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Plan As BL_MOV_Plan = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Plan = New BL_MOV_Plan(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Plan.ReporteServiciosAgrupados(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE PLANES"
                titulo2 = "Servicios Agrupados"

                dt.Tables(0).TableName = "MOV_s_Plan_Reporte_ServiciosAgrupados"
                Dim myReport As XRPT_Plan_Reporte_ServiciosAgrupados = New XRPT_Plan_Reporte_ServiciosAgrupados()
                Dim mySubReport As XRPT_Plan_SubReporte_ServiciosAgrupados = New XRPT_Plan_SubReporte_ServiciosAgrupados()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReportePlanLineasAgrupadas(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Plan As BL_MOV_Plan = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Plan = New BL_MOV_Plan(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dt As DataSet = Plan.ReporteLineasAgrupadas(vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE PLANES"
                titulo2 = "Líneas Agrupadas"

                dt.Tables(0).TableName = "MOV_s_Plan_Reporte_LineasAgrupadas"
                Dim myReport As XRPT_Plan_Reporte_LineasAgrupadas = New XRPT_Plan_Reporte_LineasAgrupadas()
                Dim mySubReport As XRPT_Plan_SubReporte_LineasAgrupadas = New XRPT_Plan_SubReporte_LineasAgrupadas()

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    Private Sub GenerarReportePlanPorEquipo(ByVal inTipOri As Integer, ByVal vcTab As String, ByVal inEstado As Integer, ByVal vcCampoFiltro As String, ByVal vcDescFiltro As String, ByRef Detalle As String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Plan As BL_MOV_Plan = Nothing
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = FiltrosPorTablas(vcTab)
        Dim vcQuery As String = QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try
            Dim listaDatos As List(Of String) = Detalle.Split("*").ToList()

            If Detalle.IndexOf("*") >= 0 Then
                listaDatos = Detalle.Split("*").ToList()
            End If

            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plan = New BL_MOV_Plan(oUsuario.IdCliente)

            For index = 1 To 1
                If listaDatos(index - 1) = "" Then
                    listaDatos(index - 1) = "-1"
                End If
            Next

            Dim p_inModDis As String = Convert.ToInt32(listaDatos(0))

            Dim dt As DataSet = Plan.ListarPlanes_Filtros(p_inModDis, vcQuery)

            If dt.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE PLANES"
                titulo2 = "Lista de Planes por Equipo"

                dt.Tables(0).TableName = "MOV_s_GEN_ListaPlanes_Filtros"

                Dim myReport As XRPT_Plan = New XRPT_Plan()

                If (p_inModDis <> "-1") Then

                    myReport.LBLdispositivo.Text = "Modelo Dispositivo:"
                    myReport.TXTdisposivito.Text = dt.Tables(0).Rows(0)("vcNom").ToString()

                End If

                GenerarReporte(myReport, dt.Tables(0))

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
        End Try
    End Sub
    '--------------------
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

    Private Sub generarReporte_DataSourceDemanded(ByVal sender As Object, ByVal e As EventArgs)
    End Sub

    Private Sub GenerarReporte(ByRef myReport As XtraReport, _
                               ByVal dtDatosReporte As DataTable)

        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Cultura As BL_GEN_Cultura = Nothing
        Dim vcTipRep As String = Request.QueryString("vcTipRep")
        Dim vcTab As String = Request.QueryString("vcTab")
        Dim Regi As BL_GEN_Regi = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            Cultura = New BL_GEN_Cultura(oUsuario.IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            UtilitarioWeb.ActualizarCultura(oCultura)

            Dim LogoCliente As Byte() = Nothing
            If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                LogoCliente = Regi.Listar().REGI_imLOGEMP
            End If

            Dim dsDatos As New DataSet
            Dim dtCliente As DataTable = Nothing
            Dim dtCultura As DataTable = Cultura.ObtenerCulturaxIdCliente()


            dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

            If Not IsNothing(dtDatosReporte) And dtDatosReporte.Rows.Count > 0 Then
                dsDatos.Tables.Add(dtDatosReporte.Copy)
                dsDatos.Tables(0).TableName = dtDatosReporte.TableName
                dsDatos.Tables.Add(dtCliente.Copy)
                dsDatos.Tables(1).TableName = "GEN_s_Cliente_PorCodigo"
                dsDatos.Tables.Add(dtCultura.Copy)
                dsDatos.Tables(2).TableName = "GEN_s_Cultura_x_IdCliente"

                Dim mValores(8, 2) As String
                mValores(0, 0) = "cfTitulo1" : mValores(0, 1) = titulo1
                mValores(1, 0) = "cfTitulo2" : mValores(1, 1) = titulo2
                mValores(2, 0) = "cfEmpresa" : mValores(2, 1) = dtCliente.Rows(0)("vcNomCli").ToString()
                mValores(3, 0) = "cfUsuario" : mValores(3, 1) = oUsuario.vcNom
                AsignarValoresFormulas(myReport.CalculatedFields, mValores)

                dsDatos.EnforceConstraints = False

                myReport.DataSource = dsDatos
                myReport.DataAdapter = Nothing

                ''AddHandler myReport.DataSourceDemanded, AddressOf generarReporte_DataSourceDemanded

                dxReportViewer.Report = myReport



                If vcTipRep IsNot Nothing Then
                    Select Case vcTab
                        Case "MOV_Solicitud"
                            Select Case vcTipRep
                                Case "1"
                                    ''Dim myReport2 As XRPT_OrdenServicio = CType(myReport, XRPT_OrdenServicio)
                                    Dim myReport2 As XRPT_OrdenServicio_Estandar = CType(myReport, XRPT_OrdenServicio_Estandar)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                            End Select
                        Case "MOV_Plan"
                            Select Case vcTipRep
                                Case "1"
                                    '*********************************************************************************************************************
                                    Dim Plan As BL_MOV_Plan = Nothing
                                    Dim myReport2 As XRPT_Plan_Reporte_ServiciosAgrupados = CType(myReport, XRPT_Plan_Reporte_ServiciosAgrupados)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                    myReport2.DataAdapter = Nothing

                                    Try
                                        Dim mySubReportX As XRPT_Plan_SubReporte_ServiciosAgrupados = New XRPT_Plan_SubReporte_ServiciosAgrupados()
                                        mySubReportX.xrTituloMontoDeta.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                        Dim myServicioReport As XRPT_Plan_SubServicio_ServiciosAgrupados = New XRPT_Plan_SubServicio_ServiciosAgrupados()
                                        Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = Plan.SubPlan_ServiciosAgrupados_Plan(-1)
                                            dtSubPlan.TableName = "MOV_s_SubPlan_Reporte_ServiciosAgrupados"
                                            mySubReportX.DataSource = dtSubPlan
                                            mySubReportX.DataMember = dtSubPlan.TableName
                                            mySubReportX.DataAdapter = Nothing

                                            myReport2.XrSubreport1.ReportSource = mySubReportX
                                        Catch ex As Exception
                                        End Try

                                        'USAR CASE PARA DIFERENCIAR LA INSTANCIA DE SUBREPORTE A USAR****************************************************
                                        Try
                                            Dim dtServicio As DataTable = Plan.Servicio_ServiciosAgrupados_SubPlan_Plan(-1)
                                            dtServicio.TableName = "MOV_s_Servicio_Reporte_ServiciosAgrupados"
                                            myServicioReport.DataSource = dtServicio
                                            myServicioReport.DataMember = dtServicio.TableName
                                            mySubReportX.XrSubreport2.ReportSource = myServicioReport
                                            mySubReportX.DataAdapter = Nothing
                                        Catch ex As Exception
                                        End Try

                                    Catch ex As Exception
                                    Finally
                                        If Plan IsNot Nothing Then Plan.Dispose()
                                    End Try
                                    '*********************************************************************************************************************
                                Case "2"
                                    '*********************************************************************************************************************
                                    Dim Plan As BL_MOV_Plan = Nothing
                                    Dim myReportPlan_Lineas As XRPT_Plan_Reporte_LineasAgrupadas = CType(myReport, XRPT_Plan_Reporte_LineasAgrupadas)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReportPlan_Lineas.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReportPlan_Lineas.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReportPlan_Lineas.xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                    Try
                                        Dim mySubReportPlanXLinea As XRPT_Plan_SubReporte_LineasAgrupadas = New XRPT_Plan_SubReporte_LineasAgrupadas()
                                        mySubReportPlanXLinea.xrTituloMontoDeta.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                        Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = Plan.Listar_PlanesXLinea_LineasAgrupadas(-1)
                                            dtSubPlan.TableName = "MOV_s_Linea_Reporte_LineasAgrupadas"
                                            mySubReportPlanXLinea.DataSource = dtSubPlan
                                            mySubReportPlanXLinea.DataMember = dtSubPlan.TableName
                                            myReportPlan_Lineas.XrSubreport3.ReportSource = mySubReportPlanXLinea
                                        Catch ex As Exception
                                        End Try
                                    Catch ex As Exception
                                    Finally
                                        If Plan IsNot Nothing Then Plan.Dispose()
                                    End Try
                                    '*********************************************************************************************************************
                                Case "3"
                                    Dim myReport2 As XRPT_Plan = CType(myReport, XRPT_Plan)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                            End Select
                        Case "MOV_Cuenta"
                            Select Case vcTipRep
                                Case "1"
                                    '*********************************************************************************************************************
                                    Dim Cuenta As BL_MOV_Cuenta = Nothing
                                    Dim myReport2 As XRPT_Cuenta_Reporte_DistribucionBolsa = CType(myReport, XRPT_Cuenta_Reporte_DistribucionBolsa)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                    Try
                                        Dim mySubReportX As XRPT_Cuenta_SubReporte_DistribucionBolsa = New XRPT_Cuenta_SubReporte_DistribucionBolsa()
                                        mySubReportX.xrTituloMontoDeta.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                        Dim myServicioReport As XRPT_Cuenta_SubServicio_DistribucionBolsa = New XRPT_Cuenta_SubServicio_DistribucionBolsa()
                                        Cuenta = New BL_MOV_Cuenta(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = Cuenta.SubCuenta_DistribucionBolsa(-1)
                                            dtSubPlan.TableName = "MOV_s_SubCuenta_Reporte_DistribucionBolsa"
                                            mySubReportX.DataSource = dtSubPlan
                                            mySubReportX.DataMember = dtSubPlan.TableName
                                            myReport2.XrSubCuenta.ReportSource = mySubReportX
                                        Catch ex As Exception
                                        End Try

                                        'USAR CASE PARA DIFERENCIAR LA INSTANCIA DE SUBREPORTE A USAR****************************************************
                                        Try
                                            Dim dtServicio As DataTable = Cuenta.Servicio_DistribucionBolsa(-1)
                                            dtServicio.TableName = "MOV_s_Servicio_Reporte_DistribucionBolsa"
                                            myServicioReport.DataSource = dtServicio
                                            myServicioReport.DataMember = dtServicio.TableName
                                            mySubReportX.XrServicioCuenta.ReportSource = myServicioReport
                                        Catch ex As Exception
                                        End Try

                                    Catch ex As Exception
                                    Finally
                                        If Cuenta IsNot Nothing Then Cuenta.Dispose()
                                    End Try
                                    '*********************************************************************************************************************
                                Case "2"
                                    '*********************************************************************************************************************
                                    Dim Cuenta As BL_MOV_Cuenta = Nothing
                                    Dim myReport2 As XRPT_Cuenta_LineasAgrupados = CType(myReport, XRPT_Cuenta_LineasAgrupados)
                                    'Actualización de Imagen y Cabecera Total
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                    Try
                                        Dim mySubReportX As XRPT_Lineas_LineasAgrupados = New XRPT_Lineas_LineasAgrupados()
                                        mySubReportX.xrTituloMontoDeta.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                        Cuenta = New BL_MOV_Cuenta(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = Cuenta.ReporteLineasAgrupadas_X_Lineas(-1)
                                            dtSubPlan.TableName = "MOV_s_CuentasLineas_Reporte_LineasAgrupadas"
                                            mySubReportX.DataSource = dtSubPlan
                                            mySubReportX.DataMember = dtSubPlan.TableName
                                            myReport2.XrCuenta_LineasAgrupados.ReportSource = mySubReportX
                                        Catch ex As Exception
                                        End Try
                                    Catch ex As Exception
                                    Finally
                                        If Cuenta IsNot Nothing Then Cuenta.Dispose()
                                    End Try
                                    '*********************************************************************************************************************
                            End Select
                        Case "MOV_ModeloDispositivo"
                            Select Case vcTipRep
                                Case "1"
                                    Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
                                    Dim myReport2 As XRPT_Modelo_AgrupadoPorTipo = CType(myReport, XRPT_Modelo_AgrupadoPorTipo)
                                    'Actualización de Imagen
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    Try
                                        Dim mySubReportX As XRPT_Tipo_Modelo_Reporte = New XRPT_Tipo_Modelo_Reporte()
                                        ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = ModeloDispositivo.Listar_Tipo_ModeloDispositivo_Reporte(-1)
                                            dtSubPlan.TableName = "MOV_s_Tipo_ModeloDispositivo_Reporte"
                                            mySubReportX.DataSource = dtSubPlan
                                            mySubReportX.DataMember = dtSubPlan.TableName
                                            myReport2.XrTipo_ModeloDispositivo.ReportSource = mySubReportX
                                        Catch ex As Exception
                                        End Try
                                    Catch ex As Exception
                                    Finally
                                        If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
                                    End Try
                                Case "2"
                                    Dim myReport2 As XRPT_Modelo_AgrupadoPorGrupo = CType(myReport, XRPT_Modelo_AgrupadoPorGrupo)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                            End Select
                        Case "MOV_Dispositivo"
                            Select Case vcTipRep
                                Case "1"
                                    Dim Dispositivo As BL_MOV_Dispositivo = Nothing
                                    Dim myReport2 As XRPT_Dispositivo_AgrupadoModelo = CType(myReport, XRPT_Dispositivo_AgrupadoModelo)
                                    'Actualización de Imagen
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If

                                    Try
                                        Dim mySubReportX As XRPT_Dispositivo_Sub_AgrupadoModelo = New XRPT_Dispositivo_Sub_AgrupadoModelo()
                                        Dispositivo = New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = Dispositivo.Listar_Dispositivo_Reporte_Detalle(-1)
                                            dtSubPlan.TableName = "MOV_s_Dispositivo_Reporte_Detalle"
                                            mySubReportX.DataSource = dtSubPlan
                                            mySubReportX.DataMember = dtSubPlan.TableName
                                            myReport2.XrSubreportDispositivo.ReportSource = mySubReportX
                                        Catch ex As Exception
                                        End Try
                                    Catch ex As Exception
                                    Finally
                                        If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
                                    End Try
                                Case "2"
                                    Dim myReport2 As XRPT_Dispositivo_AgrupadoPorEstado = CType(myReport, XRPT_Dispositivo_AgrupadoPorEstado)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                Case "3"
                                    Dim Dispositivo As BL_MOV_Dispositivo = Nothing
                                    Dim myReport2 As XRPT_Dispositivo_AgrupadoPorEmpleado = CType(myReport, XRPT_Dispositivo_AgrupadoPorEmpleado)
                                    'Actualización de Imagen
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    Try
                                        Dim mySubReportX As XRPT_Dispositivo_Sub_AgrupadoPorEmpleado = New XRPT_Dispositivo_Sub_AgrupadoPorEmpleado()
                                        Dispositivo = New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = Dispositivo.Listar_Dispositivo_SubReporte_AgrupadoPorEmpleado(-1)
                                            dtSubPlan.TableName = "MOV_s_Dispositivo_SubReporte_AgrupadoPorEmpleado"
                                            mySubReportX.DataSource = dtSubPlan
                                            mySubReportX.DataMember = dtSubPlan.TableName
                                            myReport2.XrSubreportDispositivo3.ReportSource = mySubReportX
                                        Catch ex As Exception
                                        End Try
                                    Catch ex As Exception
                                    Finally
                                        If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
                                    End Try
                                Case "4"
                                    Dim Dispositivo As BL_MOV_Dispositivo = Nothing
                                    Dim myReport2 As XRPT_Dispositivos_Reporte_Historicos = CType(myReport, XRPT_Dispositivos_Reporte_Historicos)
                                    'Actualización de Imagen
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                            End Select
                        Case "MOV_Linea"
                            Select Case vcTipRep
                                Case "1"
                                    Dim myReport2 As XRPT_Linea_Reporte_AgrupadoPorCCO = CType(myReport, XRPT_Linea_Reporte_AgrupadoPorCCO)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                Case "2"
                                    Dim myReport2 As XRPT_Linea_Reporte_AgrupadoPorEmpleado = CType(myReport, XRPT_Linea_Reporte_AgrupadoPorEmpleado)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.XrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                Case "3"
                                    Dim myReport2 As XRPT_Linea_Reporte_AgrupadoPorEstado = CType(myReport, XRPT_Linea_Reporte_AgrupadoPorEstado)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    myReport2.XrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                Case "4"
                                    Dim Linea As BL_MOV_Linea = Nothing
                                    Dim myReport2 As XRPT_Linea_Reporte_DistribucionBolsa = CType(myReport, XRPT_Linea_Reporte_DistribucionBolsa)
                                    'Actualización de Imagen
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                    Try
                                        Dim mySubReportX As XRPT_Linea_SubReporte_DistribucionBolsa = New XRPT_Linea_SubReporte_DistribucionBolsa()
                                        mySubReportX.xrTituloMonto.Text = String.Format("Monto ({0})", oCultura.Moneda.vcSimMon)
                                        Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                                        Try
                                            Dim dtSubPlan As DataTable = Linea.Listar_Linea_SubReporte_DistribucionBolsa(-1)
                                            dtSubPlan.TableName = "MOV_s_Linea_SubReporte_DistribucionBolsa"
                                            mySubReportX.DataSource = dtSubPlan
                                            mySubReportX.DataMember = dtSubPlan.TableName
                                            myReport2.XrSubreport1.ReportSource = mySubReportX
                                        Catch ex As Exception
                                        End Try
                                    Catch ex As Exception
                                    Finally
                                        If Linea IsNot Nothing Then Linea.Dispose()
                                    End Try
                                Case "5"
                                    Dim myReport2 As XRPT_Linea_Reporte_Historicos = CType(myReport, XRPT_Linea_Reporte_Historicos)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                Case "6"
                                    Dim myReport2 As XRPT_Linea_Reporte_CambioEstado = CType(myReport, XRPT_Linea_Reporte_CambioEstado)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                                Case "7"
                                    Dim myReport2 As XRPT_Linea_Reporte_AgrupadoPorArea = CType(myReport, XRPT_Linea_Reporte_AgrupadoPorArea)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                            End Select
                        Case "MOV_CAM_CampanaDespachoOperador"
                            Select Case vcTipRep
                                Case "1"
                                    Dim myReport2 As XRPT_Campana_DespachoOperador = CType(myReport, XRPT_Campana_DespachoOperador)
                                    If LogoCliente IsNot Nothing Then
                                        myReport2.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                                    Else
                                        myReport2.xrPictureBoxLogo.Image = Nothing
                                    End If
                            End Select
                    End Select
                End If

            Else
                dxReportViewer.Visible = False
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
            If Regi IsNot Nothing Then Regi.Dispose()
        End Try

    End Sub
    Private Sub AsignarValoresFormulas(ByRef CamposCalculados As CalculatedFieldCollection, mValores(,) As String)
        For x As Integer = 0 To UBound(mValores) - 1
            If mValores(x, 0) IsNot Nothing AndAlso mValores(x, 0) <> "" Then
                For Each calcFiel As CalculatedField In CamposCalculados
                    If calcFiel.Name = mValores(x, 0) Then
                        calcFiel.Expression = "'" & mValores(x, 1) & "'"
                        Exit For
                    End If
                Next
            End If
        Next
    End Sub
    Private Sub dxReportViewer_CacheReportDocument(sender As Object, e As DevExpress.XtraReports.Web.CacheReportDocumentEventArgs) Handles dxReportViewer.CacheReportDocument
        e.Key = Guid.NewGuid().ToString()
        Page.Session(e.Key) = e.SaveDocumentToMemoryStream()
    End Sub
    Private Sub dxReportViewer_RestoreReportDocumentFromCache(sender As Object, e As DevExpress.XtraReports.Web.RestoreReportDocumentFromCacheEventArgs) Handles dxReportViewer.RestoreReportDocumentFromCache
        Dim stream As Stream = TryCast(Page.Session(e.Key), Stream)
        If stream IsNot Nothing Then
            e.RestoreDocumentFromStream(stream)
        End If
    End Sub
    Public Function byteArrayToImage(byteArrayIn As Byte()) As System.Drawing.Image
        Try
            Dim converter As New System.Drawing.ImageConverter()
            Dim img As System.Drawing.Image = DirectCast(converter.ConvertFrom(byteArrayIn), System.Drawing.Image)
            Return img
        Catch ex As Exception
            Return Nothing
        End Try
    End Function














    Private Sub GenerarFormatoSolicitudes()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim Plan As BL_MOV_Plan = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing ' CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = "" 'FiltrosPorTablas(vcTab)
        Dim vcQuery As String = "" 'QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim FilaCabecera As XRTableRow
        Dim Fila As XRTableRow
        Dim Celda As XRTableCell

        Try

            Dim NroServicio As String = ""
            Dim IdOrden As String = Request.QueryString("IdOrden")
            Dim IdTipoSolicitud As String = Request.QueryString("IdTipoSolicitud")
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dsDatos As DataSet = Solicitud.Formato_OrdenServicio(IdTipoSolicitud, IdOrden)

            If dsDatos.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE PLANES"
                titulo2 = "Líneas Agrupadas"

                Dim myReport As XRPT_OrdenServicio = New XRPT_OrdenServicio()
                ''Dim myReport As XRPT_OrdenServicio_General = New XRPT_OrdenServicio_General()

                ''GenerarReporte(myReport, dt.Tables(0))

                Dim dtOrdenServicio As DataTable = dsDatos.Tables(0).Copy
                Dim dtSolicitudes As DataTable = dsDatos.Tables(1).Copy
                'Dim dtOrdenServicio As DataTable = dsDatos.Tables(1).Copy
                'Dim drFilaCabecera As DataRow = dtCabecera.Rows(0)
                Dim drFilaOS As DataRow = dtOrdenServicio.Rows(0)


                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                dxReportViewer.Report = myReport

                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                'Datos del Reporte...
                With myReport

                    ''.lblCargo.Text = drFilaOS("Cargo").ToString()
                    ''.lblNombre.Text = drFilaOS("Nombre").ToString()
                    ''.lblOrganismo.Text = drFilaOS("Organismo").ToString()
                    ''.lblFicha.Text = drFilaOS("Ficha").ToString()
                    ''.lblNivel.Text = drFilaOS("Nivel").ToString()
                    ''.lblClaveDepartamento.Text = drFilaOS("ClaveDepartamento").ToString()
                    ''.lblDepartamento.Text = drFilaOS("Departamento").ToString()
                    ''.lblCentroTrabajo.Text = drFilaOS("CentroDeTrabajo").ToString()
                    ''.lblExtension.Text = drFilaOS("Extension").ToString()
                    ''.lblUbicacion.Text = drFilaOS("Ubicacion").ToString()

                    .xrOrigenSolicitud.Text = drFilaOS("OrigenSolicitud").ToString()

                    .lblDetalleSolicitud.Text = drFilaOS("Descripcion").ToString()

                    Select Case drFilaOS("TipoOrdenServicio").ToString()
                        Case "1" 'Celular
                            .lblTipoServicio.Text = "CELULAR"
                        Case "2" 'TABLET
                            .lblTipoServicio.Text = "TABLET"
                        Case "3" 'BAM
                            .lblTipoServicio.Text = "BAM"
                        Case "4" 'CHIP
                            .lblTipoServicio.Text = "CHIP"
                        Case "5" 'BLACKBERRY
                            .lblTipoServicio.Text = "BLACKBERRY"
                        Case "6" 'RADIOLOCALIZACIÓN
                            .lblTipoServicio.Text = "RADIOLOCALIZACIÓN"
                        Case "7" 'ROAMING
                            .lblTipoServicio.Text = "ROAMING"
                    End Select

                    Dim DetalleLineas As String = ""
                    Select Case drFilaOS("TipoMovimiento").ToString()
                        Case "2" 'Alta
                            .lblTipo_Altas.Text = "X"
                            .lblNroServicio.Text = "NUEVO"
                            .lblLinea.Text = "NUEVO"
                            .lblModeloEquipo.Text = "-"

                            ''If dtSolicitudes.Rows.Count = 1 Then

                            ''    .lblDetalleSolicitud.Text = "NUEVA ALTA"
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & drFilaOS("Descripcion").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & "Equipo solicitado: " & dtSolicitudes.Rows(0)("Modelo").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "Color: " & dtSolicitudes.Rows(0)("vcColor").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "Con. Internet (BES MODEM): " & dtSolicitudes.Rows(0)("ConexionInternet").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "10 Nos Frec.: " & dtSolicitudes.Rows(0)("NumerosFrecuentes").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "Paq. SMS: " & dtSolicitudes.Rows(0)("PaqueteSMS").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "Seguro: " & dtSolicitudes.Rows(0)("Seguro").ToString()
                            ''    Dim CuentaLinea As String = ""
                            ''    If Not Convert.IsDBNull(dtSolicitudes.Rows(0)("F_vcCodCuentaFinal")) Then
                            ''        CuentaLinea = dtSolicitudes.Rows(0)("F_vcCodCuentaFinal").ToString()
                            ''    Else
                            ''        CuentaLinea = dtSolicitudes.Rows(0)("F_vcCodCuentaInicial").ToString()
                            ''    End If
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "Cuenta: " & CuentaLinea
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "Plan: " & dtSolicitudes.Rows(0)("PlanSolicitado").ToString() & " (" & dtSolicitudes.Rows(0)("TipoPlan").ToString() & ")"
                            ''Else

                            .Detail_ALTA.Visible = True

                            Dim dtTmp As DataTable
                            Dim dv As DataView = dtSolicitudes.DefaultView
                            dv.Sort = "Modelo ASC"
                            dtTmp = dv.ToTable()

                            .lblDetalleSolicitud.Text = "NUEVA ALTA"
                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_ALTA.Rows(1)
                            For Each oFila As DataRow In dtTmp.Rows
                                Fila = New XRTableRow

                                Celda = New XRTableCell
                                Celda.Text = "NUEVO"
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("PlanSolicitado").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("TipoPlan").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Modelo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)


                                Celda = New XRTableCell
                                Celda.Text = oFila("Seguro").ToString()
                                Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Plazo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_ALTA.Rows.Add(Fila)

                            Next

                            ''End If

                        Case "11" 'Baja
                            .lblTipo_Bajas.Text = "X"
                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                                .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                                .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                                .lblModeloEquipo.Text = "-"
                                .lblDetalleSolicitud.Text = "BAJA LÍNEA"
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            Else
                                .lblLinea.Text = "(Ver Detalle Inferior)"
                                .lblModeloEquipo.Text = "-"
                                .lblNroServicio.Text = "(Ver Detalle Inferior)"

                                .Detail_BAJA.Visible = True
                                .lblDetalleSolicitud.Text = "BAJA LÍNEA"
                                If dtSolicitudes.Rows.Count = 1 Then
                                    .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                ElseIf dtSolicitudes.Rows.Count < 10 Then
                                    .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                Else
                                    .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                End If

                                .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()
                                FilaCabecera = .xrTable_DetalleLineas_BAJA.Rows(0)
                                For Each oFila As DataRow In dtSolicitudes.Rows
                                    Fila = New XRTableRow
                                    Celda = New XRTableCell
                                    Celda.Text = oFila("Linea").ToString()
                                    Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                    Fila.Cells.Add(Celda)

                                    ''Celda = New XRTableCell
                                    ''Celda.Text = oFila("SIM").ToString()
                                    ''Celda.Multiline = True
                                    ''Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                    ''Fila.Cells.Add(Celda)

                                    .xrTable_DetalleLineas_BAJA.Rows.Add(Fila)
                                Next

                            End If

                        Case "14" 'Cambio Plan
                            .lblTipo_CambioPlan.Text = "X"

                            ''If dtSolicitudes.Rows.Count = 1 Then
                            ''    .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''    .lblModeloEquipo.Text = "-"
                            ''    .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''    .lblDetalleSolicitud.Text = "CAMBIO DE PLAN"
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "PLAN ACTUAL: " & dtSolicitudes.Rows(0)("NombrePlanActual").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "PLAN NUEVO: " & dtSolicitudes.Rows(0)("NombrePlanNuevo").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''Else

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                                .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            Else
                                .lblLinea.Text = "(Ver Detalle Inferior)"
                                .lblNroServicio.Text = "(Ver Detalle Inferior)"
                            End If

                            .lblModeloEquipo.Text = "-"
                            .Detail_CAMBIOPLAN.Visible = True
                            .lblDetalleSolicitud.Text = "CAMBIO DE PLAN"

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_CAMBIOPLAN.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow
                                Celda = New XRTableCell
                                Celda.Text = oFila("Linea").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("NombrePlanActual").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("NombrePlanNuevo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("TipoPlan").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Seguro").ToString()
                                Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Plazo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_CAMBIOPLAN.Rows.Add(Fila)
                            Next

                            ''End If


                        Case "4" 'Reparación de equipo"
                            .lblTipo_Reparacion.Text = "X"

                            ''If dtSolicitudes.Rows.Count = 1 Then
                            ''    .lblLinea.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                            ''    .lblNroServicio.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                            ''    .lblModeloEquipo.Text = dtSolicitudes.Rows(0)("Modelo").ToString()
                            ''    .lblMarcaEquipo.Text = dtSolicitudes.Rows(0)("Marca").ToString()
                            ''    .lblNroSerie.Text = dtSolicitudes.Rows(0)("Serie").ToString()
                            ''    .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''    .lblIMEI.Text = dtSolicitudes.Rows(0)("IMEI").ToString()
                            ''    .lblDetalleSolicitud.Text = "REPARACIÓN DE EQUIPO"
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "MODELO: " & dtSolicitudes.Rows(0)("Modelo").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()
                            ''Else

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblLinea.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                                .lblNroServicio.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                                .lblModeloEquipo.Text = dtSolicitudes.Rows(0)("Modelo").ToString()
                                .lblMarcaEquipo.Text = dtSolicitudes.Rows(0)("Marca").ToString()
                                .lblNroSerie.Text = dtSolicitudes.Rows(0)("Serie").ToString()
                                .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                                .lblIMEI.Text = dtSolicitudes.Rows(0)("IMEI").ToString()
                            Else
                                .lblLinea.Text = "(Ver Detalle Inferior)"
                                .lblNroServicio.Text = "(Ver Detalle Inferior)"
                                .lblModeloEquipo.Text = "-"
                                .lblMarcaEquipo.Text = "-"
                                .lblNroSerie.Text = "-"
                                .lblNroSim.Text = "-"
                                .lblIMEI.Text = "-"
                            End If


                            .Detail_REPARACION.Visible = True
                            .lblDetalleSolicitud.Text = "REPARACIÓN DE EQUIPO"

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_REPARACION.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow
                                Celda = New XRTableCell
                                Celda.Text = oFila("F_vcNumLin").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Modelo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("Marca").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                ''Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("IMEI").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Observacion").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("Serie").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                ''Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("SIM").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                ''Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_REPARACION.Rows.Add(Fila)
                            Next

                            ''End If

                        Case "3" 'Reposición de equipo
                            .lblTipo_Reposicion.Text = "X"

                            ''If dtSolicitudes.Rows.Count = 1 Then
                            ''    .lblLinea.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                            ''    .lblNroServicio.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                            ''    .lblModeloEquipo.Text = dtSolicitudes.Rows(0)("Modelo").ToString()
                            ''    .lblMarcaEquipo.Text = dtSolicitudes.Rows(0)("Marca").ToString()
                            ''    .lblNroSerie.Text = dtSolicitudes.Rows(0)("Serie").ToString()
                            ''    .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''    .lblIMEI.Text = dtSolicitudes.Rows(0)("IMEI").ToString()
                            ''    .lblDetalleSolicitud.Text = "REPARACIÓN DE EQUIPO"
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & "MODELO: " & dtSolicitudes.Rows(0)("Modelo").ToString()
                            ''    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''Else

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblLinea.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                                .lblNroServicio.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                                .lblModeloEquipo.Text = dtSolicitudes.Rows(0)("Modelo").ToString()
                                .lblMarcaEquipo.Text = dtSolicitudes.Rows(0)("Marca").ToString()
                                .lblNroSerie.Text = dtSolicitudes.Rows(0)("Serie").ToString()
                                .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                                .lblIMEI.Text = dtSolicitudes.Rows(0)("IMEI").ToString()
                            Else
                                .lblLinea.Text = "(Ver Detalle Inferior)"
                                .lblNroServicio.Text = "(Ver Detalle Inferior)"
                                .lblModeloEquipo.Text = "-"
                                .lblMarcaEquipo.Text = "-"
                                .lblNroSerie.Text = "-"
                                .lblNroSim.Text = "-"
                                .lblIMEI.Text = "-"
                            End If


                            .Detail_REPARACION.Visible = True
                            .lblDetalleSolicitud.Text = "REPOSICIÓN DE EQUIPO"

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_REPARACION.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow
                                Celda = New XRTableCell
                                Celda.Text = oFila("F_vcNumLin").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Modelo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("Marca").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                ''Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("IMEI").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Observacion").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("Serie").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                ''Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("SIM").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                ''Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_REPARACION.Rows.Add(Fila)
                            Next

                            ''End If


                        Case "13" 'Interrupción del Servicio
                            '.lblTipo_Interrupcion.Text = "X"

                            'If dtSolicitudes.Rows.Count = 1 Then
                            '    .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            '    .lblModeloEquipo.Text = "-"
                            '    .lblDetalleSolicitud.Text &= vbCrLf & "Interrumpir el servicio."
                            '    .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            'Else
                            '    .lblLinea.Text = "(Ver Detalle Inferior)"
                            '    .lblModeloEquipo.Text = "-"
                            '    .lblNroServicio.Text = "(Ver Detalle Inferior)"
                            '    For Each oFila As DataRow In dtSolicitudes.Rows
                            '        DetalleLineas &= "Línea: " & oFila("Linea").ToString() & vbCrLf
                            '    Next
                            '    .lblDetalleLineas.Text = DetalleLineas

                            'End If


                            .Detail_SUSPENSION.Visible = True
                            .lblDetalleSolicitud.Text = "SUSPENSIÓN TEMPORAL"
                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If

                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_SUSPENSION.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow

                                Celda = New XRTableCell
                                Celda.Text = oFila("Linea").ToString()
                                .lblLinea.Text = oFila("Linea").ToString()
                                .lblNroServicio.Text = oFila("Linea").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("ModeloDispositivo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("MarcaModelo").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                ''Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("IMEI").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("Serie").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                ''Fila.Cells.Add(Celda)

                                ''Celda = New XRTableCell
                                ''Celda.Text = oFila("SIM").ToString()
                                ''Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                ''Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                If IsDBNull(oFila("MantenerEquipoActivo")) OrElse Convert.ToBoolean(oFila("MantenerEquipoActivo")) Then
                                    Celda.Text = "NO"
                                Else
                                    Celda.Text = "SI"
                                End If
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_SUSPENSION.Rows.Add(Fila)

                            Next

                        Case "-1" 'Problemas de Clone
                            .lblTipo_ProblemasClone.Text = "X"

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                                .lblModeloEquipo.Text = "-"
                                .lblDetalleSolicitud.Text &= vbCrLf & "Problemas de Clone."
                                .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            Else
                                .lblLinea.Text = "(Ver Detalle Inferior)"
                                .lblModeloEquipo.Text = "-"
                                .lblNroServicio.Text = "(Ver Detalle Inferior)"
                                For Each oFila As DataRow In dtSolicitudes.Rows
                                    DetalleLineas &= "Línea: " & oFila("Linea").ToString() & vbCrLf
                                Next
                                .lblDetalleLineas.Text = DetalleLineas

                            End If

                        Case "-2" 'Activación Cal
                            .lblTipo_ActivacionCal.Text = "X"

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                                .lblModeloEquipo.Text = "-"
                                .lblDetalleSolicitud.Text &= vbCrLf & "Activación Cal."
                                .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            Else
                                .lblLinea.Text = "(Ver Detalle Inferior)"
                                .lblModeloEquipo.Text = "-"
                                .lblNroServicio.Text = "(Ver Detalle Inferior)"
                                For Each oFila As DataRow In dtSolicitudes.Rows
                                    DetalleLineas &= "Línea: " & oFila("Linea").ToString() & vbCrLf
                                Next
                                .lblDetalleLineas.Text = DetalleLineas

                            End If

                        Case Else
                            .lblTipo_Otro.Text = "X"

                            Dim ExisteLinea As Boolean = False
                            If dtSolicitudes.Columns.Contains("Linea") Then ExisteLinea = True
                            ''If dtSolicitudes.Rows.Count = 1 Then

                            ''    Select Case dtSolicitudes.Rows(0)("vcTabla").ToString()
                            ''        Case "Suspension"
                            ''            .lblMarcaEquipo.Text = dtSolicitudes.Rows(0)("Marca").ToString()
                            ''            .lblModeloEquipo.Text = dtSolicitudes.Rows(0)("ModeloDispositivo").ToString()
                            ''            .lblIMEI.Text = dtSolicitudes.Rows(0)("IMEI").ToString()
                            ''            .lblNroSerie.Text = dtSolicitudes.Rows(0)("Serie").ToString()
                            ''            .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''            .lblDetalleSolicitud.Text = "SUSPENSIÓN TEMPORAL"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ''            If Convert.ToBoolean(dtSolicitudes.Rows(0)("MantenerEquipoActivo")) Then
                            ''                .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & "NO BLOQUEAR IMEI."
                            ''            Else
                            ''                .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & "BLOQUEO DE IMEI: " & .lblIMEI.Text
                            ''            End If
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''        Case "CambioCuenta"

                            ''            .lblMarcaEquipo.Text = dtSolicitudes.Rows(0)("Marca").ToString()
                            ''            .lblModeloEquipo.Text = dtSolicitudes.Rows(0)("ModeloDispositivo").ToString()
                            ''            .lblIMEI.Text = dtSolicitudes.Rows(0)("IMEI").ToString()
                            ''            .lblNroSerie.Text = dtSolicitudes.Rows(0)("Serie").ToString()
                            ''            .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''            .lblDetalleSolicitud.Text = "CAMBIO DE CUENTA"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "CUENTA ACTUAL: " & dtSolicitudes.Rows(0)("CodigoCuentaActual").ToString() & " - " & dtSolicitudes.Rows(0)("NombreCuentaActual").ToString()
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "CUENTA NUEVA: " & dtSolicitudes.Rows(0)("CodigoCuentaNuevo").ToString() & " - " & dtSolicitudes.Rows(0)("NombreCuentaNuevo").ToString()

                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()


                            ''        Case "ActivacionRoaming"

                            ''            .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblModeloEquipo.Text = "-"
                            ''            .lblDetalleSolicitud.Text = "ACTIVACIÓN ROAMING"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Destino(s): " & dtSolicitudes.Rows(0)("Destinos").ToString()
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Itinerario: " & dtSolicitudes.Rows(0)("Itinerario").ToString()
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Fecha Ida: " & Convert.ToDateTime(dtSolicitudes.Rows(0)("FechaIda")).ToString("dd/MM/yyyy")
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Fecha Retorno: " & Convert.ToDateTime(dtSolicitudes.Rows(0)("FechaRetorno")).ToString("dd/MM/yyyy")
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Plan Solicitado: " & dtSolicitudes.Rows(0)("NombrePlanSolicitado").ToString()

                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''        Case "AdquisicionSIM"

                            ''            .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblModeloEquipo.Text = "-"
                            ''            .lblDetalleSolicitud.Text = "ADQUISICIÓN SIM"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Lugar Recojo(s): " & dtSolicitudes.Rows(0)("LugarRecojo").ToString()
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Personal de Recojo: " & dtSolicitudes.Rows(0)("PersonalRecojo").ToString()

                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''        Case "Cambio"

                            ''            .lblLinea.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                            ''            .lblNroServicio.Text = dtSolicitudes.Rows(0)("F_vcNumLin").ToString()
                            ''            .lblModeloEquipo.Text = "-"
                            ''            .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''            .lblDetalleSolicitud.Text = "CAMBIO DE EQUIPO"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Equipo Solicitado: " & dtSolicitudes.Rows(0)("Modelo").ToString()
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & "Color: " & dtSolicitudes.Rows(0)("vcColor").ToString()

                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()


                            ''        Case "CambioNumero"
                            ''            .lblLinea.Text = dtSolicitudes.Rows(0)("NumeroActual").ToString()
                            ''            .lblNroServicio.Text = dtSolicitudes.Rows(0)("NumeroActual").ToString()
                            ''            .lblModeloEquipo.Text = "-"
                            ''            .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''            .lblDetalleSolicitud.Text = "CAMBIO DE NÚMERO"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''        Case "Reactivacion"
                            ''            .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblModeloEquipo.Text = "-"
                            ''            .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''            .lblDetalleSolicitud.Text = "REACTIVACIÓN DE SERVICIO"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''        Case "PrestamoEquipo"
                            ''            .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''            .lblModeloEquipo.Text = "-"
                            ''            .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                            ''            .lblDetalleSolicitud.Text = "PRÉSTAMO DE EQUIPO"
                            ''            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            ''    End Select


                            ''    If ExisteLinea Then .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''    If ExisteLinea Then .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                            ''Else


                            .lblModeloEquipo.Text = "-"
                            Select Case dtSolicitudes.Rows(0)("vcTabla").ToString()
                                ''Case "Suspension"
                                ''    .Detail_SUSPENSION.Visible = True
                                ''    .lblDetalleSolicitud.Text = "SUSPENSIÓN TEMPORAL"
                                ''    If dtSolicitudes.Rows.Count = 1 Then
                                ''        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                ''    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                ''        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                ''    Else
                                ''        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                ''    End If

                                ''    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                ''    FilaCabecera = .xrTable_DetalleLineas_SUSPENSION.Rows(1)
                                ''    For Each oFila As DataRow In dtSolicitudes.Rows
                                ''        Fila = New XRTableRow

                                ''        Celda = New XRTableCell
                                ''        Celda.Text = oFila("Linea").ToString()
                                ''        .lblLinea.Text = oFila("Linea").ToString()
                                ''        .lblNroServicio.Text = oFila("Linea").ToString()
                                ''        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                ''        Fila.Cells.Add(Celda)

                                ''        Celda = New XRTableCell
                                ''        Celda.Text = oFila("ModeloDispositivo").ToString()
                                ''        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                ''        Fila.Cells.Add(Celda)

                                ''        Celda = New XRTableCell
                                ''        Celda.Text = oFila("Marca").ToString()
                                ''        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                ''        Fila.Cells.Add(Celda)

                                ''        Celda = New XRTableCell
                                ''        Celda.Text = oFila("IMEI").ToString()
                                ''        Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                ''        Fila.Cells.Add(Celda)

                                ''        Celda = New XRTableCell
                                ''        Celda.Text = oFila("Serie").ToString()
                                ''        Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                ''        Fila.Cells.Add(Celda)

                                ''        ''Celda = New XRTableCell
                                ''        ''Celda.Text = oFila("SIM").ToString()
                                ''        ''Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                ''        ''Fila.Cells.Add(Celda)

                                ''        Celda = New XRTableCell
                                ''        If Convert.ToBoolean(oFila("MantenerEquipoActivo")) Then
                                ''            Celda.Text = "NO"
                                ''        Else
                                ''            Celda.Text = "SI"
                                ''        End If
                                ''        Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                ''        Fila.Cells.Add(Celda)

                                ''        .xrTable_DetalleLineas_SUSPENSION.Rows.Add(Fila)

                                ''    Next

                                Case "CambioCuentaPlan"
                                    .Detail_CAMBIOCUENTA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE CUENTA/PLAN"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_CAMBIOCUENTA.Rows(1)

                                    .xrCambioCuentaColumna1.Text = "Cuenta"
                                    .xrCambioCuentaColumna2.Text = "Plan"

                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        .lblLinea.Text = oFila("Linea").ToString()
                                        .lblNroServicio.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("CodigoCuentaNuevo").ToString() & " - " & oFila("NombreCuentaNuevo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("NombrePlanNuevo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_CAMBIOCUENTA.Rows.Add(Fila)
                                    Next


                                Case "CambioCuenta"
                                    .Detail_CAMBIOCUENTA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE CUENTA"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_CAMBIOCUENTA.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        .lblLinea.Text = oFila("Linea").ToString()
                                        .lblNroServicio.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("CodigoCuentaActual").ToString() & " - " & oFila("NombreCuentaActual").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("CodigoCuentaNuevo").ToString() & " - " & oFila("NombreCuentaNuevo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_CAMBIOCUENTA.Rows.Add(Fila)
                                    Next


                                Case "ActivacionRoaming"
                                    .Detail_ACTIVACIONROAMING.Visible = True
                                    .lblDetalleSolicitud.Text = "ACTIVACIÓN ROAMING"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_ACTIVACIONROAMING.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        .lblLinea.Text = oFila("Linea").ToString()
                                        .lblNroServicio.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Destinos").ToString() ''.Replace(Chr(10), vbCrLf)
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Itinerario").ToString() ''.Replace(Chr(10), vbCrLf)
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        If Not IsDBNull(oFila("FechaIda")) Then
                                            Celda.Text = Convert.ToDateTime(oFila("FechaIda")).ToString("dd/MM/yyyy")
                                        Else
                                            Celda.Text = "(Ver observación)"
                                        End If
                                        Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        If Not IsDBNull(oFila("FechaRetorno")) Then
                                            Celda.Text = Convert.ToDateTime(oFila("FechaRetorno")).ToString("dd/MM/yyyy")
                                        Else
                                            Celda.Text = "(Ver observación)"
                                        End If
                                        Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("NombrePlanSolicitado").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_ACTIVACIONROAMING.Rows.Add(Fila)
                                    Next


                                Case "AdquisicionSIM"
                                    .Detail_ADQUISICIONSIM.Visible = True
                                    .lblDetalleSolicitud.Text = "ADQUISICIÓN SIM"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_ADQUISICIONSIM.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        .lblLinea.Text = oFila("Linea").ToString()
                                        .lblNroServicio.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("LugarRecojo").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("PersonalRecojo").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_ADQUISICIONSIM.Rows.Add(Fila)
                                    Next



                                Case "Cambio"
                                    ''.Detail_CAMBIOEQUIPO.Visible = True
                                    .Detail_ALTA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE EQUIPO"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_ALTA.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("F_vcNumLin").ToString()
                                        .lblLinea.Text = oFila("F_vcNumLin").ToString()
                                        .lblNroServicio.Text = oFila("F_vcNumLin").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("PlanSolicitado").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("TipoPlan").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Modelo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Seguro").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Plazo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                        Fila.Cells.Add(Celda)


                                        .xrTable_DetalleLineas_ALTA.Rows.Add(Fila)

                                    Next



                                Case "CambioNumero"
                                    .Detail_BAJA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE NÚMERO"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If
                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_BAJA.Rows(0)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("NumeroActual").ToString()
                                        .lblLinea.Text = oFila("NumeroActual").ToString()
                                        .lblNroServicio.Text = oFila("NumeroActual").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        ''Celda = New XRTableCell
                                        ''Celda.Text = oFila("SIM").ToString()
                                        ''Celda.Multiline = True
                                        ''Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        ''Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_BAJA.Rows.Add(Fila)
                                    Next

                                Case "Reactivacion"
                                    .Detail_REACTIVACION.Visible = True
                                    .lblDetalleSolicitud.Text = "REACTIVACIÓN DEL SERVICIO"

                                    .lblLinea.Text = "(Ver Detalle)"
                                    .lblNroServicio.Text = "(Ver Detalle)"
                                    .lblModeloEquipo.Text = "-"
                                    .lblMarcaEquipo.Text = "-"
                                    .lblNroSerie.Text = "-"
                                    .lblNroSim.Text = "-"
                                    .lblIMEI.Text = "-"

                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                        .lblLinea.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                                        .lblNroServicio.Text = dtSolicitudes.Rows(0)("Linea").ToString()
                                        .lblModeloEquipo.Text = dtSolicitudes.Rows(0)("Modelo").ToString()
                                        .lblMarcaEquipo.Text = dtSolicitudes.Rows(0)("Marca").ToString()
                                        .lblNroSerie.Text = dtSolicitudes.Rows(0)("Serie").ToString()
                                        .lblNroSim.Text = dtSolicitudes.Rows(0)("SIM").ToString()
                                        .lblIMEI.Text = dtSolicitudes.Rows(0)("IMEI").ToString()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If
                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_REACTIVACION.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("SIM").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("IMEI").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_REACTIVACION.Rows.Add(Fila)
                                    Next

                                Case "PrestamoEquipo"
                                    .Detail_BAJA.Visible = True
                                    .lblDetalleSolicitud.Text = "PRÉSTAMO DE EQUIPO"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If
                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_BAJA.Rows(0)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        .lblLinea.Text = oFila("Linea").ToString()
                                        .lblNroServicio.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        ''Celda = New XRTableCell
                                        ''Celda.Text = oFila("SIM").ToString()
                                        ''Celda.Multiline = True
                                        ''Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        ''Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_BAJA.Rows.Add(Fila)
                                    Next

                            End Select

                            If dtSolicitudes.Rows.Count > 1 Then
                                .lblLinea.Text = "(Ver Detalle Inferior)"
                                .lblNroServicio.Text = "(Ver Detalle Inferior)"
                            End If

                    End Select


                    .lblFechaHoraInicio.Text = "Fecha Inicio: " & Convert.ToDateTime(drFilaOS("FechaInicio")).ToString("dd/MM/yyyy HH:mm")

                    Dim dtFechaActual As DateTime = Now
                    .lblFechaActual.Text = ObtenerNombreDia(dtFechaActual.DayOfWeek) & ", " & dtFechaActual.Day & " de " & ObtenerNombreMes(dtFechaActual.Month) & " de " & dtFechaActual.Year
                    .lblRepresentanteCompania.Text = drFilaOS("RepresentanteCompania").ToString()
                    .lblRepresentanteCompaniaCargo.Text = drFilaOS("RepresentanteCompaniaCargo").ToString()
                    .lblAdministradorContrato.Text = drFilaOS("AdministradorContrato").ToString()
                    .lblAdministradorContratoCargo.Text = drFilaOS("AdministradorContratoCargo").ToString()

                    .lblNroContrato.Text = drFilaOS("NroContrato").ToString()
                    .lblNroOrdenServicio.Text = drFilaOS("NroOrdenServicio").ToString()
                    NroServicio = drFilaOS("NroOrdenServicio").ToString()

                    '.lblDetalleLineas.Text = "LINEAS....."

                    If .lblDetalleLineas.Text = "" Then
                        .lblDetalleLineas.Visible = False
                    End If


                End With




                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                dxReportViewer.Report.ExportToPdf(oStream)

                Dim inline As Boolean = False
                Dim fileName As String = "ReporteOrdenServicio_" & NroServicio
                Dim fileType As String = "pdf"

                Response.ContentType = "application/" + fileType
                Response.AddHeader("Accept-Header", oStream.Length.ToString())
                Response.AddHeader("Content-Disposition", (IIf(inline, "Inline", "Attachment")) + "; filename=" + fileName + "." + fileType)
                Response.AddHeader("Content-Length", oStream.Length.ToString())
                Response.BinaryWrite(oStream.ToArray())
                Response.End()

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If
        Catch exThread As ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            ''If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub


    Private Sub GenerarFormatoSolicitudes_Estandar()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim Plan As BL_MOV_Plan = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing ' CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = "" 'FiltrosPorTablas(vcTab)
        Dim vcQuery As String = "" 'QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Dim FilaCabecera As XRTableRow
        Dim Fila As XRTableRow
        Dim Celda As XRTableCell

        Try

            Dim NroServicio As String = ""
            Dim IdOrden As String = Request.QueryString("IdOrden")
            Dim IdTipoSolicitud As String = Request.QueryString("IdTipoSolicitud")
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dsDatos As DataSet = Solicitud.Formato_OrdenServicio(IdTipoSolicitud, IdOrden)

            If dsDatos.Tables(0).Rows.Count > 0 Then

                titulo1 = "REPORTE DE PLANES"
                titulo2 = "Líneas Agrupadas"

                Dim myReport As XRPT_OrdenServicio_Estandar = New XRPT_OrdenServicio_Estandar()

                Dim dtOrdenServicio As DataTable = dsDatos.Tables(0).Copy
                Dim dtSolicitudes As DataTable = dsDatos.Tables(1).Copy
                Dim drFilaOS As DataRow = dtOrdenServicio.Rows(0)


                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                dxReportViewer.Report = myReport

                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                'Datos del Reporte...
                With myReport
                    .lblDetalleSolicitud.Text = drFilaOS("Descripcion").ToString()
                    Select Case drFilaOS("TipoOrdenServicio").ToString()
                        Case "1" 'Celular
                            .lblTipoServicio.Text = "CELULAR"
                        Case "2" 'TABLET
                            .lblTipoServicio.Text = "TABLET"
                        Case "3" 'BAM
                            .lblTipoServicio.Text = "BAM"
                        Case "4" 'CHIP
                            .lblTipoServicio.Text = "CHIP"
                        Case "5" 'BLACKBERRY
                            .lblTipoServicio.Text = "BLACKBERRY"
                        Case "6" 'RADIOLOCALIZACIÓN
                            .lblTipoServicio.Text = "RADIOLOCALIZACIÓN"
                        Case "7" 'ROAMING
                            .lblTipoServicio.Text = "ROAMING"
                    End Select

                    Dim DetalleLineas As String = ""
                    Select Case drFilaOS("TipoMovimiento").ToString()
                        Case "2" 'Alta
                            .lblTipoSolicitud.Text = "NUEVO"
                            .Detail_ALTA.Visible = True
                            Dim dtTmp As DataTable
                            Dim dv As DataView = dtSolicitudes.DefaultView
                            dv.Sort = "Modelo ASC"
                            dtTmp = dv.ToTable()
                            .lblDetalleSolicitud.Text = "NUEVA ALTA"
                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_ALTA.Rows(1)
                            For Each oFila As DataRow In dtTmp.Rows
                                Fila = New XRTableRow

                                Celda = New XRTableCell
                                Celda.Text = "NUEVO"
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("PlanSolicitado").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("TipoPlan").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Modelo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)


                                Celda = New XRTableCell
                                Celda.Text = oFila("Seguro").ToString()
                                Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Plazo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_ALTA.Rows.Add(Fila)

                            Next

                            ''End If

                        Case "11" 'Baja
                            .lblTipoSolicitud.Text = "BAJA"
                            .Detail_BAJA.Visible = True
                            .lblDetalleSolicitud.Text = "BAJA LÍNEA"
                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()
                            FilaCabecera = .xrTable_DetalleLineas_BAJA.Rows(0)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow
                                Celda = New XRTableCell
                                Celda.Text = oFila("Linea").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)
                                .xrTable_DetalleLineas_BAJA.Rows.Add(Fila)
                            Next


                        Case "14" 'Cambio Plan
                            .lblTipoSolicitud.Text = "CAMBIO PLAN"
                            .Detail_CAMBIOPLAN.Visible = True
                            .lblDetalleSolicitud.Text = "CAMBIO DE PLAN"

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_CAMBIOPLAN.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow
                                Celda = New XRTableCell
                                Celda.Text = oFila("Linea").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("NombrePlanActual").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("NombrePlanNuevo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("TipoPlan").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Seguro").ToString()
                                Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Plazo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_CAMBIOPLAN.Rows.Add(Fila)
                            Next

                            ''End If


                        Case "4" 'Reparación de equipo"
                            .lblTipoSolicitud.Text = "REPARACIÓN"
                            .Detail_REPARACION.Visible = True
                            .lblDetalleSolicitud.Text = "REPARACIÓN DE EQUIPO"

                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_REPARACION.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow
                                Celda = New XRTableCell
                                Celda.Text = oFila("F_vcNumLin").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Modelo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("IMEI").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Observacion").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)


                                .xrTable_DetalleLineas_REPARACION.Rows.Add(Fila)
                            Next

                            ''End If

                        Case "3" 'Reposición de equipo
                            .lblTipoSolicitud.Text = "REPOSICIÓN"
                            .Detail_REPARACION.Visible = True
                            .lblDetalleSolicitud.Text = "REPOSICIÓN DE EQUIPO"
                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If
                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()
                            FilaCabecera = .xrTable_DetalleLineas_REPARACION.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow
                                Celda = New XRTableCell
                                Celda.Text = oFila("F_vcNumLin").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Modelo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("IMEI").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("Observacion").ToString()
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_REPARACION.Rows.Add(Fila)
                            Next

                            ''End If


                        Case "13" 'Interrupción del Servicio
                            .lblTipoSolicitud.Text = "SUSPENSIÓN"
                            .Detail_SUSPENSION.Visible = True
                            .lblDetalleSolicitud.Text = "SUSPENSIÓN TEMPORAL"
                            If dtSolicitudes.Rows.Count = 1 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                            ElseIf dtSolicitudes.Rows.Count < 10 Then
                                .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            Else
                                .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                            End If

                            .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                            FilaCabecera = .xrTable_DetalleLineas_SUSPENSION.Rows(1)
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                Fila = New XRTableRow

                                Celda = New XRTableCell
                                Celda.Text = oFila("Linea").ToString()
                                Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("ModeloDispositivo").ToString()
                                Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                Celda.Text = oFila("IMEI").ToString()
                                Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                Fila.Cells.Add(Celda)

                                Celda = New XRTableCell
                                If IsDBNull(oFila("MantenerEquipoActivo")) OrElse Convert.ToBoolean(oFila("MantenerEquipoActivo")) Then
                                    Celda.Text = "NO"
                                Else
                                    Celda.Text = "SI"
                                End If
                                Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                Fila.Cells.Add(Celda)

                                .xrTable_DetalleLineas_SUSPENSION.Rows.Add(Fila)

                            Next

                        Case "-1" 'Problemas de Clone
                            .lblTipoSolicitud.Text = "PROBLEMAS DE CLONE"
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                DetalleLineas &= "Línea: " & oFila("Linea").ToString() & vbCrLf
                            Next
                            .lblDetalleLineas.Text = DetalleLineas

                        Case "-2" 'Activación Cal
                            .lblTipoSolicitud.Text = "ACTIVACIÓN CAL"
                            For Each oFila As DataRow In dtSolicitudes.Rows
                                DetalleLineas &= "Línea: " & oFila("Linea").ToString() & vbCrLf
                            Next
                            .lblDetalleLineas.Text = DetalleLineas


                        Case Else

                            .lblTipoSolicitud.Text = "OTROS"

                            Dim ExisteLinea As Boolean = False
                            If dtSolicitudes.Columns.Contains("Linea") Then ExisteLinea = True

                            Select Case dtSolicitudes.Rows(0)("vcTabla").ToString()
                                Case "CambioCuentaPlan"
                                    .lblTipoSolicitud.Text = "CAMBIO DE CUENTA/PLAN"
                                    .Detail_CAMBIOCUENTA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE CUENTA/PLAN"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_CAMBIOCUENTA.Rows(1)

                                    .xrCambioCuentaColumna1.Text = "Cuenta"
                                    .xrCambioCuentaColumna2.Text = "Plan"

                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("CodigoCuentaNuevo").ToString() & " - " & oFila("NombreCuentaNuevo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("NombrePlanNuevo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_CAMBIOCUENTA.Rows.Add(Fila)
                                    Next


                                Case "CambioCuenta"
                                    .lblTipoSolicitud.Text = "CAMBIO DE CUENTA"
                                    .Detail_CAMBIOCUENTA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE CUENTA"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_CAMBIOCUENTA.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("CodigoCuentaActual").ToString() & " - " & oFila("NombreCuentaActual").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("CodigoCuentaNuevo").ToString() & " - " & oFila("NombreCuentaNuevo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_CAMBIOCUENTA.Rows.Add(Fila)
                                    Next


                                Case "ActivacionRoaming"
                                    .lblTipoSolicitud.Text = "ACTIVACIÓN ROAMING"
                                    .Detail_ACTIVACIONROAMING.Visible = True
                                    .lblDetalleSolicitud.Text = "ACTIVACIÓN ROAMING"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_ACTIVACIONROAMING.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Destinos").ToString() ''.Replace(Chr(10), vbCrLf)
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Itinerario").ToString() ''.Replace(Chr(10), vbCrLf)
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        If Not IsDBNull(oFila("FechaIda")) Then
                                            Celda.Text = Convert.ToDateTime(oFila("FechaIda")).ToString("dd/MM/yyyy")
                                        Else
                                            Celda.Text = "(Ver observación)"
                                        End If
                                        Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        If Not IsDBNull(oFila("FechaRetorno")) Then
                                            Celda.Text = Convert.ToDateTime(oFila("FechaRetorno")).ToString("dd/MM/yyyy")
                                        Else
                                            Celda.Text = "(Ver observación)"
                                        End If
                                        Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("NombrePlanSolicitado").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_ACTIVACIONROAMING.Rows.Add(Fila)
                                    Next


                                Case "AdquisicionSIM"
                                    .lblTipoSolicitud.Text = "ADQUISICIÓN SIM"
                                    .Detail_ADQUISICIONSIM.Visible = True
                                    .lblDetalleSolicitud.Text = "ADQUISICIÓN SIM"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_ADQUISICIONSIM.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("LugarRecojo").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("PersonalRecojo").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_ADQUISICIONSIM.Rows.Add(Fila)
                                    Next



                                Case "Cambio"
                                    .lblTipoSolicitud.Text = "CAMBIO DE EQUIPO"
                                    .Detail_ALTA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE EQUIPO"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If

                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_ALTA.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("F_vcNumLin").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("PlanSolicitado").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("TipoPlan").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Modelo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(3).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Seguro").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(4).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Plazo").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(5).WidthF
                                        Fila.Cells.Add(Celda)


                                        .xrTable_DetalleLineas_ALTA.Rows.Add(Fila)

                                    Next



                                Case "CambioNumero"
                                    .lblTipoSolicitud.Text = "CAMBIO DE NÚMERO"
                                    .Detail_BAJA.Visible = True
                                    .lblDetalleSolicitud.Text = "CAMBIO DE NÚMERO"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If
                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_BAJA.Rows(0)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("NumeroActual").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_BAJA.Rows.Add(Fila)
                                    Next

                                Case "Reactivacion"

                                    .lblTipoSolicitud.Text = "REACTIVACIÓN DE SERVICIO"
                                    .Detail_REACTIVACION.Visible = True
                                    .lblDetalleSolicitud.Text = "REACTIVACIÓN DEL SERVICIO"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If
                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_REACTIVACION.Rows(1)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("SIM").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(1).WidthF
                                        Fila.Cells.Add(Celda)

                                        Celda = New XRTableCell
                                        Celda.Text = oFila("IMEI").ToString()
                                        Celda.Multiline = True
                                        Celda.WidthF = FilaCabecera.Cells(2).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_REACTIVACION.Rows.Add(Fila)
                                    Next

                                Case "PrestamoEquipo"
                                    .lblTipoSolicitud.Text = "PRÉSTAMO DE EQUIPO"
                                    .Detail_BAJA.Visible = True
                                    .lblDetalleSolicitud.Text = "PRÉSTAMO DE EQUIPO"
                                    If dtSolicitudes.Rows.Count = 1 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & "01 SERVICIO " & .lblTipoServicio.Text.ToUpper()
                                    ElseIf dtSolicitudes.Rows.Count < 10 Then
                                        .lblDetalleSolicitud.Text &= vbCrLf & Right("0" & dtSolicitudes.Rows.Count, 2) & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    Else
                                        .lblDetalleSolicitud.Text &= vbCrLf & dtSolicitudes.Rows.Count & " SERVICIOS " & .lblTipoServicio.Text.ToUpper()
                                    End If
                                    .lblDetalleSolicitud.Text &= vbCrLf & vbCrLf & drFilaOS("Descripcion").ToString()

                                    FilaCabecera = .xrTable_DetalleLineas_BAJA.Rows(0)
                                    For Each oFila As DataRow In dtSolicitudes.Rows
                                        Fila = New XRTableRow
                                        Celda = New XRTableCell
                                        Celda.Text = oFila("Linea").ToString()
                                        Celda.WidthF = FilaCabecera.Cells(0).WidthF
                                        Fila.Cells.Add(Celda)

                                        .xrTable_DetalleLineas_BAJA.Rows.Add(Fila)
                                    Next
                            End Select
                    End Select
                    Dim dtFechaActual As DateTime = Now
                    .lblFechaActual.Text = ObtenerNombreDia(dtFechaActual.DayOfWeek) & ", " & dtFechaActual.Day & " de " & ObtenerNombreMes(dtFechaActual.Month) & " de " & dtFechaActual.Year
                    .lblNroOrdenServicio.Text = drFilaOS("NroOrdenServicio").ToString()
                    NroServicio = drFilaOS("NroOrdenServicio").ToString()
                    If .lblDetalleLineas.Text = "" Then
                        .lblDetalleLineas.Visible = False
                    End If

                End With


                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                dxReportViewer.Report.ExportToPdf(oStream)

                Dim inline As Boolean = False
                Dim fileName As String = "ReporteOrdenServicio_" & NroServicio
                Dim fileType As String = "pdf"

                Response.ContentType = "application/" + fileType
                Response.AddHeader("Accept-Header", oStream.Length.ToString())
                Response.AddHeader("Content-Disposition", (IIf(inline, "Inline", "Attachment")) + "; filename=" + fileName + "." + fileType)
                Response.AddHeader("Content-Length", oStream.Length.ToString())
                Response.BinaryWrite(oStream.ToArray())
                Response.End()

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If
        Catch exThread As ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            ''If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub

    Private Sub GenerarFormatoResguardo()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim Plan As BL_MOV_Plan = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing ' CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = "" 'FiltrosPorTablas(vcTab)
        Dim vcQuery As String = "" 'QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Dim IdResguardo As String = "" & Request.QueryString("IdResguardo")
            Dim IdSolicitud As String = "" & Request.QueryString("Sol")

            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dsDatos As DataSet = Solicitud.Formato_ObtenerResguardo(IdResguardo)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                Dim myReport As XRPT_Resguardo = New XRPT_Resguardo()
                Dim dtOrdenServicio As DataTable = dsDatos.Tables(0).Copy
                Dim drFilaOS As DataRow = dtOrdenServicio.Rows(0)
                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                dxReportViewer.Report = myReport

                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                'Datos del Reporte...
                With myReport

                    Dim dtFechaActual As DateTime = Now
                    .lblFechaActual.Text = ObtenerNombreDia(dtFechaActual.DayOfWeek) & ", " & dtFechaActual.Day & " de " & ObtenerNombreMes(dtFechaActual.Month) & " de " & dtFechaActual.Year

                    .lblNroConsecutivo.Text = drFilaOS("NroConsecutivo").ToString()
                    .lblNroContrato.Text = drFilaOS("NroContrato").ToString()
                    .lblPropiedadDe.Text = drFilaOS("Propiedad").ToString()
                    .lblResponsable.Text = drFilaOS("Responsable").ToString()
                    .lblResponsableCargo.Text = drFilaOS("ResponsableCargo").ToString()
                    .lblAclaraciones.Text = drFilaOS("Aclaraciones").ToString()
                    Select Case drFilaOS("TipoServicio").ToString()
                        Case "1" 'Celular
                            .lblTipoServicio.Text = "CELULAR"
                        Case "2" 'TABLET
                            .lblTipoServicio.Text = "TABLET"
                        Case "3" 'BAM
                            .lblTipoServicio.Text = "BAM"
                        Case "4" 'CHIP
                            .lblTipoServicio.Text = "CHIP"
                        Case "5" 'BLACKBERRY
                            .lblTipoServicio.Text = "BLACKBERRY"
                        Case "6" 'RADIOLOCALIZACIÓN
                            .lblTipoServicio.Text = "RADIOLOCALIZACIÓN"
                        Case "7" 'ROAMING
                            .lblTipoServicio.Text = "ROAMING"
                    End Select


                    .lblFactura.Text = drFilaOS("Factura").ToString()
                    .lblCosto.Text = drFilaOS("Costo").ToString()


                    .lblMarca.Text = drFilaOS("Marca").ToString()
                    .lblModelo.Text = drFilaOS("Modelo").ToString()
                    .lblNroServicio.Text = drFilaOS("NroServicio").ToString()
                    .lblIMEI.Text = drFilaOS("IMEI").ToString()
                    .lblSIM.Text = drFilaOS("SIM").ToString()
                    .lblPIN.Text = drFilaOS("PIN").ToString()

                    Dim Accesorios() As String = drFilaOS("Accesorios").ToString().Split(",")
                    For Each Accesorio As String In Accesorios
                        Select Case Accesorio
                            Case "HAND" : .lblAccesorio_HAND.Text = "X"
                            Case "BATE" : .lblAccesorio_BATERIA.Text = "X"
                            Case "ADAP" : .lblAccesorio_ADAPTADOR.Text = "X"
                            Case "AUDI" : .lblAccesorio_AUDI.Text = "X"
                            Case "USB" : .lblAccesorio_USB.Text = "X"
                            Case "MANU" : .lblAccesorio_MANU.Text = "X"
                            Case Else
                        End Select
                    Next
                    .lblObservaciones.Text = drFilaOS("Observaciones").ToString()
                    .lblOrganismoCodigo.Text = drFilaOS("OrganismoCodigo").ToString()
                    .lblOrganismoDescripcion.Text = drFilaOS("OrganismoDescripcion").ToString()
                    .lblAreaCodigo.Text = drFilaOS("AreaCodigo").ToString()
                    .lblAreaDescripcion.Text = drFilaOS("AreaDescripcion").ToString()
                    .lblNombre.Text = drFilaOS("Nombre").ToString()
                    .lblFicha.Text = drFilaOS("Ficha").ToString()
                    .lblCargo.Text = drFilaOS("Cargo").ToString()
                    .lblNivel.Text = drFilaOS("Nivel").ToString()
                    .lblCentroTrabajo.Text = drFilaOS("CentroTrabajo").ToString()
                    .lblUbicacion.Text = drFilaOS("Ubicacion").ToString()
                    .lblExtension.Text = drFilaOS("Extension").ToString()
                    .lblClaveDepartamento.Text = drFilaOS("ClaveDepartamento").ToString()
                    .lblEdificio.Text = drFilaOS("Edificio").ToString()
                    .lblPiso.Text = drFilaOS("Piso").ToString()

                    .lblUsuario.Text = drFilaOS("Nombre").ToString()
                    .lblUsuarioCargo.Text = drFilaOS("Cargo").ToString()

                End With

                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                dxReportViewer.Report.ExportToPdf(oStream)

                Dim inline As Boolean = False
                Dim fileName As String = "ValeResguardo"
                Dim fileType As String = "pdf"

                Response.ContentType = "application/" + fileType
                Response.AddHeader("Accept-Header", oStream.Length.ToString())
                Response.AddHeader("Content-Disposition", (IIf(inline, "Inline", "Attachment")) + "; filename=" + fileName + "." + fileType)
                Response.AddHeader("Content-Length", oStream.Length.ToString())

                ''Guardar reporte en solicitudes...
                If IdSolicitud <> "" Then
                    Solicitud.GuardarResguardoDirecto(IdSolicitud, drFilaOS("Factura").ToString() & ".pdf", oStream.ToArray())
                End If

                Response.BinaryWrite(oStream.ToArray())
                Response.End()



                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If
        Catch exThread As ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            ''If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub

    Private Sub GenerarFormatoResguardo_Estandar()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim Plan As BL_MOV_Plan = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing ' CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = "" 'FiltrosPorTablas(vcTab)
        Dim vcQuery As String = "" 'QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Dim IdResguardo As String = "" & Request.QueryString("IdResguardo")
            Dim IdSolicitud As String = "" & Request.QueryString("Sol")

            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim dsDatos As DataSet = Solicitud.Formato_ObtenerResguardo(IdResguardo)

            If dsDatos.Tables(0).Rows.Count > 0 Then
                Dim myReport As XRPT_Resguardo_Estandar = New XRPT_Resguardo_Estandar()
                Dim dtOrdenServicio As DataTable = dsDatos.Tables(0).Copy
                Dim drFilaOS As DataRow = dtOrdenServicio.Rows(0)
                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                dxReportViewer.Report = myReport

                Dim TituloValeResguardo As String = "" & ConfigurationManager.AppSettings("TituloValeResguardo")
                If TituloValeResguardo = "" Then
                    TituloValeResguardo = "ValeResguardo"
                    myReport.lblTituloReporte.Text = "REPORTE VALE DE RESGUARDO"
                Else
                    myReport.lblTituloReporte.Text = "REPORTE " & TituloValeResguardo.ToUpper
                End If

                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                'Datos del Reporte...
                With myReport

                    Dim dtFechaActual As DateTime = Now
                    .lblFechaActual.Text = ObtenerNombreDia(dtFechaActual.DayOfWeek) & ", " & dtFechaActual.Day & " de " & ObtenerNombreMes(dtFechaActual.Month) & " de " & dtFechaActual.Year

                    .lblNroConsecutivo.Text = drFilaOS("NroConsecutivo").ToString()
                    .lblNroContrato.Text = drFilaOS("NroContrato").ToString()
                    .lblPropiedadDe.Text = drFilaOS("Propiedad").ToString()
                    .lblResponsable.Text = drFilaOS("Responsable").ToString()
                    .lblResponsableCargo.Text = drFilaOS("ResponsableCargo").ToString()
                    .lblAclaraciones.Text = drFilaOS("Aclaraciones").ToString()
                    Select Case drFilaOS("TipoServicio").ToString()
                        Case "1" 'Celular
                            .lblTipoServicio.Text = "CELULAR"
                        Case "2" 'TABLET
                            .lblTipoServicio.Text = "TABLET"
                        Case "3" 'BAM
                            .lblTipoServicio.Text = "BAM"
                        Case "4" 'CHIP
                            .lblTipoServicio.Text = "CHIP"
                        Case "5" 'BLACKBERRY
                            .lblTipoServicio.Text = "BLACKBERRY"
                        Case "6" 'RADIOLOCALIZACIÓN
                            .lblTipoServicio.Text = "RADIOLOCALIZACIÓN"
                        Case "7" 'ROAMING
                            .lblTipoServicio.Text = "ROAMING"
                    End Select


                    .lblFactura.Text = drFilaOS("Factura").ToString()
                    .lblCosto.Text = drFilaOS("Costo").ToString()


                    .lblMarca.Text = drFilaOS("Marca").ToString()
                    .lblModelo.Text = drFilaOS("Modelo").ToString()
                    .lblNroServicio.Text = drFilaOS("NroServicio").ToString()
                    .lblIMEI.Text = drFilaOS("IMEI").ToString()
                    .lblSIM.Text = drFilaOS("SIM").ToString()
                    .lblPIN.Text = drFilaOS("PIN").ToString()

                    Dim Accesorios() As String = drFilaOS("Accesorios").ToString().Split(",")
                    For Each Accesorio As String In Accesorios
                        Select Case Accesorio
                            Case "HAND" : .lblAccesorio_HAND.Text = "X"
                            Case "BATE" : .lblAccesorio_BATERIA.Text = "X"
                            Case "ADAP" : .lblAccesorio_ADAPTADOR.Text = "X"
                            Case "AUDI" : .lblAccesorio_AUDI.Text = "X"
                            Case "USB" : .lblAccesorio_USB.Text = "X"
                            Case "MANU" : .lblAccesorio_MANU.Text = "X"
                            Case Else
                        End Select
                    Next
                    .lblObservaciones.Text = drFilaOS("Observaciones").ToString()
                    .lblOrganismoCodigo.Text = drFilaOS("OrganismoCodigo").ToString()
                    .lblOrganismoDescripcion.Text = drFilaOS("OrganismoDescripcion").ToString()
                    .lblAreaCodigo.Text = drFilaOS("AreaCodigo").ToString()
                    .lblAreaDescripcion.Text = drFilaOS("AreaDescripcion").ToString()
                    .lblNombre.Text = drFilaOS("Nombre").ToString()
                    .lblFicha.Text = drFilaOS("Ficha").ToString()
                    .lblCargo.Text = drFilaOS("Cargo").ToString()
                    .lblNivel.Text = drFilaOS("Nivel").ToString()
                    .lblCentroTrabajo.Text = drFilaOS("CentroTrabajo").ToString()
                    .lblUbicacion.Text = drFilaOS("Ubicacion").ToString()
                    .lblExtension.Text = drFilaOS("Extension").ToString()
                    .lblClaveDepartamento.Text = drFilaOS("ClaveDepartamento").ToString()
                    .lblEdificio.Text = drFilaOS("Edificio").ToString()
                    .lblPiso.Text = drFilaOS("Piso").ToString()

                    .lblUsuario.Text = drFilaOS("Nombre").ToString()
                    .lblUsuarioCargo.Text = drFilaOS("Cargo").ToString()

                End With

                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                dxReportViewer.Report.ExportToPdf(oStream)

                Dim inline As Boolean = False
                Dim fileName As String = TituloValeResguardo.Replace(" ", "")
                Dim fileType As String = "pdf"

                Response.ContentType = "application/" + fileType
                Response.AddHeader("Accept-Header", oStream.Length.ToString())
                Response.AddHeader("Content-Disposition", (IIf(inline, "Inline", "Attachment")) + "; filename=" + fileName + "." + fileType)
                Response.AddHeader("Content-Length", oStream.Length.ToString())

                ''Guardar reporte en solicitudes...
                If IdSolicitud <> "" Then
                    Solicitud.GuardarResguardoDirecto(IdSolicitud, drFilaOS("Factura").ToString() & ".pdf", oStream.ToArray())
                End If

                Response.BinaryWrite(oStream.ToArray())
                Response.End()



                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If
        Catch exThread As ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            ''If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub


    Private Sub GenerarFormatoAsignacion()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim Plan As BL_MOV_Plan = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing ' CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = "" 'FiltrosPorTablas(vcTab)
        Dim vcQuery As String = "" 'QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try

            Dim IdSolicitud As String = Request.QueryString("IdSolicitud")
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim CodigoSolicitud As String = ""
            Dim dsDatos As DataSet = Solicitud.Formato_ObtenerFormatoAsignacion(IdSolicitud)
            Dim TipoServicio As String = ""
            If dsDatos.Tables(0).Rows.Count > 0 Then
                Dim myReport As XRPT_Asignacion = New XRPT_Asignacion()
                Dim dtOrdenServicio As DataTable = dsDatos.Tables(0).Copy
                Dim dtResponsable As DataTable = dsDatos.Tables(1).Copy
                Dim dtEnlace As DataTable = dsDatos.Tables(2).Copy
                Dim dtAutorizador As DataTable = dsDatos.Tables(3).Copy
                Dim drFilaOS As DataRow = dtOrdenServicio.Rows(0)
                Dim drFilaEnlace As DataRow = dtEnlace.Rows(0)
                Dim drFilaAutorizador As DataRow = dtAutorizador.Rows(0)
                Dim drFilaResponsable As DataRow = dtResponsable.Rows(0)
                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                dxReportViewer.Report = myReport

                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                'Datos del Reporte...
                With myReport
                    CodigoSolicitud = drFilaOS("vcCodigo").ToString()
                    .lblCodigoSolicitud.Text = CodigoSolicitud
                    .lblNombre.Text = drFilaOS("EMPL_vcNOMEMP").ToString()
                    .lblFicha.Text = drFilaOS("EMPL_P_vcCODEMP").ToString()
                    .lblCargo.Text = drFilaOS("Cargo").ToString()
                    .lblNivel.Text = drFilaOS("Nivel").ToString()
                    .lblDependenciaCorporativa.Text = drFilaOS("Organizacion").ToString()
                    .lblDireccionCorporativa.Text = drFilaOS("DireccionCorporativa").ToString()
                    .lblCentroTrabajo.Text = drFilaOS("SUCU_P_vcCODSUC").ToString() & "-" & drFilaOS("SUCU_vcNOMSUC").ToString()
                    .lblClaveDepartamento.Text = drFilaOS("ClaveDepartamento").ToString()
                    .lblUbicacion.Text = drFilaOS("EMPL_vcUBIFIS").ToString()
                    .lblTelefonoDomicilio.Text = "Teléfono en Domicilio Particular: " & vbCrLf & drFilaOS("TelefonoDomicilio").ToString()
                    .lblTelefonoOficina.Text = "Teléfono en oficina: " & vbCrLf & drFilaOS("TelefonoOficina").ToString()
                    .lblExtension.Text = "Extensión:" & vbCrLf & drFilaOS("ExtensionTrabajo").ToString()

                    .lblEnlace.Text = drFilaEnlace("Enlace").ToString()
                    .lblEnlaceCargo.Text = drFilaEnlace("EnlaceCargo").ToString()

                    .lblAutoriza.Text = drFilaAutorizador("Autorizador").ToString()
                    .lblAutorizaCargo.Text = drFilaAutorizador("AutorizadorCargo").ToString()

                    .lblNumero.Text = drFilaOS("P_vcNum").ToString()

                    Try
                        .lblFechaInicio.Text = Convert.ToDateTime(drFilaOS("FechaInicioContrato")).ToString("dd/MM/yyyy")
                    Catch ex As Exception
                    End Try


                    If drFilaOS("Marca").ToString() = "" Then
                        If "" & drFilaOS("P_vcCodIMEI").ToString() <> "" Then
                            .lblMarcaModeloSerie.Text = drFilaOS("Modelo").ToString() & ", " & drFilaOS("P_vcCodIMEI").ToString()
                        Else
                            .lblMarcaModeloSerie.Text = drFilaOS("Modelo").ToString()
                        End If
                    Else
                        .lblMarcaModeloSerie.Text = drFilaOS("Marca").ToString() & ", " & drFilaOS("Modelo").ToString() & ", " & drFilaOS("P_vcCodIMEI").ToString()
                    End If
                    .lblTipoServicio.Text = ""

                    TipoServicio = drFilaOS("TipoServicio").ToString()
                    Select Case TipoServicio
                        Case "BB DATOS"
                            .lblTipoServicio.Text = "S S T BBDATOS"
                            .lblTituloReporte.Text = "ASIGNACIÓN DEL SERVICIO BLACKBERRY DATOS"
                        Case "BAM"
                            .lblTipoServicio.Text = "S S T BAM"
                            .lblTituloReporte.Text = "ASIGNACION DEL SERVICIO DE BANDA ANCHA MÓVIL"
                        Case "RADIOLOZALIZADOR"
                            .lblTipoServicio.Text = "S S R"
                            .lblTituloReporte.Text = "ASIGNACIÓN DEL SERVICIO DE RADIOLOCALIZACIÓN"
                        Case Else
                            TipoServicio = "CELULAR"
                            .lblTipoServicio.Text = "S S T C"
                            .lblTituloReporte.Text = "ASIGNACIÓN DEL SERVICIO DE TELEFONÍA CELULAR"
                    End Select

                End With

                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                dxReportViewer.Report.ExportToPdf(oStream)

                Dim inline As Boolean = False
                Dim fileName As String = "FormatoAsignacion_" & TipoServicio.Replace(" ", "") & "_" & CodigoSolicitud
                Dim fileType As String = "pdf"

                Response.ContentType = "application/" + fileType
                Response.AddHeader("Accept-Header", oStream.Length.ToString())
                Response.AddHeader("Content-Disposition", (IIf(inline, "Inline", "Attachment")) + "; filename=" + fileName + "." + fileType)
                Response.AddHeader("Content-Length", oStream.Length.ToString())
                Response.BinaryWrite(oStream.ToArray())
                Response.End()

                dvReporte.Visible = True
                dvSinDatos.Visible = False
            Else
                dvReporte.Visible = False
                dvSinDatos.Visible = True
            End If
        Catch exThread As ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            ''If Plan IsNot Nothing Then Plan.Dispose()
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub

    Private Function ObtenerNombreDia(iDia As Integer) As String
        Dim _return As String = ""
        Select Case iDia
            Case 0 : _return = "domingo"
            Case 1 : _return = "lunes"
            Case 2 : _return = "martes"
            Case 3 : _return = "miércoles"
            Case 4 : _return = "jueves"
            Case 5 : _return = "viernes"
            Case 6 : _return = "sábado"
        End Select
        Return _return
    End Function

    Private Function ObtenerNombreMes(iMes As Integer) As String
        Dim _return As String = ""
        Select Case iMes
            Case 1 : _return = "enero"
            Case 2 : _return = "febrero"
            Case 3 : _return = "marzo"
            Case 4 : _return = "abril"
            Case 5 : _return = "mayo"
            Case 6 : _return = "junio"
            Case 7 : _return = "julio"
            Case 8 : _return = "agosto"
            Case 9 : _return = "setiembre"
            Case 10 : _return = "octubre"
            Case 11 : _return = "noviembre"
            Case 12 : _return = "diciembre"
        End Select
        Return _return
    End Function

    Private Sub GenerarReporteFacturacion(ByVal TipoReporte As String)
        Try
            Select Case TipoReporte
                Case "1" 'Líneas no facturadas
                    ReporteFacturacion_LineasNoFacturadas()
                Case "2" 'Líneas facturadas con exceso (%)
                    ReporteFacturacion_LineasFacturadasConExceso()
                Case "3" 'Líneas con 0% de consumo
                    ReporteFacturacion_LineasSinConsumo()
                Case "4" 'Facturación: Roaming, Datos, otros.
                    ReporteFacturacion_LineasAgrupadasPorConcepto()
                Case "5"
                    ReporteFacturacion_LineasConsumoDatos()
            End Select

            ''Dim oStream As MemoryStream = New MemoryStream()
            Response.Clear()
            dvReporte.Visible = True
            dvSinDatos.Visible = False


        Catch exThread As ThreadAbortException
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            ''If Plan IsNot Nothing Then Plan.Dispose()

        End Try
    End Sub

    Sub ReporteFacturacion_LineasNoFacturadas()
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = Nothing
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Periodo As String = Request.QueryString("P")
            Dim dtDatos As DataTable = Nothing
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)

            Dim LogoCliente As Byte() = Nothing
            If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then LogoCliente = Regi.Listar().REGI_imLOGEMP

            dtDatos = Linea.ReporteFacturacion_LineasNoFacturadas(Periodo, oUsuario.P_inCod).Tables(0)
            dtDatos.TableName = "MOV_FAC_REP_LineasNoFacturadas"

            If dtDatos.Columns.Count = 1 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If
            If dtDatos.Rows.Count = 0 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If

            Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)
            Dim myReport As XRPT_Facturacion_LineasNoFacturadas = New XRPT_Facturacion_LineasNoFacturadas()
            dxReportViewer.Report = myReport
            'Datos del Reporte...
            With myReport
                .xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                .xrTitulo.Text = "REPORTE DE LÍNEAS NO FACTURADAS"
                .LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                .LBLUsuario.Text = oUsuario.vcNom
                .DataSource = dtDatos
                .DataMember = dtDatos.TableName
            End With
        Catch ex As Exception
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try

    End Sub

    Sub ReporteFacturacion_LineasFacturadasConExceso()
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = Nothing
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Periodo As String = Request.QueryString("P")
            Dim PorcentajeExceso As String = Request.QueryString("E")
            Dim dtDatos As DataTable = Nothing
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)

            Dim LogoCliente As Byte() = Nothing
            If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then LogoCliente = Regi.Listar().REGI_imLOGEMP

            dtDatos = Linea.ReporteFacturacion_LineasFacturadasConExceso(Periodo, PorcentajeExceso, oUsuario.P_inCod).Tables(0)
            dtDatos.TableName = "MOV_FAC_REP_LineasFacturadasConExceso"

            If dtDatos.Columns.Count = 1 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If
            If dtDatos.Rows.Count = 0 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If

            Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)
            Dim myReport As XRPT_Facturacion_LineasFacturadasConExceso = New XRPT_Facturacion_LineasFacturadasConExceso()
            dxReportViewer.Report = myReport
            'Datos del Reporte...
            With myReport
                .xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                .xrTitulo.Text = "REPORTE FACTURACIÓN DE LÍNEAS CON EXCESO"
                .LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                .LBLUsuario.Text = oUsuario.vcNom
                .DataSource = dtDatos
                .DataMember = dtDatos.TableName
            End With
        Catch ex As Exception
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try

    End Sub

    Sub ReporteFacturacion_LineasSinConsumo()
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = Nothing
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Periodo As String = Request.QueryString("P")
            Dim IdGrupoServicio As String = "" & Request.QueryString("GS")
            Dim dtDatos As DataTable = Nothing
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)

            Dim LogoCliente As Byte() = Nothing
            If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then LogoCliente = Regi.Listar().REGI_imLOGEMP

            dtDatos = Linea.ReporteFacturacion_LineasSinConsumo(Periodo, IdGrupoServicio, oUsuario.P_inCod).Tables(0)

            If dtDatos.Columns.Count = 1 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If
            If dtDatos.Rows.Count = 0 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If

            dtDatos.TableName = "MOV_FAC_REP_LineasSinConsumo"

            Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)
            If IdGrupoServicio = "-1" Then
                Dim myReport As XRPT_Facturacion_LineasSinConsumo = New XRPT_Facturacion_LineasSinConsumo()
                dxReportViewer.Report = myReport
                'Datos del Reporte...
                With myReport
                    .xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                    .xrTitulo.Text = "REPORTE FACTURACIÓN DE LÍNEAS SIN CONSUMO"
                    .LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                    .LBLUsuario.Text = oUsuario.vcNom
                    .DataSource = dtDatos
                    .DataMember = dtDatos.TableName
                End With

            Else
                Dim myReport As XRPT_Facturacion_LineasSinConsumoTotal = New XRPT_Facturacion_LineasSinConsumoTotal()
                dxReportViewer.Report = myReport
                'Datos del Reporte...
                With myReport
                    .xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                    Dim binding As XRBinding
                    If IdGrupoServicio = "3" Then
                        .XrTableCell23.Text = "Minutos"
                        binding = New XRBinding("Text", dtDatos, "Minutos")
                        .XrTableCell11.DataBindings.Clear()
                        .XrTableCell11.DataBindings.Add(binding)
                    End If

                    If IdGrupoServicio = "4" Then
                        .XrTableCell23.Text = "Mensajes"
                        binding = New XRBinding("Text", dtDatos, "Mensajes")
                        .XrTableCell11.DataBindings.Clear()
                        .XrTableCell11.DataBindings.Add(binding)
                    End If

                    If IdGrupoServicio = "5" Then
                        .XrTableCell23.Text = "Datos (MB)"
                        binding = New XRBinding("Text", dtDatos, "Datos")
                        binding.FormatString = "{0:#,#0}"
                        .XrTableCell11.DataBindings.Clear()
                        .XrTableCell11.DataBindings.Add(binding)
                    End If

                    .xrTitulo.Text = "REPORTE FACTURACIÓN DE LÍNEAS SIN CONSUMO"
                    .LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                    .LBLUsuario.Text = oUsuario.vcNom
                    .DataSource = dtDatos
                    .DataMember = dtDatos.TableName

                End With
            End If

        Catch ex As Exception
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try

    End Sub

    Sub ReporteFacturacion_LineasAgrupadasPorConcepto()
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = Nothing
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Periodo As String = Request.QueryString("P")
            Dim dtDatos As DataTable = Nothing
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)

            Dim LogoCliente As Byte() = Nothing
            If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then LogoCliente = Regi.Listar().REGI_imLOGEMP

            dtDatos = Linea.ReporteFacturacion_LineasAgrupadasPorConcepto(Periodo, oUsuario.P_inCod).Tables(0)
            dtDatos.TableName = "MOV_FAC_REP_LineasAgrupadasPorConcepto"
            If dtDatos.Columns.Count = 1 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If
            If dtDatos.Rows.Count = 0 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If

            Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)
            Dim myReport As XRPT_Facturacion_LineasAgrupadasPorConcepto = New XRPT_Facturacion_LineasAgrupadasPorConcepto()
            dxReportViewer.Report = myReport
            'Datos del Reporte...
            With myReport
                .xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                .xrTitulo.Text = "REPORTE FACTURACIÓN DE LÍNEAS POR GRUPO DE SERVICIOS"
                .LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                .LBLUsuario.Text = oUsuario.vcNom
                .DataSource = dtDatos
                .DataMember = dtDatos.TableName
            End With
        Catch ex As Exception
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try

    End Sub

    Sub ReporteFacturacion_LineasConsumoDatos()
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = Nothing
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Periodo As String = Request.QueryString("P")
            Dim dtDatos As DataTable = Nothing
            Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)

            Dim LogoCliente As Byte() = Nothing
            If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then LogoCliente = Regi.Listar().REGI_imLOGEMP

            dtDatos = Linea.ReporteFacturacion_LineasConsumoDatos(Periodo, oUsuario.P_inCod).Tables(0)
            dtDatos.TableName = "MOV_FAC_REP_LineasConsumoDatos"
            If dtDatos.Columns.Count = 1 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If
            If dtDatos.Rows.Count = 0 Then
                Response.Clear()
                Response.Write("<script>window.parent.fnMostrarMensajeSinDatos();</script>")
                Response.End()
            End If

            Dim dtCliente As DataTable = Cliente.Mostrar(oUsuario.IdCliente)
            Dim myReport As XRPT_Facturacion_ConsumoDatos = New XRPT_Facturacion_ConsumoDatos()
            dxReportViewer.Report = myReport
            'Datos del Reporte...
            With myReport
                .xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                .xrTitulo.Text = "REPORTE DE LÍNEAS POR CONSUMO DE DATOS"
                .LBLEmpresa.Text = dtCliente.Rows(0)("vcNomCli").ToString()
                .LBLUsuario.Text = oUsuario.vcNom
                .DataSource = dtDatos
                .DataMember = dtDatos.TableName
            End With
        Catch ex As Exception
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try

    End Sub

End Class