Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports Microsoft.VisualBasic
Imports System
Imports System.Web.UI
Imports DevExpress.Web
Imports System.Globalization
Imports System.Web.Services

Public Class Mnt_List_Empleadoo
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Grupo As BL_GEN_GrupoOrigen = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim CentCost As BL_GEN_CentroCosto = Nothing
        Dim Orga As BL_GEN_Organizacion = Nothing
        Dim Sucu As BL_GEN_Sucursal = Nothing
        Dim Modelo As BL_MOV_ModeloDispositivo = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Grupo = New BL_GEN_GrupoOrigen(oUsuario.IdCliente)
            CentCost = New BL_GEN_CentroCosto(oUsuario.IdCliente)
            Orga = New BL_GEN_Organizacion(oUsuario.IdCliente)
            Sucu = New BL_GEN_Sucursal(oUsuario.IdCliente)
            Modelo = New BL_MOV_ModeloDispositivo(oUsuario.IdCliente)
            LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    'UtilitarioWeb.Dataddl(ddlGrupoEmpleado, Grupo.ListarGrupo(-1, "<Todos>"), "vcNom", "P_inCod")
                    ''UtilitarioWeb.Dataddl(ddlOrganizacion, Organizacion.ListarOrganizacion(-1, "<Todos>"), "vcNomOrg", "vcCodInt")
                    UtilitarioWeb.Dataddl(ddlCentroCosto, CentCost.ListarCentroCosto(-1, "<Todos>"), "vcNomCenCos", "P_vcCodCenCos")
                    UtilitarioWeb.Dataddl(ddlSucursal, Sucu.ListarSucursal(-1, "<Todos>"), "vcNom", "P_vcCod")
                    UtilitarioWeb.Dataddl(ddlModelo, Modelo.Listar(-1, "<Todos>"), "vcNom", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlTipoLinea, LineaTipo.ListarLineatipo(-1, "<Todos>"), "vcDescripcion", "P_inCod")


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
            If Grupo IsNot Nothing Then Grupo.Dispose()
            If CentCost IsNot Nothing Then Grupo.Dispose()
            If Sucu IsNot Nothing Then Grupo.Dispose()
            If Orga IsNot Nothing Then Grupo.Dispose()
            If Modelo IsNot Nothing Then Modelo.Dispose()
        End Try
    End Sub
    <WebMethod()>
    Public Shared Function ObtenerGrupoEmpleadoTipo(ByVal idLineatipo As String) As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)
            If IsNumeric(idLineatipo) Then
                Dim dt As DataTable = LineaTipo.ListarGrupoEmpleado_LineaTipo(idLineatipo)
                If dt.Rows.Count > 0 Then
                    For x As Integer = 0 To dt.Rows.Count - 1
                        listaValores.Add(dt.Rows(x)("GROR_vcNOMGRU").ToString())
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
    Public Shared Function ObtenerListaGrupoEmpleado() As List(Of String)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim GrupoEmp As BL_GEN_GrupoOrigen = Nothing
        Dim listaValores As New List(Of String)
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            GrupoEmp = New BL_GEN_GrupoOrigen(oUsuario.IdCliente)

            Dim dt As DataTable = GrupoEmp.ListarGrupoEmpleados()
            If dt.Rows.Count > 0 Then
                For x As Integer = 0 To dt.Rows.Count - 1
                    listaValores.Add(dt.Rows(x)("GROR_vcNOMGRU").ToString())
                Next
            End If

            Return listaValores

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If GrupoEmp IsNot Nothing Then GrupoEmp.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerCantidadRegistros(DatosMostrar As String) As String
        Dim Respuesta As String = "0"
        Dim Empleado As BL_GEN_Empleado = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim listaDatos As List(Of String) = DatosMostrar.Split("*").ToList()

            If DatosMostrar.IndexOf("*") >= 0 Then
                listaDatos = DatosMostrar.Split("*").ToList()
            End If
            For index = 1 To listaDatos.Count
                If listaDatos(index - 1) = "" Then
                    listaDatos(index - 1) = "-1"
                End If
            Next
            Dim p_inCentCost As String = listaDatos(0)
            Dim p_CodInt As String = listaDatos(1)
            Dim p_inSucu As String = listaDatos(2)
            Dim p_mod As String = listaDatos(3)
            Dim p_inLineatipo As String = listaDatos(4)
            Dim p_GrupoEmpleado As String = listaDatos(5)
            Empleado = New BL_GEN_Empleado(oUsuario.IdCliente)
            Dim dt As DataTable = Empleado.ListarEmpleadosConFiltros(p_inCentCost, p_CodInt, p_inSucu, p_mod, p_inLineatipo, p_GrupoEmpleado, p_inLineatipo)
            If dt IsNot Nothing Then
                Respuesta = dt.Rows.Count.ToString()
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Empleado IsNot Nothing Then Empleado.Dispose()
        End Try
        Return Respuesta
    End Function

End Class