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
namespace PcSistelMovil2Web.Mantenimiento
{
    public partial class Mnt_Dominio : System.Web.UI.Page
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
                BL_AP_Dominio Dominio = new BL_AP_Dominio();
                try
                {

                    string P_inCod = Request.QueryString["Cod"];
                    CargarCombos();

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdDominio.Value = P_inCod;


                        ENT_AP_Dominio oDominio = Dominio.Mostrar(Convert.ToInt32(P_inCod));

                        txtNombre.Text = oDominio.Nombre;
                        ddlBaseDatos.SelectedValue = oDominio.IdBaseDatos.ToString();
                        ddlEmpresa.SelectedValue = oDominio.IdEmpresa.ToString();
                        ddlInstanciaAPP.SelectedValue = oDominio.IdInstanciaAPP.ToString();
                        ddlLicencia.SelectedValue = oDominio.IdLicencia.ToString();
                        ddlPais.SelectedValue = oDominio.IdPais.ToString();

                    }
                    else
                    {
                        hdfIdDominio.Value = "0";
                    }

                }
                catch (Exception ex)
                {
                    ClaseUtilitarios util = new ClaseUtilitarios();
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                    throw new Exception();
                }
                finally
                {
                    if (Dominio != null) Dominio.Dispose();
                }
            }
        }

        public void CargarCombos()
        {
            BL_AP_BaseDatos BaseDatos = new BL_AP_BaseDatos();          

            try
            {
                ddlBaseDatos.DataSource = BaseDatos.Listar();
                ddlBaseDatos.DataValueField = "IdBaseDatos";
                ddlBaseDatos.DataTextField = "BaseDatos";
                ddlBaseDatos.DataBind();

                BL_AP_Empresa Empresa = new BL_AP_Empresa();
                ddlEmpresa.DataSource = Empresa.Listar();
                ddlEmpresa.DataValueField = "IdEmpresa";
                ddlEmpresa.DataTextField = "RazonSocial";
                ddlEmpresa.DataBind();

                BL_AP_InstanciaAPP InstanciaAPP = new BL_AP_InstanciaAPP();
                ddlInstanciaAPP.DataSource = InstanciaAPP.Listar();
                ddlInstanciaAPP.DataValueField = "IdInstanciaAPP";
                ddlInstanciaAPP.DataTextField = "NombreAPP";
                ddlInstanciaAPP.DataBind();

                BL_AP_Licencia Licencia = new BL_AP_Licencia();
                ddlLicencia.DataSource = Licencia.Listar();
                ddlLicencia.DataValueField = "IdLicencia";
                ddlLicencia.DataTextField = "Nombre";
                ddlLicencia.DataBind();


                BL_AP_Pais Pais = new BL_AP_Pais();
                ddlPais.DataSource = Pais.Listar();
                ddlPais.DataValueField = "IdPais";
                ddlPais.DataTextField = "Nombre";
                ddlPais.DataBind();

                ddlBaseDatos.Items.Insert(0, new ListItem("Seleccione", "-1"));
                ddlEmpresa.Items.Insert(0, new ListItem("Seleccione", "-1"));
                ddlInstanciaAPP.Items.Insert(0, new ListItem("Seleccione", "-1"));
                ddlLicencia.Items.Insert(0, new ListItem("Seleccione", "-1"));
                ddlPais.Items.Insert(0, new ListItem("Seleccione", "-1"));
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (BaseDatos != null) BaseDatos.Dispose();
            }

        }

        [WebMethod]
        public static int Guardar(string oDominio)
        {
            BL_AP_Dominio Dominio = new BL_AP_Dominio();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Dominio V_oDominio = oSerializer.Deserialize<ENT_AP_Dominio>(oDominio);

                if (V_oDominio.IdDominio == 0)
                {

                    return 1;
                }
                else
                {
                    return Dominio.Actualizar(V_oDominio);
                }

            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (Dominio != null) Dominio.Dispose();
            }
        }
    }
}