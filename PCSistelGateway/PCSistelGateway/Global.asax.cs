using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Web.Routing;
using PCSistelGateway.Helpers;

namespace PCSistelGateway
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //AreaRegistration.RegisterAllAreas();
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);

            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            ModelBinders.Binders.Add(typeof(Decimal), new DecimalModelBinder());
            ModelBinders.Binders.Add(typeof(Decimal?), new DecimalModelBinder());
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("ES-pe");
        }

        protected void Application_AcquireRequestState(object sender, EventArgs e)
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("ES-pe");
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            var action = String.Empty;
            var prefix = String.Empty;
            var fechaActual = DateTime.Now;
            var usuarioId = Session["UsuarioId"].ToInteger();
            // Code that runs when an unhandled error occurs

            // Get the exception object
            Exception exc = Server.GetLastError();


            // Log the exception and notify system operators
            //ExceptionUtility.LogException(exc, "DefaultPage");
            //ExceptionUtility.NotifySystemOps(exc);

            HttpContext ctx = HttpContext.Current;
            var urlPath = ctx.Request.Url.AbsolutePath;
            if (urlPath.Contains("_"))
            {
                prefix = "_";
            }
            Exception ex = Server.GetLastError();
            if (ex is HttpException && ((HttpException)ex).GetHttpCode() == 404)
                action = "NotFound";
            else
            {
                var statusCode = 500;
                var httpException = ex as HttpException;
                if (httpException != null)
                {
                    statusCode = httpException.GetHttpCode();
                }
                else if (!Session.IsLoggedIn())
                {
                    statusCode = 401;
                }
                if (ex != null)
                {
                    LoguerHelpers.Log(ex, usuarioId);
                }

                Session["ErrorMessage"] = $"Código : {fechaActual.ToString("ddMMyyyy_hhmmss")}_{usuarioId}  => {ex.Message} {(ex.InnerException != null ? " => " + ex.InnerException.Message : string.Empty)}";

                Server.ClearError();
                action = "InternalServerError";
            }
            Response.Redirect($"~/Error/{prefix + action}");
        }
    }
}
