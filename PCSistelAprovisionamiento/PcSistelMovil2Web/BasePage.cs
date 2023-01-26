using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Globalization;
using System.Web.UI.HtmlControls;
using System.Text;
using System.Web.UI.WebControls;
using System.Diagnostics;
using System.Web.UI;
using System.Data;
using System.Threading;

namespace Web
{
    public class BasePage : System.Web.UI.Page
    {

        public BasePage() { }
        override protected void OnInit(EventArgs e)
        {
            base.OnInit(e);
            if (Session["datos"] == null)
            {
                Response.Redirect("login.aspx");
                return;
            }

            GeneralNotificacion.AgregarJS(Server, this.Header, "Scripts/Utilitario.js");

            HiddenField hdJsonNotificacion = new HiddenField();
            hdJsonNotificacion.ID = "hdJsonNotificacion";
            this.Form.Controls.Add(hdJsonNotificacion);

            StringBuilder sbFuncion = new StringBuilder();
            sbFuncion.Append("function fnFuncionNotificacionErr(Error,Metodo,Detalle) {");
            sbFuncion.Append("$('#hdJsonNotificacion').val(\"{'Fecha':'" + DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss") +
                 "','Producto':'PCSistel 7.5','Modulo':'Consulta Web','Error':'\" + Error + \"'" +
                 ",'Pagina':'\" + location.pathname.substring(location.pathname.lastIndexOf(\"/\") + 1) + \"'" +
                 ",'Detalle':'\" + Detalle + \"'" +
                 ",'Metodo':'\" + Metodo + \"'}\");");
            sbFuncion.Append("window.parent.fnMostrarVentana(window);");
            sbFuncion.Append("}");

            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "FuncionNotificacionErr", sbFuncion.ToString(), true);
        }


        override protected void OnLoadComplete(EventArgs e)
        {
            base.OnLoadComplete(e);

            //Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "NotificacionXXXX", "$(document).ready(function () { }); ", true);

        }

        public static string fnObtenerFechaFormateada(DateTime dt)
        {
            string strFormatoFecha = fnObtenerFormatoFecha();
            return string.Format("{0:" + strFormatoFecha + "}", dt);
        }

        public static string fnObtenerFormatoFecha()
        {
            string strFormato = "";
            try
            {
                strFormato = ConfigurationManager.AppSettings["FormatoFecha"].ToString();
            }
            catch
            {
            }

            if (strFormato.Trim() == "")
                strFormato = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;

            return strFormato;

        }


        //private BLL.BLLFormatoFecha objFormatoFecha = new BLL.BLLFormatoFecha();
        public int longitudCortaDecimales = int.Parse(ConfigurationManager.AppSettings["LongitudCortaDec"]);
        public int longitudLargaDecimales = int.Parse(ConfigurationManager.AppSettings["LongitudLargaDec"]);

        /// <summary>
        /// Método que obtiene el formato de fecha de la base de datos y corrige el 
        /// formato para que funcione de forma optima en las paginas donde se utilice.
        /// Autor: Mauricio Gonzalo Benavides Loli
        /// </summary>
        /// <returns>formatoFecha as String</returns>
        /// <remarks></remarks>
        public string obtenerSESIONFormatoFecha()
        {
            //string formatoFecha = BLL.BLLFormatoFecha.GetInstance().obtenerFormatoFecha();
            string formatoFecha = "";
            formatoFecha = formatoFecha.Replace("m", "MM");
            formatoFecha = formatoFecha.Replace("a", "y");
            return formatoFecha;
        }

        public string obtenerFormatoFecha()
        {
            return Session["strFormatoFecha"].ToString();
        }

        public string obtenerSESIONFormatoFechaConHora()
        {
            //string formatoFecha = BLL.BLLFormatoFecha.GetInstance().obtenerFormatoFecha();
            string formatoFecha = "";
            formatoFecha = formatoFecha.Replace("m", "MM");
            formatoFecha = formatoFecha.Replace("a", "y");
            formatoFecha = formatoFecha + " " + ConfigurationManager.AppSettings["formatoHora"];
            return formatoFecha;
        }

        public string obtenerFormatoFechaConHora()
        {
            return Session["strFormatoFechaConHora"].ToString();
        }

        public string culturaSESIONActualizadaConDecimales(int tipoLongitud = 1)
        {
            string strSimDec = ".";
            string strSepMil = ",";
            string strFormato = string.Empty;

            DataTable dtCultura = (DataTable)Session["dtCultura"];
            Thread.CurrentThread.CurrentCulture = new CultureInfo(dtCultura.Rows[0]["PAIS_vcCultura"].ToString());
            //System.Globalization.CultureInfo culturaModificada = System.Globalization.CultureInfo.CreateSpecificCulture(System.Globalization.CultureInfo.CurrentCulture.Name);
            //int numeroDecimales = BLL.BLLFormatoFecha.GetInstance().obtenerTipoLongitudDecimales(tipoLongitud);
            int numeroDecimales = 0;

            if (dtCultura.Rows[0]["REGI_vcSimboloDecimal"].ToString() != string.Empty)
                strSimDec = dtCultura.Rows[0]["REGI_vcSimboloDecimal"].ToString();
            if (dtCultura.Rows[0]["REGI_vcSeparadorMiles"].ToString() != string.Empty)
                strSepMil = dtCultura.Rows[0]["REGI_vcSeparadorMiles"].ToString();

            Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalDigits = numeroDecimales;
            Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = strSimDec;
            Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = strSepMil;

            strFormato = "###" + strSepMil + "##0" + strSimDec; //"###,##0."

            for (int i = 0; i < numeroDecimales; i++)
            {
                strFormato = strFormato + "0";
            }

            return strFormato;
        }

        public string culturaActualizadaConDecimales(int tipoLongitud = 1)
        {
            return Session["inicioFormatoDec"].ToString();
        }

        public DataTable culturaSESION()
        {
            //DataTable dtCultura = new BLL.BLLLogin().getEmpresa();
            DataTable dtCultura = new DataTable();
            return dtCultura;
        }

        public DataTable cultura(int tipoLongitud = 1)
        {
            return (DataTable)Session["dtCultura"];
        }

        public double Formatea0rNumero(string strCantidad, int tipoLongitud = 1)
        {
            string strSimDec = ".";
            string strSepMil = ",";

            DataTable dtCultura = (DataTable)Session["dtCultura"];

            System.Globalization.CultureInfo culturaModificada = System.Globalization.CultureInfo.GetCultureInfo(dtCultura.Rows[0]["PAIS_vcCultura"].ToString());

            int numeroDecimales = Convert.ToInt32(Session["NumDecimales"].ToString());

            if (dtCultura.Rows[0]["REGI_vcSimboloDecimal"].ToString() != string.Empty)
                strSimDec = dtCultura.Rows[0]["REGI_vcSimboloDecimal"].ToString();
            if (dtCultura.Rows[0]["REGI_vcSeparadorMiles"].ToString() != string.Empty)
                strSepMil = dtCultura.Rows[0]["REGI_vcSeparadorMiles"].ToString();

            culturaModificada.NumberFormat.NumberDecimalDigits = numeroDecimales;

            return double.Parse(strCantidad, culturaModificada);
        }


        /// <summary>
        /// Método que permite actualizar la cultura actual de acuerdo a la cultura configurada en la base de datos para el cliente específico.
        /// Autor: Mauricio Gonzalo Benavides Loli
        /// </summary>
        /// <remarks></remarks>
        public static void ActualizarCultura()
        {
            //string cultura = BLL.BLLFormatoFecha.GetInstance().obtenerCultura();
            string cultura = "";
            Thread.CurrentThread.CurrentCulture = System.Globalization.CultureInfo.GetCultureInfo(cultura);
            Thread.CurrentThread.CurrentUICulture = System.Globalization.CultureInfo.GetCultureInfo(cultura);
        }







    }


    public class GeneralNotificacion
    {

        public GeneralNotificacion() { }

        public static void MostrarVentanaExceptionCliente(Page page, Exception ex)
        {

            //Inyectar codigo...
            string Detalle = ex.StackTrace.ToString();
            Detalle = Detalle.Replace("\"", "'").Trim();
            Detalle = Detalle.Replace("\\", "\\\\");

            //Get a StackTrace object for the exception
            StackTrace st = new StackTrace(ex, true);
            StackFrame frame = st.GetFrame(0);

            //Obtiene el nombre del archivo...
            //string fileName = frame.GetFileName();
            string fileName = page.AppRelativeVirtualPath;
            fileName = fileName.Replace("\"", "'").Replace("\\", "\\\\").Trim();
            //Obtiene el nombre del metodo...
            string methodName = frame.GetMethod().Name;
            methodName = methodName.Replace("\"", "'").Replace("\\", "\\\\").Trim();

            //Obtiene el numero de linea...
            int line = frame.GetFileLineNumber();
            //Obtiene el numero de columna...
            int col = frame.GetFileColumnNumber();

            string Mensaje = ex.Message + " (Fila: " + line.ToString() + ", Columna: " + col.ToString() + ")";
            Mensaje = Mensaje.Replace("\"", "'").Replace("\\", "\\\\").Trim();

            string strJson = "{\"Fecha\":\"" + String.Format("{0:dd/MM/yyyy hh:mm:ss}", DateTime.Now) + "\",\"Producto\":\"PCSistel 8.0\",\"Modulo\":\"Consulta Web\",\"Error\":\"" + Mensaje + "\",\"Pagina\":\"" + fileName + "\",\"Detalle\":\"" + Detalle + "\",\"Metodo\":\"" + methodName + "\"}";
            ((HiddenField)page.FindControl("hdJsonNotificacion")).Value = strJson;

            //page.ClientScript.RegisterClientScriptBlock(page.GetType(), "error", "var Intervalo = setInterval('fnMostrarVentana()',100);", true);

            page.ClientScript.RegisterClientScriptBlock(page.GetType(), "error", "$(document).ready(function () { window.parent.fnMostrarVentana(window); }); ", true);

        }

        public static void AgregarJS(HttpServerUtility Server, HtmlHead head, string vcJS)
        {
            HtmlGenericControl script = new HtmlGenericControl("script");
            script.Attributes.Add("type", "text/javascript");

            //~/Aplicacion/Modulo/
            script.Attributes.Add("src", ObtenerRutaActualJS(head, vcJS));
            //head.Controls.Add(script);
            head.Controls.AddAt(0, script); //para agregarlo al inicio.
            //js.Attributes["type"] = "text/javascript";
            //js.Attributes["href"] = vcJS; // "~/Common/Scripts/knockout-2.0.0.js";
            //head.Controls.Add(js);
        }

        public static void AgregarTema(HtmlHead head, String vcTem)
        {
            HtmlLink css = new HtmlLink();
            css.Attributes["type"] = "text/css";
            css.Attributes["rel"] = "stylesheet";
            css.Attributes["href"] = vcTem; //"~/Common/Scripts/knockout-2.0.0.js";
            head.Controls.Add(css);
        }

        public static string ObtenerRutaActualJS(HtmlHead head, string vcJS)
        {
            string _return = vcJS;
            if (head.AppRelativeTemplateSourceDirectory.Contains("/") == true)
            {
                _return = "";
                int Cantidad = head.AppRelativeTemplateSourceDirectory.Split('/').Length - 2;
                for (int x = 0; x < Cantidad; x++)
                {
                    _return += "../";
                }
                _return += vcJS;
            }
            return _return;
        }

        public static string ObtenerRutaInicial(HtmlHead head)
        {
            string _return = "";
            if (head.AppRelativeTemplateSourceDirectory.Contains("/") == true)
            {
                _return = "";
                int Cantidad = head.AppRelativeTemplateSourceDirectory.Split('/').Length - 2;
                for (int x = 0; x < Cantidad; x++)
                {
                    _return += "../";
                }
            }
            return _return;
        }

        public static string EsquemaNotificacion(HtmlHead head)
        {
            StringBuilder sbNotificacion = new StringBuilder();
            sbNotificacion.Append("<div id=\"msg1\"  style='z-index:1000 !important;position:absolute;'  >");
            sbNotificacion.Append(" <div id=\"modal\">");
            sbNotificacion.Append("   <div class=\"modaltop\">");
            sbNotificacion.Append("     <div class=\"modaltitle\">Notificación de Error</div>");
            sbNotificacion.Append("     <span id=\"closebutton\" style=\"cursor: hand\">");
            sbNotificacion.Append("       <img alt=\"Hide Popup\" src=\"" + ObtenerRutaInicial(head) + "styles/img/close_vista.gif\" border=\"0\" />");
            sbNotificacion.Append("     </span>");
            sbNotificacion.Append("   </div>");


            sbNotificacion.Append("   <div id=\"Detalle\" >");
            sbNotificacion.Append("     <div id=\"DetalleBody\"   style=\"display:block;width:348px;height:150px;\" >");
            sbNotificacion.Append("       <textarea id=\"lblDetalle\" readonly=\"readonly\" style=\"font-size:11px;background-color:#F8FAFB;width:348px;height:140px;\"></textarea>");
            sbNotificacion.Append("     </div>");
            sbNotificacion.Append("     <div align=\"right\"><a href=\"#\" onclick=\"fnMostrarErrorOriginal();\" >Ver mensaje original... </a></div>");
            sbNotificacion.Append("   </div>");

            sbNotificacion.Append("   <div id=\"Cuerpo\" class=\"modalbody\">");
            sbNotificacion.Append("     <table border=\"0\" style=\"width:325px;\">");
            sbNotificacion.Append("       <tr>");
            sbNotificacion.Append("         <td class=\"cabeceraerror\"> ");
            sbNotificacion.Append("           Fecha:");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("         <td class=\"detalleerror\" > ");
            sbNotificacion.Append("           <span id=\"lblFecha\"></span>");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("       </tr>");
            sbNotificacion.Append("       <tr>");
            sbNotificacion.Append("         <td class=\"cabeceraerror\"> ");
            sbNotificacion.Append("           Producto:");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("         <td class=\"detalleerror\"> ");
            sbNotificacion.Append("           <span id=\"lblProducto\"></span>");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("       </tr>");
            sbNotificacion.Append("       <tr>");
            sbNotificacion.Append("         <td class=\"cabeceraerror\"> ");
            sbNotificacion.Append("           Modulo:");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("         <td class=\"detalleerror\"> ");
            sbNotificacion.Append("           <span id=\"lblModulo\"></span>");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("       </tr>");
            sbNotificacion.Append("       <tr>");
            sbNotificacion.Append("         <td class=\"cabeceraerror\"> ");
            sbNotificacion.Append("           Página:");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("         <td class=\"detalleerror\"> ");
            sbNotificacion.Append("           <span id=\"lblPagina\"></span>");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("       </tr>");
            sbNotificacion.Append("       <tr>");
            sbNotificacion.Append("         <td class=\"cabeceraerror\"> ");
            sbNotificacion.Append("           Método:");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("         <td class=\"detalleerror\"> ");
            sbNotificacion.Append("           <span id=\"lblMetodo\"></span>");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("       </tr>");
            sbNotificacion.Append("       <tr>");
            sbNotificacion.Append("         <td class=\"cabeceraerror\"> ");
            sbNotificacion.Append("           Error:");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("         <td class=\"detalleerror\"> ");
            sbNotificacion.Append("           <span id=\"lblError\" style=\"color:#681101;\"></span>");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("       </tr>");
            sbNotificacion.Append("       <tr>");
            sbNotificacion.Append("         <td class=\"cabeceraerror\"> ");
            sbNotificacion.Append("           Detalle:");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("         <td class=\"detalleerror\"> ");
            sbNotificacion.Append("           <a href=\"#\" onclick=\"fnMostrarDetalleError();\" >Ver detalle... </a>");
            sbNotificacion.Append("         </td>");
            sbNotificacion.Append("       </tr>");
            sbNotificacion.Append("     </table>");
            sbNotificacion.Append("   </div>");
            sbNotificacion.Append(" </div>");
            sbNotificacion.Append("</div>");
            sbNotificacion.Append("");
            sbNotificacion.Append("");
            sbNotificacion.Append("");
            sbNotificacion.Append("");
            sbNotificacion.Append("");

            return sbNotificacion.ToString();

        }

    }


}