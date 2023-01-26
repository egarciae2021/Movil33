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
        <%--<script src="../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>--%>
        <%--<script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>--%>
<%--        <script src="../Common/Scripts/anytime.js" type="text/javascript"></script>--%>

        <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
        <%--<link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />--%>
        <link href="../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
        <script src="../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
        <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <link href="CronogramaPagos.css" rel="stylesheet" type="text/css" />
        <%--<script src="../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>--%>

    <%--<script src="CronogramaPagosIE.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 1s=0;$(o(){1s=$(1p).Y();9 g=0;g=1s-1x;m(g<=0){g=2l}26();9 h=O T();9 i=O T(h.23(),h.1V()+1,0);9 j=O T(h.23(),h.1V()+6,0);$("#11").3Y(3n);$(".3u").18({3U:C,35:C,3f:C,3g:"1a/3o",3p:o(a,b){$(2u).18(\'1L\',O T(b.2Y,b.31,1))}});$("#14").18("3a","3b","+3d");$("#11").18(\'1L\',i);$("#14").18(\'1L\',j);o 26(){$("#1O").15();$("#1n").15()}$("#12").R({1i:{2y:6},3y:1f,3X:1f,22:C,43:"2C",2z:[{A:"1P",V:C,u:"1P",w:"1c",K:{q:"l-r: x;"},D:{"J":"M-I-N",q:"l-r: x;"}},{A:"2t",u:"1q",w:"2K",K:{q:"l-r: x;"},D:{"J":"M-I-N",q:"l-r: x;"}},{A:"2M",u:"2X G 2Z",w:"16",K:{q:"l-r: x;"},D:{"J":"M-I-N",q:"l-r: x;"}},{A:"33",V:C,u:"34",w:"1c",K:{q:"l-r: X;"},D:{"J":"M-I-N",q:"l-r: x;"}},{A:"2o",V:C,u:"2nón",w:"1c",K:{q:"l-r: X;"},D:{"J":"M-I-N",q:"l-r: x;"}},{A:"28",V:C,u:"1Yés",w:"1c",K:{q:"l-r: X;"},D:{"J":"M-I-N",q:"l-r: x;"}},{A:"17",V:1f,u:"2p 1q",w:"1c",K:{q:"l-r: X;"},D:{"J":"M-I-N",q:"l-r: x;"}},{3q:{l:"24",Z:21},u:" ",w:"3A",D:{q:"l-r: x;3G-3M:3N;"}}],3Q:{3R:1f,22:C,3S:{3T:"í1Z 3V pá3W",1X:"{0}-{1} G {2} í1Z",3Z:""}},40:1W,Y:g});$("#1w").R({2z:[{A:"2D",u:"2Fón",w:"2G",D:{"J":"M-I-N",q:"l-r: x;"}},{A:"2H",u:"2I",w:"16",D:{"J":"M-I-N",q:"l-r: x;"}},{A:"2o",V:C,u:"2nón",w:"16",K:{q:"l-r: X;"}},{A:"28",V:C,u:"1Yés",w:"16",K:{q:"l-r: X;"}},{A:"17",u:"2p 2J",w:"16",K:{q:"l-r: X;"},D:{"J":"M-I-N",q:"l-r: x;"}}],Y:1U});$(1p).2L(o(){1H()});1H();$("#1R").Z(o(){9 a=$("#2x").B();$("#L").l("");m(a==""||$("#45").B()==""){$("#L").l("1S U 39");y}9 b=$("#11").B();9 c=$("#14").B();m(b==""){$("#L").l("Q 1o S G 1T.");y}H{m(b.z!=7||b.19("/")!=2||b.1k("/").z!=2){$("#L").l("Q U 1j G S vá1l, 1a/1h");y}}m(c==""){$("#L").l("Q 1o S G 25");y}H{m(c.z!=7||c.19("/")!=2||c.1k("/").z!=2){$("#L").l("Q U 1j G S vá1l, 1a/1h");y}}9 d=O T();9 e=O T(1g(b.1r(3,4)),1g(b.1r(0,2))-1,d.2w());9 f=O T(1g(c.1r(3,4)),1g(c.1r(0,2))-1,d.2w());2A(a)});$("#1n").Z(o(e){9 d=$("#11").B();9 f=$("#14").B();m(d==""){$("#L").l("Q 1o S G 1T");y}H{m(d.z!=7||d.19("/")!=2||d.1k("/").z!=2){$("#L").l("Q U 1j G S vá1l, 1a/1h");y}}m(f==""){$("#L").l("Q 1o S G 25");y}H{m(f.z!=7||f.19("/")!=2||f.1k("/").z!=2){$("#L").l("Q U 1j G S vá1l, 1a/1h");y}}$.1y({1z:"1A",1B:"1C.1D/2E",1E:"1F/13; 1G=1u-8",1v:"13",1I:o(a){m(a.d.z>0){9 b=$("#2N").B();9 c=a.d;1p.2O.2P="../2Q/2R/2S.2T?2U=2V/2W/"+c}},1J:o(a,b,c){1K(a,b,c)}})});$("#27").15();$(\'#30\').Z(o(e){$("#27").Z()});$("#1R").Z()});o 2A(f){$("#12").t("R").1i.t([]);m($("#11").B()==""){y}m($("#14").B()==""){y}$.1y({1z:"1A",1B:"1C.1D/32",t:29.2a({\'2b\':f,"36":$("#11").B(),"38":$("#14").B()}),1E:"1F/13; 1G=1u-8",1v:"13",1I:o(a){m(a.d.z>0){9 b=0;b=1s-1x;m(b<=0){b=2l}9 c=O 2c.t.2d({t:a.d,2y:6});9 d=$("#12").t("R");d.2e(c);9 e=0;9 i;3c(i=0;i<a.d.z;i++){m(a.d[i].17.19(",")>=0){e=e+2f(a.d[i].17.3e(\',\',\'\'))}H{e=e+2f(a.d[i].17)}}$("#1O").2g();$("#1n").2g()}H{2h("3h 3i 3j U 3k G  3l 3m.");$("#1O").15();$("#1n").15()}},1J:o(a,b,c){1K(a,b,c)}})}o 1H(){9 a;a=$(1p).Y()-2i;m(a>2j&&a<2k){a=a-10}m(a>=2k){a=1x}H m(a<1U){a=2j}9 b=$("#12");9 c=b.3r(".k-3s-3t");9 d=a;9 e=b.2m()-c.2m();b.Y(d);c.Y(d-e);9 f=3v.3w(a/37);9 g=$("#12").t("R");9 h=g.1i.t();9 i=h.z;m(i<=5){f=5}H m(i<=10){f=10}H{f=20}}o 3z(a){9 b=a.d.z;m(b<=5){1m=5}H m(b<=10){1m=10}H{1m=20}y 1m}o 21(e){9 c=$("#12").t("R");9 d=c.3B();m(d[0]==3C){2h("1S U 3D");y}9 f=c.3E(d);$("#3F").P({u:"24 3H 1q: "+f.2t,w:3I,Y:2i,3J:C,3K:1f,3L:o(a,b){2q();2r(f.1P)},3O:{"3P":o(){$(2u).P("2s")}}})}o 1W(){}o 2q(){$(".E-P-1t").F("1M","#1N");$(".E-P-1t").F("2v","#W");$(".E-P-1t").F("1d","1e 1b #W");$(".E-P").F("1d","1e 1b #W");$(".E-1Q").F("2v","#W");$(".E-1Q").F("1M","#1N");$(".E-1Q").F("1d","1e 1b #W");$(".E-P-41").F("1d-42","1e 1b #W");$(".E-2B").F("1d","1e 1b #W");$(".E-2B").F("1M","#1N");$(".E-P-1t-2s").F("1X","44")}o 2r(d){$("#1w").t("R").1i.t([]);9 e=$("#2x").B();$.1y({1z:"1A",1B:"1C.1D/3x",t:29.2a({\'1q\':d,\'2b\':e}),1E:"1F/13; 1G=1u-8",1v:"13",1I:o(a){9 b=O 2c.t.2d({t:a.d});9 c=$("#1w").t("R");c.2e(b)},1J:o(a,b,c){1K(a,b,c)}})}',62,254,'|||||||||var||||||||||||text|if||function||style|align||data|title||width|center|return|length|field|val|true|headerAttributes|ui|css|de|else|header|class|attributes|spMensaje|table|cell|new|dialog|Ingrese|kendoGrid|fecha|Date|un|hidden|ccc|right|height|click||txtFechaInicio|crono|json|txtFechaFin|hide|80px|DcMontoCuota|datepicker|indexOf|mm|solid|100px|border|1px|false|parseInt|yyyy|dataSource|formato|split|lido|TamanioPagina|btnPdf|una|window|Periodo|substr|altoPagina|titlebar|utf|dataType|tbDetalle|320|ajax|type|POST|url|CronogramaPagos|aspx|contentType|application|charset|resizeGridKendo|success|error|MostrarErrorAjax|setDate|color|454545|tbExportar|Periodo1|button|btnBuscar|Seleccione|inicio|150|getMonth|GridDataBound|display|Inter|tems||fnGetDetalle|navigatable|getFullYear|Detalle|fin|Inicio|btnExportarExcel|DcInteres|JSON|stringify|IdEmpleado|kendo|DataSource|setDataSource|parseFloat|show|alerta|300|140|330|250|innerHeight|Amortizaci|DcAmortizacion|Monto|fnEstilosDialog|CargarSubgrilla|close|VcPeriodo|this|background|getDate|hdfEmpleado|pageSize|columns|load|icon|row|DesSolicitud|ExportarPdf|Descripci|230px|Imei|IMEI|Cuota|70px|resize|FechaSolicitud|hdfIdDominio|location|href|Common|Controladores|DescargarArchivo|ashx|archivo|Temporal|Cronogramas|Fecha|selectedYear|Pago|btnExcel|selectedMonth|ListarCronogramaPagos|DcSaldoInicial|Saldo|changeYear|fechaInicio||fechaFin|empleado|option|defaultDate|for|5m|replace|showButtonPanel|dateFormat|Usted|no|tiene|cronograma|pagos|programado|ValidarFecha|yy|onClose|command|find|grid|content|bordeui|Math|floor|ListarCronogramaPagosDetalle|groupable|PageSize|50px|select|undefined|periodo|dataItem|dvDetalleMdl|font|del|680|modal|resizable|open|size|10px|buttons|Cerrar|pageable|refresh|messages|itemsPerPage|changeMonth|por|gina|sortable|keypress|empty|dataBound|buttonpane|top|selectable|none|bpTecnicoResponsable_txtValorBusqueda'.split('|'),0,{}))
    </script>
      <style>
        .ui-datepicker-calendar {
            display: none;
        }
        #tbDetalle table {
            width: auto;
        }
    </style>
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
                <div id="dvFechas">
                    <table width="100%">
                        <tr>
                            <td align="left" style="color: #cd0a0a;">
                                <b><span id="spMensaje"></span></b>
                            </td>
                        </tr>
                    </table>
                </div>
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
                <div class="pMedium">
                    <div id="toolbar" class="ui-corner-all" style="width: 790px; padding: 2px; margin-top: 2px; border:1px solid #ccc">        
                        <table width="100%" border="0">
                                <tr>
                                    <td>
                                        <table border="0">
                                                <tr>
                                                    <td style="color: #003F59; vertical-align: middle; padding-right: 5px; width:40px; float: right">
                                                        <b>Del</b>
                                                    </td>
                                    
                                                           <td style="padding-right: 10px;">
                                                            <asp:TextBox ID="txtFechaInicio" runat="server" Width="90px" MaxLength="10" class="bordeui" ></asp:TextBox>
                                                        </td>                                   
                                                      <td style="color: #003F59; vertical-align: middle; padding-right: 5px; width:30px; float: right">
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
                                    <td style="width: 20px;">
                                        <asp:Button runat="server" ID="btnExportarExcel" Text="" />
                                        <div id="btnExcel" class="k-button" title="Exportar Excel">
                                            Excel
                                            <div id="eeg" style="display: none;">
                                                
                                                <eeg:ExportarExcelGenerico ID="eegCronograma" runat="server" />
                                            </div>
                                        </div>
                                      <%--  <div id="dvBotones" style="float:right;">
                                            
                                            
                                        </div>--%>
<%--<div id="btnExcel" style="float: right">
                                                <table id="tbExportar" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <eeg:ExportarExcelGenerico ID="eegCronograma" runat="server" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>--%>
                                    </td>
                                    <td style="width: 20px;">
                                        <div id="btnPdf" class="k-button" title="Exportar PDF">
                                            PDF
                                        </div>
                                        <%--<div id="btnPdf" class="btnButton" style="width: 28px; height: 22px; float: right" title="Exportar PDF">
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
                                            </div>--%>
                                    </td>
                                </tr>
                        </table>
            
            
                    </div>    
                </div>
                
            </div>


            <div id="crono" class="pMedium">
            </div>
        </div>
        <div id="dvDetalleMdl" style="display: none;">
            <table id="tbDetalle" class="pMedium"></table>
        </div>
    </form>
</body>
</html>
