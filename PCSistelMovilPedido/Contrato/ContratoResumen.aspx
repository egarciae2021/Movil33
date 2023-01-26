<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ContratoResumen.aspx.vb" Inherits="WebSiteCliente.ContratoResumen" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
   
    <script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(0(){$("#1v").1j({1I:{3:o.1z.1D},1H:s,1f:[{6:"r",4:"N",2:"r",5:O},{6:"1g",4:"N",2:"Có1h Fña",5:O},{1k:\'<1s 1t="#:3.1y#-#:3.q#" 1A="1B" 1C="../p/1E/1F#:3.q#.1G" g="4: H;1O: H;1c: 1d;">\',4:"1e",2:"",M:{g:"l-n: m;U-Z:17;"}},{6:"q",2:"1l",5:s},{6:"1m",2:"1n Fña",5:s},{1o:{l:"1p 1q 1r",18:t},2:"1u",4:"1R",1w:{g:"l-n:m;"},M:{g:"l-n: m;U-Z:17;"}}]});$("#1x").18(0(){$.u({v:"w",x:"y.z/A",3:"{\'B\': \'"+$("#D").E()+"\'}",1b:"G/k; I=J-8",K:"k",L:0(a){j($.i(a.d)==""){9("P. Q R S T.")}7 j($.i(a.d)=="-1"){9(\'V W Xó Y h a 10.\')}7{o.11.12="../p/13/14.15?h="+a.d}},16:0(a,b,c){19(a,b,c)}})})});0 t(e){1a d=1J.1K($(e.1L).1M("1N"));1a f={B:$("#D").E(),1P:d.r};$.u({v:"w",x:"y.z/A",3:1Q.1i(f),1b:"G/k; I=J-8",K:"k",L:0(a){j($.i(a.d)==""){9("P. Q R S T.")}7 j($.i(a.d)=="-1"){9(\'V W Xó Y h a 10.\')}7{o.11.12="../p/13/14.15?h="+a.d}},16:0(a,b,c){19(a,b,c)}})}',62,116,'function||title|data|width|hidden|field|else||alerta|||||||style|archivo|trim|if|json|text|center|align|window|Common|NombreOperador|IdCampana|false|fnDescargarContrato|ajax|type|POST|url|ContratoResumen|aspx|ObtenerContrato|pIdEmpleado||hdfEmpleado|val|Campa|application|18px|charset|utf|dataType|success|headerAttributes|50px|true|Ud|no|tiene|contrato|generado|font|No|se|encontr|el|size|descargar|location|href|Controladores|DescargarArchivo|ashx|error|11px|click|MostrarErrorAjax|var|contentType|float|left|30px|columns|CodigoCampana|digo|stringify|kendoGrid|template|Operador|NombreCampana|Nombre|command|Descargue|su|Contrato|img|id|Documento|tbContratos|attributes|btnDescargar|IdOperador|parent|class|hovOpe|src|arCampanasActivas|Images|icono_|png|sortable|dataSource|this|dataItem|currentTarget|closest|tr|height|pIdCampana|JSON|150px'.split('|'),0,{}))
    </script>
    <link href="../Cronograma/CronogramaPagos.css" rel="stylesheet" type="text/css" />
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
        <asp:HiddenField runat="server" ID="hdfCampanaActiva"/>
        <div id="general">

        <div id="Principal">
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
            <div class="pMedium" style="display:none;">
                <div id="toolbar" class="ui-corner-all" style="width: 780px; padding: 2px; margin-top: 2px; border:1px solid #ccc">
                    <table>
                        <tr>
                            <td align="right" style="color: #003F59;">
                                Descargue su
                            </td>
                            <td style="width: 2px;">
                                
                            </td>
                            <td>
                                <div id="btnDescargar" class="k-button" title="Contrato Resumen de la Campaña activa.">
                                    Contrato
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="pMedium">
                <table id="tbContratos"></table>
            </div>
        </div>
        
        </div>
<%--        <div align="center">
            <table width = "320px" border="0" >
                <tr>
                    <td>  
                        <asp:Image ID="imgError" ImageUrl="../Common/Images/EnConstruccion.jpg" runat="server" Height="64" />
                    </td>
                    <td style="text-align: left">
                        <h2 style="color:#D34B25;font-size: 14px;">
                            En construcci&oacute;n.
                        </h2>
                    </td>
                </tr>
            </table>
        </div>--%>

    </form>
</body>
</html>
