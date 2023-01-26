<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Sin_Configura.aspx.vb" Inherits="Sin_Configura" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script> 
    <link href="Sincroniza.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Sin_Configura.js" type="text/javascript"></script>

</head>
<body>
 <form id="form1" runat="server">
    <div>
 


        <div class="dvPanel" align="center">
            <table>
                <tr>
                    <td>
                        Origen de Información
                    </td>
                    <td>
                        <div class="select">
                            <asp:DropDownList ID="ddlOrigen" runat="server" CssClass="select">
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td align="center">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div id="btnorigen" class="btnNormal">
                            <asp:Image ID="imgorigen" runat="server" ImageUrl="../Images/report.png" Height="16px" />
                            <a>Ir a Configuración</a>
                        </div>
                        &nbsp;
                        <asp:HiddenField ID="hdfacilidad" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="configurar" style="display: none; overflow: hidden;overflow-x:hidden;overflow-y: hidden;">
        <iframe id="iconfigurar" width="100%" height="100%" frameborder="1" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>
    <div id="dvAbreviatura" style="display: none;">
        <iframe id="iAbreviatura" width="98%" height="98%" frameborder="1" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>

        <div id="dvSucursales" style="display: none;">
        <iframe id="iSucursales" width="100%" height="100%" frameborder="0" scrolling="no" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>

    <br />
    <center>
        <div class="dvPanel"  align="center" id="configuracion">
            <div class="ui-state-active" style="padding: 5px;">
            Configuraci&oacute;n Inicial
            <%--<center>
                <label class="titulo_grafico_1_hist" style="width: 100%; top: 0px; left: 0px;">
                    Configuraci&oacute;n inicial</label>
            </center>--%>
            </div>
            <br />
            <br />
            <table width="80%">
                <tr>
                    <td colspan="3" width="100%" align="left">
                        <div class="dvPanel">
                            Correo Administrador
                            <asp:TextBox ID="txtmail" size="80" runat="server" />
                        </div>
                    </td>
                </tr>
                <tr id="trsucursal" runat="server"  style="display:none !important;">
                      <td colspan="3" align="left" class="style21">
                        <div class="dvPanel" id="sucursal">
                            Sucursal por defecto&nbsp;
                            <asp:DropDownList ID="ddlsucursal" CssClass="select" runat="server">
                                <asp:ListItem Value="0">---Seleccione---</asp:ListItem>
                            </asp:DropDownList>
                            &nbsp;
                            <asp:CheckBox ID="chkMultisucursal" runat="server" Text="Multiples Sucursales" />
                            &nbsp;
                            <div id="btnMultisucursal" class="btnNormal" style="width: 110px; display: none;">
                                <asp:Image ID="Image2" runat="server" ToolTip="Asociar Extensión" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                &nbsp;Adicionar</div>
                            &nbsp;<p />
                            Facilidad por defecto
                            <asp:DropDownList ID="ddlfacilidad" CssClass="select" runat="server">
                            </asp:DropDownList>
                            &nbsp;</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="left">
                        <div class="dvPanel" id="empleado">
                            Nombre de empleado&nbsp;
                            <asp:DropDownList ID="ddlnombre" CssClass="select" runat="server">
                            </asp:DropDownList>
                            &nbsp;&nbsp;
                            <br />
                            <br />
                            Formato de nombre
                            <asp:DropDownList ID="ddlformato" CssClass="select" runat="server">
                            </asp:DropDownList>
                            &nbsp;&nbsp; Rol por defecto
                            <asp:DropDownList ID="ddlrol" CssClass="select" runat="server">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="left">
                        <div class="dvPanel" id="web">
                            <table>
                                <tr>
                                    <td>
                                        Crear Usuario Web
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkusuarioweb" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Formato Usu. Web
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlususuarioweb" runat="server">
                                        </asp:DropDownList>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="left">
                        <div class="dvPanel" id="anexo" >
                           <div id="AnexoCodigo" style="display:none !important;"> Crear Extensión de llamada
                            <asp:CheckBox ID="chkanexo" runat="server" />
                            <br />
                            Crear C&oacute;digo de llamada
                            <asp:CheckBox ID="chkcodigo" runat="server" />
                            Enviar correo de creación
                            <asp:CheckBox ID="chkcorreo" runat="server" />
                            <br />
                            </div>
                            <div style="display: none">
                                Unir C&oacute;digo a sucursal
                                <asp:CheckBox ID="chkunircodigo" runat="server" />
                                <br />
                                Unir Extensi&oacute;n a sucursal
                                <asp:CheckBox ID="chkuniranexo" runat="server" />
                                <br />
                            </div>
                            Dar de baja a empleados
                            <asp:CheckBox ID="chkeliminar" runat="server" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div id="btnexcepto" class="btnNormal">
                                <asp:Image ID="imgexeptos" runat="server" Style="height: 16px;" ImageUrl="../Images/workers.png" />
                                <a>Configurar Exceptos</a>
                            </div>
                            &nbsp;
                            <div id="btnAbreviatura" class="btnNormal" >
                                <asp:Image ID="ImgAbreviatura" runat="server" ImageUrl="../Images/mantenimiento.png" Height="16px" />
                                <a>Abreviaturas</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <table width="80%">
                <tr>
                    <td align="left">
                        <div class="dvPanel" id="lectura_orga">
                            <table>
                                <tr>
                                    <td>
                                        Lectura de la Organización:
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlorganizacion" runat="server">
                                        </asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Nombre Area principal (OU):
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtnombreou" runat="server" size="80" MaxLength="35"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
            <table width="80%">
                <tr>
                    <td align="left">
                        <div class="dvPanel" id="lectura_ldap">
                            <table>
                                <tr>
                                    <td>
                                        Traer empleado de LDAP desde :
                                        <asp:DropDownList ID="ddlladp" runat="server">
                                            <asp:ListItem Value="False">TODOS</asp:ListItem>
                                            <asp:ListItem Value="True">DESDE UN NODO(OU)EN LDAP</asp:ListItem>
                                        </asp:DropDownList>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtempleado" runat="server" size="80" MaxLength="100"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
            <br />
            <br />
            <div id="btngrabar" class="btnNormal">
                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Grabar Cambios</a>
                <%--<a style="position: relative; bottom: 5px;">Grabar Cambios</a>--%>
            </div>
        </div>
    </center>
    </div>
    </form>
</body>
</html>
