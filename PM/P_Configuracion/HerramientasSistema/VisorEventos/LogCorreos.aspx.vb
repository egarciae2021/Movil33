Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Services

Partial Class P_Configuracion_HerramientasSistema_VisorEventos_LogCorreos
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Entidad As BL_ENT_Entidad = New BL_ENT_Entidad(0, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(0, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim lstCampo As List(Of ENT_ENT_Campo)
                    Dim oEntidad As ENT_ENT_Entidad

                    lstCampo = Campo.Listar("vw_PCS_MOV_Cola", oUsuario, 0)
                    oEntidad = Entidad.Mostrar("vw_PCS_MOV_Cola", oUsuario.P_inCod)
                    Session("Campos_vw_PCS_MOV_Cola") = lstCampo
                    ConfigurarGrid(lstCampo, oEntidad)

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (Campo IsNot Nothing) Then
                Campo.Dispose()
            End If
            If (Entidad IsNot Nothing) Then
                Entidad.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal vcCam As String, ByVal vcValBus As String,
                                  ByVal vcTab As String, ByVal inTipOri As String, ByVal inFilReg As String) As JQGridJsonResponse
        Dim Campo As BL_ENT_Campo = Nothing
        Try
            vcTab = "vw_PCS_MOV_Cola"
            inTipOri = "1"
            Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            HttpContext.Current.Session("vcFiltro_" & vcTab) = vcCam & "," & vcValBus & "|" & inFilReg

            Dim IdClienteCentral As String = "" & HttpContext.Current.Session("IdDominio")
            If IdClienteCentral = "" OrElse IdClienteCentral = "-1" Then
                IdClienteCentral = "0"
            End If

            Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
            Dim NomId As String = HttpContext.Current.Session("NomId" & "_" & vcTab).ToString()
            'Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol,
            '                                                               vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
            '                                                               vcValBus, Integer.Parse(inFilReg), " vw_PCS_MOV_Cola.IdClienteCentral = " & IdClienteCentral)

            Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol,
                                                                          vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                                          vcValBus, Integer.Parse(inFilReg), "")

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                          Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (Campo IsNot Nothing) Then
                Campo.Dispose()
            End If
        End Try
    End Function

    Private Sub ConfigurarGrid(ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal oEntidad As ENT_ENT_Entidad)
        Dim script As String
        Dim IdPrim As String = ""
        Dim Columna As String = "var columnas=["

        For Each oCampo As ENT_ENT_Campo In lstCampo
            If oCampo.btIdPri Then
                If IdPrim <> "" Then
                    IdPrim &= ","
                End If
                IdPrim &= oCampo.vcNomAlias
            End If


            '//

            Columna = Columna & "{ name: '" & oCampo.vcNomAlias & "', index: '" & oCampo.vcNomAlias & "', width: " & oCampo.inLar.ToString & ", label: '" & oCampo.vcDes.Replace("'", "\'") & "'"

            If oCampo.vcNom = "btConAdj" Or oCampo.vcNom = "btEst" Then
                Columna = Columna & ", formatter : function(value, options, rData){ if(value == 'True') return 'SI'; else return 'NO'; }"
            End If


            If oCampo.btOrd And oEntidad.btOrd Then
                Columna = Columna & ", sortable: true"
            Else
                Columna = Columna & ", sortable: false"
            End If

            If oCampo.btVis And oCampo.btVig Then
                If oCampo.vcNom = "IdLogCor" Then
                    Columna = Columna & ", hidden: true"
                Else
                    Columna = Columna & ", hidden: false"
                End If
            Else
                Columna = Columna & ", hidden: true"
            End If

            'If oCampo.btEliLog Then
            '    hdfElim.Value = oCampo.vcNom
            '    Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfActivo.Value & "'; else return '" & hdfDesactivo.Value & "'; }" 'formatter:'checkbox'"
            '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" & oCampo.vcNom & "': 'Eliminado' });}", True)
            'ElseIf oCampo.inTipDat = 6 Then
            '    If hdfCampBool.Value <> "" Then
            '        hdfCampBool.Value &= ","
            '    End If
            '    hdfCampBool.Value &= oCampo.vcNom
            '    hdfVerdadero.Value = oCampo.vcValVer
            '    hdfFalso.Value = oCampo.vcValFal
            '    Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfVerdadero.Value & "'; else return '" & hdfFalso.Value & "'; }" 'formatter:'checkbox'"
            'Else
            Columna = Columna & ", align: 'Left'"
            'End If

            Columna = Columna & " },"
        Next

        Session("NomId" & "_" & oEntidad.vcTab) = IdPrim

        Columna = Columna.Substring(0, Columna.Length - 1) & "]; "

        Dim TamanoPaginaArray As String() = oEntidad.vcTamPag.Split(",")

        If Not TamanoPaginaArray.Contains(oEntidad.inTamPag.ToString()) Then
            oEntidad.inTamPag = Integer.Parse(TamanoPaginaArray(0))
        End If

        script = "var idTabla = '" & IdPrim & "'; " & Columna & "var titulo = '" & oEntidad.vcDes & "';" & "var TamanoPagina = '" & oEntidad.inTamPag.ToString() & "';" & "var TamanosPaginaSel = [" & oEntidad.vcTamPag & "];"

        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

    End Sub

    Protected Sub eegLogCorreo_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegLogCorreo.ObtenerDatosAExportar
        Dim vcTab As String = "vw_PCS_MOV_Cola"
        Dim vcFiltro As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(0)
        Dim inFilReg As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(1)
        Dim inTipOri As Integer = 1
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos_vw_PCS_MOV_Cola"), List(Of ENT_ENT_Campo))
        Try
            Dim dsDetalle As DataSet = Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, inFilReg)
            'Quitar Columna de Mensaje...
            If dsDetalle.Tables(0).Columns.Contains("vcMen") Then
                dsDetalle.Tables(0).Columns.Remove("vcMen")
            End If
            For Each objCampo In lstCampo
                If objCampo.vcDes = "Mensaje" Then
                    lstCampo.Remove(objCampo)
                    Exit For
                End If
            Next
            eegLogCorreo.ExportarDatos(dsDetalle.Tables(0), "LogCorreo", lstCampo)
        Catch

            Dim script As String = "alert('No se logró exportar, demasiados registros. Realice filtros para disminuir la lista.');"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_Mensaje", script, True)
        Finally
            If (Campo IsNot Nothing) Then
                Campo.Dispose()
            End If
        End Try

    End Sub


End Class
