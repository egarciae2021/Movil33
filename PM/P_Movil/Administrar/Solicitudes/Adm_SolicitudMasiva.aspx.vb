
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE

Public Class Adm_SolicitudMasiva
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                oUsuario = HttpContext.Current.Session("Usuario")
                If Not IsPostBack Then
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try
    End Sub


    <WebMethod(EnableSession:=True)>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function obtenerListas(os As String, tmp As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            resultado = Solicitud.ListaSolicitudMasiva(oUsuario.P_inCod, os, tmp)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function grabarDatos(estilos As String, filas As String, filasQuitadas As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            resultado = Solicitud.GrabarSolicitudMasiva(oUsuario.P_inCod, estilos, filas, filasQuitadas)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
        Return resultado
    End Function

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function getEmpleado(tipo As String, codigo As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
            resultado = Solicitud.ObtenerEmpleado(tipo, codigo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
        Return resultado
    End Function



    <WebMethod()>
    Public Shared Function GuardarDatosOS(CodigoOS As String, TipoOS As String, TipoMovimiento As String, _
                                          Descripcion As String, FechaInicio As String, HoraInicioOS As String, _
                                          IdSolicitudes As String, OrigenSolicitud As String,
                                          AdministradorContrato As String, CargoAdministradorContrato As String) As String
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Dim IdOrden As String = String.Empty
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            IdOrden = Solicitud.Guardar_OrdenServicio(CodigoOS, TipoOS, TipoMovimiento, Descripcion,
                                                                    FechaInicio, IdSolicitudes, OrigenSolicitud, HoraInicioOS, AdministradorContrato, CargoAdministradorContrato)
            'Solicitud.Dispose()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
        Return IdOrden
    End Function



End Class