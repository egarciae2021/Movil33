Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Numeros_Mnt_Empresa
   Inherits System.Web.UI.Page


   Protected Sub General_Administrar_Mantenimiento_Numeros_Mnt_Empresa_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

         If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               hdfEmpleado.Value = oUsuario.F_vcCodEmp
               hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
               hdfAdmin.Value = "0"
               'hdfCod.Value = "-1"
               If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

               Dim codigo As String = Request.QueryString("Cod")

               If Not IsNothing(codigo) Then
                  hdfCod.Value = codigo
                  Dim empresa As BL_GEN_Empresa = New BL_GEN_Empresa(oUsuario.IdCliente)
                  Dim oEmpresa As List(Of ENT_GEN_Empresa) = empresa.obtenerEmpresa_x_Codigo(codigo)
                  empresa.Dispose()
                  Me.txtCodigo.Text = oEmpresa(0).P_vcCodEmp.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                  Me.txtCodigo.Enabled = False
                  Me.txtRazonSocial.Text = oEmpresa(0).vcRazSoc.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                  Me.chkEstado.Checked = oEmpresa(0).EMPR_btEST
                  If chkEstado.Checked Then
                     trEstado.Style("display") = "none"
                  Else
                     chkEstado.Enabled = True
                  End If
                  txtRazonSocial.Focus()
               Else
                  trEstado.Style("display") = "none"
                  txtCodigo.Focus()
               End If


            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function Guardar(ByVal oEmpresa As String, ByVal vcCodEmp As String) As Integer
      Try
         'Dim oEmpresa As New ENT_GEN_Empresa
         Dim Empresa As BL_GEN_Empresa = New BL_GEN_Empresa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oEmpresa As ENT_GEN_Empresa = oSerializer.Deserialize(Of ENT_GEN_Empresa)(oEmpresa)

         'oEmpresa.P_vcCodEmp = Codigo
         'oEmpresa.vcRazSoc = RazonSocial
         Dim _return As Integer
         If vcCodEmp = "" Then
            _return = Empresa.Insertar(v_oEmpresa)
         Else
            Empresa.Actualizar(v_oEmpresa)
            _return = 0
         End If
         Empresa.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try

   End Function
End Class
