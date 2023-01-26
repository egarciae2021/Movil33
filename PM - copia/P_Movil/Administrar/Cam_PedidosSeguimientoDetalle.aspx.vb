Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports Utilitario
Imports System.Web.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Cam_PedidosSeguimientoDetalle
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               hdfIdDetallePedido.Value = Request.QueryString("IdPed")
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
   Public Shared Function Mostrar(ByVal inIdPedido As String) As List(Of Object)
      Dim PedidoSeguimiento As BL_MOV_CAM_CampanaPedidoDetalleSeguimiento = Nothing

      Try
         PedidoSeguimiento = New BL_MOV_CAM_CampanaPedidoDetalleSeguimiento(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

         Dim dtDetalles As DataTable = PedidoSeguimiento.Mostrar(inIdPedido, oCultura.vcFecCor, oCultura.vcHorCor)
         Dim lstObj As New List(Of Object)

         For i As Integer = 0 To dtDetalles.Rows.Count - 1

            Dim dict As New Dictionary(Of String, Object)
            dict.Add("IdDetallePedido", dtDetalles.Rows(i)("IdDetallePedido").ToString())
            dict.Add("IdUsuario", dtDetalles.Rows(i)("IdUsuario").ToString())
            dict.Add("vcNomUsu", dtDetalles.Rows(i)("vcNomUsu").ToString())
            dict.Add("IdEstado", dtDetalles.Rows(i)("IdEstado").ToString())
            dict.Add("vcNomEst", dtDetalles.Rows(i)("vcNomEst").ToString())
            dict.Add("FechaInicio", dtDetalles.Rows(i)("FechaInicio").ToString())
            dict.Add("FechaFin", dtDetalles.Rows(i)("FechaFin").ToString())
            dict.Add("Comentario", dtDetalles.Rows(i)("Comentario").ToString())
            lstObj.Add(dict)
         Next

         Return lstObj

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If PedidoSeguimiento IsNot Nothing Then
            PedidoSeguimiento.Dispose()
         End If
      End Try
   End Function
End Class