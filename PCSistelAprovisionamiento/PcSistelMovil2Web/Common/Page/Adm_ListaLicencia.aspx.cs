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
using Web.GeneralMantenimiento;
using System.IO;
using VisualSoft.Comun.LibreriaJQ;

namespace PcSistelMovil2Web.Common.Page
{
    public partial class Adm_ListaLicencia : System.Web.UI.Page
    {
        static bool flagBorrarString = true;
        static string ruta = string.Empty;

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
                string vcTab = Request.QueryString["Tabla"];
                eeListado.ObtenerDatosAExportar += this.eeListado_ObtenerDatosAExportar;
                BL_ENT_Campo Campo = new BL_ENT_Campo();
                BL_ENT_Entidad Entidad = new BL_ENT_Entidad();
                ENT_ENT_Entidad oEntidad = new ENT_ENT_Entidad();

                List<ENT_ENT_Campo> lstCampo = new List<ENT_ENT_Campo>();

                lstCampo = Campo.Listar(vcTab, 0);
                oEntidad = Entidad.Mostrar(vcTab);
                hdfvcTab.Value = vcTab;

                tabContenido.Titulo = oEntidad.vcDes;

                if (vcTab == "Apr_Perfil")
                {
                    btnAgregar.Visible = false;
                    btnEliminar.Visible = false;
                    btnActivar.Visible = false;
                    btnConfigurarFiltroRegistro.Visible = false;
                }

                if (vcTab == "Dom_BaseDatos" || vcTab == "Dom_Dominio" || vcTab == "Dom_Empresa")
                {
                    hdfBotonAgregar.Value = "-1";
                }

                if (vcTab == "APR_TipoCobro" || vcTab == "APR_ConceptoCobro" || vcTab == "LIC_Licencia")
                {
                    btnConfigurarFiltroRegistro.Visible = false;
                    btnActivar.Visible = false;
                    hdfIdTipoCobro.Value = "0";
                }

                Session["Campos" + "_" + vcTab] = lstCampo;
                Session["DescripcionEntidad" + "_" + vcTab] = oEntidad.vcDes;
                btnAgregar.Attributes["Url"] = oEntidad.vcURLMan;
                btnEditar.Attributes["Url"] = oEntidad.vcURLMan;

                ConfigurarGrid(lstCampo, oEntidad);
                ConfigurarBusqueda(lstCampo, oEntidad);
                ConfigurarValoresPorDefecto(lstCampo);
            }
        }

        #region configurarGrid
        private void ConfigurarGrid(List<ENT_ENT_Campo> lstCampo, ENT_ENT_Entidad oEntidad)
        {
            string script = null;
            string IdPrim = "";
            string Columna = "var columnas=[";

            hdfActivo.Value = "Activo";
            hdfDesactivo.Value = "Baja";

            hdfCampBool.Value = "";

            foreach (ENT_ENT_Campo oCampo in lstCampo)
            {
                if (oCampo.btIdPri)
                {
                    if (!string.IsNullOrEmpty(IdPrim))
                    {
                        IdPrim += ",";
                    }
                    IdPrim += oCampo.vcNomAlias;
                }

                Columna = Columna + "{ name: '" + oCampo.vcNomAlias + "', index: '" + oCampo.vcNomAlias + "', width: " + oCampo.inLar.ToString() + ", label: '" + oCampo.vcDes.Replace("'", "\\'") + "'";

                if (oCampo.btOrd)
                //if (oCampo.btOrd & oEntidad.btOrd)
                {
                    Columna = Columna + ", sortable: true";
                    //Fecha / Fecha y Hora
                    if (oCampo.inTipDat == 2 | oCampo.inTipDat == 3)
                    {
                        Columna = Columna + ", sorttype: 'date'";
                        //Número
                    }
                    else if (oCampo.inTipDat == 5)
                    {
                        Columna = Columna + ", sorttype: function (cellValue) { return cellValue === null ? -1000 : Number(cellValue);}";
                    }
                }
                else
                {
                    Columna = Columna + ", sortable: false";
                }

                if (oCampo.btVis & oCampo.btVig)
                {
                    Columna = Columna + ", hidden: false";
                }
                else
                {
                    Columna = Columna + ", hidden: true";
                }

                if (oCampo.btEliLog)
                {

                    hdfElim.Value = oCampo.vcNomAlias;
                    Columna = Columna + ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" + hdfActivo.Value + "'; else return '" + hdfDesactivo.Value + "'; }";

                    this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScripKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" + oCampo.vcNom + "': 'Eliminado' });}", true);

                }
                else if (oCampo.inTipDat == 6)
                {
                    if (!string.IsNullOrEmpty(hdfCampBool.Value))
                    {
                        hdfCampBool.Value += ",";
                    }


                    hdfCampBool.Value += oCampo.vcNom;
                    hdfVerdadero.Value = oCampo.vcValVer;
                    hdfFalso.Value = oCampo.vcValFal;
                    //Columna = Columna & ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" & hdfVerdadero.Value & "'; else return '" & hdfFalso.Value & "'; }" 'formatter:'checkbox'"
                    Columna = Columna + ", formatter : function(value, options, rData){ if(value == 'True') return '" + hdfVerdadero.Value + "'; else return '" + hdfFalso.Value + "'; }";
                    //formatter:'checkbox'"
                    if (oCampo.vcNomAlias == "btVigEmp" & oEntidad.vcTab == "MOV_Linea")
                    {
                        Columna = Columna + ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" + hdfActivo.Value + "'; if(value == 'False') return '" + hdfDesactivo.Value + "' ; else return '" + "" + "'; }";
                    }
                    if (oCampo.vcNomAlias == "btVigEmp" & oEntidad.vcTab == "MOV_Dispositivo")
                    {
                        Columna = Columna + ", align: 'Center', formatter : function(value, options, rData){ if(value == 'True') return '" + hdfActivo.Value + "'; if(value == 'False') return '" + hdfDesactivo.Value + "' ; else return '" + "" + "'; }";
                    }

                    //formatter:'checkbox'"
                    this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey2", "function CambiarEstadoEliminado(id){$('#grid').jqGrid('setRowData', id, { '" + oCampo.vcNom + "': 'Eliminado' });}", true);
                    if (oCampo.ChAlign == "3")
                    {
                        Columna = Columna + ", align: 'Right'";
                    }
                    else if (oCampo.inTipDat == 2 || oCampo.inTipDat == 6)
                    {
                        Columna = Columna + ", align: 'Center'";
                    }
                    else
                    {
                        Columna = Columna + ", align: 'Left'";
                    }


                }
                else
                {
                    //Columna = Columna & ", align: 'Left'"
                    if (oCampo.ChAlign == "3")
                    {
                        Columna = Columna + ", align: 'Right'";
                    }
                    else if (oCampo.inTipDat == 2)
                    {
                        Columna = Columna + ", align: 'Center'";
                    }
                    else
                    {
                        Columna = Columna + ", align: 'Left'";
                    }
                }
                //nuevo alinear columna moneda
                if (oCampo.inTipDat == 4 | oCampo.inTipDat == 5)
                {
                    Columna = Columna + ", align: 'Right'";
                }
                else if (oCampo.inTipDat == 3)
                {
                    Columna = Columna + ", align: 'Right'";
                    //formatter:'currency', formatoptions:{decimalSeparator:",", thousandsSeparator: ",", decimalPlaces: 2, prefix: "$ "}
                    //formatter:'date', formatoptions: {newformat: 'm/d/Y'}
                    //datefmt: 'M d h:i'
                    //Columna = Columna & ", formatter:'date'" ',datefmt: 'M d h:i'"
                }
                Columna = Columna + " },";
            }

            Session["NomId" + "_" + oEntidad.vcTab] = IdPrim;

            Columna = Columna.Substring(0, Columna.Length - 1) + "]; ";

            string[] TamanoPaginaArray = oEntidad.vcTamPag.Split(',');

            if (!TamanoPaginaArray.Contains(oEntidad.inTamPag.ToString()))
            {
                oEntidad.inTamPag = int.Parse(TamanoPaginaArray[0]);
            }
            script = "var idTabla = '" + IdPrim + "'; " + Columna + "var titulo = '" + oEntidad.vcDes + "';" + "var TamanoPagina = '" + oEntidad.inTamPag.ToString() + "';" + "var TamanosPaginaSel = [" + oEntidad.vcTamPag + "];";

            this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);
        }
        #endregion

        #region configurarBusquedad
        private void ConfigurarBusqueda(List<ENT_ENT_Campo> lstCampo, ENT_ENT_Entidad oEntidad)
        {
            string selval = "";
            bool btEstado = false;
            ddlBusqueda.Items.Clear();
            foreach (ENT_ENT_Campo v_oCampo in lstCampo)
            {
                if (v_oCampo.btFil & v_oCampo.btVig)
                {
                    ListItem li = new ListItem();
                    li.Text = v_oCampo.vcDes;
                    li.Value = v_oCampo.vcNomAlias;
                    ddlBusqueda.Items.Add(li);
                    if (v_oCampo.btBusq)
                    {
                        selval = v_oCampo.vcNomAlias;
                    }
                }
            }
            //if (ddlBusqueda.Items.Count == 0 | !oEntidad.btBus)
            //{
            //    //btnBuscar.Visible = False 
            //    //tblFiltroBusqueda.Visible = False 'agregado 09-08-2013
            //    tblFiltro.Visible = false;
            //}

            if ((!string.IsNullOrEmpty(selval)))
            {
                ddlBusqueda.SelectedValue = selval;
            }
        }
        #endregion

        #region ConfigurarValoresPorDefecto
        private void ConfigurarValoresPorDefecto(List<ENT_ENT_Campo> lstCampo)
        {
            string strValorPorDefecto = "";
            foreach (ENT_ENT_Campo oCampo in lstCampo)
            {
                if (oCampo.btIdPri)
                {
                    strValorPorDefecto = "" + oCampo.vcValdef;
                }
            }
            hdfValorPorDefecto.Value = strValorPorDefecto;
        }
        #endregion

        #region eeListado_ObtenerDatosAExportar

        protected void eeListado_ObtenerDatosAExportar(PcSistelMovil2Web.Common.Controles.ExportarExcelGenerico.TipoExcel oTipoExcel)
        //protected void eeListado_ObtenerDatosAExportar(object sender, EventArgs e) 
        {

            string vcTab = Request.QueryString["Tabla"];
            string vcFiltro = HttpContext.Current.Session["vcFiltro_" + vcTab].ToString().Split('|')[0];
            string inFilReg = HttpContext.Current.Session["vcFiltro_" + vcTab].ToString().Split('|')[1];
            //int inTipOri = int.Parse(Request.QueryString["inTipOri"]);
            int inTipOri = 1;

            BL_ENT_Campo Campo = new BL_ENT_Campo();
            List<ENT_ENT_Campo> lstCampo = (List<ENT_ENT_Campo>)HttpContext.Current.Session["Campos" + "_" + vcTab];
            try
            {

                DataSet dsDetalle = Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, Convert.ToInt32(inFilReg)); //Campo.ListarDetalleBusqueda(vcTab, vcFiltro, lstCampo, inFilReg);
                //Campo.Dispose();   

                eeListado.ExportarDatos(dsDetalle.Tables[0], Session["DescripcionEntidad" + "_" + vcTab].ToString(), lstCampo);
            }
            catch
            {
            }
        }
        #endregion

        #region EliminarRegistro
        [WebMethod()]
        public static string EliminarRegistro(string Id, string vcPar, string vcTab, string inTipOri, string btTipLog)
        {
            //BL_GEN_TipoServicio ServicioTipo = null;
            //BL_MOV_Linea Linea = null;
            try
            {
                //ENT_SEG_Usuario oUsuario = new ENT_SEG_Usuario();
                BL_ENT_Campo Campo = new BL_ENT_Campo();
                //Dim TipoSolicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
                //Id = Id.Replace("&#39", "''")
                Id = Id.Replace(",", "").Replace(".", "");
                //If IsNumeric(Id) Then Id = CType(Val(Id), Long)

                List<string> IdArray = default(List<string>);

                bool flagOK = false;
                bool flagDep = false;
                bool flagElim = false;
                bool flagvalDef = false;
                string mensajeOK = "";
                string mensajeDep = "";
                string mensajeElim = "";
                string mensajevalDef = "";
                string mensaje = "";
                bool elim = true;

                mensaje = Campo.EliminarRegistroTablaAPR(vcTab, Id, vcPar);

                if (mensaje == "0")
                {
                    if (vcTab == "APR_TipoCobro") { return "Se Eliminó el registro de un Tipo de Cobro"; }
                    else if (vcTab == "APR_ConceptoCobro") { return "Se Eliminó el registro de un Concepto de Cobro"; }
                    else if (vcTab == "LIC_Licencia") { return "Se Eliminó el registro de una Licencia"; }
                    else { return "Se Desactivo el registro con ID " + Id + " de la tabla " + vcTab; }
                }
                else if (mensaje == "99")
                {
                    return "Se Eliminó el registro con ID " + Id + " de la tabla " + vcTab;
                }
                else if (mensaje == "-1")
                {
                    if (vcTab == "APR_TipoCobro") { return "No se puede eliminar el registro (<b><span style='color: red;'></span></b>) porque fue creado por una Licencia. </br> Comuníquese con el área de Sistemas"; }
                    else if (vcTab == "APR_ConceptoCobro") { return "No se puede eliminar el registro (<b><span style='color: red;'></span></b>) porque fue creado por una Licencia. </br> Comuníquese con el área de Sistemas"; }
                    else { return "No se puede eliminar el registro (<b><span style='color: red;'>" + Id + "</span></b>) porque fue creado por una solicitud. </br> Comuníquese con el área de Sistemas"; }
                }
                else
                {
                    return "No se puede eliminar el registro  porque tiene dependencias con las tablas </br>(<b><span style='color: red;'>" + mensaje + "</span></b>)";
                }





                if (elim == false)
                {
                    //mensaje = "No se puede eliminar los Tipo Servicios que esten expresados en 'min'."
                    mensaje = "No se puede eliminar, es registro de sistema";
                    return mensaje;
                }
                else
                {
                    if (!string.IsNullOrEmpty(Id))
                    {


                        //IdArray = Campo.EliminarRegistroTabla(vcTab, Id, vcPar);



                        //AUDITORIA:Ingresar las propiedades y cargar el componente Auditoria
                        //ProcesaAuditoria oAuditoria = new ProcesaAuditoria();
                        //DataTable dt = (DataTable)HttpContext.Current.Session["datos"];
                        //oAuditoria.strOpcion = "";
                        //oAuditoria.Tabla = vcTab; //Auditoria.Constantes.TableNames.Empleado;   
                        //oAuditoria.strProducto = (string)HttpContext.Current.Session["aProducto"];
                        //oAuditoria.strModulo = (string)HttpContext.Current.Session["aModulo"];
                        //oAuditoria.NombrePc = (string)HttpContext.Current.Session["aNombrePc"];


                        //oAuditoria.strNombreUsuario = dt.Rows[0]["USUA_vcNOMUSU"].ToString();


                        bool blEliminado = false;

                        foreach (string Codigo in IdArray)
                        {
                            blEliminado = false;
                            string[] ParMensaje = Codigo.Split('/');
                            if (ParMensaje[2] == "O")
                            {
                                blEliminado = true;
                                if (ParMensaje[0] != "0")
                                {
                                    flagOK = false;
                                    mensajeOK += "Se desactivaron (" + ParMensaje[0] + ") Registro(s) <br />(C&oacute;digo(s): <b><span style='color: red;'>" + ParMensaje[1] + "</span></b>) <br />";

                                    //AUDITORIA: Desactivacion de Registros

                                    //{
                                    //    oAuditoria.Audi_Tipo = "DESACTIVAR";
                                    //    oAuditoria.rmCadenas = "";
                                    //    string[] Id_Desactivado = ParMensaje[1].Split(';');
                                    //    foreach (string id_D in Id_Desactivado)
                                    //    {
                                    //        oAuditoria.EliminarAuditoria(new string[] { id_D.Trim() }, 1);
                                    //   
                                    //    }
                                    //}

                                }
                                else
                                {
                                    flagOK = true;
                                    mensajeOK += "Se desactivaron (" + ParMensaje[0] + ") Registro <br />";
                                }
                            }
                            if (ParMensaje[2] == "E")
                            {
                                blEliminado = true;
                                if (ParMensaje[0] != "0")
                                {
                                    flagElim = false;
                                    mensajeElim += "Se eliminaron " + ParMensaje[0] + " Registro(s) <br /> (C&oacute;digo(s): <b><span style='color: red;'>" + ParMensaje[1] + "</span></b>)";
                                    //AUDITORIA: Desactivacion de Registros

                                    //{
                                    //    oAuditoria.Audi_Tipo = "ELIMINAR";
                                    //    oAuditoria.rmCadenas = "";
                                    //    string[] Id_Desactivado = ParMensaje[1].Split(';');
                                    //    foreach (string id_D in Id_Desactivado)
                                    //    {
                                    //        oAuditoria.EliminarAuditoria(new string[] { id_D.Trim() }, 0);
                                    //        //string strAntes = "";
                                    //        //string strAntes = oAuditoria.AntesActualizar(new string[] { id_D.Trim() }); 
                                    //        //strAntes = oAuditoria.AntesActualizar(new string[] { id_D.Trim() }, true, int.Parse(inTipOri));
                                    //        //oAuditoria.DespuesActualizar(new string[] { Codigo }, strAntes);
                                    //        //oAuditoria.EliminarAuditoria(id_D.Trim(), strAntes, false, int.Parse(inTipOri));
                                    //    }
                                    //}

                                }
                                else
                                {
                                    flagElim = true;
                                    mensajeElim += "Se eliminaron " + ParMensaje[0] + " Registro";
                                }
                            }
                            if (ParMensaje[2] == "D")
                            {
                                if (string.IsNullOrEmpty(ParMensaje[1]))
                                {
                                    flagDep = true;
                                }
                                else
                                {
                                    flagDep = false;
                                    mensajeDep += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje[0] + "</span></b>) no fueron procesados porque tiene(n) dependencia(s) con: (<b>" + ParMensaje[1] + "</b>) ";
                                }
                                //End If
                            }

                            if (ParMensaje[2] == "V")
                            {
                                if (ParMensaje[0] == "0")
                                {
                                    flagvalDef = true;
                                }
                                else
                                {
                                    flagvalDef = false;
                                    mensajevalDef += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje[1] + "</span></b>) no pueden ser modificados por ser Valores del Sistema.";
                                }
                            }

                        }

                        if (flagOK == false && !string.IsNullOrEmpty(mensajeOK))
                        {
                            mensaje += "<li>" + mensajeOK + "</li><br />";
                        }
                        if (flagElim == false && !string.IsNullOrEmpty(mensajeElim))
                        {
                            mensaje += "<li>" + mensajeElim + "</li><br />";
                        }
                        if (flagDep == false && !string.IsNullOrEmpty(mensajeDep))
                        {
                            mensaje += "<li>" + mensajeDep + "</li><br />";
                        }
                        if (flagvalDef == false && !string.IsNullOrEmpty(mensajevalDef))
                        {
                            mensaje += "<li>" + mensajevalDef + "</li><br />";
                        }
                    }


                    return "<ul>" + mensaje + "</ul>";
                }
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
        }
        #endregion
        #region ActivarRegistros
        [WebMethod()]
        public static string ActivarRegistros(string Ids, string vcPar, string vcTab, string inTipOri, string activar)
        {
            try
            {
                BL_ENT_Campo Campo = new BL_ENT_Campo();
                List<string> IdArray = default(List<string>);

                bool flagOK = false;
                bool flagError = false;
                bool flagvalDef = false;
                bool flagValDep = false;
                string mensajeOK = "";
                string mensajeError = "";
                string mensajevalDef = "";
                string mensajeValDep = "";
                string mensaje = "";
                Ids = Ids.Replace("&#39", "''");

                Ids = Ids.Replace(",", "").Replace(".", "");
                if (IsNumeric(Ids))
                {
                    if (Ids.Trim().Length > 0)
                    {
                        if (Ids.Trim().Substring(0, 1) != "0")
                        {
                            Ids = Convert.ToInt32(Ids).ToString();
                        }
                    }
                }

                IdArray = Campo.ActivarRegistroTabla(vcTab, Ids, vcPar, Convert.ToBoolean(activar));

                foreach (string Codigo in IdArray)
                {
                    string[] ParMensaje = Codigo.Split('/');
                    if (ParMensaje[2] == "O")
                    {
                        if (ParMensaje[0] != "0")
                        {
                            flagOK = false;
                            mensajeOK += "Se activaron (" + ParMensaje[0] + ") Registro(s) <br />(<b><span style='color: red;'>" + ParMensaje[1] + "</span></b>) <br />";
                        }
                        else
                        {
                            flagOK = true;
                            mensajeOK += "Se activaron (" + ParMensaje[0] + ") Registro <br />";
                        }
                    }
                    if (ParMensaje[2] == "E")
                    {
                        if (ParMensaje[0] != "0")
                        {
                            flagError = false;
                            mensajeError += "Estos registros (<b><span style='color: red;'>" + ParMensaje[1] + "</span></b>) no fueron procesados";
                        }
                        else
                        {
                            flagError = true;
                            mensajeError += "Este registro (<b><span style='color: red;'>" + ParMensaje[1] + "</span></b>)  no fueron procesados";
                        }
                    }
                    if (ParMensaje[2] == "V")
                    {
                        if (ParMensaje[0] == "0")
                        {
                            flagvalDef = true;
                        }
                        else
                        {
                            flagvalDef = false;
                            mensajevalDef += "Esto(s) registro(s) (<b><span style='color: red;'>" + ParMensaje[1] + "</span></b>) no pueden ser modificados por ser Valores del Sistema.";
                        }
                    }
                    if (ParMensaje[2] == "D")
                    {
                        if (string.IsNullOrEmpty(ParMensaje[0]))
                        {
                            flagValDep = false;
                        }
                        else
                        {
                            flagValDep = true;
                            mensajeValDep += "Esto(s) registro(s) (<b><span style='color:red;'>" + ParMensaje[0] + "</span></b>) no fueron procesados por tener dependencia deshabilitada en (<b>" + ParMensaje[1] + "</b>).";
                        }
                    }


                    //if (vcTab.ToString.Trim.ToUpper() == "SEG_USUARIO" & !string.IsNullOrEmpty("" + ParMensaje(1)))
                    //{
                    //    //'ACTUALIZAR DATOS DE USUARIOS DE LA BASE DE DATOS "DATOS"
                    //    BL_SEG_Usuario oUsuarioDatos = null;
                    //    oUsuarioDatos = new BL_SEG_Usuario(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, 1);
                    //    string CodEli = ParMensaje(1).ToString();
                    //    List<string> CodEliArray = CodEli.Split(';').ToList();
                    //    foreach (string id_p in CodEliArray)
                    //    {
                    //        oUsuarioDatos.BajaUsuarioPorCodigo_Datos(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente, id_p, 2);
                    //    }
                    //    oUsuarioDatos.Dispose();
                    //}
                }

                if (flagOK == false)
                {
                    mensaje += "<li>" + mensajeOK + "</li><br />";
                }
                if (flagError == false)
                {
                    mensaje += "<li>" + mensajeError + "</li><br />";
                }
                if (flagvalDef == false)
                {
                    mensaje += "<li>" + mensajevalDef + "</li><br />";
                }
                if (flagValDep == true)
                {
                    mensaje += "<li>" + mensajeValDep + "</li><br />";
                }




                //if (vcTab.ToString().Trim().ToUpper() == "SEG_USUARIO")
                //{
                //    //'Dim oUsuarioBase As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente) 'CONEXION A BASE
                //    //'Dim oUsuarioDatos As BL_SEG_Usuario = New BL_SEG_Usuario(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente, 1) 'CONEXION A DATOS
                //    //'oUsuarioBase.GrabarUsuariosBDDatos(CType(HttpContext.Current.Session["Usuario"], ENT_SEG_Usuario).IdCliente, oUsuarioDatos.ObtenerNombreBDDatos())
                //    //'oUsuarioDatos.Dispose()
                //    //'oUsuarioBase.Dispose()
                //}

                return "<ul>" + mensaje + "</ul>";

                //Dim _return As String
                //If ds.Tables(0).Rows.Count > 0 Then
                //    _return = 1
                //Else
                //End If

                //Return ds.Tables(0).Rows(0)(0).ToString()
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
        }
        #endregion

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static UtilitarioWeb.JQGridJsonResponse Listar(string inPagTam, string inPagAct, string vcOrdCol, string vcTipOrdCol, string vcCam, string vcValBus, string vcTab, string inTipOri, string inFilReg)
        {
            try
            {

                BL_ENT_Campo Campo = new BL_ENT_Campo();
                List<ENT_ENT_Campo> lstCampo = (List<ENT_ENT_Campo>)HttpContext.Current.Session["Campos" + "_" + vcTab];
                string NomId = HttpContext.Current.Session["NomId" + "_" + vcTab].ToString();
                HttpContext.Current.Session["vcFiltro_" + vcTab] = vcCam + "," + vcValBus + "|" + inFilReg;


                if (flagBorrarString == false)
                {
                    for (int index = 0; index <= lstCampo.Count - 1; index += 1)
                    {

                        if (lstCampo[index].inTipDat == 7)
                        {
                            lstCampo[index].vcNom = lstCampo[index].vcNom.Substring(0, lstCampo[index].vcNom.Length - 3);
                            lstCampo[index].vcNomAlias = lstCampo[index].vcNomAlias.Substring(0, lstCampo[index].vcNomAlias.Length - 3);
                        }

                    }
                    flagBorrarString = true;
                }

                string nombreTabla = lstCampo[0].vcTab;
                //Filtros
                string strFiltros = FiltrosPorTablas(lstCampo[0].vcTab);
                DataSet dsDetalle = Campo.ListarDetallePaginadoBusqueda(int.Parse(inPagTam), int.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam, vcValBus, int.Parse(inFilReg),
                strFiltros);

                for (int index = 0; index <= dsDetalle.Tables[1].Columns.Count - 1; index += 1)
                {
                    if (dsDetalle.Tables[1].Columns[index].DataType.Name.ToString().Equals("Byte[]"))
                    {
                        dsDetalle.Tables[1].Columns.Add(dsDetalle.Tables[1].Columns[index].ColumnName + "Str", Type.GetType("System.String"));
                        int contadorFilas = 0;
                        foreach (DataRow fila in dsDetalle.Tables[1].Rows)
                        {
                            if (fila[index] != DBNull.Value)
                            {
                                string rutaLocal = ruta;
                                byte[] byIcon = new byte[fila[index].ToString().Length * sizeof(char)];
                                string rutaextra = byIcon.Length.ToString();
                                rutaLocal = rutaLocal + rutaextra + "_" + nombreTabla + "_" + fila[1].ToString() + ".ico";
                                FileStream fs = new FileStream(rutaLocal, FileMode.OpenOrCreate, FileAccess.Write);
                                fs.Write(byIcon, 0, byIcon.Length);
                                fs.Flush();
                                fs.Close();

                                dsDetalle.Tables[1].Rows[contadorFilas][dsDetalle.Tables[1].Columns.Count - 1] = "<img src='../Images/Temporal/" + rutaextra + "_" + nombreTabla + "_" + fila[1].ToString() + ".ico' height='35' width='35'/>";
                            }
                            contadorFilas += 1;
                        }
                        dsDetalle.Tables[1].Columns.RemoveAt(index);

                    }
                    else
                    {
                    }
                }

                return new UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["TotalPaginas"]), Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["PaginaActual"]), Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["TotalRegistros"]), dsDetalle.Tables[1], 1);
                //return new UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["TotalPaginas"]), Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["PaginaActual"]), Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["TotalRegistros"]), dsDetalle.Tables[1], 1);
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
        }

        #region FiltrosPorTablas
        private static string FiltrosPorTablas(string vcTab)
        {
            //ENT_SEG_Usuario oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session("Usuario");
            string _return = "";
            vcTab = "" + vcTab;
            //switch (vcTab.ToUpper())
            //{
            //    case "APR_PERFIL":
            //        _return = "(nombre='Administrador' or nombre='Implementador' or nombre='Operador')";
            //        break;
            //    case "APR_USUARIO":
            //        _return = "IdUsuario in(select IdUsuario from APR_PerfilUsuario where IdPerfil in(1,2,3))'";
            //        break;
            // }
            return _return;
        }
        #endregion


        public static Boolean IsNumeric(string valor)
        {
            int result;
            return int.TryParse(valor, out result);
        }

        [WebMethod]
        public static int GuardarTipoCobro(string oTipoCobro)
        {
            BL_AP_TipoCobro TipoCobro = new BL_AP_TipoCobro();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_TipoCobro V_oTipoCobro = oSerializer.Deserialize<ENT_AP_TipoCobro>(oTipoCobro);

                if (V_oTipoCobro.IdTipoCobro == 0)
                {
                    return TipoCobro.Insertar(V_oTipoCobro);
                }
                else
                {
                    return TipoCobro.Actualizar(V_oTipoCobro);
                }

                return 0;
            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (TipoCobro != null) TipoCobro.Dispose();
            }
        }

        [WebMethod]
        public static int GuardarConceptoCobro(string oConceptoCobro)
        {
            BL_AP_ConceptoCobro ConceptoCobro = new BL_AP_ConceptoCobro();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_ConceptoCobro V_oConceptoCobro = oSerializer.Deserialize<ENT_AP_ConceptoCobro>(oConceptoCobro);


                if (V_oConceptoCobro.IdConceptoCobro == 0)
                {

                    return ConceptoCobro.Insertar(V_oConceptoCobro);
                }
                else
                {
                    return ConceptoCobro.Actualizar(V_oConceptoCobro);
                }

                return 0;
            }
            catch (Exception)
            {
                return 1;
                throw;
            }
            finally
            {
                if (ConceptoCobro != null) ConceptoCobro.Dispose();
            }
        }


        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ENT_AP_Producto> ListarProductos()
        {
            BL_AP_Producto Producto = new BL_AP_Producto();
            List<ENT_AP_Producto> lstProducto = new List<ENT_AP_Producto>();
            lstProducto = Producto.Listar();
            try
            {
                return lstProducto;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PCSISTEL75");
                throw new Exception();
            }
            finally
            {
                if (Producto != null) Producto.Dispose();
            }
        }
    }
}