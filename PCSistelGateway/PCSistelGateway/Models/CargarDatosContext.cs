using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using PCSistelGateway.Logic;

namespace PCSistelGateway.Models
{
    public class CargarDatosContext
    {
        //public ServicesLogic service { get; set; }
        //public TDPALMEntities context { get; set; }

        public FirebaseLogic fbs { get; set; }

        public Controllers.BaseController baseController { get; set; }
        public HttpSessionStateBase session { get; set; }
        public HttpContextBase httpContext { get; set; }
        public String currentLanguage { get; set; }
    }
}