Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Numeros_Mnt_Subtipo
   Inherits System.Web.UI.Page

   Protected Sub General_Administrar_Mantenimiento_Numeros_Mnt_Subtipo_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
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
               hdfCod.Value = "-1"
               If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

               Dim codigo As String = Request.QueryString("Cod")

               Dim GrupBaseDest As BL_GEN_GrupBaseDest = New BL_GEN_GrupBaseDest(oUsuario.IdCliente)
               Dim oGrupBaseDest As List(Of VisualSoft.PCSistelMovil.General.BE.M_GRUP_BASE_DEST) = GrupBaseDest.Listar()
               GrupBaseDest.Dispose()
               ddlTipo.DataTextField = "GRBD_vcNOMGRU"
               ddlTipo.DataValueField = "GRBD_P_tiCODGRU"
               ddlTipo.DataSource = oGrupBaseDest
               ddlTipo.DataBind()
               ddlTipo.Items.Insert(0, New ListItem("--Seleccione--", -1))

                    If Not IsNothing(codigo) Then
                        hdfCod.Value = codigo
                        Dim GrupDest As BL_GEN_GrupDest = New BL_GEN_GrupDest(oUsuario.IdCliente)
                  Dim oGrupDest As VisualSoft.PCSistelMovil.General.BE.M_GRUP_DEST = GrupDest.obtener_M_GRUP_DEST_x_id(Integer.Parse(codigo))
                        GrupDest.Dispose()
                        ddlTipo.SelectedValue = oGrupDest.GRDE_F_tiCODGRU
                        txtCodigo.Text = oGrupDest.GRDE_P_tiCODGRU.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        txtNombre.Text = oGrupDest.GRDE_vcNOMGRU.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                        chkEstado.Checked = oGrupDest.GRDE_btEST
                        ddlTipo.Enabled = False
                        txtCodigo.Enabled = False
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        Else
                            chkEstado.Enabled = True
                        End If
                        txtNombre.Focus()
                    Else
                        trEstado.Style("display") = "none"
                        'txtCodigo.Focus()
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
   Public Shared Function Guardar(ByVal CodigoTipo As String, ByVal CodigoSubTipo As String, ByVal Nombre As String, ByVal esInsertar As Boolean) As String
      Dim oGrupDest As New VisualSoft.PCSistelMovil.General.BE.M_GRUP_DEST
      Dim GrupDest As BL_GEN_GrupDest = New BL_GEN_GrupDest(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
      oGrupDest.GRDE_F_tiCODGRU = CodigoTipo
      oGrupDest.GRDE_P_tiCODGRU = CodigoSubTipo
      oGrupDest.GRDE_vcNOMGRU = Nombre
      Dim resul As Boolean
      Try

         If esInsertar Then
            resul = GrupDest.Insertar(oGrupDest)
         Else
            resul = GrupDest.Actualizar(oGrupDest)
         End If
         GrupDest.Dispose()

         If resul Then
            Return ""
         Else
            Return "Error al guardar"
         End If

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try

   End Function
End Class
