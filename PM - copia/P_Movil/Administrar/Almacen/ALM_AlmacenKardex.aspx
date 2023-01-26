<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ALM_AlmacenKardex.aspx.vb" Inherits=".ALM_AlmacenKardex" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="ALM_AlmacenKardex.js" type="text/javascript"></script>
    <link href="ALM_AlmacenKardex.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfMiCampana" runat="server" />
    <asp:HiddenField ID="hdfMiTipoLinea" runat="server" />
    <asp:HiddenField ID="hdfMiTipo" runat="server" />
    <asp:HiddenField ID="hdfMiTipoServicio" runat="server" />
    <asp:HiddenField ID="hdfCampanaActiva" runat="server" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />

    <div id="global">
        <div id="dvFiltros">
            <div class="dvPanel flotarIzquierda" style=" height:20px; margin-right:5px; margin-bottom:5px;" runat="server">
            <span style="position:relative; top:-23px; left:0px; background-color:White; font-weight:bold;">Operador </span>
                <asp:DropDownList ID="ddlOperador" runat="server" style="margin-left:-45px;">               
                </asp:DropDownList>
            </div>

            <div class="dvPanel flotarIzquierda" style=" height:20px; margin-right:5px; margin-bottom:5px;" runat="server">
            <span style="position:relative; top:-23px; left:0px; background-color:White; font-weight:bold;">Tipo línea</span>
                <asp:DropDownList ID="ddlLineaTipo" runat="server" style="margin-left:-50px;">               
                </asp:DropDownList>
            </div>

            <div id="dvFiltroCampana" class="dvPanel flotarIzquierda" style=" height:20px; margin-right:5px; margin-bottom:5px; display:none;" runat="server">
            <span style="position:relative; top:-23px; left:0px; background-color:White; font-weight:bold;">Campaña</span>
                <asp:DropDownList ID="ddlCampana" runat="server" style="margin-left:-47px;">               
                </asp:DropDownList>
            </div>

            <div class="dvPanel flotarIzquierda" style=" height:20px; margin-right:5px; margin-bottom:5px; " runat="server">
            <span style="position:relative; top:-23px; left:0px; background-color:White; font-weight:bold;">Tipo Dispositivo</span>
                <asp:DropDownList ID="ddlTipo" runat="server" style="margin-left:-80px;">               
                </asp:DropDownList>

            </div>

            <div id="dvFiltroTipoServicio" class="dvPanel flotarIzquierda" style=" height:20px; margin-right:5px; margin-bottom:5px; display:none;" runat="server">
            <span style="position:relative; top:-23px; left:0px; background-color:White; font-weight:bold;">Tipo Modelo</span>
                <asp:DropDownList ID="ddlTipoServicio" runat="server" style="margin-left:-60px; ">               
                </asp:DropDownList>
            </div>
            <div id="Div2" class="flotarIzquierda" style="  margin-right:5px; margin-bottom:5px; margin-top:8px;" runat="server">
                <div id="btnBuscar" class="btnNormal">
                    <img id="Image1" title="Buscar" src="../../../Common/Images/lup.png" style="width: 16px" alt="Buscar">
                </div>
            </div>
            <div id="Div1" class="flotarIzquierda" style="  margin-right:5px; margin-bottom:5px; margin-top:8px;" runat="server">
                <eeg:ExportarExcelGenerico ID="eegKardex" runat="server" />
            </div>
        </div>
        <div style="clear:both; height:10px;"></div>
        <table id="gridKardex" >
        </table>
        <div id="pagerKardex">
        </div>
    
    </div>
    </form>
</body>
</html>
