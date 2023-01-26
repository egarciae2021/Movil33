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
    public partial class Mnt_Licencia : System.Web.UI.Page
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
                BL_AP_Licencia Licencia = new BL_AP_Licencia();

                try
                {
                    string P_inCod = Request.QueryString["Cod"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdLicencia.Value = P_inCod;

                        ENT_AP_Licencia oLicencia = null;// Licencia.Mostrar(Convert.ToInt32(P_inCod));


                        txtNombre.Text = oLicencia.Nombre;
                        txtUsuarios.Text = oLicencia.NumeroUsuario.ToString();

                    }
                    else
                    {
                        hdfIdLicencia.Value = "0";
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
                    if (Licencia != null) Licencia.Dispose();
                }
            }
        }

        [WebMethod]
        public static int Guardar(string oLicencia)
        {
            BL_AP_Licencia Licencia = new BL_AP_Licencia();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Licencia V_oLicencia = oSerializer.Deserialize<ENT_AP_Licencia>(oLicencia);


                if (V_oLicencia.IdLicencia == 0)
                {

                    return 0;// Licencia.Insertar(V_oLicencia);
                }
                else
                {
                    return 0; // Licencia.Actualizar(V_oLicencia);
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
                if (Licencia != null) Licencia.Dispose();
            }

        }
    }
}