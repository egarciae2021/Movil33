Imports System.Web.Script.Services
Imports System.Web.Services
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Suite80.BL

Public Class Comp_Adm_TransferirDeuda
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Dim SubContrato As BL_MOV_FAC_SubContrato = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    bpEmpleado.Visible = True
                    bpEmpleado.NombreEntidad = "Empleado"
                    bpEmpleado.vcTab = "M_EMPL"
                    bpEmpleado.TipoOrigen = 0
                    bpEmpleado.Condicion = "EMPL_P_vcCODEMP in (Select IdEmpleado From GEN_EMP_Empleado where IdGrupoOrigen Is Not Null)"
                    bpEmpleado.FuncionPersonalizada = "fnMostrarEmpleado"
                    bpEmpleado.RutaRaiz = "../../../"
                    bpEmpleado.Contenedor = "div_bpEmpleado"
                    bpEmpleado.Codigo = "EMPL_P_vcCODEMP"

                    'ConfigurarTipoUsuario(oUsuario)

                    'SubContrato = New BL_MOV_FAC_SubContrato(1, oUsuario.IdCliente)
                    'Dim vcPeriodoANSI = SubContrato.ObtenerPeriodoActual()
                    'txtPeriodo.Text = vcPeriodoANSI.Substring(4, 2) + "/" + vcPeriodoANSI.Substring(0, 4)

                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function MostrarDetallesParaTransferenciaDeuda(ByVal TipoBusqueda As Integer, ByVal ValorBusqueda As String, ByVal IdPedido As String) As List(Of Object)
        Dim Pedido As BL_MOV_CAM_CampanaPedido = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            Pedido = New BL_MOV_CAM_CampanaPedido(oUsuario.IdCliente)
            Dim dsDetalle As DataSet = Pedido.MostrarDetallesParaTransferenciaDeuda(TipoBusqueda, ValorBusqueda, Convert.ToInt32("0" + IdPedido))
            Dim lstObject As New List(Of Object)

            Dim inLen = dsDetalle.Tables(0).Rows.Count
            dsDetalle.Tables(0).Columns("MontoEquipo").ReadOnly = False
            dsDetalle.Tables(0).Columns("MontoLinea").ReadOnly = False
            For i As Integer = 0 To inLen - 1
                Dim dr As DataRow = dsDetalle.Tables(0).Rows(i)
                dr("MontoLinea") = UtilitarioWeb.DevuelveNumeroFormateado(dr("MontoLinea").ToString(), strForNum)
                dr("MontoEquipo") = UtilitarioWeb.DevuelveNumeroFormateado(dr("MontoEquipo").ToString(), strForNum)
            Next

            lstObject.Add(JQGrid.DatosJSON(dsDetalle.Tables(0), 100, 1))

            If dsDetalle.Tables(1).Rows.Count > 0 Then
                Dim miDatos As New List(Of String)
                miDatos.Add(dsDetalle.Tables(1).Rows(0)("IdEmpleado"))
                miDatos.Add(dsDetalle.Tables(1).Rows(0)("NombreEmpleado"))
                miDatos.Add(dsDetalle.Tables(1).Rows(0)("Campana"))
                miDatos.Add(dsDetalle.Tables(1).Rows(0)("CodigoPedido"))
                miDatos.Add(dsDetalle.Tables(1).Rows(0)("FechaPedido"))
                lstObject.Add(miDatos)
            End If


            Return lstObject

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Pedido IsNot Nothing Then Pedido.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCuotasProgramadas(ByVal IdDetallePedido As Integer, ByVal IdEmpleadoNuevo As String) As List(Of List(Of Object))
        Dim CronogramaPago As BL_MOV_FAC_CronogramaPago = Nothing
        Dim lstObjects As New List(Of List(Of Object))
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            CronogramaPago = New BL_MOV_FAC_CronogramaPago(1, oUsuario.IdCliente)
            Dim dsDetalle As DataSet = CronogramaPago.ListarCuotasPorPedido(IdDetallePedido, IdEmpleadoNuevo)
            Dim dtGeneral As DataTable = dsDetalle.Tables(0)
            Dim dtCronograma As DataTable = dsDetalle.Tables(1)

            Dim lstObj As New List(Of Object)
            For i As Integer = 0 To dtGeneral.Rows.Count - 1
                Dim miDatos As New List(Of String)
                miDatos.Add(dtGeneral.Rows(i)("MonDisEquipo").ToString())
                miDatos.Add(dtGeneral.Rows(i)("MonDisServicio").ToString())
                miDatos.Add(dtGeneral.Rows(i)("Mensaje").ToString())
                lstObj.Add(miDatos)
            Next
            lstObjects.Add(lstObj)

            dtCronograma.Columns("MontoCuota").ReadOnly = False
            For i As Integer = 0 To dtCronograma.Rows.Count - 1
                Dim dr As DataRow = dtCronograma.Rows(i)
                dr("MontoCuota") = UtilitarioWeb.DevuelveNumeroFormateado(dr("MontoCuota").ToString(), strForNum)
            Next

            lstObj = New List(Of Object)
            For i As Integer = 0 To dtCronograma.Rows.Count - 1
                Dim miDatos As New List(Of String)
                miDatos.Add(dtCronograma.Rows(i)("IdTipoProducto").ToString())
                miDatos.Add(dtCronograma.Rows(i)("IdCronogramaPago").ToString())
                miDatos.Add(dtCronograma.Rows(i)("NumCuota").ToString())
                miDatos.Add(dtCronograma.Rows(i)("Titulo").ToString())
                miDatos.Add(dtCronograma.Rows(i)("MontoCuota").ToString())
                miDatos.Add(dtCronograma.Rows(i)("IdComprobante").ToString())
                lstObj.Add(miDatos)
            Next
            lstObjects.Add(lstObj)

            Return lstObjects

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CronogramaPago IsNot Nothing Then CronogramaPago.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GrabarTransferenciaDeuda(ByVal IdDetallePedido As String, ByVal IdEmpleadoNuevo As String, ByVal TransferirEquipo As Boolean, _
                                                    ByVal TransferirLinea As Boolean, ByVal CronogramaEquipo As String, ByVal CronogramaLinea As String, _
                                                    ByVal TipoBusqueda As Integer) As String
        Dim CronogramaPago As BL_MOV_FAC_CronogramaPago = Nothing
        Dim resultado As String = String.Empty
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            '    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            '    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura)

            If Convert.ToUInt32("0" + IdDetallePedido) <= 0 Then resultado = "No ha seleccionado un detalle de pedido válido.."
            If IdEmpleadoNuevo = "" Then resultado = "No ha elegido un empleado al que se le transferirá la deuda."
            If CronogramaLinea = "" Then resultado = "La transferencia de la deuda del servicio es requerida. Es imprescindible que la agregue."

            If resultado = "" Then
                CronogramaPago = New BL_MOV_FAC_CronogramaPago(1, oUsuario.IdCliente)
                resultado = CronogramaPago.GrabarTransferenciaDeuda(Convert.ToInt32(IdDetallePedido), IdEmpleadoNuevo, TransferirEquipo, TransferirLinea, _
                                                                    CronogramaEquipo, CronogramaLinea, oUsuario.P_inCod, oUsuario.vcUsu, TipoBusqueda)
            End If

            Return resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CronogramaPago IsNot Nothing Then CronogramaPago.Dispose()
        End Try
    End Function

End Class