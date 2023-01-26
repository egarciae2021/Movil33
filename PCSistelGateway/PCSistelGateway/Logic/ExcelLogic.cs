using Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace PCSistelGateway.Logic
{
    public class ExcelLogic
    {
        public static DataTable ExtractExcelToDataTable(HttpPostedFileBase file)
        {
            file.InputStream.Position = 0;

            String fileExtension = System.IO.Path.GetExtension(file.FileName);

            if (fileExtension == ".xls" || fileExtension == ".xlsx")
            {
                IExcelDataReader excelReader = null;

                if (fileExtension == ".xls")
                    excelReader = ExcelReaderFactory.CreateBinaryReader(file.InputStream);
                else if (fileExtension == ".xlsx")
                    excelReader = ExcelReaderFactory.CreateOpenXmlReader(file.InputStream);

                excelReader.IsFirstRowAsColumnNames = true;
                DataSet result = excelReader.AsDataSet();

                file.InputStream.Position = 0;
                return result.Tables[0];
            }

            return new DataTable();
        }
    }
}