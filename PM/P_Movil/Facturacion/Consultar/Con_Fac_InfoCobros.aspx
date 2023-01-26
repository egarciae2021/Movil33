<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Consultar_Con_Fac_InfoCobros"
    CodeBehind="Con_Fac_InfoCobros.aspx.vb" %>

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
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="Con_Fac_CronogramaPagos.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="Con_Fac_InfoCobros.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/VistaModelo/MOV_FAC_Pago.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfProcOrigen" runat="server" />
        <asp:HiddenField ID="hdfProcDestino" runat="server" />
        <asp:HiddenField ID="hdfProcManual" runat="server" />
        <asp:HiddenField ID="hdfIndGenPagos" runat="server" />
        <asp:HiddenField ID="hdfRuta" runat="server" />
        <asp:HiddenField ID="hdfinTipOri" runat="server" />
        <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
        <asp:HiddenField ID="hdfOrganizacion" runat="server" />


        <cc1:TabJQ runat="server" id="TabDetalle" cssclass="tabs" style="margin-top: 1px;"
            borderstyle="None" borderwidth="0">

            <cc1:ContenedorTabJQ Titulo="Consulta" BorderStyle="None" BorderWidth="0">
                
                <div id="dvPrincipal" style="width: auto; margin: 0 auto;">
        <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto;
            width: 780px; padding: 10px; background-image: none; margin-top: 5px;">
            <table width="100%" border="0">
                <tbody>
                    <tr>
                        <td>
                            <table border="0">
                                <tbody>
                                    <tr>
                                        <td style="color: #003F59; vertical-align: middle; padding-right: 15px;">
                                            <b><span id="lblFiltro">Empleado</span></b>
                                        </td>
                                        <td style="padding-right: 50px;">
                                            <div id="dvContenedorUsuario" runat="server">
                                                <asp:TextBox ID="TxtUsuario" runat="server" Enabled="False" width = "300px">Demo</asp:TextBox>
                                            </div>
                                            <div id="dvContenedorTecRes" runat="server">
                                                <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                                <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                            </div>
                                        </td>
                                        <td align="center">
                                            <div id="btnBuscar" class="k-button">
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:Image ID="imgGuardar" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                                                        </td>
                                                        <td>
                                                            &nbsp;Buscar
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                        <td align="center">
                                            <div id="btnImportarPagos" class="k-button">
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/import.png"
                                                                Height="16px" />
                                                        </td>
                                                        <td>
                                                            &nbsp;Importar Pagos
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0">
                                <tbody>
                                    <tr>
                                        <td style="padding-right: 18px;">
                                            <b><span id="Span1" style="color: #003F59;">Fecha Inicio</span></b>
                                        </td>
                                        <td style="padding-right: 19px;">
                                            <asp:TextBox ID="txtFechaInicio" runat="server" Width="110px" MaxLength="10" class="bordeui"></asp:TextBox>
                                        </td>
                                        <td style="padding-right: 25px;">
                                            <b><span style="color: #003F59; vertical-align: bottom;">Fecha Fin: </span></b>
                                        </td>
                                        <td valign="middle" rowspan="2" style="padding-right: 20px;" >
                                            <asp:TextBox ID="txtFechaFin" runat="server" Width="110px" MaxLength="10" class="bordeui"></asp:TextBox>
                                        </td>
                                        <td style="padding-right: 20px;">
                                            <b><span id="Span2" style="color: #003F59;">Monto Mayor a:</span></b>
                                        </td>
                                        <td valign="middle" rowspan="2" style="padding-right: 20px;" class="ocul">
                                            <input id="txtMontoMayora" class="ui-widget-content ui-corner-all " type="text" style="width: 80px;
                                                font-weight: normal; text-align: right;" maxlength="8" placeholder="Ingrese Monto"
                                                name="txtMontoMayora" />
                                        </td>
                                        <td style="padding-right: 20px;">
                                            <b><span id="Span3" style="color: #003F59;">Monto Menor a:</span></b>
                                        </td>
                                        <td valign="middle" rowspan="2" style="padding-right: 0px;" class="ocul">
                                            <input id="txtMontoMenora" class="ui-widget-content ui-corner-all " type="text" style="width: 80px;
                                                font-weight: normal; padding: 4px; text-align: right;" maxlength="8" placeholder="Ingrese Monto"
                                                name="txtMontoMenora" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="dvFechas" class="pMedium">
            <table width="100%">
                <tr>
                    <td align="left" style="color: #CC0000;">
                        <b><span id="spMensaje"></span></b>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvBotones" class="pMedium">
            <div id="btnExcel">
                <table id="tbExportar" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="gridPagos" class="pMedium">
        </div>
        <div id="gridPagosCliente" class="pMedium">
        </div>
        <div id="Panel" style="overflow: auto; width: 600px; display: none;">
            <table cellpadding="0" cellspacing="0" data-bind="style: { display: RutaContratoTemporal() ? '' : 'none' }">
                <tr>
                    <td>
                        <asp:Label ID="lblRutaContrato" runat="server" Text="" CssClass="lblDescargar" data-bind="text:ArchivoOriginal, click:AbrirAdjunto">
                        </asp:Label>
                    </td>
                    <td>
                        &nbsp;
                        <img id="btnEliminarContrato" alt="" src="../../../Common/Images/Mantenimiento/delete_16x16.gif"
                            class="imgBtn" title="Eliminar Adjunto" data-bind="click: QuitarAdjunto" />
                    </td>
                </tr>
            </table>
            <iframe id="ifCargarImagen" frameborder="0" style="padding: 0px; margin: 0px; height: 33px;
                width: 482px;" src="../../../Common/Page/Adm_CargarArchivo.aspx?Formatos=xls,xlsx,txt,csv&FormatoTipo=">
            </iframe>
            <br />
            <br />
        </div>
    </div>

            </cc1:ContenedorTabJQ>

            <cc1:ContenedorTabJQ Titulo="Registrar Pago" BorderStyle="None" BorderWidth="0">
                <iframe  id="ifrRegistrarPago" frameborder="0" src="../Mantenimiento/Mnt_RegistrarPagos.aspx?vcTab=MOV_FAC_Pago&inCod=5299&inTip=4&inTipOri=1" ></iframe>
            </cc1:ContenedorTabJQ>

            
        </cc1:TabJQ>



    </form>
</body>
</html>
