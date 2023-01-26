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
    public class NivelController : MiController
    {
        //
        // GET: /Nivel/

        public ActionResult Index()
        {
            MVVM_Nivel miModelo = new MVVM_Nivel();
            BL_CINC_Nivel BLNivel = new BL_CINC_Nivel();
            
            try
            {
                miModelo = BLNivel.GetMVVM();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLNivel != null) BLNivel.Dispose();
            }
            return View(miModelo);
        }

        [HttpPost]
        public JsonResult ObtenerNiveles(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Nivel BLNivel = new BL_CINC_Nivel();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                

                PRM_Nivel parametros = oSerializer.Deserialize<PRM_Nivel>(pParametros);
                tabla = BLNivel.ObtenerNiveles(parametros);

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
                if (BLNivel != null)
                    BLNivel.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerBolsas(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
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
        public JsonResult ObtenerTecnicos(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Tecnico BLTecnico = new BL_CINC_Tecnico();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                PRM_Usuario parametros = oSerializer.Deserialize<PRM_Usuario>(pParametros);
                tabla = BLTecnico.ObtenerTecnicos(parametros);

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
                if (BLTecnico != null)
                    BLTecnico.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RegistrarNivel(string pParametros)
        {
            BL_CINC_Nivel BLNivel = new BL_CINC_Nivel();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Nivel parametros = oSerializer.Deserialize<ENT_CINC_Nivel>(pParametros);

                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLNivel.RegistrarNivel(parametros);
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
                if (BLNivel != null)
                    BLNivel.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditarNivel(string pParametros)
        {
            BL_CINC_Nivel BLNivel = new BL_CINC_Nivel();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Nivel parametros = oSerializer.Deserialize<ENT_CINC_Nivel>(pParametros);

                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    resultado = BLNivel.EditarNivel(parametros);
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
                if (BLNivel != null)
                    BLNivel.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EliminarNivel(string pParametros,int pOrden, bool pAceptacionAislar)
        {
            BL_CINC_Nivel BLNivel = new BL_CINC_Nivel();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Nivel parametros = oSerializer.Deserialize<ENT_CINC_Nivel>(pParametros);
                parametros.Grado.Orden = pOrden;

                //TryUpdateModel(parametros);

                //if (ModelState.IsValid)
                //{
                    resultado = BLNivel.EliminarNivel(parametros, pAceptacionAislar);
                //}
                //else
                //{
                //    resultado.Mensaje = "Error en modelo";
                //}

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLNivel != null)
                    BLNivel.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

    }
}
