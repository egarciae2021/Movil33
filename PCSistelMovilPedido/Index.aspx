<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Index.aspx.vb" Inherits="WebSiteCliente.Index" %>
<%@ Import Namespace="WebSiteCliente.UtilitarioPCSistel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>.:Gestión Móvil:.</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <link href="Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/JqueryUI/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/style_slide.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="Common/Images/Login/favicon.ico" type="image/ico" />
    <link href="Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/jquery.jqDock.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/easySlider1.7.js" type="text/javascript"></script>
    <script src="Common/Scripts/jquery.animate-shadow.js" type="text/javascript"></script>
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>

    
    <%--<script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 1K=\'21\';4 4l=1j;4 30=1j;4 1W;4 1R;4 1P;4 3g;4 3F=l;4 4n=l;4 4w=l;4 4A=l;4 2B;4 2H;4 1J=\'\';4 E;4 h=l;4 1H=\'\';4 3I=l;4 4k=l;4 1w;4 1v;4 1T;$(3(){1U(1K);1H=$("#2G").1h();1w=$("#2N").1h()=="1";1T=$("#2T").1h();5(1w){$("#P").o("C-W","V(1b/1a/4q.29)")}5(18!=O&&$.2d(18)!=""){4 d=18.2J("|");5(d.2h>0){$("#2P").o("J","13");2W(4 i=0;i<d.2h;i++){5($.2d(d[i])!=""){$("#31").33(\'<10 K="T:#41;">\'+d[i]+\'</10>\')}}}}17();5($.y.L&&$.y.M=="6.0"){$("#N 10").D("k-2r-2I");$("#N 2o").D("k-2K");$("#N 2o").D("k-2r-2L");$("10").o("2M-K","1A");$(\'.Y\').2O(3(){$(q).o({"C-T":"2S","2l":"2U"})},3(){$(q).o({"C-T":"#2k","2l":"2i"})});$(\'.Y\').7(3(){$(\'.Y\').o({"C-T":"#2k"});$(\'.Y\').D("2f");$(".N").o("J","1A");$(q).z("2f");3b($(q).9("2a").3H()){1y"3P":$("#3W").o("J","13");15;1y"4e":$("#4h").o("J","13");15;1y"4i":$("#4j").o("J","13");15;2i:15}});16();U();$("#g").w(0,3(){$("#m").9("p","E/1c.j");$("#g").t(0)});$("#24").7(3(){X.G.I=\'1i.j\'});$(\'#H\').7(3(){$(\'#H\').w();$(\'#1Z\').w()});$(\'#H\').1l();$(\'#1V\').7(3(){4 a=($(s).Q()-1S)/2;s.1Q("12/12.j","1O","Q=1N,v=A,1M="+a+",1I=1z,2t=x,1D=22,1E=x,1F=x,1G=x, 1B=x")});$(".14").z("4p")}B{$("#4r").D();$(\'#4s\').4t({4v:\'0 0 4I #4z\'});4 f={4B:\'4G\',2u:2v,2w:\'2x\',2y:48,2z:2A};$(\'#1L\').1L(f);U();$(s).1B(3(){U()});16();$("#N").2C({2D:"2E"});$("#24").7(3(){s.G.I="1i.j"});$(\'#H\').7(3(){$(\'#H\').w();$(\'#1Z\').w()});$(\'#H\').1l();$(\'#1V\').7(3(){4 a=($(s).Q()-1S)/2;s.1Q("12/12.j","1O","Q=1N,v=A,1M="+a+",1I=1z,2t=x,1D=22,1E=x,1F=x,1G=x, 1B=x")});$("#g").w(0,3(){$("#m").9("p","E/1c.j");$("#g").t(0)})}$("#2F").R(\'7\',3(e){4 a=$(q).9("1u");4 b=$(q).9("1s");4 c=a+b;s.G.I="11/1q/1o.1n?1m="+c});$("#2Q").R(\'7\',3(e){4 a=$(q).9("1u");4 b=$(q).9("1s");4 c=a+b;s.G.I="11/1q/1o.1n?1m="+c});$("#2R").R(\'7\',3(e){4 a=$(q).9("1u");4 b=$(q).9("1s");4 c=a+b;s.G.I="11/1q/1o.1n?1m="+c})});3 16(){$(".14").7(3(){5(!h){5(u()){$("#m")[0].1X.1Y($(q).9("2a"))}B{$(".14").D("Z");$(q).z("Z")}}});$("#20").7(3(){5(!u()||h){h=l;1W=O;1R=O;1P=O;5($.y.L&&$.y.M=="6.0")$("#m").9("p","E/2X.j");B $("#m").9("p","E/2Y.j");$("#g").t(0)}});$("#2Z").7(3(){5(!u()||h){h=l;5($.y.L&&$.y.M=="6.0"){$("#m").9("p","F/1C.j")}B{$("#m").9("p","F/1C.j")}$("#g").t(A)}});$("#32").7(3(){5(!u()||h){h=l;5($.y.L&&$.y.M=="6.0"){$("#m").9("p","F/23.j")}B{$("#m").9("p","F/23.j")}$("#g").t(A)}});$("#34").7(3(){5(!u()||h){h=l;5($.y.L&&$.y.M=="6.0"){$("#m").9("p","F/35.j")}B{$("#m").9("p","F/36.j")}$("#g").t(A)}});$("#37").7(3(){5(!u()||h){h=l;$("#m").9("p","38/39.j");$("#g").t(A)}});$("#3a").7(3(){5(!u()||h){h=l;$("#m").9("p","1e/1e.j");$("#g").t(0)}});$("#3c").7(3(){5(!u()||h){h=l;$("#g").w(0,3(){$("#m").9("p","1e/3d.j");$("#g").t(0)})}});$("#3e").7(3(){5(!u()||h){h=l;$("#g").w(0,3(){$("#m").9("p","E/1c.j");$("#g").t(0)})}});$("#3f").7(3(){5(!u()||h){h=l;$("#g").w(0,3(){$("#m").9("p","25/3h.j");$("#g").t(A)})}});$("#3i").7(3(){5(!u()||h){h=l;$("#g").w(0,3(){$("#m").9("p","25/3j.j");$("#g").t(A)})}});$("#3k").7(3(){3l(\'3m 3ná a 3o 3p 3q<3r>¿3s 3t 3u 3vón?\',"3w E")});$("#3x,#3y,#3z,#3A,#3B").7(3(){5(!u()||h){h=l;$("#g").w(0,3(){$("#m").9("p","3C.3D");$("#g").t(0)})}});$("#3E").7(3(){$("#g").w(0,3(){s.G.I="1i.j"})});$("#26").R("3G",3(){$(q).o({"27-28":"3J 3K 3L 3M"})});$("#26").R("3N",3(){$(q).o({"27-28":""})})}3 U(){4 a=$(s).Q();4 b=$(s).v();$("#P").o({"v":b-3O});$("#g").o({"v":b-1z})}3 u(){4 a=l;5($("#m")[0].1X.1Y!=O){a=1j}19 a}3 3Q(a){$(".14").D("Z");$("#"+a).z("Z").7()}3 3R(){$("#P").o("C-W","1A")}3 17(){$.3S({3T:"3U",V:"11/3V/1x.3X/17",3Y:"{}",3Z:"40/2b; 42=43-8",44:"2b",45:3(a){1J=a.d},46:3(a,b,c){47(a,b,c)}})}3 49(){$("#20").7()}3 4a(a){1v=$(s).v();a=a+4b;$("#1x").v(a);$("#P").v(a);$("#g").v(a)}3 4c(){4 a=1v;$("#1x").v(a);$("#P").v(a);$("#g").v(a)}3 4d(){4 a=X.2c.4f?X.2c:X.4g,1r=a.2e,1p=a.2g,1k=a.4m>1r,1g=a.4o>1p,2j=a.K.1f,r={2m:0,2n:0};5(!1g&&!1k){19 r}a.K.1f="4u";5(1g){r.2m=a.2e-1r}5(1k){r.2n=a.2g-1p}a.K.1f=2j;19 r}3 1U(c){5(c=="1t"){$("#2p").o("C-W","V(1b/1a/4x.4y)");$("#2q").z("S-1t");$("#2s").z("S-1t")}B 5(c=="21"){$("#2p").o("C-W","V(1b/1a/4C.29)");$("#2q").z("S");$("#2s").z("S")}$("#4D").1l()}3 4E(a,b,c){$("#4F").1d(a);$("#4H").1d(b);$("#2V").1d(c)}',62,293,'|||function|var|if||click||attr|||||||contenedorPage|EsVerificaCarrito||aspx||false|miFrame||css|src|this||window|fadeIn|fnEsPaginaCarrito|height|hide|no|browser|addClass|500|else|background|removeClass|Pedido|Cronograma|location|dvCierreAnuncio|href|display|style|msie|version|panelbar|undefined|ContenidoPrincipal|width|live|tituloSeccion|color|Dimensionar|url|image|document|tablaMenu|seleccionado|li|Common|Chat|block|teamMate|break|AsociarEventosLoad|ObtenerRaizSistema|strConcideraciones|return|images|common|Dashboard_pedido|text|Incidencia|overflow|hasScrollY|val|Login|true|hasScrollX|show|archivo|ashx|DescargarArchivo|curY|Controladores|curX|BtnDoc|CLARO|BtnUrl|AltoOriginal|EsSimulacion|General|case|100|none|resize|Con_Fac_EstadoCuenta|scrollbars|titlebar|toolbar|statusbar|UsuarioConectado|top|RaizSistema|ProveedorDiseno|jqDock|left|395|window_new|FlagMantenerPlan|open|IdPlanNumeroRenovar|390|inTipoContrato|fnEstilos|dvChat|NumeroRenovar|contentWindow|fnVerificarSalida|anuncio|dvNuevoPedido|TDP|yes|InfoCobros|spCerrarSesion|Solicitud|btnChat|box|shadow|jpg|id|json|documentElement|trim|clientWidth|menuSelect|clientHeight|length|default|prev|E2F0F6|cursor|vertical|horizontal|span|cabecera|dvDocumentosCabecera|state|dvConsideraCabecera|menubar|duration|200|labels|tc|size|distance|85|IdTipoFinanciamiento|kendoPanelBar|expandMode|single|descargar|hfUsuario|miIdTipoModeloDispositivo|active|split|link|selected|list|hdfEsSimulacion|hover|dvConsidera|descargarMini|descargarFAQ|skyblue|hdfTipoContrato|pointer|lblFechaInicioEntrega|for|PedidoIE|Pedidos|dvEstadoCuenta|boolPag|ulConcideraciones|dvInfoCobros|append|dvCronogramaPagos|CronogramaPagosIE|CronogramaPagos|dvContrato|Contrato|ContratoResumen|dvListadoIncidencias|switch|dvRegistrarIncidencia|Registrar_Incidencia|dvInicio|dvListadoSolicitudes|PrecioPlanNumeroRenovar|Listado_Solicitud|dvRegistrarSolicitud|Registrar_Solicitud|dvCancelarPedido|confirma|Se|proceder|cancelar|el|pedido|br|Continuar|con|la|operaci|Cancelar|dvAmpliarCredito|dvActivarServicio|dvReparacion|dvPerdida|dvVisorSolicitudes|PaginaEnConstruccion|htm|mnSalir|esCampanaActiva|mousemove|toString|SeCanceloPedido|0px|10px|25px|gray|mouseout|90|tablaCampana|fnSalidaConfirmada|fnEliminarFondoPrincipal|ajax|type|POST|WebServices|panelbarCampana|asmx|data|contentType|application|0065BA|charset|utf|dataType|success|error|MostrarErrorAjax||fnIrPedidos|fnResizeHtml|50|fnWarpWindow|getScrollBarDimensions|tablaCanal|offsetHeight|body|panelbarCanal|tablaSolicitudes|panelbarSolicitudes|SeProcesoPedido|PaginaPadre|scrollWidth|esPreVentaActiva|scrollHeight|menuIe6|fondoprincipal4|imgLogoCliente|box4|animate|hidden|boxShadow|ValidarPorNodeJS|fondo_cabecera_CLARO|png|44f|esConfirmacionPreventa|align|fondo_cabecera|generalHead|fnActualizarFechasCampanas|lblFechaInicioCampana|center|lblFechaInicioPedido|30px'.split('|'),0,{}))
    </script>--%>
    <link href="Common/Styles/Index.css" rel="stylesheet" type="text/css" />
    <%--<script src="Common/Scripts/socket.io.js" type="text/javascript"></script>--%>

    <script src="CallNodeJS.js" type="text/javascript"></script>

    <!--[if IE 6]>
    <link href="IndexIE.css" rel="stylesheet" type="text/css" />
    <![endif]-->
    <style type="text/css">
        .teamMate:hover {
            background-color: #EAEAEA;
            border-radius: 3px;
            box-shadow: 1px 1px 1px gray;
        }

        .seleccionado {
            background-color: #C1C3C4 !important;
            border-radius: 3px;
            box-shadow: 1px 1px 1px gray;
        }

        .teamMate {
            padding-right: 5px;
        }

        .pleaseWait {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0px;
            top: 0px;
            background: rgb(240,240,240);
            background: rgba(200,200,200,.3);
            z-index: 999999;
        }

        .gifPleaseWait {
            position: relative;
            top: 50%;
            left: 50%;
            width: 225px;
            height: 50px;
            padding-bottom: 8px;
            background-image: url('Common/Images/progressbar_load.gif');
            background-repeat: no-repeat;
            background-position: center;
            font-weight: bolder;
            color: darkblue;
            background-color: rgba(200,200,200,.9);
            border-radius: 10px;
            padding-left: 5px;
        }

        .menuIe6 {
            width: 195px !important;
            height: 55px !important;
            padding-top: 5px;
        }

        #ulConcideraciones {
            list-style: none;
        }

            #ulConcideraciones * {
                text-align: left;
            }

        .tituloSeccion {
            background-color: #58a5c6;
            color: White;
            font-size: 15px;
        }

        .tituloSeccion-CLARO {
            /*background-image: url(common/images/fondo_cabecera_CLARO.png);*/
            background-color: #bbb;
            color: #454545;
            font-size: 15px;
        }

        .divInfo {
            width: 197px;
            margin-top: 10px;
            float: left;
            border-bottom: 1px solid #94c0d2;
            border-left: 1px solid #94c0d2;
            border-right: 1px solid #94c0d2;
            display: none;
        }

        .divInfo-CLARO {
            width: 197px;
            margin-top: 10px;
            float: left;
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
        }

        .k-window-action {
            visibility: hidden;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfUsuario" runat="server" />
        <asp:HiddenField ID="hdfEsSimulacion" runat="server" />
        <asp:HiddenField ID="hdfIpNode" runat="server" />
        <asp:HiddenField ID="hdfPuertoNode" runat="server" />

        <asp:HiddenField runat="server" ID="hdfTipoContrato" />

        <div class="pleaseWait" style="display: none;">
            <div class="gifPleaseWait">Espere por favor...</div>
        </div>
        <div id="aleatorionode" style="display: none;">
        </div>
        <table id="General" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <div id="generalHead">
                        <table id="cabecera" width="100%" border="0" style="color: white; background-image: url(common/images/fondo_cabecera.jpg); background-repeat: repeat; border-radius: 5px;">
                            <tr>
                                <td></td>
                                <td align="left">
                                    <b>Bienvenido(a):
                                    <asp:Label ID="lblUsuario" runat="server" Text="Label"></asp:Label></b> <span style="font-size: 10px;">
                                        <asp:Label ID="lblUltimaVisita" runat="server" Text=""></asp:Label></span>
                                    <div id="dvNode">
                                    </div>
                                </td>
                                <td colspan="1" align="right">
                                    <img alt="" id="imgLogoCliente" src="Common/Images/Logo_Cliente.png" width="110px" height="25px" />
                                    <%--MMACISO--%>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="generalCuerpo">
                        <table id="ContenidoPrincipal" border="0" cellpadding="0" cellspacing="0" width="100%"
                            align="center" style="background-image: url(common/images/fondoprincipal2.jpg); background-repeat: no-repeat;">
                            <tr>
                                <td style="vertical-align: text-top; width: 200px !important;" align="right">
                                    <div id="organizer">
                                        <ul id="panelbar">
                                            <li class="k-state-active"><span class="k-link k-state-selected">
                                                <table border="0" class="tablaMenu" id="tablaCampana">
                                                    <tr>
                                                        <td>
                                                            <img src="Common/Images/order.png" height="24px" />
                                                        </td>
                                                        <td>&nbsp;Campaña
                                                        </td>
                                                    </tr>
                                                </table>
                                            </span>
                                                <div class="panelbar" id="panelbarCampana" style="padding: 10px;">
                                                    <div class="teamMate seleccionado" id="dvInicio" style="margin-bottom: 5px;">
                                                        <img src="Common/Images/iconoInicio.png" alt="Principal" width="32" height="32" />
                                                        <h2>Principal</h2>
                                                        <p>
                                                            Mis L&iacute;neas Actuales
                                                        </p>
                                                    </div>
                                                    <div class="teamMate" id="dvNuevoPedido" style="display: none;">
                                                        <img src="Common/Images/pedido.png" alt="Visualice sus pedidos" width="32" height="32" />
                                                        <h2>Mis Pedidos</h2>
                                                        <p>
                                                            Visualice sus pedidos
                                                        </p>
                                                    </div>
                                                    <div class="teamMate" id="dvContrato" runat="server" style="display: none;">
                                                        <img src="Common/Images/hojaTexto.png" alt="Visualice sus pedidos" width="32" height="32" />
                                                        <h2>Contrato Resumen</h2>
                                                        <p>
                                                            Su contrato
                                                        </p>
                                                    </div>
                                                    <div class="teamMate" id="dvCronogramaPagos">
                                                        <img src="Common/Images/cronograma.png" alt="Visualice sus pedidos" width="32" height="32" />
                                                        <h2>Cronograma de Pagos</h2>
                                                        <p>
                                                            Visualice su cronograma
                                                        </p>
                                                    </div>
                                                    <div class="teamMate" id="dvComprobantes" runat="server" style="margin-bottom: 5px; display: none;">
                                                        <img src="Common/Images/Comprobantes_24x24.png" alt="Visualice sus comprobantes" height="24px" />
                                                        <h2>Mis Comprobantes</h2>
                                                        <p>Revise sus comprobantes</p>
                                                    </div>
                                                    <div class="teamMate" id="dvEstadoCuenta">
                                                        <img src="Common/Images/Generar.png" alt="Visualice sus pedidos" width="32" height="32" />
                                                        <h2>Estado de Cuenta</h2>
                                                        <%--<p>Visualice su estado de cuenta</p>--%>
                                                        <p>Consulta por periodos</p>
                                                    </div>
                                                    <div class="teamMate" id="dvInfoCobros">
                                                        <img src="Common/Images/money-flat-money.png" alt="Visualice sus pedidos" width="32" height="32" />
                                                        <h2>Consulta de Pagos</h2>
                                                        <p>Visualice sus pagos</p>
                                                    </div>
                                                    <div class="teamMate" id="dvListadoIncidencias" style="display: block;">
                                                        <img src="Common/Images/helpdesk.png" alt="Canal" width="32" height="32" />
                                                        <h2>Canal de Atenci&oacute;n</h2>
                                                        <p>
                                                            Incidencias registradas
                                                        </p>
                                                    </div>

                                                </div>


                                                <%--<div class="teamMate" id="dvListadoIncidencias" style="margin-bottom:5px;">
                                                    <img src="Common/Images/iconoInicio.png" alt="Principal" height="65px" />
                                                    <h2>
                                                        Panel Principal</h2>
                                                    <p>
                                                        Histórico Consultas</p> 
                                                </div>--%>

                                            </li>
                                            <%--
                                        <li disabled="disabled">
                                            <table border="0">
                                                <tr>
                                                    <td>
                                                        <img src="Common/Images/solicitud.png" height="24px" />
                                                    </td>
                                                    <td>
                                                        &nbsp;Solicitudes
                                                    </td>
                                                </tr>
                                            </table>
                                            <div style="padding: 10px;">
                                                <div class="teamMate" id="dvVisorSolicitudes">
                                                    <img src="Common/Images/view.png" alt="Visor de estado de mis Solicitudes" />
                                                    <h2>
                                                        Mis Solicitudes</h2>
                                                    <p>
                                                        Visor de estado</p>
                                                </div>
                                                <div class="teamMate" id="dvPerdida">
                                                    <img src="Common/Images/sad.png" alt="Solicitud por pérdida o robo" />
                                                    <h2>
                                                        Pérdida o Robo</h2>
                                                    <p>
                                                        Solicitud por pérdida o robo</p>
                                                </div>
                                                <div class="teamMate" id="dvReparacion">
                                                    <img src="Common/Images/tool.png" alt="Solicite reparación">
                                                    <h2>
                                                        Reparación</h2>
                                                    <p>
                                                        Solicite reparación</p>
                                                </div>
                                                <div class="teamMate" id="dvActivarServicio">
                                                    <img src="Common/Images/activar.png" alt="Active-Inactive Servicio">
                                                    <h2>
                                                        Activar Servicio</h2>
                                                    <p>
                                                        Active-Inactive Servicio</p>
                                                </div>
                                                <div class="teamMate" id="dvAmpliarCredito">
                                                    <img src="Common/Images/ampliar.png" alt="Amplie su crédito por servicios">
                                                    <h2>
                                                        Ampliar Crédito</h2>
                                                    <p>
                                                        Amplie su crédito por servicios</p>
                                                </div>
                                            </div>
                                        </li>
                                            --%>
                                            <%--<li><span>
                                            <table border="0" class="tablaMenu" id="tablaCanal">
                                                <tr>
                                                    <td>
                                                        <img src="Common/Images/helpdesk.png" height="24px" />
                                                    </td>
                                                    <td>
                                                        &nbsp;Canal de Atención 
                                                    </td>
                                                </tr>
                                            </table>
                                        </span>
                                            <div class="panelbar" id="panelbarCanal" style="padding: 10px;">
                                                
                                                <div class="teamMate" id="dvChat" runat="server" style="display:none;">
                                                    <img src="Common/Images/icon_24-off.png" alt="Principal" height="65px" />
                                                    <h2>
                                                        <asp:Label ID="lblTituloChat" runat="server"></asp:Label></h2>
                                                    <p>
                                                        <asp:Label ID="lblSubtituloChat" runat="server"></asp:Label></p>
                                                </div>
                                                <div class="teamMate" id="dvRegistrarIncidencia">
                                                    <img src="Common/Images/pedido.png" alt="Nuevo Pedido" height="65px" />
                                                    <h2>
                                                        Registrar Ticket</h2>
                                                    <p>
                                                        Requerimientos</p> 
                                                </div>
                                            </div>
                                        </li>--%>
                                            <%--<li><span>
                                            <table border="0" class="tablaMenu" id="tablaSolicitudes">
                                                <tr>
                                                    <td>
                                                        <img src="Common/Images/solicitud.png" height="24px" />
                                                    </td>
                                                    <td>
                                                        &nbsp;Solicitudes
                                                    </td>
                                                </tr>
                                            </table>
                                        </span>
                                            <div class="panelbar" id="panelbarSolicitudes" style="padding: 10px;">
                                                <div class="teamMate" id="dvListadoSolicitudes">
                                                    <img src="Common/Images/iconoInicio.png" alt="Principal" height="65px" />
                                                    <h2>Principal</h2>
                                                    <p>
                                                        Visor de estado de solicitudes</p>
                                                </div>
                                                <div class="teamMate" id="dvRegistrarSolicitud">
                                                    <img src="Common/Images/ampliar.png" alt="Nuevo Pedido" height="65px" />
                                                    <h2>
                                                        Registrar Solicitud</h2>
                                                    <p>
                                                        Ingrese una solicitud</p>
                                                </div>
                                            </div>
                                        </li>--%>
                                            <%--<li disabled="disabled">Estado de Cuenta</li>--%>
                                            <li><span id="spCerrarSesion" style="cursor: hand; cursor: pointer; color: #E04343;">
                                                <table border="0">
                                                    <tr>
                                                        <td>
                                                            <img alt="" src="Common/Images/logoff.png" width="16px" />
                                                        </td>
                                                        <td>
                                                            <span id="Spanlogout" style="text-decoration: underline;">Cerrar sesión</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </span></li>
                                        </ul>
                                    </div>
                                    <%--<div id="Div1" runat="server" class="divInfo-CLARO" style="display:none;">--%>
                                    <div id="dvDocumentos" runat="server" class="divInfo-CLARO" style="display: none;">
                                        <div id="dvDocumentosCabecera" style="width: 100%; float: left; height: 20px; text-align: left;">
                                            &nbsp;Documentos
                                        </div>
                                        <div style="padding: 0px 5px 0px 5px;">
                                            <ul id="ulDocumentos" runat="server" style="list-style: none; text-align: left">
                                                <li style="color: #003F8D">sdgsdgasdfsdf
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div id="dvConsidera" class="divInfo-CLARO" style="display: none;">
                                        <%--<div style="width:20%; background-color:#003F8D; float:left; height:20px; "></div>
                                    <div style="width:20%; background-color:#0065BA; float:left; height:20px;"></div>
                                    <div style="width:20%; background-color:#0093E2; float:left; height:20px;"></div>
                                    <div style="width:20%; background-color:#00AEEB; float:left; height:20px;"></div>
                                    <div style="width:20%; background-color:#41CEF8; float:left; height:20px;"></div>--%>
                                        <div id="dvConsideraCabecera" style="width: 100%; float: left; height: 20px; text-align: left;">
                                            &nbsp;IMPORTANTE:
                                        </div>
                                        <%--<div style="width:20%; background-color:#9BE1FB; float:left; height:20px;"></div>--%>
                                        <div style="clear: both;"></div>
                                        <div style="padding: 5px; color: red;">
                                            <ul id="ulConcideraciones" style="color: red;">
                                            </ul>
                                        </div>
                                    </div>


                                </td>
                                <td style="vertical-align: top;">
                                    <div id="contenedorPage" style="min-height: 450px;">
                                        <iframe id="miFrame" frameborder="0" style="padding: 0px; margin: 0px;"
                                            height="100%" width="100%"></iframe>
                                    </div>
                                    <div>
                                        <table border="0" style="color: darkblue; font-size: 11px; font-weight: bold;" width="100%">
                                            <tr>
                                                <td>Inicio de Campaña:
                                                    <asp:Label ID="lblFechaInicioCampana" ForeColor="DarkRed" Font-Size="11px" Font-Bold="true" runat="server"></asp:Label>
                                                </td>
                                                <td align="center">Inicio de Pedidos:
                                                    <asp:Label ID="lblFechaInicioPedido" ForeColor="DarkRed" Font-Size="11px" Font-Bold="true" runat="server"></asp:Label>
                                                </td>
                                                <td align="right">Inicio de Entrega:
                                                    <asp:Label ID="lblFechaInicioEntrega" ForeColor="DarkRed" Font-Size="11px" Font-Bold="true" runat="server"></asp:Label>
                                                    (*)
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" style="text-align: right; color: Blue;">(*) Debe revisar la fecha exacta de entrega en su contrato.
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        <div id="dvCierreAnuncio" class="dvTituloAnuncio" style="display: none;" runat="server">
            <img alt="" src="Common/Images/close.png" width="18px" />
        </div>
        <div id="dvTiempoAnuncio" class="dvTituloAnuncio">
        </div>
        <div id="anuncio" runat="server">
            <div id="slider" style="display: none">
                <ul id="imgBanner" runat="server">
                    <%--<li>
                    <img src="Common/Images/Anuncio/banner1.jpg" height="230px" width="1024px" alt="" /></li>
                <![if gte IE 9]>
                <li>
                    <img src="Common/Images/Anuncio/banner2.jpg" height="230px" width="1024px" alt="" /></li>
                <li>
                    <img src="Common/Images/Anuncio/banner3.jpg" height="230px" width="1024px" alt="" /></li>
                <li>
                    <img src="Common/Images/Anuncio/banner4.jpg" height="230px" width="1024px" alt="" /></li>
                <li>
                    <img src="Common/Images/Anuncio/banner5.jpg" height="230px" width="1024px" alt="" /></li>
                <li>
                    <img src="Common/Images/Anuncio/banner6.jpg" height="230px" width="1024px" alt="" /></li>
                <![endif]>--%>
                </ul>
            </div>
        </div>
        <div id="btnChat" style="cursor: pointer; cursor: hand; width: 65px; height: 65px; position: absolute; right: 5px; top: 40%; display: none;"
            runat="server" align="right">
            <img alt="" src="Common/Images/Chat/user_chat.png" width="64px" /><br />
        </div>
        <div id="lblChat" style="width: 100px; height: 65px; position: absolute; right: 5px; top: 50%; display: none;" runat="server" align="right">
            <b>Consulta - Chat</b>
        </div>
        <div id="panelChat" class="dvPanel" style="display: none; width: 200px; height: 94%; position: absolute; left: 100%; top: 5px; box-shadow: 0px 10px 25px gray;">
            <div id="btnCerrarPanelChat" style="width: 98%; height: 30px; margin-bottom: 30px">
                Chat
            </div>
            <div id="btnIniciarSesion" style="width: 98%; height: 30px; margin-bottom: 30px">
                <span>Iniciar sesión</span>
            </div>
        </div>
        <div id="dvActualizaCorreo" style="display: none; overflow: hidden;">
            <table style="width: 100%;" border="0" align="center">
                <tr>
                    <td colspan="3" style="font-size: 12px;">Para continuar es necesario que registre su correo electrónico...<br />
                        <br />
                    </td>
                </tr>

                <tr>
                    <td style="width: 70px;">Email</td>
                    <td>
                        <asp:TextBox ID="txtCorreo" runat="server" CssClass="k-textbox" Width="225px" MaxLength="200"></asp:TextBox>
                    </td>
                    <td>
                        <div id="btnActualizarCorreo" class="k-button">
                            Aceptar
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-size: 16px;" colspan="3">
                        <asp:Label ID="lblMensaje" CssClass="k-label" Style="color: #E04343; font-size: 12px; padding-bottom: 5px; font-weight: bold;" runat="server" Text=""></asp:Label>
                        <br />
                        <br />
                    </td>
                </tr>
            </table>

        </div>
        <script src="<%=UtilitarioGeneral.ObtieneVersionArchivoEstatico("Index.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
