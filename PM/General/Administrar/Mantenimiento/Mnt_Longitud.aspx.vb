Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_Longitud
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then

               Dim vcCodLongitud As String = Request.QueryString("Cod")
               Dim Longitud As BL_GEN_Longitud = New BL_GEN_Longitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               If vcCodLongitud <> "" Then
                  Dim oSerializer As New JavaScriptSerializer
                  Dim Script As String = ""
                  Dim oLongitud As ENT_GEN_Longitud = Longitud.Mostrar(vcCodLongitud)
                  If oLongitud.Id = vcCodLongitud Then
                     txtOrigen.Text = oLongitud.Origen.vcNomOri
                     hdfOrigen.Value = oLongitud.Origen.P_inCodOri
                     txtServicio.Text = oLongitud.Servicio.vcNom
                     hdfServicio.Value = oLongitud.Servicio.P_inCod
                     txtMayor.Text = oLongitud.inMay
                     txtMenor.Text = oLongitud.inMen
                     hdfLongitud.Value = vcCodLongitud
                  Else
                     hdfLongitud.Value = "-1"
                  End If
                  txtOrigen.Enabled = False
                  txtServicio.Enabled = False
                  txtMayor.Focus()
               Else
                  hdfLongitud.Value = ""
                  txtOrigen.Focus()
               End If
               Longitud.Dispose()
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
   Public Shared Function ListarOrigenPorPais_y_Criterio(ByVal vcCriterio As String) As List(Of ENT_GEN_Origen)
      Try
         Dim Origen As BL_GEN_Origen = New BL_GEN_Origen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim Regi As BL_GEN_Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_GEN_Origen) = Origen.ListarPorPais_y_Criterio(Integer.Parse(Regi.Listar.REGI_F_vcCODPAI), vcCriterio)
         Origen.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarServicio_x_Criterio(ByVal vcCriterio As String) As List(Of ENT_GEN_Servicio)
      Try
         Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarServicio_x_Criterio(vcCriterio)
         Servicio.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function Guardar(ByVal oLongitud As String, ByVal vcCodLon As String) As Integer
      Try
         Dim Longitud As BL_GEN_Longitud = New BL_GEN_Longitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oLongitud As ENT_GEN_Longitud = oSerializer.Deserialize(Of ENT_GEN_Longitud)(oLongitud)
         Dim _return As Integer
         If vcCodLon = "" Then
            _return = Longitud.Insertar(v_oLongitud)
         Else
            _return = Longitud.Actualizar(v_oLongitud)
         End If
         Longitud.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

End Class
