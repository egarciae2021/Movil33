Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services

Public Class Sin_Utilitarios
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not Page.IsPostBack Then

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub



    <WebMethod()> _
    Public Shared Function CargarResumenes() As List(Of ENTListaResumenes)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = ""
            Try
                TipoModulo = HttpContext.Current.Session("ModuloOpcion").ToString()
            Catch
            End Try
            Dim lstResumenes As New List(Of ENTListaResumenes)()
            lstResumenes = Sincronizacion.ListaResumenes(TipoModulo)
            Return lstResumenes
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarDetalleResumen(vctarea As String, vctipo As String, vccadena As String) As List(Of ENTListaDetalleTarea)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim lstResumenes As New List(Of ENTListaDetalleTarea)()
            lstResumenes = Sincronizacion.ListarDetalleResumen(vctarea, vctipo, vccadena, TipoModulo)

            HttpContext.Current.Session("vcFiltro_Sincronizador") = vctarea & "|" & vctipo & "|" & vccadena

            Return lstResumenes
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function EliminarResumen(fecha As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion.EliminarTarea(fecha, TipoModulo)
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    Protected Sub eegDetalle_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegDetalle.ObtenerDatosAExportar

        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If HttpContext.Current.Session("vcFiltro_Sincronizador") IsNot Nothing Then
                Dim vctarea As String, vctipo As String, vccadena As String

                vctarea = HttpContext.Current.Session("vcFiltro_Sincronizador").ToString().Split("|")(0)
                vctipo = HttpContext.Current.Session("vcFiltro_Sincronizador").ToString().Split("|")(1)
                vccadena = "" 'HttpContext.Current.Session("vcFiltro_Sincronizador").ToString().Split("|")(2)

                If vctarea = "" Then
                    Exit Sub
                End If

                Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()

                Dim dtdatos As New DataTable
                'dtDatos = negocio.Listar_CronogramaPagosExcel2(IdSolicitud, IdEmpleado, Descripcion, fechaInicio, fechaFin, Imei, Linea, IdTipoProducto)

                'ExportDataTableToExcel(dtDatos.Tables(0))

                dtdatos = Sincronizacion.ListarDetalleResumenDT(vctarea, vctipo, vccadena, TipoModulo)

                If vctipo <> "3" Then
                    dtdatos.Columns.Remove("CODORGANT")
                    dtdatos.Columns.Remove("NOMORGANT")
                End If

                dtdatos.Columns.Remove("ACCION")
                dtdatos.Columns.Remove("ITEMREGISTRO")
                dtdatos.Columns.Remove("DESCRIPCION")
                dtdatos.Columns.Remove("CLAVE")
                dtdatos.Columns.Remove("ANEXO")
                'SELECT ITEMREGISTRO,ACCION,CODIGO,NOMBRE,DESCRIPCION,OBSERVACIONES,EMAIL,CORREOJFT,COSTO,CODORGACT
                ',AREA, CLAVE,ANEXO,TIPO,LINEA,CARACTERISTICA,CODORGANT,NOMORGANT

                For i As Integer = 0 To dtdatos.Columns.Count - 1
                    Select Case (dtdatos.Columns(i).ColumnName)
                        Case "ITEMREGISTRO"
                            dtdatos.Columns(i).ColumnName = "Id. Registro"
                        Case "ACCION"
                            dtdatos.Columns(i).ColumnName = "Acción"
                        Case "NOMBRE"
                            dtdatos.Columns(i).ColumnName = "Nombre Empleado"
                        Case "CODIGO"
                            dtdatos.Columns(i).ColumnName = "Cod. Empleado"
                        Case "observaciones"
                            dtdatos.Columns(i).ColumnName = "Observaciones"
                        Case "COSTO"
                            dtdatos.Columns(i).ColumnName = "Centro Costo"
                        Case "CODORGACT"
                            dtdatos.Columns(i).ColumnName = "Cód. Organización Actual"
                        Case "AREA"
                            dtdatos.Columns(i).ColumnName = "Nombre Organización Actual"
                        Case "EMAIL"
                            dtdatos.Columns(i).ColumnName = "Correo"
                        Case "CORREOJFT"
                            dtdatos.Columns(i).ColumnName = "Correo Jefatura"
                        Case "TIPO"
                            dtdatos.Columns(i).ColumnName = "Tipo"
                        Case "LINEA"
                            dtdatos.Columns(i).ColumnName = "Línea o Dispositivo"
                        Case "CARACTERISTICA"
                            dtdatos.Columns(i).ColumnName = "Características"
                        Case "CODORGANT"
                            dtdatos.Columns(i).ColumnName = "Cód. Organización Anterior"
                        Case "NOMORGANT"
                            dtdatos.Columns(i).ColumnName = "Nombre Organización Anterior"

                    End Select
                Next
                'eegDetalle.oTipoExcel = ExportarExcelGenerico.TipoExcel.Excel2003oInferior
                eegDetalle.ExportarDatos(dtdatos, "DETALLE DE SINCRONIZADOR")

                'eegDetalle.ExportarDatosPersonalizados(
                'ExportToExcel(dtdatos)

            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Sub
  
    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarDetalleResumenDT(vctarea As String, vctipo As String, vccadena As String, campoordenar As String, orden As String, inPagTam As Integer, inPagAct As Integer) As Object

        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


            If vctarea = "" Then
                vctipo = "99"
            End If

            Dim dtdatos As New DataTable
            Dim TipoModulo As String = "" & HttpContext.Current.Session("ModuloOpcion")

            dtdatos = Sincronizacion.ListarDetalleResumenDT(vctarea, vctipo, vccadena, TipoModulo)
            HttpContext.Current.Session("vcFiltro_Sincronizador") = vctarea & "|" & vctipo & "|" & vccadena

            Return JQGrid.DatosJSON(dtdatos, inPagTam, inPagAct)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    Public Sub ExportToExcel(table As DataTable)
        Try
            Dim filename As String = "Detalle_Sincronizador.xls"
            Dim tw As New System.IO.StringWriter()
            Dim hw As New System.Web.UI.HtmlTextWriter(tw)

            hw.AddAttribute("color", "red")

            'SALUDO DE BIENVENIDA
            hw.WriteLine(Convert.ToString("<b>Bienvenido(a): </b>"))
            hw.WriteLine("<br>")
            hw.WriteLine("<br>")
            hw.WriteLine(Convert.ToString("<b>Detalle de líneas y dispositivos: </b>"))
            hw.WriteLine("<br>")
            hw.WriteLine("<br>")

            Dim dgGrid As New DataGrid()
            dgGrid.DataSource = table
            dgGrid.DataBind()
            

            'TABLA SUMARIO           

            dgGrid.RenderControl(hw)
            hw.WriteLine("<br>")
            hw.WriteLine("<br>")


            hw.WriteLine("<i>Fecha:" + DateTime.Now.ToString() + "</i>")

            'Write the HTML back to the browser.
            Response.ContentType = "application/vnd.ms-excel"
            Response.AppendHeader("Content-Disposition", (Convert.ToString("attachment; filename=") & filename) + "")
            Me.EnableViewState = False
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1252")
            Response.Charset = "utf-8"
            Response.Write(tw.ToString())
            Response.End()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Sub

End Class
