Imports System.Web.Script.Services
Imports System.Web.Services
Imports System.IO
Imports VisualSoft.PCSistelMovil.Campana.BE
Imports VisualSoft.PCSistelMovil.Campana.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Public Class CronogramaPagos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oBlEmpleado As Global.VisualSoft.Suite80.BL.BL_GEN_Empleado
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                If IsNothing(oUsuario) Then
                    Dim script As String = "window.top.location.reload();"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                Else
                    If Not IsPostBack Then

                        If oUsuario.Empleado.P_vcCod IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then

                            hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                            hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                            oBlEmpleado = New Global.VisualSoft.Suite80.BL.BL_GEN_Empleado(oUsuario.IdCliente)
                            Dim oEmpleado As ENT_GEN_Empleado = oBlEmpleado.Mostrar(oUsuario.Empleado.P_vcCod)

                            If oEmpleado IsNot Nothing AndAlso oEmpleado.P_vcCod <> "" Then
                                lblNombreEmpleado.Text = Utilitario.ReemplazarTilder(oEmpleado.vcNom) & "<br>(" & oUsuario.Empleado.P_vcCod & " - " & oUsuario.Empleado.Correo & ")"
                                lblArea.Text = Utilitario.ReemplazarTilder(oEmpleado.Area.vcNomOrg)
                                lblCCosto.Text = Utilitario.ReemplazarTilder(oEmpleado.CentroCosto.P_vcCodCenCos + " - " + oEmpleado.CentroCosto.vcNomCenCos)
                                hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                            End If
                        End If
                    End If
                End If

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If oBlEmpleado IsNot Nothing Then oBlEmpleado.Dispose()
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCronogramaPagos(ByVal IdEmpleado As String, ByVal fechaInicio As String, ByVal fechaFin As String) As List(Of ENT_MOV_FAC_CronogramaPago)
        Dim cronogramaPago As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            cronogramaPago = New BL_MOV_FAC_CronogramaPago(oUsuario.IdCliente)
            'HttpContext.Current.Session("vcFiltro_Cronograma") = IdSolicitud & "|" & IdEmpleado
            Dim periodo1 As String = fechaInicio
            Dim periodo2 As String = fechaFin

            fechaInicio = fechaInicio.Replace("/", "").Replace("-", "")
            fechaFin = fechaFin.Replace("/", "").Replace("-", "")

            fechaInicio = fechaInicio.Substring(2, 4) & fechaInicio.Substring(0, 2)
            fechaFin = fechaFin.Substring(2, 4) & fechaFin.Substring(0, 2)

            HttpContext.Current.Session("vcFiltro_Cronograma") = "0" & "|" & IdEmpleado & "|" & "" & "|" & fechaInicio & "|" & fechaFin & "|" & "" & "|" & "" & "|" & periodo1 & "|" & periodo2 & "|" & -1
            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)

            lista = cronogramaPago.Listar_CronogramaPagosCliente("0", IdEmpleado, "", fechaInicio, fechaFin, "", "", -1)

            Return lista

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If cronogramaPago IsNot Nothing Then cronogramaPago.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCronogramaPagosDetalle(ByVal Periodo As String, ByVal IdEmpleado As String) As List(Of ENT_MOV_FAC_CronogramaPago)
        Dim cronogramaPago As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            cronogramaPago = New BL_MOV_FAC_CronogramaPago(oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)

            Periodo = Periodo.Replace("/", "").Replace("-", "")

            Dim IdSolicitud As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(0)
            Dim Descripcion As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(2)
            Dim fechaInicio As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(3)
            Dim fechaFin As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(4)
            Dim Imei As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(5)
            Dim Linea As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(6)
            Dim IdTipoProducto As Integer = Convert.ToInt32(HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(9))

            lista = cronogramaPago.Listar_CronogramaPagosClienteDetalle(Periodo, IdEmpleado, Descripcion, fechaInicio, fechaFin, Imei, Linea, IdTipoProducto)

            Return lista

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If cronogramaPago IsNot Nothing Then cronogramaPago.Dispose()
        End Try
    End Function

    <WebMethod()>
 <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ExportarPdf() As String
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            negocio = New BL_MOV_FAC_CronogramaPago(oUsuario.IdCliente)

            Dim IdSolicitud As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(0)
            Dim IdEmpleado As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(1)
            Dim Descripcion As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(2)
            Dim fechaInicio As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(3)
            Dim fechaFin As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(4)
            Dim Imei As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(5)
            Dim Linea As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(6)
            Dim periodo1 As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(7)
            Dim periodo2 As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(8)
            Dim IdTipoProducto As Integer = Convert.ToInt32(HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(9))

            Dim Dominio As String = ""
            If HttpContext.Current.Session("IdDominio") IsNot Nothing Then
                Dominio = "\" + HttpContext.Current.Session("IdDominio").ToString()
            End If
            'Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            'Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//Temporal//CuentaCobro//"
            'Dim vcRuta As String = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~").ToString(), "Temporal\CuentaCobro", Dominio + "\") 'ECONDEÑA    30/06/2016
            Dim vcRuta As String = HttpContext.Current.Server.MapPath("~\Temporal\Cronogramas" + Dominio + "\").ToString()
            If Not System.IO.Directory.Exists(vcRuta) Then
                System.IO.Directory.CreateDirectory(vcRuta)
            End If

            vcRuta = negocio.Listar_CronogramaPagosPdf(IdSolicitud, IdEmpleado, Descripcion, fechaInicio, fechaFin, Imei, Linea, vcRuta, periodo1, periodo2, IdTipoProducto)

            Return vcRuta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Function

    Protected Sub eegCronograma_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegCronograma.ObtenerDatosAExportar
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            negocio = New BL_MOV_FAC_CronogramaPago(oUsuario.IdCliente)
            Dim IdSolicitud As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(0)
            Dim IdEmpleado As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(1)
            Dim Descripcion As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(2)
            Dim fechaInicio As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(3)
            Dim fechaFin As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(4)
            Dim Imei As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(5)
            Dim Linea As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(6)
            Dim IdTipoProducto As Integer = Convert.ToInt32(HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(9))
            Dim dtDatos As New DataSet
            dtDatos = negocio.Listar_CronogramaPagosExcel2(IdSolicitud, IdEmpleado, Descripcion, fechaInicio, fechaFin, Imei, Linea, IdTipoProducto)
            ExportDataTableToExcel(dtDatos.Tables(0))
            'eegSolicitudes.ExportarDatos(dtDatos, "Solicitud_N" + IdSolicitud + "_" + IdEmpleado)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Sub

    Public Sub ExportDataTableToExcel(ByVal dtDatos As DataTable)

        Dim dtCrono As DataTable
        
        dtCrono = ObtenerColumnas(dtDatos, "Cabecera")
        
        Dim attachment As String = "attachment; filename=" & "Cronograma_de_Pagos" & ".xls"

        Dim context As HttpContext = HttpContext.Current

        context.Response.ClearContent()
        context.Response.AddHeader("content-disposition", attachment)
        context.Response.ContentType = "application/vnd.ms-excel"


        context.Response.ContentEncoding = Encoding.Default
        context.Response.Write("<style> TD { mso-number-format:\@; } </style>")

        context.Response.Write("<table cellspacing='0' rules='all' border='0'>")
        context.Response.Write("<tr><td colspan='3' style='border: none;'><a style='font-weight: bold'>Empleado:</a> " & dtDatos.Rows(0)("Empleado").ToString() & "</td></tr>")
        context.Response.Write("<tr><td colspan='3' style='border: none;'><a style='font-weight: bold'>Área:</a>  " & dtDatos.Rows(0)("Area").ToString() & "</td></tr>")
        context.Response.Write("<tr><td colspan='3' style='border: none;'><a style='font-weight: bold'>Centro de costo:</a> " & dtDatos.Rows(0)("CentroCosto").ToString() & "</td></tr>")
        context.Response.Write("<tr><td></td></tr>")
        context.Response.Write("</table>")
        context.Response.Write(vbLf)

        context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + "Detalle de Corte" + "' style='border-collapse:collapse;'>")
        context.Response.Write(vbLf)
        context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
        context.Response.Write(vbLf + vbTab + vbTab)


        For i = 0 To dtCrono.Rows.Count - 1
            context.Response.Write("<td style='background-color: #BDBDBD; '> ")
            context.Response.Write(dtCrono.Rows(i)("vcNombre").ToString())
            context.Response.Write("</td>")
        Next

        context.Response.Write(vbLf)
        context.Response.Write(vbTab + "</tr>")
        context.Response.Write(vbLf)

        For Each dr As DataRow In dtDatos.Rows
            'Detalle
            context.Response.Write(vbTab + "<tr>")
            context.Response.Write(vbLf + vbTab + vbTab)
            For i = 0 To dtDatos.Columns.Count - 1

                If dtDatos.Columns(i).ColumnName = "Empleado" Or dtDatos.Columns(i).ColumnName = "Area" Or dtDatos.Columns(i).ColumnName = "CentroCosto" Then

                Else

                    If dtDatos.Columns(i).ColumnName = "DcMontoCuota" Then
                        context.Response.Write("<td style='text-align:right;'>")
                    ElseIf dtDatos.Columns(i).ColumnName = "DesSolicitud" Then
                        context.Response.Write("<td style='text-align:left'>")
                    Else
                        context.Response.Write("<td style='text-align:left;'>")
                    End If
                    context.Response.Write(dr(i).ToString().Trim())
                    context.Response.Write("</td>")

                End If
            Next
            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)

        Next

        context.Response.Write("</table>")

        context.Response.Write("<table><tr><td></td></tr><tr><td></td><td></td></tr>")
        context.Response.Write("</table>")

        'Criterios de búsqueda

        Dim Descripcion As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(2)
        Dim fechaInicio As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(3)
        Dim fechaFin As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(4)
        Dim Imei As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(5)
        Dim Linea As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(6)
        Dim periodo1 As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(7)
        Dim periodo2 As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(8)
        Dim IdTipoProducto As Integer = Convert.ToInt32(HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(9))


        Dim TipoMotivo As String = ""
        Select Case IdTipoProducto
            Case 1
                TipoMotivo = "Equipo"
                Exit Select
            Case 2
                TipoMotivo = "Línea"
                Exit Select
            Case Else
                TipoMotivo = "Todos"
                Exit Select
        End Select


        context.Response.Write("</table>")
        context.Response.Write("<table cellspacing='0' rules='all' border='0'>")
        context.Response.Write("<tr><td colspan='3' style='border: none;'><a style='font-weight: bold'>Criterios de búsqueda:</a></td>")
        context.Response.Write("<tr><td style='border: none;'><a style='font-weight: bold'>Periodos:</a></td>")
        context.Response.Write("<td style='border: none;'>" & Convert.ToDateTime(periodo1).ToString("MM/yyyy") & " al " & Convert.ToDateTime(periodo2).ToString("MM/yyyy") & "</td></tr>")
        context.Response.Write("<tr><td style='border: none;'><a style='font-weight: bold'>Detalle:</a></td>")
        context.Response.Write("<td  colspan='5' style='border: none;'>" & If(Descripcion = "", "[Sin texto]", Descripcion) & "</td></tr>")
        context.Response.Write("<tr><td style='border: none;'><a style='font-weight: bold'>IMEI:</a></td>")
        context.Response.Write("<td colspan='3' style='border: none;'>" & If(Imei = "", "[Sin texto]", Imei) & "</td></tr>")
        context.Response.Write("<tr><td style='border: none;'><a style='font-weight: bold'>Línea:</a></td>")
        context.Response.Write("<td colspan='3' style='border: none;'>" & If(Linea = "", "[Sin texto]", Linea) & "</td></tr>")
        context.Response.Write("<tr><td style='border: none;'><a style='font-weight: bold'>Tipo Motivo:</a></td>")
        context.Response.Write("<td colspan='3' style='border: none;'>" & TipoMotivo & "</td></tr>")
        context.Response.Write("<tr><td></td></tr>")
        context.Response.Write("</table>")

        context.Response.End()
    End Sub

    Function ObtenerColumnas(ByVal dtDetalle As DataTable, ByVal vcTipo As String) As DataTable

        Dim dtCampos As New DataTable
        dtCampos.Columns.Add("vcNombre")

        Select Case (vcTipo)
            Case "Cabecera"
                dtCampos.Rows.Add("Periodo")
                'dtCampos.Rows.Add("Empleado")
                'dtCampos.Rows.Add("Área")
                'dtCampos.Rows.Add("Centro de Costo")
                dtCampos.Rows.Add("Fecha de Pago")
                dtCampos.Rows.Add("Descripción")
                dtCampos.Rows.Add("IMEI")
                'dtCampos.Rows.Add("Saldo")
                'dtCampos.Rows.Add("Amortización")
                'dtCampos.Rows.Add("Interés")
                dtCampos.Rows.Add("Monto Cuota")

            Case "Detalles"
                dtCampos.Rows.Add("Descripción")
                'dtCampos.Rows.Add("Saldo")
                'dtCampos.Rows.Add("Amortización")
                'dtCampos.Rows.Add("Interés")
                dtCampos.Rows.Add("Monto Cuota")
        End Select

        Return dtCampos

    End Function

End Class
