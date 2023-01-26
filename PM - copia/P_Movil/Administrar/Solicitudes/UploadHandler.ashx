<%@ WebHandler Language="C#" Class="UploadHandler" %>
using System.Collections.Generic;
using System;
using System.Drawing;
using System.Web;
using System.IO;
using System.Configuration;

public class UploadHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string strPath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//";

        if (context.Request.QueryString["dominio"] != "-1")
        {
            strPath = strPath + context.Request.QueryString["dominio"] + "//";
        }

        //string CarpetaDominio = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Administrar//Temporal//Solicitudes//", "//");
        //string strPath = @"E:\VSTS\v3.3.0\3.MEX\Web\PM\P_Movil\Administrar\Temporal\Solicitudes\";

        if (!Directory.Exists(strPath))
            Directory.CreateDirectory(strPath);

        //Uploaded File Deletion
        if (context.Request.QueryString.Count > 1)
        {
            string filePath = strPath + context.Request.QueryString[0].ToString();

            if (File.Exists(filePath))
            {
                if (context.Request.QueryString[1].ToString() == "delete")
                {
                    File.Delete(filePath);
                }
                else //download
                {
                    context.Response.ClearContent();
                    context.Response.AddHeader("Content-Disposition", "attachment; filename=" + System.IO.Path.GetFileName(filePath));
                    context.Response.ContentType = "application/octet-stream"; //Abarca todo tipo de archivo.
                    context.Response.WriteFile(filePath);
                    context.Response.End();
                }
            }
        }
        //File Upload
        else
        {
            double dblTamano = (context.Request.Files[0].ContentLength / 1024.0) / 1024.0;
            double dblTamMB = Convert.ToDouble("0" + ConfigurationManager.AppSettings["Adjuntar_TamanoMaximoMB"].ToString());

            if (dblTamano < dblTamMB || dblTamano == dblTamMB)
            {
                var ext = System.IO.Path.GetExtension(context.Request.Files[0].FileName);
                var fileName = Path.GetFileName(context.Request.Files[0].FileName);
                if (context.Request.Files[0].FileName.LastIndexOf("\\") != -1)
                {
                    fileName = context.Request.Files[0].FileName.Remove(0, context.Request.Files[0].FileName.LastIndexOf("\\")).ToLower();
                }
                fileName = GetUniqueFileName(fileName, strPath, ext).ToLower();
                string location = strPath + fileName + ext;

                context.Request.Files[0].SaveAs(location);
                context.Response.Write(fileName + ext);
                context.Response.End();
            }
        }
    }

    public static string GetUniqueFileName(string name, string savePath, string ext)
    {
        name = name.Replace(ext, "").Replace(" ", "_");
        name = System.Text.RegularExpressions.Regex.Replace(name, @"[^\w\s]", "");
        var newName = name;
        var i = 0;
        if (System.IO.File.Exists(savePath + newName + ext))
        {
            do
            {
                i++;
                newName = name + "_" + i;
            }
            while (System.IO.File.Exists(savePath + newName + ext));
        }
        return newName;
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}   