Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class Con_Fac_Resumen
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Operador As BL_GEN_Operador = Nothing
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
                    bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")

                    Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

                    Dim FechaActual As Date = DateTime.Now()
                    Dim inMesActual As Integer = FechaActual.Month
                    Dim inAnoActual As Integer = FechaActual.Year
                    For i As Integer = 0 To 12

                        Dim vcValue As String = IIf(inMesActual < 10, "0", "") + inMesActual.ToString + "-" + inAnoActual.ToString
                        Dim vcTexto As String = IIf(inMesActual = 1, "Ene - ", IIf(inMesActual = 2, "Feb - ", IIf(inMesActual = 3, "Mar - ", IIf(inMesActual = 4, "Abr - ", IIf(inMesActual = 5, "May - ", IIf(inMesActual = 6, "Jun - ", IIf(inMesActual = 7, "Jul - ", IIf(inMesActual = 8, "Ago - ", IIf(inMesActual = 9, "Sep - ", IIf(inMesActual = 10, "Oct - ", IIf(inMesActual = 11, "Nov - ", "Dic - "))))))))))) + " " + inAnoActual.ToString

                        Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio
                        ent.vcGrupo01 = vcTexto
                        ent.vcGrupo02 = vcValue

                        list_.Add(ent)

                        If inMesActual = 1 Then
                            inMesActual = 12
                            inAnoActual = inAnoActual - 1
                        Else
                            inMesActual = inMesActual - 1
                        End If
                    Next

                    UtilitarioWeb.Dataddl(ddlPeriodo, list_, "vcGrupo01", "vcGrupo02")

                    Dim fecDesde As String = ""
                    Dim dt As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "ParametrosReporte", "", "", "", "", "", "", "", "")

                    Dim script As String = ""

                    For Each row As DataRow In dt.Rows

                        Dim clave As String = row("Clave")
                        Dim valor As String = row("Valor")
                        Dim new_valor As String = ""

                        If clave = "dwDesde" Then
                            script = script + " var p_dwPeriodo = '" + valor + "';"
                            fecDesde = valor
                        End If
                        If clave = "dwOperador" Then
                            For i As Integer = 0 To ddlOperador.Items.Count - 1
                                If ddlOperador.SelectedValue = valor AndAlso valor <> "-1" Then
                                    new_valor = valor
                                    Exit For
                                Else
                                    new_valor = ""
                                End If
                            Next
                            script = script + " var p_dwOperador = '" + new_valor + "';"
                        End If

                    Next
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                'btnExportarResumenFacturacion.Visible = True
                'If ddlOperador.SelectedValue <> "" Or ddlOperador.SelectedValue <> Nothing Then
                '    btnExportarResumenFacturacion.Visible = False
                'End If


            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Operador) Then Operador.Dispose()
            If Not IsNothing(bl_) Then bl_.Dispose()
        End Try
    End Sub

    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    <WebMethod()>
    Public Shared Function Cabecera_ResumenCuenta_x_Periodo(ByVal p_mesPer As String,
                                                            ByVal p_codOpe As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)
            Dim lstModel As New List(Of ENT_GEN_GrupoServicio)
            Dim dt As DataTable = bl_.Listar_Resumen(p_mesPer, "cabecera_cuenta", "", "", "", p_codOpe, "", "-1", "", -1, -1, -1)

            If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then
                For Each fila As DataRow In dt.Rows

                    Dim ent01 As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                    ent01.vcGrupo = fila("vcNomCampo")
                    ent01.vcGrupo01 = fila("vcDesCampo")
                    ent01.vcGrupo02 = fila("hidden")
                    ent01.btGrupoHidden = Convert.ToBoolean(fila("hidden").ToString())
                    ent01.vcGrupoWidth = fila("width")
                    ent01.vcGrupoAlign = fila("align")

                    lstModel.Add(ent01)

                Next

                Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                ent.IdGrupo = 99
                ent.vcGrupo = "Total"
                ent.vcGrupo01 = "Total"
                ent.vcGrupoWidth = "80px"
                ent.vcGrupoAlign = "right"
                lstModel.Add(ent)
            End If

            Return lstModel
            'Return JQGrid.DatosJSON(list_, dt.Rows.Count, 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(bl_) Then bl_.Dispose()
        End Try
    End Function


    'Public Shared Function Lista_ResumenCuenta_x_Periodo(ByVal p_mesPer As String, ByVal p_codOpe As String) As List(Of ENT_GEN_GrupoServicio)
    <WebMethod()>
    Public Shared Function Lista_ResumenCuenta_x_Periodo(ByVal p_mesPer As String,
                                                         ByVal p_codOpe As String,
                                                         ByVal Linea As String, ByVal Cuenta As String) As List(Of String)
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim lista As List(Of String) = New List(Of String)

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            'Dim lista As List(Of String) = New List(Of String)

            UtilitarioWeb.ActualizarCultura(oCultura)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)
            If Linea = "" Then
                Linea = "-1"
            End If

            Dim FiltroCodSucursalesParaCuentas As String = ""

            If (oUsuario.F_vcCodInt.Contains(",")) Then

                Dim arrayCodigosAreas As String() = oUsuario.F_vcCodInt.Split(",")

                For Each codigo As String In arrayCodigosAreas
                    'CodigoOrganizacion LIKE @CodInt + '%' OR ISNULL(CodigoOrganizacion,'') = ''
                    FiltroCodSucursalesParaCuentas += "("
                    FiltroCodSucursalesParaCuentas += "C.CodigoOrganizacion LIKE '" & codigo.ToString & "%' OR ISNULL(C.CodigoOrganizacion,'') = ''"
                    FiltroCodSucursalesParaCuentas += ") OR"
                Next
            End If

            If (FiltroCodSucursalesParaCuentas <> "") Then
                FiltroCodSucursalesParaCuentas = FiltroCodSucursalesParaCuentas.Substring(0, FiltroCodSucursalesParaCuentas.Length - 3)
            End If

            Dim dt As DataTable = bl_.Listar_Resumen_ConFiltro(p_mesPer, "resumen_cuenta", "", "", "", p_codOpe, "", Linea, "", -1, -1, oUsuario.P_inCod, FiltroCodSucursalesParaCuentas, Cuenta)

            If dt Is Nothing OrElse dt.Rows.Count = 0 Then
                'Return list_
                Return lista
            End If

            If dt.Columns.Count > 1 Then
                'If dt.Rows(0)(0).ToString() <> "0" AndAlso dt.Columns.Count > 1 Then
                If Not dt.Columns.Contains("Total") Then
                    dt.Columns.Add("Total")
                End If
                '' =====================================
                '' CALCULA TOTAL
                '' =====================================

                For Each fil As DataRow In dt.Rows
                    Dim nutotal As Decimal = 0
                    For i As Integer = 2 To dt.Columns.Count - 1
                        If Not fil.IsNull(i) Then
                            Dim strVal As String = fil(i).ToString()


                            If (oCultura.vcCodCul.ToLower() <> "es-bo") Then
                                strVal = strVal.Replace(oCultura.vcSimSepMil, "")
                                If oCultura.vcSimDec <> "." Then
                                    strVal = strVal.Replace(oCultura.vcSimDec, ".")
                                End If
                            End If

                            'Edgar Garcia 13/07/2022
                            If (oCultura.vcCodCul.ToLower() = "es-bo") Then
                                strVal = strVal.Replace(oCultura.vcSimSepMil, "")
                                If oCultura.vcSimDec = "." Then
                                    strVal = strVal.Replace(oCultura.vcSimDec, ",")
                                End If

                            End If

                            Dim d As Decimal = 0D
                                If Double.TryParse(strVal, d) Then
                                    nutotal = nutotal + d
                                End If


                            End If
                    Next

                    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
                    Dim strMonto As String = Convert.ToDecimal(nutotal).ToString(strForNum)

                    fil.SetField("Total", strMonto)
                Next

                Dim fila As Integer = 0

                For Each row As DataRow In dt.Rows

                    Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
                    Dim i As Integer = 1

                    ' =====================================
                    ' COLUMNAS
                    ' =====================================

                    For Each column As DataColumn In dt.Columns

                        If i = 1 Then
                            ent.vcGrupo01 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 2 Then
                            ent.vcGrupo02 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 3 Then
                            ent.vcGrupo03 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo03 = "0.00"
                            'Else
                            '    ent.vcGrupo03 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 4 Then
                            ent.vcGrupo04 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo04 = "0.00"
                            'Else
                            '    ent.vcGrupo04 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 5 Then
                            ent.vcGrupo05 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo05 = "0.00"
                            'Else
                            '    ent.vcGrupo05 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 6 Then
                            ent.vcGrupo06 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo06 = "0.00"
                            'Else
                            '    ent.vcGrupo06 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 7 Then
                            ent.vcGrupo07 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo07 = "0.00"
                            'Else
                            '    ent.vcGrupo07 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 8 Then
                            ent.vcGrupo08 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo08 = "0.00"
                            'Else
                            '    ent.vcGrupo08 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 9 Then
                            ent.vcGrupo09 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo09 = "0.00"
                            'Else
                            '    ent.vcGrupo09 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 10 Then
                            ent.vcGrupo10 = dt.Rows(fila)(column.Caption).ToString()
                            'If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            '    ent.vcGrupo10 = "0.00"
                            'Else
                            '    ent.vcGrupo10 = dt.Rows(fila)(column.Caption).ToString()
                            'End If
                        ElseIf i = 11 Then
                            ent.vcGrupo11 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 12 Then
                            ent.vcGrupo12 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 13 Then
                            ent.vcGrupo13 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 14 Then
                            ent.vcGrupo14 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 15 Then
                            ent.vcGrupo15 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 16 Then
                            ent.vcGrupo16 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 17 Then
                            ent.vcGrupo17 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 18 Then
                            ent.vcGrupo18 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 19 Then
                            ent.vcGrupo19 = dt.Rows(fila)(column.Caption).ToString()
                        ElseIf i = 20 Then
                            ent.vcGrupo20 = dt.Rows(fila)(column.Caption).ToString()
                        End If

                        i = i + 1

                    Next

                    fila = fila + 1

                    list_.Add(ent)
                Next





                lista.Add(configurarColumnas_MultiPais(dt, oCultura))
                lista.Add(obtenerJson(dt, oCultura))

                '    Return lista
            End If

            Return lista
            'Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(bl_) Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Cabecera_ResumenLinea_x_Cuenta(ByVal p_vcModo As String, ByVal p_vcCriterio As String, ByVal p_idExpresado As String, ByVal p_vcMesInicial As String) As List(Of Con_Fac_Consulta.ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)
            Dim list__ As List(Of Con_Fac_Consulta.ENT_GEN_GrupoServicio) = New List(Of Con_Fac_Consulta.ENT_GEN_GrupoServicio)

            Dim dtCabeceraCuenta As DataTable = bl_.Listar_Resumen("cabecera_resumen", p_vcCriterio, "", "", "", p_idExpresado, "", p_vcMesInicial, "")
            For Each fila As DataRow In dtCabeceraCuenta.Rows

                Dim ent01 As Con_Fac_Consulta.ENT_GEN_GrupoServicio = New Con_Fac_Consulta.ENT_GEN_GrupoServicio()

                ent01.vcGrupo = fila("vcDes")
                ent01.vcGrupo01 = fila("vcNomAlias")
                ent01.vcGrupoWidth = fila("inWidth2")
                ent01.vcGrupoAlign = fila("vcAlign2")

                list__.Add(ent01)

            Next

            Dim ent As Con_Fac_Consulta.ENT_GEN_GrupoServicio = New Con_Fac_Consulta.ENT_GEN_GrupoServicio()
            ent.IdGrupo = 99
            ent.vcGrupo = "Total"
            ent.vcGrupo01 = "Total"
            ent.vcGrupoWidth = "80px"
            ent.vcGrupoAlign = "right"
            list__.Add(ent)

            Return list__

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(bl_) Then bl_.Dispose()
        End Try
    End Function


    'NUEVO
    <WebMethod()>
    Public Shared Function ListarLineas(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String,
                                        ByVal oCriterio As String, ByVal p_mesTabla As String, ByVal Linea As String, ByVal vcCuenta As String) As Object ' String
        Dim lista As BL_MOV_IMP_Facturacion = Nothing
        Try
            lista = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcCodCue As String = ""
            If vcCuenta <> "" Then
                If v_oCriterio.Cuentas.Count > 0 Then
                    For Each oCuenta As ENT_MOV_Cuenta In v_oCriterio.Cuentas
                        vcCodCue += oCuenta.P_vcCod
                    Next
                End If
            End If

            Dim vcCodOpe As Integer
            If v_oCriterio.Operadores.Count > 0 Then
                For Each oOperador As ENT_GEN_Operador In v_oCriterio.Operadores
                    vcCodOpe += oOperador.P_inCodOpe
                Next
            End If

            If (vcOrdCol = "Otros Cobros") Then
                vcOrdCol = "[Otros Cobros]"
            End If

            Dim dt As DataTable = lista.Listar_Resumen(p_mesTabla, "resumen_lineasPorCuenta", "", "", "", vcCodOpe.ToString(), vcCodCue, Linea, "", -1, -1, oUsuario.P_inCod, vcOrdCol, vcTipOrdCol)

            If Not dt.Columns.Contains("Total") Then
                dt.Columns.Add("Total")
            End If
            '' =====================================
            '' CALCULA TOTAL
            '' =====================================

            'For Each fil As DataRow In dt.Rows
            '    Dim nutotal As Decimal = 0
            '    For i As Integer = 5 To dt.Columns.Count - 1
            '        If Not fil.IsNull(i) Then
            '            Dim strVal As String = fil(i).ToString()
            '            strVal = strVal.Replace(oCultura.vcSimSepMil, "")
            '            If oCultura.vcSimDec <> "." Then
            '                strVal = strVal.Replace(oCultura.vcSimDec, ".")
            '            End If
            '            Dim d As Decimal = 0D
            '            If Double.TryParse(strVal, d) Then
            '                nutotal = nutotal + d
            '            End If
            '        End If
            '    Next

            '    Dim strForNum = UtilitarioWeb.DevuelveFormatoNumeroGenerico(oCultura)
            '    Dim strMonto As String = Convert.ToDecimal(nutotal).ToString(strForNum)

            '    fil.SetField("Total", strMonto)
            'Next

            If vcOrdCol <> "" Then

                Dim dvData As New DataView(dt)
                dt = dvData.ToTable()
            End If

            Dim TotalPaginas As Integer
            Dim TotalRegistros As Integer
            Dim inResto As Integer
            TotalRegistros = dt.Rows.Count
            TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
            If inResto > 0 Then TotalPaginas = TotalPaginas + 1

            'Dim dt2 As DataTable
            'dt2 = dt.Copy()
            'dt2.Columns.Add("Ver_Detalle")

            Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If lista IsNot Nothing Then lista.Dispose()
        End Try
    End Function





    ''ANTERIOR
    '<WebMethod()>
    'Public Shared Function ListarLineas(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, _
    '                                    ByVal vcTipOrdCol As String, ByVal oCriterio As String, ByVal p_mesTabla As String, _
    '                                    ByVal Linea As String) As String
    '    Try
    '        Dim lista As BL_MOV_IMP_Facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim oSerializer As New JavaScriptSerializer
    '        Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)

    '        Dim vcCodCue As String = ""
    '        If v_oCriterio.Cuentas.Count > 0 Then
    '            For Each oCuenta As ENT_MOV_Cuenta In v_oCriterio.Cuentas
    '                vcCodCue += oCuenta.P_vcCod
    '            Next
    '        End If

    '        Dim vcCodOpe As Integer
    '        If v_oCriterio.Operadores.Count > 0 Then
    '            For Each oOperador As ENT_GEN_Operador In v_oCriterio.Operadores
    '                vcCodOpe += oOperador.P_inCodOpe
    '            Next
    '        End If
    '        'Dim ds As DataSet = bl_.Listar_Resumen("cabecera_resumen", p_vcCriterio, "", "", "", p_idExpresado, "", p_vcMesInicial, "")

    '        Dim ds As DataSet = lista.ListarResumenPorCuenta(v_oCriterio, p_mesTabla, inPagTam, inPagAct, vcOrdCol, vcTipOrdCol, vcCodOpe, vcCodCue, Linea)
    '        lista.Dispose()

    '        Dim dict As New Dictionary(Of String, Object)
    '        Dim dictJqGrid As New Dictionary(Of String, Object)
    '        Dim lstItems As New List(Of Object)

    '        dictJqGrid.Add("PaginaActual", Convert.ToInt32(ds.Tables(0).Rows(0)("PaginaActual")))
    '        dictJqGrid.Add("TotalPaginas", Convert.ToInt32(ds.Tables(0).Rows(0)("TotalPaginas")))
    '        dictJqGrid.Add("TotalRegistros", Convert.ToInt32(ds.Tables(0).Rows(0)("TotalRegistros")))

    '        For i As Integer = 0 To ds.Tables(1).Rows.Count - 1
    '            Dim dictItemDet As New Dictionary(Of String, Object)
    '            Dim lstRow As New List(Of String)

    '            dictItemDet.Add("ID", ds.Tables(1).Rows(i)(0).ToString())

    '            For j As Integer = 0 To ds.Tables(1).Rows(i).ItemArray.Count - 1
    '                lstRow.Add(ds.Tables(1).Rows(i)(j).ToString())
    '            Next

    '            dictItemDet.Add("Row", lstRow)
    '            lstItems.Add(dictItemDet)
    '        Next

    '        dictJqGrid.Add("Items", lstItems)
    '        dict.Add("JQGrid", dictJqGrid)
    '        dict.Add("vcTab", ds.Tables(2).Rows(0)("vcNomTab").ToString())






    '        Return oSerializer.Serialize(dict)

    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function


    <WebMethod()>
    Public Shared Function Listar_Cabecera_Linea(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String,
                                                 ByVal oCriterio As String, ByVal p_mesTabla As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Dim lst As New List(Of ENT_GEN_GrupoServicio)

        Try

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            bl_ = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


            Dim vcCodCue As String = ""
            If v_oCriterio.Cuentas.Count > 0 Then
                For Each oCuenta As ENT_MOV_Cuenta In v_oCriterio.Cuentas
                    vcCodCue += oCuenta.P_vcCod
                Next
            End If

            Dim vcCodOpe As Integer
            If v_oCriterio.Operadores.Count > 0 Then
                For Each oOperador As ENT_GEN_Operador In v_oCriterio.Operadores
                    vcCodOpe += oOperador.P_inCodOpe
                Next
            End If
            Dim dt As New DataTable
            dt.Columns.Add("vcNomCon")
            dt.Rows.Add("RowNumber")
            dt.Rows.Add("vcNum")
            dt.Rows.Add("Cuenta")
            dt.Rows.Add("Operador")
            dt.Rows.Add("Empleado")
            For Each fila As DataRow In dt.Rows
                Dim obj As New ENT_GEN_GrupoServicio
                obj.vcGrupo = fila("vcNomCon")
                lst.Add(obj)

            Next
            dt = bl_.Listar_Resumen(p_mesTabla, "cabecera_lineas", "", "", "", vcCodOpe.ToString(), vcCodCue, "", "", -1, -1, -1)

            For Each fila As DataRow In dt.Rows
                Dim obj As New ENT_GEN_GrupoServicio
                obj.vcGrupo = fila("vcNomConc")
                lst.Add(obj)
            Next

            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
            ent.IdGrupo = 99
            ent.vcGrupo = "Total"
            ent.vcGrupo01 = "Total"
            ent.vcGrupoWidth = "80px"
            ent.vcGrupoAlign = "right"
            lst.Add(ent)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(bl_) Then bl_.Dispose()
        End Try

        Return lst

    End Function

    <WebMethod()>
    Public Shared Function Carga_Periodo(ByVal p_vcNomGrupo_Para As String, ByVal p_vcValor_Para As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Dim fecDesde As String = ""

            Dim dt As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "Guarda_ParametrosReporte", p_vcNomGrupo_Para, p_vcValor_Para, "", "", "", "", "", "")
            For Each row As DataRow In dt.Rows
                Dim clave As String = row("Clave")
                Dim valor As String = row("Valor")
                If clave = "dwDesde" Then
                    fecDesde = valor
                End If
            Next
            Dim lstPeriodo As New List(Of ENT_GEN_GrupoServicio)


            Dim miDateTime As Date
            Dim diferencia As Integer

            If p_vcValor_Para IsNot Nothing Then
                miDateTime = Date.ParseExact("20" + fecDesde.Substring(5, 2) + fecDesde.Substring(0, 2) + "010000", "yyyyMMddhhmm", Nothing)
            Else
                miDateTime = Date.Now
            End If
            diferencia = DateDiff(DateInterval.Month, miDateTime, Date.Today)

            For i = 0 To 11
                Dim oPeriodo As New ENT_GEN_GrupoServicio
                Dim mes As Date
                If p_vcValor_Para IsNot Nothing Then
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
                        oPeriodo.vcGrupo = "Ene - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 2
                        oPeriodo.vcGrupo = "Feb - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 3
                        oPeriodo.vcGrupo = "Mar - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 4
                        oPeriodo.vcGrupo = "Abr - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 5
                        oPeriodo.vcGrupo = "May - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 6
                        oPeriodo.vcGrupo = "Jun - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 7
                        oPeriodo.vcGrupo = "Jul - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 8
                        oPeriodo.vcGrupo = "Ago - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 9
                        oPeriodo.vcGrupo = "Sep - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 10
                        oPeriodo.vcGrupo = "Oct - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)

                        Exit Select
                    Case 11
                        oPeriodo.vcGrupo = "Nov - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)

                        Exit Select
                    Case Else
                        oPeriodo.vcGrupo = "Dic - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                End Select

                lstPeriodo.Add(oPeriodo)
            Next

            Return lstPeriodo

            'Return dt.Rows.Count
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(bl_) Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Guarda_ParametrosReporte(ByVal p_vcNomGrupo_Para As String, ByVal p_vcValor_Para As String) As Integer
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Dim dt As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "Guarda_ParametrosReporte", p_vcNomGrupo_Para, p_vcValor_Para, "", "", "", "", "", "")

            Return dt.Rows.Count

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If Not IsNothing(bl_) Then bl_.Dispose()
        End Try
    End Function




    Class ENT_GEN_GrupoServicio

#Region "Declaracion"
        Private _IdGrupo As String
        Private _vcGrupo As String
        Public _vcGrupoWidth As String
        Public _vcGrupoAlign As String

        Public _vcGrupoServicio As String

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

        Public _vcGrupo21 As String

        Private _btGrupoHidden As Boolean

        Public _vcGrupoWidth01 As String
        Public _vcGrupoWidth02 As String
        Public _vcGrupoWidth03 As String
        Public _vcGrupoWidth04 As String
        Public _vcGrupoWidth05 As String
        Public _vcGrupoWidth06 As String
        Public _vcGrupoWidth07 As String
        Public _vcGrupoWidth08 As String

#End Region

        Public Property vcColor() As String
            Get
                Return _vcColor
            End Get
            Set(ByVal value As String)
                _vcColor = value
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

        Private list_ent_gen_gruposervicio_ As List(Of ENT_GEN_GrupoServicio)
        Public Property List_ENT_GEN_GrupoServicio As List(Of ENT_GEN_GrupoServicio)
            Get
                Return list_ent_gen_gruposervicio_
            End Get
            Set(value As List(Of ENT_GEN_GrupoServicio))
                list_ent_gen_gruposervicio_ = value
            End Set
        End Property

        Public Property btGrupoHidden As Boolean
            Get
                Return _btGrupoHidden
            End Get
            Set(value As Boolean)
                _btGrupoHidden = value
            End Set
        End Property

        Private _codigo As String
        Public Property codigo As String
            Get
                Return _codigo
            End Get
            Set(value As String)
                _codigo = value
            End Set
        End Property
        Private _cuenta As String
        Public Property cuenta As String
            Get
                Return _cuenta
            End Get
            Set(value As String)
                _cuenta = value
            End Set
        End Property
    End Class

    Private Shared Function configurarColumnas_MultiPais(tabla As DataTable, oCultura As ENT_GEN_Cultura) As String
        Const quote As String = """"
        Dim resultado = "[{0}]"
        Dim columna = """name"": {0}, ""index"": {0}, ""width"": {1}, ""label"": {0}, ""sortable"": false, ""hidden"": false, ""align"": _align"
        Dim columnaCod = """name"": {0}, ""index"": {0}, ""width"": {1}, ""label"": {0}, ""sortable"": false, ""hidden"": false, ""align"": _align"
        Dim columnas As New List(Of String)
        Dim Cont_col As Integer = 0
        Try

            For Each col As DataColumn In tabla.Columns
                Dim data = "{"
                If (col.ColumnName.ToLower() = "codigo") Then
                    data = data & String.Format(columnaCod, quote & col.ColumnName.Trim() & quote, "100")
                ElseIf col.ColumnName.ToLower() = "cuenta" Then
                    data = data & String.Format(columnaCod, quote & col.ColumnName.Trim() & quote, "200")
                    data = data & ", ""formatter"": ""|function (value, options, rData){ return @<a href='#' name='value' id='value' onclick='Modelo_TablaLineas(this.id)' >value</a>@; }|"""
                Else
                    data = data & String.Format(columna, quote & col.ColumnName.Trim() & quote, "125")
                    If (Cont_col > 1) Then
                        data = data & ", ""formatoptions"": { ""decimalSeparator"": " & quote & oCultura.vcSimDec & quote & ", ""thousandsSeparator"": """ & oCultura.vcSimSepMil & quote & ", ""decimalPlaces"": " & quote & oCultura.dcNumDec & quote & "}"
                    End If
                End If
                If (col.ColumnName.ToLower() = "codigo" Or col.ColumnName.ToLower() = "cuenta") Then
                    data = data.Replace("_align", quote & "left" & quote)
                Else
                    data = data.Replace("_align", quote & "right" & quote)
                End If
                data = data + "}"
                columnas.Add(data)
                Cont_col += 1
            Next
            resultado = String.Format(resultado, String.Join(",", columnas))
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        End Try
        Return resultado

    End Function

    Private Shared Function obtenerJson(tabla As DataTable, oCultura As ENT_GEN_Cultura) As String
        Dim listaFilas As New List(Of String)()
        Dim resultado As String = "[{0}]"
        Dim columnas As New List(Of String)()
        Dim fil As String = """{0}"": ""{1}"""
        Try
            For i As Integer = 0 To tabla.Rows.Count - 1
                Dim listaCeldas As New List(Of String)()

                For z As Integer = 0 To tabla.Columns.Count - 1
                    'listaCeldas.Add(String.Format(fil, tabla.Columns(z).ColumnName.Trim(), If(tabla.Rows(i)(z).ToString() = "", "0", tabla.Rows(i)(z).ToString())))
                    If tabla.Columns(z).ColumnName.ToLower().Trim() <> "cuenta" And tabla.Columns(z).ColumnName.ToLower().Trim() <> "codigo" Then
                        Dim valor = If(tabla.Rows(i)(z).ToString() = "", "0", tabla.Rows(i)(z).ToString())
                        'valor = DevuelveNumeroFormateado(valor, oCultura)
                        If (oCultura.vcCodCul <> "es-PE") Then
                            listaCeldas.Add(String.Format(fil, tabla.Columns(z).ColumnName.Trim(), If(tabla.Rows(i)(z).ToString() = "", "0", valor)))
                        Else
                            listaCeldas.Add(String.Format(fil, tabla.Columns(z).ColumnName.Trim(), If(tabla.Rows(i)(z).ToString() = "", "0", valor)))
                        End If
                    Else
                        listaCeldas.Add(String.Format(fil, tabla.Columns(z).ColumnName.Trim(), If(tabla.Rows(i)(z).ToString() = "", "Sin Datos", tabla.Rows(i)(z).ToString())))
                    End If

                Next
                Dim data As String = "{"
                data = data & String.Join(",", listaCeldas)
                data = data & Convert.ToString("}")
                listaFilas.Add(data)
            Next

            resultado = String.Format(resultado, String.Join(",", listaFilas))
        Catch ex As Exception

            Throw ex
        End Try

        Return resultado

    End Function

End Class
