<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_BienvenidaMantenimiento" Codebehind="BienvenidaMantenimiento.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="BienvenidaMantenimiento.js" type="text/javascript"></script>
    <style type="text/css">
        
        .miBoton
        {
            border:1px solid skyblue;    
            border-radius:2px;
            box-shadow:0px 0px 4px gray;
            cursor:pointer;
        }
        
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <img id="imgFondo"  alt="FondoMantenimiento"  height="100%" width="100%" src="../Common/Images/MiCuenta/FondoMantenimiento.jpg" style="display:none;left:0%; top:0%; position:fixed;opacity:0.1;"/>
        <div>
            <div class="ui-tabs-panel ui-widget-content" style="border: 0px solid; background:none;">
                <h1>Mantenimientos</h1>
            </div>
            <br />
            <br />
	        <table width="400px" align="center" border="0">
	            <tr>
	                <td>
                        <cc1:BarraNavegacionJQ ID="bnMantenimiento" runat='server'>
                            <cc1:PanelBarraNavegacion ID="pbnMovil" runat="server" Titulo="Móvil" MostrarIcono="true" Mostrar="true" Width="300px">
                                <cc1:ItemBarraNavegacion runat="server" Activo="true" Click="" Seleccionable="false" Highlight="false" UrlIco="">
                                    <div style="padding-left:10px;">Usted cuenta con(*):</div> 
                                </cc1:ItemBarraNavegacion>
                            </cc1:PanelBarraNavegacion>
                            <cc1:PanelBarraNavegacion ID="pbnFija" runat="server" Titulo="Mantenimientos Dinámicos (Fija)" Mostrar="false" Width="300px">
                                <cc1:ItemBarraNavegacion runat="server" Activo="true" Click="" Seleccionable="false" Highlight="false" UrlIco="">
                                    <div style="padding-left:10px;">Usted cuenta con(*):</div> 
                                </cc1:ItemBarraNavegacion>
                            </cc1:PanelBarraNavegacion>
                        </cc1:BarraNavegacionJQ>
                    </td>
                </tr>
            </table>        
        </div>
    </form>
</body>
</html>
