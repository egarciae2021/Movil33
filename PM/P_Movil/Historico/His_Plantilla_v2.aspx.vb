Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Consulta.BE
Imports UtilitarioWeb

Partial Class P_Movil_Historico_His_Plantilla_v2
    Inherits System.Web.UI.Page

    Protected Sub P_Movil_Historico_His_Plantilla_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim blTipoServicio As BL_GEN_TipoServicio = Nothing
        Dim servicio As BL_HIS_Generico = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    hdf_Tabla.Value = Request.QueryString("tabla")
                    hdf_P_Codigo.Value = Request.QueryString("p_codigo")
                    hdf_F_Codigo.Value = Request.QueryString("f_codigo")
                    hdf_Desc.Value = Request.QueryString("desc")
                    hdf_F_Desc.Value = Request.QueryString("f_desc")
                    hdf_conFiltro.Value = Request.QueryString("conFiltro")
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    hdf_Sucursal.Value = oUsuario.F_vcCodSuc
                    hdfEmpleado.Value = oUsuario.Empleado.P_vcCod
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

                    Dim Nivel As BL_GEN_Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
                    Dim oNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()

                    servicio = New BL_HIS_Generico(oUsuario.IdCliente)
                    Dim ListaServicioDatos As List(Of ENT_ServicioHis) = servicio.obtenerServiciosPorTipoServicio(17)
                    Dim ListaServicioMensajes As List(Of ENT_ServicioHis) = servicio.obtenerServiciosPorTipoServicio(18)
                    Nivel.Dispose()

                    Dim vcCodInt As String = "" & CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
                    If vcCodInt.Length > 3 Then oNivel.Remove(oNivel.Item(0))
                    'Código que controla los acceso del usuario por Organizacion...

                    Dim inNivel As Integer = vcCodInt.Length / 3
                    For x As Byte = 2 To inNivel
                        oNivel.Remove(oNivel.Item(0))
                    Next

                    ddlNivel.DataTextField = "vcNomNiv"
                    ddlNivel.DataValueField = "P_inCodNiv"
                    ddlNivel.DataSource = oNivel
                    ddlNivel.DataBind()

                    'cargar datos de configuracion
                    Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)
                    hdfNumDec.Value = oCultura.dcNumDec
                    hdfSimDec.Value = oCultura.vcSimDec
                    hdfSimMil.Value = oCultura.vcSimSepMil
                    hdfSimMon.Value = oCultura.Moneda.vcSimMon
                    hdfNomMon.Value = oCultura.Moneda.vcNomCor

                    blTipoServicio = New BL_GEN_TipoServicio(oUsuario.IdCliente)

                    Dim js As New JavaScriptSerializer()
                    Dim script As String = "var MisServiciosDatos = " + js.Serialize(ListaServicioDatos) + ";"
                    script = script + " var MisServiciosMensajes = " + js.Serialize(ListaServicioMensajes) + ";"
                    script = script + " var misTiposServicios = " + js.Serialize(blTipoServicio.ListarParaDash()) + ";"

                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    'Else
                    '    blTipoServicio = New BL_GEN_TipoServicio(oUsuario.IdCliente)
                    '    Dim js As New JavaScriptSerializer()
                    '    Dim script As String
                    '    script = " var misTiposServicios = " + js.Serialize(blTipoServicio.ListarParaDash()) + ";"
                    '    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If blTipoServicio IsNot Nothing Then blTipoServicio.Dispose()
            If servicio IsNot Nothing Then servicio.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function listar(ByVal prCantidad As Integer, ByVal prDato As String, ByVal prGranularidad As String, ByVal prTipo As String _
                                  , ByVal prTelefonia As String, ByVal prServicio As String, ByVal prNivel As Integer) As List(Of String)

        Dim historico As BL_HIS_Generico = Nothing
        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            historico = New BL_HIS_Generico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return historico.obtenerEstadisticas(prCantidad, prDato, prGranularidad, prTipo, prTelefonia, prServicio, prNivel, vcCodInt)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If historico IsNot Nothing Then historico.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function listarGenerico(ByVal prCantidad As Integer, ByVal prTabla As String, ByVal prP_Codigo As String, ByVal prF_Codigo As String _
                                          , ByVal prDesc As String, ByVal prF_Desc As String, ByVal prGranularidad As String, ByVal prTipo As String _
                                            , ByVal prTelefonia As String, ByVal prServicio As String, ByVal prNivel As Integer,
                                            ByVal esConMaestro As Boolean, ByVal vcFiltro As String, ByVal prTipoServicio As Integer,
                                            ByVal prFormatoDuracion As Integer, ByVal inTipLin As String) As List(Of String)
        Dim historico As BL_HIS_Generico = Nothing
        Try
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim vcCodInt As String = oUsuario.F_vcCodInt
            historico = New BL_HIS_Generico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return historico.obtenerEstadisticasGenerico(prCantidad, prTabla, prP_Codigo, prF_Codigo, prDesc, prF_Desc, prGranularidad, prTipo,
                                                         prTelefonia, prServicio, prNivel, esConMaestro, vcCodInt, vcFiltro, oUsuario.F_vcCodSuc, oUsuario.Empleado.P_vcCod, prTipoServicio, oCultura, prFormatoDuracion, Integer.Parse(inTipLin))

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If historico IsNot Nothing Then historico.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function listarGenericoFiltro(ByVal prCodigo As String, ByVal prDescripcion As String, ByVal prTelefonia As String, ByVal prTipo As String _
                                          , ByVal prGlobal As String, ByVal prFiltro As String, ByVal prGranulidad As String, ByVal prFiltroPer As String) As List(Of String)

        Dim historico As BL_HIS_Generico = Nothing
        Try
            Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            historico = New BL_HIS_Generico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return historico.obtenerEstadisticasFiltro(prCodigo, prDescripcion, prTelefonia, prTipo, prGlobal, prFiltro,
                                                       IIf(prFiltro.Split(" ").Length = 2, "MONTH", "YEAR"), prFiltroPer.Replace("|", "'"), vcCodInt,
                                                       CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodSuc,
                                                       CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Empleado.P_vcCod)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If historico IsNot Nothing Then historico.Dispose()
        End Try
    End Function

    Private Function configurarColumnas(ByVal tabla As DataTable) As String
        Dim resultado As String = "[{0}]"
        Dim columnas As New List(Of String)

        'Dim columna As String = "name: '{0}', index: '{0}', width: {1}, label: '{0}', sortable: false, hidden: false, align: 'Left'"
        Dim columna As String = "name: '{0}', index: '{0}', width: {1}, label: '{0}', sortable: true, hidden: false, align: 'Left'"
        Try

            For Each col As DataColumn In tabla.Columns
                Dim data As String = "{"
                data = data + String.Format(columna, col.ColumnName.ToString(), "200")
                data = data + "}"
                columnas.Add(data)
            Next
            resultado = String.Format(resultado, String.Join(",", columnas))

        Catch ex As Exception
            Throw ex
        End Try
        Return resultado
    End Function

    Private Function obtenerJson(ByVal tabla As DataTable) As String

        Dim listaFilas As New List(Of String)
        Dim resultado As String = "[{0}]"
        Dim columnas As New List(Of String)

        Try
            For i = 0 To tabla.Rows.Count - 1
                Dim listaCeldas As New List(Of String)
                For z = 0 To tabla.Columns.Count - 1
                    Dim fil As String = """{0}"": ""{1}"""
                    listaCeldas.Add(String.Format(fil, tabla.Columns(z).ColumnName, tabla.Rows(i)(z).ToString))
                Next

                Dim data As String = "{"
                data = data + String.Join(",", listaCeldas)
                data = data + "}"
                listaFilas.Add(data)
            Next
            resultado = String.Format(resultado, String.Join(",", listaFilas))

        Catch ex As Exception
            Throw ex
        End Try
        Return resultado
    End Function

    <WebMethod()>
    Public Shared Function obtenerServiciosPorTipoServicio(ByVal prIdTipoServicio As Integer) As List(Of ENT_ServicioHis)

        Dim historico As BL_HIS_Generico = Nothing
        Try
            'Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
            historico = New BL_HIS_Generico(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return historico.obtenerServiciosPorTipoServicio(prIdTipoServicio)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If historico IsNot Nothing Then historico.Dispose()
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


End Class
