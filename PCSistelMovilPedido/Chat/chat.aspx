<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="chat.aspx.vb" Inherits="WebSiteCliente.chat" %>

<%@ Register Assembly="WebSiteCliente" Namespace="WebSiteCliente" TagPrefix="ddlGr" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Chat</title>
    <link href="../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/chat.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../Common/Scripts/socket.io.js" type="text/javascript"></script>

    <%--<script src="Chat.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('5 o;5 1W;5 2h;5 V=\'\';5 I=\'\';5 38=\'\';5 W=\'\';5 1e=\'\';5 1A=U;5 1z=1c;5 J=\'\';7 b(a,b,c){1X.4N=a;1X.1x=b;1X.3a=c}$(7(){1W=$("#3p").l();2h=$("#4G").l();k(31()){L}k($.2M.4I&&1r($.2M.4P)<=9){$(\'#w\').12(\'3w\')}V=$("#48").l();38=$("#4f").l();W=$("#4i").l();1e=$("#4o").l();$("#Z").y();2p();o.1l("54",V+","+W+","+1e);$(5g).3d(7(e){k(e.2W==13)L 1c});7 2p(){o=3y.3A("3D://"+1W+":"+2h);o.z("1V",1V);o.z("1S",1S);o.z("1Q",1Q);o.z("21",21);o.z("20",20);o.z("1Y",1Y);o.z("4O",3b);o.z("52",2V);o.z("5d",2P);o.z("5h",2J);o.z("5s",2r);o.z("3r",2X);o.z(\'1p\',7(){o.o.3x()})}$(\'#19\').3z(7(){2Y($(\'#19\').l())});$("#3B").1J(7(){k(3F(\'¿3H 1P?\')){1R.2x()}});$(\'#4k\').1J(7(){5 a=2H 1x();a.3a=$("#19").l().u(\',\')[0];o.1l("4L",a)});$(\'#t\').3d(7(a){k(a.2W==\'13\'){$(\'#1v\').1J()}});$(\'#1v\').1J(7(){5 d=\'\';d=$.4W($("#t").l());d=d.s(/\\</g,\'&2y;\').s(/\\>/g,\'&2G;\');k(d!=\'\'){k(1A==U){5 e=$("#P").11().s(/\'/g,"&#39");5 f=e;5 g=$(\'#19\').l();5 h="-1";5 i="-1";5 j=1;k(g.2q(\',\')>=0){h=g.u(\',\')[0];i=g.u(\',\')[1]}$.1i({1h:"1q",1G:"25.1a/3G",1m:"{\'3K\': \'"+V+"\',"+"\'3P\': \'"+V+"\',"+"\'3Q\': \'"+j+"\',"+"\'3X\': \'"+i+"\',"+"\'43\': \'"+e+"\',"+"\'44\': \'"+f+"\',"+"\'46\': U, \'J\':\'"+J+"\'}",1n:"1o/K; 1u=1y-8",1H:"K",1I:7(a){5 b=a.d.u("|")[1];I=\'\'+1r(a.d.u("|")[1].s(\'4M\',\'\'),10);1g(W,d,"#2E");o.1l("2F",V+"|"+W+"|"+1e+"|"+d+"|"+I+"|"+e+"|U|"+26()+\'-\'+27()+\'-\'+2I()+"|"+J);$("#t").l(\'\');$("#t").18();$("#w").Y($("#w")[0].X);$("#5i").B("5k 1j 32: "+b);1A=1c},1k:7(a,b,c){}})}M{1g(W,d,"#2E");o.1l("2F",V+"|"+W+"|"+1e+"|"+d+"|"+I+"|||"+26()+\'-\'+27()+\'-\'+2I()+"|"+J);$("#t").l(\'\');$("#t").18();$("#w").Y($("#w")[0].X)}}M{$("#t").18()}});$.3s(3t,7(d){$.1i({1h:"1q",1G:"25.1a/3u",1m:"{}",1n:"1o/K; 1u=1y-8",1H:"K",1I:7(a){k(a.d!=""){d.3c();$("#Z").m();$("#H").m();$("#F").m();$("#R").y();5 b="1Z 1x, 2u 3C 2v 3Eón.";$("#15").B(b);1R.2x()}},1k:7(a,b,c){d.3c();1R.2z.3I(\'3J.1a\')}})})});7 2r(a){22{k(1r(a)>1r($("#3N").l())){o.1p();$("#Z").m();$("#H").m();$("#F").m();$("#R").y();5 b=\'\';b=$("#3O").l();$("#15").B(b)}}23(24){}}7 2Y(d){k(d.2q(\',\')>=0){5 e=d.u(\',\')[0];5 f=d.u(\',\')[1];$.1i({1h:"1q",1G:"25.1a/3V",1m:"{\'5v\': \'"+e+"\',\'42\':\'"+f+"\'}",1n:"1o/K; 1u=1y-8",1H:"K",1I:7(a){$("#P").11(a.d);$("#P").1M({"G":"#45"})},1k:7(a,b,c){2K(a,b,c)}})}M{$("#P").11(\'\')}}7 47(d){$("q .49").2N(\'29-2f-2l\');$("q .4v").2N(\'29-2f-2l\');$(d).4x(\'29-2f-2l\');$(\'q #w\').3o();5 e=$(d).2n("2Z");5 f=\'\';5 g=\'\';g=\'<q A="1N" E="12: 1O%; B-1s: 1t; 1b-3g:3h 3i 3l; 14-1T: 1U-14;">\';g+=\'<1w 1b="0" 2s="0" 2t="0" 12="3q%"><T><S 2w="1"> \';g+=\'<r  E="v-Q:2A; v-2B: 2C; G: #2D;v-1B:1C; v-Q:1D;">\';g+=\'(\'+\'{1E}\'+\' - \'+\'{1F}\'+\') {1d}</r> </S></T>\';g+=\'<T><S>&O;<r  E="G: #2L;v-1B:1C; v-Q:1D;">\';g+=\'{1f}\'+\' </S></T></1w></q><28>\';$.1i({1h:"1q",1G:"1P.1a/3L",1m:"{\'3M\': \'16\'}",1n:"1o/K; 1u=1y-8",1H:"K",1I:7(a){$(\'q #2O\').3o();$(\'q #2O\').N(\'<q E="12: 1O%; B-1s: 1t; 2Q:2R; v-Q:3R; ">3Són: \'+"3T 3U ... "+\'</q>\');k($(a.d).2S==0){$(\'#w\').N(\'<q A="1N" 2Z="3W" E="12: 1O%; B-1s: 1t; 2Q: 2R;"> <p><r  E="v-Q:3Y; G:3Z;">40 41</r></p></q>\');$(\'q #2T\').y(\'2U\');L}2a(5 i=0;i<$(a.d).2S;i++){5 b=a.d[i].2b.2c(6,8)+\'/\'+a.d[i].2b.2c(4,6)+\'/\'+a.d[i].2b.2c(0,4);f=g;f=f.s(\'{1d}\',a.d[i].V.2d());f=f.s(\'{1E}\',b);f=f.s(\'{1F}\',a.d[i].4a.2d());f=f.s(\'{1f}\',a.d[i].4b.2d());$(\'#w\').N(f)}$(\'q #2T\').y(\'2U\',4c,7(){$("#w").Y($("#w")[0].X)});$("#t").18()},1k:7(a,b,c){2K(a,b,c)}})}7 4d(a){a=a.s(/[\\[]/,"\\\\\\[").s(/[\\]]/,"\\\\\\]");5 b=2H 4e("[\\\\?&]"+a+"=([^&#]*)"),2e=b.4g(2z.4h);L 2e==30?"":4j(2e[1].s(/\\+/g," "))}1Y=7(a){$("#Z").m();$("#H").y();$("#F").m();$("#R").m()};20=7(){22{o.1p()}23(24){}$("#Z").m();$("#H").m();$("#F").m();$("#R").y();5 a=\'\';a=$("#1K").l();$("#15").B(a)};31=7(){5 a=1c;k($("#4l").l()!="4m"){$("#Z").m();$("#H").m();$("#F").m();$("#R").m();$("#4n").y();5 b=\'\';a=U;2g=($("#1K").l()==\'\'?"1Z 1d, 4p 4q 4r 4s 1j 4t 4u 33 4w 2v 35 1j 4yón 4z 4A 4Bón \'4C 1j 4Dón - 4E 32\' .":$("#1K").l());$("#4F").B(2g)}L a};7 1Q(a){5 b=a.u(",");2a(i 36 b){$("#4H").N($("<37></37>").2n("4J",b[i]).B(b[i]))}}7 1V(a){5 b=a.u(",");k(b[0]==$("#4K").l()){$("#D"+b[1]+" .C").N(\'<q A="2i"><r A="2j">\'+b[0]+\':&O;&O;</r><r A="2k">\'+b[2]+\'</r></q>\');$("#D"+b[1]+" .C").Y($("#D"+b[1]+" .C")[0].X)}M{4Q(b[0]);$("#D"+b[0]+" .C").N(\'<q A="2i"><r A="2j">\'+b[0]+\':&O;&O;</r><r A="2k">\'+b[2]+\'</r></q>\');$("#D"+b[0]+" .C").Y($("#D"+b[0]+" .C")[0].X);k($(\'#D\'+b[0]+\' .C\').1M(\'4R\')==\'4S\'){4T(b[0])}2g=b[0]+" 4U 4V 3e 1f";4X()}}7 1S(a){5 b=a.u(",");$("#D"+b[1]+" .C").N(\'<q A="2i"><r A="2j">\'+"4Y 1P"+\':&O;&O;</r><r A="2k">\'+\'4Z 50\'+\'</r></q>\');$("#D"+b[1]+" .C").Y($("#D"+b[1]+" .C")[0].X)}7 21(a){5 b=a.u(",")}7 51(){3f=U}7 53(){3f=1c}7 1g(a,b,c,d){k(d==30){d=\'1t\'}b=b.s(/\\</g,\'&2y;\').s(/\\>/g,\'&2G;\');5 e=\'\';5 f=\'\';f=\'<1L><q A="1N" E="1b-55: 56;B-1s: \'+d+\'; 1b-3g:3h 3i 3l; 14-1T: 1U-14;57-58:59;">\';f+=\'<1w 1b="0" E="5a-G:\'+c+\';" 2s="0" 2t="0" ><T><S 2w="1"> \';f+=\'<r  E="v-Q:2A; v-2B: 2C; G: #2D;v-1B:1C; v-Q:1D;">\';f+=\'(\'+\'{1E}\'+\' - \'+\'{1F}\'+\') {1d}</r> </S></T>\';f+=\'<T><S>&O;<1L><r  E="12: 5b; 14-1T: 1U-14;G: #2L;v-1B:1C; v-Q:1D;">\';f+=\'{1f}\'+\' </r></1L></S></T></1w></q></1L><28>\';5 g=26();5 h=27();e=f;e=e.s(\'{1d}\',a);e=e.s(\'{1E}\',g);e=e.s(\'{1F}\',h);e=e.s(\'{1f}\',5c(b));$(\'#w\').N(e)}5 2m=\'\';7 3b(a){k(2m==a){L}2m=a;5 b=a.u("|")[1];5 c=a.u("|")[2];5 d=a.u("|")[3];k(d==I){1g(b,c,"#5e","5f");$("#w").Y($("#w")[0].X)}}5 17=\'\';7 2V(a){k(a!=J){L}k(!1z){k(I!=\'\'){17=$("#t").l();$("#t").l("3j 3k");$("#t").2n("2o","2o");$("#1v").m()}M{$("#H").m();$("#F").m();$("#R").y();$("#15").B($("#1K").l())}}}7 2P(){k(!1z){k(I!=\'\'){k(17=="3j 3k"){17=""}$("#t").l(17);$("#t").5j("2o");$("#1v").y()}M{1A=U;$("#H").y();$("#F").m();$("#R").m()}}}7 2J(a){k(I!=\'\'){1z=U;22{o.1p()}23(24){}$("#H").m();$("#F").m();$("#R").y();5 b="1Z 1x, 3m 5l 2u 5m 3m 35.";$("#15").B(b)}}7 2X(a){J=a;k(J!=\'\'){k($(\'#19\').l()!=\'0\'){$("#H").m();$("#F").y();$(\'#w\').11(\'\');$("#t").l(\'\');$("#t").18()}M{$("#P").11(\'5n 33, 5o 3e 5p.\');$("#P").1M({"G":"#3n"})}}M{$("#P").11(\'<28> \'+$("#5q").l());$("#P").1M({"G":"#3n"})}}7 5r(a){5 b=\'\';2a(x 36 a){k(a[x]==34)5t;b=b+5u.3v(a[x])}L b}', 62, 342, '|||||var||function|||||||||||||if|val|hide||socket||div|span|replace|txtDescripcionDetalle|split|font|pnlDetalle||show|on|class|text|chatboxcontent|chatbox_|style|dvChatMensaje|color|dvChatInicio|IdTicket|CodTecnicoAsignado|json|return|else|append|nbsp|dvDescripcionTipo|size|dvSinAdministrador|td|tr|true|IdUsuario|DescripcionUsuario|scrollHeight|scrollTop|dvConectando||html|width||word|lblSinAdministrador||UltimoValorEscrito|focus|ddlTipoIncidencia|aspx|border|false|usuario|TipoUsuario|mensaje|fnAgregarMensaje|type|ajax|de|error|emit|data|contentType|application|disconnect|POST|parseInt|align|left|charset|dvEnviarMensaje|table|Usuario|utf|TicketCerrado|PrimerMensaje|family|Verdana|11px|fecha|hora|url|dataType|success|click|hdfMsjSinAdmin|code|css|msm|99|chat|UsuariosLogeados|window|MensajeNoUsuario|wrap|break|MensajeUsuario|IPServer|this|fnAdministradoresConectados|Estimado|fnSinAdministradores|AlgunUsuarioDesconectado|try|catch|err|Chat|ObtieneFechaGeneral|ObtieneHoraGeneral|br|ui|for|FechaRegistro|substring|toString|results|state|Mensaje|PuertoServer|chatboxmessage|chatboxmessagefrom|chatboxmessagecontent|active|UltimaDataMensajeAdministrador|attr|disabled|iniciarSocket|indexOf|fnTotalUsuariosConectados|cellpadding|cellspacing|ha|su|colspan|close|lt|location|8pt|weight|bold|00338D|E7F3FC|EnviaMensajeParaAdministrador|gt|new|ObtieneNumeroAleatorio|fnAdministradorCerroTicket|MostrarErrorAjax|626262|browser|removeClass|pnlHeadDetalle|fnAdministradorConectado|overflow|auto|length|pnlPrincipaldetalle|drop|fnAdministradorDesconectado|which|fnTecnicoAsignado|fnObtieneDescripcionTipo|id|null|fnSinAccesoXGrupoOrigen|Ticket|favor||ticket|in|option|NombreUsuario||TipoTicket|fnMensajeAdministrador|stop|keypress|un|Foco|bottom|1px|solid|Administrador|Desconectado|white|el|A80032|empty|hdfIpNode|100|TecnicoAsignado|timer|3000|VerificaSesion|fromCharCode|370|reconnect|io|change|connect|dvSalirChat|finalizado|http|sesi|confirm|RegistrarTicket|Cerrar|href|Login|pUsuario|obtenerDetalleTicket|p_inCod|hdfUsuariosMaximos|hdfMsjAdminSaturado|pUsuarioRegistro|pMedioContacto|10pt|Descripci|Alguna|descripcion|GetDescripcionTipo|comodin|pTipificacion|12pt|red|INGRESE|DETALLE|iddetalletipo|pAsunto|pDescripcion|000000|pEsChat|callBackHideObtenerDetalle|hfIdUsuario|btnTicket|HoraRegistro|Descripcion|300|getParameterByName|RegExp|hfNombreUsuario|exec|search|hfDescripcionUsuario|decodeURIComponent|dvEntrarChat|hdfGrupoOrigenFam|True|dvSinAccesoXGrupoOrigen|hfTipoUsuario|para|ingresar|este|tipo|consulta|por|btnTicketChat|registre|addClass|atenci|en|la|opci|Canal|Atenci|Registrar|lblSinAccesoXGrupoOrigen|hdfPuertoNode|lstUsuarios|msie|value|hdfUsuario|ValidarTecnicoDisponible|TCK|P_inCod|MensajeAdministrador|version|chatWith|display|none|MaximizaChat|te|envio|trim|ParpadeaPagina|admistrador|No|existe|onFocus|AdministradorDesconectado|onBlur|IniciaConexion|radius|7px|margin|top|0px|background|250px|fnVerificarEmoticones|AdministradorConectado|FDFBE9|right|document|AdministradorCerroTicket|lblTicket|removeAttr|Nro|administrador|cerrado|Por|selecciona|motivo|hdfMsjSinAdminDisponible|fnConvertirMatrizToString|TotalUsuariosConectados|continue|String|idtipo'.split('|'), 0, {}))
    </script>
</head>
<body style="overflow:hidden;" scroll="no">
    <form id="form1" runat="server" onKeypress="if(event.keyCode == 13) event.returnValue = false;">
    <asp:HiddenField ID="hfNombreUsuario" runat="server" />
    <asp:HiddenField ID="hfIdUsuario" runat="server" />
    <asp:HiddenField ID="hfIdTicket" runat="server" />
    <asp:HiddenField ID="hfDescripcionUsuario" runat="server" />
    <asp:HiddenField ID="hfTipoUsuario" runat="server" />
    <asp:HiddenField ID="hdfMsjSinAdmin" runat="server" />
    <asp:HiddenField ID="hdfMsjSinAdminDisponible" runat="server" />
    <asp:HiddenField ID="hdfMsjAdminSaturado" runat="server" />
    <asp:HiddenField ID="hdfUsuariosMaximos" runat="server" />
    <asp:HiddenField ID="hdfGrupoOrigenFam" runat="server" />
    <asp:HiddenField ID="hdfIpNode" runat="server" />
    <asp:HiddenField ID="hdfPuertoNode" runat="server" />
    <div>
        <table id="tbChat" width="390px" border="0">
            <tr>
                <td>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                        <td><img src="../Common/Images/Chat/company_logo.png" /></td>
                        <td >
                            <div id="dvSalirChat" class="k-button"> 
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="../Common/Images/Chat/cerrar.png" /></td>
                                    <td>Salir</td>
                                </tr>
                            </table>
                            </div>
                        </td>
                        </tr>
                    </table>
                     
                </td>
            </tr>
            <tr height="10px">
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="dvConectando" style="display: none;" align="center">
                        <br /><br />
                        <img src="../Common/Images/Chat/loading.gif" />
                    </div>
                    <div id="dvChatInicio" style="display: none;"> 
                        <table width="100%" cellspacing="0">
                            <tr>
                                <td>
                                    ¿Cuál es el motivo de ingreso al chat?
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ddlGr:DropDownListGrouped ID="ddlTipoIncidencia" Width="380px" Font-Names="Verdana"
                                        Font-Size="11px" runat="server">
                                    </ddlGr:DropDownListGrouped>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="dvDescripcionTipo">
                                    </div>
                                </td>
                            </tr>
                            <tr height="10px">
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                
                                            </td>
                                            <td align="right">
                                                <div id="dvEntrarChat" class="k-button">
                                                    Continuar
                                                    <img src="../Common/Images/Chat/next.png" />
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="dvChatMensaje" style="display: none;">
                        <asp:Label ID="lblTicket" runat="server" Font-Names="Verdana" Font-Size ="11px" Font-Bold="true" Text="Ticket"></asp:Label>
                        <div id="pnlDetalle" style="width: 95%; height: 350px; margin-bottom: 10px; overflow: scroll;overflow-x: hidden;" class="dvPanel">
                        </div>
                        <div style="width: 100%; height: 20px; position: relative; left: 0px; top: 0px;">
                            <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%">
                                <tr>
                                    <td align="left" width="82%">
                                        <input type="text"  id="txtDescripcionDetalle" value="" style="width: 295px;" />
                                    </td>
                                    <td align="center" width="15%">
                                        <div id="dvEnviarMensaje" class="k-button">
                                            <table width="100%" border="0" cellpadding ="0"  cellspacing ="0">
                                                <tr>
                                                    <td><img src="../Common/Images/Chat/write.png" /></td>
                                                    <td>&nbsp;Enviar</td>
                                                </tr>
                                            </table>
                                            
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div id="dvSinAdministrador" style="display: none;">
                        <table border="0"  align="center" width="350px">
                            <tr>
                                <td>
                                    <asp:Label ID="lblSinAdministrador" runat="server" Text=""></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div id="dvSinAccesoXGrupoOrigen" style="display: none;">
                        <table border="0"  align="center" width="350px">
                            <tr>
                                <td>
                                    <asp:Label ID="lblSinAccesoXGrupoOrigen" runat="server" Text=""></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </div>

                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
