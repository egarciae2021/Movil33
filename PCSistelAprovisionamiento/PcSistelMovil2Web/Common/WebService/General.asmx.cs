using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using Utilitarios;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using Web.GeneralMantenimiento;
using System.IO;

using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using System.Text;
using CompCorreo;

namespace PcSistelMovil2Web.Common.WebService
{
    /// <summary>
    /// Descripción breve de General
    /// </summary>
    /// 
    [ScriptService()]
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    // [System.Web.Script.Services.ScriptService]
    public class General : System.Web.Services.WebService
    {            

        [WebMethod(EnableSession = true)]
        public string ComprobarSession()
        {
            string resultado = "1";

            if ((HttpContext.Current.Session["datos"] == null))
            {
            resultado= "0";
            }
            return resultado;
        }

        [WebMethod(EnableSession = true)]
        public string ObtenerRaizSistema()
        {
            string _return = UtilitarioWeb.ObtieneRaizSistema();
            //if (Strings.Right(_return.Trim(), 1) != "/")
            if (_return.Substring(_return.Length - 1, 1) != "/")
                _return += "/";
            return _return;
        }

        [WebMethod(EnableSession = true)]
        public string enviarcorreopassword(string Correo, string Url)
        {
            //BL_AP_Usuario Usuario = null;
            string strResultado = string.Empty;
            string strErrorCorreo = string.Empty;
            try
            {
                BL_AP_Usuario Usuario = new BL_AP_Usuario();

                string CodigoSolicitud;
                DataTable dtResult = new DataTable();
            NuevoCodigo:
                CodigoSolicitud = Guid.NewGuid().ToString().ToUpper();
                dtResult = Usuario.InsertarSolicitudRestablecimiento(CodigoSolicitud, Correo, Url);

                if (dtResult.Rows.Count == 0)
                {
                    strResultado = "Error";
                }
                else
                {
                    int inResultado;
                    string strDescripcion;
                    inResultado = Convert.ToInt32(dtResult.Rows[0]["Resultado"]);
                    strDescripcion = dtResult.Rows[0]["Descripcion"].ToString();

                    if (inResultado == -2)
                    { //generar nuevo codigo
                        goto NuevoCodigo;
                    }
                    else if (inResultado == 1)
                    {
                        //enviar correo
                        CCorreo cCorreo = new CompCorreo.CCorreo();

                        string CuerpoMensaje = string.Empty;
                        string Destinatario = Correo;
                        string Asunto = "Restablecimiento de contraseña";

                        string UbicPlantilla = HttpContext.Current.Server.MapPath("~/") + "Common\\Plantillas\\SolicitudCambioContrasena.htm";
                        string NombreUsuario = dtResult.Rows[0]["NombreUsuario"] == DBNull.Value ? "" : dtResult.Rows[0]["NombreUsuario"].ToString();
                        string EnlaceParaCorreo = Url + "?c=" + CodigoSolicitud;
                        CuerpoMensaje = String.Format(TraeCuerpoPlantilla(UbicPlantilla), NombreUsuario, EnlaceParaCorreo, EnlaceParaCorreo);

                        if (Destinatario != string.Empty && NombreUsuario != string.Empty)
                        {
                            try
                            {
                                cCorreo.Enviar(false, Destinatario, Asunto, CuerpoMensaje, null, false);
                            }
                            catch (Exception ex)
                            {
                                strResultado = "Error: " + ex.ToString();
                            }
                        }
                        else
                        {
                            strResultado = "Error";
                        }
                        strResultado = inResultado.ToString() + "|";
                    }
                    else
                    {
                        strResultado = inResultado.ToString() + "|" + strDescripcion;
                    }
                }

                return strResultado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string TraeCuerpoPlantilla(string RutaPlantilla)
        {
            StringBuilder Cuerpo = new StringBuilder();
            StreamReader objReader = new StreamReader(RutaPlantilla);
            string sLine = string.Empty;

            while (sLine != null)
            {
                sLine = objReader.ReadLine();
                if (sLine != null)
                {
                    Cuerpo.Append(sLine);
                }
            }
            objReader.Close();
            return Cuerpo.ToString();
        }

    }



}
