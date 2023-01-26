Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class General_Administrar_Proceso_General_Mnt_TipoFuenteFTP
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_General_Mnt_TipoFuenteFTP_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim TipoFuenteFTP As BL_PCS_IMP_TipoFuenteFTP = Nothing
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

                        TipoFuenteFTP = New BL_PCS_IMP_TipoFuenteFTP(oUsuario.IdCliente)
                        Dim eTipoFuenteFTP As New ENT_PCS_IMP_TipoFuenteFTP
                        eTipoFuenteFTP.IdFuente = codigo
                        Dim oTipoFuenteFTP As List(Of ENT_PCS_IMP_TipoFuenteFTP) = TipoFuenteFTP.Listar_x_Codigo(eTipoFuenteFTP)

                        If oTipoFuenteFTP.Count <> 0 Then
                            txtnombrefuente.Text = oTipoFuenteFTP.ElementAt(0).Nombre.ToString().Trim().Replace("&#39", "'")
                            txtServidor.Text = oTipoFuenteFTP.ElementAt(0).Servidor.ToString().Trim().Replace("&#39", "'")
                            txtruta.Text = oTipoFuenteFTP.ElementAt(0).Ruta.ToString().Trim().Replace("&#39", "'")
                            txtproxy.Text = oTipoFuenteFTP.ElementAt(0).Proxy.ToString().Trim().Replace("&#39", "'")
                            txtusuario.Text = oTipoFuenteFTP.ElementAt(0).Usuario.ToString().Trim().Replace("&#39", "'")
                            txtpassword.Text = oTipoFuenteFTP.ElementAt(0).Password.ToString().Trim().Replace("&#39", "'")
                            txtpassword.Attributes("Value") = txtpassword.Text
                            chActivo.Visible = True
                            If oTipoFuenteFTP.ElementAt(0).btEst Then
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
            If TipoFuenteFTP IsNot Nothing Then TipoFuenteFTP.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(pCod As String, _
                                   pNom As String, _
                                   pServ As String, _
                                   pRuta As String, _
                                pProxy As String, _
                                   pUsuario As String, _
                                   pPassword As String, _
                                   btVig As Integer) As String
        Dim TipoFuenteFTP As BL_PCS_IMP_TipoFuenteFTP = Nothing
        Try
            Dim eTipoFuenteFTP As New ENT_PCS_IMP_TipoFuenteFTP
            TipoFuenteFTP = New BL_PCS_IMP_TipoFuenteFTP(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer

            Dim oTipoFuenteFTP As List(Of ENT_PCS_IMP_TipoFuenteFTP) = TipoFuenteFTP.Listar_x_Validar_Nombre(pNom)

            eTipoFuenteFTP.Nombre = pNom
            eTipoFuenteFTP.IdCliente = 0
            eTipoFuenteFTP.Password = pPassword
            eTipoFuenteFTP.Proxy = pProxy
            eTipoFuenteFTP.Ruta = pRuta
            eTipoFuenteFTP.Servidor = pServ
            eTipoFuenteFTP.Tipo = "TipoFuenteFTP"
            eTipoFuenteFTP.Usuario = pUsuario
            eTipoFuenteFTP.btEst = Convert.ToBoolean(btVig)

            If pCod = "" Then
                If oTipoFuenteFTP.Count = 0 Then
                    resultado = TipoFuenteFTP.Insertar(eTipoFuenteFTP)
                Else
                    resultado = "2"
                End If

            Else
                If oTipoFuenteFTP.Count = 0 Or oTipoFuenteFTP.Count = 1 Then
                    eTipoFuenteFTP.IdFuente = pCod
                    resultado = TipoFuenteFTP.Actualizar(eTipoFuenteFTP)
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
            If TipoFuenteFTP IsNot Nothing Then TipoFuenteFTP.Dispose()
        End Try
    End Function

End Class
