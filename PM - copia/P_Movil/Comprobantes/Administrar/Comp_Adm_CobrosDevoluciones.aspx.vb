Imports System.Web.Script.Services
Imports System.Web.Services
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Comp_Adm_CobrosDevoluciones
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim SubContrato As BL_MOV_FAC_SubContrato = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    ConfigurarTipoUsuario(oUsuario)

                    SubContrato = New BL_MOV_FAC_SubContrato(1, oUsuario.IdCliente)
                    Dim vcPeriodoANSI = SubContrato.ObtenerPeriodoActual()
                    txtPeriodo.Text = vcPeriodoANSI.Substring(4, 2) + "/" + vcPeriodoANSI.Substring(0, 4)

                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub ConfigurarTipoUsuario(ByVal oUsuario As ENT_SEG_Usuario)

        hdfBuscaEmpleado.Value = "0"
        For i As Integer = 0 To oUsuario.Perfiles.Count - 1
            If oUsuario.Perfiles(i).P_inCod = 39 OrElse oUsuario.Perfiles(i).P_inCod = 1 Then
                hdfBuscaEmpleado.Value = "1"
                Exit For
            End If
        Next
        If hdfBuscaEmpleado.Value = "0" Then
            txtEmpleado.Enabled = False
            If oUsuario.Empleado.P_vcCod <> "" Then
                hdfIdEmpleado.Value = oUsuario.Empleado.P_vcCod
                txtEmpleado.Text = oUsuario.Empleado.P_vcCod + " - " + oUsuario.vcNom
            Else
                hdfIdEmpleado.Value = "[USUARIO SIN EMPLEADO ASOCIADO]"
                txtEmpleado.Text = "[USUARIO SIN EMPLEADO ASOCIADO]"
            End If
        End If

    End Sub

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegCobrosDevoluciones.ObtenerDatosAExportar
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim CronogramaPago As BL_MOV_FAC_C_CronogramaPago = Nothing

            Dim IdEmpleado As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(0)
            Dim vcCodPedSol As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(1)
            Dim inTipoLinea As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(2)
            Dim vcLinea As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(3)
            Dim inVerRegistros As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(4)
            Dim vcPeriodo As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(5)
            Dim vcOrdCol As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(6)
            Dim vcTipOrdCol As String = HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago").ToString().Split("|")(7)

            CronogramaPago = New BL_MOV_FAC_C_CronogramaPago(oUsuario.IdCliente)
            Dim dsDetalle As DataSet = CronogramaPago.ListarCobrosDevoluciones(IdEmpleado, vcCodPedSol, inTipoLinea, vcLinea, inVerRegistros, vcPeriodo, 0, _
                                                                 1, vcOrdCol, vcTipOrdCol)
            CronogramaPago.Dispose()

            Dim lstCampo As List(Of ENT_ENT_Campo) = ObtenerNombreColumnas()
            'Dim dtExcel As DataTable = ConfiguraTablaParaExportacion(vcVista, dsDetalle.Tables(1))

            eegCobrosDevoluciones.ExportarDatos(dsDetalle.Tables(1), "Cobros y Devoluciones", lstCampo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Function ObtenerNombreColumnas() As List(Of ENT_ENT_Campo)

        Dim lstCampo As List(Of ENT_ENT_Campo) = New List(Of ENT_ENT_Campo)()
        Dim oCampo As ENT_ENT_Campo

        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "IdEmpleado", .vcDes = "Cód. Empleado", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "NomEmp", .vcDes = "Empleado", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "PedidoSolicitud", .vcDes = "Pedido / Solicitud", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "Linea", .vcDes = "Línea", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "TipoProceso", .vcDes = "Tipo de proceso", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "Periodo", .vcDes = "Periodo", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "Vigente", .vcDes = "Vigente", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "MontoCuota", .vcDes = "Monto", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "TipoDocumento", .vcDes = "Tipo motivo", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "Motivo", .vcDes = "Motivo", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "EstadoCobro", .vcDes = "Estado de comprobante", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "NumeroComprobante", .vcDes = "Número de comprobante", .btVis = True, .btVig = True}
        lstCampo.Add(oCampo)

        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "RowNumber", .vcDes = "RowNumber", .btVis = False, .btVig = False}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "IdCronogramaPago", .vcDes = "IdCronogramaPago", .btVis = False, .btVig = False}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "NroCom", .vcDes = "NroCom", .btVis = False, .btVig = False}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "Vig", .vcDes = "Vig", .btVis = False, .btVig = False}
        lstCampo.Add(oCampo)
        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "IdSolicitud", .vcDes = "IdSolicitud", .btVis = False, .btVig = False}
        lstCampo.Add(oCampo)

        oCampo = New ENT_ENT_Campo() With {.vcNomAlias = "IdTipDoc", .vcDes = "IdTipDoc", .btVis = False, .btVig = False}
        lstCampo.Add(oCampo)
        
        Return lstCampo

    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCobrosDevoluciones(ByVal IdEmpleado As String, ByVal vcCodPedSol As String, ByVal inTipoLinea As Integer, ByVal vcLinea As String, _
                                                    ByVal inVerRegistros As Integer, ByVal vcPeriodo As String, ByVal inPagTam As String, ByVal inPagAct As String, _
                                                    ByVal vcOrdCol As String, ByVal vcTipOrdCol As String) As JQGridJsonResponse
        Dim CronogramaPago As BL_MOV_FAC_C_CronogramaPago = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            Dim vcPeriodoANSI As String = ""
            If vcPeriodo.Length = 7 Then vcPeriodoANSI = vcPeriodo.Substring(3, 4) + vcPeriodo.Substring(0, 2)

            'Orden de Columnas
            If vcOrdCol = "IdEmpleado" Then vcOrdCol = "CRO.IdEmpleado"
            If vcOrdCol = "NomEmp" Then vcOrdCol = "E.EMPL_vcNOMEMP"
            If vcOrdCol = "PedidoSolicitud" Then vcOrdCol = "CASE WHEN FS.InTipSol in (1,3) THEN SOL.vcCodigo ELSE cp.CodigoPedido END"
            If vcOrdCol = "Linea" Then vcOrdCol = "FS.Linea"
            If vcOrdCol = "TipoProceso" Then vcOrdCol = "TP.Descripcion"
            If vcOrdCol = "Periodo" Then vcOrdCol = "CRO.Periodo1"
            If vcOrdCol = "Vigente" Then vcOrdCol = "CRO.Vigente"
            If vcOrdCol = "MontoCuota" Then vcOrdCol = "CRO.MontoCuota"
            If vcOrdCol = "TipoDocumento" Then vcOrdCol = "TD.Descripcion"
            If vcOrdCol = "Motivo" Then vcOrdCol = "FS.DesSolicitud"
            If vcOrdCol = "EstadoCobro" Then vcOrdCol = "EC.Descripcion"
            If vcOrdCol = "NumeroComprobante" Then vcOrdCol = "C.NumeroComprobante"

            HttpContext.Current.Session("vcFiltro_MOV_CronogramaPago") = IdEmpleado & "|" & vcCodPedSol & "|" & inTipoLinea & "|" & vcLinea & "|" & inVerRegistros & "|" & vcPeriodoANSI & "|" & vcOrdCol _
            & "|" & vcTipOrdCol & "|"

            CronogramaPago = New BL_MOV_FAC_C_CronogramaPago(oUsuario.IdCliente)
            Dim dsDetalle As DataSet = CronogramaPago.ListarCobrosDevoluciones(IdEmpleado, vcCodPedSol, inTipoLinea, vcLinea, inVerRegistros, vcPeriodoANSI, Convert.ToInt32(inPagTam), _
                                                                 Convert.ToInt32(inPagAct), vcOrdCol, vcTipOrdCol)


            Dim inLen = dsDetalle.Tables(1).Rows.Count
            dsDetalle.Tables(1).Columns("MontoCuota").ReadOnly = False
            For i As Integer = 0 To inLen - 1
                Dim dr As DataRow = dsDetalle.Tables(1).Rows(i)
                dr("MontoCuota") = UtilitarioWeb.DevuelveNumeroFormateado(dr("MontoCuota").ToString(), strForNum)
            Next

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CronogramaPago IsNot Nothing Then CronogramaPago.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function AnularCobroDevolucion(ByVal IdCroPag As String) As Integer
        Dim CronogramaPago As BL_MOV_FAC_C_CronogramaPago = Nothing
        Dim Resultado As Integer = 0
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            CronogramaPago = New BL_MOV_FAC_C_CronogramaPago(oUsuario.IdCliente)
            Resultado = CronogramaPago.AnularCobroDevolucion(IdCroPag, oUsuario.P_inCod)
            CronogramaPago.Dispose()

            Return Resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

End Class