using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using VisualSoft.PCSistelMovil.Dominio.BE;
using VisualSoft.PCSistelMovil.Dominio.BL;
using System.ServiceModel;
using System.ServiceModel.Security;
using System.Reflection;
using System.Threading.Tasks;
using System.Configuration;
using System.Text;
using Fluentx.Mvc;
using VisualSoft.Seguridad;

namespace VisualSoft.MovilNetCloud.Web.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        //public ActionResult Index()
        public ActionResult Index()
        {
            //int x = 0;
            //int y = 10 / x;

            ViewData["ProductoRelease"] = System.Configuration.ConfigurationManager.AppSettings["ProductoRelease"].ToString();
            try
            {
                ViewData["NombreProducto"] = System.Configuration.ConfigurationManager.AppSettings["NombreProducto"].ToString();
            }
            catch (Exception)
            {
                ViewData["NombreProducto"] = "PCSistel Móvil 3.3";
            }

            

            if (System.Configuration.ConfigurationManager.AppSettings["ProductoDestino"] != null)
            {
                ViewBag.ProductoDestino = System.Configuration.ConfigurationManager.AppSettings["ProductoDestino"].ToString();
            }
            else
            {
                ViewBag.ProductoDestino = "0";
            }

            return View();
        }
        public ActionResult AccesoTDP()
        {

            return View();
        }


        public ActionResult ConfigBD()
        {
            try
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
            catch (Exception ex)
            {
                General.RegistrarLog("", PCSistelMovilLog45.LogBE.eNivel.Error, ex.Message, ex.StackTrace);
                throw;
            }

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

        //[HttpPost]
        //public JsonResult Acreditar(string pDominio, string pContrasena)
        //{
        //    ENT_MVVM_Dominio dominio = new ENT_MVVM_Dominio();
        //    dominio.CadenaDominio = pDominio;
        //    dominio.Contrasena = pContrasena;

        //    BL_DOM_Dominio blDominio = new BL_DOM_Dominio();

        //    return Json(blDominio.acreditacion(dominio), JsonRequestBehavior.AllowGet);
        //}

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Index(ENT_MVVM_Dominio modelo)
        {
            BL_DOM_Dominio blDominio = new BL_DOM_Dominio();
            BL_DOM_Titular blTitular = null;
            ENT_MVVM_Acreditacion acreditacion = new ENT_MVVM_Acreditacion();
            Session["UsuarioLogueado"] = modelo.Usuario;

            ViewData["ProductoRelease"] = System.Configuration.ConfigurationManager.AppSettings["ProductoRelease"].ToString(); 

            //string ModoCloud = "1";
            //if (ConfigurationManager.AppSettings["ModoCloud"] != null && ConfigurationManager.AppSettings["ModoCloud"].ToString() != "")
            //{
            //    ModoCloud = ConfigurationManager.AppSettings["ModoCloud"].ToString();
            //    if (ModoCloud == "0")
            //    {
            //        string pathPCSistelAdmin = "";
            //        if (ConfigurationManager.AppSettings["pathPCSistelAdmin"] != null && ConfigurationManager.AppSettings["pathPCSistelAdmin"].ToString() != "")
            //        {
            //            pathPCSistelAdmin = ConfigurationManager.AppSettings["pathPCSistelAdmin"].ToString();
            //            pathPCSistelAdmin += "/Login.aspx";
            //            Dictionary<string, object> postData = new Dictionary<string, object>();
            //            postData.Add("portalusuario", AES_Seguridad.EncriptarAES(modelo.Usuario));
            //            postData.Add("portalcontrasena", AES_Seguridad.EncriptarAES(modelo.Contrasena));
            //            return this.RedirectAndPost(pathPCSistelAdmin, postData);
            //        }
            //        return View();
            //    }
            //}


            try
            {
                if (ModelState.IsValid)
                {
                    acreditacion = blDominio.acreditacion(modelo);
                }
                
                if (acreditacion.TieneAcreditacion)
                {
                    if (acreditacion.Dominio.Empresa.ListaTitulares.Count > 0 && !acreditacion.Dominio.Empresa.ListaTitulares[0].AceptoContrato)
                    {
                        if (modelo.AceptoAcuerdo)
                        {
                            blTitular = new BL_DOM_Titular();

                            if (blTitular.AceptoTerminoContrato(acreditacion.Dominio.Empresa.ListaTitulares[0].IdTitular))
                            {
                                if (acreditacion.Dominio.Aplicacion.IdAplicacion == 2)
                                {
                                    return Redirect(acreditacion.Redirect);
                                }
                                else
                                {
                                    string[] credenciales = acreditacion.Redirect.Split('?');
                                    if (credenciales.Length > 1)
                                    {
                                        string URLRedirect = credenciales[0];
                                        string Valor = credenciales[1].Replace("c=", "");
                                        Dictionary<string, object> postData = new Dictionary<string, object>();
                                        postData.Add("porcre", Valor);
                                        return this.RedirectAndPost(URLRedirect, postData);
                                    }
                                    else
                                    {
                                        return Redirect(acreditacion.Redirect);
                                    }
                                }
                            }
                            else
                            {
                                ModelState.AddModelError("", "Error al registrar aceptación.");
                                return View();
                            }
                        }
                        else
                        {
                            modelo.MostrarAcuerdo = true;
                            modelo.NombreArchivoAcuerdo = acreditacion.NombreArchivoContrato;
                            modelo.NombreHtmlAcuerdo = acreditacion.NombreHtmlContrato;
                            return View(modelo);
                        }
                    }
                    else
                    {
                        if (acreditacion.Dominio.Aplicacion.IdAplicacion == 6)
                        {
                            return Redirect(acreditacion.Redirect);
                        }
                        else
                        {
                            string[] credenciales = acreditacion.Redirect.Split('?');
                            if (credenciales.Length > 1)
                            {
                                string URLRedirect = credenciales[0];
                                string Valor = credenciales[1].Replace("c=", "");
                                Dictionary<string, object> postData = new Dictionary<string, object>();
                                postData.Add("porcre", Valor);
                                return this.RedirectAndPost(URLRedirect, postData);
                            }
                            else
                            {
                                return Redirect(acreditacion.Redirect);
                            }
                        }
                    }
                }
                else
                {
                    // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
                    if (acreditacion.MensajeValidacionUsuario != "")
                    {
                        string Mensaje = acreditacion.MensajeValidacionUsuario;
                        if (Mensaje == "Verifique el dominio ingresado.")
                        {
                            Mensaje = "Verifique el usuario ingresado";
                        }
                        ModelState.AddModelError("", Mensaje);
                    }
                    else
                    {
                        ModelState.AddModelError("", "El nombre de usuario o la contraseña especificados son incorrectos.");
                    }

                    return View();
                }
            }
            catch (Exception ex)
            {
                General.RegistrarLog("", PCSistelMovilLog45.LogBE.eNivel.Error, "ERROR EN ACREDITACION:" + ex.Message, ex.StackTrace);
                throw;
            }
            finally
            {
                if (blDominio != null)
                    blDominio.Dispose();

                if (blTitular != null)
                    blTitular.Dispose();
            }


        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult AccesoTDP(ENT_MVVM_Dominio modelo)
        {
            BL_DOM_Dominio blDominio = new BL_DOM_Dominio();
            BL_DOM_Titular blTitular = null;
            ENT_MVVM_Acreditacion acreditacion = new ENT_MVVM_Acreditacion();
            try
            {
                if (ModelState.IsValid)
                {
                    acreditacion = blDominio.acreditacion(modelo);
                }

                if (acreditacion.TieneAcreditacion)
                {
                    if (acreditacion.Dominio.Empresa.ListaTitulares.Count > 0 && !acreditacion.Dominio.Empresa.ListaTitulares[0].AceptoContrato)
                    {
                        if (modelo.AceptoAcuerdo)
                        {
                            blTitular = new BL_DOM_Titular();

                            if (blTitular.AceptoTerminoContrato(acreditacion.Dominio.Empresa.ListaTitulares[0].IdTitular))
                            {
                                return Redirect(acreditacion.Redirect);
                            }
                            else
                            {
                                ModelState.AddModelError("", "Error al registrar aceptación.");
                                return View();
                            }
                        }
                        else
                        {
                            modelo.MostrarAcuerdo = true;
                            modelo.NombreArchivoAcuerdo = acreditacion.NombreArchivoContrato;
                            modelo.NombreHtmlAcuerdo = acreditacion.NombreHtmlContrato;
                            return View(modelo);
                        }
                    }
                    else
                    {
                        return Redirect(acreditacion.Redirect);
                    }
                }
                else
                {
                    // Si llegamos a este punto, es que se ha producido un error y volvemos a mostrar el formulario
                    if (acreditacion.MensajeValidacionUsuario != "")
                    {
                        ModelState.AddModelError("", acreditacion.MensajeValidacionUsuario);
                    }
                    else
                    {
                        ModelState.AddModelError("", "El nombre de usuario o la contraseña especificados son incorrectos.");
                    }

                    return View();
                }
            }
            catch (Exception)
            {
                //throw;
                ModelState.AddModelError("", "El nombre de usuario o la contraseña especificados son incorrectos.");
                return View();
            }
            finally
            {
                if (blDominio != null)
                    blDominio.Dispose();

                if (blTitular != null)
                    blTitular.Dispose();
            }


        }


        [HttpPost]
        public JsonResult AceptoTerminoContrato(string pDominio, string pUsuario)
        {
            BL_DOM_Titular blTitular = new BL_DOM_Titular();
            try
            {
                return Json(blTitular.AceptoTerminoContrato(pDominio, pUsuario), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                General.RegistrarLog("", PCSistelMovilLog45.LogBE.eNivel.Error, ex.Message, ex.StackTrace);
                throw;
            }
            finally
            {
                if (blTitular != null)
                {
                    blTitular.Dispose();
                    blTitular = null;
                }
            }
        }

        [HttpPost]
        public JsonResult RestablecerContrasenaPortal(string Correo)
        {
            BL_DOM_Dominio Dominio = null;
            JsonResult resultado;
            string serviceMovil = "";
            try
            {
                Dominio = new BL_DOM_Dominio();
                List<ENT_DOM_Dominio> lstDominios = new List<ENT_DOM_Dominio>();
                lstDominios = Dominio.ObtenerListaDominios();

                //nombre del dominio
                //string NombreDominio = Correo.Split('@')[1].ToString().Split('.')[0];
                string NombreDominio = "";
                string[] str = Correo.Split('@')[1].ToString().Split('.');
                for (int i = 0; i < str.Length - 1; i++)
                {
                    NombreDominio = NombreDominio + "." + str[i];
                }
                NombreDominio = NombreDominio.Substring(1);

                string RutaMovil = string.Empty;
                string RutaPedidos = string.Empty;
                int IdDominio = -1;

                serviceMovil = "";
                bool ExisteDominio = false;
                foreach (ENT_DOM_Dominio dom in lstDominios)
                {
                    if (dom.Nombre.ToLower() == NombreDominio.ToLower())
                    {
                        //ruta web
                        ExisteDominio = true;
                        RutaMovil = CrearRutaMovil_RestablecerContrasena(dom);
                        RutaPedidos = CrearRutaPedido_RestablecerContrasena(dom);
                        IdDominio = dom.IdDominio;
                        string formato = "http{0}://{1}{2}{3}{4}";
                        serviceMovil = string.Format(formato, dom.Aplicacion.UsaSCL ? "s" : "", dom.Aplicacion.Servidor.Ip, dom.Aplicacion.Puerto == "" ? "" : ":" + dom.Aplicacion.Puerto, dom.Aplicacion.Nombre == "" ? "" : "/" + dom.Aplicacion.Nombre, "/Common/WebService/General.asmx");
                        break;
                    }
                }

                if (ExisteDominio)
                {
                    resultado = Json(EnviarSolicitudCambioContrasena(Correo, RutaMovil, IdDominio, NombreDominio, serviceMovil));
                }
                else
                {
                    resultado = Json("0|Datos incorrectos, verifique el usuario ingresado.");
                }
                return resultado;
            }
            catch (Exception ex)
            {
                return resultado = Json("0|error " + serviceMovil + " " + ex.Message);
                //throw ex;
            }
            finally
            {
                if (Dominio != null)
                    Dominio.Dispose();
            }
        }

        public string CrearRutaMovil_RestablecerContrasena(ENT_DOM_Dominio dominio)
        {
            string formato = "http{0}://{1}{2}{3}{4}";
            string rutaWebServiceMovil = "";
            try
            {
                rutaWebServiceMovil = string.Format(formato, dominio.Aplicacion.UsaSCL ? "s" : "", dominio.Aplicacion.Servidor.Ip, dominio.Aplicacion.Puerto == "" ? "" : ":" + dominio.Aplicacion.Puerto, dominio.Aplicacion.Nombre == "" ? "" : "/" + dominio.Aplicacion.Nombre, "/RestablecerContrasena.aspx");
            }
            catch (Exception)
            {
                rutaWebServiceMovil = "";
            }

            return rutaWebServiceMovil;
        }

        public string CrearRutaPedido_RestablecerContrasena(ENT_DOM_Dominio dominio)
        {
            string formato = "http{0}://{1}{2}{3}{4}";
            string rutaWebServiceMovil = "";
            try
            {
                rutaWebServiceMovil = string.Format(formato, dominio.AplicacionPedidos.UsaSCL ? "s" : "", dominio.AplicacionPedidos.Servidor.Ip, dominio.AplicacionPedidos.Puerto == "" ? "" : ":" + dominio.AplicacionPedidos.Puerto, dominio.AplicacionPedidos.Nombre == "" ? "" : "/" + dominio.AplicacionPedidos.Nombre, "/RestablecerContrasena.aspx");
            }
            catch (Exception)
            {
                rutaWebServiceMovil = "";
            }

            return rutaWebServiceMovil;
        }

        private string EnviarSolicitud(string UrlMovil, string Correo, string Url, string IdDominio)
        {
            string soap = @"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                <soap:Body>
                    <enviarcorreopassword xmlns=""http://tempuri.org/"">
                        <Correo>" + Correo + "</Correo><Url>" + UrlMovil + "</Url><IdDominio>" + IdDominio + "</IdDominio></enviarcorreopassword></soap:Body></soap:Envelope>";

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(UrlMovil);
            req.Headers.Add("SOAPAction", "http://tempuri.org/enviarcorreopassword");
            req.ContentType = "text/xml;charset=\"utf-8\"";
            req.Accept = "text/xml";
            req.Method = "POST";
            using (Stream stm = req.GetRequestStream())
            {
                using (StreamWriter stmw = new StreamWriter(stm))
                {
                    stmw.Write(soap);
                }
            }
            return "exito";
        }

        private string EnviarSolicitudCambioContrasena(string Correo, string RutaMovil, int IdDominio, string Dominio, string rutaProductoMovil)
        {
            try
            {
                VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.GeneralSoapClient oGenreal = new PCSistelMovil.Dominio.BL.ServiceMovil.GeneralSoapClient();
                oGenreal.Endpoint.Address = new System.ServiceModel.EndpointAddress(rutaProductoMovil);
                if (rutaProductoMovil.ToLower().Contains("https://"))
                {
                    BasicHttpBinding binding1 = new BasicHttpBinding();
                    binding1.Name = "GeneralSoap";
                    binding1.Security.Mode = BasicHttpSecurityMode.Transport;
                    oGenreal.Endpoint.Binding = binding1;
                    System.Net.ServicePointManager.ServerCertificateValidationCallback += (se, cert, chain, sslerror) =>
                    {
                        return true;
                    };
                }

                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.Credenciales misCredenciales = new VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.Credenciales();
                misCredenciales.Usuario = "v1su@ls0ft";
                misCredenciales.Password = "v1su@ls0ft";
                //VisualSoft.PCSistelMovil.Dominio.BL.ServiceMovil.Credenciales. = misCredenciales;
                return oGenreal.enviarcorreopassword(Correo, RutaMovil, IdDominio, Dominio);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        private string EnviarSolicitudCambioContrasena2(string Correo, string RutaMovil, int IdDominio, string Dominio, string rutaProductoMovil)
        {
            try
            {
                RutaMovil = RutaMovil + "/enviarcorreopassword";
                var request = (HttpWebRequest)WebRequest.Create(RutaMovil);
                request.ContentType = "application/json";
                request.Headers.Add("SOAPAction", "http://tempuri.org/enviarcorreopassword");
                request.Method = "POST";

                //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(RutaMovil + "/enviarcorreopassword");
                using (var streamWriter = new StreamWriter(request.GetRequestStream()))
                {
                    //string json = "{\"user\":\"test\"," +
                    //              "\"password\":\"bla\"}";


                    var jsonString = "{'Correo':'" + Correo + "', " +
                    "'Url': '" + RutaMovil + "', " +
                    "'IdDominio': " + IdDominio.ToString() + ", " +
                    "'Dominio': '" + Dominio + "' }";

                    streamWriter.Write(jsonString);
                }
                //request.Method = "POST";
                //request.ContentType = "application/json";
                var reader = new StreamReader(request.GetResponse().GetResponseStream());
                return reader.ToString();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public ActionResult DescargarGuiaPdf()
        {
            try
            {
                var filename = "GuiaIngresoSistema.pdf";
                var filePath = Server.MapPath("~/Common/Archivos/" + filename);

                //Si no existe la ruta o archivo regresa al index
                if (!System.IO.File.Exists(filePath))
                {
                    return RedirectToAction("Index");
                }

                //si existe, descarga el archivo
                Response.AddHeader("Content-Disposition", "attachment;");
                return File("~/Common/Archivos/" + filename, "application/pdf");

            }
            catch (Exception)
            {
                return RedirectToAction("Index");
                throw;
            }

        }

        //[HttpPost]
        //public JsonResult RestablecerContrasena(string Correo, string Url)
        //{
        //    //BL_SEG_Usuario Usuario = Nothing;
        //    String strResultado = "";
        //    try 
        //    {	        
        //        string CodigoSolicitud;
        //        DataTable dtResult = new DataTable();
        //        //NuevoCodigo:
        //        CodigoSolicitud = Guid.NewGuid().ToString().ToUpper();
        //
        //        strResultado = "5|" + CodigoSolicitud;
        //        //if (dtResult.Rows.Count == 0)
        //        //{
        //        //    strResultado = "Error";
        //        //}else
        //        //{
        //        //    int inResultado;
        //        //    string strDescripcion;
        //        //    inResultado = Convert.ToInt32(dtResult.Rows[0]["Resultado"]);
        //        //    strDescripcion = dtResult.Rows[0]["Descripcion"].ToString();
        //        //
        //        //    if (inResultado == -2)
        //        //    {
        //        //        goto NuevoCodigo;
        //        //    } 
        //        //    else if (inResultado == 1)
        //        //    {
        //        //        //enviar correo
        //        //        //CompCorreo.CCorreo cCorreo = New CompCorreo.CCorreo
        //        //
        //        //        string CuerpoMensaje = "";
        //        //        string Destinatario = Correo;
        //        //        string Asunto = "Reestablecimiento de contraseña";
        //        //
        //        //        //string UbicPlantilla = HttpContext.Current.Server.MapPath("~/") & "General\Plantillas\SolicitudCambioContrasena.htm";
        //        //        string NombreUsuario = dtResult.Rows[0]["NombreUsuario"].ToString();
        //        //        string EnlaceParaCorreo = Url + "?codrescon=" + CodigoSolicitud;
        //        //        //CuerpoMensaje = String.Format(UtilitarioWeb.TraeCuerpoCorreo(UbicPlantilla), NombreUsuario, EnlaceParaCorreo, EnlaceParaCorreo)
        //        //
        //        //        if (Destinatario != "" && NombreUsuario != "")
        //        //        {
        //        //            //cCorreo.Enviar(False, Destinatario, Asunto, CuerpoMensaje, Nothing, False, "")
        //        //        }
        //        //        else
        //        //        {
        //        //            strResultado = "Error";
        //        //        }
        //        //        strResultado = inResultado.ToString() + "|";
        //        //    }
        //        //}
        //                        
        //        return Json(strResultado);
        //    }
        //    catch (Exception)
        //    {
        //
        //        throw;
        //    }
        //    
        //}

        public string RetornaUsuario_ValidarKey(string name)
        {
            try
            {
                name = VisualSoft.Comun.Utilitarios.Cryptographics.EncryptString(name);
            }
            catch (Exception e)
            {

            }
            return name;
        } 

    }
}
