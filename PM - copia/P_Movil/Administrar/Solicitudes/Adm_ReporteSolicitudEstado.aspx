<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_ReporteSolicitudEstado" Codebehind="Adm_ReporteSolicitudEstado.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_ReporteSolicitudEstado.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfTabSolicitud" runat="server" />
        <asp:HiddenField ID="hdfTipoReporte" runat="server" />
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;">
            <table border="0">
                <tr>
                    <td style="width:60px" rowspan="2">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td>
                    <td valign="middle" style="width:60px">Fechas:</td>
                    <td valign="middle" style="width:300px">
                        <asp:TextBox ID="txtFechaInicio" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarFechaInicio" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                        &nbsp;-&nbsp;
                        <asp:TextBox ID="txtFechaFin" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarFechaFin" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                </tr>
                <tr>
                    <td valign="middle">Estado:</td>
                    <td valign="middle">
                        <asp:DropDownList ID="ddlEstado" runat="server"></asp:DropDownList>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        Tipo:
                        &nbsp;&nbsp;
                        <asp:DropDownList ID="ddlTipo" runat="server"></asp:DropDownList>
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
