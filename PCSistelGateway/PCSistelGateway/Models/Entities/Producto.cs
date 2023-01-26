using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Models.Entities
{
    public class Producto
    {
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public bool btVig { get; set; }
    }
}