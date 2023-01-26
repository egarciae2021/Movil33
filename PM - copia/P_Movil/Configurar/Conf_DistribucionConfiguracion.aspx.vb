Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Auditoria
Imports System.Web.Services


Partial Class Conf_DistribucionConfiguracion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Distribucion_Configuracion As BL_MOV_Distribucion_Configuracion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                    'Perfiles de usuario
                    hdfEsAdmin.Value = "0"
                    hdfEsAdBol.Value = "0"

                    If Request.QueryString("bPrincipal") IsNot Nothing Then
                        Me.hdfEsPrincipal.Value = Request.QueryString("bPrincipal").ToString()  '1(Principal) o 2(otros)
                    Else
                        Me.hdfEsPrincipal.Value = "0"
                    End If

                    For Each oPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                        If oPerfil.P_inCod = 1 Then 'es administrador
                            hdfEsAdmin.Value = "1"
                        End If
                        If oPerfil.P_inCod = 41 Then 'es administrador de  bolsa
                            hdfEsAdBol.Value = "1"
                        End If
                    Next

                    'operador
                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(-1, "<Seleccionar>")
                    UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")

                    Distribucion_Configuracion = New BL_MOV_Distribucion_Configuracion(oUsuario.IdCliente)
                    'Nombres de fechas
                    Dim lstTipoFecha As New List(Of ENT_MOV_Distribucion_TipoFecha)
                    lstTipoFecha = Distribucion_Configuracion.ListarTipoFecha_Distribucion(0)
                    If lstTipoFecha.Count() > 0 Then
                        lblFecLimEnv.Text = lstTipoFecha(0).vcNom
                        lblFecProc.Text = lstTipoFecha(1).vcNom

                        lblChkEnvOper.Text = lstTipoFecha(0).vcNom.ToLower()
                        lblChkCerDis.Text = lstTipoFecha(1).vcNom.ToLower()

                        lblObsFec_EnvOper.InnerText = lstTipoFecha(0).vcNom.ToLower()
                        lblObsFec_Cierre.InnerText = lstTipoFecha(1).vcNom.ToLower()
                    End If
                    'Datos Configuracion
                    Dim oDatosConfiguracion As New ENT_MOV_Distribucion_Configuracion()
                    oDatosConfiguracion = Distribucion_Configuracion.ListarDatosConfiguracion_Distribucion()

                    'txtHoraEjecDis.Text = oDatosConfiguracion.vcHoraEjecucion
                    chkActDistPorOrgUsu.Checked = oDatosConfiguracion.btDistPorOrgUsu

                    chkEnvOper.Checked = oDatosConfiguracion.btEnvCor_EnvOper
                    dvCorreo_EnvOpe.Style("display") = IIf(oDatosConfiguracion.btEnvCor_EnvOper, "", "none")
                    ddlDiasEnvOper.SelectedValue = oDatosConfiguracion.inNumDias_EnvOper
                    txtDestinatarios_EnvOper.Text = oDatosConfiguracion.vcDestinatarios_EnvOper
                    txtAsunto_EnvOper.Text = oDatosConfiguracion.vcAsunto_EnvOper
                    txtMensaje_EnvOper.Text = oDatosConfiguracion.vcMensaje_EnvOper

                    chkCerDist.Checked = oDatosConfiguracion.btEnvCor_Cierre
                    dvCorreo_CerDis.Style("display") = IIf(oDatosConfiguracion.btEnvCor_Cierre, "", "none")
                    ddlDiasCerDis.SelectedValue = oDatosConfiguracion.inNumDias_Cierre
                    txtDestinatarios_CerDis.Text = oDatosConfiguracion.vcDestinatarios_Cierre
                    txtAsunto_CerDis.Text = oDatosConfiguracion.vcAsunto_Cierre
                    txtMensaje_CerDis.Text = oDatosConfiguracion.vcMensaje_Cierre

                    'Fechas
                    Dim vcScript As String = "arFechasCuenta = [];"
                    If oDatosConfiguracion.lstFechas.Count > 0 Then
                        For Each oFecha As ENT_MOV_Distribucion_FechaCuenta In oDatosConfiguracion.lstFechas
                            vcScript += "arFechasCuenta['" + oFecha.TipoFecha.inCod.ToString() + "|" + oFecha.vcCodCue.ToString() + "'] = [];"
                            vcScript += "arFechasCuenta['" + oFecha.TipoFecha.inCod.ToString() + "|" + oFecha.vcCodCue.ToString() + "'].inFecha = '" + oFecha.inFecha.ToString() + "';"
                            vcScript += "arFechasCuenta['" + oFecha.TipoFecha.inCod.ToString() + "|" + oFecha.vcCodCue.ToString() + "'].vcHoraEjecucion = '" + oFecha.vcHoraEjecucion.ToString() + "';"
                        Next
                    End If

                    'Registra auditoria...
                    Dim oAuditoria As New ProcesaAuditoria
                    oAuditoria.Usuario = oUsuario
                    oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                    oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionConfiguracion.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionConfiguracion.DistribucionConfiguracion
                    oAuditoria.Tabla = Constantes.TableNames.BolsaConfiguracion
                    oAuditoria.Especial("Ingreso a Configuración de Distribución")

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", vcScript, True)
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                End If
                End If

                If ddlOperador.Items.Count = 2 Then
                    ddlOperador.Enabled = False
                    ddlOperador.SelectedIndex = 1
                End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Operador) Then Operador.Dispose()
            If Not IsNothing(Distribucion_Configuracion) Then Distribucion_Configuracion.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarDatosConfiguracion_Distribucion() As ENT_MOV_Distribucion_Configuracion
        Dim Distribucion_Configuracion As BL_MOV_Distribucion_Configuracion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Distribucion_Configuracion = New BL_MOV_Distribucion_Configuracion(oUsuario.IdCliente)
        Dim oDatosConfiguracion As New ENT_MOV_Distribucion_Configuracion()
        oDatosConfiguracion = Distribucion_Configuracion.ListarDatosConfiguracion_Distribucion_x_Cuenta("")

        Return oDatosConfiguracion
    End Function


    <WebMethod()>
    Public Shared Function GuardarConfiguracion(ByVal HoraEjecDis As String, ByVal chkEnvOpe As Boolean, ByVal inNumDias_EnvOpe As Integer, _
    ByVal Destinatarios_EnvOpe As String, ByVal Asunto_EnvOpe As String, ByVal Mensaje_EnvOpe As String, ByVal chkCerDis As Boolean, ByVal inNumDias_CerDis As Integer, ByVal Destinatarios_CerDis As String, _
    ByVal Asunto_CerDis As String, ByVal Mensaje_CerDis As String, ByVal chkDisOrgUsu As Boolean, ByVal XML_Fechas As String, ByVal F_vcCodCue As String) As Integer
        Dim DistribucionConfiguracion As BL_MOV_Distribucion_Configuracion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            Dim resultado As Integer = 0
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            DistribucionConfiguracion = New BL_MOV_Distribucion_Configuracion(oUsuario.IdCliente)

            Dim oDatosConriguracion As New ENT_MOV_Distribucion_Configuracion()

            oDatosConriguracion.vcHoraEjecucion = HoraEjecDis
            oDatosConriguracion.btEnvCor_EnvOper = chkEnvOpe
            oDatosConriguracion.inNumDias_EnvOper = inNumDias_EnvOpe
            oDatosConriguracion.vcDestinatarios_EnvOper = Destinatarios_EnvOpe
            oDatosConriguracion.vcAsunto_EnvOper = Asunto_EnvOpe
            oDatosConriguracion.vcMensaje_EnvOper = Mensaje_EnvOpe
            oDatosConriguracion.btEnvCor_Cierre = chkCerDis
            oDatosConriguracion.inNumDias_Cierre = inNumDias_CerDis
            oDatosConriguracion.vcDestinatarios_Cierre = Destinatarios_CerDis
            oDatosConriguracion.vcAsunto_Cierre = Asunto_CerDis
            oDatosConriguracion.vcMensaje_Cierre = Mensaje_CerDis
            oDatosConriguracion.btDistPorOrgUsu = chkDisOrgUsu
            oDatosConriguracion.F_vcCodCue = F_vcCodCue

            'AUDITORIA
            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = oUsuario
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = Constantes.AuditoriaConstantes.ModuloDistribucionConfiguracion.Name
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = Constantes.AuditoriaConstantes.ModuloDistribucionConfiguracion.ActualizarConfiguracionBolsa
            oAuditoria.Tabla = Constantes.TableNames.BolsaConfiguracion
            'AUDITORIA:Actualizar Antes
            Dim strAntes As String = oAuditoria.AntesActualizar(New String() {})

            resultado = DistribucionConfiguracion.ActualizarDatosConfiguracion_Distribucion(oDatosConriguracion, XML_Fechas)

            oAuditoria.DespuesActualizar(New String() {}, strAntes)

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If DistribucionConfiguracion IsNot Nothing Then
                DistribucionConfiguracion.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ExisteDistribucionTipo() As Integer
        Dim DistribucionConfiguracion As BL_MOV_Distribucion_Configuracion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            Dim resultado As Integer = 0
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            DistribucionConfiguracion = New BL_MOV_Distribucion_Configuracion(oUsuario.IdCliente)

            resultado = DistribucionConfiguracion.ExisteDistribucionTipo(oUsuario.F_vcCodInt)

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If DistribucionConfiguracion IsNot Nothing Then
                DistribucionConfiguracion.Dispose()
            End If
        End Try
    End Function

End Class