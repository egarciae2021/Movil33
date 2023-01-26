using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PcSistelMovil2Web
{
    public partial class Asistente3 : System.Web.UI.Page
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
    }
}