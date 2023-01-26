Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_Prefijo
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then

               Dim vcCodPrefijo As String = Request.QueryString("Cod")
               Dim Prefijo As BL_GEN_Prefijo = New BL_GEN_Prefijo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


               If vcCodPrefijo <> "" Then
                  Dim oSerializer As New JavaScriptSerializer
                  'Dim Script As String
                  Dim oPrefijo As ENT_GEN_Prefijo = Prefijo.Mostrar(vcCodPrefijo)
                  If oPrefijo.Id = vcCodPrefijo Then
                     txtPais.Text = oPrefijo.Pais.vcNomPai
                     hdfPais.Value = oPrefijo.Pais.P_vcCodPai
                     txtOrigen.Text = oPrefijo.Origen.vcNomOri
                     hdfOrigen.Value = oPrefijo.Origen.P_inCodOri
                     txtOperador.Text = oPrefijo.Compania.COMP_vcNOMCIA
                     hdfCompania.Value = oPrefijo.Compania.p_inCodOpe
                     txtServicio.Text = oPrefijo.Servicio.vcNom
                     hdfServicio.Value = oPrefijo.Servicio.P_inCod
                     txtPrefijo.Text = oPrefijo.P_vcCodPre
                     chkExtraer.Checked = IIf(oPrefijo.btExtPre = True, True, False)
                     'trLongitudExtraer.Visible = IIf(oPrefijo.btExtPre = True, True, False)
                     txtLongitud.Text = oPrefijo.inLonExt
                     chkLongitud.Checked = IIf(oPrefijo.btLonExa = True, True, False)
                     hdfPrefijo.Value = vcCodPrefijo
                     txtPais.Enabled = False
                     txtOrigen.Enabled = False
                     txtOperador.Enabled = False
                     txtPrefijo.Enabled = False
                     txtServicio.Focus()
                  Else
                     hdfPrefijo.Value = "-1"
                  End If
               Else
                  txtOrigen.Focus()
                  hdfPrefijo.Value = ""

               End If
               Prefijo.Dispose()
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
   Public Shared Function ListarCompaniaPorCodigoNombre_y_Pais(ByVal vcCriterio As String, ByVal inCodPai As String) As List(Of ENT_ORG_Compania)
      Try
         Dim Compania As BL_ORG_Compania = New BL_ORG_Compania(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_ORG_Compania)
         If inCodPai <> "" Then
            _return = Compania.ListarCompaniaPorCodigoNombre_y_Pais(vcCriterio, Integer.Parse(inCodPai))
         Else
            _return = New List(Of ENT_ORG_Compania)
         End If

         Compania.Dispose()

         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarOrigenPorPais_y_Criterio(ByVal inCodPai As String, ByVal vcCriterio As String) As List(Of ENT_GEN_Origen)
      Try
         Dim Origen As BL_GEN_Origen = New BL_GEN_Origen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_GEN_Origen)

         If inCodPai <> "" Then
            _return = Origen.ListarPorPais_y_Criterio(Integer.Parse(inCodPai), vcCriterio)
         Else
            _return = New List(Of ENT_GEN_Origen)
         End If

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
   Public Shared Function Guardar(ByVal oPrefijo As String, ByVal vcCodPre As String) As Integer
      Try

         Dim Prefijo As BL_GEN_Prefijo = New BL_GEN_Prefijo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oPrefijo As ENT_GEN_Prefijo = oSerializer.Deserialize(Of ENT_GEN_Prefijo)(oPrefijo)

         Dim _return As Integer
         If vcCodPre = "" Then
            _return = Prefijo.Insertar(v_oPrefijo)
         Else
            Prefijo.Actualizar(v_oPrefijo)
            _return = 0
         End If

         Prefijo.Dispose()

         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ObtenerPaisInstalacion() As ENT_GEN_Pais
      Dim Pais As BL_GEN_Pais = Nothing
      Dim PaisInstalacion As ENT_GEN_Pais = Nothing
      Try
         Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         PaisInstalacion = Pais.MostrarPaisInstalacion()
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Pais IsNot Nothing Then
            Pais.Dispose()
         End If
      End Try
      Return PaisInstalacion
    End Function

    <WebMethod()>
    Public Shared Function ObtenerOperadorInstalacion() As ENT_GEN_Operador
        Dim Operador As BL_GEN_Operador = Nothing
        Dim OperadorInstalacion As ENT_GEN_Operador = Nothing
        Try
            Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            OperadorInstalacion = Operador.MostrarOperadorInstalacion()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
        End Try
        Return OperadorInstalacion
    End Function

End Class
