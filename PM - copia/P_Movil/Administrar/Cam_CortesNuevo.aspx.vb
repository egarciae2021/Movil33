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
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Cam_CortesNuevo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                If Not IsNothing(Request.QueryString("Cod")) Then
                    hdfIdCorte.Value = Convert.ToInt32(Request.QueryString("Cod"))
                    HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()) = Nothing
                Else
                    HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()) = Nothing
                End If
                CargarCombos()
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub CargarCombos()
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Campana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)

            Dim lstCampana As New List(Of MOV_CAM_Campana)
            Dim vcIdCamAct As String = ""
            lstCampana = Campana.Listar(-1, "<Seleccione>")
            lstCampana.RemoveAt(0)
            UtilitarioWeb.Dataddl(ddlCampana, lstCampana, "Descripcion", "IdCampana")

            If lstCampana.Find(Function(c) c.btActivo = True) IsNot Nothing Then
                vcIdCamAct = lstCampana.Find(Function(c) c.btActivo = True).IdCampana.ToString()
            End If
            If vcIdCamAct <> "" Then ddlCampana.SelectedValue = vcIdCamAct Else ddlCampana.Items.Insert(0, New ListItem("<Seleccionar>", "-1"))

            'Dim Cuenta As BL_MOV_Cuenta = new BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.ListarPorLineaTipo(2, -1, "<Seleccione>"), "vcNom", "P_vcCod")

            ddlSituacion.Items.Add(New ListItem("<Seleccione>", "-1"))
            ddlSituacion.Items.Add(New ListItem("Baja", "Baja"))
            ddlSituacion.Items.Add(New ListItem("Nuevo", "Nuevo"))
            ddlSituacion.Items.Add(New ListItem("Renovación", "Renovacion"))
            'esto se debe mostrar solo si la campaña tiene el flag 'Permitir renovacion solo plan'
            ddlSituacion.Items.Add(New ListItem("Renovación Plan", "RenovacionPlan"))
            ddlSituacion.Items.Add(New ListItem("Portabilidad", "Portabilidad"))

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
    'Public Shared Function Mostrar(ByVal p_IdCorte As String) As MOV_CAM_CampanaCorte
    '    Try
    '        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = BL_MOV_CAM_CampanaCorte.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    '        Dim strForNum = DevuelveFormatoNumero(oCultura)
    '        Dim strForFec = oCultura.vcFecCor + " " + oCultura.vcHorCor

    '        Return CampanaCorte.Mostrar(Integer.Parse(p_IdCorte), strForNum, strForFec)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Function Mostrar(ByVal p_IdCorte As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing

        Try
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dict As New Dictionary(Of String, Object)
            Dim oCampanaCorte As New MOV_CAM_CampanaCorte()
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor
            Dim strForHor = oCultura.vcHorCor
            Dim ds As New DataSet

            If IsNothing(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString())) Then
                ds = CampanaCorte.Mostrar(Integer.Parse(p_IdCorte))
                HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()) = ds
            Else
                ds = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)
            End If

            Dim drRegistro As DataRow = ds.Tables(0).Rows(0)
            Dim Numeros As Integer() = {14, 15}
            Dim Fechas As Integer() = {9}

            oCampanaCorte.IdCorte = IIf(IsDBNull(drRegistro("IdCorte")), -1, Convert.ToInt32(drRegistro("IdCorte")))
            oCampanaCorte.IdCampana = IIf(IsDBNull(drRegistro("IdCampana")), -1, Convert.ToInt32(drRegistro("IdCampana")))
            oCampanaCorte.NumeroItem = IIf(IsDBNull(drRegistro("NumeroItem")), 0, Convert.ToByte(drRegistro("NumeroItem")))
            oCampanaCorte.Fecha = IIf(IsDBNull(drRegistro("Fecha")), DateTime.Now, Convert.ToDateTime(drRegistro("Fecha")))
            oCampanaCorte.NumeroPedidos = IIf(IsDBNull(drRegistro("NumeroPedidos")), -1, Convert.ToInt16(drRegistro("NumeroPedidos")))
            oCampanaCorte.Situacion = drRegistro("Situacion").ToString()

            dict.Add("CampanaCorte", oCampanaCorte)
            dict.Add("CampanaCorteDetalle", JQGrid.DatosJSON(ds.Tables(1), inPagTam, inPagAct, strForNum, strForFec, strForHor, Numeros, Fechas, 1))
            Return dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oCampanaCorte As String) As Integer
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(oUsuario.IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim oCampanaCorte As MOV_CAM_CampanaCorte = oSerializer.Deserialize(Of MOV_CAM_CampanaCorte)(p_oCampanaCorte)
            Dim dt As New DataTable

            If oCampanaCorte.IdCorte = -1 Then
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(0)
            Else
                dt = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet).Tables(1)
            End If

            If dt.Rows.Count > 0 Then
                Return CampanaCorte.Guardar(oCampanaCorte, dt, oUsuario.P_inCod, oUsuario.vcNom)
            Else
                Return -1
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try
    End Function

    '<WebMethod()>
    'Public Shared Function ListarPedidosIniciales(ByVal vcIdCampana As String, ByVal vcNomSit As String) As MOV_CAM_CampanaCorte
    '    Try
    '        Dim CampanaPedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = BL_MOV_CAM_CampanaPedidoDetalle.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
    '        Dim strForNum = DevuelveFormatoNumero(oCultura)
    '        Dim strForFec = oCultura.vcFecCor + " " + oCultura.vcHorCor

    '        Return CampanaPedidoDetalle.MostrarDetallesIniciales(Convert.ToInt32(vcIdCampana), vcNomSit, strForNum, strForFec)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Function ListarPedidosIniciales(ByVal vcIdCampana As Integer, ByVal vcNomSit As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal CriterioNuevo As Boolean) As Object
        Dim CampanaPedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = Nothing
        Try
            CampanaPedidoDetalle = New BL_MOV_CAM_CampanaPedidoDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim dict As New Dictionary(Of String, Object)
            Dim oCampanaCorte As New MOV_CAM_CampanaCorte()
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor
            Dim strForHor = oCultura.vcHorCor
            Dim ds As New DataSet

            If CriterioNuevo Then
                ds = CampanaPedidoDetalle.MostrarDetallesIniciales(Convert.ToInt32(vcIdCampana), vcNomSit)
                HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()) = ds
            Else
                ds = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)
            End If

            Dim vcDetalles As String = ""
            For i As Integer = 0 To ds.Tables(0).Rows.Count - 1
                vcDetalles = vcDetalles + ds.Tables(0).Rows(i)("IdDetallePedido").ToString() + ","
            Next
            If vcDetalles.Length > 0 Then vcDetalles = vcDetalles.Substring(0, vcDetalles.Length - 1)

            Dim Numeros As Integer() = {14, 15}
            Dim Fechas As Integer() = {8}

            oCampanaCorte.IdCorte = -1
            oCampanaCorte.IdCampana = vcIdCampana
            oCampanaCorte.NumeroPedidos = 0
            oCampanaCorte.Situacion = vcNomSit

            dict.Add("CampanaCorte", oCampanaCorte)
            dict.Add("CampanaCorteDetalle", JQGrid.DatosJSON(ds.Tables(0), inPagTam, inPagAct, strForNum, strForFec, strForHor, Numeros, Fechas, 1))
            dict.Add("vcDetalles", vcDetalles)

            Return dict
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
    Public Shared Function ObtenerDetalles(ByVal vcPedidos As String, ByVal vcSituacion As String) As MOV_CAM_CampanaCorte
        Dim CampanaPedidoDetalle As BL_MOV_CAM_CampanaPedidoDetalle = Nothing
        Try
            CampanaPedidoDetalle = New BL_MOV_CAM_CampanaPedidoDetalle(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = DevuelveFormatoNumero(oCultura)
            Dim strForFec = oCultura.vcFecCor + " " + oCultura.vcHorCor

            vcPedidos = vcPedidos.Replace("$$$", "'")

            Return CampanaPedidoDetalle.ObtenerDetallesPorPedidos(vcPedidos, vcSituacion, strForNum, strForFec)
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
    Public Shared Function VerificaEdicion(ByVal IdCorte As Integer) As Integer
        Dim CampanaCorte As BL_MOV_CAM_CampanaCorte = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CampanaCorte = New BL_MOV_CAM_CampanaCorte(oUsuario.IdCliente)

            Return CampanaCorte.VerificaEdicion(IdCorte)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CampanaCorte IsNot Nothing Then
                CampanaCorte.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Quitar(ByVal lstDetallePedido As String, ByVal IdCorte As String) As Integer
        Try
            Dim ds As New DataSet ' = CType(HttpContext.Current.Session("CampanaPedidoDetalle_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)

            If IdCorte <> "" Then
                ds = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)
            Else
                ds = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)
            End If

            Dim indexTabla As Integer

            If IdCorte = "" Then
                indexTabla = 0
            Else
                indexTabla = 1
            End If
            If Not String.IsNullOrEmpty(lstDetallePedido) Then
                Dim arrDetallePedido As String() = lstDetallePedido.Split(",")

                For index = 0 To ds.Tables(indexTabla).Rows.Count - 1
                    If index = ds.Tables(indexTabla).Rows.Count Then
                        Exit For
                    End If
                    For Each IdDetallePedido As String In arrDetallePedido
                        If ds.Tables(indexTabla).Rows(index)("IdDetallePedido") = IdDetallePedido Then
                            ds.Tables(indexTabla).Rows.Remove(ds.Tables(indexTabla).Rows(index))
                            index -= 1
                            Exit For
                        End If
                    Next
                Next
            Else
                ds.Tables(indexTabla).Rows.Clear()
            End If

            Return 1
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Agregar(ByVal lstDetallePedido As String, ByVal IdCorte As String, ByVal vcIdsPedEle As String) As Integer
        Try
            'Dim ds As DataSet = CType(HttpContext.Current.Session("CampanaPedidoDetalle_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)
            Dim ds As DataSet

            If IdCorte <> "" Then
                ds = CType(HttpContext.Current.Session("CampanaPedidoDetalleMostrar_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)
            Else
                ds = CType(HttpContext.Current.Session("CampanaPedidoDetalleIniciales_" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod.ToString()), DataSet)
            End If

            Dim oSerializer As New JavaScriptSerializer
            Dim vlstDetallePedido As List(Of Dictionary(Of String, Object)) = oSerializer.Deserialize(Of List(Of Dictionary(Of String, Object)))(lstDetallePedido)
            Dim indexTabla As Integer

            Dim blnAct As Boolean
            Dim lstPedEle As String() = vcIdsPedEle.Split(",")

            If IdCorte = "" Then indexTabla = 0 Else indexTabla = 1

            For Each oDetallePedido As Dictionary(Of String, Object) In vlstDetallePedido

                blnAct = True
                If vcIdsPedEle <> "" Then
                    For i As Integer = 0 To lstPedEle.Length - 1
                        If lstPedEle(i) = oDetallePedido("IdDetallePedido") Then blnAct = False
                    Next
                End If

                If blnAct Then
                    Dim drDetallePedido As DataRow = ds.Tables(indexTabla).NewRow()
                    drDetallePedido("IdCorte") = IIf(IdCorte = "", -1, IdCorte)
                    drDetallePedido("IdDetallePedido") = oDetallePedido("IdDetallePedido")
                    drDetallePedido("IdPedido") = oDetallePedido("IdPedido")
                    drDetallePedido("CodigoPedido") = oDetallePedido("CodigoPedido")
                    drDetallePedido("IdCuenta") = oDetallePedido("vcCodCue")
                    drDetallePedido("vcNomCue") = oDetallePedido("vcNomCue")
                    drDetallePedido("vcCodEmp") = oDetallePedido("vcCodEmp")
                    drDetallePedido("vcNomEmp") = oDetallePedido("EMPL_vcNOMEMP")
                    drDetallePedido("FechaPedido") = oDetallePedido("FechaPedido")
                    drDetallePedido("NumeroPedidos") = oDetallePedido("NumeroPedidos")
                    drDetallePedido("vcNomCCO") = oDetallePedido("CCOS_vcNOMCCO")
                    drDetallePedido("Linea") = oDetallePedido("Linea")
                    drDetallePedido("NomMod") = oDetallePedido("NomMod")
                    drDetallePedido("NomPlan") = oDetallePedido("NomPlan")
                    drDetallePedido("MontoTotalNoServicios") = oDetallePedido("MontoTotalNoServicios")
                    drDetallePedido("MontoTotalServicios") = oDetallePedido("MontoTotalServicios")
                    drDetallePedido("MesesContrato") = IIf(String.IsNullOrWhiteSpace(oDetallePedido("MesesContrato")), 0, oDetallePedido("MesesContrato"))
                    drDetallePedido("vcNomOrg") = oDetallePedido("ORGA_vcNOMORG")
                    ds.Tables(indexTabla).Rows.Add(drDetallePedido)
                End If
            Next
            Return 1
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class