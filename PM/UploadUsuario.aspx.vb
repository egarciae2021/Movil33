Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.IO

Partial Class P_Configuracion_General_UploadUsuario
    Inherits System.Web.UI.Page

    Protected Sub P_Configuracion_General_MisDatos_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            Try
                'agregado 13-08-2015 wapumayta
                Dim Dominio As String = String.Empty
                If Not IsNothing(HttpContext.Current.Session("IdDominio")) Then
                    Dominio = HttpContext.Current.Session("IdDominio").ToString()
                End If

                'If Not IsPostBack Then
                Dim P_inCod As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                imgIcono.ImageUrl = "~/Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" & P_inCod & "&al=" & Guid.NewGuid.ToString.Replace("-", "") & "&Dominio=" & Dominio
                'End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            Catch ex As Exception
                Throw ex
            End Try
        End If
    End Sub

    Protected Sub btnSubir_Click(sender As Object, e As System.EventArgs) Handles btnSubir.Click
        'Dim lMaxFileSize As Long = 50000
        'If (Not flUpload.PostedFile Is Nothing) And (flUpload.PostedFile.ContentLength > 0) Then
        '    Dim sFileName As String = flUpload.FileName 'System.IO.Path.GetFileName(imgIcono.ImageUrl)
        '    Try
        '        If flUpload.PostedFile.ContentLength <= lMaxFileSize Then

        '            Dim ImgFile As HttpPostedFile = flUpload.PostedFile
        '            Dim byteImage As [Byte]() = New [Byte](flUpload.PostedFile.ContentLength - 1) {}
        '            ImgFile.InputStream.Read(byteImage, 0, flUpload.PostedFile.ContentLength)

        '            hdfArchivo.Value = sFileName
        '            imgIcono.Visible = True
        '            imgIcono.ImageUrl = "~/Images/Temporal/" + hdfArchivo.Value
        '        End If
        '    Catch exc As Exception
        '        Dim util As New Utilitarios
        '        util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
        '        Throw New Exception(UtilitarioWeb.MensajeError)
        '    End Try
        'End If
        'Exit Sub
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/Temporal/"), "/")
        
        If SubirArchivo() Then
            imgIcono.Visible = True
            imgIcono.ImageUrl = "~/Images/Temporal" + CarpetaDominio + "/" + hdfNombreArchivo.Value
            'flUpload.Visible = False
            'btnSubir.Visible = False
            'btnEliminar.Visible = True
        End If
    End Sub

    Private Function SubirArchivo() As Boolean
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/") + "\Images\Temporal\", "\")
        
        Dim sFileDir As String = Server.MapPath("~/") + "Images\Temporal" + CarpetaDominio + "\"

        Dim lMaxFileSize As Long = 50000
        lMaxFileSize = Convert.ToDouble("0" + ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString()) * 1024 * 1024

        If (Not flUpload.PostedFile Is Nothing) AndAlso (flUpload.PostedFile.ContentLength > 0) Then
            Dim sFileName As String = flUpload.FileName 'System.IO.Path.GetFileName(imgIcono.ImageUrl)
            Try
                If flUpload.PostedFile.ContentLength <= lMaxFileSize Then

                    sFileName = Path.GetFileNameWithoutExtension(sFileName) + "-" + Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(sFileName)
                    'Dim strNombre As String = sFileDir + sFileName
                    flUpload.PostedFile.SaveAs(sFileDir + sFileName)

                    hdfNombreArchivo.Value = sFileName
                    sFileDir = sFileDir.Replace("\", "\\")
                    sFileName = sFileName.Replace("\", "\\")

                    hdfArchivo.Value = sFileDir + sFileName
                    Session("imagenCargada") = flUpload.FileBytes
                    lblmensaje.Text = ""
                    Return True
                Else
                    lblmensaje.Text = "El archivo es muy grande"
                    hdfArchivo.Value = ""
                    imgIcono.Visible = False
                    flUpload.Visible = True
                    'btneliminar.Visible = False
                    btnSubir.Visible = True
                    Return False
                End If
            Catch exc As Exception
                Dim util As New Utilitarios
                util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End Try
        Else
            Return False
        End If
    End Function


    <WebMethod()>
    Public Shared Function Guardar(ByVal vcRuta As String) As String
        Dim Usuario As BL_SEG_Usuario = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)

            If vcRuta <> "" Then
                Dim ms As New MemoryStream()
                vcRuta = vcRuta.Replace("\\", "\")
                Dim newImage As System.Drawing.Image = System.Drawing.Image.FromFile(vcRuta)
                newImage.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg)
                Dim arreglo As Byte() = ms.ToArray()

                oUsuario.Imagen = arreglo

                Usuario.Grabar(oUsuario)
                HttpContext.Current.Session("Usuario") = oUsuario
            End If

        Catch ex As Exception
            'Dim util As New Utilitarios
            'util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Return ex.Message & ". " & ex.StackTrace
        Finally
            If Usuario IsNot Nothing Then
                Usuario.Dispose()
            End If
        End Try
        Return "OK"

    End Function

End Class
