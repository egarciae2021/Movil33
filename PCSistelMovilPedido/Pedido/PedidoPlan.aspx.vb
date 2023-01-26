Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun
Imports VisualSoft.PCSistelMovil.General.BE
Imports WebSiteCliente.VisualSoft.Common.Logging
Imports System.Web.Script.Serialization

Public Class PedidoPlan
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim objBlCampana As BL_MOV_CAM_Campana
        Dim objBlEmpleado As BL_GEN_Empleado
        Dim objBlTipoServicio As BL_MOV_TipoServicio
        Dim objBlDashboardPedido As BL_MOV_CAM_DashboardPedido
        Dim objBLTipoModeloDispositivo As BL_MOV_TipoModeloDispositivo
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral = CType(Session("Configuracion"), ENT_CFG_ConfiguracionGeneral)

                    If oUsuario Is Nothing Then
                        Logger.WriteLog(Me, LogLevelL4N.DEBUG, "Finaliza Load por: oUsuario Is Nothing")
                        Dim scriptFinSession As String = "window.top.location.reload();"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", scriptFinSession, True)
                        Exit Sub
                    End If
                    hfUsuario.Value = oUsuario.vcUsu
                    Dim strMesesRenovacion As String = String.Empty
                    Dim strTest As String = ConfigurationManager.AppSettings("ModoTest")
                    Dim IdCampana As Integer = Request.QueryString("IdCampana")
                    Dim elegirMesesPlan As String = "false"
                    Dim usarPlanesDep As String = "false"
                    If strTest IsNot Nothing AndAlso strTest = "1" Then
                        If oUsuario Is Nothing Then Exit Sub
                        objBlCampana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
                        'Dim CampanaConf As ENT_MOV_CAM_CampanaConf = objBlCampana.obtenerCampanaActivaConf(oUsuario.IdCliente)
                        Dim CampanaConf As ENT_MOV_CAM_CampanaConf = objBlCampana.obtenerCampanaActivaConfPorId(oUsuario.IdCliente, IdCampana)
                        strMesesRenovacion = CampanaConf.MesesRenovacion
                        If CampanaConf.IdCampana <> -1 Then
                            'oUsuario.IdCampana = CampanaConf.IdCampana
                            Session("Usuario") = oUsuario
                        End If
                        elegirMesesPlan = IIf(CampanaConf.ElegirMesesPlan, "true", "false")
                        usarPlanesDep = IIf(CampanaConf.UsarPlanesDependientes, "true", "false")
                    End If

                    hdfFecServidor.Value = Utilitario.ObtieneFechaHoraANSIServidor(False)

                    'Obtiene Datos Empleado....
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    If oUsuario.Empleado.P_vcCod IsNot Nothing AndAlso oUsuario.Empleado.P_vcCod <> "" Then
                        hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                        hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                        objBlEmpleado = New BL_GEN_Empleado(oUsuario.IdCliente)
                        Dim oEmpleado As ENT_GEN_Empleado = objBlEmpleado.Mostrar(oUsuario.Empleado.P_vcCod)
                        If oEmpleado IsNot Nothing AndAlso oEmpleado.P_vcCod <> "" Then
                            lblNombreEmpleado.Text = ReemplazarTilder(oEmpleado.vcNom) & " (" & oUsuario.Empleado.P_vcCod & " - " & oUsuario.Mail & ")"
                            lblArea.Text = ReemplazarTilder(oEmpleado.Area.vcNomOrg)
                            lblCentroCosto.Text = ReemplazarTilder(oEmpleado.CentroCosto.vcNomCenCos)
                        End If
                    Else
                        Response.Redirect("~\Pedido\Dashboard_pedido.aspx")
                        Exit Sub
                    End If

                    Dim p As String = Request.QueryString("IdPedido")
                    If Not p Is Nothing Then
                        hdfIdPedidoEditar.Value = p
                    Else
                        hdfIdPedidoEditar.Value = "0"
                    End If

                    objBlTipoServicio = New BL_MOV_TipoServicio(oUsuario.IdCliente)
                    objBLTipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(oUsuario.IdCliente)
                    Dim TipoServicio As List(Of ENT_MOV_TipoModeloDispositivo) = objBLTipoModeloDispositivo.ListarModeloDispositivo()

                    objBlDashboardPedido = New BL_MOV_CAM_DashboardPedido(oUsuario.IdCliente)
                    Dim CreditoUsuario As ENT_MOV_CAM_DashboardPedido = objBlDashboardPedido.mostrarProductoCreditoAsignado(oUsuario.Empleado.P_vcCod, IdCampana)
                    Dim js As New JavaScriptSerializer()
                    Dim script = "var CreditoUsuario = " + js.Serialize(CreditoUsuario) + "; "
                    script = script + "var TipoModeloDispositivo = " + js.Serialize(TipoServicio) + "; "
                    script = script + "var ElegirMesesPlan = " + elegirMesesPlan + "; "
                    script = script + "var UsarPlanDep = " + usarPlanesDep + "; "
                    script = script + "var arMesesRenovacion = [" + strMesesRenovacion + "]; "


                    'Muestra el texboxt de numero contacto
                    If ConfigurationManager.AppSettings("PortabilidadClaro") IsNot Nothing Then
                        If ConfigurationManager.AppSettings("PortabilidadClaro").ToString() = "1" Then
                            If Not hdfMuestraNumeroContacto Is Nothing Then
                                hdfMuestraNumeroContacto.Value = "1"
                            End If
                        End If
                    End If


                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                End If

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If objBlCampana IsNot Nothing Then
                objBlCampana.Dispose()
            End If
            If objBlEmpleado IsNot Nothing Then
                objBlEmpleado.Dispose()
            End If
            If objBlTipoServicio IsNot Nothing Then
                objBlTipoServicio.Dispose()
            End If
            If objBlDashboardPedido IsNot Nothing Then
                objBlDashboardPedido.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerPlanesRenovacion(ByVal IdEmpleado As String, ByVal IdCampana As Integer, ByVal Numero As String, _
                                                   ByVal MontoMin As Decimal, ByVal MontoMax As Decimal, ByVal NombrePlan As String) As String
        Dim campana As BL_MOV_CAM_Campana = Nothing
        Try
            campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsPlanes As DataSet = campana.ObtenerPlanesRenovacionPorLinea(IdEmpleado, IdCampana, Numero, NombrePlan, MontoMin, MontoMax)
            Dim dtPlanes As DataTable = dsPlanes.Tables(0)

            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim listafinal As New List(Of String)
            For i = 0 To dtPlanes.Rows.Count - 1
                Dim lista As New List(Of String)
                For k = 0 To dtPlanes.Columns.Count - 1
                    lista.Add(String.Format(formato, dtPlanes.Columns(k).ToString.Trim, dtPlanes.Rows(i)(k).ToString.Trim))
                Next
                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Return json
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If campana IsNot Nothing Then
                campana.Dispose()
            End If
        End Try
    End Function

    Private Function ReemplazarTilder(ByVal strValor As String) As String
        strValor = strValor.Replace("Á", "A")
        strValor = strValor.Replace("É", "E")
        strValor = strValor.Replace("Í", "I")
        strValor = strValor.Replace("Ó", "O")
        strValor = strValor.Replace("Ú", "U")
        strValor = strValor.Replace("á", "a")
        strValor = strValor.Replace("é", "e")
        strValor = strValor.Replace("í", "i")
        strValor = strValor.Replace("ó", "o")
        strValor = strValor.Replace("ú", "u")

        Return strValor
    End Function

    <WebMethod()>
    Public Shared Function registrarPedidoRenovPlan(ByVal prIdEmpleado As String, ByVal pIdCampana As Integer, _
                                           ByVal pXmlPedido As String, ByVal prMaxIdPedido As Integer, ByVal prNumeroContacto As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("registrarPedido. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", pXmlPedido: " & pXmlPedido)

            Dim pedidosRegistrados As DataSet = pedido.registrarPedidoRenovacionPlan(prIdEmpleado, pIdCampana, pXmlPedido, prMaxIdPedido)

            If pedidosRegistrados.Tables(0).Columns.Count = 1 Then
                Return pedidosRegistrados.Tables(0).Rows(0)(0).ToString
            End If

            Dim tblDetalleItems As String = ""
            Dim cont As Integer = 0
            tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
            tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Situación</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Mensual</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td></tr>"
            Dim tieneDetalle As Boolean = False

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = Utilitario.DevuelveFormatoNumero(oCultura)

            For ini As Integer = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                If pedidosRegistrados.Tables(0).Rows(ini)("EstadoPedido").ToString().ToLower.Equals("enviado") Then
                    tieneDetalle = True
                    cont += 1
                    tblDetalleItems += "<tr>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>" '& pedidosCancelados.Tables(0).Rows(ini)("NumeroItem") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Situacion") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Equipo") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Plan") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Numero") & "</td>"
                    tblDetalleItems += "</tr>"
                End If
            Next
            If tieneDetalle Then
                tblDetalleItems += "</table></center>"

                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                'Insertar Registro de Cola de Correo
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                Dim oEmpleado As New ENT_GEN_EmpleadoG
                oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)

                'mostrar datos por tipo de solicitud
                'Modelo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoServicio As ENT_MOV_SolicitudTipo = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.RenovarPlan, oEmpleado.inCodOpe)
                'datos del cuerpo del correo
                Dim textoplantilla As String = Utilitario.TraeCuerpoCorreo(HttpContext.Current.Server.MapPath(TipoServicio.vcRutaPlan))
                Dim destinatario As String = ""
                Dim codigo As String = prIdEmpleado
                Dim nombre As String = oEmpleado.vcNomEmp
                Dim NumeroPedido As String = pedidosRegistrados.Tables(0).Rows(0)("codigopedido").ToString()
                Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom
                Dim Area As String = oEmpleado.vcNomOrg
                Dim CentroCosto As String = oEmpleado.vcNomCco
                Dim FechaHora As String = Date.Now.ToString()
                Dim cuerpocorreo As String = String.Format(textoplantilla, codigo, nombre, tblDetalleItems, NumeroPedido, FechaHora)
                'llenado de datos de cola de correos
                Dim oCola As New ENT_MOV_Cola
                oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                oCola.vcAsunto = TipoServicio.vcCorTitulo
                oCola.vcDescripcion = cuerpocorreo
                If oEmpleado.vcCorPer IsNot Nothing AndAlso oEmpleado.vcCorPer <> "" Then
                    oCola.vcMailTo = oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
                    oCola.vcMailFrom = ""
                    'insertar cola
                    Auditoria.InsertarAuditoria("registrarPedido - Inserta Cola correo", oCola)
                    Cola.Insertar(oCola)
                Else
                    Auditoria.InsertarAuditoria("registrarPedido - No Inserta Cola correo, No se obtuvo el correo destino ", oCola)
                End If
            End If
            ''------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim formatoNum As String = " ""{0}"" :{1} "
            Dim listafinal As New List(Of String)
            For i = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                Dim lista As New List(Of String)
                For k = 0 To pedidosRegistrados.Tables(0).Columns.Count - 1

                    If pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioEquipo") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioPlan") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("Total") Then
                        lista.Add(String.Format(formatoNum, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                    Else
                        lista.Add(String.Format(formato, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                    End If

                Next
                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next

            If prNumeroContacto <> "-1" Then
                Dim PedidoContacto As Integer = pedido.RegistrarContactoPedido(pedidosRegistrados.Tables(0).Rows(0)("IdPedido").ToString(), prIdEmpleado, prNumeroContacto)
            End If


            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Return json

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
            If Notificacion IsNot Nothing Then
                Notificacion.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function editarPedidoRenovPlan(ByVal prIdEmpleado As String, ByVal pIdCampana As Integer, ByVal pIdPedido As Integer, _
                                           ByVal pXmlPedido As String, ByVal prMaxIdPedido As Integer) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("registrarPedido. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", pXmlPedido: " & pXmlPedido)

            Dim pedidosRegistrados As DataSet = pedido.editarPedidoRenovacionPlan(prIdEmpleado, pIdCampana, pIdPedido, pXmlPedido, prMaxIdPedido)

            If pedidosRegistrados.Tables(0).Columns.Count = 1 Then
                Return pedidosRegistrados.Tables(0).Rows(0)(0).ToString
            End If

            Dim tblDetalleItems As String = ""
            Dim cont As Integer = 0
            tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
            tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Situación</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Mensual</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td></tr>"
            Dim tieneDetalle As Boolean = False

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = Utilitario.DevuelveFormatoNumero(oCultura)

            For ini As Integer = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                If pedidosRegistrados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("renovación de plan") Then
                    tieneDetalle = True
                    cont += 1
                    tblDetalleItems += "<tr>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>" '& pedidosCancelados.Tables(0).Rows(ini)("NumeroItem") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Situacion") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Equipo") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Plan") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Numero") & "</td>"
                    tblDetalleItems += "</tr>"
                End If
            Next
            If tieneDetalle Then
                tblDetalleItems += "</table></center>"

                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                'Insertar Registro de Cola de Correo
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                Dim oEmpleado As New ENT_GEN_EmpleadoG
                oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)

                'mostrar datos por tipo de solicitud
                'Modelo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoServicio As ENT_MOV_SolicitudTipo = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.Editar, oEmpleado.inCodOpe)
                'datos del cuerpo del correo
                Dim textoplantilla As String = Utilitario.TraeCuerpoCorreo(HttpContext.Current.Server.MapPath(TipoServicio.vcRutaPlan))
                Dim destinatario As String = ""
                Dim codigo As String = prIdEmpleado
                Dim nombre As String = oEmpleado.vcNomEmp
                Dim NumeroPedido As String = pedidosRegistrados.Tables(0).Rows(0)("codigopedido").ToString()
                Dim Usuario As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom
                Dim Area As String = oEmpleado.vcNomOrg
                Dim CentroCosto As String = oEmpleado.vcNomCco
                Dim FechaHora As String = Date.Now.ToString()
                Dim cuerpocorreo As String = String.Format(textoplantilla, codigo, nombre, tblDetalleItems, NumeroPedido, FechaHora)
                'llenado de datos de cola de correos
                Dim oCola As New ENT_MOV_Cola
                oCola.vcIdUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
                oCola.vcAsunto = TipoServicio.vcCorTitulo
                oCola.vcDescripcion = cuerpocorreo
                If oEmpleado.vcCorPer IsNot Nothing AndAlso oEmpleado.vcCorPer <> "" Then
                    oCola.vcMailTo = oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
                    oCola.vcMailFrom = ""
                    'insertar cola
                    Auditoria.InsertarAuditoria("registrarPedido - Inserta Cola correo", oCola)
                    Cola.Insertar(oCola)
                Else
                    Auditoria.InsertarAuditoria("registrarPedido - No Inserta Cola correo, No se obtuvo el correo destino ", oCola)
                End If
            End If
            ''------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim formatoNum As String = " ""{0}"" :{1} "
            Dim listafinal As New List(Of String)
            For i = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                Dim lista As New List(Of String)
                For k = 0 To pedidosRegistrados.Tables(0).Columns.Count - 1

                    If pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioEquipo") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioPlan") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("Total") Then
                        lista.Add(String.Format(formatoNum, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                    Else
                        lista.Add(String.Format(formato, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                    End If

                Next
                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Return json

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
            If Notificacion IsNot Nothing Then
                Notificacion.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Function
End Class