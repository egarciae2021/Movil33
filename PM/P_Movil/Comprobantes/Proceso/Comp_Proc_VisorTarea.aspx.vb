Imports System.Web.Services
Imports VisualSoft.PCSistel.Comprobantes.BE
Imports VisualSoft.Suite80.BE
Imports VisualSoft.PCSistel.Comprobantes.BL
Imports VisualSoft.Comun.Utilitarios

Public Class Comp_Proc_VisorTarea
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim EstadoCola As BL_MOV_FAC_EstadoCola = Nothing
        Dim TipoConfiguracion As BL_MOV_FAC_C_TipoConfiguracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    EstadoCola = New BL_MOV_FAC_EstadoCola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlEstado, EstadoCola.Listar("0", "Pendientes y en proceso"), "NombreEstado", "IdEstado")
                    TipoConfiguracion = New BL_MOV_FAC_C_TipoConfiguracion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlTarea, TipoConfiguracion.ListarTipoTarea("-1", "<Todos>"), "Nombre", "IdTipoConfiguracion")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function MostrarTareas(ByVal inEst As String, ByVal inTar As String) As List(Of ENT_MOV_FAC_Comprobante_Cola)

        Dim Cola As BL_MOV_FAC_Comprobante_Cola = Nothing
        Try
            Dim IdCliente As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            Cola = New BL_MOV_FAC_Comprobante_Cola(IdCliente)

            Return Cola.Listar_VisorCola(inEst, inTar)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cola IsNot Nothing Then Cola.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetalleTarea(ByVal inPagTam As String, ByVal inPagAct As String, vcOrdCol As String, vcTipOrdCol As String, ByVal idCola As String) As Object
        Dim LogCola As BL_MOV_FAC_ComprobanteColaLog = Nothing
        Try

            LogCola = New BL_MOV_FAC_ComprobanteColaLog(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = LogCola.ListarColaLog(Convert.ToInt64(idCola))
            If vcOrdCol <> "" Then
                Dim dvData As New DataView(dt)
                dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                dt = dvData.ToTable
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
            If LogCola IsNot Nothing Then LogCola.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ReProcesarError(ByVal idCola As String) As String
        Dim ComprobanteCola As BL_MOV_FAC_Comprobante_Cola = Nothing

        Try
            ComprobanteCola = New BL_MOV_FAC_Comprobante_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ComprobanteCola.ReProcesarError(Convert.ToInt64(idCola), 1)
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ComprobanteCola IsNot Nothing Then
                ComprobanteCola.Dispose()
            End If
        End Try
    End Function

End Class