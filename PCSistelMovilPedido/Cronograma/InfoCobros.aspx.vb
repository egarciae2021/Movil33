Imports VisualSoft.Comun.CuentaCobro.BE
Imports VisualSoft.Comun.CuentaCobro.BL
Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports System.Web.Script.Serialization
Imports System.Web.Script.Services
Imports VisualSoft.PCSistelMovil.General.BE

Public Class InfoCobros
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Empleado As Global.VisualSoft.Suite80.BL.BL_GEN_Empleado
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Dim viIdTecnico As Integer = -1

                If IsNothing(oUsuario) Then
                    Dim script As String = "window.top.location.reload();"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                Else
                    If Not IsPostBack Then

                        Dim PerfilRecursos As Boolean = False
                        If (oUsuario.Perfiles.Where(Function(x) x.P_inCod = 39).Count > 0) Then
                            PerfilRecursos = True
                        End If

                        hdfEmpleado.Value = oUsuario.Empleado.P_vcCod

                        Empleado = New Global.VisualSoft.Suite80.BL.BL_GEN_Empleado(oUsuario.IdCliente)
                        Dim oEmpleado As ENT_GEN_Empleado = Empleado.Mostrar(oUsuario.Empleado.P_vcCod)

                        lblCodigoEmpleado.Text = oEmpleado.P_vcCod
                        'lblNombreEmpleado.Text = Utilitario.ReemplazarTilder(oEmpleado.vcNom) & "<br>(" & oUsuario.Empleado.Correo & ")"
                        lblNombreEmpleado.Text = Utilitario.ReemplazarTilder(oEmpleado.vcNom)
                        lblArea.Text = Utilitario.ReemplazarTilder(oEmpleado.Area.vcNomOrg)
                        lblCCosto.Text = Utilitario.ReemplazarTilder(oEmpleado.CentroCosto.P_vcCodCenCos + " - " + oEmpleado.CentroCosto.vcNomCenCos)

                        txtFechaInicio.Text = DateTime.Now.AddMonths(-1).ToShortDateString
                        txtFechaFin.Text = DateTime.Now.ToShortDateString
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function GetListaCobros(ByVal FechaInicio As String, ByVal FechaFin As String, ByVal valor As String, ByVal montoMenora As String, ByVal montoMayora As String, ByVal inTipOri As String) As List(Of ENT_MOV_FAC_Pago)
        Dim logica As BL_MOV_FAC_Pago = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            logica = New BL_MOV_FAC_Pago(Integer.Parse(inTipOri), oUsuario.IdCliente)
            Dim lista As New List(Of ENT_MOV_FAC_Pago)

            Dim filtro As String = ""


            Dim strSQL = ""

            Dim valorMayor As Decimal = 0
            Dim valorMenor As Decimal = 0

            If valor <> "" Then
                strSQL = "WHERE EMPL_P_vcCODEMP = '" + valor + "'"
                If FechaInicio.Length = 8 AndAlso FechaInicio.IndexOf("/") = -1 AndAlso FechaFin.Length = 8 AndAlso FechaFin.IndexOf("/") = -1 Then
                    strSQL = strSQL + " AND Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
                Else
                    strSQL = strSQL + " AND Fecha >='" + FechaSql(FechaInicio) + "' AND Fecha <='" + FechaSql(FechaFin) + "'"
                End If
            Else
                If FechaInicio.Length = 8 AndAlso FechaInicio.IndexOf("/") = -1 AndAlso FechaFin.Length = 8 AndAlso FechaFin.IndexOf("/") = -1 Then
                    strSQL = "WHERE Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
                Else
                    strSQL = "WHERE Fecha >='" + FechaSql(FechaInicio) + "' AND Fecha <='" + FechaSql(FechaFin) + "'"
                End If
            End If

            If montoMayora <> String.Empty Then
                valorMayor = Convert.ToDecimal(montoMayora)
            End If
            If montoMenora <> String.Empty Then
                valorMenor = Convert.ToDecimal(montoMenora)
            End If

            If montoMenora <> String.Empty And montoMayora <> String.Empty Then
                If valorMayor < valorMenor Then
                    strSQL = strSQL + " AND MontoPagado" + " <=" + montoMenora.ToString() + " AND MontoPagado >=" + montoMayora.ToString()
                End If

            End If

            If montoMenora = String.Empty And montoMayora <> String.Empty Then
                strSQL = strSQL + " AND MontoPagado >=" + montoMayora.ToString()
            End If

            If montoMenora <> String.Empty And montoMayora = String.Empty Then
                strSQL = strSQL + " AND MontoPagado <=" + montoMenora.ToString()
            End If

            'HttpContext.Current.Session("vcFiltro_Cronograma") = FechaInicio & "|" & FechaFin & "|" & valor & "|" & montoMenora & "|" & montoMayora


            lista = logica.Consulta_Pagos(strSQL)
            Return lista

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function

    Shared Function FechaSql(ByVal Fecha As String) As String
        Dim dia As String
        Dim mes As String
        Dim anho As String
        dia = Fecha.Substring(0, 2)
        mes = Fecha.Substring(3, 2)
        anho = Fecha.Substring(6, 4)

        Return anho + mes + dia
    End Function

    Protected Sub eegSolicitudes_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegSolicitudes.ObtenerDatosAExportar
        Dim logica As BL_MOV_FAC_Pago = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            logica = New BL_MOV_FAC_Pago(Integer.Parse(1), oUsuario.IdCliente)
            Dim FechaInicio As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(0)
            Dim FechaFin As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(1)
            Dim valor As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(2)
            Dim montoMenora As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(3)
            Dim montoMayora As String = HttpContext.Current.Session("vcFiltro_Cronograma").ToString().Split("|")(4)

            Dim dtDatos As New DataTable
            Dim filtro As String = ""

            Dim strSQL = ""

            Dim valorMayor As Decimal = 0
            Dim valorMenor As Decimal = 0

            If valor <> "" Then
                strSQL = "WHERE EMPL_P_vcCODEMP = '" + valor + "'"
                strSQL = strSQL + " AND Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
            Else
                strSQL = "WHERE Fecha >='" + FechaInicio + "' AND Fecha <='" + FechaFin + "'"
            End If

            If montoMayora <> String.Empty Then
                valorMayor = Convert.ToDecimal(montoMayora)
            End If
            If montoMenora <> String.Empty Then
                valorMenor = Convert.ToDecimal(montoMenora)
            End If

            If montoMenora <> String.Empty And montoMayora <> String.Empty Then
                If valorMayor < valorMenor Then
                    strSQL = strSQL + " AND MontoPagado" + " <=" + montoMenora.ToString() + " AND MontoPagado >=" + montoMayora.ToString()
                End If

            End If

            If montoMenora = String.Empty And montoMayora <> String.Empty Then
                strSQL = strSQL + " AND MontoPagado >=" + montoMayora.ToString()
            End If

            If montoMenora <> String.Empty And montoMayora = String.Empty Then
                strSQL = strSQL + " AND MontoPagado <=" + montoMenora.ToString()
            End If



            dtDatos = logica.Consulta_PagosExcel(strSQL)
            logica.Dispose()

            'eegSolicitudes.ExportarDatos(dtDatos, "Pagos" + valor)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(Utilitario.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Sub
End Class