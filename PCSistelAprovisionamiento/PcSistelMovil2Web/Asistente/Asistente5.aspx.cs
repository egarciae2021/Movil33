using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
using VisualSoft.Comun.Utilitarios;
using System.Data;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using Utilitarios;

namespace PcSistelMovil2Web
{
    public partial class Asistente5 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            { 
                 if ((Session["imagenCargada"] != null))
                {
                    try
                    {
                        imglogo.Attributes["src"] = "data:image/jpeg;base64," + Convert.ToBase64String((byte[])(Session["imagenCargada"]));
                    }
                    catch (Exception ex)
                    {
                        ClaseUtilitarios util = new ClaseUtilitarios();
                        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                        throw new Exception();
                    }                
                }
            
            }
        }

        [WebMethod]
        public static string registrarCola(string prSolicitud)
        {
            BL_AP_Solicitud Solicitud = null;
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            try
            {
                Solicitud = new BL_AP_Solicitud();
                prSolicitud = prSolicitud.Replace("\"Lineas\":\"0.00\"", "\"Lineas\":\"0\"");
                ENT_AP_Solicitud oSolicitud = oSerializer.Deserialize<ENT_AP_Solicitud>(prSolicitud);
                ENT_AP_ColaAprovisionamiento oColaAprovisionamiento = new ENT_AP_ColaAprovisionamiento();

                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];

                //Cambiar a formato ansi,
                oSolicitud.IdUsuarioRegistro = lsDatosUsuario[0].IdUsuario;
                //oSolicitud.IdUsuarioRegistro = (int)dtUsuario.Rows[0]["IdUsuario"];
                //oSolicitud.IdEstado = 2; //1 Pendiente
                oSolicitud.TecnicoProcesar = lsDatosUsuario[0].IdUsuario;
                oSolicitud.Logo = (HttpContext.Current.Session["imagenCargada"]!=null?(byte[])HttpContext.Current.Session["imagenCargada"]:null);// as byte[];              
                oColaAprovisionamiento.NombrePC = HttpContext.Current.Session["NombrePc"].ToString();
                oColaAprovisionamiento.IdColaEstado = 1;             
                //return "ok";             
               return Solicitud.Procesar(oSolicitud, oColaAprovisionamiento);
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Solicitud != null) Solicitud.Dispose();
            }
        }
    }
}