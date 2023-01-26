Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Xml
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Threading.Tasks
Imports System.Linq
Imports Newtonsoft.Json.Linq
Imports Newtonsoft.Json
Imports System.Reflection

Partial Class P_Configuracion_HerramientasSistema_VisorEventos_LogErrores
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oTempToken As PCSistelMovilLog45.Token
                Task.Run(Async Function()
                             oTempToken = Await PCSistelMovilLog45.Log.GenerarToken("mpajuelo@pcsistel.com", "Aa123456!")
                             Session("UsuarioToken") = oTempToken
                         End Function).Wait()

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Shared Iterator Function AllChildren(ByVal json As JToken) As IEnumerable(Of JToken)
        For Each c In json.Children()
            Yield c

            For Each cc In AllChildren(c)
                Yield cc
            Next
        Next
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String, ByVal vcCam As String, ByVal vcValBus As String,
                                  ByVal vcTab As String, ByVal inTipOri As String, ByVal inFilReg As String, ByVal TipoLog As String) As Object
        Try

            Dim Dominio As String = "" & HttpContext.Current.Session("IdDominio").ToString()
            If Dominio = "" Then Dominio = "0"
            If vcOrdCol = "FechaHoraString" Then vcOrdCol = "FechaHora"

            vcValBus = vcValBus.Replace("/", "¬¬¬¬")

            HttpContext.Current.Session("LogErrores_TipoLog") = TipoLog
            HttpContext.Current.Session("LogErrores_vcValBus") = vcValBus

            Dim oToken As PCSistelMovilLog45.Token = CType(HttpContext.Current.Session("UsuarioToken"), PCSistelMovilLog45.Token)
            Dim resultadoJSON As String = ""
            Task.Run(Async Function()
                         resultadoJSON = Await PCSistelMovilLog45.Log.ObtenerLogs(oToken, Dominio, TipoLog, vcOrdCol, vcTipOrdCol, inPagTam, inPagAct, vcValBus)
                     End Function).Wait()
            Dim resultado As Dictionary(Of String, String) = JsonConvert.DeserializeObject(Of Dictionary(Of String, String))(resultadoJSON)
            Dim iTotalRegistros As String = resultado.Item("TotalRegistros")
            Dim listaLogs As List(Of PCSistelMovilLog45.LogCentral) = JsonConvert.DeserializeObject(Of List(Of PCSistelMovilLog45.LogCentral))(resultado.Item("Listado"))
            Return DatosJSON(listaLogs, iTotalRegistros, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    Public Shared Function DatosJSON(ByVal listaLog As List(Of PCSistelMovilLog45.LogCentral), ByVal TotalRegistros As Integer, ByVal inPagTam As Integer, ByVal inPagAct As Integer, Optional ByVal indiceId As Integer = 0) As Dictionary(Of String, Object)
        Dim dict As Dictionary(Of String, Object) = New Dictionary(Of String, Object)()
        dict.Add("PaginaActual", inPagAct)
        dict.Add("TotalPaginas", Convert.ToInt32(Math.Ceiling(Convert.ToDouble(TotalRegistros) / Convert.ToDouble(inPagTam))))
        dict.Add("TotalRegistros", TotalRegistros)
        Dim lstItem As List(Of Object) = New List(Of Object)()
        For Each oLog As PCSistelMovilLog45.LogCentral In listaLog
            Dim dictItem As Dictionary(Of String, Object) = New Dictionary(Of String, Object)()
            dictItem.Add("ID", oLog.Id)
            Dim lstValores As List(Of Object) = New List(Of Object)()
            For Each propertyInfo As PropertyInfo In oLog.GetType().GetProperties()
                lstValores.Add(propertyInfo.GetValue(oLog))
            Next
            dictItem.Add("Row", lstValores)
            lstItem.Add(dictItem)
        Next
        dict.Add("Items", lstItem)
        Return dict
    End Function

    Private Shared Function ObtenerDataTableFromLogXml(ByVal vcValBus As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String) As DataTable
        Dim fecha As Date = Date.Now
        Dim m As String = fecha.Month
        Dim a As String = fecha.Year.ToString.Substring(2)
        If fecha.Month.ToString.Length = 1 Then
            m = "0" & fecha.Month.ToString
        End If

        'Dim vcNombreProducto As String = Utilitario.NombreSistemaMovil

        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\LogErrores\", "\")

        Dim myXMLfile As String = HttpContext.Current.Server.MapPath("~") & "\LogErrores" + CarpetaDominio + "\" + Utilitario.NombreSistemaMovil.Replace(" ", "_") + "_" & m & a & ".xml"
        If Not IO.File.Exists(myXMLfile) Then
            Return Nothing
        End If

        Dim text As String = File.ReadAllText(myXMLfile)
        text = text.Replace("<NombreArchivo>", "[NombreArchivo]")
        text = text.Replace("</NombreArchivo>", "")
        text = text.Replace("<Metodo>", "[Metodo]")
        text = text.Replace("</Metodo>", "")
        text = text.Replace("<Linea>", "[Linea]")
        text = text.Replace("</Linea>", "")
        text = text.Replace("<Columna>", "[Columna]")
        text = text.Replace("</Columna>", "")
        text = text.Replace("</archivo>" & vbCrLf & "      <archivo>", "[-]")
        text = text.Replace("<NombreArchivo />", "")
        text = text.Replace("<Fila xsi:nil=""true"" />", "")

        Dim reader As XmlReader = XmlReader.Create(New StringReader(text))
        Dim ds As New DataSet()
        ds.ReadXml(reader)

        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        If Not ds.Tables(1).Columns.Contains("ID") Then
            Dim AColumn As DataColumn = New DataColumn("ID", Type.GetType("System.Int32"))
            AColumn.AutoIncrement = True
            AColumn.AutoIncrementSeed = 1
            AColumn.AutoIncrementStep = 1
            ds.Tables(1).Columns.Add(AColumn)
            Dim ARow As DataRow
            Dim intCtr As Integer = 0
            Dim vcValor As String = ""

            For Each ARow In ds.Tables(1).Rows
                intCtr += 1
                ARow.Item("ID") = intCtr

                vcValor = ARow.Item("FechaHora")
                vcValor = Left(vcValor.Replace("-", "").Replace("T", " "), 17)
                vcValor = UtilitarioWeb.DevuelveFechaHoraFormateada(vcValor, oCultura.vcFecCor + " " + oCultura.vcHorCor)
                ARow.Item("FechaHora") = vcValor

            Next
            AColumn.ReadOnly = True
            AColumn.SetOrdinal(0)
        End If

        Dim dtDatos As DataTable
        If Trim(vcValBus) <> "" Then
            vcValBus = vcValBus.Trim.Replace("'", "")

            Dim dv As DataView = ds.Tables(1).DefaultView
            dv.RowFilter = "tipo like '%" & vcValBus & _
                           "%' OR fechahora like '%" & vcValBus & _
                           "%' OR categoria like '%" & vcValBus & _
                           "%' OR descripcion like '%" & vcValBus & "%'"

            If Trim(vcOrdCol) <> "" Then
                dv.Sort = vcOrdCol & " " & vcTipOrdCol
            End If

            dtDatos = dv.ToTable
        Else
            Dim dv As DataView
            If Trim(vcOrdCol) <> "" Then
                dv = ds.Tables(1).DefaultView
                dv.Sort = vcOrdCol & " " & vcTipOrdCol
                dtDatos = dv.ToTable
            Else
                dtDatos = ds.Tables(1)
            End If
        End If
        'If vcOrdCol <> "" Then
        '    Dim view As DataView = New DataView(dtDatos)
        '    view.Sort = " " & 
        '    Dim dt As DataTable = view.Table
        '    Return dt
        'Else
        Return dtDatos
        'End If
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

    <WebMethod()>
    Public Shared Function EliminarLog(TipoLog As String, vcValBus As String) As String
        Try
            Dim Dominio As String = "" & HttpContext.Current.Session("IdDominio").ToString()
            If Dominio = "" Then Dominio = "0"

            Dim oToken As PCSistelMovilLog45.Token = CType(HttpContext.Current.Session("UsuarioToken"), PCSistelMovilLog45.Token)
            Dim resultadoJSON As String = ""
            Task.Run(Async Function()
                         resultadoJSON = Await PCSistelMovilLog45.Log.EliminarLogs(oToken, Dominio, TipoLog, vcValBus)
                     End Function).Wait()
            Return "ok"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Protected Sub eegLogErrores_ObtenerDatosAExportar(ByVal oTipoExcel As ExportarExcelGenerico.TipoExcel) Handles eegLogErrores.ObtenerDatosAExportar
        Dim Dominio As String = "" & HttpContext.Current.Session("IdDominio").ToString()
        If Dominio = "" Then Dominio = "0"
        Dim vcValBus As String = HttpContext.Current.Session("LogErrores_vcValBus")
        Dim TipoLog As String = HttpContext.Current.Session("LogErrores_TipoLog")
        Dim oToken As PCSistelMovilLog45.Token = CType(HttpContext.Current.Session("UsuarioToken"), PCSistelMovilLog45.Token)
        Dim resultadoJSON As String = ""
        Task.Run(Async Function()
                     resultadoJSON = Await PCSistelMovilLog45.Log.ObtenerLogs(oToken, Dominio, TipoLog, "", "", 1000, 1, vcValBus)
                 End Function).Wait()
        Dim resultado As Dictionary(Of String, String) = JsonConvert.DeserializeObject(Of Dictionary(Of String, String))(resultadoJSON)
        Dim iTotalRegistros As String = resultado.Item("TotalRegistros")
        Dim listaLogs As List(Of PCSistelMovilLog45.LogCentral) = JsonConvert.DeserializeObject(Of List(Of PCSistelMovilLog45.LogCentral))(resultado.Item("Listado"))
        Dim dtDatos As DataTable = UtilitarioWeb.ConvertirListaObjectos_Datatable(listaLogs)
        Try
            dtDatos.Columns.Remove("IdCliente")
            dtDatos.Columns.Remove("FechaHoraString")
            dtDatos.Columns.Remove("IPCliente")
        Catch ex As Exception
        End Try
        If dtDatos IsNot Nothing Then
            eegLogErrores.ExportarDatos(dtDatos, "Eventos")
        End If
    End Sub


End Class
