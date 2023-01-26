Imports System.Web.Script.Serialization
Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE

Public Class Con_Fac_Consulta
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim MisCriterios As Dictionary(Of String, Object)
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    If HttpContext.Current.Session("MiCriterio") IsNot Nothing AndAlso Request.QueryString("eeg") Is Nothing Then
                        Dim v_oCriterio As ENT_MOV_IMP_Criterio = CType(HttpContext.Current.Session("MiCriterio"), ENT_MOV_IMP_Criterio)
                        If v_oCriterio IsNot Nothing Then

                            v_oCriterio.vcNomTab = v_oCriterio.vcNomTab.Replace("#", "")
                            If HttpContext.Current.Session("Criterios") Is Nothing Then

                                MisCriterios = New Dictionary(Of String, Object)
                                MisCriterios.Add(v_oCriterio.vcNomTab + "|" + v_oCriterio.inNumCri.ToString, v_oCriterio)

                            Else
                                MisCriterios = CType(HttpContext.Current.Session("Criterios"), Dictionary(Of String, Object))

                                If MisCriterios.ContainsKey(v_oCriterio.vcNomTab + "|" + v_oCriterio.inNumCri.ToString) Then
                                    MisCriterios.Item(v_oCriterio.vcNomTab + "|" + v_oCriterio.inNumCri.ToString) = v_oCriterio
                                Else
                                    MisCriterios.Add(v_oCriterio.vcNomTab + "|" + v_oCriterio.inNumCri.ToString, v_oCriterio)
                                End If

                            End If
                            HttpContext.Current.Session("Criterios") = MisCriterios
                            eegConsulta.Criterio = v_oCriterio
                            Me.txtKey.Text = v_oCriterio.vcNomTab + "|" + v_oCriterio.inNumCri.ToString
                            hdfvcTab.Value = txtKey.Text

                            ''Dim vcPer As String = v_oCriterio.vcPer.Substring(0, 2) & "" & v_oCriterio.vcPer.Substring(5)
                            hdfPer.Value = v_oCriterio.vcPer ''vcPer
                            
                        End If
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try
    End Sub


    <WebMethod()>
    Public Shared Function Cabecera_Resumen(ByVal p_vcModo As String, ByVal p_vcCriterio As String, ByVal p_idExpresado As String, ByVal p_vcMesInicial As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)
            Dim list__ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim dtCabeceraCuenta As DataTable = bl_.Listar_Resumen("cabecera_resumen", p_vcCriterio, "", "", "", p_idExpresado, "", p_vcMesInicial, "")
            For Each fila As DataRow In dtCabeceraCuenta.Rows

                Dim ent01 As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                ent01.vcGrupo = fila("vcDes")
                ent01.vcGrupo01 = fila("vcNomAlias")
                ent01.vcGrupoWidth = fila("inWidth2")
                ent01.vcGrupoAlign = fila("vcAlign2")

                list__.Add(ent01)

            Next

            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()
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
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Lista_dtResumen(ByVal p_vcMesInicial As String, ByVal p_vcMesFin As String, ByVal p_idOperador As String, ByVal p_idExpresado As String, ByVal p_vcCriterio As String) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Dim dt As DataTable = bl_.Listar_Resumen("datos_resumen", "", "", "", "", p_idExpresado, p_idOperador, p_vcMesInicial, p_vcMesFin)

            dt.Columns.Add("Total")
            ' =====================================
            ' CALCULA TOTAL
            ' =====================================

            For Each fil As DataRow In dt.Rows
                Dim nutotal As Decimal = 0
                For i As Integer = 4 To dt.Columns.Count - 1
                    If Not fil.IsNull(i) Then
                        Dim strVal As String = fil(i).ToString()
                        Dim d As Decimal
                        If Double.TryParse(strVal, d) Then
                            nutotal = nutotal + d
                        End If
                    End If
                Next
                fil.SetField("Total", nutotal)
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
                    ElseIf i = 4 Then
                        ent.vcGrupo04 = dt.Rows(fila)(column.Caption).ToString()
                    ElseIf i = 5 Then
                        'ent.vcGrupo05 = dt.Rows(fila)(column.Caption).ToString()
                        If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            ent.vcGrupo05 = "0.00"
                        Else
                            ent.vcGrupo05 = dt.Rows(fila)(column.Caption).ToString()
                        End If
                    ElseIf i = 6 Then
                        If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            ent.vcGrupo06 = "0.00"
                        Else
                            ent.vcGrupo06 = dt.Rows(fila)(column.Caption).ToString()
                        End If
                    ElseIf i = 7 Then
                        If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            ent.vcGrupo07 = "0.00"
                        Else
                            ent.vcGrupo07 = dt.Rows(fila)(column.Caption).ToString()
                        End If
                    ElseIf i = 8 Then
                        If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            ent.vcGrupo08 = "0.00"
                        Else
                            ent.vcGrupo08 = dt.Rows(fila)(column.Caption).ToString()
                        End If
                    ElseIf i = 9 Then
                        If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            ent.vcGrupo09 = "0.00"
                        Else
                            ent.vcGrupo09 = dt.Rows(fila)(column.Caption).ToString()
                        End If
                    ElseIf i = 10 Then
                        If Not IsNumeric(dt.Rows(fila)(column.Caption).ToString()) Then
                            ent.vcGrupo10 = "0.00"
                        Else
                            ent.vcGrupo10 = dt.Rows(fila)(column.Caption).ToString()
                        End If
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
    Public Shared Function ListarLineas(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String,
                                        ByVal oCriterio As String, ByVal p_mesTabla As String, ByVal p_vcCodcue As String) As String
        Dim lista As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            lista = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt

            'Dim vcCue As String = v_oCriterio.Cuentas(0).P_vcCod

            'Dim ds As DataSet = lista.ListarPorCriterio(v_oCriterio, p_mesTabla, vcCue, inPagTam, inPagAct, vcOrdCol, vcTipOrdCol, vcCodInt, "")

            ''p_mesTabla = "0818,0918"

            If v_oCriterio.Organizaciones.Count = 0 Then
                Dim codigosAreasSeparadoPorComas = oUsuario.F_vcCodInt

                Dim codigosAreas = codigosAreasSeparadoPorComas.Split(",")

                For Each codigoArea In codigosAreas
                    v_oCriterio.Organizaciones.Add(New VisualSoft.PCSistelMovil.General.BE.ENT_GEN_Organizacion With {.vcCodInt = codigoArea})
                Next

            End If

            Dim ds As DataSet = lista.ListarPorCriterio(v_oCriterio, p_mesTabla, inPagTam, inPagAct, vcOrdCol, vcTipOrdCol, vcCodInt, "")
            lista.Dispose()

            Dim dict As New Dictionary(Of String, Object)
            Dim dictJqGrid As New Dictionary(Of String, Object)
            Dim lstItems As New List(Of Object)

            dictJqGrid.Add("PaginaActual", Convert.ToInt32(inPagAct))
            If ds.Tables(0).Rows.Count > 0 Then
                dictJqGrid.Add("TotalPaginas", Convert.ToInt32(ds.Tables(0).Rows(0)("TotalPaginas")))
                dictJqGrid.Add("TotalRegistros", Convert.ToInt32(ds.Tables(0).Rows(0)("TotalRegistros")))
            Else
                dictJqGrid.Add("TotalPaginas", 0)
                dictJqGrid.Add("TotalRegistros", 0)
            End If

            Try
                ds.Tables(0).Columns.Remove("TotalPaginas")
                ds.Tables(0).Columns.Remove("TotalRegistros")
            Catch
            End Try

            Dim dictItemDet As New Dictionary(Of String, Object)
            Dim lstRow As New List(Of String)

            For i As Integer = 0 To ds.Tables(1).Rows.Count - 1
                dictItemDet = New Dictionary(Of String, Object)
                lstRow = New List(Of String)
                ''dictItemDet.Add("ID", ds.Tables(0).Rows(i)(0).ToString())
                dictItemDet.Add("ID", i)

                lstRow.Add((i + 1).ToString())

                For j As Integer = 0 To ds.Tables(1).Rows(i).ItemArray.Count - 1
                    lstRow.Add(ds.Tables(1).Rows(i)(j).ToString())
                Next
                dictItemDet.Add("Row", lstRow)
                lstItems.Add(dictItemDet)
            Next


            If ds.Tables.Count > 1 AndAlso ds.Tables(1).Rows.Count > 0 Then
                dictJqGrid.Add("Items", lstItems)
                dict.Add("JQGrid", dictJqGrid)
                dict.Add("vcTab", ds.Tables(2).Rows(0)("vcNomTab").ToString())
            Else
                dictJqGrid.Add("Items", New List(Of Object))
                dict.Add("JQGrid", dictJqGrid)
                dict.Add("vcTab", "")
            End If

            Return oSerializer.Serialize(dict)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If lista IsNot Nothing Then lista.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarDetalleConceptoPorLinea(ByVal vcTab As String, ByVal Linea As String) As String
        Dim lista As BL_MOV_IMP_Facturacion = Nothing
        Try
            lista = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer

            Dim ds As DataSet = lista.ObtieneDetalleConceptoPorLinea(vcTab, Linea)
            lista.Dispose()

            Dim dict As New Dictionary(Of String, Object)
            Dim dictJqGrid As New Dictionary(Of String, Object)
            Dim lstItems As New List(Of Object)


            Dim dictItemDet As New Dictionary(Of String, Object)
            Dim lstRow As New List(Of String)

            Dim iColumnas As Integer = ds.Tables(0).Columns.Count
            For i As Integer = 0 To ds.Tables(0).Rows.Count - 1
                dictItemDet = New Dictionary(Of String, Object)
                lstRow = New List(Of String)
                ''dictItemDet.Add("ID", ds.Tables(0).Rows(i)(0).ToString())
                dictItemDet.Add("ID", i)

                For iColumn As Integer = 0 To iColumnas - 1
                    dictItemDet.Add(ds.Tables(0).Columns(iColumn).ColumnName, ds.Tables(0).Rows(i)(iColumn).ToString())
                Next
                ''lstRow.Add((i + 1).ToString())
                'For j As Integer = 0 To ds.Tables(0).Rows(i).ItemArray.Count - 1
                '    ''lstRow.Add(ds.Tables(0).Rows(i)(j).ToString())
                '    ''lstRow.Add(ds.Tables(0).Rows(i)(j).ToString())
                'Next

                ''dictItemDet.Add("Row", lstRow)
                lstItems.Add(dictItemDet)
            Next

            'dictJqGrid.Add("Items", lstItems)
            'dict.Add("JQGrid", dictJqGrid)
            'dict.Add("vcTab", ds.Tables(1).Rows(0)("vcNomTab").ToString())


            Return oSerializer.Serialize(lstItems)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If lista IsNot Nothing Then lista.Dispose()
        End Try
    End Function

    Private Sub eegConsulta_ObtenerDatosAExportarCriterio(oTipoExcel As ExportarExcelGenerico.TipoExcel, llave As String) Handles eegConsulta.ObtenerDatosAExportarCriterio
        Dim facturacion As BL_MOV_IMP_Facturacion = Nothing
        Dim data As DataTable
        Dim MisCriterios As Dictionary(Of String, Object)
        Try
            facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If HttpContext.Current.Session("Criterios") IsNot Nothing Then

                MisCriterios = CType(HttpContext.Current.Session("Criterios"), Dictionary(Of String, Object))

                If MisCriterios.ContainsKey(llave) Then
                    Dim criterio As ENT_MOV_IMP_Criterio = CType(MisCriterios.Item(llave), ENT_MOV_IMP_Criterio)
                    Dim vcPer As String = criterio.vcPer ''criterio.vcPer.Substring(0, 2) & "" & criterio.vcPer.Substring(5)
                    'Dim vcCue As String = criterio.Cuentas(0).P_vcCod
                    data = facturacion.ListarPorCriterioExp(criterio, vcPer, 9000000, 1, "vcNum", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt, "").Tables(1)
                    eegConsulta.ExportarDatos(RenombrarColumnas(data), "Consulta_Facturacion")
                End If
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If facturacion IsNot Nothing Then facturacion.Dispose()
        End Try
    End Sub


    Private Function RenombrarColumnas(ByVal prData As DataTable) As DataTable
        Try
            Dim contador As Integer = 0
            ''Quitar columnas....
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "vcNum2"
                        prData.Columns.Remove("vcNum2")
                        contador = contador + 1
                        Continue For
                    Case "idConcepto"
                        prData.Columns.Remove("idConcepto")
                        contador = contador + 1
                        Continue For
                    Case "idGrupo"
                        prData.Columns.Remove("idGrupo")
                        Continue For
                    Case "RowNumber"
                        prData.Columns.Remove("RowNumber")
                        contador = contador + 1
                        Continue For
                End Select
            Next
            contador = 0
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "vcNum"
                        prData.Columns(index - contador).ColumnName = "Línea"
                        Continue For
                    Case "vcCodEmp"
                        prData.Columns(index - contador).ColumnName = "Cod. Empleado"
                        Continue For
                    Case "vcNomEmp"
                        prData.Columns(index - contador).ColumnName = "Empleado"
                        Continue For
                    Case "inCodInt"
                        prData.Columns(index - contador).ColumnName = "Cod. Area"
                        Continue For
                    Case "vcNomOrg"
                        prData.Columns(index - contador).ColumnName = "Organización"
                        Continue For
                    Case "vcCodCue"
                        prData.Columns(index - contador).ColumnName = "Cod. Cuenta"
                        Continue For
                    Case "vcNomCue"
                        prData.Columns(index - contador).ColumnName = "Cuenta"
                        Continue For
                    Case "vcCodEmp"
                        prData.Columns(index - contador).ColumnName = "Cod. Empleado"
                        Continue For
                    Case "inCodOpe"
                        prData.Columns(index - contador).ColumnName = "Cod. Operador"
                        Continue For
                    Case "vcNomOpe"
                        prData.Columns(index - contador).ColumnName = "Operador"
                        Continue For
                    Case Else
                End Select
            Next
        Catch ex As Exception

        End Try
        Return prData
    End Function

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

        Private list_ent_gen_gruposervicio_ As List(Of ENT_GEN_GrupoServicio)
        Public Property List_ENT_GEN_GrupoServicio As List(Of ENT_GEN_GrupoServicio)
            Get
                Return list_ent_gen_gruposervicio_
            End Get
            Set(value As List(Of ENT_GEN_GrupoServicio))
                list_ent_gen_gruposervicio_ = value
            End Set
        End Property

    End Class

End Class