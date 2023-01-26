Imports System.Web.HttpServerUtility
Imports System.IO
Imports VisualSoft.Comun.ImportacionExportacion
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports UtilitarioWeb
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Data.SqlClient

Partial Class General_Administrar_Importacion_Exportacion_Importacion
   Inherits System.Web.UI.Page

   Dim valorGlobal As String = String.Empty

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
         Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
      Else
         Dim nombreTabla As String = Request.QueryString("vcTab")
         Dim codEntidad As Integer = Convert.ToInt32(Request.QueryString("codEnt"))

         hdfCodCliente.Value = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
         hdfEstado.Value = ""
         hdftab.Value = nombreTabla
         hdfCodEnt.Value = codEntidad
         UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

         If Not Page.IsPostBack Then

            btnCargar.Visible = True
            btnEliminar.Visible = False

         End If
      End If
   End Sub

   Protected Sub btnEliminar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnEliminar.Click
      Dim ruta As String = Server.MapPath("~/General/Administrar/Importacion_Exportacion/Archivos/")
      Dim fn As String = Path.GetFileName(flUpload.PostedFile.FileName)

      hdfRutaArchivo.Value = hdfRutaArchivo.Value.ToString().Replace("´", "\")

      If System.IO.File.Exists(hdfRutaArchivo.Value) Then
         System.IO.File.Delete(hdfRutaArchivo.Value)
         Session.Remove("Archivo")
         flUpload.PostedFile.InputStream.Dispose()
         flUpload.Visible = True
         btnCargar.Visible = True
         btnEliminar.Visible = False
         txtPlantilla.Text = String.Empty
         hdfCodPlantilla.Value = String.Empty
      End If
   End Sub
   Protected Sub btnCargar_Click(ByVal sender As Object, ByVal e As System.EventArgs)
      If CargarArchivo() Then
         btnCargar.Visible = False
         btnEliminar.Visible = True
         Dim Script As String = "var columnasImportador = [{name: '"
         Dim dtCampos As New DataTable
         Dim dtResultado As New DataTable
         Dim mensaje As String = String.Empty
         Dim rutaArchivo As String = hdfRutaArchivo.Value.ToString().Replace("´", "\")
         Dim blGeneral As BL_General = New BL_General(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         dtCampos = blGeneral.ListarCamposPlantilla(Integer.Parse(hdfCodPlantilla.Value))
         blGeneral.Dispose()
         'dtResultado = Importacion.ObtenerDatosExcelInterop(rutaArchivo, dtCampos, mensaje)
         If Not mensaje.Equals(String.Empty) Then
            If Not Page.ClientScript.IsStartupScriptRegistered(Me.GetType(), "errorMensaje") Then
               Page.ClientScript.RegisterStartupScript(Me.GetType, "errorMensaje", "var mensajeErrorImportar = '" & mensaje & "'; mensajeDeError();", True)
               btnCargar.Visible = True
               btnEliminar.Visible = False
               Return
            End If
         End If

         HttpContext.Current.Session("GrillaDeImportacion") = dtResultado
         HttpContext.Current.Session("GrillaCampos") = dtCampos

         For index = 1 To dtResultado.Columns.Count - 1 Step 1
            Script = Script & dtResultado.Columns.Item(index).ColumnName & "'}, {name:'"
         Next
         Script = Script.Substring(0, Script.Length - 10)
         Script = Script & "}];"

         If Not Page.ClientScript.IsStartupScriptRegistered(Me.GetType(), "ScriptKey") Then
            Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
         End If

         If Not Page.ClientScript.IsStartupScriptRegistered(Me.GetType(), "cargarGrilla") Then
            Page.ClientScript.RegisterStartupScript(Me.GetType(), "cargarGrilla", "$(function () {cargarGrilladeImportacion();});", True)

         End If
      End If
   End Sub

   Private Function CargarArchivo() As Boolean
      Dim ruta As String = String.Empty
      Dim mensaje As String = String.Empty
      If (Not flUpload.PostedFile Is Nothing) And (flUpload.PostedFile.ContentLength > 0) Then
         'Server.MapPath(flUpload.PostedFile.FileName)
         Dim fn As String = Path.GetFileName(flUpload.PostedFile.FileName)
         ruta = Server.MapPath("~/General/Administrar/Importacion_Exportacion/Archivos/")
         Try

            flUpload.PostedFile.SaveAs(ruta + fn)
            Session("Archivo") = flUpload.FileBytes
            hdfRutaArchivo.Value = ruta & fn
            hdfRutaArchivo.Value = hdfRutaArchivo.Value.ToString().Replace("\", "´")

            valorGlobal = ruta & fn
            'Importacion.ValidarInformacion(ruta, fn)

         Catch ex1 As IOException
            If Not Page.ClientScript.IsStartupScriptRegistered(Me.GetType(), "errorMensaje") Then
               mensaje = "El archivo seleccionado esta siendo utilizado. Debe cerrarlo y repetir la operación."
               Page.ClientScript.RegisterStartupScript(Me.GetType, "errorMensaje", "var mensajeErrorImportar = '" & mensaje & "'; mensajeDeError();", True)
               Return False
            End If
         Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
         End Try
      End If
      Return True
   End Function

   <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal rutaArchivo As String, ByVal codPlantilla As String, ByVal inFilReg As String) As JQGridJsonResponse
      Try
         'Dim blGeneral As BL_General = New BL_General(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim dtReducido As New DataTable
         Dim dtResultado As New DataTable
         Dim comienzo As Integer
         Dim paginasTotal As Integer
         Dim tamPagina As Integer = inPagTam
         Dim pagActual As Integer = inPagAct

         Dim Script As String = String.Empty
         rutaArchivo = rutaArchivo.ToString().Replace("´", "\")
         'dtCampos = blGeneral.ListarCamposPlantilla(Integer.Parse(codPlantilla))
         'dtResultado = Importacion.ObtenerDatosExcelInterop(rutaArchivo, dtCampos)
         dtResultado = CType(HttpContext.Current.Session("GrillaDeImportacion"), DataTable)
         If Not IsNothing(dtResultado) Then
            dtReducido = DirectCast(dtResultado.Clone(), DataTable)

            paginasTotal = Math.Ceiling(dtResultado.Rows.Count / tamPagina)
            If pagActual >= paginasTotal Then
               pagActual = paginasTotal
            End If

            comienzo = ((pagActual - 1) * tamPagina)
            For index = comienzo To comienzo + tamPagina - 1 Step 1
               If index >= dtResultado.Rows.Count Then
                  Exit For
               End If

               dtReducido.ImportRow(dtResultado.Rows(index))
               'dtReducido.Rows.Add(dtResultado.Rows(index))
            Next
         End If

         'prueba(dtResultado)
         Return New JQGridJsonResponse(inPagTam, inPagAct, dtResultado.Rows.Count, dtReducido, 1)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function InsertarImportacion(ByVal vcTabla As String) As Boolean
      Dim util As New Utilitarios
      Try
         Dim blGeneral As BL_General = New BL_General(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim cadenaConexion = blGeneral.obtenerConexionDatos(1)
         blGeneral.Dispose()

         Dim dtResultado As New DataTable
         Dim dtCampos As New DataTable
         Dim Script As String = String.Empty
         Dim resultado As Boolean = False

         dtResultado = CType(HttpContext.Current.Session("GrillaDeImportacion"), DataTable)
         dtCampos = CType(HttpContext.Current.Session("GrillaCampos"), DataTable)


         If Not IsNothing(dtResultado) And Not IsNothing(dtCampos) Then
            dtResultado = Importacion.actualizarCabecerasDTParaInsertar(dtResultado, dtCampos)
            'Dim contador As Integer = 0
            'For Each fila As DataRow In dtCampos.Rows
            '    dtResultado.Columns(contador).ColumnName = fila.Item("CampoBaseDatos")
            '    contador += 1
            'Next

            resultado = Importacion.InsertarImportacion(vcTabla, cadenaConexion, dtResultado, dtCampos)

            Return resultado
         Else
            Return False
         End If
      Catch ex As Exception
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Return False
      End Try
   End Function
End Class
