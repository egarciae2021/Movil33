<%@ Page Language="VB" AutoEventWireup="false" Inherits="WebSiteCliente.Configuracion" Codebehind="Configuracion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="Common/Images/Login/favicon.ico" type="image/ico" />
    <title>.:Gestión Móvil:.</title>
    <link href="Common/Styles/Login.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <%--<link href="Common/Styles/Principal.css" rel="stylesheet" type="text/css" />--%>
    <link href="Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="Configuracion.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('i u=u||{};u.1e=u.1e||6(a){i t=1z(a);7(t!="1s"||a===T){7(t=="1L"){a=\'"\'+a+\'"\'};1k 1m(a)}j{i n,v,k=[],G=(a&&a.2L==2I);2G(n 2F a){v=a[n];t=1z(v);7(t=="1L"){v=\'"\'+v+\'"\'}j 7(t=="1s"&&v!==T){v=u.1e(v)};k.2E((G?"":\'"\'+n+\'":\')+1m(v))}1k(G?"[":"{")+1m(k)+(G?"]":"}")}};u.1P=u.1P||6(a){7(a===""){a=\'""\'};2D("i p="+a+";");1k p};6 F(a,b,c){i r=2C.2y(a.2x);7(r==T){r=a.2w;7(r==T||r==\'\'){m("K 2vé2u")}j{m("1h: "+r+". 2t: "+a.2s)}}j{m("1h: "+r.1h)}$("#1q,#M-1u-1v-1w,.M-1x-1y").w({"1A-1B":"1C%"})}$(1D).2r(6(){$("#1F").q();$("#1H").q()});$(1D).2q(6(){$("#1F").x();$("#1H").x()});i 1Z="2n H...";$(6(){18();$(J).2l(6(){18()});6 18(){i a=$(J).1O();i b=$(J).l();$("#1Q").w({1O:a-24,l:b-24})}$("#2i").B(6(){J.2h.2g="2f.2e"});$("#1d").E(6(){$("#1o").x();$("#Pña").x();$("#o").w("l",$("#o").l()-1r)});$("#1cña").E(6(){$("#1o").q();$("#Pña").q();$("#o").w("l",$("#o").l()+1t)});6 1b(d,e,f,g,h){$.W({X:"Y",Z:"10/11/12.13/2d",15:"{\'1a\': \'"+e+"\',"+"\'1f\': \'"+d+"\',"+"\'H\': \'"+f+"\',"+"\'19\': \'"+g+"\',"+"\'2c\': \'"+h+"\'}",16:"U/k; S=R-8",N:"k",I:6(a){7(a.d!=""){m("K 2b L 1S 1T 1ión, 2a 29 28á27 y L 1ión 20 2p 21")}j{m("22 1S 1T 1ión 23 25.")}},Q:6(a,b,c){F(a,b,c)}})}$("#26").B(6(){i a;7($("D[A=1V]:z").5()==\'1d\'){a="17"}j{a="14"}1b(a,$("#1Y").5().9(\'\\\\\',\'\\\\\\\\\'),$("#1W").5().9(\'\\\\\',\'\\\\\\\\\'),$("#Cña").5().9(\'\\\\\',\'\\\\\\\\\'),$("#1R").5().9(\'\\\\\',\'\\\\\\\\\'))});$("#1Q").q();$("#2j").B(6(){i d;i e;7($("D[A=1V]:z").5()==\'1d\'){d="17"}j{d="14"}$.W({X:"Y",Z:"10/11/12.13/2k",15:"{\'1a\': \'"+$("#1Y").5().9(\'\\\\\',\'\\\\\\\\\')+"\',"+"\'1f\': \'"+d+"\',"+"\'H\': \'"+$("#1W").5().9(\'\\\\\',\'\\\\\\\\\')+"\',"+"\'19\': \'"+$("#Cña").5().9(\'\\\\\',\'\\\\\\\\\')+"\',"+"\'1N\': \'"+$("#1R").5().9(\'\\\\\',\'\\\\\\\\\')+"\',"+"\'2m\': \'"+$("D[A=1g]:z").5()+"\',"+"\'2o\':\'"+$("#1K").5()+"\'}",16:"U/k; S=R-8",N:"k",I:6(a){7(a.d!=""){m("K 1I 1E 1p L 1nón")}j{m("1Xón 1U.")}},Q:6(a,b,c){F(a,b,c)}})});$("#V").E(6(){$("#1M").x();$("#Pñs").x();$("#o").w("l",$("#o").l()-1r)});$("#1cñs").E(6(){$("#1M").q();$("#Pñs").q();$("#o").w("l",$("#o").l()+1t)});$("#2z").B(6(){$.W({X:"Y",Z:"10/11/12.13/2A",15:"{}",16:"U/k; S=R-8",N:"k",I:6(a){7(a.d!=""){i b=a.d.2B(",");$("#1j").5(b[0]);$("#1l").5(b[4]);7(b[1]=="1"){$("#O").5("");$("#Cñs").5("")}j{$("#O").5(b[2]);$("#Cñs").5(b[3]);$("#V").5();$("#1cñs").5()}}},Q:6(a,b,c){F(a,b,c)}})});$("#2H").B(6(){i a;7($("D[A=1J]:z").5()==\'V\'){a="17"}j{a="14"}1b(a,$("#1j").5().9(\'\\\\\',\'\\\\\\\\\'),$("#O").5().9(\'\\\\\',\'\\\\\\\\\'),$("#Cñs").5().9(\'\\\\\',\'\\\\\\\\\'),$("#1l").5().9(\'\\\\\',\'\\\\\\\\\'))});$("#2J").B(6(){i d;7($("D[A=1J]:z").5()==\'V\'){d="17"}j{d="14"}$.W({X:"Y",Z:"10/11/12.13/2K",15:"{\'1a\': \'"+$("#1j").5().9(\'\\\\\',\'\\\\\\\\\')+"\',"+"\'1f\': \'"+d+"\',"+"\'H\': \'"+$("#O").5().9(\'\\\\\',\'\\\\\\\\\')+"\',"+"\'19\': \'"+$("#Cñs").5().9(\'\\\\\',\'\\\\\\\\\')+"\',"+"\'1N\': \'"+$("#1l").5().9(\'\\\\\',\'\\\\\\\\\')+"\'}",16:"U/k; S=R-8",N:"k",I:6(a){7(a.d!=""){m("K 1I 1E 1p L 1nón")}j{m("1Xón 1U.")}},Q:6(a,b,c){F(a,b,c)}})});$(\'#1g\').E(6(){i a=$("D[A=1g]:z").5();7(a=="2"){$("#1G").q();$("#1K").2M()}j{$("#1G").x()}});$("#1q,#M-1u-1v-1w,.M-1x-1y").w({"1A-1B":"1C%"})});',62,173,'|||||val|function|if||replace|||||||||var|else|json|height|alerta||dvPanelConfiguracion||show||aDatos||JSON||css|hide||checked|name|click|txtContrase|input|change|MostrarErrorAjax|arr|Usuario|success|window|Error|la|ui|dataType|txtUsuarioDatos|trContrase|error|utf|charset|null|application|rbtnSeguridadIntegradaDatos|ajax|type|POST|url|Common|WebServices|General|asmx|UP|data|contentType|SI|Dimensionar|Password|Servidor|ProbarConexion|rbtnUsarioContrase|rbtnSeguridadIntegrada|stringify|Autenticacion|rblstAutenticacion|Message|conexi|txtServidorDatos|return|txtBaseDatosDatos|String|configuraci|trUsuario|guardar|dvContenidoAlerta|50|object|62|dialog|title|dvMsgAlerta|button|text|typeof|font|size|70|document|intentar|Capa|divldap|dvCargando|al|AutenticacionDatosRbtn|txtLDAP|string|trUsuarioDatos|BD|width|parse|tbConenido|txtBaseDatos|prueba|de|guardada|AutenticacionRbtn|txtUsuario|Configuraci|txtServidor|txtUser|con|servidor|La|fue||satisfactoria|btnProbarConexion|metros|par|los|verifique|en|BaseDatos|ComprobarConexion|aspx|login|href|location|dvConfiguracion|btnGuardar|GuardarConfiguracionBase|resize|AutenticacionUsuario|Tu|RutaLDAP|el|ajaxStop|ajaxStart|status|Codigo|rico|Gen|statusText|responseText|parseJSON|btnCargarDatosBase|CargarConfiguracionDatos|split|jQuery|eval|push|in|for|btnProbarConexionDatos|Array|btnGuardarDatos|GuardarConfiguracionDatos|constructor|focus'.split('|'),0,{}))
    </script>
</head>
<body text=".:Gestión Móvil:.">
    <form id="form1" runat="server">
        <div id="Capa" class="trans">
           <p></p>
        </div>
        <div id="dvCargando" class="dvCargando"></div>
        <table id="tbConenido" style="margin:0px; padding:0px; ">
            <tr style="height:10px;">
                <td style="vertical-align:top;text-align:right;">
                    <div id="dvConfiguracion" runat="server" class="btnNormal k-button" style="vertical-align:middle;">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                </td>
                                <td style="padding-left:2px;">
                                    <asp:Label ID="lblConfiguracion" runat="server" Text="Ir al sistema"></asp:Label>
                                </td>
                            </tr>
                        </table>                  
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <div id="dvPanelConfiguracion" class="k-block" style="width:400px; height:670px;">
                        <div id="dvTitulo" class="k-header k-inset" style=" text-align: center;">
                            <table border="0" width="100%" style="height:100%;" cellpadding ="0" cellspacing="0">
                                <tr>
                                    <td align="right" width="40%" style="vertical-align: middle;">
                                        <img alt="" src="Common/Images/Login/Configuracion.png" />
                                    </td>
                                    <td align="left" style="vertical-align: middle; padding-left:3px;">
                                        <asp:Label ID="lblTitulo" runat="server" Text="Configuración" CssClass="lblTitulo"></asp:Label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <table cellpadding="0" style="width:400px; text-align: left;">
                            <tr>
                                <td style="padding-left:15px; padding-top:15px;">
                                    <asp:Label ID="Label7" runat="server" Text="Autenticación" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                                <td style="padding-top:15px;">
                                    <asp:RadioButtonList ID="rblstAutenticacion" runat="server" RepeatDirection="Horizontal">
                                        <asp:ListItem Selected="True" Value="0">Formulario</asp:ListItem>
                                        <asp:ListItem Value="1">Windows</asp:ListItem>
                                        <asp:ListItem Value="2">Active Directory</asp:ListItem>
                                    </asp:RadioButtonList>

                                    <div runat="server" id="divldap" style="font-family:Verdana; font-size:11px;">
                                        <br />
                                        LDAP: <asp:TextBox ID="txtLDAP" runat="server" CssClass="k-textbox txtCampo" Width="200px"></asp:TextBox>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px; padding-top:15px;" colspan="2">
                                    <asp:Label ID="Label6" runat="server" Text="Conexión A la base de datos" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px; padding-top:15px;">
                                    <asp:Label ID="Label1" runat="server" Text="Servidor" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td style="padding-top:15px;">
                                    <asp:TextBox ID="txtServidor" runat="server" CssClass="k-textbox txtCampo" Width="180px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left:15px;">
                                    <asp:RadioButton ID="rbtnSeguridadIntegrada" runat="server" Text="Usar seguridad integrada de windows" GroupName="AutenticacionRbtn"/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left:15px;">
                                    <asp:RadioButton ID="rbtnUsarioContraseña" runat="server" Text="Usar Usuario y Contraseña" GroupName="AutenticacionRbtn"/>
                                </td>
                            </tr>
                            <tr id="trUsuario" runat="server">
                                <td style="padding-left:15px;">
                                    <asp:Label ID="Label4" runat="server" Text="Usuario" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtUsuario" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trContraseña" runat="server">
                                <td style="padding-left:15px;">
                                    <asp:Label ID="Label5" runat="server" Text="Contraseña" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtContraseña" runat="server" CssClass="k-textbox txtCampo" TextMode="Password"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px;">
                                    <asp:Label ID="Label2" runat="server" Text="Base de datos" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtBaseDatos" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table width="380px">
                                        <tr>
                                            <td style="width:50%; text-align:center;">
                                                <input id="btnProbarConexion" type="button" value="Probar Conexión" class="k-button"/>
                                            </td>
                                            <td style="width:50%; text-align:center;">
                                                <input id="btnGuardar" type="button" value="Guardar" class="k-button"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table border="0" cellpadding="0" style="width:400px; text-align: left;">
                            <tr>
                                <td style="padding-left:15px; padding-top:15px;" colspan="2">
                                    <asp:Label ID="Label3" runat="server" Text="Conexión A la base de datos - Datos" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px; padding-top:15px;" colspan="2">
                                    <input id="btnCargarDatosBase" type="button" value="Cargar valores" class="k-button"/>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px; padding-top:15px;">
                                    <asp:Label ID="Label10" runat="server" Text="Servidor" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td style="padding-top:15px;">
                                    <asp:TextBox ID="txtServidorDatos" runat="server" CssClass="k-textbox txtCampo" Width="180px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left:15px;">
                                    <asp:RadioButton ID="rbtnSeguridadIntegradaDatos" runat="server" Text="Usar seguridad integrada de windows" GroupName="AutenticacionDatosRbtn"/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left:15px;">
                                    <asp:RadioButton ID="rbtnUsarioContraseñaDatos" runat="server" Text="Usar Usuario y Contraseña" GroupName="AutenticacionDatosRbtn"/>
                                </td>
                            </tr>
                            <tr id="trUsuarioDatos" runat="server">
                                <td style="padding-left:15px;">
                                    <asp:Label ID="Label11" runat="server" Text="Usuario" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtUsuarioDatos" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trContraseñaDatos" runat="server">
                                <td style="padding-left:15px;">
                                    <asp:Label ID="Label12" runat="server" Text="Contraseña" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtContraseñaDatos" runat="server" CssClass="k-textbox txtCampo" TextMode="Password"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px;">
                                    <asp:Label ID="Label13" runat="server" Text="Base de datos" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtBaseDatosDatos" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table width="380px">
                                        <tr>
                                            <td style="width:50%; text-align:center;">
                                                <input id="btnProbarConexionDatos" type="button" value="Probar Conexión" class="k-button"/>
                                            </td>
                                            <td style="width:50%; text-align:center;">
                                                <input id="btnGuardarDatos" type="button" value="Guardar" class="k-button"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>