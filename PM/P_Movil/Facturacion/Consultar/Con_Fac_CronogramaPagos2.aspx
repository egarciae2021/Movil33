<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_CronogramaPagos2.aspx.vb" Inherits=".Con_Fac_CronogramaPagos2" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
     
     <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="Con_Fac_CronogramaPagos2.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js"
        type="text/javascript"></script>
    <script src="Con_Fac_CronogramaPagos2.js" type="text/javascript"></script>

        <style scoped="scoped">
        .employee-details ul
        {
            list-style: none;
            font-style: italic;
            margin-bottom: 20px;
        }
        
        .employee-details label
        {
            display: inline-block;
            width: 90px;
            font-style: normal;
            font-weight: bold;
        }
        .style1
        {
            width: 200px;
        }
        .style2
        {
            width: 27px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
   <asp:HiddenField ID="hdfTipo" runat="server" />
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfRuta" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
    <asp:HiddenField ID="hdfOrganizacion" runat="server" />
    <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto;
        width: 780px; padding: 10px; background-image: none; margin-top: 5px;">
        <table width="100%" border="0">
            <tbody>
                <tr>
                    <td>
                        <table border="0">
                            <tbody>
                                <tr>
                                    <td style="color: #003F59; vertical-align: middle; padding-right: 5px;">
                                        <b><span id="lblFiltro">Empleado</span></b>
                                    </td>
                                    <td style="padding-right: 10px;">
                                        <div id="dvContenedorTecRes" runat="server">
                                            <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="general">
        <div id="Principal">
            <div id="dvFechas">
                <table width="100%">
                    <tr>
                        <td align="left" style="color: #CC0000;">
                            <b><span id="spMensaje"></span></b>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <div id="pInformacionUsuario" class="pMedium">
                    <table id="tbInfoUsuario" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr height="5px">
                            <td colspan="4">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="cGenInfo" align="center">
                                <b>Información del Usuario</b>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="style4">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td style="vertical-align: bottom;" class="style2">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;" width="250px">
                                <b>Código:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblCodigoEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Nombre:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Área:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Centro de Costo:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblCCosto" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td style="vertical-align: bottom;" class="style2">
                            </td>
                        </tr>
                    </table>
                    <table align="left" style="width: 800px;">
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom; width: 80px;">
                                <b>Solicitud:</b>
                            </td>
                            <td style="width: 300px;" colspan="5">
                                <asp:DropDownList ID="ddlSolicitud" runat="server" class="ui-widget-content ui-corner-all"
                                    Style="width: 300px; margin-left: 15px; font-weight: normal; padding: 4px;" name="ddlBusqueda">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Fecha:</b>
                            </td>
                            <td style="vertical-align: bottom; width: 120px;">
                                <asp:Label ID="lblFechaSol" runat="server" Text="(Desconocido)" Width="120px"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom; width: 50px;">
                                <b>Descripción:</b>
                            </td>
                            <td colspan="3" style="vertical-align: bottom;" class="style2">
                                <asp:Label ID="lblDesSol" runat="server" Text="(Desconocido)" Width="500px"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom; width: 50px;">
                                <b>Moneda:</b>
                            </td>
                            <td style="vertical-align: bottom;" class="style1">
                                <asp:Label ID="lblMoneda" runat="server" Text="(Desconocido)" Width="150px"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom;" class="style2">
                                <b>Nro Cuotas:</b>
                            </td>
                            <td style="vertical-align: bottom;">
                                <asp:Label ID="lblNumCuotas" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Importe:</b>
                            </td>
                            <td style="vertical-align: bottom; width: 150px;">
                                <asp:Label ID="lblDeuda" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                    </table>
                    <%--     <table align="left" style="width: 800px;">
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom; width: 80px;">
                                <b>Solicitud:</b>
                            </td>
                            <td style="width: 300px;" colspan="5">
                                <asp:DropDownList ID="ddlSolicitudFac" runat="server" class="ui-widget-content ui-corner-all"
                                    Style="width: 350px; margin-left: 15px; font-weight: normal; padding: 4px;" name="ddlBusqueda">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Fecha:</b>
                            </td>
                            <td style="vertical-align: bottom;" class="style3">
                                <asp:Label ID="lblFechaSolFac" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom; width: 50px;">
                                <b>Descripción:</b>
                            </td>
                            <td colspan="3" style="vertical-align: bottom;" class="style2">
                                <asp:Label ID="lblDesSol" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom; width: 50px;">
                                <b>Moneda:</b>
                            </td>
                            <td style="vertical-align: bottom;" class="style3">
                                <asp:Label ID="lblMoneda" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom;" class="style2">
                                <b>Nro Cuotas:</b>
                            </td>
                            <td style="vertical-align: bottom;">
                                <asp:Label ID="lblNumCuotas" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Importe:</b>
                            </td>
                            <td style="vertical-align: bottom; width: 150px;">
                                <asp:Label ID="lblDeuda" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                    </table>
                </div>--%>
                </div>
            </div>
        </div>
        <%--     <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />--%>
        <div id="dvBotones" class="pMedium">
            <div id="btnExcel">
                <table id="tbExportar" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                            <%--<div id="btnExportar" class="btnNormal" runat="server" title="Exportar">
                                                            <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                                                        </div>  --%>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="btnPdf" class="btnButton"  style="width:33px; height:25px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="style2">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/pdf.ico" style="height:15px;margin-left:-3px;  margin-bottom: 3px;" />
                        </td>
                        <td>
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="crono" class="pMedium">
        </div>
    </div>
    </form>
</body>
</html>
