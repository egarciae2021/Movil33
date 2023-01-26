Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Conciliar_Documentos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo = Nothing
        Try

            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                oUsuario = HttpContext.Current.Session("Usuario")

                Dim Generico As String = "" & Request.QueryString("generico")
                hdfGenerico.Value = Generico

                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    hdfLicencia.Value = oUsuario.Empleado.Licencia.ToUpper
                    hdfbtPregunto.Value = "0"
                    hdfbtSobreescribe.Value = "0"
                    txtPeriodo.Text = DateTime.Now.AddMonths(-1).ToString("MM/yyyy")
                    txtLugar_BS.Text = "Cd. de México, a " & ObtenerNombreDia(Now.Day) & " " & Now.Day & " de " & ObtenerNombreMes(Now.Month) & " de " & Now.Year

                    TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    UtilitarioWeb.Dataddl(ddlTipoServicio, TipoModeloDispositivo.ListarModeloDispositivo(-1, "<Todos>"), "Descripcion", "IdTipoModeloDispositivo")

                    bpFactura.NombreEntidad = "Facturas"
                    bpFactura.vcTab = "vw_Fact_Edo_CtaDetalle_Factura"
                    bpFactura.TipoOrigen = 0
                    bpFactura.Condicion = ""
                    bpFactura.FuncionPersonalizada = "fnMostrarDatosFactura"
                    bpFactura.RutaRaiz = "../../"
                    bpFactura.Contenedor = "dvContenedorFactura"
                    bpFactura.Descripcion = "Total"
                    bpFactura.Codigo = "Factura"
                    bpFactura.MuestraMensajeNoDatos = False
                    bpFactura.TraerDatosFila = True


                    bpCuenta.NombreEntidad = "Cuentas"
                    bpCuenta.vcTab = "MOV_Cuenta"
                    bpCuenta.TipoOrigen = 0
                    bpCuenta.Condicion = ""
                    bpCuenta.FuncionPersonalizada = "fnMostrarDatosCuenta"
                    bpCuenta.RutaRaiz = "../../"
                    bpCuenta.Contenedor = "dvContenedorCuenta"
                    bpCuenta.Descripcion = "vcNom"
                    bpCuenta.Codigo = "P_vcCod"
                    bpCuenta.MuestraMensajeNoDatos = False
                    bpCuenta.TraerDatosFila = True
                    bpCuenta.AltoDialog = 455

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(TipoModeloDispositivo) Then TipoModeloDispositivo.Dispose()
        End Try
    End Sub

    Private Sub LimpiarCampos()
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerReporte_Cabecera_Conformidad(ByVal Periodo As String) As List(Of Object)
        Dim Concilia As BL_MOV_Concilia = Nothing
        Try
            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDatos As DataSet = Concilia.ObtenerReporte_Cabecera_Conformidad(Periodo)
            Dim dtCabecera As DataTable = dsDatos.Tables(0)
            Dim dtFacturacion As DataTable = dsDatos.Tables(1)
            Dim lstObj As New List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            For i As Integer = 0 To dtCabecera.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtCabecera.Columns
                    dict.Add(Columna.ColumnName, dtCabecera.Rows(i)(Columna.ColumnName).ToString())
                Next
                lstObj.Add(dict)
            Next

            dict = New Dictionary(Of String, Object)
            If dtFacturacion.Rows.Count > 0 Then
                dict.Add("PeriodoTieneFacturacion", "1")
            Else
                dict.Add("PeriodoTieneFacturacion", "0")
            End If
            lstObj.Add(dict)

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()

        End Try
    End Function
    <WebMethod()>
    Public Shared Function GuardarReporte_Cabecera_Conformidad(ByVal Tipo As String, ByVal ReporteNro As String, ByVal Lugar As String, _
                                                               ByVal FechaReciboSolicitud As String, ByVal FechaFormalizacionContrato As String,
                                                               ByVal FechaRecepcionContrato As String, ByVal Gerencia As String, ByVal SubGerencia As String, _
                                                               ByVal Departamento As String, ByVal Contrato As String, ByVal Solpe As String, _
                                                               ByVal OrdenSurtimiento As String, ByVal MontoContrato As String, ByVal MontoOS As String, _
                                                               ByVal PedidoAsociado As String, ByVal RazonSocial As String, ByVal ClaveOperador As String, _
                                                               ByVal RFC As String, ByVal EmitidoNombre As String, ByVal EmitidoCargo As String, _
                                                               ByVal EmitidoFecha As String, ByVal ProveedorNombre As String, ByVal ProveedorCargo As String, _
                                                               ByVal ProveedorFecha As String, ByVal ProveedorPuesto As String, _
                                                               ByVal FiltroCuentas As String, ByVal FiltroFacturas As String) As String
        Dim Concilia As BL_MOV_Concilia = Nothing
        Try
            HttpContext.Current.Session("Concilia_FiltroCuentas") = FiltroCuentas
            HttpContext.Current.Session("Concilia_FiltroFacturas") = FiltroFacturas

            If FechaReciboSolicitud <> "" Then FechaReciboSolicitud = FechaReciboSolicitud.Substring(6, 4) & FechaReciboSolicitud.Substring(3, 2) & FechaReciboSolicitud.Substring(0, 2)
            If FechaFormalizacionContrato <> "" Then FechaFormalizacionContrato = FechaFormalizacionContrato.Substring(6, 4) & FechaFormalizacionContrato.Substring(3, 2) & FechaFormalizacionContrato.Substring(0, 2)
            If FechaRecepcionContrato <> "" Then FechaRecepcionContrato = FechaRecepcionContrato.Substring(6, 4) & FechaRecepcionContrato.Substring(3, 2) & FechaRecepcionContrato.Substring(0, 2)
            If EmitidoFecha <> "" Then EmitidoFecha = EmitidoFecha.Substring(6, 4) & EmitidoFecha.Substring(3, 2) & EmitidoFecha.Substring(0, 2)
            If ProveedorFecha <> "" Then ProveedorFecha = ProveedorFecha.Substring(6, 4) & ProveedorFecha.Substring(3, 2) & ProveedorFecha.Substring(0, 2)
            If FechaReciboSolicitud = "" Then FechaReciboSolicitud = DateTime.Now.ToString("yyyyMMdd")
            If EmitidoFecha = "" Then EmitidoFecha = DateTime.Now.ToString("yyyyMMdd")
            If ProveedorFecha = "" Then ProveedorFecha = DateTime.Now.ToString("yyyyMMdd")

            Dim dcMontoContrato As Decimal = Convert.ToDecimal(MontoContrato.Replace(",", ""))
            Dim dcMontoOS As Decimal = Convert.ToDecimal(MontoOS.Replace(",", ""))

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As String = Concilia.GuardarReporte_Cabecera_Conformidad(Tipo, oUsuario.P_inCod, ReporteNro, Lugar, FechaReciboSolicitud, FechaFormalizacionContrato,
                                                                     FechaRecepcionContrato, Gerencia, SubGerencia, Departamento, Contrato,
                                                                     Solpe, OrdenSurtimiento, dcMontoContrato, dcMontoOS, PedidoAsociado,
                                                                     RazonSocial, ClaveOperador, RFC, EmitidoNombre, EmitidoCargo,
                                                                     EmitidoFecha, ProveedorNombre, ProveedorCargo, ProveedorFecha, ProveedorPuesto)

            Return Resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()
        End Try
    End Function



    <WebMethod()>
    Public Shared Function ObtenerReporte_Cabecera_BienesServicios(ByVal Periodo As String) As List(Of Object)
        Dim Concilia As BL_MOV_Concilia = Nothing
        Try
            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDatos As DataSet = Concilia.ObtenerReporte_Cabecera_BienesServicios(Periodo)
            Dim dtCabecera As DataTable = dsDatos.Tables(0)
            Dim dtFacturacion As DataTable = dsDatos.Tables(1)
            Dim lstObj As New List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            For i As Integer = 0 To dtCabecera.Rows.Count - 1
                dict = New Dictionary(Of String, Object)
                For Each Columna As DataColumn In dtCabecera.Columns
                    dict.Add(Columna.ColumnName, dtCabecera.Rows(i)(Columna.ColumnName).ToString())
                Next
                lstObj.Add(dict)
            Next

            dict = New Dictionary(Of String, Object)
            If dtFacturacion.Rows.Count > 0 Then
                dict.Add("PeriodoTieneFacturacion", "1")
            Else
                dict.Add("PeriodoTieneFacturacion", "0")
            End If
            lstObj.Add(dict)

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()

        End Try
    End Function
    <WebMethod()>
    Public Shared Function GuardarReporte_Cabecera_BienesServicios(ByVal Consecutivo01 As String, Consecutivo02 As String, Consecutivo03 As String,
                                                                   Lugar As String, Gerencia As String, SubGerencia As String, Proveedor As String,
                                                                   CompromisoSAP As String, Detalle01 As String, Detalle02 As String, NroPartida As String,
                                                                   EmitidoNombre As String, EmitidoCargo As String, EmitidoFicha As String,
                                                                   PersonaCOPADE As String, _
                                                                   ByVal FiltroCuentas As String, ByVal FiltroFacturas As String) As String
        Dim Concilia As BL_MOV_Concilia = Nothing
        Try

            HttpContext.Current.Session("Concilia_FiltroCuentas") = FiltroCuentas
            HttpContext.Current.Session("Concilia_FiltroFacturas") = FiltroFacturas

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Resultado As String = Concilia.GuardarReporte_Cabecera_BienesServicios(oUsuario.P_inCod, Consecutivo01, Consecutivo02, Consecutivo03,
                                                                                       Lugar, Gerencia, SubGerencia, Proveedor, CompromisoSAP,
                                                                                       Detalle01, Detalle02, NroPartida, EmitidoNombre,
                                                                                       EmitidoCargo, EmitidoFicha, PersonaCOPADE)

            Return Resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()
        End Try
    End Function


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


    <WebMethod()>
    Public Shared Function ActualizarFiltroProcura(ByVal Periodo As String, ByVal FiltroCuentas As String, ByVal FiltroFacturas As String) As List(Of Object)

        Dim Concilia As BL_MOV_Concilia = Nothing
        Try

            HttpContext.Current.Session("Concilia_FiltroCuentas") = FiltroCuentas
            HttpContext.Current.Session("Concilia_FiltroFacturas") = FiltroFacturas

            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDatos As DataSet = Concilia.ObtenerReporte_Cabecera_BienesServicios(Periodo)
            Dim dtFacturacion As DataTable = dsDatos.Tables(1)
            Dim lstObj As New List(Of Object)
            Dim dict As Dictionary(Of String, Object)
            dict = New Dictionary(Of String, Object)
            If dtFacturacion.Rows.Count > 0 Then
                dict.Add("PeriodoTieneFacturacion", "1")
            Else
                dict.Add("PeriodoTieneFacturacion", "0")
            End If
            lstObj.Add(dict)

            Return lstObj

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()

        End Try

    End Function

End Class
