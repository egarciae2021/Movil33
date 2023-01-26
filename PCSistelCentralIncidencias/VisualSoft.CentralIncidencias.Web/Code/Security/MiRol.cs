using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Collections.Specialized;
using System.Web.Caching;
using System.Web.Security;

using VisualSoft.PCSistelMovil.CentralIncidencias.BL;
using VisualSoft.PCSistelMovil.CentralIncidencias.BE;

namespace VisualSoft.CentralIncidencias.Web.Code.Security
{
    public class MiRol : RoleProvider
    {

        #region Properties

        private int _cacheTimeoutInMinutes = 30;

        #endregion

        public override void Initialize(string name, NameValueCollection config)
        {
            // Set Properties
            int val;
            if (!string.IsNullOrEmpty(config["cacheTimeoutInMinutes"]) && Int32.TryParse(config["cacheTimeoutInMinutes"], out val))
                _cacheTimeoutInMinutes = val;

            // Call base method
            base.Initialize(name, config);
        }
        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string username)
        {
            BL_CINC_Login login;
            var userRoles = new string[] { };
            try
            {
                //Return if the user is not authenticated
                if (!HttpContext.Current.User.Identity.IsAuthenticated)
                    return null;

                //Return if present in Cache
                var cacheKey = string.Format("UserRoles_{0}", username);
                if (HttpRuntime.Cache[cacheKey] != null)
                    return (string[])HttpRuntime.Cache[cacheKey];

                
                login = new BL_CINC_Login();
                List<ENT_CINC_Perfil> perfiles = login.PerfilByUsuario(username);

                if (perfiles != null)
                    userRoles = (from item in perfiles
                                 select item.Nombre).ToArray();

                //Store in cache
                HttpRuntime.Cache.Insert(cacheKey, userRoles, null, DateTime.Now.AddMinutes(_cacheTimeoutInMinutes), Cache.NoSlidingExpiration);
            }
            catch (Exception)
            {
                throw;
            }
            return userRoles.ToArray();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            var userRoles = GetRolesForUser(username);
            return userRoles.Contains(roleName);
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}