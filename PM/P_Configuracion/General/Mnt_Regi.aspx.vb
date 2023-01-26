Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Web.UI.WebControls.WebParts
Imports System.Web.UI.HtmlControls
Imports System.Drawing.Image
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.General.BL

Partial Class General_Administrar_Mantenimiento_Mnt_Regi
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim Regi As BL_GEN_Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oRegi As ENT_GEN_Regi = Regi.Listar()
                    Regi.Dispose()

                    hdfPais.Value = oRegi.REGI_F_vcCODPAI
                    TxtPais.Text = oRegi.REGI_F_vcNOMPAI
                    txtNombre.Text = oRegi.REGI_vcNOMEMP.Replace("&#39", "'")
                    txtDireccion.Text = oRegi.REGI_vcDIREMP.Replace("&#39", "'")
                    txtRUC.Text = oRegi.REGI_vcRuc.Replace("&#39", "'")

                    For i As Integer = 1 To 31
                        ddlDia.Items.Add(New ListItem(i.ToString(), i.ToString()))
                    Next
                    For j As Integer = 1 To 12
                        ddlMes.Items.Add(New ListItem(j.ToString(), j.ToString()))
                    Next


                    ddlConfigHorario.Items.Add(New ListItem("Horario laboral", "0"))
                    ddlConfigHorario.Items.Add(New ListItem("Sin horario establecido", "1"))

                    'txtDesUsu.Text = oRegi.REGI_vcDESUSU
                    'chkCC.Checked = IIf(oRegi.REGI_btPreguntarActualizacionCCostoMoverEmpleado, True, False)
                    'chkDemanda.Checked = IIf(oRegi.REGI_btCargarOrganizacionBajoDemanda, True, False)
                    'chkMantenimiento.Checked = IIf(oRegi.REGI_btMostrarDatosMantenimientos, True, False)
                    'chkSucursales.Checked = IIf(oRegi.REGI_btTrabajaSucursalesFisicas, True, False)
                    'chkCya.Checked = IIf(oRegi.REGI_AsociaCYA, True, False)
                    'chkCero.Checked = IIf(oRegi.REGI_btAreaCosCero, True, False)


                    'Dim bytes As Byte() = Regi.Listar().REGI_imLOGEMP
                    'Dim base64String As String = Convert.ToBase64String(bytes, 0, bytes.Length)
                    'imgIcono.ImageUrl = "data:image/png;base64," + base64String
                    imgIcono.Visible = True

                    hdfMostrarLogo.Value = oRegi.REGI_btMostrarLogoEnCabecera

                    'agregado 13-08-2015 wapumayta
                    Dim Dominio As String = String.Empty
                    If Not IsNothing(HttpContext.Current.Session("IdDominio")) Then
                        Dominio = HttpContext.Current.Session("IdDominio").ToString()
                    End If
                    imgIcono.ImageUrl = "~/Common/Controladores/ImagenDinamica.ashx?Tipo=Cliente&Dominio=" & Dominio

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    Private Function SubirArchivo() As Boolean
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/") + "\Images\Temporal\", "\")

        Dim sFileDir As String = Server.MapPath("~/") + "Images\Temporal" + CarpetaDominio + "\"
        Dim lMaxFileSize As Long = 1000 * 1024

        If (Not flUpload.PostedFile Is Nothing) And (flUpload.PostedFile.ContentLength > 0) Then
            Dim sFileName As String = flUpload.FileName 'System.IO.Path.GetFileName(imgIcono.ImageUrl)
            Try
                If flUpload.PostedFile.ContentLength <= lMaxFileSize Then
                    Dim sExtension As String = sFileName.Substring(sFileName.LastIndexOf(".") + 1)

                    If sExtension = "jpg" Or sExtension = "jpeg" Or sExtension = "bmp" Or sExtension = "png" Or sExtension = "gif" Then
                        flUpload.PostedFile.SaveAs(sFileDir + sFileName)

                        Dim img As System.Drawing.Image = System.Drawing.Image.FromFile(sFileDir + sFileName)
                        If img.Width > 220 OrElse img.Height > 60 Then
                            lblmensaje.Text = "Verifique el tamaño de la imagen, no puede ser mayor a 220x60 (píxeles). La imagen subida tiene " & img.Width & "x" & img.Height & "."
                            hdfArchivo.Value = ""
                            imgIcono.Visible = False
                            flUpload.Visible = True
                            btnSubir.Visible = True
                            flUpload.Dispose()
                            Return False
                        End If
                        img.Dispose()

                        hdfNombreArchivo.Value = sFileName
                        sFileDir = sFileDir.Replace("\", "\\")
                        sFileName = sFileName.Replace("\", "\\")

                        hdfArchivo.Value = sFileDir + sFileName
                        Session("imagenCargada") = flUpload.FileBytes
                        lblmensaje.Text = ""
                        Return True
                    Else
                        lblmensaje.Text = "Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)"
                        hdfArchivo.Value = ""
                        imgIcono.Visible = False
                        flUpload.Visible = True
                        'btneliminar.Visible = False
                        btnSubir.Visible = True
                        Return False
                    End If
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
    Public Shared Function Actualizar(ByVal oRegi As String, ByVal vcRuta As String, ByVal xml_Feriados As String, ByVal dtoHorarios As List(Of HorarioDTO)) As Integer
        Dim Cliente As BL_GEN_Cliente = Nothing
        Dim Regi As BL_GEN_Regi = Nothing
        Dim blHorario As BL_GEN_Horario = New BL_GEN_Horario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try

            Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oRegi As ENT_GEN_Regi = oSerializer.Deserialize(Of ENT_GEN_Regi)(oRegi)

            If vcRuta <> "" Then
                Dim ms As New MemoryStream()
                vcRuta = vcRuta.Replace("\\", "\")
                Dim newImage As System.Drawing.Image = System.Drawing.Image.FromFile(vcRuta)
                Dim extensionImage As String = Path.GetExtension(vcRuta).ToUpper().Replace(".", "")
                Select Case extensionImage
                    Case "PNG" : newImage.Save(ms, System.Drawing.Imaging.ImageFormat.Png)
                    Case "BMP" : newImage.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp)
                    Case Else : newImage.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg)
                End Select
                Dim arreglo As Byte() = ms.ToArray()
                v_oRegi.REGI_imLOGEMP = arreglo
            Else
                v_oRegi.REGI_imLOGEMP = Regi.Listar().REGI_imLOGEMP
            End If

            Cliente = New BL_GEN_Cliente(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCLiente As New ENT_GEN_Cliente
            oCLiente.P_inCod = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            oCLiente.vbLogCli = v_oRegi.REGI_imLOGEMP
            oCLiente.vcNomCli = v_oRegi.REGI_vcNOMEMP
            oCLiente.vcDireccion = v_oRegi.REGI_vcDIREMP
            oCLiente.REGI_btMostrarLogoEnCabecera = v_oRegi.REGI_btMostrarLogoEnCabecera

            Cliente.GuardarLogo(oCLiente)

            Dim listaHorarios As List(Of ENT_GEN_Horario) = New List(Of ENT_GEN_Horario)



            For Each horario In dtoHorarios

                Dim horaInicial As DateTime = New DateTime(1999, 1, 1, horario.horaInicial, horario.minutoInicial, 0)
                Dim horaFinal As DateTime = New DateTime(1999, 1, 1, horario.horaFinal, horario.minutoFinal, 0)

                listaHorarios.Add(New ENT_GEN_Horario(horario.idDiaSemana, horario.vcNom, horario.btLaborable, horaInicial, horaFinal))
            Next


            Dim _return As Integer = Regi.Actualizar(v_oRegi, xml_Feriados)
            blHorario.ActualizarHorario(listaHorarios)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cliente IsNot Nothing Then Cliente.Dispose()
            If Regi IsNot Nothing Then Regi.Dispose()
        End Try
    End Function

    Protected Sub btnSubir_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnSubir.Click
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

    <WebMethod()>
    Public Shared Function ListarHorarioEmpresa() As Object
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim blHorario As BL_GEN_Horario = New BL_GEN_Horario(oUsuario.IdCliente)

            Dim listaHorariosDto As List(Of HorarioDTO) = New List(Of HorarioDTO)

            For Each horario In blHorario.Listar()
                listaHorariosDto.Add(New HorarioDTO With {
                    .idDiaSemana = horario.IdDiaSemana.ToString(),
                    .vcNom = horario.VcNom,
                    .btLaborable = horario.BtLaborable.ToString(),
                    .horaInicial = horario.HoraInicial.Hour.ToString(),
                    .minutoInicial = horario.HoraInicial.Minute.ToString(),
                    .horaFinal = horario.HoraFinal.Hour.ToString(),
                    .minutoFinal = horario.HoraFinal.Minute.ToString()
                })
            Next

            Return listaHorariosDto

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    'Protected Sub btnEliminar_Click(sender As Object, e As System.EventArgs) Handles btnEliminar.Click
    '    'Dim archivo As String = Server.MapPath("~/") + "Images/Temporal\" + hdfArchivo.Value
    '    Dim archivo As String = Server.MapPath(imgIcono.ImageUrl)
    '    Dim NivelOrganizacion As BL_GEN_NivelOrganizacion = new BL_GEN_NivelOrganizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '    'Dim directorio As String = System.IO.Path.GetDirectoryName()
    '    'archivo = 
    '    ''hdfCodigo.Value
    '    'Dim codigoEliminarImagen As New Integer
    '    'If Integer.TryParse(hdfCodigo.Value, codigoEliminarImagen) Then

    '    ' Dim archivo As String = hdfArchivo.Value
    '    'And NivelOrganizacion.EliminarImagen(codigoEliminarImagen
    '    If System.IO.File.Exists(archivo) Then
    '        System.IO.File.Delete(archivo)
    '        flUpload.Visible = True
    '        btnEliminar.Visible = False
    '        btnSubir.Visible = True
    '        imgIcono.Visible = False
    '        hdfArchivo.Value = "0"
    '    End If
    '    'End If
    'End Sub

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function ListarFeriados(ByVal codPais As String) As Object

        Dim Feriado As BL_GEN_Feri = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Feriado = New BL_GEN_Feri(oUsuario.IdCliente)

            Return Feriado.Listar(codPais)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Feriado IsNot Nothing Then Feriado.Dispose()
        End Try

    End Function

    <WebMethod()>
    Public Shared Function ListarHorarios() As Object

        Dim blHorario As BL_GEN_Horario = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            blHorario = New BL_GEN_Horario(oUsuario.IdCliente)

            Return blHorario.Listar()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            'Finally
            '    If Feriado IsNot Nothing Then Feriado.Dispose()
        End Try

    End Function


    Public Shared Function ImagenABytes(ByVal imagen As System.Drawing.Image) As Byte()
        Dim ms As New MemoryStream()
        imagen.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg)
        Dim arreglo As Byte() = ms.ToArray
        Return arreglo
    End Function

End Class

Public Class HorarioDTO
    Public idDiaSemana As String
    Public vcNom As String
    Public btLaborable As String
    Public horaInicial As String
    Public minutoInicial As String
    Public horaFinal As String
    Public minutoFinal As String
End Class
