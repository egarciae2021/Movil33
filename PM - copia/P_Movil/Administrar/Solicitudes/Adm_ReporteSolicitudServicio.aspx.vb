Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.IO

Partial Class P_Movil_Administrar_Solicitudes_Adm_ReporteSolicitudServicio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            hdfArCodigo.Value = Request.QueryString("arcod")
            hdfEstadoEnviado.Value = Request.QueryString("repenv")
            hdfEstadoSolicitud.Value = 8
            hdfvcTab.Value = "MOV_Solicitud"
            hdfTipRepAct.Value = "6"
            hdfTipRepAmp.Value = "7"
            hdfTipSol.Value = Request.QueryString("tipsol")

            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    txtFechaInicio.Text = String.Format("{0:dd/MM/yyyy}", New DateTime(Now.Year, Now.Month, 1))
                    txtFechaFin.Text = String.Format("{0:dd/MM/yyyy}", Now) '.Year, Now.Month + 1, 1).AddDays(-1))

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
    Public Shared Function InsetarEnvioCorreo(ByVal adj As String, ByVal mailto As String, ByVal asunto As String, ByVal descripcion As String) As String
        Dim Cola As BL_MOV_Cola = Nothing
        Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = Nothing
        Dim resultado As String = String.Empty
        Try
            Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCola As New ENT_MOV_Cola
            oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            oCola.vcAsunto = asunto
            oCola.vcDescripcion = descripcion
            oCola.vcMailTo = mailto
            oCola.vcMailFrom = ""
            resultado = Cola.Insertar(oCola)

            'adjuntar reporete de solicitudes
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

            If (resultado <> "") Then
                ArchivoAdjunto = New BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim listaRepAdj As List(Of String) = adj.Split(",").ToList()
                For Each ubic As String In listaRepAdj
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                            Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
                            Dim BinaryData(fs.Length - 1) As Byte
                            fs.Read(BinaryData, 0, BinaryData.Length)
                            'oArchivoAdjunto.F_vcCodSol = resultado
                            oArchivoAdjunto.vcNomAdj = ubic
                            oArchivoAdjunto.binData = BinaryData
                            oArchivoAdjunto.vcExtAdj = Path.GetExtension(strfn).Substring(1) 'agregado 25-09-2013 wapumayta
                            ArchivoAdjunto.InsertarReporteSolicitud(oArchivoAdjunto, resultado)
                            fs.Flush()
                            fs.Close()
                        End Using
                        File.Delete(strfn)
                    End If
                Next
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cola IsNot Nothing Then Cola.Dispose()
            If ArchivoAdjunto IsNot Nothing Then ArchivoAdjunto.Dispose()
        End Try

        Return resultado
    End Function

    <WebMethod()>
    Public Shared Sub EliminarTemporales(ByVal adj As String)
        Try
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")
            
            If adj <> "" Then
                Dim listaRepAdj As List(Of String) = adj.Split(",").ToList()
                For Each ubic As String In listaRepAdj
                    Dim ubicc As String = "~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/" & ubic
                    Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                    If File.Exists(strfn) Then
                        File.Delete(strfn)
                    End If
                Next
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    'Private Sub DescargarAdjuntos()
    <WebMethod()>
    Public Shared Sub DescargarAdjuntos(ByVal archivos As String)
        Try
            Dim resp As HttpResponse
            resp = HttpContext.Current.Response
            'Dim archivos As String = hdfArchivosAdj.Value
            Dim listaarch As List(Of String) = archivos.Split(",").ToList()
            For Each archivo In listaarch
                resp.Clear()
                resp.ContentType = "application/octet-stream"
                resp.AddHeader("Content-Disposition", "attachment; filename=../Temporal/" + archivo)
                resp.WriteFile("../Temporal/" + archivo)
                resp.Flush()
                resp.End()
            Next
            'Response.Clear();
            '// Con esto le decimos al browser que la salida sera descargable
            'Response.ContentType = "application/octet-stream";
            '// esta linea es opcional, en donde podemos cambiar el nombre del fichero a descargar (para que sea diferente al original)
            'Response.AddHeader("Content-Disposition", "attachment; filename=binaries/devtroce.exe");
            '// Escribimos el fichero a enviar 
            'Response.WriteFile("binaries/devtroce.exe");
            '// volcamos el stream 
            'Response.Flush();
            '// Enviamos todo el encabezado ahora
            'Response.End();
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class
