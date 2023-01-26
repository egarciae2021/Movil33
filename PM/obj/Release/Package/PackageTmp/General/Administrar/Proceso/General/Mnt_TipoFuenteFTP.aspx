<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="General_Administrar_Proceso_General_Mnt_TipoFuenteFTP" Codebehind="Mnt_TipoFuenteFTP.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_TipoFuenteFTP.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td>
                                <asp:Label ID="lblNombreFuente" runat="server" Text="Nombre Tipo Fuente:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtnombrefuente" runat="server" Width="300px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblservidor" runat="server" Text="Servidor:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtServidor" runat="server" Width="200px" MaxLength="100"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblruta" runat="server" Text="Ruta:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtruta" runat="server" Width="200px" MaxLength="1024"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblproxy" runat="server" Text="Proxy:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtproxy" runat="server" Width="150px" MaxLength="100"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblusuario" runat="server" Text="Usuario:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtusuario" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblpassword" runat="server" Text="Password:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtpassword" runat="server" MaxLength="50" TextMode="Password"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trEstado" runat="server">
                            <td class="TituloMant" id="tdEstado" style="display: none;">
                                Estado
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px"
                                    AutoPostBack="false" Visible="false"></asp:CheckBox>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <br />
    <div style="text-align: left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
    </div>
    </form>
</body>
</html>
