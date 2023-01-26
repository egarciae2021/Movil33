<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Doc_DescargarDocumento.aspx.vb" Inherits="Doc_DescargarDocumento"
    EnableViewState="false" EnableEventValidation="false" ViewStateMode="Disabled" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Doc_DescargarDocumento.js")%>" type="text/javascript"></script>
    <div id="dvCargando" class="dvCargando">
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfDatosDocumentos" />
    <div class="dvPanel" id="dvPanel" style="overflow: auto;">
        <div id="idGuias" style="overflow: auto;"  runat="server">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                <cc1:ContenedorAccodion Texto="General">
                    <table width="100%">
                        <tr>
                            <td id="tdAccGeneral">
                                <table width="40%">
                                    <tr id="trApp" runat="server">
                                        <td class="tdEtiqueta">Manual de usuario - App Gestión Móvil</td>
                                        <td><a href="Archivos/Manuales/App/PCSM33_PE - Manual Mi Gestor Movil.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>

                                    <tr id="trBas" runat="server">
                                        <td class="tdEtiqueta">Manual de Usuario Completo (BASIC)</td>
                                        <td><a href="Archivos/Manuales/Basic/PCSM3.3 - BASIC - Manual Usuario.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trBas0" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Importación de Cuentas</td>
                                        <td><a href="Archivos/Guias/Basic/PCSM3.3 - BASIC - Guía Importación de Cuentas .pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trBas2" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Importación de Líneas</td>
                                        <td><a href="Archivos/Guias/Basic/PCSM3.3 - BASIC - Guía Rápida Importación de Líneas.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trPrem" runat="server">
                                        <td class="tdEtiqueta">Manual de Usuario Completo (PREMIUM)</td>
                                        <td><a href="Archivos/Manuales/Premium/PCSM3.3 - PREMIUM -Manual Usuario.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trPrem2" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Configuracion de Caracteristica</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Configuracion de Caracteristica.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trPrem5" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Importación de Recursos Humanos</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Importación de Recursos Humanos.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion id="accSolicitudes" Texto="Solicitudes">
                    <table width="100%">
                        <tr>
                            <td id="tdAccSolicitudes">
                                <table width="40%">
                                    <tr id="trPrem0" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Aprobar Solicitudes</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Aprobar Solicitudes.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trPrem1" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Aprobar y Asignar Solicitudes</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Aprobar y Asignar Solicitudes.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                        
                                    <tr id="trPrem3" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Configurar Solicitudes</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Configurar Solicitudes.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trPrem4" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Crear Solicitud</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Crear Solicitud.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                        
                                    <tr id="trPrem7" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Ingreso a Almacén</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Ingreso a Almacén.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                    <tr id="trPrem8" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Procesar Solicitudes</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Procesar Solicitudes.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion id="accIncidencias" Texto="Incidencias">
                    <table width="100%">
                        <tr>
                            <td id="tdAccIncidencias">
                                <table width="40%">
                                    <tr id="trBas3" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Registro Incidencias</td>
                                        <td><a href="Archivos/Guias/Basic/PCSM3.3 - BASIC - Guía Registro Incidencias.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                        
                                    <tr id="trPrem9" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Registro de Incidencias</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Registro de Incidencias.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion id="accAccFacturacionDetalle" Texto="Resumen Facturación y Detalle de llamadas">
                    <table width="100%">
                        <tr>
                            <td id="tdAccFacturacionDetalle">
                                <table width="40%">
                                    <tr id="trBas1" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Importación de Facturacion</td>
                                        <td><a href="Archivos/Guias/Basic/PCSM3.3 - BASIC - Guía Importación de Facturacion.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                        
                                    <tr id="trPrem6" runat="server">
                                        <td class="tdEtiqueta">Guía Rápida - Importación Facturación</td>
                                        <td><a href="Archivos/Guias/Premium/PCSM3.3 - PREMIUM - Guía Rápida Importación Facturación.pdf" target="_blank" class="btnNormal"><img src="../../Common/Images/pdf.ico"  style="height:16px;width:16px;"/></a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>
    </div>
    <br />
    <div style="text-align: left;">
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
    </div>
    <%--<jqc:jQueryScriptManager ID="jQueryScriptManager1" runat="server" />--%>
    </form>
</body>
</html>
