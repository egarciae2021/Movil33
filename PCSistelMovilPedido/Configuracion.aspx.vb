Imports System.Web.Services
Imports System.Data.SqlClient
Imports VisualSoft.Comun
Imports VisualSoft.Comun.Utilitarios.Cryptographics
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.SeguridadWeb

Public Class Configuracion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Not HttpContext.Current.Request.IsLocal Then
            Response.Redirect("Login.aspx")
        End If

        If Not IsPostBack Then
            Try
                Dim strCadenaConexion As String = Util.ArchivoConfiguracion.ObtenerValorConfiguracion(Server.MapPath("~/web.config"), "accesoSQL")
                rblstAutenticacion.SelectedIndex = Util.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"))
                If rblstAutenticacion.SelectedIndex = 2 Then
                    divldap.Style("display") = ""
                    txtLDAP.Text = "" & ConfigurationManager.AppSettings("RutaLDAP")
                Else
                    divldap.Style("display") = "none"
                End If

                rbtnUsarioContraseñaDatos.Checked = True
                If Not String.IsNullOrEmpty(strCadenaConexion) Then
                    strCadenaConexion = DecryptString(strCadenaConexion)
                    Dim objConexion As Util.ConexionBE = Util.ConexionBL.GetInstancia.ObtieneConexion(strCadenaConexion)
                    If objConexion IsNot Nothing Then
                        txtServidor.Text = objConexion.Servidor
                        txtUsuario.Text = objConexion.Usuario
                        txtContraseña.Text = objConexion.Password
                        txtContraseña.Attributes.Add("value", txtContraseña.Text)
                        txtBaseDatos.Text = objConexion.BaseDatos
                        If objConexion.SeguridadIntegrada = "1" Then
                            rbtnSeguridadIntegrada.Checked = True
                            trUsuario.Style("display") = "none"
                            trContraseña.Style("display") = "none"
                        Else
                            rbtnUsarioContraseña.Checked = True
                        End If
                    Else
                        txtServidor.Text = ""
                        txtUsuario.Text = ""
                        txtContraseña.Text = ""
                        txtBaseDatos.Text = ""
                        rbtnSeguridadIntegrada.Checked = False
                        rbtnUsarioContraseña.Checked = True
                    End If
                End If
            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(Utilitario.MensajeError)
            End Try
        End If

    End Sub


End Class
