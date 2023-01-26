<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_CortesElegirPedidos" Codebehind="Cam_CortesElegirPedidos.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/ui.dropdownchecklist-1.4-min.js" type="text/javascript"></script>
    <script src="Cam_CortesElegirPedidos.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfIdCampana" />
        <asp:HiddenField runat="server" ID="hdfSituacion" />
        <asp:HiddenField runat="server" ID="hdfEsAgregar" />
        <asp:HiddenField runat="server" ID="hdfIdCorte" />
        <div class="dvPanel">
            <table cellspacing="0">
                <tr>
                    <td>
                        <asp:Label ID="lblFechaInicio" runat="server" Width="45px" text="Periodo"></asp:Label>
                        <asp:TextBox ID="txtFechaInicio" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrarFechaInicio" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:TextBox ID="txtFechaFin" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrarFechaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>&nbsp;&nbsp;&nbsp;
                        <asp:Label ID="Empleado" runat="server" Width="64px" text="Empleado"></asp:Label>
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblArea" runat="server" Width="45px" text="Área"></asp:Label>
                        <asp:TextBox ID="txtArea" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodAreaBusqueda" runat="server"/>
                        <asp:HiddenField ID="hdfCodIntArea" runat="server" />                        
                        <asp:HiddenField ID="HiddenField1" runat="server" />
                        &nbsp;&nbsp;
                        <asp:Label ID="lblCentroCosto" runat="server" Width="65px" text="Centro Costo"></asp:Label>
                        <asp:TextBox ID="txtCentroCosto" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCCOBusqueda" runat="server"/>
                        &nbsp;&nbsp;
                        <div id="btnBuscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" class="btnNormal" style="width: 25px; height: 18px; text-align: center; vertical-align: middle; margin-top:-10px;">
                            <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" title="Buscar"/>
                        </div>
                    </td>
                </tr>
                <tr id="trFiltroCuenta" runat="server">
                    <td valign="top">
                        <asp:Label ID="lblCuenta" runat="server" Width="45px" text="Cuenta"></asp:Label>
                        <asp:DropDownList ID="ddlCuenta" runat="server" Width="235px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table id="tbPedidos"></table>
                        <div id="pager"></div>
                    </td>
                </tr>
            </table>
        </div>
        <div style="margin-top:5px; margin-bottom:5px; text-align:right;">
            <div id="btnAgregarPedidos" class="btnNormal">
                <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                <asp:Label ID="lblAgregar" runat="server" Text="Agregar Pedidos"></asp:Label>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
    </form>
</body>
</html>
