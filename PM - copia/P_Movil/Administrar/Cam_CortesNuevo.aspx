<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_CortesNuevo" Codebehind="Cam_CortesNuevo.aspx.vb" %>

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
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_CampanaCorte.js" type="text/javascript"></script>
    <script src="Cam_CortesNuevo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdCorte" runat="server" />
        <asp:HiddenField ID="hdfCodCliente" runat="server" />
        <asp:HiddenField ID="hdfEditable" runat="server" Value="0"/>
        <div id="dvCampos" class="dvPanel">
            <table border="0">
                <tr>
                    <td style="width:50px;">
                        <asp:Label ID="lblCampana" runat="server" text="Campaña:"></asp:Label>
                    </td>
                    <td style="width:140px;">
                        <asp:DropDownList ID="ddlCampana" runat="server" Width="180px" data-bind="value: IdCampana, enable: IdCorte()==-1 ? true : false"></asp:DropDownList>
                    </td>
                    <td style="width:50px;">
                        <asp:Label ID="lblSituacion" runat="server" text="Situación:"></asp:Label>&nbsp;&nbsp;
                    </td>
                    <td style="width:110px;">
                        <asp:DropDownList ID="ddlSituacion" runat="server" Width="100px" data-bind="value: Situacion, enable: IdCorte()==-1 ? true : false"></asp:DropDownList>
                    </td>
                    <td></td>
                    <td align="right">
                        <div id="btnAgregar" class="btnNormal" style="width:100px;">
                            <asp:Image ID="imgAgregarPedidos" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar</a>
                        </div>
                        <div id="btnQuitar" class="btnNormal" style="width:100px;">
                            <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                            <a>Quitar</a>
                        </div>   
                        <div id="btnQuitarTodos" class="btnNormal" style="width:100px;">
                            <img alt="Limpiar" src="../../Common/Images/Mantenimiento/Borrar.png" />
                            <a>Limpiar</a>
                        </div> 
                                                     
                    </td>
                </tr>
                <tr>
                    <td>

                        <asp:Label ID="Label1" runat="server" text="Búsqueda:"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlBusquedaEn" runat="server" Width="120px">
                            <asp:ListItem Text="N° de Pedido" Value="1"></asp:ListItem>
                            <asp:ListItem Text="Cuenta" Value="2"></asp:ListItem>
                            <asp:ListItem Text="Empleado" Value="3"></asp:ListItem>
                            <asp:ListItem Text="Fecha" Value="4"></asp:ListItem>
                            <asp:ListItem Text="Centro de Costo" Value="5"></asp:ListItem>
                            <asp:ListItem Text="Línea" Value="6"></asp:ListItem>
                            <asp:ListItem Text="Equipo" Value="7"></asp:ListItem>
                            <asp:ListItem Text="Plan" Value="8"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td>
                        <asp:Label ID="Label2" runat="server" text="Valor:"></asp:Label>
                    </td>
                    <td valign="baseline" id="td_FilNormal">
                        <asp:TextBox ID="txtBusqueda" runat="server" Width="150px"></asp:TextBox>
                    </td>

                    <td valign="baseline" id="td_FilRangoFecha" style="display: none; width: 265px;">
                        <asp:TextBox ID="txtFechaInicio" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrarFechaInicio" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:TextBox ID="txtFechaFin" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrarFechaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>&nbsp;&nbsp;&nbsp;
                    </td>

                    <td valign="baseline" id="td_FilEmpleado"  style="display: none; width: 265px;">
                        <asp:TextBox ID="txtAutocomplete" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfAutocomplete" runat="server" />
                    </td>

                    <td valign="baseline" id="td_FilCuenta"  style="display: none; width: 265px;">
                        <asp:TextBox ID="txt_Cuenta" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdf_Cuenta" runat="server" />
                    </td>

                    <td valign="baseline" id="td_FilCentroCosto"  style="display: none; width: 265px;">
                        <asp:TextBox ID="txt_CentroCosto" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdf_CentroCosto" runat="server" />
                    </td>

                    <td style="width:25px;">         
                    <div>         
                        <img id="imgBuscar" alt="imgBuscar" src="../../Common/Images/Mantenimiento/Busqueda_16x16.png" class="imgBtn" title="Buscar"/>
                        </div>  
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="6">
                        <table id="tblPedidosElegidos"></table>
                        <div id="pager"></div>
                    </td>
                </tr>
            </table>

        </div>
  
        <div id="dvAcciones" style="margin-top:5px; text-align:left;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Generar16.png" />
                <a>Generar Corte</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>

        <div id="dvNuevo" style="display:none;">
            <iframe id="ifNuevo" frameborder="0" style="padding: 0px; margin: 0px; height: 500px; width:750px;"></iframe>
        </div>
    </form>
</body>
</html>
