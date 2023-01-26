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

namespace PcSistelMovil2Web
{
    public partial class Asistente1 : System.Web.UI.Page
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

                if ((Session["imagenCargada"] != null))
                {
                    Session["ImagenActual"] = Session["imagenCargada"];
                }

                BL_AP_Pais objPais = new BL_AP_Pais();
                Pais.DataSource = objPais.Listar();
                Pais.DataTextField = "Nombre";
                Pais.DataValueField = "IdPais";
                Pais.DataBind();

           
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
                return lsSolicitud;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                Solicitud.Dispose();
            }
        }
    }
}