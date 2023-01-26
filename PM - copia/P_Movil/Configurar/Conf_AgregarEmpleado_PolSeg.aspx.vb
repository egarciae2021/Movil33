Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Configurar_Conf_AgregarEmpleado_PolSeg
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not Page.IsPostBack Then
               Dim inCodPol As String = Request.QueryString("inCodPol")
               Dim inCodGru As String = Request.QueryString("inCodGru")
               Dim inVal As String = Request.QueryString("vcVal")
               Dim inCodEmp As String = Request.QueryString("inCodEmp")
               Dim vcNomGru As String = Request.QueryString("vcNomGru")
               Dim vcNomEmp As String = Request.QueryString("vcNomEmp")
               'Dim Empleado As BL_GEN_Empleado = new BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim lstEmpleado As New List(Of ENT_GEN_Empleado)

               'lstEmpleado = Empleado.ListarxGrupoSinPolitica(Integer.Parse(inCodPol), Integer.Parse(inCodGru), "-1", "<Seleccionar>")

               hdfPolitica.Value = inCodPol
               hdfGrupo.Value = inCodGru
               If inCodEmp.Length > 1 Then
                  hdfEmpleado.Value = inCodEmp.Substring(0, inCodEmp.Length - 1)
               End If
               If vcNomEmp.Length > 1 Then
                  hdfNomEmp.Value = vcNomEmp.Substring(0, vcNomEmp.Length - 1)
               End If
               If inVal.Length > 1 Then
                  inVal = inVal.Substring(0, inVal.Length - 1)
               End If

               'lblGrupo.Text = vcNomGru

               If inCodPol = "1" Then
                  lblValor.Text = "Unidades"
                  lblEtiq.Text = "Empleados"
               ElseIf inCodPol = "2" Then
                  lblValor.Text = "Meses"
                  lblEtiq.Text = "Empleados"
               End If

               If inCodEmp = "" Then
                  txtValor.Text = ""
                  lblEtiq.Style("display") = "none"
                  '    If lstEmpleado.Count = 1 Then
                  '        hdfTipEmp.Value = "1"
                  '    ElseIf lstEmpleadoz.Count <= 100 Then
                  '        UtilitarioWeb.Dataddl(ddlEmpleado, lstEmpleado, "vcNom", "P_vcCod")
                  '        ddlEmpleado.Style("display") = ""
                  '        txtEmpleado.Style("display") = "none"
                  '        hdfTipEmp.Value = "2"
                  '    Else
                  '        ddlEmpleado.Style("display") = "none"
                  '        txtEmpleado.Style("display") = "none"
                  '        hdfTipEmp.Value = "3"
                  '    End If
                  '    lblEmpleado.Style("display") = "none"
               Else
                  Dim Valores As String()
                  Valores = inVal.Split(",")
                  Dim valIguales As Boolean = True
                  For i As Integer = 0 To Valores.Length - 1
                     If Valores(0) <> Valores(i) Then
                        txtValor.Text = ""
                        lblMensaje.Text = "Existen valores diferentes en los empleados seleccionados."
                        valIguales = False
                        Exit For
                     End If
                  Next
                  If (valIguales = True) Then
                     If Valores(0) = "Ilimitado" Then
                        chkIlimitado.Checked = True
                        trValor.Style("display") = "none"
                        'btnEmpleado.Style("display") = "none"
                     Else
                        trValor.Style("display") = ""
                        If Valores.Length > 0 Then
                           txtValor.Text = Valores(0)
                        End If
                     End If
                  End If
                  '    ddlEmpleado.Style("display") = "none"
                  '    txtEmpleado.Style("display") = "none"
                  '    lblEmpleado.Style("display") = ""
                  '    lblEmpleado.Text = vcNomEmp
                  btnEmpleado.Style("display") = "none"
                  lblEtiq.Style("display") = "block"
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
   Public Shared Function Guardar(ByVal inCodPol As String, ByVal vcCodEmp As String, ByVal inTip As String, ByVal vcVal As String,
                                   ByVal XMLEmp As String) As String
      Dim MOV_Politica As BL_MOV_Politica = Nothing
      Try
         MOV_Politica = New BL_MOV_Politica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oEmpleado As New ENT_GEN_Empleado

         Dim strEmpleado As String = ""
         Dim Empleados As String()
         Empleados = vcCodEmp.Split(",")
         For i As Integer = 0 To Empleados.Length - 1
            If Empleados(i).Trim <> "" Then
               strEmpleado = strEmpleado + "'" + Empleados(i) + "',"
            End If
         Next
         strEmpleado = strEmpleado.Substring(0, strEmpleado.Length - 1)

         MOV_Politica.GuardarPoliticaEmpleado(Convert.ToInt32(inCodPol), strEmpleado, XMLEmp)

         'oEmpleado.PoliticaSolicitud.P_inCod = inCodPol
         'oEmpleado.P_vcCod = vcCodEmp
         'oEmpleado.PoliticaSolicitud.vcVal = vcVal

         'If inTip = 1 Then
         '    MOV_Politica.GuardarPoliticaEmpleado(oEmpleado)
         'Else
         '    MOV_Politica.GuardarValorEmpleado(oEmpleado)
         'End If
         Return ""
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Not IsNothing(MOV_Politica) Then MOV_Politica.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarEmpleado(ByVal maxFilas As String, ByVal vcNomEmp As String, ByVal incodGrup As String, ByVal incodPol As String) As List(Of ENT_GEN_Empleado)
      Dim Empleado As BL_GEN_Empleado = Nothing

      Try
         Empleado = New BL_GEN_Empleado(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of ENT_GEN_Empleado) = Empleado.ListarPorNombrePorGrupoSinPolitica(vcNomEmp, Integer.Parse(incodGrup), Integer.Parse(maxFilas), Integer.Parse(incodPol))
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Empleado IsNot Nothing Then Empleado.Dispose()
      End Try
   End Function
End Class
