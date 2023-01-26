<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_NuevaSolicitudMasivo"
    CodeBehind="Adm_NuevaSolicitudMasivo.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/galleriffic-2.css" rel="stylesheet" type="text/css" />
    <link href="Adm_NuevaSolicitudMasivo.css" rel="stylesheet" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server" autocomplete="off">
        <asp:HiddenField ID="hdfJefeArea" runat="server" />
        <asp:HiddenField ID="hdfPerfilesEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCodIntEmp" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />

        <div id="dvContenido" class="dvPanel">
            <table width="100%" border="0">
                <tr>
                    <td style="width: 90px;">Tipo Solicitud
                    </td>
                    <td style="width: 250px;">
                        <asp:DropDownList ID="ddlTipoSolicitud" runat="server" Width="235px">
                        </asp:DropDownList>
                    </td>
                    <td style="width: 105px; text-align: right;" runat="server" id="tdNombreEmpleado1">
                        <span class="TipoServicio" style="display: none;" id="lblTituloServicio">Servicio</span>
                    </td>
                    <td style="width: 50px; text-align: center;" runat="server" id="tdNombreEmpleado3">
                        <div style="display: none;" class="TipoServicio">
                            <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="235px">
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td style=""></td>
                </tr>
                <tr>
                    <td id="" colspan="5"><%--style="height:100%; --%>
                        <div id="dvGrillaMasivo" runat="server" style="display: none; margin-right: 5px;">
                            <table style="width: 100%;" border="0">
                                <tr style="height: 10px;">
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table style="width: 100%;">
                                            <tr>
                                                <td style="width: 50px;">
                                                    <div id="btnBusquedaEmpleado" runat="server" title="Buscar Empleado" class="btnNormal">
                                                        <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td style="width: 50px;">
                                                    <div id="btnQuitarEmpleado" runat="server" title="Quitar Empleado" class="btnNormal">
                                                        <asp:Image ID="Image8" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                                                    </div>
                                                </td>
                                                <td style="width: 50px;">
                                                    <div id="btnQuitarErrados" runat="server" title="Quitar Observados" class="btnNormal">
                                                        <asp:Image ID="Image9" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td style="width: 50px;">
                                                    <div id="btnGuardarSolicitudesMasivo" runat="server" title="Guardar" class="btnNormal">
                                                        <asp:Image ID="Image10" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/save.ico" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table id="grid">
                                        </table>
                                        <div id="pager">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr style="display: none;">
                    <td id="tdTabs" colspan="4"><%--style="height:100%; --%>
                        <div id="dvTabs" runat="server" style="display: none; margin-right: 5px;">
                            <cc1:TabJQ ID="tbSolicitud" runat="server" Style="width: 100%;">
                                <%--height: 375px;--%>
                            </cc1:TabJQ>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div id="divSeleccionEmpleado" runat="server" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifSeleccionEmpleado" frameborder="0" style="padding: 0px; margin: 0px; overflow: hidden;" scrolling="no"
                width="900px" height="470px"></iframe>
        </div>
    </form>
</body>


<script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
<script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
<script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
<script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
<script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
<script type="text/javascript" src="../../Common/Scripts/jquery.history.js"></script>
<script type="text/javascript" src="../../Common/Scripts/jquery.galleriffic.js"></script>
<script type="text/javascript" src="../../Common/Scripts/jquery.opacityrollover.js"></script>
<script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
<script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
<script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
<script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
<script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
<script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_NuevaSolicitudMasivo.js") %>" type="text/javascript"></script>


</html>
