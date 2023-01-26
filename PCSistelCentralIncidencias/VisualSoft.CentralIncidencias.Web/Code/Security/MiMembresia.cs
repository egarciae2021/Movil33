using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

using System.Collections.Specialized;

using VisualSoft.PCSistelMovil.CentralIncidencias.BL;
using VisualSoft.PCSistelMovil.CentralIncidencias.BE;

namespace VisualSoft.CentralIncidencias.Web.Code.Security
{
    public class MiMembresia : MembershipProvider
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

        public override bool ChangePassword(string username, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public override bool ChangePasswordQuestionAndAnswer(string username, string password, string newPasswordQuestion, string newPasswordAnswer)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser CreateUser(string username, string password, string email, string passwordQuestion, string passwordAnswer, bool isApproved, object providerUserKey, out MembershipCreateStatus status)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteUser(string username, bool deleteAllRelatedData)
        {
            throw new NotImplementedException();
        }

        public override bool EnablePasswordReset
        {
            get { throw new NotImplementedException(); }
        }

        public override bool EnablePasswordRetrieval
        {
            get { throw new NotImplementedException(); }
        }

        public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override int GetNumberOfUsersOnline()
        {
            throw new NotImplementedException();
        }

        public override string GetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser GetUser(string username, bool userIsOnline)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
        {
            throw new NotImplementedException();
        }

        public override string GetUserNameByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public override int MaxInvalidPasswordAttempts
        {
            get { throw new NotImplementedException(); }
        }

        public override int MinRequiredNonAlphanumericCharacters
        {
            get { throw new NotImplementedException(); }
        }

        public override int MinRequiredPasswordLength
        {
            get { throw new NotImplementedException(); }
        }

        public override int PasswordAttemptWindow
        {
            get { throw new NotImplementedException(); }
        }

        public override MembershipPasswordFormat PasswordFormat
        {
            get { throw new NotImplementedException(); }
        }

        public override string PasswordStrengthRegularExpression
        {
            get { throw new NotImplementedException(); }
        }

        public override bool RequiresQuestionAndAnswer
        {
            get { throw new NotImplementedException(); }
        }

        public override bool RequiresUniqueEmail
        {
            get { throw new NotImplementedException(); }
        }

        public override string ResetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override bool UnlockUser(string userName)
        {
            throw new NotImplementedException();
        }

        public override void UpdateUser(MembershipUser user)
        {
            throw new NotImplementedException();
        }

        public override bool ValidateUser(string username, string password)
        {
            bool resultado = false;
            BL_CINC_Login login;
            try
            {
                login = new BL_CINC_Login();
                ENT_CINC_Usuario usuario = login.Acreditar(username, password);
                resultado = usuario.IdUsuario != -1;
                if (resultado)
                {
                    if (usuario.Foto.Tamano > 0)
                    {
                        byte[] barrImg = usuario.Foto.Archivo;
                        usuario.Foto.Archivo = null;
                        string nombreArchivo = Guid.NewGuid().ToString().Replace("-", "") + "." + usuario.Foto.Extencion;
                        string strfn = System.Web.HttpContext.Current.Server.MapPath("~/Temp/" + nombreArchivo);
                        usuario.Foto.Nombre = nombreArchivo;
                        System.IO.FileStream fs = new System.IO.FileStream(strfn, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.Write);
                        using (fs)
                        {
                            fs.Write(barrImg, 0, barrImg.Length);
                            fs.Flush();
                            fs.Close();
                        }
                    }

                    System.Web.HttpContext.Current.Session.Add("SesionUsuario", usuario);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return resultado;
        }


    }
}