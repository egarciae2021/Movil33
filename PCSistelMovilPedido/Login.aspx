<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Login.aspx.vb" Inherits="WebSiteCliente.Login" %>

<%@ Import Namespace="WebSiteCliente.UtilitarioPCSistel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <link rel="shortcut icon" href="Common/Images/Login/favicon.ico" type="image/ico" />
    <title>.:Gestión Móvil:.</title>
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <link href="Common/Styles/Login.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/watermarkify.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/style_slide_login.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <![if gte IE 9]>
    <script src="Common/Scripts/jquery.corner.js" type="text/javascript"></script>
    <![endif]>
    <script src="Common/Scripts/watermarkify.0.6.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/easySlider1.7.js" type="text/javascript"></script>
    <script src="Common/Scripts/jquery.ui.position.js" type="text/javascript"></script>
    <script src="Common/Scripts/jquery.contextmenu2.js" type="text/javascript"></script>
    <script src="Common/Scripts/prettify.js" type="text/javascript"></script>
    <script src="Common/Scripts/screen.js" type="text/javascript"></script>
    <script src="Common/Scripts/md5.js" type="text/javascript"></script>
    <script src="Common/Scripts/jcap.js" type="text/javascript"></script>
    <link href="Common/Styles/jquery.contextMenu.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/countdown.js" type="text/javascript"></script>
    <script src="Common/Scripts/socket.io.js" type="text/javascript"></script>
    <script src="CallNodeJS.js" type="text/javascript"></script>
    <script src="Login.js" type="text/javascript"></script>
    
    <%--<script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 1r=\'31\';5 E=T;5 F=T;5 5c=P;5 30=\'\';7 58(a){9(a!=\'\'){t(a)}r{t("57 o 4Iña 4H")}}7 4G(){9(4E("4D 4C 4e 1R 1Q 3L 2f 1C ú56 4Ná 3A 2Z 1C 3e ¿3b 5h, 2M 1H 4r 1R 2j?")){$.1m({1l:"1k",D:"2h.V/3G",1i:"{}",1h:"1g/O; 1n=1e-8",1o:"O",1f:7(a){t("3U 3R 3a 3W 4s 3fá 2Z 1C 2M 1Q 1R 2j.")},1s:7(a,b,c){t("3X 3Z 27 4x 4A. 4Bé4Z 5g 1P 3m 3C.")}})}}7 3I(){t("3J")}$(7(){9(3O 2l!=\'1t\'){9(2l==12){$("#A").B()}}2I(1r);1D();1L();$(u).4O(7(){1L()});9($("#4S").N()=="0"){$("#39").z()}9($("#2m").N()=="0"){$("#3o").z()}$("#3B").1j(\'C\',7(e){5 a=$(16).15("2L");5 b=$(16).15("32");5 c=a+b;u.H.Y=1y("Q/2n/2s.2z?2A="+c)});$("#4M").1j(\'C\',7(e){5 a=$(16).15("2L");5 b=$(16).15("32");5 c=a+b;u.H.Y=1y("Q/2n/2s.2z?2A="+c)});7 1y(a){5 b="";5 n=u.H.4Q.1d("/");4W(5 i=0;i<n.5d-3;i++){b+="../"}b+=a;M b}7 1L(){5 a=$(u).37();5 b=$(u).2Q();5 c=$("#A").2Q();5 d=(b-c+3c)/2;$("#A").y("3g",-10)}$("#3i").C(7(){u.H.Y="3k.V"});$("#3l").B();$("#1c").y({33:0.3w});$("#I").y({33:0.8});2g{$("#A").1p();$("#I").1p();$("#1c").1p();$(".3D").1p("3F")}2i(3H){}$(\'#1q\').1j("2k",7(e){9(e.2c==13){$("#2o").2d();M P}});$(\'#2o\').1j("2k",7(e){9(e.2c==13){$("#2t").C();M P}});$("#2u").4f({4i:12,4k:P});$.4p({4q:\'.2w-2x-4t\',4u:\'4v\',4w:7(a,b){5 m="4y: "+a;t(m)},4z:{"1x":{X:"4F 4J 4L&1z;&1z;&1z;",S:"1x"},"2B":{X:"4P",S:"2B"},"2C":{X:"4R",S:"2C"},"2D":{X:"4V",S:"2D"},"2E":{X:"4X",S:"2E"},"4Y":"-","2F":{X:"50",S:"2F"}}});$("#2u").B();$("#2t").C(7(e){9($("#2m").N()=="1"){9(!59()){9($.2G($("#5e").N())==\'\'){t("5f 1Q 1H có2H 1A 5i")}r{t("2J có2H 38 27 2K 36")}M P}}});5 j=P;5 k=u;3d{k=k.2N;9(k!=T&&k.H.Y.2O().2P(\'L.V\')==-1){9(k.3h!=1t){k.H.Y=\'2h.V\';j=12;2R}r{9(k.H.Y.2O().2P(\'.V\')==-1){j=12;2R}}}r{j=12}}3j(j==P)$.1m({1l:"1k",D:"Q/1E/1F.1G/3n",1i:"{}",1h:"1g/O; 1n=1e-8",1o:"O",1f:7(a){9(a.d!=""){E=a.d.1d(",")[0];F=a.d.1d(",")[1]}r{E=T;F=T}},1s:7(a,b,c){5 x}});5 l={$3p:3,$3q:{$3r:$3s$,$3t:2,$3u:0,$3v:1}};5 o=1b $3x$("3y",l);$("#3z").C(7(){$("#1I").B();$("#1J").2d();$(".1K-1w").B()});$("#1J").3E(7(e){9(e.2c!=13){9($(16).N()!=\'\'){$("#1a").B();9(1M($(16).N())){$("#1N").z();$("#1a").15("1O","Q/2p/3K.K")}r{$("#1N").B();$("#1a").15("1O","Q/2p/3M.K")}}r{$("#1a").z();$("#1N").z();$("#1a").3N("1O")}}r{$("#2q").C()}});$("#3P").C(7(){$("#1I").z();$(\'.1K-1w\').z()});$("#3Q").C(7(){$("#2r").z();$(\'.1K-1w\').z()});$("#2q").C(7(){5 d=u.H.3S;5 e=u.H.3T;5 f="3V.V";5 g=e+\'//\'+d+\'/\'+f;5 h=$.2G($("#1J").N());9(h==\'\'){t("3Y 2f 2v 1Hé40.");M}9(!1M(h)){t("2J 41 42 2v 27 2K vá43.");M}5 i={44:h,45:g,46:-1,47:\'\'};$.1m({1l:"1k",D:"Q/1E/1F.1G/48",1i:49.4a(i),1h:"1g/O; 1n=1e-8",1o:"O",1f:7(a){5 b=a.d.1d(\'|\')[0];5 c=a.d.1d(\'|\')[1];9(b==\'1\'){$("#4b").4c(h);$("#2r").B();$("#1I").z()}r{t(c)}},1s:7(a,b,c){t(a,b,c)}})})});$(".2w-2x-4d.S-1x").y("R-1S","4g 4h");5 1T;1T=4j(2y,4l);7 2y(){9($("#1q").N()==\'\'){$("#1q").4m()}4n(1T);$("#1q").2d()}7 4o(a){9(E!=T){5 b,1U,1V;5 c,1W,1X;5 d,1Y,1Z;5 f,20,21;5 g,22,23;5 h,24,25;a=a.26("*:","");a=a.26(/"/g,"");a=a.26(/\\\\/g,"");5 i=1t;2g{1U=q(a.p(0,2));1W=q(a.p(3,3+2))-1;1Y=q(a.p(6,6+4));20=q(a.p(11,11+2));22=q(a.p(14,14+2));24=q(a.p(17,17+2));i=1b 19(1Y,1W,1U,20,22,24)}2i(e){i=1t}9(i=="4K 19"){i=1b 19()}b=q(E.p(0,2));c=q(E.p(3,3+2))-1;d=q(E.p(6,6+4));f=q(E.p(11,11+2));g=q(E.p(14,14+2));h=q(E.p(17,17+2));28=1b 19(d,c,b,f,g,h);1V=q(F.p(0,2));1X=q(F.p(3,3+2))-1;1Z=q(F.p(6,6+4));21=q(F.p(11,11+2));23=q(F.p(14,14+2));25=q(F.p(17,17+2));29=1b 19(1Z,1X,1V,21,23,25);9(i>=28){9(i<=29){$("#2a").2b("<b><J 1u=\'1v: #2S;\'>4T 1A 4Uña 1P: </J><2T><J 1u=\'2U-1S:2V;1v: #2W;\'>"+2X(i,29).2Y()+"</J></b>");$("#51").B();u.2N.$("#52").B()}}r{$("#2a").2b("<b><J 1u=\'1v: #2S;\'>53 1A 54 1P: </J><2T><J 1u=\'2U-1S:2V;1v: #2W;\'>"+2X(28,i).2Y()+"</J></b>")}}r{$("#2a").2b(\'\')}}7 1D(){$.1m({1l:"1k",D:"Q/1E/1F.1G/1D",1i:"{}",1h:"1g/O; 1n=1e-8",1o:"O",1f:7(a){30=a.d},1s:7(a,b,c){55(a,b,c)}})}7 2I(c){9(1r=="18"){$("#A").y("R-W","D(U/Z/5a.K)");$("#I").y("R-W","D(U/Z/L-5b.K)");$("#I").s("G-18");$("#1c").s("G-18");$("#A").s("G-18");$("#2e").s("1B-18")}r 9(1r=="31"){$("#A").y("R-W","D(U/Z/L/34.K)");$("#I").y("R-W","D(U/Z/L/L-35.K)");$("#I").s("G");$("#1c").s("G");$("#A").s("G");$("#2e").s("1B")}r{$("#A").y("R-W","D(U/Z/L/34.K)");$("#I").y("R-W","D(U/Z/L/L-35.K)");$("#I").s("G");$("#1c").s("G");$("#A").s("G");$("#2e").s("1B")}}7 1M(a){5 b=/(\\w+)(\\.?)(\\w*)(\\@{1})(\\w+)(\\.?)(\\w*)(\\.{1})(\\w{2,3})/;9(b.5j(a)){M 12}r{M P}}',62,330,'|||||var||function||if||||||||||||||||substring|parseInt|else|addClass|alert|window||||css|hide|divLoginPrincipal|show|click|url|FechaHoraInicioCampana|FechaHoraFinCampana|sBorde|location|divInicioSesion|span|png|login|return|val|json|false|Common|background|icon|null|common|aspx|image|name|href|images|||true|||attr|this||CLARO|Date|imgCorreo|new|divProducto|split|utf|success|application|contentType|data|live|POST|type|ajax|charset|dataType|corner|loginPrincipal_UserName|ProveedorDiseno|error|undefined|style|color|overlay|edit|raiz|nbsp|de|sNombreProducto|clave|ObtenerRaizSistema|WebServices|General|asmx|el|dvRecordarContrasena|txtCorreo|popup|Dimensionar|validarEmail2|dvFormatInvalid|src|en|ingresar|al|size|myTimeout|diaActual|diaCampanaFin|mesActual|mesCampanaFin|anioActual|anioCampanaFin|horaActual|horaCampanaFin|minutoActual|minutoCampanaFin|segundoActual|segundoCampanaFin|replace|no|FechaCampana|FechaCampanaFin|dvTiempoRestante|html|keyCode|focus|lblNombreProducto|su|try|Login|catch|sistema|keydown|MostrarPaginaCompleta|hdfCaptcha|Controladores|loginPrincipal_Password|Images|btnEnviar|dvConfirmacionEnvio|DescargarArchivo|loginPrincipal_LoginButton|slider|correo|context|menu|fnValidarCargaInicial|ashx|archivo|cut|copy|paste|delete|quit|trim|digo|fnStyles|El|es|BtnUrl|para|parent|toLowerCase|indexOf|height|break|1077BB|br|font|20px|004B95|countdown|toString|una|xRaizSistema|TDP|BtnDoc|opacity|fondo_login_03|central|correcto|width|ingresado|filaRecordarme|momentos|Desea|5000|do|temporal|enviar|top|PaginaPadre|dvConfiguracion|while|Configuracion|tbConenido|unos|getFechaCampana|filaCaptcha|DragOrientation|ArrowNavigatorOptions|Class|JssorArrowNavigator|ChanceToShow|AutoCenter|Steps|75|JssorSlider|slider1_container|loginPrincipal_LblOlvidoContrasena|generar|descargar|minutos|fields|keyup|6px|EnviarCorreoPassword|Error|fnResult|cambio|Aprobar|con|Alerta_16x16|removeAttr|typeof|btnCerrar|btnVolverLogin|breves|host|protocol|En|RestablecerContrasena|se|Su|Ingrese|solicitud|ctronico|formato|del|lido|Correo|Url|IdDominio|Dominio|enviarcorreopassword|JSON|stringify|lblCorreoEnvio|text|item|problemas|easySlider|200px|500px|auto|setTimeout|continuous|200|watermarkify|clearTimeout|TiempoRestante|contextMenu|selector|ingreso|le|one|trigger|left|callback|fue|clicked|items|procesada|Int|tiene|Si|confirm|Sumario|AbrirConfirmacionClave|incorrecta|Contrase|por|Invalid|Empleado|descargarMini|podr|resize|Cut|pathname|Copy|hdfNocerrarSesion|Cierre|campa|Paste|for|Delete|sep1|ntelo|Quit|pBotonesPedido|dvNuevoPedido|Apertura|pedidos|MostrarErrorAjax|nica|Usuario|AbrirUsuarioContrasenaIncorrectos|jcap|fondo_login_CLARO|central_CLARO|CampanaActiva|length|uword|Debe|nuevamente|generarla|seguridad|test'.split('|'),0,{}))
    </script>--%>

    <%--<script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>--%>
    <script src="Common/Scripts/jssor.core.js" type="text/javascript"></script>
    <script src="Common/Scripts/jssor.utils.js" type="text/javascript"></script>
    <script src="Common/Scripts/jssor.slider.js" type="text/javascript"></script>
    <style type="text/css">
        .sNombreProducto {
            font-size: 18px;
            color: #004B95;
            font-weight: bold;
        }

        .sNombreProducto-CLARO {
            font-size: 18px;
            color: #950000;
            font-weight: bold;
        }

        .sBorde {
            border-bottom: solid 5px #A1C8FD;
            border-left: solid 5px #6EB6D4;
            border-right: solid 5px #6EB6D4;
        }

        .sBorde-CLARO {
            border-bottom: solid 5px #fda1a1;
            border-left: solid 5px #d46e6e;
            border-right: solid 5px #d46e6e;
        }

        .modal-cont {
            display: none;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 999999;
        }

        .content {
            margin: 0px auto;
            margin-top: 120px;
            position: relative;
            padding: 10px;
            width: 380px;
            min-height: 200px;
            border-radius: 10px;
            box-shadow: 0 2px 5px #666666;
            background-color: #9e8e8e;
            border-bottom: solid 5px #e6cece;
            border-left: solid 5px #987b7b;
            border-right: solid 5px #987b7b;
        }

        .content-titulo {
            border-bottom: solid 1px;
            margin: 0px 10px 20px 10px;
            padding: 10px 10px 10px 10px;
            text-align: center;
            color: White;
            font-size: 18px;
            font-weight: bold;
        }

        .popup-overlay {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #777777;
            opacity: 0.7;
        }
    </style>
</head>
<body text=".:Gestión Móvil:.">
    <form id="form1" runat="server" method="post">
        <asp:HiddenField ID="hdfNocerrarSesion" runat="server" />
        <asp:HiddenField ID="hdfCaptcha" runat="server" />
        <asp:HiddenField ID="hdfIpNode" runat="server" />
        <asp:HiddenField ID="hdfPuertoNode" runat="server" />
        <br />
        <table id="divLoginPrincipal"
            border="0" width="1000px" align="center"
            style="background-image: url(common/images/login/fondo_login_03.png); background-repeat: no-repeat; vertical-align: middle; display: none;">
            <tr>
                <td colspan="2">
                    <table width="100%">
                        <tr>
                            <td align="center">
                                <div id="dvTiempoRestante" align="center" class="pContenedor" style="float: right;">
                                </div>

                                <img alt="" src="Common/Images/Login/barra_logos_2.png" style="height: 66px; float: left;" />



                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td valign="top">
                    <table border="0" width="660px" cellspacing="0">
                        <tr height="505px">
                            <td>&nbsp;
                            </td>
                            <td valign="top" width="100%">
                                <%--<br />
                            <div id="slider" style="height: 100%; padding-top: 70px; display: none;">
                                <ul>
                                    <li>
                                        <img src="Common/Images/Login/banner_bbva.gif" height="90%" width="100%" alt="" /></li>
                                </ul>
                            </div><br /><br />
                                --%>
                                <div id="slider1_container" style="position: relative; top: 0px; left: 10px; width: 650px; height: 480px;">
                                    <!-- Slides Container -->
                                    <div id="imgBanner" runat="server" u="slides" style="cursor: move; position: absolute; left: 0px; top: 0px; width: 650px; height: 480px; overflow: hidden;">
                                        <%--<div><img u="image" src="Common/Images/ModeloDispositivo/1.jpg" /></div>
                                    <div><img u="image" src="Common/Images/ModeloDispositivo/10.jpg" /></div>
                                    <div><img u="image" src="Common/Images/ModeloDispositivo/100.jpg" /></div>
                                    <div><img u="image" src="Common/Images/ModeloDispositivo/101.jpg" /></div>
                                    <div><img u="image" src="Common/Images/ModeloDispositivo/102.jpg" /></div>
                                    <div><img u="image" src="Common/Images/ModeloDispositivo/103.jpg" /></div>
                                    <div><img u="image" src="Common/Images/ModeloDispositivo/104.jpg" /></div>
                                    <div><img u="image" src="Common/Images/ModeloDispositivo/105.jpg" /></div>--%>
                                    </div>
                                    <!-- Arrow Navigator Skin Begin -->
                                    <style type="text/css">
                                        /* jssor slider arrow navigator skin 03 css */
                                        /*
                                    .jssora03l              (normal)
                                    .jssora03r              (normal)
                                    .jssora03l:hover        (normal mouseover)
                                    .jssora03r:hover        (normal mouseover)
                                    .jssora03ldn            (mousedown)
                                    .jssora03rdn            (mousedown)
                                    */
                                        .jssora03l, .jssora03r, .jssora03ldn, .jssora03rdn {
                                            position: absolute;
                                            cursor: pointer;
                                            display: block;
                                            background: url(Common/Images/a03.png) no-repeat;
                                            overflow: hidden;
                                        }

                                        .jssora03l {
                                            background-position: -3px -33px;
                                        }

                                        .jssora03r {
                                            background-position: -63px -33px;
                                        }

                                        .jssora03l:hover {
                                            background-position: -123px -33px;
                                        }

                                        .jssora03r:hover {
                                            background-position: -183px -33px;
                                        }

                                        .jssora03ldn {
                                            background-position: -243px -33px;
                                        }

                                        .jssora03rdn {
                                            background-position: -303px -33px;
                                        }
                                    </style>
                                    <!-- Arrow Left -->
                                    <span u="arrowleft" class="jssora03l" style="width: 55px; height: 55px; top: 183px; left: 8px;"></span>
                                    <!-- Arrow Right -->
                                    <span u="arrowright" class="jssora03r" style="width: 55px; height: 55px; top: 183px; right: 8px"></span>
                                    <!-- Arrow Navigator Skin End -->
                                    <%--<a style="display: none" href="">slideshow html</a>--%>
                                </div>

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
                                        </td>
                                    </tr>
                                </table>

                                <div align="center" style="font-weight: bold; font-size: 11px; color: red; text-align: left; display: none;" id="dvMensajeExplorador">
                                </div>
                            </td>
                            <td>&nbsp;
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="300px">
                    <table width="100%" border="0">
                        <tr>
                            <td valign="top">
                                <div id="divProducto" style="background-color: #FCFEFB;">
                                    <table>
                                        <tr height="35px">
                                            <td align="center" style="font-weight: bold; font-size: 14px; color: #2E497A;">
                                                <asp:Label ID="lblNombreProducto" runat="server" Text=""></asp:Label>
                                                <%--PC<span style="color: #EE9922">Sistel</span> M&oacute;vil<span style="color: #EE9922"></span>
                                            2<span style="color: #EE9922">.0</span>--%>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-size: 12px; color: #2D4570;">Plataforma de Gestión de Equipos Móviles:
                                            <ul>
                                                <li>Mis Equipos</li>
                                                <li>Gestión de Pedidos</li>
                                                <li>Gestión de Incidencias</li>
                                                <li>Panel Principal Visor de estados de consultas realizadas</li>
                                            </ul>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr height="5px">
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <div id="dvConfiguracion" runat="server" class="btnNormal k-button" style="font-size: 11px; text-decoration: underline; color: Navy; vertical-align: middle; position: absolute; left: 48%; top: 2px; z-index: 10000;">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="padding-left: 2px;">
                                                <asp:Label ID="lblConfiguracion" runat="server" Text="Configuración"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="divInicioSesion" style="background-image: url(common/images/login/login-central.png); background-repeat: repeat;">
                                    <asp:Login ID="loginPrincipal" runat="server" TitleText="Iniciar Sesión" UserNameLabelText="Usuario"
                                        PasswordLabelText="Contraseña" Height="120px" Width="280px" LoginButtonText="Incio de Sesión"
                                        RememberMeText="Recordar la proxima vez" UserNameRequiredErrorMessage="Campo requerido"
                                        PasswordRequiredErrorMessage="Campo requerido">
                                        <LayoutTemplate>
                                            <table align="center" border="0" width="200px" cellspacing="0">
                                                <tr height="220px">
                                                    <td valign="top" style="">
                                                        <table width="100%" border="0" style="color: White;">
                                                            <tr height="50px">
                                                                <td align="center" colspan="2" style="font-weight: bold; font-size: 14px;">Inicio de Sesi&oacute;n
                                                                <hr />
                                                                </td>
                                                            </tr>
                                                            <tr height="22px">
                                                                <td style="font-weight: bold; font-size: 11px;" align="right">&nbsp;Usuario:
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="UserName" Height="16px" runat="server" Text="" Width="130px" class="fields"
                                                                        Title="Nombre Usuario..." MaxLength="20"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                                                                        ErrorMessage="Campo requerido" ToolTip="Campo requerido" ValidationGroup="loginPrincipal"
                                                                        InitialValue="Nombre Usuario...">*</asp:RequiredFieldValidator>
                                                                </td>
                                                            </tr>
                                                            <tr height="22px">
                                                                <td style="font-weight: bold; font-size: 11px; vertical-align: text-top;" align="right">&nbsp;Contraseña:
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="Password" Height="16px" runat="server" TextMode="Password" Width="130px"
                                                                        class="fields" Title="Contraseña..." MaxLength="200"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" align="right">
                                                                    <span style="font-size: 11px;"><b>(Ingrese su clave &uacute;nica)</b></span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                                                                        ErrorMessage="Campo requerido" ToolTip="Campo requerido" ValidationGroup="loginPrincipal">*</asp:RequiredFieldValidator>
                                                                </td>
                                                            </tr>
                                                            <tr id="filaRecordarme">
                                                                <td></td>
                                                                <td align="left">
                                                                    <asp:CheckBox ID="RememberMe" runat="server" Text="No cerrar sesión"></asp:CheckBox>
                                                                </td>
                                                            </tr>
                                                            <tr id="Tr1" height="15px">
                                                                <td colspan="2">
                                                                    <asp:Label runat="server" Text="¿Olvidó su contraseña?" ID="LblOlvidoContrasena"
                                                                        Style="color: white; text-decoration: underline; font-size: 12px; cursor: pointer;"></asp:Label>
                                                                </td>
                                                            </tr>
                                                            <tr height="22px" id="filaCaptcha">
                                                                <script type="text/javascript">
                                                                    if ($("#hdfCaptcha").val() == "1") {
                                                                        sjcap();
                                                                    }
                                                                </script>
                                                            </tr>
                                                            <tr height="45px">
                                                                <td align="center" valign="middle" colspan="2">
                                                                    <asp:Button ID="LoginButton" runat="server" class="k-button" CommandName="Login"
                                                                        Text="Ingresar" ValidationGroup="loginPrincipal" />
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </LayoutTemplate>
                                    </asp:Login>
                                    <div>
                                    </div>
                                    <table border="0" width="100%" cellpadding="0">
                                        <tr>
                                            <td align="center">
                                                <asp:Label ID="lblMensaje" runat="server" Text="No hay conexión con la base de datos."
                                                    Font-Size="11px" ForeColor="#FFCACA" Font-Bold="true"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <br />
                                <div style="font-size: 9px; width: 100%; top: 100px; text-align: center;" id="dvBotones" runat="server">
                                </div>
                                <br />
                                <asp:Label ID="lblServidor" ForeColor="DarkRed" Font-Size="11px" Font-Bold="true"
                                    runat="server" Text="" Visible="false"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div id="dvConfirmacionClave" style="display: none;">
            Si tiene problemas al ingresar con su clave unica podra generar una clave temporal,
        ¿Desea generarla, para el ingreso al sistema?
        </div>
        <div id="dvRecordarContrasena" class="modal-cont">
            <div class="content">
                <div class="content-titulo">
                    Restablecimiento de Contraseña
                </div>
                <div style="color: #FFFFFF; padding: 0px 0px 8px 15px;">
                    <b>Ingresa tu correo electrónico</b>
                </div>
                <div id="dvCampo" class="dvPanel" style="overflow: auto;">
                    <table style="width: 99%;">
                        <tr height="18px;">
                            <td>
                                <asp:TextBox ID="txtCorreo" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                                <asp:Image ID="imgCorreo" runat="server" Style="vertical-align: middle; display: none;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="height: 18px;">
                                <div id="dvFormatInvalid" style="color: #FFFFFF; font-size: small; display: none;">
                                    El formato del correo no es válido.
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style="margin-top: 2px;">
                    <table width="100%">
                        <tr>
                            <td align="center">
                                <div id="btnEnviar" class="k-button">
                                    <a>Enviar</a>
                                </div>
                                <div id="btnCerrar" class="k-button">
                                    <a>Cerrar</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="dvConfirmacionEnvio" class="modal-cont">
            <div class="content sBorde-CLARO">
                <div class="content-titulo">
                    Restablecimiento de Contraseña
                </div>
                <div style="color: #FFFFFF; padding-bottom: 40px; font-family: Arial; font-size: 15px;">
                    Hemos enviado un correo electrónico a
                <label id="lblCorreoEnvio" style="color: #10589A; font-weight: bold; font-size: 15px !important;">
                </label>
                    . Haz clic en el enlace dentro del correo electrónico para restablecer tu contraseña.
                </div>
                <div style="margin-top: 8px;">
                    <table width="100%">
                        <tr>
                            <td align="right">
                                <div id="btnVolverLogin" class="k-button">
                                    <a>Listo</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="popup-overlay" style="display: none;"></div>
        <%--<script src="<%=UtilitarioGeneral.ObtieneVersionArchivoEstatico("Login.js")%>" type="text/javascript"></script>--%>
    </form>
</body>
</html>
