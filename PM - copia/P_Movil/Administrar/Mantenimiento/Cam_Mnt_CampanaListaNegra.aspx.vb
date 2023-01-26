Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports Utilitario
Imports System.Data
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.IO

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaListaNegra
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim ItemSeguridad As BL_PRO_Item = Nothing

        Try
            If Not IsPostBack Then
                Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                hdfIdCampana.Value = Request.QueryString("IdCampana")

                If hdfIdCampana.Value = "" Then
                    hdfIdCampana.Value = "-1"
                End If
                HttpContext.Current.Session("ListaNegraCampana") = Nothing
                'ItemSeguridad = New BL_PRO_Item(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                'Dim vcTab As String = Request.QueryString("vcTab")
                ''Dim idCodPolSol As Integer
                'Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                'Dim oItemSeguridad As New ENT_PRO_Item
                'Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))

                UtilitarioWeb.Dataddl(ddlCampana, Campana.Listar(-1, "<Seleccione>"), "Descripcion", "IdCampana")
                'idCodPolSol = Convert.ToInt32(ConfigurationManager.AppSettings(vcTab))
                'hdfPolitica.Value = inCod.ToString
                'hdfTamPag.Value = "10"
                'hdfPagLis.Value = "[10,20,30]"

                'If inCod = 1 Then
                '    hdfUnidad.Value = "Unidades"
                'ElseIf inCod = 2 Then
                '    hdfUnidad.Value = "Meses"
                'End If

                'oItemSeguridad = ItemSeguridad.Mostrar(oUsuario, inCod)
                'ItemSeguridad.Dispose()

                'UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oItemSeguridad.Perfiles)

                'btnAgregarListaNegra.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar
                'btnEditarListaNegra.Visible = False 'UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar
                'btnQuitarListaNegra.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoEliminar
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
            If ItemSeguridad IsNot Nothing Then
                ItemSeguridad.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ListarListaNegra(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal IdCampana As String, ByVal intTipo As String, ByVal strValor As String) As Object
        Dim ListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing

        Try
            Dim dtListarListaNegra As New DataTable

            ListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'Return ListaNegra.Listar(Convert.ToInt32(IdCampana), Convert.ToInt32(intTipo), strValor)

            If IsNothing(HttpContext.Current.Session("ListaNegraCampana")) Then
                HttpContext.Current.Session("ListaNegraCampana") = ListaNegra.ListarListaNegraDT(Convert.ToInt32(IdCampana), 0, "")
            End If

            If strValor <> "" And intTipo <> "0" Then
                dtListarListaNegra = CType(HttpContext.Current.Session("ListaNegraCampana"), DataTable).Clone()
                For Each dr As DataRow In CType(HttpContext.Current.Session("ListaNegraCampana"), DataTable).Rows
                    If (intTipo = "1" And dr("Codigo").ToString().Contains(strValor)) Or (intTipo = "2" And dr("Empleado").ToString().Contains(strValor)) Then
                        Dim drAgregado As DataRow = dtListarListaNegra.NewRow()
                        drAgregado("Codigo") = dr("Codigo")
                        drAgregado("Id") = dr("Id")
                        drAgregado("Empleado") = dr("Empleado")
                        drAgregado("Descripcion") = dr("Descripcion")
                        dtListarListaNegra.Rows.Add(drAgregado)
                    End If
                Next
            Else
                dtListarListaNegra = CType(HttpContext.Current.Session("ListaNegraCampana"), DataTable)
            End If

            Return JQGrid.DatosJSON(dtListarListaNegra, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ListaNegra IsNot Nothing Then
                ListaNegra.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Sub AgregarEmpleado(ByVal v_lstEmpleado As String, ByVal IdCampana As Integer)
        Dim ListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing

        Try
            Dim serial As New JavaScriptSerializer()
            Dim lstEmpleado As List(Of Dictionary(Of String, Object)) = serial.Deserialize(Of List(Of Dictionary(Of String, Object)))(v_lstEmpleado)
            ListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dtListarListaNegra As DataTable = CType(HttpContext.Current.Session("ListaNegraCampana"), DataTable).Copy()
            For Each oEmpleado As Dictionary(Of String, Object) In lstEmpleado
                Dim drAgregado As DataRow = dtListarListaNegra.NewRow()

                drAgregado("Codigo") = oEmpleado("IdEmpleado")
                'drAgregado("Id") = -1
                drAgregado("Id") = IdCampana 'agregado wapumayta 07/15/2014
                drAgregado("Empleado") = oEmpleado("NombreEmpleado")
                drAgregado("Descripcion") = oEmpleado("Descripcion")

                dtListarListaNegra.Rows.Add(drAgregado)
                ListaNegra.Insertar(Convert.ToInt32(oEmpleado("IdCampana").ToString()), oEmpleado("IdEmpleado").ToString(), oEmpleado("Descripcion").ToString())
            Next
            HttpContext.Current.Session("ListaNegraCampana") = dtListarListaNegra
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ListaNegra IsNot Nothing Then ListaNegra.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Sub QuitarEmpleado(ByVal v_lstEmpleado As String)
        Dim ListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing

        Try
            'Dim serial As New JavaScriptSerializer()
            'Dim lstEmpleado As List(Of Dictionary(Of String, Object)) = serial.Deserialize(Of List(Of Dictionary(Of String, Object)))(v_lstEmpleado)
            ListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstEmpleado As String() = v_lstEmpleado.Split(",")

            Dim dtListarListaNegra As DataTable = CType(HttpContext.Current.Session("ListaNegraCampana"), DataTable).Copy()

            For Each oEmpleado As String In lstEmpleado
                For i As Integer = 0 To dtListarListaNegra.Rows.Count - 1
                    If dtListarListaNegra.Rows(i).Item("Codigo").ToString() = oEmpleado Then
                        ListaNegra.Eliminar(oEmpleado, Convert.ToInt32(dtListarListaNegra.Rows(i).Item("Id").ToString()))
                        dtListarListaNegra.Rows.RemoveAt(i)
                        Exit For
                    End If
                Next
            Next
            HttpContext.Current.Session("ListaNegraCampana") = dtListarListaNegra
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ListaNegra IsNot Nothing Then ListaNegra.Dispose()
        End Try
    End Sub

    '<WebMethod()> _
    'Public Shared Function ListarListaNegraCampana(ByVal IdCampana As String, ByVal intTipo As String, ByVal strValor As String) As List(Of MOV_CAM_CampanaCreditoListaNegra)
    '    Dim ListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing

    '    Try
    '        ListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        Return ListaNegra.Listar(Convert.ToInt32(IdCampana), Convert.ToInt32(intTipo), strValor)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If ListaNegra IsNot Nothing Then
    '            ListaNegra.Dispose()
    '        End If
    '    End Try
    'End Function

    '<WebMethod()>
    'Public Shared Function Guardar(ByVal IdCampana As String, ByVal CodEmpleado As String, ByVal Descripcion As String) As String
    '    Dim ListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing

    '    Try
    '        ListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        Return ListaNegra.Insertar(IdCampana, CodEmpleado, Descripcion)
    '        'Else
    '        'Return Factura.Actualizar(oFactura, vcFacDet, vcEmp, btOpcFre, inCodUsu)
    '        'End If
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If ListaNegra IsNot Nothing Then
    '            ListaNegra.Dispose()
    '        End If
    '    End Try
    'End Function

    '<WebMethod()> _
    'Public Shared Function Eliminar(ByVal IdListaN As String, IdCampana As String) As Integer
    '    Dim ListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra = Nothing

    '    Try
    '        ListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        ListaNegra.Eliminar(IdListaN, Convert.ToInt32(IdCampana))
    '        Return 1
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If ListaNegra IsNot Nothing Then
    '            ListaNegra.Dispose()
    '        End If
    '    End Try
    'End Function
End Class
