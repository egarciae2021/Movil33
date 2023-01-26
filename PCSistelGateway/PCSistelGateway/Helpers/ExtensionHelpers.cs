using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;

namespace PCSistelGateway.Helpers
{
    public static class ExtensionHelpers
    {
        public static Boolean HasRole(this AppRol[] lstRol, params AppRol[] rol)
        {
            try
            {
                foreach (var item in rol)
                    if (lstRol.Contains(item))
                        return true;
            }
            catch (Exception)
            {

            }
            return false;
        }

        public static MvcHtmlString TryPartial<TModel>(this HtmlHelper<TModel> html, string viewName, object model)
        {
            try
            {
                return html.Partial(viewName, model);
            }
            catch (Exception ex)
            {
                return MvcHtmlString.Create("<div>" + ex.ToString() + "</div");
            }
        }

        public static MvcHtmlString DescriptionFor<TModel, TValue>(this HtmlHelper<TModel> html, Expression<Func<TModel, TValue>> expression, object htmlAttributes = null)
        {
            var metadata = ModelMetadata.FromLambdaExpression(expression, html.ViewData);

            var builder = new TagBuilder("span");
            builder.SetInnerText(metadata.Description);
            builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            return MvcHtmlString.Create(builder.ToString(TagRenderMode.Normal));
        }

        public static IHtmlString GoogleTagManager(this HtmlHelper html)
        {
            var analytics = ConvertHelpers.GetAppSeting("Google.Analytics");
            if (String.IsNullOrEmpty(analytics))
            {
                return null;
            }

            var tagScriptDeclaration = new TagBuilder("script");
            tagScriptDeclaration.Attributes.Add("src", $"https://www.googletagmanager.com/gtag/js?id={analytics}");
            tagScriptDeclaration.Attributes.Add("async", null);

            var script = new System.Text.StringBuilder();
            script.Append("window.dataLayer = window.dataLayer || [];");
            script.Append("function gtag() { dataLayer.push(arguments) };");
            script.Append("gtag('js', new Date());");
            script.Append("gtag('config', '" + analytics + "');");

            var tagScript = new TagBuilder("script");
            tagScript.InnerHtml = script.ToString();

            var result = $"{tagScriptDeclaration.ToString(TagRenderMode.Normal)}{Environment.NewLine}\t{tagScript.ToString(TagRenderMode.Normal)}";
            return new HtmlString(result);
        }

        public static IHtmlString GoogleRecaptcha(this HtmlHelper html)
        {
            var tagScript = new TagBuilder("script");
            tagScript.Attributes.Add("src", "https://www.google.com/recaptcha/api.js");
            return new HtmlString(tagScript.ToString(TagRenderMode.Normal));
        }

    }
}