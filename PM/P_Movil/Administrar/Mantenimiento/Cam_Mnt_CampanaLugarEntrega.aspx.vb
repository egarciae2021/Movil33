Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaLugarEntrega
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Oficina As BL_GEN_EMP_Oficina = Nothing
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            If Not IsPostBack Then
                Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                hdfIdCampana.Value = Request.QueryString("IdCampana")

                UtilitarioWeb.Dataddl(ddlOficinaDistribuidora, Oficina.CargarCombo(-1, "<Seleccionar>"), "Descripcion", "IdOficina")
                UtilitarioWeb.Dataddl(ddlOficinaDistribuidoraE, Oficina.CargarCombo(-1, "<Seleccionar>"), "Descripcion", "IdOficina")
                UtilitarioWeb.Dataddl(ddlCampana, Campana.Listar(-1, "<Seleccione>"), "Descripcion", "IdCampana")

                Session("LugarEntregaCampana") = Nothing
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Oficina IsNot Nothing Then Oficina.Dispose()
            If Campana IsNot Nothing Then Campana.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function Listar() As List(Of GEN_EMP_Oficina)
        Dim Oficina As BL_GEN_EMP_Oficina = Nothing
        Try
            Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return Oficina.Listar()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Oficina IsNot Nothing Then Oficina.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarOficinaNoAgregadas(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim Oficina As BL_GEN_EMP_Oficina = Nothing
        Try
            Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'Return Oficina.Listar()
            Dim oficinas As DataTable = Oficina.ListarOficinaDt()
            Dim OficinaNoAgregadas As DataTable = oficinas.Clone()
            Dim OficinasAgregar As DataTable = HttpContext.Current.Session("LugarEntregaCampana")
            Dim Existe As Boolean = False

            For Each dr As DataRow In oficinas.Rows
                Existe = False
                If OficinasAgregar IsNot Nothing Then
                    For Each drAgregar As DataRow In OficinasAgregar.Rows
                        If drAgregar("IdOficina").ToString() = dr("IdOficina").ToString() Then
                            Existe = True
                            Exit For
                        End If
                    Next
                    If Not Existe Then
                        Dim drAgregado As DataRow = OficinaNoAgregadas.NewRow()
                        drAgregado("IdOficina") = dr("IdOficina")
                        drAgregado("IdPais") = dr("IdPais")
                        drAgregado("NombrePais") = dr("NombrePais")
                        drAgregado("IdCiudad") = dr("IdCiudad")
                        drAgregado("NombreCiudad") = dr("NombreCiudad")
                        drAgregado("IdDistrito") = dr("IdDistrito")
                        drAgregado("NombreDistrito") = dr("NombreDistrito")
                        drAgregado("Descripcion") = dr("Descripcion")
                        drAgregado("DireccionCompleta") = dr("DireccionCompleta")
                        drAgregado("Referencia") = dr("Referencia")
                        OficinaNoAgregadas.Rows.Add(drAgregado)
                    End If
                End If
            Next
            Return JQGrid.DatosJSON(OficinaNoAgregadas, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Oficina IsNot Nothing Then Oficina.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarLugarEntregaCampana(ByVal IdCampana As Integer) As List(Of ENT_MOV_CAM_CampanaLugarEntrega)
        Dim LugarE As BL_MOV_CAM_CampanaLugarEntrega = Nothing

        Try
            LugarE = New BL_MOV_CAM_CampanaLugarEntrega(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return LugarE.Listar(IdCampana)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LugarE IsNot Nothing Then LugarE.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarLugarEntrega(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal IdCampana As String, ByVal Oficina As String, _
                                              ByVal Tipo As Integer) As Object
        Dim LugarE As BL_MOV_CAM_CampanaLugarEntrega = Nothing

        Try
            LugarE = New BL_MOV_CAM_CampanaLugarEntrega(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim vIdCampana As Integer = -1
            If IdCampana = "" Then
                vIdCampana = -1
            Else
                vIdCampana = Convert.ToInt32(IdCampana)
            End If

            If IsNothing(HttpContext.Current.Session("LugarEntregaCampana")) Then
                HttpContext.Current.Session("LugarEntregaCampana") = LugarE.ListarLugarEntregaDt(vIdCampana, "", Tipo)
            End If

            'Return LugarE.Listar(IdCampana)
            Return JQGrid.DatosJSON(LugarE.ListarLugarEntregaDt(vIdCampana, Oficina, Tipo), inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LugarE IsNot Nothing Then LugarE.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Guardar(ByVal IdCampana As String, ByVal vcLugEnt As String) As Integer
        Dim LugarEntrega As BL_MOV_CAM_CampanaLugarEntrega = Nothing

        Try
            LugarEntrega = New BL_MOV_CAM_CampanaLugarEntrega(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            LugarEntrega.Insertar(IdCampana, vcLugEnt)
            'Else
            'Return Factura.Actualizar(oFactura, vcFacDet, vcEmp, btOpcFre, inCodUsu)
            'End If
            Return 1
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LugarEntrega IsNot Nothing Then LugarEntrega.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Actualizar(ByVal IdLugarEntregaCampana As Integer, ByVal IdCampana As Integer, ByVal IdOficina As Integer, ByVal IdOficinaDistribuidora As Integer, ByVal FechaInicioRecojo As String, ByVal FechaFinRecojo As String, ByVal Horario As String, ByVal PersonaContacto As String, ByVal TelefonoContacto As String, ByVal TipoEnvio As String, ByVal RepartoDirecto As String, ByVal Capacidad As String) As Integer
        Dim LugarEntrega As BL_MOV_CAM_CampanaLugarEntrega = Nothing

        Try
            LugarEntrega = New BL_MOV_CAM_CampanaLugarEntrega(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            LugarEntrega.Actualizar(IdLugarEntregaCampana, IdCampana, IdOficina, IdOficinaDistribuidora, FechaInicioRecojo, FechaFinRecojo, Horario, PersonaContacto, TelefonoContacto, TipoEnvio, IIf(RepartoDirecto = "SI", 1, 0), Convert.ToInt32(Capacidad))
            Return 1
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LugarEntrega IsNot Nothing Then LugarEntrega.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Eliminar(ByVal IdLugarE As String, ByVal IdCampana As Integer) As Integer
        Dim LugarEntrega As BL_MOV_CAM_CampanaLugarEntrega = Nothing

        Try
            LugarEntrega = New BL_MOV_CAM_CampanaLugarEntrega(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return LugarEntrega.Eliminar(IdCampana, IdLugarE)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LugarEntrega IsNot Nothing Then LugarEntrega.Dispose()
        End Try
    End Function
End Class
