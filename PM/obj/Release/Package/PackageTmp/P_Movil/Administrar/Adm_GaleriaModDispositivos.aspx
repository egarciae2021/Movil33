<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_GaleriaModDispositivos"
    CodeBehind="Adm_GaleriaModDispositivos.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/galleriffic-2.css" rel="stylesheet" type="text/css" />
    <%-- galleriffic--%>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <%--<script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>--%>

    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>

    <%--<script src="../../Content/js/shared/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.1.0.js"></script>--%>


    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>

    <script type="text/javascript" src="../../Common/Scripts/jquery.history.js"></script>
    <%-- galleriffic--%>
    <script type="text/javascript" src="../../Common/Scripts/jquery.galleriffic.js"></script>
    <%-- galleriffic--%>
    <script type="text/javascript" src="../../Common/Scripts/jquery.opacityrollover.js"></script>
    <%-- galleriffic--%>
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.timer.js"></script>

    <%--<script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>--%>

    <%--<script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>--%>
    <%--<script src="../../Common/Scripts/KendoUI/kendo.web.min_2014.1.318.js" type="text/javascript"></script>--%>

    <%--https://www.telerik.com/support/whats-new/kendo-ui/release-history--%>
    <%--https://kendo.cdn.telerik.com/2013.3.1324/js/kendo.web.min.js--%>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min_2013.3.1324.js"></script>

    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<style type="text/css">
   
    .trDialog {
    height:20px;
    } 

</style>

</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_GaleriaModDispositivos.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCodModeloDisp" runat="server" />
    <asp:HiddenField ID="hdfIdDispositivo" runat="server" />
    <asp:HiddenField ID="hdfModeloDisp" runat="server" />
    <asp:HiddenField ID="hdfDispSelectSopLin" runat="server" />
    <asp:HiddenField ID="hdfPermiteLinea" runat="server" />
    <asp:HiddenField ID="hdfCodPlan" runat="server" />
    <asp:HiddenField ID="hdfCodOpe" runat="server" />
    <asp:HiddenField ID="hdfTipoSolicitud" runat="server" />
    <asp:HiddenField ID="hdfFilaActual" runat="server" />
    <asp:HiddenField ID="hdfCodDispositivoActual" runat="server" />
    <div id="dvDetalleDispositivo" style="display: none;">
        <div class="dvPanel" style="background-color: #EAF4F9;">
            <table style="width: 100%;">
                <tr>
                    <td rowspan="2" style="width: 200px;">
                        <img id="imgDetalle" src="" width="200px" height='270px' />
                    </td>
                    <td>
                        <div id="navigation" style="float: right;">
                          
                          <table> <tr><td><img style="cursor:pointer;"  id="btnAtras" src="../../Common/Images/arrow_left.png" width="16px;" height="16px;" /></td><td><a>Atrás</a></td><td><a>Siguiente</a></td><td> <img style="cursor:pointer;"  id="btnSiguiente" src="../../Common/Images/arrow_right.png" width="16px;" height="16px;" /></td></tr></table>                                
                                
                      
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table style="padding-top: 5px;">
                            <tr>
                                <td colspan="2" style="font-size: 15px; color: #4B8CA8; height: 20px;">
                                    <b>
                                        <asp:Label ID="lblModelo" runat="server"></asp:Label></b>
                                </td>
                            </tr>
                            <tr >
                                <td class="trDialog">
                                    <b>Descripción</b>
                                </td>
                                <td>
                                    <asp:Label ID="lblDescripcion" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                               <td class="trDialog">
                                    <b>Grupo Modelo</b>
                                </td>
                                <td>
                                    <asp:Label ID="lblGrupoModelo" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td class="trDialog">
                                    <b>Tipo Modelo</b>
                                </td>
                                <td>
                                    <asp:Label ID="lblTipoModelo" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td class="trDialog">
                                    <b>Tipo Chip</b>
                                </td>
                                <td>
                                    <asp:Label ID="lblTipoChip" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr id="trOperador">
                               <td class="trDialog">
                                    <b>Operador</b>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlOperador" runat="server" CssClass="Operador" Style="width: 110px;">
                                    </asp:DropDownList>

                                    <asp:Label ID="lblOperador" runat="server" style="display:none;"></asp:Label>
                                </td>
                            </tr>
                            <tr id="trCosto">
                                <td class="trDialog">
                                    <b>Precio</b>
                                </td>
                                <td>
                                    <asp:Label ID="lblCosto" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td class="trDialog">
                                    <b>Soporta Línea</b>
                                </td>
                                <td>
                                    <asp:Label ID="lblSoportaLinea" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr>                           
                                <td colspan="2" class="trDialog">
                                    <div id="divSolLin" runat="server" style="padding-top: 5px; display: none">
                                        Solicitar Equipo con Línea:
                                        <input id="chkLinea" type="checkbox" runat="server" checked="checked" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <div id="Acciones" style="float: right; padding-top: 20px;">
                <div id="btnAceptar" class="btnNormal" runat="server">
                    <a>Aceptar</a>
                </div>
                <div id="btnCancelar" class="btnNormal" runat="server">
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </div>

        <table style="width: 100%;">
            <tr>
                <td>
                    <b>Nota:</b>
                    <asp:Label ID="lblMensajeDisp" runat="server">Equipos sujetos a disponibilidad.</asp:Label>
                </td>
                <td style="width: 80px;">
                    Tipo Servicio
                </td>
                <td style="width: 140px;">
                    <select id="cboTipoServicio">
                        <option value="-1">(TODOS)</option>
                        <option value="1">CELULAR</option>
                        <option value="8">SMARTPHONE</option>
                        <option value="2">TABLET</option>
                        <option value="3">BAM</option>
                        <option value="4">CHIP</option>
                        <option value="5">BLACKBERRY</option>
                        <option value="6">RADIOLOCALIZACIÓN</option>
                    </select>
                </td>
            </tr>
        </table>
    <div id="grillaDispositivos">
    </div>
    <div id="divGaleria" style="overflow: auto; width: 100%; /*height: 100%; */ display: none;"
        runat="server">
        <div id="gallery" class="content" style="height: 270px;">
            <table width="100%" style="height: 280px;">
                <tr>
                    <td style="width: 250px;">
                        <div id="controls" class="controls">
                        </div>
                        <div class="slideshow-container" style="height: 250px;">
                            <div id="loading" class="loader">
                            </div>
                            <div id="slideshow" class="slideshow" style="height: 248px; width: 278px;">
                            </div>
                        </div>
                    </td>
                    <td valign="top">
                        <div style="height: 5px;">
                        </div>
                        <div id="dvCaptionCont">
                            <div id="caption" class="caption-container dvPanel" style="height: 130px; overflow: auto;">
                            </div>
                        </div>
                        <%-- <div id="divSolLin" runat="server" style="padding-top: 5px; display: none">
                            Solicitar Equipo con Línea:
                            <input id="chkLinea" type="checkbox" runat="server" checked="checked" />
                        </div>--%>
                        <div id="btnDetalles" title="Ver detalles" style="display: none;">
                            Ver detalles</div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="thumbs" class="navigation" runat="server" style="height: 270px;">
            <ul id="ulGaleria" class="thumbs noscript" runat="server">
            </ul>
        </div>
        <div style="clear: both;">
        </div>
    </div>
    <div id="divNoDispositivos_x_Plan" runat="server" style="display: none; font-size: medium;
        color: gray;">
        No hay ningún modelo de dispositivo compatible con el plan del dispositivo seleccionado.
    </div>
    <div id="divNoDispositivos_x_Grupo" runat="server" style="display: none; font-size: medium;
        color: gray;">
        No hay ningún modelo de dispositivo en el grupo del empleado.
    </div>
    </form>
</body>
</html>
