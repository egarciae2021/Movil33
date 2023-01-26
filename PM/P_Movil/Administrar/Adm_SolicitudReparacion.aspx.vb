Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_SolicitudReparacion
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

               hdfAdmin.Value = "0"
               If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

               If hdfAdmin.Value = "0" Then
                  Dim Empleado As BL_GEN_Empleado = New BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                  Dim oEmpleado As ENT_GEN_Empleado = Empleado.Mostrar(oUsuario.Empleado.P_vcCod)
                  Empleado.Dispose()
                  txtEmpleado.Text = oEmpleado.vcNom 'oEmpleado.P_vcCod & " - " & oEmpleado.vcNom
               End If


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
   Public Shared Function ListarDispositivos(ByVal vcCodEmp As String) As List(Of ENT_MOV_Dispositivo)
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim Dispositivos As New BL_MOV_Dispositivo(oUsuario.IdCliente)
         Dim lstDispositivos As List(Of ENT_MOV_Dispositivo) = Dispositivos.ListarPorEmpleado(vcCodEmp)
         Dispositivos.Dispose()
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/ModeloDispositivo/"), "/")
            
         For Each oDispositivo As ENT_MOV_Dispositivo In lstDispositivos
            If oDispositivo.ModeloDispositivo.Imagen IsNot Nothing Then
               Dim barrImg As Byte() = CType(oDispositivo.ModeloDispositivo.Imagen, Byte())
               Dim archivo As String = oDispositivo.ModeloDispositivo.P_inCod & ".jpg"
                    Dim strfn As String = HttpContext.Current.Server.MapPath("~/Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo)
               Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
               fs.Write(barrImg, 0, barrImg.Length)
               fs.Flush()
               fs.Close()
                    oDispositivo.ModeloDispositivo.vcRutArc = "../../Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo
            Else
               oDispositivo.ModeloDispositivo.vcRutArc = "../../Common/Images/Mantenimiento/NoDisponible.jpg"
            End If
         Next

         Return lstDispositivos
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function EnviarSolicitud(ByVal vcCodEmp As String, ByVal vcCodDis As String, ByVal vcDesSol As String) As Integer
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
         Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
         Dim oDispositivo As New ENT_MOV_Dispositivo

         oDispositivo.F_vcCodEmp = vcCodEmp
         oDispositivo.P_vcCodIMEI = vcCodDis
         Dim intValor As Integer = 0
         'intValor = Solicitud.Insertar(oDispositivo, vcDesSol, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.TipoSolicitud.Reparacion), oUsuario)
         Solicitud.Dispose()

         Return intValor
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function
End Class
