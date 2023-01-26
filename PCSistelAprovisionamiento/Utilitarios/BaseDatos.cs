using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utilitarios
{
    public class BaseDatos
    {

        public static string Proveedor;
        public static string Servidor;
        public static string BD;
        public static string SSPI;
        public static string Usuario;
        public static string Contraseña;

        public static string TimeOut;

        public static string CadenaConexion()
        {
            string _CadenaConexion = "";

            _CadenaConexion = "Data Source=" + Servidor + ";";
            switch (Proveedor.Trim().ToUpper())
            {
                case "SQL":
                case "MDE":
                    _CadenaConexion += "Initial Catalog=" + BD + ";";
                    break;
                case "ORACLE":
                    break;
            }
            if (SSPI.ToLower() == "true")
            {
                _CadenaConexion += "Integrated Security=SSPI;";
            }
            else
            {
                _CadenaConexion += "user id=" + Usuario + ";";
                _CadenaConexion += "password=" + Contraseña + ";";
            }

            _CadenaConexion += "connection timeout=" + TimeOut + ";";

            return _CadenaConexion;

        }

    }
}
