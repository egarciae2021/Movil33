using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PCSistelGateway.Helpers;

namespace PCSistelGateway.Filters
{
    public class SessionRestoreAttribute : FilterAttribute, IAuthorizationFilter
    {
        public SessionRestoreAttribute()
        {
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            if (!filterContext.HttpContext.Session.IsLoggedIn())
            {
                if (CookieHelpers.Exists(SessionKey._appBP))
                {
                    try
                    {
                        HttpContext.Current.Session.RestoreSessionFromCookie();
                    }
                    catch (Exception)
                    {
                        CookieHelpers.DeleteAll();
                        HttpContext.Current.Session.Clear();
                    }
                }
                else
                {
                    CookieHelpers.DeleteAll();
                }
            }
        }
    }
}