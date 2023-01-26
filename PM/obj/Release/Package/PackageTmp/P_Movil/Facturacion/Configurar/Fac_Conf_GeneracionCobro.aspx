<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Fac_Conf_GeneracionCobro.aspx.vb" Inherits=".Fac_Conf_GeneracionCobro" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"  type="text/css" />
        <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
        <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"   type="text/css" />
        <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Fac_Conf_GeneracionCobro.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
 <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeadoNombre" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all" style="width: 600px;">
        <%--        <div class="ui-state-default ui-corner-all" style="padding: 6px;">
            <span class="ui-icon ui-icon-suitcase" style="float: left; margin: -2px 5px 0 0;">
            </span>
            <asp:Label ID="lblSubirArchivoCab" runat="server" Text="Configuración de Cuenta de Cobros"
                Font-Bold="true" Font-Size="Small"></asp:Label>
        </div>--%>
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
                <tr>
                     <td class="tdEtiqueta" style="width: 111px;">
                        <span id="Span1">Día de Ejecución</span>
                    </td>
                    <td>
                            <input id="ddlDiaEjecucion" type="text" style="width: 70px; padding: 4px;" maxlength="2"
                            value="" name="ddlDiaEjecucion" />
                    </td>
                </tr>
                <tr class="arriba medio">
                    <td class="tdEtiqueta">
                        <span id="lblNumDiaPre">Hora de ejecución</span>
                    </td>
                    <td class="auto-style3">
                        <input id="txtHora" type="text" style="width: 70px; padding: 4px;" maxlength="2"
                            value="" name="txtHora" />
                        <span><b>:</b></span>
                        <input id="txtMinuto" type="text" style="width: 70px; padding: 4px;"  maxlength="2"
                            value="" name="txtMinuto" />
                        <input id="txtIndTiempo" type="text" style="width: 70px; padding: 4px;" maxlength="200"
                            value="1" name="txtIndTiempo" />
                    </td>
                </tr>
            </tbody>
        </table>
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
    </form>
</body>
</html>
