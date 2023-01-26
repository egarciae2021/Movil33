using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

using System.Web.Mvc;

using System.Web.Security;

using VisualSoft.PCSistelMovil.CentralIncidencias.MVVM;
using VisualSoft.PCSistelMovil.CentralIncidencias.BL;
using VisualSoft.PCSistelMovil.CentralIncidencias.BE;

namespace VisualSoft.CentralIncidencias.Web.Code.Security
{
    public class MiRedireccionAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var httpContext = filterContext.HttpContext;
            var request = httpContext.Request;
            var response = httpContext.Response;

            if (System.Web.HttpContext.Current.Session["SesionUsuario"] == null)
            {
                HttpCookie authCookie = request.Cookies[FormsAuthentication.FormsCookieName];//.ASPXAUTH
                bool ok = false;
                if (authCookie != null)
                {
                    FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                    if (authTicket.IsPersistent && httpContext.User.Identity.IsAuthenticated)
                    {
                        bool resultado = false;
                        BL_CINC_Login login;
                        login = new BL_CINC_Login();
                        ENT_CINC_Usuario usuario = login.Acreditar(httpContext.User.Identity.Name);
                        resultado = usuario.IdUsuario != -1;
                        if (resultado)
                        {
                            if (usuario.Foto.Tamano > 0)
                            {
                                byte[] barrImg = usuario.Foto.Archivo;
                                usuario.Foto.Archivo = null;
                                string nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + usuario.Foto.Extencion;
                                string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                                usuario.Foto.Nombre = nombreArchivo;
                                System.IO.FileStream fs = new System.IO.FileStream(strfn, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.Write);
                                using (fs)
                                {
                                    fs.Write(barrImg, 0, barrImg.Length);
                                    fs.Flush();
                                    fs.Close();
                                }
                            }

                            System.Web.HttpContext.Current.Session.Add("SesionUsuario", usuario);
                            base.OnActionExecuting(filterContext);
                            ok = true;
                        }
                    }
                }


                if (!ok)
                {
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                    {
                        controller = "Login",
                        action = "Index"
                    }));

                    if (filterContext.HttpContext.Request.IsAjaxRequest())
                    {
                        response.StatusCode = (int)System.Net.HttpStatusCode.Unauthorized;
                        response.End();
                    }
                }

            }
            else
            {
                base.OnActionExecuting(filterContext);
            }
        }
    }
}