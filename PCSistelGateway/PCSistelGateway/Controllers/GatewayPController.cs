using PCSistelGateway.Filters;
using PCSistelGateway.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PCSistelGateway.Controllers
{
    [AppAuthorize(AppRol.Administrador)]
    public class GatewayPController : BaseController
    {
        // GET: GatewayP
        public ActionResult Index()
        {
            return View();
        }
    }
}