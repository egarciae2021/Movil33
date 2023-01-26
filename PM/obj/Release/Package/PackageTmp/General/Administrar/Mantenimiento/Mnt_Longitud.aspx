<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_Longitud" Codebehind="Mnt_Longitud.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_Longitud.js" type="text/javascript"></script>
</head>
<body>
  <form id="form1" runat="server">
        <asp:HiddenField ID="hdfLongitud" runat="server" />
        <asp:HiddenField ID="hdfOrigen" runat="server" />
        <asp:HiddenField ID="hdfServicio" runat="server" />
            <div class="dvPanel" style="overflow: auto;">
                <table width="100%">
                    <tr>
                        <td>                    
                            <table width="100%">
                                <tr>
                                    <td class="tdEtiqueta">
                                        Origen</td>
                                    <td>
                                        <asp:TextBox ID="txtOrigen" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                                    </td>
                                </tr>
                                 <tr>
                                    <td class="tdEtiqueta">
                                        Servicio</td>
                                    <td>
                                        <asp:TextBox ID="txtServicio" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                                    </td>
                                </tr>
                                 <tr id="trLongitudExtraer" runat="server">
                                    <td class="tdEtiqueta">
                                        <%--Número de dígitos &gt;= a:--%>
                                        Número de dígitos mínimo
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtMayor" runat="server" Width="30px" MaxLength="2"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr id="tr1" runat="server">
                                    <td class="tdEtiqueta">
                                       <%-- Número de dígitos &lt;=a:--%>
                                       Número de dígitos máximo
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtMenor" runat="server" Width="30px" MaxLength="2"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <div class="dvAsignacion">
                <cc1:TabJQ ID="tbAsignacion" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;"></cc1:TabJQ>            
            </div>
            <br />
            <div style="text-align:left;">            
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>
            </div>
    </form>
</body>
</html>
