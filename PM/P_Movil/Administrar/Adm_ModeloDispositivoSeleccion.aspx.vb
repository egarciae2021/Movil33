Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services

Partial Class P_Movil_Administrar_Adm_ModeloDispositivoSeleccion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim TipoServicio As BL_MOV_TipoServicio = Nothing
        Try
            If Not IsPostBack Then
                TipoServicio = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                UtilitarioWeb.Dataddl(ddlTipoServicio, TipoServicio.Listar(-1, "<Todos>"), "vcNom", "P_inCodTipSer")
                hdfCampana.Value = Request.QueryString("idcam")
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(TipoServicio) Then TipoServicio.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ListaModeloDispositoPorCampana(ByVal IdCampana As Integer, ByVal Nombre As String, ByVal IdTipoServicio As Integer) As List(Of ENT_MOV_ModeloDispositivo)
        Try
            Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = new BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim _return As List(Of ENT_MOV_ModeloDispositivo) = ModeloDispositivo.ListarPorCampana(IdCampana, Nombre, IdTipoServicio)
         ModeloDispositivo.Dispose()

         Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class
