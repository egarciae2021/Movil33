<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_List_Empleado.aspx.vb"
    Inherits=".Mnt_List_Empleadoo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../../Common/Styles/Uniform/default/css/uniform.default.min.css"
        rel="stylesheet" type="text/css" />
    <script src="../../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>
    <style type="text/css">
        .dvCargandoMnt {
            background: url('../../../../Common/Images/Mantenimiento/Cargando.gif') no-repeat right center;
            width: 64px;
            height: 64px;
            top: 36%;
            left: 50%;
            z-index: 20;
            position: fixed;
            display: block;
        }

        .style1 {
            text-align: right;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_List_Empleado.js")%>" type="text/javascript"></script>
    <div id="dvCargandoMnt" class="dvCargandoMnt">
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfOpcionPrincipal" runat="server" />
        <div class="dvPanel" style="overflow: auto;">
            <table align="center">
                <tr>
                    <td class="style1">Centro de costo:</td>
                    <td>
                        <asp:DropDownList ID="ddlCentroCosto" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>
                    <td style="text-align: right">
                        <strong>&nbsp;&nbsp;&nbsp; </strong>Organización:
                    </td>
                    <td>
                        <%--<asp:DropDownList ID="ddlOrganizacion" runat="server" Width="234px">
                    </asp:DropDownList>--%>
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtNomOrganizacion" ReadOnly="true" runat="server" Width="224px"
                                        Text=" <Todos>"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodOrganizacion" runat="server" Value="-1" />
                                </td>
                                <td>&nbsp;
                                <div id="btnAgregarOrga" class="btnNormal" runat="server" title="Seleccionar Organización">
                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td style="text-align: right">
                        <%--Tipo Línea:--%>
                    </td>
                    <td>
                        <div style="display: none;">
                            <asp:DropDownList ID="ddlTipoLinea" runat="server" Width="234px">
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td>&nbsp; Grupo Empleado:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlGrupoEmpleado" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>
                    <td>
                        <div id="btnMostrar" class="btnNormal" runat="server" title="Mostrar Reporte" style="width: 130px">
                            <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/FiltroAgregar_16x16.png" />
                            <a>Mostrar Reporte</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right">Modelo:
                    </td>
                    <td style="text-align: left">
                        <asp:DropDownList ID="ddlModelo" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>
                    <td style="text-align: right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sucursal:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlSucursal" runat="server" Width="234px">
                        </asp:DropDownList>
                    </td>
                    <td>
                        <div id="btnLimpiar" class="btnNormal" runat="server" title="Limpiar" style="width: 130px">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                            <a>Limpiar</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="dvPanel" style="overflow: auto; text-align: center; margin-top: 5px">
            <iframe id="ifReporteDevExpress" frameborder="0" style="padding: 0px; margin: 0px; width: 1024px;"></iframe>
        </div>
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
    </form>
</body>
</html>
