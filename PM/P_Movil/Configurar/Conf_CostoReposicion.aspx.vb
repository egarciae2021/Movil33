Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

'jherrera 20130424 Se creo nueva pagina para la actualizacion de costo de reposición
'-----------------------------------------------------------------------------------

Partial Class P_Movil_Configurar_Conf_CostoReposicion
   Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Campo As BL_ENT_Campo = Nothing
        Dim Parametros As BL_MOV_Parametros = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                    hdfParametro.Value = 1

                    Campo = New BL_ENT_Campo(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstParaForm As List(Of ENT_ENT_Campo) = Campo.ListarParaFormula(True, -1, "<Seleccionar>")

                    Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(0, "")
                    Operador.Dispose()
                    UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")
                    ddlOperador.Items.Insert(0, New ListItem("General", ""))
                    'ddlOperador.Items.Insert(0, New ListItem("-Seleccione-", "-1"))


                    UtilitarioWeb.Dataddl(ddlParametro1, lstParaForm, "vcDes", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlParametro2, lstParaForm, "vcDes", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlParametro3, lstParaForm, "vcDes", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlParametro4, lstParaForm, "vcDes", "P_inCod")
                    UtilitarioWeb.Dataddl(ddlParametro5, lstParaForm, "vcDes", "P_inCod")
                    ddlParametro1.Items.Insert(ddlParametro1.Items.Count, New ListItem("Fecha Actual (Fecha y hora)", "GETDATE()"))
                    ddlParametro2.Items.Insert(ddlParametro2.Items.Count, New ListItem("Fecha Actual (Fecha y hora)", "GETDATE()"))
                    ddlParametro3.Items.Insert(ddlParametro3.Items.Count, New ListItem("Fecha Actual (Fecha y hora)", "GETDATE()"))
                    ddlParametro4.Items.Insert(ddlParametro4.Items.Count, New ListItem("Fecha Actual (Fecha y hora)", "GETDATE()"))
                    ddlParametro5.Items.Insert(ddlParametro5.Items.Count, New ListItem("Fecha Actual (Fecha y hora)", "GETDATE()"))

                    Parametros = New BL_MOV_Parametros(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oParametros As DataSet = Parametros.Mostrar(hdfParametro.Value)
                    Dim dtParametros As DataSet = Parametros.MostrarGrupo("F2")

                    For i As Integer = 0 To dtParametros.Tables(0).Rows.Count - 1
                        Select Case (i)
                            Case 0
                                ddlParametro1.SelectedValue = dtParametros.Tables(0).Rows(i)("Valor")
                            Case 1
                                ddlParametro2.SelectedValue = dtParametros.Tables(0).Rows(i)("Valor")
                            Case 2
                                ddlParametro3.SelectedValue = dtParametros.Tables(0).Rows(i)("Valor")
                            Case 3
                                ddlParametro4.SelectedValue = dtParametros.Tables(0).Rows(i)("Valor")
                            Case 4
                                ddlParametro5.SelectedValue = dtParametros.Tables(0).Rows(i)("Valor")
                        End Select
                    Next
                    txtFormula.Text = UtilitarioWeb.ComprobarStringNULL(oParametros.Tables(0).Rows(0)("Valor"), "")

                    hdfFormulaInicial.Value = UtilitarioWeb.ComprobarStringNULL(oParametros.Tables(0).Rows(0)("Valor"), "")
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
                End If
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
            If Campo IsNot Nothing Then Campo.Dispose()
            If Parametros IsNot Nothing Then Parametros.Dispose()
        End Try
    End Sub

   <WebMethod()>
   Public Shared Function Guardar(ByVal oParametro As String, ByVal strParametroA As String, ByVal strParametroB As String,
                                   ByVal strParametroC As String, ByVal strParametroD As String, ByVal strParametroE As String) As Integer
      Dim Parametros As BL_MOV_Parametros = Nothing
      Try
         Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oParametros As ENT_MOV_Parametros = oSerializer.Deserialize(Of ENT_MOV_Parametros)(oParametro)

         v_oParametros.IdParametro = v_oParametros.IdParametro
         v_oParametros.Valor = v_oParametros.Valor.Trim().Replace("&#39", "'")

         Dim objParametroA As New ENT_MOV_Parametros()
         Dim objParametroB As New ENT_MOV_Parametros()
         Dim objParametroC As New ENT_MOV_Parametros()
         Dim objParametroD As New ENT_MOV_Parametros()
         Dim objParametroE As New ENT_MOV_Parametros()

         Dim dtParametrosx As DataSet = Parametros.MostrarGrupo("F2")
         Dim dvParametros As DataView = dtParametrosx.Tables(0).DefaultView
         dvParametros.RowFilter = " Grupo = 'F2' "
         Dim dtParametros As DataSet = New DataSet()
         dtParametros.Tables.Add(dvParametros.ToTable())

         For i As Integer = 0 To dtParametros.Tables(0).Rows.Count
            Select Case (i)
               Case 0
                  objParametroA.IdParametro = dtParametros.Tables(0).Rows(i)("IdParametro")
                  objParametroA.Clave = dtParametros.Tables(0).Rows(i)("Clave")
                  objParametroA.Valor = strParametroA
                  objParametroA.Grupo = dtParametros.Tables(0).Rows(i)("Grupo")
               Case 1
                  objParametroB.IdParametro = dtParametros.Tables(0).Rows(i)("IdParametro")
                  objParametroB.Clave = dtParametros.Tables(0).Rows(i)("Clave")
                  objParametroB.Valor = strParametroB
                  objParametroB.Grupo = dtParametros.Tables(0).Rows(i)("Grupo")
               Case 2
                  objParametroC.IdParametro = dtParametros.Tables(0).Rows(i)("IdParametro")
                  objParametroC.Clave = dtParametros.Tables(0).Rows(i)("Clave")
                  objParametroC.Valor = strParametroC
                  objParametroC.Grupo = dtParametros.Tables(0).Rows(i)("Grupo")
               Case 3
                  objParametroD.IdParametro = dtParametros.Tables(0).Rows(i)("IdParametro")
                  objParametroD.Clave = dtParametros.Tables(0).Rows(i)("Clave")
                  objParametroD.Valor = strParametroD
                  objParametroD.Grupo = dtParametros.Tables(0).Rows(i)("Grupo")
               Case 4
                  objParametroE.IdParametro = dtParametros.Tables(0).Rows(i)("IdParametro")
                  objParametroE.Clave = dtParametros.Tables(0).Rows(i)("Clave")
                  objParametroE.Valor = strParametroE
                  objParametroE.Grupo = dtParametros.Tables(0).Rows(i)("Grupo")
            End Select
         Next

         Parametros.Actualizar(v_oParametros, objParametroA, objParametroB, objParametroC, objParametroD, objParametroE)
         Return 0

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Parametros IsNot Nothing Then Parametros.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function CargarParametros_Operador(ByVal vcCodOpe As String) As List(Of ENT_MOV_Parametros)
      Dim resultado As String = String.Empty
      Dim Parametros As BL_MOV_Parametros = Nothing
      Try
         Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.MostrarParametrosOperador(vcCodOpe)

         Return lstParametros
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Parametros IsNot Nothing Then Parametros.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function GuardarParametros_Operador(ByVal esAdd As Boolean, ByVal vcCodOpe As String, ByVal valorFunc As String, _
                                                      ByVal valorA As String, ByVal valorB As String, ByVal valorC As String, ByVal valorD As String, _
                                                      ByVal valorE As String) As Integer
      Dim resultado As Integer = 0
      Dim Parametros As BL_MOV_Parametros = Nothing
      Try
         Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         If esAdd Then
            resultado = Parametros.InsertarParametrosOperador(vcCodOpe, valorFunc, valorA, valorB, valorC, valorD, valorE)
         Else
            resultado = Parametros.ActualizarParametrosOperador(vcCodOpe, valorFunc, valorA, valorB, valorC, valorD, valorE)
         End If

         Return resultado
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Parametros IsNot Nothing Then Parametros.Dispose()
      End Try
   End Function
End Class
'-----------------------------------------------------------------------------------
