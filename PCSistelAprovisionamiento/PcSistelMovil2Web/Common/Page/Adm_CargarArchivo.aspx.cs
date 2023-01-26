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

namespace PcSistelMovil2Web.Common.Page
{
    public partial class Adm_CargarArchivo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Session["datos"] == null))
            {
                Response.BufferOutput = true;
                string script = "window.top.location.reload();";
                this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);
                return;
            }

            if (!Page.IsPostBack)
            {
                try
                {
                   
                    byte[] Archivo = (byte[])HttpContext.Current.Session["ArchivoCargado"];

                    string vcFilePath = "";
                    string NombreArchivo= Request.QueryString["NombreArchivo"];
                
                    
                    if ((Archivo != null))
                    {                        
                        //vcFilePath = HttpContext.Current.Server.MapPath("~") + "//Temporal//" + NombreArchivo;//dtDetalle.Rows[0]["NomArc"].ToString();
                        string strfn = Server.MapPath("~\\Temporal\\" + NombreArchivo);
                        byte[] byFileData = (byte[])HttpContext.Current.Session["ArchivoCargado"];
                        File.WriteAllBytes(strfn, byFileData);                      
                    }

            


                    hdfFormatos.Value = Request.QueryString["Formatos"];
                    hdfFormatoTipo.Value = Request.QueryString["FormatoTipo"];
                    hdfAceptavariosArchivos.Value = Request.QueryString["AceptaNArchivos"];
           

                    string vcRutaCarpeta = Request.QueryString["RutaCarpeta"];
                    if (((vcRutaCarpeta == null)))
                    {
                        hdfRutaCarpeta.Value = "/Temporal/";
                    }
                    else
                    {
                        hdfRutaCarpeta.Value = vcRutaCarpeta;
                    }

                }
                catch (Exception ex)
                {
                    ClaseUtilitarios util = new ClaseUtilitarios();
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                    throw new Exception();
                }
            }
        }

        protected void btnCargar_Click(object sender, EventArgs e)
        {
            if (((fulArchivo.PostedFile != null)) & (fulArchivo.PostedFile.ContentLength > 0))
            {
               // string fechaansi = DateTime.Now.ToString("yyyyMMddhhmmss");
                string fechaansi = "";
                hdfNombreArchivoCargado.Value = fulArchivo.PostedFile.FileName;
                string strfn = Server.MapPath("~/" + hdfRutaCarpeta.Value + Path.GetFileNameWithoutExtension(hdfNombreArchivoCargado.Value) + "" + fechaansi + Path.GetExtension(hdfNombreArchivoCargado.Value));
                hdfNombreArchivoFisico.Value = hdfRutaCarpeta.Value + Path.GetFileNameWithoutExtension(hdfNombreArchivoCargado.Value) + "" + fechaansi + Path.GetExtension(hdfNombreArchivoCargado.Value);

                fulArchivo.PostedFile.SaveAs(strfn);
                Session["ArchivoCargado"] = fulArchivo.FileBytes;
                string script = "Inicio();CargarArchivoParent();";              
                this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);
            }
        }
    }
}