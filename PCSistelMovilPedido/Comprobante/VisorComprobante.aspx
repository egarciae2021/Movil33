<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="VisorComprobante.aspx.vb" Inherits="WebSiteCliente.VisorComprobante" %>

<%@ Import Namespace="WebSiteCliente.UtilitarioPCSistel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../Pedido/Pedido.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.panelbar.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="VisorComprobante.js" type="text/javascript"></script>

    <script type="text/javascript">
        //eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('9 M;9 2n=0;9 1F=y;$(r(){9 j=w z();$(".2o").2p();1G.18("19-1a");$(".1H").2q("2r-2s-2t");$(".1H").2u({"2v":"2w","2x":"2y"});9 k=w z(j.1b(),j.I()+1,0);$("#Q").1I(1J);9 l=$("#Q").Y({18:"19-1a",1K:"Z",1L:"Z",1M:k,11:"1N/12",1O:y,1P:w z(s(C.t().q(0,4)),s(C.t().q(4,6)-1),s(C.t().q(6,8))),1Q:w z(s(D.t().q(0,4)),s(D.t().q(4,6)-1),s(D.t().q(6,8)))}).x("Y");$("#R").1I(1J);9 m=$("#R").Y({18:"19-1a",1K:"Z",1L:"Z",1M:k,11:"1N/12",1O:y,1P:w z(s(C.t().q(0,4)),s(C.t().q(4,6)-1),s(C.t().q(6,8))),1Q:w z(s(D.t().q(0,4)),s(D.t().q(4,6)-1),s(D.t().q(6,8)))}).x("Y");$("#1c").1R({});$("#1d").1R({});r 1S(){$.1e({1f:"1g",1h:"1i.S/1T",x:"{\'1j\': \'"+$("#1k").u()+"\', \'1U\':\'"+D+"\', \'1V\':\'"+C+"\', \'1l\':\' "+$("#1c").u()+"\', \'1W\':\'"+$("#1d").u()+"\'}",1m:"1n/N; 1o=1p-8",1q:"N",1r:r(a){M=a.d;$("#13").1s({2z:{x:M,1X:5},2A:y,2B:J,2C:J,2D:J,2E:{2F:J,2G:J,2H:{2I:"í1Y 2J pá2K",2L:"{0}-{1} T {2} í1Y",2M:""}},2N:[{G:"2O",E:"2P",F:"2Q",O:y,K:{H:"A-L:U;"}},{G:"2R",E:"1Z",F:"2S T 2Tón",O:y,K:{H:"A-L:U;"}},{G:"2U",E:"2V",F:"2W T 20",O:y,K:{H:"A-L:U;"}},{G:"1t",F:"2X 20",E:"1Z",K:{H:"A-L:U;"},2Y:\'<a 14="\\\\#" H="2Z:\\\\#30; A-31:32;V-21:22;" 33="23(34)" 35="k-36">#= 1t #</a>\'},{G:"37",E:"38",F:"39 3a",O:y,K:{H:"A-L:24; V-1u:1v;V-21:22;"},11:"{0:25}"},{G:"3b",E:"3c",F:"3d",O:y,K:{H:"A-L:U; V-1u:1v;"}},{G:"3e",E:"3f",F:"3g 3h / 3i",11:"{0:25}",K:{H:"A-L:24; V-1u:1v;"}},{G:"1w",E:"3j",F:"1w",O:J}]})},1x:r(a,b,c){1y(a,b,c)}})}r 26(){9 d;9 e;9 f=$("#Q").u();B(f==""||f==15){d=w z(s(D.t().q(0,4)),s(D.t().q(4,6))-1,1)}1z{B(f.W!=7||f.27("/")!=2||f.28("/").W!=2){$("#29").A("2a 2b 2c T 16 vá2d, 2e/12");1A}}9 g=$("#R").u();B(g==""||g==15){e=w z(s(C.t().q(0,4)),s(C.t().q(4,6)),0)}1z{B(g.W!=7||g.27("/")!=2||g.28("/").W!=2){$("#29").A("2a 2b 2c T 16 vá2d, 2e/12");1A}}B($("#Q").u()!=""||$("#Q").u()==15){d=w z(f.q(3,7),f.q(0,2)-1,1)}B($("#R").u()!=""||$("#R").u()==15){e=w z(g.q(3,7),g.q(0,2),0)}B(d>e){3k("3l 16 3m 3n 3o 3p o 3q a 3r 16 3s.");1A}9 h=d.1b()+""+(d.I()+1<10?\'0\'+(d.I()+1):d.I()+1)+""+(d.P()<10?\'0\'+d.P():d.P());9 i=e.1b()+""+(e.I()+1<10?\'0\'+(e.I()+1):e.I()+1)+""+(e.P()<10?\'0\'+e.P():e.P());$.1e({1f:"1g",1h:"1i.S/1T",x:"{\'1j\': \'"+$("#1k").u()+"\', \'1U\':\'"+h+"\', \'1V\':\'"+i+"\', \'1l\':\' "+$("#1c").u()+"\', \'1W\':\'"+$("#1d").u()+"\'}",1m:"1n/N; 1o=1p-8",1q:"N",1r:r(a){M=a.d;9 b=w 1G.x.3t({x:M,1X:5});9 c=$("#13").x("1s");c.3u(b)},1x:r(a,b,c){1y(a,b,c)}})}1B();$(X).3v(r(){1B()});$("#3w").2f(r(){26()});B(1F){2g()}1z{1S()}$("#3x").2f(r(){$("#3y").x("2h").3z()})});r 23(d){9 e=$("#13").x("1s").3A($(d).3B("3C"));$.1e({1f:"1g",1h:"1i.S/3D",x:"{\'3E\': \'"+e.1t+"\', \'1j\':\'"+$("#1k").u()+"\', \'1l\':\'"+e.1w+"\'}",1m:"1n/N; 1o=1p-8",1q:"N",1r:r(a){B(a.d.W>0){9 b=a.d;X.1C.14=1D("3F/3G/3H.3I?3J=3K/1E/"+b)}},1x:r(a,b,c){1y(a,b,c)}})}r 2g(){$("#3L").2h({E:"3M",17:"3N",3O:J,F:"1E",3P:r(){X.1C.14=1D("2i/2j.S")},3Q:y});3R("3S 3T 3U M 3V.<2k> <2k>","1E",r(a){B(a=="3W"){X.1C.14=1D("2i/2j.S")}})}r 1B(){3X{2l()}3Y(e){}}r 2l(){9 a=$("#13");9 b=a.3Z(".k-40-41");9 c=$(X).17()-42;9 d=a.2m()-b.2m();a.17(c);b.17(c-d)}', 62, 251, '|||||||||var|||||||||||||||||substring|function|parseInt|toString|val||new|data|false|Date|text|if|fechaMax|fechaMin|width|title|field|style|getMonth|true|attributes|align|comprobantes|json|hidden|getDate|txtPeriodoInicio|txtPeriodoFin|aspx|de|center|font|length|window|kendoDatePicker|year||format|yyyy|grdComprobante|href|null|fecha|height|culture|es|PE|getFullYear|ddlTipoComprobante|ddlEstado|ajax|type|POST|url|VisorComprobante|p_idEmpleado|hdfEmpleado|p_idTipoDocumento|contentType|application|charset|utf|dataType|success|kendoGrid|NumeroComprobante|weight|bolder|IdTipoDocumento|error|MostrarErrorAjax|else|return|DimPosElementos|location|raiz|Comprobantes|flagPag|kendo|period|keypress|ValidarFecha|start|depth|value|MM|footer|max|min|kendoDropDownList|CargarControles|ListarComprobantes|p_fechaIni|p_fecFin|p_idEstadoCobro|pageSize|tems|60px|Documento|size|10pt|descargarComprobante|right|c2|onBuscar|indexOf|split|spMensaje|Ingrese|un|formato|lido|mm|click|onRetorno|kendoWindow|Pedido|Dashboard_pedido|br|resizeGrid|innerHeight|altoPagina|btnNormal|button|removeClass|ui|corner|all|css|border|none|padding|0px|dataSource|groupable|sortable|selectable|navigatable|pageable|refresh|pageSizes|messages|itemsPerPage|por|gina|display|empty|columns|VcPeriodo|40px|Periodo|VcFechaEmision|Fecha|Emisi|VcTipoDocumento|65px|Tipo|Nro|template|color|003F8D|decoration|underline|onclick|this|class|link|ImporteTotal|55px|Importe|Total|VcEstadoCobro|50px|Estado|MontoCobrado|85px|Monto|Cobrado|Abonado|20px|alerta|La|inicial|debe|ser|menor|igual|la|final|DataSource|setDataSource|resize|btnBuscar|btnContinuar|msgSinComprobante|open|dataItem|closest|tr|DescargarPdf|p_nroComprobante|Common|Controladores|DescargarArchivo|ashx|archivo|Temporal|win1|300px|100px|modal|close|visible|continua|Usted|no|tiene|generados|Continuar|try|catch|find|grid|content|270'.split('|'), 0, {}))
    </script>
    <%--    <script id="rowTemplate" type="text/x-kendo-tmpl">
	    <tr class="fila-a">
            <td class="tdCheck" style="width:28px;">
                <input id="chk-#:data.NumeroComprobante#" class="chkSelectComprobante" type="checkbox" />
		    </td>
		    <td class="tdPeriodo" style="text-align: center;">
                #:data.Periodo#
		    </td>
		    <td class="tdFechaEmision" style="text-align: center;">
		        #:data.FechaEmision#
		    </td>
            <td class="tdTipoDocumento" style="text-align: center;">
		        #:data.TipoDocumento#
		    </td>
            <td class="tdNumeroComprobante" style="text-align: center;">
                #:data.NumeroComprobante#
            </td>
            <td class="tdImporteTotal" style="text-align: right;">
                #:data.ImporteTotal#
            </td>
            <td class="tdEstadoCobro" style="text-align: center;">
                #:data.EstadoCobro#
            </td>
            <td class="tdMontoCobro" style="text-align: right;">
                #:data.MontoCobro#
            </td>
	    </tr>
    </script>--%>
    <%--        <script id="altRowTemplate" type="text/x-kendo-tmpl">
	    <tr class="fila-b k-block">
            <td class="tdCheck" style="width:28px;">
                <input id="chk-#:data.NumeroComprobante#" class="chkSelectComprobante" type="checkbox" />
		    </td>
		    <td class="tdPeriodo" style="text-align: center;">
                #:data.Periodo#
		    </td>
		    <td class="tdFechaEmision" style="text-align: center;">
		        #:data.FechaEmision#
		    </td>
            <td class="tdTipoDocumento" style="text-align: center;">
		        #:data.TipoDocumento#
		    </td>
            <td class="tdNumeroComprobante" style="text-align: center;">
                #:data.NumeroComprobante#
            </td>
            <td class="tdImporteTotal" style="text-align: right;">
                #:data.ImporteTotal#
            </td>
            <td class="tdEstadoCobro" style="text-align: center;">
                #:data.EstadoCobro#
            </td>
            <td class="tdMontoCobro" style="text-align: right;">
                #:data.MontoCobro#
            </td>
	    </tr>
    </script>--%>
</head>
<body style="overflow: hidden;" scroll="no">
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfEmpleado" />
        <div id="global">
            <div id="generalPedido" class="general">
                <div id="Div1" class="pContenedor">
                    <table style="width: 99%;" border="0">
                        <tr>
                            <td>
                                <div id="pTituloPedido" class="pContenedor titulo">
                                    Hist&oacute;rico de Comprobantes        
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div id="pFiltros" class="pContenedor">
                    <div id="miGroupBox" style="border: 1px solid #94c0d2; padding: 10px 5px 5px 10px; border-radius: 5px;">
                        <span style="margin-top: -20px; margin-left: 5px; background-color: White; font-weight: bold; color: #003f59"></span>
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="98%">
                            <tr>
                                <td style="color: #003F59; vertical-align: bottom; width: 100px;">Periodo Inicial
                                </td>
                                <td>
                                    <asp:TextBox runat="server" ID="txtPeriodoInicio" class="bordeui" Width="130px" MaxLength="7"></asp:TextBox>
                                </td>
                                <td style="width: 20px"></td>
                                <td style="color: #003F59; vertical-align: bottom; width: 120px;">Tipo de Comprobante</td>
                                <td>
                                    <asp:DropDownList runat="server" ID="ddlTipoComprobante" Width="150px">
                                        <asp:ListItem Text="<Todos>" Value="-1"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style="color: #003F59; vertical-align: bottom; width: 100px;">Periodo Final</td>
                                <td>
                                    <asp:TextBox runat="server" ID="txtPeriodoFin" class="bordeui" Width="130px" MaxLength="7"></asp:TextBox>
                                </td>
                                <td style="width: 20px;"></td>
                                <td style="color: #003F59; vertical-align: bottom; width: 120px;">Estado</td>
                                <td>
                                    <asp:DropDownList runat="server" ID="ddlEstado" Width="150px"></asp:DropDownList>
                                </td>
                                <td>
                                    <div id="btnBuscar" class="menuGridPedido k-button">Buscar</div>
                                </td>
                            </tr>

                        </table>
                    </div>
                </div>
                <%--                <div id="pGrillaPedido" class="pContenedor">
                    <table id="tbComprobante">
                        <thead>
                            <tr>
                                <th style="width: 28px;" title="Seleccione">Selec.</th>
                                <th>Periodo</th>
                                <th>Fecha Emisi&oacute;n</th>
                                <th>Tipo Doc.</th>
                                <th>Nro Comprobante</th>
                                <th>Importe Total</th>
                                <th>Estado</th>
                                <th>Monto Cobrado / Abonado</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    
                </div>--%>
                <div style="clear: both;"></div>
                <div id="pGrillaComprobante" class="pContenedor">
                    <div id="grdComprobante">
                    </div>
                </div>
            </div>

        </div>
        <div id="msgSinComprobante" style="display: none;">
            Ud. no tiene comprobantes generados.
            <br />
            <br />
            <button id="btnContinuar" class="k-button">Continuar</button>
        </div>
        <script src="<%=UtilitarioGeneral.ObtieneVersionArchivoEstatico("VisorComprobante.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
