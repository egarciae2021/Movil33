using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
using VisualSoft.Comun.Utilitarios;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using Utilitarios;

namespace PcSistelMovil2Web.Solicitudes
{
    public partial class Adm_SolicitudesConfiguracion : System.Web.UI.Page
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

            ttgInfoNombre.Mensaje = "Nombre interno del sistema, no visible al usuario.";

            if (!Page.IsPostBack)
            {
                BL_AP_TipoSolicitud TipoSolicitud = new BL_AP_TipoSolicitud();
                try
                {

                    //ProcesaAuditoria oAuditoria = new ProcesaAuditoria();
                    //oAuditoria.Usuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];

                    string vcCodigo = Request.QueryString["Cod"];

                    //bpTecnicoResponsable.NombreEntidad = "Usuario";
                    //bpTecnicoResponsable.vcTab = "SEG_Usuario";
                    //bpTecnicoResponsable.TipoOrigen = 0;
                    //bpTecnicoResponsable.Condicion = "btEst = 1 And P_inCod in (Select F_inUsu From seg_perfilusuario Where F_inPer = 42)";
                    //bpTecnicoResponsable.FuncionPersonalizada = "fnMostrarDatos";
                    //bpTecnicoResponsable.RutaRaiz = "../../../";
                    //bpTecnicoResponsable.Contenedor = "dvContenedorTecRes";

                    hdfCodSolSist.Value = "";
                    hdfPersonalizada.Value = "false";


                    string vcNomArcCon = "";

                    //preguntar si es personalizado
                    bool biPers = false;

                    //string strForNum = UtilitarioWeb.DevuelveFormatoNumero(oCultura);
                    string strForNum = "";
                    hdfCodTipSol.Value = Request.QueryString["Cod"];


                    if (biPers == false)
                    {
                        hdfPersonalizada.Value = "false";
                        //dvContenido.Style("display") = "none"
                        //dvSolicitudSistema.Style("display") = ""

                        //NUEVO
                        DataSet ds = new DataSet();
                        ds = TipoSolicitud.Listar_Todo(Convert.ToInt32(hdfCodTipSol.Value));
                        MostrarDatos(ds);
                        //MostrarDatos(ds.Tables(1), ds.Tables(2), ds.Tables(3), ds.Tables(4), ds.Tables(5), ds.Tables(6), ds.Tables(7), ds.Tables(8), ds.Tables(9), ds.Tables(10), strForNum);
                    }
                    else
                    {
                        hdfPersonalizada.Value = "true";
                        //List<ENT_MOV_CaracteristicaTipoDato> lstCaracteristicaTipoDato = default(List<ENT_MOV_CaracteristicaTipoDato>);

                        //Referencia (Entidad y Símbolos)
                        string vcScript = "";


                        //Nombre de archivo de condiciones
                        vcScript += "var vcFileName = '" + vcNomArcCon + "';";

                        //Simbolos
                        vcScript += "var Simbolos = [";
                        //foreach (void drSimb_loopVariable in dsRefer.Tables(1).Rows) {
                        //    drSimb = drSimb_loopVariable;
                        //    vcScript += "{ Id: '" + drSimb("IdSimboloCondicion").ToString() + "', Simbolo: '" + drSimb("vcSimbolo").ToString();
                        //    vcScript += "', Descripcion: '" + drSimb("vcDescSimbolo").ToString() + "', vcTipoDato: '" + drSimb("vcTipoDato").ToString() + "'},";
                        //}
                        vcScript = vcScript.Substring(0, vcScript.Length - 1);
                        vcScript += "];";
                        //Fin Referencia 



                        DataSet ds = new DataSet();
                        if (((vcCodigo != null)))
                        {
                            ds = TipoSolicitud.Listar_Todo(Convert.ToInt32(hdfCodTipSol.Value));
                            hdfNumSolicitudes.Value = ds.Tables[0].Rows[0][0].ToString();

                            //MostrarDatos(ds.Tables(1), ds.Tables(2), ds.Tables(3), ds.Tables(4), ds.Tables(5), ds.Tables(6), ds.Tables(7), ds.Tables(8), ds.Tables(9), ds.Tables(10), strForNum);
                        }
                        else
                        {
                            vcScript = vcScript + "var arTipSol = new Array(); arTipSol.EstadoProceso = []; arTipSol.EstadoAprobacion = []; arTipSol.Parametros = []; ";
                            vcScript = vcScript + "arTipSol.Umbrales = []; arTipSol.Umbrales.Aprobacion = []; arTipSol.Umbrales.Proceso = [];";
                            vcScript = vcScript + "function CampoReferenciaCondicion(IdCondicion, IdCampo, IdCamEnt, IdSimboloCondicion, IdCampoTipSol, TextoCondicion, NombreCampoTipSol, IdCampoRelacion, ValorCampoRelacion, NombreCampoRelacion) {";
                            vcScript = vcScript + "this.IdCondicion = IdCondicion; this.IdCampo = IdCampo; this.IdCamEnt = IdCamEnt; this.NombreCampoTipSol = NombreCampoTipSol; ";
                            vcScript = vcScript + "this.IdSimboloCondicion = IdSimboloCondicion; this.IdCampoTipSol = IdCampoTipSol; this.TextoCondicion = TextoCondicion; ";
                            vcScript = vcScript + "this.IdCampoRelacion = IdCampoRelacion; this.ValorCampoRelacion = ValorCampoRelacion; this.NombreCampoRelacion = NombreCampoRelacion; } var lstCondiciones = new Array();";

                        }

                        this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", vcScript, true);
                    }

                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    if (TipoSolicitud != null) TipoSolicitud.Dispose();
                }
            }
        }

        public void MostrarDatos(DataSet dsDatos)
        {

            DataTable dtTipoSolicitud = dsDatos.Tables[0];
            DataTable dtEstadoProcesos = dsDatos.Tables[1];
            DataTable dtEstadosAprobacion = dsDatos.Tables[1];
            DataTable dtParametros = dsDatos.Tables[2];
            DataTable dtMensajes = dsDatos.Tables[3];

            hdfPersonalizada.Value = "false";
            try
            {

                string vcVarEnter = "_;.-.;_";
                string script = "";

                txtTabla.Text = dtTipoSolicitud.Rows[0]["Nombre"].ToString();
                txtDescripcionTipo.Text = dtTipoSolicitud.Rows[0]["Nombre"].ToString();
                txtPrefijo.Text = dtTipoSolicitud.Rows[0]["prefijo"].ToString();

                if (dtTipoSolicitud.Rows[0]["idTecnicoAsignado"].ToString() == "")
                {
                    //bpTecnicoResponsable.CodigoValor = "";
                    hdfTecnicoResponsable_Act.Value = "";
                    txtresultado.Text = "";
                }
                else
                {
                    hdfTecnicoResponsable_Act.Value = dtTipoSolicitud.Rows[0]["idTecnicoAsignado"].ToString();
                    hdfTecnicoResponsable.Value = dtTipoSolicitud.Rows[0]["idTecnicoAsignado"].ToString();
                    txtresultado.Text = dtTipoSolicitud.Rows[0]["TecnicoAsignado"].ToString();
                }

                ddlEstadoAprobacion.DataSource = dtEstadoProcesos;
                ddlEstadoAprobacion.DataTextField = "nombre";
                ddlEstadoAprobacion.DataValueField = "IdTipoMensajeEstado";
                ddlEstadoAprobacion.DataBind();

                //Variable de Nombre de archivo de condiciones vacía
                script += "var vcFileName = '';";

                //EstadoProcesos
                script += "var arTipSol = new Array(); arTipSol.EstadoProceso = []; arTipSol.EstadoAprobacion = []; arTipSol.Parametros = []; arTipSol.Umbrales = []; ";
                script += "arTipSol.Umbrales.Aprobacion = []; arTipSol.Umbrales.Proceso = [];";


                for (int i = 0; i < dtEstadoProcesos.Rows.Count; i++)
                {
                    string vcEstadoProceso = dtEstadoProcesos.Rows[i]["Nombre"].ToString();

                    string vcEnviaCorreo = "0";
                    //if (Convert.ToBoolean(dtEstadoProcesos.Rows[i]["EnviaCorreo"]) == true)
                    //{
                    //    vcEnviaCorreo = "1";
                    //}

                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'] = []; ";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Id = '" + dtEstadoProcesos.Rows[i]["IdTipoMensajeEstado"].ToString() + "';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].EnviarCorreo = '" + vcEnviaCorreo + "';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdMensaje = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Destinatarios = '';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Asunto = '';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Mensaje = '';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Propietario = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].UsuarioEspecifico = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Responsable = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Tecnico = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Operador = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].UsaPlantilla = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdRegla = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].ReglaAutomatica = '0';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdEstadoFinal = '';";
                    script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Campos = [];";
                    //script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Orden  = '" + dtEstadoProcesos.Rows(i)("Orden").ToString() + "';";

                    //Mensajes Por EstadoProcesos

                    for (int j = 0; j <= dtMensajes.Rows.Count - 1; j++)
                    {
                        if (dtEstadoProcesos.Rows[i]["IdTipoMensajeEstado"].ToString() == dtMensajes.Rows[j]["IdTipoMensajeEstado"].ToString())
                        {
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].IdMensaje = '" + dtMensajes.Rows[j]["IdTipoMensajeEstado"].ToString() + "';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Destinatarios = '" + dtMensajes.Rows[j]["Destinatarios"].ToString() + "';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Asunto = '" + dtMensajes.Rows[j]["Asunto"].ToString() + "';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Mensaje = '" + dtMensajes.Rows[j]["Mensaje"].ToString().Replace(Convert.ToChar(10).ToString(), vcVarEnter) + "';";


                            //script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].EnviarCorreo = '1';";           

                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Propietario = '1';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].UsuarioEspecifico = '1';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Responsable = '1';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Tecnico = '1';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].Operador = '1';";
                            script += "arTipSol.EstadoProceso['" + vcEstadoProceso + "'].UsaPlantilla = '1';";

                        }
                    }
                }


                //Parámetros Por Mensaje




                //Parámetros Por Mensaje
                           
                    string vcScriptParametros = "";
                    for (int k = 0; k <= dtParametros.Rows.Count - 1; k++)
                    {
                        script += "arTipSol.Parametros['" + dtParametros.Rows[k]["Clave"].ToString();
                        script += "'] = { Clave: '" + dtParametros.Rows[k]["Clave"].ToString() + "', IdCampo: '" + dtParametros.Rows[k]["Nombre"].ToString();
                        script += "', vcCampo: '" + dtParametros.Rows[k]["Descripcion"].ToString() + "', IdParametro: '" + dtParametros.Rows[k]["IdParametro"].ToString();
                        script += "', Elegido: '" + dtParametros.Rows[k]["Elegido"].ToString() + "', DescripcionDetalle: '" + dtParametros.Rows[k]["DescripcionDetalle"].ToString() + "'}; ";
                    }
                    //vcScriptParametros += "fnSortDropDownListByText('ddlParametrosApr'); fnSortDropDownListByText('ddlParametrosPro');"
                    script += vcScriptParametros;
             

                //********************************************************

                string script2 = "";

                for (int j = 0; j < dtEstadosAprobacion.Rows.Count; j++)
                {
                    string vcNombreEstadoAprobacion = dtEstadosAprobacion.Rows[j]["Nombre"].ToString();

                    int EstApr = Convert.ToInt32(dtEstadosAprobacion.Rows[j]["IdTipoMensajeEstado"]);
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'] = [];";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Id = '" + EstApr.ToString() + "';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdRegla = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].ReglaAutomatica = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdEstadoFinal = '';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].EnviarCorreo = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Destinatarios = '';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Asunto = '';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Propietario = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].UsuarioEspecifico = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Responsable = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Tecnico = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Operador = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].UsaPlantilla = '0';";
                    script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdMensaje = '0';";


                    //Mensajes EstadoAprobacion

                
                for (int n = 0; n <= dtMensajes.Rows.Count - 1; n++)
                {
                    int IdEstMsj = Convert.ToInt32(dtMensajes.Rows[n]["IdTipoMensajeEstado"]);
                    if (EstApr == IdEstMsj)
                    {
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].EnviarCorreo = '1';";
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Destinatarios = '" + dtMensajes.Rows[n]["Destinatarios"].ToString() + "';";
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Asunto = '" + dtMensajes.Rows[n]["Asunto"].ToString() + "';";
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Mensaje = '" + dtMensajes.Rows[n]["Mensaje"].ToString().Replace(Convert.ToChar(10).ToString(), vcVarEnter) + "';";
                        script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].IdMensaje = '" + dtMensajes.Rows[n]["IdTipoSolicitudMensaje"].ToString() + "';";

                        if (dtMensajes.Rows[n]["Tecnico"].ToString() == "1")
                        {
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Tecnico = '1';";
                        }
                        if (dtMensajes.Rows[n]["Operador"].ToString() == "1")
                        {
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].Operador = '1';";
                        }
                        if (dtMensajes.Rows[n]["UsaPlantilla"].ToString() == "1")
                        {
                            script += "arTipSol.EstadoAprobacion['" + vcNombreEstadoAprobacion + "'].UsaPlantilla = '1';";
                        }                    
                      
                       
                    }
                }
                  

                }


                //************************************

                //Grilla Campos


                //script += "var dtCampos = [ ";
                //for (int i = 0; i <= dtCampos.Rows.Count - 1; i++)
                //{
                //    if (Convert.ToBoolean(dtCampos.Rows(i)("DeSistema")) == false)
                //    {
                //        script += "{Idd: 'in_" + (i + 1).ToString().Length == 1 ? "0" + (i + 1).ToString() : (i + 1).ToString() + dtCampos.Rows(i)("Nombre").ToString() + "', Campo: '" + dtCampos.Rows(i)("Nombre").ToString() + "', Descripcion: '";
                //        script += dtCampos.Rows(i)("Descripcion").ToString() + "', IdTipoDato: '" + dtCampos.Rows(i)("F_inCodTipDat").ToString() + "', TipoDato: '";
                //        script += dtCampos.Rows(i)("TipoDato").ToString() + "', Tamano: '" + dtCampos.Rows(i)("Longitud").ToString() + "', IdCampo: '";
                //        script += dtCampos.Rows(i)("IdCampo").ToString() + "',";
                //        //nuevos campos para referencia
                //        script += " IdEntidad: '" + dtCampos.Rows(i)("IdEntidad").ToString() + "', NomEntidad: '" + dtCampos.Rows(i)("NomEntidad").ToString() + "' , IdCamPK: '";
                //        script += dtCampos.Rows(i)("IdCamPK").ToString() + "', IdCamDes: '" + dtCampos.Rows(i)("IdCamDes").ToString() + "', NomCamDes: '" + dtCampos.Rows(i)("NomCamDes").ToString() + "',";
                //        script += " Activo: '" + dtCampos.Rows(i)("Activo").ToString() + "', ListaActivos: '" + dtCampos.Rows(i)("ListaActivos").ToString() + "'},";
                //    }
                //}

                //Combo Valor (Parámetros)


                this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKeyDatos", script, true);


            }
            catch (Exception)
            {

                throw;
            }
        }

        [WebMethod()]
        public static string Guardar(string vcNomTip, string vcDesTip, string biUsaDri, string vcPrefijo, string vcResApr, string XMLCampos, string XMLCamposPorEstadoProceso, string inNumCam,
string XMLMensajePorEstado, string XMLParametros, string vcCodTipsol, string biMonFij, string dcMonto, string biPropie, string biUsuEsp, string biResAre, string XMLUmbralEstado, string XMLReglaEstado,
string inTecnicoResponsable, string esDevolucion, string XMLCamposCondicion, string XMLDetalleCaptura, string biActivo, string vcNomArcCon, string vcLstCodSol, string XMLMensajeDevolucion)
        {
            BL_AP_TipoSolicitud TipoSolicitud = new BL_AP_TipoSolicitud();
            try
            {
                //BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();
                //List<object> lstObj = new List<object>();
                //BL_ENT_Campo Campo = new BL_ENT_Campo();
                //JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                //List<ENT_ENT_Campo> lstCampo = oSerializer.Deserialize<List<ENT_ENT_Campo>>(vclstCam);                
                //Campo.GuardarPropiedades(lstCampo, vcTab, 1);

                ENT_AP_TipoSolicitud objTipoSolicitud = new ENT_AP_TipoSolicitud();
                objTipoSolicitud.IdTipoSolicitud = Convert.ToInt32(vcCodTipsol);
                objTipoSolicitud.Nombre = vcDesTip;
                objTipoSolicitud.prefijo = vcPrefijo;
                objTipoSolicitud.IdTecnicoAsignado = Convert.ToInt32(inTecnicoResponsable);

                //return "0";
                return TipoSolicitud.Guardar(objTipoSolicitud, 2, XMLParametros, XMLMensajePorEstado);

                //return TipoSolicitudTecnico.Guardar(XMLUsuGruTipSol);



            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
            finally
            {
                if (TipoSolicitud != null) TipoSolicitud.Dispose();
            }
        }


        [WebMethod()]
        public static List<object> ListarDatosCorreoServicio(int IdTipoSolicitud)
        {
            BL_AP_TipoSolicitud TipoSolicitud = new BL_AP_TipoSolicitud();

            try
            {
                DataSet dsResultado = TipoSolicitud.DatosCorreoServicio(IdTipoSolicitud);
                List<object> lstObj = new List<object>();
                //parametros                
                List<ENT_AP_TipoSolicitudParametro> lstParametros = new List<ENT_AP_TipoSolicitudParametro>();
                foreach (DataRow dr in dsResultado.Tables[0].Rows)
                {
                    ENT_AP_TipoSolicitudParametro p = new ENT_AP_TipoSolicitudParametro();
                    p.IdParametro = Convert.ToInt32(dr["IdTipoSolicitudParametro"].ToString());
                    p.Variable = dr["Clave"].ToString();
                    p.NombreCampo = dr["Nombre"].ToString();
                    p.Seleccionado = Convert.ToBoolean(dr["Elegido"]);
                    p.Descripcion = dr["Descripcion"].ToString();
                    p.Detalle = dr["DescripcionDetalle"].ToString();
                    lstParametros.Add(p);
                }

                lstObj.Add(lstParametros);

                //datos correo
                Dictionary<string, string> dictCorreo = new Dictionary<string, string>();
                string destinatario = string.Empty; string asunto = string.Empty; string mensaje = string.Empty;
                foreach (DataRow dr in dsResultado.Tables[1].Rows)
                {
                    destinatario = dr["Destinatarios"].ToString();
                    asunto = dr["Asunto"].ToString();
                    mensaje = dr["Mensaje"].ToString();
                }
                dictCorreo.Add("Destinatarios", destinatario);
                dictCorreo.Add("Asunto", asunto);
                dictCorreo.Add("Mensaje", mensaje);
                lstObj.Add(dictCorreo);

                return lstObj;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
            finally
            {
                if (TipoSolicitud != null) TipoSolicitud.Dispose();
            }
        }
    }
}