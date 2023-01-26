using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.Script.Serialization;

using VisualSoft.PCSistelMovil.CentralIncidencias.MVVM;
using VisualSoft.PCSistelMovil.CentralIncidencias.BL;
using VisualSoft.PCSistelMovil.CentralIncidencias.BE;

using VisualSoft.PCSistelMovil.Dominio.BE;
using VisualSoft.PCSistelMovil.Dominio.BL;
using System.Data;
using System.Text;
using System.IO;
using CompCorreo;
using System.Configuration;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Index(string pUrl)
        {

            ViewData["ReleaseProducto"] = System.Configuration.ConfigurationManager.AppSettings["ReleaseProducto"].ToString();
            try
            {
                ViewData["NombreProducto1"] = System.Configuration.ConfigurationManager.AppSettings["NombreProducto1"].ToString();
                ViewData["NombreProducto2"] = System.Configuration.ConfigurationManager.AppSettings["NombreProducto2"].ToString();
            }
            catch (Exception)
            {
                ViewData["NombreProducto1"] = "Central";
                ViewData["NombreProducto2"] = "Atención";
            }

            if (User.Identity.IsAuthenticated)
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];//.ASPXAUTH
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                if (authTicket.IsPersistent)
                {
                    if (System.Web.HttpContext.Current.Session["SesionUsuario"] == null)
                    {
                        bool resultado = false;
                        BL_CINC_Login login;
                        login = new BL_CINC_Login();
                        ENT_CINC_Usuario usuario = login.Acreditar(User.Identity.Name);
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
                            Session["Usuario"] = User.Identity.Name;
                            FormsAuthentication.RedirectFromLoginPage(User.Identity.Name, true);
                        }
                        else
                        {
                            return LogOut();
                        }
                        
                    }
                    else
                    {
                        FormsAuthentication.RedirectFromLoginPage(User.Identity.Name, true);
                    }
                }
                else
                {
                    return LogOut();
                }
            }
            ViewBag.ReturnUrl = pUrl;
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult RestPass(string c)
        {
            BL_CINC_Usuario Usuario = null;
            try
            {
                if (c == null || c == string.Empty)
                {
                    ViewData["Mostrar"] = "<script>$(function(){$('#dvErrorSolicitud').show();})</script>";
                }
                else
                {
                    Usuario = new BL_CINC_Usuario();
                    DataTable dtSolicitudRes = Usuario.SolicitudRestablecimiento(c);

                    if (dtSolicitudRes.Rows.Count != 1)
                    {
                        ViewData["Mostrar"] = "<script>$(function(){$('#dvErrorSolicitud').show();})</script>";
                    }
                    else
                    {
                        int HorasMinRes = Convert.ToInt32(ConfigurationManager.AppSettings["HorasRestablecimientoPass"]);
                        int HorasSolicitudActiva = (dtSolicitudRes.Rows[0]["HorasActivo"] == DBNull.Value ? -1 : Convert.ToInt32(dtSolicitudRes.Rows[0]["HorasActivo"]));

                        if (dtSolicitudRes.Rows[0]["Estado"].ToString() == "Inactivo")
                        {
                            ViewData["Mostrar"] = "<script>$(function(){$('#dvErrorSolicitud').show();})</script>";
                        }
                        else if ((HorasSolicitudActiva != -1 && HorasSolicitudActiva > HorasMinRes) || dtSolicitudRes.Rows[0]["Estado"].ToString() == "Expirado")
                        {
                            ViewData["Mostrar"] = "<script>$(function(){$('#dvCaducado').show();})</script>";
                        }
                        else
                        {
                            ViewData["Mostrar"] = "<script>$(function(){$('#dvReestablecimiento').show();})</script>";
                            ViewData["Codigo"] = c;
                            ViewData["Horas"] = HorasMinRes;

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ViewData["Mostrar"] = "<script>$(function(){$('#dvErrorSolicitud').show();})</script>";
            }
            finally
            {
                if (Usuario != null) { Usuario.Dispose(); }
            }
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Index(MVVM_Login model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (Membership.ValidateUser(model.Usuario, model.Contrasena))
                {
                    Session["Usuario"] = model.Usuario;

                    ViewData["ReleaseProducto"] = System.Configuration.ConfigurationManager.AppSettings["ReleaseProducto"].ToString();
                    FormsAuthentication.RedirectFromLoginPage(model.Usuario, model.Recordarme);
                }
            }

            // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
            ModelState.AddModelError("", "El nombre de usuario o la contraseña especificados son incorrectos.");
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        //public ActionResult RestPass(MVVM_RestablecerPass model)
        public ActionResult RestPass(FormCollection form)
        {
            BL_CINC_Usuario Usuario = null;
            string strResultado = string.Empty;
            string strErrorCorreo = string.Empty;
            string PaginaLoginCI = "http://localhost:57194/";
            try
            {
                if (ModelState.IsValid)
                {
                    if (form["NuevoPass"] != form["ConfirmacionPass"])
                    {
                        ViewData["Error"] = "Las contraseñas no coinciden";
                    }
                    else
                    {
                        Usuario = new BL_CINC_Usuario();
                        //Usuario.CambiarContraseña(model.Codigo, model.NuevoPass, model.Horas);
                        DataSet dsResultado = Usuario.CambiarContraseña(form["Codigo"], form["NuevoPass"], Convert.ToInt32(form["Horas"]));

                        if (dsResultado.Tables.Count > 0)
                        {
                            strResultado = dsResultado.Tables[0].Rows[0]["CodMsj"].ToString();
                            if (strResultado == "1")
                            {
                                ViewData["Mostrar"] = "<script>$(function(){$('#dvExito').show();})</script>";
                                //enviar correo
                                CCorreo cCorreo = new CompCorreo.CCorreo();

                                string CuerpoMensaje = string.Empty;
                                string Destinatario = dsResultado.Tables[1].Rows[0]["Correo"] == DBNull.Value ? "" : dsResultado.Tables[1].Rows[0]["Correo"].ToString();
                                string Asunto = "Confirmación de cambio de contraseña";

                                string UbicPlantilla = HttpContext.Server.MapPath("~/") + "Common\\Plantillas\\ConfirmacionCambioContrasena.htm";
                                string NombreUsuario = dsResultado.Tables[1].Rows[0]["NombreUsuario"] == DBNull.Value ? "" : dsResultado.Tables[1].Rows[0]["NombreUsuario"].ToString();

                                CuerpoMensaje = String.Format(TraeCuerpoPlantilla(UbicPlantilla), NombreUsuario, PaginaLoginCI);

                                if (Destinatario != string.Empty && NombreUsuario != string.Empty)
                                {
                                    try
                                    {
                                        cCorreo.Enviar(false, Destinatario, Asunto, CuerpoMensaje, null, false, "");
                                    }
                                    catch (Exception ex)
                                    {
                                        strErrorCorreo = ex.ToString();
                                    }
                                }
                                else
                                {
                                    ViewData["Mostrar"] = "<script>$(function(){$('#dvErrorSolicitud').show();})</script>";
                                }
                            }
                            else if (strResultado == "-1")
                            {
                                ViewData["Mostrar"] = "<script>$(function(){$('#dvErrorSolicitud').show();})</script>";
                            }
                            else if (strResultado == "0")
                            {
                                ViewData["Mostrar"] = "<script>$(function(){$('#dvCaducado').show();})</script>";
                            }
                        }
                        else
                        {
                            ViewData["Mostrar"] = "<script>$(function(){$('#dvErrorSolicitud').show();})</script>";
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                if (Usuario != null) { Usuario.Dispose(); }
            }

            return View();
        }

        [AllowAnonymous]
        public ActionResult LogOut()
        {
            System.Web.HttpContext.Current.Session.Clear();
            System.Web.HttpContext.Current.Session.Abandon();
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Login", null);
        }

        [AllowAnonymous]
        public ActionResult ConfigBD()
        {
            if (!HttpContext.Request.IsLocal || !HttpContext.Request.Url.OriginalString.ToLower().Contains("localhost"))    //ECONDEÑA   16/01/2017
            {
                return RedirectToAction("Index");
            }
            BL_DOM_ConfiguracionBD configuracionBD = new BL_DOM_ConfiguracionBD();
            ENT_MVVM_ConfiguracionBD mvvm = new ENT_MVVM_ConfiguracionBD();
            mvvm = configuracionBD.obtenerConfiguracion();
            return View("ConfigBD", mvvm);
        }

        [HttpPost]
        public JsonResult VerificarCnx(string prConfiguracionBD)
        {
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            ENT_MVVM_ConfiguracionBD ConfiguracionBD = oSerializer.Deserialize<ENT_MVVM_ConfiguracionBD>(prConfiguracionBD);
            BL_DOM_ConfiguracionBD blConfiguracionBD = new BL_DOM_ConfiguracionBD();

            return Json(blConfiguracionBD.VerificarConexion(ConfiguracionBD), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GuardarConexion(string prConfiguracionBD)
        {
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            ENT_MVVM_ConfiguracionBD ConfiguracionBD = oSerializer.Deserialize<ENT_MVVM_ConfiguracionBD>(prConfiguracionBD);
            BL_DOM_ConfiguracionBD blConfiguracionBD = new BL_DOM_ConfiguracionBD();

            return Json(blConfiguracionBD.GuardarConexion(ConfiguracionBD), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RestablecerContrasenaCentral(string Correo, string Url)
        {
            BL_CINC_Usuario Usuario = null;
            string strResultado = string.Empty;
            string strErrorCorreo = string.Empty;
            try
            {

                Usuario = new BL_CINC_Usuario();

                string CodigoSolicitud;
                DataTable dtResult = new DataTable();
            NuevoCodigo:
                CodigoSolicitud = Guid.NewGuid().ToString().ToUpper();
                dtResult = Usuario.InsertarSolicitudRestablecimiento(CodigoSolicitud, Correo, Url);

                if (dtResult.Rows.Count == 0)
                {
                    strResultado = "Error";
                }
                else
                {
                    int inResultado; string strDescripcion;
                    inResultado = Convert.ToInt32(dtResult.Rows[0]["Resultado"]);
                    strDescripcion = dtResult.Rows[0]["Descripcion"].ToString();

                    if (inResultado == -2) //generar nuevo codigo
                    {
                        goto NuevoCodigo;
                    }
                    else if (inResultado == 1)
                    {
                        //enviar correo
                        CCorreo cCorreo = new CompCorreo.CCorreo();

                        string CuerpoMensaje = string.Empty;
                        string Destinatario = Correo;
                        string Asunto = "Restablecimiento de contraseña";

                        string UbicPlantilla = HttpContext.Server.MapPath("~/") + "Common\\Plantillas\\SolicitudCambioContrasena.htm";
                        string NombreUsuario = dtResult.Rows[0]["NombreUsuario"] == DBNull.Value ? "" : dtResult.Rows[0]["NombreUsuario"].ToString();
                        string EnlaceParaCorreo = Url + "?c=" + CodigoSolicitud;
                        CuerpoMensaje = String.Format(TraeCuerpoPlantilla(UbicPlantilla), NombreUsuario, EnlaceParaCorreo, EnlaceParaCorreo);

                        if (Destinatario != string.Empty && NombreUsuario != string.Empty)
                        {
                            try
                            {                                
                                cCorreo.Enviar(false, Destinatario, Asunto, CuerpoMensaje, null, false, "");
                            }
                            catch (Exception ex)
                            {
                                strResultado = "Error: " + ex.ToString();
                            }

                        }
                        else
                        {
                            strResultado = "Error";
                        }
                        strResultado = inResultado.ToString() + "|" + EnlaceParaCorreo;
                    }
                    else
                    {
                        strResultado = inResultado.ToString() + "|" + strDescripcion;
                    }
                }

                return Json(strResultado);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Usuario != null) { Usuario.Dispose(); }
            }
        }

        public string TraeCuerpoPlantilla(string RutaPlantilla)
        {
            StringBuilder Cuerpo = new StringBuilder();
            StreamReader objReader = new StreamReader(RutaPlantilla);
            string sLine = string.Empty;

            while (sLine != null)
            {
                sLine = objReader.ReadLine();
                if (sLine != null)
                {
                    Cuerpo.Append(sLine);
                }
            }
            objReader.Close();
            return Cuerpo.ToString();
        }

    }
}
