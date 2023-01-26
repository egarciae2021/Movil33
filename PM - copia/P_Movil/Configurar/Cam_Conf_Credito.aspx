<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Cam_Conf_Credito" Codebehind="Cam_Conf_Credito.aspx.vb" %>

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
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_CreditoConfiguracion.js" type="text/javascript"></script>
    <script src="Cam_Conf_Credito.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdCreditoConfiguracion" runat="server"/>
        <asp:HiddenField ID="hdfIdCliente" runat="server"/>
        <div id="dvContenido">
            <div id="dvCampos">
                <div class="ui-state-default ui-corner-all" style="padding:6px;">
                    <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
                    <asp:Label ID="lblCreditoGrupoCab" runat="server" text="Asignación de crédito" Font-Bold="true" Font-Size="Small"></asp:Label>
                </div>
				<div style="font-size:8pt; margin-top:3px;" data-bind='foreach: lstAsignacionCredito'>
                    <label>
						<input type="radio" name="rblstAsignacionCredito" data-bind='value: valor, checked: $parent.CreditoGrupo'/><span data-bind='text: texto'></span><%-- Mensual--%>
					</label>
				</div>
                <br />
                <div class="ui-state-default ui-corner-all" style="padding:6px;">
                    <span class="ui-icon ui-icon-bookmark" style="float:left; margin:-2px 5px 0 0;"></span>
                    <asp:Label ID="lblCuota" runat="server" text="Cuota" Font-Bold="true" Font-Size="Small"></asp:Label>
                </div>
				<div style="font-size:8pt; margin-top:3px;" data-bind='foreach: lstCuota'>
					<label>
						<input type="radio" name="rblstCuota" data-bind='value: valor, checked: $parent.Cuota'/><span data-bind='text: texto'></span><%-- Mensual--%>
					</label>
				</div>
            </div>
            <br />
            <div id="dvAcciones" style="margin-top:2px;">
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
