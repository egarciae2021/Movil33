Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
Imports Utilitario
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_DashBoard_DashBoard_II
    Inherits System.Web.UI.Page

    Private Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim dash_incidencias As BL_DashBoard_Incidencias = Nothing
        Try

            If Not IsPostBack Then

                Me.hdfEsValido.Value = "1"

                Dim objUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)
                Dim niveles As New List(Of ENT_SOA_Nivel)
                Dim bolsas As New List(Of ENT_SOA_Bolsa)
                Dim tipos As New List(Of ENT_INC_Tipo)
                Dim tificaciones As New List(Of ENT_INC_Tipificacion)

                niveles = ListarNivel()

                If niveles.Count = 0 Then
                    Me.hdfEsValido.Value = "0"
                    Exit Sub
                End If

                bolsas = ListarBolsa(niveles(0).IdNivel)

                If bolsas.Count = 0 Then
                    Me.hdfEsValido.Value = "0"
                    Exit Sub
                End If

                For Each nivel As ENT_SOA_Nivel In niveles
                    Me.ddlNivel.Items.Add(New ListItem(nivel.Nombre, nivel.IdNivel))
                    Me.ddlNivelMeses.Items.Add(New ListItem(nivel.Nombre, nivel.IdNivel))
                Next

                For Each bolsa As ENT_SOA_Bolsa In bolsas
                    Me.ddlBolsa.Items.Add(New ListItem(bolsa.Nombre, bolsa.IdBolsa))
                Next

                Me.LlenarDdlMesesAtras(Me.ddlMesesTipo, 6)

                Dim PeriodoActual As String = Now.Year.ToString + Now.Month.ToString.PadLeft(2, "0")

                dash_incidencias = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base, objUsuario.IdCliente)
                Dim incidencias_meses As String = dash_incidencias.ObtieneCantidadIncidencias_porMes(bolsas(0).IdBolsa)
                Dim incidencias_AVG As String = dash_incidencias.ObtieneIncidencias_AVG(niveles(0).IdNivel, True, PeriodoActual)
                Dim incidencias_tipo As String = dash_incidencias.ObtieneIncidencias_cantidadPortipo(PeriodoActual, oCultura)

                If Not incidencias_tipo.Split("|")(0).ToString.Equals("OK") Then
                    Me.hdfEsValido.Value = "0"
                    Exit Sub
                End If
                incidencias_tipo = incidencias_tipo.Split("|")(1) + "|" + incidencias_tipo.Split("|")(2)
                Dim incidencias_tipificacion As String = dash_incidencias.ObtieneIncidencias_cantidadPorTipificacion(PeriodoActual, CInt(incidencias_tipo.Split("|")(1)), oCultura)

                Dim script As String = "var Incidencias_mes = '" + incidencias_meses + "'; "
                script = script + " var Incidencias_AVG = '" + incidencias_AVG + "'; "
                script = script + " var Incidencias_Tipo = '" + incidencias_tipo.Split("|")(0) + "'; "
                script = script + " var Incidencias_Tipificacion = '" + incidencias_tipificacion + "'; "
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "ScriptKey", script, True)
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash_incidencias IsNot Nothing Then dash_incidencias.Dispose()
        End Try
    End Sub

    Private Sub LlenarDdlMesesAtras(ByRef ddl As DropDownList, ByVal prMesesAtras As Integer)
        For index = 0 To prMesesAtras
            Dim mes As Date = Date.Now.AddMonths(-index)
            Select Case mes.Month
                Case 1
                    ddl.Items.Add(New ListItem("Ene " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 2
                    ddl.Items.Add(New ListItem("Feb " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 3
                    ddl.Items.Add(New ListItem("Mar " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 4
                    ddl.Items.Add(New ListItem("Abr " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 5
                    ddl.Items.Add(New ListItem("May " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 6
                    ddl.Items.Add(New ListItem("Jun " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 7
                    ddl.Items.Add(New ListItem("Jul " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 8
                    ddl.Items.Add(New ListItem("Ago " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 9
                    ddl.Items.Add(New ListItem("Sep " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 10
                    ddl.Items.Add(New ListItem("Oct " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case 11
                    ddl.Items.Add(New ListItem("Nov " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
                Case Else
                    ddl.Items.Add(New ListItem("Dic " + mes.Year.ToString, mes.Year.ToString + mes.Month.ToString.PadLeft(2, "0")))
                    Exit Select
            End Select
        Next
    End Sub

    <WebMethod()>
    Public Shared Function ActualizarIncidencias_porMes(ByVal prIdBolsa As Integer) As String

        Dim objBlDashIncidencias As BL_DashBoard_Incidencias = Nothing
        Try
            objBlDashIncidencias = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return objBlDashIncidencias.ObtieneCantidadIncidencias_porMes(prIdBolsa)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashIncidencias IsNot Nothing Then objBlDashIncidencias.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarAVG(ByVal prIdNivel As Integer, ByVal prAnoMes As String) As String

        Dim objBlDashIncidencias As BL_DashBoard_Incidencias = Nothing
        Try
            objBlDashIncidencias = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return objBlDashIncidencias.ObtieneIncidencias_AVG(prIdNivel, True, prAnoMes)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashIncidencias IsNot Nothing Then objBlDashIncidencias.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarTipificacion(ByVal prAnoMes As String, ByVal prIdTipo As Integer) As String

        Dim objBlDashIncidencias As BL_DashBoard_Incidencias = Nothing
        Try
            objBlDashIncidencias = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return objBlDashIncidencias.ObtieneIncidencias_cantidadPorTipificacion(prAnoMes, prIdTipo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashIncidencias IsNot Nothing Then objBlDashIncidencias.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarTipo(ByVal prAnoMes As String) As List(Of String)

        Dim objBlDashIncidencias As BL_DashBoard_Incidencias = Nothing
        Try
            objBlDashIncidencias = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim JsonTipo As String = objBlDashIncidencias.ObtieneIncidencias_cantidadPortipo(prAnoMes)
            Dim JsonTipificacion As String = objBlDashIncidencias.ObtieneIncidencias_cantidadPorTipificacion(prAnoMes, JsonTipo.Split("|")(2))

            Dim listaJson As New List(Of String)
            listaJson.Add(JsonTipo.Split("|")(1))
            listaJson.Add(JsonTipificacion)

            Return listaJson

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBlDashIncidencias IsNot Nothing Then objBlDashIncidencias.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarNivel() As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try

            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_SOA_Nivel) = nivel.ListarNivelConBolsa(-1)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then
                nivel.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_SOA_Bolsa) = bolsa.ListarBolsa_porNivelExacto(prIdNivel)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function
End Class
