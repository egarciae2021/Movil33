using Newtonsoft.Json;
using PCSistelGateway.Helpers;
using PCSistelGateway.Models.Entities;
using PCSistelGateway.Models.Entities.Cookies;
using PCSistelGateway.Models.Response;
using PCSistelGateway.ViewModels.Login;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PCSistelGateway.Controllers
{
    public class LoginController : BaseController
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Index(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TryUpdateModel(model);
                return View(model);
            }
            
            CookieHelpers.DeleteAll();
            try
            {
                if (model.Codigo == null || model.Password == null)
                {
                    throw new Exception("Debe ingresar un usuario y/o Contraseña.");
                }

                var data = new
                {
                    username = model.Codigo,
                    Password = model.Password
                };
                
                var result = await GetCredentials(data);
                var userResponse = JsonConvert.DeserializeObject<UserResponse>(result);

                if (userResponse == null)
                {
                    throw new Exception("Usuario y/o Contraseña incorrectos.");
                }
                else
                {
                    var elements = userResponse.dataUsuario.Split(';');
                    if (elements[0].Equals("ERR"))
                        throw new Exception("Usuario y/o Contraseña incorrectos.");

                    var userData = elements[1].Split('|');

                    var rol = elements[2].Split('~');
                    if (rol.Length == 0)
                        throw new Exception("No tiene permisos para ingresar al Sistema, Comuníquese con el administrador.");                    

                    List<SEG_RolUsuario> lstRoles = new List<SEG_RolUsuario>();
                    foreach (var item in rol)
                    {
                        var _roles = item.Split('|');
                        SEG_RolUsuario rolUsuario = new SEG_RolUsuario();
                        rolUsuario.IdRolUsuario = Convert.ToInt32(_roles[0]);
                        rolUsuario.Rol.IdRol = Convert.ToInt32(_roles[1]);
                        rolUsuario.Rol.Nombre = _roles[2];
                        rolUsuario.Rol.Acronimo = _roles[3];
                        rolUsuario.EsPredefinido = Convert.ToBoolean(Convert.ToInt32(_roles[4]));
                        lstRoles.Add(rolUsuario);
                    }

                    var rolDefault = lstRoles.FirstOrDefault(x => x.EsPredefinido);
                    if (rolDefault == null)
                    {
                        rolDefault = lstRoles.FirstOrDefault();
                    }

                    Session.Clear();

                    AppRol _rol = new AppRol();

                    Session.Set(SessionKey.UsuarioId, userData[0]);
                    Session.Set(SessionKey.NombreCompleto, userData[2]);
                    Session.Set(SessionKey.Codigo, userData[1]);
                    Session.Set(SessionKey.Email, userData[3]);
                    Session.Set(SessionKey.RolId, rol[0]);
                    switch (rolDefault.Rol.Acronimo)
                    {
                        case ConstantHelpers.ROL.ADMINISTRADOR: _rol = AppRol.Administrador; break;
                        default: return RedirectToAction("Index");
                    }
                    Session.Set(SessionKey.Rol, _rol);
                    Session.Set(SessionKey.RolCompleto, rolDefault.Rol.Nombre);

                    var lstAccesos = lstRoles.Select(x => new AccesoEntityCoockie() { RolId = x.Rol.IdRol, Nombre = x.Rol.Nombre, Acronimo = x.Rol.Acronimo }).ToList();
                    Session.Set(SessionKey.Accesos, lstAccesos);
                    var roles = ConstantHelpers.ROL.SetRoles(lstAccesos.Select(x => x.Acronimo).ToList());
                    Session.Set(SessionKey.Roles, roles);

                    Session.SetCookie();

                    return RedirectToAction("Index", "Home");
                }
            }
            catch (Exception ex)
            {
                PostMessage(MessageType.Error, ex.Message);
                Session.Clear();
            }

            return View(model);
        }

        private static async Task<string> GetCredentials(object obj)
        {
            var result = "";
            var jsonString = JsonConvert.SerializeObject(obj);
            using (var stringContent = new StringContent(jsonString, System.Text.Encoding.UTF8, "application/json"))
            using (var client = new HttpClient())
            {
                try
                {

                    var response = await client.PostAsync(String.Format("{0}/Account/Login", ConstantHelpers.URL_GATEWAY), stringContent);
                    var data = await response.Content.ReadAsStringAsync();
                    result = data;
                }
                catch (Exception ex)
                {
                    result = "ERR";
                }
            }
            return result;
        }

        public ActionResult Logout()
        {
            Session.Clear();
            CookieHelpers.DeleteAll();
            return RedirectToAction("Index");
        }
    }
}