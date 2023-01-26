<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Adm_VisorComprobantes.aspx.vb" Inherits="Comp_Adm_VisorComprobantes" %>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="Comp_Adm_VisorComprobantes.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/Entidades/ENT_MOV_FAC_Comprobante.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_FAV_ComprobanteDetalle.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfPeriodo"/>
        <asp:HiddenField runat="server" ID="hdfCodEmpleado"/>
        <asp:HiddenField runat="server" ID="hdfRuta"/>
        <div id="dvCargando" class="dvCargando">
        </div>
        <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto; padding: 5px; background-image: none; margin-top: 0px;">
            <table id="tb1" runat="server" border="0" align="center" width="100%">
                <tr runat="server" id="trEmp">
                    <td style="width:10px;"></td>
                    <td style="width: 100px; vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Empleado</td>
                    <td style="width :100px;">
                        <asp:TextBox ID="txtEmpleado" runat="server" title="Ingrese el código o nombre del empleado" Width="250px" MaxLength="30"></asp:TextBox>
                    </td>
                    <td style="width: 30px"></td>
                    <td style=" vertical-align: middle; padding-right: 5px; width: 180px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">DNI</td>
                    <td>
                        <asp:TextBox ID="txtNroDoc" runat="server" ToolTip="Ingrese el documento de identidad del empleado" Width="120px" MaxLength="8" ></asp:TextBox>
                    </td>
                    <td></td>
                    <td style="width:10px;"></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Tipo de Proceso</td>
                    <td>
                        <asp:DropDownList runat="server" ID="dwTipoProceso" Width="130px"></asp:DropDownList>
                    </td>
                    <td></td>
                    <td style=" vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Tipo Documento</td>
                    <td title="Seleccione el tipo de documento">
                        <asp:DropDownList runat="server" ID="dwTipoComp" Width="130px"/>
                    </td>
                    <td rowspan="2" valign="bottom" align="right">
                       <div id="btnBuscar" style="width: 95px;" title="Buscar comprobantes" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" width="16" height="16" ImageUrl="~/Common/Images/lup.png" />
                            <a>Buscar</a>                               
                        </div>
                        <div id="btnLimpiar" style="width: 95px;" title="Limpiar filtros de búsqueda" class="btnNormal">
                            <asp:Image ID="imgLimpiar" runat="server" width="16" height="16" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                            <a>Limpiar</a>
                        </div>
                    </td>
                    <td style="width:10px;"></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Periodo</td>
                    <td>
                        <asp:TextBox ID="txtPeriodo" runat="server" Width="130px" MaxLength="7"></asp:TextBox>
                    </td>
                    <td></td>
                    <td style="vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Estado</td>
                    <td title="Seleccione el estado de acuerdo al tipo documento">
                        <asp:DropDownList id="dwEstado" runat="server" Width="130px"></asp:DropDownList>
                    </td>
                    
                    <td style="width:10px;"></td>
                </tr>
            </table>
        </div>
        
        <div id="divGrilla" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto; padding: 5px; background-image: none; margin-top: 3px;">
            <table id="tb2" runat="server" border="0" align="center">
                <tr>
                    <td align="right" style="">
                        <div id="dvBotones" style="width: 90px; margin-bottom: -3px">
                            <div id="btnExportar" runat="server" title="Exportar a Excel">
                            <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" width="16" height="16" />
                        </div>
            
                        <div id="btnPdf" style="width: 38px;" title="Exportar a PDF">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/pdf.ico" Style="height: 16px; width: 16px;" />
            
                        </div>
                     
                    </div>    
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table id="grid"></table>
                        <div id="pager"></div>    
                    </td>
                </tr>
            </table>
                
        </div>

        <iframe id="ifExcel" frameborder="0" style="padding:0px; margin:0px; display:none;"></iframe>
         <div id="dvVisPre" class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; display: none; margin-top:5px;width:900px;">
            <iframe id="ifReporte" height="720px" width="860px" frameborder="0"></iframe>
        </div>
    </form>
</body>
</html>
