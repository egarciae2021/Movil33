<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_ProgramacionArchivos.aspx.vb" Inherits=".Comp_ProgramacionArchivos" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register src="../../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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

    <script src="Comp_ProgramacionArchivos.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfvcTab" runat="server" /> 
    <div>
        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px;">
            <cc1:ContenedorTabJQ Titulo="Detalle">
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="dvPanel" style="margin: 0px !important; padding: 0px !important;">
                                <table id="tbGeneral" width="100%">
                                    <tr>
                                        <td>
                                        </td>
                                        <td style="padding-right: 5px;">
                                            <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td runat="server" visible="false">
                                                        <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo">
                                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div runat="server" id="btnEditar" class="btnNormal" runat="server" title="Editar">
                                                            <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td runat="server" visible="false">
                                                        <div runat="server" id="btnEliminar" class="btnNormal" runat="server" title="Eliminar">
                                                            <asp:Image ID="imgEliminar" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/delete_16x16.gif" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>                             
                                        <td style="width: 5px;">
                                        </td>
                                        <td style="width: 20px; padding-right: 5px;">
                                            <table id="tbExportar" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <uc1:ExportarExcelGenerico ID="eegProgramacionArchivos" runat="server" />
                                                    </td>                                                
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="padding-right: 5px;">
                                            <table border="0">
                                                <tr>
                                                    <td style="width: 40px; height: 32px">
                                                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                    </td>
                                                    <td>En</td>
                                                    <td valign="middle" style="width: 170px;">
                                                        <asp:DropDownList ID="ddlFiltro" runat="server" Width="150px">
                                                            <asp:ListItem Value="IdFacConfiguracion" Text="Código"></asp:ListItem> 
                                                            <asp:ListItem Value="Descripcion" Text="Descripción"></asp:ListItem>                                                        
                                                            <asp:ListItem Value="Origen" Text="Ruta Origen"></asp:ListItem>
                                                            <asp:ListItem Value="Destino" Text="Ruta Destino"></asp:ListItem>                                                                                                          
                                                        </asp:DropDownList>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width: 40px">
                                                       Filtrar
                                                    </td>
                                                    <td style="width: 250px; text-align: left;">
                                                      
                                                            <asp:TextBox ID="txtFiltro" runat="server" Width="200px"></asp:TextBox>
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
                            <table id="grid" runat="server">
                            </table>
                            <div id="pager">
                            </div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>
    </div>
    </form>
</body>
</html>
