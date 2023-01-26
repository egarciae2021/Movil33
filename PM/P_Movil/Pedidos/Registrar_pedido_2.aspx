<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_Pedidos_Registrar_pedido_2" Codebehind="Registrar_pedido_2.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>

    <script src="../../Common/Scripts/ui.dropdownchecklist-1.4-min.js" type="text/javascript"></script>

    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="Registrar_pedido_2.js"></script>
    <link href="Registrar_pedido_2.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <div style="display:none; position:absolute;" id="menu">
        <div id="eliminarProd" class="boton">
        eliminar
        </div>
    </div>
    <div id="opacidad">
        <div id="mostrar">
            <div id="titCel">
             Galaxy S4 (I9500) Azul: Precios y planes
                <div style="float:right" id="regresar">
                Atras
                </div>
            </div>
            <div id="imaCel">
                <img id="imgCel" alt="dispositvo" src="../../Images/ModeloDispositivo/12.jpg">
            </div>
            <div id="infoCel">
            El <b> Samsung Galaxy S4 </b> este smartphone tiene una pantalla de 4.99 pulgadas Full HD Super AMOLED, cámara trasera de 13 megapixels, cámara frontal de 2 megapixels, 2GB de RAM, procesador Exynos 5 Octa para la versión 3G o Snapdragon 600 para la versión LTE, 16GB/32GB/64GB de almacenamiento interno, ranura microSD, Android 4.2.2 Jelly Bean y varias aplicaciones únicas del mismo terminal
            </div>
            <div id="comprarCel">
                
                
                cantidad:<input id="Text1" type="text" size="2" maxlength="2" value="1" />
                <br />
                <div id="comp" class="boton">
                Comprar
                </div>              
            </div>            
            <div style="clear:both;">
                
            </div>
            <div id="cuerpoTats">
                <div id="navtats">
                    <div style="margin-left:5px !important;" class="tab tabSelect">
                        Servicios
                    </div>
                    <div class="tab">
                        Planes
                    </div>
                    <div class="tab">
                        Datos
                    </div>
                    <div class="tab">
                        Ajustes
                    </div>
                </div>

                <div id="detalleTabs">
                    <table id="tabla">

                    </table>
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
                            <div style="overflow:hidden">
                            <div id="cuerpo_productos" class="cuerpo_gen">
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div>  
                                <div class="producto"><img src="../../Images/ModeloDispositivo/171.jpg"></div>  
                                <div class="producto"><img src="../../Images/ModeloDispositivo/2.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/44.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/40.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/41.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/51.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/52.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/171.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/165.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/80.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/86.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/93.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/32.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/35.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/36.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/37.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/38.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/39.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/40.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/12.jpg"></div> 
                                
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
                <div id="generalCarrito">
                    <div  style="width:100%; height:20px; border-bottom:5px solid skyblue; font-size:medium; "  id="headCarrito">
                        Detalle Carrito de compras
                    </div>
                    
                    <div  style="width:100%; height:500px; overflow:scroll; " id="bodyCarrito">

                        <div style="background-color:skyblue; font-weight:bold;" class="prodElehead"><div style="font-weight:bold;" class="prodDesc">Descripcion</div><div style="font-weight:bold;" class="prodServ"> Servicios </div><div style="font-weight:bold;" class="prodPre">precio</div>    </div>
    <%--                        <div class="prodEle"><div class="prodDesc">Iphone</div><div class="prodServ"> <input class="chkserv" id="customers" style="width: 140px;"/> </div><div class="prodPre">500.00</div>    </div>
                            <div class="prodEle"><div class="prodDesc">Sansumg</div><div class="prodServ"> <input class="chkserv" id="Text2" style="width: 140px;"/>  </div><div class="prodPre">1000.00</div>    </div>
                            <div class="prodEle"><div class="prodDesc">balckberry</div><div class="prodServ"> <input class="chkserv" id="Text3" style="width: 140px;"/>  </div><div class="prodPre">1299.00</div>    </div>
                            <div class="prodEle"><div class="prodDesc">nokia</div><div class="prodServ"> <input class="chkserv" id="Text4" style="width: 140px;"/>  </div><div class="prodPre">1.0</div>    </div>--%>
                        <%--<div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>--%>

                    </div>
                    <div  style="width:100%; height:20px; border-top:5px solid skyblue; font-size:medium; "id="footCarrito">
                        Total de compra
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
