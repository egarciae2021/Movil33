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
    public partial class Mnt_LIC_ContratoTermino : System.Web.UI.Page
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
                BL_AP_Contrato Contrato = new BL_AP_Contrato();

                try
                {
                    Session.Remove("ArchivoCargado");

                    string P_inCod = Request.QueryString["Cod"];


                    if (Request.QueryString["Cod"] != null)
                    {
                        ENT_AP_Contrato oContrato = Contrato.MostratTerminos(Convert.ToInt32(P_inCod));

                        hdfIdContratoTermino.Value = oContrato.IdContratoTerminos.ToString();
                        txtNombre.Text = oContrato.Descripcion;

                        Session["ArchivoCargado"] = oContrato.Archivo;

                        if (oContrato.Archivo != null)
                        {
                            hdfArchivo.Value = oContrato.NombreArchivo + "." + oContrato.Extension;
                            lblArchivoCargado.Text = oContrato.NombreArchivo + "." + oContrato.Extension;
                        }
                        else
                        {
                            hdfArchivo.Value = "";
                        }




                    }
                    else
                    {
                        hdfIdContratoTermino.Value = "0";
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
                    if (Contrato != null) Contrato.Dispose();
                }
            }

        }

        [WebMethod]
        public static int Guardar(string oContrato)
        {
            BL_AP_Contrato Contrato = new BL_AP_Contrato();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Contrato V_oContrato = oSerializer.Deserialize<ENT_AP_Contrato>(oContrato);


                V_oContrato.Archivo = (HttpContext.Current.Session["ArchivoCargado"] != null ? (byte[])HttpContext.Current.Session["ArchivoCargado"] : null);// as byte[]; 
                HttpContext.Current.Session.Remove("ArchivoCargado");
                if (V_oContrato.IdContratoTerminos == 0)
                {

                    return Contrato.Insertar(V_oContrato);
                }
                else
                {
                    return Contrato.Actualizar(V_oContrato);
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
                if (Contrato != null) Contrato.Dispose();
            }

        }
    }
}