Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.Campana.BE
Imports VisualSoft.PCSistelMovil.Campana.BL

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaFinanciamiento
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

            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarCampFinanciamiento(ByVal IdCampana As Integer, ByVal vcCampoFiltro As String, ByVal vcValorFiltro As String, _
                                                    ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dtFinanc As DataTable = Campana.ListarCampanaFinanciamiento_x_Campana(IdCampana, vcCampoFiltro, vcValorFiltro)
            Return JQGrid.DatosJSON(dtFinanc, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarFinanciamientoTipo(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim IdCliente = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            Dim TipoLinea As Integer = 2 'Familia - 14-02-2014 - wapumayta
            Dim tbFinancTipo As DataTable = Campana.ListarFinanciamientoTipo_x_IdCliente(IdCliente, TipoLinea)
            Return JQGrid.DatosJSON(tbFinancTipo, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function AgregarCampanaFinanciamiento(ByVal IdCamp As Integer,
                                                        ByVal IdFin As Integer,
                                                        ByVal EsDefault As Boolean,
                                                        ByVal Categoria As String) As Integer
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oFinanciamiento As New MOV_CAM_CampanaFinanciamiento()
            oFinanciamiento.IdCampana = IdCamp
            oFinanciamiento.IdTipoFinanciamiento = IdFin
            oFinanciamiento.EsDefault = EsDefault
            oFinanciamiento.Categoria = Categoria
            Dim resultado As Integer = Campana.InsertarCampanaFinanciamiento(oFinanciamiento)

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function EditarCampanaFinanciamiento(ByVal IdCamp As Integer,
                                                       ByVal IdFin As Integer,
                                                       ByVal EsDefault As Boolean,
                                                       ByVal Categoria As String) As Integer
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oFinanciamiento As New MOV_CAM_CampanaFinanciamiento()
            oFinanciamiento.IdCampana = IdCamp
            oFinanciamiento.IdTipoFinanciamiento = IdFin
            oFinanciamiento.EsDefault = EsDefault
            oFinanciamiento.Categoria = Categoria
            Dim resultado As Integer = Campana.ActulizarCampanaFinanciamiento(oFinanciamiento)
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EliminarFinanciamiento(ByVal IdCamp As Integer, ByVal IdFin As String) As List(Of String)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstResult As New List(Of String)
            Dim lstIdFinanc As List(Of String) = IdFin.Split(",").ToList()
            For i = 0 To lstIdFinanc.Count - 1
                Dim oFinanciamiento As New MOV_CAM_CampanaFinanciamiento()
                Dim resultado As Integer
                oFinanciamiento.IdCampana = IdCamp
                oFinanciamiento.IdTipoFinanciamiento = lstIdFinanc(i)
                resultado = Campana.EliminarCampanaFinanciamiento(oFinanciamiento)
                If resultado = 0 Then
                    lstResult.Add(i)
                End If
            Next

            Return lstResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function
End Class
