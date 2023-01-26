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
    //[MiAutorizacion(Roles = "Administrador,Incidencias")]
    public class BolsaController : MiController
    {
        //
        // GET: /Bolsa/
        

        public ActionResult Index()
        {
            MVVM_Bolsa miModelo = new MVVM_Bolsa();
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            try
            {
                miModelo = BLBolsa.GetMVVM();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLBolsa != null) BLBolsa.Dispose();
            }
            return View(miModelo);
        }

        [HttpPost]
        public JsonResult ObtenerBolsa(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                PRM_Bolsa parametros = oSerializer.Deserialize<PRM_Bolsa>(pParametros);
                tabla = BLBolsa.ObtenerBolsas(parametros);

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
                if (BLBolsa != null)
                    BLBolsa.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetBolsa(int pIdBolsa)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            ENT_CINC_Bolsa bolsa = new ENT_CINC_Bolsa();
            try
            {
                bolsa = BLBolsa.GetBolsa(pIdBolsa);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLBolsa != null) BLBolsa.Dispose();
            }
            return Json(bolsa, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerLiBolsasEscalar(int pIdNivel, int pIdBolsa)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            List<List<string>> lis = new List<List<string>>();
            try
            {
                lis = BLBolsa.ObtenerLiBolsasEscalar(pIdNivel,pIdBolsa);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLBolsa != null) BLBolsa.Dispose();
            }
            return Json(lis, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerBolsasEnlazadas(int pIdBolsa)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            List<object> Enlaces = new List<object>();
            try
            {
                Enlaces = BLBolsa.ObtenerBolsasEnlazadas(pIdBolsa);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLBolsa != null) BLBolsa.Dispose();
            }
            return Json(Enlaces, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerBolsasOrigen(int pIdBolsa, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            DataTable tabla = new DataTable();
            try
            {
                tabla = BLBolsa.ObtenerBolsasOrigen(pIdBolsa);

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
                if (BLBolsa != null) BLBolsa.Dispose();
            }
            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerBolsasDestino(int pIdBolsa, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            DataTable tabla = new DataTable();
            try
            {
                tabla = BLBolsa.ObtenerBolsasDestino(pIdBolsa);

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
                if (BLBolsa != null) BLBolsa.Dispose();
            }
            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        #region mantenimiento
        [HttpPost]
        public JsonResult RegistrarBolsa(string pParametros, string pIdsBolsas)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Bolsa parametros = oSerializer.Deserialize<ENT_CINC_Bolsa>(pParametros);
                List<string> idsBolsas = oSerializer.Deserialize<List<string>>(pIdsBolsas);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLBolsa.RegistrarBolsa(parametros, idsBolsas);
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
                if (BLBolsa != null)
                    BLBolsa.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditarBolsa(string pParametros, string pIdsBolsas)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Bolsa parametros = oSerializer.Deserialize<ENT_CINC_Bolsa>(pParametros);
                List<string> idsBolsas = oSerializer.Deserialize<List<string>>(pIdsBolsas);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLBolsa.EditarBolsa(parametros, idsBolsas);
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
                if (BLBolsa != null)
                    BLBolsa.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EliminarBolsa(int pIdBolsa)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            RES_Json resultado = new RES_Json();
            try
            {
                resultado = BLBolsa.EliminarBolsa(pIdBolsa);
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

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Validaciones
        public JsonResult ValidarSiBolsaTieneTickets(int pIdBolsa)
        {
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();
            RES_Json resultado = new RES_Json();
            try
            {
                resultado = BLBolsa.ValidarSiBolsaTieneTickets(pIdBolsa);
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
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
