Imports System.Web.Services
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BL
Imports System.Web.Script.Serialization
Imports System.IO
Imports Utilitario
Imports System.Web.Script.Services
Imports System.Data

Partial Class P_Movil_Atenciones_ATE_Configuracion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Entidad As BL_ENT_Entidad = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Entidad = New BL_ENT_Entidad(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlEntidad, Entidad.ListarParaAtencion(), "vcDes", "P_inCod")
                    ddlEntidad.Items.Insert(0, New ListItem("<Seleccione>", "-1"))

                    bpOfiModulo.NombreEntidad = "Oficina"
                    bpOfiModulo.vcTab = "GEN_EMP_Oficina"
                    bpOfiModulo.TipoOrigen = 0
                    bpOfiModulo.FuncionPersonalizada = "fn_bpOficina"
                    bpOfiModulo.Condicion = "GEN_EMP_Oficina.Vigente = 1"

                    bpUsuOperador.NombreEntidad = "Usuario"
                    bpUsuOperador.vcTab = "SEG_Usuario"
                    bpUsuOperador.TipoOrigen = 0
                    bpUsuOperador.FuncionPersonalizada = "fn_bpUsuario"
                    bpUsuOperador.Codigo = "vcUsu"
                    bpUsuOperador.Condicion = "btEst = 1"

               bpGruEmpGrupoAtencion.NombreEntidad = "Grupo Empleado"
                    bpGruEmpGrupoAtencion.vcTab = "M_GRUP_ORIG"
                    bpGruEmpGrupoAtencion.TipoOrigen = 0
                    bpGruEmpGrupoAtencion.Condicion = "GROR_btEst = 1 And GROR_inTipLIN = 2 AND GROR_P_inCODGRUORI NOT IN(SELECT IdGrupoEmpleado FROM MOV_ATE_GrupoAtencionGrupoEmpleado)"
                    bpGruEmpGrupoAtencion.FuncionPersonalizada = "fn_bpGrupoEmpleado"

                    bpDispensadorAtencion.NombreEntidad = "Tipo Interfaz"
                    bpDispensadorAtencion.vcTab = "MOV_ATE_TipoInterfazIndentificacion"
                    bpDispensadorAtencion.TipoOrigen = 0
                    bpDispensadorAtencion.Condicion = "btVig = 1 And IdEstado = 1"
                    bpDispensadorAtencion.FuncionPersonalizada = "fn_bpDispensadorAtencion"

                    MostrarDatos()
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Entidad IsNot Nothing Then Entidad.Dispose()
        End Try
    End Sub

    Private Sub MostrarDatos()
        Dim Atencion As BL_MOV_ATE_Atencion = Nothing
        Dim TipoInterfazIndentificacion As BL_MOV_ATE_TipoInterfazIndentificacion = Nothing
        Dim TipoIdentificacion As BL_MOV_ATE_TipoIdentificacion = Nothing
        Dim TipoVisualizador As BL_MOV_ATE_TipoVisualizador = Nothing
        Dim TipoLlamadaVisualizador As BL_MOV_ATE_TipoLlamadaVisualizador = Nothing
        Dim Estado As BL_MOV_Estado = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim script As String = ""

            Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)
            TipoInterfazIndentificacion = New BL_MOV_ATE_TipoInterfazIndentificacion(oUsuario.IdCliente)
            TipoIdentificacion = New BL_MOV_ATE_TipoIdentificacion(oUsuario.IdCliente)
            TipoVisualizador = New BL_MOV_ATE_TipoVisualizador(oUsuario.IdCliente)
            TipoLlamadaVisualizador = New BL_MOV_ATE_TipoLlamadaVisualizador(oUsuario.IdCliente)
            Estado = New BL_MOV_Estado(oUsuario.IdCliente)

            Dim ds As DataSet = Atencion.ListarConfiguracion(False, 2) 'Tipo Despacho
            Dim dtTipoInterfaz As DataTable = TipoInterfazIndentificacion.Listar().Tables(0)
            Dim dtTipoIdentificacion As DataTable = TipoIdentificacion.Listar().Tables(0)
            Dim dtTipoVisualizador As DataTable = TipoVisualizador.Listar().Tables(0)
            Dim dtTipoLlamadaVisualizador As DataTable = TipoLlamadaVisualizador.Listar().Tables(0)

            Dim dtEstados As DataTable = Estado.ListarPorModulo(10, 13)
            Dim dtOpciones As DataTable = ds.Tables(0)
            Dim dtModulos As DataTable = ds.Tables(1)
            Dim dtOperadores As DataTable = ds.Tables(2)
            Dim dtVentanillas As DataTable = ds.Tables(3)
            Dim dtGrupoAtencion As DataTable = ds.Tables(4)
            Dim dtDispensadores As DataTable = ds.Tables(5)
            Dim dtDisCon As DataTable = ds.Tables(6)
            Dim dtVisualizadores As DataTable = ds.Tables(7)
            Dim dtVisCon As DataTable = ds.Tables(8)
            Dim dtAteCon As DataTable = ds.Tables(9)

            Dim dvEstado1 As DataView = dtEstados.DefaultView
            dvEstado1.RowFilter = "inMod = 10"

            Dim dtEstados2 As DataTable = dtEstados.Copy()
            Dim dvEstado2 As DataView = dtEstados2.DefaultView
            dvEstado2.RowFilter = "inMod = 13"

            UtilitarioWeb.Dataddl(ddlOpcModulo, dtOpciones, "Descripcion", "IdOpcionAtencion")
            UtilitarioWeb.Dataddl(ddlOpcVentanilla, dtOpciones, "Descripcion", "IdOpcionAtencion")
            UtilitarioWeb.Dataddl(ddlOpcGrupoAtencion, dtOpciones, "Descripcion", "IdOpcionAtencion")
            UtilitarioWeb.Dataddl(ddlEstModulo, dvEstado1, "vcNom", "P_inCod")
            UtilitarioWeb.Dataddl(ddlEstVentanilla, dvEstado1, "vcNom", "P_inCod")
            UtilitarioWeb.Dataddl(ddlEstDispensador, dvEstado1, "vcNom", "P_inCod")
            UtilitarioWeb.Dataddl(ddlEstVisualizador, dvEstado2, "vcNom", "P_inCod")
            UtilitarioWeb.Dataddl(ddlTipFisIdeDispensador, dtTipoInterfaz, "Descripcion", "IdTipoInterfazIdentificacion")
            UtilitarioWeb.Dataddl(ddlTipIdeDispensador, dtTipoIdentificacion, "Descripcion", "IdTipoIdentificacion")
            UtilitarioWeb.Dataddl(ddlTipVisVisualizador, dtTipoVisualizador, "Descripcion", "IdTipoVisualizador")
            UtilitarioWeb.Dataddl(ddlTipLlaVisualizador, dtTipoLlamadaVisualizador, "Descripcion", "IdTipoLlamadaVisualizador")

            ddlOpcModulo.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlOpcVentanilla.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlOpcGrupoAtencion.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlEstModulo.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlEstVentanilla.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlEstDispensador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlEstVisualizador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlTipFisIdeDispensador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlTipIdeDispensador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlTipVisVisualizador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlTipLlaVisualizador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))

            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") & "\Temporal\Atenciones\", "\")

            CheckPath(HttpContext.Current.Server.MapPath("~") & "Temporal\Atenciones" + CarpetaDominio)

            'OPCIONES
            CarpetaDominio = CarpetaDominio.Replace("\", "//")
            script += "var dtOpciones = ["
            For i As Integer = 0 To dtOpciones.Rows.Count - 1
                script += "{IdOpcionAtencion: '" + dtOpciones.Rows(i)("IdOpcionAtencion").ToString() + "', IdCliente: '" + dtOpciones.Rows(i)("IdCliente").ToString() + "', Nombre: '" + dtOpciones.Rows(i)("Nombre").ToString()
                script += "', Descripcion: '" + dtOpciones.Rows(i)("Descripcion").ToString() + "', NombreImagen: '" + dtOpciones.Rows(i)("NombreImagen").ToString() + "', Color: '" + dtOpciones.Rows(i)("Color").ToString()
                script += "', Prefijo: '" + dtOpciones.Rows(i)("Prefijo").ToString() + "', IdOpcionPadre: '" + dtOpciones.Rows(i)("IdOpcionPadre").ToString() + "', VisualizaOpcion: '" + dtOpciones.Rows(i)("VisualizaOpcion").ToString()
                script += "', IdEstado: '" + dtOpciones.Rows(i)("IdEstado").ToString() + "', btVig: '" + dtOpciones.Rows(i)("btVig").ToString() + "', inEntidad: '" + dtOpciones.Rows(i)("inEntidad").ToString()
                script += "', vcEntidad: '" + dtOpciones.Rows(i)("vcEntidad").ToString() + "', vcNomEst: '" + dtOpciones.Rows(i)("vcNomEst").ToString() + "'},"

                'Descargando Imágenes
                Try
                    If Not IsDBNull(dtOpciones.Rows(i)("Imagen")) AndAlso Not IsNothing(dtOpciones.Rows(i)("Imagen")) Then
                        Dim vcFilePath As String = HttpContext.Current.Server.MapPath("~") + "Temporal//Atenciones" + CarpetaDominio + "//" + dtOpciones.Rows(i)("NombreImagen").ToString()
                        Dim byFileData As Byte() = dtOpciones.Rows(i)("Imagen")
                        File.WriteAllBytes(vcFilePath, byFileData)
                    End If
                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                End Try
            Next
            If dtOpciones.Rows.Count > 0 Then
                script = script.Substring(0, script.Length - 1)
            End If
            script += "]; "

            'MÓDULOS
            script += "var dtModulos = ["
            For i As Integer = 0 To dtModulos.Rows.Count - 1
                script += "{IdModulo: '" + dtModulos.Rows(i)("IdModulo").ToString() + "', Descripcion: '" + dtModulos.Rows(i)("Descripcion").ToString() + "', IdOpcion: '" + dtModulos.Rows(i)("IdOpcion").ToString()
                script += "', vcOpcion: '" + dtModulos.Rows(i)("vcOpcion").ToString() + "', IdOficina: '" + dtModulos.Rows(i)("IdOficina").ToString() + "', vcOficina: '" + dtModulos.Rows(i)("vcOficina").ToString()
                script += "', Ubicacion: '" + dtModulos.Rows(i)("Ubicacion").ToString() + "', IdEstado: '" + dtModulos.Rows(i)("IdEstado").ToString() + "', vcEstado: '" + dtModulos.Rows(i)("vcEstado").ToString()
                script += "', IdEstado: '" + dtModulos.Rows(i)("IdEstado").ToString() + "', btVig: '" + dtModulos.Rows(i)("btVig").ToString() + "'},"

                ddlModVentanilla.Items.Add(New ListItem(dtModulos.Rows(i)("Descripcion").ToString(), dtModulos.Rows(i)("IdModulo").ToString()))
                ddlModDispensador.Items.Add(New ListItem(dtModulos.Rows(i)("Descripcion").ToString(), dtModulos.Rows(i)("IdModulo").ToString()))
                ddlModVisualizador.Items.Add(New ListItem(dtModulos.Rows(i)("Descripcion").ToString(), dtModulos.Rows(i)("IdModulo").ToString()))
            Next

            ddlModVentanilla.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlModDispensador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))
            ddlModVisualizador.Items.Insert(0, New ListItem("<Seleccione>", "-1"))

            If dtModulos.Rows.Count > 0 Then
                script = script.Substring(0, script.Length - 1)
            End If
            script += "]; "

            'OPERADORES
            script += "var dtOperadores = ["
            For i As Integer = 0 To dtOperadores.Rows.Count - 1
                script += "{IdOperador: '" + dtOperadores.Rows(i)("IdOperador").ToString() + "', IdUsuario: '" + dtOperadores.Rows(i)("IdUsuario").ToString() + "', vcUsuario: '"
                script += dtOperadores.Rows(i)("vcUsuario").ToString() + "', vcEmpleado: '" + dtOperadores.Rows(i)("vcEmpleado").ToString() + "'},"

                ddlOpeVentanilla.Items.Add(New ListItem(dtOperadores.Rows(i)("vcUsuario").ToString() + "=" + dtOperadores.Rows(i)("vcEmpleado").ToString(), dtOperadores.Rows(i)("IdOperador").ToString()))
            Next

            ddlOpeVentanilla.Items.Insert(0, New ListItem("", "-1"))

            If dtOperadores.Rows.Count > 0 Then
                script = script.Substring(0, script.Length - 1)
            End If
            script += "]; "

            'VENTANILLAS
            script += "var dtVentanillas = ["
            For i As Integer = 0 To dtVentanillas.Rows.Count - 1
                script += "{IdVentanilla: '" + dtVentanillas.Rows(i)("IdVentanilla").ToString() + "', IdModulo: '" + dtVentanillas.Rows(i)("IdModulo").ToString() + "', vcModulo: '" + dtVentanillas.Rows(i)("vcModulo").ToString()
                script += "', IdOpcion: '" + dtVentanillas.Rows(i)("IdOpcion").ToString() + "', vcOpcion: '" + dtVentanillas.Rows(i)("vcOpcion").ToString() + "', Numero: '" + dtVentanillas.Rows(i)("Numero").ToString()
                script += "', IdOperador: '" + dtVentanillas.Rows(i)("IdOperador").ToString() + "', vcOperador: '" + dtVentanillas.Rows(i)("vcOperador").ToString() + "', Descripcion: '" + dtVentanillas.Rows(i)("Descripcion").ToString()
                script += "', Automatico: '" + dtVentanillas.Rows(i)("Automatico").ToString() + "', IdEstado: '" + dtVentanillas.Rows(i)("IdEstado").ToString() + "', vcEstado: '" + dtVentanillas.Rows(i)("vcEstado").ToString()
                script += "', btVig: '" + dtVentanillas.Rows(i)("btVig").ToString() + "', TieneDatos: '" + dtVentanillas.Rows(i)("TieneDatos").ToString() + "'},"
            Next
            If dtVentanillas.Rows.Count > 0 Then
                script = script.Substring(0, script.Length - 1)
            End If
            script += "]; "

            'GRUPOS DE ATENCION
            script += "var dtGrupoAtencion = ["
            For i As Integer = 0 To dtGrupoAtencion.Rows.Count - 1
                script += "{IdGrupoAtencion: '" + dtGrupoAtencion.Rows(i)("IdGrupoAtencion").ToString() + "', Prefijo: '" + dtGrupoAtencion.Rows(i)("Prefijo").ToString() + "', Descripcion: '" + dtGrupoAtencion.Rows(i)("Descripcion").ToString()
                script += "', Peso: '" + dtGrupoAtencion.Rows(i)("Peso").ToString() + "', btVig: '" + dtGrupoAtencion.Rows(i)("btVig").ToString() + "'},"
            Next
            If dtGrupoAtencion.Rows.Count > 0 Then
                script = script.Substring(0, script.Length - 1)
            End If
            script += "]; "

            'DISPENSADORES
            script += "var dtDispensadores = ["
            For i As Integer = 0 To dtDispensadores.Rows.Count - 1
                script += "{IdDispensadorAtencion: '" + dtDispensadores.Rows(i)("IdDispensadorAtencion").ToString() + "', IdModulo: '" + dtDispensadores.Rows(i)("IdModulo").ToString() + "', vcModulo: '" + dtDispensadores.Rows(i)("vcModulo").ToString()
                script += "', Codigo: '" + dtDispensadores.Rows(i)("Codigo").ToString() + "', Impresora: '" + dtDispensadores.Rows(i)("Impresora").ToString() + "', PantallaTactil: '" + dtDispensadores.Rows(i)("PantallaTactil").ToString()
                script += "', IdEstado: '" + dtDispensadores.Rows(i)("IdEstado").ToString() + "', vcEstado: '" + dtDispensadores.Rows(i)("vcEstado").ToString() + "', inCanAte: '" + dtDispensadores.Rows(i)("inCanAte").ToString() + "'},"
            Next
            If dtDispensadores.Rows.Count > 0 Then
                script = script.Substring(0, script.Length - 1)
            End If
            script += "]; "

            'CONFIGURACION DE DISPENSADORES
            ddlTipIdeDispensador.SelectedValue = dtDisCon.Rows(0)("IdTipoIdentificacion").ToString()
            If Convert.ToBoolean(dtDisCon.Rows(0)("EsPonderado")) Then
                rbtPonderado.Checked = True
            Else
                rbtSinPonderar.Checked = True
            End If
            txtNumOpcOpciones.Text = dtDisCon.Rows(0)("NumeroOpciones").ToString()
            txtNumFilOpciones.Text = dtDisCon.Rows(0)("NumeroFilas").ToString()
            txtNumColOpciones.Text = dtDisCon.Rows(0)("NumeroColumnas").ToString()
            If Convert.ToBoolean(dtDisCon.Rows(0)("OrientacionHorizontal")) Then
                ddlOriOpciones.SelectedValue = "horizontal"
            Else
                ddlOriOpciones.SelectedValue = "vertical"
            End If
            txtMsjIniDis.Text = dtDisCon.Rows(0)("MensajeInicial").ToString()
            txtMsjOpcDis.Text = dtDisCon.Rows(0)("MensajeOpcion").ToString()
            txtMsjTicDis.Text = dtDisCon.Rows(0)("MensajeTicket").ToString()
            txtMsjIniOpcDis.Text = dtDisCon.Rows(0)("MensajeInicialOpcional").ToString()

            'VISUALIZADORES
            script += "var dtVisualizadores = ["
            For i As Integer = 0 To dtVisualizadores.Rows.Count - 1
                script += "{IdVisualizador: '" + dtVisualizadores.Rows(i)("IdVisualizador").ToString() + "', IdModulo: '" + dtVisualizadores.Rows(i)("IdModulo").ToString() + "', vcModulo: '" + dtVisualizadores.Rows(i)("vcModulo").ToString()
                script += "', Codigo: '" + dtVisualizadores.Rows(i)("Codigo").ToString() + "', IdTipoVisualizador: '" + dtVisualizadores.Rows(i)("IdTipoVisualizador").ToString() + "', vcTipoVisualizador: '" + dtVisualizadores.Rows(i)("vcTipoVisualizador").ToString()
                script += "', IdEstado: '" + dtVisualizadores.Rows(i)("IdEstado").ToString() + "', vcEstado: '" + dtVisualizadores.Rows(i)("vcEstado").ToString() + "', btVig: '" + dtVisualizadores.Rows(i)("btVig").ToString() + "'},"
            Next
            If dtVisualizadores.Rows.Count > 0 Then
                script = script.Substring(0, script.Length - 1)
            End If
            script += "]; "

            'CONFIGURACION DE VISUALIZADORES
            txtNumAteAtenciones.Text = dtVisCon.Rows(0)("NumeroAtenciones").ToString()
            txtNumFilAtenciones.Text = dtVisCon.Rows(0)("NumeroFilas").ToString()
            txtNumColAtenciones.Text = dtVisCon.Rows(0)("NumeroColumnas").ToString()
            If Convert.ToBoolean(dtVisCon.Rows(0)("OrientacionHorizontal")) Then
                ddlOriHorVisualizador.SelectedValue = "horizontal"
            Else
                ddlOriHorVisualizador.SelectedValue = "vertical"
            End If
            ddlTipLlaVisualizador.SelectedValue = dtVisCon.Rows(0)("IdTipoLlamadaVisualizador").ToString()
            If Convert.ToBoolean(dtVisCon.Rows(0)("ImprimirTicket")) Then
                chkImpTicVisualizador.Checked = True
            End If
            txtMsjVisualizador.Text = dtVisCon.Rows(0)("Mensaje").ToString()
            ddlTipPreVisualizador.SelectedValue = dtVisCon.Rows(0)("TipoPresentacion").ToString()

            'CONFIGURACION DE ATENCIONES
            txtTiempoEspera.Text = dtAteCon.Rows(0)("TiempoEspera").ToString()
            ddlUnidad.SelectedValue = dtAteCon.Rows(0)("TiempoEsperaUnidad").ToString()
            txtTiempoRetAteCan.Text = dtAteCon.Rows(0)("TiempoRetomaAtencionCanceladaMin").ToString()

            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script.ToString(), True)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Atencion IsNot Nothing Then Atencion.Dispose()
            If TipoInterfazIndentificacion IsNot Nothing Then TipoInterfazIndentificacion.Dispose()
            If TipoIdentificacion IsNot Nothing Then TipoIdentificacion.Dispose()
            If TipoVisualizador IsNot Nothing Then TipoVisualizador.Dispose()
            If TipoLlamadaVisualizador IsNot Nothing Then TipoLlamadaVisualizador.Dispose()
            If Estado IsNot Nothing Then Estado.Dispose()
        End Try

    End Sub

    Private Sub CheckPath(ByRef serverPath As String)
        Dim initPath As String = String.Empty
        Dim tempPath As String = String.Empty
        Dim folders As String()

        Try

            folders = serverPath.Split(CChar("\\"))

            ' Save file to a server
            If serverPath.Contains("\\") Then
                initPath = "\\"
            Else
                ' Save file to a local folders
            End If

            For i As Integer = 0 To folders.Length - 1
                If tempPath.Trim = String.Empty And _
                folders(i) <> String.Empty Then
                    tempPath = initPath & folders(i)
                ElseIf tempPath.Trim <> String.Empty And _
                folders(i).Trim <> String.Empty Then
                    tempPath = tempPath & "\" & folders(i)

                    ' Doesn't check if it's a network connection
                    If Not tempPath.Contains("\\") And _
                    Not folders(i).Contains("$") Then

                        If Not System.IO.Directory.Exists(tempPath) Then
                            System.IO.Directory.CreateDirectory(tempPath)
                        End If

                    Else
                        If Not System.IO.Directory.Exists(tempPath) Then
                            System.IO.Directory.CreateDirectory(tempPath)
                        End If

                    End If

                End If

            Next

            serverPath = tempPath & "\"

        Catch ex As Exception
            Throw
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal XMLOpciones As String, ByVal lstImaOpc As String, ByVal XMLModulos As String, ByVal XMLOperadores As String, _
                                   ByVal XMLVentanillas As String, ByVal XMLGruposAtencion As String, ByVal XMLDispensadores As String, ByVal XMLDisCon As String, _
                                   ByVal XMLVisualizadores As String, ByVal XMLVisCon As String, ByVal XMLGrupoEmpleado As String, ByVal XMLTipoInterfaz As String, _
                                   ByVal XMLAteCon As String) As String
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Atencion As BL_MOV_ATE_Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)
            Dim strResultado As String = ""

            Dim lstObj As New List(Of Object)
            If (lstImaOpc <> "") Then
                Dim lstAdjuntos As String() = lstImaOpc.Split(";")

                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//Temporal//Atenciones//", "//")
                
                For i As Integer = 0 To lstAdjuntos.Length - 1
                    Dim row As String() = lstAdjuntos(i).Split(",")

                    If row(1).Trim() <> "" Then 'Hay archivo Adjunto?
                        Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//Temporal//Atenciones" + CarpetaDominio + "//" + row(1)
                        Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                        Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                        fs.Close()

                        Dim dict As New Dictionary(Of String, Object)
                        dict.Add("IdOpcionAtencion", row(0))
                        dict.Add("Archivo", byFileData)
                        dict.Add("Nombre", row(1))
                        lstObj.Add(dict)
                    End If
                Next
            End If

            strResultado = Atencion.GuardarConfiguracion(XMLOpciones, lstObj, XMLModulos, XMLOperadores, XMLVentanillas, XMLGruposAtencion, XMLDispensadores, XMLDisCon, _
                                                         XMLVisualizadores, XMLVisCon, XMLGrupoEmpleado, XMLTipoInterfaz, XMLAteCon)
            Atencion.Dispose()

            'If vcCodTipsol = "" Then
            '    strResultado = TipoSolicitud.Insertar(oTipoSolicitud, XMLCampos, XMLCamposPorEstadoProceso, Convert.ToInt32(inNumCam), XMLMensajePorEstado, _
            '                       XMLParametros, XMLReglaEstado, XMLUmbralEstado, XMLCamposCondicion)
            '    'AUDITORIA:Insertar registro
            '    oAuditoria.Insertar(New String() {strResultado})
            'Else
            '    'AUDITORIA:Actualizar Antes
            '    Dim strAntes As String = oAuditoria.AntesActualizar(New String() {vcCodTipsol})
            '    'Se actualizan dato....

            '    strResultado = TipoSolicitud.Actualizar(oTipoSolicitud, XMLCampos, XMLCamposPorEstadoProceso, Convert.ToInt32(inNumCam), XMLMensajePorEstado, _
            '                       XMLParametros, Convert.ToInt32(vcCodTipsol), XMLReglaEstado, XMLUmbralEstado, XMLCamposCondicion)

            '    ''AUDITORIA:Actualizar Despues
            '    oAuditoria.DespuesActualizar(New String() {strResultado}, strAntes)
            'End If
            'TipoSolicitud.Dispose()
            ''HttpContext.Current.Session("Usuario") = Usuario.Autentifica(oUsuario, "")

            Return strResultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerGrupoEmpleadoXAtencion(ByVal inOpcion As Integer, ByVal inIdAtencion As Integer, ByVal strCodGrup As String) As List(Of MOV_ATE_GrupoAtencionGrupoEmpleado)
        Dim Atencion As BL_MOV_ATE_Atencion = Nothing
        Try
            Atencion = New BL_MOV_ATE_Atencion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Return Atencion.ObtenerGrupoEmpleadoXAtencion(inOpcion, inIdAtencion, strCodGrup)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Atencion) Then Atencion.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerTipoInterfazXDispensador(ByVal inOpcion As Integer, ByVal inIdDispensador As String, ByVal strCodTipoInter As String) As List(Of MOV_ATE_TipoInterfazIndentificacion)
        Dim Atencion As BL_MOV_ATE_Atencion = Nothing
        Dim TipoInterfaz As BL_MOV_ATE_TipoInterfazIndentificacion = Nothing
        Try
            If inOpcion = 1 Then
                Atencion = New BL_MOV_ATE_Atencion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Return Atencion.ObtenerTipoInterfazXDispensador(inOpcion, Convert.ToInt32(inIdDispensador), strCodTipoInter)
            Else
                TipoInterfaz = New BL_MOV_ATE_TipoInterfazIndentificacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim lstTipoInterfaz As List(Of MOV_ATE_TipoInterfazIndentificacion) = New List(Of MOV_ATE_TipoInterfazIndentificacion)
                Dim dt As DataTable = TipoInterfaz.Listar().Tables(0)
                Dim lstId As String() = strCodTipoInter.Split(",")

                For i As Integer = 0 To lstId.Length - 1
                    For j As Integer = 0 To dt.Rows.Count - 1
                        If lstId(i) = dt.Rows(j)("IdTipoInterfazIdentificacion") Then
                            Dim oTipoInterfaz As MOV_ATE_TipoInterfazIndentificacion = New MOV_ATE_TipoInterfazIndentificacion()
                            oTipoInterfaz.Codigo = dt.Rows(j)("IdTipoInterfazIdentificacion")
                            oTipoInterfaz.Descripcion = dt.Rows(j)("Descripcion")
                            lstTipoInterfaz.Add(oTipoInterfaz)
                        End If
                    Next
                Next
                Return lstTipoInterfaz
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Atencion) Then Atencion.Dispose()
        End Try
    End Function
End Class
