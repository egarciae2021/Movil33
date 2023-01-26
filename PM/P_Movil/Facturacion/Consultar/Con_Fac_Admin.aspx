<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Consultar_Con_Fac_Admin" Codebehind="Con_Fac_Admin.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
<form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="HdfOpc" runat="server" />
    <div class="ui-widget-content ui-corner-all" style="padding: 0px; margin: 0px; background-image: none;">
        <table border="0" align="center">
            <tr>
                <td style="width: 60px">
                    <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                </td>
                <td rowspan="2" valign="middle" style="width: 200px">
                    En:&nbsp;
                    <input id="ddlFacBusEmpleado" type="text" style="width: 150px; padding: 4px;" maxlength="200"
                        value="" name="ddlFacBusEmpleado" />
                </td>
                <td rowspan="2" valign="middle" style="width: 280px">
                    Filtrar:&nbsp;
                    <input id="txtFacBusEmpleado" style="margin-left: 15px; font-weight: normal; width: 200px;"
                        class="k-textbox" value="" placeholder="Valor a filtrar" />
                </td>
                <td>
                    <div id="btnFacBusEmpleado" class="k-button">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                </td>
                                <td>
                                    &nbsp;Buscar
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td>
                    <div id="btnCerrar" class="k-button">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                </td>
                                <td>
                                    &nbsp;Cerrar
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td>
                    <div id="btnVerificarExpor" class="k-button">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                </td>
                                <td>
                                    &nbsp;Verificar Exportacion
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
        </table>
    </div>
    <table id="tbEmpleados" align="center">
        <tr>
            <td>
                <div style="height: 30px;">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="grEmpleados" style="width: 800px">
                </div>
            </td>
        </tr>
    </table>
    <div id="cronograma" style="display:none;">
        <iframe id="ifCronograma" frameborder="0" style="padding: 0px; margin: 0px; height: 600px;
            width: 770px;"></iframe>
    </div>
    </form>
</body>
</html>
