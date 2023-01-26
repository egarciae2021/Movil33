using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Logic.Base
{
    public abstract class LoguerBase
    {
        public string LogTxt { get; set; }
        public abstract void Log(Exception ex, Int32? usuarioId);
    }
}