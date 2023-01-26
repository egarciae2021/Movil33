Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports Microsoft.VisualBasic
Imports System
Imports System.Web.UI
Imports DevExpress.Web
Imports System.Globalization
Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.General.BE

Public Class Mnt_List_Lineas_Meses
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing

        Dim Plan As BL_MOV_Plan = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Dim Descripcion As BL_MOV_Caracteristica = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing


        Dim Estado As BL_MOV_Estado = Nothing

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plan = New BL_MOV_Plan(oUsuario.IdCliente)
            Descripcion = New BL_MOV_Caracteristica(oUsuario.IdCliente)
            Linea = New BL_MOV_Linea(oUsuario.IdCliente)
            LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            Estado = New BL_MOV_Estado(oUsuario.IdCliente)


            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)

            Else
                If Not IsPostBack Then
                    ttginfoHistorico.Mensaje = "Se mostrarán las características de selección adicionales que tenga la línea."


                    ''UtilitarioWeb.Dataddl(ddlEmpleado, Emppleado.ListaEmpleados(-1, "<Todos>"), "vcNom", "P_vcCod")

                    'UtilitarioWeb.Dataddl(ddlPlan, Plan.Listar(-1, "<Todos>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlComboDescripcion, Descripcion.ListaDescripcionCombo(-1, "<Todos>"), "vcCam", "inCod")

                    ''UtilitarioWeb.Dataddl(ddlTipoLinea, LineaTipo.ListarLineatipo(-1, "<Todos>"), "vcDescripcion", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlTipoLinea, Estado.ListarPorModulo(1, 0, -1, "<Todos>"), "vcNom", "P_inCod")

                    If ddlComboDescripcion.Items.Count < 3 Then
                        ddlComboDescripcion.Enabled = False
                    Else
                        ddlComboDescripcion.Enabled = True
                    End If

                    If ddlComboDinamico.Items.Count < 1 Then
                        ddlComboDinamico.Enabled = False
                    Else
                        ddlComboDinamico.Enabled = True
                    End If


                    'If ddlTipoLinea.Items.Count < 3 Then
                    '    ddlTipoLinea.Enabled = False
                    'Else
                    '    ddlTipoLinea.Enabled = True
                    'End If

                    'If ddlPlan.Items.Count < 1 Then
                    '    ddlPlan.Enabled = False
                    'Else
                    '    ddlPlan.Enabled = True
                    'End If

                    'OBTENEMOS EL TIPO DE LINEA QUE EL USUARIO TIENE ACCESO---------------------------------------------------------------------------------------------------------------------------------
                    Dim vcPerfiles As String = String.Empty
                    For p As Integer = 0 To oUsuario.Perfiles.Count - 1
                        If (vcPerfiles = "") Then
                            If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
                                vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                            End If
                        Else
                            If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                            ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                                vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                            End If
                        End If
                    Next
                    '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
                        'ddlTipoLinea.SelectedValue = 0
                        hdfOpcionPrincipal.Value = 0
                    ElseIf vcPerfiles <> "" Then
                        'ddlTipoLinea.SelectedValue = vcPerfiles
                        hdfOpcionPrincipal.Value = vcPerfiles
                        ddlTipoLinea.SelectedValue = vcPerfiles
                    End If


                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plan IsNot Nothing Then Plan.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
            If Descripcion IsNot Nothing Then Descripcion.Dispose()
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
            If Estado IsNot Nothing Then Estado.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ObtenerValoresDinamicos(ByVal IdCampo As String) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Caracteristica As BL_MOV_Caracteristica = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Caracteristica = New BL_MOV_Caracteristica(oUsuario.IdCliente)
            If IsNumeric(IdCampo) Then
                Dim dtDatos As DataTable = Caracteristica.ListaComboDinamico(IdCampo)
                If dtDatos.Rows.Count > 0 Then
                    Dim mValores() As String = dtDatos.Rows(0)("vcLon").ToString().Split(",")
                    For x As Integer = 0 To mValores.Length - 1
                        listaValores.Add(mValores(x))
                    Next
                End If
            End If

            Return listaValores

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Caracteristica IsNot Nothing Then Caracteristica.Dispose()
        End Try
    End Function
    <WebMethod()>
    Public Shared Function ObtenerPlanesTipo(ByVal idLineatipo As String) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
            If IsNumeric(idLineatipo) Then
                Dim dt As DataTable = LineaTipo.Listar_Plan_LineaTipo(idLineatipo)
                If dt.Rows.Count > 0 Then
                    For x As Integer = 0 To dt.Rows.Count - 1
                        listaValores.Add(dt.Rows(x)("vcNom").ToString())
                    Next
                End If
            End If

            Return listaValores

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
        End Try
    End Function
    <WebMethod()>
    Public Shared Function ObtenerListaPlanes() As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Planes As BL_MOV_Plan = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Planes = New BL_MOV_Plan(oUsuario.IdCliente)

            Dim dt As DataTable = Planes.ListarPlanes()
            If dt.Rows.Count > 0 Then
                For x As Integer = 0 To dt.Rows.Count - 1
                    listaValores.Add(dt.Rows(x)("vcNom").ToString())
                Next
            End If

            Return listaValores

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Planes IsNot Nothing Then Planes.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerEmpleados(ByVal Filtro As String) As ModelSelect2

        Dim oModelSelect2 As New ModelSelect2
        If "" & Filtro = "undefined" Then
            Return oModelSelect2
        End If

        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Planes As BL_MOV_Plan = Nothing

        Dim Empleado As BL_GEN_Empleado = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Planes = New BL_MOV_Plan(oUsuario.IdCliente)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)

            Dim ListaEmpleado As List(Of ENT_GEN_Empleado) = Empleado.ListaEmpleadosFiltro(-1, "<Todos>", Filtro)
            oModelSelect2.results = New List(Of ModelSelect2Item)
            oModelSelect2.pagination = New ModelSelect2Pagination
            oModelSelect2.pagination.more = "true"

            Dim oModelSelect2Item As ModelSelect2Item
            For Each oEmpleado As ENT_GEN_Empleado In ListaEmpleado
                oModelSelect2Item = New ModelSelect2Item
                oModelSelect2Item.id = oEmpleado.P_vcCod
                oModelSelect2Item.text = oEmpleado.vcNom
                oModelSelect2.results.Add(oModelSelect2Item)
            Next

            Return oModelSelect2

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
            If Planes IsNot Nothing Then Planes.Dispose()
        End Try
    End Function

End Class