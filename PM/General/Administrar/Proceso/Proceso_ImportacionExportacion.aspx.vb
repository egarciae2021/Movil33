Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.Procesos
Imports VisualSoft.Comun.Proceso.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports Utilitario
Imports VisualSoft.Comun
Imports VisualSoft.Comun.Util


Partial Class General_Administrar_Proceso_Proceso_ImportacionExportacion
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_Proceso_ImportacionExportacion_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Plantilla As BL_PCS_IMP_Plantilla = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfEntidad.Value = Request.QueryString("vcEntidad")
                    hdfTabla.Value = Request.QueryString("vcTabla")
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

                    Plantilla = New BL_PCS_IMP_Plantilla(oUsuario.IdCliente)
                    Dim lstPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Entidad(hdfEntidad.Value)

                    If lstPlantilla.Count > 1 Then
                        UtilitarioWeb.DatarbLst(rdblPlantillas, lstPlantilla, "Nombre", "IdPlantilla")
                        hdfContador.Value = lstPlantilla.Count
                    ElseIf lstPlantilla.Count = 1 Then
                        hdfPlantilla.Value = lstPlantilla.ElementAt(0).IdPlantilla
                        hdfContador.Value = 1
                        tituloproceso.InnerHtml = "<p>Se ha Seleccionado el modelo " + lstPlantilla.ElementAt(0).Nombre + " para el proceso</p>"
                    ElseIf lstPlantilla.Count = 0 Then
                        hdfContador.Value = 0
                    End If

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function Buscar_Plantilla_Nombre(pidPlantilla As Integer) As String
        Dim Plantilla As BL_PCS_IMP_Plantilla = Nothing
        Try
            Plantilla = New BL_PCS_IMP_Plantilla(0)
            Dim ePlantilla As New ENT_PCS_IMP_Plantilla
            ePlantilla.IdPlantilla = pidPlantilla
            Dim lstPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Codigo(ePlantilla)
            Return lstPlantilla.ElementAt(0).Nombre.ToString()
        Catch ex As Exception
        Finally
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
        End Try
        Return ""
    End Function

    <WebMethod()> _
    Public Shared Function Ejecutando_Proceso(pruta As String, pidPlantilla As Integer, ptabla As String) As Boolean

        Dim vProceso As BL_PCS_IMP_Proceso = Nothing
        Dim vProcesoInformacion As BL_PCS_IMP_ProcesoInformacion = Nothing

        Try

            Dim resultado As Boolean = False
            Dim Proceso As New ProcesosFunciones
            vProceso = New BL_PCS_IMP_Proceso(0)
            vProcesoInformacion = New BL_PCS_IMP_ProcesoInformacion(0)

            Dim CodConfigOrigen As Integer = Proceso.Registrar_Configuracion_Origen_Upload(pruta, pidPlantilla)

            Dim CodProceso As Integer = vProceso.Obtener_Codigo_Proceso()

            Dim CodProcesoInformacion As Integer = vProcesoInformacion.Obtener_Codigo_Proceso_Informacion()

            If Proceso.Insertar_Proceso(CodConfigOrigen, CodProceso, CodProcesoInformacion) Then

                If Proceso.Registrar_ProcesoInformacion(CodProceso, CodProcesoInformacion) Then

                    Dim dsOrigen As DataSet = Proceso.Procesando_Origen(CodConfigOrigen, CodProceso, CodProcesoInformacion)

                    If dsOrigen.Tables.Count > 0 Then

                        Dim CodConfigDestino As Integer = Proceso.Registrar_Configuracion_Destino_Upload(pidPlantilla, ptabla)

                        Dim estado As Boolean = Proceso.Procesando_Destino(CodConfigDestino, dsOrigen, CodConfigOrigen, CodProceso, CodProcesoInformacion)

                        If estado Then

                            Dim opcion As Boolean = Proceso.Actualizar_Proceso_Conf_Destino(CodProceso, CodConfigDestino)

                            If opcion Then

                                resultado = Proceso.Actualizar_ProcesoInformacion(CodProceso, CodConfigOrigen, pruta, CodProcesoInformacion)

                            End If

                        End If

                    End If
                End If

            End If


            '---------------------------------------------------------------------------------------------------------------------------------

            'Dim codPagoFacturacion As Integer = Proceso.Proceso_Entidad_Facturacion(1, 2)

            Return resultado

        Catch ex As Exception
            Return False
        Finally
            If vProceso IsNot Nothing Then vProceso.Dispose()
            If vProcesoInformacion IsNot Nothing Then vProcesoInformacion.Dispose()
        End Try
    End Function

    Protected Sub btnCargar_Click(sender As Object, e As System.EventArgs) Handles btnCargar.Click
        Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

            flUpload.PostedFile.SaveAs(ArchivoConfiguracion.ObtenerValorAppSettings(HttpContext.Current.Server.MapPath("~/Web.config"), "RutaUbicacion") & flUpload.FileName)
            Dim ruta As String = ArchivoConfiguracion.ObtenerValorAppSettings(HttpContext.Current.Server.MapPath("~/Web.config"), "RutaUbicacion") & flUpload.FileName

            hdfRuta.Value = ruta
            hdfLongRuta.Value = ruta.Length
        Catch ex As Exception
        Finally
            If Not IsNothing(ServicioGeneral) Then ServicioGeneral.Dispose()
        End Try
    End Sub


End Class
