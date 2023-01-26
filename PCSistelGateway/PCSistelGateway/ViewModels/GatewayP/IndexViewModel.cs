using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PCSistelGateway.ViewModels.GatewayP
{
    public class IndexViewModel
    {
        public string q { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public string FechaInicio { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public string FechaFin { get; set; }

        internal void Fill(IndexViewModel model)
        {
            this.q = model.q;
            this.FechaInicio = model.FechaInicio;
            this.FechaFin = model.FechaFin;
        }
    }
}