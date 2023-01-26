<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Registrar_Incidencia.aspx.vb" Inherits="WebSiteCliente.Registrar_Incidencia" %>

<%@ Register Assembly="WebSiteCliente" Namespace="WebSiteCliente" TagPrefix="ddlGr" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>    
    <%--<link href="../Pedido/Pedido.css" rel="stylesheet" type="text/css" />--%>
    <link href="Registrar_Incidencia.css" rel="stylesheet" type="text/css" />

    <%--<script src="Registrar_Incidencia.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 r=\'-1\';5 p=\'-1\';5 x=\'-1\';5 26="";5 O="";$(3(){6(z.1j.1H!=$("#1J").4()){z.U.15=\'../1t.w\';q}$("#7").12(\'14\',\'1k\');$("#j").12(\'14\',\'1C\');$("#k").l();$("#j,#7").1O("1P",1T);$(\'#k\').u(3(){10($(\'#k\').4())});$("#1f").1g(3(){5 d=$(\'#k\').4();r="-1";p="-1";x=1;6(d.13(\',\')>=0){r=d.i(\',\')[0];p=d.i(\',\')[1]}5 e=$("#1c").4();5 f=$("#7").4().T(/\'/g,"&#V");5 g=$("#j").4().T(/\'/g,"&#V");5 h=$("#1c").4();6(e==""){o("F 1h 1i",\'m 9\');$("#1l").l();q}6(d=="0"){o("1m 1n 1r",\'m 9\');$("#k").l();q}6($.s(f)==""){o("F 1u",\'m 9\');$("#7").4(\'\');$("#7").l();q}6($.s(g)==""){o("F 1vón",\'m 9\');$("#j").4(\'\');$("#j").l();q}$.1e({17:"18",19:"1a.w/1R",1b:"{\'27\': \'"+e+"\',"+"\'1V\': \'"+h+"\',"+"\'1W\': \'"+x+"\',"+"\'1X\': \'"+p+"\',"+"\'21\': \'"+$.s(f)+"\',"+"\'22\': \'"+$.s(g)+"\',"+"\'23\': 25}",M:"N/v; P=Q-8",R:"v",S:3(a){5 b=a.d;6(b.i(\'|\')[0]=="1o"){o("9 1p 1q có1s: "+b.i(\'|\')[1],\'m 9\',W)}t{o(b.i(\'|\')[2],\'m 9\')}},X:3(a,b,c){Y(a,b,c)}})});3 W(){z.U.15=\'1w.w\'}3 10(d){6(d.13(\',\')>=0){5 e=d.i(\',\')[0];5 f=d.i(\',\')[1];$.1e({17:"18",19:"1a.w/1x",1b:"{\'1y\': \'"+e+"\',\'1z\':\'"+f+"\'}",M:"N/v; P=Q-8",R:"v",S:3(a){$("#7").4(a.d);O=""},X:3(a,b,c){Y(a,b,c)}})}t{$("#7").4(\'\')}}3 1A(a,b,c){$(a).1B("Z-1D-1E Z-1F-1G");$(a).A("1I","11");$(a).A("1K","11");$(a).A("1L","1M");6(a=="#1N"){$(a).B({C:"1Q",D:"1S",E:c,y:"G",u:3(e){r=H.I();1Y("#1Z",20,r)},J:K,L:0})}t 6(a=="#24"){$(a).B({C:"1d",D:"16",E:c,y:"G",u:3(e){x=H.I()},J:K,L:0})}t{$(a).B({C:"1d",D:"16",E:c,y:"G",u:3(e){p=H.I()},J:K,L:0})}}3 1U(){$("#k").4(0);$("#7").4("");$("#j").4("");$("#7").l()}});',62,132,'|||function|val|var|if|txtAsunto||Ticket|||||||||split|txtDescripcion|ddlTipoDet|focus|Registro||alerta|valSubTipo|return|valTipo|trim|else|change|json|aspx|valMedio|filter|window|css|kendoComboBox|dataTextField|dataValueField|dataSource|Ingrese|contains|this|value|suggest|true|index|contentType|application|UltimaTeclaDigitadaAsunto|charset|utf|dataType|success|replace|location|39|fnResultadoRegistro|error|MostrarErrorAjax|ui|ObtieneDescripcionTipificacion|0px|attr|indexOf|maxlength|href|P_inCod|type|POST|url|Registrar_Incidencia|data|hdfIdUsuarioLogeado|Titulo|ajax|btnRegistrarTicket|click|un|usuario|parent|100|txtUsuario|Seleccione|el|OK|registrado|con|Motivo|digo|Login|asunto|descripci|Incidencia|ObtenerDescripcionTipificacion|idtipo|iddetalletipo|ActivarComboboxKendo|removeClass|250|widget|content|corner|all|UsuarioConectado|padding|hfUsuario|margin|height|24px|ddlTipo|live|keypress|Nombre|RegistrarTicket|IdTipo|ValidarAlfaNumerico|LimpiarControles|pUsuarioRegistro|pMedioContacto|pTipificacion|CargarSubTipo|ddlSubTipo|120|pAsunto|pDescripcion|pEsChat|ddlMedio|false|UltimaTeclaDigitadaDes|pUsuario'.split('|'),0,{}))
    </script>


    <!--[if IE 6]>
    <style type="text/css">
        #btnRegistrarTicket
        {
            width:200px !important;
            text-align:center !important;
        }
    </style>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
    <meta name="Generator" content="Microsoft Word 15 (filtered)" />

</head>
<body >
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hfUsuario"  runat="server" />
    <div id="global">
            <div class="titulo">
                REGISTRAR TICKETS
            </div><br />
            <div id="pInformacionUsuario" class="pMedium">
                <table class="miTabla">
                    <tr>
                        <td align="right" style="color: #003F59;vertical-align:bottom;">
                            <b>Motivo:</b>
                        </td>
                        <td>
                            <div class="contentCombo">
                                <ddlGr:DropDownListGrouped ID="ddlTipoDet" Width="450px" Font-Names="Verdana" Font-Size="11px" runat="server">
                                </ddlGr:DropDownListGrouped>
                                <%--<input id="ddlTipo" style="width: 250px"/>--%>
                            </div>
                        </td>
                    </tr>
<%--                    <tr>
                        <td align="right" style="color: #003F59;vertical-align:bottom;">
                            <b>Acerca de:</b>
                        </td>
                        <td style="vertical-align:bottom;">
                            <div class="contentCombo">
                                <input id="ddlSubTipo" style="width: 250px"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style="color: #003F59;vertical-align:bottom;">
                            <b>Medio de Contacto:</b>
                        </td>
                        <td style="vertical-align:bottom;">
                            <div class="contentCombo">
                                <input id="ddlMedio" style="width: 250px"/>
                            </div>
                        </td>
                    </tr>--%>
                    <tr>
                        <td align="right" style="color: #003F59; vertical-align:top;">
                            <b>Asunto:</b>
                        </td>
                        <td style="vertical-align:top;">
                            <input id ="txtAsunto" style="width:450px; height: 29px;" class="k-textbox" value=""/>
                        </td>
                    </tr>
                    <tr height="10px">
                        <td align="right" style="color: #003F59; vertical-align:top;">
                            <b>Descripción:</b>
                        </td>
                        <td style="vertical-align:top;">
                            <textarea id="txtDescripcion" style="resize: none; width:450px; height: 170px; overflow: auto;" cols="20" rows="2" class="k-textbox"></textarea>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="zonaBoton">
                <div>
                    <div id="btnRegistrarTicket" class="k-button NewButton" style="text-align: justify; ">
                        <%--<img alt="" src="../Common/Images/ampliar.png" />--%>Registrar Ticket <span class="k-icon k-i-plus"/>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
