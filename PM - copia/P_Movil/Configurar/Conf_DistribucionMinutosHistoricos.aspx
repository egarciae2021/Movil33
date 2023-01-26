<%@Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_DistribucionMinutosHistoricos" Codebehind="Conf_DistribucionMinutosHistoricosHistoricos.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%--<%@Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>--%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
   <%-- <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Entidades/ENT_MOV_Parametros.js" type="text/javascript"></script>
--%>
     <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
     
    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css"  />
    
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript" ></script>

    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
        
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>


    <script src="Conf_DistribucionMinutosHistoricos.js" type="text/javascript"></script>


    <link href="../../Common/Styles/dhtmlxtree.css" rel="stylesheet" type="text/css" />

    <script src="../../Common/Scripts/dhtmlx/dhtmlxcommon.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/dhtmlxtree.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
    
</head>
<body>
    <form id="form1" runat="server"  >
    
    <asp:HiddenField ID="hdfidPeriodo" runat="server" />
    <asp:HiddenField ID="hdfidOperador" runat="server" />
    <asp:HiddenField ID="hdfidCuenta" runat="server" />
    <asp:HiddenField ID="hdfvcPeriodo" runat="server" />
    <asp:HiddenField ID="hdfvcFiltroDetalle" runat="server" />
    <asp:HiddenField ID="hdfArchivo" runat="server" />
    
    <div id="dvCargando" class="dvCargando"></div>
    <div>
        <table align="left" style="width:100%;">
            <tr>
                <td>
                    <div class="dvPanel">
                        <table id="tbVerGrafico" style="width:100%" border="0"  cellpadding="0"  cellspacing="0" >
                            <tr>
                                <td style="width:25px;">
                                    <asp:Image ID="imCambiarCriterio" runat="server" CssClass="imgBtn" ToolTip="Cambiar Criterio" Width="16" Height="16"
                                    ImageUrl="../../Common/Images/Mantenimiento/Replace_24x24.png" />
                                </td>
                                <td id="tdCriterioCuenta" style="width:310px;">
                                    Cuenta Bolsa&nbsp;
                                    <asp:DropDownList ID="ddlCuenta" runat="server" Width="210"></asp:DropDownList>
                                </td>
                                <td id="tdCriterioLinea" style="width:310px; display:none;">
                                    Línea&nbsp;
                                    <asp:TextBox ID="txtLinea" runat="server" Width="200"></asp:TextBox>
                                </td>
                                <td style="width:260px;">
                                    Tipo Distribución&nbsp;
                                    <asp:DropDownList ID="ddlTipDis" runat="server" Width="150"></asp:DropDownList>
                                </td>
                                <td style="width:130px;">
                                    N° Meses 
                                    <asp:DropDownList ID="ddlNumeroMeses" runat="server" Width="50" Height="22"></asp:DropDownList>
                                </td>
                                <td>
                                    <%--
                                    <div id="Div2" class="btnNormal" title="Exportar Periodos">
                                    <table cellpadding="0" cellspacing="0" border ="0">
                                    <tr>
                                    <td><asp:Image ID="Image1" runat="server" 
                                    ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></td>                                
                                    </tr>
                                    </table>
                                    </div>--%>
                                    <div id="btnFiltrarHist" class="btnNormal" title="Buscar">
                                        <asp:Image ID="Image2" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                                    &nbsp;
                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                            <tr>
                                <td></td>
                            </tr>
                            <%--<tr>
                                <td colspan="10">
                                    <table id="tbHistorico"></table>
                                    <div id="dvEmptyHistorico" style="font-size:medium; color:Gray; display:none;">No hay datos disponibles ..</div>
                                </td>
                            </tr>--%>
                            <tr>
                                <td colspan="10">
                                    <div id="dvGrillaCuentas"></div>
                                    <div id="dvEmptyCuentas" style="font-size:medium; color:Gray; display:none;">No hay datos disponibles ..</div>
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <%--<tr>
                                <td colspan="10">
                                    <table id="tbOrga"></table>
                                    <div id="dvEmptyOrga" style="font-size:medium; color:Gray; display:none;">No hay datos disponibles ..</div>
                                </td>
                            </tr>--%>
                            <tr>
                                <td colspan="10">
                                    <div id="dvGrillaAgrupacion"></div>
                                    <div id="dvEmptyAgrupacion" style="font-size:medium; color:Gray; display:none;">No hay datos disponibles ..</div>
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td colspan="10">
                                    <div id="dvTituloGrafico" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix" style="height:18px; " >
                                        <table style="width:880px;" border="0">
                                            <tr style="vertical-align:left;font-size:11px">
                                                <td >Gráfico por Periodo de <label id="lblTituloHistorico3" for="lbl"></label> </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <%--<tr>
                                <td> 
                                    <div id="Div11" style="font-size:medium; color:Gray;">No hay datos disponibles ..</div> 
                                </td>
                            </tr>--%>
                            <tr>
                                <td colspan="10">
                                    <div id="dvGrafico" style="font-size:medium; color:Gray;">No hay datos disponibles ..</div> 
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
                 
        <center>
        
            <!-- ========================================================================================
                EXPORTACION IMPORTACION
            ========================================================================================-->
            <%--<div id="dvExportacionImportacion" style="display:none; padding:0px; margin:0px;">
                <iframe id="ifExportacionImportacion" runat="server" frameborder="0" style="padding:0px; margin:0px;"></iframe>
            </div>--%>

            <!-- ========================================================================================
                    DETALLE LINEAS
            ========================================================================================-->
            <%--<div id="dvLineaDetalle" style="display:none; padding:0px; margin:0px;">
                <table>
                    <tr>
                        <td style="width:100px;text-align :center ">Filtrar</td>
                        <td><asp:TextBox id="txtFiltroDetalle" ToolTip="(presionar ENTER para buscar)" runat="server" Width="130px" MaxLength="40" onkeypress="if (event.keyCode==13){ Filtra_DataDetalle();}"></asp:TextBox></td>
                        <td></td>
                    </tr>
                </table>
                <table id="tbLineaDetalle"></table>    
                <div id="pagerLineaDetalle"></div>
            </div>--%>    

            <!-- ========================================================================================
                        DETALLE CUENTA
            ========================================================================================-->
            <%--<div id="dvValidaProcesar" style="display:none; padding:5px; margin:5px;">
                <table>
                    <tr>
                        <td colspan="2">Debe seleccionar un servicio, el cual se aplicara los valores asignados</td>
                    </tr>
                    <tr>
                        <td><br /></td>
                    </tr>
                    <tr>
                        <td>Servicios</td>
                        <td> <asp:DropDownList ID="ddlServicio" runat="server" Width="200px"></asp:DropDownList></td>
                    </tr>
                </table>
            </div>--%>

            <!-- ========================================================================================
                        DETALLE CUENTA
            ========================================================================================-->
            <%--<div id="dvDetalleCuenta" style="display:none; padding:0px; margin:0px;">
                <iframe id="ifDetalleCuenta" runat="server" frameborder="0" style="padding:0px; margin:0px;"></iframe>
            </div>--%>

            <!-- ========================================================================================
                LISTA PERIODOS CREADOS - hinope
            ========================================================================================-->
            <%--<div id="dvPeriodosCreados" style="display:none; padding:0px; margin:0px; ">
                <table style="width:100%;height:100%" border="0">
                    <tr>
                        <td align="center">
                            <table id="tbPeriodosCreados"></table>
                        </td>
                    </tr>
                </table>
                <center>
                        
                </center>
            </div>--%>

            <!-- ========================================================================================
                    OTROS  OTROS  OTROS  OTROS
            ========================================================================================-->
        </center>

        <%--<table style="width: 800px;display :none;"  border="0" align="center">
            <tr>
                <td  align ="center" style="font-size:16px;" >
                    configuraci&oacuten de distribución de minutos
                    &nbsp;
                </td>
            </tr>
            <tr>
                <td align="right">
                    <div id="btnguardar_" class="btnnormal">
                        <asp:image id="imgguardar" runat="server" imageurl="~/common/images/mantenimiento/guardar.png" />
                        <a>aplicar cambios</a>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" height="10px"></td>
            </tr>
            <tr>
                    <td  align="center" >            
                        <div class="dvpanel" style="float: left; margin-left:10px; width:100%;" id="panelbusqueda">
                            <asp:label id="lbltipodistribucion" runat="server" text="tipos de distribución:"></asp:label>
                            <asp:radiobuttonlist id="rblsttipodistribucion" runat="server" repeatdirection="horizontal">
                                <asp:listitem value="1">por línea</asp:listitem>
                                <asp:listitem value="2">por centro de costo</asp:listitem>
                                <asp:listitem value="3">por área</asp:listitem>
                                <asp:listitem value="4">por nivel</asp:listitem>
                                <asp:listitem value="5">por grupo de empleados</asp:listitem>
                            </asp:radiobuttonlist>
                            <br />
                            <div id="dvclasedistribucion" runat="server" style="display:none;">
                                <asp:radiobuttonlist id="rblstclasedistribucion" runat="server" repeatdirection="horizontal">
                                    <asp:listitem value="p">en porcentaje</asp:listitem>
                                    <asp:listitem value="c">en cantidades</asp:listitem>
                                </asp:radiobuttonlist>
                            </div>
                        </div>
                    </td>
                </tr>
        </table>--%>
    </div>
    </form>

</body>
</html>