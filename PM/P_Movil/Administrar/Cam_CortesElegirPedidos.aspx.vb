Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Cam_CortesElegirPedidos
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                CargarCombos()
                hdfIdCampana.Value = Request.QueryString("IdCampana")
                hdfSituacion.Value = Request.QueryString("IdSituacion")
                hdfEsAgregar.Value = Request.QueryString("EsAgregar")
                hdfIdCorte.Value = Request.QueryString("IdCorte")

                If hdfSituacion.Value = "Nuevo" Then
                    trFiltroCuenta.Style("display") = "none"
                End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

   Private Sub CargarCombos()
      Dim Cuenta As BL_MOV_Cuenta = Nothing

      Try
         Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.ListarPorLineaTipo(2, -1, "<Todos>"), "vcNom", "P_vcCod")
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Cuenta IsNot Nothing Then
            Cuenta.Dispose()
         End If
      End Try
   End Sub

    <WebMethod()>
    Public Shared Function ListarPedidos(ByVal inIdCampana As String, ByVal vcNomSit As String, ByVal vcFecIni As String, ByVal vcFecFin As String, _
                                         ByVal vcCodEmp As String, ByVal vcCodAre As String, ByVal vcCodCCO As String, ByVal vcCodCue As String, _
                                         ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal inIdCorte As Integer) As Object
        Dim CampanaPedido As BL_MOV_CAM_CampanaPedido = Nothing
        Try
            CampanaPedido = New BL_MOV_CAM_CampanaPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Dim dt As New DataTable
            If inIdCorte <> -1 Then
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(1)
            Else
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(0)
            End If

            Dim dtPedidos As DataTable = New DataTable()
            dtPedidos = dt.DefaultView.ToTable(True, "IdDetallePedido")
            Dim vcPedidos As String = ""
            For i As Integer = 0 To dtPedidos.Rows.Count - 1
                vcPedidos = vcPedidos + dtPedidos.Rows(i)("IdDetallePedido").ToString() + ","
            Next
            If vcPedidos.Length > 0 Then vcPedidos = vcPedidos.Substring(0, vcPedidos.Length - 1)

            Dim vcHayCuentas As String = "0"

            If vcFecIni.Trim <> "" Then vcFecIni = vcFecIni.Substring(6, 4) + vcFecIni.Substring(3, 2) + vcFecIni.Substring(0, 2) + " 00:00:00"
            If vcFecFin <> "" Then vcFecFin = vcFecFin.Substring(6, 4) + vcFecFin.Substring(3, 2) + vcFecFin.Substring(0, 2) + " 23:59:59"
            If vcCodEmp = "" Then vcCodEmp = ""
            If vcCodAre = "" Then vcCodAre = "0"
            If vcCodCue = "-1" Then
                vcCodCue = "''"
            Else
                If vcNomSit = "Nuevo" Then
                    vcHayCuentas = "0"
                Else
                    vcHayCuentas = "1"
                End If
            End If

            Dim dsPedidos As DataSet = CampanaPedido.ListarPedidosPorAgregar(Integer.Parse(inIdCampana), vcNomSit, vcFecIni, vcFecFin, vcCodEmp, Convert.ToInt32(vcCodAre), _
                                                                             vcCodCCO, vcCodCue, vcHayCuentas, inIdCorte, True, vcPedidos, inPagTam, inPagAct)
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor
            Dim strForHor = oCultura.vcHorCor
            Dim Numeros As Integer() = {}
            Dim Fechas As Integer() = {7}


            Return JQGrid.DatosJSON(dsPedidos.Tables(1), inPagTam, inPagAct, dsPedidos.Tables(0).Rows(0)("TotalRegistros"), strForNum, strForFec, strForHor, Numeros.ToArray(), Fechas.ToArray(), 1)
            'Dim lstObj As New List(Of Object)

            'For i As Integer = 0 To dtPedidos.Rows.Count - 1

            '    Dim dict As New Dictionary(Of String, Object)
            '    dict.Add("IdCampana", dtPedidos.Rows(i)("IdCampana").ToString())
            '    dict.Add("IdPedido", dtPedidos.Rows(i)("IdPedido").ToString())
            '    dict.Add("NumeroPedido", dtPedidos.Rows(i)("NumeroPedido").ToString())
            '    dict.Add("IdEmpleado", dtPedidos.Rows(i)("IdEmpleado").ToString())
            '    dict.Add("vcNomEmp", dtPedidos.Rows(i)("vcNomEmp").ToString())
            '    dict.Add("vcNomOrg", dtPedidos.Rows(i)("vcNomOrg").ToString())
            '    dict.Add("vcNomCCO", dtPedidos.Rows(i)("vcNomCCO").ToString())
            '    dict.Add("FechaPedido", DevuelveFechaHoraFormateada(dtPedidos.Rows(i)("FechaPedido").ToString(), strForFec))
            '    dict.Add("FechaPedidoAnsi", dtPedidos.Rows(i)("FechaPedido").ToString())
            '    dict.Add("NumeroItems", dtPedidos.Rows(i)("NumeroItems").ToString())
            '    lstObj.Add(dict)
            'Next

            'Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedido IsNot Nothing Then
                CampanaPedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPedidoDetalles(ByVal inIdPedido As String, ByVal vcNomSit As String, ByVal inIdCorte As Integer) As List(Of Object)
        Dim CampanaPedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = Nothing
        Try
            CampanaPedidoDetalle = New BL_MOV_CAM_CampanaPedidoDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Dim dt As New DataTable
            If inIdCorte <> -1 Then
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(1)
            Else
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(0)
            End If

            'Concatenando todos los detalles del pedido seleccionado que ya se encuentra agregado
            Dim result() As DataRow = dt.Select("IdPedido=" + inIdPedido.ToString())
            Dim vcDetalles As String = ""
            For Each row As DataRow In result
                'vcDetalles = vcDetalles + row(0)("IdDetallePedido") + ","
                vcDetalles = vcDetalles + row("IdDetallePedido").ToString() + ","
            Next
            If vcDetalles.Length > 0 Then vcDetalles = vcDetalles.Substring(0, vcDetalles.Length - 1)

            Dim dtDetalles As DataTable = CampanaPedidoDetalle.ListarPedidoDetalles(Integer.Parse(inIdPedido), vcNomSit, True, oCultura, True, vcDetalles).Tables(0)
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim lstObj As New List(Of Object)

            For i As Integer = 0 To dtDetalles.Rows.Count - 1
                Dim dict As New Dictionary(Of String, Object)
                dict.Add("IdDetallePedido", dtDetalles.Rows(i)("IdDetallePedido").ToString())
                dict.Add("IdPedido", dtDetalles.Rows(i)("IdPedido").ToString())
                dict.Add("NumeroItem", dtDetalles.Rows(i)("NumeroItem").ToString())
                dict.Add("NomMod", dtDetalles.Rows(i)("NomMod").ToString().Trim())
                dict.Add("Linea", dtDetalles.Rows(i)("Linea").ToString().Trim())
                dict.Add("NomPlan", dtDetalles.Rows(i)("NomPlan").ToString().Trim())
                dict.Add("MontoTotalNoServicios", DevuelveNumeroFormateado(dtDetalles.Rows(i)("MontoTotalNoServicios").ToString().Trim(), strForNum))
                dict.Add("MontoTotalServicios", DevuelveNumeroFormateado(dtDetalles.Rows(i)("MontoTotalServicios").ToString().Trim(), strForNum))
                dict.Add("vcCodCue", dtDetalles.Rows(i)("vcCodCue").ToString().Trim())
                dict.Add("vcNomCue", dtDetalles.Rows(i)("vcNomCue").ToString().Trim())
                dict.Add("MesesContrato", dtDetalles.Rows(i)("MesesContrato").ToString())
                lstObj.Add(dict)
            Next

            Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedidoDetalle IsNot Nothing Then
                CampanaPedidoDetalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarPedidosAgregados(ByVal inIdCampana As String, ByVal vcNomSit As String, ByVal vcFecIni As String, ByVal vcFecFin As String, _
                                         ByVal vcCodEmp As String, ByVal vcCodAre As String, ByVal vcCodCCO As String, ByVal vcCodCue As String, _
                                         ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal inIdCorte As Integer) As Object
        Dim CampanaPedido As BL_MOV_CAM_CampanaPedido = Nothing
        Try
            CampanaPedido = New BL_MOV_CAM_CampanaPedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            Dim dt As New DataTable
            If inIdCorte <> -1 Then
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(1)
            Else
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(0)
            End If

            Dim dtPedidos As DataTable = New DataTable()
            dtPedidos = dt.DefaultView.ToTable(True, "IdDetallePedido")
            Dim vcPedidos As String = ""
            For i As Integer = 0 To dtPedidos.Rows.Count - 1
                vcPedidos = vcPedidos + dtPedidos.Rows(i)("IdDetallePedido").ToString() + ","
            Next
            If vcPedidos.Length > 0 Then vcPedidos = vcPedidos.Substring(0, vcPedidos.Length - 1)

            Dim vcHayCuentas As String = "0"

            If vcFecIni.Trim <> "" Then vcFecIni = vcFecIni.Substring(6, 4) + vcFecIni.Substring(3, 2) + vcFecIni.Substring(0, 2) + " 00:00:00"
            If vcFecFin <> "" Then vcFecFin = vcFecFin.Substring(6, 4) + vcFecFin.Substring(3, 2) + vcFecFin.Substring(0, 2) + " 23:59:59"
            If vcCodEmp = "" Then vcCodEmp = ""
            If vcCodAre = "" Then vcCodAre = "0"
            'If vcCodCue = "-1" Then vcCodCue = "''" Else vcHayCuentas = "1"
            If vcCodCue = "-1" Then
                vcCodCue = "''"
            Else
                If vcNomSit = "Nuevo" Then
                    vcHayCuentas = "0"
                Else
                    vcHayCuentas = "1"
                End If
            End If

            Dim dsPedidos As DataSet = CampanaPedido.ListarPedidosPorAgregar(Integer.Parse(inIdCampana), vcNomSit, vcFecIni, vcFecFin, vcCodEmp, Convert.ToInt32(vcCodAre), _
                                                                             vcCodCCO, vcCodCue, vcHayCuentas, inIdCorte, False, vcPedidos, inPagTam, inPagAct)

            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor
            Dim strForHor = oCultura.vcHorCor
            Dim Numeros As Integer() = {}
            Dim Fechas As Integer() = {7}

            Return JQGrid.DatosJSON(dsPedidos.Tables(1), inPagTam, inPagAct, dsPedidos.Tables(0).Rows(0)("TotalRegistros"), strForNum, strForFec, strForHor, Numeros.ToArray(), Fechas.ToArray(), 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedido IsNot Nothing Then CampanaPedido.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetallesAgregados(ByVal inIdPedido As String, ByVal vcNomSit As String, ByVal inIdCorte As Integer) As List(Of Object)
        Dim CampanaPedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = Nothing
        Try
            CampanaPedidoDetalle = New BL_MOV_CAM_CampanaPedidoDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dtDetalles As DataTable = CampanaPedidoDetalle.ListarPedidoDetalles(Integer.Parse(inIdPedido), vcNomSit, True, oCultura, False, "").Tables(0)
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim lstObj As New List(Of Object)

            Dim dt As New DataTable
            If inIdCorte <> -1 Then
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(1)
            Else
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(0)
            End If

            For i As Integer = 0 To dtDetalles.Rows.Count - 1
                If (dt.Select("IdDetallePedido=" + dtDetalles.Rows(i)("IdDetallePedido").ToString()).Length > 0) Then
                    Dim dict As New Dictionary(Of String, Object)
                    dict.Add("IdDetallePedido", dtDetalles.Rows(i)("IdDetallePedido").ToString())
                    dict.Add("IdPedido", dtDetalles.Rows(i)("IdPedido").ToString())
                    dict.Add("NumeroItem", dtDetalles.Rows(i)("NumeroItem").ToString())
                    dict.Add("NomMod", dtDetalles.Rows(i)("NomMod").ToString().Trim())
                    dict.Add("Linea", dtDetalles.Rows(i)("Linea").ToString().Trim())
                    dict.Add("NomPlan", dtDetalles.Rows(i)("NomPlan").ToString().Trim())
                    dict.Add("MontoTotalNoServicios", DevuelveNumeroFormateado(dtDetalles.Rows(i)("MontoTotalNoServicios").ToString().Trim(), strForNum))
                    dict.Add("MontoTotalServicios", DevuelveNumeroFormateado(dtDetalles.Rows(i)("MontoTotalServicios").ToString().Trim(), strForNum))
                    dict.Add("vcCodCue", dtDetalles.Rows(i)("vcCodCue").ToString().Trim())
                    dict.Add("vcNomCue", dtDetalles.Rows(i)("vcNomCue").ToString().Trim())
                    dict.Add("MesesContrato", dtDetalles.Rows(i)("MesesContrato").ToString())
                    lstObj.Add(dict)
                End If
            Next

            Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaPedidoDetalle IsNot Nothing Then
                CampanaPedidoDetalle.Dispose()
            End If
        End Try
    End Function

End Class