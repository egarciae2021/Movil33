using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Reflection;

namespace VisualSoft.MovilNetCloud.Web
{
    public class General
    {
        public static void RegistrarLog(string Usuario, PCSistelMovilLog45.LogBE.eNivel Nivel, string Mensaje, string Detalle = "")
        {
            try
            {

                PCSistelMovilLog45.LogBE oLog = new PCSistelMovilLog45.LogBE()
                {
                    IdCliente = 0,
                    IPCliente = "",
                    Usuario = Usuario,
                    Aplicativo = "Portal Web 3.3",
                    Categoria = Nivel == PCSistelMovilLog45.LogBE.eNivel.Advertencia ? "Advertencia" :
                                Nivel == PCSistelMovilLog45.LogBE.eNivel.Auditoria ? "Auditoría" :
                                Nivel == PCSistelMovilLog45.LogBE.eNivel.Debug ? "Debug" :
                                Nivel == PCSistelMovilLog45.LogBE.eNivel.Error ? "Error" :
                                Nivel == PCSistelMovilLog45.LogBE.eNivel.Informacion ? "Información" : "Debug",
                    Codigo = "",
                    Detalle = Detalle,
                    Equipo = Environment.MachineName,
                    FechaHora = DateTime.Now,
                    Gravedad = Nivel == PCSistelMovilLog45.LogBE.eNivel.Error ? PCSistelMovilLog45.LogBE.eGravedad.Critico : PCSistelMovilLog45.LogBE.eGravedad.Bajo,
                    Mensaje = Mensaje,
                    Nivel = Nivel
                };
                Task.Run(async () =>
                {
                    await PCSistelMovilLog45.Log.GenerarToken("mpajuelo@pcsistel.com", "Aa123456!");
                    await PCSistelMovilLog45.Log.Registrar(oLog);
                }).Wait();
            }
            catch
            {
                //throw;
            }
        }

    }
}