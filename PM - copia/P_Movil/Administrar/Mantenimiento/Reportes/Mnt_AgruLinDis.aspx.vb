Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Consulta.BE
Imports VisualSoft.PCSistelMovil.Importacion.BL

'MPAJUELO_20161026_SUMARIO_ENTEL
Partial Class P_Movil_Administrar_Mantenimiento_Reportes_Mnt_AgruLinDis
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_Administrar_Mantenimiento_Reportes_Mnt_AgruLinDis_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"

                    hdfTipoSumario.Value = Request.QueryString("TipoSumario")
                    hdf_P_Codigo.Value = Request.QueryString("p_codigo")
                    hdf_F_Codigo.Value = Request.QueryString("f_codigo")
                    hdf_Desc.Value = Request.QueryString("desc")
                    hdf_F_Desc.Value = Request.QueryString("f_desc")
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
                    Dim oNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()
                    Nivel.Dispose()

                    'Código que controla los acceso del usuario por Organizacion...
                    Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
                    If vcCodInt.Length > 3 Then oNivel.Remove(oNivel.Item(0))
                    Dim inNivel As Integer = vcCodInt.Length / 3
                    Dim oUltimoNivel As New ENT_GEN_Nivel
                    For x As Byte = 2 To inNivel
                        If x = inNivel Then oUltimoNivel = oNivel.Item(0)
                        oNivel.Remove(oNivel.Item(0))
                    Next
                    If oNivel.Count = 0 Then oNivel.Add(oUltimoNivel)

                    ddlNivel.DataTextField = "vcNomNiv"
                    ddlNivel.DataValueField = "P_inCodNiv"
                    ddlNivel.DataSource = oNivel
                    ddlNivel.DataBind()
                    If Len(vcCodInt) = 3 Or vcCodInt = "" Then
                        If ddlNivel.Items.Count > 1 Then
                            ddlNivel.SelectedIndex = 1
                        Else
                            ddlNivel.SelectedIndex = 0
                        End If
                    End If



                    Dim ReporteOrganizacional As BL_GEN_ReporteOrganizacional = Nothing
                    Try
                        ReporteOrganizacional = New BL_GEN_ReporteOrganizacional(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim dsDatos As DataSet = ReporteOrganizacional.ListarAgrupadoEstados()

                        ddlEstadoLinea.DataValueField = "CodEstadoLinea"
                        ddlEstadoLinea.DataTextField = "NomEstadoLinea"
                        ddlEstadoLinea.DataSource = dsDatos.Tables(0)
                        ddlEstadoLinea.DataBind()

                        ddlEstadoDispositivo.DataValueField = "CodEstadoDispositivo"
                        ddlEstadoDispositivo.DataTextField = "NomEstadoDispositivo"
                        ddlEstadoDispositivo.DataSource = dsDatos.Tables(1)
                        ddlEstadoDispositivo.DataBind()


                    Catch ex As Exception
                        Dim util As New Utilitarios
                        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                        Throw New Exception(UtilitarioWeb.MensajeError)
                    Finally
                        If ReporteOrganizacional IsNot Nothing Then ReporteOrganizacional.Dispose()
                    End Try




                End If


                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerDatos(ByVal prTipoAgrupacion As String, ByVal prNivel As String,
                                        ByVal prTop As String, ByVal prCampoTipo As String, ByVal prFiltro As String) As List(Of String)
        Dim ReporteOrganizacional As BL_GEN_ReporteOrganizacional = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            ReporteOrganizacional = New BL_GEN_ReporteOrganizacional(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return ReporteOrganizacional.ListarAgrupadoLineaDispositivo(prNivel, prTop, prTipoAgrupacion, prCampoTipo, prFiltro, oCultura)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If ReporteOrganizacional IsNot Nothing Then ReporteOrganizacional.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerSumarioDash(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String _
                                  , ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String, _
                                  ByVal prNombreSumario As String, ByVal prAnd As String) As List(Of String)
        Dim sumario As BL_Sumario = Nothing
        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return sumario.obtenerSumarioDash(prNomtabla, prTipo, prTipoConsulta.Replace("|", "'"), prTop, prNivel, prPeriodo, prServicio, prDescTipo, prNombreSumario, prAnd.Replace("|", "'"), vcCodInt)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerConceptosPorGrupo(ByVal prIdTipoGrupo As Integer) As List(Of ENT_PCS_MOV_ServicioResumen) 'obtenerServiciosPorTipoServicio

        Dim Facturacion As BL_MOV_IMP_Facturacion = Nothing
        Try
            'Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Facturacion.ObtieneServicioResumenPorGrupo(prIdTipoGrupo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Facturacion IsNot Nothing Then Facturacion.Dispose()
        End Try
    End Function

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = ""
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
            vcPerfil = "0"
        ElseIf vcPerfiles <> "" Then
            vcPerfil = vcPerfiles.ToString()
        End If

        Return vcPerfil

    End Function


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

    End Sub
End Class
