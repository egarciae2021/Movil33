<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_List_CentCost.aspx.vb" Inherits=".Mnt_List_CentCost" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
             <link href="../../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"  type="text/css" />
    <link href="../../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />

        <link href="../../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
            
        <script src="../../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>

        <script src="../../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="../../../../Common/Scripts/anytime.js" type="text/javascript"></script>
         <script src="Mnt_List_CentCost.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
   
      <div class="dvPanel"  style="overflow: auto; margin-bottom:5px">
         <table align="center">
                        <tr>
                            <td style="text-align: right">
                                &nbsp;&nbsp; <span class="style1">Centro de Costo</span>:</td>
                            <td>
                                <asp:DropDownList ID="ddlCentroCosto" runat="server" Width="234px"></asp:DropDownList>
                            </td>
                            <td style="text-align: right">
                                <strong>&nbsp;&nbsp;&nbsp; </strong>Nivel :</td>
                            <td>
                                <asp:DropDownList ID="ddlNivel" runat="server" Width="234px"> </asp:DropDownList>
                            </td>
                            <td>

                            <div id="btnMostrar" class="btnNormal" runat="server" title="Mostrar Reporte">
                                <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/FiltroAgregar_16x16.png" />
                                <a>Mostrar Reporte</a>
                            </div>
                            </td>
                             <td>
                            <div id="btnLimpiar" class="btnNormal" runat="server" title="Limpiar" style="width:139px">
                                <asp:Image ID="imgLimpiar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                                <a>Limpiar</a>
                            </div>
                            </td>
                        </tr>
                        </table>
        </div>

     <div class="dvPanel" style="overflow: auto; text-align: center; margin-top: 5px">

      <iframe id="ifReporteDevExpress" frameborder="0" style="padding: 0px; margin: 0px;
            width: 1024px;"></iframe>
    </div>
    </form>
</body>
</html>
