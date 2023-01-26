using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PCSistelGateway.Helpers;
using PCSistelGateway.Logic.Base;

namespace PCSistelGateway.Logic
{
    public class DBLoguerLogic : LoguerBase
    {
        
        public DBLoguerLogic()
        {
            
        }

        public override void Log(Exception ex, int? usuarioId)
        {
            throw new NotImplementedException();
        }
    }

    public class FileLoguerLogic : LoguerBase
    {
        public string FileRoute { get; set; } //"~/ErrorLog/"
        public FileLoguerLogic()
        {
            FileRoute = ConvertHelpers.GetAppSeting("FileLogRoute");
        }
        public override void Log(Exception ex, int? usuarioId)
        {
            try
            {
                var fechaActual = DateTime.Now;
                this.LogTxt = $">_{fechaActual.ToString("HH:mm:ss")}; User : {usuarioId ?? 0}; Url : {HttpContext.Current.Request.Url.AbsolutePath}" + Environment.NewLine;
                this.LogTxt += "Exception : " + JsonConvert.SerializeObject(ex, Formatting.Indented) + Environment.NewLine;
                this.LogTxt += "-----------------------------------------------------------" + Environment.NewLine;
                string path = HttpContext.Current.Server.MapPath($"~/{FileRoute}/{fechaActual.ToString("yyyyMMdd")}_Log.txt");
                using (var writer = new System.IO.StreamWriter(path, true))
                {
                    writer.WriteLine(this.LogTxt);
                    writer.Close();
                }
            }
            catch (Exception)
            {
                new ConsoleLoguerLogic().Log(ex, usuarioId);
            }
        }
    }

    public class ConsoleLoguerLogic : LoguerBase
    {
        public override void Log(Exception ex, int? usuarioId)
        {
            try
            {
                var fechaActual = DateTime.Now;
                this.LogTxt = $">_{fechaActual.ToString("HH:mm:ss")}; User : {usuarioId ?? 0}; Url : {HttpContext.Current.Request.Url.AbsolutePath}" + Environment.NewLine;
                this.LogTxt += "Exception : " + JsonConvert.SerializeObject(ex, Formatting.Indented) + Environment.NewLine;
                System.Diagnostics.Debug.WriteLine(this.LogTxt);
            }
            catch (Exception)
            {

            }
        }
    }
}