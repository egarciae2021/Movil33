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
    public partial class Mnt_Servidor : System.Web.UI.Page
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
                BL_AP_Servidor Servidor = new BL_AP_Servidor();

                try
                {

                    string P_inCod = Request.QueryString["Cod"];


                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdServidor.Value = P_inCod;
                        ENT_AP_Servidor oServidor = Servidor.Mostrar(Convert.ToInt32(P_inCod));

                        txtNombre.Text = oServidor.Nombre;
                        txtIp.Text = oServidor.Ip;
                        txtSO.Text = oServidor.SistemaOP;
                        txtDisco.Text = oServidor.DiscoDuro.ToString();
                        txtEspacio.Text = oServidor.EspacioUsado.ToString();
                        txtRutaBackup.Text = oServidor.RutaBackup;
                        txtRutaDestinoBD.Text = oServidor.RutaDestinoBD;

                    }
                    else
                    {
                        hdfIdServidor.Value = "0";
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
                    if (Servidor != null) Servidor.Dispose();
                }
            }

        }

        [WebMethod]
        public static int Guardar(string oServidor)
        {         
            BL_AP_Servidor Servidor = new BL_AP_Servidor();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {


                ENT_AP_Servidor V_oServidor = oSerializer.Deserialize<ENT_AP_Servidor>(oServidor);
                V_oServidor.RutaBackup = V_oServidor.RutaBackup.Replace("&#40", "\\");
                string RutaDestinoBD = V_oServidor.RutaDestinoBD.Replace("&#40", "\\");

                string UltimoCaracter = RutaDestinoBD.Substring(RutaDestinoBD.Length - 1, 1);

                if (UltimoCaracter != "\\")
                {
                    RutaDestinoBD = RutaDestinoBD + "\\";
                }

                V_oServidor.RutaDestinoBD = RutaDestinoBD;


                if (V_oServidor.IdServidor == 0)
                {
                    return Servidor.Insertar(V_oServidor);
                }
                else
                {
                    return Servidor.Actualizar(V_oServidor);
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
                if (Servidor != null) Servidor.Dispose();
            }

        }


    }
}