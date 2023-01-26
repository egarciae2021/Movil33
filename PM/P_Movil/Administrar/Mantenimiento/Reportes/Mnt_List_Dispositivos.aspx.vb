Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports Microsoft.VisualBasic
Imports System
Imports System.Web.UI
Imports DevExpress.Web
Imports System.Globalization
Imports System.Web.Services

Public Class Mnt_List_Dispositivos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing

        Dim Modelo As BL_MOV_ModeloDispositivo = Nothing
        Dim Emppleado As BL_GEN_Empleado = Nothing
        Dim Estado As BL_MOV_Estado = Nothing
        Dim Organizacion As BL_GEN_Organizacion = Nothing
        Dim Nivel As BL_GEN_Nivel = Nothing
        Dim Sucursal As BL_GEN_Sucursal = Nothing
        Dim TipoLineaDispositivo As BL_MOV_TipoLineaDispositivo = Nothing
        Dim TipoServicio As BL_MOV_TipoServicio = Nothing
        Dim SoportarServicio As BL_MOV_Dispositivo = Nothing
        Dim Descripcion As BL_MOV_Caracteristica = Nothing

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Modelo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
            Emppleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            Estado = New BL_MOV_Estado(oUsuario.IdCliente)
            Organizacion = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
            Sucursal = New BL_GEN_Sucursal(oUsuario.IdCliente)
            TipoLineaDispositivo = New BL_MOV_TipoLineaDispositivo(oUsuario.IdCliente)
            TipoServicio = New BL_MOV_TipoServicio(oUsuario.IdCliente)
            Descripcion = New BL_MOV_Caracteristica(oUsuario.IdCliente)

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    UtilitarioWeb.Dataddl(ddlModelo, Modelo.Listar(-1, "<Todos>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlEmpleado, Emppleado.ListaEmpleados(-1, "<Todos>"), "vcNom", "P_vcCod")
                    UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarEstadoMovilReporte(-1, "<Todos>"), "vcNom", "P_inCod")
                    'UtilitarioWeb.Dataddl(ddlOrganizacion, Organizacion.ListarOrganizacion(-1, "<Todos>"), "vcNomOrg", "vcCodInt")
                    UtilitarioWeb.Dataddl(ddlNivel, Nivel.Listar(-1, "<Todos>"), "vcNomNiv", "P_inCodNiv")
                    UtilitarioWeb.Dataddl(ddlSucursal, Sucursal.ListarSucursal(-1, "<Todos>"), "vcNom", "P_vcCod")
                    UtilitarioWeb.Dataddl(ddlLinea, TipoLineaDispositivo.ListarTipoLinea(-1, "<Todos>"), "vcDes", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlTipoServicio, TipoServicio.Listar(-1, "<Todos>"), "vcNom", "P_inCodTipSer")
                    UtilitarioWeb.Dataddl(ddlComboDescripcion, Descripcion.ListaDescripcionCombo(-1, "<Todos>", 5), "vcCam", "inCod")

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Modelo IsNot Nothing Then Modelo.Dispose()
            If Emppleado IsNot Nothing Then Emppleado.Dispose()
            If Estado IsNot Nothing Then Estado.Dispose()
            If Organizacion IsNot Nothing Then Organizacion.Dispose()
            If Nivel IsNot Nothing Then Nivel.Dispose()
            If Sucursal IsNot Nothing Then Sucursal.Dispose()
            If TipoLineaDispositivo IsNot Nothing Then TipoLineaDispositivo.Dispose()
            If TipoServicio IsNot Nothing Then TipoServicio.Dispose()
            If Descripcion IsNot Nothing Then Descripcion.Dispose()
        End Try
    End Sub


    Sub RegistrarDatosKendo(CodigoScript As String, ByVal dtDatos As DataTable, Descripcion As String, Codigo As String)
        Dim Datos As New StringBuilder
        Datos.Append("var dataDDL_" & CodigoScript & " = [")
        Datos.Append("{ text: '<Todos>', value: '-1'},")
        For i = 0 To dtDatos.Rows.Count - 1
            Datos.Append("{ text: '" + dtDatos.Rows(i)(Codigo).ToString + "', value: '" + dtDatos.Rows(i)(Descripcion).ToString + "' },")
        Next
        Datos.Append("];")
        Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), CodigoScript, Datos.ToString(), True)
    End Sub

End Class