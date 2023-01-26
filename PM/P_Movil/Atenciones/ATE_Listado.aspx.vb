Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports UtilitarioWeb
Imports System.Web.Script.Services
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE

Public Class ATE_Listado
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Dim Atencion As BL_MOV_ATE_Atencion = Nothing
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
               Dim vcNumSegAteAct As String = ConfigurationManager.AppSettings("NumSegAteAct").ToString()

               If vcNumSegAteAct <> "" Then
                  hdfNumSegAteAct.Value = vcNumSegAteAct
               Else
                  hdfNumSegAteAct.Value = 7
               End If

               If UtilitarioWeb.Atenciones.EsSupervisor() = True Then hdfEsSupervisor.Value = "1" Else hdfEsSupervisor.Value = "0"

               CargarCombos(oUsuario)

               If oUsuario.EsOperador = True Then
                  hdfIdOperador.Value = oUsuario.IdOperador
                  hdfEstadoOperador.Value = oUsuario.IdEstadoOperador

                  oUsuario.Ventanilla.IdVentanilla = 0 'Borrar en cuanto se muestre alerta en página principal y no en atenciones

                  If oUsuario.Ventanilla.IdVentanilla <> 0 Then

                     Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)
                     Dim ds As DataSet = Atencion.ObtenerAtencionAsignada(Val(oUsuario.IdOperador), Val(oUsuario.Ventanilla.IdVentanilla))
                     Dim dtVentanilla As DataTable = ds.Tables(1)
                     oUsuario.Ventanilla.IdEstado = Convert.ToInt32(dtVentanilla.Rows(0)("inEstVen").ToString())
                     oUsuario.IdEstadoOperador = Convert.ToInt32(dtVentanilla.Rows(0)("inEstOpe").ToString())
                     HttpContext.Current.Session("Usuario") = oUsuario

                     hdfIdVentanilla.Value = oUsuario.Ventanilla.IdVentanilla
                     hdfEstadoVentanilla.Value = oUsuario.Ventanilla.IdEstado
                     hdfOpcionVentanilla.Value = oUsuario.Ventanilla.IdOpcion

                     If oUsuario.Ventanilla.Automatico Then hdfEsAutomatico.Value = "1" Else hdfEsAutomatico.Value = "0"
                  Else
                     hdfIdVentanilla.Value = "0"
                     hdfEstadoVentanilla.Value = "0"
                     hdfOpcionVentanilla.Value = "0"
                  End If
               Else
                  hdfIdVentanilla.Value = "0"
                  hdfIdOperador.Value = "0"
               End If

               UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Atencion IsNot Nothing Then Atencion.Dispose()
      End Try
   End Sub

   Private Sub CargarCombos(ByVal oUsuario As ENT_SEG_Usuario)
      Dim Ventanilla As BL_MOV_ATE_Ventanilla = Nothing

      Try
         'FILTRO
         Dim dtFiltro As DataTable = New DataTable()
         dtFiltro.Columns.Add("Valor")
         dtFiltro.Columns.Add("Texto")

         dtFiltro.Rows.Add(New Object() {1, "Código"})
         dtFiltro.Rows.Add(New Object() {2, "Empleado"})
         dtFiltro.Rows.Add(New Object() {3, "Estado"})
         dtFiltro.Rows.Add(New Object() {4, "Módulo"})
         dtFiltro.Rows.Add(New Object() {5, "Opción"})
         dtFiltro.Rows.Add(New Object() {6, "Operador"})

         UtilitarioWeb.Dataddl(ddlFiltro, dtFiltro, "Texto", "Valor")

         'VENTANILLAS
         Ventanilla = New BL_MOV_ATE_Ventanilla(oUsuario.IdCliente)
         Dim dtVentanilla As DataTable = Ventanilla.Listar().Tables(0)

         UtilitarioWeb.Dataddl(ddlVentanilla, dtVentanilla, "Descripcion", "IdVentanilla")
         ddlVentanilla.Items.Insert(0, New ListItem("<Seleccione>", "-1"))

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Ventanilla IsNot Nothing Then Ventanilla.Dispose()
      End Try

   End Sub

   <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function Listar(ByVal vcEstado As String, ByVal inFiltro As String, ByVal vcFiltro As String, ByVal inPagTam As String, _
                                  ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal vcTipo As String, _
                                  ByVal biAtencionesDeHoy As String) As JQGridJsonResponse
      Dim Atencion As BL_MOV_ATE_Atencion = Nothing
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
         Dim biAteHoy As Boolean = False

         Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)

         If vcOrdCol = "vcUsuario" Then vcOrdCol = "USU.vcUsu"
         If vcOrdCol = "vcModulo" Then vcOrdCol = "MO.Descripcion"
         If vcOrdCol = "vcOpcion" Then vcOrdCol = "OPC.Descripcion"
         If vcOrdCol = "vcEstado" Then vcOrdCol = "EST.vcNom"
            If vcOrdCol = "vcOperador" Then vcOrdCol = "USUOPE.vcUsu"
         If biAtencionesDeHoy = "1" Then biAteHoy = True

         HttpContext.Current.Session("vcFiltro_MOV_Atencion") = vcEstado & "|" & inFiltro & "|" & vcFiltro & "|" & vcOrdCol & "|" & vcTipOrdCol + "|" & vcTipo + _
                                                                 "|" + biAteHoy.ToString()

         Dim dsDetalle As DataSet = Atencion.ListarPorFiltro(Convert.ToInt32(vcEstado), Convert.ToInt32(inFiltro), vcFiltro, Convert.ToInt32(inPagTam), _
                                                             Convert.ToInt32(inPagAct), vcOrdCol, vcTipOrdCol, oCultura.vcFecCor, oCultura.vcHorCor, _
                                                             vcTipo, oUsuario.Ventanilla.IdVentanilla, biAteHoy)
         Atencion.Dispose()

         Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                           Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Atencion IsNot Nothing Then Atencion.Dispose()
      End Try
   End Function

   <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function CambiarAutomatico(ByVal IdVentanilla As String, ByVal vcEsAutomatico As String, ByVal IdOperador As String, ByVal IdEstado As String) As String
      Dim Ventanilla As BL_MOV_ATE_Ventanilla = Nothing
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Ventanilla = New BL_MOV_ATE_Ventanilla(oUsuario.IdCliente)

         Dim biAutomatico As Boolean = False
         If vcEsAutomatico = "1" Then
            biAutomatico = True
            oUsuario.Ventanilla.Automatico = True
         Else
            oUsuario.Ventanilla.Automatico = False
         End If

         Ventanilla.CambiarAutomatico(Convert.ToInt32(IdVentanilla), biAutomatico, Convert.ToInt32(IdOperador), Convert.ToInt32(IdEstado))
         HttpContext.Current.Session("Usuario") = oUsuario
         Return "1"

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Ventanilla IsNot Nothing Then Ventanilla.Dispose()
      End Try
   End Function

   <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function ObtenerAtencionAsignada(ByVal IdOperador As String, ByVal IdVentanilla As String) As List(Of Object)
      Dim Atencion As BL_MOV_ATE_Atencion = Nothing
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim resultado As String = ""
         Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)

         Dim ds As DataSet = Atencion.ObtenerAtencionAsignada(Val(IdOperador), Val(IdVentanilla))
         Dim dtAtencion As DataTable = ds.Tables(0)
         Dim dtVentanilla As DataTable = ds.Tables(1)
         Dim lstObj As New List(Of Object)

         Dim dict1 As New Dictionary(Of String, Object)
         dict1.Add("inEstVen", dtVentanilla.Rows(0)("inEstVen").ToString())
         dict1.Add("inEstOpe", dtVentanilla.Rows(0)("inEstOpe").ToString())
         lstObj.Add(dict1)

         If dtAtencion.Rows.Count > 0 Then
            Dim dict2 As New Dictionary(Of String, Object)
            dict2.Add("IdAtencion", dtAtencion.Rows(0)("IdAtencion").ToString())
            dict2.Add("Codigo", dtAtencion.Rows(0)("Codigo").ToString())
            dict2.Add("IdEstado", dtAtencion.Rows(0)("IdEstado").ToString())
            dict2.Add("vcEstado", dtAtencion.Rows(0)("vcEstado").ToString())
            dict2.Add("vcTab", dtAtencion.Rows(0)("vcTab").ToString())
            dict2.Add("vcDesTab", dtAtencion.Rows(0)("vcDesTab").ToString())
            dict2.Add("vcTabAte", dtAtencion.Rows(0)("vcTabAte").ToString())
            dict2.Add("vcPar", dtAtencion.Rows(0)("vcPar").ToString())
            lstObj.Add(dict2)
            'resultado = "Atención " + dtAtencion.Rows(0)("Codigo").ToString() + " " + dtAtencion.Rows(0)("vcEstado").ToString()
         End If

         Return lstObj

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Atencion IsNot Nothing Then Atencion.Dispose()
      End Try
   End Function

   <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function CambiarEstadoAtencion(ByVal IdAtencion As String, ByVal IdEstado As String, ByVal IdOperador As String, ByVal IdVentanilla As String, _
                                                 ByVal IdGenerado As String) As String
      Dim Atencion As BL_MOV_ATE_Atencion = Nothing
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim resultado As String = ""
         Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)
         If IdOperador = "" Then IdOperador = oUsuario.IdOperador
         If IdVentanilla = "" Then IdVentanilla = oUsuario.Ventanilla.IdVentanilla
         If IdGenerado = "" Then IdGenerado = "0"

         Atencion.CambiarEstado(Convert.ToInt32(IdAtencion), Convert.ToInt32(IdEstado), Convert.ToInt32(IdGenerado), Convert.ToInt32(IdOperador), _
                                Convert.ToInt32(IdVentanilla))
         Return "1"

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Atencion IsNot Nothing Then Atencion.Dispose()
      End Try
   End Function

   <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function AsignarVentanilla(ByVal IdOperador As String, ByVal IdVentanilla As String) As List(Of Object)
      Dim Ventanilla As BL_MOV_ATE_Ventanilla = Nothing
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim dt As DataTable

         Ventanilla = New BL_MOV_ATE_Ventanilla(oUsuario.IdCliente)
         dt = Ventanilla.AsignarVentanilla(Convert.ToInt32(IdOperador), Convert.ToInt32(IdVentanilla)).Tables(0)

         oUsuario.Ventanilla.IdVentanilla = Convert.ToInt32(IdVentanilla)
         oUsuario.Ventanilla.IdEstado = 46
         oUsuario.Ventanilla.Automatico = Convert.ToBoolean(dt(0)("Automatico"))
         oUsuario.Ventanilla.IdTipoPausaVentanilla = Convert.ToInt32(dt(0)("IdTipoPausaVentanilla"))
         HttpContext.Current.Session("Usuario") = oUsuario

         Dim lstObj As New List(Of Object)
         Dim dict1 As New Dictionary(Of String, Object)
         dict1.Add("Automatico", dt.Rows(0)("Automatico").ToString())
         dict1.Add("IdOpcion", dt.Rows(0)("IdOpcion").ToString())
         dict1.Add("IdTipoPausa", dt.Rows(0)("IdTipoPausaVentanilla").ToString())
         lstObj.Add(dict1)

         Return lstObj

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Ventanilla IsNot Nothing Then Ventanilla.Dispose()
      End Try
   End Function

   Protected Sub eegAtenciones_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegAtenciones.ObtenerDatosAExportar
      Dim Atencion As BL_MOV_ATE_Atencion = Nothing
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
         Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)

         Dim vcEstado As String = HttpContext.Current.Session("vcFiltro_MOV_Atencion").ToString().Split("|")(0)
         Dim inFiltro As String = HttpContext.Current.Session("vcFiltro_MOV_Atencion").ToString().Split("|")(1)
         Dim vcFiltro As String = HttpContext.Current.Session("vcFiltro_MOV_Atencion").ToString().Split("|")(2)
         Dim vcOrdCol As String = HttpContext.Current.Session("vcFiltro_MOV_Atencion").ToString().Split("|")(3)
         Dim vcTipOrdCol As String = HttpContext.Current.Session("vcFiltro_MOV_Atencion").ToString().Split("|")(4)
         Dim vcTipo As String = HttpContext.Current.Session("vcFiltro_MOV_Atencion").ToString().Split("|")(5)
         Dim biAteHoy As Boolean = Convert.ToBoolean(HttpContext.Current.Session("vcFiltro_MOV_Atencion").ToString().Split("|")(6))

         Dim dsDetalle As DataSet = Atencion.ListarPorFiltro(Convert.ToInt32(vcEstado), Convert.ToInt32(inFiltro), vcFiltro, 0, 1, vcOrdCol, vcTipOrdCol, oCultura.vcFecCor, _
                                                             oCultura.vcHorCor, vcTipo, oUsuario.Ventanilla.IdVentanilla, biAteHoy)
         Atencion.Dispose()

         eegAtenciones.ExportarDatos(dsDetalle.Tables(1), "Atenciones")

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Atencion IsNot Nothing Then Atencion.Dispose()
      End Try
   End Sub

End Class