Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_AdministrarTickets_AdmTck_BuscarUsuario
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If Not IsPostBack Then
                hdfEmpleado.Value = oUsuario.F_vcCodEmp
                hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                hdfAdmin.Value = "0"
                If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"


                If Request.QueryString("esBuscarUsuario") IsNot Nothing Then
                    Me.hdfEsBuscarUsuario.Value = "1"
                Else
                    Me.hdfEsBuscarUsuario.Value = "0"
                End If

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            'End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function listarUsuario(ByVal pTipoOperacion As Byte, ByVal pDato As String) As List(Of ENT_SEG_Usuario)
        Try
         Dim usuario As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_SEG_Usuario) = usuario.obtenerUsuario(pTipoOperacion, pDato)
         usuario.Dispose()
         Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function listarUsuarioTabla(ByVal inPagTam As Integer, ByVal inPagAct As Integer, _
                                              ByVal pTipoOperacion As Byte, ByVal pDato As String) As Object
        Dim usuario As BL_SEG_Usuario = Nothing
        Try
            usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return JQGrid.DatosJSON(usuario.obtenerUsuarioTabla(pTipoOperacion, pDato), inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If usuario IsNot Nothing Then
                usuario.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function listarUsuarioTabla_Usuario(ByVal inPagTam As Integer, ByVal inPagAct As Integer, _
                                              ByVal pTipoOperacion As Byte, ByVal pDato As String) As Object
        Dim usuario As BL_SEG_Usuario = Nothing
        Try
            usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return JQGrid.DatosJSON(usuario.obtenerUsuarioTabla_Usuario(pTipoOperacion, pDato), inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If usuario IsNot Nothing Then
                usuario.Dispose()
            End If
        End Try
    End Function
End Class
