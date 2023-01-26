Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.IO
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Facturacion_Mantenimiento_Con_Fac_Cese
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    'Dim vcTab As String = Request.QueryString("vcTab")
                    'Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                    Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                    'Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

                    hdfinTipOri.Value = inTipOri.ToString()

                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    oAuditoria.Opcion = AuditoriaConstantes.ModuloFacturacion.Ceses
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal p_oContrato As String) As Integer
        Try



            Dim oSerializer As New JavaScriptSerializer
            Dim oContrato As MOV_CAM_Contrato = oSerializer.Deserialize(Of MOV_CAM_Contrato)(p_oContrato)
            GuardarArchivoRuta(oContrato.RutaContratoTemporal, 0)
            Return 0
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Private Shared Sub GuardarArchivoRuta(ByRef RutaCeseTemporal As String, ByVal inTipOri As String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Servicio = Nothing
        Try
            logica = New BL_MOV_FAC_Servicio(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim ruta As String = RutaCeseTemporal
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/P_Movil/Facturacion/Importacion/CesesEmpleados/"), "/")

            Dim sourcePath As String = HttpContext.Current.Server.MapPath("~/" & Path.GetDirectoryName(ruta))
            Dim targetPath As String = HttpContext.Current.Server.MapPath("~/P_Movil/Facturacion/Importacion/CesesEmpleados" + CarpetaDominio + "/")

            logica.CreaCarpeta_ImportacionExportacion(ruta, sourcePath, targetPath, 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    Shared Function DevuelveMes(ByVal mes As Integer) As String
        Dim mesCadena As String = ""
        If mes = 1 Then
            mesCadena = "Enero"
        ElseIf mes = 2 Then
            mesCadena = "Febrero"
        ElseIf mes = 3 Then
            mesCadena = "Marzo"
        ElseIf mes = 4 Then
            mesCadena = "Abril"
        ElseIf mes = 5 Then
            mesCadena = "Mayo"
        ElseIf mes = 6 Then
            mesCadena = "Junio"
        ElseIf mes = 7 Then
            mesCadena = "Julio"
        ElseIf mes = 8 Then
            mesCadena = "Agosto"
        ElseIf mes = 9 Then
            mesCadena = "Setiembre"
        ElseIf mes = 10 Then
            mesCadena = "Octubre"
        ElseIf mes = 11 Then
            mesCadena = "Noviembre"
        ElseIf mes = 12 Then
            mesCadena = "Diciembre"
        End If
        Return mesCadena
    End Function
End Class
