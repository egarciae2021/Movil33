using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Xml;

namespace Utilitarios
{

    public class ArchivoConfiguracion
    {
        // campos

        public static int ReplyTime = -1;
        public static string DevolverRutaComun()
        {
            //Return System.Environment.GetEnvironmentVariable("CommonProgramFiles")
            //Return System.Environment.GetEnvironmentVariable("WinDir")
            //Return System.Environment.GetEnvironmentVariable("ProgramFiles")
            // se uso la ruta "C:\Documents and Settings\All Users\Application Data\configuracion"
            // ya que las otras estaban protegidas por el SO

            //Return System.Environment.GetFolderPath(System.Environment.SpecialFolder.CommonApplicationData)
            return System.AppDomain.CurrentDomain.BaseDirectory + "\\";

        }

        public static bool VerificaConexionBD(string strCadenaConexion)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(strCadenaConexion))
                {
                    conn.Open();
                    conn.Close();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        // método que cambia un valor de configuración del archivo
        // principal de configuración del sistema
        // devuelve True si logra cambiarla, de lo contrario False
        public static bool CambiarValorConfiguracion(string pstrArchivo, string strEntrada, string strValor)
        {
            try
            {
                if (!System.IO.File.Exists(pstrArchivo))
                {
                    return false;
                }
                XmlDocument doc = new XmlDocument();
                doc.Load(pstrArchivo);
                XmlNodeList listaNodos = doc.GetElementsByTagName("add");
                foreach (XmlNode nodo in listaNodos)
                {
                    if (nodo.Attributes["name"] != null)
                    {
                        if (nodo.Attributes["name"].Value.ToString() == strEntrada)
                        {
                            nodo.Attributes["connectionString"].Value = strValor;
                            break; // TODO: might not be correct. Was : Exit For
                        }
                    }
                }
                doc.Save(pstrArchivo);
                return true;
            }
            catch
            {
                return false;
            }
        }

        // método que obtiene un valor de configuración del archivo
        // principal de configuración del sistema
        public static string ObtenerValorConfiguracion(string pstrArchivo, string pstrClave)
        {

            try
            {
                if (!System.IO.File.Exists(pstrArchivo))
                {
                    return "";
                }
                string _return = "";
                XmlDocument doc = new XmlDocument();
                doc.Load(pstrArchivo);
                XmlNodeList listaNodos = doc.GetElementsByTagName("add");
                foreach (XmlNode nodo in listaNodos)
                {
                    try
                    {
                        if (nodo.Attributes["name"] != null)
                        {
                            if (nodo.Attributes["name"].Value.ToString() == pstrClave)
                            {
                                _return = nodo.Attributes["connectionString"].Value.ToString();
                                break; // TODO: might not be correct. Was : Exit For
                            }
                        }
                    }
                    catch
                    {
                    }
                }
                return _return;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int ObtenerValorAutenticacion(string RutaArchivoConfig)
        {
            try
            {
                if (!System.IO.File.Exists(RutaArchivoConfig))
                {
                    return -1;
                }
                int _return = -1;
                XmlDocument doc = new XmlDocument();
                doc.Load(RutaArchivoConfig);
                XmlNodeList listaNodos = doc.GetElementsByTagName("authentication");
                foreach (XmlNode nodo in listaNodos)
                {
                    try
                    {
                        if (nodo.Attributes["mode"] != null)
                        {
                            if (nodo.Attributes["mode"].Value.ToString() == "Forms")
                            {
                                _return = 0;
                            }
                            else if (nodo.Attributes["mode"].Value.ToString() == "Windows")
                            {
                                _return = 1;
                            }
                            else if (nodo.Attributes["mode"].Value.ToString() == "Active Directory")
                            {
                                _return = 2;
                            }
                            break; // TODO: might not be correct. Was : Exit For
                        }
                    }
                    catch
                    {
                        return -1;
                    }
                }
                return _return;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public static bool CambiarValorAutenticacion(string RutaArchivoConfig, int TipoAutentiacion)
        {
            try
            {
                if (!System.IO.File.Exists(RutaArchivoConfig))
                {
                    return false;
                }
                XmlDocument doc = new XmlDocument();
                doc.Load(RutaArchivoConfig);
                XmlNodeList listaNodos = doc.GetElementsByTagName("authentication");
                foreach (XmlNode nodo in listaNodos)
                {
                    if (nodo.Attributes["mode"] != null)
                    {
                        //Forms
                        if (TipoAutentiacion == 0)
                        {
                            nodo.Attributes["mode"].Value = "Forms";

                            //Dim docforms As New XmlDocument()
                            //docforms.LoadXml("<authentication mode=""Forms""><forms loginUrl=""Login.aspx"" /></authentication>")

                            //nodo.AppendChild(docforms.FirstChild())
                            //Windows
                        }
                        else if (TipoAutentiacion == 1)
                        {
                            nodo.Attributes["mode"].Value = "Windows";
                            //nodo.RemoveChild(nodo.FirstChild())
                        }
                    }
                }
                doc.Save(RutaArchivoConfig);
                return true;
            }
            catch
            {
                return false;
            }
        }

        //@Autor: jherrera
        //@Creacion de metodo para cambiar valor de config en base a "key"
        //***************************************************************
        /// <summary>
        /// Método que modifica el valor de una entrada en el archivo de configuración usando "key" como parametro de busqueda.
        /// </summary>
        /// <param name="pstrArchivo"></param>
        /// <param name="strEntrada"></param>
        /// <param name="intAutenticacion"></param>
        /// <returns></returns>
        public static bool CambiarValorAutenticacionKey(string pstrArchivo, string strEntrada, int intAutenticacion)
        {
            try
            {
                if (!System.IO.File.Exists(pstrArchivo))
                {
                    return false;
                }
                XmlDocument doc = new XmlDocument();
                doc.Load(pstrArchivo);
                XmlNodeList listaNodos = doc.GetElementsByTagName("add");
                foreach (XmlNode nodo in listaNodos)
                {
                    if (nodo.Attributes["key"] != null)
                    {
                        if (nodo.Attributes["key"].Value.ToString() == strEntrada)
                        {
                            if (intAutenticacion == 0)
                            {
                                nodo.Attributes["value"].Value = "Forms";
                                break;
                            }
                            else if (intAutenticacion == 1)
                            {
                                nodo.Attributes["value"].Value = "Windows";
                                break;
                            }
                            else
                            {
                                nodo.Attributes["value"].Value = "Active Directory";
                                break;
                            }
                        }
                    }
                }
                doc.Save(pstrArchivo);
                return true;
            }
            catch
            {
                return false;
            }
        }
        //***************************************************************
    }

}
