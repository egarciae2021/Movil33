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
    //[MiAutorizacion(Roles = "Administrador,Solicitudes,Incidencias")]
    public class TipoController : MiController
    {
        //
        // GET: /Tipo/

        public ActionResult Index()
        {
            MVVM_Tipo miModelo = new MVVM_Tipo();
            BL_CINC_Tipo BLTipo = new BL_CINC_Tipo();
            try
            {
                miModelo = BLTipo.GetMVVM();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLTipo != null) BLTipo.Dispose();
            }
            return View(miModelo);
        }

        [HttpPost]
        public JsonResult ObtenerTipo(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Tipo BLTipo = new BL_CINC_Tipo();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                PRM_Tipo parametros = oSerializer.Deserialize<PRM_Tipo>(pParametros);
                tabla = BLTipo.ObtenerTipo(parametros);

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
                if (BLTipo != null)
                    BLTipo.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerCanalAtencionByTipo(int pIdTipo)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            List<ENT_CINC_Bolsa> bolsas = new List<ENT_CINC_Bolsa>();
            ENT_CINC_Bolsa bolsa = new ENT_CINC_Bolsa(); 
            try
            {
                bolsas = BLBolsa.ObtenerCanalesAtencion(pIdTipo);
                if (bolsas.Count > 0)
                {
                    bolsa = bolsas[0];
                }
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

            return Json(bolsa, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerTipificacion(int pIdTipo, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Tipificacion BLTipificacion = new BL_CINC_Tipificacion();
            DataTable tabla = new DataTable();
            try
            {
                tabla = BLTipificacion.ObtenerTipificacion(new PRM_Tipificacion(pIdTipo));

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
                if (BLTipificacion != null) BLTipificacion.Dispose();
            }
            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerTipificacionEntidades(int pIdTipo)
        {
            BL_CINC_Tipificacion BLTipificacion = new BL_CINC_Tipificacion();
            List<ENT_CINC_Tipificacion> tipificaciones = new List<ENT_CINC_Tipificacion>();
            try
            {
                tipificaciones = BLTipificacion.ObtenerTipificacion_Entidad(new PRM_Tipificacion(pIdTipo));
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLTipificacion != null) BLTipificacion.Dispose();
            }
            return Json(tipificaciones, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DiasByTipo(int pIdTipo)
        {
            BL_CINC_Tipo BLTipo = new BL_CINC_Tipo();
            List<int> dias = new List<int>();
            try
            {
                dias = BLTipo.DiasByTipo(pIdTipo);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLTipo != null) BLTipo.Dispose();
            }
            return Json(dias, JsonRequestBehavior.AllowGet);
        }

        #region mantenimiento

        [HttpPost]
        public JsonResult RegistrarTipo(string pParametros)
        {
            BL_CINC_Tipo BLTipo = new BL_CINC_Tipo();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Tipo parametros = oSerializer.Deserialize<ENT_CINC_Tipo>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLTipo.RegistrarTipo(parametros);
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
                if (BLTipo != null)
                    BLTipo.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditarTipo(string pParametros)
        {
            BL_CINC_Tipo BLTipo = new BL_CINC_Tipo();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Tipo parametros = oSerializer.Deserialize<ENT_CINC_Tipo>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLTipo.EditarTipo(parametros);
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
                if (BLTipo != null)
                    BLTipo.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EliminarTipo(int pIdTipo)
        {
            BL_CINC_Tipo BLTipo = new BL_CINC_Tipo();
            RES_Json resultado = new RES_Json();

            try
            {
                resultado = BLTipo.EliminarTipo(pIdTipo);
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

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}
