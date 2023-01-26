<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_CAM_Conf_ContratoUsuario" Codebehind="Cam_Conf_ContratoUsuario.aspx.vb" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_SubContrato.js" type="text/javascript"></script>
    <script src="Cam_Conf_ContratoUsuario.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField id="hdfIdSubContrato" runat="server"/>
        <asp:HiddenField ID="hdfIdCampana" runat="server" />
        <div id="dvContenido" style="overflow: auto;">
            <div class="ui-state-default ui-corner-all" style="padding:6px;">
                <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
                <asp:Label ID="lblSubirArchivoCab" runat="server" text="Selección de archivo" Font-Bold="true" Font-Size="Small"></asp:Label>
            </div>
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <iframe id="ifCargarImagen" frameborder="0" style="padding: 0px; margin: 0px; height: 32px; width:420px;" >
                        </iframe>
                    </td>
                    <td>
                        <div id="dvInformacion" runat="server">
                            <ttgInfo:ToolTipGenerico ID="ttgExtensiones" runat="server" Mensaje="Extensiones Permitidas: htm,html" />
                        </div>
                    </td>
                </tr>
            </table>




            <div id="btnGuardar" class="btnNormal" style="display:none;">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar>Guardar</a>
            </div>
            <div class="ui-state-default ui-corner-all" style="padding:1px;">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="width:20px;">
                            <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
                        </td>
                        <td style="width:130px;">
                            <asp:Label ID="lblPrevisualizacionCab" runat="server" text="Previsualización" Font-Bold="true" Font-Size="Small"></asp:Label>
                        </td>
                        <td>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="width:100px;">
                                        <asp:Label ID="lblRutaContratoCab" runat="server" Text=" Archivo Cargado:"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:Label ID="lblRutaContrato" runat="server" Font-Bold="true"></asp:Label>
                                        &nbsp;
                                        <%--<img id="btnEliminarContrato" alt="" src="../../Common/Images/Mantenimiento/delete_16x16.gif" class="imgBtn" title="Eliminar Adjunto"/>--%>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="width:110px;">
                            <div id="btnDescargar" class="btnNormal" style="height:26px; float:left;">
                                <img alt="Descargar" src="../../Common/Images/Importar.ico" height="16px" width="16px"/>
                                <a>Descargar</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <iframe id="ifContrato" frameborder="0" style="padding: 0px; margin: 0px; height: 500px; width:100%;"></iframe>
                <%--src="../Administrar/SubContratos/contrato empleado.htm"--%>
            </div>
        </div>
    </form>
</body>
</html>
