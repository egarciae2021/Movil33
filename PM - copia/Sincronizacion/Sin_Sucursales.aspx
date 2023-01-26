<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Sin_Sucursales.aspx.vb" Inherits="Sin_Sucursales" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script> 
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Sin_Sucursales.js" type="text/javascript"></script>

</head>
<body>
      <form id="form1" runat="server">
   <div class="dvPanel" style="width:100%;"  >
    
            
            <table >
                <tr>
                    <td style="text-align:right; width:60px;">
                        Sucursal :
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlsucursal2" CssClass="select" runat="server" style="width: 130px;">
                            <asp:ListItem Value="0">---Seleccione---</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td style="text-align: right; width:120px;">
                        Facilidad por defecto :
                    </td>
                    <td class="style22">
                        <asp:DropDownList ID="ddlfacilidad2" CssClass="select" Style="width: 120px;" runat="server">
                        </asp:DropDownList>
                    </td>
                    <td style="width: 40px;">
                        <div id="btnAgregar" class="btnNormal" style="width: 40px; display: block;"
                            title="Agregar">
                            <asp:Image ID="Image3" runat="server" ToolTip="Adicionar Empleado" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                        </div>
                    </td>
                    <td style="width: 50px;">
                        <div id="btnQuitar" class="btnNormal" style="width: 40px !important; margin-left: 0px;">
                            <asp:Image ID="Image4" runat="server" ToolTip="Adicionar Empleado" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <table id="gridsucursal" runat="server">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                </tr>
            </table>
     <div style="margin-left:390px;">            
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                <a>Cerrar</a>
            </div>
        </div>



   </div>
    </form>
</body>
</html>
