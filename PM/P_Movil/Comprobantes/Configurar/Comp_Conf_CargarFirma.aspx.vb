Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports VisualSoft.Suite80.BE

Public Class Comp_Conf_CargarFirma
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim nombreImagen As String = String.Empty
        Try
            If Not Page.IsPostBack Then
                hdfCodigo.Value = Request.QueryString("Id")
                Dim imagen As Byte() = CType(Session("ImagenActualFirma"), Byte())
                Session.Contents.Remove("ImagenActualFirma")
                'CType(HttpContext.Current.Session("imagenCargada"), Byte())
                CheckPath(HttpContext.Current.Server.MapPath("~") & "/Temporal\Comprobantes")

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
                        imgIcono.ImageUrl = "../../../Temporal/Comprobantes/Firma_" + hdfCodigo.Value & ".jpg"
                    Else
                        flUpload.Visible = False
                        btnsubir.Visible = False
                        btneliminar.Visible = True

                        Try
                            nombreImagen = Guid.NewGuid.ToString.Replace("-", "") & "_Firma_" & hdfCodigo.Value & ".jpg"
                            Dim strfn As String = Server.MapPath("~/Temporal/Comprobantes/" + nombreImagen)
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
                        imgIcono.ImageUrl = "../../../Temporal/Comprobantes/" + nombreImagen
                        hdfIconoArchivo.Value = Guid.NewGuid.ToString.Replace("-", "") & "_Firma_" & hdfCodigo.Value & ".jpg"
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
        Session.Contents.Remove("imagenCargada")
        'End If
    End Sub

    Protected Sub btnsubir_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnsubir.Click

        lblmensaje.Text = ""
        If flUpload.PostedFile.FileName = "" Then
            lblmensaje.Text = "Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)"
            Exit Sub

        ElseIf flUpload.PostedFile.FileName <> "" Then
            Dim valido As Boolean = False
            For Each ext As String In Extensiones()
                If Path.GetExtension(flUpload.PostedFile.FileName).ToString().Equals(ext) Then
                    valido = True
                End If
            Next

            If valido = False Then
                lblmensaje.Text = "Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)"
                Exit Sub
            End If
        End If


        If SubirArchivo() Then

            imgIcono.Visible = True
            imgIcono.ImageUrl = "../../../Temporal/Comprobantes/" + hdfIconoArchivo.Value
            flUpload.Visible = False
            btnsubir.Visible = False
            btneliminar.Visible = True
        End If
    End Sub

    Private Function SubirArchivo() As Boolean
        Dim sFileDir As String = Server.MapPath("~/") + "Temporal\Comprobantes\"

        Dim lMaxFileSize As Long = 500000
        Dim fecha As New Date
        'Dim en As String = Guid.NewGuid().ToString()

        If (Not flUpload.PostedFile Is Nothing) And (flUpload.PostedFile.ContentLength > 0) Then
            Dim sFileName As String = System.IO.Path.GetFileName(imgIcono.ImageUrl)
            'If sFileName.Equals(String.Empty) Then
            '    sFileName = flUpload.PostedFile.ContentLength & "-prueba.ico"
            'End If

            sFileName = Guid.NewGuid.ToString.Replace("-", "") & sFileName & ".jpg"

            Try
                If flUpload.PostedFile.ContentLength <= lMaxFileSize Then
                    flUpload.PostedFile.SaveAs(sFileDir + sFileName)
                    hdfIconoArchivo.Value = sFileName
                    Session("imagenCargadaFirma") = flUpload.FileBytes
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

    Private Shared Function Extensiones() As List(Of String)

        Dim lsExtensiones As New List(Of String)

        lsExtensiones.Add(".jpg")
        lsExtensiones.Add(".jpeg")
        lsExtensiones.Add(".bmp")
        lsExtensiones.Add(".png")
        lsExtensiones.Add(".gif")

        Return lsExtensiones


    End Function

    Private Sub CheckPath(ByRef serverPath As String)
        Dim initPath As String = String.Empty
        Dim tempPath As String = String.Empty
        Dim folders As String()

        Try

            folders = serverPath.Split(CChar("\\"))

            ' Save file to a server
            If serverPath.Contains("\\") Then
                initPath = "\\"
            Else
                ' Save file to a local folders
            End If

            For i As Integer = 0 To folders.Length - 1
                If tempPath.Trim = String.Empty And _
                folders(i) <> String.Empty Then
                    tempPath = initPath & folders(i)
                ElseIf tempPath.Trim <> String.Empty And _
                folders(i).Trim <> String.Empty Then
                    tempPath = tempPath & "\" & folders(i)

                    ' Doesn't check if it's a network connection
                    If Not tempPath.Contains("\\") And _
                    Not folders(i).Contains("$") Then

                        If Not System.IO.Directory.Exists(tempPath) Then
                            System.IO.Directory.CreateDirectory(tempPath)
                        End If

                    Else
                        If Not System.IO.Directory.Exists(tempPath) Then
                            System.IO.Directory.CreateDirectory(tempPath)
                        End If

                    End If

                End If

            Next

            serverPath = tempPath & "\"

        Catch ex As Exception
            Throw
        End Try
    End Sub

End Class