Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Public Class Registrar_Incidencia
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            If IsNothing(oUsuario) Then
                Dim script As String = "window.parent.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                hfUsuario.Value = oUsuario.vcUsu
                If Not IsPostBack Then

                    Auditoria.InsertarAuditoria("Ingresa a Registrar_Incidencia.aspx")

                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    CargaTipoDetallado()
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        End Try
    End Sub

    Sub CargaTipoDetallado()
        Dim blTipo As BL_INC_Tipo
        Dim blDetalleTipo As BL_INC_Tipificacion
        Try
            Dim tipos As List(Of ENT_INC_Tipo) = New List(Of ENT_INC_Tipo)
            Dim detalletipos As List(Of ENT_INC_Tipificacion) = New List(Of ENT_INC_Tipificacion)
            blTipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            blDetalleTipo = New BL_INC_Tipificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            tipos = blTipo.obtenerTipo()
            For Each oTipo As ENT_INC_Tipo In tipos
                If oTipo.Nombre.Contains("Seleccione") Then
                    ddlTipoDet.Items.Add(New ListItem(oTipo.Nombre, "0"))
                Else
                    ddlTipoDet.AddItemGroup(oTipo.Nombre)
                End If
                detalletipos = blDetalleTipo.obtenerTipificacion(oTipo.IdTipo)
                For Each oDetalleTipo As ENT_INC_Tipificacion In detalletipos
                    If Not oDetalleTipo.Titulo.Contains("Seleccione") Then
                        If oDetalleTipo.Descripcion.Trim = "" Then
                            oDetalleTipo.Descripcion = oDetalleTipo.Titulo
                        End If
                        ddlTipoDet.Items.Add(New ListItem(oDetalleTipo.Titulo, oTipo.IdTipo & "," & oDetalleTipo.P_inCod))
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
    Public Shared Function ObtenerTipo() As List(Of ENT_INC_Tipo)
        Dim blTipo As BL_INC_Tipo
        Try
            Dim tipos As List(Of ENT_INC_Tipo) = New List(Of ENT_INC_Tipo)
            blTipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            tipos = blTipo.obtenerTipo()

            Auditoria.InsertarAuditoria("ObtenerTipo")

            Return tipos

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If blTipo IsNot Nothing Then
                blTipo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerMedioContacto() As List(Of ENT_INC_MedioContacto)
        Dim blMedioContacto As BL_INC_MedioContacto
        Try
            Dim mediosContacto As List(Of ENT_INC_MedioContacto) = New List(Of ENT_INC_MedioContacto)
            blMedioContacto = New BL_INC_MedioContacto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            mediosContacto = blMedioContacto.obtenerMedioContacto()

            Auditoria.InsertarAuditoria("ObtenerMedioContacto")

            Return mediosContacto

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If blMedioContacto IsNot Nothing Then
                blMedioContacto.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerSubTipo(ByVal prIdTipo As Integer) As List(Of ENT_INC_Tipificacion)
        Dim viTecnico As BL_INC_Tipificacion
        Try
            viTecnico = New BL_INC_Tipificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Auditoria.InsertarAuditoria("obtenerSubTipo - prIdTipo: " & prIdTipo)

            Return viTecnico.obtenerTipificacion(prIdTipo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If viTecnico IsNot Nothing Then
                viTecnico.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerDescripcionTipificacion(ByVal idtipo As Integer, iddetalletipo As Integer) As String
        Dim blDetalleTipo As BL_INC_Tipificacion
        Try
            blDetalleTipo = New BL_INC_Tipificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("ObtenerDescripcionTipificacion - idtipo: " & idtipo & ", iddetalletipo: " & iddetalletipo)

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
    Public Shared Function RegistrarTicket(ByVal pUsuario As Integer, ByVal pUsuarioRegistro As Integer, ByVal pMedioContacto As Integer, ByVal pTipificacion As Integer, _
            ByVal pAsunto As String, ByVal pDescripcion As String, ByVal pEsChat As Boolean) As String
        Dim ticket As BL_INC_Ticket
        Try
            ticket = New BL_INC_Ticket(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Auditoria.InsertarAuditoria("RegistrarTicket")

            Return ticket.registrarTicket(pUsuario, pUsuarioRegistro, pMedioContacto, pTipificacion, pAsunto, pDescripcion, pEsChat, 0)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If ticket IsNot Nothing Then
                ticket.Dispose()
            End If
        End Try
    End Function
End Class