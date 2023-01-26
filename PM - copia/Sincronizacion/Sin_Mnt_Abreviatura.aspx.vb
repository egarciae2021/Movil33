Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services

Public Class Sin_Mnt_Abreviatura
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not Page.IsPostBack Then

                hdfEstado.Value = "1"

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod(EnableSession:=True)> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function BuscarRegistroAbreviatura(pEstado As String, filtro As String, campoordenar As String, orden As String, inPagTam As Integer, inPagAct As Integer) As Object
        Dim objSincronizador As BL_GEN_Sincronizacion = Nothing
        Try
            objSincronizador = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtCodigo As New DataSet()
            dtCodigo = objSincronizador.ObtenerListadoAbreviatura(filtro, Convert.ToInt32(pEstado))
            Return JQGrid.DatosJSON(dtCodigo.Tables(0), inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            objSincronizador.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function MantenimientoAbreviatura(pCodAbreviatura As String, pDescripcion As String, pAbreviatura As String, pEstado As String) As String
        Dim objSincronizador As BL_GEN_Sincronizacion = Nothing
        Try
            objSincronizador = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer
            resultado = objSincronizador.MantenimientoAbreviatura(Convert.ToInt32(pCodAbreviatura), pDescripcion, pAbreviatura, Convert.ToInt32(pEstado))
            Return resultado.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            objSincronizador.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function EliminarAbreviatura(pCodAbreviatura As String) As String
        Dim objSincronizador As BL_GEN_Sincronizacion = Nothing
        Try
            objSincronizador = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer
            resultado = objSincronizador.EliminarAbreviatura(Convert.ToInt32(pCodAbreviatura))
            Return resultado.ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            objSincronizador.Dispose()
        End Try
    End Function


End Class