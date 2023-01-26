<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_CortesEnvio" Codebehind="Cam_CortesEnvio.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_CortesEnvio.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfIdCorte" />
        <asp:HiddenField runat="server" ID="hdfRenovacionConEquipo" />
        <asp:HiddenField runat="server" ID="hdfSituacion" />        
        <asp:RadioButtonList ID="rbtnlstTipoEnvio" runat="server" RepeatDirection="Horizontal">
            <asp:ListItem Text="Descargar Detalle" Value="1" Selected="True"></asp:ListItem>
            <asp:ListItem Text="Enviar por Correo" Value="2"></asp:ListItem>
        </asp:RadioButtonList>
        <div id="dvCorreo" style="display:none;">
            <table>
                <tr>
                    <td>
                        <asp:Label ID="Label2" runat="server" Text="Correos:"></asp:Label>  
                    </td>
                    <td>
                        <asp:TextBox ID="txtCorreo" runat="server" Width="400px"></asp:TextBox>  
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label1" runat="server" Text="Asunto:"></asp:Label>                                    
                    </td>
                    <td>
                        <asp:TextBox ID="txtAsunto" runat="server" Width="400px"></asp:TextBox>                                    
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label3" runat="server" Text="Mensaje:"></asp:Label>  
                    </td>
                    <td>
                        <asp:TextBox ID="txtCuerpo" runat="server" Width="400px" TextMode="MultiLine" Height="100px"></asp:TextBox>  
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <asp:Label ID="lblMensaje" runat="server" Text=""></asp:Label>                    
        </div>
        <div>
            <div id="btnEnviarCli" class="btnNormal">
                <asp:Image ID="imgEnvio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Enviar</a>
            </div>    
            <asp:Button ID="btnEnviar" runat="server" Text="Enviar"/>                    
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding:0px; margin:0px; display:none;"></iframe> 
<%--            <table>            
                <tr>
                    <td>                    
                        <div id="btnDescargar" class="btnNormal" runat="server" style="width:180px;">                        
                            <asp:Image ID="imgAgregarProducto" runat="server" ImageUrl="~/Common/Images/Mantenimiento/excel16.png" />
                            <a>Descargar</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>                    
 
                    </td>
                </tr>
            </table>   --%>         
    </form>
</body>
</html>
