<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_EnvioCorreo" Codebehind="Conf_EnvioCorreo.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />        
        <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>

        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Conf_EnvioCorreo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametro" runat="server" />
    <asp:HiddenField ID="hdfFormulaInicial" runat="server" />
    <div id="dvCargando" class="dvCargando"></div>
    <div id="dvCampo" class="dvPanel" style="overflow:auto;">
        <table border="0" id="tbCostoReposicion" runat="server"> 
            <tr>
                <td>
                    <asp:Label ID="lblTitCorAdm" runat="server" Text="Correo Administrador"></asp:Label>
                </td>
                <td>
                    &nbsp;<asp:Label ID="lblCorAdm" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblTitCosAdi" runat="server" Text="Correo Adicional"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtCorAdi" runat="server" Width="250px" MaxLength="200"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblNumDiaPre" runat="server" Text="Número de días previos"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtNumDiaPre" runat="server" Width="40px" MaxLength="3" style="text-align: right;"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <asp:Label id="lblMensaje" runat="server" style="font-style:italic;"></asp:Label>
                </td>
            </tr>
            <tr style="padding-top:20px;">
                <td colspan="2">
                <br />
                <div style="text-align:left;">            
                    <div id="btnGuardar" class="btnNormal">
                        <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                        <a>Guardar</a>
                    </div>
                    <div id="btnCerrar" class="btnNormal">
                        <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                        <a>Cancelar</a>
                    </div>
                </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>