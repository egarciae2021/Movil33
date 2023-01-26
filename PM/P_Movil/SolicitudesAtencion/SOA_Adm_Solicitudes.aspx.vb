Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.IO

Imports VisualSoft.PCSistelMovil.Incidencias.BL
Imports VisualSoft.PCSistelMovil.Incidencias.BL.ServiceDominio
Imports VisualSoft.PCSistelMovil.Incidencias.DL.ServiceDominio




Partial Class P_Movil_SolicitudesAtencion_SOA_Adm_Solicitudes
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TecnicosDeSupervisor As New List(Of ENT_SOA_Tecnico)
        Dim tecnico As BL_INC_TecnicoSupervisor
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As String = "-1|-1"

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    If Request.QueryString("EsUsuario") IsNot Nothing Then
                        viIdTecnico = "-1|-1"
                        Me.hdfEsUsuario.Value = "1"
                    Else
                        Me.hdfEsUsuario.Value = "0"
                        viIdTecnico = Me.ObtenerIdTecnicoSupervisor(oUsuario.P_inCod)
                    End If

                    If Request.QueryString("CodTicket") IsNot Nothing Then
                        txtCodigoTicket.Text = Request.QueryString("CodTicket")
                    End If

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod

                    hdfMostrarMsjPrivado.Value = IIf(Me.MostrarMensajePrivado(oUsuario.P_inCod), "1", "0")

                    hdfIdTecnico.Value = viIdTecnico.Split("|")(0)
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"



                    Dim niveles As New List(Of ENT_SOA_Nivel)
                    Dim bolsas As New List(Of ENT_SOA_Bolsa)
                    Dim tipos As New List(Of ENT_INC_Tipo)
                    Dim tificaciones As New List(Of ENT_INC_Tipificacion)

                    Me.ddlTecnicos.Items.Add(New ListItem(oUsuario.vcNom + " (Supervisor)", viIdTecnico.Split("|")(0)))
                    If Not viIdTecnico.Split("|")(1).Equals("-1") Then
                        tecnico = New BL_INC_TecnicoSupervisor(oUsuario.IdCliente)
                        TecnicosDeSupervisor = tecnico.obtenerTecnicosDeSupervisor_Lista(CInt(viIdTecnico.Split("|")(1)))

                        For Each tec As ENT_SOA_Tecnico In TecnicosDeSupervisor
                            Me.ddlTecnicos.Items.Add(New ListItem(tec.Nombre, tec.IdTecnico))
                        Next
                    End If

                    niveles = ListarNivel_deTecnico(CInt(viIdTecnico.Split("|")(0)))
                    bolsas = ListarBolsa_deTecnico(CInt(viIdTecnico.Split("|")(0)))

                    tipos = ListarTipo(-1)
                        tificaciones = ListarTipificacion(-1)

                        For Each nivel As ENT_SOA_Nivel In niveles
                            Me.ddlNivel.Items.Add(New ListItem(nivel.Nombre, nivel.IdNivel.ToString() + "-" + nivel.Orden.ToString))
                        Next

                        Me.ddlTipo.Items.Add(New ListItem("Todos", "Todos"))
                        For Each tipo In tipos
                            Me.ddlTipo.Items.Add(New ListItem(tipo.Nombre, tipo.IdTipo))
                        Next

                        For Each bolsa As ENT_SOA_Bolsa In bolsas
                            If niveles(0).Orden = bolsa.Orden Then
                                Me.ddlBolsa.Items.Add(New ListItem(bolsa.Nombre, bolsa.IdBolsa.ToString + "-" + bolsa.IdNivel.ToString))
                            End If
                        Next

                        'ttgMsgChkSupervisor.Mensaje = "Ust"

                        Me.ddlTipificacion.Enabled = False

                        Dim js As New JavaScriptSerializer()
                        Dim script As String = "var misBolsas = " + js.Serialize(bolsas) + ";"
                        script = script + " var misTipificaciones = " + js.Serialize(tificaciones) + ";"

                        If Not viIdTecnico.Split("|")(1).Equals("-1") Then
                            script = script + " var Tecs = " + js.Serialize(TecnicosDeSupervisor) + ";"
                        End If

                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                    End If
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function obtenerTicket_administracion(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal prIdTicket As String, _
                                                        ByVal prCodTicket As String, ByVal prIdUsuario As String, ByVal prIdUsuarioRegistro As String, _
                                                        ByVal prIdUsuarioTecnico As String, ByVal prCodEstado As String, ByVal prIdMedioContacto As String, _
                                                        ByVal prIdTipificacion As String, ByVal prIdBolsa As String, ByVal prFechaInicio As String, _
                                                        ByVal prFechaFin As String, ByVal prNombreEmpleado As String, ByVal prCodigoEmpleado As String, _
                                                        ByVal prEsSupervisor As Integer, _
                                                        ByVal sortorder As String, ByVal sortname As String) As Object
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            HttpContext.Current.Session("DatosExcel") = prIdTicket + "|" + prCodTicket + "|" + prIdUsuario + "|" + prIdUsuarioRegistro + "|" + prIdUsuarioTecnico + "|" + _
                                                                        prCodEstado.Replace("|", "'") + "|" + prIdMedioContacto + "|" + prIdTipificacion + "|" + prIdBolsa + "|" + _
                                                                        prFechaInicio + "|" + prFechaFin + "|" + prNombreEmpleado + "|" + prCodigoEmpleado + "|" + prEsSupervisor.ToString

            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dt As DataTable = ticket.obtenerTicket_administracion(prIdTicket, prCodTicket, prIdUsuario, prIdUsuarioRegistro, prIdUsuarioTecnico, _
                                                                        prCodEstado.Replace("|", "'"), prIdMedioContacto, prIdTipificacion, prIdBolsa, _
                                                                        prFechaInicio, prFechaFin, prNombreEmpleado, prCodigoEmpleado, prEsSupervisor)

            If sortname.Length > 0 Then
                Dim dataView As New DataView(dt)
                dataView.Sort = sortname + " " + sortorder
                dt = dataView.ToTable
            End If

            Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerTickets(ByVal p_inCod As String, ByVal pCodigoTicket As String, ByVal p_inCodUsuario As String, ByVal p_inCodUsuarioRegistro As String, _
            ByVal p_inCodTecnico As String, ByVal p_inCodEstado As String, ByVal P_inCodMedioContacto As String, ByVal P_inTipificacion As String) As List(Of ENT_SOA_Solicitud)
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If p_inCodTecnico = "0" Then
                Return ticket.obtenerTickets_Entidad(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, "-1", p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)
            Else
                Return ticket.obtenerTickets_Entidad(p_inCod, pCodigoTicket, p_inCodUsuario, "-1", p_inCodTecnico, p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)
            End If
            'Return ticket.obtenerTickets(p_inCod, pCodigoTicket, p_inCodUsuario, p_inCodUsuarioRegistro, p_inCodTecnico, p_inCodEstado, P_inCodMedioContacto, P_inTipificacion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    Private Function ObtenerIdTecnicoXIdUsuario(ByVal prIdUsuario As Integer) As Integer
        Dim viTecnico As BL_INC_TecnicoSupervisor = Nothing
        Try
            viTecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return viTecnico.ObtenerIdTecnicoXIdUsuario(prIdUsuario)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If viTecnico IsNot Nothing Then
                viTecnico.Dispose()
            End If
        End Try
    End Function

    Private Function ObtenerIdTecnicoSupervisor(ByVal prIdUsuario As Integer) As String
        Dim viTecnico As BL_INC_TecnicoSupervisor = Nothing
        Try
            viTecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return viTecnico.ObtenerIdTecnicoIdSupervisor(prIdUsuario)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If viTecnico IsNot Nothing Then
                viTecnico.Dispose()
            End If
        End Try
    End Function

    Private Function MostrarMensajePrivado(ByVal prIdUsuario As Integer) As Boolean
        Dim viTecnico As BL_INC_TecnicoSupervisor = Nothing
        Try
            viTecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return viTecnico.MostrarMensajePrivado(prIdUsuario)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If viTecnico IsNot Nothing Then
                viTecnico.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarNivel_deTecnico(ByVal prIdTecnicoSupervisor As Integer) As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try

            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_SOA_Nivel) = nivel.ListarNivel_deTecnico(prIdTecnicoSupervisor)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then
                nivel.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa_deTecnico(ByVal prIdTecnicoSupervisor As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_SOA_Bolsa) = bolsa.ListarBolsa_deTecnico(prIdTecnicoSupervisor)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTipo(ByVal prIdTipo As Integer) As List(Of ENT_INC_Tipo)
        Dim tipo As BL_INC_Tipo = Nothing
        Try

            tipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_INC_Tipo) = tipo.ListarTipo(prIdTipo)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipo IsNot Nothing Then
                tipo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTipificacion(ByVal prIdTipificacion As Integer) As List(Of ENT_INC_Tipificacion)
        Dim tipificacion As BL_INC_Tipificacion = Nothing
        Try

            tipificacion = New BL_INC_Tipificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim _return As List(Of ENT_INC_Tipificacion) = tipificacion.ListarTipificacion(prIdTipificacion)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipificacion IsNot Nothing Then
                tipificacion.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerEscalamientoBolsa(ByVal prIdBolsa As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_SOA_Bolsa) = bolsa.obtenerEscalamientoBolsa(prIdBolsa)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function escalarTicket(ByVal prIdTicket As Integer, ByVal prIdBolsaBase As Integer, ByVal prIdBolsaFin As Integer, _
                                                ByVal prIdUsuario As Integer, ByVal prIdTecnico As Integer, ByVal prDescripcion As String) As String
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As String = ticket.escalarTicket(prIdTicket, prIdBolsaBase, prIdBolsaFin, prIdUsuario, prIdTecnico, prDescripcion)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function cerrarTicket(ByVal prIdTicket As Integer, ByVal prCodEstado As String, ByVal prConclucion As String, _
                                                ByVal prIdTecnico As Integer, ByVal prChat As Integer) As String
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As String = ticket.cerrarTicket(prIdTicket, prCodEstado, prConclucion, prIdTecnico, prChat)
            'select idTicketEscalado from [dbo].[MOV_SOA_TicketEscalamiento] where idticketbase = 468
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerDetalleTicket(ByVal prIdTicket As Integer) As List(Of ENT_INC_DetalleTicket)
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Try
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim _return As List(Of ENT_INC_DetalleTicket) = detalle.obtenerDetalleTicket(prIdTicket)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerDetalleTicket_Tecnico(ByVal prIdTicket As Integer, ByVal prEsSupervisor As Integer) As ENT_SOA_Notas
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Try

            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As ENT_SOA_Notas = detalle.obtenerDetalleTicket_Tecnico(prIdTicket, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod, prEsSupervisor)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerDetalleTicket_Usuario(ByVal prIdTicket As Integer) As List(Of ENT_INC_DetalleTicket)
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Try
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_INC_DetalleTicket) = detalle.obtenerDetalleTicket_Usuario(prIdTicket, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarDetalleTicket_Tecnico(ByVal prIdTicket As Integer, ByVal prIdTicketEscalamiento As Integer,
                                                          ByVal prIdUsuario As Integer, ByVal prNota As String,
                                                          ByVal vcFileName As String, ByVal prEsParaSupervisor As Integer, ByVal prEnvioCorreo As Integer,
                                                          ByVal psEsSupervisor As Integer,
                                                          ByVal pIdDominio As Integer) As ENT_INC_DetalleTicket
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Incidencias//", "//")

        Dim vcExtension = ""
        Dim deLength As Decimal
        Dim byFileData As Byte() = Nothing
        Dim vcName As String = ""
        Try
            If vcFileName <> "" Then
                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Incidencias" + CarpetaDominio + "//" + vcFileName
                vcName = vcFileName.Substring(0, vcFileName.LastIndexOf("."))
                vcExtension = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1)

                Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                deLength = fs.Length / 1024
                byFileData = New Byte(fs.Length - 1) {}
                fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                fs.Close()

                'oSolicitudDetalle.Archivo = byFileData
                'oSolicitudDetalle.Nombre = vcName
                'oSolicitudDetalle.TamanioKB = deLength
            End If
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As ENT_INC_DetalleTicket = detalle.registrarDetalleTicket_Tecnico(prIdTicket, prIdTicketEscalamiento,
                                                                                          prIdUsuario, prNota.Replace("&#39", "'"), byFileData,
                                                                                          vcName, deLength, vcExtension,
                                                                                          IIf(prEsParaSupervisor = 1, True, False),
                                                                                          IIf(psEsSupervisor = 1, True, False),
                                                                                          pIdDominio, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom,
                                                                                          prEnvioCorreo)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarDetalleTicket_Usuario(ByVal prIdTicket As Integer,
                                                          ByVal prIdUsuario As Integer, ByVal prNota As String,
                                                          ByVal vcFileName As String, ByVal prEnvioCorreo As Integer, ByVal pIdDominio As Integer) As Boolean
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Incidencias//", "//")

        Dim vcExtension = ""
        Dim deLength As Decimal
        Dim byFileData As Byte() = Nothing
        Dim vcName As String = ""
        Try
            If vcFileName <> "" Then
                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Incidencias" + CarpetaDominio + "//" + vcFileName
                vcName = vcFileName.Substring(0, vcFileName.LastIndexOf("."))
                vcExtension = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1)

                Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                deLength = fs.Length / 1024
                byFileData = New Byte(fs.Length - 1) {}
                fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                fs.Close()

                'oSolicitudDetalle.Archivo = byFileData
                'oSolicitudDetalle.Nombre = vcName
                'oSolicitudDetalle.TamanioKB = deLength
            End If
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As Boolean = detalle.registrarDetalleTicket(prIdTicket, prIdUsuario, prNota.Replace("&#39", "'"), byFileData, vcName, deLength, vcExtension, pIdDominio, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).vcNom, prEnvioCorreo)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function activarAyudaSupervisor(ByVal prIdTicket As Integer, ByVal prActivar As Boolean, ByVal prIdTecnicoSupervisor As Integer) As String
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As String = ticket.activarAyudaSupervisor(prIdTicket, prActivar, prIdTecnicoSupervisor)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DescargarArchivoBD(ByVal inIdDet As Integer) As List(Of String)
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Dim miLista As New List(Of String)
        Try

            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dtDetalle As DataTable = detalle.ObtenerArchivoAdjunto(inIdDet)


            Dim vcFilePath = ""
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Incidencias//", "//")

            If Not IsNothing(dtDetalle.Rows(0)("Archivo")) Then
                vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Incidencias" + CarpetaDominio + "//" + dtDetalle.Rows(0)("NombreExtencion").ToString()
                Dim byFileData As Byte() = dtDetalle.Rows(0)("Archivo")
                File.WriteAllBytes(vcFilePath, byFileData)
                miLista.Add(vcFilePath)
                miLista.Add(dtDetalle.Rows(0)("NombreExtencion").ToString())
            Else
                miLista.Add("")
                miLista.Add("")
            End If

            Return miLista

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    Private Sub eegExcel_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegExcel.ObtenerDatosAExportar
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim ticket As BL_INC_Ticket = Nothing
        Dim dtDatos As DataTable
        Dim DatosSesion As String
        Dim ArrayDatos As String()
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            DatosSesion = HttpContext.Current.Session("DatosExcel")

            If DatosSesion IsNot Nothing AndAlso DatosSesion.Trim() <> "" Then
                ArrayDatos = DatosSesion.Split("|")
                If ArrayDatos.Count > 12 Then
                    dtDatos = ticket.obtenerTicket_administracion(ArrayDatos(0), ArrayDatos(1), ArrayDatos(2), ArrayDatos(3), ArrayDatos(4), _
                                            ArrayDatos(5), ArrayDatos(6), ArrayDatos(7), ArrayDatos(8), _
                                            ArrayDatos(9), ArrayDatos(10), ArrayDatos(11), ArrayDatos(12), ArrayDatos(13))

                    dtDatos.Columns.Remove("IdTicket")
                    dtDatos.Columns.Remove("IdUsuario")
                    dtDatos.Columns.Remove("vcUsu")
                    dtDatos.Columns.Remove("IdUsuarioRegistro")
                    dtDatos.Columns.Remove("NombreUsuarioRegistro")
                    dtDatos.Columns.Remove("vcUsuRegistro")
                    dtDatos.Columns.Remove("CodEstado")
                    dtDatos.Columns.Remove("Column1")
                    dtDatos.Columns.Remove("IdTipificacion")
                    dtDatos.Columns.Remove("EsChat")
                    dtDatos.Columns.Remove("IdBolsa")
                    dtDatos.Columns.Remove("CodEmp")
                    dtDatos.Columns.Remove("Leido_Usuario")
                    dtDatos.Columns.Remove("Leido_Tecnico")

                    dtDatos.Columns("CodigoTicket").ColumnName = "Código"
                    dtDatos.Columns("NombreUsuario").ColumnName = "Usuario"
                    dtDatos.Columns("NombreEstado").ColumnName = "Estado"
                    dtDatos.Columns("FechaRegistro").ColumnName = "Fecha Registro"
                    dtDatos.Columns("inDiaTra").ColumnName = "Días Transcurridos"
                    dtDatos.Columns("NombreTipificacion").ColumnName = "Tipificación"
                    dtDatos.Columns("Descripcion").ColumnName = "Descripción"
                    dtDatos.Columns("vcUmbral").ColumnName = "Umbral"

                    dtDatos.AcceptChanges()

                    Me.eegExcel.ExportarDatos(dtDatos, "Incidencias")
                End If
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerDetalleEscalamientoAnterior(ByVal prIdTicketEscalamiento As Integer, ByVal prIdTicketBase As Integer, ByVal prIdTicketEscalado As Integer) As List(Of ENT_INC_DetalleTicket)
        Dim detalle As BL_INC_DetalleTicket = Nothing
        Try
            detalle = New BL_INC_DetalleTicket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_INC_DetalleTicket) = detalle.ObtenerDetalleEscalamientoAnterior(prIdTicketEscalamiento, prIdTicketBase, prIdTicketEscalado)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EscalarTicketExterno(ByVal pParametro As String) As RES_Json
        Dim BLTicket As BL_INC_Externo = Nothing
        Dim resultado As New RES_Json()
        Try
            Dim oSerializer As New JavaScriptSerializer
            Dim parametro As PRM_TicketExterno = oSerializer.Deserialize(Of PRM_TicketExterno)(pParametro)
            BLTicket = New BL_INC_Externo()
            resultado = BLTicket.EscalarExterno(parametro)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If BLTicket IsNot Nothing Then
                BLTicket.Dispose()
            End If
        End Try
        Return resultado

    End Function

    <WebMethod()>
    Public Shared Function getTiposExternos() As List(Of ENT_CINC_Tipo)
        Dim BLTicket As BL_INC_Externo = Nothing
        Dim tipos As New List(Of ENT_CINC_Tipo)
        Try
            BLTicket = New BL_INC_Externo()
            tipos = BLTicket.getTipo()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If BLTicket IsNot Nothing Then
                BLTicket.Dispose()
            End If
        End Try
        Return tipos
    End Function
End Class
