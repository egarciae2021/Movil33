using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
//using BLL;
//using ENT;
using System.Security.Cryptography;
using System.Diagnostics;
using System.IO;
using System.Xml.Serialization;
using System.ComponentModel;
using System.Threading.Tasks;
using System.Web;

namespace Utilitarios
{
    public class ClaseUtilitarios
    {
        public string getNombreDia(int num)
        {
            string dia = "";
            switch (num)
            {
                case 1:
                    dia = "Lunes";
                    break;
                case 2:
                    dia = "Martes";
                    break;
                case 3:
                    dia = "Miércoles";
                    break;
                case 4:
                    dia = "Jueves";
                    break;
                case 5:
                    dia = "Viernes";
                    break;
                case 6:
                    dia = "Sábado";
                    break;
                case 7:
                    dia = "Domingo";
                    break;
                default:
                    break;
            }
            return dia;
        }

        public string getNombreMes(int num)
        {
            string mes = "";
            switch (num)
            {
                case 1:
                    mes = "Enero";
                    break;

                case 2:
                    mes = "Febrero";
                    break;

                case 3:
                    mes = "Marzo";
                    break;

                case 4:
                    mes = "Abril";
                    break;

                case 5:
                    mes = "Mayo";
                    break;

                case 6:
                    mes = "Junio";
                    break;

                case 7:
                    mes = "Julio";
                    break;

                case 8:
                    mes = "Agosto";
                    break;

                case 9:
                    mes = "Setiembre";
                    break;

                case 10:
                    mes = "Octubre";
                    break;

                case 11:
                    mes = "Noviembre";
                    break;

                case 12:
                    mes = "Diciembre";
                    break;

                default:
                    break;
            }
            return mes;
        }

        public string getSegundos(string duracion)
        {
            int horas, minutos, segundos, final;
            string[] tiempo = duracion.Split(':');
            horas = Convert.ToInt32(tiempo[0]);
            minutos = Convert.ToInt32(tiempo[1]);
            segundos = Convert.ToInt32(tiempo[2]);

            final = (horas * 60 * 60) + (minutos * 60) + segundos;
            return final.ToString();
        }

        public string ObtenerHHMMSS(int segundos)
        {
            TimeSpan span = new TimeSpan(TimeSpan.TicksPerSecond * segundos);
            string str = span.Hours.ToString("00") + ":" + span.Minutes.ToString("00") + ":" + span.Seconds.ToString("00");
            return str;
        }

        private static int NextInt(int min, int max)
        {
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buffer = new byte[4];

            rng.GetBytes(buffer);
            int result = BitConverter.ToInt32(buffer, 0);

            return new Random(result).Next(min, max);
        }

        #region "descomentar becodigos"

        //public List<BECodigosCambio> GeneraCodigo(string usuario, string clave, int intLongCod)
        //{
        //    int viLongitud = 0;
        //    string vsDigitos = "";
        //    string strCodigoTemp = "";
        //    string strCodigo = "";
        //    bool blConcatenaCodigo = false;
        //    bool vbFindVal = false; ;
        //    int max = Int32.MaxValue;
        //    int min = 1000000000;

        //    try
        //    {
        //        //DataTable dt = new BLLClave().getDatosCodigosSucursales(usuario, clave);
        //        List<M_CODI> codigos = new BLLClave().getDatosCodigosSucursales(usuario, clave, false);
        //        //viLongitud = clave.Length;
        //        viLongitud = intLongCod;
        //        vsDigitos = max.ToString().Substring(0, viLongitud);
        //        strCodigoTemp = NextInt(int.Parse(min.ToString().Substring(0, viLongitud)), Convert.ToInt32(vsDigitos)).ToString();
        //        List<BECodigosCambio> cambios = new List<BECodigosCambio>();

        //        for (int i = 0; i < codigos.Count; i++)
        //        {
        //            blConcatenaCodigo = false;
        //            string strCodSuc = codigos[i].CODI_PF_vcCODSUC.ToString();

        //            if (codigos[i].CODI_P_vcCODUSU.ToString().Contains('-'))
        //            {
        //                blConcatenaCodigo = true;
        //            }

        //            vbFindVal = true;

        //            while (vbFindVal)
        //            {
        //                if (!new BLLUtilitarios().BuscarCodigo(strCodSuc, strCodigoTemp))
        //                {
        //                    if (blConcatenaCodigo)
        //                    {
        //                        strCodigo = strCodSuc + "-" + strCodigoTemp;
        //                        vbFindVal = false;
        //                    }
        //                    else
        //                    {
        //                        strCodigo = strCodigoTemp;
        //                        vbFindVal = false;
        //                    }
        //                    cambios.Add(new BECodigosCambio() { AntiguaClave = clave, NuevaClave = strCodigo, Usuario = usuario, Sucursal = strCodSuc });
        //                }
        //            }
        //        }

        //        return cambios;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }
        //}
        #endregion
        /// <summary>
        /// FUNCION QUE CONVIERTE DE 000000 A 00:00:00
        /// </summary>
        /// <param name="xduracion"></param>
        /// <returns></returns>
        public static string fnConvDuracionDec_String(double xduracion)
        {
            string xhor = "";
            string xmin = "";
            string xseg = "";

            xseg = xduracion.ToString();

            xhor = Convert.ToInt64((Convert.ToDouble(xseg) / 3600) - 0.5).ToString();

            if ((xhor.Trim().Length) < 2)
            {
                xhor = "0" + xhor;
            }

            xseg = (Convert.ToDouble(xseg) - (Convert.ToInt64(xhor) * 3600)).ToString();



            xmin = Convert.ToInt64((Convert.ToDouble(xseg) / 60) - 0.5).ToString();
            if (xmin.Trim().Length < 2)
            {
                xmin = "0" + xmin.Trim();
            }

            xseg = (Convert.ToDouble(xseg) - (Convert.ToInt64(xmin) * 60)).ToString();
            if (xseg.Trim().Length < 2)
            {
                xseg = "0" + xseg.Trim();
            }

            if (Convert.ToInt32(xhor) > 23)
            {
                //Prueba
                //return "23:59:59";
                return xhor.Trim() + ":" + xmin.Trim() + ":" + xseg.Trim();
            }
            else
            {
                if (xseg == "60")
                {
                    xmin = (Convert.ToInt64(xmin)).ToString();
                    xmin = (Convert.ToInt64(xmin) + 1).ToString();

                    if (xmin.Trim().Length < 2)
                    {
                        xmin = "0" + xmin.Trim();
                    }
                    xseg = "00";
                }

                if (xmin == "60")
                {
                    xhor = (Convert.ToInt64(xhor)).ToString();
                    xhor = (Convert.ToInt64(xhor) + 1).ToString();

                    if (xhor.Trim().Length < 2)
                    {
                        xhor = "0" + xhor.Trim();
                    }
                    xmin = "00";
                }

                return xhor.Trim() + ":" + xmin.Trim() + ":" + xseg.Trim();
            }
        }

        public static string Right(string original, int numberCharacters)
        {
            return original.Substring(numberCharacters > original.Length ? 0 : original.Length - numberCharacters);
        }

        public static string Left(string param, int length)
        {
            //we start at 0 since we want to get the characters starting from the
            //left and with the specified lenght and assign it to a variable
            string result = param.Substring(0, length);
            //return the result of the operation
            return result;
        }
        public static string Mid(string param, int startIndex, int length)
        {
            //start at the specified index in the string ang get N number of
            //characters depending on the lenght and assign it to a variable
            string result = param.Substring(startIndex, length);
            //return the result of the operation
            return result;
        }

        public static string Mid(string param, int startIndex)
        {
            //start at the specified index and return all characters after it
            //and assign it to a variable
            string result = param.Substring(startIndex);
            //return the result of the operation
            return result;
        }


        public void GrabarLog(Exception ex, string strRuta, string strSistema)
        {

            StackTrace st = new StackTrace(ex, true);
            StackFrame frame;
            String lineas = "";
            String columnas = "";
            String archivos = "";
            String metodos = "";

            for (int i = 0; i < st.FrameCount; i++)
            {
                frame = st.GetFrame(i);
                if (i > 0)
                {
                    lineas += ",";
                    columnas += ",";
                    archivos += ",";
                    metodos += ",";
                }
                lineas += frame.GetFileLineNumber();
                columnas += frame.GetFileColumnNumber();
                archivos += frame.GetFileName();
                metodos += frame.GetMethod().Name;
            }

            GrabarLog(ex, strRuta, strSistema, archivos, metodos, lineas, columnas, ex.Message);
        }

        public const string NombreSistema = "PCSISTEL75";
        private void GrabarLog(Exception ex, string strRuta, string strSistema, string Archivos, string Metodos, string Lineas, string Columnas, string strDescripcion)
        {
            try
            {
                if (strDescripcion.Contains("AbortInternal") ||
                (strDescripcion.Contains("Subproceso anulado") || strDescripcion.Contains("Thread was being aborted")))
                {
                    return;
                }
                else
                {
                    GrabaLogEventosProceso(ex, strSistema, "Error", "Aplicación", strDescripcion, CVisorRowXML.EnuIcono.IconoError, strRuta, Archivos, Metodos, Lineas, Columnas);
                }
            }
            catch
            {
            }
        }



        private void GrabaLogEventosProceso(Exception ex, string pstrSistema, string pstrTipoEvento, string pstrCategoria, string pstrDescripcionError,
                                            CVisorRowXML.EnuIcono pintTipoIcono, string pstrRuta, string pstrArchivos, string pstrMetodos, string pstrLineas, string pstrColumnas)
        {

            try
            {
                int code = 0;
                try
                {
                    code = ex.HResult;
                    var w32ex = ex as Win32Exception;
                    if (w32ex == null)
                    {
                        w32ex = ex.InnerException as Win32Exception;
                    }
                    if (w32ex != null)
                    {
                        code = w32ex.ErrorCode;
                    }
                }
                catch (Exception)
                {
                }

                string Usuario = "";
                if (HttpContext.Current != null && HttpContext.Current.Session["usuarioLogueado"] != null)
                {
                    try
                    {
                        Usuario = HttpContext.Current.Session["usuarioLogueado"].ToString();
                    }
                    catch (Exception)
                    {
                    }
                }

                if (pstrSistema == "PcSistelAprovisionamientoWeb")
                {
                    pstrSistema = "PCSistel Web Aprovisionamiento";
                }

                int IdDominio = 0;
                string IPCliente = "";
                PCSistelMovilLog45.LogBE oLog = new PCSistelMovilLog45.LogBE();
                oLog.Usuario = Usuario;
                oLog.IdCliente = IdDominio;
                oLog.IPCliente = IPCliente;
                oLog.Aplicativo = pstrSistema;
                oLog.Categoria = pstrCategoria;
                oLog.Codigo = code.ToString();
                oLog.Detalle = ex.StackTrace;
                oLog.Equipo = Environment.MachineName;
                oLog.FechaHora = DateTime.Now;
                oLog.Gravedad = PCSistelMovilLog45.LogBE.eGravedad.Critico;
                oLog.Mensaje = ex.Message;
                oLog.Nivel = PCSistelMovilLog45.LogBE.eNivel.Error;
                Task.Run(async () =>
                {
                    PCSistelMovilLog45.Token oToken = await PCSistelMovilLog45.Log.GenerarToken("mpajuelo@pcsistel.com", "Aa123456!");
                    await PCSistelMovilLog45.Log.Registrar(oLog, oToken);
                }).Wait();
            }
            catch (Exception)
            {
                //throw;
            }

            ////try
            ////{
            ////    Visor objServicio = new Visor();
            ////    CVisorXML m_Visor = new CVisorXML();

            ////    string pstrArchivoXML = pstrSistema + "_" + string.Format("{0:MM}", DateTime.Now) + string.Format("{0:yy}", DateTime.Now) + ".xml";
            ////    string strDirectorioArchivoXML = pstrRuta + "\\LogErrores\\";

            ////    //*************************************************************************
            ////    //Datos de Evento
            ////    //*************************************************************************
            ////    if (File.Exists(strDirectorioArchivoXML + "\\" + pstrArchivoXML))
            ////    {
            ////        FileInfo fichero = new FileInfo(strDirectorioArchivoXML + "\\" + pstrArchivoXML);
            ////        //obtenemos el tamaño del fichero en MB
            ////        if ((fichero.Length / 1048576) > 10)
            ////        {
            ////            // si es mayor, se procede a renombrar el archivo
            ////            File.Copy(strDirectorioArchivoXML + "\\" + pstrArchivoXML, strDirectorioArchivoXML + "\\" + pstrArchivoXML.Substring(0, pstrArchivoXML.Length - 4) + "_" + DateTime.Now.Day.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + ".xml");
            ////            File.Delete(strDirectorioArchivoXML + "\\" + pstrArchivoXML);

            ////            // y se crea uno nuevo
            ////            CVisorRowXML[] filasEventos = new CVisorRowXML[2];
            ////            filasEventos[0] = new CVisorRowXML();
            ////            procAgregarLogXML(ref filasEventos[0], pstrSistema, pstrTipoEvento, pstrCategoria, pstrDescripcionError, pintTipoIcono, pstrArchivos, pstrMetodos, pstrLineas, pstrColumnas);
            ////            m_Visor.rowVisor = filasEventos;
            ////            objServicio.SerializarDatos(strDirectorioArchivoXML, pstrArchivoXML, m_Visor.rowVisor);
            ////        }
            ////        else
            ////        {
            ////            m_Visor = (CVisorXML)objServicio.DeserializarDatos(strDirectorioArchivoXML, pstrArchivoXML);
            ////            CVisorRowXML[] filasEventos = null;
            ////            filasEventos = m_Visor.rowVisor;
            ////            int intNroFilaActual = 0;
            ////            intNroFilaActual = filasEventos.GetLength(0);
            ////            //intNroFilaActual += 1
            ////            Array.Resize(ref filasEventos, intNroFilaActual + 1);

            ////            filasEventos[intNroFilaActual] = new CVisorRowXML();
            ////            procAgregarLogXML(ref filasEventos[intNroFilaActual], pstrSistema, pstrTipoEvento, pstrCategoria, pstrDescripcionError, pintTipoIcono, pstrArchivos, pstrMetodos, pstrLineas, pstrColumnas);

            ////            m_Visor.rowVisor = filasEventos;
            ////            objServicio.SerializarDatos(strDirectorioArchivoXML, pstrArchivoXML, m_Visor.rowVisor);
            ////            //*************************************************************************
            ////        }
            ////    }
            ////    else
            ////    {
            ////        CVisorRowXML[] filasEventos = new CVisorRowXML[2];
            ////        filasEventos[0] = new CVisorRowXML();
            ////        procAgregarLogXML(ref filasEventos[0], pstrSistema, pstrTipoEvento, pstrCategoria, pstrDescripcionError, pintTipoIcono, pstrArchivos, pstrMetodos, pstrLineas, pstrColumnas);

            ////        m_Visor.rowVisor = filasEventos;
            ////        objServicio.SerializarDatos(strDirectorioArchivoXML, pstrArchivoXML, m_Visor.rowVisor);
            ////    }

            ////    //event viewer ERROR
            ////    //MyEventViewer.WriteEntry(pstrDescripcionError)
            ////}
            ////catch (Exception ex)
            ////{
            ////}
        }



        private void procAgregarLogXML(ref CVisorRowXML objFila, string pstrSistema, string pstrTipoEvento,
                                                string pstrCategoria, string pstrDescripcionError, CVisorRowXML.EnuIcono pintTipoIcono,
                                                string pstrArchivos, string pstrMetodos, string pstrLineas, string pstrColumnas)
        {

            try
            {
                string[] mArchivos = pstrArchivos.Split(',');
                string[] mMetodos = pstrMetodos.Split(',');
                string[] mLineas = pstrLineas.Split(',');
                string[] mColumnas = pstrColumnas.Split(',');

                objFila.tipo = pstrTipoEvento;
                objFila.tipoIcono = pintTipoIcono;
                objFila.fechahora = System.DateTime.Now;
                objFila.categoria = pstrCategoria;
                objFila.descripcion = pstrDescripcionError;
                objFila.sistema = pstrSistema;

                List<CVisorRowXML.cArchivo> lstArchivo = new List<CVisorRowXML.cArchivo>();
                for (int x = 0; x <= mArchivos.Length - 1; x++)
                {
                    CVisorRowXML.cArchivo objArchivo = new CVisorRowXML.cArchivo();
                    objArchivo.Columna = mColumnas[x];
                    objArchivo.Linea = mLineas[x];
                    objArchivo.Metodo = mMetodos[x];
                    objArchivo.NombreArchivo = mArchivos[x];
                    lstArchivo.Add(objArchivo);
                }
                if (lstArchivo.Count > 0)
                {
                    objFila.archivo = lstArchivo;
                }

            }
            catch (Exception ex)
            {
            }

        }


    }
}


#region Log XML

[Serializable()]
public class CVisorRowXML
{
    public enum EnuIcono : byte
    {
        IconoError = 0,
        IconoPrecaucion = 1,
        IconoInformativo = 2
    }

    [Serializable()]
    public class cArchivo
    {
        [XmlElement()]
        public string NombreArchivo;
        [XmlElement()]
        public string Metodo;
        [XmlElement()]
        public string Linea;
        [XmlElement()]
        public string Columna;
    }

    [XmlElement()]
    public string sistema;
    [XmlElement()]
    public EnuIcono tipoIcono;
    [XmlElement()]
    public string tipo;
    [XmlElement()]
    public System.DateTime fechahora;
    [XmlElement()]
    public string categoria;
    [XmlElement()]
    public string descripcion;
    [XmlElement()]
    public List<cArchivo> archivo;
}
[Serializable(), XmlRoot()]
public class CVisorXML
{
    [XmlArray("Filas"), XmlArrayItem("Fila")]
    public CVisorRowXML[] rowVisor;
}
public class Visor : MarshalByRefObject
{
    // método que serializa los datos de configuración
    // al archivo que se indique, devuelve True si completa la serialización
    public bool SerializarDatos(string pstrRuta, string pstrArchivo, CVisorRowXML[] prowVisor)
    {
        //strArchivo = Configuration.ConfigurationSettings.AppSettings("rutaConfigCaptura") & strArchivo
        //Dim strArchivo As String = "C:\" & pstrArchivo
        //Util.Log.GenerarEntrada("prueba remoting", strArchivo, EventLogEntryType.Information)
        try
        {
            CVisorXML oVisor = new CVisorXML();
            var _with1 = oVisor;
            _with1.rowVisor = prowVisor;

            File.Delete(pstrRuta + "\\" + pstrArchivo);
            Stream s = File.Open(pstrRuta + "\\" + pstrArchivo, FileMode.Create, FileAccess.Write, FileShare.Read);
            //Dim sw As New StreamWriter(DevolverRutaComun() & "\" & pstrArchivo)
            XmlSerializer xs = new XmlSerializer(oVisor.GetType());
            xs.Serialize(s, oVisor);
            s.Close();
            return true;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(ex.Message, ex);
        }
    }

    // método que deserializa los datos y retorna el objeto original
    public object DeserializarDatos(string pstrRuta, string pstrArchivo)
    {
        CVisorXML oVisor = new CVisorXML();
        try
        {
            FileStream s = File.Open(pstrRuta + "\\" + pstrArchivo, FileMode.Open, FileAccess.Read, FileShare.Read);
            //Dim sr As New StreamReader(DevolverRutaComun() & "\" & pstrArchivo)
            XmlSerializer xs = new XmlSerializer(oVisor.GetType());
            oVisor = (CVisorXML)xs.Deserialize(s);
            s.Close();
            return (object)oVisor;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(ex.Message, ex);
        }
    }

}

#endregion