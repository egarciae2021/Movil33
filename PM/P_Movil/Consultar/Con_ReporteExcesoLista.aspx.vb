Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports System.IO

Public Class Con_ReporteExcesoLista
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    hdfCodigoOperador.Value = Request.QueryString("vcCodOpe")
                    hdfPeriodo.Value = Request.QueryString("vcPeriodo")
                    hdfCodigoCuenta_Plan.Value = Request.QueryString("vcCodigoCuenta_Plan")
                    hdfAsignacionCredito.Value = Request.QueryString("vcAsigCred")
                    hdfTipoServicio.Value = Request.QueryString("vcTipoServicio")
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
    Public Shared Function ObtenerLista_Cuenta_ReporteExceso_X_Minuto(ByVal pvcPeriodo As String, ByVal pvcOperador As String, ByVal pvcCuenta_Plan As String, ByVal pintCodAsigCred As String, ByVal pintIdTipoServicio As String) As List(Of String)
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto") = pvcPeriodo & "|" & pvcOperador & "|" & pvcCuenta_Plan & "|" & pintCodAsigCred & "|" & pintIdTipoServicio
            Return Llamada.ObtenerListaReporteExceso_X_Minuto(pvcPeriodo, Convert.ToInt32(pvcOperador), pvcCuenta_Plan, Convert.ToInt32(pintCodAsigCred), Convert.ToInt32(pintIdTipoServicio), oCultura)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ObtenerLista_Planes_ReporteExceso_X_Minuto(ByVal pvcPeriodo As String, ByVal pvcOperador As String, ByVal pvcCuenta_Plan As String, ByVal pintCodAsigCred As String, ByVal pintIdTipoServicio As String) As JQGridJsonResponse
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim data As DataTable
            HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto") = pvcPeriodo & "|" & pvcOperador & "|" & pvcCuenta_Plan & "|" & pintCodAsigCred & "|" & pintIdTipoServicio
            data = Llamada.ObtenerLista_Planes_ReporteExceso_X_Minuto(pvcPeriodo, Convert.ToInt32(pvcOperador), pvcCuenta_Plan, Convert.ToInt32(pintCodAsigCred), Convert.ToInt32(pintIdTipoServicio), oCultura)

            Return New JQGridJsonResponse(1, 1, data.Rows.Count, data, 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerListaDetalle_Planes_ReporteExceso_X_Minuto(ByVal pvcPeriodo As String, ByVal pvcOperador As String, ByVal pvcCuenta_Plan As String, ByVal pintCodAsigCred As String, ByVal pintIdTipoServicio As String) As List(Of Object)
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim data As DataTable
            Dim lstObj As New List(Of Object)
            HttpContext.Current.Session("ReporteConsumo_Exceso_ToMinuto") = pvcPeriodo & "|" & pvcOperador & "|" & pvcCuenta_Plan & "|" & pintCodAsigCred & "|" & pintIdTipoServicio
            data = Llamada.ObtenerListaDetalle_Planes_ReporteExceso_X_Minuto(pvcPeriodo, Convert.ToInt32(pvcOperador), pvcCuenta_Plan, Convert.ToInt32(pintCodAsigCred), Convert.ToInt32(pintIdTipoServicio), oCultura)

            For i As Integer = 0 To data.Rows.Count - 1
                Dim dict As New Dictionary(Of String, Object)
                dict.Add("IdPlan", data.Rows(i)("IdPlan").ToString())
                dict.Add("Linea", data.Rows(i)("Linea").ToString())
                dict.Add("Equipo", data.Rows(i)("Equipo").ToString())
                dict.Add("Empleado", data.Rows(i)("Empleado").ToString())
                dict.Add("Estado", data.Rows(i)("Estado").ToString())
                dict.Add("Asignado", data.Rows(i)("Asignado").ToString())
                dict.Add("Consumo", data.Rows(i)("Consumo").ToString())
                dict.Add("Exceso", data.Rows(i)("Exceso").ToString())
                lstObj.Add(dict)
            Next
            Return lstObj
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Function
End Class