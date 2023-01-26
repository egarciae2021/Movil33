Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Auditoria.Constantes
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Comun.CuentaCobro.BL
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Reflection
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Facturacion_Consultar_Con_Fac_Movimientos
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                'Valida si es perfil de Recursos Humanos -- Jcamacho 21/10/2015
                Dim PerfilRecursos As Boolean = False
                If (oUsuario.Perfiles.Where(Function(x) x.P_inCod = 39).Count > 0) Then
                    PerfilRecursos = True
                End If

                'Dim vcTab As String = Request.QueryString("vcTab")
                Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                'Dim Exportar As String = Request.QueryString("Exportar")
                'If Exportar IsNot Nothing AndAlso Exportar = "1" Then
                '    Dim filtro As String = Request.QueryString("filtro")
                '    Dim valor As String = Request.QueryString("valor")
                '    Dim cnt As String = Request.QueryString("cnt")
                '    Dim adm As String = Request.QueryString("adm")
                '    Dim CodEmpleado As String = Request.QueryString("codEmpleado")
                '    ExportarExcel(valor, cnt, adm, CodEmpleado, inTipOri)
                '    Exit Sub
                'End If
                If Not IsPostBack Then
                    Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))
                    Dim inTip As Integer = Val("" & Request.QueryString("inTip"))

                    Dim oAuditoria As New ProcesaAuditoria()
                    oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    oAuditoria.Producto = AuditoriaConstantes.Name
                    oAuditoria.Modulo = AuditoriaConstantes.ModuloFacturacion.Name
                    oAuditoria.NombreUsuario = oUsuario.vcUsu
                    'AUDITORIA : Se inserta el Usuario Logeado
                    oAuditoria.Tabla = TableNames.Usuario
                    oAuditoria.Opcion = "[Movimientos]"
                    oAuditoria.Acceso()
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfOrganizacion.Value = oUsuario.F_vcCodInt
                    hdfAdmin.Value = "0"

                    'If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"
                    If UtilitarioWeb.Seguridad.EsAdministrador Or oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then hdfAdmin.Value = "1"

                    Dim vcCondicion As String = ""
                    'vcCondicion = "EMPL_btEST=1"
                    vcCondicion = vcCondicion + " EMPL_P_vcCODEMP in (Select IdEmpleado From MOV_FAC_Solicitud Where IdEstado = 1 AND Vigente = 1)"
                    If oUsuario.F_vcCodInt.ToString() <> "" Or PerfilRecursos = True Then
                        vcCondicion = vcCondicion + " AND EMPL_CodInt2 Like |" + oUsuario.F_vcCodInt + "%|"
                    Else
                        vcCondicion = vcCondicion + " AND EMPL_P_vcCODEMP = |" + oUsuario.Empleado.P_vcCod + "|"
                    End If


                    bpTecnicoResponsable.NombreEntidad = "Empleados"
                    bpTecnicoResponsable.vcTab = "M_EMPL"
                    bpTecnicoResponsable.TipoOrigen = 0
                    bpTecnicoResponsable.Condicion = vcCondicion
                    bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos"
                    bpTecnicoResponsable.RutaRaiz = "../../../"
                    bpTecnicoResponsable.Contenedor = "dvContenedorTecRes"
                    bpTecnicoResponsable.Descripcion = "EMPL_vcNOMEMP"
                    bpTecnicoResponsable.Codigo = "EMPL_P_vcCODEMP"
                    'JHERRERA 20141015: Oculta el mensaje de "No se encontraron datos"
                    bpTecnicoResponsable.MuestraMensajeNoDatos = False
                    '-->
                End If
                hdfinTipOri.Value = inTipOri.ToString()
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
   Public Shared Function getEmpleado(ByVal IdEmpleado As String, ByVal inTipOri As String) As ENT_GEN_Empleado
      Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As VisualSoft.Comun.CuentaCobro.BL.BL_GEN_Empleado = Nothing
        Try
            logica = New VisualSoft.Comun.CuentaCobro.BL.BL_GEN_Empleado(Integer.Parse(inTipOri), oUsuario.IdCliente)
            HttpContext.Current.Session("vcFiltro_Movimientos") = "EMPL_P_vcCODEMP" & "|" & IdEmpleado & "|" & 5
         Dim entidad As New ENT_GEN_Empleado
         entidad = logica.getEmpleados(IdEmpleado)
         Return entidad
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If logica IsNot Nothing Then logica.Dispose()
      End Try
   End Function

   <WebMethod()>
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function GetInfoSaldo(ByVal valor As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Pago)
      Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Pago = Nothing
        Try
            logica = New BL_MOV_FAC_Pago(Integer.Parse(inTipOri), oUsuario.IdCliente)

            Dim lista As New List(Of ENT_MOV_FAC_Pago)

         lista = logica.Consulta_Saldo(valor)

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
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
   Public Shared Function GetListaMovimientos(ByVal valor As String, ByVal cnt As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Pago)
      Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Pago = Nothing
        Try
            logica = New BL_MOV_FAC_Pago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim filtro As String = "EMPL_P_vcCODEMP"
         Dim lista As New List(Of ENT_MOV_FAC_Pago)
         HttpContext.Current.Session("vcFiltro_Movimientos") = filtro & "|" & valor & "|" & cnt
         lista = logica.Consulta_Movimientos(filtro, valor, cnt)

         Return lista
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If logica IsNot Nothing Then logica.Dispose()
      End Try


   End Function
   Protected Sub eegSolicitudes_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
      Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As BL_MOV_FAC_Pago = Nothing
        Try
            logica = New BL_MOV_FAC_Pago(Integer.Parse(1), oUsuario.IdCliente)

            Dim filtro As String = HttpContext.Current.Session("vcFiltro_Movimientos").ToString().Split("|")(0)
         Dim valor As String = HttpContext.Current.Session("vcFiltro_Movimientos").ToString().Split("|")(1)
         Dim cnt As String = HttpContext.Current.Session("vcFiltro_Movimientos").ToString().Split("|")(2)


         Dim dtDatos As New DataTable
         Dim lista As New List(Of ENT_MOV_FAC_Pago)

         Dim ent As New ENT_MOV_FAC_Pago

         If valor = "" Then

            'Dim table As New DataTable()
            'Dim fields() As FieldInfo = GetType(List(Of ENT_MOV_FAC_Pago)).GetFields()
            'For Each field In fields
            '    If field.Name = "IdEmpleado" Then
            '        dtDatos.Columns.Add("IdEmpleado", field.FieldType)
            '    ElseIf field.Name = "NombreEmpl" Then
            '        dtDatos.Columns.Add("Nombre Empleado", field.FieldType)
            '    ElseIf field.Name = "NombreEmpl" Then
            '        dtDatos.Columns.Add("Nombre Empleado", field.FieldType)
            '    ElseIf field.Name = "VcFecha" Then
            '        dtDatos.Columns.Add("Fecha", field.FieldType)
            '    ElseIf field.Name = "VcConceptoPago" Then
            '        dtDatos.Columns.Add("ConceptoPago", field.FieldType)
            '    ElseIf field.Name = "DcMontoPagado" Then
            '        dtDatos.Columns.Add("DcMontoPagado", field.FieldType)
            '    End If


            'Next
            'For Each item As T In List
            '    Dim row As DataRow = table.NewRow()
            '    For Each field As FieldInfo In fields
            '        row(field.Name) = field.GetValue(item)
            '    Next
            '    table.Rows.Add(row)
            'Next
            valor = "0"



         End If
         dtDatos = logica.Consulta_MovimientosExcel(filtro, valor, cnt)


         eegSolicitudes.ExportarDatos(dtDatos, "Movimientos_" + valor)
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally

         If logica IsNot Nothing Then logica.Dispose()
      End Try
   End Sub
   'Private Sub ExportarExcel(ByVal valor As String, ByVal cnt As String, ByVal adm As String, ByVal CodEmpleado As String, ByVal inTipOri As String)
   '    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
   '    Dim logica As BL_MOV_FAC_Pago = New BL_MOV_FAC_Pago(Integer.Parse(inTipOri), oUsuario.IdCliente)
   '    Try

   '        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(1, oUsuario.IdCliente)
   '        Dim lstCampo As List(Of ENT_ENT_Campo)
   '        lstCampo = Campo.Listar("MOV_FAC_Pago")
   '        Campo.Dispose()

   '        Dim filtro As String = "EMPL_P_vcCODEMP"
   '        Dim dtDatos As New DataTable
   '        dtDatos = logica.Consulta_MovimientosExcel(filtro, valor, cnt)
   '        logica.Dispose()

   '        If adm = "0" Then
   '            'Quitar Columna de Mensaje...
   '            If dtDatos.Columns.Contains("EMPL_P_vcCODEMP") Then dtDatos.Columns.Remove("EMPL_P_vcCODEMP")
   '            If dtDatos.Columns.Contains("EMPL_vcNOMEMP") Then dtDatos.Columns.Remove("EMPL_vcNOMEMP")

   '            For Each objCampo In lstCampo
   '                If objCampo.vcDes = "Cod. Empleado" Then lstCampo.Remove(objCampo) : Exit For
   '            Next

   '            For Each objCampo In lstCampo
   '                If objCampo.vcDes = "Empleado" Then lstCampo.Remove(objCampo) : Exit For
   '            Next
   '        End If

   '        Dim nom_reporte = "Movimientos_" + CodEmpleado

   '        If dtDatos IsNot Nothing Then
   '            Dim objExportarExcel As New UtilitarioWeb.ExportarExcel
   '            objExportarExcel.ExportDataTableToExcel(dtDatos, nom_reporte, lstCampo)

   '        End If
   '    Catch ex As Exception
   '        Dim util As New Utilitarios
   '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
   '        Throw New Exception(UtilitarioWeb.MensajeError)
   '    Finally
   '        logica.Dispose()
   '    End Try

   'End Sub
End Class
