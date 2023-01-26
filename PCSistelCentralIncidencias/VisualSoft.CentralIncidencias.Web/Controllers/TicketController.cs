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
using Ionic.Zip;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    [MiRedireccion]
    //[MiAutorizacion(Roles = "Administrador,Incidencias")]
    public class TicketController : MiController
    {
        //
        // GET: /Ticket/
        

        public ActionResult Index()
        {
            MVVM_Ticket miModelo = new MVVM_Ticket();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            try
            {
                miModelo = BLTicket.ObtenerFiltrosTicket(UsuarioSesion.IdUsuario);

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
                if (BLTicket != null) BLTicket.Dispose();
            }
            return View(miModelo);
        }

        [HttpPost]
        public JsonResult GetTicket(string pParametros, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            DataTable tabla = new DataTable();
            try
            {
                PRM_Ticket parametros = oSerializer.Deserialize<PRM_Ticket>(pParametros);
                parametros.CodigoEstado = parametros.CodigoEstado.Replace('|', '\'');
                tabla = BLTicket.GetTicket(parametros);
                //estojpareja
                Session["MiTablaExportarTicket"] = tabla;
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
        public JsonResult RegistrarNota(string pParametros , string pNombreArchivo)
        {
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];

            string vcExtension = "";
            decimal deLength;
            byte[] byFileData;
            string vcName;
            try
            {
                PRM_Nota parametros = oSerializer.Deserialize<PRM_Nota>(pParametros);
                parametros.IdUsuario = UsuarioSesion.IdUsuario;
                parametros.NombreUsuario = UsuarioSesion.Nombres + " " + UsuarioSesion.Apellidos;
                if (pNombreArchivo != "")
                {
                    string vcFilePath = System.Web.HttpContext.Current.Server.MapPath("~") + "\\Temp\\" +pNombreArchivo;
                    vcName = pNombreArchivo.Substring(0, pNombreArchivo.LastIndexOf("."));
                    vcExtension = pNombreArchivo.Substring(pNombreArchivo.LastIndexOf(".") + 1);

                    FileStream fs = new FileStream(vcFilePath, FileMode.Open, FileAccess.Read);
                    deLength = fs.Length / 1024;
                    byFileData = new byte[fs.Length] ;
                    fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length));
                    fs.Close();

                    parametros.Archivo.Archivo = byFileData;
                    parametros.Archivo.Extencion = vcExtension;
                    parametros.Archivo.Nombre = vcName;
                    parametros.Archivo.Tamano = deLength;
                }

                resultado = BLTicket.RegistrarNota(parametros);

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

        [HttpPost]
        public JsonResult Notas_Inicial(int pIdTicket, int pIdTicketEscalamiento, int pTipoPerfil)
        {
            List<MVVM_Nota> notas = new List<MVVM_Nota>();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();

            try
            {
                notas = BLTicket.Notas_Inicial(pIdTicket, pIdTicketEscalamiento, pTipoPerfil);
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

            return Json(notas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Notas_Final(int pIdTicket)
        {
            List<object> notas = new List<object>();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();

            try
            {
                notas = BLTicket.Notas_Final(pIdTicket);
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

            return Json(notas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerDatosTificacion(string pTipo)
        {
            List<ENT_CINC_Tipificacion> lstTipificacion = new List<ENT_CINC_Tipificacion>();
            BL_CINC_Tipificacion BLTipificacion = new BL_CINC_Tipificacion();

            try
            {
                lstTipificacion = BLTipificacion.TipificacionByTipo(Convert.ToInt32(pTipo));
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLTipificacion != null)
                    BLTipificacion.Dispose();
            }

            return Json(lstTipificacion, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Notas_Finalizadas(int pIdTicketEscalamiento, int pIdTicketInicio, int pIdTicketFin)
        {
            List<MVVM_Nota> notas = new List<MVVM_Nota>();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();

            try
            {
                notas = BLTicket.Notas_Finalizadas(pIdTicketEscalamiento, pIdTicketInicio, pIdTicketFin);
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

            return Json(notas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ActivarAyuda(int pIdTicket)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            RES_Json resultado = new RES_Json();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();

            try
            {
                resultado = BLTicket.ActivarAyuda(pIdTicket, UsuarioSesion.IdUsuario);
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

        [HttpPost]
        public JsonResult ActivarTicket(int pIdTicket)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            RES_Json resultado = new RES_Json();
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();

            try
            {
                resultado = BLTicket.ActivarTicket(pIdTicket, UsuarioSesion.IdUsuario);
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

        [HttpPost]
        public JsonResult ObtenerBolsasEscalamiento(int pIdBolsa, int pIdNivel)
        {
            List<ENT_CINC_Bolsa> resultado = new List<ENT_CINC_Bolsa>();
            BL_CINC_Bolsa BLBolsa = new BL_CINC_Bolsa();

            try
            {
                resultado = BLBolsa.ObtenerBolsasEscalamiento(pIdNivel, pIdBolsa)[1];
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


        //para exportar a excel jpareja
        [HttpPost]
        public JsonResult ExportarExcel(string TipoVersion)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"]; 
            string cadena = String.Empty; 
            string NombreArchivo = "Ticket";
            string NombreHoja = "Ticket"; 

            DataTable dtSolicitud = (DataTable)Session["MiTablaExportarTicket"];
            dtSolicitud.Columns.Remove("Id");
            dtSolicitud.Columns.Remove("Identificador");
            dtSolicitud.Columns.Remove("IdUsuario");
            dtSolicitud.Columns.Remove("IdUsuarioTecnico");
            dtSolicitud.Columns.Remove("IdBolsa");
            dtSolicitud.Columns.Remove("IdNivel");
            dtSolicitud.Columns.Remove("IdDominio");
            dtSolicitud.Columns.Remove("IdTipo");
            dtSolicitud.Columns.Remove("IdTipificacion");
            dtSolicitud.Columns.Remove("IdTicketExterno"); 
            dtSolicitud.Columns.Remove("IdTicketEscalamiento_Inicial");
            dtSolicitud.Columns.Remove("IdTicketEscalamiento_Final");
            
            
            dtSolicitud.AcceptChanges(); 
            string RutaDownloaded = ExportarDatosPersonalizados(dtSolicitud, Convert.ToInt32(TipoVersion), NombreHoja, NombreArchivo);

            RES_Json resultado = new RES_Json();
            resultado.Success = true;
            resultado.Mensaje = "Correcto";
            resultado.Data = RutaDownloaded;

            dtSolicitud.Clear();
            dtSolicitud.Dispose();

            dtSolicitud = (DataTable)Session["MiTablaExportarTicket"];

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public string ExportarDatosPersonalizados(DataTable dtDatos, int TipoVersion, string NombreHoja = "", string NombreArchivo = "")
        {
            //parea validar registros en el datatable --jparjea
            int filas = dtDatos.Rows.Count;
            if (dtDatos == null || filas==0)
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

        [HttpPost]
        public JsonResult DescargarAdjuntosTicket(string idTicket, string CodTicket)
        {
            RES_Json resultado = new RES_Json();
            try
            {
                var vcFilePath = "";
                DataSet dsResult = new DataSet();
                BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
                dsResult = BLTicket.ObtenerDSAdjuntosPorIdTicket(idTicket);

                string vcRutaTMP = System.Web.HttpContext.Current.Server.MapPath("~/Temp/");
                string vcRutaTMPCompleta = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + CodTicket + "/");
                
                if (Directory.Exists(vcRutaTMPCompleta))
                {
                    Directory.Delete(vcRutaTMPCompleta, true);
                }
                if (!Directory.Exists(vcRutaTMPCompleta))
                {
                    Directory.CreateDirectory(vcRutaTMPCompleta);
                }

                foreach (DataRow dr in dsResult.Tables[0].Rows)
                {
                    vcFilePath = vcRutaTMPCompleta + dr["NombreArchivo"].ToString();
                    byte[] byFileData = (byte[])dr["Archivo"];
                    System.IO.File.WriteAllBytes(vcFilePath, byFileData);
                }

                using (ZipFile zip = new ZipFile())
                {
                    zip.AddDirectory(vcRutaTMPCompleta);
                    zip.Save(vcRutaTMP + CodTicket + ".zip");
                    Directory.Delete(vcRutaTMPCompleta, true);
                    resultado.Data = CodTicket + ".zip";
                }
            }
            catch (Exception ex)
            {
                resultado.Data = "ERROR|" + ex.Message.ToString(); ;
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #region Acciones
        [HttpPost]
        public JsonResult EscalarTicket(string pParametros)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            RES_Json resultado = new RES_Json();
            try
            {
                PRM_TicketAccion parametros = oSerializer.Deserialize<PRM_TicketAccion>(pParametros);
                parametros.IdUsuario = UsuarioSesion.IdUsuario;
                resultado = BLTicket.EscalarTicket(parametros);
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

        [HttpPost]
        public JsonResult CerrarTicket(string pParametros)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            
            BL_CINC_Ticket BLTicket = new BL_CINC_Ticket();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            RES_Json resultado = new RES_Json();
            try
            {
                PRM_TicketAccion parametros = oSerializer.Deserialize<PRM_TicketAccion>(pParametros);
                parametros.IdUsuario = UsuarioSesion.IdUsuario;
                if (parametros.IdTicketExterno != -1)
                {
                    parametros.CierreDesdeCentral = true;
                }
                resultado = BLTicket.CerrarTicket(parametros);
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
        #endregion

        

    }
}
