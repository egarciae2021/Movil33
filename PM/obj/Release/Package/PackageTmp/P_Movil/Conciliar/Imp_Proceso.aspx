<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Conciliar_Imp_Proceso"
    EnableEventValidation="false" CodeBehind="Imp_Proceso.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <%--<script src="../../Common/Scripts/jquery.MultiFile.js" type="text/javascript"></script>--%>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <%--kendo --%>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Imp_Proceso.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfLicencia" runat="server" />

        <asp:HiddenField ID="hdfbtSobreescribe" runat="server" Value="0" />
        <asp:HiddenField ID="hdfbtPregunto" runat="server" Value="0" />
        <asp:HiddenField runat="server" ID="hdfInCodCta" />
        <asp:HiddenField runat="server" ID="hdfbtTipoPla" Value="0" />
        <asp:HiddenField runat="server" ID="hdfCodPla" Value="-1" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfIdPerfil" runat="server" Value="-1" />

        <div id="dvCargando" class="dvCargando">
        </div>
        <%--        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>--%>
        <%--        <asp:UpdateProgress ID="udpProceso" runat="server" AssociatedUpdatePanelID="udpPlantilla">
            <ProgressTemplate>
                <div class=" dvCargando"></div>
            </ProgressTemplate>
        </asp:UpdateProgress>--%>
        <div class="dvPanel ui-widget-content ui-corner-all">

            <table>
                <tr>
                    <td>Periodo
                    </td>
                    <td>
                        <asp:TextBox ID="txtPeriodo" runat="server" CssClass="MESANHO" Width="90px" MaxLength="7"></asp:TextBox>
                    </td>
                </tr>
            </table>


            <div id="BarraNavegacionJQ1" class="ui-accordion ui-widget ui-helper-reset" style="margin-left: 0px;">
                <div id="dvPerfil" style="display: none; text-align: right;">
                    <table style="width: 100%;">
                        <tr>
                            <td>
                                <asp:Label ID="lblMensajePerfil" runat="server" Font-Size="11px" ForeColor="#0002BD" Font-Bold="true" Font-Italic="true"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="BarraNavegacionJQ1_Panel1" runat="server" style="">
                    <h3 class="ui-helper-reset ui-accordion-header ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                        <a href="#BarraNavegacionJQ1_Panel1_O" style="cursor: default;">Facturación</a> <span
                            class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;"></span>
                        <input type="hidden" value="1" />
                    </h3>
                    <div id="BarraNavegacionJQ1_Panel1_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                        runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px; padding-bottom: 10px; margin-top: -1px;">
                        <div style="font-weight: normal; padding: 10px;">
                            <asp:FileUpload ID="fulArchivo" runat="server" />
                        </div>
                    </div>
                </div>

                <div id="BarraNavegacionJQ1_Panel2" runat="server" style="display: none;">
                    <h3 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                        <a href="#BarraNavegacionJQ1_Panel2_O" style="cursor: default;">Cortes</a>
                        <span class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;"></span>
                        <input type="hidden" value="1" />
                    </h3>
                    <div id="BarraNavegacionJQ1_Panel2_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                        runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px; padding-bottom: 15px; margin-top: -1px;">

                        <div style="font-weight: normal; padding: 10px;">

                            <asp:FileUpload ID="fulArchivo_Cortes" runat="server" />

                        </div>
                    </div>
                </div>


                <div id="Div1" runat="server" style="display: none;">
                    <h3 class="ui-helper-reset ui-accordion-header ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                        <a href="#BarraNavegacionJQ1_Panel1_O" style="cursor: default;">Adendum</a> <span
                            class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;"></span>
                        <input type="hidden" value="1" />
                    </h3>
                    <div id="Div2" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                        runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px; padding-bottom: 15px; margin-top: -1px;">
                        <div style="font-weight: normal; padding: 10px;">
                            <asp:FileUpload ID="fulArchivo_Adendum" runat="server" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br />
        <br />
        <div>
            <asp:Button ID="btnGuardarSer" runat="server" Text="" />
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Subir archivos</a>
            </div>
        </div>
        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
        </div>
        <asp:HiddenField ID="hfOperador_Origen" runat="server" />
    </form>
</body>
</html>
