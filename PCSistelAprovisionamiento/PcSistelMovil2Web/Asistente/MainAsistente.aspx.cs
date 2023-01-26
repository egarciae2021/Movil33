using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using VisualSoft.Comun;
using Utilitarios;

namespace PcSistelMovil2Web.Asistente
{
    public partial class MainAsistente : System.Web.UI.Page
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
                    Session.Contents.Remove("ImagenActual");
                    Session.Contents.Remove("imagenCargada");
                    

                    if (Request.QueryString["IdSolicitud"] != null)
                    {
                        int IdSolicitud = Convert.ToInt32(Request.QueryString["IdSolicitud"]);
                        int inEst = Convert.ToInt32(Request.QueryString["inEst"]);
                        hdfIdSolicitud.Value = Request.QueryString["IdSolicitud"].ToString();

                    }


                }
                catch (Exception ex)
                {

                    ClaseUtilitarios util = new ClaseUtilitarios();
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                    throw new Exception();
                }



            }
        }
    }
}