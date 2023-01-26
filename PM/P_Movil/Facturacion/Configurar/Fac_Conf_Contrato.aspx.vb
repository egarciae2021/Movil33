Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Proceso.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Proceso.BL
Imports System.Web.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes

Partial Class P_Movil_Facturacion_Mantenimiento_Fac_Conf_Contrato
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_SubContrato = Nothing
        Try

            logica = New BL_MOV_FAC_SubContrato(Integer.Parse(inTipOri), oUsuario.IdCliente)
            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcTab As String = Request.QueryString("vcTab")
                    Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))

                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.SubContrato
                    oAuditoria.Opcion = "[Configuración Contratos]"
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()



                    Dim codigo As String = "0"


                    Dim oSubContrato As ENT_MOV_FAC_SubContrato = logica.ListarSubContratos_XCodigo(codigo)
                    logica.Dispose()


                    hdfEmpleado.Value = oSubContrato.IdEmpleado
                    hdfEstado.Value = oSubContrato.IdEstado
                    hdfinTipOri.Value = inTipOri.ToString()


                    txtDiaCorte.Text = oSubContrato.FechaCorte

                    txtDiaPago.Text = oSubContrato.FechaPago
                    'If oSubContrato.IdEstado = 1 Then
                    '    chkEstado.Checked = True
                    'Else
                    '    chkEstado.Checked = False

                    'End If




                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Sub Guardar(ByVal diaCorte As String, ByVal diaPago As String, ByVal inTipOri As String)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Configuracion = Nothing
        Try
            Dim mensaje As String = ""
            logica = New BL_MOV_FAC_Configuracion(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim oSubContrato As New ENT_MOV_FAC_SubContrato
            oSubContrato.IdCliente = (oUsuario.IdCliente)
            oSubContrato.FechaCorte = diaCorte
            oSubContrato.FechaPago = diaPago
            oSubContrato.IdEstado = 1
            oSubContrato.usuario = oUsuario.vcUsu
            logica.Insertar_ConfContratos(oSubContrato)
            logica.Dispose()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub


    Public Shared Function FechaValida(ByVal _fecha As String, ByVal nuevoDia As String) As String
        Dim fecha_registrar_en_SQL, dia, mes, anio As String
        fecha_registrar_en_SQL = ""
        If _fecha <> "" Then

            If _fecha.Length = 9 Then
                anio = _fecha.Substring(5, 4)
                dia = _fecha.Substring(2, 2)
                If nuevoDia <> String.Empty Then

                    dia = nuevoDia.PadLeft(2, "0")
                End If

                mes = "0" + _fecha.Substring(0, 1)
                fecha_registrar_en_SQL = anio + mes + dia

            End If
            If _fecha.Length = 8 Then
                anio = _fecha.Substring(4, 4)
                dia = "0" + _fecha.Substring(2, 1)
                If nuevoDia <> String.Empty Then
                    dia = nuevoDia.PadLeft(2, "0")
                End If
                mes = "0" + _fecha.Substring(0, 1)
                fecha_registrar_en_SQL = anio + mes + dia


            End If

            If _fecha.Length >= 10 Then
                anio = _fecha.Substring(6, 4)
                mes = _fecha.Substring(3, 2)
                dia = _fecha.Substring(0, 2)
                If nuevoDia <> String.Empty Then
                    dia = nuevoDia.PadLeft(2, "0")
                End If
                fecha_registrar_en_SQL = anio + mes + dia


            End If
            Return fecha_registrar_en_SQL
        Else

            Return ""

        End If
    End Function

End Class
