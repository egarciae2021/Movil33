using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Configuration;
using Utilitarios;
using VisualSoft.Comun.Utilitarios;


namespace PcSistelMovil2Web
{
    public partial class Configuracion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!HttpContext.Current.Request.IsLocal)
            {
                //if (Session["datos"] == null)
                //{
                //    Response.Redirect("login.aspx");
                //    return;
                //}
                Response.Redirect("Login.aspx");
            }
            if (!IsPostBack)
            {
                string strCadenaConexion = Utilitarios.ArchivoConfiguracion.ObtenerValorConfiguracion(Server.MapPath("~/web.config"), "accesoSQL");

                //@Autor: jherrera
                //@Validacion de tipo de autenticacion en base a llave de config
                //**************************************************************
                int intAutenticacion = Utilitarios.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"));
                if (intAutenticacion == 1)
                {
                    if (ConfigurationManager.AppSettings["LoginMode"].ToString() == "Active Directory")
                        intAutenticacion = 2;
                }
                rblstAutenticacion.SelectedIndex = intAutenticacion;
                //**************************************************************

                rbtnUsarioContraseña.Checked = true;
                if (!String.IsNullOrEmpty(strCadenaConexion))
                {
                    strCadenaConexion = Cryptographics.DecryptString(strCadenaConexion); //jcamacho 123
                    Utilitarios.ConexionBE objConexion = Utilitarios.ConexionBL.GetInstancia().ObtieneConexion(strCadenaConexion);
                    if (objConexion != null)
                    {
                        txtServidor.Text = objConexion.Servidor;
                        txtUsuario.Text = objConexion.Usuario;
                        txtContraseña.Text = objConexion.Password;
                        txtContraseña.Attributes.Add("value", txtContraseña.Text);
                        txtBaseDatos.Text = objConexion.BaseDatos;
                        if (objConexion.SeguridadIntegrada == "1")
                        {
                            rbtnUsarioContraseña.Checked = false;
                            rbtnSeguridadIntegrada.Checked = true;
                            trUsuario.Style["display"] = "none";
                            trContraseña.Style["display"] = "none";
                        }
                        else
                        {
                            rbtnSeguridadIntegrada.Checked = false;
                            rbtnUsarioContraseña.Checked = true;
                        }
                    }
                    else
                    {
                        txtServidor.Text = "";
                        txtUsuario.Text = "";
                        txtContraseña.Text = "";
                        txtBaseDatos.Text = "";
                        rbtnSeguridadIntegrada.Checked = false;
                        rbtnUsarioContraseña.Checked = true;
                    }
                }
            }
        }

        [WebMethod()]
        public static string ComprobarConexion(string Servidor, string Autenticacion, string Usuario, string Password, string BaseDatos)
        {
            string connectionstring;

            if (Autenticacion == "SI")
                connectionstring = "Data Source=" + Servidor + ";Initial Catalog=" + BaseDatos + "; Integrated Security = True; connection timeout=2;";
            else
                connectionstring = "Data Source=" + Servidor + ";Initial Catalog=" + BaseDatos + ";user id=" + Usuario + ";password=" + Password + ";connection timeout=2;";

            if (Utilitarios.ArchivoConfiguracion.VerificaConexionBD(connectionstring))
                return "";
            else
                return "Sin conexion";
        }

        [WebMethod()]
        public static string GuardarConfiguracionBase(string Servidor, string Autenticacion,
                                                      string Usuario, string Password,
                                                      string BD, string AutenticacionUsuario)
        {
            try
            {

                Utilitarios.BaseDatos.Servidor = Servidor;
                Utilitarios.BaseDatos.BD = BD;
                Utilitarios.BaseDatos.Usuario = Usuario;
                Utilitarios.BaseDatos.Contraseña = Password;
                Utilitarios.BaseDatos.TimeOut = "30";

                // Actualizar tabla GEN_Cliente




                if (Autenticacion == "SI")
                {
                    Utilitarios.BaseDatos.SSPI = "true";
                }
                else
                {
                    Utilitarios.BaseDatos.SSPI = "false";
                }
                Utilitarios.BaseDatos.Proveedor = "SQL";

                if (Utilitarios.ArchivoConfiguracion.CambiarValorConfiguracion(HttpContext.Current.Server.MapPath("~/web.config"), "accesoSQL", Cryptographics.EncryptString(Utilitarios.BaseDatos.CadenaConexion())))
                {
                    if (Utilitarios.ArchivoConfiguracion.CambiarValorAutenticacion(HttpContext.Current.Server.MapPath("~/web.config"), Convert.ToInt32(AutenticacionUsuario)))
                    {
                        //@Autor: jherrera
                        //@Actualizacion de config con tipo de autenticacion (login)
                        //**********************************************************
                        Utilitarios.ArchivoConfiguracion.CambiarValorAutenticacionKey(HttpContext.Current.Server.MapPath("~/web.config"), "LoginMode", Convert.ToInt32(AutenticacionUsuario));

                        //BL_GEN_Cliente blCliente = new BL_GEN_Cliente();  //jcamacho 123 blgencliente
                        //blCliente.GuardaConexion(0, Servidor, Autenticacion, Usuario, Password, BD);

                        return "";
                        //**********************************************************
                    }
                    else
                        return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config";
                }
                else
                    return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config";
            }
            catch (Exception)
            {
                return "No se pudo grabar la configuración, verifique los permisos de escritura para el archivo web.config";
            }
        }



    }
}