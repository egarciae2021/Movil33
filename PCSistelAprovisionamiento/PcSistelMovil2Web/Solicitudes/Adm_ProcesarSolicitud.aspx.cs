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
    public partial class Adm_ProcesarSolicitud : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Solicitud> ListarParametros(string vcGrupo)
        {
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            try
            {
                //int IdSolicitud = Convert.ToInt32(Request.QueryString["IdSolicitud"]);


                List<ENT_AP_Solicitud> lsSolicitud = Solicitud.ListarUno(Convert.ToInt32("1"));
                return lsSolicitud;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

    }
}