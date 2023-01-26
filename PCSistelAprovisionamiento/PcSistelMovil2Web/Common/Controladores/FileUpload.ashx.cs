using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using ClosedXML.Excel;
using Utilitarios;


namespace PcSistelMovil2Web.Common.Controladores
{
    /// <summary>
    /// Descripción breve de File
    /// </summary>
    public class File : IHttpHandler
    {
        BL_AP_Utilitario Utilitario = new BL_AP_Utilitario();     

        public void ProcessRequest(HttpContext context)
        {
            string str_Observaciones = string.Empty;
            string str_ObservacionDetalle = string.Empty;

            string vc_filename = String.Empty;
            bool bQuitar = false;
            int IdSuscripcion = 0;
            int TipoSuscripcion = 0;

            //ClaseUtilitarios utilTest = new ClaseUtilitarios();
            //utilTest.GrabarLog(new Exception(), HttpContext.Current.Server.MapPath("~/").ToString(),"PcSistelAprovisionamientoWeb_Test01");

            if (context.Request.QueryString["j_filename"] != null)
            {
                vc_filename = context.Request.QueryString["j_filename"].ToString();
            }

            //utilTest.GrabarLog(new Exception(), HttpContext.Current.Server.MapPath("~/").ToString(), "PcSistelAprovisionamientoWeb_Test02");
            if (context.Request.QueryString["j_eliminar"] != null)
            {
                bQuitar = Convert.ToBoolean(context.Request.QueryString["j_eliminar"].ToString());
            }

            //utilTest.GrabarLog(new Exception(), HttpContext.Current.Server.MapPath("~/").ToString(), "PcSistelAprovisionamientoWeb_Test03");
            if (context.Request.QueryString["j_IdSuscripcion"] != null)
            {
                IdSuscripcion = Convert.ToInt32(context.Request.QueryString["j_IdSuscripcion"].ToString());
            }

            //utilTest.GrabarLog(new Exception(), HttpContext.Current.Server.MapPath("~/").ToString(), "PcSistelAprovisionamientoWeb_Test04");
            if (context.Request.QueryString["j_TipoImportacion"] != null)
            {
                TipoSuscripcion = Convert.ToInt32(context.Request.QueryString["j_TipoImportacion"].ToString());
            }

            //utilTest.GrabarLog(new Exception(), HttpContext.Current.Server.MapPath("~/").ToString(), "PcSistelAprovisionamientoWeb_Test05");
            if (context.Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollection files = context.Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];

                        string fname = (vc_filename == String.Empty ? file.FileName : vc_filename);
                        fname = context.Server.MapPath("~/Temporal/" + fname);

                        file.SaveAs(fname);
                    }
                    context.Response.ContentType = "text/plain";


                    string t_observacion = "false";

                    //Proceso de validacion de cuentas.
                    string t_ArchivoVacio = "false";
                    List<string> lstCuentas;
                    lstCuentas = new List<string>();

                    string conexion2;
                    conexion2 = Web.GeneralMantenimiento.UtilitarioWeb.ObtenerCadenaConexionMovil(IdSuscripcion);

                    if (TipoSuscripcion == 1)
                    {
                        if (!ValidarIntegridadArchivoQ15(context.Server.MapPath("~/Temporal/" + vc_filename)))
                        {
                            t_observacion = "true";
                            str_Observaciones = "Observaciones";
                            str_ObservacionDetalle = "El contenido del archivo Q15 no es correcto. Verifique y suba otro archivo.";

                            string path = context.Server.MapPath("~/Temporal/" + vc_filename);
                            System.IO.File.Delete(path);
                        }
                        else
                        {

                            //Metodo para validar existencia de cuentas de movil.
                            lstCuentas = new List<string>();
                            lstCuentas = LeerArchivoQ15(conexion2, vc_filename, "25");

                            if (lstCuentas.Count > 0)
                            {
                                t_observacion = "true";
                                str_Observaciones = "(Registrar cuentas...)";
                            }
                        }
                    }
                    else if (TipoSuscripcion == 2)
                    {
                        if (!ValidarIntegridadArchivoOrganizacion(context.Server.MapPath("~/Temporal/" + vc_filename)))
                        {
                            t_observacion = "true";
                            str_Observaciones = "Observaciones";
                            str_ObservacionDetalle = "El contenido del archivo de Organización no es correcto. Verifique y suba otro archivo.";

                            string path = context.Server.MapPath("~/Temporal/" + vc_filename);
                            System.IO.File.Delete(path);
                        }
                    }

                    context.Response.Write(files[0].FileName + "|" + t_observacion + "|" + str_Observaciones + "|" + str_ObservacionDetalle);
                }
                catch (Exception ex)
                {
                    ClaseUtilitarios util = new ClaseUtilitarios();
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                    context.Response.Write("ERROR");
                }

                //Fin proceso de validación de cuentas.

            }
            else if (bQuitar)
            {

                string path = context.Server.MapPath("~/Temporal/" + vc_filename);
                if (System.IO.File.Exists(path))
                {
                    try
                    {
                        System.IO.File.Delete(path);
                        context.Response.Write("true");
                    }
                    catch (Exception ex)
                    {
                        ClaseUtilitarios util = new ClaseUtilitarios();
                        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");

                        context.Response.Write("false");
                        return;
                    }
                }
            }
        }

        public List<string> LeerArchivoQ15(string conexionBDDominio, string archConExt, string idPlantilla)
        {
            BL_AP_Servicio bl_ProcesoServicio = null;
            BL_AP_Plantilla blPlantilla = null;
            BL_AP_Campo blCampo = null;
            List<string> resultado = new List<string>();

            try
            {
                //string CarpetaDominio = ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\\General\\Administrar\\Importacion\\Temporal\\", "\\");
                //string ruta = HttpContext.Current.Server.MapPath("~") + "\\General\\Administrar\\Importacion\\Temporal" + CarpetaDominio + "\\";
                string ruta = HttpContext.Current.Server.MapPath("~/Temporal/");

                //Return lstCuentas

                string file = ruta + archConExt;
                string connStr = "";
                if (archConExt.Substring(archConExt.LastIndexOf(".")) == ".xls")
                {
                    connStr = string.Format(ConfigurationManager.AppSettings["Excel2003OleDBConnection"], file);
                }
                else if (archConExt.Substring(archConExt.LastIndexOf(".")) == ".xlsx")
                {
                    connStr = string.Format(ConfigurationManager.AppSettings["Excel2007OleDBConnection"], file);
                }

                DataTable table = new DataTable();

                blPlantilla = new BL_AP_Plantilla(conexionBDDominio);
                List<ENT_AP_Plantilla> lstPlantilla = blPlantilla.Buscar_Plantilla(Convert.ToInt32(idPlantilla));
                blCampo = new BL_AP_Campo(conexionBDDominio);
                List<ENT_AP_Campo> lstCampo = blCampo.Buscar_Campo(lstPlantilla.ElementAt(0).IdPlantilla);

                using (OleDbConnection conn = new OleDbConnection(connStr))
                {

                    string sheet = "SELECT * FROM [" + lstPlantilla.ElementAt(0).NombreHoja + "$]";
                    // to avoid error write the sheet name in square bracket
                    using (OleDbCommand cmd = new OleDbCommand(sheet, conn))
                    {
                        conn.Open();
                        using (OleDbDataAdapter ad = new OleDbDataAdapter(cmd))
                        {
                            ad.Fill(table);
                        }
                        conn.Close();
                    }
                }


                int pos = 0;
                foreach (ENT_AP_Campo entImpDatCampo in lstCampo)
                {
                    if (entImpDatCampo.NombreCampo.Contains("idCuenta"))
                    {
                        pos = entImpDatCampo.PosicionColumna;
                        break; // TODO: might not be correct. Was : Exit For
                    }
                }
                List<string> lstCuenta = new List<string>();

                for (int i = 0; i <= table.Rows.Count - 1; i++)
                {
                    string cta = "";
                    cta = table.Rows[i][pos - 1].ToString();
                    lstCuenta.Add(cta);
                }


                bl_ProcesoServicio = new BL_AP_Servicio(conexionBDDominio);
                bl_ProcesoServicio.EliminarListaCuentaTemp();

                List<string> lstTemp = lstCuenta.Distinct().ToList();
                foreach (string cta in lstTemp)
                {
                    bl_ProcesoServicio = new BL_AP_Servicio(conexionBDDominio);
                    bool consulta = bl_ProcesoServicio.Buscar_Plantilla(cta);
                    if (!consulta)
                    {
                        bl_ProcesoServicio.InsertarCuentaTemp(cta);
                        resultado.Add(cta);
                    }
                }

                //if (table.Rows.Count == 0) resultado.Add("vacio");

                return resultado;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                return null;
            }
            finally
            {
                if (bl_ProcesoServicio != null) bl_ProcesoServicio.Dispose();
                if (blPlantilla != null) blPlantilla.Dispose();
                if (blCampo != null) blCampo.Dispose();
                if (resultado != null) resultado = null;
            }
        }

        public string ObtenerCarpetaDominio(string path, string sep)
        {
            string CarpetaDominio = string.Empty;

            if ((HttpContext.Current.Session["IdDominio"] != null) && (HttpContext.Current.Session["IdDominio"] != ""))
            {
                CarpetaDominio = HttpContext.Current.Session["IdDominio"].ToString();
                path = path + CarpetaDominio;
                //validar existencia de carpeta
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path);
                }
                CarpetaDominio = sep + CarpetaDominio;
            }
            return CarpetaDominio;
        }

        private static bool ValidarIntegridadArchivoOrganizacion(string ArchivoSubido)
        {
            bool _return = true;

            try
            {
                XLWorkbook oxlWorkbook = new XLWorkbook(ArchivoSubido);
                IXLWorksheet xlWorksheet1 = oxlWorkbook.Worksheets.First();

                string PlantillaColumnaOrganizacion = System.Web.Configuration.WebConfigurationManager.AppSettings["PlantillaColumnaOrganizacion"].ToString();
                string[] ListaColumnas;
                ListaColumnas = PlantillaColumnaOrganizacion.Split('|');

                for (int k = 0; k < ListaColumnas.Length; k++)
                {
                    string[] ColumnaDetalle = ListaColumnas[k].Split(';');

                    int val_x = Convert.ToInt32(ColumnaDetalle[0].ToString());
                    int val_y = Convert.ToInt32(ColumnaDetalle[1].ToString());
                    string val_celda = ColumnaDetalle[2].ToString();

                    if (xlWorksheet1.Cell(val_x, val_y).Value.ToString() != null && xlWorksheet1.Cell(val_x, val_y).Value.ToString() != val_celda)
                    {
                        _return = false;
                        break;
                    }
                }

                oxlWorkbook.Dispose();
            }
            catch (Exception ex)
            {
            }

            return _return;
        }

        private static bool ValidarIntegridadArchivoQ15(string ArchivoSubido)
        {
            bool _return = true;

            try
            {
                XLWorkbook oxlWorkbook = new XLWorkbook(ArchivoSubido);
                IXLWorksheet xlWorksheet1 = oxlWorkbook.Worksheets.First();

                string PlantillaColumnaQ15 = System.Web.Configuration.WebConfigurationManager.AppSettings["PlantillaColumnaQ15"].ToString();
                string[] ListaColumnas;
                ListaColumnas = PlantillaColumnaQ15.Split('|');

                for (int k = 0; k < ListaColumnas.Length; k++)
                {
                    string[] ColumnaDetalle = ListaColumnas[k].Split(';');

                    int val_x = Convert.ToInt32(ColumnaDetalle[0].ToString());
                    int val_y = Convert.ToInt32(ColumnaDetalle[1].ToString());
                    string val_celda = ColumnaDetalle[2].ToString();

                    if (xlWorksheet1.Cell(val_x, val_y).Value.ToString() != null && xlWorksheet1.Cell(val_x, val_y).Value.ToString() != val_celda)
                    {
                        _return = false;
                        break;
                    }
                }

                oxlWorkbook.Dispose();
            }
            catch (Exception ex)
            {
            }

            return _return;
        }

        private static void LiberarObjeto(ref object obj)
        {
            try
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(obj);
                obj = null;
            }
            catch (Exception ex)
            {
                obj = null;
            }
            finally
            {
                GC.Collect();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}