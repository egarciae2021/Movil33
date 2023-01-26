Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_SeleccionarOficina
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
            End If
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()> _
   Public Shared Function Listar() As List(Of GEN_EMP_Oficina)
      Dim Oficina As BL_GEN_EMP_Oficina = Nothing
      Try
         Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Return Oficina.Listar()
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Oficina IsNot Nothing Then Oficina.Dispose()
      End Try
   End Function

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
         If Ciudad IsNot Nothing Then Ciudad.Dispose()
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
         If Provincia IsNot Nothing Then Provincia.Dispose()
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
         If Distrito IsNot Nothing Then Distrito.Dispose()
      End Try
   End Function

   '<WebMethod()> _
   'Public Shared Function BuscarOficinaXEmpleado(codigo As String, CodPais As String, CodCiudad As String, CodProv As String, CodDist As String, Descripcion As String, Direccion As String) As List(Of GEN_EMP_Oficina)
   '    Try
   '        Dim Oficina As BL_GEN_EMP_Oficina = BL_GEN_EMP_Oficina.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
   '
   '        Return Oficina.BuscarOficina(codigo, CodPais, CodCiudad, CodProv, CodDist, Descripcion, Direccion)
   '    Catch ex As Exception
   '        Dim util As New Utilitarios
   '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
   '        Throw New Exception(UtilitarioWeb.MensajeError)
   '    End Try
   'End Function


   <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function BuscarOficinaXEmpleado(ByVal codigo As String, ByVal CodPais As String, ByVal CodCiudad As String, ByVal CodProv As String, ByVal CodDist As String, _
                                                  ByVal Descripcion As String, ByVal Direccion As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
      Dim Oficina As BL_GEN_EMP_Oficina = Nothing
      Try
         Oficina = New BL_GEN_EMP_Oficina(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim dt As DataTable = Oficina.BuscarOficinaTable(codigo, CodPais, CodCiudad, CodProv, CodDist, Descripcion, Direccion)
         Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Oficina IsNot Nothing Then
            Oficina.Dispose()
         End If
      End Try
   End Function
End Class
