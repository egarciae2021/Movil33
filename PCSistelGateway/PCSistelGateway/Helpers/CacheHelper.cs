using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Helpers
{
    internal static class CacheHelper
    {
        public static void Add<T>(T o, string key, Int32 expirationMinutes = 60) where T : class
        {
            var cacheTime = Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["CacheExpirationMinutes"]);

            HttpContext.Current.Cache.Insert(key, o, null, DateTime.Now.AddMinutes(cacheTime == 0 ? expirationMinutes : cacheTime), System.Web.Caching.Cache.NoSlidingExpiration);
        }

        public static void Add(Object o, string key, Int32 expirationMinutes = 60)
        {
            var cacheTime = Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["CacheExpirationMinutes"]);

            HttpContext.Current.Cache.Insert(key, o, null, DateTime.Now.AddMinutes(cacheTime == 0 ? expirationMinutes : cacheTime), System.Web.Caching.Cache.NoSlidingExpiration);
        }

        public static void Clear(string key)
        {
            try
            {
                HttpContext.Current.Cache.Remove(key);
            }
            catch
            {
                return;
            }
        }

        public static void Replace<T>(T o, string key) where T : class
        {
            Clear(key);
            Add<T>(o, key);
        }

        public static void Replace(Object o, string key)
        {
            Clear(key);
            Add(o, key);
        }

        public static bool Exists(string key)
        {
            return HttpContext.Current.Cache[key] != null;
        }

        public static T Get<T>(string key) where T : class
        {
            try
            {
                return (T)HttpContext.Current.Cache[key];
            }
            catch
            {
                return null;
            }
        }
    }

}