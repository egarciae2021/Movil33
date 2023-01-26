using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace PCSistelGateway.Logic
{
    public class FirebaseLogic
    {
        private String _ServerApiKey { get; set; }
        private String _SenderId { get; set; }

        public FirebaseLogic()
        {
            _ServerApiKey = ConfigurationManager.AppSettings.Get("FCMApiKey");
            _SenderId = ConfigurationManager.AppSettings.Get("FCMSenderId");
        }

        public FirebaseLogic(string serverApiKey, string senderId)
        {
            _ServerApiKey = serverApiKey;
            _SenderId = senderId;
        }

        public FCMResponse EnviarNotificacion(List<String> deviceTokens, String title, String body, String dataKey, String dataValue)
        {
            var response = new FCMResponse();
            if (deviceTokens.Count == 0)
            {
                response.success = "0";
                return response;
            }

            try
            {
                WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
                tRequest.Method = "POST";
                tRequest.ContentType = "application/json";
                var data = new
                {
                    registration_ids = deviceTokens,
                    notification = new
                    {
                        title = title,
                        body = body,
                        dataKey = dataKey,
                        dataValue = dataValue
                    }
                };
                string jsonNotificationFormat = Newtonsoft.Json.JsonConvert.SerializeObject(data);

                Byte[] byteArray = Encoding.UTF8.GetBytes(jsonNotificationFormat);
                tRequest.Headers.Add(string.Format("Authorization: key={0}", _ServerApiKey));
                tRequest.Headers.Add(string.Format("Sender: id={0}", _SenderId));
                tRequest.ContentLength = byteArray.Length;
                tRequest.ContentType = "application/json";
                using (Stream dataStream = tRequest.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);

                    using (WebResponse tResponse = tRequest.GetResponse())
                    {
                        using (Stream dataStreamResponse = tResponse.GetResponseStream())
                        {
                            using (StreamReader tReader = new StreamReader(dataStreamResponse))
                            {
                                String responseFromFirebaseServer = tReader.ReadToEnd();
                                response = Newtonsoft.Json.JsonConvert.DeserializeObject<FCMResponse>(responseFromFirebaseServer);
                                return response;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FCMResponse EnviarNotificacion(List<string> deviceTokens, string titulo, string mensaje)
        {
            try
            {
                return EnviarNotificacion(deviceTokens, titulo, mensaje, String.Empty, String.Empty);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }

    public class FCMResponse
    {
        public string multicast_id { get; set; }
        public string success { get; set; }
        public string failure { get; set; }
        public string canonical_id { get; set; }
    }
}