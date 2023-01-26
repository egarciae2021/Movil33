Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services

Public Class Con_Fac_EstadoCuenta
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oBlEmpleado As Global.VisualSoft.Suite80.BL.BL_GEN_Empleado
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                'Response.Redirect("~\Login.aspx")
                'Exit Sub
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    If oUsuario.Empleado.P_vcCod IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then
                        hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                        hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                        hdfOrganizacion.Value = oUsuario.F_vcCodInt
                        'oBlEmpleado = New Global.VisualSoft.Suite80.BL.BL_GEN_Empleado(oUsuario.IdCliente)
                        'Dim oEmpleado As ENT_GEN_Empleado = oBlEmpleado.Mostrar(oUsuario.Empleado.P_vcCod)

                        'If oEmpleado IsNot Nothing AndAlso oEmpleado.P_vcCod <> "" Then
                        '    lblCodigoEmpleado.Text = oEmpleado.P_vcCod
                        '    'lblNombreEmpleado.Text = Utilitario.ReemplazarTilder(oEmpleado.vcNom) & "<br>(" & oUsuario.Empleado.P_vcCod & " - " & oUsuario.Empleado.Correo & ")"
                        '    lblNombreEmpleado.Text = Utilitario.ReemplazarTilder(oEmpleado.vcNom) & " - " & oUsuario.Empleado.Correo
                        '    lblArea.Text = Utilitario.ReemplazarTilder(oEmpleado.Area.vcNomOrg)
                        '    lblCCosto.Text = Utilitario.ReemplazarTilder(oEmpleado.CentroCosto.P_vcCodCenCos + " - " + oEmpleado.CentroCosto.vcNomCenCos)
                        '    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                        'End If

                        'Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Facturacion/Exportacion/EstadoCuenta/"), "/")
                        'hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/P_Movil/Facturacion/Exportacion/EstadoCuenta" + CarpetaDominio + "/")
                        hdfinTipOri.Value = "1"
                        'hdfAdmin.Value = "0"
                        ''If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                        'If UtilitarioWeb.Seguridad.EsAdministrador Or oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then hdfAdmin.Value = "1"
                        'If hdfEmpleado.Value <> "" Then hdfTecnicoResponsable.Value = hdfEmpleado.Value
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
    Public Shared Function ListarEstadoCuenta(ByVal IdEmpleado As String, ByVal inTipOri As String, ByVal p_periodo As String) As List(Of ENT_MOV_FAC_EstadoCuenta)
        Dim logica As BL_MOV_FAC_EstadoCuenta = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            'Dim logica As BL_MOV_FAC_EstadoCuenta = New BL_MOV_FAC_EstadoCuenta(Integer.Parse(inTipOri), oUsuario.IdCliente)
            logica = New BL_MOV_FAC_EstadoCuenta(oUsuario.IdCliente)
            'Dim linea As BL_MOV_FAC_EstadoCuenta = BL_MOV_FAC_EstadoCuenta.Instance(oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_EstadoCuenta)
            lista = logica.Listar_EstadoCuenta(IdEmpleado, p_periodo)
            HttpContext.Current.Session("vcFiltro_ECuenta") = IdEmpleado & "|" & inTipOri & "|" & p_periodo
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getEmpleado(ByVal valor As String, ByVal inTipOri As String) As ENT_GEN_Empleado
       
        Dim logica As BL_GEN_Empleado = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Dim logica As BL_GEN_Empleado = New BL_GEN_Empleado(Integer.Parse(inTipOri), oUsuario.IdCliente)
            logica = New BL_GEN_Empleado(oUsuario.IdCliente)
            Dim entidad As New ENT_GEN_Empleado

            entidad = logica.getEmpleados(valor)
            logica.Dispose()
            Return entidad
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getCronograma6M(ByVal IdEmpleado As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_CronogramaPago)
       
        Dim logica As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Dim logica As BL_MOV_FAC_CronogramaPago = New BL_MOV_FAC_CronogramaPago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            logica = New BL_MOV_FAC_CronogramaPago(oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)
            lista = logica.Listar_Cronograma_6M(IdEmpleado)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
       
        Dim logica As BL_MOV_FAC_EstadoCuenta = Nothing
        Try
            Dim inTipOri As String = HttpContext.Current.Session("vcFiltro_ECuenta").ToString().Split("|")(1)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Dim logica As BL_MOV_FAC_EstadoCuenta = New BL_MOV_FAC_EstadoCuenta(Integer.Parse(inTipOri), oUsuario.IdCliente)
            logica = New BL_MOV_FAC_EstadoCuenta(oUsuario.IdCliente)
            Dim IdEmpleado As String = HttpContext.Current.Session("vcFiltro_ECuenta").ToString().Split("|")(0)
            Dim p_periodo As String = HttpContext.Current.Session("vcFiltro_ECuenta").ToString().Split("|")(2)
            Dim dtDatos As New DataTable
            dtDatos = logica.Listar_EstadoCuentaExcel(IdEmpleado, p_periodo)
            'eegSolicitudes.ExportarDatos(dtDatos, "Estado_de_cuenta_" + IdEmpleado)
            ExportDataTableToExcel(dtDatos)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function GetPeriodoxEmpl(ByVal idEmpleado As String) As String

        Dim EstadoCuenta As BL_MOV_FAC_EstadoCuenta = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            EstadoCuenta = New BL_MOV_FAC_EstadoCuenta(oUsuario.IdCliente)

            Dim periodo As String = EstadoCuenta.GetPeriodoxEmpleado(idEmpleado)

            Return periodo

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If EstadoCuenta IsNot Nothing Then EstadoCuenta.Dispose()
        End Try
    End Function

    Public Sub ExportDataTableToExcel(ByVal dtDatos As DataTable)

        Dim dtCrono As DataTable

        dtCrono = ObtenerColumnas(dtDatos, "Cabecera")

        Dim attachment As String = "attachment; filename=" & "Estado_de_Cuenta" & ".xls"

        Dim context As HttpContext = HttpContext.Current

        context.Response.ClearContent()
        context.Response.AddHeader("content-disposition", attachment)
        context.Response.ContentType = "application/vnd.ms-excel"


        context.Response.ContentEncoding = Encoding.Default
        context.Response.Write("<style> TD { mso-number-format:\@; } </style>")

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

                If dtDatos.Columns(i).ColumnName = "Monto" Then
                    context.Response.Write("<td style='text-align:right;'>")
                ElseIf dtDatos.Columns(i).ColumnName = "Fecha" OrElse dtDatos.Columns(i).ColumnName = "N Cuota" Then
                    context.Response.Write("<td style='text-align:center'>")
                Else
                    context.Response.Write("<td style='text-align:left;'>")
                End If
                context.Response.Write(dr(i).ToString().Trim())
                context.Response.Write("</td>")

            Next
            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)

        Next

        context.Response.Write("</table>")

        context.Response.End()
    End Sub

    Function ObtenerColumnas(ByVal dtDetalle As DataTable, ByVal vcTipo As String) As DataTable

        Dim dtCampos As New DataTable
        dtCampos.Columns.Add("vcNombre")
        Select Case (vcTipo)
            Case "Cabecera"
                dtCampos.Rows.Add("Código")
                dtCampos.Rows.Add("Empleado")
                dtCampos.Rows.Add("Fecha")
                dtCampos.Rows.Add("Concepto")
                dtCampos.Rows.Add("N Cuota")
                dtCampos.Rows.Add("Monto")
                dtCampos.Rows.Add("Ult Día Pago")
                dtCampos.Rows.Add("Periodo")
        End Select

        Return dtCampos

    End Function
End Class
