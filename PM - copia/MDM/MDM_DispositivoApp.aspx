<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="MDM_DispositivoApp.aspx.vb" Inherits=".MDM_DispositivoApp" %>

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
        <asp:HiddenField ID="hdfToken" runat="server" Value=""/>
        <asp:HiddenField ID="hdfIdGateway" runat="server" Value=""/>

        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MDM_DispositivoApp.js")%>" type="text/javascript"></script>
        <div class="dvPanel" id="dvDispositivoApp" style="display: none;" >
            
            <div id="toolbar" class="ui-widget-content ui-corner-all" style="margin: 0px !important; padding: 0px !important; overflow: hidden;">
                
                    <table id="tblFiltro" border="0">
                    <tbody>
                        <tr>
                            <td style="width: 80px; height: 32px">
                                <span id="lblFiltro" style="font-weight:bold">&nbsp;Búsqueda....&nbsp;&nbsp;</span>
                            </td>
                            <td rowspan="2" valign="middle" style="width: 200px">En:&nbsp;
                                <asp:DropDownList ID="ddlBusqueda" runat="server" Style="margin-left: 15px; font-weight: normal;"
                                                        Width="150px">
                                                    </asp:DropDownList>
                            </td>
                            <td id="tdfiltro" rowspan="2" valign="middle" style="width: 220px">
                                <a id="lblfitxtfiltro">Filtrar:</a> &nbsp;
                                <asp:TextBox ID="txtBusqueda" runat="server" Text=""
                                                        Style="margin-left: 15px; font-weight: normal;" Width="140px" MaxLength="200"></asp:TextBox>
                            </td>
                            <td style="text-align: right;">
                                <button id="btnGuardar" type="button" class="btn btn-success" style="margin: 3px;"><span class="fa fa-save"></span> Grabar Cambios</button>
                            </td>
                        </tr>
                    </tbody>

                    </table>
		
                </div>

            <table width="100%" border="0">
                <tr style="height: 25px;">
                    <td>
                        
                        <div>
                            <table id="tbDispositivoApp"></table>
                            <div id="PaginadorDispositivoApp">
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
