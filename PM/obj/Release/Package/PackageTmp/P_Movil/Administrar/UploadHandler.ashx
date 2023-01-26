<%@ WebHandler Language="C#" Class="UploadHandler" %>
using System.Collections.Generic;
using System;
using System.Drawing;
using System.Web;
using System.IO;

public class UploadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        //Uploaded File Deletion
        if (context.Request.QueryString.Count > 0)
        {


            string filePath = HttpContext.Current.Server.MapPath("~/P_Movil/Importacion/Errores/") + context.Request.QueryString[0].ToString();

            if (File.Exists(filePath))
            {
                if (context.Request.QueryString["accion"] != null && context.Request.QueryString["accion"].ToString() == "delete")
                {
                    try
                    {
                        //File.Delete(filePath); //No borrar archivo.
                    }
                    catch
                    { }
                }
                else
                {
                    context.Response.AddHeader("Content-Disposition", "attachment; filename=" + System.IO.Path.GetFileName(filePath));
                    context.Response.ContentType = "application/octet-stream";
                    context.Response.ClearContent();
                    context.Response.WriteFile(filePath);
                }
            }

        }
        //File Upload
        else
        {
            var ext = System.IO.Path.GetExtension(context.Request.Files[0].FileName);
            var fileName = Path.GetFileName(context.Request.Files[0].FileName);
            if (context.Request.Files[0].FileName.LastIndexOf("\\") != -1)
            {
                fileName = context.Request.Files[0].FileName.Remove(0, context.Request.Files[0].FileName.LastIndexOf("\\")).ToLower();
            }
            fileName = GetUniqueFileName(fileName, HttpContext.Current.Server.MapPath("DownloadedFiles/"), ext).ToLower();
            string location = HttpContext.Current.Server.MapPath("DownloadedFiles/") + fileName + ext;
            context.Request.Files[0].SaveAs(location);

            context.Response.Write(fileName + ext + "," + ConvTamano(context.Request.Files[0].ContentLength));
            context.Response.End();
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


    public string ConvTamano(double Valor)
    {
        string Texto = "";
        string[] Tamanos = {
		" bytes",
		" Kb",
		" Mb",
		" Gb",
		" Tb",
		" Pb",
		" Eb",
		" Zb",
		" Yb"
	    };
        double Calculo = Valor;
        double ValorTamano = 1;
        int Conta = 0;
        int Conta2 = 0;
        int Parada = 0;
        Conta = 0;
        Parada = 0;
        foreach (string Tama in Tamanos)
        {
            if (Conta != 0)
            {
                ValorTamano = ValorTamano * 1024;
                Calculo = Calculo - ValorTamano;
            }
            if (Calculo >= 0)
            {
                Conta = Conta + 1;
                Parada = 1;
            }
            else
            {
                Conta = Conta - 1;
                break; // TODO: might not be correct. Was : Exit For
            }
        }
        if (Parada == 1)
        {
            for (Conta2 = 1; Conta2 <= Conta; Conta2++)
            {
                Valor = Valor / 1024;
            }
            if (Conta == 0)
            {
                Texto = Math.Truncate(Valor) + Tamanos[Conta];
            }
            else
            {
                Texto = String.Format("{0:#,##0.00}", Valor) + Tamanos[Conta];
            }
        }
        return Texto;
    }


}   