<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_Servidor.aspx.cs" Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_Servidor" %>

<%@ Register Src="../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
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
    <script src="Mnt_Servidor.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdServidor" runat="server" />
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
                        <asp:Label ID="Label2" runat="server" Text="(*) Nombre"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtNombre" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label1" runat="server" Text="(*) Ip"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtIp" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label3" runat="server" Text="(*) Sistema Operativo"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtSO" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label4" runat="server" Text="(*) Disco Duro"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDisco" runat="server" Width="250px" MaxLength="9"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label5" runat="server" Text="(*) Espacio Utilizado"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtEspacio" runat="server" Width="250px" MaxLength="9"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label6" runat="server" Text="(*) Archivo Backup"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtRutaBackup" runat="server" Width="250px" MaxLength="350"></asp:TextBox>
                    </td>
                    <td>
                        <ttgInfo:ToolTipGenerico ID="ttgInfoArchivo" runat="server" Mensaje="Ingrese la ruta con el nombre completo de archivo backup" />
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label7" runat="server" Text="(*) Ruta Destino B.D."></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtRutaDestinoBD" runat="server" Width="250px" MaxLength="350"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="2">                        
                        <span><i>(*) Campos necesarios para poder culminar el registro.</i></span>
                    </td>
                </tr>
            </table>            
        </div>
        <br />
        <div id="dvAcciones" style="margin-left: 5px;">
            <div id="btnGuardar" runat="server" class="btnNormal" style="width: 100px;">
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
