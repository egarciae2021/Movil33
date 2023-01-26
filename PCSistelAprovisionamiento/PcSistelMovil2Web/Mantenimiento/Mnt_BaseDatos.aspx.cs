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
    public partial class Mnt_BaseDatos : System.Web.UI.Page
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
                BL_AP_BaseDatos BaseDatos = new BL_AP_BaseDatos();
                try
                {
                    string P_inCod = Request.QueryString["Cod"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdBaseDatos.Value = P_inCod;

                        ENT_AP_BaseDatos oBaseDatos = BaseDatos.Mostrar(Convert.ToInt32(P_inCod));

                        txtNombre.Text = oBaseDatos.BaseDatos;
                        hdfIdServidor.Value = oBaseDatos.IdServidor.ToString();
                        hdfIdInstanciaBD.Value = oBaseDatos.IdInstanciaBD.ToString();
                        txtUsuario.Text = oBaseDatos.Usuario;
                        txtContrasena.Text = Cryptographics.DecryptString(oBaseDatos.Contrasena);
                    }
                    else
                    {
                        hdfIdBaseDatos.Value = "0";
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
                    if (BaseDatos != null) BaseDatos.Dispose();
                }
            }
        }


        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Servidor> ListarServidores()
        {
            BL_AP_Servidor Servidor = new BL_AP_Servidor();
            List<ENT_AP_Servidor> lstServidor = new List<ENT_AP_Servidor>();

            try
            {
                lstServidor = Servidor.Listar();
                return lstServidor;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Servidor != null) Servidor.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_InstanciaBD> ListarInstanciaBDxServidor(int IdServidor)
        {
            BL_AP_InstanciaBD InstanciaBD = new BL_AP_InstanciaBD();
            List<ENT_AP_InstanciaBD> lstInstanciaBD = new List<ENT_AP_InstanciaBD>();

            try
            {
                lstInstanciaBD = InstanciaBD.Listar(IdServidor);
                return lstInstanciaBD;
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

        [WebMethod]
        public static int Guardar(string oBaseDatos)
        {
            BL_AP_BaseDatos BaseDatos = new BL_AP_BaseDatos();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_BaseDatos V_oBaseDatos = oSerializer.Deserialize<ENT_AP_BaseDatos>(oBaseDatos);

                if (V_oBaseDatos.IdInstanciaBD == 0)
                {

                    return 1;
                }
                else
                {
                    return BaseDatos.Actualizar(V_oBaseDatos);
                }

            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (BaseDatos != null) BaseDatos.Dispose();
            }
        }       
    }
}