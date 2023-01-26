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

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    [MiRedireccion]
    //[MiAutorizacion(Roles = "Administrador,Solicitudes")]
    public class TipoSolicitudController : MiController
    {

        public ActionResult Index()
        {
            MVVM_Tipo miModelo = new MVVM_Tipo();
            BL_CSOL_Tipo BLTipo = new BL_CSOL_Tipo();
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
            return View();
        }

        [HttpPost]
        public JsonResult ObtenerTipo(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CSOL_Tipo BLTipo = new BL_CSOL_Tipo();
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

        #region mantenimiento

        [HttpPost]
        public JsonResult RegistrarTipo(string pParametros)
        {
            BL_CSOL_Tipo BLTipo = new BL_CSOL_Tipo();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CSOL_Tipo parametros = oSerializer.Deserialize<ENT_CSOL_Tipo>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLTipo.RegistrarTipo(parametros);
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
                if (BLTipo != null)
                    BLTipo.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditarTipo(string pParametros)
        {
            BL_CSOL_Tipo BLTipo = new BL_CSOL_Tipo();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CSOL_Tipo parametros = oSerializer.Deserialize<ENT_CSOL_Tipo>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLTipo.EditarTipo(parametros);
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
                if (BLTipo != null)
                    BLTipo.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EliminarTipo(int pIdTipo)
        {
            BL_CSOL_Tipo BLTipo = new BL_CSOL_Tipo();
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

        [HttpPost]
        public JsonResult DiasByTipo(int pIdTipo)
        {
            BL_CSOL_Tipo BLTipo = new BL_CSOL_Tipo();
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

    }
}
