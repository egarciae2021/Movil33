Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.ActiveDirectoryVS
Imports System.Web.Services
Imports System.IO
Imports ClosedXML.Excel

Partial Class P_Configuracion_Seguridad_Administrar_ImportarUsuarioAD
    Inherits System.Web.UI.Page


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                If Not IsPostBack Then


                    'txtDirectorioOrigen.Value = ConfigurationManager.AppSettings("RutaLDAP").ToString()
                    'Session("DirectorioActivo") = txtDirectorioOrigen.Value

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    <WebMethod()> _
    Public Shared Function MostrarUsuarios(ByVal vcUser As String, ByVal vcPwd As String) As List(Of BE_UserAD)
        Dim objBL As ADUtils = New ADUtils(HttpContext.Current.Session("DirectorioActivo"), vcUser, vcPwd)
        Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstUsuario As List(Of BE_UserAD) = objBL.GetAllADDomainUsers
        For Each oUsuario As BE_UserAD In lstUsuario
            If Usuario.ListarPorGUID(oUsuario.strGuid).P_inCod <> 0 Then
                'Existe...
                oUsuario.Descripcion = "(Ya existe)"
            Else
                oUsuario.Descripcion = "(Nuevo)"
            End If
        Next

        Usuario.Dispose()

        Return lstUsuario '(0).oGuid
    End Function

    <WebMethod()> _
    Public Shared Function ImportarUsuarios(ByVal vcUser As String, ByVal vcPwd As String, ByVal vcGuid As String) As String
        vcGuid = vcGuid & ","
        Dim mGuid() As String = vcGuid.Split(",")

        Dim objBL As ADUtils = New ADUtils(HttpContext.Current.Session("DirectorioActivo"), vcUser, vcPwd)
        Dim oUsuarioAD As BE_UserAD
        Dim Usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oENTUsuario As ENT_SEG_Usuario
        Dim listaXML As New List(Of List(Of Integer))
        Dim lista As List(Of Integer)

        For Each strGuid As String In mGuid
            If strGuid.Trim = "" Then Continue For

            oUsuarioAD = objBL.GetUser(strGuid)
            If oUsuarioAD.strGuid <> "" Then

                oENTUsuario = Usuario.ListarPorGUID(oUsuarioAD.strGuid)
                If oENTUsuario.P_inCod = 0 Then
                    'Valida si el nombre existe...
                    oENTUsuario = Usuario.ListarPorUsuario(oUsuarioAD.Usuario)
                    If oENTUsuario.P_inCod = 0 Then
                        'No existe, Nuevo
                        oENTUsuario.P_inCod = -1
                        oENTUsuario.vcUsu = oUsuarioAD.Usuario
                        oENTUsuario.vcPas = oUsuarioAD.Usuario.ToLower
                    Else
                        'Existe, Actualizar el Guid..
                    End If
                    oENTUsuario.GuidAD = strGuid
                    oENTUsuario.vcNom = oUsuarioAD.NombreCompleto
                    If oENTUsuario.vcNom = "" Then
                        oENTUsuario.vcNom = oUsuarioAD.Usuario
                    End If

                    If oENTUsuario.vcUsu = "" Then
                        Continue For
                    End If

                    'Perfil por defecto.
                    lista = New List(Of Integer)
                    lista.Add(2) 'Crear el perfil!!!
                    listaXML.Add(lista)

                    'Grupo por defecto.
                    lista = New List(Of Integer)
                    lista.Add(2)
                    listaXML.Add(lista)

                    'Politica por defecto.
                    listaXML.Add(New List(Of Integer))

                    Usuario.Grabar(oENTUsuario, listaXML, "")
                End If


            End If

        Next

        Usuario.Dispose()

        Return "ok" '(0).oGuid
    End Function


End Class
