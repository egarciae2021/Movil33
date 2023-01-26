<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="CronogramaPagos.aspx.vb" Inherits="WebSiteCliente.CronogramaPagos" %>
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
        <%--<script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>--%>
        <script src="../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
        <%--<script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>--%>
        <%--<script src="../Common/Scripts/anytime.js" type="text/javascript"></script>--%>

        <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
        <%--<link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />--%>
        <link href="../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
        <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <link href="CronogramaPagos.css" rel="stylesheet" type="text/css" />
        <script src="../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>

    <script src="CronogramaPagos.js" type="text/javascript"></script>
    <%--<script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('m 1l=0;m 1Q;$(3O).4c("4e",u(){1A.1B("1q-1r");1l=$(R).X();m h=0;h=1l-1N;o(h<=0){h=2B}1u();$(".2y").3A("3d-39-38");$(".2y").33({"32":"2S","2Q":"2j 1U 2j 1U"});m i=T 12();m j=T 12(i.2h(),i.2g()+1,0);m k=T 12(i.2h(),i.2g()+6,0);$("#Y").2M(2L);1Q=$("#Y").1j({1B:"1q-1r",2f:"1m",2e:"1m",2d:j,2c:"2b/W",2a:16}).F("1j");1Q=$("#14").1j({1B:"1q-1r",2f:"1m",2e:"1m",2d:k,2c:"2b/W",2a:16}).F("1j");u 1u(){$("#28").1h();$("#1t").1h()}$("#13").18({1e:{},42:16,3Z:M,3V:M,27:[{E:"3T",B:"N°",D:"3Q",H:{q:"9-r: w;"},I:{"G":"L-K-J",q:"9-r: w;"}},{E:"1s",V:M,B:"1s",D:"11",H:{q:"9-r: w;"},I:{"G":"L-K-J",q:"9-r: w;"}},{E:"3N",B:"1c",D:"11",H:{q:"9-r: w;"},I:{"G":"L-K-J",q:"9-r: w;"}},{E:"25",B:"3y x 3u",D:"11",H:{q:"9-r: w;"},I:{"G":"L-K-J",q:"9-r: w;"}},{E:"3p",V:M,B:"3l",D:"11",H:{q:"9-r: U;"},I:{"G":"L-K-J",q:"9-r: w;"}},{E:"24",V:M,B:"23ón",D:"11",H:{q:"9-r: U;"},I:{"G":"L-K-J",q:"9-r: w;"}},{E:"22",V:M,B:"21és",D:"11",H:{q:"9-r: U;"},I:{"G":"L-K-J",q:"9-r: w;"}},{E:"15",V:16,B:"1Z 1c",D:"2I",H:{q:"9-r: U;"},I:{"G":"L-K-J",q:"9-r: w;"}}],2H:{2F:16,3U:M,3k:{3a:"í1V 2O pá2J",31:"{0}-{1} x {2} í1V",43:""}},2D:2i,X:h});$(R).2N(u(){1o()});1o();$("#2P").1n(u(){m a=R.1P.3J[R.1P.3P.1O("1W","1X")].2E;m b=R.1P.$("#"+a);b.1O("2G",b.1O("1W","1X"))});$("#1t").1n(u(e){m d=$("#1Y").t();o(d==0){1v=$("#1H").t()}C{1v=$("#34").t();o(1v==""){$("#z").9("3b 3c P 1C 3n x 3o.");y}}m f=$("#Y").t();m g=$("#14").t();o(f==""){$("#z").9("O 1b Q x 26");y}C{o(f.A!=7||f.17("/")!=2||f.1f("/").A!=2){$("#z").9("O P 1a x Q vá1d, 1i/W");y}}o(g==""){$("#z").9("O 1b Q x 29");y}C{o(g.A!=7||g.17("/")!=2||g.1f("/").A!=2){$("#z").9("O P 1a x Q vá1d, 1i/W");y}}$.1R({1M:"1L",1K:"1J.1G/2K",1E:"1D/Z; 1x=1w-8",1T:"Z",1S:u(a){o(a.d.A>0){m b=$("#2R").t();m c=a.d;R.2T.2U="../2V/2W/2X.2Y?2Z=30/2C/"+c}},1I:u(a,b,c){1F(a,b,c)}})});$("#2k").1n(u(){m a=$("#1H").t();$("#z").9("");o(a==""||$("#35").t()==""){$("#z").9("36 P 1C");y}m b=$("#Y").t();m c=$("#14").t();o(b==""){$("#z").9("O 1b Q x 26.");y}C{o(b.A!=7||b.17("/")!=2||b.1f("/").A!=2){$("#z").9("O P 1a x Q vá1d, 1i/W");y}}o(c==""){$("#z").9("O 1b Q x 29");y}C{o(c.A!=7||c.17("/")!=2||c.1f("/").A!=2){$("#z").9("O P 1a x Q vá1d, 1i/W");y}}m d=T 12();m e=T 12(1g(b.19(3,4)),1g(b.19(0,2))-1,d.2l());m f=T 12(1g(c.19(3,4)),1g(c.19(0,2))-1,d.2l());o(e>f){$("#z").9("1c x 1u 1z 3e 3f 3g 3h 3i 3j");y}2m(a)});$("#2k").1n()});u 2m(l){$("#13").F("18").1e.F([]);o($("#Y").t()==""){y}o($("#14").t()==""){y}$.1R({1M:"1L",1K:"1J.1G/3m",F:2n.2o({\'2p\':l,"3q":$("#Y").t(),"3r":$("#14").t()}),1E:"1D/Z; 1x=1w-8",1T:"Z",1S:u(a){o(a.d.A>0){m b=0;b=1l-1N;o(b<=0){b=2B}m c=T 1A.F.3s({F:a.d,3t:2q(a)});m d=$("#13").F("18");d.3v(c);m e=0;m f=a.d.A;m g="3w 3x (S/)";m i;3z(i=0;i<a.d.A;i++){o(a.d[i].15.17(",")>=0){e=e+1y(a.d[i].15.3B(\',\',\'\'))}C{e=e+1y(a.d[i].15)}}$("#3C").9(g);$("#3D").9(f);$("#3E").9(1A.3F(3G.3H(1y(e).3I(2),"S/ ")));m h=a.d[0].25;m j=a.d[0].2r;$("#3K").9(h);$("#3L").9(j);1o()}C{m k=$("#1Y").t();o(k==0){$("#z").9("3M 1z 2s P 2t x  2u 2v")}C{$("#z").9("3R 1C 1z 2s P 2t x  2u 2v")}$("#28").1h();$("#1t").1h()}},1I:u(a,b,c){1F(a,b,c)}})}u 1o(){m a;a=$(R).X()-3S;o(a>2w&&a<2x){a=a-10}o(a>=2x){a=1N}C o(a<2z){a=2w}m b=$("#13");m c=b.3W(".k-3X-3Y");m d=a;m e=b.2A()-c.2A();b.X(d);c.X(d-e);m f=40.41(a/37);m g=$("#13").F("18");m h=g.1e.F();m i=h.A;o(i<=5){f=5}C o(i<=10){f=10}C{f=20}}u 2i(e){m d=$("#1H").t();$.1R({1M:"1L",1K:"1J.1G/44",F:2n.2o({\'1c\':e.F.1s,\'2p\':d}),1E:"1D/Z; 1x=1w-8",1T:"Z",1S:u(a){$("<45/>").46(e.47).18({1e:a.d,27:[{E:"2r",B:"48ón",D:"49",I:{"G":"L-K-J",q:"9-r: w;"}},{E:"4a",B:"4b",D:"1k",I:{"G":"L-K-J",q:"9-r: w;"}},{E:"24",V:M,B:"23ón",D:"1k",H:{q:"9-r: U;"}},{E:"22",V:M,B:"21és",D:"1k",H:{q:"9-r: U;"}},{E:"15",B:"1Z 4d",D:"1k",H:{q:"9-r: U;"},I:{"G":"L-K-J",q:"9-r: w;"}}],X:2z})},1I:u(a,b,c){1F(a,b,c)}})}u 2q(a){m b=a.d.A;o(b<=5){1p=5}C o(b<=10){1p=10}C{1p=20}y 1p}',62,263,'|||||||||text|||||||||||||var||if||style|align||val|function||center|de|return|spMensaje|length|title|else|width|field|data|class|attributes|headerAttributes|cell|header|table|true||Ingrese|un|fecha|window||new|right|hidden|yyyy|height|txtFechaInicio|json||100px|Date|crono|txtFechaFin|DcMontoCuota|false|indexOf|kendoGrid|substr|formato|una|Periodo|lido|dataSource|split|parseInt|hide|mm|kendoDatePicker|80px|altoPagina|year|click|resizeGridKendo|TamanioPagina|es|PE|Periodo1|btnPdf|Inicio|CodigoEmpleado|utf|charset|parseFloat|no|kendo|culture|empleado|application|contentType|MostrarErrorAjax|aspx|hdfEmpleado|error|CronogramaPagos|url|POST|type|320|tabs|parent|cPeriodo|ajax|success|dataType|0px|tems|option|selected|hdfAdmin|Monto||Inter|DcInteres|Amortizaci|DcAmortizacion|FechaSolicitud|inicio|columns|tbExportar|fin|footer|MM|format|value|depth|start|getMonth|getFullYear|CargarSubgrilla|2px|btnBuscar|getDate|load|JSON|stringify|IdEmpleado|PageSize|DesSolicitud|tiene|cronograma|pagos|programado|140|330|bordeui|150|innerHeight|250|Cronogramas|detailInit|id|refresh|remove|pageable|200px|gina|ExportarPdf|ValidarFecha|keypress|resize|por|btnCerrar|padding|hdfIdDominio|none|location|href|Common|Controladores|DescargarArchivo|ashx|archivo|Temporal|display|border|css|hdfTecnicoResponsable|bpTecnicoResponsable_txtValorBusqueda|Seleccione||all|corner|itemsPerPage|Debe|Seleccionar|ui|debe|ser|mayor|al|periodo|Fin|messages|Saldo|ListarCronogramaPagos|antes|exportar|DcSaldoInicial|fechaInicio|fechaFin|DataSource|pageSize|Pago|setDataSource|Nuevos|Soles|Fecha|for|removeClass|replace|lblMoneda|lblNumCuotas|lblDeuda|toString|formatNumberDecimal|newo|toFixed|tabschild|lblFechaSol|lblDesSol|Usted|VcPeriodo|document|tabPrincipal|20px|El|300|InNumCuota|pageSizes|navigatable|find|grid|content|sortable|Math|floor|groupable|empty|ListarCronogramaPagosDetalle|div|appendTo|detailCell|Descripci|250px|Imei|IMEI|on|Cuota|ready'.split('|'),0,{}))
    </script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfTipo" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfRuta" runat="server" />
        <asp:HiddenField ID="hdfinTipOri" runat="server" />
        <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
        <asp:HiddenField ID="hdfOrganizacion" runat="server" />
        <asp:HiddenField ID="hdfIdDominio" runat="server" />

        
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
                        

                    </div>
                </div>

                <div id="dvFechas">
                    <table width="100%">
                        <tr>
                            <td align="left" style="color: #cd0a0a;">
                                <b><span id="spMensaje"></span></b>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="pMedium">
                    <%--<div id="toolbar" class="ui-corner-all" style="width: 780px; padding: 2px; margin-top: 2px; border:1px solid #ccc">--%>
                        <table width="100%" border="0">
                                <tr>
                                    <td>
                                        <table border="0">
                                                <tr>
                                                    <td style="color: #003F59; vertical-align: middle; padding-right: 5px; width:40px;">
                                                        <b>Del</b>
                                                    </td>
                                    
                                                           <td style="padding-right: 10px;">
                                                            <asp:TextBox ID="txtFechaInicio" runat="server" Width="90px" MaxLength="10" class="bordeui" ></asp:TextBox>
                                                        </td>                                   
                                                      <td style="color: #003F59; vertical-align: middle; padding-right: 5px; width:30px">
                                                        <b>Al</b>
                                                    </td>
                                                    <td>
                                                         <asp:TextBox ID="txtFechaFin" runat="server" Width="90px" MaxLength="10" class="bordeui"></asp:TextBox>
                                                    </td>
                                                    <td>
                                                        <div id="btnBuscar" class="k-button">
                                                            <table width="20px" border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Image ID="imgGuardar" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                                                                    </td>                                                       
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <div id="dvBotones" style="float:right;">
                                            <div id="btnExcel">
                                                <table id="tbExportar" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <eeg:ExportarExcelGenerico ID="eegCronograma" runat="server" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div id="btnPdf" class="btnButton" style="width: 32px; height: 25px;" title="Exportar PDF">
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
                                    </td>
                                </tr>
                        </table>
            
            
                    <%--</div>--%>
                </div>
                
            </div>


            <div id="crono" class="pMedium">
            </div>
        </div>
    </form>
</body>
</html>
