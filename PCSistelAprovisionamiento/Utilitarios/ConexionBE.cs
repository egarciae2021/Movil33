using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utilitarios
{

    public class ConexionBE
    {

        private string _usuario = "";
        private string _password = "";
        private string _servidor = "";
        private string _basedatos = "";

        private string _seguridadintegrada = "";
        public string Usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }

        public string Password
        {
            get { return _password; }
            set { _password = value; }
        }

        public string Servidor
        {
            get { return _servidor; }
            set { _servidor = value; }
        }

        public string BaseDatos
        {
            get { return _basedatos; }
            set { _basedatos = value; }
        }

        public string SeguridadIntegrada
        {
            get { return _seguridadintegrada; }
            set { _seguridadintegrada = value; }
        }

    }

}
