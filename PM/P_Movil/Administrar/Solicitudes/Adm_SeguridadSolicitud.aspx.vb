Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports Utilitario
Imports System.Web.Script.Services

Partial Class P_Movil_Administrar_Solicitudes_Adm_SeguridadSolicitud
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    'Imagen - Contenedor - 18-03-2014 / wapumayta
                    bpTecnico.RutaRaiz = "../../../"
                    bpGrupo.RutaRaiz = "../../../"
                    bpTipoSolicitud.RutaRaiz = "../../../"
                    bpTecnico.Contenedor = "dvContenedorControlBP"
                    bpGrupo.Contenedor = "dvContenedorControlBP"
                    bpTipoSolicitud.Contenedor = "dvContenedorControlBP"

                    'fin imagen contenedor

                    bpTecnico.NombreEntidad = "Usuario"
                    bpTecnico.vcTab = "SEG_Usuario"
                    bpTecnico.TipoOrigen = 0
                    bpTecnico.Condicion = "btEst = 1 And P_inCod in (Select F_inUsu From seg_perfilusuario Where F_inPer = 42)"
                    bpTecnico.FuncionPersonalizada = "fnMostrarDatos"
                    bpTecnico.TipoLinea = hdfCodLinTip_X_User.Value

                    bpGrupo.NombreEntidad = "Grupo"
                    bpGrupo.vcTab = "M_GRUP_ORIG"
                    bpGrupo.TipoOrigen = 0
                    bpGrupo.FuncionPersonalizada = "fnMostrarDatos"
                    bpGrupo.Condicion = "GROR_btEST = 1"
                    bpGrupo.TipoLinea = hdfCodLinTip_X_User.Value

                    bpTipoSolicitud.NombreEntidad = "Tipos de Solicitud"
                    bpTipoSolicitud.vcTab = "MOV_TipoSolicitud"
                    bpTipoSolicitud.TipoOrigen = 0
                    bpTipoSolicitud.FuncionPersonalizada = "fnMostrarDatos"
                    bpTipoSolicitud.Descripcion = "vcNomTipSol"
                    bpTipoSolicitud.Condicion = "biActivo = 1 And biEsSistema = 0"
                    bpTipoSolicitud.TipoLinea = hdfCodLinTip_X_User.Value

                    'bpTipoSolicitud.Codigo = "vcPrefijo"
                    'bpTipoSolicitud.Descripcion = "vcNomTipSol"
                    'bpNivel.CodigoValor = oOrganizacion(0).F_inNiv

                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

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
    Public Shared Function Listar(ByVal vcTipSel As String, ByVal vcTipSubSel As String, ByVal vcIdTipSel As String) As List(Of Object)

        Dim UsuarioTipoSolicitud As BL_MOV_TipoSolicitud_Usuario = Nothing
        Dim GrupoOrigen As BL_GEN_GrupoOrigen = Nothing
        Dim Usuario As BL_SEG_Usuario = Nothing
        Dim lstObj As New List(Of Object)

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            UsuarioTipoSolicitud = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            If vcIdTipSel <> "" Then
                Dim dsDetalle As DataSet = UsuarioTipoSolicitud.MostrarPorSeleccion(vcTipSel, vcTipSubSel, Convert.ToInt32("0" + vcIdTipSel))
                UsuarioTipoSolicitud.Dispose()

                Dim dtUsuGruTipSol As DataTable = dsDetalle.Tables(0)
                Dim dtTipoSolicitud As DataTable = dsDetalle.Tables(1)

                If vcTipSel = "Tecnico" Then
                    For i As Integer = 0 To dtTipoSolicitud.Rows.Count - 1
                        Dim dict As New Dictionary(Of String, Object)
                        dict.Add("IdTipSel", dtTipoSolicitud.Rows(i)("inCodTipSol").ToString())
                        dict.Add("vcNomTipSel", dtTipoSolicitud.Rows(i)("vcNomTipSol").ToString())
                        dict.Add("biLeer", "False")
                        dict.Add("biCrear", "False")
                        dict.Add("biEditar", "False")
                        dict.Add("biEliminar", "False")
                        dict.Add("vcDisabled", "")
                        dict.Add("biTecnicoResponsable", dtTipoSolicitud.Rows(i)("inTecnicoResponsable").ToString())

                        For j As Integer = 0 To dtUsuGruTipSol.Rows.Count - 1
                            If (dtTipoSolicitud.Rows(i)("inCodTipSol").ToString() = dtUsuGruTipSol.Rows(j)("F_inTipSol")) And vcIdTipSel <> "1" Then
                                dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString()
                                dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString()
                                dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString()
                                dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString()
                                dict.Item("vcDisabled") = ""
                            ElseIf vcIdTipSel = "1" Then
                                dict.Item("biLeer") = "True"
                                dict.Item("biCrear") = "True"
                                dict.Item("biEditar") = "True"
                                dict.Item("biEliminar") = "True"
                                dict.Item("vcDisabled") = "disabled='disabled'"
                            ElseIf vcIdTipSel <> "1" And (dtUsuGruTipSol.Rows(j)("F_inUsu").ToString() = dtTipoSolicitud.Rows(i)("inTecnicoResponsable").ToString()) Then
                                dict.Item("vcDisabled") = "disabled='disabled'"
                            End If

                        Next
                        lstObj.Add(dict)

                    Next

                ElseIf vcTipSel = "Grupo" Then
                    For i As Integer = 0 To dtTipoSolicitud.Rows.Count - 1
                        Dim dict As New Dictionary(Of String, Object)
                        dict.Add("IdTipSel", dtTipoSolicitud.Rows(i)("inCodTipSol").ToString())
                        dict.Add("vcNomTipSel", dtTipoSolicitud.Rows(i)("vcNomTipSol").ToString())
                        dict.Add("biLeer", "False")
                        dict.Add("biCrear", "False")
                        dict.Add("biEditar", "False")
                        dict.Add("biEliminar", "False")
                        dict.Add("vcDisabled", "")
                        dict.Add("vcLinea", dtTipoSolicitud.Rows(i)("vcTipoLinea").ToString()) 'Agregado Jcamacho 2015/09/09

                        For j As Integer = 0 To dtUsuGruTipSol.Rows.Count - 1
                            If (dtTipoSolicitud.Rows(i)("inCodTipSol").ToString() = dtUsuGruTipSol.Rows(j)("F_inTipSol")) Then
                                dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString()
                                dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString()
                                dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString()
                                dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString()
                            End If
                        Next
                        lstObj.Add(dict)

                    Next

                ElseIf vcTipSel = "TipoSolicitud" Then

                    If vcTipSubSel = "Tecnico" Then
                        Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim dtUsuario As DataTable = Usuario.ListarPorPerfil(42).Tables(0)
                        Usuario.Dispose()
                        For i As Integer = 0 To dtUsuario.Rows.Count - 1
                            Dim dict As New Dictionary(Of String, Object)
                            dict.Add("IdTipSel", dtUsuario.Rows(i)("P_inCod").ToString())
                            dict.Add("vcNomTipSel", dtUsuario.Rows(i)("vcNom").ToString())
                            dict.Add("biLeer", "False")
                            dict.Add("biCrear", "False")
                            dict.Add("biEditar", "False")
                            dict.Add("biEliminar", "False")
                            dict.Add("vcDisabled", "")
                            dict.Add("biTecnicoResponsable", dtTipoSolicitud.Rows(i)("inTecnicoResponsable").ToString())

                            For j As Integer = 0 To dtUsuGruTipSol.Rows.Count - 1
                                If (dtUsuario.Rows(i)("P_inCod").ToString() = dtUsuGruTipSol.Rows(j)("F_inUsu")) And dtUsuario.Rows(i)("P_inCod").ToString() <> "1" Then
                                    dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString()
                                    dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString()
                                    dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString()
                                    dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString()

                                    If (dtUsuario.Rows(i)("P_inCod").ToString() = dtUsuGruTipSol.Rows(j)("inTecnicoResponsable").ToString()) Then
                                        dict.Item("vcDisabled") = "disabled='disabled'"
                                    End If

                                ElseIf dtUsuario.Rows(i)("P_inCod").ToString() = "1" Then
                                    dict.Item("biLeer") = "True"
                                    dict.Item("biCrear") = "True"
                                    dict.Item("biEditar") = "True"
                                    dict.Item("biEliminar") = "True"
                                    dict.Item("vcDisabled") = "disabled='disabled'"
                                End If
                            Next

                            lstObj.Add(dict)
                        Next
                    ElseIf vcTipSubSel = "Grupo" Then
                        GrupoOrigen = New BL_GEN_GrupoOrigen(oUsuario.IdCliente)
                        Dim dtGrupoOrigen As DataTable = GrupoOrigen.ListarPorNombre("", Convert.ToInt32(vcIdTipSel)).Tables(0)
                        GrupoOrigen.Dispose()
                        For i As Integer = 0 To dtGrupoOrigen.Rows.Count - 1
                            Dim dict As New Dictionary(Of String, Object)
                            dict.Add("IdTipSel", dtGrupoOrigen.Rows(i)("GROR_P_inCODGRUORI").ToString())
                            dict.Add("vcNomTipSel", dtGrupoOrigen.Rows(i)("GROR_vcNOMGRU").ToString() & " (" & dtGrupoOrigen.Rows(i)("vcTipoLinea").ToString() & ")")
                            dict.Add("biLeer", "False")
                            dict.Add("biCrear", "False")
                            dict.Add("biEditar", "False")
                            dict.Add("biEliminar", "False")
                            dict.Add("vcDisabled", "")
                            dict.Add("vcLinea", dtGrupoOrigen.Rows(i)("vcTipoLinea").ToString()) 'Agregado Jcamacho 2015/09/09

                            For j As Integer = 0 To dtUsuGruTipSol.Rows.Count - 1
                                If (dtGrupoOrigen.Rows(i)("GROR_P_inCODGRUORI").ToString() = dtUsuGruTipSol.Rows(j)("F_inGruOri")) Then
                                    dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString()
                                    dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString()
                                    dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString()
                                    dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString()
                                End If
                            Next

                            lstObj.Add(dict)
                        Next

                    End If
                End If

            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(UsuarioTipoSolicitud) Then UsuarioTipoSolicitud.Dispose()
            If Not IsNothing(GrupoOrigen) Then GrupoOrigen.Dispose()
            If Not IsNothing(Usuario) Then Usuario.Dispose()
        End Try

        Return lstObj
    End Function

    <WebMethod()>
    Public Shared Function Grabar(ByVal vcTipSel As String, ByVal vcIdBusqueda As String, ByVal vcTipSubSel As String, ByVal XMLUsuGruTipSol As String, ByVal XMLAreaTecnico As String) As String
        Dim UsuarioTipoSolicitud As BL_MOV_TipoSolicitud_Usuario = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'Dim Usuario As BL_SEG_Usuario = new BL_SEG_Usuario(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            UsuarioTipoSolicitud = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            UsuarioTipoSolicitud.Grabar(vcTipSel, Convert.ToInt32(vcIdBusqueda), vcTipSubSel, XMLUsuGruTipSol, XMLAreaTecnico)
            UsuarioTipoSolicitud.Dispose()

            'HttpContext.Current.Session("Usuario") = Usuario.Autentifica(oUsuario, "")
            UtilitarioWeb.TipoSolicitud.ActualizarUsuario()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(UsuarioTipoSolicitud) Then UsuarioTipoSolicitud.Dispose()
        End Try

        Return "1"
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

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ListarAreas(ByVal vcIdUsuario As String) As List(Of Object)
        Dim UsuarioTipoSolicitud As BL_MOV_TipoSolicitud_Usuario = Nothing
        Dim lstObj As New List(Of Object)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            UsuarioTipoSolicitud = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            If vcIdUsuario <> "" Then
                Dim dsDetalle As DataSet = UsuarioTipoSolicitud.MostrarAreaPorSeleccion("Tecnico", "Tecnico", Val("0" + vcIdUsuario))
                UsuarioTipoSolicitud.Dispose()

                Dim dtUsuGruTipSol As DataTable = dsDetalle.Tables(0)
                Dim dtTipoSolicitud As DataTable = dsDetalle.Tables(0)

                For i As Integer = 0 To dtTipoSolicitud.Rows.Count - 1
                    Dim dict As New Dictionary(Of String, Object)
                    dict.Add("inCodint", dtTipoSolicitud.Rows(i)("F_inCodInt").ToString())
                    dict.Add("vcCodint", dtTipoSolicitud.Rows(i)("ORGA_CodInt2").ToString())
                    dict.Add("vcCodorg", dtTipoSolicitud.Rows(i)("ORGA_vcCODORG").ToString())
                    dict.Add("vcNomorg", dtTipoSolicitud.Rows(i)("ORGA_vcNOMORG").ToString())
                    dict.Add("btQuitar", "True")

                    lstObj.Add(dict)

                Next

            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(UsuarioTipoSolicitud) Then UsuarioTipoSolicitud.Dispose()
        End Try

        Return lstObj
    End Function

End Class
