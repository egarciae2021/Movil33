Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.ComponentModel
Imports VisualSoft.Comun.Utilitarios.Cryptographics
Imports VisualSoft.Comun

' Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class General
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
    End Sub
    '<WebMethod(EnableSession:=True)> _

    <WebMethod()> _
    Public Function getFechaCampana() As String
        'Dim dash As BL_MOV_CAM_Campana
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(0)
            Dim oCampanaConf As ENT_MOV_CAM_CampanaConf = Campana.obtenerCampanaActivaConf(0)
            Dim _return As String = ""

            If oCampanaConf IsNot Nothing Then
                _return = oCampanaConf.FechaInicio.ToString("dd/MM/yyyy HH:mm:ss")
                _return &= "," & oCampanaConf.FechaFin.ToString("dd/MM/yyyy HH:mm:ss")
                _return &= "," & Now.ToString("dd/MM/yyyy HH:mm:ss")
            End If

            Return _return

            'dash = New BL_MOV_CAM_Campana(0)
            'Dim IdCampana As String = ConfigurationManager.AppSettings("IdCampana")

            'Dim _return As String
            '_return = dash.MostrarCampanaMantenimiento(IdCampana).FechaInicio.ToString("dd/MM/yyyy HH:mm:ss")
            '_return &= "," & dash.MostrarCampanaMantenimiento(IdCampana).FechaFin.ToString("dd/MM/yyyy HH:mm:ss")
            '_return &= "," & Now.ToString("dd/MM/yyyy HH:mm:ss")

            'Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            'If dash IsNot Nothing Then dash.Dispose()
            If Campana IsNot Nothing Then Campana.Dispose()
        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function GuardarConfiguracionDatos(ByVal Servidor As String, ByVal Autenticacion As String, ByVal Usuario As String, ByVal Password As String,
                                                     ByVal BD As String) As String
        Try
            Dim Cliente As BL_GEN_Cliente = New BL_GEN_Cliente(0)
            Cliente.GuardaConexion(0, Servidor, Autenticacion, Usuario, Password, BD)

            Dim strCadenaConexion As String = Util.ArchivoConfiguracion.ObtenerValorConfiguracion(HttpContext.Current.Server.MapPath("~/web.config"), "accesoSQL")
            Cliente.GuardaConexionBase(0, Servidor, Autenticacion, Usuario, Password, BD, strCadenaConexion)

            Cliente.Dispose()

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function ComprobarConexion(ByVal Servidor As String, ByVal Autenticacion As String, ByVal Usuario As String, ByVal Password As String, ByVal BaseDatos As String) As String
        Dim connectionstring As String

        If Autenticacion = "SI" Then
            connectionstring = "Data Source=" & Servidor & ";Initial Catalog=" & BaseDatos & "; Integrated Security = True; connection timeout=10;"
        Else
            connectionstring = "Data Source=" & Servidor & ";Initial Catalog=" & BaseDatos & ";user id=" & Usuario & ";password=" & Password & ";connection timeout=10;"
        End If

        If Util.ArchivoConfiguracion.VerificaConexionBD(connectionstring) Then
            Return ""
        Else
            Return "Sin conexion"
        End If
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function GuardarConfiguracionBase(ByVal Servidor As String, ByVal Autenticacion As String, _
                                                    ByVal Usuario As String, ByVal Password As String,
                                                    ByVal BD As String, _
                                                    ByVal AutenticacionUsuario As String, _
                                                    ByVal RutaLDAP As String) As String
        Try
            'Dim TipoAunteticacion As Integer
            Util.BaseDatos.Servidor = Servidor
            Util.BaseDatos.BD = BD
            Util.BaseDatos.Usuario = Usuario
            Util.BaseDatos.Contraseña = Password
            Util.BaseDatos.TimeOut = 30
            If Autenticacion = "SI" Then
                'TipoAunteticacion = 1
                Util.BaseDatos.SSPI = "true"
            Else
                'TipoAunteticacion = 0
                Util.BaseDatos.SSPI = "false"
            End If
            Util.BaseDatos.Proveedor = "SQL"

            If AutenticacionUsuario <> "2" Then RutaLDAP = ""

            If Util.ArchivoConfiguracion.CambiarValorConfiguracion(HttpContext.Current.Server.MapPath("~/web.config"), "accesoSQL", EncryptString(Util.BaseDatos.CadenaConexion)) Then
                If Util.ArchivoConfiguracion.CambiarValorAutenticacion(HttpContext.Current.Server.MapPath("~/web.config"), Integer.Parse(AutenticacionUsuario), RutaLDAP) Then
                    Return ""
                Else
                    Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
                End If
            Else
                Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config"
        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function CargarConfiguracionDatos() As String
        Try
            Dim Cliente As BL_GEN_Cliente = New BL_GEN_Cliente(0)
            Dim _return As String = Cliente.MostrarCadena(0)
            Cliente.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        End Try
    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function ObtenerRaizSistema() As String
        Dim _return As String = Utilitario.ObtieneRaizSistema
        If Microsoft.VisualBasic.Right(_return.Trim, 1) <> "/" Then _return &= "/"
        Return _return
    End Function

    <WebMethod()> _
    Public Function enviarcorreopassword(ByVal Correo As String, ByVal Url As String, ByVal IdDominio As Integer, ByVal Dominio As String) As String
        'Public Function EnviarSolicitudReestablecerContrasena(ByVal Correo As String, ByVal URLLogin As String) As String
        Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim strResultado As String = String.Empty
        Dim strErrorCorreo As String = String.Empty
        Try
            
            If IdDominio = -1 Then
                Usuario = New BL_SEG_Usuario(0)
                ServicioGeneral = New BL_GEN_Servicio_General(0)
            Else
                Usuario = New BL_SEG_Usuario(0, 0, IdDominio)
                ServicioGeneral = New BL_GEN_Servicio_General(0, IdDominio)
            End If

            Dim CodigoSolicitud As String
            Dim dtResult As New DataTable
NuevoCodigo:
            CodigoSolicitud = Guid.NewGuid().ToString().ToUpper()
            dtResult = Usuario.InsertarSolicitudRestablecimiento(CodigoSolicitud, Correo, Url, IdDominio, Dominio)

            If dtResult.Rows.Count = 0 Then
                strResultado = "Error"
            Else
                Dim inResultado As Integer, strDescripcion As String
                inResultado = CInt(dtResult(0)("Resultado"))
                strDescripcion = dtResult(0)("Descripcion").ToString()

                If inResultado = -2 Then 'generar nuevo codigo
                    GoTo NuevoCodigo
                ElseIf inResultado = 1 Then
                    'enviar correo
                    Dim cCorreo = New CompCorreo.CCorreo

                    Dim CuerpoMensaje As String = String.Empty
                    Dim Destinatario As String = Correo
                    If IdDominio <> -1 Then
                        Destinatario = Utilitario.ComprobarStringNULL(dtResult(0)("Correo"), "")
                    End If
                    Dim Asunto As String = "Restablecimiento de contraseña"

                    Dim UbicPlantilla As String = HttpContext.Current.Server.MapPath("~/") & "Documentos\Plantillas\SolicitudCambioContrasena.htm"
                    Dim NombreUsuario As String = Utilitario.ComprobarStringNULL(dtResult(0)("NombreUsuario"), "")
                    Dim EnlaceParaCorreo As String = Url + "?c=" + CodigoSolicitud + "&d=" + IdDominio.ToString()
                    Dim TextoPlantilla As String = Utilitario.TraeCuerpoCorreo(UbicPlantilla)
                    CuerpoMensaje = String.Format(TextoPlantilla, NombreUsuario, EnlaceParaCorreo, EnlaceParaCorreo)

                    If Destinatario <> String.Empty And NombreUsuario <> String.Empty Then
                        Try
                            'cCorreo.Enviar(False, Destinatario, Asunto, CuerpoMensaje, Nothing, False, "")
                            ServicioGeneral.InsertarCola(1, Asunto, CuerpoMensaje, Destinatario, "", "", 0)
                        Catch ex As Exception
                            strErrorCorreo = ex.ToString()
                        End Try
                    Else
                        strResultado = "0|Error: No se detectó destinatario o correo válido para reealizar el envío."
                    End If
                    strResultado = inResultado.ToString() + "|" + EnlaceParaCorreo + "|" + Destinatario
                Else
                    strResultado = inResultado.ToString() + "|" + strDescripcion
                End If
            End If

            Return strResultado
        Catch ex As Exception
            'Dim util As New Utilitarios
            'util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw ex
        Finally
            If Not IsNothing(Usuario) Then Usuario.Dispose()
        End Try
    End Function
End Class