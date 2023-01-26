<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Cam_Conf_Cortes" Codebehind="Cam_Conf_Cortes.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_CorteConfiguracion.js" type="text/javascript"></script>
    <script src="Cam_Conf_Cortes.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdCorteConfiguracion" runat="server"/>
        <asp:HiddenField ID="hdfIdCliente" runat="server"/>
        <div id="dvContenido">
            <div id="dvCampos" class="dvPanel">
                <table>
                    <tr style="display:none;">
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkEstado" type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblOperadorCab" runat="server" Text="Operador"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:DropDownList ID="ddlOperador" runat="server" data-bind="value: IdOperador"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblFrecuenciaCab" runat="server" Text="Frecuencia en dias"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:TextBox ID="txtFrecuencia" runat="server" Width="100px" MaxLength="8" data-bind="value:Frecuencia"></asp:TextBox>
                            <span id="lblMensajeFrecuencia">Si ingresa algún valor en Frecuencia, ya no podrá hacerlo en Número Cortes</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblNumeroCortesCab" runat="server" Text="Numero Cortes"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:TextBox ID="txtNumeroCortes" runat="server" Width="100px" MaxLength="8" data-bind="value:NumeroCortes"></asp:TextBox> 
                            <span id="lblMensaheNumeroCortes">Si ingresa algún valor en Número Cortes, ya no podrá hacerlo en Frecuencia</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="txtDiasAntiguedadPedidoCab" runat="server" text="Dias de Antiguedad del Pedido"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtDiasAntiguedadPedido" runat="server" Width="100px" MaxLength="8" data-bind="value:DiasAntiguedadPedido"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="txtCorreosCab" runat="server" text="Correos"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtCorreos" runat="server" Width="300px" MaxLength="1000" data-bind="value:Correos"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr style="display:none;">
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblRutaExportacionCab" runat="server" text="Ruta Exportacion"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtRutaExportacion" runat="server" Width="400px" MaxLength="1024" data-bind="value:RutaExportacion"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblNombreArchivoCab" runat="server" text="Nombre de Archivo"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtNombreArchivo" runat="server" Width="100px" MaxLength="1024" data-bind="value:NombreArchivo"></asp:TextBox>                    
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvAcciones" style="margin-top:2px;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
