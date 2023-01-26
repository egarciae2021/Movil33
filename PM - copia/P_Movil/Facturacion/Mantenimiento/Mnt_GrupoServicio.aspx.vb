Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Web.Script.Services
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class Mnt_GrupoServicio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim blGrupoConcepto As BL_PCS_MOV_GrupoConcepto = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                ttInfoPos.Mensaje = "Este campo mostrará la posición que va a ocupar este grupo en la grilla de resumen del Dashboard."
                ttInfoMos.Mensaje = "Al activar esta opción, va a determinar si este grupo se va mostrar en el resumen del Dashboard y en los reportes."
                ttInfoSumGru.Mensaje = "Al activar esta opción, va a determinar si el valor mostrado en los dashboard, resumen y reportes se sumará al total a visualizar. Si está opcion está activa se va a habilitar la visualización de la siguiente opción."
                If Not IsPostBack Then
                    Dim vcCodGrupo As String = Request.QueryString("Cod")

                    If vcCodGrupo IsNot Nothing Then
                        vcCodGrupo = vcCodGrupo.Replace(",", "").Replace(".", "")
                        If IsNumeric(vcCodGrupo) Then
                            vcCodGrupo = Int(Val(vcCodGrupo))
                        End If
                        blGrupoConcepto = New BL_PCS_MOV_GrupoConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oGrupoResumen As ENT_PCS_MOV_GrupoConcepto = blGrupoConcepto.Mostrar(Convert.ToInt32(vcCodGrupo))

                        hdfCodGrupCon.Value = vcCodGrupo
                        txtNombre.Text = oGrupoResumen.VcNomGruSer
                        txtAbrNom.Text = oGrupoResumen.VcNomAbrv
                        txtFechaInicio.Text = "" & oGrupoResumen.DtFecIni
                        chkMostrarDashboard.Checked = oGrupoResumen.BtMostrarEnDashboard
                        chkSumatoriaGrupo.Checked = oGrupoResumen.BtSumatoriaGrupo

                        txtPos.Text = oGrupoResumen.InOrden
                        
                        chkEstado.Checked = oGrupoResumen.BtEst
                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If

                        'ECONDEÑA   13/10/2016
                        hdfTipoGrupo.Value = oGrupoResumen.InTipoGrupo
                        If hdfTipoGrupo.Value <> "1" Then
                            trMostrarDash.Style("display") = "none"
                            chkMostrarDashboard.Enabled = False
                        End If
                        'END ECONDEÑA   13/10/2016
                    Else
                        hdfCodGrupCon.Value = ""
                        trEstado.Style("display") = "none"
                    End If
                End If
            End If


            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blGrupoConcepto IsNot Nothing Then blGrupoConcepto.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal cod As String, oGrupoConcepto As String) As Integer
        Dim bl_PCS_MOV_GrupoConcepto As BL_PCS_MOV_GrupoConcepto = Nothing
        Try
            bl_PCS_MOV_GrupoConcepto = New BL_PCS_MOV_GrupoConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oSerializer As New JavaScriptSerializer
            Dim oGrupo As ENT_PCS_MOV_GrupoConcepto = oSerializer.Deserialize(Of ENT_PCS_MOV_GrupoConcepto)(oGrupoConcepto)

            Dim resultado As Integer
            If cod = "" Then
                oGrupo.BtEst = True
                resultado = bl_PCS_MOV_GrupoConcepto.Insertar(oGrupo)
            Else
                oGrupo.P_InCodGruSer = Convert.ToInt32(cod)
                resultado = bl_PCS_MOV_GrupoConcepto.Actualizar(oGrupo)
            End If

            Return resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(bl_PCS_MOV_GrupoConcepto) Then bl_PCS_MOV_GrupoConcepto.Dispose()
        End Try
    End Function

    'Protected Sub chActivo_CheckedChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles chActivo.CheckedChanged
    '    If Me.chActivo.Checked Then
    '        hdfEstadoGruOri.Value = 1
    '    Else
    '        hdfEstadoGruOri.Value = 0
    '    End If
    'End Sub

    <WebMethod()> _
 <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ObtenerModelos_GrupoOrigen(ByVal pIdGrupoOrigen As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcFiltro As String) As Object
        Dim GrupoOrigen As BL_GEN_GrupoOrigen = Nothing
        Try
            GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim ds As DataSet = GrupoOrigen.ObtenerModelosDis_GrupoOrigen(pIdGrupoOrigen, vcFiltro.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """"))
            GrupoOrigen.Dispose()
            Dim dtModelosGrilla As DataTable = ds.Tables(0)
            Return JQGrid.DatosJSON(dtModelosGrilla, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If GrupoOrigen IsNot Nothing Then GrupoOrigen.Dispose()
        End Try
    End Function

    <WebMethod()> _
 <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ObtenerEmpleados_GrupoOrigen(ByVal pIdGrupoOrigen As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, _
                                                        ByVal pidTipoLin As Integer, ByVal vcFiltro As String) As Object
        Dim Empleados As BL_GEN_EmpleadoG = Nothing
        Try
            Empleados = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim ds As DataSet = Empleados.ObtenerEmpleados_GrupoOrigen(pIdGrupoOrigen, vcFiltro.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """"), pidTipoLin)
            Empleados.Dispose()
            Dim dtEmpleadosGrilla As DataTable = ds.Tables(0)
            Return JQGrid.DatosJSON(dtEmpleadosGrilla, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleados IsNot Nothing Then Empleados.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ProcesarModeloGrupoOrigen(ByVal p_inCodGrupoOrigen As Integer, ByVal p_inCodModeloDispositivo As Integer, ByVal esAdd As Boolean) As String
        Dim GrupoOrigen As BL_GEN_GrupoOrigen = Nothing
        Dim resultado As String = String.Empty
        Try
            GrupoOrigen = New BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            resultado = GrupoOrigen.ProcesarModeloGrupoOrigen(p_inCodGrupoOrigen, p_inCodModeloDispositivo, esAdd)
            GrupoOrigen.Dispose()
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If GrupoOrigen IsNot Nothing Then GrupoOrigen.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ProcesarEmpleadosGrupoOrigen(ByVal p_inCodGrupoOrigen As Integer, ByVal p_vcCodEmpleado As String, ByVal p_inIdTipLin As Integer, ByVal esAdd As Boolean) As String
        Dim Empleados As BL_GEN_EmpleadoG = Nothing
        Dim resultado As String = String.Empty
        Try
            Empleados = New BL_GEN_EmpleadoG(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            resultado = Empleados.ProcesarEmpleadoGrupoOrigen(p_inCodGrupoOrigen, p_vcCodEmpleado, p_inIdTipLin, esAdd)
            Empleados.Dispose()
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleados IsNot Nothing Then Empleados.Dispose()
        End Try
    End Function


End Class
