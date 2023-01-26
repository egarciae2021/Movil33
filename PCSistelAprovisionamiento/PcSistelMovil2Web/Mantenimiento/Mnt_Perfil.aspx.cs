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

namespace PcSistelMovil2Web.Mantenimiento
{
    public partial class Mnt_Perfil : System.Web.UI.Page
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
                BL_Perfil Perfil = new BL_Perfil();

                try
                {
                    this.hdfIdTemporizador.Value = "-1";
                    string esAdmin = "";
                    string P_inCod = Request.QueryString["Cod"];

                    hdfCodigo.Value = P_inCod;
                    CargarJSONPerfilAcceso(Convert.ToInt32(P_inCod));

                    if (P_inCod != null)
                    {
                        ENT_Perfil oPerfil = new ENT_Perfil();

                        oPerfil = Perfil.Mostrar(Convert.ToInt32(P_inCod));
                        txtNombre.Text = oPerfil.Nombre;
                    }

                    else
                    {
                        hdfCodigo.Value = "0";
                        tbAgregarUsuarios.Style["display"] = "none";
                        dvMensajeUsuarios.Style["display"] = "";
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
                    if (Perfil != null) Perfil.Dispose();
                }
            }
        }

        public void CargarJSONPerfilAcceso(int inCodPerfil)
        {
            BL_Perfil Perfil = new BL_Perfil();

            try
            {
                List<ENT_ProductoTree> lstProductos = new List<ENT_ProductoTree>();
                StringBuilder sbDatos = new StringBuilder();

                lstProductos = Perfil.ObtenerTodosProductos(inCodPerfil);
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
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Perfil != null) Perfil.Dispose();
            }
        }

        [WebMethod()]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object ObtenerUsuarios_Perfil(string pIdPerfil, int inPagTam, int inPagAct, string vcFiltro)
        {
            BL_Perfil Perfil = new BL_Perfil();
            try
            {
                DataSet ds = Perfil.ObtenerUsuarios_Perfil(Convert.ToInt32(pIdPerfil), vcFiltro);
                DataTable dtUsuariosGrilla = ds.Tables[0];
                return JQGrid.DatosJSON(dtUsuariosGrilla, inPagTam, inPagAct);

            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Perfil != null) Perfil.Dispose();
            }
        }

        [WebMethod()]
        public static string ProcesarUsuarioPerfil(int inCodPer, int inCodUsu, bool esAdd)
        {
            BL_Perfil Perfil = new BL_Perfil();
            string resultado ="";
            BL_AP_Solicitud Solicitud = null;
            try
            {
                Solicitud = new BL_AP_Solicitud();

                resultado = Perfil.ProcesarUsuarioPerfil(inCodPer, inCodUsu, esAdd);

                return resultado;
            }
            catch (Exception ex)
            {
                ClaseUtilitarios util = new ClaseUtilitarios();
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), "PcSistelAprovisionamientoWeb");
                throw new Exception();
            }
            finally
            {
                if (Perfil != null) Perfil.Dispose();
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object BuscarUsuarioPerfil(string filtro, int IdPerfil,string campoordenar, string orden, int inPagTam, int inPagAct)
        {

            BL_AP_Usuario usuario = new BL_AP_Usuario();

            BL_Perfil Perfil = new BL_Perfil();
            try
            {
                DataSet dtusuario = new DataSet();
                dtusuario = Perfil.BuscarUsuarioPerfil(filtro, IdPerfil, campoordenar, orden);
                return JQGrid.DatosJSON(dtusuario.Tables[0], inPagTam, inPagAct);
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

        [WebMethod()]
        public static string GuardarTodo(string oPerfil, string XML_Producto, string XML_Modulo, string XML_Opcion, string XML_Item, int prIdTemporizador)
        {
            BL_Perfil Perfil = new BL_Perfil();
            string Resultado = "";

            try
            {

                JavaScriptSerializer oSerializer = new JavaScriptSerializer();
                ENT_Perfil v_oPerfil = oSerializer.Deserialize<ENT_Perfil>(oPerfil);
                v_oPerfil.Nombre = v_oPerfil.Nombre.Replace("&#39", "'");

                int inCodPer = v_oPerfil.IdPerfil;

                // 
                if (v_oPerfil.IdPerfil == 0)
                {
                    Resultado = Perfil.GrabarTodo(v_oPerfil, 0, XML_Modulo, XML_Opcion).ToString();
                }
                else
                {
                    Resultado = Perfil.GrabarTodo(v_oPerfil, 1, XML_Modulo, XML_Opcion).ToString();
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
                if (Perfil != null) Perfil.Dispose();
            }

        }


    }
}