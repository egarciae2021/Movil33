Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Personalizar_Esquema_Mantenimiento_Mnt_Producto
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then

               UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

               Dim P_inCod As String = Request.QueryString("Cod")
               hdfCodigo.Value = P_inCod

               'Dim Entidad As BL_ENT_Entidad = BL_ENT_Entidad.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               If Not IsNothing(P_inCod) Then

                  'Dim objAnexoHabitacion As ENT_HOT_AnexoHabitacion = BL_PCS_HOT_Anexo.Instance(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente).ObtenerAnexoHabitacion(P_inCod)

                  Dim objProductoBL As BL_PRO_Producto = New BL_PRO_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                  Dim objProducto As ENT_PRO_Producto = objProductoBL.Mostrar(P_inCod)
                  objProductoBL.Dispose()

                  txtNombre.Text = objProducto.vcNom
                  txtUrl.Text = objProducto.vcURL
                  txtOrden.Text = objProducto.inOrd
                  chkEstado.Checked = IIf(objProducto.inEst = 0, False, True)
                  If chkEstado.Checked Then
                     trEstado.Style("display") = "none"
                  End If
                  'UtilitarioWeb.Dataddl(ddlTabla, Entidad.Listar(objAnexoHabitacion.NombreEmpleado & " - " & objAnexoHabitacion.Anexo, objAnexoHabitacion.Anexo), "Anexo", "Habitacion")
                  'ddlAnexo.SelectedValue = objAnexoHabitacion.Anexo

               Else
                  'UtilitarioWeb.Dataddl(ddlAnexo, AnexoHotel.Listar("", ""), "Anexo", "Habitacion")
                  'UtilitarioWeb.Dataddl(ddlTabla, Entidad.Listar(1), "vcTab", "vcTab")
                  hdfCodigo.Value = ""
                  txtOrden.Text = "1"
                  chkEstado.Checked = True
                  trEstado.Style("display") = "none"
               End If

            End If
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function Guardar(ByVal oProducto As String) As String
      Try
         Dim objBL As BL_PRO_Producto = New BL_PRO_Producto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim oSerializer As New JavaScriptSerializer
         Dim v_oProducto As ENT_PRO_Producto = oSerializer.Deserialize(Of ENT_PRO_Producto)(oProducto)

         v_oProducto.vcNom = v_oProducto.vcNom.Replace("&#39", "'")
         v_oProducto.vcURL = v_oProducto.vcURL.Replace("\", "/")

         Dim _Return As Integer = objBL.Grabar(v_oProducto)
         objBL.Dispose()

         Return _Return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function


   '<WebMethod()> _
   'Public Shared Function ListarAnexosLibres(ByVal idCliente As String) As List(Of ENT_HOT_AnexoHabitacion)
   '    Dim objBL As BL_PCS_HOT_Anexo = Nothing
   '    Try
   '        objBL = New BL_PCS_HOT_Anexo(idCliente)
   '        Return objBL.Listar("", "")
   '    Catch ex As Exception
   '    Finally
   '        If objBL IsNot Nothing Then objBL.Dispose()
   '    End Try

   'End Function

End Class