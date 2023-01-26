<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Cam_Conf_CampanaBanner" Codebehind="Cam_Conf_CampanaBanner.aspx.vb" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <%--kendo --%>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_Publicidad.js" type="text/javascript"></script>
    <script src="Cam_Conf_CampanaBanner.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdPublicidad" runat="server" />
        <asp:HiddenField ID="hdfIdCampana" runat="server" />
        <div id="dvContenido">
            <div class="ui-state-default ui-corner-all" style="padding:6px;">
                <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
                <asp:Label ID="lblSubirArchivoCab" runat="server" text="Selección de archivo" Font-Bold="true" Font-Size="Small"></asp:Label>
            </div>
            <table cellspacing="0">
                <tr style="padding-top:3px; display:none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblOperador" runat="server" text="Operador"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlOperador" runat="server" data-bind="value: IdOperador" Width="400px"></asp:DropDownList>
                    </td>
                </tr>
                <tr style="padding-top:3px; display:none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="Label1" runat="server" text="Campaña"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampana" runat="server" data-bind="value: IdCampana" Width="400px"></asp:DropDownList>
                    </td>
                </tr>
                <tr style="padding-top:3px;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblFormato" runat="server" text="Formato"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlFormato" runat="server" data-bind="value: IdFormatoPrevio" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="" style="padding-top:3px;" data-bind="style: { display: IdFormato() < 0  ? 'none' : '' }">
                    <td style="width:100px;" rowspan="2">
                        <asp:Label ID="lblRutaContratoCab" runat="server" Text="Archivos Cargados:"></asp:Label>
                    </td>
                    <td>
                      <table cellpadding="0" cellspacing="0">
                          <tr>
                              <td>
                                <iframe id="ifCargarImagen" frameborder="0" style="padding: 0px; margin: 0px; height: 50px; width:410px;" 
                                    src="">
                                </iframe>
                              </td>
                              <td>
                                  <div id="dvInformacion" runat="server">
                                      <ttgInfo:ToolTipGenerico ID="ttgExtensiones" runat="server" Mensaje="Extensiones Permitidas: JPG,JPEG,PNG,BMP" />
                                  </div>
                              </td>
                          </tr>
                      </table>
                    </td>
                </tr>
                <tr data-bind="style: { display: IdFormato() < 0  ? 'none' : '' }">
                    <td>
                        <table>
                            <tbody data-bind='foreach: MOV_CAM_PublicidadDetalle'>
                                <tr>
                                    <td><asp:Label ID="lblArchivo" runat="server" data-bind='text: RutaArchivo'></asp:Label></td>
                                    <td><a href='#' data-bind='click: $parent.QuitarAdjunto'>Eliminar</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </table>
<%--            <br />--%>
            <div id="btnGuardar" class="btnNormal" style="display:none;">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
<%--            <br />
            <br />--%>
            <div class="ui-state-default ui-corner-all" style="padding:6px;" data-bind="style: { display: IdFormato() < 0  ? 'none' : '' }">
                <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
                <asp:Label ID="lblPrevisualizacionCab" runat="server" text="Imagenes cargadas" Font-Bold="true" Font-Size="Small"></asp:Label>
            </div>
            <div id="dvBanner" style="overflow:auto;" data-bind="style: { display: IdFormato() < 0  ? 'none' : '' }">
               <table>
                    <tbody data-bind='foreach: MOV_CAM_PublicidadDetalle'>
                        <tr style=" height:125px;">
                            <td data-bind="style: { display: $parent.AceptaVariosArchivo() == 0  ? 'none' : '' }">
                                <div class="btnNormal btnSubir" data-bind='click: $parent.SubirImagen'>
                                    <asp:Image ID="imgSubir" runat="server" ToolTip="Subir" ImageUrl="~/Common/Images/Mantenimiento/Ascendente.png" />
                                </div>
                            </td>
                            <td data-bind="style: { display: $parent.AceptaVariosArchivo() == 0  ? 'none' : '' }">
                                <div class="btnNormal btnBajar" data-bind='click: $parent.BajarImagen' >
                                    <asp:Image ID="imgBajar" runat="server" ToolTip="Bajar" ImageUrl="~/Common/Images/Mantenimiento/Descendente.png" />
                                </div>
                            </td>
                            <td>
                                <img data-bind="attr:{src: RutaArchivo}" style="height:120px; width:100%;"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</body>
</html>