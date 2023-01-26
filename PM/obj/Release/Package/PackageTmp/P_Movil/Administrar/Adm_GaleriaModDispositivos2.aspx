<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_GaleriaModDispositivos2" Codebehind="Adm_GaleriaModDispositivos2.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/galleriffic-2.css" rel="stylesheet" type="text/css" /><%-- galleriffic--%>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    
    <%--<script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>--%>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.history.js"></script><%-- galleriffic--%>
	<script type="text/javascript" src="../../Common/Scripts/jquery.galleriffic.js"></script><%-- galleriffic--%>
	<script type="text/javascript" src="../../Common/Scripts/jquery.opacityrollover.js"></script><%-- galleriffic--%>
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.timer.js" ></script>
    <script src="Adm_GaleriaModDispositivos2.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCodModeloDisp" runat="server" />
    <asp:HiddenField ID="hdfDispSelectSopLin" runat="server" />
    <asp:HiddenField ID="hdfPermiteLinea" runat="server" />
    <asp:HiddenField ID="hdfCodPlan" runat="server" />
    <asp:HiddenField ID="hdfCodOpe" runat="server" />
    <asp:HiddenField ID="hdfTipoSolicitud" runat="server" />

        <div id="divGaleria" style="overflow:auto; width:100%; /*height:100%;*/" runat="server" >
            <div id="gallery" class="content" style="height:270px;">
			    <table width="100%" style="height:280px;">
                    <tr>
                        <td style="width:250px;">
                            <div id="controls" class="controls"></div>
			                <div class="slideshow-container" style="height:250px;">
				                <div id="loading" class="loader"></div>
				                <div id="slideshow" class="slideshow" style="height:248px; width:278px;"></div>
			                </div>        
                        </td>
                        <td valign="top">
                            <div style="height:5px;"></div>
                            <div id="dvCaptionCont">
                                <div id="caption" class="caption-container dvPanel" style="height:130px; overflow:auto;"></div>
                            </div>
                            <div id="divSolLin" runat="server" style="padding-top:5px; display:none">
                                Solicitar Equipo con Línea:
                                <input id="chkLinea" type="checkbox" runat="server" checked="checked"/>
                            </div>
                            <div id="btnDetalles" title="Ver detalles" style="display:none;">Ver detalles</div>
                        </td>
                    </tr>
                </table>
		    </div>
            <div id="thumbs" class="navigation" runat="server" style="height:270px;">
                <ul id="ulGaleria" class="thumbs noscript" runat="server">
                </ul>
            </div>
            <div style="clear: both;"></div>
        </div>
        <div id="divNoDispositivos_x_Plan" runat="server" style="display:none; font-size: medium; color: gray;">
            No hay ningún modelo de dispositivo compatible con el plan del dispositivo seleccionado.
        </div>
        <div id="divNoDispositivos_x_Grupo" runat="server" style="display:none; font-size: medium; color: gray;">
            No hay ningún modelo de dispositivo en el grupo del empleado.
        </div>
    </form>
</body>
</html>
