using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using VisualSoft.Comun.Utilitarios;
using VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil;

namespace VisualSoft.MovilNetCloud.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleTable.EnableOptimizations = true;
            BundleConfig.RegisterBundles(BundleTable.Bundles);

        }

        protected void Application_Error()
        {
            try
            {
                var ex = Server.GetLastError();
                string action = "HttpError500";
                Server.ClearError();
                Response.Redirect(String.Format("~/Error/{0}/?message={1}", action, ex.Message)); //

                Utilitarios util = new Utilitarios();
                ENT_SEG_Usuario oUsuario = new ENT_SEG_Usuario();
                try
                {
                    oUsuario.vcUsu = HttpContext.Current.Session["Usuario"].ToString();
                }
                catch
                {
                }
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "Web Portal", oUsuario);
            }
            catch
            {
            }
        }

    }
}