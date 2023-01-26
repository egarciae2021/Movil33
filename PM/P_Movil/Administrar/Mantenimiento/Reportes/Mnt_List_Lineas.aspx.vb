Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports Microsoft.VisualBasic
Imports System
Imports System.Web.UI
Imports DevExpress.Web
Imports System.Globalization
Imports System.Web.Services

Public Class Mnt_List_Lineas
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing

        Dim Emppleado As BL_GEN_Empleado = Nothing
        Dim Organizacion As BL_GEN_Organizacion = Nothing
        Dim Estado As BL_MOV_Estado = Nothing
        Dim Nivel As BL_GEN_Nivel = Nothing
        Dim Sucursal As BL_GEN_Sucursal = Nothing
        Dim Plan As BL_MOV_Plan = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Dim TipoLineaDispositivo As BL_MOV_TipoLineaDispositivo = Nothing
        Dim AsigCredito As BL_MOV_Linea = Nothing
        Dim Descripcion As BL_MOV_Caracteristica = Nothing

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Emppleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            Organizacion = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Estado = New BL_MOV_Estado(oUsuario.IdCliente)
            Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
            Sucursal = New BL_GEN_Sucursal(oUsuario.IdCliente)
            Plan = New BL_MOV_Plan(oUsuario.IdCliente)
            Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
            TipoLineaDispositivo = New BL_MOV_TipoLineaDispositivo(oUsuario.IdCliente)
            AsigCredito = New BL_MOV_Linea(oUsuario.IdCliente)
            Descripcion = New BL_MOV_Caracteristica(oUsuario.IdCliente)

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    UtilitarioWeb.Dataddl(ddlEmpleado, Emppleado.ListaEmpleados(-1, "<Todos>"), "vcNom", "P_vcCod")
                    UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarEstadoMovilReporte(-1, "<Todos>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlNivel, Nivel.Listar(-1, "<Todos>"), "vcNomNiv", "P_inCodNiv")
                    UtilitarioWeb.Dataddl(ddlSucursal, Sucursal.ListarSucursal(-1, "<Todos>"), "vcNom", "P_vcCod")
                    UtilitarioWeb.Dataddl(ddlPlan, Plan.Listar(-1, "<Todos>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlCuenta, Cuenta.ListaCuenta(-1, "<Todos>"), "vcNom", "P_vcCod")
                    UtilitarioWeb.Dataddl(ddlTipoLinea, TipoLineaDispositivo.ListarTipoLinea(-1, "<Todos>"), "vcDes", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlAsignacion, AsigCredito.ListaAsignacionCredito(-1, "<Todos>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlComboDescripcion, Descripcion.ListaDescripcionCombo(-1, "<Todos>", 6), "vcCam", "inCod")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Emppleado IsNot Nothing Then Emppleado.Dispose()
            If Organizacion IsNot Nothing Then Organizacion.Dispose()
            If Estado IsNot Nothing Then Estado.Dispose()
            If Nivel IsNot Nothing Then Nivel.Dispose()
            If Sucursal IsNot Nothing Then Sucursal.Dispose()
            If Plan IsNot Nothing Then Plan.Dispose()
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If TipoLineaDispositivo IsNot Nothing Then TipoLineaDispositivo.Dispose()
            If AsigCredito IsNot Nothing Then AsigCredito.Dispose()
            If Descripcion IsNot Nothing Then Descripcion.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerValoresDinamicos(ByVal IdCampo As String) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Caracteristica As BL_MOV_Caracteristica = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Caracteristica = New BL_MOV_Caracteristica(oUsuario.IdCliente)
            If IsNumeric(IdCampo) Then
                Dim dtDatos As DataTable = Caracteristica.ListaComboDinamico(IdCampo)
                If dtDatos.Rows.Count > 0 Then
                    Dim mValores() As String = dtDatos.Rows(0)("vcLon").ToString().Split(",")
                    For x As Integer = 0 To mValores.Length - 1
                        listaValores.Add(mValores(x))
                    Next
                End If
            End If

            Return listaValores

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Caracteristica IsNot Nothing Then Caracteristica.Dispose()
        End Try
    End Function



End Class