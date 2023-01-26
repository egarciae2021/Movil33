Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Net.Mail
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_IngresarFactura
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               'IGV desde tabla CULTURA
               Dim GEN_Cultura As BL_GEN_Cultura = New BL_GEN_Cultura(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim GEN_Region As BL_GEN_Regi = New BL_GEN_Regi(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oCultura As ENT_GEN_Cultura = GEN_Cultura.MostrarPorPais(Val(GEN_Region.Listar().REGI_F_vcCODPAI))
               GEN_Region.Dispose()
               GEN_Cultura.Dispose()

               hdfIGV.Value = oCultura.dcIGV
               'IGV Fin
               Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim ConceptoMovil As BL_MOV_ConceptoMovil = New BL_MOV_ConceptoMovil(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               'Dim Grupo As BL_GEN_Grupo = New BL_GEN_Grupo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim Estado As BL_MOV_Estado = New BL_MOV_Estado(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim lstConceptoMovil As DataTable = ConceptoMovil.Listar("-1", "Consumo")
               ConceptoMovil.Dispose()
               Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
               Dim OpcionSeguridad As BL_PRO_Opcion = New BL_PRO_Opcion(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oOpcionSeguridad As New ENT_PRO_Opcion
               Dim inCod As Integer = Integer.Parse(Request.QueryString("inCod"))

               txtFechaFacturacion.Text = DateTime.Now.ToShortDateString()
               txtDescripcion.Text = lstConceptoMovil.Rows(0)("vcNom")
               txtMonto.Text = "0.00"
               txtCantidad.Text = "1"

               txtFechaCreacionI.Text = Now.AddDays(-Now.Day + 1).ToShortDateString
               txtFechaCreacionF.Text = Now.ToShortDateString
               txtFechaPeriodoI.Text = Now.AddDays(-Now.Day + 1).ToShortDateString
               txtFechaPeriodoF.Text = Now.ToShortDateString

               'Traer estos parametros de la base de datos
               'hdfIGV.Value = "19"
               hdfMonedaLiteral.Value = "Nuevos soles"
               hdfMonedaSimbolo.Value = "S/."

               UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar("-1", "<Seleccionar un operador>"), "vcNomOpe", "P_inCodOpe")
               UtilitarioWeb.Dataddl(ddlOperadorBusqueda, Operador.Listar("-1", "<Todos>"), "vcNomOpe", "P_inCodOpe")
               Operador.Dispose()
               UtilitarioWeb.Dataddl(ddlConceptoMovil, lstConceptoMovil, "vcNom", "P_inCod")
               UtilitarioWeb.Dataddl(ddlEstado, Estado.ListarEstadoFactura("-1", "<Todos>"), "vcNom", "P_inCod")

               Estado.Dispose()

               oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod)
               OpcionSeguridad.Dispose()

               UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles)

               ibnAgregar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar
               'ibnEditar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar
               ibnEliminar.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoEliminar

               ibnEnviarCorreo.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar
               ibnImprimir.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar
               ibnVistaPrevia.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar
               pbnAvanzada.Visible = UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar

               dvEdicionFactura.Visible = True
               dvEdicionFactura.Style.Add("display", "")

               If Not (UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoInsertar Or UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar) Then
                  btnGuardar.Style("display") = "none"
               End If

               If UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoActualizar Then
                  hdfA.Value = "1"
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
   Public Shared Function Guardar(ByVal inCodFac As String, ByVal inCodOpe As String, ByVal dtFecFac As String, ByVal dcSubTot As String,
                                   ByVal dcIGV As String, ByVal dcImp As String, ByVal dcTot As String, ByVal inCodMon As String, ByVal dcTipCam As String,
                                   ByVal vcFacDet As String, ByVal vcEmp As String, ByVal btOpcFre As String) As ENT_MOV_Factura
      Try
         Dim Factura As BL_MOV_Factura = New BL_MOV_Factura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oFactura As New ENT_MOV_Factura
         Dim inCodUsu As Integer

         oFactura.P_inCodFac = Integer.Parse(inCodFac)
         oFactura.Operador.P_inCodOpe = Integer.Parse(inCodOpe)
         oFactura.dtFecFac = Convert.ToDateTime(dtFecFac)
         oFactura.dcSubTotal = Convert.ToDecimal(dcSubTot)
         oFactura.dcIGV = Convert.ToDecimal(dcIGV)
         oFactura.dcImp = Convert.ToDecimal(dcImp)
         oFactura.dcMonTot = Convert.ToDecimal(dcTot)
         oFactura.dcTipCam = Convert.ToDecimal(dcTipCam)
         oFactura.Moneda.P_inCodMon = Integer.Parse(inCodMon)
         inCodUsu = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod
         Dim _return As ENT_MOV_Factura
         If oFactura.P_inCodFac = 0 Then
            _return = Factura.Insertar(oFactura, vcFacDet, vcEmp, btOpcFre, inCodUsu)
         Else
            _return = Factura.Actualizar(oFactura, vcFacDet, vcEmp, btOpcFre, inCodUsu)
         End If
         Factura.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function MostrarConceptoMovil(ByVal inCodConMov As String) As ENT_MOV_ConceptoMovil
      Try
         Dim ConceptoMovil As BL_MOV_ConceptoMovil = New BL_MOV_ConceptoMovil(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As ENT_MOV_ConceptoMovil = ConceptoMovil.Mostrar(Integer.Parse(inCodConMov))
         ConceptoMovil.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarFactura(ByVal vcCodFac As String, ByVal inCodOpe As String, ByVal dtFacIni As String, ByVal dtFacFin As String, ByVal dtCreIni As String, ByVal dtCreFin As String, ByVal vcNomEmp As String, ByVal inCodEst As String) As List(Of ENT_MOV_Factura)
      Try
         Dim Factura As BL_MOV_Factura = New BL_MOV_Factura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oFactura As New ENT_MOV_Factura

         oFactura.vcCodFac = vcCodFac.Replace("&#39", "'")
         oFactura.Operador.P_inCodOpe = Integer.Parse(inCodOpe)

         If dtFacIni <> "" Then
            oFactura.dtFecFacIni = Convert.ToDateTime(dtFacIni)
         Else
            oFactura.dtFecFacIni = Convert.ToDateTime("01/01/1970")
         End If

         If dtFacFin <> "" Then
            oFactura.dtFecFacFin = Convert.ToDateTime(dtFacFin)
         Else
            oFactura.dtFecFacFin = Convert.ToDateTime("01/01/1970")
         End If

         If dtCreIni <> "" Then
            oFactura.dtFecGenFacIni = Convert.ToDateTime(dtCreIni)
         Else
            oFactura.dtFecGenFacIni = Convert.ToDateTime("01/01/1970")
         End If

         If dtCreFin <> "" Then
            oFactura.dtFecGenFacFin = Convert.ToDateTime(dtCreFin)
         Else
            oFactura.dtFecGenFacFin = Convert.ToDateTime("01/01/1970")
         End If

         oFactura.vcNomEmp = vcNomEmp.Replace("&#39", "'")

         oFactura.Estado.P_inCod = Integer.Parse(inCodEst)

         Dim _return As List(Of ENT_MOV_Factura) = Factura.Listar(oFactura)
         Factura.Dispose()

         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarOperacionFrecuente(ByVal vcCodFac As String, ByVal inCodOpe As String, ByVal dtFacIni As String, ByVal dtFacFin As String, ByVal dtCreIni As String, ByVal dtCreFin As String, ByVal vcNomEmp As String, ByVal inCodEst As String) As List(Of ENT_MOV_Factura)
      Try
         Dim FacturaOperacionFrecuente As BL_MOV_FacturaOperacionFrecuente = New BL_MOV_FacturaOperacionFrecuente(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oFactura As New ENT_MOV_Factura

         oFactura.vcCodFac = vcCodFac.Replace("&#39", "'")
         oFactura.Operador.P_inCodOpe = Integer.Parse(inCodOpe)

         If dtFacIni <> "" Then
            oFactura.dtFecFacIni = Convert.ToDateTime(dtFacIni)
         Else
            oFactura.dtFecFacIni = Convert.ToDateTime("01/01/1970")
         End If

         If dtFacFin <> "" Then
            oFactura.dtFecFacFin = Convert.ToDateTime(dtFacFin)
         Else
            oFactura.dtFecFacFin = Convert.ToDateTime("01/01/1970")
         End If

         If dtCreIni <> "" Then
            oFactura.dtFecGenFacIni = Convert.ToDateTime(dtCreIni)
         Else
            oFactura.dtFecGenFacIni = Convert.ToDateTime("01/01/1970")
         End If

         If dtCreFin <> "" Then
            oFactura.dtFecGenFacFin = Convert.ToDateTime(dtCreFin)
         Else
            oFactura.dtFecGenFacFin = Convert.ToDateTime("01/01/1970")
         End If

         oFactura.vcNomEmp = vcNomEmp.Replace("&#39", "'")

         oFactura.Estado.P_inCod = Integer.Parse(inCodEst)

         Dim _return As List(Of ENT_MOV_Factura) = FacturaOperacionFrecuente.Listar(oFactura, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).P_inCod)

         FacturaOperacionFrecuente.Dispose()

         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function Mostrar(ByVal inCodFac As String) As ENT_MOV_Factura
      Try
         Dim Factura As BL_MOV_Factura = New BL_MOV_Factura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As ENT_MOV_Factura = Factura.Mostrar(inCodFac)
         Factura.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function MostrarOperacionFrecuente(ByVal inCodOpeFre As String) As ENT_MOV_Factura
      Try
         Dim FacturaOperacionFrecuente As BL_MOV_FacturaOperacionFrecuente = New BL_MOV_FacturaOperacionFrecuente(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As ENT_MOV_Factura = FacturaOperacionFrecuente.Mostrar(inCodOpeFre)
         FacturaOperacionFrecuente.Dispose()
         Return _return
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function Eliminar(ByVal inCodFac As String) As String
      Try
         Dim Factura As BL_MOV_Factura = New BL_MOV_Factura(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Factura.Eliminar(Integer.Parse(inCodFac))
         Factura.Dispose()
         Return ""
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

End Class