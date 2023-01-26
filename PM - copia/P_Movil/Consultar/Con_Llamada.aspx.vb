Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports Utilitario

Partial Class P_Movil_Consultar_Con_Llamada
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
                            eegLlamada.Criterio = v_oCriterio
                            Me.txtKey.Text = v_oCriterio.vcNomTab + "|" + v_oCriterio.inNumCri.ToString
                        End If
                    Else

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
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal oCriterio As String) As String
        Try
            Dim Llamada As BL_MOV_IMP_Llamada = new BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            Dim dsDetalle As DataSet = Llamada.ListarPorCriterio(v_oCriterio, Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcCodInt)
         Llamada.Dispose()
            Dim dict As New Dictionary(Of String, Object)
            Dim dictJqGrid As New Dictionary(Of String, Object)
            Dim lstItems As New List(Of Object)

            dictJqGrid.Add("PaginaActual", Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")))
            dictJqGrid.Add("TotalPaginas", Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")))
            dictJqGrid.Add("TotalRegistros", Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")))

            HttpContext.Current.Session("vcFiltro_Criterios_Llamadas") = vcOrdCol & "|" & vcTipOrdCol & "|"

            For i As Integer = 0 To dsDetalle.Tables(1).Rows.Count - 1
                Dim dictItemDet As New Dictionary(Of String, Object)
                Dim lstRow As New List(Of String)

                dictItemDet.Add("ID", dsDetalle.Tables(1).Rows(i)(0).ToString())

                For j As Integer = 0 To dsDetalle.Tables(1).Rows(i).ItemArray.Count - 1
                    lstRow.Add(dsDetalle.Tables(1).Rows(i)(j).ToString())
                Next

                dictItemDet.Add("Row", lstRow)
                lstItems.Add(dictItemDet)
            Next

            dictJqGrid.Add("Items", lstItems)
            dict.Add("JQGrid", dictJqGrid)
            dict.Add("vcTab", dsDetalle.Tables(2).Rows(0)("vcNomTab").ToString())


            'v_oCriterio.vcTab = dsDetalle.Tables(2).Rows(0)("vcNomTab").ToString()

            Return oSerializer.Serialize(dict)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Private Sub eegLlamada_ObtenerDatosAExportarCriterio(oTipoExcel As ExportarExcelGenerico.TipoExcel, llave As String) Handles eegLlamada.ObtenerDatosAExportarCriterio
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Dim data As DataTable
        Dim MisCriterios As Dictionary(Of String, Object)
        Try
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If HttpContext.Current.Session("Criterios") IsNot Nothing Then

                MisCriterios = CType(HttpContext.Current.Session("Criterios"), Dictionary(Of String, Object))
                Dim vcOrdCol As String = HttpContext.Current.Session("vcFiltro_Criterios_Llamadas").ToString().Split("|")(0)
                Dim vcTipOrdCol As String = HttpContext.Current.Session("vcFiltro_Criterios_Llamadas").ToString().Split("|")(1)

                If MisCriterios.ContainsKey(llave) Then
                    Dim criterio As ENT_MOV_IMP_Criterio = CType(MisCriterios.Item(llave), ENT_MOV_IMP_Criterio)
                    data = Llamada.ListarPorCriterio(criterio, 9000000, 1, vcOrdCol, vcTipOrdCol, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt).Tables(1)
                    RenombrarColumnas(data) 'se está pasando por referencia
                    eegLlamada.ExportarDatos(data, "Llamadas")
                End If
            End If

        Catch ex As Exception
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub

    Private Function RenombrarColumnas(ByRef prData As DataTable)
        Try

            Dim contador As Integer = 0
            For index = 0 To prData.Columns.Count - 1
                Select Case prData.Columns(index - contador).ColumnName
                    Case "RowNumber"
                        prData.Columns.Remove("RowNumber")
                        contador = contador + 1
                        Continue For

                    Case "vcFec"
                        prData.Columns(index - contador).ColumnName = "Fecha"
                        Continue For

                    Case "vcHor"
                        prData.Columns(index - contador).ColumnName = "Hora"
                        Continue For

                    Case "vcNumCel"
                        prData.Columns(index - contador).ColumnName = "Celular"
                        Continue For


                    Case "vcNomEmp"
                        prData.Columns(index - contador).ColumnName = "Empleado"
                        Continue For

                    Case "vcNomOrg"
                        prData.Columns(index - contador).ColumnName = "Organización"
                        Continue For

                    Case "vcCodSuc"
                        prData.Columns(index - contador).ColumnName = "Cod. Sucursal"
                        Continue For

                    Case "vcNumTel"
                        prData.Columns(index - contador).ColumnName = "Número"
                        Continue For

                    Case "vcNomTel"
                        prData.Columns(index - contador).ColumnName = "Empresa/Persona"
                        Continue For

                    Case "vcNomCorSer"
                        prData.Columns(index - contador).ColumnName = "Servicio"
                        Continue For

                    Case "vcDurRea"
                        prData.Columns(index - contador).ColumnName = "Duración"
                        Continue For

                    Case "dcCosLla"
                        prData.Columns(index - contador).ColumnName = "Costo"
                        Continue For

                    Case "vcGlo"
                        prData.Columns(index - contador).ColumnName = "Global"
                        Continue For

                    Case "vcCodPai"
                        prData.Columns(index - contador).ColumnName = "Cod. País"
                        Continue For

                    Case "inBytEnv"
                        prData.Columns(index - contador).ColumnName = "Bytes Env."
                        Continue For

                    Case "inBytRec"
                        prData.Columns(index - contador).ColumnName = "Bytes Rec."
                        Continue For

                    Case "vcDesLinTip"
                        prData.Columns(index - contador).ColumnName = "Tipo de línea"
                        Continue For
                    Case Else

                End Select
            Next

        Catch ex As Exception

        End Try
        'Return prData
    End Function
End Class