using Newtonsoft.Json;
using PCSistelGateway.Helpers;
using PCSistelGateway.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace PCSistelGateway.ViewModels.GatewayC
{
    public class _ListGatewayCViewModel : IndexViewModel
    {
        public List<Gateway> LstGateway { get; private set; }

        public void Fill(IndexViewModel model)
        {
            LstGateway = new List<Gateway>();
            base.q = model.q;
            base.FechaInicio = model.FechaInicio;
            base.FechaFin = model.FechaFin;

            var result = GetDominios(1, model);
            var result1 = result.Split('~');
            if (result1.Length>1)
            {
                var lista = result1[1].Split(';');
                if (lista.Length>0)
                {
                    if (lista[0].Length > 0)
                    {
                        foreach (var item in lista)
                        {
                            var datos = item.Split('|');
                            Gateway gateway = new Gateway();
                            gateway.IdGateway = Convert.ToInt32(datos[0]);
                            gateway.IdDominio = Convert.ToInt32(datos[1]);
                            gateway.Nombre = (datos[2]);
                            gateway.Pais.IdPais = Convert.ToInt32(datos[3]);
                            gateway.Pais.Nombre = (datos[4]);
                            gateway.Observacion = (datos[6]);
                            gateway.btVig = Convert.ToBoolean(Convert.ToInt32(datos[7]));
                            gateway.Estado = (gateway.btVig) ? "ACT" : "INA";
                            LstGateway.Add(gateway);
                        }
                    }
                }
            }


        }

        private static string GetDominios(int tipo, IndexViewModel model)
        {
            var result = "";
            var jsonString = JsonConvert.SerializeObject(model);
            using (var stringContent = new StringContent(jsonString, System.Text.Encoding.UTF8, "application/json"))
            using (var client = new HttpClient())
            {
                try
                {
                    var responseTask = client.PostAsync(String.Format("{0}/Gateway/Listar/{1}", ConstantHelpers.URL_GATEWAY, tipo), stringContent);
                    //var data = response.Content.ReadAsStringAsync();
                    responseTask.Wait();
                    var result_ = responseTask.Result;
                    if (result_.IsSuccessStatusCode)
                    {
                        var readTask = result_.Content.ReadAsAsync<string>();
                        readTask.Wait();

                        result = readTask.Result;
                    }
                }
                catch (Exception ex)
                {
                    result = "ERR";
                }
            }
            return result;
        }
    }
}