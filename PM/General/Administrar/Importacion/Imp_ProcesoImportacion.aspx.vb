Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports System.IO
Imports System.Data.OleDb
Imports VisualSoft.PCSistelMovil.ProcesoImportacion.BE
Imports VisualSoft.PCSistelMovil.ProcesoImportacion.BL
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BL
Imports VisualSoft.PCSistelMovil.ProcesoImportacion

Public Class Imp_ProcesoImportacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Plantilla As BL_IMP_DAT_Plantilla = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Plantilla = New BL_IMP_DAT_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<< Seleccionar >>"), "vcNomOpe", "P_inCodOpe")

                    hdfbtPregunto.Value = "0"
                    hdfbtSobreescribe.Value = "0"

                    ifrmCargar.Style("display") = "none"

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarTipoProcesos(p_tipo As String, p_valor As String) As List(Of ENT_IMP_DAT_ConfigProceso)
        Dim bl_ConfigProc As BL_IMP_DAT_ConfigProceso = Nothing
        Try
            bl_ConfigProc = New BL_IMP_DAT_ConfigProceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstConfig As New List(Of ENT_IMP_DAT_ConfigProceso)

            lstConfig = bl_ConfigProc.ListarProceso(p_tipo, p_valor)

            Return lstConfig

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_ConfigProc IsNot Nothing Then bl_ConfigProc.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarPlantilla(cod As String) As ENT_IMP_DAT_Plantilla
        Dim bl_Plantilla As BL_IMP_DAT_Plantilla = Nothing
        Try
            bl_Plantilla = New BL_IMP_DAT_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim ent_ As New ENT_IMP_DAT_Plantilla()
            ent_ = bl_Plantilla.Mostrar(cod)

            Return ent_
        Catch ex As Exception
            Return Nothing
            ''Dim util As New Utilitarios
            ''util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            ''Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Plantilla IsNot Nothing Then bl_Plantilla.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerFuenteArchivo(cod As String) As ENT_IMP_DAT_FuenteArchivo
        Dim bl_FuenteArchivo As BL_IMP_DAT_FuenteArchivo = Nothing
        Try
            bl_FuenteArchivo = New BL_IMP_DAT_FuenteArchivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oFuenteArchivo As ENT_IMP_DAT_FuenteArchivo = bl_FuenteArchivo.ObtenerFuenteArchivoxIdConfig(cod)

            Return oFuenteArchivo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            Return Nothing
        Finally
            If bl_FuenteArchivo IsNot Nothing Then bl_FuenteArchivo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValidarArchivos(ByVal vcFiles As String) As String
        Dim bl_IMP_Proceso As BL_IMP_DAT_Proceso = Nothing

        Try
            bl_IMP_Proceso = New BL_IMP_DAT_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim Files As String() = vcFiles.Substring(1, vcFiles.Length - 1).Replace("   Remover ", "").Split(",")
            Dim strRetorna = "1"
            Dim dtArchivos As New DataTable()
            dtArchivos = bl_IMP_Proceso.ListarArchivosDiferentes()

            'valida
            For i As Integer = 0 To Files.Length - 1
                For j As Integer = 0 To dtArchivos.Rows.Count - 1
                    If (Files(i) = dtArchivos.Rows(j)("nombreArchivo").ToString()) Then
                        strRetorna = "0"
                        Exit For
                    End If
                Next

                If strRetorna = "0" Then
                    Exit For
                End If
            Next

            Return strRetorna
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_IMP_Proceso IsNot Nothing Then bl_IMP_Proceso.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar(idConfig As String, objProceso As String, nomArch As String, p_band As Boolean, btEliCta As Boolean) As String
        Dim bl_Proceso As BL_IMP_DAT_Proceso = Nothing
        Dim bl_ConfigProceso As BL_IMP_DAT_ConfigProceso = Nothing
        Try
            bl_ConfigProceso = New BL_IMP_DAT_ConfigProceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oProceso As ENT_IMP_DAT_Proceso = oSerializer.Deserialize(Of ENT_IMP_DAT_Proceso)(objProceso)

            Dim codConfigProceso As Integer = Convert.ToInt32(CInt(idConfig))
            Dim dt As DataTable = bl_ConfigProceso.ObtenerConfigProcesoxId(codConfigProceso)

            Dim oConfigProceso As New ENT_IMP_DAT_ConfigProceso(), oPlantilla As New ENT_IMP_DAT_Plantilla()
            Dim oConfig_Fuente As New ENT_IMP_DAT_Config_Fuente(), oFuenteArchivo As New ENT_IMP_DAT_FuenteArchivo()
            Dim oTipoFuente As New ENT_IMP_DAT_TipoFuenteUNC()

            If dt.Rows.Count > 0 Then
                For Each dr As DataRow In dt.Rows

                    oConfigProceso.IdConfigProceso = dr("IdConfigProceso").ToString()
                    oConfigProceso.Descripcion = dr("Descripcion").ToString()
                    oConfigProceso.IdFormato = Convert.ToInt32(dr("IdFormato").ToString())
                    oConfigProceso.IdConfigFuente = Convert.ToInt32(dr("IdConfigFuente").ToString())
                    oConfigProceso.IdCliente = Convert.ToInt32(dr("IdCliente").ToString())
                    oConfigProceso.Tipo = dr("Tipo").ToString()

                    oPlantilla.IdPlantilla = Convert.ToInt32(dr("IdPlantilla").ToString())
                    oPlantilla.Nombre = dr("Nombre").ToString()
                    oPlantilla.Descripcion = dr("descPlantilla").ToString()
                    oPlantilla.F_inEntidad = Convert.ToInt32(dr("F_inEntidad").ToString())
                    oPlantilla.PosicionFila = dr("PosicionFila").ToString()
                    oPlantilla.NombreHoja = dr("NombreHoja").ToString()
                    oPlantilla.Separador = dr("Separador").ToString()

                    oConfig_Fuente.IdConfigFuente = Convert.ToInt32(dr("IdConfigFuente").ToString())
                    oConfig_Fuente.IdFuenteBD = Convert.ToInt32(dr("idFuenteBD").ToString())
                    oConfig_Fuente.IdFuenteArchivo = Convert.ToInt32(dr("idFuenteArchivoFC").ToString())
                    oConfig_Fuente.RutaErrores = dr("RutaErrores").ToString()
                    oConfig_Fuente.RutaLog = dr("RutaLog").ToString()

                    oFuenteArchivo.IdFuente = Convert.ToInt32(dr("idFuenteArchivo").ToString())
                    oFuenteArchivo.IdTipoArchivo = Convert.ToInt32(dr("IdTipoArchivo").ToString())
                    oFuenteArchivo.Password = dr("Password").ToString()
                    oFuenteArchivo.Nombre = dr("nomFuenteArchivo").ToString()
                    oFuenteArchivo.RutaBackup = dr("RutaBackup").ToString()
                    oFuenteArchivo.NombreArchivo = dr("NombreArchivo").ToString()
                    oFuenteArchivo.TipoExtracion = dr("TipoExtracion").ToString()
                    oFuenteArchivo.Extension = dr("Extension").ToString()

                    If Convert.ToInt32(dr("idFuenteArchivo").ToString()) > 0 Then
                        oTipoFuente.IdFuente = Convert.ToInt32(dr("idFuenteUNC").ToString())
                        oTipoFuente.Ruta = dr("Ruta").ToString()
                        oTipoFuente.Tipo = dr("tipoFuente").ToString()
                    End If

                Next

            End If
            Dim nombreArchivoQ15 As String = IIf(oFuenteArchivo.NombreArchivo.Contains(oFuenteArchivo.Extension), oFuenteArchivo.NombreArchivo, oFuenteArchivo.NombreArchivo & oFuenteArchivo.Extension)
            'If nomArch.Equals(oFuenteArchivo.NombreArchivo & oFuenteArchivo.Extension) Then
            If nomArch.Equals(nombreArchivoQ15) Then

                Dim oConfiguracion As New ENT_IMP_DAT_Configuracion()

                Dim lstConfigProceso As List(Of ENT_IMP_DAT_ConfigProceso) = bl_ConfigProceso.ListarConfigProcesoxIdPlantilla(oPlantilla.IdPlantilla)
                For Each oConfProc As ENT_IMP_DAT_ConfigProceso In lstConfigProceso
                    oConfiguracion.IdConfigProceso_Destino = oConfProc.IdConfigProceso
                Next
                oConfiguracion.IdConfigProceso_Origen = oConfigProceso.IdConfigProceso
                oConfiguracion.IdPlantilla = oPlantilla.IdPlantilla
                oConfiguracion.IdTipoArchivo = oFuenteArchivo.IdTipoArchivo

                bl_Proceso = New BL_IMP_DAT_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                If v_oProceso.InProg = 1 Then
                    v_oProceso.FechaProceso = Convert.ToDateTime(v_oProceso.FechaProceso)
                Else
                    v_oProceso.FechaProceso = DateTime.Now
                End If

                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/General/Administrar/Importacion/Temporal/"), "/")

                Dim ubicc As String = "~/General/Administrar/Importacion/Temporal" & CarpetaDominio & "/" & nomArch
                Dim strfn As String = HttpContext.Current.Server.MapPath(ubicc)
                If File.Exists(strfn) Then
                    Dim oProcArchivo As New ENT_IMP_DAT_ProcesoArchivo
                    Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Read)
                        Dim BinaryData(fs.Length - 1) As Byte
                        fs.Read(BinaryData, 0, BinaryData.Length)
                        oProcArchivo.Ruta = oTipoFuente.Ruta
                        oProcArchivo.NombreArchivo = (fs.Name.Substring(fs.Name.LastIndexOf("\") + 1, fs.Name.Length - fs.Name.LastIndexOf("\") - 1))

                        'oProcArchivo.NombreArchivo = fs.Name
                        oProcArchivo.Archivo = BinaryData


                        oProcArchivo.Extension = Path.GetExtension(ubicc).Substring(0)

                        If fs.Length < 1024 Then 'BYTE
                            oProcArchivo.TamanoArchivo = Convert.ToDecimal(fs.Length)
                            oProcArchivo.UniTamano = "bytes"
                        ElseIf fs.Length >= 1024 And fs.Length < 1048576 Then 'KBYTE
                            oProcArchivo.TamanoArchivo = Decimal.Round(Convert.ToDecimal(fs.Length) / 1024, 2)
                            oProcArchivo.UniTamano = "KB"
                        Else 'MBYTE
                            oProcArchivo.TamanoArchivo = Decimal.Round(Convert.ToDecimal(fs.Length) / 1048576, 2)
                            oProcArchivo.UniTamano = "MB"
                        End If

                        fs.Flush()
                        fs.Close()
                    End Using

                    File.Delete(strfn)
                    v_oProceso.Archivos.Add(oProcArchivo)

                End If

                v_oProceso.IdEmpleado = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod

                'Dim v_band As Boolean
                'Select Case p_band
                '    Case "1"
                '        v_band = True
                '    Case Else
                '        v_band = False
                'End Select

                Dim objResult As ENT_IMP_DAT_Proceso = Nothing

                If v_oProceso.Archivos.Count > 0 Then
                    objResult = bl_Proceso.Guardar(v_oProceso, oConfiguracion, p_band, btEliCta)
                Else
                    Return "2"
                End If

                Dim resultado As Integer = objResult.IdProceso

                If resultado = -1 Then
                    Return "2"
                Else
                    Return ""
                End If

            Else
                Return "1"

            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Proceso IsNot Nothing Then bl_Proceso.Dispose()
            If bl_ConfigProceso IsNot Nothing Then bl_ConfigProceso.Dispose()
        End Try
    End Function

    'Protected Sub btnGuardar_Click(ByVal sender As Object, ByVal e As EventArgs) Handles btnGuardarSer.Click
    '    Dim bl_Proceso As BL_IMP_DAT_Proceso = Nothing
    '    Dim bl_ConfigProceso As BL_IMP_DAT_ConfigProceso = Nothing

    '    Try
    '        bl_ConfigProceso = New BL_IMP_DAT_ConfigProceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        Dim codConfigProceso As Integer = Convert.ToInt32(hdfCodConfigProc.Value)
    '        Dim dt As DataTable = bl_ConfigProceso.ObtenerConfigProcesoxId(codConfigProceso)

    '        Dim oConfigProceso As New ENT_IMP_DAT_ConfigProceso(), oPlantilla As New ENT_IMP_DAT_Plantilla()
    '        Dim oConfig_Fuente As New ENT_IMP_DAT_Config_Fuente(), oFuenteArchivo As New ENT_IMP_DAT_FuenteArchivo()
    '        Dim oTipoFuente As New ENT_IMP_DAT_TipoFuenteUNC()
    '        If dt.Rows.Count > 0 Then
    '            For Each dr As DataRow In dt.Rows

    '                oConfigProceso.IdConfigProceso = dr("IdConfigProceso").ToString()
    '                oConfigProceso.Descripcion = dr("Descripcion").ToString()
    '                oConfigProceso.IdFormato = Convert.ToInt32(dr("IdFormato").ToString())
    '                oConfigProceso.IdConfigFuente = Convert.ToInt32(dr("IdConfigFuente").ToString())
    '                oConfigProceso.IdCliente = Convert.ToInt32(dr("IdCliente").ToString())
    '                oConfigProceso.Tipo = dr("Tipo").ToString()

    '                oPlantilla.IdPlantilla = Convert.ToInt32(dr("IdPlantilla").ToString())
    '                oPlantilla.Nombre = dr("Nombre").ToString()
    '                oPlantilla.Descripcion = dr("descPlantilla").ToString()
    '                oPlantilla.F_inEntidad = Convert.ToInt32(dr("F_inEntidad").ToString())
    '                oPlantilla.PosicionFila = dr("PosicionFila").ToString()
    '                oPlantilla.NombreHoja = dr("NombreHoja").ToString()
    '                oPlantilla.Separador = dr("Separador").ToString()

    '                oConfig_Fuente.IdConfigFuente = Convert.ToInt32(dr("IdConfigFuente").ToString())
    '                oConfig_Fuente.IdFuenteBD = Convert.ToInt32(dr("idFuenteBD").ToString())
    '                oConfig_Fuente.IdFuenteArchivo = Convert.ToInt32(dr("idFuenteArchivoFC").ToString())
    '                oConfig_Fuente.RutaErrores = dr("RutaErrores").ToString()
    '                oConfig_Fuente.RutaLog = dr("RutaLog").ToString()

    '                oFuenteArchivo.IdFuente = Convert.ToInt32(dr("idFuenteArchivo").ToString())
    '                oFuenteArchivo.IdTipoArchivo = Convert.ToInt32(dr("IdTipoArchivo").ToString())
    '                oFuenteArchivo.Password = dr("Password").ToString()
    '                oFuenteArchivo.Nombre = dr("nomFuenteArchivo").ToString()
    '                oFuenteArchivo.RutaBackup = dr("RutaBackup").ToString()
    '                oFuenteArchivo.NombreArchivo = dr("NombreArchivo").ToString()
    '                oFuenteArchivo.TipoExtracion = dr("TipoExtracion").ToString()

    '                If Convert.ToInt32(dr("idFuenteArchivo").ToString()) > 0 Then
    '                    oTipoFuente.IdFuente = Convert.ToInt32(dr("idFuenteUNC").ToString())
    '                    oTipoFuente.Ruta = dr("Ruta").ToString()
    '                    oTipoFuente.Tipo = dr("tipoFuente").ToString()
    '                End If

    '            Next

    '        End If

    '        Dim oConfiguracion As New ENT_IMP_DAT_Configuracion()
    '        Dim oProceso As New ENT_IMP_DAT_Proceso()

    '        Dim lstConfigProceso As List(Of ENT_IMP_DAT_ConfigProceso) = bl_ConfigProceso.ListarConfigProcesoxIdPlantilla(oPlantilla.IdPlantilla)
    '        For Each oConfProc As ENT_IMP_DAT_ConfigProceso In lstConfigProceso
    '            oConfiguracion.IdConfigProceso_Destino = oConfProc.IdConfigProceso
    '        Next
    '        oConfiguracion.IdConfigProceso_Origen = oConfigProceso.IdConfigProceso
    '        oConfiguracion.IdPlantilla = oPlantilla.IdPlantilla
    '        oConfiguracion.IdTipoArchivo = oFuenteArchivo.IdTipoArchivo

    '        bl_Proceso = New BL_IMP_DAT_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim files As HttpFileCollection = Request.Files
    '        Dim script As String = ""
    '        Dim Grabar As Boolean = False


    '        'Dim ruta As String = HttpContext.Current.Request.ServerVariables("APPL_PHYSICAL_PATH")
    '        'ruta = ruta.Replace("\\", "0x005C")
    '        'Dim Ruta As String = "..\..\" & ConfigurationManager.AppSettings("RutaImportacion")

    '        For i As Integer = 0 To files.Count - 1
    '            Dim postedFile As HttpPostedFile = files(i)
    '            If postedFile.ContentLength > 0 Then
    '                Dim oArchivo As New ENT_IMP_DAT_ProcesoArchivo
    '                If (hdfbtSobreescribe.Value = "1") Then
    '                    Dim daFecha As DateTime = Now
    '                    Dim vcFecha As String = Now.Year.ToString() & New String("0", 2 - daFecha.Month.ToString().Length) + Now.Month.ToString() & New String("0", 2 - daFecha.Day.ToString().Length) + Now.Day.ToString() & "_" & New String("0", 2 - daFecha.Hour.ToString().Length) + Now.Hour.ToString() & New String("0", 2 - daFecha.Minute.ToString().Length) + Now.Minute.ToString()
    '                    oArchivo.NombreArchivo = (postedFile.FileName.Substring(postedFile.FileName.LastIndexOf("\") + 1, postedFile.FileName.Length - postedFile.FileName.LastIndexOf("\") - 1))
    '                    oArchivo.NombreArchivo = oArchivo.NombreArchivo.Substring(0, oArchivo.NombreArchivo.LastIndexOf(".")) & "_P_" & vcFecha & oArchivo.NombreArchivo.Substring(oArchivo.NombreArchivo.LastIndexOf("."), oArchivo.NombreArchivo.Length - oArchivo.NombreArchivo.LastIndexOf("."))
    '                Else
    '                    oArchivo.NombreArchivo = (postedFile.FileName.Substring(postedFile.FileName.LastIndexOf("\") + 1, postedFile.FileName.Length - postedFile.FileName.LastIndexOf("\") - 1))
    '                End If
    '                oArchivo.Extension = oArchivo.NombreArchivo.Substring(oArchivo.NombreArchivo.LastIndexOf("."), oArchivo.NombreArchivo.Length - oArchivo.NombreArchivo.LastIndexOf("."))

    '                oArchivo.Ruta = oTipoFuente.Ruta

    '                If postedFile.ContentLength < 1024 Then 'BYTE
    '                    oArchivo.TamanoArchivo = Convert.ToDecimal(postedFile.ContentLength)
    '                    oArchivo.UniTamano = "bytes"
    '                ElseIf postedFile.ContentLength >= 1024 And postedFile.ContentLength < 1048576 Then 'KBYTE
    '                    oArchivo.TamanoArchivo = Decimal.Round(Convert.ToDecimal(postedFile.ContentLength) / 1024, 2)
    '                    oArchivo.UniTamano = "KB"
    '                Else 'MBYTE
    '                    oArchivo.TamanoArchivo = Decimal.Round(Convert.ToDecimal(postedFile.ContentLength) / 1048576, 2)
    '                    oArchivo.UniTamano = "MB"
    '                End If
    '                Dim archivo As Byte() = New Byte(postedFile.InputStream.Length - 1) {}
    '                postedFile.InputStream.Read(archivo, 0, archivo.Length)
    '                oArchivo.Archivo = archivo
    '                'postedFile.SaveAs(Server.MapPath(oTipoFuente.Ruta) & oArchivo.NombreArchivo)

    '                oProceso.Archivos.Add(oArchivo)
    '                Grabar = True
    '            End If
    '        Next

    '        If hdfNomArchivo.Value <> "" Then
    '            Grabar = True
    '        End If

    '        If Not Grabar Then
    '            script = "archivo = 1;"
    '            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    '        Else
    '            oProceso.IdOperador = ddlOperador.SelectedValue
    '            oProceso.IdCliente = Convert.ToInt32(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '            oProceso.InProg = Integer.Parse(rbProgramacion.SelectedValue)
    '            oProceso.IdTarea = 1

    '            If rbProgramacion.SelectedValue = 1 Then
    '                oProceso.FechaProceso = Convert.ToDateTime(txtFechaProgramacion.Text)
    '            Else
    '                oProceso.FechaProceso = DateTime.Now
    '            End If

    '            bl_Proceso.Guardar(oProceso, oConfiguracion)

    '            script = "Mensaje(""<br/><h1>Proceso guardado</h1><h2><br>Se ha puesto en cola esta tarea, véala en el visor de tareas</h2><br/>"", document, CerroMensajeGuardar);"
    '            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
    '            LimpiarCampos()
    '        End If
    '        ScriptManager.RegisterStartupScript(Me, Me.GetType, "attachevent", "EventosUpdatePanel();", True)

    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If bl_Proceso IsNot Nothing Then bl_Proceso.Dispose()
    '    End Try
    'End Sub

    Private Sub LimpiarCampos()
        ddlOperador.SelectedValue = "-1"
        rbProgramacion.SelectedValue = "0"
        txtFechaProgramacion.Text = ""

        txtFechaProgramacion.Style("display") = "none"

    End Sub

    <WebMethod()>
    Public Shared Function LeerArchivo(archConExt As String, idPlantilla As String) As List(Of String)
        Dim bl_ProcesoServicio As BL_IMP_DAT_Servicio = Nothing
        Dim blPlantilla As BL_IMP_DAT_Plantilla = Nothing
        Dim blCampo As BL_IMP_DAT_Campo = Nothing
        Try
            bl_ProcesoServicio = New BL_IMP_DAT_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\General\Administrar\Importacion\Temporal\", "\")

            Dim ruta As String = HttpContext.Current.Server.MapPath("~") + "\General\Administrar\Importacion\Temporal" + CarpetaDominio + "\"
            
            'Dim lstCuentas As List(Of String) = bl_ProcesoServicio.LeerArchivo(ruta, archConExt, CInt(idPlantilla))

            'Return lstCuentas
            Dim file As String = ruta + archConExt
            Dim connStr As String = ""
            If archConExt.Substring(archConExt.LastIndexOf(".")) = ".xls" Then
                connStr = String.Format(ConfigurationManager.AppSettings("Excel2003OleDBConnection"), file)
            ElseIf archConExt.Substring(archConExt.LastIndexOf(".")) = ".xlsx" Then
                connStr = String.Format(ConfigurationManager.AppSettings("Excel2007OleDBConnection"), file)
            End If



            'Dim connStr As String = "Provider=Microsoft.ACE.OLEDB.12.0;" & "Data Source= " & file & ";" & "Extended Properties=""Excel 12.0 Xml;HDR=YES;IMEX=1;"""

            Dim table As New DataTable()



            blPlantilla = New BL_IMP_DAT_Plantilla(0)
            Dim lstPlantilla As List(Of ENT_IMP_DAT_Plantilla) = blPlantilla.Buscar_Plantilla(idPlantilla)
            blCampo = New BL_IMP_DAT_Campo(0)
            Dim lstCampo As List(Of ENT_IMP_DAT_Campo) = blCampo.Buscar_Campo(lstPlantilla.ElementAt(0).IdPlantilla)


            Using conn As New OleDbConnection(connStr)

                Dim sheet As String = "SELECT * FROM [" + lstPlantilla.ElementAt(0).NombreHoja + "$]"
                ' to avoid error write the sheet name in square bracket
                Using cmd As New OleDbCommand(sheet, conn)
                    conn.Open()
                    Using ad As New OleDbDataAdapter(cmd)
                        ad.Fill(table)
                    End Using
                    conn.Close()
                End Using
            End Using



            Dim pos As Integer = 0
            For Each entImpDatCampo As ENT_IMP_DAT_Campo In lstCampo
                If entImpDatCampo.NombreCampo.Contains("idCuenta") Then
                    pos = entImpDatCampo.PosicionColumna
                    Exit For
                End If
            Next
            Dim lstCuenta As New List(Of String)

            For i As Integer = 0 To table.Rows.Count - 1
                Dim cta As String = ""
                cta = table.Rows(i)(pos - 1).ToString()
                lstCuenta.Add(cta)
            Next

            bl_ProcesoServicio.EliminarListaCuentaTemp()

            Dim lstTemp As List(Of String) = lstCuenta.Distinct().ToList
            Dim resultado As New List(Of String)()
            For Each cta As String In lstTemp
                If cta.Trim <> "" Then
                    Dim consulta As Boolean = bl_ProcesoServicio.VerificarCuenta(cta)
                    If Not consulta Then
                        bl_ProcesoServicio.InsertarCuentaTemp(cta)
                        resultado.Add(cta)
                    End If
                End If

            Next

            Return resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_ProcesoServicio IsNot Nothing Then bl_ProcesoServicio.Dispose()
        End Try
    End Function

End Class