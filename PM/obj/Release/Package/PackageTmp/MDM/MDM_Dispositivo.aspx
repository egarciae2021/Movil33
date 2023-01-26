<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="MDM_Dispositivo.aspx.vb" Inherits=".MDM_Dispositivo" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.contextmenu.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid443/jquery.jqGrid.min.js" type="text/javascript"></script>
    <link href="../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet" />
    <link href="../Content/css/shared/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <script src="../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>
    <style type="text/css">

    </style>

    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

    <link href="../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdFiltro" runat="server" Value=""/>
        <asp:HiddenField ID="hdfIdTipoFiltro" runat="server" Value=""/>
        <asp:HiddenField ID="hdfvcTecnico" runat="server" Value=""/>

        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MDM_Dispositivo.js")%>" type="text/javascript"></script>
        <div class="dvPanel" id="dvFiltros" style="display: none;">
            <div class="row">
                <div class="col-xs-12 col-sm-3">
                    <div class="form-group">
                        <label class="col-xs-3 control-label" for="demo-text-input">Buscar:&nbsp</label>
                        <div class="col-xs-9">
                            <select name="ddlBusqueda" id="ddlBusqueda" style="width: 100%;">

                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                    <div class="form-group">
                        <label class="col-xs-3 control-label" for="demo-text-input">Filtrar:&nbsp</label>
                        <div class="col-xs-9">
                            <input type="text" id="txtBusqueda" runat="server" value="" style="width: 100%;"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dvPanel" id="dvDispositivo" style="display: none;">
            <table width="100%" border="0">
                <tr style="height: 25px;">
                    <td>
                        <table id="tbDispositivo"></table>
                        <div id="PaginadorDispositivo">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvAplicaciones" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifAplicaciones" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>
        <div id="dvModal" style="display: none;">
            <iframe id="ifDetalle" runat="server" frameborder="0" style="padding: 0px; margin: 0px;" width="100%" height="100%"></iframe>
        </div>
        <div id="dvConfirmacion" style="display:none">
            <p>
                <asp:Label ID="Mensaje" Text="" runat="server"></asp:Label>
            </p>
            <span>¿Desea continuar?</span>
        </div>
    </form>
</body>
</html>
