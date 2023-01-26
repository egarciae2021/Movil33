using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Models.Entities
{
    public class Gateway
    {
        private Pais _Pais;
        private TipoAprovisionamiento _TipoAprov;
        private List<GatewayProducto> _LsGatewayProducto;
        private List<ProductoEndpoint> _LsProductoEndpoint;

        public Gateway()
        {
            _Pais = new Pais();
            _TipoAprov = new TipoAprovisionamiento();
            _LsGatewayProducto = new List<GatewayProducto>();
            _LsProductoEndpoint = new List<ProductoEndpoint>();
        }

        public int IdGateway { get; set; }
        public int IdDominio { get; set; }
        public string Nombre { get; set; }
        public Pais Pais
        {
            get { return _Pais; }
            set { _Pais = value; }
        }
        public TipoAprovisionamiento TipoAprov
        {
            get { return _TipoAprov; }
            set { _TipoAprov = value; }
        }
        public string Observacion { get; set; }
        public bool btVig { get; set; }
        public string Estado { get; set; }
        public List<GatewayProducto> LsGatewayProducto
        {
            get { return _LsGatewayProducto; }
            set { _LsGatewayProducto = value; }
        }
        public List<ProductoEndpoint> LsProductoEndpoint
        {
            get { return _LsProductoEndpoint; }
            set { _LsProductoEndpoint = value; }
        }
    }
}