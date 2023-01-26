Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Services

Partial Class P_Configuracion_HerramientasSistema_VisorEventos_VisorAuditoria
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                If Not IsPostBack Then

                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim Entidad As BL_ENT_Entidad = New BL_ENT_Entidad(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstCampo As List(Of ENT_ENT_Campo)
                    Dim oEntidad As ENT_ENT_Entidad

                    lstCampo = Campo.Listar("M_AUDI", oUsuario, 0)
                    Campo.Dispose()

                    oEntidad = Entidad.Mostrar("M_AUDI", oUsuario.P_inCod)
                    Entidad.Dispose()

                    Session("Campos" & "_" & "M_AUDI") = lstCampo

                    ConfigurarGrid(lstCampo, oEntidad)

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal vcCam As String, ByVal vcValBus As String,
                                  ByVal vcTab As String, ByVal inTipOri As String, ByVal inFilReg As String) As JQGridJsonResponse
        Try
            vcTab = "M_AUDI"
            inTipOri = "1"

            HttpContext.Current.Session("vcFiltro_" & vcTab) = vcCam & "," & vcValBus & "|" & inFilReg

            Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos" & "_" & vcTab), List(Of ENT_ENT_Campo))
            Dim NomId As String = HttpContext.Current.Session("NomId" & "_" & vcTab).ToString()
            Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol,
                                                                           vcTipOrdCol, vcTab, lstCampo, NomId, vcCam,
                                                                           vcValBus, Integer.Parse(inFilReg))
            Campo.Dispose()

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                          Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
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
            If oCampo.vcNom = "AUDI_vcNOMTABL" Or oCampo.vcNom = "AUDI_vcDATAANTE" Or _
               oCampo.vcNom = "AUDI_vcDATADESP" Or oCampo.vcNom = "AUDI_vcNOMPRO" Or _
               oCampo.vcNom = "AUDI_vcNOMPC" Then
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

    Protected Sub eegAuditoria_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegAuditoria.ObtenerDatosAExportar
        Dim vcTab As String = "M_AUDI"
        Dim vcFiltro As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(0)
        Dim inFilReg As String = HttpContext.Current.Session("vcFiltro_" & vcTab).ToString().Split("|")(1)
        Dim inTipOri As Integer = 1
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(Integer.Parse(inTipOri), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstCampo As List(Of ENT_ENT_Campo) = CType(HttpContext.Current.Session("Campos_" & vcTab), List(Of ENT_ENT_Campo))
        Try
            Dim dsDetalle As DataSet = Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, inFilReg)
            Campo.Dispose()
            eegAuditoria.ExportarDatos(dsDetalle.Tables(0), "Auditoria", lstCampo)
        Catch
        End Try
    End Sub
End Class
