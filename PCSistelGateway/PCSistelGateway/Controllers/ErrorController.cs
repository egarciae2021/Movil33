using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PCSistelGateway.Controllers
{
    public class ErrorController : BaseController
    {
        // GET: Error
        public ActionResult _505()
        {
            return View();
        }

        public ActionResult InternalServerError(Exception ex)
        {
            ViewData["ErrorMessage"] = Session["ErrorMessage"];
            return View();
        }

        public ActionResult NotFound()
        {
            return View();
        }

        public PartialViewResult _InternalServerError(Exception ex)
        {
            ViewData["ErrorMessage"] = Session["ErrorMessage"];
            return PartialView();
        }

        public PartialViewResult _NotFound()
        {
            return PartialView();
        }
    }
}