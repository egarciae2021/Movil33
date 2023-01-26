using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VisualSoft.CentralIncidencias.Web.Code.Security;
using System.Web.Script.Serialization;

using VisualSoft.PCSistelMovil.CentralSolicitudes.BL;
using VisualSoft.PCSistelMovil.CentralSolicitudes.BE;
using VisualSoft.PCSistelMovil.CentralSolicitudes.MVVM;
using VisualSoft.Comun.Utilitarios;

using System.Data;
using System.IO;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    [MiRedireccion]
    //[MiAutorizacion(Roles = "Administrador,Solicitudes")]
    public class SolicitudController : MiController
    {
        //
        // GET: /Solicitud/
        

        public ActionResult Index()
        {
            MVVM_Solicitud miModelo = new MVVM_Solicitud();
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario UsuarioSesion = (VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            try
            {
                miModelo = BLSolicitud.getMVVM(UsuarioSesion.IdUsuario);

                for (int i = 0; i < miModelo.Tecnicos.Count; i++)
                {
                    if (miModelo.Tecnicos[i].Foto.Tamano > 0)
                    {
                        byte[] barrImg = miModelo.Tecnicos[i].Foto.Archivo;
                        miModelo.Tecnicos[i].Foto.Archivo = null;
                        string nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + miModelo.Tecnicos[i].Foto.Extencion;
                        string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                        miModelo.Tecnicos[i].Foto.Nombre = nombreArchivo;
                        FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
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
                if (BLSolicitud != null) BLSolicitud.Dispose();
            }
            return View(miModelo);
        }

        [HttpPost]
        public JsonResult GetSolicitud(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                PRM_Solicitud parametros = oSerializer.Deserialize<PRM_Solicitud>(pParametros);
                parametros.CodigoEstado = parametros.CodigoEstado.Replace('|', '\'');
                tabla = BLSolicitud.ObtenerSolicitud(parametros);

                if (vcOrdCol.Trim() != "")
                {
                    if (tabla.Columns.Contains(vcOrdCol))
                    {
                        tabla.DefaultView.Sort = vcOrdCol + " " + vcTipOrdCol;
                        tabla = tabla.DefaultView.ToTable();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSolicitud != null)
                    BLSolicitud.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerTecnicosAsignar(int pIdUsurio, int pIdtipo)
        {
            List<ENT_CSOL_UsuarioEstadisticas> tecnicos = new List<ENT_CSOL_UsuarioEstadisticas>();
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            try
            {
                tecnicos = BLSolicitud.obtenerTecnicosAsignar(pIdUsurio, pIdtipo);

                for (int i = 0; i < tecnicos.Count; i++)
                {
                    if (tecnicos[i].Usuario.Foto.Tamano > 0)
                    {
                        byte[] barrImg = tecnicos[i].Usuario.Foto.Archivo;
                        tecnicos[i].Usuario.Foto.Archivo = null;
                        string nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + tecnicos[i].Usuario.Foto.Extencion;
                        string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                        tecnicos[i].Usuario.Foto.Nombre = nombreArchivo;
                        FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
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
                if (BLSolicitud != null)
                    BLSolicitud.Dispose();
            }

            return Json(tecnicos, JsonRequestBehavior.AllowGet);
        }

        #region Acciones

        [HttpPost]
        public JsonResult RegistrarAsignarTicket(int pIdUsuario, int pIdSolicitud)
        {
            RES_Json resultado = new RES_Json();
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario UsuarioSesion = (VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            try
            {
                resultado = BLSolicitud.AsignarSolicitud(pIdUsuario, UsuarioSesion.IdUsuario, pIdSolicitud);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSolicitud != null)
                    BLSolicitud.Dispose();
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CerrarSolicitud(string pParametros)
        {
            RES_Json resultado = new RES_Json();
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario UsuarioSesion = (VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            try
            {
                PRM_SolicitudCerrar parametros = oSerializer.Deserialize<PRM_SolicitudCerrar>(pParametros);

                parametros.IdUsuario = UsuarioSesion.IdUsuario;
                parametros.NombreUsuario = UsuarioSesion.Nombres + " " + UsuarioSesion.Apellidos;

                resultado = BLSolicitud.CerrarSolicitudCliente(parametros);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSolicitud != null)
                    BLSolicitud.Dispose();
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Notas

        [HttpPost]
        public JsonResult RegistrarNota(string pParametros, string pNombreArchivo)
        {
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario UsuarioSesion = (VisualSoft.PCSistelMovil.CentralIncidencias.BE.ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];

            string vcExtension = "";
            decimal deLength;
            byte[] byFileData;
            string vcName;
            try
            {
                PRM_NotaSolicitud parametros = oSerializer.Deserialize<PRM_NotaSolicitud>(pParametros);
                parametros.NombreUsuario = UsuarioSesion.Nombres + " " + UsuarioSesion.Apellidos;

                if (pNombreArchivo != "")
                {
                    string vcFilePath = System.Web.HttpContext.Current.Server.MapPath("~") + "Temp\\" + pNombreArchivo;
                    vcName = pNombreArchivo.Substring(0, pNombreArchivo.LastIndexOf("."));
                    vcExtension = pNombreArchivo.Substring(pNombreArchivo.LastIndexOf(".") + 1);

                    FileStream fs = new FileStream(vcFilePath, FileMode.Open, FileAccess.Read);
                    deLength = fs.Length / 1024;
                    byFileData = new byte[fs.Length];
                    fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length));
                    fs.Close();

                    parametros.Archivo.Archivo = byFileData;
                    parametros.Archivo.Extencion = vcExtension;
                    parametros.Archivo.Nombre = vcName;
                    parametros.Archivo.Tamano = deLength;
                }

                if (parametros.EsPrivado)
                {
                    resultado = BLSolicitud.RegistrarNota(parametros);
                }
                else
                {
                    resultado = BLSolicitud.RegistrarNotaCliente(parametros);
                }

            }
            catch (Exception)
            {                
                throw;
            }
            finally
            {
                if (BLSolicitud != null)
                    BLSolicitud.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerNotas(int pIdSolicitud)
        {
            List<ENT_CSOL_Nota> notas = new List<ENT_CSOL_Nota>();
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            try
            {
                notas = BLSolicitud.ObtenerNotas(pIdSolicitud);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSolicitud != null)
                    BLSolicitud.Dispose();
            }
            return Json(notas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetArchivoNotaSolicitud(int pIdSolicitud, int pIdNota, string pNombreArchivo)
        {
            RES_Json resultado = new RES_Json();
            BL_CSOL_Solicitud BLSolicitud = new BL_CSOL_Solicitud();
            ENT_CSOL_Nota nota = new ENT_CSOL_Nota();
            try
            {
                nota = BLSolicitud.ObtenerNotas(pIdSolicitud, pIdNota)[0];
                //resultado.Data = archivo;

                string strPath = System.Web.HttpContext.Current.Server.MapPath("~") + "Temp\\";

                if (!Directory.Exists(strPath))
                    Directory.CreateDirectory(strPath);

                var ext = nota.Archivo.Extencion;
                var fileName = nota.Archivo.Nombre.Substring(0,nota.Archivo.Nombre.LastIndexOf('.'));


                fileName = GetUniqueFileName(fileName, strPath, ext).ToLower() ;
                nota.Archivo.Nombre = fileName;
                fileName += "." + ext;

                if (nota.Archivo.Archivo != null)
                {
                    byte[] barrImg = nota.Archivo.Archivo;
                    nota.Archivo.Archivo = null;
                    string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + fileName);

                    FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                    using (fs)
                    {
                        fs.Write(barrImg, 0, barrImg.Length);
                        fs.Flush();
                        fs.Close();
                    }
                }

                resultado.Data = nota.Archivo;
                resultado.Success = true;

            }
            catch (Exception)
            {
                resultado.Success = false;
            }
            finally
            {
                if (BLSolicitud != null)
                    BLSolicitud.Dispose();
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
