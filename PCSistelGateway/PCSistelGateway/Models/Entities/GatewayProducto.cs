using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Models.Entities
{
    public class GatewayProducto
    {
        private Producto _Producto;

        public GatewayProducto()
        {
            _Producto = new Producto();
        }

        public int IdGatewayProducto { get; set; }
        public int IdGateway { get; set; }
        public Producto Producto
        {
            get { return _Producto; }
            set { _Producto = value; }
        }
        public bool btVig { get; set; }
        public List<ProductoEndpoint> LsProductoEndpoint { get; set; }
    }
}