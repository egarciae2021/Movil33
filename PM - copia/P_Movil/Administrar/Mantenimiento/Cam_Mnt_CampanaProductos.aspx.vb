Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaProductos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Campana = New BL_MOV_CAM_Campana(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'cargar camapañas
                    UtilitarioWeb.Dataddl(ddlCampanaActiva, Campana.Listar(-1, "--Seleccione--"), "Descripcion", "IdCampana")

                    Dim IdCampana As Integer = Convert.ToInt32(Request.QueryString("IdCampana"))
                    ddlCampanaActiva.SelectedValue = IdCampana.ToString()

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
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

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarProductos(ByVal IdCampana As Integer, ByVal vcCampoFiltro As String, ByVal vcValorFiltro As String, _
                                           ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = Producto.ListarCampanaProducto_x_Campana(IdCampana, vcCampoFiltro, vcValorFiltro)
            Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTiposProducto() As List(Of MOV_CAM_ProductoTipo)
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstProdTip As List(Of MOV_CAM_ProductoTipo) = Producto.ListarTipoProducto_x_Cliente()
            Return lstProdTip
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarProducto_x_Tipo(ByVal IdTip As Integer, ByVal IdCam As Integer, ByVal vcFiltro As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, _
                                                 ByVal vcOrdCol As String, ByVal vcTipOrdCol As String) As Object
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = Producto.ListarProducto_x_Tipo(IdTip, IdCam, vcFiltro)
            If vcOrdCol <> "" Then
                If vcOrdCol = "vcDes" Then
                    vcOrdCol = "vcNom"
                End If
                Dim dvData As New DataView(dt)
                dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                dt = dvData.ToTable()
            End If

            Dim TotalPaginas As Integer
            Dim TotalRegistros As Integer
            Dim inResto As Integer
            TotalRegistros = dt.Rows.Count
            TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
            If inResto > 0 Then TotalPaginas = TotalPaginas + 1
            Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EstadoReservable(ByVal IdCampana As Integer) As Boolean
        Dim Producto As BL_MOV_CAM_Producto = Nothing
        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim estReserv As Boolean = Producto.CampanaProducto_EstadoReservable(IdCampana)
            Return estReserv
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function AgregarCampanaProducto(ByVal IdCamp As Integer, ByVal IdTipProd As Integer, ByVal IdProd As String, _
                                                  ByVal Prec As Decimal, ByVal Cant As Integer, ByVal Reserv As Boolean, _
                                                  ByVal esAdd As Boolean) As List(Of String)
        Dim Producto As BL_MOV_CAM_Producto = Nothing
        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstErrors As New List(Of String)
            Dim lstProds As List(Of String) = IdProd.Split(",").ToList()
            Dim resultado As Integer
            For Each id As String In lstProds
                Dim oCampanaProducto As New MOV_CAM_CampanaProducto()
                oCampanaProducto.IdCampana = IdCamp
                oCampanaProducto.IdTipoProducto = IdTipProd
                oCampanaProducto.IdProducto = Convert.ToInt32(id)
                oCampanaProducto.Precio = Prec
                oCampanaProducto.CantidadTotal = Cant
                oCampanaProducto.Reservable = Reserv
                If esAdd Then
                    resultado = Producto.InsertarCampanaProducto(oCampanaProducto)
                Else
                    resultado = Producto.ActualizarCampanaProducto(oCampanaProducto)
                End If
                If (resultado = 0) Then
                    lstErrors.Add(id)
                End If
            Next
            Return lstErrors
            'reusltado 1 = satisfactorio, resultado 0 = ya existe
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EliminarCampanaProducto(ByVal IdCampProd As String) As List(Of String)
        Dim Producto As BL_MOV_CAM_Producto = Nothing
        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCorrectos As New List(Of String)
            Dim lstErrors As New List(Of String)
            Dim lstPedidos As New List(Of String)
            Dim lstResultado As New List(Of String)
            Dim lstProds As List(Of String) = IdCampProd.Split(",").ToList()
            Dim resultado As Integer
            For Each id As String In lstProds
                Dim oCampanaProducto As New MOV_CAM_CampanaProducto()
                Dim lstIds As List(Of String) = id.Split("-").ToList()
                oCampanaProducto.IdCampana = Convert.ToInt32(lstIds(0))
                oCampanaProducto.IdTipoProducto = Convert.ToInt32(lstIds(1))
                oCampanaProducto.IdProducto = Convert.ToInt32(lstIds(2))
                resultado = Producto.ElimianrCampanaProducto(oCampanaProducto)
                If (resultado = 0) Then 'errores
                    lstErrors.Add(id)
                ElseIf (resultado = 1) Then 'correctos
                    lstCorrectos.Add(id)
                ElseIf (resultado = 2) Then 'en pedidos
                    lstPedidos.Add(id)
                End If
            Next
            lstResultado.Add(lstCorrectos.Count.ToString())
            lstResultado.Add(lstErrors.Count.ToString())
            lstResultado.Add(lstPedidos.Count.ToString())
            Return lstResultado
            'reusltado 1 = satisfactorio, resultado 0 = no existe para eliminar, resultado 2 = ya existe en pedidos
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPrecios_x_Producto(ByVal IdCamp As Integer, ByVal IdProd1 As Integer) As List(Of Dictionary(Of String, String))
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtPrecios As DataTable = Producto.ListarProductoPrecio(IdCamp, IdProd1)
            Dim lstPrecios As New List(Of Dictionary(Of String, String))
            For Each dr As DataRow In dtPrecios.Rows
                Dim elem As New Dictionary(Of String, String)
                elem.Add("IdTipoProducto1", dr("IdTipoProducto1").ToString)
                elem.Add("IdProducto1", dr("IdProducto1").ToString)
                elem.Add("vcNomModDip", dr("vcNomModDip").ToString())
                elem.Add("IdProducto2", dr("IdProducto2").ToString)
                elem.Add("vcNomPla", dr("vcNomPla").ToString)
                elem.Add("vcDesPla", dr("vcDesPla").ToString)
                elem.Add("Precio", dr("Precio").ToString)
                elem.Add("MesesContrato", dr("MesesContrato").ToString)
                elem.Add("IdTipoProducto2", dr("IdTipoProducto2").ToString)
                lstPrecios.Add(elem)
            Next
            Return lstPrecios
            'reusltado 1 = satisfactorio, resultado 0 = no existe para eliminar
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EditarProductoPrecio(ByVal IdCamp As Integer, ByVal IdProd1 As Integer, ByVal Meses As Integer, ByVal MesesN As Integer,
                                                ByVal PrecioN As Decimal, ByVal IdPlanEquivalente As Integer, ByVal IdPlan As Integer) As Integer
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer = 0
            resultado = Producto.ActualizarProductoPrecio(IdCamp, IdProd1, Meses, PrecioN, MesesN, IdPlanEquivalente, IdPlan)
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function AgregarProductoPrecio(ByVal IdCamp As Integer, ByVal IdProd1 As Integer, ByVal IdProd2 As Integer,
                                                 ByVal Precio As Decimal, ByVal Meses As Integer, ByVal IdPlanEquivalente As Integer) As Integer
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer = 0
            resultado = Producto.InsertarProductoPrecio(IdCamp, IdProd1, IdProd2, Precio, Meses, IdPlanEquivalente)
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarPlanes_Autocomplete(ByVal IdTip As Integer, ByVal IdCam As Integer, ByVal vcFiltro As String, ByVal biEsRenovacion As Boolean) As Object
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = Producto.ListarProducto_x_Tipo_ParaPrecio(IdTip, IdCam, vcFiltro, biEsRenovacion)
            Dim lstPlanes As New List(Of Dictionary(Of String, String))
            For Each dr As DataRow In dt.Rows
                Dim dict As New Dictionary(Of String, String)
                dict.Add("vcNom", dr("vcNom").ToString)
                dict.Add("P_inCod", dr("P_inCod").ToString)
                'dict.Add("vcDes", dr("vcDes").ToString)
                lstPlanes.Add(dict)
            Next
            Return lstPlanes
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarPlanesTodos_Autocomplete(ByVal IdTip As Integer, ByVal IdCam As Integer, ByVal vcFiltro As String, ByVal IdPlanElegido As String) As Object
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = Producto.ListarProducto_x_Tipo(IdTip, IdCam, vcFiltro)
            Dim lstPlanes As New List(Of Dictionary(Of String, String))
            For Each dr As DataRow In dt.Rows
                If dr("P_inCod").ToString() <> IdPlanElegido Then
                    Dim dict As New Dictionary(Of String, String)
                    dict.Add("vcNom", dr("vcNom").ToString)
                    dict.Add("P_inCod", dr("P_inCod").ToString)
                    lstPlanes.Add(dict)
                End If
            Next
            Return lstPlanes
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function EliminarProductoPrecio(ByVal IdCamp As Integer, ByVal IdProd1 As Integer,
                                                  ByVal IdProd2 As Integer, ByVal Meses As Integer) As Integer
        Dim Producto As BL_MOV_CAM_Producto = Nothing

        Try
            Producto = New BL_MOV_CAM_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer = 0
            resultado = Producto.EliminarProductoPrecio(IdCamp, IdProd1, IdProd2, Meses)
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Producto IsNot Nothing Then
                Producto.Dispose()
            End If
        End Try
    End Function
End Class
