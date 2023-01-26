using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using PCSistelGateway.Helpers;

namespace PCSistelGateway.Filters
{
    public class AppAuthorizeAttribute : FilterAttribute, IAuthorizationFilter
    {
        private readonly AppRol[] _acceptedRoles;
        private readonly string _unauthorized = "Unauthorized";
        private readonly string _unauthorizedPartial = "_Unauthorized";

        public AppAuthorizeAttribute(params AppRol[] acceptedRoles)
        {
            _acceptedRoles = acceptedRoles;
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            var unauthorized = false;

            try
            {
                var user = filterContext.HttpContext.Session.Get(SessionKey.UsuarioId).ToString();
                var lstSessionRol = filterContext.HttpContext.Session.GetRoles();

                if (_acceptedRoles.Length > 0)
                {
                    if (lstSessionRol.Length > 0)
                    {
                        if (ExtensionHelpers.HasRole(lstSessionRol, _acceptedRoles))
                            unauthorized = false;
                        else
                            unauthorized = true;
                    }
                }
            }
            catch (Exception)
            {
                unauthorized = true;
            }

            if (unauthorized)
            {
                var isPartialView = filterContext.ActionDescriptor.ActionName.StartsWith("_");
                if (filterContext.HttpContext.Session.Get(SessionKey.UsuarioId) == null)
                {
                    if (isPartialView)
                        filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Error", action = _unauthorizedPartial, Area = String.Empty }));
                    else
                        filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Login", action = "Index", Area = String.Empty }));
                }
                else
                {
                    if (isPartialView)
                    {
                        filterContext.Result = new PartialViewResult() { ViewName = _unauthorizedPartial };
                    }
                    else
                    {
                        filterContext.Result = new ViewResult() { ViewName = _unauthorized };
                    }
                }
            }
        }
    }
}