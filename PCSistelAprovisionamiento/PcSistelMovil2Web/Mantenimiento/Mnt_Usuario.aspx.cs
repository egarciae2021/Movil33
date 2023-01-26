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
    public partial class Mnt_Usuario : System.Web.UI.Page
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
                BL_AP_Usuario Usuario = new BL_AP_Usuario();

                try
                {
                    string P_inCod = Request.QueryString["Cod"];
                    List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)Session["datos"];

                    if (Request.QueryString["Cod"] != null)
                    {
                        hdfCodigo.Value = P_inCod;

                        ENT_AP_Usuario oUsuario = Usuario.Mostrar(Convert.ToInt32(P_inCod));

                        if (lsDatosUsuario[0].Perfil.Where(x => x.IdPerfil == 1).Count() > 0)//Administrador
                        {
                            hdf_esAdmin.Value = "1";
                        }


                        txtvcUsu.Text = oUsuario.Usuario;
                        txtvcPas.Text = oUsuario.Clave;
                        txtvcPas.Attributes["Value"] = txtvcPas.Text;
                        txtConfirmarContrasena.Text = oUsuario.Clave;
                        txtConfirmarContrasena.Attributes["Value"] = txtConfirmarContrasena.Text;
                        txtnombre.Text = oUsuario.Nombre;
                        txtape.Text = oUsuario.Apellidos;
                        txtoperador.Text = oUsuario.Operador.Descripcion;
                        txtCorreo.Text = oUsuario.Correo;
                        txtConfirmarCorreo.Text = oUsuario.Correo;
                        hdfCodOperador.Value = oUsuario.Operador.IdOperador.ToString();
                        chkEstado.Checked = oUsuario.Btvig;

                        trEstado.Style["Display"] = "none";

                    }
                    else
                    {
                        trEstado.Style["Display"] = "none";
                        chkEstado.Checked = true;
                        hdfCodOperador.Value = "0";
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
                    if (Usuario != null) Usuario.Dispose();
                }
            }

        }

        [WebMethod()]
        public static List<string> ObtenerPerfilTree(string pIdUsuario)
        {
            int idUsuario = -1;
            BL_AP_Solicitud Solicitud = null;
            BL_AP_Usuario Usuario = new BL_AP_Usuario();          

            int esTecResp = 0;
            try
            {

                Solicitud = new BL_AP_Solicitud();
                if (!pIdUsuario.Equals(""))
                {
                    idUsuario = Convert.ToInt32(pIdUsuario);
                    DataTable dtVerificaUsuario = Solicitud.VerificarUsuario_TecnicoResApr(Convert.ToInt32(pIdUsuario));
                    if ((dtVerificaUsuario.Rows[0]["EsTecnico"].ToString() == "0"))
                        esTecResp = 0;
                    else
                        esTecResp = 1;
                }
                else
                {
                    esTecResp = 0;

                }
                List<string> _return = Usuario.ObtenerPerfilTree(idUsuario, esTecResp);
                return _return;

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Usuario != null) Usuario.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<object> Listar(string vcIdUsuario)
        {
            try
            {
                //ENT_SEG_Usuario oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];
                //
                //List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];
                //int IdUsuario = lsDatosUsuario[0].IdUsuario;
                //
                //BL_MOV_TipoSolicitud_Usuario UsuarioTipoSolicitud = new BL_MOV_TipoSolicitud_Usuario(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente);
                List<object> lstObj = new List<object>();
                //
                //if (!string.IsNullOrEmpty(vcIdUsuario))
                //{
                //    DataSet dsDetalle = UsuarioTipoSolicitud.MostrarPorSeleccion("Tecnico", "Tecnico", Convert.ToInt32("0" + vcIdUsuario));
                //    UsuarioTipoSolicitud.Dispose();
                //
                //    DataTable dtUsuGruTipSol = dsDetalle.Tables(0);
                //    DataTable dtTipoSolicitud = dsDetalle.Tables(1);
                //
                //    for (int i = 0; i <= dtTipoSolicitud.Rows.Count - 1; i++)
                //    {
                          Dictionary<string, object> dict = new Dictionary<string, object>();
                //        dict.Add("IdTipSel", dtTipoSolicitud.Rows(i)("inCodTipSol").ToString());
                //        dict.Add("vcNomTipSel", dtTipoSolicitud.Rows(i)("vcNomTipSol").ToString());
                            dict.Add("biLeer", "False");
                            dict.Add("biCrear", "False");
                            dict.Add("biEditar", "False");
                            dict.Add("biEliminar", "False");
                            dict.Add("vcDisabled", "");
                //
                //        for (int j = 0; j <= dtUsuGruTipSol.Rows.Count - 1; j++)
                //        {
                //            if ((dtTipoSolicitud.Rows(i)("inCodTipSol").ToString() == dtUsuGruTipSol.Rows(j)("F_inTipSol") & vcIdUsuario != "1"))
                //            {
                //                dict["biLeer"] = dtUsuGruTipSol.Rows(j)("biLeer").ToString();
                //                dict["biCrear"] = dtUsuGruTipSol.Rows(j)("biCrear").ToString();
                //                dict["biEditar"] = dtUsuGruTipSol.Rows(j)("biEditar").ToString();
                //                dict["biEliminar"] = dtUsuGruTipSol.Rows(j)("biEliminar").ToString();
                //            }
                //            else if (vcIdUsuario == "1")
                //            {
                                    dict["biLeer"] = "True";
                                    dict["biCrear"] = "True";
                                    dict["biEditar"] = "True";
                                    dict["biEliminar"] = "True";
                                    dict["vcDisabled"] = "disabled='disabled'";
                //            }
                //        }
                lstObj.Add(dict);
                //
                //    }
                //
                //}

                return lstObj;
              

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
        }

        [WebMethod()]
        public static string Guardar(string oEntidad, string pXMLPerfil, string btVig)
        {
            BL_AP_Usuario Usuario = new BL_AP_Usuario();

            try
            {
                string Resultado = "";


                JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                ENT_AP_Usuario v_oUsuario = oSerializer.Deserialize<ENT_AP_Usuario>(oEntidad);

                //v_oEntidad.Usuario = v_oEntidad.Usuario.Replace("&#39", "'").Replace("&#40", "\\").Replace("&#34", "\"");
                //v_oEntidad.Clave = v_oEntidad.Clave.Replace("&#39", "'").Replace("&#40", "\\").Replace("&#34", "\"");
                //v_oEntidad.Nombre = v_oEntidad.Nombre.Replace("&#39", "'").Replace("&#40", "\\").Replace("&#34", "\""); 



                List<List<int>> listaXML = new List<List<int>>();
                List<int> lista = default(List<int>);


                //if (!pXMLPerfil.Equals(string.Empty))
                //{
                //    lista = new List<int>();
                //    foreach (string cad in pXMLPerfil.Split(','))
                //    {
                //        string cadena;
                //        cadena = cad.Replace("DynaTreeNode<", string.Empty);
                //        cadena = cadena.Remove(cadena.IndexOf(">"));
                //        lista.Add(Convert.ToInt32(cadena));
                //
                //    }
                //    listaXML.Add(lista);
                //}
                //else
                //{
                //    listaXML.Add(new List<int>());
                //}


                if (v_oUsuario.IdUsuario.ToString() == "-1")
                {
                    //Resultado = Usuario.Guardar(v_oUsuario, 0, pXMLPerfil).ToString();
                    Resultado = Usuario.Insertar(v_oUsuario, pXMLPerfil).ToString();
                }
                else
                {
                    //Resultado = Usuario.Guardar(v_oUsuario, 1, pXMLPerfil).ToString();
                    Resultado = Usuario.Actualizar(v_oUsuario, pXMLPerfil).ToString();
                }

                return Resultado;


            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();

            }
            finally
            {
                if (Usuario != null) Usuario.Dispose();
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object BuscarOperador(string filtro, string campoordenar, string orden, int inPagTam, int inPagAct)
        {

            BL_AP_Usuario usuario = new BL_AP_Usuario();
            BL_AP_Operador Operador = new BL_AP_Operador();
            try
            {
                DataSet dtOperador = new DataSet();
                dtOperador = Operador.BuscarOperador(filtro, campoordenar, orden);
                return JQGrid.DatosJSON(dtOperador.Tables[0], inPagTam, inPagAct);
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (usuario != null) usuario.Dispose();
                if (Operador != null) Operador.Dispose();
            }
        }


    }
}