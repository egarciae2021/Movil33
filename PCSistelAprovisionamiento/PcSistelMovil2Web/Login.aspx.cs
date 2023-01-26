using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Configuration;
using Utilitarios;
using VisualSoft.Comun.Utilitarios;
using System.Data;
using System.DirectoryServices;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
using Web;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;

using System.Text;
using CompCorreo;

namespace PcSistelMovil2Web
{
    public partial class Login : System.Web.UI.Page
    {
        int longitudCortaDecimales = 0; int inMuestraHyperLink = 0;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                //hdfRutaRaiz.Value = AppDomain.CurrentDomain.BaseDirectory;
                hdfRutaRaiz.Value = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + HttpRuntime.AppDomainAppVirtualPath;

                Session["ModuloOpcion"] = "";
                Session["Texto_Asunto"] = "";
                Session["Texto_Cliente"] = "";

                litProductoRelease.Text = "" + ConfigurationManager.AppSettings["ReleaseProducto"].ToString();
                litProductoRelease.Text = litProductoRelease.Text.Replace("(", "").Replace(")", "").Trim();
                try
                {
                    lblNombreProducto1.Text = ConfigurationManager.AppSettings["NombreProducto1"].ToString();
                    lblNombreProducto2.Text = ConfigurationManager.AppSettings["NombreProducto2"].ToString();
                    lblNombreProducto1.Style.Add("color", ConfigurationManager.AppSettings["ColorNombreProducto1"].ToString());
                    lblNombreProducto2.Style.Add("color", ConfigurationManager.AppSettings["ColorNombreProducto2"].ToString());
                }
                catch
                {
                    lblNombreProducto1.Text = "Gestión";
                    lblNombreProducto2.Text = "Móviles";
                    lblNombreProducto1.Style.Add("color", "#10589A");
                    lblNombreProducto2.Style.Add("color", "#E78503");
                }

                //return;

                //longitudCortaDecimales = int.Parse(ConfigurationManager.AppSettings["LongitudCortaDec"]);

                //if (HttpContext.Current.Request.IsLocal)
                //    //tdIrConfiguracion.Visible = true;
                //else
                //    //tdIrConfiguracion.Visible = false;

                this.hfLoc.Value = HttpContext.Current.Request.IsLocal ? "1" : "0";



                //inMuestraHyperLink = int.Parse(ConfigurationManager.AppSettings["MuestraLinkProducto"]);
                //HyperLink1.Text = (ConfigurationManager.AppSettings["TextoLinkProducto"]);
                // HyperLink1.NavigateUrl = (ConfigurationManager.AppSettings["URLLinkProducto"]);

                if (inMuestraHyperLink == 0)
                {
                    //HyperLink1.Visible = false;
                }
                else
                {
                    //HyperLink1.Visible = true;
                }


                string strCadenaConexion = ArchivoConfiguracion.ObtenerValorConfiguracion(Server.MapPath("~/web.config"), "accesoSQL");
                if (string.IsNullOrEmpty(strCadenaConexion))
                {
                    if (HttpContext.Current.Request.IsLocal)
                    {
                        Response.Redirect("Configuracion.aspx");
                    }
                    else
                    {

                        txtusuario.Enabled = false;
                        txtclave.Enabled = false;
                        //btnentra.Visible = false;
                        //lbl_error.Visible = true;
                        //lbl_error.Text = "No hay conexión con la base de datos.";
                    }
                }
                else
                {
                    strCadenaConexion = Cryptographics.DecryptString(strCadenaConexion);

                    //jherrera 20130516 MovilNET_Mediante link con parametros se podra realizar busqueda automatica en consultas
                    //----------------------------------------------------------------------------------------------------------
                    if (Request.QueryString["CodEmp"] != null)
                        Session["MOV_CodEmp"] = Request.QueryString["CodEmp"];
                    if (Request.QueryString["Tel"] != null)
                        Session["MOV_Tel"] = Request.QueryString["Tel"];
                    if (Request.QueryString["Per"] != null)
                        Session["MOV_Per"] = Request.QueryString["Per"];
                    if (Request.QueryString["Ser"] != null)
                        Session["MOV_Ser"] = Request.QueryString["Ser"];
                    //----------------------------------------------------------------------------------------------------------

                    if (ArchivoConfiguracion.VerificaConexionBD(strCadenaConexion))
                    {
                        //DataTable dtEmpresa = new BLLLogin().getEmpresa();

                        //if (dtEmpresa.Rows.Count > 0)
                        //{
                        //    if (dtEmpresa.Rows[0]["REGI_imLOGWEB"] != DBNull.Value)
                        //    {
                        //        Byte[] btLogo = (Byte[])dtEmpresa.Rows[0]["REGI_imLOGWEB"];

                        //        string strFn = Server.MapPath("~/images/imgLogo.png");
                        //        FileStream fs = new FileStream(strFn, FileMode.OpenOrCreate, FileAccess.Write);
                        //        fs.Write(btLogo, 0, btLogo.Length);
                        //        fs.Flush();
                        //        fs.Close();
                        //        //imgLogoWeb.ImageUrl = "~/images/imgLogo.png";
                        //    }
                        //    else
                        //    {
                        //        //imgLogoWeb.ImageUrl = "images/LogoInicial.png";
                        //    }
                        //}


                        //lbl_error.Visible = false;

                        //@Autor: jherrera
                        //@Validacion de tipo de autenticacion en base a llave de config
                        //**************************************************************
                        int intAutenticacion = Utilitarios.ArchivoConfiguracion.ObtenerValorAutenticacion(Server.MapPath("~/web.config"));
                        if (intAutenticacion == 1)
                        {
                            if (ConfigurationManager.AppSettings["LoginMode"].ToString() == "Active Directory")
                                intAutenticacion = 2;
                        }
                        ViewState["intAutenticacion"] = intAutenticacion;
                        //**************************************************************

                        //Autenticacion de windows
                        if (intAutenticacion == 1)
                        {
                            string usuario = User.Identity.Name.Substring(User.Identity.Name.IndexOf("\\") + 1);
                            //DataTable dt = new BLLLogin().getUsuarioWin(usuario);
                            DataTable dt = new DataTable();

                            if (dt.Rows.Count > 0)
                            {
                                if (dt.Rows[0]["USUA_vcTIPO"].ToString() != "")
                                {
                                    //Valida horario permitido....
                                    //CSeguridad objSeguridad = new CSeguridad();
                                    //if (objSeguridad.HorarioPermitido(Convert.ToInt32(dt.Rows[0]["USUA_P_inCODUSU"].ToString())) == false)
                                    //{
                                    //    lbl_error.Text = "La cuenta de usuario no tiene permisos para ingresar al sistema en este horario.";
                                    //    lbl_error.Visible = true;
                                    //    txtusuario.Text = "";
                                    //    txtclave.Text = "";
                                    //    lblfecha.Text = DateTime.Now.Day + " de " + new ClaseUtilitarios().getNombreMes(DateTime.Now.Month) + " del " + DateTime.Now.Year;
                                    //    txtusuario.Focus();
                                    //    objSeguridad = null;
                                    //    return;
                                    //}
                                    //objSeguridad = null;

                                    //Session["datos"] = dt;
                                    //Session["tipo"] = dt.Rows[0]["USUA_vcTIPO"].ToString();
                                    //Session["codintG"] = dt.Rows[0]["USUA_F_vcCODINT"].ToString();
                                    //Session["codintA"] = dt.Rows[0]["USUA_vcAreaWeb"].ToString();
                                    //Session["Telefonia"] = "0";
                                    //Session["TotalCambios"] = dt.Rows[0]["EMPL_INCAMNUM"].ToString();

                                    //Session["VistaWeb"] = dt.Rows[0]["USUA_vcVISTA"].ToString();
                                    //Session["P_CODUSU"] = dt.Rows[0]["USUA_P_inCODUSU"].ToString();
                                    ////jherrera 20130522 Se modifico las llamadas de cultura para evitar una llamada excesiva a la BD
                                    ////----------------------------------------------------------------------------------------------
                                    // Session["NumDecimales"] = BLL.BLLFormatoFecha.GetInstance().obtenerTipoLongitudDecimales(1);
                                    Session["dtCultura"] = new BasePage().culturaSESION();
                                    Session["inicioFormatoDec"] = new BasePage().culturaSESIONActualizadaConDecimales();
                                    Session["strFormatoFecha"] = new BasePage().obtenerSESIONFormatoFecha();
                                    Session["strFormatoFechaConHora"] = new BasePage().obtenerSESIONFormatoFechaConHora();


                                    //----------------------------------------------------------------------------------------------

                                    Response.Redirect("MainPrincipal.aspx");
                                }
                                else
                                {
                                    //lbl_error.Text = "El usuario ingresado no tiene una area asignada";
                                    //lbl_error.Visible = true;
                                    txtusuario.Text = "";
                                    txtclave.Text = "";
                                    txtusuario.Focus();
                                }
                            }
                            else
                            {
                                //lbl_error.Text = "Sus credenciales de Windows no están registradas en PCSistel 7.6. </br></br> Consulte con el administrador del sistema.";
                                //lbl_error.Visible = true;                            
                                //lbl_usuario.Visible = false;
                                //lbl_clave.Visible = false;
                                //txtusuario.Visible = false;
                                txtclave.Visible = false;
                                //btnentra.Visible = false;
                                //div_inicio.Visible = false;
                            }
                        }
                        else if (intAutenticacion == 2) //Active Directory
                        {
                            //@Autor: jherrera
                            //@Validacion para acceso Active Directory y nombre automatico de usuario
                            //************************************************************************

                            //string usuario = User.Identity.Name.Substring(User.Identity.Name.IndexOf("\\") + 1);

                            //if (dtEmpresa.Rows.Count > 0)
                            //    lblEmpresa.Text = dtEmpresa.Rows[0]["REGI_vcNOMEMP"].ToString();
                            //else
                            //    lblEmpresa.Text = "VISUAL SOFT S.A.C";

                            //txtusuario.Text = usuario;
                            //lblfecha.Text = DateTime.Now.Day + " de " + new ClaseUtilitarios().getNombreMes(DateTime.Now.Month) + " del " + DateTime.Now.Year;

                            //************************************************************************
                        }
                        else
                        {
                            //@Autor: jgranda
                            //@Cliente: Min. RREE
                            //@Validacion para colocar nombre de Empresa
                            //*******************************************************************

                            //if (dtEmpresa.Rows.Count > 0)
                            //{
                            //    //lblEmpresa.Text = dtEmpresa.Rows[0]["REGI_vcNOMEMP"].ToString();
                            //}
                            //else
                            //{
                            //    //lblEmpresa.Text = "VISUAL SOFT S.A.C";
                            //}
                            //*****************************************                    

                            //lblfecha.Text = DateTime.Now.Day + " de " + new ClaseUtilitarios().getNombreMes(DateTime.Now.Month) + " del " + DateTime.Now.Year;
                        }
                    }
                    else
                    {
                        if (HttpContext.Current.Request.IsLocal)
                        {
                            Response.Redirect("Configuracion.aspx");
                        }
                        else
                        {
                            txtusuario.Enabled = false;
                            txtclave.Enabled = false;
                            //btnentra.Visible = false;
                            //lbl_error.Text = "No hay conexión con la base de datos.";
                            //lbl_error.Visible = true;
                            //lblEmpresa.Text = "VISUAL SOFT S.A.C";
                        }
                    }
                }

            }

            txtusuario.Focus();
        }

        private bool GetLogueo()
        {
            try
            {
                DirectoryEntry deEntryInfo = new DirectoryEntry(ConfigurationManager.AppSettings["LDAPath"].ToString(), txtusuario.Text, txtclave.Text);
                string strInfo = deEntryInfo.Name;
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        //*******************************************



        [WebMethod]
        public static string VerificaSesion()
        {
            string _return = "";
            try
            {
                //Perdio la variable session usuario
                if (HttpContext.Current.Session["datos"] == null)
                {
                    _return = "Perdio sesion";
                }
            }
            catch (Exception ex)
            {
                _return = ex.Message;
                try
                {
                    Utilitarios.ClaseUtilitarios util = new Utilitarios.ClaseUtilitarios();
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitarios.ClaseUtilitarios.NombreSistema);
                }
                catch (Exception ex1)
                {
                    _return = "error en util";
                }
                //Throw New Exception(Utilitario.MensajeError)
            }
            return _return;
        }

        protected void btnentra_Click(object sender, EventArgs e)
        {
            //@Autor: jherrera
            //@Validacion para tipo de acceso Active Directory
            //************************************************
            BL_AP_Usuario Usuarios = new BL_AP_Usuario();
            ENT_AP_Usuario oUsuario = new ENT_AP_Usuario();

            try
            {
                int intAutenticacion = Convert.ToInt32(ViewState["intAutenticacion"]);


                if (intAutenticacion == 2)
                {
                    string usuario = txtusuario.Text;

                    //Validacion de logueo por Active Directory
                    if (GetLogueo())
                    {
                        //DataTable dt = new BLLLogin().getUsuarioWin(usuario);
                        DataTable dt = new DataTable();

                        if (dt.Rows.Count > 0)
                        {
                            if (dt.Rows[0]["USUA_vcTIPO"].ToString() != "")
                            {
                                //Valida horario permitido....
                                //CSeguridad objSeguridad = new CSeguridad();
                                //if (objSeguridad.HorarioPermitido(Convert.ToInt32(dt.Rows[0]["USUA_P_inCODUSU"].ToString())) == false)
                                //{
                                //    lbl_error.Text = "La cuenta de usuario no tiene permisos para ingresar al sistema en este horario.";
                                //    lbl_error.Visible = true;
                                //    txtusuario.Text = usuario;
                                //    txtclave.Text = "";
                                //    //lblfecha.Text = DateTime.Now.Day + " de " + new ClaseUtilitarios().getNombreMes(DateTime.Now.Month) + " del " + DateTime.Now.Year;
                                //    txtusuario.Focus();
                                //    objSeguridad = null;
                                //    return;
                                //}
                                //objSeguridad = null;
                                //AsignarCultura(); //agregado por jcamacho 16/02/2015
                                Session["datos"] = dt;
                                Session["usuarioLogueado"] = usuario;
                                Session["tipo"] = dt.Rows[0]["USUA_vcTIPO"].ToString();
                                Session["codintG"] = dt.Rows[0]["USUA_F_vcCODINT"].ToString();
                                Session["codintA"] = dt.Rows[0]["USUA_vcAreaWeb"].ToString();
                                Session["Telefonia"] = "0";
                                Session["TotalCambios"] = dt.Rows[0]["EMPL_INCAMNUM"].ToString();
                                Session["P_CODUSU"] = dt.Rows[0]["USUA_P_inCODUSU"].ToString();
                                Session["CodEmpleado"] = dt.Rows[0]["USUA_F_vcCODEMP"].ToString();
                                Session["VistaWeb"] = dt.Rows[0]["USUA_vcVISTA"].ToString();
                                //jherrera 20130522 Se modifico las llamadas de cultura para evitar una llamada excesiva a la BD
                                //----------------------------------------------------------------------------------------------
                                //Session["NumDecimales"] = BLL.BLLFormatoFecha.GetInstance().obtenerTipoLongitudDecimales(1);
                                Session["dtCultura"] = new BasePage().culturaSESION();
                                Session["inicioFormatoDec"] = new BasePage().culturaSESIONActualizadaConDecimales();
                                Session["strFormatoFecha"] = new BasePage().obtenerSESIONFormatoFecha();
                                Session["strFormatoFechaConHora"] = new BasePage().obtenerSESIONFormatoFechaConHora();
                                //----------------------------------------------------------------------------------------------

                                Response.Redirect("MainPrincipal.aspx");
                            }
                            else
                            {
                                lbl_error.Text = "El usuario ingresado no tiene una area asignada.";
                                lbl_error.Visible = true;
                                txtusuario.Text = usuario;
                                txtclave.Text = "";
                                txtusuario.Focus();
                            }
                        }
                        else
                        {
                            lbl_error.Text = "Sus credenciales de Windows no están registradas en PCSistel 7.6. </br></br> Consulte con el administrador del sistema.";
                            lbl_error.Visible = true;
                            //lbl_usuario.Visible = false;
                            //lbl_clave.Visible = false;
                            txtusuario.Visible = false;
                            txtclave.Visible = false;
                            btnentra.Visible = false;
                        }
                    }
                    else
                    {
                        lbl_error.Text = "Las credenciales ingresadas no coinciden con el usuario de windows.";
                        lbl_error.Visible = true;
                        txtusuario.Text = usuario;
                        txtclave.Text = "";
                        txtusuario.Focus();
                    }
                }
                //************************************************
                else
                {
                    string usuario = txtusuario.Text;
                    string clave = Cryptographics.EncryptString(txtclave.Text);

                    if (usuario.Trim() == "")
                    {
                        lbl_error.Text = "Debe ingresar un usuario";
                        txtusuario.Text = "";
                        txtclave.Text = "";
                        txtusuario.Focus();
                    }
                    else if (clave.Trim() == "")
                    {
                        lbl_error.Text = "Debe ingresar una contraseña";
                        txtusuario.Text = "";
                        txtclave.Text = "";
                        txtclave.Focus();
                    }

                    else
                    {
                        // DataTable dt = new BLLLogin().getUsuario(usuario, clave);
                        oUsuario.Nombre = txtusuario.Text;
                        oUsuario.Clave = txtclave.Text;
                        //DataTable dt = Usuarios.ListarUsuario(oUsuario);
                        List<ENT_AP_Usuario> lsDatosUsuario = Usuarios.DatosUsuario(oUsuario);

                        if (lsDatosUsuario.Count > 0)
                        {
                            if (lsDatosUsuario[0].Btvig)
                            {
                                Session["datos"] = lsDatosUsuario;
                                Session["usuarioLogueado"] = usuario;
                                Response.Redirect("MainPrincipal.aspx",false);
                            }
                            else
                            {
                                lbl_error.Text = "El usuario ingresado, actualmente se encuentra deshabilitado";
                                txtusuario.Text = "";
                                txtclave.Text = "";
                                txtusuario.Focus();
                            }
                        }
                        else
                        {
                            //lbl_error.Text = "El usuario ingresado no existe";
                            lbl_error.Text = "El usuario o la contraseña ingresados son incorrectos";
                            txtusuario.Text = "";
                            txtclave.Text = "";
                            txtusuario.Focus();
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
                if (Usuarios != null) Usuarios.Dispose();
            }
        }

        #region Recuperarcontrasena

        [WebMethod()]
        public static string EnviarSolicitudRestablecimiento(string Correo, string Url)
        {
            BL_AP_Usuario Usuario = new BL_AP_Usuario();

            //BL_AP_Usuario Usuario = null;
            string strResultado = string.Empty;
            string strErrorCorreo = string.Empty;
            try
            {
                

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
                                cCorreo.Enviar(false, Destinatario, Asunto, CuerpoMensaje, null, false, "");
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
                        strResultado = inResultado.ToString() + "|" + EnlaceParaCorreo;
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

        #endregion
    }
}