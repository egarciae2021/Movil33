Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports System.Data
Imports VisualSoft.Suite80.BL
Imports Utilitario
Imports UtilitarioWeb
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Facturacion_Consultar_Con_Fac_CronogramaPagos
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

         If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            'Dim vcTab As String = Request.QueryString("vcTab")
            'Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
            Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
            'Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

            'Dim Exportar As String = Request.QueryString("Exportar")
            'If Exportar IsNot Nothing AndAlso Exportar = "1" Then
            '    Dim idSolicitud As String = Request.QueryString("idSolicitud")

            '    ExportarExcelAutenticacion(idSolicitud, inTipOri)
            '    Exit Sub
            'End If

                If Not IsPostBack Then

                    'Valida si es perfil de Recursos Humanos -- Jcamacho 21/10/2015
                    Dim PerfilRecursos As Boolean = False
                    If (oUsuario.Perfiles.Where(Function(x) x.P_inCod = 39).Count > 0) Then
                        PerfilRecursos = True
                    End If

                    Dim vcCondicion As String = ""
                    'vcCondicion = "EMPL_btEST=1"
                    'vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente= 1)"
                    vcCondicion = vcCondicion + " EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente= 1)"
                    If oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then
                        vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
                    Else
                        vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.Empleado.P_vcCod + "|"
                    End If

                    bpTecnicoResponsable.NombreEntidad = "Empleados"
                    bpTecnicoResponsable.vcTab = "M_EMPL"
                    bpTecnicoResponsable.TipoOrigen = 0
                    bpTecnicoResponsable.Condicion = vcCondicion
                    bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos"
                    bpTecnicoResponsable.RutaRaiz = "../../../"
                    bpTecnicoResponsable.Contenedor = "dvContenedorTecRes"
                    bpTecnicoResponsable.Descripcion = "EMPL_vcNOMEMP"
                    bpTecnicoResponsable.Codigo = "EMPL_P_vcCODEMP"
                    'JHERRERA 20141015: Oculta el mensaje de "No se encontraron datos"
                    bpTecnicoResponsable.MuestraMensajeNoDatos = False
                    '-->

                    Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Facturacion/Exportacion/Cronograma/"), "/")
                    
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfOrganizacion.Value = oUsuario.F_vcCodInt
                    'hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/P_Movil/Facturacion/Exportacion/Cronograma" + CarpetaDominio + "/")
                    'hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/P_Movil/Facturacion/Exportacion/Cronograma/")
                    'hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/Temporal/CuentaCobro/")
                    hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/Temporal/CuentaCobro" + CarpetaDominio + "/")
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"
                    'If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"



                    If UtilitarioWeb.Seguridad.EsAdministrador Or oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then hdfAdmin.Value = "1"


                    If hdfAdmin.Value = "0" And hdfOrganizacion.Value = "" And PerfilRecursos = False Then
                        bpTecnicoResponsable.Deshabilitado = True
                    End If

                End If
                hdfinTipOri.Value = inTipOri
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

        Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
    End Sub

    <WebMethod()>
 <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCronogramaPagos(ByVal IdSolicitud As String, ByVal IdEmpleado As String, ByVal inTipOri As String, ByVal Descripcion As String, ByVal fechaInicio As String, ByVal fechaFin As String, ByVal Imei As String, ByVal Linea As String, ByVal IdTipoProducto As Integer) As List(Of ENT_MOV_FAC_CronogramaPago)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            negocio = New BL_MOV_FAC_CronogramaPago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            'Obtiene Total Tickets no Leidos..

            If IdSolicitud = "" Then
                IdSolicitud = "0"
            End If
            'HttpContext.Current.Session("vcFiltro_Cronograma") = IdSolicitud & "|" & IdEmpleado
            Dim periodo1 As String = fechaInicio
            Dim periodo2 As String = fechaFin

            fechaInicio = fechaInicio.Replace("/", "").Replace("-", "")
            fechaFin = fechaFin.Replace("/", "").Replace("-", "")

            fechaInicio = fechaInicio.Substring(2, 4) & fechaInicio.Substring(0, 2)
            fechaFin = fechaFin.Substring(2, 4) & fechaFin.Substring(0, 2)

            HttpContext.Current.Session("vcFiltro_Cronograma") = IdSolicitud & "|" & IdEmpleado & "|" & Descripcion & "|" & fechaInicio & "|" & fechaFin & "|" & Imei & "|" & Linea & "|" & periodo1 & "|" & periodo2 & "|" & IdTipoProducto
            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)


            lista = negocio.Listar_CronogramaPagosCliente(IdSolicitud, IdEmpleado, Descripcion, fechaInicio, fechaFin, Imei, Linea, IdTipoProducto)


            Return lista

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Function

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCronogramaPagosDetalle(ByVal Periodo As String, ByVal IdEmpleado As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_CronogramaPago)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            negocio = New BL_MOV_FAC_CronogramaPago(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)

            Periodo = Periodo.Replace("/", "").Replace("-", "")

            Dim IdSolicitud As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(0)
            Dim Descripcion As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(2)
            Dim fechaInicio As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(3)
            Dim fechaFin As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(4)
            Dim Imei As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(5)
            Dim Linea As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(6)
            Dim IdTipoProducto As Integer = Convert.ToInt32(HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(9))

            lista = negocio.Listar_CronogramaPagosClienteDetalle(Periodo, IdEmpleado, Descripcion, fechaInicio, fechaFin, Imei, Linea, IdTipoProducto)


            Return lista

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Function

   <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function ListarSolicitudes(ByVal IdEmpleado As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Solicitud)
      Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As BL_MOV_FAC_Solicitud = Nothing
        Try
            negocio = New BL_MOV_FAC_Solicitud(Integer.Parse(inTipOri), oUsuario.IdCliente)
            HttpContext.Current.Session("vcFiltro_Cronograma") = 0 & "|" & IdEmpleado


         Dim lista As New List(Of ENT_MOV_FAC_Solicitud)

         lista = negocio.ListarSolicitudesEmpleados(IdEmpleado)

         Return lista


      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If negocio IsNot Nothing Then negocio.Dispose()
      End Try
   End Function

   <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function getEmpleado(ByVal IdEmpleado As String, ByVal inTipOri As String) As ENT_GEN_Empleado
      Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As VisualSoft.Comun.CuentaCobro.BL.BL_GEN_Empleado = Nothing
        Try
            negocio = New VisualSoft.Comun.CuentaCobro.BL.BL_GEN_Empleado(Integer.Parse(inTipOri), oUsuario.IdCliente)

            'Dim logica As VisualSoft.Comun.Facturacion.BL.BL_GEN_Empleado = VisualSoft.Comun.Facturacion.BL.new BL_GEN_Empleado(oUsuario.IdCliente)
            HttpContext.Current.Session("vcFiltro_Cronograma") = 0 & "|" & IdEmpleado
         Dim entidad As New ENT_GEN_Empleado
         entidad = negocio.getEmpleados(IdEmpleado)

         Return entidad

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If negocio IsNot Nothing Then negocio.Dispose()
      End Try
   End Function

    Protected Sub eegCronogramaPagos_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            negocio = New BL_MOV_FAC_CronogramaPago(Integer.Parse(1), oUsuario.IdCliente)

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
            Throw New Exception(UtilitarioWeb.MensajeError)
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

    <WebMethod()>
 <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ExportarPdf(ByVal inTipOri As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            negocio = New BL_MOV_FAC_CronogramaPago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            'Obtiene Total Tickets no Leidos..

            'If IdSolicitud = "" Then
            '    IdSolicitud = "0"
            'End If
            '
            'fechaInicio = fechaInicio.Replace("/", "").Replace("-", "")
            'fechaFin = fechaFin.Replace("/", "").Replace("-", "")

            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)

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

            Dim Dominio As String = HttpContext.Current.Session("IdDominio").ToString()
            'Dim vcRuta As String = HttpContext.Current.Server.MapPath("~") + "//Temporal//CuentaCobro//"
            'Dim vcRuta As String = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~").ToString(), "Temporal\CuentaCobro", Dominio + "\")
            Dim vcRuta As String = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~").ToString(), "Temporal\CuentaCobro\" & Dominio + "\")    'ECONDEÑA   20160802
            If Not System.IO.Directory.Exists(vcRuta) Then
                System.IO.Directory.CreateDirectory(vcRuta)
            End If

            Dim dsDatos As New DataSet
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

            vcRuta = negocio.Listar_CronogramaPagosPdf(IdSolicitud, IdEmpleado, Descripcion, fechaInicio, fechaFin, Imei, Linea, vcRuta, periodo1, periodo2, IdTipoProducto, oCultura)
            
            Return vcRuta

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Function

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

    Private Function CalcularTotal(ByVal vcNomCol As String, ByVal dtTabla As DataTable) As String
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim colTotal As DataColumn = New DataColumn("Tot_" + vcNomCol, GetType(System.Int32))
        colTotal.Expression = "Convert([" + vcNomCol + "], 'System.Decimal')"
        dtTabla.Columns.Add(colTotal)

        Dim strForNum = DevuelveFormatoNumero(oCultura)

        If IsDBNull(dtTabla.Compute("Sum(Tot_" + vcNomCol + ")", "")) Then
            Return Convert.ToDecimal(0).ToString(strForNum)
        Else
            Return Convert.ToDecimal(dtTabla.Compute("Sum(Tot_" + vcNomCol + ")", "")).ToString(strForNum)
        End If

    End Function

   'Private Sub ExportarExcelAutenticacion(ByVal idSolicitud As Integer, ByVal inTipOri As String)

   '    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
   '    Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(1, oUsuario.IdCliente)
   '    Dim lstCampo As List(Of ENT_ENT_Campo)
   '    lstCampo = Campo.Listar("MOV_FAC_CronogramaPago")
   '    Campo.Dispose()


   '    Dim negocio As BL_MOV_FAC_CronogramaPago = New BL_MOV_FAC_CronogramaPago(Integer.Parse(inTipOri), oUsuario.IdCliente)
   '    Dim dtDatos As New DataTable
   '    dtDatos = negocio.Listar_CronogramaPagosExcel(idSolicitud)
   '    negocio.Dispose()


   '    If dtDatos.Columns.Contains("IdCronogramaPago") Then dtDatos.Columns.Remove("IdCronogramaPago")

   '    For Each objCampo In lstCampo
   '        If objCampo.vcDes = "IdCronogramaPago" Then lstCampo.Remove(objCampo) : Exit For
   '    Next
   '    Dim nom_reporte = "Cronograma_Solicitud_" + idSolicitud.ToString()



   '    If dtDatos IsNot Nothing Then
   '        Dim objExportarExcel As New ExportarExcel
   '        objExportarExcel.ExportDataTableToExcel(dtDatos, nom_reporte, lstCampo)

   '    End If


   'End Sub
End Class

