Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports VisualSoft.Suite80.BE

Partial Class General_Administrar_Mantenimiento_CargaIcono
    Inherits System.Web.UI.Page

    Protected Sub form1_Load(sender As Object, e As System.EventArgs) Handles form1.Load
        Dim nombreImagen As String = String.Empty
        Try
            If Not Page.IsPostBack Then
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/Images/Temporal/"), "/")
                
                hdfCodigo.Value = Request.QueryString("Id")
                Dim imagen As Byte() = CType(Session("ImagenActual"), Byte())
                Session.Contents.Remove("ImagenActual")
                'CType(HttpContext.Current.Session("imagenCargada"), Byte())
                If hdfCodigo.Value = "0" Then
                    flUpload.Visible = True
                    btnsubir.Visible = True
                    btneliminar.Visible = False
                    imgIcono.Visible = False
                Else
                    If imagen Is Nothing Then
                        flUpload.Visible = True
                        btnsubir.Visible = True
                        btneliminar.Visible = False
                        imgIcono.ImageUrl = "~/Images/Temporal" + CarpetaDominio + "\M_NIVE_" + hdfCodigo.Value & ".ico"
                    Else
                        flUpload.Visible = False
                        btnsubir.Visible = False
                        btneliminar.Visible = True

                        Try
                            nombreImagen = Guid.NewGuid.ToString.Replace("-", "") & "_M_NIVE_" & hdfCodigo.Value & ".ico"
                            Dim strfn As String = Server.MapPath("~/Images/Temporal" + CarpetaDominio + "\" + nombreImagen)
                            'Dim strfn As String = Server.MapPath("~/Images/Temporal\M_NIVE_" + hdfCodigo.Value & ".ico")
                            Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                            fs.Write(imagen, 0, imagen.Length)
                            fs.Flush()
                            fs.Close()

                        Catch ex As Exception
                            Dim util As New Utilitarios
                            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                            Throw New Exception(UtilitarioWeb.MensajeError)
                        End Try


                        imgIcono.Visible = True
                        'imgIcono.ImageUrl = "~/Images/Temporal\M_NIVE_" + hdfCodigo.Value & ".ico"
                        imgIcono.ImageUrl = "~/Images/Temporal" + CarpetaDominio + "\" + nombreImagen
                        hdfIconoArchivo.Value = Guid.NewGuid.ToString.Replace("-", "") & "_M_NIVE_" & hdfCodigo.Value & ".ico"
                        Session("imagenCargada") = imagen
                        btnsubir.Visible = False
                        btneliminar.Visible = True
                    End If
                End If
            End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
        'If oNivelOrganizacion(0).imIcoNiv Is Nothing Then
        '    flUpload.Visible = True
        '    btnsubir.Visible = True
        '    btneliminar.Visible = False
        '    imgIcono.ImageUrl = "~/Images/Temporal\M_NIVE_" + oNivelOrganizacion(0).P_inCodNiv.ToString() & ".ico"
        'Else
        '    oNivelOrganizacion(0).vcUrlIcoNiv = "~/Images/Temporal\M_NIVE_" + oNivelOrganizacion(0).P_inCodNiv.ToString() & ".ico"
        '    'oNivelOrganizacion(0).vcUrlIcoNiv = "~/Images\" & oNivelOrganizacion(0).P_inCodNiv & ".ico"


        '    Try
        '        Dim strfn As String = Server.MapPath(oNivelOrganizacion(0).vcUrlIcoNiv)
        '        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
        '        fs.Write(oNivelOrganizacion(0).imIcoNiv, 0, oNivelOrganizacion(0).imIcoNiv.Length)
        '        fs.Flush()
        '        fs.Close()

        '    Catch ex As Exception
        '        Dim util As New Utilitarios
        '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
        '        Throw New Exception(UtilitarioWeb.MensajeError)
        '    End Try


        '    imgIcono.Visible = True
        '    imgIcono.ImageUrl = oNivelOrganizacion(0).vcUrlIcoNiv
        '    hdfArchivo.Value = "M_NIVE_" & oNivelOrganizacion(0).P_inCodNiv.ToString() & ".ico"
        '    Session("imagenCargada") = oNivelOrganizacion(0).imIcoNiv
        '    btnsubir.Visible = False
        '    btneliminar.Visible = True
        'End If
    End Sub

    Protected Sub btneliminar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btneliminar.Click

        'Dim archivo As String = Server.MapPath("~/") + "Images/Temporal\" + hdfArchivo.Value
        Dim archivo As String = Server.MapPath(imgIcono.ImageUrl)
        'Dim NivelOrganizacion As BL_GEN_NivelOrganizacion = new BL_GEN_NivelOrganizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        'Dim directorio As String = System.IO.Path.GetDirectoryName()
        'archivo = 
        ''hdfCodigo.Value
        'Dim codigoEliminarImagen As New Integer
        'If Integer.TryParse(hdfCodigo.Value, codigoEliminarImagen) Then

        ' Dim archivo As String = hdfArchivo.Value
        'And NivelOrganizacion.EliminarImagen(codigoEliminarImagen
        If System.IO.File.Exists(archivo) Then
            System.IO.File.Delete(archivo)
            flUpload.Visible = True
            btneliminar.Visible = False
            btnsubir.Visible = True
            imgIcono.Visible = False
            hdfIconoArchivo.Value = "0"
        End If

        imgIcono.ImageUrl = ""
        'End If
    End Sub

    Protected Sub btnsubir_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnsubir.Click
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/Temporal/"), "/")

        If SubirArchivo() Then
            imgIcono.Visible = True
            imgIcono.ImageUrl = "~/Images/Temporal" + CarpetaDominio + "/" + hdfIconoArchivo.Value
            flUpload.Visible = False
            btnsubir.Visible = False
            btneliminar.Visible = True
        End If
    End Sub

    Private Function SubirArchivo() As Boolean
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/") + "Images\Temporal\", "\")

        Dim sFileDir As String = Server.MapPath("~/") + "Images\Temporal" + CarpetaDominio + "\"

        Dim lMaxFileSize As Long = 50000
        Dim fecha As New Date
        'Dim en As String = Guid.NewGuid().ToString()

        If (Not flUpload.PostedFile Is Nothing) And (flUpload.PostedFile.ContentLength > 0) Then
            Dim sFileName As String = System.IO.Path.GetFileName(imgIcono.ImageUrl)
            'If sFileName.Equals(String.Empty) Then
            '    sFileName = flUpload.PostedFile.ContentLength & "-prueba.ico"
            'End If

            sFileName = Guid.NewGuid.ToString.Replace("-", "") & sFileName & ".ico"

            Try
                If flUpload.PostedFile.ContentLength <= lMaxFileSize Then
                    flUpload.PostedFile.SaveAs(sFileDir + sFileName)
                    hdfIconoArchivo.Value = sFileName
                    Session("imagenCargada") = flUpload.FileBytes
                    lblmensaje.Text = ""
                    Return True
                Else
                    lblmensaje.Text = "El archivo es muy grande"
                    hdfIconoArchivo.Value = "0"
                    imgIcono.Visible = False
                    flUpload.Visible = True
                    btneliminar.Visible = False
                    btnsubir.Visible = True
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
End Class
