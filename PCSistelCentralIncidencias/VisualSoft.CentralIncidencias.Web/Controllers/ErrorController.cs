using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VisualSoft.CentralIncidencias.Web.Models;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    public class ErrorController : Controller
    {
        //
        // GET: /Error/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult HttpError500(string message)
        {
            Error oError = new Error
            {
                Codigo = "",
                Mensaje = message,
                Detalle = ""
            };
            return View("Error", oError);
        }

    }
}
