Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports System.Data
Imports VisualSoft.Suite80.BL
Imports Utilitario
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Con_Fac_CronogramaPagos2
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

                    Dim vcCondicion As String = ""
                    vcCondicion = "EMPL_btEST=1"
                    vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente = 1)"
                    If oUsuario.F_vcCodInt.ToString() = "" Then
                        vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.Empleado.P_vcCod + "|"
                    Else
                        vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
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

                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfOrganizacion.Value = oUsuario.F_vcCodInt
                    hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/P_Movil/Facturacion/Exportacion/Cronograma/")
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"
                    'If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                    If UtilitarioWeb.Seguridad.EsAdministrador Or oUsuario.F_vcCodInt.ToString() <> "" Then hdfAdmin.Value = "1"

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
    Public Shared Function ListarCronogramaPagos(ByVal IdSolicitud As String, ByVal IdEmpleado As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_CronogramaPago)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            negocio = New BL_MOV_FAC_CronogramaPago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            'Obtiene Total Tickets no Leidos..

            If IdSolicitud = "" Then
                IdSolicitud = "0"
            End If
            HttpContext.Current.Session("vcFiltro_Cronograma") = IdSolicitud & "|" & IdEmpleado
            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)

            'lista = negocio.Listar_CronogramaPagosCliente(IdSolicitud, IdEmpleado)


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

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim negocio As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            negocio = New BL_MOV_FAC_CronogramaPago(Integer.Parse(1), oUsuario.IdCliente)

            Dim IdSolicitud As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(0)
            Dim IdEmpleado As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(1)
            Dim IdTipoProducto As Integer = -1
            Dim dtDatos As New DataTable
            dtDatos = negocio.Listar_CronogramaPagosExcel(IdSolicitud, IdTipoProducto)
            eegSolicitudes.ExportarDatos(dtDatos, "Solicitud_N" + IdSolicitud + "_" + IdEmpleado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Sub
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