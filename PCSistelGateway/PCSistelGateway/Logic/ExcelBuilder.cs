using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Logic
{
    public abstract class ExcelBuilder
    {
        private string _rutaTemplate { get; set; }
        private MemoryStream _ms { get; set; }
        private int _filaInicio { get; set; }
        private ExcelWorksheet _worksheet { get; set; }
        public ExcelBuilder(string rutaTemplate, int filaInicio)
        {
            this._rutaTemplate = rutaTemplate;
            this._filaInicio = filaInicio;
        }
    }
}