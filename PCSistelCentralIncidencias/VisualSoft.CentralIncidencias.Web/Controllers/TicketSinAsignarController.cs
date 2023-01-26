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
using ClosedXML.Excel;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    [MiRedireccion]
    //[MiAutorizacion(Roles = "Administrador,Incidencias")]
    public class TicketSinAsignarController : MiController
    {
        //
        // GET: /TicketSinAsignar/

        


        public ActionResult Index()
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            MVVM_Ticket miModelo = new MVVM_Ticket();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            try
            {
                miModelo = BLTicket.ObtenerFiltrosTicket(UsuarioSesion.IdUsuario);
            }
            catch (Exception)
            {

                throw;
            }
            finally {
                if (BLTicket != null) BLTicket.Dispose();
            }
            return View(miModelo);
        }

        [HttpPost]
        public JsonResult GetTicketSinAsignar(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                PRM_TicketSinAsignar parametros = oSerializer.Deserialize<PRM_TicketSinAsignar>(pParametros);
                tabla = BLTicket.TicketSinAsignar(parametros);
                //esto 
                Session["MiTablaExportarTicketSinAsignar"] = tabla;
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
                if (BLTicket != null) 
                    BLTicket.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetTecnicosParaAsignar(int pIdBolsa, int pIdDominio)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            List<ENT_CINC_Tecnico> tecnicos = new List<ENT_CINC_Tecnico>();
            BL_CINC_Tecnico BLTecnico = new BL_CINC_Tecnico();
            try
            {
                tecnicos = BLTecnico.TecnicosBySupervisorBolsa(UsuarioSesion.IdUsuario, pIdBolsa, pIdDominio);

                for (int i = 0; i < tecnicos.Count; i++)
                {
                    if (tecnicos[i].Foto.Tamano > 0)
                    {
                        byte[] barrImg = tecnicos[i].Foto.Archivo;
                        tecnicos[i].Foto.Archivo = null;
                        string nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + tecnicos[i].Foto.Extencion;
                        string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                        tecnicos[i].Foto.Nombre = nombreArchivo;
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
                if (BLTecnico != null)
                    BLTecnico.Dispose();
            }
            return Json(tecnicos, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RegistrarAsignarTicket(string pParametros)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            RES_Json resultado = new RES_Json();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                PRM_AsignarTicket parametros = oSerializer.Deserialize<PRM_AsignarTicket>(pParametros);
                parametros.IdUsuarioRegistro = UsuarioSesion.IdUsuario;

                resultado = BLTicket.AsignarTicket(parametros);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLTicket != null)
                    BLTicket.Dispose();
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }


        //para exportar a excel jpareja
        [HttpPost]
        public JsonResult ExportarExcel(string TipoVersion)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            string cadena = String.Empty;
            string NombreArchivo = "TicketSinAsignar";
            string NombreHoja = "TicketSinAsignar";

            DataTable dtSolicitud = (DataTable)Session["MiTablaExportarTicketSinAsignar"]; 
            dtSolicitud.AcceptChanges();
            string RutaDownloaded = ExportarDatosPersonalizados(dtSolicitud, Convert.ToInt32(TipoVersion), NombreHoja, NombreArchivo);

            RES_Json resultado = new RES_Json();
            resultado.Success = true;
            resultado.Mensaje = "Correcto";
            resultado.Data = RutaDownloaded;

            dtSolicitud.Clear();
            dtSolicitud.Dispose();

            dtSolicitud = (DataTable)Session["MiTablaExportarTicketSinAsignar"]; 
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public string ExportarDatosPersonalizados(DataTable dtDatos, int TipoVersion, string NombreHoja = "", string NombreArchivo = "")
        {

            //parea validar registros en el datatable --jparjea
            int filas = dtDatos.Rows.Count;
            if (dtDatos == null || filas == 0)
                return "DataTableVacio";

            if (string.IsNullOrEmpty(NombreHoja))
                NombreHoja = dtDatos.TableName; 
            ENT_CINC_ExportarExcel objTipoExcel = new ENT_CINC_ExportarExcel();
            string attachment = String.Empty; 
            if (TipoVersion == 0)
            {
                objTipoExcel.oTipoExcel = TipoExcel.Excel2003oInferior;
                attachment = NombreArchivo + ".xls";
            } 
            if (TipoVersion == 1)
            {
                objTipoExcel.oTipoExcel = TipoExcel.Excel2007oSuperior;
                attachment = NombreArchivo + ".xlsx";
            } 
            string ruta = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + attachment);
            XLWorkbook workbook = new XLWorkbook(); 
            workbook.Worksheets.Add(dtDatos);
            workbook.SaveAs(ruta); 
            return attachment;
        }

    }
}
