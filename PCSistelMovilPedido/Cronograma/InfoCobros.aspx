<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="InfoCobros.aspx.vb" Inherits="WebSiteCliente.InfoCobros" %>
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

    <script src="InfoCobros.js" type="text/javascript"></script>
    <%--<script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(1T).35(D(){$(".1B").1U("1V-1Z-25");$(".1B").27({"2b":"1O","1Q":"1m 1v 1m 1v"});16.1Y("1a-21");D 1E(){7 a=q.U();A(a){a=G Q(a);a.1y(a.17()+1);r.1G(a)}}D 1c(){7 a=r.U();A(a){a=G Q(a);a.1y(a.17()-1);q.1d(a)}}7 q=$("#1e").T({1r:1E}).z("T");7 r=$("#1x").T({1r:1c}).z("T");q.1d(r.U());r.1G(q.U());$("#X").1b({22:{},23:15,26:W,28:W,29:2a,H:2c,2d:"2g",2h:15,33:W,34:{36:15,37:W,38:{3k:"í1J 1P pá1R",1S:"{0}-{1} I {2} í1J",1W:""}},1X:[{N:"1u.20",J:{"t":"u-K-v",w:"5-9: B;"},O:{"t":"u-v",w:"5-9: B;"},H:"19",P:"Có2e"},{N:"1u.2f",J:{"t":"u-K-v",w:"5-9: B;"},O:{"t":"u-v",w:"5-9: 1o;"},H:"1p",P:"2i"},{N:"2j",J:{"t":"u-K-v",w:"5-9: B;"},O:{"t":"u-v",w:"5-9: B;"},H:"19",P:"2k"},{N:"2l",J:{"t":"u-K-v",w:"5-9: B;"},O:{"t":"u-v",w:"5-9: 1o;"},H:"1p",P:"2m 2p"},{N:"2s",J:{"t":"u-K-v",w:"5-9: B;"},O:{"t":"u-v",w:"5-9: B;"},H:"2t",P:"2x"},{N:"2y",J:{"t":"u-K-v",w:"5-9: B;"},O:{"t":"u-v",w:"5-9: 2C;"},H:"19",P:"2Y (S/.)"}]});$("#1q").1N(D(){7 d=\'\';7 e=\'\';7 f=$("#1e").12().1w(/^(\\s|\\&R;)*|(\\s|\\&R;)*$/g,"");7 g=$("#1x").12().1w(/^(\\s|\\&R;)*|(\\s|\\&R;)*$/g,"");A(f.11<10){$("#x").5("M E I Y Z 1f 1g 1h 1i 1j/1k/1l .");F}A(g.11<10){$("#x").5("M E I 1n Z 1f 1g 1h 1i 1j/1k/1l .");F}7 h=f.L(0,2);7 i=f.L(3,2);7 j=f.L(6,4);A(!14(i,h,j)){$("#x").5("M E I Y 1a 1sá1t.");F}7 k=g.L(0,2);7 l=g.L(3,2);7 m=g.L(6,4);A(!14(l,k,m)){$("#x").5("M E I 1n 1a 1sá1t.");F}V{$("#x").5("")}7 n=G Q(j+"-"+i+\'-\'+h);7 o=G Q(m+"-"+l+\'-\'+k);A(n>o){$("#x").5("M E 2n 2o 1A 2q o 2r a 18 E 1C.");F}V{$("#x").5("")}7 p=o-n;p=2u.2v(p/2w/1D/1D/24);A(p>2z){$("#x").5("M 2A 2B 18 E 1C y 18 E I Y, Z 2D 1A 2E a 24 2F.");F}V{$("#x").5("")}$.2G({2H:"2I",2J:"2K.2L/2M",z:2N.2O({\'2P\':f,\'2Q\':g,\'2R\':$("#2S").12(),\'2T\':e,\'2U\':d,"2V":1}),2W:"2X/1F; 2Z=30-8",31:"1F",32:D(a){A(a.d.11>0){7 b=G 16.z.1H({z:a.d,1I:10});7 c=$("#X").z("1b");c.1K(b);$("#x").5("")}V{b=G 16.z.1H({z:{},1I:10});c=$("#X").z("1b");c.1K(b);$("#1L").1M();$("#x").5("39 3a 3b 3c 3d 3e 3fá3g I bú3h.")}},3i:D(a,b,c){3j(a,b,c)}})});1z()});D 1z(){$("#1L").1M();$("#1q").1N()}D 14(m,d,y){F m>0&&m<13&&y>0&&y<3l&&d>0&&d<=(G Q(y,m,0)).17()}',62,208,'|||||text||var||align||||||||||||||||||||class|table|cell|style|spMensaje||data|if|center||function|fecha|return|new|width|de|headerAttributes|header|substr|La|field|attributes|title|Date|nbsp||kendoDatePicker|value|else|true|gridPagos|inicio|no||length|val||checkdate|false|kendo|getDate|la|60px|es|kendoGrid|endChange|max|txtFechaInicio|tiene|el|formato|correcto|dd|MM|YYYY|2px|fin|left|200px|btnBuscar|change|inv|lida|OEmpleado|0px|replace|txtFechaFin|setDate|Inicio|ser|bordeui|final|60|startChange|json|min|DataSource|pageSize|tems|setDataSource|tbExportar|hide|click|none|por|padding|gina|display|document|removeClass|ui|empty|columns|culture|corner|P_vcCod|PE|dataSource|groupable||all|sortable|css|navigatable|height|350|border|800|selectable|digo|vcNom|single|reorderable|Empleado|VcFecha|Fecha|VcConceptoPago|Concepto|inicial|debe|Pago|menor|igual|VcPeriodo|50px|Math|round|1000|Periodo|DcMontoPagado|730|diferencia|entre|right|puede|mayor|meses|ajax|type|POST|url|InfoCobros|aspx|GetListaCobros|JSON|stringify|FechaInicio|FechaFin|valor|hdfEmpleado|montoMenora|montoMayora|inTipOri|contentType|application|Monto|charset|utf|dataType|success|resizable|pageable|ready|refresh|pageSizes|messages|No|Existen|pagos|que|cumplan|estos|par|metros|squeda|error|MostrarErrorAjax|itemsPerPage|32768'.split('|'),0,{}))
    </script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
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
        <div id="dvBotones" class="pMedium">
            <div>
                <table>
                    <tr>
                        <td style="padding-right: 18px;">
                            <b><span id="Span1" style="color: #003F59;">Fecha Inicio</span></b>
                        </td>
                        <td style="padding-right: 19px;">
                            <asp:TextBox ID="txtFechaInicio" runat="server" Width="110px" MaxLength="10" class="bordeui"></asp:TextBox>
                        </td>
                        <td style="padding-right: 25px;">
                            <b><span style="color: #003F59; vertical-align: bottom;">Fecha Fin: </span></b>
                        </td>
                        <td valign="middle" rowspan="2" style="padding-right: 20px;" >
                            <asp:TextBox ID="txtFechaFin" runat="server" Width="110px" MaxLength="10" class="bordeui"></asp:TextBox>
                        </td>
                        <td align="center">
                            <div id="btnBuscar" class="k-button">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:Image ID="imgGuardar" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                                        </td>
                                        <td>
                                            &nbsp;Buscar
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="btnExcel" style="float:right;">
                <table id="tbExportar" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="gridPagos" class="pMedium">
        </div>
    </div>
    </form>
</body>
</html>
