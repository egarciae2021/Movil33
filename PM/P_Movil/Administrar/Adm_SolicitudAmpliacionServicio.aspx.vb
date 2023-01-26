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

Partial Class P_Movil_Administrar_Adm_SolicitudAmpliacionServicio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            'hdfSolicitud.Value = Convert.ToInt32(UtilitarioWeb.TipoSolicitud.Activacion)

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
                        Dim Empleado As BL_GEN_Empleado = new BL_GEN_Empleado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

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
    Public Shared Function EnviaSolicitud(ByVal vcNumLin As String, ByVal vcCodEmp As String, ByVal vcArchAdj As String, ByVal ServSol As Integer, ByVal DesSol As String, ByVal CantSol As String) As String
        Try
            Dim resultado As Integer
            'Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oLinea As New ENT_MOV_Linea

            oLinea.P_vcNum = vcNumLin
            oLinea.Empleado.P_vcCod = vcCodEmp

            'resultado = Solicitud.Insertar(oLinea, Convert.ToInt32(UtilitarioWeb.TipoSolicitud.Ampliacion), ServSol, DesSol, CantSol)

            If resultado <> 0 And resultado <> -1 Then
                'Dim Notificacion As BL_MOV_SolicitudNotificacion = new BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Dim m_objCorreo As New CCorreo
                'Dim oEmpleado As New ENT_GEN_Empleado
                'Dim Empleado As BL_GEN_Empleado = new BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'oEmpleado = Empleado.Mostrar(vcCodEmp)

                'Grabar archivos adjuntos agregado 05-09-2013'
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

                Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = new BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
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
End Class
