Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization

Partial Class P_Movil_Administrar_Adm_DistribucionMinutosOrganizacion
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               hdfClaseDistribucion.Value = Request.QueryString("clase")
               Dim Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

               Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("DB1")
               Parametros.Dispose()

               hdfValorIlimitado.Value = lstParametros(0).Valor
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()> _
   Public Shared Function ListarColModelOrganizacion(ByVal vcCodCue As String, ByVal vcValIli As String) As List(Of Object)
      Try
         Dim Organizacion As BL_GEN_Organizacion = new BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim dict As New Dictionary(Of String, Object)

         Dim dt As DataTable = Organizacion.ListarDistribucionServiciosColumnas(vcCodCue.Replace("&#39", "''"))
         Organizacion.Dispose()
         Dim contCol As Integer = 1
         Dim colmodel As New List(Of Object)
         colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(0), dt.Rows(1).Item(0), True, True, 60, False, True, ""))
         colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(1), dt.Rows(1).Item(1), False, True, 90, False, True, ""))
         colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(2), dt.Rows(1).Item(2), False, True, 200, False, True, ""))
         colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(3), dt.Rows(1).Item(3), True, True, 115, False, False, ""))
         colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(4), dt.Rows(1).Item(4), False, True, 120, False, False, ""))
         colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(5), dt.Rows(1).Item(5), True, True, 90, False, False, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(6), dt.Rows(1).Item(6), False, True, 200, False, False, ""))
         colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(7), dt.Rows(1).Item(7), True, True, 90, False, False, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(8), dt.Rows(1).Item(8), False, True, 55, False, False, "Integer"))

         UtilitarioWeb.ConfigurarColumnasServicios(9, 5, dt, vcValIli, colmodel)

         Return colmodel
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function ListarOrganizacion(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcValIli As String, ByVal vcCodCue As String, ByVal inTipBus As String, ByVal vcBus As String) As Object
      Try
         Dim Organizacion As BL_GEN_Organizacion = new BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim dict As New Dictionary(Of String, Object)

         Dim dt As DataTable = Organizacion.ListarDistribucionServicios(vcValIli, vcCodCue.Replace("&#39", "''"), Convert.ToUInt32(inTipBus), vcBus)
         Organizacion.Dispose()
         AlmacenaParametros(vcValIli, vcCodCue, inTipBus, vcBus)

         Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()> _
   Public Shared Function GuardarServicios(ByVal vcCodCue As String, ByVal registro As String, ByVal vcValIli As String, ByVal ClaseDistribucion As String) As Dictionary(Of String, Object)
      Try
         Dim serial As New JavaScriptSerializer
         Dim oRegistros As Dictionary(Of String, Object) = serial.Deserialize(Of Dictionary(Of String, Object))(registro)
         Dim Organizacion As BL_GEN_Organizacion = new BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim _return As Dictionary(Of String, Object) = Organizacion.GuardarServicios(vcCodCue, oRegistros, ClaseDistribucion, vcValIli)
         Organizacion.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   Public Shared Sub AlmacenaParametros(ByVal vcValIli As String, ByVal vcCodCue As String, ByVal inTipBus As String, ByVal vcBus As String)
      Try
         Dim dict As New Dictionary(Of String, Object)

         'PARA EL CASO DE OTRAS DISTRIBUCIONES SE EXPORTARA EL TOTAL DE LINEAS
         dict.Add("vcValIli", vcValIli)
         dict.Add("vcCodCue", vcCodCue)
         dict.Add("vcCodLin", "")
         dict.Add("vcCodEmp", "")
         dict.Add("vcCodInt2", "")
         dict.Add("vcCodDis", "")
         dict.Add("inCodModDis", Nothing)
         dict.Add("vcCodSuc", "")
         dict.Add("inCodTip", Nothing)
         dict.Add("btIncDep", Nothing)
         dict.Add("vcCodCC", "")
         dict.Add("inCodNiv", Nothing)
         dict.Add("inCodGruOri", Nothing)
         dict.Add("inCodInt", Nothing)

         HttpContext.Current.Session("ParametrosOrganizacion") = dict
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub
End Class
