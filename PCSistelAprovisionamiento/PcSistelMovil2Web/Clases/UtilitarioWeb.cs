using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.VisualBasic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net.Mail;
using VisualSoft.Comun.Utilitarios;
using Utilitarios;
using System.Xml.Serialization;
using System.Net;
using System.Threading;
using System.Globalization;
using System.Collections;
using System.Diagnostics;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
//using VisualSoft.PCSistel.General.BE;
using ClosedXML.Excel;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Web.UI;
using System.ComponentModel;
using System.Reflection;
using System.Text;
using System.Configuration;

namespace Web.GeneralMantenimiento
{
    public struct LicenciaWeb
    {
        public int CantidadDispositivos;
        public string TipoLicencia;
        public int DiasDemo;
        public string FechaInicioDemo;
    }

    public static class UtilitarioWeb
    {
        public static string MensajeError = "Error en la acción realizada, comuníquese con el área de sistemas";

        public class JQGridItem
        {
            public JQGridItem()
            {
            }
            #region "Passive attributes"
            private string _id;
            #endregion
            private List<string> _row;
            #region "Properties"
            /// <summary>
            /// RowId de la fila.
            /// </summary>
            public string ID
            {
                get { return _id; }
                set
                {
                    if (_id == value)
                    {
                        return;
                    }
                    _id = value;
                }
            }

            /// <summary>
            /// Fila del JQGrid.
            /// </summary>
            public List<string> Row
            {
                get { return _row; }

                set { _row = value; }
            }

            #endregion
            #region "Active Attributes"
            /// <summary>
            /// Contructor.
            /// </summary>
            public JQGridItem(string pId, List<string> pRow)
            {
                _id = pId;
                _row = pRow;
            }
            #endregion
        }

        public class JQGridJsonResponse
        {
            public JQGridJsonResponse()
            {
            }
            #region "Passive attributes."
            private int _totalPaginas;
            private int _paginaActual;
            private int _totalRegistros;
            #endregion
            private List<JQGridItem> _items;
            #region "Properties"
            /// <summary>
            /// Cantidad de páginas del JQGrid.
            /// </summary>
            public int TotalPaginas
            {
                get { return _totalPaginas; }
                set
                {
                    if (_totalPaginas == value)
                    {
                        return;
                    }
                    _totalPaginas = value;
                }
            }
            /// <summary>
            /// Página actual del JQGrid.
            /// </summary>
            public int PaginaActual
            {
                get { return _paginaActual; }
                set
                {
                    if (_paginaActual == value)
                    {
                        return;
                    }
                    _paginaActual = value;
                }
            }
            /// <summary>
            /// Cantidad total de elementos de la lista.
            /// </summary>
            public int TotalRegistros
            {
                get { return _totalRegistros; }
                set
                {
                    if (_totalRegistros == value)
                    {
                        return;
                    }
                    _totalRegistros = value;
                }
            }
            /// <summary>
            /// Lista de elementos del JQGrid.
            /// </summary>
            public List<JQGridItem> Items
            {
                get { return _items; }
                set { _items = value; }
            }
            #endregion
            #region "Active attributes"
            /// <summary>
            /// Constructor.
            /// </summary>
            /// <param name="dtDetalle">Lista de elementos a mostrar en el JQGrid</param>
            public JQGridJsonResponse(int p_TotalPaginas, int p_PaginaActual, int p_TotalRegistros, DataTable dtDetalle, int inId)
            {
                _totalPaginas = p_TotalPaginas;
                _paginaActual = p_PaginaActual;
                _totalRegistros = p_TotalRegistros;
                _items = new List<JQGridItem>();
                if (dtDetalle != null)
                {
                    foreach (DataRow dr in dtDetalle.Rows)
                    {
                        string campo = dr[1].ToString();
                        if (campo == "-1") continue;
                        List<string> lstCampo = new List<string>();
                        string ValId = "";
                        int contReg = 1;

                        foreach (object obj in dr.ItemArray)
                        {

                            if (contReg > 1)
                            {
                                lstCampo.Add(obj.ToString());
                            }
                            if (contReg == inId)
                            {
                                ValId = obj.ToString();
                            }
                            contReg = contReg + 1;
                        }
                        _items.Add(new JQGridItem(ValId, lstCampo));
                    }
                }
            }
            #endregion
        }

        public static string NombreSistemaMovil = "PCSistel_Aprovisionamiento";
        public static string NombreSistemaHotel = "PCSISTEL_HOTELERO";

        public static string ObtieneVersionArchivoEstatico(string RutaWeb)
        {
            string rutaArchivo = HttpContext.Current.Server.MapPath(RutaWeb);
            string versionArchivo = string.Empty;
            if (File.Exists(rutaArchivo))
            {
                versionArchivo = "?v=" + new FileInfo(rutaArchivo).LastWriteTime.ToString("yyyyMMddhhmmss");
            }
            return RutaWeb + versionArchivo;
        }

        public static string ObtienePublicacionSignalR(string RutaWeb)
        {
            string RutaArchivo = ConfigurationManager.AppSettings["pathSignalRPCSistel"].ToString();
            if (!RutaArchivo.EndsWith(@"\"))
                RutaArchivo += @"\";
            return RutaArchivo + RutaWeb;
        }

        public static void ConfigurarColumnasServicios(int offset, int propiedadesServicio, DataTable dt, string vcValIli, ref List<object> colmodel)
        {
            int contCol = 1;
            int Ancho = 0;

            string[] OpcionesEdicionCantidad = new string[3];
            string[] OpcionesEdicionIlimitado = new string[2];

            OpcionesEdicionIlimitado[0] = vcValIli;
            OpcionesEdicionCantidad[0] = "10";
            //size
            OpcionesEdicionCantidad[1] = "4";
            //maxlength

            for (int i = offset; i <= dt.Columns.Count - 1; i++)
            {
                if (contCol == propiedadesServicio)
                {
                    contCol = 0;
                    string[] lstPalabras = dt.Rows[1][i].ToString().Split(' ');
                    Ancho = 0;
                    foreach (string palabra in lstPalabras)
                    {
                        if (Ancho < palabra.Length)
                        {
                            Ancho = palabra.Length;
                        }
                    }
                    OpcionesEdicionCantidad[0] = Ancho.ToString();
                    //size
                    Ancho *= 9;
                    if (dt.Rows[2][i].ToString() == "0")
                    {
                        colmodel.Add(JQGrid.Columna(dt.Rows[0][i].ToString(), dt.Rows[1][i].ToString(), false, true, Ancho, true, false, "integer", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad));
                    }
                    else
                    {
                        colmodel.Add(JQGrid.Columna(dt.Rows[0][i].ToString(), dt.Rows[1][i].ToString(), false, true, Ancho, true, false, "", JQGrid.FormatoEdicion.Check, OpcionesEdicionIlimitado));
                    }
                }
                else
                {
                    //Ancho = dt.Rows(0).Item(i).Length * 8;
                    Ancho = dt.Rows[0][i].ToString().Length * 8;
                    colmodel.Add(JQGrid.Columna(dt.Rows[0][i].ToString(), dt.Rows[0][i].ToString(), true, true, Ancho, false, false, ""));
                }
                contCol += 1;
            }
        }

        //public static string fnDetectaSerieAdicional()
        //{
        //    string strIps = fnObtenerIP();
        //    //string strIDCliente = My.Computer.Name.ToUpper + "&" + strIps;    
        //    //return strIDCliente;
        //    return null;

        //}

        private static string fnObtenerIP()
        {
            string host = Dns.GetHostName();
            IPHostEntry ip = (IPHostEntry)Dns.GetHostEntry(host);
            string strIps = "";
            for (int x = 0; x <= ip.AddressList.Length - 1; x++)
            {
                if (ip.AddressList[x].ToString().Contains("."))
                {
                    strIps += ";" + ip.AddressList[x].ToString();
                }
            }
            if (strIps.Trim().Length > 0)
                strIps = strIps.Substring(1);
            return strIps;

        }

        //me saltie 0.o
        public static void Dataddl(DropDownList ddl, object Datos, string Texto, string Valor)
        {
            ddl.DataSource = Datos;
            ddl.DataTextField = Texto;
            ddl.DataValueField = Valor;
            ddl.DataBind();
        }

        public static void DataLst(ListBox lst, object Datos, string Texto, string Valor)
        {
            lst.DataSource = Datos;
            lst.DataTextField = Texto;
            lst.DataValueField = Valor;
            lst.DataBind();
        }

        public static string fnValidarRutaHttp(string strRuta)
        {
            if (strRuta != null)
            {
                string _return = strRuta.Replace("//", "/");
                if (_return.ToLower().Contains("http"))
                {
                    _return = _return.Replace("http:/", "http://");
                }
                return _return;
            }
            else
            {
                return "";
            }
        }

        public static void AgregarScriptJqueryUI(HttpServerUtility Server, HtmlHead head, string vcTem)
        {

            try
            {
                bool AgregarJQGrid = true;
                bool AgregarUI = true;
                bool AgregarJSON2 = true;
                bool AgregarJQUERY = true;

                string strRaiz = ObtieneRaizSistema();

                foreach (Control tagHeader in head.Controls)
                {
                    if (tagHeader is HtmlLink)
                    {
                        if (((HtmlLink)tagHeader).Href.ToLower().Contains("jqgrid"))
                        {
                            AgregarJQGrid = false;
                        }
                    }
                    else if (tagHeader is LiteralControl)
                    {
                        if (((LiteralControl)tagHeader).Text.ToLower().Contains("jqgrid"))
                        {
                            AgregarJQGrid = false;
                        }
                        if (((LiteralControl)tagHeader).Text.ToLower().Contains("jquery-ui") | ((LiteralControl)tagHeader).Text.ToLower().Contains("jqueryui"))
                        {
                            AgregarUI = false;
                        }
                        if (((LiteralControl)tagHeader).Text.ToLower().Contains("json2.js"))
                        {
                            AgregarJSON2 = false;
                        }
                        if (((LiteralControl)tagHeader).Text.ToLower().Contains("jquery-1.7.2.js"))
                        {
                            AgregarJQUERY = false;
                        }
                    }
                }

                if (AgregarJSON2)
                {
                    CargarScript(head, "Common/Scripts/json2.js");
                }
                if (AgregarJQUERY)
                {
                    CargarScript(head, "Common/Scripts/jquery-1.7.2.js");
                }
                if (AgregarJQGrid)
                {
                    CargarCSS(head, "~/Common/Styles/jqGrid/ui.jqgrid.css");
                    CargarScript(head, "Common/Scripts/jqGrid/i18n/grid.locale-es.js");
                    CargarScript(head, "Common/Scripts/jqGrid/jquery.jqGrid.min.js");
                    CargarScript(head, "Common/Scripts/jqGrid/plugins/jquery.tablednd.js");
                }
                if (AgregarUI)
                {
                    CargarScript(head, "Common/Scripts/JqueryUI/jquery-ui.js");
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private static void CargarCSS(HtmlHead head, string ruta)
        {
            HtmlLink cssPrincipal = new HtmlLink();
            cssPrincipal.Attributes["type"] = "text/css";
            cssPrincipal.Attributes["href"] = ruta;
            cssPrincipal.Attributes["rel"] = "stylesheet";
            head.Controls.Add(cssPrincipal);
        }

        //private static void CargarScript(HtmlHead head, string ruta)
        //{
        //    string strRaiz = ObtieneRaizSistema();
        //    string rutaJs = "";
        //    HtmlGenericControl js = default(HtmlGenericControl);
        //    rutaJs = fnValidarRutaHttp(strRaiz + ruta);
        //    js = new HtmlGenericControl("script");
        //
        //    js.Attributes["type"] = "text/javascript";
        //    js.Attributes["src"] = rutaJs;
        //    head.Controls.Add(js);
        //}

        public static string Right(this string value, int length)
        {
            if (String.IsNullOrEmpty(value)) return string.Empty;

            return value.Length <= length ? value : value.Substring(value.Length - length);
        }

        //public static string ObtieneRaizSistema()
        //{
        //    string _return = "";
        //    //Dim _host As String = HttpContext.Current.Request.Url.Host
        //    //Dim _Authority As String = HttpContext.Current.Request.Url.Authority
        //    string _ApplicationPath = HttpContext.Current.Request.ApplicationPath;
        //    string strPathAndQuery = HttpContext.Current.Request.Url.PathAndQuery;
        //    string strUrl = HttpContext.Current.Request.Url.AbsoluteUri.Replace(strPathAndQuery, "/");
        //    _return = strUrl + _ApplicationPath;
        //    if (Right(_return, 1) != "/")
        //        _return = _return + "/";
        //    _return = _return.Replace("//", "/");
        //    _return = _return.Replace("http:/", "http://");
        //    return _return;
        //}


        public static string ObtieneRaizSistema()
        {
            string _return = "";
            //Dim _host As String = HttpContext.Current.Request.Url.Host
            //Dim _Authority As String = HttpContext.Current.Request.Url.Authority
            string _ApplicationPath = HttpContext.Current.Request.ApplicationPath;
            string strPathAndQuery = HttpContext.Current.Request.Url.PathAndQuery;
            string strUrl = HttpContext.Current.Request.Url.AbsoluteUri.Replace(strPathAndQuery, "/");
            _return = strUrl + _ApplicationPath;
            //if (Strings.Right(_return, 1) != "/")
            if (_return.Substring(_return.Length - 1, 1) != "/")
                _return = _return + "/";
            _return = _return.Replace("//", "/");
            _return = _return.Replace("http:/", "http://");
            return _return;
        }

        private static void CargarScript(HtmlHead head, string ruta)
        {
            string strRaiz = ObtieneRaizSistema();
            string rutaJs = "";
            HtmlGenericControl js = default(HtmlGenericControl);
            rutaJs = fnValidarRutaHttp(strRaiz + ruta);
            js = new HtmlGenericControl("script");
            js.Attributes["type"] = "text/javascript";
            js.Attributes["src"] = rutaJs;
            head.Controls.Add(js);
        }

        public class OpcionesSeguridad
        {
            public class Opciones
            {
                private static bool _ActivoInsertar;
                private static bool _ActivoActualizar;
                private static bool _ActivoEliminar;
                private static bool _ActivoAccion;
                private static bool _ActivoExportar;
                private static bool _ActivoImportar;
                public static bool ActivoInsertar
                {
                    get { return _ActivoInsertar; }
                    set { _ActivoInsertar = value; }
                }
                public static bool ActivoActualizar
                {
                    get { return _ActivoActualizar; }
                    set { _ActivoActualizar = value; }
                }
                public static bool ActivoEliminar
                {
                    get { return _ActivoEliminar; }
                    set { _ActivoEliminar = value; }
                }
                public static bool ActivoAccion
                {
                    get { return _ActivoAccion; }
                    set { _ActivoAccion = value; }
                }
                public static bool ActivoExportar
                {
                    get { return _ActivoExportar; }
                    set { _ActivoExportar = value; }
                }
                public static bool ActivoImportar
                {
                    get { return _ActivoImportar; }
                    set { _ActivoImportar = value; }
                }
            }

            public static void ObtenerValores()
            {
                Opciones.ActivoInsertar = false;
                Opciones.ActivoActualizar = false;
                Opciones.ActivoEliminar = false;
                Opciones.ActivoAccion = false;
                Opciones.ActivoAccion = false;
                Opciones.ActivoExportar = false;
                Opciones.ActivoImportar = false;

                //foreach (ENT_SEG_Perfil oPerfil in lstPerfil) {
                Opciones.ActivoInsertar = Opciones.ActivoInsertar;// | oPerfil.btIns;
                Opciones.ActivoActualizar = Opciones.ActivoActualizar;// | oPerfil.btAct;
                Opciones.ActivoEliminar = Opciones.ActivoEliminar;// | oPerfil.btEli;
                Opciones.ActivoExportar = Opciones.ActivoExportar;// | oPerfil.btExp;
                Opciones.ActivoImportar = Opciones.ActivoImportar;// | oPerfil.btImp;
                //}
                Opciones.ActivoAccion = Opciones.ActivoInsertar | Opciones.ActivoActualizar | Opciones.ActivoEliminar;
            }
        }

        public class ExportarExcel
        {
            public static void ExportDataTableToExcel(DataTable table, string name)
            {
                string attachment = "attachment; filename=" + name + ".xls";
                string vbTab = "\t";

                HttpContext context = HttpContext.Current;

                context.Response.ClearContent();
                context.Response.AddHeader("content-disposition", attachment);
                context.Response.ContentType = "application/vnd.ms-excel";

                string tab = "";

                context.Response.ContentEncoding = Encoding.Default;
                context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>");
                context.Response.Write(System.Environment.NewLine);

                context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>");
                context.Response.Write(System.Environment.NewLine + vbTab + vbTab);

                //If lstCampo Is Nothing Then
                //    For Each col As DataColumn In table.Columns
                //        context.Response.Write("<td style='background-color: #66CCFF;'>")
                //        context.Response.Write(col.ColumnName)
                //        context.Response.Write("</td>")
                //    Next
                //Else
                //    For Each oCampo As ENT_ENT_Campo In lstCampo
                //        context.Response.Write("<td style='background-color: #66CCFF;'>")
                //        context.Response.Write(oCampo.vcDes)
                //        context.Response.Write("</td>")
                //    Next
                //End If

                foreach (DataColumn col in table.Columns)
                {
                    context.Response.Write("<td style='background-color: #66CCFF;'>");
                    context.Response.Write(col.ColumnName);
                    context.Response.Write("</td>");
                }

                context.Response.Write(System.Environment.NewLine);
                context.Response.Write(vbTab + "</tr>");
                context.Response.Write(System.Environment.NewLine);

                foreach (DataRow dr in table.Rows)
                {
                    context.Response.Write(vbTab + "<tr>");
                    context.Response.Write(System.Environment.NewLine + vbTab + vbTab);
                    for (int i = 0; i <= table.Columns.Count - 1; i++)
                    {
                        bool cont = false;
                        string ValVer = "";
                        string ValFal = "";

                        if ((cont == true))
                        {
                            if ((string.IsNullOrEmpty(ValVer.ToString()) & string.IsNullOrEmpty(ValFal.ToString())))
                            {
                                context.Response.Write("<td " + (dr[i].ToString() == "False" ? "style='color: Red;'" : "") + ">&nbsp;");
                                context.Response.Write((dr[i].ToString() == "True" ? "Activo" : "Baja"));
                                context.Response.Write("</td>");
                            }
                            else
                            {
                                context.Response.Write("<td " + (dr[i].ToString() == "False" ? "style='color: Red;'" : "") + ">&nbsp;");
                                context.Response.Write((dr[i].ToString() == "True" ? ValVer : ValFal));
                                context.Response.Write("</td>");
                            }
                        }
                        else
                        {
                            context.Response.Write("<td>&nbsp;");
                            context.Response.Write(dr[i].ToString());
                            context.Response.Write("</td>");
                        }
                    }
                    context.Response.Write(System.Environment.NewLine);
                    context.Response.Write(vbTab + "</tr>");
                    context.Response.Write(System.Environment.NewLine);
                }

                context.Response.Write("</table>");
                try
                {
                    //context.Response.End();
                    context.Response.Flush();
                    context.Response.Close();
                    //HttpContext.Current.ApplicationInstance.CompleteRequest()
                }
                catch (ThreadAbortException ex1)
                {
                    //Thread.ResetAbort()
                    //context.Response.End();
                    context.Response.Flush();
                    context.Response.Close();
                }
                catch (Exception ex)
                {
                }
            }

            public static void ExportDataTableToExcel(DataTable table, string name, List<ENT_ENT_Campo> lstCampo)
            {
                string attachment = "attachment; filename=" + name + ".xls";
                string vbTab = "\t";

                HttpContext context = HttpContext.Current;

                context.Response.ClearContent();
                context.Response.AddHeader("content-disposition", attachment);
                context.Response.ContentType = "application/vnd.ms-excel";

                string tab = "";

                context.Response.ContentEncoding = Encoding.Default;
                context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>");
                context.Response.Write(System.Environment.NewLine);

                context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>");
                context.Response.Write(System.Environment.NewLine + vbTab + vbTab);

                //If lstCampo Is Nothing Then
                //    For Each col As DataColumn In table.Columns
                //        context.Response.Write("<td style='background-color: #66CCFF;'>")
                //        context.Response.Write(col.ColumnName)
                //        context.Response.Write("</td>")
                //    Next
                //Else
                //    For Each oCampo As ENT_ENT_Campo In lstCampo
                //        context.Response.Write("<td style='background-color: #66CCFF;'>")
                //        context.Response.Write(oCampo.vcDes)
                //        context.Response.Write("</td>")
                //    Next
                //End If

                foreach (DataColumn col in table.Columns)
                {
                    context.Response.Write("<td style='background-color: #66CCFF;'>");
                    context.Response.Write(col.ColumnName);
                    context.Response.Write("</td>");
                }

                context.Response.Write(System.Environment.NewLine);
                context.Response.Write(vbTab + "</tr>");
                context.Response.Write(System.Environment.NewLine);

                foreach (DataRow dr in table.Rows)
                {
                    context.Response.Write(vbTab + "<tr>");
                    context.Response.Write(System.Environment.NewLine + vbTab + vbTab);
                    for (int i = 0; i <= table.Columns.Count - 1; i++)
                    {
                        bool cont = false;
                        string ValVer = "";
                        string ValFal = "";

                        if (lstCampo != null)
                        {
                            foreach (ENT_ENT_Campo oCampo in lstCampo)
                            {
                                if ((table.Columns[i].ToString() == oCampo.vcNom & oCampo.inTipDat == 6))
                                {
                                    ValVer = oCampo.vcValVer.ToString();
                                    ValFal = oCampo.vcValFal.ToString();
                                    cont = true;
                                    break; // TODO: might not be correct. Was : Exit For
                                }
                            }
                        }

                        if ((cont == true))
                        {
                            if ((string.IsNullOrEmpty(ValVer.ToString()) & string.IsNullOrEmpty(ValFal.ToString())))
                            {
                                context.Response.Write("<td " + (dr[i].ToString() == "False" ? "style='color: Red;'" : "") + ">&nbsp;");
                                context.Response.Write((dr[i].ToString() == "True" ? "Activo" : "Baja"));
                                context.Response.Write("</td>");
                            }
                            else
                            {
                                context.Response.Write("<td " + (dr[i].ToString() == "False" ? "style='color: Red;'" : "") + ">&nbsp;");
                                context.Response.Write((dr[i].ToString() == "True" ? ValVer : ValFal));
                                context.Response.Write("</td>");
                            }
                        }
                        else
                        {
                            context.Response.Write("<td>&nbsp;");
                            context.Response.Write(dr[i].ToString());
                            context.Response.Write("</td>");
                        }
                    }
                    context.Response.Write(System.Environment.NewLine);
                    context.Response.Write(vbTab + "</tr>");
                    context.Response.Write(System.Environment.NewLine);
                }

                context.Response.Write("</table>");
                try
                {
                    //context.Response.End();
                    context.Response.Flush();
                    context.Response.Close();
                    //HttpContext.Current.ApplicationInstance.CompleteRequest()
                }
                catch (ThreadAbortException ex1)
                {
                    //Thread.ResetAbort()
                    //context.Response.End();
                    context.Response.Flush();
                    context.Response.Close();
                }
                catch (Exception ex)
                {
                }
            }

            public static void ExportDataTableToExcel(DataTable table, string name, List<ENT_ENT_Campo> lstCampo, bool blXLWorkbook)
            {
                table = ProcesaFormatoDataTableExportar(table, lstCampo);
                if (blXLWorkbook)
                {
                    ExportDataTableToExcelXLWorkbook(table, name);
                }
                else
                {
                    ExportDataTableToExcel(table, name, lstCampo);
                }
            }

            private static DataTable ProcesaFormatoDataTableExportar(DataTable table, List<ENT_ENT_Campo> _lstCampo)
            {

                DataTable _return = null;


                try
                {

                    if (_lstCampo != null)
                    {
                        //lstCampo.Sort()

                        List<ENT_ENT_Campo> lstCampo = _lstCampo.OrderBy(o => o.inOrd).ToList();
                        try
                        {
                            //Reubicar columnas...
                            Int32 x = 0;
                            foreach (ENT_ENT_Campo oCampo in lstCampo)
                            {
                                oCampo.inOrd = x;
                                x = x + 1;
                            }
                        }
                        catch
                        {
                        }

                        //_lstCampo.Item(0).
                        try
                        {
                            //Renombrar y ordenar columnas...
                            foreach (ENT_ENT_Campo oCampo in lstCampo)
                            {
                                if (table.Columns.Contains(oCampo.vcNomAlias))
                                {
                                    table.Columns[oCampo.vcNomAlias].SetOrdinal(oCampo.inOrd);
                                    table.Columns[oCampo.vcNomAlias].ColumnName = oCampo.vcDes;
                                    //.Replace("ó", "o")
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                        }

                        try
                        {
                            //Quitar columnas...
                            foreach (ENT_ENT_Campo oCampo in lstCampo)
                            {
                                if (!oCampo.btVis)
                                {
                                    table.Columns.Remove(oCampo.vcDes);
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                        }

                        //Valida data de la tabla....
                        ArrayList arrCampoEstados = new ArrayList();
                        foreach (ENT_ENT_Campo oCampo in lstCampo)
                        {
                            if (oCampo.btVis == true & oCampo.inTipDat == 6)
                            {
                                arrCampoEstados.Add(oCampo);
                                //Agregar nueva columna...
                                DataColumn colString = new DataColumn(oCampo.vcDes + "_stragregado_");
                                colString.DataType = System.Type.GetType("System.String");
                                table.Columns.Add(colString);
                            }
                        }

                        bool cont = false;
                        string ValVer = "";
                        string ValFal = "";
                        ENT_ENT_Campo oCampoEstado = null;

                        try
                        {
                            foreach (DataRow dr in table.Rows)
                            {
                                for (int i = 0; i <= table.Columns.Count - 1; i++)
                                {
                                    cont = false;
                                    for (int x = 0; x <= arrCampoEstados.Count - 1; x++)
                                    {
                                        oCampoEstado = (ENT_ENT_Campo)arrCampoEstados[x];

                                        if ((table.Columns[i].ToString() == oCampoEstado.vcDes))
                                        {
                                            ValVer = oCampoEstado.vcValVer.ToString();
                                            ValFal = oCampoEstado.vcValFal.ToString();
                                            cont = true;
                                            break; // TODO: might not be correct. Was : Exit For
                                        }
                                    }
                                    if ((cont == true))
                                    {
                                        if ((string.IsNullOrEmpty(ValVer.ToString()) & string.IsNullOrEmpty(ValFal.ToString())))
                                        {
                                            dr[oCampoEstado.vcDes + "_stragregado_"] = ("" + dr[i] == "True" ? "Activo" : "Baja");
                                        }
                                        else
                                        {
                                            dr[oCampoEstado.vcDes + "_stragregado_"] = ("" + dr[i] == "True" ? ValVer : ValFal);
                                        }
                                    }
                                }
                                dr.AcceptChanges();
                            }


                        }
                        catch (Exception ex)
                        {
                        }
                        //Quitar columnas...
                        try
                        {
                            for (int x = 0; x <= arrCampoEstados.Count - 1; x++)
                            {
                                oCampoEstado = (ENT_ENT_Campo)arrCampoEstados[x];
                                table.Columns.Remove(oCampoEstado.vcDes);
                            }
                        }
                        catch
                        {
                        }

                        //Editar Nombre columnas...
                        try
                        {
                            for (int x = 0; x <= table.Columns.Count - 1; x++)
                            {
                                if (table.Columns[x].ColumnName.Contains("_stragregado_"))
                                {
                                    table.Columns[x].ColumnName = table.Columns[x].ColumnName.Replace("_stragregado_", "");
                                }
                            }
                        }
                        catch
                        {
                        }
                    }

                    _return = table.Copy();


                }
                catch
                {
                }

                return _return;

            }


            private static string DevuelveLetraPorNumeroColumnaExcel(int inNumero)
            {
                string _return = null;
                int inValorInicial = 64;
                _return = ((char)(inValorInicial + inNumero)).ToString();
                //_return = Strings.ChrW(inValorInicial + inNumero);
                return _return;
            }

            public static void ExportDataTableToExcelXLWorkbook(DataTable table, string name)
            {
                string rootPath = HttpContext.Current.Server.MapPath("~/") + "Common/Temporales/";
                string attachment = name + ".xlsx";
                HttpContext context = HttpContext.Current;
                context.Response.Clear();
                context.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                context.Response.AddHeader("content-disposition", "attachment;filename=\"" + attachment + "\"");

                int inInicioFila = 1;
                int inInicioColumna = 1;
                //dynamic workbook = new XLWorkbook();
                XLWorkbook workbook = new XLWorkbook();
                IXLWorksheet worksheet = workbook.Worksheets.Add(table, name);
                //dynamic worksheet = workbook.Worksheets.Add(table, name);

                string strLetraInicio = DevuelveLetraPorNumeroColumnaExcel(inInicioColumna);
                string strLetraFin = DevuelveLetraPorNumeroColumnaExcel(table.Columns.Count);
                worksheet.Range(strLetraInicio + inInicioFila.ToString() + ":" + strLetraFin + inInicioFila.ToString()).Style.Fill.SetBackgroundColor(XLColor.FromArgb(102, 204, 255));
                worksheet.Range(strLetraInicio + inInicioFila.ToString() + ":" + strLetraFin + inInicioFila.ToString()).Style.Font.SetFontColor(XLColor.FromArgb(1, 1, 1));

                //formato a columna IMEI y Linea
                if ((name == "Despacho (Oficina)" | name == "Despacho (Empleado)"))
                {
                    if (table.Columns.IndexOf("IMEI") > -1)
                    {
                        //int inFinFila_F = worksheet.Rows.Count();
                        int inFinFila_F = worksheet.RowCount();
                        string strLetraIMEI_F = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("IMEI") + 1);
                        string strLetraLinea_F = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("Línea") + 1);
                        IXLNumberFormat dataFormatIMEI = worksheet.Range(strLetraIMEI_F + (inInicioFila + 1).ToString() + ":" + strLetraIMEI_F + inFinFila_F.ToString()).Style.NumberFormat;
                        IXLNumberFormat dataFormatLinea = worksheet.Range(strLetraLinea_F + (inInicioFila + 1).ToString() + ":" + strLetraLinea_F + inFinFila_F.ToString()).Style.NumberFormat;

                        dataFormatIMEI.SetFormat("@");
                        dataFormatLinea.SetFormat("@");
                    }
                }

                if ((name == "Despacho (Oficina)"))
                {
                    string strLetraIMEI = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("IMEI") + 1);
                    string strLetraLinea = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("Línea") + 1);
                    //worksheet.Columns(table.Columns.IndexOf("IdDetallePedido") + 1).Hide();
                    worksheet.Column(table.Columns.IndexOf("IdDetallePedido") + 1).Hide();

                    //int inFinFila = worksheet.Rows.Count();
                    int inFinFila = worksheet.RowCount();
                    worksheet.Range(strLetraIMEI + (inInicioFila + 1).ToString() + ":" + strLetraIMEI + inFinFila.ToString()).Style.Fill.SetBackgroundColor(XLColor.FromArgb(185, 213, 253));
                    worksheet.Range(strLetraLinea + (inInicioFila + 1).ToString() + ":" + strLetraLinea + inFinFila.ToString()).Style.Fill.SetBackgroundColor(XLColor.FromArgb(185, 213, 253));

                    if (table.Columns.IndexOf("Observación") != -1)
                    {
                        for (int i = 0; i <= table.Rows.Count - 1; i++)
                        {
                            if (!string.IsNullOrEmpty(table.Rows[i]["Observación"].ToString()))
                            {
                                worksheet.Range(strLetraInicio + (i + inInicioFila + 1).ToString() + ":" + strLetraFin + (i + inInicioFila + 1).ToString()).Style.Fill.SetBackgroundColor(XLColor.FromArgb(252, 185, 194));
                                worksheet.Range(strLetraInicio + (i + inInicioFila + 1).ToString() + ":" + strLetraFin + (i + inInicioFila + 1).ToString()).Style.Font.SetFontColor(XLColor.FromArgb(1, 1, 1));
                            }
                        }
                    }
                }
                else if ((name == "Errores"))
                {
                    //worksheet.Columns(table.Columns.IndexOf("Fila_Id") + 1).Hide();
                    //worksheet.Columns(table.Columns.IndexOf("Filas_Id") + 1).Hide();
                    worksheet.Column(table.Columns.IndexOf("Fila_Id") + 1).Hide();
                    worksheet.Column(table.Columns.IndexOf("Filas_Id") + 1).Hide();
                }


                if (table.Rows.Count > 100000)
                {
                    workbook.SaveAs(rootPath + attachment);
                    context.Response.TransmitFile(rootPath + attachment);
                }
                else
                {
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        workbook.SaveAs(memoryStream);
                        memoryStream.WriteTo(context.Response.OutputStream);
                    }
                }

                try
                {
                    //context.Response.End();
                    context.Response.Flush();
                    context.Response.Close();
                }
                catch (Exception ex)
                {
                }

            }
        }

        public static string ObtenerCadenaConexionMovil(int IdSuscripcion)
        {
            ENT_AP_BaseDatos BaseDatos = null;
            BL_AP_BaseDatos obj_BaseDatos = new BL_AP_BaseDatos();
            BL_AP_Utilitario Utilitario = new BL_AP_Utilitario();

            BaseDatos = obj_BaseDatos.Mostrar_por_Suscripcion(IdSuscripcion);
            return Utilitario.conexion_Movil_ImportacionMasiva(BaseDatos); // cadena de conexion para configurar BD restaurada                  
        }

    }
}

