using System.Web;
using System.Web.Optimization;

namespace VisualSoft.MovilNetCloud.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/esencial").Include(
                        "~/Common/Scripts/Jquery/jquery-{version}.js",
                        "~/Scripts/modernizr-{version}.js",
                        "~/Common/Scripts/Bootstrap/js/bootstrap.js",
                        "~/Common/Scripts/jquery.Storage.js",
                        "~/Common/Scripts/VisualSoft.MovilNet.Site.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/esencial").Include(
                "~/Common/Style/normalize.css",
                "~/Common/Scripts/Bootstrap/css/bootstrap3.css",
                "~/Common/Style/Operador.MovilNetCloud.Site.css"
                ));

            bundles.Add(new ScriptBundle("~/bundles/BootsJS").Include(
                "~/Common/Scripts/Bootstrap/js/bootstrap.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/Capcha").Include(
                "~/Common/Scripts/Seguridad/md5.js",
                "~/Common/Scripts/Seguridad/jcap.js"
                ));


            #region Login
            bundles.Add(new ScriptBundle("~/bundles/Login/Index").Include("~/Common/Views/Login/Index.js"));
            bundles.Add(new StyleBundle("~/Content/Login/Index").Include("~/Common/Views/Login/Index.css"));

            bundles.Add(new ScriptBundle("~/bundles/Login/AccesoTDP").Include("~/Common/Views/Login/Index.js"));
            bundles.Add(new StyleBundle("~/Content/Login/AccesoTDP").Include("~/Common/Views/Login/Index.css"));

            bundles.Add(new ScriptBundle("~/bundles/Login/ConfigBD").Include("~/Common/Views/Login/ConfigBD.js"));
            bundles.Add(new StyleBundle("~/Content/Login/ConfigBD").Include("~/Common/Views/Login/ConfigBD.css"));
            #endregion

        }
    }
}