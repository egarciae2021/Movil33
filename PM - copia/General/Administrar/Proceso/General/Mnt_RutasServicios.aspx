<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_RutasServicios.aspx.vb" Inherits=".Mnt_RutasServicios" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_RutasServicios.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion" style="overflow:auto;" TabIndex="0">
            <cc1:ContenedorAccodion ID="accServicioImportadorLineas" Texto="Servicio Importador Llamadas">
                <table width="100%">
                    <tr>
                        <td colspan="2">
                            <asp:Label ID="lblMensaje_ImportadorLineas" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr id="tr_RutaOrigen_L">
                        <td>Ruta Origen</td>
                        <td><asp:TextBox ID="txt_RutaOrigen_ImportadorLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_RutaBackup_L">
                        <td>Ruta Backup</td>
                        <td><asp:TextBox ID="txt_RutaBackup_ImportadorLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_RutaProcesado_L">
                        <td>Ruta Procesado</td>
                        <td><asp:TextBox ID="txt_RutaProcesado_ImportadorLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_RutaErr_L">
                        <td>Ruta Errores</td>
                        <td><asp:TextBox ID="txt_RutaErr_ImportadorLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_RutaLog_L">
                        <td>Ruta Log</td>
                        <td><asp:TextBox ID="txt_RutaLog_ImportadorLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion ID="accServicioDatosLinea" Texto="Servicio Importador Datos (Líneas)">
                <table width="100%">
                    <tr>
                        <td colspan="2">
                            <asp:Label ID="lblMensaje_ImportadorDatosLinea" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr id="tr_RutaLog_D">
                        <td>Ruta Log</td>
                        <td><asp:TextBox ID="txt_RutaLog_ImportadorDatosLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_RutaOrigen_D">
                        <td>Ruta Origen</td>
                        <td><asp:TextBox ID="txt_RutaOrigen_ImportadorDatosLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_RutaError_D">
                        <td>Ruta Error</td>
                        <td><asp:TextBox ID="txt_RutaError_ImportadorDatosLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_RutaBackup_D">
                        <td>Ruta Backup</td>
                        <td><asp:TextBox ID="txt_RutaBackup_ImportadorDatosLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                    <tr id="tr_ProcesoArchivos_D">
                        <td>Proceso Archivos</td>
                        <td><asp:TextBox ID="txt_ProcesoArchivos_ImportadorDatosLinea" Width="500" runat="server" CssClass="RutaServicio"></asp:TextBox></td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
        </cc1:AccordionJQ>
        <div id="dvAccoines" style="margin-top:5px; text-align:left;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <%--<div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>--%>
        </div>
    </div>
    </form>
</body>
</html>
