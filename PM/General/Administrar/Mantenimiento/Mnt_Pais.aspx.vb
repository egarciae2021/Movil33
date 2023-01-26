Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_Pais
   Inherits System.Web.UI.Page

   <WebMethod()>
   Public Shared Function Guardar(ByVal oPais As String, ByVal vcCodPai As String) As Integer
      Dim Pais As BL_GEN_Pais = Nothing
      Dim _return As Integer = 0
      Try
         Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oPais As ENT_GEN_Pais = oSerializer.Deserialize(Of ENT_GEN_Pais)(oPais)
         If vcCodPai = "" Then
            _return = Pais.Insertar(v_oPais)
         Else
            Pais.Actualizar(v_oPais)
            _return = 0
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
      Return _return
   End Function

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Dim Pais As BL_GEN_Pais = Nothing
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               'Dim Operador As BL_GEN_Operador = new BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               Dim vcCodPai As String = Request.QueryString("Cod")

               'hdfCompania.Value = vcCodCue
               Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               If vcCodPai <> "" Then
                  Dim oSerializer As New JavaScriptSerializer
                  'Dim Script As String
                  Dim oPais As ENT_GEN_Pais = Pais.Mostrar(vcCodPai)
                  If oPais.P_vcCodPai = vcCodPai Then
                     txtCodigo.Enabled = False
                     txtCodigo.Text = oPais.P_vcCodPai.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     txtNombre.Text = oPais.vcNomPai.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     chkEstado.Checked = oPais.P_btEST
                     If chkEstado.Checked Then
                        trEstado.Style("display") = "none"
                     End If
                     hdfPais.Value = vcCodPai
                  Else
                     'trEstado.Style("display") = "none"
                     hdfPais.Value = "-1"
                  End If
                  txtNombre.Focus()
               Else
                  txtCodigo.Focus()
                  hdfPais.Value = ""
                  trEstado.Style("display") = "none"
               End If
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
End Class
