'Imports VisualSoft.Suite80.BE
Imports System.Diagnostics.Eventing.Reader
Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Auditoria
Imports System.Collections.Generic
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services


Public Class P_Movil_DashBoard_DashBoard_Facturacion
    Inherits System.Web.UI.Page

    ' =============================================================================================================================
    '   LOAD
    ' =============================================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Operador As BL_GEN_Operador = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim blGrupoConcepto As BL_PCS_MOV_GrupoConcepto = Nothing

        Dim dashboard As BL_DashBoard = Nothing
        Dim Bl_Facturacion As BL_MOV_IMP_Facturacion = Nothing
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim list_Expresado As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Dim oParametros As BL_MOV_Parametros = New BL_MOV_Parametros(oUsuario.IdCliente)

            Dim strValorTotal As String = oParametros.Mostrar("TituloImporteTotal", "TituloImporteTotal").Valor

            If (String.IsNullOrEmpty(strValorTotal)) Then
                strValorTotal = "Importe Total"
            End If
            lblImporteTotal.InnerHtml = strValorTotal



            Operador = New BL_GEN_Operador(oUsuario.IdCliente)
            LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            dashboard = New BL_DashBoard(oUsuario.IdCliente)

            Dim ent01 As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio
            ent01.vcGrupo01 = "Costo"
            ent01.vcGrupo02 = "1"

            Dim ent02 As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio
            ent02.vcGrupo01 = "Consumo"
            ent02.vcGrupo02 = "2"

            list_Expresado.Add(ent01)
            list_Expresado.Add(ent02)
            hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
            UtilitarioWeb.Dataddl(dwTipoLinea, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "--Ambos--"), "vcDescripcion", "P_inCod")
            'UtilitarioWeb.Dataddl(dwDesde, list_, "vcGrupo01", "vcGrupo02")
            UtilitarioWeb.Dataddl(dwHasta, list_, "vcGrupo01", "vcGrupo02")
            UtilitarioWeb.Dataddl(dwExpresado, list_Expresado, "vcGrupo01", "vcGrupo02")
            UtilitarioWeb.Dataddl(dwOperador, Operador.Listar(-1, "<Todos>"), "vcNomOpe", "P_inCodOpe")
            'UtilitarioWeb.Dataddl(dwOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

            blGrupoConcepto = New BL_PCS_MOV_GrupoConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            UtilitarioWeb.Dataddl(ddlGrupo1, blGrupoConcepto.ListarxMostrarDashboard(-1, "<Todos>"), "VcNomGruSer", "P_InCodGruSer")
            UtilitarioWeb.Dataddl(ddlGrupo2, blGrupoConcepto.ListarxMostrarDashboard(-1, "<Todos>"), "VcNomGruSer", "P_InCodGruSer")


            'UtilitarioWeb.Dataddl(ddlGrupo2, blGrupoConcepto.ListarxMostrarDashboard(-1, "Todos", 2, True), "VcNomGruSer", "P_InCodGruSer")

            'ddlGrupo2.Items.Remove(ddlGrupo2.Items.FindByValue("-1"))


            'Dim item As ListItem = ddlGrupo2.Items.FindByText("Voz")
            'If Not item Is Nothing Then
            '    ddlGrupo2.Items.FindByText("Voz").Selected = True
            'End If

            Dim fecDesde As String = ""

            Dim dt As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "ParametrosReporte", "", "", "", "", "", "", "", "")

            Dim script As String = ""

            For Each row As DataRow In dt.Rows

                Dim clave As String = row("Clave")
                Dim valor As String = row("Valor")

                If clave = "dwDesde" Then
                    script = script + " var p_dwDesde = '" + valor + "';"
                    fecDesde = valor
                End If
                If clave = "dwHasta" Then
                    script = script + " var p_dwHasta = '" + valor + "';"
                End If
                If clave = "dwOperador" Then
                    script = script + " var p_dwOperador = '" + valor + "';"
                End If
                If clave = "dwExpresado" Then
                    script = script + " var p_dwExpresado = '" + valor + "';"
                End If
                'If clave = "dwTipoLinea" Then
                '    script = script + " var p_dwTipoLinea = '" + valor + "';"
                'End If

            Next

            'Tipo de Linea - wapumayta - 02-11-2015
            Dim General = New General()
            Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
            If hdfCodLinTip_X_User.Value <> 0 Then
                dwTipoLinea.Enabled = False
                dwTipoLinea.SelectedValue = hdfCodLinTip_X_User.Value

                lblTipoLinea.Style.Add("display", "none")
                dwTipoLinea.Style.Add("display", "none")

            End If

            '--
            dwDesde.Items.Clear()

            Dim miDateTime As Date
            Dim diferencia As Integer

            If Request.QueryString("pe") IsNot Nothing Then
                miDateTime = Date.ParseExact("20" + fecDesde.Substring(5, 2) + fecDesde.Substring(0, 2) + "010000", "yyyyMMddhhmm", Nothing)
            Else
                miDateTime = Date.Now
            End If
            diferencia = DateDiff(DateInterval.Month, miDateTime, Date.Today)
            For i = 0 To 11
                Dim mes As Date
                If Request.QueryString("pe") IsNot Nothing Then
                    If diferencia > 6 Then
                        mes = miDateTime.AddMonths(6 - i)
                    Else
                        mes = miDateTime.AddMonths(diferencia - i)
                    End If
                Else
                    mes = miDateTime.AddMonths(-i)
                End If
                Select Case mes.Month
                    Case 1
                        dwDesde.Items.Add(New ListItem("Enero " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 2
                        dwDesde.Items.Add(New ListItem("Febrero " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 3
                        dwDesde.Items.Add(New ListItem("Marzo " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 4
                        dwDesde.Items.Add(New ListItem("Abril " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 5
                        dwDesde.Items.Add(New ListItem("Mayo " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 6
                        dwDesde.Items.Add(New ListItem("Junio " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 7
                        dwDesde.Items.Add(New ListItem("Julio " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 8
                        dwDesde.Items.Add(New ListItem("Agosto " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 9
                        dwDesde.Items.Add(New ListItem("Septiembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 10
                        dwDesde.Items.Add(New ListItem("Octubre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case 11
                        dwDesde.Items.Add(New ListItem("Noviembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                    Case Else
                        dwDesde.Items.Add(New ListItem("Diciembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                        Exit Select
                End Select
            Next


            Bl_Facturacion = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)
            Dim inNoMostrarGrupo As Integer = 0
            Dim dsGrupo As DataSet = Bl_Facturacion.ObtieneGrupoConceptoxMostrarDashboard(0)
            If dsGrupo.Tables(0).Rows.Count > 0 Then
                inNoMostrarGrupo = Convert.ToInt32(dsGrupo.Tables(0).Rows(0)(0))
            End If
            script = script + " var inNoMostrarGrupo = " & inNoMostrarGrupo & ";"
            Dim strGruposAgrup As String = String.Empty
            If dsGrupo.Tables(1).Rows.Count > 0 Then
                For i = 0 To dsGrupo.Tables(1).Rows.Count - 1
                    strGruposAgrup = strGruposAgrup + dsGrupo.Tables(1).Rows(i)("Grupo").ToString() + ", "
                Next
                strGruposAgrup = strGruposAgrup.Substring(0, strGruposAgrup.Length - 2)
            End If
            script = script + " var strGruposAgrup = '" & strGruposAgrup & "';"

            '----
            If dwOperador.Items.Count = 2 Then
                dwOperador.Enabled = False
                dwOperador.SelectedIndex = 1
            End If

            'JPAREJA 29/12/2021 mostrar organizacion
            Dim nomOrga As String = "<Todos>"
            Dim codOrga As String = "-1"
            Try
                If Request.QueryString("nombreArea") IsNot Nothing Then
                    txtNomOrganizacion.Text = Request.QueryString("nombreArea").Replace("*60*", "<").Replace("*62*", ">")
                    hdfCodOrganizacion.Value = Request.QueryString("codigoArea")

                    nomOrga = txtNomOrganizacion.Text
                    codOrga = hdfCodOrganizacion.Value
                End If
            Catch ex As Exception
                txtNomOrganizacion.Text = "<Todos>"
                hdfCodOrganizacion.Value = "-1"
            End Try

            script = script + " var p_NombreOrga = '" & nomOrga & "'; var p_CodigoOrga = '" & codOrga & "'; "

            'ECONDEÑA   11/10/2016
            If oCultura IsNot Nothing Then
                hdfTipoMoneda.Value = oCultura.Moneda.vcSimMon
                hdfSepDecimal.Value = oCultura.vcSimDec
                hdfSepMiles.Value = oCultura.vcSimSepMil
                hdfNumDecimales.Value = oCultura.dcNumDec

            End If

            Try
                lblPeriodo.Text = dwDesde.SelectedItem.Text
            Catch ex As Exception
            End Try


            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blGrupoConcepto IsNot Nothing Then blGrupoConcepto.Dispose()
            If dashboard IsNot Nothing Then dashboard.Dispose()
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
            If Operador IsNot Nothing Then Operador.Dispose()
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try

    End Sub

    <WebMethod()>
    Public Shared Function Grafico_TopTen_Consumo(ByVal p_vcMesInicial As String, ByVal p_idGrupo As String, ByVal p_idOperador As String,
                                                  ByVal p_inTipLin As String, ByVal p_vcCodCue As String, ByVal TipoTopTenConsumo As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            p_vcCodCue = p_vcCodCue.Replace("|", "'")
            Dim dt As DataTable = bl_.Listar_Resumen("topten_consumo", p_idGrupo, TipoTopTenConsumo, p_inTipLin, p_vcCodCue, "", p_idOperador, p_vcMesInicial, "")

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                        ent.vcGrupo01 = dt.Rows(fila)("vcNum").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("vcCodCue").ToString()
                        ent.vcGrupo07 = dt.Rows(fila)("Total").ToString()

                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_TopTen_Servicio(ByVal p_vcMesInicial As String, ByVal p_idGrupo As String,
                                                ByVal p_idOperador As String, ByVal p_inTipLin As String,
                                                ByVal p_vcCodCue As String, ByVal TipoTopTenCosto As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Dim GEN_Cultura As BL_GEN_Cultura = Nothing
        Dim GEN_Cliente As BL_GEN_Cliente = Nothing
        Dim oCultura As ENT_GEN_Cultura
        Dim GEN_Region As BL_GEN_Regi = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            GEN_Cultura = New BL_GEN_Cultura(oUsuario.IdCliente)
            GEN_Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            GEN_Region = New BL_GEN_Regi(oUsuario.IdCliente)
            Dim dtDatosCliente As DataTable = GEN_Cliente.Mostrar(oUsuario.IdCliente)
            If dtDatosCliente IsNot Nothing AndAlso dtDatosCliente.Rows(0)("inIdCultura") <> 0 Then
                oCultura = GEN_Cultura.Mostrar(dtDatosCliente.Rows(0)("inIdCultura"))
            Else
                oCultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
            End If

            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            p_vcCodCue = p_vcCodCue.Replace("|", "'")

            ''Validar criterio 3
            Dim dt As DataTable = bl_.Listar_Resumen("topten_servicio", p_idGrupo, TipoTopTenCosto, p_inTipLin, p_vcCodCue, "", p_idOperador, p_vcMesInicial, "")

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("vcSer").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("vcCodCue").ToString()
                        'ent.vcGrupo07 = UtilitarioWeb.DevuelveNumeroFormateado(dt.Rows(fila)("Total").ToString(), oCultura)
                        ent.vcGrupo07 = dt.Rows(fila)("Total").ToString()

                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
            If GEN_Cultura IsNot Nothing Then GEN_Cultura.Dispose()
            If GEN_Cliente IsNot Nothing Then GEN_Cliente.Dispose()
            If GEN_Region IsNot Nothing Then GEN_Region.Dispose()
        End Try
    End Function


    <WebMethod()>
    Public Shared Function Grafico_TopTen_Costo(ByVal p_vcMesInicial As String, ByVal p_idGrupo As String,
                                                ByVal p_idOperador As String, ByVal p_inTipLin As String,
                                                ByVal p_vcCodCue As String, ByVal TipoTopTenCosto As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Dim GEN_Cultura As BL_GEN_Cultura = Nothing
        Dim GEN_Cliente As BL_GEN_Cliente = Nothing
        Dim oCultura As ENT_GEN_Cultura
        Dim GEN_Region As BL_GEN_Regi = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            GEN_Cultura = New BL_GEN_Cultura(oUsuario.IdCliente)
            GEN_Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            GEN_Region = New BL_GEN_Regi(oUsuario.IdCliente)
            Dim dtDatosCliente As DataTable = GEN_Cliente.Mostrar(oUsuario.IdCliente)
            If dtDatosCliente IsNot Nothing AndAlso dtDatosCliente.Rows(0)("inIdCultura") <> 0 Then
                oCultura = GEN_Cultura.Mostrar(dtDatosCliente.Rows(0)("inIdCultura"))
            Else
                oCultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
            End If

            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            p_vcCodCue = p_vcCodCue.Replace("|", "'")

            ''Validar criterio 3
            Dim dt As DataTable = bl_.Listar_Resumen("topten_costo", p_idGrupo, TipoTopTenCosto, p_inTipLin, p_vcCodCue, "", p_idOperador, p_vcMesInicial, "")

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("vcNum").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("vcCodCue").ToString()
                        'ent.vcGrupo07 = UtilitarioWeb.DevuelveNumeroFormateado(dt.Rows(fila)("Total").ToString(), oCultura)
                        ent.vcGrupo07 = dt.Rows(fila)("Total").ToString()

                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
            If GEN_Cultura IsNot Nothing Then GEN_Cultura.Dispose()
            If GEN_Cliente IsNot Nothing Then GEN_Cliente.Dispose()
            If GEN_Region IsNot Nothing Then GEN_Region.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_Historico_Periodo(ByVal vcNomGrupo As String, ByVal vcNomMes As String, ByVal inTipLin As String, _
                                        ByVal vcNomCuenta As String, ByVal p_vcMesInicial As String, ByVal p_vcMesFin As String, _
                                        ByVal p_idOperador As String, ByVal p_idExpresado As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            If p_idExpresado = "null" Then p_idExpresado = "-1"
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            vcNomCuenta = vcNomCuenta.Replace("|", "'")
            Dim dtTem As DataTable = bl_.Listar_Resumen("Grafico_Historico", vcNomGrupo, vcNomMes, inTipLin, vcNomCuenta, p_idExpresado, p_idOperador, p_vcMesInicial, p_vcMesFin)

            If dtTem.Rows(0)(0).ToString() <> "0" AndAlso dtTem.Columns.Count > 1 Then
                Dim temp1 As Integer = 0
                Dim temp2 As Integer = 0

                For i As Integer = 0 To dtTem.Rows.Count - 1
                    temp1 = temp1 + Convert.ToDecimal(dtTem.Rows(i)("nuValor").ToString())
                    temp2 = temp2 + Convert.ToDecimal(dtTem.Rows(i)("TotalLineas").ToString())
                Next

                If temp1 <> 0 AndAlso temp2 <> 0 Then
                    Dim fila As Integer = 0
                    For Each row As DataRow In dtTem.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()


                        ent.vcGrupo01 = dtTem.Rows(fila)("Id").ToString()
                        ent.vcGrupo03 = dtTem.Rows(fila)("nuValor").ToString()
                        ent.vcGrupo07 = dtTem.Rows(fila)("TotalLineas").ToString()
                        Dim anio As String = dtTem.Rows(fila)("Anio").ToString()

                        Dim res As String = ""
                        Select Case dtTem.Rows(fila)("Mes").ToString()
                            Case 1
                                res = "Ene"
                            Case 2
                                res = "Feb"
                            Case 3
                                res = "Mar"
                            Case 4
                                res = "Abr"
                            Case 5
                                res = "May"
                            Case 6
                                res = "Jun"
                            Case 7
                                res = "Jul"
                            Case 8
                                res = "Ago"
                            Case 9
                                res = "Set"
                            Case 10
                                res = "Oct"
                            Case 11
                                res = "Nov"
                            Case 12
                                res = "Dic"
                        End Select

                        ent.vcGrupo10 = dtTem.Rows(fila)("Mes").ToString().PadLeft(2, "0") + "" + anio.Substring(2, 2)

                        ent.vcGrupo05 = res & "" & anio.Substring(2)

                        ent.vcGrupo21 = ent.vcGrupo01.Substring(0)

                        fila = fila + 1

                        list_.Add(ent)
                    Next

                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try

    End Function

    <WebMethod()>
    Public Shared Function Datos_Modal(ByVal p_vcNum As String, ByVal p_mesPer As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)
            Dim dt As DataTable = bl_.Listar_Resumen("cabecera_datos", "", p_vcNum, "", "", "", "", p_mesPer, "")

            If dt.Rows.Count > 0 Then
                Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                ent.vcGrupo01 = dt.Rows(0)("daPer").ToString()
                ent.vcGrupo02 = dt.Rows(0)("codEmp").ToString()
                ent.vcGrupo03 = dt.Rows(0)("nomEmp").ToString()
                ent.vcGrupo04 = dt.Rows(0)("vcNomOpe").ToString()
                ent.vcGrupo05 = dt.Rows(0)("vcNum").ToString()
                ent.vcGrupo06 = dt.Rows(0)("codCue").ToString()
                ent.vcGrupo07 = dt.Rows(0)("codOpe").ToString()
                ent.vcGrupo08 = dt.Rows(0)("nomCue").ToString()
                ent.vcGrupo09 = dt.Rows(0)("codInt").ToString()
                ent.vcGrupo10 = dt.Rows(0)("vcNomOrg").ToString()

                list_.Add(ent)

            End If
            Return list_
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Datos_Periodo(ByVal p_vcPer As String, ByVal p_idOperador As String, p_vcCodCue As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)
            p_vcCodCue = p_vcCodCue.Replace("|", "'")
            Dim dt As DataTable = bl_.Listar_Resumen("cabecera_datos", "", "", "", p_vcCodCue, "", p_idOperador, p_vcPer, "")

            If dt.Rows.Count > 0 Then

                For Each fila As DataRow In dt.Rows
                    Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                    ent.vcGrupo01 = fila("codCue").ToString()
                    ent.vcGrupo02 = fila("nomCue").ToString()
                    ent.vcGrupo03 = fila("codOpe").ToString()
                    ent.vcGrupo04 = fila("vcNomOpe").ToString()
                    ent.vcGrupo05 = fila("vcCodCia").ToString()
                    ent.vcGrupo06 = fila("inLin").ToString()
                    ent.vcGrupo07 = fila("daPer").ToString()

                    list_.Add(ent)
                Next
            End If
            Return list_
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    ' =============================================================================================================================
    ' LISTA Grafico PIE
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Grafico_Inferior(ByVal vcNomGrupo As String, ByVal vcNomMes As String, ByVal inTipLin As String, ByVal vcNomCuenta As String,
                                            ByVal p_vcMesInicial As String, ByVal p_vcMesFin As String, _
                                            ByVal p_idOperador As String, ByVal p_idExpresado As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            ' =====================================
            ' VARIABLES
            ' =====================================
            If p_idExpresado = "null" Then p_idExpresado = "-1"
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            ' =====================================
            ' DATOS
            ' =====================================
            vcNomCuenta = vcNomCuenta.Replace("|", "'")
            Dim dt As DataTable = bl_.Listar_Resumen("Grafico_Inferior", vcNomGrupo, vcNomMes, inTipLin, vcNomCuenta, p_idExpresado, p_idOperador, p_vcMesInicial, p_vcMesFin)
            ' =====================================
            ' BUCLE
            ' =====================================
            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("inValor")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("vcPeriodo").ToString()
                            ent.vcGrupo02 = dt.Rows(fila)("vcServicio").ToString()
                            ent.vcGrupo03 = dt.Rows(fila)("inValor").ToString()

                            ent.vcGrupo21 = dt.Rows(fila)("vcNomAbrv").ToString()

                            fila = fila + 1

                            'If ent.vcGrupo03 > 0 Then
                            list_.Add(ent)
                            'End If
                        Else
                            fila = fila + 1
                        End If

                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    ' =============================================================================================================================
    ' ACTUALIZAR DATA
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Guarda_ParametrosReporte(ByVal p_vcNomGrupo_Para As String, ByVal p_vcValor_Para As String) As Integer
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Dim dt As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "Guarda_ParametrosReporte", p_vcNomGrupo_Para, p_vcValor_Para, "", "", "", "", "", "")
            'MsgBox(dt.Rows.Count)

            Return dt.Rows.Count

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    ' =============================================================================================================================
    ' DATA GRUPO SERVICIO
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Listar_GrupoServicio(ByVal p_vcMesInicial As String, ByVal p_vcMesFin As String, ByVal p_idOperador As String,
                                                ByVal p_idExpresado As String, ByVal p_inTipLin As String, ByVal p_vcCodCuenta As String) _
                                            As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            ' ==============================================================
            ' VARIABLES
            ' ==============================================================
            If p_idExpresado = "null" Then p_idExpresado = "-1"

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Dim i As Integer = 1
            Dim inTotal As Double = 0

            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

            ' ==============================================================
            ' DATOS
            ' ==============================================================
            p_vcCodCuenta = p_vcCodCuenta.Replace("|", "'")
            Dim dt As DataTable = bl_.Listar_Resumen("datos_Grupo", "", "", p_inTipLin, p_vcCodCuenta, p_idExpresado, p_idOperador, p_vcMesInicial, p_vcMesFin)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then


                    ' ==============================================================
                    ' CALCULAR TOTAL
                    ' ==============================================================
                    'For Each column As DataColumn In dt.Columns
                    '    Dim a As String = dt.Rows(0)(column.Caption).ToString

                    '    If IsNumeric(a) Then

                    '        inTotal = inTotal + a
                    '    End If
                    'Next

                    'dt.Columns.Add("Total")
                    'dt.Rows(0)("Total") = inTotal

                    ' ==============================================================
                    ' CARGA LISTA
                    ' ==============================================================
                    For Each column As DataColumn In dt.Columns

                        If i = 1 Then
                            ent.vcGrupo01 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 2 Then
                            ent.vcGrupo02 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 3 Then
                            ent.vcGrupo03 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 4 Then
                            ent.vcGrupo04 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 5 Then
                            ent.vcGrupo05 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 6 Then
                            ent.vcGrupo06 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 7 Then
                            ent.vcGrupo07 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 8 Then
                            ent.vcGrupo08 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 9 Then
                            ent.vcGrupo09 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 10 Then
                            ent.vcGrupo10 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 11 Then
                            ent.vcGrupo11 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 12 Then
                            ent.vcGrupo12 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 13 Then
                            ent.vcGrupo13 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 14 Then
                            ent.vcGrupo14 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 15 Then
                            ent.vcGrupo15 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 16 Then
                            ent.vcGrupo16 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 17 Then
                            ent.vcGrupo17 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 18 Then
                            ent.vcGrupo18 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 19 Then
                            ent.vcGrupo19 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        ElseIf i = 20 Then
                            ent.vcGrupo20 = column.Caption + "*" + dt.Rows(0)(column.Caption).ToString()
                        End If

                        i = i + 1

                    Next

                    list_.Add(ent)

                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    ' =============================================================================================================================
    ' CABECERA GRUPO SERVICIO
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Cabecera_GrupoServicio(ByVal p_vcModo As String, ByVal p_vcCriterio As String,
                                                  ByVal p_idExpresado As String, ByVal p_vcMesInicial As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try

            Dim nuRows As Integer = 0
            If p_idExpresado = "null" Then p_idExpresado = "-1"
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)
            Dim list__ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            ' =======================================================================
            ' GRUPO SERVICIO
            ' =======================================================================
            If p_vcModo = "Grupo_Servicio" Then

                'Dim dtCabeceraGrupo As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "cabecera_Grupo", "", "", "", "", "", "", "", "")

                Dim dtCabeceraGrupo As DataTable = bl_.Listar_Resumen("cabecera_Grupo", "", "", "", "", p_idExpresado, "", p_vcMesInicial, "")

                For Each fila As DataRow In dtCabeceraGrupo.Rows
                    If fila("btEst") = "1" Then
                        Dim ent01 As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                        ent01.IdGrupo = fila("inOrden")
                        ent01.vcGrupo = fila("vcNomGruSer")
                        ent01.vcGrupo01 = fila("P_in_CodGruSer")
                        ent01.vcGrupoWidth = fila("inWidth1")
                        ent01.vcGrupoAlign = fila("vcAlign1")
                        'ent01.vcColor = fila("vcColor")
                        list__.Add(ent01)
                    End If
                Next

            End If

            ' =======================================================================
            ' GRUPO MES
            ' =======================================================================

            If p_vcModo = "Grupo_Mes" Then

                Dim dtCabeceraCuenta As DataTable = bl_.Listar_Resumen("cabecera_Cuenta", p_vcCriterio, "", "", "", p_idExpresado, "", p_vcMesInicial, "")
                For Each fila As DataRow In dtCabeceraCuenta.Rows
                    ' If fila("AlignColumn") = "1" Then

                    Dim ent01 As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                    'ent01.IdGrupo = fila("inOrden")
                    ent01.vcGrupo = fila("vcCodCue")
                    ent01.vcGrupoWidth = fila("inWidth1")
                    ent01.vcGrupoAlign = fila("Align2")
                    'ent01.vcColor = fila("vcColor")
                    list__.Add(ent01)
                    'End If
                Next


            End If

            ' =======================================================================
            ' SERVICIO POR MESES DE GRUPO SERVICIO
            ' =======================================================================
            If p_vcModo = "Servicio_GrupoServicio" Then


                'Dim dtCabeceraGrupo As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "cabecera_servicio", p_vcCriterio, "", "", "", "", "", "", "")

                Dim dtCabeceraGrupo As DataTable = bl_.Listar_Resumen("cabecera_servicio", p_vcCriterio, "", "", "", p_idExpresado, "", p_vcMesInicial, "")

                For Each fila As DataRow In dtCabeceraGrupo.Rows
                    ' If fila("AlignColumn") = "1" Then

                    Dim ent01 As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                    ent01.IdGrupo = fila("inOrden")
                    ent01.vcGrupo = fila("vcServicio")
                    ent01.vcGrupoWidth = fila("inWidth")
                    ent01.vcGrupoAlign = fila("vcAlign")
                    'ent01.vcColor = fila("vcColor")
                    list__.Add(ent01)
                    'End If
                Next



            End If

            ' =======================================================================
            ' AGREGAR COLUMNA TOTAL
            ' =======================================================================
            If p_vcModo = "Grupo_Servicio" Then


                Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                ent.IdGrupo = 99
                ent.vcGrupo = "Total"
                ent.vcGrupoWidth = "125"
                ent.vcGrupoAlign = "center"
                'ent.vcColor = ""
                list__.Add(ent)
            End If

            Return list__



        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String, ByVal codAreaSeleccionada As String) As List(Of ENT_MOV_Cuenta)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            Dim FiltroCodSucursalesParaCuentas As String = ""

            If (codAreaSeleccionada <> "") Then

                FiltroCodSucursalesParaCuentas = "( CodigoOrganizacion LIKE '" & codAreaSeleccionada & "%' OR ISNULL(CodigoOrganizacion,'') = '') OR"

            ElseIf (oUsuario.F_vcCodInt.Contains(",")) Then

                Dim arrayCodigosAreas As String() = oUsuario.F_vcCodInt.Split(",")

                For Each codigo As String In arrayCodigosAreas
                    'CodigoOrganizacion LIKE @CodInt + '%' OR ISNULL(CodigoOrganizacion,'') = ''
                    FiltroCodSucursalesParaCuentas += "( CodigoOrganizacion LIKE '" & codigo.ToString & "%' OR ISNULL(CodigoOrganizacion,'') = '') OR"
                Next
            End If

            If (FiltroCodSucursalesParaCuentas <> "") Then
                FiltroCodSucursalesParaCuentas = FiltroCodSucursalesParaCuentas.Substring(0, FiltroCodSucursalesParaCuentas.Length - 3)
            End If

            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperadorConFiltro(Convert.ToInt32(inCodOpe), oUsuario.P_inCod, FiltroCodSucursalesParaCuentas)
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Cuenta) Then Cuenta.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDetalleGrupoServicio(ByVal p_vcMesInicial As String, ByVal p_idGrupo As String,
                                                ByVal p_idOperador As String,
                                                ByVal p_vcCodCue As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Dim GEN_Cultura As BL_GEN_Cultura = Nothing
        Dim GEN_Cliente As BL_GEN_Cliente = Nothing
        Dim oCultura As ENT_GEN_Cultura
        Dim GEN_Region As BL_GEN_Regi = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")

            GEN_Cultura = New BL_GEN_Cultura(oUsuario.IdCliente)
            GEN_Cliente = New BL_GEN_Cliente(oUsuario.IdCliente)
            GEN_Region = New BL_GEN_Regi(oUsuario.IdCliente)
            Dim dtDatosCliente As DataTable = GEN_Cliente.Mostrar(oUsuario.IdCliente)
            If dtDatosCliente IsNot Nothing AndAlso dtDatosCliente.Rows(0)("inIdCultura") <> 0 Then
                oCultura = GEN_Cultura.Mostrar(dtDatosCliente.Rows(0)("inIdCultura"))
            Else
                oCultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
            End If

            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            p_vcCodCue = p_vcCodCue.Replace("|", "'")

            ''Validar criterio 3
            Dim dt As DataTable = bl_.Listar_Resumen("detalle_GrupoServicio", p_idGrupo, "", "", p_vcCodCue, "", p_idOperador, p_vcMesInicial, "")

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then

                    Dim fila As Integer = 0
                    For Each row As DataRow In dt.Rows
                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                        ent.vcGrupo01 = dt.Rows(fila)("CodConcepto").ToString()
                        ent.vcGrupo02 = dt.Rows(fila)("Grupo_Servicio").ToString()
                        ent.vcGrupo03 = dt.Rows(fila)("Concepto").ToString()
                        'ent.vcGrupo07 = UtilitarioWeb.DevuelveNumeroFormateado(dt.Rows(fila)("Total").ToString(), oCultura)
                        ent.vcGrupo07 = dt.Rows(fila)("Total_por_Concepto").ToString()

                        fila = fila + 1

                        list_.Add(ent)
                    Next
                End If
            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
            If GEN_Cultura IsNot Nothing Then GEN_Cultura.Dispose()
            If GEN_Cliente IsNot Nothing Then GEN_Cliente.Dispose()
            If GEN_Region IsNot Nothing Then GEN_Region.Dispose()
        End Try
    End Function

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = "1"
        ''For p As Integer = 0 To oUsuario.Perfiles.Count - 1
        ''    If (vcPerfiles = "") Then
        ''        If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
        ''            vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
        ''        ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
        ''            vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
        ''        ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
        ''            vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
        ''        End If
        ''    Else
        ''        If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
        ''            vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
        ''        ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
        ''            vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
        ''        ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
        ''            vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
        ''        End If
        ''    End If
        ''Next
        ' ''---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        ''If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
        ''    vcPerfil = "0"
        ''ElseIf vcPerfiles <> "" Then
        ''    vcPerfil = vcPerfiles.ToString()
        ''End If

        Return vcPerfil

    End Function

    ' =============================================================================================================================
    ' ENTIDAD ENT_GEN_GrupoServicio
    ' =============================================================================================================================
#Region "clase GrupoServicio"
    Class ENT_GEN_GrupoServicio

#Region "Declaracion"
        Private _IdGrupo As String
        Private _vcGrupo As String
        Public _vcGrupoWidth As String
        Public _vcGrupoAlign As String

        Public _vcGrupoServicio As String
        Public _vcServicioEnlace As String
        Public _vcPrefijo As String
        Public _vcAbrt As String
        Public _vcPosicion As String
        Public _vcColor As String

        Public _vcGrupo01 As String
        Public _vcGrupo02 As String
        Public _vcGrupo03 As String
        Public _vcGrupo04 As String
        Public _vcGrupo05 As String
        Public _vcGrupo06 As String
        Public _vcGrupo07 As String
        Public _vcGrupo08 As String
        Public _vcGrupo09 As String
        Public _vcGrupo10 As String
        Public _vcGrupo11 As String
        Public _vcGrupo12 As String
        Public _vcGrupo13 As String
        Public _vcGrupo14 As String
        Public _vcGrupo15 As String
        Public _vcGrupo16 As String
        Public _vcGrupo17 As String
        Public _vcGrupo18 As String
        Public _vcGrupo19 As String
        Public _vcGrupo20 As String

        ''Cambio ECONDEÑA
        Public _vcGrupo21 As String

        Public _vcGrupoWidth01 As String
        Public _vcGrupoWidth02 As String
        Public _vcGrupoWidth03 As String
        Public _vcGrupoWidth04 As String
        Public _vcGrupoWidth05 As String
        Public _vcGrupoWidth06 As String
        Public _vcGrupoWidth07 As String
        Public _vcGrupoWidth08 As String

#End Region

#Region "Métodos"

        Public Property vcColor() As String
            Get
                Return _vcColor
            End Get
            Set(ByVal value As String)
                _vcColor = value
            End Set
        End Property

        Public Property vcServicioEnlace() As String
            Get
                Return _vcServicioEnlace
            End Get
            Set(ByVal value As String)
                _vcServicioEnlace = value
            End Set
        End Property

        Public Property vcPrefijo() As String
            Get
                Return _vcPrefijo
            End Get
            Set(ByVal value As String)
                _vcPrefijo = value
            End Set
        End Property

        Public Property vcAbrt() As String
            Get
                Return _vcAbrt
            End Get
            Set(ByVal value As String)
                _vcAbrt = value
            End Set
        End Property

        Public Property vcPosicion() As String
            Get
                Return _vcPosicion
            End Get
            Set(ByVal value As String)
                _vcPosicion = value
            End Set
        End Property

        Public Property vcGrupoServicio() As String
            Get
                Return _vcGrupoServicio
            End Get
            Set(ByVal value As String)
                _vcGrupoServicio = value
            End Set
        End Property

        Public Property vcGrupoAlign() As String
            Get
                Return _vcGrupoAlign
            End Get
            Set(ByVal value As String)
                _vcGrupoAlign = value
            End Set
        End Property

        Public Property vcGrupoWidth() As String
            Get
                Return _vcGrupoWidth
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth = value
            End Set
        End Property

        Public Property vcGrupoWidth01() As String
            Get
                Return _vcGrupoWidth01
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth01 = value
            End Set
        End Property

        Public Property vcGrupoWidth02() As String
            Get
                Return _vcGrupoWidth02
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth02 = value
            End Set
        End Property

        Public Property vcGrupoWidth03() As String
            Get
                Return _vcGrupoWidth03
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth03 = value
            End Set
        End Property

        Public Property vcGrupoWidth04() As String
            Get
                Return _vcGrupoWidth04
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth04 = value
            End Set
        End Property

        Public Property vcGrupoWidth05() As String
            Get
                Return _vcGrupoWidth05
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth05 = value
            End Set
        End Property

        Public Property vcGrupoWidth06() As String
            Get
                Return _vcGrupoWidth06
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth06 = value
            End Set
        End Property

        Public Property vcGrupoWidth07() As String
            Get
                Return _vcGrupoWidth07
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth07 = value
            End Set
        End Property

        Public Property vcGrupoWidth08() As String
            Get
                Return _vcGrupoWidth08
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth08 = value
            End Set
        End Property


        Public Property IdGrupo() As String
            Get
                Return _IdGrupo
            End Get
            Set(ByVal value As String)
                _IdGrupo = value
            End Set
        End Property

        Public Property vcGrupo() As String
            Get
                Return _vcGrupo
            End Get
            Set(ByVal value As String)
                _vcGrupo = value
            End Set
        End Property

        Public Property vcGrupo01() As String
            Get
                Return _vcGrupo01
            End Get
            Set(ByVal value As String)
                _vcGrupo01 = value
            End Set
        End Property

        Public Property vcGrupo02() As String
            Get
                Return _vcGrupo02
            End Get
            Set(ByVal value As String)
                _vcGrupo02 = value
            End Set
        End Property

        Public Property vcGrupo03() As String
            Get
                Return _vcGrupo03
            End Get
            Set(ByVal value As String)
                _vcGrupo03 = value
            End Set
        End Property

        Public Property vcGrupo04() As String
            Get
                Return _vcGrupo04
            End Get
            Set(ByVal value As String)
                _vcGrupo04 = value
            End Set
        End Property

        Public Property vcGrupo05() As String
            Get
                Return _vcGrupo05
            End Get
            Set(ByVal value As String)
                _vcGrupo05 = value
            End Set
        End Property

        Public Property vcGrupo06() As String
            Get
                Return _vcGrupo06
            End Get
            Set(ByVal value As String)
                _vcGrupo06 = value
            End Set
        End Property

        Public Property vcGrupo07() As String
            Get
                Return _vcGrupo07
            End Get
            Set(ByVal value As String)
                _vcGrupo07 = value
            End Set
        End Property

        Public Property vcGrupo08() As String
            Get
                Return _vcGrupo08
            End Get
            Set(ByVal value As String)
                _vcGrupo08 = value
            End Set
        End Property

        Public Property vcGrupo09() As String
            Get
                Return _vcGrupo09
            End Get
            Set(ByVal value As String)
                _vcGrupo09 = value
            End Set
        End Property

        Public Property vcGrupo10() As String
            Get
                Return _vcGrupo10
            End Get
            Set(ByVal value As String)
                _vcGrupo10 = value
            End Set
        End Property

        Public Property vcGrupo11() As String
            Get
                Return _vcGrupo11
            End Get
            Set(ByVal value As String)
                _vcGrupo11 = value
            End Set
        End Property

        Public Property vcGrupo12() As String
            Get
                Return _vcGrupo12
            End Get
            Set(ByVal value As String)
                _vcGrupo12 = value
            End Set
        End Property

        Public Property vcGrupo13() As String
            Get
                Return _vcGrupo13
            End Get
            Set(ByVal value As String)
                _vcGrupo13 = value
            End Set
        End Property

        Public Property vcGrupo14() As String
            Get
                Return _vcGrupo14
            End Get
            Set(ByVal value As String)
                _vcGrupo14 = value
            End Set
        End Property

        Public Property vcGrupo15() As String
            Get
                Return _vcGrupo15
            End Get
            Set(ByVal value As String)
                _vcGrupo15 = value
            End Set
        End Property

        Public Property vcGrupo16() As String
            Get
                Return _vcGrupo16
            End Get
            Set(ByVal value As String)
                _vcGrupo16 = value
            End Set
        End Property

        Public Property vcGrupo17() As String
            Get
                Return _vcGrupo17
            End Get
            Set(ByVal value As String)
                _vcGrupo17 = value
            End Set
        End Property

        Public Property vcGrupo18() As String
            Get
                Return _vcGrupo18
            End Get
            Set(ByVal value As String)
                _vcGrupo18 = value
            End Set
        End Property

        Public Property vcGrupo19() As String
            Get
                Return _vcGrupo19
            End Get
            Set(ByVal value As String)
                _vcGrupo19 = value
            End Set
        End Property

        Public Property vcGrupo20() As String
            Get
                Return _vcGrupo20
            End Get
            Set(ByVal value As String)
                _vcGrupo20 = value
            End Set
        End Property

        Public Property vcGrupo21() As String
            Get
                Return _vcGrupo21
            End Get
            Set(value As String)
                _vcGrupo21 = value
            End Set
        End Property
#End Region

    End Class
#End Region

End Class
