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
using System.Text;
using System.Globalization;
namespace PcSistelMovil2Web.Asistente
{
    public partial class Asistente33 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                if ((Session["datos"] == null))
                {
                    Response.BufferOutput = true;
                    string script = "window.top.location.reload();";
                    this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);

                    return;

                }

                if ((Session["imagenCargada"] != null))
                {
                    Session["ImagenActual"] = Session["imagenCargada"];
                }

                BL_AP_Licencia Licencia = new BL_AP_Licencia();
                Tipolicencia.DataSource = Licencia.Listar();
                Tipolicencia.DataTextField = "Nombre";
                Tipolicencia.DataValueField = "IdLicencia";
                Tipolicencia.DataBind();

                BL_AP_Portal Portal = new BL_AP_Portal();
                ddlPortalOrigen.DataSource = Portal.Listar();
                ddlPortalOrigen.DataTextField = "NombrePortal";
                ddlPortalOrigen.DataValueField = "IdPortal";
                ddlPortalOrigen.DataBind();

            }
        }


        [WebMethod()]      
        public static int BuscarDominio(string nombre)
        {       
            BL_AP_Dominio Dominio = new BL_AP_Dominio();
            try
            {         
                int resultado =0;

                string NombreDominio = RemoveDiacritics(nombre);
              
                NombreDominio = NombreDominio.Replace(" ", string.Empty);

                if (nombre != NombreDominio)
                {
                    return 2;
                }


                if (Dominio.BuscarDominio(NombreDominio) > 0)
                {
                    resultado = 1;
                }

                return resultado;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public static string RemoveDiacritics(string s) //Remover las Tildes
        {
            string normalizedString = null;
            StringBuilder stringBuilder = new StringBuilder();
            normalizedString = s.Normalize(NormalizationForm.FormD);
            int i = 0;
            char c = '\0';

            for (i = 0; i <= normalizedString.Length - 1; i++)
            {
                c = normalizedString[i];
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            //return stringBuilder.ToString().ToLower();
            return stringBuilder.ToString();
        }

    }
}