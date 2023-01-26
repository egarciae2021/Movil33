using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using System.Web.Routing;
using PCSistelGateway.Helpers;

namespace PCSistelGateway.Filters
{
    public class GoogleRecaptchaAttribute : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext authorizationContext)
        {
            try
            {
                if (authorizationContext == null)
                    throw new ArgumentNullException("filterContext");

                var response = authorizationContext.HttpContext.Request["g-recaptcha-response"];
                var secretKey = ConvertHelpers.GetAppSeting("Google.Captcha.SecretKey");
                var client = new WebClient();
                var result = client.DownloadString($"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={response}");
                var obj = JObject.Parse(result);

                var success = (bool)obj.SelectToken("success");

                if (!success)
                {
                    var message = new FlashMessage() { Title = "¡Atención!", Body = "El Captcha Ingresado es Incorrecto.", Type = MessageType.Warning, RemoveOnError = false };
                    if (authorizationContext.Controller.TempData["FlashMessages"] == null)
                        authorizationContext.Controller.TempData["FlashMessages"] = new List<FlashMessage>();
                    var messageList = ((List<FlashMessage>)authorizationContext.Controller.TempData["FlashMessages"]);
                    messageList.Add(message);

                    authorizationContext.Result = new RedirectToRouteResult(new RouteValueDictionary(authorizationContext.HttpContext.Request.UrlReferrer.PathAndQuery));
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}