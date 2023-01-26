using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace PCSistelGateway.Helpers
{
    public static class UrlExtensionHelpers
    {
        public static string ContentVersionFile(this UrlHelper self, string contentPath)
        {
            string versionedContentPath = contentPath + "?v=" + Assembly.GetAssembly(typeof(UrlExtensionHelpers)).GetName().Version.ToString();
            return self.Content(versionedContentPath);
        }
    }
}