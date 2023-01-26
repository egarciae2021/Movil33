<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PedidoPlan.aspx.vb" Inherits="WebSiteCliente.PedidoPlan" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../Common/Styles/KendoUI/kendo.default.min.css" rel="stylesheet" type="text/css" />--%>
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="Pedido.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="pedidoplan.js"></script>

    <%--<script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 4e=\'14 L 9A 2y 7g a 4g 23:3t:3t 6W\';3 3r=Y;3 18;3 24=0;3 z;3 1o=[];3 4n=[];3 G=[];3 r=[];3 1h=E 3O("6Z","70","7a","7lé7m","7A","7V","Sá7W");3 2w=E 3O("8l","8m","8S","8Z","90","91","96","97","98","99","9e","9v");3 2p=E 3O("9y","9z","9H","9I","9L","9M","9N","9O","9P","10","11","12");3 4z=F;3 9U=[];3 3q=Y;3 2t=0;3 32=5;4 3P(a,b,c,d){u.3l=a;u.1Y=b;u.16=c;u.15=d}$(4(){$("#4e").q(4e);j(s.m.5Z!=$("#6f").D()){s.2E.2D=\'../4E.1k\';w}3z();$(s).9K(4(){3z()});57();5g();5R();5T();j(s.m.1S!=2k){$("#9J").1i("<b v=\'2r:9G;\'>Nú3I a 9F 9E : "+s.m.1S+"</b>")}$("#9D").2N(4(){j($(u).9C(\':9B\')){$("#1R").43("R");$("#1R").R(4(){6e()});$(\'#1R\').3k(4(){$(u).2U({H:\'9x\',1v:\'3V\'},1N)},4(){$(u).2U({H:\'3o\',1v:\'9w\'},1N)})}J{$("#1R").43("R");$("#1R").R(4(){1d("4G 4K 4g 4N")});$(\'#1R\').43("3k")}});$("#1R").R(4(){1d("4G 4K 4g 4N")});$("#2B,#2o").4Q("3H",9u);$("#2m").4Q("3H",9t);$(".9s").R(4(){s.2E.2D="../4X/9r/9p.9m?9k=4X/9h/9g.9f"})});4 5T(){$("#2m,#2o,#2B").3H(4(e){j(e.9d==13){$("#5v").R()}});$("#5w").5F({2N:5G});$("#5v").R(4(){5H()});$("#9c").R(4(){s.m.9b()});$("#5Q").R(4(){$(".1W").1X("1m");$("#5Q").1c("1m");$("#21 > o").P(0,4(){$("#68").1n(1V)})});$("#3L").R(4(){3S()});$("#6j").R(4(){$(".1W").1X("1m");$("#6j").1c("1m");$("#21 > o").P(0,4(){$("#6k").1n(1V)})});$(\'.1W\').3k(4(){$(u).2U({6r:\'95\',4q:\'94\'},1N)},4(){$(u).2U({6r:\'93\',4q:\'4t\'},1N)});$("#92").R(4(){$(".1W").1X("1m");$("#3L").1c("1m");$("#21 > o").P(0,4(){2J();40();$("#3j").1n(1V,4(){j(r.A!=0){3 a=E 1g.B.3f({B:r});3 b=$("#3e").B("1L");b.3c(a);3b()}})})});24=$(s).1v()-($("#8Yña").1v()+8X);j(24<=0){24=8W}$("#3e").1L({2g:{B:r},35:Y,3E:1g.2i($("#3E").1i()),3F:1g.2i($("#3F").1i()),1v:24})}4 5g(){4Y=8V;$.8U(4Y.8T,4(i,c){3 d=1K(c["15"]/c["1Y"]*3N);$("#8R").5f(\'<o 1J= "8Q">\'+\'<o 1J="8P">\'+c["3U"]+\'</o>\'+\'<o 1J="2M">\'+1I.1H(c["1Y"],"S/. ")+\'</o>\'+\'<o 1J="5s 2M">\'+1I.1H(c["15"],"S/. ")+\'</o>\'+\'<o 1J="31 2M">\'+1I.1H(c["16"],"S/. ")+\'</o>\'+\'<o 44="2s\'+i+\'" 1J="8O" v="H:8N;"></o><o 1J="5z 2M" v="H:8M; 5B-5C:8L;">\'+d+\' %</o><4j  44="2q\'+i+\'" 1J="8K k-8J k-i-8z k-1P-8x"></o>\');$("#2s"+i).5P({8u:0,8t:c["1Y"],1w:c["15"],8r:Y,5V:Y,8p:{5V:Y}});$($("#2s"+i).m().1E("a")[0]).3Q("y","");$($("#2s"+i).m().1E("a")[1]).3Q("y","");$("#2q"+i).8k({69:"1U 34 38 1u 8j 8g.",8f:{6l:{8e:"6w:89",84:82}},81:"6s"});$("#2q"+i).R(4(){$(".1W").1X("1m");$("#80").1c("1m");$("#21 > o").P(0,4(){2J();40();$("#3j").1n(1V,4(){j(r.A!=0){3 a=E 1g.B.3f({B:r});3 b=$("#3e").B("1L");b.3c(a);3b()}})})});4n.1j(E 3P(c["3U"].17(),C(c["1Y"]),C(c["16"]),C(c["15"])));G.1j(E 3P(c["3U"].17(),C(c["1Y"]),C(c["16"]),C(c["15"])))});j(s.m.1S!=2k){j($("#2x").D()=="0"){3p(0,-(C(s.m.3A)))}}$("#7U").1n(1N,4u,4(){})}4 2J(){$($($("#7S > o")[0]).1E("4j")[0]).q(1I.1H(4w(),"S/. "))}4 40(){3 a=C($($(".31")[1]).q().4x(\' \')[1].7G(/,/g,\'\'));j(a<0){$("#4A").1O("1M","4C");w F}J{$("#4A").1O("1M","3G");w Y}}4 3z(){7z{4F()}7y(e){2q("3J")}}4 4F(){3 a=$("#7x");3 b=a.1E(".k-7n-69");3 c=$(s).1v()-3N;3 d=a.4J()-b.4J();a.1v(c);b.1v(c-d)}4 57(){j(s.m.Z.3l==4u){$($("#4L > o")[0]).q("");$("#4M").q("")}J{$($("#4L > o")[0]).q(s.m.Z.3l);$("#4M").q(s.m.Z.3l)}W(3 i=0;i<s.m.3M.A;i++){j(s.m.3M[i].1y==s.m.Z.1y){$("#7k").q(s.m.3M[i].7j)}}j(s.m.7i){3 a=E 2z(1K(s.m.Z.7h.2A(6,19)));3 b=E 2z(1K(s.m.Z.7d.2A(6,19)));3 c=E 2z(1K(s.m.Z.7c.2A(6,19)));3Z=1h[a.1s()]+\', \'+a.1r()+\' L \'+2w[a.1q()]+\' 2y \'+a.1p();7b=1h[b.1s()]+\', \'+b.1r()+\' L \'+2w[b.1q()]+\' 2y \'+b.1p();3 d=1h[a.1s()]+\', \'+2C(\'0\'+a.1r(),2)+\'/\'+2p[a.1q()]+\'/\'+a.1p();3 e=1h[b.1s()]+\', \'+2C(\'0\'+b.1r(),2)+\'/\'+2p[b.1q()]+\'/\'+b.1p();3 f=1h[c.1s()]+\', \'+2C(\'0\'+c.1r(),2)+\'/\'+2p[c.1q()]+\'/\'+c.1p();$("#79").q(d);$("#77").q(e);$("#73").q(f)}J{j(s.m.72){71()}}}4 5R(){3 g={5e:$("#33").D(),1y:s.m.Z.1y,1x:s.m.1S,5h:\'\',5i:0,5j:0};$.2h({2f:"2e",1Q:"39.1k/5p",B:1G.5r(g),2c:"2b/1a; 2a=29-8",28:"1a",27:4(e){z=1G.26(e.d);W(3 i=0;i<z.A;i++){j(!25){1o.1j(E 2F(z[i].O,z[i].T,z[i].1b,z[i].I,z[i].2G,z[i].2H))}J{j(z[i].3T==z[i].O){1o.1j(E 2F(z[i].O,z[i].T,z[i].1b,z[i].I,z[i].2G,z[i].2H))}}}3 f,3n,2I;j(!25){f=1g.2i($("#6Y").1i());3n=1g.2i($("#6X").1i());2I=[{t:"3W",H:"3o",y:"1t"},{t:"Q",H:"5S",y:"3Y",1e:{v:"q-1l:M;"}},{t:"41",H:"3V",y:"42",1e:{v:"q-1l:M;"}}]}J{f=1g.2i($("#6T").1i());3n=1g.2i($("#6S").1i());2I=[{t:"3W",H:"3o",y:"1t"},{t:"61",H:"3o",y:"62 63"},{t:"Q",H:"5S",y:"3Y",1e:{v:"q-1l:M;"}},{t:"41",H:"3V",y:"42",1e:{v:"q-1l:M;"}}];2I=[{t:"3W",H:"6R",y:"1t"},{t:"61",H:"6Q",y:"62 63"},{t:"Q",H:"66",y:"3Y",1e:{v:"q-1l:M;"}},{t:"41",H:"66",y:"42",1e:{v:"q-1l:M;"}}]}$("#67").1L({2g:{B:1o,3v:12},6N:6a,6b:6c,6L:Y,35:Y,6I:F,49:{4a:F,4b:F,4c:{4d:"1o 2K pá4f",1M:\'<b v="6F-6E: 4t;2r: #6D;">{0}-{1} L {2} 6B</b>\',4k:"4l 6z 1o 6x"}},3E:f,3F:3n,1v:24,4h:2I});j($("#2x").D()!="0"){$.2h({2f:"2e",1Q:"6u.1k/8d",B:"{\'6y\': \'"+$("#2x").D()+"\'}",2c:"2b/1a; 2a=29-8",28:"1a",27:4(a){3 b=1G.26(a.d[0]);3 c=1G.26(a.d[1]);3r=F;W(3 i=0;i<c.A;i++){3 d=4m(c[i].6A);r.1j(d);r[i].1D=c[i].6C}4i()},1P:4(a,b,c){22(a,b,c)}})}},1P:4(a,b,c){22(a,b,c)}})}4 5H(){3 e={5e:$("#33").D(),1y:s.m.Z.1y,1x:s.m.1S,5h:$("#2m").D(),5i:($("#2o").D()==\'\'?0:$("#2o").D()),5j:($("#2B").D()==\'\'?0:$("#2B").D())};$.2h({2f:"2e",1Q:"39.1k/5p",B:1G.5r(e),2c:"2b/1a; 2a=29-8",28:"1a",27:4(a){V=1G.26(a.d);3 b=[];W(3 i=0;i<V.A;i++){j(!25){b.1j(E 2F(V[i].O,V[i].T,V[i].1b,V[i].I,V[i].2G,V[i].2H))}J{j(V[i].3T==V[i].O){b.1j(E 2F(V[i].O,V[i].T,V[i].1b,V[i].I,V[i].2G,V[i].2H))}}}3 c=E 1g.B.3f({B:b,3v:9});3 d=$("#67").B("1L");d.3c(c);j(b.A==0){1d("4l 6G 6Hó ní6J 6K </6d> 6M 47 6O 6P")}},1P:4(a,b,c){22(a,b,c)}})}4 2F(a,b,c,d,e,f){u.O=a;u.T=b;u.1b=c;u.I=d;u.2G=e;u.2H=f}4 45(a,b,c,d,e){u.O=a;u.T=b;u.1b=c;u.I=d;u.1D=e}4 6a(){}4 6c(){j(25){3 g=$(".64");3 h,3u=[];W(3 f=0;f<g.A;f++){h=g[f].44.4x("-")[1];3u=[];W(3 i=0;i<z.A;i++){j(z[i].3T==h){3u.1j(E 5W(z[i].6U+" ("+1I.1H(C(z[i].I)-C($("#6V-"+h).q()),"S/. ")+")",z[i].O,z[i].I))}}$(g[f]).3s({5N:"q",5M:"1w",2g:3u,5D:"5u",5d:F,5c:0,5b:4(e){3 a=e.74.75.76;j(a.A>30){3 b=a.2A(0,20);3 c=a.2A(a.78("("));e.5a.59=4(){w b+"... "+c}}J{e.5a.59=4(){w a}}},2N:4(e){3 a=u.56().4Z;3 b=u.2W.m().m().m().m();$(b[0]).1E(".Q").1i(1I.1H(C(a),"S/. "))}});$(g[f]).B("3s").2W.3Q("7e",F)}}$(".7f").R(4(){3 a;j(!25){a=$.1f($($($(u).m()).1E("o")[1]).q())}J{a=$("#64-"+$.1f($($($(u).m()).1E("o")[1]).q())).B("3s").1w()}j(4U()){1d("1U 34 38 1u lí2T L 2Sé2Q");w}3 b=4m(a);j(r.A!=0){j(3K(0,(C(b.I)-C(r[0].I)))){1d("1U 34 38 1u lí2T L 2Sé2Q");w}3p(0,-C(r[0].I))}J{j(3K(0,C(b.I))){1d("1U 34 38 1u lí2T L 2Sé2Q");w}}r=[];r.1j(b);3p(0,C(b.I));3S()});$(".4I").R(4(){3 d=$.1f($($($(u).m()).1E("o")[1]).q());$.2h({2f:"2e",1Q:"6u.1k/7o",B:"{\'7p\': \'"+d+"\'}",2c:"2b/1a; 2a=29-8",28:"1a",27:4(a){18=a.d;$("#7q").q($.1f(18.T));$("#7r").1i($.1f(18.1b));$("#7s").q($.1f(18.7t.7u));$("#7v").q("S/. "+18.I.7w(2));3 b="";b="";$("#4H").1i("");W(3 i=0;i<18.1T.A;i++){b+="<1z>";b+="<K 7B = \'2\'><o  v=\'7C: 7D 7E #7F; 3D: #7H 1Q(7I/7J-7K-7L.7M) 50% 7N 7O-x; 2r: #7P; 5B: 0.7Q .7R;\'></o></K>";b+="</1z>";b+="<1z>";b+="<K v=\'H: 3w;\'><b>7T</b></K><K>"+$.1f(18.1T[i].T)+"</K>";b+="</1z>";j($.1f(18.1T[i].1b)!=""){b+="<1z>";b+="<K v=\'H: 3w;\'><b>3Bón</b></K><K>"+$.1f(18.1T[i].1b)+"</K>";b+="</1z>"}b+="<1z>";j(18.1T[i].4p==0){b+="<K v=\'H: 3w;\'><b>4o</b></K><K>7X</K>"}J{b+="<K v=\'H: 3w;\'><b>4o</b></K><K>"+1K(18.1T[i].4p)+" - "+$.1f(18.1T[i].7Y.7Z())+"</K>"}b+="</1z>"}$("#4H").5f(b)},1P:4(a,b,c){22(a,b,c)}});$("#6t").48();$("#6q").48()});$(".4I").3k(4(){$(u).83(4(e){$("#6p").1O({"5C":e.85+20,"6s":e.86,"1M":"4C"})})},4(){$("#6p").1O("1M","3G")});$(".87").R(4(){$("#6t").P();$("#6q").P()})}4 3b(){3 c=$(".88");W(3 i=0;i<c.A;i++){$(c[i]).3s({5N:"q",5M:"1w",2g:6o(),5D:"5u",5d:F,5c:0,8a:!(r[i].8b=="0"),6l:4(e){8c=u.1w()},2N:4(e){3 a=$(u)[0].6n;3 b=u.2W.m().m().m().m();r[1K(b[0].6m)].1D=a},6b:4(e){j($("#2x").D()!="0"&&r[i].1D!=-1){u.1w(r[i].1D)}J{3 a=$(u)[0].6n;3 b=u.2W.m().m().m().m();r[1K(b[0].6m)].1D=a}}})}}4 3S(){$(".1W").1X("1m");$("#3L").1c("1m");$("#21 > o").P(0,4(){2J();$("#3j").1n(0,4(){j(r.A!=0){3 a=E 1g.B.3f({B:r});3 b=$("#3e").B("1L");b.3c(a);3b()}})})}4 4m(a){j(!25){W(3 i=0;i<1o.A;i++){j(1o[i].O==a){3 b=1o[i];w E 45(b.O,b.T,b.1b,b.I,-1)}}}J{W(3 i=0;i<z.A;i++){j(z[i].O==a){3 b=z[i];w E 45(b.O,b.T,b.1b,b.I,-1)}}}}4 6o(){3 a=[];W(3 i=0;i<46.A;i++){a.1j({q:46[i],1w:46[i]})}w a}4 4i(){$("#2v").P(1V,4(){j(r.A>0){$("#2v").1O("3D-2r","8h")}J{$("#2v").1O("3D-2r","#8i")}$($("#2v 4j")[0]).q(r.A);$("#2v").48(1V)})}4 4w(){3 a=0.0;W(3 i=0;i<r.A;i++){a=a+C(r[i].I)}w a}4 3p(a,b){G[0]["16"]=C(G[0]["16"]-a);G[0]["15"]=C(G[0]["15"]+a);G[1]["16"]=C(G[1]["16"]-b);G[1]["15"]=C(G[1]["15"]+b);6i()}4 6i(){W(3 i=0;i<G.A;i++){3 a=1K(G[i]["15"]/G[i]["1Y"]*3N);$($(".31")[i]).q(1I.1H(G[i]["16"],"S/. "));$($(".5s")[i]).q(1I.1H(G[i]["15"],"S/. "));$("#2s"+i.17()).B("5P").1w(G[i]["15"]);$($(".5z")[i]).q(a+" %");$($(".31")[i]).1c("2u");$(".2u").1c("2V");3R()}4i()}4 3R(){8n(4(){j(4z){$(".2u").1c("2V")}J{$(".2u").1X("2V")}3q=!3q;2t=2t+1;j(2t>32){2t=32-32;3q=Y;$(".2u").1X("2V")}J{3R()}},8o)}4 4U(){3 a=G[0]["16"];3 b=G[1]["16"];j(a<0){w F}J{w b<0}}4 3K(a,b){3 c=C(G[0]["16"]-a);3 d=C(G[1]["16"]-b);j(c<0){w F}J{w d<0}}4 6e(){j(s.m.5Z!=$("#6f").D()){s.2E.2D=\'../4E.1k\';w}j(r.A==0){1d("1U 5X 8q 2L 8s 47 3m L 2X");w}j(2J()){1d("1U a 8v 1u lí2T L 2Sé2Q, 8w 1u 3m L 2X");w}j(3r&&!5O()){1d("1U 5X a 8y 1u 5K");w}8A("¿8B 8C 8D L 8E 47 5K?<6d>","8F L 2L",4(a){j(a=="8G"){$(".1W").P();$("#21").1O("1M","3G");$("#68").P();$("#3j").P();$("#6k").P();$("#8H").1n(1V,4(){$("#8I").P(0,4(){j(3r){5J()}J{3C()}})})}})}4 3C(){j(r.A==0){1d("5E 2L a 1u 3m L 2X 2K 5A");w}3 e=\'<?5y 5x="1.0" 5l="5k-58-1"?><2Z>\';W(3 i=0;i<r.A;i++){3 f=s.m.1S;3 g=s.m.3A;j(f==2k){f="53 52"}j(g==2k){g="0"}e=e+\'<3y><36>\'+r[i].O.17()+\'</36><T>\'+r[i].T.17()+\'</T><Q>\'+\'0\'+\'</Q><37>\'+r[i].O.17()+\'</37><3a>\'+r[i].I.17()+\'</3a><3g>\'+\'1\'+\'</3g><3h>\'+\'1\'+\'</3h><1x>\'+f+\'</1x><3i>\'+r[i].1D.17()+\'</3i><3x>\'+g+\'</3x></3y>\'}e=e+\'</2Z>\';$.2h({2f:"2e",1Q:"39.1k/3C",B:"{\'4s\': \'"+$("#33").D()+"\',"+"\'4r\': \'"+s.m.Z.1y+"\',"+"\'6v\': \'"+e+"\', "+"\'65\': \'"+s.m.Z.60+"\'}",2c:"2b/1a; 2a=29-8",28:"1a",27:4(a){j(a.d==""){s.2E.2D="../5Y.1k";w}j(a.d=="3J 5U 9a 5L"){2q(a.d);w}3 b=1G.26(a.d);$("#5I").D(b[0].5t);$("#5q").q(b[0].5o);5n(b[0].5m){2O"9i 9j":$("#3d").1c("9l");2l;2O"4l 9n":$("#3d").1c("9o");2l;54:$("#3d").1c("9q");2l}$("#3d").q(b[0].5m);3 c=E 2z();3Z=1h[c.1s()]+\', \'+c.1r()+\' L \'+2w[c.1q()]+\' 2y \'+c.1p();3 d=1h[c.1s()]+\', \'+2C(\'0\'+c.1r(),2)+\'/\'+2p[c.1q()]+\'/\'+c.1p();$("#51").q(d+" "+c.4W()+":"+c.4V());$("#4S").1L({2g:{B:b,3v:7,4D:{t:"4v",6h:[{t:"1C",X:"1B"},{t:"2n",X:"U"},{t:"1Z",X:"U"}]},X:[{t:"1C",X:"1B"},{t:"2n",X:"U"},{t:"1Z",X:"U"}]},35:Y,4R:Y,49:{4a:F,4b:F,4c:{4d:"í2P 2K pá4f",1M:"{0}-{1} L {2} í2P",4k:""}},4h:[{t:"2R",y:"2R",2Y:F},{t:"4y",y:"Í6g",2Y:F},{t:"1C",y:"3Bón",2j:"1A 4O: #=1B#",2d:"1A: #=1B#"},{t:"2n",y:"Q 1C",2j:\'<o v="1F:M">1A: #=U#</o>\',2d:\'<o v="1F:M">Q: #=U#</o>\',1e:{v:"q-1l: M"},4T:"{0:#,#.3t}"},{t:"1t",y:"1t"},{t:"1Z",y:"Q 1t",2j:\'<o v="1F:M">1A: #=U#</o>\',2d:\'<o v="1F:M">Q: #=U#</o>\',1e:{v:"q-1l: M"}},{t:"1x",y:"Nú3I"}]});r=[]},1P:4(a,b,c){22(a,b,c)}})}4 5J(){j(r.A==0){1d("5E 2L a 1u 3m L 2X 2K 5A");w}3 e=\'<?5y 5x="1.0" 5l="5k-58-1"?><2Z>\';W(3 i=0;i<r.A;i++){3 f=s.m.1S;3 g=s.m.3A;j(f==2k){f="53 52"}j(g==2k){g="0"}e=e+\'<3y><36>\'+r[i].O.17()+\'</36><T>\'+r[i].T.17()+\'</T><Q>\'+\'0\'+\'</Q><37>\'+r[i].O.17()+\'</37><3a>\'+r[i].I.17()+\'</3a><3g>\'+\'1\'+\'</3g><3h>\'+\'0\'+\'</3h><1x>\'+f+\'</1x><3i>\'+r[i].1D.17()+\'</3i><3x>\'+g+\'</3x></3y>\'}e=e+\'</2Z>\';$.2h({2f:"2e",1Q:"39.1k/9Q",B:"{\'4s\': \'"+$("#33").D()+"\',"+"\'4r\': \'"+s.m.Z.1y+"\',"+"\'9R\': \'"+$("#2x").D()+"\',"+"\'6v\': \'"+e+"\', "+"\'65\': \'"+s.m.Z.60+"\'}",2c:"2b/1a; 2a=29-8",28:"1a",27:4(a){j(a.d==""){s.2E.2D="../5Y.1k";w}j(a.d=="3J 5U 9S 5L"){2q(a.d);w}3 b=1G.26(a.d);$("#5I").D(b[0].5t);$("#5q").q(b[0].5o);3 c=E 2z();3Z=1h[c.1s()]+\', \'+c.1r()+\' L \'+2w[c.1q()]+\' 2y \'+c.1p();3 d=1h[c.1s()]+\', \'+2C(\'0\'+c.1r(),2)+\'/\'+2p[c.1q()]+\'/\'+c.1p();$("#51").q(d+" "+c.4W()+":"+c.4V());$("#4S").1L({2g:{B:b,3v:7,4D:{t:"4v",6h:[{t:"1C",X:"1B"},{t:"2n",X:"U"},{t:"1Z",X:"U"}]},X:[{t:"1C",X:"1B"},{t:"2n",X:"U"},{t:"1Z",X:"U"}]},35:Y,4R:Y,49:{4a:F,4b:F,4c:{4d:"í2P 2K pá4f",1M:"{0}-{1} L {2} í2P",4k:""}},4h:[{t:"2R",y:"2R",2Y:F},{t:"4y",y:"Í6g",2Y:F},{t:"1C",y:"3Bón",2j:"1A 4O: #=1B#",2d:"1A: #=1B#"},{t:"2n",y:"Q 1C",2j:\'<o v="1F:M">1A: #=U#</o>\',2d:\'<o v="1F:M">Q: #=U#</o>\',1e:{v:"q-1l: M"},4T:"{0:#,#.3t}"},{t:"1t",y:"1t"},{t:"1Z",y:"Q 1t",2j:\'<o v="1F:M">1A: #=U#</o>\',2d:\'<o v="1F:M">Q: #=U#</o>\',1e:{v:"q-1l: M"}},{t:"1x",y:"Nú3I"}]});r=[]},1P:4(a,b,c){22(a,b,c)}})}4 5O(){w F}4 5G(){3 a=$("#5w").B("5F");3 b=a.5b();3 c=a.56(b);5n(c.q){2O"9T":$("#4P").P();$("#4B").P();$("#2m").3X();$("#55").1n(1N,4(){$("#2m").3X()});$("#2o").D(\'\');$("#2B").D(\'\');2l;2O"Q":$("#4P").P();$("#55").P();$("#4B").1n(1N,4(){$("#2o").3X()});$("#2m").D(\'\');2l;54:2l}}4 5W(a,b,c){u.q=a;u.1w=b;u.4Z=C(c)}',62,615,'|||var|function|||||||||||||||if|||parent||div||text|arregloSeleccion|window|field|this|style|return||title|planesBase|length|data|parseFloat|val|new|true|indicadoresVariante|width|dcMon|else|td|de|right||P_inCod|hide|Precio|click||vcNom|sum|resul|for|aggregate|false|CampanaConf||||||Utilizado|Disponible|toString|vDetallePlanes||json|vcDes|addClass|alerta|attributes|trim|kendo|dias|html|push|aspx|align|tapSelect|fadeIn|planes|getFullYear|getMonth|getDate|getDay|Plan|su|height|value|Numero|IdCampana|tr|Total|count|Equipo|MesesContrato|find|float|JSON|newo|formatNumber|class|parseInt|kendoGrid|display|300|css|error|url|btnComprarConfirmado|NumeroRenovar|SubPlanes|Usted|200|tap|removeClass|Aprobado|PrecioPlan||detalleTaps|MostrarErrorAjax||AltoGrilla|UsarPlanDep|parse|success|dataType|utf|charset|application|contentType|groupFooterTemplate|POST|type|dataSource|ajax|template|footerTemplate|undefined|break|txtNombre|PrecioEquipo|txtPrecioMin|MesesEnteros|alert|color|inibar|numeroAlert|divCreditDis|btnCarritoCant|meses|hdfIdPedidoEditar|del|Date|substring|txtPrecioMax|Right|href|location|oPlan|CantidadTotal|CantidadDisponible|vColumns|validarexceso|por|productos|indiDisponible|change|case|tems|dito|idDetallePedido|cr|mite|animate|AlertaMonto|input|compras|hidden|TABLE||credisp|totalNumeroAlert|hdfEmpleado|ha|sortable|IdProducto|IdPlan|superado|PedidoPlan|DscPlan|enlazarClick|setDataSource|lblEstadoPedidoCompra|gridDetEle|DataSource|Orden|esNuevo|Meses|pDetEle|hover|Descripcion|carrito|vAltRowTemp|120px|operarInidicadores|aled|esEditar|kendoComboBox|00|dataCombo|pageSize|100px|PrecioPlanAntiguo|PEDIDO|DimPosElementos|PrecioPlanNumeroRenovar|Descripci|registrarPedidoRenovPlan|background|rowTemplate|altRowTemplate|none|keypress|mero|ERROR|validarexcesoBool_monto|tapCarritoPlan|arCampanasActivas|100|Array|miIndicadorCredito|attr|fnalerta|fnAbrirTapCarrito|IdPlanBase|DescripcionProducto|60px|detalles|focus|Monto|strFechaInicio|validarexcesoPlan|Comprar|Elegir|unbind|id|oPlanElegido|arMesesRenovacion|el|show|pageable|refresh|pageSizes|messages|itemsPerPage|fechaLimiteModificacion|gina|las|columns|aumentarBurbuja|span|empty|No|obtenerProducto|indicadoresInicial|Cantidad|dcCan|marginLeft|pIdCampana|prIdEmpleado|20px|null|Estado|productoPrecioTotal|split|NumeroItem|ale|alert1|pTxtPrecio|block|group|Login|resizeGrid|Debe|TblDetPlan|dscPlanCombo|innerHeight|aceptar|pTituloPedido|spanNomCam|condiciones|equipos|pTipo|live|scrollable|grid1|format|validarexcesoBool|getMinutes|getHours|Common|creditos|precio||lblFechaPedi|Linea|Nueva|default|ptxtNombre|dataItem|obtenerCampanaActiva|8859|_text|sender|select|index|suggest|IdEmpleado|append|obtenerCreditos|NombrePlan|MontoMin|MontoMax|iso|encoding|EstadoPedido|switch|codigopedido|ObtenerPlanesRenovacion|lblCodigoPedido|stringify|creduti|IdPedido|contains|btnFiltroProducto|required|version|xml|creporc|favor|margin|left|filter|Agregue|kendoDropDownList|onChangeDdl|obtenerProductos_Filtro|hdfIdPedidoMirror|ModificarPedidoRenovPlan|pedido|PRODUCTO|dataValueField|dataTextField|fnExistsEdit|kendoSlider|tapPlanes|obtenerProductos|40px|enlacesLoad|AL|enabled|miPlan|no|FinSession|UsuarioConectado|MaxIdPedido|PaqueteDatos|Paquete|Datos|cboOnTop|prMaxIdPedido|80px|gridPro|pSelecPlan|content|onDataBinding|dataBound|onDataBound|br|procesarPedido|hfUsuario|tem|aggregates|actualizarIndicadores|tapDeclaracion|pDeclaracion|open|rowIndex|_selectedValue|obtenerMesesByPlan|detallePlan|pnlticket|marginRight|top|capaPopUp|Pedido|pXmlPedido|fade|disponibles|prIdPedido|hay|idPlan|PLANES|Meses_Contrato|c52b10|size|font|se|encontr|navigatable|ngun|producto|groupable|con|dataBinding|filtro|seleccionado|210px|350px|altRowTemplateCarrito_PD|rowTemplateCarrito_PD|NombreCorto|spPrecio|horas|altRowTemplateCarrito|rowTemplateCarrito|Domingo|Lunes|fnEsCampanaPreventa|esPreVentaActiva|declaracionFechaActual|item|context|innerHTML|spanFFinCam|indexOf|spanFIniCam|Martes|strfechaFin|FechaActual|FechaFin|ReadOnly|seleccioPlan|2016|FechaInicio|esCampanaActiva|NombreOperador|spanNomOpe|Mi|rcoles|grid|obtenerDetallePlan|prIdPlan|lblNombre|lblDescripcion|lblOperador|Operador|vcNomOpe|lblMonto|toFixed|grdPedidos|catch|try|Jueves|colspan|border|1px|solid|a6c9e2|replace|fcfdfd|images|ui|bg_inset|hard_100_fcfdfd_1x100|png|bottom|repeat|222222|6em|0em|totalesCarrito|Bolsa|generalCarrito|Viernes|bado|Ilimitado|vcSer|toUpperCase|tapCarrito|position|1000|mousemove|duration|pageX|pageY|EliDetPlan|cboMeses|in|enable|Accion|MesContratoAnterior|getDetallePedidoByPedido|effects|animation|disponible|red|003F59|consumo|kendoTooltip|Enero|Febrero|setTimeout|500|tooltip|tiene|showButtons|en|max|min|sobrepasado|verifique|colored|modificado|note|confirma|Esta|usted|seguro|enviar|Compra|Aceptar|pProcesoCompra|pPanelCarrito|icon|admiracion|5px|35px|75px|indiBar|indiDesc|itemIndicador|contIndicadores|Marzo|ProductoCreditoAsignado|each|CreditoUsuario|280|125|contCampa|Abril|Mayo|Junio|btnCarrito|0px|30px|10px|Julio|Agosto|Setiembre|Octubre|AGREGAR|fnIrPedidos|btnVolverPedidos|which|Noviembre|pdf|Condiciones|Contratos|Enviado|Parcial|archivo|Enviaparcial|ashx|Adquirido|noAdquirido|DescargarArchivo|EnviadoOk|Controladores|getCondicionesTemrinos|ValidarAlfaNumerico|ValidarSoloNumero|Diciembre|50px|130px|01|02|agosto|checked|is|chkConfirmarTerminos|es|renovar|green|03|04|spanNumElegidoRenovacion|resize|05|06|07|08|09|editarPedidoRenovPlan|pIdPedido|EDITAR|Nombre|planesOnTop'.split('|'),0,{}))
    </script>--%>
    <script id="rowTemplateCarrito" type="text/x-kendo-tmpl">
	    <tr class="fila-a">
		    <td class="detalles">
                <div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img id="imgDetallePlan" alt="" src="../Common/Images/view.png" class="imgBtn"/></div>
                <div style="display:none;"> #:data.P_inCod#</div>
                &nbsp;&nbsp;
	            #:data.vcNom#
		    </td>
            <td class="Precio">
		        #:data.dcMon#
		    </td>
            <td class="Comprar">
		        <div class="seleccioPlan k-button">Seleccionar<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplateCarrito" type="text/x-kendo-tmpl">
        <tr class="fila-b">
		    <td class="detalles">
                <div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img id="imgDetallePlan" alt="" src="../Common/Images/view.png" class="imgBtn"/></div>
                <div style="display:none;"> #:data.P_inCod#</div>
                &nbsp;&nbsp;
	            #:data.vcNom#
		    </td>
            <td class="Precio">
		        #:data.dcMon#
		    </td>
            <td class="Comprar">
		        <div class="seleccioPlan k-button">Seleccionar<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script id="rowTemplateCarrito_PD" type="text/x-kendo-tmpl">
	    <tr class="fila-a">
		    <td class="detalles">
                <div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left; padding-right:5px;"><img id="imgDetallePlan" alt="" src="../Common/Images/view.png" class="imgBtn"/></div>
                <div style="display:none;"> #:data.P_inCod#</div>
                <span id="spPrecio-#:data.P_inCod#" style="display:none;"> #:data.dcMon#</span>
	            #:data.vcNom# (#:formatNumber.newo(data.dcMon, oCultura.Moneda.vcSimMon + " ")#)
		    </td>
            <td>
                <select class="cboOnTop" id="cboOnTop-#:data.P_inCod#" style="width: 200px"></select>
            </td>
            <td class="Precio">
		        #:formatNumber.newo(data.dcMon, oCultura.Moneda.vcSimMon + " ")#
		    </td>
            <td class="Comprar">
		        <div class="seleccioPlan k-button">Elegir<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplateCarrito_PD" type="text/x-kendo-tmpl">
        <tr class="fila-b">
		    <td class="detalles">
                <div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left; padding-right:5px;"><img id="imgDetallePlan" alt="" src="../Common/Images/view.png" class="imgBtn"/></div>
                <div style="display:none;"> #:data.P_inCod#</div>
                <span id="spPrecio-#:data.P_inCod#" style="display:none;"> #:data.dcMon#</span>
	            #:data.vcNom# (#:formatNumber.newo(data.dcMon, oCultura.Moneda.vcSimMon + " ")#)
		    </td>
            <td>
                <select class="cboOnTop" id="cboOnTop-#:data.P_inCod#" style="width: 200px"></select>
            </td>
            <td class="Precio">
		        #:formatNumber.newo(data.dcMon, oCultura.Moneda.vcSimMon + " ")#
		    </td>
            <td class="Comprar">
		        <div class="seleccioPlan k-button">Elegir<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script id="rowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alta">
		    <td>
                #:data.vcNom#
		    </td>
		    <td>
                <span  class="lblMeses" style="float:left; margin-top:3px; margin-left:7px;margin-right:5px;">Contrato por:</span> <input id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />
            </td>
		    <td>
		        #: oCultura.Moneda.vcSimMon + " " + data.dcMon #
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    <td>
                #:data.vcNom#
		    </td>
		    <td>
			    <span  class="lblMeses" style="float:left; margin-top:3px; margin-left:7px;margin-right:5px;">Contrato por:</span> <input id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />
		    </td>
		    <td>
		        #: oCultura.Moneda.vcSimMon + " " + data.dcMon #
		    </td>
	    </tr>
    </script>
</head>
<body style="overflow: hidden;" scroll="no">
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfUsuario" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdPedidoEditar" runat="server" />
        <asp:HiddenField ID="hdfFecServidor" runat="server" />
        <asp:HiddenField runat="server" ID="hdfMuestraNumeroContacto" Value="0"  />

        <div id="global">
            <div id="generalCarrito" class="general">
                <div id="pPanelCarrito" class="pContenedor">
                    <div id="contenedorBtnCarrito">
                        <div id="btnCarritoCant">
                            <span>0</span><img class="warpimagen" src="../Common/Images/burbujainvi.png" />
                        </div>
                        <div id="btnCarrito">
                            <img src="../Common/Images/cart_shop.png" />
                        </div>
                    </div>
                    <div id="btnProcesar">
                        <img src="../Common/Images/compra.png" />
                    </div>
                    <div id="contIndicadores">
                        <div class="itemIndicador">
                            <div class="indiDesc">
                                <b>Tipo</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Aprobado</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Utilizado</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Disponible</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Estado Crédito</b>
                            </div>
                            <div class="indiBar">
                            </div>
                        </div>
                    </div>
                    <div id="contCampaña">
                        <table border="0" cellpadding="2" cellspacing="0" class="cGenInfo">
                            <tr>
                                <td style="font-weight: bold;">
                                    <span id="spanCamDesc">Campaña:</span>
                                </td>
                                <td>
                                    <span id="spanNomCam"></span>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">
                                    <span id="span1">Operador:</span>
                                </td>
                                <td>
                                    <span id="spanNomOpe"></span>
                                </td>
                            </tr>
                            <tr class="ocultarPre">
                                <td style="font-weight: bold;">Fecha Inicio:
                                </td>
                                <td>
                                    <span id="spanFIniCam"></span>
                                </td>
                            </tr>
                            <tr class="ocultarPre">
                                <td style="font-weight: bold;">Fecha Fin:
                                </td>
                                <td>
                                    <span id="spanFFinCam"></span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <span id="spanNumElegidoRenovacion"></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="cuerpoTaps">
                    <div class="navtaps">
                        <div id="tapPlanes" class="tap tapSelect" style="color: darkred;">
                            <div class="pasocompra" id="paso1">
                                Paso 1 :
                            </div>
                            Seleccione Plan
                        </div>
                        <div id="tapCarritoPlan" class="tap" style="color: darkred;">
                            <div class="pasocompra" id="paso2">
                                Paso 2 :
                            </div>
                            Plazo Contrato
                        </div>
                        <div id="tapDeclaracion" class="tap" style="color: darkred; padding-left: 5px;">
                            Paso 3 : Confirmación Compra
                        </div>
                    </div>
                    <div id="detalleTaps">
                        <div id="pSelecPlan">
                            <div id="toolBarPro">
                                <select style="float: left;" id="required" data-placeholder="Seleccione categoria...">
                                    <option>Nombre</option>
                                    <option>Precio</option>
                                </select>
                                <div id="ptxtNombre" style="float: left;">
                                    <input style="width: 440px; margin-top: 5px; margin-left: 15px;" id="txtNombre" type="text" class="k-textbox" maxlength="50" />
                                </div>
                                <div id="pTxtPrecio" style="float: left; display: none;">
                                    <span style="margin-left: 15px;">Mínimo : </span>
                                    <input style="width: 150px; margin-top: 5px; text-align: right;" id="txtPrecioMin" type="text" class="k-textbox" maxlength="6" />
                                    <span>Máximo : </span>
                                    <input style="width: 150px; margin-top: 5px; text-align: right;" id="txtPrecioMax" type="text" class="k-textbox" maxlength="6" />
                                </div>
                                <div id="btnFiltroProducto" class="k-button" style="float: right; width: 70px; height: 33px; margin-right: 40px; padding-top: 7px;">
                                    Buscar
                                </div>
                            </div>
                            <table id="gridPro">
                                <table id="gridPro_1" style="display: none;">
                                    <thead>
                                        <tr>
                                            <th role="columnheader" data-title="Producto" class="k-header">Plan
                                            </th>
                                            <th role="columnheader" data-title="Precio" class="k-header">Monto
                                            </th>
                                            <th role="columnheader" data-title="Comprar" class="k-header">Seleccionar
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                        </div>
                        <div id="pDetEle" style="display: none;">
                            <table id="gridDetEle">
                                <thead>
                                    <tr>
                                        <th>Plan
                                        </th>
                                        <th>Plazo
                                        </th>
                                        <th>Monto
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="3"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="k-block k-info-colored" id="totalesCarrito">
                                <div style="float: right; margin-right: 15px; font-size: 12pt;">
                                    total: <span></span>
                                </div>
                                <div style="float: right; margin-right: 15px; font-size: 12pt; display: none;">
                                    * Usted a superado su consumo disponible
                                </div>
                            </div>
                        </div>
                        <div id="pDeclaracion" style="display: none; height: 320px; overflow: auto; padding: 40px;">
                            <div id="pnlCompra" class="esPreVenta">
                                <%--<p>
                                Se enviará su solicitud al proveedor, no podrá ser modificada después de las 18:00
                                horas del día de hoy (<span id="declaracionFechaActual"></span>). Para confirmar
                                su compra deberá aceptar las condiciones del contrato.
                            </p>--%>
                                <p>
                                    Se enviará su solicitud al proveedor, no podrá ser modificada después de <span id="fechaLimiteModificacion"></span>. Para confirmar su compra deberá aceptar las condiciones del contrato.
                                </p>
                                <div id="dvNumeroContactoPedido" style="display:none;">
                                    Número de Contacto:&nbsp;<input style="width: 140px; margin-top: 5px; margin-left: 15px;" id="txtNumeroContactoPedido" type="text" class="k-textbox" maxlength="9" />&nbsp;<a style="color: darkred;" title="Campo Obligatorio">(*)</a>
                                    <br />
                                    <br />
                                </div>
                                <input id="chkConfirmarTerminos" type="checkbox" /><span>Acepto haber leído y estar
                                de acuerdo con las <a class="getCondicionesTemrinos" style="text-decoration: underline;">condiciones.</a></span>
                                <div style="clear: both; margin-bottom: 20px;">
                                </div>
                                <div id="btnComprarConfirmado" style="width: 120px; height: 50px; cursor: hand; cursor: pointer; border: 0px dotted gray; margin: auto;">
                                    <img id="imgCompraimg" style="max-width: 100%; width: 100%; height: 100%" src="../Common/Images/boton_comprar.jpg" />
                                </div>
                            </div>
                            <div id="pnlPreventa" style="display: none;">
                                <p runat="server" id="pDscPreventa">
                                </p>
                                <div style="clear: both; margin-bottom: 20px;">
                                </div>
                                <div id="btnPreventaConfirmado" style="width: 120px; height: 90px; cursor: hand; cursor: pointer; border: 0px dotted gray; margin: auto;">
                                    <img style="max-width: 100%; width: 100%; height: 100%" src="../Common/Images/reserva.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="pnlticket" style="width: 66%; background-color: White; overflow-x: hidden; overflow-y: scroll; position: relative !important; height: 460px; left: 135px; top: 70px; box-shadow: rgb(44, 34, 34) 6px 4px 3px; background-image: none; border-radius: 5px; display: none; z-index: 2000;">
            <div class="EliDetPlan" title="Presione para cerrar" style="padding: 2px;">
            </div>
            <div class="cGenInfo titulo" style="width: 500px; height: auto;">
                <b><span id="lblNombre"></span></b>
            </div>
            <br />
            <table class="miTabla" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: auto; position: relative !important;">
                <tr>
                    <td style="width: 100px;">
                        <b>
                            <asp:Label ID="lblDescripcionTitulo" runat="server" Text="Descripción" Style='width: 100px;'></asp:Label></b>
                    </td>
                    <td>
                        <span id="lblDescripcion"></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">
                        <b>
                            <asp:Label ID="lblOperadorTitulo" runat="server" Text="Operador" Style='width: 100px;'></asp:Label></b>
                    </td>
                    <td>
                        <span id="lblOperador"></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">
                        <b>
                            <asp:Label ID="lblMontoTitulo" runat="server" Text="Monto" Style='width: 100px;'></asp:Label></b>
                    </td>
                    <td>
                        <span id="lblMonto"></span>
                    </td>
                </tr>
            </table>
            <table id="TblDetPlan" class="miTabla" border="0" cellpadding="0" cellspacing="0"
                style="width: 100%; height: auto; position: relative !important;">
            </table>
        </div>
        <div id="capaPopUp" style="display: none" runat="server">
        </div>

        <div id="pProcesoCompra" style="display: none; width: 100%; height: 100%; overflow: auto; position: absolute; left: 0px; top: 0px; z-index: 99999;">
            <div style="width: 100%; text-align: center; color: #003F59; font-size: 12pt;">
                Resumen de Pedido
            </div>
            <table id="tbResComp" cellpadding="0" cellspacing="0" border="0" style="margin: 5px 0px 15px 15px;">
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Fecha:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblFechaPedi" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Nombre:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                    <%--<td rowspan="8">
                    <img src="" id="imgUser" runat="server" height="75" />
                </td>--%>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
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
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Centro de Costos:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Código de pedido:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblCodigoPedido" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Estado de pedido:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblEstadoPedidoCompra" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
            </table>
            <div id="grid1">
            </div>
            <div id="btnVolverPedidos" class="k-button" style="width: 200px; height: 30px; margin: 15px 0px 0px 260px; font-weight: bolder;">
                Ir a mis pedidos
            </div>
            <div id="btnImprimirCompraPedido" class="btnNormal" style="float: left; margin-left: 10px; margin-top: 15px; display: none;">
                <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/imprimir.png" />
            </div>
        </div>
        <div id="detallePlan" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;">Detalle plan</div>
    </form>
</body>
</html>
