Imports System.IO
Imports VisualSoft.PCSistelMovil.ProcesoImportacion
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BE
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BL
Imports VisualSoft.PCSistelMovil.ProcesoImportacion.BE
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Public Class Imp_CargarArchivo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try

            Dim Script As String = "var mostrarAlerta = false; var textoAlerta = ''; "
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey1", Script, True)

            hdfNombreTemporarl.Value = Request.QueryString("nombArch")

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    'Protected Sub btnSubir_Click(sender As Object, e As System.EventArgs) Handles btnSubir.Click
    '    Dim bl_ConfigProceso As BL_IMP_DAT_ConfigProceso = Nothing
    '    Dim bl_ProcArchivo As BL_IMP_DAT_ProcesoArchivo = Nothing
    '    Try
    '        bl_ProcArchivo = New BL_IMP_DAT_ProcesoArchivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        bl_ConfigProceso = New BL_IMP_DAT_ConfigProceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim codConfigProceso As Integer = Convert.ToInt32(hdfCodConfig.Value)
    '        Dim dt As DataTable = bl_ConfigProceso.ObtenerConfigProcesoxId(codConfigProceso)
    '        Dim oTipoFuente As New ENT_IMP_DAT_TipoFuenteUNC()
    '        Dim oFuenteArc As New ENT_IMP_DAT_FuenteArchivo()
    '        If dt.Rows.Count > 0 Then
    '            For Each dr As DataRow In dt.Rows
    '                If Convert.ToInt32(dr("idFuenteArchivo").ToString()) > 0 Then
    '                    oTipoFuente.IdFuente = Convert.ToInt32(dr("idFuenteUNC").ToString())
    '                    oTipoFuente.Ruta = dr("Ruta").ToString()
    '                    oTipoFuente.Tipo = dr("tipoFuente").ToString()
    '                    oFuenteArc.Extension = dr("Extension").ToString()
    '                    oFuenteArc.NombreArchivo = dr("NombreArchivo").ToString()
    '                End If
    '            Next
    '        End If

    '        If fuAdjuntar.PostedFile.FileName = "" Then
    '            Dim Script As String = "mostrarAlerta = false; textoAlerta = 'No ha seleccionado ningún archivo'; "
    '            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
    '            Exit Sub
    '        Else
    '            Dim nombArc As String = oFuenteArc.NombreArchivo & oFuenteArc.Extension

    '            Dim s As Stream = fuAdjuntar.PostedFile.InputStream
    '            Dim filePath As String = fuAdjuntar.PostedFile.FileName
    '            Dim fileName As String = Path.GetFileName(filePath)

    '            Dim br As New BinaryReader(s)
    '            Dim bytes As Byte() = br.ReadBytes(s.Length)

    '            If nombArc.Equals(fileName) Then

    '                Dim nTemp As String = fileName
    '                'validar tamaño de ruta de archivo
    '                If (Server.MapPath("~/General/Administrar/Importacion/Temporal").Length + nTemp.Length > 248) Then
    '                    Dim Script As String = "mostrarAlerta = true; textoAlerta = 'La ruta de acceso especificada o el nombre de archivo (o ambos) son demasiado largos. El nombre de archivo completo debe ser inferior a 260 caracteres y el nombre del directorio debe ser inferior a 248.'; "
    '                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
    '                    Exit Sub
    '                End If
    '                Dim strfn As String = Server.MapPath("~/General/Administrar/Importacion/Temporal/" & nTemp)

    '                'validaciones por tipo de solicitud
    '                Dim adjGrabar As Boolean = True
    '                Dim msgValid As String = String.Empty

    '                If adjGrabar Then
    '                    'escribir archivo temporal
    '                    Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
    '                    fs.Write(bytes, 0, bytes.Length)
    '                    fs.Flush()
    '                    fs.Close()

    '                    Dim Script As String = "mostrarAlerta = true; textoAlerta = '" + fileName + "'; "
    '                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
    '                Else
    '                    Dim Script As String = "mostrarAlerta = true; textoAlerta = '" + msgValid + "'; "
    '                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
    '                    Exit Sub
    '                End If

    '            Else
    '                Dim Script As String = "mostrarAlerta = false; textoAlerta = 'Archivo: " + fileName + ",  diferente al de configuración (" + nombArc + ").'; "
    '                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
    '                Exit Sub
    '            End If

    '        End If
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If bl_ConfigProceso IsNot Nothing Then bl_ConfigProceso.Dispose()
    '    End Try
    'End Sub

    Protected Sub btnSubirArchivo_Click(sender As Object, e As EventArgs) Handles btnSubirArchivo.Click
        lblmensaje.Text = ""
        If fuAdjuntar.PostedFile.FileName = "" Then
            lblmensaje.Text = "Seleccione un archivo del tipo excel(xls, xlsx)"
            Exit Sub

        ElseIf fuAdjuntar.PostedFile.FileName <> "" Then
            Dim valido As Boolean = False
            For Each ext As String In Extensiones()
                If Path.GetExtension(fuAdjuntar.PostedFile.FileName).ToString().Equals(ext) Then
                    valido = True
                    Exit For
                End If
            Next

            If valido = False Then
                lblmensaje.Text = "Seleccione un archivo del tipo excel(xls, xlsx)"
                Exit Sub
            End If
        End If

        If SubirArchivo() Then
            lblArchivo.Visible = True

            'imgIcono.ImageUrl = "../../../Temporal/Comprobantes/" + hdfIconoArchivo.Value
            fuAdjuntar.Visible = False
            btnSubirArchivo.Visible = False
            btnEliminar.Visible = True
        End If

    End Sub

    Private Function SubirArchivo() As Boolean

        Dim bl_ConfigProceso As BL_IMP_DAT_ConfigProceso = Nothing
        Dim bl_ProcArchivo As BL_IMP_DAT_ProcesoArchivo = Nothing
        Try
            bl_ProcArchivo = New BL_IMP_DAT_ProcesoArchivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            bl_ConfigProceso = New BL_IMP_DAT_ConfigProceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim codConfigProceso As Integer = Convert.ToInt32(hdfCodConfig.Value)
            Dim dt As DataTable = bl_ConfigProceso.ObtenerConfigProcesoxId(codConfigProceso)
            Dim oTipoFuente As New ENT_IMP_DAT_TipoFuenteUNC()
            Dim oFuenteArc As New ENT_IMP_DAT_FuenteArchivo()
            If dt.Rows.Count > 0 Then
                For Each dr As DataRow In dt.Rows
                    If Convert.ToInt32(dr("idFuenteArchivo").ToString()) > 0 Then
                        oTipoFuente.IdFuente = Convert.ToInt32(dr("idFuenteUNC").ToString())
                        oTipoFuente.Ruta = dr("Ruta").ToString()
                        oTipoFuente.Tipo = dr("tipoFuente").ToString()
                        oFuenteArc.Extension = dr("Extension").ToString()
                        oFuenteArc.NombreArchivo = dr("NombreArchivo").ToString()
                    End If
                Next
            End If

            If fuAdjuntar.PostedFile.FileName = "" Then
                Dim Script As String = "mostrarAlerta = false; textoAlerta = 'No ha seleccionado ningún archivo'; "
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                Exit Function
            Else
                Dim nombArc As String
                If oFuenteArc.NombreArchivo.Contains(oFuenteArc.Extension) Then
                    nombArc = oFuenteArc.NombreArchivo
                Else
                    nombArc = oFuenteArc.NombreArchivo & oFuenteArc.Extension
                End If
                'Dim nombArc As String = oFuenteArc.NombreArchivo & oFuenteArc.Extension

                Dim s As Stream = fuAdjuntar.PostedFile.InputStream
                Dim filePath As String = fuAdjuntar.PostedFile.FileName
                Dim fileName As String = Path.GetFileName(filePath)

                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/General/Administrar/Importacion/Temporal/"), "/")

                Dim archivo As String = Server.MapPath("~/General/Administrar/Importacion/Temporal" + CarpetaDominio + "/" & fileName)
                If File.Exists(archivo) Then
                    File.Delete(archivo)
                End If
                
                Dim br As New BinaryReader(s)
                Dim bytes As Byte() = br.ReadBytes(s.Length)


                If nombArc.Equals(fileName) Then

                    Dim nTemp As String = fileName
                    'validar tamaño de ruta de archivo
                    If (Server.MapPath("~/General/Administrar/Importacion/Temporal").Length + nTemp.Length > 248) Then
                        Dim Script As String = "mostrarAlerta = true; textoAlerta = 'La ruta de acceso especificada o el nombre de archivo (o ambos) son demasiado largos. El nombre de archivo completo debe ser inferior a 260 caracteres y el nombre del directorio debe ser inferior a 248.'; "
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                        Exit Function
                    End If

                    hdfArcTemp.Value = nTemp
                    Dim strfn As String = Server.MapPath("~/General/Administrar/Importacion/Temporal" + CarpetaDominio + "/" & nTemp)

                    'validaciones por tipo de solicitud
                    Dim adjGrabar As Boolean = True
                    Dim msgValid As String = String.Empty

                    If adjGrabar Then
                        'escribir archivo temporal
                        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs.Write(bytes, 0, bytes.Length)
                        fs.Flush()
                        fs.Close()

                        Dim Script As String = "mostrarAlerta = true; textoAlerta = '" + fileName + "'; "
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)


                        lblArchivo.Text = filePath

                        Return True


                    Else
                        Dim Script As String = "mostrarAlerta = true; textoAlerta = '" + msgValid + "'; "
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)

                        lblArchivo.Text = ""
                        Return False
                        'Exit Function

                    End If

                Else
                    Dim Script As String = "mostrarAlerta = false; textoAlerta = 'Archivo: " + fileName + ",  diferente al de configuración (" + nombArc + ").'; "
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)


                    Exit Function
                End If

                End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_ConfigProceso IsNot Nothing Then bl_ConfigProceso.Dispose()
            If bl_ProcArchivo IsNot Nothing Then bl_ProcArchivo.Dispose()
        End Try

    End Function

    Private Shared Function Extensiones() As List(Of String)

        Dim lsExtensiones As New List(Of String)

        lsExtensiones.Add(".xls")
        lsExtensiones.Add(".xlsx")
        lsExtensiones.Add(".txt")
        lsExtensiones.Add(".csv")

        Return lsExtensiones


    End Function

    Protected Sub btnEliminar_Click(sender As Object, e As EventArgs) Handles btnEliminar.Click
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/General/Administrar/Importacion/Temporal/"), "/")
        Dim archivo As String = Server.MapPath("~/General/Administrar/Importacion/Temporal" + CarpetaDominio + "/" & hdfArcTemp.Value)
        Dim msgValid As String = String.Empty
        If File.Exists(archivo) Then
            File.Delete(archivo)
            fuAdjuntar.Visible = True
            btnEliminar.Visible = False
            btnSubirArchivo.Visible = True
            lblArchivo.Visible = False

            Dim Script As String = "mostrarAlerta = true; textoAlerta = '" + msgValid + "'; "
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)

        End If

        lblArchivo.Text = ""

    End Sub

    Protected Sub btnLimpiar_Click(sender As Object, e As EventArgs) Handles btnLimpiar.Click
        fuAdjuntar.Visible = True
        btnEliminar.Visible = False
        btnSubirArchivo.Visible = True
        lblArchivo.Visible = False
        lblArchivo.Text = ""
        fuAdjuntar.Dispose()
    End Sub
End Class