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
    public partial class Mnt_Pais : System.Web.UI.Page
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
                BL_AP_Pais Pais = new BL_AP_Pais();

                try
                {
                    string P_inCod = Request.QueryString["Cod"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdPais.Value = P_inCod;

                        ENT_AP_Pais oPais = Pais.Mostrar(Convert.ToInt32(P_inCod));

                        txtNombre.Text = oPais.Nombre;
                        txtCodigo.Text = oPais.Codigo;
                    }
                    else
                    {
                        hdfIdPais.Value = "0";
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
                    if (Pais != null) Pais.Dispose();
                }
            }
        }

        [WebMethod]
        public static int Guardar(string oPais)
        {
            BL_AP_Pais Pais = new BL_AP_Pais();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Pais V_oPais = oSerializer.Deserialize<ENT_AP_Pais>(oPais);


                if (V_oPais.IdPais == 0)
                {

                    return Pais.Insertar(V_oPais);
                }
                else
                {
                    return Pais.Actualizar(V_oPais);
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
                if (Pais != null) Pais.Dispose();
            }

        }
    }
}