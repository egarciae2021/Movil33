using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace VisualSoft.CentralIncidencias.Web.Code.Security
{
    public class MiAutorizacion : AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            var httpContext = filterContext.HttpContext;
            var request = httpContext.Request;
            var response = httpContext.Response;
            //var user = httpContext.User;

            //if (request.IsAjaxRequest())
            //{
            //    if (user.Identity.IsAuthenticated == false)
            //        response.StatusCode = (int)System.Net.HttpStatusCode.Unauthorized;
            //    else
            //        response.StatusCode = (int)System.Net.HttpStatusCode.Forbidden;

            //    response.SuppressFormsAuthenticationRedirect = true;
            //    response.End();
            //}


            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                base.HandleUnauthorizedRequest(filterContext);
            }
            else
            {
                if (request.IsAjaxRequest())
                {
                    response.StatusCode = (int)System.Net.HttpStatusCode.Unauthorized;
                    response.End();
                }
                filterContext.Result = new RedirectToRouteResult(new
                RouteValueDictionary(new { controller = "Login", action = "Index" }));
            }
        }
    }
}