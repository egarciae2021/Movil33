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

namespace PcSistelMovil2Web.Liquidaciones
{
    public partial class Liq_TipoCobro : System.Web.UI.Page
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
                BL_AP_TipoCobro TipoCobro = new BL_AP_TipoCobro();
                try
                {
                    string P_inCod = Request.QueryString["Cod"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdTipoCobro.Value = P_inCod;
                        
                        ENT_AP_TipoCobro oTipoCobro = TipoCobro.Mostrar(Convert.ToInt32(P_inCod));

                        txtDescripcion.Text = oTipoCobro.Descripcion;
                    }
                    else
                    {
                        hdfIdTipoCobro.Value = "0";
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
                    if (TipoCobro != null) TipoCobro.Dispose();
                }
            }
        }

        [WebMethod]
        public static int Guardar(string oTipoCobro)
        {
            BL_AP_TipoCobro TipoCobro = new BL_AP_TipoCobro();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_TipoCobro V_oTipoCobro = oSerializer.Deserialize<ENT_AP_TipoCobro>(oTipoCobro);


                if (V_oTipoCobro.IdTipoCobro == 0)
                {

                    return TipoCobro.Insertar(V_oTipoCobro);
                }
                else
                {
                    return TipoCobro.Actualizar(V_oTipoCobro);
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
                if (TipoCobro != null) TipoCobro.Dispose();
            }

        }
    }
}