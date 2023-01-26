<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_InstanciaBD.aspx.cs" Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_InstanciaBD" %>

<%@ Import Namespace="Web.GeneralMantenimiento" %>

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
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdInstanciaBD" runat="server" />
        <asp:HiddenField runat="server" ID="hdflstBDCliente" />
        <div id="dvMsgAlertaExterna" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <div id="dvContenidoAlertaExterna">
            </div>
        </div>
        <div>
            <br />
            <div id="dvdetalle" class="dvPanel" style="margin-left: 5px; margin-right: 5px; background">
                <table id="tbTipo" runat="server" border="0">
                    <tr>
                        <td class="TituloMant">
                            <asp:Label ID="Label2" runat="server" Text="Nombre"></asp:Label>
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtNombre" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                            <asp:CheckBox ID="chkUsaInstancia" runat="server" Text="No usa" />
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
                            <asp:Label ID="Label3" runat="server" Text="Usuario dbo"></asp:Label>
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtUsuariodbo" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="TituloMant">
                            <asp:Label ID="Label4" runat="server" Text="Contraseña Usuario dbo"></asp:Label>
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtPassdbo" runat="server" Width="250px" MaxLength="50" TextMode="Password"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="TituloMant">Usuario Aprovisionamiento
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtUsuarioAPr" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="TituloMant">Contraseña Usuario Apr.
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtpassApr" runat="server" Width="250px" MaxLength="50" TextMode="Password"></asp:TextBox>
                            <asp:CheckBox ID="chkMostrarContrasena" runat="server" Text="Mostrar Contraseña" />
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblMulticliente" runat="server" Text="MultiCliente"></asp:Label>
                        </td>
                        <td>
                            <asp:CheckBox ID="chkMultiCliente" runat="server" />
                        </td>
                    </tr>
                </table>
                <table id="tbMultiCliente">
                    <tr id="trMulticliente" runat="server">
                        <td class="TituloMant" style="vertical-align: top;">
                            <asp:Label ID="Label5" runat="server" Text="Base Datos Clientes"></asp:Label>
                        </td>
                        <td class="ValorMant">
                            <asp:ListBox ID="lstBdClientes" runat="server" Height="100px" Width="260px"></asp:ListBox>
                        </td>
                        <td>
                            <div id="btnAgregarBDCliente" class="btnNormal" runat="server" title="Agregar Base de Datos Cliente">
                                <asp:Image ID="imgAgregarBDCliente" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" CssClass="imgBtn" />
                            </div>
                        </td>
                        <td>
                            <div id="btnQuitarBDCliente" class="btnNormal" runat="server" title="Quitar Base de Datos Cliente">
                                <asp:Image ID="imgQuitarBDCliente" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" CssClass="imgBtn" />
                            </div>
                        </td>
                    </tr>
                </table>
                <br />
            </div>
            <br />
            <div id="dvBDCliente" style="display: none;">
                <table width="100%">
                    <tr>
                        <td class="TituloMant">Nombre de BD</td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtAddBD" runat="server" Width="200px" MaxLength="50"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><br/>
                            <asp:Label runat="server" ID="lblMsg" ForeColor="red"></asp:Label>
                        </td>
                    </tr>
                </table>
            </div>
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
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_InstanciaBD.js") %>" type="text/javascript"></script>
    </form>
</body>
</html>
