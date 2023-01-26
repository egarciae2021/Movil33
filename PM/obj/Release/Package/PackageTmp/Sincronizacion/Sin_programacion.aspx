<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Sin_programacion.aspx.vb" Inherits="Sin_programacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

      <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
     <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script> 
    <link href="Sincroniza.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Sin_Programacion.js" type="text/javascript"></script>

</head>
<body>
   
   <form id="form1" runat="server">
    <div>
        <div id="configurar" style="display:none;">
            <iframe id="iconfigurar" width="100%" height="100%" frameborder="1" style="padding:0px; margin:0px;" ></iframe>
        </div>
        <br />

        <div class="dvPanel" style="width:80%;" align="center" >
            <center>
                <label class="titulo_grafico_1_hist" style="width:100%; top: 0px; left: 0px;" >
                                Programaci&oacute;n de tareal</label>
            </center>
            <br /><br />
            <table width="80%">
                <tr>
                    <td>
                        <div class="dvPanel">
                            <table>
                                <tr>
                                    <td style="width: 80px;">
                                        Tipo de tarea
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlperiodo" runat="server"></asp:DropDownList>    
                                    </td>
                                </tr>
                                
                            </table>
                            <div id="dvdia">
                                <table>
                                    <tr>
                                        <td style="width: 80px;">
                                            Día de la tarea 
                                        </td>
                                        <td>
                                            <asp:DropDownList ID="ddldia" runat="server"></asp:DropDownList>
                                            <asp:HiddenField ID="hdia" runat="server" />      
                                        </td>
                                    </tr> 
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="dvPanel">
                            Hora de Ejecución&nbsp;&nbsp; 
                            <asp:TextBox ID="txthora" runat="server" Width="60px" CssClass="txthora" Text="00:00:00"></asp:TextBox> &nbsp;    
                        </div>
                    </td>
                </tr>
            </table>
            <br /><br />
            <div id="btngraba" class="btnNormal">
                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" Width="16px" />
                <a>Grabar Cambios</a>
            </div>
            <div id="btnahora" class="btnNormal">
                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Aprobar.png" Height="16px" />
                <a>Ejecutar Ahora</a></div>
            </div>
        </div>
    </form>

</body>
</html>
