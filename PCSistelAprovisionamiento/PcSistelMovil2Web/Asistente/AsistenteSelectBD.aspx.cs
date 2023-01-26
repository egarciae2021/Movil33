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

namespace PcSistelMovil2Web.Asistente
{
    public partial class AsistenteSelectBD : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> ListarServidorEspacio()
        {
            BL_AP_Servidor Servidor = new BL_AP_Servidor();
            try
            {
                //int IdSolicitud = Convert.ToInt32(Request.QueryString["IdSolicitud"]);


                List<ENT_AP_Servidor> lstServidor = Servidor.ListarEspacio();
                return lstServidor;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }


        [WebMethod()]
        public static List<ENT_AP_InstanciaBD> ListarInstanciaBD(int IdServidor)
        {

            BL_AP_InstanciaBD InstanciaBD = new BL_AP_InstanciaBD();
            List<ENT_AP_InstanciaBD> lstTipoSolicitud = new List<ENT_AP_InstanciaBD>();
            lstTipoSolicitud = InstanciaBD.Listar(IdServidor);
            try
            {
                return lstTipoSolicitud;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally 
            {
                if (InstanciaBD != null) InstanciaBD.Dispose();
            }
        }



    }

}