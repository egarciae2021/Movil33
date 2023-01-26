Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Campana.BE

Partial Class P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaCredito
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Campana = New BL_MOV_CAM_Campana(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'cargar camapañas
                    UtilitarioWeb.Dataddl(ddlCampanaActiva, Campana.Listar(-1, "--Seleccione--"), "Descripcion", "IdCampana")

                    Dim IdCampana As Integer
                    Integer.TryParse(Request.QueryString("IdCampana"), IdCampana)

                    If IdCampana = 0 Then IdCampana = -1

                    hdfIdCampana.Value = IdCampana.ToString()
                    ddlCampanaActiva.SelectedValue = IdCampana.ToString()

                    'CULTURA
                    Dim GEN_Cultura As BL_GEN_Cultura = New BL_GEN_Cultura(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim GEN_Region As BL_GEN_Regi = New BL_GEN_Regi(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oCultura As ENT_GEN_Cultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
                    GEN_Cultura.Dispose()
                    GEN_Region.Dispose()

                    hdfNumDecimales.Value = oCultura.dcNumDec
                    hdfSepDecimal.Value = oCultura.vcSimDec
                    hdfSepMiles.Value = oCultura.vcSimSepMil
                    'FIN CULTURA

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCreditoGrupo(ByVal IdCampana As String, ByVal vcCampoFiltro As String, ByVal vcValorFiltro As String, _
                                              ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Dim vIdCampana As Integer = -1
        If IdCampana = "" Then
            vIdCampana = -1
        Else
            vIdCampana = Convert.ToInt32(IdCampana)
        End If

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtCredGru As DataTable = Campana.ListarCreditoGrupo_x_Campana(vIdCampana, vcCampoFiltro, vcValorFiltro)
            Return JQGrid.DatosJSON(dtCredGru, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarCreditoEmpleado(ByVal IdCampana As Integer, ByVal vcCampoFiltro As String, ByVal vcValorFiltro As String, _
                                                 ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal inGrupo As String) As Object
        Dim Campana As BL_MOV_CAM_Campana = Nothing
        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtCredEmp As DataTable = Campana.ListarCreditoEmpleado_x_Campana(IdCampana, vcCampoFiltro, vcValorFiltro, Convert.ToInt32("0" + inGrupo))
            Return JQGrid.DatosJSON(dtCredEmp, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarGrupoOrigen(ByVal inPagTam As Integer, ByVal inPagAct As Integer) As Object
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dtGrupOrig As DataTable = Campana.ListarGrupoOrigen()
            Return JQGrid.DatosJSON(dtGrupOrig, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarCreditoTipo(ByVal IdCampana As Integer) As List(Of MOV_CAM_CreditoTipo)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstCreditoTipo As List(Of MOV_CAM_CreditoTipo) = Campana.ListarCreditoTipo_x_Campana(IdCampana)
            Return lstCreditoTipo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function InsertarCreditoGrupo(ByVal IdGrup As String, ByVal IdTipCre As Integer, ByVal IdCamp As Integer, ByVal Aprob As Decimal) As List(Of String)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim listaIdGrup As List(Of String) = Split(IdGrup, ",").ToList
            Dim IdErrors As New List(Of String)
            For Each id As String In listaIdGrup
                Dim resultado As Integer
                Dim oCCreditoGrupo As New MOV_CAM_CampanaCreditoGrupo()
                oCCreditoGrupo.IdCampana = IdCamp
                oCCreditoGrupo.IdGrupo = id
                oCCreditoGrupo.IdTipoCredito = IdTipCre
                oCCreditoGrupo.Aprobado = Aprob
                resultado = Campana.InsertarCreditoCampanaGrupo(oCCreditoGrupo)
                If resultado = 0 Then
                    IdErrors.Add(id)
                End If
            Next
            Return IdErrors
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EliminarCreditoGrupo(ByVal IdGrup As String, ByVal IdTipCre As String, ByVal IdCamp As Integer) As List(Of String)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim listaresult As New List(Of String)
            Dim lstIdGrup As List(Of String) = Split(IdGrup, ",").ToList
            Dim lstIdTipCre As List(Of String) = Split(IdTipCre, ",").ToList
            For i = 0 To lstIdGrup.Count - 1
                Dim resultado As Integer
                Dim oCCreditoGrupo As New MOV_CAM_CampanaCreditoGrupo()
                oCCreditoGrupo.IdCampana = IdCamp
                oCCreditoGrupo.IdGrupo = Convert.ToInt32(lstIdGrup(i))
                oCCreditoGrupo.IdTipoCredito = Convert.ToInt32(lstIdTipCre(i))
                resultado = Campana.EliminarCredtioCamapanaGrupo(oCCreditoGrupo)
                If resultado = 0 Then
                    listaresult.Add(resultado)
                End If
            Next
            Return listaresult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarCreditoGrupo(ByVal IdGrup As String, ByVal IdTipCre As Integer, ByVal IdCamp As Integer, ByVal Aprob As Decimal) As List(Of String)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstIdGrup As List(Of String) = Split(IdGrup, ",").ToList
            Dim lstResultados As New List(Of String)
            For i = 0 To lstIdGrup.Count - 1
                Dim resultado As Integer
                Dim oCCreditoGrupo As New MOV_CAM_CampanaCreditoGrupo()
                oCCreditoGrupo.IdCampana = IdCamp
                oCCreditoGrupo.IdGrupo = lstIdGrup(i)
                oCCreditoGrupo.IdTipoCredito = IdTipCre
                oCCreditoGrupo.Aprobado = Aprob
                resultado = Campana.ActulizarCreditoCampanaGrupo(oCCreditoGrupo)
                If resultado = 0 Then
                    lstResultados.Add(lstIdGrup(i))
                End If
            Next
            Return lstResultados
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function InsertarCreditoEmpleado(ByVal IdEmp As String, ByVal IdTipCre As Integer, ByVal IdCamp As Integer, ByVal Aprob As Decimal) As List(Of String)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim listaIdEmp As List(Of String) = Split(IdEmp, ",").ToList
            Dim IdErrors As New List(Of String)
            For Each id As String In listaIdEmp
                Dim resultado As Integer
                Dim oCCreditoEmpleado As New MOV_CAM_CampanaCreditoEmpleado()
                oCCreditoEmpleado.IdCampana = IdCamp
                oCCreditoEmpleado.IdEmpleado = id
                oCCreditoEmpleado.IdTipoCredito = IdTipCre
                oCCreditoEmpleado.Aprobado = Aprob
                resultado = Campana.InsertarCreditoCampanaEmpleado(oCCreditoEmpleado)
                If resultado = 0 Then
                    IdErrors.Add(id)
                End If
            Next
            Return IdErrors
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function EliminarCreditoEmpleado(ByVal IdEmp As String, ByVal IdTipCre As String, ByVal IdCamp As Integer) As List(Of String)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim listaresult As New List(Of String)
            Dim lstIdEmp As List(Of String) = Split(IdEmp, ",").ToList
            Dim lstIdTipCre As List(Of String) = Split(IdTipCre, ",").ToList
            For i = 0 To lstIdEmp.Count - 1
                Dim resultado As Integer
                Dim oCCreditoEmpleado As New MOV_CAM_CampanaCreditoEmpleado()
                oCCreditoEmpleado.IdCampana = IdCamp
                oCCreditoEmpleado.IdEmpleado = lstIdEmp(i).ToString
                oCCreditoEmpleado.IdTipoCredito = Convert.ToInt32(lstIdTipCre(i))
                resultado = Campana.EliminarCredtioCampanaEmpleado(oCCreditoEmpleado)
                If resultado = 0 Then
                    listaresult.Add(lstIdEmp(i).ToString)
                End If
            Next
            Return listaresult
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarCreditoEmpleado(ByVal IdEmp As String, ByVal IdTipCre As Integer, ByVal IdCamp As Integer, ByVal Aprob As Decimal) As List(Of String)
        Dim Campana As BL_MOV_CAM_Campana = Nothing

        Try
            Campana = New BL_MOV_CAM_Campana(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstIdEmp As List(Of String) = Split(IdEmp, ",").ToList
            Dim lstresultados As New List(Of String)
            For i = 0 To lstIdEmp.Count - 1
                Dim resultado As Integer
                Dim oCCreditoEmpleado As New MOV_CAM_CampanaCreditoEmpleado()
                oCCreditoEmpleado.IdCampana = IdCamp
                oCCreditoEmpleado.IdEmpleado = lstIdEmp(i)
                oCCreditoEmpleado.IdTipoCredito = IdTipCre
                oCCreditoEmpleado.Aprobado = Aprob
                resultado = Campana.ActulizarCreditoCampanaEmpleado(oCCreditoEmpleado)
                If resultado = 0 Then
                    lstresultados.Add(lstIdEmp(i))
                End If
            Next
            Return lstresultados
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campana IsNot Nothing Then
                Campana.Dispose()
            End If
        End Try
    End Function
End Class
