Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.Proceso.Procesos

Partial Class P_Movil_Facturacion_Consultar_Con_Fac_CuentaCobro
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
        Dim logica As BL_MOV_FAC_Configuracion = Nothing

        Try
            logica = New BL_MOV_FAC_Configuracion(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
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

                    hdfEmpleado.Value = codigoEmpleado
                    hdfOrganizacion.Value = oUsuario.F_vcCodInt
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    Dim oConf As ENT_MOV_FAC_Configuracion

                    Dim tipo = 2 'Generacion de CC
                    oConf = logica.ListarConfiguracionProcesos(tipo)
                    If oConf.TipoEjecucion = 1 Then
                        hdfProcManualGenCC.Value = 1
                    Else
                        hdfProcManualGenCC.Value = 0
                    End If


                    tipo = 3 'Exportacion
                    oConf = logica.ListarConfiguracionProcesos(tipo)
                    If oConf.TipoEjecucion = 1 Then
                        hdfProcManualExpor.Value = 1
                    Else
                        hdfProcManualExpor.Value = 0
                    End If
                    hdfProcOrigenExpor.Value = oConf.IdConfigProceso_Origen
                    hdfProcDestinoExpor.Value = oConf.IdConfigProceso_Destino


                    tipo = 4 ' verificacion de pagos
                    oConf = logica.ListarConfiguracionProcesos(tipo)
                    logica.Dispose()
                    If oConf.TipoEjecucion = 1 Then
                        hdfProcManualVeri.Value = 1
                    Else
                        hdfProcManualVeri.Value = 0
                    End If
                    hdfProcOrigenVeri.Value = oConf.IdConfigProceso_Origen
                    hdfProcDestinoVeri.Value = oConf.IdConfigProceso_Destino
                    hdfIndGenPagos.Value = oConf.biGeneraPagos
                    hdfinTipOri.Value = inTipOri.ToString()

                    If hdfEmpleado.Value <> "" Then hdfTecnicoResponsable.Value = hdfEmpleado.Value


                    Dim hdfAdmin As String = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Or oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then hdfAdmin = "1"
                    If hdfAdmin = "0" And hdfOrganizacion.Value = "" And PerfilRecursos = False Then
                        bpTecnicoResponsable.Deshabilitado = True
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

    <WebMethod()>
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function GetListaCuentaCobro(ByVal periodo As String, ByVal valor As String, ByVal montoMenora As String, ByVal montoMayora As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_CuentaCobro)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_CuentaCobro = Nothing
        Try
            logica = New BL_MOV_FAC_CuentaCobro(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim lista As New List(Of ENT_MOV_FAC_CuentaCobro)

            Dim FechaInicio As String = "01/" + periodo.Substring(4, 2) + "/" + periodo.Substring(0, 4)

            Dim fec As DateTime
            DateTime.TryParse(FechaInicio, fec)

            fec = fec.AddMonths(1)
            Dim FechaFin As String
            Dim mes As String
            If fec.Month.ToString().Length > 1 Then
                mes = fec.Month.ToString()
            Else
                mes = "0" + fec.Month.ToString()
            End If

            FechaInicio = periodo+ "01"
            FechaFin = fec.Year.ToString() + mes + "01"
            Dim strSQL = ""
            If valor <> "" Then
                strSQL = "WHERE A.IdEmpleado = '" + valor + "' AND A.IdCliente=" + oUsuario.IdCliente.ToString()
                strSQL = strSQL + " AND Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
            Else
                strSQL = "WHERE A.IdCliente=" + oUsuario.IdCliente.ToString() + " AND Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
            End If

            Dim valorMayor As Decimal = 0
            Dim valorMenor As Decimal = 0

            If montoMayora <> String.Empty Then
                valorMayor = Convert.ToDecimal(montoMayora)
            End If
            If montoMenora <> String.Empty Then
                valorMenor = Convert.ToDecimal(montoMenora)
            End If

            If montoMenora <> String.Empty And montoMayora <> String.Empty Then
                'If valorMayor < valorMenor Then
                strSQL = strSQL + " AND Cargo" + " <=" + montoMenora.ToString() + " AND Cargo >=" + montoMayora.ToString()
                'End If

            End If


            If montoMenora = String.Empty And montoMayora <> String.Empty Then
                strSQL = strSQL + " AND Cargo >=" + montoMayora.ToString()
            End If

            If montoMenora <> String.Empty And montoMayora = String.Empty Then
                strSQL = strSQL + " AND Cargo <=" + montoMenora.ToString()
            End If




            lista = logica.Consulta_CuentaCobro(strSQL)
            logica.Dispose()

            HttpContext.Current.Session("vcFiltro_CuentaCobro") = FechaInicio & "|" & FechaFin & "|" & valor & "|" & montoMenora & "|" & montoMayora & "|" & periodo


            Return lista

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function
    Protected Sub eegSolicitudes_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_CuentaCobro = Nothing
        Try
            logica = New BL_MOV_FAC_CuentaCobro(Integer.Parse(1), oUsuario.IdCliente)

            Dim dtDatos As New DataTable

            Dim FechaInicio As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(0)
            Dim FechaFin As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(1)
            Dim valor As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(2)
            Dim montoMenora As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(3)
            Dim montoMayora As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(4)
            Dim periodo As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(5)



            Dim strSQL = ""
            If valor <> "" Then
                strSQL = "WHERE A.IdEmpleado = '" + valor + "' AND A.IdCliente=" + oUsuario.IdCliente.ToString()
                strSQL = strSQL + " AND Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
            Else
                strSQL = "WHERE A.IdCliente=" + oUsuario.IdCliente.ToString() + " AND Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
            End If

            Dim valorMayor As Decimal = 0
            Dim valorMenor As Decimal = 0

            If montoMayora <> String.Empty Then
                valorMayor = Convert.ToDecimal(montoMayora)
            End If
            If montoMenora <> String.Empty Then
                valorMenor = Convert.ToDecimal(montoMenora)
            End If

            If montoMenora <> String.Empty And montoMayora <> String.Empty Then
                'If valorMayor < valorMenor Then
                strSQL = strSQL + " AND Cargo" + " <=" + montoMenora.ToString() + " AND Cargo >=" + montoMayora.ToString()
                'End If

            End If


            If montoMenora = String.Empty And montoMayora <> String.Empty Then
                strSQL = strSQL + " AND Cargo >=" + montoMayora.ToString()
            End If

            If montoMenora <> String.Empty And montoMayora = String.Empty Then
                strSQL = strSQL + " AND Cargo <=" + montoMenora.ToString()
            End If


            dtDatos = logica.Consulta_CuentaCobroExcel(strSQL)
            eegSolicitudes.ExportarDatos(dtDatos, "Cuenta Cobro_" + periodo)

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Sub GetProcesoExportacion(ByVal origen As Integer, ByVal destino As Integer,  ByVal inTipOri As String)

        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Cola = Nothing
        Try
            logica = New BL_MOV_FAC_Cola(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim cola As New ENT_MOV_FAC_Cola
            cola.InTipoConfiguracion = 3 ' inserta en la cola la  exportacion de cuenta de cobro
            cola.IdCliente = oUsuario.IdCliente

            logica.Insertar_Cola(cola)


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Sub Proc_GenCuentaCobro(ByVal inTipOri As String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Cola = Nothing
        Try
            logica = New BL_MOV_FAC_Cola(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim cola As New ENT_MOV_FAC_Cola
            cola.InTipoConfiguracion = 2 ' inserta en la cola la cuenta de cobro
            cola.IdCliente = oUsuario.IdCliente


            logica.Insertar_Cola(cola)
            logica.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try


    End Sub

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
            'Return 1

            'Else
            '    'PROCESO QUE GENERA LOS PAGOS DE FORMA MANUAL
            '    'Importa los pagos a la tabla MOV_FAC_PAGOS , ACTUALIZA EL IDIMPORTACION A TODOS LOS VALORES NULOS Y TRABAJA
            'Dim logica As ProcesosFunciones = New ProcesosFunciones()
            'codImpor = logica.Proceso_Entidad_Facturacion(origen, destino)
            'Dim logica2 As BL_MOV_FAC_Servicio = BL_MOV_FAC_Servicio.Instance(oUsuario.IdCliente)
            'If codImpor <> 0 Then
            '    'ACTUALIZA LOS NU
            '    logica2.Proceso_VerificaPagos(codImpor)

            'End If
            'Return codImpor
            'End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub
    'int take,int skip
    <WebMethod()>
  <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function GetLista(ByVal take As Integer, ByVal skip As Integer) As Object

        'Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        'Dim logica As BL_MOV_FAC_CuentaCobro = New BL_MOV_FAC_CuentaCobro(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try
            Dim FechaInicio As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(0)
            Dim FechaFin As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(1)
            Dim valor As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(2)
            Dim montoMenora As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(3)
            Dim montoMayora As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(4)
            Dim periodo As String = HttpContext.Current.Session("vcFiltro_CuentaCobro").ToString().Split("|")(5)

            Dim lista As New List(Of ENT_MOV_FAC_CuentaCobro)
            lista = GetListaCuentaCobro(periodo, valor, montoMenora, montoMayora, 1)
            Dim result = New With { _
             Key .data = lista.Skip(skip).Take(take).ToList(), _
             Key .total = lista.Count _
            }
            Return result

            'HttpContext.Current.Session("vcFiltro_CuentaCobro") = FechaInicio & "|" & FechaFin & "|" & valor & "|" & montoMenora & "|" & montoMayora & "|" & periodo


            'Return lista

        Catch ex As Exception

            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function
End Class
