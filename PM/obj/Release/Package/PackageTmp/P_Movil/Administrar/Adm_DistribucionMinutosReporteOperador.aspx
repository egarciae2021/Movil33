<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_DistribucionMinutosReporteOperador" Codebehind="Adm_DistribucionMinutosReporteOperador.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.MultiFile.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_DistribucionMinutosReporteOperador.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCuenta" runat="server" />
    <asp:HiddenField ID="hdfArchivo" runat="server" />
    <asp:HiddenField ID="hdfValorIlimitado" runat="server" />
    
    <div id="dvEnviarReporte" runat="server" class="dvPanel" style="display:none;">
        <table>
            <tr>
                <td>Registros a enviar</td>
                <td>
                    <asp:RadioButtonList ID="rlstDatosReporte" runat="server">
                        <asp:ListItem Selected="True" Value="1">Enviar cambios desde ultima generación de envio</asp:ListItem>
                        <asp:ListItem Value="2">Enviar cambios desde un determinado numero de dias</asp:ListItem>
                    </asp:RadioButtonList>
                </td>
                <td>
                    <div id="dvDias" style="display:none;">
                        <table>
                            <tr>
                                <td>
                                    Del:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDiaInicial" runat="server" Width="75px" CssClass="txtFecha"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Al:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDiaFinal" runat="server" Width="75px" CssClass="txtFecha"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Tipo de envio</td>
                <td colspan="2">
                    <asp:RadioButtonList ID="rlstTipoDeEnvio" runat="server">
                        <asp:ListItem Selected="True" Value="1">Descargar Reporte</asp:ListItem>
                        <asp:ListItem Value="2">Enviar por correo</asp:ListItem>
                        <asp:ListItem Value="3">Ambos</asp:ListItem>
                    </asp:RadioButtonList>
                </td>
            </tr>
            <tr>            
                <td colspan="3">
                    <div id="dvCorreo" style="display:none;">
                        <table>
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
                                    <asp:Label ID="Label2" runat="server" Text="Correos:"></asp:Label>  
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCorreo" runat="server" Width="400px"></asp:TextBox>  
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
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <asp:Button ID="btnEnvio" runat="server" Text="" />
                    <div id="btnEnvioCli" class="btnNormal">
                        <asp:Image ID="imgEnvio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                        <a>Enviar</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
