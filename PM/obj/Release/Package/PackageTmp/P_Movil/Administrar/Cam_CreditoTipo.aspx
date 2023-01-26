<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_CreditoTipo" Codebehind="Cam_CreditoTipo.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_CreditoTipo.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdTipoCredito" runat="server"/>
        <div id="dvContenido">
            <div id="dvCampos">
                <table>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkEstado" type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblTipoProductoCab" runat="server" Text="Tipo Producto"></asp:Label>
                        </td>
                        <td>
                            <asp:DropDownList ID="ddlTipoProducto" runat="server"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblProductoCab" runat="server" Text="Producto"></asp:Label>
                        </td>
                        <td>
                            <asp:DropDownList ID="ddlProducto" runat="server"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblDescripcionCab" runat="server" Text="Descripción"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtDescripcion" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblOperativoCab" runat="server" text="Operativo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkOperativo" type="checkbox"/>
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
