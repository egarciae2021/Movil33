<%@ Page Language="VB" AutoEventWireup="false" Inherits="Common_Page_Adm_Correo" Codebehind="Adm_Correo.aspx.vb" %>

<%@ Register assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" namespace="CrystalDecisions.Web" tagprefix="CR" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_Correo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCod" runat="server" />
        <asp:HiddenField ID="hdfTipo" runat="server" />        
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel">        
            <table>
                <tr>
                    <td class="tdTitulo">
                        Destinatario(s)
                    </td>
                    <td>
                        <asp:TextBox ID="txtDestinatarios" runat="server" Width="200px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdTitulo">
                        Asunto
                    </td>
                    <td>
                        <asp:TextBox ID="txtAsunto" runat="server" Width="350px"></asp:TextBox>                
                    </td>
                </tr>
                <tr>
                    <td class="tdTitulo">
                        Mensaje
                    </td>
                    <td>
                        <asp:TextBox ID="txtMensaje" runat="server" TextMode="MultiLine" Width="350px"  Height="150px"></asp:TextBox>                
                    </td>
                </tr>
                <tr>
                    <td>                        
                        <div id="btnEnviarCli" class="btnNormal">
                            <asp:Image ID="imgEnviar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Enviar</a>
                        </div>
                        <asp:Button ID="btnEnviar" runat="server" Text="Enviar"/>
                    </td>
                    <td>
                        <asp:Label ID="lblMensaje" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
        <div style="display:none;">
            <table width="100%">
                <tr>
                    <td>
                        <CR:CrystalReportViewer EnableDatabaseLogonPrompt="false" ID="crvConsulta" runat="server" 
                                                ReportSourceID="crConsulta" AutoDataBind="true" 
                                                Width="100%" ToolPanelView="None" 
                                                HasToggleGroupTreeButton="false"
                                                EnableDrillDown="False" HasCrystalLogo="False" 
                                                HasDrilldownTabs="False" />
                        <CR:CrystalReportSource ID="crConsulta" runat="server"></CR:CrystalReportSource>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>