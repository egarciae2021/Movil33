Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class MDM_DispositivoVista
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

                    Dim IdModelo As String = "0"
                    Dim vcTecnico As String = ""
                    Try
                        IdModelo = Request.QueryString("IdModelo").ToString()
                    Catch ex As Exception
                        IdModelo = "0"
                    End Try
                    Try
                        vcTecnico = Request.QueryString("vcTecnico").ToString()
                    Catch ex As Exception
                        vcTecnico = ""
                    End Try

                    hdfIdModelo.Value = IdModelo
                    hdfvcTecnico.Value = vcTecnico
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarDispositivos(ByVal inIdModelo As String, ByVal invcTecnico As String) As List(Of String)
        Dim Dispositivo As BL_MDM_Dispositivo = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oSerializer As New JavaScriptSerializer
            Dispositivo = New BL_MDM_Dispositivo(oUsuario.IdCliente)
            Return Dispositivo.ListarPorIdModelo(Integer.Parse(inIdModelo), 1, invcTecnico)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
        End Try
    End Function

End Class