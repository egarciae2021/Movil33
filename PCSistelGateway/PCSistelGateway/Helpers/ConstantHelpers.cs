
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc.Ajax;
using PCSistelGateway.Helpers;

namespace PCSistelGateway.Helpers
{
    public class ConstantHelpers
    {
        public const int ROL_ADMINISTRADOR_KEY = 1;

        public enum enTipoSipTrunk
        {
            Principales = 1,
            Backups = 2
        }

        public static readonly int DEFAULT_PAGE_SIZE = 20;
        public static readonly int DEFAULT_PAGE_SIZE_MODAL = 10;
        public static readonly int FAMILIA_SOLO_CHIP = 3;
        public static readonly int FAMILIA_EQUIPO_CHIP = 7;

        public static readonly string MENSAJE_MODAL_MULTIREGISTROS = "Los registros agregados en una acción anterior no se podrán quitar desde esta ventana.";
        public static readonly string URL_GATEWAY = ConfigurationManager.AppSettings["WebApiGateway"].ToString();

        public static class EXTENSION_REPORTE
        {
            public static readonly String PDF = "PDF";
            public static readonly String EXCEL = "XLS";
        }

        public static class PLANTILLA
        {
            public const Int32 CAMPANA_SIP_ID = 1;
            public const Int32 LICITACIONES_ID = 2;
            public const Int32 MOVIL = 3;
        }

        public static class AREAS
        {
            public const string ADMIN = "Admin";
            public const string CMB2B = "CMB2B";
            public const string FIJA = "Fija";
            public const string PAYBACK = "PayBack";
            public const string MOVIL = "Movil";
            public const string TICKETS = "Tickets";

            public const Int32 CMB2B_ID = 1;
            public const Int32 FIJA_ID = 2;
            public const Int32 PAYBACK_ID = 3;
            public const Int32 ADMIN_ID = 4;
            public const Int32 TICKETD_ID = 5;
            public const Int32 PAYBACK_MOVIL_ID = 6;
        }

        public static class LAYOUT
        {
            public static readonly String MODAL_LAYOUT_PATH = "~/Views/Shared/_ModalLayout.cshtml";
            public static readonly String MODAL_EMAIL_PATH = "~/Views/Shared/_MailLayout.cshtml";
            public static readonly String DEFAULT_LAYOUT_PATH = "~/Views/Shared/_Layout.cshtml";
            public static readonly String DEFAULT_TEMPLATE_PATH = "~/Files/templates/";
            public static readonly String MODAL_LAYOUTSAVE_PATH = "~/Views/Shared/_ModalLayout_Save.cshtml";
        }

        public static class ROL
        {
            public const string ADMINISTRADOR = "ADM";
            public const string PRODUCT_MARKER = "ANL";
            public const string RESPONSABLE_COMERCIAL = "RCO";
            public const string VISOR_FIJA = "VIF";
            public const string PAYBACK = "PFI";
            public const string PAYBACK_ADM = "PFA";
            public const string USUARIO = "USR";
            public const string TICKETS = "TIC";
            public const string GESTOR_TICKETS = "GTI";
            public const string PAYBACK_MOBIL = "PMO";
            public const string PAYBACK_MOBIL_ADM = "PMA";
            public const string COMERCIALMOVIL = "COM";
            public const string PREVENTAMOVIL = "PVM";
            public const string PRODUCTOMOVIL = "PRO";
            public const string CONTROLFINANZASMOVIL = "FIN";
            public const string JEFE_FINANZASMOVIL = "JFN";
            public const string CONTROLFINANZASFIJA = "CFF";
            public const string JEFE_FINANZASFIJA = "JFF";
            public const string PRODUCTOFIJA = "PRF";
            public const string PREVENTAFIJA = "PVF";
            public const string COMERCIALFIJA = "COF";
            public const string GESTOR_APLICATIVO = "GAP";

            public static string GetNombreRol(string acronimo)
            {
                switch (acronimo)
                {
                    case ADMINISTRADOR: return "Administrador";
                    case PRODUCT_MARKER: return "Product Marker";
                    case RESPONSABLE_COMERCIAL: return "Responsable Comercial";
                    case VISOR_FIJA: return "Visor Fija";
                    case PAYBACK: return "Visor PayBack Fija";
                    case PAYBACK_ADM: return "Adm PayBack Fija";
                    case TICKETS: return "Tickets";
                    case PAYBACK_MOBIL: return "Payback Movil";
                    case PAYBACK_MOBIL_ADM: return "Payback Movil Adm";
                    case GESTOR_TICKETS: return "Gestor de Tickets";
                    case GESTOR_APLICATIVO: return "Gestor de Aplicaciones";
                    default: return String.Empty;
                }
            }

            public static AppRol? GetRol(string acronimo)
            {
                switch (acronimo)
                {
                    case ADMINISTRADOR:
                        return AppRol.Administrador;
                    case PRODUCT_MARKER:
                        return AppRol.ProductMarker;
                    case RESPONSABLE_COMERCIAL:
                        return AppRol.ResponsableComercial;
                    case VISOR_FIJA:
                        return AppRol.VisorFIJA;
                    case PAYBACK:
                        return AppRol.PayBackFIJA;
                    case PAYBACK_ADM:
                        return AppRol.PayBackFIJAAdm;
                    case TICKETS:
                        return AppRol.Tickets;
                    case GESTOR_TICKETS:
                        return AppRol.GestorTickets;
                    case PAYBACK_MOBIL:
                        return AppRol.PayBackMOBILE;
                    case PAYBACK_MOBIL_ADM:
                        return AppRol.PayBackMOBILEAdm;
                    case COMERCIALMOVIL:
                        return AppRol.ComercialMovil;
                    case PREVENTAMOVIL:
                        return AppRol.PreVentaMovil;
                    case PRODUCTOMOVIL:
                        return AppRol.Producto;
                    case CONTROLFINANZASMOVIL:
                        return AppRol.Finanzas;
                    case JEFE_FINANZASMOVIL:
                        return AppRol.JefeFinanzas;
                    case COMERCIALFIJA:
                        return AppRol.ComercialFija;
                    case PREVENTAFIJA:
                        return AppRol.PreVentaFija;
                    case PRODUCTOFIJA:
                        return AppRol.ProductoFija;
                    case CONTROLFINANZASFIJA:
                        return AppRol.ControlFinanzasFija;
                    case JEFE_FINANZASFIJA:
                        return AppRol.JefeFinanzasFija;
                    case GESTOR_APLICATIVO:
                        return AppRol.GestorAplicativo;
                    default:
                        return null;
                }
            }

            public static bool EsFecha(Object obj, ref DateTime fecha)
            {
                string strDate = obj.ToString();
                try
                {
                    DateTime dt;
                    if (DateTime.TryParseExact(strDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dt))
                    {
                        fecha = dt;
                        return true;
                    }
                    else
                        return false;
                    //DateTime dt = DateTime.Parse(strDate);
                    //if ((dt.Month != System.DateTime.Now.Month) || (dt.Day < 1 && dt.Day > 31) || dt.Year != System.DateTime.Now.Year)
                    //    return false;
                    //else
                    //    return true;
                }
                catch
                {
                    return false;
                }
            }


            public static bool CheckDate(String date)

            {

                try

                {

                    DateTime dt = DateTime.Parse(date);

                    return true;

                }
                catch

                {

                    return false;

                }

            }


            public static AppRol[] SetRoles(List<string> lstAcronimo)
            {
                var roles = new AppRol[lstAcronimo.Count];
                var i = 0;
                foreach (var item in lstAcronimo)
                {
                    roles[i] = GetRol(item).Value;
                    i++;
                }
                return roles;
            }
        }

        public static class TIPO_OFERTA
        {
            public const int CAMPANA_SIP = 1;
            public const int LICITACIONES = 2;
        }

        public static class ESTADO
        {
            public const string ACTIVO = "ACT";
            public const string INACTIVO = "INA";
            
            public const string VACIO = "";
            public const string NULO = null;

            public static string GetNameEstado(string Estado)
            {
                switch (Estado)
                {
                    case ACTIVO:
                        return "VIGENTE";
                    case INACTIVO:
                        return "INACTIVO";
                }
                return string.Empty;
            }
            public static string GetLabelEstado(string Estado)
            {
                switch (Estado)
                {
                    case ACTIVO:
                        return "<label class='label label-table label-success'>VIGENTE</label>";
                    case INACTIVO:
                        return "<label class='label label-table label-danger'>INACTIVO</label>";
                    
                }
                return string.Empty;
            }
        }

        public static class TIPO
        {
            public const string ALTA = "ALTA";
            public const string PORTABILIDAD = "PORTABILIDAD";
            public const string RENOVACION = "RENOVACION";
        }


        public static Decimal RedondeoBCR(Decimal Importe)
        {
            var StringMontoRedondeado = Convert.ToInt32((Importe) * 100).ToSafeString();
            var ImporteTotalLength = StringMontoRedondeado.Length;
            if (StringMontoRedondeado.LastOrDefault().ToInteger() < 5)
            {
                StringMontoRedondeado = StringMontoRedondeado.Substring(0, ImporteTotalLength - 1) + "0";
            }
            else
            {
                StringMontoRedondeado = StringMontoRedondeado.Substring(0, ImporteTotalLength - 1) + "5";
            }

            return (StringMontoRedondeado.ToDecimal() / 100);
        }

        public static class PBM_Estado
        {
            public const int BORRARDOR = 1;
            public const int PENDIENTE = 2;
            public const int APROBADO = 3;
            public const int RECHAZADO = 4;
            public const int GANADO = 5;
            public const int PERDIDO = 6;
            public const int DESIERTO = 7;
            public const int ASIGNADO = 8;
            //public static string ObtenerNombre(int EstadoPBM)
            //{
            //    switch (EstadoPBM)
            //    {
            //        case BORRARDOR: return "BORRADOR";
            //        case PENDIENTE: return "PENDIENTE";
            //        case APROBADO: return "APROBADO";
            //        case RECHAZADO: return "RECHAZADO";
            //        case GANADO: return "GANADO";
            //        case PERDIDO: return "PERDIDO";
            //        case DESIERTO: return "DESIERTO";
            //        default: return "NO DEFINIDO";
            //    }
            //}
        }

        public static class PB_Estado
        {
            public const int BORRADOR = 1;
            public const int PENDIENTE = 2;
            public const int ASIGNADO = 3;
            public const int APROBADO = 4;
            public const int RECHAZADO = 5;
            public const int GANADO = 6;
            public const int PERDIDO = 7;
            public const int DESIERTO = 8;
            public const int ANULADO = 9;
        }

        public static class TipoPayback
        {
            public const string TARIFARIO = "TAR";
            public const string COMPLEJO = "COM";

            public static string GetNameTipoPayback(string tipo)
            {
                switch (tipo)
                {
                    case TARIFARIO:
                        return "TARIFARIO";
                    case COMPLEJO:
                        return "COMPLEJO";
                    default:
                        return "NO DEFINIDO";
                }
            }
        }

        public static class TipoCarga
        {
            public const string PBM_Plan = "PLA";
            public const string PBM_Equipo = "EQU";
            public const string PBM_Datos = "DAT";
            public const string PBM_Minutos = "MIN";
        }


        public static class TipoAccion
        {
            public const string CreadoNuevo = "NUE";
            public const string CreadoCopia = "COP";
            public const string CreadoVersion = "VER";
            public const string Editado = "EDI";
            public const string Enviado = "ENV";
            public const string Aprobado = "APR";
            public const string Rechazado = "REC";
            public const string Ganado = "GAN";
            public const string Perdido = "PER";
            public const string Desierto = "DES";
            public const string Anulado = "ANU";
            public const string Asignado = "ASI";
            public static string ObtenerDescripcion(string TipoAccion)
            {
                switch (TipoAccion)
                {
                    case CreadoNuevo: return "Nuevo";
                    case CreadoCopia: return "Nueva (copia)";
                    case CreadoVersion: return "Nuevo (versión)";
                    case Editado: return "Editado";
                    case Enviado: return "Enviado a jefe Finanzas";
                    case Aprobado: return "Aprobado por Finanzas";
                    case Rechazado: return "Rechazado por Finanzas";
                    case Ganado: return "Actualizado a Ganado";
                    case Perdido: return "Actualizado a Perdido";
                    case Desierto: return "Actualizado a Desierto";
                    case Anulado: return "Anulado";
                    case Asignado: return "Asignado";
                    default: return "NO DEFINIDO";
                }
            }
        }

        public static class TipoAccionPB
        {
            public const string CreadoNuevo = "NUE";
            public const string CreadoCopia = "COP";
            public const string CreadoVersion = "VER";
            public const string Editado = "EDI";
            public const string Enviado = "ENV";
            public const string Aprobado = "APR";
            public const string Rechazado = "REC";
            public const string Ganado = "GAN";
            public const string Perdido = "PER";
            public const string Desierto = "DES";
            public const string Anulado = "ANU";
            public const string Asignado = "ASI";
            public static string TipoAccionPBDescripcion(string TipoAccionPB)
            {
                switch (TipoAccionPB)
                {
                    case CreadoNuevo: return "Nuevo";
                    case CreadoCopia: return "Nueva (copia)";
                    case CreadoVersion: return "Nuevo (versión)";
                    case Editado: return "Editado";
                    case Enviado: return "Enviado a jefe Finanzas";
                    case Aprobado: return "Aprobado por Finanzas";
                    case Rechazado: return "Rechazado por Finanzas";
                    case Ganado: return "Actualizado a Ganado";
                    case Perdido: return "Actualizado a Perdido";
                    case Desierto: return "Actualizado a Desierto";
                    case Anulado: return "Anulado";
                    case Asignado: return "Asignado";
                    default: return "NO DEFINIDO";
                }
            }
        }

        public static class PBM_TipoPeriodo
        {
            public const int CONTRATACION = 1;
            public const int RENOVACION = 2;
        }

        public static class Cultura
        {
            public const string SeparadorDecimal = ".";
            public const string SeparadorMiles = ",";
            public const int CantidadDecimales = 2;
            public const string SimboloMoneda = "S/";
            public const string CodigoCultura = "es-PE";

            public static string FormatoNumero(object numero)
            {
                string retorno = "";
                switch (numero)
                {
                    case int i:
                        retorno = i.ToString(DevuelveFormatoNumeroEntero());
                        break;
                    case decimal d:
                        retorno = d.ToString(DevuelveFormatoNumeroDecimal());
                        break;
                    default:
                        try
                        {
                            retorno = Convert.ToString(numero);
                        }
                        catch
                        {
                            retorno = "NO ES NÚMERO";
                        }
                        break;
                }
                return retorno;
            }
            public static string DevuelveFormatoNumeroDecimal()
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(CodigoCultura);
                Thread.CurrentThread.CurrentCulture = new CultureInfo(CodigoCultura);
                Thread.CurrentThread.CurrentUICulture = new CultureInfo(CodigoCultura);
                Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalDigits = CantidadDecimales;
                Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = SeparadorDecimal;
                Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = SeparadorMiles;
                string strForNum = string.Empty;
                strForNum = "###,##0.";
                for (int i = 0; i < CantidadDecimales; i++)
                {
                    strForNum += "0";
                }
                return strForNum;
            }
            public static string DevuelveFormatoNumeroEntero()
            {
                string strForNum = string.Empty;
                strForNum = "###,##0.";
                return strForNum;
            }
        }

        public static string FormatoNumero = "{0:n" + Cultura.CantidadDecimales + "}";

        public static class TipoFacturacion
        {
            public const string CICLICA = "CIC";
            public const string MECANIZADA = "MEC";
        }

        public static class FlujoFinanciero
        {
            public const string Ingresos = "ING";
            public const string CostoDirecto = "COD";
            public const string FlujoNeto = "FNE";
            public const string PeriodoRecupero = "PRE";
            public const string OtrosIndicadores = "OTR";
        }

        public static string CodigoPlantillaEconomica(int tipoPlantilla, long identificador)
        {
            string codigo = string.Empty;
            int lenghtId = identificador.ToString().Length;
            int countReplicate = 8 - lenghtId;
            switch (tipoPlantilla)
            {
                case PLANTILLA.LICITACIONES_ID:
                case PLANTILLA.CAMPANA_SIP_ID:
                    codigo = "PEF";
                    break;
                case PLANTILLA.MOVIL:
                    codigo = "PEM";
                    break;
                default:
                    break;
            }
            codigo += new String('0', countReplicate) + identificador.ToString();
            return codigo;
        }

        public static class TipoIngresoAdicional
        {
            public const string FondoMarca = "FMC";
            public const string PagoUnicoInfraestructura = "PUI";
        }

        public static List<string> GamaEquipo = new List<string>() { "Alta", "Baja", "Media", "Sim Card", "Tablet" };

        public class AsuntoCorreoPayback
        {
            public static string PaybackEnviado = "Payback Fija - Plantilla económica pendiente";
            public static string PaybackAsignado = "Payback Fija - Asignación de plantilla económica";
            public static string PaybackRevisado = "Payback Fija - Resultado de revisión de plantilla económica";
        }

        public static class TipoHistoricoIndicadores
        {
            public const string Original = "ORI";
            public const string Edicion = "EDI";
            public const string Importacion = "IMP";
        }
        public static class EdicionFinancieraEvento
        {
            public const string IMPORTACION = "IMP";
            public const string EXPORTACOIN = "EXP";
        }

        public enum VistaFlujoFinanciero
        {
            Edicion,
            SoloLectura
        }
        public enum VistaHistorial
        {
            Normal,
            Financiero
        }
    }
}