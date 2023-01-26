<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Configurar_Fac_Conf_ExportacionCobro"
    CodeBehind="Fac_Conf_ExportacionCobro.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Imp_Config.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="Imp_Config.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Fac_Conf_ExportacionCobro.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeadoNombre" runat="server" />
    <asp:HiddenField ID="hdfPlantilla" runat="server" />
    <asp:HiddenField ID="hdfProceso_Origen" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <div id="dvContenido">
        <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all" style="width: 630px;">
            <table id="tbConfVeri" border="0">
                <tbody>
                    <tr>
                        <td class="tdEtiqueta" style="width: 111px;">
                            <span id="Span8">Ejecución</span>
                        </td>
                        <td>
                            <input id="ddlTipoEjecucion" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                value="" name="ddlTipoEjecucion" />
                        </td>
                    </tr>
                    <tr class="">
                        <td class="style1" colspan="2">
                            <span id="Span6">Se Ejecutará después de la generación de la Cuenta de Cobro</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="dvIframe" style="padding: 0px; margin: 0px; height: 450px; width: 650px;">
                <%--<iframe id="ifDetalle" frameborder="0" style="padding: 0px; margin: 0px; height: 400px;
                width: 650px;" src="../../Common/Page/Imp_Config.aspx"></iframe>--%>
                <div id="global">
                    <div id="generalCarrito" class="general" style="position: relative; width: 600px;
                        margin-top: 10px;">
                        <div id="cuerpoTaps" style="height: 300px;">
                            <div class="navtaps">
                                <div id="tapTicket" class="tap tapSelect" style="display: none;">
                                    Origen
                                </div>
                                <div id="tapDetalle" class="tap tapSelect">
                                    Destino
                                </div>
                            </div>
                            <div id="detalleTaps" style="height: 355px">
                                <div id="pSelecTicket">
                                    <div id="toolBarPro" style="overflow: hidden;">
                                        <table id="tbConfImp">
                                            <tr>
                                                <td style="width: 80px">
                                                    <span id="Span5">Fuente</span>
                                                </td>
                                                <td class="auto-style2">
                                                    <input id="ddlTipoFuente_O" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlTipoFuente_O" />
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr class="medio" style="display: none">
                                                <td>
                                                    <span id="Span3">Medio</span>
                                                </td>
                                                <td>
                                                    <input id="ddlMedio_O" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlMedio_O" />
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span id="Span1">Ubicación de Importación</span>
                                                </td>
                                                <td colspan="2" class="auto-style2">
                                                    <input id="ddlUbicacion_O" type="text" style="width: 400px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlUbicacion_O" />
                                                </td>
                                            </tr>
                                        </table>
                                        <br />
                                        <div id="gridDetalle_O">
                                        </div>
                                        <br />
                                        <table>
                                            <tr>
                                                <td style="width: 80px">
                                                    <span id="lblTitCosAdi">Plantilla</span>
                                                </td>
                                                <td class="auto-style2">
                                                    <input id="ddlPlantilla_O" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlPlantilla_O" />
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
<%--                                            <tr>
                                                <td>
                                                    <span id="Span3">Formato</span>
                                                </td>
                                                <td class="auto-style2">
                                                    <input id="ddlFormato_O" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlFormato_O" />
                                                </td>
                                                <td>
                                                </td>
                                            </tr>--%>
                                        </table>
                                    </div>
                                </div>
                                <div id="pSelecDetalle" style="display: none;">
                                    <div id="pnlticket" style="overflow: hidden;">
                                        <table id="tbConfImpD">
                                            <tr>
                                                <td style="width: 80px">
                                                    <span id="Span4">Fuente</span>
                                                </td>
                                                <td class="auto-style2">
                                                    <input id="ddlTipoFuente_D" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlTipoFuente_D" />
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr class="medio" style="display: none">
                                                <td>
                                                    <span id="Span4">Medio</span>
                                                </td>
                                                <td>
                                                    <input id="ddlMedio_D" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlMedio_D" />
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span id="Span7">Ubicación de Importación</span>
                                                </td>
                                                <td colspan="2" class="auto-style2">
                                                    <input id="ddlUbicacion_D" type="text" style="width: 400px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlUbicacion_D" />
                                                </td>
                                            </tr>
                                        </table>
                                        <br />
                                        <div id="gridDetalle_D">
                                        </div>
                                        <br />
                                        <table>
                                            <tr>
                                                <td style="width: 80px">
                                                    <span id="Span5">Plantilla</span>
                                                </td>
                                                <td class="auto-style2">
                                                    <input id="ddlPlantilla_D" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlPlantilla_D" />
                                                </td>
                                                <td>
                                                    <div id="btnPlantilla" class="k-button">
                                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td>
                                                                    &nbsp;<b>...</b>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
<%--                                            <tr>
                                                <td>
                                                    <span id="Span9">Formato</span>
                                                </td>
                                                <td class="auto-style2">
                                                    <input id="ddlFormato_D" type="text" style="width: 250px; padding: 4px;" maxlength="200"
                                                        value="" name="ddlFormato_D" />
                                                </td>
                                                <td>
                                                </td>
                                            </tr>--%>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <tr style="padding-top: 20px;">
                    <td colspan="2">
                        <br />
                        <div style="text-align: left;">
                            <div id="btnGuardar" class="btnNormal">
                                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                <a>Guardar</a>
                            </div>
                            <div id="btnCerrar" class="btnNormal">
                                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                <a>Cancelar</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <br />
        </div>
    </div>
    <div id="PanelCampos" style="overflow: auto; width: 600px; display: none;">
        <div id="grPlantilla" style="overflow: auto; width: 570px;">
        </div>
    </div>
    </form>
</body>
</html>
