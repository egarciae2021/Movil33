using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PCSistelGateway.Logic;
using PCSistelGateway.Logic.Base;

namespace PCSistelGateway.Helpers
{
    public enum LoguerType
    {
        DataBase,
        File,
        Console
    }

    public static class LoguerHelpers
    {
        public static void Log(Exception ex, int? usuarioId, LoguerType type = LoguerType.File)
        {
            LoguerBase loguer;
            switch (type)
            {
                case LoguerType.DataBase:
                    loguer = new DBLoguerLogic();
                    loguer.Log(ex, usuarioId);
                    break;
                case LoguerType.File:
                    loguer = new FileLoguerLogic();
                    loguer.Log(ex, usuarioId);
                    break;
                case LoguerType.Console:
                    loguer = new ConsoleLoguerLogic();
                    loguer.Log(ex, usuarioId);
                    break;
                default:
                    break;
            }
        }
    }
}