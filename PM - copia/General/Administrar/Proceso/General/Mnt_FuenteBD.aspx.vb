Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class General_Administrar_Proceso_General_Mnt_FuenteBD
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_General_Mnt_FuenteBD_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim FuenteBD As BL_PCS_IMP_FuenteBD = Nothing
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

                        FuenteBD = New BL_PCS_IMP_FuenteBD(oUsuario.IdCliente)
                        Dim eFuenteBD As New ENT_PCS_IMP_FuenteBD
                        eFuenteBD.IdFuente = codigo
                        Dim oFuenteBD As List(Of ENT_PCS_IMP_FuenteBD) = FuenteBD.Listar_x_Codigo(eFuenteBD)

                        txtNombreFuente.Text = oFuenteBD.ElementAt(0).Nombre.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        txtServidor.Text = oFuenteBD.ElementAt(0).Servidor.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        txtbasedatos.Text = oFuenteBD.ElementAt(0).BaseDatos.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        txtTabla.Text = oFuenteBD.ElementAt(0).Tabla.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        txtusuario.Text = oFuenteBD.ElementAt(0).Usuario.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        txtpassword.Text = oFuenteBD.ElementAt(0).Password.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        hdfConfigFuente.Value = oFuenteBD.ElementAt(0).IdConfigFuente
                        txtrutaerrores.Text = oFuenteBD.ElementAt(0).RutaErrores.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        txtrutalog.Text = oFuenteBD.ElementAt(0).RutaLog.ToString().Trim().Replace("&#39", "'").Replace("&#92", "\")
                        txtpassword.Attributes("Value") = txtpassword.Text
                        If oFuenteBD.Count <> 0 Then
                            chActivo.Visible = True
                            If oFuenteBD.ElementAt(0).btEst Then
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
                        chActivo.Visible = False
                        chActivo.Checked = True
                        hdfEstado.Value = "1"
                        trEstado.Style("display") = "none"
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If FuenteBD IsNot Nothing Then FuenteBD.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(pCod As String, _
                                   pNom As String, _
                                   pServ As String, _
                                   pBD As String, _
                                   pTabla As String, _
                                   pUsuario As String, _
                                   pPassword As String, _
                                   pConfigFuente As String, _
                                   pRutaErrores As String, _
                                   pRutaLog As String, _
                                   pbtVig As Integer) As String
        Dim FuenteBD As BL_PCS_IMP_FuenteBD = Nothing
        Try
            Dim eFuenteBD As New ENT_PCS_IMP_FuenteBD
            FuenteBD = New BL_PCS_IMP_FuenteBD(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer

            Dim oFuenteBD As List(Of ENT_PCS_IMP_FuenteBD) = FuenteBD.Listar_x_Valida_Nombre(pNom)

            eFuenteBD.Nombre = pNom
            eFuenteBD.BaseDatos = pBD
            eFuenteBD.IdCliente = 0
            eFuenteBD.Password = pPassword
            eFuenteBD.Servidor = pServ.Replace("&#92", "\")
            eFuenteBD.Tabla = pTabla
            eFuenteBD.Tipo = "FuenteBD"
            eFuenteBD.Usuario = pUsuario
            eFuenteBD.RutaLog = pRutaLog.Replace("&#92", "\")
            eFuenteBD.RutaErrores = pRutaErrores.Replace("&#92", "\")
            eFuenteBD.btEst = Convert.ToBoolean(pbtVig)

            If pCod = "" Then
                If oFuenteBD.Count = 0 Then
                    resultado = FuenteBD.Insertar(eFuenteBD)
                Else
                    resultado = "2"
                End If
            Else
                If oFuenteBD.Count = 0 Or oFuenteBD.Count = 1 Then
                    eFuenteBD.IdFuente = pCod
                    eFuenteBD.IdConfigFuente = pConfigFuente
                    resultado = FuenteBD.Actualizar(eFuenteBD)
                Else
                    resultado = "2"
                End If

            End If
            Return resultado
        Catch ex As Exception
            Return ex.Message
        Finally
            If FuenteBD IsNot Nothing Then FuenteBD.Dispose()
        End Try
    End Function
End Class
