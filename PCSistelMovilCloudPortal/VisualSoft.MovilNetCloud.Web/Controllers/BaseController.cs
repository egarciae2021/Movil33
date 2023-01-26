using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VisualSoft.Comun.Utilitarios;
using VisualSoft.Suite80.BE;

namespace VisualSoft.MovilNetCloud.Web.Controllers
{
    public class BaseController : Controller
    {

        protected override void OnException(ExceptionContext filterContext)
        {

            filterContext.ExceptionHandled = true;
            ENT_SEG_Usuario oUsuario = new ENT_SEG_Usuario();
            oUsuario.P_inCod = 0;
            oUsuario.vcUsu = Session["UsuarioLogueado"] == null ? "" : Session["UsuarioLogueado"].ToString();
            Utilitarios util = new Utilitarios();
            util.GrabarLog(filterContext.Exception, "", "PORTAL MOVIL 3.3", oUsuario);

            if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                //Retornar JSON
                filterContext.Result = new JsonResult
                {
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                    Data = new { error = true, message = "Disculpe, ocurrió un error al procesar su solicitud." }
                };
            }
            else
            {
                //Redirect user to error page
                filterContext.ExceptionHandled = true;
                //filterContext.Result = this.RedirectToAction("Index", "Error");
            }
            base.OnException(filterContext);
        }


    }
}
