Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Adm_AdministradorSolicitudes
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
               Dim Estado As BL_MOV_Estado = New BL_MOV_Estado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    'UtilitarioWeb.Dataddl(ddlTipoSolicitud, Utilitario.ListarTipoSolicitud(-1, "<Todos>"), "vcNom", "inCod")
                    UtilitarioWeb.Dataddl(ddlEstadoSolicitud, Estado.ListarPorModulo(2, 3, -1, "<Todos>"), "vcNom", "P_inCod")
               UtilitarioWeb.Dataddl(ddlCampoFiltrar, UtilitarioWeb.ListarCampoSolicitud(), "vcNom", "inCod")
                    UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarPorModulo(3, 0), "vcNom", "P_inCod")
                    ddlEstadoSolicitud.SelectedValue = 6
               Estado.Dispose()
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarSolicitudes(ByVal inCodTipSol As String, ByVal inCodEst As String, ByVal inCamBus As String, ByVal vcCodEmp As String, _
                                             ByVal inAdm As String, ByVal vcBus As String) As List(Of ENT_MOV_Solicitud)
        Try
            Dim Solicitud As BL_MOV_Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If inAdm = 1 Then
                Return Solicitud.ListarPorTipoPorEstadoPorFiltro(Convert.ToInt32(inCodTipSol), Convert.ToInt32(inCodEst), Convert.ToInt32(inCamBus), vcBus.Replace("&#39", "'"))
            Else
                Return Solicitud.ListarPorTipoPorEstadoPorFiltro(Convert.ToInt32(inCodTipSol), Convert.ToInt32(inCodEst), Convert.ToInt32(inCamBus), vcBus.Replace("&#39", "'"), vcCodEmp)
            End If
            Solicitud.Dispose()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    '<WebMethod()>
    'Public Shared Sub RespuestaSolicitud(ByVal vcCodIMEI As String, ByVal inCodSol As String, ByVal inEstSol As String, ByVal codNumLim As String)
    '    Try
    '        Dim Solicitud As BL_MOV_Solicitud = BL_MOV_Solicitud.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim oSolicitud As New ENT_MOV_Solicitud

    '        oSolicitud.DispositivoNuevo.P_vcCodIMEI = vcCodIMEI.Replace("&#39", "'")
    '        oSolicitud.P_inCodSol = Integer.Parse(inCodSol)
    '        oSolicitud.Estado.P_inCod = Integer.Parse(inEstSol)
    '        oSolicitud.vcNumLin = codNumLim

    '        Solicitud.RespuestaSolicitud(oSolicitud)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Sub

    '<WebMethod()>
    'Public Shared Function ListarDispositivosLibresPorSolicitud(ByVal inCodSol As String) As List(Of ENT_MOV_Dispositivo)
    '    Try
    '        Dim Dispositivo As BL_MOV_Dispositivo = BL_MOV_Dispositivo.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        Return Dispositivo.ListarDispositivosLibresPorSolicitud(Integer.Parse(inCodSol))
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function

    '<WebMethod()>
    'Public Shared Function ListarLineasLibresPorSolicitud(ByVal inCodSol As String) As List(Of ENT_MOV_Linea)
    '    Try
    '        Dim Linea As BL_MOV_Linea = new BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        Return Linea.ListarDisponible(Integer.Parse(inCodSol))
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function
End Class