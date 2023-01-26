Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.IO

Public Class Adm_Historico
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcTab As String = Request.QueryString("vcTab")
                    'Dim inCodigo As Integer = Integer.Parse(Request.QueryString("vcCodigo"))
                    Dim inCodigo As String = Request.QueryString("vcCodigo")

                    hdfvcCodigo.Value = inCodigo
                    hdfvcTab.Value = vcTab
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function MostrarHistorico_Lineas(ByVal inCodigo As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcOrdCol As String, ByVal vcTipOrd As String) As Object
        Dim Linea As New BL_MOV_Linea(0)
        Try
            Dim dtHistorico As DataTable = Linea.Mostrar_Historico_Lineas(inCodigo, vcOrdCol, vcTipOrd)
            Return JQGrid.DatosJSON(dtHistorico, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (Linea IsNot Nothing) Then
                Linea.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarHistorico_Dispositivos(ByVal inCodigo As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcOrdCol As String, ByVal vcTipOrd As String) As Object
        Dim Dispositivo As New BL_MOV_Dispositivo(0)
        Try
            Dim dtHistorico As DataTable = Dispositivo.Mostrar_Historico_Dispositivos(inCodigo, vcOrdCol, vcTipOrd)
            Return JQGrid.DatosJSON(dtHistorico, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (Dispositivo IsNot Nothing) Then
                Dispositivo.Dispose()
            End If
        End Try
    End Function

    Protected Sub eeListado_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eeListado.ObtenerDatosAExportar
        Dim Dispositivo As New BL_MOV_Dispositivo(0)
        Dim Linea As New BL_MOV_Linea(0)
        Try
            Dim vcTab As String = Request.QueryString("vcTab")
            Dim vcTabHistorico As String = ""
            Dim vcCodigo = HttpContext.Current.Request.QueryString("vcCodigo")
            Dim dsDetalleHistorico As DataTable = Nothing
            If vcTab = "MOV_Linea" Then
                dsDetalleHistorico = Linea.Mostrar_Historico_Lineas(vcCodigo, "", "")
            ElseIf vcTab = "MOV_Dispositivo" Then
                dsDetalleHistorico = Dispositivo.Mostrar_Historico_Dispositivos(vcCodigo, "", "")
            End If

            ExportarHistorico_Excel(dsDetalleHistorico, False)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
        End Try
    End Sub

    Public Sub ExportarHistorico_Excel(ByVal dtCabecera As DataTable, ByVal blRenameColumn As Boolean)

        Dim attachment As String = "attachment; filename=" & "ReporteHistorico" & ".xls"
        Dim strcontenido As New StringBuilder

        Try
            strcontenido.Append("<style> TD { mso-number-format:\@; } </style>")
            strcontenido.Append("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Rep_Historico" + "' style='border-collapse:collapse;'>")
            strcontenido.Append(vbLf)
            strcontenido.Append(vbTab + "<tr style='font-weight:bolder;'>")
            strcontenido.Append(vbLf + vbTab + vbTab)

            RenombrarColumnas(dtCabecera)

            For i = 0 To dtCabecera.Columns.Count - 1
                If dtCabecera.Columns(i).ColumnName <> "F_inCodEst" Then
                    strcontenido.Append("<td style='background-color: #25476a; color: #FFFFFF; text-aling: center; border: 1px solid;'>")
                    strcontenido.Append(dtCabecera.Columns(i).ColumnName.ToString())
                    strcontenido.Append("</td>")
                End If
            Next

            strcontenido.Append(vbLf)
            strcontenido.Append(vbTab + "</tr>")
            strcontenido.Append(vbLf)

            For x = 0 To dtCabecera.Rows.Count - 1
                strcontenido.Append(vbTab + "<tr>")
                strcontenido.Append(vbLf + vbTab + vbTab)
                For i = 0 To dtCabecera.Columns.Count - 1
                    strcontenido.Append("<td>")
                    strcontenido.Append(dtCabecera.Rows(x)(i).ToString().Trim())
                    strcontenido.Append("</td>")
                Next
                strcontenido.Append(vbLf)
                strcontenido.Append(vbTab + "</tr>")
                strcontenido.Append(vbLf)
            Next

            strcontenido.Append(vbLf)
            strcontenido.Append(vbTab + "</tr>")
            strcontenido.Append(vbLf)
            strcontenido.Append("</table>")

            Dim Dominio As String = Session("IdDominio").ToString()
            Dim Usuario As String = CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente.ToString()
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/").ToString()
            Dim name As String = "ReporteHistorico"

            If Not System.IO.Directory.Exists(vcRutaTMP) Then
                System.IO.Directory.CreateDirectory(vcRutaTMP)
            End If

            Dim writer = New StreamWriter(vcRutaTMP & name & ".xls", False, Encoding.UTF8)
            'Dim writer As StreamWriter = File.CreateText(vcRutaTMP & name & ".xls")
            writer.WriteLine(strcontenido)
            writer.Close()

            '=================================================================================================================================
            name = UtilitarioWeb.CorrijeNombreArchivo(name)
            Dim destPath As String = UtilitarioWeb.ComprimeArchivo(vcRutaTMP + attachment, vcRutaTMP, name, name, "xlsx", False)
            '=================================================================================================================================

            Dim fi As FileInfo = New FileInfo(destPath)
            If (fi.Exists) Then
                HttpContext.Current.Response.ClearHeaders()
                HttpContext.Current.Response.ClearContent()
                HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                HttpContext.Current.Response.ContentType = "application/octet-stream"
                HttpContext.Current.Response.TransmitFile(fi.FullName)
                HttpContext.Current.Response.Flush()
            End If

        Catch ex As Exception

        End Try
    End Sub

    Private Function RenombrarColumnas(ByVal prData As DataTable) As DataTable
        Try
            Dim contador As Integer = 0
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "Dispositivo"
                        prData.Columns(index - contador).ColumnName = "Dispositivo"
                        Continue For

                    Case "Lineas"
                        prData.Columns(index - contador).ColumnName = "Línea"
                        Continue For

                    Case "CodEmpleado"
                        prData.Columns(index - contador).ColumnName = "Cod. Empleado"
                        Continue For

                    Case "Empleado"
                        prData.Columns(index - contador).ColumnName = "Empleado"
                        Continue For

                    Case "Estado"
                        prData.Columns(index - contador).ColumnName = "Situación"
                        Continue For

                    Case "FecInicio"
                        prData.Columns(index - contador).ColumnName = "Fecha Inicio"
                        Continue For

                    Case "FecFin"
                        prData.Columns(index - contador).ColumnName = "Fecha Fin"
                        Continue For
                        
                    Case "Observacion"
                        prData.Columns(index - contador).ColumnName = "Observación"
                        Continue For
                        
                    Case "Linea"
                        prData.Columns(index - contador).ColumnName = "Línea"
                        Continue For
                        
                    Case "Modelo"
                        prData.Columns(index - contador).ColumnName = "Modelo de Dispositivo"
                        Continue For

                    Case "CodCentroCosto"
                        prData.Columns(index - contador).ColumnName = "Cod. Centro Costo"
                        Continue For

                End Select
            Next

        Catch ex As Exception

        End Try
        Return prData
    End Function

End Class