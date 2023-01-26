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
    public partial class AsistenteSelectAPPMovil : System.Web.UI.Page
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
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> ListarServidorAPP(string IdTipoEndpoint)
        {
            BL_AP_Servidor Servidor = new BL_AP_Servidor();
            try
            {
                List<ENT_AP_Servidor> lstServidor = Servidor.ListarServidorAPP(IdTipoEndpoint);
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_InstanciaAPP> ListarInstanciaAPP(int IdServidor, string IdTipoEndpoint)
        {
            BL_AP_InstanciaAPP InstanciaAPP = new BL_AP_InstanciaAPP();
            try
            {


                List<ENT_AP_InstanciaAPP> lstServidorAPP = InstanciaAPP.ListarxServidor(IdServidor, IdTipoEndpoint);
                return lstServidorAPP;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (InstanciaAPP != null) InstanciaAPP.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> ListarServidorWEB()
        {
            BL_AP_Servidor ServidorWEB = new BL_AP_Servidor();
            try
            {
                List<ENT_AP_Servidor> lstServidorWEB = ServidorWEB.ListarServidorWEB();
                return lstServidorWEB;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (ServidorWEB != null) ServidorWEB.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_InstanciaAPP> ListarInstanciaWEB(int IdServidor, string IdTipoEndpoint)
        {
            BL_AP_InstanciaAPP InstanciaWEB = new BL_AP_InstanciaAPP();
            try
            {
                List<ENT_AP_InstanciaAPP> lstServidorWEB = InstanciaWEB.ListarxServidor(IdServidor, IdTipoEndpoint);
                return lstServidorWEB;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (InstanciaWEB != null) InstanciaWEB.Dispose();
            }
        }
    }
}