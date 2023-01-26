<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="DetallePedido.aspx.vb" Inherits="WebSiteCliente.DetallePedido" %>
<%@ Import Namespace="WebSiteCliente.UtilitarioPCSistel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="DetallePedido.js" type="text/javascript"></script>--%>
    <%--<script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(5(){$(".Y").I(5(){h($.x.W&&$.x.Q=="6.0")9.26.1Z="2N.K";w 9.26.1Z="2A.K"});$(".1d").I(5(){1X()});h($.x.W&&$.x.Q=="6.0"){h($.x.W&&$.x.Q=="6.0"){$(".Y").3c("k-2G");$(".Y").4({"J-v":"#1M","2D":"H"});$(\'.Y\').1c(5(){$(u).4({"J-v":"37","1v":"3e"})},5(){$(u).4({"J-v":"#1M","1v":"3o"})})}$("#3q").2n();$("#2q").1q("I",5(){$("#P").4("o","z");$("#1b").4("o","O")})}w{$("#P").1n({X:"3g",3h:"3i",3j:"3món 1m",3r:["2e"],2m:15,2o:E,2r:E})}$("2y").1q("2z",5(e){h(e.2C==13){2F E}});$("#s").G({2I:E,2L:"2M",1j:2V,1h:5(e){r a=$("#s").q("G");a.1g($.R(u.T()));r b=a.1W(0);$("#1E").j(b.1p);$("#17").N(b.1i)},1a:5(e){$("#s").1c(5(){h(!$("#s").16("B")){$("#1D").4({"H":$("#s").11().H+$("#s").X()+20,"Z":$("#s").11().Z-7,"o":"O"})}},5(){$("#1D").4("o","z")})}});$("#p").L({1h:5(e){r a=u.T()},1a:5(e){$($("#p").f()).1c(5(){h(!$("#p").16("B")){$("#1l").4({"H":$($("#p").f()).11().H+$($("#p").f()).X()+2J,"Z":$($("#p").f()).11().Z-7,"o":"O"})}},5(){$("#1l").4("o","z")})}});$("#2K").I(5(){1Y()});25();1f();$("#1b").2O(2P);$(".2Q").I(5(){9.2R()});h(9.f.2S){$(".2T").4("o","z")}});5 25(){$("#2U").j(9.f.g.2W);$("#2X").j(9.f.g.34);$("#35").j(9.f.g.36);$("#3K").j(9.f.g.39);$("#3b").j(9.f.g.18);$("#3d").j(9.f.g.19);$("#3f").j(F.A(9.f.g.1k.D(2),"S/ "));$("#3p").j(F.A(9.f.g.1o.D(2),"S/ "));r a=C(9.f.g.1k)+C(9.f.g.1o);$("#2c").j(F.A(a.D(2),"S/ "));r b=$("#s").q("G");b.1g($.R(9.f.g.2d));r c=b.1W(0);h(c!=2f){b.2g(b.2h.2i().2j(0));$("#1E").j($.R(c.1p));$("#17").N(c.1i)}b.2k();$("#s").4("X","2l");$("#p").q("L").T(9.f.g.1r);$("#p").q("L").B();$("#s").q("G").B(15);$(".1d").4("o","z");h($.R(9.f.g.1s)!=""){$("#1t").2p("<1u>"+9.f.g.1s+"</1u>");$("#1t").4("o","O")}}5 1Y(){h($("#p").N()!=\'-1\'){$("#2s").16("2t","2u.K?1r="+$("#p").N());h($.x.W&&$.x.Q=="6.0"){$("#P").4("o","O");$("#1b").4("o","z")}w{$("#P").q("1n").2v();$(".k-9").4({"-2w-2x":""})}}}5 1f(){$.1w({1x:"1y",1z:"g.K/2B",q:"{\'1A\': \'"+9.f.g.1B+"\',"+"\'2E\': \'"+9.f.g.18+"\'}",1C:"2b/U; 1F=1G-8",1H:"U",1I:5(a){r b=1J.1K(a.d[0]);r c=1J.1K(a.d[1]);1L(r i=0;i<c.1N;i++){c[i].1O=1P.A(C(c[i].1O),"S/ ");c[i].1Q=1P.A(C(c[i].1Q).D(2),"S/ ");c[i].1R=F.A(C(c[i].1R).D(2),"S/ ");c[i].1S=F.A(C(c[i].1S).D(2),"S/ ")}$("#2Y").2Z({1j:{q:c,30:10},31:E,32:E,33:b,1a:1T})},1U:5(a,b,c){1V(a,b,c)}})}5 1T(){r t=$(u.38).l("3a");1L(r i=0;i<u.14.1N;i++){$($(t[i]).l("m")[1]).4("21-22","23");$($(t[i]).l("m")[3]).4("21-22","23");h(9.f.g.19==\'24\'){$($(t[i]).l("m")[1]).j(\'24\');$($(t[i]).l("m")[1]).4("v","1e");M()}w h(9.f.g.19==\'3k 3l\'){$(t[i]).4("J","#27");$($(t[i]).l("m")[1]).4("v","1e");$($(t[i]).l("m")[12]).j("");M()}w h(9.f.g.18==\'3n\'){$($(t[i]).l("m")[1]).j(\'28\');$($(t[i]).l("m")[1]).4("v","29");M()}w{h(u.14[i].2aón!="V 3s"){h(u.14[i].2aón=="V 3t"){$($(t[i]).l("m")[1]).4("v","3u")}w{$(t[i]).4("J","#27");$($(t[i]).l("m")[1]).4("v","1e");$($(t[i]).l("m")[13]).j("")}}w{h(u.14[i].V=="3v V"){$($(t[i]).l("m")[1]).j(\'28\');M()}$($(t[i]).l("m")[1]).4("v","29")}}}$($(".k-3w")[3]).3x("3y <3z> 3Aón")}5 1X(){$.1w({1x:"1y",1z:"3B.K/3C",q:"{\'1A\': \'"+9.f.g.1B+"\',"+"\'3D\': \'"+$("#p").q("L").T()+"\',"+"\'3E\': \'"+$("#17").N()+"\'}",1C:"2b/U; 1F=1G-8",1H:"U",1I:5(a){3F("3G 3H 3I y 1m 3J")},1U:5(a,b,c){1V(a,b,c)}})}5 M(){$("#p").q("L").B();$("#s").q("G").B(15);$(".1d").4("o","z");$(".2H").4("o","z")}',62,233,'||||css|function||||window||||||parent|Pedido|if||text||find|td||display|ddlFinanciamiento|data|var|ddlLugar||this|color|else|browser||none|newo|readonly|parseFloat|toFixed|false|formatNumberDecimal|kendoAutoComplete|left|click|background|aspx|kendoDropDownList|fnOcultarFunciones|val|block|pnlDscFinanciamiento|version|trim||value|json|Equipo|msie|width|volver|top||offset|||_data|true|attr|hdfIdOficina|Situacion|DscEstado|dataBound|global|hover|guardar|red|fnObtenerDetallePedido|search|change|IdOficina|dataSource|MontoTotalNoServicios|MostrarFinanciamientoFlo|financiamiento|kendoWindow|MontoTotalServicios|DireccionOficina|live|IdTipoFinanciamiento|Observacion|dvObservacion|div|cursor|ajax|type|POST|url|prIdPedido|IdPedido|contentType|MostrarIngreseLuFlo|lblDireccion|charset|utf|dataType|success|JSON|parse|for|E2F0F6|length|Precio_Equipo|formatNumber|Precio_Plan|Cuota_Mensual_Equipo|Total_Mensual|onLoadSubGrillaPedido|error|MostrarErrorAjax|dataItem|fnRegistrarLugarFinanciamiento|fnMostrarDscFinancimiento|href||font|weight|bolder|Cancelado|MostrarPedido|location|F9E4E0|Enviado|green|Estado_Adquisici|application|lblTotalMensual|Oficina|Close|undefined|select|ul|children|eq|close|382px|modal|show|resizable|append|eliFinan|draggable|frmDscFinanciamiento|src|Detalle_Financiamiento|open|webkit|transform|input|keypress|Pedidos|getDetallePedidoByPedidoMostrar|which|float|prTipo|return|button|esBaja|animation|45|imgVerDetalleFinanciamiento|dataTextField|NombreOficina|PedidoIE|fadeIn|300|imprimir|print|EsSimulacion|simu|lblCodigoPedido|LugarEntrega|CodigoPedido|lblFechaRegistroPedido|grdSubdetalle|kendoGrid|pageSize|scrollable|sortable|columns|FechaPedido|lblCampana|DscCampana|skyblue|tbody|NombreOperador|tr|lblSituacion|removeClass|lblEstado|pointer|lblPrecioEquipos|800px|height|600px|title|No|Adquirido|Descripci|Baja|default|lblPreciosPlanes|dvTituloDetFinanc|actions|adquirido|reservado|blue|Sin|header|html|Estado|br|Adquisici|DetallePedido|RegistrarFinanciamientoLugarEntrega|pdIdFinanciamiento|prIdOficina|alerta|Registro|de|lugar|exitoso|lblOperador'.split('|'),0,{}))
    </script>--%>
    <link rel="stylesheet" type="text/css" href="imprimirDetalle.css" media="print" />

    <link href="../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../Common/Scripts/select2/select2.min.js"></script>
    <style type="text/css">

        body {
            margin: 0px;
            padding: 0px;
            font: 12px "Trebuchet MS", Verdana, Helvetica, sans-serif;
        }

        #imgVerDetalleFinanciamiento:hover {
            cursor: pointer;
        }


        .ColorFondo {
            background: rgb(240,240,240);
            background: rgba(240,240,240,.5);
            border-radius: 5px;
        }

        .General {
            width: 800px;
        }

        .GeneralPanel {
            width: 700px;
            margin: auto;
        }

        .Titulo {
            font-family: Trebuchet MS, Arial, Helvetica, sans-serif;
            margin: auto;
            font-size: 14pt;
            text-align: center;
            padding: 1px 2px;
        }

        .colorNegrita {
            color: #003F59;
            font-weight: bold;
        }

        .imprimir:hover {
            cursor: pointer;
        }

        .k-button {
            background: #E2F0F6 !important;
            color: #676767 !important;
        }

            .k-button:hover {
                background: #005c83 !important;
                color: #FFFFFF !important;
            }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdOficina" runat="server" />
        <div id="MostrarIngreseLuFlo" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;">Digite lugar de recojo
            <br />
            de su pedido</div>
        <div id="MostrarFinanciamientoFlo" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999998; display: none; color: White;">Seleccione el tipo de financiamiento
            <br />
            y descripción del mismo</div>
        <div id="global" class="General" style="display: none;">
            <div class="GeneralPanel Titulo ColorFondo colorNegrita" style="margin-top: 10px; color: #447184">Detalle de pedido</div>
            <div class="GeneralPanel ColorFondo sello">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 5px 0px 15px 15px;">
                    <tr height="10px">
                        <td colspan="8"></td>
                    </tr>
                    <tr>
                        <td align="left" class="colorNegrita">
                            <b>Nombre :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td colspan="4" style="vertical-align: bottom;">
                            <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" class="colorNegrita">
                            <b>Área :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td align="left" class="colorNegrita">
                            <b>Centro de Costo :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
                        </td>
                    </tr>
                    <tr height="2px" style="background-color: #447184;">
                        <td colspan="8"></td>
                    </tr>
                    <tr height="10px">
                        <td colspan="8"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Código de pedido :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblCodigoPedido" runat="server" Text="(Desconocido)"></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Fecha de registro :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblFechaRegistroPedido" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Campaña :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblCampana" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Operador :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblOperador" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <%--<b>Situación :</b>--%>
                            <b>Tipo de pedido :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblSituacion" runat="server" Text=""></asp:Label>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Estado :</b><asp:Label ID="lblEstado" runat="server" Text="" Style="color: black; margin-left: 5px;"></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Total Mensual Equipos :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblPrecioEquipos" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Total Mensual Servicios(Planes) :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblPreciosPlanes" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Total Mensual :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:Label ID="lblTotalMensual" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr height="8px" class="esBaja">
                        <td colspan="6"></td>
                    </tr>
                    <tr class="esBaja">
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Financiamiento :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td style="vertical-align: bottom;">
                            <asp:DropDownList ID="ddlFinanciamiento" runat="server">
                            </asp:DropDownList>
                            <img id="imgVerDetalleFinanciamiento" src="../Common/Images/view.png" />
                        </td>
                    </tr>
                    <tr height="4px" class="esBaja">
                        <td colspan="6"></td>
                    </tr>
                    <tr class="esBaja">
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <%--<b>Lugar de recojo :</b>--%>
                            <b>Lugar de entrega :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td colspan="5" style="vertical-align: bottom;">
                            <input id="ddlLugar" type="text" style="width: 400px;" />

                        </td>
                    </tr>
                    <tr height="8px" class="esBaja">
                        <td colspan="6"></td>
                    </tr>
                    <tr class="esBaja">
                        <td align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Dirección :</b>
                        </td>
                        <td>&nbsp;
                        </td>
                        <td colspan="5" style="vertical-align: bottom;">
                            <asp:Label ID="lblDireccion" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr height="8px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <div id="dvObservacion" style="width: 100%; display: none;" class="k-block k-error-colored">
                                <div style="width: 100%; margin-bottom: 5px; border-bottom: 1px solid white; text-align: left;"><span class="k-icon k-i-note" style="margin-right: 5px; float: right;"></span>Observación:</div>
                            </div>
                        </td>
                    </tr>
                    <tr height="8px">
                        <td colspan="6"></td>
                    </tr>
                    <tr>
                        <td colspan="6" align="left" style="color: #003F59; vertical-align: bottom;">
                            <b>Detalle, estado y situación de equipos :</b>
                        </td>
                    </tr>
                </table>
                <div id="pnlBotones2" class="GeneralPanel" style="margin-bottom: 5px; width: 100%;">
                    <div id="btnGuardar2" class="menuGridPedido k-button esBaja guardar">
                        Guardar
                    </div>
                    <div id="btnCancelar2" class="k-button volver">
                        Volver
                    </div>

                    <div id="btnImprimirCompraPedido2" class="btnNormal imprimir" style="float: right; margin-right: 10px;">
                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/imprimir.png" />
                    </div>
                </div>
                <div id="grdSubdetalle">
                </div>

                <div id="pnlBotones" class="GeneralPanel" style="margin-top: 15px; width: 100%; display: none;">
                    <div id="btnGuardar" class="menuGridPedido k-button esBaja guardar">
                        Guardar
                    </div>
                    <div id="btnCancelar" class="k-button volver">
                        Volver
                    </div>

                    <div id="btnImprimirCompraPedido" class="btnNormal imprimir" style="float: right; margin-right: 10px;">
                        <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/imprimir.png" />
                    </div>
                </div>
               
            </div>
        </div>

        <%--<div id="pnlDscFinanciamiento" style="width:795px; height:500px; border:1px solid #1A536A; display:none;">--%>
        <div id="pnlDscFinanciamiento" style="display: none;">
            <div id="dvTituloDetFinanc" style="display: none; text-align: center; border-bottom: 1px solid #1A536A; font-size: large; background: #DEEBEF; color: #1A536A;">
                Detalle de financiamiento
                <div id="eliFinan" style="width: 20px; height: 20px; float: right; margin-top: -20px;">
                    <img alt="" src="../Common/Images/eliele.png" /></div>
            </div>
            <iframe id="frmDscFinanciamiento" frameborder="0" style="padding: 0px; margin: 0px;" src="" height="100%" width="100%"></iframe>
        </div>
        <script src="<%=UtilitarioGeneral.ObtieneVersionArchivoEstatico("DetallePedido.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
