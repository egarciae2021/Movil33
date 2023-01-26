using System;
using System.Collections.Generic;
using System.Linq;
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

namespace PcSistelMovil2Web.Solicitudes
{
    public partial class Adm_NuevaSolicitud : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Session["datos"] == null))
            {
                Response.BufferOutput = true;
                string script = "window.top.location.reload();";
                this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);

                return;

            }
            if (!Page.IsPostBack)
            {
                BL_AP_Pais Pais = new BL_AP_Pais();
                try
                {
                    ddlPais.DataSource = Pais.Listar();
                    ddlPais.DataTextField = "Nombre";
                    ddlPais.DataValueField = "IdPais";
                    ddlPais.DataBind();

                    BL_AP_Licencia Licencia = new BL_AP_Licencia();
                    //ddLicencia.DataSource = Licencia.Listar();
                    //ddLicencia.DataTextField = "Nombre";
                    //ddLicencia.DataValueField = "IdLicencia";
                    //ddLicencia.DataBind();

                    List<ENT_AP_Licencia> lstLicencias = Licencia.Listar();
                    for (int i = 0; i < lstLicencias.Count; i++)
                    {
                        ListItem item = new ListItem(lstLicencias[i].Nombre, lstLicencias[i].IdLicencia.ToString(), true);
                        item.Attributes["NumeroUsuario"] = lstLicencias[i].NumeroUsuario.ToString();
                        ddLicencia.Items.Insert(i, item);
                    }


                    List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
                    int IdUsuario = lsDatosUsuario[0].IdUsuario;


                    if (lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 1).Count() > 0)
                    {
                        hdfOperador.Value = "";
                    }
                    else
                    {
                        hdfOperador.Value = lsDatosUsuario[0].Operador.IdOperador.ToString(); ;
                    }



                    if (Request.QueryString["IdSolicitud"] != null)
                    {
                        int IdSolicitud = Convert.ToInt32(Request.QueryString["IdSolicitud"]);
                        hdfIdSolicitud.Value = Request.QueryString["IdSolicitud"].ToString();
                        tbTipo.Visible = false; //Oculta combo de selección tipo solicitud

                        string sololectura = Request.QueryString["sololectura"];
                        //DataTable dtUsuario = (DataTable)HttpContext.Current.Session["datos"];
                        //int perfil = (int)dtUsuario.Rows[0]["IdPerfil"];
                        int perfil = 1;



                        BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
                        List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(IdSolicitud);

                        int inEst = Convert.ToInt32(lsSolicitud[0].IdEstado.ToString());


                        if (sololectura == "1" || (inEst != 1 && lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 3).Count() == 1))
                        {

                            txtnomempresa.ReadOnly = true;
                            txtrazon.ReadOnly = true;
                            txtRuc.ReadOnly = true;
                            ddlPais.Enabled = false;
                            txtFechaI.Enabled = false;
                            txtFechaFin.Enabled = false;
                            txtObs.ReadOnly = true;
                            txtdesc.ReadOnly = true;
                            ddLicencia.Enabled = false;
                            txtLineas.ReadOnly = true;
                            btnFinalizar.Visible = false;
                            tdADDTitulares.Visible = false;

                        }


                        if (lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 2).Count() == 1 && lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 1).Count() == 0)
                        {
                            btnFinalizar.Visible = false;
                        }

                        if (lsSolicitud[0].IdTipoSolicitud != 1)
                        {
                            txtnomempresa.ReadOnly = true;
                            txtrazon.ReadOnly = true;
                            txtRuc.ReadOnly = true;
                            ddlPais.Enabled = false;
                            txtObs.ReadOnly = true;
                            txtdesc.ReadOnly = true;
                            txtLineas.ReadOnly = true;
                            tdADDTitulares.Visible = true;
                        }

                        hdfEditar.Value = "1";
                        hdfTipoGuardar.Value = "2";
                    }
                    else
                    {
                        hdfTipoGuardar.Value = "1";
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
                    if (Pais != null) Pais.Dispose();
                }

            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_TipoSolicitud> ListarTipoSolicitud()
        {

            BL_AP_TipoSolicitud TipoSolicitud = new BL_AP_TipoSolicitud();
            List<ENT_AP_TipoSolicitud> lstTipoSolicitud = new List<ENT_AP_TipoSolicitud>();
            lstTipoSolicitud = TipoSolicitud.Listar();
            try
            {
                return lstTipoSolicitud;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
            finally
            {
                if (TipoSolicitud != null) TipoSolicitud.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Solicitud> ListarUnaSolicitud(int IdSolicitud)
        {
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            try
            {
                //int IdSolicitud = Convert.ToInt32(Request.QueryString["IdSolicitud"]);


                List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(IdSolicitud);
                lsSolicitud[0].Logo = null;
                return lsSolicitud;
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Solicitud> ListarxEmpresa(int IdEmpresa)
        {
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            try
            {
                //int IdSolicitud = Convert.ToInt32(Request.QueryString["IdSolicitud"]);


                List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUnoxEmpresa(IdEmpresa);
                return lsSolicitud;
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }

        [WebMethod()]
        public static int Guardar(string oDominio)
        {
            
            try
            {

                if (HttpContext.Current.Session["dtListaSolicitud"] == null)
                {
                    DataTable dtListaSolicitud = new DataTable();
                    dtListaSolicitud.Columns.Add("P_inCodSol", typeof(int));
                    dtListaSolicitud.Columns.Add("Visto", typeof(bool));
                    dtListaSolicitud.Columns.Add("vcCodigo", typeof(string));
                    dtListaSolicitud.Columns.Add("dtFecSol", typeof(string));
                    dtListaSolicitud.Columns.Add("inTipSol", typeof(int));
                    dtListaSolicitud.Columns.Add("vcNomTipSol", typeof(string));
                    dtListaSolicitud.Columns.Add("F_inEstSol", typeof(int));
                    dtListaSolicitud.Columns.Add("vcNomEst", typeof(string));
                    dtListaSolicitud.Columns.Add("vcUsuTec", typeof(string));
                    dtListaSolicitud.Columns.Add("idUsuaroiCreacion", typeof(int));
                    dtListaSolicitud.Columns.Add("nombreusuariocrecion", typeof(string));
                    dtListaSolicitud.Columns.Add("idOperador", typeof(int));
                    dtListaSolicitud.Columns.Add("nombreOperador", typeof(string));
                    dtListaSolicitud.Columns.Add("vcAutDesPDF", typeof(int));
                    HttpContext.Current.Session["dtListaSolicitud"] = dtListaSolicitud;
                }



                JavaScriptSerializer oSerializer = new JavaScriptSerializer();
               //object dict = new object();
               //dict = oSerializer.DeserializeObject(oDominio);

                Solicitud v_dominio = oSerializer.Deserialize<Solicitud>(oDominio);

                DataTable dtListaSolicitudes = (DataTable)HttpContext.Current.Session["dtListaSolicitud"];

                dtListaSolicitudes.Rows.Add(dtListaSolicitudes.Rows.Count + 1, true, DateTime.Today.ToShortDateString(), dtListaSolicitudes.Rows.Count + 2, 1, "Alta", 1, "Pendiente", "Wilmer Wapumayta", 33, "Silupu", 22, v_dominio.NombreEmpresa, 1);

                HttpContext.Current.Session["dtListaSolicitud"] = dtListaSolicitudes;
          

             
                int resultado = 0;
                return resultado;
            }
            catch (Exception ex)
            {
                return 1;
            }

        }

        [WebMethod]
        public static string registrarEditar_Solicitud(string prSolicitud, string TipoGuardar)
        {
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_AP_Solicitud oSolicitud = oSerializer.Deserialize<ENT_AP_Solicitud>(prSolicitud);
                ENT_AP_SolicitudHistorico oSolicitudHistoricio = new ENT_AP_SolicitudHistorico();
                BL_AP_SolicitudHistorico SolicitudHistorico = new BL_AP_SolicitudHistorico();
                string DatoAntes = "";
                string DatoDespues = "";
                int IdSolicitud;
                

                if (oSolicitud.FechaFinContrato.ToString() != "")
                {
                    if (oSolicitud.FechaInicioContrato.ToString() == "")
                    {
                        return "2";
                    }
                    int DiferenciaFecha = DateTime.Compare(Convert.ToDateTime(oSolicitud.FechaFinContrato.ToString()), Convert.ToDateTime(oSolicitud.FechaInicioContrato.ToString()));
                    if (DiferenciaFecha < 1)
                    {
                        return "2";
                    }
                }
                if (TipoGuardar =="1")
                {
                    DatoAntes = "Es Nuevo";
                    
                }
                else
                {
                    DatoAntes = Solicitud.SolicitudDatos(oSolicitud.IdSolicitud);
                }              

              

                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];

                oSolicitud.IdOperador = lsDatosUsuario[0].Operador.IdOperador;
                oSolicitud.IdUsuarioRegistro = lsDatosUsuario[0].IdUsuario;
                oSolicitud.IdEstado = 1; //1 Pendiente
              
                IdSolicitud= Convert.ToInt32(Solicitud.Guardar(oSolicitud, Convert.ToInt32(TipoGuardar)));

                DatoDespues = Solicitud.SolicitudDatos(IdSolicitud);
                               
                oSolicitudHistoricio.IdSolicitud = IdSolicitud;
                oSolicitudHistoricio.IdUsuario = lsDatosUsuario[0].IdUsuario;
                oSolicitudHistoricio.DatoAntes = DatoAntes;
                oSolicitudHistoricio.DatoDespues = DatoDespues;
                oSolicitudHistoricio.SolicitudEstado = "Pendiente";

                SolicitudHistorico.Guardar(oSolicitudHistoricio);

                return "ok";

            }
            catch (Exception)
            {
                return "1";
                throw;
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }

        [WebMethod()]
        public static List<ENT_AP_Empresa> ListarEmpresa_x_Criterio(string vcCriterio, string Operador)
        {
            BL_AP_Empresa Empresa = new BL_AP_Empresa();
            try
            {
                //BL_GEN_Servicio Servicio = new BL_GEN_Servicio(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);

                List<ENT_AP_Empresa> _return = Empresa.ListarxCriterio(vcCriterio, Operador);
                //Servicio.Dispose();
                return _return;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
            finally
            {
                if (Empresa != null) Empresa.Dispose();
            }
        }

         public  class Solicitud
        {
             public Solicitud()
             {
                 _Titulares = new List<SolicitudTitular>();
                }
             public string NombreEmpresa { get; set; }
             public string RazonSocial { get; set; }
             public int CodPais { get; set; }
             public string Ruc { get; set; }
             public string FechaInicial { get; set; }
             public string FechaFinal { get; set; }
             public string Observacion { get; set; }
             public string Descripcion { get; set; }
             public string TipoLicencia { get; set; }
             public string Lineas { get; set; }
             DateTime FechaInicioContrato { get; set; }
             DateTime FechaFinContrato { get; set; }

             List<SolicitudTitular> _Titulares;

             public List<SolicitudTitular> Titulares
             {
                 get { return _Titulares; }
                 set { _Titulares = value; }
             }  
             
        }

         public class SolicitudTitular
         {
             public string nombre { get; set; }
             public string apellido { get; set; }
             public string correo { get; set; }
         }


    }
}