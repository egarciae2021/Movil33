<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="RestablecerContrasena.aspx.vb" Inherits="WebSiteCliente.RestablecerContrasena" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Common/Styles/Login.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>    
    <script src="RestablecerContrasena.js" type="text/javascript"></script>
    <script type="text/javascript">
        //eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(9(){$(".1k-2p").j();$("#l").k();$("#l").1d(9(e){7(e.2n==13){$("#r").k()}h{7($.1c.2l&&$.1c.27=="6.0"){16()}h{15($(Y).g())}}});$("#r").1d(9(e){7($("#l").g()!=$(Y).g()){$("#X").j();$("#W").V("U","T/S/2m.O");$("#N").C("s oñG 1u 1H 1v.")}h{$("#X").q();$("#W").V("U","T/S/1D.O");$("#N").C("")}});$("#28").x(9(){f d=$("#l").g();f e=$("#r").g();7(d==\'\'){p("22 11 1p oña.");$("#l").k();n}7(e==\'\'){p("1w 11 oña 1B 1C 1G.");$("#r").k();n}7(d.t<6){p("s oña 1J 1L 1U mí1X 6 21.");$("#l").k();n}7(d!=e){p("s oñG P Q.");$("#r").k();n}$.29({2a:"2b",2c:"2d.y/2o",1e:"{\'1f\': \'"+$("#1g").g()+"\',"+"\'1h\': \'"+d+"\',"+"\'1i\': \'"+e+"\',"+"\'1j\': \'"+M()+"\',"+"\'1l\': \'"+$("#1m").g()+"\'}",1n:"1o/R; 1q=1r-8",1s:"R",1t:9(a){7(a.d==\'-2\'){p("s oñG P Q.")}h 7(a.d==\'-1\'){$("#K").q();$("#1x").j()}h 7(a.d==\'0\'){$("#K").q();$("#1y").j()}h{$("#K").q();$("#1z").j()}},1A:9(a,b,c){2r(a,b,c)}})});$(".1E-1F").x(9(){H.E.1I="L.y"});$("#1K").x(9(){$("#14ña").j()});$(".1M-1N-1O").x(9(){$("#14ña").q()})});9 M(){f a=H.E.1P;f b=H.E.1Q;f c="L.y";n b+\'/\'+a+\'/\'+c}9 15(a){f b=[];b[0]="#1R";b[1]="#1S";b[2]="#1T";b[3]="#1V";b[4]="#1W";b[5]="#1Y";f c=[];c[0]="";c[1]="1Z Dé17";c[2]="Dé17";c[3]="23";c[4]="24";c[5]="Ó25";f d=a;f e=0;7(d.t<6){e=0}h{7(d.v(/[A-Z]/)){e++}7(d.v(/[a-z]/)){e++}7(d.v(/\\d+/)){e++}7(d.v(/[^a-z\\d]+/)){e++}7(d.t>12){e++}}$("#18").19("1a",b[e]);$("#18").C(c[e]);$("#1b").19("2e-1a",b[e]);$("#1b").2f({2g:(2h(e,0)*20).2i()+"%"},2j)}9 2k(){f a=26;f b="~!@#$%^&*(){}?><`=-|][";f c=\'\';w(i=0;i<3;i++){c+=B.J("a".I(0)+u(a))}w(i=0;i<3;i++){c+=B.J("A".I(0)+u(a))}w(i=0;i<3;i++){c+=B.J("0".I(0)+u(10))}w(i=0;i<4;i++){c+=b.2q(u(b.t))}c=F(c);c=F(c);c=F(c);n c}9 16(){}',62,152,'|||||||if||function||||||var|val|else||show|focus|txtContrasena1||return|contrase|alert|hide|txtContrasena2|La|length|getRand|match|for|click|aspx|||String|text||location|shuffleString|as|window|charCodeAt|fromCharCode|dvReestablecimiento|Login|fnObtenerPaginaLogin|lblCoincidenciaPass|png|no|coinciden|json|Images|Common|src|attr|imgCorreo|dvFormatInvalid|this|||su|||dvFortalezaContrase|passwordStrength|passwordStrengthIE|bil|lblFortalezaPass|css|color|PassFortaleza|browser|keyup|data|CodigoSolicitud|hdfCodReestablecimiento|NuevaContrasena|ConfirmacionContrasena|PaginaLogin|popup|IdDominio|hdfIdDominio|contentType|application|nueva|charset|utf|dataType|success|deben|iguales|Confirme|dvErrorSolicitud|dvCaducado|dvExito|error|antes|de|Aprobar|ir|login|continuar|ser|href|debe|imgInfoFortaleza|contener|info|fortaleza|cerrar|host|protocol|cccccc|ff0000|ff5f5f|como|56e500|399800|nimo|0000FF|Muy||caracteres|Ingrese|Media|Buena|ptima||version|btnEnviar|ajax|type|POST|url|RestablecerContrasena|background|animate|width|parseInt|toString|150|generatePWD|msie|Alerta_16x16|keyCode|RestablecerContrasenaUsuario|overlay|charAt|MostrarErrorAjax'.split('|'),0,{}))
    </script>
</head>

<style type="text/css">
    .popup-overlay {
	    left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
	    background-color: #777777;
        cursor: pointer;
        opacity: 0.7;
    }
    
    #dvReestablecimiento,#dvExito,#dvCaducado,#dvErrorSolicitud {
	    left: 0;
        position: absolute;
        top: 0;
        width: 100%;
         z-index: 200;
    }
    
    .content-dvReestablecimiento {
	    margin:0px auto;
	    margin-top:120px;
	    position:relative;
	    padding:10px;
	    width:380px;
	    min-height:200px;
	    border-radius:4px;
	    background-color:#FFFFFF;
	    box-shadow: 0 2px 5px #666666;
    }
    
    .content-dvReestablecimiento h2 {
	    color:#48484B;
	    border-bottom: 1px solid #48484B;
        margin-top: 0;
        padding-bottom: 4px;
    }
    
    .info-fortaleza 
    {
        margin:0px auto;
        margin-top:110px;
	    position:relative;
	    padding:10px;
        background-color:#FFFFFF;
        z-index: 300;
        width:380px;
        height:300px;
        border-radius:4px;
        box-shadow: 0 2px 5px #666666;
    }
    
    .info-fortaleza-titulo
    {
        /*background-color:#8FBBE8;*/
        background-color:#0274B5;
        border-radius:4px;
        padding:5px;
        font-size: 16px;
        font-weight: bold;
        color:White;
    }
    
    .info-fortaleza-detalle
    {
        padding-top:1px;
    }
    
    .info-fortaleza-detalle li
    {
        font-size:13px;
        font-style:normal;
        font-weight:bold;
        color:#4F4F81;
        padding-bottom:8px;
    }
    
    .info-fortaleza-cerrar
    {
        position:absolute;
        top:12px;
        right:12px;
        cursor:hand;
        cursor:pointer;
    }
    
    .content
    {
        margin:0px auto;
	    margin-top:120px;
	    padding:10px;
	    min-height:200px;
	    border-radius:4px;
	    background-color:#FFFFFF;
	    box-shadow: 0 20px 10px #666666;
    }
    
    .content-title
    {
	    /*color: #454545;
	    border-bottom: 1px solid #454545;*/
	    margin-bottom: 10px;
	    padding: 5px 0px 5px 0px;
	    
	    color: #e8e8e8;
	    background-color: #808080;
    }
    
    .content-body
    {
        margin: auto;
        min-width: 300px;
        width: 400px;
        min-height: 100px;
        
    }
    
    .content-button
    {
        margin: auto;
        width: 150px;
        padding-top: 10px
    }
    
    .ir-login
    {
        width: 150px;
    }
</style>
<body>
    <form id="form1" runat="server" autocomplete="off">
    <asp:HiddenField runat="server" ID="hdfCodReestablecimiento" />
    <asp:HiddenField runat="server" ID="hdfIdDominio" />
    <div id="dvReestablecimiento" runat="server">
        <div class="content">
            <div class="content-title">
                <h2 style="width: 290px; margin: auto;">
                    Restablecer Contraseña
                </h2>
            </div>
            <div class="content-body">
                <table cellpadding="1" cellspacing="5" width="100%">
                    <tr>
                        <td>
                            Ingresa tu nueva contraseña
                            <asp:Image ID="imgInfoFortaleza" runat="server" style="vertical-align:top; cursor:hand; cursor:pointer;" ImageUrl="Common/Images/Login/Information.png" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:TextBox ID="txtContrasena1" runat="server" TextMode="Password" Width="230px"></asp:TextBox>
                            <asp:Label ID="lblFortalezaPass" runat="server" style="font-size:14px; font-weight:bold;"></asp:Label>                        
                        </td>
                    </tr>
                    <tr><td></td></tr>
                    <tr>
                        <td>
                            Ingresa tu nueva contraseña una vez más
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:TextBox ID="txtContrasena2" runat="server" TextMode="Password" Width="230px"></asp:TextBox>
                            <asp:Image ID="imgCorreo" runat="server" style="vertical-align:middle;"/>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:18px;">
                            <asp:Label ID="lblCoincidenciaPass" runat="server" style="color: #CF2C2C;font-size: small;"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="PassFortaleza" style="height:10px; width:0px;"></div>
                        </td>
                    </tr>
                    <tr><td></td></tr>
                    <tr>
                        <td colspan="2" align="center">
                        
                        </td>
                    </tr>
                </table>
            </div>
            <div style="margin: auto; width: 250px; padding-top: 10px;">
                <div id="btnEnviar" class="k-button" style="width:250px;">
                    <a>Restablecer Contraseña</a>
                </div>
            </div>
        </div>
    </div>
    <div id="dvCaducado" runat="server" style="display:none;">
        <div class="content">
            <div class="content-title">
                <h2 style="width: 225px; margin: auto;">
                    Solicitud Expirada
                </h2>
            </div>
            <div class="content-body">
                <p>Su solicitud de cambio de contraseña a expirado</p>
                <p>Las solicitud de cambio de contraseña solo estarán activas por un corto periodo de tiempo, asegurate de usarlas lo mas pronto posible.</p>
            </div>
            <div class="content-button">
                <div class="k-button ir-login">
                    <a>Ir al Login</a>
                </div>
            </div>
        </div>
    </div>
    <div id="dvExito" runat="server" style="display:none;">
        <div class="content">
            <div class="content-title">
                <h2 style="text-align: center; margin: auto;">
                    Contraseña Cambiada
                </h2>
            </div>
            <div class="content-body">
                Su contraseña ha sido cambiada con éxito. Ahora puede loguearse con su nueva contraseña.
            </div>
            <div class="content-button">
                <div class="k-button ir-login">
                    <a>Ir al Login</a>
                </div>
            </div>
        </div>        
    </div>
    <div id="dvErrorSolicitud" runat="server" style="display:none;">
        <div class="content">
            <div class="content-title">
                <h2 style="text-align: center; margin: auto;">
                    Acceso Inválido
                </h2>
            </div>
            <div class="content-body">
                <p>No podemos procesar su solicitud.</p>
                <p>Asegúrese de haber copiado correctamente la URL.</p>
            </div>
            <div class="content-button">
                <div class="k-button ir-login">
                    <a>Ir al Login</a>
                </div>
            </div>
        </div>
    </div>
    <div class="popup-overlay" style="display: none;"></div>
    <div id="dvFortalezaContraseña" class="info-fortaleza" style="display: none;">
        <div class="info-fortaleza-titulo">
            Fortaleza de la contraseña
            <img class="info-fortaleza-cerrar" src="Common/Images/Chat/cerrar.png"/>
        </div>
        <div class="info-fortaleza-detalle">
            <ul>
                <li>
                    La contraseña debe tener como mínimo 6 caracteres.
                </li>
                <li>
                    La fortaleza de la contraseña se mide en los siguientes niveles: 
                    <span style="color:#ff0000;">"Muy Débil"</span>,&nbsp;
                    <span style="color:#ff5f5f;">"Débil"</span>,&nbsp;
                    <span style="color:#56e500;">"Media"</span>,&nbsp;
                    <span style="color:#399800;">"Buena"</span>&nbsp;y&nbsp;
                    <span style="color:#0000FF;">"Óptima"</span>
                </li>
                <li>
                    Las contraseñas distinguen las mayúsculas y minúsculas, y pueden contener números y símbolos.
                </li>
                <li>
                    Por cada punto que considere al ingresar su contraseña, esta se hará mas fuerte.
                </li>
                <li>
                    Una contraseña <span style="color:#0000FF;">"Óptima"</span> contiene al menos una mayúscula, una minúscula, un número, un símbolo y tiene mas de 12 caracteres.
                </li>
            </ul>
            
            
        </div>
    </div>
    </form>
</body>
</html>
