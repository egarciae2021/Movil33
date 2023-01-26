using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Utilitarios;
using VisualSoft.Comun.LibreriaJQ;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using System.Configuration;

namespace PcSistelMovil2Web
{
    public partial class MainPrincipal : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            BL_AP_Modulo Modulo = null;
            try
            {
                if ((Session["datos"] == null))
                {
                    Response.BufferOutput = true;
                    Response.Redirect("login.aspx");
                }

                if (!Page.IsPostBack)
                {
                    Modulo = new BL_AP_Modulo();

                    //Session["NombrePc"] = System.Environment.MachineName;
                    Session["NombrePc"] = Request.UserHostAddress;
                    
                    List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)Session["datos"];

                    string perfil = "";

                    for (int i = 0; i < lsDatosUsuario[0].Perfil.Count; i++)
                    {
                        perfil = perfil + lsDatosUsuario[0].Perfil[i].IdPerfil + ",";

                    }

                    perfil = perfil.Substring(0, perfil.Length - 1);

                    lblUsuario.Text = "Usuario: " + lsDatosUsuario[0].Nombre;
                    try
                    {
                        lblEmpresa.Text = ConfigurationManager.AppSettings["NombreEmpresa"].ToString(); 
                    }
                    catch (Exception)
                    {
                        lblEmpresa.Text = "VISUAL SOFT S.A.C ";
                    }
                    

                    DataSet dsModulo = Modulo.ListarModulosPermitidos(perfil);


                    hdfModuloCantidad.Value = dsModulo.Tables[0].Rows.Count.ToString();
                    int CantModulos = dsModulo.Tables[0].Rows.Count;

                    for (int i = 0; i < CantModulos; i++)
                    {
                        PanelBarraNavegacion Panel = new PanelBarraNavegacion();
                        Panel.Titulo = dsModulo.Tables[0].Rows[i]["nombre"].ToString();
                        Panel.Width = 170;
                        int idModulo = (int)dsModulo.Tables[0].Rows[i]["IdModulo"];

                        for (int j = 0; j < dsModulo.Tables[1].Rows.Count; j++)
                        {
                            if ((int)dsModulo.Tables[1].Rows[j]["IdModulo"] == idModulo)
                            {
                                ItemBarraNavegacion item = new ItemBarraNavegacion();
                                item.ID = dsModulo.Tables[1].Rows[j]["IdOpcion"].ToString();
                                //item.ID = dsModulo.Tables[1].Rows[j]["IdOpcion"].ToString();
                                item.UrlIco = "Common/images/Mantenimiento/default.png";
                                item.Url = dsModulo.Tables[1].Rows[j]["Url"].ToString() + "?Tabla=" + dsModulo.Tables[1].Rows[j]["Tabla"].ToString();
                                item.Highlight = true;
                                item.Seleccionable = true;
                                item.Texto = dsModulo.Tables[1].Rows[j]["nombre"].ToString();

                                item.Click = "ItemDinamico";
                                Panel.ItemsBarraNavegacion.Add(item);
                            }

                        }
                        BarraNavegacionJQ1.PanelesBarraNavegacion.Add(Panel);
                    }
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
                if (Modulo != null) Modulo.Dispose();
            }
        }

        protected void lnkcerrar_Click(object sender, EventArgs e)
        {
            if (Session["datos"] != null)
            {
                Session.Remove("datos");
                Session.RemoveAll();
                Session.Clear();
                Session.Abandon();
                Response.Redirect("login.aspx");
            }
        }
    }
}