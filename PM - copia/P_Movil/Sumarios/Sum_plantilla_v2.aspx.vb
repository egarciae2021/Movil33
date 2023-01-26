Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Consulta.BE

Partial Class P_Movil_Sumarios_Sum_plantilla_v2
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_Sumarios_Sum_plantilla_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim blTipoServicio As BL_GEN_TipoServicio = Nothing
        Dim servicio As BL_HIS_Generico = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
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
                    'hdfTipoSumario.Value = "M_EMPL"
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



                    'Dim listaFechas As New List(Of String)
                    For index = 0 To 11
                        Dim mes As Date = Date.Now.AddMonths(-index)
                        Select Case mes.Month
                            Case 1
                                ddlMes.Items.Add(New ListItem("Ene/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 2
                                ddlMes.Items.Add(New ListItem("Feb/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 3
                                ddlMes.Items.Add(New ListItem("Mar/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 4
                                ddlMes.Items.Add(New ListItem("Abr/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 5
                                ddlMes.Items.Add(New ListItem("May/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 6
                                ddlMes.Items.Add(New ListItem("Jun/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 7
                                ddlMes.Items.Add(New ListItem("Jul/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 8
                                ddlMes.Items.Add(New ListItem("Ago/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 9
                                ddlMes.Items.Add(New ListItem("Sep/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 10
                                ddlMes.Items.Add(New ListItem("Oct/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case 11
                                ddlMes.Items.Add(New ListItem("Nov/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                            Case Else
                                ddlMes.Items.Add(New ListItem("Dic/" + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                                Exit Select
                        End Select
                    Next

                    ddlMes.SelectedValue = DateTime.Now.AddMonths(-1).ToString("MMyy")

                    servicio = New BL_HIS_Generico(oUsuario.IdCliente)
                    Dim ListaServicioDatos As List(Of ENT_ServicioHis) = servicio.obtenerServiciosPorTipoServicio(17)
                    Dim ListaServicioMensajes As List(Of ENT_ServicioHis) = servicio.obtenerServiciosPorTipoServicio(18)

                    blTipoServicio = New BL_GEN_TipoServicio(oUsuario.IdCliente)
                    Dim js As New JavaScriptSerializer()
                    Dim script As String = "var misTiposServicios = " + js.Serialize(blTipoServicio.ListarParaDash()) + ";"
                    script = script + "var MisServiciosDatos = " + js.Serialize(ListaServicioDatos) + ";"
                    script = script + " var MisServiciosMensajes = " + js.Serialize(ListaServicioMensajes) + ";"

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blTipoServicio IsNot Nothing Then blTipoServicio.Dispose()
            If servicio IsNot Nothing Then servicio.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function obtenerSumario(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String _
                                  , ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String,
                                  ByVal prNombreSumario As String, ByVal prAnd As String, ByVal prFiltro As String _
                                  , ByVal prTablaConsulta As String, ByVal prP_Codigo As String, ByVal prF_Codigo As String _
                                  , ByVal prP_Desc As String, prF_Desc As String _
                                  , ByVal prServicioTap As String, ByVal prTipoFuente As String, ByVal prServicioValue As String _
                                  , ByVal prIdTipoServicio As Integer, ByVal prFormatoDuracion As Integer, ByVal inTipLin As String) As List(Of String)
        Dim sumario As BL_Sumario = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            sumario = New BL_Sumario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim CodigoEmpleado As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod

            Dim oMostrarSumario As New Ent_MostrarSumario()
            oMostrarSumario.Nomtabla = prNomtabla
            oMostrarSumario.Tipo = prTipo
            oMostrarSumario.TipoConsulta = prTipoConsulta.Replace("|", "'")
            oMostrarSumario.Top = prTop
            oMostrarSumario.Nivel = prNivel
            oMostrarSumario.Periodo = prPeriodo
            oMostrarSumario.Servicio = prServicio
            oMostrarSumario.DescTipo = prDescTipo
            oMostrarSumario.NombreSumario = prNombreSumario
            oMostrarSumario.And = prAnd.Replace("|", "'")
            oMostrarSumario.VcCodInt = vcCodInt
            oMostrarSumario.VcFiltro = prFiltro
            'PARAMETROS DE SERVICIOS
            oMostrarSumario.TablaConsulta = prTablaConsulta
            oMostrarSumario.P_Codigo = prP_Codigo
            oMostrarSumario.F_Codigo = prF_Codigo
            oMostrarSumario.P_Desc = prP_Desc
            oMostrarSumario.F_Desc = prF_Desc
            oMostrarSumario.CodigoSucursal = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodSuc
            oMostrarSumario.ServicioTap = prServicioTap
            oMostrarSumario.TipoFuente = prTipoFuente
            oMostrarSumario.ServicioValue = prServicioValue
            oMostrarSumario.inTipoLinea = Integer.Parse(inTipLin)
            oMostrarSumario.CodigoEmpleado = CodigoEmpleado
            oMostrarSumario.IdTipoServicio = prIdTipoServicio

            'Return sumario.obtenerSumario(prNomtabla, prTipo, prTipoConsulta.Replace("|", "'"), prTop, prNivel, prPeriodo, prServicio, prDescTipo, prNombreSumario, prAnd.Replace("|", "'"), vcCodInt, prFiltro, oCultura)

            Return sumario.obtenerSumario(oMostrarSumario, oCultura, prFormatoDuracion)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If sumario IsNot Nothing Then sumario.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerSumarioDash(ByVal prNomtabla As String, ByVal prTipo As String, ByVal prTipoConsulta As String, ByVal prTop As String _
                                  , ByVal prNivel As String, ByVal prPeriodo As String, ByVal prServicio As String, ByVal prDescTipo As String,
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
    Public Shared Function obtenerServiciosPorTipoServicio(ByVal prIdTipoServicio As Integer) As List(Of ENT_ServicioHis)

        Dim historico As BL_HIS_Generico = Nothing
        Try
            'Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            historico = New BL_HIS_Generico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return historico.obtenerServiciosPorTipoServicio(prIdTipoServicio)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If historico IsNot Nothing Then historico.Dispose()
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


End Class
