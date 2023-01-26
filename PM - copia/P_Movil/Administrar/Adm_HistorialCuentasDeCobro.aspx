<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_HistorialCuentasDeCobro" Codebehind="Adm_HistorialCuentasDeCobro.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
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
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script type="text/javascript" src="Adm_HistorialCuentasDeCobro.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField ID="hdfinCod" runat="server" />
        <asp:HiddenField ID="hdfinTip" runat="server" />
        <asp:HiddenField ID="hdfinTipOri" runat="server" />

        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;">
            <table border="0">
                <tr>
                    <td style="width:60px">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td>
                    <td rowspan="2" valign="middle" style="width:300px">
                        Periodo:&nbsp;
                            <asp:TextBox ID="txtFechaInicio" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                            <img id="imgBorrarFechaInicio" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                        &nbsp;-&nbsp;
                            <asp:TextBox ID="txtFechaFin" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                            <img id="imgBorrarFechaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                    <td rowspan="2" valign="middle" style="width:250px">
                        Operador:&nbsp;
                        <asp:TextBox ID="txtOperador" runat="server" style="margin-left:15px; font-weight:normal;" 
                                        width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                    <td rowspan="2" valign="middle" style="width:250px">
                        Estado:&nbsp;
                        <asp:TextBox ID="txtEstado" runat="server" style="margin-left:15px; font-weight:normal;" 
                                        width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; margin-top:5px;">
            <iframe id="ifReporte" height="390px" width="100%" style="height:590px;" frameborder="0"></iframe>
        </div>
    </form>
</body>
</html>
