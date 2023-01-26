<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_SeleccionarOficina" Codebehind="SeleccionarOficina.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>

    <%--<script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>--%>

    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="SeleccionarOficina.js" type="text/javascript"></script>

    <style type="text/css">
        body {
            overflow-y: hidden;
        }

    </style>
</head>
<body>
    <form id="form1" runat="server">
      <asp:HiddenField ID="hdfPais" runat="server" />
      <asp:HiddenField ID="hdfCiudad" runat="server" />
      <asp:HiddenField ID="hdfProvincia" runat="server" />
      <asp:HiddenField ID="hdfDistrito" runat="server" />
    <div>
        <div class="dvPanel">
            <table  cellspacing="0">
                <tr>
                    <td colspan="2">
                        <span style="font-size:large; font-weight:bold;">Filtros:</span>
                    </td>
                    <td class="TituloMant" style="width: 110px;" align="right">
                        Código:&nbsp;
                    </td>
                    <td>
                        <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloOficina" align="right">
                        País:&nbsp;
                    </td>
                    <td>
                        <asp:TextBox ID="txtPais" runat="server" Width="200px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                    <td class="TituloOficina" align="right">
                        Ciudad:&nbsp;
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtCiudad" runat="server" Width="200px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloOficina" align="right">
                        Provincia:&nbsp;
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtProvincia" runat="server" Width="200px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                    <td class="TituloOficina" align="right">
                        Distrito:&nbsp;
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDistrito" runat="server" Width="200px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloOficina" align="right">
                        Descripción:&nbsp;
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="200px" MaxLength="100"></asp:TextBox>
                    </td>
                    <td class="TituloOficina" align="right">
                        Dirección:&nbsp;
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDireccion" runat="server" Width="200px" MaxLength="100"></asp:TextBox>
                        <div id="btnBuscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" class="btnNormal" style="width: 25px; height: 18px; text-align: center; vertical-align: middle; margin-top:-3px;">
                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" title="Buscar" Width="16px"/>
                        </div>
                    </td>
                </tr>
            </table><br />
            <table id="tblEleccionOficinas"></table>
            <div id="pagerOficina"></div> 
        </div>
        <%--<br />
        <div style="margin-top:2px;">
            <div style="margin-top:2px;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                    <a>Agregar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>--%>
    </div>
    </form>
</body>
</html>
