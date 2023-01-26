using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Models.Entities
{
    public class SEG_RolUsuario
    {
        private SEG_Rol _Rol;

        public SEG_RolUsuario()
        {
            _Rol = new SEG_Rol();
        }
        public int IdRolUsuario { get; set; }
        public int IdUsuario { get; set; }
        public bool EsPredefinido { get; set; }
        public SEG_Rol Rol
        {
            get { return _Rol; }
            set { _Rol = value; }
        }


    }
}