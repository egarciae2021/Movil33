<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_LIC_ContratoTermino.aspx.cs"
    Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_LIC_ContratoTermino" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
    <script src="Mnt_LIC_ContratoTermino.js" type="text/javascript"></script>
    <style type="text/css">
        .style1
        {
            width: 16px;
            height: 16px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdContratoTermino" runat="server" />
        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfRutaCompleta" runat="server" />
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
                        <asp:Label ID="Label2" runat="server" Text="Descripción"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label1" runat="server" Text="Archivo"></asp:Label>
                    </td>
                    <td style="width: 500px;">
                         <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="width:500px;">
                                <iframe id="ifCargarArchivo" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width:482px;" >
                                </iframe>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblArchivoCargado" runat="server" Text="" CssClass="lblDescargar"></asp:Label>
                                <img ID="igmEliminar" style="cursor:pointer;" src="../Common/images/Mantenimiento/delete_16x16.gif"/></td>
                        </tr>
                    </table>
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
