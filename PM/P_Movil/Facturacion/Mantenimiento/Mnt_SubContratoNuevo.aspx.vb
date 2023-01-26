Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Proceso.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Proceso.BL
Imports System.Web.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.Auditoria.Constantes

Partial Class P_Movil_Facturacion_Mantenimiento_Mnt_SubContratoNuevoo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
        Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_SubContrato = Nothing
        Try
            logica = New BL_MOV_FAC_SubContrato(inTipOri, oUsuario.IdCliente)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    'Dim vcTab As String = Request.QueryString("vcTab")
                    'Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))

                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))
                    hdfinTipOri.Value = inTipOri.ToString()

                    Dim codigo As String = Request.QueryString("Cod")
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Acceso()


                    bpTecnicoResponsable.NombreEntidad = "Empleados"
                    bpTecnicoResponsable.vcTab = "M_EMPL"
                    bpTecnicoResponsable.TipoOrigen = 0
                    'bpTecnicoResponsable.Condicion = "EMPL_btEST=1 AND EMPL_P_vcCODEMP not in (Select  distinct IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1)"
                    bpTecnicoResponsable.Condicion = "EMPL_btEST=1 "
                    bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos"
                    bpTecnicoResponsable.RutaRaiz = "../../../"
                    bpTecnicoResponsable.Contenedor = "dvContenedorTecRes"
                    bpTecnicoResponsable.Descripcion = "EMPL_vcNOMEMP"
                    bpTecnicoResponsable.Codigo = "EMPL_P_vcCODEMP"

                    If Not IsNothing(codigo) Then
                        Dim codigos As String() = codigo.Split(New Char() {"-"c})
                        codigo = Convert.ToString(codigos("0"))
                        hdfCodigo.Value = codigo


                        Dim oSubContrato As ENT_MOV_FAC_SubContrato = logica.ListarSubContratos_XCodigo(codigo)
                        logica.Dispose()


                        hdfEmpleado.Value = oSubContrato.IdEmpleado
                        hdfEstado.Value = oSubContrato.IdEstado

                        bpTecnicoResponsable.CodigoValor = oSubContrato.IdEmpleado
                        bpTecnicoResponsable.Deshabilitado = True
                        'txtEmpleado.Text = oSubContrato.NomEmpleado
                        'txtEmpleado.ReadOnly = True
                        txtDiaCorte.Text = oSubContrato.FechaCorte
                        txtDiaPago.Text = oSubContrato.FechaPago
                    Else
                        hdfCodigo.Value = 0
                        hdfEmpleado.Value = ""
                        hdfEmpleado.Value = ""
                        hdfEstado.Value = 0

                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            logica.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal IdSubContrato As Integer, ByVal IdEmpleado As String, ByVal diaCorte As Integer, ByVal diaPago As Integer, ByVal estado As Integer, ByVal inTipOri As String) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_SubContrato = Nothing
        Try
            logica = New BL_MOV_FAC_SubContrato(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim mensaje As String = ""

            Dim oSubContrato As New ENT_MOV_FAC_SubContrato
            oSubContrato.IdSubContrato = IdSubContrato
            oSubContrato.IdCliente = (oUsuario.IdCliente)
            oSubContrato.IdEmpleado = IdEmpleado
            'oSubContrato.FechaInicio = FechaValida(fechaInicio, "")
            'oSubContrato.FechaFin = FechaValida(fechaFin, "")
            oSubContrato.FechaCorte = diaCorte
            oSubContrato.FechaPago = diaPago
            oSubContrato.IdEstado = estado
            oSubContrato.usuario = oUsuario.vcUsu


            mensaje = logica.Guardar_Subcontrato(oSubContrato)
            logica.Dispose()
            Return mensaje

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            logica.Dispose()
        End Try
    End Function


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
