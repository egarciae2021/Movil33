Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class General_Administrar_Mantenimiento_Mnt_Compania
    Inherits System.Web.UI.Page


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    'Dim Operador As BL_GEN_Operador = new BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)              
                    Dim vcCodCom As String = Request.QueryString("Cod")
                    If vcCodCom IsNot Nothing Then
                        vcCodCom = vcCodCom.Replace(",", "").Replace(".", "")
                        If IsNumeric(vcCodCom) Then
                            vcCodCom = Int(Val(vcCodCom))
                        End If
                    End If

                    'hdfCompania.Value = vcCodCue
               Dim Compania As VisualSoft.Suite80.BL.BL_ORG_Compania = New BL_ORG_Compania(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    If vcCodCom <> "" Then
                        Dim oSerializer As New JavaScriptSerializer
                        Dim oCompania As ENT_ORG_Compania = Compania.Mostrar(vcCodCom)
                        'If oCompania.COMP_P_vcCODCIA = vcCodCom Then
                        If oCompania.p_inCodOpe = vcCodCom Then
                            txtCodigo.Enabled = False
                            txtCodigo.Text = oCompania.COMP_P_vcCODCIA.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            txtNombre.Text = oCompania.COMP_vcNOMCIA.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            txtPrefijo.Text = oCompania.COMP_vcCODPRE.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            txtCambiarPrefijo.Text = oCompania.COMP_vcREEPRE.Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                            chkEstado.Checked = oCompania.COMP_btEST
                            If chkEstado.Checked Then
                                trEstado.Style("display") = "none"
                            Else
                                chkEstado.Enabled = True
                            End If

                            If (txtCodigo.Text = "0000000000") Then
                                txtCodigo.Enabled = False
                                txtNombre.Enabled = False
                                txtPrefijo.Enabled = False
                                txtCambiarPrefijo.Enabled = False
                                chkEstado.Enabled = False
                            End If

                            hdfCompania.Value = vcCodCom
                            txtNombre.Focus()
                        Else
                            'trEstado.Style("display") = "none"
                            hdfCompania.Value = "-1"
                        End If
                    Else
                        hdfCompania.Value = ""
                        trEstado.Style("display") = "none"
                        txtCodigo.Focus()
                    End If
                    Compania.Dispose()
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
   Public Shared Function Guardar(ByVal oCompania As String, ByVal vcCodCom As String) As Integer
      Try

         Dim Compania As BL_ORG_Compania = New BL_ORG_Compania(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oCompania As ENT_ORG_Compania = oSerializer.Deserialize(Of ENT_ORG_Compania)(oCompania)

         'vcCodCue.Replace("&#39", "'")
         'v_oCuenta.P_vcCod = v_oCuenta.P_vcCod.Replace("&#39", "'")
         'v_oCuenta.vcNom = v_oCuenta.vcNom.Replace("&#39", "'")
         'For Each oSubCuenta As ENT_MOV_SubCuenta In v_oCuenta.SubCuentas
         '    oSubCuenta.vcNom = oSubCuenta.vcNom.Replace("&#39", "'")
         '    oSubCuenta.vcDes = oSubCuenta.vcDes.Replace("&#39", "'")
         'Next
         Dim _return As Integer
         If vcCodCom = "" Then
            _return = Compania.Insertar(v_oCompania)
         Else
            Compania.Actualizar(v_oCompania)
            _return = 0
         End If
         Compania.Dispose()

         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   
End Class
