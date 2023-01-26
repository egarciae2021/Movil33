<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainPrincipal.aspx.cs"
    Inherits="PcSistelMovil2Web.MainPrincipal" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<html xmlns="http://www.w3.org/1999/xhtml">
<link rel="shortcut icon" href="Common/Images/favicon.ico" type="image/ico" />
<head runat="server">
    <title>Gestión Móviles</title>
    <link href="Styles/Principal.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .style1
        {
            width: 919px;
        }
        #header_login
        {
            width:98%;
            height:32px;
            padding:1%;
            /*background-color: #6FA7D1;*/
            /*border-bottom: 1px solid #CFDDEE;*/            
            /*border:1px dotted gray;*/
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            box-shadow: 1px 1px 1px gray;
            /*background: rgba(135, 182, 217,.7)*/
        }
        .logo_str_home
        {
            font-family: Arial;
            color: #175296;
            font-size: 20px;
            font-style: italic;
            margin-right: 18px;
            margin-top: 15px;
            font-weight: bold;
        }
    </style>
    <link href="Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="Scripts/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />    
 
    <script src="Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <link href="Styles/Principal.css" rel="stylesheet" type="text/css" />

</head>
<body id="bodyMain">

    <script src="<%=Web.GeneralMantenimiento.UtilitarioWeb.ObtieneVersionArchivoEstatico("MainPrincipal.js") %>" type="text/javascript"></script>

    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfModuloCantidad" runat="server" />
    <div id="divWait" style="display: none; width: 100%; height: 100%; position: fixed;
        left: 0px; top: 0px; background: rgb(240,240,240); background: rgba(0,0,0,.7);
        z-index: 999999;">
        <div style="position: relative; top: 50%; left: 45%; width: 225px; height: 50px;
            padding-bottom: 8px; background-image: url('Common/Images/progressbar_load.gif');
            background-repeat: no-repeat; background-position: center; font-weight: bolder;
            color: darkblue; background-color: rgba(200,200,200,.8); border-radius: 10px;
            padding-left: 5px;">
            Espere por favor...</div>
    </div>
    <div>
        <div id="dvMsgAlertas" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <div id="dvContenidoAlertas">
            </div>
        </div>
        <div id="header_login">
        <div style="float:right;">
            <asp:Label ID="lblEmpresa" runat="server" Font-Bold="True" Font-Names="Arial" Font-Size="Large" ForeColor="#2779aa" Text="PCSISTELMOVIL_2.0"></asp:Label>
        </div>
            <img style="float:left;" src="Common/images/Logo_PMS.png" width="250" height="40" />
        </div>
        <table cellpadding="0" cellspacing="0" width="100%">
<%--            <tr id="header_login">
                <td class="">
                    <img src="Common/images/logo_visualsoft.jpg" style="height:50px;margin-left:1px;" />
                </td>
                <td align="right">
                    <div class="logo_str_home">
                        <asp:Label ID="lblEmpresa" runat="server" Font-Bold="True" Font-Names="Arial" Font-Size="Large"
                            ForeColor="white" Text="PCSISTELMOVIL_2.0"></asp:Label>
                    </div>
                </td>
            </tr>--%>
            <tr>
                <td colspan="2" style="text-align: right;">            
                    <div id="info_usuario" style="float: right; width: 80%">
                        <div>
                            <asp:Label runat="server" ID="lblUsuario" CssClass="datos_usuario"></asp:Label>
                            <asp:LinkButton runat="server" ID="LinkButton1" Text="Cerrar sesión" CssClass="link_cerrar"
                                OnClick="lnkcerrar_Click"></asp:LinkButton>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <div id="btnOcultarMenu" class="dvMenu" style="margin-top: -15px; margin-left: 0px;display: none;
            position: absolute; cursor: pointer; z-index: 999;">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="Common/images/Mantenimiento/flecha_antes.png"
                ToolTip="Ocultar Menu" />
            <a>Ocultar Menú</a>
        </div>
        <div id="btnMostrarMenu" class="dvMenu" style="display: none; position: absolute;
            cursor: pointer; z-index: 999; margin-top: -15px;">
            <asp:Image ID="Image1" runat="server" ImageUrl="Common/images/Mantenimiento/flecha_despues.png"
                ToolTip="Mostrar Menu" />
            <a>Mostrar Menú</a>
        </div>
        <div id="contenido">
            <table width="100%">
                <tr>
                    <td width="170px" style="vertical-align: top; margin-top:0px;" id="tdMenu">
                        <div id="Menunavegacion" style="margin-top: -15px;">
                            <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ1" runat="server">
                           
                            </cc1:BarraNavegacionJQ>
                        </div>
                        <div id="pielogo" style="vertical-align: bottom; bottom: 0px; position: absolute; display:none;">
                            <img src="Common/images/Powered.gif" />
                        </div>
                    </td>
                    <td valign="top" style="vertical-align: top">
                        <div id="dvDetalle" style=" ">
                            <iframe id="ifTema" style="width: 100%; vertical-align: top; padding: 0px; margin: 0px;
                                margin-top: 0px; background: white; border: 1px solid #a6c9e2; border-radius: 4px;"
                                frameborder="0" ></iframe>
                          

                            <%-- background: #f0f7fc;border: 1px solid #a6c9e2;--%>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
</body>
</html>
