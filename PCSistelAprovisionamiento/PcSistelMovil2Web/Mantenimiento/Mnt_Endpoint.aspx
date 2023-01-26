<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_Endpoint.aspx.cs" Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_Endpoint" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
                <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Mnt_Endpoint.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdEndpoint" runat="server" />
        <div id="dvMsgAlertaExterna" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <div id="dvContenidoAlertaExterna">
            </div>
        </div>
        <div>
            <br />
            <div id="dvdetalle" class="dvPanel" style="margin-left: 5px; margin-right: 5px; background">
                <table id="tbTipo" runat="server">
                    <tr>
                        <td class="TituloMant">
                            <asp:Label ID="Label1" runat="server" Text="Código"></asp:Label>
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtCodigo" runat="server" Width="250px" MaxLength="2" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>  
                    <tr>
                        <td class="TituloMant">
                            <asp:Label ID="Label2" runat="server" Text="Nombre"></asp:Label>
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtNombre" runat="server" Width="250px" MaxLength="50" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>  
                </table>
                <br />
            </div>
            <br />
            <div id="dvAcciones" style="margin-left: 5px;">
                <div id="btnGuardar" runat="server" class="btnNormal" style="width: 100px;" runat="server">
                    <asp:Image ID="Image4" runat="server" Style="width: 14px; vertical-align: bottom;"
                        ImageUrl="../Common/Images/save.ico" />
                    Grabar
                </div>
                <div id="btnCerrar" runat="server" class="btnNormal">
                    <asp:Image ID="Image6" runat="server" Style="width: 14px; vertical-align: bottom;"
                        ImageUrl="../Common/Images/Mantenimiento/Salir.gif" />
                    Cerrar
                </div>
            </div>
        </div>
    </form>
</body>
</html>
