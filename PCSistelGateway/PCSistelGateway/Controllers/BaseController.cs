using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PCSistelGateway.Filters;
using PCSistelGateway.Helpers;
using PCSistelGateway.Logic;
using PCSistelGateway.Models;

namespace PCSistelGateway.Controllers
{
    [SessionRestore]
    public class BaseController : Controller
    {
        private CargarDatosContext cargarDatosContext { get; set; }
        public FirebaseLogic fbs { get; set; }

        public BaseController()
        {
            fbs = new FirebaseLogic();
        }

        public void InvalidarContext()
        {
        }

        public CargarDatosContext CargarDatosContext()
        {
            if (cargarDatosContext == null)
            {
                cargarDatosContext = new CargarDatosContext { session = Session, httpContext = HttpContext, fbs = fbs };
            }
            return cargarDatosContext;
        }

        public void PostMessage(FlashMessage Message)
        {
            if (TempData["FlashMessages"] == null)
                TempData["FlashMessages"] = new List<FlashMessage>();

            var list = ((List<FlashMessage>)TempData["FlashMessages"]);
            list.Add(Message);
            //if (Message.Type == MessageType.Error)
            //    list.RemoveAll(x => x.RemoveOnError = true);
        }

        public void PostMessage(MessageType Type, bool RemoveOnError = false)
        {
            string Body = string.Empty;

            switch (Type)
            {
                case MessageType.Error: Body = "Ha ocurrido un error al procesar la solicitud."; break;
                case MessageType.Info: Body = String.Empty; break;
                case MessageType.Success: Body = "Los datos se guardaron exitosamente."; break;
                case MessageType.Warning: Body = "."; break;
            }
            PostMessage(Type, Body, RemoveOnError);
        }

        public void PostMessage(Exception ex, bool RemoveOnError = false)
        {
            PostMessage(MessageType.Error, "Ha ocurrido un error al procesar la solicitud: " + ex.Message.ToSafeString(), RemoveOnError);
        }

        public void PostMessage(MessageType Type, string Title, string Body, bool RemoveOnError = false)
        {
            PostMessage(new FlashMessage { Title = Title, Body = Body, Type = Type, RemoveOnError = RemoveOnError });
        }

        public void PostMessage(MessageType Type, string Body, bool RemoveOnError = false)
        {
            string Title = String.Empty;

            switch (Type)
            {
                case MessageType.Error: Title = "¡Error!"; break;
                case MessageType.Info: Title = "Ojo."; break;
                case MessageType.Success: Title = "¡Éxito!"; break;
                case MessageType.Warning: Title = "¡Atención!"; break;
            }

            PostMessage(new FlashMessage { Title = Title, Body = Body, Type = Type, RemoveOnError = RemoveOnError });
        }

        public ActionResult Error(Exception ex)
        {
            return View("Error", ex);
        }

        public ActionResult RedirectToActionPartialView(string actionName)
        {
            return RedirectToActionPartialView(actionName, null, null);
        }

        public ActionResult RedirectToActionPartialView(string actionName, object routeValues)
        {
            return RedirectToActionPartialView(actionName, null, routeValues);
        }

        public ActionResult RedirectToActionPartialView(string actionName, string controllerName)
        {
            return RedirectToActionPartialView(actionName, controllerName, null);
        }

        public ActionResult RedirectToActionPartialView(string actionName, string controllerName, object routeValues)
        {
            var url = Url.Action(actionName, controllerName, routeValues);
            return Content("<script> window.location = '" + url + "'</script>");
        }
    }
}