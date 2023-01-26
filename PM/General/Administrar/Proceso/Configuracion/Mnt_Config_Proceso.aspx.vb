Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class General_Administrar_Proceso_Configuracion_Mnt_Config_Proceso
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_Configuracion_Mnt_Config_Proceso_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        Dim Config_Proceso As BL_PCS_IMP_Config_Proceso = Nothing
        Dim Plantilla As BL_PCS_IMP_Plantilla = Nothing
        Dim Formato As BL_PCS_IMP_Formato = Nothing
        Dim Config_Fuente As BL_PCS_IMP_Config_Fuente = Nothing
        Dim FuenteBD As BL_PCS_IMP_FuenteBD = Nothing
        Dim FuenteArchivo As BL_PCS_IMP_FuenteArchivo = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Dim codigo As String = Request.QueryString("Cod")
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                    If Not IsNothing(codigo) Then
                        hdfCodigo.Value = codigo
                        Config_Proceso = New BL_PCS_IMP_Config_Proceso(oUsuario.IdCliente)
                        Dim eConfig_Proceso As New ENT_PCS_IMP_Config_Proceso
                        eConfig_Proceso.IdConfigProceso = codigo
                        Dim oConfig As List(Of ENT_PCS_IMP_Config_Proceso) = Config_Proceso.Listar_x_Codigo(eConfig_Proceso)

                        If oConfig.Count <> 0 Then
                            txtdescripcion.Text = oConfig.ElementAt(0).Descripcion.ToString().Trim()
                            ddlTipoProceso.SelectedValue = oConfig.ElementAt(0).Tipo.ToString().Trim()

                            hdfPlantilla.Value = oConfig.ElementAt(0).IdPlantilla
                            Dim ePlantilla As New ENT_PCS_IMP_Plantilla
                            ePlantilla.IdPlantilla = oConfig.ElementAt(0).IdPlantilla
                            Plantilla = New BL_PCS_IMP_Plantilla(oUsuario.IdCliente)
                            Dim lstPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Codigo(ePlantilla)
                            txtPlantilla.Text = lstPlantilla.ElementAt(0).Nombre.ToString().Trim()

                            hdfFormato.Value = oConfig.ElementAt(0).IdFormato
                            Dim eFormato As New ENT_PCS_IMP_Formato
                            eFormato.IdFormato = oConfig.ElementAt(0).IdFormato
                            Formato = New BL_PCS_IMP_Formato(oUsuario.IdCliente)
                            Dim lstFormato As List(Of ENT_PCS_IMP_Formato) = Formato.Listar_x_Codigo(eFormato)
                            txtFormato.Text = lstFormato.ElementAt(0).Nombre.ToString().Trim()

                            Dim eConfig_Fuente As New ENT_PCS_IMP_Config_Fuente
                            Config_Fuente = New BL_PCS_IMP_Config_Fuente(oUsuario.IdCliente)
                            eConfig_Fuente.IdConfigFuente = oConfig.ElementAt(0).IdConfigFuente
                            Dim lstConfig_Fuente As List(Of ENT_PCS_IMP_Config_Fuente) = Config_Fuente.Listar_x_Codigo(eConfig_Fuente)

                            hdfCodigoFuente.Value = oConfig.ElementAt(0).IdConfigFuente

                            If lstConfig_Fuente.ElementAt(0).IdFuenteBD <> 0 Then
                                ddlFuente.SelectedValue = "BD"
                                Dim eFuenteBD As New ENT_PCS_IMP_FuenteBD
                                FuenteBD = New BL_PCS_IMP_FuenteBD(oUsuario.IdCliente)
                                eFuenteBD.IdFuente = lstConfig_Fuente.ElementAt(0).IdFuenteBD
                                Dim lstFuenteBD As List(Of ENT_PCS_IMP_FuenteBD) = FuenteBD.Listar_x_Codigo(eFuenteBD)
                                txtFuenteBD.Text = lstFuenteBD.ElementAt(0).Nombre.ToString().Trim()

                            ElseIf lstConfig_Fuente.ElementAt(0).IdFuenteArchivo <> 0 Then
                                ddlFuente.SelectedValue = "Archivo"
                                Dim eFuenteArchivo As New ENT_PCS_IMP_FuenteArchivo
                                FuenteArchivo = New BL_PCS_IMP_FuenteArchivo(oUsuario.IdCliente)
                                eFuenteArchivo.IdFuente = lstConfig_Fuente.ElementAt(0).IdFuenteArchivo
                                Dim lstFuenteArchivo As List(Of ENT_PCS_IMP_FuenteArchivo) = FuenteArchivo.Listar_x_Codigo(eFuenteArchivo)
                                txtFuenteArchivo.Text = lstFuenteArchivo.ElementAt(0).Nombre.ToString().Trim()

                            Else
                                ddlFuente.SelectedValue = "-1"
                            End If

                            chActivo.Visible = True
                            If oConfig.ElementAt(0).btEst Then
                                chActivo.Checked = True
                                hdfEstado.Value = 1
                                trEstado.Style("display") = "none"
                            Else
                                chActivo.Checked = False
                                hdfEstado.Value = 0
                            End If
                        Else
                            Dim script As String = ""
                            script += "alert('No se puede editar este registro porque es parte del Sistema');window.parent.tab.tabs('remove', window.parent.tab.tabs('option', 'selected'));"
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                        End If
                    Else
                        hdfEstado.Value = ""
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Config_Proceso IsNot Nothing Then Config_Proceso.Dispose()
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
            If Formato IsNot Nothing Then Formato.Dispose()
            If Config_Fuente IsNot Nothing Then Config_Fuente.Dispose()
            If FuenteBD IsNot Nothing Then FuenteBD.Dispose()
            If FuenteArchivo IsNot Nothing Then FuenteArchivo.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(pCod As String, _
                                    pDesc As String, _
                                    pPlantilla As String, _
                                    pFormato As String, _
                                    pTipoProceso As String, _
                                    pConfigFuente As String, _
                                    btVig As Integer) As String
        Dim Config_Proceso As BL_PCS_IMP_Config_Proceso = Nothing
        Try
            Dim eConfig_Proceso As New ENT_PCS_IMP_Config_Proceso
            Config_Proceso = New BL_PCS_IMP_Config_Proceso(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As String

            eConfig_Proceso.IdCliente = 0
            eConfig_Proceso.Descripcion = pDesc
            eConfig_Proceso.IdConfigFuente = pConfigFuente
            eConfig_Proceso.IdFormato = pFormato
            eConfig_Proceso.IdPlantilla = pPlantilla
            eConfig_Proceso.Tipo = pTipoProceso
            eConfig_Proceso.btEst = Convert.ToBoolean(btVig)
            If pCod = "" Then
                resultado = Config_Proceso.Insertar(eConfig_Proceso)
            Else
                eConfig_Proceso.IdConfigProceso = pCod
                eConfig_Proceso.IdConfigFuente = pConfigFuente
                resultado = Config_Proceso.Actualizar(eConfig_Proceso)
            End If

            Return resultado
        Catch ex As Exception
            'Return ex.Message
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Config_Proceso IsNot Nothing Then Config_Proceso.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Listar_FuenteBD(nombre As String, idCliente As String) As List(Of ENT_PCS_IMP_FuenteBD)
        Dim FuenteBD As BL_PCS_IMP_FuenteBD = Nothing
        Try
            FuenteBD = New BL_PCS_IMP_FuenteBD(idCliente)
            Return FuenteBD.Listar_x_Nombre(nombre)
        Catch ex As Exception
        Finally
            If FuenteBD IsNot Nothing Then
                FuenteBD.Dispose()
            End If
        End Try
        Return New List(Of ENT_PCS_IMP_FuenteBD)
    End Function

    <WebMethod()> _
    Public Shared Function Listar_FuenteArchivo(nombre As String, idCliente As String) As List(Of ENT_PCS_IMP_FuenteArchivo)
        Dim FuenteArchivo As BL_PCS_IMP_FuenteArchivo = Nothing
        Try
            FuenteArchivo = New BL_PCS_IMP_FuenteArchivo(idCliente)
            Return FuenteArchivo.Listar_x_Nombre(nombre)
        Catch ex As Exception
        Finally
            If FuenteArchivo IsNot Nothing Then FuenteArchivo.Dispose()
        End Try
        Return New List(Of ENT_PCS_IMP_FuenteArchivo)
    End Function

    <WebMethod()> _
    Public Shared Function Listar_Plantilla(nombre As String, idCliente As String) As List(Of ENT_PCS_IMP_Plantilla)
        Dim Plantilla As BL_PCS_IMP_Plantilla = Nothing
        Try
            Plantilla = New BL_PCS_IMP_Plantilla(idCliente)
            Return Plantilla.Listar_x_Valor(nombre)
        Catch ex As Exception
        Finally
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
        End Try
        Return New List(Of ENT_PCS_IMP_Plantilla)
    End Function

    <WebMethod()> _
    Public Shared Function Listar_Formato(nombre As String, idCliente As String) As List(Of ENT_PCS_IMP_Formato)
        Dim Formato As BL_PCS_IMP_Formato = Nothing
        Try
            Formato = New BL_PCS_IMP_Formato(idCliente)
            Return Formato.Listar_x_Nombre(nombre)
        Catch ex As Exception
        Finally
            If Formato IsNot Nothing Then Formato.Dispose()
        End Try
        Return New List(Of ENT_PCS_IMP_Formato)
    End Function


End Class
