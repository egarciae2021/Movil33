<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ConfiguracionParametro.aspx.vb" Inherits=".ConfiguracionParametro" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

 <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />

    <link href="../../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css"  />
    
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript" ></script>

    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
     <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"  type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
         <script src="ConfiguracionParametro.js" type="text/javascript"></script>        
<style type="text/css" >
    .ColumGridColor
    {
        background-color:#EFF8FB;
        }
</style>

</head>
<body>
    <form id="form1" runat="server">
    <div>
    

    <div class="dvPanel"  style="padding : 5px;  overflow: auto;">
                <table>
                    <tr>
                        <td>
                                 <table id="tbNumeros3"></table>
                                 <div id="pager"></div>
                        </td>
                        <td valign="top">
                            <table>
                                <tr>
                                    <td>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="baseline" >                    
                                                            <div id="btnCambiarValGrup" class="btnNormal" runat="server" style="width:180px;">
                                                                <asp:Image ID="imgCambiarValGrup" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                                <a>Cambiar valor</a>
                                                            </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>                    
                                        
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>   
    </div>
    
    <div id="div_CambioValor" style="display:none;">
            <table>
                <tr>
                    <td><asp:HiddenField id="hdf_CodPolitica" runat="server"/></td>
                </tr>
                <tr>
                    <td style="width:80px">Clave</td>
                    <td><asp:Label ID="lblDescrip" runat="server" style="color:Navy;"></asp:Label></td>
                </tr>
                <tr>
                    <td>Valor</td>
                    <td>
<%--                        <asp:TextBox id="txtValor" Width="30px" MaxLength="2" runat="server"></asp:TextBox>--%>
                        <asp:TextBox ID="ddlVarloracambiar" style="display:none;" runat="server" Width="300px" ></asp:TextBox>
                    </td>
                </tr>
                 <tr>
                    <td>Descripcion</td>
                    <td>
                         <asp:TextBox ID="ddlDescripcionacambiar" style="display:none;" runat="server" Width="300px" ReadOnly ></asp:TextBox>
                    </td> 
                </tr>
                <tr>
                    <td></td>
                </tr>
            </table>
    </div>

    </div>
    </form>
</body>
</html>

