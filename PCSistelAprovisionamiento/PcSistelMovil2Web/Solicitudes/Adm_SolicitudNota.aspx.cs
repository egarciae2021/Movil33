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
using System.IO;

namespace PcSistelMovil2Web.Solicitudes
{
    public partial class Adm_SolicitudNota : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if ((Session["datos"] == null))
            {
                Response.BufferOutput = true;
                string script = "window.top.location.reload();";
                this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);
            }
            else
            {
                try
                {
                    ttgInfoAdjunto.Mensaje = "El correo a enviar de la nota, no incluirá el archivo adjunto.";

                    List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)Session["datos"];

               
                    BL_AP_SolicitudNotaVisto SolicitudNotaVisto = new BL_AP_SolicitudNotaVisto();
                    ENT_AP_SolicitudNotaVisto objSolicitudNotaVisto = new ENT_AP_SolicitudNotaVisto();

                    DateTime fecha = DateTime.Now;

                    hdfUsuario.Value = lsDatosUsuario[0].Nombre; 
                    hdfIdSolicitud.Value = Request.QueryString["IdSolicitud"];       

                    odsNotas.SelectParameters["inCodSol"].DefaultValue = hdfIdSolicitud.Value;
                    odsNotas.SelectParameters["vcFecCor"].DefaultValue = "oCultura.vcFecCor";
                    odsNotas.SelectParameters["vcHorCor"].DefaultValue = "oCultura.vcHorCor";
                    odsNotas.SelectParameters["inCliente"].DefaultValue = "1";
                    odsNotas.SelectParameters["inCliente"].DefaultValue = "0";

                    objSolicitudNotaVisto.SolicitudNota.IdSolicitud =  Convert.ToInt32(hdfIdSolicitud.Value);
                    objSolicitudNotaVisto.IdUsuario = lsDatosUsuario[0].IdUsuario;
                    objSolicitudNotaVisto.NomUsuario = lsDatosUsuario[0].Nombre; 

                    SolicitudNotaVisto.Guardar(objSolicitudNotaVisto); 

                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<string> RegistrarDetalle(int inCodSol, string vcDetalle, string vcFileName, string vcEnviaCorreo)
        {       
            try
            {
                BL_AP_SolicitudNota SolicitudNota = new BL_AP_SolicitudNota();
                ENT_AP_SolicitudNota oSolicitudNota = new ENT_AP_SolicitudNota();
            
                List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
      

                string vcExtension = "";
                decimal deLength = 0;
                List<string> lstRespuesta = new List<string>();

                oSolicitudNota.IdSolicitud = inCodSol;
                oSolicitudNota.Mensaje =  (vcDetalle.Replace("&lt;", "<")).Replace("&gt;", ">");
                oSolicitudNota.IdRegistradoPor = lsDatosUsuario[0].IdUsuario;
                oSolicitudNota.RegistradorPor = lsDatosUsuario[0].Nombre; ;


                if (!string.IsNullOrEmpty(vcFileName))
                {
                    var vcFilePath = HttpContext.Current.Server.MapPath("~") + "//Common//Temporales" + vcFileName;
                    var vcName = vcFileName.Substring(0, vcFileName.LastIndexOf("."));
                    vcExtension = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1);

                    FileStream fs = new FileStream(vcFilePath, FileMode.Open, FileAccess.Read);
                    deLength = fs.Length / 1024;
                    byte[] byFileData = new byte[fs.Length];
                    fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length));
                    fs.Close();

                    oSolicitudNota.Archivo = byFileData;
                    oSolicitudNota.NombreArchivo = vcName;
                    oSolicitudNota.Tamanio = deLength;
                    oSolicitudNota.Extension = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1);  

                }

                oSolicitudNota.Fecha = DateTime.Now.ToShortDateString();
                oSolicitudNota.Hora = DateTime.Now.ToShortTimeString();

                //lstRespuesta.Add((DateTime.Now.ToString(oCultura.vcFecCor + " " + oCultura.vcHorCor)).ToUpper().Replace(".", ""));
                lstRespuesta.Add((DateTime.Now.ToString()).ToUpper().Replace(".", ""));

                bool biEnviaCorreo = false;
                if (vcEnviaCorreo == "1")
                    biEnviaCorreo = true;

                oSolicitudNota.EnviaCorreo = biEnviaCorreo;     
          
                int intDetalle = SolicitudNota.Guardar(oSolicitudNota);


                lstRespuesta.Add(intDetalle.ToString());
                lstRespuesta.Add(deLength.ToString("N4") + " KB");

                return lstRespuesta;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
        }


        [WebMethod()]
        public static string DescargarArchivoBD(int inIdDet)
        {
            string Resultado = "";
            try
            {
                BL_AP_SolicitudNota SolicitudNota = new BL_AP_SolicitudNota();
                string vcNombre = "";
                DataTable dtDetalle = SolicitudNota.MostrarNotas(0,"","",0,inIdDet);
                string vcFilePath = "";


                string sFileDir = HttpContext.Current.Server.MapPath("~") + "//Temporal//";

                if (!Directory.Exists(sFileDir))
                {
                    Directory.CreateDirectory(sFileDir);
                }


                if ((dtDetalle.Rows[0]["Archivo"] != null))
                {
                    //vcFilePath = dtDetalle.Rows[0]["NomArc"].ToString();
                    vcFilePath = HttpContext.Current.Server.MapPath("~") + "//Temporal//"+ dtDetalle.Rows[0]["NomArc"].ToString();
                    byte[] byFileData = (byte[])dtDetalle.Rows[0]["Archivo"];
                    File.WriteAllBytes(vcFilePath, byFileData);
                    Resultado = vcFilePath;
                }
                return Resultado;
        

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