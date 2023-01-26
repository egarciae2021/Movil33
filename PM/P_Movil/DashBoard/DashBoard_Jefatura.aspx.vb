Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
Imports Utilitario
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Comun.Auditoria.Constantes
Imports System.Web.Script.Services
Imports System.Reflection
Imports VisualSoft.PCSistelMovil.Importacion.BL

Public Class DashBoard_Jefatura
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oBlEmpleado As BL_GEN_Empleado = Nothing
        Dim oBlOrganizacion As BL_GEN_Organizacion = Nothing
        Dim dashboard As BL_DashBoard = Nothing
        Dim viIdTecnico As String = "-1|-1"
        Dim nomTabla As String = "V_SUM_SC_"
        Dim nomTablaResumen As String = "V_RES_MC_L_"
        Dim nomTablaAcumulada As String = "V_RES_ACUM_MC_L_"
        Dim oJavaScriptSerializer As New JavaScriptSerializer
        Try
            If Not IsPostBack Then

                Dim objUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                Me.hdfIdUsuarioLogeado.Value = objUsuario.P_inCod
                Me.hdfCodSucursal.Value = objUsuario.F_vcCodSuc
                Me.hdfCodOrganizacion.Value = objUsuario.F_vcCodInt
                hdfEmpleado.Value = objUsuario.Empleado.P_vcCod
                hdfCodUsuario.Value = objUsuario.vcUsu
                hdfAdmin.Value = "0"
                hdfCodSucursal.Value = objUsuario.F_vcCodSuc

                viIdTecnico = "-1|-1"
                Me.hdfEsUsuario.Value = "1"
                hdfIdTecnico.Value = viIdTecnico.Split("|")(0)

                For Each oPerfil As ENT_SEG_Perfil In objUsuario.Perfiles
                    If oPerfil.vcNom = "Administrador" OrElse oPerfil.vcNom = "Super Administrador" Then
                        hdfAdmin.Value = "1"
                    End If
                Next

                Dim strAnd As String = ""
                Dim strAndResumen As String = ""
                Dim miDateTime As Date
                Dim diferencia As Integer

                If Request.QueryString("pe") IsNot Nothing Then
                    'miDateTime = Date.Parse("20" + Request.QueryString("pe").Substring(2, 2) + Request.QueryString("pe").Substring(0, 2) + "010000")
                    miDateTime = Date.ParseExact("20" + Request.QueryString("pe").Substring(2, 2) + Request.QueryString("pe").Substring(0, 2) + "010000", "yyyyMMddhhmm", Nothing)
                Else
                    'miDateTime = Date.Now
                    Dim vcFechaActual As String = UtilitarioWeb.ObtieneFechaHoraANSIServidor(False)
                    Dim inAnio As Integer = vcFechaActual.Substring(0, 4)
                    Dim inMes As Integer = vcFechaActual.Substring(4, 2)
                    Dim inDia As Integer = vcFechaActual.Substring(6, 2)
                    miDateTime = New DateTime(inAnio, inMes, inDia)
                End If

                diferencia = DateDiff(DateInterval.Month, miDateTime, Date.Today)

                For index = 0 To 11
                    Dim mes As Date
                    If Request.QueryString("pe") IsNot Nothing Then
                        If diferencia > 6 Then
                            mes = miDateTime.AddMonths(6 - index)
                        Else
                            mes = miDateTime.AddMonths(diferencia - index)
                        End If
                    Else
                        mes = miDateTime.AddMonths(-index)
                    End If

                    Select Case mes.Month
                        Case 1
                            ddlPeriodo.Items.Add(New ListItem("Ene " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 2
                            ddlPeriodo.Items.Add(New ListItem("Feb " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 3
                            ddlPeriodo.Items.Add(New ListItem("Mar " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 4
                            ddlPeriodo.Items.Add(New ListItem("Abr " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 5
                            ddlPeriodo.Items.Add(New ListItem("May " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 6
                            ddlPeriodo.Items.Add(New ListItem("Jun " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 7
                            ddlPeriodo.Items.Add(New ListItem("Jul " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 8
                            ddlPeriodo.Items.Add(New ListItem("Ago " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 9
                            ddlPeriodo.Items.Add(New ListItem("Sep " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 10
                            ddlPeriodo.Items.Add(New ListItem("Oct " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case 11
                            ddlPeriodo.Items.Add(New ListItem("Nov " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                        Case Else
                            ddlPeriodo.Items.Add(New ListItem("Dic " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + mes.Year.ToString.Substring(2, 2)))
                            Exit Select
                    End Select
                Next

                If Request.QueryString("pe") IsNot Nothing Then
                    ddlPeriodo.SelectedValue = Request.QueryString("pe").ToString
                Else
                    ddlPeriodo.SelectedValue = Now.AddMonths(-1).ToString("MMyy")
                End If
                
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If oBlEmpleado IsNot Nothing Then oBlEmpleado.Dispose()
            If dashboard IsNot Nothing Then dashboard.Dispose()
        End Try
    End Sub


    Public Shared Function obtenerPieDashResumen_2(ByVal vcNomGrupo As String, ByVal vcNomMes As String, ByVal inTipLin As String, ByVal vcNomCuenta As String,
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

    <WebMethod()>
    Public Shared Function ListarLineas(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String, ByVal vcTipOrdCol As String,
                                        ByVal isAdmin As String, ByVal p_mesTabla As String) As Object ' String
        Dim lista As BL_MOV_IMP_Facturacion = Nothing
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

        Try
            lista = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim vcCodInt As String
            Dim vcCodEmp As String
            If Not oUsuario.F_vcCodInt Is Nothing Then
                vcCodInt = oUsuario.F_vcCodInt.ToString()
            Else
                vcCodInt = ""
            End If

            If Not oUsuario.Empleado.P_vcCod Is Nothing Then
                vcCodEmp = oUsuario.Empleado.P_vcCod.ToString()
            Else
                vcCodEmp = ""
            End If

            Dim dt As DataTable = lista.Listar_Resumen_DashBoard_Resumen(p_mesTabla, "resumen_lineasPorCuenta", isAdmin, vcCodInt, vcCodEmp)

            Dim TotalPaginas As Integer
            Dim TotalRegistros As Integer
            Dim inResto As Integer

            'If dt.Rows.Count = 1 And dt.Rows(0)("vcNomConc") = 0 Then
            '    TotalRegistros = dt.Rows.Count
            '    TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
            '    If inResto > 0 Then TotalPaginas = TotalPaginas + 1
            'Else
            If vcOrdCol <> "" Then
                Dim dvData As New DataView(dt)
                dvData.Sort = vcOrdCol + " " + vcTipOrdCol
                dt = dvData.ToTable()
            End If

            TotalRegistros = dt.Rows.Count
            TotalPaginas = Math.DivRem(TotalRegistros, Convert.ToInt32(inPagTam), inResto)
            If inResto > 0 Then TotalPaginas = TotalPaginas + 1
            'End If

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

    <WebMethod()>
    Public Shared Function Listar_Cabecera_Linea(ByVal inPagTam As String, ByVal inPagAct As String, ByVal vcOrdCol As String,
                                                ByVal vcTipOrdCol As String, ByVal p_mesTabla As String, ByVal isAdmin As String
                                                ) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Facturacion = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim vcCodInt As String = oUsuario.F_vcCodInt
        Dim vcCodEmp As String = oUsuario.F_vcCodEmp


        Dim dt As New DataTable
        dt.Columns.Add("vcNomCon")
        dt.Rows.Add("RowNumber")
        dt.Rows.Add("vcNum")
        dt.Rows.Add("Cuenta")
        dt.Rows.Add("Operador")
        dt.Rows.Add("Empleado")
        Dim lst As New List(Of ENT_GEN_GrupoServicio)
        For Each fila As DataRow In dt.Rows
            Dim obj As New ENT_GEN_GrupoServicio
            obj.vcGrupo = fila("vcNomCon")
            lst.Add(obj)

        Next


        dt = bl_.Listar_Resumen_DashBoard_Resumen(p_mesTabla, "cabecera_lineas", "", "", "")

        If dt.Rows.Count = 1 And dt.Rows(0)(0).ToString() = "0" Then
            Dim listaVacia As New List(Of ENT_GEN_GrupoServicio)
            Return listaVacia
        Else
            For Each fila As DataRow In dt.Rows
                Dim obj As New ENT_GEN_GrupoServicio
                obj.vcGrupo = fila("vcNomConc")
                lst.Add(obj)
            Next
            Return lst
        End If
    End Function



    Private Function ReemplazarTilder(ByVal strValor As String) As String
        strValor = strValor.Replace("Á", "A")
        strValor = strValor.Replace("É", "E")
        strValor = strValor.Replace("Í", "I")
        strValor = strValor.Replace("Ó", "O")
        strValor = strValor.Replace("Ú", "U")
        strValor = strValor.Replace("á", "a")
        strValor = strValor.Replace("é", "e")
        strValor = strValor.Replace("í", "i")
        strValor = strValor.Replace("ó", "o")
        strValor = strValor.Replace("ú", "u")

        Return strValor
    End Function

    Private Sub CargarDatosGruposTiposSolicitud(ByVal oUsuario As ENT_SEG_Usuario)

        'Permisos por Grupos de Usuario (1er Nivel de Seguridad)
        Dim vcGruTipSolLee As String = "", vcGruTipSolEdi As String = "", vcGruTipSolEli As String = ""
        For i As Integer = 0 To oUsuario.TipoSolicitudGrupoOrigen.Count - 1
            If oUsuario.TipoSolicitudGrupoOrigen.Item(i).biLeer Then
                vcGruTipSolLee += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
            End If
            If oUsuario.TipoSolicitudGrupoOrigen.Item(i).biEditar Then
                vcGruTipSolEdi += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
            End If
            If oUsuario.TipoSolicitudGrupoOrigen.Item(i).biEliminar Then
                vcGruTipSolEli += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
            End If
        Next

        If vcGruTipSolLee.Length > 0 Then hdfGruTipSol.Value = vcGruTipSolLee.Substring(0, vcGruTipSolLee.Length - 1) Else hdfGruTipSol.Value = "0"
        If vcGruTipSolEdi.Length > 0 Then hdfGruTipSolEdi.Value = vcGruTipSolEdi.Substring(0, vcGruTipSolEdi.Length - 1)
        If vcGruTipSolEli.Length > 0 Then hdfGruTipSolEli.Value = vcGruTipSolEli.Substring(0, vcGruTipSolEli.Length - 1)

    End Sub

    <WebMethod()>
    Public Shared Function ListarByEmpleado_Dash(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal inCodTip As Integer, ByVal vcIsAdmin As String) As Object
        Dim linea As BL_MOV_Linea = Nothing
        Try

            linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If vcIsAdmin = "1" Then
                Return JQGrid.DatosJSON(linea.ListarByEmpleado_Dash(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt, inCodTip, vcIsAdmin), inPagTam, inPagAct)
            Else
                Return JQGrid.DatosJSON(linea.ListarByEmpleado_Dash(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod, inCodTip, vcIsAdmin), inPagTam, inPagAct)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If linea IsNot Nothing Then
                linea.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerPieDash(ByVal prNomTabla As String, ByVal prEsAdmin As String, ByVal prCodSuc As String, ByVal inCodTip As Integer) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If Not prEsAdmin = "1" Then
                vcCodInt = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod
            End If

            Return dash.obtenerPieDash(prNomTabla, vcCodInt, IIf(prEsAdmin = "1", True, False), "-1", prCodSuc, oCultura.Moneda.vcSimMon, oCultura, inCodTip)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerPieDashResumen(ByVal prNomTabla As String, ByVal prEsAdmin As String, ByVal prCodSuc As String, ByVal inCodTip As Integer, ByVal Tipo As String) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            If Not prEsAdmin = "1" Then
                vcCodInt = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod
            End If

            Return dash.obtenerPieDashFacturacion(prNomTabla, vcCodInt, "-1", prCodSuc, oCultura.Moneda.vcSimMon, oCultura, inCodTip, Tipo)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerHistoricoDash(ByVal prGlobal As String, ByVal prAnd As String, ByVal prObjetivo As String, ByVal Tipo As String,
                                                ByVal inNivel As Integer, ByVal prValor As String, ByVal prusuario As String, ByVal inAdmin As Integer,
                                                ByVal prCodSuc As String, ByVal inCodTipSer As Integer, ByVal prTipoMon As String, ByVal prSepDecimal As String,
                                                ByVal prSepMiles As String, ByVal inNumDecimal As Integer) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim objetivo As String = prObjetivo.Replace("S/.", "").Replace(oCultura.Moneda.vcSimMon, "")
            Dim dtObjetivo As New DataTable
            objetivo = objetivo.Replace(",", "").Trim
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'dtObjetivo = dash.obtenerHistoricoObjetivos(Tipo, inNivel, prValor, IIf(inAdmin = 1, "", prusuario), prCodSuc, inCodTipSer, "-1")
            dtObjetivo = dash.obtenerHistoricoObjetivos(Tipo, inNivel, prValor, prCodSuc, inCodTipSer, "-1")
            Return dash.obtenerHistoricoDash(vcCodInt, prGlobal, prAnd.Replace("|", "'"), dtObjetivo, Tipo, 0, "-1", inNivel, prCodSuc, prTipoMon, prSepDecimal, prSepMiles, inNumDecimal)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerHistoricoDash_Movil(ByVal prPeriodo As String, ByVal prMesesAtras As Integer, ByVal prGlobal As String, ByVal prAnd As String, ByVal prObjetivo As String, ByVal Tipo As String, _
                                                ByVal inNivel As Integer, ByVal prValor As String, ByVal prusuario As String, ByVal inAdmin As Integer, _
                                                ByVal inCodTipServ As Integer, ByVal prCodOperador As String, ByVal prAbrevMoneda As String, ByVal prSepDec As String, _
                                                ByVal prSepMil As String, ByVal inNumDec As Integer, ByVal prCodSuc As String, ByVal inCodTip As Integer) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            prCodOperador = ("" & prCodOperador).Trim()
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim objetivo As String = prObjetivo.Replace("S/.", "").Replace(oCultura.Moneda.vcSimMon, "")
            Dim dtObjetivo As New DataTable
            objetivo = objetivo.Replace(",", "").Trim
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'dtObjetivo = dash.obtenerHistoricoObjetivos(Tipo, inNivel, prValor, IIf(inAdmin = 1, "", prusuario), prCodSuc, inCodTipServ, prCodOperador)
            dtObjetivo = dash.obtenerHistoricoObjetivos_Movil(prPeriodo, prMesesAtras, Tipo, inNivel, prValor, prCodSuc, inCodTipServ, prCodOperador, inCodTip)
            Return dash.obtenerHistoricoDash_Movil(prPeriodo, prMesesAtras, "", prGlobal, prAnd.Replace("|", "'"), dtObjetivo, Tipo, inCodTipServ, prCodOperador, inNivel, prCodSuc, prAbrevMoneda, prSepDec, prSepMil, inNumDec, inCodTip)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function obtenerHistoricoDash_MovilResumen(ByVal prPeriodo As String, ByVal prMesesAtras As Integer, ByVal prGlobal As String, ByVal prAnd As String, ByVal prObjetivo As String, ByVal Tipo As String, _
                                                             ByVal inNivel As Integer, ByVal prValor As String, ByVal prusuario As String, ByVal inAdmin As Integer, _
                                                             ByVal inCodTipServ As Integer, ByVal prCodOperador As String, ByVal prAbrevMoneda As String, ByVal prSepDec As String, _
                                                             ByVal prSepMil As String, ByVal inNumDec As Integer, ByVal prCodSuc As String, ByVal inCodTip As Integer) As List(Of String)
        Dim dash As BL_DashBoard = Nothing
        Try
            prCodOperador = ("" & prCodOperador).Trim()
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim objetivo As String = prObjetivo.Replace("S/.", "").Replace(oCultura.Moneda.vcSimMon, "")
            Dim dtObjetivo As New DataTable
            objetivo = objetivo.Replace(",", "").Trim
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            dash = New BL_DashBoard(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'dtObjetivo = dash.obtenerHistoricoObjetivos(Tipo, inNivel, prValor, IIf(inAdmin = 1, "", prusuario), prCodSuc, inCodTipServ, prCodOperador)
            dtObjetivo = dash.obtenerHistoricoObjetivos_Movil(prPeriodo, prMesesAtras, Tipo, inNivel, prValor, prCodSuc, inCodTipServ, prCodOperador, inCodTip)
            Return dash.obtenerHistoricoDash_MovilResumen(prPeriodo, prMesesAtras, "", prGlobal, prAnd.Replace("|", "'"), dtObjetivo, Tipo, inCodTipServ, prCodOperador, inNivel, prCodSuc, prAbrevMoneda, prSepDec, prSepMil, inNumDec, inCodTip)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
        End Try
    End Function


    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Shared Function ObtenerEmpleadoAsignado(ByVal IdEmpleado As String, ByVal inTipOri As String) As ENT_GEN_Empleado
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim logica As VisualSoft.Comun.CuentaCobro.BL.BL_GEN_Empleado = New VisualSoft.Comun.CuentaCobro.BL.BL_GEN_Empleado(Integer.Parse(inTipOri), oUsuario.IdCliente)
        Try
            HttpContext.Current.Session("vcFiltro_Movimientos") = "EMPL_P_vcCODEMP" & "|" & IdEmpleado & "|" & 5
            Dim entidad As New ENT_GEN_Empleado
            entidad = logica.getEmpleados(IdEmpleado)
            Return entidad
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If logica IsNot Nothing Then logica.Dispose()
        End Try
    End Function



    <WebMethod()>
    Public Shared Function ObtenerDashboardGeneral(ByVal Anio As String, ByVal Mes As String, ByVal Dia As String, ByVal DatosMostrar As String) As String
        Dim dash As BL_DashBoard = Nothing
        Dim dash_Solicitudes As BL_DashBoard_Solicitudes = Nothing
        Dim resultado As String = String.Empty
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim vcCodInt As String = oUsuario.F_vcCodInt
            dash = New BL_DashBoard(oUsuario.IdCliente)
            vcCodInt = "" & oUsuario.F_vcCodInt
            resultado = dash.ObtenerDashboardGeneral(vcCodInt, Anio, Mes, Dia, oUsuario.P_inCod.ToString(), DatosMostrar)

            ' Pie solicitudes
            'Pie solicitudes proceso
            Dim IdTipSolTecAsi As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(2)
            Dim IdTipSolTecPro As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(3) + "," + UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(4)
            Dim IdTipSolTecCulAnu As String = UtilitarioWeb.TipoSolicitud.ListarTipoSolicitudTecnico(0)
            Dim CodEmp As String = String.Empty
            If UtilitarioWeb.Seguridad.EsAdministrador() Then CodEmp = "-1" Else CodEmp = oUsuario.Empleado.P_vcCod
            If (DatosMostrar = "1") Then
                dash_Solicitudes = New BL_DashBoard_Solicitudes(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
                Dim solicitudes_Pie_proceso As String = dash_Solicitudes.ObtieneCantidadSolicitudes_Pie_proceso(Anio + Mes, oUsuario.P_inCod,
                                                            IdTipSolTecAsi, IdTipSolTecPro, IdTipSolTecCulAnu, CodEmp, oCultura)
                resultado += "¬" & solicitudes_Pie_proceso
            End If

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash IsNot Nothing Then dash.Dispose()
            If dash_Solicitudes IsNot Nothing Then dash_Solicitudes.Dispose()
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
