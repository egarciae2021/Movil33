Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports Microsoft.VisualBasic
Imports System
Imports System.Web.UI
Imports DevExpress.Web
Imports System.Globalization
Imports System.Web.Services
Imports UtilitarioWeb

Public Class Mnt_List_Orden_Servicio
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Grupo As BL_GEN_GrupoOrigen = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim CentCost As BL_GEN_CentroCosto = Nothing
        Dim Orga As BL_GEN_Organizacion = Nothing
        Dim Sucu As BL_GEN_Sucursal = Nothing
        Dim Modelo As BL_MOV_ModeloDispositivo = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim Estado As BL_MOV_Estado = Nothing

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Grupo = New BL_GEN_GrupoOrigen(oUsuario.IdCliente)
            CentCost = New BL_GEN_CentroCosto(oUsuario.IdCliente)
            Orga = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Sucu = New BL_GEN_Sucursal(oUsuario.IdCliente)
            Modelo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
            LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            Estado = New BL_MOV_Estado(oUsuario.IdCliente)

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    'UtilitarioWeb.Dataddl(ddlGrupoEmpleado, Grupo.ListarGrupo(-1, "<Todos>"), "vcNom", "P_inCod")
                    ''UtilitarioWeb.Dataddl(ddlOrganizacion, Organizacion.ListarOrganizacion(-1, "<Todos>"), "vcNomOrg", "vcCodInt")
                    'UtilitarioWeb.Dataddl(ddlCentroCosto, CentCost.ListarCentroCosto(-1, "<Todos>"), "vcNomCenCos", "P_vcCodCenCos")
                    'UtilitarioWeb.Dataddl(ddlSucursal, Sucu.ListarSucursal(-1, "<Todos>"), "vcNom", "P_vcCod")
                    'UtilitarioWeb.Dataddl(ddlModelo, Modelo.Listar(-1, "<Todos>"), "vcNom", "P_inCod")
                    'UtilitarioWeb.Dataddl(ddlTipoLinea, LineaTipo.ListarLineatipo(-1, "<Todos>"), "vcDescripcion", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlUsuario, Solicitud.ListarEmpleadoConSolicitudes(), "Nombre", "Codigo")

                    'OBTENEMOS EL TIPO DE LINEA QUE EL USUARIO TIENE ACCESO---------------------------------------------------------------------------------------------------------------------------------
                    Dim vcPerfiles As String = String.Empty
                    For p As Integer = 0 To oUsuario.Perfiles.Count - 1
                        If (vcPerfiles = "") Then
                            If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
                                vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                            End If
                        Else
                            If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                            End If
                        End If
                    Next
                    '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
                        hdfOpcionPrincipal.Value = 0
                    ElseIf vcPerfiles <> "" Then
                        hdfOpcionPrincipal.Value = vcPerfiles
                    End If

                    For i As Integer = 0 To oUsuario.TipoSolicitudAprobacion.Count - 1
                        ddlTipoSolicitud.Items.Add(New ListItem(oUsuario.TipoSolicitudAprobacion(i).vcNomTipSol, oUsuario.TipoSolicitudAprobacion(i).inCodTipSol))
                    Next


                    Dim dtEstados As DataTable = Estado.ListarPorModulo(2, 3)
                    Estado.Dispose()
                    For i As Integer = 0 To dtEstados.Rows.Count - 1
                        If dtEstados.Rows(i)("inMod").ToString() = "3" Then
                            ddlEstadoProceso.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                        Else
                            ddlEstadoAprobacion.Items.Add(New ListItem(dtEstados.Rows(i)("vcNom"), dtEstados.Rows(i)("P_inCod")))
                        End If
                    Next
                End If

                Dim vcFechaActual As String = UtilitarioWeb.ObtieneFechaHoraANSIServidor(False)
                Dim inAnio As Integer = vcFechaActual.Substring(0, 4)
                Dim inMes As Integer = vcFechaActual.Substring(4, 2)
                Dim inDia As Integer = vcFechaActual.Substring(6, 2)
                Dim daFechaIni As New DateTime(inAnio, inMes, inDia)

                hdfdaFechaIni.Value = daFechaIni.AddMonths(-1).ToString("dd/MM/yyyy")
                hdfdaFechaFin.Value = DevuelveFechaFormateada(vcFechaActual, "dd/MM/yyyy")

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Grupo IsNot Nothing Then Grupo.Dispose()
            If CentCost IsNot Nothing Then Grupo.Dispose()
            If Sucu IsNot Nothing Then Grupo.Dispose()
            If Orga IsNot Nothing Then Grupo.Dispose()
            If Modelo IsNot Nothing Then Modelo.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerGrupoEmpleadoTipo(ByVal idLineatipo As String) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
            If IsNumeric(idLineatipo) Then
                Dim dt As DataTable = LineaTipo.ListarGrupoEmpleado_LineaTipo(idLineatipo)
                If dt.Rows.Count > 0 Then
                    For x As Integer = 0 To dt.Rows.Count - 1
                        listaValores.Add(dt.Rows(x)("GROR_vcNOMGRU").ToString())
                    Next
                End If
            End If

            Return listaValores

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
        End Try
    End Function
    <WebMethod()>
    Public Shared Function ObtenerListaGrupoEmpleado() As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim GrupoEmp As BL_GEN_GrupoOrigen = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            GrupoEmp = New BL_GEN_GrupoOrigen(oUsuario.IdCliente)

            Dim dt As DataTable = GrupoEmp.ListarGrupoEmpleados()
            If dt.Rows.Count > 0 Then
                For x As Integer = 0 To dt.Rows.Count - 1
                    listaValores.Add(dt.Rows(x)("GROR_vcNOMGRU").ToString())
                Next
            End If

            Return listaValores

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If GrupoEmp IsNot Nothing Then GrupoEmp.Dispose()
        End Try
    End Function
End Class