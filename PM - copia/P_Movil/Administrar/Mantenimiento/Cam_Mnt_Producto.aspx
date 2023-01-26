<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_Producto" Codebehind="Cam_Mnt_Producto.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/VistaModelo/ENT_Entidad.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/VistaModelo/MOV_CAM_ProductoTipo.js" type="text/javascript"></script>
    <script src="Cam_Mnt_Producto.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdTipoProducto" runat="server"/>
        <asp:HiddenField ID="hdfIdCliente" runat="server"/>
        <div id="dvContenido">
            <div id="dvCampos">
                <table>
                    <tr data-bind="style: { display: IdProductoTipoEditado() ? '' : 'none' }">
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkEstado" type="checkbox" data-bind="checked: Vigente"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="txtDescripcionCab" runat="server" text="Descripción"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtDescripcion" runat="server" Width="200px" data-bind="value:Descripcion, enable: Vigente"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <%--<select data-bind="options: Entidad.lstEntidad, optionsText: 'vcDes', optionsValue: 'P_inCod', value: IdEntidad"></select>--%>
                            <asp:Label ID="lblEntidadCab" runat="server" Text="Entidad"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:DropDownList ID="ddlEntidad" runat="server" data-bind="options: Entidad.lstEntidad, optionsText: 'vcDes', optionsValue: 'P_inCod', value: IdEntidad, enable: Vigente">
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr data-bind="style: { display: IdEntidad() != -1 ? '' : 'none' }">
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblProductoCab" runat="server" Text="Producto"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:DropDownList ID="ddlProducto" runat="server" data-bind="options: Producto.lstProducto, optionsText: 'vcDes', optionsValue: 'P_inCod', value: IdProducto, enable: Vigente"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="txtServicioMensualCab" runat="server" text="Servicio Mensual"></asp:Label>
                        </td>
                        <td>
                            <input id="chkServicioMensual" type="checkbox" data-bind="value:ServicioMensual, enable: Vigente"/>                   
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="txtIlimitadoCab" runat="server" text="Ilimitado"></asp:Label>
                        </td>
                        <td>
                            <input id="chkIlimitado" type="checkbox" data-bind="value:Ilimitado, enable: Vigente"/>                   
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <div id="dvAcciones" style="margin-top:2px;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>