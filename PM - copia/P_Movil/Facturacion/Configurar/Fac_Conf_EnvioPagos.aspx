<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Configurar_Fac_Conf_EnvioPagos"
    CodeBehind="Fac_Conf_EnvioPagos.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Imp_Config.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
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
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="Imp_Config.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Fac_Conf_EnvioPagos.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeadoNombre" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField runat="server" ID="hdfEsAdm"/>
    <div id="dvContenido" class="dvPanel" style="width: 630px;">
        <div id="dvActualizarEC" style="display: none;" runat="server">
            <h3 style="padding: 0px; margin-top: -5px; border: 0px #ffffff; background: #ffffff;" class="ui-state-active">Archivo de Estado de Cuenta</h3>
            <div align="center">
                <div id="btnEjecutar" class="btnNormal">
                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Ejecutar.png" />
                    <a>Actualizar Estado de Cuenta</a>
                </div>
            </div>
            <br/>
            <hr style="width: 100%; background-color: #A6C9E2; height: 1px; border: 0;" />
            <br/>
        </div>
        <div>
            <h3 style="padding: 0px; margin-top: -5px; border: 0px #ffffff; background: #ffffff;" class="ui-state-active">Configuración de Formato de Estado de Cuenta</h3>
            <table id="tbConfVeri" border="0">
                <tbody>
                    <tr>
                        <td class="tdEtiqueta" style="width: 111px;">
                            <span id="Span8">Enviar</span>
                        </td>
                        <td>
                            <input id="chkEnvio" type="checkbox" checked="checked" /><span id="Span3"></span>
                        </td>
                    </tr>
                    <tr class="mens">
                        <td class="style1" colspan="2">
                            <span id="Span1" style="font-style:italic;">Se enviará después del Resumen De Deudas</span>
                        </td>
                    </tr>
                    <tr class="arriba">
                        <td class="style1">
                            <span id="Span6">Asunto</span>
                        </td>
                        <td class="style1">
                            <input id="txtAsunto" type="text" value="Envío de Estado de Cuenta" maxlength="100"
                                style="width: 400px; padding: 4px;" />
                        </td>
                    </tr>
                    <tr class="arriba">
                        <td class="style1">
                            <span id="Span7">Saludo</span>
                        </td>
                        <td class="style1">
                            <input id="txtSaludo" maxlength="100" type="text" value="Buen día Sr(a)" style="width: 250px;
                                padding: 4px;" />
                            <input id="chkNombre" type="checkbox" checked="checked" />
                            <span id="Span9">Inc. Nombre</span>
                        </td>
                    </tr>
                    <tr class="arriba">
                        <td class="style1">
                            <span id="">Mensaje</span>
                        </td>
                        <td class="style1">
                            ​<textarea id="txtMensaje" rows="10" cols="70" maxlength="250" style="width: 400px;
                                resize: none;" placeholder="Ingrese Mensaje Predeterminado"></textarea>
                        </td>
                    </tr>
                    <tr style="padding: 10px">
                        <td class="auto-style1">
                            <label for="ddlFacFrecuenciaEnvio">
                                Empleados Exceptos de envío</label>
                        </td>
                        <td class="">
                            <%--  <div id="btnEmpleados" class="k-button">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        &nbsp;...
                                    </td>
                                </tr>
                            </table>
                        </div>--%>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </div>
        <div>
            <cc1:contenedoraccodion texto="Por empleado" style="padding-top: 0px; margin-top: 0px;">
        <div id="dvEmpleado">
            <table>
                <tr>
                    <td>
                    </td>
                    <td><asp:TextBox ID="txtFiltro" runat="server" placeholder="Ingrese filtro de búsqueda" Style="width:300px;"></asp:TextBox>
                    </td>
                    <td>
                   <%-- <asp:Button ID="btnBuscar" runat="server" Text="Button"></asp:Button>--%>
                         <div id="btnBuscar" class="btnNormal">
                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/lup.png" Style="width:15px; height:15px;"/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="btnEmpleado" class="btnNormal" runat="server">
                            <img id="imgCli" alt="Cliente" src="../../../Common/Images/Mantenimiento/Clientes.png" />
                        </div>
                    </td>
                    <td>
                        <asp:ListBox ID="lstEmpleado" runat="server" Width="350px" Height="76px" 
                            SelectionMode="Multiple"></asp:ListBox>
                    </td>
                    <td>
                        <div id="btnQuitarEmpleado" class="btnNormal">
                            <asp:Image ID="imgQuitarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                            <a>Quitar</a>
                        </div>
                    </td>
                </tr>
            </table>                                    
        </div>
    </cc1:contenedoraccodion>
        </div>
        <table>
            <tr style="padding-top: 20px;">
                <td colspan="2">
                    <br />
                    <div style="text-align: left;">
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                        <div id="btnCerrar" class="btnNormal">
                            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cancelar</a>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <br />
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px;
                margin: 0px;"></iframe>
        </div>
        <br />
    </div>
    </form>
</body>
</html>
