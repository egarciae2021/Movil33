using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
using VisualSoft.Comun.Utilitarios;
using System.Data;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using Utilitarios;
using System.Configuration;
using System.IO;
using System.Text;

using CompCorreo;
using VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil;
using Web.GeneralMantenimiento;
using VisualSoft.PCSistelMovil.Dominio.BE;
using VisualSoft.PCSistelMovil.Dominio.BL;
using System.Xml;
using PcSistelMovil2Web.Common.WebService;

namespace PcSistelMovil2Web.Solicitudes
{
    public partial class Adm_ListadoSolicitudes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!Page.IsPostBack)
            {


                if ((Session["datos"] == null))
                {
                    Response.BufferOutput = true;
                    string script = "window.top.location.reload();";
                    this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);
                    return;
                }

                else
                {

                    try
                    {
                        List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)Session["datos"];
                        Hdf_IdUsuario.Value = lsDatosUsuario[0].IdUsuario.ToString();

                        hdf_tamanioimportacion.Value = System.Configuration.ConfigurationManager.AppSettings["TamanioArchivoImportacion"].ToString();
                        hdf_MaximoProcesamiento.Value = System.Configuration.ConfigurationManager.AppSettings["LimiteProcesamientoMasivo"].ToString();
                        hdTamanioBaseMovil_MB.Value = System.Configuration.ConfigurationManager.AppSettings["TamanioBaseMovil_MB"].ToString();


                        BL_AP_Portal Portal = new BL_AP_Portal();
                        ddlPortal.DataSource = Portal.Listar();
                        ddlPortal.DataTextField = "NombrePortal";
                        ddlPortal.DataValueField = "IdPortal";
                        ddlPortal.DataBind();


                        eeListado.ObtenerDatosAExportar += this.eeListado_ObtenerDatosAExportar;
                        cargarfiltro();
                    }
                    catch (Exception ex)
                    {
                        ClaseUtilitarios util = new ClaseUtilitarios();
                        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                        throw new Exception();
                    }
                }


            }

        }

        private void cargarfiltro()
        {

            //****Cargar estados de solicitud
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            BL_AP_Contrato contrato = null;

            try
            {
                DataTable dtEstados = Solicitud.Estados();

                ddlEstadoApr.Items.Add(new ListItem("<Todos>", "0"));
                ddlEstadoPro.Items.Add(new ListItem("<Todos>", "0"));
                for (int i = 0; i <= dtEstados.Rows.Count - 1; i++)
                {
                    ddlEstadoPro.Items.Add(new ListItem(dtEstados.Rows[i]["nombre"].ToString(), dtEstados.Rows[i]["IdSolicitudEstado"].ToString()));
                }

                contrato = new BL_AP_Contrato();
                List<ENT_AP_Contrato> lstcontrato = new List<ENT_AP_Contrato>();
                lstcontrato = contrato.Listar();

                cbocontrato.Items.Add(new ListItem("Seleccione", "-1"));
                for (int k = 0; k < lstcontrato.Count; k++)
                {
                    cbocontrato.Items.Add(new ListItem(lstcontrato[k].Descripcion, lstcontrato[k].IdContratoTerminos.ToString()));
                }


                //**************Listar Tipo Solicitud****************
                BL_AP_TipoSolicitud TipoSolicitud = new BL_AP_TipoSolicitud();
                List<ENT_AP_TipoSolicitud> lstTipoSolicitud = TipoSolicitud.Listar();
                for (int i = 0; i < lstTipoSolicitud.Count; i++)
                {
                    ddlTipoTec.Items.Add(new ListItem(lstTipoSolicitud[i].Nombre, lstTipoSolicitud[i].IdTipoSolicitud.ToString()));
                    ddlTipo.Items.Add(new ListItem(lstTipoSolicitud[i].Nombre, lstTipoSolicitud[i].IdTipoSolicitud.ToString()));
                }
                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)Session["datos"];


                if (lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 1).Count() > 0)//Administrador
                {
                    trPorAsignar.Visible = true;
                    trEnProceso.Visible = true;
                    trPorAsignar.Style["Display"] = "";
                    trEnProceso.Style["Display"] = "";
                    btnProcesar.Visible = true;
                    btnAgregar.Visible = true;
                    btnEditar.Visible = true;
                    btnAsignar.Visible = true;
                    btnVerDetalle.Visible = true;
                    btnEnviar.Visible = true;
                    btnEliminar.Visible = true;
                    hdfAdmin.Value = "1";

                    tblSubirArchivo.Visible = true;
                    btnSubir.Visible = true;


                    return;
                }

                if (lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 2).Count() > 0)//Implementador
                {
                    trPorAsignar.Visible = true;
                    trEnProceso.Visible = true;
                    trPorAsignar.Style["Display"] = "";
                    trEnProceso.Style["Display"] = "";

                    btnVerDetalle.Visible = (lsDatosUsuario[0].TipoSolicitudTecnico.Where(x => x.Leer == true).Count() > 0 ? true : false);
                    btnProcesar.Visible = (lsDatosUsuario[0].TipoSolicitudTecnico.Where(x => x.Procesar == true).Count() > 0 ? true : false);
                    btnAsignar.Visible = (lsDatosUsuario[0].TipoSolicitudTecnico.Where(x => x.Asignar == true).Count() > 0 ? true : false);
                    btnEliminar.Visible = (lsDatosUsuario[0].TipoSolicitudTecnico.Where(x => x.Anular == true).Count() > 0 ? true : false);

                    return;
                }
                if (lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 3).Count() > 0) //Operador
                {

                    trEnProceso.Visible = true;
                    trEnProceso.Style["Display"] = "";
                    hdfOperador.Value = "1";
                    btnAgregar.Visible = true;
                    btnEditar.Visible = true;
                    btnEnviar.Visible = true;
                    btnVerDetalle.Visible = true;
                    tblLeyenda.Visible = false;
                    btnSubir.Visible = true;
                    tblSubirArchivo.Visible = true;
                    return;

                }

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object ListarSolicitud(string filtro, string codOrga, string campoordenar, string orden, int inPagTam, int inPagAct)
        {
            // string filtro,string campoordenar,string orden
            //BL_GEN_Codigo Codigo = new BL_GEN_Codigo();
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            //DataSet dtSolicitud = Solicitud.Listar(filtro, campoordenar, orden);
            //dtCodigo = Codigo.BuscarCodigo(filtro, codOrga, campoordenar, orden);
            //return JQGrid.DatosJSON(dtSolicitud.Tables[0], inPagTam, inPagAct);

            Solicitud.Dispose();
            return null;

        }

        [WebMethod()]
        public static string AsignarseSolicitud(string vcCodSol)
        {

            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();

            ENT_AP_SolicitudHistorico oSolicitudHistoricio = new ENT_AP_SolicitudHistorico();
            BL_AP_SolicitudHistorico SolicitudHistorico = new BL_AP_SolicitudHistorico();
            string DatoAntes = "";
            string DatoDespues = "";
            //int IdSolicitud = Convert.ToInt32(vcCodSol);
            string Resultado = "";

            try
            {
                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
                int IdUsuario = lsDatosUsuario[0].IdUsuario;

                //List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(Convert.ToInt32(vcCodSol));
                //int inEst = Convert.ToInt32(lsSolicitud[0].IdEstado.ToString()); 

                //if (inEst != 5)
                //{
                //    return "1";
                //}
                //else
                //{  
                //DatoAntes = Solicitud.SolicitudDatos(IdSolicitud);

                Resultado = Solicitud.AsignarseSolicitud(IdUsuario, vcCodSol);

                //DatoDespues = Solicitud.SolicitudDatos(IdSolicitud);
                //oSolicitudHistoricio.IdSolicitud = IdSolicitud;
                //oSolicitudHistoricio.IdUsuario = lsDatosUsuario[0].IdUsuario;
                //oSolicitudHistoricio.DatoAntes = DatoAntes;
                //oSolicitudHistoricio.DatoDespues = DatoDespues;
                //oSolicitudHistoricio.SolicitudEstado = "En Proceso";
                //SolicitudHistorico.Guardar(oSolicitudHistoricio);

                return Resultado;
                //}

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
                if (SolicitudHistorico != null) SolicitudHistorico.Dispose();
            }
        }

        [WebMethod()]
        public static string EnviarSolicitud(string vcCodSol)
        {

            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();

            ENT_AP_SolicitudHistorico oSolicitudHistoricio = new ENT_AP_SolicitudHistorico();
            BL_AP_SolicitudHistorico SolicitudHistorico = new BL_AP_SolicitudHistorico();
            string DatoAntes = "";
            string DatoDespues = "";
            //int IdSolicitud = Convert.ToInt32(vcCodSol);
            string Resultado = "";

            try
            {

                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
                int IdUsuario = lsDatosUsuario[0].IdUsuario;


                //List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(Convert.ToInt32(vcCodSol));
                //int inEst = Convert.ToInt32(lsSolicitud[0].IdEstado.ToString()); 

                int inEst = 1;

                if (inEst != 1)
                {
                    return "1";
                }
                else
                {
                    //DatoAntes = Solicitud.SolicitudDatos(IdSolicitud);

                    Resultado = Solicitud.EnviarSolicitud(IdUsuario, vcCodSol);

                    //DatoDespues = Solicitud.SolicitudDatos(IdSolicitud);
                    //oSolicitudHistoricio.IdSolicitud = IdSolicitud;
                    //oSolicitudHistoricio.IdUsuario = lsDatosUsuario[0].IdUsuario;
                    //oSolicitudHistoricio.DatoAntes = DatoAntes;
                    //oSolicitudHistoricio.DatoDespues = DatoDespues;
                    //oSolicitudHistoricio.SolicitudEstado = "Enviado";
                    //SolicitudHistorico.Guardar(oSolicitudHistoricio);
                }

                return Resultado;

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
                if (SolicitudHistorico != null) SolicitudHistorico.Dispose();
            }
        }

        [WebMethod()]
        public static string EliminarSolicitud(string inCodSol, string inTipSol)
        {

            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();

            ENT_AP_SolicitudHistorico oSolicitudHistoricio = new ENT_AP_SolicitudHistorico();
            BL_AP_SolicitudHistorico SolicitudHistorico = new BL_AP_SolicitudHistorico();
            string DatoAntes = "";
            string DatoDespues = "";
            int IdSolicitud = Convert.ToInt32(inCodSol);
            string Resultado = "";

            try
            {

                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
                int IdUsuario = lsDatosUsuario[0].IdUsuario;

                List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(Convert.ToInt32(inCodSol));
                int inEst = Convert.ToInt32(lsSolicitud[0].IdEstado.ToString());


                if (inEst == 1 || inEst == 5)
                {
                    DatoAntes = Solicitud.SolicitudDatos(IdSolicitud);

                    Resultado = Solicitud.AnularSolicitud(Convert.ToInt32(inCodSol), Convert.ToInt32(inTipSol));

                    DatoDespues = Solicitud.SolicitudDatos(IdSolicitud);
                    oSolicitudHistoricio.IdSolicitud = IdSolicitud;
                    oSolicitudHistoricio.IdUsuario = lsDatosUsuario[0].IdUsuario;
                    oSolicitudHistoricio.DatoAntes = DatoAntes;
                    oSolicitudHistoricio.DatoDespues = DatoDespues;
                    oSolicitudHistoricio.SolicitudEstado = "Anulado";
                    SolicitudHistorico.Guardar(oSolicitudHistoricio);

                }
                else
                {

                    return "1";
                }

                return Resultado;

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
                if (SolicitudHistorico != null) SolicitudHistorico.Dispose();
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object Listar(string vcTodos, string inPagTam, string inPagAct, string vcOrdCol, string vcTipOrdCol, string strTipos, int intFiltro, string strFiltro, string strFiltro2, string inTipFil,
        string biSolNoVis, string vcVista, string strRangFechaIni, string strRangFechaFin, string vcResAre, int inCodTip)
        {
            DataTable dtListaSolicitud = new DataTable();
            BL_AP_Solicitud Solicitud = null;

            try
            {
                Solicitud = new BL_AP_Solicitud();
                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];

                int IdUsuario = lsDatosUsuario[0].IdUsuario;



                if (lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 2).Count() == 1 && lsDatosUsuario[0].TipoSolicitudTecnico.Where(x => x.Leer == true).Count() == 0)
                {
                    return null;
                }
                else
                {
                    List<string> lsParametros = new List<string>();

                    lsParametros.Add(IdUsuario.ToString());
                    lsParametros.Add(vcVista.ToString());
                    lsParametros.Add(intFiltro.ToString());
                    lsParametros.Add(strFiltro.ToString());
                    lsParametros.Add(strFiltro2.ToString());
                    lsParametros.Add(strRangFechaIni.ToString());
                    lsParametros.Add(strRangFechaFin.ToString());
                    lsParametros.Add(vcOrdCol.ToString());
                    lsParametros.Add(vcTipOrdCol.ToString());

                    HttpContext.Current.Session["lstParametros"] = lsParametros;

                    DataSet dtSolicitud = Solicitud.Listar(IdUsuario, vcVista, intFiltro, strFiltro, strFiltro2, strRangFechaIni, strRangFechaFin, vcOrdCol, vcTipOrdCol);
                    return JQGrid.DatosJSON(dtSolicitud.Tables[0], Convert.ToInt32(inPagTam), Convert.ToInt32(inPagAct));
                }

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }

            //return new JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalPaginas")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("PaginaActual")), Convert.ToInt32(dsDetalle.Tables(0).Rows(0)("TotalRegistros")), dsDetalle.Tables(1), 1);           

        }

        protected void eeListado_ObtenerDatosAExportar(PcSistelMovil2Web.Common.Controles.ExportarExcelGenerico.TipoExcel oTipoExcel)
        {
            BL_AP_Solicitud Solicitud = null;

            try
            {
                Solicitud = new BL_AP_Solicitud();
                int IdUsuario, intFiltro;
                string vcVista, strFiltro, strFiltro2, strRangFechaIni, strRangFechaFin, vcOrdCol, vcTipOrdCol;
                List<string> lsParametros = new List<string>();
                lsParametros = (List<string>)Session["lstParametros"];
                string NombreHoja = "Solicitudes";
                List<Object> lstCampo = new List<object>();

                IdUsuario = Convert.ToInt32(lsParametros[0].ToString());
                vcVista = lsParametros[1].ToString();
                intFiltro = Convert.ToInt32(lsParametros[2].ToString());
                strFiltro = lsParametros[3].ToString();
                strFiltro2 = lsParametros[4].ToString();
                strRangFechaIni = lsParametros[5].ToString();
                strRangFechaFin = lsParametros[6].ToString();
                vcOrdCol = lsParametros[7].ToString();
                vcTipOrdCol = lsParametros[8].ToString();

                DataTable dtSolicitud = Solicitud.Listar(IdUsuario, vcVista, intFiltro, strFiltro, strFiltro2, strRangFechaIni, strRangFechaFin, vcOrdCol, vcTipOrdCol).Tables[0];
                dtSolicitud.Columns.Remove("IdSolicitud");
                dtSolicitud.Columns.Remove("IdSolicitudNotaVisto");
                dtSolicitud.Columns.Remove("IdTipoSolicitud");
                dtSolicitud.Columns.Remove("IdSolicitudEstado");
                dtSolicitud.Columns.Remove("IdTecnicoAsignado");
                dtSolicitud.Columns.Remove("IdUsuarioRegistro");
                dtSolicitud.Columns.Remove("IdOperador");
                dtSolicitud.Columns.Remove("IdColaEstado");
                dtSolicitud.Columns.Remove("EstadoCola");
                dtSolicitud.Columns.Remove("IdColaAProvisionamiento");
                dtSolicitud.AcceptChanges();

                eeListado.ExportarDatosPersonalizados(dtSolicitud, NombreHoja);
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }
        
        [WebMethod()]
        public static string UpgradeSolicitud(int vcCodSol)
        {

            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();

            string Resultado = "";

            try
            {

                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
                int IdUsuario = lsDatosUsuario[0].IdUsuario;
                string nombrepc = HttpContext.Current.Session["NombrePc"].ToString();

                Resultado = Solicitud.UpgradeSolicitud(vcCodSol, IdUsuario, nombrepc);

                return Resultado;


            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }
        
        [WebMethod()]
        public static string EnviarCorreoCliente(int IdSolicitud)
        {

            ClaseUtilitarios util = new ClaseUtilitarios();
            //Exception exMensaje;
            //exMensaje = new Exception("1");
            //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

            string strResultado = "Correo enviado correctamente";

            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            BL_AP_Licencia Licencia = new BL_AP_Licencia();
            BL_AP_Dominio Dominio = new BL_AP_Dominio();
            BL_AP_Empresa Empresa = new BL_AP_Empresa();

            try
            {
                //exMensaje = new Exception("2");
                //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

                List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(IdSolicitud);
                CompCorreo.CCorreo cCorreo = new CompCorreo.CCorreo();

                //exMensaje = new Exception("3");
                //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

                if (lsSolicitud != null && lsSolicitud.Count > 0)
                {
                    ENT_AP_Solicitud oSolicitud = lsSolicitud[0];

                    ENT_AP_Dominio oDominio = Dominio.MostrarPorSolicitud(IdSolicitud);
                    ENT_AP_Empresa oEmpresa = Empresa.Mostrar(oDominio.IdEmpresa)[0];


                    //exMensaje = new Exception("4");
                    //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

                    string UbicPlantilla = HttpContext.Current.Server.MapPath("~/") + "Common\\Plantillas\\PlantillaCorreoActivarLicencia.html";
                    string Asunto = ConfigurationManager.AppSettings["PlantillaActivarLicencia_Asunto"].ToString();
                    string NombreServicio = ConfigurationManager.AppSettings["PlantillaActivarLicencia_NombreServicio"].ToString();
                    string EmailFrom = ConfigurationManager.AppSettings["PlantillaActivarLicencia_EmailFrom"].ToString();
                    string URLPortal = ConfigurationManager.AppSettings["PlantillaActivarLicencia_URLPortal"].ToString();


                    //exMensaje = new Exception("5");
                    //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");


                    Asunto = Asunto.Replace("@NombreServicio", NombreServicio);

                    foreach (var oTitular in oEmpresa.Titulares)
                    {

                        try
                        {

                            //exMensaje = new Exception("6");
                            //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");


                            string CuerpoMensaje = string.Empty;
                            string Destinatario = oTitular.Correo;

                            CuerpoMensaje = TraeCuerpoCorreo(UbicPlantilla);
                            CuerpoMensaje = CuerpoMensaje.Replace("@EmailFrom", EmailFrom);
                            CuerpoMensaje = CuerpoMensaje.Replace("@NombreServicio", NombreServicio);
                            CuerpoMensaje = CuerpoMensaje.Replace("@NombreCompletoUsuario", (oTitular.Apellidos + " " + oTitular.Nombres).ToUpper());
                            CuerpoMensaje = CuerpoMensaje.Replace("@username", oTitular.Usuario + "@" + oSolicitud.Dominio + "." + oSolicitud.Pais.Codigo);
                            CuerpoMensaje = CuerpoMensaje.Replace("@password", Cryptographics.DecryptString(oTitular.Contrasena));
                            CuerpoMensaje = CuerpoMensaje.Replace("@URLPortal", URLPortal);
                            CuerpoMensaje = CuerpoMensaje.Replace("@NombreEmpresa", oSolicitud.NombreEmpresa);
                            CuerpoMensaje = CuerpoMensaje.Replace("@FechaInicioContrato", oSolicitud.FechaInicioContrato);
                            CuerpoMensaje = CuerpoMensaje.Replace("@FechaFinContrato", oSolicitud.FechaFinContrato);
                            ENT_AP_Licencia oLicencia = Licencia.Obtener(oSolicitud.IdTipoLicencia);

                            //exMensaje = new Exception("7");
                            //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

                            CuerpoMensaje = CuerpoMensaje.Replace("@TipoServicio", oLicencia.Nombre);
                            CuerpoMensaje = CuerpoMensaje.Replace("@CantidadLineas", oSolicitud.Lineas.ToString());

                            if (Destinatario != string.Empty)
                            {
                                try
                                {
                                    //exMensaje = new Exception("8");
                                    //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");




                                    cCorreo.Enviar(false, Destinatario, Asunto, CuerpoMensaje, null, false, "");

                                    //exMensaje = new Exception("9");
                                    //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");


                                }
                                catch (Exception ex)
                                {
                                    //exMensaje = new Exception("8.1");
                                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

                                    strResultado = "Error al enviar correo. Detalle: " + ex.ToString();
                                    throw;
                                }
                            }
                            else
                            {
                                strResultado = "No se encontraron destinatarios";
                            }


                        }
                        catch (Exception ex2)
                        {
                            util.GrabarLog(ex2, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                            throw;
                        }
                    }

                }
            }
            catch (Exception ex3)
            {
                util.GrabarLog(ex3, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
                if (Licencia != null) Licencia.Dispose();
                if (Dominio != null) Dominio.Dispose();
                if (Empresa != null) Empresa.Dispose();
            }

            //exMensaje = new Exception("10");
            //util.GrabarLog(exMensaje, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

            return strResultado;
        }
        
        public static string TraeCuerpoCorreo(string Plantilla)
        {
            StringBuilder Cuerpo = new StringBuilder();
            StreamReader objReader = new StreamReader(Plantilla);
            string sLine = "";

            while ((sLine != null))
            {
                sLine = objReader.ReadLine();
                if ((sLine != null))
                {
                    Cuerpo.Append(sLine);
                }
            }
            objReader.Close();
            return Cuerpo.ToString();
        }

        [WebMethod()]
        public static string ActualizarEstadoSuscripcion(int pIdSubscripcion, int pIdTarea)
        {
            string resultado = string.Empty;

            BL_AP_Solicitud Solicitud = null;
            BL_AP_TipoSolicitud TipoSolicitud = null;
            CCorreo cCorreoobj = null;
            
            try
            {
                Solicitud = new BL_AP_Solicitud();
                TipoSolicitud = new BL_AP_TipoSolicitud();

                resultado = Solicitud.SolicitudCulminarCargaDatos(pIdSubscripcion, pIdTarea);

                //ECONDEÑA  20170322    Se comenta debido a que se envía mediante otro evento(botón enviar correo)
                ////envio de correo de culminación de solicitud - wapumayta 14-01-2016
                //string[] lstResult = resultado.Split('|');
                //if (lstResult[2] == "1")
                //{
                //    DataTable dtCorreo = TipoSolicitud.CorreoServicioTitulares(pIdSubscripcion);
                //    foreach (DataRow dr in dtCorreo.Rows)
                //    {
                //        string IdUsuarioRemitente = pIdUsuario.ToString();
                //        string ResultadoEnvio = string.Empty;
                //        string Destinatario = dr["Destinatarios"] == DBNull.Value ? "" : dr["Destinatarios"].ToString();
                //        string Asunto = dr["Asunto"] == DBNull.Value ? "" : dr["Asunto"].ToString();
                //        string Mensaje = dr["Mensaje"] == DBNull.Value ? "" : dr["Mensaje"].ToString();
                //        string Contrasena = dr["Contrasena"] == DBNull.Value ? "" : dr["Contrasena"].ToString();
                //        Mensaje = Mensaje.Replace(Contrasena, Cryptographics.DecryptString(Contrasena));

                //        if (Destinatario != null && Destinatario != "")
                //        {
                //            //ResultadoEnvio = cCorreoobj.Enviar(false, Destinatario, Asunto, Mensaje);
                //            Solicitud.Registrar_Cola_EnvioCorreo(Asunto, Mensaje, IdUsuarioRemitente, Destinatario);
                //        }

                //    }
                //}
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
                if (TipoSolicitud != null) TipoSolicitud.Dispose();
                if (cCorreoobj != null) ((IDisposable)cCorreoobj).Dispose();
            }

            return resultado;
        }

        [WebMethod()]
        public static List<ENT_AP_Tarea> TareasPendientes(int IdSolicitud)
        {
            List<ENT_AP_Tarea> lstResult = new List<ENT_AP_Tarea>();
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            try
            {
                lstResult = Solicitud.TareasPorCulminar(IdSolicitud);

                return lstResult;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }

        }
        
        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> Listar_Servidores_Instancias_BD()
        {
            BL_AP_Servidor Servidor = null;

            try
            {
                Servidor = new BL_AP_Servidor();
                List<ENT_AP_Servidor> lsServidorInstancia = Servidor.Listar_Servidores_Instancias_BD();
                return lsServidorInstancia;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> Listar_Servidores_Instancias_APP()
        {
            BL_AP_Servidor Servidor = null;

            try
            {
                Servidor = new BL_AP_Servidor();
                List<ENT_AP_Servidor> lsServidorInstancia = Servidor.Listar_Servidores_Instancias_APP();
                return lsServidorInstancia;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> Listar_Servidores_Instancias_WEB()
        {
            BL_AP_Servidor Servidor = null;

            try
            {
                Servidor = new BL_AP_Servidor();
                List<ENT_AP_Servidor> lsServidorInstancia = Servidor.Listar_Servidores_Instancias_WEB();
                return lsServidorInstancia;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }
        
        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> ListarServidorEspacio()
        {
            BL_AP_Servidor Servidor = null;

            try
            {
                Servidor = new BL_AP_Servidor();
                List<ENT_AP_Servidor> lstServidor = Servidor.ListarEspacio();
                return lstServidor;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> ListarServidorAPP()
        {
            BL_AP_Servidor Servidor = null;

            try
            {
                Servidor = new BL_AP_Servidor();
                List<ENT_AP_Servidor> lstServidor = Servidor.ListarServidorAPP();
                return lstServidor;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> ListarServidorWEB()
        {
            BL_AP_Servidor Servidor = null;

            try
            {
                Servidor = new BL_AP_Servidor();
                List<ENT_AP_Servidor> lstServidor = Servidor.ListarServidorWEB();
                return lstServidor;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }
        
        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Contrato> ListarContrato()
        {
            BL_AP_Contrato contrato = null;

            try
            {
                contrato = new BL_AP_Contrato();
                List<ENT_AP_Contrato> lstcontrato = contrato.Listar();
                return lstcontrato;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (contrato != null) contrato.Dispose();
            }
        }

        [WebMethod()]
        public static List<ENT_AP_InstanciaBD> ListarInstanciaBD(int IdServidor)
        {
            BL_AP_InstanciaBD InstanciaBD = null;
            List<ENT_AP_InstanciaBD> lstTipoSolicitud = null;

            try
            {
                InstanciaBD = new BL_AP_InstanciaBD();
                lstTipoSolicitud = new List<ENT_AP_InstanciaBD>();

                lstTipoSolicitud = InstanciaBD.Listar(IdServidor);
                return lstTipoSolicitud;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (InstanciaBD != null) InstanciaBD.Dispose();
                if (lstTipoSolicitud != null) lstTipoSolicitud = null;
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_InstanciaAPP> ListarInstanciaAPP(int IdServidor)
        {
            BL_AP_InstanciaAPP InstanciaAPP = null;

            try
            {
                InstanciaAPP = new BL_AP_InstanciaAPP();
                List<ENT_AP_InstanciaAPP> lstServidorAPP = InstanciaAPP.ListarxServidor(IdServidor);
                return lstServidorAPP;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (InstanciaAPP != null) InstanciaAPP.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Solicitud> ListarUnaSolicitud(int IdSolicitud)
        {
            BL_AP_Solicitud Solicitud = null;
            try
            {
                Solicitud = new BL_AP_Solicitud();
                List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(IdSolicitud);
                return lsSolicitud;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Solicitud> ListarMultipleSolicitud(string IdSolicitud)
        {
            BL_AP_Solicitud Solicitud = null;

            try
            {
                Solicitud = new BL_AP_Solicitud();
                List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarMultiple(IdSolicitud);
                return lsSolicitud;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }

        [WebMethod]
        public static string registrarCola(string prSolicitud)
        {
            string cadena = prSolicitud;

            BL_AP_Solicitud Solicitud = null;
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            List<ENT_AP_Usuario> lsDatosUsuario = null;

            try
            {
                Solicitud = new BL_AP_Solicitud();

                ENT_AP_Solicitudes oSolicitud = oSerializer.Deserialize<ENT_AP_Solicitudes>(prSolicitud);
                ENT_AP_ColaAprovisionamiento oColaAprovisionamiento = new ENT_AP_ColaAprovisionamiento();

                lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];

                for (int k = 0; k < oSolicitud.Solicitud.Count; k++)
                {
                    oSolicitud.Solicitud[k].IdUsuarioRegistro = lsDatosUsuario[0].IdUsuario;
                    oSolicitud.Solicitud[k].TecnicoProcesar = lsDatosUsuario[0].IdUsuario;

                    if (oSolicitud.Solicitud[k].LogoNombre == "")
                    {
                        oSolicitud.Solicitud[k].Logo = null;
                    }
                    else
                    {
                        string strfn = HttpContext.Current.Server.MapPath("~\\Temporal\\" + oSolicitud.Solicitud[k].LogoNombre);
                        FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);

                        FileInfo fileinfo = new FileInfo(strfn);
                        byte[] data = new byte[fileinfo.Length];

                        oSolicitud.Solicitud[k].Logo = data;
                        fs.Flush();
                        fs.Close();
                    }
                }

                oColaAprovisionamiento.NombrePC = HttpContext.Current.Session["NombrePc"].ToString();
                oColaAprovisionamiento.IdColaEstado = 1;

                return Solicitud.ProcesarMasivo(oSolicitud.Solicitud, oColaAprovisionamiento);
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
                if (lsDatosUsuario != null) lsDatosUsuario = null;
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Dominio> CargarDominios()
        {
            BL_AP_Dominio oDominio = null;

            try
            {
                oDominio = new BL_AP_Dominio();
                return oDominio.ListarDominios();
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (oDominio != null) oDominio.Dispose();
            }
        }

        [WebMethod(EnableSession = true)]
        public static string ObtenerValoresConfiguracion()
        {
            string str_valor = null;

            try
            {
                str_valor = System.Configuration.ConfigurationManager.AppSettings["TamanioBaseMovil_MB"].ToString();
                return str_valor;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                return str_valor;
            }
            finally
            {
                if (str_valor != null) str_valor = null;
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Portal> ListarPortal()
        {
            BL_AP_Portal portal = null;

            try
            {
                portal = new BL_AP_Portal();
                List<ENT_AP_Portal> lstPortal = portal.Listar();
                return lstPortal;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (portal != null) portal.Dispose();
            }
        }

        [WebMethod]
        public static int EnviarCorreo(string lstCodigoSolicitud)
        {
            BL_DOM_Dominio oBLDominio = null;
            BL_AP_Solicitud bl_solicitud = null;
            BL_SIS_Configuracion bl_configuracion = null;
            BL_SIS_Cola Cola = null;
            int retorno = 0;
            try
            {
                Cola = new BL_SIS_Cola();
                bl_configuracion = new BL_SIS_Configuracion();
                ENT_SIS_Configuracion configuracion = bl_configuracion.Obtener(1);
                string urlPortal = configuracion.Valor;

                bl_solicitud = new BL_AP_Solicitud();
                List<string> lstSolicitudes = lstCodigoSolicitud.Split(',').ToList();

                for (int i = 0; i < lstSolicitudes.Count; i++)
                {
                    bool resultado = false;
                    string tablaHTML = string.Empty;
                    string filaHTML = string.Empty;
                    string textoPlantilla = TraeCuerpoCorreo(HttpContext.Current.Server.MapPath("~/Common/Plantillas/EnvioCorreoAprovisionamiento.html"));

                    int idSolicitud = Convert.ToInt32(lstSolicitudes[i]);
                    DataTable dtDatos = bl_solicitud.ListarDatosTitularesEnvioCorreo(idSolicitud);

                    for (int j = 0; j < dtDatos.Rows.Count; j++)
                    {
                        string datosUsuario = "";
                        string[] lstResult;
                        if (dtDatos.Rows[j]["Correo"].ToString() != "")
                        {
                            oBLDominio = new BL_DOM_Dominio();
                            ENT_DOM_Dominio oDominio = oBLDominio.ObtenerDominioById(Convert.ToInt32(dtDatos.Rows[j]["IdDominio"]));
                            string serviceMovil = "";
                            string formato = "http{0}://{1}{2}{3}{4}";
                            serviceMovil = string.Format(formato, oDominio.Aplicacion.UsaSCL ? "s" : "", oDominio.Aplicacion.Servidor.Ip, oDominio.Aplicacion.Puerto == "" ? "" : ":" + oDominio.Aplicacion.Puerto, oDominio.Aplicacion.Nombre == "" ? "" : "/" + oDominio.Aplicacion.Nombre, "/Common/WebService/General.asmx");
                            try
                            {
                                VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.GeneralSoapClient oGenreal = new VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.GeneralSoapClient();

                                oGenreal.Endpoint.Address = new System.ServiceModel.EndpointAddress(serviceMovil);
                                if (serviceMovil.ToLower().Contains("https://"))
                                {
                                    BasicHttpBinding binding1 = new BasicHttpBinding();
                                    binding1.Name = "GeneralSoap";
                                    binding1.Security.Mode = BasicHttpSecurityMode.Transport;
                                    oGenreal.Endpoint.Binding = binding1;
                                    System.Net.ServicePointManager.ServerCertificateValidationCallback += (se, cert, chain, sslerror) => true;
                                }

                                VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.Credenciales misCredenciales = new VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.Credenciales();
                                misCredenciales.Usuario = "v1su@ls0ft";
                                misCredenciales.Password = "v1su@ls0ft";
                                oGenreal.Test_Test(misCredenciales, 10);

                                datosUsuario = oGenreal.Obtener_DatosUsuario(misCredenciales, oDominio.IdDominio, Convert.ToInt32(dtDatos.Rows[j]["IdUsuario"])).ToString();
                                lstResult = datosUsuario.Split('|');
                            }
                            catch (Exception ex)
                            {
                                ClaseUtilitarios util = new ClaseUtilitarios();
                                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                                continue;
                            }

                            string vcUsuario = string.Empty;
                            string vcClave = string.Empty;
                            if (lstResult.Length > 0)
                            {
                                vcUsuario = Cryptographics.DecryptString(lstResult[0]) + "@" + dtDatos.Rows[j]["Dominio"] + "." + dtDatos.Rows[j]["CodigoPais"];
                                vcClave = Cryptographics.DecryptString(lstResult[1]);
                            }
                            else
                            {
                                vcUsuario = dtDatos.Rows[j]["UsuarioAcceso"].ToString();
                                vcClave = Cryptographics.DecryptString(dtDatos.Rows[j]["Clave"].ToString());
                            }

                            tablaHTML = "<center><table style='border-collapse: collapse;width:320px;margin: auto; width: 350px;text-align:center;border: 1px solid #ddd;font-family: Helvetica, Arial, Verdana, sans-serif; font-size: 11.5px;'><tr><th style=''>Usuario</th><th>Clave de Acceso</th><tr>";
                            filaHTML = "<tr style='border: 1px solid #ddd;'><td style='text-align:center;'>" + vcUsuario + "</td><td style='width:115px;text-align:center;'>" + vcClave + "</td></tr>";
                            tablaHTML = tablaHTML + filaHTML;
                            tablaHTML = tablaHTML + "</table></center>";

                            string nombreTitular = dtDatos.Rows[j]["NombreTitular"].ToString();
                            string mensaje = string.Format(textoPlantilla, dtDatos.Rows[j]["Empresa"], dtDatos.Rows[j]["Ruc"], nombreTitular, dtDatos.Rows[j]["Codigo"], dtDatos.Rows[j]["FechaRegistro"],
                                urlPortal, tablaHTML, DateTime.Now.ToString("dd/MM/yyyy hh:mm tt"));
                            //mensaje = mensaje.Replace("<style></style>", "<style> .format{font-weight:bold;font-size: 12px;} table,td,th {text-align: left;}table {border-collapse: collapse;width:320px;}th, td {padding: 5px;}th{text-align:center;}</style>");

                            ENT_SIS_Cola eCola = new ENT_SIS_Cola();
                            eCola.Asunto = "Culminación de Aprovisionamiento: Código Suscripción: " + dtDatos.Rows[j]["Codigo"];
                            eCola.De = "";
                            eCola.Para = dtDatos.Rows[j]["Correo"].ToString();
                            eCola.Mensaje = mensaje;
                            eCola.EsHtml = true;
                            //eCola.Archivos.Add(eArchivo);
                            Cola.Insertar(eCola);

                            resultado = bl_solicitud.ActualizarEnvioCorreo(idSolicitud);
                        }
                    }
                    if (resultado)
                        retorno++;
                }

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (bl_solicitud != null) bl_solicitud.Dispose();
                if (bl_configuracion != null) bl_configuracion.Dispose();
                if (Cola != null) Cola.Dispose();
                if (oBLDominio != null) oBLDominio.Dispose();
            }
            return retorno;
        }
    }

}