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

namespace PcSistelMovil2Web.Solicitudes
{
    public partial class Adm_SeguridadSolicitud : System.Web.UI.Page
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
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<object> Listar(string vcTipSel, string vcTipSubSel, string vcIdTipSel)
        {
            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
            try
            {

                List<object> lstObj = new List<object>();


                if (!string.IsNullOrEmpty(vcIdTipSel))
                {
                    //DataSet dsDetalle = UsuarioTipoSolicitud.MostrarPorSeleccion(vcTipSel, vcTipSubSel, Convert.ToInt32("0" + vcIdTipSel));

                    DataSet dsDetalle = Solicitud.seguridad_Tipo_Usuario(Convert.ToInt32(vcIdTipSel));

                    DataTable dtUsuGruTipSol = dsDetalle.Tables[0];
                    DataTable dtTipoSolicitud = dsDetalle.Tables[0];

                    if (vcTipSel == "Tecnico")
                    {
                        for (int i = 0; i <= dtTipoSolicitud.Rows.Count - 1; i++)
                        {
                            Dictionary<string, object> dict = new Dictionary<string, object>();
                            dict.Add("IdTipSel", dtTipoSolicitud.Rows[i]["IdUsuario"].ToString());
                            dict.Add("vcNomTipSel", dtTipoSolicitud.Rows[i]["nombre"].ToString());
                            dict.Add("biLeer", "False");
                            dict.Add("biCrear", "False");
                            dict.Add("biEditar", "False");
                            dict.Add("biEliminar", "False");
                            dict.Add("vcDisabled", "");
                            dict.Add("IdTipoSolicitud", "1");
                            //dict.Add("IdTipoSolicitud", dtTipoSolicitud.Rows[i]["inCodTipSol"].ToString());

                            dict["biLeer"] = dtUsuGruTipSol.Rows[i]["biLeer"].ToString();
                            dict["biCrear"] = dtUsuGruTipSol.Rows[i]["biCrear"].ToString();
                            dict["biEditar"] = dtUsuGruTipSol.Rows[i]["biEditar"].ToString();
                            dict["biEliminar"] = dtUsuGruTipSol.Rows[i]["biEliminar"].ToString();
                            dict["vcDisabled"] = "";

                            //for (int j = 0; j <= dtUsuGruTipSol.Rows.Count - 1; j++)
                            //{
                            //
                            //
                            //    if ((dtTipoSolicitud.Rows[i]["inCodTipSol"].ToString() == dtUsuGruTipSol.Rows[j]["F_inTipSol"]) & vcIdTipSel != "1")
                            //    {
                            //        //dict.Item["biLeer"] = dtUsuGruTipSol.Rows[j]["biLeer"].ToString();
                            //        //dict.Item("biCrear") = dtUsuGruTipSol.Rows[j]["biCrear"].ToString();
                            //        //dict.Item("biEditar") = dtUsuGruTipSol.Rows[j]["biEditar"].ToString();
                            //        //dict.Item("biEliminar") = dtUsuGruTipSol.Rows[j]["biEliminar"].ToString();
                            //        //dict.Item("vcDisabled") = "";
                            //
                            //        dict["biLeer"] = dtUsuGruTipSol.Rows[j]["biLeer"].ToString();
                            //        dict["biCrear"] = dtUsuGruTipSol.Rows[j]["biCrear"].ToString();
                            //        dict["biEditar"] = dtUsuGruTipSol.Rows[j]["biEditar"].ToString();
                            //        dict["biEliminar"] = dtUsuGruTipSol.Rows[j]["biEliminar"].ToString();
                            //        dict["vcDisabled"] = "";
                            //
                            //
                            //
                            //    }
                            //    else if (vcIdTipSel == "1")
                            //    {
                            //        //dict.Item("biLeer") = "True";
                            //        //dict.Item("biCrear") = "True";
                            //        //dict.Item("biEditar") = "True";
                            //        //dict.Item("biEliminar") = "True";
                            //        //dict.Item("vcDisabled") = "disabled='disabled'";
                            //
                            //        dict["biLeer"] = "True";
                            //        dict["biCrear"] = "True";
                            //        dict["biEditar"] = "True";
                            //        dict["biEliminar"] = "True";
                            //        dict["vcDisabled"] = "disabled='disabled'";
                            //    }
                            //}
                            lstObj.Add(dict);

                        }

                    }
                    //else if (vcTipSel == "Grupo")
                    //{
                    //    for (int i = 0; i <= dtTipoSolicitud.Rows.Count - 1; i++)
                    //    {
                    //        Dictionary<string, object> dict = new Dictionary<string, object>();
                    //        dict.Add("IdTipSel", dtTipoSolicitud.Rows(i)("inCodTipSol").ToString());
                    //        dict.Add("vcNomTipSel", dtTipoSolicitud.Rows(i)("vcNomTipSol").ToString());
                    //        dict.Add("biLeer", "False");
                    //        dict.Add("biCrear", "False");
                    //        dict.Add("biEditar", "False");
                    //        dict.Add("biEliminar", "False");
                    //        dict.Add("vcDisabled", "");
                    //
                    //        for (int j = 0; j <= dtUsuGruTipSol.Rows.Count - 1; j++)
                    //        {
                    //            if ((dtTipoSolicitud.Rows(i)("inCodTipSol").ToString() == dtUsuGruTipSol.Rows(j)("F_inTipSol")))
                    //            {
                    //                dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString();
                    //                dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString();
                    //                dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString();
                    //                dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString();
                    //            }
                    //        }
                    //        lstObj.Add(dict);
                    //
                    //    }
                    //
                    //
                    //}
                    else if (vcTipSel == "TipoSolicitud")
                    {
                        if (vcTipSubSel == "Tecnico")
                        {
                            //BL_SEG_Usuario Usuario = new BL_SEG_Usuario(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
                            //DataTable dtUsuario = Usuario.ListarPorPerfil(42).Tables(0);
                            DataTable dtUsuario = dsDetalle.Tables[0];
                            for (int i = 0; i <= dtUsuario.Rows.Count - 1; i++)
                            {
                                Dictionary<string, object> dict = new Dictionary<string, object>();
                                dict.Add("IdTipSel", dtUsuario.Rows[i]["IdUsuario"].ToString());
                                dict.Add("vcNomTipSel", dtUsuario.Rows[i]["nombre"].ToString());
                                dict.Add("biLeer", "False");
                                dict.Add("biCrear", "False");
                                dict.Add("biEditar", "False");
                                dict.Add("biEliminar", "False");
                                dict["vcDisabled"] = "disabled='disabled'";
                                dict.Add("IdTipoSolicitud", dtUsuario.Rows[i]["inCodTipSol"].ToString());

                                dict["biLeer"] = dtUsuGruTipSol.Rows[i]["biLeer"].ToString();
                                dict["biCrear"] = dtUsuGruTipSol.Rows[i]["biCrear"].ToString();
                                dict["biEditar"] = dtUsuGruTipSol.Rows[i]["biEditar"].ToString();
                                dict["biEliminar"] = dtUsuGruTipSol.Rows[i]["biEliminar"].ToString();
                                dict["vcDisabled"] = "";


                                //for (int j = 0; j <= dtUsuGruTipSol.Rows.Count - 1; j++)
                                //{
                                //    if ((dtUsuario.Rows[i]["P_inCod"].ToString() == dtUsuGruTipSol.Rows[j]["F_inUsu"]) & dtUsuario.Rows[i]["P_inCod"].ToString() != "1")
                                //    {
                                //        //dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString();
                                //        //dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString();
                                //        //dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString();
                                //        //dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString();                               ;
                                //
                                //        dict["biLeer"] = dtUsuGruTipSol.Rows[j]["biLeer"].ToString();
                                //        dict["biCrear"] = dtUsuGruTipSol.Rows[j]["biCrear"].ToString();
                                //        dict["biEditar"] = dtUsuGruTipSol.Rows[j]["biEditar"].ToString();
                                //        dict["biEliminar"] = dtUsuGruTipSol.Rows[j]["biEliminar"].ToString();
                                //   
                                //    }
                                //    else if (dtUsuario.Rows[i]["P_inCod"].ToString() == "1")
                                //    {
                                //        //dict.Item("biLeer") = "True";
                                //        //dict.Item("biCrear") = "True";
                                //        //dict.Item("biEditar") = "True";
                                //        //dict.Item("biEliminar") = "True";
                                //        //dict.Item("vcDisabled") = "disabled='disabled'";
                                //
                                //        dict["biLeer"] = "True";
                                //        dict["biCrear"] = "True";
                                //        dict["biEditar"] = "True";
                                //        dict["biEliminar"] = "True";
                                //        dict["vcDisabled"] = "disabled='disabled'";
                                //    }
                                //}

                                lstObj.Add(dict);
                            }
                        }
                        //else if (vcTipSubSel == "Grupo")
                        //{
                        //    BL_GEN_GrupoOrigen GrupoOrigen = new BL_GEN_GrupoOrigen(oUsuario.IdCliente);
                        //    DataTable dtGrupoOrigen = GrupoOrigen.ListarPorNombre("", Convert.ToInt32(vcIdTipSel)).Tables(0);
                        //    GrupoOrigen.Dispose();
                        //    for (int i = 0; i <= dtGrupoOrigen.Rows.Count - 1; i++)
                        //    {
                        //        Dictionary<string, object> dict = new Dictionary<string, object>();
                        //        dict.Add("IdTipSel", dtGrupoOrigen.Rows(i)("GROR_P_inCODGRUORI").ToString());
                        //        dict.Add("vcNomTipSel", dtGrupoOrigen.Rows(i)("GROR_vcNOMGRU").ToString());
                        //        dict.Add("biLeer", "False");
                        //        dict.Add("biCrear", "False");
                        //        dict.Add("biEditar", "False");
                        //        dict.Add("biEliminar", "False");
                        //        dict.Add("vcDisabled", "");
                        //
                        //        for (int j = 0; j <= dtUsuGruTipSol.Rows.Count - 1; j++)
                        //        {
                        //            if ((dtGrupoOrigen.Rows(i)("GROR_P_inCODGRUORI").ToString() == dtUsuGruTipSol.Rows(j)("F_inGruOri")))
                        //            {
                        //                dict.Item("biLeer") = dtUsuGruTipSol.Rows(j)("biLeer").ToString();
                        //                dict.Item("biCrear") = dtUsuGruTipSol.Rows(j)("biCrear").ToString();
                        //                dict.Item("biEditar") = dtUsuGruTipSol.Rows(j)("biEditar").ToString();
                        //                dict.Item("biEliminar") = dtUsuGruTipSol.Rows(j)("biEliminar").ToString();
                        //            }
                        //        }
                        //
                        //        lstObj.Add(dict);
                        //    }
                        //
                        //}
                    }

                }



                return lstObj;
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

        [WebMethod()]
        public static string Grabar(string vcTipSel, string vcIdBusqueda, string vcTipSubSel, string XMLUsuGruTipSol)
        {
            BL_AP_TipoSolicitudTecnico TipoSolicitudTecnico = new BL_AP_TipoSolicitudTecnico();

            try
            {
                //BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
                //List<object> lstObj = new List<object>();
                //BL_ENT_Campo Campo = new BL_ENT_Campo();
                //JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                //List<ENT_ENT_Campo> lstCampo = oSerializer.Deserialize<List<ENT_ENT_Campo>>(vclstCam);                
                //Campo.GuardarPropiedades(lstCampo, vcTab, 1);                

                return TipoSolicitudTecnico.Guardar(XMLUsuGruTipSol);



            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (TipoSolicitudTecnico != null) TipoSolicitudTecnico.Dispose();
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object BuscarTecnico(string filtro, string campoordenar, string orden, int inPagTam, int inPagAct)
        {

            BL_AP_Usuario usuario = new BL_AP_Usuario();
            try
            {
                DataSet dtTecnico = new DataSet();
                dtTecnico = usuario.BuscarTecnico(filtro, campoordenar, orden);
                return JQGrid.DatosJSON(dtTecnico.Tables[0], inPagTam, inPagAct);
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
            }
        }

    }
}