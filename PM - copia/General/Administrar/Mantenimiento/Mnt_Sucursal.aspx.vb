Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria

Partial Class General_Administrar_Mantenimiento_Mnt_Sucursal
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

      Dim Sucursal As BL_GEN_Sucursal = Nothing
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then

               Dim vcCodSuc As String = Request.QueryString("Cod")
               Sucursal = New BL_GEN_Sucursal(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               If vcCodSuc <> "" Then
                  Dim oSerializer As New JavaScriptSerializer
                  'Dim Script As String
                  Dim oSucursal As ENT_GEN_Sucursal = Sucursal.Mostrar(vcCodSuc)
                  If oSucursal.P_vcCod = vcCodSuc Then
                     txtCodigo.Enabled = False
                     txtCodigo.Text = oSucursal.P_vcCod.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     txtNombre.Text = oSucursal.vcNom.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     txtOperador.Text = oSucursal.Compania.COMP_vcNOMCIA.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     hdfCompania.Value = oSucursal.Compania.COMP_P_vcCODCIA
                     txtPais.Text = oSucursal.Pais.vcNomPai.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     hdfPais.Value = oSucursal.Pais.P_vcCodPai
                     txtCiudad.Text = oSucursal.Ciudad.vcNomCiu.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                     hdfCiudad.Value = oSucursal.Ciudad.P_vcCodCiu
                     hdfSucursal.Value = vcCodSuc
                     chkEstado.Checked = oSucursal.btEST
                     If chkEstado.Checked Then
                        trEstado.Style("display") = "none"
                     Else
                        chkEstado.Enabled = True
                     End If
                     txtNombre.Focus()
                  Else
                     hdfSucursal.Value = "-1"
                  End If
               Else
                  hdfSucursal.Value = ""
                  trEstado.Style("display") = "none"
                  txtCodigo.Focus()
               End If
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Sucursal IsNot Nothing Then Sucursal.Dispose()
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function ListarCiudadPorPaisCriterio(ByVal vcCodPai As String, ByVal vcCriterio As String) As List(Of ENT_GEN_Ciudad)
      Dim Ciudad As BL_GEN_Ciudad = Nothing
      Try
         Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Return Ciudad.ListarCiudadPorPaisCriterio(vcCodPai, vcCriterio)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Ciudad IsNot Nothing Then Ciudad.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarCompaniaPorCodigoNombre(ByVal vcCriterio As String) As List(Of ENT_ORG_Compania)
      Try
         Dim Compania As BL_ORG_Compania = New BL_ORG_Compania(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_ORG_Compania) = Compania.ListarCompaniaPorCodigoNombre(vcCriterio)
         Compania.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarOperador() As List(Of ENT_GEN_Operador)
        Try
            Dim operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Operador) = operador.Listar()
            operador.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal oSucursal As String, ByVal vcCodSuc As String) As Integer
        Dim Sucursal As BL_GEN_Sucursal = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Sucursal = New BL_GEN_Sucursal(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oSucursal As ENT_GEN_Sucursal = oSerializer.Deserialize(Of ENT_GEN_Sucursal)(oSucursal)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "General"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Sucursal"
            oAuditoria.Tabla = Constantes.TableNames.Sucursales

            Dim intResult As Integer = 0

            Dim strAntes As String = ""
            If vcCodSuc = "" Then
                intResult = Sucursal.Insertar(v_oSucursal)


                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)


                ''oAuditoria.Insertar(New String() {v_oSucursal.P_vcCod})
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {v_oSucursal.P_vcCod})
                intResult = Sucursal.Actualizar(v_oSucursal)

                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla & ". Antes: " & strAntes)


                ''oAuditoria.DespuesActualizar(New String() {v_oSucursal.P_vcCod}, strAntes)

            End If
            Return intResult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Sucursal IsNot Nothing Then Sucursal.Dispose()
        End Try
    End Function

End Class
