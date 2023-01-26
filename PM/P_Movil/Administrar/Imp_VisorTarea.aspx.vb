Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports ClosedXML.Excel
Imports System.IO.Compression
Imports Ionic.Zip
Imports Newtonsoft.Json

Partial Class P_Movil_Administrar_Imp_VisorTarea
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim IMP_Estado As BL_MOV_IMP_Estado = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    IMP_Cola = New BL_MOV_IMP_Cola(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    IMP_Estado = New BL_MOV_IMP_Estado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim oIMP_Cola As New ENT_MOV_IMP_Cola

                    ttgInfoSeleccion.Mensaje = "Debe seleccionar el archivo para poder descargar los errores."
                    ttgInfoDescargarImportacionPlantilla.Mensaje = "Esta opción permite descargar los registros no procesados en el Proceso de Importación"
                    ttgInfoDescargar.Mensaje = "Descargue el archivo"

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar("-1", "<Todos>"), "vcNomOpe", "P_inCodOpe")
                    UtilitarioWeb.Dataddl(ddlEstado, IMP_Estado.Listar("0", "Pendientes y en proceso"), "vcNomEst", "P_inCodEst")
                    UtilitarioWeb.Dataddl(ddlTarea, IMP_Cola.ListarTipoTarea("-1", "<Todos>"), "vcTar", "inTar")

                    'oIMP_Cola.Estado.P_inCod = ddlEstado.SelectedValue
                    'oIMP_Cola.inTar = ddlTarea.SelectedValue
                    'oIMP_Cola.Proceso.Operador.P_inCodOpe = ddlOperador.SelectedValue

                    'rpTareas.DataSource = New List(Of ENT_MOV_IMP_Cola) 'IMP_Cola.Listar(oIMP_Cola)
                    'rpTareas.DataBind()
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                '    ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Cola IsNot Nothing Then
                IMP_Cola.Dispose()
            End If
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
            If IMP_Estado IsNot Nothing Then
                IMP_Estado.Dispose()
            End If
        End Try
    End Sub


    '' metodo para crear directotirio en la carpeta temporal y obtener las lineas y escribirlo en un archivo y retornar la ruta Jpareja
    <WebMethod()>
    Public Shared Function ObtenerLineasNoRegistradas(ByVal inCodCol As String) As List(Of String)
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing
        Dim nombreArchivo As String = "LineasNoRegistradas"
        Try
            Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            Dim adicionalnombre As String = UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario)

            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + adicionalnombre + "/").ToString()
            Dim filenamefinal As String = "P_Movil/Administrar/Temporal/" + adicionalnombre + "/" + nombreArchivo + ".txt"

            If Not File.Exists(vcRutaTMP) Then
                Directory.CreateDirectory(vcRutaTMP)
            End If
            For Each file In Directory.GetFiles(vcRutaTMP)
                IO.File.Delete(file)
            Next
            Dim fs As FileStream = File.Create(vcRutaTMP + nombreArchivo + ".txt")
            Dim info As Byte() = Nothing
            For Each val As ENT_MOV_Linea In IMP_Cola.ListarLineasNoRegistradas(Integer.Parse(inCodCol))
                info = New UTF8Encoding(True).GetBytes(val.P_vcNum.ToString() + System.Environment.NewLine)
                fs.Write(info, 0, info.Length)
            Next
            fs.Close()
            Dim lista As New List(Of String)
            lista.Add(filenamefinal)
            lista.Add(nombreArchivo)
            lista.Add(Usuario)
            lista.Add(Dominio)
            Return lista
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
    Public Shared Function MostrarTareas(ByVal inEst As String, ByVal inTar As String, ByVal inOpe As String, ByVal p_inCodCol As Integer) As List(Of ENT_MOV_IMP_Cola)
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Cola As New ENT_MOV_IMP_Cola

            oIMP_Cola.Estado.P_inCod = Integer.Parse(inEst)
            oIMP_Cola.inTar = Integer.Parse(inTar)
            oIMP_Cola.Proceso.Operador.P_inCodOpe = Integer.Parse(inOpe)
            oIMP_Cola.P_inCodCol = p_inCodCol

            Return IMP_Cola.Listar(oIMP_Cola)
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
    Public Shared Function DescargarExcelErroresImportacion(ByVal inTar As String, ByVal p_inCodCol As Integer) As String
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing
        Dim respuesta As String = ""
        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim strDirectorioPlantilla As String = HttpContext.Current.Request.MapPath("~/P_Movil/Administrar/Plantillas")
            Dim ds As DataSet = New DataSet()
            ds = IMP_Cola.DescargarExcelErroresImportacion(inTar, p_inCodCol)
            Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            Dim adicionalnombre As String = UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario)

            If inTar = 11 Then
                File.Copy(strDirectorioPlantilla & "\Plantilla_Lineas.xlsx", strDirectorioPlantilla & "\Lineas.xlsx", True)
                Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & "\Lineas.xlsx")
                Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)

                xlWorksheet1.Cell(3, 1).InsertData(ds.Tables(0).AsEnumerable())

                oxlWorkbook.Save()
                oxlWorkbook.Dispose()

                Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + adicionalnombre + "/").ToString()
                Dim name As String = "Lineas"

                If Not File.Exists(vcRutaTMP) Then
                    Directory.CreateDirectory(vcRutaTMP)
                End If

                For Each file In Directory.GetFiles(vcRutaTMP)
                    IO.File.Delete(file)
                Next

                File.Copy(strDirectorioPlantilla & "\Lineas.xlsx", vcRutaTMP & "Lineas.xlsx", True)

                '=================================================================================================================================
                name = UtilitarioWeb.CorrijeNombreArchivo(name)
                Dim destPath As String = UtilitarioWeb.ComprimeArchivo("", vcRutaTMP, "PlantillaLinea", name, "xlsx", False)
                '=================================================================================================================================

                respuesta = "P_Movil/Administrar/Temporal/" + adicionalnombre + "/PlantillaLinea.zip"
            Else
                File.Copy(strDirectorioPlantilla & "\Plantilla_Planes.xlsx", strDirectorioPlantilla & "\Planes.xlsx", True)
                Dim oxlWorkbook As New XLWorkbook(strDirectorioPlantilla & "\Planes.xlsx")
                Dim xlWorksheet1 = oxlWorkbook.Worksheet(1)

                xlWorksheet1.Cell(3, 1).InsertData(ds.Tables(0).AsEnumerable())

                oxlWorkbook.Save()
                oxlWorkbook.Dispose()

                Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + adicionalnombre + "/").ToString()
                Dim name As String = "Planes"

                If Not File.Exists(vcRutaTMP) Then
                    Directory.CreateDirectory(vcRutaTMP)
                End If

                For Each file In Directory.GetFiles(vcRutaTMP)
                    IO.File.Delete(file)
                Next

                File.Copy(strDirectorioPlantilla & "\Planes.xlsx", vcRutaTMP & "Planes.xlsx", True)

                '=================================================================================================================================
                name = UtilitarioWeb.CorrijeNombreArchivo(name)
                Dim destPath As String = UtilitarioWeb.ComprimeArchivo("", vcRutaTMP, "PlantillaPlan", name, "xlsx", False)
                '=================================================================================================================================

                respuesta = "P_Movil/Administrar/Temporal/" + adicionalnombre + "/PlantillaPlan.zip"
            End If
            Return respuesta
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            Return "0"
        Finally
            If IMP_Cola IsNot Nothing Then
                IMP_Cola.Dispose()
            End If
        End Try
    End Function








    <WebMethod()>
    Public Shared Function MostrarDetalle_x_Archivo(ByVal inEst As String, ByVal inTar As String, ByVal inOpe As String, ByVal p_inCodCol As Integer, ByVal p_inOrden As Integer) As List(Of ENT_MOV_IMP_Cola)
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Cola As New ENT_MOV_IMP_Cola

            oIMP_Cola.Estado.P_inCod = Integer.Parse(inEst)
            oIMP_Cola.inTar = Integer.Parse(inTar)
            oIMP_Cola.Proceso.Operador.P_inCodOpe = Integer.Parse(inOpe)
            oIMP_Cola.P_inCodCol = p_inCodCol

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
    Public Shared Function MostrarDetalleTarea(ByVal inCodCol As String) As ENT_MOV_IMP_Cola
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return IMP_Cola.Mostrar(Integer.Parse(inCodCol))
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
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

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
    Public Shared Function ReProcesarError(ByVal inCodCol As String, ByVal dtFecPro As String) As String
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If dtFecPro = "" Then
                IMP_Cola.ReProcesarError(Integer.Parse(inCodCol))
            Else
                IMP_Cola.ReProcesarError(Integer.Parse(inCodCol), Convert.ToDateTime(dtFecPro))
            End If
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
    Public Shared Function ReProcesarTodo(ByVal inCodCol As String, ByVal dtFecPro As String) As String
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If dtFecPro = "" Then
                IMP_Cola.ReProcesarTodo(Integer.Parse(inCodCol))
            Else
                IMP_Cola.ReProcesarTodo(Integer.Parse(inCodCol), Convert.ToDateTime(dtFecPro))
            End If
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
    Public Shared Function Validacion(ByVal inCodCol As String) As String
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            IMP_Cola.Validacion(Integer.Parse(inCodCol))
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
    Public Shared Function Eliminar(ByVal inCodCol As String) As String
        If inCodCol Is Nothing OrElse inCodCol = "" OrElse inCodCol = "null" Then
            Return ""
        End If

        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

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
        Dim IMP_Cola As BL_MOV_IMP_Cola = Nothing

        Try
            IMP_Cola = New BL_MOV_IMP_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
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

    'ObtenerRuta

    <WebMethod()>
    Public Shared Function ObtenerRuta(ByVal idRuta As String) As String
        'Dim CarpetaDominio As String = Utilitario.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/") + "P_Movil/Administrar/Temporal/", "/")

        Dim IdDominio As String = HttpContext.Current.Session("IdDominio").ToString()
        Dim IdUsuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString

        Dim IMP_Ruta As BL_MOV_IMP_Ruta = Nothing
        Dim Ruta As String = String.Empty

        Try
            IMP_Ruta = New BL_MOV_IMP_Ruta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Ruta = IMP_Ruta.ObtenerRuta(idRuta)
            Return Ruta & "|" & IdDominio & "|" & IdUsuario

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Ruta IsNot Nothing Then
                IMP_Ruta.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ExisteArchivoError(ByVal vcNombreArchivo As String) As String
        Dim IdDominio As String = HttpContext.Current.Session("IdDominio").ToString()
        Dim RutaErrores As String = ""
        Dim RutaArchivoError As String = ""
        Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
        Dim Resultado As String = ""

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ServicioGeneral = New BL_GEN_Servicio_General(oUsuario.IdCliente)
            Dim dtRutas_ImportadorLinea As DataTable = ServicioGeneral.ObtenerRutasServicio("ImportadorLinea")
            For Each dr As DataRow In dtRutas_ImportadorLinea.Rows
                If dr("Llave").ToString().ToLower() = "rutaerr" Then
                    RutaErrores = dr("Ruta").ToString()
                    Exit For
                End If
            Next

            RutaArchivoError = Path.Combine(RutaErrores, IdDominio, vcNombreArchivo)

            If File.Exists(RutaArchivoError) Then
                Resultado = RutaArchivoError
            Else
                Resultado = "0"
            End If
            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ServicioGeneral IsNot Nothing Then ServicioGeneral.Dispose()
        End Try
    End Function

End Class

