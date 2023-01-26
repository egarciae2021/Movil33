using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Utilitarios;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
//using VisualSoft.PCSistel.General.BE;
using System.Text;
using ClosedXML.Excel;
using System.Diagnostics;
using Web.GeneralMantenimiento;

namespace PcSistelMovil2Web.Common.Controles
{
    public partial class ExportarExcelGenerico : System.Web.UI.UserControl
    {


        #region "propiedades"
        private DataTable _dtDatos;
        public DataTable Datos
        {
            get { return _dtDatos; }
            set { _dtDatos = value; }
        }

        private TipoExcel _TipoExcel;
        public TipoExcel oTipoExcel
        {
            get { return _TipoExcel; }
            set { _TipoExcel = value; }
        }

        private bool _ExcelPredeterminado = false;
        public bool ExcelPredeterminado
        {
            get { return _ExcelPredeterminado; }
            set { _ExcelPredeterminado = value; }
        }

        private bool _OcultarDiseno = false;
        public bool OcultarDiseno
        {
            get { return _OcultarDiseno; }
            set { _OcultarDiseno = value; }
        }

        //private ENT_MOV_IMP_Criterio _Criterio;
        //public ENT_MOV_IMP_Criterio Criterio
        //{
        //    get { return _Criterio; }
        //    set { _Criterio = value; }
        //}

        private string _Llave = "";
        #endregion



        public event ObtenerDatosAExportarCriterioEventHandler ObtenerDatosAExportarCriterio;
        public delegate void ObtenerDatosAExportarCriterioEventHandler(TipoExcel oTipoExcel, string llave);

        public event ObtenerDatosAExportarEventHandler ObtenerDatosAExportar;
        public delegate void ObtenerDatosAExportarEventHandler(TipoExcel oTipoExcel);


        public enum TipoExcel
        {
            Excel2003oInferior = 0,
            Excel2007oSuperior = 1
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                //if ((Session["Usuario"] == null)) {

                if ((Session["datos"] == null))
                {
                    Response.BufferOutput = true;
                    string script = "window.top.location.reload();";
                    this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);
                    return;
                }
                else
                {
                    string ExportarExcelGenerico = Request.QueryString["eeg"];
                    string ExcelPredeterminado = Request.QueryString["epre"];
                    if (ExportarExcelGenerico != null && !string.IsNullOrEmpty(ExportarExcelGenerico))
                    {
                        if (ExcelPredeterminado == null)
                            ExcelPredeterminado = "";
                        if (ExcelPredeterminado == "1")
                            _ExcelPredeterminado = true;
                        if (ExportarExcelGenerico == "XLS")
                        {
                            _TipoExcel = TipoExcel.Excel2003oInferior;
                        }
                        else
                        {
                            _TipoExcel = TipoExcel.Excel2007oSuperior;
                        }

                        if (Request.QueryString["miCri"] != null)
                        {
                            _Llave = Request.QueryString["miCri"];
                            if (ObtenerDatosAExportarCriterio != null)
                            {
                                ObtenerDatosAExportarCriterio(_TipoExcel, Request.QueryString["miCri"]);
                            }
                        }
                        else
                        {
                            if (ObtenerDatosAExportar != null)
                            {
                                ObtenerDatosAExportar(_TipoExcel);
                            }
                        }

                        

                    }

                    if (!IsPostBack)
                    {
                        ConfigurarInicio();
                        ConfiguraObjetosJavaScript();
                    }
                    //UtilitarioWeb.AgregarTema(Server, Page.Header, ((ENT_SEG_Usuario)Session["Usuario"]).CaracteristicaUsuario.vcTem);
                    //UtilitarioWeb.AgregarScriptJqueryUI(Server, Page.Header, ((ENT_SEG_Usuario)Session["Usuario"]).CaracteristicaUsuario.vcTem);


                }
            }
            catch (Exception ex)
            {
               
            }
        }

        public void ExportarDatos(DataTable dtDatos, string NombreHoja = "")
        {
            if (dtDatos == null)
                return;
            if (string.IsNullOrEmpty(NombreHoja))
                NombreHoja = dtDatos.TableName;

            //Actualizar Valor Predeterminado...
            GuardarValorPredterminado();

            if (_TipoExcel == TipoExcel.Excel2003oInferior)
            {
                //UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja, lstCampo, false);
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja);
            }
            else
            {
                //UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja, lstCampo, true);
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja);
            }
        }

        public void ExportarDatos(DataTable dtDatos, string NombreHoja = "", List<ENT_ENT_Campo> lstCampo = null)
        {
            if (dtDatos == null)
                return;
            if (string.IsNullOrEmpty(NombreHoja))
                NombreHoja = dtDatos.TableName;

            //Actualizar Valor Predeterminado...
            GuardarValorPredterminado();

            if (_TipoExcel == TipoExcel.Excel2003oInferior)
            {
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja, lstCampo, false);
            }
            else
            {
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja, lstCampo, true);
            }
        }

        public void ExportarDatosPersonalizados(DataTable dtDatos, string NombreHoja = "")
        {
            if (dtDatos == null)
                return;
            if (string.IsNullOrEmpty(NombreHoja))
                NombreHoja = dtDatos.TableName;

            //Actualizar Valor Predeterminado...
            GuardarValorPredterminado();

            if (_TipoExcel == TipoExcel.Excel2003oInferior)
            {
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcel(dtDatos, NombreHoja);
            }
            else
            {
                UtilitarioWeb.ExportarExcel.ExportDataTableToExcelXLWorkbook(dtDatos, NombreHoja);
            }
        }


        private void GuardarValorPredterminado()
        {
            ////BL_SEG_Usuario Usuario = null;
            //try {

            //    if (_ExcelPredeterminado) {
            //        ENT_SEG_Usuario oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];
            //        Usuario = new BL_SEG_Usuario(oUsuario.IdCliente);

            //        string strExcelPredefinido = "";
            //        string vcTem = ((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).CaracteristicaUsuario.vcTem;

            //        if (_TipoExcel == TipoExcel.Excel2003oInferior) {
            //            strExcelPredefinido = "XLS";
            //        } else if (_TipoExcel == TipoExcel.Excel2007oSuperior) {
            //            strExcelPredefinido = "XLSX";
            //        } else {
            //            strExcelPredefinido = "";
            //        }

            //        oUsuario.CaracteristicaUsuario.vcTem = vcTem;
            //        Usuario.ActualizarTema(vcTem, oUsuario.P_inCod, strExcelPredefinido);

            //        HttpContext.Current.Session["Usuario"] = oUsuario;

            //    }

            //} catch (Exception ex) {
            //    Utilitarios util = new Utilitarios();
            //    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session["Usuario"]);
            //    throw new Exception(UtilitarioWeb.MensajeError);
            //} finally {
            //    if (Usuario != null) {
            //        Usuario.Dispose();
            //    }
            //}
        }

        #region "Genera Scripts Cliente"

        private void ConfigurarInicio()
        {
            string script = null;
            //string strExcelPredeterminado = ((ENT_SEG_Usuario)Session["Usuario"]).CaracteristicaUsuario.vcExcelPorDefecto;
            string strExcelPredeterminado = "";
            script = "var _ExcelPredeterminado = '" + strExcelPredeterminado + "';";
            this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKeyInicio_" + this.ClientID, script, true);
        }

        private void ConfiguraObjetosJavaScript()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("$(document).ready(function () {");

            if (_OcultarDiseno)
            {
                sbScript.AppendLine("   $('#" + tbExportarExcelPrincipal.ClientID + "').hide();");
            }

            sbScript.AppendLine("   $('.btnButton').button();");
            sbScript.AppendLine("   $('input').removeClass('ui-helper-hidden-accessible'); ");
            sbScript.AppendLine("   $('label').removeClass(); ");
            sbScript.AppendLine("   $('label','.exportarexcel').unbind(); ");
            sbScript.AppendLine("   $('input','.exportarexcel').unbind(); ");
            sbScript.AppendLine("   $('span','.exportarexcel').unbind(); ");

            sbScript.Append(ObtieneScript_btnAceptar_Click());
            sbScript.Append(ObtieneScript_btnCancelar_Click());
            sbScript.AppendLine(ObtieneScript_btnExportarExcel_Click());

            //if (_Criterio == null) {
            //    sbScript.AppendLine("   $('#" + btnExportarExcel.ClientID + "').attr('criterio' , '" + _Llave + "'); ");
            //} else {
            //    sbScript.AppendLine("   $('#" + btnExportarExcel.ClientID + "').attr('criterio' , '" + _Criterio.vcNomTab.ToString + "|" + _Criterio.inNumCri.ToString + "'); ");
            //}



            sbScript.AppendLine("});");

            sbScript.AppendLine(ObtieneScript_ExportarExcelXLSX());
            sbScript.AppendLine(ObtieneScript_ExportarExcelXLS());
            sbScript.AppendLine(ObtieneScript_function_btnExportarExcel_Click());

            this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey_ExcelConfiguraObjetosJavaScript_" + this.ClientID, sbScript.ToString(), true);

        }

        private string ObtieneScript_btnAceptar_Click()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("$('#" + btnAceptar.ClientID + "').live('click', function () { ");
            sbScript.AppendLine("   var XLSXSeleccionado = $('#" + optExcelXlsx.ClientID + "').is(':checked')");
            //sbScript.AppendLine("   alert(XLSXSeleccionado);")
            sbScript.AppendLine("   if (XLSXSeleccionado == true){");
            sbScript.AppendLine("       ExportarExcelXLSX_" + this.ClientID + "();");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("   else{");
            sbScript.AppendLine("       ExportarExcelXLS_" + this.ClientID + "();");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("   $('#" + dvExportarExcelGenerico.ClientID + "').dialog('close');");
            sbScript.AppendLine("});");
            return sbScript.ToString();
        }

        private string ObtieneScript_ExportarExcelXLSX()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("function ExportarExcelXLSX_" + this.ClientID + "(){");
            sbScript.AppendLine("   var blPredeterminado = $('#" + chkExcelPredeterminado.ClientID + "').is(':checked');");
            sbScript.AppendLine("   var Predeterminado=0;");
            sbScript.AppendLine("   if (blPredeterminado==true){_ExcelPredeterminado = 'XLSX';Predeterminado=1;}");
            //sbScript.AppendLine("   alert(window.location.href + '&eeg=XLSX&epre=' +Predeterminado);")
            sbScript.AppendLine("   if (window.location.href.indexOf('Con_Llamada.aspx') >= 0 || window.location.href.indexOf('Con_Sumario.aspx') >= 0){ ");
            sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ");
            sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLSX&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("       else{");
            sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLSX&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("   else{");
            sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ");
            sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLSX&epre=' +Predeterminado;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("       else{");
            sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLSX&epre=' +Predeterminado;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("}");
            return sbScript.ToString();
        }

        private string ObtieneScript_ExportarExcelXLS()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("function ExportarExcelXLS_" + this.ClientID + "(){");
            sbScript.AppendLine("   var blPredeterminado = $('#" + chkExcelPredeterminado.ClientID + "').is(':checked');");
            sbScript.AppendLine("   var Predeterminado=0;");
            sbScript.AppendLine("   if (blPredeterminado==true){ _ExcelPredeterminado = 'XLS';Predeterminado=1;}");
            //sbScript.AppendLine("   alert(window.location.href + '&eeg=XLS&epre=' +Predeterminado);")
            sbScript.AppendLine("   if (window.location.href.indexOf('Con_Llamada.aspx') >= 0 || window.location.href.indexOf('Con_Sumario.aspx') >= 0){ ");
            sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ");
            sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLS&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("       else{");
            sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLS&epre=' +Predeterminado +'&miCri='+ $('#" + btnExportarExcel.ClientID + "').attr('criterio')  ;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("   else{");
            sbScript.AppendLine("       if (window.location.href.indexOf('?') >= 0){ ");
            sbScript.AppendLine("           window.location.href = window.location.href + '&eeg=XLS&epre=' +Predeterminado;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("       else{");
            sbScript.AppendLine("           window.location.href = window.location.href + '?eeg=XLS&epre=' +Predeterminado;");
            sbScript.AppendLine("       }");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("}");
            return sbScript.ToString();
        }

        private string ObtieneScript_dvExportarExcel_dialog()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("var Titulo = 'Exportar a Excel';");
            sbScript.AppendLine("$('#" + dvExportarExcelGenerico.ClientID + "').dialog({");
            sbScript.AppendLine("   width: 250,");
            sbScript.AppendLine("   height: 160,");
            sbScript.AppendLine("   title: Titulo,");
            sbScript.AppendLine("   modal: true");
            sbScript.AppendLine("});");
            return sbScript.ToString();
        }

        private string ObtieneScript_function_btnExportarExcel_Click()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("function btnExportarExcel_" + this.ClientID + "(){");
            sbScript.AppendLine("   $('#" + btnExportarExcel.ClientID + "').click();");
            sbScript.AppendLine("}");
            return sbScript.ToString();
        }

        private string ObtieneScript_btnCancelar_Click()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("$('#" + btnCancelar.ClientID + "').live('click', function () {");
            sbScript.AppendLine("   $('#" + dvExportarExcelGenerico.ClientID + "').dialog('close');");
            sbScript.AppendLine("});");
            return sbScript.ToString();
        }

        private string ObtieneScript_btnExportarExcel_Click()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("$('#" + btnExportarExcel.ClientID + "').live('click', function () {");
            sbScript.AppendLine("   $('input[name=" + optExcelXls.ClientID.Split('$')[0] + "$optExportarExcel][value=optExcelXlsx]').attr('checked', 'checked');");
            sbScript.AppendLine("   $('#" + chkExcelPredeterminado.ClientID + "').attr('checked', false);");

            //Valida si esta el valor por defecto...
            sbScript.AppendLine("   if ( _ExcelPredeterminado == 'XLSX') {");
            sbScript.AppendLine("       ExportarExcelXLSX_" + this.ClientID + "();");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("   else");
            sbScript.AppendLine("   if ( _ExcelPredeterminado == 'XLS') {");
            sbScript.AppendLine("       ExportarExcelXLS_" + this.ClientID + "();");
            sbScript.AppendLine("   }");
            sbScript.AppendLine("   else {");
            sbScript.AppendLine(ObtieneScript_dvExportarExcel_dialog());
            sbScript.AppendLine("   }");
            sbScript.AppendLine("});");
            return sbScript.ToString();
        }


        #endregion

    }
}