Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Auditoria

Public Class Mnt_Responsables
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


                bpEmpleado.NombreEntidad = "Empleados"
                bpEmpleado.vcTab = "M_EMPL"
                bpEmpleado.TipoOrigen = 0
                bpEmpleado.Condicion = "M_EMPL.EMPL_btEST=1" 'Criterio para solo listar empleados activos --Jpareja
                bpEmpleado.FuncionPersonalizada = "fnMostrarDatosEmpleado"
                bpEmpleado.RutaRaiz = "../../../"
                bpEmpleado.Contenedor = "dvContenedorEmpleado"
                bpEmpleado.Descripcion = "EMPL_vcNOMEMP"
                bpEmpleado.Codigo = "EMPL_P_vcCODEMP"
                bpEmpleado.MuestraMensajeNoDatos = False
                bpEmpleado.TraerDatosFila = True


                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try
    End Sub


    <WebMethod()>
    Public Shared Function Listar_Responsables() As List(Of Object)
        Dim oLinea As BL_MOV_Linea = Nothing
        Try
            oLinea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsResultado As DataSet = oLinea.Listar_Responsables()
            Return UtilitarioWeb.ConvertirDataSet_ListaObjetos(dsResultado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Listar_ConsolidadoEmpleado(ByVal CodEmpleado As String) As List(Of Object)
        Dim oLinea As BL_MOV_Linea = Nothing
        Try
            oLinea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsResultado As DataSet = oLinea.Listar_ConsolidadoEmpleado(CodEmpleado)
            Return UtilitarioWeb.ConvertirDataSet_ListaObjetos(dsResultado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GuardarAreaEmpleado(CodEmpleado As String, CodArea As String) As List(Of Object)
        Dim oLinea As BL_MOV_Linea = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oLinea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = HttpContext.Current.Session("Usuario")

            Dim dsResultado As DataSet = oLinea.GuardarAreaEmpleado(CodEmpleado, CodArea)


            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Móvil"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Tabla = "PCS_EMP_OrgaJefatura"
            oAuditoria.Opcion = "Responsables"

            Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
            "Se asocia el empleado '" & CodEmpleado & "' al área '" & CodArea & "'", "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

            ''oAuditoria.Especial("Se asocia el empleado '" & CodEmpleado & "' al área '" & CodArea & "'")


            Return UtilitarioWeb.ConvertirDataSet_ListaObjetos(dsResultado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try
    End Function
    <WebMethod()>
    Public Shared Function EliminarAreaEmpleado(CodEmpleado As String, CodArea As String) As List(Of Object)
        Dim oLinea As BL_MOV_Linea = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oLinea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = HttpContext.Current.Session("Usuario")

            Dim dsResultado As DataSet = oLinea.EliminarAreaEmpleado(CodEmpleado, CodArea)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Móvil"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Tabla = "PCS_EMP_OrgaJefatura"
            oAuditoria.Opcion = "Responsables"

            Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
            "Se elimina el empleado '" & CodEmpleado & "' al área '" & CodArea & "'", "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

            Return UtilitarioWeb.ConvertirDataSet_ListaObjetos(dsResultado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try
    End Function
    <WebMethod()>
    Public Shared Function EliminarResponsable(CodEmpleado As String) As List(Of Object)
        Dim oLinea As BL_MOV_Linea = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oLinea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = HttpContext.Current.Session("Usuario")

            Dim dsResultado As DataSet = oLinea.EliminarResponsableEmpleado(CodEmpleado)

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "Móvil"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Tabla = "PCS_EMP_OrgaJefatura"
            oAuditoria.Opcion = "Responsables"
            ''oAuditoria.Especial("Se elimina el empleado '" & CodEmpleado & "' como responsable.")

            Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
            "Se elimina el empleado '" & CodEmpleado & "' como responsable.", "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)



            Return UtilitarioWeb.ConvertirDataSet_ListaObjetos(dsResultado)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function ActualizarTipoResponsable(CodEmpleado As String, TipoResponsable As String) As String
        Dim oLinea As BL_MOV_Linea = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oLinea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oUsuario = HttpContext.Current.Session("Usuario")
            oLinea.ActualizarTipoResponsable(CodEmpleado, TipoResponsable)
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oLinea IsNot Nothing Then oLinea.Dispose()
        End Try
    End Function


End Class