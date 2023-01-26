<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PedidoPlan.aspx.vb" Inherits="WebSiteCliente.PedidoPlan" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
<%--    <script type="text/javascript" src="PedidoPlanIE.js"></script>--%>
    <script type="text/javascript">
        eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('7 2X=\'14 Q 5d 1X 5e a 2Y 23:3x:3x 5f\';7 2s=1g;7 W;7 1K=0;7 t;7 18=[];7 3y=[];7 I=[];7 y=[];7 1h=["5g","5h","5i","5jé5k","5l","5m","Sá5n"];7 1Y=["5o","5p","5q","5r","5s","5t","5u","5v","5w","5x","5y","5z"];7 1L=["5A","5B","5C","5D","5E","5F","5G","5H","5I","10","11","12"];7 3z;9 2Z(a,b,c,d){A.3A=a;A.1z=b;A.X=c;A.1a=d}$(9(){$("#2X").u(2X);r(v.x.3B!=$("#3C").15()){v.1Z.21=\'../3D.1o\';B}31();$(v).5J(9(){31()});3E();3F();3G();3H();$("#5K").2t(9(){r($(A).5L(\':5M\')){$("#1A").32("Y");$("#1A").Y(9(){3I()});$(\'#1A\').33(9(){$(A).2u({Z:\'5N\',1p:\'3J\'},22)},9(){$(A).2u({Z:\'3K\',1p:\'5O\'},22)})}H{$("#1A").32("Y");$("#1A").Y(9(){1i("3L 3M 2Y 3N")});$(\'#1A\').32("33")}});$("#1A").Y(9(){1i("3L 3M 2Y 3N")});$(".5P").Y(9(){v.1Z.21="../3O/5Q/5R.5S?5T=3O/5U/5V.5W"})});9 3H(){$("#5X").Y(9(){v.x.5Y()});$("#3P").Y(9(){$(".24").34("1M");$("#3P").35("1M");$("#2v > 1q").1j(0,9(){$("#3Q").25(36)})});$("#3R").Y(9(){37()});$("#3S").Y(9(){$(".24").34("1M");$("#3S").35("1M");$("#2v > 1q").1j(0,9(){$("#3T").25(36)})});$(\'.24\').33(9(){$(A).2u({3U:\'5Z\',3V:\'60\'},22)},9(){$(A).2u({3U:\'61\',3V:\'62\'},22)});1K=$(v).1p()-($("#63ña").1p()+64);r(1K<=0){1K=65}$("#3W").38({2w:{16:y},3X:1g,39:1B.1N($("#39").1r()),3a:1B.1N($("#3a").1r()),1p:1K})}9 3F(){3Y=66;$.67(3Y.68,9(i,a){7 b=J(a["1a"]/a["1z"]*3b);$("#26 N").V("<w><5 1O=\'1P\'>"+a["3c"].s()+"</5><5>"+C.D(a["1z"],"S/. ").s()+"</5><5>"+C.D(a["X"],"S/. ").s()+"</5><5>"+C.D(a["1a"],"S/. ").s()+"</5><5>"+b.s()+" % "+"</5></w>");3y.1b(M 2Z(a["3c"].s(),F(a["1z"]),F(a["X"]),F(a["1a"])));I.1b(M 2Z(a["3c"].s(),F(a["1z"]),F(a["X"]),F(a["1a"])))});r(v.x.1C!=1D){2x(0,-(J(v.x.1Q)))}$("#69").25(22,6a,9(){})}9 3d(){$($($("#6b > 1q")[0]).1k("6c")[0]).u(C.D(3Z(),"S/. "))}9 31(){40{41()}42(e){3e("3f")}}9 41(){7 a=$("#6d");7 b=a.1k(".k-6e-6f");7 c=$(v).1p()-3b;7 d=a.43()-b.43();a.1p(c);b.1p(c-d)}9 3E(){27=v.x.1c;7 a=M 1E(J(27["6g"].1u(6,19)));7 b=M 1E(J(27["6h"].1u(6,19)));7 c=M 1E(J(27["6i"].1u(6,19)));3g=1h[a.1s()]+\', \'+a.1t()+\' Q \'+1Y[a.1d()]+\' 1X \'+a.1e();6j=1h[b.1s()]+\', \'+b.1t()+\' Q \'+1Y[b.1d()]+\' 1X \'+b.1e();7 d=1h[a.1s()]+\', \'+a.1t()+\'/\'+1L[a.1d()]+\'/\'+a.1e();7 e=1h[b.1s()]+\', \'+b.1t()+\'/\'+1L[b.1d()]+\'/\'+b.1e();7 f=1h[c.1s()]+\', \'+c.1t()+\'/\'+1L[c.1d()]+\'/\'+c.1e();$("#2y N").V("<w><5 1O=\'1P\' >6kña</5><5>"+27["3A"].s()+"</5></w>");$("#2y N").V("<w><5 1O=\'1P\'>44 6l</5><5>"+d+"</5></w>");$("#2y N").V("<w><5 1O=\'1P\'>44 6m</5><5>"+e+"</5></w>");r(v.x.1C!=1D)$("#2y N").V("<w><5 1O=\'1P\'>1l 6n</5><5 1O=\'1P\'>"+v.x.1C.s()+"</5></w>");$("#6o").u(f)}9 3G(){7 j=1g;r(v.x.1c.3h&&v.x.3i=="0"){j=v.x.1c.45}7 k={6p:$("#3j").15(),2z:v.x.1c.2z,1l:v.x.1C,6q:\'\',6r:0,6s:0};$.28({29:"2a",2b:"3k.1o/6t",16:1R.6u(k),2c:"2d/1m; 2e=2f-8",2g:"1m",2h:9(e){t=1R.2i(e.d);7 f=0;7 g=0;U(7 i=0;i<t.G;i++){r(!2j){r(j){r(F(v.x.1Q)<F(t[i].E)){18.1b(M 2k(t[i].O,t[i].R,t[i].1f,t[i].E,t[i].2l,t[i].2m))}}H{18.1b(M 2k(t[i].O,t[i].R,t[i].1f,t[i].E,t[i].2l,t[i].2m))}}H{r(t[i].3l==t[i].O){f=t[i].3l;g=i}r(j){r(F(v.x.1Q)<F(t[i].E)){r(f!=0){18.1b(M 2k(t[g].O,t[g].R,t[g].1f,t[g].E,t[g].2l,t[g].2m));f=0}}}H{18.1b(M 2k(t[i].O,t[i].R,t[i].1f,t[i].E,t[i].2l,t[i].2m))}}}18.6v(9(a,b){B a.E-b.E});7 h,2A,2B;r(!2j){h=1B.1N($("#6w").1r());2A=1B.1N($("#6x").1r());2B=[{1F:"46",Z:"3K",1G:"1S"},{1F:"1H",Z:"6y",1G:"47",2C:{z:"u-K:L;"}},{1F:"49",Z:"3J",1G:"4a",2C:{z:"u-K:L;"}}]}H{h=1B.1N($("#6z").1r());2A=1B.1N($("#6A").1r());2B=[{1F:"46",Z:"48%",1G:"1S"},{1F:"6B",Z:"30%",1G:"6C 6D"},{1F:"1H",Z:"10%",1G:"47",2C:{z:"u-K:L;"}},{1F:"49",Z:"12%",1G:"4a",2C:{z:"u-K:L;"}}]}$("#6E").38({2w:{16:18,6F:20},6G:4b,4c:4d,6H:1g,3X:1g,6I:13,6J:{6K:13,6L:13,6M:{6N:"í4e 3m pá6O",1T:"{0}-{1} Q {2} í4e",6P:"6Q 6R 18 6S"}},39:h,3a:2A,1p:1K,6T:2B});r($("#2D").15()!="0"){$.28({29:"2a",2b:"4f.1o/6U",16:"{\'6V\': \'"+$("#2D").15()+"\'}",2c:"2d/1m; 2e=2f-8",2g:"1m",2h:9(a){7 b=1R.2i(a.d[0]);7 c=1R.2i(a.d[1]);2s=13;U(7 i=0;i<c.G;i++){7 d=3n(c[i].6W);y.1b(d);y[i].1v=c[i].6X}$("#4g").u(y.G.s())},2n:9(a,b,c){2o(a,b,c)}})}},2n:9(a,b,c){2o(a,b,c)}})}9 2k(a,b,c,d,e,f){A.O=a;A.R=b;A.1f=c;A.E=d;A.2l=e;A.2m=f}9 3o(a,b,c,d,e){A.O=a;A.R=b;A.1f=c;A.E=d;A.1v=e}9 4b(){}9 4d(){7 g=1g;r(v.x.1c.3h&&v.x.3i=="0"){g=v.x.1c.45}r(2j){7 h=$(".4h");7 j,2p=[];U(7 f=0;f<h.G;f++){j=h[f].6Y.2E("-")[1];2p=[];U(7 i=0;i<t.G;i++){r(t[i].3l==j){r(g){r(F(v.x.1Q)<F(t[i].E)){2p.1b(M 3p(t[i].4i+" ("+C.D(F(t[i].E)-F($("#4j-"+j).u()),"S/. ")+")",t[i].O,t[i].E));6Z}}H{2p.1b(M 3p(t[i].4i+" ("+C.D(F(t[i].E)-F($("#4j-"+j).u()),"S/. ")+")",t[i].O,t[i].E))}}}$(h[f]).2F({4k:"u",4l:"1I",2w:2p,4m:"4n",4o:13,3q:0,70:9(e){7 a=e.71.4p.72;r(a.G>30){7 b=a.1u(0,20);7 c=a.1u(a.73("("));e.4q.4r=9(){B b+"... "+c}}H{e.4q.4r=9(){B a}}},2t:9(e){7 a=A.74().4s;7 b=$(A.75.4p).x().x().x();$(b[0]).1k(".1H").1r(C.D(F(a),"S/. "))}});$(h[f]).16("2F").76("2t")}}$(".77").Y(9(){7 a;r(!2j){a=$.1n($($($(A).x()).1k("1q")[1]).u())}H{a=$("#4h-"+$.1n($($($(A).x()).1k("1q")[1]).u())).16("2F").1I()}r(4t()){1i("1U 3r 3s 1w lí2G Q 2Hé2I");B}7 b=3n(a);r(y.G!=0){r(3t(0,(J(b.E)-J(y[0].E)))){1i("1U 3r 3s 1w lí2G Q 2Hé2I");B}2x(0,-J(y[0].E))}H{r(3t(0,J(b.E))){1i("1U 3r 3s 1w lí2G Q 2Hé2I");B}}y=[];y.1b(b);2x(0,J(b.E));37()});$(".78").Y(9(){7 d=$.1n($($($(A).x()).1k("1q")[1]).u());$.28({29:"2a",2b:"4f.1o/79",16:"{\'7a\': \'"+d+"\'}",2c:"2d/1m; 2e=2f-8",2g:"1m",2h:9(a){W=a.d;$("#7b").u($.1n(W.R));$("#7c").1r($.1n(W.1f));$("#7d").u($.1n(W.7e.7f));$("#7g").u("S/. "+W.E.7h(2));7 b="";b="";$("#4u").1r("");U(7 i=0;i<W.1J.G;i++){b+="<w>";b+="<5 7i = \'2\'><1q  z=\'7j: 7k 7l #7m; 7n: 7o;\'></1q></5>";b+="</w>";b+=\'<w z="P-7p: #7q;">\';b+="<5 z=\'Z: 2J;\'><b>7r</b></5><5><b>"+$.1n(W.1J[i].R)+"</b></5>";b+="</w>";r($.1n(W.1J[i].1f)!=""){b+="<w>";b+="<5 z=\'Z: 2J;\'><b>7són</b></5><5>"+$.1n(W.1J[i].1f)+"</5>";b+="</w>"}b+="<w>";r(W.1J[i].4v==0){b+="<5 z=\'Z: 2J;\'><b>4w</b></5><5>7t</5>"}H{b+="<5 z=\'Z: 2J;\'><b>4w</b></5><5>"+J(W.1J[i].4v)+" - "+$.1n(W.1J[i].7u.7v())+"</5>"}b+="</w>"}$("#4u").V(b)},2n:9(a,b,c){2o(a,b,c)}});$("#4x").4y();$("#4z").4y()});$(".7w").Y(9(){$("#4x").1j();$("#4z").1j()})}9 4A(){7 b=$(".7x");U(7 i=0;i<b.G;i++){$(b[i]).7y("3q",i);$(b[i]).2F({4k:"u",4l:"1I",2w:4B(),4m:"4n",4o:13,3q:0,7z:!(y[i].7A=="0"),7B:9(e){3z=A.1I()},2t:9(e){7 a=$(A)[0].4C;y[0].1v=a},4c:9(e){r($("#2D").15()!="0"&&y[0].1v!=-1){A.1I(y[0].1v)}H{7 a=$(A)[0].4C;y[0].1v=a}}})}}9 37(){$(".24").34("1M");$("#3R").35("1M");$("#2v > 1q").1j(0,9(){3d();$("#4D").25(0,9(){r(y.G!=0){7 a=M 1B.16.7C({16:y});7 b=$("#3W").16("38");b.7D(a);4A()}})})}9 3n(a){r(!2j){U(7 i=0;i<18.G;i++){r(18[i].O==a){7 b=18[i];B M 3o(b.O,b.R,b.1f,b.E,-1)}}}H{U(7 i=0;i<t.G;i++){r(t[i].O==a){7 b=t[i];B M 3o(b.O,b.R,b.1f,b.E,-1)}}}}9 4B(){7 a=[];U(7 i=0;i<3u.G;i++){a.1b({u:3u[i],1I:3u[i]})}B a}9 3Z(){7 a=0.0;U(7 i=0;i<y.G;i++){a=a+F(y[i].E)}B a}9 2x(a,b){I[0]["X"]=F(I[0]["X"]-a);I[0]["1a"]=F(I[0]["1a"]+a);I[1]["X"]=F(I[1]["X"]-b);I[1]["1a"]=F(I[1]["1a"]+b);4E()}9 4E(){U(7 i=0;i<I.G;i++){7 a=J(I[i]["1a"]/I[i]["1z"]*3b);$($($("#26 N w")[i]).1k("5")[1]).u(C.D(I[i]["1z"],"S/. ").s());$($($("#26 N w")[i]).1k("5")[2]).u(C.D(I[i]["X"],"S/. ").s());$($($("#26 N w")[i]).1k("5")[3]).u(C.D(I[i]["1a"],"S/. ").s());$($($("#26 N w")[i]).1k("5")[4]).u(a.s()+" %")}$("#4g").u(y.G.s())}9 4t(){7 a=I[0]["X"];7 b=I[1]["X"];r(a<0){B 13}H{B b<0}}9 3t(a,b){7 c=F(I[0]["X"]-a);7 d=F(I[1]["X"]-b);r(c<0){B 13}H{B d<0}}9 3I(){r(v.x.3B!=$("#3C").15()){v.1Z.21=\'../3D.1o\';B}r(y.G==0){1i("1U 4F 7E 2K 7F 4G 2L Q 2M");B}r(3d()){1i("1U a 7G 1w lí2G Q 2Hé2I, 7H 1w 2L Q 2M");B}r(2s&&!4H()){1i("1U 4F a 7I 1w 4I");B}7J("¿7K 7L 7M Q 7N 4G 4I?<7O>","7P Q 2K",9(a){r(a=="7Q"){$(".24").1j();$("#2v").2q("1T","2r");$("#3Q").1j();$("#4D").1j();$("#3T").1j();$("#7R").25(36,9(){$("#7S").1j(0,9(){r(2s){4J()}H{3v()}})})}})}9 3v(){r(y.G==0){1i("4K 2K a 1w 2L Q 2M 3m 4L");B}7 n=\'<?4M 4N="1.0" 4O="4P-4Q-1"?><2N>\';U(7 i=0;i<y.G;i++){7 o=v.x.1C;7 p=v.x.1Q;r(o==1D){o="4R 4S"}r(p==1D){p="0"}7 q=0;r(v.x.1C!=1D){r(v.x.1c.3h&&v.x.3i=="0"){q=4T(v.x.7T)}}n=n+\'<2O><2P>\'+y[i].O.s()+\'</2P><R>\'+y[i].R.s()+\'</R><1H>\'+\'0\'+\'</1H><2Q>\'+y[i].O.s()+\'</2Q><2R>\'+y[i].E.s()+\'</2R><2S>\'+\'1\'+\'</2S><2T>\'+\'1\'+\'</2T><1l>\'+o+\'</1l><2U>\'+y[i].1v.s()+\'</2U><2V>\'+p+\'</2V><4U>\'+q+\'</4U></2O>\'}n=n+\'</2N>\';$.28({29:"2a",2b:"3k.1o/3v",16:"{\'4V\': \'"+$("#3j").15()+"\',"+"\'4W\': \'"+v.x.1c.2z+"\',"+"\'4X\': \'"+n+"\', "+"\'4Y\': \'"+v.x.1c.4Z+"\'}",2c:"2d/1m; 2e=2f-8",2g:"1m",2h:9(a){r(a.d==""){v.1Z.21="../50.1o";B}r(a.d=="3f 51 52 53"){3e(a.d);B}7 b=1R.2i(a.d);$("#54").u(b[0].55);7 c=M 1E();3g=1h[c.1s()]+\', \'+c.1t()+\' Q \'+1Y[c.1d()]+\' 1X \'+c.1e();7 d=1h[c.1s()]+\', \'+56(\'0\'+c.1t(),2)+\'/\'+1L[c.1d()]+\'/\'+c.1e();$("#57").u(d+" "+c.58()+":"+c.59());7 e=1g;7 f=1g;7 g=0;7 h=0;7 j=0;7 k=0;7 l=0;7 m=0;U(7 i=0;i<b.G;i++){r(b[i].5a=="5b"){e=13;g=g+1;j=j+J(b[i].1x);l=l+J(b[i].1y);$("#1V N").V("<w><5>"+b[i].2W.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1x,"S/. ").s()+"</5><5>"+b[i].1S.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1y,"S/. ").s()+"</5><5>"+b[i].1l.s()+"</5></w>")}H{f=13;h=h+1;k=k+J(b[i].1x);m=m+J(b[i].1y);$("#1W N").V("<w><5>"+b[i].2W.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1x,"S/. ").s()+"</5><5>"+b[i].1S.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1y,"S/. ").s()+"</5><5>"+b[i].1l.s()+"</5></w>")}}r(!e){$("#1V").2q("1T","2r")}H{$("#1V N").V("<w z=\'P: #T;\'><5 z=\'P: #T;\'>17: "+g.s()+"</5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(j,"S/. ").s()+"</5><5></5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(l,"S/. ").s()+"</5><5></5></w>")}r(!f){$("#1W").2q("1T","2r")}H{$("#1W N").V("<w z=\'P: #T;\'><5 z=\'P: #T;\'>17: "+h.s()+"</5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(k,"S/. ").s()+"</5><5></5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(m,"S/. ").s()+"</5><5></5></w>")}},2n:9(a,b,c){2o(a,b,c)}})}9 4J(){r(y.G==0){1i("4K 2K a 1w 2L Q 2M 3m 4L");B}7 n=\'<?4M 4N="1.0" 4O="4P-4Q-1"?><2N>\';U(7 i=0;i<y.G;i++){7 o=v.x.1C;7 p=v.x.1Q;r(o==1D){o="4R 4S"}r(p==1D){p="0"}n=n+\'<2O><2P>\'+y[i].O.s()+\'</2P><R>\'+y[i].R.s()+\'</R><1H>\'+\'0\'+\'</1H><2Q>\'+y[i].O.s()+\'</2Q><2R>\'+y[i].E.s()+\'</2R><2S>\'+\'1\'+\'</2S><2T>\'+\'0\'+\'</2T><1l>\'+o+\'</1l><2U>\'+y[i].1v.s()+\'</2U><2V>\'+p+\'</2V></2O>\'}n=n+\'</2N>\';$.28({29:"2a",2b:"3k.1o/7U",16:"{\'4V\': \'"+$("#3j").15()+"\',"+"\'4W\': \'"+v.x.1c.2z+"\',"+"\'7V\': \'"+$("#2D").15()+"\',"+"\'4X\': \'"+n+"\', "+"\'4Y\': \'"+v.x.1c.4Z+"\'}",2c:"2d/1m; 2e=2f-8",2g:"1m",2h:9(a){r(a.d==""){v.1Z.21="../50.1o";B}r(a.d=="3f 51 52 53"){3e(a.d);B}7 b=1R.2i(a.d);$("#54").u(b[0].55);7 c=M 1E();3g=1h[c.1s()]+\', \'+c.1t()+\' Q \'+1Y[c.1d()]+\' 1X \'+c.1e();7 d=1h[c.1s()]+\', \'+56(\'0\'+c.1t(),2)+\'/\'+1L[c.1d()]+\'/\'+c.1e();$("#57").u(d+" "+c.58()+":"+c.59());7 e=1g;7 f=1g;7 g=0;7 h=0;7 j=0;7 k=0;7 l=0;7 m=0;U(7 i=0;i<b.G;i++){r(b[i].5a=="5b"){e=13;g=g+1;j=j+J(b[i].1x);l=l+J(b[i].1y);$("#1V N").V("<w><5>"+b[i].2W.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1x,"S/. ").s()+"</5><5>"+b[i].1S.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1y,"S/. ").s()+"</5><5>"+b[i].1l.s()+"</5></w>")}H{f=13;h=h+1;k=k+J(b[i].1x);m=m+J(b[i].1y);$("#1W N").V("<w><5>"+b[i].2W.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1x,"S/. ").s()+"</5><5>"+b[i].1S.s()+"</5><5 z=\'u-K:L;\'>"+C.D(b[i].1y,"S/. ").s()+"</5><5>"+b[i].1l.s()+"</5></w>")}}r(!e){$("#1V").2q("1T","2r")}H{$("#1V N").V("<w z=\'P: #T;\'><5 z=\'P: #T;\'>17: "+g.s()+"</5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(j,"S/. ").s()+"</5><5></5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(l,"S/. ").s()+"</5><5></5></w>")}r(!f){$("#1W").2q("1T","2r")}H{$("#1W N").V("<w z=\'P: #T;\'><5 z=\'P: #T;\'>17: "+h.s()+"</5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(k,"S/. ").s()+"</5><5></5><5 z=\'u-K:L;P: #T;\'>17: "+C.D(m,"S/. ").s()+"</5><5></5></w>")}},2n:9(a,b,c){2o(a,b,c)}})}9 4H(){B 13}9 3p(a,b,c){A.u=a;A.1I=b;A.4s=F(c)}9 4T(a){40{7 b=M 1E($("#3w").15().1u(0,4),$("#3w").15().1u(4,6)-1,$("#3w").15().1u(6,8));7 c=a;7 d=M 1E(c.2E("-")[0],c.2E("-")[1]-1,c.2E("-")[2]);B 5c(b,d)}42(e){B 0}}9 5c(a,b){7 c;c=(b.1e()-a.1e())*12;c-=a.1d();c+=b.1d();B c<=0?0:c}', 62, 492, '|||||td||var||function||||||||||||||||||if|toString|planesBase|text|window|tr|parent|arregloSeleccion|style|this|return|formatNumber|newo|dcMon|parseFloat|length|else|indicadoresVariante|parseInt|align|right|new|tbody|P_inCod|background|de|vcNom||E2F0F6|for|append|vDetallePlanes|Disponible|click|width||||true||val|data|Total|planes||Utilizado|push|CampanaConf|getMonth|getFullYear|vcDes|false|dias|alerta|hide|find|Numero|json|trim|aspx|height|div|html|getDay|getDate|substring|MesesContrato|su|PrecioEquipo|PrecioPlan|Aprobado|btnComprarConfirmado|kendo|NumeroRenovar|undefined|Date|field|title|Precio|value|SubPlanes|AltoGrilla|MesesEnteros|tapSelect|template|class|subtitulo|PrecioPlanNumeroRenovar|JSON|Plan|display|Usted|tbAdquiridos|tbNoAdquiridos|del|meses|location||href|300||tap|fadeIn|tablaInidicador|campanaActiva|ajax|type|POST|url|contentType|application|charset|utf|dataType|success|parse|UsarPlanDep|oPlan|CantidadTotal|CantidadDisponible|error|MostrarErrorAjax|dataCombo|css|none|esEditar|change|animate|detalleTaps|dataSource|operarInidicadores|tablaDscCampana|IdCampana|vAltRowTemp|vColumns|attributes|hdfIdPedidoEditar|split|kendoDropDownList|mite|cr|dito|100px|productos|carrito|compras|TABLE|PEDIDO|IdProducto|IdPlan|DscPlan|Orden|esNuevo|Meses|PrecioPlanAntiguo|Equipo|fechaLimiteModificacion|las|miIndicadorCredito||DimPosElementos|unbind|hover|removeClass|addClass|200|fnAbrirTapCarrito|kendoGrid|rowTemplate|altRowTemplate|100|DescripcionProducto|validarexceso|alert|ERROR|strFechaInicio|RenovarContratoVigente|Habilitado|hdfEmpleado|PedidoPlan|IdPlanBase|por|obtenerProducto|oPlanElegido|miPlan|index|ha|superado|validarexcesoBool_monto|arMesesRenovacion|registrarPedidoRenovPlan|hdfFecServidor|00|indicadoresInicial|MesContratoAnterior|Descripcion|UsuarioConectado|hfUsuario|Login|obtenerCampanaActiva|obtenerCreditos|obtenerProductos|enlacesLoad|procesarPedido|60px|120px|Debe|aceptar|condiciones|Common|tapPlanes|pSelecPlan|tapCarritoPlan|tapDeclaracion|pDeclaracion|marginRight|marginLeft|gridDetEle|sortable|creditos|productoPrecioTotal|try|resizeGrid|catch|innerHeight|Fecha|SoloRenovarMontoMayor|detalles|Monto||Comprar|Elegir|onDataBinding|dataBound|onDataBound|tems|Pedido|CarritoCantidad|cboOnTop|NombreCorto|spPrecio|dataTextField|dataValueField|filter|contains|suggest|context|sender|_text|precio|validarexcesoBool|TblDetPlan|dcCan|Cantidad|capaPopUp|show|pnlticket|enlazarClick|obtenerMesesByPlan|_selectedValue|pDetEle|actualizarIndicadores|no|el|fnExistsEdit|pedido|ModificarPedidoRenovPlan|Agregue|favor|xml|version|encoding|iso|8859|Nueva|Linea|ObtenerMesesRestante|MesesRestante|prIdEmpleado|pIdCampana|pXmlPedido|prMaxIdPedido|MaxIdPedido|FinSession|AL|AGREGAR|PRODUCTO|lblCodigoPedido|codigopedido|Right|lblFechaPedi|getHours|getMinutes|EstadoPedido|Enviado|monthDiff|agosto|2016|horas|Domingo|Lunes|Martes|Mi|rcoles|Jueves|Viernes|bado|Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Setiembre|Octubre|Noviembre|Diciembre|01|02|03|04|05|06|07|08|09|resize|chkConfirmarTerminos|is|checked|130px|50px|getCondicionesTemrinos|Controladores|DescargarArchivo|ashx|archivo|Contratos|Condiciones|pdf|btnVolverPedidos|fnIrPedidos|10px|30px|0px|20px|contCampa|115|280|CreditoUsuario|each|ProductoCreditoAsignado|generalCarrito|null|totalesCarrito|span|grdPedidos|grid|content|FechaInicio|FechaFin|FechaActual|strfechaFin|Campa|Inicio|Fin|Renovar|declaracionFechaActual|IdEmpleado|NombrePlan|MontoMin|MontoMax|ObtenerPlanesRenovacion|stringify|sort|rowTemplateCarrito|altRowTemplateCarrito|40px|rowTemplateCarrito_PD|altRowTemplateCarrito_PD|PaqueteDatos|Paquete|Datos|gridPro|pageSize|dataBinding|groupable|navigatable|pageable|refresh|pageSizes|messages|itemsPerPage|gina|empty|No|hay|disponibles|columns|getDetallePedidoByPedido|prIdPedido|idPlan|Meses_Contrato|id|continue|select|item|innerHTML|indexOf|dataItem|element|trigger|seleccioPlan|dscPlanCombo|obtenerDetallePlan|prIdPlan|lblNombre|lblDescripcion|lblOperador|Operador|vcNomOpe|lblMonto|toFixed|colspan|border|1px|solid|a6c9e2|margin|3px|color|d6d6d6|Bolsa|Descripci|Ilimitado|vcSer|toUpperCase|EliDetPlan|cboMeses|attr|enable|Accion|open|DataSource|setDataSource|tiene|en|sobrepasado|verifique|modificado|confirma|Esta|usted|seguro|enviar|br|Compra|Aceptar|pProcesoCompra|pPanelCarrito|FechaFinContrato|editarPedidoRenovPlan|pIdPedido'.split('|'), 0, {}))
    </script>
    <%--<link href="Pedido.css" rel="stylesheet" type="text/css" />--%>
    <link href="CarritoIE.css" rel="stylesheet" type="text/css" />

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
	            #:data.vcNom# (#:formatNumber.newo(data.dcMon, "S/. ")#)
		    </td>
            <td>
                <select class="cboOnTop" id="cboOnTop-#:data.P_inCod#" style="width: 200px"></select>
            </td>
            <td class="Precio">
		        #:formatNumber.newo(data.dcMon, "S/. ")#
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
	            #:data.vcNom# (#:formatNumber.newo(data.dcMon, "S/. ")#)
		    </td>
            <td>
                <select class="cboOnTop" id="cboOnTop-#:data.P_inCod#" style="width: 200px"></select>
            </td>
            <td class="Precio">
		        #:formatNumber.newo(data.dcMon, "S/. ")#
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
                <span  class="lblMeses" style="float:left; margin-top:3px; margin-left:7px;margin-right:5px;">Contrato por:</span> <select  id="cboMeses-#:data.P_inCod#" class="cboMeses" style="width:50px;"></select>
            </td>
		    <td>
		        S/. #: data.dcMon #
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    <td>
                #:data.vcNom#
		    </td>
		    <td>
			    <span  class="lblMeses" style="float:left; margin-top:3px; margin-left:7px;margin-right:5px;">Contrato por:</span> <select  id="cboMeses-#:data.P_inCod#" class="cboMeses" style="width:50px;"></select>
		    </td>
		    <td>
		        S/. #: data.dcMon #
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
    <div id="global">
        <div id="generalCarrito" class="general">
            <div id="pPanelCarrito" class="pContenedor">
                <table id="tablaInidicador" border="0" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <td class="subtitulo">Tipo</td>
                            <td class="subtitulo">Aprobado</td>
                            <td class="subtitulo">Disponible</td>
                            <td class="subtitulo">Utilizado</td>
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
                            text-align:center; color:#003F59; font-weight:bold;">0</div>
                    </div>
                    <div id="irCompras" style="width:100px; height:60px;">
                        <img style="float:right; margin-right:20px;" src="../Common/Images/cart_shop.png" />
                    </div>
                </div>
            </div>
            <div id="cuerpoTaps">
                <div class="navtaps">
                    <div id="tapPlanes" class="tap tapSelect" style="color: darkred;">
                        Paso 1 : Seleccione Plan
                    </div>
                    <div id="tapCarritoPlan" class="tap" style="color: darkred;">
                        Paso 2 : Plazo Contrato
                    </div>
                    <div id="tapDeclaracion" class="tap" style="color: darkred; padding-left: 5px;">
                        Paso 3 : Confirmación Compra
                    </div>
                </div>
                <div id="detalleTaps">
                    <div id="pSelecPlan">
                        <%--<div id="toolBarPro">
                            <select style="float: left;" id="required" data-placeholder="Seleccione categoria...">
                                <option>Nombre</option>
                                <option>Precio</option>
                            </select>
                            <div id="ptxtNombre" style="float: left;">
                                <input style="width: 440px; margin-top: 5px; margin-left:15px;" id="txtNombre" type="text" class="k-textbox" maxlength="50" />
                            </div>
                            <div id="pTxtPrecio" style="float: left; display: none;">
                                <span style="margin-left:15px;">Mínimo : </span><input style="width: 150px; margin-top: 5px; text-align:right;" id="txtPrecioMin" type="text" class="k-textbox" maxlength="6" />
                                <span>Máximo : </span><input style="width: 150px; margin-top: 5px; text-align:right;" id="txtPrecioMax" type="text" class="k-textbox" maxlength="6" />
                            </div>
                            <div id="btnFiltroProducto" class="k-button" style="float: right; width: 70px; height: 33px; margin-right: 40px; padding-top: 7px;">
                                Buscar
                            </div>
                        </div>--%>
                        <table id="gridPro"></table>
                        <table id="gridPro_1">
                            <thead>
                                <tr>
                                    <th role="columnheader" data-title="Producto" class="k-header">
                                        Plan
                                    </th>
                                    <th role="columnheader" data-title="Precio" class="k-header">
                                        Monto
                                    </th>
                                    <th role="columnheader" data-title="Comprar" class="k-header">
                                        Seleccionar
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
                                    <th>
                                        Plan
                                    </th>
                                    <th>
                                        Plazo
                                    </th>
                                    <th>
                                        Monto
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
                        <%--<div class="k-block k-info-colored" id="totalesCarrito">
                            <div style="float: right; margin-right: 15px; font-size: 12pt;">
                                total: <span></span>
                            </div>
                            <div style="float: right; margin-right: 15px; font-size: 12pt; display: none;">
                                * Usted a superado su consumo disponible</div>
                        </div>--%>
                    </div>
                    <div id="pDeclaracion" style="display: none; height: 320px; overflow: auto; padding: 40px;">
                        <div id="pnlCompra" class="esPreVenta">
                            <p>
                                Se enviará su solicitud al proveedor, no podrá ser modificada después de <span id="fechaLimiteModificacion"></span>. Para confirmar su compra deberá aceptar las condiciones del contrato.
                            </p>
                            <input id="chkConfirmarTerminos" type="checkbox" /><span>Acepto haber leído y estar
                                de acuerdo con las <a class="getCondicionesTemrinos" style="text-decoration: underline;">
                                    condiciones.</a></span>
                            <div style="clear: both; margin-bottom: 20px;">
                            </div>
                            <div id="btnComprarConfirmado" style="width: 120px; height: 50px; cursor: hand; cursor: pointer;
                                border: 0px dotted gray; margin: auto;">
                                <img id="imgCompraimg" style="max-width: 100%; width: 100%; height: 100%" src="../Common/Images/boton_comprar.jpg" />
                            </div>
                        </div>
                        <div id="pnlPreventa" style="display: none;">
                            <p runat="server" id="pDscPreventa">
                            </p>
                            <div style="clear: both; margin-bottom: 20px;">
                            </div>
                            <div id="btnPreventaConfirmado" style="width: 120px; height: 90px; cursor: hand;
                                cursor: pointer; border: 0px dotted gray; margin: auto;">
                                <img style="max-width: 100%; width: 100%; height: 100%" src="../Common/Images/reserva.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="pnlticket"  style="display:none; width:500px; overflow:hidden; position:absolute; left:100px; top:100px; z-index:3000; 
        background-color:#E2F0F6; border:solid; border-color:#add8e6;">
        <div class="EliDetPlan" title="Presione para cerrar" style="float:right;background-color:skyblue;padding:2px;">
         << volver a carrito
        </div>
        <div class="cGenInfo titulo" style="width: 500px; height: auto;">
            <b><span id="lblNombre"></span></b>
        </div>
        <br />
        <table class="miTabla" border="0" cellpadding="0" cellspacing="0" style="width: 100%;
            height: auto; position: relative !important;">
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
    
    <div id="pProcesoCompra" style="display: none; height: 430px; overflow: auto;">
        <div style="width: 100%; text-align: center; color: #003F59; font-size: 12pt;">
            Resumen de Pedido
        </div>
        <table>
            <tr>
                <td style="color: #003F59; font-weight:bold;">Fecha:</td>
                <td>
                    <asp:Label ID="lblFechaPedi" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
            </tr><tr>
                <td style="color: #003F59; font-weight:bold;">Nombre:</td>
                <td>
                    <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
            </tr><tr>
                <td style="color: #003F59; font-weight:bold;">Área:</td>
                <td>
                    <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
            </tr><tr>
                <td style="color: #003F59; font-weight:bold;">Centro de Costos:</td>
                <td>
                    <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
            </tr><tr>
                <td style="color: #003F59; font-weight:bold;">Código de pedido:</td>
                <td>
                    <asp:Label ID="lblCodigoPedido" runat="server" Text="(Desconocido)"></asp:Label>
                </td>
            </tr>
        </table>
        <table id="tbAdquiridos" align="center" cellpadding="10" style="font-size:10pt; margin-bottom:20px;" class="subtitulo" width="100%">
            <thead style="background: #E2F0F6; ">
                <tr>
                    <td>
                        Renovaciones Enviadas
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
        </table>
        <table id="tbNoAdquiridos" align="center" cellpadding="10"  class="subtitulo" style="font-size:10pt; color:darkred;"  width="100%">
            <thead style="background: #E2F0F6;  ">
                <tr>
                    <td>
                        Renovaciones No Enviadas
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
        </table>
        <div id="btnVolverPedidos" class="k-button" style="width: 200px; height: 30px; margin: 40px 0px 0px 300px; font-weight: bolder;">
            Ir a mis pedidos
        </div>
    </div>

    </form>
</body>
</html>
