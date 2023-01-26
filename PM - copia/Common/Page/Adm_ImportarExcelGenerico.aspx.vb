Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Proceso.BE
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.Procesos
Imports System.IO

Public Class Adm_ImportarExcelGenerico
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oBL_PCS_IMP_Plantilla As BL_PCS_IMP_Plantilla = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    'viIdTecnico = Me.ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)
                    obteniendoPlant.Visible = False
                    cargandoPlant.Visible = False

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    'hdfIdTecnico.Value = viIdTecnico
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim nombreTabla As String = Request.QueryString("vcTab")
                    hdfNombreEntidad.Value = nombreTabla

                    oBL_PCS_IMP_Plantilla = New BL_PCS_IMP_Plantilla(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim plantilla As List(Of ENT_PCS_IMP_Plantilla) = oBL_PCS_IMP_Plantilla.Listar_x_EntidadOrigenDestino(nombreTabla)
                    For Each plant As ENT_PCS_IMP_Plantilla In plantilla
                        Me.ddlPlantillas.Items.Add(New ListItem(plant.Nombre, plant.IdPlantilla.ToString() _
                                                                  + "|" + plant.IdConfigProcesoOrigen.ToString() _
                                                                  + "|" + plant.IdConfigProcesoDestino.ToString() _
                                                                  + "|" + plant.IdConfigProcesoOrigen_Procesar.ToString() _
                                                                  + "|" + plant.IdConfigProcesoDestino_Procesar.ToString() _
                                                                  + "|" + plant.Ruta.ToString()))
                    Next

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oBL_PCS_IMP_Plantilla IsNot Nothing Then
                oBL_PCS_IMP_Plantilla.Dispose()
            End If
        End Try
    End Sub

    Private Sub btnCargar_Click(sender As Object, e As System.EventArgs) Handles btnCargar.Click

        Dim btn As Button = CType(sender, Button)

        If btn.Text <> "Cargar" Then
            btnCargar.Text = "Cargar"
            cargandoPlant.Visible = False
            FileUpload1.Visible = True
            lblResul.Visible = False
        Else
            Dim strfn As String = Me.ddlPlantillas.SelectedValue.Split("|")(5)
            FileUpload1.SaveAs(strfn)

            lblResul.Text = "Archivo guardado en " + strfn
            btnCargar.Text = "Volver a cargar"
            cargandoPlant.Visible = True
            FileUpload1.Visible = False
            lblResul.Visible = True

            'Exit Sub
            'Dim imgStream As Stream = FileUpload1.PostedFile.InputStream
            'Dim imgLen As Integer = FileUpload1.PostedFile.ContentLength
            'Dim imgBinaryData(imgLen) As Byte
            'Dim n As Integer = imgStream.Read(imgBinaryData, 0, imgLen)
            ''Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/Modelo" & hdfArchivo.Value & ".jpg")
            'Dim strfn As String = Me.ddlPlantillas.SelectedValue.Split("|")(5)
            'strfn = "E:\PROCESO DE IMPORTACION\General.xlsx"
            'Dim fs As FileStream = New FileStream(strfn, FileMode.Create, FileAccess.Write)
            'fs.Write(imgBinaryData, 0, imgBinaryData.Length)
            'fs.Flush()
            'fs.Close()

        End If



    End Sub

    Private Sub btnObtenerPlantilla_Click(sender As Object, e As System.EventArgs) Handles btnObtenerPlantilla.Click
        Dim funciones As New ProcesosFunciones()
        Try
            'obteniendoPlant.Visible = True
            Dim strfn As String() = Me.ddlPlantillas.SelectedValue.Split("|")
            funciones.EsConData = Me.chkConData.Checked
            funciones.EsContextoWeb = True
            funciones.EsDescargarArchivo = True
            funciones.Proceso_General(CInt(strfn(0)), CInt(strfn(1)), CInt(strfn(2)))
        Catch ex As Exception

            obteniendoPlant.Visible = False
            'Me.obteniendoPlant.Attributes.Add("style", "display:none")
            'Me.obteniendoPlant.Style.Add("display", "none")
            'Me.obteniendoPlant.Style("display") = "none"
            'Page.ClientScript.RegisterStartupScript(Me.GetType(), "myScript", "<script>javascript: document.getElementById('" + Me.obteniendoPlant.ClientID + "').style.display = 'none';</script>")
            'obteniendoPlant.Visible = False
            'Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey1", " $('#obteniendoPlant').css('display', 'none');", True)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Procesar(ByVal IdPlantilla As Integer, ByVal IdOrigen As Integer, ByVal IdDestino As Integer) As ENT_PCS_IMP_ModeloImportacion
        Try

            Dim funciones As New ProcesosFunciones()
            funciones.EsConData = True
            Dim modelo As ENT_PCS_IMP_ModeloImportacion = funciones.Proceso_General(IdPlantilla, IdOrigen, IdDestino)

            'funciones.descargarArchivo(modelo.ConfiguracionFuenteOrigen.RutaLog + modelo.ProcesoInformacion.NombreLog + ".log")
            Dim fp As FileInfo = New FileInfo(modelo.ConfiguracionFuenteOrigen.RutaLog + modelo.ProcesoInformacion.NombreLog + ".log")
            Dim fe As FileInfo = New FileInfo(modelo.ConfiguracionFuenteOrigen.RutaErrores + modelo.ProcesoInformacion.NombreError + ".log")
            Dim fpd As FileInfo = New FileInfo(modelo.ConfiguracionFuenteDestino.RutaLog + modelo.ProcesoInformacion.NombreLog + ".log")
            Dim fed As FileInfo = New FileInfo(modelo.ConfiguracionFuenteDestino.RutaErrores + modelo.ProcesoInformacion.NombreError + ".log")


            modelo.ExisteLogError = fe.Exists
            modelo.ExisteLogProceso = fp.Exists
            modelo.ExisteLogErrorDestino = fed.Exists
            modelo.ExisteLogProcesoDestino = fpd.Exists

            Return modelo

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class