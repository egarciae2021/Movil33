<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_Pedidos_Registrar_pedidos" Codebehind="Registrar_pedido.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="Registrar_pedido.js"></script>
    <link href="Registrar_pedido.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <div id="opacidad">
        <div id="mostrar">
            <div id="mostrarCuerpo">
                <div id="imaProd">
                    imagen del producto
                </div>
                <div id="descProd">
                    titulo<br />
                    descripcion del producto
                </div>
            </div>
        </div>
    </div>
    <div id="general">
        <div id="principal">
            <div id="head" class="cuerpo">
                <div id="titulo">
                </div>
            </div>
            <div id="body" class="cuerpo">
                <div id="pasos">
                    <div id="paso1" class="paso">
                        Eleccion de productos
                        <div class="pasonum">
                            1
                        </div>
                    </div>
                    <div id="paso2" class="paso">
                        Forma de pago
                        <div class="pasonum">
                            2
                        </div>
                    </div>
                    <div id="paso3" class="paso">
                        Confirmacion
                        <div class="pasonum">
                            3
                        </div>
                    </div>
                    <div id="paso4" class="paso">
                        Resumen
                        <div class="pasonum">
                            4
                        </div>
                    </div>
                    <div id="mostrar1" class="mostrar">
                    </div>
                    <div id="mostrar2" class="mostrar">
                    </div>
                </div>
                <div id="controlPasos">
                    <div id="4" class="controlNum">
                        4
                    </div>
                    <div id="3" class="controlNum">
                        3
                    </div>
                    <div id="2" class="controlNum">
                        2
                    </div>
                    <div id="1" class="controlNum numElegido">
                        1
                    </div>
                </div>
                <div id="cuer_pe" class="cuerpo_pedidos">
                    <div id="head_pedidos" class="cuerpo_pedidos">
                    </div>
                    <div id="body_pedidos" class="cuerpo_pedidos">
                        <div id="productos" class="pag">
                            <div id="head_productos" class="head_gen">
                                <div id="Div1" class="cuerpo_pedidos">
                                    <div>
                                        <asp:DropDownList ID="ddlFiltro" runat="server">
                                            <asp:ListItem>modelo</asp:ListItem>
                                            <asp:ListItem>sistema operativo</asp:ListItem>
                                            <asp:ListItem>campaña</asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                    </div>
                                    <div>
                                        <div class="filtro">
                                            <span style="float: right" class="ui-icon ui-icon-circle-close"></span><span>sistema
                                                operativo:android </span>
                                        </div>
                                        <div class="filtro">
                                            <span style="float: right" class="ui-icon ui-icon-circle-close"></span><span>campaña:navidad
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="cuerpo_productos" class="cuerpo_gen">
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox15" class="Text" runat="server" Width="15" MaxLength="2"
                                            Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox2" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox3" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox4" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox5" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox6" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox7" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox8" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox9" class="Text" runat="server" Width="15" MaxLength="2" Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox10" class="Text" runat="server" Width="15" MaxLength="2"
                                            Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox11" class="Text" runat="server" Width="15" MaxLength="2"
                                            Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox12" class="Text" runat="server" Width="15" MaxLength="2"
                                            Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox13" class="Text" runat="server" Width="15" MaxLength="2"
                                            Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox14" class="Text" runat="server" Width="15" MaxLength="2"
                                            Text="1"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="producto">
                                    <div class="ElegirProd">
                                        <span class="ui-icon ui-icon-plus"></span>
                                        <asp:TextBox ID="TextBox16" class="Text" runat="server" Width="15" MaxLength="2"
                                            Text="1"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div id="footer_productos" class="footer_gen">
                                <div id="irFormaPago" class="next">
                                    Forma de pago >>
                                </div>
                            </div>
                        </div>
                        <div id="pago" class="pag">
                            <div class="head_gen">
                            </div>
                            <div class="cuerpo_gen">
                            </div>
                            <div class="footer_gen">
                                <div id="irConfirmacion" class="next">
                                    Confirmación >>
                                </div>
                                <div id="backProductos" class="back">
                                    << Productos
                                </div>
                            </div>
                        </div>
                        <div id="confirmacion" class="pag">
                            <div class="head_gen">
                            </div>
                            <div class="cuerpo_gen">
                            </div>
                            <div class="footer_gen">
                                <div id="irResumen" class="next">
                                    Resumen >>
                                </div>
                                <div id="backPago" class="back">
                                    << Forma de pago
                                </div>
                            </div>
                        </div>
                        <div id="resumen" class="pag">
                            <div class="head_gen">
                            </div>
                            <div class="cuerpo_gen">
                            </div>
                            <div class="footer_gen">
                                <div id="finalizar" class="next">
                                    Finalizar
                                </div>
                                <div id="backConfirmacion" class="back">
                                    << Confirmacion
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="foot_pedidos" class="cuerpo_pedidos">
                    </div>
                </div>
            </div>
            <div id="foot" class="cuerpo">
            </div>
        </div>
    </div>
    </form>
</body>
</html>
