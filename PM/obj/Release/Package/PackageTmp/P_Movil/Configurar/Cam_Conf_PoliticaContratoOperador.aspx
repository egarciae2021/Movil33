<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_CAM_Conf_PoliticaContrato" Codebehind="Cam_Conf_PoliticaContratoOperador.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_ContratoConfiguracion.js" type="text/javascript"></script>
    <script src="CAM_Conf_PoliticaContratoOperador.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCodigoContrato" runat="server" />
        <asp:HiddenField ID="hdfCodigoConfiguracion" runat="server" />    
        <div id="dvContenido">
            <div id="dvCampos" class="dvPanel">
                <table id="tbCampos">
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblOperadorCab" runat="server" Text="Operador"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:DropDownList ID="ddlOperador" runat="server">
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblVariosContratosVigentesCab" runat="server" text="Varios Contratos Vigentes"></asp:Label>
                        </td>
                        <td>
                            <asp:CheckBox ID="chkVariosContratosVigentes" runat="server"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblUsaCodigoCab" runat="server" text="Genera Código"></asp:Label>
                        </td>
                        <td>
                            <asp:CheckBox ID="chkUsaCodigo" runat="server" Checked="true"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblFormatoCodigoCab" runat="server" Text="Formato de código"></asp:Label>
                        </td>
                        <td class="">
                            <asp:TextBox ID="txtFormatoCodigo" runat="server" Width="200px" Text="CONT-TELF-NN"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
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
