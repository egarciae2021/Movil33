using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Models.Entities
{
    public class ProductoEndpoint
    {
        private Endpoint _Endpoint;

        public ProductoEndpoint()
        {
            _Endpoint = new Endpoint();
        }

        public int IdProductoEndpoint { get; set; }
        public int IdGatewayProducto { get; set; }
        public Endpoint Endpoint
        {
            get { return _Endpoint; }
            set { _Endpoint = value; }
        }
        public string Url { get; set; }
    }
}