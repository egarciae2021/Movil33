using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PCSistelGateway.ViewModels.Login
{
    public class LoginViewModel
    {
        //[Required]
        public string Codigo { get; set; }
        //[Required]
        public string Password { get; set; }
    }
}