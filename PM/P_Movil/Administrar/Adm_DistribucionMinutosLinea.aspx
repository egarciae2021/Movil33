<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_DistribucionMinutosLinea" Codebehind="Adm_DistribucionMinutosLinea.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid443/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/dhtmlxtree.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid443/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid443/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid443/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/dhtmlxcommon.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/dhtmlxtree.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Adm_DistribucionMinutosLinea.js" type="text/javascript"></script>
    <style type ="text/css" >
        .prueba
        {
            color:Red;
            }
    </style>
    <script type="text/javascript">

    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>        

        <div id="divMsgInformativo" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <div id="dvContenidoInformativo"></div>
        </div>
        
        <asp:HiddenField ID="hdfValorIlimitado" runat="server" />

        <div id="btnAbrirOpciones" title="Abrir Opciones" style="width:33px; height:30px; position:absolute; left:5px; top:50%; z-index:1001; box-shadow:3px 3px 5px gray;">
        </div>
        <table>
            <tr>
                <td id="tdBuscador" style="padding-left:10px; display:none;">

                    <cc1:TabJQ ID="TabOpciones" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;">
                        <cc1:ContenedorTabJQ Titulo="Organización" Height="860px" Width="290px">  
                            <table>
                                <tr>
                                    <td>
                                        <div class="dhtmlxTree dvPanel" id="dvOrganizacion" style="width:260px;height:300px; overflow:auto;"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:CheckBox ID="chkIncluirDependencia" runat="server" Text="Incluir información de dependecia"/>
                                    </td>
                                </tr>
                            </table>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ Titulo="Filtros" Height="360px" Width="290px">
                            <br />
                            <table style="padding-left:5px; width:100%;">
                                <tr>
                                    <td>
                                        Linea:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtLinea" runat="server" Width="170px"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodLin" runat="server" />
                                        <asp:HiddenField ID="hdfNomEmp" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Empleado:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtEmpleado" runat="server" Width="170px"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Organización:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtOrganizacion" runat="server" Width="170px"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodOrganizacion" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Centro de Costo:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtCentroCosto" runat="server" Width="170px"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodCentroCosto" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Dispositivo:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtCodigoDispositivo" runat="server" Width="170px"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodDispositivo" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Modelo Dispositivo:
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlModeloDispositivo" runat="server" Width="180px"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Sucursal:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtSucursal" runat="server" Width="170px"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodSucursal" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Tipo linea:
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlTipoLinea" runat="server" Width="180px"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align:right;">
                                        <div id="btnFiltrar" class="btnNormal" runat="server">
                                            <asp:Image ID="imgFiltrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Filtro_16x16.png" />
                                            <a>Filtrar</a>
                                        </div>
                                    </td>
                                </tr>                                                                    
                            </table>
                        </cc1:ContenedorTabJQ>
                    </cc1:TabJQ>
                </td>
                <td>
                    <table id="tbLinea"></table>
                    <div id="pagerLinea"></div>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
