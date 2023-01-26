using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using VisualSoft.CentralIncidencias.Web.Code.Security;
using System.Web.Script.Serialization;

using VisualSoft.PCSistelMovil.CentralIncidencias.BL;
using VisualSoft.PCSistelMovil.CentralIncidencias.BE;
using VisualSoft.PCSistelMovil.CentralIncidencias.MVVM;
using VisualSoft.Comun.Utilitarios;

using System.Data;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    [MiRedireccion]
   // [MiAutorizacion(Roles = "Administrador,Operador,Solicitudes,Incidencias")]
    public class HomeController : MiController
    {
        //
        // GET: /Home/
        

        public ActionResult Index()
        {
            MVVM_Home miModelo = new MVVM_Home();
            BL_CINC_Home BLHome = new BL_CINC_Home();
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            try
            {
                miModelo = BLHome.getHome(UsuarioSesion.IdUsuario, UsuarioSesion.Nombres + " " + UsuarioSesion.Apellidos);
                miModelo.NombreTecnico = UsuarioSesion.Nombres + " " + UsuarioSesion.Apellidos;

                for (int i = 0; i < miModelo.CardTecnico.Count ; i++)
                {
                    if (miModelo.CardTecnico[i].Foto.Tamano > 0)
                    {
                        byte[] barrImg = miModelo.CardTecnico[i].Foto.Archivo;
                        miModelo.CardTecnico[i].Foto.Archivo = null;
                        string nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + miModelo.CardTecnico[i].Foto.Extencion;
                        string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                        miModelo.CardTecnico[i].Foto.Nombre = nombreArchivo;
                        System.IO.FileStream fs = new System.IO.FileStream(strfn, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.Write);
                        using (fs)
                        {
                            fs.Write(barrImg, 0, barrImg.Length);
                            fs.Flush();
                            fs.Close();
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLHome != null) BLHome.Dispose();
            }


            for (int k = 0; k < UsuarioSesion.Perfiles.Count; k++)
            {
                if (UsuarioSesion.Perfiles[k].Nombre == "Administrador")
                {
                    return View(miModelo);
                }
            }

            for (int k = 0; k < UsuarioSesion.Perfiles.Count; k++)
            {
                if (UsuarioSesion.Perfiles[k].Nombre == "Operador")
                {
                    return RedirectToAction("Index", "Suscripcion");
                }
            }

            for (int k = 0; k < UsuarioSesion.Perfiles.Count; k++)
            {
                if (UsuarioSesion.Perfiles[k].Nombre == "Incidencias")
                {
                    //Para redirecionar a los Umbrales JPareja
                    return View(miModelo);
                }
            }

            for (int k = 0; k < UsuarioSesion.Perfiles.Count; k++)
            {
                if (UsuarioSesion.Perfiles[k].Nombre == "Seguridad")
                {
                    return RedirectToAction("Index", "Usuario");  
                }
            }

            for (int k = 0; k < UsuarioSesion.Perfiles.Count; k++)
            {
                if (UsuarioSesion.Perfiles[k].Nombre == "Solicitudes")
                {
                    return RedirectToAction("Index", "Solicitud");
                }
            }

            return RedirectToAction("Index", "Login");
        }
    }
}
