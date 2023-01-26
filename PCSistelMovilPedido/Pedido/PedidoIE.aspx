<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Pedido.aspx.vb" Inherits="WebSiteCliente.Pedido" %>

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
    <link href="PedidoIE.css" rel="stylesheet" type="text/css" />
    <%--<script type="text/javascript" src="PedidoIE.js"></script>--%>
    <script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h 3U;h 1E;$(4(){5(3.7.4P!=$("#4G").1D()){3.G.D=\'../4E.r\';B}1E=3.7.3W;2x();2w();2u()});4 2w(){2t();$("#3N").1z("j","3M");2s()}4 2x(){$("#3B").Z(4(){3.7.1F=V;3.7.1I=V;3.7.2r=V;3.7.1o=V;3.7.2q=V;3.G.D="1W.r"});$("#1Y").Z(4(){2n()});$("#2l").Z(4(){2k()});$("#3n").Z(4(){2j()});$("#2i").Z(4(){$("#3k").1z("1u","2h");$("#3f").1z("1u","3c");$("#2i").1z("1u","2h")})}4 2t(){$.16({1k:"1j",17:"M.r/35",O:"{\'2d\': \'"+$("#2c").1D()+"\',"+"\'2b\': \'"+3.7.1h.1x+"\'}",1e:"1d/K; 19=1b-8",1g:"K",11:4(a){U=a.d;2a(h i=0;i<U.28;i++){U[i].27=(U[i].26+U[i].1C)}h b=13;5(1E=="1"){b=z}$("#1a").1y({4U:{O:U,4H:10},4F:13,4B:13,4z:"4y",3T:{3R:13,3Q:13,3A:{3z:"í22 20 pá2P",1u:"{0}-{1} 18 {2} í22",4u:""}},3D:2p,3r:[{m:"u",j:"A",l:"u",v:z},{m:"1x",j:"A",l:"1x",v:z},{m:"3b",j:"A",l:"3sña",v:z},{m:"T",j:"1U",l:"3w",v:13,X:{q:"o-w:H; s-1K:1J;s-C:J;"},W:{q:"o-w: H;s-C:J;"}},{m:"1B",j:"A",l:"1B",v:z},{m:"2R",j:"2U",l:"2X M",X:{q:"s-C:J;"}},{m:"2Z",j:"31",l:"32",1v:"{0: 3d-3i-3j 3l:3m}",X:{q:"o-w:H; s-1K:1J;s-C:J;"},W:{q:"o-w: H;s-C:J;"}},{m:"3o",j:"A",l:"3p",v:z},{m:"21",j:"3u",l:"21",v:z},{m:"N",j:"1U",l:"3x",X:{q:"o-w:H; s-1K:1J;s-C:J;"},W:{q:"o-w: H;s-C:J;"}},{m:"1X",j:"A",l:"1X",v:z},{m:"1o",j:"A",l:"1o",v:z},{m:"1r",j:"A",l:"1r",v:z},{m:"23",j:"A",l:"23",v:z},{m:"3O",j:"A",l:"3Pón",v:z},{m:"26",j:"1U",l:"S/ 3S",X:{q:"o-w:1S;"},1v:"{0:#,#.1Q}",W:{q:"o-w: H;s-C:J;"}},{m:"1C",j:"A",l:"S/ 3V",X:{q:"o-w:1S;"},1v:"{0:#,#.1Q}",W:{q:"o-w: H;s-C:J;"}},{m:"27",j:"A",l:"S/ 3X 3Z",X:{q:"o-w:1S;"},1v:"{0:#,#.1Q}",W:{q:"o-w: H;s-C:J;"}},{4l:{o:"4s",Z:24},l:" ",j:"4v",W:{q:"o-w: H;s-C:4w;"},v:b}]})},15:4(a,b,c){1c(a,b,c)}})}4 2j(e){h a=$("#1a").O("1y");h b=a.1N();5(b[0]==V){R("25 1L E");B}h c=a.1A(b);3.7.M=c;3.G.D="2Q.r"}4 24(e){h d=x.1A($(e.2S).2T("29"));$.16({1k:"1j",17:"2V.r/2W",O:"{\'1t\': \'"+d.u+"\'}",1e:"1d/K; 19=1b-8",1g:"K",11:4(b){5($.2Y(b.d)==""){14("30 E 1i 1M 33 34.")}Q{$.16({17:36(b.d),11:4(a){3.G.D="../37/38/39.3a?2e="+b.d},15:4(a){14(\'1V 2f 3eó 1T 2e a 3g.\')}})}},15:4(a,b,c){1c(a,b,c)}})}4 2p(){5(3.7.3h){$(x.2g).I(".k-1O").P("1H")}Q{h t=$(x.2g).I("29");2a(h i=0;i<x.F.28;i++){5(((x.F[i].T=="3q"||x.F[i].T=="2món")&&(x.F[i].1B=="Lí2O"||x.F[i].1B=="3t"))||x.F[i].T=="1l"||3v(x.F[i].1C)==0){$($(t[i]).I(".k-1O")[0]).P("1H")}Q{5(x.F[i].N!="2o"&&x.F[i].N!="1m"){$($(t[i]).I(".k-1O")[0]).P("1H")}}3y(x.F[i].N){1n"1m":$($(t[i]).I("1q")[9]).P("3C");12;1n"1m 3E":$($(t[i]).I("1q")[9]).P("3F");12;1n"1V 3G":$($(t[i]).I("1q")[9]).P("3H");12;1n"3I":$($(t[i]).I("1q")[9]).P("3J");12;1n"2o":$($(t[i]).I("1q")[9]).P("3K");12;3L:12}}}}4 2n(){h e=$("#1a").O("1y");h f=e.1N();5(f[0]==V){14("25 1L E");B}h g=e.1A(f);5(g==Y||(g.N!="1m"&&g.N!="1R")){R("Só2v 1f 1w U 2y y 2z");B}5(g==Y||g.T=="1l"){R("1G 1i 1f 2A E 18 1l");B}5(g.1r){5(!g.1r){R("1G a 3Y 2B 40 41 42 2B 43 44 1w 45 E");B}}Q{R("1V 2f 1f 1w E 20 46 47 48 49 4a 18 4bña");B}4c("4d 4eá a 1w 1T E<4f>¿4g 4h 4i 1T 4j?","2A M",4(a){5(a=="4k"){h d=g.u;$.16({1k:"1j",17:"M.r/2C",O:"{\'1t\': \'"+d+"\',"+"\'2b\': \'"+3.7.1h.1x+"\',"+"\'2d\': \'"+$("#2c").1D()+"\'}",1e:"1d/K; 19=1b-8",1g:"K",11:4(a){5(a.d){14("4m E a 4n 4o");3.G.D="4p.r"}Q{3.G.D="../4q.r"}},15:4(a,b,c){1c(a,b,c)}})}})}4 2k(){h d=$("#1a").O("1y");h e=d.1N();5(e[0]==V){14("4r 1L E");B}h f=d.1A(e);5(f==Y||(f.N!="1m"&&f.N!="1R")){R("Só2v 1f 2D U 2y y 2z");B}5(f.N=="1R"){3.7.4t=z}3.7.1o=f.1o;5(f==Y||f.T=="2món"){$.16({1k:"1j",17:"M.r/2E",O:"{\'1t\': \'"+f.u+"\'}",1e:"1d/K; 19=1b-8",1g:"K",11:4(a){5(a.d){3.7.1F=a.d.2F;3.7.1I=a.d.2G;3.7.2r="4x";3.7.2H=a.d.2I;3.7.2q=a.d.4A;5($.2J.4C&&$.2J.4D=="6.0")1s.G.D="1W.r?2K=1&2L=1&u="+f.u.1p();Q 1s.G.D="M.r?2K=1&2L=1&u="+f.u.1p()}Q{R("M 1i 1M nú2M 18 4Ión")}},15:4(a,b,c){1c(a,b,c)}});B}5(f==Y||f.T=="1l"){14("1G 1i 1f 2D E 18 1l");B}5(f==Y||f.T=="4J"){$.16({1k:"1j",17:"M.r/2E",O:"{\'1t\': \'"+f.u+"\'}",1e:"1d/K; 19=1b-8",1g:"K",11:4(a){5(a.d){3.7.1F=a.d.2F;3.7.1I=a.d.2G;3.7.2H=a.d.2I;1s.G.D="4K.r?u="+f.u.1p()}Q{R("M 1i 1M nú2M")}},15:4(a,b,c){1c(a,b,c)}});B}h g=f.u;1s.G.D="1W.r?u="+g.1p()+"&4L="+f.1X.1p()}4 4M(){h a=$("#1a");h b=a.I(".k-4N-4O");h c=$(3).1P()-4Q;h d=a.2N()-b.2N();a.1P(c);b.1P(c-d)}4 2u(){$($("#4R > 4S")[0]).o(3.7.1h.4T)}4 2s(){5(!3.7.1h.2C){$("#1Y").1Z()}5(!3.7.1h.4V){$("#2l").1Z()}}',62,306,'|||window|function|if||parent||||||||||var||width||title|field||text||style|aspx|font||IdPedido|hidden|align|this||true|50px|return|size|href|pedido|_data|location|center|find|11px|json||Pedido|DscEstado|data|addClass|else|alerta||Situacion|pedidos|undefined|headerAttributes|attributes|null|click||success|break|false|alert|error|ajax|url|de|charset|grdPedidos|utf|MostrarErrorAjax|application|contentType|puede|dataType|CampanaConf|no|POST|type|Baja|Enviado|case|IdTipoFinanciamiento|toString|td|PermiteCancelarFinCam|document|prIdPedido|display|format|cancelar|IdCampana|kendoGrid|css|dataItem|TipoRenovacion|MontoTotalServicios|val|idTipoContrato|NumeroRenovar|Usted|noContrato|IdPlanNumeroRenovar|bolder|weight|un|tiene|select|button|height|00|Reservado|right|el|55px|No|CarritoIE|IdOficina|btnEliminarPedido|hide|por|IdEstado|tems|PermiteCancelardiasMax|fnEditar|Seleccione|MontoTotalNoServicios|MontoTotal|length|tr|for|prIdCampana|hdfEmpleado|prIdEmpleado|archivo|se|tbody|none|btnVolverPedido|fnGetDetalle|editarPedido|btnEditarPedido|Renovaci|cancelarPedido|Procesado|loadgrillaPedidos|miIdTipoModeloDispositivo|FlagMantenerPlan|fnActivarConfiguracionCampana|obtenerPedidos|obtenerCampanaActiva|lo|load|enlacesIniciales|enviados|reservados|Cancelar|los|CancelarPedido|editar|obtenerNumero_porIdpedido|Numero|IdPlan|PrecioPlanNumeroRenovar|PrecioPlan|browser|irCarrito|esConEquipo|mero|innerHeight|nea|gina|DetallePedido|CodigoPedido|currentTarget|closest|65px|Dashboard_pedido|getContrato|Nro|trim|FechaPedido|Este|70px|Fecha|contrato|generado|obtenerPedidoEmpleado|raiz|Common|Controladores|DescargarArchivo|ashx|DscCampana|block|yyyy|encontr|pGrillaPedido|descargar|esPreVentaActiva|MM|dd|pDetalleGrilla|HH|mm|btnDetalles|FechaRecojo|Recojo|Renovacion|columns|Campa|Linea|35px|parseInt|Tipo|Estado|switch|itemsPerPage|messages|btnNuevoPedido|estadoEnviado|dataBound|Parcial|estadoEnviadoParcial|Adquirido|estadoNoAdquirido|Cancelado|estadoCancelado|estadoProcesado|default|200px|dvMsgAlerta|DireccionCompleta|Direcci|pageSizes|refresh|Producto|pageable|acddataGlobal|Servicio|inTipoContrato|Monto|superado|Total|dias|maximos|en|que|podia|su|estar|muy|proximo|al|cierre|campa|confirma|Se|proceder|br|Desea|continuar|con|proceso|Aceptar|command|Su|sido|cancelado|PedidoIE|FinSession|seleccione|Contrato|esConfirmacionPreventa|empty|40px|10px|False|row|selectable|IdTipoModeloDispositivo|sortable|msie|version|Login|scrollable|hfUsuario|pageSize|renovaci|RenovacionPlan|PedidoPlanIE|LugarEntrega|resizeGrid|grid|content|UsuarioConectado|180|pTituloPedido|div|Descripcion|dataSource|ModificarPedido'.split('|'),0,{}))
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfEsDirecto" runat="server" />
    <asp:HiddenField ID="hdfEsConEquipo" runat="server" />
    <asp:HiddenField ID="hdfIdPedidoMirror" runat="server" />
    <asp:HiddenField ID="hdfIdPedidoEditar" runat="server" />
    <asp:HiddenField ID="hfUsuario"  runat="server" />
    <div style="display:none;">
        <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
        <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
        <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
        <p runat="server" id="pDscPreventa"></p>
    </div>

    <div id="Global" class="general">
        <div id="pnlPedidos" >
            <div id="pTituloPedido" class="pContenedor">
                <div style="width: 700px; margin: auto; font-weight: bold; font-size: 14pt; text-align: center;"
                    class="cGenInfo titulo">
                </div>
            </div>
            <div id="pBotonesPedido" class="pContenedor" runat="server">
                <%--<div id="btnNuevoPedido" class="menuGridPedido k-button">
                    Nuevo
                </div>--%>
                <div id="btnEditarPedido" class="menuGridPedido k-button">
                    Editar
                </div>
                <div id="btnEliminarPedido" class="menuGridPedido k-button">
                    Eliminar
                </div>
                <div id="btnDetalles" class="menuGridPedido k-button">
                    Detalles
                </div>

                <div id="btnVolverPedido" class="menuGridPedido k-button" style="float:right; display:none;">
                    Volver a pedidos
                </div>

                <div id="dvLugarEntrega" runat="server" style="padding-bottom: 10px; display:none;">
                    Lugar de entrega:&nbsp;&nbsp;<asp:DropDownList runat="server" ID="ddlLugarEntregaPedido"></asp:DropDownList>
                    <br /><br />
                    <asp:Label ID="lblDireccionCompleta" runat="server" style="color: #003F59;font-weight: bold;width: 8px;"/>
                </div>
            </div>
            <div id="pGrillaPedido" class="pContenedor">
                <div id="grdPedidos">
                </div>
            </div>
            <div id="pDetalleGrilla" class="pContenedor" style="display:none;">
                <table border="0" cellpadding="5" cellspacing="5" style="margin:10px;">
                    <tr>
                        <td>
                            Situacion:
                        </td>
                        <td>
                            <span id="tdSituacion"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Codigo de pedido:
                        </td>
                        <td>
                            <span id="tdCodigo"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Fecha:
                        </td>
                        <td>
                            <span id="tdFecha"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Estado:
                        </td>
                        <td>
                            <span id="tdEstado"></span>
                        </td>
                    </tr>
                </table>

                <div id="grdDetallePedido">
                </div>
            </div> 
        </div>
   
    </div>
    </form>
</body>
</html>
