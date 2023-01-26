Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports UtilitarioWeb
Imports System.Data
Imports VisualSoft.Comun.LibreriaJQ
Imports System.Net.Mail
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Configurar_Conf_PoliticaSolicitud
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcTab As String = Request.QueryString("vcTab")
                    'Dim idCodPolSol As Integer
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim ItemSeguridad As BL_PRO_Item = New BL_PRO_Item(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oItemSeguridad As New ENT_PRO_Item
                    Dim inCod As Integer

                    If Integer.Parse(Request.QueryString("inCod")) = 177 Then
                        inCod = 1
                    ElseIf Integer.Parse(Request.QueryString("inCod")) = 178 Then
                        inCod = 2
                    Else
                        inCod = Integer.Parse(Request.QueryString("inCod"))
                    End If


                    'idCodPolSol = Convert.ToInt32(ConfigurationManager.AppSettings(vcTab))
                    hdfPolitica.Value = inCod.ToString
                    hdfTamPag.Value = "10"
                    hdfPagLis.Value = "[10,20,30]"
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)

                    If inCod = 1 Then
                        hdfUnidad.Value = "Unidades"
                    ElseIf inCod = 2 Then
                        hdfUnidad.Value = "Meses"
                    End If

                    UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                    oItemSeguridad = ItemSeguridad.Mostrar(oUsuario, inCod)
                    ItemSeguridad.Dispose()

                    UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oItemSeguridad.Perfiles)

                    btnAgregarGrupo.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar
                    btnCambiarValGrup.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar
                    btnQuitarGrupo.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoEliminar
                    btnAgregarExcepcion.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar
                    btnCambiarValEmpl.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar
                    btnQuitarExcepcion.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoEliminar
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function GuardarValorGrupo(ByVal inCodPol As String, ByVal CodEnt As String, ByVal vcVal As String) As String
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oGrupo As New ENT_GEN_Grupo

            oGrupo.P_inCod = Integer.Parse(CodEnt)
            oGrupo.PoliticaSolicitud.P_inCod = Integer.Parse(inCodPol)
            oGrupo.PoliticaSolicitud.vcVal = vcVal

            Politica.GuardarValorGrupo(oGrupo)
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GuardarValorEmpleado(ByVal inCodPol As String, ByVal CodEnt As String, ByVal vcVal As String) As String
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oEmpleado As New ENT_GEN_Empleado

            oEmpleado.P_vcCod = CodEnt
            oEmpleado.PoliticaSolicitud.P_inCod = Integer.Parse(inCodPol)
            oEmpleado.PoliticaSolicitud.vcVal = vcVal

            Politica.GuardarValorEmpleado(oEmpleado)
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function QuitarGrupo(ByVal inCodGru As String, ByVal inCodPol As String) As String
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oGrupo As New ENT_GEN_Grupo

            oGrupo.P_inCod = inCodGru
            oGrupo.PoliticaSolicitud.P_inCod = Integer.Parse(inCodPol)

            Politica.QuitarGrupo(oGrupo)
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function QuitarEmpleado(ByVal vcCodEmp As String, ByVal inCodPol As String) As String
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim Array_vcCodEmp As List(Of String) = vcCodEmp.Split(",").ToList() 'modificado para eliminar lista 26-08-2013
            For Each Cod As String In Array_vcCodEmp
                Dim oEmpleado As New ENT_GEN_Empleado
                oEmpleado.P_vcCod = Cod
                oEmpleado.PoliticaSolicitud.P_inCod = Integer.Parse(inCodPol)
                Politica.QuitarEmpleado(oEmpleado)
            Next
            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarPoliticaSolicitudPorGrupo(ByVal inPagTam As String, ByVal inPagAct As String, ByVal inCodPol As String, ByVal vcCam As String,
                                                           ByVal vcValBus As String, ByVal vcTipLin As String) As JQGridJsonResponse
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = Politica.Listar_PoliticaGrupo_xPolitica(Integer.Parse(inPagTam), Integer.Parse(inPagAct), inCodPol, vcCam, vcValBus, Integer.Parse(vcTipLin))

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarPoliticaSolicitudPorEmpleado(ByVal inPagTam As String, ByVal inPagAct As String, ByVal inCodPol As String, ByVal vcCam As String,
                                                              ByVal vcValBus As String, ByVal vcTipLin As String) As JQGridJsonResponse
        Dim Politica As BL_MOV_Politica = Nothing
        Try
            Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dsDetalle As DataSet = Politica.Listar_PoliticaEmpleado_TodosxPolitica(Integer.Parse(inPagTam), Integer.Parse(inPagAct), inCodPol, vcCam, vcValBus, Integer.Parse(vcTipLin))

            Return New JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")),
                              Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Politica) Then Politica.Dispose()
        End Try
    End Function

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = ""
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
            vcPerfil = "0"
        ElseIf vcPerfiles <> "" Then
            vcPerfil = vcPerfiles.ToString()
        End If

        Return vcPerfil

    End Function


    '<WebMethod()>
    'Public Shared Function ListarPoliticaSolicitudPorEmpleado(ByVal inCodGru As String, ByVal inCodPol As String) As List(Of ENT_GEN_Empleado)
    '    Try
    '        Dim Politica As BL_MOV_Politica = BL_MOV_Politica.Instance(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

    '        Return Politica.Listar_PoliticaEmpleado_xPoliticaPorGrupo(inCodGru, inCodPol)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil,HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    End Try
    'End Function
End Class