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
    <%--<script src="CarritoIE.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('w 5n=\'14 1r 9U 4c 9S a 5l 23:5Y:5Y 9B\';w 2L=1;w 2F=13 4v("9r","9q","98","97é96","95","94","Sá93");w 2v=13 4v("92","91","90","8Z","8X","8I","8H","8G","8F","8E","8h","86");w 3W=13 4v("85","84","83","7Y","7T","7S","7C","7w","7n","10","11","12");w 3k;w v;w 29=[];w D=[];w 2f=[];w 6N=[];w 1a=[];w 3l;w 2V;w 2h;w 4n;w 53=1A;w 4o=1A;w 1E=1;w 3L=4;w 6T=\'\';w 2E=1;$(F(){$("#5n").H(5n);6U();6S();6O();6C();$("#2X").3C(F(){w a=$("#2X 3D[Y=\'"+$(A).1j()+"\']").2w("7E");$("#7I").H(a)});$("#7K").1w(F(){$("#3X").2W();$("#5a").2W();$("#3t").3v()});$("#80").1w(F(){$("#3X").2W();$("#5a").2W();$("#3t").3v();$("#81").18("1d","1s");$("#8b").18("1d","2o");y(4o){6t()}L{5c()}})});F 6C(){$("#6s").1w(F(){$(".5d").5e("3j");$("#6s").5f("3j");$("#5i > 2i").18("1d","1s");$("#6f").18("1d","2o")});$("#6d").1w(F(){$(".5d").5e("3j");$("#6d").5f("3j");y(D.P!=0){w a=13 1I.U.2H({U:D});w b=$("#42").U("43");b.2t(a);5k()}$("#5i > 2i").18("1d","1s");$("#9z").18("1d","2o")});$("#60").1w(F(){$(".5d").5e("3j");$("#60").5f("3j");$("#5i > 2i").18("1d","1s");$("#9E").18("1d","2o")});$("#9H").3C(F(){y($(A).9L(\':9V\')){$("#2R").5m("1w");$("#2R").1w(F(){5Q()});$(\'#2R\').2O(F(){$(A).5P({T:\'a8\',3G:\'3H\'},5x)},F(){$(A).5P({T:\'aa\',3G:\'7P\'},5x)})}L{$("#2R").5m("1w");$("#2R").1w(F(){1F("5y 5B 5l 5U")});$(\'#2R\').5m("2O")}});$("#2R").1w(F(){1F("5y 5B 5l 5U")});$("#6Z").18("T","7d");$("#7g").1w(F(){R.4m.4l="7p.2d"});$(".6F").1w(F(){R.4m.4l="../6u/8z/6V.8C?8D=6u/8R/8S.8U"});$(\'.6F\').2O(F(){$(A).18({"3d":"4D"})},F(){$(A).18({"3d":"4C"})});$(\'.6g\').2O(F(){$(A).18({"3d":"4D"})},F(){$(A).18({"3d":"4C"})});$(\'#6c\').2O(F(){$(A).18({"3d":"4D"})},F(){$(A).18({"3d":"4C"})});$("#6c").1w(F(){69()});$("#9t").9u("1w",F(){$("#67").18("1d","1s");$("#3t").18("1d","2o")})}F 5k(){w m=$(".4t");w n=$(".56");w o=$(".2n");w p=$(".2J");w q=$(".3O");2L=1;17(w i=0;i<p.P;i++){$(m[i]).2w("3R",i);$(n[i]).2w("3R",i);$(p[i]).1o({4W:"H",4z:"Y",3V:2y?5N(D[i].1e):5H(D[i].1e),5p:F(e){3l=A.25().1Z;3u=A.Y();2h=$($($(A.1u.1t).B().B().B().B()).W(".2n")[1]).U("1o").25().1Z},3C:F(e){w a=A.25().1Z;y(2y){w b=$(A.1u.1t).B().B().B().B();y(3l!=1b){1n(0,-(I(2h)))}w c;w d;w f;y(D[X(b[0].1c)].1U==\'1Q\'){c=5D($(A)[0].2M.1S("-")[1],A.Y(),X(b[0].1c)).1S("|");d=c[0];f=c[1]}L{d=a;f=$(A)[0].4g}y(2s(0,I(d))){1n(0,I(2h));A.Y(3u);2q("22 2G 2D 27 lí2A 1r 2ué2B");Q}w g=4x($(A)[0].2M.1S("-")[1],A.Y());y(D[X(b[0].1c)].1U==\'1Q\'){D[X(b[0].1c)].1m=g[0].Y}L{D[X(b[0].1c)].1m=$(A)[0].4g}w h=13 1I.U.2H({U:g});w i=$($($(A.1u.1t).B().B().B()).W(".2n")[1]).U("1o");i.2t(h)}L{y(3l!=1b){1n(0,-(I(3l)))}y(2s(0,I(a))){1n(0,I(3l));A.Y(3u);2q("22 2G 2D 27 lí2A 1r 2ué2B");Q}w j=3p(A.Y(),$(A)[0].2M.1S("-")[1]);w k=13 1I.U.2H({U:j});w l=$($($(A.1u.1t).B().B().B().B()).W(".3O")[1]).U("1o");2V=l.Y();l.2t(k)}},45:F(e){y(R.B.1O!=1b&&R.B.2g=="1Q"){A.6P(1A)}y(!2y){A.Y(D[i].1m)}L{A.Y(4O(D[i].1m))}}});y(2y){$(o[i]).2w("3R",i);$(o[i]).1o({4W:"H",4z:"Y",3V:4x(D[i].1e,4O(D[i].1m)),5p:F(e){2h=A.25().1Z;4n=A.Y()},3C:F(e){w a=A.25().1Z;y(2h!=1b){1n(0,-(I(2h)))}y(2s(0,I(a))){1n(0,I(2h));A.Y(4n);2q("22 2G 2D 27 lí2A 1r 2ué2B");Q}w b=3p(A.Y(),$(A)[0].2M.1S("-")[1]);w c=13 1I.U.2H({U:b});w d=$($($(A.1u.1t).B().B().B().B()).W(".3O")[1]).U("1o");2V=d.Y();d.2t(c)},45:F(e){y(R.B.1O!=1b&&R.B.2g=="1Q"){A.6P(1A)}w a=X($(A.1u.1t).2w("3R"));A.Y(D[a].1m);w b=$($($(A.1u.1t).B().B().B().B()).W(".3O")[1]).U("1o");y(b!=1b){w c=3p(A.Y(),$(A)[0].2M.1S("-")[1]);w d=13 1I.U.2H({U:c});2V=b.Y();b.2t(d)}}})}$(q[i]).1o({4W:"H",4z:"Y",3V:3p($(p[i])[0].Y,D[i].1e),5p:F(e){2V=A.Y()},3C:F(e){w a=$(A)[0].2M.1S("-")[1].1S("5v")[0];w b=$(A)[0].4g;w c=$($($(A.1u.1t).B().B().B().B()).W(".2n")[1]).U("1o").Y();w d=4w(a,b,c);w f=$(A.1u.1t).B().B().B();1n(-(I(D[X(f[0].1c)].V)),0,D[X(f[0].1c)].1D);1n(I(d),0,D[X(f[0].1c)].1D);y(2s(0,0)){1n(-(I(d)),0,D[X(f[0].1c)].1D);1n(I(D[X(f[0].1c)].V),0,D[X(f[0].1c)].1D);2q("22 2G 2D 27 lí2A 1r 2ué2B");A.Y(2V);Q}D[X(f[0].1c)].V=d;D[X(f[0].1c)].2x=b;$(f[0]).W(".5G").1L("S/. "+d);$($($("#4s > 2i")[0]).W("4u")[0]).H(M.O(4a(),"S/. "));y(1E!=1){w g=d/D[X(f[0].1c)].1D;w h=(d/D[X(f[0].1c)].1D)+D[X(f[0].1c)].2k;$(f[0]).W(".5R").1L(M.O(g,"S/. ")+"<3T/>(4X 52)");$(f[0]).W(".5S").1L(M.O(h,"S/. "))}},45:F(e){y(2L==1){y(D[i].2x!=0){A.Y(D[i].2x)}$($($("#4s > 2i")[0]).W("4u")[0]).H(M.O(4a(),"S/. "))}L y(2L==2){A.Y(2V);2L=0}L{A.9T(A.9J.9x().9w(0));w a=$(A)[0].2M.1S("-")[1].1S("5v")[0];w b=$(A)[0].4g;w c;y(!2y){c=$($($(A.1u.1t).B().B().B()).W(".2J")[1]).U("1o").Y()}L{c=$($($(A.1u.1t).B().B().B()).W(".2n")[1]).U("1o").Y()}w d=4w(a,b,c);w f=$(A.1u.1t).B().B().B();1n(-(I(D[X(f[0].1c)].V)),0,D[X(f[0].1c)].1D);1n(I(d),0,D[X(f[0].1c)].1D);y(2s(0,0)){1n(-(I(d)),0,D[X(f[0].1c)].1D);1n(I(D[X(f[0].1c)].V),0,D[X(f[0].1c)].1D);1n(0,I(2h));y(!2y){$($($(A.1u.1t).B().B().B().B()).W(".2J")[1]).U("1o").Y(3u)}L{$($($(A.1u.1t).B().B().B().B()).W(".2n")[1]).U("1o").Y(4n)}w g=3p(3u,a);w h=13 1I.U.2H({U:g});w j=$($($(A.1u.1t).B().B().B().B()).W(".3O")[1]).U("1o");2L=2;j.2t(h);2q("22 2G 2D 27 lí2A 1r 2ué2B");Q}D[X(f[0].1c)].V=d;D[X(f[0].1c)].2x=b;D[X(f[0].1c)].1m=c;y(!2y){D[X(f[0].1c)].2k=I($($($(A.1u.1t).B().B().B()).W(".2J")[1]).U("1o").25().1Z);1n(0,I($($($(A.1u.1t).B().B().B()).W(".2J")[1]).U("1o").25().1Z))}L{D[X(f[0].1c)].2k=I($($($(A.1u.1t).B().B().B()).W(".2n")[1]).U("1o").25().1Z);1n(0,I($($($(A.1u.1t).B().B().B()).W(".2n")[1]).U("1o").25().1Z))}$(f[0]).W(".5G").1L("S/. "+d);$($($("#4s > 2i")[0]).W("4u")[0]).H(M.O(4a(),"S/. "));y(1E!=1){w k=d/D[X(f[0].1c)].1D;w l=(d/D[X(f[0].1c)].1D)+D[X(f[0].1c)].2k;$(f[0]).W(".5R").1L(M.O(k,"S/. ")+"<3T/>(4X 52)");$(f[0]).W(".5S").1L(M.O(l,"S/. "))}}}})}$(".56").1w(F(){w d=$($(A).B().B().W(".2J")[1]).U("1o").Y();$.36({3o:"34",2Q:"39.2d/9p",U:"{\'9o\': \'"+d+"\'}",3a:"3b/1Y; 3c=38-8",3i:"1Y",3m:F(a){21=a.d;$("#8B").H($.2p(21.1C));$("#8e").1L($.2p(21.2z));$("#88").H($.2p(21.7Z.7W));$("#7V").H("S/. "+21.7R.41(2));w b="";b="";$("#6I").1L("");17(w i=0;i<21.2K.P;i++){b+="<K>";b+="<5 3S = \'2\'><2i  G=\'7a: 74 72 #71; 1x: #6Y 2Q(75/7f-7F-7X.8d) 50% 8i 8x-x; 8K: #8Q; 8V: 0.8W .8Y;\'></2i></5>";b+="</K>";b+="<K>";b+="<5 G=\'T: 3N;\'><b>9X</b></5><5>"+$.2p(21.2K[i].1C)+"</5>";b+="</K>";y($.2p(21.2K[i].2z)!=""){b+="<K>";b+="<5 G=\'T: 3N;\'><b>3Eón</b></5><5>"+$.2p(21.2K[i].2z)+"</5>";b+="</K>"}b+="<K>";y(21.2K[i].5L==0){b+="<5 G=\'T: 3N;\'><b>5K</b></5><5>a2</5>"}L{b+="<5 G=\'T: 3N;\'><b>5K</b></5><5>"+I(21.2K[i].5L)+" - "+$.2p(21.2K[i].a7.a9())+"</5>"}b+="</K>"}$("#6I").1i(b)},33:F(a,b,c){35(a,b,c)}});$("#5u").18("1d","2o");$("#3X").3v()});$(".6g").1w(F(){$("#3X").2W();$("#5u").2W()});$(".4t").1w(F(){$("#5s").18("1d","1s");w a=X($(A).2w("3R"));w b;y(!2y){b=$($($(A).B().B()).W(".2J")[1]).U("1o").25().1Z}L{b=$($($(A).B().B()).W(".2n")[1]).U("1o").25().1Z}1n(-(I(D[a].V)),-(b),D[a].1D);y(D[a].3s=="0"){w c=D.5w(a,1);2f.1p(c)}L{D.5w(a,1)}5r();$($("#42").W("K")[a]).18("1d","1s");y(D.P==0){w d=13 1I.U.2H({U:D});w e=$("#42").U("43");e.2t(d)}L{w d=13 1I.U.2H({U:D});w e=$("#42").U("43");e.2t(d);5k()}});$(".56").2O(F(){$(A).5z(F(e){$("#5A").18({"5q":e.5C+20,"5E":e.5F,"1d":"2o"})})},F(){$("#5A").18("1d","1s")});$(".4t").2O(F(){$(A).5z(F(e){$("#5s").18({"5q":e.5C+20,"5E":e.5F,"1d":"2o"})})},F(){$("#5s").18("1d","1s")});2L=0}F 6U(){3k=R.B.37;w a=13 4r(X(3k["a6"].5o(6,19)));w b=13 4r(X(3k["a0"].5o(6,19)));w c=13 4r(X(3k["9Y"].5o(6,19)));5O=2F[a.2N()]+\', \'+a.2P()+\' 1r \'+2v[a.2I()]+\' 4c \'+a.2S();9O=2F[b.2N()]+\', \'+b.2P()+\' 1r \'+2v[b.2I()]+\' 4c \'+b.2S();w d=2F[a.2N()]+\', \'+a.2P()+\'/\'+3W[a.2I()]+\'/\'+a.2S();w e=2F[b.2N()]+\', \'+b.2P()+\'/\'+3W[b.2I()]+\'/\'+b.2S();w f=2F[c.2N()]+\', \'+c.2P()+\'/\'+3W[c.2I()]+\'/\'+c.2S();$("#4q 1k").1i("<K><5 3f=\'3g\' >9Dña</5><5>"+3k["5Z"].J()+"</5></K>");$("#4q 1k").1i("<K><5 3f=\'3g\'>61 9C</5><5>"+d+"</5></K>");$("#4q 1k").1i("<K><5 3f=\'3g\'>61 9A</5><5>"+e+"</5></K>");y(R.B.1O!=1b)$("#4q 1k").1i("<K><5 3f=\'3g\'>1J 9y</5><5 3f=\'3g\'>"+R.B.1O.J()+"</5></K>");$("#9v").H(f)}F 6S(){68=9s;$.9a(68.99,F(i,a){w b=X(a["1H"]/a["2T"]*6e);$("#3M 1k").1i("<K><5 3f=\'3g\'>"+a["5j"].J()+"</5><5>"+M.O(a["2T"],"S/. ").J()+"</5><5>"+M.O(a["1H"],"S/. ").J()+"</5><5>"+M.O(a["1l"],"S/. ").J()+"</5><5>"+b.J()+" % "+"</5></K>");6N.1p(13 5h(a["5j"].J(),I(a["2T"]),I(a["1l"]),I(a["1H"])));1a.1p(13 5h(a["5j"].J(),I(a["2T"]),I(a["1l"]),I(a["1H"])))});y(R.B.1O!=1b){1n(0,-(I(R.B.6j)))}}F 6k(){$.36({3o:"34",2Q:"39.2d/8N",U:"{\'8M\' : \'"+$("#5g").1j()+"\',"+"\'3K\': \'"+R.B.37.3K+"\',"+"\'8y\': \'\'}",3a:"3b/1Y; 3c=38-8",3i:"1Y",3m:F(e){v=3I.3F(e.d);17(w i=0;i<v.P;i++){y(R.B.2g!=1b&&R.B.2g=="1Q"&&R.B.2j!=v[i].Z){1h}y(i==0){29.1p(13 5b(v[i].1e,v[i].1C,v[i].3A,v[i].2z,v[i].V,v[i].3x,v[i].3w,v[i].3Z,v[i].3U,v[i].2l,v[i].1U));1h}w f=1A;17(w z=0;z<29.P;z++){y(29[z].1e==v[i].1e){f=1q;2m}}y(f)1h;29.1p(13 5b(v[i].1e,v[i].1C,v[i].3A,v[i].2z,v[i].V,v[i].3x,v[i].3w,v[i].3Z,v[i].3U,v[i].2l,v[i].1U))}w g=0;g=$(R).3G()-7D;y(g<=0){g=7A}w h;y(R.B.7x){h=7v}L{h=70}$("#7r").43({3V:{U:29,7m:50},45:6K,7l:1A,6M:1A,7h:1q,58:1I.3r($("#79").1L()),57:1I.3r($("#6X").1L()),3G:g,6R:[{1K:"6W",T:"10%",1M:"3e"},{1K:"8A",T:"40%",1M:"3P"},{1K:"4p",T:"10%",1M:"4p",55:{G:"H-16:2b;"}},{1K:"V",T:"15%",1M:"V 73",55:{G:"H-16:1f;"}},{1K:"6Q",T:"20%",1M:"6Q",55:{G:"H-16:1f;"}}]});$(".k-76-77","#6f").18({"78":"5q !ab"});y($("#51").1j()!="0"){$.36({3o:"34",2Q:"39.2d/7b",U:"{\'7c\': \'"+$("#51").1j()+"\'}",3a:"3b/1Y; 3c=38-8",3i:"1Y",3m:F(a){w b=3I.3F(a.d[0]);w c=3I.3F(a.d[1]);4o=1q;17(w i=0;i<c.P;i++){w d=4Z(c[i].7e);D.1p(d);D[i].3s="0";D[i].3Y=c[i].4Y;D[i].1J=c[i].Nú2U;D[i].V=I(c[i].7i);D[i].1m=c[i].Z;D[i].2x=X(c[i].7j);D[i].2k=I(c[i].7k)}$("#6L").H(D.P.J())},33:F(a,b,c){35(a,b,c)}})}},33:F(a,b,c){35(a,b,c)}})}F 6K(){$(".6J").1w(F(){y(R.B.1O!=1b){y(D.P==1){1F("22 só7o 4V 7q 4U 7s 6H 7t 7u nú2U");Q}}y(6G()){1F("22 2G 2D 27 lí2A 1r 2ué2B");Q}w a=$($($(A).B()).W("3z")[0]).1j();a=X(a.1S(\' \')[0].J());y((D.P+a)>30){1F("22 2G 2D 4T nú2U 1r í7y a 7z");Q}w b=$.2p($($($(A).B()).W("2i")[1]).H());w c=X($($($(A).B().B()).W(".4p")[0]).H());c=c-X(6E(b));y(c<1){1F("3e 7B 3y 6D 6B 6A");Q}y(a==0){1F("7G 7H 6z 7J");$($($(A).B()).W("3z")[0]).1j(\'1\');$($($(A).B()).W("3z")[0]).6y();Q}y(a>c){1F("7L 6z 7M 3y 4V 7N <3T>7O 6H 6B 6A.");$($($(A).B()).W("3z")[0]).1j(\'1\');$($($(A).B()).W("3z")[0]).6y();Q}17(w i=0;i<a;i++){w d=4Z(b);y(2s(I(d.V),I(d.2k),d.2l)){1F("22 2G 2D 27 lí2A 1r 2ué2B");Q}D.1p(d);1n(I(d.V),I(d.2k),d.1D)}});y(R.B.1O!=1b){$(".5t").7Q("4S",1q)}w t=$(A.1k).W("K");17(w i=0;i<t.P;i++){y($.2p($($(t[i]).W(".4p")[0]).H())=="0"){$($(t[i]).W(".6J")[0]).18("1d","1s");$($(t[i]).W(".5t")[0]).18("1d","1s")}}}F 5b(a,b,c,d,e,f,g,h,i,j,k){w l=1E;y(j==\'9\'){l=2E}A.1e=a;A.1C=b;A.3A=c;A.2z=d;A.V=e;A.3x=f;A.3w=g;A.3Z=h;A.3U=i;A.3s="";A.3Y="";A.1J="";A.7U=l==1?M.O(e,"S/."):M.O((e/l),"S/.")+" (4X 52)";A.2l=j;A.1U=k==4R||k==1b?"4Q":k}F 6x(a,b,c,d,e,f,g,h,i,j,k,l,m,n){A.1e=a;A.1C=b;A.3A=c;A.2z=d;A.V=e;A.3x=f;A.3w=g;A.3Z=h;A.3U=i;A.1m=j;A.2x=k;A.3s="";A.3Y="";A.1J="";A.2k=l;A.2l=m;A.1D=m==\'9\'?2E:1E;A.1U=n}F 5h(a,b,c,d){A.5Z=a;A.2T=b;A.1l=c;A.1H=d}F 1z(a,b,c){A.H=a;A.Y=b;A.1Z=I(c)}F 4P(a,b){A.H=a;A.Y=b}F 1n(a,b,c){y(1E==1){1a[0]["1l"]=I(1a[0]["1l"]-a);1a[0]["1H"]=I(1a[0]["1H"]+a);1a[1]["1l"]=I(1a[1]["1l"]-b);1a[1]["1H"]=I(1a[1]["1H"]+b)}L{y(c!=1b&&c!=4R&&c!=0){a=a/c}1a[0]["1l"]=I((1a[0]["1l"]-a).41(3L));1a[0]["1H"]=I((1a[0]["1H"]+a).41(3L));1a[1]["1l"]=I((1a[1]["1l"]-b).41(3L));1a[1]["1H"]=I((1a[1]["1H"]+b).41(3L))}5r()}F 5r(){17(w i=0;i<1a.P;i++){w a=X(1a[i]["1H"]/1a[i]["2T"]*6e);$($($("#3M 1k K")[i]).W("5")[1]).H(M.O(1a[i]["2T"],"S/. ").J());$($($("#3M 1k K")[i]).W("5")[2]).H(M.O(1a[i]["1H"],"S/. ").J());$($($("#3M 1k K")[i]).W("5")[3]).H(M.O(1a[i]["1l"],"S/. ").J());$($($("#3M 1k K")[i]).W("5")[4]).H(a.J()+" %");$("#6L").H(D.P.J())}}F 4Z(a){17(w i=0;i<29.P;i++){y(29[i].1e==a){w b=29[i];w c=6w(b.1e).1S("|");Q 13 6x(b.1e,b.1C,b.3A,b.2z,c[3],b.3x,b.3w,b.3Z,b.3U,c[1],c[2],I(c[0]),b.2l,b.1U)}}}F 82(a){w b;w c;w d;17(w i=0;i<v.P;i++){y(v[i].1e==a){y(R.B.1O==1b){y(v[i].2r=="0"){1h}}L{y(R.B.2g=="1Q"){y(R.B.2j!=v[i].Z){1h}}L{y(R.B.2j==v[i].Z){b=v[i].1g;c=v[i].Z;d=v[i].1y;Q b+"|"+c+"|"+d}}}y(b==1b){b=v[i].1g;c=v[i].Z;d=v[i].1y}L{y(I(b)>I(v[i].1g)){b=v[i].1g;c=v[i].Z;d=v[i].1y}}}}Q b+"|"+c+"|"+d}F 6E(a){w b=0;17(w i=0;i<D.P;i++){y(D[i].3s==""){y(D[i].1e==a){b+=1}}}Q b}F 6G(){w a=1a[0]["1l"];w b=1a[1]["1l"];y(a<0){Q 1q}L{Q b<0}}F 2s(a,b,c){y(1E!=1){w d=c!=1b&&c!=4R&&c==\'9\'?2E:1E;w e=I(1a[0]["1l"]-(a/d))}L{w e=I(1a[0]["1l"]-a)}w f=I(1a[1]["1l"]-b);y(e<0){Q 1q}L{Q f<0}}F 5H(a){w b=[];y(a!=1b){17(w i=0;i<v.P;i++){y(v[i].1e==a){y(R.B.1O==1b){y(v[i].2r=="0"){1h}}L{y(R.B.2g=="1Q"){y(R.B.2j!=v[i].Z){1h}}L{y(R.B.2j==v[i].Z){Q[13 1z(v[i].1W+" (S/."+v[i].1g+")",v[i].Z)]}}}y(b.P==0){b.1p(13 1z(v[i].1W+" (S/."+v[i].1g+")",v[i].Z));1h}w c=1A;17(w k=0;k<b.P;k++){y(v[i].Z==b[k].Y){c=1q;2m}}y(c)1h;b.1p(13 1z(v[i].1W+" (S/."+v[i].1g+")",v[i].Z))}}}Q b}F 3p(a,b){w c=[];y(a!=1b){17(w i=0;i<v.P;i++){y(v[i].Z==a&&v[i].1e==b){y(c.P==0){c.1p(13 4P(v[i].1y,v[i].1y));1h}w d=1A;17(w k=0;k<c.P;k++){y(v[i].1y==c[k].Y){d=1q;2m}}y(d)1h;c.1p(13 4P(v[i].1y,v[i].1y))}}}Q c}F 87(a,b){17(w i=0;i<v.P;i++){y(v[i].1e==a&&v[i].1y==b){Q v[i].V}}}F 4k(a){17(w i=0;i<v.P;i++){y(v[i].Z==a){Q v[i].1g}}}F 5Q(){y(4o){w a=1A;y(2f.P==0){17(w i=0;i<D.P;i++){y(D[i].3s!="0"){a=1q;2m}}}L{a=1q}y(89!=$("#2X").1j()){a=1q}y(!a){1F("22 3y a 8a 27 6v");Q}}y(D.P==0){1F("22 3y 6D 29 8c 4T 4N 1r 4M");Q}y(2s(0,0)){1F("22 a 8f 27 lí2A 1r 2ué2B, 8g 27 4N 1r 4M");Q}y($("#2c").1j()==\'-1\'){2q("6r 4U 8j 1r 8k");Q}y($("#2X").1j()==\'-1\'){2q("6r 4U 8l 1r 8m.");Q}y($("#2X").1j()==\'-2\'){2q("8n 4V 8o 4T 6v 8p 3y 8q 8rún 8s 1r 8t.");Q}$("#3X").3v();$("#5a").3v();$("#3t").2W()}F 6t(){y(D.P==0){2q("8u 29 a 27 4N 1r 4M 8v 8w");Q}w l=R.B.1O;y(l==1b){l="6q 6p"}w m=\'<?4L 4K="1.0" 4J="4I-4H-1"?><32>\';w n=\'<?4L 4K="1.0" 4J="4I-4H-1"?><32>\';17(w k=0;k<2f.P;k++){m=m+\'<2Z><2Y>\'+2f[k][0].1e.J()+\'</2Y><1C>\'+2f[k][0].1C.J()+\'</1C><V>\'+2f[k][0].V.J()+\'</V><1m>\'+2f[k][0].1m.J()+\'</1m><1W>\'+4k(2f[k][0].1m)+\'</1W><3q>\'+(k+1).J()+\'</3q><4Y>\'+2f[k][0].3Y.J()+\'</4Y></2Z>\'}m=m+\'</32>\';17(w i=0;i<D.P;i++){y(D[i].3Y==""){n=n+\'<2Z><2Y>\'+D[i].1e.J()+\'</2Y><1C>\'+D[i].1C.J()+\'</1C><V>\'+D[i].V.J()+\'</V><1m>\'+D[i].1m.J()+\'</1m><1W>\'+4k(D[i].1m)+\'</1W><3q>\'+(i+1).J()+\'</3q><1J>\'+l+\'</1J><2C>\'+D[i].2x.J()+\'</2C></2Z>\'}}n=n+\'</32>\';$.36({3o:"34",2Q:"39.2d/8J",U:"{\'6o\': \'"+$("#5g").1j()+"\',"+"\'6n\': \'"+R.B.37.3K+"\',"+"\'8L\': \'"+$("#51").1j()+"\',"+"\'6m\': \'"+$("#2c").1j()+"\',"+"\'6l\': \'"+$("#2X").1j()+"\',"+"\'8O\': \'"+m+"\',"+"\'8P\': \'"+n+"\'}",3a:"3b/1Y; 3c=38-8",3i:"1Y",3m:F(a){y(a.d==""){R.4m.4l="../6i.2d";Q}y(a.d=="4G 4F 8T 4E"){1F(a.d);Q}y(a.d=="4G 4F 6h 4E"){1F(a.d);Q}w b=3I.3F(a.d);w c=1A;w d=1A;w e=0;w f=0;w g=0;w h=0;w j=0;w k=0;17(w i=0;i<b.P;i++){y(b[i].4B=="3J 4A"){c=1q;e=e+1;g=g+I(b[i].1v);j=j+I(b[i].1B);$("#24 1k").1i("<K><5>"+b[i].1V.J()+"</5><5 G=\'H-16:1f;\'>"+M.O(b[i].1v,"S/. ").J()+"</5><5>"+b[i].1N.J()+"</5><5 G=\'H-16:1f;\'>"+M.O(b[i].1B,"S/. ").J()+"</5><5>"+b[i].1J.J()+"</5></K>")}L{d=1q;f=f+1;h=h+I(b[i].1v);k=k+I(b[i].1B);$("#2a 1k").1i("<K><5>"+b[i].1V.J()+"</5><5 G=\'H-16:1f;\'>"+M.O(b[i].1v,"S/. ").J()+"</5><5>"+b[i].1N.J()+"</5><5 G=\'H-16:1f;\'>"+M.O(b[i].1B,"S/. ").J()+"</5><5>"+b[i].1J.J()+"</5></K>")}}y(!c){$("#24").18("1d","1s")}L{$("#24 1k").1i("<K G=\'1x: #26;\'><5 G=\'1x: #26;\'>1G: "+e.J()+"</5><5 G=\'H-16:1f;1x: #26;\'>1G: "+M.O(g,"S/. ").J()+"</5><5></5><5 G=\'H-16:1f;1x: #26;\'>1G: "+M.O(j,"S/. ").J()+"</5><5></5></K>")}y(!d){$("#2a").18("1d","1s")}L{$("#2a 1k").1i("<K G=\'1x: #26;\'><5 G=\'1x: #26;\'>1G: "+f.J()+"</5><5 G=\'H-16:1f;1x: #26;\'>1G: "+M.O(h,"S/. ").J()+"</5><5></5><5 G=\'H-16:1f;1x: #26;\'>1G: "+M.O(k,"S/. ").J()+"</5><5></5></K>")}},33:F(a,b,c){35(a,b,c)}})}F 5c(){w r=\'<?4L 4K="1.0" 4J="4I-4H-1"?><32>\';17(w i=0;i<D.P;i++){w s=R.B.1O;w t=R.B.6j;w u;y(R.B.2g==1b){u=0}L{y(R.B.2g=="1Q"){u=1}L{u=0}}y(s==1b){s="6q 6p"}y(t==1b){t="0"}r=r+\'<2Z><2Y>\'+D[i].1e.J()+\'</2Y><1C>\'+D[i].1C.J()+\'</1C><V>\'+D[i].V.J()+\'</V><1m>\'+D[i].1m.J()+\'</1m><1W>\'+4k(D[i].1m)+\'</1W><3q>\'+(i+1).J()+\'</3q><6b>\'+\'1\'+\'</6b><1J>\'+s+\'</1J><2C>\'+D[i].2x.J()+\'</2C><6a>\'+t+\'</6a></2Z>\'}r=r+\'</32>\';$.36({3o:"34",2Q:"39.2d/5c",U:"{\'6o\': \'"+$("#5g").1j()+"\',"+"\'6n\': \'"+R.B.37.3K+"\',"+"\'6m\': \'"+$("#2c").1j()+"\',"+"\'9b\': \'"+u+"\',"+"\'9c\': \'"+r+"\', "+"\'6l\': \'"+$("#2X").1j()+"\', "+"\'9d\': \'"+1E+"\', "+"\'9e\': \'"+R.B.37.9f+"\'}",3a:"3b/1Y; 3c=38-8",3i:"1Y",3m:F(a){y(a.d==""){R.4m.4l="../6i.2d";Q}y(a.d=="4G 4F 6h 4E"){1F(a.d);Q}w b=3I.3F(a.d);w c=13 4r();5O=2F[c.2N()]+\', \'+c.2P()+\' 1r \'+2v[c.2I()]+\' 4c \'+c.2S();w d=2F[c.2N()]+\', \'+9g(\'0\'+c.2P(),2)+\'/\'+3W[c.2I()]+\'/\'+c.2S();$("#9h").H(d+" "+c.9i()+":"+c.9j());$("#9k").H(b[0].9l);$("#9m").H(b[0].9n);w e=1A;w f=1A;w g=0;w h=0;w j=0;w k=0;w l=0;w m=0;w n=0;w o=0;y(1E!=1){$("#24 4j").1i(\'<K G="H-16: 2b;">\'+\'<5 G="T: 4i;">3Eón</5>\'+\'<5 G="T: 1X;">V 1V (S/.)</5>\'+\'<5>1N</5>\'+\'<5 G="T: 1X;">2C 31</5>\'+\'<5 G="T: 4h;">V 1N (S/.)</5>\'+\'<5 G="T: 3H;">Nú2U</5></K>\');$("#2a 4j").1i(\'<K G="H-16: 2b;">\'+\'<5 G="T: 4i;">3Eón</5>\'+\'<5 G="T: 1X;">V 1V (S/.)</5>\'+\'<5>1N</5>\'+\'<5 G="T: 1X;">2C 31</5>\'+\'<5 G="T: 4h;">V 1N (S/.)</5>\'+\'<5 G="T: 3H;">Nú2U</5></K>\');17(w i=0;i<b.P;i++){y(b[i].4B=="3J 4A"){e=1q;g=g+1;j=j+b[i].1v;l=l+b[i].1B;w p=\'\';y(g%2){p=\'G="1x: 44(1R, 1R, 1R);"\'}$("#24 1k").1i("<K "+p+"><5>"+b[i].1V.J()+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1v,"")+"</5>"+"<5>"+b[i].1N+"</5>"+"<5 G=\'H-16:2b;\'>"+b[i].1y+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1B,"")+"</5>"+"<5>"+b[i].1J+"</5></K>")}L{f=1q;h=h+1;k=k+b[i].1v;m=m+b[i].1B;w q=\'\';y(h%2){q=\'G="1x: 44(1R, 1R, 1R);"\'}$("#2a 1k").1i("<K "+q+"><5>"+b[i].1V.J()+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1v,"")+"</5>"+"<5>"+b[i].1N+"</5>"+"<5 G=\'H-16:2b;\'>"+b[i].1y+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1B,"")+"</5>"+"<5>"+b[i].1J+"</5></K>")}}y(!e){$("#24").18("1d","1s")}L{$("#24 1k").1i("<K G=\'1x: #26; 4f-4e: 4d;\'><5>3J: "+g.J()+"</5><5></5><5></5><5 3S=\'2\' G=\'H-16:1f;\'>1G: "+M.O(n,"")+"</5><5></5></K>")}y(!f){$("#2a").18("1d","1s")}L{$("#2a 1k").1i("<K G=\'1x: #66; 4f-4e: 4d;\'><5>3J: "+h.J()+"</5><5></5><5></5><5 3S=\'2\' G=\'H-16:1f;\'>1G: "+M.O(o,"")+"</5><5></5></K>")}}L{$("#24 4j").1i(\'<K G="H-16: 2b;">\'+\'<5 G="T: 4i;">3Eón</5>\'+\'<5 G="T: 1X;">V 1V (S/.)</5>\'+\'<5 G="T: 65;">64 3h</5>\'+\'<5 G="T: 1X;">63 3Q 5X. (S/.)</5>\'+\'<5>1N</5>\'+\'<5 G="T: 1X;">2C 31</5>\'+\'<5 G="T: 4h;">V 1N (S/.)</5>\'+\'<5 G="T: 1X;">1G 3Q (S/.)</5>\'+\'<5 G="T: 3H;">Nú2U</5></K>\');$("#2a 4j").1i(\'<K G="H-16: 2b;">\'+\'<5 G="T: 4i;">3Eón</5>\'+\'<5 G="T: 1X;">V 1V (S/.)</5>\'+\'<5 G="T: 65;">64 3h</5>\'+\'<5 G="T: 1X;">63 3Q 5X. (S/.)</5>\'+\'<5>1N</5>\'+\'<5 G="T: 1X;">2C 31</5>\'+\'<5 G="T: 4h;">V 1N (S/.)</5>\'+\'<5 G="T: 1X;">1G 3Q (S/.)</5>\'+\'<5 G="T: 3H;">Nú2U</5></K>\');17(w i=0;i<b.P;i++){y(b[i].4B=="3J 4A"){e=1q;g=g+1;j=j+b[i].1v/b[i].2e;l=l+b[i].1B;n=n+(b[i].1v/b[i].2e)+b[i].1B;w p=\'\';y(g%2){p=\'G="1x: 44(1R, 1R, 1R);"\'}$("#24 1k").1i("<K "+p+"><5>"+b[i].1V.J()+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1v,"")+"</5>"+"<5 G=\'H-16:2b;\'>"+b[i].2e+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1v/b[i].2e,"")+"</5>"+"<5>"+b[i].1N+"</5>"+"<5 G=\'H-16:2b;\'>"+b[i].1y+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1B,"")+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O((b[i].1v/b[i].2e)+b[i].1B,"")+"</5>"+"<5>"+b[i].1J+"</5></K>")}L{f=1q;h=h+1;k=k+b[i].1v/b[i].2e;m=m+b[i].1B;o=o+(b[i].1v/b[i].2e)+b[i].1B;w q=\'\';y(h%2){q=\'G="1x: 44(1R, 1R, 1R);"\'}$("#2a 1k").1i("<K "+q+"><5>"+b[i].1V.J()+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1v,"")+"</5>"+"<5 G=\'H-16:2b;\'>"+b[i].2e+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1v/b[i].2e,"")+"</5>"+"<5>"+b[i].1N+"</5>"+"<5 G=\'H-16:2b;\'>"+b[i].1y+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O(b[i].1B,"")+"</5>"+"<5 G=\'H-16:1f;\'>"+M.O((b[i].1v/b[i].2e)+b[i].1B,"")+"</5>"+"<5>"+b[i].1J+"</5></K>")}}y(!e){$("#24").18("1d","1s")}L{$("#24 1k").1i("<K G=\'1x: #26; 4f-4e: 4d;\'><5 G=\'1x: #26;\'>1G: "+g.J()+"</5><5></5><5></5><5></5><5></5><5></5><5 3S=\'2\' G=\'H-16:1f;\'>1G: "+M.O(n,"")+"</5><5></5></K>")}y(!f){$("#2a").18("1d","1s")}L{$("#2a 1k").1i("<K G=\'1x: #66; 4f-4e: 4d;\'><5>1G: "+h.J()+"</5><5></5><5></5><5></5><5></5><5></5><5 3S=\'2\' G=\'H-16:1f;\'>1G: "+M.O(o,"")+"</5><5></5></K>")}}},33:F(a,b,c){35(a,b,c)}})}F 6O(){$.36({3o:"34",2Q:"39.2d/9F",U:"{\'9G\': \'"+R.B.37.3K+"\'}",3a:"3b/1Y; 3c=38-8",3i:"1Y",3m:F(a){w b=a.d;w c=-1;17(w i=0;i<b.P;i++){y(b[i].5W==\'E\'&&b[i].9I){c=b[i].3B;1E=b[i].3h;$("#9K").H(b[i].5V)}y(b[i].5W==\'C\'){2E=b[i].3h}}y(b.P>1){$("#2c").1i(\'<3D Y="-1" >--9M 9N--</3D>\')}17(w i=0;i<b.P;i++){$("#2c").1i(\'<3D Y="\'+b[i].3B+\'" >\'+b[i].5V+\'</3D>\')}y(R.B.3B!=1b){$("#2c").1j(R.B.3B)}y(c!=-1){$("#2c").2w("4S","4S");$("#2c").1j(c)}6k();5T()},33:F(a,b,c){35(a,b,c)}})}F 69(){y($("#2c").1j()!=\'-1\'){$("#9P").2w("9Q","9R.2d?3B="+$("#2c").1j());$("#67").18("1d","2o");$("#3t").18("1d","1s")}}F 5N(a){w b=[];y(a!=1b){17(w i=0;i<v.P;i++){y(v[i].1e==a){y(R.B.1O==1b){y(v[i].2r=="0"){1h}}L{y(R.B.2g=="1Q"){y(R.B.2j!=v[i].Z){1h}}L{y(53){y(R.B.2j==v[i].Z){y(v[i].28==v[i].Z){y(v[i].1P==-1){Q[13 1z(v[i].1W+" ("+M.O(v[i].1g,"S/.")+")",v[i].Z,v[i].1g)]}L{Q[13 1z(v[i].3n+" ("+M.O(v[i].1T,"S/.")+")",v[i].1P,v[i].1T)]}}}L{y(v[i].2r=="0"){1h}}}L{y(v[i].2r=="0"){1h}}}}y(b.P==0){y(v[i].28==v[i].Z){y(v[i].1P==-1){b.1p(13 1z(v[i].1W+" ("+M.O(v[i].1g,"S/.")+")",v[i].Z,v[i].1g))}L{b.1p(13 1z(v[i].3n+" ("+M.O(v[i].1T,"S/.")+")",v[i].1P,v[i].1T))}}1h}w c=1A;17(w k=0;k<b.P;k++){y(v[i].Z==b[k].Y){c=1q;2m}}y(c)1h;y(v[i].28==v[i].Z){y(v[i].1P==-1){b.1p(13 1z(v[i].1W+" ("+M.O(v[i].1g,"S/.")+")",v[i].Z,v[i].1g))}L{b.1p(13 1z(v[i].3n+" ("+M.O(v[i].1T,"S/.")+")",v[i].1P,v[i].1T))}}}}}Q b}F 4x(a,b){w c=[];w d=0;17(w i=0;i<v.P;i++){y(v[i].Z==b){d=I(v[i].1g);2m}}y(a!=1b){17(w i=0;i<v.P;i++){y(v[i].1U==\'1Q\'&&v[i].Z==v[i].28){1h}y(v[i].1e==a){y(R.B.1O==1b){y(v[i].2r=="0"){1h}}L{y(R.B.2g=="1Q"){y(R.B.2j!=v[i].Z){1h}}L{y(53){y(R.B.2j==v[i].Z){y(v[i].28==b){y(v[i].1P==-1){Q[13 1z(v[i].54+" ("+M.O(v[i].1g,"S/.")+")",v[i].Z,v[i].1g)]}L{Q[13 1z(v[i].3n+" ("+M.O(v[i].1T,"S/.")+")",v[i].1P,v[i].1T)]}}}L{y(v[i].2r=="0"){1h}}}L{y(v[i].2r=="0"){1h}}}}y(c.P==0){y(v[i].28==b){y(v[i].1P==-1){c.1p(13 1z(v[i].54+" (+ "+M.O(I(v[i].1g)-d,"S/.")+")",v[i].Z,v[i].1g))}L{c.1p(13 1z(v[i].3n+" ("+M.O(v[i].1T,"S/.")+")",v[i].1P,v[i].1T))}}1h}w e=1A;17(w k=0;k<c.P;k++){y(v[i].Z==c[k].Y){e=1q;2m}}y(e)1h;y(v[i].28==b){y(v[i].1P==-1){c.1p(13 1z(v[i].54+" (+ "+M.O(I(v[i].1g)-d,"S/.")+")",v[i].Z,v[i].1g))}L{c.1p(13 1z(v[i].3n+" ("+M.O(v[i].1T,"S/.")+")",v[i].1P,v[i].1T))}}}}}y(c.P==0){c.1p(13 1z("9W ("+M.O(0,"S/.")+")",b,d))}Q c}F 4O(a){w b=0;y(a!=1b){17(w i=0;i<v.P;i++){y(v[i].Z==a){b=v[i].28;Q b}}}}F 5T(){w a,4b,49;y(1E==1){a=[{1K:"3e",T:"3N",1M:"3e"},{1K:"3P",T:"9Z",1M:"3P"},{1K:"V",1M:"V"}];4b=1I.3r($("#58").1L());49=1I.3r($("#57").1L())}L{a=[{1K:"3e",T:"11%",1M:"3e"},{1K:"3h",T:"7%",1M:"3h<3T/>1V"},{1K:"5M",T:"10&",1M:"5M<3T/>1V"},{1K:"3P",T:"62%",1M:"3P"},{1K:"31",T:"0%",1M:"31",a1:!5J},{1K:"3Q",T:"10%",1M:"1G"}];4b=1I.3r($("#a3").1L());49=1I.3r($("#a4").1L())}y(!5J){6T="1d: 1s;"}$("#42").43({3V:{U:D},6R:a,6M:1A,58:4b,57:49,3G:a5})}F 4w(a,b,c){17(w i=0;i<v.P;i++){y(v[i].1e==a&&v[i].1y==b&&v[i].Z==c){Q v[i].V}}17(w i=0;i<v.P;i++){y(v[i].1e==a&&v[i].1y==b&&v[i].1P==c){Q v[i].V}}}F 4a(){w a=0.0;17(w i=0;i<D.P;i++){y(1E==1){a=a+I(D[i].V)}L{a=a+(I(D[i].V)/D[i].1D)+I(D[i].2k)}}Q a}F 6w(a){w b;w c;w d;w e;w f;17(w i=0;i<v.P;i++){y(v[i].1e==a){y(b==1b){y(v[i].1U==\'4Q\'||v[i].5I==\'1\'||(v[i].1U==\'1Q\'&&v[i].Z!=v[i].28)){f=v[i].V/(v[i].2l==9?2E:1E);y(1a[0]["1l"]>=f&&1a[1]["1l"]>=v[i].1g){b=v[i].1g;c=v[i].Z;d=v[i].1y;e=v[i].V;2m}}}}}y(b==1b){b=48;c=0;d=1;e=48}Q b+"|"+c+"|"+d+"|"+e}F 5D(a,b,c){w d,47,2v,46,59,4y;17(w i=0;i<v.P;i++){y(v[i].1e==a&&v[i].28==b){y(d==1b){y(v[i].1U==\'4Q\'||v[i].5I==\'1\'||(v[i].1U==\'1Q\'&&v[i].Z!=v[i].28)){59=v[i].V/(v[i].2l==9?2E:1E);4y=D[c].V/(v[i].2l==9?2E:1E);y((1a[0]["1l"]+4y)>=59&&1a[1]["1l"]>=v[i].1g){d=v[i].1g;47=v[i].Z;2v=v[i].1y;46=v[i].V;2m}}}}}y(d==1b){d=48;47=0;2v=1;46=48}Q d+"|"+47+"|"+2v+"|"+46}',62,632,'|||||td||||||||||||||||||||||||||productosBase|var||if||this|parent||arregloSeleccion||function|style|text|parseFloat|toString|tr|else|formatNumber||newo|length|return|window||width|data|Precio|find|parseInt|value|idPlan||||new|||align|for|css||indicadoresVariante|undefined|rowIndex|display|P_inCod|right|PrercioPlan|continue|append|val|tbody|Disponible|IdPlan|operarInidicadores|kendoDropDownList|push|true|de|none|context|element|PrecioEquipo|click|background|MesesContrato|miPlan|false|PrecioPlan|vcNom|CuotasEquipo|MesesFinanciamientoEquipo|alert|Total|Utilizado|kendo|Numero|field|html|title|Plan|NumeroRenovar|idPlan_equivalente|True|234|split|PrercioPlan_equivalente|ObligPlanDep|Equipo|DscPlan|45px|json|precio||planes|Usted||tbAdquiridos|dataItem|E2F0F6|su|IdPlanBase|productos|tbNoAdquiridos|center|ddlFinanciamiento|aspx|MesesEquipo|arregloEli|FlagMantenerPlan|precioOnTopAnterior|div|IdPlanNumeroRenovar|MinPrecioPlan|IdGama|break|cboOnTop|block|trim|alerta|EsNuevo|validarexcesoBool_monto|setDataSource|cr|meses|attr|NumMeses|UsarPlanDep|vcDes|mite|dito|Meses|superado|MesesFinanciamientoChip|dias|ha|DataSource|getMonth|cboPlanes|SubPlanes|boolEnlazarClick|_optionID|getDay|hover|getDate|url|btnComprarConfirmado|getFullYear|Aprobado|mero|MesContratoAnterior|hide|ddlLugarEntregaPedido|IdProducto|PEDIDO||Contrato|TABLE|error|POST|MostrarErrorAjax|ajax|CampanaConf|utf|Pedido|contentType|application|charset|cursor|Producto|class|subtitulo|Cuotas|dataType|tapSelect|campanaActiva|precioPlanAnterior|success|DscPlan_equivalente|type|obtenerMesesByPlan|Orden|template|Accion|Global|valuePlanAnterior|show|CantidadUsada|CantidadTotal|no|input|imIma|IdTipoFinanciamiento|change|option|Descripci|parse|height|60px|JSON|Equipos|IdCampana|numDecimales|tablaInidicador|100px|cboMeses|Detalles|Mensual|index|colspan|br|Reservable|dataSource|MesesEnteros|capaPopUp|IdDetalle|CantidadDisponible||toFixed|gridDetEle|kendoGrid|rgb|dataBound|precioEquipo|id|100000|altRowTemp|productoPrecioTotal|rowTemp|del|bold|weight|font|_selectedValue|40px|160px|thead|obtenerPrecioPlanPorIdPlan|href|location|valueOnTopAnterior|esEditar|Stock|tablaDscCampana|Date|totalesCarrito|eliEle|span|Array|obtenerPrecioEquipoPorMeses_yPlan|obtenerPlanesDependientes|cuotaMensualEquipoAnterior|dataValueField|adquiridos|Estado|default|pointer|PRODUCTO|AL|ERROR|8859|iso|encoding|version|xml|compras|carrito|obtenerPlanBase|misMesesContrato|False|null|disabled|el|un|puede|dataTextField|Al|idDetallePedido|obtenerProducto||hdfIdPedidoEditar|mes|obligarMantenerPlan|NombreCorto|attributes|dscPlanCombo|altRowTemplate|rowTemplate|cuotaMensualEquipo|dvConfirmCompra|MiProducto|registrarPedido|tap|removeClass|addClass|hdfEmpleado|miIndicadorCredito|detalleTaps|DescripcionProducto|enlazarClick|las|unbind|fechaLimiteModificacion|substring|open|left|actualizarIndicadores|detalleEliminar|txtCantidadDetalle|pnlticket|_|splice|300|Debe|mousemove|detallePlan|aceptar|pageX|obtenerPrecioSegunPlanBase|top|pageY|tdPrePro|obtenerPlanesByIdProducto|planUnico|ElegirMesesPlan|Cantidad|dcCan|Monto|obtenerPlanesBase|strFechaInicio|animate|procesarPedido|tdPreMen|tdTotMen|enlacesLoad|condiciones|DescripcionCorta|Categoria|Eq|00|Descripcion|tapDeclaracion|Fecha||Cuota|Nro|35px|f6e2e2|pnlDscFinanciamiento|creditos|fnMostrarDscFinancimiento|PrecioPlanAntiguo|esNuevo|imgVerDetalleFinanciamiento|tapCarrito|100|pSelecPro|EliDetPlan|AGREGAR|FinSession|PrecioPlanNumeroRenovar|obtenerProductos|prIdOficina|prIdTipoFinanciamiento|pIdCampana|prIdEmpleado|Linea|Nueva|Seleccione|tapProducto|ModificarPedido|Common|pedido|obtenerPrecioSegunCredito|MiProductoElegido|focus|cantidad|disponible|stock|enlacesInicial|tiene|obtenerStockSelecionado|getCondicionesTemrinos|validarexcesoBool|al|TblDetPlan|subirCarrito|onDataBound|CarritoCantidad|sortable|indicadoresInicial|fnObtenerFinancimientos|enable|Comprar|columns|obtenerCreditos|rm|obtenerCampanaActiva|DescargarArchivo|foto|altRowTemplateCarrito|fcfdfd|dvMsgAlerta||a6c9e2|solid|Desde|1px|images|grid|header|float|rowTemplateCarrito|border|getDetallePedidoByPedido|prIdPedido|200px|idEquipo|ui|btnVolverPedidos|navigatable|Precio_Equipo|Meses_Contrato|Precio_Plan|groupable|pageSize|09|lo|PedidoIE|elegir|gridPro|equipo|renovar|con|120|08|esPreVentaActiva|tems|comprar|280|seleccionado|07|230|direc|bg_inset|Ingrese|una|lblDireccionCompleta|correcta|btnCancelarCompra|La|ingresada|ser|mayor|50px|prop|dcMon|06|05|PrecioEquiDesc|lblMonto|vcNomOpe|hard_100_fcfdfd_1x100|04|Operador|btnAceptarCompra|pnlCarrito|obtenerPrecioMinimoPlan|03|02|01|Diciembre|obtenerPrecioEquipoPorMeses|lblOperador|vCodLugarEntrega_Ori|modificado|pProcesoCompra|en|png|lblDescripcion|sobrepasado|verifique|Noviembre|bottom|tipo|financiamiento|Lugar|Entrega|No|generar|porque|existe|ning|lugar|entrega|Agregue|por|favor|repeat|pWhere|Controladores|detalles|lblNombre|ashx|archivo|Octubre|Setiembre|Agosto|Julio|Junio|editarPedido|color|pIdPedido|IdEmpleado|ObtenerProductosCampanaEmpleadoByPedido|pXmlEliminar|pXmlAgregar|222222|Contratos|Condiciones|ELIMINAR|pdf|margin|6em|Mayo|0em|Abril|Marzo|Febrero|Enero|bado|Viernes|Jueves|rcoles|Mi|Martes|ProductoCreditoAsignado|each|prMantuvoPlan|pXmlPedido|prMesesEquipo|prMaxIdPedido|MaxIdPedido|Right|lblFechaPedi|getHours|getMinutes|lblCodigoPedido|codigopedido|lblEstadoPedidoCompra|EstadoPedido|prIdPlan|obtenerDetallePlan|Lunes|Domingo|CreditoUsuario|eliFinan|live|declaracionFechaActual|eq|children|Renovar|pDetEle|Fin|horas|Inicio|Campa|pDeclaracion|ListarFinanciamientoPorCampana|prIdCampana|chkConfirmarTerminos|EsDefault|ul|spanDdlFinanciamiento|is|Selecione|Financimiento|strfechaFin|frmDscFinanciamiento|src|Detalle_Financiamiento|2016|select|agosto|checked|Ninguno|Bolsa|FechaActual|530px|FechaFin|hidden|Ilimitado|rowTemplate_Cuotas|altRowTemplate_Cuotas|350|FechaInicio|vcSer|130px|toUpperCase|120px|important'.split('|'),0,{}))
    </script>
    <link href="CarritoIE.css" rel="stylesheet" type="text/css" />
    <script id="rowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alta">
		    <td class="photo">
                <div class="gridIma">
                <img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" />                        
                </div>
		    </td>
		    <td class="details">
                <div style=" width:510px;">

                <div>
                    <span class="title">#:data.vcNom#</span> 
                    <div class="eliEle" style="float:right; cursor:pointer;"><img alt="" src="../Common/Images/eliele.png"/></div>
                </div> 

                <div style="float:left; margin-left:3px;">Plan :</div>
                <div style="float:left; margin-left:5px;"><select id="cboPlanes-#:data.P_inCod#" class="cboPlanes" style="width:250px;"></select></div>
                <div style="float:left; margin-left:5px;"><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px;"><img alt="" src="../Common/Images/view.png"/></div></div>
                <div style="float:left; margin-left:15px;">Contrato por:</div>
                <div style="float:left; margin-left:5px;"><select  id="cboMeses-#:data.P_inCod#" class="cboMeses" style="width:30px;"></select></div>

                </div>
		    </td>
		    <td class="tdPrePro">
		        S/. #: data.Precio #
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    		    <td class="photo">
                <div class="gridIma">
                <img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" />                        
                </div>
		    </td>
		    <td class="details">
                <div style=" width:510px;">

                <div><span class="title">#:data.vcNom#</span> <div class="eliEle" style="float:right; cursor:pointer;"><img alt="" src="../Common/Images/eliele.png"/></div> </div> 

                <div style="float:left; margin-left:3px;" >Plan :</div>
                <div style="float:left; margin-left:5px;"><select id="cboPlanes-#:data.P_inCod#" class="cboPlanes" style="width:250px;"></select></div>
                <div style="float:left; margin-left:5px;"><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px;"><img alt="" src="../Common/Images/view.png"/></div></div>
                <div style="float:left; margin-left:15px;">Contrato por:</div>
                <div style="float:left; margin-left:5px;"><select  id="cboMeses-#:data.P_inCod#" class="cboMeses" style="width:30px;"></select></div>

                </div>
		    </td>
		    <td class="tdPrePro">
		        S/. #: data.Precio #
		    </td>
	    </tr>
    </script>

    <script id="rowTemplate_Cuotas" type="text/x-kendo-tmpl">
	    <tr class="k-alta">
		    <td class="" style="width: 80px;">
                <div class="gridIma">
                    <img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" />
                </div>
                <div style="text-align: center;" class="tdPrePro">S/. #: data.Precio #</div>
		    </td>
            <td style="text-align: center; width: 55px;" class="tdMesFinanc">
                #: data.CuotasEquipo #
            </td>
            <td class="tdPreMen" style="text-align: right;">
                #: formatNumber.newo((data.Precio / data.CuotasEquipo), "S/. ") # <br/>(Al mes)
            </td>
		    <td class="" style="width: 400px;">
                <div>
                    <span class="title">#:data.vcNom#</span>
                    <div class="eliEle" style="float:right; cursor:pointer;"><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></div>
                </div>
                <div style="float:left; margin-left:3px;">Plan :</div>
                <div style="float:left; margin-left:5px;"><input style="width: 325px;" class="cboPlanes" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#"/></div>
                <div style="float:left; margin-left:5px;"><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px;"><img alt="" src="../Common/Images/view.png" class="imgBtn"/></div></div>
                <div style="float: left;">
                    <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="width: 275px; #:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
                </div>
		    </td>
            <td style="#: rm #">
                <span class="title" style="float:left">Meses</span>
                <input id="cboMeses-#:data.P_inCod#" class="cboMeses" style="width:45px;"/>
            </td>
		    <td class="tdTotMen" style="text-align: right;">
                #: formatNumber.newo((parseFloat(data.MinPrecioPlan) + parseFloat(data.Precio / data.CuotasEquipo)), "u/. ") #
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplate_Cuotas" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    <td class="" style="width: 80px;">
                <div class="gridIma">
                    <img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" />
                </div>
                <div style="text-align: center;" class="tdPrePro">S/. #: data.Precio #</div>
		    </td>
            <td style="text-align: center; width: 55px;" class="tdMesFinanc">
                #: data.CuotasEquipo #
            </td>
            <td class="tdPreMen" style="text-align: right;">
                #: formatNumber.newo((data.Precio / data.CuotasEquipo), "S/. ") # <br/>(Al mes)
            </td>
		    <td class="" style="width: 400px;">
                <div>
                    <span class="title">#:data.vcNom#</span>
                    <div class="eliEle" style="float:right; cursor:pointer;"><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></div>
                </div>
                <div style="float:left; margin-left:3px;">Plan :</div>
                <div style="float:left; margin-left:5px;"><input style="width: 325px;" class="cboPlanes" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#"/></div>
                <div style="float:left; margin-left:5px;"><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px;"><img alt="" src="../Common/Images/view.png" class="imgBtn"/></div></div>
                <div style="float: left;">
                    <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="width: 275px; #:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
                </div>
		    </td>
            <td style="#: rm #">
                <span class="title" style="float:left">Meses</span>
                <input id="cboMeses-#:data.P_inCod#" class="cboMeses" style="width:45px;"/>
            </td>
		    <td class="tdTotMen" style="text-align: right;">
                #: formatNumber.newo((parseFloat(data.MinPrecioPlan) + parseFloat(data.Precio / data.CuotasEquipo)), "p/. ") #
		    </td>
	    </tr>
    </script>

    <script id="rowTemplateCarrito" type="text/x-kendo-tmpl">
	    <tr class="fila-a">
		    <td style="text-align:center;">
                <div class="gridImaCar"><img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" style="width:35px;" />
                </div>
		    </td>
		    <td>
	            #:data.vcNom#
		    </td>
		    <td style="text-align:right;" CodigoProducto="#: data.P_inCod#">
		        #:data.CantidadDisponible#
		    </td>
            <td style="text-align:right;">
		        #:data.PrecioEquiDesc#
		    </td>
            <td>
		        <input maxlength="2" style="width:30px; text-align:right; float:left;" class="txtCantidadDetalle" value="1"/>
                <div style="float:left; width:70px;" class="subirCarrito k-button" >
                    Agregar
                    <span class="k-icon k-i-plus">
                </div>
                <div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>

    <script id="rowTemplateCarrito_1" type="text/x-kendo-tmpl">
	    <tr class="fila-a">
		    <td class="foto" style="text-align:center;">
                <div class="gridImaCar"><img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" style="width:35px;" />
                </div>
		    </td>
		    <td class="detalles">
	            #:data.vcNom#
		    </td>
		    <td class="Stock" CodigoProducto="#: data.P_inCod#">
		        #:data.CantidadDisponible#
		    </td>
            <td class="Precio">
		        #:data.PrecioEquiDesc#
		    </td>
            <td class="Comprar">
		        <input maxlength="2" style="width:30px; text-align:right; float:left;" class="k-textbox txtCantidadDetalle" value="1"/><div style="float:left; width:80px;" class="subirCarrito k-button" >Agregar<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplateCarrito" type="text/x-kendo-tmpl">
	    <tr class="fila-b">
		    <td style="text-align:center;">
                <div class="gridImaCar"><img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" style="width:35px;" />                
                </div>
		    </td>
		    <td>
	            #:data.vcNom#
		    </td>
		    <td style="text-align:right;" CodigoProducto="#: data.P_inCod#">
		        #:data.CantidadDisponible#
		    </td>
            <td style="text-align:right;">
		        #:data.PrecioEquiDesc#
		    </td>
            <td>
		        <input maxlength="2" style="width:30px; text-align:right; float:left;" class="txtCantidadDetalle" value="1"/>
                <div style="float:left; width:70px;" class="subirCarrito k-button" >
                    Agregar
                    <span class="k-icon k-i-plus">
                </div>
                <div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplateCarrito_1" type="text/x-kendo-tmpl">
	    <tr class="fila-b">
		    <td class="foto" style="text-align:center;">
                <div class="gridImaCar"><img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" style="width:35px;" />                
                </div>
		    </td>
		    <td class="detalles">
	            #:data.vcNom#
		    </td>
		    <td class="Stock" CodigoProducto="#: data.P_inCod#">
		        #:data.CantidadDisponible#
		    </td>
            <td class="Precio">
		        #:data.PrecioEquiDesc#
		    </td>
            <td class="Comprar">
		        <input maxlength="2" style="width:30px; text-align:right; float:left;" class="k-textbox txtCantidadDetalle" value="1"/><div style="float:left; width:80px;" class="subirCarrito k-button" >Agregar<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
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
        <p runat="server" id="pDscPreventa"></p>
    </div>
    <div id="pBotonesPedido" style="display:none;" runat="server"></div>
    <div  id="Global" class="general" style="z-index:100;">
        <div id="pnlCarrito">
        <div id="pnlIndicadores" class="pContenedor"> 
            <table id="tablaInidicador" border="0" cellpadding="5" cellspacing="0">
                <thead>
                <tr>
                    <td class="subtitulo">Tipo</td>
                    <td class="subtitulo">Aprobado</td>
                    <td class="subtitulo">Utilizado</td>
                    <td class="subtitulo">Disponible</td>
                    <td class="subtitulo">Estado crédito</td>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <table id="tablaDscCampana" border="0" cellpadding="5" cellspacing="0">
                <tbody>
                </tbody>
            </table>
            <div id="dvImagenCarrito" style="width:100px; height:80px; float:left; border:0px dotted gray; margin-left:0px; margin-top:10px;">
                <div style="width:100px; height:20px; ">
                    <div id="CarritoCantidad" style="width:25px; height:20px;  float:right; 
                        text-align:center; /*color:#003F59;*/ color: #8b0000; font-weight:bold;">0</div>
                </div>
                <div id="irCompras" style="width:100px; height:60px; background:#FFFFFF;">
                    <img style="float:right; margin-right:20px;" src="../Common/Images/cart_shop.png" />
                </div>
            </div>
        </div>

        <div id="cuerpoTaps" style="margin-top:20px;">
                <div class="navtaps">
                    <div id="tapProducto" class="tap tapSelect" style="color: darkred;">
                        Paso 1 : Escoja Equipo
                    </div>
                    <div id="tapCarrito" class="tap" style="color: darkred;">
                        Paso 2 : Plan y Plazo Contrato
                    </div>
                    <div id="tapDeclaracion" class="tap" style="color: darkred;">
                        Paso 3 : Confirmación de Compra
                    </div>
                </div>
                <div id="detalleTaps">
                    <div id="pSelecPro">
                       <%-- <div id="toolBarPro"> MMACISO
                            <select style="float: left;" id="required" data-placeholder="Seleccione categoria...">
                                <option>Modelo</option>
                                <option>Gama</option>
                                <option>Nombre</option>
                            </select>
                            <div id="pddlModelo" style="float: left;">
                                <select style="float: left; width: 400px;" id="ddlModelo" data-placeholder="Seleccione modelo...">
                                </select>
                            </div>
                            <div id="pddlGama" style="float: left; display: none;">
                                <select style="float: left; width: 400px;" id="ddlGama" data-placeholder="Seleccione gama...">
                                </select>
                            </div>
                            <div id="ptxtNombre" style="float: left; display: none;">
                                <input style="width: 300px; margin-top: 5px;" id="txtNombre" type="text" class="k-textbox" />
                            </div>
                            <div id="btnFiltroProducto" class="k-button" style="float: right; width: 70px; height: 33px;
                                margin-right: 40px; padding-top: 7px;">
                                Buscar
                            </div>
                        </div>--%>
                        <table id="gridPro">
                        </table>
                        <table id="gridPro_1" style="display:none;">
                            <colgroup>
                                <col class="foto"  />
                                <col class="detalles" />
                                <col class="Stock" />
                                <col class="Precio" />
                                <col class="Comprar" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th >
                                        Producto
                                    </th>
                                    <th >
                                        Detalles
                                    </th>
                                    <th >
                                        Stock
                                    </th>
                                    <th >
                                        Precio Lista
                                    </th>
                                    <th >
                                        Comprar
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr>
                                    <td colspan="3">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="pDetEle" style="display: none;">
                        <table id="gridDetEle">
                        </table>
                        <table id="gridDetEle_1" style="display:none;">
                            <colgroup>
                                <col class="photo" />
                                <col class="details" />
                                <col />
                            </colgroup>
                            <thead >
                                <tr>
                                    <th>
                                        Producto
                                    </th>
                                    <th>
                                        Detalles
                                    </th>
                                    <th>
                                        Precio<br />
                                        Equipo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="3">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="k-block k-success-colored" id="totalesCarrito" style="">
                            <div style="float: right; margin-right: 15px; font-size: 12pt;">
                                Total mensual (pedido): <span></span>
                            </div>
                            <div style="float: right; margin-right: 15px; font-size: 12pt; display: none;">
                                * Usted a superado su consumo disponible</div>
                        </div>
                    </div>
                    <div id="pDeclaracion" style="display: none; height: 320px; overflow: auto; padding: 40px;">
                        <ul id="ulFinanciamiento">
                            <li><span style="font-weight:bolder;">Financiamiento : </span></li>
                            <li>
                                <asp:DropDownList ID="ddlFinanciamiento" runat="server">
                                </asp:DropDownList>
                            </li>
                            <li>
                                <img id="imgVerDetalleFinanciamiento" src="../Common/Images/view.png" />
                            </li>
                        </ul>
                        <%--<p>
                            Se enviará su solicitud al proveedor, no podrá ser modificada después de las 18:00
                            horas del día de hoy (<span id="declaracionFechaActual"></span>). Para confirmar
                            su compra deberá aceptar las condiciones del contrato.
                        </p>--%>
                        <p>
                            Se enviará su solicitud al proveedor, no podrá ser modificada después de <span id="fechaLimiteModificacion"></span>. Para confirmar su compra deberá aceptar las condiciones del contrato.
                        </p>
                        <div id="dvLugarEntrega" runat="server" style="padding-bottom: 10px; display:none; z-index: 101;">
                            Lugar de entrega:&nbsp;&nbsp;<asp:DropDownList runat="server" ID="ddlLugarEntregaPedido" style="padding: 4px;font-size: 11px;width: 500px;"></asp:DropDownList>
                            <br /><br />
                            <asp:Label ID="lblDireccionCompleta" runat="server" style="color: #003F59;font-weight: bold;width: 8px;"/>
                        </div>
                        <input id="chkConfirmarTerminos" type="checkbox" /><span>Acepto haber leído y estar
                            de acuerdo con las <a class="getCondicionesTemrinos" style="text-decoration: underline;">
                                condiciones.</a></span>
                        <div style="clear: both; margin-bottom: 20px;">
                        </div>
                        <div id="btnComprarConfirmado" style="width: 120px; height: 50px; cursor: hand; cursor: pointer;
                            border: 0px dotted gray; margin: auto;">
                            <img style="max-width: 100%; width: 100%; height: 100%" src="../Common/Images/boton_comprar.jpg" /></div>
                    </div>
                </div>
            </div>


        </div>
        
        <div id="pProcesoCompra" style="display: none; height: 666px; overflow: auto;">
            <div style="width:100%; text-align:center; color: #003F59;  font-size:12pt;">Resumen de Pedido</div>
            <table id="tbResComp" cellpadding="0" cellspacing="0" border="0" style="margin: 5px 0px 15px 15px;">
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Fecha:</b>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblFechaPedi" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3">
                    </td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Nombre:</b>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3">
                    </td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Área:</b>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3">
                    </td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Centro de Costos:</b>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3">
                    </td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Código de pedido:</b>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblCodigoPedido" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3">
                    </td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Estado de pedido:</b>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblEstadoPedidoCompra" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
            </table>

            <table id="tbAdquiridos" align="center" cellpadding="6" style="font-size:8pt; margin-bottom:20px; color:#003F59;" >
                <thead style="background: #E2F0F6; font-weight: bold;">
                    <tr style="font-size: 10pt; text-align: center;">
                        <td>
                            Equipos Adquiridos
                        </td>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        <%--<table id="tbAdquiridos" align="center" cellpadding="10" style="font-size:10pt; margin-bottom:20px;" class="subtitulo">
            <thead style="background: #E2F0F6; ">
                <tr>
                    <td>
                        Equipos Adquiridos
                    </td>
                </tr>
                <tr>
                    <td>Descripción</td>
                    <td>Precio Equipo</td>
                    <td>Plan</td>
                    <td>Precio Plan</td>
                    <td>Número</td>
                </tr>
            </thead>

            <tbody>
            </tbody>        
        </table>--%>

            <table id="tbNoAdquiridos" align="center" cellpadding="6" style="font-size:8pt; color:darkred;">
                <thead style="background: #f6e2e2; font-weight: bold;">
                    <tr style="font-size: 10pt; text-align: center;">
                        <td>
                            Equipos No Adquiridos
                        </td>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        <%--<table id="tbNoAdquiridos" align="center" cellpadding="10"  class="subtitulo" style="font-size:10pt; color:darkred;">
            <thead style="background: #E2F0F6;  ">
                <tr>
                    <td>
                        Equipos No Adquiridos
                    </td>
                </tr>
                <tr>
                    <td>Descripción</td>
                    <td>Precio Equipo</td>
                    <td>Plan</td>
                    <td>Precio Plan</td>
                    <td>Número</td>
                </tr>
            </thead>

            <tbody>
            </tbody>
        </table>--%>

        <div id="btnVolverPedidos" class="k-button" style="width: 200px; height: 30px; margin: 40px 0px 0px 300px;
            font-weight: bolder;">
            Ir a mis pedidos
        </div>

        </div>   

        <div id="pnlticket"  style="display:none; width:500px; overflow:hidden; position:absolute; left:100px; top:100px; z-index:3000; 
            background-color:#E2F0F6; border:solid; border-color:#add8e6;">
        <div class="EliDetPlan" title="Presione para cerrar" style="float:right;background-color:skyblue;">
         << volver a carrito
        </div>
        <div class="cGenInfo titulo" style="width: 490px; height: auto;">
            <b><span id="lblNombre"></span></b>
        </div>
        <br />
        <table class="miTabla" border="0" cellpadding="0" cellspacing="0">
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
        <table id="TblDetPlan" class="miTabla" border="0" cellpadding="0" cellspacing="0">
        </table>
    </div>
        
    </div>

    <div id="capaPopUp" style="display:none; z-index:200;" runat="server">
    </div>

    <div id="pnlDscFinanciamiento" style="width:795px; height:500px; border:1px solid #1A536A; display:none;">
        <div style="text-align:center;  border-bottom:1px solid #1A536A; font-size:large; background:#DEEBEF; color:#1A536A;">Detalle de financiamiento <div id="eliFinan" style="width:20px; height:20px;  float:right; margin-top:-20px;"><img alt="" src="../Common/Images/eliele.png"/></div></div>
        <iframe id="frmDscFinanciamiento" frameborder="0" style="padding: 0px; margin: 0px;" src="" height="100%" width="100%"></iframe>
    </div>
    <div id="detallePlan" style="position:absolute; left:0px; top:0px; background-color:#003F59; box-shadow:0px 0px 5px gray; padding:3px; border-radius:5px; z-index:999999; display:none; color:White;">Detalle Plan</div>
    <div id="detalleEliminar" style="position:absolute; left:0px; top:0px; background-color:#003F59; box-shadow:0px 0px 5px gray; padding:3px; border-radius:5px; z-index:999999; display:none; color:White;">Click para eliminar</div>

    <div id="dvConfirmCompra" style="display:none; background:white; width:200px; height:100px; border:1px solid #1A536A; left: 275px;top: 275px; position: absolute; z-index: 1000;">
        <div style="text-align:center;  border-bottom:1px solid #1A536A; font-size:large; background:#DEEBEF; color:#1A536A;">Compra de productos</div>
        <div style="padding:8px;">¿Esta usted seguro de enviar el pedido?</div>
        <div id="btnAceptarCompra" class="botonIE">Aceptar</div>
        <div id="btnCancelarCompra" class="botonIE">Cancelar</div>
    </div>
    </form>
</body>
</html>
