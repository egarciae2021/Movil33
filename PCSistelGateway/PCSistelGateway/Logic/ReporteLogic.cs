using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PCSistelGateway.Logic
{
    public class ReporteLogic
    {
        public String ExtensionReporte(String Type)
        {
            switch (Type.ToUpper())
            {
                case "WORD": return ".doc";
                case "EXCEL": return ".xls";
                case "PDF": return ".pdf";
            }
            return String.Empty;
        }

        public FileContentResult GenerarReporte(ReportDataSource ReportDataSource, String Type, String Path, String NombreArchivo)
        {
            List<ReportDataSource> ListReportDataSources = new List<ReportDataSource>();
            ListReportDataSources.Add(ReportDataSource);
            return GenerarReporte(ListReportDataSources, Type, Path, NombreArchivo, null);
        }

        public FileContentResult GenerarReporte(ReportDataSource ReportDataSource, String Type, String Path, String NombreArchivo, Dictionary<String, Object> dictReportParameters)
        {
            List<ReportDataSource> ListReportDataSources = new List<ReportDataSource>();
            ListReportDataSources.Add(ReportDataSource);
            return GenerarReporte(ListReportDataSources, Type, Path, NombreArchivo, dictReportParameters);
        }

        public FileContentResult GenerarReporte(List<ReportDataSource> ListReportDataSources, String Type, String Path, String NombreArchivo)
        {
            return GenerarReporte(ListReportDataSources, Type, Path, NombreArchivo, null);
        }

        public FileContentResult GenerarReporte(List<ReportDataSource> ListReportDataSources, String Type, String Path, String NombreArchivo, Dictionary<String, Object> dictReportParameters)
        {

            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Path;

            if (ListReportDataSources != null)
            {
                foreach (var reporteDataSource in ListReportDataSources)
                {
                    localReport.DataSources.Add(reporteDataSource);
                }
            }


            if (dictReportParameters != null)
            {
                ReportParameter reportParamater;
                localReport.EnableExternalImages = true;
                foreach (KeyValuePair<String, Object> dictReportParameter in dictReportParameters)
                {

                    reportParamater = new ReportParameter(dictReportParameter.Key, dictReportParameter.Value.ToString());
                    localReport.SetParameters(reportParamater);
                }
            }

            string reportType = Type;
            string mimeType;
            string encoding;
            string fileNameExtension;


            string deviceInfo =

            "<DeviceInfo>" +
            "  <OutputFormat>" + Type + "</OutputFormat>" +
            "</DeviceInfo>";

            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;

            renderedBytes = localReport.Render(
                reportType,
                deviceInfo,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streams,
                out warnings);

            FileContentResult File = new FileContentResult(renderedBytes, mimeType) { FileDownloadName = NombreArchivo + ExtensionReporte(Type) };
            return File;

        }
        //public FileContentResult GenerarReporte(ReportDataSource ReportDataSource, String Type, String Path, String NombreArchivo, Dictionary<String, Object> dictReportParameters = null)
        //{

        //    LocalReport localReport = new LocalReport();
        //    localReport.ReportPath = Path;
        //    localReport.DataSources.Add(ReportDataSource);

        //    if (dictReportParameters != null)
        //    {
        //        ReportParameter reportParamater;
        //        localReport.EnableExternalImages = true;
        //        foreach (KeyValuePair<String, Object> dictReportParameter in dictReportParameters)
        //        {

        //            reportParamater = new ReportParameter(dictReportParameter.Key, dictReportParameter.Value.ToString());
        //            localReport.SetParameters(reportParamater);
        //        }
        //    }

        //    string reportType = Type;
        //    string mimeType;
        //    string encoding;
        //    string fileNameExtension;

        //    string deviceInfo =
        //    "<DeviceInfo>" +
        //    "  <OutputFormat>" + Type + "</OutputFormat>" +
        //    "</DeviceInfo>";

        //    Warning[] warnings;
        //    string[] streams;
        //    byte[] renderedBytes;

        //    renderedBytes = localReport.Render(
        //        reportType,
        //        deviceInfo,
        //        out mimeType,
        //        out encoding,
        //        out fileNameExtension,
        //        out streams,
        //        out warnings);

        //    FileContentResult File = new FileContentResult(renderedBytes, mimeType) { FileDownloadName = NombreArchivo + ExtensionReporte(Type) };
        //    return File;

        //}
    }
}