using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

namespace PcSistelMovil2Web.Asistente
{
    public partial class CargarLogoAsistente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string nombreImagen = string.Empty;
            try
            {

                if (!Page.IsPostBack)
                {

                    hdfCodigo.Value = Request.QueryString["Id"];
                    //byte[] imagen = Convert.ToByte((Session["ImagenActual"]);
                    byte[] imagen = (byte[])HttpContext.Current.Session["ImagenActual"];
                    Session.Contents.Remove("ImagenActual");
                    //CType(HttpContext.Current.Session["imagenCargada"], Byte())
                    if (hdfCodigo.Value == "0")
                    {
                        flUpload.Visible = true;
                        tdBusqueda.Visible = true;
                        btnsubir.Visible = true;
                        //btneliminar.Visible = false;
                        btneliminafoto.Visible = false;
                        imgIcono.Visible = false;
                    }
                    else
                    {
                        if (imagen == null)
                        {
                            flUpload.Visible = true;
                            tdBusqueda.Visible = true;
                            btnsubir.Visible = true;
                            btneliminar.Visible = false;
                            //imgIcono.ImageUrl = "~/Common/images/Temporal\\M_NIVE_" + hdfCodigo.Value + ".jpg";
                            imgIcono.ImageUrl = "Temporal\\Firma_" + hdfCodigo.Value + ".jpg";
                          
                        }
                        else
                        {
                            flUpload.Visible = false;
                            tdBusqueda.Visible = false;
                            btnsubir.Visible = false;
                            //btneliminar.Visible = true;
                            btneliminafoto.Visible = true;
                            try
                            {

                                //nombreImagen = Guid.NewGuid().ToString().Replace("-", "") + "_M_NIVE_" + hdfCodigo.Value + ".jpg";
                                nombreImagen = Guid.NewGuid().ToString().Replace("-", "") + "_Firma_" + hdfCodigo.Value + ".jpg";
                                //string strfn = Server.MapPath("~/Common/Images/Temporal\\" + nombreImagen);
                                string strfn = Server.MapPath("~\\Temporal\\" + nombreImagen);
                                FileStream fs = new FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write);
                                fs.Write(imagen, 0, imagen.Length);
                                fs.Flush();
                                fs.Close();

                            }
                            catch (Exception ex)
                            {
                          
                            }


                            imgIcono.Visible = true;
                            imgIcono.ImageUrl = "../Temporal/" + nombreImagen;
                          
                            //imgIcono.ImageUrl = "~/Common/Images/Temporal\\" + nombreImagen;                            
                            hdfIconoArchivo.Value = Guid.NewGuid().ToString().Replace("-", "") + "_Firma_" + hdfCodigo.Value + ".jpg";
                            Session["imagenCargada"] = imagen;
                            btnsubir.Visible = false;
                            btneliminar.Visible = false;
                            btneliminafoto.Visible = true;
                        }
                    }
                }
                //UtilitarioWeb.AgregarTema(Server, Page.Header, ((ENT_SEG_Usuario)Session["Usuario"]).CaracteristicaUsuario.vcTem);
            }
            catch (Exception exc)
            {
              
            }
        }

        protected void btneliminar_Click(object sender, EventArgs e)
        {
            string archivo = Server.MapPath(imgIcono.ImageUrl);

            if (System.IO.File.Exists(archivo))
            {
                System.IO.File.Delete(archivo);
                flUpload.Visible = true;
                tdBusqueda.Visible = true;
                
                //btneliminar.Visible = false;
                btneliminafoto.Visible = false;
                btnsubir.Visible = true;
                imgIcono.Visible = false;
                hdfIconoArchivo.Value = "0";
            }

            imgIcono.ImageUrl = "";
            Session.Contents.Remove("imagenCargada");

        }

        protected void btnsubir_Click(object sender, EventArgs e)
        {

            lblmensaje.Text = "";
            if (string.IsNullOrEmpty(flUpload.PostedFile.FileName)) {
                lblmensaje.Text = "Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)";
                return;

            } 
            else if (!string.IsNullOrEmpty(flUpload.PostedFile.FileName)) {
                bool valido = false;
                foreach (string ext in Extensiones()) {
                    if (Path.GetExtension(flUpload.PostedFile.FileName).ToString().Equals(ext)) {
                    valido = true;
                    }
                }

                if (valido == false) {
                    lblmensaje.Text = "Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)";
                    return;
                 }
            }          
      

            if (SubirArchivo())
            {
                imgIcono.Visible = true;
                //imgIcono.ImageUrl = "~/Common/Images/Temporal/" + hdfIconoArchivo.Value;
                imgIcono.ImageUrl = "../Temporal/" + hdfIconoArchivo.Value;
                flUpload.Visible = false;
                tdBusqueda.Visible = false;
                btnsubir.Visible = false;
                //btneliminar.Visible = false;
                btneliminafoto.Visible = true;
            }
        }

        private bool SubirArchivo()
        {
           

            string sFileDir =  Server.MapPath("~/") + "Temporal\\";
    
            if (!Directory.Exists(sFileDir))
            {
                Directory.CreateDirectory(sFileDir);
            }

            long lMaxFileSize = 500000;
            System.DateTime fecha = new System.DateTime();
            //Dim en As String = Guid.NewGuid().ToString()

            if (((flUpload.PostedFile != null)) & (flUpload.PostedFile.ContentLength > 0))
            {
                string sFileName = System.IO.Path.GetFileName(imgIcono.ImageUrl);
                //If sFileName.Equals(String.Empty) Then
                //    sFileName = flUpload.PostedFile.ContentLength & "-prueba.ico"
                //End If

                sFileName = Guid.NewGuid().ToString().Replace("-", "") + sFileName + ".jpg";

                try
                {
                    if (flUpload.PostedFile.ContentLength <= lMaxFileSize)
                    {
                        flUpload.PostedFile.SaveAs(sFileDir + sFileName);
                        hdfIconoArchivo.Value = sFileName;
                        Session["imagenCargada"] = flUpload.FileBytes;
                        lblmensaje.Text = "";
                        return true;
                    }
                    else
                    {
                        lblmensaje.Text = "El archivo es muy grande";
                        hdfIconoArchivo.Value = "0";
                        imgIcono.Visible = false;
                        flUpload.Visible = true;
                        tdBusqueda.Visible = true;
                        //btneliminar.Visible = false;
                        btneliminafoto.Visible = false;
                        btnsubir.Visible = true;
                        return false;
                    }
                }
                catch (Exception exc)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        private static List<string> Extensiones()
        {

	        List<string> lsExtensiones = new List<string>();

	        lsExtensiones.Add(".jpg");
	        lsExtensiones.Add(".jpeg");
	        lsExtensiones.Add(".bmp");
	        lsExtensiones.Add(".png");
	        lsExtensiones.Add(".gif");

	        return lsExtensiones;

        }

        protected void btnBuscar_Click(object sender, ImageClickEventArgs e)
        {
            
        }
    }
}