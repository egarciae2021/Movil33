Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services

Public Class Sin_Sucursales
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not Page.IsPostBack Then
                Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
                Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                Dim tablamaestra As DataTable = Sincronizacion.ListadoSucursales()
                ddlsucursal2.DataTextField = "NOMBRE"
                ddlsucursal2.DataValueField = "CODIGO"
                ddlsucursal2.DataSource = tablamaestra
                ddlsucursal2.DataBind()

                Sincronizacion.Dispose()

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub



    <WebMethod()> _
    Public Shared Function Guardar(XML_Sucursales As String) As Integer
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim resultado As Integer = Sincronizacion.GrabarFacilidadxSucursal("Anexo", "Facilidad", XML_Sucursales)

            Return 0
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function


    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function CargarDetalleSucursales() As List(Of Object)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim lstObj As New List(Of Object)()
            Dim dt As DataTable = Sincronizacion.CargarFacilidadxSucursal("Anexo", "Facilidad")


            For i As Integer = 0 To dt.Rows.Count - 1
                Dim dict As New Dictionary(Of String, Object)()
                dict.Add("codsuc", dt.Rows(i)(0).ToString())
                dict.Add("sucursal", dt.Rows(i)(1).ToString())
                dict.Add("codfac", dt.Rows(i)(2).ToString())
                dict.Add("facilidad", dt.Rows(i)(3).ToString())

                lstObj.Add(dict)
            Next

            Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

End Class