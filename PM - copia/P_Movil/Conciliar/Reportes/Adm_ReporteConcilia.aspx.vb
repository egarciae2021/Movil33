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

Public Class Adm_ReporteConcilia
    Inherits System.Web.UI.Page
    Dim titulo1, titulo2 As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Response.Clear()
        Dim vcTab As String = Request.QueryString("vcTab")
        Dim vcTipRep As String = Request.QueryString("vcTipRep")

        dvReporte.Visible = True
        dvSinDatos.Visible = False

        If vcTipRep IsNot Nothing Then
            Select Case vcTab
                Case "Conciliacion"
                    Select Case vcTipRep
                        Case "1"
                            GenerarReporteConformidad()
                        Case "2"
                            GenerarReporteBienesServicios()
                        Case "3" 'Anexo-Procura
                            GenerarAnexoProcura()
                    End Select
            End Select
        End If
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

    Private Sub GenerarReporteConformidad()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim Plan As BL_MOV_Plan = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Concilia As BL_MOV_Concilia = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing ' CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = "" 'FiltrosPorTablas(vcTab)
        Dim vcQuery As String = "" 'QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim IdConformidad As String = "" & Request.QueryString("IdConformidad")
            Dim Periodo As String = "" & Request.QueryString("Periodo")

            Dim MesPeriodo As String = Periodo.Substring(4, 2)
            Dim AnoPeriodo As String = Periodo.Substring(0, 4)

            Dim dsDatos As DataSet = Concilia.ObtenerReporte_Conformidad(Periodo, IdConformidad)
            Dim dtCabecera As DataTable = dsDatos.Tables(1).Copy


            Dim FiltroCuentas As String = "" & HttpContext.Current.Session("Concilia_FiltroCuentas")
            Dim FiltroFacturas As String = "" & HttpContext.Current.Session("Concilia_FiltroFacturas")
            FiltroCuentas = FiltroCuentas.Replace("@", "'")
            FiltroFacturas = FiltroFacturas.Replace("@", "'")
            If FiltroCuentas <> "" OrElse FiltroFacturas <> "" Then
                Dim dtTemporal As DataTable = dsDatos.Tables(0).Copy
                Dim dvFiltro As DataView = dtTemporal.DefaultView
                If FiltroCuentas <> "" And FiltroFacturas <> "" Then
                    dvFiltro.RowFilter = "Cuenta IN (" & FiltroCuentas & ") AND Factura IN (" & FiltroFacturas & ")"
                ElseIf FiltroCuentas <> "" Then
                    dvFiltro.RowFilter = "Cuenta IN (" & FiltroCuentas & ")"
                ElseIf FiltroFacturas <> "" Then
                    dvFiltro.RowFilter = "Factura IN (" & FiltroFacturas & ")"
                End If
                dsDatos.Tables.Clear()
                dsDatos.Tables.Add(dvFiltro.ToTable())
            End If

            If dsDatos.Tables(0).Rows.Count > 0 Then
                Dim myReport As XRPT_Conformidad = New XRPT_Conformidad()
                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                myReport.DataMember = "Fact_s_Reporte_Conformidad"
                dxReportViewer.Report = myReport
                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                ''Datos del Reporte...
                With myReport
                    .xrReporteNro.Text = dtCabecera.Rows(0)("ReporteNro")
                    .xrGerencia.Text = dtCabecera.Rows(0)("Gerencia")
                    .xrSubGerencia.Text = dtCabecera.Rows(0)("SubGerencia")
                    .xrDepto.Text = dtCabecera.Rows(0)("Departamento")
                    .xrFechaEmision.Text = Convert.ToDateTime(dtCabecera.Rows(0)("EmitidoFecha")).ToString("dd/MM/yyyy")
                    .xrSolpe.Text = dtCabecera.Rows(0)("Solpe")
                    .xrOrdenSurtimiento.Text = dtCabecera.Rows(0)("OrdenSurtimiento")
                    .xrPedidoAsociado.Text = dtCabecera.Rows(0)("PedidoAsociado")
                    .xrRazonSocial.Text = dtCabecera.Rows(0)("RazonSocial")
                    .xrClaveProveedor.Text = dtCabecera.Rows(0)("ClaveOperador")
                    .xrRFC.Text = dtCabecera.Rows(0)("RFC")
                    .xrDescripcionBienServicio.Text = "SERVICIOS MOVILES INTEGRADOS POR TELEFONÍA CELULAR, BANDA ANCHA MÓVIL, BLACKBERRY DATOS, RADIOLOCALIZACIÓN Y TRANSMISIÓN DE DATOS." & vbNewLine & ObtenerNombreMes(MesPeriodo).ToUpper() & " " & AnoPeriodo
                    .xrContrato.Text = dtCabecera.Rows(0)("Contrato")
                    .xrDiaLugar.Text = Convert.ToDateTime(dtCabecera.Rows(0)("EmitidoFecha")).Day.ToString()
                    .xrMesLugar.Text = Convert.ToDateTime(dtCabecera.Rows(0)("EmitidoFecha")).Month.ToString()
                    .xrAnoLugar.Text = Convert.ToDateTime(dtCabecera.Rows(0)("EmitidoFecha")).Year.ToString()
                    .xrDiaFS.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaReciboSolicitud")).Day.ToString()
                    .xrMesFS.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaReciboSolicitud")).Month.ToString()
                    .xrAnoFS.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaReciboSolicitud")).Year.ToString()
                    .xrDiaFR.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaRecepcionContrato")).Day.ToString()
                    .xrMesFR.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaRecepcionContrato")).Month.ToString()
                    .xrAnoFR.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaRecepcionContrato")).Year.ToString()
                    .xrDiaFF.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaFormalizacionContrato")).Day.ToString()
                    .xrMesFF.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaFormalizacionContrato")).Month.ToString()
                    .xrAnoFF.Text = Convert.ToDateTime(dtCabecera.Rows(0)("FechaFormalizacionContrato")).Year.ToString()
                    .xrLugar.Text = dtCabecera.Rows(0)("Lugar")
                    .xrMontoContrato.Text = "$ " & Convert.ToDecimal(dtCabecera.Rows(0)("MontoContrato")).ToString("#,###,###.##")
                    .xrMontoOS.Text = "$ " & Convert.ToDecimal(dtCabecera.Rows(0)("MontoOS")).ToString("#,###,###.##")
                    Dim dtFecha As DateTime
                    dtFecha = Convert.ToDateTime(dtCabecera.Rows(0)("EmitidoFecha"))
                    .xrEmisionFecha.Text = dtFecha.Day & " de " & ObtenerNombreMes(dtFecha.Month) & " de " & dtFecha.Year
                    .xrEmisorCargo.Text = dtCabecera.Rows(0)("EmitidoCargo")
                    .xrEmisorNombre.Text = dtCabecera.Rows(0)("EmitidoNombre")
                    .xrProveedorCargo.Text = dtCabecera.Rows(0)("ProveedorCargo")
                    dtFecha = Convert.ToDateTime(dtCabecera.Rows(0)("ProveedorFecha"))
                    .xrProveedorFecha.Text = dtFecha.Day & " de " & ObtenerNombreMes(dtFecha.Month) & " de " & dtFecha.Year
                    .xrProveedorNombre.Text = dtCabecera.Rows(0)("ProveedorNombre")
                    .xrProveedorPuesto.Text = dtCabecera.Rows(0)("ProveedorPuesto")
                End With

                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                Try
                    dxReportViewer.Report.ExportToPdf(oStream)
                Catch ex As Exception

                End Try


                Dim inline As Boolean = False
                Dim fileName As String = "ReporteConformidad_" & Periodo
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

                Dim strScript As String = ""
                strScript = "$(function () { window.parent.MostrarMensajeSinDatos(); });"
                Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "SinDatos", strScript, True)

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
            If Concilia IsNot Nothing Then Concilia.Dispose()
        End Try
    End Sub

    Private Sub GenerarReporteBienesServicios()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Concilia As BL_MOV_Concilia = Nothing


        Try
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim IdBien As String = "" & Request.QueryString("IdBien")
            Dim Periodo As String = "" & Request.QueryString("Periodo")

            Dim MesPeriodo As String = Periodo.Substring(4, 2)
            Dim AnoPeriodo As String = Periodo.Substring(0, 4)

            Dim dsDatos As DataSet = Concilia.ObtenerReporte_BienesServicios(Periodo, IdBien)
            Dim dtCabecera As DataTable = dsDatos.Tables(1).Copy

            Dim FiltroFacturas As String = "" & HttpContext.Current.Session("Concilia_FiltroFacturas")
            FiltroFacturas = FiltroFacturas.Replace("@", "'")
            If FiltroFacturas <> "" Then
                Dim dtTemporal As DataTable = dsDatos.Tables(0).Copy
                Dim dvFiltro As DataView = dtTemporal.DefaultView
                dvFiltro.RowFilter = "Factura IN (" & FiltroFacturas & ")"
                dsDatos.Tables.Clear()
                dsDatos.Tables.Add(dvFiltro.ToTable())
            End If

            If dsDatos.Tables(0).Rows.Count > 0 Then
                Dim myReport As XRPT_BienesServicios = New XRPT_BienesServicios()
                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                myReport.DataMember = "Fact_s_Reporte_BienesServicios"
                dxReportViewer.Report = myReport
                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)

                ''Datos del Reporte...
                With myReport
                    .xrGerencia.Text = dtCabecera.Rows(0)("Gerencia")
                    .xrLugar.Text = dtCabecera.Rows(0)("Lugar")
                    .xrSubDireccion.Text = dtCabecera.Rows(0)("SubGerencia")
                    .xrProveedor.Text = dtCabecera.Rows(0)("Proveedor")
                    .xrConsecutivo01.Text = dtCabecera.Rows(0)("Consecutivo01")
                    .xrConsecutivo02.Text = "-" & dtCabecera.Rows(0)("Consecutivo02")
                    .xrConsecutivo03.Text = dtCabecera.Rows(0)("Consecutivo03")
                    .xrValorInicial.Text = dtCabecera.Rows(0)("Consecutivo03")
                    .xrCompromisoSAP.Text = dtCabecera.Rows(0)("CompromisoSAP")
                    .xrDetalle01.Text = dtCabecera.Rows(0)("Detalle01")
                    .xrDetalle02.Text = dtCabecera.Rows(0)("Detalle02")
                    .xrPartida.Text = dtCabecera.Rows(0)("NroPartida")
                    .xrEmitidoNombre.Text = dtCabecera.Rows(0)("EmitidoNombre")
                    .xrEmitidoCargo.Text = dtCabecera.Rows(0)("EmitidoCargo")
                    .xrEmitidoFicha.Text = dtCabecera.Rows(0)("EmitidoFicha")
                    .xrPersonaCOPADE.Text = dtCabecera.Rows(0)("PersonaCOPADE")
                End With

                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                dxReportViewer.Report.ExportToPdf(oStream)

                Dim inline As Boolean = False
                Dim fileName As String = "ReporteBienesServicios_" & Periodo
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
                Dim strScript As String = ""
                strScript = "$(function () { window.parent.MostrarMensajeSinDatos(); });"
                Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "SinDatos", strScript, True)
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
            If Concilia IsNot Nothing Then Concilia.Dispose()
        End Try
    End Sub

    Private Sub GenerarAnexoProcura()
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim Plan As BL_MOV_Plan = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim Concilia As BL_MOV_Concilia = Nothing

        Dim lstCampo As List(Of ENT_ENT_Campo) = Nothing ' CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
        Dim strFiltros As String = "" 'FiltrosPorTablas(vcTab)
        Dim vcQuery As String = "" 'QueryOptimizadoToReportes(vcTab, lstCampo, vcCampoFiltro, "", vcDescFiltro, inEstado, 1, "", strFiltros)

        Try
            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim Periodo As String = "" & Request.QueryString("Periodo")
            Dim dsDatos As DataSet = Concilia.ObtenerReporte_AnexoProcura(Periodo)
            Dim FiltroCuentas As String = "" & HttpContext.Current.Session("Concilia_FiltroCuentas")
            Dim FiltroFacturas As String = "" & HttpContext.Current.Session("Concilia_FiltroFacturas")
            FiltroCuentas = FiltroCuentas.Replace("@", "'")
            FiltroFacturas = FiltroFacturas.Replace("@", "'")

            If FiltroCuentas <> "" OrElse FiltroFacturas <> "" Then
                Dim dtTemporal As DataTable = dsDatos.Tables(0).Copy
                Dim dvFiltro As DataView = dtTemporal.DefaultView
                If FiltroCuentas <> "" And FiltroFacturas <> "" Then
                    dvFiltro.RowFilter = "Cuenta IN (" & FiltroCuentas & ") AND Factura IN (" & FiltroFacturas & ")"
                ElseIf FiltroCuentas <> "" Then
                    dvFiltro.RowFilter = "Cuenta IN (" & FiltroCuentas & ")"
                ElseIf FiltroFacturas <> "" Then
                    dvFiltro.RowFilter = "Factura IN (" & FiltroFacturas & ")"
                End If
                dsDatos.Tables.Clear()
                dsDatos.Tables.Add(dvFiltro.ToTable())
            End If


            Dim TipoServicio As String = ""
            If dsDatos.Tables(0).Rows.Count > 0 Then
                Dim myReport As XRPT_AnexoProcura = New XRPT_AnexoProcura()
                Dim LogoCliente As Byte() = Nothing
                If Not Convert.IsDBNull(Regi.Listar().REGI_imLOGEMP) Then
                    LogoCliente = Regi.Listar().REGI_imLOGEMP
                End If

                myReport.DataSource = dsDatos
                myReport.DataMember = "MOV_s_Concilia_Reporte_AnexoProcura"
                dxReportViewer.Report = myReport
                myReport.xrPictureBoxLogo.Image = byteArrayToImage(LogoCliente)
                myReport.lblSubTitulo.Text = "(Servicios devengados por los conceptos de renta mensual. Periodo: " & Convert.ToDateTime(dsDatos.Tables(0).Rows(0)("Periodo")).ToString("MM/yyyy") & ")"

                Dim oStream As MemoryStream = New MemoryStream()
                Response.Clear()

                dxReportViewer.Report.ExportToPdf(oStream)

                Dim inline As Boolean = False
                Dim fileName As String = "AnexoProcura_" & Periodo
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
                Dim strScript As String = ""
                strScript = "$(function () { window.parent.MostrarMensajeSinDatos(); });"
                Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "SinDatos", strScript, True)

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
            If Concilia IsNot Nothing Then Concilia.Dispose()
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

    Public Function byteArrayToImage(byteArrayIn As Byte()) As System.Drawing.Image
        Try
            Dim converter As New System.Drawing.ImageConverter()
            Dim img As System.Drawing.Image = DirectCast(converter.ConvertFrom(byteArrayIn), System.Drawing.Image)
            Return img
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

End Class