<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Consultar_Con_Fac_UploadPago" Codebehind="Con_Fac_UploadPago.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js"
        type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/VistaModelo/MOV_FAC_Cese.js" type="text/javascript"></script>
    <%--    <script src="Con_Fac_UploadCese.js" type="text/javascript"></script>
    --%>
    <script src = "Con_Fac_UploadPago.js" type="text/javascript"></script>

</head>
<body>
 <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdSubContrato" runat="server" />
    <div id="dvContenido" style="overflow: auto;">
        <div class="ui-state-default ui-corner-all" style="padding: 6px;">
            <span class="ui-icon ui-icon-suitcase" style="float: left; margin: -2px 5px 0 0;">
            </span>
            <asp:Label ID="lblSubirArchivoCab" runat="server" Text="Selección de archivo" Font-Bold="true"
                Font-Size="Small"></asp:Label>
        </div>
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
            width: 482px;" src="../../../Common/Page/Adm_CargarArchivo.aspx?Formatos=xls,xlsx,txt,csv&FormatoTipo="></iframe>
        <%--        <iframe id="ifCargarImagen" frameborder="0" style="padding: 0px; margin: 0px; height: 33px;
            width: 482px;" src="../../../Common/Page/Adm_CargarArchivo.aspx?Formatos=&FormatoTipo="
            data-bind="style: { display: Vigente() ? '' : 'none' }"
            ></iframe>--%>
        <br />
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
        <br />
        <br />
    </div>
    </form>
</body>
</html>
