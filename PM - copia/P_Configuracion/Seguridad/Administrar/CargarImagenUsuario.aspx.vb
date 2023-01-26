Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.IO

Partial Class P_Configuracion_Seguridad_Administrar_CargarImagenUsuario
   Inherits System.Web.UI.Page

   Protected Sub form1_Load(sender As Object, e As System.EventArgs) Handles form1.Load
      Dim nombreImagen As String = String.Empty
      Try
         ttgInfoUpload.Mensaje = "Máximo " & Convert.ToDouble("0" + ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString()).ToString() & " Mb. Extensiones permitidas: jpg, jpeg, bmp, png, gif"
         hdfTamanioMaximo.Value = Convert.ToDouble("0" + ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString())

         If Not IsPostBack Then
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/Temporal/"), "/")

            hdfCodUsuario.Value = Request.QueryString("CodUsu")
            If hdfCodUsuario.Value <> "" Then
                    'Dim imagenActual As Byte() = CType(Session("ImagenUsuarioActual"), Byte())
                    Dim imagenActual As Byte() = CType(Session("ImagenUsuario"), Byte())
               If imagenActual IsNot Nothing Then
                  'SaveImage(Server.MapPath("~/") + "Images\Temporal\ImageUser.bmp", imagenActual)
                  Try
                     nombreImagen = Guid.NewGuid.ToString.Replace("-", "") & "ImageUser.bmp"
                            Dim strfn As String = Server.MapPath("~/Images/Temporal" + CarpetaDominio + "\" + nombreImagen)
                     Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                     fs.Write(imagenActual, 0, imagenActual.Length - 1)
                     fs.Flush()
                     fs.Close()
                            imgUsuario.ImageUrl = "~/Images/Temporal" + CarpetaDominio + "\" + nombreImagen
                  Catch ex As Exception
                     Dim util As New Utilitarios
                     util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                     Throw New Exception(UtilitarioWeb.MensajeError)
                  End Try
                  btnEliminar.Visible = True
                  imgUsuario.Visible = True
                  flUpload.Visible = False
                  btnSubir.Visible = False
               Else
                  btnEliminar.Visible = False
                  imgUsuario.Visible = False
                  flUpload.Visible = True
                  btnSubir.Visible = True
               End If
            Else
               btnEliminar.Visible = False
               imgUsuario.Visible = False
               flUpload.Visible = True
               btnSubir.Visible = True
            End If

         End If
         UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   Protected Sub btnSubir_Click(sender As Object, e As System.EventArgs) Handles btnSubir.Click
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/Temporal/"), "/")
        
        Dim resultado As String = SubirArchivo()
      If resultado.Split("|")(0).ToString.Equals("OK") Then
         imgUsuario.Visible = True
            imgUsuario.ImageUrl = "~/Images/Temporal" + CarpetaDominio + "/" + resultado.Split("|")(1).ToString
      End If
   End Sub

    Private Function SubirArchivo() As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/") + "\Images\Temporal\", "\")

        Dim resultado As String = "ERROR|"
        Dim sFileDir As String = Server.MapPath("~/") + "Images\Temporal" + CarpetaDominio + "\"

        Dim lMaxFileSize As Long = 50000
        lMaxFileSize = Convert.ToDouble("0" + ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString()) * 1024 * 1024

        If (Not flUpload.PostedFile Is Nothing) And (flUpload.PostedFile.ContentLength > 0) Then
            'Dim sFileName As String = flUpload.FileName 'System.IO.Path.GetFileName(imgIcono.ImageUrl)
            Dim sFileName As String = Guid.NewGuid.ToString.Replace("-", "") + "ImageUser.bmp"
            Try
                If flUpload.PostedFile.ContentLength <= lMaxFileSize Then
                    flUpload.PostedFile.SaveAs(sFileDir + sFileName)
                    'Session("ImagenUsuarioCargada") = flUpload.FileBytes
                    Session("ImagenUsuario") = flUpload.FileBytes
                    'sFileDir = sFileDir.Replace("\", "\\")
                    'sFileName = sFileName.Replace("\", "\\")
                    'hdfArchivo.Value = sFileDir + sFileName
                    lblmensaje.Text = ""
                    btnEliminar.Visible = True
                    btnSubir.Visible = False
                    flUpload.Visible = False
                    imgUsuario.Visible = True
                    'Return True
                    resultado = "OK|" + sFileName
                Else
                    lblmensaje.Text = "El archivo es muy grande"
                    'hdfArchivo.Value = ""
                    imgUsuario.Visible = False
                    flUpload.Visible = True
                    btnEliminar.Visible = False
                    btnSubir.Visible = True
                    'Return False
                End If
            Catch exc As Exception
                Dim util As New Utilitarios
                util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End Try
        Else
            lblmensaje.Text = "Seleccione un archivo"
            'Return False
        End If
        Return resultado
    End Function

   Private Sub SaveImage(ByVal path As String, ByVal img As Byte())
      Dim fi As FileInfo = New FileInfo(path)
      Dim fs As FileStream = fi.OpenWrite()
      fs.Write(img, 0, img.Length)
      fs.Flush()
      fs.Close()
   End Sub

   Protected Sub btnEliminar_Click(sender As Object, e As System.EventArgs) Handles btnEliminar.Click
      Dim archivo As String = Server.MapPath(imgUsuario.ImageUrl)
      If System.IO.File.Exists(archivo) Then
         System.IO.File.Delete(archivo)
            'Session("ImagenUsuarioCargada") = Nothing
            Session("ImagenUsuario") = Nothing
         flUpload.Visible = True
         imgUsuario.Visible = False
         imgUsuario.ImageUrl = ""
         btnEliminar.Visible = False
         btnSubir.Visible = True
      End If
   End Sub
End Class
