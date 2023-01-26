<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_Seguridad_Administrar_Mnt_ConfServicios" Codebehind="Mnt_ConfServicios.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.position.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js"></script>
    <script src="../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <link href="../../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet">
    <script src="../../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_ConfServicios.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="global" style="overflow-y:auto;">
 <div id="dvCargando" class="dvCargando"></div>
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <br />
    <asp:HiddenField ID="hdfTabla" runat="server" />

    <div class="ui-accordion ui-widget ui-helper-reset">
    <%--<div class="dvPanel">--%>
<%--        <div id="dvContAcordeon">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                <cc1:ContenedorAccodion Texto="Accesos">

                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>   --%>
            <table id="tbCamposDinamicos"  runat="server" width="96%" class="ui-helper-reset ui-widget-content ui-corner-all ui-accordion-content-active">
            </table>
        <br />
   </div>
    <div style="margin-top: 2px;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
    </div>
    </div>
    </form>
</body>
</html>
