Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Movil_AdministrarTickets_AdmTck_BolsaTicket
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    viIdTecnico = Me.ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)

                    'var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
                    'var Accord = window.parent.$("#" + tab1);
                    'Accord.tabs("remove", Accord.tabs("option", "selected"));
                    'If viIdTecnico = -1 Then
                    '    'Dim script As String = "alert('Usted no es administrador'); window.parent.location.reload();"
                    '    Dim script As String = "alert('Usted no es técnico'); window.parent.tabPrincipal.tabs('remove', window.parent.tabPrincipal.tabs('option', 'selected'));"
                    '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    'End If

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfIdTecnico.Value = viIdTecnico
                    hdfIsModoCloud.Value = ConfigurationManager.AppSettings("ModoCloud")
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim niveles As New List(Of ENT_SOA_Nivel)
                    Dim bolsas As New List(Of ENT_SOA_Bolsa)
                    Dim tipos As New List(Of ENT_INC_Tipo)
                    Dim tificaciones As New List(Of ENT_INC_Tipificacion)
                    niveles = ListarNivel_deTecnico(viIdTecnico)
                    bolsas = ListarBolsa_deTecnico(viIdTecnico)
                    tipos = ListarTipo(-1)
                    tificaciones = ListarTipificacion(-1)

                    For Each nivel As ENT_SOA_Nivel In niveles
                        Me.ddlNivel.Items.Add(New ListItem(nivel.Nombre, nivel.IdNivel.ToString() + "-" + nivel.Orden.ToString))
                    Next

                    Me.ddlTipo.Items.Add(New ListItem("Todos", "Todos"))
                    For Each tipo In tipos
                        Me.ddlTipo.Items.Add(New ListItem(tipo.Nombre, tipo.IdTipo))
                    Next

                    'For Each bolsa As ENT_SOA_Bolsa In bolsas
                    '    If niveles(0).Orden = bolsa.Orden Then
                    '        Me.ddlBolsa.Items.Add(New ListItem(bolsa.Nombre, bolsa.IdBolsa.ToString + "-" + bolsa.IdNivel.ToString))
                    '    End If
                    'Next

                    Me.ddlTipificacion.Enabled = False

                    Dim js As New JavaScriptSerializer()
                    Dim script As String = "var listaBolsas_deTecnico = " + js.Serialize(bolsas) + ";"
                    script = script + " var misTipificaciones = " + js.Serialize(tificaciones) + ";"
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
    Public Shared Function obtenerTicketsAbiertosSinAsignacion(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return JQGrid.DatosJSON(ticket.obtenerDtTicketsAbiertosSinAsignacion, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then ticket.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerTicketsAbiertosSinAsignacion_deTecnico(ByVal inPagTam As Integer, ByVal inPagAct As Integer, _
                                                                        ByVal prIdNivel As Integer, ByVal prIdTecnicoSupervisor As Integer, _
                                                                        ByVal prIdTipo As Integer, ByVal prIdTipificacion As Integer, _
                                                                        ByVal prCodTicket As String, ByVal prFechaInicio As String, _
                                                                        ByVal prFechaFin As String) As Object
        Dim ticket As BL_INC_Ticket = Nothing
        Try

            HttpContext.Current.Session("DatosExcel") = prIdNivel.ToString + "|" + prIdTecnicoSupervisor.ToString + "|" + prIdTipo.ToString + "|" + prIdTipificacion.ToString + "|" + _
                                                                                           prCodTicket + "|" + prFechaInicio + "|" + prFechaFin

            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return JQGrid.DatosJSON(ticket.obtenerDtTicketsAbiertosSinAsignacion_deTecnico(prIdNivel, prIdTecnicoSupervisor, prIdTipo, prIdTipificacion, _
                                                                                           prCodTicket, prFechaInicio, prFechaFin), inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then ticket.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function asignarTicketTecnicoDirecto(ByVal p_incodTicket As Integer, ByVal pCodTicket As String, ByVal p_inCodTecnico As Integer) As String
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return ticket.asignarTicketTecnico(p_incodTicket, pCodTicket, p_inCodTecnico)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then ticket.Dispose()
        End Try
    End Function
    <WebMethod()>
    Public Shared Function asignarTicketTecnico(ByVal p_incodTicket As Integer, ByVal pCodTicket As String, ByVal p_inCodTecnico As Integer, _
                                                ByVal prIdBolsa As Integer) As String
        Dim ticket As BL_INC_Ticket = Nothing
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Return ticket.asignarTicketTecnico(p_incodTicket, pCodTicket, p_inCodTecnico, prIdBolsa)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ticket IsNot Nothing Then ticket.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarNivel_deTecnico(ByVal prIdTecnicoSupervisor As Integer) As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try
            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.ListarNivel_deTecnico(prIdTecnicoSupervisor)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then nivel.Dispose()
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
            If viTecnico IsNot Nothing Then viTecnico.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa_deTecnico(ByVal prIdTecnicoSupervisor As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try
            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return bolsa.ListarBolsa_deTecnico(prIdTecnicoSupervisor)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then bolsa.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTipo(ByVal prIdTipo As Integer) As List(Of ENT_INC_Tipo)
        Dim tipo As BL_INC_Tipo = Nothing
        Try
            tipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return tipo.ListarTipo(prIdTipo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipo IsNot Nothing Then tipo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTipificacion(ByVal prIdTipificacion As Integer) As List(Of ENT_INC_Tipificacion)
        Dim tipificacion As BL_INC_Tipificacion = Nothing
        Try
            tipificacion = New BL_INC_Tipificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return tipificacion.ListarTipificacion(prIdTipificacion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipificacion IsNot Nothing Then tipificacion.Dispose()
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
                If ArrayDatos.Count > 6 Then
                    dtDatos = ticket.obtenerDtTicketsAbiertosSinAsignacion_deTecnico(CInt(ArrayDatos(0)), CInt(ArrayDatos(1)), CInt(ArrayDatos(2)), CInt(ArrayDatos(3)), ArrayDatos(4), _
                                            ArrayDatos(5), ArrayDatos(6))

                    dtDatos.Columns.Remove("IdTicket")
                    dtDatos.Columns.Remove("IdUsuario")
                    dtDatos.Columns.Remove("CodEstado")
                    dtDatos.Columns.Remove("IdTipificacion")
                    dtDatos.Columns.Remove("vcUmbral")

                    dtDatos.Columns("CodigoTicket").ColumnName = "Código"
                    dtDatos.Columns("vcNom").ColumnName = "Usuario"
                    dtDatos.Columns("NombreEstado").ColumnName = "Estado"
                    dtDatos.Columns("NombreTipificacion").ColumnName = "Tipo"
                    dtDatos.Columns("Descripcion").ColumnName = "Descripción"
                    dtDatos.Columns("FechaRegistro").ColumnName = "Fecha Registro"
                    dtDatos.Columns("inDiaTra").ColumnName = "Días Transcurridos"

                    dtDatos.AcceptChanges()

                    Me.eegExcel.ExportarDatos(dtDatos, "Incidencias_SinAsignar")
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
End Class
