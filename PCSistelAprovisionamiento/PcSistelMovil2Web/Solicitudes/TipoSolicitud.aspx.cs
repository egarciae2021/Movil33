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
    public partial class TipoSolicitud : System.Web.UI.Page
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
                btnAgregar.Visible = false;
                btnAutDesPDF.Visible = false;
                btnAutDesPDF.Visible = false;
                btnEliminar.Visible = false;
            }

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object ListarTipo(string tipofiltro,string filtro, string campoordenar, string orden, int inPagTam, int inPagAct, string tipo)
        {

            BL_AP_Usuario usuario = new BL_AP_Usuario();
            BL_AP_TipoSolicitud TipoSolicitud = new BL_AP_TipoSolicitud();
            try
            {
                DataSet dtTipoSolicitud = new DataSet();
                dtTipoSolicitud = TipoSolicitud.Listar_Filtro(tipofiltro, filtro, campoordenar, orden);           
                return JQGrid.DatosJSON(dtTipoSolicitud.Tables[0], inPagTam, inPagAct);
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