Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Script.Services

Partial Class P_Movil_Configurar_Adm_CuentaServicios
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfCuenta.Value = Request.QueryString("CodCue")
                    hdfSubCuenta.Value = Request.QueryString("CodSubCue")
                    hdfEditable.Value = Request.QueryString("Editable") '1=true,0=false
                    hdfSelSubCue.Value = Request.QueryString("SelSubCue")
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
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarSubCuentas(ByVal vcCodCue As String) As Object
        Try
            Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dict As New Dictionary(Of String, Object)
            Dim dt As DataTable = Cuenta.ListarSubCuenta(vcCodCue.Replace("&#39", "''"))
            Cuenta.Dispose()
            Return JQGrid.DatosJSON(dt, 0)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarServiciosSubCuentas(ByVal inCodSubCue As String) As Object
        Try
            Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dict As New Dictionary(Of String, Object)
            Dim dt As DataTable = Cuenta.ListarSubCuentaServicios(Integer.Parse(inCodSubCue))
            Cuenta.Dispose()
            Return JQGrid.DatosJSON(dt)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class