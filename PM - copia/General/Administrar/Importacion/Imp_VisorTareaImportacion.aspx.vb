Imports System.Web.Services
Imports System.IO
Imports ClosedXML.Excel
Imports VisualSoft.PCSistelMovil.ProcesoImportacion
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BE
Imports VisualSoft.PCSistelMovil.ImportadorDatosLinea.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.PCSistelMovil.ProcesoImportacion.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class Imp_VisorTareaImportacion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim IMP_Estado As BL_MOV_IMP_Estado = Nothing
        Dim blCola As BL_IMP_DAT_Cola = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.parent.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    blCola = New BL_IMP_DAT_Cola(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    IMP_Estado = New BL_MOV_IMP_Estado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    ttgInfoSeleccion.Mensaje = "Debe seleccionar el archivo para poder descargar los errores."
                    ttgInfoDescargar.Mensaje = "Descargue el archivo"

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar("-1", "<< Todos >>"), "vcNomOpe", "P_inCodOpe")                    
                    UtilitarioWeb.Dataddl(ddlEstado, IMP_Estado.Listar("0", "Pendientes y en proceso"), "vcNomEst", "P_inCodEst")
                    UtilitarioWeb.Dataddl(ddlTarea, blCola.ListarTipoTarea("-1", "<< Todos >>"), "VcNomTar", "IdTarea")
                    ddlTarea.Visible = False

                    If ddlOperador.Items.Count = 2 Then
                        ddlOperador.Enabled = False
                        ddlOperador.SelectedIndex = 1
                    End If

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Sub

    <WebMethod()>
    Public Shared Function MostrarTareas(ByVal p_inEst As String, ByVal p_inTar As String, p_idOper As String, p_inCodCol As Integer) As List(Of VisualSoft.PCSistelMovil.ProcesoImportacion.BE.ENT_IMP_DAT_Cola)
        Dim blCola As BL_IMP_DAT_Cola = Nothing
        Dim resultado As New List(Of VisualSoft.PCSistelMovil.ProcesoImportacion.BE.ENT_IMP_DAT_Cola)
        Try
            Dim _idCliente As Integer = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente
            'blCola = New BL_IMP_DAT_Cola(1, _idCliente)
            blCola = New BL_IMP_DAT_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim objCola As New VisualSoft.PCSistelMovil.ProcesoImportacion.BE.ENT_IMP_DAT_Cola
            objCola.IdEstado = p_inEst
            objCola.IdTarea = p_inTar
            objCola.Proceso.IdOperador = p_idOper
            objCola.IdCola = p_inCodCol
            resultado = blCola.Listar(objCola)
        Catch exSQL As SqlClient.SqlException
            If exSQL.ErrorCode = -2146232060 Then
                Return Nothing
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(blCola) Then blCola.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetalle_x_Archivo(ByVal inEst As String, ByVal inTar As String, ByVal inOpe As String, ByVal p_inCodCol As Integer, ByVal p_inOrden As Integer) As List(Of VisualSoft.PCSistelMovil.ProcesoImportacion.BE.ENT_IMP_DAT_Cola)
        Dim IMP_Cola As BL_IMP_DAT_Cola = Nothing

        Try
            IMP_Cola = New BL_IMP_DAT_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Cola As New VisualSoft.PCSistelMovil.ProcesoImportacion.BE.ENT_IMP_DAT_Cola

            oIMP_Cola.IdEstado = Integer.Parse(inEst)
            oIMP_Cola.IdTarea = Integer.Parse(inTar)
            oIMP_Cola.Proceso.IdOperador = Integer.Parse(inOpe)
            oIMP_Cola.IdCola = p_inCodCol

            Return IMP_Cola.Listar_x_Archivos(oIMP_Cola, p_inOrden)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Cola IsNot Nothing Then
                IMP_Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Eliminar(ByVal inCodCol As String) As String
        Dim IMP_Cola As BL_IMP_DAT_Cola = Nothing

        Try
            IMP_Cola = New BL_IMP_DAT_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            IMP_Cola.Eliminar(Integer.Parse(inCodCol))
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Cola IsNot Nothing Then
                IMP_Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CancelarProceso(ByVal inCodCol As String) As String
        Dim IMP_Cola As BL_IMP_DAT_Cola = Nothing

        Try
            IMP_Cola = New BL_IMP_DAT_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            IMP_Cola.CancelarProceso(Integer.Parse(inCodCol))
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Cola IsNot Nothing Then
                IMP_Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Procesar(ByVal inCodCol As String) As String
        Dim IMP_Cola As BL_IMP_DAT_Cola = Nothing

        Try
            IMP_Cola = New BL_IMP_DAT_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            IMP_Cola.Procesar(Integer.Parse(inCodCol))
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Cola IsNot Nothing Then
                IMP_Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerArchivoError(inCodCol As String) As ENT_IMP_DAT_ProcesoInformacion
        Dim blProcInfo As BL_IMP_DAT_ProcesoInformacion = Nothing
        Dim bl_Proceso As BL_IMP_DAT_Proceso = Nothing
        Try
            'GVT Antes se hacia aqui referncia al archivo error, pero el proceso q15 nunca lo llena, 
            'sus errores los llena en el archivo log asi que se hace referencia a este archivo ahora.
            blProcInfo = New BL_IMP_DAT_ProcesoInformacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/General/Administrar/Importacion/Temporal/"), "/")

            Dim oProcesoInfor As ENT_IMP_DAT_ProcesoInformacion = blProcInfo.ObtenerProcInformacion(Integer.Parse(inCodCol))
            Dim ruta As String = HttpContext.Current.Server.MapPath("~/General/Administrar/Importacion/Temporal" + CarpetaDominio + "/")
            Dim archivo As String = oProcesoInfor.ArchivoLog '+ "\" + oProcesoInfor.NombreLog
            Dim rutaLocal As String = ruta + oProcesoInfor.NombreLog

            bl_Proceso = New BL_IMP_DAT_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim dtNoProcesados As DataTable = bl_Proceso.ListarDatosNoProcesados(inCodCol)
            'If dtNoProcesados.Rows.Count > 0 Then
            If oProcesoInfor.NombreLog <> "" Then
                If File.Exists(rutaLocal) Then
                    File.Delete(rutaLocal)
                End If
                If Not File.Exists(rutaLocal) Then
                    'Dim fs As FileStream = New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                    If File.Exists(archivo) Then
                        File.Copy(archivo, rutaLocal, True)
                        'ruta = "General/Administrar/Importacion/Temporal/" + oProcesoInfor.NombreError
                        'oProcesoInfor.ArchivoErrores = ruta
                    End If
                End If
                'ruta = oProcesoInfor.NombreLog
                'se devuelve el nombre del archivo log como nombrelog, porque ese es el valor que busca el js
                oProcesoInfor.NombreError = oProcesoInfor.NombreLog
            Else
                oProcesoInfor.NombreError = ""
            End If

            'End If

            Return oProcesoInfor

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blProcInfo IsNot Nothing Then blProcInfo.Dispose()
            If blProcInfo IsNot Nothing Then bl_Proceso.Dispose()

        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarDetalleLogTarea(ByVal idCola As String) As List(Of ENT_IMP_DAT_LogImportacion)
        Dim LogCola As BL_IMP_DAT_LogImportacion = Nothing
        Try
            LogCola = New BL_IMP_DAT_LogImportacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return LogCola.ListarLogImportacionCola(Integer.Parse(idCola))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LogCola IsNot Nothing Then LogCola.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ExportarNoProcesados(idCola As Integer) As String
        Dim bl_Proceso As BL_IMP_DAT_Proceso = Nothing
        Dim bl_ProcesoArchivo As BL_IMP_DAT_ProcesoArchivo = Nothing
        Dim resultRuta As String = String.Empty
        Try
            bl_Proceso = New BL_IMP_DAT_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtNoProcesados As DataTable = bl_Proceso.ListarDatosNoProcesados(idCola)

            bl_ProcesoArchivo = New BL_IMP_DAT_ProcesoArchivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtProArc As DataTable = bl_ProcesoArchivo.ObtenerArchivo(idCola)
            Dim nombreArchivo As String = String.Empty
            If dtProArc.Rows.Count > 0 Then
                nombreArchivo = dtProArc.Rows(0)("nombreArchivo").ToString()
            End If

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/General/Administrar/Importacion/Temporal/"), "/")

            'Dim strRutaArchivo As String = HttpContext.Current.Server.MapPath("~/General/Administrar/Importacion/Temporal" + CarpetaDominio + "/" & nombreArchivo)
            Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim adicionalnombre As String = UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario)
            Dim strRutaArchivo As String = HttpContext.Current.Server.MapPath("~/General/Administrar/Importacion/Temporal/" + adicionalnombre + "/")

            If Not System.IO.Directory.Exists(strRutaArchivo) Then
                System.IO.Directory.CreateDirectory(strRutaArchivo)
            End If

            Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")

            If File.Exists(strRutaArchivo) Then
                File.Delete(strRutaArchivo)
            End If

            File.Copy(strDirectorioPlantilla & "\Q15.xlsx", strRutaArchivo & "\Q15.xlsx", True)

            Dim attributes As FileAttributes
            attributes = File.GetAttributes(strRutaArchivo)

            If (attributes And FileAttributes.ReadOnly) = FileAttributes.ReadOnly Then
                attributes = RemoveAttribute(attributes, FileAttributes.ReadOnly)
                File.SetAttributes(strRutaArchivo, attributes)
            End If
            
            If dtNoProcesados.Rows.Count > 0 Then
                
                'File.Create(strRutaArchivo)

                Dim oxlWorkbook As New XLWorkbook(strRutaArchivo & "\Q15.xlsx")
                Dim xlWorksheet = oxlWorkbook.Worksheet(1)

                Dim rowIni As Integer = 2
                For Each drNoProc As DataRow In dtNoProcesados.Rows
                    xlWorksheet.Range("A" + rowIni.ToString()).Value() = drNoProc("NUMERO").ToString()
                    xlWorksheet.Range("B" + rowIni.ToString()).Value() = drNoProc("MIN_ASIG").ToString()
                    xlWorksheet.Range("C" + rowIni.ToString()).Value() = drNoProc("LIMITE_CRED").ToString()
                    xlWorksheet.Range("D" + rowIni.ToString()).Value() = drNoProc("EMPRESA").ToString()
                    xlWorksheet.Range("E" + rowIni.ToString()).Value() = drNoProc("NRO_CUENTA").ToString()
                    xlWorksheet.Range("F" + rowIni.ToString()).Value() = drNoProc("NUMERO").ToString()
                    xlWorksheet.Range("G" + rowIni.ToString()).Value() = drNoProc("NUM_PRIVADO").ToString()
                    xlWorksheet.Range("H" + rowIni.ToString()).Value() = drNoProc("FECHA_ALTA").ToString()
                    xlWorksheet.Range("I" + rowIni.ToString()).Value() = drNoProc("FECHA_ULT_CAMBIO").ToString()
                    xlWorksheet.Range("J" + rowIni.ToString()).Value() = drNoProc("CODIGO_PLAN").ToString()
                    xlWorksheet.Range("K" + rowIni.ToString()).Value() = drNoProc("DESCRIPCION_PLAN").ToString()
                    xlWorksheet.Range("L" + rowIni.ToString()).Value() = "'" + drNoProc("CARGO_FIJO_PLAN").ToString()
                    xlWorksheet.Range("M" + rowIni.ToString()).Value() = drNoProc("MINUTOS_PLAN").ToString()
                    xlWorksheet.Range("N" + rowIni.ToString()).Value() = drNoProc("TIEMPO_PERMANENCIA").ToString()
                    xlWorksheet.Range("O" + rowIni.ToString()).Value() = drNoProc("MODELO_EQUIPO").ToString()
                    xlWorksheet.Range("P" + rowIni.ToString()).Value() = drNoProc("IMEI").ToString()
                    xlWorksheet.Range("Q" + rowIni.ToString()).Value() = drNoProc("TIPO_MODALIDAD").ToString()
                    xlWorksheet.Range("R" + rowIni.ToString()).Value() = "'" + drNoProc("LIMITE_CONSUMO").ToString()
                    xlWorksheet.Range("S" + rowIni.ToString()).Value() = drNoProc("ESTADO_ACTUAL").ToString()
                    xlWorksheet.Range("T" + rowIni.ToString()).Value() = "'" + drNoProc("SERVICIO_ROAMING").ToString()
                    xlWorksheet.Range("U" + rowIni.ToString()).Value() = drNoProc("OBSERVACIONES").ToString()


                    xlWorksheet.Range("L" + rowIni.ToString(), "L" + rowIni.ToString()).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right
                    xlWorksheet.Range("R" + rowIni.ToString(), "R" + rowIni.ToString()).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right
                    xlWorksheet.Range("T" + rowIni.ToString(), "T" + rowIni.ToString()).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right

                    xlWorksheet.Range("A" + rowIni.ToString(), "U" + rowIni.ToString()).Style.Border.InsideBorder = XLBorderStyleValues.Thin
                    xlWorksheet.Range("A" + rowIni.ToString(), "U" + rowIni.ToString()).Style.Border.OutsideBorder = XLBorderStyleValues.Thin

                    rowIni = rowIni + 1
                Next

                oxlWorkbook.Save()
                oxlWorkbook.Dispose()
                resultRuta = nombreArchivo
                'resultRuta = "General/Administrar/Importacion/Temporal\" + strRutaArchivo
                'resultRuta = strRutaArchivo

            End If

            Dim destPath As String = UtilitarioWeb.ComprimeArchivo(strRutaArchivo + "Q15.xlsx", strRutaArchivo, "Q15", "Q15", "xlsx", False)
            destPath = "General/Administrar/Importacion/Temporal/" + adicionalnombre + "/Q15.zip"

            'Return resultRuta
            Return destPath

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_Proceso IsNot Nothing Then bl_Proceso.Dispose()
            If bl_ProcesoArchivo IsNot Nothing Then bl_ProcesoArchivo.Dispose()
        End Try
    End Function

    Public Shared Function RemoveAttribute(ByVal attributes As FileAttributes, ByVal attributesToRemove As FileAttributes) As FileAttributes
        Return attributes And (Not attributesToRemove)
    End Function

End Class