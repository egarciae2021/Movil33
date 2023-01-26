using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

using System.IO;
using System.Configuration;

using VisualSoft.PCSistelMovil.CentralIncidencias.BL;
using VisualSoft.PCSistelMovil.CentralIncidencias.BE;
using VisualSoft.PCSistelMovil.CentralIncidencias.MVVM;
using VisualSoft.Comun.Utilitarios;

namespace VisualSoft.CentralIncidencias.Web.Code.Security
{
    public class MiController : Controller
    {
        public MiController()
        {


            //System.Web.HttpContext.Current.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
            //System.Web.HttpContext.Current.Response.Cache.SetValidUntilExpires(false);
            //System.Web.HttpContext.Current.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            //System.Web.HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            //System.Web.HttpContext.Current.Response.Cache.SetNoStore();

            //if (System.Web.HttpContext.Current.Session["SesionUsuario"] == null)
            //{

            //}
        }

        public void SetArchivo()
        {
            try
            {
                string strPath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "Temp") + "\\";

                if (!Directory.Exists(strPath))
                    Directory.CreateDirectory(strPath);

                var ext = System.IO.Path.GetExtension(System.Web.HttpContext.Current.Request.Files[0].FileName);
                var fileName = System.IO.Path.GetFileName(System.Web.HttpContext.Current.Request.Files[0].FileName);

                if (System.Web.HttpContext.Current.Request.Files[0].FileName.LastIndexOf("\\") != -1)
                {
                    fileName = System.Web.HttpContext.Current.Request.Files[0].FileName.Remove(0, System.Web.HttpContext.Current.Request.Files[0].FileName.LastIndexOf("\\")).ToLower();
                }
                fileName = GetUniqueFileName(fileName, strPath, ext).ToLower();
                string location = strPath + fileName + ext;

                System.Web.HttpContext.Current.Request.Files[0].SaveAs(location);
                System.Web.HttpContext.Current.Response.Write(fileName + ext);
                System.Web.HttpContext.Current.Response.End();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }

        public void SetArchivo_gui()
        {
            try
            {
                string strPath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "Temp") + "\\";

                if (!Directory.Exists(strPath))
                    Directory.CreateDirectory(strPath);

                var ext = System.IO.Path.GetExtension(System.Web.HttpContext.Current.Request.Files[0].FileName);
                var fileName = System.IO.Path.GetFileName(System.Web.HttpContext.Current.Request.Files[0].FileName);

                if (System.Web.HttpContext.Current.Request.Files[0].FileName.LastIndexOf("\\") != -1)
                {
                    fileName = System.Web.HttpContext.Current.Request.Files[0].FileName.Remove(0, System.Web.HttpContext.Current.Request.Files[0].FileName.LastIndexOf("\\")).ToLower();
                }
                fileName = GetUniqueFileName(Guid.NewGuid().ToString().Replace("-", ""), strPath, ext).ToLower();
                string location = strPath + fileName + ext;

                System.Web.HttpContext.Current.Request.Files[0].SaveAs(location);
                System.Web.HttpContext.Current.Response.Write(fileName + ext);
                System.Web.HttpContext.Current.Response.End();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }

        [HttpPost]
        public JsonResult DeleteArchivo(string pNombre)
        {
            RES_Json resultado = new RES_Json();
            try
            {
                resultado.Success = true;
                string strPath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "Temp") + "\\";
                string filePath = strPath + pNombre;
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }
            catch (Exception)
            {
                resultado.Success = false;
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetArchivo(int pIdNota, string pNombreArchivo)
        {
            RES_Json resultado = new RES_Json();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            PRM_Archivo archivo = new PRM_Archivo();
            try
            {
                archivo = BLTicket.ObtenerArchivoByIdNota(pIdNota);
                resultado.Data = archivo;

                string strPath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "Temp") + "\\";

                if (!Directory.Exists(strPath))
                    Directory.CreateDirectory(strPath);

                var ext = archivo.Extencion;
                var fileName = archivo.Nombre;


                fileName = GetUniqueFileName(fileName, strPath, ext).ToLower();
                archivo.Nombre = fileName;
                resultado.Data = archivo;

                if (archivo.Archivo != null)
                {
                    byte[] barrImg = archivo.Archivo;
                    archivo.Archivo = null;
                    //string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + archivo.Nombre);
                    string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + archivo.Nombre + "." + archivo.Extencion);

                    FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                    using (fs)
                    {
                        fs.Write(barrImg, 0, barrImg.Length);
                        fs.Flush();
                        fs.Close();
                    }
                }

                resultado.Success = true;

            }
            catch (Exception)
            {
                resultado.Success = false;
            }
            finally
            {
                if (BLTicket != null)
                    BLTicket.Dispose();
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult GetArchivoSubscripcion(int pIdNota, string pNombreArchivo)
        {
            RES_Json resultado = new RES_Json();
            BL_CINC_SuscripcionNota BLTicket = new BL_CINC_SuscripcionNota();
            PRM_Archivo archivo = new PRM_Archivo();
            try
            {
                archivo = BLTicket.ObtenerArchivoByIdNota(pIdNota);
                resultado.Data = archivo;

                string strPath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "Temp") + "\\";

                if (!Directory.Exists(strPath))
                    Directory.CreateDirectory(strPath);

                var ext = archivo.Extencion;
                var fileName = archivo.Nombre;


                fileName = GetUniqueFileName(fileName, strPath, ext).ToLower();
                archivo.Nombre = fileName;
                resultado.Data = archivo;

                if (archivo.Archivo != null)
                {
                    byte[] barrImg = archivo.Archivo;
                    archivo.Archivo = null;
                    string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + archivo.Nombre + "." + archivo.Extencion);

                    FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                    using (fs)
                    {
                        fs.Write(barrImg, 0, barrImg.Length);
                        fs.Flush();
                        fs.Close();
                    }
                }

                resultado.Success = true;

            }
            catch (Exception)
            {
                resultado.Success = false;
            }
            finally
            {
                if (BLTicket != null)
                    BLTicket.Dispose();
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public static string GetUniqueFileName(string name, string savePath, string ext)
        {
            name = name.Replace(ext, "").Replace(" ", "_");
            name = System.Text.RegularExpressions.Regex.Replace(name, @"[^\w\s]", "");
            var newName = name;
            var i = 0;
            if (System.IO.File.Exists(savePath + newName + ext))
            {
                do
                {
                    i++;
                    newName = name + "_" + i;
                }
                while (System.IO.File.Exists(savePath + newName + ext));
            }
            return newName;
        }

    }
}