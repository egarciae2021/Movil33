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
    public partial class Mnt_InstanciaBD : System.Web.UI.Page
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
            BL_AP_InstanciaBD InstanciaBD = null;
            if (!Page.IsPostBack)
            {
                try
                {

                    string P_inCod = Request.QueryString["Cod"];
                    ListarServidores();


                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfIdInstanciaBD.Value = P_inCod;
                        InstanciaBD = new BL_AP_InstanciaBD();
                        ENT_AP_InstanciaBD oInstanciaBD = InstanciaBD.Mostrar(Convert.ToInt32(P_inCod));

                        txtNombre.Text = oInstanciaBD.Instancia;
                        ddlServidor.SelectedValue = oInstanciaBD.Servidor.IdServidor.ToString();
                        txtUsuariodbo.Text = oInstanciaBD.Usuario_dbo;
                        txtPassdbo.Text = Cryptographics.DecryptString(oInstanciaBD.Pass_dbo);
                        txtUsuarioAPr.Text = oInstanciaBD.Usuario_Apr;
                        txtpassApr.Text = Cryptographics.DecryptString(oInstanciaBD.Pass_Apr);
                        chkMultiCliente.Checked = oInstanciaBD.EsMultiCliente;
                        if (chkMultiCliente.Checked)
                            trMulticliente.Style["display"] = "block";
                        else
                            trMulticliente.Style["display"] = "none";

                        if (txtNombre.Text.Trim() == "")
                        {
                            chkUsaInstancia.Checked = true;
                        }

                        JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                        List<object> lstBDClientes = new List<object>();
                        foreach (ENT_AP_InstanciaBD_BDCliente bdCliente in oInstanciaBD.BaseDatosCliente)
                        {
                            Dictionary<string, object> dict = new Dictionary<string, object>();
                            dict.Add("Codigo", bdCliente.IdBDCliente);
                            dict.Add("Nombre", bdCliente.BaseDatos);
                            lstBDClientes.Add(dict);
                        }
                        hdflstBDCliente.Value = oSerializer.Serialize(lstBDClientes);
                    }
                    else
                    {
                        hdfIdInstanciaBD.Value = "0";
                        hdflstBDCliente.Value = "";
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
                    if (InstanciaBD != null)
                        InstanciaBD.Dispose();
                }
            }
        }

        public void ListarServidores()
        { 
             BL_AP_Servidor Servidor = new BL_AP_Servidor();

             ddlServidor.DataSource = Servidor.Listar();
             ddlServidor.DataValueField = "IdServidor";
             ddlServidor.DataTextField = "Nombre";
             ddlServidor.DataBind();
        
        }

        [WebMethod]
        public static int Guardar(string oInstanciaBD)
        {
            BL_AP_InstanciaBD InstanciaBD = null;
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            //int resultado;
            try
            {
                InstanciaBD = new BL_AP_InstanciaBD();

                ENT_AP_InstanciaBD V_oInstanciaBD = oSerializer.Deserialize<ENT_AP_InstanciaBD>(oInstanciaBD);
                V_oInstanciaBD.Pass_dbo = Cryptographics.EncryptString(V_oInstanciaBD.Pass_dbo);
                V_oInstanciaBD.Pass_Apr = Cryptographics.EncryptString(V_oInstanciaBD.Pass_Apr);

                if (V_oInstanciaBD.IdInstanciaBD == 0)
                {

                    return InstanciaBD.Insertar(V_oInstanciaBD);
                }
                return InstanciaBD.Actualizar(V_oInstanciaBD);
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if(InstanciaBD != null)
                    InstanciaBD.Dispose();
            }
        }
    }
}