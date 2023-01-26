Imports System.Drawing
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.LibreriaJQ
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports UtilitarioWeb
Imports System.Web.Configuration
Imports VisualSoft.PCSistelMovil.ConfigDom.BL
Imports VisualSoft.PCSistel.Utilitarios
Imports BLL
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Net
Imports System.Security.Cryptography
Imports VisualSoft.Comun


Partial Class Site_PS8
    Inherits System.Web.UI.MasterPage

    'RURBINA 201904
    Private Sub Page_Init(sender As Object, e As EventArgs) Handles Me.Init
        'Dim strCadenaConexion As String = Util.ArchivoConfiguracion.ObtenerValorConfiguracion(Server.MapPath("~/web.config"), "accesoSQL")
        'If String.IsNullOrEmpty(strCadenaConexion) Then
        '    If HttpContext.Current.Request.IsLocal Then
        '        Response.Redirect("Configuracion.aspx")

        '    End If
        'Else
        '    strCadenaConexion = Cryptographics.DecryptString(strCadenaConexion)
        '    If Util.ArchivoConfiguracion.VerificaConexionBD(strCadenaConexion) Then

        '    End If
        'End If


        hdfError.Value = ""
        hdfMensaje.Value = ""
        Return


        If ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then
            Dim CantidadSQLo As BL_MOV_Linea = Nothing
            Dim oModuloSQL As BL_LIC_UsuariosModulos = Nothing
            Try
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                CantidadSQLo = New BL_MOV_Linea(oUsuario.IdCliente)
                oModuloSQL = New BL_LIC_UsuariosModulos(oUsuario.IdCliente)
                Dim keySQL As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(1)
                Dim keyConfig As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtenerKeyServidor()
                'Dim keyConfig As String = Cryptographics.EncryptString(oModuloSQL.ObtenerKeyServidor().Rows(0)(0).ToString())
                Dim TipoExt As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(3)
                Dim CantidadLineas As Integer = Convert.ToInt32(Base64Decode(CantidadSQLo.ListarCantidadLineas().Rows(0)(0)))
                Dim CantidadDispositivos As Integer = Convert.ToInt32(Base64Decode(CantidadSQLo.ListarCantidadDispositivos().Rows(0)(0)))
                Dim Cantidad As Integer = Convert.ToInt32(Cryptographics.DecryptString(IIf(UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(2) = "", 0, UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(2))))
                Dim CantidadAccess As Integer = 0
                Dim ComparadorCantidad As Integer = 0
                Dim KeyPC As String = oModuloSQL.Mensajes_Login().Rows(0)(3).ToString()
                Dim Texto As String = "" : Dim Mensaje As String = ""

                If keyConfig = KeyPC Then
                    If Cantidad = 0 Then
                        Texto = ""
                    Else
                        CantidadAccess = Convert.ToInt32(Cryptographics.DecryptString(CantidadSQLo.CompararCantidad(Cryptographics.EncryptString(Cantidad), TipoExt).Rows(0)(0)))
                        If TipoExt = "61dTbSDAcHMA" Then
                            ComparadorCantidad = CantidadLineas
                            Texto = "Ha alcanzado el número maximo de líneas permitidas, comuniquese con su proveedor para más información."
                        ElseIf TipoExt = "aOclIJvM+HIA" Then
                            ComparadorCantidad = CantidadDispositivos
                            Texto = "Ha alcanzado el número maximo de dispositivos permitidas, comuniquese con su proveedor para más información."
                        End If
                    End If

                    hdfMensaje.Value = ""

                    If (ComparadorCantidad <= CantidadAccess) Then
                        hdfError.Value = ""
                        hdfMensaje.Value = ""
                    Else
                        hdfMensaje.Value = Texto
                    End If

                    If KeyPC <> keyConfig Then
                        hdfError.Value = "Usuario registrado no existe, pongase en contácto con su proveedor, comuniquese con su proveedor para más información."
                    End If

                Else
                    hdfError.Value = "Identificación de posibles problemas de licencias, comuniquese con su proveedor para más información."
                    hdfError.Value = ""
                End If

            Catch ex As Exception
                Try
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                Catch exC As Exception
                End Try
            Finally
                If CantidadSQLo IsNot Nothing Then CantidadSQLo.Dispose()
                If oModuloSQL IsNot Nothing Then oModuloSQL.Dispose()
            End Try
        End If
    End Sub

    Public Shared Function Base64Decode(base64EncodedData As String) As String
        Dim LongitudCodigo As Int16 = 0
        Dim base64EncodedBytes As Byte() = Nothing
        Try
            LongitudCodigo = Convert.ToInt16(base64EncodedData.Substring(10, 1))
            base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData.Substring(11, LongitudCodigo))
        Catch ex As Exception
            Try
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            Catch exC As Exception
            End Try
        End Try
        Return System.Text.Encoding.UTF8.GetString(base64EncodedBytes)
    End Function
    Public Function getIp() As String
        Dim valorIp As String
        valorIp = Dns.GetHostEntry(My.Computer.Name).AddressList.FirstOrDefault(Function(i) i.AddressFamily = Sockets.AddressFamily.InterNetwork).ToString()
        Return valorIp
    End Function


    ' ========================================================================================================
    ' LOAD 
    ' ========================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Producto As BL_PRO_Producto = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim Dashboard As BL_DASH_Dashboard = Nothing
        Dim Alertas As BL_Alerta = Nothing
        'Dim Concilia As BL_MOV_Concilia = Nothing
        Dim Cola As BL_MOV_IMP_Cola = Nothing
        Dim oCantidadSQL As BL_MOV_Linea = Nothing

        If IsNothing(Session("Usuario")) Then
            Response.Redirect("login.aspx")
        End If

        Try
            hfModoCloud.Value = "" & ConfigurationManager.AppSettings("ModoCloud").ToString()
            hdfEsEstandar.Value = "" & ConfigurationManager.AppSettings("EsProductoEstandar").ToString()
            Try
                Dim MostrarChatTawkTo As String = If(ConfigurationManager.AppSettings("MostrarChatTawkTo") IsNot Nothing, ConfigurationManager.AppSettings("MostrarChatTawkTo").ToString(), "0").ToString()
                hdfMostrarChatTawkTo.Value = MostrarChatTawkTo
            Catch ex As Exception
                hdfMostrarChatTawkTo.Value = "0"
            End Try


            If IsNothing(Session("Usuario")) Then
                If ConfigurationManager.AppSettings("ModoCloud").ToString() = "1" Then
                    Dim miUrl As String
                    Using blConfiguracion As New BL_ConfigDom_Configuracion()
                        miUrl = blConfiguracion.ObtenerConfiguracionSistemaByKey("LoginPortal")
                    End Using
                    Response.Redirect(miUrl)
                    Me.hdfCodigoDominio.Value = String.Empty
                Else
                    Response.Redirect("login.aspx")
                    hdfCodigoDominio.Value = String.Empty
                End If
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If Not IsPostBack Then

                    Dim RutaArchivoSignalR As String = ConfigurationManager.AppSettings("pathSignalRPCSistel")
                    If Not RutaArchivoSignalR.EndsWith("\") Then RutaArchivoSignalR &= "\"
                    hfpathSignalRPCSistel.Value = RutaArchivoSignalR

                    Dim NombreProducto As String = "" & ConfigurationManager.AppSettings("TituloLogoCliente")
                    'Dim NombreProductoRelease As String = "" & ConfigurationManager.AppSettings("NombreProducto") & " " & ConfigurationManager.AppSettings("ReleaseProducto")
                    Dim NombreProductoRelease As String = "" & ConfigurationManager.AppSettings("ReleaseProducto")
                    If NombreProducto = "" Then NombreProducto = "PCSistel Móvil 3.3"
                    If NombreProductoRelease = "" Then NombreProductoRelease = NombreProducto
                    lblNombreProducto.InnerHtml = NombreProducto
                    lblNombreProductoRelease.Text = NombreProductoRelease

                    Dim NombreEmpresa As String = "" & ConfigurationManager.AppSettings("NombreEmpresa")
                    Dim MarcaEmpresa As String = "" & ConfigurationManager.AppSettings("MarcaEmpresa")
                    If NombreEmpresa = "" Then NombreEmpresa = "VisualSoft S.A.C."
                    If MarcaEmpresa = "" Then MarcaEmpresa = "PCSISTEL"
                    'pCliente.InnerHtml = "© " & DateTime.Now.Year.ToString() & " " & NombreEmpresa
                    pCliente.InnerHtml = MarcaEmpresa & " © " & NombreEmpresa

                    'If NombreProducto = "" Then
                    '    Me.Page.Title = "PCSistel Móvil 3.3"
                    'Else
                    '    Me.Page.Title = NombreProducto
                    'End If

                    Session("ModuloOpcion") = "pcsistel" 'Utilizado en el proceso de sincronización para organización. Este valor debe asignarse como pcsistel

                    hfIdUsuario.Value = oUsuario.P_inCod
                    hfNombreUsuario.Value = oUsuario.vcUsu
                    hfDescripcionUsuario.Value = oUsuario.vcNom
                    hfCodEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hfEsResponsableTI.Value = "0"


                    hdfPeriodoConciliacion.Value = ""
                    Cola = New BL_MOV_IMP_Cola(oUsuario.IdCliente)
                    hdfPeriodoConciliacion.Value = Cola.ObtenerValidacionConciliacion_Periodo()

                    For Each mPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                        If mPerfil.vcNom = "Responsable de TI" Then
                            hfEsResponsableTI.Value = "1"
                            Exit For
                        End If
                    Next

                    'Session("IdDominio") = "14100"
                    Me.hdfCodigoDominio.Value = Session("IdDominio").ToString()

                    hfTipoUsuario.Value = "usuario"
                    If Seguridad.EsAdministrador() Then
                        hfTipoUsuario.Value = "administrador"
                        ''xChatImgUsuario.Visible = True
                    Else
                        ''xChatImgUsuario.Visible = False
                    End If

                    If Seguridad.EsBASIC_BOLSA Then
                        hdfEsAdministradorBolsaBasic.Value = "1"
                    Else
                        hdfEsAdministradorBolsaBasic.Value = "0"
                    End If

                    ''xChatImgUsuario.Visible = False

                    Dim script As String = ""
                    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                    Dim jsonString As String = New JavaScriptSerializer().Serialize(oCultura)
                    script &= "var oCulturaUsuario_String = " & jsonString & ";"

                    Dim RaizSistema_String As String = Utilitario.ObtieneRaizSistema
                    If Microsoft.VisualBasic.Right(RaizSistema_String.Trim, 1) <> "/" Then RaizSistema_String &= "/"
                    script &= "var RaizSistema_String = '" & RaizSistema_String & "';"
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "Script_Cultura", script, True)

                    script = ""
                    Producto = New BL_PRO_Producto(oUsuario.IdCliente)
                    Usuario = New BL_SEG_Usuario(oUsuario.IdCliente)
                    Try
                        oUsuario.inCodReg = oUsuario.Regiones(0).P_inCodReg 'Esta region se obtendra de la pagina de regiones
                    Catch ex As Exception
                        oUsuario.inCodReg = 0
                    End Try

                    ''oUsuario.CaracteristicaUsuario = Usuario.CaracteristicaUsuario(oUsuario)

                    hdfCodEnlace.Value = oUsuario.Empleado.P_vcCod
                    hfTema.Value = oUsuario.CaracteristicaUsuario.vcTem
                    'hfTemaPrincipal.Value = oUsuario.CaracteristicaUsuario.vcTemPrincipal
                    'para validar el tipo de tema  del entorno.  ----JPareja
                    If oUsuario.CaracteristicaUsuario IsNot Nothing Then
                        If (oUsuario.CaracteristicaUsuario.vcTemPrincipal = "redmond") And (oUsuario.CaracteristicaUsuario.vcTem = "redmond") Then
                            hfTemaPrincipal.Value = "theme-navy"
                        ElseIf (oUsuario.CaracteristicaUsuario.vcTemPrincipal = "redmond") And Not (oUsuario.CaracteristicaUsuario.vcTem = "redmond") Then
                            hfTemaPrincipal.Value = oUsuario.CaracteristicaUsuario.vcTem
                        ElseIf Not (oUsuario.CaracteristicaUsuario.vcTemPrincipal = "redmond") And (oUsuario.CaracteristicaUsuario.vcTem = "redmond") Then
                            hfTemaPrincipal.Value = oUsuario.CaracteristicaUsuario.vcTemPrincipal
                        Else
                            If oUsuario.CaracteristicaUsuario.vcTem Is "redmond" Then
                                hfTemaPrincipal.Value = oUsuario.CaracteristicaUsuario.vcTemPrincipal
                            Else
                                hfTemaPrincipal.Value = oUsuario.CaracteristicaUsuario.vcTem
                            End If
                        End If

                    Else
                        hfTemaPrincipal.Value = "theme-navy"
                    End If
                    'end

                    Dim dtProducto As DataTable
                    dtProducto = Producto.ListarDT(oUsuario)

                    hfMenus.Value = Producto.ObtenerMenus(oUsuario.P_inCod)

                    If dtProducto IsNot Nothing AndAlso dtProducto.Rows.Count > 0 Then
                        hdf_IdProductoDefault.Value = dtProducto.Rows(0)("P_inCod")
                    End If

                    ''WebTab_DataBinding(Producto.Listar(oUsuario), Modulo.Listar(oUsuario), Opcion.Listar(oUsuario), Item.Listar(oUsuario), oUsuario.P_inCod)

                    lblNombreUsuario.Text = oUsuario.vcNom
                    lblNombreUsuario.ToolTip = oUsuario.vcUsu

                    lblCorreoUsuario.Text = oUsuario.Mail

                    Dim vcFilaTitulo = "<tr><td style='font-weight: 600;'>Último acceso</td></tr>"
                    lblAcceso.Text = "<div id='dvItentos'> <table border ='0' > <tr> <td> <div id='dvTimer'></div> </td> <td style='width:50px;'></td> <td>  <table id='miTablaSeguridad' class='ui-datepicker-title' border='0' cellpadding='0' cellspacing='0' style= 'z-index:-1;' >" + vcFilaTitulo + "<tr><td>" & oUsuario.dtFecUltAcceso & "</td></tr>"
                    If oUsuario.inIntentos > 0 Then
                        lblAcceso.Text &= "<tr><td>Intentos err&oacute;neos: " & oUsuario.inIntentos.ToString() & "</td></tr>"
                    End If
                    ''lblAcceso.Text &= "</table><div style='clear:both;'></div><div id='dvTimer'></div>"
                    lblAcceso.Text &= "</table>   </ td>  </tr> </table>  </div> "

                    Dim Dominio As String = String.Empty
                    If Not IsNothing(Session("IdDominio")) Then Dominio = Session("IdDominio").ToString()
                    imgUsuario.ImageUrl = Page.ResolveClientUrl("~/Common/Controladores/ImagenDinamica.ashx?Tipo=Usuario&IdUsuario=" & oUsuario.P_inCod & "&Dominio=" & Dominio) 'modificado 23-09-2013 wapumayta


                    Dim Regi As BL_GEN_Regi = New BL_GEN_Regi(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oRegi As ENT_GEN_Regi = Regi.Listar()
                    Regi.Dispose()
                    If oRegi.REGI_btMostrarLogoEnCabecera Then
                        LogoProducto.Visible = False
                        LogoCliente.ImageUrl = "~/Common/Controladores/ImagenDinamica.ashx?Tipo=Cliente&Dominio=" & Dominio
                        LogoCliente.Visible = True

                        LogoCliente2.ImageUrl = "~/Common/Controladores/ImagenDinamica.ashx?Tipo=Cliente&Dominio=" & Dominio
                        LogoCliente2.Visible = True
                        LogoCliente2.Height = 56
                        LogoCliente2.Width = 200

                        ''btnToggle.Visible = False
                    Else
                        LogoCliente.Visible = False
                        LogoProducto.Visible = True


                        If NombreProducto = "Claro" Then
                            LogoCliente2.ImageUrl = "~/content/img/logoclaro.png"
                        Else
                            LogoCliente2.ImageUrl = "~/content/img/logo.png"
                        End If


                        If NombreProducto = "Claro" Then
                            logonavbar.Src = "~/content/img/logoclaro.png"
                        Else
                            logonavbar.Src = "~/content/img/logo.png"
                        End If


                        LogoCliente2.Visible = True

                        btnToggle.Visible = True
                    End If

                    ''Dim Autenticacion As Integer = VisualSoft.Comun.Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))
                    ''If Autenticacion = 1 Then 'Autenticacion de windows
                    ''    loginEstado.Visible = False
                    ''    tdLoginEstado.Visible = False
                    ''End If

                    Dashboard = New BL_DASH_Dashboard(oUsuario.IdCliente)

                    Dim nomberDash As String = String.Empty
                    For Each dash As ENT_DASH_Dashboard In Dashboard.listarDashboard(oUsuario.P_inCod)
                        If dash.Elegido Then
                            nomberDash = dash.Nombre
                            Exit For
                        End If
                    Next

                    If nomberDash.Equals(String.Empty) Then
                        nomberDash = "Dashboard Móvil"
                    End If

                    Me.hdfNombreDash.Value = nomberDash

                    script = "var idCliente = " & oUsuario.IdCliente.ToString() & "; "

                    Dim js As New JavaScriptSerializer()
                    Alertas = New BL_Alerta(oUsuario.IdCliente)

                    Dim vcTipSolTec As String = String.Empty
                    vcTipSolTec = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)


                    Dim vcCodIntResp As String = ""
                    If oUsuario.CodIntResp = "" And Seguridad.EsAdministrador Then vcCodIntResp = "000" Else vcCodIntResp = oUsuario.CodIntResp

                    Dim vcTipSolTecTod As String = "0"
                    vcTipSolTecTod = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)

                    Dim vcGrupLee As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudGrupo(1)

                    '-----
                    'RURBINA 201704

                    oCantidadSQL = New BL_MOV_Linea(oUsuario.IdCliente)

                    Dim TipoExt As String = UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(3)
                    Dim CantidadLineas As Integer = 0
                    Try
                        CantidadLineas = Convert.ToInt32(Base64Decode(oCantidadSQL.ListarCantidadLineas().Rows(0)(0)))
                    Catch ex As Exception
                        CantidadLineas = 0
                    End Try
                    Dim CantidadDispositivos As Integer = 0
                    Try
                        CantidadDispositivos = Convert.ToInt32(Base64Decode(oCantidadSQL.ListarCantidadDispositivos().Rows(0)(0)))
                    Catch ex As Exception
                        CantidadDispositivos = 0
                    End Try

                    Dim CantidadModulo As Integer = 0
                    Try
                        CantidadModulo = Convert.ToInt32(Cryptographics.DecryptString(UtilitarioWeb.LicenciaUsuarioModulos.ObtieneLicencia(2)))
                    Catch ex As Exception
                        CantidadModulo = 0
                    End Try
                    Dim ComparadorCantidad As Integer = 0
                    Dim Texto As String = ""

                    If CantidadModulo <> 0 Then
                        Dim CantidadAccess As Integer = Convert.ToInt32(Cryptographics.DecryptString(oCantidadSQL.CompararCantidad(Cryptographics.EncryptString(CantidadModulo), TipoExt).Rows(0)(0)))

                        Dim plural As String = "" : Dim singular As String = ""

                        If TipoExt = "61dTbSDAcHMA" Then
                            If (CantidadAccess - CantidadLineas) > 1 Then
                                plural = "líneas"
                                singular = "quedan"
                            Else
                                plural = "línea"
                                singular = "queda"
                            End If
                            Texto = "Le " + singular + " " + (CantidadAccess - CantidadLineas).ToString() + " " + plural + " según su licencia, comuniquese con su proveedor para más información."
                            ComparadorCantidad = CantidadAccess - CantidadLineas
                        ElseIf TipoExt = "aOclIJvM+HIA" Then
                            If (CantidadAccess - CantidadDispositivos) > 1 Then
                                plural = "dispositivos"
                                singular = "quedan"
                            Else
                                plural = "dispositivo"
                                singular = "queda"
                            End If
                            Texto = "Le " + singular + " " + (CantidadAccess - CantidadDispositivos).ToString() + " " + plural + " según su licencia, comuniquese con su proveedor para más información."
                            ComparadorCantidad = CantidadAccess - CantidadDispositivos
                        End If
                    Else
                        Texto = ""
                    End If

                    Dim vcCodEmp As String
                    If UtilitarioWeb.Seguridad.EsAdministrador() Then vcCodEmp = "-1" Else vcCodEmp = oUsuario.Empleado.P_vcCod

                    script = script + "var misAlertas = " + js.Serialize(Alertas.ObtenerTodasLasAlertas(oUsuario.P_inCod, _
                                                                         UtilitarioWeb.TipoSolicitud.ObtenerTiposPorUsuario(), _
                                                                         UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudAprobacion(), vcTipSolTec, _
                                                                         vcCodEmp, vcCodIntResp, vcTipSolTecTod, vcGrupLee)) + ";"


                    script = script + "var IdTemporizador = " & oUsuario.Temporizador.IdTemporizador.ToString() & "; "
                    script = script + "var TiempoTemporizador = " & oUsuario.Temporizador.Tiempo.ToString() & "; "
                    script = script + "var ReinciarTemporizador = " & IIf(oUsuario.Temporizador.ReiniciarConAccion, "true", "false") & "; "
                    script = script + "var miTotalSegTrans = " & Math.Round(oUsuario.Temporizador.GetSegundosTranscurridos) & "; "
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "keys", script, True)


                    If Usuario.Mostrar(oUsuario.P_inCod).btReinicia And oUsuario.P_inCod <> 1 Then
                        hdf_Reiniciar_Clave.Value = "1"
                    End If

            End If

            End If
        Catch ex As Exception
            Try
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            Catch exC As Exception
            End Try
        Finally
            If Producto IsNot Nothing Then Producto.Dispose()
            If Dashboard IsNot Nothing Then Dashboard.Dispose()
            If Cola IsNot Nothing Then Cola.Dispose()
        End Try

    End Sub

    Private Function BuscarModulo(ByVal inCodPro As Integer, ByVal oModulo As ENT_PRO_Modulo) As Boolean
        If oModulo.F_inProd = inCodPro Then
            Return True
        Else
            Return False
        End If
    End Function

    ''Private Sub WebTab_DataBinding(ByVal lstProducto As List(Of ENT_PRO_Producto), ByVal lstModulo As List(Of ENT_PRO_Modulo), ByVal lstOpcion As List(Of ENT_PRO_Opcion), ByVal lstItem As List(Of ENT_PRO_Item), Optional ByVal prIdUsuario As Integer = -1)
    ''    Dim VerPnlSolicitud As Boolean = False
    ''    Dim VerPnlIncidencia As Boolean = False
    ''    Dim VerPnlConsumoDetalle As Boolean = False
    ''    Dim VerPnlConsumoResumen As Boolean = False
    ''    Dim Dashboard As BL_DASH_Dashboard = Nothing
    ''    Try
    ''        Dim blTieneDashboard As Boolean = False
    ''        For Each oProducto As ENT_PRO_Producto In lstProducto
    ''            For Each oModulo As ENT_PRO_Modulo In lstModulo
    ''                If oModulo.F_inProd = oProducto.P_inCod Then
    ''                    If oModulo.vcNom.ToLower.Contains("dashboard") Then
    ''                        blTieneDashboard = True
    ''                        Exit For
    ''                    End If
    ''                End If
    ''            Next
    ''        Next

    ''        For Each oProducto As ENT_PRO_Producto In lstProducto
    ''            Dim tab As New ContenedorTabJQ
    ''            Dim NumModulos As Integer
    ''            tab.ID = tbPrincipal.ID & "_TabJQ" & oProducto.P_inCod.ToString()
    ''            tab.Titulo = "<div class='divIcoPro' style='position:absolute;'><img style='border:0; top:-10px;' src='" & oProducto.vcURLIco & "' width= '16px' height= '16px' /></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" & oProducto.vcNom
    ''            tab.Title = oProducto.Title
    ''            ConfiguraTab(tab, 95, False, 100)

    ''            tbPrincipal.ContenedoresTabJQ.Add(tab)

    ''            NumModulos = VerificaModulos(lstModulo, oProducto.P_inCod)

    ''            If oProducto.vcURL <> "" And NumModulos = 0 Then
    ''                Dim ifProducto As New HtmlGenericControl("iframe")
    ''                ifProducto.Attributes("class") = "ifPrincipal"
    ''                ifProducto.Attributes("src") = oProducto.vcURL
    ''                ifProducto.Attributes("frameborder") = "0"
    ''                ifProducto.Style("margin-bottom") = "-10px"
    ''                ifProducto.Style("padding") = "0px"

    ''                tab.ActivoBotonCerrar = True
    ''                tab.Controls.Add(ifProducto)
    ''            ElseIf NumModulos > 0 Then
    ''                Dim splitter As New SplitterJQ
    ''                Dim splitterContI As New PanelSplitter
    ''                Dim splitterContD As New PanelSplitter

    ''                splitterContI.Width = New Unit(217, UnitType.Pixel)
    ''                splitter.ID = tbPrincipal.ID & "_SplitterJQ" & oProducto.P_inCod.ToString()

    ''                splitter.PanelSplitters.Add(splitterContI)
    ''                splitter.PanelSplitters.Add(splitterContD)
    ''                tab.Controls.Add(splitter)

    ''                splitterContI.CssClass = "splitterPrincipalI"
    ''                splitterContD.CssClass = "splitterPrincipalD"

    ''                Dim webItem As New ExploradorWebJQ

    ''                ConfiguraAccordion(webItem, tab.ID & "_AccordionProd" & oProducto.P_inCod.ToString(), 220, 500)

    ''                Dim wtItem As New TabJQ
    ''                ConfiguraWebTab(wtItem, tab.ID & "_Tab" & oProducto.P_inCod.ToString(), 842, 625, oProducto.vcNom, tab.Title)


    ''                splitterContI.Controls.Add(webItem)
    ''                splitterContD.Controls.Add(wtItem)

    ''                If Not blTieneDashboard Then
    ''                    If oProducto.vcURL = "" Then
    ''                        For Each oModulo As ENT_PRO_Modulo In lstModulo
    ''                            If oProducto.P_inCod = oModulo.F_inProd Then
    ''                                If Not String.IsNullOrEmpty(oModulo.vcURL) Then
    ''                                    Dim Url As String = oModulo.vcURL
    ''                                    Url = Url & IIf(String.IsNullOrEmpty(oModulo.vcTab), "?", "?vcTab=" & oModulo.vcTab & "&")
    ''                                    Url = Url & "inCod=" & oModulo.P_inCod & "&inTip=2" & "&inTipOri=" & oModulo.inTipOri
    ''                                    Dim tabItem As New ContenedorTabJQ
    ''                                    Dim ifProducto As New HtmlGenericControl("iframe")
    ''                                    tabItem.ID = "tbPrincipal_TabJQ" & oProducto.P_inCod & "_AccordionProd" & oProducto.P_inCod & "_Item0_tab"
    ''                                    tabItem.Titulo = oModulo.vcNom
    ''                                    ifProducto.Attributes("class") = "ifContenido"
    ''                                    ifProducto.Attributes("src") = Url
    ''                                    ifProducto.Attributes("width") = "98%"
    ''                                    ifProducto.Attributes("frameborder") = "0"
    ''                                    ifProducto.Attributes("scrolling") = "no"
    ''                                    tabItem.ActivoBotonCerrar = True
    ''                                    tabItem.Controls.Add(ifProducto)
    ''                                    wtItem.ContenedoresTabJQ.Add(tabItem)
    ''                                    Exit For
    ''                                End If
    ''                            End If
    ''                        Next
    ''                    End If
    ''                End If

    ''                If oProducto.vcURL <> "" Then

    ''                    If Seguridad.EsAdministrador() Then
    ''                        If oProducto.vcTab.Contains("Dashboard") Then
    ''                            Dim tabItem As New ContenedorTabJQ
    ''                            Dim ifProducto As New HtmlGenericControl("iframe")
    ''                            tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
    ''                            tabItem.Titulo = oProducto.vcTab

    ''                            ifProducto.Attributes("class") = "ifContenido"
    ''                            If prIdUsuario <> -1 Then
    ''                                Dim miUrl As String = ""
    ''                                Dim oBL_DASH_Dashboard As BL_DASH_Dashboard = Nothing
    ''                                Try
    ''                                    oBL_DASH_Dashboard = New BL_DASH_Dashboard(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    ''                                    miUrl = oBL_DASH_Dashboard.ObtenerURLdash_porIdUsuario(prIdUsuario)
    ''                                Catch ex As Exception
    ''                                Finally
    ''                                    If oBL_DASH_Dashboard IsNot Nothing Then oBL_DASH_Dashboard.Dispose()
    ''                                End Try

    ''                                If miUrl <> "-1" Then
    ''                                    ifProducto.Attributes("src") = miUrl
    ''                                Else
    ''                                    ifProducto.Attributes("src") = oProducto.vcURL
    ''                                End If
    ''                            Else
    ''                                ifProducto.Attributes("src") = oProducto.vcURL
    ''                            End If
    ''                            ifProducto.Attributes("width") = "98%"
    ''                            ifProducto.Attributes("frameborder") = "0"
    ''                            ifProducto.Attributes("scrolling") = "no"
    ''                            tabItem.ActivoBotonCerrar = True 'IIf(oProducto.vcTab.ToUpper.Contains("V1"), False, True)
    ''                            tabItem.Controls.Add(ifProducto)

    ''                            wtItem.ContenedoresTabJQ.Add(tabItem)
    ''                        Else
    ''                            Dim tabItem As New ContenedorTabJQ
    ''                            Dim ifProducto As New HtmlGenericControl("iframe")
    ''                            tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
    ''                            tabItem.Titulo = oProducto.vcTab

    ''                            ifProducto.Attributes("class") = "ifContenido"
    ''                            ifProducto.Attributes("src") = oProducto.vcURL
    ''                            ifProducto.Attributes("width") = "98%"
    ''                            ifProducto.Attributes("frameborder") = "0"
    ''                            ifProducto.Attributes("scrolling") = "no"
    ''                            tabItem.ActivoBotonCerrar = True
    ''                            tabItem.Controls.Add(ifProducto)

    ''                            wtItem.ContenedoresTabJQ.Add(tabItem)
    ''                        End If

    ''                    Else
    ''                        If oProducto.vcTab.Contains("Dashboard") Then
    ''                            If Not CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod.Trim = "" Then
    ''                                Dim tabItem As New ContenedorTabJQ
    ''                                Dim ifProducto As New HtmlGenericControl("iframe")
    ''                                tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
    ''                                tabItem.Titulo = oProducto.vcTab
    ''                                ifProducto.Attributes("class") = "ifContenido"
    ''                                If prIdUsuario <> -1 Then
    ''                                    Dashboard = New BL_DASH_Dashboard(0)
    ''                                    Dim miUrl As String = Dashboard.ObtenerURLdash_porIdUsuario(prIdUsuario)
    ''                                    If miUrl <> "-1" Then
    ''                                        ifProducto.Attributes("src") = miUrl
    ''                                    Else
    ''                                        ifProducto.Attributes("src") = oProducto.vcURL
    ''                                    End If
    ''                                Else
    ''                                    ifProducto.Attributes("src") = oProducto.vcURL
    ''                                End If
    ''                                ifProducto.Attributes("width") = "98%"
    ''                                ifProducto.Attributes("frameborder") = "0"
    ''                                ifProducto.Attributes("scrolling") = "no"
    ''                                tabItem.ActivoBotonCerrar = True
    ''                                tabItem.Controls.Add(ifProducto)

    ''                                wtItem.ContenedoresTabJQ.Add(tabItem)
    ''                            End If
    ''                        Else
    ''                            Dim tabItem As New ContenedorTabJQ
    ''                            Dim ifProducto As New HtmlGenericControl("iframe")
    ''                            tabItem.ID = wtItem.ID & "Inicio_" & oProducto.P_inCod.ToString()
    ''                            tabItem.Titulo = oProducto.vcTab

    ''                            ifProducto.Attributes("class") = "ifContenido"
    ''                            ifProducto.Attributes("src") = oProducto.vcURL
    ''                            ifProducto.Attributes("width") = "98%"
    ''                            ifProducto.Attributes("frameborder") = "0"
    ''                            ifProducto.Attributes("scrolling") = "no"

    ''                            tabItem.ActivoBotonCerrar = False
    ''                            tabItem.Controls.Add(ifProducto)

    ''                            wtItem.ContenedoresTabJQ.Add(tabItem)
    ''                        End If
    ''                    End If
    ''                End If
    ''                For Each oModulo As ENT_PRO_Modulo In lstModulo
    ''                    If oProducto.P_inCod = oModulo.F_inProd Then
    ''                        Dim ebgItem As New ExploradorWebItem()
    ''                        ebgItem.Texto = oModulo.vcNom
    ''                        ebgItem.Cabecera = True
    ''                        ebgItem.Fondo = True
    ''                        ebgItem.URLIco = oModulo.vcURLIco
    ''                        ebgItem.Title = oModulo.Title
    ''                        If Not String.IsNullOrEmpty(oModulo.vcURL) Then
    ''                            If oModulo.vcURL.ToString().Contains("P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx") Then VerPnlSolicitud = True
    ''                            Dim Url As String = oModulo.vcURL
    ''                            If Not Url.ToLower().Contains("http:") AndAlso Not Url.ToLower().Contains("https:") Then
    ''                                Url = Url & IIf(String.IsNullOrEmpty(oModulo.vcTab), "?", "?vcTab=" & oModulo.vcTab & "&")
    ''                                Url = Url & "inCod=" & oModulo.P_inCod & "&inTip=2" & "&inTipOri=" & oModulo.inTipOri
    ''                            End If
    ''                            Dim TituloTab As String = oModulo.vcNom
    ''                            ebgItem.Titulo = TituloTab
    ''                            ebgItem.href = Url
    ''                            ebgItem.Nombre = IIf(String.IsNullOrEmpty(oModulo.vcTab), TituloTab, oModulo.vcTab)
    ''                            ebgItem.Nombre = ebgItem.Nombre.Replace(" ", "_")
    ''                        End If
    ''                        webItem.ExploradorWebItems.Add(ebgItem)

    ''                        For Each oOpcion As ENT_PRO_Opcion In lstOpcion
    ''                            If oModulo.P_inCod = oOpcion.F_inMod Then
    ''                                Dim ebiItem As New ExploradorWebItem()
    ''                                ebiItem.Texto = oOpcion.vcNom
    ''                                ebiItem.URLIco = oOpcion.vcURLIco
    ''                                ebiItem.Title = oOpcion.Title
    ''                                If Not String.IsNullOrEmpty(oOpcion.vcURL) Then
    ''                                    If oOpcion.vcURL.ToString().Contains("P_Movil/SolicitudesAtencion/SOA_Adm_Solicitudes.aspx") Then VerPnlIncidencia = True
    ''                                    Dim Url As String = oOpcion.vcURL
    ''                                    If Not Url.ToLower().Contains("http:") AndAlso Not Url.ToLower().Contains("https:") Then
    ''                                        Url = Url & IIf(String.IsNullOrEmpty(oOpcion.vcTab), "?", "?vcTab=" & oOpcion.vcTab & "&")
    ''                                        Url = Url & "inCod=" & oOpcion.P_inCod & "&inTip=3" & "&inTipOri=" & oOpcion.inTipOri
    ''                                    End If
    ''                                    Dim TituloTab As String = oOpcion.vcNom
    ''                                    ebiItem.Titulo = TituloTab
    ''                                    ebiItem.href = Url
    ''                                    ebiItem.Nombre = IIf(String.IsNullOrEmpty(oOpcion.vcTab), TituloTab, oOpcion.vcTab)
    ''                                    ebiItem.Nombre = ebiItem.Nombre.Replace(" ", "_")
    ''                                End If
    ''                                ebgItem.ExploradorWebItems.Add(ebiItem)

    ''                                For Each oItem As ENT_PRO_Item In lstItem
    ''                                    If oOpcion.P_inCod = oItem.F_inOpc Then
    ''                                        Dim ebiSubItem As New ExploradorWebItem()
    ''                                        ebiSubItem.Texto = oItem.vcNom
    ''                                        ebiSubItem.URLIco = oItem.vcURLIco
    ''                                        ebiSubItem.Title = oItem.Title
    ''                                        If Not String.IsNullOrEmpty(oItem.vcURL) Then
    ''                                            If oItem.vcURL.ToString().Contains("P_Movil/Sumarios/Sum_Navegacion.aspx") Or oItem.vcURL.ToString().Contains("P_Movil/Historico/His_Plantilla.aspx") Or
    ''                                               oItem.vcURL.ToString().Contains("P_Movil/Consultar/Con_ConsultaPrincipal.aspx") Or oItem.vcURL.ToString().Contains("P_Configuracion/PivotReporte.aspx") Then VerPnlConsumoDetalle = True
    ''                                            Dim Url As String = oItem.vcURL
    ''                                            If Not Url.ToLower().Contains("http:") AndAlso Not Url.ToLower().Contains("https:") Then
    ''                                                Url = Url & IIf(String.IsNullOrEmpty(oItem.vcTab), "?", "?vcTab=" & oItem.vcTab & "&")
    ''                                                Url = Url & "inCod=" & oItem.P_inCod & "&inTip=4" & "&inTipOri=" & oItem.inTipOri
    ''                                            End If
    ''                                            Dim TituloTab As String = oItem.vcNom
    ''                                            ebiSubItem.Titulo = TituloTab
    ''                                            ebiSubItem.href = Url
    ''                                            ebiSubItem.Nombre = IIf(String.IsNullOrEmpty(oItem.vcTab), TituloTab, oItem.vcTab)
    ''                                            ebiSubItem.Nombre = ebiSubItem.Nombre.Replace(" ", "_")
    ''                                        End If
    ''                                        ebiItem.ExploradorWebItems.Add(ebiSubItem)
    ''                                    End If
    ''                                Next
    ''                            End If
    ''                        Next
    ''                    End If
    ''                Next
    ''            End If
    ''        Next

    ''        'SESSION QUE ME PERMITE MOSTRAR LAS SECCIONES QUE TIENE ACCESO EL USUARIO LOGUEADO EN EL DASHBOARD EMPLEADO - RRAMOS 20151214------------------------------------------
    ''        HttpContext.Current.Session("Ver_Opciones_Dash_Empl") = VerPnlSolicitud & "|" & VerPnlIncidencia & "|" & VerPnlConsumoDetalle & "|" & True
    ''        '----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    ''    Catch ex As Exception
    ''        Throw
    ''    Finally
    ''        If Not IsNothing(Dashboard) Then Dashboard.Dispose()
    ''    End Try

    ''End Sub

    Private Sub ConfiguraAccordion(ByVal Accord As ExploradorWebJQ, ByVal Id As String, ByVal w As Integer, ByVal h As Integer)
        Accord.ID = Id
        Accord.CssClass = "ExploradorWeb"
        Accord.Width = New Unit(w, UnitType.Pixel)
    End Sub

    Private Sub ConfiguraWebTab(ByVal Tab As TabJQ, ByVal Id As String, ByVal w As Integer, ByVal h As Integer, Nombre As String, ByVal title As String)
        Tab.ID = Id
        Tab.ToolTip = title
        Tab.CssClass = "tabschild"
        Tab.Style("margin-top") = "0px"
        Tab.Style("margin-left") = "0px"
        Tab.Style("margin-bottom") = "0px"
        Tab.Style("margin-right") = "0px"
        Tab.Style("padding-top") = "0px"
        Tab.Style("padding-left") = "0px"
        Tab.Style("padding-bottom") = "0px"
        Tab.Style("padding-right") = "0px"


        Dim div2 As New HtmlGenericControl("div")
        div2.ID = "dv_IconoRefresh_" & Id
        div2.Attributes("class") = "Refrescar"
        div2.Attributes("title") = "Volver a cargar página"
        div2.Attributes("width") = "30px"
        div2.Attributes("height") = "20px"

        If Nombre = "Mantenimiento" Then
            div2.Attributes("style") = "height:20px!important;right:30px;top:4px;position:absolute;cursor:hand;cursor:pointer;"
        Else
            div2.Attributes("style") = "height:20px!important;right:30px;top:4px;position:absolute;cursor:hand;cursor:pointer;display:none;"
        End If


        'ImgRefrescar
        Dim img2 As New HtmlImage
        img2.Src = "Common/Images/Mantenimiento/Refresh_22x22.png"
        img2.Alt = Id & "," & Nombre
        img2.Width = 20
        img2.Attributes("class") = "Refrescar"
        img2.Height = 20
        div2.Controls.Add(img2)

        Dim div As New HtmlGenericControl("div")
        div.ID = "dv_IconoClose_" & Id
        div.Attributes("class") = "CerrarTodosTabs"
        div.Attributes("title") = "Cerrar Tabs"
        div.Attributes("width") = "30px"
        div.Attributes("style") = "height:20px!important;right:5px;top:2px;position:absolute;cursor:hand;cursor:pointer; overflow:hidden;"

        'ImgClose
        Dim img As New HtmlImage
        img.Src = "Common/Images/tab-close.png"
        img.Alt = Id & "," & Nombre
        img.Width = 24
        img.Height = 24

        img.ID = "dv_IconoClose_" & Id
        img.Attributes("title") = "Cerrar Tabs"
        img.Style.Add("float", "right")
        img.Style.Add("margin-top", "-23px")
        img.Style.Add("margin-right", "3px")
        img.Style.Add("cursor", "pointer")
        img.Attributes("class") = "CerrarTodosTabs"

        div.Controls.Add(img)

        '<div class='divIcoPro' style='position:absolute;'><img style='border:0; top:-10px;' src='" & oProducto.vcURLIco & "' width= '16px' height= '16px' /></div>
        Tab.Controls.Add(div2)
        'Tab.Controls.Add(div) 'comentado 06/08/2015 wapumayta (se agrega directamente el control imagen
        Tab.Controls.Add(img)

    End Sub

    Private Sub ConfiguraTab(ByRef tab As ContenedorTabJQ, ByVal h As Integer, ByVal activoCerrar As Boolean, ByVal w As Integer)
        tab.CssClass = "ContenedorTabPrincipal"
        tab.ActivoBotonCerrar = activoCerrar
        'tab.Style("margin-top") = "0px"
        'tab.Style("margin-left") = "0px"
        'tab.Style("margin-bottom") = "0px"
        'tab.Style("margin-right") = "0px"
        'tab.Style("padding-top") = "0px"
        'tab.Style("padding-left") = "0px"
        'tab.Style("padding-bottom") = "0px"
        'tab.Style("padding-right") = "0px"
    End Sub

    Private Function VerificaModulos(ByVal lstModulo As List(Of ENT_PRO_Modulo), ByVal inCodPro As Integer) As Integer
        Dim cont As Integer = 0
        For Each oModulo As ENT_PRO_Modulo In lstModulo
            If oModulo.F_inProd = inCodPro Then
                cont = cont + 1
            End If
        Next
        Return cont
    End Function

    ''Protected Sub loginEstado_LoggedOut(sender As Object, e As System.EventArgs) Handles loginEstado.LoggedOut
    ''    FormsAuthentication.SignOut()
    ''End Sub

    Private Sub Licencia()
        '********************Componente Licencia************************
        Dim Licencia As New VisualSoft.PCSistel.CompLicencia.BL.CLicencia()

        Dim dtLicencias As New DataTable()
        dtLicencias.Columns.Add("m_blCredito", GetType(Boolean))
        dtLicencias.Columns.Add("m_blInterfaceCentral", GetType(Boolean))
        dtLicencias.Columns.Add("m_blDescuento", GetType(Boolean))
        dtLicencias.Columns.Add("m_blHotelero", GetType(Boolean))
        dtLicencias.Columns.Add("vgInterfaseCTI", GetType(Boolean))
        dtLicencias.Columns.Add("vgClaves", GetType(Boolean))

        Dim m_blCredito As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C01", False)
        Dim m_blInterfaceCentral As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C04", False)
        Dim m_blDescuento As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C06", False)
        Dim m_blHotelero As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C03", False)
        Dim vgInterfaseCTI As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C09", False)
        Dim vgClaves As Boolean = VisualSoft.PCSistel.CompLicencia.BL.CLicencia.fnDeterminaLicenciasOpcionales("OPT", "C07", False)

        dtLicencias.Rows.Add(m_blCredito, m_blInterfaceCentral, m_blDescuento, m_blHotelero, vgInterfaseCTI, vgClaves)

        Session("dtLicencia") = dtLicencias

        '********************Fin Componente Licencia************************
    End Sub

    Private Sub ValidacionPermisos(dt As DataTable)
        Try
            Dim Validar As Boolean = Convert.ToBoolean(dt.Rows(0)("VALIDA"))
            Dim Ajustes As Boolean = Convert.ToBoolean(dt.Rows(0)("AJUSTES"))
            Dim Reportes As Boolean = Convert.ToBoolean(dt.Rows(0)("REPORTES"))
            Dim Sincronizador As Boolean = Convert.ToBoolean(dt.Rows(0)("SINCRONIZADOR"))
            Dim Abogados As Boolean = Convert.ToBoolean(dt.Rows(0)("VALIDAABOGADO"))
            Dim ListaValida As String = dt.Rows(0)("TIPOLLAMADA").ToString()
            Dim Administrar As Boolean = Convert.ToBoolean(dt.Rows(0)("ADMINISTRADOR"))

            ListaValida = ListaValida.Replace(",", "','")
            ListaValida = (Convert.ToString("'") & ListaValida) + "'"

            Session("ListaAbogados") = ListaValida
            Session("AdminAbogados") = Administrar



            'If Not Validar Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(0).Visible = False
            'End If

            'If Not Ajustes Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(1).Visible = False
            'End If

            'If Not Reportes Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(2).Visible = False
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(3).Visible = False

            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(4).Visible = False
            'End If

            'If Not Sincronizador Then
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(5).Visible = False
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(6).Visible = False
            '    BarraNavegacionJQ1.PanelesBarraNavegacion(0).ItemsBarraNavegacion(7).Visible = False
            'End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub rep_Modulos_ItemDataBound(sender As Object, e As RepeaterItemEventArgs)
        If e.Item.ItemType = ListItemType.Item OrElse e.Item.ItemType = ListItemType.AlternatingItem Then
            If DirectCast(e.Item.FindControl("rep_Opciones"), Repeater).Items.Count = 0 Then
                Dim b_MostrarSubMenuDown As HtmlGenericControl = DirectCast(e.Item.FindControl("b_Modulo_MostrarSubMenuDown"), HtmlGenericControl)
                b_MostrarSubMenuDown.Visible = False
                Dim a_MostrarSubMenuDown As HtmlAnchor = DirectCast(e.Item.FindControl("a_Modulo_MostrarSubMenuDown"), HtmlAnchor)
                a_MostrarSubMenuDown.Attributes.Remove("class")
            End If
        End If
    End Sub


    Protected Sub rep_Opciones_ItemDataBound(sender As Object, e As RepeaterItemEventArgs)
        If e.Item.ItemType = ListItemType.Item OrElse e.Item.ItemType = ListItemType.AlternatingItem Then
            If DirectCast(e.Item.FindControl("rep_Items"), Repeater).Items.Count = 0 Then
                Dim b_MostrarSubMenuDown As HtmlGenericControl = DirectCast(e.Item.FindControl("b_Opcion_MostrarSubMenuDown"), HtmlGenericControl)
                b_MostrarSubMenuDown.Visible = False
                Dim a_MostrarSubMenuDown As HtmlAnchor = DirectCast(e.Item.FindControl("a_Opcion_MostrarSubMenuDown"), HtmlAnchor)
                a_MostrarSubMenuDown.Attributes.Remove("class")
            End If
        End If
    End Sub

    Protected Sub rep_Contenidos_ItemDataBound(sender As Object, e As RepeaterItemEventArgs)

        If e.Item.ItemType = ListItemType.Item OrElse e.Item.ItemType = ListItemType.AlternatingItem Then
            Dim rep_Modulos As Repeater = DirectCast(e.Item.FindControl("rep_Modulos"), Repeater)

            Dim Modulo As BL_PRO_Modulo = Nothing
            Dim Opcion As BL_PRO_Opcion = Nothing
            Dim Item As BL_PRO_Item = Nothing
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Try
                Modulo = New BL_PRO_Modulo(oUsuario.IdCliente)
                Opcion = New BL_PRO_Opcion(oUsuario.IdCliente)
                Item = New BL_PRO_Item(oUsuario.IdCliente)

                Dim dsMenus As New DataSet
                Dim dtModulos As DataTable = Modulo.ListarDT(oUsuario)
                Dim dvModulo As DataView = dtModulos.DefaultView
                dvModulo.RowFilter = "F_inProd = " & DirectCast(e.Item.DataItem, ENT_PRO_Producto).P_inCod

                dsMenus.Tables.Add(dvModulo.ToTable())
                dsMenus.Tables(0).TableName = "Modulo"
                dsMenus.Tables.Add(Opcion.ListarDT(oUsuario).Copy())
                dsMenus.Tables(1).TableName = "Opcion"
                dsMenus.Tables.Add(Item.ListarDT(oUsuario).Copy())
                dsMenus.Tables(2).TableName = "Item"
                dsMenus.Relations.Add("Relacion_Modulo_Opcion", dsMenus.Tables(0).Columns("P_inCod"), dsMenus.Tables(1).Columns("F_inMod"), False)
                dsMenus.Relations.Add("Relacion_Opcion_Item", dsMenus.Tables(1).Columns("P_inCod"), dsMenus.Tables(2).Columns("F_inOpc"), False)
                rep_Modulos.DataSource = dsMenus
                rep_Modulos.DataBind()

            Catch ex As Exception
            Finally
                If Modulo IsNot Nothing Then Modulo.Dispose()
                If Opcion IsNot Nothing Then Opcion.Dispose()
                If Item IsNot Nothing Then Item.Dispose()
            End Try
        End If
    End Sub

End Class
