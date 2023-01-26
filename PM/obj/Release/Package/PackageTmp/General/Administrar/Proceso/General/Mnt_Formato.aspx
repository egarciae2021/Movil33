<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Proceso_General_Mnt_Formato" Codebehind="Mnt_Formato.aspx.vb" %>

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
    <script src="Mnt_Formato.js" type="text/javascript"></script>
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
                                <asp:Label ID="lblNombreFormato" runat="server" Text="Nombre Formato:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtNombreFormato" runat="server" Width="300px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblIdentificador" runat="server" Text="Identificador:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtIdentificador" runat="server" Width="100px" MaxLength="10"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblPosicionDia" runat="server" Text="Posición del Día:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtposdia" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lbllongitudDia" runat="server" Text="Longitud del Día:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtlogdia" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblposicionmes" runat="server" Text="Posición del Mes:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtposmes" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lbllongitudmes" runat="server" Text="Longitud del Mes:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtlogmes" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblPosicionano" runat="server" Text="Posición del Año:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtposano" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lbllongitudano" runat="server" Text="Longitud del Año:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtlogano" runat="server" Width="50px" MaxLength="4"></asp:TextBox>
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
