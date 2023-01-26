Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Movil_SolicitudesAtencion_SOA_Mnt_Nivel
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_SolicitudesAtencion_SOA_Mnt_Nivel_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Nivel As BL_SOA_Nivel = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    'viIdTecnico = Me.ObtenerIdTecnicoXIdUsuario(oUsuario.P_inCod)

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    'hdfIdTecnico.Value = viIdTecnico
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim codigo As String = Request.QueryString("Cod")
                    Dim campo As String = Request.QueryString("Par")

                    If Not codigo Is Nothing Then
                        hdfIdNivel.Value = codigo
                    Else
                        hdfIdNivel.Value = "0"
                    End If

                    Nivel = New BL_SOA_Nivel(oUsuario.IdCliente)
                    Dim js As New JavaScriptSerializer()
                    Dim script As String = "var Ordenes = " + js.Serialize(Nivel.ListarOrdenNiveles) + ";"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Nivel IsNot Nothing Then
                Nivel.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerNivel(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try
            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.ListarNivel(prIdNivel)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then nivel.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function registrarNivel(ByVal prNombre As String, ByVal prDescripcion As String, ByVal prOrden As Integer) As String
        Dim nivel As BL_SOA_Nivel = Nothing
        Try
            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.registrarNivel(prNombre, prDescripcion, prOrden)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then nivel.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function verificarCambiarOrden(ByVal prIdNivel As Integer) As String
        Dim nivel As BL_SOA_Nivel = Nothing
        Try
            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.verificarCambiarOrden(prIdNivel)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then nivel.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EditarNivel(ByVal prIdNivel As Integer, ByVal prNombre As String, ByVal prDescripcion As String, ByVal prOrden As String, ByVal prActivo As Integer) As String
        Dim nivel As BL_SOA_Nivel = Nothing
        Try
            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return nivel.EditarNivel(prIdNivel, prNombre, prDescripcion, prOrden, prActivo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then nivel.Dispose()
        End Try
    End Function
End Class
