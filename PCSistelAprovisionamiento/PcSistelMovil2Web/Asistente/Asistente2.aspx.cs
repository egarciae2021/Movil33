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
    public partial class Asistente2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            BL_AP_Contrato Contrato = new BL_AP_Contrato();

            try
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
                    
                    ddlContrato.DataSource = Contrato.Listar();
                    ddlContrato.DataTextField = "Descripcion";
                    ddlContrato.DataValueField = "IdContratoTerminos";
                    ddlContrato.DataBind();

                    Contrato.Dispose();
                }     
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                Contrato.Dispose();
            }
            
        }
    }
}