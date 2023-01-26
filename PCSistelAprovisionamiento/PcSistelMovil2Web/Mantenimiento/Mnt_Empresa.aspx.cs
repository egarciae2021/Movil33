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
    public partial class Mnt_Empresa : System.Web.UI.Page
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

                    string P_inCod = Request.QueryString["Cod"];


                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdEmpresa.Value = P_inCod;               

                    }
                    else
                    {
                        hdfIdEmpresa.Value = "0";
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

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Empresa> ListaUnaEmpresa(int IdEmpresa)
        {
            BL_AP_Empresa Empresa = new BL_AP_Empresa();
            try
            {

                List<ENT_AP_Empresa> lstEmpresa = Empresa.Mostrar(IdEmpresa);

                for (int i = 0; i < lstEmpresa[0].Titulares.Count; i++)
                {
                    lstEmpresa[0].Titulares[i].Contrasena = Cryptographics.DecryptString(lstEmpresa[0].Titulares[i].Contrasena);

                }

                return lstEmpresa;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (Empresa != null) Empresa.Dispose();
            }
        }

        [WebMethod]
        public static int Guardar(string oEmpresa, string xmlTitulares, string fechafin)
        {
            BL_AP_Empresa Empresa = new BL_AP_Empresa();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();

            try
            {
                ENT_AP_Empresa V_oEmpresa = oSerializer.Deserialize<ENT_AP_Empresa>(oEmpresa);
                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];

                for (int i = 0; i < V_oEmpresa.Titulares.Count; i++)
                {
                    V_oEmpresa.Titulares[i].Contrasena = Cryptographics.EncryptString(V_oEmpresa.Titulares[i].Contrasena);

                }


                if (V_oEmpresa.IdEmpresa == 0)
                {

                    return 0;//no hay metodo para insertar
                }
                else
                {
                    return Empresa.Actualizar(V_oEmpresa, xmlTitulares, fechafin);
                }



            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (Empresa != null) Empresa.Dispose();
            }
        }

        [WebMethod]
        public static int RestablecerContrasena(int IdEmpresa, string Usuario)
        {
            BL_AP_Empresa Empresa = new BL_AP_Empresa();

            try
            {

                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
                int IdUsuario = lsDatosUsuario[0].IdUsuario;
                string nombrepc = HttpContext.Current.Session["NombrePc"].ToString();

                return Empresa.RestablecerContrasena(IdEmpresa, IdUsuario, nombrepc, Usuario);
            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (Empresa != null) Empresa.Dispose();
            }
        }

    }
}