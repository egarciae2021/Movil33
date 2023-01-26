Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Services
Imports ClosedXML.Excel

Partial Class P_Configuracion_HerramientasSistema_VisorEventos_AutenticacionUsuarios
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

                    lstCampo = Campo.Listar("SEG_UsuarioHistorico", oUsuario, 0)
                    Campo.Dispose()

                    oEntidad = Entidad.Mostrar("SEG_UsuarioHistorico", oUsuario.P_inCod)
                    Entidad.Dispose()

                    Session("Campos" & "_" & "SEG_UsuarioHistorico") = lstCampo

                    ConfigurarGrid(lstCampo, oEntidad)

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (Entidad IsNot Nothing) Then
                Entidad.Dispose()
            End If
            If (Campo IsNot Nothing) Then
                Campo.Dispose()
            End If
        End Try
    End Sub

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

            Columna = Columna & "{ name: '" & oCampo.vcNomAlias & "', index: '" & oCampo.vcNomAlias & "', width: " & oCampo.inLar.ToString & ", label: '" & oCampo.vcDes.Replace("'", "\'") & "'"

            If oCampo.btOrd And oEntidad.btOrd Then
                Columna = Columna & ", sortable: true"
            Else
                Columna = Columna & ", sortable: false"
            End If

            If oCampo.btVis And oCampo.btVig Then
                If oCampo.vcNom = "P_inId" Then
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

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal vcCan As String, ByVal vcCanTip As String, ByVal inTipOri As String) As JQGridJsonResponse
        Dim UsuarioHistorico As BL_SEG_UsuarioHistorico = New BL_SEG_UsuarioHistorico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            inTipOri = "0"
            If vcCan.Trim() = "" Then
                vcCan = "0"
            End If

            HttpContext.Current.Session("vcCan_AutenticacionUsuarios") = vcCan
            HttpContext.Current.Session("vcCanTip_AutenticacionUsuarios") = vcCanTip

            Dim dsDetalle As DataSet = UsuarioHistorico.Listar(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcCan, vcCanTip, vcOrdCol, vcTipOrdCol)

            HttpContext.Current.Session("vcFiltro_AutenticacionUsuarios") = vcOrdCol & "|" & vcTipOrdCol & "|"

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                                          Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If (UsuarioHistorico IsNot Nothing) Then
                UsuarioHistorico.Dispose()
            End If
        End Try
    End Function

    Protected Sub eeAutenticacion_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eeAutenticacion.ObtenerDatosAExportar
        Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(0, CType(HttpContext.Current.Session("usuario"), ENT_SEG_Usuario).IdCliente)
        Dim usuariohistorico As BL_SEG_UsuarioHistorico = New BL_SEG_UsuarioHistorico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim vccan As String = HttpContext.Current.Session("vcCan_AutenticacionUsuarios")
            Dim vccantip As String = HttpContext.Current.Session("vcCanTip_AutenticacionUsuarios")
            Dim ousuario As ENT_SEG_Usuario = CType(Session("usuario"), ENT_SEG_Usuario)
            Dim lstcampo As List(Of ENT_ENT_Campo)
            lstcampo = Campo.Listar("seg_usuariohistorico", ousuario, 0)

            Dim intipori As String
            intipori = "0"
            If vccan.Trim() = "" Then
                vccan = "0"
            End If

            Dim vcOrdCol As String = HttpContext.Current.Session("vcFiltro_AutenticacionUsuarios").ToString().Split("|")(0)
            Dim vcTipOrdCol As String = HttpContext.Current.Session("vcFiltro_AutenticacionUsuarios").ToString().Split("|")(1)
            Dim dsdetalle As DataSet = usuariohistorico.Listar(1000000, 1, vccan, vccantip, vcOrdCol, vcTipOrdCol)

            If dsdetalle IsNot Nothing AndAlso dsdetalle.Tables.Count > 1 Then
                Dim dtdatos As DataTable = dsdetalle.Tables(1)
                'quitar columna de mensaje...
                If dtdatos.Columns.Contains("f_incodusu") Then dtdatos.Columns.Remove("f_incodusu")
                If dtdatos.Columns.Contains("rownumber") Then dtdatos.Columns.Remove("rownumber")
                If dtdatos.Columns.Contains("p_inid") Then dtdatos.Columns.Remove("p_inid")

                For Each objcampo In lstcampo
                    If objcampo.vcDes.ToLower = "código" Then lstcampo.Remove(objcampo) : Exit For
                Next
                For Each objcampo In lstcampo
                    If objcampo.vcDes.ToLower = "código de usuario" Then lstcampo.Remove(objcampo) : Exit For
                Next
                If dtdatos IsNot Nothing Then
                    eeAutenticacion.ExportarDatos(dtdatos, "AutenticacionUsuario", lstcampo)
                End If
            End If
        Catch ex As Exception

        Finally
            If (Campo IsNot Nothing) Then
                Campo.Dispose()
            End If
            If (usuariohistorico IsNot Nothing) Then
                usuariohistorico.Dispose()
            End If
        End Try
    End Sub

End Class
