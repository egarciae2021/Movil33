using PCSistelGateway.Helpers;
using PCSistelGateway.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace PCSistelGateway.ViewModels.GatewayC
{    

    public class ViewGatewayCViewModel
    {

        public Gateway GatewayC { get; private set; }

        internal void Fill(Int32? idGateway)
        {
            GatewayC = new Gateway();
            if (idGateway.HasValue)
            {
                GatewayC = GetGateway(idGateway);
                GatewayC.Estado = (GatewayC.btVig) ? "ACT" : "INA";
            }
        }

        private static Gateway GetGateway(Int32? gateway)
        {
            Gateway result = new Gateway();
            var jsonString = "";
            using (var stringContent = new StringContent(jsonString, System.Text.Encoding.UTF8, "application/json"))
            using (var client = new HttpClient())
            {
                try
                {
                    var responseTask = client.PostAsync(String.Format("{0}/Gateway/ObtenerPorId/{1}", ConstantHelpers.URL_GATEWAY, gateway), stringContent);
                    //var data = response.Content.ReadAsStringAsync();
                    responseTask.Wait();
                    var result_ = responseTask.Result;
                    if (result_.IsSuccessStatusCode)
                    {
                        var readTask = result_.Content.ReadAsAsync<Gateway>();
                        readTask.Wait();

                        result = readTask.Result;
                    }
                }
                catch (Exception ex)
                {
                    
                }
            }
            return result;
        }
    }
}