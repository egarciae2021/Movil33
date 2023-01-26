<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="General_Administrar_Proceso_Configuracion_Mnt_Config_Proceso" Codebehind="Mnt_Config_Proceso.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_Config_Proceso.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <br />
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfPlantilla" runat="server" />
    <asp:HiddenField ID="hdfFormato" runat="server" />
    <asp:HiddenField ID="hdfCodigoFuente" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td style="width: 120px;">
                                <asp:Label ID="lblNombre" runat="server" Text="Descripción:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtdescripcion" runat="server" Width="200px" MaxLength="100"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblTipoProceso" runat="server" Text="Tipo de Proceso:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTipoProceso" runat="server" Width="150px">
                                    <asp:ListItem Value="-1">--Seleccione--</asp:ListItem>
                                    <asp:ListItem>Origen</asp:ListItem>
                                    <asp:ListItem>Destino</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblTipoFuente" runat="server" Text="Plantilla:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtPlantilla" runat="server" Width="150px" MaxLength="150"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trTipoFuente" runat="server" style="display:none;">
                            <td>
                                <asp:Label ID="lblNombreTipoFuente" runat="server" Text="Formato:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtFormato" runat="server" Width="150px" MaxLength="150"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblFuente" runat="server" Text="Fuente:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlFuente" runat="server" Width="150px">
                                    <asp:ListItem Value="-1">--Seleccione--</asp:ListItem>
                                    <asp:ListItem>BD</asp:ListItem>
                                    <asp:ListItem>Archivo</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr id="trFuente" runat="server">
                            <td>
                                <asp:Label ID="lblnombreFuente" runat="server" Text="Nombre Fuente:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtFuenteBD" runat="server" Width="150px" MaxLength="150"></asp:TextBox>
                                <asp:TextBox ID="txtFuenteArchivo" runat="server" Width="150px" MaxLength="150"></asp:TextBox>
                            </td>
                        </tr>
                         <tr id="trEstado" runat="server">
                            <td class="TituloMant" id="tdEstado" style="display: none;">
                                Estado
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px" AutoPostBack="false"></asp:CheckBox>
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
