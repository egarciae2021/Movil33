Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes

Partial Class P_Movil_Facturacion_Configurar_Fac_Conf_EnvioPagos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfIdUsuarioLogeadoNombre.Value = oUsuario.vcNom
                    hdfinTipOri.Value = inTipOri.ToString()
                    Dim logica As BL_MOV_FAC_Configuracion = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim vcPerfiles As String = String.Empty
                    For j As Integer = 0 To oUsuario.Perfiles.Count - 1
                        If (vcPerfiles = "") Then
                            vcPerfiles += oUsuario.Perfiles(j).P_inCod.ToString()
                        Else
                            vcPerfiles += "," + oUsuario.Perfiles(j).P_inCod.ToString()
                        End If
                    Next

                    Dim validar As Boolean = False
                    For Each entSegPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                        If entSegPerfil.CodigoPerfil = "SUPADM" OrElse entSegPerfil.CodigoPerfil = "ADMIN" Then
                            validar = True
                            Exit For
                        End If
                    Next
                    If validar Then
                        dvActualizarEC.Style("display") = "block"
                        hdfEsAdm.Value = "1"
                    Else
                        dvActualizarEC.Style("display") = "none"
                    End If

                    lstEmpleado.DataSource = logica.ListarEmpleadosExceptosEnvio()
                    logica.Dispose()
                    lstEmpleado.DataTextField = "vcNom"
                    lstEmpleado.DataValueField = "P_vcCod"
                    lstEmpleado.DataBind()


                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    oAuditoria.Opcion = AuditoriaConstantes.ModuloFacturacion.EnvioEstadoCuenta
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()

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
    Public Shared Function getListar_Configuracion(ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Configuracion)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
        Try
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim Opcion As Integer = 5 'Envio de Estado de Cuenta
            Dim lista As New List(Of ENT_MOV_FAC_Configuracion)
            lista = logica.ListarConfiguracion(Opcion)
            logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Sub Insertar_ConfEnvioCuentaCobro(ByVal biEnvio As Integer, ByVal asunto As String, ByVal saludo As String, _
                                                           ByVal mensaje As String, ByVal biIncNombre As Integer, ByVal empleados1 As String, ByVal empleados2 As String, ByVal empleados3 As String, ByVal empleados4 As String, ByVal inTipOri As String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing

        Try
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim conf As New ENT_MOV_FAC_Configuracion
            conf.IdTipoConfiguracion = 5 'EnvioCuentaCobro
            conf.BiEnvio = biEnvio
            conf.Asunto = asunto
            conf.Saludo = saludo
            conf.Mensaje = mensaje
            conf.biIncNombre = biIncNombre
            conf.EmpleadosNoEnvio1 = empleados1
            conf.EmpleadosNoEnvio2 = empleados2
            conf.EmpleadosNoEnvio3 = empleados3
            conf.EmpleadosNoEnvio4 = empleados4
            conf.User = oUsuario.vcUsu
            logica.Insertar_ConfEnvioEstadoCuenta(conf)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    Function ObtieneEmpleados() As String

        Return 0
    End Function

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Fecha_Actual() As List(Of String)
        Try

            Dim lista As New List(Of String)
            lista.Add(DateTime.Now.ToShortDateString())
            lista.Add(DateTime.Now.AddYears(+1).ToShortDateString())

            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try
    End Function

    <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function listar_TipoArchivoddl(ByVal inTipOri As String) As List(Of ENT_PCS_IMP_TipoArchivo)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_PCS_IMP_TipoArchivo = Nothing
        Try
            logica = New BL_PCS_IMP_TipoArchivo(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_PCS_IMP_TipoArchivo)
            lista = logica.listar_TipoArchivoddl()
            logica.Dispose()
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function InsertarCola_ExportaciónEstadoCuenta() As String
        Dim Cola As BL_MOV_FAC_Cola = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim validar As Boolean
            For Each entSegPerfil As ENT_SEG_Perfil In oUsuario.Perfiles
                If entSegPerfil.CodigoPerfil = "SUPADM" OrElse entSegPerfil.CodigoPerfil = "ADMIN" Then
                    validar = True
                    Exit For
                End If
            Next

            If validar Then
                Cola = New BL_MOV_FAC_Cola(oUsuario.IdCliente)
                Dim eCola As New ENT_MOV_FAC_Cola
                eCola.InTipoConfiguracion = 20
                eCola.IdCliente = oUsuario.IdCliente

                Dim oAuditoria As New ProcesaAuditoria
                oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
                oAuditoria.Modulo = "Configuración Móvil"
                oAuditoria.NombreUsuario = oUsuario.vcUsu
                oAuditoria.Opcion = "Cuentas de Cobro [Estado de Cuenta]"
                oAuditoria.Tabla = "MOV_FAC_Cola"
                eCola = Cola.InsertarCola(eCola)
                oAuditoria.Insertar(New String() {eCola.P_inidCola.ToString()})

                Return "1"
            Else
                Return "-1"
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cola IsNot Nothing Then Cola.Dispose()
        End Try
    End Function
   
End Class
