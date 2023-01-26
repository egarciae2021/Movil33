<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Incidencia.aspx.vb" Inherits="WebSiteCliente.Incidencia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.panelbar.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Pedido/Pedido.css" rel="stylesheet" type="text/css" />
    
<%--    <script src="../Pedido/Pedido.js" type="text/javascript"></script>--%>

    <%--<script src="Incidencia.js" type="text/javascript"></script>  --%>
    <script type="text/javascript">
        eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('q 1N;q 4U;q 4W=[];q 50;q 51;q 54;q 4u;q 4z;q 4L=1B;q 14;q Q=\'\';q S=\'\';q J;q A,F;q 19,3t;q 4Q;q 1g="";$(7(){$("#34").x();r(2c.59.5a!=$("#5T").u()){2c.2L.2t=\'../4N.1b\';1q}3N();$("#3S").1k();$("#18").2i(\'55\',\'56\');3a();7 3N(){19=31(\'5N\');3t=31(\'5Q\');$(".k-6y-4l").3c("12",7(){J=(S.z==2d?"1d":S.z);A="";r(J=="1d"){A=$("#2o").u();F=1}r(J=="Có2n"){A=$("#1Q").u();F=2}r(J=="27ón"){A=$("#24").u();F=3}r(J=="1j"){F=4}1L()});r(19!=0){$("#2m > s").x();2J(\'\',19,1)}O{$("#2l").x();$("#3S").1k();$(".2k").1G("1y");$("#3b").1J("1y");$("#2m > s").x(0,7(){$("#4i").16(2T)})}$(\'#2o\').2j(7(a){r(a.2F==\'13\'){J=(S.z==2d?"1d":S.z);A="";r(J=="1d"){A=$("#2o").u();F=1}1L()}});$(\'#1Q\').2j(7(a){r(a.2F==\'13\'){J=(S.z==2d?"1d":S.z);A="";r(J=="Có2n"){A=$("#1Q").u();F=2}1L()}});$(\'#24\').2j(7(a){r(a.2F==\'13\'){J=(S.z==2d?"1d":S.z);A="";r(J=="27ón"){A=$("#24").u();F=3}1L()}});$("#64").69(\'12\',7(){J=(S.z==2d?"1d":S.z);A="";r(J=="1d"){A=$("#2o").u();F=1}r(J=="Có2n"){A=$("#1Q").u();F=2}r(J=="27ón"){A=$("#24").u();F=3}r(J=="1j"){F=4}1L()});$("#4f").4d({2Q:3a});$("#4C").4J({2Q:7(e){14=15.4O();1L()}});14="";4c();$("#2Z").12(7(){$("#30").1G("23");$("#2Z").1J("23");$("#4b").x(0,7(){$("#49").16(Z)})});$("#30").12(7(){$("#2Z").1G("23");$("#30").1J("23");$("#49").x(0,7(){$("#4b").16(Z)})});$(\'#18\').2j(7(a){r(a.2F==\'13\'){2B($("#1O").u(),19)}});$("#57").12(7(){2B($("#1O").u(),19)});$(\'.3f\').43(7(){$(15).2w({2v:\'42\',2u:\'68\'},Z)},7(){$(15).2w({2v:\'41\',2u:\'6d\'},Z)});$(\'.3f\').12(7(){$(\'.3f\').1G("23");$(15).1J("23")});$("#3b").12(7(){$(".2k").1G("1y");$("#3b").1J("1y");$("#2m > s").x(0,7(){$("#4i").16(2T)})});$("#2l").12(7(){$(".2k").1G("1y");$("#2l").1J("1y");$("#2m > s").x(0,7(){$("#3U").16(2T)})});$("#4o").12(7(){4q.2L.2t="4t.1b"});$("#21").4x("2O>G","4D",7(e){q a=$(15).4F();2J($("#1O").u(),\'\',1);$("#21 2O > G ").32(a).T("35-L","1u");$("#21 2O > G ").32(a).T("t-1m","3R")});$(\'.2k\').43(7(){$(15).2w({2v:\'42\',2u:\'4X\'},Z)},7(){$(15).2w({2v:\'41\',2u:\'4Y\'},Z)});$("#24,#1Q").3c("2j",4Z)}7 1L(){q e=$("#3O").u();q f=$("#2g").u();Q="";2f(i=0;i<14.H;i++){r($.1o(14[i])=="2W"){Q+="|3M|,|3L|,|3K|,"}O r($.1o(14[i])=="3J"){Q+="|3I|,"}O r($.1o(14[i])=="3H"){Q+="|3G|,"}}$.1f({1l:"1E",1e:"1v.1b/4w",R:"{\'2E\': \'"+\'-1\'+"\',"+"\'3h\': \'"+\'3i\'+"\',"+"\'3j\': \'"+$("#2g").u()+"\',"+"\'3k\': \'"+\'-1\'+"\',"+"\'3l\': \'"+e+"\',"+"\'3m\': \'"+(Q==""?"-1":Q.2b(0,Q.H-1))+"\',"+"\'3o\': \'"+\'-1\'+"\',"+"\'3p\': \'"+F+"\',"+"\'3r\': \'"+A+"\',"+"\'2P\': \'"+\'-1\'+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(a){1N=a.d;q b=2s 5H.R.5J({R:1N,3F:10});q c=$("#21").R("37");c.66(b);q d=$("#21").R("37");d.38("G:32(1)")},1h:7(a,b,c){1K(a,b,c)}})}7 3a(){q a=$("#4f").R("4d");q b=a.38();S=a.2S(b);6A(S.z){2H"1d":F=1;A="";$("#2a").x();$("#2h").x();$("#28").x();$("#2o").u(\'\');$("#29").16(Z);N;2H"Có2n":F=2;A="";$("#2a").x();$("#29").x();$("#28").x();$("#1Q").u(\'\');$("#2h").16(Z);N;2H"27ón":F=3;A="";$("#2h").x();$("#29").x();$("#28").x();$("#24").u(\'\');$("#2a").16(Z);N;2H"1j":F=4;A="";$("#2h").x();$("#29").x();$("#2a").x();$("#28").16(Z);N;4y:F=4;A="";$("#2h").x();$("#29").x();$("#2a").x();$("#28").16(Z);N}}7 4c(){q d=$("#3O").u();q f=$("#2g").u();2f(i=0;i<14.H;i++){r($.1o(14[i])=="2W"){Q+="|3M|,|3L|,|3K|,"}O r($.1o(14[i])=="3J"){Q+="|3I|,"}O r($.1o(14[i])=="3H"){Q+="|3G|,"}}$.1f({1l:"1E",1e:"1v.1b/3E",R:"{\'2E\': \'"+\'-1\'+"\',"+"\'3h\': \'"+\'3i\'+"\',"+"\'3j\': \'"+f+"\',"+"\'3k\': \'"+\'-1\'+"\',"+"\'3l\': \'"+d+"\',"+"\'3m\': \'"+(Q==""?"-1":Q.2b(0,Q.H-1))+"\',"+"\'3o\': \'"+\'-1\'+"\',"+"\'3p\': \'"+F+"\',"+"\'3r\': \'"+A+"\',"+"\'2P\': \'"+\'-1\'+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(c){1N=c.d;r(1N.H==0){$("#34").1k()}O{$("#34").x()}$("#21").37({4A:{R:1N,3F:10},4B:3D,3C:"4E",2Q:7(e){q a=15.38();2f(q i=0;i<a.H;i++){q b=15.2S(a[i]);$("#1O").u(b.2G)}},4G:1B,4H:{4l:1B,4I:5,4K:6,4M:{6S:"í3B 4P pá4R",3q:"{0}-{1} 4T {2} í3B",2N:""}},4V:[{1Z:"3A",1H:"Có2n",y:"3z"},{1Z:"1I",1H:"52",y:"53"},{1Z:"2V.3y",1H:"2V",y:"3z",3x:1B},{1Z:"1S",1H:"27ón",y:"58"},{1Z:"1j.1R",1H:"1j",y:"3w"},{1Z:"5c",1H:"5n",y:"3w",3x:1B},{5o:{z:"5p",12:7(e){q a=$(e.5u).5v("G");q b=15.2S(a);$("#1O").u(b.2G);2J($("#1O").u(),\'\',1);$(a).T("35-L","1u");$(a).T("t-1m","3R")}},1H:" ",y:"5x"}]})},1h:7(a,b,c){1K(a,b,c)}})}7 3D(){q a=$(".k-3C > 2O > G");2f(q i=0;i<a.H;i++){r(a[i].5B[5].5G==\'2q\'){$(a[i]).T("35-L","#5I");$(a[i]).T("t-1m","1M")}}}7 31(a){q b=2s 5K(\'[\\\\?&]\'+a+\'=([^&#]*)\').5L(2c.2L.2t);r(!b){1q 0}1q b[1]||0}7 2B(e,f){q d=2s 5M();q g=d.5O().v();q h=d.5V().v();q i=d.5W().v();r(g.H==1){q g="0"+g}r(h.H==1){q h="0"+h}r(i.H==1){q i="0"+i}q j=g+":"+h+":"+i;q k=$(\'#18\').u().36(/\'/g,"&#39");q l=d.6a();q m=d.6f()+1;q año=d.6z();l=(l<10)?\'0\'+l:l;m=(m<10)?\'0\'+m:m;q n=l+\'/\'+m+\'/\'+año;r(e==""&&f==""){2x("6D 4n 1N");1q}r($.1o(k).H==0||$.1o(k)==""){$("#18").2y();1q}$.1f({1l:"1E",1e:"1v.1b/2B",R:"{\'4p\': \'"+(e==""?2z(f.2b(3,f.H)):e)+"\',"+"\'4r\': \'"+$("#2g").u()+"\',"+"\'4s\': \'"+$.1o(k)+"\',"+"\'1g\': \'"+1g+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(a){r(a.d<0){2x(\'3v 3u 4vó 1i\');1q}q b=$(\'#3T\').z();r(b.H!=0){$(\'#P\').2N()}r(1g==""){$(\'#P\').1t(\'<s I="1n" w="y: X%; z-1x: 1r; 1w:1s; U-26:1F 22 1u; E-1a: N-E;"><Y U="0" 1P="0" 1T="0" y="1V%"><G><B 1Y="2" w="y: X%;"><M  w="t-D:25; t-1m: 1M; L: #2M; t-W:V; t-D:11;">(\'+n+\' - \'+j+\') - \'+$(\'#2I\').u()+\' 20 : </M></B><B w="y: 10%;"></B></G></Y><s I="1i"  w="L: 1X;t-W:V; t-D:11;">\'+k+\' </s></s><1W>\')}O{$(\'#P\').1t(\'<s I="1n" w="y: X%; z-1x: 1r; 1w:1s; U-26:1F 22 1u; E-1a: N-E;"><Y U="0" 1P="0" 1T="0" y="1V%"><G><B 1Y="2" w="y: X%;"><M  w="t-D:25; t-1m: 1M; L: #2M; t-W:V; t-D:11;">(\'+n+\' - \'+j+\') - \'+$(\'#2I\').u()+\' 20 : </M></B><B><s I="2Y"  2K="2e(\\\'\'+1g+\'\\\',2,\'+a.d+\')"  ></s></B></G></Y><s I="1i"  w="L: 1X;t-W:V; t-D:11;">\'+k+\' </s></s><1W>\');3g(1g)}$("#P").3P($("#P")[0].3Q);$("#18").u(\'\');$("#18").2y();$(".1n").T("E-1a","N-E");$(".1i").T("E-1a","N-E")},1h:7(a,b,c){1K(a,b,c)}})}7 2J(e,f,g){r(g==1){$("#2l").1k();$(".2k").1G("1y");$("#2l").1J("1y");$("#2m > s").x(0,7(){$("#3U").16(5b)})}$(\'s #P\').2N();$("#18").u(\'\');$("#18").2y();$.1f({1l:"1E",1e:"1v.1b/3E",R:"{\'2E\': \'"+(e==""?"-1":e)+"\',"+"\'3h\': \'"+(f==""?\'3i\':f)+"\',"+"\'3j\': \'"+$("#2g").u()+"\',"+"\'3k\': \'"+\'-1\'+"\',"+"\'3l\': \'"+\'-1\'+"\',"+"\'3m\': \'"+\'-1\'+"\',"+"\'3o\': \'"+\'-1\'+"\',"+"\'3p\': \'"+\'-1\'+"\',"+"\'3r\': \'"+\'\'+"\',"+"\'2P\': \'"+\'-1\'+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(a){q b=a.d[0].1I.2p(6,8)+\'/\'+a.d[0].1I.2p(4,6)+\'/\'+a.d[0].1I.2p(0,4);q c=a.d[0].1I.2p(9,17);q d=b.v()+\' \'+c.v();$("#5d").z(a.d[0].1I.v());$("#5e").z(a.d[0].3A.v());$("#5f").u(a.d[0].2V.3y.v());$("#5g").u(a.d[0].5h.1R.v());$("#5i").u(a.d[0].1d.36("&#39","\'"));$("#5j").u(a.d[0].1S.36("&#39","\'"));$("#5k").u(a.d[0].1j.1R.v());r(a.d[0].1j.1R.v()=="2W"||a.d[0].1j.1R.v()=="5l"||a.d[0].1j.1R.v()=="5m"){$("#18").2i("2r","2r");$("#3s").x();$("#2X").T("3q","5q")}O{$("#18").5r("2r","2r");$("#3s").1k();$("#2X").T("3q","5s")}r(a.d[0].5t.v()=="1B"){$(\'#3V\').2i(\'3W\',1B)}O{$(\'#3V\').2i(\'3W\',2q)}},1h:7(a,b,c){1K(a,b,c)}});$.1f({1l:"1E",1e:"1v.1b/5w",R:"{\'2E\': \'"+(e==\'\'?2z(19.2b(3,19.H)):2z(e))+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(a){$(\'s #3X\').2N();$(\'s #3X\').1t(\'<s w="y: X%; z-1x: 1r; 1w:1s; t-D:5y; ">27ón: \'+"5z 5A ... "+\'</s>\');r($(a.d).H==0){$(\'#P\').1t(\'<s I="1n" 3Y="3T" w="y: X%; z-1x: 1r; 1w: 1s;"> <p><M  w="t-D:5C; L:5D;">5E 5F</M></p></s>\');$(\'s #3Z\').1k(\'40\');1q}q b="";q c=0;2f(q i=0;i<$(a.d).H;i++){q d=a.d[i].1I.v();r(a.d[i].2U==""){r($("#2I").u().v()==a.d[i].1U.v()){$(\'#P\').1t(\'<s I="1n" w="y: X%; z-1x: 1r; 1w:1s; U-26:1F 22 1u; E-1a: N-E;"><Y U="0" 1P="0" 1T="0" y="1V%"><G><B 1Y="2" w="y: X%;"><M  w="t-D:25; t-1m: 1M; L: #2M; t-W:V; t-D:11;">(\'+d+\' -  \'+a.d[i].2A.v()+\') - \'+a.d[i].1U.v()+\' 20 : </M></B></B></G></Y><s I="1i" w="L: 1X;t-W:V; t-D:11;">\'+a.d[i].1S.v()+\' </s></s><1W>\')}O{$(\'#P\').1t(\'<s I="1n" w="y: X%; z-1x: 1r; 1w:1s; U-26:1F 22 1u; E-1a: N-E;"><Y U="0" 1P="0" 1T="0" y="1V%"><G><B 1Y="2" w="y: 44%;"><M  w="t-D:25; t-1m: 1M; L: #45; t-W:V; t-D:11;">(\'+d+\' -  \'+a.d[i].2A.v()+\') - \'+a.d[i].1U.v()+\' 20 : </M></B></B></G></Y><s I="1i"  w="L: 1X;t-W:V; t-D:11;">\'+a.d[i].1S.v()+\' </s></s><1W>\')}}O{r($("#2I").u().v()==a.d[i].1U.v()){$(\'#P\').1t(\'<s I="1n" w="y: X%; z-1x: 1r; 1w:1s; U-26:1F 22 1u; E-1a: N-E;"><Y U="0" 1P="0" 1T="0" y="1V%"><G><B 1Y="2" w="y: X%;"><M  w="t-D:25; t-1m: 1M; L: #2M; t-W:V; t-D:11;">(\'+d+\' -  \'+a.d[i].2A.v()+\') - \'+a.d[i].1U.v()+\' 20 : </M></B><B><s I="2Y" 2K="2e(\\\'\'+a.d[i].2U+\'\\\',2,\'+a.d[i].2G+\')"  ></s></B></G></Y><s I="1i" w="L: 1X;t-W:V; t-D:11;">\'+a.d[i].1S.v()+\' </s></s><1W>\')}O{$(\'#P\').1t(\'<s I="1n" w="y: X%; z-1x: 1r; 1w:1s; U-26:1F 22 1u; E-1a: N-E;"><Y U="0" 1P="0" 1T="0" y="1V%"><G><B 1Y="2" w="y: 44%;"><M  w="t-D:25; t-1m: 1M; L: #45; t-W:V; t-D:11;">(\'+d+\' -  \'+a.d[i].2A.v()+\') - \'+a.d[i].1U.v()+\' 20 : </M></B><B><s I="2Y" 2K="2e(\\\'\'+a.d[i].2U+\'\\\',2,\'+a.d[i].2G+\')"  ></s></B></G></Y><s I="1i"  w="L: 1X;t-W:V; t-D:11;">\'+a.d[i].1S.v()+\' </s></s><1W>\')}}}$(\'s #3Z\').1k(\'40\',Z,7(){$("#P").3P($("#P")[0].3Q)});$("#18").2y();$(".1n").T("E-1a","N-E");$(".1i").T("E-1a","N-E")},1h:7(a,b,c){1K(a,b,c)}});r(f!=\'\'){$.1f({1l:"1E",1e:"1v.1b/46",R:"{\'47\': \'"+2z(19.2b(3,19.H))+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(a){},1h:7(a,b,c){1K(a,b,c)}})}r(e!=\'\'){$.1f({1l:"1E",1e:"1v.1b/46",R:"{\'47\': \'"+e+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(a){},1h:7(a,b,c){1K(a,b,c)}})}}r($("#5P").u()!="1"){$("#2X").x();$("#P").T("48","5R")}O{2s 5S(\'#2C\',{5U:\'4a.33\',5X:7(a,b){$("<s I=\'5Y\' w=\'5Z-60:1F; 48:61;\'><62 63=\'../2D/65/3n/67.4e\' 2K=\\"3g(\'"+b+"\')\\"/>&3e;&3e;&3e;<M 3Y=\'4g\' w=\'z-6b:6c;\' 4h=\'"+b+"\'>"+b+"</M></s>").6e(\'#2R\');1g=b;$("#2C").x()},6g:7(a,b){r(!(b&&/^(6h|6i|6j|6k|6l|6m|6n|4e)$/i.6o(b))){2x(\'6p 6qá6r\');1q 2q}}})}});7 3g(b){$.1f({1e:"4a.33?6s="+b+"&6t=6u",1l:"6v",6w:2q,6x:1B,1c:7(a){$(\'#2R\').4j("");$("#2C").1k();1g=""}})}7 2e(c,d,e){r(d==1){q f="2D/4k/3n/"+c;$.1f({1e:3d(f),1c:7(a){2c.2L.2t=3d("2D/6B/6C.33?4m="+f)},1h:7(a){6E(\'3v 3u 6Fó 6G 4m a 6H.\');$(\'#2R\').4j("");$("#2C").1k();1g=""}})}O r(d==2){$.1f({1l:"1E",1e:"1v.1b/6I",R:"{\'6J\': \'"+e+"\'}",1z:"1A/K; 1p=1C-8",1D:"K",1c:7(a){q b="2D/4k/3n/"+c;2c.6K(3d(b),\'6L\')},1h:7(a,b){$("#6M").x();2x("6N, 6O: "+a.6P+"\\6Q: "+a.6R)}})}}$("#4g").3c("12",7(){q a=$(15).2i("4h");2e(a,1,4S)});', 62, 427, '|||||||function|||||||||||||||||||var|if|div|font|val|toString|style|hide|width|text|filtro|td||size|word|ValueFiltro|tr|length|class|ValFiltro|json|color|span|break|else|pnlDetalle|valEstado|data|valkendoFiltro|css|border|Verdana|family|99|table|300||11px|click||textEstado|this|fadeIn||txtDescripcionDetalle|CodTicket|wrap|aspx|success|Asunto|url|ajax|vcFileName|error|detalle|Estado|show|type|weight|msm|trim|charset|return|left|auto|append|white|Incidencia|overflow|align|tapSelect|contentType|application|true|utf|dataType|POST|1px|removeClass|title|FechaRegistro|addClass|MostrarErrorAjax|CargarFiltro|bold|ticket|hiddenCodTicket|cellpadding|txtCodigo|Titulo|Descripcion|cellspacing|IdUsuario|100|br|black|colspan|field|dice|gridTicket|solid|tabSelect|txtDescripcion|8pt|bottom|Descripci|ptxtVista|ptxtAsunto|ptxtDescripcion|substr|window|undefined|fnDescargarArchivo|for|hdfIdUsuarioLogeado|ptxtCodigo|attr|keypress|tap|tapDetalle|detalleTaps|digo|txtAsunto|substring|false|disabled|new|href|marginLeft|marginRight|animate|alert|focus|parseInt|HoraRegistro|RegistrarMensajeChat|UploadButton|Common|p_inCod|which|P_inCod|case|hdfIdUsuarioLogeadoNombre|VerDetalle|onclick|location|0072C6|empty|tbody|P_inTipificacion|change|UploadedFile|dataItem|200|NombreArchivo|Usuario|Resuelto|pnlAdjuntar|imagenArchivoAdjunto|dscCelEle|caracCelEle|DevolverParametroURL|eq|ashx|lblSinRegistros|background|replace|kendoGrid|select||onChangeDdl|tapTicket|live|raiz|nbsp|tabDesc|DeleteFile|pCodigoTicket|000000000000|p_inCodUsuario|p_inCodUsuarioRegistro|p_inCodTecnico|p_inCodEstado|Incidencias|P_inCodMedioContacto|P_inFiltro|display|p_strFiltro|textEnviar|TipoMnsje|se|No|70px|hidden|vcNom|80px|CodigoTicket|tems|selectable|onDataBound|BuscarTicketPorEstado|pageSize|PEN|Pendiente|ACT|Activo|DEV|ANU|RES|enlacesLoad|hdfIdTecnico|scrollTop|scrollHeight|normal|generalCarrito|comodin|pSelecDetalle|chkDetChat|checked|pnlHeadDetalle|id|pnlPrincipaldetalle|drop|0px|10px|hover|90|757575|ActualizarTicketsYaLeidos|IdTicket|height|dscCel|UploadHandler|caracCel|ObtenerEstado|kendoDropDownList|png|cmbTipo|filesubido|nombre|pSelecTicket|html|Temporal|refresh|archivo|un|btnNuevoPedido|P_inCodTicket|document|registradoPor|vcDescripcion|Registrar_Incidencia|produc|insert|BuscarTicketFiltro|delegate|default|filaSelec|dataSource|dataBound|ReqVista|dblclick|multiple|index|sortable|pageable|pageSizes|kendoMultiSelect|buttonCount|ale|messages|Login|value|por|cont|gina|null|de|productos|columns|arregloSeleccion|30px|20px|ValidarAlfaNumerico|pedidos|planes|Fecha|100px|creditos|maxlength|118|dvEnviarMensaje|150px|parent|UsuarioConectado|400|LeidoPorUsuario|lblFechaH|lblCodigo|txtDetUsuario|txtDetTipificacion|Tipificacion|txtDetAsunto|txtDetDescripcion|txtDetEstado|Anulado|Devuelto|Leido|command|Detalle|none|removeAttr|block|EsChat|target|closest|obtenerDetalleTicket|65px|10pt|Alguna|descripcion|cells|12pt|red|INGRESE|DETALLE|innerText|kendo|E5E5E5|DataSource|RegExp|exec|Date|ID|getHours|hdfConfig|Tipo|365px|AjaxUpload|hfUsuario|action|getMinutes|getSeconds|onComplete|imgBtn|margin|top|21px|img|src|btnFiltroProducto|Images|setDataSource|remove|15px|bind|getDate|decoration|underline|2px|appendTo|getMonth|onSubmit|txt|doc|docx|xls|xlsx|pdf|jpg|test|Formato|inv|lido|file|accion|delete|GET|cache|async|pager|getFullYear|switch|Controladores|DescargarArchivo|Seleccione|alerta|encontr|el|descargar|DescargarArchivoBD|inIdDet|open|_blank|dvCargando|Error|Estadow|readyState|nEstado|status|itemsPerPage'.split('|'), 0, {}))
    </script>
      
    <!--[if IE 6]>
    <link href="IncidenciaIE.css" rel="stylesheet" type="text/css" />
    <link href="../Pedido/CarritoIE.css" rel="stylesheet" type="text/css" />
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
    <meta name="Generator" content="Microsoft Word 15 (filtered)" />
    <style scoped>
        #organizer {
            width: 300px;
            margin: 0 auto;
            padding: 47px 0 0 0;
            background: url('../Common/Images/orgHead.png') transparent no-repeat 0 0;
        }
        #bottom {
            width: 300px;
            height: 90px;
            background: url('../Common/Images/orgFoot.png') transparent no-repeat 0 0;
        }
        .teamMate:after {
            content: ".";
            display: block;
            height: 0;
            line-height: 0;
            clear: both;
            visibility: hidden;
        }
        .teamMate h2 {
            font-size: 1.4em;
            font-weight: normal;
            padding-top: 20px;
        }
        .teamMate p {
            margin: 5px 0;
        }
        .teamMate img {
            float: left;
            margin: 5px 15px 5px 5px;
            border: 1px solid #ccc;
            height: 85px;
            width: 90px
        }
        
        .teamMateR img {
            float: right;
            margin: 5px 15px 5px 5px;
            border: 1px solid #ccc;
            height: 85px;
            width: 90px
        }
        .miTabla{
            border-collapse:collapse;
            width:99%;
            margin: 0 auto;
        }
        
        .miTabla td{
            padding: 4px;
            border: 0px solid #aeaaaa;
            left: 5%;
        }
        
        .newtap
        {
            padding-left:10px;
        }  
        
        .imagenArchivoAdjunto
        {
           width:17px;
           height:17px; 
           background-image:url('../Common/Images/Incidencias/bajar16x16.png');
           background-repeat: no-repeat; 
        }
        
        .imagenArchivoAdjunto:hover
        {
                cursor:pointer;
                /*box-shadow:0px 0px 3px skyblue;*/
                border-radius:5px;
                background-color: skyblue;
        }
        
        .NewButton
        {
            color: white;
            background: #005c83;    
            box-shadow:2px 2px 2px gray;  
        }
        
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeadoNombre" runat="server" />
    <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <asp:HiddenField ID="hiddenCodTicket" runat="server" />
    <asp:HiddenField ID="hdfConfig" runat="server" />
    <asp:HiddenField ID="hfUsuario"  runat="server" />
    <div id="MostrarDealleFlo" style="position:absolute; left:0px; top:0px; background-color:#003F59; box-shadow:0px 0px 5px gray; padding:3px; border-radius:5px; z-index:999999; display:none; color:White;">Formatos permitidos: <br /> txt,doc,docx,xls,xlsx,pdf,jpg,png</div>
    <div id="global">
    <div id="generalPedido" class="general" >
      <table style="width:99%;" border ="0"> 
      <tr>
          <td style="width:80%;">
            <div id="pTituloPedido" class="pContenedor titulo" style="width: 600px;">            
                    Hist&oacute;rico de Consultas        
            </div>
          </td>
          <td style="width:20%;vertical-align:top;">
            <div id="pBotonesPedido" class="pContenedor" style="width: 170px;">
                <div id="btnNuevoPedido" class="k-button NewButton">
                    Registrar Ticket<span class="k-icon k-i-plus"/>
                </div>
            </div>
          </td>
      </tr>
      </table>
    </div>

        <div id="generalCarrito" class="general" style="margin-top:50px;">
            <div id="cuerpoTaps" style="height: 475px;">
                <div class="navtaps">
                    <div id="tapTicket" class="tap tapSelect newtap">
                        Ticket
                    </div>
                    <div  id="tapDetalle" class="tap tapSelect newtap">
                        Detalle
                    </div>
                </div>

                <div id="detalleTaps" style="height: 470px">
                    <div id="pSelecTicket">
                        <div id="toolBarPro" style="overflow:hidden;">
                            <select style="float:left;" id="cmbTipo" data-placeholder="Seleccione categoria...">
                                <%--<option>Asunto</option>--%>
                                <option>Código</option>
                                <option>Descripción</option>
                                <option selected="selected">Estado</option>
                            </select>
                            <div id="ptxtAsunto" style=" margin-left:15px;float:left; display:none;">
                                <input style=" width:400px; margin-top:5px; height: 26px;" id="txtAsunto" type="text" class="k-textbox"/>
                            </div>
                            <div id="ptxtCodigo" style="margin-left:15px; float:left; display:none; ">
                                <input style=" width:400px; margin-top:5px; height: 26px;" id="txtCodigo" type="text" class="k-textbox"/>
                            </div>
                            <div id="ptxtDescripcion" style="float:left; display:none;">
                                <input style=" margin-left:15px; width:400px; margin-top:5px; height: 26px;" id="txtDescripcion" type="text" class="k-textbox"/>
                            </div>
                            <div id="ptxtVista" style="float:left;">
                                <select style="margin-left:15px; float:left; width:400px;" multiple="multiple" id="ReqVista" data-placeholder="Seleccione Estado...">
                                    <option>Pendiente</option>
                                    <option>Activo</option>
                                    <option>Resuelto</option>
                                </select>
                            </div>
                            <div id="btnFiltroProducto" class="k-button" style="float:right; width:70px; height:26px; margin-right:40px; ">
                                Buscar
                            </div>
                        </div>
                        <div style="margin-top:15px;" id="gridTicket">
                        </div>
                        <asp:Label ID="lblSinRegistros" runat="server" ForeColor="DarkRed" Font-Bold="true" Text="&nbsp;Ud. no tiene incidencias registradas."></asp:Label>
                    </div>
                    <div id="pSelecDetalle"  style="display:none;">
                        <div id="pnlticket" class="dvPanel" style="width: 41%; height: 89%; position: absolute; left: 36px; top: 50px;  padding: 10px; background-image: none;  border-right:1px solid #7EC6E3;">                            
                          <%--<div class="pMedium" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;">--%>
                              <table class="miTabla" border="0" cellpadding="0" cellspacing="0" width="100%" >
                                <tr>
                                  <td style="width: 25%;">
                                    <b>Código</b>
                                  </td>
                                  <td colspan="3">
                                    <span id="lblCodigo" style="width: 95%; font-size:8pt; font-weight: bold; color: blue; font-family:Verdana; font-size:12px;"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td  style="width: 25%;">
                                    <b>Fecha - Hora</b>
                                  </td>
                                  <td  colspan="3">
                                    <span id="lblFechaH" style="width: 95%; font-size:8pt; font-weight: bold; color: blue; font-family:Verdana; font-size:12px;"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b style="width: 25%;">Tipificación</b>
                                  </td>
                                  <td colspan="3">
                                    <input id="txtDetTipificacion" type="text" style="width: 95%; height: 29px;" class="k-textbox" value="" disabled="disabled"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="4">
                                    <b>Asunto</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="4">
                                    <textarea id="txtDetAsunto" style="width: 95%; height: 50px; overflow: auto; resize: none;" cols="20" rows="2" class="k-textbox" disabled="disabled"></textarea>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="4">
                                    <b>Descripción</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="4">
                                      <textarea id="txtDetDescripcion" disabled="disabled" style="width: 95%; height: 220px;  overflow: auto; resize: none; " cols="20" rows="2" class="k-textbox"></textarea>
                                  </td>
                                </tr>
                                <tr>
                                  <td > 
                                    <b>Estado</b>
                                  </td>
                                  <td>
                                    <input id="txtDetEstado" disabled="disabled" type="text"  class="k-textbox" value="" />
                                  </td>
                                  <td >
                                    <b>Chat</b>
                                  </td>
                                  <td >
                                      <input id="chkDetChat" type="checkbox" disabled="disabled"/><span id="lblChat" style="font-size:8pt; font-weight: bold; color: blue; font-family:Verdana; font-size:12px;"></span>
                                  </td>
                                </tr>
                              </table>
                            <%--</div>--%>
                        </div>

                        <div id="pnlPrincipaldetalle" class="dvPanel" style="width: 45%; height: 89%; position: absolute; left: 48.5%; top: 50px;  padding: 10px; background-image: none; border-radius: 5px;">
                            <div id="pnlDetalle" style="width: 95%; height: 335px; margin-bottom: 10px; overflow: auto;" class="dvPanel">
                            </div>
                            <div style="width: 100%; height: 65px; position: relative; left: 0px; top: 0px;">
                                <table id="textEnviar" border="0" cellpadding="0" cellspacing="0" align="center" width="100%">
                                    <tr>
                                        <td align="left" width="82%">
                                            <asp:TextBox ID="txtDescripcionDetalle" TextMode="MultiLine" runat="server" 
                                                Width="280px" class="k-textbox" value="" Style="resize: none; height: 60px;" MaxLength="2"></asp:TextBox>
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
                                    <div id="pnlAdjuntar" style="width: 150px; ">
                                        <div id="UploadStatus"></div>
                                            <div id="UploadButton" align="center" class="imgBtn" style="text-align:left;"> 
                                                <table>
                                                    <tr>
                                                        <td style="text-align:left;">
                                                            <img alt="" src="../Common/Images/Incidencias/subir20x20.png" width="20px" height="20px"/>    
                                                        </td>
                                                        <td style="vertical-align:bottom; text-decoration:underline;">Adjuntar Archivo</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        <div id="UploadedFile"></div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
