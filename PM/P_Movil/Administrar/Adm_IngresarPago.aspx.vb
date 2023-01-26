Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_IngresarPago
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else

            'Obtiene controles dinámicos...
            GeneralMantenimiento.Instance.CrearControlesDinamicosMantenimiento("MOV_Pago", tbCamposDinamicos)

            If Not IsPostBack Then
               'If Request.Browser.Browser = "IE" And Request.Browser.Version = "7.0" Then
               '    Dim inCod2 As Integer = Integer.Parse(Request.QueryString("inCod"))
               'End If
               Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim Estado As BL_MOV_Estado = New BL_MOV_Estado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
               Dim OpcionSeguridad As BL_PRO_Opcion = New BL_PRO_Opcion(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oOpcionSeguridad As New ENT_PRO_Opcion
               Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))

               UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar("-1", "<Seleccionar un operador>"), "vcNomOpe", "P_inCodOpe")
               UtilitarioWeb.Dataddl(ddlOperadorBusqueda, Operador.Listar("-1", "<Todos>"), "vcNomOpe", "P_inCodOpe")
               Operador.Dispose()
               UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarEstadoPago("-1", "<Todos>"), "vcNom", "P_inCod")
               UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
               Estado.Dispose()

               Dim FormaPago As BL_MOV_Pago_Forma = New BL_MOV_Pago_Forma(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               UtilitarioWeb.Dataddl(ddlFormaPago, FormaPago.Listar_combo, "vcNomFormPag", "P_inCodFormPag")
               FormaPago.Dispose()
               oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod)
               OpcionSeguridad.Dispose()

               UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles)

               ibnAgregar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar
               'ibnEditar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar
               ibnEliminar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoEliminar

               txtFechaPeriodoI.Text = Now.AddDays(-Now.Day + 1).ToShortDateString
               txtFechaPeriodoF.Text = Now.ToShortDateString
               txtPeriodo.Text = DateTime.Now.Month.ToString("D2") & "/" & DateTime.Now.Year.ToString()

               If Not (UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar Or UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar) Then
                  btnGuardar.Style("display") = "none"
               End If

               dvEdicionPago.Visible = True
               dvEdicionPago.Style.Add("display", "")

               If UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar Then
                  hdfA.Value = "1"
               End If


               If Request.QueryString("idPago") IsNot Nothing AndAlso Request.QueryString("idPago") <> "" Then
                  'Editar..
                  Dim Pago As BL_MOV_Pago = New BL_MOV_Pago(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                  Dim oPago As New ENT_MOV_Pago
                  oPago.P_inCodPag = Val(Request.QueryString("idPago"))
                  oPago = Pago.Mostrar(oPago)

                  hdfCodPago.Value = oPago.P_inCodPag
                  hdfCuenta.Value = oPago.vc_CodCuenta

                  txtTotalPagar.Text = oPago.dcTotPag.ToString
                  ddlOperador.SelectedValue = oPago.Operador.P_inCodOpe
                  txtCuenta.Text = oPago.vcCta

                  lblPeriodoInicial.Text = oPago.dtPerIni
                  lblPeriodoFin.Text = oPago.dtPerFin
                  txtPeriodo.Text = oPago.dtPerIni.Month.ToString("D2") & "/" & oPago.dtPerIni.Year.ToString()

                  'nuevo
                  txtFechaPago.Text = oPago.dtFecPago
                  txtNumeroRecibo.Text = oPago.vcNumRecibo.Replace("&#39", "'")
                  ddlFormaPago.SelectedValue = oPago.Pago_Forma.P_inCodFormPag

                  Dim dtPago As DataTable = Pago.Mostrar(oPago.P_inCodPag)
                  Pago.Dispose()
                  'Obtiene Valores de Campos Dinamicos...
                  GeneralMantenimiento.Instance.ObtenerValoresControlesDinamicosMantenimiento("MOV_Pago", Me, dtPago)

               End If


            End If
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function Guardar(ByVal inCodPag As String, ByVal inCodOpe As String, _
                                   ByVal dtPerIni As String, ByVal dtPerFin As String, _
                                   ByVal dcTotPag As String, ByVal vcCodCta As String, _
                                   ByVal vcCamDim As String, ByVal dtFecPag As String, _
                                   ByVal vcNumRec As String, ByVal inCodFor As String) As Integer
      Dim Pago As BL_MOV_Pago = Nothing
      Try
         Pago = New BL_MOV_Pago(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oPago As New ENT_MOV_Pago
         Dim exito As Integer
         oPago.P_inCodPag = Integer.Parse(inCodPag)
         oPago.Operador.P_inCodOpe = Integer.Parse(inCodOpe)
         oPago.dtPerIni = Convert.ToDateTime(dtPerIni)
         oPago.dtPerFin = Convert.ToDateTime(dtPerFin)
         oPago.dcTotPag = Convert.ToDecimal(dcTotPag)
         oPago.vc_CodCuenta = Convert.ToString(vcCodCta)

         oPago.dtFecPago = Convert.ToDateTime(dtFecPag)
         oPago.vcNumRecibo = vcNumRec
         oPago.Pago_Forma.P_inCodFormPag = Integer.Parse(inCodFor)

         If oPago.P_inCodPag = "0" Then
            exito = Pago.Insertar(oPago, vcCamDim)
         Else
            Pago.Actualizar(oPago, vcCamDim)
            Return oPago.P_inCodPag
         End If
         Return exito
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Pago IsNot Nothing Then Pago.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarPago(ByVal vcCod As String, ByVal inCodOpe As String, ByVal dtPerIni As String, ByVal dtPerFin As String, ByVal inCodEst As String) As List(Of Object)
      Dim Pago As BL_MOV_Pago = Nothing
      Try
         Pago = New BL_MOV_Pago(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oPago As New ENT_MOV_Pago

         oPago.vcCodPag = vcCod.Replace("&#39", "'")
         oPago.Operador.P_inCodOpe = Integer.Parse(inCodOpe)

         If dtPerIni <> "" Then
            oPago.dtPerIni = Convert.ToDateTime(dtPerIni)
         Else
            oPago.dtPerIni = Convert.ToDateTime("01/01/1970")
         End If

         If dtPerFin <> "" Then
            oPago.dtPerFin = Convert.ToDateTime(dtPerFin)
         Else
            oPago.dtPerFin = Convert.ToDateTime("01/01/1970")
         End If

         oPago.Estado.P_inCod = Integer.Parse(inCodEst)

         Dim lstPago As List(Of ENT_MOV_Pago) = Pago.Listar(oPago)
         Dim lstObj As New List(Of Object)

         For Each objPago As ENT_MOV_Pago In lstPago

            Dim dict As New Dictionary(Of String, Object)
            dict.Add("P_inCodPag", objPago.P_inCodPag)
            dict.Add("vcCodPag", objPago.vcCodPag)
            dict.Add("P_inCodOpe", objPago.Operador.P_inCodOpe)
            dict.Add("vcNomOpe", objPago.Operador.vcNomOpe)
            dict.Add("dtPerIni", objPago.dtPerIni)
            dict.Add("dtPerFin", objPago.dtPerFin)
            dict.Add("vcPerFac", objPago.vcPerFac)
            dict.Add("vcNom", objPago.Estado.vcNom)
            dict.Add("dcTotPag", objPago.dcTotPag)
            dict.Add("vcCta", objPago.vcCta)
            dict.Add("vcCodCta", objPago.vc_CodCuenta)
            lstObj.Add(dict)
         Next

         Return lstObj

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Pago IsNot Nothing Then
            Pago.Dispose()
         End If
      End Try
   End Function

   <WebMethod()>
   Public Shared Function Anular(ByVal inCodPag As String) As String
      Dim Pago As BL_MOV_Pago = Nothing
      Try
         Pago = New BL_MOV_Pago(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Pago.Anular(Integer.Parse(inCodPag))
         Return ""
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Pago IsNot Nothing Then Pago.Dispose()
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ObtenerCuenta(ByVal vcCodCue As String) As ENT_MOV_Cuenta
      Try
         Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
         Dim oCuenta As ENT_MOV_Cuenta = Cuenta.Mostrar(vcCodCue, oCultura)
         Cuenta.Dispose()
         Return oCuenta
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function
End Class


