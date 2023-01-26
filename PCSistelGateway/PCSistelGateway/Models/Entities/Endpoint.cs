using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Models.Entities
{
    public class Endpoint
    {
        public int IdEnpoint { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public bool btVig { get; set; }
    }
}