Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaOficina
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Dim Oficina As BL_GEN_EMP_Oficina = Nothing
      Try
         If Not IsPostBack Then
            Dim inCod As String = Request.QueryString("Cod")
            If Not IsNothing(inCod) Then
               Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oOficina As GEN_EMP_Oficina = Oficina.Mostrar(Convert.ToInt32(inCod))
               hdfCodOficina.Value = inCod
               txtCodigo.Text = oOficina.Codigo.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               txtPais.Text = oOficina.NombrePais.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               hdfPais.Value = oOficina.IdPais
               txtCiudad.Text = oOficina.NombreCiudad.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               hdfCiudad.Value = oOficina.IdCiudad
               txtProvincia.Text = oOficina.NombreProvincia.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               hdfProvincia.Value = oOficina.IdProvincia
               txtDistrito.Text = oOficina.NombreDistrito.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               hdfDistrito.Value = oOficina.IdDistrito
               txtDescripcion.Text = oOficina.Descripcion.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               txtDireccion.Text = oOficina.DireccionCompleta.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               txtReferencia.Text = oOficina.Referencia.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
               chkEstado.Checked = oOficina.Vigente
               txtCodigo.Enabled = False
               If chkEstado.Checked Then
                  trEstado.Style("display") = "none"
               End If
            Else
               hdfCodOficina.Value = ""
               trEstado.Style("display") = "none"
            End If
         End If

         UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Not IsNothing(Oficina) Then Oficina.Dispose()
      End Try
   End Sub


   <WebMethod()>
   Public Shared Function ListarCiudad(ByVal prCodPais As String, ByVal vcCriterio As String) As List(Of ENT_GEN_Ciudad)
      Dim Ciudad As BL_GEN_Ciudad = Nothing
      Try
         Dim codPais As String = prCodPais.Substring(prCodPais.IndexOf("(") + 1)
         codPais = codPais.Replace(")", "")
         Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Return Ciudad.ListarCiudadPorPaisCriterio(codPais, vcCriterio)

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Not IsNothing(Ciudad) Then Ciudad.Dispose()
      End Try
   End Function


   <WebMethod()>
   Public Shared Function ListarProvinciaPorCiudad(ByVal prCodCiudad As String, ByVal vcCriterio As String) As List(Of ENT_GEN_CFG_Provincia)
      Dim Provincia As BL_GEN_Ciudad = Nothing
      Try
         Dim codCiudad As String = prCodCiudad.Substring(prCodCiudad.IndexOf("(") + 1)
         codCiudad = codCiudad.Replace(")", "")
         Provincia = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Return Provincia.ListarProvinciaPorCiudad(1, codCiudad, vcCriterio)

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Not IsNothing(Provincia) Then Provincia.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarDistritoPorProvincia(ByVal prCodProvincia As String, ByVal vcCriterio As String) As List(Of ENT_GEN_CFG_Distrito)
      Dim Distrito As BL_GEN_Ciudad = Nothing
      Try
         Dim codProv As String = prCodProvincia.Substring(prCodProvincia.IndexOf("(") + 1)
         codProv = codProv.Replace(")", "")
         Distrito = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Return Distrito.ListarDistritoPorProvincia(2, codProv, vcCriterio)

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Not IsNothing(Distrito) Then Distrito.Dispose()
      End Try
   End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal IdOficina As String, ByVal Codigo As String, ByVal IdPais As String, ByVal IdCiudad As String, _
                                   ByVal IdProvincia As String, ByVal IdDistrito As String, ByVal Descripcion As String, ByVal Direccion As String, _
                                   ByVal Referencia As String, ByVal IdCliente As String, ByVal Estado As String) As Integer
        Dim BL_Oficina As BL_GEN_EMP_Oficina = Nothing
        Try
            Dim ObjOficina As GEN_EMP_Oficina = New GEN_EMP_Oficina()
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            BL_Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ObjOficina.IdOficina = IIf(IdOficina = "", 0, IdOficina)
            ObjOficina.Codigo = Codigo
            ObjOficina.IdCliente = IdCliente
            ObjOficina.IdPais = IdPais
            ObjOficina.IdCiudad = IdCiudad
            ObjOficina.IdProvincia = IdProvincia
            ObjOficina.IdDistrito = IdDistrito
            ObjOficina.Descripcion = Descripcion
            ObjOficina.DireccionCompleta = Direccion
            ObjOficina.Referencia = Referencia
            ObjOficina.Vigente = IIf(ObjOficina.IdOficina = 0, True, IIf(Estado = "1" OrElse Estado.ToLower = "true", True, False))

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Oficina"
            oAuditoria.Tabla = Constantes.TableNames.Oficinas

            Dim strAntes As String = ""
            Dim exito As Integer
            If IdOficina = "" Then
                exito = BL_Oficina.Insertar(ObjOficina)
                If exito = "1" Then
                    oAuditoria.Insertar(New String() {ObjOficina.Codigo})
                End If
            Else
                strAntes = oAuditoria.AntesActualizar(New String() {ObjOficina.Codigo})
                exito = BL_Oficina.Actualizar(ObjOficina)
                If exito = "1" Then
                    oAuditoria.DespuesActualizar(New String() {ObjOficina.Codigo}, strAntes)
                End If
            End If
            Return exito
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(BL_Oficina) Then BL_Oficina.Dispose()
        End Try
    End Function
End Class
