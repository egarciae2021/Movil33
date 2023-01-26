using PCSistelGateway.Filters;
using PCSistelGateway.Helpers;
using PCSistelGateway.ViewModels.GatewayC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PCSistelGateway.Controllers
{
    [AppAuthorize(AppRol.Administrador)]
    public class GatewayCController : BaseController
    {
        // GET: GatewayC
        public ActionResult Index(IndexViewModel model)
        {
            var vm = new IndexViewModel();
            vm.Fill(model);
            return View(vm);
        }

        public PartialViewResult _ListGatewayC(IndexViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TryUpdateModel(model);
                return PartialView(model);
            }

            var vm = new _ListGatewayCViewModel();
            vm.Fill(model);
            
            return PartialView(vm);
        }

        public ActionResult ViewGatewayC(Int32? Id)
        {
            var vm = new ViewGatewayCViewModel();
            vm.Fill(Id);
            return View(vm);
        }
    }
}