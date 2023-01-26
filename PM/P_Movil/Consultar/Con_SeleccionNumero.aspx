<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_SeleccionNumero" Codebehind="Con_SeleccionNumero.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Con_SeleccionNumero.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <div class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px; width:250px;">
            <div style="width:100%; text-align:left; font-weight:bold;">
                Número
            </div>
            <asp:TextBox ID="txtNumero" runat="server"></asp:TextBox>
            <img id="imgAgregarNumero" alt="Agregar" src="../../Common/Images/Mantenimiento/add_16x16.gif" class="imgBtn" title="Agregar número" style="display:none;"/>
        </div>
        <div class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px; width:250px;">
            <div style="width:100%; text-align:left; font-weight:bold;">
                Por países
            </div>
            <asp:DropDownList ID="ddlPais" runat="server" Width="220px"></asp:DropDownList>
            <img id="imgAgregarPais" alt="Agregar" src="../../Common/Images/Mantenimiento/add_16x16.gif" class="imgBtn" title="Agregar pais" style="display:none;"/>
        </div>
        <div id="dvCiudad" class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px; width:250px; display:none;">
            <div style="width:100%; text-align:left; font-weight:bold;">
                Por ciudades
            </div>
            <asp:DropDownList ID="ddlCiudad" runat="server" Width="220px"></asp:DropDownList>
            <img id="imgAgregarCiudad" alt="Agregar" src="../../Common/Images/Mantenimiento/add_16x16.gif" class="imgBtn" title="Agregar ciudad" style="display:none;"/>
        </div>
        <div class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px; width:250px;">
            <div style="width:100%; text-align:left; font-weight:bold;">
                Por empresas
            </div>
            <asp:DropDownList ID="ddlEmpresa" runat="server" Width="220px"></asp:DropDownList>
            <img id="imgAgregarEmpresa" alt="Agregar" src="../../Common/Images/Mantenimiento/add_16x16.gif" class="imgBtn" title="Agregar empresa" style="display:none;"/>
        </div>
        <div class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px; width:250px;">
            <div style="width:100%; text-align:left; font-weight:bold;">
                Números seleccionados
            </div>
            <asp:ListBox ID="lstNumerosSeleccionados" runat="server" Width="250px"></asp:ListBox>
        </div>
        <br />
        <div id="btnAceptar" class="btnNormal" runat="server" >
            <asp:Image ID="imgAceptar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Aceptar</a>
        </div>
        <div id="btnCancelar" class="btnNormal" runat="server" >
            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
            <a>Cancelar</a>
        </div>
    </form>
</body>
</html>