﻿using System;
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
    public partial class Mnt_Portal : System.Web.UI.Page
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
                BL_AP_Portal Portal = new BL_AP_Portal();

                try
                {
                    string P_inCod = Request.QueryString["Cod"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdPortal.Value = P_inCod;

                        ENT_AP_Portal oPortal = Portal.Mostrar(Convert.ToInt32(P_inCod));

                        txtPortal.Text = oPortal.NombrePortal.ToString();
                        txtCodigo.Text = oPortal.IdPortal.ToString();
                    }
                    else
                    {
                        hdfIdPortal.Value = "0";
                        txtCodigo.Text = "#####";
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
                    if (Portal != null) Portal.Dispose();
                }
            }
        }


        [WebMethod]
        public static int Guardar(string oPortal)
        {
            BL_AP_Portal Portal = new BL_AP_Portal();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Portal V_oPortal = oSerializer.Deserialize<ENT_AP_Portal>(oPortal);


                if (V_oPortal.IdPortal == 0)
                {

                    return Portal.Insertar(V_oPortal);
                }
                else
                {
                    return Portal.Actualizar(V_oPortal);
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
                if (Portal != null) Portal.Dispose();
            }

        }

    }
}