Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Data
Imports VisualSoft.PCSistel.Utilitarios
Imports VisualSoft.PCSistel.Producto.BE
Imports VisualSoft.PCSistel.Producto.BL
Imports System.Web.Script.Serialization
Imports System.Web.Services
Imports System.Web.Script.Services

Partial Class Adm_Columnas
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                Dim vcTab As String = Request.QueryString("vcTab")
                Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))

                hdfinTipOri.Value = inTipOri.ToString()
                hdfvcTab.Value = vcTab
            End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Sub

    <WebMethod()> _
    Public Shared Function ListarColumnas(vcTab As String, inTipOri As String) As List(Of ENT_ENT_Campo)
        Try
            Dim ENT_Campo As New BL_ENT_Campo()
            Dim lstCampo As List(Of ENT_ENT_Campo) = ENT_Campo.Listar(vcTab, 1, 0)
            Return lstCampo
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    Public Shared Sub GuardarColumnas(vcTab As String, vclstCam As String, inTipOri As String)
        Try
            Dim Campo As New BL_ENT_Campo()
            Dim oSerializer As New JavaScriptSerializer()
            Dim lstCampo As List(Of ENT_ENT_Campo) = oSerializer.Deserialize(Of List(Of ENT_ENT_Campo))(vclstCam)
            'Campo.GuardarPropiedades(lstCampo, vcTab, (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]);

            Campo.GuardarPropiedades(lstCampo, vcTab, 1)
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class
