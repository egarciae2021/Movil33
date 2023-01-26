Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports System.Web.Script.Serialization
Imports WebSiteCliente.VisualSoft.Common.Logging
Imports System.Reflection
Imports VisualSoft.Comun
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Pedido
    Inherits System.Web.UI.Page


    Private Function ValidaAutenticacionTest(ByVal strUsuario As String, ByVal strPassword As String) As Boolean
        Logger.WriteLog(Me, LogLevelL4N.DEBUG, "Ingresa -> ValidaAutenticacionTest Page Pedido - " & strUsuario)
        Dim _return As Boolean = False

        Dim Usuario As BL_SEG_Usuario
        Dim Cultura As BL_GEN_Cultura
        Dim UsuarioHistorico As BL_SEG_UsuarioHistorico
        Try
            Usuario = New BL_SEG_Usuario(0)
            Dim oUsuario As New ENT_SEG_Usuario
            Dim v_oUsuario As ENT_SEG_Usuario
            oUsuario.vcUsu = strUsuario
            oUsuario.vcPas = strPassword
            Dim Autenticacion As Integer = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(HttpContext.Current.Server.MapPath("~/web.config"))
            v_oUsuario = Usuario.Autentifica(oUsuario, IIf(Autenticacion = 2, "AD", ""))

            If v_oUsuario IsNot Nothing AndAlso Not IsNothing(v_oUsuario.vcNom) Then
                HttpContext.Current.Session("Usuario") = v_oUsuario
                Cultura = New BL_GEN_Cultura(v_oUsuario.IdCliente)
                HttpContext.Current.Session("Cultura") = Cultura.MostrarPorRegion(v_oUsuario.inCodReg)

                UsuarioHistorico = New BL_SEG_UsuarioHistorico(v_oUsuario.IdCliente)
                'UsuarioHistorico.Insertar(v_oUsuario.P_inCod, HttpContext.Current.Session.SessionID)
                UsuarioHistorico.Insertar(v_oUsuario.P_inCod, System.Web.Hosting.HostingEnvironment.ApplicationHost.GetSiteName, "", "", "")


                'Grabar Log..
                Logger.WriteLog(Me, LogLevelL4N.DEBUG, "ValidaAutenticacionTest - Credenciales correctas: " & v_oUsuario.vcUsu)

                _return = True

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
        Finally
            If Usuario IsNot Nothing Then
                Usuario.Dispose()
            End If
            If Cultura IsNot Nothing Then
                Cultura.Dispose()
            End If
            If UsuarioHistorico IsNot Nothing Then
                UsuarioHistorico.Dispose()
            End If
        End Try
        Return _return
    End Function

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim objBlCampana As BL_MOV_CAM_Campana
        Dim objBlEmpleado As BL_GEN_Empleado
        Dim ListaNegra As BL_MOV_CAM_CampanaCreditoListaNegra
        Dim CreditoAsignado As BL_MOV_CAM_DashboardPedido
        Dim objBlTipoServicio As BL_MOV_TipoServicio
        Dim objBlDashboardPedido As BL_MOV_CAM_DashboardPedido
        Dim TipoModeloDispositivo As BL_MOV_TipoModeloDispositivo
        Try

            'Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            'Dim viIdTecnico As Integer = -1
            'If IsNothing(oUsuario) Then
            '    Dim script As String = "window.parent.location.reload()"
            '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            'Else

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
                    Dim strTest As String = ConfigurationManager.AppSettings("ModoTest")
                    Dim elegirMesesPlan As String = "false"
                    Dim usarPlanesDep As String = "false"
                    Dim UsaFinanciamientoPrecioVariable As String = "false"
                    Dim qsIdCampana As Integer = Request.QueryString("IdCampana")
                    If strTest IsNot Nothing AndAlso strTest = "1" Then
                        If oUsuario Is Nothing Then Exit Sub
                        objBlCampana = New BL_MOV_CAM_Campana(oUsuario.IdCliente)
                        Dim CampanaConf As ENT_MOV_CAM_CampanaConf = objBlCampana.obtenerCampanaActivaConfPorId(oUsuario.IdCliente, qsIdCampana)
                        If CampanaConf.IdCampana <> -1 Then
                            'oUsuario.IdCampana = CampanaConf.IdCampana
                            Session("Usuario") = oUsuario
                        End If
                        'registrarPedido(oUsuario.Empleado.P_vcCod, oUsuario.IdCampana, 7, "<?xml version=""1.0"" encoding=""iso-8859-1""?><TABLE><PEDIDO><IdProducto>270</IdProducto><vcNom>Samsung E3300</vcNom><Precio>16.00</Precio><IdPlan>34</IdPlan><DscPlan>40.000</DscPlan><Orden>1</Orden><esNuevo>1</esNuevo><Numero>Nueva Linea</Numero><Meses>18</Meses><PrecioPlanAntiguo>0</PrecioPlanAntiguo></PEDIDO><PEDIDO><IdProducto>271</IdProducto><vcNom>Nokia 208</vcNom><Precio>24.00</Precio><IdPlan>34</IdPlan><DscPlan>40.000</DscPlan><Orden>2</Orden><esNuevo>1</esNuevo><Numero>Nueva Linea</Numero><Meses>18</Meses><PrecioPlanAntiguo>0</PrecioPlanAntiguo></PEDIDO></TABLE>")

                        'cargar lugares de entrega (agregado 14-06-2016)
                        If Request.QueryString.Count <> 0 Then
                            If CampanaConf.ElegirLugarEntrega Then
                                dvLugarEntrega.Style("display") = ""
                                If CampanaConf.LugaresEntrega.Count > 0 Then
                                    'Utilitario.Dataddl(ddlLugarEntregaPedido, CampanaConf.LugaresEntrega, "NombreOficina", "IdOficina")
                                    ddlLugarEntregaPedido.Items.Insert(0, New ListItem("Seleccione...", "-1"))
                                    ddlLugarEntregaPedido.Items(0).Attributes.Add("direc", "")
                                    For i = 0 To CampanaConf.LugaresEntrega.Count - 1
                                        ddlLugarEntregaPedido.Items.Insert(i + 1, New ListItem(CampanaConf.LugaresEntrega(i).NombreOficina, CampanaConf.LugaresEntrega(i).IdOficina))
                                        ddlLugarEntregaPedido.Items(i + 1).Attributes.Add("direc", CampanaConf.LugaresEntrega(i).DireccionOficina)
                                    Next
                                    'seleccionar lugar de entrega
                                    If Not IsNothing(Request.QueryString("LugarEntrega")) Then
                                        ddlLugarEntregaPedido.SelectedValue = Convert.ToInt32(Request.QueryString("LugarEntrega"))
                                        lblDireccionCompleta.Text = ddlLugarEntregaPedido.SelectedItem.Attributes("direc")
                                    End If
                                Else
                                    ddlLugarEntregaPedido.Items.Insert(0, New ListItem("Sin Datos...", "-2"))
                                End If
                            Else
                                ddlLugarEntregaPedido.Items.Insert(0, New ListItem("", "0"))
                            End If
                        End If

                        Dim strCodProducto1 As String = "", strCodProducto2 As String = ""
                        Dim strCodPlan1 As String = "", strCodPlan2 As String = ""
                        Dim strMeses1 As String = "", strMeses2 As String = ""
                        strCodProducto1 = Request.QueryString("CodProducto1")
                        strCodProducto2 = Request.QueryString("CodProducto2")
                        strCodPlan1 = Request.QueryString("CodPlan1")
                        strCodPlan2 = Request.QueryString("CodPlan2")
                        strMeses1 = Request.QueryString("Meses1")
                        strMeses2 = Request.QueryString("Meses2")

                        If strCodProducto1 IsNot Nothing Then
                            Dim strXML As String = "<?xml version=""1.0"" encoding=""iso-8859-1""?><TABLE><PEDIDO><IdProducto>" & strCodProducto1 & "</IdProducto><vcNom>XXX</vcNom><Precio>50.00</Precio><IdPlan>" & strCodPlan1 & "</IdPlan><DscPlan>50.000</DscPlan><Orden>1</Orden><esNuevo>1</esNuevo><Numero>Nueva Linea</Numero><Meses>" & strMeses1 & "</Meses><PrecioPlanAntiguo>0</PrecioPlanAntiguo></PEDIDO><PEDIDO><IdProducto>" & strCodProducto2 & "</IdProducto><vcNom>YYY</vcNom><Precio>50</Precio><IdPlan>" & strCodPlan2 & "</IdPlan><DscPlan>50</DscPlan><Orden>2</Orden><esNuevo>1</esNuevo><Numero>Nueva Linea</Numero><Meses>" & strMeses2 & "</Meses><PrecioPlanAntiguo>0</PrecioPlanAntiguo></PEDIDO></TABLE>"
                            Logger.WriteLog(Me, LogLevelL4N.DEBUG, "Ejecuta registrarPedido: " & oUsuario.Empleado.P_vcCod & ", Data: " & strXML)
                            registrarPedido(oUsuario.Empleado.P_vcCod, qsIdCampana, 7, strXML, 0, 11274, 0, 1, "-1")
                        End If

                        'Dim strEmpleado As String = Request.QueryString("username")
                        'Dim intIdPedido As Integer = CInt(Request.QueryString("IdPedido"))

                        'Dim pedido As BL_MOV_CAM_Pedido = Nothing
                        'pedido = New BL_MOV_CAM_Pedido(oUsuario.IdCliente)
                        'Dim tablaDetallePedidoTest As DataTable
                        'tablaDetallePedidoTest = pedido.getDetallePedidoByPedidoTest(intIdPedido)
                        'Dim pedidosRegistrados As DataSet = pedido.editarPedido( _
                        '    strEmpleado, _
                        '    24, _
                        '    intIdPedido, _
                        '    7,
                        '    "<?xml version=""1.0"" encoding=""iso-8859-1""?><TABLE><PEDIDO><IdProducto>" + tablaDetallePedidoTest.Rows(0)("idEquipo").ToString() + "</IdProducto><vcNom>" + tablaDetallePedidoTest.Rows(0)("Equipo").ToString() + "</vcNom><Precio>" + tablaDetallePedidoTest.Rows(0)("Precio_Equipo").ToString() + "</Precio><IdPlan>" + tablaDetallePedidoTest.Rows(0)("idPlan").ToString() + "</IdPlan><DscPlan>" + tablaDetallePedidoTest.Rows(0)("Precio_Plan").ToString() + "</DscPlan><Orden>" + tablaDetallePedidoTest.Rows(0)(1).ToString() + "</Orden><idDetallePedido>" + tablaDetallePedidoTest.Rows(0)("idDetallePedido").ToString() + "</idDetallePedido></PEDIDO></TABLE>",
                        '    "<?xml version=""1.0"" encoding=""iso-8859-1""?><TABLE><PEDIDO><IdProducto>" + tablaDetallePedidoTest.Rows(0)("idEquipo").ToString() + "</IdProducto><vcNom>" + tablaDetallePedidoTest.Rows(0)("Equipo").ToString() + "</vcNom><Precio>" + tablaDetallePedidoTest.Rows(0)("Precio_Equipo").ToString() + "</Precio><IdPlan>" + tablaDetallePedidoTest.Rows(0)("idPlan").ToString() + "</IdPlan><DscPlan>" + tablaDetallePedidoTest.Rows(0)("Precio_Plan").ToString() + "</DscPlan><Orden>1</Orden><Numero>Nueva Linea</Numero><Meses>" + tablaDetallePedidoTest.Rows(0)("Meses_Contrato").ToString() + "</Meses></PEDIDO></TABLE>")

                        elegirMesesPlan = IIf(CampanaConf.ElegirMesesPlan, "true", "false")
                        usarPlanesDep = IIf(CampanaConf.UsarPlanesDependientes, "true", "false")
                        UsaFinanciamientoPrecioVariable = IIf(CampanaConf.FinanciamientoPrecioVariable, "true", "false")
                    End If

                    'Obtiene Datos Empleado....
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
                        Try
                            'Validaciones...
                            ListaNegra = New BL_MOV_CAM_CampanaCreditoListaNegra(oUsuario.IdCliente)
                            If ListaNegra.ExisteEmpleadoEnListaNegra(hdfEmpleado.Value) = True Then
                                pBotonesPedido.Visible = False
                                Response.Redirect("~\Pedido\Dashboard_pedido.aspx")
                            End If
                            'CreditoAsignado = New BL_MOV_CAM_DashboardPedido(oUsuario.IdCliente)
                            'If CreditoAsignado.mostrarProductoCreditoAsignado(hdfEmpleado.Value, qsIdCampana).ProductoCreditoAsignado.Count = 0 Then
                            '    pBotonesPedido.Visible = False
                            '    Response.Redirect("~\Pedido\Dashboard_pedido.aspx")
                            'End If

                            'Dim dscPreventa As String = ConfigurationManager.AppSettings("DscPreventa")
                            Dim dscPreventa As String = oConfiguracion.DscPreventa
                            Me.pDscPreventa.InnerText = dscPreventa

                        Catch
                            pBotonesPedido.Visible = False
                            Response.Redirect("~\Pedido\Dashboard_pedido.aspx")
                        End Try
                    Else
                        Response.Redirect("~\Pedido\Dashboard_pedido.aspx")
                        Exit Sub
                    End If

                    Dim s As String = Request.QueryString("irCarrito")
                    Dim a As String = Request.QueryString("esConEquipo")
                    Dim p As String = Request.QueryString("IdPedido")

                    If Not s Is Nothing Then
                        hdfEsDirecto.Value = "1"
                    Else
                        hdfEsDirecto.Value = "0"
                    End If

                    If Not a Is Nothing Then
                        hdfEsConEquipo.Value = a
                    Else
                        hdfEsConEquipo.Value = "0"
                    End If

                    If Not p Is Nothing Then
                        hdfIdPedidoEditar.Value = p
                    Else
                        hdfIdPedidoEditar.Value = "0"
                    End If

                    hdfFecServidor.Value = Utilitario.ObtieneFechaHoraANSIServidor(False)


                    'Dim campana As BL_MOV_CAM_Campana = BL_MOV_CAM_Campana.Instance(0)
                    'Dim entCampana As MOV_CAM_Campana = campana.obtenerCampanaActiva(0)

                    'Dim script As String = "var campanaActiva1 = " + entCampana.IdCampana.ToString() + ";"
                    'Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                    objBlTipoServicio = New BL_MOV_TipoServicio(oUsuario.IdCliente)
                    TipoModeloDispositivo = New BL_MOV_TipoModeloDispositivo(oUsuario.IdCliente)
                    Dim TipoServicio As List(Of ENT_MOV_TipoModeloDispositivo) = TipoModeloDispositivo.ListarModeloDispositivo()

                    objBlDashboardPedido = New BL_MOV_CAM_DashboardPedido(oUsuario.IdCliente)
                    Dim CreditoUsuario As ENT_MOV_CAM_DashboardPedido = objBlDashboardPedido.mostrarProductoCreditoAsignado(oUsuario.Empleado.P_vcCod, qsIdCampana)
                    Dim js As New JavaScriptSerializer()
                    Dim script = "var CreditoUsuario = " + js.Serialize(CreditoUsuario) + "; "
                    script = script + " var TipoModeloDispositivo = " + js.Serialize(TipoServicio) + "; "
                    script = script + " var ElegirMesesPlan = " + elegirMesesPlan + "; "
                    script = script + " var UsarPlanDep = " + usarPlanesDep + "; "
                    script = script + " var UsaFinanciamientoPrecioVariable = " + UsaFinanciamientoPrecioVariable + "; "

                    If Not IsNothing(Request.QueryString("LugarEntrega")) Then
                        script = script + " var vCodLugarEntrega_Ori = " + Request.QueryString("LugarEntrega").ToString() + "; "
                    End If


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
                'hdfFecServidor.Value = Utilitario.ObtieneFechaHoraANSIServidor(False).ToString()
                'End If


            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If objBlCampana IsNot Nothing Then objBlCampana.Dispose()
            If objBlEmpleado IsNot Nothing Then objBlEmpleado.Dispose()
            If ListaNegra IsNot Nothing Then ListaNegra.Dispose()
            If CreditoAsignado IsNot Nothing Then CreditoAsignado.Dispose()
            If objBlTipoServicio IsNot Nothing Then objBlTipoServicio.Dispose()
            If objBlDashboardPedido IsNot Nothing Then objBlDashboardPedido.Dispose()
            If TipoModeloDispositivo IsNot Nothing Then TipoModeloDispositivo.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function obtenerCampanaActiva(ByVal prIdCliente As Integer) As MOV_CAM_Campana
        Dim campana As BL_MOV_CAM_Campana = Nothing
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return campana.obtenerCampanaActiva(prIdCliente)

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

    <WebMethod()>
    Public Shared Function obtenerCampanaActivaConf(ByVal prIdCliente As Integer) As ENT_MOV_CAM_CampanaConf
        Dim campana As BL_MOV_CAM_Campana = Nothing
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return campana.obtenerCampanaActivaConf(prIdCliente)

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

    <WebMethod()>
    Public Shared Function ObtenerCaracteristicas(ByVal IdModeloDispositivo As Integer) As String
        Dim dispositivo As BL_MOV_ModeloDispositivo = Nothing
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            dispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim caracteristicas As DataSet = dispositivo.ObtenerCaracteristicas(IdModeloDispositivo)

            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim listafinal As New List(Of String)
            For i = 0 To caracteristicas.Tables(0).Rows.Count - 1
                Dim lista As New List(Of String)
                For k = 0 To caracteristicas.Tables(0).Columns.Count - 1
                    lista.Add(String.Format(formato, caracteristicas.Tables(0).Columns(k).ToString.Trim, caracteristicas.Tables(0).Rows(i)(k).ToString.Trim))
                Next
                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Auditoria.InsertarAuditoria("ObtenerCaracteristicas - IdModeloDispositivo: " & IdModeloDispositivo.ToString)

            Return json

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If dispositivo IsNot Nothing Then
                dispositivo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function planListarPorModelo(ByVal IdModeloDispositivo As Integer) As String
        Dim planes As BL_MOV_Plan = Nothing
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            planes = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim listaPlanes As List(Of ENT_MOV_Plan) = planes.ListarPorModelo(IdModeloDispositivo)

            Dim formato As String = " ""text"" :""{0}"",""value"":""{1}"" "
            Dim listafinal As New List(Of String)

            For Each plan As ENT_MOV_Plan In listaPlanes
                listafinal.Add("{" + String.Format(formato, plan.vcNom.Trim() + " (" + plan.dcMon.ToString() + ")", plan.P_inCod.ToString) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Auditoria.InsertarAuditoria("planListarPorModelo - IdModeloDispositivo: " & IdModeloDispositivo.ToString)

            Return json

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If planes IsNot Nothing Then
                planes.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerProductosCampanaEmpleado(ByVal IdEmpleado As String, ByVal IdCampana As Integer) As String
        Dim campana As BL_MOV_CAM_Campana = Nothing
        Try
            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim modelos As DataSet = campana.ObtenerProductosCampanaEmpleado(IdEmpleado, IdCampana)
            Try
                For Each fila As DataRow In modelos.Tables(0).Rows
                    If Not IsDBNull(fila("imIma")) AndAlso CType(fila("imIma"), Byte()).Length > 0 Then
                        Dim barrImg As Byte() = CType(fila("imIma"), Byte())
                        Dim archivo As String = fila("P_inCod").ToString & ".jpg"
                        Dim servidor As Page = New Page()
                        Dim strfn As String = servidor.Server.MapPath("~/Common/Images/ModeloDispositivo/" + archivo)
                        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs.Write(barrImg, 0, barrImg.Length)
                        fs.Flush()
                        fs.Close()
                    End If
                Next
            Catch
            End Try

            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim listafinal As New List(Of String)
            For i = 0 To modelos.Tables(0).Rows.Count - 1
                Dim lista As New List(Of String)
                For k = 0 To modelos.Tables(0).Columns.Count - 1
                    If modelos.Tables(0).Columns(k).ToString.Equals("imIma") Then
                        If Not IsDBNull(modelos.Tables(0).Rows(i)("imIma")) AndAlso CType(modelos.Tables(0).Rows(i)("imIma"), Byte()).Length > 0 Then
                            lista.Add(String.Format(formato, "imIma", "../Common/Images/ModeloDispositivo/" + modelos.Tables(0).Rows(i)("P_inCod").ToString.Trim + ".jpg"))
                        Else
                            lista.Add(String.Format(formato, "imIma", "../Common/Images/NoDisponible.jpg"))
                        End If
                    Else
                        If modelos.Tables(0).Columns(k).ToString.Equals("Precio") Then
                            lista.Add(String.Format(formato, modelos.Tables(0).Columns(k).ToString.Trim, Convert.ToDecimal(modelos.Tables(0).Rows(i)(k)).ToString("#.#0").Trim))
                        ElseIf modelos.Tables(0).Columns(k).ToString.Equals("vcDes") Then
                            lista.Add(String.Format(formato, modelos.Tables(0).Columns(k).ToString.Trim, modelos.Tables(0).Rows(i)(k).ToString.Replace(Chr(34), "''").Trim.Replace(Chr(10), "")))
                        Else
                            lista.Add(String.Format(formato, modelos.Tables(0).Columns(k).ToString.Trim, modelos.Tables(0).Rows(i)(k).ToString.Trim))
                        End If

                    End If
                Next
                lista.Add(String.Format(formato, "Accion", ""))
                lista.Add(String.Format(formato, "IdDetalle", ""))
                lista.Add(String.Format(formato, "Numero", ""))
                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Auditoria.InsertarAuditoria("ObtenerProductosCampanaEmpleado - IdEmpleado: " & IdEmpleado & ", IdCampana: " & IdCampana)

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

    <WebMethod()>
    Public Shared Function ObtenerProductosCampanaEmpleadoByPedido(ByVal IdEmpleado As String, ByVal IdCampana As Integer, ByVal pWhere As String) As String
        Dim campana As BL_MOV_CAM_Campana = Nothing
        Try

            'Dim dash As BL_MOV_CAM_DashboardPedido = BL_MOV_CAM_DashboardPedido.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim modelos As DataSet = campana.ObtenerProductosCampanaEmpleadoByPedido(IdEmpleado, IdCampana, pWhere.Replace("|", "'"))

            Try
                For Each fila As DataRow In modelos.Tables(0).Rows
                    If Not IsDBNull(fila("imIma")) AndAlso CType(fila("imIma"), Byte()).Length > 0 Then
                        Dim barrImg As Byte() = CType(fila("imIma"), Byte())
                        Dim archivo As String = fila("P_inCod").ToString & ".jpg"
                        Dim servidor As Page = New Page()
                        Dim strfn As String = servidor.Server.MapPath("~/Common/Images/ModeloDispositivo/" + archivo)
                        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs.Write(barrImg, 0, barrImg.Length)
                        fs.Flush()
                        fs.Close()
                    End If
                Next
            Catch
            End Try

            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim formato2 As String = " ""{0}"" : {1} "
            Dim listafinal As New List(Of String)
            For i = 0 To modelos.Tables(0).Rows.Count - 1
                'If pSoloPlanMayor Then
                '    If (modelos.Tables(0).Rows(i)("idPlan").ToString() = modelos.Tables(0).Rows(i)("idPlanBase").ToString()) And (Convert.ToDecimal(modelos.Tables(0).Rows(i)("PrercioPlan")) < pCostoPlanActual) Then
                '        Continue For
                '    End If
                'End If

                Dim lista As New List(Of String)

                Dim listaFinanciamientoVariableFinal As New List(Of String)
                For k = 0 To modelos.Tables(0).Columns.Count - 1
                    If modelos.Tables(0).Columns(k).ToString.Equals("imIma") Then
                        If Not IsDBNull(modelos.Tables(0).Rows(i)("imIma")) AndAlso CType(modelos.Tables(0).Rows(i)("imIma"), Byte()).Length > 0 Then
                            lista.Add(String.Format(formato, "imIma", "../Common/Images/ModeloDispositivo/" + modelos.Tables(0).Rows(i)("P_inCod").ToString.Trim + ".jpg"))
                        Else
                            lista.Add(String.Format(formato, "imIma", "../Common/Images/NoDisponible.jpg"))
                        End If
                    Else
                        If modelos.Tables(0).Columns(k).ToString.Equals("Precio") Then
                            lista.Add(String.Format(formato, modelos.Tables(0).Columns(k).ToString.Trim, Convert.ToDecimal(modelos.Tables(0).Rows(i)(k)).ToString("#.#0").Trim))
                        ElseIf modelos.Tables(0).Columns(k).ToString.Equals("vcDes") Then
                            lista.Add(String.Format(formato, modelos.Tables(0).Columns(k).ToString.Trim, modelos.Tables(0).Rows(i)(k).ToString.Replace(Chr(34), "''").Trim.Replace(Chr(10), "")))
                        Else
                            lista.Add(String.Format(formato, modelos.Tables(0).Columns(k).ToString.Trim, modelos.Tables(0).Rows(i)(k).ToString.Trim))
                        End If

                    End If
                Next
                lista.Add(String.Format(formato, "Accion", ""))
                lista.Add(String.Format(formato, "IdDetalle", ""))
                lista.Add(String.Format(formato, "Numero", ""))
                lista.Add(String.Format(formato, "IdTipoFinanciamiento", ""))
                lista.Add(String.Format(formato, "Total", Convert.ToDecimal("0").ToString("#.#0").Trim))

                'Mejora Jcamacho para agregar la lista de financiamiento por producto


                For w = 0 To modelos.Tables(1).Rows.Count - 1
                    Dim listaFinanciamientoVariable As New List(Of String)

                    If modelos.Tables(1).Rows(w)("IdProductoPrecio") = modelos.Tables(0).Rows(i)("IdProductoPrecio").ToString.Trim Then

                        For t As Integer = 0 To modelos.Tables(1).Columns.Count - 1

                            If modelos.Tables(1).Columns(t).ToString.Equals("Precio") Then
                                listaFinanciamientoVariable.Add(String.Format(formato, modelos.Tables(1).Columns(t).ToString.Trim, Convert.ToDecimal(modelos.Tables(1).Rows(w)(t)).ToString("#.#0").Trim))
                            ElseIf modelos.Tables(1).Columns(t).ToString.Equals("Descripcion") Then
                                listaFinanciamientoVariable.Add(String.Format(formato, modelos.Tables(1).Columns(t).ToString.Trim, modelos.Tables(1).Rows(w)(t).ToString.Replace(Chr(34), "''").Trim.Replace(Chr(10), "")))
                            Else
                                listaFinanciamientoVariable.Add(String.Format(formato, modelos.Tables(1).Columns(t).ToString.Trim, modelos.Tables(1).Rows(w)(t).ToString.Trim))
                            End If


                        Next

                        listaFinanciamientoVariableFinal.Add("{" + String.Join(",", listaFinanciamientoVariable) + "}")

                    End If


                Next


                If listaFinanciamientoVariableFinal.Count > 0 Then
                    'lista.Add(String.Format("FinanciamientoVariable :", "[" + String.Join(",", listaFinanciamientoVariableFinal) + "]"))
                    lista.Add(String.Format(formato2, "FinanciamientoVariable", "[" + String.Join(",", listaFinanciamientoVariableFinal) + "]"))
                End If

                '************************************************************************


                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Auditoria.InsertarAuditoria("ObtenerProductosCampanaEmpleadoByPedido - IdEmpleado: " & IdEmpleado & ", IdCampana: " & IdCampana & ", pWhere: " & pWhere)

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

    <WebMethod()>
    Public Shared Function obtenerPedidoEmpleado(ByVal prIdEmpleado As String, ByVal prIdCampana As String) As List(Of ENT_MOV_CAM_Pedido)
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("obtenerPedidoEmpleado - prIdEmpleado: " & prIdEmpleado)

            'Return pedido.obtenerPedidoEmpleado(prIdEmpleado, prIdCampana)
            Return pedido.obtenerPedidoEmpleado_MultiCampana(prIdEmpleado, prIdCampana)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function getDetallePedidoByPedido(ByVal prIdPedido As Int64) As List(Of String)
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("getDetallePedidoByPedido - prIdPedido: " & prIdPedido)

            Return pedido.getDetallePedidoByPedido(prIdPedido)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function getDetallePedidoByPedidoMostrar(ByVal prIdPedido As Int64, ByVal prTipo As String) As List(Of String)
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("getDetallePedidoByPedidoMostrar - prIdPedido: " & prIdPedido)

            Return pedido.getDetallePedidoByPedidoMostrar(prIdPedido, prTipo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function CancelarPedido(ByVal prIdPedido As Int64, ByVal prIdCampana As Int32, ByVal prIdEmpleado As String) As Boolean
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return False
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim pedidosCancelados As DataSet = pedido.CancelarPedido(prIdPedido, prIdCampana, prIdEmpleado)

            Auditoria.InsertarAuditoria("CancelarPedido - prIdPedido: " & prIdPedido)

            If pedidosCancelados.Tables(0).Columns.Count = 1 Then
                Return pedidosCancelados.Tables(0)(0).ToString()
            End If

            Dim tblDetalleItems As String = ""
            Dim cont As Integer = 0
            'tblDetalleItems += "<center><table style='width: 90%; border: 2px solid white'><tr>"
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

            For ini As Integer = 0 To pedidosCancelados.Tables(0).Rows.Count - 1
                'If pedidosCancelados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("equipos adquiridos") Then
                tieneDetalle = True
                cont += 1
                tblDetalleItems += "<tr>"
                tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>" '& pedidosCancelados.Tables(0).Rows(ini)("NumeroItem") & "</td>"
                tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & pedidosCancelados.Tables(0).Rows(ini)("Situacion") & "</td>"
                tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosCancelados.Tables(0).Rows(ini)("Equipo") & "</td>"
                tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosCancelados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosCancelados.Tables(0).Rows(ini)("Plan") & "</td>"
                tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosCancelados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosCancelados.Tables(0).Rows(ini)("Numero") & "</td>"
                tblDetalleItems += "</tr>"
                'End If
            Next
            If tieneDetalle Then
                tblDetalleItems += "</table></center>"

                'Insertar Registro de Cola de Correo
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_EmpleadoG
                oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)

                'mostrar datos por tipo de solicitud
                'Dim Modelo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Cola As BL_MOV_Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoServicio As ENT_MOV_SolicitudTipo = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.Cancelado, oEmpleado.inCodOpe)
                'datos del cuerpo del correo
                Dim textoplantilla As String = Utilitario.TraeCuerpoCorreo(HttpContext.Current.Server.MapPath(TipoServicio.vcRutaPlan))
                Dim destinatario As String = ""
                Dim codigo As String = prIdEmpleado
                Dim nombre As String = oEmpleado.vcNomEmp
                Dim NumeroPedido As String = pedidosCancelados.Tables(0).Rows(0)("codigopedido").ToString()
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
                oCola.vcMailTo = oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
                oCola.vcMailFrom = ""
                'insertar cola

                Auditoria.InsertarAuditoria("CancelarPedido - Inserta Cola de Correo", oCola)

                Dim codigocola As String = Cola.Insertar(oCola)

                Cola.Dispose()

            End If
            Return True
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
        End Try
    End Function

    <WebMethod()>
    Public Shared Function getTipoServicio(ByVal prIdTipoModeloDispositivo As Integer) As List(Of ENT_MOV_TipoServicio)
        Dim pedido As BL_MOV_TipoServicio = Nothing
        Try

            pedido = New BL_MOV_TipoServicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("getTipoServicio")

            Return pedido.Listar_porIdTipoModeloDispositivo(prIdTipoModeloDispositivo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function getTipoModelo() As List(Of String)
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Auditoria.InsertarAuditoria("getTipoModelo")
            Return pedido.getTipoModeloByPedido()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerNumero_porIdpedido(ByVal prIdPedido As Integer) As ENT_MOV_CAM_EditarPedidoRenovacion
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Auditoria.InsertarAuditoria("obtenerNumero_porIdpedido")
            Return pedido.obtenerNumero_porIdpedido(prIdPedido)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ConfirmarPedidoPreventa(ByVal prIdEmpleado As String, ByVal pIdCampana As Integer, ByVal pIdPedido As Integer, _
                                                   ByVal pXmlEliminar As String, ByVal pXmlActualizar As String, ByVal pXmlAgregar As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Modelo As BL_MOV_ModeloDispositivo = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("editarPedido. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & _
                                        ", pIdPedido: " & pIdPedido & ", pXmlEliminar: " & pXmlEliminar & _
                                        ", pXmlActualizar: " & pXmlActualizar & ", pXmlAgregar: " & pXmlAgregar)

            Dim pedidosRegistrados As DataSet = pedido.ConfirmarPedidoPreventa(prIdEmpleado, pIdCampana, pIdPedido, pXmlEliminar, pXmlActualizar, pXmlAgregar)

            If pedidosRegistrados.Tables(0).Columns.Count = 1 Then
                Return pedidosRegistrados.Tables(0)(0).ToString()
            End If

            Dim tblDetalleItems As String = ""
            Dim cont As Integer = 0
            tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
            tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td><td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td><td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
            tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Mensual</b></td><td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td></tr>"
            Dim tieneDetalle As Boolean = False

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = Utilitario.DevuelveFormatoNumero(oCultura)

            For ini As Integer = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                If pedidosRegistrados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("equipos adquiridos") Then
                    tieneDetalle = True
                    cont += 1
                    tblDetalleItems += "<tr>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>" '& pedidosCancelados.Tables(0).Rows(ini)("NumeroItem") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Equipo") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Plan") & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                    tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Numero") & "</td>"
                    tblDetalleItems += "</tr>"
                    'Else
                    'Return False
                End If
            Next
            If tieneDetalle Then
                tblDetalleItems += "</table></center>"

                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                'Insertar Registro de Cola de Correo
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_EmpleadoG
                oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)

                'mostrar datos por tipo de solicitud
                Modelo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoServicio As ENT_MOV_SolicitudTipo = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.Nuevo, oEmpleado.inCodOpe)
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
                oCola.vcMailTo = oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
                oCola.vcMailFrom = ""
                'insertar cola

                Auditoria.InsertarAuditoria("registrarPedido - Inserta Cola correo", oCola)

                Cola.Insertar(oCola)
            End If
            '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
            If Modelo IsNot Nothing Then
                Modelo.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarPedido(ByVal prIdEmpleado As String, ByVal pIdCampana As Integer, _
                                           ByVal prIdTipoFinanciamiento As Integer, ByVal pXmlPedido As String, _
                                           ByVal prMantuvoPlan As Integer, ByVal prMaxIdPedido As Integer, ByVal prIdOficina As Integer, ByVal prMesesEquipo As Integer, ByVal prNumeroContacto As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Modelo As BL_MOV_ModeloDispositivo = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("registrarPedido. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", prIdTipoFinanciamiento: " & prIdTipoFinanciamiento & ", pXmlPedido: " & pXmlPedido)

            Dim pedidosRegistrados As DataSet = pedido.registrarPedido(prIdEmpleado, pIdCampana, prIdTipoFinanciamiento, pXmlPedido, prMantuvoPlan, prMaxIdPedido, prIdOficina, prMesesEquipo)

            Auditoria.InsertarAuditoria("registrarPedido_1. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", prIdTipoFinanciamiento: " & prIdTipoFinanciamiento & ", pXmlPedido: " & pXmlPedido)


            If pedidosRegistrados.Tables(0).Columns.Count = 1 Then
                Return pedidosRegistrados.Tables(0).Rows(0)(0).ToString
            End If

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = Utilitario.DevuelveFormatoNumero(oCultura)
            Auditoria.InsertarAuditoria("registrarPedido_2. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", prIdTipoFinanciamiento: " & prIdTipoFinanciamiento & ", pXmlPedido: " & pXmlPedido)
            Dim tblDetalleItems As String = ""
            Dim cont As Integer = 0
            Dim tieneDetalle As Boolean = False

            If prMesesEquipo = 1 Then 'carga de equipos al contado
                tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
                tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td><td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td><td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Mensual</b></td><td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td></tr>"
                For ini As Integer = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                    If pedidosRegistrados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("equipos adquiridos") Then
                        tieneDetalle = True
                        cont += 1
                        tblDetalleItems += "<tr>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>" '& pedidosCancelados.Tables(0).Rows(ini)("NumeroItem") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Equipo") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Plan") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Numero") & "</td>"
                        tblDetalleItems += "</tr>"
                        'Else
                        'Return False
                    End If
                Next
            Else 'carga de equipo en cuotas
                tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
                tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Situación</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Nro Cuotas</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Cuota Mensual Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Meses Contrato</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Precio Plan</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Total Mensual</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td>"
                tblDetalleItems += "</tr>"

                Dim Total1 As Decimal = 0, Total2 As Decimal = 0, Total3 As Decimal = 0, Total4 As Decimal = 0
                For ini As Integer = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                    If pedidosRegistrados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("equipos adquiridos") Then
                        tieneDetalle = True
                        cont += 1
                        Dim precioEquipo As Decimal, mesesEquipo As Integer, precioPlan As Decimal, totalMensual As Decimal, precioMensualEquipo As Decimal
                        precioEquipo = Convert.ToDecimal(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"))
                        mesesEquipo = Convert.ToInt32(pedidosRegistrados.Tables(0).Rows(ini)("MesesEquipo"))
                        precioMensualEquipo = precioEquipo / mesesEquipo
                        precioPlan = Convert.ToDecimal(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"))
                        totalMensual = precioMensualEquipo + precioPlan

                        Total1 = Total1 + precioEquipo
                        Total2 = Total2 + precioMensualEquipo
                        Total3 = Total3 + precioPlan
                        Total4 = Total4 + totalMensual

                        tblDetalleItems += "<tr>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Situacion") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Equipo") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("MesesEquipo") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(precioMensualEquipo, strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Plan") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("MesesContrato") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(totalMensual, strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Numero") & "</td>"
                        tblDetalleItems += "</tr>"
                    End If
                Next
                tblDetalleItems += "<tr>"
                tblDetalleItems += "<td colspan='3' style='text-align: center; background-color: #b1b1b1;'><b>" & cont.ToString() & " Equipo(s)</b></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total1, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total2, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total3, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total4, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "</tr>"
            End If
            Auditoria.InsertarAuditoria("registrarPedido_3. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", prIdTipoFinanciamiento: " & prIdTipoFinanciamiento & ", pXmlPedido: " & pXmlPedido)

            If tieneDetalle Then
                tblDetalleItems += "</table></center>"

                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                'Insertar Registro de Cola de Correo
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_EmpleadoG
                oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)

                'mostrar datos por tipo de solicitud
                Modelo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Cola = New BL_MOV_Cola(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim TipoServicio As ENT_MOV_SolicitudTipo
                If pedidosRegistrados.Tables(0).Rows(0)("Situacion") = "Renovacion" Then
                    TipoServicio = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.RenovarEquipo, oEmpleado.inCodOpe)
                Else
                    TipoServicio = Cola.MostrarTipoSolicitud(Utilitario.TipoPedido.Nuevo, oEmpleado.inCodOpe)
                End If
                Auditoria.InsertarAuditoria("registrarPedido_4. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", prIdTipoFinanciamiento: " & prIdTipoFinanciamiento & ", pXmlPedido: " & pXmlPedido)
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
            '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Auditoria.InsertarAuditoria("registrarPedido_5. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", prIdTipoFinanciamiento: " & prIdTipoFinanciamiento & ", pXmlPedido: " & pXmlPedido)
            Dim formato As String = " ""{0}"" :""{1}"" "
            Dim formatoNum As String = " ""{0}"" :{1} "
            Dim listafinal As New List(Of String)
            For i = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                Dim lista As New List(Of String)
                For k = 0 To pedidosRegistrados.Tables(0).Columns.Count - 1

                    If pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioEquipo") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("PrecioPlan") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("Total") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("MesesEquipo") Or pedidosRegistrados.Tables(0).Columns(k).ToString.Trim.Equals("MesesContrato") Then
                        lista.Add(String.Format(formatoNum, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                    Else
                        lista.Add(String.Format(formato, pedidosRegistrados.Tables(0).Columns(k).ToString.Trim, pedidosRegistrados.Tables(0).Rows(i)(k).ToString.Trim))
                    End If

                Next
                lista.Add(String.Format(formatoNum, "PrecioMensualEquipo", "0"))
                lista.Add(String.Format(formatoNum, "TotalMensual", "0"))
                listafinal.Add("{" + String.Join(",", lista) + "}")
            Next
            Auditoria.InsertarAuditoria("registrarPedido_6. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", prIdTipoFinanciamiento: " & prIdTipoFinanciamiento & ", pXmlPedido: " & pXmlPedido)
            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            'COMENTADO POR BBVA
            'Try
            '    Dim Path As String
            '    Dim url As String
            '    Path = HttpContext.Current.Server.MapPath(".")
            '    url = AbsolutePath("Pedido/PedidoMirror.aspx?IdPedido=" & pedidosRegistrados.Tables(0).Rows(0)("IdPedido"))

            '    Dim snap As New HtmlSnap2.CHtmlSnap
            '    snap.SetTimeOut(200000)
            '    snap.EnableScript(True)
            '    Dim strAleatorio As String = Guid.NewGuid().ToString
            '    strAleatorio = strAleatorio.Replace("-", "")
            '    snap.SnapUrl(url, Path + "\CapturaPedido\" & strAleatorio & ".jpg")
            '    snap = Nothing

            'Catch ex As Exception
            '    Dim util As New Utilitarios
            '    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
            '    Throw New Exception(Utilitario.MensajeError)
            'End Try

            If prNumeroContacto <> "-1" Then
                Dim PedidoContacto As Integer = pedido.RegistrarContactoPedido(pedidosRegistrados.Tables(0).Rows(0)("IdPedido").ToString(), prIdEmpleado, prNumeroContacto)
            End If



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
            If Modelo IsNot Nothing Then
                Modelo.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function editarPedido(ByVal prIdEmpleado As String, ByVal pIdCampana As Integer, ByVal pIdPedido As String, ByVal prIdTipoFinanciamiento As Integer, _
                                        ByVal pXmlEliminar As String, ByVal pXmlAgregar As String, ByVal prIdOficina As Integer, ByVal prMesesEquipo As Integer) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Dim Notificacion As BL_MOV_SolicitudNotificacion = Nothing
        Dim Modelo As BL_MOV_ModeloDispositivo = Nothing
        Dim Cola As BL_MOV_Cola = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("editarPedido. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", pIdPedido: " & pIdPedido & ", pXmlEliminar: " & pXmlEliminar & ", pXmlAgregar: " & pXmlAgregar)

            Dim pedidosRegistrados As DataSet = pedido.editarPedido(prIdEmpleado, pIdCampana, pIdPedido, prIdTipoFinanciamiento, pXmlEliminar, pXmlAgregar, prIdOficina)

            If pedidosRegistrados.Tables(0).Columns.Count = 1 Then
                Return pedidosRegistrados.Tables(0).Rows(0)(0).ToString()
            End If

            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim strForNum = Utilitario.DevuelveFormatoNumero(oCultura)

            Dim tblDetalleItems As String = ""
            Dim cont As Integer = 0
            Dim tieneDetalle As Boolean = False
            If prMesesEquipo = 1 Then 'carga de equipos al contado
                tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
                tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td><td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td><td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Mensual</b></td><td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td></tr>"
                For ini As Integer = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                    If pedidosRegistrados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("equipos adquiridos") Then
                        tieneDetalle = True
                        cont += 1
                        tblDetalleItems += "<tr>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>" '& pedidosCancelados.Tables(0).Rows(ini)("NumeroItem") & "</td>"& pedidosRegistrados.Tables(0).Rows(ini)("NumeroItem") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Equipo") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Plan") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Numero") & "</td>"
                        tblDetalleItems += "</tr>"
                    End If
                Next
            Else 'carga de equipo en cuotas
                tblDetalleItems += "<center><table style='width: 90%; border: 2px solid; white'><tr>"
                tblDetalleItems += "<td style='text-align: center; width: 10px; background-color: #b1b1b1;'><b>#</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Situación</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 250px; background-color: #b1b1b1;'><b>Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Costo Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Nro Cuotas</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Cuota Mensual Equipo</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 200px; background-color: #b1b1b1;'><b>Plan</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Meses Contrato</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Precio Plan</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 8%; background-color: #b1b1b1;'><b>Total Mensual</b></td>"
                tblDetalleItems += "<td style='text-align: center; width: 150px; background-color: #b1b1b1;'><b>Detalle</b></td>"
                tblDetalleItems += "</tr>"

                Dim Total1 As Decimal = 0, Total2 As Decimal = 0, Total3 As Decimal = 0, Total4 As Decimal = 0
                For ini As Integer = 0 To pedidosRegistrados.Tables(0).Rows.Count - 1
                    If pedidosRegistrados.Tables(0).Rows(ini)("Estado").ToString().ToLower.Equals("equipos adquiridos") Then
                        tieneDetalle = True
                        cont += 1
                        Dim precioEquipo As Decimal, mesesEquipo As Integer, precioPlan As Decimal, totalMensual As Decimal, precioMensualEquipo As Decimal
                        precioEquipo = Convert.ToDecimal(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"))
                        mesesEquipo = Convert.ToInt32(pedidosRegistrados.Tables(0).Rows(ini)("MesesEquipo"))
                        precioMensualEquipo = precioEquipo / mesesEquipo
                        precioPlan = Convert.ToDecimal(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"))
                        totalMensual = precioMensualEquipo + precioPlan

                        Total1 = Total1 + precioEquipo
                        Total2 = Total2 + precioMensualEquipo
                        Total3 = Total3 + precioPlan
                        Total4 = Total4 + totalMensual

                        tblDetalleItems += "<tr>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & cont & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Situacion") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Equipo") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioEquipo"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("MesesEquipo") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(precioMensualEquipo, strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Plan") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: center; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("MesesContrato") & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(pedidosRegistrados.Tables(0).Rows(ini)("PrecioPlan"), strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: right; color: black; '>" & Format(totalMensual, strForNum) & "</td>"
                        tblDetalleItems += "<td style='font-size: 12px; font: arial; text-align: left; color: black; '>" & pedidosRegistrados.Tables(0).Rows(ini)("Numero") & "</td>"
                        tblDetalleItems += "</tr>"
                    End If
                Next
                tblDetalleItems += "<tr>"
                tblDetalleItems += "<td colspan='3' style='text-align: center; background-color: #b1b1b1;'><b>" & cont.ToString() & " Equipo(s)</b></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total1, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total2, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total3, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='text-align: right; background-color: #b1b1b1;'><b>" & Format(Total4, strForNum) & "</b></td>"
                tblDetalleItems += "<td style='background-color: #b1b1b1;'></td>"
                tblDetalleItems += "</tr>"
            End If

            If tieneDetalle Then
                tblDetalleItems += "</table></center>"

                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                'Insertar Registro de Cola de Correo
                Notificacion = New BL_MOV_SolicitudNotificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oNotificacion As ENT_MOV_SolicitudNotificacion = Notificacion.Mostrar(2)
                'Dim m_objCorreo As New CCorreo
                Dim oEmpleado As New ENT_GEN_EmpleadoG
                oEmpleado = BL_GEN_EmpleadoG.ListarEmpleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente, prIdEmpleado)

                'mostrar datos por tipo de solicitud
                Modelo = New BL_MOV_ModeloDispositivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
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
                oCola.vcMailTo = oEmpleado.vcCorPer.Trim() 'ConfigurationManager.AppSettings("mailTo") 'TipoServicio.vcEmailTo
                oCola.vcMailFrom = ""
                'insertar cola

                Auditoria.InsertarAuditoria("editarPedido - Insertar Cola correo", oCola)

                Dim codigocola As String = Cola.Insertar(oCola)
            End If

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
            If Modelo IsNot Nothing Then
                Modelo.Dispose()
            End If
            If Cola IsNot Nothing Then
                Cola.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarPedidoPreventa(ByVal prIdEmpleado As String, ByVal pIdCampana As Integer, ByVal pXmlPedido As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("registrarPedido. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", pXmlPedido: " & pXmlPedido)

            Dim pedidosRegistrados As DataSet = pedido.registrarPedidoPreventa(prIdEmpleado, pIdCampana, pXmlPedido)

            If pedidosRegistrados.Tables(0).Columns.Count = 1 Then
                Return pedidosRegistrados.Tables(0)(0).ToString()
            End If

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
        End Try
    End Function

    <WebMethod()>
    Public Shared Function editarPedidoPreventa(ByVal prIdEmpleado As String, ByVal pIdCampana As Integer, ByVal pIdPedido As String, ByVal pXmlEliminar As String, ByVal pXmlAgregar As String) As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            If oUsuario Is Nothing Then
                Return ""
            End If

            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("editarPedido. prIdEmpleado: " & prIdEmpleado & ", pIdCampana: " & pIdCampana & ", pIdPedido: " & pIdPedido & ", pXmlEliminar: " & pXmlEliminar & ", pXmlAgregar: " & pXmlAgregar)

            Dim pedidosRegistrados As DataSet = pedido.editarPedidoPreventa(prIdEmpleado, pIdCampana, pIdPedido, pXmlEliminar, pXmlAgregar)

            If pedidosRegistrados.Tables(0).Columns.Count = 1 Then
                Return pedidosRegistrados.Tables(0)(0).ToString()
            End If

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
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarByLineaEmpleadoFamily(ByVal prIdEmpleado As String) As String
        Dim linea As BL_MOV_Linea = Nothing
        Try
            Dim tablaLineas As DataTable
            linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            tablaLineas = linea.ListarByLineaEmpleadoFamily(prIdEmpleado)

            Dim formato As String = " ""text"" :""{0}"",""value"":""{1}"" "
            Dim listafinal As New List(Of String)

            listafinal.Add("{" + String.Format(formato, "Nueva Linea", "Nueva Linea") + "}")
            For Each fila As DataRow In tablaLineas.Rows
                listafinal.Add("{" + String.Format(formato, fila(0).ToString, fila(0).ToString) + "}")
            Next

            Dim json As String = "[" + String.Join(",", listafinal) + "]"

            Return json

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If linea IsNot Nothing Then
                linea.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerDetallePlan(ByVal prIdPlan As String) As ENT_MOV_Plan
        Dim Plan As BL_MOV_Plan = Nothing
        Try
            Plan = New BL_MOV_Plan(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oPlan As ENT_MOV_Plan = Plan.Mostrar(Convert.ToInt32(prIdPlan))

            Auditoria.InsertarAuditoria("obtenerDetallePlan - prIdPlan: " & prIdPlan, oPlan)

            Return oPlan
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Plan IsNot Nothing Then
                Plan.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function printProceso(ByVal prIdPedido As String) As ENT_MOV_Plan
        Try
            'Dim Path As String
            'Dim url As String
            'Dim pagina As New System.Web.UI.Page
            'Path = pagina.Server.MapPath(".")
            ''url = AbsolutePath("PedidoMirror.aspx?IdPedido=" & prIdPedido
            'Dim servidor As Page = New Page()
            'url = servidor.Server.MapPath("~/Common/Contratos/" + "miContrato.html")

            'Dim snap As New HtmlSnap2.CHtmlSnap
            'snap.SetTimeOut(200000)

            'Dim strAleatorio As String = Guid.NewGuid().ToString
            'strAleatorio = strAleatorio.Replace("-", "")
            'snap.SnapUrl(url, Path + "\Pedido\CapturaPedido\" & strAleatorio & ".jpg")
            'snap = Nothing
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        End Try
    End Function

    Shared Function AbsolutePath(ByVal file As String) As String
        Dim fin As String = IIf(HttpContext.Current.Request.ApplicationPath.EndsWith("/"), "", "/")
        Dim path As String = HttpContext.Current.Request.ApplicationPath + fin
        Return String.Format("http://{0}{1}{2}", HttpContext.Current.Request.Url.Authority, path, file)
    End Function

    <WebMethod()>
    Public Shared Function getTerminosCondiciones() As String
        Dim pedido As BL_MOV_CAM_Pedido = Nothing
        Try
            pedido = New BL_MOV_CAM_Pedido(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("getTerminosCondiciones")

            Dim servidor As Page = New Page()
            Dim pathContrado As String = "Common/Contratos/Condiciones.pdf" 'servidor.Server.MapPath("~/Common/Contratos/" + "miContrato.pdf")

            Return pathContrado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If pedido IsNot Nothing Then
                pedido.Dispose()
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
    Public Shared Function ListarFinanciamientoPorCampana(ByVal prIdCampana As Integer) As List(Of ENT_MOV_CAM_FinanciamientoTipo)
        Dim financiamiento As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Try

            financiamiento = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Auditoria.InsertarAuditoria("ListarFinanciamientoPorCampana")
            Return financiamiento.ListarPorCampana(prIdCampana)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)

        Finally
            If financiamiento IsNot Nothing Then
                financiamiento.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerFinancimiento(ByVal p_IdTipoFinanciamiento As String) As MOV_CAM_FinanciamientoTipo
        Dim FinanciamientoTipo As BL_MOV_CAM_FinanciamientoTipo = Nothing
        Try
            FinanciamientoTipo = New BL_MOV_CAM_FinanciamientoTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return FinanciamientoTipo.Mostrar(Integer.Parse(p_IdTipoFinanciamiento))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If FinanciamientoTipo IsNot Nothing Then
                FinanciamientoTipo.Dispose()
            End If
        End Try
    End Function

    'Private Sub btnGetProceso_Click(sender As Object, e As System.EventArgs) Handles btnGetProceso.Click
    '    Try
    '        Dim Path As String
    '        Dim url As String
    '        Path = Server.MapPath(".")
    '        url = "www.google.com.pe" ' AbsolutePath("Pedido/PedidoMirror.aspx?IdPedido=" & hdfIdPedidoMirror.Value)

    '        Dim snap As New HtmlSnap2.CHtmlSnap
    '        snap.SetTimeOut(200000)

    '        Dim strAleatorio As String = Guid.NewGuid().ToString
    '        strAleatorio = strAleatorio.Replace("-", "")
    '        snap.SnapUrl(url, Path + "\CapturaPedido\" & strAleatorio & ".jpg")
    '        snap = Nothing
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(Utilitario.MensajeError)
    '    End Try
    'End Sub
End Class