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

namespace PcSistelMovil2Web.Mantenimiento
{
    public partial class Mnt_InstanciaAPP : System.Web.UI.Page
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
                BL_AP_InstanciaAPP InstanciaAPP = new BL_AP_InstanciaAPP();
                try
                {
                    string P_inCod = Request.QueryString["Cod"];
                    ListarServidores();
                    ListarEndpoints();

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdInstanciaAPP.Value = P_inCod;
                        ENT_AP_InstanciaAPP oInstanciaAPP = InstanciaAPP.Mostrar(Convert.ToInt32(P_inCod));

                        txtNombre.Text = oInstanciaAPP.NombreAPP;
                        ddlServidor.SelectedValue = oInstanciaAPP.Servidor.IdServidor.ToString();
                        hdfIdEndpoint.Value = oInstanciaAPP.Endpoint.IdEndpoint.ToString();
                        txtPuerto.Text = oInstanciaAPP.Puerto;
                        txtPaginaInicio.Text = oInstanciaAPP.PaginaInicio;
                        txtcantUsuarios.Text = oInstanciaAPP.CantidadUsuarios.ToString();
                        chkSSL.Checked = oInstanciaAPP.UsaSCL;

                        if (txtNombre.Text.Trim() == "")
                        {
                            chkUsaInstancia.Checked = true;
                        }
                    }
                    else
                    {
                        hdfIdInstanciaAPP.Value = "0";
                        hdfIdEndpoint.Value = "0";
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
                    if (InstanciaAPP != null) InstanciaAPP.Dispose();
                }
            }
        }

        public void ListarServidores()
        {
            BL_AP_Servidor Servidor = new BL_AP_Servidor();

            try
            {
                ddlServidor.DataSource = Servidor.Listar();
                ddlServidor.DataValueField = "IdServidor";
                ddlServidor.DataTextField = "Nombre";
                ddlServidor.DataBind();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Endpoint> ListarEndpoints()
        {
            BL_AP_Endpoint Endpoint = new BL_AP_Endpoint();
            List<ENT_AP_Endpoint> lstEndpoint = new List<ENT_AP_Endpoint>();

            try
            {
                lstEndpoint = Endpoint.Listar();
                return lstEndpoint;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Endpoint != null) Endpoint.Dispose();
            }
        }

        [WebMethod]
        public static int Guardar(string oInstanciaAPP)
        {
            BL_AP_InstanciaAPP InstanciaAPP = new BL_AP_InstanciaAPP();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_InstanciaAPP V_oInstanciaBD = oSerializer.Deserialize<ENT_AP_InstanciaAPP>(oInstanciaAPP);

                if (V_oInstanciaBD.IdInstanciaAPP == 0)
                {
                    return InstanciaAPP.Insertar(V_oInstanciaBD);
                }
                else
                {
                    return InstanciaAPP.Actualizar(V_oInstanciaBD);
                }


                return 0;

            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (InstanciaAPP != null) InstanciaAPP.Dispose();
            }
        }
    }
}