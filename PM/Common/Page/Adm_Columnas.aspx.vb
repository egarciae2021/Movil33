Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Movil_Administrar_Adm_Columnas
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                    
                    hdfinTipOri.Value = inTipOri.ToString()
                    hdfvcTab.Value = vcTab
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
    Public Shared Function ListarColumnas(ByVal vcTab As String, ByVal inTipOri As String) As List(Of ENT_ENT_Campo)
        Dim ENT_Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim lstCampo As List(Of ENT_ENT_Campo) = ENT_Campo.Listar(vcTab, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario), 0)
            Return lstCampo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (ENT_Campo IsNot Nothing) Then
                ENT_Campo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Sub GuardarColumnas(ByVal vcTab As String, ByVal vclstCam As String, ByVal inTipOri As String)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try

            Dim oSerializer As New JavaScriptSerializer
            Dim lstCampo As List(Of ENT_ENT_Campo) = oSerializer.Deserialize(Of List(Of ENT_ENT_Campo))(vclstCam)
            Campo.GuardarPropiedades(lstCampo, vcTab, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (Campo IsNot Nothing) Then
                Campo.Dispose()
            End If
        End Try
    End Sub
End Class