Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.PCSistelMovil.Seguridad.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.PCSistelMovil.Seguridad.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Web.Script.Services

Partial Class P_Configuracion_Seguridad_Administrar_Mnt_Perfil
    Inherits System.Web.UI.Page

    ' =============================================================================================================================
    ' BUSCAR HORARIO
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Buscar_HorarioAcceso(ByVal prvcDia As String, ByVal prnuHora As String) As Integer
        Try

            Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente

            Dim BL_Perfil As BL_SEG_Perfil = New BL_SEG_Perfil(inCodUsu)

            Dim _return As Integer = BL_Perfil.Buscar_HoraAcceso(prvcDia, prnuHora)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    ' =============================================================================================================================
    ' LISTAR HORARIO
    ' =============================================================================================================================
    <WebMethod()>
    Public Shared Function Listar_HorarioAcceso(ByVal prCriterio As String) As List(Of ENT_SEG_Usuario)
        Try

            Dim inCodUsu As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente

            Dim BL_Perfil As BL_SEG_Perfil = New BL_SEG_Perfil(inCodUsu)

            Dim _return As List(Of ENT_SEG_Usuario) = BL_Perfil.Listar_HorarioAcceso(prCriterio)

            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    ' ============================================================================================================================
    ' LOAD 
    ' ============================================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim BL_Temporizador As BL_SEG_Temporizador = Nothing
        Dim ListaTemporizador As List(Of ENT_SEG_Temporizador)
        Dim miTemporizador As New ENT_SEG_Temporizador()
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

                If Not IsPostBack Then


                    Me.hdfIdTemporizador.Value = "-1"
                    Dim esAdmin As String = ""
                    Dim P_inCod As String = Request.QueryString("Cod")

                    Dim LineaTipo As New BL_MOV_LineaTipo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    UtilitarioWeb.Dataddl(ddlDashMovil, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), 0, "-- Ambos --"), "vcDescripcion", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlDashEmpleado, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), 0, "-- Ambos --"), "vcDescripcion", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlConsumo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), 0, "-- Ambos --"), "vcDescripcion", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlTipoGeneral, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), 0, "-- Ambos --"), "vcDescripcion", "P_inCod")
                    LineaTipo.Dispose()
                    BL_Temporizador = New BL_SEG_Temporizador(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    miTemporizador.IdTemporizador = -1
                    ListaTemporizador = BL_Temporizador.Listar(miTemporizador, 1)

                    For Each temp As ENT_SEG_Temporizador In ListaTemporizador
                        Me.ddlTemporizador.Items.Add(New ListItem(temp.Descripcion, temp.IdTemporizador))
                    Next

                    hdfCodigo.Value = P_inCod

                    CargarJSONPerfilAcceso(P_inCod)

                    'control busqueda principal
                    bpBusquedaUsuarios.NombreEntidad = "Usuario"
                    bpBusquedaUsuarios.vcTab = "SEG_Usuario"
                    bpBusquedaUsuarios.TipoOrigen = 0
                    bpBusquedaUsuarios.Condicion = " btEst = 1 And F_vcCodEmp IN (Select EMPL_P_vcCODEMP From M_Empl Where EMPL_btEST = 1) "
                    bpBusquedaUsuarios.FuncionPersonalizada = "fnMostrarCodigoUsuario"
                    bpBusquedaUsuarios.RutaRaiz = "../../../"
                    bpBusquedaUsuarios.Contenedor = "dvBusquedaUsuarios"

                    If Not IsNothing(P_inCod) Then

                        Dim oBL_SEG_Perfil As New BL_SEG_Perfil(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim objPerfil As ENT_SEG_Perfil = oBL_SEG_Perfil.Mostrar(P_inCod)

                        ' ============================================================================================================================
                        ' MODULO DE SE SEGURIDAD
                        ' ============================================================================================================================
                        hdf_idHoras.Value = oBL_SEG_Perfil.Obtener_HorarioAcceso(P_inCod)

                        oBL_SEG_Perfil.Dispose()

                        If objPerfil.vcNom = "Administrador" OrElse objPerfil.vcNom = "Super Administrador" Then
                            esAdmin = "$('#AccordionJQ1').find('h3').filter(':contains(Horarios de Acceso al Sistema)').hide();"
                        End If

                        ' ============================================================================================================================
                        txtNombre.Text = objPerfil.vcNom
                        ddlDashMovil.SelectedValue = objPerfil.inCodTip_DashMovil
                        ddlDashEmpleado.SelectedValue = objPerfil.inCodTip_DashEmpl
                        ddlConsumo.SelectedValue = objPerfil.inCodTip_Consumo
                        ddlTipoGeneral.SelectedValue = objPerfil.inCodTip_General
                        Me.hdfIdTemporizador.Value = objPerfil.IdTemporizador.ToString()
                    Else
                        hdfCodigo.Value = ""
                        tbAgregarUsuarios.Style("display") = "none"
                        dvMensajeUsuarios.Style("display") = ""
                    End If

                    ' ============================================================================================================================
                    ' MODULO DE SE SEGURIDAD
                    ' ============================================================================================================================
                    Dim script As String = "Listar_HorarioAcceso();" + esAdmin
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    ' ============================================================================================================================
                End If


            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If BL_Temporizador IsNot Nothing Then
                BL_Temporizador.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal oPerfil As String, ByVal pNodosSeleccionados As String) As String
        Dim objBL As BL_SEG_Perfil = Nothing
        Try
            objBL = New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim cadena As String()
            cadena = pNodosSeleccionados.Split(",")
            Dim lista As New List(Of String)

            If Not pNodosSeleccionados.Equals(String.Empty) Then
                For Each cad As String In cadena
                    cad = cad.Replace("DynaTreeNode<", String.Empty)
                    cad = cad.Remove(cad.IndexOf(">"))
                    lista.Add(cad)
                Next
            End If

            'Dim cadenausu As String()
            'cadenausu = pNodosSeleccionadosUsu.Split(",")
            'Dim listaUsu As New List(Of Integer)
            'If Not pNodosSeleccionadosUsu.Equals(String.Empty) Then
            '    For Each cad As String In cadenausu
            '        cad = cad.Replace("DynaTreeNode<", String.Empty)
            '        cad = cad.Remove(cad.IndexOf(">"))
            '        listaUsu.Add(cad)
            '    Next
            'End If

            'Dim cadenausu As String()
            'cadenausu = pNodosSeleccionadosUsu.Split(",")
            'Dim listaUsu As New List(Of Integer)
            'If Not pNodosSeleccionadosUsu.Equals(String.Empty) Then
            '    For Each cad As String In cadenausu
            '        listaUsu.Add(Convert.ToInt32(cad))
            '    Next
            'End If

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oPerfil As ENT_SEG_Perfil = oSerializer.Deserialize(Of ENT_SEG_Perfil)(oPerfil)

            v_oPerfil.vcNom = v_oPerfil.vcNom.Replace("&#39", "'")

            Dim _return As String = objBL.Grabar(v_oPerfil, lista)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBL IsNot Nothing Then objBL.Dispose()
        End Try
    End Function

    'Public Shared Function ObtenerProductoTree(ByVal pIdPerfil As Integer) As List(Of ENT_SEG_ProductoTree)
    <WebMethod()>
    Public Shared Function ObtenerProductoTree(ByVal pIdPerfil As String) As String
        Dim idPerfil As Integer = -1
        Dim objBL As BL_SEG_Perfil = Nothing
        Try
            objBL = New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            If Not pIdPerfil.Equals("") Then
                idPerfil = CInt(pIdPerfil)
            End If
            Dim _return As String = objBL.ObtenerProductoTree(idPerfil)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If objBL IsNot Nothing Then objBL.Dispose()
        End Try
    End Function

    'Protected Sub txtNombre_TextChanged(sender As Object, e As System.EventArgs) Handles txtNombre.TextChanged
    '    Dim P_inCod As String = Request.QueryString("Cod")
    '    hdfCodigo.Value = P_inCod
    '    If Not IsNothing(P_inCod) Then
    '        Dim objPerfil As ENT_SEG_Perfil = BL_SEG_Perfil.Instance.Mostrar(P_inCod)
    '        txtNombre.Text = objPerfil.vcNom
    '    Else
    '        hdfCodigo.Value = ""
    '    End If
    'End Sub

    '<WebMethod()>
    'Public Shared Function ObtenerUsuariosTree_Perfil(ByVal pIdPerfil As String) As String
    '    Dim idPerfil As Integer = -1
    '    Dim objBL As BL_SEG_Perfil = New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '    Try
    '        objBL = New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        If Not pIdPerfil.Equals("") Then
    '            idPerfil = CInt(pIdPerfil)
    '        End If
    '        Dim _return As String = objBL.ObtenerUsuariosTree_Perfil(idPerfil)
    '        Return _return
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If objBL IsNot Nothing Then objBL.Dispose()
    '    End Try
    'End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function ObtenerUsuarios_Perfil(ByVal pIdPerfil As String, ByVal inPagTam As Integer, ByVal inPagAct As Integer, ByVal vcFiltro As String) As Object
        Dim Perfil As BL_SEG_Perfil = New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Try
            Dim ds As DataSet = Perfil.ObtenerUsuarios_Perfil(pIdPerfil, vcFiltro)
            Perfil.Dispose()
            Dim dtUsuariosGrilla As DataTable = ds.Tables(0)
            Return JQGrid.DatosJSON(dtUsuariosGrilla, inPagTam, inPagAct)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Perfil IsNot Nothing Then Perfil.Dispose()
        End Try
    End Function

    '<WebMethod()>
    'Public Shared Function ObtenerUsuarios_Perfil_Busqueda(ByVal pIdPerfil As String, ByVal pvcNom As String) As String
    '    Dim objBL As BL_SEG_Perfil = Nothing
    '    Dim idPerfil As Integer = -1
    '    Try
    '        objBL = New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        If Not pIdPerfil.Equals("") Then
    '            idPerfil = CInt(pIdPerfil)
    '        End If
    '        Dim _return As String = objBL.ObtenerUsuarios_Perfil_Busqueda(pIdPerfil, pvcNom)
    '        Return _return
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If objBL IsNot Nothing Then objBL.Dispose()
    '    End Try
    'End Function

    <WebMethod()>
    Public Shared Function ProcesarUsuarioPerfil(ByVal inCodPer As Integer, ByVal inCodUsu As Integer, ByVal esAdd As Boolean) As String
        Dim Perfil As New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim resultado As String = String.Empty
        Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Solicitud = New BL_MOV_Solicitud(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            'JHERRERA 20150120: Se modificó método de llamada para validar si el usuario también es resposable de aprobación y sin hacer otra llamada a BD
            'Dim verif = Solicitud.VerificarUsuario_Tecnico(inCodUsu)
            Dim dtVerificaUsuario As DataTable = Solicitud.VerificarUsuario_TecnicoResApr(inCodUsu)
            Dim verif1 As Integer = dtVerificaUsuario(0)("EsTecnico")
            Dim verif2 As Integer = dtVerificaUsuario(0)("EsResponsableAprobacion")

            If Not esAdd And inCodPer = "42" And verif1 = 0 Then
                resultado = Perfil.ProcesarUsuarioPerfil(inCodPer, inCodUsu, esAdd)
                Dim tiposolicitud_usuario As BL_MOV_TipoSolicitud_Usuario = New BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("usuario"), ENT_SEG_Usuario).IdCliente)
                tiposolicitud_usuario.ElminarPermisosUsuario(inCodUsu)
                tiposolicitud_usuario.Dispose()
            ElseIf (Not esAdd And inCodPer = "42" And verif1 <> 0) Then
                resultado = verif1
                'If verif1 = 2 Then resultado = verif1 Else resultado = verif2
            Else
                resultado = Perfil.ProcesarUsuarioPerfil(inCodPer, inCodUsu, esAdd)
            End If

            Perfil.Dispose()
            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Perfil IsNot Nothing Then Perfil.Dispose()
            If Not IsNothing(Solicitud) Then Solicitud.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerTodosProductos(ByVal inCodPerfil As Integer) As List(Of ENT_SEG_ProductoTree)
        Dim Perfil As New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstProductos As New List(Of ENT_SEG_ProductoTree)
        Try
            lstProductos = Perfil.ObtenerTodosProductos(inCodPerfil)
            Perfil.Dispose()
            Return lstProductos
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Perfil IsNot Nothing Then Perfil.Dispose()
        End Try
    End Function


    Sub CargarJSONPerfilAcceso(inCodPerfil)
        Dim Perfil As New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstProductos As New List(Of ENT_SEG_ProductoTree)
        Dim sbDatos As New StringBuilder
        Try
            lstProductos = Perfil.ObtenerTodosProductos(inCodPerfil)
            sbDatos.AppendLine("var DatosTreeGridAccesos;")
            sbDatos.AppendLine("DatosTreeGridAccesos = ""{ 'total': '1', 'page': '1', 'records': '" & lstProductos.Count & "', 'rows': ["" +")

            'Dim ItemsContador As Integer = 0
            'Dim lstDictNodChilds As List(Of Dictionary(Of Integer, String))
            'Dim dictNodChilds As Dictionary(Of Integer, String)
            'Dim CodPadre As Integer
            'For Each Producto As ENT_SEG_ProductoTree In lstProductos
            '    If Producto.inNivel = 1 Then
            '        CodPadre = Producto.inPadre
            '        dictNodChilds.Add(CodPadre, Producto.Codigo)
            '    End If
            '    If Producto.inNivel = 3 Then
            '
            '    End If
            'Next

            Dim i As Integer = 0
            Dim strComa As String = ","
            For Each Producto As ENT_SEG_ProductoTree In lstProductos
                Dim esPadre As String = "false"
                If (Producto.inNumNod = 0) Then
                    esPadre = "true"
                End If
                i = i + 1 : If i >= lstProductos.Count Then strComa = ""
                'sbDatos.AppendLine("""{'id': '" & Producto.Codigo & "', 'cell':  ['" & Producto.OrdenGrilla & "', '" & Producto.Descripcion & "', '" & Producto.IsSelected & "', '" & Producto.inNivel & "', '" & Producto.inPadre & "', '" & Producto.Codigo & "', '" & Producto.inNumNod & "', '" & Producto.inNumNodSelect & "', '" & Producto.inNivel & "', '" & (Producto.inNivel - 1) & "-" & Producto.inPadre & "', '" & esPadre & "', 'false', 'true'] }" & strComa & """ +")
                sbDatos.AppendLine("""{'id': '" & Producto.Codigo & "', 'cell':  ['" & Producto.OrdenGrilla & "', '" & Producto.IsSelected & "', '" & Producto.Descripcion & "', '" & Producto.inNivel & "', '" & Producto.inPadre & "', '" & Producto.Codigo & "', '" & Producto.inNumNod & "', '" & Producto.inNumNodSelect & "', '" & Producto.lstCodNod & "', '" & Producto.esAdmLista & "', '" & Producto.btIns & "', '" & Producto.btAct & "', '" & Producto.btActBas & "', '" & Producto.btEli & "', '" & Producto.btExp & "', '" & Producto.btImp & "', '" & Producto.inNivel & "', '" & (Producto.inNivel - 1) & "-" & Producto.inPadre & "', '" & esPadre & "', 'false', 'true'] }" & strComa & """ +")
            Next
            sbDatos.AppendLine("""]}"";")
            'sbDatos.AppendLine("var slstProductos = '{    ""total"": ""1"",    ""page"": ""1"",    ""records"": ""2"",    ""rows"": [           {""id"": ""1"", ""cell"":  [""1"",  ""Super Item"",     ""300"", ""0"", """",  ""false"", ""false"", ""true""]},           {""id"": ""2"", ""cell"":  [""2"",  ""Item 1"",         ""100"", ""1"", ""1"", ""false"", ""false"", ""true""]}]}  '; ")
            Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "ScriptDatosTreGrid1", sbDatos.ToString, True)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Perfil IsNot Nothing Then Perfil.Dispose()
        End Try
    End Sub

    ' ==========================================================================================================================
    ' GUARDAR
    ' ==========================================================================================================================
    <WebMethod()>
    Public Shared Function GuardarTodo(ByVal oPerfil As String, ByVal XML_Producto As String, ByVal XML_Modulo As String, _
                                       ByVal XML_Opcion As String, ByVal XML_Item As String, ByVal prIdTemporizador As Integer) As String


        Dim Perfil As BL_SEG_Perfil = Nothing
        Dim Resultado As String = String.Empty

        Try
            Perfil = New BL_SEG_Perfil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim oSerializer As New JavaScriptSerializer
            Dim v_oPerfil As ENT_SEG_Perfil = oSerializer.Deserialize(Of ENT_SEG_Perfil)(oPerfil)
            v_oPerfil.vcNom = v_oPerfil.vcNom.Replace("&#39", "'")

            Dim inCodPer As Integer = v_oPerfil.P_inCod

         Resultado = Perfil.GrabarTodo(v_oPerfil, XML_Producto, XML_Modulo, XML_Opcion, XML_Item, prIdTemporizador).ToString()

            ' ==================================================================================================
            ' MODULO DE SEGURIDAD
            ' ==================================================================================================

            Perfil.Eliminar_HorarioAcceso(IIf(inCodPer = -1, Resultado, inCodPer))

            If v_oPerfil.vcHoras.Length > 0 Then

                For Each idHora As String In v_oPerfil.vcHoras.Split(",")
                    Perfil.Ingresar_HorarioAcceso(idHora, IIf(inCodPer = -1, Resultado, inCodPer))
                Next
            End If

            ' ==================================================================================================
            ' ==================================================================================================

            Return Resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Perfil IsNot Nothing Then Perfil.Dispose()
        End Try

    End Function

    <WebMethod()>
    Public Shared Function ObtenerTemporizador(ByVal prIdTemporizador As Integer) As List(Of ENT_SEG_Temporizador)
        Dim Temporizador As New BL_SEG_Temporizador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim lstTemporizador As New List(Of ENT_SEG_Temporizador)
        Dim MiTemporizador As New ENT_SEG_Temporizador()
        Try
            MiTemporizador.IdTemporizador = prIdTemporizador
            lstTemporizador = Temporizador.Listar(MiTemporizador, -1)

            Return lstTemporizador
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Temporizador IsNot Nothing Then Temporizador.Dispose()
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