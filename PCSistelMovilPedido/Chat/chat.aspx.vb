Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Public Class chat
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Not Page.IsPostBack Then

            If Session("Usuario") Is Nothing Then
                Me.ClientScript.RegisterClientScriptBlock(Me.GetType, "cerrar", "window.close();", True)
                Exit Sub
            End If

            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim oConfiguracion As ENT_CFG_ConfiguracionGeneral = CType(Session("Configuracion"), ENT_CFG_ConfiguracionGeneral)

            hdfUsuariosMaximos.Value = Val(oConfiguracion.LimiteAtencionChat)
            'dfUsuariosMaximos.Value = Val(ConfigurationManager.AppSettings("LimiteAtencionChat"))

            Dim vcCodGruOriFam As Integer = oUsuario.GrupoFam
            Dim vcCodGruOri As Integer = oUsuario.Grupo
            Dim Politica As BL_MOV_Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If oUsuario.GrupoFam.ToString() <> "" Then
                hdfGrupoOrigenFam.Value = Politica.ValidarPoliticaCampana(vcCodGruOriFam)
            Else
                hdfGrupoOrigenFam.Value = False
            End If

            hfIdUsuario.Value = oUsuario.P_inCod
            hfNombreUsuario.Value = oUsuario.vcUsu
            hfDescripcionUsuario.Value = oUsuario.vcNom
            hdfMsjSinAdmin.Value = oConfiguracion.SinAdministrador
            hdfMsjSinAdminDisponible.Value = oConfiguracion.SinAdministradorDisponible
            hdfMsjAdminSaturado.Value = oConfiguracion.AdministradorSaturado
            'hdfMsjSinAdmin.Value = ConfigurationManager.AppSettings("SinAdministrador")
            'hdfMsjSinAdminDisponible.Value = ConfigurationManager.AppSettings("SinAdministradorDisponible")
            'hdfMsjAdminSaturado.Value = ConfigurationManager.AppSettings("AdministradorSaturado")

            hfTipoUsuario.Value = "usuario"
            If Seguridad.EsAdministrador() Then hfTipoUsuario.Value = "administrador"

            Me.hdfIpNode.Value = oConfiguracion.IpNode
            Me.hdfPuertoNode.Value = oConfiguracion.PuertoNode

            'Me.hdfIpNode.Value = ConfigurationManager.AppSettings("IpNode")
            'Me.hdfPuertoNode.Value = ConfigurationManager.AppSettings("PuertoNode")

            procCargarTipos()

        End If

    End Sub

    Sub procCargarTipos()
        Dim blTipo As BL_INC_Tipo
        Dim blDetalleTipo As BL_INC_Tipificacion
        Try
            Dim tipos As List(Of ENT_INC_Tipo) = New List(Of ENT_INC_Tipo)
            Dim detalletipos As List(Of ENT_INC_Tipificacion) = New List(Of ENT_INC_Tipificacion)
            blTipo = New BL_INC_Tipo(0)
            blDetalleTipo = New BL_INC_Tipificacion(0)
            tipos = blTipo.obtenerTipo()
            ddlTipoIncidencia.Items.Clear()
            For Each oTipo As ENT_INC_Tipo In tipos
                If oTipo.Nombre.Contains("Seleccione") Then
                    ddlTipoIncidencia.Items.Add(New ListItem(oTipo.Nombre, "0"))
                Else
                    ddlTipoIncidencia.AddItemGroup(oTipo.Nombre)
                End If
                detalletipos = blDetalleTipo.obtenerTipificacion(oTipo.IdTipo)
                For Each oDetalleTipo As ENT_INC_Tipificacion In detalletipos
                    If Not oDetalleTipo.Titulo.Contains("Seleccione") And Not oDetalleTipo.Descripcion = "" Then
                        ddlTipoIncidencia.Items.Add(New ListItem(oDetalleTipo.Titulo, oTipo.IdTipo & "," & oDetalleTipo.P_inCod))
                    End If
                Next
            Next
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If blTipo IsNot Nothing Then
                blTipo.Dispose()
            End If
            If blDetalleTipo IsNot Nothing Then
                blDetalleTipo.Dispose()
            End If
        End Try

    End Sub

    <WebMethod()>
    Public Shared Function GetDescripcionTipo(ByVal idtipo As Integer, iddetalletipo As Integer) As String
        Dim blDetalleTipo As BL_INC_Tipificacion
        Try
            blDetalleTipo = New BL_INC_Tipificacion(0)
            Return blDetalleTipo.obtenerUnaTipificacion(idtipo, iddetalletipo).Descripcion

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If blDetalleTipo IsNot Nothing Then
                blDetalleTipo.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function obtenerDetalleTicket(ByVal p_inCod As Integer) As List(Of ENT_INC_DetalleTicket)
        Dim detalle As BL_INC_DetalleTicket
        Try
            detalle = New BL_INC_DetalleTicket(0)

            Return detalle.obtenerDetalleTicket(p_inCod)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If detalle IsNot Nothing Then
                detalle.Dispose()
            End If
        End Try
    End Function


    <WebMethod()>
    Public Shared Function RegistrarTicket(ByVal pUsuario As Integer, ByVal pUsuarioRegistro As Integer, ByVal pMedioContacto As Integer, ByVal pTipificacion As Integer, _
            ByVal pAsunto As String, ByVal pDescripcion As String, ByVal pEsChat As Boolean, CodTecnicoAsignado As String) As String
        Dim ticket As BL_INC_Ticket = Nothing
        Dim _return As String = ""
        Try
            ticket = New BL_INC_Ticket(0)

            _return = ticket.registrarTicket(pUsuario, pUsuarioRegistro, pMedioContacto, pTipificacion, pAsunto, pDescripcion, pEsChat, 0)

            Auditoria.InsertarAuditoria("Chat- RegistrarTicket - IdTicket: " & _return)

            'Asignar ticket  a tecnico...
            If CodTecnicoAsignado <> "" Then
                ticket.asignarTicketTecnico(0, _return.Split("|")(1), CodTecnicoAsignado, -1)
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If ticket IsNot Nothing Then ticket.Dispose()
        End Try
        Return _return
    End Function

    <WebMethod()>
    Public Shared Function VerificaSesion() As String
        Dim _return As String = ""
        Try
            If HttpContext.Current.Session("Usuario") Is Nothing Then 'Perdio la variable session usuario
                _return = "Perdio sesion"
            End If
        Catch ex As Exception
            _return = ex.Message
            Try
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Catch ex1 As Exception
                _return = "error en util"
            End Try
            'Throw New Exception(Utilitario.MensajeError)
        End Try
        Return _return
    End Function


End Class