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
    public partial class SolicitudColasDetalle : System.Web.UI.Page
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
                try
                {
                    hdfIdCola.Value = "0";

                    if (Request.QueryString["IdCola"] != null)
                    {
                        hdfIdCola.Value = Request.QueryString["IdCola"].ToString();
                    }                    

                }
                catch (Exception ex)
                {

                    ClaseUtilitarios util = new ClaseUtilitarios();
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                    throw new Exception();
                }

            }

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object ListarCola(string filtro, string campoordenar, string orden, int inPagTam, int inPagAct)
        {

            BL_AP_TareaPorCola TareaPorCola = new BL_AP_TareaPorCola();
            try
            {
                DataSet dsCola = new DataSet();
                dsCola = TareaPorCola.ListarUno(filtro, campoordenar, orden);
                return JQGrid.DatosJSON(dsCola.Tables[0], inPagTam, inPagAct);
            }
            catch (Exception ex)
            {

                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
            finally
            {
                if (TareaPorCola != null) TareaPorCola.Dispose();
            }

        }


    }
}