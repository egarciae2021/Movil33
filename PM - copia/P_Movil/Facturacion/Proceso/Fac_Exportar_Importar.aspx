<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Fac_Exportar_Importar.aspx.vb" Inherits=".FAC_Exportar_Importar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Fac_Exportar_Importar.js" type="text/javascript"></script>
    <style type="text/css">
        body
        {
            margin: 0px;
            padding: 0px;
            font: 10px "Trebuchet MS" , Verdana, Helvetica, sans-serif;
            color: #666;
        }
        div
        {
            font-size: 11px;
        }

        .pMedium
        {
            width: 800px;
            margin: 0px auto;
        }
        
        .pCommand
        {
            margin: 0px auto; 
            width: 780px; 
            padding: 10px; 
            background-image: none; 
            margin-top: 5px;
        }

        .pInformacion
        {
            margin-top: 5px;
            overflow: hidden;
            background: rgb(255,255,255);
            background: -moz-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,1)), color-stop(47%,rgba(246,246,246,1)), color-stop(100%,rgba(237,237,237,1)));
            background: -webkit-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: -o-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: -ms-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: radial-gradient(ellipse at center,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ededed', endColorstr='#ededed',GradientType=1 );
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgb(240,240,240);       
        }
        .cGenInfo
        {
            font-size: 13px;
            color: #003F59;
            padding: 5px 0px 12px 0px;
            font-weight: bold;
            text-align: center;
        }
        .tdLeft
        {
            color: #003F59; 
            vertical-align: bottom;
            text-align: right;
            width: 250px;
            font-weight: bold;
        }
        .tdRight
        {
            vertical-align: bottom; 
            padding-left: 5px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">    
    <div id="pInfoExportacion" class="pMedium pInformacion">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td colspan="2" class="cGenInfo">
                    <asp:Label ID="lblTituloExportacion" runat="server" Text="Información de Exportación de archivo de cobros"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqRutaExportacion" runat="server" text="Ruta Exportación de deuda"/>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblRutaExportacionDeuda" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqNombreArchivoExportacion" runat="server" Text="Nombre de archivo"/>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblNombreArchivoExportacion" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqExp_RutaBackup" runat="server" Text="Ruta Backup"></asp:Label>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblExp_RutaBackup" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqExp_RutaErrores" runat="server" Text="Ruta Errores"></asp:Label>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblExp_RutaErrores" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqExp_RutaLog" runat="server" Text="Ruta Log"></asp:Label>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblExp_RutaLog" runat="server"></asp:Label>
                </td>
            </tr>
        </table>                    
    </div>    
    <%--<div id="dvExportarDeudas" class="ui-widget-content ui-corner-all pCommand">
        
    </div>--%>
    <div id="dvGenerar" class="ui-widget-content ui-corner-all pCommand">
        <table width="100%">
            <tr>
                <td style="width:160px;">
                    <div id="bntGenerar" class="k-button">
                        Generar archivo de deuda
                    </div>        
                </td>
                <td>
                    <div id="pbGenerar" style="display:none;">
                        <%--<asp:Label Text="0%" runat="server" ID="lblPorcentaje" style="position:absolute; font-size:18px; margin-left:5px;"/>--%>
                    </div>
                </td>
                <td style="width:45px;">
                    <asp:Label Text="0%" runat="server" ID="lblPorcentaje" style="font-size:18px; display:none; font-weight:bold;"/>
                </td>
            </tr>
        </table>
    </div>
    <div class="pMedium">
        <br />
        <table id="tbUltimoCobro"></table>
        <br />
        <table id="tbHistoricoCobros"></table>
        <br />
    </div>
    <div id="pInfoImportacion" class="pMedium pInformacion">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td colspan="4" class="cGenInfo">
                    <asp:Label ID="lblTituloImportacion" runat="server" Text="Información de Importación de archivo de pagos"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqRutaImportacion" runat="server" text="Ruta Importación de pagos"/>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblRutaImportacion" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqNombreArchivoImportacion" runat="server" Text="Nombre de archivo"/>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblNombreArchivoImportacion" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqImp_RutaBackup" runat="server" Text="Ruta Backup"></asp:Label>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblImp_RutaBackup" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqImp_RutaErrores" runat="server" Text="Ruta Errores"></asp:Label>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblImp_RutaErrores" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="etqImp_RutaLog" runat="server" Text="Ruta Log"></asp:Label>&#58;
                </td>
                <td class="tdRight">
                    <asp:Label ID="lblImp_RutaLog" runat="server"></asp:Label>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div class="pMedium">
        <table id="tbUltimoPago"></table>
    </div>
    <div id="dvImportarPagos" class="ui-widget-content ui-corner-all pCommand">
        <iframe id="ifCargarArchivo" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width:410px;" src="../../../Common/Page/Adm_CargarArchivo.aspx?Formatos=&FormatoTipo=">
        </iframe>
    </div>
    <br />
    <div class="pMedium">
        <table id="tbHistoricoPagos"></table>
    </div>
    <div id="msgCargaArchivo" style="display:none;">
        <asp:Label ID="lblMensajeCargarArchivo" runat="server" />
    </div>
    </form>
</body>
</html>
