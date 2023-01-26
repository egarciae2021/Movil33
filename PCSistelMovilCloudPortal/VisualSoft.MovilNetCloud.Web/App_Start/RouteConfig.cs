using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace VisualSoft.MovilNetCloud.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            
            if (System.Configuration.ConfigurationManager.AppSettings["EsBasicBolsa"] == null ||
                System.Configuration.ConfigurationManager.AppSettings["EsBasicBolsa"] == "0")
            {
                routes.MapRoute(
                    name: "Default",
                    url: "{controller}/{action}/{id}",
                    defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
                );
            }
            else
            {
                routes.MapRoute(
                    name: "Default",
                    url: "{controller}/{action}/{id}",
                    defaults: new { controller = "Login", action = "AccesoTDP", id = UrlParameter.Optional }
                );
            }

        }
    }
}