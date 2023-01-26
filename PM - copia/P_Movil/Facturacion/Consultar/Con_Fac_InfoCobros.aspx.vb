Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.Proceso.Procesos
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes
Imports System.IO
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Facturacion_Consultar_Con_Fac_InfoCobros
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
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
                    Dim PerfilRecursos = oUsuario.Perfiles.Where(Function(x) x.P_inCod = 39).Count > 0
                    Dim codigoEmpleado As String = String.Empty
                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

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

                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Opcion = "[Pagos]"
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()



                    hdfEmpleado.Value = codigoEmpleado
                    hdfOrganizacion.Value = oUsuario.F_vcCodInt
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    logica = New BL_MOV_FAC_Configuracion(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    hdfAdmin.Value = "0"
                    'If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                    If UtilitarioWeb.Seguridad.EsAdministrador Or oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then hdfAdmin.Value = "1"

                    Dim oConf As ENT_MOV_FAC_Configuracion
                    Dim tipo = 4 'BL_GEN_TipoServicio verificacion de pagos

                    oConf = logica.ListarConfiguracionProcesos(tipo)
                    logica.Dispose()
                    If oConf.TipoEjecucion = 1 Then
                        hdfProcManual.Value = 1
                    Else
                        hdfProcManual.Value = 0
                    End If

                    hdfIndGenPagos.Value = oConf.biGeneraPagos
                    hdfProcOrigen.Value = oConf.IdConfigProceso_Origen
                    hdfProcDestino.Value = oConf.IdConfigProceso_Destino
                    hdfinTipOri.Value = inTipOri.ToString()

                    txtFechaInicio.Text = DateTime.Now.AddMonths(-1).ToShortDateString
                    txtFechaFin.Text = DateTime.Now.ToShortDateString

                    'ByVal FechaInicio As String, ByVal FechaFin As String, ByVal valor As String, ByVal montoMenora As String, ByVal montoMayora As String, ByVal inTipOri As String
                    'HttpContext.Current.Session("vcFiltro_Cronograma") = DateTime.Now.AddMonths(-1).ToShortDateString & "|" & DateTime.Now.ToShortDateString & "|" & "" & "|" & "" & "|" & ""

                    If hdfEmpleado.Value <> "" Then
                        hdfTecnicoResponsable.Value = hdfEmpleado.Value
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", "cargarGrilla_Cliente(); ", True)
                    End If

                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    Shared Function FechaSql(ByVal Fecha As String) As String
        Dim dia As String
        Dim mes As String
        Dim anho As String
        dia = Fecha.Substring(0, 2)
        mes = Fecha.Substring(3, 2)
        anho = Fecha.Substring(6, 4)

        Return anho + mes + dia
    End Function
    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function GetListaCobros(ByVal FechaInicio As String, ByVal FechaFin As String, ByVal valor As String, ByVal montoMenora As String, ByVal montoMayora As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Pago)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Pago = Nothing
        Try
            logica = New BL_MOV_FAC_Pago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_Pago)

            Dim filtro As String = ""
            Dim strSQL = ""

            Dim valorMayor As Decimal = 0
            Dim valorMenor As Decimal = 0

            If valor <> "" Then
                strSQL = "WHERE EMPL_P_vcCODEMP = '" + valor + "'"
                If FechaInicio.Length = 8 AndAlso FechaInicio.IndexOf("/") = -1 AndAlso FechaFin.Length = 8 AndAlso FechaFin.IndexOf("/") = -1 Then
                    strSQL = strSQL + " AND Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
                Else
                    strSQL = strSQL + " AND Fecha >='" + FechaSql(FechaInicio) + "' AND Fecha <='" + FechaSql(FechaFin) + "'"
                End If
            Else
                If FechaInicio.Length = 8 AndAlso FechaInicio.IndexOf("/") = -1 AndAlso FechaFin.Length = 8 AndAlso FechaFin.IndexOf("/") = -1 Then
                    strSQL = "WHERE Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
                Else
                    strSQL = "WHERE Fecha >='" + FechaSql(FechaInicio) + "' AND Fecha <='" + FechaSql(FechaFin) + "'"
                End If
            End If

            If montoMayora <> String.Empty Then
                valorMayor = Convert.ToDecimal(montoMayora)
            End If
            If montoMenora <> String.Empty Then
                valorMenor = Convert.ToDecimal(montoMenora)
            End If

            If montoMenora <> String.Empty And montoMayora <> String.Empty Then
                If valorMayor < valorMenor Then
                    strSQL = strSQL + " AND MontoPagado" + " <=" + montoMenora.ToString() + " AND MontoPagado >=" + montoMayora.ToString()
                End If

            End If

            If montoMenora = String.Empty And montoMayora <> String.Empty Then
                strSQL = strSQL + " AND MontoPagado >=" + montoMayora.ToString()
            End If

            If montoMenora <> String.Empty And montoMayora = String.Empty Then
                strSQL = strSQL + " AND MontoPagado <=" + montoMenora.ToString()
            End If

            'ByVal FechaInicio As String, ByVal FechaFin As String, ByVal valor As String, ByVal montoMenora As String, ByVal montoMayora As String, ByVal inTipOri As String
            HttpContext.Current.Session("vcFiltro_Cronograma") = FechaInicio & "|" & FechaFin & "|" & valor & "|" & montoMenora & "|" & montoMayora


            lista = logica.Consulta_Pagos(strSQL)
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
    Public Shared Sub GetProcesoVerificacionCobros(ByVal origen As Integer, ByVal destino As Integer, ByVal indGenPagos As Integer, ByVal inTipOri As String)

        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Cola = Nothing
        Try
            logica = New BL_MOV_FAC_Cola(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim codImpor As Integer = 0

            'If indGenPagos = 1 Then
            'PROCESO QUE GENERA LOS PAGOS DE MANERA AUTOMATICA Y MANUAL
            'Inserta en la tabla MOV_FAC_Pago los pagos equivalentes a la deuda del periodo generada en la cuenta de cobro y actualiza los pagos
            'generando una cuenta de cobro sin deudas pendientes,sustentando eso insertando pagos.
            Dim oCola As New ENT_MOV_FAC_Cola
            oCola.InTipoConfiguracion = 4 'Importacion de Pagos
            oCola.IdCliente = oUsuario.IdCliente
            logica.Insertar_Cola(oCola)
            logica.Dispose()
            'Return 1

            'Else
            '    '    'PROCESO QUE GENERA LOS PAGOS DE FORMA MANUAL
            '    '    'Importa los pagos a la tabla MOV_FAC_PAGOS , ACTUALIZA EL IDIMPORTACION A TODOS LOS VALORES NULOS Y TRABAJA
            '    Dim logica As ProcesosFunciones = New ProcesosFunciones()
            '    codImpor = logica.Proceso_Entidad_Facturacion(origen, destino)
            '    Dim logica2 As BL_MOV_FAC_Servicio = BL_MOV_FAC_Servicio.Instance(oUsuario.IdCliente)
            '    If codImpor <> 0 Then
            '        'ACTUALIZA LOS NU
            '        logica2.Proceso_VerificaPagos(codImpor)

            '    End If
            '    'Return codImpor
            'End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oContrato As String) As Integer
        Try



            Dim oSerializer As New JavaScriptSerializer
            Dim oContrato As MOV_CAM_Contrato = oSerializer.Deserialize(Of MOV_CAM_Contrato)(p_oContrato)
            GuardarArchivoRuta(oContrato.RutaContratoTemporal)
            Return 0
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Private Shared Sub GuardarArchivoRuta(ByRef RutaContratoTemporal As String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Servicio = Nothing
        Try
            logica = New BL_MOV_FAC_Servicio(Integer.Parse(1), oUsuario.IdCliente)
            Dim ruta As String = RutaContratoTemporal
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Facturacion/Importacion/PagosEmpleados/"), "/")

            Dim sourcePath As String = HttpContext.Current.Server.MapPath("~/" & Path.GetDirectoryName(ruta))
            Dim targetPath As String = HttpContext.Current.Server.MapPath("~/P_Movil/Facturacion/Importacion/PagosEmpleados" + CarpetaDominio + "/")


            logica.CreaCarpeta_ImportacionExportacion(ruta, sourcePath, targetPath, 4)
            logica.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

        Dim logica As BL_MOV_FAC_Pago = Nothing
        Try
            logica = New BL_MOV_FAC_Pago(Integer.Parse(1), oUsuario.IdCliente)
            Dim FechaInicio As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(0)
            Dim FechaFin As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(1)
            Dim valor As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(2)
            Dim montoMenora As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(3)
            Dim montoMayora As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(4)




            Dim dtDatos As New DataTable
            Dim filtro As String = ""


            Dim strSQL = ""

            Dim valorMayor As Decimal = 0
            Dim valorMenor As Decimal = 0

            If valor <> "" Then
                strSQL = "WHERE EMPL_P_vcCODEMP = '" + valor + "'"
                strSQL = strSQL + " AND Fecha >='" + FechaSql(FechaInicio) + "' AND Fecha <='" + FechaSql(FechaFin) + "'"
            Else
                strSQL = "WHERE Fecha >='" + FechaSql(FechaInicio) + "' AND Fecha <='" + FechaSql(FechaFin) + "'"
            End If

            If montoMayora <> String.Empty Then
                valorMayor = Convert.ToDecimal(montoMayora)
            End If
            If montoMenora <> String.Empty Then
                valorMenor = Convert.ToDecimal(montoMenora)
            End If

            If montoMenora <> String.Empty And montoMayora <> String.Empty Then
                If valorMayor < valorMenor Then
                    strSQL = strSQL + " AND MontoPagado" + " <=" + montoMenora.ToString() + " AND MontoPagado >=" + montoMayora.ToString()
                End If

            End If

            If montoMenora = String.Empty And montoMayora <> String.Empty Then
                strSQL = strSQL + " AND MontoPagado >=" + montoMayora.ToString()
            End If

            If montoMenora <> String.Empty And montoMayora = String.Empty Then
                strSQL = strSQL + " AND MontoPagado <=" + montoMenora.ToString()
            End If



            dtDatos = logica.Consulta_PagosExcel(strSQL)
            logica.Dispose()

            eegSolicitudes.ExportarDatos(dtDatos, "Pagos" + valor)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    Shared Function DevuelveMes(ByVal mes As Integer) As String
        Dim mesCadena As String = ""
        If mes = 1 Then
            mesCadena = "Enero"
        ElseIf mes = 2 Then
            mesCadena = "Febrero"
        ElseIf mes = 3 Then
            mesCadena = "Marzo"
        ElseIf mes = 4 Then
            mesCadena = "Abril"
        ElseIf mes = 5 Then
            mesCadena = "Mayo"
        ElseIf mes = 6 Then
            mesCadena = "Junio"
        ElseIf mes = 7 Then
            mesCadena = "Julio"
        ElseIf mes = 8 Then
            mesCadena = "Agosto"
        ElseIf mes = 9 Then
            mesCadena = "Setiembre"
        ElseIf mes = 10 Then
            mesCadena = "Octubre"
        ElseIf mes = 11 Then
            mesCadena = "Noviembre"
        ElseIf mes = 12 Then
            mesCadena = "Diciembre"
        End If
        Return mesCadena
    End Function
End Class
