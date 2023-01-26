using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PCSistelGateway.ViewModels.GatewayC
{
    public class IndexViewModel
    {
        public string q { get; set; }
        
        public DateTime? FechaInicio { get; set; }
        
        public DateTime? FechaFin { get; set; }

        internal void Fill(IndexViewModel model)
        {
            this.q = (model.q == null) ? "" : model.q;
            this.FechaInicio = (model.FechaInicio == null) ? DateTime.Today.AddDays(-30) : model.FechaInicio;
            this.FechaFin = (model.FechaFin == null) ? DateTime.Today : model.FechaFin;
        }
    }
}