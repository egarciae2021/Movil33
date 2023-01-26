Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Collections
Imports System.Collections.Generic
Imports System.IO
Imports System.Web.Script.Services
Imports Utilitario
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_SolicitudActivacionServicio
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         rbtTemporal.Checked = True
         hdfSolicitud.Value = Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Activacion)

         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

               hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
               hdfAdmin.Value = "0"
               If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

               If hdfAdmin.Value = "0" Then 'If oUsuario.Empleado.P_vcCod <> "" Then
                  Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                  lblEmpleado.Text = oUsuario.Empleado.P_vcCod & " - " & Empleado.Mostrar(oUsuario.Empleado.P_vcCod).vcNom
                  Empleado.Dispose()
                  txtEmpleado.Style("display") = "none"
                  hdfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
               Else
                  lblEmpleado.Style("display") = "none"
                  hdfCodEmpleado.Value = ""
               End If
            End If
         End If
         UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function ListarDispositivosConLinea(ByVal vcCodEmp As String) As List(Of ENT_MOV_Dispositivo)
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim Dispositivos As New BL_MOV_Dispositivo(oUsuario.IdCliente)
         Dim listadisp As List(Of ENT_MOV_Dispositivo) = Dispositivos.ListarPorEmpleadoConLinea(vcCodEmp)
         Dispositivos.Dispose()
         Return listadisp
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarServicios_NoUsados(ByVal CodCue As String, ByVal CodLin As String, ByVal CodTipServ As Integer) As List(Of ENT_GEN_Servicio)
      Try
         Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim lstServ As List(Of ENT_GEN_Servicio) = Servicio.ListarServicio_NoUtilizados_x_Linea(CodCue, CodLin, CodTipServ)
         Servicio.Dispose()
         Return lstServ
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarServiciosTipoNoUsados(ByVal CodCue As String, ByVal CodLin As String) As List(Of ENT_GEN_TipoServicio)
      Try
         Dim Servicio As BL_GEN_Servicio = New BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim lstServTipo As List(Of ENT_GEN_TipoServicio) = Servicio.ListarServicioTipo_NoUtilizados_x_Linea(CodCue, CodLin)
         Servicio.Dispose()
         Return lstServTipo
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function EnviaSolicitud(ByVal vcNumLin As String, ByVal vcCodEmp As String, ByVal vcArchAdj As String, ByVal ServSol As Integer, ByVal FecIni As String, ByVal FecFin As String, ByVal DesSol As String, ByVal CantSol As String) As String
      Try
         Dim resultado As Integer
         Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oLinea As New ENT_MOV_Linea

         oLinea.P_vcNum = vcNumLin
         oLinea.Empleado.P_vcCod = vcCodEmp
         If FecFin = "" Then
            FecFin = "01/01/1900"
         End If

         resultado = Solicitud.Insertar(oLinea, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Activacion), FecIni, FecFin, ServSol, DesSol, CantSol)
         Solicitud.Dispose()

         If resultado <> 0 And resultado <> -1 Then
            'Dim Notificacion As BL_MOV_SolicitudNotificacion = new BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
            'Dim m_objCorreo As New CCorreo
            'Dim oEmpleado As New ENT_GEN_Empleado
            'Dim Empleado As BL_GEN_Empleado = new BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'oEmpleado = Empleado.Mostrar(vcCodEmp)

                'Grabar archivos adjuntos agregado 05-09-2013
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")
                
            Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim listatemporal As List(Of String) = vcArchAdj.Split(",").ToList()
            For Each ubic As String In listatemporal
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/File" & ubic
               Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
               If File.Exists(strfn) Then
                  Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                     Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                     Dim BinaryData(fs.Length - 1) As Byte
                     fs.Read(BinaryData, 0, BinaryData.Length)
                     oArchivoAdjunto.F_vcCodSol = resultado
                     oArchivoAdjunto.vcNomAdj = ubic
                     oArchivoAdjunto.binData = BinaryData
                     oArchivoAdjunto.vcExtAdj = Path.GetExtension(strfn).Substring(1)
                     ArchivoAdjunto.Insertar(oArchivoAdjunto)
                     fs.Flush()
                     fs.Close()
                  End Using
                  File.Delete(strfn)
               End If
            Next
            ArchivoAdjunto.Dispose()
            'fin grabar archivos
         End If

         Return resultado
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   '<WebMethod()>
   'Public Shared Function MostrarEquipoSel(ByVal vcCoEquipo As String) As ENT_MOV_ModeloDispositivo
   '    Dim Dispositivo As BL_MOV_Dispositivo = BL_MOV_Dispositivo.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
   '    Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = new BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
   '    Dim oDispositivo As ENT_MOV_Dispositivo = Dispositivo.MostrarDatosSolicitudModelo(vcCoEquipo)
   '    Dim tbModeloDispositivo As DataTable = ModeloDispositivo.Mostrar(oDispositivo.ModeloDispositivo.P_inCod)
   '    Dim oModeloDispositivo As New ENT_MOV_ModeloDispositivo
   '    oModeloDispositivo.vcNom = tbModeloDispositivo(0)("vcNom").ToString() 'nombre de modelo
   '    oModeloDispositivo.inEst = tbModeloDispositivo(0)("btVig") 'estado
   '    'imagen
   '    Dim Server As System.Web.HttpServerUtility
   '    If Not IsDBNull(tbModeloDispositivo(0)("imIma")) Then
   '        Dim barrImg As Byte() = CType(tbModeloDispositivo(0)("imIma"), Byte())
   '        Dim archivo As String = tbModeloDispositivo(0)("P_inCod").ToString & ".jpg"
   '        Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/" + archivo)
   '        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
   '        fs.Write(barrImg, 0, barrImg.Length)
   '        fs.Flush()
   '        fs.Close()
   '        oModeloDispositivo.vcRutArc = "../../Images/ModeloDispositivo/" + archivo
   '    Else
   '        oModeloDispositivo.vcRutArc = "../../Common/Images/Mantenimiento/NoDisponible.jpg"

   '    End If
   '    'fin imagen

   '    Return oModeloDispositivo
   'End Function
End Class
