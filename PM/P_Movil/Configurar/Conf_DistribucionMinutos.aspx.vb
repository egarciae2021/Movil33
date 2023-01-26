Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.ImportacionExportacion
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services
Imports UtilitarioWeb
Imports ClosedXML.Excel
Imports VisualSoft.Comun.Auditoria

Partial Class P_Movil_Configurar_Conf_DistribucionMinutos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Parametros As BL_MOV_Parametros = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Distribucion As BL_MOV_Distribucion_Configuracion = Nothing
        Dim Estado As BL_MOV_Estado = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim oSEG_Politica As BL_SEG_Politica = New BL_SEG_Politica(oUsuario.IdCliente)

            If Not IsPostBack Then

                hdfEsPrincipal.Value = "2"

                ttgInfoArea.Mensaje = "Se aplicará el monto de minutos consumido por cada línea en el periodo seleccionado, si es mas de un periodo, se calcurá el promedio consumido por cada línea"

                Parametros = New BL_MOV_Parametros(oUsuario.IdCliente)
                Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                Distribucion = New BL_MOV_Distribucion_Configuracion(oUsuario.IdCliente)
                Estado = New BL_MOV_Estado(oUsuario.IdCliente)

                Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("D1")

                rblstTipoDistribucion.SelectedValue = lstParametros(0).Valor
                rblstTipoDistribucion.Attributes("idParametro") = lstParametros(0).IdParametro

                rblstClaseDistribucion.SelectedValue = lstParametros(1).Valor
                rblstClaseDistribucion.Attributes("idParametro") = lstParametros(1).IdParametro
                If lstParametros(0).Valor <> "1" Then
                    dvClaseDistribucion.Style("display") = ""
                End If

                Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(-1, "<Seleccionar>")
                UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")

                Dim lstTipoDist As List(Of ENT_MOV_Distribucion_Tipo) = Distribucion.ListarDistribucionTipo()
                UtilitarioWeb.Dataddl(ddlTipoDist, lstTipoDist, "vcNom", "inCod")
                UtilitarioWeb.Dataddl(ddlEditTipoDist, lstTipoDist, "vcNom", "inCod")
                UtilitarioWeb.Dataddl(ddlFiltroTipDis, lstTipoDist, "vcNom", "inCod")

                Dim dtEstadosProceso As DataTable = Estado.ListarPorModulo(14, 0)
                UtilitarioWeb.Dataddl(ddlFiltroEstPro, dtEstadosProceso, "vcNom", "P_inCod")

                Dim oDatosConfiguracion As ENT_MOV_Distribucion_Configuracion = Distribucion.ListarDatosConfiguracion_Distribucion()

                Dim p_esAdmin As String = "0"
                Dim p_esResp As String = "0"

                For Each oPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                    If oPerfil.P_inCod = 1 Then 'es administrador
                        p_esAdmin = "1"
                    End If
                    If oPerfil.P_inCod = 41 Then 'es administrador de bolsa
                        p_esResp = "1"
                    End If
                Next

                'Dim oPolitica As String = oSEG_Politica.Listar("usu_bolsa").Item(0).vcVal
                Dim oPolitica As String = IIf(oDatosConfiguracion.btDistPorOrgUsu, "1", "0")


                Dim script As String = "var F_vcCodInt = '" + oUsuario.F_vcCodInt.ToString() +
                                        "';var p_PolOrga = '" + oPolitica +
                                        "';var p_esAdmin='" + p_esAdmin +
                                        "';var p_esResp = '" + p_esResp + "';"

                'CONFIGURACION DE BOLSA
                Dim lstTipoFecha As New List(Of ENT_MOV_Distribucion_TipoFecha)
                lstTipoFecha = Distribucion.ListarTipoFecha_Distribucion(0)
                If lstTipoFecha.Count() > 0 Then
                    lblNomLimEnv.Text = lstTipoFecha(0).vcNom
                    lblNomDiaProc.Text = lstTipoFecha(1).vcNom
                End If

                script += "var arFechasCuenta = [];"
                If oDatosConfiguracion.lstFechas.Count > 0 Then
                    For Each oFecha As ENT_MOV_Distribucion_FechaCuenta In oDatosConfiguracion.lstFechas
                        script += "arFechasCuenta['" + oFecha.TipoFecha.inCod.ToString() + "|" + oFecha.vcCodCue.ToString() + "'] = [];"
                        script += "arFechasCuenta['" + oFecha.TipoFecha.inCod.ToString() + "|" + oFecha.vcCodCue.ToString() + "'].inFecha = '" + oFecha.inFecha.ToString() + "';"
                    Next
                End If

                'Registra auditoria...
                Dim oAuditoria As New ProcesaAuditoria
                oAuditoria.Usuario = oUsuario
                oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.Name
                oAuditoria.NombreUsuario = oUsuario.vcUsu
                oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.ListarPeriodosBolsa
                oAuditoria.Tabla = Constantes.TableNames.BolsaPeriodo
                oAuditoria.Especial("Ingreso al listado de Periodos de Distribución")

                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Parametros) Then Parametros.Dispose()
            If Not IsNothing(Operador) Then Operador.Dispose()
            If Not IsNothing(Distribucion) Then Distribucion.Dispose()
            If Not IsNothing(Estado) Then Estado.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Listar_Periodo(ByVal inPagTam As Integer, ByVal inPagAct As Integer,
                                          ByVal vcCriterio1 As String, ByVal vcCriterio2 As String,
                                          ByVal p_vcCodInt2 As String, ByVal p_Fil_vcCodCuenta As String,
                                          ByVal p_Fil_vcDesCuenta As String, ByVal p_fil_inEstPro As Integer,
                                          ByVal p_Fil_vcDesOperador As String, ByVal p_Fil_vcPeriodo As String,
                                          ByVal p_Fil_vcEstado As String, ByVal p_Fil_inTipDis As Integer) As Object
        Dim CuentaBolsaPeriodo As BL_MOV_CuentaBolsaPeriodo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsaPeriodo = New BL_MOV_CuentaBolsaPeriodo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = CuentaBolsaPeriodo.ListarPeriodo(0, p_vcCodInt2, p_Fil_vcCodCuenta, p_Fil_vcDesCuenta, p_fil_inEstPro,
                                                        p_Fil_vcDesOperador, p_Fil_vcPeriodo, p_Fil_vcEstado, p_Fil_inTipDis)
            If vcCriterio2.Length > 0 Then
                Dim dataView As New DataView(dt)
                dataView.Sort = vcCriterio2 + " " + vcCriterio1
                dt = dataView.ToTable
            End If
            Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(CuentaBolsaPeriodo) Then CuentaBolsaPeriodo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Listar_Historico(ByVal p_vcCodLin As String, ByVal p_vcCodCue As String, ByVal p_vcCodInt2 As String) As List(Of ENT_MOV_Linea)
        Dim Distribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Distribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Return Distribucion.ListarDistribucionServicios_Historico(p_vcCodLin, p_vcCodCue, p_vcCodInt2)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(Distribucion) Then Distribucion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarServicioPorCuenta(ByVal vcCodCue As String) As List(Of String)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Servicio As BL_GEN_Servicio = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
            Servicio = New BL_GEN_Servicio(oUsuario.IdCliente)

            'Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarTiposServiciosPorCuenta(vcCodCue.Replace("&#39", "'"))
            Dim _return As List(Of ENT_GEN_Servicio) = Servicio.ListarPorCuenta(vcCodCue.Replace("&#39", "'"))

            Dim dt As DataTable = Cuenta.ListarSubCuenta(vcCodCue.Replace("&#39", "''"))

            Dim p_vcNomSer As String = ""
            Dim p_inCodSubCue As Integer = 0
            Dim p_inCant As Integer = 0

            For Each row As DataRow In dt.Rows
                If row("vcNomTipoSer").ToString = "Llamadas" Then
                    If p_inCant.ToString.Length > 0 And row("dcCan") < 1 Then
                        'NADA 
                    Else
                        p_inCodSubCue = row("p_inCodSubCue")
                        p_inCant = row("dcCan")
                        p_vcNomSer = row("vcNom")
                    End If
                End If
            Next

            Dim miLista As New List(Of String)

            miLista.Add(p_inCodSubCue)
            miLista.Add(p_inCant)
            miLista.Add(p_vcNomSer)

            Return miLista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Servicio) Then Servicio.Dispose()
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Activar_Periodo(ByVal p_idPeriodo As String) As Integer
        Dim CuentaBolsa As BL_MOV_CuentaBolsaPeriodo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaPeriodo(oUsuario.IdCliente)
            Dim result As Integer
            'AUDITORIA
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = oUsuario
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.ActivarDistribucionBolsa
            oAuditoria.Tabla = Constantes.TableNames.BolsaPeriodo
            'AUDITORIA:Actualizar Antes
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {p_idPeriodo})

            result = CuentaBolsa.DistribucionCuentaBolsa_Activar(p_idPeriodo, oUsuario.P_inCod)

            'AUDITORIA:Actualizar Después
            If (result <> -1 Or result <> -2) Then
                oAuditoria.DespuesActualizar(New String() {p_idPeriodo}, strAntes)
            End If

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Elimina_Periodo(ByVal idPeriodo As String) As Integer
        Dim CuentaBolsa As BL_MOV_CuentaBolsaPeriodo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaPeriodo(oUsuario.IdCliente)
            Dim result As Integer = 0
            'AUDITORIA
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = oUsuario
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.EliminarDistribucionBolsa
            oAuditoria.Tabla = Constantes.TableNames.BolsaPeriodo
            oAuditoria.Origen = 1
            'AUDITORIA:Actualizar Antes
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {idPeriodo})

            result = CuentaBolsa.DistribucionCuentaBolsa_Eliminar(idPeriodo, oUsuario.P_inCod)

            If (result = 1) Then 'Eliminación Lógica
                oAuditoria.EliminarAuditoria(idPeriodo, strAntes, False, 1)
            ElseIf (result = 2) Then 'Eliminación Física
                oAuditoria.EliminarAuditoria(idPeriodo, strAntes, True, 1)
            End If

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String) As List(Of ENT_MOV_Cuenta)
        'Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Distribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
            Distribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            'Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperadorDistribucionMinutos(inCodOpe)
            Dim _return As List(Of ENT_MOV_Cuenta) = Distribucion.ListarCuentasDistribucion(inCodOpe, oUsuario.F_vcCodInt, 1, 2)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            'If Not IsNothing(Cuenta) Then Cuenta.Dispose()
            If Not IsNothing(Distribucion) Then Distribucion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GuardarPeriodo(ByVal vcPer As String, ByVal idCue As String, ByVal idTipDis As Integer, ByVal idSubCue As Integer) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim CuentaBolsa As BL_MOV_CuentaBolsaPeriodo = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaPeriodo(oUsuario.IdCliente)
            Dim nGuid As String = Guid.NewGuid().ToString().Replace("-", "").ToUpper()
            Dim resultInsert As Integer
            resultInsert = CuentaBolsa.Insertar(vcPer, idCue, idTipDis, oUsuario.P_inCod, nGuid, idSubCue)

            Dim lstString As New List(Of String)
            lstString.Add(resultInsert.ToString())
            lstString.Add(IIf(resultInsert <> 0, nGuid, ""))

            Return lstString
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Validar_Periodo(ByVal p_vcPeriodo As String, ByVal p_idCuenta As String, ByVal vcModo As String) As Int32
        Dim CuentaBolsa As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            Dim result As Integer = 0
            'If vcModo.Length > 0 Then
            '    Dim fecha_Actual As Date = DateTime.Now()
            '    p_vcPeriodo = fecha_Actual.Month.ToString + "/" + fecha_Actual.Year.ToString
            'End If

            result = CuentaBolsa.DistribucionServicios_ValidarPeriodo(p_vcPeriodo, p_idCuenta)
            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Copia_Periodo(ByVal p_vcPeriodoNuevo As String, ByVal p_vcPeriodo As String, ByVal p_vcCuenta As String) As Int32
        Dim CuentaBolsa As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            ''Dim p_vcNuevoPeriodo As String = ""
            ''
            ''Dim fecha_Actual As Date = DateTime.Now()
            ''p_vcNuevoPeriodo = IIf(fecha_Actual.Month < 10, "0", "") + fecha_Actual.Month.ToString + "/" + fecha_Actual.Year.ToString

            Return CuentaBolsa.DistribucionServicio_CopiaPeriodo(p_vcPeriodoNuevo, p_vcPeriodo, p_vcCuenta, oUsuario.P_inCod)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Valida_TablaPeriodo(ByVal p_vcCriterio As String) As Int32
        Dim CuentaBolsa As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUSuario As ENT_SEG_Usuario = Nothing
        Try
            oUSuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaDistribucion(oUSuario.IdCliente)
            Return CuentaBolsa.DistribucionServicios_ValidaTablaPeriodo(p_vcCriterio)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Obtener_Cuenta(ByVal idCuenta As String, ByVal p_vcCodInt2 As String, ByVal p_PolOrga As String, ByVal IdSubCuenta As Integer) As List(Of String)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim Linea As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
            Linea = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Dim miDatos As New List(Of String)
            Dim inMinutosOrganizacion As Integer = 0

            If p_PolOrga = "1" Then
                inMinutosOrganizacion = Linea.Minutos_Organizacion(p_vcCodInt2).Rows(0).Item(0)
            End If

            'agregado 20150701 wapumayta
            Dim dcCanSubCue As String = "0"
            For Each dr As DataRow In Cuenta.ListarSubCuenta(idCuenta).Rows
                If dr("P_inCodSubCue").ToString() = IdSubCuenta.ToString() Then
                    dcCanSubCue = dr("dcCan").ToString()
                    Exit For
                End If
            Next

            miDatos.Add(dcCanSubCue)
            miDatos.Add(inMinutosOrganizacion.ToString)

            Return miDatos
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Guardar_Linea(ByVal vcCodNum As String, ByVal vcPeriodo As String, ByVal dcCan As Decimal, ByVal p_vcCodCue As String) As Integer
        Dim Linea As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Dim _return As Integer = Linea.GuardarServicios_Distribucion(vcCodNum, vcPeriodo, dcCan, p_vcCodCue, oUsuario.P_inCod, 0, 0)

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Lista_dtLinea(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcVal As String, ByVal CodCue As String,
                                         ByVal vcPer As String, ByVal inNiv As Integer?, ByVal CodGru As Integer?, ByVal CodCC As String,
                                         ByVal CodOrga As Integer?, ByVal p_SinEmpleado As String, ByVal p_SinGrupo As String, ByVal p_flagOmitir As String,
                                         ByVal p_vcCodInt2 As String, ByVal vcGuidNom As String, ByVal p_inFilCanAsig As Integer, ByVal p_LinExcep As String,
                                         ByVal inCodBolPer As Integer, ByVal inCodTipDis As Integer) As List(Of Object)
        Dim CuentaBolsa As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Dim ds As New DataSet
            Dim dt As New DataTable
            'If String.IsNullOrEmpty(vcGuidNom) Then
            '    dt = CuentaBolsa.Dt_DistribucionServicios_Linea(vcVal, CodCue, vcPer, inNiv, CodGru, CodCC, CodOrga, p_SinEmpleado, p_SinGrupo, p_vcCodInt2)
            'Else
            '    ds = CuentaBolsa.DistribucionServicios_Linea_Temp(vcVal, CodCue, vcPer, inNiv, CodGru, CodCC, CodOrga, p_SinEmpleado, p_SinGrupo, p_vcCodInt2, vcGuidNom, p_inFilCanAsig, p_LinExcep)
            'End If
            ds = CuentaBolsa.DistribucionServicios_Linea_Temp(vcVal, CodCue, vcPer, inNiv, CodGru, CodCC, CodOrga, p_SinEmpleado, p_SinGrupo, p_vcCodInt2, vcGuidNom, p_inFilCanAsig, p_LinExcep, inCodBolPer, inCodTipDis)
            dt = ds.Tables(0)
            Dim miLista As New List(Of Object)

            Dim dcCanTotal As Integer = 0
            Dim dcCanAsiTotal As Integer = 0
            Dim dcCanRealTotal As Integer = 0
            Dim count As Integer = 0
            Dim inNumLinTotal_OmitirSinEmp As Integer = 0

            'OMITIR
            If p_flagOmitir <> "false" Then
                For Each linea As DataRow In dt.Rows
                    Dim vcNomEmpl As String = linea("vcNomEmp")
                    If vcNomEmpl.Substring(0, 3) = "***" Then
                        count = count + 1
                    End If
                Next

                If count > 0 Then
                    For i As Integer = 1 To count
                        dt.Rows.RemoveAt(0)
                    Next
                End If
            End If

            'For Each linea As DataRow In dt.Rows
            '    Dim dcCan As Integer = linea("dcCan1")
            '    Dim dcCanAsi As Integer = linea("dcCanAsi")
            '    Dim dcCanReal As Integer = linea("dcCanReal1")
            '
            '    dcCanTotal = dcCanTotal + dcCan
            '    dcCanAsiTotal = dcCanAsiTotal + dcCanAsi
            '    dcCanRealTotal = dcCanRealTotal + dcCanReal
            'Next

            If (ds.Tables.Count > 1) Then
                dcCanTotal = UtilitarioWeb.ComprobarDecimalNULL(ds.Tables(1).Rows(0)("Distribuido"), 0)
                dcCanAsiTotal = UtilitarioWeb.ComprobarDecimalNULL(ds.Tables(1).Rows(0)("DistribucionVigente"), 0)
                dcCanRealTotal = UtilitarioWeb.ComprobarDecimalNULL(ds.Tables(1).Rows(0)("ConsumoReal"), 0)
                count = ComprobarIntNULL(ds.Tables(1).Rows(0)("TotalLineas"), 0)
                inNumLinTotal_OmitirSinEmp = ComprobarIntNULL(ds.Tables(1).Rows(0)("TotalLinea_OmitirSinEmp"), 0)
            End If

            Dim miDatos As New List(Of String)

            miDatos.Add(dcCanTotal.ToString)
            miDatos.Add(dcCanAsiTotal.ToString)
            miDatos.Add(dcCanRealTotal.ToString)
            miDatos.Add(dt.Rows.Count.ToString)
            miDatos.Add(inNumLinTotal_OmitirSinEmp.ToString)

            miLista.Add(JQGrid.DatosJSON(dt, inPagTam, inPagAct))
            miLista.Add(miDatos)

            Return miLista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Listar_TablaPeriodo(ByVal p_vcCriterio As String) As List(Of ENT_MOV_Linea)
        Dim BolsaDistribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            BolsaDistribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Return BolsaDistribucion.ListarDistribucionServicios_TablaPeriodo(p_vcCriterio)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(BolsaDistribucion) Then BolsaDistribucion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CrearTablaTemporalEdicion(ByVal p_vcCodCue As String, ByVal p_IdPeriodo As String, ByVal p_inCodBolPer As Integer, ByVal vcGuidNom As String) As String
        Dim BolsaDistribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim result As String = String.Empty
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            BolsaDistribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            Dim resultCreacion As Integer
            Dim vcNomGuid As String = Guid.NewGuid().ToString().Replace("-", "").ToUpper()
            If vcGuidNom <> "" Then
                BolsaDistribucion.EliminarTablaTemporalDistribucion("", "", vcGuidNom)
            End If
            resultCreacion = BolsaDistribucion.CrearTablaTemporalDistribucion(p_vcCodCue, p_IdPeriodo, vcNomGuid, p_inCodBolPer)
            result = (IIf(resultCreacion = 1, vcNomGuid, String.Empty))

            'Registra auditoria...
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = oUsuario
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.ListarDistribucionBolsa
            oAuditoria.Tabla = Constantes.TableNames.BolsaPeriodo
            oAuditoria.Especial("Ingreso al Detalle de Distribución")

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(BolsaDistribucion) Then BolsaDistribucion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EliminarTablaTemporal(ByVal p_vcCodCue As String, ByVal p_IdPeriodo As String, ByVal vcNomGuid As String) As Integer
        Dim BolsaDistribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim result As Integer = 0
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            BolsaDistribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            result = BolsaDistribucion.EliminarTablaTemporalDistribucion(p_vcCodCue, p_IdPeriodo, vcNomGuid)
            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(BolsaDistribucion) Then BolsaDistribucion.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Guardar_Linea_Temp(ByVal vcCodNum As String, ByVal vcPeriodo As String, ByVal dcCan As Decimal, ByVal p_vcCodCue As String, ByVal vcGuidNom As String) As Integer
        Dim Linea As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            Dim result As Integer = 0

            'result = Linea.GuardarServicios_Distribucion(vcCodNum, vcPeriodo, dcCan, p_vcCodCue, oUsuario.P_inCod, 0, 0)
            result = Linea.GuardarDistribucion_Linea_Temp(vcCodNum, vcPeriodo, dcCan, p_vcCodCue, oUsuario.P_inCod, 0, 0, vcGuidNom)

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarDistribucionDetalle(ByVal vcCodCue As String, ByVal vcPeriodo As String, ByVal inTipDis As Integer,
                                                         ByVal vcGuidNom As String, ByVal inCodBolPer As Integer, ByVal inCodSubCue As Integer) As Integer
        Dim Linea As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Linea = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            Dim result As Integer = 0

            'AUDITORIA
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = oUsuario
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.ActualizarDistribucionBolsa
            oAuditoria.Tabla = Constantes.TableNames.BolsaPeriodo
            'AUDITORIA:Actualizar Antes
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {inCodBolPer})

            result = Linea.ActualizarDistribucionDetalle(vcCodCue, vcPeriodo, vcGuidNom, inTipDis, oUsuario.P_inCod, inCodBolPer, inCodSubCue)

            oAuditoria.DespuesActualizar(New String() {inCodBolPer}, strAntes)

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Linea) Then Linea.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValiddDatosTemporales(ByVal vcCodCue As String, ByVal vcPeriodo As String, ByVal vcGuidNom As String) As List(Of String)
        Dim Distribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Distribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            Dim result As New List(Of String)
            Dim dt As New DataTable
            dt = Distribucion.ValidaDatosTeporal(vcCodCue, vcPeriodo, vcGuidNom)
            result.Add(dt.Rows(0)("ExistTabTemp"))
            result.Add(dt.Rows(0)("LineasDistCero"))
            result.Add(dt.Rows(0)("LineasEstBaja"))
            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Distribucion) Then Distribucion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function QuitarLinea_DistTemp(ByVal vcGuidNom As String, ByVal vcCodNum As String) As Integer
        Dim Distribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Distribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            Dim result As Integer = 0
            result = Distribucion.QuitarLineaBaja_DistTemp(vcGuidNom, vcCodNum)

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Distribucion) Then Distribucion.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Lista_dtAgrup(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcVal As String,
                                        ByVal CodCue As String, ByVal vcPer As String, ByVal vcBus As String,
                                        ByVal p_flagOmitir As String, ByVal p_vcCodInt2 As String,
                                        ByVal vcGuidNom As String, ByVal inTipDis As Integer, ByVal inCodBolPer As Integer) As List(Of Object)
        Dim BolsaDistribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            BolsaDistribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Dim dt As New DataTable
            Dim ds As New DataSet
            If String.IsNullOrEmpty(vcGuidNom) Then
                ds = BolsaDistribucion.dt_DistribucionServicio_Agrup(CodCue, vcPer, vcVal, vcBus, p_vcCodInt2, vcGuidNom, inTipDis, inCodBolPer)
            Else
                ds = BolsaDistribucion.dt_DistribucionServicio_Agrup_Temp(CodCue, vcPer, vcVal, vcBus, p_vcCodInt2, vcGuidNom, inTipDis)
            End If
            dt = ds.Tables(0)
            'VARIABLES
            Dim miLista As New List(Of Object)

            Dim dcCanTotal As Integer = 0
            Dim dcCanAsiTotal As Integer = 0
            Dim dcCanRealTotal As Integer = 0
            Dim inNumLinTotal As Integer = 0
            Dim index As Integer = 0
            Dim flag As Boolean = False
            Dim count As Integer = 0
            Dim inNumLinTotal_OmitirSinEmp As Integer = 0

            'RETIRA GRUPO SIN EMPLEADO ASOCIADO
            For Each linea As DataRow In dt.Rows
                Dim inNumLin As Integer = linea("inNumLin")
                If inNumLin = 0 Then
                    count = count + 1
                End If
            Next

            If count > 0 Then
                For i As Integer = 1 To count
                    dt.Rows.RemoveAt(0)
                Next
            End If

            'OMITIR
            count = 0
            If p_flagOmitir <> "false" Then
                For Each linea As DataRow In dt.Rows
                    Dim vcNomEmpl As String = linea("vcNomGrup")
                    If vcNomEmpl.Substring(0, 3) = "***" Then
                        count = count + 1
                    End If
                Next

                If count > 0 Then
                    For i As Integer = 1 To count
                        dt.Rows.RemoveAt(0)
                    Next
                End If
            End If

            'For Each linea As DataRow In dt.Rows
            '    Dim dcCan As Integer = linea("dcCan")
            '    Dim dcCanAsi As Integer = linea("dcCanAsi")
            '    Dim dcCanReal As Integer = linea("dcCanReal")
            '    Dim inNumLin As Integer = linea("inNumLin")
            '
            '    dcCanTotal = dcCanTotal + dcCan
            '    dcCanAsiTotal = dcCanAsiTotal + dcCanAsi
            '    dcCanRealTotal = dcCanRealTotal + dcCanReal
            '    inNumLinTotal = inNumLinTotal + inNumLin
            'Next

            If (ds.Tables.Count > 1) Then
                dcCanTotal = ComprobarDecimalNULL(ds.Tables(1).Rows(0)("Distribuido"), 0)
                dcCanAsiTotal = ComprobarDecimalNULL(ds.Tables(1).Rows(0)("DistribucionVigente"), 0)
                dcCanRealTotal = ComprobarDecimalNULL(ds.Tables(1).Rows(0)("ConsumoReal"), 0)
                inNumLinTotal = ComprobarIntNULL(ds.Tables(1).Rows(0)("TotalLineas"), 0)
                inNumLinTotal_OmitirSinEmp = ComprobarIntNULL(ds.Tables(1).Rows(0)("TotalLinea_OmitirSinEmp"), 0)
            End If

            'TOTALES
            Dim miDatos As New List(Of String)

            miDatos.Add(dcCanTotal.ToString)
            miDatos.Add(dcCanAsiTotal.ToString)
            miDatos.Add(dcCanRealTotal.ToString)
            miDatos.Add(inNumLinTotal.ToString)
            miDatos.Add(inNumLinTotal_OmitirSinEmp.ToString)

            miLista.Add(JQGrid.DatosJSON(dt, inPagTam, inPagAct))
            miLista.Add(miDatos)

            Return miLista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(BolsaDistribucion) Then BolsaDistribucion.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Guardar_TipoDistribucion_Tmp(ByVal p_vcPeriodo As String, ByVal p_vcCuenta As String,
                                                        ByVal p_dcCan As Decimal, ByVal vcCodDis As String, ByVal inTipDis As Integer,
                                                        ByVal vcGuidNom As String, ByVal bUpdLinExcep As Boolean) As Integer
        Dim BolsaDistribucion As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            BolsaDistribucion = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)

            Dim _return As Integer = BolsaDistribucion.GuardarDistribucion_TipDist_Temp(p_vcCuenta, p_vcPeriodo, vcCodDis, inTipDis, p_dcCan, oUsuario.P_inCod, vcGuidNom, bUpdLinExcep)

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(BolsaDistribucion) Then BolsaDistribucion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Asignar_Valores_Temp(ByVal p_vcPeriodo As String, ByVal p_vcCodCue As String, ByVal p_vcModo As String,
                                           ByVal p_inCantidad As String, ByVal p_vcSigno As String, ByVal p_inPorcentual As String,
                                            ByVal p_inCantAumento As String, ByVal p_vcCodInt2 As String, ByVal p_SinEmpleado As String,
                                            ByVal P_Fil_Importacion As String, ByVal vcGuidNom As String) As Int32
        Dim CuentaBolsa As BL_MOV_CuentaBolsaDistribucion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaDistribucion(oUsuario.IdCliente)
            Dim result As Integer = CuentaBolsa.DistribucionServicios_AsignarValores_Temp(p_vcPeriodo, p_vcCodCue, p_vcModo, p_inCantidad, p_vcSigno,
                                                                 p_inPorcentual, p_inCantAumento, oUsuario.P_inCod,
                                                                 p_vcCodInt2, p_SinEmpleado, P_Fil_Importacion, vcGuidNom)
            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EnviarAlOperador(ByVal inColBolPer As Integer, ByVal vcCodCue As String, ByVal vcPeriodo As String, ByVal CodInt2 As String) As String
        Dim CuentaBolsa As BL_MOV_CuentaBolsaPeriodo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaPeriodo(oUsuario.IdCliente)
            Dim dtData As New DataTable()
            Dim result As String = String.Empty

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Request.MapPath("~/Common/Images/Temporal/"), "/")
            
            'AUDITORIA
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = oUsuario
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.ActualizarDistribucionBolsa
            oAuditoria.Tabla = Constantes.TableNames.BolsaPeriodo
            'AUDITORIA:Actualizar Antes
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {inColBolPer})

            dtData = CuentaBolsa.DistribucionCuentaBolsa_EnviarOperador(inColBolPer, vcCodCue, vcPeriodo, CodInt2, oUsuario.P_inCod)

            If (dtData.Rows(0)(0) = "0") Then
                result = "-1" 'distribucion con estado cerrado o procesado
            Else
                oAuditoria.DespuesActualizar(New String() {inColBolPer}, strAntes)
                Dim oxlWorkbook As New XLWorkbook()
                Dim xlWorksheet = oxlWorkbook.Worksheets.Add("Distribucion")
                'CABECERA
                xlWorksheet.Cell("A1").Value = "Cuenta"
                xlWorksheet.Cell("B1").Value = "Linea"
                xlWorksheet.Cell("C1").Value = "Asignado Anterior"
                xlWorksheet.Cell("D1").Value = "Por Asignar"
                xlWorksheet.Range("A1:D1").Style.Font.SetBold()
                xlWorksheet.Range("A1:D1").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                xlWorksheet.Range("A1:D1").Style.Font.SetFontColor(XLColor.FromColor(Drawing.Color.White))
                xlWorksheet.Range("A1:D1").Style.Fill.SetBackgroundColor(XLColor.FromColor(Drawing.Color.Black))

                'DATOS
                Dim countFila = 2
                For Each dr As DataRow In dtData.Rows
                    'FORMATO SI NUEVA CANTIDAD ASIGNADA DIFIERE DE LA ANTERIOR
                    If (Convert.ToInt32(dr("AsignadoActual")) <> Convert.ToInt32(dr("PorAsignar"))) Then
                        xlWorksheet.Range("A" + countFila.ToString() + ":D" + countFila.ToString()).Style.Fill.BackgroundColor = XLColor.FromTheme(XLThemeColor.Accent1, 0.5)
                    End If

                    xlWorksheet.Cell("A" + countFila.ToString()).Value = dr("F_vcCodCue").ToString()
                    xlWorksheet.Cell("B" + countFila.ToString()).Value = dr("P_F_vcCodLin").ToString()
                    xlWorksheet.Cell("C" + countFila.ToString()).Value = dr("AsignadoActual").ToString()
                    xlWorksheet.Cell("D" + countFila.ToString()).Value = dr("PorAsignar").ToString()
                    countFila = countFila + 1
                Next
                xlWorksheet.Columns().AdjustToContents()
                Dim strDirectorioTemporal As String = HttpContext.Current.Request.MapPath("~/Common/Images/Temporal" + CarpetaDominio)
                Dim strNombreArchivo As String = "Distribucion_" & vcCodCue & "_" & vcPeriodo.Replace("/", "") & ".xlsx"
                oxlWorkbook.SaveAs(strDirectorioTemporal & "\" & strNombreArchivo)
                oxlWorkbook.Dispose()
                result = strNombreArchivo
            End If

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CerrarDistribucion(ByVal inCodBolPer As Integer, ByVal vcCueCue As String, ByVal vcPeriodo As String) As Integer
        Dim CuentaBolsa As BL_MOV_CuentaBolsaPeriodo = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CuentaBolsa = New BL_MOV_CuentaBolsaPeriodo(oUsuario.IdCliente)
            Dim result As Integer = 0
            'AUDITORIA
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = oUsuario
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionBolsa.ActualizarDistribucionBolsa
            oAuditoria.Tabla = Constantes.TableNames.BolsaPeriodo
            'AUDITORIA:Actualizar Antes
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {inCodBolPer})

            result = CuentaBolsa.DistribucionCuentaBolsa_CerrarPeriodo(inCodBolPer, vcCueCue, vcPeriodo, oUsuario.P_inCod)

            oAuditoria.DespuesActualizar(New String() {inCodBolPer}, strAntes)

            Return result
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CuentaBolsa) Then CuentaBolsa.Dispose()
        End Try
    End Function
End Class

