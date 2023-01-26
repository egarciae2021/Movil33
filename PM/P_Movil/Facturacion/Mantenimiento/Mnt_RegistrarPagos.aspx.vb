Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports VisualSoft.Comun.CuentaCobro.BL
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Mnt_RegistrarPagos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim PerfilRecursos = oUsuario.Perfiles.Where(Function(x) x.P_inCod = 39).Count > 0

                Dim vcCondicion As String = ""
                Dim codigoEmpleado As String = String.Empty
                'vcCondicion = "EMPL_btEST=1"
                'vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente= 1)"
                vcCondicion = vcCondicion + " EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente= 1)"
                'If oUsuario.F_vcCodInt.ToString() = "" Or PerfilRecursos <> True Then
                '    vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.Empleado.P_vcCod + "|"
                'Else
                '    vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
                '    codigoEmpleado = oUsuario.Empleado.P_vcCod
                'End If

                If oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then
                    vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
                Else
                    vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.Empleado.P_vcCod + "|"
                    codigoEmpleado = oUsuario.Empleado.P_vcCod
                End If

                bpEmpleados.NombreEntidad = "Empleados"
                bpEmpleados.vcTab = "M_EMPL"
                bpEmpleados.TipoOrigen = 0
                bpEmpleados.Condicion = vcCondicion
                bpEmpleados.FuncionPersonalizada = "fnMostrarDatos"
                bpEmpleados.RutaRaiz = "../../../"
                bpEmpleados.Contenedor = "dvContenBusqEmpleado"
                bpEmpleados.Descripcion = "EMPL_vcNOMEMP"
                bpEmpleados.Codigo = "EMPL_P_vcCODEMP"
                bpEmpleados.CodigoValor = codigoEmpleado
                bpEmpleados.MuestraMensajeNoDatos = False

                hdfCodEmpleado.Value = codigoEmpleado

                hdfFecServidor.Value = UtilitarioWeb.ObtieneFechaHoraANSIServidor(False)

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function RegistrarPagos(ByVal XML_Pagos As String) As List(Of ENT_MOV_FAC_Pago)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim oCultura As ENT_GEN_Cultura = Nothing
        Dim Facturacion As BL_MOV_FAC_Pago = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Facturacion = New BL_MOV_FAC_Pago(1, oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_Pago)
            Dim dt As New DataTable()

            dt = Facturacion.RegistrarPagos(XML_Pagos, oUsuario.IdCliente)

            For Each dr As DataRow In dt.Rows
                Dim oPago As New ENT_MOV_FAC_Pago()
                oPago.DcMontoPagado = UtilitarioWeb.DevuelveNumeroFormateado(UtilitarioWeb.ComprobarStringNULL(dr("MontoPagado"), "0"), UtilitarioWeb.DevuelveFormatoNumero(oCultura))
                oPago.IdEmpleado = UtilitarioWeb.ComprobarStringNULL(dr("IdEmpleado"), "")
                oPago.NombreEmpl = UtilitarioWeb.ComprobarStringNULL(dr("EMPL_vcNOMEMP"), "")
                oPago.VcConceptoPago = UtilitarioWeb.ComprobarStringNULL(dr("ConceptoPago"), "")
                'oPago.VcFecha = dr("Fecha").ToString().Substring(0, 10)
                oPago.VcFecha = IIf(IsDBNull(dr("Fecha")), "", dr("Fecha").ToString().Substring(0, 10))
                'oPago.VcPeriodo = dr("Periodo").ToString().Substring(4, 2) + "/" + dr("Periodo").ToString().Substring(0, 4)
                oPago.VcPeriodo = IIf(IsDBNull(dr("Periodo")), "", dr("Periodo").ToString().Substring(4, 2) + "/" + dr("Periodo").ToString().Substring(0, 4))
                oPago.OFormaPago = New ENT_MOV_FAC_FormaPago
                oPago.OFormaPago.Nombre = UtilitarioWeb.ComprobarStringNULL(dr("Tipo"), "")
                oPago.OFormaPago.Descripcion = UtilitarioWeb.ComprobarStringNULL(dr("Mensaje"), "")
                lista.Add(oPago)
            Next

            'Dim oPago_1 As New ENT_MOV_FAC_Pago()
            'oPago_1.DcMontoPagado = 253.3D
            'oPago_1.IdEmpleado = "000354"
            'oPago_1.NombreEmpl = "HAROLD YALTA GOMEZ"
            'oPago_1.VcConceptoPago = "wqfdsf"
            'oPago_1.VcFecha = "22/10/201"
            'oPago_1.VcPeriodo = "10/2015"
            'oPago_1.OFormaPago = New ENT_MOV_FAC_FormaPago
            'oPago_1.OEmpleado.vcNom = "Ingresado"
            'oPago_1.OEmpleado.vcDes = ""
            'lista.Add(oPago_1)

            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValidarDatosPago(ByVal IdEmpleado As String, ByVal Fecha As String, ByVal Monto As String, _
                                            ByVal Concepto As String, ByVal Periodo As String) As String
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Facturacion As BL_MOV_FAC_Pago = Nothing
        Dim Mensaje As String = String.Empty
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Facturacion = New BL_MOV_FAC_Pago(1, oUsuario.IdCliente)

            Dim oPago As New ENT_MOV_FAC_Pago()
            oPago.DcMontoPagado = Convert.ToDecimal(UtilitarioWeb.DevuelveNumeroSinFormato(Monto))
            oPago.IdEmpleado = IdEmpleado
            oPago.VcConceptoPago = Concepto
            oPago.VcFecha = Fecha
            'oPago.VcPeriodo = Periodo
            oPago.VcPeriodo = Periodo.Substring(2, 4) & Periodo.Substring(0, 2)


            Dim dt As DataTable = Facturacion.ValidarIngresoPago(oPago)
            Mensaje = dt(0)("Mensaje").ToString()

            Return Mensaje
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class