Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.CuentaCobro.BE
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes
Imports System.Data
Imports VisualSoft.Suite80.BL

Partial Class P_Movil_Facturacion_Configurar_Fac_Conf_Cese
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim negocio As BL_MOV_FAC_Configuracion = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
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
                    oAuditoria.Opcion = AuditoriaConstantes.ModuloFacturacion.Ceses
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()


                    negocio = New BL_MOV_FAC_Configuracion(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim conf As New ENT_MOV_FAC_Configuracion

                    conf = negocio.ListarConfiguracion2(1)

                    ddlTipoEjecucion.SelectedValue = conf.TipoEjecucion
                    ddlTipoEjecucion.DataBind()
                    txtHora.Text = conf.Hora
                    txtMinuto.Text = conf.Minuto
                    txtIndTiempo.SelectedValue = conf.IndTiempo
                    txtIndTiempo.DataBind()

                    hdfTipoConf.Value = 1
                    hdfEjecucion.Value = conf.TipoEjecucion

                    hdfProceso_Origen.Value = conf.IdConfigProceso_Origen

                    Dim Destino As String = "-1"
                    Dim dt As New DataTable


                    dt = negocio.ObtieneProceso("MOV_FAC_CeseTemp", "Destino")
                    If dt.Rows.Count > 0 Then
                        Destino = dt.Rows(0)("IdConfigProceso").ToString()

                    End If
                    negocio.Dispose()
                    hdfProceso_Destino.Value = Destino

                    TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
                    Dim dtTipoSolicitud As DataTable = TipoSolicitud.Mostrar(31).Tables("dtTipoSolicitud")

                    If dtTipoSolicitud.Rows.Count > 0 Then
                        If dtTipoSolicitud.Rows(0)("inTecnicoResponsable").ToString() = "" Then hdfHayResTec.Value = 0
                        If dtTipoSolicitud.Rows(0)("biPropie") = False And dtTipoSolicitud.Rows(0)("biUsuEsp") = False And dtTipoSolicitud.Rows(0)("biResAre") = False Then
                            hdfHayResApr.Value = 0
                        End If
                    End If

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then TipoSolicitud.Dispose()
            If negocio IsNot Nothing Then negocio.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Insertar_ConfCeses(ByVal TipoEjecucion As String, _
                                                           ByVal Hora As String, ByVal Minuto As String, ByVal IndTiempo As String, _
                                                           ByVal IdConfigProceso_Origen As Integer, ByVal IdConfigProceso_Destino As Integer, ByVal User As String, ByVal inTipOri As String) As String

        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
        Try
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim fecha As String
            fecha = FechaValida(DateTime.Now.ToShortDateString())
            fecha = fecha + " " + Hora + ":" + Minuto + ":00 " + IndTiempo

            Dim conf As New ENT_MOV_FAC_Configuracion
            'conf.idCliente = oUsuario.IdCliente
            conf.IdTipoConfiguracion = 1 '1 = Ceses
            conf.TipoEjecucion = TipoEjecucion '0=Automatica, 1=Manual 2=ninguna
            conf.Hora = fecha
            conf.Minuto = Minuto
            conf.IndTiempo = IndTiempo
            conf.IdConfigProceso_Origen = IdConfigProceso_Origen
            conf.IdConfigProceso_Destino = IdConfigProceso_Destino
            conf.User = oUsuario.vcUsu
            Return logica.Insertar_ConfCeses(conf)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function
    Public Shared Function FechaValida(ByVal _fecha As String) As String
        Dim fecha_sql As String = ""
        Dim dia, mes, anno As String
        If (_fecha.Length >= 10) Then
            dia = _fecha.Substring(0, 2)
            mes = _fecha.Substring(3, 2)
            anno = _fecha.Substring(6, 4)
            fecha_sql = anno + mes + dia
        End If
        Return fecha_sql
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
            'logica.Dispose()
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
            'logica.Dispose()
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
            'logica.Dispose()
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
            'logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try

    End Function

    <WebMethod()> _
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
                'logica.Dispose()
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
            lista = logica.Listar_PlantillaDetalle(IdConfigProceso, "Origen")
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
