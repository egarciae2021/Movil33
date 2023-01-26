<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_DespachoVisor" Codebehind="Cam_DespachoVisor.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_PedidosVisor.js" type="text/javascript"></script>
    <script src="Cam_DespachoVisor.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
            Campaña
        </div>
        <asp:DropDownList ID="ddlCampana" runat="server"></asp:DropDownList>
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-circle-arrow-s" style="float:left; margin:-2px 5px 0 0;"></span>
            Filtros
        </div>
        <div class="dvPanel ui-widget-content ui-corner-all">
<%--            <table>
                <tr>
                    <td>
                        <asp:Label ID="lblOficinaTitulo" runat="server" Text="Oficina"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtOficina" runat="server" Width="130px"></asp:TextBox>
                    </td>
                    <td></td>
                    <td>
                        <asp:Label ID="Label7" runat="server" Text="Empleado"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="130px"></asp:TextBox>
                    </td>
                    <td></td>
                </tr>              
            </table>--%>
            <table >
                <tr>
                    <td class="tdEtiqueta" style="width:60px;">Estado:</td>
                    <td>
                        <asp:DropDownList ID="ddlEstado" runat="server" Width="235px"></asp:DropDownList>
                    </td>
                    <td style="width:20px;"></td>
                    <td class="tdEtiqueta" style="width:60px;">Cuenta:</td>
                    <td>
                        <asp:DropDownList ID="ddlCuenta" runat="server" Width="235px"></asp:DropDownList>
                    </td>
                    <td style="width:20px;"></td>
                    <td class="tdEtiqueta" style="width:80px;">Situación:</td>
                    <td>
                        <asp:DropDownList ID="ddlSituacion" runat="server" Width="235px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta" style="width:60px;">Área:</td>
                    <td>
                        <asp:TextBox ID="txtArea" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodAreaBusqueda" runat="server"/>
                        <asp:HiddenField ID="hdfCodIntArea" runat="server" />                        
                        <asp:HiddenField ID="HiddenField1" runat="server" />
                    </td>
                    <td></td>
                    <td class="tdEtiqueta" style="width:80px;">Centro Costo:</td>
                    <td>
                        <asp:TextBox ID="txtCentroCosto" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCCOBusqueda" runat="server"/>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta" style="width:80px;">Empleado:</td>
                    <td>
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                    </td>
                    <td></td>
                    <td class="tdEtiqueta" style="width:80px;">Oficina:</td>
                    <td>
                        <asp:TextBox ID="txtOficina" runat="server" Width="225px"></asp:TextBox>
                        <asp:HiddenField ID="hdfOficina" runat="server" />
                    </td>
                    <td></td>
                    <td class="tdEtiqueta">Periodo:</td>
                    <td>
                        <asp:TextBox ID="txtFechaInicio" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrarFechaInicio" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:TextBox ID="txtFechaFin" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrarFechaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>&nbsp;&nbsp;&nbsp;
                    </td>
                    <td></td>
                    <td class="tdEtiqueta" style="width:60px;">
                        <div id="btnBuscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" class="btnNormal" style="width: 25px; height: 18px; text-align: center; vertical-align: middle; margin-top:-10px;">
                            <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" title="Buscar"/>
                        </div>
                    </td>
                    <td>

                    </td>
                </tr>
            </table> 
        </div>
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-circle-arrow-s" style="float:left; margin:-2px 5px 0 0;"></span>
            Listado
        </div>
        <table id="tbDespacho"></table>
        <div id="pager"></div>
    </form>
</body>
</html>