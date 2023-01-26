Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Consultar_Con_Sumario
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
                    hdfTipoSumario.Value = Request.QueryString("Tipo")
                    hdfValorSumario.Value = Request.QueryString("Valor")

                    For i As Integer = 1 To 20
                        Dim item As New ListItem
                        item.Text = i.ToString()
                        item.Value = i.ToString()
                        ddlNumeroRegistro.Items.Add(item)
                    Next

                    Select Case Convert.ToInt32(hdfTipoSumario.Value)
                        Case 1 'Por Niveles
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Detalle", "2"))
                            ddlTipoImpresion.Items.Add(New ListItem("Detallado - Servicios", "3"))
                        Case 2 'Por Area
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Detalle", "2"))
                            ddlTipoImpresion.Items.Add(New ListItem("Detallado - Servicios", "3"))
                        Case 3 'Por Lineas
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("Por Organización - Sumario", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("Por Organización - Detalle", "2"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "3"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Detalle", "4"))
                            ddlTipoImpresion.Items.Add(New ListItem("Servicio - Celulares", "5"))
                        Case 4 'Por Empleados
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("Por Organización - Sumario", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("Por Organización - Detalle", "2"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "3"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Detalle", "4"))
                            ddlTipoImpresion.Items.Add(New ListItem("Servicio - Celulares", "5"))
                        Case 5 'Por Centro de costo
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Detalle", "2"))
                            ddlTipoImpresion.Items.Add(New ListItem("Detallado - Servicios", "3"))
                        Case 6 'Por Números
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - FIJA", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - CEL", "2"))
                            'ddlTipoImpresion.Items.Add(New ListItem("General - DDN", "3"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - DDI", "4"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Todos", "5"))
                            ddlTipoImpresion.Items.Add(New ListItem("Por Empresa", "6"))
                            ddlTipoImpresion.Items.Add(New ListItem("Por Grupo", "7"))
                        Case 7 'Por Frecuencia de llamadas
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                        Case 8 'Por Compañias
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                        Case 9 'Por Pais
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                        Case 10 'Por Ciudad
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                        Case 11 'Por Fecha
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Detalle", "2"))
                        Case 12 'Por Hora
                            ddlTipoImpresion.Items.Add(New ListItem("<Seleccionar>", "-1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Sumario", "1"))
                            ddlTipoImpresion.Items.Add(New ListItem("General - Detalle", "2"))
                    End Select
                    ddlNumeroRegistro.SelectedValue = 5

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
                            eeGenerico.Criterio = v_oCriterio
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
        End Try
    End Sub

    Private Sub eeGenerico_ObtenerDatosAExportarCriterio(oTipoExcel As ExportarExcelGenerico.TipoExcel, llave As String) Handles eeGenerico.ObtenerDatosAExportarCriterio
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Dim dsDetalle As New DataSet
        Dim MisCriterios As Dictionary(Of String, Object)
        Try
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If HttpContext.Current.Session("Criterios") IsNot Nothing Then

                MisCriterios = CType(HttpContext.Current.Session("Criterios"), Dictionary(Of String, Object))

                If MisCriterios.ContainsKey(llave) Then
                    Dim v_oCriterio As ENT_MOV_IMP_Criterio = CType(MisCriterios.Item(llave), ENT_MOV_IMP_Criterio)


                    Select Case Convert.ToInt32(v_oCriterio.inTipSum)
                        Case 1 'Organizacion Nivel
                            dsDetalle = Llamada.ListarSumarioPorOrganizacionNivel(v_oCriterio, 9000000, 1, "1", "asc", v_oCriterio.NivelSumario.P_inCodNiv, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 2 'Organizacion Area
                            dsDetalle = Llamada.ListarSumarioPorOrganizacionArea(v_oCriterio, 9000000, 1, "1", "asc", v_oCriterio.AreaSumario.P_inCodOrg, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 3 'Linea
                            dsDetalle = Llamada.ListarSumarioPorLinea(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 4 'Empleado
                            dsDetalle = Llamada.ListarSumarioPorEmpleado(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 5 'Centro de costo
                            dsDetalle = Llamada.ListarSumarioPorCentroCosto(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 6 'Numero
                            dsDetalle = Llamada.ListarSumarioPorNumero(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 7 'Frecuencia llamada
                            dsDetalle = Llamada.ListarSumarioPorFrecuenciaLlamada(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 8 'Operador
                            dsDetalle = Llamada.ListarSumarioPorOperador(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 9 'Pais
                            dsDetalle = Llamada.ListarSumarioPorPais(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 10 'Ciudad
                            dsDetalle = Llamada.ListarSumarioPorCiudad(v_oCriterio, 9000000, 1, "1", "asc", v_oCriterio.PaisSumario.P_vcCodPai, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 11 'Fecha
                            dsDetalle = Llamada.ListarSumarioPorFecha(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                        Case 12 'Hora
                            dsDetalle = Llamada.ListarSumarioPorHora(v_oCriterio, 9000000, 1, "1", "asc", CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt)
                    End Select

                    If dsDetalle.Tables.Count > 1 Then
                        eeGenerico.ExportarDatos(RenombrarColumnas(dsDetalle.Tables(1)), v_oCriterio.vcNomTab + "_" + v_oCriterio.inNumCri.ToString)
                    End If


                End If

            End If




        Catch ex As Exception
        Finally
            If Llamada IsNot Nothing Then Llamada.Dispose()
        End Try
    End Sub

    Private Function RenombrarColumnas(ByVal prData As DataTable) As DataTable
        Try

            Dim contador As Integer = 0
            For index = 0 To prData.Columns.Count - 1


                Select Case prData.Columns(index - contador).ColumnName
                    Case "RowNumber"
                        'prData.Columns(index).ColumnName = "ID"
                        prData.Columns.Remove("RowNumber")
                        contador = contador + 1
                        Continue For
                    Case "LLAM_P_vcCODEXT"
                        prData.Columns(index - contador).ColumnName = "Línea"
                        Continue For
                    Case "ORGA_P_inCODINT"
                        prData.Columns(index - contador).ColumnName = "Código"
                        Continue For
                    Case "CCOS_P_vcCODCCO"
                        prData.Columns(index - contador).ColumnName = "Código"
                        Continue For
                    Case "LLAM_vcCODPAI"
                        prData.Columns(index - contador).ColumnName = "Código"
                        Continue For
                    Case "LLAM_inCODOPE"
                        prData.Columns(index - contador).ColumnName = "Código"
                        Continue For
                    Case "LLAM_vcCODCIU"
                        prData.Columns(index - contador).ColumnName = "Código Ciudad"
                        Continue For
                    Case "LLAM_P_vcCODSUC"
                        prData.Columns(index - contador).ColumnName = "Sucursal"
                        Continue For
                    Case "CIUD_vcNOMCIU"
                        prData.Columns(index - contador).ColumnName = "Ciudad"
                        Continue For
                    Case "PAIS_vcNOMPAI"
                        prData.Columns(index - contador).ColumnName = "País"
                        Continue For
                    Case "COMP_vcNOMCIA"
                        prData.Columns(index - contador).ColumnName = "Operador"
                        Continue For
                    Case "LLAM_P_vcNUMTEL"
                        prData.Columns(index - contador).ColumnName = "Número"
                        Continue For
                    Case "vcFec"
                        prData.Columns(index - contador).ColumnName = "Fecha"
                        Continue For
                    Case "vcHor"
                        prData.Columns(index - contador).ColumnName = "Hora"
                        Continue For
                    Case "ORGA_vcNOMORG"
                        prData.Columns(index - contador).ColumnName = "Organización"
                        Continue For
                    Case "CCOS_vcNOMCCO"
                        prData.Columns(index - contador).ColumnName = "Centro de costo"
                        Continue For
                    Case "LLAM_vcCODEMP"
                        'prData.Columns(index).ColumnName = "Empleado"
                        prData.Columns.Remove("LLAM_vcCODEMP")
                        contador = contador + 1
                        Continue For
                    Case "LLAM_vcNOMEMP"
                        prData.Columns(index - contador).ColumnName = "Empleado"
                        Continue For
                    Case "inNumLlaLoc"
                        prData.Columns(index - contador).ColumnName = "LOC/Llam"
                        Continue For
                    Case "vcDurLlaLoc"
                        prData.Columns(index - contador).ColumnName = "LOC/Dura"
                        Continue For
                    Case "inDurReaLlaLoc"
                        prData.Columns.Remove("inDurReaLlaLoc")
                        contador = contador + 1
                        Continue For
                    Case "dcCosLlaLoc"
                        prData.Columns(index - contador).ColumnName = "LOC/Costo"
                        Continue For
                    Case "inNumLlaCel"
                        prData.Columns(index - contador).ColumnName = "CEL/Llam"
                        Continue For
                    Case "vcDurLlaCel"
                        prData.Columns(index - contador).ColumnName = "CEL/Dura"
                        Continue For
                    Case "inDurReaLlaCel"
                        prData.Columns.Remove("inDurReaLlaCel")
                        contador = contador + 1
                        Continue For
                    Case "dcCosLlaCel"
                        prData.Columns(index - contador).ColumnName = "CEL/Costo"
                        Continue For
                    Case "inNumLlaDdn"
                        prData.Columns(index - contador).ColumnName = "DDN/Llam"
                        Continue For
                    Case "vcDurLlaDdn"
                        prData.Columns(index - contador).ColumnName = "DDN/Dura"
                        Continue For
                    Case "inDurReaLlaDdn"
                        prData.Columns.Remove("inDurReaLlaDdn")
                        contador = contador + 1
                        Continue For
                    Case "dcCosLlaDdn"
                        prData.Columns(index - contador).ColumnName = "DDN/Costo"
                        Continue For
                    Case "inNumLlaDdi"
                        prData.Columns(index - contador).ColumnName = "DDI/Llam"
                        Continue For
                    Case "vcDurLlaDdi"
                        prData.Columns(index - contador).ColumnName = "DDI/Dura"
                        Continue For
                    Case "inDurReaLlaDdi"
                        prData.Columns.Remove("inDurReaLlaDdi")
                        contador = contador + 1
                        Continue For
                    Case "dcCosLlaDdi"
                        prData.Columns(index - contador).ColumnName = "DDI/Costo"
                        Continue For
                    Case "inNumSRCel"
                        prData.Columns.Remove("inNumSRCel")
                        contador = contador + 1
                        Continue For
                    Case "dcCosLlaSRCel"
                        prData.Columns(index - contador).ColumnName = "SRCEL/Costo"
                        Continue For
                    Case "inNumLlaTot"
                        prData.Columns(index - contador).ColumnName = "TOT/Llam"
                        Continue For
                    Case "vcDurLlaTot"
                        prData.Columns(index - contador).ColumnName = "TOT/Dura"
                        Continue For
                    Case "inDurReaLlaTot"
                        prData.Columns.Remove("inDurReaLlaTot")
                        contador = contador + 1
                        Continue For

                    Case "dcCosLlaTot"
                        prData.Columns(index - contador).ColumnName = "TOT/Costo"
                        Continue For
                    Case Else

                End Select


            Next




        Catch ex As Exception

        End Try
        Return prData
    End Function


End Class