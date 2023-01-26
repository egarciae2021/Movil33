using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utilitarios
{

    public class ConexionBL
    {

        private static ConexionBL _Instancia;

        private static object _SyncLock = new object();
        public static ConexionBL GetInstancia()
        {
            // Valida multiples hilos.
            lock (_SyncLock)
            {
                if (_Instancia == null)
                {
                    _Instancia = new ConexionBL();
                }
                return _Instancia;
            }
        }

        public ConexionBE ObtieneConexion(string cadenaConexion)
        {
            ConexionBE _return = new ConexionBE();
            if (cadenaConexion != null && cadenaConexion.Contains(";"))
            {
                string[] Parametros = cadenaConexion.Split(';');
                _return.SeguridadIntegrada = "1";
                for (int x = 0; x <= Parametros.Length - 1; x++)
                {
                    if (Parametros[x].ToLower().Contains("server") || Parametros[x].ToLower().Contains("data source"))
                    {
                        _return.Servidor = Parametros[x].Split('=')[1].Trim();
                    }
                    else if (Parametros[x].ToLower().Contains("database") || Parametros[x].ToLower().Contains("initial catalog"))
                    {
                        _return.BaseDatos = Parametros[x].Split('=')[1].Trim();
                    }
                    else if (Parametros[x].ToLower().Contains("user id") || Parametros[x].ToLower().Contains("uid"))
                    {
                        _return.SeguridadIntegrada = "";
                        _return.Usuario = Parametros[x].Split('=')[1].Trim();
                    }
                    else if (Parametros[x].ToLower().Contains("password") || Parametros[x].ToLower().Contains("pwd"))
                    {
                        _return.Password = Parametros[x].Split('=')[1].Trim();
                    }
                }
            }
            else
            {
                _return = null;
            }
            return _return;
        }
    }

}
