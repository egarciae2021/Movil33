using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PCSistelGateway.Helpers;
using PCSistelGateway.Models;

namespace PCSistelGateway.Logic
{
    public static class RedirectLogic
    {

        public static Boolean Redirect(CargarDatosContext dc, Int32 aplicacionId)
        {
            try
            {
                var mensaje = String.Empty;
                if (dc.session.GetAccesos() != null)
                {
                    
                }
                return false;

            }
            catch (Exception)
            {
                return false;
            }

        }
    }
}