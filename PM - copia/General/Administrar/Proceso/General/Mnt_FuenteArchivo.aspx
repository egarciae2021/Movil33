<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="General_Administrar_Proceso_General_Mnt_FuenteArchivo" Codebehind="Mnt_FuenteArchivo.aspx.vb" %>

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
    <script src="Mnt_FuenteArchivo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfCodigoTipoFuente" runat="server" />
    <asp:HiddenField ID="hdfTipoFuente" runat="server" />
    <asp:HiddenField ID="hdfCodigoFuente" runat="server" />
    <asp:HiddenField ID="hdfTipoTipoArchivo" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td>
                    <table width="100%" border="0">
                        <tr>
                            <td style="width: 170px;">
                                <asp:Label ID="lblNombre" runat="server" Text="Nombre Fuente:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtnombre" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblTipoFuente" runat="server" Text="Tipo de Fuente:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTipoFuente" runat="server" Width="150px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr id="trTipoFuente" runat="server">
                            <td>
                                <asp:Label ID="lblNombreTipoFuente" runat="server" Text="Nombre Tipo Fuente:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtNombreFTP" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                                <asp:TextBox ID="txtNombreUNC" runat="server" Width="150px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblTipoArchivo" runat="server" Text="Tipo de Archivo:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTipoArchivo" runat="server" Width="150px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblTipoExtraccion" runat="server" Text="Tipo de Extracción:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTipoExtraccion" runat="server" Width="150px">
                                    <asp:ListItem Value="-1">--Seleccione--</asp:ListItem>
                                    <asp:ListItem Class="columna">Por Columna</asp:ListItem>
                                    <asp:ListItem>Por Posición</asp:ListItem>
                                    <asp:ListItem>Por Posición y longitud</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblPassword" runat="server" Text="Password:"></asp:Label>
                            </td>
                            <td>
                                <asp:CheckBox Text="Acceso" ID="chAcceso" runat="server" MaxLength="50" Width="199px"
                                    AutoPostBack="false"></asp:CheckBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblHistorico" runat="server" Text="Guardar archivo histórico:"></asp:Label>
                            </td>
                            <td>
                                <asp:CheckBox Text="" ID="chkHistorico" runat="server" MaxLength="50" Width="199px"
                                    AutoPostBack="false"></asp:CheckBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblRutaBackup" runat="server" Text="Ruta Backup:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtrutaBackup" runat="server" Width="400px" MaxLength="1024"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblrutaerrores" runat="server" Text="Ruta Errores:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtrutaerrores" runat="server" Width="400px" MaxLength="1024"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblRutaBackup1" runat="server" Text="Ruta Log:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtrutalog" runat="server" Width="400px" MaxLength="1024"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblnombreArchivo" runat="server" Text="Nombre Archivo:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtnombreArchivo" runat="server" Width="150px" MaxLength="1024"></asp:TextBox>
                                <asp:CheckBox Text="Incluir fecha de generación (Formato ANSI)" ID="chkFormato" runat="server" MaxLength="50" AutoPostBack="false"></asp:CheckBox>
                                &nbsp;&nbsp;(*) Incluir la extensión del archivo
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left:17.5em">
                                <i>Sí es exportación, el nombre sería: <b>"<label ID="lblNomArchivoExp" runat="server"></label>"</b>.<br/> Sí es importación, buscaría un archivo con el mismo formato: <b>"<label ID="lblNomArchivoImp" runat="server"></label>"</b>.</i>
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
