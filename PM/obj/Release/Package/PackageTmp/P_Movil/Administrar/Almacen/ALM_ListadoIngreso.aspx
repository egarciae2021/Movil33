<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ALM_ListadoIngreso.aspx.vb" Inherits=".ALM_ListadoIngreso" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="ALM_ListadoIngreso.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px;">
            <cc1:ContenedorTabJQ Titulo="Detalle">
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">
                                <table id="tbGeneral" width="100%">
                                    <tr>
                                        <td></td>
                                        <td style="padding-right:5px;">
                                            <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo">
                                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="padding-right:5px;">
                                            <table border="0">
                                                <tr>
                                                    <td style="width:40px; height:32px" >
                                                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width:190px;">
                                                        En:&nbsp;&nbsp;&nbsp;
                                                        <asp:DropDownList ID="ddlFiltro" runat="server" Width="150px"></asp:DropDownList>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width:40px">
                                                        Filtrar:
                                                    </td>
                                                    <td style="width:250px; text-align:left;">
                                                        <div id="divCodigo"><asp:TextBox ID="txtCodigo" runat="server" Width="160px"></asp:TextBox></div>
                                                        <div id="divFecha"><asp:TextBox ID="txtFechaIni" runat="server" Width="60px" ToolTip="Fecha Inicio" ReadOnly="True"></asp:TextBox> - 
                                                        <asp:TextBox ID="txtFechaFin" runat="server" Width="60px" ToolTip="Fecha Fin" ReadOnly="True"></asp:TextBox>
                                                   </div>
                                                        <div id="divEmpleado"><asp:TextBox ID="txtEmpleado" runat="server" Width="240px"></asp:TextBox></div>
                                                        <div style="float:left;" id="divTipoSolicitud"><asp:DropDownList ID="ddlTipo" runat="server" Width="170px"></asp:DropDownList></div>
                                                        <div style="float:left; display:none;" id="divTipoSolicitudTec"><asp:DropDownList ID="ddlTipoTec" runat="server" Width="170px"></asp:DropDownList></div>
                                                        <div style="float:left; display:none;" id="divTipoSolicitudResApr"><asp:DropDownList ID="ddlTipoResApr" runat="server" Width="170px"></asp:DropDownList></div>
                                                        <div style="float:left; display:none;" id="divEstadoApr"><asp:DropDownList ID="ddlEstadoApr" runat="server" Width="170px"></asp:DropDownList></div>
                                                        <div style="float:left; display:none;" id="divEstadoPro"><asp:DropDownList ID="ddlEstadoPro" runat="server" Width="170px"></asp:DropDownList></div>
                                                    </td>
                                                    <td id="tdFecha" rowspan="2" valign="middle" style="width:270px">
                                                      <div id="divRangoFecha">
                                                        <table border="0">
                                                            <tr>
                                                              <td style="height:32px" >
                                                                <b>Rango de Fecha:</b>&nbsp;&nbsp;&nbsp;
                                                              </td>
                                                              <td style="height:32px" >
                                                                <asp:TextBox ID="txtRangoFechaIni" runat="server" Width="60px" ToolTip="Fecha Inicio" ReadOnly="True"></asp:TextBox> - 
                                                                <asp:TextBox ID="txtRangoFechaFin" runat="server" Width="60px" ToolTip="Fecha Fin" ReadOnly="True"></asp:TextBox>
                                                              </td>                                                        
                                                            </tr>                                                    
                                                        </table>
                                                      </div>                                                    
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table id="grid"></table>
                            <div id="pager"></div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>        
    </form>
</body>
</html>