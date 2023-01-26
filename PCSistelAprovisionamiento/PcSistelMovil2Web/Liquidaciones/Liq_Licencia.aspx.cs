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
using Web.GeneralMantenimiento;
using System.IO;

namespace PcSistelMovil2Web.Liquidaciones
{
    public partial class Liq_Licencia : System.Web.UI.Page
    {
        static bool flagBorrarString = true;
        static string ruta = string.Empty;
        public int contadorGeneral = 1;

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
                try
                {

                    string vcTab = "SP"; //Request.QueryString["Tabla"];
                    //string vcTab = "Dom_Pais"; //Request.QueryString["Tabla"];

                    BL_ENT_Campo Campo = new BL_ENT_Campo();
                    BL_ENT_Entidad Entidad = new BL_ENT_Entidad();
                    ENT_ENT_Entidad oEntidad = new ENT_ENT_Entidad();

                    List<ENT_ENT_Campo> lstCampo = new List<ENT_ENT_Campo>();

                    string P_inCod = Request.QueryString["Cod"];

                    //lstCampo = Campo.Listar(vcTab, 0);
                    lstCampo = Campo.ListarCamposStoreProcedure(Convert.ToInt32(P_inCod));
                    
                    
                    oEntidad = Entidad.Mostrar(vcTab);

                    if (vcTab == "SP")
                    { 
                        oEntidad.vcTab = vcTab;
                        oEntidad.vcTamPag = "10,20,30";
                    }

                    hdfvcTab.Value = vcTab;
                                     
                    ENT_AP_Licencia oLicencia = new ENT_AP_Licencia();
                    oLicencia.IdLicencia = 0;

                    if (Request.QueryString["Cod"] != null)
                    {
                        BL_AP_Licencia Licencia = new BL_AP_Licencia();

                        hdfIdLicencia.Value = P_inCod;                                      
                        oLicencia.IdLicencia = Convert.ToInt32(P_inCod);
                        DataSet ds = Licencia.Mostrar(oLicencia.IdLicencia);                        
                        
                        oLicencia.Nombre = ds.Tables[0].Rows[0]["Nombre"].ToString();
                        txtLicencia.Text = oLicencia.Nombre;                        
                    }
                    else
                    {
                        hdfIdLicencia.Value = "0";
                    }
                    CargarJSONPerfilAcceso(oLicencia.IdLicencia);


                    Session["Campos" + "_" + vcTab] = lstCampo;
                    Session["DescripcionEntidad" + "_" + vcTab] = oEntidad.vcDes;
                    //btnAgregar.Attributes["Url"] = oEntidad.vcURLMan;
                    //btnEditar.Attributes["Url"] = oEntidad.vcURLMan;

                    ConfigurarGrid(lstCampo, oEntidad);
                    ConfigurarBusqueda(lstCampo, oEntidad);
                    ConfigurarValoresPorDefecto(lstCampo);

                }
                catch (Exception ex)
                {
                    ClaseUtilitarios util = new ClaseUtilitarios();
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                    throw new Exception();
                }
            }
        }

        

        Dictionary<int, int> ObtenerContadoresColumnasDinamicas()
        {
            Dictionary<int, int> Miscontadores = new Dictionary<int, int>();
                                               
            BL_AP_TipoCobro TipoCobro = new BL_AP_TipoCobro();
            Miscontadores = TipoCobro.ListContadores();
                       
            return Miscontadores;
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

            int contadorfila = 1;
            int contadorcolumna = 1;
           
            int contavariable = 1;
            Dictionary<int, int> contadoresgenerales = new Dictionary<int, int>();
            contadoresgenerales = ObtenerContadoresColumnasDinamicas();
            string valor = string.Empty;            
            
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
                    //Columna = Columna + ", formatter : function(value, options, rData){ if(value == 0) return \"<input type='checkbox' id='chkactivo_" + contadorfila + "' class='chkTipoCobro' /> \"; else return \"<input type='checkbox' id='chkactivo_" + contadorfila + "' class='chkTipoCobro' checked /> \"; }";

                    /*
                    if (oCampo.inOrd != contadordecolumna[oCampo.vcDes])
                    {
                        contadordecolumna.Add(oCampo.vcDes, oCampo.inOrd);
                    }                     
                    */
                    

                    /*
                    // 1 11 14
                    string valor = "11";
                    if (contavariable == 0)
                    {
                        valor = "1";                        
                    }
                    else if (contavariable == 1)
                    {
                        valor = "11";
                    }

                    else if (contavariable == 2)
                    {
                        valor = "14";
                    }
                    */

                    valor = contadoresgenerales[contavariable].ToString();

                    Columna = Columna + ", formatter : function(value, options, rData){ if(value == 0) return \"<input type='checkbox' id='chktc-" + (oCampo.inOrd - 6) + "' class='chkTipoCobro' value = " + valor + " /> \"; else return \"<input type='checkbox' id='chktc-" + (oCampo.inOrd - 6) + "' class='chkTipoCobro' value = " + valor + " checked /> \"; }";
                    contadorcolumna++;
                    contavariable++;

                    //List<int> cont = new List<int>();                    


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
                
                contadorfila++;
                contadorGeneral++;
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
            //ddlBusqueda.Items.Clear();
            foreach (ENT_ENT_Campo v_oCampo in lstCampo)
            {
                if (v_oCampo.btFil & v_oCampo.btVig)
                {
                    ListItem li = new ListItem();
                    li.Text = v_oCampo.vcDes;
                    li.Value = v_oCampo.vcNomAlias;
                    //ddlBusqueda.Items.Add(li);
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

        public void CargarJSONPerfilAcceso(int lnCodLicencia)
        {
            ENT_AP_Licencia LicenciaE = new ENT_AP_Licencia();
            LicenciaE.IdLicencia = lnCodLicencia;

            BL_AP_Licencia Licencia = new BL_AP_Licencia();
            List<ENT_ProductoTree> lstProductos = new List<ENT_ProductoTree>();
            StringBuilder sbDatos = new StringBuilder();            

            lstProductos = Licencia.ObtenerTodosProductos(LicenciaE);
            sbDatos.AppendLine("var DatosTreeGridAccesos;");
            sbDatos.AppendLine("DatosTreeGridAccesos = \"{ 'total': '1', 'page': '1', 'records': '" + lstProductos.Count + "', 'rows': [\" +");

            int i = 0;
            string strComa = ",";

            foreach (ENT_ProductoTree Producto in lstProductos)
            {
                string esPadre = "false";
                if ((Producto.inNumNod == 0))
                {
                    esPadre = "true";
                }
                i = i + 1;
                if (i >= lstProductos.Count)
                    strComa = "";
                //sbDatos.AppendLine("""{'id': '" & Producto.Codigo & "', 'cell':  ['" & Producto.OrdenGrilla & "', '" & Producto.Descripcion & "', '" & Producto.IsSelected & "', '" & Producto.inNivel & "', '" & Producto.inPadre & "', '" & Producto.Codigo & "', '" & Producto.inNumNod & "', '" & Producto.inNumNodSelect & "', '" & Producto.inNivel & "', '" & (Producto.inNivel - 1) & "-" & Producto.inPadre & "', '" & esPadre & "', 'false', 'true'] }" & strComa & """ +")
                sbDatos.AppendLine("\"{'id': '" + Producto.Codigo + "', 'cell':  ['" + Producto.OrdenGrilla + "', '" + Producto.IsSelected + "', '" + Producto.Descripcion + "', '" + Producto.inNivel + "', '" + Producto.inPadre + "', '" + Producto.Codigo + "', '" + Producto.inNumNod + "', '" + Producto.inNumNodSelect + "', '" + Producto.lstCodNod + "', '" + Producto.esAdmLista + "', '" + Producto.btIns + "', '" + Producto.btAct + "', '" + Producto.btEli + "', '" + Producto.btExp + "', '" + Producto.btImp + "', '" + Producto.inNivel + "', '" + (Producto.inNivel - 1) + "-" + Producto.inPadre + "', '" + esPadre + "', 'false', 'true'] }" + strComa + "\" +");
            }

            //sbDatos.AppendLine("""]}"";");
            sbDatos.AppendLine("\"]}\";");

            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "ScriptDatosTreGrid1", sbDatos.ToString(), true);

        }

        [WebMethod]
        public static int Guardar(string oLicencia, string XML_Modulo, string XML_ConceptoCobro, int prIdTemporizador)
        {
            BL_AP_Licencia Licencia = new BL_AP_Licencia();
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            int resultado;

            try
            {
                ENT_AP_Licencia V_oLicencia = oSerializer.Deserialize<ENT_AP_Licencia>(oLicencia);


                if (V_oLicencia.IdLicencia == 0)
                {

                    return Licencia.Insertar(V_oLicencia, XML_Modulo, XML_ConceptoCobro);
                }
                else
                {
                    return Licencia.Actualizar(V_oLicencia, XML_Modulo, XML_ConceptoCobro);
                }

                return 0;
            }
            catch (Exception)
            {
                return 1;
                throw;
            }

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static UtilitarioWeb.JQGridJsonResponse Listar(string inPagTam, string inPagAct, string vcOrdCol, string vcTipOrdCol, string vcCam, string vcValBus, string vcTab, string inTipOri, string inFilReg, string p_codLicencia)
        {
            
            try
            {

                BL_ENT_Campo Campo = new BL_ENT_Campo();
                List<ENT_ENT_Campo> lstCampo = (List<ENT_ENT_Campo>)HttpContext.Current.Session["Campos" + "_" + vcTab];
                string NomId = "";
                
                NomId = HttpContext.Current.Session["NomId" + "_" + vcTab].ToString();
                HttpContext.Current.Session["vcFiltro_"] = vcCam + "," + vcValBus + "|" + inFilReg;              

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
                //DataSet dsDetalle = Campo.ListarDetallePaginadoBusqueda(int.Parse(inPagTam), int.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam, vcValBus, int.Parse(inFilReg),
                //strFiltros);

                DataSet dsDetalle = new DataSet(); ;

                if (vcTab != "SP")
                {
                    dsDetalle = Campo.ListarDetallePaginadoBusqueda(int.Parse(inPagTam), int.Parse(inPagAct), vcOrdCol, vcTipOrdCol, vcTab, lstCampo, NomId, vcCam, vcValBus, int.Parse(inFilReg), strFiltros);
                }
                else
                {
                    dsDetalle = Campo.ListarDetallePaginadoBusquedaSP(int.Parse(inPagTam), int.Parse(inPagAct), Convert.ToInt32(p_codLicencia));                    
                }

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

                return new UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables[2].Rows[0]["TotalPaginas"]), Convert.ToInt32(dsDetalle.Tables[2].Rows[0]["PaginaActual"]), Convert.ToInt32(dsDetalle.Tables[2].Rows[0]["TotalRegistros"]), dsDetalle.Tables[0], 1);
                //return new UtilitarioWeb.JQGridJsonResponse(Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["TotalPaginas"]), Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["PaginaActual"]), Convert.ToInt32(dsDetalle.Tables[0].Rows[0]["TotalRegistros"]), dsDetalle.Tables[1], 1);
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
        }

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


    }
}