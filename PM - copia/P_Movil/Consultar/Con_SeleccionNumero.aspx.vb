Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Consultar_Con_SeleccionNumero
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Dim Pais As BL_GEN_Pais = Nothing
      Dim Empresa As BL_GEN_Empresa = Nothing
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Empresa = New BL_GEN_Empresa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               UtilitarioWeb.Dataddl(ddlPais, Pais.Listar("-1", "<Seleccionar>"), "vcNomPai", "P_vcCodPai")
               UtilitarioWeb.Dataddl(ddlEmpresa, Empresa.Listar("-1", "<Seleccionar>"), "vcRazSoc", "P_vcCodEmp")

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Empresa IsNot Nothing Then Empresa.Dispose()
         If Pais IsNot Nothing Then Pais.Dispose()
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function ListarCiudadPorPais(ByVal vcCodPai As String) As List(Of ENT_GEN_Ciudad)
      Dim Ciudad As BL_GEN_Ciudad = Nothing
      Try
         Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Return Ciudad.ListarPorPais(vcCodPai, "", "")
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Ciudad IsNot Nothing Then Ciudad.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarNumeroPorEmpresa(ByVal vcCodEmp As String) As List(Of ENT_MOV_Linea)
      Try
         Dim Empresa As BL_GEN_Empresa = New BL_GEN_Empresa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_MOV_Linea) = Empresa.ListarNumero(vcCodEmp)
         Empresa.Dispose()
         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function
End Class