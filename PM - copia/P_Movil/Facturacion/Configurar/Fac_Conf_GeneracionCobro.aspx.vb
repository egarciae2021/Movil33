Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes

Public Class Fac_Conf_GeneracionCobro
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
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
                    hdfinTipOri.Value = inTipOri.ToString()

                    'Dim oAuditoria As New ProcesaAuditoria()
                    'oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    'oAuditoria.Producto = AuditoriaConstantes.Name
                    'oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    'oAuditoria.NombreUsuario = oUsuario.vcUsu
                    'oAuditoria.Opcion = AuditoriaConstantes.ModuloFacturacion.CuentaCobro
                    ''AUDITORIA : Se inserta el Usuario Logeado
                    'oAuditoria.Tabla = TableNames.Usuario
                    'oAuditoria.Acceso()


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

            Dim Opcion As Integer = 10 '2 = Cuenta Cobro
            Dim lista As New List(Of ENT_MOV_FAC_Configuracion)
            lista = logica.ListarConfiguracion(Opcion)
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
    Public Shared Function Insertar_ConfCuentaCobro(ByVal TipoEjecucion As String, _
                                                           ByVal Hora As String, ByVal Minuto As String, ByVal IndTiempo As String, _
                                                           ByVal DiaEjecucion As Integer, ByVal User As String, ByVal inTipOri As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing

        Try
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim fecha As String
            fecha = FechaValida(DateTime.Now.ToShortDateString())
            fecha = fecha + " " + Hora + ":" + Minuto + ":00 " + IndTiempo

            Dim conf As New ENT_MOV_FAC_Configuracion
            conf.IdTipoConfiguracion = 10 '2 = Generación de cobros
            conf.TipoEjecucion = TipoEjecucion '0=Automatica, 1=Manual
            conf.Hora = fecha
            conf.Minuto = Minuto
            conf.DiaEjecucion = DiaEjecucion
            conf.IndTiempo = IndTiempo
            conf.User = oUsuario.vcUsu

            ' Return Nothing

            Return logica.Insertar_ConfCuentaCobro(conf)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function
    Public Shared Function FechaValida(ByVal _fecha As String) As String
        Dim fecha_sql As String = ""
        Dim dia, mes, anno As String
        If (_fecha.Length >= 10) Then
            dia = _fecha.Substring(0, 2)
            mes = _fecha.Substring(3, 2)
            anno = _fecha.Substring(6, 4)
            fecha_sql = anno + mes + dia
        End If
        Return fecha_sql
    End Function

End Class