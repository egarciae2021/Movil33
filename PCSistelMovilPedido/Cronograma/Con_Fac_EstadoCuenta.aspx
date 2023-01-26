<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_EstadoCuenta.aspx.vb" Inherits="WebSiteCliente.Con_Fac_EstadoCuenta" %>
<%@ Register Src="../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="CronogramaPagos.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>

    <script src="Con_Fac_EstadoCuenta.js" type="text/javascript"></script>
    <%--<script type="text/javascript">
        eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('7 3J;7 42=1m;7 3f=1m;7 2V=0;$(3o).3A("3H",w(){$(".2s").3M("3Q-3T-3U");$(".2s").1S({"3Z":"1Q","46":"26 1Z 26 1Z"});7 n=D G();7 o=D G(n.1e(),n.15(),0);7 p=D G(n.1e(),n.15(),0);7 q=$("#1w").1v({2Z:"2U-2J",2C:"1q",2A:"1q",2y:o,Q:"2p/2i",2B:T,2I:p}).9("1v");$("#1A").O({1p:{},4I:T,4H:1m,1W:1m,1Y:[{A:"2j",F:"2j",t:"2z",K:{"N":"M-1t-L",z:"5-y: I; t: 2z;"}},{A:"4A",F:"4z/4xón",t:"2a",K:{"N":"M-1t-L",z:"5-y: I; t: 2a;"}},{A:"4w",F:"4v",t:"2d",K:{"N":"M-1t-L",z:"5-y: I; t: 2d;"}},{A:"4t",F:"2f 2g",t:"2h",V:{z:"5-y: U;"},K:{"N":"M-1t-L",z:"5-y: I; t: 2h;"}}],2k:{4s:T,4r:1m,4q:{4p:"í2w 4o pá4n",1U:"{0}-{1} 19 {2} í2w",2D:""}},2H:"4m"});7 r=["2K","2M","2N","2O","2P","2Q","2R","2T","4j","2W","2X","2Y"];7 s=D G();$("#E").O({1p:{9:{}},t:4i,4d:T,1W:T,4b:T,2k:T,2H:"47",1Y:[{A:"1X",K:{z:"5-y: I; t:x;",t:"x"},V:{"N":"M-L",z:"5-y: U;"},Q:"{0:c}",t:"x",F:""},{A:"20",K:{z:"5-y: I; t:x;",t:"x"},V:{"N":"M-L",z:"5-y: U;"},Q:"{0:c}",t:"x",F:""},{A:"21",K:{z:"5-y: I; t:x;",t:"x"},V:{"N":"M-L",z:"5-y: U;"},Q:"{0:c}",t:"x",F:""},{A:"22",K:{z:"5-y: I; t:x;",t:"x"},V:{"N":"M-L",z:"5-y: U;"},Q:"{0:c}",t:"x",F:""},{A:"23",K:{z:"5-y: I; t:x;",t:"x"},V:{"N":"M-L",z:"5-y: U;"},Q:"{0:c}",t:"x",F:""},{A:"24",K:{z:"5-y: I; t:x;",t:"x"},V:{"N":"M-L",z:"5-y: U;"},Q:"{0:c}",t:"x",F:""}]});25();w 25(){7 a=$("#1i").B();29(a)}$("#1I").45(w(e){1R("44 43...");1o;7 d=$("#1E").B();u(d!=""){$("#J").5("");7 f=d.R(6,4);7 g=d.R(3,2);7 h=2r(g);7 i=$("#3L").B()+f+"/"+h+"/";7 j="";7 k=$("#3I").B();u(k==0){j=$("#1i").B()}v{j=$("#3E").B();u(j==""){$("#J").5("3D 3C Z 1H.");1o}}7 l="3q"+j+".3p";7 m=i+l;$.1h({1g:"1f",1d:"../../../2L/3n/3m.3l/3k",9:1a.13({3j:m}),18:"17/H; 16=1c-8",14:"H",1l:w(a){u(a.d==\'1\'){3i.3g.3e=38("2L/36/3W.37?34="+m)}v{39(\'3a 3b 3c 3d 34 "\'+l+\'".\')}},1j:w(a,b,c){1T(a,b,c)}})}v{e.3h();u($("#31").1S(\'1U\')=="1Q"){$("#J").5("2S 1b 1B Z 1C 19 1D")}v{$("#J").5("2G 1H 2F 1b 1B Z 1C 19 1D")}}});w 2r(a){7 b="";u(a=="2E"){b="2K"}v u(a=="3r"){b="2M"}v u(a=="3s"){b="2N"}v u(a=="3t"){b="2O"}v u(a=="3u"){b="2P"}v u(a=="3v"){b="2Q"}v u(a=="3w"){b="2R"}v u(a=="3x"){b="2T"}v u(a=="3y"){b="3z"}v u(a=="10"){b="2W"}v u(a=="11"){b="2X"}v u(a=="12"){b="2Y"}1o b}$("#1w").3B(w(){u($("#1i").B()!=""){1L($("#1i").B())}})});w 29(e){$.1h({1g:"1f",1d:"1z.1y/3F",9:1a.13({\'3G\':e,"1O":$("#1P").B()}),18:"17/H; 16=1c-8",14:"H",1l:w(a){u(a.d.1u!=3K){$("#J").5("");$("#2t").5(a.d.1u);$("#2q").5(a.d.3N);$("#2n").5(a.d.3O.3P);$("#2m").5(a.d.3R.3S);$("#1i").B(a.d.1u);2l(a.d.1u)}v{$("#2t").5("(C)");$("#2q").5("(C)");$("#2n").5("(C)");$("#3V").2D();$("#J").5("35 3X 1b 3Y");$("#1G").5("(C)");$("#40").5("(C)");$("#41").5("(C)");$("#2m").5("(C)");$("#1E").B("");7 b=D P.9.1r({9:{},1s:10});7 c=$("#1A").9("O");c.1k(b);7 d=$("#E").9("O");d.1k(b);$("#28").1n();$("#1I").1n()}},1j:w(a,b,c){1T(a,b,c)}})}w 1L(p){7 q=$("#1w").B();u(q!=""){q=q.R(3,4)+q.R(0,2)+"2E"}v{$("#J").5("48 Z 49.");1o}$.1h({1g:"1f",1d:"1z.1y/4a",9:1a.13({\'1V\':p,"1O":$("#1P").B(),"4c":q}),18:"17/H; 16=1c-8",14:"H",1l:w(a){u(a.d.33>0){7 b=0;b=2V-4e;u(b<=0){b=4f}7 c=D P.9.1r({9:a.d,1s:10});7 d=$("#1A").9("O");d.1k(c);7 e="2f 2g (S/.)";7 f=a.d[0].4g;7 g=a.d[0].4h;7 h=0;u(a.d[0].1F.1M(",")>=0){h=h+Y(a.d[0].1F.1J(\',\',\'\'))}v{h=h+Y(a.d[0].1F)}7 j=a.d[0].4k;7 k=0;7 l=0;7 m=0;7 i;4l(i=0;i<a.d.33;i++){u(a.d[i].1K.1M(",")>=0){l=l+Y(a.d[i].1K.1J(\',\',\'\'))}v{l=l+Y(a.d[i].1K)}u(a.d[i].1N.1M(",")>=0){m=m+Y(a.d[i].1N.1J(\',\',\'\'))}v{m=m+Y(a.d[i].1N)}}k=h-l+m;$("#1G").5(e);$("#2x").5(f);$("#2v").5(g);$("#2u").5(P.1x(h,"c"));$("#2o").5(P.1x(l,"c"));$("#2e").5("0.4u");$("#2c").5(P.1x(m,"c"));$("#2b").5(P.1x(k,"c"));$("#1E").B(j);$("#J").5("");27(p)}v{u($("#31").1S(\'1U\')=="1Q"){$("#J").5("2S 1b 1B Z 1C 19 1D")}v{$("#J").5("2G 1H 2F 1b 1B Z 1C 19 1D")}$("#1G").5("(C)");$("#2x").5("(C)");$("#2v").5("(C)");$("#2u").5("(C)");$("#2o").5("(C)");$("#2e").5("(C)");$("#2c").5("(C)");$("#2b").5("(C)");$("#1E").B("");c=D P.9.1r({9:a.d,1s:10});d=$("#1A").9("O");d.1k(c);7 n=D P.9.1r({9:a.d,1s:1});7 o=$("#E").9("O");o.1k(n);$("#28").1n();$("#1I").1n()}},1j:w(a,b,c){1T(a,b,c)}})}w 27(b){$("#E").9("O").1p.9([]);$.1h({1g:"1f",1d:"1z.1y/4y",9:1a.13({\'1V\':b,"1O":$("#1P").B()}),18:"17/H; 16=1c-8",14:"H",1l:w(a){$("#E X[9-A=1X]").W(a.d[0]["4B"]);$("#E X[9-A=20]").W(a.d[0]["4C"]);$("#E X[9-A=21]").W(a.d[0]["4D"]);$("#E X[9-A=22]").W(a.d[0]["4E"]);$("#E X[9-A=23]").W(a.d[0]["4F"]);$("#E X[9-A=24]").W(a.d[0]["4G"]);$("#E").9("O").1p.9(a.d)},1j:w(a){1R(a.32+" - "+a.30)}})}w 2l(h){$.1h({1g:"1f",1d:"1z.1y/4J",9:1a.13({\'4K\':h}),18:"17/H; 16=1c-8",14:"H",1l:w(a){7 b;7 c;7 d=D G();7 e=D G(d.1e(),d.15()+1,0);u(a.d!=""){7 f=a.d.4L("|");b=D G(f[0].R(0,4),f[0].R(4,2),0);c=D G(f[1].R(0,4),f[1].R(4,2),0)}v{b=D G(d.1e(),d.15(),0);c=D G(d.1e(),d.15(),0)}7 g=$("#1w").1v({2Z:"2U-2J",2C:"1q",2A:"1q",2y:e,Q:"2p/2i",2B:T,2I:b,4M:c}).9("1v");1L(h)},1j:w(a){1R(a.32+" - "+a.30)}})}', 62, 297, '|||||text||var||data||||||||||||||||||||width|if|else|function|30px|align|style|field|val|Desconocido|new|grCronogramaPagos|title|Date|json|center|spMensaje|headerAttributes|cell|table|class|kendoGrid|kendo|format|substr||false|right|attributes|html|th|parseFloat|un||||stringify|dataType|getMonth|charset|application|contentType|de|JSON|no|utf|url|getFullYear|POST|type|ajax|hdfEmpleado|error|setDataSource|success|true|hide|return|dataSource|year|DataSource|pageSize|header|P_vcCod|kendoDatePicker|txtPeriodo|toString|aspx|Con_Fac_EstadoCuenta|grdEstadoCuenta|tiene|Estado|Cuenta|hdfFecEC|SaldoAnterior|lblMoneda|empleado|btnPdf|replace|MontoPagado|load|indexOf|MontoCuota|inTipOri|hdfinTipOri|none|alert|css|MostrarErrorAjax|display|IdEmpleado|navigatable|montoPago1|columns|0px|montoPago2|montoPago3|montoPago4|montoPago5|montoPago6|Inicio|2px|cronograma_6M|tbExportar|cargar_DatosEmpleado|450px|lblMontoTotal|lblCuotasFinan|50px|lblConsumos|Nuevos|Soles|150px|yyyy|Fecha|pageable|fnCargarPeriodo|lblCCosto|lblArea|lblPagos|MM|lblNombreEmpleado|DevuelveMes|bordeui|lblCodigoEmpleado|lblECAnt|lblPeriodo|tems|lblFechaPago|value|100px|depth|footer|start|empty|01|ingresado|El|height|max|PE|Enero|Common|Febrero|Marzo|Abril|Mayo|Junio|Julio|Usted|Agosto|es|altoPagina|Octubre|Noviembre|Diciembre|culture|statusText|toolbar|status|length|archivo|Los|Controladores|ashx|raiz|alerta|No|se|encuentra|el|href|mensajeAle|location|preventDefault|window|RutaCompleta|CheckFileExists|asmx|General|WebService|document|pdf|Estado_de_Cuenta_|02|03|04|05|06|07|08|09|Setiembre|on|change|Seleccionar|Debe|hdfTecnicoResponsable|getEmpleado|valor|ready|hdfAdmin|check|null|hdfRuta|removeClass|vcNom|Area|vcNomOrg|ui|CentroCosto|vcNomCenCos|corner|all|ddlSolicitud|DescargarArchivo|filtros|coinciden|border|lblNumCuotas|lblDeuda|ale|mantenimiento|En|click|padding|40px|Seleccione|periodo|ListarEstadoCuenta|resizable|p_periodo|scrollable|320|250|UltDiaPago|Periodo|800|Septiembre|FechaGeneracionEC|for|200px|gina|por|itemsPerPage|messages|pageSizes|refresh|Monto|00|Cuota|NumCuotas|Descripci|getCronograma6M|Concepto|ConceptoPago|fecha1|fecha2|fecha3|fecha4|fecha5|fecha6|sortable|groupable|GetPeriodoxEmpl|idEmpleado|split|min'.split('|'), 0, {}))
    </script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfOrganizacion" runat="server" />
    <asp:HiddenField ID="hdfFecEC" runat="server" />
    <div id="general">
        <div id="Principal">
            <div>
                <div id="pInformacionUsuario" class="pMedium">
                    <table id="tbInfoUsuario" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr height="5px">
                            <td colspan="4">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="cGenInfo" align="center">
                                <b>Información del Usuario</b>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="style4">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td style="vertical-align: bottom;" class="style2">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;" width="250px">
                                <b>Código:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblCodigoEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Nombre:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Área:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Centro de Costo:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblCCosto" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td style="vertical-align: bottom;" class="style2">
                            </td>
                        </tr>
                    </table>
                    <table align="left">
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom; padding-right: 5px;
                                padding-left: 30px;">
                                <b>Moneda:</b> &nbsp;
                            </td>
                            <td style="vertical-align: bottom; padding-right: 50px;">
                                <asp:Label ID="lblMoneda" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom; padding-right: 5px;"
                                class="style2">
                                <b>Último día de pago:</b> &nbsp;
                            </td>
                            <td style="vertical-align: bottom; padding-right: 60px;">
                                <asp:Label ID="lblFechaPago" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom; padding-right: 5px;">
                                <b>Periodo de Facturación:</b>
                            </td>
                            <td style="vertical-align: bottom; width: 180px" class="style1">
                                <asp:Label ID="lblPeriodo" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="dvFechas" class="pMedium">
        <table width="100%">
            <tr>
                <td align="left" style="color: #cd0a0a;">
                    <b><span id="spMensaje"></span></b>
                </td>
            </tr>
        </table>
    </div>            
    <div id="dvBotones" class="pMedium" style="padding-top:0px; padding-bottom:5px;">
        <div>
            <table>
                <tr>
                    <td>Periodo:</td>
                    <td>
                        <asp:TextBox id="txtPeriodo" runat="server" Width="150px" MaxLength="8" class="bordeui"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <div id="btnExcel" style="float:right; display:none">
            <table id="tbExportar" cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="btnPdf" class="btnButton" style="width: 33px; height: 25px; float:right; display:none">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="style2">
                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/pdf.ico" Style="height: 15px;
                            margin-left: -3px; margin-bottom: 3px;" />
                    </td>
                    <td>
                        &nbsp;
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="grdEstadoCuenta" class="pMedium">
    </div>
    <div id="Info" class="pMedium">
        <p>
            <b><span id="spEnMoneda"></span></b>
        </p>
        <ul>
            <li>
                <div>
                    <table id="tbDetalles">
                        <tr class="Alto">
                            <td align="center" class="cSubTitulo">
                                Estado de cuenta anterior
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblECAnt" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    -</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="cSubTitulo">
                                Pagos/Abonos
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblPagos" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    +</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="cSubTitulo">
                                Sub-Total consumos/cargos
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblConsumos" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    +</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="cSubTitulo">
                                Cuotas financiadas
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblCuotasFinan" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    =</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="Monto" style="width: 100px;">
                                Monto Total del Mes
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblMontoTotal" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
        </ul>
    </div>
    <div id="dvCu" class="pMedium">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td colspan="4" class="cGenInfo" align="center">
                    <b>Cuotas Programadas</b>
                </td>
            </tr>
        </table>
    </div>
    <div id="grCronogramaPagos" class="pMedium" style="padding-bottom: 10px; margin-bottom: 15px;">
    </div>
    </form>
</body>
</html>
