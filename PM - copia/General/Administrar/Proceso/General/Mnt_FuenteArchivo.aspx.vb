Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class General_Administrar_Proceso_General_Mnt_FuenteArchivo
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_General_Mnt_FuenteArchivo_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim TipoFuente As BL_PCS_IMP_TipoFuente = Nothing
        Dim TipoArchivo As BL_PCS_IMP_TipoArchivo = Nothing
        Dim FuenteArchivo As BL_PCS_IMP_FuenteArchivo = Nothing
        Dim Config_TipoFuente As BL_PCS_IMP_Config_TipoFuente = Nothing
        Dim TipoFuenteUNC As BL_PCS_IMP_TipoFuenteUNC = Nothing
        Dim TipoFuenteFTP As BL_PCS_IMP_TipoFuenteFTP = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    TipoFuente = New BL_PCS_IMP_TipoFuente(oUsuario.IdCliente)
                    TipoArchivo = New BL_PCS_IMP_TipoArchivo(oUsuario.IdCliente)

                    Dim codigo As String = Request.QueryString("Cod")
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

                    Dim lstTipoFuente As New List(Of ENT_PCS_IMP_TipoFuente)
                    lstTipoFuente.Add(New ENT_PCS_IMP_TipoFuente With {.IdTipoFuente = "-1", .TipoFuente = "--Seleccione--"})
                    lstTipoFuente.AddRange(TipoFuente.Listar())
                    UtilitarioWeb.Dataddl(ddlTipoFuente, lstTipoFuente, "TipoFuente", "IdTipoFuente")

                    Dim lstTipoArchivo As New List(Of ENT_PCS_IMP_TipoArchivo)
                    lstTipoArchivo.Add(New ENT_PCS_IMP_TipoArchivo With {.IdTipoArchivo = "-1", .Descripcion = "--Seleccione--"})
                    lstTipoArchivo.AddRange(TipoArchivo.Listar())
                    UtilitarioWeb.Dataddl(ddlTipoArchivo, lstTipoArchivo, "Descripcion", "IdTipoArchivo")

                    If Not IsNothing(codigo) Then
                        hdfCodigo.Value = codigo

                        FuenteArchivo = New BL_PCS_IMP_FuenteArchivo(oUsuario.IdCliente)
                        Dim eFuenteArchivo As New ENT_PCS_IMP_FuenteArchivo
                        eFuenteArchivo.IdFuente = codigo
                        Dim oFuenteArchivo As List(Of ENT_PCS_IMP_FuenteArchivo) = FuenteArchivo.Listar_x_Codigo(eFuenteArchivo)

                        If oFuenteArchivo.Count <> 0 Then

                            txtnombre.Text = oFuenteArchivo.ElementAt(0).Nombre.ToString().Trim().Replace("&#39", "'")

                            Config_TipoFuente = New BL_PCS_IMP_Config_TipoFuente(oUsuario.IdCliente)
                            Dim eConfig_TipoFuente As New ENT_PCS_IMP_Config_TipoFuente
                            eConfig_TipoFuente.IdConfigTipoFuente = oFuenteArchivo.ElementAt(0).IdConfigTipoFuente
                            Dim lstConfig_TipoFuente As List(Of ENT_PCS_IMP_Config_TipoFuente) = Config_TipoFuente.Listar_x_Codigo(eConfig_TipoFuente)

                            If lstConfig_TipoFuente.Count <> 0 Then

                                hdfCodigoTipoFuente.Value = oFuenteArchivo.ElementAt(0).IdConfigTipoFuente
                                If lstConfig_TipoFuente.ElementAt(0).IdTipoFuenteUNC <> 0 Then
                                    ddlTipoFuente.SelectedValue = 2

                                    TipoFuenteUNC = New BL_PCS_IMP_TipoFuenteUNC(oUsuario.IdCliente)
                                    Dim eTipoFuenteUNC As New ENT_PCS_IMP_TipoFuenteUNC
                                    eTipoFuenteUNC.IdFuente = lstConfig_TipoFuente.ElementAt(0).IdTipoFuenteUNC
                                    Dim lstTipoFuenteUNC As List(Of ENT_PCS_IMP_TipoFuenteUNC) = TipoFuenteUNC.Listar_x_Codigo(eTipoFuenteUNC)
                                    txtNombreUNC.Text = lstTipoFuenteUNC.ElementAt(0).Nombre.ToString().Trim().Replace("&#39", "'")
                                    hdfTipoFuente.Value = "UNC"
                                ElseIf lstConfig_TipoFuente.ElementAt(0).IdTipoFuenteFTP <> 0 Then
                                    ddlTipoFuente.SelectedValue = 1

                                    TipoFuenteFTP = New BL_PCS_IMP_TipoFuenteFTP(oUsuario.IdCliente)
                                    Dim eTipoFuenteFTP As New ENT_PCS_IMP_TipoFuenteFTP
                                    eTipoFuenteFTP.IdFuente = lstConfig_TipoFuente.ElementAt(0).IdTipoFuenteFTP
                                    Dim lstTipoFuenteFTP As List(Of ENT_PCS_IMP_TipoFuenteFTP) = TipoFuenteFTP.Listar_x_Codigo(eTipoFuenteFTP)
                                    txtNombreFTP.Text = lstTipoFuenteFTP.ElementAt(0).Nombre.ToString().Trim().Replace("&#39", "'")
                                    hdfTipoFuente.Value = "FTP"
                                End If

                            End If

                            ddlTipoArchivo.SelectedValue = oFuenteArchivo.ElementAt(0).IdTipoArchivo
                            ddlTipoExtraccion.SelectedValue = oFuenteArchivo.ElementAt(0).TipoExtracion
                            hdfTipoTipoArchivo.Value = oFuenteArchivo.ElementAt(0).IdTipoArchivo.ToString()

                            chAcceso.Checked = oFuenteArchivo.ElementAt(0).Password

                            txtrutaBackup.Text = oFuenteArchivo.ElementAt(0).RutaBackup.ToString().Trim().Replace("&#39", "'")
                            hdfCodigoFuente.Value = oFuenteArchivo.ElementAt(0).IdConfigFuente
                            txtrutaerrores.Text = oFuenteArchivo.ElementAt(0).RutaErrores.ToString().Trim().Replace("&#39", "'")
                            txtrutalog.Text = oFuenteArchivo.ElementAt(0).RutaLog.ToString().Trim().Replace("&#39", "'")

                            chkFormato.Checked = oFuenteArchivo.ElementAt(0).FormatoFecha

                            chkHistorico.Checked = oFuenteArchivo.ElementAt(0).btHistorico

                            If oFuenteArchivo.ElementAt(0).FormatoFecha Then

                                txtnombreArchivo.Text = oFuenteArchivo.ElementAt(0).NombreArchivo.ToString().Trim().Replace("&#39", "'")
                                Dim nombre As String = oFuenteArchivo.ElementAt(0).NombreArchivo.ToString().Trim().Replace("&#39", "'")
                                Dim ext As String = nombre.Substring(nombre.LastIndexOf("."))

                                Dim res As String = nombre.Replace(ext, "")
                                nombre = res + "_" + DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2, "0") + DateTime.Now.Day.ToString() + ext

                                lblNomArchivoExp.InnerText = nombre
                                lblNomArchivoImp.InnerText = nombre
                            Else
                                txtnombreArchivo.Text = oFuenteArchivo.ElementAt(0).NombreArchivo.ToString().Trim().Replace("&#39", "'")
                                lblNomArchivoExp.InnerText = oFuenteArchivo.ElementAt(0).NombreArchivo.ToString().Trim().Replace("&#39", "'")
                                lblNomArchivoImp.InnerText = oFuenteArchivo.ElementAt(0).NombreArchivo.ToString().Trim().Replace("&#39", "'")
                            End If
                            
                            If oFuenteArchivo.ElementAt(0).btEst Then
                                chActivo.Checked = True
                                'hdfEstado.Value = 1
                                trEstado.Style("display") = "none"
                            Else
                                chActivo.Visible = True
                                chActivo.Checked = False
                                hdfEstado.Value = 0
                            End If
                            
                        Else
                            Dim script As String = ""
                            script += "alert('No se puede editar este registro porque es parte del Sistema');window.parent.tab.tabs('remove', window.parent.tab.tabs('option', 'selected'));"
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                        End If
                    Else

                        hdfCodigo.Value = ""
                        chActivo.Visible = False
                        chActivo.Checked = True
                        hdfEstado.Value = ""
                        trEstado.Style("display") = "none"
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoFuente IsNot Nothing Then
                TipoFuente.Dispose()
            End If
            If TipoArchivo IsNot Nothing Then
                TipoArchivo.Dispose()
            End If
            If FuenteArchivo IsNot Nothing Then
                FuenteArchivo.Dispose()
            End If
            If Config_TipoFuente IsNot Nothing Then
                Config_TipoFuente.Dispose()
            End If
            If TipoFuenteUNC IsNot Nothing Then
                TipoFuenteUNC.Dispose()
            End If
            If TipoFuenteFTP IsNot Nothing Then
                TipoFuenteFTP.Dispose()
            End If
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(pCod As String, _
                                   pNom As String, _
                                pIdConfig As Integer, _
        pTipoArchivo As String, _
        pTipoExtraccion As String, _
        pAcceso As Boolean, _
        pRutaBackup As String, _
        pNombreArchivo As String, _
        pIdConfigFuente As String, _
        pRutaErrores As String, _
        pRutaLog As String, _
        btVig As Integer, _
        pFormatoFec As Boolean, pHistorico As Boolean
        ) As String
        Dim FuenteArchivo As BL_PCS_IMP_FuenteArchivo = Nothing
        Try
            Dim eFuenteArchivo As New ENT_PCS_IMP_FuenteArchivo
            FuenteArchivo = New BL_PCS_IMP_FuenteArchivo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer

            Dim oFuenteArchivo As List(Of ENT_PCS_IMP_FuenteArchivo) = FuenteArchivo.Listar_x_Validar_Nombre(pNom)

            eFuenteArchivo.IdCliente = 0
            eFuenteArchivo.IdConfigTipoFuente = pIdConfig
            eFuenteArchivo.IdTipoArchivo = pTipoArchivo
            eFuenteArchivo.Nombre = pNom
            eFuenteArchivo.NombreArchivo = pNombreArchivo
            eFuenteArchivo.Password = pAcceso
            eFuenteArchivo.RutaBackup = pRutaBackup.Replace("&#92", "\")
            eFuenteArchivo.RutaErrores = pRutaErrores.Replace("&#92", "\")
            eFuenteArchivo.RutaLog = pRutaLog.Replace("&#92", "\")
            eFuenteArchivo.TipoExtracion = pTipoExtraccion
            eFuenteArchivo.btEst = Convert.ToBoolean(btVig)
            eFuenteArchivo.FormatoFecha = pFormatoFec
            eFuenteArchivo.btHistorico = pHistorico

            If pCod = "" Then
                If oFuenteArchivo.Count = 0 Then
                    resultado = FuenteArchivo.Insertar(eFuenteArchivo)
                Else
                    resultado = "2"
                End If

            Else
                If oFuenteArchivo.Count = 0 Or oFuenteArchivo.Count = 1 Then
                    eFuenteArchivo.IdFuente = Integer.Parse(pCod)
                    eFuenteArchivo.IdConfigFuente = Integer.Parse(pIdConfigFuente)
                    resultado = FuenteArchivo.Actualizar(eFuenteArchivo)
                Else
                    resultado = "2"
                End If
            End If

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FuenteArchivo IsNot Nothing Then
                FuenteArchivo.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Listar_TipoFuente_FTP(nombre As String, idCliente As String) As List(Of ENT_PCS_IMP_TipoFuenteFTP)
        Dim TipoFuente_FTP As BL_PCS_IMP_TipoFuenteFTP = Nothing

        Try
            TipoFuente_FTP = New BL_PCS_IMP_TipoFuenteFTP(idCliente)
            Return TipoFuente_FTP.Listar_x_Nombre(nombre)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoFuente_FTP IsNot Nothing Then
                TipoFuente_FTP.Dispose()
            End If
        End Try

    End Function

    <WebMethod()> _
    Public Shared Function Listar_TipoFuente_UNC(nombre As String, idCliente As String) As List(Of ENT_PCS_IMP_TipoFuenteUNC)
        Dim TipoFuente_UNC As BL_PCS_IMP_TipoFuenteUNC = Nothing

        Try
            TipoFuente_UNC = New BL_PCS_IMP_TipoFuenteUNC(idCliente)
            Return TipoFuente_UNC.Listar_x_Nombre(nombre)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoFuente_UNC IsNot Nothing Then
                TipoFuente_UNC.Dispose()
            End If
        End Try
    End Function
End Class
