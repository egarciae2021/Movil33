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
    public partial class Mnt_Parametro : System.Web.UI.Page
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
                BL_AP_Parametro Parametro = new BL_AP_Parametro();

                try
                {
                    string P_inCod = Request.QueryString["Cod"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdParametro.Value = P_inCod;

                        ENT_AP_Parametro oParametro = Parametro.Mostrar(Convert.ToInt32(P_inCod));

                        txtCodigo.Text = oParametro.IdParametro.ToString();
                        txtParametro.Text = oParametro.NombreParametro.ToString();
                        txtDescripcion.Text = oParametro.DescripcionParametro.ToString();
                    }
                    else
                    {
                        hdfIdParametro.Value = "0";
                        txtCodigo.Text = "#####";
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
                    if (Parametro != null) Parametro.Dispose();
                }
            }
        }


        [WebMethod]
        public static int Guardar(string oParametro)
        {
            BL_AP_Parametro Parametro = new BL_AP_Parametro();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Parametro V_oParametro = oSerializer.Deserialize<ENT_AP_Parametro>(oParametro);


                if (V_oParametro.IdParametro == 0)
                {

                    return Parametro.Insertar(V_oParametro);
                }
                else
                {
                    return Parametro.Actualizar(V_oParametro);
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
                if (Parametro != null) Parametro.Dispose();
            }

        }
    }
}