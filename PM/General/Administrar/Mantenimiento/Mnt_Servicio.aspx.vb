Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_Servicio
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then

                    Dim vcCodSer As String = Request.QueryString("Cod")

                    Dim x As New Label
                    x.Text = vcCodSer


               If vcCodSer IsNot Nothing Then
                  vcCodSer = vcCodSer.Replace(",", "").Replace(".", "")
                  If IsNumeric(vcCodSer) Then
                     vcCodSer = Int(Val(vcCodSer))
                  End If
               End If

               Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               'Dim FormaPago As BL_MOV_Pago_Forma = BL_MOV_Pago_Forma.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               'UtilitarioWeb.Dataddl(ddlFormaPago, FormaPago.Listar_combo, "vcNomFormPag", "P_inCodFormPag")
               UtilitarioWeb.Dataddl(ddlGlobal, Servicio.ListarGlobal, "vcNom", "P_vcCod")

               'chActivo.Visible = True

               If vcCodSer <> "" Then
                  Dim oSerializer As New JavaScriptSerializer
                  'Dim Script As String
                  Dim oServicio As ENT_GEN_Servicio = Servicio.Mostrar(vcCodSer)
                  If oServicio.P_inCod = vcCodSer Then
                     'txtCodigo.Enabled = False
                     txtCodigo.Text = oServicio.vcCodSer.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     txtNombre.Text = oServicio.vcNom.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     txtTipoServicio.Text = oServicio.TipoServicio.vcNom.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     hdfTipoServicio.Value = oServicio.TipoServicio.P_inCod
                     hdfServicio.Value = vcCodSer
                     For Each item As ListItem In ddlGlobal.Items
                        If (item.Text = oServicio.vcGlo) Then
                           ddlGlobal.SelectedValue = item.Value
                        End If
                     Next
                  Else
                     hdfServicio.Value = "-1"
                  End If
                  txtCodigo.Enabled = False

                  If oServicio.btEst Then
                     chActivo.Checked = True
                     trEstado.Style("display") = "none"
                  Else
                     chActivo.Checked = False
                     trEstado.Style("display") = ""
                  End If
                        If oServicio.btAgrConfPlaSal Then chkAgrConfPlaSal.Checked = True

                        txtNombre.Focus()
                    Else
                        hdfServicio.Value = ""
                        txtCodigo.Focus()
                    End If

                    Servicio.Dispose()

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
    Public Shared Function ListarTipoServicioPorCodigoNombre(ByVal vcCriterio As String) As List(Of ENT_GEN_TipoServicio)

        Try
            Dim TipoServicio As BL_GEN_TipoServicio = New BL_GEN_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_TipoServicio) = TipoServicio.ListarTipoServicioPorCodigoNombre(vcCriterio)
            TipoServicio.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

   <WebMethod()>
   Public Shared Function Guardar(ByVal oServicio As String, ByVal vcCodSer As Integer) As Integer
      Try
         Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oServicio As ENT_GEN_Servicio = oSerializer.Deserialize(Of ENT_GEN_Servicio)(oServicio)

         Dim _return As Integer
         If vcCodSer = 0 Then
            _return = Servicio.Insertar(v_oServicio)
         Else
            _return = Servicio.Actualizar(v_oServicio)
         End If
         Servicio.Dispose()
         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

End Class
