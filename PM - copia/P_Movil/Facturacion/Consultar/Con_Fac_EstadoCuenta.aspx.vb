Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Facturacion_Consultar_Con_Fac_EstadoCuenta
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    'Valida si es perfil de Recursos Humanos -- Jcamacho 21/10/2015
                    Dim PerfilRecursos As Boolean = False
                    If (oUsuario.Perfiles.Where(Function(x) x.P_inCod = 39).Count > 0) Then
                        PerfilRecursos = True
                    End If

               Dim vcTab As String = Request.QueryString("vcTab")
               Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
               Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
               Dim inTip As Integer = Val("" & Request.QueryString("inTip"))
               'hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfOrganizacion.Value = oUsuario.F_vcCodInt
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    Dim codigoEmpleado As String = String.Empty
                    Dim vcCondicion As String = ""
                    'vcCondicion = "EMPL_btEST=1"
                    'vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente = 1)"
                    vcCondicion = vcCondicion + " EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente = 1)"
                    If oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then
                        vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
                    Else
                        vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.Empleado.P_vcCod + "|"
                        codigoEmpleado = oUsuario.Empleado.P_vcCod
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
                    bpTecnicoResponsable.CodigoValor = codigoEmpleado
                    bpTecnicoResponsable.MuestraMensajeNoDatos = False
                    '-->
                    hdfEmpleado.Value = codigoEmpleado

                    Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Facturacion/Exportacion/EstadoCuenta/"), "/")
                    
                    hdfRuta.Value = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/"), "/P_Movil/Facturacion/Exportacion/EstadoCuenta" + CarpetaDominio + "/")
                    hdfinTipOri.Value = inTipOri.ToString()
                    hdfAdmin.Value = "0"
                    'If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                    If UtilitarioWeb.Seguridad.EsAdministrador Or oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then hdfAdmin.Value = "1"
                    If hdfEmpleado.Value <> "" Then hdfTecnicoResponsable.Value = hdfEmpleado.Value
                End If
                hdfFecServidor.Value = UtilitarioWeb.ObtieneFechaHoraANSIServidor(False)
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
    Public Shared Function ListarEstadoCuenta(ByVal IdEmpleado As String, ByVal inTipOri As String, ByVal p_periodo As String) As List(Of ENT_MOV_FAC_EstadoCuenta)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_EstadoCuenta = Nothing
        Try
            logica = New BL_MOV_FAC_EstadoCuenta(Integer.Parse(inTipOri), oUsuario.IdCliente)
            'Dim linea As BL_MOV_FAC_EstadoCuenta = BL_MOV_FAC_EstadoCuenta.Instance(oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_EstadoCuenta)
            lista = logica.Listar_EstadoCuenta(IdEmpleado, p_periodo)
            HttpContext.Current.Session("vcFiltro_ECuenta") = IdEmpleado & "|" & inTipOri & "|" & p_periodo
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
    Public Shared Function getEmpleado(ByVal valor As String, ByVal inTipOri As String) As ENT_GEN_Empleado
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_GEN_Empleado = Nothing
        Try
            logica = New BL_GEN_Empleado(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim entidad As New ENT_GEN_Empleado

            entidad = logica.getEmpleados(valor)
            logica.Dispose()
            Return entidad
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
   Public Shared Function getCronograma6M(ByVal IdEmpleado As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_CronogramaPago)
      Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_CronogramaPago = Nothing
        Try
            logica = New BL_MOV_FAC_CronogramaPago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_CronogramaPago)
         lista = logica.Listar_Cronograma_6M(IdEmpleado)
         Return lista
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If logica IsNot Nothing Then logica.Dispose()
      End Try
    End Function

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim inTipOri As String = HttpContext.Current.Session("vcFiltro_ECuenta").ToString().Split("|")(1)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_EstadoCuenta = Nothing

        Try
            logica = New BL_MOV_FAC_EstadoCuenta(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim IdEmpleado As String = HttpContext.Current.Session("vcFiltro_ECuenta").ToString().Split("|")(0)
            Dim p_periodo As String = HttpContext.Current.Session("vcFiltro_ECuenta").ToString().Split("|")(2)
            Dim dtDatos As New DataTable
            dtDatos = logica.Listar_EstadoCuentaExcel(IdEmpleado, p_periodo)
            eegSolicitudes.ExportarDatos(dtDatos, "Estado_de_cuenta_" + IdEmpleado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function GetPeriodoxEmpl(ByVal idEmpleado As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim EstadoCuenta As BL_MOV_FAC_EstadoCuenta = Nothing
        Try
            EstadoCuenta = New BL_MOV_FAC_EstadoCuenta(oUsuario.IdCliente)

            Dim periodo As String = EstadoCuenta.GetPeriodoxEmpleado(idEmpleado)

            Return periodo

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If EstadoCuenta IsNot Nothing Then EstadoCuenta.Dispose()
        End Try
    End Function



    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function GenerarEstadoCuentaPDF(ByVal IdEmpleado As String, ByVal Anio As String, ByVal Mes As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim oBL_MOV_FAC_Servicio As BL_MOV_FAC_Servicio = Nothing
        Dim ruta As String = ""
        Try
            Dim IdDominio As String = "" & HttpContext.Current.Session("IdDominio")
            If IdDominio = "" Then IdDominio = "0"
            Dim rutaEC As String = IO.Path.Combine(HttpContext.Current.Server.MapPath("~"), "P_Movil\Facturacion\Exportacion\EstadoCuenta")
            If Mes <> "" Then Mes = Val(Mes)

            oBL_MOV_FAC_Servicio = New BL_MOV_FAC_Servicio(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, 0, IdDominio)
            If oBL_MOV_FAC_Servicio.Reporte_CuentaCobro(IdEmpleado, Anio, Mes, 0, rutaEC) Then
                Dim sFileDirAnho As String = rutaEC + "\\" + Anio
                Dim sFileDirMes As String = sFileDirAnho + "\\" + DevuelveMes(Mes) + "\\"
                Dim archivo As String = "Estado_de_Cuenta" + "_" + IdEmpleado + ".pdf"
                ruta = sFileDirMes + archivo
            End If
            Return ruta
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oBL_MOV_FAC_Servicio IsNot Nothing Then oBL_MOV_FAC_Servicio.Dispose()
        End Try
    End Function

    Public Shared Function DevuelveMes(mes As String) As String
        Dim mesCadena As String = ""
        If (mes = "1") Then mesCadena = "Enero"
        If (mes = "2") Then mesCadena = "Febrero"
        If (mes = "3") Then mesCadena = "Marzo"
        If (mes = "4") Then mesCadena = "Abril"
        If (mes = "5") Then mesCadena = "Mayo"
        If (mes = "6") Then mesCadena = "Junio"
        If (mes = "7") Then mesCadena = "Julio"
        If (mes = "8") Then mesCadena = "Agosto"
        If (mes = "9") Then mesCadena = "Setiembre"
        If (mes = "10") Then mesCadena = "Octubre"
        If (mes = "11") Then mesCadena = "Noviembre"
        If (mes = "12") Then mesCadena = "Diciembre"
        Return mesCadena
    End Function


End Class
