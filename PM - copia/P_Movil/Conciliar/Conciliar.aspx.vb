Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistel.CompColasCorreo.BL
Imports VisualSoft.PCSistelMovil.Solicitudes.BE

Partial Class P_Movil_Conciliar_Conciliar
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                oUsuario = HttpContext.Current.Session("Usuario")
                Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                If Not IsPostBack Then
                    txtPeriodo.Text = ""
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    hdfLicencia.Value = oUsuario.Empleado.Licencia.ToUpper
                    hdfbtPregunto.Value = "0"
                    hdfbtSobreescribe.Value = "0"
                    hdfGenerico.Value = "" & Request.QueryString("generico")

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")

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
    Protected Sub btnGuardar_Click(ByVal sender As Object, ByVal e As EventArgs)

        Dim IMP_Proceso As BL_MOV_IMP_Proceso = Nothing

        Try
            Dim oIMP_Proceso As ENT_MOV_IMP_Proceso
            IMP_Proceso = New BL_MOV_IMP_Proceso(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim files As HttpFileCollection = Request.Files
            Dim script As String = ""
            Dim Grabar As Boolean = False
            Dim Ruta As String = String.Empty

            'ruta de archivos
            If IsNothing(ConfigurationManager.AppSettings("ModoCloud")) OrElse ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then
                Ruta = Server.MapPath("..\..\" & ConfigurationManager.AppSettings("RutaImportacion"))
            Else
                Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
                Dim IdDominio As Integer = Convert.ToInt32(HttpContext.Current.Session("IdDominio"))
                ServicioGeneral = New BL_GEN_Servicio_General(0, IdDominio)

                Try
                    Dim dtRutas As DataTable = ServicioGeneral.ObtenerRutasServicio("ImportadorLinea")
                    For Each dr As DataRow In dtRutas.Rows
                        If dr("Llave").ToString() = "RutaOrigen" Then
                            'Ruta = "..\..\" + dr("Ruta").ToString().Substring(dr("Ruta").ToString().IndexOf("P_Movil\Importacion")) 'obtener ruta virtual
                            Ruta = dr("Ruta").ToString()
                            Exit For
                        End If
                    Next

                    If Not Directory.Exists(Ruta) Then
                        Directory.CreateDirectory(Ruta)
                    End If
                Catch ex As Exception
                    Ruta = Server.MapPath("..\..\" & ConfigurationManager.AppSettings("RutaImportacion"))
                End Try
            End If


            Dim IdPlantillaImportacion_FYC As String = ConfigurationManager.AppSettings("IdPlantillaImportacion_FYC")
            Dim IdPlantillaImportacion_Corte As String = ConfigurationManager.AppSettings("IdPlantillaImportacion_Corte")
            Dim IdPlantillaImportacion_Adendum As String = ConfigurationManager.AppSettings("IdPlantillaImportacion_Adendum")

            For i As Integer = 0 To files.Count - 1

                oIMP_Proceso = New ENT_MOV_IMP_Proceso

                Dim postedFile As HttpPostedFile = files(i)
                If postedFile.ContentLength > 0 Then
                    Dim oArchivo As New ENT_GEN_Archivo
                    If (hdfbtSobreescribe.Value = "1") Then
                        Dim daFecha As DateTime = Now
                        Dim vcFecha As String = Now.Year.ToString() & New String("0", 2 - daFecha.Month.ToString().Length) + Now.Month.ToString() & New String("0", 2 - daFecha.Day.ToString().Length) + Now.Day.ToString() & "_" & New String("0", 2 - daFecha.Hour.ToString().Length) + Now.Hour.ToString() & New String("0", 2 - daFecha.Minute.ToString().Length) + Now.Minute.ToString()
                        oArchivo.vcNom = (postedFile.FileName.Substring(postedFile.FileName.LastIndexOf("\") + 1, postedFile.FileName.Length - postedFile.FileName.LastIndexOf("\") - 1))
                        oArchivo.vcNom = oArchivo.vcNom.Substring(0, oArchivo.vcNom.LastIndexOf(".")) & "_P_" & vcFecha & oArchivo.vcNom.Substring(oArchivo.vcNom.LastIndexOf("."), oArchivo.vcNom.Length - oArchivo.vcNom.LastIndexOf("."))
                    Else
                        oArchivo.vcNom = (postedFile.FileName.Substring(postedFile.FileName.LastIndexOf("\") + 1, postedFile.FileName.Length - postedFile.FileName.LastIndexOf("\") - 1))
                    End If
                    oArchivo.vcExt = oArchivo.vcNom.Substring(oArchivo.vcNom.LastIndexOf("."), oArchivo.vcNom.Length - oArchivo.vcNom.LastIndexOf("."))
                    oArchivo.vcRut = oArchivo.vcNom

                    If postedFile.ContentLength < 1024 Then 'BYTE
                        oArchivo.dcTam = Convert.ToDecimal(postedFile.ContentLength)
                        oArchivo.vcUniTam = "bytes"
                    ElseIf postedFile.ContentLength >= 1024 And postedFile.ContentLength < 1048576 Then 'KBYTE
                        oArchivo.dcTam = Decimal.Round(Convert.ToDecimal(postedFile.ContentLength) / 1024, 2)
                        oArchivo.vcUniTam = "KB"
                    Else 'MBYTE
                        oArchivo.dcTam = Decimal.Round(Convert.ToDecimal(postedFile.ContentLength) / 1048576, 2)
                        oArchivo.vcUniTam = "MB"
                    End If
                    postedFile.SaveAs(Ruta & oArchivo.vcNom)

                    oIMP_Proceso.Archivos.Add(oArchivo)
                    Grabar = True


                    If Not Grabar Then
                        script = "archivo=1;"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    Else
                        oIMP_Proceso.inTarCre = 3
                        oIMP_Proceso.inPro = 0
                        oIMP_Proceso.dtFecPro = DateTime.Now
                        oIMP_Proceso.Operador.P_inCodOpe = 5201
                        oIMP_Proceso.inCodArc = 3
                        If i = 0 Then
                            oIMP_Proceso.Plantilla.P_inCodPla = IdPlantillaImportacion_FYC
                        ElseIf i = 1 Then
                            oIMP_Proceso.Plantilla.P_inCodPla = IdPlantillaImportacion_Corte
                        ElseIf i = 2 Then
                            oIMP_Proceso.Plantilla.P_inCodPla = IdPlantillaImportacion_Adendum
                        End If

                        oIMP_Proceso.inTipTel = 1
                        oIMP_Proceso.btUniBitEnvRec = 1
                        oIMP_Proceso.btBitEnvRec = 0
                        oIMP_Proceso.EmpleadoPorDefecto.P_vcCod = ""
                        oIMP_Proceso.btVal = False
                        oIMP_Proceso.btImp = False
                        oIMP_Proceso.dtMesPer = "01/" & txtPeriodo.Text
                        oIMP_Proceso.dcTipCam = 0
                        oIMP_Proceso.VcCodCue = ""
                        oIMP_Proceso.vcLinTip = "1"
                        IMP_Proceso.Guardar(oIMP_Proceso)

                    End If

                End If
            Next i

            script = "Mensaje(""<br/><h1>Proceso guardado</h1><h2><br>Se ha puesto en cola esta tarea, véala en el visor de tareas</h2><br/>"", document, CerroMensajeGuardar);"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            hdfIdPerfil.Value = "-1"


            ScriptManager.RegisterStartupScript(Me, Me.GetType, "attachevent", "EventosUpdatePanel();", True)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Proceso IsNot Nothing Then
                IMP_Proceso.Dispose()
            End If
        End Try
    End Sub
    Private Sub LimpiarCampos()
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerAnalisisConciliacion(Periodo As String, Generico As String, Operador As String) As List(Of Object)
        Try
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsResultado As DataSet
            If Generico = "1" Then
                dsResultado = Concilia.ObtenerAnalisisConciliacionGenerico(Periodo, Operador)
            Else
                dsResultado = Concilia.ObtenerAnalisisConciliacion(Periodo)
            End If

            Concilia.Dispose()
            Dim lstObjPrincipal As New List(Of Object)

            Dim lstObj As List(Of Object)
            Dim dict As Dictionary(Of String, Object)

            'Listado..
            For Each Tabla As DataTable In dsResultado.Tables
                lstObj = New List(Of Object)
                For i As Integer = 0 To Tabla.Rows.Count - 1
                    dict = New Dictionary(Of String, Object)
                    For Each Columna As DataColumn In Tabla.Columns
                        dict.Add(Columna.ColumnName, Tabla.Rows(i)(Columna.ColumnName).ToString())
                    Next
                    lstObj.Add(dict)
                Next
                lstObjPrincipal.Add(lstObj)
            Next

            Return lstObjPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guardar_AnalisisConciliacion_FyC(Numeros As String, Periodo As String, Tipo As String) As String
        Try
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Numeros = Numeros.Replace("<span class=""cellConciliado"">", "")
            Numeros = Numeros.Replace("</span>", "")
            Concilia.Guardar_AnalisisConciliacion_FyC(Numeros, Periodo, Tipo)
            Concilia.Dispose()
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
    <WebMethod()>
    Public Shared Function Guardar_AnalisisConciliacion_FyCCorte(Cuentas As String, Periodo As String, Tipo As String) As String
        Try
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Cuentas = Cuentas.Replace("<span class=""cellConciliado"">", "")
            Cuentas = Cuentas.Replace("</span>", "")
            Concilia.Guardar_AnalisisConciliacion_FyCCorte(Cuentas, Periodo, Tipo)
            Concilia.Dispose()
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
    <WebMethod()>
    Public Shared Function Guardar_AnalisisConciliacion_InventarioAdendum(Numeros As String, Periodo As String, Tipo As String) As String
        Try
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Numeros = Numeros.Replace("<span class=""cellConciliado"">", "")
            Numeros = Numeros.Replace("</span>", "")
            Concilia.Guardar_AnalisisConciliacion_InventarioAdendum(Numeros, Periodo, Tipo)
            Concilia.Dispose()
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
    <WebMethod()>
    Public Shared Function Guardar_AnalisisConciliacion_InventarioFyC(Numeros As String, Periodo As String, Tipo As String, Generico As String, Operador As String) As String
        Try
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Numeros = Numeros.Replace("<span class=""cellConciliado"">", "")
            Numeros = Numeros.Replace("</span>", "")
            If Generico = "1" Then
                Concilia.Guardar_AnalisisConciliacion_InventarioFyC_Generico(Numeros, Periodo, Tipo, Operador)
            Else
                Concilia.Guardar_AnalisisConciliacion_InventarioFyC(Numeros, Periodo, Tipo)
            End If
            Concilia.Dispose()
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
    <WebMethod()>
    Public Shared Function Guardar_AnalisisConciliacion_SolicitudFyC(CodigosSolicitud As String, Periodo As String, Tipo As String) As String
        Try
            Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            CodigosSolicitud = CodigosSolicitud.Replace("<span class=""cellConciliado"">", "")
            CodigosSolicitud = CodigosSolicitud.Replace("</span>", "")
            Concilia.Guardar_AnalisisConciliacion_SolicitudFyC(CodigosSolicitud, Periodo, Tipo)
            Concilia.Dispose()
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarColaValidacion(Periodo As String, Observacion As String) As String
        Dim Concilia As BL_MOV_Concilia = Nothing
        Dim Colas As BL_PCS_MOV_Cola = Nothing
        Try
            Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Colas = New BL_PCS_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsEmpleados As DataSet = Concilia.ObtenerEnlaces()
            Dim Empleado As String, Correo As String, UrlPage As String

            Dim ArchivoPlantilla As String = HttpContext.Current.Server.MapPath("~/P_Movil/Conciliar/Plantilla/EnvioCorreoEnlace.htm")
            If Not File.Exists(ArchivoPlantilla) Then
                Return "El archivo plantilla no existe"
            End If

            Try
                UrlPage = HttpContext.Current.Request.Url.AbsoluteUri.ToString.Replace(HttpContext.Current.Request.Url.AbsolutePath.ToString, "/Login.aspx")
            Catch
                UrlPage = "http://publicaciongestionmovil/Login.aspx"
            End Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim PlantillaHTML As String = File.ReadAllText(ArchivoPlantilla, Encoding.UTF8)
            Dim MensajeCorreo As String = ""
            Dim oCola As ENT_PCS_MOV_Cola
            If dsEmpleados IsNot Nothing AndAlso dsEmpleados.Tables.Count > 0 AndAlso dsEmpleados.Tables(0) IsNot Nothing Then
                For Each dr As DataRow In dsEmpleados.Tables(0).Rows
                    Empleado = dr("Empleado").ToString()
                    Correo = dr("Correo").ToString()
                    If "" & Correo = "" Then Continue For
                    Observacion = Observacion.Replace(vbLf, "<br>")
                    MensajeCorreo = PlantillaHTML.Replace("{0}", Empleado)
                    MensajeCorreo = MensajeCorreo.Replace("{1}", Periodo)
                    MensajeCorreo = MensajeCorreo.Replace("{2}", Observacion)
                    MensajeCorreo = MensajeCorreo.Replace("{3}", UrlPage)

                    oCola = New ENT_PCS_MOV_Cola()
                    oCola.btEsHtml = True
                    oCola.vcDescripcion = CambiarTildesHTML(MensajeCorreo)
                    oCola.vcAsunto = "Validar Facturación - Periodo: " & Periodo
                    oCola.vcIdUsuario = oUsuario.P_inCod
                    oCola.vcMailTo = Correo
                    Colas.Insertar(oCola)
                Next
            End If


            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Concilia IsNot Nothing Then Concilia.Dispose()
            If Colas IsNot Nothing Then Colas.Dispose()
        End Try
    End Function

    Shared Function CambiarTildesHTML(ByVal Texto As String) As String
        Dim _return As String = Texto
        _return = _return.Replace("á", "&aacute;")
        _return = _return.Replace("é", "&eacute;")
        _return = _return.Replace("í", "&iacute;")
        _return = _return.Replace("ó", "&oacute;")
        _return = _return.Replace("ú", "&uacute;")
        _return = _return.Replace("Á", "&Aacute;")
        _return = _return.Replace("É", "&Eacute;")
        _return = _return.Replace("Í", "&Iacute;")
        _return = _return.Replace("Ó", "&Oacute;")
        _return = _return.Replace("Ú", "&Uacute;")
        Return _return
    End Function


End Class
