Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.ActiveDirectoryVS
Imports System.Web.Services
Imports System.IO
Imports ClosedXML.Excel
Imports System.Web.Script.Services

Partial Class P_Configuracion_Seguridad_Administrar_ImportarUsuario
    Inherits System.Web.UI.Page


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
                If Not IsPostBack Then


                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    ' ==========================================================================================================================
    '    GUARDA POSICION
    ' ==========================================================================================================================
    '<WebMethod()>
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function Guarda_Posicion(ByVal idCampo As Integer, ByVal inPosicion As Integer) As Integer
    '
    '    Try
    '
    '        Dim BL_MOV_ As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Return BL_MOV_.Guarda_Posicion(idCampo, inPosicion)
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(ex.Message)
    '    End Try
    'End Function


    ' ==========================================================================================================================
    '    ELIMINAR USUARIOS IMPORTADOS
    ' ==========================================================================================================================
    '<WebMethod()>
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function Eliminar_UsuariosImportados(ByVal p_vcCriterio As String) As Integer
    '
    '    Try
    '
    '        Dim BL_MOV_ As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Dim oUSuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '
    '        Dim vcCodigoLog As String = Date.Today.DayOfYear.ToString + "" + oUSuario.vcUsu
    '
    '        Dim inLog As Integer = BL_MOV_.Obtiene_CodigoLog(vcCodigoLog)
    '
    '        vcCodigoLog = vcCodigoLog + (inLog + 1).ToString
    '
    '        BL_MOV_.Insert_Log(vcCodigoLog, "", " USUARIOS ELIMNINADOS ", DateTime.Now.ToString, "#FF8000")
    '
    '        Return BL_MOV_.ElimnarUsuariosImportados(p_vcCriterio)
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(ex.Message)
    '    End Try
    'End Function

    ' ==========================================================================================================================
    '    DATABLE 
    ' ==========================================================================================================================
    '<WebMethod()>
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function Lista_Campos(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcCriterio As String) As Object
    '
    '
    '    Try
    '
    '        Dim BL_MOV_ As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Dim dt As DataTable = BL_MOV_.Lista_Campos(vcCriterio)
    '
    '        Dim miLista As New List(Of Object)
    '
    '        Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(ex.Message)
    '    End Try
    'End Function

    ' ==========================================================================================================================
    '    DATABLE 
    ' ==========================================================================================================================
    '<WebMethod()>
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function Lista_Log(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcCriterio As String) As Object
    '
    '    Try
    '
    '        Dim BL_MOV_ As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Dim oUSuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '
    '        Dim vcCodigoLog As String = Date.Today.DayOfYear.ToString + "" + oUSuario.vcUsu
    '
    '        Dim inLog As Integer = BL_MOV_.Obtiene_CodigoLog(vcCodigoLog)
    '
    '        vcCodigoLog = vcCodigoLog + (inLog).ToString
    '
    '        Dim dt As DataTable = BL_MOV_.Lista_Log(vcCodigoLog)
    '
    '        Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(ex.Message)
    '    End Try
    'End Function

    ' ==========================================================================================================================
    '    DATABLE 
    ' ==========================================================================================================================
    '<WebMethod()>
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function Lista_UsuarioConCodigo(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcCriterio As String) As Object
    '
    '
    '    Try
    '
    '        Dim BL_MOV_ As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Dim dt As DataTable = BL_MOV_.Lista_UsuarioConCodigo(vcCriterio)
    '
    '        Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(ex.Message)
    '    End Try
    'End Function

    ' ==========================================================================================================================
    '    DATABLE 
    ' ==========================================================================================================================
    '<WebMethod()>
    '<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    'Public Shared Function Lista_UsuarioSinCodigo(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcCriterio As String) As Object
    '
    '
    '    Try
    '
    '        Dim BL_MOV_ As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '
    '        Dim dt As DataTable = BL_MOV_.Lista_UsuarioSinCodigo(vcCriterio)
    '
    '        Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(ex.Message)
    '    End Try
    'End Function


    'Private Function Agregar_Campo(ByVal inOrd As Integer, ByVal vcDes As String, ByVal vcAlias As String) As ENT_ENT_Campo
    '
    '    Dim ent As New ENT_ENT_Campo
    '    ent.inOrd = inOrd
    '    ent.vcNomAlias = vcAlias
    '    ent.vcDes = vcDes
    '    ent.btVis = True
    '
    '    Return ent
    '
    'End Function

    ' =======================================================================================================
    '   GUARDA ARCHIVO
    ' =======================================================================================================
    'Protected Sub btnCargar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnCargar.Click
    '    Try
    '
    '       
    '
    '        If (Not fuArchivo.PostedFile Is Nothing) And (fuArchivo.PostedFile.ContentLength > 0) Then
    '
    '            ' =============================================================================================================================
    '            ' NOMBRE ARCHIVO
    '            ' =============================================================================================================================
    '            Dim RutaCarpeta As String = "P_Movil/Administrar/Distribucion/"
    '
    '            Dim vcArchivo As String = fuArchivo.PostedFile.FileName
    '            Dim vcNombre As String = Path.GetFileNameWithoutExtension(vcArchivo)
    '
    '            ' =============================================================================================================================
    '            '   GUARDA ARCHIVO
    '            ' =============================================================================================================================
    '            Dim vcRuta As String = Server.MapPath("~/" & RutaCarpeta & Path.GetFileNameWithoutExtension(vcArchivo) & Path.GetExtension(vcArchivo))
    '            'MsgBox(vcRuta)
    '
    '            hdfvcRutaArchivo.Value = vcRuta.Replace("\", "@")
    '
    '            hdfvcPass.Value = txtContraseña.Text
    '
    '            fuArchivo.PostedFile.SaveAs(vcRuta)
    '
    '        End If
    '
    '
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Sub

    ' =======================================================================================================
    '   EXPORTAR ARCHIVO
    ' =======================================================================================================
    'Protected Sub btnExportar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnExportar.Click
    '    Try
    '
    '        Dim oUSuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '
    '        Dim BL_SEG_Usu As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(oUSuario.IdCliente)
    '
    '        Dim lstCampo As New List(Of ENT_ENT_Campo)
    '
    '        Dim dtDatos As New DataTable
    '
    '        Dim dtColumns As DataTable = BL_SEG_Usu.Lista_Campos("")
    '        Dim i As Integer = 1
    '
    '        For Each row As DataRow In dtColumns.Rows
    '            lstCampo.Add(Agregar_Campo(i, row("vcNomColumnXls"), row("vcNomColumnSql")))
    '            i = i + 1
    '        Next
    '
    '        Dim vcCodigoLog As String = Date.Today.DayOfYear.ToString + "" + oUSuario.vcUsu
    '
    '        Dim inLog As Integer = BL_SEG_Usu.Obtiene_CodigoLog(vcCodigoLog)
    '
    '        vcCodigoLog = vcCodigoLog + (inLog + 1).ToString
    '
    '        dtDatos = BL_SEG_Usu.Lista_UsuarioSinCodigo("")
    '
    '        For Each row As DataRow In BL_SEG_Usu.Lista_UsuarioConCodigo("").Rows
    '            dtDatos.ImportRow(row)
    '        Next
    '
    '        If dtDatos.Columns.Contains("vcPas") Then
    '            For Each row As DataRow In dtDatos.Rows
    '                row("vcPas") = Cryptographics.DecryptString(row("vcPas").ToString)
    '            Next
    '        End If
    '        
    '
    '        dtDatos.Columns.Remove(dtDatos.Columns(6).Caption)
    '        dtDatos.Columns.Remove(dtDatos.Columns(6).Caption)
    '        dtDatos.Columns.Remove(dtDatos.Columns(0).Caption)
    '
    '        BL_SEG_Usu.Dispose()
    '
    '        UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, "Usuarios", lstCampo, True)
    '
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Sub

    ' =============================================================================================================================
    '   INCIAR PROCESAR
    ' =============================================================================================================================
    '<WebMethod()> _
    'Public Shared Function Inicia_Procesar(ByVal vcCriterio As String, ByVal vcPass As String) As Integer
    '
    '    vcPass = Cryptographics.EncryptString(vcPass)
    '
    '    Dim vcRuta As String = vcCriterio.Replace("@", "\")
    '    Dim oUSuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
    '
    '    Dim Linea As BL_SEG_UsuarioImportador = New BL_SEG_UsuarioImportador(oUSuario.IdCliente)
    '    Dim Linea_ As BL_MOV_Linea = New BL_MOV_Linea(oUSuario.IdCliente)
    '
    '    Dim vcCodigoLog As String = Date.Today.DayOfYear.ToString + "" + oUSuario.vcUsu
    '
    '    Dim inLog As Integer = Linea.Obtiene_CodigoLog(vcCodigoLog)
    '
    '    vcCodigoLog = vcCodigoLog + (inLog + 1).ToString
    '
    '    ' =============================================================================================================================
    '    '   RECORRE ARCHIVO
    '    ' =============================================================================================================================
    '    
    '    Dim wb As New XLWorkbook(vcRuta)
    '
    '    Dim inPosiLinea As Integer = 0
    '    Dim inPosiCantidad As Integer = 0
    '
    '
    '
    '    ' ==================================================================
    '    ' HOJAS 
    '    ' ==================================================================
    '
    '    Dim hoja As IXLWorksheet = wb.Worksheets(0)
    '
    '    
    '    Dim CountHoja As Integer = hoja.RangeUsed.RowCount
    '    Dim ColumnHoja As Integer = hoja.RangeUsed.ColumnCount
    '
    '
    '
    '    ' ==================================================================
    '    '   DATATABLE columnas
    '    ' ==================================================================
    '    Dim dtColumns As DataTable = Linea.Lista_Campos("")
    '
    '    ' ==================================================================
    '    '
    '    ' ==================================================================
    '    Dim vcColumnas As String = ""
    '
    '    ' ==================================================================
    '    '   EXCEL
    '    ' ==================================================================
    '    For x = 1 To CountHoja
    '
    '        Dim vcSql As String = ""
    '
    '        ' ==================================================================
    '        '   PRIMERA FILA - CABECERA
    '        ' ==================================================================
    '        If x = 1 Then
    '
    '            Linea.Insert_Log(vcCodigoLog, "", " INICIO ", "Codigo Log : " + vcCodigoLog + "  -  " + DateTime.Now.ToString, "")
    '
    '            ' ==================================================================
    '            '   POSICION DE COLUMNAS
    '            ' ==================================================================
    '            For Each dtRow As DataRow In dtColumns.Rows
    '
    '                Dim vcNomColXls As String = dtRow("vcNomColumnXls").ToString
    '
    '                ' ==================================================================
    '                '   INFORMACION DE PROGRESO
    '                ' ==================================================================
    '                If dtRow("inPrimary").ToString = "1" Then
    '                    Linea.Insert_Log(vcCodigoLog, "# " + x.ToString, "PRIMARY", vcNomColXls, "")
    '                End If
    '
    '                ' ==================================================================
    '                '   BUSCA CAMPO SQL EN CABECERA EXCEL
    '                ' ==================================================================
    '                For col = 1 To ColumnHoja
    '
    '                    Dim vcNomColumnaXls As String = hoja.Cell(x, col).Value
    '
    '                    If vcNomColXls = vcNomColumnaXls Then
    '                        Dim vcFila As String = Trim(vcNomColumnaXls) + " Posicion : " + col.ToString
    '
    '                        Linea.Insert_Log(vcCodigoLog, "# " + x.ToString, "ENCONTRADA", vcFila, "")
    '                        dtRow("inPosicion") = col
    '                    End If
    '
    '                Next col
    '            Next
    '            ' ==================================================================
    '            '   CADENA COLUMNAS SQL
    '            ' ==================================================================
    '            For Each dtRow As DataRow In dtColumns.Rows
    '
    '                Dim inPosi As Integer = Convert.ToInt32(dtRow("inPosicion"))
    '                Dim btPrimary As Integer = Convert.ToInt32(dtRow("inPrimary"))
    '
    '                If inPosi <> 999 Or btPrimary = 1 Then
    '                    vcColumnas = vcColumnas + IIf(Len(vcColumnas) = 0, "", ",") + dtRow("vcNomColumnSql").ToString
    '                End If
    '            Next
    '
    '        Else
    '            ' ==================================================================
    '            '   PREPARAMOS SQL 
    '            ' ==================================================================
    '            Dim vcSqlValores As String = ""
    '            Dim vcCodEmp As String = ""
    '            Dim vcNom As String = ""
    '            Dim vcUsu As String = ""
    '
    '            Dim btNO_CODIGO As Boolean = False
    '            Dim btNO_REGISTRADO As Boolean = False
    '            Dim btUSUARIO_ACTUALIZADO As Boolean = False
    '            Dim btEXISTE_USUARIO As Boolean = False
    '            Dim btEXISTE_EMPLEADO As Boolean = False
    '            Dim btEXISTE_USU_GENERICO As Boolean = False
    '            Dim btValida_fila As Boolean = False
    '
    '            ' =======================================
    '            '   VALIDA FILA
    '            ' =======================================
    '
    '            For Each dtRow As DataRow In dtColumns.Rows
    '
    '                Dim vcNomColumn As String = dtRow("vcNomColumnXls").ToString
    '                Dim inColumnaXls As Integer = Convert.ToInt32(dtRow("inPosicion"))
    '
    '                Dim vcCelda As String = hoja.Cell(x, inColumnaXls).Value
    '
    '                If vcCelda.Length > 0 Then
    '                    btValida_fila = True
    '                End If
    '
    '            Next
    '
    '            ' =======================================
    '            '   FILA NO TIENE DATOS
    '            ' =======================================
    '            If btValida_fila = False Then
    '                Dim vcFila As String = " No Tiene Datos      "
    '                
    '                Linea.Insert_Log(vcCodigoLog, "# " + x.ToString, " - ", vcFila, "#D8D8D8")
    '
    '            End If
    '
    '            ' =======================================
    '            '   SI TIENE DATOS
    '            ' =======================================
    '            If btValida_fila Then
    '
    '                ' =======================================
    '                '   POR FILA RECORREMOS COLUMNAS SQL
    '                ' =======================================
    '                For Each dtRow As DataRow In dtColumns.Rows
    '
    '                    Dim vcNomColumn As String = dtRow("vcNomColumnXls").ToString
    '                    Dim vcNomColumnSql As String = dtRow("vcNomColumnSql").ToString
    '                    Dim inColumnaXls As Integer = Convert.ToInt32(dtRow("inPosicion"))
    '                    Dim btPrimary As Integer = Convert.ToInt32(dtRow("inPrimary"))
    '
    '                    ' =======================================
    '                    '   VALIDA QUE TENGA NUMERO DE COLUMNA
    '                    ' =======================================
    '                    If inColumnaXls <> 999 Then
    '
    '                        ' =======================================
    '                        '   VALOR CELDA
    '                        ' =======================================
    '                        Dim vcTipoDato As String = dtRow("vcTipoDato").ToString
    '                        Dim vcValorXls As String = hoja.Cell(x, inColumnaXls).Value
    '
    '                        ' =======================================
    '                        '   ES CAMPO PRIMARYEXISTE USUARIO 
    '                        ' =======================================
    '                        If btPrimary = 1 And Len(vcValorXls) > 0 Then
    '
    '                            ' =======================================
    '                            '   EXISTE EMPLEADO
    '                            ' =======================================
    '                            
    '                            If Linea.Validar_Empleado(oUSuario.IdCliente, Trim(vcValorXls)) > 0 Then
    '                                btEXISTE_EMPLEADO = True
    '                            End If
    '
    '                            ' =======================================
    '                            '   USUARIO REGISTRADO
    '                            ' =======================================
    '
    '                            If Trim(vcValorXls) <> "0000000000" Then
    '                                If Linea.Validar_Usuario(Trim(vcValorXls), "", "") > 0 Then
    '                                    btEXISTE_USUARIO = True
    '                                End If
    '                            End If
    '                            
    '
    '                        End If
    '
    '                        ' =======================================
    '                        '   CODIGO EMPLEADO EN BLANCO
    '                        ' =======================================
    '
    '                        If btPrimary = 1 And Len(vcValorXls) = 0 Or Trim(vcValorXls) = "0000000000" And btPrimary = 1 Then
    '                            btEXISTE_EMPLEADO = True
    '                            btEXISTE_USUARIO = False
    '                            vcValorXls = "0000000000"
    '                            btNO_CODIGO = True
    '                        End If
    '
    '                        ' =======================================
    '                        '   BUSCA USUARIO POR NOMBRE
    '                        ' =======================================
    '
    '                        If Trim(vcNomColumnSql) = "vcNom" Then
    '                            vcNom = Trim(vcValorXls)
    '                        End If
    '
    '                        If Trim(vcNomColumnSql) = "vcNom" And btNO_CODIGO Then
    '
    '                            If Linea.Validar_Usuario("", Trim(vcValorXls), "") > 0 Then
    '                                btEXISTE_USU_GENERICO = True
    '                            End If
    '                        End If
    '
    '                        ' =======================================
    '                        '   BUSCA USUARIO POR USUARIO ejm hinope
    '                        ' =======================================
    '
    '                        If Trim(vcNomColumnSql) = "vcUsu" Then
    '                            vcUsu = Trim(vcValorXls)
    '                        End If
    '
    '                        If Trim(vcNomColumnSql) = "vcUsu" And btNO_CODIGO Then
    '
    '                            If Linea.Validar_Usuario("", "", Trim(vcValorXls)) > 0 Then
    '                                btEXISTE_USU_GENERICO = True
    '                            End If
    '                        End If
    '
    '                        ' =======================================
    '                        '   CODIGO DE EMPLEADO
    '                        ' =======================================
    '                        If Trim(vcNomColumnSql) = "F_vcCodEmp" Then
    '
    '                            vcCodEmp = vcValorXls
    '
    '                        End If
    '
    '                        ' =======================================
    '                        '   CAMPO VACIO Y NO ES CADENA
    '                        ' =======================================
    '                        If Len(vcValorXls) = 0 And vcTipoDato <> "cadena" Then
    '                            vcValorXls = "0"
    '                        End If
    '
    '                        ' =======================================
    '                        '   EXISTE USUARIO GENERICO
    '                        ' =======================================
    '
    '                        If Trim(vcNomColumnSql) = "vcPas" Then
    '                            If vcValorXls.Length = 0 Then
    '                                vcValorXls = vcPass
    '                            Else
    '                                vcValorXls = Cryptographics.EncryptString(vcValorXls)
    '                            End If
    '
    '                        End If
    '
    '                        ' =======================================
    '                        '   VALORES SQL 
    '                        ' =======================================
    '                        vcValorXls = IIf(vcTipoDato = "cadena", "'", "") + Trim(vcValorXls) + IIf(vcTipoDato = "cadena", "'", "")
    '
    '                        vcSqlValores = vcSqlValores + IIf(Len(vcSqlValores) = 0, "", ",") + vcValorXls
    '
    '
    '                        'End If
    '
    '                    End If
    '
    '                Next
    '
    '                If Len(vcSqlValores) > 0 Then
    '
    '                    
    '                    ' =======================================
    '                    '   INSERT SQL
    '                    ' =======================================
    '
    '                    vcSql = "INSERT INTO SEG_USUARIO (btImportado,btEst," + vcColumnas + ") VALUES(1,1," + vcSqlValores + ")"
    '
    '                    ' =======================================
    '                    '   EXECUTE SQL
    '                    ' =======================================
    '
    '                    If btEXISTE_EMPLEADO And btEXISTE_USUARIO = False And btEXISTE_USU_GENERICO = False Then
    '
    '                        Dim inCodUsuario As Integer = Linea.Validar_UsuarioImportado(vcNom, vcUsu)
    '
    '                        If inCodUsuario > 0 Then
    '                            btUSUARIO_ACTUALIZADO = True
    '                            vcSql = " UPDATE seg_usuario SET f_vcCodEmp='" + Trim(vcCodEmp) + "',vcNom='" + Trim(vcNom) + "', dtFecImportado = getdate() WHERE P_inCod = " + inCodUsuario.ToString
    '                        End If
    '
    '                        Linea.Exucute_Usuario(vcSql)
    '
    '                    End If
    '
    '
    '                    ' =======================================
    '                    '   INFORMACION PROGRESO
    '                    ' =======================================
    '
    '                    Dim vcTipoRegistro As String '= IIf(btREGISTRADO = False And btEXISTE_USUARIO, IIf(btNO_CODIGO, IIf(btEXISTE_USU_GENERICO, "USUARIO GENERICO EXISTE", "NUEVO USUARIO GENERICO"), "NUEVO USUARIO"), IIf(btREGISTRADO And btEXISTE_USUARIO, "USUARIO EXISTE", "CODIGO NO EXISTE"))
    '                    Dim vcColorLog As String
    '
    '                    If btEXISTE_USUARIO = False And btEXISTE_EMPLEADO Then
    '
    '                        If btNO_CODIGO Then
    '
    '                            If btEXISTE_USU_GENERICO Then
    '                                vcTipoRegistro = "USUARIO GENERICO EXISTE"
    '                                vcColorLog = "#2E2EFE"
    '                            Else
    '                                vcTipoRegistro = "NUEVO USUARIO GENERICO"
    '                                vcColorLog = "#04B404"
    '                            End If
    '                        Else
    '                            If btUSUARIO_ACTUALIZADO Then
    '                                vcTipoRegistro = "USUARIO ACTUALIZADO"
    '                                vcColorLog = "#04B404"
    '                            Else
    '                                vcTipoRegistro = "NUEVO USUARIO"
    '                                vcColorLog = "#04B404"
    '                            End If
    '                            
    '                        End If
    '                    Else
    '
    '                        If btEXISTE_USUARIO Then
    '                            If btEXISTE_EMPLEADO Then
    '                                vcTipoRegistro = "REGISTRADO"
    '                                vcColorLog = "#2E2EFE"
    '                            Else
    '                                vcTipoRegistro = "USUARIO EXISTE SIN EMPLEADO"
    '                                vcColorLog = "#FF0000"
    '                            End If
    '
    '                        Else
    '                            vcTipoRegistro = "CODIGO EMPLEADO NO EXISTE"
    '                            vcColorLog = "#FF0000"
    '                        End If
    '                    End If
    '
    '
    '                    'Linea.SEG_UsuarioImportacionConfiguracion("i_LOG insert into seg_usuarioImportacionlog (vcFilaLog,vcTipoLog,vcLogDescrip) values('# " + x.ToString + "','" + vcFila + "',' " + vcSqlValores.Replace("'", "") + " ')")
    '                    Linea.Insert_Log(vcCodigoLog, "# " + x.ToString, vcTipoRegistro, vcSqlValores.Replace("'", ""), vcColorLog)
    '
    '                    Linea.Activa_UsuarioGenerico(oUSuario.IdCliente, "")
    '
    '                End If
    '            End If
    '
    '        End If
    '
    '    Next x
    '
    '    ' ==============================================
    '    '   TOTALES
    '    ' ==============================================
    '    Dim vcFin As String = CountHoja.ToString
    '
    '    Linea.Insert_Log(vcCodigoLog, "", " Fin ", vcFin, "")
    '
    '    ' ========================================================
    '    '   ACTUALIZA REGION PERFIL DASHBORD DE NUEVOS USUARIOS
    '    ' ========================================================
    '    Linea.Actualizar_RegionPerfilDashBord("")
    '
    '
    '    Return 0
    '
    'End Function


End Class
