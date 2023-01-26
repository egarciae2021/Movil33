using PCSistelGateway.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PCSistelGateway.Logic;

namespace PCSistelGateway.Controllers
{
    public class HomeController : BaseController
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            if (Session.IsLoggedIn())
                return RedirectToAction("Index", "GatewayC");
            else
                return RedirectToAction("Index", "Login");
        }

    }
}