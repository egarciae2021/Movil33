Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Configuracion_General_MisDatos
    Inherits System.Web.UI.Page

    Protected Sub P_Configuracion_General_MisDatos_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim DASH_Dashboard As BL_DASH_Dashboard = Nothing
        Dim oBL_SEG_Usuario As BL_SEG_Usuario = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else
            Try
                infoLinea.Mensaje = "Debe considerar : " +
                                    "como mínimo 6 dígitos, " +
                                    "estar compuesta por números y letras, " +
                                    "no puede empezar con el nombre de usuario y " +
                                    "que sea diferente a las 3 últimas registradas."


                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

                    Dim P_inCod As String = oUsuario.P_inCod

                    oBL_SEG_Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)
                    Dim objEntidad As ENT_SEG_Usuario = oBL_SEG_Usuario.Mostrar(P_inCod)

                    'agregado 13-08-2015 wapumayta
                    Dim Dominio As String = String.Empty
                    If Not IsNothing(HttpContext.Current.Session("IdDominio")) Then
                        Dominio = HttpContext.Current.Session("IdDominio").ToString()
                    End If
                    imgUsuario.ImageUrl = Page.ResolveClientUrl("~/Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" & objEntidad.P_inCod & "&Dominio=" & Dominio) 'modificado 23-09-2013 wapumayta

                    txtvcNom.Text = objEntidad.vcNom
                    txtvcUsu.Text = objEntidad.vcUsu
                    txtvcPas.Text = objEntidad.vcPas
                    txtvcPasCon.Text = objEntidad.vcPas

                    hdfEsClaveSegura.Value = oUsuario.EsClaveSegura

                    txtvcPas.Attributes("Value") = txtvcPas.Text
                    txtvcPasCon.Attributes("Value") = txtvcPas.Text
                    Page.ClientScript.RegisterStartupScript(Me.GetType(), _
                                                            "cargarGrilla", _
                                                            "$(function () {themeName = '" & oUsuario.CaracteristicaUsuario.vcTem & "'; themeNameOrigen=themeName; });", _
                                                            True)

                    Dim vcExcelPorDefecto As String = oUsuario.CaracteristicaUsuario.vcExcelPorDefecto
                    ddlExcelPorDefecto.SelectedValue = vcExcelPorDefecto

                    Dim dashboards As New List(Of ENT_DASH_Dashboard)

                    DASH_Dashboard = New BL_DASH_Dashboard(oUsuario.IdCliente)
                    dashboards = DASH_Dashboard.listarDashboard(P_inCod)

                    Dim js As New JavaScriptSerializer()
                    Dim script As String = "var misDashBoards = " + js.Serialize(dashboards) + ";"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                    'ocultar contenero TEMAS para el modo cloud
                    'If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then ' AndAlso (oUsuario.Empleado.Licencia = "BASIC" Or oUsuario.Empleado.Licencia = "STANDARD") Then
                    '    AccordionJQ1.ContenedoresAccodion(2).Visible = False
                    'End If
                End If
                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            Catch ex As Exception
                Throw ex
            Finally
                If DASH_Dashboard IsNot Nothing Then DASH_Dashboard.Dispose()
                If oBL_SEG_Usuario IsNot Nothing Then oBL_SEG_Usuario.Dispose()
            End Try
        End If
    End Sub

    ' ==============================================================================================================
    ' MODULO DE SEGURIDAD
    ' ==============================================================================================================
    <WebMethod()>
    Public Shared Function GuardarMisDatos(ByVal Tema As String, _
                                          ByVal vcNom As String, _
                                          ByVal vcPas As String, _
                                          ByVal prIdDashboard As Integer, _
                                          ByVal vcExcelPorDefecto As String) As String

        ' =========================================================================================================================================
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim dash As BL_DASH_Dashboard = Nothing
        ' =========================================================================================================================================
        Try

            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            ' =========================================================================================================================================
            Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)
            dash = New BL_DASH_Dashboard(oUsuario.IdCliente)
            ' =========================================================================================================================================
            Dim i As Integer = Tema.LastIndexOf("/")
            ' =========================================================================================================================================
            If i > 0 Then
                Tema = Tema.Substring(i + 1, Tema.Length - (i + 1))
            End If
            ' =========================================================================================================================================
            Usuario.ActualizarTema(Tema, oUsuario.P_inCod, vcExcelPorDefecto)
            dash.GuardarDash(oUsuario.P_inCod, prIdDashboard)

            oUsuario.CaracteristicaUsuario.vcTem = Tema
            oUsuario.CaracteristicaUsuario.vcExcelPorDefecto = vcExcelPorDefecto

            oUsuario.vcNom = vcNom
            oUsuario.vcPas = vcPas

            ' =========================================================================================================================================
            HttpContext.Current.Session("Usuario") = oUsuario
            ' =========================================================================================================================================

            ' =========================================================================================================================================
            Return Usuario.Grabar(oUsuario)
            ' =========================================================================================================================================

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Usuario IsNot Nothing Then Usuario.Dispose()
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function


End Class
