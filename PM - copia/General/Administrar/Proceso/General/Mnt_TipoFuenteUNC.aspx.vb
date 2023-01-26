Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class General_Administrar_Proceso_General_Mnt_TipoFuenteUNC
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_General_Mnt_TipoFuenteUNC_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim TipoFuenteUNC As BL_PCS_IMP_TipoFuenteUNC = Nothing

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

                        TipoFuenteUNC = New BL_PCS_IMP_TipoFuenteUNC(oUsuario.IdCliente)
                        Dim eTipoFuenteUNC As New ENT_PCS_IMP_TipoFuenteUNC
                        eTipoFuenteUNC.IdFuente = codigo
                        Dim oTipoFuenteUNC As List(Of ENT_PCS_IMP_TipoFuenteUNC) = TipoFuenteUNC.Listar_x_Codigo(eTipoFuenteUNC)

                        If oTipoFuenteUNC.Count <> 0 Then
                            txtNombreFuente.Text = oTipoFuenteUNC.ElementAt(0).Nombre.ToString().Trim().Replace("&#39", "'")
                            txtservidor.Text = oTipoFuenteUNC.ElementAt(0).Servidor.ToString().Trim().Replace("&#39", "'")
                            txtruta.Text = oTipoFuenteUNC.ElementAt(0).Ruta.ToString().Trim().Replace("&#39", "'")
                            txtusuario.Text = oTipoFuenteUNC.ElementAt(0).Usuario.ToString().Trim().Replace("&#39", "'")
                            txtpassword.Text = oTipoFuenteUNC.ElementAt(0).Password.ToString().Trim().Replace("&#39", "'")
                            txtpassword.Attributes("Value") = txtpassword.Text
                            chActivo.Visible = True
                            If oTipoFuenteUNC.ElementAt(0).btEst Then
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
            If TipoFuenteUNC IsNot Nothing Then TipoFuenteUNC.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(pCod As String, _
                                   pNom As String, _
                                   pServ As String, _
                                   pRuta As String, _
                                   pUsuario As String, _
                                   pPassword As String,
                                   btVig As Integer) As String
        Dim TipoFuenteUNC As BL_PCS_IMP_TipoFuenteUNC = Nothing
        Try
            Dim eTipoFuenteUNC As New ENT_PCS_IMP_TipoFuenteUNC
            TipoFuenteUNC = New BL_PCS_IMP_TipoFuenteUNC(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer

            Dim oTipoFuenteUNC As List(Of ENT_PCS_IMP_TipoFuenteUNC) = TipoFuenteUNC.Listar_x_Validar_Nombre(pNom)

            eTipoFuenteUNC.Nombre = pNom
            eTipoFuenteUNC.IdCliente = 0
            eTipoFuenteUNC.Password = pPassword
            eTipoFuenteUNC.Ruta = pRuta
            eTipoFuenteUNC.Servidor = pServ
            eTipoFuenteUNC.Tipo = "TipoFuenteUNC"
            eTipoFuenteUNC.Usuario = pUsuario
            eTipoFuenteUNC.btEst = Convert.ToBoolean(btVig)

            If pCod = "" Then
                If oTipoFuenteUNC.Count = 0 Then
                    resultado = TipoFuenteUNC.Insertar(eTipoFuenteUNC)
                Else
                    resultado = "2"
                End If

            Else
                If oTipoFuenteUNC.Count = 0 Or oTipoFuenteUNC.Count = 1 Then
                    eTipoFuenteUNC.IdFuente = pCod
                    resultado = TipoFuenteUNC.Actualizar(eTipoFuenteUNC)
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
            If TipoFuenteUNC IsNot Nothing Then TipoFuenteUNC.Dispose()
        End Try
    End Function

End Class
