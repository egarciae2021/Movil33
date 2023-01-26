Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class MDM_Empleado
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
                    Dim script As String = ""
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/."), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Listar() As List(Of String)
        Dim Empleado As BL_MDM_Empleado = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Empleado = New BL_MDM_Empleado(oUsuario.IdCliente)
            Return Empleado.Listar()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
    End Function
End Class