Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Movil_SolicitudesAtencion_SOA_Mnt_Tecnico
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_SolicitudesAtencion_SOA_Mnt_Tecnico_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    'viIdTecnico = Me.ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    'hdfIdTecnico.Value = viIdTecnico
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim codigo As String = Request.QueryString("Cod")
                    Dim campo As String = Request.QueryString("Par")

                    If Not codigo Is Nothing Then
                        hdfIdTecnicoSupervisor.Value = codigo
                    Else
                        hdfIdTecnicoSupervisor.Value = "0"
                    End If

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
    Public Shared Function registrarTecnico(ByVal prIdUsuarioTecnico As Integer, ByVal prIdUsuarioSupervisor As Integer, ByVal prXmlBolsas As String) As String
        Dim tecnico As BL_INC_TecnicoSupervisor = Nothing

        Try
            tecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return tecnico.registrarTecnico(prIdUsuarioTecnico, prIdUsuarioSupervisor, prXmlBolsas)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tecnico IsNot Nothing Then
                tecnico.Dispose()
            End If
        End Try
    End Function
    <WebMethod()>
    Public Shared Function actualizarTecnico(ByVal prIdTecnicoSupervisor As Integer, ByVal prIdUsuarioTecnico As Integer, _
                                             ByVal prIdUsuarioSupervisor As Integer, ByVal prXmlBolsas As String, ByVal prActivo As Integer) As Integer
        Dim tecnico As BL_INC_TecnicoSupervisor = Nothing

        Try
            tecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return tecnico.actualizarTecnico(prIdTecnicoSupervisor, prIdUsuarioTecnico, prIdUsuarioSupervisor, prXmlBolsas, prActivo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tecnico IsNot Nothing Then
                tecnico.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarTecnico_conBolsasAsignadas(ByVal prIdTecnicoSupervisor As Integer) As ENT_SOA_TecnicoSupervisor
        Dim tecnico As BL_INC_TecnicoSupervisor = Nothing

        Try
            tecnico = New BL_INC_TecnicoSupervisor(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return tecnico.ListarTecnico_conBolsasAsignadas(prIdTecnicoSupervisor)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tecnico IsNot Nothing Then
                tecnico.Dispose()
            End If
        End Try
    End Function
End Class
