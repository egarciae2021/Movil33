Imports System.Web.Services
Imports System.IO
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization

Partial Class P_Movil_Administrar_Mantenimiento_Imp_Mnt_Plantilla
    Inherits System.Web.UI.Page

    ' =================================================================================================
    '   LOAD
    ' =================================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Plantilla = New BL_MOV_IMP_Plantilla(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim inCodPla As String = Request.QueryString("Cod")
                    Dim lstArchivo As List(Of ENT_MOV_IMP_TipoArchivo)

                    lstArchivo = Plantilla.ListarTipoArchivo(-1, "<Seleccionar>")

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

                    UtilitarioWeb.Dataddl(ddlArchivo, lstArchivo, "vcNomTipArc", "P_inCodTipArc")

                    For Each oArchivo As ENT_MOV_IMP_TipoArchivo In lstArchivo
                        If hdfExt.Value <> "" Then
                            hdfExt.Value &= ","
                        End If
                        hdfExt.Value &= oArchivo.vcExtArcDef
                    Next

                    If Not IsNothing(inCodPla) Then
                        Dim oSerializer As New JavaScriptSerializer
                        Dim oPlantilla As ENT_MOV_IMP_Plantilla = Plantilla.Mostrar(Convert.ToInt32(inCodPla))

                        ddlOperador.SelectedValue = oPlantilla.Operador.P_inCodOpe
                        txtNombre.Text = oPlantilla.vcNom.Replace("&#39", "'")
                        ddlArchivo.SelectedValue = oPlantilla.inTipArc

                        chkTodasHojas.Checked = oPlantilla.btTodHojPla

                        If oPlantilla.inTipArc <> 3 Then
                            trTodaHoja.Style("display") = "none"
                            btnAgregarHoja.Style("display") = "none"
                        End If

                        chkEstado.Checked = oPlantilla.btVig

                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If

                        hdfCod.Value = inCodPla

                        Dim Script As String = " var lstPlantillaDetalles=" & oSerializer.Serialize(oPlantilla.PlantillaDetalles) & ";"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                    Else
                        trEstado.Style("display") = "none"
                        trTodaHoja.Style("display") = "none"
                        btnAgregarHoja.Style("display") = "none"
                        hdfCod.Value = ""
                    End If

                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Sub

    ' =================================================================================================
    '   LISTAR DATOS
    ' =================================================================================================
    <WebMethod()>
    Public Shared Function ListarDatos() As String
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Dim IMP_Servicio As BL_MOV_IMP_Servicio = Nothing
        Dim Campo As BL_MOV_IMP_Campo = Nothing
        Dim Servicio As BL_GEN_Servicio = Nothing
        Dim Zona As BL_GEN_Zona = Nothing

        Dim bl_TipoConcepto As BL_PCS_MOV_TipoConcepto = Nothing
        Dim bl_ConceptoResumen As BL_PCS_MOV_ConceptoResumen = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            Plantilla = New BL_MOV_IMP_Plantilla(oUsuario.IdCliente)
            IMP_Servicio = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Campo = New BL_MOV_IMP_Campo(oUsuario.IdCliente)
            Servicio = New BL_GEN_Servicio(oUsuario.IdCliente)
            Zona = New BL_GEN_Zona(oUsuario.IdCliente)

            Dim dict As New Dictionary(Of String, Object)
            Dim oSerial As New JavaScriptSerializer()

            dict.Add("lstCampo", Campo.Listar(-1, "<Seleccionar>"))
            dict.Add("lstTipoPlantilla", Plantilla.ListarTipoPlantilla(-1, ""))
            dict.Add("lstServicio", Servicio.Listar(-1, "<Seleccionar>"))
            dict.Add("lstZona", Zona.Listar(-1, "<Seleccionar>"))


            ' =======================================================================================================================
            '   ECONDEÑA
            ' =======================================================================================================================

            bl_TipoConcepto = New BL_PCS_MOV_TipoConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            dict.Add("lstTipoServicioImportador", bl_TipoConcepto.ListarTipoConcepto(-1, "<Seleccionar>"))

            bl_ConceptoResumen = New BL_PCS_MOV_ConceptoResumen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            dict.Add("lstServicioResumenCosto", bl_ConceptoResumen.ListarConceptoResumenPorTipo(1))
            dict.Add("lstServicioResumenConsumo", bl_ConceptoResumen.ListarConceptoResumenPorTipo(2))
            ' =======================================================================================================================
            '   END
            ' =======================================================================================================================


            ' ==========================================================================================
            '   HINOPE
            ' ==========================================================================================

            'dict.Add("lstTipoServicioImportador", Plantilla.ListarTipoServicioImportador())

            'dict.Add("lstServicioResumenCosto", IMP_Servicio.ListarServiciosResumen(-1, "<Seleccionar>", "Costo"))
            'dict.Add("lstServicioResumenConsumo", IMP_Servicio.ListarServiciosResumen(-1, "<Seleccionar>", "Consumo"))

            ' ==========================================================================================
            '   END HINOPE
            ' ==========================================================================================

            Return oSerial.Serialize(dict)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
            If Campo IsNot Nothing Then
                Campo.Dispose()
            End If
            If Servicio IsNot Nothing Then
                Servicio.Dispose()
            End If
            If Zona IsNot Nothing Then
                Zona.Dispose()
            End If
            If bl_ConceptoResumen IsNot Nothing Then
                bl_ConceptoResumen.Dispose()
            End If
            If bl_TipoConcepto IsNot Nothing Then
                bl_TipoConcepto.Dispose()
            End If
        End Try
    End Function

    ' =================================================================================================
    '   GUARDAR
    ' =================================================================================================
    <WebMethod()>
    Public Shared Sub Guardar(ByVal p_oPlantilla As String)
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing

        Try
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim oPlantilla As ENT_MOV_IMP_Plantilla = oSerializer.Deserialize(Of ENT_MOV_IMP_Plantilla)(p_oPlantilla)

            For Each oPlantillaDetalle As ENT_MOV_IMP_PlantillaDetalle In oPlantilla.PlantillaDetalles
                oPlantillaDetalle.vcOtrSep = oPlantillaDetalle.vcOtrSep.Replace("&#39", "'")
                oPlantillaDetalle.vcCabIde = oPlantillaDetalle.vcCabIde.Replace("&#39", "'")
                oPlantillaDetalle.vcFilIde1 = oPlantillaDetalle.vcFilIde1.Replace("&#39", "'")
                oPlantillaDetalle.vcFilIde2 = oPlantillaDetalle.vcFilIde2.Replace("&#39", "'")
                oPlantillaDetalle.vcFilIde3 = oPlantillaDetalle.vcFilIde3.Replace("&#39", "'")
            Next



            If oPlantilla.P_inCodPla < 0 Then
                Plantilla.Insertar(oPlantilla)
            Else
                Plantilla.Actualizar(oPlantilla)
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
    End Sub
    
    <WebMethod()>
    Public Shared Function ValidarRegistrosFijos() As Boolean
        Dim band As Boolean = False
        Dim bl_grupoConcepto As BL_PCS_MOV_GrupoConcepto = Nothing
        Dim bl_conceptoResumen As BL_PCS_MOV_ConceptoResumen = Nothing
        Try
            bl_grupoConcepto = New BL_PCS_MOV_GrupoConcepto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            bl_conceptoResumen = New BL_PCS_MOV_ConceptoResumen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstGrupo As List(Of ENT_PCS_MOV_GrupoConcepto) = bl_grupoConcepto.MostrarPorCodigo(1, True)
            Dim lstConcepto As List(Of ENT_PCS_MOV_ConceptoResumen) = bl_conceptoResumen.MostrarConceptoResumenPorCod(1, True)

            If lstGrupo.Count > 0 Then
                If lstConcepto.Count > 0 Then
                    band = True
                End If
            End If

            Return band
            
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bl_grupoConcepto IsNot Nothing Then
                bl_grupoConcepto.Dispose()
            End If
            If bl_conceptoResumen IsNot Nothing Then
                bl_conceptoResumen.Dispose()
            End If
        End Try
    End Function

End Class