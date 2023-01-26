using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using PCSistelGateway.Helpers;

namespace PCSistelGateway.Filters
{
    public class SecurityHeaderAttribute : ActionFilterAttribute
    {
        public string _headerName { get { return ConvertHelpers.GetAppSeting("AppAuthHeaderName"); } }
        public string _headerValue { get { return ConvertHelpers.GetAppSeting("AppAuthHeaderValue"); } }
        public Boolean _unauthorized { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            try
            {
                this._unauthorized = true;

                if (actionContext.Request.Headers.Any(x => x.Key.Equals(_headerName)))
                {
                    if (actionContext.Request.Headers.GetValues(_headerName).FirstOrDefault().Equals(_headerValue))
                    {
                        this._unauthorized = false;
                    }
                }

                if (!actionContext.ModelState.IsValid || this._unauthorized)
                {
                    actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "The model state is not valid.\r\nParameter name: modelState");
                }
            }
            catch (Exception)
            {

                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "The model state is not valid.\r\nParameter name: modelState");
            }
        }
    }
}