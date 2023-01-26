Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_SolicitudesAtencion_SOA_Mnt_Tipo
   Inherits System.Web.UI.Page

    Protected Sub P_Movil_SolicitudesAtencion_SOA_Mnt_Tipo_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Estado As BL_MOV_SOA_Estado = Nothing
        Dim Bolsa As BL_SOA_Bolsa = Nothing
        Dim Tipo As BL_INC_Tipo = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
            Dim viIdTecnico As Integer = -1

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Dim codigo As String = Request.QueryString("Cod")
                    Dim campo As String = Request.QueryString("Par")
                    Dim vcScript As String = String.Empty

                    hdfEmpleado.Value = oUsuario.F_vcCodEmp
                    hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
                    'hdfIdTecnico.Value = viIdTecnico
                    hdfAdmin.Value = "0"
                    If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"


                    Estado = New BL_MOV_SOA_Estado(oUsuario.IdCliente)
                    Dim dtEstado As DataTable = Estado.Listar().Tables(0)
                    UtilitarioWeb.Dataddl(ddlEstado, dtEstado, "Nombre", "CodEstado")

                    Bolsa = New BL_SOA_Bolsa(oUsuario.IdCliente)
                    Dim lstBolsa As List(Of ENT_SOA_Bolsa) = Bolsa.ListarBolsa_porNivelExacto(1)
                    For i As Integer = 0 To lstBolsa.Count - 1
                        ddlBolsasParaAsignar.Items.Add(New ListItem(lstBolsa.Item(i).Nombre, lstBolsa.Item(i).IdBolsa.ToString() + "-" + lstBolsa.Item(i).IdNivel.ToString()))
                    Next

                    CargarParametros()

                    If codigo IsNot Nothing Then
                        hdfIdTipo.Value = codigo

                        Tipo = New BL_INC_Tipo(oUsuario.IdCliente)
                        Dim ds As DataSet = Tipo.Mostrar(Convert.ToInt32(codigo))
                        MostrarDatos(ds.Tables(0), ds.Tables(1), ds.Tables(2), ds.Tables(3), ds.Tables(4), ds.Tables(5), dtEstado)
                    Else
                        hdfIdTipo.Value = "0"
                        chkEnviarCorreo.Checked = True
                        vcScript = vcScript & "var arIncidencia = new Array(); arIncidencia.Estados = []; arIncidencia.Umbrales = []; "
                    End If
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", vcScript, True)

                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Estado IsNot Nothing Then Estado.Dispose()
            If Bolsa IsNot Nothing Then Bolsa.Dispose()
            If Tipo IsNot Nothing Then Tipo.Dispose()
        End Try
    End Sub

    Private Sub CargarParametros()
        Dim dt As DataTable = New DataTable()
        dt.Columns.Add("Valor")
        dt.Columns.Add("Descripcion")

        dt.Rows.Add(New Object() {"CodigoTicket", "Código"})
        dt.Rows.Add(New Object() {"IdUsuario", "Empleado"})
        dt.Rows.Add(New Object() {"IdUsuarioRegistro", "Usuario de Registro"})
        dt.Rows.Add(New Object() {"IdUsuarioTecnico", "Técnico"})
        dt.Rows.Add(New Object() {"ValorObjetivo", "Valor Objetivo (Umbral)"})
        dt.Rows.Add(New Object() {"ValorMaximo", "Valor Máximo (Umbral)"})
        dt.Rows.Add(New Object() {"CodEstado", "Estado"})
        dt.Rows.Add(New Object() {"IdTipificacion", "Tipificación"})
        dt.Rows.Add(New Object() {"Tipo", "Tipo"})
        dt.Rows.Add(New Object() {"Descripcion", "Descripción"})
        dt.Rows.Add(New Object() {"Asunto", "Asunto"})
        dt.Rows.Add(New Object() {"FechaRegistro", "Fecha De Registro"})
        dt.Rows.Add(New Object() {"HoraRegistro", "Hora De Registro"})

        dt.Rows.Add(New Object() {"ConclusionCierre", "Conclusión de Ticket"})

        Dim dv As DataView = dt.DefaultView
        dv.Sort = "Descripcion asc"

        UtilitarioWeb.Dataddl(ddlValor, dv.ToTable(), "Descripcion", "Valor")
        ddlValor.Items.Insert(0, New ListItem("", "-1"))
    End Sub

    Private Sub MostrarDatos(ByVal dtTipo As DataTable, ByVal dtBolsas As DataTable, ByVal dtTipificacion As DataTable, ByVal dtParametros As DataTable, ByVal dtUmbralesPorEstado As DataTable, ByVal dtMensajesPorEstado As DataTable, _
                             ByVal dtEstados As DataTable)
        Try
            Dim vcScript As String = ""
            vcScript = vcScript & "var arIncidencia = new Array(); arIncidencia.Estados = []; arIncidencia.Umbrales = []; "

            'INFORMACIÓN GENERAL
            txtNombre.Text = dtTipo.Rows(0)("Nombre")
            txtDescripcion.Text = dtTipo.Rows(0)("Descripcion")
            If dtTipo.Rows(0)("MostrarCampanaActual").ToString() = "True" Then chkMostrarCamActual.Checked = True Else chkMostrarCamActual.Checked = False

            If dtTipo.Rows(0)("MostrarAdmin").ToString() = "True" Then chkMostrarAdmin.Checked = True Else chkMostrarAdmin.Checked = False

            If dtTipo.Rows(0)("btVig").ToString() = "True" Then
                chkActivo.Checked = True
                EsChkActivar.Style("display") = "none"
            End If

            'BOLSAS
            If dtBolsas.Rows.Count > 0 Then
                Dim blnExiste As Boolean
                Dim inExiste As Integer

                For i As Integer = 0 To dtBolsas.Rows.Count - 1
                    ddlBolsasAsignadas.Items.Add(New ListItem(dtBolsas(i)("Nombre"), dtBolsas(i)("IdBolsa").ToString() + "-" + dtBolsas(i)("IdNivel").ToString()))

                    blnExiste = False
                    For j As Integer = 0 To ddlBolsasParaAsignar.Items.Count - 1
                        If dtBolsas.Rows(i)("IdBolsa").ToString() = ddlBolsasParaAsignar.Items(j).Value.Split("-")(0) Then
                            blnExiste = True
                            inExiste = j
                            Exit For
                        End If
                    Next

                    If blnExiste Then
                        ddlBolsasParaAsignar.Items.RemoveAt(inExiste)
                    End If
                Next
            End If

            'TIPIFICACIÓN
            vcScript += "var dtTipificacion = ["
            For i As Integer = 0 To dtTipificacion.Rows.Count - 1
                vcScript += "{ P_inCod: '" + dtTipificacion.Rows(i)("IdTipificacion").ToString() + "', Nombre: '" + dtTipificacion.Rows(i)("Nombre").ToString() + "', Descripcion: '"
                vcScript += dtTipificacion.Rows(i)("Descripcion").ToString() + "', IdTipo: '" + hdfIdTipo.Value + "', inNumTic: '" + dtTipificacion.Rows(i)("inNumTic").ToString() + "'}, "
            Next
            If dtTipificacion.Rows.Count > 0 Then
                vcScript = vcScript.Substring(0, vcScript.Length - 1)
            End If
            vcScript += "];"

            ''CAMPOS DE PARÁMETROS
            'For i As Integer = 0 To dtCamposParametros.Rows.Count - 1
            '    vcScript += "$('#ddlValor').append($('<option></option>').val('" + dtCamposParametros.Rows(i)("Nombre").ToString() + "').html('" + dtCamposParametros.Rows(i)("Descripcion").ToString() + "'));"
            'Next

            'PARÁMETROS
            vcScript += "var dtParametros = ["
            For i As Integer = 0 To dtParametros.Rows.Count - 1
                Dim vcCampo As String = ddlValor.Items.FindByValue(dtParametros.Rows(i)("Valor").ToString()).Text
                vcScript += "{ Clave: '" + dtParametros.Rows(i)("Clave").ToString() + "', IdCampo: '" + dtParametros.Rows(i)("Valor").ToString() + "', vcCampo: '" + vcCampo
                vcScript += "', IdParametro: '" + dtParametros.Rows(i)("IdParametro").ToString() + "'}, "
            Next
            If dtParametros.Rows.Count > 0 Then
                vcScript = vcScript.Substring(0, vcScript.Length - 1)
            End If
            vcScript += "];"

            For i As Integer = 0 To dtEstados.Rows.Count - 1

                'ESTADOS
                Dim vcEstado As String = dtEstados.Rows(i)("Nombre").ToString()

                vcScript += "arIncidencia.Estados['" + vcEstado + "'] = []; "
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Id = '" + dtEstados.Rows(i)("CodEstado").ToString() + "';"
                'vcScript += "arIncidencia.Estados['" + vcEstado + "'].EnviarCorreo = '" + vcEnviaCorreo + "';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].IdMensaje = '0';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Destinatarios = '';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Asunto = '';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Mensaje = '';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Propietario = '0';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].UsuarioEspecifico = '0';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Responsable = '0';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Tecnico = '0';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].IdRegla = '0';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].ReglaAutomatica = '0';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].IdEstadoFinal = '';"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Campos = [];"
                vcScript += "arIncidencia.Estados['" + vcEstado + "'].Orden  = '" + dtEstados.Rows(i)("Orden").ToString() + "';"

                'UMBRALES POR ESTADO
                'Inicialización
                If (dtEstados.Rows(i)("CodEstado").ToString() <> "PEN" And dtEstados.Rows(i)("CodEstado").ToString() <> "AYU" And dtEstados.Rows(i)("CodEstado").ToString() <> "ESC") Then

                    Dim EstIni As String = "0"
                    If dtEstados.Rows(i)("CodEstado").ToString() = "RES" Or dtEstados.Rows(i)("CodEstado").ToString() = "ANU" Or dtEstados.Rows(i)("CodEstado").ToString() = "DEV" _
                        Or dtEstados.Rows(i)("CodEstado").ToString() = "ATE" Then
                        EstIni = "ACT"
                    Else
                        EstIni = "PEN"
                    End If

                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'] = [];"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Umbral = '0';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].EstadoInicial = '" + EstIni + "';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].EstadoFinal = arIncidencia.Estados['" + vcEstado + "'].Id;"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].ValorObjetivo = '';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].ValorMaximo = '';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].EnviarCorreo = '0';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Destinatarios = '';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Asunto = '';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Mensaje = '';"
                    vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].IdUmbral = '0';"
                End If

                'Actualización con datos de BD
                For j As Integer = 0 To dtUmbralesPorEstado.Rows.Count - 1
                    If dtEstados.Rows(i)("CodEstado").ToString() = dtUmbralesPorEstado.Rows(j)("CodEstadoFinal").ToString() Then
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Umbral = '1';"
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].EstadoInicial = '" + dtUmbralesPorEstado.Rows(j)("CodEstadoInicial").ToString() + "';"
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].EstadoFinal = '" + dtUmbralesPorEstado.Rows(j)("CodEstadoFinal").ToString() + "';"
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].ValorObjetivo = '" + dtUmbralesPorEstado.Rows(j)("ValorObjetivoDias").ToString() + "';"
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].ValorMaximo = '" + dtUmbralesPorEstado.Rows(j)("ValorMaximoDias").ToString() + "';"
                        If dtUmbralesPorEstado.Rows(j)("Asunto").ToString <> "" Then
                            vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].EnviarCorreo = '1';"
                        End If
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Destinatarios = '" + dtUmbralesPorEstado.Rows(j)("Destinatarios") + "';"
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Asunto = '" + dtUmbralesPorEstado.Rows(j)("Asunto") + "';"
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Mensaje = '" + dtUmbralesPorEstado.Rows(j)("Mensaje").Replace("\n", "///") + "';"
                        'vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].Mensaje = '" + dtUmbralesPorEstado.Rows(j)("Mensaje").Replace("/|/", "///") + "';"
                        vcScript += "arIncidencia.Umbrales['" + vcEstado + "'].IdUmbral = '" + dtUmbralesPorEstado.Rows(j)("IdUmbral").ToString() + "';"
                    End If
                Next

                Dim vcEnviaCorreo = "0"
                'MENSAJES POR ESTADO
                For j As Integer = 0 To dtMensajesPorEstado.Rows.Count - 1

                    If dtEstados.Rows(i)("CodEstado").ToString() = dtMensajesPorEstado.Rows(j)("CodEstado").ToString() Then
                        vcScript += "arIncidencia.Estados['" + vcEstado + "'].IdMensaje = '" + dtMensajesPorEstado.Rows(j)("IdMensaje").ToString() + "';"
                        vcScript += "arIncidencia.Estados['" + vcEstado + "'].Destinatarios = '" + dtMensajesPorEstado.Rows(j)("Destinatarios").ToString() + "';"
                        vcScript += "arIncidencia.Estados['" + vcEstado + "'].Asunto = '" + dtMensajesPorEstado.Rows(j)("Asunto").ToString() + "';"
                        'vcScript += "arIncidencia.Estados['" + vcEstado + "'].Mensaje = '" + dtMensajesPorEstado.Rows(j)("Mensaje").ToString().Replace("/|/", "///") + "';"
                        vcScript += "arIncidencia.Estados['" + vcEstado + "'].Mensaje = '" + dtMensajesPorEstado.Rows(j)("Mensaje").ToString().Replace("\n", "///") + "';"
                        If (Convert.ToBoolean(dtMensajesPorEstado.Rows(j)("Propietario"))) Then
                            vcScript += "arIncidencia.Estados['" + vcEstado + "'].Propietario = '1';"
                        End If
                        If (Convert.ToBoolean(dtMensajesPorEstado.Rows(j)("Tecnico"))) Then
                            vcScript += "arIncidencia.Estados['" + vcEstado + "'].Tecnico = '1';"
                        End If

                        vcEnviaCorreo = "1"
                    End If
                Next

                vcScript += "arIncidencia.Estados['" + vcEstado + "'].EnviarCorreo = '" + vcEnviaCorreo + "';"

            Next

            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKeyDatos", vcScript, True)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)

        End Try
    End Sub

   '<WebMethod()>
   'Public Shared Function ListarTipo(ByVal prIdTipo As Integer) As List(Of ENT_INC_Tipo)
   '    Dim tipo As BL_INC_Tipo = Nothing
   '    Try

   '        tipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
   '        Return tipo.ListarTipo(prIdTipo)

   '    Catch ex As Exception
   '        Dim util As New Utilitarios
   '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
   '        Throw New Exception(UtilitarioWeb.MensajeError)
   '    Finally

   '        If tipo IsNot Nothing Then tipo.Dispose()

   '    End Try
   'End Function

    <WebMethod()>
    Public Shared Function registrarTipo(ByVal prIdTipo As String, ByVal prNombre As String, ByVal prDescripcion As String, ByVal prMostrarCampanaActual As String, _
                                         ByVal prActivo As Integer, ByVal XML_Escalamiento As String, ByVal XML_Tipificacion As String, ByVal XML_Parametros As String, _
                                         ByVal XML_EstadoUmbral As String, ByVal XML_EstadoMensaje As String, ByVal prMostrarAdmin As String) As String
        Dim tipo As BL_INC_Tipo = Nothing
        Try
            Dim vcRespuesta As String = ""
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            'oCultura.F_inCodIdi

            tipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            XML_EstadoMensaje = XML_EstadoMensaje.Replace("/|/", "\n")
            XML_EstadoUmbral = XML_EstadoUmbral.Replace("/|/", "\n")

            If prIdTipo = "0" Then
                vcRespuesta = tipo.registrarTipo(Convert.ToInt32(prIdTipo), prNombre, prDescripcion, IIf(prMostrarCampanaActual = "true", True, False), XML_Escalamiento, _
                                          XML_Tipificacion, XML_Parametros, XML_EstadoUmbral, XML_EstadoMensaje, IIf(prMostrarAdmin = "true", True, False))
            Else
                'actualizar
                vcRespuesta = tipo.actualizarTipo(prIdTipo, prNombre, prDescripcion, IIf(prMostrarCampanaActual = "true", True, False), prActivo, XML_Escalamiento, XML_Tipificacion, _
                                                  XML_Parametros, XML_EstadoUmbral, XML_EstadoMensaje, IIf(prMostrarAdmin = "true", True, False))
            End If

            Return vcRespuesta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipo IsNot Nothing Then tipo.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValidarTickets_X_Bolsa(ByVal prIdBolsa As String) As String
        Dim tipo As BL_INC_Tipo = Nothing
        Try
            Dim vcRespuesta As String = ""

            tipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            vcRespuesta = tipo.ValidarTickets_X_Bolsa(Convert.ToInt32(prIdBolsa))

            Return vcRespuesta
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If tipo IsNot Nothing Then tipo.Dispose()
        End Try
    End Function

   '<WebMethod()>
   'Public Shared Function actualizarTipo(ByVal prIdTipo As Integer, ByVal prNombre As String, ByVal prDescripcion As String, _
   '                                      ByVal XML_Escalamiento As String, ByVal prMostrarCampanaActual As String, ByVal prActivo As Integer) As Integer
   '    Dim tipo As BL_INC_Tipo = Nothing
   '    Try

   '        tipo = New BL_INC_Tipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
   '        Return tipo.actualizarTipo(prIdTipo, prNombre, prDescripcion, XML_Escalamiento, IIf(prMostrarCampanaActual = "true", True, False), prActivo)

   '    Catch ex As Exception
   '        Dim util As New Utilitarios
   '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
   '        Throw New Exception(UtilitarioWeb.MensajeError)
   '    Finally
   '        If tipo IsNot Nothing Then tipo.Dispose()
   '    End Try
   'End Function

End Class
