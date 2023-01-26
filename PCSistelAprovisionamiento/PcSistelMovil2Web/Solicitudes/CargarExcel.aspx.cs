using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ClosedXML.Excel;
using System.IO;
using System.Data.OleDb;
using System.Data;
using VisualSoft.PCSistel.Aprovisionamiento.BL;
using VisualSoft.PCSistel.Aprovisionamiento.BE;
using System.Text.RegularExpressions;
using System.Xml;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace PcSistelMovil2Web.Solicitudes
{
    public partial class CargarExcel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Session["datos"] == null))
            {
                Response.BufferOutput = true;
                string script = "window.top.location.reload();";
                this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey", script, true);
            }

        }
        
        protected void btnsubir_Click(object sender, EventArgs e)
        {

          

        }

        public void guardarDatos()
        {
            lblmensaje.Text = "";
            if (string.IsNullOrEmpty(flUpload.PostedFile.FileName))
            {
                lblmensaje.Text = "Seleccione un archivo del tipo Excel(xls, xlsx)";
                return;

            }
            else if (!string.IsNullOrEmpty(flUpload.PostedFile.FileName))
            {
                bool valido = false;
                foreach (string ext in Extensiones())
                {
                    if (Path.GetExtension(flUpload.PostedFile.FileName).ToString().Equals(ext))
                    {
                        valido = true;
                    }
                }

                if (valido == false)
                {
                    lblmensaje.Text = "Seleccione un archivo del tipo Excel(xls, xlsx)";
                    return;
                }
            }



            string filename = Path.GetFileName(flUpload.FileName);
            int DiferenciaFecha;


            XLWorkbook ArchivoExcel = new XLWorkbook(flUpload.FileContent);
            IXLWorksheet Hoja = ArchivoExcel.Worksheets.First();

            List<ENT_AP_Solicitud> lsSolicitud = new List<ENT_AP_Solicitud>();

            List<ENT_AP_Usuario> lsDatosUsuario = (List<ENT_AP_Usuario>)HttpContext.Current.Session["datos"];

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT></ROOT>");


            string NombreEmpresa, RazonSocial, Ruc, FechaInicioContrato, FechaFinContrato, Observacion, Descripcion, NombreT1, ApeT1, CorreoT1, NombreT2, ApeT2, CorreoT2;
            int codPais, Licencia, Lineas;


            for (int i = 5; i < 20; i++)
            {
                if (Hoja.Cell(i, 1).Value.ToString() == "")
                {
                    break;
                }

                if (Hoja.Cell(i, 2).Value.ToString() == "" || Hoja.Cell(i, 2).Value.ToString().Trim().Length > 20)
                {
                    lblmensaje.Text = "Ingrese un formato de Razón Social en la celda B" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 3).Value.ToString() == "" || Hoja.Cell(i, 3).Value.ToString().Trim().Length != 11 || validaDatos(Hoja.Cell(i, 3).Value.ToString().Trim(), 1) != true)
                {
                    lblmensaje.Text = "Ingrese un nùmero de Ruc válido en la celda C" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 4).Value.ToString() == "" || Hoja.Cell(i, 4).Value.ToString().Trim().Length > 2 || validaDatos(Hoja.Cell(i, 4).Value.ToString().Trim(), 1) != true)
                {
                    lblmensaje.Text = "Ingrese un código de pais válido en la celda D" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 5).Value.ToString() == "" || validaDatos(Hoja.Cell(i, 5).Value.ToString().Trim(), 2) != true)
                {
                    lblmensaje.Text = "Ingrese una fecha inicial válida en la celda E" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 6).Value.ToString() == "" || validaDatos(Hoja.Cell(i, 6).Value.ToString().Trim(), 2) != true)
                {
                    lblmensaje.Text = "Ingrese una fecha final válida en la celda F" + i.ToString();
                    return;
                }


                DiferenciaFecha = DateTime.Compare(Convert.ToDateTime(Hoja.Cell(i, 6).Value.ToString()), Convert.ToDateTime(Hoja.Cell(i, 5).Value.ToString()));

                if (DiferenciaFecha < 1)
                {
                    lblmensaje.Text = "La Fecha Final no puede ser menor a la Inicial en la celda F" + i.ToString();
                    return;
                }


                if (Hoja.Cell(i, 7).Value.ToString().Trim().Length > 50)
                {
                    lblmensaje.Text = "La Observación del contrato no puede ser más de 50 caracteres en la celda G" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 8).Value.ToString().Trim().Length > 50)
                {
                    lblmensaje.Text = "La descripción del contrato no puede ser más de 50 caracteres en la celda H" + i.ToString();
                    return;
                }


                if (Hoja.Cell(i, 9).Value.ToString() == "" || Hoja.Cell(i, 9).Value.ToString().Trim().Length != 1 || validaDatos(Hoja.Cell(i, 9).Value.ToString().Trim(), 1) != true)
                {
                    lblmensaje.Text = "Ingrese un número de Licencia Válida celda I" + i.ToString();
                    return;
                }

                if (int.Parse(Hoja.Cell(i, 9).Value.ToString().Trim()) < 0 || int.Parse(Hoja.Cell(i, 9).Value.ToString().Trim()) > 3)
                {
                    lblmensaje.Text = "Ingrese un número de Licencia Válida celda I" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 10).Value.ToString() == "" || validaDatos(Hoja.Cell(i, 10).Value.ToString().Trim(), 1) != true)
                {
                    lblmensaje.Text = "Ingrese un número de Líneas válidas celda J" + i.ToString();
                    return;
                }

                if (int.Parse(Hoja.Cell(i, 10).Value.ToString().Trim()) < 0 || int.Parse(Hoja.Cell(i, 10).Value.ToString().Trim()) > 1000)
                {
                    lblmensaje.Text = "Ingrese un número de Líneas válidas celda J" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 11).Value.ToString() == "" || Hoja.Cell(i, 11).Value.ToString().Trim().Length > 50)
                {
                    lblmensaje.Text = "Ingrese un nombre para el Titular 1 en la celda K" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 12).Value.ToString() == "" || Hoja.Cell(i, 12).Value.ToString().Trim().Length > 50)
                {
                    lblmensaje.Text = "Ingrese los apellidos para el Titular 1 en la celda L" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 13).Value.ToString() == "" || Hoja.Cell(i, 13).Value.ToString().Trim().Length > 100 || validaCorreo(Hoja.Cell(i, 13).Value.ToString()) != true)
                {
                    lblmensaje.Text = "Ingrese un correo válido para el Titular 1 en la celda M" + i.ToString();
                    return;
                }


                if (Hoja.Cell(i, 14).Value.ToString() == "" || Hoja.Cell(i, 14).Value.ToString().Trim().Length > 50)
                {
                    lblmensaje.Text = "Ingrese un nombre para el Titular 2 en la celda N" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 15).Value.ToString() == "" || Hoja.Cell(i, 15).Value.ToString().Trim().Length > 50)
                {
                    lblmensaje.Text = "Ingrese los apellidos para el Titular 2 en la celda O" + i.ToString();
                    return;
                }

                if (Hoja.Cell(i, 16).Value.ToString() == "" || Hoja.Cell(i, 16).Value.ToString().Trim().Length > 100 || validaCorreo(Hoja.Cell(i, 16).Value.ToString()) != true)
                {
                    lblmensaje.Text = "Ingrese un correo válido para el Titular 2 en la celda P" + i.ToString();
                    return;
                }



                // string NombreEmpresa, RazonSocial, Ruc, FechaInicioContrato, FechaFinContrato, Observacion, Descripcion, NombreT1, ApeT1, CorreoT1, NombreT2, ApeT2, CorreoT2;
                //int codPais, Licencia, Lineas;
                ENT_AP_Solicitud oSolicitud = new ENT_AP_Solicitud();



                int CodPais = Convert.ToInt32(Hoja.Cell(i, 4).Value.ToString());

                switch (CodPais)
                {
                    case 57: codPais = 1;
                        break;
                    default:
                        codPais = 1;
                        break;
                }




                oSolicitud.IdOperador = lsDatosUsuario[0].Operador.IdOperador;
                oSolicitud.IdUsuarioRegistro = lsDatosUsuario[0].IdUsuario;
                oSolicitud.IdEstado = 1; //1 Pendiente
                oSolicitud.IdTipoSolicitud = 1;
                oSolicitud.NombreEmpresa = Hoja.Cell(i, 1).Value.ToString().Trim();
                oSolicitud.RazonSocial = Hoja.Cell(i, 2).Value.ToString().Trim();
                oSolicitud.Ruc = Hoja.Cell(i, 3).Value.ToString().Trim();
                oSolicitud.IdPais = CodPais;
                oSolicitud.FechaInicioContrato = Hoja.Cell(i, 5).Value.ToString().Trim().Substring(0, 10);
                oSolicitud.FechaFinContrato = Hoja.Cell(i, 6).Value.ToString().Trim().Substring(0, 10);
                oSolicitud.ObservacionContrato = Hoja.Cell(i, 7).Value.ToString().Trim();
                oSolicitud.DescripcionContrato = Hoja.Cell(i, 8).Value.ToString().Trim();
                oSolicitud.IdTipoLicencia = Convert.ToInt32(Hoja.Cell(i, 9).Value.ToString().Trim());
                oSolicitud.Lineas = Convert.ToInt32(Hoja.Cell(i, 10).Value.ToString().Trim());


                ENT_AP_SolicitudTitulares Titulares1 = new ENT_AP_SolicitudTitulares();
                Titulares1.Nombre = Hoja.Cell(i, 11).Value.ToString().Trim();
                Titulares1.Apellido = Hoja.Cell(i, 12).Value.ToString().Trim();
                Titulares1.Correo = Hoja.Cell(i, 13).Value.ToString().Trim();

                ENT_AP_SolicitudTitulares Titulares2 = new ENT_AP_SolicitudTitulares();
                Titulares2.Nombre = Hoja.Cell(i, 14).Value.ToString().Trim();
                Titulares2.Apellido = Hoja.Cell(i, 15).Value.ToString().Trim();
                Titulares2.Correo = Hoja.Cell(i, 16).Value.ToString().Trim();


                NombreEmpresa = Hoja.Cell(i, 1).Value.ToString();
                RazonSocial = Hoja.Cell(i, 2).Value.ToString();
                Ruc = Hoja.Cell(i, 3).Value.ToString();
                codPais = Convert.ToInt32(Hoja.Cell(i, 4).Value.ToString());
                FechaInicioContrato = Hoja.Cell(i, 5).Value.ToString();
                FechaFinContrato = Hoja.Cell(i, 6).Value.ToString();
                Observacion = Hoja.Cell(i, 7).Value.ToString();
                Descripcion = Hoja.Cell(i, 8).Value.ToString();
                Licencia = Convert.ToInt32(Hoja.Cell(i, 9).Value.ToString());
                Lineas = Convert.ToInt32(Hoja.Cell(i, 10).Value.ToString());
                NombreT1 = Hoja.Cell(i, 11).Value.ToString();
                ApeT1 = Hoja.Cell(i, 12).Value.ToString();
                CorreoT1 = Hoja.Cell(i, 13).Value.ToString();
                NombreT2 = Hoja.Cell(i, 14).Value.ToString();
                ApeT2 = Hoja.Cell(i, 15).Value.ToString();
                CorreoT2 = Hoja.Cell(i, 16).Value.ToString();


                XmlElement xmlElemento = xmlDoc.CreateElement("Campo");

                xmlElemento.SetAttribute("IdOperador", lsDatosUsuario[0].Operador.IdOperador.ToString());
                xmlElemento.SetAttribute("IdUsuarioRegistro", lsDatosUsuario[0].IdUsuario.ToString());
                xmlElemento.SetAttribute("IdEstado", "1");
                xmlElemento.SetAttribute("IdTipoSolicitud", "1");

                xmlElemento.SetAttribute("NombreEmpresa", Hoja.Cell(i, 1).Value.ToString().Trim());
                xmlElemento.SetAttribute("RazonSocial", Hoja.Cell(i, 2).Value.ToString().Trim());
                xmlElemento.SetAttribute("Ruc", Hoja.Cell(i, 3).Value.ToString().Trim());
                xmlElemento.SetAttribute("IdPais", Hoja.Cell(i, 4).Value.ToString().Trim());
                xmlElemento.SetAttribute("FechaInicioContrato", Hoja.Cell(i, 5).Value.ToString().Trim().Substring(0, 10));
                xmlElemento.SetAttribute("FechaFinContrato", Hoja.Cell(i, 6).Value.ToString().Trim().Substring(0, 10));
                xmlElemento.SetAttribute("ObservacionContrato", Hoja.Cell(i, 7).Value.ToString().Trim());
                xmlElemento.SetAttribute("DescripcionContrato", Hoja.Cell(i, 8).Value.ToString().Trim());
                xmlElemento.SetAttribute("IdTipoLicencia", Hoja.Cell(i, 9).Value.ToString().Trim());
                xmlElemento.SetAttribute("Lineas", Hoja.Cell(i, 10).Value.ToString().Trim());
                xmlElemento.SetAttribute("NombreTitular1", Hoja.Cell(i, 11).Value.ToString().Trim());
                xmlElemento.SetAttribute("ApellidoTitular1", Hoja.Cell(i, 12).Value.ToString().Trim());
                xmlElemento.SetAttribute("CorreoTitular1", Hoja.Cell(i, 13).Value.ToString().Trim());
                xmlElemento.SetAttribute("NombreTitular2", Hoja.Cell(i, 14).Value.ToString().Trim());
                xmlElemento.SetAttribute("ApellidoTitular2", Hoja.Cell(i, 15).Value.ToString().Trim());
                xmlElemento.SetAttribute("CorreoTitular2", Hoja.Cell(i, 16).Value.ToString().Trim());
                xmlDoc.DocumentElement.AppendChild(xmlElemento);

                oSolicitud.Titulares.Add(Titulares1);
                oSolicitud.Titulares.Add(Titulares2);
                lsSolicitud.Add(oSolicitud);
            }

            string datos = xmlDoc.OuterXml;

            int total = datos.Length;

            BL_AP_Solicitud Solicitud = new BL_AP_Solicitud();

            lblmensaje.Text = Solicitud.GuardarExcel(lsSolicitud);

            //lblmensaje.Text = "Las Solicitudes fueron Procesadas correctamente";
        }

        public bool validaDatos(string valor, int tipo)
        {
            bool Esvalido = false;
            Int64 numero;
            string cadena;
            DateTime fecha;

            switch (tipo)
            {
                case 1: //Valida si es entero
                    Esvalido = Int64.TryParse(valor, out numero);
                    break;
                case 2: //Valida si es fecha
                    Esvalido = DateTime.TryParse(valor, out fecha);
                    break;
            }
            return Esvalido;

        }


        public bool validaCorreo(string email)
        {
           
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private static List<string> Extensiones()
        {

            List<string> lsExtensiones = new List<string>();

            lsExtensiones.Add(".xls");
            lsExtensiones.Add(".xlsx");
            return lsExtensiones;

        }


        [WebMethod()]
        public static string DescargarArchivoBD()
        {
            string Resultado = "";
            try
            {   

                string vcFilePath = HttpContext.Current.Server.MapPath("~") + "\\Solicitudes\\plantillaSolicitud.xlsx";

               
                FileInfo file = new FileInfo(vcFilePath);
                if (file.Exists)
                {
                    Resultado = vcFilePath;                 
                }

                return Resultado;
              

            }
            catch (Exception ex)
            {                
                throw new Exception();
            }
        }

        
        protected void btnEnviar_Click(object sender, EventArgs e)
        {
            guardarDatos();
        }   

    }
}