Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_DistribucionMinutosLinea
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else

                If Not IsPostBack Then

                    'Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim MOV_ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    'Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("DB1")
                    'Parametros.Dispose()

                    'hdfValorIlimitado.Value = lstParametros(0).Valor

                    'UtilitarioWeb.Dataddl(ddlTipoLinea, LineaTipo.Listar(-1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                    'UtilitarioWeb.Dataddl(ddlModeloDispositivo, MOV_ModeloDispositivo.Listar(-1, "<Seleccionar>"), "vcNom", "P_inCod")
                    'MOV_ModeloDispositivo.Dispose()
                    'LineaTipo.Dispose()

                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()> _
    Public Shared Function ListarColModelLineas(ByVal vcCodCue As String, ByVal vcValIli As String) As List(Of Object)
        Try
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dict As New Dictionary(Of String, Object)

            Dim dt As DataTable = Linea.ListarDistribucionServiciosColumnas(vcCodCue.Replace("&#39", "''"))
            Linea.Dispose()
            Dim colmodel As New List(Of Object)
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(0), dt.Rows(1).Item(0), False, True, 65, False, True, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(1), dt.Rows(1).Item(1), True, True, 90, False, True, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(2), dt.Rows(1).Item(2), False, True, 200, False, True, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(3), dt.Rows(1).Item(3), False, True, 110, False, False, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(4), dt.Rows(1).Item(4), False, True, 200, False, False, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(5), dt.Rows(1).Item(5), True, True, 90, False, False, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(6), dt.Rows(1).Item(6), False, True, 105, False, False, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(7), dt.Rows(1).Item(7), True, True, 90, False, False, ""))
            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(8), dt.Rows(1).Item(8), True, True, 60, False, False, ""))
            UtilitarioWeb.ConfigurarColumnasServicios(9, 5, dt, vcValIli, colmodel)

            Return colmodel
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarLineas(ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcValIli As String, ByVal vcCodCue As String, ByVal vcCodLin As String, ByVal vcCodEmp As String, _
                                         ByVal inCodInt As String, ByVal vcCodIMEI As String, ByVal inCodModDis As String, ByVal vcCodSuc As String, ByVal inCodTip As String, _
                                         ByVal btIncDep As String, ByVal vcCodCC As String, ByVal inCodNiv As String, ByVal inCodGruOri As String, ByVal vcCodInt2 As String, ByVal vcPeriodo As String) As Object
        Try
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim v_inCodTip As Integer?
            Dim v_inCodModDis As Integer?
            Dim v_btIncDep As Boolean?
            Dim v_inCodNiv As Integer?
            Dim v_inCodGruOri As Integer?
            Dim v_inCodInt As Integer?

            If Not String.IsNullOrEmpty(inCodModDis) And inCodModDis <> "null" And inCodModDis <> "-1" Then
                v_inCodModDis = Integer.Parse(inCodModDis)
            End If
            If Not String.IsNullOrEmpty(inCodTip) And inCodTip <> "null" And inCodTip <> "-1" Then
                v_inCodTip = Integer.Parse(inCodTip)
            End If
            If vcCodSuc = "null" Then
                vcCodSuc = ""
            End If
            If Not String.IsNullOrEmpty(btIncDep) Then
                v_btIncDep = Convert.ToBoolean(btIncDep)
            End If
            If Not String.IsNullOrEmpty(inCodNiv) And inCodNiv <> "null" And inCodNiv <> "-1" Then
                v_inCodNiv = Integer.Parse(inCodNiv)
            End If
            If Not String.IsNullOrEmpty(inCodGruOri) And inCodGruOri <> "null" And inCodGruOri <> "-1" Then
                v_inCodGruOri = Integer.Parse(inCodGruOri)
            End If
            If Not String.IsNullOrEmpty(inCodInt) And inCodInt <> "null" And inCodInt <> "-1" Then
                v_inCodInt = Integer.Parse(inCodInt)
            End If

            Dim dt As DataTable = New DataTable
            '= Linea.ListarDistribucionServicios(vcValIli, vcCodCue.Replace("&#39", "''"), vcCodLin, vcCodEmp, vcCodInt2, vcCodIMEI, v_inCodModDis, vcCodSuc, v_inCodTip, _
            'v_btIncDep, vcCodCC, v_inCodNiv, v_inCodGruOri, v_inCodInt)


            ' dt = Linea.ListarDistribucionServicios_Tmp(vcValIli, vcCodCue.Replace("&#39", "''"), vcPeriodo, v_inCodNiv, v_inCodGruOri, vcCodCC)
            Linea.Dispose()

            AlmacenaParametros(vcValIli, vcCodCue.Replace("&#39", "''"), vcCodLin, vcCodEmp, vcCodInt2, vcCodIMEI, v_inCodModDis, vcCodSuc, v_inCodTip, v_btIncDep, vcCodCC, v_inCodNiv, v_inCodGruOri, v_inCodInt)

            Return JQGrid.DatosJSON(dt, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function GuardarServicios(ByVal registro As String, ByVal vcValIli As String, ByVal vcPeriodo As String) As Dictionary(Of String, Object)
        Try

            Dim serial As New JavaScriptSerializer
            Dim oRegistros As Dictionary(Of String, Object) = serial.Deserialize(Of Dictionary(Of String, Object))(registro)
            Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'Dim _return As Dictionary(Of String, Object) = 'Linea.GuardarServicios_tmp(oRegistros, vcValIli, vcPeriodo)

            Linea.Dispose()

            ' Return _return
            Return Nothing

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

    <WebMethod()>
    Public Shared Function ListarPrincipal(ByVal vcCodInt As String) As List(Of Object)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstOrganizacion As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)
            Organizacion.Dispose()
            Dim NodoPrincipal As New List(Of Object)

            For Each oOrganizacion As ENT_GEN_Organizacion In lstOrganizacion
                Dim PrimerNivel As New List(Of Object)

                PrimerNivel.Add(oOrganizacion.vcCodInt)
                PrimerNivel.Add(0)
                PrimerNivel.Add(oOrganizacion.vcNomOrg)

                NodoPrincipal.Add(PrimerNivel)
            Next

            Return NodoPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarOrganizacion(ByVal vcCodInt As String) As List(Of ENT_GEN_Organizacion)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)
            Organizacion.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Public Shared Sub AlmacenaParametros(ByVal vcValIli As String, ByVal vcCodCue As String, ByVal vcCodLin As String, ByVal vcCodEmp As String, _
                                         ByVal vcCodInt2 As String, ByVal vcCodIMEI As String, ByVal inCodModDis As Integer?, ByVal vcCodSuc As String, _
                                         ByVal inCodTip As Integer?, ByVal btIncDep As Boolean?, ByVal vcCodCC As String, ByVal inCodNiv As Integer?, _
                                         ByVal inCodGruOri As Integer?, ByVal inCodInt As Integer?)
        Try
            Dim dict As New Dictionary(Of String, Object)

            dict.Add("vcValIli", vcValIli)
            dict.Add("vcCodCue", vcCodCue)
            dict.Add("vcCodLin", vcCodLin)
            dict.Add("vcCodEmp", vcCodEmp)
            dict.Add("vcCodInt2", vcCodInt2)
            dict.Add("vcCodDis", vcCodIMEI)
            dict.Add("inCodModDis", inCodModDis)
            dict.Add("vcCodSuc", vcCodSuc)
            dict.Add("inCodTip", inCodTip)
            dict.Add("btIncDep", btIncDep)
            dict.Add("vcCodCC", vcCodCC)
            dict.Add("inCodNiv", inCodNiv)
            dict.Add("inCodGruOri", inCodGruOri)
            dict.Add("inCodInt", inCodInt)

            HttpContext.Current.Session("ParametrosLinea") = dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    'Private Shared Sub ConfigurarColumnasServicios(ByVal offset As Integer, ByVal propiedadesServicio As Integer, ByVal dt As DataTable, ByVal vcValIli As String, _
    '                                               ByRef colmodel As List(Of Object))
    '    Dim contCol As Integer = 1
    '    Dim Ancho As Integer = 0

    '    Dim OpcionesEdicionCantidad(2) As String
    '    Dim OpcionesEdicionIlimitado(1) As String

    '    OpcionesEdicionIlimitado(0) = vcValIli
    '    OpcionesEdicionCantidad(0) = "10" 'size
    '    OpcionesEdicionCantidad(1) = "4" 'maxlength

    '    For i = offset To dt.Columns.Count - 1
    '        If contCol = propiedadesServicio Then
    '            contCol = 0
    '            Dim lstPalabras As String() = dt.Rows(1).Item(i).ToString().Split(" ")
    '            Ancho = 0
    '            For Each palabra As String In lstPalabras
    '                If Ancho < palabra.Length Then
    '                    Ancho = palabra.Length
    '                End If
    '            Next
    '            OpcionesEdicionCantidad(0) = Ancho.ToString() 'size
    '            Ancho *= 9
    '            If dt.Rows(2).Item(i).ToString() = "0" Then
    '                colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(i), dt.Rows(1).Item(i), False, True, Ancho, True, False, "integer", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
    '            Else
    '                colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(i), dt.Rows(1).Item(i), False, True, Ancho, True, False, "", JQGrid.FormatoEdicion.Check, OpcionesEdicionIlimitado))
    '            End If
    '        Else
    '            Ancho = dt.Rows(0).Item(i).Length * 8
    '            colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(i), dt.Rows(0).Item(i), True, True, Ancho, False, False, ""))
    '        End If
    '        contCol += 1
    '    Next
    'End Sub
End Class
