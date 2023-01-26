<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_General_MisDatos_Clave" Codebehind="MisDatos_Clave.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <style type="text/css">
        #dvDashboard
        {
            width:100%;
            height:300px;
            border:0px dotted gray;    
            overflow:hidden
        }
        
        #contenedor
        {
            width:103%; 
            height:315px;
            border:0px dotted red; 
            overflow:scroll;
        }
    
        .dvImgDash
        {
            width:150px;
            height:170px;    
            border:1px dotted skyblue;
            float:left;
            margin-left:10px;
            margin-top:5px;  
        }
        
        .dvSelect
        {
            border:2px solid skyblue;
            border-radius: 3px ;
            box-shadow: 3px 3px 3px gray ;
        }
        
        .dashHead
        {
            width:150px;
            height:20px;    
            border:0px dotted gray;
        }
        .dashBody
        {
            width:150px;
            height:150px;    
            border:0px dotted gray;
        }
        
        .dashBody:hover
        {
            cursor:pointer;
        }

        .dashBody img {
             width: 100%;
             max-width: 100%;
             height: 100%;     
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">    
       <!-- ==============================================================
            MODULO DE SEGURIDAD - Es Clave Segura
       ==============================================================-->

       <asp:HiddenField id="hdfEsClaveSegura" runat="server"/>

       <!-- ==============================================================
       ==============================================================-->
        <div id="ChangeImagenUsuario" style="display: none;">
            <iframe id="ifChangeImagenUsuario" width="380px" height="210px" frameborder="0" style="padding: 0px;margin: 0px;"></iframe>
        </div>
          <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="¿Seguro que desea aplicar los cambios?"></asp:Label>
        </div>
        <div>            
            <table style="width: 100%;"  border="0" align="center">
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td  align ="left" style="font-size:16px;" >
                        <b><asp:Label ID="lblmensaje" runat="server" Text="mensaje del sistema"></asp:Label></b>
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td >


                    </td>
                </tr>
                <tr>
                    <td align="right" height="10px"></td>
                </tr>
                <tr>
                    <td  align="center" >
                        <div id ="divSeguridad" class="dvPanel" style="width:400px;">
                            <table border="0" width="90%">
                                <tr height="15px">
                                    <td></td><td></td>
                                </tr>
                                                        
                                <tr align ="left">
                                    <td>
                                        <asp:Label ID="lblvcUsu" runat="server" Text="Usuario"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtvcUsu" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                                    </td>
                                </tr>
                                                        
                                <tr> <td colspan="2"></td> </tr>

                                <tr align ="left">
                                    <td>
                                        <asp:Label ID="lblvcPas" runat="server" Text="Contraseña"></asp:Label>
                                    </td>
                                    <td>                                            
                                        <table cellpadding="0" cellspacing ="0" style="width:90%;">
                                            <tr align ="left">
                                                <td>
                                                    <asp:TextBox ID="txtvcPas" TextMode="Password" runat="server" Width="150px" MaxLength="200"></asp:TextBox>
                                                </td>
                                                <td>
                                                    <div id="dvInfo" runat="server" style="display: none;">
                                                        <ttgInfo:ToolTipGenerico ID="infoLinea" runat="server" Mensaje="" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr align ="left">
                                    <td>
                                        <asp:Label ID="Label1" runat="server" Text="Confirme Contraseña"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtvcPasCon" TextMode="Password" runat="server" Width="150px" MaxLength="200"></asp:TextBox>
                                    </td>
                                </tr>
                                                    
                                <tr height="15px">
                                    <td></td><td></td>
                                </tr>
                            </table>
                            </div>
                        <%--</div>--%>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>


    <%--Edgar Garcia 20-07 se movio al final este JS para que se lean las variables al cargar la pag--%>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MisDatos_Clave.js")%>" type="text/javascript"></script> 

</html>
