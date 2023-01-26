<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Pedido.aspx.vb" Inherits="WebSiteCliente.Pedido" %>
<%@ Import Namespace="WebSiteCliente.UtilitarioPCSistel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>  
    <%--<script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 1i;9 3x;9 6D;9 2Q;9 2P;9 m;$(5(){4(7.g.6x!=$("#6w").2L()){7.15.19=\'../6v.K\';A}2P=7.g.6s;2K();3F();3K();3O();3P()});5 3K(){3Q();$(7).6r(5(){2K()})}5 3F(){$("#3S").1w(5(){7.g.2J=1I;7.g.2B=1I;7.g.3n=1I;7.g.1K=1I;7.g.3v=1I;7.15.19="O.K"});$("#6q").6p({o:"6n",r:"6l 11 6j",6i:["6h"],6g:x});$("#4e").1w(5(){4f()});$("#6f").1w(5(){3c()});$("#3h").1w(5(){3l()});$("#2o").1w(5(){$("#3p").h("E","14");$("#3y").h("E","1F");$("#2o").h("E","14")});4(!$.2m.3G){$("#3H").o($("#3H").o()-50)}}5 3Q(){9 d=[];1b(9 i=0;i<7.g.2j.D;i++){d.6e(7.g.2j[i].G)}9 e={45:$("#4a").2L(),4b:d.6d(",")};$.1n({1h:"1r",1u:"O.K/6c",M:1M.66(e),1p:"1o/N; 1l=1m-8",1s:"N",1t:5(a){m=a.d;1b(9 i=0;i<m.D;i++){m[i].3N=1O.1a(1q(m[i].2G).1B(2),"S/ ");m[i].3W=1O.1a(1q(m[i].3Y).1B(2),"S/ ");m[i].3Z=1O.1a((1q(m[i].2G)+1q(m[i].3Y)).1B(2),"S/ ")}9 b=Y;4(2P=="1"){b=x}$("#48").2b({2a:{M:m,2O:8},65:Y,2I:Y,61:x,2X:{2Y:x,30:[8],33:{39:"m 2x pá3d",E:"{0}-{1} 11 {2} m",3g:""}},2h:2h,3j:3k,28:[{3m:\'<60 1h="1H" 3s="1x" 1d="5Z-#=z#" />\',r:"",o:"5X"},{C:"z",o:"Q",r:"z",V:x},{C:"G",o:"Q",r:"G",V:x},{C:"3I",o:"Q",r:"3Jña",V:x},{C:"W",o:"3L",r:"5W",V:Y,1f:{B:"j-H:R; F-1T:22;F-U:P;"},16:{B:"j-H: R;F-U:P;"}},{C:"1J",o:"Q",r:"1J",V:x},{3m:\'<5T 1d="#:M.5S#-#:M.46#" 3s="47" 5R="../49/5Q/5P#:M.46#.5O" B="o: 4d;1U: 4d;5I: 1R;">\',o:"5H",r:"",16:{B:"j-H: R;F-U:P;"}},{C:"2U",o:"3L",r:"5E O",1f:{B:"F-U:P;"},16:{B:"j-H: R;F-U:P;"}},{C:"2W",o:"Q",r:"5A",5z:"{0: 5w-5v-4g 5t:5r}",1f:{B:"F-U:P;j-H:R;"},16:{B:"j-H: R;F-U:P;"}},{C:"5o",o:"Q",r:"5n",V:x},{C:"37",o:"5j",r:"37",V:x},{C:"T",o:"5i",r:"5h 5f",1f:{B:"j-H:R; F-1T:22;F-U:P;"},16:{B:"j-H: R;F-U:P;"}},{C:"1N",o:"Q",r:"1N",V:x},{C:"1K",o:"Q",r:"1K",V:x},{C:"1Y",o:"Q",r:"1Y",V:x},{C:"3e",o:"Q",r:"3e",V:x},{C:"5d",o:"Q",r:"5cón",V:x},{C:"3W",o:"3i",r:"5b<1S>1G",1f:{B:"j-H:2d;"},16:{B:"j-H: R;F-U:P;"}},{C:"3N",o:"Q",r:"5a<1S>59",1f:{B:"j-H:2d;"},16:{B:"j-H: R;F-U:P;"}},{C:"3Z",o:"Q",r:"56<1S>55",1f:{B:"j-H:2d;"},16:{B:"j-H: R;F-U:P;"}},{54:{j:"4K",1w:2S},r:"4I",o:"3i",1f:{B:"j-H:R;"},16:{B:"j-H: R;F-U:P;"},V:b}]});4(7.g.2i){v("3w 1c a 4H 4G");7.g.2i=Y}4(7.g.3A){v("3w 1c 4F 4E 3C 3D, 4D 4C 1A 2p 4B 4A 4z");7.g.3A=Y}},1j:5(a,b,c){1k(a,b,c)}})}5 4y(e){1i=q.4x($(e.4w).4v("2A"));$.1n({1h:"1r",1u:"O.K/3U",M:"{\'1E\': \'"+1i.z+"\'}",1p:"1o/N; 1l=1m-8",1s:"N",1t:5(a){9 b=1M.1Z(a.d[0]);9 c=1M.1Z(a.d[1]);$("#3y").h("E","14");$("#4q").j(1i.W);$("#4p").j(1i.2U);$("#4n").j(1i.2W);$("#4k").j(1i.3I);$("#4i").2b({2a:{M:c,2O:10},43:Y,2I:Y,28:b,2X:{2Y:x,30:x,33:{39:"í44 2x pá3d",E:"{0}-{1} 11 {2} í44",3g:""}}});$("#3p").h("E","1F");$("#2o").h("E","1F")},1j:5(a,b,c){1k(a,b,c)}})}5 2S(e){9 d=$(".1x:1H:23");4(d.D==0){v("24 1e 1g");A}w 4(d.D!=1){v("25 26 27 1e 1g");A}9 f=$(d[0]).1D("1d").1y("-")[1];$.1n({1h:"1r",1u:"4h.K/5u",M:"{\'1E\': \'"+f+"\'}",1p:"1o/N; 1l=1m-8",1s:"N",1t:5(a){4($.41(a.d)==""){v("4j 1c 1A 2F 4l 4m.")}w 4($.41(a.d)=="-1"){v(\'21 2p 4oó 2D 3X a 4r.\')}w{7.15.19="../49/4s/4t.4u?3X="+a.d}},1j:5(a,b,c){1k(a,b,c)}})}5 4f(){9 e=$(".1x:1H:23");4(e.D==0){v("24 1e 1g");A}w 4(e.D!=1){v("25 26 27 1e 1g");A}9 f;1b(9 i=0;i<m.D;i++){4(m[i].z==$(e[0]).1D("1d").1y("-")[1]){f=m[i];18}}4(f==1C||(f.T!="17"&&f.T!="2v"&&f.T!="17 1W")){v("Só2q 1z 1V m 3E y 3B");A}4(f==1C||f.W=="1v"){v("2l 1A 1z 3t 1c 11 1v");A}4(f.1Y){4(!f.1Y){v("2l a 4J 3r 4L 4M 3C 3r 4N 4O 1V 4P 1c");A}}w{v("21 2p 1z 1V 1c 2x 4Q 4R 4S 4T 4U 11 4Vña");A}4W("4X 4Yá a 1V 2D 1c<1S>¿4Z 51 52 2D 3D?","3t O",5(a){4(a=="53"){9 d=f.z;$.1n({1h:"1r",1u:"O.K/3q",M:"{\'1E\': \'"+d+"\',"+"\'4b\': \'"+f.G.X()+"\',"+"\'45\': \'"+$("#4a").2L()+"\'}",1p:"1o/N; 1l=1m-8",1s:"N",1t:5(a){4(a.d){3o()}w{7.15.19="../57.K"}},1j:5(a,b,c){1k(a,b,c)}})}})}5 3c(){9 a=$(".1x:1H:23");4(a.D==0){v("24 1e 1g");A}w 4(a.D!=1){v("25 26 27 1e 1g");A}9 b;1b(9 i=0;i<m.D;i++){4(m[i].z==$(a[0]).1D("1d").1y("-")[1]){b=m[i];18}}7.g.O=b;7.15.19="58.K?G="+b.G}5 3l(){9 d=$(".1x:1H:23");4(d.D==0){v("24 1e 1g");A}w 4(d.D!=1){v("25 26 27 1e 1g");A}9 e;1b(9 i=0;i<m.D;i++){4(m[i].z==$(d[0]).1D("1d").1y("-")[1]){e=m[i];18}}4(e==1C||(e.T!="17"&&e.T!="2v"&&e.T!="17 1W")){v("Só2q 1z 2f m 3E y 3B");A}4(e.W=="2eón"&&e.1J=="Lí29"){v("21 1z 2f m 11 só2q 3fón 11 lí29");A}4(e.T=="2v"){7.g.5e=x}7.g.1K=e.1K;4(7.g.12.G!=e.G){7.g.12.G=e.G}4(e==1C||e.W=="2eón"||e.W=="5g"){$.1n({1h:"1r",1u:"O.K/3b",M:"{\'1E\': \'"+e.z+"\'}",1p:"1o/N; 1l=1m-8",1s:"N",1t:5(a){4(a.d){7.g.2J=a.d.3a;7.g.2B=a.d.38;7.g.3n=a.d.5k?"5l":"5m";7.g.35=a.d.34;7.g.3v=a.d.5p;4($.2m.3G&&$.2m.5q=="6.0")1Q.15.19="5s.K?32=1&31=1&z="+e.z.X()+"&2H="+e.1N.X();w 1Q.15.19="O.K?32=1&31=1&z="+e.z.X()+"&2H="+e.1N.X()+"&G="+7.g.12.G.X()}w{v("O 1A 2F nú2Z 11 3fón")}},1j:5(a,b,c){1k(a,b,c)}});A}4(e==1C||e.W=="1v"){v("2l 1A 1z 2f 1c 11 1v");A}4(e==1C||e.W=="5x"){$.1n({1h:"1r",1u:"O.K/3b",M:"{\'1E\': \'"+e.z+"\'}",1p:"1o/N; 1l=1m-8",1s:"N",1t:5(a){4(a.d){7.g.2J=a.d.3a;7.g.2B=a.d.38;7.g.35=a.d.34;1Q.15.19="5y.K?z="+e.z.X()+"&G="+7.g.12.G.X()}w{v("O 1A 2F nú2Z")}},1j:5(a,b,c){1k(a,b,c)}});A}9 f=e.z;1Q.15.19="O.K?z="+f.X()+"&2H="+e.1N.X()+"&G="+7.g.12.G.X()}5 2K(){9 a=$("#48");9 b=a.u(".k-5B-5C");9 c=$(7).1U()-5D;9 d=a.2V()-b.2V();a.1U(c);b.1U(c-d);3x=5F.5G(c/36)}5 3O(){4(7.g.2j.D==1){$($("#2T > 2z")[0]).j(7.g.12.5J)}w{$($("#2T > 2z")[0]).j("5K 11 3Jñ5L 5M")}}5 3k(){4(7.g.5N){$(q.2r).u(".k-2n").h({"1P":"2c","E":"14"})}w{9 t=$(q.2r).u("2A");1b(9 i=0;i<q.J.D;i++){4(((q.J[i].W=="5U"||q.J[i].W=="2eón")&&(q.J[i].1J=="Lí29"||q.J[i].1J=="5V"))||q.J[i].W=="1v"||3M(q.J[i].2G)==0){$($(t[i]).u(".k-2n")[0]).h({"1P":"2c","E":"14"})}w{4(q.J[i].T!="2C"&&q.J[i].T!="17"&&q.J[i].T!="2C 1W"){$($(t[i]).u(".k-2n")[0]).h({"1P":"2c","E":"14"})}}5Y(q.J[i].T){1L"17":$($(t[i]).u("I")[10]).h({"Z":"#62"});18;1L"17 1W":$($(t[i]).u("I")[10]).h({"Z":"#63"});18;1L"21 64":$($(t[i]).u("I")[10]).h({"Z":"2M"});18;1L"2N":$($(t[i]).u("I")[10]).h({"Z":"67"});18;1L"2C":$($(t[i]).u("I")[10]).h({"Z":"68"});18;69:18}}}$(".k-6a-6b").2g(5(){$(q).2R(5(e){$("#3V").h({"1R":e.2k+20,"2s":e.2t,"E":"1F"})})},5(){$("#3V").h("E","14")});$(".1x").2g(5(){$(q).2R(5(e){$("#3T").h({"1R":e.2k+20,"2s":e.2t,"E":"1F"})})},5(){$("#3T").h("E","14")});$(".47").2g(5(){$(q).1D("1d").1y(\'-\')[1];$("#2u").6k($(q).1D("1d").1y(\'-\')[1]);$(q).2R(5(e){$("#2u").h({"1R":e.2k+20,"2s":e.2t,"E":"1F"})})},5(){$("#2u").h("E","14")})}5 2h(e){9 d=e.M;2Q=d.T;2w=d.W;$.1n({1h:"1r",1u:"O.K/3U",M:"{\'1E\': \'"+d.z+"\', "+"\'6m\': \'"+2w+"\'}",1p:"1o/N; 1l=1m-8",1s:"N",1t:5(a){9 b=1M.1Z(a.d[0]);9 c=1M.1Z(a.d[1]);1b(9 i=0;i<c.D;i++){4(c[i].1X==".6o"){c[i].1X=2y.1a(0,"S/ ")}w{c[i].1X=2y.1a(3M(c[i].1X),"S/ ")}c[i].3z=2y.1a(1q(c[i].3z).1B(2),"S/ ");c[i].3R=1O.1a(1q(c[i].3R).1B(2),"S/ ");c[i].3u=1O.1a(1q(c[i].3u).1B(2),"S/ ")}$("<2z/>").6t(e.6u).2b({2a:{M:c,2O:10},43:Y,2I:Y,28:b,3j:42})},1j:5(a,b,c){1k(a,b,c)}})}5 42(){9 t=$(q.2r).u("2A");1b(9 i=0;i<q.J.D;i++){$($(t[i]).u("I")[1]).h("F-1T","22");$($(t[i]).u("I")[3]).h("F-1T","22");4(2Q==\'2N\'){$($(t[i]).u("I")[1]).j(\'2N\');$($(t[i]).u("I")[1]).h("Z","2M")}w 4(2w==\'1v\'){$($(t[i]).u("I")[1]).j(\'17\');$($(t[i]).u("I")[1]).h("Z","4c")}w{4(q.J[i].40ón!="1G 6y"){4(q.J[i].40ón=="1G 6z"){$($(t[i]).u("I")[1]).h("Z","6A")}w{$(t[i]).h("1P","#6B");$($(t[i]).u("I")[1]).h("Z","2M");$($(t[i]).u("I")[13]).j("")}}w{4(q.J[i].1G=="6C 1G"){$($(t[i]).u("I")[1]).j(\'17\')}$($(t[i]).u("I")[1]).h("Z","4c")}}}}5 3P(){4(!7.g.12.3q){$("#4e").2E()}4(!7.g.12.6E){$("#3h").2E()}4(!7.g.12.6F){$("#3S").2E()}}5 3o(){7.g.2i=x;7.g.6G()}',62,415,'||||if|function||window||var|||||||parent|css||text|||pedidos||width||this|title|||find|alerta|else|true||IdPedido|return|style|field|length|display|font|IdCampana|align|td|_data|aspx||data|json|Pedido|11px|50px|center||DscEstado|size|hidden|Situacion|toString|false|color||de|CampanaConf||none|location|headerAttributes|Enviado|break|href|newo|for|pedido|id|un|attributes|registro|type|acddataGlobal|error|MostrarErrorAjax|charset|utf|ajax|application|contentType|parseFloat|POST|dataType|success|url|Baja|click|chkSel|split|puede|no|toFixed|null|attr|prIdPedido|block|Equipo|checkbox|undefined|TipoRenovacion|IdTipoFinanciamiento|case|JSON|IdOficina|formatNumberDecimal|background|document|left|br|weight|height|cancelar|Parcial|Precio_Equipo|PermiteCancelarFinCam|parse||No|bolder|checked|Seleccione|Debe|seleccionar|solo|columns|nea|dataSource|kendoGrid|white|right|Renovaci|editar|hover|detailInit|SeCanceloPedido|arCampanasActivas|pageX|Usted|browser|button|btnVolverPedido|se|lo|tbody|top|pageY|MostrarOperador|Reservado|situac|por|formatNumber|div|tr|IdPlanNumeroRenovar|Procesado|el|hide|tiene|MontoTotalServicios|LugarEntrega|sortable|NumeroRenovar|resizeGrid|val|red|Cancelado|pageSize|idTipoContrato|estad|mousemove|fnEditar|pTituloPedido|CodigoPedido|innerHeight|FechaPedido|pageable|refresh|mero|pageSizes|esConEquipo|irCarrito|messages|PrecioPlan|PrecioPlanNumeroRenovar||IdEstado|IdPlan|itemsPerPage|Numero|obtenerNumero_porIdpedido|cambiarLugarEntrega|gina|PermiteCancelardiasMax|renovaci|empty|btnEditarPedido|55px|dataBound|loadgrillaPedidos|editarPedido|template|FlagMantenerPlan|Refrescar|pDetalleGrilla|CancelarPedido|los|class|Cancelar|Total_Mensual|miIdTipoModeloDispositivo|Su|numFil|pGrillaPedido|Precio_Plan|SeProcesoPedido|reservados|en|proceso|enviados|enlacesIniciales|msie|miGroupBox|DscCampana|Campa|load|65px|parseInt|MontoTotalServiciosDsc|obtenerCampanaActiva|fnActivarConfiguracionCampana|obtenerPedidos|Cuota_Mensual_Equipo|btnNuevoPedido|SeleccionarPedido|getDetallePedidoByPedidoMostrar|MostrarDealleFlo|MontoTotalNoServiciosDsc|archivo|MontoTotalNoServicios|MontoTotalDsc|Estado_Adquisici|trim|onLoadSubGrillaPedido|scrollable|tems|prIdEmpleado|NombreOperador|hovOpe|grdPedidos|Common|hdfEmpleado|prIdCampana|green|18px|btnEliminarPedido|cancelarPedido|dd|Dashboard_pedido|grdDetallePedido|Este|tdEstado|contrato|generado|tdFecha|encontr|tdCodigo|tdSituacion|descargar|Controladores|DescargarArchivo|ashx|closest|currentTarget|dataItem|fnGetDetalle|realizar|podido|han|cambios|sus|estaba|ya|cancelado|sido|Documento|superado|Contrato|dias|maximos|que|podia|su|estar|muy|proximo|al|cierre|campa|confirma|Se|proceder|Desea||continuar|con|Aceptar|command|Mensual|Total|FinSession|DetallePedido|Plan|Precio|Cuota|Direcci|DireccionCompleta|esConfirmacionPreventa|Proceso|Portabilidad|Estado|60px|35px|FlagManteniePlan|True|False|Recojo|FechaRecojo|IdTipoModeloDispositivo|version|mm|CarritoIE|HH|getContrato|MM|yyyy|RenovacionPlan|PedidoPlan|format|Fecha|grid|content|200|Nro|Math|floor|20px|float|Descripcion|Pedidos|as|Activas|esPreVentaActiva|png|icono_|Images|src|IdOperador|img|Renovacion|Linea|Tipo|17px|switch|chk|input|navigatable|206b01|9F771B|Adquirido|groupable|stringify|darkred|darkblue|default|hierarchy|cell|obtenerPedidoEmpleado|join|push|btnCambiarLugar|modal|Close|actions|entrega|html|Lugar|prTipo|800px|00|kendoWindow|pnlBuscarLugarEntrega|resize|inTipoContrato|appendTo|detailCell|Login|hfUsuario|UsuarioConectado|adquirido|reservado|blue|F9E4E0|Sin|numselect|ModificarPedido|NuevoProducto|fnIrPedidos'.split('|'),0,{}))
    </script>--%>
    <link href="Pedido.css" rel="stylesheet" type="text/css" />
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
        <asp:HiddenField ID="hdfFecServidor" runat="server" />
        <asp:HiddenField ID="hfUsuario" runat="server" />
        <div id="MostrarDealleFlo" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;">Click para mostrar detalle</div>
        <div id="SeleccionarPedido" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;">Seleccionar pedido</div>
        <div id="MostrarOperador" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;"></div>
        <p runat="server" id="pDscPreventa" style="display: none !important;"></p>
        <div id="Global" class="general">
            <div id="generalPedido" class="general">
                <div id="pTituloPedido" class="pContenedor">
                    <div style="width: 700px; margin: auto; font-weight: bold; font-size: 14pt; text-align: center;"
                        class="cGenInfo titulo">
                    </div>
                </div>
                <div id="pBotonesPedido" class="pContenedor" runat="server">
                    <div id="miGroupBox" style="float: left; border: 1px solid #94c0d2; padding: 10px 5px 5px 2px; border-radius: 5px;">
                        <span style="float: left; margin-top: -20px; margin-left: 5px; background-color: White; font-weight: bold; color: #003f59">Acciones</span>
                        <div id="btnNuevoPedido" class="menuGridPedido k-button" style="display: none;">
                            Nuevo
                        </div>
                        <div id="btnEditarPedido" class="menuGridPedido k-button">
                            Editar
                        </div>
                        <div id="btnEliminarPedido" class="menuGridPedido k-button">
                            Eliminar
                        </div>
                        <div id="btnCambiarLugar" class="menuGridPedido k-button">
                            Detalle
                        </div>
                        <div id="dvLugarEntrega" runat="server" style="padding-bottom: 10px; display: none;">
                            Lugar de entrega:&nbsp;&nbsp;<asp:DropDownList runat="server" ID="ddlLugarEntregaPedido"></asp:DropDownList>
                            <br />
                            <br />
                            <asp:Label ID="lblDireccionCompleta" runat="server" Style="color: #003F59; font-weight: bold; width: 8px;" />
                        </div>
                    </div>
                    <div id="dvLeyenda" class="menuGridPedido">
                        <%--<table style="font-size: 8pt; position: absolute; left: 270px; top: 45px" cellspacing="0"
                        cellpadding="0">--%>
                        <table style="font-size: 8pt; position: absolute; left: 10px; bottom: -40px" cellspacing="0"
                            cellpadding="0">
                            <tr>
                                <td id="tdNoDespacho" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>Enviado:</b> Pedido En Proceso.
                                </td>
                                <td id="tdYaDespacho" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>Enviado Parcial:</b> Al menos un producto no alcanzo stock
                                </td>
                            </tr>
                            <tr>
                                <td id="td1" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>No adquirido:</b> Productos sin stock.
                                </td>
                                <td id="td2" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>Procesado:</b> Pedido Enviado Al Operador
                                </td>
                            </tr>
                            <tr>
                                <td id="tdNoFechaDespacho" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>Cancelado:</b> Pedido Eliminado
                                </td>
                                <td id="tdNoReserva" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px; display: none;">
                                    <b>Reservado:</b> Pedido guardado listo para enviar al iniciar campaña
                                </td>
                            </tr>
                        </table>

                    </div>
                    <span style="float: right; margin-top: 20px; font-weight: bold; color: #003f59">(*) Seleccione un pedido</span>
                </div>
                <div style="clear: both;"></div>
                <div id="pGrillaPedido" class="pContenedor">
                    <div id="grdPedidos">
                    </div>
                </div>
            </div>

        </div>

        <div id="pnlBuscarLugarEntrega" style="display: none; background-color: rgba(240,240,240,.9)">

            <%--<uc1:BusquedaPrincipal ID="busquedaLugar" runat="server" />--%>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="display: none">
            <tr>
                <td align="right" style="color: #003F59; vertical-align: bottom;" width="150px">
                    <b>Nombre:</b>
                </td>
                <td>&nbsp;
                </td>
                <td style="vertical-align: bottom;" width="300px">
                    <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
                <td rowspan="8">
                    <img src="" id="imgUser" runat="server" height="75" />
                </td>
            </tr>
            <tr height="4px">
                <td colspan="3"></td>
            </tr>
            <tr>
                <td align="right" style="color: #003F59; vertical-align: bottom;">
                    <b>Área:</b>
                </td>
                <td>&nbsp;
                </td>
                <td style="vertical-align: bottom;">
                    <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
            </tr>
            <tr height="4px">
                <td colspan="3"></td>
            </tr>
            <tr>
                <td align="right" style="color: #003F59; vertical-align: bottom;">
                    <b>Centro de Costos:</b>
                </td>
                <td>&nbsp;
                </td>
                <td style="vertical-align: bottom;">
                    <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
            </tr>

        </table>

        <script src="<%=UtilitarioGeneral.ObtieneVersionArchivoEstatico("Pedidos.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
