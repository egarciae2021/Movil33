Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_OficinaSeleccion
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Dim Pais As BL_GEN_Pais = Nothing
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               UtilitarioWeb.Dataddl(ddlPais, Pais.Listar(-1, "<Todos>"), "vcNomPai", "P_vcCodPai")
               ddlDepartamento.Items.Add(New ListItem("<Seleccione un País>", "-1"))
               ddlProvincia.Items.Add(New ListItem("<Seleccione un Departamento>", "-1"))
               ddlDistrito.Items.Add(New ListItem("<Seleccione una Provincia>", "-1"))
               ddlDepartamento.Enabled = False
               ddlProvincia.Enabled = False
               ddlDistrito.Enabled = False
               hdfCampana.Value = Request.QueryString("idcam")
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Pais IsNot Nothing Then
            Pais.Dispose()
         End If
      End Try
   End Sub

   <WebMethod()> _
   Public Shared Function ListaOficinaPorCampana(ByVal IdCampana As Integer, ByVal Oficina As String, ByVal IdPais As String, ByVal IdDepartamento As String, _
                                                  ByVal IdProvincia As Integer, ByVal IdDistrito As Integer, ByVal Direccion As String) As List(Of GEN_EMP_Oficina)
      Dim blOficina As BL_GEN_EMP_Oficina = Nothing
      Try
         blOficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Return blOficina.ListaPorCampana(IdCampana, Oficina, IdPais, IdDepartamento, IdProvincia, IdDistrito, Direccion)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If blOficina IsNot Nothing Then
            blOficina.Dispose()
         End If
      End Try
   End Function
End Class
