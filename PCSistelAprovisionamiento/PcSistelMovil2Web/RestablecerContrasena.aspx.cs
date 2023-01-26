using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using System.Configuration;
using System.Data;
using System.Web.Services;
using CompCorreo;
using System.Text;
using System.IO;

namespace PcSistelMovil2Web
{
    public partial class RestablecerContrasena : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BL_AP_Usuario Usuario = null;
                try
                {
                    string CodReestablemiento = Request.QueryString["c"];
                    int HorasMinRes = Convert.ToInt32(ConfigurationManager.AppSettings["HorasReestablecimientoPass"]);

                    if (string.IsNullOrEmpty(CodReestablemiento))
                    {
                        dvErrorSolicitud.Style["display"] = "";
                        dvReestablecimiento.Style["display"] = "none";
                    }
                    else
                    {
                        Usuario = new BL_AP_Usuario();
                        hdfCodReestablecimiento.Value = CodReestablemiento;

                        DataTable dtSolicitudRes = Usuario.SolicitudRestablecimiento(CodReestablemiento);

                        if (dtSolicitudRes.Rows.Count != 1)
                        {
                            dvErrorSolicitud.Style["display"] = "";
                            dvReestablecimiento.Style["display"] = "none";
                        }
                        else
                        {
                            int HorasSolicitudActiva = Convert.ToInt32(dtSolicitudRes.Rows[0]["HorasActivo"]);

                            if (dtSolicitudRes.Rows[0]["Estado"].ToString() == "Inactivo")
                            {
                                dvErrorSolicitud.Style["display"] = "";
                                dvReestablecimiento.Style["display"] = "none";
                            }
                            else if ((HorasSolicitudActiva != -1 && HorasSolicitudActiva > HorasMinRes) || dtSolicitudRes.Rows[0]["Estado"].ToString() == "Expirado")
                            {
                                dvCaducado.Style["display"] = "";
                                dvReestablecimiento.Style["display"] = "none";
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally 
                {
                    if (Usuario != null) Usuario.Dispose();
                }
            }
        }

        [WebMethod()]
        public static string RestablecerContrasenaUsuario(string CodigoSolicitud, string NuevaContrasena, string ConfirmacionContrasena,
                                                            string PaginaLogin)  
        {
            BL_AP_Usuario Usuario = null;
            try
            {
                string strResultado;
                string strErrorCorreo;
                if (NuevaContrasena != ConfirmacionContrasena)
                {
                    strResultado = "-2";
                    return strResultado;
                }

                Usuario = new BL_AP_Usuario();

                int HorasCaducidad = Convert.ToInt32(ConfigurationManager.AppSettings["HorasReestablecimientoPass"]);
                DataSet dsResultado = Usuario.CambiarContraseña(CodigoSolicitud, NuevaContrasena, HorasCaducidad);

                if (dsResultado.Tables.Count > 0)
                {
                    strResultado = dsResultado.Tables[0].Rows[0]["CodMsj"].ToString();
                    if (strResultado == "1")
                    {
                        //enviar correo
                        CCorreo cCorreo = new CompCorreo.CCorreo();

                        string CuerpoMensaje = string.Empty;
                        string Destinatario = dsResultado.Tables[1].Rows[0]["Correo"] == DBNull.Value ? "" : dsResultado.Tables[1].Rows[0]["Correo"].ToString();
                        string Asunto = "Confirmación de cambio de contraseña";

                        string UbicPlantilla = HttpContext.Current.Server.MapPath("~/") + "Common\\Plantillas\\ConfirmacionCambioContrasena.htm";
                        string NombreUsuario = dsResultado.Tables[1].Rows[0]["NombreUsuario"] == DBNull.Value ? "" : dsResultado.Tables[1].Rows[0]["NombreUsuario"].ToString();

                        CuerpoMensaje = String.Format(TraeCuerpoPlantilla(UbicPlantilla), NombreUsuario, PaginaLogin);

                        if (Destinatario != string.Empty && NombreUsuario != string.Empty)
                        {
                            try
                            {
                                cCorreo.Enviar(false, Destinatario, Asunto, CuerpoMensaje, null, false, "");
                            }
                            catch (Exception ex)
                            {
                                strErrorCorreo = ex.ToString();
                            }
                        }
                        else
                        {
                            strResultado = "0";
                        }
                    }
                }
                else
                {
                    strResultado = "0";//error en BD
                }

                return strResultado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Usuario != null) Usuario.Dispose();
            }
        }

        public static string TraeCuerpoPlantilla(string RutaPlantilla)
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