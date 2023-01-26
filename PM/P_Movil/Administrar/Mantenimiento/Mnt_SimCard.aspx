<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_SimCard.aspx.vb" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_SimCard" %>

<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ControlBusquedaEnlace.ascx" TagName="ControlBusquedaEnlace" TagPrefix="uc1" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/calender/fullcalendar.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>


    <style type="text/css">
        body {
            overflow-y: hidden;
            overflow-x: hidden;
        }

        .no-close .ui-dialog-titlebar-close {
            display: none !important;
        }

        .k-combobox {
            padding: 0px !important;
            border: 0px solid rgb(221, 221, 221) !important;
        }

        .k-state-hover {
            border-color: transparent !important;
        }

        .k-dropdown-wrap {
            height: 22px !important;
        }

        .k-select {
            height: 18px !important;
            width: 24px !important;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_SimCard.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
            <asp:HiddenField ID="hdfCodCliente" runat="server" />
            <asp:HiddenField ID="hdfSimCard" runat="server" />
            <div class="dvPanel" style="overflow: auto;">
                <table width="100%">
                    <tr>
                        <td>
                            <table  width="100%" id="tbCamposDinamicos" runat="server">
                                <tr>
                                    <td class="tdEtiqueta">
                                        SimCard:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtCodigo" runat="server" MaxLength="50" Width="150px"></asp:TextBox>
                                    </td>
                                </tr>
                            <tr>
                                <td class="tdEtiqueta">Organización
                                </td>
                                <td>
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <uc1:ControlBusquedaEnlace ID="cbeOrganizacion" runat="server" />
                                            </td>
                                            <td>&nbsp;
                                                <div id="btnAgregarOrga" class="btnNormal" runat="server" title="Seleccionar Organización">
                                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnQuitarOrganizacion" title="Quitar" style="height: 32px; width: 34px;"
                                                    class="btnNormal ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                                                    <img alt="" src="../../../Common/Images/Mantenimiento/delete_16x16.gif">
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        Descripción:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtObservacion" runat="server" Width="500px"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr id="trEstado" runat="server">
                                    <td class="tdEtiqueta">
                                        Activo
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkEstado" runat="server" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

            <br />
            <div style="text-align:left;">            
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>
            </div>
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
    </form>
</body>
</html>
