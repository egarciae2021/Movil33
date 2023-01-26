<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Imp_RegistroLinea" Codebehind="Imp_RegistroLinea.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title></title>
        <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
        <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
        <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
        <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
        <link href="../../Common/Styles/jquery.tooltip.css" rel="stylesheet" type="text/css" />
        <script src="../../Common/Scripts/jquery.tooltip.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    </head>
    <body>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Imp_RegistroLinea.js")%>" type="text/javascript"></script>
        <form id="form1" runat="server">
            <div id="dvCargando" class="dvCargando"></div> 
            <asp:HiddenField ID="hdfinCodCol" runat="server" />
            <asp:HiddenField runat="server" ID="hdfvcCodCue" />
            <asp:HiddenField runat="server" ID="hdfCodProc" />
            <asp:HiddenField runat="server" ID="hdfMesPer"/>
            <asp:HiddenField runat="server" ID="hdfInTipPla"/>
            <asp:HiddenField runat="server" ID="hdfIdTipRes"/>
            <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
            <cc1:TabJQ runat="server" ID="TabOpciones" CssClass="tabs" Style="margin-top: 1px;">
                <cc1:ContenedorTabJQ Titulo="Lineas" CssClass="tabHijo" Height="310px">
                    <table>
                        <tr>
                            <td>
                                <h3><asp:Label runat="server" ID="lblSinReg" Text="Líneas"></asp:Label>  sin registrar</h3>
                                <asp:TextBox ID="txtFiltroLinea" runat="server" ToolTip="Ingrese un valor para filtrar lineas"></asp:TextBox>
                                <div id="dvLinea" class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px; margin-top:10px; width:160px; height: 200px; overflow:auto; text-align:left;" >                        
                                    <asp:CheckBoxList ID="chklstNumerosSinRegistrar" runat="server" Width="150px"></asp:CheckBoxList>
                                </div>                            
                            </td>
                            <td>
                                <div id="btnAsociar" class="btnNormal" style="width:155px;">
                                    <asp:Image ID="imgAsociar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Volcar.gif" />
                                    <a>Asociar</a>
                                </div>
                                <br />
                                <div id="btnSeleccionarTodos" class="btnNormal" style="width:155px;">
                                    <asp:Image ID="imgSeleccionarTodos" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png" />
                                    <a>Seleccionar todos</a>
                                </div>
                                <br />
                                <div id="btnLimpiar" class="btnNormal" style="width:155px;">
                                    <asp:Image ID="imgLimpiar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                                    <a>Limpiar</a>
                                </div>                            
                            </td>
                        </tr>
                    </table>          
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Empleados" CssClass="tabHijo" Height="310px">                
                    <table>
                        <tr>
                            <td>
                                <h3><asp:Label runat="server" ID="lblAregistrar" Text="Líneas"></asp:Label> a registrar</h3>
                                <asp:ListBox ID="lstLinea" runat="server" Width="130px" Height="250px" ></asp:ListBox>
                            </td>
                            <td>
                                <div class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px; overflow:auto;text-align:center;" >                        
                                    <table>
                                        <tr>
                                            <td>
                                                Empleado
                                                <br />
                                                <asp:TextBox ID="txtEmpleado" runat="server" Width="200px"></asp:TextBox>
                                                <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                                                <br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Sucursal
                                                <br />
                                                <asp:TextBox ID="txtSucursal" runat="server" Width="200px"></asp:TextBox>
                                                <asp:HiddenField ID="hdfCodSucursal" runat="server" />
                                                <br />
                                            </td>
                                        </tr>
                                        <tr id="trModeloDisp" style="display: none;">
                                            <td>
                                                Modelo<br/>
                                                <asp:TextBox runat="server" ID="txtModeloDisp" Width="200px"></asp:TextBox>
                                                <asp:HiddenField runat="server" ID="hdfCodModelo"/>
                                            </td>
                                        </tr>
                                        <tr style="display: none;">
                                            <td>
                                                Tipo Línea
                                                <br />
                                                  <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="208px"></asp:DropDownList>
                                                <br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:right;">
                                                <div id="btnGuardar" class="btnNormal" style="width:155px;">
                                                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                                    <a>Asociar</a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:right;" colspan="2">
                                                <div id="btnCancelar" class="btnNormal" style="width:155px;">
                                                    <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                                                    <a>Cancelar</a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <br />
                                </div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>

        </form>
    </body>
</html>
