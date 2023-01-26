using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PCSistelGateway.Helpers;
using PCSistelGateway.Models;

namespace PCSistelGateway.Logic
{
    public class UsuarioLogic
    {
        private CargarDatosContext _datContext { get; set; }


        public UsuarioLogic(CargarDatosContext dataContext)
        {
            this._datContext = dataContext;
        }

        public String GenerateUsuario(string nombre, string apellidos)
        {
            var existeCodigo = true;
            var apellidoArray = apellidos.Split(' ');
            var codigoGenerado = nombre.Substring(0, 1) + apellidoArray.First();
            var codigoGeneradoTemp = codigoGenerado;

            var i = 1;
            while (existeCodigo)
            {
                codigoGeneradoTemp = codigoGenerado + i.ToString();
                i++;
            }
            return codigoGeneradoTemp.ToLower();
        }
    }
}