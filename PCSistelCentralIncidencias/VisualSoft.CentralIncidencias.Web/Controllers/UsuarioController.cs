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
using System.IO;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    [MiRedireccion]
    //[MiAutorizacion(Roles = "Administrador,Incidencias")]
    public class UsuarioController : MiController
    {


        public ActionResult Index()
        {
            MVVM_Usuario miModelo = new MVVM_Usuario();
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            try
            {
                miModelo = BLUsuario.GetMVVM();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null) BLUsuario.Dispose();
            }
            return View(miModelo);
        }

        [HttpPost]
        public JsonResult ObtenerUsuario(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                PRM_User parametros = oSerializer.Deserialize<PRM_User>(pParametros);
                tabla = BLUsuario.ObtenerUsuario(parametros);

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
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerSupervisores(string pNombres)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            PRM_User parametros = new PRM_User();
            List<ENT_CINC_Usuario> supervisores = new List<ENT_CINC_Usuario>();
            try
            {
                parametros.Nombre = pNombres;
                parametros.IdPerfil = 4;
                supervisores = BLUsuario.ObtenerUsuario_Entidad(parametros);

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(supervisores, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerSupervisoresSolicitud(string pNombres)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            PRM_User parametros = new PRM_User();
            List<ENT_CINC_Usuario> supervisores = new List<ENT_CINC_Usuario>();
            try
            {
                parametros.Nombre = pNombres;
                parametros.IdPerfil = 6;
                supervisores = BLUsuario.ObtenerUsuario_Entidad(parametros);

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(supervisores, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult PerfilByUsuario(string username)
        {
            BL_CINC_Login BLLogin = new BL_CINC_Login();
            List<ENT_CINC_Perfil> perfiles = new List<ENT_CINC_Perfil>();
            try
            {
                perfiles = BLLogin.PerfilByUsuario(username);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLLogin != null)
                    BLLogin.Dispose();
            }
            return Json(perfiles, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult obtenerPerfiles(string pParametros)
        {
            BL_CINC_Perfil BLPerfil = new BL_CINC_Perfil();
            List<ENT_CINC_Perfil> perfiles = new List<ENT_CINC_Perfil>();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                PRM_Perfil parametros = oSerializer.Deserialize<PRM_Perfil>(pParametros);
                //PRM_Perfil parametros = new PRM_Perfil();
                //parametros.EsVigente = "1";
                perfiles = BLPerfil.ObtenerPerfil_Entidad(parametros);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLPerfil != null)
                    BLPerfil.Dispose();
            }
            return Json(perfiles, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult obtenerBolsas(string pParametros)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            List<ENT_CINC_BolsaAsignar> bolsas = new List<ENT_CINC_BolsaAsignar>();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_BolsaAsignar parametros = oSerializer.Deserialize<ENT_CINC_BolsaAsignar>(pParametros);
                bolsas = BLBolsa.ObtenerBolsasAsignar_Entidad(parametros);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLBolsa != null)
                    BLBolsa.Dispose();
            }
            return Json(bolsas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult obtenerTipos(string pParametros)
        {
            VisualSoft.PCSistelMovil.CentralSolicitudes.BL.BL_CSOL_Tipo BLTipo = new VisualSoft.PCSistelMovil.CentralSolicitudes.BL.BL_CSOL_Tipo();
            List<VisualSoft.PCSistelMovil.CentralSolicitudes.BE.ENT_CSOL_Tipo> Tipos = new List<VisualSoft.PCSistelMovil.CentralSolicitudes.BE.ENT_CSOL_Tipo>();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                VisualSoft.PCSistelMovil.CentralSolicitudes.MVVM.PRM_Tipo parametros = oSerializer.Deserialize<VisualSoft.PCSistelMovil.CentralSolicitudes.MVVM.PRM_Tipo>(pParametros);
                Tipos = BLTipo.ObtenerTipo_Entidad(parametros);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLTipo != null)
                    BLTipo.Dispose();
            }
            return Json(Tipos, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult obtenerDominios(string pParametros)
        {
            BL_CINC_Dominio BLDominio = new BL_CINC_Dominio();
            List<ENT_CINC_Dominio> dominios = new List<ENT_CINC_Dominio>();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                PRM_Dominio parametros = oSerializer.Deserialize<PRM_Dominio>(pParametros);
                dominios = BLDominio.ObtenerDominio_Entidad(parametros);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLDominio != null)
                    BLDominio.Dispose();
            }
            return Json(dominios, JsonRequestBehavior.AllowGet);
        }

        #region Mantenimiento

        [HttpPost]
        public JsonResult RegistrarUsuario(string pParametros, string pNombreArchivo)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();

            string vcExtension = "";
            decimal deLength;
            byte[] byFileData;
            string vcName;
            try
            {
                ENT_CINC_Usuario parametros = oSerializer.Deserialize<ENT_CINC_Usuario>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    if (pNombreArchivo != "")
                    {
                        string vcFilePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "Temp", pNombreArchivo);
                        vcName = pNombreArchivo.Substring(0, pNombreArchivo.LastIndexOf("."));
                        vcExtension = pNombreArchivo.Substring(pNombreArchivo.LastIndexOf(".") + 1);

                        FileStream fs = new FileStream(vcFilePath, FileMode.Open, FileAccess.Read);
                        deLength = fs.Length / 1024;
                        byFileData = new byte[fs.Length];
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length));
                        fs.Close();

                        parametros.Foto.Archivo = byFileData;
                        parametros.Foto.Extencion = vcExtension;
                        parametros.Foto.Nombre = vcName;
                        parametros.Foto.Tamano = deLength;
                    }

                    resultado = BLUsuario.RegistrarUsuario(parametros);
                }
                else
                {
                    resultado.Mensaje = "Error en modelo.";
                }

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditarUsuario(string pParametros, int pCambiosIncidencias, int pCambiosSolicitudes, string pNombreArchivo)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();

            string vcExtension = "";
            decimal deLength;
            byte[] byFileData;
            string vcName;
            try
            {
                ENT_CINC_Usuario parametros = oSerializer.Deserialize<ENT_CINC_Usuario>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    if (pNombreArchivo != "")
                    {
                        string vcFilePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "Temp", pNombreArchivo);
                        vcName = pNombreArchivo.Substring(0, pNombreArchivo.LastIndexOf("."));
                        vcExtension = pNombreArchivo.Substring(pNombreArchivo.LastIndexOf(".") + 1);

                        FileStream fs = new FileStream(vcFilePath, FileMode.Open, FileAccess.Read);
                        deLength = fs.Length / 1024;
                        byFileData = new byte[fs.Length];
                        fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length));
                        fs.Close();

                        parametros.Foto.Archivo = byFileData;
                        parametros.Foto.Extencion = vcExtension;
                        parametros.Foto.Nombre = vcName;
                        parametros.Foto.Tamano = deLength;
                    }

                    resultado = BLUsuario.EditarUsuario(parametros, pCambiosIncidencias == 1, pCambiosSolicitudes == 1);
                }
                else
                {
                    resultado.Mensaje = "Error en modelo";
                }

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EliminarUsuario(int pIdUsuario)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            RES_Json resultado = new RES_Json();

            try
            {
                resultado = BLUsuario.EliminarUsuario(pIdUsuario);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ObtenerFoto
        [HttpPost]
        public JsonResult ObtenerFotoUsuario(int pIdUsuario)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            ENT_CINC_Archivo foto = new ENT_CINC_Archivo();
            RES_Json resultado = new RES_Json();
            string nombreArchivo = "";
            try
            {
                resultado.Success = false;
                foto = BLUsuario.ObtenerFotoUsuario(pIdUsuario);

                if (foto.Tamano > 0)
                {
                    byte[] barrImg = foto.Archivo;
                    nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + foto.Extencion;
                    string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);

                    FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                    using (fs)
                    {
                        fs.Write(barrImg, 0, barrImg.Length);
                        fs.Flush();
                        fs.Close();
                    }
                    resultado.Success = true;
                    resultado.Mensaje = nombreArchivo;
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion

        [HttpPost]
        public JsonResult ObtenerSupervisor(int pIdSupervisor)
        {
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            ENT_CINC_Usuario supervisor = new ENT_CINC_Usuario();
            string nombreArchivo = "";
            try
            {
                supervisor = BLUsuario.ObtenerSupervisor(pIdSupervisor);

                if (supervisor.Foto.Tamano > 0)
                {
                    byte[] barrImg = supervisor.Foto.Archivo;
                    supervisor.Foto.Archivo = null;
                    nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + supervisor.Foto.Extencion;
                    string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                    supervisor.Foto.Nombre = nombreArchivo;
                    FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                    using (fs)
                    {
                        fs.Write(barrImg, 0, barrImg.Length);
                        fs.Flush();
                        fs.Close();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();
            }

            return Json(supervisor, JsonRequestBehavior.AllowGet);
        }

        #region PerfilSolicitud

        [HttpPost]
        public JsonResult ObtenerPerfilSolicitud(int pIdUsuario, int pIdSupervisor)
        {
            List<object> mvvmPerfil = new List<object>();
            BL_CINC_Usuario BLUsuario = new BL_CINC_Usuario();
            ENT_CINC_Usuario supervisor = new ENT_CINC_Usuario();
            string nombreArchivo = "";

            BL_CINC_Dominio BLDominio = new BL_CINC_Dominio();
            List<ENT_CINC_Dominio> dominios = new List<ENT_CINC_Dominio>();

            VisualSoft.PCSistelMovil.CentralSolicitudes.BL.BL_CSOL_Tipo BLTipo = new VisualSoft.PCSistelMovil.CentralSolicitudes.BL.BL_CSOL_Tipo();
            List<VisualSoft.PCSistelMovil.CentralSolicitudes.BE.ENT_CSOL_Tipo> tipos = new List<VisualSoft.PCSistelMovil.CentralSolicitudes.BE.ENT_CSOL_Tipo>();
            try
            {
                supervisor = BLUsuario.ObtenerSupervisor(pIdSupervisor);

                if (supervisor.Foto.Tamano > 0)
                {
                    byte[] barrImg = supervisor.Foto.Archivo;
                    supervisor.Foto.Archivo = null;
                    nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + supervisor.Foto.Extencion;
                    string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                    supervisor.Foto.Nombre = nombreArchivo;
                    FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                    using (fs)
                    {
                        fs.Write(barrImg, 0, barrImg.Length);
                        fs.Flush();
                        fs.Close();
                    }
                }
                mvvmPerfil.Add(supervisor);

                PRM_Dominio parametros = new PRM_Dominio();
                parametros.IdUsuarioSolicitud = pIdUsuario;
                dominios = BLDominio.ObtenerDominio_Entidad(parametros);
                mvvmPerfil.Add(dominios);

                VisualSoft.PCSistelMovil.CentralSolicitudes.MVVM.PRM_Tipo parametro2 = new PCSistelMovil.CentralSolicitudes.MVVM.PRM_Tipo();
                parametro2.IdUsuario = pIdUsuario;
                tipos = BLTipo.ObtenerTipo_Entidad(parametro2);
                mvvmPerfil.Add(tipos);

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLUsuario != null)
                    BLUsuario.Dispose();

                if (BLDominio != null)
                    BLDominio.Dispose();

                if (BLTipo != null)
                    BLTipo.Dispose();
            }

            return Json(mvvmPerfil, JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}
