Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Configurar_Conf_AgregarGrupo_PolSeg
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not Page.IsPostBack Then
                    oUsuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    Dim inCodPol As String = Request.QueryString("inCodPol")
                    Dim inCodGru As String = Request.QueryString("inCodGru")
                    Dim inVal As String = Request.QueryString("vcVal")
                    Dim vcNomGru As String = Request.QueryString("vcNomGru")
                    Dim vcOpcion As String = Request.QueryString("vcOpcion")
                    hdfOpcion.Value = vcOpcion
                    Dim Grupo As BL_GEN_Grupo = New BL_GEN_Grupo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstGrupo As List(Of ENT_GEN_Grupo)
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    lstGrupo = Grupo.ListarGruposCampanaSinPolitica()
                    trValor.Style("display") = "none"
                    If hdfOpcion.Value.ToString() = "1" Then
                    Else
                        lstGrupo = Grupo.ListarSinPolitica(inCodPol, Integer.Parse(hdfCodLinTip_X_User.Value))
                    End If
                    trValor.Style("display") = ""

                    Grupo.Dispose()
                    UtilitarioWeb.Dataddl(ddlGrupo, lstGrupo, "vcNom", "P_inCod")

                    hdfPolitica.Value = inCodPol
                    hdfGrupo.Value = inCodGru

                    If inCodPol = "1" Then
                        lblValor.Text = "Unidades"
                    ElseIf inCodPol = "2" Then
                        lblValor.Text = "Meses"
                    End If

                    If inCodGru = "" Then
                        'ddlGrupo.Style("display") = ""
                        'lblGrupo.Style("display") = "none"
                        'lblGrupo.Text = ""
                    Else
                        'agregado 02-09-2013
                        ddlGrupo.Items.Insert(0, New ListItem(vcNomGru, inCodGru))
                        ddlGrupo.Enabled = False
                        ddlGrupo.SelectedIndex = 0

                        If inVal = "Ilimitado" Then
                            chkIlimitado.Checked = True
                            trValor.Style("display") = "none"
                        Else
                            trValor.Style("display") = ""
                            txtValor.Text = inVal
                        End If

                        ddlGrupo.Style("display") = "none"
                        lblGrupo.Style("display") = ""
                        lblGrupo.Text = vcNomGru
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

   <WebMethod()>
   Public Shared Function Guardar(ByVal P_inCodPol As String, ByVal P_inCodGru As String, ByVal inTip As String, ByVal vcVal As String) As String
      Dim Politica As BL_MOV_Politica = Nothing
      Try
         Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oGrupo As New ENT_GEN_Grupo
         oGrupo.P_inCod = P_inCodGru
         oGrupo.PoliticaSolicitud.P_inCod = P_inCodPol
         oGrupo.PoliticaSolicitud.vcVal = vcVal
         If inTip = "1" Then
            Politica.GuardarPoliticaGrupo(oGrupo)
         Else
            Politica.GuardarValorGrupo(oGrupo)
         End If
         Return ""
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Politica IsNot Nothing Then Politica.Dispose()
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