<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_BaseDatos.aspx.cs" Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_BaseDatos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

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
    <script src="Mnt_BaseDatos.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
  <asp:HiddenField ID="hdfIdBaseDatos" runat="server" />
   <asp:HiddenField ID="hdfIdServidor" runat="server" />
    <asp:HiddenField ID="hdfIdInstanciaBD" runat="server" />
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
                        <asp:Label ID="Label2" runat="server" Text="Nombre"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtNombre" runat="server" Width="250px" MaxLength="50" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label1" runat="server" Text="Servidor"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:DropDownList ID="ddlServidor" runat="server" CssClass="form-control" Width="260px">
                        </asp:DropDownList>
                    </td>
                </tr>
                   <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label5" runat="server" Text="Instancia BD."></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:DropDownList ID="ddlInstanciaBD" runat="server" CssClass="form-control" Width="260px">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label3" runat="server" Text="Usuario"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtUsuario" runat="server" Width="250px" MaxLength="15"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label4" runat="server" Text="Contraseña"></asp:Label>
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtContrasena"  runat="server" Width="250px" MaxLength="50"></asp:TextBox>
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
