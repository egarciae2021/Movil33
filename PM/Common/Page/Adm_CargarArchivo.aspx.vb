Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.IO

Partial Class Common_Page_Adm_CargarArchivo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfFormatos.Value = Request.QueryString("Formatos")
                    hdfFormatoTipo.Value = Request.QueryString("FormatoTipo")
                    hdfAceptavariosArchivos.Value = Request.QueryString("AceptaNArchivos")
                    hdfAdjuntarFactura.Value = Request.QueryString("AdjuntarFactura")
                    hdfPlantillaImportacion.Value = Request.QueryString("PlantillaImportacion")

                    'If hdfFormatos.Value = "" Then
                    '    ttgInfoExtensiones.Mensaje = "Extensiones Permitidas: txt, doc, docx, xls, xlsx, pdf, jpg, png."
                    'Else
                    '    ttgInfoExtensiones.Mensaje = "Extensiones Permitidas: " & hdfFormatos.Value.ToString()
                    'End If

                    'hdfTipoCarga.Value = Request.QueryString("TipoCarga") ' 1 subir archivo, 2 exportar excel

                    Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/") + "/Images/Temporal/", "/")
                    UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/") + "/P_Movil/Administrar/SubContratos/", "/")

                    Dim vcRutaCarpeta = Request.QueryString("RutaCarpeta")
                    If (IsNothing(vcRutaCarpeta)) Then
                        hdfRutaCarpeta.Value = "Images/Temporal" + CarpetaDominio + "/"
                    Else
                        hdfRutaCarpeta.Value = vcRutaCarpeta
                    End If
                    'Else
                    '    hdfFormatos.Value = Request.QueryString("Formatos")
                    '    hdfFormatoTipo.Value = Request.QueryString("FormatoTipo")
                    '    hdfAceptavariosArchivos.Value = Request.QueryString("AceptaNArchivos")

                    '    If hdfFormatos.Value = "" Then
                    '        ttgInfoExtensiones.Mensaje = "Extensiones Permitidas: txt, doc, docx, xls, xlsx, pdf, jpg, png."
                    '    Else
                    '        ttgInfoExtensiones.Mensaje = "Extensiones Permitidas: " & hdfFormatos.Value.ToString()
                    '    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub btnCargar_Click(sender As Object, e As System.EventArgs) Handles btnCargar.Click
        Try
            If (Not fulArchivo.PostedFile Is Nothing) And (fulArchivo.PostedFile.ContentLength > 0) Then
                Dim fechaansi As String = DateTime.Now.ToString("yyyyMMddhhmmss")
                hdfNombreArchivoCargado.Value = fulArchivo.PostedFile.FileName
                Dim strfn As String = Server.MapPath("~/" & hdfRutaCarpeta.Value & Path.GetFileNameWithoutExtension(hdfNombreArchivoCargado.Value) & "_" & fechaansi & Path.GetExtension(hdfNombreArchivoCargado.Value))
                hdfNombreArchivoFisico.Value = hdfRutaCarpeta.Value & Path.GetFileNameWithoutExtension(hdfNombreArchivoCargado.Value) & "_" & fechaansi & Path.GetExtension(hdfNombreArchivoCargado.Value)
                fulArchivo.PostedFile.SaveAs(strfn)
                Dim script As String
                If hdfAdjuntarFactura.Value = "1" Then
                    script = "Inicio();CargarArchivoParentFactura();"
                ElseIf hdfAdjuntarFactura.Value = "2" Then
                    script = "Inicio();CargarArchivoParentFactura_Import();"
                Else
                    script = "Inicio();CargarArchivoParent();"
                End If

                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub btnCargarImages_Click(sender As Object, e As EventArgs) Handles btnCargarImages.Click
        Try
            Dim fechaansi As String = DateTime.Now.ToString("yyyyMMddhhmmss")
            If (Not fulArchivo.PostedFile Is Nothing) And (fulArchivo.PostedFile.ContentLength > 0) Then
                hdfNombreArchivoCargado.Value = fulArchivo.PostedFile.FileName
                Dim strfn As String = Server.MapPath("~/" & hdfRutaCarpeta.Value & Path.GetFileNameWithoutExtension(hdfNombreArchivoCargado.Value) & "_" & fechaansi & Path.GetExtension(hdfNombreArchivoCargado.Value))
                hdfNombreArchivoFisico.Value = hdfRutaCarpeta.Value & Path.GetFileNameWithoutExtension(hdfNombreArchivoCargado.Value) & "_" & fechaansi & Path.GetExtension(hdfNombreArchivoCargado.Value)
                fulArchivo.PostedFile.SaveAs(strfn)
                If (Not fulImages.PostedFile Is Nothing) And (fulImages.PostedFile.ContentLength > 0) Then
                    hdfNombreImagesCargado.Value = fulImages.PostedFile.FileName
                    Dim strImages As String = Server.MapPath("~/" & hdfRutaCarpeta.Value & Path.GetFileNameWithoutExtension(hdfNombreImagesCargado.Value) & "_" & fechaansi & Path.GetExtension(hdfNombreImagesCargado.Value))
                    hdfNombreImagesFisico.Value = hdfRutaCarpeta.Value & Path.GetFileNameWithoutExtension(hdfNombreImagesCargado.Value) & "_" & fechaansi & Path.GetExtension(hdfNombreImagesCargado.Value)
                    fulImages.PostedFile.SaveAs(strImages)

                    Dim script As String
                    script = "Inicio();CargarArchivoParentFactura_Import_LineasImages();"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class