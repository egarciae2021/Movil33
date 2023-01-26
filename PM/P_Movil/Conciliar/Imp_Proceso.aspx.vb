Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Conciliar_Imp_Proceso
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try

            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                oUsuario = HttpContext.Current.Session("Usuario")
                If Not IsPostBack Then

                    Dim OperadorDefault As String = "" & ConfigurationManager.AppSettings("IdOperadorDefault")
                    If OperadorDefault <> "52" Then
                        Response.Redirect("~/P_Movil/Administrar/Imp_Proceso.aspx")
                        Exit Sub
                    End If



                    txtPeriodo.Text = DateTime.Now.ToString("MM/yyyy")
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    hdfLicencia.Value = oUsuario.Empleado.Licencia.ToUpper
                    hdfbtPregunto.Value = "0"
                    hdfbtSobreescribe.Value = "0"
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
        End Try
    End Sub

    Protected Sub btnGuardar_Click(ByVal sender As Object, ByVal e As EventArgs) Handles btnGuardarSer.Click

        Dim IMP_Proceso As BL_MOV_IMP_Proceso = Nothing

        Try
            Dim oIMP_Proceso As ENT_MOV_IMP_Proceso
            IMP_Proceso = New BL_MOV_IMP_Proceso(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim files As HttpFileCollection = Request.Files
            Dim script As String = ""
            Dim Grabar As Boolean = False
            Dim Ruta As String = String.Empty

            'ruta de archivos
            If IsNothing(ConfigurationManager.AppSettings("ModoCloud")) OrElse ConfigurationManager.AppSettings("ModoCloud").ToString() = "0" Then
                Ruta = Server.MapPath("..\..\" & ConfigurationManager.AppSettings("RutaImportacion"))
            Else
                Dim ServicioGeneral As BL_GEN_Servicio_General = Nothing
                Dim IdDominio As Integer = Convert.ToInt32(HttpContext.Current.Session("IdDominio"))
                ServicioGeneral = New BL_GEN_Servicio_General(0, IdDominio)

                Try
                    Dim dtRutas As DataTable = ServicioGeneral.ObtenerRutasServicio("ImportadorLinea")
                    For Each dr As DataRow In dtRutas.Rows
                        If dr("Llave").ToString() = "RutaOrigen" Then
                            'Ruta = "..\..\" + dr("Ruta").ToString().Substring(dr("Ruta").ToString().IndexOf("P_Movil\Importacion")) 'obtener ruta virtual
                            Ruta = dr("Ruta").ToString()
                            Exit For
                        End If
                    Next

                    If Not Directory.Exists(Ruta) Then
                        Directory.CreateDirectory(Ruta)
                    End If
                Catch ex As Exception
                    Ruta = Server.MapPath("..\..\" & ConfigurationManager.AppSettings("RutaImportacion"))
                End Try
            End If


            Dim IdPlantillaImportacion_FYC As String = ConfigurationManager.AppSettings("IdPlantillaImportacion_FYC")
            Dim IdPlantillaImportacion_Corte As String = ConfigurationManager.AppSettings("IdPlantillaImportacion_Corte")
            Dim IdPlantillaImportacion_Adendum As String = ConfigurationManager.AppSettings("IdPlantillaImportacion_Adendum")

            For i As Integer = 0 To files.Count - 1

                oIMP_Proceso = New ENT_MOV_IMP_Proceso

                Dim postedFile As HttpPostedFile = files(i)
                If postedFile.ContentLength > 0 Then
                    Dim oArchivo As New ENT_GEN_Archivo
                    If (hdfbtSobreescribe.Value = "1") Then
                        Dim daFecha As DateTime = Now
                        Dim vcFecha As String = Now.Year.ToString() & New String("0", 2 - daFecha.Month.ToString().Length) + Now.Month.ToString() & New String("0", 2 - daFecha.Day.ToString().Length) + Now.Day.ToString() & "_" & New String("0", 2 - daFecha.Hour.ToString().Length) + Now.Hour.ToString() & New String("0", 2 - daFecha.Minute.ToString().Length) + Now.Minute.ToString()
                        oArchivo.vcNom = (postedFile.FileName.Substring(postedFile.FileName.LastIndexOf("\") + 1, postedFile.FileName.Length - postedFile.FileName.LastIndexOf("\") - 1))
                        oArchivo.vcNom = oArchivo.vcNom.Substring(0, oArchivo.vcNom.LastIndexOf(".")) & "_P_" & vcFecha & oArchivo.vcNom.Substring(oArchivo.vcNom.LastIndexOf("."), oArchivo.vcNom.Length - oArchivo.vcNom.LastIndexOf("."))
                    Else
                        oArchivo.vcNom = (postedFile.FileName.Substring(postedFile.FileName.LastIndexOf("\") + 1, postedFile.FileName.Length - postedFile.FileName.LastIndexOf("\") - 1))
                    End If
                    oArchivo.vcExt = oArchivo.vcNom.Substring(oArchivo.vcNom.LastIndexOf("."), oArchivo.vcNom.Length - oArchivo.vcNom.LastIndexOf("."))
                    oArchivo.vcRut = oArchivo.vcNom

                    If postedFile.ContentLength < 1024 Then 'BYTE
                        oArchivo.dcTam = Convert.ToDecimal(postedFile.ContentLength)
                        oArchivo.vcUniTam = "bytes"
                    ElseIf postedFile.ContentLength >= 1024 And postedFile.ContentLength < 1048576 Then 'KBYTE
                        oArchivo.dcTam = Decimal.Round(Convert.ToDecimal(postedFile.ContentLength) / 1024, 2)
                        oArchivo.vcUniTam = "KB"
                    Else 'MBYTE
                        oArchivo.dcTam = Decimal.Round(Convert.ToDecimal(postedFile.ContentLength) / 1048576, 2)
                        oArchivo.vcUniTam = "MB"
                    End If
                    postedFile.SaveAs(Ruta & oArchivo.vcNom)

                    oArchivo.byArc = File.ReadAllBytes(Ruta & oArchivo.vcNom)

                    oIMP_Proceso.Archivos.Add(oArchivo)
                    Grabar = True


                    If Not Grabar Then
                        script = "archivo=1;"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    Else
                        oIMP_Proceso.inTarCre = 3
                        oIMP_Proceso.inPro = 0
                        oIMP_Proceso.dtFecPro = DateTime.Now
                        oIMP_Proceso.Operador.P_inCodOpe = 5201
                        oIMP_Proceso.inCodArc = 3
                        If i = 0 Then
                            oIMP_Proceso.Plantilla.P_inCodPla = IdPlantillaImportacion_FYC
                        ElseIf i = 1 Then
                            oIMP_Proceso.Plantilla.P_inCodPla = IdPlantillaImportacion_Corte
                        ElseIf i = 2 Then
                            oIMP_Proceso.Plantilla.P_inCodPla = IdPlantillaImportacion_Adendum
                        End If

                        oIMP_Proceso.inTipTel = 1
                        oIMP_Proceso.btUniBitEnvRec = 1
                        oIMP_Proceso.btBitEnvRec = 0
                        oIMP_Proceso.EmpleadoPorDefecto.P_vcCod = ""
                        oIMP_Proceso.btVal = False
                        oIMP_Proceso.btImp = False
                        oIMP_Proceso.dtMesPer = "01/" & txtPeriodo.Text
                        oIMP_Proceso.dcTipCam = 0
                        oIMP_Proceso.VcCodCue = ""
                        oIMP_Proceso.vcLinTip = "1"
                        IMP_Proceso.Guardar(oIMP_Proceso)

                    End If

                End If
            Next i

            script = "Mensaje(""<br/><h1>Proceso guardado</h1><h2><br>Se ha puesto en cola esta tarea, véala en Mantenimiento\Visor de Tareas\Importación Facturación</h2><br/>"", document, CerroMensajeGuardar);"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            hdfIdPerfil.Value = "-1"


            ScriptManager.RegisterStartupScript(Me, Me.GetType, "attachevent", "EventosUpdatePanel();", True)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If IMP_Proceso IsNot Nothing Then
                IMP_Proceso.Dispose()
            End If
        End Try
    End Sub

    Private Sub LimpiarCampos()
    End Sub

    <WebMethod()>
    Public Shared Function ListarPorOperadorArchivo(ByVal p_inCodOpe As String, ByVal p_inTipArc As String, ByVal p_inTipPla As String) As List(Of ENT_MOV_IMP_Plantilla)
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla
        Try
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            oIMP_Plantilla.Operador.P_inCodOpe = Integer.Parse(p_inCodOpe)
            oIMP_Plantilla.inTipArc = Integer.Parse(p_inTipArc)
            oIMP_Plantilla.inTipPla = Integer.Parse(p_inTipPla)     'ECONDEÑA   12/11/2015

            Dim ListaPorOperadorArchivo As List(Of ENT_MOV_IMP_Plantilla) = Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>")
            HttpContext.Current.Session.Add("ListaPorOperadorArchivo_Plantilla", ListaPorOperadorArchivo)

            Return ListaPorOperadorArchivo

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function

    'Protected Sub ddlOperador_SelectedIndexChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles ddlOperador.SelectedIndexChanged
    '    Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
    '    Try
    '        Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla
    '        oIMP_Plantilla.Operador.P_inCodOpe = Integer.Parse(ddlOperador.SelectedValue)
    '        oIMP_Plantilla.inTipArc = Integer.Parse(ddlExtensionArchivo.SelectedValue)

    '        If oIMP_Plantilla.Operador.P_inCodOpe = -1 Or oIMP_Plantilla.inTipArc = -1 Then
    '            ddlPlantilla.Items.Clear()
    '            UtilitarioWeb.ValorDefectoddl(ddlPlantilla, "No disponible", "-1")
    '            ddlPlantilla.Enabled = False
    '            ddlPlantilla.ToolTip = "Seleccione un operador y un archivo para activar esta opción"
    '        Else
    '            UtilitarioWeb.Dataddl(ddlPlantilla, Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>"), "vcNom", "P_inCodPla")
    '            ddlPlantilla.Enabled = True
    '            ddlPlantilla.Attributes("disabled") = ""
    '            ddlPlantilla.ToolTip = ""
    '        End If

    '        ''If (chkServicioDefecto.Checked) Then
    '        ''    ddlServicioDefecto.Style("display") = ""
    '        ''Else
    '        ''    ddlServicioDefecto.Style("display") = "none"
    '        ''End If

    '        ScriptManager.RegisterStartupScript(Me, Me.GetType, "attachevent", "EventosUpdatePanel();", True)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If Plantilla IsNot Nothing Then
    '            Plantilla.Dispose()
    '        End If
    '    End Try
    'End Sub

    'Protected Sub ddlExtensionArchivo_SelectedIndexChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles ddlExtensionArchivo.SelectedIndexChanged
    '    Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing

    '    Try
    '        Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '        Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla
    '        oIMP_Plantilla.Operador.P_inCodOpe = Integer.Parse(ddlOperador.SelectedValue)
    '        oIMP_Plantilla.inTipArc = Integer.Parse(ddlExtensionArchivo.SelectedValue)

    '        If oIMP_Plantilla.Operador.P_inCodOpe = -1 Or oIMP_Plantilla.inTipArc = -1 Then
    '            ddlPlantilla.Items.Clear()
    '            UtilitarioWeb.ValorDefectoddl(ddlPlantilla, "No disponible", "-1")
    '            ddlPlantilla.Enabled = False
    '            ddlPlantilla.ToolTip = "Seleccione un operador y un archivo  para activar esta opción"
    '        Else
    '            UtilitarioWeb.Dataddl(ddlPlantilla, Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>"), "vcNom", "P_inCodPla")
    '            ddlPlantilla.Enabled = True
    '            ddlPlantilla.Attributes("disabled") = ""
    '            ddlPlantilla.ToolTip = ""
    '        End If
    '        ScriptManager.RegisterStartupScript(Me, Me.GetType, "attachevent", "EventosUpdatePanel();", True)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If Plantilla IsNot Nothing Then
    '            Plantilla.Dispose()
    '        End If
    '    End Try
    'End Sub

    'Protected Sub ddlPlantilla_SelectedIndexChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles ddlPlantilla.SelectedIndexChanged
    '    Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing

    '    tbCta.Style("display") = "block"
    '    Dim idTipoPla As Integer
    '    Try
    '        If Integer.Parse(ddlPlantilla.SelectedValue) <> -1 Then
    '            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    '            Dim oIMP_Plantilla As ENT_MOV_IMP_Plantilla = Plantilla.Mostrar(Integer.Parse(ddlPlantilla.SelectedValue))

    '            txtExtension.Text = oIMP_Plantilla.PlantillaDetalles(0).vcExtDef

    '            dvTC.Visible = oIMP_Plantilla.PlantillaDetalles(0).btTipCam
    '            txtTipoCambio.Visible = oIMP_Plantilla.PlantillaDetalles(0).btTipCam

    '            chkUnirValoresBits.Style("display") = "none"
    '            rbUnirValoresBits.Style("display") = "none"
    '            chkUnirValoresBits.Checked = True

    '            idTipoPla = oIMP_Plantilla.PlantillaDetalles(0).inTipPla

    '            If (idTipoPla = 2) Then
    '                'tbCta.Style.Add("display", "block")
    '                tbCta.Attributes.Add("style", "display:block")
    '            Else
    '                tbCta.Style.Add("display", "none")
    '            End If

    '            For Each oPlantillaDetalle As ENT_MOV_IMP_PlantillaDetalle In oIMP_Plantilla.PlantillaDetalles
    '                For Each oCampo As ENT_MOV_IMP_Campo In oPlantillaDetalle.Campos
    '                    If oCampo.P_inCodCam = 90 Or oCampo.P_inCodCam = 122 Or oCampo.P_inCodCam = 88 Then
    '                        chkUnirValoresBits.Style("display") = ""
    '                        rbUnirValoresBits.Style("display") = ""
    '                    End If
    '                Next
    '            Next

    '        Else
    '            txtExtension.Text = ""
    '            dvTC.Style("display") = "none"  'dvTC.Visible = False
    '            txtTipoCambio.Style("display") = "none"  'txtTipoCambio.Visible = False
    '        End If
    '        ScriptManager.RegisterStartupScript(Me, Me.GetType, "attachevent", "EventosUpdatePanel();", True)
    '    Catch ex As Exception
    '        Dim util As New Utilitarios
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    '        Throw New Exception(UtilitarioWeb.MensajeError)
    '    Finally
    '        If Plantilla IsNot Nothing Then
    '            Plantilla.Dispose()
    '        End If
    '    End Try
    'End Sub

    <WebMethod()>
    Public Shared Function MostrarExtensionPlantilla(ByVal cod As Integer) As String

        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Dim _ext As String = ""

        Try
            If cod <> -1 Then
                Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oIMP_Plantilla As ENT_MOV_IMP_Plantilla = Plantilla.Mostrar(Integer.Parse(cod))

                _ext = oIMP_Plantilla.PlantillaDetalles(0).vcExtDef.ToString()

            End If

            Return _ext

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function MostrarPlantilla(ByVal cod As Integer) As ENT_MOV_IMP_Plantilla

        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing

        Try
            If cod <> -1 Then
                Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim oIMP_Plantilla As ENT_MOV_IMP_Plantilla = Plantilla.Mostrar(Integer.Parse(cod))

                Return oIMP_Plantilla
            Else

                Return Nothing

            End If



        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GuardarPerfil(ByVal inCodPerfil As String, ByVal vcNomPerfil As String, ByVal inTipoTarea As String,
                                         ByVal inTipoProgramacion As String, ByVal vcFechaProgramada As String, ByVal inCodOpe As String,
                                         ByVal inTipoArchivo As String, ByVal inTipoPlantilla As String, ByVal inPlantilla As String,
                                         ByVal vcExtension As String, ByVal inTipoTelefonia As String, ByVal vcCuenta As String,
                                         ByVal idTipoLinea As String, ByVal dcTipoCambio As String, ByVal vcNomCuenta As String) As String

        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing

        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim CodigoPerfil As Integer
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oPerfil As New ENT_MOV_IMP_Perfil
            oPerfil.P_inCodPerfil = inCodPerfil
            oPerfil.vcCodEmpleado = UtilitarioWeb.ComprobarStringNULL(oUsuario.Empleado.P_vcCod, "")
            oPerfil.inCodUsuario = UtilitarioWeb.ComprobarIntNULL(oUsuario.P_inCod, -1)
            oPerfil.vcNombrePerfil = UtilitarioWeb.ComprobarStringNULL(vcNomPerfil, "")
            oPerfil.PerfilCampos.inTipoTarea = UtilitarioWeb.ComprobarIntNULL(inTipoTarea, -1)
            oPerfil.PerfilCampos.inTipoProgramacion = UtilitarioWeb.ComprobarIntNULL(inTipoProgramacion, -1)
            oPerfil.PerfilCampos.vcFechaProgramada = vcFechaProgramada.ToString() 'Date.Now.ToString()
            oPerfil.PerfilCampos.F_inCodOpe = UtilitarioWeb.ComprobarIntNULL(inCodOpe, -1)
            oPerfil.PerfilCampos.inTipoArchivo = UtilitarioWeb.ComprobarIntNULL(inTipoArchivo, -1)
            oPerfil.PerfilCampos.inTipoPlantilla = UtilitarioWeb.ComprobarIntNULL(inTipoPlantilla, -1)
            oPerfil.PerfilCampos.inPlantilla = UtilitarioWeb.ComprobarIntNULL(inPlantilla, 1)
            oPerfil.PerfilCampos.F_vcCodCue = UtilitarioWeb.ComprobarStringNULL(vcCuenta, "")
            oPerfil.PerfilCampos.F_vcNomCue = UtilitarioWeb.ComprobarStringNULL(vcNomCuenta, "")
            oPerfil.PerfilCampos.vcExtension = UtilitarioWeb.ComprobarStringNULL(vcExtension, "")
            oPerfil.PerfilCampos.inTipoTelefonia = UtilitarioWeb.ComprobarIntNULL(inTipoTelefonia, -1)
            oPerfil.PerfilCampos.inTipoCambio = UtilitarioWeb.ComprobarDecimalNULL(dcTipoCambio, 0)
            oPerfil.PerfilCampos.inTipoLinea = UtilitarioWeb.ComprobarIntNULL(idTipoLinea, -1)


            If oPerfil.P_inCodPerfil <> -1 Then
                oPerfil.PerfilCampos.F_inCodPer = inCodPerfil
                CodigoPerfil = Plantilla.ActualizarPerfil(oPerfil)
            Else
                CodigoPerfil = Plantilla.InsertarPerfil(oPerfil)
            End If

            Return CodigoPerfil.ToString

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarMisPerfiles(ByVal vcCodPerfil As String, ByVal vcTipoConsulta As String) As List(Of ENT_MOV_IMP_Perfil)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _idUsuario As Int32 = oUsuario.P_inCod
            Dim MisPerfiles As List(Of ENT_MOV_IMP_Perfil) = Plantilla.MostrarPerfil(Convert.ToInt32(vcCodPerfil), _idUsuario, Convert.ToInt32(vcTipoConsulta))

            Return MisPerfiles

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function QuitarPerfil(ByVal P_inCodPerfil As String) As Integer
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _idUsuario As Integer = oUsuario.P_inCod
            Dim result As Integer = Plantilla.QuitarPerfil(Convert.ToInt32(P_inCodPerfil), _idUsuario)

            Return result

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Function



    'Public Shared Function ListarCuentaxOperador(ByVal cod As Integer) As List(Of ENT_MOV_Cuenta)
    <WebMethod()>
    Public Shared Function ListarCuentaxOperador(ByVal vcCodNom As String, ByVal inMaxFilMos As Integer, ByVal inCodOpe As Integer) As List(Of ENT_MOV_Cuenta)
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Dim bl_cuenta As BL_MOV_Cuenta = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            bl_cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)

            Dim _lstCtas As List(Of ENT_MOV_Cuenta)

            '_lstCtas = bl_cuenta.ListarPorOperador(cod)
            _lstCtas = bl_cuenta.ListarCuentasPorOperador(inMaxFilMos, vcCodNom, inCodOpe)
            Return _lstCtas

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_cuenta IsNot Nothing Then
                bl_cuenta.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ValidarArchivos(ByVal vcFiles As String) As String
        Dim IMP_Proceso As BL_MOV_IMP_Proceso = Nothing

        Try
            IMP_Proceso = New BL_MOV_IMP_Proceso(0)

            Dim Files As String() = vcFiles.Substring(1, vcFiles.Length - 1).Replace("   Remover ", "").Split(",")
            Dim strRetorna = "1"
            Dim dtArchivos As New DataTable()
            dtArchivos = IMP_Proceso.ListarArchivosDiferentes()

            'valida
            For i As Integer = 0 To Files.Length - 1
                For j As Integer = 0 To dtArchivos.Rows.Count - 1
                    If (Files(i) = dtArchivos.Rows(j)("vcNomArc").ToString()) Then
                        strRetorna = "0"
                        Exit For
                    End If
                Next

                If strRetorna = "0" Then
                    Exit For
                End If
            Next

            Return strRetorna
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
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

    ''Private Sub ddlTipoPlantilla_SelectedIndexChanged(sender As Object, e As System.EventArgs) Handles ddlTipoPlantilla.SelectedIndexChanged
    ''    ddlPlantilla.Items.Clear()

    ''    Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
    ''    Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla
    ''    Try
    ''        Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
    ''        oIMP_Plantilla.Operador.P_inCodOpe = ddlOperador.SelectedValue
    ''        oIMP_Plantilla.inTipArc = ddlExtensionArchivo.SelectedValue
    ''        oIMP_Plantilla.inTipPla = ddlTipoPlantilla.SelectedValue

    ''        Dim lstPlantilla As List(Of ENT_MOV_IMP_Plantilla) = Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>")
    ''        For Each oPlantilla As ENT_MOV_IMP_Plantilla In lstPlantilla
    ''            ddlPlantilla.Items.Add(New ListItem(oPlantilla.vcNom, oPlantilla.P_inCodPla))
    ''        Next

    ''    Catch ex As Exception
    ''        Dim util As New Utilitarios
    ''        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
    ''        Throw New Exception(UtilitarioWeb.MensajeError)
    ''    Finally
    ''        If Plantilla IsNot Nothing Then
    ''            Plantilla.Dispose()
    ''        End If
    ''    End Try
    ''End Sub
End Class
