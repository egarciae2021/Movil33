Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.Auditoria.Constantes
Imports VisualSoft.Comun.Auditoria
Imports System.Data

Partial Class P_Movil_Facturacion_Configurar_Fac_Conf_ExportacionCobro
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfIdUsuarioLogeadoNombre.Value = oUsuario.vcNom
                    hdfinTipOri.Value = inTipOri.ToString()

                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    oAuditoria.Opcion = AuditoriaConstantes.ModuloFacturacion.ExportacionCobros
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()
                    Dim Origen As String = "-1"
                    Dim dt As New DataTable
                    Dim logica As BL_MOV_FAC_Configuracion = New BL_MOV_FAC_Configuracion(inTipOri, oUsuario.IdCliente)

                    dt = logica.ObtieneProceso("MOV_FAC_CuentaCobro_Exportar", "Origen")
                    logica.Dispose()
                    If dt.Rows.Count > 0 Then
                        Origen = dt.Rows(0)("IdConfigProceso").ToString()

                    End If
                    hdfProceso_Origen.Value = Origen
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
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Configuracion(ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Configuracion)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
        Try
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim Opcion As Integer = 3 '3 = Exportacion de Cobros
            Dim lista As New List(Of ENT_MOV_FAC_Configuracion)
            lista = logica.ListarConfiguracion(Opcion)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Insertar_ConfExportCobros(ByVal TipoEjecucion As String, ByVal IdConfigProceso_Origen As Integer, ByVal IdConfigProceso_Destino As Integer, ByVal User As String, ByVal inTipOri As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
        Try
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim conf As New ENT_MOV_FAC_Configuracion
            conf.IdTipoConfiguracion = 3 '3 = Exportacion de Cobros
            conf.TipoEjecucion = TipoEjecucion '0=Automatica, 1=Manual 2=ninguna
            'conf.IdConfigProceso_Origen = 0
            'conf.IdConfigProceso_Destino = 0
            'If TipoEjecucion = 0 Then
            conf.IdConfigProceso_Origen = IdConfigProceso_Origen
            conf.IdConfigProceso_Destino = IdConfigProceso_Destino
            'End If
            conf.User = oUsuario.vcUsu
            Return logica.Insertar_ConfExportCobros(conf)


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function


    <WebMethod()>
  <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Ubicacion_ddl(ByVal IdTipoFuente As String, ByVal Tipo As String, ByVal inTipOri As String) As List(Of ENT_UbicacionImportacion)

        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_ImportacionConfiguracion = Nothing
        Try
            logica = New BL_MOV_FAC_ImportacionConfiguracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_UbicacionImportacion)
            lista = logica.getListar_Ubicacion_ddl(IdTipoFuente, Tipo)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function


    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_DetalleUbicacion(ByVal IdConfigProceso As String, ByVal medio As String, ByVal inTipOri As String) As List(Of ENT_UbicacionImportacion)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_ImportacionConfiguracion = Nothing
        Try
            logica = New BL_MOV_FAC_ImportacionConfiguracion(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim lista As New List(Of ENT_UbicacionImportacion)
            lista = logica.getListar_DetalleUbicacion(IdConfigProceso, medio)
            logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function
    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Plantilla_ddl(ByVal IdConfigProceso As String, ByVal Tipo As String, ByVal inTipOri As String) As List(Of ENT_PCS_IMP_Plantilla)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_PCS_IMP_Plantilla = Nothing

        Try
            logica = New BL_PCS_IMP_Plantilla(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_PCS_IMP_Plantilla)
            lista = logica.Listar_Plantilla_ddl2(IdConfigProceso, Tipo)
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function
    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Formato_ddl(ByVal IdConfigProceso As String, ByVal inTipOri As String) As List(Of ENT_PCS_IMP_Formato)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_PCS_IMP_Formato = Nothing
        Try
            logica = New BL_PCS_IMP_Formato(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_PCS_IMP_Formato)
            lista = logica.Listar_Formatoddl2(IdConfigProceso)
            logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try

    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function getListar_Configuracion_Origen(ByVal IdConfigProceso As String, ByVal inTipOri As String) As List(Of ENT_PCS_IMP_Config_Proceso)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
        Try
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim lista As New List(Of ENT_PCS_IMP_Config_Proceso)


            If (IdConfigProceso = "" Or IdConfigProceso = "0") Then
                Return lista
            Else
                lista = logica.ListarConfiguracionImportExport(IdConfigProceso)
                logica.Dispose()
                Return lista
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try

    End Function

    <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar_PlantillaDetalle(ByVal IdConfigProceso As Integer, ByVal inTipOri As String) As List(Of ENT_PCS_IMP_Plantilla)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_PCS_IMP_Plantilla = Nothing
        Try
            logica = New BL_PCS_IMP_Plantilla(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_PCS_IMP_Plantilla)
            lista = logica.Listar_PlantillaDetalle(IdConfigProceso, "Destino")
            logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function
End Class
