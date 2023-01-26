using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PcSistelMovil2Web
{
    public partial class SiteMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Session["datos"] == null))
            {
                Response.BufferOutput = true;
                Response.Redirect("login.aspx");
            }

            if (!Page.IsPostBack)
            {
                Response.BufferOutput = true;
                Response.Redirect("login.aspx");
            }
        }
    }
}
