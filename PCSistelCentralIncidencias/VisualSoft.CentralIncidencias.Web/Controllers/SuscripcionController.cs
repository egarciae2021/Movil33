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
using System.Xml;
using System.Text;
using VisualSoft.CentralIncidencias.Web.Code;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ionic.Zip;
using System.Text.RegularExpressions;

namespace VisualSoft.CentralIncidencias.Web.Controllers
{
    [MiRedireccion]
    //[MiAutorizacion(Roles = "Administrador,Operador,Incidencias")]
    public class SuscripcionController : MiController
    {
        
        private DataTable tabla = new DataTable();
        private string TmpRuc;
        private int TmpPais;
        private string TmpPaisName;

        public ActionResult Index()
        {
            MVVM_Suscripcion miModelo = new MVVM_Suscripcion();

            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            try
            {
                miModelo = BLSubscripcion.GetMVVM();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null) BLSubscripcion.Dispose();
            }

            return View(miModelo);
        }


        [HttpPost]
        public JsonResult ListarSubscripcionesTipo()
        {
            BL_CINC_SuscripcionTipo BL_Tipo = new BL_CINC_SuscripcionTipo();
            List<ENT_CINC_SuscripcionTipo> Tipo = new List<ENT_CINC_SuscripcionTipo>();

            try
            {
                Tipo = BL_Tipo.Listar();
            }
            catch
            {
                throw;
            }
            finally
            {
                if (BL_Tipo != null)
                    BL_Tipo.Dispose();
            }

            return Json(Tipo, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult ListarLicenciaTipo()
        {
            BL_CINC_TipoLicencia BL_Licencia = new BL_CINC_TipoLicencia();
            List<ENT_CINC_TipoLicencia> Licencia = new List<ENT_CINC_TipoLicencia>();

            try
            {
                Licencia = BL_Licencia.ObtenerTipoLicencia_Entidad();
            }
            catch
            {
                throw;
            }
            finally
            {
                if (BL_Licencia != null)
                    BL_Licencia.Dispose();
            }

            return Json(Licencia, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ListarSubscripciones(string vcTodos, string inPagTam, string inPagAct, string vcOrdCol, string vcTipOrdCol, string strTipos, int intFiltro, string strFiltro, string strFiltro2, string inTipFil,
        string biSolNoVis, string vcVista, string vcFiltroFecha, string strRangFechaIni, string strRangFechaFin, string vcResAre, int inCodTip, string pParametros)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];

            if (strFiltro2 == "undefined") strFiltro2 = "null";
            
            PRM_Suscripcion parametros = new PRM_Suscripcion();

            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();

            parametros = oSerializer.Deserialize<PRM_Suscripcion>(pParametros);            

            parametros.vcTodos = vcTodos;
            parametros.inPagTam = Convert.ToInt32(inPagTam);
            parametros.inPagAct = Convert.ToInt32(inPagAct);
            parametros.vcOrdCol = vcOrdCol;
            parametros.vcTipOrdCol = vcTipOrdCol;
            parametros.strTipos = strTipos;
            parametros.intFiltro = intFiltro;
            parametros.strFiltro = strFiltro;
            parametros.strFiltro2 = strFiltro2;
            parametros.inTipFil = inTipFil;
            parametros.biSolNoVis = biSolNoVis;
            parametros.vcVista = vcVista;
            parametros.vcFiltroFecha = vcFiltroFecha;
            parametros.strRangFechaIni = strRangFechaIni;
            parametros.strRangFechaFin = strRangFechaFin;
            parametros.vcResAre = "";
            parametros.inCodTip = 0;
            parametros.IdUsuario = UsuarioSesion.IdUsuario;

            //DataTable tabla = new DataTable();
            try
            {
                tabla = BLSubscripcion.GetListado(parametros);

                Session["MiTablaExportar"] = tabla;

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
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return Json(JQGrid.DatosJSON(tabla, parametros.inPagTam, parametros.inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerTitulares(int pIdSolicitud, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            DataTable tabla = new DataTable();
            try
            {
                tabla = BLSubscripcion.ObtenerTitulares(pIdSolicitud);

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
                if (BLSubscripcion != null) BLSubscripcion.Dispose();
            }
            return Json(JQGrid.DatosJSON(tabla, inPagTam, inPagAct), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ObtenerTitularesEntidades(int pIdSolicitud, int inPagTam, int inPagAct, string vcOrdCol, string vcTipOrdCol)
        {
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            List<ENT_CINC_SuscripcionTitulares> titulares = new List<ENT_CINC_SuscripcionTitulares>();
            try
            {
                titulares = BLSubscripcion.ObtenerTitularesEntidades(pIdSolicitud);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null) BLSubscripcion.Dispose();
            }
            return Json(titulares, JsonRequestBehavior.AllowGet);
        }


        #region mantenimiento

        [HttpPost]
        public JsonResult RegistrarSubscripcion(string pParametros)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            int IdOperador = UsuarioSesion.Perfiles[0].IdPerfil;


            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Suscripcion parametros = oSerializer.Deserialize<ENT_CINC_Suscripcion>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    parametros.IdOperador = IdOperador;
                    parametros.IdEstado = 1;
                    parametros.IdUsuarioRegistro = UsuarioSesion.IdUsuario;
                    resultado = BLSubscripcion.RegistrarSubscripcion(parametros);
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
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditarSubscripcion(string pParametros)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            int IdOperador = UsuarioSesion.Perfiles[0].IdPerfil;

            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                ENT_CINC_Suscripcion parametros = oSerializer.Deserialize<ENT_CINC_Suscripcion>(pParametros);
                TryUpdateModel(parametros);

                if (ModelState.IsValid)
                {
                    parametros.IdOperador = IdOperador;
                    parametros.IdEstado = 1;
                    parametros.IdUsuarioRegistro = UsuarioSesion.IdUsuario;
                    resultado = BLSubscripcion.EditarSubscripcion(parametros);
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
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarSubscripcion(string vcIdSolicitud)
        {
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            RES_Json resultado = new RES_Json();
            try
            {
                resultado = BLSubscripcion.EliminarSubscripcion(vcIdSolicitud);
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult EliminarSubscripcion(string vcIdSolicitud, string vcIdTipoSolicitud)
        //{
        //    BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
        //    RES_Json resultado = new RES_Json();

        //    try
        //    {
        //        resultado = BLSubscripcion.EliminarSubscripcion(Convert.ToInt32(vcIdSolicitud), Convert.ToInt32(vcIdTipoSolicitud));
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //    finally
        //    {
        //        if (BLSubscripcion != null)
        //            BLSubscripcion.Dispose();
        //    }

        //    return Json(resultado, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult EnviarSubscripcion(string vcIdSolicitud)
        {
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            RES_Json resultado = new RES_Json();
             List<string> IdsSolicitudes = vcIdSolicitud.Split(',').ToList();
             ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            try
            {
                resultado.Success = true;

                int contador = 0;
                for (int i = 0; i < IdsSolicitudes.Count; i++)
                {
                    resultado = BLSubscripcion.EnviarSubscripcion(IdsSolicitudes[i].Replace("\"", ""), UsuarioSesion.IdUsuario);
                    if (!resultado.Success)
                    {
                        contador += 1;
                    }
                }

                if (IdsSolicitudes.Count == 1 && contador == 1)
                {
                    resultado.Success = false;
                }
                else
                {
                    resultado.Success = true;
                    if (contador > 0)
                    {
                        resultado.Mensaje = "algunas solicitudes no fueron enviadas";
                    }
                    else
                    {
                        resultado.Mensaje = "Las suscripciones han sido enviadas";
                    }
                
                }
                
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion


        [HttpPost]
        public JsonResult Notas_Inicial(int pIdSubscripcion, int pIdSubscripcionNota)
        {
            //=======================================================================================
            //Inicio: Registramos que las notas de esta subscripcion fue leida.

            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            int IdOperador = UsuarioSesion.IdUsuario;

            BL_CINC_SuscripcionNotaVisto BLSubscripcionVisto = new BL_CINC_SuscripcionNotaVisto();
            PRM_SuscripcionNotaVisto objSolicitudNotaVisto = new PRM_SuscripcionNotaVisto();

            objSolicitudNotaVisto.IdSolicitudNota = Convert.ToInt32(pIdSubscripcion);
            objSolicitudNotaVisto.IdUsuario = UsuarioSesion.IdUsuario; ;
            objSolicitudNotaVisto.NomUsuario = UsuarioSesion.Nombres;

            BLSubscripcionVisto.Guardar(objSolicitudNotaVisto);

            //Fin: Registramos que las notas de esta subscripcion fue leida.
            //=======================================================================================




            List<MVVM_SuscripcionNota> notas = new List<MVVM_SuscripcionNota>();
            BL_CINC_SuscripcionNota BLSubscripcion = new BL_CINC_SuscripcionNota();

            try
            {
                notas = BLSubscripcion.MostrarNotas(pIdSubscripcion, pIdSubscripcionNota);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return Json(notas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ActualizarEstadoSuscripcion(int pIdSubscripcion)
        {
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            RES_Json resultado = new RES_Json();

            try
            {
                resultado = BLSubscripcion.SuscripcionCulminarCargaDatos(pIdSubscripcion);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RegistrarNota(string pParametros, string pNombreArchivo)
        {
            BL_CINC_SuscripcionNota BLSubscripcionNota = new BL_CINC_SuscripcionNota();
            RES_Json resultado = new RES_Json();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];

            string vcExtension = "";
            decimal deLength;
            byte[] byFileData;
            string vcName;
            try
            {
                PRM_SuscripcionNota parametros = oSerializer.Deserialize<PRM_SuscripcionNota>(pParametros);
                parametros.IdUsuario = UsuarioSesion.IdUsuario;
                parametros.NombreUsuario = UsuarioSesion.Nombres + " " + UsuarioSesion.Apellidos;

                if (pNombreArchivo != "")
                {
                    string vcFilePath = System.Web.HttpContext.Current.Server.MapPath("~") + "Temp\\" + pNombreArchivo;
                    //string vcFilePath = Url.Content("~\\Temp\\" + pNombreArchivo);

                    vcName = pNombreArchivo.Substring(0, pNombreArchivo.LastIndexOf("."));
                    vcExtension = pNombreArchivo.Substring(pNombreArchivo.LastIndexOf(".") + 1);
                    

                    FileStream fs = new FileStream(vcFilePath, FileMode.Open, FileAccess.Read);
                    deLength = fs.Length / 1024;
                    byFileData = new byte[fs.Length];
                    fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length));
                    fs.Close();

                    parametros.Archivo = byFileData;
                    parametros.Extension = vcExtension;
                    parametros.NombreArchivo = vcName;
                    parametros.Tamanio = deLength.ToString();
                }

                resultado = BLSubscripcionNota.RegistrarNota(parametros);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcionNota != null)
                    BLSubscripcionNota.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Index(MVVM_Suscripcion model, HttpPostedFileBase flUpload)
        {
            string myString = "";
            if (flUpload != null && flUpload.ContentLength > 0)
            {
                var fileName = Path.GetFileName(flUpload.FileName);
                var path = Path.Combine(Server.MapPath("~/Temp/"), fileName);
                flUpload.SaveAs(path);
                myString = guardarDatos(fileName);                
            }

            ViewData["Mensaje"] = myString;            

            //==============================================================            
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            model = BLSubscripcion.GetMVVM();
            //==============================================================

            return View(model);        
        }

        public string guardarDatos(string fileName)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];

            string ruta = Path.Combine(Server.MapPath("~/Temp/"), fileName);

            string strMensaje = "";
            if (string.IsNullOrEmpty(fileName))
            {
                strMensaje = "Seleccione un archivo del tipo Excel(xls, xlsx)";
                return strMensaje;

            }
            else if (!string.IsNullOrEmpty(fileName))
            {
                bool valido = false;
                foreach (string ext in Extensiones())
                {
                    if (Path.GetExtension(fileName).ToString().Equals(ext))
                    {
                        valido = true;
                    }
                }

                if (valido == false)
                {
                    strMensaje = "Seleccione un archivo del tipo Excel(xls, xlsx)";
                    return strMensaje;
                }
            }

            string filename = Path.GetFileName(fileName);
            int DiferenciaFecha;


            XLWorkbook ArchivoExcel = new XLWorkbook(ruta);
            IXLWorksheet Hoja = ArchivoExcel.Worksheets.First();

            List<ENT_CINC_Suscripcion> lsSolicitud = new List<ENT_CINC_Suscripcion>();

            //List<ENT_CINC_Usuario> lsDatosUsuario = (List<ENT_CINC_Usuario>)HttpContext.Session["datos"];

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT></ROOT>");


            string NombreEmpresa, RazonSocial, Ruc, FechaInicioContrato, FechaFinContrato, Observacion, Descripcion, NombreT1, ApeT1, CorreoT1, NombreT2, ApeT2, CorreoT2;
            
            int Lineas;
            int CodPais = 0;
            string Pais = string.Empty;
            int CodTipoLicencia = 0;
            string TipoLicencia = string.Empty;
            

            for (int i = 5; i < 65536; i++)
            {
                if (Hoja.Cell(i, 1).Value.ToString() == "")
                {
                    break;
                }

                if (Hoja.Cell(i, 2).Value.ToString() == "" || Hoja.Cell(i, 2).Value.ToString().Trim().Length > 200)
                {
                    strMensaje = "Ingrese un formato de Razón Social en la celda B" + i.ToString();
                    return strMensaje;
                }

                if (Hoja.Cell(i, 3).Value.ToString() == "" || Hoja.Cell(i, 3).Value.ToString().Trim().Length != 11 || validaDatos(Hoja.Cell(i, 3).Value.ToString().Trim(), 1) != true)
                {
                    strMensaje = "Ingrese un nùmero de Ruc válido en la celda C" + i.ToString();
                    return strMensaje;
                }

                /*
                if (Hoja.Cell(i, 4).Value.ToString() == "" || Hoja.Cell(i, 4).Value.ToString().Trim().Length > 2 || validaDatos(Hoja.Cell(i, 4).Value.ToString().Trim(), 1) != true)
                {
                    strMensaje = "Ingrese un código de país válido en la celda D" + i.ToString();
                    return strMensaje;
                }

                if (Hoja.Cell(i, 4).Value.ToString() != "1" && Hoja.Cell(i, 4).Value.ToString() != "2")
                {
                    strMensaje = "Codigo de país no válido. Solo se permiten (1 ó 2)";
                    return strMensaje;
                }
                */

                if (Hoja.Cell(i, 4).Value.ToString() == "")
                {
                    strMensaje = "Ingrese un País en la celda D" + i.ToString();
                    return strMensaje;                
                }
                
                if (Hoja.Cell(i, 4).Value.ToString().Trim().Length > 0)
                {
                    BL_CINC_Pais objP = new BL_CINC_Pais();
                    CodPais = Convert.ToInt32(objP.ObtenerPaisByDescription(Hoja.Cell(i, 4).Value.ToString().Trim()));

                    if (CodPais == 0)
                    {
                        strMensaje = "El País no se encuentra en Base de datos, vuelva a descargar plantilla y seleccione el país en la celda D" + i.ToString();
                        return strMensaje;                    
                    }
                }


                if (Hoja.Cell(i, 5).Value.ToString() == "" || validaDatos(Hoja.Cell(i, 5).Value.ToString().Trim(), 2) != true)
                {
                    strMensaje = "Ingrese una fecha inicial válida en la celda E" + i.ToString();
                    return strMensaje;
                }

                
                if (Hoja.Cell(i, 6).Value.ToString() == "")
                {
                    strMensaje = "Ingrese Período de Contrato en la celda F" + i.ToString();
                    return strMensaje;
                }
                                                             
                string vFechaFinContrato = Convert.ToDateTime(Hoja.Cell(i, 5).Value.ToString()).AddMonths(Convert.ToInt32(Hoja.Cell(i, 6).Value.ToString())).ToString();

                /*
                DiferenciaFecha = DateTime.Compare(Convert.ToDateTime(Hoja.Cell(i, 7).Value.ToString()), Convert.ToDateTime(Hoja.Cell(i, 5).Value.ToString()));
                if (DiferenciaFecha < 1)
                {
                    strMensaje = "La Fecha Final no puede ser menor a la Inicial en la celda G" + i.ToString();
                    return strMensaje;
                }
                */

                if (Hoja.Cell(i, 8).Value.ToString().Trim().Length > 50)
                {
                    strMensaje = "La Observación del contrato no puede ser más de 50 caracteres en la celda G" + i.ToString();
                    return strMensaje;
                }

                /*
                if (Hoja.Cell(i, 9).Value.ToString().Trim().Length > 50)
                {
                    strMensaje = "La descripción del contrato no puede ser más de 50 caracteres en la celda H" + i.ToString();
                    return strMensaje;
                }
                */


                if (Hoja.Cell(i, 10).Value.ToString() == "")
                {
                    strMensaje = "Ingrese un Tipo de Licencia en la celda J" + i.ToString();
                    return strMensaje;
                }

                
                if (Hoja.Cell(i, 10).Value.ToString().Trim().Length > 0)
                {
                    BL_CINC_TipoLicencia objTL = new BL_CINC_TipoLicencia();
                    CodTipoLicencia = Convert.ToInt32( objTL.ObtenerLicenciaByDescription(Hoja.Cell(i, 10).Value.ToString().Trim()));

                    if (CodTipoLicencia == 0)
                    {
                        strMensaje = "El Tipo de Licencia no se encuentra en Base de datos, vuelva a descargar plantilla y seleccione Tipo de Licencia en la celda J" + i.ToString();
                        return strMensaje;
                    }
                }



                //if (Hoja.Cell(i, 11).Value.ToString() == "" || Hoja.Cell(i, 11).Value.ToString().Trim().Length != 1 || validaDatos(Hoja.Cell(i, 11).Value.ToString().Trim(), 1) != true)
                if (Hoja.Cell(i, 11).Value.ToString() == "" || validaDatos(Hoja.Cell(i, 11).Value.ToString().Trim(), 1) != true)
                {
                    strMensaje = "Ingrese un número de Líneas Válida celda I" + i.ToString();
                    return strMensaje;
                }

                if (int.Parse(Hoja.Cell(i, 11).Value.ToString().Trim()) < 0)
                {
                    strMensaje = "Ingrese un número de Líneas Válida celda I" + i.ToString();
                    return strMensaje;
                }

                /*
                if (int.Parse(Hoja.Cell(i, 10).Value.ToString().Trim()) < 0 || int.Parse(Hoja.Cell(i, 10).Value.ToString().Trim()) > 1000)
                {
                    strMensaje = "Ingrese un número de Líneas válidas celda J" + i.ToString();
                    return strMensaje;
                }
                */

                if (Hoja.Cell(i, 12).Value.ToString() == "" || Hoja.Cell(i, 12).Value.ToString().Trim().Length > 50)
                {
                    strMensaje = "Ingrese un nombre para el Titular 1 en la celda K" + i.ToString();
                    return strMensaje;
                }

                if (Hoja.Cell(i, 13).Value.ToString() == "" || Hoja.Cell(i, 13).Value.ToString().Trim().Length > 50)
                {
                    strMensaje = "Ingrese los apellidos para el Titular 1 en la celda L" + i.ToString();
                    return strMensaje;
                }

                if (Hoja.Cell(i, 14).Value.ToString() == "" || Hoja.Cell(i, 14).Value.ToString().Trim().Length > 100 || validaCorreo(Hoja.Cell(i, 14).Value.ToString()) != true)
                {
                    strMensaje = "Ingrese un correo válido para el Titular 1 en la celda M" + i.ToString();
                    return strMensaje;
                }


                //sEGUNDO TITULAR
                if (Hoja.Cell(i, 15).Value.ToString().Trim().Length > 0 || Hoja.Cell(i, 16).Value.ToString().Trim().Length > 0 || Hoja.Cell(i, 17).Value.ToString().Trim().Length > 0)
                {
                    if (Hoja.Cell(i, 15).Value.ToString() == "" || Hoja.Cell(i, 15).Value.ToString().Trim().Length > 50)
                    {
                        strMensaje = "Ingrese un nombre para el Titular 2 en la celda N" + i.ToString();
                        return strMensaje;
                    }

                    if (Hoja.Cell(i, 16).Value.ToString() == "" || Hoja.Cell(i, 16).Value.ToString().Trim().Length > 50)
                    {
                        strMensaje = "Ingrese los apellidos para el Titular 2 en la celda O" + i.ToString();
                        return strMensaje;
                    }

                    if (Hoja.Cell(i, 17).Value.ToString() == "" || Hoja.Cell(i, 17).Value.ToString().Trim().Length > 100 || validaCorreo(Hoja.Cell(i, 17).Value.ToString()) != true)
                    {
                        strMensaje = "Ingrese un correo válido para el Titular 2 en la celda P" + i.ToString();
                        return strMensaje;
                    }                
                }
                
                
                            
                // string NombreEmpresa, RazonSocial, Ruc, FechaInicioContrato, FechaFinContrato, Observacion, Descripcion, NombreT1, ApeT1, CorreoT1, NombreT2, ApeT2, CorreoT2;
                //int codPais, Licencia, Lineas;

          
                ENT_CINC_Suscripcion oSolicitud = new ENT_CINC_Suscripcion();
                /*
                int CodPais = Convert.ToInt32(Hoja.Cell(i, 4).Value.ToString());

                switch (CodPais)
                {
                    case 57: codPais = 1;
                        break;
                    default:
                        codPais = 1;
                        break;
                }
                */



                oSolicitud.IdOperador = UsuarioSesion.Operador.IdOperador;
                oSolicitud.IdUsuarioRegistro = UsuarioSesion.IdUsuario;
                oSolicitud.IdEstado = 1; //1 Pendiente
                oSolicitud.IdTipoSolicitud = 1;
                oSolicitud.NombreEmpresa = Hoja.Cell(i, 1).Value.ToString().Trim();
                oSolicitud.RazonSocial = Hoja.Cell(i, 2).Value.ToString().Trim();
                oSolicitud.Ruc = Hoja.Cell(i, 3).Value.ToString().Trim();
                //oSolicitud.IdPais = Convert.ToInt32(CodPais);
                oSolicitud.IdPais = CodPais;
                oSolicitud.FechaInicioContrato = Hoja.Cell(i, 5).Value.ToString().Trim().Substring(0, 10);
                oSolicitud.FechaFinContrato = vFechaFinContrato;
                oSolicitud.ObservacionContrato = Hoja.Cell(i, 8).Value.ToString().Trim();
                oSolicitud.DescripcionContrato = Hoja.Cell(i, 9).Value.ToString().Trim();
                //oSolicitud.IdTipoLicencia = Convert.ToInt32(Hoja.Cell(i, 9).Value.ToString().Trim());
                oSolicitud.IdTipoLicencia = CodTipoLicencia;
                oSolicitud.Lineas = Convert.ToInt32(Hoja.Cell(i, 11).Value.ToString().Trim());


                ENT_CINC_SuscripcionTitulares Titulares1 = new ENT_CINC_SuscripcionTitulares();
                Titulares1.Nombre = Hoja.Cell(i, 12).Value.ToString().Trim();
                Titulares1.Apellido = Hoja.Cell(i, 13).Value.ToString().Trim();
                Titulares1.Correo = Hoja.Cell(i, 14).Value.ToString().Trim();

                ENT_CINC_SuscripcionTitulares Titulares2 = new ENT_CINC_SuscripcionTitulares();
                Titulares2.Nombre = Hoja.Cell(i, 15).Value.ToString().Trim();
                Titulares2.Apellido = Hoja.Cell(i, 16).Value.ToString().Trim();
                Titulares2.Correo = Hoja.Cell(i, 17).Value.ToString().Trim();


                NombreEmpresa = Hoja.Cell(i, 1).Value.ToString();
                RazonSocial = Hoja.Cell(i, 2).Value.ToString();
                Ruc = Hoja.Cell(i, 3).Value.ToString();
                //codPais = Convert.ToInt32(Hoja.Cell(i, 4).Value.ToString());
                FechaInicioContrato = Hoja.Cell(i, 5).Value.ToString();
                FechaFinContrato = vFechaFinContrato;
                Observacion = Hoja.Cell(i, 8).Value.ToString();
                Descripcion = Hoja.Cell(i, 9).Value.ToString();
                //Licencia = Convert.ToInt32(Hoja.Cell(i, 9).Value.ToString());
                Lineas = Convert.ToInt32(Hoja.Cell(i, 11).Value.ToString());
                
                NombreT1 = Hoja.Cell(i, 12).Value.ToString();
                ApeT1 = Hoja.Cell(i, 13).Value.ToString();
                CorreoT1 = Hoja.Cell(i, 14).Value.ToString();
                
                NombreT2 = Hoja.Cell(i, 15).Value.ToString();
                ApeT2 = Hoja.Cell(i, 16).Value.ToString();
                CorreoT2 = Hoja.Cell(i, 17).Value.ToString();


                XmlElement xmlElemento = xmlDoc.CreateElement("Campo");

                xmlElemento.SetAttribute("IdOperador", UsuarioSesion.Operador.IdOperador.ToString());
                xmlElemento.SetAttribute("IdUsuarioRegistro", UsuarioSesion.IdUsuario.ToString());
                xmlElemento.SetAttribute("IdEstado", "1");
                xmlElemento.SetAttribute("IdTipoSolicitud", "1");

                xmlElemento.SetAttribute("NombreEmpresa", Hoja.Cell(i, 1).Value.ToString().Trim());
                xmlElemento.SetAttribute("RazonSocial", Hoja.Cell(i, 2).Value.ToString().Trim());
                xmlElemento.SetAttribute("Ruc", Hoja.Cell(i, 3).Value.ToString().Trim());
                //xmlElemento.SetAttribute("IdPais", Hoja.Cell(i, 4).Value.ToString().Trim());
                xmlElemento.SetAttribute("IdPais", CodPais.ToString().Trim());
                xmlElemento.SetAttribute("FechaInicioContrato", Hoja.Cell(i, 5).Value.ToString().Trim().Substring(0, 10));
                xmlElemento.SetAttribute("FechaFinContrato", vFechaFinContrato);
                xmlElemento.SetAttribute("ObservacionContrato", Hoja.Cell(i, 8).Value.ToString().Trim());
                xmlElemento.SetAttribute("DescripcionContrato", Hoja.Cell(i, 9).Value.ToString().Trim());
                //xmlElemento.SetAttribute("IdTipoLicencia", Hoja.Cell(i, 9).Value.ToString().Trim());
                xmlElemento.SetAttribute("IdTipoLicencia", CodTipoLicencia.ToString().Trim());
                xmlElemento.SetAttribute("Lineas", Hoja.Cell(i, 11).Value.ToString().Trim());
                xmlElemento.SetAttribute("NombreTitular1", Hoja.Cell(i, 12).Value.ToString().Trim());
                xmlElemento.SetAttribute("ApellidoTitular1", Hoja.Cell(i, 13).Value.ToString().Trim());
                xmlElemento.SetAttribute("CorreoTitular1", Hoja.Cell(i, 14).Value.ToString().Trim());
                xmlElemento.SetAttribute("NombreTitular2", Hoja.Cell(i, 15).Value.ToString().Trim());
                xmlElemento.SetAttribute("ApellidoTitular2", Hoja.Cell(i, 16).Value.ToString().Trim());
                xmlElemento.SetAttribute("CorreoTitular2", Hoja.Cell(i, 17).Value.ToString().Trim());
                xmlDoc.DocumentElement.AppendChild(xmlElemento);

                oSolicitud.Titulares.Add(Titulares1);
                oSolicitud.Titulares.Add(Titulares2);
                lsSolicitud.Add(oSolicitud);
                                
                //Validando la existencia de Ruc de una empresa con el Pais de procedencia (BD).
                RES_Json resjson = VerificaExistenciaEmpresaJSON(Hoja.Cell(i, 3).Value.ToString(), CodPais , -1, i);
                if (resjson.Mensaje != "0")
                {
                    strMensaje = "En Fila: " + i.ToString() + ", "  + resjson.Mensaje;
                    return strMensaje;
                }
            }


            //Valida que no haya duplicidad de correo por cada solicitud.
            strMensaje = fnValidarDuplicidadCorreo(lsSolicitud);
            if (strMensaje != "0")
            {
                return strMensaje;
            }

            //Validando data de archivo excel
            strMensaje = ValidacionDataExcel(lsSolicitud);
            if (strMensaje != "0")
            {
                return strMensaje;
            }

           
            string datos = xmlDoc.OuterXml;

            int total = datos.Length;

            RES_Json resultado = new RES_Json();
            BL_CINC_Suscripcion Solicitud = new BL_CINC_Suscripcion();

            resultado = Solicitud.GuardarExcel(lsSolicitud);

            return resultado.Mensaje;
            //lblmensaje.Text = "Las Solicitudes fueron Procesadas correctamente";
        }

        private static List<string> Extensiones()
        {
            List<string> lsExtensiones = new List<string>();

            lsExtensiones.Add(".xls");
            lsExtensiones.Add(".xlsx");
            return lsExtensiones;
        }

        public bool validaDatos(string valor, int tipo)
        {
            bool Esvalido = false;
            Int64 numero;
            string cadena;
            DateTime fecha;

            switch (tipo)
            {
                case 1: //Valida si es entero
                    Esvalido = Int64.TryParse(valor, out numero);
                    break;
                case 2: //Valida si es fecha
                    Esvalido = DateTime.TryParse(valor, out fecha);
                    break;
            }
            return Esvalido;

        }

        public bool validaCorreo(string email)
        {

            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
        
        [HttpPost]
        public JsonResult ExportarExcel(string TipoVersion)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];

            string cadena = String.Empty;
            //string NombreArchivo = "Solicitudes_" + UsuarioSesion.IdUsuario.ToString() + "_" + UsuarioSesion.Usuario;
            string NombreArchivo = "Solicitudes";
            string NombreHoja = "Solicitud";

            DataTable dtSolicitud = (DataTable)Session["MiTablaExportar"];
            dtSolicitud.Columns.Remove("IdSolicitud");
            dtSolicitud.Columns.Remove("IdSolicitudNotaVisto");
            dtSolicitud.Columns.Remove("IdTipoSolicitud");
            dtSolicitud.Columns.Remove("IdSolicitudEstado");
            dtSolicitud.Columns.Remove("IdTecnicoAsignado");
            dtSolicitud.Columns.Remove("IdUsuarioRegistro");
            dtSolicitud.Columns.Remove("IdOperador");
            dtSolicitud.Columns.Remove("IdColaEstado");
            dtSolicitud.Columns.Remove("EstadoCola");
            dtSolicitud.Columns.Remove("IdColaAProvisionamiento");
            dtSolicitud.AcceptChanges();

            string RutaDownloaded = ExportarDatosPersonalizados(dtSolicitud, Convert.ToInt32(TipoVersion), NombreHoja, NombreArchivo);

            RES_Json resultado = new RES_Json();
            resultado.Success = true;
            resultado.Mensaje = "Correcto";
            resultado.Data = RutaDownloaded;

            dtSolicitud.Clear();
            dtSolicitud.Dispose();

            dtSolicitud = (DataTable)Session["MiTablaExportar"];

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public string ExportarDatosPersonalizados(DataTable dtDatos, int TipoVersion, string NombreHoja = "", string NombreArchivo = "")
        {
            if (dtDatos == null)
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
        public JsonResult VerificaExistenciaEmpresa(string pRuc, int pIdPais, int pIdSolicitud)
        {
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            RES_Json resultado = new RES_Json();

            try
            {
                resultado = BLSubscripcion.VerificaExistenciaEmpresa(pRuc, pIdPais, pIdSolicitud);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        
        public RES_Json VerificaExistenciaEmpresaJSON(string pRuc, int pIdPais, int pIdSolicitud, int FilaExcel)
        {
            BL_CINC_Suscripcion BLSubscripcion = new BL_CINC_Suscripcion();
            RES_Json resultado = new RES_Json();

            try
            {
                resultado = BLSubscripcion.VerificaExistenciaEmpresa(pRuc, pIdPais, pIdSolicitud);                
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (BLSubscripcion != null)
                    BLSubscripcion.Dispose();
            }

            return resultado;
        }

        public string ValidacionDataExcel(List<ENT_CINC_Suscripcion> lsSolicitud)
        {
            string Mensaje = string.Empty;
            Mensaje = "0";

            for (int k = 0; k < lsSolicitud.Count; k++)
                for (int j = 0; j < lsSolicitud.Count - 1; j++)
                {
                    if (k == j) break;

                    TmpPaisName = "Perú";
                    if (TmpPais == 2) TmpPaisName = "Colombia";

                    if (lsSolicitud[k].Ruc == lsSolicitud[j].Ruc && lsSolicitud[k].IdPais == lsSolicitud[j].IdPais)
                    {
                        Mensaje = "En las Filas: ("+ (j + 5) +", " + (k + 5)  + "), hay duplicidad en el RUC: " + lsSolicitud[j].Ruc + " y en el País: " + TmpPaisName;
                    }
                }
            
            return Mensaje;
        }

        public string fnValidarDuplicidadCorreo(List<ENT_CINC_Suscripcion> lsSolicitud)
        {
            string Mensaje = string.Empty;
            Mensaje = "0";            
            
            var ArrayTitulares = lsSolicitud;

            bool Sale = false;

            for (int i = 0; i < lsSolicitud.Count; i++)
            {
                for (int k = 0; k < lsSolicitud[i].Titulares.Count; k++)
                {
                    for (int j = 0; j < lsSolicitud[i].Titulares.Count; j++)
                    {
                        if (k == j) break;

                        if (lsSolicitud[i].Titulares[j].Correo == lsSolicitud[i].Titulares[k].Correo)
                        {
                            Mensaje = "Los correos de los titulares no deben repetirse para la Empresa: " + lsSolicitud[i].NombreEmpresa + '.';
                            Sale = true;
                        }
                        
                        if (Sale) break;
                    }

                    if (Sale) break;
                }
                if (Sale) break;
            }

            return Mensaje;
        }


        public string ObtenerCarpetaDominio(string path, string sep)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            string CarpetaDominio = string.Empty;

            CarpetaDominio = UsuarioSesion.IdUsuario.ToString();
            path = path + CarpetaDominio;
            
            //validar existencia de carpeta
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path);
            }
            CarpetaDominio = sep + CarpetaDominio;

            return CarpetaDominio;
        }

        public string DescargarPlantillaPersonalizada(string NombreArchivo)
        {
            ENT_CINC_Usuario UsuarioSesion = (ENT_CINC_Usuario)System.Web.HttpContext.Current.Session["SesionUsuario"];
            BL_CINC_Pais objPais = new BL_CINC_Pais(); 
            DataTable dtPaises = objPais.ObtenerPais();

            BL_CINC_TipoLicencia objTipoLicencia = new BL_CINC_TipoLicencia();
            DataTable dtTipoLicencia = objTipoLicencia.ObtenerTipoLicencia();

            string attachment = String.Empty;
            attachment = NombreArchivo + ".xlsx";

            string CarpetaDominio = ObtenerCarpetaDominio(System.Web.HttpContext.Current.Request.MapPath("~/Common/Plantillas/"), "/");
            string strDirectorioPlantilla = System.Web.HttpContext.Current.Request.MapPath("~/Common/Plantillas");

            string ruta = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + attachment);                                    
            System.IO.File.Copy(strDirectorioPlantilla + "\\Subscripciones.xlsx", strDirectorioPlantilla + CarpetaDominio + "\\Subscripciones_Modificada.xlsx", true);

            XLWorkbook oxlWorkbook = new XLWorkbook(strDirectorioPlantilla + CarpetaDominio + "\\Subscripciones_Modificada.xlsx");

            //var xlWorksheet2 = oxlWorkbook.Worksheet(2);
            IXLWorksheet xlWorksheet1 = oxlWorkbook.Worksheet(1);
            IXLWorksheet xlWorksheet2 = oxlWorkbook.Worksheet(2);

            //Campo: Nombre
            IXLDataValidation dtValidNombre = xlWorksheet1.Range("A5:A10000").SetDataValidation();
            dtValidNombre.AllowedValues = XLAllowedValues.TextLength;
            dtValidNombre.MinValue = "1";
            dtValidNombre.MaxValue = "200";
            dtValidNombre.ShowInputMessage = false;
            dtValidNombre.ShowErrorMessage = true;
            dtValidNombre.ErrorTitle = "Suscripciones";
            dtValidNombre.ErrorMessage = "Ingrese nombre (máximo 200 carácteres)";
            ////////////////////////////////////////////////////////////////////////

            //Campo: Razón Social
            IXLDataValidation dtRazonSocial = xlWorksheet1.Range("B5:B10000").SetDataValidation();
            dtRazonSocial.AllowedValues = XLAllowedValues.TextLength;
            dtRazonSocial.MinValue = "1";
            dtRazonSocial.MaxValue = "200";
            dtRazonSocial.ShowInputMessage = false;
            dtRazonSocial.ShowErrorMessage = true;
            dtRazonSocial.ErrorTitle = "Suscripciones";
            dtRazonSocial.ErrorMessage = "Ingrese Razón Social (máximo 400 carácteres)";
            ////////////////////////////////////////////////////////////////////////

            //Campo: RUC
            //xlWorksheet1.Range("C5:C10000").Style.NumberFormat.SetFormat("00000000000");
            //IXLDataValidation dtRUC = xlWorksheet1.Range("C5:C10000").SetDataValidation();
            //dtRUC.WholeNumber.Between("10000000000", "99999999999");
            //dtRUC.AllowedValues = XLAllowedValues.TextLength;            
            //dtRUC.MaxValue = "11";
            //dtRUC.ShowInputMessage = false;
            //dtRUC.ShowErrorMessage = true;
            //dtRUC.ErrorTitle = "Suscripciones";
            //dtRUC.ErrorMessage = "El Número de Ruc debe ser en formato númerico y  tiene que ser de 11 carácteres";
            ////////////////////////////////////////////////////////////////////////

            //Campo: País
            xlWorksheet2.Range("D3:E1000").Clear();
            int valCel = 3;
            
            string ComentarioPais = "Código de País:";
            ComentarioPais = ComentarioPais + System.Environment.NewLine;
            foreach (DataRow dr in dtPaises.Rows)
            {
                xlWorksheet2.Range("D" + valCel.ToString()).Value = dr["Codigo"].ToString();
                xlWorksheet2.Range("E" + valCel.ToString()).Value = dr["Nombre"].ToString().Replace("&#39", "'");
                valCel += 1;

                ComentarioPais = ComentarioPais + dr["Codigo"].ToString() + " = " + dr["Nombre"].ToString().Replace("&#39", "'");
                ComentarioPais = ComentarioPais + System.Environment.NewLine;
            }
            xlWorksheet1.Range("D5:D100000").SetDataValidation().Clear();
            IXLDataValidation dtValidPais = xlWorksheet1.Range("D5:D100000").SetDataValidation();

            if (dtPaises.Rows.Count > 0)
            {
                dtValidPais.List(xlWorksheet2.Range("$E$3:$E$" + (valCel - 1).ToString()));
            }
            else
            {
                dtValidPais.List(xlWorksheet2.Range("$E$3:$E$" + (valCel).ToString()));
            }
            
            dtValidPais.ShowInputMessage = false;
            dtValidPais.ShowErrorMessage = true;
            dtValidPais.ErrorStyle = XLErrorStyle.Stop;
            dtValidPais.ErrorTitle = "Suscripciones";
            dtValidPais.ErrorMessage = "Seleccione un pais de la lista.";
            dtValidPais.AllowedValues = XLAllowedValues.List;
            xlWorksheet1.Cell("D4").Comment.Delete();
            xlWorksheet1.Cell("D4").Comment.AddText(ComentarioPais);
            ////////////////////////////////////////////////////////////////////////

            //Campo: Tipo de Licencia
            xlWorksheet2.Range("G3:H1000").Clear();            
            valCel = 3;
            string ComentarioTipoLicencia = "Tipos de licencia:";
            ComentarioTipoLicencia = ComentarioTipoLicencia + System.Environment.NewLine;
            foreach (DataRow dr in dtTipoLicencia.Rows)
            {
                xlWorksheet2.Range("G" + valCel.ToString()).Value = dr["Codigo"].ToString();
                xlWorksheet2.Range("H" + valCel.ToString()).Value = dr["Nombre"].ToString().Replace("&#39", "'");
                valCel += 1;

                ComentarioTipoLicencia = ComentarioTipoLicencia + dr["Codigo"].ToString() + " = " + dr["Nombre"].ToString().Replace("&#39", "'");
                ComentarioTipoLicencia = ComentarioTipoLicencia + System.Environment.NewLine;
            }
            xlWorksheet1.Range("J5:J100000").SetDataValidation().Clear();
            IXLDataValidation dtValidTipoLicencia = xlWorksheet1.Range("J5:J100000").SetDataValidation();

            if (dtTipoLicencia.Rows.Count > 0)
            {
                dtValidTipoLicencia.List(xlWorksheet2.Range("$H$3:$H$" + (valCel - 1).ToString()));
            }
            else
            {
                dtValidTipoLicencia.List(xlWorksheet2.Range("$H$3:$H$" + (valCel).ToString()));
            }
           
            dtValidTipoLicencia.ShowInputMessage = false;
            dtValidTipoLicencia.ShowErrorMessage = true;
            dtValidTipoLicencia.ErrorStyle = XLErrorStyle.Stop;
            dtValidTipoLicencia.ErrorTitle = "Suscripciones";
            dtValidTipoLicencia.ErrorMessage = "Seleccione un país de la lista.";
            dtValidTipoLicencia.AllowedValues = XLAllowedValues.List;
            xlWorksheet1.Cell("J4").Comment.Delete();
            xlWorksheet1.Cell("J4").Comment.AddText(ComentarioTipoLicencia);
            ////////////////////////////////////////////////////////////////////////

            //Campo: Meses de contrato            
            string ComentarioMesContrato = "Período de contrato";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B3:B10").Clear();
            
            xlWorksheet2.Range("B3").Value = "6";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "6 = 06 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B4").Value = "12";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "12 = 12 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B5").Value = "18";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "18 = 18 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B6").Value = "24";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "24 = 24 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B7").Value = "30";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "30 = 30 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B8").Value = "36";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "36 = 36 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B9").Value = "42";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "42 = 42 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet2.Range("B10").Value = "48";
            ComentarioTipoLicencia = ComentarioTipoLicencia + "48 = 48 meses";
            ComentarioMesContrato = ComentarioMesContrato + System.Environment.NewLine;

            xlWorksheet1.Range("F4:F100000").SetDataValidation().Clear();
            IXLDataValidation dtvalidMesesContrato = xlWorksheet1.Range("F4:F100000").SetDataValidation();
            dtvalidMesesContrato.List(xlWorksheet2.Range("$B$3:$B$10"));
            dtvalidMesesContrato.ShowInputMessage = false;
            dtvalidMesesContrato.ShowErrorMessage = true;
            dtvalidMesesContrato.ErrorStyle = XLErrorStyle.Stop;
            dtvalidMesesContrato.ErrorTitle = "Suscripciones";
            dtvalidMesesContrato.ErrorMessage = "Seleccione un valor de la lista.";
            dtvalidMesesContrato.AllowedValues = XLAllowedValues.List;
            xlWorksheet1.Cell("F4").Comment.Delete();
            xlWorksheet1.Cell("F4").Comment.AddText(ComentarioMesContrato);
            //xlWorksheet1.Range("G5").FormulaR1C1 = "=FECHA(AÑO(E5),MES(E5)+F5,DIA(E5))";           

            //salvar y cerrar
            oxlWorkbook.Save();
            oxlWorkbook.Dispose();

            /////Comprimiendo Archivo
            string adicionalnombre = NombreArchivoEstandarizado(UsuarioSesion.IdUsuario.ToString(), UsuarioSesion.IdUsuario.ToString());
            string vcRutaTMP = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + adicionalnombre + "/");

            if (!System.IO.File.Exists(vcRutaTMP))
            {
                Directory.CreateDirectory(vcRutaTMP);
            }

            System.IO.File.Copy(strDirectorioPlantilla + CarpetaDominio + "\\Subscripciones_Modificada.xlsx", vcRutaTMP + "/" + attachment,true);

            using (ZipFile zip = new ZipFile())
            {
                zip.AddDirectory(vcRutaTMP);
                zip.Save(vcRutaTMP + "/" + NombreArchivo + ".zip");
            }

            attachment = adicionalnombre + "/" + NombreArchivo + ".zip";
           
            return attachment;
        }

        [HttpPost]
        public JsonResult DescargarPlantilla(string NombreArchivo)
        {
            string RutaDownloaded = DescargarPlantillaPersonalizada(NombreArchivo);

            RES_Json resultado = new RES_Json();
            resultado.Success = true;
            resultado.Mensaje = "Correcto";
            resultado.Data = RutaDownloaded;

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }     

        public string NombreArchivoEstandarizado(string pDominio, string pUsuario)
        {
            pUsuario = Right("000000" + pUsuario, 6);
            string Dia = Right("00" + DateTime.Now.Day.ToString(), 2);
            string Mes = Right("00" + DateTime.Now.Month.ToString(), 2);
            string Anio = Right("0000" + DateTime.Now.Year.ToString(), 4);
            string Hora = Right("00" + DateTime.Now.Hour.ToString(), 2);
            string Minuto = Right("00" + DateTime.Now.Minute.ToString(), 2);
            string Segundo = Right("00" + DateTime.Now.Second.ToString(), 2);
            string Fecha = Anio + Mes + Dia + Hora + Minuto + Segundo;

            //return pDominio + "_" + pUsuario + "_" + Fecha;
            return pUsuario + "_" + Fecha;
        }

        public string Left(string str, int length)
        {
            str = (str ?? string.Empty);
            return str.Substring(0, Math.Min(length, str.Length));
        }

        public string Right(string str, int length)
        {
            str = (str ?? string.Empty);
            return (str.Length >= length)
                ? str.Substring(str.Length - length, length)
                : str;
        }

        public string QuitarAcentos(string inputString)
        {
            Regex a = new Regex("[á|à|ä|â]", RegexOptions.Compiled);
            Regex e = new Regex("[é|è|ë|ê]", RegexOptions.Compiled);
            Regex i = new Regex("[í|ì|ï|î]", RegexOptions.Compiled);
            Regex o = new Regex("[ó|ò|ö|ô]", RegexOptions.Compiled);
            Regex u = new Regex("[ú|ù|ü|û]", RegexOptions.Compiled);
            Regex n = new Regex("[ñ|Ñ]", RegexOptions.Compiled);
            inputString = a.Replace(inputString, "a");
            inputString = e.Replace(inputString, "e");
            inputString = i.Replace(inputString, "i");
            inputString = o.Replace(inputString, "o");
            inputString = u.Replace(inputString, "u");
            inputString = n.Replace(inputString, "n");
            return inputString;
        }
    }
}
