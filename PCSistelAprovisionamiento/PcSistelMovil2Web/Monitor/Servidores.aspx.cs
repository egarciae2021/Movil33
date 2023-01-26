﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PcSistelMovil2Web.Monitor
{
    public partial class Servidores : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string RutaArchivoSignalR = ConfigurationManager.AppSettings["pathSignalRPCSistel"].ToString();
            if (!RutaArchivoSignalR.EndsWith(@"\"))
                RutaArchivoSignalR += @"\";
            hfpathSignalRPCSistel.Value = RutaArchivoSignalR;
        }
    }
}