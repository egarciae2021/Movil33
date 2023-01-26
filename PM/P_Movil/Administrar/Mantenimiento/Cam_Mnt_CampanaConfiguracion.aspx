<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Cam_Mnt_CampanaConfiguracion.aspx.vb" Inherits=".Cam_Mnt_CampanaConfiguracion" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Cam_Mnt_CampanaConfiguracion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion" Style="overflow: auto;" TabIndex="0">
            <cc1:ContenedorAccodion Texto="Página Inicial" ID="accPaginaInicial">
                <table>
                    <tr>
                        <td style="width:150px;">Ver link 1</td>
                        <td><asp:CheckBox id="chkVerLinkWeb" runat="server"/></td>
                    </tr>
                    <tr id="trTextLinkWeb" style="display:none;" runat="server">
                        <td>Título de link 1</td>
                        <td><asp:TextBox ID="txtTextLinkWeb" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr id="trUrlLinkWeb" style="display:none;" runat="server">
                        <td>URL de link 1</td>
                        <td><asp:TextBox ID="txtUrlLinkWeb" runat="server" Width="250px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Ver link 2</td>
                        <td><asp:CheckBox id="chkVerBtnManual" runat="server"/></td>
                    </tr>
                    <tr id="trTextBtnManual" style="display:none;" runat="server">
                        <td>Título de link 2</td>
                        <td><asp:TextBox ID="txtTextBtnManual" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr id="trUrlBtnManual" style="display:none;" runat="server">
                        <td>URL del link del manual</td>
                        <td><asp:TextBox ID="txtUrlBtnManual" runat="server" Width="250px"></asp:TextBox></td>
                    </tr>
                    <tr id="trDocBtnManual" style="display:none;" runat="server">
                        <td>URL de link 2</td>
                        <td><asp:TextBox ID="txtDocBtnManual" runat="server"></asp:TextBox></td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="General" ID="accGeneral">
                <table>
                    <tr>
                        <td style="width:150px;">Consideraciones</td>
                        <td><asp:TextBox ID="txtConsideraciones" runat="server" TextMode="MultiLine"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Mensaje de preventa</td>
                        <td><asp:TextBox ID="txtDscPreventa" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Mensaje al mantener plan</td>
                        <td><asp:TextBox ID="txtMsjMantenerPlan" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Mensaje al cambiar plan</td>
                        <td><asp:TextBox ID="txtMsjCambiarPlan" runat="server"></asp:TextBox></td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Chat" ID="accChat">
                <table>
                    <tr>
                        <td style="width:250px;">Título</td>
                        <td><asp:TextBox ID="txtTituloChat" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Subtítulo</td>
                        <td><asp:TextBox ID="txtSubtituloChat" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Límite de atenciones</td>
                        <td><asp:TextBox ID="txtLimiteAtencionChat" runat="server" Width="30px" MaxLength="4"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Mensaje al no haber administrador</td>
                        <td><asp:TextBox ID="txtSinAdministrador" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Mensaje al no haber administrador disponible</td>
                        <td><asp:TextBox ID="txtSinAdministradorDisponible" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Mensaje al haber administrador saturado</td>
                        <td><asp:TextBox ID="txtAdministradorSaturado" runat="server"></asp:TextBox></td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Node" ID="accNode">
                <table>
                    <tr>
                        <td style="width:70px;">Ip</td>
                        <td><asp:TextBox ID="txtIpNode" runat="server" MaxLength="15"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Puerto</td>
                        <td><asp:TextBox ID="txtPuertoNode" runat="server" Width="50"></asp:TextBox></td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
        </cc1:AccordionJQ>
    </div>
    <br />
    <div id="dvBotones" style="margin-top: 5px; text-align: left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <%--<div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cancelar</a>
        </div>--%>
    </div>
    </form>
</body>
</html>
