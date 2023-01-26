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
    public partial class Mnt_Endpoint : System.Web.UI.Page
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
                BL_AP_Endpoint Endpoint = new BL_AP_Endpoint();
                try
                {
                    string P_inCod = Request.QueryString["Cod"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdEndpoint.Value = P_inCod;

                        ENT_AP_Endpoint oEndpoint = Endpoint.Mostrar(Convert.ToInt32(P_inCod));

                        txtCodigo.Text = oEndpoint.Codigo;
                        txtNombre.Text = oEndpoint.Nombre;
                    }
                    else
                    {
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
                    if (Endpoint != null) Endpoint.Dispose();
                }
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
        public static int Guardar(string oEndpoint)
        {
            BL_AP_Endpoint Endpoint = new BL_AP_Endpoint();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Endpoint V_oEndpoint = oSerializer.Deserialize<ENT_AP_Endpoint>(oEndpoint);

                if (V_oEndpoint.IdEndpoint == 0)
                {

                    return Endpoint.Insertar(V_oEndpoint);
                }
                else
                {
                    return Endpoint.Actualizar(V_oEndpoint);
                }

            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (Endpoint != null) Endpoint.Dispose();
            }
        }       

    }
}