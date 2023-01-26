Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.HtmlControls
Imports System.Web.UI.WebControls
Imports System.Data
Imports VisualSoft.PCSistel.Producto.BE
Imports VisualSoft.PCSistel.Producto.BL
Imports System.Web.Script.Serialization
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.IO
Imports VisualSoft.PCSistel.CompAuditoria.Comun
Imports auditoria.Constantes
Imports VisualSoft.PCSistel.Utilitarios

Partial Class Adm_Lista
    Inherits System.Web.UI.Page

    Shared flagBorrarString As Boolean = True
    Shared ruta As String = String.Empty

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        If Not Page.IsPostBack Then
            If Convert.ToBoolean(DirectCast(Session("datos"), DataTable).Rows(0)("USUA_BTCHGPWD")) = True Then
                Response.Redirect("cambiar_contrasena.aspx")
            End If
        End If
        Try
            If Not Page.IsPostBack Then



                Dim vcTab As String = Request.QueryString("vcTab")
                Dim inNoPer As Integer = If(Request.QueryString("inNoPer") Is Nothing, 0, 1)
                Dim inTipOri As Integer = 1
                'Dim inTipOri As Integer = Integer.Parse(Request.QueryString("inTipOri"))
                'lbltitulo.Text = vcTab;
                'eeListado.ObtenerDatosAExportar +=  eeListado_ObtenerDatosAExportar();
                AddHandler eeListado.ObtenerDatosAExportar, AddressOf Me.eeListado_ObtenerDatosAExportar

                If vcTab = "M_EMPL" Then

                    bpBusquedaOrganizacion.NombreEntidad = "Organización"
                    bpBusquedaOrganizacion.vcTab = "M_ORGA"
                    bpBusquedaOrganizacion.TipoOrigen = 1
                    bpBusquedaOrganizacion.Condicion = "ORGA_btEST=1 "
                    bpBusquedaOrganizacion.FuncionPersonalizada = "fnMostrarCodigoEmpleado"
                    bpBusquedaOrganizacion.RutaRaiz = "../../"
                    bpBusquedaOrganizacion.Contenedor = "dvBusquedaOrganizacion"
                    'bpBusquedaOrganizacion.Descripcion = "Descripcion";
                    'Session["resultado_consulta"] = null;
                    'DataTable dt = (DataTable)Session["datos"];

                    bpBusquedaOrganizacion.Codigo = "ORGA_P_inCODINT"
                End If

                If vcTab = "M_ORGA" Then

                    bpBusquedaOrganizacion.NombreEntidad = "Seleccione el Nivel"
                    bpBusquedaOrganizacion.vcTab = "M_Nive"
                    bpBusquedaOrganizacion.TipoOrigen = 1
                    ' bpBusquedaOrganizacion.Condicion = "ORGA_btEST=1 ";
                    bpBusquedaOrganizacion.FuncionPersonalizada = "fnMostrarCodigoEmpleado"
                    bpBusquedaOrganizacion.RutaRaiz = "../../"
                    'bpBusquedaOrganizacion.Codigo = "NIVE_P_inCODNIV";
                    'bpBusquedaOrganizacion.Descripcion = "Descripcion";


                    bpBusquedaOrganizacion.Contenedor = "dvBusquedaOrganizacion"
                End If



                Dim Entidad As New BL_ENT_Entidad()
                Dim Opcion As New BL_ENT_Opcion()
                Dim Campo As New BL_ENT_Campo()

                'Dim Entidad As BL_ENT_Entidad = New BL_ENT_Entidad(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim Opcion As BL_ENT_Opcion = New BL_ENT_Opcion(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                'Dim Campo As BL_ENT_Campo = New BL_ENT_Campo(inTipOri, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


                Dim oEntidad As New ENT_ENT_Entidad()
                Dim lstOpcion As New List(Of ENT_ENT_Opcion)()
                Dim lstCampo As New List(Of ENT_ENT_Campo)()

                oEntidad = Entidad.Mostrar(vcTab, 1)
                'Entidad.Dispose();

                'Registra auditoria.........................
                'ProcesaAuditoria oAuditoria= new ProcesaAuditoria();

                'oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario);
                'oAuditoria.Producto = Constantes.AuditoriaConstantes.Name;
                'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name;
                'oAuditoria.NombreUsuario = oUsuario.vcUsu;
                'oAuditoria.Opcion = oEntidad.vcDes;
                'oAuditoria.Tabla = oEntidad.vcTab;
                'oAuditoria.Especial("Ingreso al listado de " & oEntidad.vcDes);

                'Logger.WriteLog(Me, LogLevelL4N.DEBUG, "Ingreso al listado de " & oEntidad.vcDes & " - " & oUsuario.vcUsu);

                lstOpcion = Opcion.Listar(vcTab, inTipOri)
                'Opcion.Dispose();

                lstCampo = Campo.Listar(vcTab, 1, 0)
                'Campo.Dispose()

                hdfvcTab.Value = vcTab
                hdfinTipOri.Value = "1"
                hdfCodEntidad.Value = oEntidad.P_inCod.ToString()

                ctListado.Titulo = oEntidad.vcDes
                'if (flagBorrarString == true)
                '{
                '    for (index = 0; index <= lstCampo.Count - 1; index ++)
                '    {
                '        if (lstCampo.Item(index).inTipDat == 7)
                '        {
                '            lstCampo.Item(index).vcNom = lstCampo.Item(index).vcNom + "Str";
                '            lstCampo.Item(index).vcNomAlias = lstCampo.Item(index).vcNomAlias + "Str";
                '        }
                '    }
                '    flagBorrarString = false;
                '}

                Session(Convert.ToString("Campos" + "_") & vcTab) = lstCampo
                Session(Convert.ToString("DescripcionEntidad" + "_") & vcTab) = oEntidad.vcDes
                btnAgregar.Attributes("Url") = oEntidad.vcURLMan
                btnEditar.Attributes("Url") = oEntidad.vcURLMan
                'Session["Origen"] = inTipOri;

                ConfigurarGrid(lstCampo, oEntidad)
                If inNoPer = 0 Then
                    ConfigurarAcciones(oEntidad)
                Else
                    hdfEdicion.Value = "1"
                End If
                ConfigurarBusqueda(lstCampo, oEntidad)
                ConfigurarOpciones(oEntidad, lstOpcion, 1, 1)

                'hdfNumMaxNivel.Value = Convert.ToInt32("0" + ConfigurationManager.AppSettings("NumMaxNivel").ToString())

                ConfigurarValoresPorDefecto(lstCampo)
            End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

#Region "ConfigurarValoresPorDefecto"
    Private Sub ConfigurarValoresPorDefecto(lstCampo As List(Of ENT_ENT_Campo))
        Dim strValorPorDefecto As String = ""
        For Each oCampo As ENT_ENT_Campo In lstCampo
            If oCampo.btIdPri Then
                strValorPorDefecto = "" + oCampo.vcValdef
            End If
        Next
        hdfValorPorDefecto.Value = strValorPorDefecto
    End Sub
#End Region

#Region "FiltrosPorTablas"
    Private Shared Function FiltrosPorTablas(vcTab As String) As String
        'ENT_SEG_Usuario oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session("Usuario");
        Dim _return As String = ""
        'vcTab = "" + vcTab;
        'switch (vcTab.ToUpper())
        '{
        '    case "PCS_TRF_SERVICIO":
        '        _return = "btUsaImp=1";
        '        break;
        '    case "M_ORGA":
        '        _return = "ORGA_CodInt2 LIKE '" + oUsuario.F_vcCodInt + "%'";
        '        break;
        '    case "M_EMPL":
        '        _return = "EMPL_CodInt2 LIKE '" + oUsuario.F_vcCodInt + "%'";
        '        break;
        '    case "M_SUCU":
        '        if (!string.IsNullOrEmpty(oUsuario.F_vcCodSuc) & oUsuario.F_vcCodSuc != "0000000000")
        '        {
        '            _return = "SUCU_P_vcCODSUC = '" + oUsuario.F_vcCodSuc + "'";
        '        }
        '        break;
        '    case "MOV_LINEA":
        '        _return = " (M_EMPL.EMPL_CodInt2 LIKE '" + oUsuario.F_vcCodInt + "%' OR M_EMPL.EMPL_CodInt2 is NULL ) ";
        '        break;
        '    case "MOV_DISPOSITIVO":
        '        _return = " (M_EMPL.EMPL_CodInt2 LIKE '" + oUsuario.F_vcCodInt + "%' OR M_EMPL.EMPL_CodInt2 is NULL ) ";
        '        break;
        '}
        Return _return
    End Function
#End Region
    'UtilitarioWeb.JQGridJsonResponse
#Region "JQGridJsonResponse Listar"

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function Listar(inPagTam As String, inPagAct As String, vcOrdCol As String, vcTipOrdCol As String, vcCam As String, vcValBus As String, _
   vcTab As String, inTipOri As String, inFilReg As String) As UtilitarioWeb.JQGridJsonResponse
        Try
            'BL_ENT_Campo Campo = new BL_ENT_Campo(int.Parse(inTipOri), ((ENT_SEG_Usuario)HttpContext.Current.Session("Usuario")).IdCliente);
            Dim Campo As New BL_ENT_Campo()
            Dim lstCampo As List(Of ENT_ENT_Campo) = DirectCast(HttpContext.Current.Session(Convert.ToString("Campos" + "_") & vcTab), List(Of ENT_ENT_Campo))
            Dim NomId As String = HttpContext.Current.Session(Convert.ToString("NomId" + "_") & vcTab).ToString()
            'Dim inOrdId As Integer  
            'For Each oCampo As ENT_ENT_Campo In lstCampo
            '    If oCampo.btIdPri Then
            '        inOrdId = oCampo.inOrd
            '    End If
            'Next
            HttpContext.Current.Session(Convert.ToString("vcFiltro_") & vcTab) = Convert.ToString((Convert.ToString(vcCam & Convert.ToString(",")) & vcValBus) + "|") & inFilReg

            If flagBorrarString = False Then
                For index As Integer = 0 To lstCampo.Count - 1

                    If lstCampo(index).inTipDat = 7 Then
                        lstCampo(index).vcNom = lstCampo(index).vcNom.Substring(0, lstCampo(index).vcNom.Length - 3)
                        lstCampo(index).vcNomAlias = lstCampo(index).vcNomAlias.Substring(0, lstCampo(index).vcNomAlias.Length - 3)

                    End If
                Next
                flagBorrarString = True
            End If

            Dim nombreTabla As String = lstCampo(0).vcTab

            'Filtros
            Dim strFiltros As String = FiltrosPorTablas(lstCampo(0).vcTab)
            Dim dsDetalle As DataSet = Campo.ListarDetallePaginadoBusqueda(Integer.Parse(inPagTam), Integer.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, _
             NomId, vcCam, vcValBus, Integer.Parse(inFilReg), strFiltros)

            For index As Integer = 0 To dsDetalle.Tables(1).Columns.Count - 1
                If dsDetalle.Tables(1).Columns(index).DataType.Name.ToString().Equals("Byte[]") Then
                    dsDetalle.Tables(1).Columns.Add(dsDetalle.Tables(1).Columns(index).ColumnName + "Str", Type.[GetType]("System.String"))
                    Dim contadorFilas As Integer = 0
                    For Each fila As DataRow In dsDetalle.Tables(1).Rows
                        'If fila(index) <> DBNull.Value Then
                        If Not IsDBNull(fila(index)) Then
                            Dim rutaLocal As String = ruta
                            Dim byIcon As Byte() = New Byte(fila(index).ToString().Length * 2 - 1) {}
                            Dim rutaextra As String = byIcon.Length.ToString()
                            rutaLocal = (Convert.ToString((rutaLocal & rutaextra) + "_") & nombreTabla) + "_" + fila(1).ToString() + ".ico"
                            Dim fs As New FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write)
                            fs.Write(byIcon, 0, byIcon.Length)
                            fs.Flush()
                            fs.Close()

                            dsDetalle.Tables(1).Rows(contadorFilas)(dsDetalle.Tables(1).Columns.Count - 1) = (Convert.ToString((Convert.ToString("<img src='../Images/Temporal/") & rutaextra) + "_") & nombreTabla) + "_" + fila(1).ToString() + ".ico' height='35' width='35'/>"
                        End If
                        contadorFilas += 1
                    Next

                    dsDetalle.Tables(1).Columns.RemoveAt(index)
                Else
                End If
            Next

            Return New UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1)
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
#End Region

#Region "obtenerRuta"
    Private Function obtenerRuta() As String
        If (ruta Is Nothing) Or ruta.Equals(String.Empty) Then
            ruta = Server.MapPath("~/Common/Images/Temporal\")
        End If
        Return ruta
    End Function
#End Region

#Region "EliminarRegistro"
    <WebMethod()> _
    Public Shared Function EliminarRegistro(Id As String, vcPar As String, vcTab As String, inTipOri As String, btTipLog As String) As String
        'BL_GEN_TipoServicio ServicioTipo = null;
        'BL_MOV_Linea Linea = null;
        Try
            'ENT_SEG_Usuario oUsuario = new ENT_SEG_Usuario();
            Dim Campo As New BL_ENT_Campo()
            'Dim TipoSolicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
            'Id = Id.Replace("&#39", "''")
            Id = Id.Replace(",", "").Replace(".", "")
            'If IsNumeric(Id) Then Id = CType(Val(Id), Long)

            Dim IdArray As List(Of String) = Nothing

            Dim flagOK As Boolean = False
            Dim flagDep As Boolean = False
            Dim flagElim As Boolean = False
            Dim flagvalDef As Boolean = False
            Dim mensajeOK As String = ""
            Dim mensajeDep As String = ""
            Dim mensajeElim As String = ""
            Dim mensajevalDef As String = ""
            Dim mensaje As String = ""
            Dim elim As Boolean = True

            '#Region "Dependencias(individuales)"

            'string Ver_dependencias = "";

            '        try
            '        {
            '         Ver_dependencias=Campo.ListarDependencias(vcTab, Id);
            '        }
            '        catch (Exception)
            '        {

            '            throw;
            '        }

            'if (Ver_dependencias != "")
            '{
            '    mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla " + "<b><span style='color: red;'>" + Ver_dependencias + "</span></b>";
            '    return mensaje;
            '}



            'if (vcTab == "PCS_TRF_ServicioTipo")
            '{
            '    //ServicioTipo = new BL_GEN_TipoServicio();
            '    List<string> ArrayIdServTip = Id.Split('|').ToList();
            '    foreach (string idservtip in ArrayIdServTip)
            '    {
            '        if (Convert.ToInt32(idservtip) <= 18)
            '        {
            '            elim = false;
            '            break; // TODO: might not be correct. Was : Exit For
            '        }
            '        //Dim oServicioTipo As ENT_GEN_TipoServicio = ServicioTipo.Mostrar(idservtip)
            '        //If oServicioTipo.vcExpEn.ToLower() = "min" Then
            '        //   elim = False
            '        //End If
            '    }
            '}


            'if (vcTab == "M_ORGA")
            '{
            '    BL_GEN_OrganizacionG oOrganizacion = new BL_GEN_OrganizacionG();
            '    int dependencias = oOrganizacion.ContarDependencias(Convert.ToInt32(Id));

            '    if (dependencias > 0)
            '    {
            '        mensaje = "No se puede eliminar la Organizacion porque tiene " + "<b><span style='color: red;'>" + dependencias + "</span></b>" + " dependencias inferiores";
            '        return mensaje;

            '    }                 

            '}

            'if (vcTab == "M_CENT_COST")
            '{
            '    BL_GEN_CentroCosto oCenTcosto = new BL_GEN_CentroCosto();
            '    int dependencias = oCenTcosto.DependeDeEmpleados(Id);

            '    if (dependencias > 0)
            '    {
            '        mensaje = "No se puede eliminar la Organizacion porque tiene " + "<b><span style='color: red;'>" + dependencias + "</span></b>" + " dependencias con la tabla <b><span style='color: red;'> Empleado</span></b> ";
            '        return mensaje;                        
            '    }                

            '}


            'if (vcTab == "M_SUCU")
            '{
            '    BL_GEN_Sucursal oSucursal = new BL_GEN_Sucursal();
            '    DataTable dtsucu = oSucursal.ListarDependencias(Id).Tables[0];

            '    int Anexos,Codigos,Empleados,Facilidades,Rutas,Troncales,Modelos;

            '    Anexos = Convert.ToInt32(dtsucu.Rows[0]["Anexos"]);
            '    Codigos = Convert.ToInt32(dtsucu.Rows[0]["Codigos"]);
            '    Empleados = Convert.ToInt32(dtsucu.Rows[0]["Empleados"]);
            '    Facilidades = Convert.ToInt32(dtsucu.Rows[0]["Facilidades"]);
            '    Rutas = Convert.ToInt32(dtsucu.Rows[0]["Rutas"]);
            '    Troncales = Convert.ToInt32(dtsucu.Rows[0]["Troncales"]);
            '    Modelos = Convert.ToInt32(dtsucu.Rows[0]["Modelos"]);

            '    if (Anexos > 0)
            '    {
            '        mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla "+ "<b><span style='color: red;'> Anexo</span></b>" ;
            '        return mensaje;
            '    }
            '    if (Codigos > 0)
            '    {
            '        mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla " + "<b><span style='color: red;'> Codigo</span></b>";
            '        return mensaje;
            '    }
            '    if (Empleados > 0)
            '    {
            '        mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla " + "<b><span style='color: red;'> Empleado</span></b>";
            '        return mensaje;
            '    }
            '    if (Facilidades > 0)
            '    {
            '        mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla " + "<b><span style='color: red;'> Facilidades</span></b>";
            '        return mensaje;
            '    }
            '    if (Rutas > 0)
            '    {
            '        mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla " + "<b><span style='color: red;'> Ruta</span></b>";
            '        return mensaje;
            '    }
            '    if (Troncales > 0)
            '    {
            '        mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla " + "<b><span style='color: red;'> Troncales</span></b>";
            '        return mensaje;
            '    }
            '    if (Modelos > 0)
            '    {
            '        mensaje = "No se puede eliminar el registro ya que presenta registros relacionados con la tabla " + "<b><span style='color: red;'> Modelos</span></b>";
            '        return mensaje;
            '    }                                 

            '}

            'if (vcTab == "M_NIVE")
            '{
            '    BL_GEN_NivelOrganizacion oNivelg = new BL_GEN_NivelOrganizacion();
            '    int dependencias = oNivelg.DependeDeOrganizaciones(Convert.ToInt32(Id));

            '    if (dependencias > 0)
            '    {
            '        mensaje = "No se puede eliminar la Organizacion porque tiene " + "<b><span style='color: red;'>" + dependencias + "</span></b>" + " dependencias con la tabla <b><span style='color: red;'> Organización</span></b> ";
            '        return mensaje;                        
            '    }                

            '}

            '  if (vcTab == "M_GRUP_ORIG")
            '{
            '    BL_GEN_GrupoOrigen oGrupoOrigen = new BL_GEN_GrupoOrigen();
            '    int dependencias = oGrupoOrigen.DependeDeEmpleados(Convert.ToInt32(Id));

            '    if (dependencias > 0)
            '    {
            '        mensaje = "No se puede eliminar la Organizacion porque tiene " + "<b><span style='color: red;'>" + dependencias + "</span></b>" + " dependencias con la tabla <b><span style='color: red;'> Empleado</span></b> ";
            '        return mensaje;                        
            '    }                

            '}

            '  if (vcTab == "M_EMPR")
            '  {
            '      BL_GEN_Empresa oEmpresa = new BL_GEN_Empresa();
            '      int dependencias = oEmpresa.DependeDeNumero(Id);

            '      if (dependencias > 0)
            '      {
            '          mensaje = "No se puede eliminar la Organizacion porque tiene " + "<b><span style='color: red;'>" + dependencias + "</span></b>" + " dependencias con la tabla <b><span style='color: red;'> Número</span></b> ";
            '          return mensaje;
            '      }

            '  }

            '#End Region


            'validacion meses contrato para lineas de tipo familia
            Dim MensajeValContrato As String = String.Empty
            'if (vcTab == "MOV_Linea" & oUsuario.EsAdministrador == false)
            '{
            '    DataSet dsNumeroCalContrato = new DataSet();
            '    string vcNumNoProcesados = string.Empty;
            '    Linea = new BL_MOV_Linea(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
            '    dsNumeroCalContrato = Linea.CalcularContratoLinea(Id);
            '    List<string> arNumLIn = Id.Split("|").ToList();
            '    string valContrato = "Tiempo de Contrato";
            '    if (dsNumeroCalContrato.Tables(0).Rows.Count > 0)
            '    {
            '        foreach (DataRow dr in dsNumeroCalContrato.Tables(0).Rows)
            '        {
            '            arNumLIn.Remove(dr("Numero"));
            '            //Id.Replace(dr("Numero").ToString() + "-", "")
            '            //Id.Replace("-" + dr("Numero").ToString(), "")
            '            if (vcNumNoProcesados == string.Empty)
            '            {
            '                vcNumNoProcesados = dr("Numero").ToString();
            '            }
            '            else
            '            {
            '                vcNumNoProcesados = vcNumNoProcesados + "," + dr("Numero").ToString();
            '            }
            '        }
            '        MensajeValContrato = "Estos registros (<b><span style='color: red;'>" + vcNumNoProcesados + "</span></b>) no fueron procesados por que no han cumplido con el: (<b>" + valContrato + "</b>). ";
            '        Id = string.Join("-", arNumLIn);
            '    }
            '}
            If elim = False Then
                'mensaje = "No se puede eliminar los Tipo Servicios que esten expresados en 'min'."
                mensaje = "No se puede eliminar, es registro de sistema"
                Return mensaje
            Else
                If Not String.IsNullOrEmpty(Id) Then


                    IdArray = Campo.EliminarRegistroTabla(vcTab, Id, vcPar)
                    'Campo.Dispose();


                    'AUDITORIA:Ingresar las propiedades y cargar el componente Auditoria
                    Dim oAuditoria As New ProcesaAuditoria()
                    Dim dt As DataTable = DirectCast(HttpContext.Current.Session("datos"), DataTable)
                    oAuditoria.strOpcion = ""
                    oAuditoria.Tabla = vcTab
                    'Auditoria.Constantes.TableNames.Empleado;   
                    oAuditoria.strProducto = DirectCast(HttpContext.Current.Session("aProducto"), String)
                    oAuditoria.strModulo = DirectCast(HttpContext.Current.Session("aModulo"), String)
                    oAuditoria.NombrePc = DirectCast(HttpContext.Current.Session("aNombrePc"), String)


                    oAuditoria.strNombreUsuario = dt.Rows(0)("USUA_vcNOMUSU").ToString()
                    '---------------------------------------------------      

                    'ProcesaAuditoria oAuditoria = new ProcesaAuditoria();
                    'oAuditoria.Usuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];
                    'oAuditoria.Producto = Constantes.AuditoriaConstantes.Name;
                    'oAuditoria.Modulo = "Lista Maestra";
                    'oAuditoria.NombreUsuario = oUsuario.vcUsu;
                    'oAuditoria.Opcion = "Eliminación desde Lista Maestra";
                    'oAuditoria.Tabla = vcTab == "MOV_CAM_CampanaDespachoOperador" ? "MOV_CAM_CampanaDespachoOperadorDetalle" : vcTab;
                    'oAuditoria.Origen = Convert.ToInt32(HttpContext.Current.Session["Origen"].ToString());

                    'AUDITORIA:Eliminar registro
                    'string[] IdDelAud = Id.Split["|"];
                    'foreach (string id_p in IdDelAud)
                    '{
                    '    oAuditoria.EliminarAuditoria(id_p);
                    '}
                    'oAuditoria.EliminarAuditoria(New String() {Id})
                    'if (vcTab == "MOV_TipoSolicitud")
                    '    TipoSolicitud.ActualizarUsuario();

                    Dim blEliminado As Boolean = False

                    For Each Codigo As String In IdArray
                        blEliminado = False
                        Dim ParMensaje As String() = Codigo.Split("/"c)
                        If ParMensaje(2) = "O" Then
                            blEliminado = True
                            If ParMensaje(0) <> "0" Then
                                flagOK = False
                                mensajeOK += "Se desactivaron (" + ParMensaje(0) + ") Registro(s) <br />(C&oacute;digo(s): <b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) <br />"

                                'AUDITORIA: Desactivacion de Registros

                                If True Then
                                    oAuditoria.Audi_Tipo = "DESACTIVAR"
                                    oAuditoria.rmCadenas = ""
                                    Dim Id_Desactivado As String() = ParMensaje(1).Split(";"c)
                                    For Each id_D As String In Id_Desactivado
                                        'string strAntes = "";
                                        'string strAntes = oAuditoria.AntesActualizar(new string[] { id_D.Trim() }); 
                                        'strAntes = oAuditoria.AntesActualizar(new string[] { id_D.Trim() }, true, int.Parse(inTipOri));
                                        'oAuditoria.DespuesActualizar(new string[] { Codigo }, strAntes);
                                        'oAuditoria.EliminarAuditoria(id_D.Trim(), strAntes, false, int.Parse(inTipOri));
                                        oAuditoria.EliminarAuditoria(New String() {id_D.Trim()}, 1)
                                    Next

                                End If
                            Else
                                flagOK = True
                                mensajeOK += "Se desactivaron (" + ParMensaje(0) + ") Registro <br />"
                            End If
                        End If
                        If ParMensaje(2) = "E" Then
                            blEliminado = True
                            If ParMensaje(0) <> "0" Then
                                flagElim = False
                                mensajeElim += "Se eliminaron " + ParMensaje(0) + " Registro(s) <br /> (C&oacute;digo(s): <b><span style='color: red;'>" + ParMensaje(1) + "</span></b>)"
                                'AUDITORIA: Desactivacion de Registros

                                If True Then
                                    oAuditoria.Audi_Tipo = "ELIMINAR"
                                    oAuditoria.rmCadenas = ""
                                    Dim Id_Desactivado As String() = ParMensaje(1).Split(";"c)
                                    For Each id_D As String In Id_Desactivado
                                        'string strAntes = "";
                                        'string strAntes = oAuditoria.AntesActualizar(new string[] { id_D.Trim() }); 
                                        'strAntes = oAuditoria.AntesActualizar(new string[] { id_D.Trim() }, true, int.Parse(inTipOri));
                                        'oAuditoria.DespuesActualizar(new string[] { Codigo }, strAntes);
                                        'oAuditoria.EliminarAuditoria(id_D.Trim(), strAntes, false, int.Parse(inTipOri));
                                        oAuditoria.EliminarAuditoria(New String() {id_D.Trim()}, 0)
                                    Next

                                End If
                            Else
                                flagElim = True
                                mensajeElim += "Se eliminaron " + ParMensaje(0) + " Registro"
                            End If
                        End If
                        If ParMensaje(2) = "D" Then
                            If String.IsNullOrEmpty(ParMensaje(1)) Then
                                flagDep = True
                            Else
                                flagDep = False
                                mensajeDep += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje(0) + "</span></b>) no fueron procesados porque tiene(n) dependencia(s) con: (<b>" + ParMensaje(1) + "</b>) "
                                'End If
                            End If
                        End If

                        If ParMensaje(2) = "V" Then
                            If ParMensaje(0) = "0" Then
                                flagvalDef = True
                            Else
                                flagvalDef = False
                                mensajevalDef += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) no pueden ser modificados por ser Valores del Sistema."
                            End If

                            'if (vcTab.ToString.Trim.ToUpper() == "M_EMPL" & blEliminado == true & !string.IsNullOrEmpty("" + ParMensaje[1]))
                            '{
                            '    BL_SEG_Usuario SEG_Usuario = null;
                            '    SEG_Usuario = new BL_SEG_Usuario(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
                            '    string CodEliBase = ParMensaje(1).ToString();
                            '    List<string> CodEliBaseArray = CodEliBase.Split(';').ToList();
                            '    foreach (string id_p in CodEliBaseArray)
                            '    {
                            '        SEG_Usuario.BajaUsuarioPorEmpleado(id_p);
                            '    }
                            '
                            '    SEG_Usuario.Dispose();
                            '
                            '    //'ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"
                            '    BL_SEG_Usuario oUsuarioDatos = null;
                            '    oUsuarioDatos = new BL_SEG_Usuario(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, 1);
                            '    string CodEliDatos = ParMensaje(1).ToString();
                            '    List<string> CodEliDatosArray = CodEliDatos.Split(';').ToList();
                            '    foreach (string id_p in CodEliDatosArray)
                            '    {
                            '        oUsuarioDatos.BajaUsuarioPorEmpleado_Datos(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, id_p);
                            '    }
                            '    oUsuarioDatos.Dispose();
                            '}
                            '
                            'if (vcTab.ToString.Trim.ToUpper() == "SEG_USUARIO" & blEliminado == true & !string.IsNullOrEmpty("" + ParMensaje(1)) & "" + ParMensaje(2) == "O")
                            '{
                            '    //ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"
                            '    BL_SEG_Usuario oUsuarioDatos = null;
                            '    oUsuarioDatos = new BL_SEG_Usuario(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, 1);
                            '    string CodEli = ParMensaje(1).ToString();
                            '    List<string> CodEliArray = CodEli.Split(';').ToList();
                            '    foreach (string id_p in CodEliArray)
                            '    {
                            '        oUsuarioDatos.BajaUsuarioPorCodigo_Datos(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, id_p, 0);
                            '    }
                            '    oUsuarioDatos.Dispose();
                            '}
                            'if (vcTab.ToString.Trim.ToUpper() == "SEG_USUARIO" & blEliminado == true & !string.IsNullOrEmpty("" + ParMensaje(1)) & "" + ParMensaje(2) == "E")
                            '{
                            '    BL_SEG_Usuario oUsuarioDatos = null;
                            '    oUsuarioDatos = new BL_SEG_Usuario(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, 1);
                            '    string CodEli = ParMensaje(1).ToString();
                            '    List<string> CodEliArray = CodEli.Split(';').ToList();
                            '    foreach (string id_p in CodEliArray)
                            '    {
                            '        oUsuarioDatos.BajaUsuarioPorCodigo_Datos(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, id_p, 1);
                            '    }
                            '    oUsuarioDatos.Dispose();
                            '}
                        End If
                    Next

                    If flagOK = False AndAlso Not String.IsNullOrEmpty(mensajeOK) Then
                        mensaje += (Convert.ToString("<li>") & mensajeOK) + "</li><br />"
                    End If
                    If flagElim = False AndAlso Not String.IsNullOrEmpty(mensajeElim) Then
                        mensaje += (Convert.ToString("<li>") & mensajeElim) + "</li><br />"
                    End If
                    If flagDep = False AndAlso Not String.IsNullOrEmpty(mensajeDep) Then
                        mensaje += (Convert.ToString("<li>") & mensajeDep) + "</li><br />"
                    End If
                    If flagvalDef = False AndAlso Not String.IsNullOrEmpty(mensajevalDef) Then
                        mensaje += (Convert.ToString("<li>") & mensajevalDef) + "</li><br />"
                    End If
                End If
                'agregado 16/07/2014 wapumayta (validacion tiempo de contrato para lineas)
                If MensajeValContrato <> String.Empty Then
                    mensaje += (Convert.ToString("<li>") & MensajeValContrato) + "</li><br />"
                End If

                ''Dim oUsuarioBase As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente) 'CONEXION A BASE
                ''Dim oUsuarioDatos As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente, 1) 'CONEXION A DATOS
                ''oUsuarioBase.GrabarUsuariosBDDatos(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente, oUsuarioDatos.ObtenerNombreBDDatos())
                ''oUsuarioDatos.Dispose()
                ''oUsuarioBase.Dispose()
                If vcTab.ToString().Trim().ToUpper() = "SEG_USUARIO" Then
                End If

                Return (Convert.ToString("<ul>") & mensaje) + "</ul>"
            End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
#End Region

#Region "ActivarRegistros"
    <WebMethod()> _
    Public Shared Function ActivarRegistros(Ids As String, vcPar As String, vcTab As String, inTipOri As String, activar As String) As String
        Try
            Dim Campo As New BL_ENT_Campo()
            Dim IdArray As List(Of String) = Nothing

            Dim flagOK As Boolean = False
            Dim flagError As Boolean = False
            Dim flagvalDef As Boolean = False
            Dim flagValDep As Boolean = False
            Dim mensajeOK As String = ""
            Dim mensajeError As String = ""
            Dim mensajevalDef As String = ""
            Dim mensajeValDep As String = ""
            Dim mensaje As String = ""
            Ids = Ids.Replace("&#39", "''")

            Ids = Ids.Replace(",", "").Replace(".", "")
            If IsNumeric(Ids) Then
                If Ids.Trim().Length > 0 Then
                    If Ids.Trim().Substring(0, 1) <> "0" Then
                        Ids = Convert.ToInt32(Ids).ToString()
                    End If
                End If
            End If

            IdArray = Campo.ActivarRegistroTabla(vcTab, Ids, vcPar, Convert.ToBoolean(activar))

            For Each Codigo As String In IdArray
                Dim ParMensaje As String() = Codigo.Split("/"c)
                If ParMensaje(2) = "O" Then
                    If ParMensaje(0) <> "0" Then
                        flagOK = False
                        mensajeOK += "Se activaron (" + ParMensaje(0) + ") Registro(s) <br />(<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) <br />"
                    Else
                        flagOK = True
                        mensajeOK += "Se activaron (" + ParMensaje(0) + ") Registro <br />"
                    End If
                End If
                If ParMensaje(2) = "E" Then
                    If ParMensaje(0) <> "0" Then
                        flagError = False
                        mensajeError += "Estos registros (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) no fueron procesados"
                    Else
                        flagError = True
                        mensajeError += "Este registro (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>)  no fueron procesados"
                    End If
                End If
                If ParMensaje(2) = "V" Then
                    If ParMensaje(0) = "0" Then
                        flagvalDef = True
                    Else
                        flagvalDef = False
                        mensajevalDef += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje(1) + "</span></b>) no pueden ser modificados por ser Valores del Sistema."
                    End If
                End If
                If ParMensaje(2) = "D" Then
                    If String.IsNullOrEmpty(ParMensaje(0)) Then
                        flagValDep = False
                    Else
                        flagValDep = True
                        mensajeValDep += "Esto(s) registro(s) (<b><span style='color:red;'>" + ParMensaje(0) + "</span></b>) no fueron procesados por tener dependencia deshabilitada en (<b>" + ParMensaje(1) + "</b>)."
                    End If


                    'if (vcTab.ToString.Trim.ToUpper() == "SEG_USUARIO" & !string.IsNullOrEmpty("" + ParMensaje(1)))
                    '{
                    '    //'ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"
                    '    BL_SEG_Usuario oUsuarioDatos = null;
                    '    oUsuarioDatos = new BL_SEG_Usuario(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, 1);
                    '    string CodEli = ParMensaje(1).ToString();
                    '    List<string> CodEliArray = CodEli.Split(';').ToList();
                    '    foreach (string id_p in CodEliArray)
                    '    {
                    '        oUsuarioDatos.BajaUsuarioPorCodigo_Datos(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, id_p, 2);
                    '    }
                    '    oUsuarioDatos.Dispose();
                    '}
                End If
            Next

            If flagOK = False Then
                mensaje += (Convert.ToString("<li>") & mensajeOK) + "</li><br />"
            End If
            If flagError = False Then
                mensaje += (Convert.ToString("<li>") & mensajeError) + "</li><br />"
            End If
            If flagvalDef = False Then
                mensaje += (Convert.ToString("<li>") & mensajevalDef) + "</li><br />"
            End If
            If flagValDep = True Then
                mensaje += (Convert.ToString("<li>") & mensajeValDep) + "</li><br />"
            End If




            'if (vcTab.ToString().Trim().ToUpper() == "SEG_USUARIO")
            '{
            '    //'Dim oUsuarioBase As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente) 'CONEXION A BASE
            '    //'Dim oUsuarioDatos As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente, 1) 'CONEXION A DATOS
            '    //'oUsuarioBase.GrabarUsuariosBDDatos(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente, oUsuarioDatos.ObtenerNombreBDDatos())
            '    //'oUsuarioDatos.Dispose()
            '    //'oUsuarioBase.Dispose()
            '}


            'Dim _return As String
            'If ds.Tables(0).Rows.Count > 0 Then
            '    _return = 1
            'Else
            'End If

            'Return ds.Tables(0).Rows(0)(0).ToString()
            Return (Convert.ToString("<ul>") & mensaje) + "</ul>"
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
#End Region

#Region "Guardar caracteristicas"
    <WebMethod()> _
    Public Shared Sub GuardarCaracteristicas(DimensionesCol As String, OrdenCol As String, NombreCol As String, TamanoPagina As String, vcTab As String, inTipOri As String)
        Try
            Dim Campo As New BL_ENT_Campo()
            Dim Entidad As New BL_ENT_Entidad()
            'ENT_SEG_Usuario oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];
            Dim lstCampo As List(Of ENT_ENT_Campo) = DirectCast(HttpContext.Current.Session(Convert.ToString("Campos" + "_") & vcTab), List(Of ENT_ENT_Campo))

            Campo.GuardarPropiedades(lstCampo, vcTab, NombreCol, DimensionesCol, OrdenCol, 1)
            'Campo.Dispose();
            '

            'Entidad.Dispose();

            Entidad.GuardarPropiedades(vcTab, Integer.Parse(TamanoPagina), 1)
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
#End Region

#Region "configurarGrid"
    Private Sub ConfigurarGrid(lstCampo As List(Of ENT_ENT_Campo), oEntidad As ENT_ENT_Entidad)
        Dim script As String = Nothing
        Dim IdPrim As String = ""
        Dim Columna As String = "var columnas=["

        hdfActivo.Value = "Activo"
        hdfDesactivo.Value = "Baja"

        hdfCampBool.Value = ""

        For Each oCampo As ENT_ENT_Campo In lstCampo
            If oCampo.btIdPri Then
                If Not String.IsNullOrEmpty(IdPrim) Then
                    IdPrim += ","
                End If
                IdPrim += oCampo.vcNomAlias
            End If

            Columna = (Columna & Convert.ToString("{ name: '")) + oCampo.vcNomAlias + "', index: '" + oCampo.vcNomAlias + "', width: " + oCampo.inLar.ToString() + ", label: '" + oCampo.vcDes.Replace("'", "\'") + "'"

            If oCampo.btOrd And oEntidad.btOrd Then
                Columna = Columna & Convert.ToString(", sortable: true")
                'Fecha / Fecha y Hora
                If oCampo.inTipDat = 2 Or oCampo.inTipDat = 3 Then
                    'Número
                    Columna = Columna & Convert.ToString(", sorttype: 'date'")
                ElseIf oCampo.inTipDat = 5 Then
                    Columna = Columna & Convert.ToString(", sorttype: function (cellValue) { return cellValue === null ? -1000 : Number(cellValue);}")
                End If
            Else
                Columna = Columna & Convert.ToString(", sortable: false")
            End If

            If oCampo.btVis And oCampo.btVig Then
                Columna = Columna & Convert.ToString(", hidden: false")
            Else
                Columna = Columna & Convert.ToString(", hidden: true")
            End If

            If oCampo.btEliLog Then
                'hdfElim.Value = oCampo.vcNom ' comentado 01-02-2014 wapumayta
                hdfElim.Value = oCampo.vcNomAlias
                Columna = (Columna & Convert.ToString(", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '")) + hdfActivo.Value + "'; else return '" + hdfDesactivo.Value + "'; }"
                'If oCampo.vcNomAlias = "btVigEmp" And oEntidad.vcTab = "MOV_Linea" Then
                '    Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfActivo.Value & "'; else return '" & hdfDesactivo.Value & "'; }"
                'End If
                'formatter:'checkbox'"
                'this.Page.ClientScript.RegisterStartupScript(this.GetType, "ScriptKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" + oCampo.vcNom + "': 'Eliminado' });}", true);


                Me.Page.ClientScript.RegisterStartupScript(Me.[GetType](), "ScripKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" + oCampo.vcNom + "': 'Eliminado' });}", True)
            ElseIf oCampo.inTipDat = 6 Then
                If Not String.IsNullOrEmpty(hdfCampBool.Value) Then
                    hdfCampBool.Value += ","
                End If


                hdfCampBool.Value += oCampo.vcNom
                hdfVerdadero.Value = oCampo.vcValVer
                hdfFalso.Value = oCampo.vcValFal
                'Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfVerdadero.Value & "'; else return '" & hdfFalso.Value & "'; }" 'formatter:'checkbox'"
                Columna = (Columna & Convert.ToString(", formatter : function(value, options, rData){ if(value == 'True') return '")) + hdfVerdadero.Value + "'; else return '" + hdfFalso.Value + "'; }"
                'formatter:'checkbox'"
                If oCampo.vcNomAlias = "btVigEmp" And oEntidad.vcTab = "MOV_Linea" Then
                    Columna = (Columna & Convert.ToString(", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '")) + hdfActivo.Value + "'; if(value == 'False') return '" + hdfDesactivo.Value + "' ; else return '" + "" + "'; }"
                End If
                If oCampo.vcNomAlias = "btVigEmp" And oEntidad.vcTab = "MOV_Dispositivo" Then
                    Columna = (Columna & Convert.ToString(", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '")) + hdfActivo.Value + "'; if(value == 'False') return '" + hdfDesactivo.Value + "' ; else return '" + "" + "'; }"
                End If

                'formatter:'checkbox'"
                Me.Page.ClientScript.RegisterStartupScript(Me.[GetType](), "ScriptKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" + oCampo.vcNom + "': 'Eliminado' });}", True)
                If oCampo.ChAlign = "3" Then
                    Columna = Columna & Convert.ToString(", align: 'Right'")
                ElseIf oCampo.inTipDat = 2 OrElse oCampo.inTipDat = 6 Then
                    Columna = Columna & Convert.ToString(", align: 'Center'")
                Else
                    Columna = Columna & Convert.ToString(", align: 'Left'")


                End If
            Else
                'Columna = Columna & ", align: 'Left'"
                If oCampo.ChAlign = "3" Then
                    Columna = Columna & Convert.ToString(", align: 'Right'")
                ElseIf oCampo.inTipDat = 2 Then
                    Columna = Columna & Convert.ToString(", align: 'Center'")
                Else
                    Columna = Columna & Convert.ToString(", align: 'Left'")
                End If
            End If
            'nuevo alinear columna moneda
            If oCampo.inTipDat = 4 Or oCampo.inTipDat = 5 Then
                Columna = Columna & Convert.ToString(", align: 'Right'")
            ElseIf oCampo.inTipDat = 3 Then
                'formatter:'currency', formatoptions:{decimalSeparator:",", thousandsSeparator: ",", decimalPlaces: 2, prefix: "$ "}
                'formatter:'date', formatoptions: {newformat: 'm/d/Y'}
                'datefmt: 'M d h:i'
                'Columna = Columna & ", formatter:'date'" ',datefmt: 'M d h:i'"
                Columna = Columna & Convert.ToString(", align: 'Right'")
            End If
            Columna = Columna & Convert.ToString(" },")
        Next

        Session("NomId" + "_" + oEntidad.vcTab) = IdPrim

        Columna = Columna.Substring(0, Columna.Length - 1) + "]; "

        Dim TamanoPaginaArray As String() = oEntidad.vcTamPag.Split(","c)

        If Not TamanoPaginaArray.Contains(oEntidad.inTamPag.ToString()) Then
            oEntidad.inTamPag = Integer.Parse(TamanoPaginaArray(0))
        End If
        script = (Convert.ToString((Convert.ToString("var idTabla = '") & IdPrim) + "'; ") & Columna) + "var titulo = '" + oEntidad.vcDes + "';" + "var TamanoPagina = '" + oEntidad.inTamPag.ToString() + "';" + "var TamanosPaginaSel = [" + oEntidad.vcTamPag + "];"

        Me.Page.ClientScript.RegisterStartupScript(Me.[GetType](), "ScriptKey", script, True)
    End Sub
#End Region

#Region "configurarAccciones"
    Private Sub ConfigurarAcciones(oEntidad As ENT_ENT_Entidad)
        ''Modificado por Mauricio benavides 11/07/2013
        'switch (inTip)
        '{
        '    case 1:
        '        BL_PRO_Producto ProductoSeguridad = new BL_PRO_Producto(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
        '        ENT_PRO_Producto oProductoSeguridad = new ENT_PRO_Producto();
        '        oProductoSeguridad = ProductoSeguridad.Mostrar(inCod);
        '        ProductoSeguridad.Dispose();
        '        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oProductoSeguridad.Perfiles);
        '        break;
        '    case 2:
        '        BL_PRO_Modulo ModuloSeguridad = new BL_PRO_Modulo(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
        '        ENT_PRO_Modulo oModuloSeguridad = new ENT_PRO_Modulo();
        '        oModuloSeguridad = ModuloSeguridad.Mostrar(inCod);
        '        ModuloSeguridad.Dispose();
        '        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oModuloSeguridad.Perfiles);
        '        break;
        '    case 3:
        '        BL_PRO_Opcion OpcionSeguridad = new BL_PRO_Opcion(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
        '        ENT_PRO_Opcion oOpcionSeguridad = new ENT_PRO_Opcion();
        '        oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod);
        '        OpcionSeguridad.Dispose();
        '        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles);
        '        break;
        '    case 4:
        '        BL_PRO_Item ItemSeguridad = new BL_PRO_Item(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
        '        ENT_PRO_Item oItemSeguridad = new ENT_PRO_Item();
        '        oItemSeguridad = ItemSeguridad.Mostrar(oUsuario, inCod);
        '        ItemSeguridad.Dispose();
        '        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oItemSeguridad.Perfiles);
        '        break;
        '}

        btnAgregar.Visible = oEntidad.btNue
        btnEditar.Visible = oEntidad.btEdi
        btnEliminar.Visible = oEntidad.btEli
        btnActivar.Visible = oEntidad.btAct
        'modificado 09-08-2013

        'ExcelImport.Visible = oEntidad.btImp;
        eeListado.Visible = oEntidad.btExp

        btnConfigurarFiltroRegistro.Visible = oEntidad.btAct
        'agregado 09-08-2013
        tblAcciones.Visible = (oEntidad.btNue OrElse oEntidad.btEdi OrElse oEntidad.btEli)
        tblEstado.Visible = oEntidad.btAct
        'agregado 09-08-2013

        If oEntidad.btEdi Then
            hdfEdicion.Value = "1"
        Else
            hdfEdicion.Value = "0"
        End If
    End Sub
#End Region

#Region "configurarBusquedad"
    Private Sub ConfigurarBusqueda(lstCampo As List(Of ENT_ENT_Campo), oEntidad As ENT_ENT_Entidad)
        Dim selval As String = ""
        Dim btEstado As Boolean = False
        ddlBusqueda.Items.Clear()
        For Each v_oCampo As ENT_ENT_Campo In lstCampo
            If v_oCampo.btFil And v_oCampo.btVig Then
                'If v_oCampo.vcDes = "Estado" Then
                '    btEstado = True
                'End If
                Dim li As New ListItem()
                li.Text = v_oCampo.vcDes
                li.Value = v_oCampo.vcNomAlias
                ddlBusqueda.Items.Add(li)
                If v_oCampo.btBusq Then
                    selval = v_oCampo.vcNomAlias
                End If
            End If
        Next
        If ddlBusqueda.Items.Count = 0 Or Not oEntidad.btBus Then
            'btnBuscar.Visible = False 
            'tblFiltroBusqueda.Visible = False 'agregado 09-08-2013
            tblFiltro.Visible = False
        End If
        'If btEstado = False Then
        '    tblFiltroBusqueda.Visible = False
        'End If
        If (Not String.IsNullOrEmpty(selval)) Then
            ddlBusqueda.SelectedValue = selval
        End If
    End Sub
#End Region

#Region "ConfigurarOpciones"
    'private void ConfigurarOpciones(ENT_ENT_Entidad oEntidad, List<ENT_ENT_Opcion> lstOpcion, ENT_SEG_Usuario oUsuario, int inCod, int inTip)
    Private Sub ConfigurarOpciones(oEntidad As ENT_ENT_Entidad, lstOpcion As List(Of ENT_ENT_Opcion), inCod As Integer, inTip As Integer)
        'Dim OpcionSeguridad As BL_PRO_Opcion = New BL_PRO_Opcion(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente)
        'Dim oOpcionSeguridad As New ENT_PRO_Opcion

        'oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod)
        'OpcionSeguridad.Dispose()

        'UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles)

        'Dim objExcelGenerico As New ExportarExcelGenerico()
        'objExcelGenerico.ID = "eegListado"
        'objExcelGenerico.Attributes.Add("runat", "server")
        Dim vcTab As String = oEntidad.vcTab
        Dim url As String = oEntidad.vcURLMan
        'switch (inTip)
        '{
        '    case 1:
        '        BL_PRO_Producto ProductoSeguridad = new BL_PRO_Producto();
        '        ENT_PRO_Producto oProductoSeguridad = new ENT_PRO_Producto();
        '        oProductoSeguridad = ProductoSeguridad.Mostrar(inCod);
        '        //ProductoSeguridad.Dispose();
        '        //UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oProductoSeguridad.Perfiles);
        '        break;
        '    case 2:
        '       // BL_PRO_Modulo ModuloSeguridad = new BL_PRO_Modulo(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
        '        //BL_PRO_Modulo ModuloSeguridad = new BL_PRO_Modulo();
        '        ENT_PRO_Modulo oModuloSeguridad = new ENT_PRO_Modulo();
        '       // oModuloSeguridad = ModuloSeguridad.Mostrar(inCod);
        '       // ModuloSeguridad.Dispose();
        '        //UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oModuloSeguridad.Perfiles);
        '        break;
        '    case 3:
        '        BL_PRO_Opcion OpcionSeguridad = new BL_PRO_Opcion(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
        '        ENT_PRO_Opcion oOpcionSeguridad = new ENT_PRO_Opcion();
        '        oOpcionSeguridad = OpcionSeguridad.Mostrar(oUsuario, inCod);
        '        OpcionSeguridad.Dispose();
        '        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oOpcionSeguridad.Perfiles);
        '        break;
        '    case 4:
        '        BL_PRO_Item ItemSeguridad = new BL_PRO_Item(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
        '        ENT_PRO_Item oItemSeguridad = new ENT_PRO_Item();
        '        oItemSeguridad = ItemSeguridad.Mostrar(oUsuario, inCod);
        '        ItemSeguridad.Dispose();
        '        UtilitarioWeb.OpcionesSeguridad.ObtenerValores(oItemSeguridad.Perfiles);
        '        break;
        '}

        Dim td As New HtmlTableCell()
        'HtmlTableCell tdExcelImport = new HtmlTableCell();
        eeListado.Visible = True
        ' ExcelImport.Visible = true;
        td.Controls.Add(eeListado)
        'tdExcelImport.Controls.Add(ExcelImport);
        trAvanzada.Controls.Add(td)
        'trAvanzada.Controls.Add(tdExcelImport);

        'Dim td1 As New HtmlTableCell
        'td1.Controls.Add(ToolTipGenerico1)
        'trAvanzada.Controls.Add(td1)


        'trAvanzada.Controls.Add(ItemOpcion("btnExportarExcel", "Exportar a Excel", oEntidad.vcURLRep, "ExportarExcel", "../Images/Mantenimiento/Excel16.png", _
        '                                   UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar And oEntidad.btExp))

        'trAvanzada.Controls.Add(ItemOpcion("btnImportar", "Importar", oEntidad.vcURLRep, "ImportarExcel", "../Images/Mantenimiento/Volcar.gif", _
        '                                   UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoImportar And oEntidad.btImp)) GEIG importarexcel

        trAvanzada.Controls.Add(ItemOpcion("btnGuardar", "Guardar", "", "Guardar", "../Images/Mantenimiento/Guardar.png", True))

        trAvanzada.Controls.Add(ItemOpcion("btnRecuperar", "Recuperar", "", "Recuperar", "../Images/Mantenimiento/Actualizar.png", True))

        trAvanzada.Controls.Add(ItemOpcion("btnConfigurarColumnas", "Configurar Columnas", "", "ConfigurarColumnas", "../Images/Mantenimiento/Configurar.png", True))

        trAvanzada.Controls.Add(ItemOpcion("btnReporte", "Reportes", "", "MostrarReportes", "../Images/Sumario/GEN.png", True))

        If vcTab = "M_CODI" Then
            trAvanzada.Controls.Add(ItemOpcion("btnCambiar", "Cambiar", url, "CambiarRegistro", "../Images/Mantenimiento/Cambio.png", True))
        End If

        '----------------Llena las opciones dinamicas--------------
        'trAvanzada.Controls.Add(ItemOpcion("btnReporte", "Reportes", "", "MostrarReportes", "../../Common/Images/Sumario/GEN.png", UtilitarioWeb.OpcionesSeguridad.Opciones.ActivoExportar & oEntidad.btExp & lstOpcion.Count > 0)); //comentado Jcamacho

        Select Case vcTab

            Case "M_CENT_COST"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptCentroCostoListar", "Imprimir", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptCentroCostoListar", ""))
                Exit Select
            Case "M_NIVE"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptNivelListar", "Imprimir", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptNivelListar", ""))
                Exit Select
            Case "M_GRUP_ORIG"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptGrupoOrigenListar", "Imprimir", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptGrupoOrigenListar", ""))
                Exit Select
            Case "m_orga"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptOrganizacionListar", "Imprimir", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptOrganizacionListar", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptOrganizacionListarJq", "Imprimir(Jerárquico)", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptOrganizacionListarJq", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptOrganizacionListarNive", "Imprimir por Nivel", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptOrganizacionListarNive", ""))
                Exit Select
            Case "M_EMPL"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptEmpleadoListar", "Imprimir", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptEmpleadoListar", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptEmpleadoxArea", "Seleccionar Area", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptEmpleadoxArea", "../../Common/Images/Sumario/GEN.png"))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptEmpleadoJerarquico", "Imprimir(Jerarquico)", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptEmpleadoJerarquico", ""))
                Exit Select
            Case "M_SUCU"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptSucursalListar", "Imprimir", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptSucursalListar", ""))
                Exit Select
            Case "M_FACI"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptFacilidadlListar", "Imprimir", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptFacilidadlListar", ""))
                Exit Select
            Case "M_ANEX"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptAnexoAreaAll", "General por Área", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptAnexoAreaAll", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptAnexoArea", "Seleccionar Área", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptAnexoArea", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptAnexoAreaAllAlfabetico", "Orden Alfabético", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptAnexoAreaAllAlfabetico", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptAnexoAreaAllSucursal", "Alfabético por Sucursales", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptAnexoAreaAllSucursal", ""))
                Exit Select
            Case "M_CODI"
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptCodigoPorSucFisLog", "Códigos por Sucursales", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptCodigoPorSucFisLog", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptCodigos", "Por Sucursales con Código", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptCodigos", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptCodigosxAreaAll", "Por Áreas sin Código", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptCodigosxAreaAll", ""))
                ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + "rptCodigosxArea", "Seleccionar Área", "../../Mantenimiento/Reportes/Adm_Reporte.aspx", "rptCodigosxArea", ""))
                Exit Select
            Case Else
                Exit Select
        End Select

        For Each v_oOpcion As ENT_ENT_Opcion In lstOpcion
            ulListaReportes.Controls.Add(ItemReporte("btnReporte_" + v_oOpcion.P_inCod, v_oOpcion.vcDes, v_oOpcion.vcURL, oEntidad.vcTab, v_oOpcion.vcURLIco))
        Next

    End Sub
#End Region

#Region "ItemOpcion"
    Private Function ItemOpcion(id As String, titulo As String, url As String, EventoClick As String, URLIcono As String, visible As Boolean) As Control
        'futuro control
        Dim td As New HtmlTableCell()
        Dim div As New HtmlGenericControl("div")
        div.ID = id
        div.Attributes("class") = "btnNormal"
        div.Attributes("runat") = "server"
        div.Attributes("title") = titulo
        div.Attributes("Url") = url
        'div.Attributes("IdOpcion") = IdOpcion
        div.Attributes("click") = EventoClick
        Dim img As New HtmlImage()
        img.Src = URLIcono
        img.Width = 16
        img.Height = 16
        td.Visible = visible
        trAvanzada.Controls.Add(td)
        td.Controls.Add(div)
        div.Controls.Add(img)
        Return td
    End Function

#End Region

#Region "ItemReporte"
    Private Function ItemReporte(id As String, descripcion As String, URL As String, Tab As String, URLIcono As String) As Control


        If descripcion = "Seleccionar Area" Then
        End If

        Dim li As New HtmlGenericControl("li")
        Dim a As New HtmlGenericControl("a")

        a.Attributes("idTab") = Convert.ToString("Reporte") & id

        'if (id == "btnReporte_rptEmpleadoxArea")
        '{
        '    a.Attributes["class"] = "aReporteArea";
        '}

        Select Case id
            Case "btnReporte_rptEmpleadoxArea", "btnReporte_rptAnexoArea", "btnReporte_rptCodigosxArea"
                a.Attributes("class") = "aReporteArea"
                Exit Select
            Case "btnReporte_rptEmpleadoJerarquico", "btnReporte_rptOrganizacionListarNive"
                a.Attributes("class") = "aReporteJerarquico"
                Exit Select
            Case "btnReporte_rptCodigoPorSucFisLog"
                a.Attributes("class") = "aReporteSucursalFisLog"
                Exit Select
            Case Else
                a.Attributes("class") = "aReportes"
                Exit Select
        End Select


        a.Attributes("href") = "#"
        a.InnerText = descripcion & Convert.ToString("  ")
        a.Attributes("URL") = Convert.ToString(URL & Convert.ToString("?vcTab=")) & Tab

        'HtmlImage img = new HtmlImage();
        'img.Src = URLIcono;
        'a.Controls.Add(img); 

        li.Controls.Add(a)

        Return li
    End Function
#End Region

#Region "eeListado_ObtenerDatosAExportar"

    Protected Sub eeListado_ObtenerDatosAExportar(oTipoExcel As ExportarExcelGenerico.TipoExcel)
        'protected void eeListado_ObtenerDatosAExportar(object sender, EventArgs e) 

        Dim vcTab As String = Request.QueryString("vcTab")
        Dim vcFiltro As String = HttpContext.Current.Session(Convert.ToString("vcFiltro_") & vcTab).ToString().Split("|"c)(0)
        Dim inFilReg As String = HttpContext.Current.Session(Convert.ToString("vcFiltro_") & vcTab).ToString().Split("|"c)(1)
        'int inTipOri = int.Parse(Request.QueryString["inTipOri"]);
        Dim inTipOri As Integer = 1

        Dim Campo As New BL_ENT_Campo()
        Dim lstCampo As List(Of ENT_ENT_Campo) = DirectCast(HttpContext.Current.Session(Convert.ToString("Campos" + "_") & vcTab), List(Of ENT_ENT_Campo))
        Try
            Dim dsDetalle As DataSet = Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, Convert.ToInt32(inFilReg))
            'Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, inFilReg);
            'Campo.Dispose();                
            eeListado.ExportarDatos(dsDetalle.Tables(0), Session(Convert.ToString("DescripcionEntidad" + "_") & vcTab).ToString(), lstCampo)
        Catch
        End Try
    End Sub
#End Region

    'Configuraciones especiales por tabla
#Region "VerificarUsuario"
    '[WebMethod()]
    'public static int VerificarUsuario(int inCodUsu)
    '{
    '    //agregado 06-05-2014 wapumayta
    '    BL_MOV_Solicitud Solicitud = null;
    '    int resultado = 0;
    '    try {
    '        Solicitud = new BL_MOV_Solicitud(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
    '        resultado = Solicitud.VerificarUsuario_Tecnico(inCodUsu);
    '        return resultado;
    '    } catch (Exception ex) {
    '        Utilitarios util = new Utilitarios();
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session["Usuario"]);
    '        throw new Exception(UtilitarioWeb.MensajeError);
    '    } finally {
    '        if ((Solicitud != null))
    '            Solicitud.Dispose();
    '    }
    '}
#End Region

#Region "Verificar_LineasRestaurar"
    '[WebMethod()]
    'public static List<Dictionary<string, string>> Verificar_LineasRestaurar(string Ids)
    '{
    '    //agregado 07-30-2014 wapumayta
    '    BL_GEN_Empleado Empleado = null;
    '    List<Dictionary<string, string>> resultado = new List<Dictionary<string, string>>();
    '    DataTable dt = new DataTable();
    '    try {
    '        Empleado = new BL_GEN_Empleado(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
    '        dt = Empleado.Listar_LineasRestaurar(Ids);
    '        foreach (DataRow dr in dt.Rows) {
    '            Dictionary<string, string> uDict = new Dictionary<string, string>();
    '            uDict.Add("Empleado", dr("F_vcCodEmp").ToString());
    '            uDict.Add("Linea", dr("P_vcNum").ToString());
    '            uDict.Add("Dispositivo", dr("F_vcCodIMEI").ToString());
    '            uDict.Add("Situacion", dr("F_inCodEst").ToString());
    '            uDict.Add("Estado", dr("btVig").ToString());
    '            uDict.Add("EmpleadoNuevo", dr("F_vcCodEmp").ToString());
    '            resultado.Add(uDict);
    '        }
    '        return resultado;
    '    } catch (Exception ex) {
    '        Utilitarios util = new Utilitarios();
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session["Usuario"]);
    '        throw new Exception(UtilitarioWeb.MensajeError);
    '    } finally {
    '        if ((Empleado != null))
    '            Empleado.Dispose();
    '    }
    '}
#End Region

#Region "RestaurarLineasEmpleado"
    '[WebMethod()]
    'public static int RestaurarLineasEmpleado(string Ids)
    '{
    '    BL_GEN_Empleado Empleado = null;
    '    int resultado = 0;
    '    try {
    '        Empleado = new BL_GEN_Empleado(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
    '        resultado = Empleado.RestaurarLineasEmpleado(Ids);
    '        return resultado;
    '    } catch (Exception ex) {
    '        Utilitarios util = new Utilitarios();
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session["Usuario"]);
    '        throw new Exception(UtilitarioWeb.MensajeError);
    '    } finally {
    '        if ((Empleado != null))
    '            Empleado.Dispose();
    '    }
    '}
#End Region

    Public Shared Function IsNumeric(valor As String) As [Boolean]
        Dim result As Integer
        Return Integer.TryParse(valor, result)
    End Function

    'public static string ExportarExcel(string vcTab, string vcFiltro,int inFilReg,string NombreHoja)
    <WebMethod()> _
    Public Shared Function ObtenerCodigoReporte(codCondicion As String) As String
        Try
            HttpContext.Current.Session("codCondicion") = codCondicion
            Return ""
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

End Class
