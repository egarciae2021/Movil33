<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_HistorialSolicitudes" Codebehind="Adm_HistorialSolicitudes.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link  href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script> 
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="Adm_HistorialSolicitudes.js" type="text/javascript"></script>        
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField ID="hdfinCod" runat="server" />
        <asp:HiddenField ID="hdfinTip" runat="server" />
        <asp:HiddenField ID="hdfinTipOri" runat="server" />
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;">
            <table border="0" cellpadding="0" cellspacing="3">
                <tr>
                    <td style="width:60px">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td>
                    <td valign="middle" style="width:60px">Período:</td>
                    <td valign="middle" style="width:300px">
                            <asp:TextBox ID="txtFechaInicio" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                            <img id="imgBorrarFechaInicio" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                            &nbsp;-&nbsp;
                            <asp:TextBox ID="txtFechaFin" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                            <img id="imgBorrarFechaFin" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                    <td valign="middle" style="width:30px">Línea:</td>
                    <td valign="middle" style="width:250px">
                        <asp:TextBox ID="txtLinea" runat="server" style="margin-left:15px; font-weight:normal;" width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                    <td valign="middle" style="width:30px">IMEI:</td>
                    <td valign="middle" style="width:250px">
                        <asp:TextBox ID="txtIMEI" runat="server" style="margin-left:15px; font-weight:normal;" width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                    <td valign="middle" style="width:35px">Modelo:</td>
                    <td valign="middle" style="width:250px">
                        <asp:TextBox ID="txtModelo" runat="server" style="margin-left:15px; font-weight:normal;" width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td valign="middle">Empleado:</td>
                    <td valign="middle">
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="195px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" /> 
                    </td>
                    <td valign="middle">Estado:</td>
                    <td valign="middle">
                        <asp:TextBox ID="txtEstado" runat="server" style="margin-left:15px; font-weight:normal;" width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                    <td valign="middle">Tipo:</td>
                    <td valign="middle">
                        <asp:TextBox ID="txtTipo" runat="server" style="margin-left:15px; font-weight:normal;" width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                    <td valign="middle" colspan="2">
                        <div id="btnBuscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="width: 25px; height: 18px; text-align: center; vertical-align: middle;">
                            <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" title="Buscar" class="imgBtn"/>
                        </div>
                    </td>
                </tr>
                </table>
        </div>
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; margin-top:5px;">
            <iframe id="ifReporte" height="390px" width="100%" style="height:590px;" frameborder="0"></iframe>
        </div>
    </form>
</body>
</html>
